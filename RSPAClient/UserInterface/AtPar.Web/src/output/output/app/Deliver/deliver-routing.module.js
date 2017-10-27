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
var deliver_component_1 = require("./deliver.component");
var deliver_allocate_business_units_component_1 = require("./deliver-allocate-business-units.component");
var deliver_allocate_location_groups_component_1 = require("./deliver-allocate-location-groups.component");
var deliver_assign_signatories_component_1 = require("./deliver-assign-signatories.component");
var deliver_carrier_information_component_1 = require("./deliver-carrier-information.component");
var deliver_daily_activity_component_1 = require("./deliver-daily-activity.component");
var deliver_daily_user_activity_component_1 = require("./deliver-daily-user-activity.component");
var deliver_delivery_report_component_1 = require("./deliver-delivery-report.component");
var deliver_exclude_locations_component_1 = require("./deliver-exclude-locations.component");
var deliver_productivity_report_component_1 = require("./deliver-productivity-report.component");
var deliver_release_packages_component_1 = require("./deliver-release-packages.component");
var deliver_setup_drop_off_locations_component_1 = require("./deliver-setup-drop-off-locations.component");
var deliver_shiptoid_allocation_for_delivery_of_stock_items_component_1 = require("./deliver-shiptoid-allocation-for-delivery-of-stock-items.component");
var deliver_user_parameters_component_1 = require("./deliver-user-parameters.component");
exports.routes = [
    {
        path: '',
        component: deliver_component_1.DeliverComponent,
        children: [
            { path: 'allocatebusinessunits', component: deliver_allocate_business_units_component_1.AllocateBusinessUnitsComponent },
            { path: 'allocatelocationgroups', component: deliver_allocate_location_groups_component_1.AllocateLocationGroupsComponent },
            { path: 'assignsignatories', component: deliver_assign_signatories_component_1.AssignSignatoriesComponent },
            { path: 'carrierinformation', component: deliver_carrier_information_component_1.CarrierInformationComponent },
            { path: 'dailyactivity', component: deliver_daily_activity_component_1.DailyActivityComponent },
            { path: 'dailyuserActivity', component: deliver_daily_user_activity_component_1.DailyUserActivityComponent },
            { path: 'deliveryreport', component: deliver_delivery_report_component_1.DeliveryReportComponent },
            { path: 'excludelocations', component: deliver_exclude_locations_component_1.ExcludeLocationsComponent },
            { path: 'productivityreport', component: deliver_productivity_report_component_1.ProductivityReportComponent },
            { path: 'releasepackages', component: deliver_release_packages_component_1.ReleasePackagesComponent },
            { path: 'setupdropofflocations', component: deliver_setup_drop_off_locations_component_1.SetupDropOffLoactionsComponent },
            { path: 'shiptoidallocationfordeliveryofstockitems', component: deliver_shiptoid_allocation_for_delivery_of_stock_items_component_1.ShipToIdAllocationForDeliveryOfStockItemsComponent },
            { path: 'userparameters', component: deliver_user_parameters_component_1.UserParametersComponent },
        ]
    }
];
var DeliverRoutingModule = (function () {
    function DeliverRoutingModule() {
    }
    DeliverRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.routes)],
            exports: [router_1.RouterModule]
        })
    ], DeliverRoutingModule);
    return DeliverRoutingModule;
}());
exports.DeliverRoutingModule = DeliverRoutingModule;
//# sourceMappingURL=deliver-routing.module.js.map