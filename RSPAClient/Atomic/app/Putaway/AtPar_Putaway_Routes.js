"use strict";
var router_1 = require("@angular/router");
var PutawayImports_1 = require("./PutawayImports");
var routes = GetScreens();
exports.AtPar_Putaway_Routes = router_1.RouterModule.forRoot(routes);
function GetScreens() {
    var results = Array();
    var routesList = ["Putaway/ActivityReport", "Putaway/AllocateBusinessUnits", "Putaway/DailyActivity", "Putaway/DailyUserActivity",
        "Putaway/DeviationReport", "Putaway/ReleaseOrders", "Putaway/UserParameters"];
    var scrnName = 0;
    routesList.map(function (screenId) {
        var componentName = PutawayImports_1.PutawayImports[scrnName];
        results.push({ path: screenId, component: componentName });
        scrnName++;
    });
    return results;
}
//# sourceMappingURL=AtPar_Putaway_Routes.js.map