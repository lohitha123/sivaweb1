"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var datatableservice_1 = require("./../components/datatable/datatableservice");
var employee_1 = require("../components/datatable/employee");
var SetupInventoryComponent = (function () {
    function SetupInventoryComponent(dataservice) {
        this.dataservice = dataservice;
        this.table1 = false;
        this.additem = false;
        this.container = true;
        this.mhsiitem = false;
        this.goitem = false;
        this.ven = new employee_1.Employee();
    }
    SetupInventoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataservice.getsetupInventory().then(function (countries) { _this.sales = countries; });
    };
    SetupInventoryComponent.prototype.go = function () {
        this.table1 = !this.table1;
    };
    SetupInventoryComponent.prototype.add = function () {
        this.additem = !this.additem;
        this.container = false;
    };
    SetupInventoryComponent.prototype.close = function () {
        this.additem = false;
        this.table1 = false;
        this.container = true;
    };
    SetupInventoryComponent.prototype.mhsi = function () {
        this.mhsiitem = !this.mhsiitem;
    };
    SetupInventoryComponent.prototype.gobtn = function () {
        this.goitem = !this.goitem;
    };
    return SetupInventoryComponent;
}());
SetupInventoryComponent = __decorate([
    core_1.Component({
        templateUrl: './app/Init/atpar-setup-inventory.component.html',
        providers: [datatableservice_1.datatableservice],
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice])
], SetupInventoryComponent);
exports.SetupInventoryComponent = SetupInventoryComponent;
//# sourceMappingURL=atpar-setup-inventory.component.js.map