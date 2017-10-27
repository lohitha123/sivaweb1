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
var LeftbardComponent = (function () {
    function LeftbardComponent(leftBarAnimationService) {
        this.leftBarAnimationService = leftBarAnimationService;
        this.isActivep = false;
        this.isActiverec = false;
        this.showStyle = true;
    }
    LeftbardComponent.prototype.getDisplay = function () {
        this.activeMenu = this.leftBarAnimationService.get();
        console.log(this.activeMenu);
        return this.leftBarAnimationService.get();
    };
    LeftbardComponent.prototype.pickDown = function () {
        this.isActivep = !this.isActivep;
        this.isActiverec = false;
        console.log(this.isActivep);
    };
    LeftbardComponent.prototype.reciveDown = function () {
        this.isActiverec = !this.isActiverec;
        this.isActivep = false;
    };
    return LeftbardComponent;
}());
LeftbardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        providers: [leftbar_animation_service_1.LeftBarAnimationService],
        selector: 'leftbar-d',
        templateUrl: 'leftbard.component.html'
    }),
    __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService])
], LeftbardComponent);
exports.LeftbardComponent = LeftbardComponent;
//# sourceMappingURL=leftbard.component.js.map