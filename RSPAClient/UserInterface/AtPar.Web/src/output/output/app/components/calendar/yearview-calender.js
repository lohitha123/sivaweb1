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
var button_1 = require("../button/button");
var inputtext_1 = require("../inputtext/inputtext");
var domhandler_1 = require("../../common/dom/domhandler");
var forms_1 = require("@angular/forms");
exports.CALENDAR_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return yearviewcalender; }),
    multi: true
};
exports.CALENDAR_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return yearviewcalender; }),
    multi: true
};
var yearviewcalender = (function () {
    function yearviewcalender(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.dateFormat = 'yy';
        this.inline = false;
        this.icon = 'fa-calendar';
        this.shortYearCutoff = '+10';
        this.showOnFocus = true;
        this.dataType = 'date';
        this.onFocus = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.onSelect = new core_1.EventEmitter();
        this.weekDays = [];
        this.closeOverlay = true;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.inputFieldValue = null;
        this._isValid = true;
        this.ToShowStart = 2010;
        this.ToShowFinish = 2019;
        this.count = 0;
    }
    yearviewcalender.prototype.ngOnInit = function () {
        var date = this.defaultDate || new Date();
        this.closeDiv = true;
        this.currentYear = date.getFullYear();
        this.fixedyear = 2005;
        var week = [];
        this.dates = [];
        this.dummyyear = this.dummyyear + 10;
        this.createDecade(this.ToShowStart, this.ToShowStart + 11);
    };
    yearviewcalender.prototype.ngAfterViewInit = function () {
        this.overlay = this.overlayViewChild.nativeElement;
        if (!this.inline && this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                this.domHandler.appendChild(this.overlay, this.appendTo);
        }
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
    yearviewcalender.prototype.createDecade = function (month, year) {
        this.dates = [];
        this.yearss = year;
        var week = [];
        this.count = 0;
        week = [];
        for (var i = month; i <= year; i++) {
            this.count = this.count + 1;
            week.push({
                day: i, selectable: this.isSelectable(i)
            });
            if (this.count === 3) {
                this.dates.push(week);
                week = [];
                this.count = 0;
            }
        }
    };
    yearviewcalender.prototype.prevDecade = function (event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        this.ToShowFinish = this.ToShowStart - 1;
        this.ToShowStart = this.ToShowFinish - 9;
        this.createDecade(this.ToShowStart, this.ToShowStart + 11);
        event.preventDefault();
    };
    yearviewcalender.prototype.nextDecade = function (event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        this.ToShowStart = this.ToShowFinish + 1;
        this.ToShowFinish = this.ToShowStart + 9;
        this.createDecade(this.ToShowStart, this.ToShowStart + 11);
        event.preventDefault();
    };
    yearviewcalender.prototype.onYearSelect = function (event, dateMeta) {
        if (this.disabled || !dateMeta.selectable) {
            event.preventDefault();
            return;
        }
        else {
            this.selectDate(dateMeta);
        }
        this.dateClick = true;
        this.updateInputfield();
        event.preventDefault();
    };
    yearviewcalender.prototype.updateInputfield = function () {
        if (this.value) {
            var formattedValue = void 0;
            formattedValue = this.formatDate(this.value, this.dateFormat);
            this.inputFieldValue = formattedValue;
        }
        else {
            this.inputFieldValue = '';
        }
        this.updateFilledState();
    };
    yearviewcalender.prototype.selectDate = function (dateMeta) {
        this.value = new Date(dateMeta.day, 1, 1);
        this._isValid = true;
        this.updateModel();
        this.onSelect.emit(this.value);
    };
    yearviewcalender.prototype.updateModel = function () {
        if (this.timeOnly)
            this.onModelChange(this.formatTime(this.value));
        else
            this.onModelChange(this.formatDate(this.value, this.dateFormat));
    };
    yearviewcalender.prototype.getFirstDayOfMonthIndex = function (month, year) {
        var day = new Date();
        day.setDate(1);
        day.setMonth(month);
        day.setFullYear(year);
    };
    yearviewcalender.prototype.getDaysCountInMonth = function (month, year) {
        return 32 - this.daylightSavingAdjust(new Date(year + 1, month, 32)).getDate();
    };
    yearviewcalender.prototype.getDaysCountInPrevMonth = function (month, year) {
        var prev = this.getPreviousMonthAndYear(month, year);
        return this.getDaysCountInMonth(prev.month, prev.year);
    };
    yearviewcalender.prototype.getPreviousMonthAndYear = function (month, year) {
        var m, y;
        if (month === 0) {
            m = 11;
            y = year - 1;
        }
        else {
            m = month - 1;
            y = year;
        }
        return { 'month': m, 'year': y };
    };
    yearviewcalender.prototype.getNextMonthAndYear = function (month, year) {
        var m, y;
        if (month === 11) {
            m = 0;
            y = year + 1;
        }
        else {
            m = month + 1;
        }
        return { 'month': m, 'year': y };
    };
    yearviewcalender.prototype.isSelected = function (dateMeta) {
        if (this.value)
            return this.value.getDate() === dateMeta.day && this.value.getMonth() === dateMeta.month && this.value.getFullYear() === dateMeta.year;
        else
            return false;
    };
    yearviewcalender.prototype.isToday = function (today, day, month, year) {
        return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    };
    yearviewcalender.prototype.isSelectable = function (year) {
        var validMin = true;
        var validMax = true;
        if (this.yearss < this.currentYear + 10) {
            validMax = false;
        }
        else {
            validMin = false;
        }
        return true;
    };
    yearviewcalender.prototype.onInputFocus = function (inputfield, event) {
        this.focus = true;
        this.closeDiv = true;
        if (this.showOnFocus) {
            this.showOverlay(inputfield);
        }
        this.onFocus.emit(event);
    };
    yearviewcalender.prototype.onInputBlur = function (event) {
        this.focus = false;
        this.onBlur.emit(event);
        this.onModelTouched();
    };
    yearviewcalender.prototype.onButtonClick = function (event, inputfield) {
        this.closeOverlay = false;
        this.closeDiv = true;
        if (!this.overlay.offsetParent) {
            inputfield.focus();
            this.showOverlay(inputfield);
        }
        else
            this.closeOverlay = true;
    };
    yearviewcalender.prototype.onInputKeydown = function (event) {
        if (event.keyCode === 9) {
            this.overlayVisible = false;
        }
    };
    yearviewcalender.prototype.onClose = function () {
        this.closeDiv = false;
    };
    yearviewcalender.prototype.updateTime = function () {
        this.updateModel();
        this.onSelect.emit(this.value);
        this.updateInputfield();
    };
    yearviewcalender.prototype.toggleAMPM = function (event) {
        this.updateTime();
        event.preventDefault();
    };
    yearviewcalender.prototype.onInput = function (event) {
        try {
            this.value = this.parseValueFromString(event.target.value);
            this._isValid = true;
        }
        catch (err) {
            this.value = null;
            this._isValid = false;
        }
        this.updateModel();
        this.updateFilledState();
    };
    yearviewcalender.prototype.parseValueFromString = function (text) {
        var dateValue;
        var parts = text.split(' ');
        dateValue = this.parseDate(text, this.dateFormat);
        return dateValue;
    };
    yearviewcalender.prototype.populateTime = function (value, timeString, ampm) {
    };
    yearviewcalender.prototype.updateUI = function () {
        var val = this.value || this.defaultDate || new Date();
        this.createDecade(this.ToShowStart, this.ToShowStart + 11);
    };
    yearviewcalender.prototype.onDatePickerClick = function (event) {
        this.closeOverlay = this.dateClick;
    };
    yearviewcalender.prototype.showOverlay = function (inputfield) {
        if (this.appendTo)
            this.domHandler.absolutePosition(this.overlay, inputfield);
        else
            this.domHandler.relativePosition(this.overlay, inputfield);
        this.overlayVisible = true;
        this.overlay.style.zIndex = String(++domhandler_1.DomHandler.zindex);
        this.bindDocumentClickListener();
    };
    yearviewcalender.prototype.writeValue = function (value) {
        this.value = value;
        if (value != null && value != "") {
            this.selectDate({ selectable: true, day: value });
            this.updateInputfield();
            this.updateUI();
        }
    };
    yearviewcalender.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    yearviewcalender.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    yearviewcalender.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    yearviewcalender.prototype.currenthour = function () {
        var time = this.defaultDate || new Date();
        this.currentHour = time.getHours();
        this.updateTime();
        event.preventDefault();
    };
    yearviewcalender.prototype.currentminute = function () {
        var minute = this.defaultDate || new Date();
        this.currentMinute = minute.getMinutes();
        this.updateTime();
        event.preventDefault();
    };
    yearviewcalender.prototype.updatedTime = function () {
        this.currenthour();
        this.currentminute();
        this.closeOverlay = false;
        event.preventDefault();
    };
    // Ported from jquery-ui datepicker formatDate    
    yearviewcalender.prototype.formatDate = function (date, format) {
        if (!date) {
            return "";
        }
        var iFormat, lookAhead = function (match) {
            var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
            if (matches) {
                iFormat++;
            }
            return matches;
        }, formatNumber = function (match, value, len) {
            var num = "" + value;
            if (lookAhead(match)) {
                while (num.length < len) {
                    num = "0" + num;
                }
            }
            return num;
        }, formatName = function (match, value, shortNames, longNames) {
            return (lookAhead(match) ? longNames[value] : shortNames[value]);
        }, output = "", literal = false;
        if (date) {
            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === "'" && !lookAhead("'"))
                        literal = false;
                    else
                        output += format.charAt(iFormat);
                }
                else {
                    switch (format.charAt(iFormat)) {
                        case "d":
                            output += formatNumber("d", date.getDate(), 2);
                            break;
                        case "D":
                            break;
                        case "o":
                            output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case "m":
                            output += formatNumber("m", date.getMonth() + 1, 2);
                            break;
                        case "M":
                            break;
                        case "y":
                            output += (lookAhead("y") ? date.getFullYear() :
                                (date.getFullYear() % 100 < 10 ? "0" : "") + date.getFullYear() % 100);
                            break;
                        case "@":
                            output += date.getTime();
                            break;
                        case "!":
                            break;
                        case "'":
                            if (lookAhead("'"))
                                output += "'";
                            else
                                literal = true;
                            break;
                        default:
                            output += format.charAt(iFormat);
                    }
                }
            }
        }
        return output;
    };
    yearviewcalender.prototype.formatTime = function (date) {
        if (!date) {
            return '';
        }
        var output = '';
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        output += (hours < 10) ? '0' + hours : hours;
        output += ':';
        output += (minutes < 10) ? '0' + minutes : minutes;
        return output;
    };
    yearviewcalender.prototype.parseTime = function (value) {
        var tokens = value.split(':');
        var h = parseInt(tokens[0]);
        var m = parseInt(tokens[1]);
    };
    // Ported from jquery-ui datepicker parseDate 
    yearviewcalender.prototype.parseDate = function (value, format) {
        if (format == null || value == null) {
            throw "Invalid arguments";
        }
        value = (typeof value === "object" ? value.toString() : value + "");
        if (value === "") {
            return null;
        }
        var iFormat, dim, extra, iValue = 0, shortYearCutoff = (typeof this.shortYearCutoff !== "string" ? this.shortYearCutoff : new Date().getFullYear() % 100 + parseInt(this.shortYearCutoff, 10)), year = -1, month = -1, day = -1, doy = -1, literal = false, date, lookAhead = function (match) {
            var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
            if (matches) {
                iFormat++;
            }
            return matches;
        }, getNumber = function (match) {
            var isDoubled = lookAhead(match), size = (match === "@" ? 14 : (match === "!" ? 20 :
                (match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))), minSize = (match === "y" ? size : 1), digits = new RegExp("^\\d{" + minSize + "," + size + "}"), num = value.substring(iValue).match(digits);
            if (!num) {
                throw "Missing number at position " + iValue;
            }
            iValue += num[0].length;
            return parseInt(num[0], 10);
        }, getName = function (match, shortNames, longNames) {
            var index = -1;
            var arr = lookAhead(match) ? longNames : shortNames;
            var names = [];
            for (var i = 0; i < arr.length; i++) {
                names.push([i, arr[i]]);
            }
            names.sort(function (a, b) {
                return -(a[1].length - b[1].length);
            });
            for (var i = 0; i < names.length; i++) {
                var name_1 = names[i][1];
                if (value.substr(iValue, name_1.length).toLowerCase() === name_1.toLowerCase()) {
                    index = names[i][0];
                    iValue += name_1.length;
                    break;
                }
            }
            if (index !== -1) {
                return index + 1;
            }
            else {
                throw "Unknown name at position " + iValue;
            }
        }, checkLiteral = function () {
            if (value.charAt(iValue) !== format.charAt(iFormat)) {
                throw "Unexpected literal at position " + iValue;
            }
            iValue++;
        };
        for (iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal) {
                if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                    literal = false;
                }
                else {
                    checkLiteral();
                }
            }
            else {
                switch (format.charAt(iFormat)) {
                    case "d":
                        day = getNumber("d");
                        break;
                    case "D":
                        break;
                    case "o":
                        doy = getNumber("o");
                        break;
                    case "m":
                        month = getNumber("m");
                        break;
                    case "M":
                        break;
                    case "y":
                        year = getNumber("y");
                        break;
                    case "@":
                        date = new Date(getNumber("@"));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "!":
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "'":
                        if (lookAhead("'")) {
                            checkLiteral();
                        }
                        else {
                            literal = true;
                        }
                        break;
                    default:
                        checkLiteral();
                }
            }
        }
        if (iValue < value.length) {
            extra = value.substr(iValue);
            if (!/^\s+/.test(extra)) {
                throw "Extra/unparsed characters found in date: " + extra;
            }
        }
        if (year === -1) {
            year = new Date().getFullYear();
        }
        else if (year < 100) {
            year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                (year <= shortYearCutoff ? 0 : -100);
        }
        if (doy > -1) {
            month = 1;
            day = doy;
            do {
                dim = this.getDaysCountInMonth(year, month - 1);
                if (day <= dim) {
                    break;
                }
                month++;
                day -= dim;
            } while (true);
        }
        date = this.daylightSavingAdjust(new Date(year + 1, month - 1, day));
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
            throw "Invalid date"; // E.g. 31/02/00
        }
        return date;
    };
    yearviewcalender.prototype.daylightSavingAdjust = function (date) {
        if (!date) {
            return null;
        }
        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
        return date;
    };
    yearviewcalender.prototype.updateFilledState = function () {
        this.filled = this.inputFieldValue && this.inputFieldValue != '';
    };
    yearviewcalender.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
                if (_this.closeOverlay) {
                    _this.overlayVisible = false;
                }
                _this.closeOverlay = true;
                _this.dateClick = false;
            });
        }
    };
    yearviewcalender.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    };
    yearviewcalender.prototype.ngOnDestroy = function () {
        this.unbindDocumentClickListener();
        if (!this.inline && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    };
    yearviewcalender.prototype.validate = function (c) {
        if (!this._isValid) {
            return { invalidDate: true };
        }
        return null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date)
    ], yearviewcalender.prototype, "defaultDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], yearviewcalender.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], yearviewcalender.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], yearviewcalender.prototype, "inputStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], yearviewcalender.prototype, "inputStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], yearviewcalender.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], yearviewcalender.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], yearviewcalender.prototype, "dateFormat", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], yearviewcalender.prototype, "inline", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], yearviewcalender.prototype, "showIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], yearviewcalender.prototype, "icon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], yearviewcalender.prototype, "appendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], yearviewcalender.prototype, "readonlyInput", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], yearviewcalender.prototype, "shortYearCutoff", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], yearviewcalender.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], yearviewcalender.prototype, "showOnFocus", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], yearviewcalender.prototype, "dataType", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], yearviewcalender.prototype, "onFocus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], yearviewcalender.prototype, "onBlur", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], yearviewcalender.prototype, "onSelect", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], yearviewcalender.prototype, "tabindex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], yearviewcalender.prototype, "timeOnly", void 0);
    __decorate([
        core_1.ViewChild('datepicker'),
        __metadata("design:type", core_1.ElementRef)
    ], yearviewcalender.prototype, "overlayViewChild", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], yearviewcalender.prototype, "id", void 0);
    yearviewcalender = __decorate([
        core_1.Component({
            selector: 'atpar-yearviewcalender',
            templateUrl: 'yearview-calender.html',
            animations: [
                core_1.trigger('overlayState', [
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
            host: {
                '[class.ui-inputwrapper-filled]': 'filled',
                '[class.ui-inputwrapper-focus]': 'focus'
            },
            providers: [domhandler_1.DomHandler, exports.CALENDAR_VALUE_ACCESSOR, exports.CALENDAR_VALIDATOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer])
    ], yearviewcalender);
    return yearviewcalender;
}());
exports.yearviewcalender = yearviewcalender;
var AtparCalendarModule = (function () {
    function AtparCalendarModule() {
    }
    AtparCalendarModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, button_1.ButtonModule, inputtext_1.InputTextModule],
            exports: [yearviewcalender, button_1.ButtonModule, inputtext_1.InputTextModule],
            declarations: [yearviewcalender]
        })
    ], AtparCalendarModule);
    return AtparCalendarModule;
}());
exports.AtparCalendarModule = AtparCalendarModule;
//# sourceMappingURL=yearview-calender.js.map