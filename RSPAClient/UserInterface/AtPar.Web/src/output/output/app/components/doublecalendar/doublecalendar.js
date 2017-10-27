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
    useExisting: core_1.forwardRef(function () { return DoubleCalendar; }),
    multi: true
};
exports.CALENDAR_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return DoubleCalendar; }),
    multi: true
};
var DoubleCalendar = (function () {
    function DoubleCalendar(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.dateFormat = 'mm/dd/yy';
        this.inline = false;
        this.showOtherMonths = false;
        this.icon = 'fa-calendar';
        this.shortYearCutoff = '+10';
        this.hourFormat = '24';
        this.stepHour = 1;
        this.stepMinute = 1;
        this.stepSecond = 1;
        this.showSeconds = false;
        this.required = false;
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
    }
    ;
    Object.defineProperty(DoubleCalendar.prototype, "minDate", {
        get: function () {
            return this._minDate;
        },
        set: function (date) {
            this._minDate = date;
            this.createMonth(this.currentMonth, this.currentYear, 'Default');
            this.createNextMonth(this.monthNext, this.nextcurrentYear, 'Default'); //NEW
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoubleCalendar.prototype, "maxDate", {
        get: function () {
            return this._maxDate;
        },
        set: function (date) {
            this._maxDate = date;
            this.createMonth(this.currentMonth, this.currentYear, 'Default');
            this.createNextMonth(this.monthNext, this.nextcurrentYear, 'Default'); //NEW
        },
        enumerable: true,
        configurable: true
    });
    DoubleCalendar.prototype.ngOnInit = function () {
        localStorage.removeItem("FMDates");
        localStorage.removeItem("SMDates");
        localStorage.removeItem("FromDate");
        localStorage.removeItem("ToDate");
        this.closeDiv = true;
        var date = this.defaultDate || new Date();
        var dayIndex = this.locale.firstDayOfWeek;
        for (var i = 0; i < 7; i++) {
            this.weekDays.push(this.locale.dayNamesMin[dayIndex]);
            dayIndex = (dayIndex == 6) ? 0 : ++dayIndex;
        }
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
        if (this.currentMonth == 11) {
            this.monthNext = 0;
            this.nextcurrentYear = this.currentYear + 1;
        }
        else {
            this.monthNext = this.currentMonth + 1; //New
            this.nextcurrentYear = this.currentYear;
        }
        this.createMonth(this.currentMonth, this.currentYear, 'Default');
        this.createNextMonth(this.monthNext, this.nextcurrentYear, 'Default'); //NEW
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
        this.createMonth(this.currentMonth, this.currentYear, 'Default');
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
    DoubleCalendar.prototype.ngAfterViewInit = function () {
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
    DoubleCalendar.prototype.onClose = function () {
        this.closeDiv = false;
    };
    DoubleCalendar.prototype.createMonth = function (month, year, type) {
        if (type != 'Change') {
            if (localStorage.getItem("FromDate") != null) {
                this.fromDatevalue = new Date(localStorage.getItem("FromDate"));
                if (this.id == 'ToDatePicker' && this.fromDatevalue != undefined && this.fromDatevalue != null) {
                    month = this.fromDatevalue.getMonth();
                    year = this.fromDatevalue.getFullYear();
                }
            }
        }
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
                    week.push({
                        day: j, month: prev.month, year: prev.year, otherMonth: true,
                        today: this.isToday(today, j, prev.month, prev.year), selectable: this.isSelectable(j, prev.month, prev.year)
                    });
                }
                var remainingDaysLength = 7 - week.length;
                for (var j = 0; j < remainingDaysLength; j++) {
                    week.push({
                        day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                        selectable: this.isSelectable(dayNo, month, year)
                    });
                    dayNo++;
                }
            }
            else {
                for (var j = 0; j < 7; j++) {
                    if (dayNo > daysLength) {
                        var next = this.getNextMonthAndYear(month, year);
                        week.push({
                            day: dayNo - daysLength, month: next.month, year: next.year, otherMonth: true,
                            today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                            selectable: this.isSelectable((dayNo - daysLength), next.month, next.year)
                        });
                    }
                    else {
                        week.push({
                            day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                            selectable: this.isSelectable(dayNo, month, year)
                        });
                    }
                    dayNo++;
                }
            }
            this.dates.push(week);
        }
    };
    DoubleCalendar.prototype.createNextMonth = function (month, year, type) {
        this.dates1 = [];
        if (type != 'Change') {
            if (localStorage.getItem("FromDate") != null) {
                this.fromDatevalue = new Date(localStorage.getItem("FromDate"));
                // if (this.placeholder == 'To Date' && this.fromDatevalue != undefined && this.fromDatevalue != null) {
                if (this.id == 'ToDatePicker' && this.fromDatevalue != undefined && this.fromDatevalue != null) {
                    var m = this.fromDatevalue.getMonth();
                    var y = this.fromDatevalue.getFullYear();
                    if (m == 11) {
                        month = 0;
                        year = y + 1;
                    }
                    else {
                        month = m + 1;
                        year = y;
                    }
                }
            }
        }
        this.monthNext = month;
        this.nextMonthText = this.locale.monthNames[month];
        this.nextcurrentYear = year;
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
                    week.push({
                        day: j, month: prev.month, year: prev.year, otherMonth: true,
                        today: this.isToday(today, j, prev.month, prev.year), selectable: this.isSelectable(j, prev.month, prev.year)
                    });
                }
                var remainingDaysLength = 7 - week.length;
                for (var j = 0; j < remainingDaysLength; j++) {
                    week.push({
                        day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                        selectable: this.isSelectable(dayNo, month, year)
                    });
                    dayNo++;
                }
            }
            else {
                for (var j = 0; j < 7; j++) {
                    if (dayNo > daysLength) {
                        var next = this.getNextMonthAndYear(month, year);
                        week.push({
                            day: dayNo - daysLength, month: next.month, year: next.year, otherMonth: true,
                            today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                            selectable: this.isSelectable((dayNo - daysLength), next.month, next.year)
                        });
                    }
                    else {
                        week.push({
                            day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                            selectable: this.isSelectable(dayNo, month, year)
                        });
                    }
                    dayNo++;
                }
            }
            this.dates1.push(week);
        }
    };
    DoubleCalendar.prototype.prevMonth = function (event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        if (this.currentMonth === 0) {
            this.currentMonth = 11;
            this.currentYear--;
            this.monthNext = 0;
            this.nextcurrentYear = this.currentYear + 1;
        }
        else {
            this.currentMonth--;
            this.monthNext = this.currentMonth + 1;
            this.nextcurrentYear = this.currentYear;
        }
        this.createMonth(this.currentMonth, this.currentYear, 'Change');
        this.createNextMonth(this.monthNext, this.nextcurrentYear, 'Change'); //NEW
        event.preventDefault();
    };
    DoubleCalendar.prototype.nextMonth = function (event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        if (this.currentMonth === 11) {
            this.currentMonth = 0;
            this.currentYear++;
            this.monthNext = this.currentMonth + 1; //New           
        }
        else if (this.currentMonth === 10) {
            this.currentMonth++;
            this.monthNext = 0; //New
            this.nextcurrentYear = this.currentYear + 1;
        }
        else {
            this.currentMonth++;
            this.monthNext = this.currentMonth + 1; //New         
            this.nextcurrentYear = this.currentYear;
        }
        this.createMonth(this.currentMonth, this.currentYear, 'Change');
        this.createNextMonth(this.monthNext, this.nextcurrentYear, 'Change'); //NEW
        localStorage.setItem("FMDates", JSON.stringify(this.dates));
        localStorage.setItem("SMDates", JSON.stringify(this.dates1));
        event.preventDefault();
    };
    DoubleCalendar.prototype.onCurrentMonthDropdownChange = function (m) {
        this.currentMonth = parseInt(m);
        if (this.currentMonth === 0) {
            this.monthNext = parseInt(m) + 1;
            this.nextcurrentYear = this.currentYear;
        }
        else if (this.currentMonth === 11) {
            this.monthNext = 0;
            this.nextcurrentYear = this.currentYear + 1;
        }
        else {
            this.monthNext = this.currentMonth + 1;
            this.nextcurrentYear = this.currentYear;
        }
        this.createMonth(this.currentMonth, this.currentYear, 'Change');
        this.createNextMonth(this.monthNext, this.nextcurrentYear, 'Change'); //NEW
    };
    DoubleCalendar.prototype.onNextMonthDropdownChange = function (m) {
        this.monthNext = parseInt(m);
        if (this.monthNext === 0) {
            this.currentMonth = 11;
            this.currentYear = this.nextcurrentYear - 1;
        }
        else if (this.currentMonth == 11) {
            this.currentMonth = this.monthNext - 1;
            this.currentYear++;
        }
        else {
            this.currentMonth = this.monthNext - 1;
        }
        this.createMonth(this.currentMonth, this.currentYear, 'Change');
        this.createNextMonth(this.monthNext, this.nextcurrentYear, 'Change'); //NEW
    };
    DoubleCalendar.prototype.onCurrentYearDropdownChange = function (y) {
        this.currentYear = parseInt(y);
        if (this.currentMonth == 11) {
            this.nextcurrentYear = this.currentYear + 1;
        }
        else {
            this.nextcurrentYear = this.currentYear;
        }
        this.createMonth(this.currentMonth, this.currentYear, 'Default');
    };
    DoubleCalendar.prototype.onNextYearDropdownChange = function (y) {
        this.nextcurrentYear = parseInt(y);
        if (this.monthNext == 0) {
            this.currentYear = this.nextcurrentYear - 1;
        }
        else {
            this.currentYear = parseInt(y);
        }
        this.createNextMonth(this.monthNext, this.nextcurrentYear, 'Default');
    };
    DoubleCalendar.prototype.onDateSelect = function (event, dateMeta) {
        if (this.placeholder == 'From Date') {
        }
        if (this.disabled || !dateMeta.selectable) {
            event.preventDefault();
            return;
        }
        if (dateMeta.otherMonth) {
            if (this.selectOtherMonths) {
                this.selectDate(dateMeta);
            }
            else {
                event.preventDefault();
                return;
            }
        }
        else {
            this.selectDate(dateMeta);
            this.dateClick = true;
            this.updateInputfield();
            event.preventDefault();
        }
    };
    DoubleCalendar.prototype.updateInputfield = function () {
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
        }
        else {
            this.inputFieldValue = '';
        }
        this.updateFilledState();
    };
    DoubleCalendar.prototype.selectDate = function (dateMeta) {
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
    DoubleCalendar.prototype.updateModel = function () {
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
    DoubleCalendar.prototype.getFirstDayOfMonthIndex = function (month, year) {
        var day = new Date();
        day.setDate(1);
        day.setMonth(month);
        day.setFullYear(year);
        var dayIndex = day.getDay() + this.getSundayIndex();
        return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
    };
    DoubleCalendar.prototype.getDaysCountInMonth = function (month, year) {
        return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
    };
    DoubleCalendar.prototype.getDaysCountInPrevMonth = function (month, year) {
        var prev = this.getPreviousMonthAndYear(month, year);
        return this.getDaysCountInMonth(prev.month, prev.year);
    };
    DoubleCalendar.prototype.getPreviousMonthAndYear = function (month, year) {
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
    DoubleCalendar.prototype.getNextMonthAndYear = function (month, year) {
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
    DoubleCalendar.prototype.getSundayIndex = function () {
        return this.locale.firstDayOfWeek > 0 ? 7 - this.locale.firstDayOfWeek : 0;
    };
    DoubleCalendar.prototype.isSelected = function (dateMeta) {
        if ((localStorage.getItem("FromDate") != undefined) && (localStorage.getItem("FromDate") != null)) {
            var dateString = localStorage.getItem("FromDate");
            this.value = new Date(dateString);
            return this.value.getDate() === dateMeta.day && this.value.getMonth() === dateMeta.month && this.value.getFullYear() === dateMeta.year;
        }
        if (this.value) {
            return this.value.getDate() === dateMeta.day && this.value.getMonth() === dateMeta.month && this.value.getFullYear() === dateMeta.year;
        }
        else {
            return false;
        }
    };
    DoubleCalendar.prototype.isToday = function (today, day, month, year) {
        return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    };
    DoubleCalendar.prototype.isSelectable = function (day, month, year) {
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
    DoubleCalendar.prototype.onInputFocus = function (inputfield, event) {
        this.focus = true;
        this.closeDiv = true;
        if (this.showOnFocus) {
            this.showOverlay(inputfield);
        }
        this.onFocus.emit(event);
    };
    DoubleCalendar.prototype.onInputBlur = function (event) {
        this.focus = false;
        this.onBlur.emit(event);
        this.onModelTouched();
    };
    DoubleCalendar.prototype.onButtonClick = function (event, inputfield) {
        this.closeDiv = true;
        this.closeOverlay = false;
        if (!this.overlay.offsetParent) {
            inputfield.focus();
            this.showOverlay(inputfield);
        }
        else
            this.closeOverlay = true;
    };
    DoubleCalendar.prototype.onInputKeydown = function (event) {
        if (event.keyCode === 9) {
            this.overlayVisible = false;
        }
    };
    DoubleCalendar.prototype.incrementHour = function (event) {
        var newHour = this.currentHour + this.stepHour;
        if (this.hourFormat == '24')
            this.currentHour = (newHour >= 24) ? (newHour - 24) : newHour;
        else if (this.hourFormat == '12')
            this.currentHour = (newHour >= 13) ? (newHour - 12) : newHour;
        this.updateTime();
        event.preventDefault();
    };
    DoubleCalendar.prototype.decrementHour = function (event) {
        var newHour = this.currentHour - this.stepHour;
        if (this.hourFormat == '24')
            this.currentHour = (newHour < 0) ? (24 + newHour) : newHour;
        else if (this.hourFormat == '12')
            this.currentHour = (newHour <= 0) ? (12 + newHour) : newHour;
        this.updateTime();
        event.preventDefault();
    };
    DoubleCalendar.prototype.incrementMinute = function (event) {
        var newMinute = this.currentMinute + this.stepMinute;
        this.currentMinute = (newMinute > 59) ? newMinute - 60 : newMinute;
        this.updateTime();
        event.preventDefault();
    };
    DoubleCalendar.prototype.decrementMinute = function (event) {
        var newMinute = this.currentMinute - this.stepMinute;
        this.currentMinute = (newMinute < 0) ? 60 + newMinute : newMinute;
        this.updateTime();
        event.preventDefault();
    };
    DoubleCalendar.prototype.incrementSecond = function (event) {
        var newSecond = this.currentSecond + this.stepSecond;
        this.currentSecond = (newSecond > 59) ? newSecond - 60 : newSecond;
        this.updateTime();
        event.preventDefault();
    };
    DoubleCalendar.prototype.decrementSecond = function (event) {
        var newSecond = this.currentSecond - this.stepSecond;
        this.currentSecond = (newSecond < 0) ? 60 + newSecond : newSecond;
        this.updateTime();
        event.preventDefault();
    };
    DoubleCalendar.prototype.updateTime = function () {
        this.value = this.value || new Date();
        if (this.hourFormat === '12' && this.pm && this.currentHour != 12)
            this.value.setHours(this.currentHour + 12);
        else
            this.value.setHours(this.currentHour);
        this.value.setMinutes(this.currentMinute);
        this.value.setSeconds(this.currentSecond);
        this.updateModel();
        this.onSelect.emit(this.value);
        this.updateInputfield();
    };
    DoubleCalendar.prototype.toggleAMPM = function (event) {
        this.pm = !this.pm;
        this.updateTime();
        event.preventDefault();
    };
    DoubleCalendar.prototype.onInput = function (event) {
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
    DoubleCalendar.prototype.parseValueFromString = function (text) {
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
    DoubleCalendar.prototype.populateTime = function (value, timeString, ampm) {
        if (this.hourFormat == '12' && !ampm) {
            throw 'Invalid Time';
        }
        this.pm = (ampm === 'PM' || ampm === 'pm');
        var time = this.parseTime(timeString);
        value.setHours(time.hour);
        value.setMinutes(time.minute);
        value.setSeconds(time.second);
    };
    DoubleCalendar.prototype.updateUI = function () {
        var val = this.value || this.defaultDate || new Date();
        this.createMonth(val.getMonth(), val.getFullYear(), 'Default');
        if (val.getMonth() === 11) {
            this.createNextMonth(1, val.getFullYear() + 1, 'Default'); //NEW
        }
        else if (val.getMonth() === 10) {
            this.createNextMonth(0, val.getFullYear() + 1, 'Default'); //NEW
        }
        else {
            this.createNextMonth(val.getMonth() + 1, val.getFullYear(), 'Default'); //NEW
        }
    };
    DoubleCalendar.prototype.onDatePickerClick = function (event) {
        this.closeOverlay = this.dateClick;
    };
    DoubleCalendar.prototype.showOverlay = function (inputfield) {
        if (this.appendTo)
            this.domHandler.absolutePosition(this.overlay, inputfield);
        else
            this.domHandler.relativePosition(this.overlay, inputfield);
        this.overlayVisible = true;
        this.overlay.style.zIndex = String(++domhandler_1.DomHandler.zindex);
        this.bindDocumentClickListener();
    };
    DoubleCalendar.prototype.writeValue = function (value) {
        this.value = value;
        if (this.value && typeof this.value === 'string') {
            this.value = this.parseValueFromString(this.value);
        }
        this.updateInputfield();
        this.updateUI();
    };
    DoubleCalendar.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    DoubleCalendar.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    DoubleCalendar.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    // Ported from jquery-ui datepicker formatDate    
    DoubleCalendar.prototype.formatDate = function (date, format) {
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
    DoubleCalendar.prototype.formatTime = function (date) {
        if (!date) {
            return '';
        }
        var output = '';
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        if (this.hourFormat == '12' && this.pm && hours != 12) {
            hours -= 12;
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
    DoubleCalendar.prototype.parseTime = function (value) {
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
    DoubleCalendar.prototype.parseDate = function (value, format) {
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
    DoubleCalendar.prototype.daylightSavingAdjust = function (date) {
        if (!date) {
            return null;
        }
        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
        return date;
    };
    DoubleCalendar.prototype.updateFilledState = function () {
        this.filled = this.inputFieldValue && this.inputFieldValue != '';
    };
    DoubleCalendar.prototype.bindDocumentClickListener = function () {
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
    DoubleCalendar.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    };
    DoubleCalendar.prototype.ngOnDestroy = function () {
        this.unbindDocumentClickListener();
        if (!this.inline && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    };
    DoubleCalendar.prototype.validate = function (c) {
        if (!this._isValid) {
            return { invalidDate: true };
        }
        return null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date)
    ], DoubleCalendar.prototype, "defaultDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DoubleCalendar.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DoubleCalendar.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DoubleCalendar.prototype, "inputStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DoubleCalendar.prototype, "inputStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DoubleCalendar.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DoubleCalendar.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DoubleCalendar.prototype, "dateFormat", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DoubleCalendar.prototype, "inline", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DoubleCalendar.prototype, "showOtherMonths", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DoubleCalendar.prototype, "selectOtherMonths", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DoubleCalendar.prototype, "showIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DoubleCalendar.prototype, "icon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DoubleCalendar.prototype, "appendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DoubleCalendar.prototype, "readonlyInput", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DoubleCalendar.prototype, "shortYearCutoff", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DoubleCalendar.prototype, "monthNavigator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DoubleCalendar.prototype, "yearNavigator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DoubleCalendar.prototype, "yearRange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DoubleCalendar.prototype, "showTime", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DoubleCalendar.prototype, "hourFormat", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DoubleCalendar.prototype, "timeOnly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DoubleCalendar.prototype, "stepHour", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DoubleCalendar.prototype, "stepMinute", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DoubleCalendar.prototype, "stepSecond", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DoubleCalendar.prototype, "showSeconds", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DoubleCalendar.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DoubleCalendar.prototype, "showOnFocus", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DoubleCalendar.prototype, "dataType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DoubleCalendar.prototype, "id", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DoubleCalendar.prototype, "onFocus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DoubleCalendar.prototype, "onBlur", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DoubleCalendar.prototype, "onSelect", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DoubleCalendar.prototype, "locale", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DoubleCalendar.prototype, "tabindex", void 0);
    __decorate([
        core_1.ViewChild('datepicker'),
        __metadata("design:type", core_1.ElementRef)
    ], DoubleCalendar.prototype, "overlayViewChild", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [Date])
    ], DoubleCalendar.prototype, "minDate", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [Date])
    ], DoubleCalendar.prototype, "maxDate", null);
    DoubleCalendar = __decorate([
        core_1.Component({
            selector: 'p-calendar',
            templateUrl: 'doublecalendar.html',
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
    ], DoubleCalendar);
    return DoubleCalendar;
}());
exports.DoubleCalendar = DoubleCalendar;
var DoubleCalendarModule = (function () {
    function DoubleCalendarModule() {
    }
    DoubleCalendarModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, button_1.ButtonModule, inputtext_1.InputTextModule],
            exports: [DoubleCalendar, button_1.ButtonModule, inputtext_1.InputTextModule],
            declarations: [DoubleCalendar]
        })
    ], DoubleCalendarModule);
    return DoubleCalendarModule;
}());
exports.DoubleCalendarModule = DoubleCalendarModule;
//# sourceMappingURL=doublecalendar.js.map