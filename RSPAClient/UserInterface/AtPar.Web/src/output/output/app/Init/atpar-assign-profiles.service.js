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
var HttpService_1 = require("../Shared/HttpService");
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/toPromise");
var AssignProfilesService = (function () {
    function AssignProfilesService(httpservice) {
        this.httpservice = httpservice;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    AssignProfilesService.prototype.GetOrgGroupIds = function (userId, orgGrpId, name) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Common/GetOrgGrpIDs",
            params: {
                "userId": userId,
                "orgGrpId": orgGrpId,
                "name": name
            }
        });
    };
    AssignProfilesService.prototype.GetProfileIds = function (userID) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Common/GetProfiles",
            params: {
                "userID": userID
            }
        });
    };
    AssignProfilesService.prototype.GetProfileUserInfo = function (userId, uId, lDap, fName, lOrg, profileId, orgGrpId) {
        return this.httpservice.getSync({
            "apiMethod": "/api/AssignProfile/GetProfileUsersInfo",
            params: {
                "userID": userId,
                "uID": uId,
                "lDap": lDap,
                "fName": fName,
                "lOrg": lOrg,
                "profileID": profileId,
                "orgGrpID": orgGrpId
            }
        });
    };
    AssignProfilesService.prototype.SaveProfileUsersInfo = function (lstProfUserInfo, profile, orgGrp, uId) {
        return this.httpservice.create({
            "apiMethod": "/api/AssignProfile/SaveProfileUsersInfo",
            formData: lstProfUserInfo,
            params: {
                "profile": profile,
                "orgGrp": orgGrp,
                "uId": uId
            }
        }).toPromise(); //.map(res => res.json()).catch(this.handleError)
    };
    AssignProfilesService.prototype.GetSecurityParamVal = function (userId) {
        return this.httpservice.getSync({
            "apiMethod": "/api/AssignProfile/GetSecurityParamVal",
            params: {
                "userId": userId
            }
        }); //.map(res => res.json()).catch(this.handleError)
    };
    AssignProfilesService.prototype.GetServerAccessCnt = function (userId, profileId) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Common/GetServerAccessCnt",
            params: {
                "userId": userId,
                "profileId": profileId
            }
        }); //.map(res => res.json()).catch(this.handleError)
    };
    AssignProfilesService.prototype.GetClientAccessCnt = function (userId, profileId) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Common/GetClientAccessCnt",
            params: {
                "userId": userId,
                "profileId": profileId
            }
        }); //.map(res => res.json()).catch(this.handleError)
    };
    AssignProfilesService.prototype.GetAuditAllowed = function (userId, appId, menuCode) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Common/GetAuditAllowed",
            params: {
                "userId": userId,
                "appId": appId,
                "menuCode": menuCode
            }
        }); //.map(res => res.json()).catch(this.handleError)
    };
    AssignProfilesService.prototype.InsertAuditData = function (audit, pStrUser, pStrFunction) {
        return this.httpservice.create({
            "apiMethod": "/api/Common/InsertAuditData",
            formData: audit,
            params: {
                "pStrUser": pStrUser,
                "pStrFunction": pStrFunction
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    AssignProfilesService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    AssignProfilesService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], AssignProfilesService);
    return AssignProfilesService;
}());
exports.AssignProfilesService = AssignProfilesService;
//# sourceMappingURL=atpar-assign-profiles.service.js.map