/// <reference path="../../components/textbox/validators.ts" />
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ATPAR_VALIDATION_RULES } from '../../entities/atpar_validation_rules';

@Injectable()
export class CustomValidations {

    //validationrule: ATPAR_VALIDATION_RULES[];
    Value: string;
    constructor() { }

    public validateInput(validationRule: string, value: string = ''): ATPAR_VALIDATION_RULES {
        let val = validationRule.indexOf('=');
        if (val != -1) {
            if (validationRule.split('=').length > 1) {

                this.Value = validationRule.split('=')[1];
                validationRule = validationRule.split('=')[0];
            }



        }
        switch (validationRule.toString()) {
            case "mandatory": {
                let requiredvalidatainrule = new ATPAR_VALIDATION_RULES();
                requiredvalidatainrule.ValidationType = "Mandatory";
                requiredvalidatainrule.validationFormat = "";
                //requiredvalidatainrule.ErrorMessage = "This Field is Required";
                return requiredvalidatainrule;
            }

            case "min": {
                let Minvalidatainrule = new ATPAR_VALIDATION_RULES();
                Minvalidatainrule.ValidationType = "Min";
                Minvalidatainrule.validationFormat = this.Value;
                Minvalidatainrule.ErrorMessage = "Minimum length Should be " + this.Value + " Characters";
                return Minvalidatainrule;
            }

            case "max": {
                let Maxvalidatainrule = new ATPAR_VALIDATION_RULES();
                Maxvalidatainrule.ValidationType = "Max";
                Maxvalidatainrule.validationFormat = this.Value;
                //Maxvalidatainrule.ErrorMessage = "Maximum length Should be " + this.Value + " Characters";
                return Maxvalidatainrule;
            }
            case "phone": {
                let Phnevalidatainrule = new ATPAR_VALIDATION_RULES();
                Phnevalidatainrule.ValidationType = "Phone";
                Phnevalidatainrule.validationFormat = "";
                return Phnevalidatainrule;
            }
            case "zipcode": {
                let Zipvalidatainrule = new ATPAR_VALIDATION_RULES();
                Zipvalidatainrule.ValidationType = "Zipcode";
                Zipvalidatainrule.validationFormat = "";
                return Zipvalidatainrule;
            }

            case "fax": {
                let Faxvalidatainrule = new ATPAR_VALIDATION_RULES();
                Faxvalidatainrule.ValidationType = "Fax";
                Faxvalidatainrule.validationFormat = "";
                return Faxvalidatainrule;
            }

            case "numeric": {
                let Numericvalidatainrule = new ATPAR_VALIDATION_RULES();
                Numericvalidatainrule.ValidationType = "Numeric";
                Numericvalidatainrule.validationFormat = "";
                //Numericvalidatainrule.ErrorMessage = "Allows Only Numbers";
                return Numericvalidatainrule;
            }

            case "email": {
                let Email = new ATPAR_VALIDATION_RULES();
                Email.ValidationType = "Email";
                Email.validationFormat = "";
                Email.ErrorMessage = "Should follow Email pattern";
                return Email;
            }

            case "range": {
                let Range = new ATPAR_VALIDATION_RULES();
                Range.ValidationType = "Range";
                Range.validationFormat = this.Value;
                Range.ErrorMessage = "Range in between " + this.Value + " values";
                return Range;
            }

            case "digit": {
                let Digit = new ATPAR_VALIDATION_RULES();
                Digit.ValidationType = "Digit";
                Digit.validationFormat = "";
                Digit.ErrorMessage = "Allows only Digits";
                return Digit;
            }
            case "number": {
                let Number = new ATPAR_VALIDATION_RULES();
                Number.ValidationType = "Number";
                Number.validationFormat = "";
                Number.ErrorMessage = "Allows Numbers with Decimals";
                return Number;
            }
            case "url": {
                let URL = new ATPAR_VALIDATION_RULES();
                URL.ValidationType = "URL";
                URL.validationFormat = "";
                URL.ErrorMessage = "URL validation";
                return URL;
            }
            case "date": {
                let Date = new ATPAR_VALIDATION_RULES();
                Date.ValidationType = "Date";
                Date.validationFormat = "";
                Date.ErrorMessage = "Enter correct Date format";
                return Date;
            }

            case "mindate": {
                let MinDate = new ATPAR_VALIDATION_RULES();
                MinDate.ValidationType = "MinDate";
                MinDate.validationFormat = this.Value;
                MinDate.ErrorMessage = "Enter Date below than the" + this.Value + "";
                return MinDate;
            }
            case "maxdate": {
                let MaxDate = new ATPAR_VALIDATION_RULES();
                MaxDate.ValidationType = "MaxDate";
                MaxDate.validationFormat = this.Value;
                MaxDate.ErrorMessage = "Enter Date above than the " + this.Value + " ";
                return MaxDate;
            }

            case "equal": {
                let Equal = new ATPAR_VALIDATION_RULES();
                Equal.ValidationType = "Equal";
                Equal.validationFormat = this.Value;
                Equal.ErrorMessage = "Allows only Equal values";
                return Equal;
            }
            case "alphabets_10": {
                let alphabets_10 = new ATPAR_VALIDATION_RULES();
                alphabets_10.ValidationType = "regExp";
                alphabets_10.validationFormat = "alphabets_10";
                alphabets_10.ErrorMessage = "Allows Only 10 Alphabets";
                return alphabets_10;
            }
            case "alpha_numerics_nospace": {
                let alpha_numerics = new ATPAR_VALIDATION_RULES();
                alpha_numerics.ValidationType = "regExp";
                alpha_numerics.validationFormat = "alpha_numerics_nospace";
                alpha_numerics.ErrorMessage = "Allows Only Alphabets and Numbers";
                return alpha_numerics;
            }
            case "dateformat": {
                let dateformat = new ATPAR_VALIDATION_RULES();
                dateformat.ValidationType = "regExp";
                dateformat.validationFormat = "dateformat";
                dateformat.ErrorMessage = "Date Format validation ";
                return dateformat;
            }
            case "alpha_numeric_dot_underscore_nospace": {
                let regexpvalidate = new ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_dot_underscore_nospace";
                regexpvalidate.ErrorMessage = "Allows alphabets, numbers, dot, underscore and spaces are not allowed";
                return regexpvalidate;
            }
            case "alpha_numeric_hash_space": {
                let regexpvalidate = new ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_hash_space";
                regexpvalidate.ErrorMessage = "Allows alphabets, numbers and hash(#)";
                return regexpvalidate;
            }
            case "alpha_numeric_underscore_nospace": {
                let regexpvalidate = new ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_underscore_nospace";
                regexpvalidate.ErrorMessage = "Allows alphabets, numbers and underscore";
                return regexpvalidate;
            }
            case "alpha_nospace": {
                let regexpvalidate = new ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_nospace";
                regexpvalidate.ErrorMessage = "Allows alphabets with spaces are not allowed";
                return regexpvalidate;
            }
            case "alpha_space": {
                let regexpvalidate = new ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_space";
                regexpvalidate.ErrorMessage = "Allows alphabets with spaces";
                return regexpvalidate;
            }
            case "except_less_greater_symbols": {
                let regexpvalidate = new ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "except_less_greater_symbols";
                regexpvalidate.ErrorMessage = "Allows Alphabets, Numbers, special characters except <,>";
                return regexpvalidate;
            }
            case "alpha_numeric_underscore_hyphen_backslash_nospace": {
                let regexpvalidate = new ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_underscore_hyphen_backslash_nospace";
                regexpvalidate.ErrorMessage = "Allows Only Alphabets, Numbers, underscore, hyphen and back-slash ";
                return regexpvalidate;
            }
            case "alpha_numeric_underscore_dot_forward_backward_nospace": {
                let regexpvalidate = new ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_underscore_dot_forward_backward_nospace";
                regexpvalidate.ErrorMessage = "Allows Only Alphabets, Numbers, underscore, dot, forward-slash and back-slash ";
                return regexpvalidate;
            }
            case "alpa_numeric_underscore_ampersand_hyphen_spaces": {
                let regexpvalidate = new ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpa_numeric_underscore_ampersand_hyphen_spaces";
                regexpvalidate.ErrorMessage = "Allows Only Numbers, underscore, ampersand, hyphen with spaces";
                return regexpvalidate;
            }
            case "numeric_dot": {
                let regexpvalidate = new ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "numeric_dot";
                regexpvalidate.ErrorMessage = "Allows Numbers with dot";
                return regexpvalidate;
            }
            case "everything": {
                let regexpvalidate = new ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "everything";
                regexpvalidate.ErrorMessage = "Allows All characters";
                return regexpvalidate;
            }
            case "alpha_numeric_space": {
                let regexpvalidate = new ATPAR_VALIDATION_RULES();
                regexpvalidate.ValidationType = "regExp";
                regexpvalidate.validationFormat = "alpha_numeric_space";
                regexpvalidate.ErrorMessage = "Allows Alphabets, numbers, spaces";
                return regexpvalidate;
            }

        }

    }

}
