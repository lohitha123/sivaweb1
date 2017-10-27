"use strict";
var router_1 = require("@angular/router");
var CycleCountImports_1 = require("./CycleCountImports");
var routes = GetScreens();
exports.AtPar_CycleCount_Routes = router_1.RouterModule.forRoot(routes);
function GetScreens() {
    var results = Array();
    var routesList = ["CycleCount/ActivityReport", "CycleCount/AllocateEvents", "CycleCount/AllocateIBUsManualCounts", "CycleCount/DailyActivity",
        "CycleCount/DailyUserActivity", "CycleCount/EventSummaryReport", "CycleCount/ItemExceptionReport", "CycleCount/ProcessCounts", "CycleCount/ReviewCounts",
        "CycleCount/SplitEvents", "CycleCount/UserParameters"];
    var scrnName = 0;
    routesList.map(function (screenId) {
        var componentName = CycleCountImports_1.CycleCountImports[scrnName];
        results.push({ path: screenId, component: componentName });
        scrnName++;
    });
    return results;
}
//# sourceMappingURL=AtPar_CycleCount_Routes.js.map