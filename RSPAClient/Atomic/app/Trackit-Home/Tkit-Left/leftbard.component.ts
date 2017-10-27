import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftBarAnimationService } from '../leftbar-animation.service';

@Component({
	moduleId: module.id,
	providers: [LeftBarAnimationService],
	selector: 'leftbar-d',
	templateUrl: 'leftbard.component.html'
})

export class LeftbardComponent {
	isActivep: boolean = false;
	isActiverec: boolean = false;
	activeMenu: String;
	showStyle: boolean = true;

	constructor(private leftBarAnimationService: LeftBarAnimationService) { }

	getDisplay() {
		this.activeMenu = this.leftBarAnimationService.get();
		console.log(this.activeMenu);
		return this.leftBarAnimationService.get();
	}
	pickDown() {
		this.isActivep = !this.isActivep;
		this.isActiverec = false;
		console.log(this.isActivep);
	}
	reciveDown() {
		this.isActiverec = !this.isActiverec;
		this.isActivep = false;
	}
}
