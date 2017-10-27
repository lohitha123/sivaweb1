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
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
var HttpService_1 = require("../Shared/HttpService");
var SetupCostCentersServices = (function () {
    function SetupCostCentersServices(httpservice) {
        this.httpservice = httpservice;
    }
    SetupCostCentersServices.prototype.getOrgGroupList = function (userId) {
        return this.httpservice.get({
            apiMethod: "/api/Common/GetOrgDetails",
            params: {
                "userId": userId
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupCostCentersServices.prototype.getDepartments = function () {
        return this.httpservice.get({
            apiMethod: "/api/CostCenter/GetDepartments",
            params: {}
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupCostCentersServices.prototype.getCostCentersWithoutSearch = function (orgGroupID) {
        return this.httpservice.get({
            apiMethod: "/api/CostCenter/GetCostCenters",
            params: {
                "orgGroupID": orgGroupID
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupCostCentersServices.prototype.getCostCentersWithSearch = function (orgGroupID, search) {
        return this.httpservice.get({
            apiMethod: "/api/CostCenter/GetCostCenters",
            params: {
                "orgGroupID": orgGroupID,
                "search": search
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupCostCentersServices.prototype.createCostCenter = function (newItem) {
        return this.httpservice.create({
            apiMethod: "/api/CostCenter/InsertCostCenter",
            formData: newItem
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupCostCentersServices.prototype.updateCostCenter = function (newItem) {
        return this.httpservice.update({
            apiMethod: '/api/CostCenter/UpdateCostCenter',
            formData: newItem
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupCostCentersServices.prototype.updateCostCenterStatus = function (status, orgId, costCenterCode, deptId) {
        if (status == false) {
            return this.httpservice.update({
                apiMethod: '/api/CostCenter/UpdateCostCenterStatus',
                params: {
                    "status": 1,
                    "orgID": orgId,
                    "costCenterCode": costCenterCode,
                    "deptID": deptId
                }
            }).map(function (res) { return res.json(); }).catch(this.handleError);
        }
        else {
            return this.httpservice.update({
                apiMethod: '/api/CostCenter/UpdateCostCenterStatus',
                params: {
                    "status": 0,
                    "orgID": orgId,
                    "costCenterCode": costCenterCode,
                    "deptID": deptId
                }
            }).map(function (res) { return res.json(); }).catch(this.handleError);
        }
    };
    SetupCostCentersServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    SetupCostCentersServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], SetupCostCentersServices);
    return SetupCostCentersServices;
}());
exports.SetupCostCentersServices = SetupCostCentersServices;
//# sourceMappingURL=atpar-setup-cost-centers.services.js.map