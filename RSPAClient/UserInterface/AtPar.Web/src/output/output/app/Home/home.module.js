"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var body_module_1 = require("./Body/body.module");
var home_component_1 = require("./home.component");
var topbar_component_1 = require("./Top/topbar.component");
var shared_module_1 = require("../Shared/shared.module");
var home_routes_1 = require("./home.routes");
var leftbar_component_1 = require("./Left/leftbar.component");
var atpar_page_not_found_component_1 = require("../AtPar/atpar-page-not-found.component");
var atpar_bread_Crumb_component_1 = require("../AtPar/atpar-bread-Crumb.component");
var Cartcount_bread_Crumb_component_1 = require("../AtPar/Cartcount-bread-Crumb.component");
var cyclecount_bread_Crumb_component_1 = require("../AtPar/cyclecount-bread-Crumb.component");
var receiving_bread_Crumb_component_1 = require("../AtPar/receiving-bread-Crumb.component");
var pick_bread_Crumb_component_1 = require("../AtPar/pick-bread-Crumb.component");
var deliver_bread_Crumb_component_1 = require("../AtPar/deliver-bread-Crumb.component");
var putaway_bread_Crumb_component_1 = require("../AtPar/putaway-bread-Crumb.component");
var trackIT_bread_Crumb_component_1 = require("../AtPar/trackIT-bread-Crumb.component");
var stockissue_bread_Crumb_component_1 = require("../AtPar/stockissue-bread-Crumb.component");
var assetmanagement_bread_Crumb_component_1 = require("../AtPar/assetmanagement-bread-Crumb.component");
var bintobin_bread_Crumb_component_1 = require("../AtPar/bintobin-bread-Crumb.component");
var pointofuse_bread_Crumb_component_1 = require("../AtPar/pointofuse-bread-Crumb.component");
var atparx_bread_Crumb_component_1 = require("../AtPar/atparx-bread-Crumb.component");
var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                body_module_1.BodyModule,
                home_routes_1.HomeRoutingModule,
                shared_module_1.SharedModule,
            ],
            declarations: [
                home_component_1.HomeComponent,
                topbar_component_1.TopBarComponent,
                leftbar_component_1.LeftBarComponent,
                atpar_page_not_found_component_1.SameUrlComponent,
                atpar_bread_Crumb_component_1.AtParBreadCrumbComponent,
                Cartcount_bread_Crumb_component_1.CartCountBreadCrumbComponent,
                cyclecount_bread_Crumb_component_1.CycleCountBreadCrumbComponent,
                receiving_bread_Crumb_component_1.ReceivingBreadCrumbComponent,
                pick_bread_Crumb_component_1.PickBreadCrumbComponent,
                deliver_bread_Crumb_component_1.DeliverBreadCrumbComponent,
                putaway_bread_Crumb_component_1.PutawayBreadCrumbComponent,
                trackIT_bread_Crumb_component_1.TrackITBreadCrumbComponent,
                stockissue_bread_Crumb_component_1.StockIssueBreadCrumbComponent,
                assetmanagement_bread_Crumb_component_1.AssetManagementBreadCrumbComponent,
                bintobin_bread_Crumb_component_1.BinToBinBreadCrumbComponent,
                pointofuse_bread_Crumb_component_1.PointOfUseBreadCrumbComponent,
                atparx_bread_Crumb_component_1.AtPaRXBreadCrumbComponent
            ],
            exports: [
                home_component_1.HomeComponent,
                topbar_component_1.TopBarComponent,
            ],
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map