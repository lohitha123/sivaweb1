"use strict";
var router_1 = require("@angular/router");
var PickImports_1 = require("./PickImports");
var routes = GetScreens();
exports.AtPar_Pick_Routes = router_1.RouterModule.forRoot(routes);
function GetScreens() {
    var results = Array();
    var routesList = ["Pick/ActivityReport", "Pick/AllocateInventoryBusinessUnits", "Pick/AllocateLocationGroups", "Pick/AllocatePickingZones",
        "Pick/AllocatePriority", "Pick/DailyActivity", "Pick/DailyUserActivity", "Pick/DeviationReport",
        "Pick/OrderPrefix", "Pick/PickStatusReport", "Pick/ReleaseOrders", "Pick/UserParameters",
    ];
    var scrnName = 0;
    routesList.map(function (screenId) {
        var componentName = PickImports_1.PickImports[scrnName];
        results.push({ path: screenId, component: componentName });
        scrnName++;
    });
    return results;
}
//# sourceMappingURL=AtPar_Pick_Routes.js.map