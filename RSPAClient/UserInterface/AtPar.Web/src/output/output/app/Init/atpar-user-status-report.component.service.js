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
var UserStatusReportService = (function () {
    function UserStatusReportService(httpservice) {
        this.httpservice = httpservice;
    }
    UserStatusReportService.prototype.getUserStatus = function (serverUserID, userID, firstName, lastName, status, orgGroupID, profileID) {
        return this.httpservice.get({
            apiMethod: "/api/User/GetUserStatus",
            params: {
                "serverUserID": serverUserID,
                "userID": userID,
                "firstName": firstName,
                "lastName": lastName,
                "status": status,
                "orgGroupID": orgGroupID,
                "profileID": profileID
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    UserStatusReportService.prototype.updateUserStatus = function (serverUserID, userID, status) {
        return this.httpservice.update({
            apiMethod: "/api/User/UpdateUserStatus",
            params: {
                "serverUserID": serverUserID,
                "userID": userID,
                "status": status
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    UserStatusReportService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    UserStatusReportService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], UserStatusReportService);
    return UserStatusReportService;
}());
exports.UserStatusReportService = UserStatusReportService;
//# sourceMappingURL=atpar-user-status-report.component.service.js.map