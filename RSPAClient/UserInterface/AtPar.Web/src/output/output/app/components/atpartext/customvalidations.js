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
        switch (validationRule.toString().toUpperCase()) {
            case "MANDATORY": {
                var requiredvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                requiredvalidatainrule.ValidationType = "Mandatory";
                requiredvalidatainrule.validationFormat = "";
                //requiredvalidatainrule.ErrorMessage = "";
                return requiredvalidatainrule;
            }
            case "MIN": {
                var Minvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Minvalidatainrule.ValidationType = "Min";
                Minvalidatainrule.validationFormat = this.Value;
                //Minvalidatainrule.ErrorMessage = "Minimum length Should be " + this.Value + " Characters";
                return Minvalidatainrule;
            }
            case "MAX": {
                var Maxvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Maxvalidatainrule.ValidationType = "Max";
                Maxvalidatainrule.validationFormat = this.Value;
                //Maxvalidatainrule.ErrorMessage = "Maximum length Should be " + this.Value + " Characters";
                return Maxvalidatainrule;
            }
            case "PHONE": {
                var Phnevalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Phnevalidatainrule.ValidationType = "Phone";
                Phnevalidatainrule.validationFormat = "";
                return Phnevalidatainrule;
            }
            case "ZIPCODE": {
                var Zipvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Zipvalidatainrule.ValidationType = "Zipcode";
                Zipvalidatainrule.validationFormat = "";
                return Zipvalidatainrule;
            }
            case "FAX": {
                var Faxvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Faxvalidatainrule.ValidationType = "Fax";
                Faxvalidatainrule.validationFormat = "";
                return Faxvalidatainrule;
            }
            case "NUMERIC": {
                var Numericvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Numericvalidatainrule.ValidationType = "Numeric";
                Numericvalidatainrule.validationFormat = "";
                //Numericvalidatainrule.ErrorMessage = "Allows Only Numbers";
                return Numericvalidatainrule;
            }
            case "EMAIL": {
                var Email = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Email.ValidationType = "Email";
                Email.validationFormat = "";
                Email.ErrorMessage = "Should follow Email pattern";
                return Email;
            }
            case "RANGE": {
                var Range_1 = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Range_1.ValidationType = "Range";
                Range_1.validationFormat = this.Value;
                Range_1.ErrorMessage = "Range in between " + this.Value + " values";
                return Range_1;
            }
            case "DIGIT": {
                var Digit = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Digit.ValidationType = "Digit";
                Digit.validationFormat = "";
                Digit.ErrorMessage = "Allows only Digits";
                return Digit;
            }
            case "NUMBER": {
                var Number_1 = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Number_1.ValidationType = "Number";
                Number_1.validationFormat = "";
                Number_1.ErrorMessage = "Allows Numbers with Decimals";
                return Number_1;
            }
            case "URL": {
                var URL_1 = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                URL_1.ValidationType = "URL";
                URL_1.validationFormat = "";
                URL_1.ErrorMessage = "URL validation";
                return URL_1;
            }
            case "DATE": {
                var Date_1 = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Date_1.ValidationType = "Date";
                Date_1.validationFormat = "";
                Date_1.ErrorMessage = "Enter correct Date format";
                return Date_1;
            }
            case "MINDATE": {
                var MinDate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                MinDate.ValidationType = "MinDate";
                MinDate.validationFormat = this.Value;
                MinDate.ErrorMessage = "Enter Date below than the" + this.Value + "";
                return MinDate;
            }
            case "MAXDATE": {
                var MaxDate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                MaxDate.ValidationType = "MaxDate";
                MaxDate.validationFormat = this.Value;
                MaxDate.ErrorMessage = "Enter Date above than the " + this.Value + " ";
                return MaxDate;
            }
            case "EQUAL": {
                var Equal = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                Equal.ValidationType = "Equal";
                Equal.validationFormat = this.Value;
                Equal.ErrorMessage = "Allows only Equal values";
                return Equal;
            }
            case "ALPHABETS_10": {
                var alphabets_10 = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                alphabets_10.ValidationType = "regExp";
                alphabets_10.validationFormat = "alphabets_10";
                alphabets_10.ErrorMessage = "Allows Only 10 Alphabets";
                return alphabets_10;
            }
            case "ALPHA_NUMERICS_NOSPACE": {
                var alpha_numerics = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                alpha_numerics.ValidationType = "regExp";
                alpha_numerics.validationFormat = "alpha_numerics_nospace";
                alpha_numerics.ErrorMessage = "Allows Only Alphabets and Numbers";
                return alpha_numerics;
            }
            case "DATEFORMAT": {
                var dateformat = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                dateformat.ValidationType = "regExp";
                dateformat.validationFormat = "dateformat";
                dateformat.ErrorMessage = "Date Format validation ";
                return dateformat;
            }
            case "ALPHA_NUMERIC_DOT_UNDERSCORE_NOSPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_dot_underscore_nospace";
                regexpvalidate.ErrorMessage = "Allows alphabets, numbers, dot, underscore and spaces are not allowed";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_HASH_SPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_hash_space";
                regexpvalidate.ErrorMessage = "Allows alphabets, numbers and hash(#)";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_HASH_NOSPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_hash_nospace";
                regexpvalidate.ErrorMessage = "Allows alphabets, numbers and hash(#)";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_UNDERSCORE_NOSPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_underscore_nospace";
                regexpvalidate.ErrorMessage = "Allows alphabets, numbers and underscore";
                return regexpvalidate;
            }
            case "ALPHA_NOSPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_nospace";
                regexpvalidate.ErrorMessage = "Allows alphabets with spaces are not allowed";
                return regexpvalidate;
            }
            case "ALPHA_SPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_space";
                regexpvalidate.ErrorMessage = "Allows alphabets with spaces";
                return regexpvalidate;
            }
            case "EXCEPT_LESS_GREATER_SYMBOLS": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "except_less_greater_symbols";
                regexpvalidate.ErrorMessage = "Allows Alphabets, Numbers, special characters except <,>";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_UNDERSCORE_HYPHEN_BACKSLASH_NOSPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_underscore_hyphen_backslash_nospace";
                regexpvalidate.ErrorMessage = "Allows Only Alphabets, Numbers, underscore, hyphen and back-slash ";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_UNDERSCORE_DOT_FORWARD_BACKWARD_NOSPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_underscore_dot_forward_backward_nospace";
                regexpvalidate.ErrorMessage = "Allows Only Alphabets, Numbers, underscore, dot, forward-slash and back-slash ";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_UNDERSCORE_AMPERSAND_HYPHEN_SPACES": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_underscore_ampersand_hyphen_spaces";
                regexpvalidate.ErrorMessage = "Allows Only Numbers, underscore, ampersand, hyphen with spaces";
                return regexpvalidate;
            }
            case "NUMERIC_DOT": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "numeric_dot";
                regexpvalidate.validationFormat = "";
                regexpvalidate.ErrorMessage = "Allows Numbers with dot";
                return regexpvalidate;
            }
            case "EVERYTHING": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "everything";
                regexpvalidate.ErrorMessage = "Allows All characters";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_SPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_space";
                regexpvalidate.ErrorMessage = "Allows Alphabets, numbers, spaces";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_DOT_NOSPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_dot_nospace";
                regexpvalidate.ErrorMessage = "Allows Alphabets, numbers, dot spaces are not allowed";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_DOT_BACKSLASH_UNDERSCORE_HYPHEN_NOSPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_dot_backslash_underscore_hyphen_nospace";
                regexpvalidate.ErrorMessage = "Allows Alphabets, numbers, dot, backslash, underscore, hyphen spaces are not allowed";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_DOT_HYPHEN_NOSPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_dot_hyphen_nospace";
                regexpvalidate.ErrorMessage = "Allows Alphabets, numbers, dot, hyphen and spaces are not allowed";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_DOT_UNDERSCORE_HYPHEN_NOSPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_dot_underscore_hyphen_nospace";
                regexpvalidate.ErrorMessage = "Allows Alphabets, numbers, dot, underscore, hyphen and spaces are not allowed";
                return regexpvalidate;
            }
            case "NUMERIC_COLON": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "numeric_colon";
                regexpvalidate.ErrorMessage = "Allows numbers with colon";
                return regexpvalidate;
            }
            case "ALPHA-NUMERIC(1-5)": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha-numeric(1-5)";
                regexpvalidate.ErrorMessage = "Allows alphabets(A-Z) with numbers(1-5)";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_UNDERSCORE_SPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_underscore_space";
                regexpvalidate.ErrorMessage = "Allows alphabets, numbers, underscore and spaces are not allowed ";
                return regexpvalidate;
            }
            case "ALL_WITHOUT_DOT_UNDERSCORE_COMMA_SEMICOLON_SLASHES_SQUAREBRACKETS_SINGLEQUOTE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "except_.,;/\[]__symbols";
                regexpvalidate.ErrorMessage = "Allows alphabets, numbers without special characters(.,;/\[]'_)";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_WITH_UNDERSCORE_PLUS_HYPHEN_EQUAL": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_underscore_+=-_symbols";
                regexpvalidate.ErrorMessage = "Allows alphabets, numbers, underscore and symbols(+,=,-)";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_UNDERSCORE_HYPHEN_NOSPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_underscore_hyphen_nospace";
                regexpvalidate.ErrorMessage = "Allows alphabets, numbers, underscore and hyphen";
                return regexpvalidate;
            }
            case "NC_NUMERIC_DOT": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "nc_numeric_dot";
                regexpvalidate.ErrorMessage = "Allows alphabets(n,c), numbers,dot";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_UNDERSCORE_HYPHEN_BACKSLASH": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_underscore_hyphen_backslash_space";
                regexpvalidate.ErrorMessage = "Allows Only Alphabets, Numbers, underscore, hyphen and back-slash ";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_UNDERSCORE_HYPHEN_WITHSPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_underscore_hyphen_withspace";
                regexpvalidate.ErrorMessage = "Allows alphabets, numbers, underscore, hyphen and space ";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_UNDERSCORE_HYPHEN_DOT_COMMA_SQUOTE_WITHSPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_underscore_hyphen_dot_comma_squote_withspace";
                regexpvalidate.ErrorMessage = "This Field is Required ";
                return regexpvalidate;
            }
            case "CAPS_ALPHA_NOSPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "caps_alpha_nospace";
                regexpvalidate.ErrorMessage = "Allows alphabets and spaces are not allowed ";
                return regexpvalidate;
            }
            case "NUMERICS_DOUBLEPRECISION": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "numerics_doubleprecision";
                regexpvalidate.ErrorMessage = "Allows numerics,a double precision value ";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_HYPHEN_UNDERSCORE_DOT_TILDE_VERTICALBAR": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_hyphen_underscore_dot_tilde_verticalBar";
                regexpvalidate.ErrorMessage = "Allows alphabets and Tildes and underscore and hyphen";
                return regexpvalidate;
            }
            case "CAPS_ONLY_KEY_RES": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "caps_only_key_res";
                regexpvalidate.validationFormat = "";
                regexpvalidate.ErrorMessage = "Allows alphabets and spaces are not allowed ";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_SPACE_DOT_BACKSLASH": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_space_dot_backslash";
                regexpvalidate.ErrorMessage = "Allows alphabets and numbers space and dot";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_DOT_UNDERSCORE_HYPHEN_SPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_dot_underscore_hyphen_space";
                regexpvalidate.ErrorMessage = "Allows alphabets,numbers,underscore,hyphen, dot and space";
                return regexpvalidate;
            }
            case "EVERYTHING_EXCEPT_SPACE_AS_FSTCHAR": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "everything_except_space_as_fstchar";
                regexpvalidate.ErrorMessage = "Allows alphabets,numbers,underscore,hyphen, dot and space";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_EXCEPT_FST_SPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_except_fst_space";
                regexpvalidate.ErrorMessage = "Allows alphabets,numbers,except first space";
                return regexpvalidate;
            }
            case "EVERYTHING_EXCEPT_SPACEASFSTCHAR_AMPERSAND_SINGLEQUOTE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "everything_except_spaceasfstchar_ampersand_singlequote";
                regexpvalidate.ErrorMessage = "Allows alphabets,numbers,except first space,ampersand,singlequote";
                return regexpvalidate;
            }
            case "ALPHA_NUMERIC_UNDERSCORE_DOT_HYPHEN_FORWARD_BACKWARD_NOSPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_underscore_dot_hyphen_forward_backward_nospace";
                regexpvalidate.ErrorMessage = "Allows alphabets,numbers,underscore,dot,hyphen,forward and backward slash";
                return regexpvalidate;
            }
            case "NUMERIC_DOT_INITIAL": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "numeric_dot_initial";
                regexpvalidate.validationFormat = "";
                regexpvalidate.ErrorMessage = "Allows Numbers with dot";
                return regexpvalidate;
            }
            case "EVERYTHING_NOSPACE": {
                var regexpvalidate = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "everything_nospace";
                regexpvalidate.ErrorMessage = "Allows All characters except space";
                return regexpvalidate;
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
//# sourceMappingURL=customvalidations.js.map