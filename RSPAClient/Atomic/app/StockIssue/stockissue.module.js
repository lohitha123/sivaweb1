"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var stockissue_component_1 = require("./stockissue.component");
var stis_allocate_destination_locations_component_1 = require("./stis-allocate-destination-locations.component");
var stis_allocate_distribution_types_component_1 = require("./stis-allocate-distribution-types.component");
var stis_allocate_inventory_business_units_component_1 = require("./stis-allocate-inventory-business-units.component");
var stis_daily_activity_component_1 = require("./stis-daily-activity.component");
var stis_daily_user_activity_component_1 = require("./stis-daily-user-activity.component");
var stis_issue_report_component_1 = require("./stis-issue-report.component");
var stis_user_parameters_component_1 = require("./stis-user-parameters.component");
var stockissue_routing_module_1 = require("./stockissue-routing.module");
var shared_module_1 = require("../shared/shared.module");
var StockIssueModule = (function () {
    function StockIssueModule() {
    }
    return StockIssueModule;
}());
StockIssueModule = __decorate([
    core_1.NgModule({
        imports: [
            stockissue_routing_module_1.StockIssueRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            stockissue_component_1.StockIssueComponent,
            stis_allocate_destination_locations_component_1.AllocateDestinationLocationsComponent,
            stis_allocate_distribution_types_component_1.AllocateDistributionTypesComponent,
            stis_allocate_inventory_business_units_component_1.AllocateInventoryBusinessUnitsComponent,
            stis_daily_activity_component_1.DailyActivityComponent,
            stis_issue_report_component_1.IssueReportComponent,
            stis_user_parameters_component_1.UserParametersComponent,
            stis_daily_user_activity_component_1.DailyUserActivityComponent
        ]
    })
], StockIssueModule);
exports.StockIssueModule = StockIssueModule;
//# sourceMappingURL=stockissue.module.js.map