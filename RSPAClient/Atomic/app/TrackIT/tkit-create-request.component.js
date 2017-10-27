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
var CreateRequestComponent = (function () {
    function CreateRequestComponent(dataservice) {
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
        //this.dataservice.gettkitMangDep().then(countries => { this.sales = countries; });
    }
    CreateRequestComponent.prototype.go = function () {
        var _this = this;
        this.pop = !this.pop;
        this.page = false;
        this.dataservice.gettkitPatient().then(function (countries) { _this.sales = countries; });
    };
    CreateRequestComponent.prototype.add = function () {
        this.page = true;
        this.pop = false;
    };
    CreateRequestComponent.prototype.tbl = function () {
        this.form = false;
        this.editform = false;
        this.page = false;
        this.pop = false;
        this.table = true;
        // this.dataservice.getpouManagecase2().then(countries => { this.sales = countries; });
    };
    CreateRequestComponent.prototype.edit = function () {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    };
    CreateRequestComponent.prototype.save = function () {
        this.editform = false;
    };
    CreateRequestComponent.prototype.close = function () {
        this.page = true;
        this.pop = false;
        // this.dataservice.getpouManagecase1().then(countries => { this.sales = countries; });
    };
    CreateRequestComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    CreateRequestComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    return CreateRequestComponent;
}());
CreateRequestComponent = __decorate([
    core_1.Component({
        templateUrl: './app/TrackIT/tkit-create-request.component.html',
        providers: [datatableservice_1.datatableservice],
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice])
], CreateRequestComponent);
exports.CreateRequestComponent = CreateRequestComponent;
//# sourceMappingURL=tkit-create-request.component.js.map