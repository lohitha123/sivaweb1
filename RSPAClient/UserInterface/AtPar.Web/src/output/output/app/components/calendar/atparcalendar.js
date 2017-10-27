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
    useExisting: core_1.forwardRef(function () { return AtParCalendar; }),
    multi: true
};
exports.CALENDAR_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return AtParCalendar; }),
    multi: true
};
var AtParCalendar = (function () {
    function AtParCalendar(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.dateFormat = 'mm/dd/yy';
        this.inline = false;
        this.showOtherMonths = true;
        this.icon = 'fa-calendar';
        this.shortYearCutoff = '+10';
        this.hourFormat = '24';
        this.stepHour = 1;
        this.stepMinute = 1;
        this.stepSecond = 1;
        this.showSeconds = false;
        this.showOnFocus = true;
        this.dataType = 'date';
        this.onFocus = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.onSelect = new core_1.EventEmitter();
        this.locale = {
            firstDayOfWeek: 0,
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        };
        this.weekDays = [];
        this.closeOverlay = true;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.inputFieldValue = null;
        this._isValid = true;
        this.inputTime = null;
        this.currentInputTime = null;
        this.currentInputHour = null;
    }
    Object.defineProperty(AtParCalendar.prototype, "minDate", {
        get: function () {
            return this._minDate;
        },
        set: function (date) {
            this._minDate = date;
            this.createMonth(this.currentMonth, this.currentYear);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AtParCalendar.prototype, "maxDate", {
        get: function () {
            return this._maxDate;
        },
        set: function (date) {
            this._maxDate = date;
            this.createMonth(this.currentMonth, this.currentYear);
        },
        enumerable: true,
        configurable: true
    });
    AtParCalendar.prototype.ngOnInit = function () {
        var date = this.defaultDate || new Date();
        var dayIndex = this.locale.firstDayOfWeek;
        this.closeDiv = true;
        for (var i = 0; i < 7; i++) {
            this.weekDays.push(this.locale.dayNamesMin[dayIndex]);
            dayIndex = (dayIndex == 6) ? 0 : ++dayIndex;
        }
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
        if (this.showTime) {
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
            this.pm = date.getHours() > 11;
            if (this.hourFormat == '12')
                this.currentHour = date.getHours() == 0 ? 12 : date.getHours() % 12;
            else
                this.currentHour = date.getHours();
        }
        else if (this.timeOnly) {
            this.currentMinute = 0;
            this.currentHour = 0;
            this.currentSecond = 0;
        }
        this.createMonth(this.currentMonth, this.currentYear);
        this.ticksTo1970 = (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
            Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000);
        if (this.yearNavigator && this.yearRange) {
            this.yearOptions = [];
            var years = this.yearRange.split(':'), yearStart = parseInt(years[0]), yearEnd = parseInt(years[1]);
            for (var i = yearStart; i <= yearEnd; i++) {
                this.yearOptions.push(i);
            }
        }
    };
    AtParCalendar.prototype.currenthour = function () {
        var time = this.defaultDate || new Date();
        this.currentHour = time.getHours();
        this.updateTime();
        this.currentInputHour = null;
        event.preventDefault();
    };
    AtParCalendar.prototype.currentminute = function () {
        var minute = this.defaultDate || new Date();
        this.currentMinute = minute.getMinutes();
        this.updateTime();
        this.currentInputTime = null;
        event.preventDefault();
    };
    AtParCalendar.prototype.updatedTime = function (inputfield) {
        this.currentInputTime = inputfield.value;
        this.currentInputHour = inputfield.value;
        this.inputTime = inputfield.value;
        this.currenthour();
        this.currentminute();
        this.closeOverlay = false;
        //this.updatedTime();
        event.preventDefault();
    };
    AtParCalendar.prototype.ngAfterViewInit = function () {
        this.overlay = this.overlayViewChild.nativeElement;
        if (!this.inline && this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                this.domHandler.appendChild(this.overlay, this.appendTo);
        }
    };
    AtParCalendar.prototype.createMonth = function (month, year) {
        this.dates = [];
        this.currentMonth = month;
        this.currentYear = year;
        this.currentMonthText = this.locale.monthNames[month];
        var firstDay = this.getFirstDayOfMonthIndex(month, year);
        var daysLength = this.getDaysCountInMonth(month, year);
        var prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
        var sundayIndex = this.getSundayIndex();
        var dayNo = 1;
        var today = new Date();
        for (var i = 0; i < 6; i++) {
            var week = [];
            if (i == 0) {
                for (var j = (prevMonthDaysLength - firstDay + 1); j <= prevMonthDaysLength; j++) {
                    var prev = this.getPreviousMonthAndYear(month, year);
                    week.push({ day: j, month: prev.month, year: prev.year, otherMonth: true,
                        today: this.isToday(today, j, prev.month, prev.year), selectable: this.isSelectable(j, prev.month, prev.year) });
                }
                var remainingDaysLength = 7 - week.length;
                for (var j = 0; j < remainingDaysLength; j++) {
                    week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                        selectable: this.isSelectable(dayNo, month, year) });
                    dayNo++;
                }
            }
            else {
                for (var j = 0; j < 7; j++) {
                    if (dayNo > daysLength) {
                        var next = this.getNextMonthAndYear(month, year);
                        week.push({ day: dayNo - daysLength, month: next.month, year: next.year, otherMonth: true,
                            today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                            selectable: this.isSelectable((dayNo - daysLength), next.month, next.year) });
                    }
                    else {
                        week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                            selectable: this.isSelectable(dayNo, month, year) });
                    }
                    dayNo++;
                }
            }
            this.dates.push(week);
        }
    };
    AtParCalendar.prototype.prevMonth = function (event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        if (this.currentMonth === 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        else {
            this.currentMonth--;
        }
        this.createMonth(this.currentMonth, this.currentYear);
        event.preventDefault();
    };
    AtParCalendar.prototype.nextMonth = function (event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        if (this.currentMonth === 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        else {
            this.currentMonth++;
        }
        this.createMonth(this.currentMonth, this.currentYear);
        event.preventDefault();
    };
    AtParCalendar.prototype.onDateSelect = function (event, dateMeta) {
        if (this.disabled || !dateMeta.selectable) {
            event.preventDefault();
            return;
        }
        if (dateMeta.otherMonth) {
            if (this.selectOtherMonths)
                this.selectDate(dateMeta);
        }
        else {
            this.selectDate(dateMeta);
        }
        this.dateClick = true;
        this.updateInputfield();
        event.preventDefault();
    };
    AtParCalendar.prototype.updateInputfield = function () {
        if (this.value) {
            var formattedValue = void 0;
            if (this.timeOnly) {
                formattedValue = this.formatTime(this.value);
            }
            else {
                formattedValue = this.formatDate(this.value, this.dateFormat);
                if (this.showTime) {
                    formattedValue += ' ' + this.formatTime(this.value);
                }
            }
            this.inputFieldValue = formattedValue;
            if (this.inputTime != null && this.inputTime != undefined && this.inputTime != '') {
                this.inputFieldValue = this.inputTime;
                this.inputTime = null;
            }
            else if (this.currentInputHour != null && this.currentInputHour != undefined && this.currentInputHour != '') {
                this.inputFieldValue = this.currentInputTime;
                this.currentInputTime = null;
            }
            else if (this.currentInputTime != null && this.currentInputTime != undefined && this.currentInputTime != '') {
                this.inputFieldValue = this.currentInputTime;
                this.currentInputTime = null;
            }
            else {
                this.inputFieldValue = formattedValue;
            }
        }
        else {
            this.inputFieldValue = '';
        }
        this.updateFilledState();
    };
    AtParCalendar.prototype.selectDate = function (dateMeta) {
        this.value = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
        if (this.showTime) {
            if (this.hourFormat === '12' && this.pm && this.currentHour != 12)
                this.value.setHours(this.currentHour + 12);
            else
                this.value.setHours(this.currentHour);
            this.value.setMinutes(this.currentMinute);
            this.value.setSeconds(this.currentSecond);
        }
        this._isValid = true;
        this.updateModel();
        this.onSelect.emit(this.value);
    };
    AtParCalendar.prototype.updateModel = function () {
        if (this.dataType == 'date') {
            this.onModelChange(this.value);
        }
        else if (this.dataType == 'string') {
            if (this.timeOnly)
                this.onModelChange(this.formatTime(this.value));
            else
                this.onModelChange(this.formatDate(this.value, this.dateFormat));
        }
    };
    AtParCalendar.prototype.getFirstDayOfMonthIndex = function (month, year) {
        var day = new Date();
        day.setDate(1);
        day.setMonth(month);
        day.setFullYear(year);
        var dayIndex = day.getDay() + this.getSundayIndex();
        return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
    };
    AtParCalendar.prototype.getDaysCountInMonth = function (month, year) {
        return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
    };
    AtParCalendar.prototype.getDaysCountInPrevMonth = function (month, year) {
        var prev = this.getPreviousMonthAndYear(month, year);
        return this.getDaysCountInMonth(prev.month, prev.year);
    };
    AtParCalendar.prototype.getPreviousMonthAndYear = function (month, year) {
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
    AtParCalendar.prototype.getNextMonthAndYear = function (month, year) {
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
    AtParCalendar.prototype.getSundayIndex = function () {
        return this.locale.firstDayOfWeek > 0 ? 7 - this.locale.firstDayOfWeek : 0;
    };
    AtParCalendar.prototype.isSelected = function (dateMeta) {
        if (this.value)
            return this.value.getDate() === dateMeta.day && this.value.getMonth() === dateMeta.month && this.value.getFullYear() === dateMeta.year;
        else
            return false;
    };
    AtParCalendar.prototype.isToday = function (today, day, month, year) {
        return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    };
    AtParCalendar.prototype.isSelectable = function (day, month, year) {
        var validMin = true;
        var validMax = true;
        if (this.minDate) {
            if (this.minDate.getFullYear() > year) {
                validMin = false;
            }
            else if (this.minDate.getFullYear() === year) {
                if (this.minDate.getMonth() > month) {
                    validMin = false;
                }
                else if (this.minDate.getMonth() === month) {
                    if (this.minDate.getDate() > day) {
                        validMin = false;
                    }
                }
            }
        }
        if (this.maxDate) {
            if (this.maxDate.getFullYear() < year) {
                validMax = false;
            }
            else if (this.maxDate.getFullYear() === year) {
                if (this.maxDate.getMonth() < month) {
                    validMax = false;
                }
                else if (this.maxDate.getMonth() === month) {
                    if (this.maxDate.getDate() < day) {
                        validMax = false;
                    }
                }
            }
        }
        return validMin && validMax;
    };
    AtParCalendar.prototype.onInputFocus = function (inputfield, event) {
        this.focus = true;
        this.closeDiv = true;
        if (this.showOnFocus) {
            this.showOverlay(inputfield);
        }
        this.onFocus.emit(event);
    };
    AtParCalendar.prototype.onInputBlur = function (event) {
        this.focus = false;
        this.onBlur.emit(event);
        this.onModelTouched();
    };
    AtParCalendar.prototype.onButtonClick = function (event, inputfield) {
        this.closeOverlay = false;
        this.closeDiv = true;
        if (!this.overlay.offsetParent) {
            inputfield.focus();
            this.showOverlay(inputfield);
        }
        else
            this.closeOverlay = true;
    };
    AtParCalendar.prototype.onInputKeydown = function (event) {
        if (event.keyCode === 9) {
            this.overlayVisible = false;
        }
    };
    AtParCalendar.prototype.onClose = function () {
        this.closeDiv = false;
    };
    AtParCalendar.prototype.onMonthDropdownChange = function (m) {
        this.currentMonth = parseInt(m);
        this.createMonth(this.currentMonth, this.currentYear);
    };
    AtParCalendar.prototype.onYearDropdownChange = function (y) {
        this.currentYear = parseInt(y);
        this.createMonth(this.currentMonth, this.currentYear);
    };
    AtParCalendar.prototype.incrementHour = function (event) {
        var newHour = this.currentHour + this.stepHour;
        if (this.hourFormat == '24')
            this.currentHour = (newHour >= 24) ? (newHour - 24) : newHour;
        else if (this.hourFormat == '12')
            this.currentHour = (newHour >= 12) ? (newHour - 12) : newHour;
        this.updateTime();
        event.preventDefault();
    };
    AtParCalendar.prototype.decrementHour = function (event) {
        var newHour = this.currentHour - this.stepHour;
        if (this.hourFormat == '24')
            this.currentHour = (newHour < 0) ? (24 + newHour) : newHour;
        else if (this.hourFormat == '12')
            this.currentHour = (newHour < 0) ? (12 + newHour) : newHour;
        this.updateTime();
        event.preventDefault();
    };
    AtParCalendar.prototype.incrementMinute = function (event) {
        var newMinute = this.currentMinute + this.stepMinute;
        this.currentMinute = (newMinute > 59) ? newMinute - 60 : newMinute;
        this.updateTime();
        event.preventDefault();
    };
    AtParCalendar.prototype.decrementMinute = function (event) {
        var newMinute = this.currentMinute - this.stepMinute;
        this.currentMinute = (newMinute < 0) ? 60 + newMinute : newMinute;
        this.updateTime();
        event.preventDefault();
    };
    AtParCalendar.prototype.incrementSecond = function (event) {
        var newSecond = this.currentSecond + this.stepSecond;
        this.currentSecond = (newSecond > 59) ? newSecond - 60 : newSecond;
        this.updateTime();
        event.preventDefault();
    };
    AtParCalendar.prototype.decrementSecond = function (event) {
        var newSecond = this.currentSecond - this.stepSecond;
        this.currentSecond = (newSecond < 0) ? 60 + newSecond : newSecond;
        this.updateTime();
        event.preventDefault();
    };
    AtParCalendar.prototype.updateTime = function () {
        if (this.currentHour > 11) {
            this.pm = true;
            this.currentHour = this.currentHour - 12;
        }
        this.value = this.value || new Date();
        if (this.hourFormat.toString() === '12' && this.pm && this.currentHour != 12) {
            this.value.setHours(this.currentHour + 12);
        }
        else {
            //if (this.currentHour > 11)
            //{ 
            //    this.pm = true;
            //    this.currentHour = this.currentHour - 12;
            //}
            this.value.setHours(this.currentHour);
        }
        if (this.currentHour == 0 && this.pm) {
            this.currentHour = 12;
        }
        this.value.setMinutes(this.currentMinute);
        this.value.setSeconds(this.currentSecond);
        this.updateModel();
        this.onSelect.emit(this.value);
        this.updateInputfield();
    };
    AtParCalendar.prototype.toggleAMPM = function (event) {
        this.pm = !this.pm;
        this.updateTime();
        event.preventDefault();
    };
    AtParCalendar.prototype.onInput = function (event) {
        try {
            this.value = this.parseValueFromString(event.target.value);
            this.updateUI();
            this._isValid = true;
        }
        catch (err) {
            //invalid date
            this.value = null;
            this._isValid = false;
        }
        this.updateModel();
        this.updateFilledState();
    };
    AtParCalendar.prototype.parseValueFromString = function (text) {
        var dateValue;
        var parts = text.split(' ');
        if (this.timeOnly) {
            dateValue = new Date();
            this.populateTime(dateValue, parts[0], parts[1]);
        }
        else {
            if (this.showTime) {
                dateValue = this.parseDate(parts[0], this.dateFormat);
                this.populateTime(dateValue, parts[1], parts[2]);
            }
            else {
                dateValue = this.parseDate(text, this.dateFormat);
            }
        }
        return dateValue;
    };
    AtParCalendar.prototype.populateTime = function (value, timeString, ampm) {
        if (this.hourFormat == '12' && !ampm) {
            throw 'Invalid Time';
        }
        this.pm = (ampm === 'PM' || ampm === 'pm');
        var time = this.parseTime(timeString);
        value.setHours(time.hour);
        value.setMinutes(time.minute);
        value.setSeconds(time.second);
    };
    AtParCalendar.prototype.updateUI = function () {
        var val = this.value || this.defaultDate || new Date();
        this.createMonth(val.getMonth(), val.getFullYear());
        if (this.showTime || this.timeOnly) {
            var hours = val.getHours();
            if (this.hourFormat === '12') {
                if (hours >= 12) {
                    this.currentHour = (hours == 12) ? 12 : hours - 12;
                }
                else {
                    this.currentHour = (hours == 0) ? 12 : hours;
                }
            }
            else {
                this.currentHour = val.getHours();
            }
            this.currentMinute = val.getMinutes();
            this.currentSecond = val.getSeconds();
        }
    };
    AtParCalendar.prototype.onDatePickerClick = function (event) {
        this.closeOverlay = this.dateClick;
    };
    AtParCalendar.prototype.showOverlay = function (inputfield) {
        if (this.appendTo)
            this.domHandler.absolutePosition(this.overlay, inputfield);
        else
            this.domHandler.relativePosition(this.overlay, inputfield);
        this.overlayVisible = true;
        this.overlay.style.zIndex = String(++domhandler_1.DomHandler.zindex);
        this.bindDocumentClickListener();
    };
    AtParCalendar.prototype.writeValue = function (value) {
        this.value = value;
        if (this.value && typeof this.value === 'string') {
            this.value = this.parseValueFromString(this.value);
        }
        this.updateInputfield();
        this.updateUI();
    };
    AtParCalendar.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    AtParCalendar.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    AtParCalendar.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    // Ported from jquery-ui datepicker formatDate    
    AtParCalendar.prototype.formatDate = function (date, format) {
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
                            output += formatName("D", date.getDay(), this.locale.dayNamesShort, this.locale.dayNames);
                            break;
                        case "o":
                            output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case "m":
                            output += formatNumber("m", date.getMonth() + 1, 2);
                            break;
                        case "M":
                            output += formatName("M", date.getMonth(), this.locale.monthNamesShort, this.locale.monthNames);
                            break;
                        case "y":
                            output += (lookAhead("y") ? date.getFullYear() :
                                (date.getFullYear() % 100 < 10 ? "0" : "") + date.getFullYear() % 100);
                            break;
                        case "@":
                            output += date.getTime();
                            break;
                        case "!":
                            output += date.getTime() * 10000 + this.ticksTo1970;
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
    AtParCalendar.prototype.formatTime = function (date) {
        if (!date) {
            return '';
        }
        var output = '';
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        if (this.pm) {
            if (hours < 12) {
                hours += 12;
            }
        }
        else {
            if (hours > 12) {
                this.pm = true;
            }
        }
        if (this.hourFormat == '12' && this.pm && hours != 12) {
            hours = parseInt(hours) - 12;
        }
        output += (hours < 10) ? '0' + hours : hours;
        output += ':';
        output += (minutes < 10) ? '0' + minutes : minutes;
        if (this.showSeconds) {
            output += ':';
            output += (seconds < 10) ? '0' + seconds : seconds;
        }
        if (this.hourFormat == '12') {
            output += this.pm ? ' PM' : ' AM';
        }
        return output;
    };
    AtParCalendar.prototype.parseTime = function (value) {
        var tokens = value.split(':');
        var validTokenLength = this.showSeconds ? 3 : 2;
        if (tokens.length !== validTokenLength) {
            throw "Invalid time";
        }
        var h = parseInt(tokens[0]);
        var m = parseInt(tokens[1]);
        var s = this.showSeconds ? parseInt(tokens[2]) : null;
        if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.hourFormat == '12' && h > 12) || (this.showSeconds && (isNaN(s) || s > 59))) {
            throw "Invalid time";
        }
        else {
            if (this.hourFormat == '12' && h !== 12 && this.pm) {
                h += 12;
            }
            return { hour: h, minute: m, second: s };
        }
    };
    // Ported from jquery-ui datepicker parseDate 
    AtParCalendar.prototype.parseDate = function (value, format) {
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
                        getName("D", this.locale.dayNamesShort, this.locale.dayNames);
                        break;
                    case "o":
                        doy = getNumber("o");
                        break;
                    case "m":
                        month = getNumber("m");
                        break;
                    case "M":
                        month = getName("M", this.locale.monthNamesShort, this.locale.monthNames);
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
                        date = new Date((getNumber("!") - this.ticksTo1970) / 10000);
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
        date = this.daylightSavingAdjust(new Date(year, month - 1, day));
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
            throw "Invalid date"; // E.g. 31/02/00
        }
        return date;
    };
    AtParCalendar.prototype.daylightSavingAdjust = function (date) {
        if (!date) {
            return null;
        }
        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
        return date;
    };
    AtParCalendar.prototype.updateFilledState = function () {
        this.filled = this.inputFieldValue && this.inputFieldValue != '';
    };
    AtParCalendar.prototype.bindDocumentClickListener = function () {
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
    AtParCalendar.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    };
    AtParCalendar.prototype.ngOnDestroy = function () {
        this.unbindDocumentClickListener();
        if (!this.inline && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    };
    AtParCalendar.prototype.validate = function (c) {
        if (!this._isValid) {
            return { invalidDate: true };
        }
        return null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date)
    ], AtParCalendar.prototype, "defaultDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AtParCalendar.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AtParCalendar.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AtParCalendar.prototype, "inputStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AtParCalendar.prototype, "inputStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AtParCalendar.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AtParCalendar.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AtParCalendar.prototype, "dateFormat", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AtParCalendar.prototype, "inline", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AtParCalendar.prototype, "showOtherMonths", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AtParCalendar.prototype, "selectOtherMonths", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AtParCalendar.prototype, "showIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AtParCalendar.prototype, "icon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AtParCalendar.prototype, "appendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AtParCalendar.prototype, "readonlyInput", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AtParCalendar.prototype, "shortYearCutoff", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AtParCalendar.prototype, "monthNavigator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AtParCalendar.prototype, "yearNavigator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AtParCalendar.prototype, "yearRange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AtParCalendar.prototype, "showTime", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AtParCalendar.prototype, "hourFormat", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AtParCalendar.prototype, "timeOnly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AtParCalendar.prototype, "stepHour", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AtParCalendar.prototype, "stepMinute", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AtParCalendar.prototype, "stepSecond", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AtParCalendar.prototype, "showSeconds", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AtParCalendar.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AtParCalendar.prototype, "showOnFocus", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AtParCalendar.prototype, "dataType", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AtParCalendar.prototype, "onFocus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AtParCalendar.prototype, "onBlur", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AtParCalendar.prototype, "onSelect", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AtParCalendar.prototype, "locale", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AtParCalendar.prototype, "tabindex", void 0);
    __decorate([
        core_1.ViewChild('datepicker'),
        __metadata("design:type", core_1.ElementRef)
    ], AtParCalendar.prototype, "overlayViewChild", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [Date])
    ], AtParCalendar.prototype, "minDate", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [Date])
    ], AtParCalendar.prototype, "maxDate", null);
    AtParCalendar = __decorate([
        core_1.Component({
            selector: 'atpar-calendar',
            templateUrl: 'atparcalendar.html',
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
    ], AtParCalendar);
    return AtParCalendar;
}());
exports.AtParCalendar = AtParCalendar;
var AtparCalendarModule = (function () {
    function AtparCalendarModule() {
    }
    AtparCalendarModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, button_1.ButtonModule, inputtext_1.InputTextModule],
            exports: [AtParCalendar, button_1.ButtonModule, inputtext_1.InputTextModule],
            declarations: [AtParCalendar]
        })
    ], AtparCalendarModule);
    return AtparCalendarModule;
}());
exports.AtparCalendarModule = AtparCalendarModule;
//# sourceMappingURL=atparcalendar.js.map