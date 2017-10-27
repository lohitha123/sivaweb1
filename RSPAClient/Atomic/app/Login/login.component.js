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
//import * as CryptoJS from 'crypto-js';
var router_1 = require("@angular/router");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var platform_browser_1 = require("@angular/platform-browser");
/**
*	This class represents the lazy loaded LoginComponent.
*/
//@Component({
//    moduleId: module.id,
//    //selector:'my-app',
//    selector: 'login-cmp',
//    templateUrl: 'login.component.html',
//   // providers: [loginService],
//})
var LoginComponent = (function () {
    function LoginComponent(router, document) {
        this.router = router;
        this.document = document;
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
        this.nameU = '';
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
        this.userLab = true;
        this.passLab = true;
        this.visible = false;
        this.xyz = false;
        try {
            this.visibleUserID = false;
            this.visiblePassword = false;
        }
        catch (ex) {
        }
        console.log(this.userLab);
    }
    LoginComponent.prototype.labeluser = function () {
        this.visible = !this.visible;
        this.activelabel = this.visible ? 'input-disturbed' : 'hide-class';
    };
    LoginComponent.prototype.labelpass = function () {
        this.visible1 = !this.visible1;
        this.activelabel1 = this.visible ? 'input-disturbed' : 'hide-class';
    };
    LoginComponent.prototype.login = function () {
        console.log('success');
        alert(this.userID);
        this.router.navigate(['home']);
    };
    LoginComponent.prototype.onFocusUserName = function () {
        try {
            if (this.model.userID == "undefined") {
                this.visibleUserID = !this.visibleUserID;
            }
            else {
                this.visibleUserID = true;
            }
            ;
            this.activeLblUserID = this.visibleUserID ? 'input-disturbed' : 'hide-class';
            this.userLab = false;
        }
        catch (ex) {
        }
    };
    LoginComponent.prototype.onFocusPassword = function () {
        try {
            if (this.model.password == "undefined") {
                this.visiblePassword = !this.visiblePassword;
            }
            else {
                this.visiblePassword = true;
            }
            this.activeLblPassword = this.visiblePassword ? 'input-disturbed' : 'hide-class';
            this.passLab = false;
        }
        catch (ex) {
        }
    };
    return LoginComponent;
}());
__decorate([
    core_1.ViewChild('userID'),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "user", void 0);
__decorate([
    core_1.ViewChild('f'),
    __metadata("design:type", Object)
], LoginComponent.prototype, "formGroup", void 0);
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'login-cmp',
        templateUrl: 'login.component.html'
    }),
    __param(1, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [router_1.Router, Object])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map