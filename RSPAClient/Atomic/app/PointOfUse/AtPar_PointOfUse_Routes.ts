import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PointOfUseImports } from './PointOfUseImports';

const routes: Routes = GetScreens();
export const AtPar_PointOfUse_Routes = RouterModule.forRoot(routes);

function GetScreens() {
    var results: Array<Object> = Array<Object>();
    let routesList: Array<string> = ["PointOfUse/ActivityReport", "PointOfUse/BackOrderReport", "PointOfUse/BillOnlyItemMaintenance", "PointOfUse/CaseReviewReport", "PointOfUse/CaseTrackReport",
        "PointOfUse/ChargeReport", "PointOfUse/ParLocationComplianceSummaryReport", "PointOfUse/ParLocationComplianceDetailReport", "PointOfUse/CreateOrders", "PointOfUse/CriticalItems", "PointOfUse/DailyUserActivityReport",
        "PointOfUse/DashBoard","PointOfUse/DepartmentDeviceAllocation", "PointOfUse/DepartmentLocationAllocation", "PointOfUse/DepartmentLocationWorkstationAllocation", "PointOfUse/DepartmentUserAllocation", "PointOfUse/ExpirationTrackingReport",
        "PointOfUse/IssuesW/OPatientReport","PointOfUse/ItemUsageAnalysisReport", "PointOfUse/ItemUsageReport", "PointOfUse/Lot/SerialTrackingReport",
        "PointOfUse/LowStockReport", "PointOfUse/MaintainNonCartItems", "PointOfUse/ManageCases", "PointOfUse/ManageConsignedItemOrderReport", "PointOfUse/ManageOrders", "PointOfUse/ManageParLocation","PointOfUse/NonCatalogPurchases", "PointOfUse/ParOptimizationReport", "PointOfUse/PhysicianUsageReport",
        "PointOfUse/PostPickQA", "PointOfUse/PrefCardOptimizationReport", "PointOfUse/PrefCardPerformanceDetails", "PointOfUse/PrefCardPerformanceManagementSummary", "PointOfUse/PrefCardPerformanceSummary", "PointOfUse/PreferenceLists", "PointOfUse/Processes", "PointOfUse/QuantityOnHANDReport", "PointOfUse/ReleaseCases",
        "PointOfUse/ReviewCharges/Credits", "PointOfUse/SetupCase", "PointOfUse/SetupDepartments","PointOfUse/SetupItemAttributes", "PointOfUse/SetupParLocations",
        "PointOfUse/SetupPhysicians", "PointOfUse/SetupProcedures", "PointOfUse/SetupReasons", "PointOfUse/SetupSpecialty/Service","PointOfUse/TransactionHistoryReport","PointOfUse/UserParameters"]

    let scrnName = 0;

    routesList.map(screenId => {
        let componentName = PointOfUseImports[scrnName];

        results.push({ path: screenId, component: componentName })
        scrnName++;
    })

    return results
}

