import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

import { Subject, Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

const defaultHeadTitle = 'Paypal';

/**
 * Service to control page titles.
 */
@Injectable()
export class TitleService {
	private _title?: string;
	private _onChangedSource = new Subject();

	constructor(private _router: Router, private _titleService: Title) {
		this._titleService.setTitle(defaultHeadTitle);
	}

	getTitle(): string {
		return this._title;
	}

	setTitle(newTitle: string) {
		this._title = newTitle;
		this._titleService.setTitle(newTitle || defaultHeadTitle);
		this._onChangedSource.next(this._title);
	}

	onChanged(): Observable<any> {
		return this._onChangedSource.asObservable();
	}

	subscribeToRoute() {
		this._router.events
			.pipe(
				filter(event => {
					return event instanceof NavigationEnd;
				}),
				map(() => {
					let route = this._router.routerState.root;
					while (route.firstChild) route = route.firstChild;
					return route;
				}),
				filter(route => route.outlet === 'primary'),
				mergeMap(route => route.data),
			)
			.subscribe(data => {
				const title = data ? data.title : undefined;
				this.setTitle(title);
			});
	}
}
