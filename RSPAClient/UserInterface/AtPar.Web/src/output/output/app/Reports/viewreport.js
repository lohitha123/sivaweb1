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
var router_1 = require("@angular/router");
// let IzendaSynergy = require("../izenda/izenda_ui");
var izendaintegrate_1 = require("../_helpers/izendaintegrate");
var platform_browser_1 = require("@angular/platform-browser");
var ViewReportComponent = (function () {
    function ViewReportComponent(izItergrate, route, router, title) {
        this.izItergrate = izItergrate;
        this.route = route;
        this.router = router;
        this.title = title;
        this.dom = {};
        this.chVal = "Report Viewer";
    }
    ViewReportComponent.prototype.ngOnInit = function () {
        //this.route.queryParams.subscribe(params => {
        //    this.reportID = params["reportID"];
        //   // this.appId = params["appId"];
        //});
        var menuName = localStorage.getItem("menuName");
        this.title.setTitle(menuName);
    };
    ViewReportComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var filtersObj = {
            "filters": [],
            "overridingFilterValue": {
                p1value: '2;#6',
                p2value: 'Cart Count'
            }
        };
        if (localStorage.getItem('menuName') != null && localStorage.getItem('menuName') != "null" && localStorage.getItem('menuName') != "undefined") {
            this.chVal = localStorage.getItem('menuName').toString();
        }
        if (localStorage.getItem('reportID') != null && localStorage.getItem('reportID') != "null" && localStorage.getItem('reportID') != "undefined") {
            this.reportID = localStorage.getItem('reportID');
            if (this.reportID != "null") {
                if (this.reportID == "0a5e8209-e629-4aee-89d9-d77ec60bd353") {
                    this.userId = localStorage.getItem('userId');
                    filtersObj = {
                        "filters": [],
                        "overridingFilterValue": {
                            p1value: this.userId,
                            p2value: '',
                            p3value: '',
                            p4value: '',
                            p5value: ''
                        }
                    };
                    this.dom = this.izItergrate.RenderReportCustomizedFilters(this.reportID, filtersObj);
                }
                else {
                    this.dom = this.izItergrate.RenderNewReport(this.reportID);
                }
            }
            else {
                // Dummy report Id to show report does not exsists
                this.dom = this.izItergrate.RenderNewReport("55757692-U24a-44D0-A572-8b3f61f5bc56");
            }
        }
        else {
            // Dummy report Id to show report does not exsists
            this.dom = this.izItergrate.RenderNewReport("55757692-U24a-44D0-A572-8b3f61f5bc56");
        }
        setTimeout(function () {
            var menuName = localStorage.getItem("menuName");
            _this.title.setTitle(menuName);
        }, 1);
        // this.izItergrate.RenderReportCustomizedViewer("93f57672-c24a-44a0-b572-8b3f61f5bc56", filtersObj);
    };
    ViewReportComponent.prototype.ngOnDestroy = function () {
        this.izItergrate.DestroyDom(this.dom);
    };
    ViewReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'rootcontainer.html'
        }),
        __metadata("design:paramtypes", [izendaintegrate_1.IzendaIntegrate, router_1.ActivatedRoute, router_1.Router, platform_browser_1.Title])
    ], ViewReportComponent);
    return ViewReportComponent;
}());
exports.ViewReportComponent = ViewReportComponent;
//# sourceMappingURL=viewreport.js.map