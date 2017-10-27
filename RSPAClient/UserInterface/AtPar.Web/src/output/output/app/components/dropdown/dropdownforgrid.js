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
var sharedComponent_1 = require("../common/sharedComponent");
var domhandler_1 = require("./../../common/dom/domhandler");
var forms_1 = require("@angular/forms");
exports.DROPDOWN_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DropdownInGrid; }),
    multi: true
};
var DropdownInGrid = (function () {
    function DropdownInGrid(el, domHandler, renderer, differs, cd) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.cd = cd;
        this.scrollHeight = '200px';
        this.autoWidth = true;
        this.required = false;
        this.onChange = new core_1.EventEmitter();
        this.onFocus = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.searchedvalue = "";
        this.panelVisible = false;
        this.index = -1;
        this.isfltered = false;
        this.differ = differs.find([]).create(null);
    }
    DropdownInGrid.prototype.ngAfterContentInit = function () {
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
    DropdownInGrid.prototype.ngOnInit = function () {
        var _this = this;
        if (this.options != null) {
            this.optionsToDisplay = new Array();
            if (typeof this.options == "string") {
                if (this.options.indexOf(',') > 0) {
                    for (var x = 0; x < this.options.split(',').length; x++) {
                        this.optionsToDisplay.push({ value: this.options.split(',')[x].trim(), label: this.options.split(',')[x].trim() });
                    }
                }
                else {
                    this.optionsToDisplay.push({ value: this.options, label: this.options });
                }
            }
            else {
                this.optionsToDisplay = this.options;
            }
            this.options = this.optionsToDisplay;
            if (this.SelectedLabel != null) {
                var fitem = this.optionsToDisplay.filter(function (x) { return x.label.trim() == _this.SelectedLabel.trim(); });
                if (fitem != null && fitem.length > 0) {
                    this.updateSelectedOption(fitem[0].value);
                }
                else {
                    this.updateSelectedOption(null);
                }
            }
            else {
                this.updateSelectedOption(null);
            }
        }
    };
    DropdownInGrid.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.options);
        if (changes && this.initialized) {
            this.optionsToDisplay = this.options;
            this.updateSelectedOption(this.value);
            this.optionsChanged = true;
        }
    };
    DropdownInGrid.prototype.ngAfterViewInit = function () {
        this.container = this.containerViewChild.nativeElement;
        this.panel = this.panelViewChild.nativeElement;
        this.itemsWrapper = this.itemsWrapperViewChild.nativeElement;
        this.xReq = this.required;
        var id1 = this.id;
        if (this.xReq == true) {
            // document.getElementById(this.id).classList.add('bdr-red');
            // document.getElementById(this.id).classList.add('');
            var node = document.createElement("span");
            node.setAttribute("class", "text-danger grid-mandatory");
            var textnode = document.createTextNode("*");
            var sp2 = document.getElementById(this.id);
            var parentDiv = sp2.parentNode;
            node.appendChild(textnode);
            // document.getElementById(this.id).classList.add('bdr-red');
            document.getElementById(this.id).appendChild(node);
            parentDiv.insertBefore(node, sp2);
            console.log(this.id);
        }
        else {
            // document.getElementById(this.container.id).classList.add('bdr-purple');
            var node = document.createElement("span");
            node.setAttribute("class", "grid-mandatory-white");
            var textnode = document.createTextNode("*");
            var sp2 = document.getElementById(this.id);
            var parentDiv = sp2.parentNode;
            node.appendChild(textnode);
            // document.getElementById(this.id).classList.add('bdr-red');
            document.getElementById(this.id).appendChild(node);
            parentDiv.insertBefore(node, sp2);
        }
        this.updateDimensions();
        this.initialized = true;
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.panel);
            else
                this.domHandler.appendChild(this.panel, this.appendTo);
        }
        if (this.isfocus == true) {
            this.focus = true;
            document.getElementById("txt" + this.id).focus();
        }
    };
    Object.defineProperty(DropdownInGrid.prototype, "label", {
        get: function () {
            return (this.editable && this.value) ? this.value : (this.selectedOption ? this.selectedOption.label : null);
        },
        enumerable: true,
        configurable: true
    });
    DropdownInGrid.prototype.onItemClick = function (event, option) {
        this.itemClick = true;
        this.selectItem(event, option);
        this.hide();
    };
    DropdownInGrid.prototype.selectItem = function (event, option) {
        this.selectedOption = option;
        this.value = option.value;
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value,
            label: this.label
        });
        if (this.filter) {
            document.getElementById(this.id + 'txtDDSearch').value = '';
            this.filetOptionsByInput('');
        }
    };
    DropdownInGrid.prototype.ngAfterViewChecked = function () {
        if (this.optionsChanged) {
            //this.domHandler.relativePosition(this.panel, this.container);
            this.optionsChanged = false;
        }
        if (this.selectedOptionUpdated && this.itemsWrapper) {
            var selectedItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');
            if (selectedItem) {
                this.domHandler.scrollInView(this.itemsWrapper, this.domHandler.findSingle(this.panel, 'li.ui-state-highlight'));
            }
            this.selectedOptionUpdated = false;
        }
    };
    DropdownInGrid.prototype.writeValue = function (value) {
        this.value = value;
        this.updateSelectedOption(value);
        this.cd.markForCheck();
    };
    DropdownInGrid.prototype.updateSelectedOption = function (val) {
        this.selectedOption = this.findOption(val, this.optionsToDisplay);
        if (!this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
            this.selectedOption = this.optionsToDisplay[0];
        }
        this.selectedOptionUpdated = true;
    };
    DropdownInGrid.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    DropdownInGrid.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    DropdownInGrid.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    DropdownInGrid.prototype.updateDimensions = function () {
        if (this.autoWidth) {
            var select = this.domHandler.findSingle(this.el.nativeElement, 'select');
            if (!this.style || (!this.style['width'] && !this.style['min-width'])) {
                this.el.nativeElement.children[0].style.width = 100 + '%';
            }
        }
    };
    DropdownInGrid.prototype.onMouseclick = function (event, input) {
        var _this = this;
        if (this.disabled || this.readonly) {
            return;
        }
        this.selfClick = true;
        if (!this.itemClick) {
            input.focus();
            if (this.panelVisible)
                this.hide();
            else {
                this.show(this.panel, this.container);
                if (this.filterViewChild != undefined) {
                    setTimeout(function () {
                        _this.filterViewChild.nativeElement.focus();
                    }, 200);
                }
            }
        }
    };
    DropdownInGrid.prototype.onEditableInputClick = function (event) {
        this.itemClick = true;
        this.bindDocumentClickListener();
    };
    DropdownInGrid.prototype.onEditableInputFocus = function (event) {
        this.focus = true;
        this.hide();
    };
    DropdownInGrid.prototype.onEditableInputChange = function (event) {
        this.value = event.target.value;
        this.updateSelectedOption(this.value);
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    DropdownInGrid.prototype.show = function (panel, container) {
        this.searchedvalue = "";
        this.filetOptionsByInput(this.searchedvalue);
        if (this.options && this.options.length) {
            this.panelVisible = true;
            panel.style.zIndex = ++domhandler_1.DomHandler.zindex;
            this.optionL = 15 + (this.options.length * 18);
            if (this.optionL > 200) {
                this.optionL = 200;
            }
            if (this.domHandler.isIE()) {
                panel.style.zIndex = domhandler_1.DomHandler.zindex;
            }
            if (this.appendTo)
                this.domHandler.absolutePosition(panel, container);
            else
                this.domHandler.relativePosition2(panel, container, this.optionL);
            this.bindDocumentClickListener();
        }
    };
    DropdownInGrid.prototype.hide = function () {
        this.panelVisible = false;
    };
    DropdownInGrid.prototype.onInputFocus = function (event) {
        this.focus = true;
        this.onFocus.emit(event);
    };
    DropdownInGrid.prototype.onInputBlur = function (event) {
        this.focus = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    };
    DropdownInGrid.prototype.onKeydown = function (event) {
        if (this.readonly) {
            return;
        }
        if (this.optionsToDisplay.length == 1) {
            this.selectedOption = this.optionsToDisplay[0];
        }
        var selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
        switch (event.which) {
            //down
            case 40:
                if (!this.panelVisible && event.altKey) {
                    this.show(this.panel, this.container);
                }
                else {
                    //end position need to select option
                    var myindexposition = this.optionsToDisplay.length - 1;
                    if (selectedItemIndex == myindexposition) {
                        selectedItemIndex = -1;
                    }
                    if (selectedItemIndex != -1) {
                        var nextItemIndex = selectedItemIndex + 1;
                        this.selectedOption = this.optionsToDisplay[nextItemIndex];
                        this.selectedOptionUpdated = true;
                        ////0030521
                        //this.selectItem(event, this.selectedOption);
                    }
                    else if (this.optionsToDisplay) {
                        this.selectedOption = this.optionsToDisplay[0];
                        if (this.selectedOption == null || this.selectedOption == undefined) {
                            this.selectedOption = this.options[0];
                            ;
                        }
                        ////0030521
                        //this.selectItem(event, this.selectedOption);
                    }
                }
                event.preventDefault();
                break;
            //up
            case 38:
                if (selectedItemIndex > 0) {
                    var prevItemIndex = selectedItemIndex - 1;
                    this.selectedOption = this.optionsToDisplay[prevItemIndex];
                    this.selectedOptionUpdated = true;
                }
                event.preventDefault();
                break;
            //enter
            case 13:
                if (!this.panelVisible && event.altKey) {
                    this.show(this.panel, this.container);
                }
                else {
                    if (selectedItemIndex != -1) {
                        var nextItemIndex = selectedItemIndex;
                        this.selectedOption = this.optionsToDisplay[nextItemIndex];
                        this.selectedOptionUpdated = true;
                        this.selectItem(event, this.selectedOption);
                        this.hide();
                    }
                    else if (this.optionsToDisplay) {
                        this.selectedOption = this.optionsToDisplay[0];
                        if (this.selectedOption == null || this.selectedOption == undefined) {
                            this.selectedOption = this.options[0];
                        }
                        this.selectItem(event, this.selectedOption);
                    }
                }
                event.preventDefault();
                break;
            //escape and tab
            case 27:
                if (!this.panelVisible && event.altKey) {
                    this.show(this.panel, this.container);
                }
                else {
                    if (selectedItemIndex != -1) {
                        this.selectedOption = this.optionsToDisplay[selectedItemIndex];
                        this.selectedOptionUpdated = true;
                        this.selectItem(event, this.selectedOption);
                        this.hide();
                        this.filtervalue = null;
                    }
                    else if (this.optionsToDisplay) {
                        this.selectedOption = this.optionsToDisplay[0];
                        this.selectItem(event, this.selectedOption);
                    }
                }
                break;
            case 9:
                if (!this.panelVisible && event.altKey) {
                    this.show(this.panel, this.container);
                }
                else {
                    if (selectedItemIndex != -1) {
                        this.selectedOption = this.optionsToDisplay[selectedItemIndex];
                        this.selectedOptionUpdated = true;
                        this.selectItem(event, this.selectedOption);
                        this.hide();
                        this.filtervalue = null;
                    }
                    else if (this.optionsToDisplay) {
                        this.selectedOption = this.optionsToDisplay[0];
                        this.selectItem(event, this.selectedOption);
                    }
                }
                break;
        }
    };
    DropdownInGrid.prototype.findListItem = function (element) {
        if (element.nodeName == 'LI') {
            return element;
        }
        else {
            var parent_1 = element.parentElement;
            while (parent_1.nodeName != 'LI') {
                parent_1 = parent_1.parentElement;
            }
            return parent_1;
        }
    };
    DropdownInGrid.prototype.onKey = function (event) {
        var xx = this.keyedval;
        console.log(xx);
        var val = event.key.toLowerCase();
        var enteredItemIndex = this.findOptions(event.key.toLowerCase(), this.optionsToDisplay);
        if (enteredItemIndex != -1) {
            var nextItemIndex = enteredItemIndex;
            if (nextItemIndex != (this.optionsToDisplay.length)) {
                this.selectedOption = this.optionsToDisplay[nextItemIndex];
                this.selectedOptionUpdated = true;
                this.selectItem(event, this.selectedOption);
            }
        }
    };
    /**
     * /
     search item  based on keypress
     */
    DropdownInGrid.prototype.onKeypress = function (event) {
        var val = event.key.toLowerCase();
        var enteredItemIndex = this.findOptions(event.key.toLowerCase(), this.optionsToDisplay);
        if (enteredItemIndex != -1) {
            var nextItemIndex = enteredItemIndex;
            if (nextItemIndex != (this.optionsToDisplay.length)) {
                this.selectedOption = this.optionsToDisplay[nextItemIndex];
                this.selectedOptionUpdated = true;
                this.selectItem(event, this.selectedOption);
            }
        }
    };
    DropdownInGrid.prototype.findOptions = function (val, opts) {
        var targetindex = -1;
        var loopCount = 0;
        if (opts) {
            for (var i = 0; i <= opts.length; i++) {
                targetindex = i;
                if (targetindex == opts.length) {
                    if (loopCount == 0) {
                        targetindex = -1;
                        break;
                    }
                    else if (this.index != -1) {
                        this.index = -1;
                        i = 0;
                        loopCount = 0;
                        targetindex = 0;
                    }
                }
                if ((opts[i].label.toLowerCase().substr(0, val.length) == val) == true) {
                    loopCount++;
                    if (!(this.index == targetindex) && (targetindex > this.index)) {
                        this.index = targetindex;
                        break;
                    }
                }
            }
        }
        return targetindex;
    };
    /**
     * /
    end: search item  based on keypress
     */
    DropdownInGrid.prototype.findOptionIndex = function (val, opts) {
        var index = -1;
        if (opts) {
            for (var i = 0; i < opts.length; i++) {
                if ((val == null && opts[i].value == null) || this.domHandler.equals(val, opts[i].value)) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    DropdownInGrid.prototype.findOption = function (val, opts) {
        var index = this.findOptionIndex(val, opts);
        return (index != -1) ? opts[index] : null;
    };
    DropdownInGrid.prototype.onFilter = function (event) {
        var val = event.target.value.toLowerCase();
        this.filetOptionsByInput(val);
        this.searchedvalue = val;
    };
    DropdownInGrid.prototype.filetOptionsByInput = function (val) {
        this.filtervalue = val;
        if (this.options && this.options.length) {
            this.optionsToDisplay = [];
            for (var i = 0; i < this.options.length; i++) {
                var option = this.options[i];
                if (option.label.toLowerCase().substring(0, val.length) === val) {
                    this.optionsToDisplay.push(option);
                }
            }
            this.optionsChanged = true;
        }
    };
    DropdownInGrid.prototype.applyFocus = function () {
        if (this.editable)
            this.domHandler.findSingle(this.el.nativeElement, '.ui-dropdown-label.ui-inputtext').focus();
        else
            this.domHandler.findSingle(this.el.nativeElement, 'input[readonly]').focus();
    };
    DropdownInGrid.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
                if (!_this.selfClick && !_this.itemClick) {
                    _this.panelVisible = false;
                    _this.unbindDocumentClickListener();
                }
                _this.selfClick = false;
                _this.itemClick = false;
            });
        }
    };
    DropdownInGrid.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    DropdownInGrid.prototype.ngOnDestroy = function () {
        this.initialized = false;
        this.unbindDocumentClickListener();
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.panel);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DropdownInGrid.prototype, "options", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DropdownInGrid.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DropdownInGrid.prototype, "filter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DropdownInGrid.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DropdownInGrid.prototype, "panelStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DropdownInGrid.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DropdownInGrid.prototype, "panelStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DropdownInGrid.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DropdownInGrid.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DropdownInGrid.prototype, "autoWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DropdownInGrid.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DropdownInGrid.prototype, "isfocus", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DropdownInGrid.prototype, "editable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DropdownInGrid.prototype, "appendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DropdownInGrid.prototype, "tabindex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DropdownInGrid.prototype, "SelectedLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DropdownInGrid.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DropdownInGrid.prototype, "modelstring", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DropdownInGrid.prototype, "onChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DropdownInGrid.prototype, "onFocus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DropdownInGrid.prototype, "onBlur", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], DropdownInGrid.prototype, "containerViewChild", void 0);
    __decorate([
        core_1.ViewChild('panel'),
        __metadata("design:type", core_1.ElementRef)
    ], DropdownInGrid.prototype, "panelViewChild", void 0);
    __decorate([
        core_1.ViewChild('itemswrapper'),
        __metadata("design:type", core_1.ElementRef)
    ], DropdownInGrid.prototype, "itemsWrapperViewChild", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], DropdownInGrid.prototype, "filterViewChild", void 0);
    __decorate([
        core_1.ContentChildren(sharedComponent_1.PrimeTemplate),
        __metadata("design:type", core_1.QueryList)
    ], DropdownInGrid.prototype, "templates", void 0);
    DropdownInGrid = __decorate([
        core_1.Component({
            selector: 'atpar-select-grid',
            templateUrl: 'dropdown.html',
            styleUrls: ['dropdown.css'],
            animations: [
                core_1.trigger('panelState', [
                    core_1.state('hidden', core_1.style({
                        opacity: 0
                    })),
                    core_1.state('visible', core_1.style({
                        opacity: 1
                    })),
                    core_1.transition('visible => hidden', core_1.animate('400ms ease-in')),
                    core_1.transition('hidden => visible', core_1.animate('400ms ease-out'))
                ])
            ],
            providers: [domhandler_1.DomHandler, exports.DROPDOWN_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer, core_1.IterableDiffers, core_1.ChangeDetectorRef])
    ], DropdownInGrid);
    return DropdownInGrid;
}());
exports.DropdownInGrid = DropdownInGrid;
var DropdownInGridModule = (function () {
    function DropdownInGridModule() {
    }
    DropdownInGridModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, sharedComponent_1.SharedPrimeModule],
            exports: [DropdownInGrid, sharedComponent_1.SharedPrimeModule],
            declarations: [DropdownInGrid]
        })
    ], DropdownInGridModule);
    return DropdownInGridModule;
}());
exports.DropdownInGridModule = DropdownInGridModule;
//# sourceMappingURL=dropdownforgrid.js.map