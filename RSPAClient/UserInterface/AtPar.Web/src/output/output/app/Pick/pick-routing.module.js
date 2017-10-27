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
exports.routes = [
    {
        path: '',
        component: pick_component_1.PickComponent,
        children: [
            { path: 'activityreport', component: pick_activity_report_component_1.ActivityReportComponent },
            { path: 'allocateinventorybusinessunits', component: pick_allocate_inventory_business_units_componet_1.PickAllocateInventoryBusinessUnitsComponent },
            { path: 'allocatelocationgroups', component: pick_allocate_location_groups_component_1.AllocateLocationGroupsComponent },
            { path: 'allocatepickingzones', component: pick_allocate_picking_zones_component_1.AllocatePickingZonesComponent },
            { path: 'allocatepriority', component: pick_allocate_priority_component_1.AllocatePriorityComponent },
            { path: 'dailyactivity', component: pick_daily_activity_component_1.DailyActivityComponent },
            { path: 'dailyuseractivity', component: pick_daily_user_activity_component_1.DailyUserActivityComponent },
            { path: 'deviationreport', component: pick_deviation_report_component_1.DeviationReportComponent },
            { path: 'orderprefix', component: pick_order_prefix_component_1.OrderPrefixComponent },
            { path: 'pickstatusreport', component: pick_pick_status_report_component_1.PickStatusReportComponent },
            { path: 'releaseorders', component: pick_release_orders_component_1.ReleaseOrdersComponent },
            { path: 'userparameters', component: pick_user_parameters_component_1.UserParametersComponent },
        ]
    }
];
var PickRoutingModule = (function () {
    function PickRoutingModule() {
    }
    PickRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.routes)],
            exports: [router_1.RouterModule]
        })
    ], PickRoutingModule);
    return PickRoutingModule;
}());
exports.PickRoutingModule = PickRoutingModule;
//# sourceMappingURL=pick-routing.module.js.map