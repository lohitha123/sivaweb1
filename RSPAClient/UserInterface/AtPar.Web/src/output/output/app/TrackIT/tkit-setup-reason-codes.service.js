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
var ReasonCodeService = (function () {
    function ReasonCodeService(httpService, http) {
        this.httpService = httpService;
        this.http = http;
    }
    ReasonCodeService.prototype.getReasonCodes = function (reasonCode, desc) {
        return this.httpService.getSync({
            apiMethod: "/api/SetupReasonCodes/GetReasonCodes",
            params: {
                "reasonCode": reasonCode,
                "desc": desc
            }
        });
    };
    ReasonCodeService.prototype.updateReasonCodes = function (reasonCode, desc) {
        return this.httpService.create({
            apiMethod: "/api/SetupReasonCodes/UpdateReasonCodes",
            params: {
                "reasonCode": reasonCode,
                "desc": desc
            }
        }).toPromise();
    };
    ReasonCodeService.prototype.deleteReasonCode = function (reasonCode, status) {
        return this.httpService.create({
            apiMethod: "/api/SetupReasonCodes/DeleteReasonCode",
            params: {
                "reasonCode": reasonCode,
                "status": status
            }
        }).toPromise();
    };
    ReasonCodeService.prototype.createReasonCodes = function (reasonCode, desc, orgGroupID) {
        return this.httpService.create({
            apiMethod: "/api/SetupReasonCodes/CreateReasonCodes",
            params: {
                "reasonCode": reasonCode,
                "desc": desc,
                "orgGrpID": orgGroupID
            }
        }).toPromise();
    };
    ReasonCodeService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http])
    ], ReasonCodeService);
    return ReasonCodeService;
}());
exports.ReasonCodeService = ReasonCodeService;
//# sourceMappingURL=tkit-setup-reason-codes.service.js.map