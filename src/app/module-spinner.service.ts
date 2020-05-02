import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Service to control the global page spinner.
 */
@Injectable()
export class ModuleSpinnerService {
	private selector: string = 'nb-global-spinner';

	constructor(@Inject(DOCUMENT) private document) {}

	show(): void {
		const el = this.getSpinnerElement();
		if (el) {
			el.style['display'] = 'block';
		}
	}

	hide(): void {
		const el = this.getSpinnerElement();
		if (el) {
			el.style['display'] = 'none';
		}
	}

	private getSpinnerElement() {
		return this.document.getElementById(this.selector);
	}
}
