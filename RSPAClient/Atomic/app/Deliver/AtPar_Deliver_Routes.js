"use strict";
var router_1 = require("@angular/router");
var DeliverImports_1 = require("./DeliverImports");
var routes = GetScreens();
exports.AtPar_Deliver_Routes = router_1.RouterModule.forRoot(routes);
function GetScreens() {
    var results = Array();
    var routesList = ["Deliver/AllocateBusinessUnits", "Deliver/AllocateLocationGroups", "Deliver/AssignSignatories", "Deliver/CarrierInformation",
        "Deliver/DailyActivity", "Deliver/DailyUserActivity", "Deliver/DeliveryReport", "Deliver/ExcludeLocations", "Deliver/ProductivityReport", "Deliver/ReleasePackages",
        "Deliver/SetupDropOffLocations", "Deliver/ShipToIDAllocationForDeliveryOfStockItems", "Deliver/UserParameters"
    ];
    var scrnName = 0;
    routesList.map(function (screenId) {
        var componentName = DeliverImports_1.DeliverImports[scrnName];
        results.push({ path: screenId, component: componentName });
        scrnName++;
    });
    return results;
}
//# sourceMappingURL=AtPar_Deliver_Routes.js.map