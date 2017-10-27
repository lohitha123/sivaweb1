import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	moduleId: module.id,
	
	templateUrl: './warehouse.component.html'
})

export class WarehouseComponent  {

	wareMenu: Array<any> = [];

	constructor() {
		this.wareMenu = [
			{ name: 'AtPar', path: '/', img: "app_icon" },
			{ name: 'Cart Count', path: '/warehouse', img: "cartCount" },
			{ name: 'Cycle Count', path: '/', img: "cycleCount" },
			{ name: 'Recieve', path: '/', img: "recieve" },
			{ name: 'Pick', path: '/', img: "pick" },
			{ name: 'Deliver', path: '/warehouse', img: "deliver" },
			{ name: 'Put Away', path: '/', img: "putAway" },
			{ name: 'TrackIt', path: '/', img: "trackIt" },
			{ name: 'Stock Issue', path: '/', img: "stockIssue" },
			{ name: 'Asset Management', path: '/warehouse', img: "assetManagement" },
			{ name: 'Bin To Bin', path: '/', img: "binToBin" },
			{ name: 'Point Of Use', path: '/', img: "pointOfUse" }
		];
		console.log(this.wareMenu);
	}
	
}
