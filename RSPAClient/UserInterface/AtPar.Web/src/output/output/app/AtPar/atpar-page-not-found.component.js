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
var router_1 = require("@angular/router");
var PageNotFoundComponent = (function () {
    function PageNotFoundComponent(router) {
        this.router = router;
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
        this.validateUser();
    };
    PageNotFoundComponent.prototype.validateUser = function () {
        if (sessionStorage.getItem('DeviceTokenEntry') != null && sessionStorage.getItem('DeviceTokenEntry') != undefined) {
            this.router.navigate(['atpar']);
        }
        else {
            this.router.navigate(['login']);
        }
        if (localStorage.getItem('tkitDeviceTokenEntry') != null && localStorage.getItem('tkitDeviceTokenEntry') != undefined) {
            this.router.navigate(['trackitdashboard']);
        }
        else {
            this.router.navigate(['trackitlogin']);
        }
    };
    PageNotFoundComponent = __decorate([
        core_1.Component({
            selector: 'atpar-page-not-found',
            template: '<div>page not found</div>'
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());
exports.PageNotFoundComponent = PageNotFoundComponent;
var SameUrlComponent = (function () {
    function SameUrlComponent() {
    }
    SameUrlComponent = __decorate([
        core_1.Component({
            selector: 'atpar-same-url',
            template: '<div style="margin-top:-5% !important">same router called</div>'
        })
    ], SameUrlComponent);
    return SameUrlComponent;
}());
exports.SameUrlComponent = SameUrlComponent;
//# sourceMappingURL=atpar-page-not-found.component.js.map