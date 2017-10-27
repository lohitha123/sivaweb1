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
var PickAllocateBunitService = (function () {
    function PickAllocateBunitService(httpservice) {
        this.httpservice = httpservice;
    }
    PickAllocateBunitService.prototype.getBUnits = function (bArray, userID, bUnit, description, serverUserID) {
        return this.httpservice.get({
            apiMethod: "/api/PickAllocBU/GetBUnits",
            params: {
                "bArray": bArray,
                "appId": "5",
                "userID": userID,
                "bUnit": bUnit,
                "description": description,
                "serverUserID": serverUserID
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    PickAllocateBunitService.prototype.allocateBUnits = function (userID, serverUserID, lstBUnitsAllocation, blnSearched, lstCheckedBUnits) {
        return this.httpservice.create({
            apiMethod: "/api/PickAllocBU/AllocateBUnits",
            formData: lstCheckedBUnits,
            params: {
                "appId": "5",
                "userID": userID,
                "serverUserID": serverUserID,
                "lstBUnitsAllocation": lstBUnitsAllocation,
                "searched": blnSearched
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    PickAllocateBunitService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    PickAllocateBunitService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], PickAllocateBunitService);
    return PickAllocateBunitService;
}());
exports.PickAllocateBunitService = PickAllocateBunitService;
//# sourceMappingURL=pick-allocate-business-units.service.js.map