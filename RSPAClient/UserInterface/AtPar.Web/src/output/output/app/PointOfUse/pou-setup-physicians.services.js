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
var SetupPhysicianServices = (function () {
    function SetupPhysicianServices(httpservice) {
        this.httpservice = httpservice;
    }
    SetupPhysicianServices.prototype.addPhysican = function (physicianId, fName, lName, minitial, userID) {
        return this.httpservice.create({
            apiMethod: "/api/Physician/AddPhysicianHeader",
            params: {
                "physicianId": physicianId,
                "fName": fName,
                "lName": lName,
                "minitial": minitial,
                "userID": userID
            }
        }).toPromise();
    };
    SetupPhysicianServices.prototype.getPhysiciansList = function (strPhysicianID, strFname, strLname, strMinitial) {
        return this.httpservice.getSync({
            apiMethod: "/api/Physician/GetPhysicianList",
            params: {
                "strPhysicianID": strPhysicianID,
                "strFname": strFname,
                "strLname": strLname,
                "strMinitial": strMinitial
            }
        });
    };
    SetupPhysicianServices.prototype.deletePhysican = function (physicianId, physicianStatus, userID) {
        return this.httpservice.update({
            apiMethod: "/api/Physician/DeletePhysician",
            params: {
                "physicianId": physicianId,
                "physicianStatus": physicianStatus,
                "userID": userID
            }
        }).toPromise();
    };
    SetupPhysicianServices.prototype.updatePhysicians = function (physicianId, fName, lName, minitial, userID) {
        return this.httpservice.update({
            apiMethod: "/api/Physician/UpdatePhysicianDetails",
            params: {
                "physicianId": physicianId,
                "fName": fName,
                "lName": lName,
                "minitial": minitial,
                "userID": userID
            }
        }).toPromise();
    };
    SetupPhysicianServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    SetupPhysicianServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], SetupPhysicianServices);
    return SetupPhysicianServices;
}());
exports.SetupPhysicianServices = SetupPhysicianServices;
//# sourceMappingURL=pou-setup-physicians.services.js.map