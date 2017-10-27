"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var body_component_1 = require("./body.component");
var atpar_profile_component_1 = require("../../AtPar/atpar-profile.component");
var atpar_downloads_component_1 = require("../../AtPar/atpar-downloads.component");
var atpar_bread_Crumb_component_1 = require("../../AtPar/atpar-bread-Crumb.component");
var Cartcount_bread_Crumb_component_1 = require("../../AtPar/Cartcount-bread-Crumb.component");
var cyclecount_bread_Crumb_component_1 = require("../../AtPar/cyclecount-bread-Crumb.component");
var receiving_bread_Crumb_component_1 = require("../../AtPar/receiving-bread-Crumb.component");
var pick_bread_Crumb_component_1 = require("../../AtPar/pick-bread-Crumb.component");
var deliver_bread_Crumb_component_1 = require("../../AtPar/deliver-bread-Crumb.component");
var putaway_bread_Crumb_component_1 = require("../../AtPar/putaway-bread-Crumb.component");
var trackIT_bread_Crumb_component_1 = require("../../AtPar/trackIT-bread-Crumb.component");
var stockissue_bread_Crumb_component_1 = require("../../AtPar/stockissue-bread-Crumb.component");
var assetmanagement_bread_Crumb_component_1 = require("../../AtPar/assetmanagement-bread-Crumb.component");
var bintobin_bread_Crumb_component_1 = require("../../AtPar/bintobin-bread-Crumb.component");
var pointofuse_bread_Crumb_component_1 = require("../../AtPar/pointofuse-bread-Crumb.component");
var atparx_bread_Crumb_component_1 = require("../../AtPar/atparx-bread-Crumb.component");
exports.BodyRoutes = [
    { path: '', component: body_component_1.BodyComponent },
    { path: 'myprofile', component: atpar_profile_component_1.AtparProfile },
    { path: 'downloads', component: atpar_downloads_component_1.AtparDownloads },
    { path: 'atparbreadcrumb', component: atpar_bread_Crumb_component_1.AtParBreadCrumbComponent },
    { path: 'cartcountbreadcrumb', component: Cartcount_bread_Crumb_component_1.CartCountBreadCrumbComponent },
    { path: 'cyclecountbreadcrumb', component: cyclecount_bread_Crumb_component_1.CycleCountBreadCrumbComponent },
    { path: 'receivingbreadcrumb', component: receiving_bread_Crumb_component_1.ReceivingBreadCrumbComponent },
    { path: 'pickbreadcrumb', component: pick_bread_Crumb_component_1.PickBreadCrumbComponent },
    { path: 'deliverbreadcrumb', component: deliver_bread_Crumb_component_1.DeliverBreadCrumbComponent },
    { path: 'putawaybreadcrumb', component: putaway_bread_Crumb_component_1.PutawayBreadCrumbComponent },
    { path: 'trackitbreadcrumb', component: trackIT_bread_Crumb_component_1.TrackITBreadCrumbComponent },
    { path: 'stockissuebreadcrumb', component: stockissue_bread_Crumb_component_1.StockIssueBreadCrumbComponent },
    { path: 'assetmanagementbreadcrumb', component: assetmanagement_bread_Crumb_component_1.AssetManagementBreadCrumbComponent },
    { path: 'bintobinbreadcrumb', component: bintobin_bread_Crumb_component_1.BinToBinBreadCrumbComponent },
    { path: 'pointofusebreadcrumb', component: pointofuse_bread_Crumb_component_1.PointOfUseBreadCrumbComponent },
    { path: 'atparxbreadcrumb', component: atparx_bread_Crumb_component_1.AtPaRXBreadCrumbComponent }
];
//# sourceMappingURL=body.routes.js.map