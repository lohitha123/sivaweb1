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
/// <reference path="../../components/textbox/validators.ts" />
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var atpar_validation_rules_1 = require("../../entities/atpar_validation_rules");
var CustomValidations = (function () {
    function CustomValidations() {
    }
    CustomValidations.prototype.validateInput = function (validationRule, value) {
        if (value === void 0) { value = ''; }
        var val = validationRule.indexOf('=');
        if (val != -1) {
            if (validationRule.split('=').length > 1) {
                this.Value = validationRule.split('=')[1];
                validationRule = validationRule.split('=')[0];
            }
        }
        switch (validationRule.toString()) {
            case "mandatory": {
                var requiredvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                requiredvalidatainrule.ValidationType = "Mandatory";
                requiredvalidatainrule.validationFormat = "";
                //requiredvalidatainrule.ErrorMessage = "This Field is Required";
                return requiredvalidatainrule;
            }
            case "min": {
                var Minvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Minvalidatainrule.ValidationType = "Min";
                Minvalidatainrule.validationFormat = this.Value;
                Minvalidatainrule.ErrorMessage = "Minimum length Should be " + this.Value + " Characters";
                return Minvalidatainrule;
            }
            case "max": {
                var Maxvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Maxvalidatainrule.ValidationType = "Max";
                Maxvalidatainrule.validationFormat = this.Value;
                //Maxvalidatainrule.ErrorMessage = "Maximum length Should be " + this.Value + " Characters";
                return Maxvalidatainrule;
            }
            case "phone": {
                var Phnevalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Phnevalidatainrule.ValidationType = "Phone";
                Phnevalidatainrule.validationFormat = "";
                return Phnevalidatainrule;
            }
            case "zipcode": {
                var Zipvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Zipvalidatainrule.ValidationType = "Zipcode";
                Zipvalidatainrule.validationFormat = "";
                return Zipvalidatainrule;
            }
            case "fax": {
                var Faxvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Faxvalidatainrule.ValidationType = "Fax";
                Faxvalidatainrule.validationFormat = "";
                return Faxvalidatainrule;
            }
            case "numeric": {
                var Numericvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Numericvalidatainrule.ValidationType = "Numeric";
                Numericvalidatainrule.validationFormat = "";
                //Numericvalidatainrule.ErrorMessage = "Allows Only Numbers";
                return Numericvalidatainrule;
            }
            case "email": {
                var Email = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Email.ValidationType = "Email";
                Email.validationFormat = "";
                Email.ErrorMessage = "Should follow Email pattern";
                return Email;
            }
            case "range": {
                var Range_1 = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Range_1.ValidationType = "Range";
                Range_1.validationFormat = this.Value;
                Range_1.ErrorMessage = "Range in between " + this.Value + " values";
                return Range_1;
            }
            case "digit": {
                var Digit = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Digit.ValidationType = "Digit";
                Digit.validationFormat = "";
                Digit.ErrorMessage = "Allows only Digits";
                return Digit;
            }
            case "number": {
                var Number_1 = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Number_1.ValidationType = "Number";
                Number_1.validationFormat = "";
                Number_1.ErrorMessage = "Allows Numbers with Decimals";
                return Number_1;
            }
            case "url": {
                var URL_1 = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                URL_1.ValidationType = "URL";
                URL_1.validationFormat = "";
                URL_1.ErrorMessage = "URL validation";
                return URL_1;
            }
            case "date": {
                var Date_1 = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Date_1.ValidationType = "Date";
                Date_1.validationFormat = "";
                Date_1.ErrorMessage = "Enter correct Date format";
                return Date_1;
            }
            case "mindate": {
                var MinDate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                MinDate.ValidationType = "MinDate";
                MinDate.validationFormat = this.Value;
                MinDate.ErrorMessage = "Enter Date below than the" + this.Value + "";
                return MinDate;
            }
            case "maxdate": {
                var MaxDate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                MaxDate.ValidationType = "MaxDate";
                MaxDate.validationFormat = this.Value;
                MaxDate.ErrorMessage = "Enter Date above than the " + this.Value + " ";
                return MaxDate;
            }
            case "equal": {
                var Equal = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Equal.ValidationType = "Equal";
                Equal.validationFormat = this.Value;
                Equal.ErrorMessage = "Allows only Equal values";
                return Equal;
            }
            case "alphabets_10": {
                var alphabets_10 = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                alphabets_10.ValidationType = "regExp";
                alphabets_10.validationFormat = "alphabets_10";
                alphabets_10.ErrorMessage = "Allows Only 10 Alphabets";
                return alphabets_10;
            }
            case "alpha_numerics_nospace": {
                var alpha_numerics = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                alpha_numerics.ValidationType = "regExp";
                alpha_numerics.validationFormat = "alpha_numerics_nospace";
                alpha_numerics.ErrorMessage = "Allows Only Alphabets and Numbers";
                return alpha_numerics;
            }
            case "dateformat": {
                var dateformat = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                dateformat.ValidationType = "regExp";
                dateformat.validationFormat = "dateformat";
                dateformat.ErrorMessage = "Date Format validation ";
                return dateformat;
            }
            case "alpha_numeric_dot_underscore_nospace": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_dot_underscore_nospace";
                regexpvalidate.ErrorMessage = "Allows alphabets, numbers, dot, underscore and spaces are not allowed";
                return regexpvalidate;
            }
            case "alpha_numeric_hash_space": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_hash_space";
                regexpvalidate.ErrorMessage = "Allows alphabets, numbers and hash(#)";
                return regexpvalidate;
            }
            case "alpha_numeric_underscore_nospace": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_underscore_nospace";
                regexpvalidate.ErrorMessage = "Allows alphabets, numbers and underscore";
                return regexpvalidate;
            }
            case "alpha_nospace": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_nospace";
                regexpvalidate.ErrorMessage = "Allows alphabets with spaces are not allowed";
                return regexpvalidate;
            }
            case "alpha_space": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_space";
                regexpvalidate.ErrorMessage = "Allows alphabets with spaces";
                return regexpvalidate;
            }
            case "except_less_greater_symbols": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "except_less_greater_symbols";
                regexpvalidate.ErrorMessage = "Allows Alphabets, Numbers, special characters except <,>";
                return regexpvalidate;
            }
            case "alpha_numeric_underscore_hyphen_backslash_nospace": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_underscore_hyphen_backslash_nospace";
                regexpvalidate.ErrorMessage = "Allows Only Alphabets, Numbers, underscore, hyphen and back-slash ";
                return regexpvalidate;
            }
            case "alpha_numeric_underscore_dot_forward_backward_nospace": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_underscore_dot_forward_backward_nospace";
                regexpvalidate.ErrorMessage = "Allows Only Alphabets, Numbers, underscore, dot, forward-slash and back-slash ";
                return regexpvalidate;
            }
            case "alpa_numeric_underscore_ampersand_hyphen_spaces": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpa_numeric_underscore_ampersand_hyphen_spaces";
                regexpvalidate.ErrorMessage = "Allows Only Numbers, underscore, ampersand, hyphen with spaces";
                return regexpvalidate;
            }
            case "numeric_dot": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "numeric_dot";
                regexpvalidate.ErrorMessage = "Allows Numbers with dot";
                return regexpvalidate;
            }
            case "everything": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "everything";
                regexpvalidate.ErrorMessage = "Allows All characters";
                return regexpvalidate;
            }
            case "alpha_numeric_space": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_space";
                regexpvalidate.ErrorMessage = "Allows Alphabets, numbers, spaces";
                return regexpvalidate;
            }
        }
    };
    return CustomValidations;
}());
CustomValidations = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], CustomValidations);
exports.CustomValidations = CustomValidations;
//# sourceMappingURL=customvalidations.js.map