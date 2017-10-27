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
var PreferenceCardOptimizationServices = (function () {
    function PreferenceCardOptimizationServices(httpservice) {
        this.httpservice = httpservice;
    }
    PreferenceCardOptimizationServices.prototype.getPrefOptBySpeciality = function (strYear, strHalfYear, strQuarter, strMonth) {
        return this.httpservice.getSync({
            apiMethod: "/api/PreferenceCardOpt/GetPrefOptBySpeciality",
            params: {
                "strYear": strYear,
                "strHalfYear": strHalfYear,
                "strQuarter": strQuarter,
                "strMonth": strMonth,
            }
        });
    };
    PreferenceCardOptimizationServices.prototype.getPrefOptByProcedure = function (strSpecialityCode, strYear, strHalfYear, strQuarter, strMonth) {
        return this.httpservice.getSync({
            apiMethod: "/api/PreferenceCardOpt/GetPrefOptByProcedure",
            params: {
                "pstrSpecialityCode": strSpecialityCode,
                "pstrYear": strYear,
                "pstrHalfYear": strHalfYear,
                "pstrQuarter": strQuarter,
                "pstrMonth": strMonth,
            }
        });
    };
    PreferenceCardOptimizationServices.prototype.getPrefOptByPhysician = function (strSpecialityCode, strProcedureCode, strYear, strHalfYear, strQuarter, strMonth) {
        return this.httpservice.getSync({
            apiMethod: "/api/PreferenceCardOpt/GetPrefOptByPhysician",
            params: {
                "pstrSpecialityCode": strSpecialityCode,
                "pstrProcedureCode": strProcedureCode,
                "pstrYear": strYear,
                "pstrHalfYear": strHalfYear,
                "pstrQuarter": strQuarter,
                "pstrMonth": strMonth,
            }
        });
    };
    PreferenceCardOptimizationServices.prototype.getPrefOptHeaderData = function (strSpecialityCode, strProcedureCode, strPhysicianId, strPrefListId, strYear, strHalfYear, strQuarter, strMonth) {
        return this.httpservice.getSync({
            apiMethod: "/api/PreferenceCardOpt/GetPrefOptHeaderData",
            params: {
                "pstrSpecialityCode": strSpecialityCode,
                "pstrProcedureCode": strProcedureCode,
                "pstrPhysicianId": strPhysicianId,
                "pstrPrefListId": strPrefListId,
                "pstrYear": strYear,
                "pstrHalfYear": strHalfYear,
                "pstrQuarter": strQuarter,
                "pstrMonth": strMonth,
            }
        });
    };
    PreferenceCardOptimizationServices.prototype.getPrefOptDetailsData = function (strSpecialityCode, strProcedureCode, strPhysicianId, strPrefListId, strRemove, strAddToHoldStart, strAddToHoldEnd, strAddToOpen, strYear, strHalfYear, strQuarter, strMonth) {
        return this.httpservice.getSync({
            apiMethod: "/api/PreferenceCardOpt/GetPrefOptByPreference",
            params: {
                "pstrSpecialityCode": strSpecialityCode,
                "pstrProcedureCode": strProcedureCode,
                "pstrPhysicianId": strPhysicianId,
                "pstrPrefListId": strPrefListId,
                "pstrRemove": strRemove,
                "pstrAddToHoldStart": strAddToHoldStart,
                "pstrAddToHoldEnd": strAddToHoldEnd,
                "pstrAddToOpen": strAddToOpen,
                "pstrYear": strYear,
                "pstrHalfYear": strHalfYear,
                "pstrQuarter": strQuarter,
                "pstrMonth": strMonth,
            }
        });
    };
    PreferenceCardOptimizationServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    PreferenceCardOptimizationServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], PreferenceCardOptimizationServices);
    return PreferenceCardOptimizationServices;
}());
exports.PreferenceCardOptimizationServices = PreferenceCardOptimizationServices;
//# sourceMappingURL=pou-preference-card-optimization.service.js.map