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
var POUDeptLocationAllocateService = (function () {
    function POUDeptLocationAllocateService(httpservice) {
        this.httpservice = httpservice;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    POUDeptLocationAllocateService.prototype.getUserDepartments = function (userID, orgGrpID) {
        return this.httpservice.getSync({
            apiMethod: "/api/Common/GetUserDepartments",
            params: {
                "userID": userID,
                "orgGrpID": orgGrpID
            }
        });
    };
    POUDeptLocationAllocateService.prototype.getDeptCartAllocationDetails = function (businessUnit, cartId, display, locationType) {
        return this.httpservice.getSync({
            apiMethod: "/api/DepartmentLocationAllocation/GetDeptCartAllocationDetails",
            params: {
                "businessUnit": businessUnit,
                "cartId": cartId,
                "display": display,
                "locationType": locationType
            }
        });
    };
    POUDeptLocationAllocateService.prototype.updateEvents = function (lstDeptCartAllocations, deptId, orgGroupId, appId) {
        return this.httpservice.create({
            apiMethod: "/api/DepartmentLocationAllocation/SaveDeptCartAlloc",
            formData: lstDeptCartAllocations,
            params: {
                "deptId": deptId,
                "orgGroupId": orgGroupId,
                "appId": appId
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
        ;
    };
    POUDeptLocationAllocateService.prototype.handleError = function (error) {
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    POUDeptLocationAllocateService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], POUDeptLocationAllocateService);
    return POUDeptLocationAllocateService;
}());
exports.POUDeptLocationAllocateService = POUDeptLocationAllocateService;
//# sourceMappingURL=pou-department-location-allocation.service.js.map