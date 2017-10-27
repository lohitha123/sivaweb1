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
var ExcludeLocationsService = (function () {
    function ExcludeLocationsService(httpservice) {
        this.httpservice = httpservice;
    }
    ExcludeLocationsService.prototype.getAllLocations = function (setID, location, deviceTokenEntry) {
        return this.httpservice.get({
            apiMethod: "/api/ExcludeLocs/GetAllLocations",
            params: {
                "setID": setID,
                "location": location,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ExcludeLocationsService.prototype.excludeLocs = function (lstLocs, deviceTokenEntry) {
        return this.httpservice.create({
            apiMethod: "/api/ExcludeLocs/ExcludeLocs",
            formData: lstLocs,
            params: {
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ExcludeLocationsService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    ExcludeLocationsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], ExcludeLocationsService);
    return ExcludeLocationsService;
}());
exports.ExcludeLocationsService = ExcludeLocationsService;
//# sourceMappingURL=deliver-exclude-locations.services.js.map