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
var DailyUserActivityReportService = (function () {
    function DailyUserActivityReportService(httpservice) {
        this.httpservice = httpservice;
    }
    DailyUserActivityReportService.prototype.getDailyUserActivityRep = function (userID, transType, date, appID) {
        return this.httpservice.getSync({
            apiMethod: "/api/PouDailyUserActivityReport/GetDailyUserActivityRep",
            params: {
                "userID": userID,
                "transType": transType,
                "date": date,
                "appID": appID
            }
        });
    };
    //(string userID, string transType, string date, int appID, [FromUri] string[] deviceTokenEntry)
    DailyUserActivityReportService.prototype.handleError = function (error) {
        debugger;
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    DailyUserActivityReportService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], DailyUserActivityReportService);
    return DailyUserActivityReportService;
}());
exports.DailyUserActivityReportService = DailyUserActivityReportService;
//# sourceMappingURL=pou-daily-user-activity-report.service.js.map