"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var cartcount_component_1 = require("./cartcount.component");
var cart_activity_report_component_1 = require("./cart-activity-report.component");
var cart_allocate_carts_component_1 = require("./cart-allocate-carts.component");
var cart_cart_averages_report_component_1 = require("./cart-cart-averages-report.component");
var cart_cart_detail_report_component_1 = require("./cart-cart-detail-report.component");
var cart_cart_putaway_report_component_1 = require("./cart-cart-putaway-report.component");
var cart_create_orders_component_1 = require("./cart-create-orders.component");
var cart_create_requisition_component_1 = require("./cart-create-requisition.component");
var cart_critical_items_component_1 = require("./cart-critical-items.component");
var cart_daily_activity_component_1 = require("./cart-daily-activity.component");
var cart_daily_user_activity_component_1 = require("./cart-daily-user-activity.component");
var cart_item_exception_report_component_1 = require("./cart-item-exception-report.component");
var cart_item_usage_report_component_1 = require("./cart-item-usage-report.component");
var cart_manage_orders_component_1 = require("./cart-manage-orders.component");
var cart_manage_par_location_component_1 = require("./cart-manage-par-location.component");
var cart_optimization_report_component_1 = require("./cart-optimization-report.component");
var cart_order_history_report_component_1 = require("./cart-order-history-report.component");
var cart_par_audit_report_component_1 = require("./cart-par-audit-report.component");
var cart_process_parameters_component_1 = require("./cart-process-parameters.component");
var cart_schedule_compliance_report_component_1 = require("./cart-schedule-compliance-report.component");
var cart_setup_par_locations_component_1 = require("./cart-setup-par-locations.component");
var cart_user_parameters_component_1 = require("./cart-user-parameters.component");
var cart_user_productivity_report_component_1 = require("./cart-user-productivity-report.component");
var cart_2bin_setup_component_1 = require("./cart-2bin-setup.component");
var cartcount_routing_module_1 = require("./cartcount-routing.module");
//import { SharedModule } from '../shared/shared.module'
var CartCountModule = (function () {
    function CartCountModule() {
    }
    return CartCountModule;
}());
CartCountModule = __decorate([
    core_1.NgModule({
        imports: [
            cartcount_routing_module_1.CartCountRoutingModule,
        ],
        declarations: [
            cartcount_component_1.CartCountComponent,
            cart_activity_report_component_1.ActivityReportComponent,
            cart_allocate_carts_component_1.AllocateCartsComponent,
            cart_cart_averages_report_component_1.CartAveragesReportsComponent,
            cart_cart_detail_report_component_1.CartDetailReportComponent,
            cart_cart_putaway_report_component_1.CartPutawayReportComponent,
            cart_create_orders_component_1.CreateOrdersComponent,
            cart_create_requisition_component_1.CreateRequisitionComponent,
            cart_critical_items_component_1.CriticalItemsComponent,
            cart_daily_activity_component_1.DailyActivityComponent,
            cart_daily_user_activity_component_1.DailyUserActivityComponent,
            cart_item_exception_report_component_1.ItemExceptionReportComponent,
            cart_item_usage_report_component_1.ItemUsageReportComponent,
            cart_manage_orders_component_1.ManageOrdersComponent,
            cart_manage_par_location_component_1.ManageParLocationComponent,
            cart_optimization_report_component_1.OptimizationReportComponent,
            cart_order_history_report_component_1.OrderHistoryReportComponent,
            cart_par_audit_report_component_1.ParAuditReportComponent,
            cart_process_parameters_component_1.ProcessParametersComponent,
            cart_schedule_compliance_report_component_1.ScheduleComplianceReportComponent,
            cart_setup_par_locations_component_1.SetupParLocationsComponent,
            cart_user_parameters_component_1.UserParametersComponent,
            cart_user_productivity_report_component_1.UserProductivityReportComponent,
            cart_2bin_setup_component_1.ToBinSetup
        ]
    })
], CartCountModule);
exports.CartCountModule = CartCountModule;
//# sourceMappingURL=cartcount.module.js.map