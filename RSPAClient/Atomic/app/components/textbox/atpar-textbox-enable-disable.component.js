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
var forms_1 = require("@angular/forms");
var Validators_1 = require("./Validators");
var noop = function () { };
var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return AtParTextBoxEnableDisableComponent; }),
    multi: true
};
var AtParTextBoxEnableDisableComponent = (function () {
    function AtParTextBoxEnableDisableComponent() {
        this.disabled = false;
        this.ontxtchange = new core_1.EventEmitter();
        this.ShowValidations = false;
        this.model = {};
        this.visibleText = false;
        //The internal data model
        this.innerValue = '';
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(AtParTextBoxEnableDisableComponent.prototype, "value", {
        //get accessor
        get: function () {
            return this.innerValue;
        },
        //set accessor including call the onchange callback
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    AtParTextBoxEnableDisableComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    //From ControlValueAccessor interface
    AtParTextBoxEnableDisableComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    //From ControlValueAccessor interface
    AtParTextBoxEnableDisableComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    AtParTextBoxEnableDisableComponent.prototype.focusEvent = function (focuson) {
        this.ShowValidations = focuson;
        //setting the width of a div as texbox 
        //if (this.ShowValidations == true) {
        //    if (document.getElementById(this.id) != null)
        //    {
        //        this.txtwidth = (document.getElementById(this.id).clientWidth + 1) + "px";
        //    }
        //    if (document.getElementById("div_id_" + this.id) != null)
        //    {
        //        document.getElementById("div_id_" + this.id).style.width = this.txtwidth;
        //    }
        //}
        //harika
        if (this.model.modelstring == "undefined") {
            this.visibleText = !this.visibleText;
        }
        else {
            this.visibleText = true;
        }
        ;
        this.activelabel = this.visibleText ? 'input-disturbed' : 'hide-class';
    };
    AtParTextBoxEnableDisableComponent.prototype.handelInput = function (e) {
        if (this.validationrules != null && this.validationrules != undefined && this.validationrules.length > 0) {
            this.validatenumbers = this.validationrules.filter(function (x) { return x.ValidationType == "Numeric"; })[0];
            this.Maxlength = this.validationrules.filter(function (x) { return x.ValidationType == "Max"; })[0];
            if (this.validatenumbers != null) {
                var charCode = (e.which) ? e.which : e.keyCode;
                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    return false;
                }
            }
            if (this.Maxlength != null) {
                if (this.value.length >= this.Maxlength.validationFormat) {
                    return false;
                }
            }
            var orgVal = void 0;
            if (this.value != undefined) {
                orgVal = this.value + e.char;
            }
            else {
                orgVal = e.char;
            }
            var vRule = void 0;
            var customValidations = this.validationrules.filter(function (x) { return x.ValidationType == ""; });
            if (customValidations != null && customValidations != undefined) {
                for (var x = 0; x < customValidations.length; x++) {
                    if (!Validators_1.regExpValidator(customValidations[x].validationFormat, orgVal)) {
                        vRule = true;
                    }
                }
            }
            if (vRule) {
                return false;
            }
        }
        //this.ontxtchange.emit(this.value);
        //this.onTouchedCallback();
    };
    AtParTextBoxEnableDisableComponent.prototype.onKey = function (event) {
        //let e: any;
        //if (this.validationrules != null && this.validationrules != undefined && this.validationrules.length > 0) {
        //    //Required Field Validator
        //    this.Req = this.validationrules.filter(x => x.ValidationType == "Mandatory")[0];
        //    if (this.Req != null) {
        //        if (this.value != "" && this.value.length > 0) {
        //            this.Req.status = true;
        //            setTimeout(() => {
        //                this.Req.showDiv = false;
        //            }, 500);
        //        }
        //        else {
        //            this.Req.status = false;
        //            this.Req.showDiv = true;
        //        }
        //    }
        //    //Alpha Numeric Field Validator           
        //    this.alphanumeric = this.validationrules.filter(x => x.ValidationType == "Alpha Numeric")[0];
        //    if (this.alphanumeric != null) {
        //        if (this.value != "" && this.value.length > 0) {
        //            if (AlphaNumeric(this.value)) {
        //                this.alphanumeric.status = true;
        //                setTimeout(() => {
        //                    this.alphanumeric.showDiv = false;
        //                }, 500);
        //            }
        //            else {
        //                this.alphanumeric.status = false;
        //                this.alphanumeric.showDiv = true;
        //            }
        //        }
        //        else {
        //            this.alphanumeric.status = false;
        //            this.alphanumeric.showDiv = true;
        //        }
        //    }
        //    //minimum Length Validator
        //    this.min = this.validationrules.filter(x => x.ValidationType == "Min")[0];
        //    if (this.min != null) {
        //        if (minLenValidator(parseInt(this.min.validationFormat), this.value.length)) {
        //            this.min.status = true;
        //            setTimeout(() => {
        //                this.min.showDiv = false;
        //            }, 500);
        //        }
        //        else {
        //            this.min.status = false;
        //            this.min.showDiv = true;
        //        }
        //    }
        //    //maximum Length Validator
        //    this.max = this.validationrules.filter(x => x.ValidationType == "Max")[0];
        //    if (this.max != null) {
        //        if (this.value != "" && this.value.length > 0) {
        //            if (maxlenValidator(parseInt(this.max.validationFormat), this.value.length)) {
        //                this.max.status = true;
        //                setTimeout(() => {
        //                    this.max.showDiv = false;
        //                }, 500);
        //            }
        //            else {
        //                this.max.status = false;
        //                this.max.showDiv = true;
        //            }
        //        }
        //        else {
        //            this.max.status = false;
        //            this.max.showDiv = true;
        //        }
        //    }
        //    //numeric Validator
        //    this.rules = this.validationrules.filter(x => x.ValidationType == "Numeric")[0];
        //    if (this.rules != null) {
        //        if (this.value != "" && this.value.length > 0) {
        //            if (regExpValidator(this.rules.validationFormat, this.value)) {
        //                this.rules.status = true;
        //                setTimeout(() => {
        //                    this.rules.showDiv = false;
        //                }, 500);
        //            }
        //            else {
        //                this.rules.status = false;
        //                this.rules.showDiv = true;
        //            }
        //        }
        //        else {
        //            this.rules.status = false;
        //            this.rules.showDiv = true;
        //        }
        //        return true;
        //    }
        //    //Email Validator
        //    this.EmailStatus = this.validationrules.filter(x => x.ValidationType == "Email")[0];
        //    if (this.EmailStatus != null) {
        //        if (this.value != "" && this.value.length > 0) {
        //            if (Email(this.value)) {
        //                this.EmailStatus.status = true;
        //                setTimeout(() => {
        //                    this.EmailStatus.showDiv = false;
        //                }, 500);
        //            }
        //            else {
        //                this.EmailStatus.status = false;
        //                this.EmailStatus.showDiv = true;
        //            }
        //        }
        //        else {
        //            this.EmailStatus.status = false;
        //            this.EmailStatus.showDiv = true;
        //        }
        //    }
        //    //RangeLengthValidator
        //    this.rangelength = this.validationrules.filter(x => x.ValidationType == "Range")[0];
        //    if (this.rangelength != null) {
        //        if (this.value != "" && this.value.length > 0) {
        //            if (RangeLengthValidator(this.rangelength.validationFormat, this.value)) {
        //                this.rangelength.status = true;
        //                setTimeout(() => {
        //                    this.rangelength.showDiv = false;
        //                }, 500);
        //            }
        //            else {
        //                this.rangelength.status = false;
        //                this.rangelength.showDiv = true;
        //            }
        //        }
        //        else {
        //            this.rangelength.status = false;
        //            this.rangelength.showDiv = true;
        //        }
        //    }
        //    //Digits Validator
        //    this.digitsstatus = this.validationrules.filter(x => x.ValidationType == "Digit")[0];
        //    if (this.digitsstatus != null) {
        //        if (this.value != "" && this.value.length > 0) {
        //            if (DigitsValidator(this.value)) {
        //                this.digitsstatus.status = true;
        //                setTimeout(() => {
        //                    this.digitsstatus.showDiv = false;
        //                }, 500);
        //            }
        //            else {
        //                this.digitsstatus.status = false;
        //                this.digitsstatus.showDiv = true;
        //            }
        //        }
        //        else {
        //            this.digitsstatus.status = false;
        //            this.digitsstatus.showDiv = true;
        //        }
        //    }
        //    //Number Validator
        //    this.numberstatus = this.validationrules.filter(x => x.ValidationType == "Number")[0];
        //    if (this.numberstatus != null) {
        //        if (this.value != "" && this.value.length > 0) {
        //            if (NumberValidator(this.value)) {
        //                this.numberstatus.status = true;
        //                setTimeout(() => {
        //                    this.numberstatus.showDiv = false;
        //                }, 500);
        //            }
        //            else {
        //                this.numberstatus.status = false;
        //                this.numberstatus.showDiv = true;
        //            }
        //        }
        //        else {
        //            this.numberstatus.status = false;
        //            this.numberstatus.showDiv = true;
        //        }
        //    }
        //    //url Validator
        //    this.urlstatus = this.validationrules.filter(x => x.ValidationType == "URL")[0];
        //    if (this.urlstatus != null) {
        //        if (this.value != "" && this.value.length > 0) {
        //            if (UrlValidator(this.value)) {
        //                this.urlstatus.status = true;
        //                setTimeout(() => {
        //                    this.urlstatus.showDiv = false;
        //                }, 500);
        //            }
        //            else {
        //                this.urlstatus.status = false;
        //                this.urlstatus.showDiv = true;
        //            }
        //        }
        //        else {
        //            this.urlstatus.status = false;
        //            this.urlstatus.showDiv = true;
        //        }
        //    }
        //    //Date Validator
        //    this.datestatus = this.validationrules.filter(x => x.ValidationType == "Date")[0];
        //    if (this.datestatus != null) {
        //        if (this.value != "" && this.value.length > 0) {
        //            if (DateValidator(this.value)) {
        //                this.datestatus.status = true;
        //                setTimeout(() => {
        //                    this.datestatus.showDiv = false;
        //                }, 500);
        //            }
        //            else {
        //                this.datestatus.status = false;
        //                this.datestatus.showDiv = true;
        //            }
        //        }
        //        else {
        //            this.datestatus.status = false;
        //            this.datestatus.showDiv = true;
        //        }
        //    }
        //    //Min Date Validator
        //    this.mindatestatus = this.validationrules.filter(x => x.ValidationType == "MinDate")[0];
        //    if (this.mindatestatus != null) {
        //        if (this.value != "" && this.value.length > 0) {
        //            if (MinDateValidator(this.mindatestatus.validationFormat, this.value)) {
        //                this.mindatestatus.status = true;
        //                setTimeout(() => {
        //                    this.mindatestatus.showDiv = false;
        //                }, 500);
        //            }
        //            else {
        //                this.mindatestatus.status = false;
        //                this.mindatestatus.showDiv = true;
        //            }
        //        }
        //        else {
        //            this.mindatestatus.status = false;
        //            this.mindatestatus.showDiv = true;
        //        }
        //    }
        //    //Max Date Validator
        //    this.maxdatestatus = this.validationrules.filter(x => x.ValidationType == "MaxDate")[0];
        //    if (this.maxdatestatus != null) {
        //        if (this.value != "" && this.value.length > 0) {
        //            if (MaxDateValidator(this.maxdatestatus.validationFormat, this.value)) {
        //                this.maxdatestatus.status = true;
        //                setTimeout(() => {
        //                    this.maxdatestatus.showDiv = false;
        //                }, 500);
        //            }
        //            else {
        //                this.maxdatestatus.status = false;
        //                this.maxdatestatus.showDiv = true;
        //            }
        //        }
        //        else {
        //            this.maxdatestatus.status = false;
        //            this.maxdatestatus.showDiv = true;
        //        }
        //    }
        //    //equal validator
        //    this.equalstatus = this.validationrules.filter(x => x.ValidationType == "Equal")[0];
        //    if (this.equalstatus != null) {
        //        if (this.value != "" && this.value.length > 0) {
        //            if (EqualValidator(this.equalstatus.validationFormat, this.value)) {
        //                this.equalstatus.status = true;
        //                setTimeout(() => {
        //                    this.equalstatus.showDiv = false;
        //                }, 500);
        //            }
        //            else {
        //                this.equalstatus.status = false;
        //                this.equalstatus.showDiv = true;
        //            }
        //        }
        //        else {
        //            this.equalstatus.status = false;
        //            this.equalstatus.showDiv = true;
        //        }
        //    }
        //}
        this.ontxtchange.emit(this.value);
        this.onTouchedCallback();
    };
    return AtParTextBoxEnableDisableComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AtParTextBoxEnableDisableComponent.prototype, "paramvalue", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], AtParTextBoxEnableDisableComponent.prototype, "validationrules", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AtParTextBoxEnableDisableComponent.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], AtParTextBoxEnableDisableComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AtParTextBoxEnableDisableComponent.prototype, "ontxtchange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AtParTextBoxEnableDisableComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AtParTextBoxEnableDisableComponent.prototype, "modelstring", void 0);
AtParTextBoxEnableDisableComponent = __decorate([
    core_1.Component({
        selector: 'atpar-textbox-enable-disable',
        templateUrl: './app/components/textbox/atpar-textbox.html',
        styleUrls: ["/assets/css/style.css"],
        providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
    })
], AtParTextBoxEnableDisableComponent);
exports.AtParTextBoxEnableDisableComponent = AtParTextBoxEnableDisableComponent;
//# sourceMappingURL=atpar-textbox-enable-disable.component.js.map