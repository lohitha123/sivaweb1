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
var index_1 = require("./index");
exports.routes = [
    {
        path: '',
        component: index_1.AtParXComponent,
        children: [
            { path: 'createorders', component: index_1.CreateOrdersComponent },
            { path: 'departmentdeviceallocation', component: index_1.DepartmentDeviceAllocationComponent },
            { path: 'departmentlocationallocation', component: index_1.DepartmentLocationAllocationComponent },
            {
                path: 'departmentuserallocation', component: index_1.DepartmentUserAllocationComponent,
                children: [
                    { path: '', component: index_1.DepartmentUserAllocationHomeComponent },
                    { path: 'assign', component: index_1.DepartmentUserAllocationAssignComponent }
                ]
            },
            { path: 'setupdepartments', component: index_1.SetupDepartmentsComponent },
            { path: 'manageparlocation', component: index_1.ManageParLocationComponent },
            { path: 'processes', component: index_1.ProcessesComponent },
            { path: 'setupparlocations', component: index_1.SetupParLocationsComponent },
            { path: 'setupdropofflocations', component: index_1.SetupDropOffLocationComponent },
            { path: 'setupreasons', component: index_1.SetupReasonsComponent },
            { path: 'userparameters', component: index_1.UserParametersComponent },
        ]
    }
];
var AtParXRoutingModule = (function () {
    function AtParXRoutingModule() {
    }
    AtParXRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.routes)],
            exports: [router_1.RouterModule]
        })
    ], AtParXRoutingModule);
    return AtParXRoutingModule;
}());
exports.AtParXRoutingModule = AtParXRoutingModule;
//# sourceMappingURL=atparx-routing.module.js.map