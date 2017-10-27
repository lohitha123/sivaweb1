import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityReportComponent } from './pou-activity-report.component';
import { BackOrderReportComponent } from './pou-back-order-report.component';
import { BillOnlyItemMaintenanceComponent } from './pou-bill-only-item-maintenance.component';
import { CaseReviewReportComponent } from './pou-case-review-report.component';
import { CaseTrackReportComponent } from './pou-case-track-report.component';
import { ChargeReportComponent } from './pou-charge-report.component';
import { CompilanceSummaryReportComponent } from './pou-compilance-summary-report.component';
import { ComplianceDetailReportComponent } from './pou-compliance-detail-report.component';
import { CreateOrdersComponent } from './pou-create-orders.component';
import { CriticalItemsComponent } from './pou-critical-items.component';
import { DailyUserActivityReportComponent } from './pou-daily-user-activity-report.component';
import { DashBoardComponent } from './pou-dashboard.component';
import { DepartmentDeviceAllocationComponent } from './pou-department-device-allocation.component';
import { DepartmentLocationAllocationComponent } from './pou-department-location-allocation.component';
import { DepartmentLocationWorkstationAllocationComponent } from './pou-department-location-workstation-allocation.component';
import { DepartmentUserAllocationComponent } from './pou-department-user-allocation.component';
import { ExpirationTrackingReportComponent } from './pou-expiration-tracking-report.component';
import { ExpirationTrackingReportHomeComponent } from './pou-expiration-tracking-report.component.home';
import { IssuesWOPatientReportComponent } from './pou-issues-wo-patient-report.component';
import { ItemUsageAnalysisReportComponent } from './pou-item-usage-analysis-report.component';
import { ItemUsageReportComponent } from './pou-item-usage-report.component';
import { LotSerialTrackingReportComponent } from './pou-lotserial-tracking-report.component';
import { LowStockReportComponent } from './pou-low-stock-report.component';
import { MaintainNonCartItemsComponent } from './pou-maintain-non-cart-items.component';
import { ManageCasesComponent } from './pou-manage-cases.component';
import { ManageConsignedItemOrderReportComponent } from './pou-manage-cosigned-item-order-report.component';
import { ManageOrdersComponent } from './pou-manage-orders.component';
import { ManageParLocationComponent } from './pou-manage-par-location.component';
import { NonCatalogPurchasesComponent } from './pou-non-catalog-purchases.component';
import { ParOptimizationReportComponent } from './pou-par-optimization-report.component';
import { PhysicianUsageReportComponent } from './pou-physician-usage-report.component';
import { PostPickQAComponent } from './pou-post-pick-qa.component';
import { PrefCardOptimizationReportComponent } from './pou-pref-card-optimization-report.component';
import { PrefCardPerformanceDetailsComponent } from './pou-pref-card-performance-details.component';
import { PrefCardPerformanceManagementSummaryComponent } from './pou-pref-card-performance-management-summary.component';
import { PrefCardPerformanceSummaryComponent } from './pou-pref-card-performance-summary.component';
import { PreferenceListsComponent } from './pou-preference-lists.component';
import { ProcessParametersComponent } from './pou-process-parameters.component';
import { QuanityOnHandReportComponent } from './pou-quantity-on-hand-report.component';
import { ReleaseCasesComponent } from './pou-release-cases.component';
import { ReviewChargesCreditsComponent } from './pou-review-charges-credits.component';
import { SetupCaseComponent } from './pou-setup-case.component';
import { SetupDepartmentsComponent } from './pou-setup-departments.component';
import { SetupItemAttributesComponent } from './pou-setup-item-attributes.component';
import { SetupParLocationsComponent } from './pou-setup-par-locations.component';
import { SetupPhysiciansComponent } from './pou-setup-physicians.component';
import { SetupProceduresComponent } from './pou-setup-procedures.component';
import { SetupReasonsComponent } from './pou-setup-reasons.component';
import { SetupSpecialtyServiceComponent } from './pou-setup-specialty-services.component';
import { TransactionHistoryReportComponent } from './pou-transaction-history-report.component';
import { UserParametersComponent } from './pou-user-parameters.component';
import { DepartmentUserAllocationHomeComponent } from './pou-department-user-allocation.home.component';
import { DepartmentUserAllocationAssignComponent } from './pou-department-user-allocation.Assign.component';
import { CostVarianceComponent } from './pou_cost_variance_report.component';
import { PhysicianBenchMarkingComponent } from './pou-physician-bench-mark.component';
import { PreferenceCardOptimizationComponent } from './pou-preference-card-optimization.component';

