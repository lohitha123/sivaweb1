"use strict";
var router_1 = require("@angular/router");
var PointOfUseImports_1 = require("./PointOfUseImports");
var routes = GetScreens();
exports.AtPar_PointOfUse_Routes = router_1.RouterModule.forRoot(routes);
function GetScreens() {
    var results = Array();
    var routesList = ["PointOfUse/ActivityReport", "PointOfUse/BackOrderReport", "PointOfUse/BillOnlyItemMaintenance", "PointOfUse/CaseReviewReport", "PointOfUse/CaseTrackReport",
        "PointOfUse/ChargeReport", "PointOfUse/ParLocationComplianceSummaryReport", "PointOfUse/ParLocationComplianceDetailReport", "PointOfUse/CreateOrders", "PointOfUse/CriticalItems", "PointOfUse/DailyUserActivityReport",
        "PointOfUse/DashBoard", "PointOfUse/DepartmentDeviceAllocation", "PointOfUse/DepartmentLocationAllocation", "PointOfUse/DepartmentLocationWorkstationAllocation", "PointOfUse/DepartmentUserAllocation", "PointOfUse/ExpirationTrackingReport",
        "PointOfUse/IssuesW/OPatientReport", "PointOfUse/ItemUsageAnalysisReport", "PointOfUse/ItemUsageReport", "PointOfUse/Lot/SerialTrackingReport",
        "PointOfUse/LowStockReport", "PointOfUse/MaintainNonCartItems", "PointOfUse/ManageCases", "PointOfUse/ManageConsignedItemOrderReport", "PointOfUse/ManageOrders", "PointOfUse/ManageParLocation", "PointOfUse/NonCatalogPurchases", "PointOfUse/ParOptimizationReport", "PointOfUse/PhysicianUsageReport",
        "PointOfUse/PostPickQA", "PointOfUse/PrefCardOptimizationReport", "PointOfUse/PrefCardPerformanceDetails", "PointOfUse/PrefCardPerformanceManagementSummary", "PointOfUse/PrefCardPerformanceSummary", "PointOfUse/PreferenceLists", "PointOfUse/Processes", "PointOfUse/QuantityOnHANDReport", "PointOfUse/ReleaseCases",
        "PointOfUse/ReviewCharges/Credits", "PointOfUse/SetupCase", "PointOfUse/SetupDepartments", "PointOfUse/SetupItemAttributes", "PointOfUse/SetupParLocations",
        "PointOfUse/SetupPhysicians", "PointOfUse/SetupProcedures", "PointOfUse/SetupReasons", "PointOfUse/SetupSpecialty/Service", "PointOfUse/TransactionHistoryReport", "PointOfUse/UserParameters"];
    var scrnName = 0;
    routesList.map(function (screenId) {
        var componentName = PointOfUseImports_1.PointOfUseImports[scrnName];
        results.push({ path: screenId, component: componentName });
        scrnName++;
    });
    return results;
}
//# sourceMappingURL=AtPar_PointOfUse_Routes.js.map