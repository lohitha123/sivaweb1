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
var router_1 = require("@angular/router");
var leftbar_animation_service_1 = require("../leftbar-animation.service");
//import * as screenfull from 'screenfull';
var TopBarComponent = (function () {
    //menu3: string;
    function TopBarComponent(router, leftbaranimationService, document) {
        this.router = router;
        this.leftbaranimationService = leftbaranimationService;
        this.document = document;
        this.dropdown = true;
        this.showStyle = true;
        this.currentUser = {};
        this.color1 = 'red';
        this.color2 = 'green';
        this.color3 = 'yellow';
    }
    TopBarComponent.prototype.dropdownMenu = function (menu) {
        this.dropdown = !this.dropdown;
        if (this.dropdown) {
            this.smallMenu = menu;
        }
        else {
            this.smallMenu = "";
        }
    };
    TopBarComponent.prototype.AtPar = function () {
        this.showStyle = false;
        this.activeMenu = 'AtPar';
        this.leftbaranimationService.isHide();
        this.leftbaranimationService.isHomeClicked = false;
        this.router.navigate(['trackithome/dashboard']);
    };
    TopBarComponent.prototype.fullscreen = function () {
        this.div = this.document.getElementById("wrapper");
        this.divfun = (this.document.fullScreenElement && this.document.fullScreenElement !== null) ||
            (this.document.mozFullScreen || this.document.webkitIsFullScreen);
        console.log(this.divfun);
    };
    TopBarComponent.prototype.changeStyle = function ($event) {
        this.color1 = $event.type == 'mouseover' ? 'img-white' : 'img-default';
    };
    TopBarComponent.prototype.changeStyle2 = function ($event) {
        this.color2 = $event.type == 'mouseover' ? 'img-white' : 'img-default';
    };
    TopBarComponent.prototype.changeStyle3 = function ($event) {
        this.color3 = $event.type == 'mouseover' ? 'img-white' : 'img-default';
    };
    TopBarComponent.prototype.ngOnInit = function () {
        this.currentUser = { id: 1, username: "admin", firstName: "awaiz", lastName: "q", token: "fake-jwt-token" };
    };
    return TopBarComponent;
}());
TopBarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'Tkit-topbar-cmp',
        templateUrl: 'topbar.component.html',
    }),
    __param(2, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [router_1.Router,
        leftbar_animation_service_1.LeftBarAnimationService, Object])
], TopBarComponent);
exports.TopBarComponent = TopBarComponent;
//# sourceMappingURL=topbar.component.js.map