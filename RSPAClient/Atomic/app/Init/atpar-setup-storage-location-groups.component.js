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
var SetupStorageLocationGroups = (function () {
    function SetupStorageLocationGroups(dataservice) {
        this.dataservice = dataservice;
        this.pop = false;
        this.table = false;
        this.page = true;
        this.form = false;
        this.formdata = false;
        this.loading = true;
        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
        this.ven = new employee_1.Employee();
    }
    SetupStorageLocationGroups.prototype.go = function () {
        var _this = this;
        this.pop = !this.pop;
        this.dataservice.getSetupStorageLocationGroup().then(function (countries) { _this.sales = countries; });
    };
    SetupStorageLocationGroups.prototype.gotable = function () {
        var _this = this;
        this.table = !this.table;
        this.dataservice.getSetupStorageLocationGroupAssign().then(function (countries) { _this.sales = countries; });
    };
    SetupStorageLocationGroups.prototype.add = function () {
        this.form = true;
        this.page = false;
        this.pop = false;
    };
    SetupStorageLocationGroups.prototype.close = function () {
        this.form = false;
        this.page = true;
        this.formdata = false;
    };
    SetupStorageLocationGroups.prototype.adddata = function () {
        this.formdata = !this.formdata;
        this.form = false;
        this.page = false;
        this.pop = false;
    };
    SetupStorageLocationGroups.prototype.back = function () {
        this.table = false;
        this.form = false;
        this.page = true;
    };
    return SetupStorageLocationGroups;
}());
SetupStorageLocationGroups = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'atpar-setup-storage-location-groups.component.html',
        providers: [datatableservice_1.datatableservice],
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice])
], SetupStorageLocationGroups);
exports.SetupStorageLocationGroups = SetupStorageLocationGroups;
//# sourceMappingURL=atpar-setup-storage-location-groups.component.js.map