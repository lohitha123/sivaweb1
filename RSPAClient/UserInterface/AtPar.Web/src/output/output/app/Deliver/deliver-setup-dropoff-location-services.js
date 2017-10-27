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
var HttpService_1 = require("../Shared/HttpService");
var Rx_1 = require("rxjs/Rx");
var DeliverySetupDropOffServices = (function () {
    function DeliverySetupDropOffServices(httpservice) {
        this.httpservice = httpservice;
    }
    DeliverySetupDropOffServices.prototype.getDropOffLocs = function (locID, locDesc, orgGroupID, deviceTokenEntry) {
        return this.httpservice.getSync({
            apiMethod: "/api/DropOffLocs/GetDropOffLocs",
            params: {
                "locID": locID,
                "locDesc": locDesc,
                "orgGroupID": orgGroupID,
                "deviceTokenEntry": deviceTokenEntry
            }
        });
    };
    DeliverySetupDropOffServices.prototype.addDropOffLocs = function (lstDBData, deviceTokenEntry) {
        return this.httpservice.create({
            apiMethod: "/api/DropOffLocs/InsertDropOffLocs",
            formData: lstDBData,
            params: {
                "deviceTokenEntry": deviceTokenEntry
            }
        }).toPromise();
    };
    DeliverySetupDropOffServices.prototype.UpdateDropOffLocs = function (drpLocID, locDesc, orgGroupID, userID, prevLocID, deviceTokenEntry) {
        return this.httpservice.create({
            apiMethod: "/api/DropOffLocs/EditUpdateDropOffLocs",
            params: {
                "drpLocID": drpLocID,
                "locDesc": locDesc,
                "orgGroupID": orgGroupID,
                "userID": userID,
                "prevLocID": prevLocID,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).toPromise();
    };
    DeliverySetupDropOffServices.prototype.statusUpdateDropOffLocS = function (status, orgGroupID, locID, userID, deviceTokenEntry) {
        return this.httpservice.create({
            apiMethod: "/api/DropOffLocs/UpdateDropOffLocs",
            params: {
                "status": status,
                "orgGroupID": orgGroupID,
                "locID": locID,
                "userID": userID,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).toPromise();
    };
    DeliverySetupDropOffServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    DeliverySetupDropOffServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], DeliverySetupDropOffServices);
    return DeliverySetupDropOffServices;
}());
exports.DeliverySetupDropOffServices = DeliverySetupDropOffServices;
//# sourceMappingURL=deliver-setup-dropoff-location-services.js.map