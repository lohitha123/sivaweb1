"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var bintobin_component_1 = require("./bintobin.component");
var btbn_allocate_inventory_business_units_component_1 = require("./btbn-allocate-inventory-business-units.component");
var btbn_user_parameters_component_1 = require("./btbn-user-parameters.component");
var bintobin_routing_module_1 = require("./bintobin-routing.module");
var shared_module_1 = require("../Shared/shared.module");
var BinToBinModule = (function () {
    function BinToBinModule() {
    }
    BinToBinModule = __decorate([
        core_1.NgModule({
            imports: [
                bintobin_routing_module_1.BinToBinRoutingModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                bintobin_component_1.BinToBinComponent,
                btbn_allocate_inventory_business_units_component_1.BinAllocateInventoryBusinessUnitsComponent,
                btbn_user_parameters_component_1.UserParametersComponent
            ]
        })
    ], BinToBinModule);
    return BinToBinModule;
}());
exports.BinToBinModule = BinToBinModule;
//# sourceMappingURL=bintobin.module.js.map