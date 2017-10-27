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
var ProcessScheduler = (function () {
    function ProcessScheduler(dataservice) {
        this.dataservice = dataservice;
        this.pop = false;
        this.pop2 = false;
        this.editpage = false;
        this.page = true;
        this.loading = true;
        this.day1 = false;
        this.inter1 = false;
        this.tr = false;
        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
        this.ven = new employee_1.Employee();
    } //getmanageUser
    ProcessScheduler.prototype.go = function () {
        this.pop = true;
        this.pop2 = false;
        //this.dataservice.getmanageUser().then(countries => { this.sales = countries; });
    };
    ProcessScheduler.prototype.edit = function () {
        this.editpage = !this.editpage;
        this.page = false;
    };
    ProcessScheduler.prototype.back = function () {
        this.page = true;
        this.editpage = false;
    };
    ProcessScheduler.prototype.Days = function () {
        this.day1 = true;
        this.inter1 = false;
    };
    ProcessScheduler.prototype.Intervals = function () {
        this.day1 = false;
        this.inter1 = true;
    };
    ProcessScheduler.prototype.tradd = function () {
        this.tr = true;
    };
    ProcessScheduler.prototype.create = function () {
        this.pop = false;
        this.pop2 = true;
    };
    return ProcessScheduler;
}());
ProcessScheduler = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'atpar-process-scheduler.component.html',
        providers: [datatableservice_1.datatableservice],
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice])
], ProcessScheduler);
exports.ProcessScheduler = ProcessScheduler;
//# sourceMappingURL=atpar-process-scheduler.component.js.map