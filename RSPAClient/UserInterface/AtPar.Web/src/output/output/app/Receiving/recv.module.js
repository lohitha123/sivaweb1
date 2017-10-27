"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var recv_component_1 = require("./recv.component");
var recv_activity_report_component_1 = require("./recv-activity-report.component");
var recv_allocate_inventory_business_units_component_1 = require("./recv-allocate-inventory-business-units.component");
var recv_allocate_shiptoids_component_1 = require("./recv-allocate-shiptoids.component");
var recv_asn_discrepancy_report_component_1 = require("./recv-asn-discrepancy-report.component");
var recv_carrier_information_component_1 = require("./recv-carrier-information.component");
var recv_carrier_report_component_1 = require("./recv-carrier-report.component");
var recv_daily_activity_component_1 = require("./recv-daily-activity.component");
var recv_daily_user_activity_component_1 = require("./recv-daily-user-activity.component");
var recv_deviation_report_component_1 = require("./recv-deviation-report.component");
var recv_lot_serial_tracking_report_component_1 = require("./recv-lot-serial-tracking-report.component");
var recv_manage_carriers_component_1 = require("./recv-manage-carriers.component");
var recv_parcel_count_report_component_1 = require("./recv-parcel-count-report.component");
var recv_po_nonpo_receipts_component_1 = require("./recv-po-nonpo-receipts.component");
var recv_release_orders_component_1 = require("./recv-release-orders.component");
var recv_setup_shiptoids_component_1 = require("./recv-setup-shiptoids.component");
var recv_user_parameters_component_1 = require("./recv-user-parameters.component");
var recv_routing_module_1 = require("./recv-routing.module");
var shared_module_1 = require("../Shared/shared.module");
var ReceivingModule = (function () {
    function ReceivingModule() {
    }
    ReceivingModule = __decorate([
        core_1.NgModule({
            imports: [
                recv_routing_module_1.ReceivingRoutingModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                recv_component_1.ReceivingComponent,
                recv_activity_report_component_1.ActivityReportComponent,
                recv_allocate_inventory_business_units_component_1.AllocateInventoryBusinessUnitsComponent,
                recv_allocate_shiptoids_component_1.AllocateShipToIdsComponent,
                recv_asn_discrepancy_report_component_1.AsnDiscrepancyReportComponent,
                recv_carrier_information_component_1.CarrierInformationComponent,
                recv_carrier_report_component_1.CarrierReportComponent,
                recv_daily_activity_component_1.DailyActivityComponent,
                recv_daily_user_activity_component_1.DailyUserActivityComponent,
                recv_deviation_report_component_1.DeviationReportComponent,
                recv_lot_serial_tracking_report_component_1.LotSerialTrackingReportComponent,
                recv_manage_carriers_component_1.ManageCarriersComponent,
                recv_parcel_count_report_component_1.ParcelCountReportComponent,
                recv_po_nonpo_receipts_component_1.PoNonPoReceiptsComponent,
                recv_release_orders_component_1.ReleaseOrdersComponent,
                recv_setup_shiptoids_component_1.SetupShipToIdsComponent,
                recv_user_parameters_component_1.UserParametersComponent
            ]
        })
    ], ReceivingModule);
    return ReceivingModule;
}());
exports.ReceivingModule = ReceivingModule;
//# sourceMappingURL=recv.module.js.map