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
var PrintScreenService = (function () {
    function PrintScreenService(httpservice) {
        this.httpservice = httpservice;
        this._deviceTokenEntry = [];
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this._deviceTokenEntry = JSON.parse(sessionStorage.getItem("DeviceTokenEntry"));
    }
    PrintScreenService.prototype.getDynamicReport = function (appID, ObjectID, deviceToken, printerType) {
        return this.httpservice.getSync({
            apiMethod: "/api/StationaryPrintDesign/GetDynamicReport",
            params: {
                "appId": appID,
                "objectId": ObjectID
            }
        });
        //.catch(this.httpservice.handleError).map((res: Response) => res.json());
    };
    PrintScreenService.prototype.getDynamicFonts = function () {
        return this.httpservice.getSync({
            apiMethod: "/api/StationaryPrintDesign/GetFonts",
            params: {}
        });
        //.catch(this.httpservice.handleError).map((res: Response) => res.json());
    };
    PrintScreenService.prototype.getDynamicPrintProducts = function (userId) {
        return this.httpservice.getSync({
            apiMethod: "/api/StationaryPrintDesign/GetDynamicPrintProducts",
            params: {
                "userId": userId
            }
        });
        //.catch(this.httpservice.handleError).map((res: Response) => res.json());
    };
    PrintScreenService.prototype.getDynamicPrintReportTypes = function (appId) {
        return this.httpservice.getSync({
            apiMethod: "/api/StationaryPrintDesign/GetDynamicPrintReportTypes",
            params: {
                "appId": appId
            }
        });
        //.catch(this.httpservice.handleError).map((res: Response) => res.json());
    };
    PrintScreenService.prototype.saveDynamicPrintReport = function (appId, objectId, printType, objectDesc, lstReportDtls) {
        return this.httpservice.create({
            apiMethod: "/api/StationaryPrintDesign/SaveDynamicPrintReport",
            formData: lstReportDtls,
            params: {
                "appId": appId,
                "objectId": objectId,
                "printType": printType,
                "objectDesc": objectDesc
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
        ;
        //.catch(this.httpservice.handleError).map((res: Response) => res.json());
    };
    PrintScreenService.prototype.handleError = function (error) {
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    PrintScreenService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], PrintScreenService);
    return PrintScreenService;
}());
exports.PrintScreenService = PrintScreenService;
//# sourceMappingURL=atpar-stationary-print-design.service.js.map