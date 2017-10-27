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
var Rx_1 = require("rxjs/Rx");
var AppService = (function () {
    function AppService(http) {
        this.http = http;
    }
    AppService.prototype.getAppDetails = function (appId) {
        debugger;
        return this.http.post(location.href, appId)
            .map(function (response) {
            debugger;
            var details = response.json();
            debugger;
            return details;
        })
            .do(function (data) { return console.log(data); })
            .catch(this.handleError);
    };
    AppService.prototype.handleError = function (error) {
        debugger;
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    AppService.prototype.setAppFavicon = function (id, basepath, icon) {
        debugger;
        var favIconEle = document.getElementById(id);
        favIconEle.setAttribute('href', basepath + '/' + icon);
        debugger;
        //$("#" + id).attr("href", basepath + "/" + icon);
    };
    AppService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map