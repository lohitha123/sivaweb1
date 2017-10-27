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
var LeftBarAnimationService = (function () {
    function LeftBarAnimationService() {
        this.activeLeftBar = "none";
    }
    LeftBarAnimationService.prototype.get = function () {
        //console.log(this.activeLeftBar);
        return this.activeLeftBar;
    };
    LeftBarAnimationService.prototype.adminsidebar = function () {
        this.activeLeftBar = "admin";
    };
    LeftBarAnimationService.prototype.casecost = function () {
        this.activeLeftBar = "casecost";
    };
    LeftBarAnimationService.prototype.warehouse = function () {
        this.activeLeftBar = "warehouse";
    };
    LeftBarAnimationService.prototype.report = function () {
        this.activeLeftBar = "reports";
    };
    LeftBarAnimationService.prototype.distribution = function () {
        this.activeLeftBar = "distribut";
    };
    LeftBarAnimationService.prototype.isHide = function () {
        this.activeLeftBar = "none";
        console.log(this.activeLeftBar);
    };
    LeftBarAnimationService.prototype.menubar = function (name) {
        this.activeLeftBar = name;
    };
    LeftBarAnimationService.prototype.isHomeMenu = function (name) {
        this.HomeBar = name;
    };
    return LeftBarAnimationService;
}());
LeftBarAnimationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], LeftBarAnimationService);
exports.LeftBarAnimationService = LeftBarAnimationService;
//# sourceMappingURL=leftbar-animation.service.js.map