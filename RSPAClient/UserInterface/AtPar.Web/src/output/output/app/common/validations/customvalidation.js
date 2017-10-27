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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var atpar_validation_rules_1 = require("../../entities/atpar_validation_rules");
var CustomValidations = (function () {
    //validationrule: ATPAR_VALIDATION_RULES[];
    function CustomValidations() {
    }
    CustomValidations.prototype.validateInput = function (validationRules) {
        switch (validationRules.toString()) {
            case "Mandatory": {
                var requiredvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                requiredvalidatainrule.order = 1;
                requiredvalidatainrule.status = false;
                requiredvalidatainrule.ValidationType = "Mandatory";
                requiredvalidatainrule.validationFormat = "";
                requiredvalidatainrule.ErrorMessage = "This Field is Required";
                requiredvalidatainrule.showDiv = true;
                return requiredvalidatainrule;
            }
            case "Min": {
                var Minvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Minvalidatainrule.order = 2;
                Minvalidatainrule.status = false;
                Minvalidatainrule.ValidationType = "Min";
                Minvalidatainrule.validationFormat = "2";
                Minvalidatainrule.ErrorMessage = "Minimum length Should be 2 Characters";
                Minvalidatainrule.showDiv = true;
                return Minvalidatainrule;
            }
            case "Max": {
                var Maxvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Maxvalidatainrule.order = 3;
                Maxvalidatainrule.status = false;
                Maxvalidatainrule.ValidationType = "Max";
                Maxvalidatainrule.validationFormat = "5";
                Maxvalidatainrule.ErrorMessage = "Maximum length Should be 5 Characters";
                Maxvalidatainrule.showDiv = true;
                return Maxvalidatainrule;
            }
            case "NUMERIC": {
                var Numericvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Numericvalidatainrule.order = 4;
                Numericvalidatainrule.status = false;
                Numericvalidatainrule.ValidationType = "Numeric";
                Numericvalidatainrule.validationFormat = "en-AU";
                Numericvalidatainrule.ErrorMessage = "Allows Only Numbers";
                Numericvalidatainrule.showDiv = true;
                return Numericvalidatainrule;
            }
            case "Alpha Numeric": {
                var alphaNumeric = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                alphaNumeric.order = 5;
                alphaNumeric.status = false;
                alphaNumeric.ValidationType = "Alpha Numeric";
                alphaNumeric.validationFormat = "";
                alphaNumeric.ErrorMessage = "Allowed only Alpha Numeric values";
                alphaNumeric.showDiv = true;
                return alphaNumeric;
            }
            case "Email": {
                var alphaNumeric = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                alphaNumeric.order = 6;
                alphaNumeric.status = false;
                alphaNumeric.ValidationType = "Email";
                alphaNumeric.validationFormat = "";
                alphaNumeric.ErrorMessage = "Should be follow Email pattern";
                alphaNumeric.showDiv = true;
                return alphaNumeric;
            }
            case "Range": {
                var alphaNumeric = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                alphaNumeric.order = 7;
                alphaNumeric.status = false;
                alphaNumeric.ValidationType = "Range";
                alphaNumeric.validationFormat = "";
                alphaNumeric.ErrorMessage = "Range in between values";
                alphaNumeric.showDiv = true;
                return alphaNumeric;
            }
            case "Digit": {
                var alphaNumeric = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                alphaNumeric.order = 8;
                alphaNumeric.status = false;
                alphaNumeric.ValidationType = "Digit";
                alphaNumeric.validationFormat = "";
                alphaNumeric.ErrorMessage = "Allowed only Digit values";
                alphaNumeric.showDiv = true;
                return alphaNumeric;
            }
            case "Date": {
                var alphaNumeric = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                alphaNumeric.order = 9;
                alphaNumeric.status = false;
                alphaNumeric.ValidationType = "Date";
                alphaNumeric.validationFormat = "";
                alphaNumeric.ErrorMessage = "Enter correct Date formate";
                alphaNumeric.showDiv = true;
                return alphaNumeric;
            }
            case "MinDate": {
                var alphaNumeric = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                alphaNumeric.order = 10;
                alphaNumeric.status = false;
                alphaNumeric.ValidationType = "MinDate";
                alphaNumeric.validationFormat = "";
                alphaNumeric.ErrorMessage = "Enter correct Date formate";
                alphaNumeric.showDiv = true;
                return alphaNumeric;
            }
            case "Equal": {
                var alphaNumeric = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                alphaNumeric.order = 11;
                alphaNumeric.status = false;
                alphaNumeric.ValidationType = "Equal";
                alphaNumeric.validationFormat = "";
                alphaNumeric.ErrorMessage = "Allowed only Equal values";
                alphaNumeric.showDiv = true;
                return alphaNumeric;
            }
            default:
                {
                    var custValidationRule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                    custValidationRule.order = 11;
                    custValidationRule.status = false;
                    custValidationRule.ValidationType = validationRules.toString();
                    custValidationRule.validationFormat = "";
                    custValidationRule.ErrorMessage = "Custom Validation";
                    custValidationRule.showDiv = true;
                    return custValidationRule;
                }
        }
    };
    CustomValidations = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], CustomValidations);
    return CustomValidations;
}());
exports.CustomValidations = CustomValidations;
//# sourceMappingURL=customvalidation.js.map