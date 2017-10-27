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
exports.RADIO_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return LargeRadioButton; }),
    multi: true
};
var LargeRadioButton = (function () {
    function LargeRadioButton(cd) {
        this.cd = cd;
        this.onClick = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.check = 'VALID';
    }
    LargeRadioButton.prototype.ngAfterViewInit = function () {
        this.input = this.inputViewChild.nativeElement;
    };
    LargeRadioButton.prototype.handleClick = function () {
        if (!this.disabled) {
            this.onClick.emit(null);
            if (this.check == 'VALID') {
                this.select();
            }
        }
    };
    LargeRadioButton.prototype.select = function () {
        if (!this.disabled) {
            this.input.checked = true;
            this.checked = true;
            this.onModelChange(this.value);
        }
    };
    LargeRadioButton.prototype.writeValue = function (value) {
        if (value != null && value != '') {
            this.onClick.emit(value);
            this.checked = (value.toString().toUpperCase() == this.value.toUpperCase());
        }
        else {
            this.checked = false;
        }
        if (this.input) {
            this.input.checked = this.checked;
        }
        this.cd.markForCheck();
    };
    LargeRadioButton.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    LargeRadioButton.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    LargeRadioButton.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    LargeRadioButton.prototype.onFocus = function (event) {
        this.focused = true;
    };
    LargeRadioButton.prototype.onBlur = function (event) {
        this.focused = false;
        this.onModelTouched();
    };
    LargeRadioButton.prototype.onChange = function (event) {
        this.select();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LargeRadioButton.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LargeRadioButton.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LargeRadioButton.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LargeRadioButton.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], LargeRadioButton.prototype, "tabindex", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LargeRadioButton.prototype, "onClick", void 0);
    __decorate([
        core_1.ViewChild('rb'),
        __metadata("design:type", core_1.ElementRef)
    ], LargeRadioButton.prototype, "inputViewChild", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LargeRadioButton.prototype, "check", void 0);
    LargeRadioButton = __decorate([
        core_1.Component({
            selector: 'atpar-large-radiobutton',
            templateUrl: 'largeradiobutton.html',
            styleUrls: ['largeradiobutton.css'],
            providers: [exports.RADIO_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], LargeRadioButton);
    return LargeRadioButton;
}());
exports.LargeRadioButton = LargeRadioButton;
var LargeRadioButtonModule = (function () {
    function LargeRadioButtonModule() {
    }
    LargeRadioButtonModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [LargeRadioButton],
            declarations: [LargeRadioButton]
        })
    ], LargeRadioButtonModule);
    return LargeRadioButtonModule;
}());
exports.LargeRadioButtonModule = LargeRadioButtonModule;
//# sourceMappingURL=largeradiobutton.js.map