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
var http_1 = require("@angular/http");
var tkitHttpService_1 = require("../Shared/tkitHttpService");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var TrackitloginService = (function () {
    function TrackitloginService(httpservice) {
        this.httpservice = httpservice;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    TrackitloginService.prototype.GetAccessToken = function (userID, passHash, loginType, dateTime, deviceID, accessToken, SSOByPass) {
        return this.httpservice.get({
            "apiMethod": "/api/Login/GetAccessToken",
            params: {
                "userID": userID,
                "pPassword": passHash,
                "loginType": loginType,
                "dateTime": dateTime,
                "deviceID": deviceID,
                "accessToken": accessToken,
                "SSOByPass": SSOByPass
            }
        });
    };
    TrackitloginService.prototype.CheckLogin = function (userId, password) {
        return this.httpservice.getSync({
            "apiMethod": "/api/TrackITLogin/CheckLogin",
            params: {
                "userID": userId,
                "pPassword": password
            }
        });
    };
    TrackitloginService.prototype.GetSystemIDs = function (data) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Common/GetSystemIDs",
            params: {
                "systemID": data
            }
        });
    };
    TrackitloginService.prototype.GetOrgGroupParamValue = function (orgParamName, appID, orgGroupID) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Common/GetOrgGroupParamValue",
            params: {
                "orgParamName": orgParamName,
                "appID": appID,
                "orgGroupID": orgGroupID
            }
        });
    };
    TrackitloginService.prototype.GetAppRoleIDs = function (userID) {
        return this.httpservice.getSync({
            "apiMethod": "/api/User/GetAppRoleIDs",
            params: {
                "UserId": userID
            }
        });
    };
    TrackitloginService.prototype.GetUserOrgGrpID = function (userID) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Common/GetUserOrgGrpID",
            params: {
                "userID": userID
            }
        });
    };
    TrackitloginService.prototype.GetRecordsPerPage = function (userID) {
        return this.httpservice.getSync({
            "apiMethod": "/api/User/GetUser",
            params: {
                "userId": userID
            }
        });
    };
    TrackitloginService.prototype.GetTKITMyPreferences = function (preference, requestorID) {
        return this.httpservice.getSync({
            "apiMethod": "/api/CommonTrackIT/GetTKITMyPreferences",
            params: {
                "preference": preference,
                "requestorID": requestorID
            }
        });
    };
    TrackitloginService.prototype.IsValidUser = function (userID) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Login/IsValidUser",
            params: {
                "userId": userID
            }
        });
    };
    TrackitloginService.prototype.GetIpAddress = function () {
        return this.httpservice.getSync({
            "apiMethod": "/api/Login/GetIpAddress",
        });
    };
    TrackitloginService.prototype.GetRequestedItemsCount = function () {
        return this.httpservice.getSync({
            "apiMethod": "/api/ViewCart/GetRequestedItemsCount",
            params: {}
        });
    };
    TrackitloginService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [tkitHttpService_1.TkitHttpService])
    ], TrackitloginService);
    return TrackitloginService;
}());
exports.TrackitloginService = TrackitloginService;
//# sourceMappingURL=trackit.login.service.js.map