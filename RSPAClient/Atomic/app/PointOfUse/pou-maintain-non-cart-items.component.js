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
var MaintainNonCartItemsComponent = (function () {
    function MaintainNonCartItemsComponent(dataservice) {
        var _this = this;
        this.dataservice = dataservice;
        this.pop = false;
        this.table = false;
        this.page = true;
        this.form = false;
        this.editform = false;
        this.loading = true;
        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
        this.ven = new employee_1.Employee();
        this.dataservice.getpouMaintnNonCrt1().then(function (countries) { _this.sales = countries; });
    }
    MaintainNonCartItemsComponent.prototype.go = function () {
        var _this = this;
        this.pop = !this.pop;
        this.page = false;
        this.dataservice.getpouMaintnNonCrt2().then(function (countries) { _this.sales = countries; });
    };
    MaintainNonCartItemsComponent.prototype.add = function () {
        this.page = false;
        this.pop = false;
        this.form = true;
        //this.dataservice.getpouManageparLoc2().then(countries => { this.sales = countries; });
    };
    MaintainNonCartItemsComponent.prototype.closef = function () {
        this.pop = true;
        this.form = false;
    };
    MaintainNonCartItemsComponent.prototype.edit = function () {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    };
    MaintainNonCartItemsComponent.prototype.closee = function () {
        this.editform = false;
        this.pop = true;
    };
    MaintainNonCartItemsComponent.prototype.close = function () {
        var _this = this;
        this.page = true;
        this.pop = false;
        this.editform = false;
        this.form = false;
        this.dataservice.getpouMaintnNonCrt1().then(function (countries) { _this.sales = countries; });
    };
    return MaintainNonCartItemsComponent;
}());
MaintainNonCartItemsComponent = __decorate([
    core_1.Component({
        templateUrl: './app/PointOfUse/pou-maintain-non-cart-items.component.html',
        providers: [datatableservice_1.datatableservice],
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice])
], MaintainNonCartItemsComponent);
exports.MaintainNonCartItemsComponent = MaintainNonCartItemsComponent;
//# sourceMappingURL=pou-maintain-non-cart-items.component.js.map