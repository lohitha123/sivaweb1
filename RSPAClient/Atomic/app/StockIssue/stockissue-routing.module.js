"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var stockissue_component_1 = require("./stockissue.component");
var stis_allocate_destination_locations_component_1 = require("./stis-allocate-destination-locations.component");
var stis_allocate_distribution_types_component_1 = require("./stis-allocate-distribution-types.component");
var stis_allocate_inventory_business_units_component_1 = require("./stis-allocate-inventory-business-units.component");
var stis_daily_activity_component_1 = require("./stis-daily-activity.component");
var stis_daily_user_activity_component_1 = require("./stis-daily-user-activity.component");
var stis_issue_report_component_1 = require("./stis-issue-report.component");
var stis_user_parameters_component_1 = require("./stis-user-parameters.component");
exports.routes = [
    {
        path: '',
        component: stockissue_component_1.StockIssueComponent,
        children: [
            { path: 'allocatedestinationlocations', component: stis_allocate_destination_locations_component_1.AllocateDestinationLocationsComponent },
            { path: 'allocatedistributiontypes', component: stis_allocate_distribution_types_component_1.AllocateDistributionTypesComponent },
            { path: 'allocateinventorybusinessunits', component: stis_allocate_inventory_business_units_component_1.AllocateInventoryBusinessUnitsComponent },
            { path: 'dailyactivity', component: stis_daily_activity_component_1.DailyActivityComponent },
            { path: 'dailyuseractivity', component: stis_daily_user_activity_component_1.DailyUserActivityComponent },
            { path: 'issuereport', component: stis_issue_report_component_1.IssueReportComponent },
            { path: 'userparameters', component: stis_user_parameters_component_1.UserParametersComponent },
        ]
    }
];
var StockIssueRoutingModule = (function () {
    function StockIssueRoutingModule() {
    }
    return StockIssueRoutingModule;
}());
StockIssueRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.routes)],
        exports: [router_1.RouterModule]
    })
], StockIssueRoutingModule);
exports.StockIssueRoutingModule = StockIssueRoutingModule;
//# sourceMappingURL=stockissue-routing.module.js.map