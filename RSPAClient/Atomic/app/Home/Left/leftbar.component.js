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
var LeftBarComponent = (function () {
    function LeftBarComponent(leftbaranimationService, router, document) {
        this.leftbaranimationService = leftbaranimationService;
        this.router = router;
        this.document = document;
        this.isActivec = false;
        this.isActivem = false;
        this.isActivet = false;
        this.isActiver = false;
        this.display = false;
        this.showStyle = true;
        this.MenuSelected = new core_1.EventEmitter();
    }
    LeftBarComponent.prototype.getDisplay = function () {
        this.activeMenu = this.leftbaranimationService.get();
        console.log(this.activeMenu);
        return this.leftbaranimationService.get();
    };
    LeftBarComponent.prototype.configDown = function () {
        this.document.getElementById('main').style.margin = "";
        this.document.getElementById('leftsidebar').style.display = "block";
        this.document.getElementById('leftsidebar').style.width = "";
        this.document.getElementById('menu-icon').style.left = "154px";
        this.document.getElementById('drop2').style.display = "none";
        this.isActivec = !this.isActivec;
        if (this.isActivec) {
            this.document.getElementById('drop1').style.display = "block";
        }
        else {
            this.document.getElementById('drop1').style.display = "none";
        }
        this.isActivet = false;
        this.isActivem = false;
        this.isActiver = false;
    };
    LeftBarComponent.prototype.configDown1 = function () {
        this.router.navigate(['home']);
        // this.MenuSelected.emit('/AtPar/ConfigurationManager');
        //this.activeMenu = this.leftbaranimationService.get();
        //  this.router.navigate(['/ConfigurationManager']);
    };
    LeftBarComponent.prototype.manguserDown = function () {
        this.document.getElementById('main').style.margin = "";
        this.document.getElementById('leftsidebar').style.display = "block";
        this.document.getElementById('leftsidebar').style.width = "";
        this.document.getElementById('menu-icon').style.left = "154px";
        //this.document.getElementById('mobile-off').style.display = "block";
        this.document.getElementById('drop1').style.display = "none";
        this.isActivem = !this.isActivem;
        if (this.isActivem) {
            this.document.getElementById('drop2').style.display = "block";
        }
        else {
            this.document.getElementById('drop2').style.display = "none";
        }
        this.isActivec = false;
        this.isActivet = false;
        this.isActiver = false;
        console.log(this.isActivem);
    };
    LeftBarComponent.prototype.toolDown = function () {
        this.isActivet = !this.isActivet;
        this.isActivec = false;
        this.isActivem = false;
        this.isActiver = false;
    };
    LeftBarComponent.prototype.reportDown = function () {
        this.isActiver = !this.isActiver;
        this.isActivec = false;
        this.isActivet = false;
        this.isActivem = false;
    };
    LeftBarComponent.prototype.mobileDisplay = function () {
        this.display = !this.display;
    };
    return LeftBarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], LeftBarComponent.prototype, "inputData", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LeftBarComponent.prototype, "MenuSelected", void 0);
LeftBarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'leftbar-cmp',
        templateUrl: 'leftbar.component.html',
        providers: [leftbar_animation_service_1.LeftBarAnimationService]
    }),
    __param(2, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService, router_1.Router, Object])
], LeftBarComponent);
exports.LeftBarComponent = LeftBarComponent;
//# sourceMappingURL=leftbar.component.js.map