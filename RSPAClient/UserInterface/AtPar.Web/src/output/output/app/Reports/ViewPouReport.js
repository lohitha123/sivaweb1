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
require("rxjs/add/operator/map");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var AtParEnums_1 = require("../Shared/AtParEnums");
var ViewPouReport = (function () {
    function ViewPouReport(route, domSanitizer) {
        this.route = route;
        this.domSanitizer = domSanitizer;
        //this.URL ="http://localhost/AtPar/web/login.aspx"
    }
    ViewPouReport.prototype.ngOnInit = function () {
        console.log(localStorage.getItem('menuName').toString());
        if (localStorage.getItem('menuName') != null && localStorage.getItem('menuName') != "null" && localStorage.getItem('menuName') != "undefined") {
            this.chVal = localStorage.getItem('menuName').toString();
        }
        var devicetoken = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        //'pou_Preference_Card_Optimization
        //
        //let reportParam: string = window.location.protocol + "//" + window.location.hostname + "/AtPar/Web/" + encodeURIComponent('pou_Preference_Card_Optimization.aspx')
        var reportParam = window.location.protocol + "//" + window.location.hostname + "/AtPar/Web/" + encodeURIComponent(localStorage.getItem('menuCode'))
            + '?UserId=' + encodeURIComponent(devicetoken[AtParEnums_1.TokenEntry_Enum.UserID])
            + '&UserPwd=' + encodeURIComponent(localStorage.getItem("UserLoginPwd"))
            + '&SystemId=' + encodeURIComponent(devicetoken[AtParEnums_1.TokenEntry_Enum.SystemId])
            + '&strMenuCode=' + encodeURIComponent(localStorage.getItem('menuCode'));
        console.log(reportParam);
        this.page = this.domSanitizer.bypassSecurityTrustResourceUrl(reportParam);
    };
    ViewPouReport = __decorate([
        core_1.Component({
            templateUrl: 'ViewPouReport.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, platform_browser_1.DomSanitizer])
    ], ViewPouReport);
    return ViewPouReport;
}());
exports.ViewPouReport = ViewPouReport;
//# sourceMappingURL=ViewPouReport.js.map