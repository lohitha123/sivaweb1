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
var SetupVendorServices = (function () {
    // public headers: Headers;
    function SetupVendorServices(httpservice) {
        this.httpservice = httpservice;
    }
    SetupVendorServices.prototype.getVendorDetails = function (orgGroupID, vendorID, search) {
        return this.httpservice.get({
            apiMethod: "/api/Vendor/GetVendorDetails",
            params: {
                "orgGroupID": orgGroupID,
                "vendorID": vendorID,
                "search": search,
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupVendorServices.prototype.GetOrgGroup = function (userId) {
        return this.httpservice.get({
            apiMethod: "/api/Common/GetOrgDetails",
            params: {
                "userId": userId
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupVendorServices.prototype.CreateVendor = function (newItem) {
        return this.httpservice.create({
            apiMethod: "/api/Vendor/CreateVendor",
            formData: newItem
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupVendorServices.prototype.UpdateVendor = function (newItem) {
        return this.httpservice.update({
            apiMethod: '/api/Vendor/UpdateVendor',
            formData: newItem
            //   }).map(res => <PAR_MNGT_VENDOR[]>res.json()).catch(this.handleError);
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupVendorServices.prototype.UpdateVendorStatus = function (status, vendorid) {
        if (status == true) {
            return this.httpservice.update({
                apiMethod: '/api/Vendor/UpdateVendorStatus',
                params: {
                    "status": 0,
                    "vendorID": vendorid
                }
                // }).map(res => <PAR_MNGT_VENDOR[]>res.json()).catch(this.handleError);
            }).map(function (res) { return res.json(); }).catch(this.handleError);
        }
        else {
            return this.httpservice.update({
                apiMethod: '/api/Vendor/UpdateVendorStatus',
                params: {
                    "status": 1,
                    "vendorID": vendorid
                }
                //  }).map(res => <PAR_MNGT_VENDOR[]>res.json()).catch(this.handleError);
            }).map(function (res) { return res.json(); }).catch(this.handleError);
        }
    };
    SetupVendorServices.prototype.GetVendorUsers = function (vendorID, orgGroupID) {
        return this.httpservice.get({
            apiMethod: "/api/Vendor/GetVendorUsers",
            params: {
                "vendorID": vendorID,
                "orgGroupID": orgGroupID
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupVendorServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    SetupVendorServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], SetupVendorServices);
    return SetupVendorServices;
}());
exports.SetupVendorServices = SetupVendorServices;
//# sourceMappingURL=atpar-setup-vendors.services.js.map