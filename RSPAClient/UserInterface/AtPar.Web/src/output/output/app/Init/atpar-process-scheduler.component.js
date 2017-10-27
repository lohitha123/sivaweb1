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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var atpar_process_scheduler_service_1 = require("./atpar-process-scheduler.service");
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var router_1 = require("@angular/router");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var MT_ATPAR_SCHEDULE_HEADER_1 = require("../Entities/MT_ATPAR_SCHEDULE_HEADER");
var MT_ATPAR_PROCESS_SCHEDULER_1 = require("../Entities/MT_ATPAR_PROCESS_SCHEDULER");
var AtParConstants_1 = require("../Shared/AtParConstants");
var api_1 = require("../components/common/api");
var routepath_1 = require("../AtPar/Menus/routepath");
var ProcessScheduler = (function () {
    /*variable declaration ending*/
    /**
     * Constructor
     * @param dataservice
     * @param leftBarAnimationservice
     * @param router
     * @param route
     * @param processSchedulerService
     * @param httpService
     * @param spinnerService
     */
    function ProcessScheduler(leftBarAnimationservice, router, processSchedulerService, httpService, spinnerService, atParConstant, confirmationService) {
        this.leftBarAnimationservice = leftBarAnimationservice;
        this.router = router;
        this.processSchedulerService = processSchedulerService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.confirmationService = confirmationService;
        /** Variable Declaration*/
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstSchedule = [];
        this.lstOrgGroupData = [];
        this.orgGroupData = [];
        this.blnShowOrgGroupLabel = false;
        this.orgGrpId = "";
        this.blnShowOrgGroupDD = false;
        this.timeInterName = '';
        this.stringMode = '';
        this.hideSChedule = true;
        this.blnSubmit = false;
        this.orgGroupString = '';
        this.lstSchedDetails = [];
        this.lstScheduler = [];
        this.strStartTime = "";
        this.strStartTimeedit = "";
        this.strEndTime = "";
        this.strEndTimeedit = "";
        this.editTrue = false;
        this.createTrue = false;
        this.statusCode = -1;
        this.lstOrgGroupsInfo = [];
        this.strSearchString = "";
        this.ven = new MT_ATPAR_PROCESS_SCHEDULER_1.MT_ATPAR_PROCESS_SCHEDULER();
        this.loading = true;
        this.day1 = false;
        this.inter1 = false;
        this.day2 = false;
        this.inter2 = false;
        this.schItem = new MT_ATPAR_SCHEDULE_HEADER_1.MT_ATPAR_SCHEDULE_HEADER();
        this.schCreItem = new MT_ATPAR_SCHEDULE_HEADER_1.MT_ATPAR_SCHEDULE_HEADER();
        this.lstDBData = [];
        this.checkedSpecificDays = false;
        this.checkedIntervals = false;
        this.orgGroup = "";
        this.SCHEDULE_ID = "";
        this.DESCRIPTION = "";
        this.ORG_GROUP_ID = "";
        this.disableButton = true;
        this.breadCrumbMenu = new routepath_1.Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    /**
     redirecting to home when click on breadcrumbs
     */
    ProcessScheduler.prototype.homeurl = function () {
        this.leftBarAnimationservice.isHomeClicked = false;
        this.leftBarAnimationservice.isHide();
        this.router.navigate(['atpar']);
    };
    /**
     * Init Function for getting all the schedule data and org group data when page load
     */
    ProcessScheduler.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.lstSchedule = [];
                    this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                    this.spinnerService.start();
                    this.getSchedulesDetails();
                }
                catch (ex) {
                    this.displayCatchException(ex, "ngOnInit");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Getiing Schedules form Database
     */
    ProcessScheduler.prototype.getSchedulesDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var OrgGroup, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.lstSchedule = [];
                        OrgGroup = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].charAt(0).toUpperCase() + this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].substr(1).toLowerCase();
                        return [4 /*yield*/, this.processSchedulerService.getScheduleIDs(OrgGroup)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                var schedules = data.DataList;
                                _this.lstSchedule.push({ label: 'Select One', value: '' });
                                for (var i = 0; i < schedules.length; i++) {
                                    _this.lstSchedule.push({ label: schedules[i].SCHEDULE_ID + '-' + schedules[i].DESCRIPTION, value: schedules[i].SCHEDULE_ID, OrgId: schedules[i].ORG_GROUP_ID });
                                }
                                _this.spinnerService.stop();
                                _this.bindOrgGroups();
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.displayCatchException(ex_1, "getSchedulesDetails");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * When we change ScheduleId this event will fire
     * @param event
     */
    ProcessScheduler.prototype.ddlSelectChangeScheduleID = function (event) {
        try {
            this.growlMessage = [];
            this.SCHEDULE_ID = event.value;
            this.DESCRIPTION = event.label.split('-')[1];
            this.ORG_GROUP_ID = event.OrgId;
            if (this.lstDBData.length > 0) {
                this.day1 = true;
                this.inter1 = false;
            }
            else {
                this.day1 = false;
            }
            if (this.strStartTime != "") {
                if (this.day1 == true) {
                    this.inter1 = false;
                }
                else {
                    this.inter1 = true;
                    this.day1 = false;
                }
            }
            else {
                this.inter1 = false;
                this.day1 = true;
            }
            this.createTrue = false;
            this.editTrue = false;
        }
        catch (ex) {
            this.displayCatchException(ex, "ddlSelectChangeScheduleID");
        }
    };
    /**
     * When we change orgid this event will fire
     * @param event
     */
    ProcessScheduler.prototype.ddlSelectChangeOrgID = function (event) {
        this.growlMessage = [];
        try {
            if (this.checkedSpecificDays == true) {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].CHK_MON == false && this.lstDBData[i].CHK_TUE == false && this.lstDBData[i].CHK_WED == false && this.lstDBData[i].CHK_THR == false && this.lstDBData[i].CHK_FRI == false && this.lstDBData[i].CHK_SAT == false && this.lstDBData[i].CHK_SUN == false) {
                        this.disableButton = true;
                    }
                    else if ((this.lstDBData[i].CHK_MON == true || this.lstDBData[i].CHK_TUE == true || this.lstDBData[i].CHK_WED == true || this.lstDBData[i].CHK_THR == true || this.lstDBData[i].CHK_FRI == true || this.lstDBData[i].CHK_SAT == true || this.lstDBData[i].CHK_SUN == true)) {
                        if (this.orgGrpId != "") {
                            if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                this.disableButton = false;
                            }
                        }
                        else {
                            if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                if ((this.schCreItem.ORG_GROUP_ID == undefined) || (this.schCreItem.ORG_GROUP_ID == "")) {
                                    this.disableButton = true;
                                }
                                else {
                                    this.disableButton = false;
                                }
                            }
                        }
                    }
                }
            }
            else {
                if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                    if ((this.schCreItem.ORG_GROUP_ID != undefined || this.schCreItem.ORG_GROUP_ID != "")) {
                        if (this.checkedIntervals == true) {
                            if ((this.schCreItem.ORG_GROUP_ID == 'Select One' || this.schCreItem.ORG_GROUP_ID == "")) {
                                this.disableButton = true;
                            }
                            else if (this.schCreItem.INTERVAL == 0) {
                                this.disableButton = true;
                            }
                            else {
                                this.disableButton = false;
                            }
                        }
                    }
                }
                else {
                    this.disableButton = true;
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "ddlSelectChangeOrgID");
        }
    };
    /**
     * get schedule details based on selected schedule
     * @param selectedSchedule
     */
    ProcessScheduler.prototype.getSchedules = function (selectedSchedule) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.stringMode = "UPDATE";
                        this.editTrue = false;
                        this.createTrue = false;
                        this.disableButton = false;
                        this.schItem.SCHEDULE_ID = this.SCHEDULE_ID;
                        this.schItem.DESCRIPTION = this.DESCRIPTION;
                        this.schItem.ORG_GROUP_ID = this.ORG_GROUP_ID;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!(selectedSchedule == null || selectedSchedule == '' || selectedSchedule == undefined)) return [3 /*break*/, 2];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select a schedule' });
                        return [3 /*break*/, 5];
                    case 2:
                        this.createTrue = false;
                        return [4 /*yield*/, this.processSchedulerService.getSheduleDetails(selectedSchedule)
                                .catch(this.httpService.handleError).then(function (res) {
                                _this.editTrue = true;
                                var data = res.json();
                                _this.lstDBData = data.DataVariable["m_Item1"];
                                _this.orgGroup = data.DataVariable["m_Item6"];
                                _this.schItem.ORG_GROUP_ID = data.DataVariable["m_Item6"];
                                _this.intSchedType = data.DataVariable["m_Item5"];
                                _this.strStartTime = data.DataVariable["m_Item2"];
                                _this.strStartTimeedit = data.DataVariable["m_Item2"];
                                _this.strEndTimeedit = data.DataVariable["m_Item3"];
                                _this.strEndTime = data.DataVariable["m_Item3"];
                                _this.intInterval = data.DataVariable["m_Item4"];
                                _this.schCreItem.INTERVAL = data.DataVariable["m_Item4"];
                                if (_this.lstDBData.length > 0) {
                                    _this.day1 = true;
                                    _this.inter1 = false;
                                }
                                else {
                                    _this.day1 = false;
                                }
                                if (_this.strStartTime != "") {
                                    if (_this.day1 == true) {
                                        _this.inter1 = false;
                                    }
                                    else {
                                        _this.inter1 = true;
                                        _this.day1 = false;
                                    }
                                }
                                else {
                                    _this.inter1 = false;
                                    _this.day1 = true;
                                }
                                if (_this.lstDBData.length > 0) {
                                    for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                        _this.lstDBData[i].SNo = i + 1;
                                        var timee = _this.lstDBData[i].SCHEDULE_TIME;
                                        //if (timee != "") {
                                        //    var hours = Number(timee.match(/^(\d+)/)[1]);
                                        //    var minutes = Number(timee.match(/:(\d+)/)[1]);
                                        //    var AMPM1 = timee[6] + timee[7];
                                        //    if (AMPM1 == "PM" && hours < 12) hours = hours + 12;
                                        //    if (AMPM1 == "AM" && hours == 12) hours = hours - 12;
                                        //    var sHours = hours.toString();
                                        //    var sMinutes = minutes.toString();
                                        //    if (hours < 10) sHours = "0" + sHours;
                                        //    if (minutes < 10) sMinutes = "0" + sMinutes;
                                        //    this.lstDBData[i].SCHEDULE_TIME = sHours + ":" + sMinutes;
                                        //}
                                    }
                                }
                                //if (this.strStartTime != "") {
                                //    var time = this.strStartTime;
                                //    if (time != "") {
                                //        var hours = Number(time.match(/^(\d+)/)[1]);
                                //        var minutes = Number(time.match(/:(\d+)/)[1]);
                                //        var AMPM = time[6] + time[7];
                                //        if (AMPM == "PM" && hours < 12) hours = hours + 12;
                                //        if (AMPM == "AM" && hours == 12) hours = hours - 12;
                                //        var sHours = hours.toString();
                                //        var sMinutes = minutes.toString();
                                //        if (hours < 10) sHours = "0" + sHours;
                                //        if (minutes < 10) sMinutes = "0" + sMinutes;
                                //        this.strStartTime = sHours + ":" + sMinutes;
                                //    }
                                //}
                                //if (this.strEndTime != "") {
                                //    var time = this.strEndTime;
                                //    if (time != "") {
                                //        var hours = Number(time.match(/^(\d+)/)[1]);
                                //        var minutes = Number(time.match(/:(\d+)/)[1]);
                                //        var AMPM = time[6] + time[7];
                                //        if (AMPM == "PM" && hours < 12) hours = hours + 12;
                                //        if (AMPM == "AM" && hours == 12) hours = hours - 12;
                                //        var sHours = hours.toString();
                                //        var sMinutes = minutes.toString();
                                //        if (hours < 10) sHours = "0" + sHours;
                                //        if (minutes < 10) sMinutes = "0" + sMinutes;
                                //        this.strEndTime = sHours + ":" + sMinutes;
                                //    }
                                //}
                                _this.spinnerService.stop();
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.processSchedulerService.getOrgGroupIDS()
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.lstOrgGroupsInfo = data.DataList;
                                var v = _this.lstOrgGroupsInfo.filter(function (x) { return x.ORG_GROUP_ID == _this.schItem.ORG_GROUP_ID; });
                                _this.schItem.ORG_GROUP_ID = _this.schItem.ORG_GROUP_ID + ' - ' + v[0].ORG_GROUP_NAME;
                                _this.spinnerService.stop();
                            })];
                    case 4:
                        _a.sent();
                        if (this.intSchedType == AtParEnums_1.ScheduleType_Enum.DAYS) {
                            this.checkedSpecificDays = true;
                            this.checkedIntervals = false;
                            this.bindGrid();
                        }
                        else if (this.intSchedType == AtParEnums_1.ScheduleType_Enum.INTERVALS) {
                            this.inter1 = true;
                            this.day1 = false;
                            this.checkedSpecificDays = false;
                            this.checkedIntervals = true;
                        }
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        ex_2 = _a.sent();
                        this.displayCatchException(ex_2, "getSchedules");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This is for showing gird when click on specific days check box
     */
    ProcessScheduler.prototype.bindGrid = function () {
        this.day1 = true;
    };
    /**
     * This method is for submitting specific days interval
     * @param ven
     */
    ProcessScheduler.prototype.btnSubmitSpecificDays = function (ven) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (this.stringMode == "ADD") {
                        }
                        if (!(this.stringMode == "UPDATE" || this.stringMode == "ADD")) return [3 /*break*/, 3];
                        if (!(this.lstDBData.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.updateDataset()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        ex_3 = _a.sent();
                        this.displayCatchException(ex_3, "btnSubmitSpecificDays");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Updating time  24 hours  to 12 hours format
     */
    ProcessScheduler.prototype.updateDataset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stime, etime, currentMonth, currentYear, currentHour, currentMinute, currentSecond, startTime, endTime, startTotalTime, endTotalTime, sttime, ettime, timeSplit, i, dt, timeConverMinutes, amTime, amTimeMinutes, pmTime, pmTimeMinutes, intCnt, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        stime = "";
                        etime = "";
                        currentMonth = void 0;
                        currentYear = void 0;
                        currentHour = void 0;
                        currentMinute = void 0;
                        currentSecond = void 0;
                        startTime = '';
                        endTime = '';
                        startTotalTime = void 0;
                        endTotalTime = void 0;
                        sttime = '';
                        ettime = '';
                        timeSplit = [];
                        if (this.checkedSpecificDays == true) {
                            for (i = 0; i < this.lstDBData.length; i++) {
                                if (this.lstDBData[i].CHK_MON == false && this.lstDBData[i].CHK_TUE == false && this.lstDBData[i].CHK_WED == false && this.lstDBData[i].CHK_THR == false && this.lstDBData[i].CHK_FRI == false && this.lstDBData[i].CHK_SAT == false && this.lstDBData[i].CHK_SUN == false) {
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Schedule days not selected' });
                                    return [2 /*return*/];
                                }
                                if (this.lstDBData[i].SCHEDULE_TIME == null || this.lstDBData[i].SCHEDULE_TIME == '' || this.lstDBData[i].SCHEDULE_TIME == undefined) {
                                    this.growlMessage = [];
                                    this.spinnerService.stop();
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                                    return [2 /*return*/];
                                }
                                if (this.lstDBData[i].SCHEDULE_TIME != null && this.lstDBData[i].SCHEDULE_TIME != '' && this.lstDBData[i].SCHEDULE_TIME != undefined) {
                                    dt = this.lstDBData[i].SCHEDULE_TIME.toString();
                                    if (dt.length > 11) {
                                        if (this.lstDBData[i].SCHEDULE_TIME != '') {
                                            stime = new Date(this.lstDBData[i].SCHEDULE_TIME).getHours() + ':' + new Date(this.lstDBData[i].SCHEDULE_TIME).getMinutes();
                                            timeSplit = stime.split(":");
                                            this.timeConversion = +(timeSplit[0]);
                                            timeConverMinutes = void 0;
                                            timeConverMinutes = +(timeSplit[1]);
                                            if (this.timeConversion < 12) {
                                                amTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                                                amTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                                                if (amTime == "00") {
                                                    amTime = "12";
                                                }
                                                this.lstDBData[i].SCHEDULE_TIME = amTime + ':' + amTimeMinutes + ' AM';
                                            }
                                            else {
                                                this.timeConversion = this.timeConversion - 12;
                                                pmTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                                                pmTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                                                if (pmTime == "00") {
                                                    pmTime = "12";
                                                }
                                                this.lstDBData[i].SCHEDULE_TIME = pmTime + ':' + pmTimeMinutes + ' PM';
                                            }
                                        }
                                        else {
                                            this.growlMessage = [];
                                            this.spinnerService.stop();
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                                            return [2 /*return*/];
                                        }
                                    }
                                }
                                else {
                                    this.growlMessage = [];
                                    this.spinnerService.stop();
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                                    return [2 /*return*/];
                                }
                            }
                        }
                        if (this.stringMode == "ADD") {
                            if (this.orgGrpId != "" || this.orgGrpId != null || this.orgGrpId != undefined) {
                                if (this.schCreItem.ORG_GROUP_ID == null || this.schCreItem.ORG_GROUP_ID == '' || this.schCreItem.ORG_GROUP_ID == undefined) {
                                    this.schCreItem.ORG_GROUP_ID = this.orgGrpId;
                                }
                            }
                            if ((this.schCreItem.ORG_GROUP_ID == null || this.schCreItem.ORG_GROUP_ID == '' || this.schCreItem.ORG_GROUP_ID == undefined) && (this.schCreItem.SCHEDULE_ID == null || this.schCreItem.SCHEDULE_ID == '' || this.schCreItem.SCHEDULE_ID == undefined) && (this.schCreItem.DESCRIPTION == null || this.schCreItem.DESCRIPTION == '' || this.schCreItem.DESCRIPTION == undefined)) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please fill mandatory fields' });
                                return [2 /*return*/];
                            }
                            else if ((this.schCreItem.ORG_GROUP_ID == null || this.schCreItem.ORG_GROUP_ID == '' || this.schCreItem.ORG_GROUP_ID == undefined)) {
                                //  if ((this.orgGrpId == null || this.orgGrpId == '' || this.orgGrpId == undefined)) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Org group ID' });
                                return [2 /*return*/];
                                // }
                            }
                            else if ((this.schCreItem.SCHEDULE_ID == null || this.schCreItem.SCHEDULE_ID == '' || this.schCreItem.SCHEDULE_ID == undefined) && (this.schCreItem.DESCRIPTION == null || this.schCreItem.DESCRIPTION == '' || this.schCreItem.DESCRIPTION == undefined)) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Schedule Id and Schedule Description' });
                                return [2 /*return*/];
                            }
                            else if ((this.schCreItem.SCHEDULE_ID == null || this.schCreItem.SCHEDULE_ID == '' || this.schCreItem.SCHEDULE_ID == undefined)) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Schedule Id ' });
                                return [2 /*return*/];
                            }
                            else if ((this.schCreItem.DESCRIPTION == null || this.schCreItem.DESCRIPTION == '' || this.schCreItem.DESCRIPTION == undefined)) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Schedule Description' });
                                return [2 /*return*/];
                            }
                            else if (this.lstDBData.length < 0) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM) ' });
                                return [2 /*return*/];
                            }
                            else {
                                for (intCnt = 0; intCnt <= this.lstSchedule.length - 1; intCnt++) {
                                    if (this.schCreItem.SCHEDULE_ID.toLowerCase() == this.lstSchedule[intCnt].value.toLowerCase()) {
                                        this.growlMessage = [];
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Schedule Id already exists' });
                                        return [2 /*return*/];
                                    }
                                }
                            }
                        }
                        else {
                            if ((this.schItem.ORG_GROUP_ID == null || this.schItem.ORG_GROUP_ID == '' || this.schItem.ORG_GROUP_ID == undefined) && (this.schItem.SCHEDULE_ID == null || this.schItem.SCHEDULE_ID == '' || this.schItem.SCHEDULE_ID == undefined) && (this.schItem.DESCRIPTION == null || this.schItem.DESCRIPTION == '' || this.schItem.DESCRIPTION == undefined)) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please fill mandatory fields' });
                                return [2 /*return*/];
                            }
                            else if ((this.schItem.ORG_GROUP_ID == null || this.schItem.ORG_GROUP_ID == '' || this.schItem.ORG_GROUP_ID == undefined)) {
                                //  if ((this.orgGrpId == null || this.orgGrpId == '' || this.orgGrpId == undefined)) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Org group ID' });
                                return [2 /*return*/];
                                // }
                            }
                            else if ((this.schItem.SCHEDULE_ID == null || this.schItem.SCHEDULE_ID == '' || this.schItem.SCHEDULE_ID == undefined) && (this.schItem.DESCRIPTION == null || this.schItem.DESCRIPTION == '' || this.schItem.DESCRIPTION == undefined)) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Schedule Id and Schedule Description' });
                                return [2 /*return*/];
                            }
                            else if ((this.schItem.SCHEDULE_ID == null || this.schItem.SCHEDULE_ID == '' || this.schItem.SCHEDULE_ID == undefined)) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Schedule Id ' });
                                return [2 /*return*/];
                            }
                            else if ((this.schItem.DESCRIPTION == null || this.schItem.DESCRIPTION == '' || this.schItem.DESCRIPTION == undefined)) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Schedule Description' });
                                return [2 /*return*/];
                            }
                            else if (this.lstDBData.length < 0) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                                return [2 /*return*/];
                            }
                        }
                        return [4 /*yield*/, this.createSchedules()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.displayCatchException(ex_4, "updateDataset");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * getting Org Group Id Values
     */
    ProcessScheduler.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.processSchedulerService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.lstOrgGroupData = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.orgGroupString = _this.orgGroupData[0].ORG_GROUP_ID + ' - ' + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.schCreItem.ORG_GROUP_ID = _this.orgGroupString;
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstOrgGroupData.push({ label: "Select One", value: "" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroupData.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + ' - ' + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.displayCatchException(ex_5, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method is for creating a new schedule
     */
    ProcessScheduler.prototype.createSchedule = function () {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Create Process Scheduler';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.growlMessage = [];
            this.editTrue = false;
            this.createTrue = true;
            this.stringMode = "ADD";
            this.blnSubmit = true;
            this.bindOrgGroups();
            this.showDisplayArea();
            this.lstDBData = [];
            this.checkedSpecificDays = false;
            this.checkedIntervals = false;
            this.strStartTime = '';
            this.strEndTime = '';
            this.schCreItem.INTERVAL = 5;
            this.selectedSchedule = '';
            this.day2 = false;
            this.inter2 = false;
            this.day1 = false;
            this.inter1 = false;
            this.hideSChedule = false;
        }
        catch (ex) {
            this.displayCatchException(ex, "createSchedule");
        }
    };
    ProcessScheduler.prototype.showDisplayArea = function () {
        try {
            if (this.checkedIntervals == true) {
                this.schCreItem.INTERVAL = 5;
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "showDisplayArea");
        }
    };
    /**
     * this method is for when we submit button for specific intervals button it will call  this method
     */
    ProcessScheduler.prototype.createSubmitInterval = function () {
        return __awaiter(this, void 0, void 0, function () {
            var intCnt, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.schCreItem.START_TIME = this.strStartTime;
                        this.schCreItem.END_TIME = this.strEndTime;
                        if (this.stringMode == "UPDATE") {
                        }
                        else {
                            if (this.orgGrpId != "" || this.orgGrpId != null || this.orgGrpId != undefined) {
                                if (this.schCreItem.ORG_GROUP_ID == null || this.schCreItem.ORG_GROUP_ID == '' || this.schCreItem.ORG_GROUP_ID == undefined) {
                                    this.schCreItem.ORG_GROUP_ID = this.orgGrpId;
                                }
                            }
                            if ((this.schCreItem.ORG_GROUP_ID == null || this.schCreItem.ORG_GROUP_ID == '' || this.schCreItem.ORG_GROUP_ID == undefined) && (this.schCreItem.SCHEDULE_ID == null || this.schCreItem.SCHEDULE_ID == '' || this.schCreItem.SCHEDULE_ID == undefined) && (this.schCreItem.DESCRIPTION == null || this.schCreItem.DESCRIPTION == '' || this.schCreItem.DESCRIPTION == undefined)) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please fill mandatory fields' });
                                return [2 /*return*/];
                            }
                            else if ((this.schCreItem.ORG_GROUP_ID == null || this.schCreItem.ORG_GROUP_ID == '' || this.schCreItem.ORG_GROUP_ID == undefined)) {
                                //  if ((this.orgGrpId == null || this.orgGrpId == '' || this.orgGrpId == undefined)) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Org group ID' });
                                return [2 /*return*/];
                                // }
                            }
                            else if ((this.schCreItem.SCHEDULE_ID == null || this.schCreItem.SCHEDULE_ID == '' || this.schCreItem.SCHEDULE_ID == undefined) && (this.schCreItem.DESCRIPTION == null || this.schCreItem.DESCRIPTION == '' || this.schCreItem.DESCRIPTION == undefined)) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Schedule Id and Schedule Description' });
                                return [2 /*return*/];
                            }
                            else if ((this.schCreItem.SCHEDULE_ID == null || this.schCreItem.SCHEDULE_ID == '' || this.schCreItem.SCHEDULE_ID == undefined)) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Schedule Id ' });
                                return [2 /*return*/];
                            }
                            else if ((this.schCreItem.DESCRIPTION == null || this.schCreItem.DESCRIPTION == '' || this.schCreItem.DESCRIPTION == undefined)) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Schedule Description' });
                                return [2 /*return*/];
                            }
                            else {
                                for (intCnt = 0; intCnt <= this.lstSchedule.length - 1; intCnt++) {
                                    if (this.schCreItem.SCHEDULE_ID.toLowerCase() == this.lstSchedule[intCnt].value.toLowerCase()) {
                                        this.growlMessage = [];
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Schedule Id already exists' });
                                        return [2 /*return*/];
                                    }
                                }
                            }
                        }
                        return [4 /*yield*/, this.createSchedules()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.displayCatchException(ex_6, "createSubmitInterval");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /*Checking for mandatory fileds is given by data or not*/
    ProcessScheduler.prototype.bindModelDataChange = function (event) {
        try {
            if ("txtSID1" == event.TextBoxID.toString()) {
                this.scheduleIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtSD1" == event.TextBoxID.toString()) {
                this.scheduleDescStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtRepeat" == event.TextBoxID.toString()) {
                this.intervalStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtRepeatE" == event.TextBoxID.toString()) {
                this.intervalStatusEdit = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            //Add and Edit
            if (this.stringMode == "ADD") {
                if (this.orgGrpId != "") {
                    if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                        if (this.checkedIntervals == true) {
                            if (this.schCreItem.INTERVAL == 0 || this.strStartTime == "" || this.strEndTime == "") {
                                this.disableButton = true;
                            }
                            else {
                                this.disableButton = false;
                            }
                        }
                        else {
                            for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                                if (this.stringMode == "ADD") {
                                    if (this.orgGrpId != "") {
                                        if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0) && (this.lstDBData[i].SCHEDULE_TIME != "")) {
                                            this.disableButton = false;
                                        }
                                        else {
                                            this.disableButton = true;
                                        }
                                    }
                                    else {
                                        if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                            if ((this.schCreItem.ORG_GROUP_ID == undefined || (this.schCreItem.ORG_GROUP_ID == 'Select One') || (this.schCreItem.ORG_GROUP_ID == "")) || this.lstDBData[i].SCHEDULE_TIME == "") {
                                                this.disableButton = true;
                                            }
                                            else {
                                                this.disableButton = false;
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (this.lstDBData[i].SCHEDULE_TIME != "" || this.lstDBData[i].SCHEDULE_TIME != null) {
                                        this.disableButton = false;
                                    }
                                    else {
                                        this.disableButton = true;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        this.disableButton = true;
                    }
                }
                else if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                    if ((this.schCreItem.ORG_GROUP_ID != undefined || this.schCreItem.ORG_GROUP_ID != "")) {
                        if (this.checkedIntervals == true) {
                            if (this.schCreItem.ORG_GROUP_ID == 'Select One' || this.schCreItem.ORG_GROUP_ID == "" || this.schCreItem.ORG_GROUP_ID == undefined) {
                                this.disableButton = true;
                            }
                            else if (this.schCreItem.INTERVAL == 0 || this.strStartTime == "" || this.strStartTime == null || this.strEndTime == "" || this.strEndTime == null) {
                                this.disableButton = true;
                            }
                            else {
                                this.disableButton = false;
                            }
                        }
                        else {
                            for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                                if (this.stringMode == "ADD") {
                                    if (this.orgGrpId != "") {
                                        if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0) && (this.lstDBData[i].SCHEDULE_TIME != "")) {
                                            this.disableButton = false;
                                        }
                                        else {
                                            this.disableButton = true;
                                        }
                                    }
                                    else {
                                        if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                            if ((this.schCreItem.ORG_GROUP_ID == undefined || (this.schCreItem.ORG_GROUP_ID == 'Select One') || (this.schCreItem.ORG_GROUP_ID == "")) || this.lstDBData[i].SCHEDULE_TIME == "") {
                                                this.disableButton = true;
                                            }
                                            else {
                                                this.disableButton = false;
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (this.lstDBData[i].SCHEDULE_TIME != "" || this.lstDBData[i].SCHEDULE_TIME != null) {
                                        this.disableButton = false;
                                    }
                                    else {
                                        this.disableButton = true;
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    this.disableButton = true;
                }
            }
            else {
                if (this.intervalStatusEdit == 0) {
                    if (this.strStartTime == "" || this.strEndTime == "" || this.strStartTime == null || this.strEndTime == null || this.schCreItem.INTERVAL == 0) {
                        this.disableButton = true;
                    }
                    else {
                        this.disableButton = false;
                    }
                }
                else {
                    this.disableButton = true;
                }
            }
            this.TimeChange('');
        }
        catch (ex) {
            this.displayCatchException(ex, "bindModelDataChange");
        }
    };
    /**
     * Method  for updating and creating schedules based on intervals and specific days
     */
    ProcessScheduler.prototype.createSchedules = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lstdsSchedule, statusCode, strSchedId, strSchedDescr, strOrgGrpId, intRCnt, dtStartTime, dtStartingTime, dtEndTime, dblInterval, blnSchedDaySelected, lstScheduleUpdate, strTime_1, i, day, day, day, day, day, day, day, strTime, lstDtScheduler, strZero, startTimePoint, endTimePoint, timeSplit, stime, etime, currentMonth, currentYear, currentHour, currentMinute, currentSecond, startTime, endTime, startTotalTime, endTotalTime, sttime, ettime, stdate, etdate, timesplit1, timeConverMinutes, amTime, amTimeMinutes, hours, minutes, AMPM1, sHours, sMinutes, timesplit1, timeConverMinutes, amTime, amTimeMinutes, hours, minutes, AMPM1, sHours, sMinutes, timeConverMinutes, amTime, amTimeMinutes, pmTime, pmTimeMinutes, timeConverMinutes, amTime, amTimeMinutes, pmTime, pmTimeMinutes, interval, ttime, time, hour, minutes_1, totalminutes, mod, t, timeSplitStart, amTime, amTime1, pmTime, pmTime1, intCnt, splittime, splittime1, splittime2, splittime3, splittime4, splittime5, splittime6, intSchedType, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        lstdsSchedule = [];
                        statusCode = -1;
                        strSchedId = "";
                        strSchedDescr = "";
                        strOrgGrpId = "";
                        intRCnt = 0;
                        dtStartTime = new Date().toLocaleString();
                        dtStartingTime = new Date().toLocaleString('en-us');
                        dtEndTime = new Date().toLocaleString('en-us');
                        lstScheduleUpdate = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        //if (this.stringMode == "UPDATE") {
                        if (this.checkedSpecificDays + "" == "true") {
                            this.checkedSpecificDays = true;
                        }
                        if (this.checkedSpecificDays == true) {
                            if (this.lstDBData.length > 0) {
                                strTime_1 = "";
                                for (i = 0; i < this.lstDBData.length; i++) {
                                    blnSchedDaySelected = false;
                                    strTime_1 = this.lstDBData[intRCnt].SCHEDULE_TIME;
                                    if (this.lstDBData[intRCnt].CHK_MON == true) {
                                        this.strSearchString = "SCHEDULE_DAY = " + AtParEnums_1.DayOfWeek_Enum.MONDAY + " AND SCHEDULE_TIME = '" + strTime_1 + "'";
                                        if (lstScheduleUpdate != null) {
                                            day = AtParEnums_1.DayOfWeek_Enum.MONDAY;
                                            if (lstScheduleUpdate.filter(function (report) { return report.SCHEDULE_DAY === day && report.SCHEDULE_TIME === strTime_1; }).length <= 0) {
                                                lstScheduleUpdate.push({ SCHEDULE_DAY: AtParEnums_1.DayOfWeek_Enum.MONDAY, SCHEDULE_TIME: strTime_1 });
                                            }
                                        }
                                        blnSchedDaySelected = true;
                                    }
                                    if (this.lstDBData[intRCnt].CHK_TUE == true) {
                                        if (lstScheduleUpdate != null) {
                                            day = AtParEnums_1.DayOfWeek_Enum.TUESDAY;
                                            if (lstScheduleUpdate.filter(function (report) { return report.SCHEDULE_DAY === day && report.SCHEDULE_TIME === strTime_1; }).length <= 0) {
                                                lstScheduleUpdate.push({ SCHEDULE_DAY: AtParEnums_1.DayOfWeek_Enum.TUESDAY, SCHEDULE_TIME: strTime_1 });
                                            }
                                        }
                                        blnSchedDaySelected = true;
                                    }
                                    if (this.lstDBData[intRCnt].CHK_WED == true) {
                                        if (lstScheduleUpdate != null) {
                                            day = AtParEnums_1.DayOfWeek_Enum.WEDNESDAY;
                                            if (lstScheduleUpdate.filter(function (report) { return report.SCHEDULE_DAY === day && report.SCHEDULE_TIME === strTime_1; }).length <= 0) {
                                                lstScheduleUpdate.push({ SCHEDULE_DAY: AtParEnums_1.DayOfWeek_Enum.WEDNESDAY, SCHEDULE_TIME: strTime_1 });
                                            }
                                        }
                                        blnSchedDaySelected = true;
                                    }
                                    if (this.lstDBData[intRCnt].CHK_THR == true) {
                                        if (lstScheduleUpdate != null) {
                                            day = AtParEnums_1.DayOfWeek_Enum.THURSDAY;
                                            if (lstScheduleUpdate.filter(function (report) { return report.SCHEDULE_DAY === day && report.SCHEDULE_TIME === strTime_1; }).length <= 0) {
                                                lstScheduleUpdate.push({ SCHEDULE_DAY: AtParEnums_1.DayOfWeek_Enum.THURSDAY, SCHEDULE_TIME: strTime_1 });
                                            }
                                        }
                                        blnSchedDaySelected = true;
                                    }
                                    if (this.lstDBData[intRCnt].CHK_FRI == true) {
                                        if (lstScheduleUpdate != null) {
                                            day = AtParEnums_1.DayOfWeek_Enum.FRIDAY;
                                            if (lstScheduleUpdate.filter(function (report) { return report.SCHEDULE_DAY === day && report.SCHEDULE_TIME === strTime_1; }).length <= 0) {
                                                lstScheduleUpdate.push({ SCHEDULE_DAY: AtParEnums_1.DayOfWeek_Enum.FRIDAY, SCHEDULE_TIME: strTime_1 });
                                            }
                                        }
                                        blnSchedDaySelected = true;
                                    }
                                    if (this.lstDBData[intRCnt].CHK_SAT == true) {
                                        if (lstScheduleUpdate != null) {
                                            day = AtParEnums_1.DayOfWeek_Enum.SATURDAY;
                                            if (lstScheduleUpdate.filter(function (report) { return report.SCHEDULE_DAY === day && report.SCHEDULE_TIME === strTime_1; }).length <= 0) {
                                                lstScheduleUpdate.push({ SCHEDULE_DAY: AtParEnums_1.DayOfWeek_Enum.SATURDAY, SCHEDULE_TIME: strTime_1 });
                                            }
                                        }
                                        blnSchedDaySelected = true;
                                    }
                                    if (this.lstDBData[intRCnt].CHK_SUN == true) {
                                        if (lstScheduleUpdate != null) {
                                            day = AtParEnums_1.DayOfWeek_Enum.SUNDAY;
                                            if (lstScheduleUpdate.filter(function (report) { return report.SCHEDULE_DAY === day && report.SCHEDULE_TIME === strTime_1; }).length <= 0) {
                                                lstScheduleUpdate.push({ SCHEDULE_DAY: AtParEnums_1.DayOfWeek_Enum.SUNDAY, SCHEDULE_TIME: strTime_1 });
                                            }
                                        }
                                        blnSchedDaySelected = true;
                                    }
                                    this.lstDBData[intRCnt].SCHEDULE_TIME = strTime_1;
                                    if (!blnSchedDaySelected) {
                                        this.growlMessage = [];
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Schedule days not selected' });
                                        return [2 /*return*/];
                                    }
                                    intRCnt = intRCnt + 1;
                                }
                                lstdsSchedule = lstScheduleUpdate;
                            }
                        }
                        else {
                            strTime = "";
                            lstDtScheduler = [];
                            strZero = "0";
                            startTimePoint = void 0;
                            endTimePoint = void 0;
                            timeSplit = [];
                            stime = "";
                            etime = "";
                            currentMonth = void 0;
                            currentYear = void 0;
                            currentHour = void 0;
                            currentMinute = void 0;
                            currentSecond = void 0;
                            startTime = '';
                            endTime = '';
                            startTotalTime = void 0;
                            endTotalTime = void 0;
                            sttime = '';
                            ettime = '';
                            startTime = this.schCreItem.START_TIME;
                            endTime = this.schCreItem.END_TIME;
                            if (this.schCreItem.START_TIME == null || this.schCreItem.START_TIME == '' || this.schCreItem.START_TIME == undefined) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                                return [2 /*return*/];
                            }
                            if (this.schCreItem.END_TIME == null || this.schCreItem.END_TIME == '' || this.schCreItem.END_TIME == undefined) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                                return [2 /*return*/];
                            }
                            if (this.stringMode == "ADD") {
                                startTotalTime = new Date(this.schCreItem.START_TIME).getTime();
                                endTotalTime = new Date(this.schCreItem.END_TIME).getTime();
                            }
                            else {
                                stdate = new Date();
                                etdate = new Date();
                                currentMonth = stdate.getMonth();
                                currentYear = stdate.getFullYear();
                                currentMinute = 0;
                                currentHour = 0;
                                currentSecond = 0;
                                if (this.schCreItem.START_TIME.length < 11) {
                                    if (this.schCreItem.START_TIME != "") {
                                        timeSplit = this.schCreItem.START_TIME.split(":");
                                        timesplit1 = timeSplit[1].split(' ');
                                        this.timeConversion = +(timeSplit[0]);
                                        timeConverMinutes = void 0;
                                        timeConverMinutes = +(timesplit1[0]);
                                        amTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                                        amTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                                        this.schCreItem.START_TIME = amTime + ':' + amTimeMinutes + ' ' + timesplit1[1];
                                        hours = Number(this.schCreItem.START_TIME.match(/^(\d+)/)[1]);
                                        minutes = Number(this.schCreItem.START_TIME.match(/:(\d+)/)[1]);
                                        AMPM1 = this.schCreItem.START_TIME[6] + this.schCreItem.START_TIME[7];
                                        if (AMPM1 == "PM" && hours < 12)
                                            hours = hours + 12;
                                        if (AMPM1 == "AM" && hours == 12)
                                            hours = hours - 12;
                                        sHours = hours.toString();
                                        sMinutes = minutes.toString();
                                        if (hours < 10)
                                            sHours = "0" + sHours;
                                        if (minutes < 10)
                                            sMinutes = "0" + sMinutes;
                                        stdate.setHours(parseInt(sHours));
                                        stdate.setMinutes(parseInt(sMinutes));
                                        stdate.setSeconds(0);
                                        this.schCreItem.START_TIME = new Date(stdate).toString();
                                        currentMinute = 0;
                                        currentHour = 0;
                                        currentSecond = 0;
                                    }
                                }
                                if (this.schCreItem.END_TIME.length < 11) {
                                    if (this.schCreItem.END_TIME != "") {
                                        timeSplit = this.schCreItem.END_TIME.split(":");
                                        timesplit1 = timeSplit[1].split(' ');
                                        timeConverMinutes = void 0;
                                        this.timeConversion = null;
                                        this.timeConversion = +(timeSplit[0]);
                                        timeConverMinutes = +(timesplit1[0]);
                                        amTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                                        amTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                                        this.schCreItem.END_TIME = amTime + ':' + amTimeMinutes + ' ' + timesplit1[1];
                                        hours = Number(this.schCreItem.END_TIME.match(/^(\d+)/)[1]);
                                        minutes = Number(this.schCreItem.END_TIME.match(/:(\d+)/)[1]);
                                        AMPM1 = this.schCreItem.END_TIME[6] + this.schCreItem.END_TIME[7];
                                        if (AMPM1 == "PM" && hours < 12)
                                            hours = hours + 12;
                                        if (AMPM1 == "AM" && hours == 12)
                                            hours = hours - 12;
                                        sHours = hours.toString();
                                        sMinutes = minutes.toString();
                                        if (hours < 10)
                                            sHours = "0" + sHours;
                                        if (minutes < 10)
                                            sMinutes = "0" + sMinutes;
                                        etdate.setHours(parseInt(sHours));
                                        etdate.setMinutes(parseInt(sMinutes));
                                        etdate.setSeconds(0);
                                        this.schCreItem.END_TIME = new Date(etdate).toString();
                                        currentMinute = 0;
                                        currentHour = 0;
                                        currentSecond = 0;
                                    }
                                }
                                startTotalTime = new Date(this.schCreItem.START_TIME).getTime();
                                endTotalTime = new Date(this.schCreItem.END_TIME).getTime();
                            }
                            if (this.schCreItem.START_TIME != '') {
                                sttime = this.schCreItem.START_TIME;
                                stime = new Date(this.schCreItem.START_TIME).getHours() + ':' + new Date(this.schCreItem.START_TIME).getMinutes();
                                timeSplit = stime.split(":");
                                this.timeConversion = null;
                                this.timeConversion = +(timeSplit[0]);
                                timeConverMinutes = void 0;
                                timeConverMinutes = +(timeSplit[1]);
                                if (this.timeConversion < 12) {
                                    amTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                                    amTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                                    this.schCreItem.START_TIME = amTime + ':' + amTimeMinutes + ' AM';
                                }
                                else {
                                    this.timeConversion = this.timeConversion - 12;
                                    pmTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                                    pmTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                                    this.schCreItem.START_TIME = pmTime + ':' + pmTimeMinutes + ' PM';
                                }
                            }
                            if (this.schCreItem.END_TIME != '') {
                                ettime = this.schCreItem.END_TIME; //3rd july 2017 10:20:30 ISt
                                etime = new Date(this.schCreItem.END_TIME).getHours() + ':' + new Date(this.schCreItem.END_TIME).getMinutes();
                                timeSplit = etime.split(":");
                                timeConverMinutes = void 0;
                                this.timeConversion = null;
                                this.timeConversion = +(timeSplit[0]);
                                timeConverMinutes = +(timeSplit[1]);
                                if (this.timeConversion < 12) {
                                    amTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                                    amTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                                    this.schCreItem.END_TIME = amTime + ':' + amTimeMinutes + ' AM';
                                }
                                else {
                                    this.timeConversion = this.timeConversion - 12;
                                    pmTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                                    pmTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                                    this.schCreItem.END_TIME = pmTime + ':' + pmTimeMinutes + ' PM';
                                }
                            }
                            if (this.schCreItem.INTERVAL < 5) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Interval cannot be less than 5' });
                                this.schCreItem.INTERVAL = 5;
                                return [2 /*return*/];
                            }
                            if (startTotalTime > endTotalTime) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: ' The start time and end time has to be between 00:00 AM – 11:59 PM' });
                                return [2 /*return*/];
                            }
                            lstDtScheduler = [];
                            if (startTotalTime < endTotalTime) {
                                while (startTotalTime < endTotalTime) {
                                    interval = parseInt(this.schCreItem.INTERVAL.toString());
                                    ttime = new Date(sttime);
                                    time = stime.split(':');
                                    hour = parseInt(time[0]);
                                    minutes_1 = parseInt(time[1]);
                                    totalminutes = (minutes_1) + interval;
                                    startTotalTime = startTotalTime + (interval * 60000);
                                    mod = parseInt((totalminutes / 60).toString());
                                    if (totalminutes == 60) {
                                        hour = hour + 1;
                                        minutes_1 = 0;
                                        totalminutes = parseInt((minutes_1 < 10) ? '0' + minutes_1.toString() : minutes_1.toString());
                                    }
                                    if (totalminutes > 60) {
                                        hour = hour + 1;
                                        t = totalminutes % interval;
                                        totalminutes = t;
                                    }
                                    if (hour > 24) {
                                        hour = 0;
                                    }
                                    stime = ((hour < 10) ? '0' + hour.toString() : hour.toString()).toString() + ':' + ((totalminutes < 10) ? '0' + totalminutes.toString() : totalminutes.toString()).toString();
                                    timeSplitStart = '';
                                    timeSplit = stime.split(":");
                                    this.timeConversion = +(timeSplit[0]);
                                    this.timeConversionp = +(timeSplit[1]);
                                    if (this.timeConversion < 12) {
                                        amTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                                        amTime1 = (this.timeConversionp < 10) ? '0' + this.timeConversionp.toString() : this.timeConversionp.toString();
                                        if (amTime == "00") {
                                            amTime = "12";
                                        }
                                        timeSplitStart = amTime + ':' + amTime1 + ' AM';
                                    }
                                    else {
                                        this.timeConversion = this.timeConversion - 12;
                                        pmTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                                        pmTime1 = (this.timeConversionp < 10) ? '0' + this.timeConversionp.toString() : this.timeConversionp.toString();
                                        if (pmTime == "00") {
                                            pmTime = "12";
                                        }
                                        timeSplitStart = pmTime + ':' + pmTime1 + ' PM';
                                    }
                                    for (intCnt = 1; intCnt <= 7; intCnt++) {
                                        lstDtScheduler.push({ SCHEDULE_DAY: intCnt, SCHEDULE_TIME: timeSplitStart });
                                    }
                                }
                                lstdsSchedule = lstDtScheduler;
                            }
                            if (this.schCreItem.END_TIME != '' && this.schCreItem.START_TIME != '') {
                                splittime = this.schCreItem.END_TIME.split(':');
                                splittime1 = splittime[0];
                                splittime2 = splittime[1].split(' ');
                                splittime3 = splittime2[0];
                                splittime4 = splittime2[1];
                                splittime5 = void 0;
                                splittime6 = void 0;
                                splittime5 = dtEndTime.split(' ');
                                if (splittime1 == "00") {
                                    splittime1 = "12";
                                }
                                dtEndTime = splittime5[0] + ' ' + splittime1 + ':' + splittime3 + ' ' + splittime4;
                                splittime = this.schCreItem.START_TIME.split(':');
                                splittime1 = splittime[0]; //hours
                                splittime2 = splittime[1].split(' '); //mm with AM/PM
                                splittime3 = splittime2[0]; //MM
                                splittime4 = splittime2[1]; //AM/PM
                                splittime5 = dtStartingTime.split(' ');
                                if (splittime1 == "00") {
                                    splittime1 = "12";
                                }
                                dtStartingTime = splittime5[0] + ' ' + splittime1 + ':' + splittime3 + ' ' + splittime4;
                            }
                        }
                        if (this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] == "All") {
                            if (this.stringMode == "ADD") {
                                strOrgGrpId = this.schCreItem.ORG_GROUP_ID;
                                this.orgGroup = this.schCreItem.ORG_GROUP_ID;
                            }
                            else {
                                this.orgGroup;
                            }
                        }
                        else {
                            this.orgGroup = this.orgGrpId;
                        }
                        if (this.stringMode == "ADD") {
                            strSchedId = this.schCreItem.SCHEDULE_ID;
                            strSchedDescr = this.schCreItem.DESCRIPTION;
                        }
                        else {
                            strSchedId = this.schItem.SCHEDULE_ID;
                            strSchedDescr = this.schItem.DESCRIPTION;
                        }
                        intSchedType = 0;
                        if (this.checkedSpecificDays == true) {
                            intSchedType = AtParEnums_1.ScheduleType_Enum.DAYS;
                        }
                        else if (this.checkedIntervals == true) {
                            intSchedType = AtParEnums_1.ScheduleType_Enum.INTERVALS;
                        }
                        if (this.schCreItem.INTERVAL == undefined) {
                            this.schCreItem.INTERVAL = 0;
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.processSchedulerService.createNewSchedule(lstdsSchedule, this.orgGroup, strSchedId, strSchedDescr, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], intSchedType, dtStartingTime, dtEndTime, this.schCreItem.INTERVAL, this.stringMode)
                                .subscribe(function (res) {
                                _this.growlMessage = [];
                                _this.spinnerService.stop();
                                switch (res.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (_this.stringMode == "ADD") {
                                            var statusMessage = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Schedule").replace("2%", strSchedId);
                                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                            break;
                                        }
                                        else {
                                            if (_this.stringMode == "UPDATE") {
                                                var statusMessage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Schedule").replace("2%", strSchedId);
                                                _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                                break;
                                            }
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                                _this.selectedSchedule = '';
                                lstdsSchedule = [];
                                strSchedId = '';
                                _this.lstDBData = [];
                                _this.editTrue = false;
                                _this.createTrue = false;
                                _this.schCreItem.ORG_GROUP_ID = '';
                                _this.schCreItem.SCHEDULE_ID = '';
                                _this.schCreItem.DESCRIPTION = '';
                                _this.checkedSpecificDays = false;
                                _this.checkedIntervals = false;
                                _this.selectedSchedule = '';
                                _this.day2 = false;
                                _this.inter2 = false;
                                _this.day1 = false;
                                _this.inter1 = false;
                                _this.spinnerService.start();
                                _this.getSchedulesDetails();
                                _this.hideSChedule = true;
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_7 = _a.sent();
                        this.displayCatchException(ex_7, "createSchedules");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Adding new row to a grid when we click on submit button
     * @param ven
     */
    ProcessScheduler.prototype.createNewScheduleDays = function (ven) {
        this.growlMessage = [];
        var blnCheckDays = false;
        try {
            var no = this.lstDBData.length + 1;
            if (ven.SCHEDULE_TIME == '' || ven.SCHEDULE_TIME == undefined || ven.SCHEDULE_TIME == null) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: ' Please enter valid Time(HH:MM)' });
                return;
            }
            if (ven.CHK_MON == false && ven.CHK_TUE == false && ven.CHK_WED == false && ven.CHK_THR == false && ven.CHK_FRI == false && ven.CHK_SAT == false && ven.CHK_SUN == false) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Schedule days not selected' });
                return;
            }
            this.lstDBData.push({ ORG_GROUP_ID: '', SCHEDULE_ID: '', SCHEDULE_DAY: 0, SCHEDULE_TIME: ven.SCHEDULE_TIME, CHK_MON: false, CHK_TUE: false, CHK_WED: false, CHK_THR: false, CHK_FRI: false, CHK_SAT: false, CHK_SUN: false, SNo: no });
            if (ven.CHK_MON == true) {
                this.lstDBData[no - 1].CHK_MON = true;
                blnCheckDays = true;
            }
            if (ven.CHK_TUE == true) {
                this.lstDBData[no - 1].CHK_TUE = true;
                blnCheckDays = true;
            }
            if (ven.CHK_WED == true) {
                this.lstDBData[no - 1].CHK_WED = true;
                blnCheckDays = true;
            }
            if (ven.CHK_THR == true) {
                this.lstDBData[no - 1].CHK_THR = true;
                blnCheckDays = true;
            }
            if (ven.CHK_FRI == true) {
                this.lstDBData[no - 1].CHK_FRI = true;
                blnCheckDays = true;
            }
            if (ven.CHK_SAT == true) {
                this.lstDBData[no - 1].CHK_SAT = true;
                blnCheckDays = true;
            }
            if (ven.CHK_SUN == true) {
                this.lstDBData[no - 1].CHK_SUN = true;
                blnCheckDays = true;
            }
            if (this.stringMode == "UPDATE") {
                this.editTrue = true;
            }
            else {
                this.createTrue = true;
            }
            this.hideSChedule = false;
        }
        catch (ex) {
            this.displayCatchException(ex, "createNewScheduleDays");
        }
    };
    /**
     *
     * @param event
     * @param ven
     * @param Day ex: mon,tue
    This method is for when we check and uncheck checkbox from grid row, updating will happen for that particular day
     */
    ProcessScheduler.prototype.daySelected = function (event, ven, Day) {
        this.growlMessage = [];
        try {
            if (event.target.checked == true) {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (ven.SNo == this.lstDBData[i].SNo) {
                        ven[Day] = true;
                        if (this.stringMode == "ADD") {
                            if (this.orgGrpId != "") {
                                if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0) && (this.lstDBData[i].SCHEDULE_TIME != "")) {
                                    this.disableButton = false;
                                }
                                else {
                                    this.disableButton = true;
                                }
                            }
                            else {
                                if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                    if ((this.schCreItem.ORG_GROUP_ID == undefined || (this.schCreItem.ORG_GROUP_ID == 'Select One') || (this.schCreItem.ORG_GROUP_ID == "")) || this.lstDBData[i].SCHEDULE_TIME == "") {
                                        this.disableButton = true;
                                    }
                                    else {
                                        this.disableButton = false;
                                    }
                                }
                            }
                        }
                        else {
                            if (this.lstDBData[i].SCHEDULE_TIME != "" || this.lstDBData[i].SCHEDULE_TIME != null) {
                                this.disableButton = false;
                            }
                            else {
                                this.disableButton = true;
                            }
                        }
                    }
                }
            }
            else {
                ven[Day] = false;
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].CHK_MON == false && this.lstDBData[i].CHK_TUE == false && this.lstDBData[i].CHK_WED == false && this.lstDBData[i].CHK_THR == false && this.lstDBData[i].CHK_FRI == false && this.lstDBData[i].CHK_SAT == false && this.lstDBData[i].CHK_SUN == false && (this.lstDBData[i].SCHEDULE_TIME == "" || this.lstDBData[i].SCHEDULE_TIME == null)) {
                        this.disableButton = true;
                    }
                    else if ((this.lstDBData[i].CHK_MON == true || this.lstDBData[i].CHK_TUE == true || this.lstDBData[i].CHK_WED == true || this.lstDBData[i].CHK_THR == true || this.lstDBData[i].CHK_FRI == true || this.lstDBData[i].CHK_SAT == true || this.lstDBData[i].CHK_SUN == true) && (this.lstDBData[i].SCHEDULE_TIME != "" || this.lstDBData[i].SCHEDULE_TIME != null)) {
                        if (this.stringMode == "ADD") {
                            if (this.orgGrpId != "") {
                                if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                    this.disableButton = false;
                                }
                            }
                            else {
                                if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                    if ((this.schCreItem.ORG_GROUP_ID == undefined) || (this.schCreItem.ORG_GROUP_ID == "")) {
                                        this.disableButton = true;
                                    }
                                    else {
                                        this.disableButton = false;
                                    }
                                }
                            }
                        }
                        else {
                            this.disableButton = false;
                        }
                    }
                    else {
                        this.disableButton = true;
                        break;
                    }
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "daySelected");
        }
    };
    /**
     * it is for creating a new row in grid
     */
    ProcessScheduler.prototype.addSchedule = function () {
        this.growlMessage = [];
        try {
            this.disableButton = true;
            var newprocessScheduler = new Array({
                ORG_GROUP_ID: "",
                SCHEDULE_ID: "",
                SCHEDULE_DAY: 0,
                SCHEDULE_TIME: "",
                CHK_MON: false,
                CHK_TUE: false,
                CHK_WED: false,
                CHK_THR: false,
                CHK_FRI: false,
                CHK_SAT: false,
                CHK_SUN: false,
                SNo: this.lstDBData.length - 1
            });
            if (this.lstDBData.length > 0) {
                var i = this.lstDBData.length - 1;
                if (this.lstDBData[i].CHK_MON == false && this.lstDBData[i].CHK_TUE == false && this.lstDBData[i].CHK_WED == false && this.lstDBData[i].CHK_THR == false && this.lstDBData[i].CHK_FRI == false && this.lstDBData[i].CHK_SAT == false && this.lstDBData[i].CHK_SUN == false) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Schedule days not selected' });
                    return;
                }
                if (this.lstDBData[i].SCHEDULE_TIME == "" || this.lstDBData[i].SCHEDULE_TIME == null) {
                    this.growlMessage = [];
                    this.spinnerService.stop();
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                    return;
                }
                this.lstDBData.push({
                    ORG_GROUP_ID: "",
                    SCHEDULE_ID: "",
                    SCHEDULE_DAY: 0,
                    SCHEDULE_TIME: "",
                    CHK_MON: false,
                    CHK_TUE: false,
                    CHK_WED: false,
                    CHK_THR: false,
                    CHK_FRI: false,
                    CHK_SAT: false,
                    CHK_SUN: false,
                    SNo: this.lstDBData.length + 1,
                });
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "addSchedule");
        }
    };
    /**
     * @param event,
    data:selected row
    this method will delete a row from a grid
     */
    ProcessScheduler.prototype.deleteRow = function (event, selectedData) {
        var _this = this;
        this.growlMessage = [];
        try {
            this.confirmationService.confirm({
                message: "Are you sure you want to delete ?",
                accept: function () {
                    var index = -1;
                    if (_this.lstDBData.length == 1) {
                        _this.growlMessage = [];
                        _this.spinnerService.stop();
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Cannot delete the schedule details' });
                        return;
                    }
                    for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                        if (selectedData.SNo == _this.lstDBData[i].SNo) {
                            index = i;
                            break;
                        }
                    }
                    _this.lstDBData.splice(index, 1);
                    for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                        if (_this.lstDBData[i].SNo > selectedData.SNo) {
                            _this.lstDBData[i].SNo = _this.lstDBData[i].SNo - 1;
                        }
                        else {
                            _this.lstDBData[i].SNo = _this.lstDBData[i].SNo;
                        }
                    }
                    for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                        if (_this.lstDBData[i].CHK_MON == false && _this.lstDBData[i].CHK_TUE == false && _this.lstDBData[i].CHK_WED == false && _this.lstDBData[i].CHK_THR == false && _this.lstDBData[i].CHK_FRI == false && _this.lstDBData[i].CHK_SAT == false && _this.lstDBData[i].CHK_SUN == false && (_this.lstDBData[i].SCHEDULE_TIME == "" || _this.lstDBData[i].SCHEDULE_TIME == null)) {
                            _this.disableButton = true;
                        }
                        else if ((_this.lstDBData[i].CHK_MON == true || _this.lstDBData[i].CHK_TUE == true || _this.lstDBData[i].CHK_WED == true || _this.lstDBData[i].CHK_THR == true || _this.lstDBData[i].CHK_FRI == true || _this.lstDBData[i].CHK_SAT == true || _this.lstDBData[i].CHK_SUN == true) && (_this.lstDBData[i].SCHEDULE_TIME != "" || _this.lstDBData[i].SCHEDULE_TIME != null)) {
                            if (_this.stringMode == "ADD") {
                                if (_this.orgGrpId != "") {
                                    if ((_this.scheduleIDStatus == 0) && (_this.scheduleDescStatus == 0)) {
                                        _this.disableButton = false;
                                    }
                                }
                                else {
                                    if ((_this.scheduleIDStatus == 0) && (_this.scheduleDescStatus == 0)) {
                                        if ((_this.schCreItem.ORG_GROUP_ID == undefined) || (_this.schCreItem.ORG_GROUP_ID == "")) {
                                            _this.disableButton = true;
                                        }
                                        else {
                                            _this.disableButton = false;
                                        }
                                    }
                                }
                            }
                            else {
                                _this.disableButton = false;
                            }
                        }
                        else {
                            _this.disableButton = true;
                            break;
                        }
                    }
                }
            });
        }
        catch (ex) {
            this.displayCatchException(ex, "deleteRow");
        }
    };
    /**
        this method is for goback function when adding rows to grid
     */
    ProcessScheduler.prototype.hideDialog = function () {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.growlMessage = [];
            this.hideSChedule = true;
            this.editTrue = false;
            this.createTrue = false;
            this.schCreItem.SCHEDULE_ID = '';
            this.schCreItem.DESCRIPTION = '';
        }
        catch (ex) {
            this.displayCatchException(ex, "hideDialog");
        }
    };
    /**
     *
     *
    this method will show corresponding block and hide remaining block when we check specific days radio button
     */
    ProcessScheduler.prototype.days = function () {
        try {
            this.growlMessage = [];
            this.day2 = true;
            this.inter2 = false;
            this.blnSubmit = true;
            this.lstDBData = [];
            this.disableButton = true;
            this.checkedSpecificDays = true;
            this.checkedIntervals = false;
            if (this.lstDBData.length == 0) {
                this.lstDBData.push({
                    ORG_GROUP_ID: "",
                    SCHEDULE_ID: "",
                    SCHEDULE_DAY: 0,
                    SCHEDULE_TIME: "",
                    CHK_MON: false,
                    CHK_TUE: false,
                    CHK_WED: false,
                    CHK_THR: false,
                    CHK_FRI: false,
                    CHK_SAT: false,
                    CHK_SUN: false,
                    SNo: this.lstDBData.length + 1,
                });
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "days");
        }
    };
    /**
     *
     * @param e
    this method will show corresponding block and hide remaining block when we check specific interval radio button
     */
    ProcessScheduler.prototype.intervals = function (e) {
        try {
            this.growlMessage = [];
            this.day2 = false;
            this.inter2 = true;
            this.blnSubmit = false;
            this.disableButton = true;
            if (this.orgGrpId != "") {
                if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0) && this.schCreItem.INTERVAL != 0 && (this.strStartTime != "") && (this.strEndTime != "")) {
                    this.disableButton = false;
                }
                else {
                    this.disableButton = true;
                }
            }
            else {
                if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0) && this.schCreItem.INTERVAL != 0 && (this.strStartTime != "") && (this.strEndTime != "")) {
                    if (this.schCreItem.ORG_GROUP_ID != undefined && this.schCreItem.ORG_GROUP_ID != "") {
                        this.disableButton = false;
                    }
                    else {
                        this.disableButton = true;
                    }
                }
            }
            this.timeInterName = e.currentTarget.innerText;
            this.checkedIntervals = true;
            this.checkedSpecificDays = false;
        }
        catch (ex) {
            this.displayCatchException(ex, "intervals");
        }
    };
    /**
     *
     * @param event
    Event for enable submit when create time if time is there or not when used in specifc days
     */
    ProcessScheduler.prototype.txtTime_Keyup = function (event) {
        try {
            this.growlMessage = [];
            var AlphaNumericPattern = /^(0?[1-9]|1[012])(:[0-9]\d)[AP][M]$/;
            var patt = new RegExp(AlphaNumericPattern);
            var res = patt.test(event.target.value);
            for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].CHK_MON == false && this.lstDBData[i].CHK_TUE == false && this.lstDBData[i].CHK_WED == false && this.lstDBData[i].CHK_THR == false && this.lstDBData[i].CHK_FRI == false && this.lstDBData[i].CHK_SAT == false && this.lstDBData[i].CHK_SUN == false && (this.lstDBData[i].SCHEDULE_TIME == "")) {
                    this.disableButton = true;
                }
                else if ((this.lstDBData[i].CHK_MON == true || this.lstDBData[i].CHK_TUE == true || this.lstDBData[i].CHK_WED == true || this.lstDBData[i].CHK_THR == true || this.lstDBData[i].CHK_FRI == true || this.lstDBData[i].CHK_SAT == true || this.lstDBData[i].CHK_SUN == true) && (this.lstDBData[i].SCHEDULE_TIME != "")) {
                    if (this.stringMode == "ADD") {
                        if (this.orgGrpId != "") {
                            if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                this.disableButton = false;
                            }
                        }
                        else {
                            if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                if ((this.schCreItem.ORG_GROUP_ID == undefined) || (this.schCreItem.ORG_GROUP_ID == "")) {
                                    this.disableButton = true;
                                }
                                else {
                                    this.disableButton = false;
                                }
                            }
                        }
                    }
                    else {
                        this.disableButton = false;
                    }
                }
                else {
                    this.disableButton = true;
                    break;
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "txtTime_Keyup");
        }
    };
    /**
     *
     * @param event
    Event for enable submit when create time if time is there or not when used in specifc days
     */
    ProcessScheduler.prototype.txtTime1_Keyup = function (event) {
        try {
            this.growlMessage = [];
            if (this.strStartTime == "" || this.strEndTime == "" || this.strStartTime == null || this.strEndTime == null || this.schCreItem.INTERVAL == 0) {
                this.disableButton = true;
            }
            else {
                if (this.stringMode == "ADD") {
                    if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0) && this.schCreItem.INTERVAL != 0 && ((this.strStartTime != "" || this.strStartTime != null) && (this.strEndTime != "" || this.strEndTime != null))) {
                        if (this.schCreItem.ORG_GROUP_ID != undefined && this.schCreItem.ORG_GROUP_ID != "") {
                            this.disableButton = false;
                        }
                        else {
                            this.disableButton = true;
                        }
                    }
                }
                else {
                    if ((this.strStartTime != "" || this.strStartTime != null) && (this.strEndTime != "" || this.strEndTime != null) && this.schCreItem.INTERVAL != 0) {
                        this.disableButton = false;
                    }
                    else {
                        this.disableButton = true;
                    }
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "txtTime1_Keyup");
        }
    };
    ProcessScheduler.prototype.TimeChange = function (event) {
        try {
            if (this.checkedIntervals == true) {
                this.growlMessage = [];
                if (this.schCreItem.SCHEDULE_ID != null || this.schCreItem.SCHEDULE_ID != "" || this.schCreItem.SCHEDULE_ID != undefined) {
                    this.scheduleIDStatus = 0;
                }
                if (this.schCreItem.DESCRIPTION != null || this.schCreItem.DESCRIPTION != "" || this.schCreItem.DESCRIPTION != undefined) {
                    this.scheduleDescStatus = 0;
                }
                if (this.schCreItem.INTERVAL != null || this.schCreItem.INTERVAL != undefined) {
                }
                if (this.strStartTime == "" || this.strEndTime == "" || this.strStartTime == null || this.strEndTime == null || this.schCreItem.INTERVAL == 0) {
                    if (this.scheduleIDStatus != 0 || this.scheduleIDStatus != undefined || this.scheduleDescStatus != 0 || this.scheduleDescStatus != undefined) {
                        this.disableButton = true;
                    }
                }
                else {
                    if (this.stringMode == "ADD") {
                        if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0) && this.schCreItem.INTERVAL != 0 && ((this.strStartTime != "" || this.strStartTime != null) && (this.strEndTime != "" || this.strEndTime != null))) {
                            if (this.schCreItem.ORG_GROUP_ID != undefined && this.schCreItem.ORG_GROUP_ID != "") {
                                this.disableButton = false;
                            }
                            else {
                                this.disableButton = true;
                            }
                        }
                    }
                    else {
                        if ((this.strStartTime != "" || this.strStartTime != null) && (this.strEndTime != "" || this.strEndTime != null) && this.schCreItem.INTERVAL != 0) {
                            this.disableButton = false;
                        }
                        else {
                            this.disableButton = true;
                        }
                    }
                }
            }
            else {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].CHK_MON == false && this.lstDBData[i].CHK_TUE == false && this.lstDBData[i].CHK_WED == false && this.lstDBData[i].CHK_THR == false && this.lstDBData[i].CHK_FRI == false && this.lstDBData[i].CHK_SAT == false && this.lstDBData[i].CHK_SUN == false && (this.lstDBData[i].SCHEDULE_TIME == "")) {
                        this.disableButton = true;
                    }
                    else if ((this.lstDBData[i].CHK_MON == true || this.lstDBData[i].CHK_TUE == true || this.lstDBData[i].CHK_WED == true || this.lstDBData[i].CHK_THR == true || this.lstDBData[i].CHK_FRI == true || this.lstDBData[i].CHK_SAT == true || this.lstDBData[i].CHK_SUN == true) && (this.lstDBData[i].SCHEDULE_TIME != "")) {
                        if (this.stringMode == "ADD") {
                            if (this.orgGrpId != "") {
                                if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                    this.disableButton = false;
                                }
                            }
                            else {
                                if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                    if ((this.schCreItem.ORG_GROUP_ID == undefined) || (this.schCreItem.ORG_GROUP_ID == "")) {
                                        this.disableButton = true;
                                    }
                                    else {
                                        this.disableButton = false;
                                    }
                                }
                            }
                        }
                        else {
                            this.disableButton = false;
                        }
                    }
                    else {
                        this.disableButton = true;
                        break;
                    }
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "txtTime1_Keyup");
        }
    };
    /**
     * This method is for displaying catch block error messages
     * @param event
     */
    ProcessScheduler.prototype.displayCatchException = function (ex, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString(), funName, this.constructor.name);
    };
    /**
     * delete all the values from variables
     */
    ProcessScheduler.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstSchedule = [];
        this.lstOrgGroupData = [];
        this.orgGroupData = [];
        this.editTrue = false;
        this.createTrue = false;
        this.orgGroup = '';
        this.stringMode = '';
        this.checkedSpecificDays = false;
        this.checkedIntervals = false;
        this.lstDBData = [];
        this.selectedSchedule = '';
        this.intInterval = 0;
        this.intSchedType = 0;
        this.timeConversion = 0;
        this.timeConversionp = 0;
        this.lstOrgGroupsInfo = [];
        this.hideSChedule = true;
        this.disableButton = true;
    };
    ProcessScheduler = __decorate([
        core_1.Component({
            templateUrl: 'atpar-process-scheduler.component.html',
            providers: [atpar_process_scheduler_service_1.ProcessSchedulerService, AtParConstants_1.AtParConstants, api_1.ConfirmationService],
        }),
        __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService,
            router_1.Router,
            atpar_process_scheduler_service_1.ProcessSchedulerService,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            api_1.ConfirmationService])
    ], ProcessScheduler);
    return ProcessScheduler;
}());
exports.ProcessScheduler = ProcessScheduler;
var DayTime = (function () {
    function DayTime() {
    }
    return DayTime;
}());
exports.DayTime = DayTime;
//# sourceMappingURL=atpar-process-scheduler.component.js.map