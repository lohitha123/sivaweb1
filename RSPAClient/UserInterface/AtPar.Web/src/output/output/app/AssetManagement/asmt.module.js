"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var asmt_component_1 = require("./asmt.component");
var asmt_access_permission_component_1 = require("./asmt-access-permission.component");
var asmt_location_groups_allocation_component_1 = require("./asmt-location-groups-allocation.component");
var asmt_routing_module_1 = require("./asmt-routing.module");
var shared_module_1 = require("../Shared/shared.module");
var AssetManagementModule = (function () {
    function AssetManagementModule() {
    }
    AssetManagementModule = __decorate([
        core_1.NgModule({
            imports: [
                asmt_routing_module_1.AssetManagementRoutingModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                asmt_component_1.AssetManagementComponent,
                asmt_access_permission_component_1.AccessPermissionComponent,
                asmt_location_groups_allocation_component_1.LocationGroupsAllocationComponent
            ]
        })
    ], AssetManagementModule);
    return AssetManagementModule;
}());
exports.AssetManagementModule = AssetManagementModule;
//# sourceMappingURL=asmt.module.js.map