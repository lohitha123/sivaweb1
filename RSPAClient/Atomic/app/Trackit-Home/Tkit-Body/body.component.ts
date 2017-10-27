import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftBarComponent } from '../Tkit-Left/leftbar.component';
import { LeftBarAnimationService } from '../leftbar-animation.service';

/**
*	This class represents the lazy loaded HomeComponent.
*/

@Component({
    moduleId: module.id,
    selector: 'body-cmp',
    templateUrl: 'body.component.html',
})

export class BodyComponent implements OnInit {
    @Output() navigateTo: EventEmitter<any> = new EventEmitter();
    constructor(
        private leftBarAnimationService: LeftBarAnimationService
    ) {
        this.strshowStyle = "block";
        this.hideStyle = "none";
    }

    mainMenu: Array<any> = [];
    menuItem: Array<any> = [];
    activeMenu: string;
    showStyle: boolean = false;
    showMargin: boolean = false;
    strshowStyle: string;
    hideStyle: string;
    data: string;

    getMargin() {
        this.showStyle = this.leftBarAnimationService.isHomeClicked;
       // this.activeMenu = this.leftBarAnimationService.get();
        if (this.showStyle) {
           // this.navigateTo.emit(this.activeMenu);
            return "";
        } else {           
            this.activeMenu = "Atpar";
           // this.navigateTo.emit(this.activeMenu);
            return "0px";
        }
    }

    OnmenuSelected() {
    }

    getMenu() {
        this.activeMenu = this.leftBarAnimationService.get();
        if (this.activeMenu != 'none') {

            return this.strshowStyle;
        }
        else {
            return this.hideStyle;
        }
    }

    activeButton(menuItem: string) {
        this.activeMenu = menuItem;
        this.showStyle = true;
        this.leftBarAnimationService.isHomeClicked = true;
        this.showMargin = true;
        this.data = menuItem;
        if (this.activeMenu != '') {
            this.leftBarAnimationService.menubar(this.activeMenu);
        }
        
    }
    ngOnInit() {
        console.log("homepage");
        this.mainMenu = [
            { name: 'Administration', path: 'administartion', img: "Admin" },
            { name: 'Warehouse', path: 'warehouse', img: "wareHouse" },
            { name: 'Distribution', path: 'dis', img: "distribution" },
            { name: 'CaseCost-360', path: 'casecost', img: "cc360" },
            { name: 'Reports & Dashboards', path: 'reports', img: "reports" }
        ];
        this.activeMenu = 'AtPar';
        console.log(this.activeMenu);
        console.log(this.mainMenu);
    }

}
