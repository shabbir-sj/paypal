import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
	selector: 'nav-bar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
	@Output() onSearch = new EventEmitter<string>();
	searchField: FormControl;

	constructor() {
		this.searchField = new FormControl();

		this.searchField.valueChanges
			.pipe(debounceTime(500))
			.subscribe((searchTerm) => {
				this.onSearch.emit(searchTerm);
			});
	}
}
