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
/// <reference path="../../shared/tkithttpservice.ts" />
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var tkitHttpService_1 = require("../../Shared/tkitHttpService");
var TrackITUserProfileService = (function () {
    function TrackITUserProfileService(httpService, http) {
        this.httpService = httpService;
        this.http = http;
    }
    TrackITUserProfileService.prototype.saveRequestorDetails = function (requestor, passsword, newPassword) {
        return this.httpService.create({
            apiMethod: "/api/CommonTrackIT/UpdateUserDetails",
            formData: requestor,
            params: {
                "pPassword": passsword,
                "newPassword": newPassword
            }
        }).toPromise();
    };
    TrackITUserProfileService.prototype.getUserDetails = function (requestorID) {
        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetUserDetails",
            params: {
                "requestorID": requestorID
            }
        });
    };
    TrackITUserProfileService.prototype.getLocations = function () {
        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetLocations"
        });
    };
    TrackITUserProfileService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [tkitHttpService_1.TkitHttpService, http_1.Http])
    ], TrackITUserProfileService);
    return TrackITUserProfileService;
}());
exports.TrackITUserProfileService = TrackITUserProfileService;
//# sourceMappingURL=trackit-profile.service.js.map