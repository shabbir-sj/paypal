import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Restaurant {
	restaurantId: number;
	restaurantName: string;
	cuisines: string[];
	averageCostForTwo: number;
	currency: string;
	hasTableBooking: boolean;
	hasOnlineDelivery: boolean;
	aggregateRating: number;
	ratingColor: string;
	ratingText: string;
	votes: number;
}

@Injectable()
export class DataService {
	pageSize = 8;
	data: Restaurant[];

	constructor(private _httpClient: HttpClient) {}

	getData() {
		if (this.data) return of(this.data);

		return this._httpClient
			.get('assets/external/restaurants.csv', { responseType: 'text' })
			.pipe(
				map((data) => {
					const list: any[] = this._getCsvToJson(data);
					this.data = list.map((item) => {
						return {
							...item,
							restaurantId: parseInt(item.restaurantId, 10),
							cuisines: item.cuisines
								.split(' ')
								.filter((val) => val !== ''),
							averageCostForTwo: parseInt(
								item.averageCostForTwo,
								10,
							),
							hasTableBooking: item.hasTableBooking === 'Yes',
							hasOnlineDelivery: item.hasOnlineDelivery === 'Yes',
							aggregateRating: parseFloat(item.aggregateRating),
							votes: parseInt(item.votes, 10),
						} as Restaurant;
					});
					return this.data;
				}),
			);
	}

	getFilteredData(name: string) {
		return this.getData().pipe(
			map((data) => {
				return data.filter((item) => {
					return (
						item.restaurantName
							.toLowerCase()
							.indexOf(name.toLowerCase()) !== -1 ||
						item.cuisines
							.map((cuisine) => cuisine.toLowerCase())
							.join(' ')
							.indexOf(name.toLowerCase()) !== -1
					);
				});
			}),
		);
	}

	private _getCsvToJson(data: string) {
		const lines = data.split('\n');
		const keys = lines
			.shift()
			.split(',')
			.map((key) => {
				return key
					.split(' ')
					.map((str) => str.toLowerCase())
					.join('_');
			})
			.map((key) => this._dashToCamelCase(key));

		return lines
			.filter((line) => line !== '')
			.map((line) => {
				const temp = line.split('"');
				if (temp.length === 3) {
					temp[1] = temp[1].split(',').join(' ');
				}

				const lineStr = temp.join('');
				return lineStr.split(',').reduce((acc, val, index) => {
					acc[keys[index]] = val;
					return acc;
				}, {});
			});
	}

	private _dashToCamelCase(str: string) {
		return str.replace(/[\W+_](.)/g, function (x, chr) {
			return chr.toUpperCase();
		});
	}
}
