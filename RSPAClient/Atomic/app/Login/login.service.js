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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var loginService = (function () {
    function loginService(_http) {
        this._http = _http;
        this.url = "http://localhost:8001/";
        this.Version = "Version.xml";
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    loginService.prototype.GetAccessToken = function (pUserID, pPassHash, pLoginType, pDateTime, pDeviceID, pAccessToken, pSSOByPass, pAccessTokenXML, pDeviceTokenEntry) {
        pAccessToken = "1235";
        return this._http.get(this.url + "api/Login/GetAccessToken?pUserID=" + pUserID + "&&pPassword=" + pPassHash + "&&pLoginType=" + pLoginType + "&&pDateTime=" + pDateTime + "&&pDeviceID=" + pDeviceID + "&&pAccessToken=" + pAccessToken + "&&pSSOByPass=" + pSSOByPass + "&&pDeviceTokenEntry=" + pDeviceTokenEntry[0] + "&&pDeviceTokenEntry=" + pDeviceTokenEntry[1] + "&&pDeviceTokenEntry=" + pDeviceTokenEntry[2] + "&&pDeviceTokenEntry=" + pDeviceTokenEntry[3] + "&&pDeviceTokenEntry=" + pDeviceTokenEntry[4] + "&&pDeviceTokenEntry=" + pDeviceTokenEntry[5] + "&&pDeviceTokenEntry=" + pDeviceTokenEntry[6] + "&&pDeviceTokenEntry=" + pDeviceTokenEntry[7] + "&&pDeviceTokenEntry=" + pDeviceTokenEntry[8] + "")
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    loginService.prototype.GetSystemIDs = function (data) {
        return this._http.get(this.url + "api/Login/GetSystemIDS?pSystemID=" + data)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    loginService.prototype.IsValidUser = function (_strSSOUser, _IsValidUser, _deviceTokenEntry) {
    };
    loginService.prototype.getFileData = function () {
        return this._http.get(this.Version)
            .map(function (response) { return response.text(); });
    };
    loginService.prototype.handleError = function (error) {
        console.error('Web Api not hosted properly or server not available ', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return loginService;
}());
loginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], loginService);
exports.loginService = loginService;
//# sourceMappingURL=login.service.js.map