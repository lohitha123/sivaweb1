"use strict";
/// <reference path="../entities/atparkeyvaluepair.ts" />
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
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var SetupProcedureServices = (function () {
    function SetupProcedureServices(httpservice, spinnerService) {
        this.httpservice = httpservice;
        this.spinnerService = spinnerService;
    }
    SetupProcedureServices.prototype.GetSpecialtyCodes = function (codeType, code, descr) {
        return this.httpservice.getSync({
            //apiMethod: "/api/common/GetCodes",
            apiMethod: "/api/ProcedureCodes/GetSpecialtyCodes",
            params: {
                "codeType": codeType,
                "code": code,
                "descr": descr
            }
        });
        //}).map(res => <AtParWebApiResponse<MT_POU_SPECIALTY_CODE>>res.json()).catch(this.handleError);
    };
    SetupProcedureServices.prototype.GetProcedureCodes = function (codeType, code, descr) {
        return this.httpservice.getSync({
            apiMethod: "/api/ProcedureCodes/GetProcedureCodes",
            params: {
                "codeType": codeType,
                "code": code,
                "descr": descr
            }
        });
        //}).map(res => <AtParWebApiResponse<MT_POU_SPECIALTY_CODE>>res.json()).catch(this.handleError);
    };
    SetupProcedureServices.prototype.AddCodes = function (codeType, userId, code, descr, specCode) {
        return this.httpservice.create({
            apiMethod: "/api/ProcedureCodes/AddCodes",
            params: {
                "codeType": codeType,
                "userId": userId,
                "code": code,
                "descr": descr,
                "specCode": specCode
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupProcedureServices.prototype.UpdateCodes = function (codeType, code, descr, specCode) {
        return this.httpservice.update({
            apiMethod: "/api/ProcedureCodes/UpdateCodes",
            params: {
                "codeType": codeType,
                "code": code,
                "descr": descr,
                "specCode": specCode
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupProcedureServices.prototype.DeleteCodes = function (codeType, code, descr) {
        return this.httpservice.delete({
            apiMethod: "/api/ProcedureCodes/DeleteCodes",
            params: {
                "codeType": codeType,
                "code": code,
                "descr": descr,
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    SetupProcedureServices.prototype.handleError = function (error) {
        console.error(error);
        this.spinnerService.stop();
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    SetupProcedureServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService, event_spinner_service_1.SpinnerService])
    ], SetupProcedureServices);
    return SetupProcedureServices;
}());
exports.SetupProcedureServices = SetupProcedureServices;
//# sourceMappingURL=pou-setup-procedures.services.js.map