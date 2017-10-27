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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var LeftBarAnimationService = (function () {
    function LeftBarAnimationService() {
        this.activeLeftBar = "none";
        this.emitChangeSource = new Subject_1.Subject();
        this.emitActiveAppName = new Subject_1.Subject();
        this.emitLeftBarFromTopBar = new Subject_1.Subject();
        this.emitChangeBreadCrumb = new Subject_1.Subject();
        // Observable string streams
        this.changeEmitted$ = this.emitChangeSource.asObservable();
        this.changeEmittedActiveAppName = this.emitActiveAppName.asObservable();
        this.changeEmittedLeftBarFromTopBar = this.emitLeftBarFromTopBar.asObservable();
        this.changeBCEmitted$ = this.emitChangeBreadCrumb.asObservable();
        if (localStorage.getItem('isAtParDashboard') != null && localStorage.getItem('isAtParDashboard') != undefined) {
            if (localStorage.getItem('isAtParDashboard') == 'YES') {
                this.activeLeftBar = 'none';
            }
            else {
                if (localStorage.getItem('activeLeftBarMenu') != null && localStorage.getItem('activeLeftBarMenu') != undefined) {
                    this.activeLeftBar = localStorage.getItem('activeLeftBarMenu').toString();
                }
            }
        }
        else {
            if (localStorage.getItem('activeLeftBarMenu') != null && localStorage.getItem('activeLeftBarMenu') != undefined) {
                this.activeLeftBar = localStorage.getItem('activeLeftBarMenu').toString();
            }
        }
    }
    LeftBarAnimationService.prototype.getActiveLeftBar = function () {
        return this.activeLeftBar;
    };
    LeftBarAnimationService.prototype.setActiveLeftBar = function (name) {
        this.activeLeftBar = name;
        localStorage.setItem('activeLeftBarMenu', this.activeLeftBar);
    };
    LeftBarAnimationService.prototype.getLeftBarMargin = function () {
        if (localStorage.getItem('ActiveGroup') != null && localStorage.getItem('ActiveGroup') != undefined) {
            return true;
        }
        else {
            return this.isHomeClicked;
        }
    };
    LeftBarAnimationService.prototype.isHide = function () {
        this.activeLeftBar = "none";
        localStorage.setItem('activeLeftBarMenu', this.activeLeftBar);
    };
    // Service message commands
    LeftBarAnimationService.prototype.emitChange = function (change) {
        this.emitChangeSource.next(change);
    };
    LeftBarAnimationService.prototype.emitChangeActiveMenu = function (activeMenu) {
        this.emitActiveAppName.next(activeMenu);
    };
    LeftBarAnimationService.prototype.emitChangeLeftBarFromTopBar = function (active) {
        this.emitLeftBarFromTopBar.next(active);
    };
    LeftBarAnimationService.prototype.emitChangeBreadCrumbEvt = function (change) {
        this.emitChangeBreadCrumb.next(change);
    };
    LeftBarAnimationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], LeftBarAnimationService);
    return LeftBarAnimationService;
}());
exports.LeftBarAnimationService = LeftBarAnimationService;
//# sourceMappingURL=trackit.leftbar-animation.service.js.map