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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var datatableservice_1 = require("./../components/datatable/datatableservice");
var employee_1 = require("../components/datatable/employee");
var platform_browser_1 = require("@angular/platform-browser");
var AddUserComponent = (function () {
    function AddUserComponent(dataservice, document) {
        var _this = this;
        this.dataservice = dataservice;
        this.document = document;
        this.table = false;
        this.form = false;
        this.import = false;
        this.ven = new employee_1.Employee();
        this.dataservice.getimportUser().then(function (countries) { _this.sales = countries; });
        this.cities = [];
        this.cities.push({ label: 'New York', value: 'New York' });
        this.cities.push({ label: 'New Town', value: 'New Town' });
        this.cities.push({ label: 'New X', value: 'New X' });
        this.cities.push({ label: 'Rome', value: 'Rome' });
        this.cities.push({ label: 'London', value: 'London' });
        this.cities.push({ label: 'Istanbul', value: 'Istanbul' });
        this.cities.push({ label: 'Paris', value: 'Paris' });
        this.cars = [];
        this.cars.push({ label: 'Audi', value: 'Audi' });
        this.cars.push({ label: 'BMW', value: 'BMW' });
    }
    AddUserComponent.prototype.add = function () {
        this.import = !this.import;
    };
    AddUserComponent.prototype.go = function () {
        this.table = !this.table;
    };
    AddUserComponent.prototype.close = function () {
        this.table = false;
        this.import = false;
    };
    AddUserComponent.prototype.create = function () {
        var elmnt = this.document.getElementById('main-section');
        elmnt.scrollTop = 0;
        console.log('hit');
    };
    return AddUserComponent;
}());
AddUserComponent = __decorate([
    core_1.Component({
        templateUrl: './app/Init/atpar-add-user.component.html',
        providers: [datatableservice_1.datatableservice]
    }),
    __param(1, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice, Object])
], AddUserComponent);
exports.AddUserComponent = AddUserComponent;
//# sourceMappingURL=atpar-add-user.component.js.map