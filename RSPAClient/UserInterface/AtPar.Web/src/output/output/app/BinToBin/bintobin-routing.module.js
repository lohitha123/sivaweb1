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
var bintobin_component_1 = require("./bintobin.component");
var btbn_allocate_inventory_business_units_component_1 = require("./btbn-allocate-inventory-business-units.component");
var btbn_user_parameters_component_1 = require("./btbn-user-parameters.component");
exports.routes = [
    {
        path: '',
        component: bintobin_component_1.BinToBinComponent,
        children: [
            { path: 'allocateinventorybusinessunits', component: btbn_allocate_inventory_business_units_component_1.BinAllocateInventoryBusinessUnitsComponent },
            { path: 'userparameters', component: btbn_user_parameters_component_1.UserParametersComponent },
        ]
    }
];
var BinToBinRoutingModule = (function () {
    function BinToBinRoutingModule() {
    }
    BinToBinRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.routes)],
            exports: [router_1.RouterModule]
        })
    ], BinToBinRoutingModule);
    return BinToBinRoutingModule;
}());
exports.BinToBinRoutingModule = BinToBinRoutingModule;
//# sourceMappingURL=bintobin-routing.module.js.map