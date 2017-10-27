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
var SetupInventoryServices = (function () {
    function SetupInventoryServices(httpservice) {
        this.httpservice = httpservice;
    }
    SetupInventoryServices.prototype.getUserOrgGroups = function (user, orgGrpId) {
        return this.httpservice.get({
            apiMethod: "/api/Common/GetOrgDetails",
            params: {
                "userId": user
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
        //return this.httpservice.get({
        //    apiMethod: "/api/Common/GetOrgGroupIDS",
        //    params: {
        //        "user": user,
        //        "orgGrpId": orgGrpId,
        //        "deviceTokenEntry": _deviceTokenEntry
        //    }
        //}).map(res => <MT_ATPAR_ORG_GROUPS[]>res.json()).catch(this.handleError);
    };
    SetupInventoryServices.prototype.getOrgBusinessUnits = function (orgGrpId, businessUnitType) {
        return this.httpservice.get({
            apiMethod: "/api/Common/GetOrgBusinessUnits",
            params: {
                "orgGrpId": orgGrpId,
                "businessUnitType": businessUnitType
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupInventoryServices.prototype.getItemDetailsForAutoComplete = function (orgID, orgGroupID, itemID) {
        return this.httpservice.get({
            apiMethod: "/api/SetupInventory/GetItemDetailsForAutoComplete",
            params: {
                "orgID": orgID,
                "orgGroupID": orgGroupID,
                "itemID": itemID
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupInventoryServices.prototype.getItemDetails = function (orgID, orgGroupID, itemID) {
        return this.httpservice.get({
            apiMethod: "/api/SetupInventory/GetItemDetails",
            params: {
                "orgID": orgID,
                "orgGroupID": orgGroupID,
                "itemID": itemID
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupInventoryServices.prototype.getExistingItemDetails = function (orgID, orgGroupID, itemID) {
        return this.httpservice.get({
            apiMethod: "/api/SetupInventory/GetExistingItemDetails",
            params: {
                "orgID": orgID,
                "orgGroupID": orgGroupID,
                "itemID": itemID
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupInventoryServices.prototype.updateInventoryItems = function (inventory, oldUOM, oldDfltStorLoc, altStorLoc1, oldAltStorLoc1, altStorLoc2, oldAltStorLoc2, orgGroupID) {
        return this.httpservice.update({
            apiMethod: '/api/SetupInventory/UpdateInventoryItems',
            formData: inventory,
            params: {
                "oldUOM": oldUOM,
                "oldDfltStorLoc": oldDfltStorLoc,
                "altStorLoc1": altStorLoc1,
                "oldAltStorLoc1": oldAltStorLoc1,
                "altStorLoc2": altStorLoc2,
                "oldAltStorLoc2": oldAltStorLoc2,
                "orgGroupID": orgGroupID
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupInventoryServices.prototype.insertInventoryItems = function (inventory, altStorLoc1, altStorLoc2, orgGroupID) {
        return this.httpservice.create({
            apiMethod: '/api/SetupInventory/InsertInventoryItems',
            formData: inventory,
            params: {
                "altStorLoc1": altStorLoc1,
                "altStorLoc2": altStorLoc2,
                "orgGroupID": orgGroupID
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupInventoryServices.prototype.updateOrgItemStatus = function (orgID, itemID, uom, dfltStorLoc, altStorloc1, altStorLoc2, status) {
        if (status == true) {
            return this.httpservice.update({
                apiMethod: '/api/SetupInventory/UpdateOrgItemStatus',
                params: {
                    "orgID": orgID,
                    "itemID": itemID,
                    "uom": uom,
                    "dfltStorLoc": dfltStorLoc,
                    "altStorloc1": altStorloc1,
                    "altStorLoc2": altStorLoc2,
                    "status": 0
                }
            }).map(function (res) { return res.json(); }).catch(this.handleError);
        }
        else {
            return this.httpservice.update({
                apiMethod: '/api/SetupInventory/UpdateOrgItemStatus',
                params: {
                    "orgID": orgID,
                    "itemID": itemID,
                    "uom": uom,
                    "dfltStorLoc": dfltStorLoc,
                    "altStorloc1": altStorloc1,
                    "altStorLoc2": altStorLoc2,
                    "status": 1
                }
            }).map(function (res) { return res.json(); }).catch(this.handleError);
        }
    };
    SetupInventoryServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    SetupInventoryServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], SetupInventoryServices);
    return SetupInventoryServices;
}());
exports.SetupInventoryServices = SetupInventoryServices;
//# sourceMappingURL=atpar-setup-inventory.services.js.map