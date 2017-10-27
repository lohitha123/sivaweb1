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
/// <reference path="../../common/dom/domhandler.ts" />
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var sharedComponent_1 = require("../common/sharedComponent");
var domhandler_1 = require("../../common/dom/domhandler");
var forms_1 = require("@angular/forms");
exports.LISTBOX_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return Listbox; }),
    multi: true
};
var Listbox = (function () {
    function Listbox(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.checkbox = false;
        this.filter = false;
        this.onChange = new core_1.EventEmitter();
        this.onDblClick = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.required = false;
    }
    Listbox.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    Listbox.prototype.ngAfterViewInit = function () {
        if (this.required == true) {
            var node = document.createElement("span");
            node.setAttribute("class", "text-danger autocomplete-mandatory");
            var textnode = document.createTextNode("*");
            var sp2 = document.getElementById(this.id);
            var parentDiv = sp2.parentNode;
            node.appendChild(textnode);
            document.getElementById(this.id).appendChild(node);
            parentDiv.insertBefore(node, sp2);
        }
    };
    Listbox.prototype.writeValue = function (value) {
        this.value = value;
    };
    Listbox.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Listbox.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Listbox.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Listbox.prototype.onOptionClick = function (event, option) {
        if (!this.checkboxClick) {
            var metaKey = (event.metaKey || event.ctrlKey);
            var selected = this.isSelected(option);
            if (this.multiple)
                this.onOptionClickMultiple(event, option);
            else
                this.onOptionClickSingle(event, option);
        }
        else {
            this.checkboxClick = false;
        }
    };
    Listbox.prototype.onOptionClickSingle = function (event, option) {
        var metaKey = (event.metaKey || event.ctrlKey);
        var selected = this.isSelected(option);
        var valueChanged = false;
        if (selected) {
            if (metaKey) {
                this.value = null;
                valueChanged = true;
            }
        }
        else {
            this.value = option.value;
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    Listbox.prototype.onOptionClickMultiple = function (event, option) {
        var metaKey = (event.metaKey || event.ctrlKey);
        var selected = this.isSelected(option);
        var valueChanged = false;
        if (selected) {
            if (metaKey) {
                this.value.splice(this.findIndex(option), 1);
            }
            else {
                this.value = [];
                this.value.push(option.value);
            }
            valueChanged = true;
        }
        else {
            this.value = (metaKey) ? this.value || [] : [];
            this.value.push(option.value);
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    Listbox.prototype.isSelected = function (option) {
        var selected = false;
        if (this.multiple) {
            if (this.value) {
                for (var i = 0; i < this.value.length; i++) {
                    if (this.value[i] === option.value) {
                        selected = true;
                        break;
                    }
                }
            }
        }
        else {
            selected = this.value == option.value;
        }
        return selected;
    };
    Listbox.prototype.findIndex = function (option) {
        var index = -1;
        if (this.value) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.domHandler.equals(option.value, this.value[i])) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    Listbox.prototype.isAllChecked = function () {
        if (this.filterValue && this.filterValue.trim().length)
            return this.value && this.visibleOptions && (this.value.length == this.visibleOptions.length);
        else
            return this.value && this.options && (this.value.length == this.options.length);
    };
    Listbox.prototype.onFilter = function (event) {
        this.filterValue = event.target.value.trim().toLowerCase();
        this.visibleOptions = [];
        for (var i = 0; i < this.options.length; i++) {
            var option = this.options[i];
            if (option.label.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1) {
                this.visibleOptions.push(option);
            }
        }
        this.filtered = true;
    };
    Listbox.prototype.toggleAll = function (event, checkbox) {
        if (checkbox.checked) {
            this.value = [];
        }
        else {
            var opts = this.getVisibleOptions();
            if (opts) {
                this.value = [];
                for (var i = 0; i < opts.length; i++) {
                    this.value.push(opts[i].value);
                }
            }
        }
        checkbox.checked = !checkbox.checked;
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
    };
    Listbox.prototype.getVisibleOptions = function () {
        if (this.filterValue && this.filterValue.trim().length) {
            var items = [];
            for (var i = 0; i < this.options.length; i++) {
                var option = this.options[i];
                if (option.label.toLowerCase().includes(this.filterValue.toLowerCase())) {
                    items.push(option);
                }
            }
            return items;
        }
        else {
            return this.options;
        }
    };
    Listbox.prototype.isItemVisible = function (option) {
        if (this.filterValue && this.filterValue.trim().length) {
            for (var i = 0; i < this.visibleOptions.length; i++) {
                if (this.visibleOptions[i].value == option.value) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    };
    Listbox.prototype.onDoubleClick = function (event, option) {
        this.onDblClick.emit({
            originalEvent: event,
            value: this.value
        });
    };
    Listbox.prototype.onCheckboxClick = function (event, option) {
        this.checkboxClick = true;
        var selected = this.isSelected(option);
        if (selected) {
            this.value.splice(this.findIndex(option), 1);
        }
        else {
            this.value = this.value ? this.value : [];
            this.value.push(option.value);
        }
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], Listbox.prototype, "options", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Listbox.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Listbox.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Listbox.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Listbox.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Listbox.prototype, "checkbox", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Listbox.prototype, "filter", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Listbox.prototype, "onChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Listbox.prototype, "onDblClick", void 0);
    __decorate([
        core_1.ContentChildren(sharedComponent_1.PrimeTemplate),
        __metadata("design:type", core_1.QueryList)
    ], Listbox.prototype, "templates", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Listbox.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Listbox.prototype, "required", void 0);
    Listbox = __decorate([
        core_1.Component({
            selector: 'atpar-listbox',
            templateUrl: 'listbox.html',
            providers: [domhandler_1.DomHandler, exports.LISTBOX_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler])
    ], Listbox);
    return Listbox;
}());
exports.Listbox = Listbox;
var ListboxModule = (function () {
    function ListboxModule() {
    }
    ListboxModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, sharedComponent_1.SharedPrimeModule],
            exports: [Listbox, sharedComponent_1.SharedPrimeModule],
            declarations: [Listbox]
        })
    ], ListboxModule);
    return ListboxModule;
}());
exports.ListboxModule = ListboxModule;
//# sourceMappingURL=listbox.js.map