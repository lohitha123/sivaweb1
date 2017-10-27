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
/// <reference path="../atpar/atpar-page-not-found.component.ts" />
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var trackit_dashboard_component_1 = require("./trackit.dashboard.component");
var trackit_body_routes_1 = require("./Body/trackit.body.routes");
var atpar_page_not_found_component_1 = require("../AtPar/atpar-page-not-found.component");
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
        path: '', component: trackit_dashboard_component_1.TrackITDashboardComponent,
        children: trackit_body_routes_1.BodyRoutes.concat([
            { path: 'sameurl', component: atpar_page_not_found_component_1.SameUrlComponent }
        ])
    }
];
var TrackITDashboardRoutingModule = (function () {
    function TrackITDashboardRoutingModule() {
    }
    TrackITDashboardRoutingModule = __decorate([
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
    ], TrackITDashboardRoutingModule);
    return TrackITDashboardRoutingModule;
}());
exports.TrackITDashboardRoutingModule = TrackITDashboardRoutingModule;
//# sourceMappingURL=trackit.dashboard.routing.module.js.map