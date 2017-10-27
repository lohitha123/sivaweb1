"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var range_length_1 = require("./range-length");
var min_1 = require("./min");
var max_1 = require("./max");
var range_1 = require("./range");
var number_1 = require("./number");
var email_1 = require("./email");
var date_1 = require("./date");
var min_date_1 = require("./min-date");
var max_date_1 = require("./max-date");
var phone_1 = require("./phone");
var equal_1 = require("./equal");
var equal_to_1 = require("./equal-to");
var myValidate_onlynumbers_1 = require("./myValidate onlynumbers");
exports.CUSTOM_FORM_DIRECTIVES = [
    range_length_1.RangeLengthValidator,
    min_1.MinValidator,
    max_1.MaxValidator,
    range_1.RangeValidator,
    number_1.NumberValidator,
    email_1.EmailValidator,
    date_1.DateValidator,
    min_date_1.MinDateValidator,
    max_date_1.MaxDateValidator,
    phone_1.PhoneValidator,
    equal_1.EqualValidator,
    myValidate_onlynumbers_1.HighlightDirective,
    equal_to_1.EqualToValidator
];
var CustomTextBoxModule = (function () {
    function CustomTextBoxModule() {
    }
    return CustomTextBoxModule;
}());
CustomTextBoxModule = __decorate([
    core_1.NgModule({
        declarations: [exports.CUSTOM_FORM_DIRECTIVES],
        exports: [exports.CUSTOM_FORM_DIRECTIVES]
    })
], CustomTextBoxModule);
exports.CustomTextBoxModule = CustomTextBoxModule;
//# sourceMappingURL=CustomTextBoxModule.js.map