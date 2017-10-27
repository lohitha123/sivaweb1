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
var forms_1 = require("@angular/forms");
var customvalidations_1 = require("./customvalidations");
var Validators_1 = require("./Validators");
var noop = function () { };
var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return AtParTextForGridComponent; }),
    multi: true
};
var AtParTextForGridComponent = (function () {
    function AtParTextForGridComponent() {
        this.paramval = "";
        this.disabled = false;
        this.readonly = false;
        this.bindModelDataChange = new core_1.EventEmitter();
        this.ShowValidations = false;
        this.showerror = false;
        this.convertToUpper = false;
        this.onchange = new core_1.EventEmitter();
        this.vRule = false;
        this.errormessage = '';
        //The internal data model
        this.innerValue = '';
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(AtParTextForGridComponent.prototype, "value", {
        //get accessor
        get: function () {
            return this.innerValue;
        },
        //set accessor including call the onchange callback
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.paramval = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    AtParTextForGridComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    //From ControlValueAccessor interface
    AtParTextForGridComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    //From ControlValueAccessor interface
    AtParTextForGridComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    AtParTextForGridComponent.prototype.ngOnInit = function () {
        this.validationrules = new Array();
        this.customValidations = new customvalidations_1.CustomValidations();
        if (this.validations != null || this.validations != undefined) {
            for (var x = 0; x < this.validations.split(',').length; x++) {
                var rule = this.validations.split(',')[x].toString().trim();
                var validationRule = this.customValidations.validateInput(rule, '');
                if (validationRule != null && validationRule != undefined) {
                    this.validationrules.push(validationRule);
                }
            }
        }
        if (this.isFocused == "true" && this.id != undefined) {
            this.focusEvent(false);
            this.focusEvent(true);
            this.isFocusedID = this.id;
        }
        this.isFocused = "";
    };
    AtParTextForGridComponent.prototype.focusEvent = function (focuson) {
        this.ShowValidations = focuson;
    };
    AtParTextForGridComponent.prototype.handelInput = function (e) {
        var orgVal = "";
        if (this.value != undefined && e.key != undefined) {
            orgVal = this.value + e.key;
        }
        else if (e.key != undefined) {
            orgVal = e.key;
        }
        else {
            orgVal = this.value;
            orgVal = e.char;
        }
        var customValidations = this.validationrules.filter(function (x) { return x.ValidationType == ""; });
        if (customValidations != null && customValidations != undefined) {
            for (var x = 0; x < customValidations.length; x++) {
                var rulename = customValidations[x].validationFormat;
                if (!Validators_1.regExpValidator(customValidations[x].validationFormat, orgVal)) {
                    this.vRule = true;
                    break;
                }
            }
        }
        if (this.vRule) {
            this.vRule = false;
            return false;
        }
        if (this.validationrules != null && this.validationrules != undefined && this.validationrules.length > 0) {
            this.validatenumbers = this.validationrules.filter(function (x) { return x.ValidationType == "Numeric" || x.ValidationType == "Number"; })[0];
            if (this.validatenumbers != null) {
                var charCode = (e.which) ? e.which : e.keyCode;
                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    this.validatenumbers.status = false;
                    return false;
                }
                this.validatenumbers.status = true;
            }
            this.Maxlength = this.validationrules.filter(function (x) { return x.ValidationType == "Max"; })[0];
            if (this.Maxlength != null) {
                this.maxvalue = this.Maxlength.validationFormat;
                //if (this.paramval.length >= this.Maxlength.validationFormat) {
                //    return false;
                //}
            }
            this.validateDecimal = this.validationrules.filter(function (x) { return x.ValidationType == "numeric_dot"; })[0];
            if (this.validateDecimal != null) {
                e = (e) ? e : window.event;
                var charCode = (e.which) ? e.which : e.keyCode;
                if (charCode == 8) {
                    this.validateDecimal.status = true;
                    return true;
                }
                else if (charCode == 46 && this.value.indexOf('.') != -1) {
                    this.validateDecimal.status = false;
                    return false;
                }
                else if (charCode > 31 && charCode != 46 && (charCode < 48 || charCode > 57)) {
                    this.validateDecimal.status = false;
                    return false;
                }
                this.validateDecimal.status = true;
                return true;
            }
            this.onlycaps = this.validationrules.filter(function (x) { return x.ValidationType == "caps_only_key_res"; })[0];
            if (this.onlycaps != null) {
                var charCode = (e.which) ? e.which : e.keyCode;
                if (charCode < 65 || charCode > 90) {
                    this.onlycaps.status = false;
                    return false;
                }
                this.onlycaps.status = true;
                return true;
            }
        }
    };
    AtParTextForGridComponent.prototype.onKey = function (event) {
        //Required Field Validator
        if (this.value != null || this.value != "") {
            if (this.value != undefined) {
                if (this.convertToUpper) {
                    this.value = this.value.toUpperCase();
                }
                this.paramval = this.value.toString();
            }
        }
        if (event.type === "paste" || event.type === "cut") {
            this.paramval = this.copiedValue;
        }
        this.Req = this.validationrules.filter(function (x) { return x.ValidationType == "Mandatory"; })[0];
        if (this.Req != null) {
            if (this.paramval != "" && this.paramval.length > 0 && this.paramval != undefined && this.paramval != null) {
                this.Req.status = true;
                this.showerror = false;
            }
            else {
                if (this.paramval == "") {
                    // this.errormessage = "";
                    this.showerror = false;
                    this.Req.status = false;
                }
                else {
                    this.Req.status = false;
                    this.showerror = true;
                }
                this.Emitbeforereturn();
                return;
            }
        }
        //minimum Length Validator
        this.min = this.validationrules.filter(function (x) { return x.ValidationType == "Min"; })[0];
        if (this.min != null) {
            if (Validators_1.minLenValidator(parseInt(this.min.validationFormat), this.paramval.length)) {
                this.min.status = true;
                this.showerror = false;
            }
            else {
                if (this.paramval == "") {
                    this.min.status = true;
                    this.errormessage = "";
                    this.showerror = false;
                }
                else {
                    this.showerror = true;
                    this.errormessage = "Invalid Length";
                    this.min.status = false;
                }
                this.Emitbeforereturn();
                return;
            }
        }
        //maximum Length Validator
        this.max = this.validationrules.filter(function (x) { return x.ValidationType == "Max"; })[0];
        if (this.max != null) {
            if (Validators_1.maxlenValidator(parseInt(this.max.validationFormat), this.paramval.length)) {
                this.showerror = false;
                this.max.status = true;
            }
            else {
                if (this.paramval == "") {
                    this.max.status = true;
                    this.errormessage = "";
                    this.showerror = false;
                }
                else {
                    this.showerror = true;
                    this.errormessage = "Invalid Length";
                    this.max.status = false;
                }
                this.Emitbeforereturn();
                return;
            }
        }
        //regular expression Validator
        this.rules = this.validationrules.filter(function (x) { return x.ValidationType == "regExp"; })[0];
        if (this.rules != null) {
            if (Validators_1.regExpValidator(this.rules.validationFormat, this.paramval)) {
                this.showerror = false;
                this.rules.status = true;
            }
            else {
                if (this.paramval == "") {
                    this.rules.status = true;
                    this.errormessage = "";
                    this.showerror = false;
                }
                else {
                    this.showerror = true;
                    if (this.rules.validationFormat == "numeric_10" || this.rules.validationFormat == "numeric") {
                        this.errormessage = "Invalid";
                    }
                    else {
                        this.errormessage = "Invalid Character";
                    }
                    this.rules.status = false;
                }
                this.Emitbeforereturn();
                return;
            }
        }
        this.validatenumbers = this.validationrules.filter(function (x) { return x.ValidationType == "Numeric"; })[0];
        if (this.validatenumbers != null) {
            if (Validators_1.regExpValidator("numeric", this.paramval)) {
                this.showerror = false;
                this.validatenumbers.status = true;
            }
            else {
                this.showerror = true;
                this.errormessage = "Invalid";
                this.validatenumbers.status = false;
                this.Emitbeforereturn();
                return;
            }
            //var val = parseInt(this.paramval);
            //if (val == NaN) {
            //    this.validatenumbers.status = false;
            //} else {
            //    this.validatenumbers.status = true;
            //}
        }
        //Email Validator
        this.EmailStatus = this.validationrules.filter(function (x) { return x.ValidationType == "Email"; })[0];
        if (this.EmailStatus != null) {
            if (Validators_1.Email(this.paramval)) {
                this.showerror = false;
                this.EmailStatus.status = true;
            }
            else {
                if (this.paramval == "") {
                    this.EmailStatus.status = true;
                    this.errormessage = "";
                    this.showerror = false;
                }
                else {
                    this.showerror = true;
                    this.errormessage = "Invalid Email";
                    this.EmailStatus.status = false;
                }
                this.Emitbeforereturn();
                return;
            }
        }
        //phone Validator
        this.PhoneStatus = this.validationrules.filter(function (x) { return x.ValidationType == "Phone"; })[0];
        if (this.PhoneStatus != null) {
            if (Validators_1.Phone(this.paramval)) {
                this.showerror = false;
                this.PhoneStatus.status = true;
            }
            else {
                if (this.paramval == "") {
                    this.PhoneStatus.status = true;
                    this.errormessage = "";
                    this.showerror = false;
                }
                else {
                    this.showerror = true;
                    this.errormessage = "Invalid Phone number";
                    this.PhoneStatus.status = false;
                }
                this.Emitbeforereturn();
                return;
            }
        }
        //Zip Validator
        this.ZipStatus = this.validationrules.filter(function (x) { return x.ValidationType == "Zipcode"; })[0];
        if (this.ZipStatus != null) {
            if (Validators_1.ZipCode(this.paramval)) {
                this.showerror = false;
                this.ZipStatus.status = true;
            }
            else {
                if (this.paramval == "") {
                    this.ZipStatus.status = true;
                    this.errormessage = "";
                    this.showerror = false;
                }
                else {
                    this.showerror = true;
                    this.errormessage = "Invalid Zip Code";
                    this.ZipStatus.status = false;
                }
                this.Emitbeforereturn();
                return;
            }
        }
        //Fax Validator
        this.FaxStatus = this.validationrules.filter(function (x) { return x.ValidationType == "Fax"; })[0];
        if (this.FaxStatus != null) {
            if (Validators_1.Fax(this.paramval)) {
                this.showerror = false;
                this.FaxStatus.status = true;
            }
            else {
                if (this.paramval == "") {
                    this.FaxStatus.status = true;
                    this.errormessage = "";
                    this.showerror = false;
                }
                else {
                    this.showerror = true;
                    this.errormessage = "Invalid Fax number";
                    this.FaxStatus.status = false;
                }
                this.Emitbeforereturn();
                return;
            }
        }
        //RangeLengthValidator
        this.rangelength = this.validationrules.filter(function (x) { return x.ValidationType == "Range"; })[0];
        if (this.rangelength != null) {
            if (Validators_1.RangeLengthValidator(this.rangelength.validationFormat, this.paramval)) {
                this.showerror = false;
                this.rangelength.status = true;
            }
            else {
                if (this.paramval == "") {
                    this.rangelength.status = true;
                    this.errormessage = "";
                    this.showerror = false;
                }
                else {
                    this.showerror = true;
                    this.errormessage = "Invalid Range";
                    this.rangelength.status = false;
                }
                this.Emitbeforereturn();
                return;
            }
        }
        //Digits Validator
        this.digitsstatus = this.validationrules.filter(function (x) { return x.ValidationType == "Digit"; })[0];
        if (this.digitsstatus != null) {
            if (Validators_1.DigitsValidator(this.paramval)) {
                this.showerror = false;
                this.digitsstatus.status = true;
            }
            else {
                if (this.paramval == "") {
                    this.digitsstatus.status = true;
                    this.errormessage = "";
                    this.showerror = false;
                }
                else {
                    this.showerror = true;
                    this.errormessage = "Invalid Digit";
                    this.digitsstatus.status = false;
                }
                this.Emitbeforereturn();
                return;
            }
        }
        //Number Validator
        this.numberstatus = this.validationrules.filter(function (x) { return x.ValidationType == "Number"; })[0];
        if (this.numberstatus != null) {
            if (Validators_1.NumberValidator(this.paramval)) {
                this.showerror = false;
                this.numberstatus.status = true;
            }
            else {
                if (this.paramval == "") {
                    this.numberstatus.status = true;
                    this.errormessage = "";
                    this.showerror = false;
                }
                else {
                    this.showerror = true;
                    this.errormessage = "Invalid Number";
                    this.numberstatus.status = false;
                }
                this.Emitbeforereturn();
                return;
            }
        }
        //url Validator
        this.urlstatus = this.validationrules.filter(function (x) { return x.ValidationType == "URL"; })[0];
        if (this.urlstatus != null) {
            if (Validators_1.UrlValidator(this.paramval)) {
                this.showerror = false;
                this.urlstatus.status = true;
            }
            else {
                if (this.paramval == "") {
                    this.urlstatus.status = true;
                    this.errormessage = "";
                    this.showerror = false;
                }
                else {
                    this.urlstatus.status = false;
                    this.errormessage = "Invalid URL Format";
                    this.showerror = true;
                }
                this.Emitbeforereturn();
                return;
            }
        }
        //Date Validator
        this.datestatus = this.validationrules.filter(function (x) { return x.ValidationType == "Date"; })[0];
        if (this.datestatus != null) {
            if (Validators_1.DateValidator(this.paramval)) {
                this.datestatus.status = true;
                this.showerror = false;
            }
            else {
                if (this.paramval == "") {
                    this.datestatus.status = true;
                    this.errormessage = "";
                    this.showerror = false;
                }
                else {
                    this.datestatus.status = false;
                    this.errormessage = "Invalid Date Format";
                    this.showerror = true;
                }
                this.Emitbeforereturn();
                return;
            }
        }
        //Min Date Validator
        this.mindatestatus = this.validationrules.filter(function (x) { return x.ValidationType == "MinDate"; })[0];
        if (this.mindatestatus != null) {
            if (Validators_1.MinDateValidator(this.mindatestatus.validationFormat, this.paramval)) {
                this.mindatestatus.status = true;
                this.showerror = false;
            }
            else {
                if (this.paramval == "") {
                    this.mindatestatus.status = true;
                    this.errormessage = "";
                    this.showerror = false;
                }
                else {
                    this.mindatestatus.status = false;
                    this.errormessage = "Invalid Date";
                    this.showerror = true;
                }
                this.Emitbeforereturn();
                return;
            }
        }
        //Max Date Validator
        this.maxdatestatus = this.validationrules.filter(function (x) { return x.ValidationType == "MaxDate"; })[0];
        if (this.maxdatestatus != null) {
            if (Validators_1.MaxDateValidator(this.maxdatestatus.validationFormat, this.paramval)) {
                this.maxdatestatus.status = true;
                this.showerror = false;
            }
            else {
                if (this.paramval == "") {
                    this.maxdatestatus.status = true;
                    this.errormessage = "";
                    this.showerror = false;
                }
                else {
                    this.maxdatestatus.status = false;
                    this.errormessage = "Invalid Date";
                    this.showerror = true;
                }
                this.Emitbeforereturn();
                return;
            }
        }
        //equal validator
        this.equalstatus = this.validationrules.filter(function (x) { return x.ValidationType == "Equal"; })[0];
        if (this.equalstatus != null) {
            if (Validators_1.EqualValidator(this.equalstatus.validationFormat, this.paramval)) {
                this.showerror = false;
                this.equalstatus.status = true;
            }
            else {
                if (this.paramval == "") {
                    this.equalstatus.status = true;
                    this.errormessage = "";
                    this.showerror = false;
                }
                else {
                    this.equalstatus.status = false;
                    this.errormessage = "Invalid";
                    this.showerror = true;
                }
                this.Emitbeforereturn();
                return;
            }
        }
        //Output Emitting
        this.bindModelDataChange.emit({ val: this.paramval, TextBoxID: this.id, validationrules: this.validationrules });
        this.onchange.emit({ val: this.paramval, TextBoxID: this.id });
    };
    AtParTextForGridComponent.prototype.onCutPaste = function (event) {
        this.copiedValue = event.clipboardData.getData("text");
        this.onKey(event);
    };
    //For left border color of the textbox
    AtParTextForGridComponent.prototype.ngAfterViewInit = function () {
        this.xReq = this.validationrules.filter(function (x) { return x.ValidationType == "Mandatory"; })[0];
        if (this.xReq != null) {
            // document.getElementById(this.id).classList.add('bdr-red');
            // document.getElementById(this.id).classList.add('');
            var node = document.createElement("span");
            node.setAttribute("class", "text-danger grid-mandatory");
            var textnode = document.createTextNode("*");
            var sp2 = document.getElementById(this.id);
            var parentDiv = sp2.parentNode;
            node.appendChild(textnode);
            document.getElementById(this.id).appendChild(node);
            parentDiv.insertBefore(node, sp2);
        }
        else {
            // document.getElementById(this.id).classList.add('bdr-purple');
            var node = document.createElement("span");
            node.setAttribute("class", "grid-mandatory-white");
            var textnode = document.createTextNode("*");
            var sp2 = document.getElementById(this.id);
            var parentDiv = sp2.parentNode;
            node.appendChild(textnode);
            document.getElementById(this.id).appendChild(node);
            parentDiv.insertBefore(node, sp2);
        }
        if (this.isFocusedID != null && this.isFocusedID != undefined) {
            document.getElementById(this.isFocusedID).focus();
        }
    };
    AtParTextForGridComponent.prototype.Emitbeforereturn = function () {
        this.bindModelDataChange.emit({ val: this.paramval, TextBoxID: this.id, validationrules: this.validationrules });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AtParTextForGridComponent.prototype, "validationrules", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AtParTextForGridComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AtParTextForGridComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AtParTextForGridComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AtParTextForGridComponent.prototype, "bindModelDataChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AtParTextForGridComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AtParTextForGridComponent.prototype, "convertToUpper", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AtParTextForGridComponent.prototype, "onchange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AtParTextForGridComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AtParTextForGridComponent.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AtParTextForGridComponent.prototype, "validations", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AtParTextForGridComponent.prototype, "isFocused", void 0);
    AtParTextForGridComponent = __decorate([
        core_1.Component({
            selector: 'atpar-text-grid',
            templateUrl: 'atpar-text.html',
            styleUrls: ['style.css'],
            providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        })
    ], AtParTextForGridComponent);
    return AtParTextForGridComponent;
}());
exports.AtParTextForGridComponent = AtParTextForGridComponent;
//# sourceMappingURL=atpartextforgrid.js.map