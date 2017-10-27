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
var ManageRequestorServices = (function () {
    function ManageRequestorServices(httpservice) {
        this.httpservice = httpservice;
    }
    ManageRequestorServices.prototype.getTKITAllDepts = function (deptID, status, deviceTokenEntry) {
        return this.httpservice.get({
            apiMethod: "/api/ManageRequestor/GetTKITAllDepts",
            params: {
                "deptID": deptID,
                "status": status,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageRequestorServices.prototype.getAllRequestors = function (search, devicetokenEntry) {
        return this.httpservice.get({
            apiMethod: "/api/ManageRequestor/GetAllRequestors",
            params: {
                "search": search,
                "devicetokenEntry": devicetokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageRequestorServices.prototype.getRequestorDetails = function (requestorID, devicetokenEntry) {
        return this.httpservice.get({
            apiMethod: "/api/ManageRequestor/GetRequestorDetails",
            params: {
                "requestorID": requestorID,
                "deviceTokenEntry": devicetokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageRequestorServices.prototype.getLocations = function (devicetokenEntry) {
        return this.httpservice.get({
            apiMethod: "/api/CommonTrackIT/GetLocations",
            params: {
                "deviceTokenEntry": devicetokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageRequestorServices.prototype.getOrgGroupList = function (userId) {
        return this.httpservice.get({
            apiMethod: "/api/Common/GetOrgDetails",
            params: {
                "userId": userId
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageRequestorServices.prototype.saveRequestorDetails = function (requestor, lstRequestorDepts, Password, deviceTokenEntry) {
        var requestorDetails = { "requestor": requestor, "lstRequestorDepts": lstRequestorDepts };
        return this.httpservice.create({
            apiMethod: "/api/ManageRequestor/SaveRequestorDetails",
            formData: requestorDetails,
            params: {
                "pPassword": Password,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageRequestorServices.prototype.updateRequestorDetails = function (requestor, lstRequestorDepts, Password, deviceTokenEntry) {
        var requestorDetails = { "requestor": requestor, "lstRequestorDepts": lstRequestorDepts };
        return this.httpservice.update({
            apiMethod: '/api/ManageRequestor/UpdateRequestorDetails',
            formData: requestorDetails,
            params: {
                "pPassword": Password,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageRequestorServices.prototype.updateRequestorStatus = function (requestorID, status, deviceTokenEntry) {
        if (status == 'A') {
            return this.httpservice.update({
                apiMethod: '/api/ManageRequestor/UpdateRequestorStatus',
                params: {
                    "requestorID": requestorID,
                    "status": "I",
                    "deviceTokenEntry": deviceTokenEntry
                }
            }).map(function (res) { return res.json(); }).catch(this.handleError);
        }
        else {
            return this.httpservice.update({
                apiMethod: '/api/ManageRequestor/UpdateRequestorStatus',
                params: {
                    "requestorID": requestorID,
                    "status": "A",
                    "deviceTokenEntry": deviceTokenEntry
                }
            }).map(function (res) { return res.json(); }).catch(this.handleError);
        }
    };
    ManageRequestorServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    ManageRequestorServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], ManageRequestorServices);
    return ManageRequestorServices;
}());
exports.ManageRequestorServices = ManageRequestorServices;
//# sourceMappingURL=tkit-manage-requestor.services.js.map