import { Injectable } from '@angular/core';

@Injectable()
export class LeftBarAnimationService {

    constructor() { }

    public activeLeftBar = "none";
    public HomeBar: string;

    public isHomeClicked: boolean ;

    get() {
        //console.log(this.activeLeftBar);
        return this.activeLeftBar;
    }

    adminsidebar() {
        this.activeLeftBar = "admin";
    }

    casecost() {
        this.activeLeftBar = "casecost";
    }
    warehouse() {
        this.activeLeftBar = "warehouse";
    }
    report() {
        this.activeLeftBar = "reports";
    }

    distribution() {
        this.activeLeftBar = "distribut";
    }

    isHide() {
        this.activeLeftBar = "none";
        console.log(this.activeLeftBar);
    }

    menubar(name) {
        this.activeLeftBar = name;
    }

    isHomeMenu(name) {
        this.HomeBar = name;
    }
}