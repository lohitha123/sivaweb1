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
/// <reference path="atpar-user-upload-automation.component.service.ts" />
var core_1 = require("@angular/core");
var atpar_user_upload_automation_component_service_1 = require("../../app/Init/atpar-user-upload-automation.component.service");
var datatableservice_1 = require("./../components/datatable/datatableservice");
var PAR_MNGT_VENDOR_1 = require("../../app/Entities/PAR_MNGT_VENDOR");
var UserUploadAutomationComponent = (function () {
    function UserUploadAutomationComponent(countryService, dataservice) {
        this.countryService = countryService;
        this.dataservice = dataservice;
        this.brands = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];
        this.loading = true;
        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
    }
    UserUploadAutomationComponent.prototype.filterCountrySingle = function (event) {
        var _this = this;
        var query = event.query;
        if (query == "%") {
            this.countryService.getCountries(query).subscribe(function (countries) {
                _this.filteredCountriesSingle = _this.filterCountry(query, countries);
            });
        }
        else if (query.length >= 3) {
            this.countryService.getCountries(query).subscribe(function (countries) {
                _this.filteredCountriesSingle = _this.filterCountry(query, countries);
            });
        }
    };
    UserUploadAutomationComponent.prototype.filterCountryMultiple = function (event) {
        //let query = event.query;
        //this.countryService.getCountries().then(countries => {
        //    this.filteredCountriesMultiple = this.filterCountry(query, countries);
        //});
    };
    UserUploadAutomationComponent.prototype.filterCountry = function (query, countries) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < countries.length; i++) {
                var country = countries[i];
                filtered.push(country);
            }
        }
        else {
            for (var i = 0; i < countries.length; i++) {
                var country = countries[i];
                if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                    filtered.push(country);
                }
            }
        }
        return filtered;
    };
    UserUploadAutomationComponent.prototype.filterBrands = function (event) {
        this.filteredBrands = [];
        for (var i = 0; i < this.brands.length; i++) {
            var brand = this.brands[i];
            if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredBrands.push(brand);
            }
        }
    };
    UserUploadAutomationComponent.prototype.handleDropdownClick = function () {
        var _this = this;
        this.filteredBrands = [];
        //mimic remote call
        setTimeout(function () {
            _this.filteredBrands = _this.brands;
        }, 100);
    };
    return UserUploadAutomationComponent;
}());
UserUploadAutomationComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app/Init/atpar-user-upload-automation.component.html',
        providers: [atpar_user_upload_automation_component_service_1.AutoCompleteService, datatableservice_1.datatableservice]
    }),
    __metadata("design:paramtypes", [atpar_user_upload_automation_component_service_1.AutoCompleteService, datatableservice_1.datatableservice])
], UserUploadAutomationComponent);
exports.UserUploadAutomationComponent = UserUploadAutomationComponent;
//# sourceMappingURL=atpar-user-upload-automation.component - Copy.js.map