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
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
exports.RADIO_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return Radio; }),
    multi: true
};
var Radio = (function () {
    function Radio(cd) {
        this.cd = cd;
        this.onClick = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Radio.prototype.handleClick = function () {
        if (!this.disabled) {
            this.select();
        }
    };
    Radio.prototype.select = function () {
        if (!this.disabled) {
            this.onClick.emit(null);
            this.inputViewChild.nativeElement.checked = true;
            this.checked = true;
            this.onModelChange(this.value);
        }
    };
    Radio.prototype.writeValue = function (value) {
        this.checked = (value == this.value);
        if (this.inputViewChild.nativeElement) {
            this.inputViewChild.nativeElement.checked = this.checked;
        }
        this.cd.markForCheck();
    };
    Radio.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Radio.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Radio.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Radio.prototype.onFocus = function (event) {
        this.focused = true;
    };
    Radio.prototype.onBlur = function (event) {
        this.focused = false;
        this.onModelTouched();
    };
    Radio.prototype.onChange = function (event) {
        this.select();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Radio.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Radio.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Radio.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Radio.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Radio.prototype, "tabindex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Radio.prototype, "inputId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Radio.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Radio.prototype, "styleClass", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Radio.prototype, "onClick", void 0);
    __decorate([
        core_1.ViewChild('rb'),
        __metadata("design:type", core_1.ElementRef)
    ], Radio.prototype, "inputViewChild", void 0);
    Radio = __decorate([
        core_1.Component({
            selector: 'p-radioButton',
            template: "\n        <div [ngStyle]=\"style\" [ngClass]=\"'ui-radiobutton ui-widget'\" [class]=\"styleClass\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #rb type=\"radio\" [attr.id]=\"inputId\" [attr.name]=\"name\" [attr.value]=\"value\" [attr.tabindex]=\"tabindex\" \n                    [checked]=\"checked\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\">\n            </div>\n            <div (click)=\"handleClick()\" \n                [ngClass]=\"{'ui-radiobutton-box ui-widget ui-state-default':true,\n                'ui-state-active':rb.checked,'ui-state-disabled':disabled,'ui-state-focus':focused}\">\n                <span class=\"ui-radiobutton-icon ui-clickable\" [ngClass]=\"{'fa fa-circle':rb.checked}\"></span>\n            </div>\n        </div>\n        <label class=\"ui-radiobutton-label\" (click)=\"select()\" \n            [ngClass]=\"{'ui-label-active':rb.checked,'ui-label-disabled':disabled,'ui-label-focus':focused}\"\n            *ngIf=\"label\" [attr.for]=\"inputId\">{{label}}</label>\n    ",
            styles: ["\n       .ui-radiobutton {\n    display:inline-block;\n    cursor: pointer;\n    vertical-align: middle;\n    margin-right: .25em;\n}\n\n.ui-radiobutton-box {\n    width: 1.125em;\n    height: 1.125em;\n    line-height: 1.125em;\n    -moz-border-radius: 100%;\n    -webkit-border-radius: 100%;\n    border-radius: 100%;\n    text-align: center;\n    border: 1px solid #6c276a!important;\n}\n\n.ui-radiobutton-icon {\n    display: block;\n    font-size: .5em;\n    line-height: inherit;\n    margin-top: 0px;\n    color:#6c276a!important;\n}\n \n.ui-radiobutton, .ui-radiobutton-label {\n    vertical-align: middle;\n     \n}\n.ui-radiobutton-label\n{\n  cursor:pointer!important;\n  margin: 0px 4px -2px 5px!important;\n}\n\n      "],
            providers: [exports.RADIO_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], Radio);
    return Radio;
}());
exports.Radio = Radio;
var RadioModule = (function () {
    function RadioModule() {
    }
    RadioModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [Radio],
            declarations: [Radio]
        })
    ], RadioModule);
    return RadioModule;
}());
exports.RadioModule = RadioModule;
//# sourceMappingURL=radio.js.map