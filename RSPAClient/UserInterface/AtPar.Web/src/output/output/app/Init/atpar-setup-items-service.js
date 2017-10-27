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
var SetupItemsServices = (function () {
    function SetupItemsServices(httpservice) {
        this.httpservice = httpservice;
    }
    SetupItemsServices.prototype.getVendorDetails = function (orgGroupID, vendorID, search) {
        return this.httpservice.get({
            apiMethod: "/api/Vendor/GetVendorDetails",
            params: {
                "orgGroupID": orgGroupID,
                "vendorID": vendorID,
                "search": search,
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupItemsServices.prototype.getItemDetails = function (ItemId, Description, Vendor, UpicId, Manf, ItemPriceFrom, ItemPriceTo, CustItemId, VendItemId, ManfItemId, Lot, Serial, Mode, Status, OrgGrpId, SubItems) {
        return this.httpservice.get({
            apiMethod: "/api/SetupItems/GetItemDetails",
            params: {
                "ItemID": ItemId,
                "Descr": Description,
                "Vendor": Vendor,
                "UPCcode": UpicId,
                "Manf": Manf,
                "ItemPriceFrom": ItemPriceFrom,
                "ItemPriceTo": ItemPriceTo,
                "CustItemID": CustItemId,
                "VendItemID": VendItemId,
                "ManfItemID": ManfItemId,
                "Lot": Lot,
                "Serial": Serial,
                "Mode": Mode,
                "status": Status,
                "OrgGrpID": OrgGrpId,
                "SubItems": SubItems,
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupItemsServices.prototype.getOrgGroupDetails = function (deviceTokenEntry) {
        return this.httpservice.get({
            apiMethod: "/api/Common/GetUserOrgGroups",
            params: {
                "user": deviceTokenEntry[0],
                "orgGrpId": deviceTokenEntry[5]
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupItemsServices.prototype.CreateSetupItem = function (newItem) {
        return this.httpservice.create({
            apiMethod: "/api/SetupItems/InsertItem",
            formData: newItem
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupItemsServices.prototype.UpdateItem = function (newItem) {
        return this.httpservice.update({
            apiMethod: '/api/SetupItems/UpdateItem',
            formData: newItem
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupItemsServices.prototype.UpdateSubstituteItem = function (OrgGrpId, ItemId, SubItemId, Status, PharmItemAllocated) {
        return this.httpservice.update({
            apiMethod: '/api/SetupItems/UpdateSubstituteItem',
            params: {
                "OrgGrpID": OrgGrpId,
                "ItemID": ItemId,
                "SubItemID": SubItemId,
                "Status": Status,
                "blnPharmItemAllocated": PharmItemAllocated
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupItemsServices.prototype.InsertSubstituteItem = function (OrgGrpId, ItemId, SubItemId, Priority, ItemDescr, Status, blnpharmitemallocated, lstParLocDetails) {
        return this.httpservice.create({
            apiMethod: "/api/SetupItems/InsertSubstituteItem",
            formData: lstParLocDetails,
            params: {
                "OrgGrpID": OrgGrpId,
                "ItemID": ItemId,
                "SubItemID": SubItemId,
                "Priority": Priority,
                "ItemDescr": ItemDescr,
                "Status": Status,
                "blnPharmItemAllocated": blnpharmitemallocated
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupItemsServices.prototype.UpdateItemStatus = function (ItemId, status) {
        if (status == true) {
            return this.httpservice.update({
                apiMethod: '/api/SetupItems/UpdateItemStaus',
                params: {
                    "itemID": ItemId,
                    "status": 0
                }
            }).map(function (res) { return res.json(); }).catch(this.handleError);
        }
        else {
            return this.httpservice.update({
                apiMethod: '/api/SetupItems/UpdateItemStaus',
                params: {
                    "itemID": ItemId,
                    "status": 1
                }
            }).map(function (res) { return res.json(); }).catch(this.handleError);
        }
    };
    SetupItemsServices.prototype.getLatestItemId = function (appId) {
        return this.httpservice.get({
            apiMethod: "/api/SetupItems/GetLatestItemId",
            params: {
                "appID": appId
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupItemsServices.prototype.GetPharmacyItemLocations = function (ItemId) {
        return this.httpservice.get({
            apiMethod: "/api/SetupItems/GetPharmacyItemLocations",
            params: {
                "ItemID": ItemId
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupItemsServices.prototype.GetSubstituteItemDetails = function (ItemId, OrgGrpId) {
        return this.httpservice.get({
            apiMethod: "/api/SetupItems/GetSubstituteItemDetails",
            params: {
                "ItemID": ItemId,
                "OrgGrpID": OrgGrpId
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupItemsServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    SetupItemsServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], SetupItemsServices);
    return SetupItemsServices;
}());
exports.SetupItemsServices = SetupItemsServices;
//# sourceMappingURL=atpar-setup-items-service.js.map