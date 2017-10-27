"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var STATE = (function () {
    function STATE(countryid, label, value) {
        this.countryid = countryid;
        this.label = label;
        this.value = value;
    }
    return STATE;
}());
exports.STATE = STATE;
var COUNTRY = (function () {
    function COUNTRY(countryid, label, value) {
        this.countryid = countryid;
        this.label = label;
        this.value = value;
    }
    return COUNTRY;
}());
exports.COUNTRY = COUNTRY;
var SharedDataService = (function () {
    function SharedDataService() {
    }
    SharedDataService.prototype.getCountries = function () {
        return [
            new COUNTRY(0, 'SelectCountry', 'SelectCountry'),
            new COUNTRY(1, 'CANADA', 'CANADA'),
            new COUNTRY(2, 'USA', 'USA')
        ];
    };
    SharedDataService.prototype.getStates = function () {
        return [
            new STATE(0, 'SelectState', 'SelectState'),
            new STATE(1, 'AB', 'AB'),
            new STATE(1, 'BC', 'BC'),
            new STATE(1, 'NB', 'NB'),
            new STATE(1, 'MB', 'MB'),
            new STATE(1, 'NL', 'NL'),
            new STATE(1, 'NS', 'NS'),
            new STATE(1, 'NU', 'NU'),
            new STATE(1, 'ON', 'ON'),
            new STATE(1, 'PE', 'PE'),
            new STATE(1, 'QC', 'QC'),
            new STATE(1, 'SK', 'SK'),
            new STATE(1, 'NT', 'NT'),
            new STATE(1, 'YT', 'YT'),
            new STATE(2, 'AA', 'AA'),
            new STATE(2, 'AE', 'AE'),
            new STATE(2, 'AK', 'AK'),
            new STATE(2, 'AL', 'AL'),
            new STATE(2, 'AP', 'AP'),
            new STATE(2, 'AR', 'AR'),
            new STATE(2, 'AS', 'AS'),
            new STATE(2, 'AZ', 'AZ'),
            new STATE(2, 'CA', 'CA'),
            new STATE(2, 'CO', 'CO'),
            new STATE(2, 'CT', 'CT'),
            new STATE(2, 'DC', 'DC'),
            new STATE(2, 'DE', 'DE'),
            new STATE(2, 'FL', 'FL'),
            new STATE(2, 'FM', 'FM'),
            new STATE(2, 'GA', 'GA'),
            new STATE(2, 'GU', 'GU'),
            new STATE(2, 'HI', 'HI'),
            new STATE(2, 'IA', 'IA'),
            new STATE(2, 'ID', 'ID'),
            new STATE(2, 'IL', 'IL'),
            new STATE(2, 'IN', 'IN'),
            new STATE(2, 'KS', 'KS'),
            new STATE(2, 'KY', 'KY'),
            new STATE(2, 'LA', 'LA'),
            new STATE(2, 'MA', 'MA'),
            new STATE(2, 'MD', 'MD'),
            new STATE(2, 'ME', 'ME'),
            new STATE(2, 'MH', 'MH'),
            new STATE(2, 'MI', 'MI'),
            new STATE(2, 'MN', 'MN'),
            new STATE(2, 'MO', 'MO'),
            new STATE(2, 'MP', 'MP'),
            new STATE(2, 'MS', 'MS'),
            new STATE(2, 'MT', 'MT'),
            new STATE(2, 'NC', 'NC'),
            new STATE(2, 'ND', 'ND'),
            new STATE(2, 'NE', 'NE'),
            new STATE(2, 'NH', 'NH'),
            new STATE(2, 'NJ', 'NJ'),
            new STATE(2, 'NM', 'NM'),
            new STATE(2, 'NV', 'NV'),
            new STATE(2, 'NY', 'NY'),
            new STATE(2, 'OH', 'OH'),
            new STATE(2, 'OK', 'OK'),
            new STATE(2, 'OR', 'OR'),
            new STATE(2, 'PA', 'PA'),
            new STATE(2, 'PR', 'PR'),
            new STATE(2, 'PW', 'PW'),
            new STATE(2, 'RI', 'RI'),
            new STATE(2, 'SC', 'SC'),
            new STATE(2, 'SD', 'SD'),
            new STATE(2, 'TN', 'TN'),
            new STATE(2, 'TX', 'TX'),
            new STATE(2, 'UT', 'UT'),
            new STATE(2, 'VA', 'VA'),
            new STATE(2, 'VI', 'VI'),
            new STATE(2, 'VT', 'VT'),
            new STATE(2, 'WA', 'WA'),
            new STATE(2, 'WV', 'WV'),
            new STATE(2, 'WI', 'WI'),
            new STATE(2, 'WY', 'WY')
        ];
    };
    return SharedDataService;
}());
SharedDataService = __decorate([
    core_1.Injectable()
], SharedDataService);
exports.SharedDataService = SharedDataService;
//# sourceMappingURL=sharedData.js.map