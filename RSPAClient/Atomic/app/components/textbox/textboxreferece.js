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
var atpar_validation_rules_1 = require("../../entities/atpar_validation_rules");
//import { User } from './ATPAR_VALIDATION_RULES';
var textboxReference = (function () {
    function textboxReference() {
        this.username = "userName";
        this.password = "Password";
        this.sample = "sample";
        this.First = "TextFirst";
        this.second = "TextSecond";
        this.Third = "Textthird";
        //harika
        this.placeholder = "UserName";
        this.placeholder1 = "Password";
        this.modelstring = "UserID";
        this.modelstring1 = "Pwd";
        this.usr = new User();
        this.usr1 = new User();
        this.usr2 = new User();
        //validations for First TextBox
        this.lstATPAR_VALIDATION_RULES = new Array();
        var requiredvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
        requiredvalidatainrule.order = 1;
        requiredvalidatainrule.status = false;
        requiredvalidatainrule.ValidationType = "Mandatory";
        requiredvalidatainrule.validationFormat = "";
        requiredvalidatainrule.ErrorMessage = "This Field is Required";
        requiredvalidatainrule.showDiv = true;
        var Minvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
        Minvalidatainrule.order = 2;
        Minvalidatainrule.status = false;
        Minvalidatainrule.ValidationType = "Min";
        Minvalidatainrule.validationFormat = "2";
        Minvalidatainrule.ErrorMessage = "Minimum length Should be 2 Characters";
        Minvalidatainrule.showDiv = true;
        var Maxvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
        Maxvalidatainrule.order = 3;
        Maxvalidatainrule.status = false;
        Maxvalidatainrule.ValidationType = "Max";
        Maxvalidatainrule.validationFormat = "5";
        Maxvalidatainrule.ErrorMessage = "Maximum length Should be 5 Characters";
        Maxvalidatainrule.showDiv = true;
        var Numericvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
        Numericvalidatainrule.order = 4;
        Numericvalidatainrule.status = false;
        Numericvalidatainrule.ValidationType = "Numeric";
        Numericvalidatainrule.validationFormat = "en-AU";
        Numericvalidatainrule.ErrorMessage = "Allows Only Numbers";
        Numericvalidatainrule.showDiv = true;
        this.lstATPAR_VALIDATION_RULES.push(requiredvalidatainrule);
        this.lstATPAR_VALIDATION_RULES.push(Minvalidatainrule);
        this.lstATPAR_VALIDATION_RULES.push(Maxvalidatainrule);
        this.lstATPAR_VALIDATION_RULES.push(Numericvalidatainrule);
        this.usr.Validations = this.lstATPAR_VALIDATION_RULES;
        //validations for second TextBox
        this.EmailValidation = new Array();
        var Emailvalidatainrule2 = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
        Emailvalidatainrule2.order = 4;
        Emailvalidatainrule2.status = false;
        Emailvalidatainrule2.ValidationType = "Email";
        Emailvalidatainrule2.validationFormat = "";
        Emailvalidatainrule2.ErrorMessage = "Email Validation";
        Emailvalidatainrule2.showDiv = true;
        var requiredvalidatainrule1 = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
        requiredvalidatainrule1.order = 1;
        requiredvalidatainrule1.status = false;
        requiredvalidatainrule1.ValidationType = "Mandatory";
        requiredvalidatainrule1.validationFormat = "";
        requiredvalidatainrule1.ErrorMessage = "This Field is Required";
        requiredvalidatainrule1.showDiv = true;
        this.EmailValidation.push(requiredvalidatainrule1);
        this.EmailValidation.push(Emailvalidatainrule2);
        this.usr1.Validations = this.EmailValidation;
        //validations for third TextBox
        this.Test = new Array();
        var Digitvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
        Digitvalidatainrule.order = 4;
        Digitvalidatainrule.status = false;
        Digitvalidatainrule.ValidationType = "Digit";
        Digitvalidatainrule.validationFormat = "";
        Digitvalidatainrule.ErrorMessage = "Digit Validation";
        Digitvalidatainrule.showDiv = true;
        var numbervalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
        numbervalidatainrule.order = 4;
        numbervalidatainrule.status = false;
        numbervalidatainrule.ValidationType = "Number";
        numbervalidatainrule.validationFormat = "";
        numbervalidatainrule.ErrorMessage = "Number Validation";
        numbervalidatainrule.showDiv = true;
        var urlvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
        urlvalidatainrule.order = 4;
        urlvalidatainrule.status = false;
        urlvalidatainrule.ValidationType = "URL";
        urlvalidatainrule.validationFormat = "";
        urlvalidatainrule.ErrorMessage = "URL Validation";
        urlvalidatainrule.showDiv = true;
        var datevalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
        datevalidatainrule.order = 4;
        datevalidatainrule.status = false;
        datevalidatainrule.ValidationType = "Date";
        datevalidatainrule.validationFormat = "";
        datevalidatainrule.ErrorMessage = "Date Validation";
        datevalidatainrule.showDiv = true;
        var mindatevalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
        mindatevalidatainrule.order = 4;
        mindatevalidatainrule.status = false;
        mindatevalidatainrule.ValidationType = "MinDate";
        mindatevalidatainrule.validationFormat = "2016-09-09";
        mindatevalidatainrule.ErrorMessage = "Minimum Date Validation";
        mindatevalidatainrule.showDiv = true;
        var maxdatevalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
        maxdatevalidatainrule.order = 4;
        maxdatevalidatainrule.status = false;
        maxdatevalidatainrule.ValidationType = "MaxDate";
        maxdatevalidatainrule.validationFormat = "2017-03-06";
        maxdatevalidatainrule.ErrorMessage = "Maximum Date Validation";
        maxdatevalidatainrule.showDiv = true;
        var equalvalidatainrule = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
        equalvalidatainrule.order = 4;
        equalvalidatainrule.status = false;
        equalvalidatainrule.ValidationType = "Equal";
        equalvalidatainrule.validationFormat = "XXX";
        equalvalidatainrule.ErrorMessage = "equalValidation";
        equalvalidatainrule.showDiv = true;
        var rangevalidatainrule1 = new atpar_validation_rules_1.ATPAR_VALIDATION_RULES();
        rangevalidatainrule1.order = 4;
        rangevalidatainrule1.status = false;
        rangevalidatainrule1.ValidationType = "Range";
        rangevalidatainrule1.validationFormat = [0, 7];
        rangevalidatainrule1.ErrorMessage = "Range Validation";
        rangevalidatainrule1.showDiv = true;
        this.Test.push(urlvalidatainrule);
        this.Test.push(Digitvalidatainrule);
        this.Test.push(numbervalidatainrule);
        this.Test.push(datevalidatainrule);
        this.Test.push(mindatevalidatainrule);
        this.Test.push(maxdatevalidatainrule);
        this.Test.push(equalvalidatainrule);
        this.Test.push(rangevalidatainrule1);
        this.usr2.Validations = this.Test;
    }
    textboxReference.prototype.bindModelDataChange = function (event) {
        if ("userName" == event.paramName.toString()) {
            this.usr.userName = event.val;
        }
        if ("Password" == event.paramName.toString()) {
            this.usr.Password = event.val;
        }
    };
    return textboxReference;
}());
textboxReference = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n\n<atpar-textbox  (bindModelDataChange)=\"bindModelDataChange($event)\" [paramvalue]=\"username\" [validationrules]=\"usr.Validations\" [id]=\"First\"></atpar-textbox>\n<br/>\n<atpar-textbox  (bindModelDataChange)=\"bindModelDataChange($event)\" [paramvalue]=\"password\" [validationrules] = \"usr1.Validations\" [id]=\"second\"></atpar-textbox>\n<br/>\n<atpar-textbox  (bindModelDataChange)=\"bindModelDataChange($event)\" [paramvalue]=\"sample\"  [validationrules] = \"usr2.Validations\" [id]=\"Third\"></atpar-textbox>\n"
    }),
    __metadata("design:paramtypes", [])
], textboxReference);
exports.textboxReference = textboxReference;
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=textboxreferece.js.map