import { Component, ChangeDetectorRef, Inject, Directive, HostListener} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { LeftBarAnimationService } from './leftbar-animation.service';

@Component({
    moduleId: module.id,
    providers: [LeftBarAnimationService],
    selector: 'home-cmp',
    templateUrl: 'Tkit-home.component.html',
})

export class TkitHomeComponent {
    activeMenu: String;
    showAdmin: boolean = true;
    showWarehouse: boolean = false;
    showReports: boolean = false;
    showCC: boolean = false;
    showStyle: String;
    hideStyle: String;
    isFullscreenAvailable: String;
    data: any;
    count: boolean = false;
    colorpalet: boolean = false;
    constructor(private leftBarAnimateService: LeftBarAnimationService, @Inject(DOCUMENT) private document) {
        this.showStyle = "block";
        this.hideStyle = "none";
        this.isFullscreenAvailable = this.document.fullscreenEnabled;
        console.log(this.document.fullscreenEnabled);
    }
    

    getSideBar() {
        this.activeMenu = this.leftBarAnimateService.get();
       // this.data = this.activeMenu;
        if (this.activeMenu != 'none') {
            //this.document.getElementById('leftsidebar').style.width = "";
            return this.showStyle;
        } else {
            this.document.getElementById('leftsidebar').style.width = "";
            this.document.getElementById('menu-icon').style.left = "154px";
            //this.document.getElementById('drop1').style.display = "none";
            //this.document.getElementById('drop2').style.display = "none";
            return this.hideStyle;            
        }
    }

    ngAfterViewInit() {
        this.getSideBar();
    }

    getAdmin() {
        this.activeMenu = this.leftBarAnimateService.get();
        if (this.activeMenu == 'admin') {
            return this.showStyle;
        } else {
            return this.hideStyle;
        }
    }
    getWarehouse() {
        this.activeMenu = this.leftBarAnimateService.get();
        if (this.activeMenu == 'warehouse') {
            return this.showStyle;
        } else {
            return this.hideStyle;
        }
    }
    getCC() {
        this.activeMenu = this.leftBarAnimateService.get();
        if (this.activeMenu == 'casecost') {
            return this.showStyle;
        } else {
            return this.hideStyle;
        }
    }
    getReport() {
        this.activeMenu = this.leftBarAnimateService.get();
        if (this.activeMenu == 'reports') {
            return this.showStyle;
        } else {
            return this.hideStyle;
        }
    }

    getDis() {
        this.activeMenu = this.leftBarAnimateService.get();
        console.log(this.activeMenu);
        if (this.activeMenu == 'distribut') {
            return this.showStyle;
        } else {
            return this.hideStyle;
        }
    }

    navigateToMessagePart(event) {
        debugger;
    }
    fullscreen() {
        this.document.getElementById("wrapper").requestFullscreen; 
    }
    settings() {
        this.colorpalet = !this.colorpalet;
        //this.document.getElementById('theme').setAttribute('href', '/assets/css/Blue.css');
        console.log(this.colorpalet);
    }
    blue() {
        this.document.getElementById('theme').setAttribute('href', '/assets/css/blue.css');
    }
    default() {
        this.document.getElementById('theme').setAttribute('href', '/assets/css/default.css');
    }
    orange() {
        this.document.getElementById('theme').setAttribute('href', '/assets/css/orange.css');
    }
    green() {
        this.document.getElementById('theme').setAttribute('href', '/assets/css/green.css');
    }
    font(event) {
        var value = event.srcElement.attributes.id.nodeValue;
        console.log(value);
        this.document.getElementById('fontfamily').setAttribute('href', '/assets/css/fontfamily/font'+value+'.css');
    }
    fontsize(event) {
        var value = event.srcElement.attributes.id.nodeValue;
        console.log(value);
        this.document.getElementById('fontfamily').setAttribute('href', '/assets/css/fontsize/' + value + '.css');
    }
    mobileDisplay() {
        this.count = !this.count;
        if (this.count) {
            this.document.getElementById('main').style.margin = "0 35px 0";
            this.document.getElementById('leftsidebar').style.width = "35px";
            this.document.getElementById('menu-icon').style.left = "34px";
            //this.document.getElementById('drop1').style.display = "none";
            //this.document.getElementById('drop2').style.display = "none";
        }else {
            this.document.getElementById('main').style.margin = "";
            this.document.getElementById('leftsidebar').style.display = "block";
            this.document.getElementById('leftsidebar').style.width = "";
            this.document.getElementById('menu-icon').style.left = "154px";
            //this.document.getElementById('drop1').style.display = "none";
            //this.document.getElementById('drop2').style.display = "none";
        }
    }

}
