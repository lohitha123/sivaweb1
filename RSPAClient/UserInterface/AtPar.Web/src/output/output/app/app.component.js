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
var AtParEnums_1 = require("./Shared/AtParEnums");
var izendaintegrate_1 = require("./_helpers/izendaintegrate");
var HttpService_1 = require("./Shared/HttpService");
var tkitHttpService_1 = require("./Shared/tkitHttpService");
var AppComponent = (function () {
    function AppComponent(router, httpService, tkitHttpService, izItergrate) {
        this.router = router;
        this.httpService = httpService;
        this.tkitHttpService = tkitHttpService;
        this.izItergrate = izItergrate;
        this.izItergrate.DoIzendaConfig();
    }
    AppComponent.prototype.onLoadHandler = function (event) {
        if (this.router.url.indexOf('/trackit') != 0) {
            this.onAtParLoad();
        }
        else {
            this.onTrackITLoad();
        }
        if (sessionStorage.getItem('isRefreshTab') != null && sessionStorage.getItem('isRefreshTab') != undefined && sessionStorage.getItem('isRefreshTab') != '') {
            if (sessionStorage.getItem('isRefreshTab') == AtParEnums_1.YesNo_Enum.Y.toString()) {
                sessionStorage.removeItem('isRefreshTab');
                sessionStorage.removeItem('localStorageItems');
                sessionStorage.removeItem('sessionStorageItems');
            }
        }
    };
    AppComponent.prototype.onAtParLoad = function () {
        var appTabCount = 1;
        if (localStorage.getItem('appTabCount') != null && localStorage.getItem('appTabCount') != undefined && localStorage.getItem('appTabCount') != '') {
            appTabCount = parseInt(localStorage.getItem('appTabCount').toString()) + 1;
        }
        localStorage.setItem('appTabCount', appTabCount.toString());
    };
    AppComponent.prototype.onTrackITLoad = function () {
        var tkitAppTabCount = 1;
        if (localStorage.getItem('tkitAppTabCount') != null && localStorage.getItem('tkitAppTabCount') != undefined && localStorage.getItem('tkitAppTabCount') != '') {
            tkitAppTabCount = parseInt(localStorage.getItem('tkitAppTabCount').toString()) + 1;
        }
        localStorage.setItem('tkitAppTabCount', tkitAppTabCount.toString());
    };
    AppComponent.prototype.onBeforeUnLoadHandler = function (event) {
        if (this.router.url.indexOf('/trackit') != 0) {
            this.onAtParBeforeUnLoad();
        }
        else {
            this.onTrackITBeforeUnLoad();
        }
    };
    AppComponent.prototype.onAtParBeforeUnLoad = function () {
        var appTabCount = 1;
        if (localStorage.getItem('appTabCount') != null && localStorage.getItem('appTabCount') != undefined && localStorage.getItem('appTabCount') != '') {
            appTabCount = parseInt(localStorage.getItem('appTabCount').toString()) - 1;
            localStorage.setItem('appTabCount', appTabCount.toString());
            if (parseInt(localStorage.getItem('appTabCount').toString()) == 0) {
                var values = [];
                var keys = Object.keys(localStorage);
                var i = keys.length;
                while (i--) {
                    if (keys[i].indexOf('tkit') != 0) {
                        var obj = { 'key': keys[i], 'value': localStorage.getItem(keys[i]) };
                        values.push(obj);
                    }
                }
                this.localStorageItems = values;
                values = [];
                keys = Object.keys(sessionStorage);
                i = keys.length;
                while (i--) {
                    var obj = { 'key': keys[i], 'value': sessionStorage.getItem(keys[i]) };
                    values.push(obj);
                }
                this.sessionStorageItems = values;
                this.httpService.clearAppSession();
                localStorage.removeItem('appTabCount');
                sessionStorage.setItem('localStorageItems', JSON.stringify(this.localStorageItems));
                sessionStorage.setItem('sessionStorageItems', JSON.stringify(this.sessionStorageItems));
                sessionStorage.setItem('isRefreshTab', AtParEnums_1.YesNo_Enum.Y.toString());
            }
        }
    };
    AppComponent.prototype.onTrackITBeforeUnLoad = function () {
        var tkitAppTabCount = 1;
        if (localStorage.getItem('tkitAppTabCount') != null && localStorage.getItem('tkitAppTabCount') != undefined && localStorage.getItem('tkitAppTabCount') != '') {
            tkitAppTabCount = parseInt(localStorage.getItem('tkitAppTabCount').toString()) - 1;
            localStorage.setItem('tkitAppTabCount', tkitAppTabCount.toString());
            if (parseInt(localStorage.getItem('tkitAppTabCount').toString()) == 0) {
                var values = [];
                var keys = Object.keys(localStorage);
                var i = keys.length;
                while (i--) {
                    if (keys[i].indexOf('tkit') == 0) {
                        var obj = { 'key': keys[i], 'value': localStorage.getItem(keys[i]) };
                        values.push(obj);
                    }
                }
                this.localStorageItems = values;
                values = [];
                keys = Object.keys(sessionStorage);
                i = keys.length;
                while (i--) {
                    var obj = { 'key': keys[i], 'value': sessionStorage.getItem(keys[i]) };
                    values.push(obj);
                }
                this.sessionStorageItems = values;
                this.tkitHttpService.clearAppSession();
                localStorage.removeItem('tkitAppTabCount');
                sessionStorage.setItem('localStorageItems', JSON.stringify(this.localStorageItems));
                sessionStorage.setItem('sessionStorageItems', JSON.stringify(this.sessionStorageItems));
                sessionStorage.setItem('isRefreshTab', AtParEnums_1.YesNo_Enum.Y.toString());
            }
        }
    };
    __decorate([
        core_1.HostListener('window:load', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "onLoadHandler", null);
    __decorate([
        core_1.HostListener('window:beforeunload', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [BeforeUnloadEvent]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "onBeforeUnLoadHandler", null);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app.component.html',
            providers: [
                HttpService_1.HttpService,
                tkitHttpService_1.TkitHttpService
            ]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            HttpService_1.HttpService,
            tkitHttpService_1.TkitHttpService,
            izendaintegrate_1.IzendaIntegrate])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map