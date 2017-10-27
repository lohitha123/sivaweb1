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
var ProcessParamsComponent = (function () {
    function ProcessParamsComponent(dataservice) {
        var _this = this;
        this.dataservice = dataservice;
        this.pop = false;
        this.tab = true;
        this.table = false;
        this.page = true;
        this.form = false;
        this.editform = false;
        this.loading = true;
        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
        this.ven = new employee_1.Employee();
        this.alert = new employee_1.Employee();
        this.bill = new employee_1.Employee();
        this.dataservice.getpouProcess().then(function (countries) { _this.sales = countries; });
        this.dataservice.getpouProcessAlert().then(function (countries) { _this.alerts = countries; });
        this.dataservice.getpouProcessBill().then(function (countries) { _this.bills = countries; });
        //this.dataservice.getpouProcessAssginLocation().then(countries => { this.bills = countries; });
    }
    ProcessParamsComponent.prototype.go = function () {
        var _this = this;
        this.table = !this.table;
        //this.page = false;
        this.dataservice.getpouProcessAssginLocation().then(function (countries) { _this.sales = countries; });
    };
    ProcessParamsComponent.prototype.add = function () {
        this.form = true;
        this.editform = false;
        this.page = false;
        this.tab = false;
    };
    ProcessParamsComponent.prototype.edit = function () {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    };
    ProcessParamsComponent.prototype.close = function () {
        var _this = this;
        this.form = false;
        this.table = false;
        this.page = true;
        this.tab = true;
        this.dataservice.getpouProcess().then(function (countries) { _this.sales = countries; });
    };
    return ProcessParamsComponent;
}());
ProcessParamsComponent = __decorate([
    core_1.Component({
        templateUrl: './app/PointOfUse/pou-process-parameters.component.html',
        providers: [datatableservice_1.datatableservice],
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice])
], ProcessParamsComponent);
exports.ProcessParamsComponent = ProcessParamsComponent;
//# sourceMappingURL=pou-process-parameters.component.js.map