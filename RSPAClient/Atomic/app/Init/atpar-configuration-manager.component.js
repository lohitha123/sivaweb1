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
//import { MT_ATPAR_CONFIGURATION_SECTION_DTLS } from '../Entities/MT_ATPAR_CONFIGURATION_SECTION_DTLS';
//import { ConfigurationManagerService } from './atpar-configuration-manager.service';
var PAR_MNGT_VENDOR_1 = require("../../app/Entities/PAR_MNGT_VENDOR");
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var api_1 = require("../components/common/api");
var router_1 = require("@angular/router");
var atpar_user_status_report_component_service_1 = require("./atpar-user-status-report.component.service");
var ConfigurationManagerComponent = (function () {
    function ConfigurationManagerComponent(el, leftBarAnimationsewrvice, router, confirmationService, countryService) {
        this.el = el;
        this.leftBarAnimationsewrvice = leftBarAnimationsewrvice;
        this.router = router;
        this.confirmationService = confirmationService;
        this.countryService = countryService;
        this.msgs = [];
        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
        //cars: SelectItem[];
        this.selectedCar = 'BMW';
        this.display = false;
        this.minDateValue1 = new Date();
        this.brands = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];
        //this.cities = [];
        //this.cities.push({ label: 'Select City', value: null });
        //this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        //this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        //this.cities.push({ label: 'London is dreams city for poples lives thereadasdsad dasdasdas dasdadad asdas', value: { id: 3, name: 'London', code: 'LDN' } });
        //this.cities.push({ label: 'Istanbul is a city of islam', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        //this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });
        //this.cars = [];
        //this.cars.push({ label: 'Audi', value: 'Audi' });
        //this.cars.push({ label: 'BMW', value: 'BMW' });
        //this.cars.push({ label: 'Fiat', value: 'Fiat' });
        //this.cars.push({ label: 'Ford', value: 'Ford' });
        //this.cars.push({ label: 'Honda', value: 'Honda' });
        //this.cars.push({ label: 'Jaguar', value: 'Jaguar' });
        //this.cars.push({ label: 'Mercedes', value: 'Mercedes' });
        //this.cars.push({ label: 'Renault', value: 'Renault' });
        //this.cars.push({ label: 'VW', value: 'VW' });
        //this.cars.push({ label: 'Volvo', value: 'Volvo' });
    }
    ConfigurationManagerComponent.prototype.homeurl = function () {
        this.leftBarAnimationsewrvice.isHomeClicked = false;
        this.leftBarAnimationsewrvice.isHide();
        this.router.navigate(['home']);
    };
    ConfigurationManagerComponent.prototype.showDialog = function () {
        this.display = true;
    };
    ConfigurationManagerComponent.prototype.hideDialog = function () {
        this.display = false;
    };
    ConfigurationManagerComponent.prototype.confirm = function () {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: function () {
                //Actual logic to perform a confirmation
            }
        });
    };
    //ngOnInit(): void {
    //}
    ConfigurationManagerComponent.prototype.showInfo = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
    };
    ConfigurationManagerComponent.prototype.showWarn = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
    };
    ConfigurationManagerComponent.prototype.showError = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    };
    ConfigurationManagerComponent.prototype.showSuccess = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Data Entered Successfully' });
    };
    ConfigurationManagerComponent.prototype.ngOnInit = function () {
        localStorage.removeItem("FromDate");
        localStorage.removeItem("ToDate");
        this.minDateValue2 = this.minDateValue1;
    };
    ConfigurationManagerComponent.prototype.selectDate1 = function (date) {
        this.date1 = date;
        this.minDateValue2 = this.date1;
        localStorage.setItem("FromDate", date);
        var tempDate = localStorage.getItem("ToDate");
        if (tempDate != undefined && tempDate != null) {
            if (new Date(tempDate) < this.date1) {
                this.date2 = this.date1;
            }
        }
    };
    ConfigurationManagerComponent.prototype.selectDate2 = function (date) {
        this.date2 = date;
        localStorage.setItem("ToDate", date);
    };
    ConfigurationManagerComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    ConfigurationManagerComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    //constructor(private countryService: AutoCompleteServiceForClient) { }
    ConfigurationManagerComponent.prototype.filterCountrySingle = function (event) {
        var _this = this;
        var query = event.query;
        this.countryService.getCountries().then(function (countries) {
            _this.filteredCountriesSingle = _this.filterCountry(query, countries);
        });
    };
    ConfigurationManagerComponent.prototype.filterCountryMultiple = function (event) {
    };
    ConfigurationManagerComponent.prototype.filterCountry = function (query, countries) {
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
    ConfigurationManagerComponent.prototype.filterBrands = function (event) {
        this.filteredBrands = [];
        for (var i = 0; i < this.brands.length; i++) {
            var brand = this.brands[i];
            if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredBrands.push(brand);
            }
        }
    };
    ConfigurationManagerComponent.prototype.handleDropdownClick = function () {
        var _this = this;
        this.filteredBrands = [];
        //mimic remote call
        setTimeout(function () {
            _this.filteredBrands = _this.brands;
        }, 100);
    };
    return ConfigurationManagerComponent;
}());
ConfigurationManagerComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'atpar-configuration-manager.component.html',
        providers: [api_1.ConfirmationService, atpar_user_status_report_component_service_1.AutoCompleteServiceForClient]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        leftbar_animation_service_1.LeftBarAnimationService,
        router_1.Router,
        api_1.ConfirmationService,
        atpar_user_status_report_component_service_1.AutoCompleteServiceForClient])
], ConfigurationManagerComponent);
exports.ConfigurationManagerComponent = ConfigurationManagerComponent;
//# sourceMappingURL=atpar-configuration-manager.component.js.map