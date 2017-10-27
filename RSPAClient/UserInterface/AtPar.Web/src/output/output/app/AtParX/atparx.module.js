"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("./index");
var atparx_routing_module_1 = require("./atparx-routing.module");
var shared_module_1 = require("../Shared/shared.module");
var AtParXModule = (function () {
    function AtParXModule() {
    }
    AtParXModule = __decorate([
        core_1.NgModule({
            imports: [
                atparx_routing_module_1.AtParXRoutingModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                index_1.AtParXComponent,
                index_1.CreateOrdersComponent,
                index_1.DepartmentDeviceAllocationComponent,
                index_1.DepartmentLocationAllocationComponent,
                index_1.DepartmentUserAllocationComponent,
                index_1.SetupDepartmentsComponent,
                index_1.SetupDropOffLocationComponent,
                index_1.SetupParLocationsComponent,
                index_1.SetupReasonsComponent,
                index_1.UserParametersComponent,
                index_1.ProcessesComponent,
                index_1.ManageParLocationComponent,
                index_1.DepartmentUserAllocationHomeComponent,
                index_1.DepartmentUserAllocationAssignComponent
            ]
        })
    ], AtParXModule);
    return AtParXModule;
}());
exports.AtParXModule = AtParXModule;
//# sourceMappingURL=atparx.module.js.map