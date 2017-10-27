import { Injectable } from '@angular/core';


@Injectable()
export class LeftBarAnimationService {

    constructor() { }

    public activeLeftBar = "block";
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
        this.activeLeftBar = "block";
        console.log(this.activeLeftBar);
    }

    menubar(name) {
        this.activeLeftBar = name;
    }

    isHomeMenu(name) {
        this.HomeBar = name;
    }
}