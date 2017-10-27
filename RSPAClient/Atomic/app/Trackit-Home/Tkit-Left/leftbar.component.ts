import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { LeftBarAnimationService } from '../leftbar-animation.service';

@Component({
    moduleId: module.id,
    selector: 'Tkit-leftbar-cmp',
    templateUrl: 'leftbar.component.html',
    providers: [LeftBarAnimationService]

})

export class LeftBarComponent {
    @Input() inputData: string;
    isActivec: boolean = false;
    isActivem: boolean = false;
    isActivet: boolean = false;
    isActiver: boolean = false;
    display: boolean = false;
    activeMenu: String;
    showStyle: boolean = true;
    @Output() MenuSelected: EventEmitter<any> = new EventEmitter();

    constructor(private leftbaranimationService: LeftBarAnimationService, private router: Router, @Inject(DOCUMENT) private document)
    {

    }


    getDisplay() {
        this.activeMenu = this.leftbaranimationService.get();
        console.log(this.activeMenu);
        return this.leftbaranimationService.get();
    }
    configDown() {
        this.document.getElementById('main').style.margin = "";
        this.document.getElementById('leftsidebar').style.display = "block";
        this.document.getElementById('leftsidebar').style.width = "";
        this.document.getElementById('menu-icon').style.left = "154px";
        //this.document.getElementById('drop2').style.display = "none";
        //this.isActivec = !this.isActivec;
        //if (this.isActivec) {
        //    this.document.getElementById('drop1').style.display = "block";
        //} else {
        //    this.document.getElementById('drop1').style.display = "none";
        //}
        this.isActivet = false;
        this.isActivem = false;
        this.isActiver = false;

    }
    configDown1() {
        this.router.navigate(['home']);
       // this.MenuSelected.emit('/AtPar/ConfigurationManager');
        //this.activeMenu = this.leftbaranimationService.get();
      //  this.router.navigate(['/ConfigurationManager']);
    }
    manguserDown() {
        this.document.getElementById('main').style.margin = "";
        this.document.getElementById('leftsidebar').style.display = "block";
        this.document.getElementById('leftsidebar').style.width = "";
        this.document.getElementById('menu-icon').style.left = "154px";
        //this.document.getElementById('mobile-off').style.display = "block";
        //this.document.getElementById('drop1').style.display = "none";
        this.isActivem = !this.isActivem;
        //if (this.isActivem) {
        //    this.document.getElementById('drop2').style.display = "block";
        //} else {
        //    this.document.getElementById('drop2').style.display = "none";
        //}
        this.isActivec = false;
        this.isActivet = false;
        this.isActiver = false;
        //console.log(this.isActivem);
    }
    toolDown() {
        this.isActivet = !this.isActivet;
        this.isActivec = false;
        this.isActivem = false;
        this.isActiver = false;
    }
    reportDown() {
        this.isActiver = !this.isActiver
        this.isActivec = false;
        this.isActivet = false;
        this.isActivem = false;
    }
    mobileDisplay() {
        this.display = !this.display;
    }

}
