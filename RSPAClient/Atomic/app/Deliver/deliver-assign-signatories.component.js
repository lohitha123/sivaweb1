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
var AssignSignatoriesComponent = (function () {
    function AssignSignatoriesComponent(dataservice) {
        this.dataservice = dataservice;
        this.pop = false;
        this.table = false;
        this.form = false;
        this.form2 = false;
        this.filter = true;
        this.loading = true;
        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
        this.ven = new employee_1.Employee();
    }
    AssignSignatoriesComponent.prototype.go = function () {
        var _this = this;
        this.pop = !this.pop;
        this.form = false;
        this.dataservice.getdelAssignsigno().then(function (countries) { _this.sales = countries; });
    };
    AssignSignatoriesComponent.prototype.up = function () {
        this.form = true;
    };
    AssignSignatoriesComponent.prototype.save = function () {
        this.form = false;
    };
    AssignSignatoriesComponent.prototype.add = function () {
        var _this = this;
        this.form2 = false;
        this.form = false;
        this.table = true;
        this.pop = false;
        this.filter = false;
        this.dataservice.getdelAssignsigno2().then(function (countries) { _this.sales = countries; });
    };
    AssignSignatoriesComponent.prototype.edit = function () {
        this.form2 = true;
        this.form = false;
        this.table = false;
        this.pop = false;
    };
    AssignSignatoriesComponent.prototype.back = function () {
        this.form2 = false;
        this.table = false;
        this.pop = false;
        this.filter = true;
    };
    AssignSignatoriesComponent.prototype.close = function () {
        this.form2 = false;
        this.table = true;
    };
    return AssignSignatoriesComponent;
}());
AssignSignatoriesComponent = __decorate([
    core_1.Component({
        templateUrl: './app/Deliver/deliver-assign-signatories.component.html',
        providers: [datatableservice_1.datatableservice],
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice])
], AssignSignatoriesComponent);
exports.AssignSignatoriesComponent = AssignSignatoriesComponent;
//# sourceMappingURL=deliver-assign-signatories.component.js.map