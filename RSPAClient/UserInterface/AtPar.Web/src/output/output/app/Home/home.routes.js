"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./home.component");
var atpar_page_not_found_component_1 = require("../AtPar/atpar-page-not-found.component");
var body_routes_1 = require("./Body/body.routes");
var atpar_init_routing_module_1 = require("../Init/atpar-init-routing.module");
var pointofuse_routing_module_1 = require("../PointOfUse/pointofuse-routing.module");
var router_2 = require("@angular/router");
var LowerCaseUrlSerializer = (function (_super) {
    __extends(LowerCaseUrlSerializer, _super);
    function LowerCaseUrlSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LowerCaseUrlSerializer.prototype.parse = function (url) {
        return _super.prototype.parse.call(this, url.toLowerCase());
    };
    return LowerCaseUrlSerializer;
}(router_2.DefaultUrlSerializer));
exports.LowerCaseUrlSerializer = LowerCaseUrlSerializer;
exports.routes = [
    {
        path: '', component: home_component_1.HomeComponent,
        children: body_routes_1.BodyRoutes.concat(atpar_init_routing_module_1.AtParRoutes, pointofuse_routing_module_1.POURoutes, [
            { path: 'bintobin', loadChildren: '../BinToBin/bintobin.module#BinToBinModule' },
            { path: 'cartcount', loadChildren: '../CartCount/cartcount.module#CartCountModule' },
            { path: 'cyclecount', loadChildren: '../CycleCount/cyclecount.module#CycleCountModule' },
            { path: 'deliver', loadChildren: '../Deliver/deliver.module#DeliverModule' },
            { path: 'pick', loadChildren: '../Pick/pick.module#PickModule' },
            { path: 'putaway', loadChildren: '../PutAway/putaway.module#PutawayModule' },
            { path: 'receiving', loadChildren: '../Receiving/recv.module#ReceivingModule' },
            { path: 'stockissue', loadChildren: '../StockIssue/stockissue.module#StockIssueModule' },
            { path: 'trackit', loadChildren: '../TrackIT/trackit.module#TrackITModule' },
            { path: 'assetmanagement', loadChildren: '../AssetManagement/asmt.module#AssetManagementModule' },
            { path: 'atparx', loadChildren: '../AtParX/atparx.module#AtParXModule' },
            { path: 'reports', loadChildren: '../reports/reports.module#ReportsModule' },
            { path: 'sameurl', component: atpar_page_not_found_component_1.SameUrlComponent }
        ])
    }
];
var HomeRoutingModule = (function () {
    function HomeRoutingModule() {
    }
    HomeRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.routes)],
            exports: [router_1.RouterModule],
            providers: [
                {
                    provide: router_1.UrlSerializer,
                    useClass: LowerCaseUrlSerializer
                }
            ],
        })
    ], HomeRoutingModule);
    return HomeRoutingModule;
}());
exports.HomeRoutingModule = HomeRoutingModule;
//# sourceMappingURL=home.routes.js.map