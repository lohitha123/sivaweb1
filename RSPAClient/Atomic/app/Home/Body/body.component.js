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
var core_1 = require("@angular/core");
var leftbar_animation_service_1 = require("../leftbar-animation.service");
/**
*	This class represents the lazy loaded HomeComponent.
*/
var BodyComponent = (function () {
    function BodyComponent(leftBarAnimationService) {
        this.leftBarAnimationService = leftBarAnimationService;
        this.navigateTo = new core_1.EventEmitter();
        this.mainMenu = [];
        this.menuItem = [];
        this.showStyle = false;
        this.showMargin = false;
        this.strshowStyle = "block";
        this.hideStyle = "none";
    }
    BodyComponent.prototype.getMargin = function () {
        this.showStyle = this.leftBarAnimationService.isHomeClicked;
        // this.activeMenu = this.leftBarAnimationService.get();
        if (this.showStyle) {
            // this.navigateTo.emit(this.activeMenu);
            return "";
        }
        else {
            this.activeMenu = "Atpar";
            // this.navigateTo.emit(this.activeMenu);
            return "0px";
        }
    };
    BodyComponent.prototype.OnmenuSelected = function () {
    };
    BodyComponent.prototype.getMenu = function () {
        this.activeMenu = this.leftBarAnimationService.get();
        if (this.activeMenu != 'none') {
            return this.strshowStyle;
        }
        else {
            return this.hideStyle;
        }
    };
    BodyComponent.prototype.activeButton = function (menuItem) {
        this.activeMenu = menuItem;
        this.showStyle = true;
        this.leftBarAnimationService.isHomeClicked = true;
        this.showMargin = true;
        this.data = menuItem;
        if (this.activeMenu != '') {
            this.leftBarAnimationService.menubar(this.activeMenu);
        }
        //this.activeMenu = menuItem;
        //this.showStyle = true;
        //this.showMargin = true;
        ////console.log(this.activeMenu);
        //this.leftBarAnimationService.isHomeClicked = false;
        ////console.log(this.countService.isHomeClicked);
        //if (this.activeMenu == 'Administration') {
        //    //console.log('administrator hitted');
        //    this.leftBarAnimationService.adminsidebar();
        //} else if (this.activeMenu == 'Warehouse') {
        //    //console.log('warehouse hitted');
        //    this.leftBarAnimationService.warehouse();
        //} else if (this.activeMenu == 'Distribution') {
        //    //console.log('warehouse hitted');
        //    this.leftBarAnimationService.distribution();
        //} else if (this.activeMenu == 'Reports & Dashboards') {
        //    //console.log('reports hitted');
        //    this.leftBarAnimationService.report();
        //} else if (this.activeMenu == 'CaseCost-360') {
        //    //console.log('case cost hitted');
        //    this.leftBarAnimationService.casecost();
        //}
    };
    BodyComponent.prototype.ngOnInit = function () {
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
    };
    return BodyComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], BodyComponent.prototype, "navigateTo", void 0);
BodyComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'body-cmp',
        templateUrl: 'body.component.html',
    }),
    __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService])
], BodyComponent);
exports.BodyComponent = BodyComponent;
//# sourceMappingURL=body.component.js.map