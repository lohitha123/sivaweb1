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
var ManageProfilesComponent = (function () {
    function ManageProfilesComponent(dataservice) {
        this.dataservice = dataservice;
        this.content = false;
        this.display = false;
        this.display2 = false;
        this.display3 = false;
        this.page = true;
        this.ven = new employee_1.Employee();
    }
    ManageProfilesComponent.prototype.go = function () {
        this.content = true;
    };
    ManageProfilesComponent.prototype.create = function () {
        this.content = true;
    };
    ManageProfilesComponent.prototype.popup = function () {
        this.display = true;
        this.display2 = false;
        this.display3 = false;
        this.page = false;
        this.content = false;
    };
    ManageProfilesComponent.prototype.popup2 = function () {
        var _this = this;
        this.display2 = true;
        this.display = false;
        this.display3 = false;
        this.page = false;
        this.content = false;
        this.dataservice.getmenuAccess().then(function (countries) { _this.sales = countries; });
    };
    ManageProfilesComponent.prototype.popup3 = function () {
        var _this = this;
        this.display3 = true;
        this.display2 = false;
        this.display = false;
        this.page = false;
        this.content = false;
        this.dataservice.getscreenDisplay().then(function (countries) { _this.sales = countries; });
    };
    ManageProfilesComponent.prototype.hideDialog = function () {
        this.page = true;
        this.display2 = false;
        this.display = false;
        this.display3 = false;
    };
    return ManageProfilesComponent;
}());
ManageProfilesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'atpar-manage-profiles.component.html',
        providers: [datatableservice_1.datatableservice],
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice])
], ManageProfilesComponent);
exports.ManageProfilesComponent = ManageProfilesComponent;
//# sourceMappingURL=atpar-manage-profiles.component.js.map