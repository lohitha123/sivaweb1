import { Component, HostListener, Directive, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { LeftBarAnimationService } from '../leftbar-animation.service';
//import * as screenfull from 'screenfull';

@Component({
    moduleId: module.id,
    selector: 'Tkit-topbar-cmp',
    templateUrl: 'topbar.component.html',
})

export class TopBarComponent {
    menu: string;
    smallMenu: string;
    dropdown: boolean = true;
    showStyle: boolean = true;
    currentUser: any = {};
    activeMenu: string;
    div: string;
    divfun: string;
    color1: string = 'red';
    color2: string = 'green';
    color3: string = 'yellow';
    //menu3: string;

    constructor(
        private router: Router,
        private leftbaranimationService: LeftBarAnimationService,
        @Inject(DOCUMENT) private document
    ) {
        
    }

    dropdownMenu(menu) {
        this.dropdown = !this.dropdown;
        if (this.dropdown) {
            this.smallMenu = menu;
        } else {
            this.smallMenu = "";
        }
    }

    AtPar() {
        this.showStyle = false;
        this.activeMenu = 'AtPar';
        this.leftbaranimationService.isHide();
        this.leftbaranimationService.isHomeClicked = false;
        this.router.navigate(['trackithome/dashboard']);
    }
    fullscreen() {
        this.div = this.document.getElementById("wrapper");
        this.divfun = (this.document.fullScreenElement && this.document.fullScreenElement !== null) ||    // alternative standard method  
            (this.document.mozFullScreen || this.document.webkitIsFullScreen);
        console.log(this.divfun);
    }

    changeStyle($event) {
        this.color1 = $event.type == 'mouseover' ? 'img-white' : 'img-default';
    }
    changeStyle2($event) {
        this.color2 = $event.type == 'mouseover' ? 'img-white' : 'img-default';
    }
    changeStyle3($event) {
        this.color3 = $event.type == 'mouseover' ? 'img-white' : 'img-default';
    }

    ngOnInit() {
        this.currentUser = { id: 1, username: "admin", firstName: "awaiz", lastName: "q", token: "fake-jwt-token" };
    }
}
