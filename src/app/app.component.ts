/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnInit } from '@angular/core';

import { ModuleSpinnerService } from './module-spinner.service';
import { TitleService } from './title.service';

@Component({
	selector: 'paypal-app',
	template: ` <router-outlet></router-outlet> `,
	styles: [
		`
			:host {
				display: block;
				position: relative;
			}
		`,
	],
})
export class AppComponent implements OnInit {
	constructor(
		private _spinner: ModuleSpinnerService,
		private _titleService: TitleService,
	) {
		// Hide spinner if present
		this._spinner.hide();
	}

	ngOnInit() {
		// Register for titleService
		this._titleService.subscribeToRoute();


		// To show loader while lazy loading
		// this._router.events
		// 	.subscribe(event => {
		// 		if (event instanceof RouteConfigLoadStart) {
		// 			this._spinner.show();
		// 		} else if (event instanceof RouteConfigLoadEnd) {
		// 			this._spinner.hide();
		// 		}
		// });
	}
}
