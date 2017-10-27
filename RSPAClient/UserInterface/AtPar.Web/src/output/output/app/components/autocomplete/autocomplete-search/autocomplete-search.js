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
var inputtext_1 = require("../../inputtext/inputtext");
var button_1 = require("../../button/button");
var sharedComponent_1 = require("../../common/sharedComponent");
var domhandler_1 = require("../../../common/dom/domhandler");
var forms_1 = require("@angular/forms");
var ObjectUtils_1 = require("../../../common/util/ObjectUtils");
exports.AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return AutoComplete; }),
    multi: true
};
var AutoComplete = (function () {
    function AutoComplete(el, domHandler, differs, renderer, objectUtils) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.objectUtils = objectUtils;
        this.minLength = 1;
        this.delay = 300;
        this.completeMethod = new core_1.EventEmitter();
        this.onSelect = new core_1.EventEmitter();
        this.onEnter = new core_1.EventEmitter();
        this.onUnselect = new core_1.EventEmitter();
        this.onFocus = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.onDropdownClick = new core_1.EventEmitter();
        this.scrollHeight = '200px';
        this.mandatory = false;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.panelVisible = false;
        this.focus = false;
        this.dropdownFocus = false;
        this.differ = differs.find([]).create(null);
    }
    AutoComplete.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.suggestions);
        if (changes && this.panel) {
            if (this.suggestions && this.suggestions.length) {
                this.show();
                this.suggestionsUpdated = true;
                if (this.autoHighlight) {
                    this.highlightOption = this.suggestions[0];
                }
            }
            else {
                this.hide();
            }
        }
    };
    //private hightlight(item: any) {
    //    if (item==null)
    //    {
    //        return "";
    //    }
    //    if (this.value == null || this.value == "") {
    //        return "";
    //    }
    //    let query = this.value;
    //    let itemStr: string = item.name;// (typeof item === 'object' && this._field ? item[this._field] : item).toString();
    //    //let itemStrHelper:string = (this.parent.autocompleteLatinize ? AutocompleteUtils.latinize(itemStr) : itemStr).toLowerCase();
    //    if (itemStr == null || itemStr == "")
    //    {
    //        return "";
    //    }
    //    let itemStrHelper: string = item.name.toLowerCase();
    //    let startIdx: number;
    //    let tokenLen: number;
    //    if (itemStrHelper != undefined || itemStrHelper != null || itemStrHelper !="") {
    //        if (typeof query === 'object') {
    //            let queryLen: number = query.length;
    //            for (let i = 0; i < queryLen; i += 1) {
    //                startIdx = itemStrHelper.indexOf(query[i]);
    //                tokenLen = query[i].length;
    //                if (startIdx >= 0 && tokenLen > 0) {
    //                    itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
    //                    itemStrHelper = itemStrHelper.substring(0, startIdx) + '        ' + ' '.repeat(tokenLen) + '         ' + itemStrHelper.substring(startIdx + tokenLen);
    //                }
    //            }
    //        } else if (query) {
    //            startIdx = itemStrHelper.indexOf(query);
    //            tokenLen = query.length;
    //            if (startIdx >= 0 && tokenLen > 0) {
    //                itemStr = itemStr.substring(0, startIdx) + '<strong style="color:#f5f5f5;">' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
    //            }
    //        }
    //    }
    //    //alert(document.getElementsByTagName('strong'));
    //    //(document.getElementsByTagName('strong'))[0].style.color = 'red';
    //    return itemStr;
    //}
    AutoComplete.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                case 'selectedItem':
                    _this.selectedItemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    AutoComplete.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.input = this.domHandler.findSingle(this.el.nativeElement, 'input');
        this.panel = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-autocomplete-panel');
        if (this.multiple) {
            this.multipleContainer = this.domHandler.findSingle(this.el.nativeElement, 'ul.ui-autocomplete-multiple-container');
        }
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
            _this.hide();
        });
        if (this.input != null && this.mandatory) {
            this.input.classList.add('bdr-red');
        }
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.panel);
            else
                this.domHandler.appendChild(this.panel, this.appendTo);
        }
    };
    AutoComplete.prototype.ngAfterViewChecked = function () {
        if (this.suggestionsUpdated) {
            this.align();
            this.suggestionsUpdated = false;
        }
        if (this.highlightOptionChanged) {
            var listItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');
            if (listItem) {
                this.domHandler.scrollInView(this.panel, listItem);
            }
            this.highlightOptionChanged = false;
        }
    };
    AutoComplete.prototype.writeValue = function (value) {
        this.value = value;
        this.filled = this.value && this.value != '';
    };
    AutoComplete.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    AutoComplete.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    AutoComplete.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    AutoComplete.prototype.onInput = function (event) {
        var _this = this;
        var value = event.target.value;
        if (!this.multiple) {
            this.value = value;
            this.onModelChange(value);
        }
        if (value.length === 0) {
            this.hide();
        }
        if (value.length >= this.minLength) {
            //Cancel the search request if user types within the timeout
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(function () {
                _this.search(event, value);
            }, this.delay);
        }
        else {
            this.suggestions = null;
        }
        this.updateFilledState();
    };
    AutoComplete.prototype.search = function (event, query) {
        //allow empty string but not undefined or null
        if (query === undefined || query === null) {
            return;
        }
        if (event.target.value == undefined || event.target.value == null || event.target.value == '') {
            this.hide();
            this.suggestions = null;
            query = null;
        }
        this.completeMethod.emit({
            originalEvent: event,
            query: query
        });
    };
    AutoComplete.prototype.selectItem = function (option) {
        if (this.multiple) {
            this.input.value = '';
            this.value = this.value || [];
            if (!this.isSelected(option)) {
                this.value = this.value.concat([option]);
                this.onModelChange(this.value);
            }
        }
        else {
            this.input.value = this.field ? this.objectUtils.resolveFieldData(option, this.field) : option;
            this.value = option;
            this.onModelChange(this.value);
        }
        this.onSelect.emit(option);
        this.input.focus();
    };
    AutoComplete.prototype.show = function () {
        if (!this.panelVisible && (this.focus || this.dropdownFocus)) {
            this.panelVisible = true;
            this.panel.style.zIndex = ++domhandler_1.DomHandler.zindex;
            this.domHandler.fadeIn(this.panel, 200);
        }
    };
    AutoComplete.prototype.align = function () {
        if (this.appendTo)
            this.domHandler.absolutePosition(this.panel, (this.multiple ? this.multipleContainer : this.input));
        else
            this.domHandler.relativePosition(this.panel, (this.multiple ? this.multipleContainer : this.input));
    };
    AutoComplete.prototype.hide = function () {
        this.panelVisible = false;
    };
    AutoComplete.prototype.handleDropdownClick = function (event) {
        this.onDropdownClick.emit({
            originalEvent: event,
            query: this.input.value
        });
    };
    AutoComplete.prototype.removeItem = function (item) {
        var itemIndex = this.domHandler.index(item);
        var removedValue = this.value[itemIndex];
        this.value = this.value.filter(function (val, i) { return i != itemIndex; });
        this.onUnselect.emit(removedValue);
        this.onModelChange(this.value);
    };
    AutoComplete.prototype.onKeydown = function (event) {
        if (this.panelVisible) {
            var highlightItemIndex = this.findOptionIndex(this.highlightOption);
            switch (event.which) {
                //down
                case 40:
                    if (highlightItemIndex != -1) {
                        var nextItemIndex = highlightItemIndex + 1;
                        if (nextItemIndex != (this.suggestions.length)) {
                            this.highlightOption = this.suggestions[nextItemIndex];
                            this.highlightOptionChanged = true;
                        }
                    }
                    else {
                        this.highlightOption = this.suggestions[0];
                    }
                    event.preventDefault();
                    break;
                //up
                case 38:
                    if (highlightItemIndex > 0) {
                        var prevItemIndex = highlightItemIndex - 1;
                        this.highlightOption = this.suggestions[prevItemIndex];
                        this.highlightOptionChanged = true;
                    }
                    event.preventDefault();
                    break;
                //escape
                case 27:
                    this.hide();
                    event.preventDefault();
                    break;
                //tab
                case 9:
                    if (this.highlightOption) {
                        this.selectItem(this.highlightOption);
                    }
                    this.hide();
                    break;
            }
        }
        else {
            if (event.which === 40 && this.suggestions) {
                this.search(event, event.target.value);
            }
        }
        if (this.multiple) {
            switch (event.which) {
                //backspace
                case 8:
                    if (this.value && this.value.length && !this.input.value) {
                        this.value = this.value.slice();
                        var removedValue = this.value.pop();
                        this.onUnselect.emit(removedValue);
                        this.onModelChange(this.value);
                    }
                    break;
            }
        }
    };
    AutoComplete.prototype.onKeyPress = function (event) {
        if (event.charCode == 13) {
            this.onEnter.emit(this.highlightOption);
        }
    };
    AutoComplete.prototype.onInputFocus = function (event) {
        this.focus = true;
        this.onFocus.emit(event);
    };
    AutoComplete.prototype.onInputBlur = function (event) {
        this.focus = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    };
    AutoComplete.prototype.onDropdownFocus = function () {
        this.dropdownFocus = true;
        if (this.multiple)
            this.multiInputEL.nativeElement.focus();
        else
            this.inputEL.nativeElement.focus();
    };
    AutoComplete.prototype.onDropdownBlur = function () {
        this.dropdownFocus = false;
    };
    AutoComplete.prototype.isSelected = function (val) {
        var selected = false;
        if (this.value && this.value.length) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.objectUtils.equals(this.value[i], val, this.dataKey)) {
                    selected = true;
                    break;
                }
            }
        }
        return selected;
    };
    AutoComplete.prototype.findOptionIndex = function (option) {
        var index = -1;
        if (this.suggestions) {
            for (var i = 0; i < this.suggestions.length; i++) {
                if (this.objectUtils.equals(option, this.suggestions[i])) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    AutoComplete.prototype.updateFilledState = function () {
        this.filled = this.input && this.input.value != '';
    };
    AutoComplete.prototype.ngOnDestroy = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.panel);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AutoComplete.prototype, "minLength", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AutoComplete.prototype, "delay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoComplete.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoComplete.prototype, "inputStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "inputId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "inputStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AutoComplete.prototype, "maxlength", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AutoComplete.prototype, "size", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AutoComplete.prototype, "suggestions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoComplete.prototype, "appendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "autoHighlight", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "completeMethod", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onSelect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onEnter", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onUnselect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onFocus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onBlur", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onDropdownClick", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "field", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "dropdown", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AutoComplete.prototype, "tabindex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "dataKey", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "mandatory", void 0);
    __decorate([
        core_1.ContentChildren(sharedComponent_1.PrimeTemplate),
        __metadata("design:type", core_1.QueryList)
    ], AutoComplete.prototype, "templates", void 0);
    __decorate([
        core_1.ViewChild('in'),
        __metadata("design:type", core_1.ElementRef)
    ], AutoComplete.prototype, "inputEL", void 0);
    __decorate([
        core_1.ViewChild('multiIn'),
        __metadata("design:type", core_1.ElementRef)
    ], AutoComplete.prototype, "multiInputEL", void 0);
    AutoComplete = __decorate([
        core_1.Component({
            selector: 'atpar-ac-search',
            templateUrl: 'autocomplete-search.html',
            host: {
                '[class.ui-inputwrapper-filled]': 'filled',
                '[class.ui-inputwrapper-focus]': 'focus'
            },
            providers: [domhandler_1.DomHandler, ObjectUtils_1.ObjectUtils, exports.AUTOCOMPLETE_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, core_1.IterableDiffers, core_1.Renderer, ObjectUtils_1.ObjectUtils])
    ], AutoComplete);
    return AutoComplete;
}());
exports.AutoComplete = AutoComplete;
var AutoCompleteSearchModule = (function () {
    function AutoCompleteSearchModule() {
    }
    AutoCompleteSearchModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, inputtext_1.InputTextModule, button_1.ButtonModule, sharedComponent_1.SharedPrimeModule],
            exports: [AutoComplete, sharedComponent_1.SharedPrimeModule],
            declarations: [AutoComplete]
        })
    ], AutoCompleteSearchModule);
    return AutoCompleteSearchModule;
}());
exports.AutoCompleteSearchModule = AutoCompleteSearchModule;
//# sourceMappingURL=autocomplete-search.js.map