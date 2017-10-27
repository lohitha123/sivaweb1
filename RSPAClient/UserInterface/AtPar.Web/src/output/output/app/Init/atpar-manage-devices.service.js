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
require("rxjs/add/operator/map");
var HttpService_1 = require("../Shared/HttpService");
var ManageDevicesService = (function () {
    function ManageDevicesService(httpService, http) {
        this.httpService = httpService;
        this.http = http;
    }
    ManageDevicesService.prototype.getDevIDs = function (userID, deviceSearch) {
        return this.httpService.getSync({
            apiMethod: "/api/ManageDevices/GetDevices",
            params: {
                "userID": userID,
                "deviceSearch": deviceSearch
            }
        });
    };
    ManageDevicesService.prototype.updateDeviceStatus = function (userID, deviceID, deviceStatus) {
        return this.httpService.update({
            apiMethod: "/api/ManageDevices/UpdateDeviceStatus",
            params: {
                "userID": userID,
                "devID": deviceID,
                "status": deviceStatus
            }
        }).toPromise();
    };
    ManageDevicesService.prototype.saveDevice = function (userID, devID, desc, macAddr) {
        return this.httpService.create({
            apiMethod: "/api/ManageDevices/SaveDevice",
            params: {
                "userID": userID,
                "devID": devID,
                "desc": desc,
                "macAddr": macAddr
            }
        });
    };
    ManageDevicesService.prototype.updateDevice = function (userID, devID, desc, oldMacAddr, newMacAddr) {
        return this.httpService.update({
            apiMethod: "/api/ManageDevices/UpdateDevice",
            params: {
                "userID": userID,
                "devID": devID,
                "desc": desc,
                "oldMacAddr": oldMacAddr,
                "newMacAddr": newMacAddr
            }
        }).toPromise();
    };
    ManageDevicesService.prototype.deleteDevice = function (userID, devID, desc, macAddr) {
        return this.httpService.create({
            apiMethod: "/api/ManageDevices/DeleteDevice",
            params: {
                "userID": userID,
                "devID": devID,
                "desc": desc,
                "macAddr": macAddr
            }
        }).toPromise();
    };
    ManageDevicesService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http])
    ], ManageDevicesService);
    return ManageDevicesService;
}());
exports.ManageDevicesService = ManageDevicesService;
//# sourceMappingURL=atpar-manage-devices.service.js.map