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
var InactivateItemsComponent = (function () {
    function InactivateItemsComponent(dataservice) {
        this.dataservice = dataservice;
        this.pop = false;
        this.table = false;
        this.page = true;
        this.form = false;
        this.editform = false;
        this.sedit = false;
        this.serial = false;
        this.loading = true;
        this.minDateValue1 = new Date();
        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
        this.ven = new employee_1.Employee();
    }
    InactivateItemsComponent.prototype.go = function () {
        var _this = this;
        this.pop = !this.pop;
        this.dataservice.gettkitInactiveitems().then(function (countries) { _this.sales = countries; });
    };
    InactivateItemsComponent.prototype.add = function () {
        var _this = this;
        this.form = true;
        this.editform = false;
        this.page = false;
        this.pop = false;
        this.dataservice.gettkitMangEquip2().then(function (countries) { _this.sales = countries; });
        console.log(this.form);
        this.sedit = false;
    };
    InactivateItemsComponent.prototype.fedit = function () {
        var _this = this;
        this.sedit = true;
        this.form = true;
        this.editform = false;
        this.page = false;
        this.pop = false;
        this.dataservice.gettkitMangEquip2().then(function (countries) { _this.sales = countries; });
        console.log(this.form);
    };
    InactivateItemsComponent.prototype.addserial = function () {
        this.serial = !this.serial;
        this.form = false;
        this.page = false;
        this.pop = false;
        this.editform = false;
        this.table = false;
        this.sedit = false;
    };
    InactivateItemsComponent.prototype.editserial = function () {
        this.sedit = true;
        this.serial = !this.serial;
        this.form = false;
        this.page = false;
        this.pop = false;
        this.editform = false;
        this.table = false;
    };
    InactivateItemsComponent.prototype.goback = function () {
        this.serial = false;
        this.form = true;
    };
    InactivateItemsComponent.prototype.tbl = function () {
        this.form = false;
        this.editform = false;
        this.page = false;
        this.pop = false;
        this.table = true;
        // this.dataservice.getpouManagecase2().then(countries => { this.sales = countries; });
    };
    InactivateItemsComponent.prototype.edit = function () {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    };
    InactivateItemsComponent.prototype.save = function () {
        this.editform = false;
    };
    InactivateItemsComponent.prototype.close = function () {
        this.form = false;
        this.page = true;
        this.pop = false;
        this.editform = false;
        this.table = false;
        // this.dataservice.getpouManagecase1().then(countries => { this.sales = countries; });
    };
    InactivateItemsComponent.prototype.serach = function () {
        var _this = this;
        this.pop = !this.pop;
        this.dataservice.gettkitMangEquip1().then(function (countries) { _this.sales = countries; });
    };
    InactivateItemsComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    InactivateItemsComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    return InactivateItemsComponent;
}());
InactivateItemsComponent = __decorate([
    core_1.Component({
        templateUrl: './app/TrackIT/tkit-inactivate-items.component.html',
        providers: [datatableservice_1.datatableservice],
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice])
], InactivateItemsComponent);
exports.InactivateItemsComponent = InactivateItemsComponent;
//# sourceMappingURL=tkit-inactivate-items.component.js.map