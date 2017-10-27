"use strict";
var router_1 = require("@angular/router");
var CartCountImports_1 = require("./CartCountImports");
var routes = GetScreens();
exports.AtPar_CartCount_Routes = router_1.RouterModule.forRoot(routes);
function GetScreens() {
    var results = Array();
    var routesList = ["CartCount/ActivityReport", "CartCount/AllocateCarts", "CartCount/CartAveragesReport",
        "CartCount/CartDetailReport", "CartCount/CartPutawayReport", "CartCount/CreateOrders", "CartCount/CreateRequisition",
        "CartCount/CriticalItems", "CartCount/DailyActivity", "CartCount/DailyUserActivity", "CartCount/ItemExceptionReport", "CartCount/ItemUsageReport",
        "CartCount/ManageOrders", "CartCount/ManageParLocation", "CartCount/OptimizationReport", "CartCount/OrderHistoryReport",
        "CartCount/ParAuditReport", "CartCount/ProcessParameters", "CartCount/ScheduleComplianceReport", "CartCount/SetupParLocations",
        "CartCount/UserParameters", "CartCount/UserProductivityReport"
    ];
    var scrnName = 0;
    routesList.map(function (screenId) {
        var componentName = CartCountImports_1.CartCountImports[scrnName];
        results.push({ path: screenId, component: componentName });
        scrnName++;
    });
    return results;
}
//# sourceMappingURL=AtPar_CartCount_Routes.js.map