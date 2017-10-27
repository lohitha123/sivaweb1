"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var deliver_track_report_component_1 = require("./deliver-track-report.component");
exports.routes = [
    { path: '', component: deliver_track_report_component_1.DeliveryTrackingComponent, data: { title: 'deliverytracking' } }
    //{ path: '/:psystemid', component: DeliveryTrackingComponent }
];
var DeliveryTrackingRoutingModule = (function () {
    function DeliveryTrackingRoutingModule() {
    }
    DeliveryTrackingRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.routes)],
            exports: [router_1.RouterModule]
        })
    ], DeliveryTrackingRoutingModule);
    return DeliveryTrackingRoutingModule;
}());
exports.DeliveryTrackingRoutingModule = DeliveryTrackingRoutingModule;
//# sourceMappingURL=deliver-track-report.routes.js.map