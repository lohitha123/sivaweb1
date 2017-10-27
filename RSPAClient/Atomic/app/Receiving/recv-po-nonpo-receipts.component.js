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
/// <reference path="../entities/vm_mt_atpar_user_params.ts" />
var core_1 = require("@angular/core");
var datatableservice_1 = require("./../components/datatable/datatableservice");
var employee_1 = require("../components/datatable/employee");
var PAR_MNGT_VENDOR_1 = require("../../app/Entities/PAR_MNGT_VENDOR");
//import { VM_MT_ATPAR_USER_ADD } from '../../app/Entities/vm_mt_atpar_user_add';
var PoNonPoReceiptsComponent = (function () {
    function PoNonPoReceiptsComponent(dataservice) {
        this.dataservice = dataservice;
        this.pop = false;
        this.page = true;
        this.purchase = false;
        this.printtbl = false;
        this.tbl = false;
        this.plus = true;
        this.bysch = false;
        this.rec = false;
        this.editform = false;
        this.lotserial = false;
        this.loading = true;
        this.minDateValue1 = new Date();
        //addUserData = new VM_MT_ATPAR_USER_ADD();
        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
        this.ven = new employee_1.Employee();
        //this.addUserData.City = [];
    }
    PoNonPoReceiptsComponent.prototype.go = function () {
        var _this = this;
        this.pop = !this.pop;
        this.dataservice.getinitUserstatusreport().then(function (countries) { _this.sales = countries; });
    };
    PoNonPoReceiptsComponent.prototype.get = function () {
        var _this = this;
        this.tbl = !this.tbl;
        this.rec = false;
        this.page = true;
        this.purchase = false;
        this.dataservice.getinitUserstatusreport().then(function (countries) { _this.sales = countries; });
    };
    PoNonPoReceiptsComponent.prototype.show = function () {
        this.plus = !this.plus;
    };
    PoNonPoReceiptsComponent.prototype.byschedule = function () {
        var _this = this;
        this.bysch = !this.bysch;
        this.tbl = false;
        this.page = false;
        this.dataservice.getrecPononpoRecbySchdule().then(function (countries) { _this.sales = countries; });
    };
    PoNonPoReceiptsComponent.prototype.goPage = function () {
        this.tbl = true;
        this.page = true;
        this.bysch = false;
        this.purchase = false;
    };
    PoNonPoReceiptsComponent.prototype.po = function () {
        var _this = this;
        this.rec = !this.rec;
        this.tbl = false;
        this.page = false;
        this.dataservice.getrecPononpoRectps().then(function (countries) { _this.sales = countries; });
    };
    PoNonPoReceiptsComponent.prototype.poBack = function () {
        this.tbl = false;
        this.page = true;
        this.rec = false;
    };
    PoNonPoReceiptsComponent.prototype.lot = function () {
        var _this = this;
        this.bysch = false;
        this.lotserial = !this.lotserial;
        this.dataservice.getrecPononpoLotSerial().then(function (countries) { _this.sales = countries; });
    };
    PoNonPoReceiptsComponent.prototype.lotback = function () {
        var _this = this;
        this.bysch = true;
        this.lotserial = false;
        this.editform = false;
        this.dataservice.getrecPononpoRecbySchdule().then(function (countries) { _this.sales = countries; });
    };
    PoNonPoReceiptsComponent.prototype.print = function () {
        var _this = this;
        this.printtbl = true;
        this.bysch = false;
        this.dataservice.getrecPononpoPrinter().then(function (countries) { _this.sales = countries; });
    };
    PoNonPoReceiptsComponent.prototype.printback = function () {
        var _this = this;
        this.printtbl = false;
        this.bysch = true;
        this.dataservice.getrecPononpoRecbySchdule().then(function (countries) { _this.sales = countries; });
    };
    PoNonPoReceiptsComponent.prototype.get2 = function () {
        var _this = this;
        this.purchase = !this.purchase;
        this.tbl = false;
        this.page = false;
        this.rec = false;
        this.dataservice.getrecPononpoMulti().then(function (countries) { _this.sales = countries; });
    };
    PoNonPoReceiptsComponent.prototype.getBack = function () {
        this.purchase = false;
        this.tbl = false;
        this.page = true;
        this.rec = false;
    };
    PoNonPoReceiptsComponent.prototype.add = function () {
        this.editform = !this.editform;
    };
    PoNonPoReceiptsComponent.prototype.save = function () {
        this.editform = false;
    };
    PoNonPoReceiptsComponent.prototype.close = function () {
        //this.form = false;
        this.page = true;
        this.pop = true;
        //this.editform = false;
    };
    PoNonPoReceiptsComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    PoNonPoReceiptsComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    return PoNonPoReceiptsComponent;
}());
PoNonPoReceiptsComponent = __decorate([
    core_1.Component({
        templateUrl: './app/Receiving/recv-po-nonpo-receipts.component.html',
        providers: [datatableservice_1.datatableservice]
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice])
], PoNonPoReceiptsComponent);
exports.PoNonPoReceiptsComponent = PoNonPoReceiptsComponent;
//# sourceMappingURL=recv-po-nonpo-receipts.component.js.map