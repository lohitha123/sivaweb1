"use strict";
var router_1 = require("@angular/router");
var StockIssueImports_1 = require("./StockIssueImports");
var routes = GetScreens();
exports.AtPar_StockIssue_Routes = router_1.RouterModule.forRoot(routes);
function GetScreens() {
    var results = Array();
    var routesList = ["StockIssue/AllocateDestinationLocations", "StockIssue/AllocateDistributionTypes",
        "StockIssue/AllocateInventoryBusinessUnits", "StockIssue/DailyActivity", "StockIssue/DailyUserActivity", "StockIssue/IssueReport",
        "StockIssue/UserParameters"
    ];
    var scrnName = 0;
    routesList.map(function (screenId) {
        var componentName = StockIssueImports_1.StockIssueImports[scrnName];
        results.push({ path: screenId, component: componentName });
        scrnName++;
    });
    return results;
}
//# sourceMappingURL=AtPar_StockIssue_Routes.js.map