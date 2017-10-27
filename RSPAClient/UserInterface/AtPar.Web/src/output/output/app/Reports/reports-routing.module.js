"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var reports_component_1 = require("./reports.component");
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
var viewDashboard_1 = require("./viewDashboard");
var dashboardviewer_component_1 = require("./dashboardviewer.component");
var customreport_1 = require("./customreport");
exports.routes = [
    {
        path: '',
        component: reports_component_1.ReportsComponent,
        children: [
            { path: 'dashboarddesigner', component: dashboarddesigner_component_1.DashboardDesignerComponent },
            { path: 'settings', component: reportsetting_component_1.SettingsComponent },
            { path: 'reportdesigner', component: reportdesigner_component_1.ReportDesignerComponent },
            { path: 'report', component: reportlist_component_1.ReportComponent },
            { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
            { path: 'reportcustomfilter', component: reportcustomfilter_component_1.ReportCustomFilterComponent },
            { path: 'reportpart', component: reportpart_component_1.ReportPartComponent },
            { path: 'reportviewer', component: reportviewer_component_1.ReportViewerComponent },
            //{ path: 'viewer/reportpart/:id', component: ExportReportComponent }, 
            { path: 'viewreport', component: viewreport_1.ViewReportComponent },
            //{ path: 'report/view/:id', component: ExportReportViewerComponent },  
            //{ path: 'dashboard/view/:id', component: ExportDashboardViewerComponent },  
            { path: 'ViewPouReport', component: ViewPouReport_1.ViewPouReport },
            { path: 'viewDashboard', component: viewDashboard_1.viewDashboardComponent },
            { path: 'dashboardviewer', component: dashboardviewer_component_1.DashboardViewer },
            { path: 'customreport/:id', component: customreport_1.CustomReportComponent }
        ]
    }
];
var ReportsRoutingModule = (function () {
    function ReportsRoutingModule() {
    }
    ReportsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.routes)],
            exports: [router_1.RouterModule]
        })
    ], ReportsRoutingModule);
    return ReportsRoutingModule;
}());
exports.ReportsRoutingModule = ReportsRoutingModule;
//# sourceMappingURL=reports-routing.module.js.map