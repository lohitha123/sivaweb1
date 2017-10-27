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
var ReviewChargesCreditsComponent = (function () {
    function ReviewChargesCreditsComponent(dataservice) {
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
    }
    ReviewChargesCreditsComponent.prototype.go = function () {
        var _this = this;
        this.pop = !this.pop;
        this.dataservice.getpouReviewchargescredits1().then(function (countries) { _this.sales = countries; });
        this.dataservice.getpouReviewchargescredits2().then(function (countries) { _this.sale = countries; });
    };
    ReviewChargesCreditsComponent.prototype.add = function () {
        this.page = false;
        this.pop = false;
        this.form = true;
    };
    ReviewChargesCreditsComponent.prototype.edit = function () {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    };
    ReviewChargesCreditsComponent.prototype.close = function () {
        this.page = true;
        this.form = false;
        this.editform = false;
    };
    ReviewChargesCreditsComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    ReviewChargesCreditsComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    return ReviewChargesCreditsComponent;
}());
ReviewChargesCreditsComponent = __decorate([
    core_1.Component({
        templateUrl: './app/PointOfUse/pou-review-charges-credits.component.html',
        providers: [datatableservice_1.datatableservice],
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice])
], ReviewChargesCreditsComponent);
exports.ReviewChargesCreditsComponent = ReviewChargesCreditsComponent;
//# sourceMappingURL=pou-review-charges-credits.component.js.map