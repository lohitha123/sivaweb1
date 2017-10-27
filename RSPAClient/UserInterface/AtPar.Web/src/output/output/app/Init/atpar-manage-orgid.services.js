"use strict";
/// <reference path="../entities/atparkeyvaluepair.ts" />
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
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
var HttpService_1 = require("../Shared/HttpService");
var ManageOrgIdServices = (function () {
    function ManageOrgIdServices(httpservice) {
        this.httpservice = httpservice;
    }
    ManageOrgIdServices.prototype.getOrgIds = function (userId, orgId, orgName, status) {
        console.log("details");
        return this.httpservice.get({
            apiMethod: "/api/ManageOrgID/GetOrgUnits",
            params: {
                "userId": userId,
                "orgId": orgId,
                "orgType": '',
                "orgName": orgName,
                "status": status
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageOrgIdServices.prototype.updateOrgIDStatus = function (userID, orgID, orgType, status) {
        return this.httpservice.create({
            apiMethod: "/api/ManageOrgID/UpdateOrgIDStatus",
            params: {
                "userID": userID,
                "orgID": orgID,
                "orgType": orgType,
                "status": status
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageOrgIdServices.prototype.getOrgGrpGroups = function (userId) {
        return this.httpservice.get({
            apiMethod: "/api/Common/GetOrgGrpIDs",
            params: {
                "userId": userId,
                "orgGrpId": '',
                "name": ''
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageOrgIdServices.prototype.insertUpdateOrgUnits = function (userID, mode, lstOrgUnits) {
        return this.httpservice.create({
            apiMethod: "/api/ManageOrgID/InsertUpdateOrgUnits",
            params: {
                "userID": userID,
                "mode": mode,
                "newType": 'I',
            },
            formData: [lstOrgUnits]
            //  }).map(res => <RM_ORG_UNITS[]>res.json()).catch(this.handleError);
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageOrgIdServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    ManageOrgIdServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], ManageOrgIdServices);
    return ManageOrgIdServices;
}());
exports.ManageOrgIdServices = ManageOrgIdServices;
//# sourceMappingURL=atpar-manage-orgid.services.js.map