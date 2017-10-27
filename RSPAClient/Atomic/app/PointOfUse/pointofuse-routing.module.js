"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var pointofuse_component_1 = require("./pointofuse.component");
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
var pou_department_loaction_allocation_component_1 = require("./pou-department-loaction-allocation.component");
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
var pou_manage_cosigned_item_order_report_componenet_1 = require("./pou-manage-cosigned-item-order-report.componenet");
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
var pou_quanity_on_hand_report_component_1 = require("./pou-quanity-on-hand-report.component");
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
exports.routes = [
    {
        path: '',
        component: pointofuse_component_1.PointOfUseComponent,
        children: [
            { path: 'activityreport', component: pou_activity_report_component_1.ActivityReportComponent },
            { path: 'backorderreport', component: pou_back_order_report_component_1.BackOrderReportComponent },
            { path: 'billonlyitemmaintenance', component: pou_bill_only_item_maintenance_component_1.BillOnlyItemMaintenanceComponent },
            { path: 'casereviewreport', component: pou_case_review_report_component_1.CaseReviewReportComponent },
            { path: 'casetrackreport', component: pou_case_track_report_component_1.CaseTrackReportComponent },
            { path: 'chargereport', component: pou_charge_report_component_1.ChargeReportComponent },
            { path: 'parlocationcompliancesummaryreport', component: pou_compilance_summary_report_component_1.CompilanceSummaryReportComponent },
            { path: 'parlocationcompliancedetailreport', component: pou_compliance_detail_report_component_1.ComplianceDetailReportComponent },
            { path: 'createorders', component: pou_create_orders_component_1.POUCreateOrdersComponent },
            { path: 'criticalitems', component: pou_critical_items_component_1.POUCriticalItemsComponent },
            { path: 'dailyuseractivityreport', component: pou_daily_user_activity_report_component_1.DailyUserActivityReportComponent },
            { path: 'dashboard', component: pou_dashboard_component_1.DashBoardComponent },
            { path: 'departmentdeviceallocation', component: pou_department_device_allocation_component_1.DepartmentDeviceAllocationComponent },
            { path: 'departmentlocationallocation', component: pou_department_loaction_allocation_component_1.DepartmentLocationAllocationComponent },
            { path: 'departmentlocationworkstationallocation', component: pou_department_location_workstation_allocation_component_1.DepartmentLocationWorkstationAllocationComponent },
            { path: 'departmentuserallocation', component: pou_department_user_allocation_component_1.DepartmentUserAllocationComponent },
            { path: 'expirationtrackingreport', component: pou_expiration_tracking_report_component_1.ExpirationTrackingReportComponent },
            { path: 'issuesw/opatientreport', component: pou_issues_wo_patient_report_component_1.IssuesWOPatientReportComponent },
            { path: 'itemusageanalysisreport', component: pou_item_usage_analysis_report_component_1.ItemUsageAnalysisReportComponent },
            { path: 'itemusagereport', component: pou_item_usage_report_component_1.ItemUsageReportComponent },
            { path: 'lot/serialtrackingreport', component: pou_lotserial_tracking_report_component_1.LotSerialTrackingReportComponent },
            { path: 'lowstockreport', component: pou_low_stock_report_component_1.LowStockReportComponent },
            { path: 'maintainnoncartitems', component: pou_maintain_non_cart_items_component_1.MaintainNonCartItemsComponent },
            { path: 'managecases', component: pou_manage_cases_component_1.ManageCasesComponent },
            { path: 'manageconsigneditemorderreport', component: pou_manage_cosigned_item_order_report_componenet_1.ManageConsignedItemOrderReportComponent },
            { path: 'manageorders', component: pou_manage_orders_component_1.ManageOrdersComponent },
            { path: 'manageparlocation', component: pou_manage_par_location_component_1.ManageParLocationComponent },
            { path: 'noncatalogpurchases', component: pou_non_catalog_purchases_component_1.NonCatalogPurchasesComponent },
            { path: 'paroptimizationreport', component: pou_par_optimization_report_component_1.ParOptimizationReportComponent },
            { path: 'physicianusagereport', component: pou_physician_usage_report_component_1.PhysicianUsageReportComponent },
            { path: 'postpickqa', component: pou_post_pick_qa_component_1.PostPickQAComponent },
            { path: 'prefcardoptimizationreport', component: pou_pref_card_optimization_report_component_1.PrefCardOptimizationReportComponent },
            { path: 'prefcardperformancedetails', component: pou_pref_card_performance_details_component_1.PrefCardPerformanceDetailsComponent },
            { path: 'prefcardperformancemanagementsummary', component: pou_pref_card_performance_management_summary_component_1.PrefCardPerformanceManagementSummaryComponent },
            { path: 'prefcardperformancesummary', component: pou_pref_card_performance_summary_component_1.PrefCardPerformanceSummaryComponent },
            { path: 'preferencelists', component: pou_preference_lists_component_1.PreferenceListsComponent },
            { path: 'processes', component: pou_process_parameters_component_1.ProcessParamsComponent },
            { path: 'quantityonhandreport', component: pou_quanity_on_hand_report_component_1.QuanityOnHandReportComponent },
            { path: 'releasecases', component: pou_release_cases_component_1.ReleaseCasesComponent },
            { path: 'reviewcharges/credits', component: pou_review_charges_credits_component_1.ReviewChargesCreditsComponent },
            { path: 'setupcase', component: pou_setup_case_component_1.SetupCaseComponent },
            { path: 'setupdepartments', component: pou_setup_departments_component_1.SetupDepartmentsComponent },
            { path: 'setupitemattributes', component: pou_setup_item_attributes_component_1.SetupItemAttributesComponent },
            { path: 'setupparlocations', component: pou_setup_par_locations_component_1.SetupParLocationsComponent },
            { path: 'setupphysicians', component: pou_setup_physicians_component_1.SetupPhysiciansComponent },
            { path: 'setupprocedures', component: pou_setup_procedures_component_1.SetupProceduresComponent },
            { path: 'setupreasons', component: pou_setup_reasons_component_1.SetupReasonsComponent },
            { path: 'setupspecialty/service', component: pou_setup_specialty_services_component_1.SetupSpecialtyServiceComponent },
            { path: 'transactionhistoryreport', component: pou_transaction_history_report_component_1.TransactionHistoryReportComponent },
            { path: 'userparameters', component: pou_user_parameters_component_1.UserParametersComponent },
        ]
    }
];
var PointOfUseRoutingModule = (function () {
    function PointOfUseRoutingModule() {
    }
    return PointOfUseRoutingModule;
}());
PointOfUseRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.routes)],
        exports: [router_1.RouterModule]
    })
], PointOfUseRoutingModule);
exports.PointOfUseRoutingModule = PointOfUseRoutingModule;
//# sourceMappingURL=pointofuse-routing.module.js.map