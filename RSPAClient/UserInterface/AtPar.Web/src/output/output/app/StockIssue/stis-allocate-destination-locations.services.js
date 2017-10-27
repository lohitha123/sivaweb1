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
var AllocateDestinationLocationsService = (function () {
    function AllocateDestinationLocationsService(httpservice) {
        this.httpservice = httpservice;
    }
    AllocateDestinationLocationsService.prototype.allocatedDestLocations = function (userID, selectedUserID, lstLocations, searched, bUnit) {
        return this.httpservice.create({
            apiMethod: "/api/AllocateDestinationLocations/AllocatedDestLocations",
            formData: lstLocations,
            params: {
                "userID": userID,
                "selectedUserID": selectedUserID,
                "searched": searched,
                "bUnit": bUnit
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    AllocateDestinationLocationsService.prototype.getAllocInvBUnits = function (appID, userID, orgGrpId) {
        return this.httpservice.get({
            apiMethod: "/api/AllocateDestinationLocations/GetAllocInvBUnits",
            params: {
                "appID": appID,
                "userID": userID,
                "orgGrpId": orgGrpId
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    AllocateDestinationLocationsService.prototype.getDestinationLocations = function (bArray, location, userID, orgGroupID, serverUserID) {
        return this.httpservice.get({
            apiMethod: "/api/AllocateDestinationLocations/GetDestinationLocations",
            params: {
                "bArray": bArray,
                "location": location,
                "userID": userID,
                "orgGroupID": orgGroupID,
                "serverUserID": serverUserID
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    AllocateDestinationLocationsService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    AllocateDestinationLocationsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], AllocateDestinationLocationsService);
    return AllocateDestinationLocationsService;
}());
exports.AllocateDestinationLocationsService = AllocateDestinationLocationsService;
//# sourceMappingURL=stis-allocate-destination-locations.services.js.map