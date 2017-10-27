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
var deliver_track_report_component_1 = require("./deliver-track-report.component");
var deliver_track_report_routes_1 = require("./deliver-track-report.routes");
var shared_module_1 = require("../Shared/shared.module");
var DeliveryTrackingModule = (function () {
    function DeliveryTrackingModule() {
    }
    DeliveryTrackingModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                deliver_track_report_routes_1.DeliveryTrackingRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                deliver_track_report_component_1.DeliveryTrackingComponent,
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
        })
    ], DeliveryTrackingModule);
    return DeliveryTrackingModule;
}());
exports.DeliveryTrackingModule = DeliveryTrackingModule;
//# sourceMappingURL=deliver-track-report.module.js.map