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
//import * as CryptoJS from 'crypto-js';
var router_1 = require("@angular/router");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var TkitLoginComponent = (function () {
    function TkitLoginComponent(router) {
        this.router = router;
        this.model = {};
        this.visible = false;
        this.visible1 = false;
        this.xyz = false;
        this.nav = false;
        this.visibleUserID = false;
        this.visiblePassword = false;
        this.trSystemId = false;
        this.isSSOEnabled = false;
        this.statusCode = -1;
        this.userId = "";
        this.password = "";
        this.deviceID = "";
        this.systemID = "";
        this.dateTime = "";
        this.accessToken = "";
        this.errorCode = "";
        this._dbConnectionString = "";
        this.strServer = "";
        this.strDatabase = "";
        this.strUserID = "";
        this.strPassword = "";
        this.strSSOVariable = "";
        this.strSSOCookie = "";
        this.strSSOLogout = "";
        this.strSystemId = "";
        this.hdnSystemId = "";
        this.strSSOUser = "";
        this.gStrSSOUser = "";
        this.selectedDB = "";
        this.statusMessage = "";
        this.visible = false;
        this.xyz = false;
        try {
            this.visibleUserID = false;
            this.visiblePassword = false;
        }
        catch (ex) {
        }
    }
    TkitLoginComponent.prototype.labeluser = function () {
        this.visible = !this.visible;
        this.activelabel = this.visible ? 'input-disturbed' : 'hide-class';
    };
    TkitLoginComponent.prototype.labelpass = function () {
        this.visible1 = !this.visible1;
        this.activelabel1 = this.visible ? 'input-disturbed' : 'hide-class';
    };
    TkitLoginComponent.prototype.login = function () {
        console.log('success');
        this.router.navigate(['trackithome/createrequest']);
    };
    TkitLoginComponent.prototype.onFocusUserName = function () {
        try {
            if (this.model.userID == "undefined") {
                this.visibleUserID = !this.visibleUserID;
            }
            else {
                this.visibleUserID = true;
            }
            ;
            this.activeLblUserID = this.visibleUserID ? 'input-disturbed' : 'hide-class';
        }
        catch (ex) {
        }
    };
    TkitLoginComponent.prototype.onFocusPassword = function () {
        try {
            if (this.model.password == "undefined") {
                this.visiblePassword = !this.visiblePassword;
            }
            else {
                this.visiblePassword = true;
            }
            this.activeLblPassword = this.visiblePassword ? 'input-disturbed' : 'hide-class';
        }
        catch (ex) {
        }
    };
    return TkitLoginComponent;
}());
TkitLoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'login-cmp',
        templateUrl: 'Tkit-login.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router])
], TkitLoginComponent);
exports.TkitLoginComponent = TkitLoginComponent;
//# sourceMappingURL=Tkit-login.component.js.map