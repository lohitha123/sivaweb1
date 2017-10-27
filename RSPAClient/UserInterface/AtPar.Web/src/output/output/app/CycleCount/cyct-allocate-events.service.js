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
var CyctAllocateEventsService = (function () {
    function CyctAllocateEventsService(httpservice) {
        this.httpservice = httpservice;
        this.deviceTokenEntry = [];
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.deviceTokenEntry = JSON.parse(sessionStorage.getItem("DeviceTokenEntry"));
    }
    CyctAllocateEventsService.prototype.getAllocateEvents = function (userID, bUnit, orgGroupID) {
        return this.httpservice.getSync({
            apiMethod: "/api/AllocateEvents/GetAllocateEvents",
            params: {
                "userID": userID,
                "bUnit": bUnit,
                "orgGroupID": orgGroupID,
            }
        });
    };
    CyctAllocateEventsService.prototype.updateEvents = function (lstdsEventDetails, deviceTokenEntry) {
        return this.httpservice.create({
            apiMethod: "/api/AllocateEvents/AllocateEvents",
            formData: lstdsEventDetails,
            params: {
                "deviceTokenEntry": deviceTokenEntry,
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
        ;
    };
    CyctAllocateEventsService.prototype.handleError = function (error) {
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    CyctAllocateEventsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], CyctAllocateEventsService);
    return CyctAllocateEventsService;
}());
exports.CyctAllocateEventsService = CyctAllocateEventsService;
//# sourceMappingURL=cyct-allocate-events.service.js.map