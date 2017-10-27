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
var pou_department_device_allocation_component_1 = require("./pou-department-device-allocation.component");
var pou_department_location_allocation_component_1 = require("./pou-department-location-allocation.component");
var pou_department_location_workstation_allocation_component_1 = require("./pou-department-location-workstation-allocation.component");
var pou_department_user_allocation_component_1 = require("./pou-department-user-allocation.component");
var pou_expiration_tracking_report_component_1 = require("./pou-expiration-tracking-report.component");
var pou_expiration_tracking_report_component_home_1 = require("./pou-expiration-tracking-report.component.home");
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
var pou_process_parameters_component_1 = require("./pou-process-parameters.component");
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
var pou_department_user_allocation_home_component_1 = require("./pou-department-user-allocation.home.component");
var pou_department_user_allocation_Assign_component_1 = require("./pou-department-user-allocation.Assign.component");
var pou_cost_variance_report_component_1 = require("./pou_cost_variance_report.component");
var pou_physician_bench_mark_component_1 = require("./pou-physician-bench-mark.component");
var pou_preference_card_optimization_component_1 = require("./pou-preference-card-optimization.component");
exports.POURoutes = [
    //{
    //path: '',
    //component: PointOfUseComponent,
    //children: [
    { path: 'pointofuse/activityreport', component: pou_activity_report_component_1.ActivityReportComponent },
    { path: 'pointofuse/backorderreport', component: pou_back_order_report_component_1.BackOrderReportComponent },
    { path: 'pointofuse/billonlyitemmaintenance', component: pou_bill_only_item_maintenance_component_1.BillOnlyItemMaintenanceComponent },
    { path: 'pointofuse/casereviewreport', component: pou_case_review_report_component_1.CaseReviewReportComponent },
    { path: 'pointofuse/casetrackreport', component: pou_case_track_report_component_1.CaseTrackReportComponent },
    { path: 'pointofuse/chargereport', component: pou_charge_report_component_1.ChargeReportComponent },
    { path: 'pointofuse/parlocationcompliancesummaryreport', component: pou_compilance_summary_report_component_1.CompilanceSummaryReportComponent },
    { path: 'pointofuse/parlocationcompliancedetailreport', component: pou_compliance_detail_report_component_1.ComplianceDetailReportComponent },
    { path: 'pointofuse/createorders', component: pou_create_orders_component_1.CreateOrdersComponent },
    { path: 'pointofuse/criticalitems', component: pou_critical_items_component_1.CriticalItemsComponent },
    { path: 'pointofuse/dailyuseractivityreport', component: pou_daily_user_activity_report_component_1.DailyUserActivityReportComponent },
    { path: 'pointofuse/dashboard', component: pou_dashboard_component_1.DashBoardComponent },
    { path: 'pointofuse/departmentdeviceallocation', component: pou_department_device_allocation_component_1.DepartmentDeviceAllocationComponent },
    { path: 'pointofuse/departmentlocationallocation', component: pou_department_location_allocation_component_1.DepartmentLocationAllocationComponent },
    { path: 'pointofuse/departmentlocationworkstationallocation', component: pou_department_location_workstation_allocation_component_1.DepartmentLocationWorkstationAllocationComponent },
    {
        path: 'pointofuse/departmentuserallocation', component: pou_department_user_allocation_component_1.DepartmentUserAllocationComponent,
        children: [
            { path: '', component: pou_department_user_allocation_home_component_1.DepartmentUserAllocationHomeComponent },
            { path: 'assign', component: pou_department_user_allocation_Assign_component_1.DepartmentUserAllocationAssignComponent }
        ]
    },
    {
        path: 'pointofuse/expirationtrackingreport', component: pou_expiration_tracking_report_component_1.ExpirationTrackingReportComponent,
        children: [
            { path: '', component: pou_expiration_tracking_report_component_home_1.ExpirationTrackingReportHomeComponent },
            { path: 'pointofuse/itemusagereport', component: pou_item_usage_report_component_1.ItemUsageReportComponent },
        ]
    },
    //{ path: 'pointofuse/expirationtrackingreport', component: ExpirationTrackingReportComponent },
    { path: 'pointofuse/issuesw/opatientreport', component: pou_issues_wo_patient_report_component_1.IssuesWOPatientReportComponent },
    { path: 'pointofuse/itemusageanalysisreport', component: pou_item_usage_analysis_report_component_1.ItemUsageAnalysisReportComponent },
    { path: 'pointofuse/itemusagereport', component: pou_item_usage_report_component_1.ItemUsageReportComponent },
    { path: 'pointofuse/lot/serialtrackingreport', component: pou_lotserial_tracking_report_component_1.LotSerialTrackingReportComponent },
    { path: 'pointofuse/lowstockreport', component: pou_low_stock_report_component_1.LowStockReportComponent },
    { path: 'pointofuse/maintainnoncartitems', component: pou_maintain_non_cart_items_component_1.MaintainNonCartItemsComponent },
    { path: 'pointofuse/managecases', component: pou_manage_cases_component_1.ManageCasesComponent },
    { path: 'pointofuse/manageconsigneditemorderreport', component: pou_manage_cosigned_item_order_report_component_1.ManageConsignedItemOrderReportComponent },
    { path: 'pointofuse/manageorders', component: pou_manage_orders_component_1.ManageOrdersComponent },
    { path: 'pointofuse/manageparlocation', component: pou_manage_par_location_component_1.ManageParLocationComponent },
    { path: 'pointofuse/noncatalogpurchases', component: pou_non_catalog_purchases_component_1.NonCatalogPurchasesComponent },
    { path: 'pointofuse/paroptimizationreport', component: pou_par_optimization_report_component_1.ParOptimizationReportComponent },
    { path: 'pointofuse/physicianusagereport', component: pou_physician_usage_report_component_1.PhysicianUsageReportComponent },
    { path: 'pointofuse/postpickqa', component: pou_post_pick_qa_component_1.PostPickQAComponent },
    { path: 'pointofuse/prefcardoptimizationreport', component: pou_pref_card_optimization_report_component_1.PrefCardOptimizationReportComponent },
    { path: 'pointofuse/prefcardperformancedetails', component: pou_pref_card_performance_details_component_1.PrefCardPerformanceDetailsComponent },
    { path: 'pointofuse/prefcardperformancemanagementsummary', component: pou_pref_card_performance_management_summary_component_1.PrefCardPerformanceManagementSummaryComponent },
    { path: 'pointofuse/prefcardperformancesummary', component: pou_pref_card_performance_summary_component_1.PrefCardPerformanceSummaryComponent },
    { path: 'pointofuse/preferencelists', component: pou_preference_lists_component_1.PreferenceListsComponent },
    { path: 'pointofuse/processes', component: pou_process_parameters_component_1.ProcessParametersComponent },
    { path: 'pointofuse/quantityonhandreport', component: pou_quantity_on_hand_report_component_1.QuanityOnHandReportComponent },
    { path: 'pointofuse/releasecases', component: pou_release_cases_component_1.ReleaseCasesComponent },
    { path: 'pointofuse/reviewcharges/credits', component: pou_review_charges_credits_component_1.ReviewChargesCreditsComponent },
    { path: 'pointofuse/setupcase', component: pou_setup_case_component_1.SetupCaseComponent },
    { path: 'pointofuse/setupdepartments', component: pou_setup_departments_component_1.SetupDepartmentsComponent },
    { path: 'pointofuse/setupitemattributes', component: pou_setup_item_attributes_component_1.SetupItemAttributesComponent },
    { path: 'pointofuse/setupparlocations', component: pou_setup_par_locations_component_1.SetupParLocationsComponent },
    { path: 'pointofuse/setupphysicians', component: pou_setup_physicians_component_1.SetupPhysiciansComponent },
    { path: 'pointofuse/setupprocedures', component: pou_setup_procedures_component_1.SetupProceduresComponent },
    { path: 'pointofuse/setupreasons', component: pou_setup_reasons_component_1.SetupReasonsComponent },
    { path: 'pointofuse/setupspecialty/service', component: pou_setup_specialty_services_component_1.SetupSpecialtyServiceComponent },
    { path: 'pointofuse/transactionhistoryreport', component: pou_transaction_history_report_component_1.TransactionHistoryReportComponent },
    { path: 'pointofuse/userparameters', component: pou_user_parameters_component_1.UserParametersComponent },
    { path: 'pointofuse/costvarianceanalysis', component: pou_cost_variance_report_component_1.CostVarianceComponent },
    { path: 'pointofuse/physicianbenchmarking', component: pou_physician_bench_mark_component_1.PhysicianBenchMarkingComponent },
    { path: 'pointofuse/preferencecardoptimization', component: pou_preference_card_optimization_component_1.PreferenceCardOptimizationComponent }
    //    ]
    //}
];
var PointOfUseRoutingModule = (function () {
    function PointOfUseRoutingModule() {
    }
    PointOfUseRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.POURoutes)],
            exports: [router_1.RouterModule]
        })
    ], PointOfUseRoutingModule);
    return PointOfUseRoutingModule;
}());
exports.PointOfUseRoutingModule = PointOfUseRoutingModule;
//# sourceMappingURL=pointofuse-routing.module.js.map