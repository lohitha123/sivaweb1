"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var leftbar_animation_service_1 = require("./leftbar-animation.service");
var TkitHomeComponent = (function () {
    function TkitHomeComponent(leftBarAnimateService, document) {
        this.leftBarAnimateService = leftBarAnimateService;
        this.document = document;
        this.showAdmin = true;
        this.showWarehouse = false;
        this.showReports = false;
        this.showCC = false;
        this.count = false;
        this.colorpalet = false;
        this.showStyle = "block";
        this.hideStyle = "none";
        this.isFullscreenAvailable = this.document.fullscreenEnabled;
        console.log(this.document.fullscreenEnabled);
    }
    TkitHomeComponent.prototype.getSideBar = function () {
        this.activeMenu = this.leftBarAnimateService.get();
        // this.data = this.activeMenu;
        if (this.activeMenu != 'none') {
            //this.document.getElementById('leftsidebar').style.width = "";
            return this.showStyle;
        }
        else {
            this.document.getElementById('leftsidebar').style.width = "";
            this.document.getElementById('menu-icon').style.left = "154px";
            //this.document.getElementById('drop1').style.display = "none";
            //this.document.getElementById('drop2').style.display = "none";
            return this.hideStyle;
        }
    };
    TkitHomeComponent.prototype.ngAfterViewInit = function () {
        this.getSideBar();
    };
    TkitHomeComponent.prototype.getAdmin = function () {
        this.activeMenu = this.leftBarAnimateService.get();
        if (this.activeMenu == 'admin') {
            return this.showStyle;
        }
        else {
            return this.hideStyle;
        }
    };
    TkitHomeComponent.prototype.getWarehouse = function () {
        this.activeMenu = this.leftBarAnimateService.get();
        if (this.activeMenu == 'warehouse') {
            return this.showStyle;
        }
        else {
            return this.hideStyle;
        }
    };
    TkitHomeComponent.prototype.getCC = function () {
        this.activeMenu = this.leftBarAnimateService.get();
        if (this.activeMenu == 'casecost') {
            return this.showStyle;
        }
        else {
            return this.hideStyle;
        }
    };
    TkitHomeComponent.prototype.getReport = function () {
        this.activeMenu = this.leftBarAnimateService.get();
        if (this.activeMenu == 'reports') {
            return this.showStyle;
        }
        else {
            return this.hideStyle;
        }
    };
    TkitHomeComponent.prototype.getDis = function () {
        this.activeMenu = this.leftBarAnimateService.get();
        console.log(this.activeMenu);
        if (this.activeMenu == 'distribut') {
            return this.showStyle;
        }
        else {
            return this.hideStyle;
        }
    };
    TkitHomeComponent.prototype.navigateToMessagePart = function (event) {
        debugger;
    };
    TkitHomeComponent.prototype.fullscreen = function () {
        this.document.getElementById("wrapper").requestFullscreen;
    };
    TkitHomeComponent.prototype.settings = function () {
        this.colorpalet = !this.colorpalet;
        //this.document.getElementById('theme').setAttribute('href', '/assets/css/Blue.css');
        console.log(this.colorpalet);
    };
    TkitHomeComponent.prototype.blue = function () {
        this.document.getElementById('theme').setAttribute('href', '/assets/css/blue.css');
    };
    TkitHomeComponent.prototype.default = function () {
        this.document.getElementById('theme').setAttribute('href', '/assets/css/default.css');
    };
    TkitHomeComponent.prototype.orange = function () {
        this.document.getElementById('theme').setAttribute('href', '/assets/css/orange.css');
    };
    TkitHomeComponent.prototype.green = function () {
        this.document.getElementById('theme').setAttribute('href', '/assets/css/green.css');
    };
    TkitHomeComponent.prototype.font = function (event) {
        var value = event.srcElement.attributes.id.nodeValue;
        console.log(value);
        this.document.getElementById('fontfamily').setAttribute('href', '/assets/css/fontfamily/font' + value + '.css');
    };
    TkitHomeComponent.prototype.fontsize = function (event) {
        var value = event.srcElement.attributes.id.nodeValue;
        console.log(value);
        this.document.getElementById('fontfamily').setAttribute('href', '/assets/css/fontsize/' + value + '.css');
    };
    TkitHomeComponent.prototype.mobileDisplay = function () {
        this.count = !this.count;
        if (this.count) {
            this.document.getElementById('main').style.margin = "0 35px 0";
            this.document.getElementById('leftsidebar').style.width = "35px";
            this.document.getElementById('menu-icon').style.left = "34px";
        }
        else {
            this.document.getElementById('main').style.margin = "";
            this.document.getElementById('leftsidebar').style.display = "block";
            this.document.getElementById('leftsidebar').style.width = "";
            this.document.getElementById('menu-icon').style.left = "154px";
        }
    };
    return TkitHomeComponent;
}());
TkitHomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        providers: [leftbar_animation_service_1.LeftBarAnimationService],
        selector: 'home-cmp',
        templateUrl: 'Tkit-home.component.html',
    }),
    __param(1, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService, Object])
], TkitHomeComponent);
exports.TkitHomeComponent = TkitHomeComponent;
//# sourceMappingURL=Tkit-home.component.js.map