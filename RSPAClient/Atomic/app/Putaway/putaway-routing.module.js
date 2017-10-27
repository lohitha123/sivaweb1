"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var putaway_component_1 = require("./putaway.component");
var ptwy_activity_report_component_1 = require("./ptwy-activity-report.component");
var ptwy_allocate_business_units_component_1 = require("./ptwy-allocate-business-units.component");
var ptwy_daily_activity_component_1 = require("./ptwy-daily-activity.component");
var ptwy_daily_user_activity_component_1 = require("./ptwy-daily-user-activity.component");
var ptwy_deviation_report_component_1 = require("./ptwy-deviation-report.component");
var ptwy_release_orders_component_1 = require("./ptwy-release-orders.component");
var ptwy_user_parameters_1 = require("./ptwy-user-parameters");
exports.routes = [
    {
        path: '',
        component: putaway_component_1.PutawayComponent,
        children: [
            { path: 'activityreport', component: ptwy_activity_report_component_1.ActivityReportComponent },
            { path: 'allocatebusinessunits', component: ptwy_allocate_business_units_component_1.AllocateBusinessUnitsComponent },
            { path: 'dailyactivity', component: ptwy_daily_activity_component_1.DailyActivityComponent },
            { path: 'dailyuseractivity', component: ptwy_daily_user_activity_component_1.DailyUserActivityComponent },
            { path: 'deviationreport', component: ptwy_deviation_report_component_1.DeviationReportComponent },
            { path: 'releaseorders', component: ptwy_release_orders_component_1.PtyReleaseOrdersComponent },
            { path: 'userparameters', component: ptwy_user_parameters_1.UserParametersComponent },
        ]
    }
];
var PutawayRoutingModule = (function () {
    function PutawayRoutingModule() {
    }
    return PutawayRoutingModule;
}());
PutawayRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.routes)],
        exports: [router_1.RouterModule]
    })
], PutawayRoutingModule);
exports.PutawayRoutingModule = PutawayRoutingModule;
//# sourceMappingURL=putaway-routing.module.js.map