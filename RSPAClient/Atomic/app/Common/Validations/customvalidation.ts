import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { ATPAR_VALIDATION_RULES } from '../../entities/atpar_validation_rules';

@Injectable()
export class CustomValidations {

    //validationrule: ATPAR_VALIDATION_RULES[];

    constructor() { }

    public validateInput(validationRules: string): ATPAR_VALIDATION_RULES {

        switch (validationRules.toString()) {
            case "Mandatory": {
                let requiredvalidatainrule = new ATPAR_VALIDATION_RULES();
                requiredvalidatainrule.order = 1;
                requiredvalidatainrule.status = false;
                requiredvalidatainrule.ValidationType = "Mandatory";
                requiredvalidatainrule.validationFormat = "";
                requiredvalidatainrule.ErrorMessage = "This Field is Required";
                requiredvalidatainrule.showDiv = true;
                return requiredvalidatainrule;
            }

            case "Min": {
                let Minvalidatainrule = new ATPAR_VALIDATION_RULES();
                Minvalidatainrule.order = 2;
                Minvalidatainrule.status = false;
                Minvalidatainrule.ValidationType = "Min";
                Minvalidatainrule.validationFormat = "2";
                Minvalidatainrule.ErrorMessage = "Minimum length Should be 2 Characters";
                Minvalidatainrule.showDiv = true;
                return Minvalidatainrule;
            }

            case "Max": {
                let Maxvalidatainrule = new ATPAR_VALIDATION_RULES();
                Maxvalidatainrule.order = 3;
                Maxvalidatainrule.status = false;
                Maxvalidatainrule.ValidationType = "Max";
                Maxvalidatainrule.validationFormat = "5";
                Maxvalidatainrule.ErrorMessage = "Maximum length Should be 5 Characters";
                Maxvalidatainrule.showDiv = true;
                return Maxvalidatainrule;
            }

            case "NUMERIC": {
                let Numericvalidatainrule = new ATPAR_VALIDATION_RULES();
                Numericvalidatainrule.order = 4;
                Numericvalidatainrule.status = false;
                Numericvalidatainrule.ValidationType = "Numeric";
                Numericvalidatainrule.validationFormat = "en-AU";
                Numericvalidatainrule.ErrorMessage = "Allows Only Numbers";
                Numericvalidatainrule.showDiv = true;
                return Numericvalidatainrule;
            }

            case "Alpha Numeric": {
                let alphaNumeric = new ATPAR_VALIDATION_RULES();
                alphaNumeric.order = 5;
                alphaNumeric.status = false;
                alphaNumeric.ValidationType = "Alpha Numeric";
                alphaNumeric.validationFormat = "";
                alphaNumeric.ErrorMessage = "Allowed only Alpha Numeric values";
                alphaNumeric.showDiv = true;
                return alphaNumeric;
            }

            case "Email": {
                let alphaNumeric = new ATPAR_VALIDATION_RULES();
                alphaNumeric.order = 6;
                alphaNumeric.status = false;
                alphaNumeric.ValidationType = "Email";
                alphaNumeric.validationFormat = "";
                alphaNumeric.ErrorMessage = "Should be follow Email pattern";
                alphaNumeric.showDiv = true;
                return alphaNumeric;
            }

            case "Range": {
                let alphaNumeric = new ATPAR_VALIDATION_RULES();
                alphaNumeric.order = 7;
                alphaNumeric.status = false;
                alphaNumeric.ValidationType = "Range";
                alphaNumeric.validationFormat = "";
                alphaNumeric.ErrorMessage = "Range in between values";
                alphaNumeric.showDiv = true;
                return alphaNumeric;
            }

            case "Digit": {
                let alphaNumeric = new ATPAR_VALIDATION_RULES();
                alphaNumeric.order = 8;
                alphaNumeric.status = false;
                alphaNumeric.ValidationType = "Digit";
                alphaNumeric.validationFormat = "";
                alphaNumeric.ErrorMessage = "Allowed only Digit values";
                alphaNumeric.showDiv = true;
                return alphaNumeric;
            }

            case "Date": {
                let alphaNumeric = new ATPAR_VALIDATION_RULES();
                alphaNumeric.order = 9;
                alphaNumeric.status = false;
                alphaNumeric.ValidationType = "Date";
                alphaNumeric.validationFormat = "";
                alphaNumeric.ErrorMessage = "Enter correct Date formate";
                alphaNumeric.showDiv = true;
                return alphaNumeric;
            }

            case "MinDate": {
                let alphaNumeric = new ATPAR_VALIDATION_RULES();
                alphaNumeric.order = 10;
                alphaNumeric.status = false;
                alphaNumeric.ValidationType = "MinDate";
                alphaNumeric.validationFormat = "";
                alphaNumeric.ErrorMessage = "Enter correct Date formate";
                alphaNumeric.showDiv = true;
                return alphaNumeric;
            }

            case "Equal": {
                let alphaNumeric = new ATPAR_VALIDATION_RULES();
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
                    let custValidationRule = new ATPAR_VALIDATION_RULES();
                    custValidationRule.order = 11;
                    custValidationRule.status = false;
                    custValidationRule.ValidationType = validationRules.toString();
                    custValidationRule.validationFormat = "";
                    custValidationRule.ErrorMessage = "Custom Validation";
                    custValidationRule.showDiv = true;
                    return custValidationRule;
                }


        }

    }
}
