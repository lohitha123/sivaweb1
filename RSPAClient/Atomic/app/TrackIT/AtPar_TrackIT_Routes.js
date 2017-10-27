"use strict";
var router_1 = require("@angular/router");
var TrackITImports_1 = require("./TrackITImports");
var routes = GetScreens();
exports.AtPar_TrackIT_Routes = router_1.RouterModule.forRoot(routes);
function GetScreens() {
    var results = Array();
    var routesList = ["TrackIT/AllocateLocationGroups", "TrackIT/ChargeReport", "TrackIT/CheckInItems",
        "TrackIT/DailyActivity", "TrackIT/DailyUserActivity", "TrackIT/DeliveryReport", "TrackIT/DestructionReport",
        "TrackIT/EquipmentTrackingReport", "TrackIT/InactivateItems", "TrackIT/ItemMasterReport", "TrackIT/ManageDepartments",
        "TrackIT/ManageEquipmentItems", "TrackIT/ManageEquipmentType", "TrackIT/ManageRequestor", "TrackIT/NewItemAuditReport",
        "TrackIT/SetupReasonCodes", "TrackIT/TransactionReport", "TrackIT/CheckOutItems", "TrackIT/createrequest", "TrackIT/viewcart", "TrackIT/requestorstatus", "TrackIT/userprofile", "TrackIT/help", "TrackIT/Dashboard"
    ];
    var scrnName = 0;
    routesList.map(function (screenId) {
        var componentName = TrackITImports_1.TrackITImports[scrnName];
        results.push({ path: screenId, component: componentName });
        scrnName++;
    });
    return results;
}
//# sourceMappingURL=AtPar_TrackIT_Routes.js.map