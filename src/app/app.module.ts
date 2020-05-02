/**
 * @license
 * Copyright Shabbir Hussain. All Rights Reserved.
 */

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModuleSpinnerService } from './module-spinner.service';
import { TitleService } from './title.service';
import { ScriptLoaderService } from './script-loader.service';
import { DataService } from './data.service';

import { ListComponent } from './list/list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';

const bootstrapModules = [
	NgbDropdownModule,
];

@NgModule({
	declarations: [AppComponent, ListComponent, NavbarComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		HttpClientModule,

		...bootstrapModules,
		AppRoutingModule,
	],
	entryComponents: [],
	bootstrap: [AppComponent],
	providers: [
		ModuleSpinnerService,
		ScriptLoaderService,
		TitleService,
		DataService,
	],
})
export class AppModule {}
