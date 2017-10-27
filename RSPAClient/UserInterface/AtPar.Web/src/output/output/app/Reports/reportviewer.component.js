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
var ReportViewerComponent = (function () {
    function ReportViewerComponent(izItergrate, route, router) {
        this.izItergrate = izItergrate;
        this.route = route;
        this.router = router;
        this.chVal = "Report Viewer";
    }
    ReportViewerComponent.prototype.ngOnInit = function () {
        //    this.route.queryParams.subscribe(params => {
        //    this.reportID = params["reportID"];
        //  this.appId = params["appId"];
        //});
    };
    ReportViewerComponent.prototype.ngAfterViewInit = function () {
        var filtersObj = {
            "filters": [],
            "overridingFilterValue": {
                p1value: '2;#6',
                p2value: 'Cart Count'
            }
        };
        //this.izItergrate.RenderReportViewer("93f57672-c24a-44a0-b572-8b3f61f5bc56");
        this.izItergrate.RenderReportCustomizedViewer("93f57672-c24a-44a0-b572-8b3f61f5bc56", filtersObj);
    };
    ReportViewerComponent = __decorate([
        core_1.Component({
            templateUrl: 'rootcontainer.html'
        }),
        __metadata("design:paramtypes", [izendaintegrate_1.IzendaIntegrate, router_1.ActivatedRoute, router_1.Router])
    ], ReportViewerComponent);
    return ReportViewerComponent;
}());
exports.ReportViewerComponent = ReportViewerComponent;
//# sourceMappingURL=reportviewer.component.js.map