"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
var deliver_routing_module_1 = require("./deliver-routing.module");
var shared_module_1 = require("../Shared/shared.module");
var DeliverModule = (function () {
    function DeliverModule() {
    }
    DeliverModule = __decorate([
        core_1.NgModule({
            imports: [
                deliver_routing_module_1.DeliverRoutingModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                deliver_component_1.DeliverComponent,
                deliver_allocate_business_units_component_1.AllocateBusinessUnitsComponent,
                deliver_allocate_location_groups_component_1.AllocateLocationGroupsComponent,
                deliver_assign_signatories_component_1.AssignSignatoriesComponent,
                deliver_carrier_information_component_1.CarrierInformationComponent,
                deliver_daily_activity_component_1.DailyActivityComponent,
                deliver_daily_user_activity_component_1.DailyUserActivityComponent,
                deliver_delivery_report_component_1.DeliveryReportComponent,
                deliver_exclude_locations_component_1.ExcludeLocationsComponent,
                deliver_productivity_report_component_1.ProductivityReportComponent,
                deliver_release_packages_component_1.ReleasePackagesComponent,
                deliver_setup_drop_off_locations_component_1.SetupDropOffLoactionsComponent,
                deliver_shiptoid_allocation_for_delivery_of_stock_items_component_1.ShipToIdAllocationForDeliveryOfStockItemsComponent,
                deliver_user_parameters_component_1.UserParametersComponent
            ]
        })
    ], DeliverModule);
    return DeliverModule;
}());
exports.DeliverModule = DeliverModule;
//# sourceMappingURL=deliver.module.js.map