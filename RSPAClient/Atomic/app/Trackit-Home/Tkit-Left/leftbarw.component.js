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
var LeftbarwComponent = (function () {
    function LeftbarwComponent(leftBarAnimationService) {
        this.leftBarAnimationService = leftBarAnimationService;
        this.isActivecc = false;
        this.isActiver = false;
        this.isActivecy = false;
        this.showStyle = true;
    }
    LeftbarwComponent.prototype.getDisplay = function () {
        this.activeMenu = this.leftBarAnimationService.get();
        console.log(this.activeMenu);
        return this.leftBarAnimationService.get();
    };
    LeftbarwComponent.prototype.cartDown = function () {
        this.isActivecc = !this.isActivecc;
        this.isActiver = false;
        this.isActiver = false;
        console.log('hit');
    };
    LeftbarwComponent.prototype.reportdown = function () {
        this.isActiver = !this.isActiver;
        this.isActivecy = false;
        this.isActivecc = false;
    };
    LeftbarwComponent.prototype.cycledown = function () {
        this.isActivecy = !this.isActivecy;
        this.isActiver = false;
        this.isActivecc = false;
    };
    return LeftbarwComponent;
}());
LeftbarwComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        providers: [leftbar_animation_service_1.LeftBarAnimationService],
        selector: 'leftbar-wh',
        templateUrl: 'leftbarw.component.html'
    }),
    __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService])
], LeftbarwComponent);
exports.LeftbarwComponent = LeftbarwComponent;
//# sourceMappingURL=leftbarw.component.js.map