export const POURoutes: Routes = [
    //{
    //path: '',
    //component: PointOfUseComponent,
    //children: [
    { path: 'pointofuse/activityreport', component: ActivityReportComponent },
    { path: 'pointofuse/backorderreport', component: BackOrderReportComponent },
    { path: 'pointofuse/billonlyitemmaintenance', component: BillOnlyItemMaintenanceComponent },
    { path: 'pointofuse/casereviewreport', component: CaseReviewReportComponent },
    { path: 'pointofuse/casetrackreport', component: CaseTrackReportComponent },
    { path: 'pointofuse/chargereport', component: ChargeReportComponent },
    { path: 'pointofuse/parlocationcompliancesummaryreport', component: CompilanceSummaryReportComponent },
    { path: 'pointofuse/parlocationcompliancedetailreport', component: ComplianceDetailReportComponent },
    { path: 'pointofuse/createorders', component: CreateOrdersComponent },
    { path: 'pointofuse/criticalitems', component: CriticalItemsComponent },
    { path: 'pointofuse/dailyuseractivityreport', component: DailyUserActivityReportComponent },
    { path: 'pointofuse/dashboard', component: DashBoardComponent },
    { path: 'pointofuse/departmentdeviceallocation', component: DepartmentDeviceAllocationComponent },
    { path: 'pointofuse/departmentlocationallocation', component: DepartmentLocationAllocationComponent },
    { path: 'pointofuse/departmentlocationworkstationallocation', component: DepartmentLocationWorkstationAllocationComponent },
    {
        path: 'pointofuse/departmentuserallocation', component: DepartmentUserAllocationComponent,
        children: [
            { path: '', component: DepartmentUserAllocationHomeComponent },
            { path: 'assign', component: DepartmentUserAllocationAssignComponent }

        ]
    },
    {
        path: 'pointofuse/expirationtrackingreport', component: ExpirationTrackingReportComponent,
        children: [
            { path: '', component: ExpirationTrackingReportHomeComponent },
            { path: 'pointofuse/itemusagereport', component: ItemUsageReportComponent },

        ]
    },
    //{ path: 'pointofuse/expirationtrackingreport', component: ExpirationTrackingReportComponent },
    { path: 'pointofuse/issuesw/opatientreport', component: IssuesWOPatientReportComponent },
    { path: 'pointofuse/itemusageanalysisreport', component: ItemUsageAnalysisReportComponent },
    { path: 'pointofuse/itemusagereport', component: ItemUsageReportComponent },
    { path: 'pointofuse/lot/serialtrackingreport', component: LotSerialTrackingReportComponent },
    { path: 'pointofuse/lowstockreport', component: LowStockReportComponent },
    { path: 'pointofuse/maintainnoncartitems', component: MaintainNonCartItemsComponent },
    { path: 'pointofuse/managecases', component: ManageCasesComponent },
    { path: 'pointofuse/manageconsigneditemorderreport', component: ManageConsignedItemOrderReportComponent },
    { path: 'pointofuse/manageorders', component: ManageOrdersComponent },
    { path: 'pointofuse/manageparlocation', component: ManageParLocationComponent },
    { path: 'pointofuse/noncatalogpurchases', component: NonCatalogPurchasesComponent },
    { path: 'pointofuse/paroptimizationreport', component: ParOptimizationReportComponent },
    { path: 'pointofuse/physicianusagereport', component: PhysicianUsageReportComponent },
    { path: 'pointofuse/postpickqa', component: PostPickQAComponent },
    { path: 'pointofuse/prefcardoptimizationreport', component: PrefCardOptimizationReportComponent },
    { path: 'pointofuse/prefcardperformancedetails', component: PrefCardPerformanceDetailsComponent },
    { path: 'pointofuse/prefcardperformancemanagementsummary', component: PrefCardPerformanceManagementSummaryComponent },
    { path: 'pointofuse/prefcardperformancesummary', component: PrefCardPerformanceSummaryComponent },
    { path: 'pointofuse/preferencelists', component: PreferenceListsComponent },
    { path: 'pointofuse/processes', component: ProcessParametersComponent },
    { path: 'pointofuse/quantityonhandreport', component: QuanityOnHandReportComponent },
    { path: 'pointofuse/releasecases', component: ReleaseCasesComponent },
    { path: 'pointofuse/reviewcharges/credits', component: ReviewChargesCreditsComponent },
    { path: 'pointofuse/setupcase', component: SetupCaseComponent },
    { path: 'pointofuse/setupdepartments', component: SetupDepartmentsComponent },
    { path: 'pointofuse/setupitemattributes', component: SetupItemAttributesComponent },
    { path: 'pointofuse/setupparlocations', component: SetupParLocationsComponent },
    { path: 'pointofuse/setupphysicians', component: SetupPhysiciansComponent },
    { path: 'pointofuse/setupprocedures', component: SetupProceduresComponent },
    { path: 'pointofuse/setupreasons', component: SetupReasonsComponent },
    { path: 'pointofuse/setupspecialty/service', component: SetupSpecialtyServiceComponent },
    { path: 'pointofuse/transactionhistoryreport', component: TransactionHistoryReportComponent },
    { path: 'pointofuse/userparameters', component: UserParametersComponent },
    { path: 'pointofuse/costvarianceanalysis', component: CostVarianceComponent },
    { path: 'pointofuse/physicianbenchmarking', component: PhysicianBenchMarkingComponent },
    { path: 'pointofuse/preferencecardoptimization', component: PreferenceCardOptimizationComponent }
    //    ]
    //}
]

@NgModule({
    imports: [RouterModule.forChild(POURoutes)],
    exports: [RouterModule]
})

export class PointOfUseRoutingModule { }

