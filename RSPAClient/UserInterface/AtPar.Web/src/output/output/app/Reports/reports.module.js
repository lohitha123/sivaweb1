"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var reports_component_1 = require("./reports.component");
var reports_routing_module_1 = require("./reports-routing.module");
var shared_module_1 = require("../Shared/shared.module");
var reportviewer_component_1 = require("./reportviewer.component");
var dashboarddesigner_component_1 = require("./dashboarddesigner.component");
var reportsetting_component_1 = require("./reportsetting.component");
var reportdesigner_component_1 = require("./reportdesigner.component");
var reportlist_component_1 = require("./reportlist.component");
var dashboard_component_1 = require("./dashboard.component");
var reportcustomfilter_component_1 = require("./reportcustomfilter.component");
var reportpart_component_1 = require("./reportpart.component");
//import { ExportReportComponent } from './export.component';
var viewreport_1 = require("./viewreport");
//import { ExportReportComponent, ExportReportViewerComponent, ExportDashboardViewerComponent } from '../export/index';
var ViewPouReport_1 = require("./ViewPouReport");
var customreport_1 = require("./customreport");
var viewDashboard_1 = require("./viewDashboard");
var dashboardviewer_component_1 = require("./dashboardviewer.component");
var izendaintegrate_1 = require("../_helpers/izendaintegrate");
var router_1 = require("@angular/router");
var customurlserializer_1 = require("../_helpers/customurlserializer");
var ReportsModule = (function () {
    function ReportsModule() {
    }
    ReportsModule = __decorate([
        core_1.NgModule({
            imports: [
                reports_routing_module_1.ReportsRoutingModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                reports_component_1.ReportsComponent,
                reportdesigner_component_1.ReportDesignerComponent,
                reportsetting_component_1.SettingsComponent,
                reportlist_component_1.ReportComponent,
                reportviewer_component_1.ReportViewerComponent,
                dashboard_component_1.DashboardComponent,
                dashboarddesigner_component_1.DashboardDesignerComponent,
                reportcustomfilter_component_1.ReportCustomFilterComponent,
                reportpart_component_1.ReportPartComponent,
                viewreport_1.ViewReportComponent,
                ViewPouReport_1.ViewPouReport,
                viewDashboard_1.viewDashboardComponent,
                dashboardviewer_component_1.DashboardViewer,
                customreport_1.CustomReportComponent
            ],
            providers: [
                izendaintegrate_1.IzendaIntegrate,
                { provide: router_1.UrlSerializer, useClass: customurlserializer_1.CustomUrlSerializer }
            ]
        })
    ], ReportsModule);
    return ReportsModule;
}());
exports.ReportsModule = ReportsModule;
//# sourceMappingURL=reports.module.js.map