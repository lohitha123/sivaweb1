"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var pick_component_1 = require("./pick.component");
var pick_activity_report_component_1 = require("./pick-activity-report.component");
var pick_allocate_inventory_business_units_componet_1 = require("./pick-allocate-inventory-business-units.componet");
var pick_allocate_location_groups_component_1 = require("./pick-allocate-location-groups.component");
var pick_allocate_picking_zones_component_1 = require("./pick-allocate-picking-zones.component");
var pick_allocate_priority_component_1 = require("./pick-allocate-priority.component");
var pick_daily_activity_component_1 = require("./pick-daily-activity.component");
var pick_daily_user_activity_component_1 = require("./pick-daily-user-activity.component");
var pick_deviation_report_component_1 = require("./pick-deviation-report.component");
var pick_order_prefix_component_1 = require("./pick-order-prefix.component");
var pick_pick_status_report_component_1 = require("./pick-pick-status-report-component");
var pick_release_orders_component_1 = require("./pick-release-orders.component");
var pick_user_parameters_component_1 = require("./pick-user-parameters.component");
var pick_routing_module_1 = require("./pick-routing.module");
var shared_module_1 = require("../shared/shared.module");
var PickModule = (function () {
    function PickModule() {
    }
    return PickModule;
}());
PickModule = __decorate([
    core_1.NgModule({
        imports: [
            pick_routing_module_1.PickRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            pick_component_1.PickComponent,
            pick_activity_report_component_1.ActivityReportComponent,
            pick_allocate_inventory_business_units_componet_1.PickAllocateInventoryBusinessUnitsComponent,
            pick_allocate_location_groups_component_1.PickAllocateLocationGroupsComponent,
            pick_allocate_picking_zones_component_1.AllocatePickingZonesComponent,
            pick_allocate_priority_component_1.AllocatePriorityComponent,
            pick_daily_activity_component_1.DailyActivityComponent,
            pick_daily_user_activity_component_1.DailyUserActivityComponent,
            pick_deviation_report_component_1.DeviationReportComponent,
            pick_order_prefix_component_1.OrderPrefixComponent,
            pick_pick_status_report_component_1.PickStatusReportComponent,
            pick_release_orders_component_1.PickReleaseOrdersComponent,
            pick_user_parameters_component_1.UserParametersComponent
        ]
    })
], PickModule);
exports.PickModule = PickModule;
//# sourceMappingURL=pick.module.js.map