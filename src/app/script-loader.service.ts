import { Injectable } from '@angular/core';
import { LocationStrategy } from '@angular/common';

declare const document: any;

export interface Script {
	name: string;
	src: string;
	local?: boolean;
}

export interface ScriptResponse {
	script: string;
	loaded: boolean;
}

function getFullUrl(baseUrl: string, path: string) {
	const url = baseUrl + path;
	return url.replace(/\/\/+/g, '/');
}

/*
	for local script, send local 'true' while registering script
*/

@Injectable()
export class ScriptLoaderService {
	private _scripts: {
		[name: string]: {
			src: string;
			loaded: boolean;
			forCSS: boolean;
		};
	} = {};

	constructor(private _locationStrategy: LocationStrategy) {}

	register(script: Script, forCSS: boolean = false) {
		if (this._scripts[script.name]) return;

		const src = !script.local
			? script.src
			: getFullUrl(this._locationStrategy.getBaseHref(), script.src);

		this._scripts[script.name] = {
			loaded: false,
			src: src,
			forCSS: forCSS,
		};
	}

	loadAll(...scripts: string[]): Promise<ScriptResponse[]> {
		const promises: any[] = [];
		scripts.forEach(script => promises.push(this.loadOne(script)));
		return Promise.all(promises);
	}

	loadOne(name: string): Promise<ScriptResponse> {
		const scriptConf = this._scripts[name];
		return scriptConf.forCSS ? this._loadCSS(name) : this._loadJS(name);
	}

	private _loadJS(name: string): Promise<ScriptResponse> {
		return new Promise((resolve, reject) => {
			if (!this._scripts[name].loaded) {
				// load script
				const script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = this._scripts[name].src;

				if (script.readyState) {
					// IE
					script.onreadystatechange = () => {
						if (
							script.readyState === 'loaded' ||
							script.readyState === 'complete'
						) {
							script.onreadystatechange = null;
							this._scripts[name].loaded = true;
							resolve({
								script: name,
								loaded: true,
							});
						}
					};
				} else {
					// Others
					script.onload = () => {
						this._scripts[name].loaded = true;
						resolve({
							script: name,
							loaded: true,
						});
					};
				}

				script.onerror = (error: any) =>
					reject({ script: name, loaded: false });
				document.getElementsByTagName('head')[0].appendChild(script);
			} else {
				resolve({
					script: name,
					loaded: true,
				});
			}
		});
	}

	// Not waiting for css to finish loading
	private _loadCSS(name: string): Promise<ScriptResponse> {
		return new Promise(resolve => {
			if (!this._scripts[name].loaded) {
				// load link
				const link = document.createElement('link');
				link.rel = 'stylesheet';
				link.type = 'text/css';
				link.href = this._scripts[name].src;
				link.media = 'all';

				document.getElementsByTagName('head')[0].appendChild(link);
				this._scripts[name].loaded = true;
			}

			resolve({
				script: name,
				loaded: true,
			});
		});
	}
}
