"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var putaway_component_1 = require("./putaway.component");
var ptwy_activity_report_component_1 = require("./ptwy-activity-report.component");
var ptwy_allocate_business_units_component_1 = require("./ptwy-allocate-business-units.component");
var ptwy_daily_activity_component_1 = require("./ptwy-daily-activity.component");
var ptwy_daily_user_activity_component_1 = require("./ptwy-daily-user-activity.component");
var ptwy_deviation_report_component_1 = require("./ptwy-deviation-report.component");
var ptwy_release_orders_component_1 = require("./ptwy-release-orders.component");
var ptwy_user_parameters_1 = require("./ptwy-user-parameters");
var putaway_routing_module_1 = require("./putaway-routing.module");
var shared_module_1 = require("../shared/shared.module");
var PutawayModule = (function () {
    function PutawayModule() {
    }
    return PutawayModule;
}());
PutawayModule = __decorate([
    core_1.NgModule({
        imports: [
            putaway_routing_module_1.PutawayRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            putaway_component_1.PutawayComponent,
            ptwy_activity_report_component_1.ActivityReportComponent,
            ptwy_allocate_business_units_component_1.AllocateBusinessUnitsComponent,
            ptwy_daily_activity_component_1.DailyActivityComponent,
            ptwy_daily_user_activity_component_1.DailyUserActivityComponent,
            ptwy_deviation_report_component_1.DeviationReportComponent,
            ptwy_release_orders_component_1.PtyReleaseOrdersComponent,
            ptwy_user_parameters_1.UserParametersComponent
        ]
    })
], PutawayModule);
exports.PutawayModule = PutawayModule;
//# sourceMappingURL=putaway.module.js.map