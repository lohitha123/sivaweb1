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
var SetupReasonCodesComponent = (function () {
    function SetupReasonCodesComponent(dataservice) {
        var _this = this;
        this.dataservice = dataservice;
        this.pop = false;
        this.table = false;
        this.page = true;
        this.form = false;
        this.editform = false;
        this.loading = true;
        this.minDateValue1 = new Date();
        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
        this.ven = new employee_1.Employee();
        this.dataservice.gettkitSetupres().then(function (countries) { _this.sales = countries; });
    }
    SetupReasonCodesComponent.prototype.go = function () {
        this.pop = !this.pop;
        // this.dataservice.getpouCriticalItems().then(countries => { this.sales = countries; });
    };
    SetupReasonCodesComponent.prototype.add = function () {
        this.form = true;
        this.editform = false;
        this.page = false;
        this.pop = false;
    };
    SetupReasonCodesComponent.prototype.tbl = function () {
        this.form = false;
        this.editform = false;
        this.page = false;
        this.pop = false;
        this.table = true;
        // this.dataservice.getpouManagecase2().then(countries => { this.sales = countries; });
    };
    SetupReasonCodesComponent.prototype.edit = function () {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    };
    SetupReasonCodesComponent.prototype.save = function () {
        this.editform = false;
    };
    SetupReasonCodesComponent.prototype.close = function () {
        this.form = false;
        this.page = true;
        this.pop = true;
        this.editform = false;
        this.table = false;
        // this.dataservice.getpouManagecase1().then(countries => { this.sales = countries; });
    };
    return SetupReasonCodesComponent;
}());
SetupReasonCodesComponent = __decorate([
    core_1.Component({
        templateUrl: './app/TrackIT/tkit-setup-reason-codes.component.html',
        providers: [datatableservice_1.datatableservice],
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice])
], SetupReasonCodesComponent);
exports.SetupReasonCodesComponent = SetupReasonCodesComponent;
//# sourceMappingURL=tkit-setup-reason-codes.component.js.map