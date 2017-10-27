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
var SetupItemsComponent = (function () {
    function SetupItemsComponent(dataservice) {
        this.dataservice = dataservice;
        this.table1 = false;
        this.additem = false;
        this.container = true;
        this.pharma = false;
        this.addplus = false;
        this.lookupitem = false;
        this.addsubitem = false;
        this.ven = new employee_1.Employee();
    }
    SetupItemsComponent.prototype.go = function () {
        var _this = this;
        this.table1 = !this.table1;
        this.dataservice.getsetupItem().then(function (countries) { _this.sales = countries; });
    };
    SetupItemsComponent.prototype.add = function () {
        this.additem = !this.additem;
        this.container = false;
    };
    SetupItemsComponent.prototype.close = function () {
        this.additem = false;
        this.table1 = false;
        this.container = true;
        this.pharma = false;
        this.addplus = false;
        this.lookupitem = false;
    };
    SetupItemsComponent.prototype.pharmacy = function () {
        this.pharma = !this.pharma;
    };
    SetupItemsComponent.prototype.plus = function () {
        var _this = this;
        this.addplus = !this.addplus;
        this.addsubitem = true;
        this.container = false;
        this.dataservice.getsubstituteItem().then(function (countries) { _this.sales = countries; });
    };
    SetupItemsComponent.prototype.lookup = function () {
        var _this = this;
        this.lookupitem = !this.lookupitem;
        this.addsubitem = false;
        this.dataservice.getlookupItem().then(function (countries) { _this.sale = countries; });
    };
    SetupItemsComponent.prototype.lookupform = function () {
        this.lookupitem = false;
        this.addsubitem = true;
    };
    SetupItemsComponent.prototype.addsub = function () {
    };
    return SetupItemsComponent;
}());
SetupItemsComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app/Init/atpar-setup-items.component.html',
        providers: [datatableservice_1.datatableservice],
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice])
], SetupItemsComponent);
exports.SetupItemsComponent = SetupItemsComponent;
//# sourceMappingURL=atpar-setup-items.component.js.map