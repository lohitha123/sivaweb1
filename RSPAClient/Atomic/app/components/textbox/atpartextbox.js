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
    useExisting: core_1.forwardRef(function () { return AtParTextBoxComponent; }),
    multi: true
};
var AtParTextBoxComponent = (function () {
    function AtParTextBoxComponent() {
        this.disabled = false;
        this.ontxtchange = new core_1.EventEmitter();
        this.ShowValidations = false;
        this.model = {};
        this.visibleText = false;
        this.vRule = false;
        //The internal data model
        this.innerValue = '';
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(AtParTextBoxComponent.prototype, "value", {
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
    AtParTextBoxComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    //From ControlValueAccessor interface
    AtParTextBoxComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    //From ControlValueAccessor interface
    AtParTextBoxComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    AtParTextBoxComponent.prototype.focusEvent = function (focuson) {
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
    AtParTextBoxComponent.prototype.handleBlur = function (event) {
        if (!this.vRule) {
            event.target.style.border = "1px solid #ff0000";
        }
        else {
            event.target.style.border = "0px";
        }
    };
    AtParTextBoxComponent.prototype.handelInput = function (e) {
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
        }
    };
    AtParTextBoxComponent.prototype.onKey = function (event) {
        this.ontxtchange.emit(this.value);
        this.onTouchedCallback();
    };
    return AtParTextBoxComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AtParTextBoxComponent.prototype, "paramvalue", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], AtParTextBoxComponent.prototype, "validationrules", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AtParTextBoxComponent.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], AtParTextBoxComponent.prototype, "readonly", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AtParTextBoxComponent.prototype, "ontxtchange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AtParTextBoxComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AtParTextBoxComponent.prototype, "modelstring", void 0);
AtParTextBoxComponent = __decorate([
    core_1.Component({
        selector: 'atpar-textbox',
        templateUrl: './app/components/textbox/atpar-textbox.html',
        styleUrls: ["/assets/css/style.css"],
        providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
    })
], AtParTextBoxComponent);
exports.AtParTextBoxComponent = AtParTextBoxComponent;
//# sourceMappingURL=atpartextbox.js.map