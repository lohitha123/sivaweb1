"use strict";
var router_1 = require("@angular/router");
var ReceivingImports_1 = require("./ReceivingImports");
var routes = GetScreens();
exports.AtPar_Receiving_Routes = router_1.RouterModule.forRoot(routes);
function GetScreens() {
    var results = Array();
    var routesList = ["Receiving/ActivityReport", "Receiving/AllocateInventoryBusinessUnits", "Receiving/AllocateShipToIDs",
        "Receiving/ASNDiscrepancyReport", "Receiving/CarrierInformation", "Receiving/CarrierReport", "Receiving/DailyActivity", "Receiving/DailyUserActivity",
        "Receiving/DeviationReport", "Receiving/Lot/SerialTrackingReport", "Receiving/ManageCarriers", "Receiving/ParcelCountReport", "Receiving/PO/NONPOReceipts",
        "Receiving/ReleaseOrders", "Receiving/SetupShiptoIDs", "Receiving/UserParameters"];
    var scrnName = 0;
    routesList.map(function (screenId) {
        var componentName = ReceivingImports_1.ReceivingImports[scrnName];
        results.push({ path: screenId, component: componentName });
        scrnName++;
    });
    return results;
}
//# sourceMappingURL=AtPar_Receiving_Routes.js.map