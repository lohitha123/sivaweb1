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
var core_2 = require("@angular/core");
var UI_SWITCH_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return SwitchComponent; }),
    multi: true
};
var SwitchComponent = (function () {
    function SwitchComponent() {
        this.onTouchedCallback = function (v) {
        };
        this.onChangeCallback = function (v) {
        };
        this._checked = false;
        this.check = 'VALID';
        this.size = 'medium';
        this.change = new core_1.EventEmitter();
        this.color = '#6c276a';
        this.switchOffColor = '';
        this.switchColor = '#fff';
        this.defaultBgColor = '#fff';
        this.defaultBoColor = '#dfdfdf';
    }
    Object.defineProperty(SwitchComponent.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        set: function (v) {
            this._checked = v !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwitchComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (v) {
            this._disabled = v !== false;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(SwitchComponent.prototype, "reverse", {
        get: function () {
            return this._reverse;
        },
        set: function (v) {
            this._reverse = v !== false;
        },
        enumerable: true,
        configurable: true
    });
    ;
    SwitchComponent.prototype.getColor = function (flag) {
        if (flag === 'borderColor')
            return this.defaultBoColor;
        if (flag === 'switchColor') {
            if (this.reverse)
                return !this.checked ? this.switchColor : this.switchOffColor || this.switchColor;
            return this.checked ? this.switchColor : this.switchOffColor || this.switchColor;
        }
        if (this.reverse)
            return !this.checked ? this.color : this.defaultBgColor;
        return this.checked ? this.color : this.defaultBgColor;
    };
    SwitchComponent.prototype.onToggle = function () {
        if (this.disabled)
            return;
        if (this.check == 'VALID') {
            this.checked = !this.checked;
        }
        this.onChangeCallback(this.checked);
        this.onTouchedCallback(this.checked);
        this.change.emit(this.checked);
    };
    SwitchComponent.prototype.writeValue = function (obj) {
        if (obj != null) {
            if (obj == "False") {
                obj = false;
            }
            if (obj == "True") {
                obj = true;
            }
        }
        if (obj !== this.checked) {
            this.checked = !!obj;
        }
    };
    SwitchComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    SwitchComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SwitchComponent.prototype, "checked", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SwitchComponent.prototype, "disabled", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SwitchComponent.prototype, "reverse", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SwitchComponent.prototype, "check", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SwitchComponent.prototype, "size", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], SwitchComponent.prototype, "change", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SwitchComponent.prototype, "color", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SwitchComponent.prototype, "switchOffColor", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SwitchComponent.prototype, "switchColor", void 0);
    __decorate([
        core_1.HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SwitchComponent.prototype, "onToggle", null);
    SwitchComponent = __decorate([
        core_1.Component({
            selector: 'atpar-switch',
            template: "\n  <span class=\"switch\" \n\n  [class.checked]=\"checked\" \n  [class.disabled]=\"disabled\"\n  [class.switch-large]=\"size === 'large'\"\n  [class.switch-medium]=\"size === 'medium'\"\n  [class.switch-small]=\"size === 'small'\"\n  [style.background-color]=\"getColor()\"\n  [style.border-color]=\"getColor('borderColor')\"\n  >\n  <small [style.background]=\"getColor('switchColor')\">\n  </small>\n  </span>\n  ",
            styles: ["\n    .switch {\n    border: 1px solid #6c276a!important;\n    position: relative;\n    display: inline-block;\n    box-sizing: content-box;\n    overflow: visible;\n    padding: 0;\n    margin: 0;            \n    cursor: pointer;\n    box-shadow: rgb(223, 223, 223) 0 0 0 0 inset;\n    transition: 0.3s ease-out all;\n    -webkit-transition: 0.3s ease-out all;\n    }        \n\n    small {\n    border-radius: 100%;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);          \n    position: absolute;\n    top: 0;\n    left: 0;\n    transition: 0.3s ease-out all;\n    -webkit-transition: 0.3s ease-out all;\n    }\n\n    .switch-large {\n        width: 66px;\n        height: 40px;\n        border-radius: 40px;\n    }\n\n    .switch-large small {\n        width: 40px;\n        height: 40px;\n    }\n\n    .switch-medium {\n        width: 30px;\n        height: 12px;\n        border-radius: 50px;\n        margin: 8px 0 0px 0;\n    }\n\n    .switch-medium small {\n    width: 14px;\n    height: 14px;\n    margin-top: -1px;\n    border: 1px solid #6c276a;\n    }\n\n    .switch-small {\n        width: 33px;\n        height: 20px;\n        border-radius: 20px;\n    }\n\n    .switch-small small {\n    width: 20px;\n    height: 20px;\n    }\n\n    .checked {\n    background: #6c276a;\n    border-color: #6c276a;\n    }\n\n    .switch-large.checked small {\n    left: 26px;\n    }\n\n    .switch-medium.checked small {\n    left: 17px;\n    }\n\n    .switch-small.checked small {\n    left: 13px;\n    }\n\n    .disabled {\n    opacity: .50;\n    cursor: not-allowed;\n    }\n    "],
            providers: [UI_SWITCH_CONTROL_VALUE_ACCESSOR]
        })
    ], SwitchComponent);
    return SwitchComponent;
}());
exports.SwitchComponent = SwitchComponent;
var SwitchModule = (function () {
    function SwitchModule() {
    }
    SwitchModule = __decorate([
        core_2.NgModule({
            declarations: [SwitchComponent],
            exports: [SwitchComponent]
        })
    ], SwitchModule);
    return SwitchModule;
}());
exports.SwitchModule = SwitchModule;
//# sourceMappingURL=switch.js.map