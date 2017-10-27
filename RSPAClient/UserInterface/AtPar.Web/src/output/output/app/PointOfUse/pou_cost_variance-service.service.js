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
var POUCostVarianceService = (function () {
    function POUCostVarianceService(httpservice) {
        this.httpservice = httpservice;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    POUCostVarianceService.prototype.Getcostvarianceanalysisspecialitydata = function (VarianceDiagCode, year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            apiMethod: "/api/CostVarianceAnalysis/Getcostvarianceanalysisspecialitydata",
            params: {
                "pselectedVarianceType": VarianceDiagCode,
                "pYear": year,
                "pHalfYear": halfyear,
                "pQuater": quater,
                "pMonthly": monthly
            }
        });
    };
    POUCostVarianceService.prototype.GetCostVarianceByDiagnosiscode = function (SpecialityCode, Codetext, Descrtext, year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            apiMethod: "/api/CostVarianceAnalysis/GetCostVarianceByDiagnosiscode",
            params: {
                "pSpecialityCode": SpecialityCode,
                "pCodetext": Codetext,
                "pDescrtext": Descrtext,
                "pYear": year,
                "pHalfYear": halfyear,
                "pQuater": quater,
                "pMonthly": monthly
            }
        });
    };
    POUCostVarianceService.prototype.GetCostVarianceBySurgeon = function (VarianceDiagCode, SpecialityCode, ReimbursementCode, year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            apiMethod: "/api/CostVarianceAnalysis/GetCostVarianceBySurgeon",
            params: {
                "pselectedVarianceType": VarianceDiagCode,
                "pSpecialityCode": SpecialityCode,
                "pReimbursementCode": ReimbursementCode,
                "pYear": year,
                "pHalfYear": halfyear,
                "pQuater": quater,
                "pMonthly": monthly
            }
        });
    };
    POUCostVarianceService.prototype.GetCostvarianceSurgeonHdrData = function (DiagnosisCode, SpecialityCode, Codetext, year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            apiMethod: "/api/CostVarianceAnalysis/GetCostvarianceSurgeonHdrData",
            params: {
                "pDiagnosisCode": DiagnosisCode,
                "pSpecialityCode": SpecialityCode,
                "pCodetext": Codetext,
                "pYear": year,
                "pHalfYear": halfyear,
                "pQuater": quater,
                "pMonthly": monthly
            }
        });
    };
    POUCostVarianceService.prototype.GetCostVarianceItemGroups = function (VarianceDiagCode, SpecialityCode, Codetext, year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            apiMethod: "/api/CostVarianceAnalysis/GetCostVarianceItemGroups",
            params: {
                "pDiagnosisCode": VarianceDiagCode,
                "pSpecialityCode": SpecialityCode,
                "pCodetext": Codetext,
                "pYear": year,
                "pHalfYear": halfyear,
                "pQuater": quater,
                "pMonthly": monthly
            }
        });
    };
    POUCostVarianceService.prototype.GetCostvarianceItemHdrDetails = function (VarianceDiagCode, SpecialityCode, Codetext, year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            apiMethod: "/api/CostVarianceAnalysis/GetCostvarianceItemHdrDetails",
            params: {
                "pDiagnosisCode": VarianceDiagCode,
                "pSpecialityCode": SpecialityCode,
                "pCodetext": Codetext,
                "pYear": year,
                "pHalfYear": halfyear,
                "pQuater": quater,
                "pMonthly": monthly
            }
        });
    };
    POUCostVarianceService.prototype.GetCostvarianceSurgeonItemgroupDetails = function (VarianceDiagCode, SpecialityCode, Codetext, PhysicianId, year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            apiMethod: "/api/CostVarianceAnalysis/GetCostvarianceSurgeonItemgroupDetails",
            params: {
                "pDiagnosisCode": VarianceDiagCode,
                "pSpecialityCode": SpecialityCode,
                "pCodetext": Codetext,
                "pPhysicianId": PhysicianId,
                "pYear": year,
                "pHalfYear": halfyear,
                "pQuater": quater,
                "pMonthly": monthly
            }
        });
    };
    POUCostVarianceService.prototype.GetCostvarianceSupplyItemData = function (ItemGroup, VarianceDiagCode, SpecialityCode, Codetext, PhysicianId, year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            apiMethod: "/api/CostVarianceAnalysis/GetCostvarianceSupplyItemData",
            params: {
                "pItemGroup": ItemGroup,
                "pDiagnosisCode": VarianceDiagCode,
                "pSpecialityCode": SpecialityCode,
                "pCodetext": Codetext,
                "pPhysicianId": PhysicianId,
                "pYear": year,
                "pHalfYear": halfyear,
                "pQuater": quater,
                "pMonthly": monthly
            }
        });
    };
    POUCostVarianceService.prototype.handleError = function (error) {
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    POUCostVarianceService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], POUCostVarianceService);
    return POUCostVarianceService;
}());
exports.POUCostVarianceService = POUCostVarianceService;
//# sourceMappingURL=pou_cost_variance-service.service.js.map