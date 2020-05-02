import { Component, OnInit } from '@angular/core';
import { DataService, Restaurant } from '../data.service';

const ratingClass = {
	'Dark Green': 'dark-green',
	'Green': 'green',
	'Orange': 'orange',
	'Yellow': 'yellow',
};

@Component({
	selector: 'list-page',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
	list: Restaurant[];
	sortText: string = '';

	getRatingClass(ratingColor: string) {
		return ratingClass[ratingColor];
	}

	constructor(private _dataService: DataService) {}

	ngOnInit() {
		this._getData();
	}

	searchByName(name: string) {
		if (!name) {
			this._getData();
			return;
		}

		this._dataService.getFilteredData(name).subscribe((list) => {
			this.list = list;
		});
	}

	sortByPrice() {
		this.sortText = 'Price';
		this._sort('averageCostForTwo');
	}

	sortByRating() {
		this.sortText = 'Rating';
		this._sort('aggregateRating');
	}

	sortByVote() {
		this.sortText = 'Vote';
		this._sort('votes');
	}

	sortByDefault() {
		this.sortText = '';
		this._getData();
	}

	private _sort(prop: string) {
		this.list = this.list.sort((item1, item2) => {
			return item2[prop] - item1[prop];
		});
	}

	private _getData() {
		this._dataService.getData().subscribe((list) => {
			this.list = list;
		});
	}
}
