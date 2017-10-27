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
var PAR_MNGT_VENDOR_1 = require("../../app/Entities/PAR_MNGT_VENDOR");
var CriticalItemsComponent = (function () {
    function CriticalItemsComponent(dataservice) {
        var _this = this;
        this.dataservice = dataservice;
        this.table = false;
        this.form = false;
        this.loading = true;
        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
        this.ven = new employee_1.Employee();
        this.dataservice.getcriticalItem().then(function (countries) { _this.sales = countries; });
    }
    CriticalItemsComponent.prototype.import = function () {
        this.table = false;
        this.form = true;
    };
    CriticalItemsComponent.prototype.close = function () {
        this.table = true;
        this.form = false;
    };
    CriticalItemsComponent.prototype.go = function () {
        this.table = !this.table;
    };
    return CriticalItemsComponent;
}());
CriticalItemsComponent = __decorate([
    core_1.Component({
        templateUrl: './app/CartCount/cart-critical-items.component.html',
        providers: [datatableservice_1.datatableservice]
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice])
], CriticalItemsComponent);
exports.CriticalItemsComponent = CriticalItemsComponent;
//# sourceMappingURL=cart-critical-items.component.js.map