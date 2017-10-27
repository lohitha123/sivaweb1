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
var ManageOrgGroupsComponent = (function () {
    function ManageOrgGroupsComponent(dataservice) {
        this.dataservice = dataservice;
        this.ACB = false;
        this.AP = false;
        this.MOG = true;
        this.pop = false;
        this.ven = new employee_1.Employee();
    }
    ManageOrgGroupsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataservice.getmanageorg().then(function (countries) { _this.sales = countries; });
    };
    ManageOrgGroupsComponent.prototype.clicked = function (event) {
        var _this = this;
        event.preventDefault();
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id;
        var value = idAttr.nodeValue;
        if (value == "ACB") {
            this.ACB = true;
            this.AP = false;
            this.MOG = false;
            this.dataservice.getBunits().then(function (countries) { _this.sales = countries; });
            console.log("hit");
        }
        else if (value == "AP") {
            this.AP = true;
            this.ACB = false;
            this.MOG = false;
        }
        else if (value == "add") {
            this.pop = true;
        }
        else if (value == "close") {
            this.pop = false;
        }
        else {
            this.ACB = false;
            this.AP = false;
            this.MOG = true;
            this.dataservice.getmanageorg().then(function (countries) { _this.sales = countries; });
        }
    };
    return ManageOrgGroupsComponent;
}());
ManageOrgGroupsComponent = __decorate([
    core_1.Component({
        templateUrl: './app/Init/atpar-manage-org-groups.component.html',
        providers: [datatableservice_1.datatableservice],
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice])
], ManageOrgGroupsComponent);
exports.ManageOrgGroupsComponent = ManageOrgGroupsComponent;
//# sourceMappingURL=atpar-manage-org-groups.component.js.map