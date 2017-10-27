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
//import { PointOfUseComponent } from './pointofuse.component';
var pou_activity_report_component_1 = require("./pou-activity-report.component");
var pou_back_order_report_component_1 = require("./pou-back-order-report.component");
var pou_bill_only_item_maintenance_component_1 = require("./pou-bill-only-item-maintenance.component");
var pou_case_review_report_component_1 = require("./pou-case-review-report.component");
var pou_case_track_report_component_1 = require("./pou-case-track-report.component");
var pou_charge_report_component_1 = require("./pou-charge-report.component");
var pou_compilance_summary_report_component_1 = require("./pou-compilance-summary-report.component");
var pou_compliance_detail_report_component_1 = require("./pou-compliance-detail-report.component");
var pou_create_orders_component_1 = require("./pou-create-orders.component");
var pou_critical_items_component_1 = require("./pou-critical-items.component");
var pou_daily_user_activity_report_component_1 = require("./pou-daily-user-activity-report.component");
var pou_dashboard_component_1 = require("./pou-dashboard.component");
var pou_department_location_workstation_allocation_component_1 = require("./pou-department-location-workstation-allocation.component");
var pou_department_user_allocation_component_1 = require("./pou-department-user-allocation.component");
var pou_expiration_tracking_report_component_1 = require("./pou-expiration-tracking-report.component");
var pou_issues_wo_patient_report_component_1 = require("./pou-issues-wo-patient-report.component");
var pou_item_usage_analysis_report_component_1 = require("./pou-item-usage-analysis-report.component");
var pou_item_usage_report_component_1 = require("./pou-item-usage-report.component");
var pou_lotserial_tracking_report_component_1 = require("./pou-lotserial-tracking-report.component");
var pou_low_stock_report_component_1 = require("./pou-low-stock-report.component");
var pou_maintain_non_cart_items_component_1 = require("./pou-maintain-non-cart-items.component");
var pou_manage_cases_component_1 = require("./pou-manage-cases.component");
var pou_manage_cosigned_item_order_report_component_1 = require("./pou-manage-cosigned-item-order-report.component");
var pou_manage_orders_component_1 = require("./pou-manage-orders.component");
var pou_manage_par_location_component_1 = require("./pou-manage-par-location.component");
var pou_non_catalog_purchases_component_1 = require("./pou-non-catalog-purchases.component");
var pou_par_optimization_report_component_1 = require("./pou-par-optimization-report.component");
var pou_physician_usage_report_component_1 = require("./pou-physician-usage-report.component");
var pou_post_pick_qa_component_1 = require("./pou-post-pick-qa.component");
var pou_pref_card_optimization_report_component_1 = require("./pou-pref-card-optimization-report.component");
var pou_pref_card_performance_details_component_1 = require("./pou-pref-card-performance-details.component");
var pou_pref_card_performance_management_summary_component_1 = require("./pou-pref-card-performance-management-summary.component");
var pou_pref_card_performance_summary_component_1 = require("./pou-pref-card-performance-summary.component");
var pou_preference_lists_component_1 = require("./pou-preference-lists.component");
var pou_quantity_on_hand_report_component_1 = require("./pou-quantity-on-hand-report.component");
var pou_release_cases_component_1 = require("./pou-release-cases.component");
var pou_review_charges_credits_component_1 = require("./pou-review-charges-credits.component");
var pou_setup_case_component_1 = require("./pou-setup-case.component");
var pou_setup_departments_component_1 = require("./pou-setup-departments.component");
var pou_setup_item_attributes_component_1 = require("./pou-setup-item-attributes.component");
var pou_setup_par_locations_component_1 = require("./pou-setup-par-locations.component");
var pou_setup_physicians_component_1 = require("./pou-setup-physicians.component");
var pou_setup_procedures_component_1 = require("./pou-setup-procedures.component");
var pou_setup_reasons_component_1 = require("./pou-setup-reasons.component");
var pou_setup_specialty_services_component_1 = require("./pou-setup-specialty-services.component");
var pou_transaction_history_report_component_1 = require("./pou-transaction-history-report.component");
var pou_user_parameters_component_1 = require("./pou-user-parameters.component");
var pou_cost_variance_report_component_1 = require("./pou_cost_variance_report.component");
var pou_physician_bench_mark_component_1 = require("./pou-physician-bench-mark.component");
//import { PointOfUseRoutingModule } from './pointofuse-routing.module';
var shared_module_1 = require("../Shared/shared.module");
var pou_preference_card_optimization_component_1 = require("./pou-preference-card-optimization.component");
var pou_expiration_tracking_report_component_home_1 = require("./pou-expiration-tracking-report.component.home");
var PointOfUseModule = (function () {
    function PointOfUseModule() {
    }
    PointOfUseModule = __decorate([
        core_1.NgModule({
            imports: [
                //PointOfUseRoutingModule,
                shared_module_1.SharedModule,
                router_1.RouterModule
            ],
            declarations: [
                //PointOfUseComponent,
                pou_activity_report_component_1.ActivityReportComponent,
                pou_back_order_report_component_1.BackOrderReportComponent,
                pou_bill_only_item_maintenance_component_1.BillOnlyItemMaintenanceComponent,
                pou_case_review_report_component_1.CaseReviewReportComponent,
                pou_case_track_report_component_1.CaseTrackReportComponent,
                pou_charge_report_component_1.ChargeReportComponent,
                pou_compilance_summary_report_component_1.CompilanceSummaryReportComponent,
                pou_compliance_detail_report_component_1.ComplianceDetailReportComponent,
                pou_create_orders_component_1.CreateOrdersComponent,
                pou_critical_items_component_1.CriticalItemsComponent,
                pou_daily_user_activity_report_component_1.DailyUserActivityReportComponent,
                pou_dashboard_component_1.DashBoardComponent,
                //DepartmentDeviceAllocationComponent,
                // DepartmentLocationAllocationComponent ,
                pou_department_location_workstation_allocation_component_1.DepartmentLocationWorkstationAllocationComponent,
                pou_department_user_allocation_component_1.DepartmentUserAllocationComponent,
                pou_expiration_tracking_report_component_1.ExpirationTrackingReportComponent,
                pou_expiration_tracking_report_component_home_1.ExpirationTrackingReportHomeComponent,
                pou_issues_wo_patient_report_component_1.IssuesWOPatientReportComponent,
                pou_item_usage_analysis_report_component_1.ItemUsageAnalysisReportComponent,
                pou_item_usage_report_component_1.ItemUsageReportComponent,
                pou_lotserial_tracking_report_component_1.LotSerialTrackingReportComponent,
                pou_low_stock_report_component_1.LowStockReportComponent,
                pou_maintain_non_cart_items_component_1.MaintainNonCartItemsComponent,
                pou_manage_cases_component_1.ManageCasesComponent,
                pou_manage_cosigned_item_order_report_component_1.ManageConsignedItemOrderReportComponent,
                pou_manage_orders_component_1.ManageOrdersComponent,
                pou_manage_par_location_component_1.ManageParLocationComponent,
                pou_non_catalog_purchases_component_1.NonCatalogPurchasesComponent,
                pou_par_optimization_report_component_1.ParOptimizationReportComponent,
                pou_physician_usage_report_component_1.PhysicianUsageReportComponent,
                pou_post_pick_qa_component_1.PostPickQAComponent,
                pou_pref_card_optimization_report_component_1.PrefCardOptimizationReportComponent,
                pou_pref_card_performance_details_component_1.PrefCardPerformanceDetailsComponent,
                pou_pref_card_performance_management_summary_component_1.PrefCardPerformanceManagementSummaryComponent,
                pou_pref_card_performance_summary_component_1.PrefCardPerformanceSummaryComponent,
                pou_preference_lists_component_1.PreferenceListsComponent,
                //ProcessParametersComponent,
                pou_quantity_on_hand_report_component_1.QuanityOnHandReportComponent,
                pou_release_cases_component_1.ReleaseCasesComponent,
                pou_review_charges_credits_component_1.ReviewChargesCreditsComponent,
                pou_setup_case_component_1.SetupCaseComponent,
                pou_setup_departments_component_1.SetupDepartmentsComponent,
                pou_setup_item_attributes_component_1.SetupItemAttributesComponent,
                pou_setup_par_locations_component_1.SetupParLocationsComponent,
                pou_setup_physicians_component_1.SetupPhysiciansComponent,
                pou_setup_procedures_component_1.SetupProceduresComponent,
                pou_setup_reasons_component_1.SetupReasonsComponent,
                pou_setup_specialty_services_component_1.SetupSpecialtyServiceComponent,
                pou_transaction_history_report_component_1.TransactionHistoryReportComponent,
                pou_user_parameters_component_1.UserParametersComponent,
                pou_preference_card_optimization_component_1.PreferenceCardOptimizationComponent,
                // DepartmentUserAllocationHomeComponent,
                //DepartmentUserAllocationAssignComponent
                pou_cost_variance_report_component_1.CostVarianceComponent,
                pou_physician_bench_mark_component_1.PhysicianBenchMarkingComponent
            ],
        })
    ], PointOfUseModule);
    return PointOfUseModule;
}());
exports.PointOfUseModule = PointOfUseModule;
//# sourceMappingURL=pointofuse.module.js.map