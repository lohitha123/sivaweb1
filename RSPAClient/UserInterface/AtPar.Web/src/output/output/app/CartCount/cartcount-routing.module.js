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
var cartcount_component_1 = require("./cartcount.component");
var cart_activity_report_component_1 = require("./cart-activity-report.component");
var cart_allocate_carts_component_1 = require("./cart-allocate-carts.component");
var cart_cart_averages_report_component_1 = require("./cart-cart-averages-report.component");
var cart_cart_detail_report_component_1 = require("./cart-cart-detail-report.component");
var cart_cart_putaway_report_component_1 = require("./cart-cart-putaway-report.component");
var cart_create_orders_component_1 = require("./cart-create-orders.component");
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
var cart_twobin_allocation_component_1 = require("./cart-twobin-allocation.component");
exports.routes = [
    {
        path: '',
        component: cartcount_component_1.CartCountComponent,
        children: [
            { path: 'activityreport', component: cart_activity_report_component_1.ActivityReportComponent },
            { path: 'allocatecarts', component: cart_allocate_carts_component_1.AllocateCartsComponent },
            { path: 'cartaveragesreport', component: cart_cart_averages_report_component_1.CartAveragesReportsComponent },
            { path: 'cartdetailreport', component: cart_cart_detail_report_component_1.CartDetailReportComponent },
            { path: 'cartputawayreport', component: cart_cart_putaway_report_component_1.CartPutawayReportComponent },
            { path: 'createorders', component: cart_create_orders_component_1.CreateOrdersComponent },
            { path: 'criticalitems', component: cart_critical_items_component_1.CriticalItemsComponent },
            { path: 'dailyactivity', component: cart_daily_activity_component_1.DailyActivityComponent },
            { path: 'dailyuseractivity', component: cart_daily_user_activity_component_1.DailyUserActivityComponent },
            { path: 'itemexceptionreport', component: cart_item_exception_report_component_1.ItemExceptionReportComponent },
            { path: 'itemusagereport', component: cart_item_usage_report_component_1.ItemUsageReportComponent },
            { path: 'manageorders', component: cart_manage_orders_component_1.ManageOrdersComponent },
            { path: 'manageparlocation', component: cart_manage_par_location_component_1.ManageParLocationComponent },
            { path: 'optimizationreport', component: cart_optimization_report_component_1.OptimizationReportComponent },
            { path: 'orderhistoryreport', component: cart_order_history_report_component_1.OrderHistoryReportComponent },
            { path: 'parauditreport', component: cart_par_audit_report_component_1.ParAuditReportComponent },
            { path: 'processparameters', component: cart_process_parameters_component_1.ProcessParametersComponent },
            { path: 'schedulecompliancereport', component: cart_schedule_compliance_report_component_1.ScheduleComplianceReportComponent },
            { path: 'setupparlocations', component: cart_setup_par_locations_component_1.SetupParLocationsComponent },
            { path: 'userparameters', component: cart_user_parameters_component_1.UserParametersComponent },
            { path: 'userproductivityreport', component: cart_user_productivity_report_component_1.UserProductivityReportComponent },
            { path: 'twobinallocation', component: cart_twobin_allocation_component_1.TwoBinAllocationComponent }
        ]
    }
];
var CartCountRoutingModule = (function () {
    function CartCountRoutingModule() {
    }
    CartCountRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.routes)],
            exports: [router_1.RouterModule]
        })
    ], CartCountRoutingModule);
    return CartCountRoutingModule;
}());
exports.CartCountRoutingModule = CartCountRoutingModule;
//# sourceMappingURL=cartcount-routing.module.js.map