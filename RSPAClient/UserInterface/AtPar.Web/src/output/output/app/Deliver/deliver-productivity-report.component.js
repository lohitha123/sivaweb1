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
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var http_1 = require("@angular/http");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var AtParEnums_2 = require("../Shared/AtParEnums");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var deliver_productivity_report_component_service_1 = require("../Deliver/deliver-productivity-report.component.service");
var linq_es5_1 = require("linq-es5");
var router_1 = require("@angular/router");
var VM_DELV_PROD_1 = require("../../app/Entities/VM_DELV_PROD");
var VM_TABLE_AVG_1 = require("../../app/Entities/VM_TABLE_AVG");
var VM_CYCLETIME_DETAILS_1 = require("../../app/Entities/VM_CYCLETIME_DETAILS");
var VM_RESULTS_1 = require("../../app/Entities/VM_RESULTS");
var file_saver_1 = require("file-saver");
var ProductivityReportComponent = (function () {
    function ProductivityReportComponent(httpService, _http, spinnerService, commonService, atParConstant, DeliverProductivityService, route) {
        this.httpService = httpService;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.DeliverProductivityService = DeliverProductivityService;
        this.route = route;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.selectedOrgGroupId = "";
        this.selectedDropDownUserId = [];
        this.UserId = [];
        this.orgGrpId = "";
        this.lstOrgGroups = [];
        this.showGrid = false;
        this.lstUsers = [];
        this.lstRepType = [];
        this.lstStartEvent = [];
        this.lstEndEvent = [];
        this.lstFromTime = [];
        this.lstToTime = [];
        this.lstInterval = [];
        this.selectedReportType = "";
        this.selectedStartEvent = "";
        this.selectedEndEvent = "";
        this.startEvent = "";
        this.endEvent = "";
        this.selectedFromTime = "";
        this.selectedToTime = "";
        this.blnStartEndEvents = false;
        this.blnFromToTimeInterval = false;
        this.blnShowOrgGroupDD = false;
        this.minDateValue1 = new Date();
        this.defDateRange = 0;
        this.statusCode = -1;
        this.lstItemIds = [];
        this.selectedItemId = "";
        this.lstItemIdsData = [];
        this.lstDBData = [];
        this.lstDBTableData = [];
        this.data = [];
        this.dataAvg = [];
        this.dataForRecv1 = [];
        this.dataForRecv2 = [];
        this.dataForRecv3 = [];
        this.dataForRecv4 = [];
        this.dataForRecv5 = [];
        this.dataForSummaryRecv = [];
        this.dataForDelv1 = [];
        this.dataForDelv2 = [];
        this.dataForDelv3 = [];
        this.dataForDelv4 = [];
        this.dataForDelv5 = [];
        this.dataForSummaryDeliver = [];
        this.dataForDock1 = [];
        this.dataForDock2 = [];
        this.dataForDock3 = [];
        this.dataForDock4 = [];
        this.dataForDock5 = [];
        this.dataForSummaryDock = [];
        this.dataSetlabel = [];
        this.dataSetbgcolor = [];
        this.dataSetbordercolor = [];
        this.dataSetdata = [];
        this.barColors = [];
        this.label = [];
        this.labelForAvg = [];
        this.chartDataSet = [];
        this.chartDataSetD1 = [];
        this.chartDataSetD2 = [];
        this.chartDataSetD3 = [];
        this.chartDataSetD4 = [];
        this.chartDataSetD5 = [];
        this.isMailDialog = false;
        this.toMailAddr = '';
        this.tdExports = false;
        this.bunitFlag = false;
        this.ReceivedDataSet = [];
        this.DeliveredDataSet = [];
        this.IntHrsParts = 0;
        this.IntNoofHrs = 0;
        this.IntRecPkgCnt = 0;
        this.IntDelPkgCnt = 0;
        this.pacakageSum = 0;
        this.pZeroTimeHrs = 0;
        this.lstChartData = [];
        this.lstAvgChartData = [];
        this.chartDataSetForRecvLine = [];
        this.chartDataSetForRecvGraph1 = [];
        this.chartDataSetForRecvGraph2 = [];
        this.chartDataSetForRecvGraph3 = [];
        this.chartDataSetForRecvGraph4 = [];
        this.chartDataSetForRecvGraph5 = [];
        this.chartDataSetForDeliverGraph1 = [];
        this.chartDataSetForDeliverGraph2 = [];
        this.chartDataSetForDeliverGraph3 = [];
        this.chartDataSetForDeliverGraph4 = [];
        this.chartDataSetForDeliverGraph5 = [];
        this.chartDataSetForDockGraph1 = [];
        this.chartDataSetForDockGraph2 = [];
        this.chartDataSetForDockGraph3 = [];
        this.chartDataSetForDockGraph4 = [];
        this.chartDataSetForDockGraph5 = [];
        this.lableForReceive = [];
        this.lstDataForRecv = [];
        this.chartDataSetForDelverLine = [];
        this.lableForDeliver = [];
        this.lstDataForDeliver = [];
        this.lstDataForDock = [];
        this.chartDataSetForDock = [];
        this.labelForDock = [];
        this.lstDataForSummaryRecv = [];
        this.chartDataSetForSummaryRecv = [];
        this.labelForSummaryRecv = [];
        this.lstDataForSummaryDeliver = [];
        this.chartDataSetForSummaryDeliver = [];
        this.labelForSummaryDeliver = [];
        this.chartDataSetForSummaryDock = [];
        this.labelForSummaryDock = [];
        this.DateDisplay = "";
        this.lstDataForSummaryDock = [];
        this.lstTransactiondata = [];
        this.lstEventDetailsData = [];
        this.lstTransactionFilterdata = [];
        this.lstFinalCycleData = [];
        this.lstCycleHourDetails = [];
        this.showGridCycleTime = false;
        this.Count = "";
        this.AVG = "";
        this.StDev = "";
        this.Max = "";
        this.Min = "";
        this.Results = [];
        this.lstTable1Data = [];
        this.lstTable2Data = [];
        this.randomColors = [];
        this.dateString = [];
        this.blnGraph1 = false;
        this.blnGraph2 = false;
        this.blnGraph3 = false;
        this.blnGraph4 = false;
        this.blnGraph5 = false;
    }
    ProductivityReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.bindOrgGroups();
                        this.lstRepType = [];
                        this.lstRepType.push({ label: "Select One", value: "" }, { label: "Productivity", value: "1" }, { label: "Cycle Time", value: "2" });
                        this.lstStartEvent = [];
                        this.lstStartEvent.push({ label: "Select One", value: "" }, { label: "Parcel Count", value: "-1" }, { label: "Received", value: "-2" }, { label: "Download", value: "1" }, { label: "Picked", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Delivered", value: "50" });
                        this.lstEndEvent = [];
                        this.lstEndEvent.push({ label: "Select One", value: "" }, { label: "Parcel Count", value: "-1" }, { label: "Received", value: "-2" }, { label: "Download", value: "1" }, { label: "Picked", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Delivered", value: "50" });
                        this.lstFromTime = [];
                        this.lstFromTime.push({ label: "Select One", value: "" }, { label: "00:00", value: "00:00" }, { label: "00:30", value: "00:30" }, { label: "01:00", value: "01:00" }, { label: "01:30", value: "01:30" }, { label: "02:00", value: "02:00" }, { label: "02:30", value: "02:30" }, { label: "03:00", value: "03:00" }, { label: "03:30", value: "03:30" }, { label: "04:00", value: "04:00" }, { label: "04:30", value: "04:30" }, { label: "05:00", value: "05:00" }, { label: "05:30", value: "05:30" }, { label: "06:00", value: "06:00" }, { label: "06:30", value: "06:30" }, { label: "07:00", value: "07:00" }, { label: "07:30", value: "07:30" }, { label: "08:00", value: "08:00" }, { label: "08:30", value: "08:30" }, { label: "09:00", value: "09:00" }, { label: "09:30", value: "09:30" }, { label: "10:00", value: "10:00" }, { label: "10:30", value: "10:30" }, { label: "11:00", value: "11:00" }, { label: "11:30", value: "11:30" }, { label: "12:00", value: "12:00" }, { label: "12:30", value: "12:30" }, { label: "13:00", value: "13:00" }, { label: "13:30", value: "13:30" }, { label: "14:00", value: "14:00" }, { label: "14:30", value: "14:30" }, { label: "15:00", value: "15:00" }, { label: "15:30", value: "15:30" }, { label: "16:00", value: "16:00" }, { label: "16:30", value: "16:30" }, { label: "17:00", value: "17:00" }, { label: "17:30", value: "17:30" }, { label: "18:00", value: "18:00" }, { label: "18:30", value: "18:30" }, { label: "19:00", value: "19:00" }, { label: "19:30", value: "19:30" }, { label: "20:00", value: "20:00" }, { label: "20:30", value: "20:30" }, { label: "21:00", value: "21:00" }, { label: "21:30", value: "21:30" }, { label: "22:00", value: "22:00" }, { label: "22:30", value: "22:30" }, { label: "23:00", value: "23:00" }, { label: "23:30", value: "23:30" });
                        this.lstToTime = [];
                        this.lstToTime.push({ label: "Select One", value: "" }, { label: "00:00", value: "00:00" }, { label: "00:30", value: "00:30" }, { label: "01:00", value: "01:00" }, { label: "01:30", value: "01:30" }, { label: "02:00", value: "02:00" }, { label: "02:30", value: "02:30" }, { label: "03:00", value: "03:00" }, { label: "03:30", value: "03:30" }, { label: "04:00", value: "04:00" }, { label: "04:30", value: "04:30" }, { label: "05:00", value: "05:00" }, { label: "05:30", value: "05:30" }, { label: "06:00", value: "06:00" }, { label: "06:30", value: "06:30" }, { label: "07:00", value: "07:00" }, { label: "07:30", value: "07:30" }, { label: "08:00", value: "08:00" }, { label: "08:30", value: "08:30" }, { label: "09:00", value: "09:00" }, { label: "09:30", value: "09:30" }, { label: "10:00", value: "10:00" }, { label: "10:30", value: "10:30" }, { label: "11:00", value: "11:00" }, { label: "11:30", value: "11:30" }, { label: "12:00", value: "12:00" }, { label: "12:30", value: "12:30" }, { label: "13:00", value: "13:00" }, { label: "13:30", value: "13:30" }, { label: "14:00", value: "14:00" }, { label: "14:30", value: "14:30" }, { label: "15:00", value: "15:00" }, { label: "15:30", value: "15:30" }, { label: "16:00", value: "16:00" }, { label: "16:30", value: "16:30" }, { label: "17:00", value: "17:00" }, { label: "17:30", value: "17:30" }, { label: "18:00", value: "18:00" }, { label: "18:30", value: "18:30" }, { label: "19:00", value: "19:00" }, { label: "19:30", value: "19:30" }, { label: "20:00", value: "20:00" }, { label: "20:30", value: "20:30" }, { label: "21:00", value: "21:00" }, { label: "21:30", value: "21:30" }, { label: "22:00", value: "22:00" }, { label: "22:30", value: "22:30" }, { label: "23:00", value: "23:00" }, { label: "23:30", value: "23:30" });
                        this.lstInterval = [];
                        this.lstInterval.push({ label: "Select One", value: "0" }, { label: "15", value: "15" }, { label: "30", value: "30" }, { label: "45", value: "45" }, { label: "60", value: "60" });
                        this.defDateRange = 4;
                        this.fromDate = new Date();
                        _a = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, this.defDateRange)];
                    case 1:
                        _a.fromDate = _b.sent();
                        this.toDate = new Date();
                        this.route.queryParams.subscribe(function (params) {
                            _this.item = params["p2value"];
                            _this.orgGroupId = params["p3value"];
                            _this.updateDateTime = params["p4value"];
                            _this.cartId = params["p5value"];
                            _this.bUnit = params["p6value"];
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductivityReportComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.bindUsersList();
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstUsers = [];
                                            _this.lstUsers.push({ label: "ALL", value: "ALL" });
                                            _this.lstOrgGroups.push({ label: "Select One", value: "" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            _this.selectedDropDownUserId = [];
                                            _this.selectedDropDownUserId.push("ALL");
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductivityReportComponent.prototype.bindUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstUsers = [];
                        this.lstUsers.push({ label: "ALL", value: "ALL" });
                        return [4 /*yield*/, this.commonService.getHeirarchyUsersList(AtParEnums_2.EnumApps.Deliver, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i <= data.DataDictionary["pDSUserList"]["Table1"].length - 1; i++) {
                                            _this.lstUsers.push({
                                                label: data.DataDictionary["pDSUserList"]["Table1"][i].FULLNAME,
                                                value: data.DataDictionary["pDSUserList"]["Table1"][i].USER_ID
                                            });
                                        }
                                        _this.selectedDropDownUserId = [];
                                        _this.selectedDropDownUserId.push("ALL");
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "bindUsersList");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductivityReportComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.growlMessage = [];
                this.showGrid = false;
                if (this.selectedOrgGroupId === "") {
                    this.lstUsers = [];
                    this.orgGroupIDForDBUpdate = "";
                    this.lstUsers.push({ label: "ALL", value: "ALL" });
                    return [2 /*return*/];
                }
                try {
                    this.bindUsersList();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.ddlRepTypeChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.selectedReportType === "1") {
                    this.blnStartEndEvents = true;
                    this.blnFromToTimeInterval = false;
                    this.selectedStartEvent = "";
                    this.selectedEndEvent = "";
                }
                else if (this.selectedReportType === "2") {
                    this.blnStartEndEvents = false;
                    this.blnFromToTimeInterval = true;
                    this.selectedFromTime = "";
                    this.selectedToTime = "";
                    this.selectedInterval = null;
                }
                else {
                    this.blnStartEndEvents = false;
                    this.blnFromToTimeInterval = false;
                    this.selectedFromTime = "";
                    this.selectedToTime = "";
                    this.selectedStartEvent = "";
                    this.selectedEndEvent = "";
                    this.selectedInterval = null;
                }
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.addDays = function (theDate, days) {
        return new Date(theDate.getTime() - days * 24 * 60 * 60 * 1000);
    };
    ProductivityReportComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    ProductivityReportComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    ProductivityReportComponent.prototype.onGoClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isValidate, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.showGrid = false;
                        return [4 /*yield*/, this.validateSearchFields()];
                    case 1:
                        //this.lstCaseInfo = [];
                        isValidate = _a.sent();
                        this.spinnerService.start();
                        if (isValidate) {
                            //await this.BindGrid();
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "onGoClick");
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductivityReportComponent.prototype.validateSearchFields = function () {
        try {
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convert(this.fromDate)) > Date.parse(this.convert(this.toDate))) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be greater than From Date" });
                    return false;
                }
            }
            else {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "validateSearchFields");
            return false;
        }
    };
    ProductivityReportComponent.prototype.convert = function (str) {
        var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    ProductivityReportComponent.prototype.bindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var k, startTime, endTime, startDate, endDate, difference, today, count, color, randmColor, color, randmColor, today, count, blnstartendevent;
            return __generator(this, function (_a) {
                this.showGridCycleTime = false;
                this.tdExports = false;
                if (this.orgGroupIDForDBUpdate === "" || this.orgGroupIDForDBUpdate == undefined) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGrp ID" });
                    return [2 /*return*/];
                }
                if (this.selectedReportType === "" || this.selectedReportType == undefined) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Report type" });
                    return [2 /*return*/];
                }
                if (this.selectedDropDownUserId == undefined || this.selectedDropDownUserId.length == 0) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select User ID" });
                    return [2 /*return*/];
                }
                if (this.selectedDropDownUserId.length != 1) {
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ALL User selection is not considerd when Multiple users Selected" });
                        return [2 /*return*/];
                    }
                }
                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    this.UserId = [];
                    for (k = 0; k <= this.lstUsers.length - 1; k++) {
                        if (this.lstUsers[k].value !== "ALL") {
                            this.UserId.push(this.lstUsers[k].value);
                        }
                    }
                }
                if (this.blnShowOrgGroupDD == true) {
                    this.orgGroupIDForDBUpdate = this.selectedOrgGroupId.split("-")[0].trim();
                }
                else {
                    this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0].trim();
                }
                if (this.selectedStartEvent === "-1" || this.selectedStartEvent === "-2") {
                    this.startEvent = "0";
                }
                else {
                    this.startEvent = this.selectedStartEvent;
                }
                if (this.selectedEndEvent === "-1" || this.selectedEndEvent === "-2") {
                    this.endEvent = "30";
                }
                else {
                    this.endEvent = this.selectedEndEvent;
                }
                if (this.selectedReportType === "1") {
                    if (this.selectedFromTime === "" || this.selectedFromTime == undefined) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select From Time" });
                        return [2 /*return*/];
                    }
                    if (this.selectedToTime === "" || this.selectedToTime == undefined) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select To Time" });
                        return [2 /*return*/];
                    }
                    startTime = this.selectedFromTime.split(":");
                    endTime = this.selectedToTime.split(":");
                    startDate = new Date(0, 0, 0, parseInt(startTime[0]), parseInt(startTime[1]), 0);
                    endDate = new Date(0, 0, 0, parseInt(endTime[0]), parseInt(endTime[1]), 0);
                    difference = startDate.getTime() - endDate.getTime();
                    if (difference >= 0) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select To Time greater than from Time" });
                        return [2 /*return*/];
                    }
                    if (this.selectedInterval == null || this.selectedInterval == undefined) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Interval" });
                        return [2 /*return*/];
                    }
                    today = new Date();
                    if (this.fromDate > today) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select From Date less than or equal to current date" });
                        return [2 /*return*/];
                    }
                    if (this.toDate > today) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select To Date less than or equal to current date" });
                        return [2 /*return*/];
                    }
                    if (this.fromDate > this.toDate) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Date Range ( mm/dd/yyyy)" });
                        return [2 /*return*/];
                    }
                    count = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
                    if (count > 4) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Duration in days should not exceed 5 days" });
                        return [2 /*return*/];
                    }
                    this.randomColors = [];
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        for (color = 0; color <= this.UserId.length - 1; color++) {
                            randmColor = this.getRandomColor();
                            this.randomColors.push(randmColor);
                        }
                    }
                    else {
                        for (color = 0; color <= this.selectedDropDownUserId.length - 1; color++) {
                            randmColor = this.getRandomColor();
                            this.randomColors.push(randmColor);
                        }
                    }
                    this.BindDayCharts();
                }
                else {
                    if (this.selectedStartEvent === "" || this.selectedStartEvent == undefined) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Start Event" });
                        return [2 /*return*/];
                    }
                    if (this.selectedEndEvent === "" || this.selectedEndEvent == undefined) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select End Event" });
                        return [2 /*return*/];
                    }
                    today = new Date();
                    if (this.fromDate > today) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select From Date less than or equal to current date" });
                        return [2 /*return*/];
                    }
                    if (this.toDate > today) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select To Date less than or equal to current date" });
                        return [2 /*return*/];
                    }
                    if (this.fromDate > this.toDate) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Date Range ( mm/dd/yyyy)" });
                        return [2 /*return*/];
                    }
                    count = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
                    if (count > 4) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Duration in days should not exceed 5 days" });
                        return [2 /*return*/];
                    }
                    blnstartendevent = false;
                    if (this.selectedStartEvent === "-1" && this.selectedEndEvent === "-2") {
                        blnstartendevent = true;
                    }
                    if (this.selectedStartEvent === "-2" && this.selectedEndEvent === "-1") {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select End Event greater than Start Event" });
                        return [2 /*return*/];
                    }
                    if (blnstartendevent == false) {
                        if (parseInt(this.selectedStartEvent) >= parseInt(this.selectedEndEvent)) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select End Event greater than Start Event" });
                            return [2 /*return*/];
                        }
                    }
                    this.showGrid = false;
                    this.BindCycleTimeReport();
                }
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.BindDayCharts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var frmDate, dt, todate, userString, a;
            return __generator(this, function (_a) {
                this.spinnerService.start();
                this.growlMessage = [];
                frmDate = this.convert(this.fromDate);
                dt = this.convert(this.fromDate);
                this.frmDate = new Date(dt);
                todate = this.convert(this.toDate);
                this.IntRecPkgCnt = 0;
                this.IntDelPkgCnt = 0;
                userString = "";
                for (a = 0; a <= this.selectedDropDownUserId.length - 1; a++) {
                    userString = userString + this.selectedDropDownUserId[a] + ",";
                }
                userString = userString.replace(/,\s*$/, "");
                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    if (this.lstUsers.length == 1) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                        this.spinnerService.stop();
                        return [2 /*return*/];
                    }
                }
                this.DeliverProductivityService.GetProductivityReport(this.orgGroupIDForDBUpdate, frmDate, todate, userString, this.selectedInterval, this.selectedFromTime, this.selectedToTime).catch(this.httpService.handleError).then(function (res) {
                    var data = res.json();
                    switch (data.StatType) {
                        case AtParEnums_2.StatusType.Success: {
                            _this.showGrid = true;
                            _this.lstChartData = [];
                            _this.lstAvgChartData = [];
                            if (data.DataDictionary["pDsProductivityRep"]["Table1"].length > 0) {
                                _this.lstTable1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                                _this.PopulateGraphsForReceive(0, data, 0, "Receiving");
                            }
                            if (data.DataDictionary["pDsProductivityRep"]["Table2"].length > 0) {
                                _this.lstTable2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                                _this.PopulateGraphsForDeliver(0, data, 0, "Deliver");
                            }
                            if (data.DataDictionary["pDsProductivityRep"]["Table1"].length > 0 || data.DataDictionary["pDsProductivityRep"]["Table2"].length > 0) {
                                _this.BindSummaryChartsRecv(data);
                                _this.BindSummaryChartsDeliver(data);
                                _this.PopulateEmpProdColumnChart(data);
                                _this.PopulateDockGraph(data, 0);
                            }
                            _this.tdExports = true;
                            _this.spinnerService.stop();
                            break;
                        }
                        case AtParEnums_2.StatusType.Warn: {
                            _this.showGrid = false;
                            _this.tdExports = true;
                            _this.showGridCycleTime = false;
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                        case AtParEnums_2.StatusType.Error: {
                            _this.showGrid = false;
                            _this.tdExports = true;
                            _this.showGridCycleTime = false;
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                        case AtParEnums_2.StatusType.Custom: {
                            _this.showGrid = false;
                            _this.tdExports = true;
                            _this.showGridCycleTime = false;
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.PopulateEmpProdColumnChart = function (data) {
        var _IntPkgCount = 0;
        var _dblZeroWHours = 0;
        var lstItem;
        var frmDate = this.frmDate;
        var Curdate = frmDate;
        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
            for (var i = 0; i <= this.UserId.length - 1; i++) {
                var dtfromdate = this.fromDate;
                var chartDate = new Date(dtfromdate);
                var dttodate = this.toDate;
                var datediff = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
                //let datediff = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                var UserName = this.UserId[i];
                var AvgPack = 0;
                var AvgTime = 0;
                var daycount = 0;
                if (UserName !== "ALL") {
                    var x = 0;
                    while (x <= datediff) {
                        daycount += 1;
                        var currentDate = this.convert(chartDate);
                        this.GetProductivityReportValues(data, UserName, currentDate);
                        lstItem = new VM_DELV_PROD_1.VM_DELV_PROD();
                        lstItem.PACKAGE_COUNT = this.pacakageSum;
                        lstItem.UserId = UserName;
                        lstItem.TIME = Math.ceil(this.pZeroTimeHrs * 10) / 10;
                        lstItem.TRANS_DATE = Curdate.toString();
                        lstItem.Day = "D" + daycount.toString();
                        this.lstChartData.push(lstItem);
                        chartDate = new Date(chartDate.setDate(chartDate.getDate() + 1));
                        x = x + 1;
                    }
                }
            }
        }
        else {
            for (var i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {
                var dtfromdate = this.frmDate;
                var chartDate = new Date(dtfromdate);
                var dttodate = this.toDate;
                var datediff = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
                //let datediff = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                var UserName = this.selectedDropDownUserId[i];
                var AvgPack = 0;
                var AvgTime = 0;
                var daycount = 0;
                if (UserName !== "ALL") {
                    var z = 0;
                    while (z <= datediff) {
                        daycount += 1;
                        var currentDate = this.convert(chartDate);
                        this.GetProductivityReportValues(data, UserName, currentDate);
                        lstItem = new VM_DELV_PROD_1.VM_DELV_PROD();
                        lstItem.PACKAGE_COUNT = this.pacakageSum;
                        lstItem.UserId = UserName;
                        lstItem.TIME = this.pZeroTimeHrs;
                        lstItem.TRANS_DATE = chartDate.toString();
                        lstItem.Day = "D" + daycount.toString();
                        this.lstChartData.push(lstItem);
                        chartDate = new Date(chartDate.setDate(chartDate.getDate() + 1));
                        z = z + 1;
                    }
                }
            }
        }
        console.log(this.lstChartData);
        this.barColors = ["#FFB552", "#FFB552"];
        this.dataSetbgcolor = [];
        this.dataSetdata = [];
        this.dataSetbordercolor = [];
        var dataPackageCount = [];
        var dataTimePackage = [];
        var dataForInsideTable = [];
        var dataPackageCountD1 = [];
        var dataTimePackageD1 = [];
        var dataPackageCountD2 = [];
        var dataTimePackageD2 = [];
        var dataPackageCountD3 = [];
        var dataTimePackageD3 = [];
        var dataPackageCountD4 = [];
        var dataTimePackageD4 = [];
        var dataPackageCountD5 = [];
        var dataTimePackageD5 = [];
        this.label = [];
        for (var i = 0; i <= this.lstChartData.length - 1; i++) {
            this.label.push(this.lstChartData[i].UserId);
            dataPackageCount.push(this.lstChartData[i].PACKAGE_COUNT);
            dataTimePackage.push(this.lstChartData[i].TIME);
        }
        var distinctUsersArray = [];
        distinctUsersArray = linq_es5_1.asEnumerable(this.label).Distinct().ToArray();
        var _loop_1 = function (cdata) {
            var listOfseparateUsers = [];
            var dataPackageCount_1 = [];
            listOfseparateUsers = linq_es5_1.asEnumerable(this_1.lstChartData).Where(function (x) { return x.UserId == distinctUsersArray[cdata]; }).ToArray();
            if (listOfseparateUsers.length > 0) {
                if (listOfseparateUsers[0] != undefined) {
                    dataPackageCountD1.push(listOfseparateUsers[0].PACKAGE_COUNT);
                    dataTimePackageD1.push(listOfseparateUsers[0].TIME);
                }
                if (listOfseparateUsers[1] != undefined) {
                    dataPackageCountD2.push(listOfseparateUsers[1].PACKAGE_COUNT);
                    dataTimePackageD2.push(listOfseparateUsers[1].TIME);
                }
                if (listOfseparateUsers[2] != undefined) {
                    dataPackageCountD3.push(listOfseparateUsers[2].PACKAGE_COUNT);
                    dataTimePackageD3.push(listOfseparateUsers[2].TIME);
                }
                if (listOfseparateUsers[3] != undefined) {
                    dataPackageCountD4.push(listOfseparateUsers[3].PACKAGE_COUNT);
                    dataTimePackageD4.push(listOfseparateUsers[3].TIME);
                }
                if (listOfseparateUsers[4] != undefined) {
                    dataPackageCountD5.push(listOfseparateUsers[4].PACKAGE_COUNT);
                    dataTimePackageD5.push(listOfseparateUsers[4].TIME);
                }
            }
        };
        var this_1 = this;
        for (var cdata = 0; cdata <= distinctUsersArray.length - 1; cdata++) {
            _loop_1(cdata);
        }
        this.chartDataSet = [];
        if (dataPackageCountD1.length > 0) {
            this.chartDataSet.push({ label: 'D1', backgroundColor: '#3391CE', borderColor: '', data: dataPackageCountD1, fill: true });
            this.chartDataSet.push({ label: 'D1', backgroundColor: '#48BF7D', borderColor: '', data: dataTimePackageD1, fill: true });
        }
        if (dataPackageCountD2.length > 0) {
            this.chartDataSet.push({ label: 'D2', backgroundColor: '#3391CE', borderColor: '', data: dataPackageCountD2, fill: true });
            this.chartDataSet.push({ label: 'D2', backgroundColor: '#48BF7D', borderColor: '', data: dataTimePackageD2, fill: true });
        }
        if (dataPackageCountD3.length > 0) {
            this.chartDataSet.push({ label: 'D3', backgroundColor: '#3391CE', borderColor: '', data: dataPackageCountD3, fill: true });
            this.chartDataSet.push({ label: 'D3', backgroundColor: '#48BF7D', borderColor: '', data: dataTimePackageD3, fill: true });
        }
        if (dataPackageCountD4.length > 0) {
            this.chartDataSet.push({ label: 'D4', backgroundColor: '#3391CE', borderColor: '', data: dataPackageCountD4, fill: true });
            this.chartDataSet.push({ label: 'D4', backgroundColor: '#48BF7D', borderColor: '', data: dataTimePackageD4, fill: true });
        }
        if (dataPackageCountD5.length > 0) {
            this.chartDataSet.push({ label: 'D5', backgroundColor: '#3391CE', borderColor: '', data: dataPackageCountD5, fill: true });
            this.chartDataSet.push({ label: 'D5', backgroundColor: '#48BF7D', borderColor: '', data: dataTimePackageD5, fill: true });
        }
        var tooltipData = [];
        tooltipData = this.lstChartData;
        this.option = {
            scales: {
                yAxes: [{
                        stacked: false,
                        gridLines: {
                            display: true,
                            color: "rgba(255,99,132,0.2)"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Packages'
                        }
                    }],
                xAxes: [{
                        gridLines: {
                            display: false,
                            color: "rgba(255,99,132,0.2)"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'User'
                        }
                    }]
            },
            title: {
                display: true,
                text: "Employee Productivity By Day"
            },
            legend: {
                display: false
            },
            animation: {
                onComplete: function () {
                    var chartInstance = this.chart, ctx = chartInstance.ctx;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    this.data.datasets.forEach(function (dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                            var data = dataset.data[index];
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        });
                    });
                }
            }
        };
        this.data = [];
        this.data = {
            labels: distinctUsersArray,
            datasets: this.chartDataSet,
            options: this.option
        };
        this.PopulateEmpProdAverageChart(this.lstChartData);
    };
    ProductivityReportComponent.prototype.GetProductivityReportValues = function (data, UserName, Curdate) {
        return __awaiter(this, void 0, void 0, function () {
            var DelRecvLength, length, j, j, recvData, delvData, totalData, recv, delv;
            return __generator(this, function (_a) {
                DelRecvLength = 0;
                length = 0;
                this.IntRecPkgCnt = 0;
                this.IntDelPkgCnt = 0;
                length = data.DataDictionary["pDsProductivityRep"]["Table1"].length;
                this.IntHrsParts = (60 / this.selectedInterval);
                this.IntNoofHrs = (parseFloat(length.toString()) / this.IntHrsParts);
                this.ReceivedDataSet = data.DataDictionary["pDsProductivityRep"]["Table1"];
                this.ReceivedDataSet = linq_es5_1.asEnumerable(this.ReceivedDataSet).Where(function (x) { return x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == Curdate; }).ToArray();
                if (this.ReceivedDataSet.length > 0) {
                    for (j = 0; j <= this.ReceivedDataSet.length - 1; j++) {
                        this.IntRecPkgCnt += this.ReceivedDataSet[j].PACKAGE_COUNT;
                    }
                }
                this.DeliveredDataSet = data.DataDictionary["pDsProductivityRep"]["Table2"];
                this.DeliveredDataSet = linq_es5_1.asEnumerable(this.DeliveredDataSet).Where(function (x) { return x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == Curdate; }).ToArray();
                if (this.DeliveredDataSet.length > 0) {
                    for (j = 0; j <= this.DeliveredDataSet.length - 1; j++) {
                        this.IntDelPkgCnt += this.DeliveredDataSet[j].PACKAGE_COUNT;
                    }
                }
                recvData = [];
                delvData = [];
                totalData = [];
                for (recv = 0; recv <= this.ReceivedDataSet.length - 1; recv++) {
                    recvData.push(this.ReceivedDataSet[recv].START_INTERVAL);
                }
                for (delv = 0; delv <= this.ReceivedDataSet.length - 1; delv++) {
                    delvData.push(this.ReceivedDataSet[delv].START_INTERVAL);
                }
                this.pacakageSum = this.IntRecPkgCnt + this.IntDelPkgCnt;
                totalData = recvData.concat(delvData);
                totalData = linq_es5_1.asEnumerable(totalData).Distinct().ToArray();
                if (totalData.length > 0) {
                    if (this.selectedInterval > 0) {
                        this.pZeroTimeHrs = Math.round(this.IntNoofHrs - (parseFloat(totalData.length.toString()) / this.IntHrsParts)) - 1;
                    }
                }
                else {
                    this.pZeroTimeHrs = (Math.trunc(((this.IntNoofHrs - 1) * 100)) / 100);
                }
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.PopulateEmpProdAverageChart = function (Delvdata) {
        return __awaiter(this, void 0, void 0, function () {
            var lstItem, Delvdata1, _loop_2, this_2, i, _loop_3, this_3, i, dataPackageCount, dataAvgTimePackage, i;
            return __generator(this, function (_a) {
                Delvdata1 = [];
                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    _loop_2 = function (i) {
                        var UserName = this_2.UserId[i];
                        var AvgPack = 0;
                        var AvgTime = 0;
                        var daycount = 0;
                        if (UserName !== "ALL") {
                            lstItem = new VM_TABLE_AVG_1.VM_TABLE_AVG();
                            Delvdata1 = linq_es5_1.asEnumerable(Delvdata).Where(function (x) { return x.UserId == UserName; }).ToArray();
                            for (var i_1 = 0; i_1 <= Delvdata1.length - 1; i_1++) {
                                AvgPack += Delvdata1[i_1].PACKAGE_COUNT;
                                AvgTime += Delvdata1[i_1].TIME;
                            }
                            AvgPack = AvgPack / Delvdata1.length;
                            AvgTime = AvgTime / Delvdata1.length;
                            lstItem.PACKAGE_COUNT = AvgPack;
                            lstItem.AVG_TIME = Math.trunc(AvgTime * 100) / 100;
                            lstItem.UserId = UserName;
                            this_2.lstAvgChartData.push(lstItem);
                        }
                    };
                    this_2 = this;
                    for (i = 0; i <= this.UserId.length - 1; i++) {
                        _loop_2(i);
                    }
                }
                else {
                    _loop_3 = function (i) {
                        var UserName = this_3.selectedDropDownUserId[i];
                        var AvgPack = 0;
                        var AvgTime = 0;
                        var daycount = 0;
                        if (UserName !== "ALL") {
                            lstItem = new VM_TABLE_AVG_1.VM_TABLE_AVG();
                            Delvdata1 = linq_es5_1.asEnumerable(Delvdata).Where(function (x) { return x.UserId == UserName; }).ToArray();
                            for (var i_2 = 0; i_2 <= Delvdata1.length - 1; i_2++) {
                                AvgPack += Delvdata1[i_2].PACKAGE_COUNT;
                                AvgTime += Delvdata1[i_2].TIME;
                            }
                            AvgPack = AvgPack / Delvdata1.length;
                            AvgTime = AvgTime / Delvdata1.length;
                            lstItem.PACKAGE_COUNT = AvgPack;
                            lstItem.AVG_TIME = Math.ceil(AvgTime * 10) / 10;
                            lstItem.UserId = UserName;
                            this_3.lstAvgChartData.push(lstItem);
                        }
                    };
                    this_3 = this;
                    for (i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {
                        _loop_3(i);
                    }
                }
                this.barColors = ["#FFB552", "#FFB552"];
                this.dataSetbgcolor = [];
                this.dataSetdata = [];
                this.dataSetbordercolor = [];
                dataPackageCount = [];
                dataAvgTimePackage = [];
                this.labelForAvg = [];
                for (i = 0; i <= this.lstAvgChartData.length - 1; i++) {
                    this.labelForAvg.push(this.lstAvgChartData[i].UserId);
                    dataPackageCount.push(this.lstAvgChartData[i].PACKAGE_COUNT);
                    dataAvgTimePackage.push(this.lstAvgChartData[i].AVG_TIME);
                }
                this.chartDataSet = [];
                this.chartDataSet.push({ label: 'Average Packages', backgroundColor: '#3391CE', borderColor: '', data: dataPackageCount, fill: true });
                this.chartDataSet.push({ label: 'Average Time', backgroundColor: '#48BF7D', borderColor: '', data: dataAvgTimePackage, fill: true });
                this.optionForAvg = {
                    scales: {
                        yAxes: [{
                                stacked: false,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'User'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Average Employee Productivity"
                    },
                    animation: {
                        onComplete: function () {
                            var chartInstance = this.chart, ctx = chartInstance.ctx;
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            this.data.datasets.forEach(function (dataset, i) {
                                var meta = chartInstance.controller.getDatasetMeta(i);
                                meta.data.forEach(function (bar, index) {
                                    var data = dataset.data[index];
                                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                                });
                            });
                        }
                    }
                };
                this.dataAvg = [];
                this.dataAvg = {
                    labels: this.labelForAvg,
                    datasets: this.chartDataSet,
                    options: this.optionForAvg
                };
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.PopulateGraphsForReceive = function (TblIndex, data, pDay, ReportName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var dtfromdate, chartDate, intPcnt, dayWiseData, DisplayName, count, x, _loop_4, this_4, i_3, _loop_5, this_5, i_4, cnt, list, cntData, i, i, i, i, i;
            return __generator(this, function (_a) {
                try {
                    dtfromdate = this.frmDate;
                    chartDate = new Date(dtfromdate);
                    intPcnt = 0;
                    this.lstDataForRecv = [];
                    dayWiseData = [];
                    DisplayName = "";
                    this.dateString = [];
                    count = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
                    for (x = 0; x <= count;) {
                        this.dateString.push(this.convertDateFormate(chartDate));
                        if (this.lstDataForRecv[x] == null) {
                            this.lstDataForRecv[x] = [];
                            if (this.lstDataForRecv[x].PACKAGE_COUNT == null) {
                                this.lstDataForRecv[x].PACKAGE_COUNT = [];
                            }
                            this.lstDataForRecv[x].START_INTERVAL = [];
                            this.lstDataForRecv[x].ReceiveData = [];
                            this.lstDataForRecv[x].ReceiveLables = [];
                        }
                        if (this.lstDataForRecv[x].ReceiveData == null) {
                            this.lstDataForRecv[x].ReceiveData = [];
                        }
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            _loop_4 = function (i_3) {
                                var UserName = this_4.UserId[i_3];
                                if (UserName !== "ALL") {
                                    this_4.lstDataForRecv[x].PACKAGE_COUNT[i_3] = [];
                                    this_4.lstDataForRecv[x].START_INTERVAL[i_3] = [];
                                    dayWiseData[x] = [];
                                    var table1Data = [];
                                    table1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                                    var recvDate_1 = this_4.convertDateFormate(chartDate);
                                    var _loop_6 = function (j) {
                                        var filteredList = linq_es5_1.asEnumerable(table1Data).Where(function (x) { return x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == recvDate_1 && x.START_INTERVAL == _this.lstTable1Data[j].START_INTERVAL; }).ToArray();
                                        if (filteredList.length > 0) {
                                            dayWiseData[x].push({ START_INTERVAL: filteredList[0].START_INTERVAL, PACKAGE_COUNT: filteredList[0].PACKAGE_COUNT, USER_ID: UserName, TRANS_DATE: filteredList[0].TRANS_DATE });
                                        }
                                        else {
                                            dayWiseData[x].push({ START_INTERVAL: this_4.lstTable1Data[j].START_INTERVAL, PACKAGE_COUNT: 0, USER_ID: UserName, TRANS_DATE: recvDate_1 });
                                        }
                                        this_4.lstDataForRecv[x].START_INTERVAL[i_3].push(dayWiseData[x][j].START_INTERVAL);
                                        this_4.lstDataForRecv[x].PACKAGE_COUNT[i_3].push(dayWiseData[x][j].PACKAGE_COUNT);
                                    };
                                    for (var j = 0; j <= this_4.lstTable1Data.length - 1; j++) {
                                        _loop_6(j);
                                    }
                                }
                                this_4.lstDataForRecv[x].ReceiveData[i_3] = [];
                                this_4.lstDataForRecv[x].ReceiveLables.push(this_4.lstDataForRecv[x].START_INTERVAL[0]);
                                this_4.lstDataForRecv[x].ReceiveData[i_3].push(this_4.lstDataForRecv[x].PACKAGE_COUNT[i_3]);
                            };
                            this_4 = this;
                            for (i_3 = 0; i_3 <= this.UserId.length - 1; i_3++) {
                                _loop_4(i_3);
                            }
                        }
                        else {
                            _loop_5 = function (i_4) {
                                var UserName = this_5.selectedDropDownUserId[i_4];
                                if (UserName !== "ALL") {
                                    this_5.lstDataForRecv[x].PACKAGE_COUNT[i_4] = [];
                                    this_5.lstDataForRecv[x].START_INTERVAL[i_4] = [];
                                    dayWiseData[x] = [];
                                    var table1Data = [];
                                    table1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                                    var recvDate_2 = this_5.convertDateFormate(chartDate);
                                    var _loop_7 = function (j) {
                                        var filteredList = linq_es5_1.asEnumerable(table1Data).Where(function (x) { return x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == recvDate_2 && x.START_INTERVAL == _this.lstTable1Data[j].START_INTERVAL; }).ToArray();
                                        if (filteredList.length > 0) {
                                            dayWiseData[x].push({ START_INTERVAL: filteredList[0].START_INTERVAL, PACKAGE_COUNT: filteredList[0].PACKAGE_COUNT, USER_ID: UserName, TRANS_DATE: filteredList[0].TRANS_DATE });
                                        }
                                        else {
                                            dayWiseData[x].push({ START_INTERVAL: this_5.lstTable1Data[j].START_INTERVAL, PACKAGE_COUNT: 0, USER_ID: UserName, TRANS_DATE: recvDate_2 });
                                        }
                                        this_5.lstDataForRecv[x].START_INTERVAL[i_4].push(dayWiseData[x][j].START_INTERVAL);
                                        this_5.lstDataForRecv[x].PACKAGE_COUNT[i_4].push(dayWiseData[x][j].PACKAGE_COUNT);
                                    };
                                    for (var j = 0; j <= this_5.lstTable1Data.length - 1; j++) {
                                        _loop_7(j);
                                    }
                                }
                                this_5.lstDataForRecv[x].ReceiveData[i_4] = [];
                                this_5.lstDataForRecv[x].ReceiveLables.push(this_5.lstDataForRecv[x].START_INTERVAL[0]);
                                this_5.lstDataForRecv[x].ReceiveData[i_4].push(this_5.lstDataForRecv[x].PACKAGE_COUNT[i_4]);
                            };
                            this_5 = this;
                            for (i_4 = 0; i_4 <= this.selectedDropDownUserId.length - 1; i_4++) {
                                _loop_5(i_4);
                            }
                        }
                        x += 1;
                        chartDate = new Date(chartDate.setDate(chartDate.getDate() + 1));
                    }
                    this.chartDataSetForRecvLine = [];
                    this.lableForReceive = [];
                    for (cnt = 0; cnt <= this.lstDataForRecv.length - 1; cnt++) {
                        list = [];
                        for (cntData = 0; cntData <= this.lstDataForRecv[cnt].ReceiveData.length - 1; cntData++) {
                            list.push(this.lstDataForRecv[cnt].ReceiveData[cntData][0]);
                        }
                        this.chartDataSetForRecvLine.push({ label: '', backgroundColor: '', borderColor: '#00FF00', data: list, fill: false });
                        this.lableForReceive.push(this.lstDataForRecv[cnt].ReceiveLables);
                    }
                    this.dataForRecv1 = [];
                    this.dataForRecv2 = [];
                    this.dataForRecv3 = [];
                    this.dataForRecv4 = [];
                    this.dataForRecv5 = [];
                    this.optionForRecv1 = {
                        scales: {
                            yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    stacked: true,
                                    gridLines: {
                                        display: true,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Packages'
                                    }
                                }],
                            xAxes: [{
                                    gridLines: {
                                        display: false,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Time'
                                    }
                                }]
                        },
                        title: {
                            display: true,
                            text: 'Dock Receiving By Employee - ' + this.dateString[0] + " Day"
                        }
                    };
                    this.optionForRecv2 = {
                        scales: {
                            yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    stacked: true,
                                    gridLines: {
                                        display: true,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Packages'
                                    }
                                }],
                            xAxes: [{
                                    gridLines: {
                                        display: false,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Time'
                                    }
                                }]
                        },
                        title: {
                            display: true,
                            text: 'Dock Receiving By Employee - ' + this.dateString[1] + " Day"
                        }
                    };
                    this.optionForRecv3 = {
                        scales: {
                            yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    stacked: true,
                                    gridLines: {
                                        display: true,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Packages'
                                    }
                                }],
                            xAxes: [{
                                    gridLines: {
                                        display: false,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Time'
                                    }
                                }]
                        },
                        title: {
                            display: true,
                            text: 'Dock Receiving By Employee - ' + this.dateString[2] + " Day"
                        }
                    };
                    this.optionForRecv4 = {
                        scales: {
                            yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    stacked: true,
                                    gridLines: {
                                        display: true,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Packages'
                                    }
                                }],
                            xAxes: [{
                                    gridLines: {
                                        display: false,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Time'
                                    }
                                }]
                        },
                        title: {
                            display: true,
                            text: 'Dock Receiving By Employee - ' + this.dateString[3] + " Day"
                        }
                    };
                    this.optionForRecv5 = {
                        scales: {
                            yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    stacked: true,
                                    gridLines: {
                                        display: true,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Packages'
                                    }
                                }],
                            xAxes: [{
                                    gridLines: {
                                        display: false,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Time'
                                    }
                                }]
                        },
                        title: {
                            display: true,
                            text: 'Dock Receiving By Employee - ' + this.dateString[4] + " Day"
                        }
                    };
                    this.chartDataSetForRecvGraph1 = [];
                    if (this.chartDataSetForRecvLine[0] != undefined) {
                        if (this.chartDataSetForRecvLine[0].data != undefined) {
                            this.blnGraph1 = true;
                            for (i in this.chartDataSetForRecvLine[0].data) {
                                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                    this.chartDataSetForRecvGraph1.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[0].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                                else {
                                    this.chartDataSetForRecvGraph1.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[0].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                            }
                        }
                    }
                    else {
                        this.blnGraph1 = false;
                    }
                    this.chartDataSetForRecvGraph2 = [];
                    if (this.chartDataSetForRecvLine[1] != undefined) {
                        if (this.chartDataSetForRecvLine[1].data != undefined) {
                            this.blnGraph2 = true;
                            for (i in this.chartDataSetForRecvLine[1].data) {
                                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                    this.chartDataSetForRecvGraph2.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[1].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                                else {
                                    this.chartDataSetForRecvGraph2.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[1].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                            }
                        }
                    }
                    else {
                        this.blnGraph2 = false;
                    }
                    this.chartDataSetForRecvGraph3 = [];
                    if (this.chartDataSetForRecvLine[2] != undefined) {
                        if (this.chartDataSetForRecvLine[2].data != undefined) {
                            this.blnGraph3 = true;
                            for (i in this.chartDataSetForRecvLine[2].data) {
                                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                    this.chartDataSetForRecvGraph3.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[2].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                                else {
                                    this.chartDataSetForRecvGraph3.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[2].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                            }
                        }
                    }
                    else {
                        this.blnGraph3 = false;
                    }
                    this.chartDataSetForRecvGraph4 = [];
                    if (this.chartDataSetForRecvLine[3] != undefined) {
                        if (this.chartDataSetForRecvLine[3].data != undefined) {
                            this.blnGraph4 = true;
                            for (i in this.chartDataSetForRecvLine[3].data) {
                                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                    this.chartDataSetForRecvGraph4.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[3].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                                else {
                                    this.chartDataSetForRecvGraph4.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[3].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                            }
                        }
                    }
                    else {
                        this.blnGraph4 = false;
                    }
                    this.chartDataSetForRecvGraph5 = [];
                    if (this.chartDataSetForRecvLine[4] != undefined) {
                        if (this.chartDataSetForRecvLine[4].data != undefined) {
                            this.blnGraph5 = true;
                            for (i in this.chartDataSetForRecvLine[4].data) {
                                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                    this.chartDataSetForRecvGraph5.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[4].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                                else {
                                    this.chartDataSetForRecvGraph5.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[4].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                            }
                        }
                    }
                    else {
                        this.blnGraph5 = false;
                    }
                    if (this.blnGraph1 == true) {
                        this.dataForRecv1 = {
                            labels: this.lableForReceive[0][0],
                            datasets: this.chartDataSetForRecvGraph1,
                            options: this.optionForRecv1
                        };
                    }
                    if (this.blnGraph2 == true) {
                        this.dataForRecv2 = {
                            labels: this.lableForReceive[1][0],
                            datasets: this.chartDataSetForRecvGraph2,
                            options: this.optionForRecv2
                        };
                    }
                    if (this.blnGraph3 == true) {
                        this.dataForRecv3 = {
                            labels: this.lableForReceive[2][0],
                            datasets: this.chartDataSetForRecvGraph3,
                            options: this.optionForRecv3
                        };
                    }
                    if (this.blnGraph4 == true) {
                        this.dataForRecv4 = {
                            labels: this.lableForReceive[3][0],
                            datasets: this.chartDataSetForRecvGraph4,
                            options: this.optionForRecv4
                        };
                    }
                    if (this.blnGraph5 == true) {
                        this.dataForRecv5 = {
                            labels: this.lableForReceive[4][0],
                            datasets: this.chartDataSetForRecvGraph5,
                            options: this.optionForRecv5
                        };
                    }
                    console.log(this.chartDataSetForRecvGraph4);
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "");
                }
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.PopulateGraphsForDeliver = function (TblIndex, data, pDay, ReportName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var frmDate, CurdateForRecvDelv, dtfromdate, chartDate, intPcnt, dayWiseData, count, x, _loop_8, this_6, i_5, _loop_9, this_7, i_6, cnt, list, cntData, i, i, i, i, i;
            return __generator(this, function (_a) {
                frmDate = this.fromDate;
                CurdateForRecvDelv = frmDate;
                dtfromdate = this.frmDate;
                chartDate = new Date(dtfromdate);
                intPcnt = 0;
                this.lstDataForDeliver = [];
                dayWiseData = [];
                count = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
                //let count = this.toDate.getDate() - this.fromDate.getDate();
                for (x = 0; x <= count;) {
                    if (this.lstDataForDeliver[x] == null) {
                        this.lstDataForDeliver[x] = [];
                        if (this.lstDataForDeliver[x].PACKAGE_COUNT == null) {
                            this.lstDataForDeliver[x].PACKAGE_COUNT = [];
                        }
                        this.lstDataForDeliver[x].START_INTERVAL = [];
                        this.lstDataForDeliver[x].ReceiveData = [];
                        this.lstDataForDeliver[x].ReceiveLables = [];
                    }
                    if (this.lstDataForDeliver[x].ReceiveData == null) {
                        this.lstDataForDeliver[x].ReceiveData = [];
                    }
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        _loop_8 = function (i_5) {
                            var UserName = this_6.UserId[i_5];
                            if (UserName !== "ALL") {
                                this_6.lstDataForDeliver[x].PACKAGE_COUNT[i_5] = [];
                                this_6.lstDataForDeliver[x].START_INTERVAL[i_5] = [];
                                dayWiseData[x] = [];
                                var table2Data = [];
                                table2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                                var recvDate_3 = this_6.convertDateFormate(chartDate);
                                var _loop_10 = function (j) {
                                    var filteredList = linq_es5_1.asEnumerable(table2Data).Where(function (x) { return x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == recvDate_3 && x.START_INTERVAL == _this.lstTable2Data[j].START_INTERVAL; }).ToArray();
                                    if (filteredList.length > 0) {
                                        dayWiseData[x].push({ START_INTERVAL: filteredList[0].START_INTERVAL, PACKAGE_COUNT: filteredList[0].PACKAGE_COUNT, USER_ID: UserName, TRANS_DATE: filteredList[0].TRANS_DATE });
                                    }
                                    else {
                                        dayWiseData[x].push({ START_INTERVAL: this_6.lstTable2Data[j].START_INTERVAL, PACKAGE_COUNT: 0, USER_ID: UserName, TRANS_DATE: recvDate_3 });
                                    }
                                    this_6.lstDataForDeliver[x].START_INTERVAL[i_5].push(dayWiseData[x][j].START_INTERVAL);
                                    this_6.lstDataForDeliver[x].PACKAGE_COUNT[i_5].push(dayWiseData[x][j].PACKAGE_COUNT);
                                };
                                //let filteredList = asEnumerable(table2Data).Where(x => x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == recvDate).ToArray();
                                for (var j = 0; j <= this_6.lstTable2Data.length - 1; j++) {
                                    _loop_10(j);
                                }
                            }
                            this_6.lstDataForDeliver[x].ReceiveData[i_5] = [];
                            this_6.lstDataForDeliver[x].ReceiveLables.push(this_6.lstDataForDeliver[x].START_INTERVAL[0]);
                            this_6.lstDataForDeliver[x].ReceiveData[i_5].push(this_6.lstDataForDeliver[x].PACKAGE_COUNT[i_5]);
                        };
                        this_6 = this;
                        for (i_5 = 0; i_5 <= this.UserId.length - 1; i_5++) {
                            _loop_8(i_5);
                        }
                    }
                    else {
                        _loop_9 = function (i_6) {
                            console.log(this_7.selectedDropDownUserId);
                            var UserName = this_7.selectedDropDownUserId[i_6];
                            if (UserName !== "ALL") {
                                this_7.lstDataForDeliver[x].PACKAGE_COUNT[i_6] = [];
                                this_7.lstDataForDeliver[x].START_INTERVAL[i_6] = [];
                                dayWiseData[x] = [];
                                var table2Data = [];
                                table2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                                var recvDate_4 = this_7.convertDateFormate(chartDate);
                                var _loop_11 = function (j) {
                                    var filteredList = linq_es5_1.asEnumerable(table2Data).Where(function (x) { return x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == recvDate_4 && x.START_INTERVAL == _this.lstTable2Data[j].START_INTERVAL; }).ToArray();
                                    if (filteredList.length > 0) {
                                        dayWiseData[x].push({ START_INTERVAL: filteredList[0].START_INTERVAL, PACKAGE_COUNT: filteredList[0].PACKAGE_COUNT, USER_ID: UserName, TRANS_DATE: filteredList[0].TRANS_DATE });
                                    }
                                    else {
                                        dayWiseData[x].push({ START_INTERVAL: this_7.lstTable2Data[j].START_INTERVAL, PACKAGE_COUNT: 0, USER_ID: UserName, TRANS_DATE: recvDate_4 });
                                    }
                                    this_7.lstDataForDeliver[x].START_INTERVAL[i_6].push(dayWiseData[x][j].START_INTERVAL);
                                    this_7.lstDataForDeliver[x].PACKAGE_COUNT[i_6].push(dayWiseData[x][j].PACKAGE_COUNT);
                                };
                                //let filteredList = asEnumerable(table2Data).Where(x => x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == recvDate).ToArray();
                                for (var j = 0; j <= this_7.lstTable2Data.length - 1; j++) {
                                    _loop_11(j);
                                }
                            }
                            this_7.lstDataForDeliver[x].ReceiveData[i_6] = [];
                            this_7.lstDataForDeliver[x].ReceiveLables.push(this_7.lstDataForDeliver[x].START_INTERVAL[0]);
                            this_7.lstDataForDeliver[x].ReceiveData[i_6].push(this_7.lstDataForDeliver[x].PACKAGE_COUNT[i_6]);
                        };
                        this_7 = this;
                        for (i_6 = 0; i_6 <= this.selectedDropDownUserId.length - 1; i_6++) {
                            _loop_9(i_6);
                        }
                    }
                    chartDate = new Date(chartDate.setDate(chartDate.getDate() + 1));
                    x += 1;
                }
                this.chartDataSetForDelverLine = [];
                this.lableForDeliver = [];
                for (cnt = 0; cnt <= this.lstDataForDeliver.length - 1; cnt++) {
                    list = [];
                    for (cntData = 0; cntData <= this.lstDataForDeliver[cnt].ReceiveData.length - 1; cntData++) {
                        list.push(this.lstDataForDeliver[cnt].ReceiveData[cntData][0]);
                    }
                    this.chartDataSetForDelverLine.push({ label: '', backgroundColor: '', borderColor: '#00FF00', data: list, fill: false });
                    this.lableForDeliver.push(this.lstDataForDeliver[cnt].ReceiveLables);
                }
                this.dataForDelv1 = [];
                this.dataForDelv2 = [];
                this.dataForDelv3 = [];
                this.dataForDelv4 = [];
                this.dataForDelv5 = [];
                this.optionForDeliver1 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Deliver By Employee - " + this.dateString[0] + " Day"
                    }
                };
                this.optionForDeliver2 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Deliver By Employee - " + this.dateString[1] + " Day"
                    }
                };
                this.optionForDeliver3 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Deliver By Employee - " + this.dateString[2] + " Day"
                    }
                };
                this.optionForDeliver4 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Deliver By Employee - " + this.dateString[3] + " Day"
                    }
                };
                this.optionForDeliver5 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Deliver By Employee - " + this.dateString[4] + " Day"
                    }
                };
                this.chartDataSetForDeliverGraph1 = [];
                if (this.chartDataSetForDelverLine[0] != undefined) {
                    if (this.chartDataSetForDelverLine[0].data != undefined) {
                        for (i in this.chartDataSetForDelverLine[0].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDeliverGraph1.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[0].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDeliverGraph1.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[0].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                this.chartDataSetForDeliverGraph2 = [];
                if (this.chartDataSetForDelverLine[1] != undefined) {
                    if (this.chartDataSetForDelverLine[1].data != undefined) {
                        for (i in this.chartDataSetForDelverLine[1].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDeliverGraph2.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[1].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDeliverGraph2.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[1].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                this.chartDataSetForDeliverGraph3 = [];
                if (this.chartDataSetForDelverLine[2] != undefined) {
                    if (this.chartDataSetForDelverLine[2].data != undefined) {
                        for (i in this.chartDataSetForDelverLine[2].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDeliverGraph3.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[2].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDeliverGraph3.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[2].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                this.chartDataSetForDeliverGraph4 = [];
                if (this.chartDataSetForDelverLine[3] != undefined) {
                    if (this.chartDataSetForDelverLine[3].data != undefined) {
                        for (i in this.chartDataSetForDelverLine[3].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDeliverGraph4.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[3].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDeliverGraph4.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[3].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                this.chartDataSetForDeliverGraph5 = [];
                if (this.chartDataSetForDelverLine[4] != undefined) {
                    if (this.chartDataSetForDelverLine[4].data != undefined) {
                        for (i in this.chartDataSetForDelverLine[4].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDeliverGraph5.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[4].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDeliverGraph5.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[4].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                if (this.blnGraph1 == true) {
                    this.dataForDelv1 = {
                        labels: this.lableForDeliver[0][0],
                        datasets: this.chartDataSetForDeliverGraph1,
                        options: this.optionForRecv1
                    };
                }
                if (this.blnGraph2 == true) {
                    this.dataForDelv2 = {
                        labels: this.lableForDeliver[1][0],
                        datasets: this.chartDataSetForDeliverGraph2,
                        options: this.optionForRecv2
                    };
                }
                if (this.blnGraph3 == true) {
                    this.dataForDelv3 = {
                        labels: this.lableForDeliver[2][0],
                        datasets: this.chartDataSetForDeliverGraph3,
                        options: this.optionForRecv3
                    };
                }
                if (this.blnGraph4 == true) {
                    this.dataForDelv4 = {
                        labels: this.lableForDeliver[3][0],
                        datasets: this.chartDataSetForDeliverGraph4,
                        options: this.optionForRecv4
                    };
                }
                if (this.blnGraph5 == true) {
                    this.dataForDelv5 = {
                        labels: this.lableForDeliver[4][0],
                        datasets: this.chartDataSetForDeliverGraph5,
                        options: this.optionForRecv5
                    };
                }
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.PopulateDockGraph = function (data, day) {
        return __awaiter(this, void 0, void 0, function () {
            var lstItem, frmDate, Curdate, dtfromdate, chartDate, dayWiseData, dataForDockSummChart, count, x, _loop_12, this_8, rows, rows1, value, value1, sum, i_7, _loop_13, this_9, rows, rows1, value, value1, sum, i_8, cnt, list, cntData, i, i, i, i, i;
            return __generator(this, function (_a) {
                frmDate = this.fromDate;
                Curdate = frmDate;
                dtfromdate = this.frmDate;
                chartDate = new Date(dtfromdate);
                this.lstDataForDock = [];
                dayWiseData = [];
                dataForDockSummChart = [];
                count = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
                //let count = this.toDate.getDate() - this.fromDate.getDate();
                for (x = 0; x <= count;) {
                    if (this.lstDataForDock[x] == null) {
                        this.lstDataForDock[x] = [];
                        if (this.lstDataForDock[x].PACKAGE_COUNT == null) {
                            this.lstDataForDock[x].PACKAGE_COUNT = [];
                        }
                        this.lstDataForDock[x].START_INTERVAL = [];
                        this.lstDataForDock[x].DockData = [];
                        this.lstDataForDock[x].DockLables = [];
                    }
                    if (this.lstDataForDock[x].DockData == null) {
                        this.lstDataForDock[x].DockData = [];
                    }
                    if (this.lstDataForDock[x].START_INTERVAL == null) {
                        this.lstDataForDock[x].START_INTERVAL = [];
                    }
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        _loop_12 = function (i_7) {
                            var UserName = this_8.UserId[i_7];
                            var startIntervalTotalSum = 0;
                            var packageCountTotalSum = 0;
                            var PackageCountReceive = 0;
                            var PackageCountDeliver = 0;
                            var j = 0;
                            if (UserName !== "ALL") {
                                this_8.lstDataForDock[x].PACKAGE_COUNT[i_7] = [];
                                this_8.lstDataForDock[x].START_INTERVAL[i_7] = [];
                                dayWiseData[x] = [];
                                var table1Data = [];
                                table1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                                var table2Data = [];
                                table2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                                var recvDate_5 = this_8.convertDateFormate(chartDate);
                                console.log(this_8.lstTable1Data);
                                console.log(this_8.lstTable2Data);
                                var distinctUsersArray_1 = [];
                                distinctUsersArray_1 = linq_es5_1.asEnumerable(table1Data).GroupBy(function (x) { return x.START_INTERVAL; }).Distinct().ToArray();
                                console.log(distinctUsersArray_1);
                                var _loop_14 = function (j_1) {
                                    console.log(distinctUsersArray_1[j_1]["key"]);
                                    rows = linq_es5_1.asEnumerable(table1Data).Where(function (x) { return x.START_INTERVAL == distinctUsersArray_1[j_1]["key"] && x.UserId == UserName && x.TRANS_DATE == recvDate_5; }).ToArray();
                                    rows1 = linq_es5_1.asEnumerable(table2Data).Where(function (x) { return x.START_INTERVAL == distinctUsersArray_1[j_1]["key"] && x.UserId == UserName && x.TRANS_DATE == recvDate_5; }).ToArray();
                                    value = "";
                                    value1 = "";
                                    if (rows.length > 0) {
                                        value = rows[0].PACKAGE_COUNT;
                                    }
                                    else {
                                        value = "0";
                                    }
                                    if (rows1.length > 0) {
                                        value1 = rows1[0].PACKAGE_COUNT;
                                    }
                                    else {
                                        value1 = "0";
                                    }
                                    sum = parseInt(value) + parseInt(value1);
                                    dayWiseData[x].push({ START_INTERVAL: distinctUsersArray_1[j_1]["key"], PACKAGE_COUNT: sum, USER_ID: UserName, TRANS_DATE: data.DataDictionary["pDsProductivityRep"]["Table1"][j_1].TRANS_DATE });
                                    dataForDockSummChart.push({ START_INTERVAL: distinctUsersArray_1[j_1]["key"], PACKAGE_COUNT: sum, USER_ID: UserName, TRANS_DATE: data.DataDictionary["pDsProductivityRep"]["Table1"][j_1].TRANS_DATE });
                                    this_8.lstDataForDock[x].START_INTERVAL[i_7].push(dayWiseData[x][j_1].START_INTERVAL);
                                    this_8.lstDataForDock[x].PACKAGE_COUNT[i_7].push(dayWiseData[x][j_1].PACKAGE_COUNT);
                                };
                                for (var j_1 = 0; j_1 <= distinctUsersArray_1.length - 1; j_1++) {
                                    _loop_14(j_1);
                                }
                            }
                            this_8.lstDataForDock[x].DockData[i_7] = [];
                            this_8.lstDataForDock[x].DockLables.push(this_8.lstDataForDock[x].START_INTERVAL[0]);
                            this_8.lstDataForDock[x].DockData[i_7].push(this_8.lstDataForDock[x].PACKAGE_COUNT[i_7]);
                        };
                        this_8 = this;
                        for (i_7 = 0; i_7 <= this.UserId.length - 1; i_7++) {
                            _loop_12(i_7);
                        }
                    }
                    else {
                        _loop_13 = function (i_8) {
                            var UserName = this_9.selectedDropDownUserId[i_8];
                            var startIntervalTotalSum = 0;
                            var packageCountTotalSum = 0;
                            var PackageCountReceive = 0;
                            var PackageCountDeliver = 0;
                            var j = 0;
                            if (UserName !== "ALL") {
                                this_9.lstDataForDock[x].PACKAGE_COUNT[i_8] = [];
                                this_9.lstDataForDock[x].START_INTERVAL[i_8] = [];
                                dayWiseData[x] = [];
                                var table1Data = [];
                                table1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                                var table2Data = [];
                                table2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                                var recvDate_6 = this_9.convertDateFormate(chartDate);
                                var distinctUsersArray_2 = [];
                                distinctUsersArray_2 = linq_es5_1.asEnumerable(table1Data).GroupBy(function (x) { return x.START_INTERVAL; }).Distinct().ToArray();
                                var _loop_15 = function (j_2) {
                                    rows = linq_es5_1.asEnumerable(table1Data).Where(function (x) { return x.START_INTERVAL == distinctUsersArray_2[j_2]["key"] && x.UserId == UserName && x.TRANS_DATE == recvDate_6; }).ToArray();
                                    rows1 = linq_es5_1.asEnumerable(table2Data).Where(function (x) { return x.START_INTERVAL == distinctUsersArray_2[j_2]["key"] && x.UserId == UserName && x.TRANS_DATE == recvDate_6; }).ToArray();
                                    value = "";
                                    value1 = "";
                                    if (rows.length > 0) {
                                        value = rows[0].PACKAGE_COUNT;
                                    }
                                    else {
                                        value = "0";
                                    }
                                    if (rows1.length > 0) {
                                        value1 = rows1[0].PACKAGE_COUNT;
                                    }
                                    else {
                                        value1 = "0";
                                    }
                                    sum = parseInt(value) + parseInt(value1);
                                    dayWiseData[x].push({ START_INTERVAL: distinctUsersArray_2[j_2]["key"], PACKAGE_COUNT: sum, USER_ID: UserName, TRANS_DATE: data.DataDictionary["pDsProductivityRep"]["Table1"][j_2].TRANS_DATE });
                                    dataForDockSummChart.push({ START_INTERVAL: distinctUsersArray_2[j_2]["key"], PACKAGE_COUNT: sum, USER_ID: UserName, TRANS_DATE: data.DataDictionary["pDsProductivityRep"]["Table1"][j_2].TRANS_DATE });
                                    this_9.lstDataForDock[x].START_INTERVAL[i_8].push(dayWiseData[x][j_2].START_INTERVAL);
                                    this_9.lstDataForDock[x].PACKAGE_COUNT[i_8].push(dayWiseData[x][j_2].PACKAGE_COUNT);
                                };
                                for (var j_2 = 0; j_2 <= distinctUsersArray_2.length - 1; j_2++) {
                                    _loop_15(j_2);
                                }
                            }
                            this_9.lstDataForDock[x].DockData[i_8] = [];
                            this_9.lstDataForDock[x].DockLables.push(this_9.lstDataForDock[x].START_INTERVAL[0]);
                            this_9.lstDataForDock[x].DockData[i_8].push(this_9.lstDataForDock[x].PACKAGE_COUNT[i_8]);
                        };
                        this_9 = this;
                        for (i_8 = 0; i_8 <= this.selectedDropDownUserId.length - 1; i_8++) {
                            _loop_13(i_8);
                        }
                    }
                    chartDate = new Date(chartDate.setDate(chartDate.getDate() + 1));
                    x += 1;
                }
                console.log(dataForDockSummChart);
                this.chartDataSetForDock = [];
                this.labelForDock = [];
                for (cnt = 0; cnt <= this.lstDataForDock.length - 1; cnt++) {
                    list = [];
                    for (cntData = 0; cntData <= this.lstDataForDock[cnt].DockData.length - 1; cntData++) {
                        list.push(this.lstDataForDock[cnt].DockData[cntData][0]);
                    }
                    this.chartDataSetForDock.push({ label: '', backgroundColor: '', borderColor: '#00FF00', data: list, fill: false });
                    this.labelForDock.push(this.lstDataForDock[cnt].DockLables);
                }
                this.dataForDock1 = [];
                this.dataForDock2 = [];
                this.dataForDock3 = [];
                this.dataForDock4 = [];
                this.dataForDock5 = [];
                this.optionForDock1 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Performance By Employee - " + this.dateString[0] + " Day"
                    }
                };
                this.optionForDock2 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Performance By Employee - " + this.dateString[1] + " Day"
                    }
                };
                this.optionForDock3 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Performance By Employee - " + this.dateString[2] + " Day"
                    }
                };
                this.optionForDock4 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Performance By Employee - " + this.dateString[3] + " Day"
                    }
                };
                this.optionForDock5 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Performance By Employee - " + this.dateString[4] + " Day"
                    }
                };
                this.chartDataSetForDockGraph1 = [];
                if (this.chartDataSetForDock[0] != undefined) {
                    if (this.chartDataSetForDock[0].data != undefined) {
                        for (i in this.chartDataSetForDock[0].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDockGraph1.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[0].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDockGraph1.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[0].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                this.chartDataSetForDockGraph2 = [];
                if (this.chartDataSetForDock[1] != undefined) {
                    if (this.chartDataSetForDock[1].data != undefined) {
                        for (i in this.chartDataSetForDock[1].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDockGraph2.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[1].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDockGraph2.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[1].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                this.chartDataSetForDockGraph3 = [];
                if (this.chartDataSetForDock[2] != undefined) {
                    if (this.chartDataSetForDock[2].data != undefined) {
                        for (i in this.chartDataSetForDock[2].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDockGraph3.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[2].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDockGraph3.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[2].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                this.chartDataSetForDockGraph4 = [];
                if (this.chartDataSetForDock[3] != undefined) {
                    if (this.chartDataSetForDock[3].data != undefined) {
                        for (i in this.chartDataSetForDock[3].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDockGraph4.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[3].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDockGraph4.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[3].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                this.chartDataSetForDockGraph5 = [];
                if (this.chartDataSetForDock[4] != undefined) {
                    if (this.chartDataSetForDock[4].data != undefined) {
                        for (i in this.chartDataSetForDock[4].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDockGraph5.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[4].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDockGraph5.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[4].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                if (this.blnGraph1 == true) {
                    this.dataForDock1 = {
                        labels: this.labelForDock[0][0],
                        datasets: this.chartDataSetForDockGraph1,
                        options: this.optionForDock1
                    };
                }
                if (this.blnGraph2 == true) {
                    this.dataForDock2 = {
                        labels: this.labelForDock[1][0],
                        datasets: this.chartDataSetForDockGraph2,
                        options: this.optionForDock2
                    };
                }
                if (this.blnGraph3 == true) {
                    this.dataForDock3 = {
                        labels: this.labelForDock[2][0],
                        datasets: this.chartDataSetForDockGraph3,
                        options: this.optionForDock3
                    };
                }
                if (this.blnGraph4 == true) {
                    this.dataForDock4 = {
                        labels: this.labelForDock[3][0],
                        datasets: this.chartDataSetForDockGraph4,
                        options: this.optionForDock4
                    };
                }
                if (this.blnGraph5 == true) {
                    this.dataForDock5 = {
                        labels: this.labelForDock[4][0],
                        datasets: this.chartDataSetForDockGraph5,
                        options: this.optionForDock5
                    };
                }
                this.BindSummaryChartsDock(dataForDockSummChart);
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    ProductivityReportComponent.prototype.BindSummaryChartsRecv = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var lstItem, frmDate, Curdate, _loop_16, this_10, rows, value, i, _loop_17, this_11, rows, value, i, cnt;
            return __generator(this, function (_a) {
                frmDate = this.fromDate;
                Curdate = frmDate;
                this.lstDataForSummaryRecv = [];
                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    _loop_16 = function (i) {
                        if (this_10.lstDataForSummaryRecv[i] == null) {
                            this_10.lstDataForSummaryRecv[i] = [];
                            if (this_10.lstDataForSummaryRecv[i].PACKAGE_COUNT == null) {
                                this_10.lstDataForSummaryRecv[i].PACKAGE_COUNT = [];
                            }
                            this_10.lstDataForSummaryRecv[i].START_INTERVAL = [];
                            this_10.lstDataForSummaryRecv[i].DataSummaryRecv = [];
                            this_10.lstDataForSummaryRecv[i].LabelSummaryRecv = [];
                            this_10.lstDataForSummaryRecv[i].UserId = [];
                        }
                        if (this_10.lstDataForSummaryRecv[i].DataSummaryRecv == null) {
                            this_10.lstDataForSummaryRecv[i].DataSummaryRecv = [];
                        }
                        if (this_10.lstDataForSummaryRecv[i].START_INTERVAL == null) {
                            this_10.lstDataForSummaryRecv[i].START_INTERVAL = [];
                        }
                        if (this_10.lstDataForSummaryRecv[i].UserId == null) {
                            this_10.lstDataForSummaryRecv[i].UserId = [];
                        }
                        var UserName = this_10.UserId[i];
                        var startIntervalTotalSum = 0;
                        var packageCountTotalSum = 0;
                        var PackageCountReceive = 0;
                        var PackageCountDeliver = 0;
                        if (UserName !== "ALL") {
                            var _loop_18 = function (j) {
                                var table1Data = [];
                                table1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                                rows = linq_es5_1.asEnumerable(table1Data).Where(function (x) { return x.START_INTERVAL == data.DataDictionary["pDsProductivityRep"]["Table1"][j].START_INTERVAL && x.UserId == UserName; }).ToArray();
                                value = "";
                                if (rows.length > 0) {
                                    value = rows[0].PACKAGE_COUNT.toString();
                                }
                                else {
                                    value = "0";
                                }
                                this_10.lstDataForSummaryRecv[i].START_INTERVAL.push(data.DataDictionary["pDsProductivityRep"]["Table1"][j].START_INTERVAL);
                                this_10.lstDataForSummaryRecv[i].PACKAGE_COUNT.push(value);
                                this_10.lstDataForSummaryRecv[i].UserId.push(UserName);
                            };
                            for (var j = 0; j <= data.DataDictionary["pDsProductivityRep"]["Table1"].length - 1; j++) {
                                _loop_18(j);
                            }
                        }
                        this_10.lstDataForSummaryRecv[i].DataSummaryRecv.push(this_10.lstDataForSummaryRecv[i].PACKAGE_COUNT);
                        this_10.lstDataForSummaryRecv[i].LabelSummaryRecv.push(this_10.lstDataForSummaryRecv[i].START_INTERVAL);
                    };
                    this_10 = this;
                    for (i = 0; i <= this.UserId.length - 1; i++) {
                        _loop_16(i);
                    }
                }
                else {
                    _loop_17 = function (i) {
                        if (this_11.lstDataForSummaryRecv[i] == null) {
                            this_11.lstDataForSummaryRecv[i] = [];
                            if (this_11.lstDataForSummaryRecv[i].PACKAGE_COUNT == null) {
                                this_11.lstDataForSummaryRecv[i].PACKAGE_COUNT = [];
                            }
                            this_11.lstDataForSummaryRecv[i].START_INTERVAL = [];
                            this_11.lstDataForSummaryRecv[i].DataSummaryRecv = [];
                            this_11.lstDataForSummaryRecv[i].LabelSummaryRecv = [];
                            this_11.lstDataForSummaryRecv[i].UserId = [];
                        }
                        if (this_11.lstDataForSummaryRecv[i].DataSummaryRecv == null) {
                            this_11.lstDataForSummaryRecv[i].DataSummaryRecv = [];
                        }
                        if (this_11.lstDataForSummaryRecv[i].START_INTERVAL == null) {
                            this_11.lstDataForSummaryRecv[i].START_INTERVAL = [];
                        }
                        if (this_11.lstDataForSummaryRecv[i].UserId == null) {
                            this_11.lstDataForSummaryRecv[i].UserId = [];
                        }
                        var UserName = this_11.selectedDropDownUserId[i];
                        var startIntervalTotalSum = 0;
                        var packageCountTotalSum = 0;
                        var PackageCountReceive = 0;
                        var PackageCountDeliver = 0;
                        if (UserName !== "ALL") {
                            var _loop_19 = function (j) {
                                var table1Data = [];
                                table1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                                rows = linq_es5_1.asEnumerable(table1Data).Where(function (x) { return x.START_INTERVAL == data.DataDictionary["pDsProductivityRep"]["Table1"][j].START_INTERVAL && x.UserId == UserName; }).ToArray();
                                value = "";
                                if (rows.length > 0) {
                                    value = rows[0].PACKAGE_COUNT.toString();
                                }
                                else {
                                    value = "0";
                                }
                                this_11.lstDataForSummaryRecv[i].START_INTERVAL.push(data.DataDictionary["pDsProductivityRep"]["Table1"][j].START_INTERVAL);
                                this_11.lstDataForSummaryRecv[i].PACKAGE_COUNT.push(value);
                                this_11.lstDataForSummaryRecv[i].UserId.push(UserName);
                            };
                            for (var j = 0; j <= data.DataDictionary["pDsProductivityRep"]["Table1"].length - 1; j++) {
                                _loop_19(j);
                            }
                        }
                        this_11.lstDataForSummaryRecv[i].DataSummaryRecv.push(this_11.lstDataForSummaryRecv[i].PACKAGE_COUNT);
                        this_11.lstDataForSummaryRecv[i].LabelSummaryRecv.push(this_11.lstDataForSummaryRecv[i].START_INTERVAL);
                    };
                    this_11 = this;
                    for (i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {
                        _loop_17(i);
                    }
                }
                this.chartDataSetForSummaryRecv = [];
                this.labelForSummaryRecv = [];
                for (cnt = 0; cnt <= this.lstDataForSummaryRecv.length - 1; cnt++) {
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        this.chartDataSetForSummaryRecv.push({ label: this.UserId[cnt], backgroundColor: '#FFFFFF', borderColor: this.randomColors[cnt], data: this.lstDataForSummaryRecv[cnt].DataSummaryRecv[0], fill: false });
                        this.labelForSummaryRecv.push(this.lstDataForSummaryRecv[cnt].LabelSummaryRecv);
                    }
                    else {
                        this.chartDataSetForSummaryRecv.push({ label: this.selectedDropDownUserId[cnt], backgroundColor: '#FFFFFF', borderColor: this.randomColors[cnt], data: this.lstDataForSummaryRecv[cnt].DataSummaryRecv[0], fill: false });
                        this.labelForSummaryRecv.push(this.lstDataForSummaryRecv[cnt].LabelSummaryRecv);
                    }
                }
                this.optionForSummaryRecv = {
                    scales: {
                        yAxes: [{
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Receiving By Employee - Summary"
                    }
                };
                this.dataForSummaryRecv = {
                    labels: this.labelForSummaryRecv[0][0],
                    datasets: this.chartDataSetForSummaryRecv,
                    options: this.optionForSummaryRecv
                };
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.BindSummaryChartsDeliver = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var lstItem, frmDate, Curdate, _loop_20, this_12, rows, value, i, _loop_21, this_13, rows, value, i, cnt;
            return __generator(this, function (_a) {
                frmDate = this.fromDate;
                Curdate = frmDate;
                this.lstDataForSummaryDeliver = [];
                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    _loop_20 = function (i) {
                        if (this_12.lstDataForSummaryDeliver[i] == null) {
                            this_12.lstDataForSummaryDeliver[i] = [];
                            if (this_12.lstDataForSummaryDeliver[i].PACKAGE_COUNT == null) {
                                this_12.lstDataForSummaryDeliver[i].PACKAGE_COUNT = [];
                            }
                            this_12.lstDataForSummaryDeliver[i].START_INTERVAL = [];
                            this_12.lstDataForSummaryDeliver[i].DataSummaryRecv = [];
                            this_12.lstDataForSummaryDeliver[i].LabelSummaryRecv = [];
                            this_12.lstDataForSummaryDeliver[i].UserId = [];
                        }
                        if (this_12.lstDataForSummaryDeliver[i].DataSummaryRecv == null) {
                            this_12.lstDataForSummaryDeliver[i].DataSummaryRecv = [];
                        }
                        if (this_12.lstDataForSummaryDeliver[i].START_INTERVAL == null) {
                            this_12.lstDataForSummaryDeliver[i].START_INTERVAL = [];
                        }
                        if (this_12.lstDataForSummaryDeliver[i].UserId == null) {
                            this_12.lstDataForSummaryDeliver[i].UserId = [];
                        }
                        var UserName = this_12.UserId[i];
                        var startIntervalTotalSum = 0;
                        var packageCountTotalSum = 0;
                        var PackageCountReceive = 0;
                        var PackageCountDeliver = 0;
                        if (UserName !== "ALL") {
                            var _loop_22 = function (j) {
                                var table2Data = [];
                                table2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                                rows = linq_es5_1.asEnumerable(table2Data).Where(function (x) { return x.START_INTERVAL == data.DataDictionary["pDsProductivityRep"]["Table1"][j].START_INTERVAL && x.UserId == UserName; }).ToArray();
                                value = "";
                                if (rows.length > 0) {
                                    value = rows[0].PACKAGE_COUNT.toString();
                                }
                                else {
                                    value = "0";
                                }
                                this_12.lstDataForSummaryDeliver[i].START_INTERVAL.push(data.DataDictionary["pDsProductivityRep"]["Table2"][j].START_INTERVAL);
                                this_12.lstDataForSummaryDeliver[i].PACKAGE_COUNT.push(value);
                                this_12.lstDataForSummaryDeliver[i].UserId.push(UserName);
                            };
                            for (var j = 0; j <= data.DataDictionary["pDsProductivityRep"]["Table2"].length - 1; j++) {
                                _loop_22(j);
                            }
                        }
                        this_12.lstDataForSummaryDeliver[i].DataSummaryRecv.push(this_12.lstDataForSummaryDeliver[i].PACKAGE_COUNT);
                        this_12.lstDataForSummaryDeliver[i].LabelSummaryRecv.push(this_12.lstDataForSummaryDeliver[i].START_INTERVAL);
                    };
                    this_12 = this;
                    for (i = 0; i <= this.UserId.length - 1; i++) {
                        _loop_20(i);
                    }
                }
                else {
                    _loop_21 = function (i) {
                        if (this_13.lstDataForSummaryDeliver[i] == null) {
                            this_13.lstDataForSummaryDeliver[i] = [];
                            if (this_13.lstDataForSummaryDeliver[i].PACKAGE_COUNT == null) {
                                this_13.lstDataForSummaryDeliver[i].PACKAGE_COUNT = [];
                            }
                            this_13.lstDataForSummaryDeliver[i].START_INTERVAL = [];
                            this_13.lstDataForSummaryDeliver[i].DataSummaryRecv = [];
                            this_13.lstDataForSummaryDeliver[i].LabelSummaryRecv = [];
                            this_13.lstDataForSummaryDeliver[i].UserId = [];
                        }
                        if (this_13.lstDataForSummaryDeliver[i].DataSummaryRecv == null) {
                            this_13.lstDataForSummaryDeliver[i].DataSummaryRecv = [];
                        }
                        if (this_13.lstDataForSummaryDeliver[i].START_INTERVAL == null) {
                            this_13.lstDataForSummaryDeliver[i].START_INTERVAL = [];
                        }
                        if (this_13.lstDataForSummaryDeliver[i].UserId == null) {
                            this_13.lstDataForSummaryDeliver[i].UserId = [];
                        }
                        var UserName = this_13.selectedDropDownUserId[i];
                        var startIntervalTotalSum = 0;
                        var packageCountTotalSum = 0;
                        var PackageCountReceive = 0;
                        var PackageCountDeliver = 0;
                        if (UserName !== "ALL") {
                            var _loop_23 = function (j) {
                                var table2Data = [];
                                table2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                                rows = linq_es5_1.asEnumerable(table2Data).Where(function (x) { return x.START_INTERVAL == data.DataDictionary["pDsProductivityRep"]["Table1"][j].START_INTERVAL && x.UserId == UserName; }).ToArray();
                                value = "";
                                if (rows.length > 0) {
                                    value = rows[0].PACKAGE_COUNT.toString();
                                }
                                else {
                                    value = "0";
                                }
                                this_13.lstDataForSummaryDeliver[i].START_INTERVAL.push(data.DataDictionary["pDsProductivityRep"]["Table2"][j].START_INTERVAL);
                                this_13.lstDataForSummaryDeliver[i].PACKAGE_COUNT.push(value);
                                this_13.lstDataForSummaryDeliver[i].UserId.push(UserName);
                            };
                            for (var j = 0; j <= data.DataDictionary["pDsProductivityRep"]["Table2"].length - 1; j++) {
                                _loop_23(j);
                            }
                        }
                        this_13.lstDataForSummaryDeliver[i].DataSummaryRecv.push(this_13.lstDataForSummaryDeliver[i].PACKAGE_COUNT);
                        this_13.lstDataForSummaryDeliver[i].LabelSummaryRecv.push(this_13.lstDataForSummaryDeliver[i].START_INTERVAL);
                    };
                    this_13 = this;
                    for (i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {
                        _loop_21(i);
                    }
                }
                this.chartDataSetForSummaryDeliver = [];
                this.labelForSummaryDeliver = [];
                for (cnt = 0; cnt <= this.lstDataForSummaryDeliver.length - 1; cnt++) {
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        this.chartDataSetForSummaryDeliver.push({ label: this.UserId[cnt], backgroundColor: '#FFFFFF', borderColor: this.randomColors[cnt], data: this.lstDataForSummaryDeliver[cnt].DataSummaryRecv[0], fill: false });
                        this.labelForSummaryDeliver.push(this.lstDataForSummaryDeliver[cnt].LabelSummaryRecv);
                    }
                    else {
                        this.chartDataSetForSummaryDeliver.push({ label: this.selectedDropDownUserId[cnt], backgroundColor: '#FFFFFF', borderColor: this.randomColors[cnt], data: this.lstDataForSummaryDeliver[cnt].DataSummaryRecv[0], fill: false });
                        this.labelForSummaryDeliver.push(this.lstDataForSummaryDeliver[cnt].LabelSummaryRecv);
                    }
                }
                this.optionForSummaryDeliver = {
                    scales: {
                        yAxes: [{
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Deliver By Employee - Summary"
                    }
                };
                this.dataForSummaryDeliver = {
                    labels: this.labelForSummaryDeliver[0][0],
                    datasets: this.chartDataSetForSummaryDeliver,
                    options: this.optionForSummaryDeliver
                };
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.BindSummaryChartsDock = function (DockSummaryChartData) {
        return __awaiter(this, void 0, void 0, function () {
            var frmDate, Curdate, _loop_24, this_14, rows, value, i, _loop_25, this_15, rows, value, i, cnt;
            return __generator(this, function (_a) {
                frmDate = this.fromDate;
                Curdate = frmDate;
                this.lstDataForSummaryDock = [];
                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    _loop_24 = function (i) {
                        if (this_14.lstDataForSummaryDock[i] == null) {
                            this_14.lstDataForSummaryDock[i] = [];
                            if (this_14.lstDataForSummaryDock[i].PACKAGE_COUNT == null) {
                                this_14.lstDataForSummaryDock[i].PACKAGE_COUNT = [];
                            }
                            this_14.lstDataForSummaryDock[i].START_INTERVAL = [];
                            this_14.lstDataForSummaryDock[i].DataSummaryDock = [];
                            this_14.lstDataForSummaryDock[i].LabelSummaryDock = [];
                            this_14.lstDataForSummaryDock[i].UserId = [];
                        }
                        if (this_14.lstDataForSummaryDock[i].DataSummaryDock == null) {
                            this_14.lstDataForSummaryDock[i].DataSummaryDock = [];
                        }
                        if (this_14.lstDataForSummaryDock[i].START_INTERVAL == null) {
                            this_14.lstDataForSummaryDock[i].START_INTERVAL = [];
                        }
                        if (this_14.lstDataForSummaryDock[i].UserId == null) {
                            this_14.lstDataForSummaryDock[i].UserId = [];
                        }
                        var UserName = this_14.UserId[i];
                        var startIntervalTotalSum = 0;
                        var packageCountTotalSum = 0;
                        var PackageCountReceive = 0;
                        var PackageCountDeliver = 0;
                        if (UserName !== "ALL") {
                            var table1Data = [];
                            table1Data = this_14.lstTable1Data;
                            var distinctUsersArray_3 = [];
                            distinctUsersArray_3 = linq_es5_1.asEnumerable(table1Data).GroupBy(function (x) { return x.START_INTERVAL; }).Distinct().ToArray();
                            console.log(distinctUsersArray_3);
                            var _loop_26 = function (j) {
                                var dockDusmmarData = [];
                                dockDusmmarData = DockSummaryChartData;
                                rows = linq_es5_1.asEnumerable(DockSummaryChartData).Where(function (x) { return x.START_INTERVAL == distinctUsersArray_3[j]["key"] && x.USER_ID == UserName; }).ToArray();
                                value = 0;
                                for (var summ = 0; summ <= rows.length - 1; summ++) {
                                    value += parseInt(rows[summ].PACKAGE_COUNT);
                                }
                                this_14.lstDataForSummaryDock[i].START_INTERVAL.push(rows[0].START_INTERVAL);
                                this_14.lstDataForSummaryDock[i].PACKAGE_COUNT.push(value.toString());
                                this_14.lstDataForSummaryDock[i].UserId.push(UserName);
                            };
                            for (var j = 0; j <= distinctUsersArray_3.length - 1; j++) {
                                _loop_26(j);
                            }
                        }
                        this_14.lstDataForSummaryDock[i].DataSummaryDock.push(this_14.lstDataForSummaryDock[i].PACKAGE_COUNT);
                        this_14.lstDataForSummaryDock[i].LabelSummaryDock.push(this_14.lstDataForSummaryDock[i].START_INTERVAL);
                    };
                    this_14 = this;
                    for (i = 0; i <= this.UserId.length - 1; i++) {
                        _loop_24(i);
                    }
                }
                else {
                    _loop_25 = function (i) {
                        if (this_15.lstDataForSummaryDock[i] == null) {
                            this_15.lstDataForSummaryDock[i] = [];
                            if (this_15.lstDataForSummaryDock[i].PACKAGE_COUNT == null) {
                                this_15.lstDataForSummaryDock[i].PACKAGE_COUNT = [];
                            }
                            this_15.lstDataForSummaryDock[i].START_INTERVAL = [];
                            this_15.lstDataForSummaryDock[i].DataSummaryDock = [];
                            this_15.lstDataForSummaryDock[i].LabelSummaryDock = [];
                            this_15.lstDataForSummaryDock[i].UserId = [];
                        }
                        if (this_15.lstDataForSummaryDock[i].DataSummaryDock == null) {
                            this_15.lstDataForSummaryDock[i].DataSummaryDock = [];
                        }
                        if (this_15.lstDataForSummaryDock[i].START_INTERVAL == null) {
                            this_15.lstDataForSummaryDock[i].START_INTERVAL = [];
                        }
                        if (this_15.lstDataForSummaryDock[i].UserId == null) {
                            this_15.lstDataForSummaryDock[i].UserId = [];
                        }
                        var UserName = this_15.selectedDropDownUserId[i];
                        var startIntervalTotalSum = 0;
                        var packageCountTotalSum = 0;
                        var PackageCountReceive = 0;
                        var PackageCountDeliver = 0;
                        if (UserName !== "ALL") {
                            var table1Data = [];
                            table1Data = this_15.lstTable1Data;
                            var distinctUsersArray_4 = [];
                            distinctUsersArray_4 = linq_es5_1.asEnumerable(table1Data).GroupBy(function (x) { return x.START_INTERVAL; }).Distinct().ToArray();
                            var _loop_27 = function (j) {
                                var dockDusmmarData = [];
                                dockDusmmarData = DockSummaryChartData;
                                rows = linq_es5_1.asEnumerable(DockSummaryChartData).Where(function (x) { return x.START_INTERVAL == distinctUsersArray_4[j]["key"] && x.USER_ID == UserName; }).ToArray();
                                value = 0;
                                for (var summ = 0; summ <= rows.length - 1; summ++) {
                                    value += parseInt(rows[summ].PACKAGE_COUNT);
                                }
                                this_15.lstDataForSummaryDock[i].START_INTERVAL.push(rows[0].START_INTERVAL);
                                this_15.lstDataForSummaryDock[i].PACKAGE_COUNT.push(value.toString());
                                this_15.lstDataForSummaryDock[i].UserId.push(UserName);
                            };
                            for (var j = 0; j <= distinctUsersArray_4.length - 1; j++) {
                                _loop_27(j);
                            }
                        }
                        this_15.lstDataForSummaryDock[i].DataSummaryDock.push(this_15.lstDataForSummaryDock[i].PACKAGE_COUNT);
                        this_15.lstDataForSummaryDock[i].LabelSummaryDock.push(this_15.lstDataForSummaryDock[i].START_INTERVAL);
                    };
                    this_15 = this;
                    for (i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {
                        _loop_25(i);
                    }
                }
                this.chartDataSetForSummaryDock = [];
                this.labelForSummaryDock = [];
                for (cnt = 0; cnt <= this.lstDataForSummaryDock.length - 1; cnt++) {
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        this.chartDataSetForSummaryDock.push({ label: this.UserId[cnt], backgroundColor: '#FFFFFF', borderColor: this.randomColors[cnt], data: this.lstDataForSummaryDock[cnt].DataSummaryDock[0], fill: false });
                        this.labelForSummaryDock.push(this.lstDataForSummaryDock[cnt].LabelSummaryDock);
                    }
                    else {
                        this.chartDataSetForSummaryDock.push({ label: this.selectedDropDownUserId[cnt], backgroundColor: '#FFFFFF', borderColor: this.randomColors[cnt], data: this.lstDataForSummaryDock[cnt].DataSummaryDock[0], fill: false });
                        this.labelForSummaryDock.push(this.lstDataForSummaryDock[cnt].LabelSummaryDock);
                    }
                }
                this.optionForSummaryDock = {
                    scales: {
                        yAxes: [{
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Performance By Employee - Summary"
                    }
                };
                this.dataForSummaryDock = {
                    labels: this.labelForSummaryDock[0][0],
                    datasets: this.chartDataSetForSummaryDock,
                    options: this.optionForSummaryDock
                };
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.BindCycleTimeReport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var frmDate, dt, todate, userString, a;
            return __generator(this, function (_a) {
                this.spinnerService.start();
                this.growlMessage = [];
                this.activeTab = "Cycle Time";
                this.showGridCycleTime = false;
                frmDate = this.convert(this.fromDate);
                dt = this.convert(this.fromDate);
                this.frmDate = new Date(dt);
                todate = this.convert(this.toDate);
                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    if (this.lstUsers.length == 1) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                        this.spinnerService.stop();
                        return [2 /*return*/];
                    }
                }
                userString = "";
                for (a = 0; a <= this.selectedDropDownUserId.length - 1; a++) {
                    userString = userString + this.selectedDropDownUserId[a] + ",";
                }
                userString = userString.replace(/,\s*$/, "");
                this.DeliverProductivityService.GetCycleTimeReport(this.orgGroupIDForDBUpdate, frmDate, todate, userString, this.startEvent, this.endEvent).catch(this.httpService.handleError).then(function (res) {
                    var data = res.json();
                    switch (data.StatType) {
                        case AtParEnums_2.StatusType.Success: {
                            var lstEventRows = [];
                            _this.lstTransactiondata = data.DataDictionary["pDsDelvDetailRep"]["TRANSACTIONS"];
                            _this.lstEventDetailsData = data.DataDictionary["pDsDelvDetailRep"]["EVENTDETAILS"];
                            console.log(_this.lstTransactiondata);
                            console.log(_this.lstEventDetailsData);
                            if (_this.lstTransactiondata.length > 0 && _this.lstEventDetailsData.length > 0) {
                                _this.showGridCycleTime = true;
                                var lstItem = void 0;
                                _this.lstFinalCycleData = [];
                                if (_this.lstTransactiondata.length > 0) {
                                    var _loop_28 = function (i) {
                                        if (_this.lstEventDetailsData.length > 0) {
                                            if (_this.selectedStartEvent === "-1" && _this.selectedEndEvent === "-2") {
                                                _this.lstTransactionFilterdata = linq_es5_1.asEnumerable(_this.lstEventDetailsData).Where(function (x) { return x.TRANSACTION_ID == _this.lstTransactiondata[i].TRANSACTION_ID && (x.STATUS_MESSAGE == "MMIS Receipt" || x.STATUS_MESSAGE == "Parcel Receipt"); }).OrderBy(function (x) { return x.STATUS_TIME; }).ToArray();
                                            }
                                            else if (_this.selectedStartEvent === "-2") {
                                                _this.lstTransactionFilterdata = linq_es5_1.asEnumerable(_this.lstEventDetailsData).Where(function (x) { return x.TRANSACTION_ID == _this.lstTransactiondata[i].TRANSACTION_ID && (x.STATUS_MESSAGE != "Parcel Receipt"); }).OrderBy(function (x) { return x.STATUS_TIME; }).ToArray();
                                            }
                                            else if (_this.selectedStartEvent === "1") {
                                                _this.lstTransactionFilterdata = linq_es5_1.asEnumerable(_this.lstEventDetailsData).Where(function (x) { return x.TRANSACTION_ID == _this.lstTransactiondata[i].TRANSACTION_ID && (x.STATUS_MESSAGE != "MMIS Receipt" && x.STATUS_MESSAGE != "Parcel Receipt"); }).OrderBy(function (x) { return x.STATUS_TIME; }).ToArray();
                                            }
                                            else {
                                                _this.lstTransactionFilterdata = linq_es5_1.asEnumerable(_this.lstEventDetailsData).Where(function (x) { return x.TRANSACTION_ID == _this.lstTransactiondata[i].TRANSACTION_ID; }).OrderBy(function (x) { return x.STATUS_TIME; }).ToArray();
                                            }
                                            console.log(_this.lstTransactionFilterdata);
                                            if (_this.lstTransactionFilterdata.length > 0) {
                                                lstItem = new VM_CYCLETIME_DETAILS_1.VM_CYCLETIME_DETAILS();
                                                lstItem.TRANSACTION_ID = _this.lstTransactiondata[i].TRANSACTION_ID;
                                                lstItem.TRACKING_NBR = _this.lstTransactiondata[i].EXTTRACKING;
                                                lstItem.DELIVER_FROM = _this.lstTransactiondata[i].DELIVERED_BY;
                                                var intTotVal = 0;
                                                var dtPrevCycletime = null;
                                                var dtCycletime = void 0;
                                                var defaultDateString = "1/1/0001 12:00:00 AM";
                                                dtdefaultdate = Date.parse(defaultDateString);
                                                var dtTimediff = void 0;
                                                var dtPrevCycletimeCount = 0;
                                                var dtCycletimeCount = 0;
                                                for (var j = 0; j <= _this.lstTransactionFilterdata.length - 1; j++) {
                                                    if (_this.lstTransactionFilterdata[j].STATUS_TIME != null) {
                                                        dtCycletime = _this.lstTransactionFilterdata[j].STATUS_TIME;
                                                        if (dtPrevCycletime != null) {
                                                            if (dtPrevCycletime.toString() != dtdefaultdate.toString()) {
                                                                dtPrevCycletimeCount = new Date(dtPrevCycletime).getTime();
                                                                dtCycletimeCount = new Date(dtCycletime).getTime();
                                                                if ((dtCycletimeCount - dtPrevCycletimeCount) / 1000 >= 0) {
                                                                    intTotVal = intTotVal + parseInt(((dtCycletimeCount - dtPrevCycletimeCount) / 1000).toString());
                                                                }
                                                            }
                                                        }
                                                        dtPrevCycletime = dtCycletime;
                                                    }
                                                }
                                                var intHrs = 0;
                                                var intDurationInSec = intTotVal;
                                                seconds = Math.floor(intDurationInSec % 60);
                                                var minutes = Math.floor((intDurationInSec / 60) % 60);
                                                hours = Math.floor(intDurationInSec / 3600);
                                                days = Math.floor(intDurationInSec / 24 / 60 / 60);
                                                var h = void 0, m = void 0, s = "";
                                                if (hours < 10) {
                                                    h = "0" + hours;
                                                }
                                                else {
                                                    h = hours.toString();
                                                }
                                                if (minutes < 10) {
                                                    m = "0" + minutes;
                                                }
                                                else {
                                                    m = minutes.toString();
                                                }
                                                if (seconds < 10) {
                                                    s = "0" + seconds;
                                                }
                                                else {
                                                    s = seconds.toString();
                                                }
                                                var strDuration = "";
                                                var span = void 0;
                                                var Hspan = void 0;
                                                strDuration = h + ":" + m + ':' + s;
                                                Hspan = intDurationInSec / 60;
                                                lstItem.CYCLE_TIME = strDuration.toString();
                                                lstItem.HOURS = h;
                                                lstItem.MINS = m;
                                                lstItem.SECONDS = s;
                                                lstItem.TOT_HOURS = (Math.trunc((Hspan / 60) * 100) / 100).toString();
                                                _this.lstFinalCycleData.push(lstItem);
                                            }
                                        }
                                    };
                                    var dtdefaultdate, seconds, hours, days;
                                    for (var i = 0; i <= _this.lstTransactiondata.length - 1; i++) {
                                        _loop_28(i);
                                    }
                                    console.log(_this.lstFinalCycleData);
                                    _this.BindCycleTimeHoursSummary();
                                    _this.BindCycleTimeSummaryDetails();
                                    _this.tdExports = true;
                                }
                            }
                            else {
                                _this.showGrid = false;
                                _this.showGridCycleTime = false;
                                _this.tdExports = false;
                                _this.growlMessage = [];
                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                            }
                            _this.spinnerService.stop();
                            break;
                        }
                        case AtParEnums_2.StatusType.Warn: {
                            _this.showGrid = false;
                            _this.showGridCycleTime = false;
                            _this.tdExports = false;
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                        case AtParEnums_2.StatusType.Error: {
                            _this.showGrid = false;
                            _this.showGridCycleTime = false;
                            _this.tdExports = false;
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                        case AtParEnums_2.StatusType.Custom: {
                            _this.showGrid = false;
                            _this.showGridCycleTime = false;
                            _this.tdExports = false;
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.CalculateCycleTime = function (cycleFilterData, cycleSingleData) {
        return __awaiter(this, void 0, void 0, function () {
            var intTotVal, dtPrevCycletime, dtCycletime, defaultDateString, dtdefaultdate, dtTimediff, i;
            return __generator(this, function (_a) {
                intTotVal = 0;
                dtPrevCycletime = null;
                defaultDateString = "1/1/0001 12:00:00 AM";
                dtdefaultdate = Date.parse(defaultDateString);
                for (i = 0; i <= cycleFilterData.length - 1; i++) {
                    if (cycleFilterData[i].STATUS_TIME != null) {
                        dtCycletime = cycleFilterData[i].STATUS_TIME;
                        if (dtPrevCycletime.toString() != dtdefaultdate.toString()) {
                            if ((dtPrevCycletime.getTime() - dtCycletime.getTime()) >= 0) {
                                intTotVal = intTotVal + parseInt((dtPrevCycletime.getTime() - dtCycletime.getTime()).toString());
                            }
                        }
                        dtPrevCycletime = dtCycletime;
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.BindCycleTimeHoursSummary = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ArrHrsList, _IntHrsCnt, _IntTotCounts, lstitem, totalHoursList, c, _loop_29, this_16, i;
            return __generator(this, function (_a) {
                ArrHrsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 24, 48, 72, 100];
                _IntHrsCnt = 0;
                _IntTotCounts = 0;
                _IntTotCounts = this.lstFinalCycleData.length;
                this.lstCycleHourDetails = [];
                totalHoursList = [];
                for (c = 0; c <= this.lstFinalCycleData.length - 1; c++) {
                    totalHoursList.push({ TOT_HOURS: parseFloat(this.lstFinalCycleData[c].TOT_HOURS) });
                }
                _loop_29 = function (i) {
                    _IntHrsCnt = linq_es5_1.asEnumerable(totalHoursList).Where(function (x) { return x.TOT_HOURS <= parseFloat((ArrHrsList[i]).toString()); }).ToArray().length;
                    lstitem = new VM_CYCLETIME_DETAILS_1.VM_CYCLETIME_DETAILS();
                    lstitem.HOURSSUMMARY = ArrHrsList[i].toString();
                    lstitem.COUNTSUMMARY = _IntHrsCnt.toString();
                    lstitem.COUNT_PERCENTSUMMARY = ((_IntHrsCnt > 0) ? (Math.trunc(((_IntHrsCnt / _IntTotCounts) * 100)) / 100) : 0);
                    this_16.lstCycleHourDetails.push(lstitem);
                };
                this_16 = this;
                for (i = 0; i <= ArrHrsList.length - 1; i++) {
                    _loop_29(i);
                }
                console.log(this.lstFinalCycleData);
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.BindCycleTimeSummaryDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var AvgCount, TotTotalHoursArray, result, i, length, sum, SumOfSqrs, defaultValue, cnt, topSum, val;
            return __generator(this, function (_a) {
                AvgCount = 0;
                TotTotalHoursArray = new Array();
                this.Results = [];
                result = new VM_RESULTS_1.VM_RESULTS();
                result.Count = this.lstFinalCycleData.length.toString();
                for (i = 0; i <= this.lstFinalCycleData.length - 1; i++) {
                    AvgCount = AvgCount + parseFloat(this.lstFinalCycleData[i].TOT_HOURS);
                    TotTotalHoursArray.push(parseFloat(this.lstFinalCycleData[i].TOT_HOURS));
                }
                result.AVG = (Math.trunc((AvgCount / this.lstFinalCycleData.length) * 100) / 100).toString();
                result.Min = Math.min.apply(Math, TotTotalHoursArray).toString();
                result.Max = Math.max.apply(Math, TotTotalHoursArray).toString();
                length = this.lstFinalCycleData.length;
                sum = 0;
                SumOfSqrs = 0;
                defaultValue = 0;
                for (cnt = 0; cnt <= TotTotalHoursArray.length - 1; cnt++) {
                    sum += TotTotalHoursArray[cnt];
                    SumOfSqrs += Math.pow(TotTotalHoursArray[cnt], 2);
                }
                if (TotTotalHoursArray.length == 0) {
                    result.StDev = defaultValue.toString();
                }
                topSum = (TotTotalHoursArray.length * SumOfSqrs) - (Math.pow(sum, 2));
                val = TotTotalHoursArray.length;
                result.StDev = (Math.trunc((Math.sqrt(topSum / (val * (val - 1)))) * 100) / 100).toString();
                this.Results.push(result);
                console.log(this.lstFinalCycleData);
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.isMailDialog = true;
                    this.toMailAddr = '';
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "onSendMailIconClick");
                }
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, mailName, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.growlMessage = [];
                        if (this.toMailAddr == '' || this.toMailAddr == undefined) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Email Address to Send' });
                            return [2 /*return*/];
                        }
                        val = this.validateEmail(this.toMailAddr);
                        if (!val) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Email Address to Send' });
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        this.isMailDialog = false;
                        toAddr = '';
                        mailName = "";
                        if (this.activeTab === "Employee Productivity") {
                            mailName = "Employee Productivity Report";
                        }
                        else if (this.activeTab === "Receive by Employee") {
                            mailName = "Productivity Receive By Employee";
                        }
                        else if (this.activeTab === "Deliver by Employee") {
                            mailName = "Productivity Deliver By Employee";
                        }
                        else if (this.activeTab === "Dock Performance") {
                            mailName = "Productivity Dock Performance By Employee";
                        }
                        else {
                            mailName = "Cycle Time Report";
                        }
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], mailName, JSON.stringify(html), this.toMailAddr, AtParEnums_1.MailPriority.Normal.toString(), '')
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                            })];
                    case 2:
                        _a.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Mail has been sent' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'From Address is Missing! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Please Enter valid Email Address to Send' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_BODY) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Email Server not configured! Please contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SEND_FAILED) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                        }
                        else {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                        }
                        _a.label = 3;
                    case 3:
                        // if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.isMailDialog = false;
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "onSendMailClick");
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ProductivityReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ProductivityReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, printName, mywindow, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Print')];
                    case 1:
                        html = _a.sent();
                        printName = "";
                        if (this.activeTab === "Employee Productivity") {
                            printName = "Employee Productivity Report";
                        }
                        else if (this.activeTab === "Receive by Employee") {
                            printName = "Productivity Receive By Employee";
                        }
                        else if (this.activeTab === "Deliver by Employee") {
                            printName = "Productivity Deliver By Employee";
                        }
                        else if (this.activeTab === "Dock Performance") {
                            printName = "Productivity Dock Performance By Employee";
                        }
                        else {
                            printName = "Cycle Time Report";
                        }
                        if (html != '' && html != null) {
                            mywindow = window.open('', 'PRINT', 'height=600,width=600');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + printName + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                mywindow.document.close(); // necessary for IE >= 10
                                mywindow.focus(); // necessary for IE >= 10*/
                                //mywindow.print();
                                // mywindow.close();
                                return [2 /*return*/, true];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "onPrintClick");
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductivityReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, excelName, blob, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        excelName = "";
                        if (this.activeTab === "Employee Productivity") {
                            excelName = "Deliver_EmployeeProductivity.xls";
                        }
                        else if (this.activeTab === "Receive by Employee") {
                            excelName = "ProductivityReceiveByEmployee.xls";
                        }
                        else if (this.activeTab === "Deliver by Employee") {
                            excelName = "ProductivityDeliverByEmployee.xls";
                        }
                        else if (this.activeTab === "Dock Performance") {
                            excelName = "ProductivityDockPerformanceByEmployee.xls";
                        }
                        else {
                            excelName = "ProductivityCycleTimeReport.xls";
                        }
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, excelName);
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "onExportToExcelClick");
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductivityReportComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var chartImageEmpDay, imageEmpDay, chartImageAvgEmp, imageAvgEmp, htmlBuilder_1, sbMailText, _strFrmDt, _strToDt, imgserverPath, imgEmpDayAvgPath, phyname, Curdate, pint, strTitle, title, dtfromdate, chartDatee, dttodate, datediff, x, dtfromdate1, chartDate1, dttodate1, datediff1, xy, SelDate_1, lstEmpDayList, _loop_30, this_17, j, _loop_31, this_18, j, _loop_32, this_19, j, _loop_33, this_20, j, ex_7, chartImageRecv1, imageRecv1, chartImageRecv2, imageRecv2, chartImageRecv3, imageRecv3, chartImageRecv4, imageRecv4, chartImageRecv5, imageRecv5, chartImageRecvSumm, imageRecvSumm, htmlBuilder_2, sbMailText, _strFrmDt, _strToDt, imgserverPath, imgEmpDayForRecvPath, phyname, Curdate, strTitle, title, dtfromdate, chartDatee, dttodate, datediff, x, pint, _loop_34, this_21, summ, UserName, summ, UserName, strPckgCnt, _loop_35, this_22, summcnt, ex_8, chartImageDelv1, imageDelv1, chartImageDelv2, imageDelv2, chartImageDelv3, imageDelv3, chartImageDelv4, imageDelv4, chartImageDelv5, imageDelv5, chartImageDelvSumm, imageDelvSumm, htmlBuilder_3, sbMailText, _strFrmDt, _strToDt, imgserverPath, imgEmpDayForDelvPath, phyname, Curdate, strTitle, title, dtfromdate, chartDatee, dttodate, datediff, x, pint, _loop_36, this_23, summ, UserName, summ, UserName, strPckgCnt, _loop_37, this_24, summcnt, ex_9, chartImageDock1, imageDock1, chartImageDock2, imageDock2, chartImageDock3, imageDock3, chartImageDock4, imageDock4, chartImageDock5, imageDock5, chartImageDockSumm, imageDockSumm, htmlBuilder_4, sbMailText, _strFrmDt, _strToDt, imgserverPath, imgEmpDayForDockPath, phyname, Curdate, strTitle, title, dtfromdate, chartDatee, dttodate, datediff, x, pint, _loop_38, this_25, summ, UserName, summ, UserName, strPckgCnt, _loop_39, this_26, summcnt, _loop_40, this_27, summcnt, ex_10, htmlBuilder_5, sbMailText, _strFrmDt, _strToDt, imgserverPath, imgEmpDayForDockPath, phyname, Curdate, strTitle, title, i, j, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.activeTab === "Employee Productivity")) return [3 /*break*/, 9];
                        chartImageEmpDay = document.getElementById("ChartIdEmpDay");
                        imageEmpDay = chartImageEmpDay.toDataURL("image/png");
                        imageEmpDay = imageEmpDay.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageEmpDay, "EmpProdByDay").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        chartImageAvgEmp = document.getElementById("ChartIdAvgEmpProd");
                        imageAvgEmp = chartImageAvgEmp.toDataURL("image/png");
                        imageAvgEmp = imageAvgEmp.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageAvgEmp, "AvgEmpProd").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        htmlBuilder_1 = '';
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, , 8]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        imgEmpDayAvgPath = '';
                        return [4 /*yield*/, this.commonService.getServerIP()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.ipAddress = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
                                    htmlBuilder_1 = '';
                                    return htmlBuilder_1;
                                }
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.commonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.growlMessage = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
                                    htmlBuilder_1 = '';
                                    return htmlBuilder_1;
                                }
                            })];
                    case 5:
                        _a.sent();
                        phyname = void 0;
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgEmpDayAvgPath = this.httpService.BaseUrl + '/Uploaded/';
                        Curdate = this.frmDate;
                        pint = 0;
                        strTitle = "\"" + "AtparVersion2.4.4" + "\"";
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder_1 += "<Table align= left width= 100 % cellpadding=0 cellspacing = 0 vAlign= top>";
                        if (reqType === "Print") {
                            htmlBuilder_1 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder_1 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_1 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder_1 += "<tr><td colspan=5 align=left><b><span class=c2>Employee Productivity by Day From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + " </span></b></td><td align=right valign=top>&nbsp;";
                            htmlBuilder_1 += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType === "Mail") {
                                //htmlBuilder += "<TR width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td></TR>";
                                htmlBuilder_1 += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            }
                            else {
                                htmlBuilder_1 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            }
                            htmlBuilder_1 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_1 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0></tr>";
                            htmlBuilder_1 += "<tr><td colspan=5 align=left><b><span class=c2>Employee Productivity by Day From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder_1 += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> ";
                        htmlBuilder_1 += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                        htmlBuilder_1 += "<tr bgcolor=#d3d3d3>";
                        htmlBuilder_1 += "<td align=center nowrap ><b><span class=c2></span></b></td>";
                        dtfromdate = this.fromDate;
                        chartDatee = new Date(dtfromdate);
                        dttodate = this.toDate;
                        datediff = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                        x = 0;
                        while (x <= datediff) {
                            pint += 1;
                            htmlBuilder_1 += "<td align=center nowrap colspan=2><b><span class=c2>Day " + pint.toString() + " (" + this.convertDateFormate(chartDatee.toString()) + ")</span></b></td>";
                            chartDatee = new Date(chartDatee.setDate(chartDatee.getDate() + 1));
                            x += 1;
                        }
                        htmlBuilder_1 += "</tr>";
                        pint = 0;
                        htmlBuilder_1 += "<tr bgcolor=#d3d3d3>";
                        htmlBuilder_1 += "<td align=center nowrap ><b><span class=c2>Employee</span></b></td>";
                        dtfromdate1 = this.fromDate;
                        chartDate1 = new Date(dtfromdate1);
                        dttodate1 = this.toDate;
                        datediff1 = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                        xy = 0;
                        while (xy <= datediff1) {
                            pint += 1;
                            htmlBuilder_1 += "<td align=center nowrap ><b><span class=c2>Packages</span></b></td>";
                            htmlBuilder_1 += "<td align=center nowrap ><b><span class=c2>Time</span></b></td>";
                            chartDate1 = new Date(chartDate1.setDate(chartDate1.getDate() + 1));
                            xy += 1;
                        }
                        htmlBuilder_1 += "</tr>";
                        pint = 0;
                        lstEmpDayList = [];
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            _loop_30 = function (j) {
                                var UserName = this_17.UserId[j];
                                if (UserName !== "ALL") {
                                    var dtfromdate2 = this_17.fromDate;
                                    var chartDate2 = new Date(dtfromdate2);
                                    var dttodate2 = this_17.toDate;
                                    var datediff2 = new Date(this_17.toDate).getDate() - new Date(this_17.fromDate).getDate();
                                    var xy_1 = 0;
                                    pint = 0;
                                    htmlBuilder_1 += "<tr width='100%'>";
                                    htmlBuilder_1 += "<td align=left nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                    while (xy_1 <= datediff2) {
                                        SelDate_1 = chartDate2.toString();
                                        lstEmpDayList = linq_es5_1.asEnumerable(this_17.lstChartData).Where(function (i) { return i.TRANS_DATE == SelDate_1 && i.UserId === UserName; }).ToArray();
                                        xy_1 += 1;
                                        if (lstEmpDayList.length > 0) {
                                            htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + lstEmpDayList[0].PACKAGE_COUNT + "</span></td>";
                                            htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + lstEmpDayList[0].TIME + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder_1 += "<td align=right nowrap ><span class=c2>0</span></td>";
                                            htmlBuilder_1 += "<td align=right nowrap ><span class=c2>0</span></td>";
                                        }
                                        chartDate2 = new Date(chartDate2.setDate(chartDate2.getDate() + 1));
                                    }
                                }
                                htmlBuilder_1 += "</tr>";
                            };
                            this_17 = this;
                            for (j = 0; j <= this.UserId.length - 1; j++) {
                                _loop_30(j);
                            }
                        }
                        else {
                            _loop_31 = function (j) {
                                var UserName = this_18.selectedDropDownUserId[j];
                                if (UserName !== "ALL") {
                                    var dtfromdate2 = this_18.fromDate;
                                    var chartDate2 = new Date(dtfromdate2);
                                    var dttodate2 = this_18.toDate;
                                    var datediff2 = new Date(this_18.toDate).getDate() - new Date(this_18.fromDate).getDate();
                                    var xy_2 = 0;
                                    pint = 0;
                                    htmlBuilder_1 += "<tr width='100%'>";
                                    htmlBuilder_1 += "<td align=left nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                    while (xy_2 <= datediff2) {
                                        SelDate_1 = chartDate2.toString();
                                        lstEmpDayList = linq_es5_1.asEnumerable(this_18.lstChartData).Where(function (i) { return i.TRANS_DATE == SelDate_1 && i.UserId === UserName; }).ToArray();
                                        xy_2 += 1;
                                        if (lstEmpDayList.length > 0) {
                                            htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + lstEmpDayList[0].PACKAGE_COUNT + "</span></td>";
                                            htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + lstEmpDayList[0].TIME + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder_1 += "<td align=right nowrap ><span class=c2>0</span></td>";
                                            htmlBuilder_1 += "<td align=right nowrap ><span class=c2>0</span></td>";
                                        }
                                        chartDate2 = new Date(chartDate2.setDate(chartDate2.getDate() + 1));
                                    }
                                }
                                htmlBuilder_1 += "</tr>";
                            };
                            this_18 = this;
                            for (j = 0; j <= this.selectedDropDownUserId.length - 1; j++) {
                                _loop_31(j);
                            }
                        }
                        htmlBuilder_1 += "<br/>";
                        htmlBuilder_1 += "<br/>";
                        htmlBuilder_1 += "</table>";
                        htmlBuilder_1 += "<div align=center>";
                        htmlBuilder_1 += "<table>";
                        htmlBuilder_1 += "<tr nowrap>";
                        if (reqType === "Mail") {
                            htmlBuilder_1 += "<td align=left colspan=" + ((pint * 2) + 1).toString() + " ><img src=" + imgEmpDayAvgPath + "EmpProdByDay.png /></td>";
                        }
                        else {
                            htmlBuilder_1 += "<td align=left colspan=" + ((pint * 2) + 1).toString() + " ><img src=" + imgEmpDayAvgPath + "EmpProdByDay.png /></td>";
                        }
                        htmlBuilder_1 += "</tr>";
                        htmlBuilder_1 += "</table>";
                        htmlBuilder_1 += "</div>";
                        htmlBuilder_1 += "</td></tr>";
                        htmlBuilder_1 += "<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>";
                        htmlBuilder_1 += "</br><tr><td colspan=5 align=left><span class=c2><b>Average Employee Productivity by Day From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                        htmlBuilder_1 += "<tr><td colspan=2> ";
                        htmlBuilder_1 += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                        htmlBuilder_1 += "<tr>";
                        htmlBuilder_1 += "<td align=center nowrap colspan=4 ><b><span class=c2>Average Package Handled</span></b></td>";
                        htmlBuilder_1 += "</tr>";
                        htmlBuilder_1 += "<td align=center nowrap ><b><span class=c2>Employee</span></b></td>";
                        htmlBuilder_1 += "<td align=center nowrap ><b><span class=c2>Packages</span></b></td>";
                        htmlBuilder_1 += "<td align=center nowrap ><b><span class=c2>Average Time (hours)</span></b></td>";
                        htmlBuilder_1 += "<td align=center nowrap ><b><span class=c2>Max Time (Hours)</span></b></td>";
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            _loop_32 = function (j) {
                                var UserName = this_19.UserId[j];
                                if (UserName !== "ALL") {
                                    htmlBuilder_1 += "<tr>";
                                    htmlBuilder_1 += "<td align=left nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                    var AvgPackageCount = 0;
                                    var AvgTimeCount = 0;
                                    var AvgMaxCount = 0;
                                    var TotTotalHoursArray = new Array();
                                    var lstAvgList = [];
                                    lstAvgList = linq_es5_1.asEnumerable(this_19.lstChartData).Where(function (z) { return z.UserId == UserName; }).ToArray();
                                    for (var k = 0; k <= lstAvgList.length - 1; k++) {
                                        AvgPackageCount += lstAvgList[k].PACKAGE_COUNT;
                                        AvgTimeCount += lstAvgList[k].TIME;
                                        TotTotalHoursArray.push(lstAvgList[k].TIME);
                                    }
                                    AvgPackageCount = AvgPackageCount / lstAvgList.length;
                                    AvgMaxCount = Math.max.apply(Math, TotTotalHoursArray);
                                    AvgTimeCount = AvgTimeCount / lstAvgList.length;
                                    htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + AvgPackageCount + "</span></td>";
                                    htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + AvgTimeCount + "</span></td>";
                                    htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + AvgMaxCount + "</span></td>";
                                    htmlBuilder_1 += "</tr>";
                                    //htmlBuilder += "<tr>"
                                }
                            };
                            this_19 = this;
                            for (j = 0; j <= this.UserId.length - 1; j++) {
                                _loop_32(j);
                            }
                        }
                        else {
                            _loop_33 = function (j) {
                                var UserName = this_20.selectedDropDownUserId[j];
                                if (UserName !== "ALL") {
                                    htmlBuilder_1 += "<tr>";
                                    htmlBuilder_1 += "<td align=left nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                    var AvgPackageCount = 0;
                                    var AvgTimeCount = 0;
                                    var AvgMaxCount = 0;
                                    var TotTotalHoursArray = new Array();
                                    var lstAvgList = [];
                                    lstAvgList = linq_es5_1.asEnumerable(this_20.lstChartData).Where(function (z) { return z.UserId == UserName; }).ToArray();
                                    for (var k = 0; k <= lstAvgList.length - 1; k++) {
                                        AvgPackageCount += lstAvgList[k].PACKAGE_COUNT;
                                        AvgTimeCount += lstAvgList[k].TIME;
                                        TotTotalHoursArray.push(lstAvgList[k].TIME);
                                    }
                                    AvgPackageCount = AvgPackageCount / lstAvgList.length;
                                    AvgMaxCount = Math.max.apply(Math, TotTotalHoursArray);
                                    AvgTimeCount = AvgTimeCount / lstAvgList.length;
                                    htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + AvgPackageCount + "</span></td>";
                                    htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + AvgTimeCount + "</span></td>";
                                    htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + AvgMaxCount + "</span></td>";
                                    htmlBuilder_1 += "</tr>";
                                    htmlBuilder_1 += "<tr>";
                                }
                            };
                            this_20 = this;
                            for (j = 0; j <= this.selectedDropDownUserId.length - 1; j++) {
                                _loop_33(j);
                            }
                        }
                        htmlBuilder_1 += "<tr nowrap>";
                        if (reqType === "Mail") {
                            htmlBuilder_1 += "<td align=left colspan='4' ><img src=" + imgEmpDayAvgPath + "AvgEmpProd.png /></td>";
                        }
                        else {
                            htmlBuilder_1 += "<td align=left colspan='4' ><img src=" + imgEmpDayAvgPath + "AvgEmpProd.png /></td>";
                        }
                        htmlBuilder_1 += "</tr>";
                        htmlBuilder_1 += "</table>";
                        htmlBuilder_1 += "</td></tr>";
                        htmlBuilder_1 += "</Table>";
                        return [4 /*yield*/, htmlBuilder_1];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7:
                        ex_7 = _a.sent();
                        htmlBuilder_1 = '';
                        return [2 /*return*/, htmlBuilder_1];
                    case 8: return [3 /*break*/, 68];
                    case 9:
                        if (!(this.activeTab === "Receive by Employee")) return [3 /*break*/, 27];
                        if (!(this.blnGraph1 == true)) return [3 /*break*/, 11];
                        chartImageRecv1 = document.getElementById("ChartIdForRecv1");
                        imageRecv1 = chartImageRecv1.toDataURL("image/png");
                        imageRecv1 = imageRecv1.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageRecv1, "EmpProdRecv0").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        if (!(this.blnGraph2 == true)) return [3 /*break*/, 13];
                        chartImageRecv2 = document.getElementById("ChartIdForRecv2");
                        imageRecv2 = chartImageRecv2.toDataURL("image/png");
                        imageRecv2 = imageRecv2.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageRecv2, "EmpProdRecv1").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 12:
                        _a.sent();
                        _a.label = 13;
                    case 13:
                        if (!(this.blnGraph3 == true)) return [3 /*break*/, 15];
                        chartImageRecv3 = document.getElementById("ChartIdForRecv3");
                        imageRecv3 = chartImageRecv3.toDataURL("image/png");
                        imageRecv3 = imageRecv3.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageRecv3, "EmpProdRecv2").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15:
                        if (!(this.blnGraph4 == true)) return [3 /*break*/, 17];
                        chartImageRecv4 = document.getElementById("ChartIdForRecv4");
                        imageRecv4 = chartImageRecv4.toDataURL("image/png");
                        imageRecv4 = imageRecv4.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageRecv4, "EmpProdRecv3").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 16:
                        _a.sent();
                        _a.label = 17;
                    case 17:
                        if (!(this.blnGraph5 == true)) return [3 /*break*/, 19];
                        chartImageRecv5 = document.getElementById("ChartIdForRecv5");
                        imageRecv5 = chartImageRecv5.toDataURL("image/png");
                        imageRecv5 = imageRecv5.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageRecv5, "EmpProdRecv4").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 18:
                        _a.sent();
                        _a.label = 19;
                    case 19:
                        chartImageRecvSumm = document.getElementById("ChartIdForSummaryRecv");
                        imageRecvSumm = chartImageRecvSumm.toDataURL("image/png");
                        imageRecvSumm = imageRecvSumm.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageRecvSumm, "EmpProdRecvSumm").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 20:
                        _a.sent();
                        htmlBuilder_2 = '';
                        _a.label = 21;
                    case 21:
                        _a.trys.push([21, 25, , 26]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        imgEmpDayForRecvPath = '';
                        return [4 /*yield*/, this.commonService.getServerIP()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.ipAddress = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
                                    htmlBuilder_2 = '';
                                    return htmlBuilder_2;
                                }
                            })];
                    case 22:
                        _a.sent();
                        return [4 /*yield*/, this.commonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.growlMessage = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
                                    htmlBuilder_2 = '';
                                    return htmlBuilder_2;
                                }
                            })];
                    case 23:
                        _a.sent();
                        phyname = void 0;
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgEmpDayForRecvPath = this.httpService.BaseUrl + '/Uploaded/';
                        Curdate = this.frmDate;
                        strTitle = "\"" + "AtparVersion2.4.4" + "\"";
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder_2 += "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == "Print") {
                            htmlBuilder_2 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder_2 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_2 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder_2 += "<tr><td colspan=5 align=left><span class=c2><b>Dock Performance Report From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder_2 += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType == "Mail") {
                                htmlBuilder_2 += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            }
                            else {
                                htmlBuilder_2 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            }
                            htmlBuilder_2 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_2 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder_2 += "<tr><td align=left><span class=c2><b>Dock Receive   By Employee From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder_2 += "</td></tr></table></td></tr><br/>";
                        dtfromdate = this.fromDate;
                        chartDatee = new Date(dtfromdate);
                        dttodate = this.toDate;
                        datediff = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                        x = 0;
                        pint = 0;
                        _loop_34 = function () {
                            pint += 1;
                            var SelDate = chartDatee.toString();
                            htmlBuilder_2 += "<br/><tr><td colspan=2 align=left><b><span class=c2> Receiving By Employee Day - " + this_21.convertDateFormate(SelDate) + "</span></b></td><td align=right valign=top>&nbsp;";
                            htmlBuilder_2 += "<tr><td colspan=2><table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                            htmlBuilder_2 += "<tr width='100%' bgcolor=#d3d3d3>";
                            htmlBuilder_2 += "<td align=center nowrap ><b><span class=c2></span></b></td>";
                            if (this_21.selectedDropDownUserId.indexOf("ALL") > -1) {
                                for (var i = 0; i <= this_21.UserId.length - 1; i++) {
                                    var UserName = this_21.UserId[i];
                                    htmlBuilder_2 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                }
                            }
                            else {
                                for (var i = 0; i <= this_21.selectedDropDownUserId.length - 1; i++) {
                                    var UserName = this_21.selectedDropDownUserId[i];
                                    htmlBuilder_2 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                }
                            }
                            htmlBuilder_2 += "<td align=Center nowrap width='100%'><b><span class=c2>Graph</span></b></td>";
                            htmlBuilder_2 += "</tr>";
                            var _loop_41 = function (z) {
                                htmlBuilder_2 += "<tr width='100%'>";
                                htmlBuilder_2 += "<td align=left nowrap><span class=c2>" + this_21.lstTable1Data[z].START_INTERVAL + "</span></td>";
                                if (this_21.selectedDropDownUserId.indexOf("ALL") > -1) {
                                    var _loop_42 = function (xy) {
                                        var UserName = this_21.UserId[xy];
                                        //htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                        var dr = linq_es5_1.asEnumerable(this_21.lstTable1Data).Where(function (cnt) { return cnt.UserId == UserName && cnt.START_INTERVAL == _this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == _this.convertDateFormate(SelDate); }).ToArray();
                                        if (dr.length > 0) {
                                            htmlBuilder_2 += "<td align=right nowrap><span class=c2>" + dr[0].PACKAGE_COUNT + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder_2 += "<td align=right nowrap><span class=c2>" + "0" + "</span></td>";
                                        }
                                    };
                                    for (var xy = 0; xy <= this_21.UserId.length - 1; xy++) {
                                        _loop_42(xy);
                                    }
                                }
                                else {
                                    var _loop_43 = function (xy) {
                                        var UserName = this_21.selectedDropDownUserId[xy];
                                        //htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                        console.log(this_21.lstTable1Data);
                                        var dr = linq_es5_1.asEnumerable(this_21.lstTable1Data).Where(function (cnt) { return cnt.UserId == UserName && cnt.START_INTERVAL == _this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == _this.convertDateFormate(SelDate); }).ToArray();
                                        if (dr.length > 0) {
                                            htmlBuilder_2 += "<td align=right nowrap><span class=c2>" + dr[0].PACKAGE_COUNT + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder_2 += "<td align=right nowrap><span class=c2>" + "0" + "</span></td>";
                                        }
                                    };
                                    for (var xy = 0; xy <= this_21.selectedDropDownUserId.length - 1; xy++) {
                                        _loop_43(xy);
                                    }
                                }
                                if (z == 0) {
                                    if (reqType == "Mail") {
                                        htmlBuilder_2 += "<td  width='100%' align='left' valign='middle' rowspan=" + this_21.lstTable1Data.length + "><img width='800px;' src=" + imgEmpDayForRecvPath + "EmpProdRecv" + x.toString() + ".png /></td>";
                                    }
                                    else {
                                        htmlBuilder_2 += "<td  colspan='12' align='left' valign='middle' rowspan=" + this_21.lstTable1Data.length + "> <div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForRecvPath + "EmpProdRecv" + x.toString() + ".png /></div></td>";
                                    }
                                }
                                htmlBuilder_2 += "</tr>";
                            };
                            for (var z = 0; z <= this_21.lstTable1Data.length - 1; z++) {
                                _loop_41(z);
                            }
                            htmlBuilder_2 += "</table>";
                            htmlBuilder_2 += "</td></tr>";
                            x += 1;
                            chartDatee = new Date(chartDatee.setDate(chartDatee.getDate() + 1));
                        };
                        this_21 = this;
                        while (x <= datediff) {
                            _loop_34();
                        }
                        htmlBuilder_2 += "<br/><tr><td colspan=5 align=left><b><span class=c2>Dock Receiving By Employee -Summary </span></b></td><td align=right valign=top>&nbsp;";
                        htmlBuilder_2 += "</td></tr><tr height=20></tr></table></td></tr><br/><tr><td colspan=2> ";
                        htmlBuilder_2 += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                        htmlBuilder_2 += "<tr width='100%' bgcolor=#d3d3d3>";
                        htmlBuilder_2 += "<td align=center nowrap ><b><span class=c2></span></b></td>";
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            for (summ = 0; summ <= this.UserId.length - 1; summ++) {
                                UserName = this.UserId[summ];
                                htmlBuilder_2 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                            }
                        }
                        else {
                            for (summ = 0; summ <= this.selectedDropDownUserId.length - 1; summ++) {
                                UserName = this.selectedDropDownUserId[summ];
                                htmlBuilder_2 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                            }
                        }
                        htmlBuilder_2 += "<td align=left nowrap width='100%'></td>";
                        htmlBuilder_2 += "</tr>";
                        strPckgCnt = void 0;
                        _loop_35 = function (summcnt) {
                            htmlBuilder_2 += "<tr width='100%'>";
                            htmlBuilder_2 += "<td align=left nowrap><span class=c2>" + this_22.lstTable1Data[summcnt].START_INTERVAL + "</span></td>";
                            if (this_22.selectedDropDownUserId.indexOf("ALL") > -1) {
                                var _loop_44 = function (user) {
                                    var UserName = this_22.UserId[user];
                                    var pckgcnt = 0;
                                    var List_1 = [];
                                    List_1 = linq_es5_1.asEnumerable(this_22.lstTable1Data).Where(function (pck) { return pck.UserId == UserName && pck.START_INTERVAL == _this.lstTable1Data[summcnt].START_INTERVAL; }).ToArray();
                                    for (var summPckgcnt = 0; summPckgcnt <= List_1.length - 1; summPckgcnt++) {
                                        pckgcnt = List_1[summPckgcnt].PACKAGE_COUNT;
                                    }
                                    strPckgCnt = pckgcnt.toString();
                                    if (strPckgCnt == null || strPckgCnt === "") {
                                        strPckgCnt = "0";
                                    }
                                    htmlBuilder_2 += "<td align=right nowrap><span class=c2>" + strPckgCnt + "</span></td>";
                                };
                                for (var user = 0; user <= this_22.UserId.length - 1; user++) {
                                    _loop_44(user);
                                }
                            }
                            else {
                                var _loop_45 = function (user) {
                                    var UserName = this_22.selectedDropDownUserId[user];
                                    var pckgcnt = 0;
                                    var List_2 = [];
                                    List_2 = linq_es5_1.asEnumerable(this_22.lstTable1Data).Where(function (pck) { return pck.UserId == UserName && pck.START_INTERVAL == _this.lstTable1Data[summcnt].START_INTERVAL; }).ToArray();
                                    for (var summPckgcnt = 0; summPckgcnt <= List_2.length - 1; summPckgcnt++) {
                                        pckgcnt = List_2[summPckgcnt].PACKAGE_COUNT;
                                    }
                                    strPckgCnt = pckgcnt.toString();
                                    if (strPckgCnt == null || strPckgCnt === "") {
                                        strPckgCnt = "0";
                                    }
                                    htmlBuilder_2 += "<td align=right nowrap><span class=c2>" + strPckgCnt + "</span></td>";
                                };
                                for (var user = 0; user <= this_22.selectedDropDownUserId.length - 1; user++) {
                                    _loop_45(user);
                                }
                            }
                            if (summcnt == 0) {
                                if (reqType == "Mail") {
                                    htmlBuilder_2 += "<td  width='100%' align='left' valign='middle' rowspan=" + this_22.lstTable1Data.length + " ><img width='800px;' src=" + imgEmpDayForRecvPath + "EmpProdRecvSumm.png /></td>";
                                }
                                else {
                                    htmlBuilder_2 += "<td  colspan='12' align='left' valign='middle' rowspan=" + this_22.lstTable1Data.length + " ><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForRecvPath + "EmpProdRecvSumm.png /></div></td>";
                                }
                            }
                            htmlBuilder_2 += "</tr>";
                        };
                        this_22 = this;
                        for (summcnt = 0; summcnt <= this.lstTable1Data.length - 1; summcnt++) {
                            _loop_35(summcnt);
                        }
                        htmlBuilder_2 += "</table>";
                        htmlBuilder_2 += "</td></tr>";
                        htmlBuilder_2 += "</Table>";
                        return [4 /*yield*/, htmlBuilder_2];
                    case 24: return [2 /*return*/, _a.sent()];
                    case 25:
                        ex_8 = _a.sent();
                        htmlBuilder_2 = '';
                        return [2 /*return*/, htmlBuilder_2];
                    case 26: return [3 /*break*/, 68];
                    case 27:
                        if (!(this.activeTab === "Deliver by Employee")) return [3 /*break*/, 45];
                        if (!(this.blnGraph1 == true)) return [3 /*break*/, 29];
                        chartImageDelv1 = document.getElementById("ChartIdForDelv1");
                        imageDelv1 = chartImageDelv1.toDataURL("image/png");
                        imageDelv1 = imageDelv1.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDelv1, "EmpProdDelv0").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 28:
                        _a.sent();
                        _a.label = 29;
                    case 29:
                        if (!(this.blnGraph2 == true)) return [3 /*break*/, 31];
                        chartImageDelv2 = document.getElementById("ChartIdForDelv2");
                        imageDelv2 = chartImageDelv2.toDataURL("image/png");
                        imageDelv2 = imageDelv2.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDelv2, "EmpProdDelv1").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 30:
                        _a.sent();
                        _a.label = 31;
                    case 31:
                        if (!(this.blnGraph3 == true)) return [3 /*break*/, 33];
                        chartImageDelv3 = document.getElementById("ChartIdForDelv3");
                        imageDelv3 = chartImageDelv3.toDataURL("image/png");
                        imageDelv3 = imageDelv3.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDelv3, "EmpProdDelv2").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 32:
                        _a.sent();
                        _a.label = 33;
                    case 33:
                        if (!(this.blnGraph4 == true)) return [3 /*break*/, 35];
                        chartImageDelv4 = document.getElementById("ChartIdForDelv4");
                        imageDelv4 = chartImageDelv4.toDataURL("image/png");
                        imageDelv4 = imageDelv4.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDelv4, "EmpProdDelv3").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 34:
                        _a.sent();
                        _a.label = 35;
                    case 35:
                        if (!(this.blnGraph5 == true)) return [3 /*break*/, 37];
                        chartImageDelv5 = document.getElementById("ChartIdForDelv5");
                        imageDelv5 = chartImageDelv5.toDataURL("image/png");
                        imageDelv5 = imageDelv5.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDelv5, "EmpProdDelv4").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 36:
                        _a.sent();
                        _a.label = 37;
                    case 37:
                        chartImageDelvSumm = document.getElementById("ChartIdForSummaryDeliver");
                        imageDelvSumm = chartImageDelvSumm.toDataURL("image/png");
                        imageDelvSumm = imageDelvSumm.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDelvSumm, "EmpProdDelvSumm").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 38:
                        _a.sent();
                        htmlBuilder_3 = '';
                        _a.label = 39;
                    case 39:
                        _a.trys.push([39, 43, , 44]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        imgEmpDayForDelvPath = '';
                        return [4 /*yield*/, this.commonService.getServerIP()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.ipAddress = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
                                    htmlBuilder_3 = '';
                                    return htmlBuilder_3;
                                }
                            })];
                    case 40:
                        _a.sent();
                        return [4 /*yield*/, this.commonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.growlMessage = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
                                    htmlBuilder_3 = '';
                                    return htmlBuilder_3;
                                }
                            })];
                    case 41:
                        _a.sent();
                        phyname = void 0;
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgEmpDayForDelvPath = this.httpService.BaseUrl + '/Uploaded/';
                        Curdate = this.frmDate;
                        strTitle = "\"" + "AtparVersion2.4.4" + "\"";
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder_3 += "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == "Print") {
                            htmlBuilder_3 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder_3 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_3 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder_3 += "<tr><td colspan=5 align=left><span class=c2><b>Dock Performance Report From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder_3 += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType == "Mail") {
                                htmlBuilder_3 += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            }
                            else {
                                htmlBuilder_3 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            }
                            htmlBuilder_3 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_3 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder_3 += "<tr><td align=left><span class=c2><b>Dock Receive   By Employee From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder_3 += "</td></tr></table></td></tr><br/>";
                        dtfromdate = this.fromDate;
                        chartDatee = new Date(dtfromdate);
                        dttodate = this.toDate;
                        datediff = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                        x = 0;
                        pint = 0;
                        _loop_36 = function () {
                            pint += 1;
                            var SelDate = chartDatee.toString();
                            htmlBuilder_3 += "<br/><tr><td colspan=2 align=left><b><span class=c2> Deliver By Employee Day - " + this_23.convertDateFormate(SelDate) + "</span></b></td><td align=right valign=top>&nbsp;";
                            htmlBuilder_3 += "<tr><td colspan=2><table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                            htmlBuilder_3 += "<tr width='100%' bgcolor=#d3d3d3>";
                            htmlBuilder_3 += "<td align=center nowrap ><b><span class=c2></span></b></td>";
                            if (this_23.selectedDropDownUserId.indexOf("ALL") > -1) {
                                for (var i = 0; i <= this_23.UserId.length - 1; i++) {
                                    var UserName = this_23.UserId[i];
                                    htmlBuilder_3 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                }
                            }
                            else {
                                for (var i = 0; i <= this_23.selectedDropDownUserId.length - 1; i++) {
                                    var UserName = this_23.selectedDropDownUserId[i];
                                    htmlBuilder_3 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                }
                            }
                            htmlBuilder_3 += "<td align=Center nowrap width='100%'><b><span class=c2>Graph</span></b></td>";
                            htmlBuilder_3 += "</tr>";
                            var _loop_46 = function (z) {
                                htmlBuilder_3 += "<tr width='100%'>";
                                htmlBuilder_3 += "<td align=left nowrap><span class=c2>" + this_23.lstTable1Data[z].START_INTERVAL + "</span></td>";
                                if (this_23.selectedDropDownUserId.indexOf("ALL") > -1) {
                                    var _loop_47 = function (xy) {
                                        var UserName = this_23.UserId[xy];
                                        //htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                        var dr = linq_es5_1.asEnumerable(this_23.lstTable2Data).Where(function (cnt) { return cnt.UserId == UserName && cnt.START_INTERVAL == _this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == _this.convertDateFormate(SelDate); }).ToArray();
                                        if (dr.length > 0) {
                                            htmlBuilder_3 += "<td align=right nowrap><span class=c2>" + dr[0].PACKAGE_COUNT + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder_3 += "<td align=right nowrap><span class=c2>" + "0" + "</span></td>";
                                        }
                                    };
                                    for (var xy = 0; xy <= this_23.UserId.length - 1; xy++) {
                                        _loop_47(xy);
                                    }
                                }
                                else {
                                    var _loop_48 = function (xy) {
                                        var UserName = this_23.selectedDropDownUserId[xy];
                                        //htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                        var dr = linq_es5_1.asEnumerable(this_23.lstTable2Data).Where(function (cnt) { return cnt.UserId == UserName && cnt.START_INTERVAL == _this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == _this.convertDateFormate(SelDate); }).ToArray();
                                        if (dr.length > 0) {
                                            htmlBuilder_3 += "<td align=right nowrap><span class=c2>" + dr[0].PACKAGE_COUNT + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder_3 += "<td align=right nowrap><span class=c2>" + "0" + "</span></td>";
                                        }
                                    };
                                    for (var xy = 0; xy <= this_23.selectedDropDownUserId.length - 1; xy++) {
                                        _loop_48(xy);
                                    }
                                }
                                if (z == 0) {
                                    if (reqType == "Mail") {
                                        htmlBuilder_3 += "<td  width='100%' align='left' valign='middle' rowspan=" + this_23.lstTable2Data.length + "><img width='800px;' src=" + imgEmpDayForDelvPath + "EmpProdDelv" + x.toString() + ".png /></td>";
                                    }
                                    else {
                                        htmlBuilder_3 += "<td  colspan='12' align='left' valign='middle' rowspan=" + this_23.lstTable2Data.length + "><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForDelvPath + "EmpProdDelv" + x.toString() + ".png /></div></td>";
                                    }
                                }
                                htmlBuilder_3 += "</tr>";
                            };
                            for (var z = 0; z <= this_23.lstTable1Data.length - 1; z++) {
                                _loop_46(z);
                            }
                            htmlBuilder_3 += "</table>";
                            htmlBuilder_3 += "</td></tr>";
                            x += 1;
                            chartDatee = new Date(chartDatee.setDate(chartDatee.getDate() + 1));
                        };
                        this_23 = this;
                        while (x <= datediff) {
                            _loop_36();
                        }
                        htmlBuilder_3 += "<br/><tr><td colspan=5 align=left><b><span class=c2>Dock Deliver By Employee -Summary </span></b></td><td align=right valign=top>&nbsp;";
                        htmlBuilder_3 += "</td></tr><tr height=20></tr></table></td></tr><br/><tr><td colspan=2> ";
                        htmlBuilder_3 += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                        htmlBuilder_3 += "<tr width='100%' bgcolor=#d3d3d3>";
                        htmlBuilder_3 += "<td align=center nowrap ><b><span class=c2></span></b></td>";
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            for (summ = 0; summ <= this.UserId.length - 1; summ++) {
                                UserName = this.UserId[summ];
                                htmlBuilder_3 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                            }
                        }
                        else {
                            for (summ = 0; summ <= this.selectedDropDownUserId.length - 1; summ++) {
                                UserName = this.selectedDropDownUserId[summ];
                                htmlBuilder_3 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                            }
                        }
                        htmlBuilder_3 += "<td align=left nowrap width='100%'></td>";
                        htmlBuilder_3 += "</tr>";
                        strPckgCnt = void 0;
                        _loop_37 = function (summcnt) {
                            htmlBuilder_3 += "<tr width='100%'>";
                            htmlBuilder_3 += "<td align=left nowrap><span class=c2>" + this_24.lstTable2Data[summcnt].START_INTERVAL + "</span></td>";
                            if (this_24.selectedDropDownUserId.indexOf("ALL") > -1) {
                                var _loop_49 = function (user) {
                                    var UserName = this_24.UserId[user];
                                    var pckgcnt = 0;
                                    var List_3 = [];
                                    List_3 = linq_es5_1.asEnumerable(this_24.lstTable2Data).Where(function (pck) { return pck.UserId == UserName && pck.START_INTERVAL == _this.lstTable2Data[summcnt].START_INTERVAL; }).ToArray();
                                    for (var summPckgcnt = 0; summPckgcnt <= List_3.length - 1; summPckgcnt++) {
                                        pckgcnt = List_3[summPckgcnt].PACKAGE_COUNT;
                                    }
                                    strPckgCnt = pckgcnt.toString();
                                    if (strPckgCnt == null || strPckgCnt === "") {
                                        strPckgCnt = "0";
                                    }
                                    htmlBuilder_3 += "<td align=right nowrap><span class=c2>" + strPckgCnt + "</span></td>";
                                };
                                for (var user = 0; user <= this_24.UserId.length - 1; user++) {
                                    _loop_49(user);
                                }
                            }
                            else {
                                var _loop_50 = function (user) {
                                    var UserName = this_24.selectedDropDownUserId[user];
                                    var pckgcnt = 0;
                                    var List_4 = [];
                                    List_4 = linq_es5_1.asEnumerable(this_24.lstTable2Data).Where(function (pck) { return pck.UserId == UserName && pck.START_INTERVAL == _this.lstTable2Data[summcnt].START_INTERVAL; });
                                    for (var summPckgcnt = 0; summPckgcnt <= List_4.length - 1; summPckgcnt++) {
                                        pckgcnt = List_4[summPckgcnt].PACKAGE_COUNT;
                                    }
                                    strPckgCnt = pckgcnt.toString();
                                    if (strPckgCnt == null || strPckgCnt === "") {
                                        strPckgCnt = "0";
                                    }
                                    htmlBuilder_3 += "<td align=right nowrap><span class=c2>" + strPckgCnt + "</span></td>";
                                };
                                for (var user = 0; user <= this_24.selectedDropDownUserId.length - 1; user++) {
                                    _loop_50(user);
                                }
                            }
                            if (summcnt == 0) {
                                if (reqType == "Mail") {
                                    htmlBuilder_3 += "<td  width='100%' align='left' valign='middle' rowspan=" + this_24.lstTable2Data.length + " ><img width='800px;' src=" + imgEmpDayForDelvPath + "EmpProdDelvSumm.png /></td>";
                                }
                                else {
                                    htmlBuilder_3 += "<td colspan='12' align='left' valign='middle' rowspan=" + this_24.lstTable2Data.length + " ><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForDelvPath + "EmpProdDelvSumm.png /></div></td>";
                                }
                            }
                            htmlBuilder_3 += "</tr>";
                        };
                        this_24 = this;
                        for (summcnt = 0; summcnt <= this.lstTable2Data.length - 1; summcnt++) {
                            _loop_37(summcnt);
                        }
                        htmlBuilder_3 += "</table>";
                        htmlBuilder_3 += "</td></tr>";
                        htmlBuilder_3 += "</Table>";
                        return [4 /*yield*/, htmlBuilder_3];
                    case 42: return [2 /*return*/, _a.sent()];
                    case 43:
                        ex_9 = _a.sent();
                        htmlBuilder_3 = '';
                        return [2 /*return*/, htmlBuilder_3];
                    case 44: return [3 /*break*/, 68];
                    case 45:
                        if (!(this.activeTab === "Dock Performance")) return [3 /*break*/, 63];
                        if (!(this.blnGraph1 == true)) return [3 /*break*/, 47];
                        chartImageDock1 = document.getElementById("ChartIdForDock1");
                        imageDock1 = chartImageDock1.toDataURL("image/png");
                        imageDock1 = imageDock1.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDock1, "EmpProdDock0").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 46:
                        _a.sent();
                        _a.label = 47;
                    case 47:
                        if (!(this.blnGraph2 == true)) return [3 /*break*/, 49];
                        chartImageDock2 = document.getElementById("ChartIdForDock2");
                        imageDock2 = chartImageDock2.toDataURL("image/png");
                        imageDock2 = imageDock2.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDock2, "EmpProdDock1").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 48:
                        _a.sent();
                        _a.label = 49;
                    case 49:
                        if (!(this.blnGraph3 == true)) return [3 /*break*/, 51];
                        chartImageDock3 = document.getElementById("ChartIdForDock3");
                        imageDock3 = chartImageDock3.toDataURL("image/png");
                        imageDock3 = imageDock3.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDock3, "EmpProdDock2").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 50:
                        _a.sent();
                        _a.label = 51;
                    case 51:
                        if (!(this.blnGraph4 == true)) return [3 /*break*/, 53];
                        chartImageDock4 = document.getElementById("ChartIdForDock4");
                        imageDock4 = chartImageDock4.toDataURL("image/png");
                        imageDock4 = imageDock4.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDock4, "EmpProdDock3").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 52:
                        _a.sent();
                        _a.label = 53;
                    case 53:
                        if (!(this.blnGraph5 == true)) return [3 /*break*/, 55];
                        chartImageDock5 = document.getElementById("ChartIdForDock5");
                        imageDock5 = chartImageDock5.toDataURL("image/png");
                        imageDock5 = imageDock5.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDock5, "EmpProdDock4").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 54:
                        _a.sent();
                        _a.label = 55;
                    case 55:
                        chartImageDockSumm = document.getElementById("ChartIdForSummaryDock");
                        imageDockSumm = chartImageDockSumm.toDataURL("image/png");
                        imageDockSumm = imageDockSumm.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDockSumm, "EmpProdDockSumm").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 56:
                        _a.sent();
                        htmlBuilder_4 = '';
                        _a.label = 57;
                    case 57:
                        _a.trys.push([57, 61, , 62]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        imgEmpDayForDockPath = '';
                        return [4 /*yield*/, this.commonService.getServerIP()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.ipAddress = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
                                    htmlBuilder_4 = '';
                                    return htmlBuilder_4;
                                }
                            })];
                    case 58:
                        _a.sent();
                        return [4 /*yield*/, this.commonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.growlMessage = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
                                    htmlBuilder_4 = '';
                                    return htmlBuilder_4;
                                }
                            })];
                    case 59:
                        _a.sent();
                        phyname = void 0;
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgEmpDayForDockPath = this.httpService.BaseUrl + '/Uploaded/';
                        Curdate = this.frmDate;
                        strTitle = "\"" + "AtparVersion2.4.4" + "\"";
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder_4 += "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == "Print") {
                            htmlBuilder_4 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder_4 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_4 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder_4 += "<tr><td colspan=5 align=left><span class=c2><b>Dock Performance Report From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder_4 += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType == "Mail") {
                                htmlBuilder_4 += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            }
                            else {
                                htmlBuilder_4 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            }
                            htmlBuilder_4 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_4 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder_4 += "<tr><td align=left><span class=c2><b>Dock Performance Report From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder_4 += "</td></tr></table></td></tr><br/>";
                        dtfromdate = this.fromDate;
                        chartDatee = new Date(dtfromdate);
                        dttodate = this.toDate;
                        datediff = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                        x = 0;
                        pint = 0;
                        _loop_38 = function () {
                            pint += 1;
                            var SelDate = chartDatee.toString();
                            htmlBuilder_4 += "<br/><tr><td colspan=2 align=left><b><span class=c2> Dock Performance By Employee Day - " + this_25.convertDateFormate(SelDate) + "</span></b></td><td align=right valign=top>&nbsp;";
                            htmlBuilder_4 += "<tr><td colspan=2><table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                            htmlBuilder_4 += "<tr width='100%' bgcolor=#d3d3d3>";
                            htmlBuilder_4 += "<td align=center nowrap ><b><span class=c2></span></b></td>";
                            if (this_25.selectedDropDownUserId.indexOf("ALL") > -1) {
                                for (var i = 0; i <= this_25.UserId.length - 1; i++) {
                                    var UserName = this_25.UserId[i];
                                    htmlBuilder_4 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                }
                            }
                            else {
                                for (var i = 0; i <= this_25.selectedDropDownUserId.length - 1; i++) {
                                    var UserName = this_25.selectedDropDownUserId[i];
                                    htmlBuilder_4 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                }
                            }
                            htmlBuilder_4 += "<td align=Center nowrap width='100%'><b><span class=c2>Graph</span></b></td>";
                            htmlBuilder_4 += "</tr>";
                            var _loop_51 = function (z) {
                                htmlBuilder_4 += "<tr width='100%'>";
                                htmlBuilder_4 += "<td align=left nowrap><span class=c2>" + this_25.lstTable1Data[z].START_INTERVAL + "</span></td>";
                                if (this_25.selectedDropDownUserId.indexOf("ALL") > -1) {
                                    var _loop_52 = function (xy) {
                                        var UserName = this_25.UserId[xy];
                                        //htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                        var dr = linq_es5_1.asEnumerable(this_25.lstTable1Data).Where(function (cnt) { return cnt.UserId == UserName && cnt.START_INTERVAL == _this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == _this.convertDateFormate(SelDate); }).ToArray();
                                        var dr1 = linq_es5_1.asEnumerable(this_25.lstTable2Data).Where(function (cnt) { return cnt.UserId == UserName && cnt.START_INTERVAL == _this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == _this.convertDateFormate(SelDate); }).ToArray();
                                        var sumDock = 0;
                                        if (dr.length > 0) {
                                            sumDock += dr[0].PACKAGE_COUNT;
                                        }
                                        if (dr1.length > 0) {
                                            sumDock += dr1[0].PACKAGE_COUNT;
                                        }
                                        htmlBuilder_4 += "<td align=right nowrap><span class=c2>" + sumDock.toString() + "</span></td>";
                                    };
                                    for (var xy = 0; xy <= this_25.UserId.length - 1; xy++) {
                                        _loop_52(xy);
                                    }
                                }
                                else {
                                    var _loop_53 = function (xy) {
                                        var UserName = this_25.selectedDropDownUserId[xy];
                                        //htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                        var dr = linq_es5_1.asEnumerable(this_25.lstTable1Data).Where(function (cnt) { return cnt.UserId == UserName && cnt.START_INTERVAL == _this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == _this.convertDateFormate(SelDate); }).ToArray();
                                        var dr1 = linq_es5_1.asEnumerable(this_25.lstTable2Data).Where(function (cnt) { return cnt.UserId == UserName && cnt.START_INTERVAL == _this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == _this.convertDateFormate(SelDate); }).ToArray();
                                        var sumDock = 0;
                                        if (dr.length > 0) {
                                            sumDock += dr[0].PACKAGE_COUNT;
                                        }
                                        if (dr1.length > 0) {
                                            sumDock += dr1[0].PACKAGE_COUNT;
                                        }
                                        htmlBuilder_4 += "<td align=right nowrap><span class=c2>" + sumDock.toString() + "</span></td>";
                                    };
                                    for (var xy = 0; xy <= this_25.selectedDropDownUserId.length - 1; xy++) {
                                        _loop_53(xy);
                                    }
                                }
                                if (z == 0) {
                                    if (reqType == "Mail") {
                                        htmlBuilder_4 += "<td  width='100%'  align='left' valign='middle' rowspan=" + this_25.lstTable2Data.length + "><img width='800px;' src=" + imgEmpDayForDockPath + "EmpProdDock" + x.toString() + ".png /></td>";
                                    }
                                    else {
                                        htmlBuilder_4 += "<td colspan='12'  align='left' valign='middle' rowspan=" + this_25.lstTable2Data.length + " ><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForDockPath + "EmpProdDock" + x.toString() + ".png /></div></td>";
                                    }
                                }
                                htmlBuilder_4 += "</tr>";
                            };
                            for (var z = 0; z <= this_25.lstTable1Data.length - 1; z++) {
                                _loop_51(z);
                            }
                            htmlBuilder_4 += "</table>";
                            htmlBuilder_4 += "</td></tr>";
                            x += 1;
                            chartDatee = new Date(chartDatee.setDate(chartDatee.getDate() + 1));
                        };
                        this_25 = this;
                        while (x <= datediff) {
                            _loop_38();
                        }
                        htmlBuilder_4 += "<br/><tr><td colspan=5 align=left><b><span class=c2>Dock Performance By Employee -Summary </span></b></td><td align=right valign=top>&nbsp;";
                        htmlBuilder_4 += "</td></tr><tr height=20></tr></table></td></tr><br/><tr><td colspan=2> ";
                        htmlBuilder_4 += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                        htmlBuilder_4 += "<tr width='100%' bgcolor=#d3d3d3>";
                        htmlBuilder_4 += "<td align=center nowrap ><b><span class=c2></span></b></td>";
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            for (summ = 0; summ <= this.UserId.length - 1; summ++) {
                                UserName = this.UserId[summ];
                                htmlBuilder_4 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                            }
                        }
                        else {
                            for (summ = 0; summ <= this.selectedDropDownUserId.length - 1; summ++) {
                                UserName = this.selectedDropDownUserId[summ];
                                htmlBuilder_4 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                            }
                        }
                        htmlBuilder_4 += "<td align=left nowrap width='100%'></td>";
                        htmlBuilder_4 += "</tr>";
                        strPckgCnt = void 0;
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            _loop_39 = function (summcnt) {
                                htmlBuilder_4 += "<tr width='100%'>";
                                htmlBuilder_4 += "<td align=left nowrap><span class=c2>" + this_26.lstTable1Data[summcnt].START_INTERVAL + "</span></td>";
                                var _loop_54 = function (user) {
                                    var UserName = this_26.UserId[user];
                                    var pckgcnt = 0;
                                    var pckgcnt1 = 0;
                                    var List_5 = [];
                                    var List1 = [];
                                    List_5 = linq_es5_1.asEnumerable(this_26.lstTable1Data).Where(function (pck) { return pck.UserId == UserName && pck.START_INTERVAL == _this.lstTable1Data[summcnt].START_INTERVAL; }).ToArray();
                                    List1 = linq_es5_1.asEnumerable(this_26.lstTable2Data).Where(function (pck) { return pck.UserId == UserName && pck.START_INTERVAL == _this.lstTable2Data[summcnt].START_INTERVAL; }).ToArray();
                                    for (var summPckgcnt = 0; summPckgcnt <= List_5.length - 1; summPckgcnt++) {
                                        pckgcnt = List_5[summPckgcnt].PACKAGE_COUNT;
                                    }
                                    for (var summPckgcnt1 = 0; summPckgcnt1 <= List1.length - 1; summPckgcnt1++) {
                                        pckgcnt1 = List1[summPckgcnt1].PACKAGE_COUNT;
                                    }
                                    if (pckgcnt.toString() == null || pckgcnt.toString() === "") {
                                        pckgcnt = 0;
                                    }
                                    if (pckgcnt1.toString() == null || pckgcnt1.toString() === "") {
                                        pckgcnt1 = 0;
                                    }
                                    var totalValue = pckgcnt + pckgcnt1;
                                    strPckgCnt = totalValue.toString();
                                    if (strPckgCnt == null || strPckgCnt === "") {
                                        strPckgCnt = "0";
                                    }
                                    htmlBuilder_4 += "<td align=right nowrap><span class=c2>" + strPckgCnt + "</span></td>";
                                };
                                for (var user = 0; user <= this_26.UserId.length - 1; user++) {
                                    _loop_54(user);
                                }
                                if (summcnt == 0) {
                                    if (reqType == "Mail") {
                                        htmlBuilder_4 += "<td  width='100%' align='left' valign='middle' rowspan=" + this_26.lstTable2Data.length + " ><img width='800px;' src=" + imgEmpDayForDockPath + "EmpProdDockSumm.png /></td>";
                                    }
                                    else {
                                        htmlBuilder_4 += "<td  colspan='12' align='left' valign='middle' rowspan=" + this_26.lstTable2Data.length + " ><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForDockPath + "EmpProdDockSumm.png /></div></td>";
                                    }
                                }
                                htmlBuilder_4 += "</tr>";
                            };
                            this_26 = this;
                            for (summcnt = 0; summcnt <= this.lstTable1Data.length - 1; summcnt++) {
                                _loop_39(summcnt);
                            }
                        }
                        else {
                            _loop_40 = function (summcnt) {
                                htmlBuilder_4 += "<tr width='100%'>";
                                htmlBuilder_4 += "<td align=left nowrap><span class=c2>" + this_27.lstTable1Data[summcnt].START_INTERVAL + "</span></td>";
                                var _loop_55 = function (user) {
                                    var UserName = this_27.selectedDropDownUserId[user];
                                    var pckgcnt = 0;
                                    var pckgcnt1 = 0;
                                    var List_6 = [];
                                    var List1 = [];
                                    List_6 = linq_es5_1.asEnumerable(this_27.lstTable1Data).Where(function (pck) { return pck.UserId == UserName && pck.START_INTERVAL == _this.lstTable1Data[summcnt].START_INTERVAL; }).ToArray();
                                    List1 = linq_es5_1.asEnumerable(this_27.lstTable2Data).Where(function (pck) { return pck.UserId == UserName && pck.START_INTERVAL == _this.lstTable2Data[summcnt].START_INTERVAL; }).ToArray();
                                    for (var summPckgcnt = 0; summPckgcnt <= List_6.length - 1; summPckgcnt++) {
                                        pckgcnt = List_6[summPckgcnt].PACKAGE_COUNT;
                                    }
                                    for (var summPckgcnt1 = 0; summPckgcnt1 <= List1.length - 1; summPckgcnt1++) {
                                        pckgcnt1 = List1[summPckgcnt1].PACKAGE_COUNT;
                                    }
                                    if (pckgcnt.toString() == null || pckgcnt.toString() === "") {
                                        pckgcnt = 0;
                                    }
                                    if (pckgcnt1.toString() == null || pckgcnt1.toString() === "") {
                                        pckgcnt1 = 0;
                                    }
                                    var totalValue = pckgcnt + pckgcnt1;
                                    strPckgCnt = totalValue.toString();
                                    if (strPckgCnt == null || strPckgCnt === "") {
                                        strPckgCnt = "0";
                                    }
                                    htmlBuilder_4 += "<td align=right nowrap><span class=c2>" + strPckgCnt + "</span></td>";
                                };
                                for (var user = 0; user <= this_27.selectedDropDownUserId.length - 1; user++) {
                                    _loop_55(user);
                                }
                                if (summcnt == 0) {
                                    if (reqType == "Mail") {
                                        htmlBuilder_4 += "<td  width='100%' align='left' valign='middle' rowspan=" + this_27.lstTable2Data.length + " ><img width='800px;' src=" + imgEmpDayForDockPath + "EmpProdDockSumm.png /></td>";
                                    }
                                    else {
                                        htmlBuilder_4 += "<td  colspan='12' align='left' valign='middle' rowspan=" + this_27.lstTable2Data.length + " ><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForDockPath + "EmpProdDockSumm.png /></div></td>";
                                    }
                                }
                                htmlBuilder_4 += "</tr>";
                            };
                            this_27 = this;
                            for (summcnt = 0; summcnt <= this.lstTable1Data.length - 1; summcnt++) {
                                _loop_40(summcnt);
                            }
                        }
                        htmlBuilder_4 += "</table>";
                        htmlBuilder_4 += "</td></tr>";
                        htmlBuilder_4 += "</Table>";
                        return [4 /*yield*/, htmlBuilder_4];
                    case 60: return [2 /*return*/, _a.sent()];
                    case 61:
                        ex_10 = _a.sent();
                        htmlBuilder_4 = '';
                        return [2 /*return*/, htmlBuilder_4];
                    case 62: return [3 /*break*/, 68];
                    case 63:
                        htmlBuilder_5 = '';
                        _a.label = 64;
                    case 64:
                        _a.trys.push([64, 67, , 68]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        imgEmpDayForDockPath = '';
                        return [4 /*yield*/, this.commonService.getServerIP()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.ipAddress = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
                                    htmlBuilder_5 = '';
                                    return htmlBuilder_5;
                                }
                            })];
                    case 65:
                        _a.sent();
                        return [4 /*yield*/, this.commonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.growlMessage = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
                                    htmlBuilder_5 = '';
                                    return htmlBuilder_5;
                                }
                            })];
                    case 66:
                        _a.sent();
                        phyname = void 0;
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        Curdate = this.frmDate;
                        strTitle = "\"" + "AtparVersion2.4.4" + "\"";
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder_5 += "<Table align= left width= 100 % cellpadding=0 cellspacing = 0 vAlign= top>";
                        if (reqType === "Print") {
                            htmlBuilder_5 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder_5 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_5 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder_5 += "<tr><td colspan=5 align=left><b><span class=c2>Deliver cycle time report from  " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + " </span></b></td><td align=right valign=top>&nbsp;";
                            htmlBuilder_5 += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType === "Mail") {
                                htmlBuilder_5 += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            }
                            else {
                                htmlBuilder_5 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            }
                            htmlBuilder_5 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_5 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0></tr>";
                            htmlBuilder_5 += "<tr><td colspan=5 align=left><b><span class=c2>Deliver cycle time report from " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder_5 += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> ";
                        htmlBuilder_5 += "<table align=left width=40% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                        htmlBuilder_5 += "<tr bgcolor=#d3d3d3>";
                        htmlBuilder_5 += "<td align=center nowrap><b><span class=c2>Less than (hours)</span></b></td>";
                        htmlBuilder_5 += "<td align=center nowrap><b><span class=c2>Count</span></b></td>";
                        htmlBuilder_5 += "<td align=center nowrap><b><span class=c2>%</span></b></td>";
                        htmlBuilder_5 += "</tr>";
                        for (i = 0; i <= this.lstCycleHourDetails.length - 1; i++) {
                            htmlBuilder_5 += "<tr>";
                            htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.lstCycleHourDetails[i].HOURSSUMMARY + "</span></td>";
                            htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.lstCycleHourDetails[i].COUNTSUMMARY + "</span></td>";
                            htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.lstCycleHourDetails[i].COUNT_PERCENTSUMMARY + "</span></td>";
                            htmlBuilder_5 += "</tr>";
                        }
                        htmlBuilder_5 += "</table></td></tr><tr><td colspan=2>";
                        htmlBuilder_5 += "<table align=left width=40% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
                        htmlBuilder_5 += "<tr bgcolor=#d3d3d3>";
                        htmlBuilder_5 += "<td align=center nowrap colspan=2><b><span class=c2>Results</span></b></td>";
                        htmlBuilder_5 += "</tr>";
                        htmlBuilder_5 += "<tr>";
                        htmlBuilder_5 += "<td align=center nowrap><span class=c2>COUNT</span></td>";
                        htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.Results[0].Count + "</span></td>";
                        htmlBuilder_5 += "</tr>";
                        htmlBuilder_5 += "<tr>";
                        htmlBuilder_5 += "<td align=center nowrap><span class=c2>AVG</span></td>";
                        htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.Results[0].AVG + "</span></td>";
                        htmlBuilder_5 += "</tr>";
                        htmlBuilder_5 += "<tr>";
                        htmlBuilder_5 += "<td align=center nowrap><span class=c2>ST.DEV</span></td>";
                        htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.Results[0].StDev + "</span></td>";
                        htmlBuilder_5 += "</tr>";
                        htmlBuilder_5 += "<tr>";
                        htmlBuilder_5 += "<td align=center nowrap><span class=c2>MAX</span></td>";
                        htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.Results[0].Max + "</span></td>";
                        htmlBuilder_5 += "</tr>";
                        htmlBuilder_5 += "<tr>";
                        htmlBuilder_5 += "<td align=center nowrap><span class=c2>MIN</span></td>";
                        htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.Results[0].Min + "</span></td>";
                        htmlBuilder_5 += "</tr>";
                        htmlBuilder_5 += "</table></td></tr><tr><td colspan=2>";
                        htmlBuilder_5 += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
                        htmlBuilder_5 += "<tr bgcolor=#d3d3d3>";
                        htmlBuilder_5 += "<td align=center nowrap ><b><span class=c2>Tracking #</span></b></td>";
                        htmlBuilder_5 += "<td align=center nowrap ><b><span class=c2>Delivery Person</span></b></td>";
                        htmlBuilder_5 += "<td align=center nowrap ><b><span class=c2>Cycle Time</span></b></td>";
                        htmlBuilder_5 += "<td align=center nowrap ><b><span class=c2>Hours</span></b></td>";
                        htmlBuilder_5 += "<td align=center nowrap ><b><span class=c2>Minutes</span></b></td>";
                        htmlBuilder_5 += "<td align=center nowrap ><b><span class=c2>Seconds</span></b></td>";
                        htmlBuilder_5 += "<td align=center nowrap><b><span class=c2>Total Hours</span></b></td>";
                        htmlBuilder_5 += "</tr>";
                        for (j = 0; j <= this.lstFinalCycleData.length - 1; j++) {
                            htmlBuilder_5 += "<tr>";
                            if (reqType === "Print") {
                                if (this.lstFinalCycleData[j].TRACKING_NBR == null || this.lstFinalCycleData[j].TRACKING_NBR === "") {
                                    this.lstFinalCycleData[j].TRACKING_NBR = "";
                                }
                                htmlBuilder_5 += "<td align=left nowrap><span class=c2>" + this.lstFinalCycleData[j].TRACKING_NBR + "</span></td>";
                            }
                            else {
                                if (this.lstFinalCycleData[j].TRACKING_NBR == null || this.lstFinalCycleData[j].TRACKING_NBR === "") {
                                    this.lstFinalCycleData[j].TRACKING_NBR = "";
                                }
                                htmlBuilder_5 += "<td align=left nowrap><span class=c2>" + this.lstFinalCycleData[j].TRACKING_NBR + "</span></td>";
                            }
                            htmlBuilder_5 += "<td align=left nowrap><span class=c2>" + this.lstFinalCycleData[j].DELIVER_FROM + "</span></td>";
                            htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.lstFinalCycleData[j].CYCLE_TIME + "</span></td>";
                            htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.lstFinalCycleData[j].HOURS + "</span></td>";
                            htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.lstFinalCycleData[j].MINS + "</span></td>";
                            htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.lstFinalCycleData[j].SECONDS + "</span></td>";
                            htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.lstFinalCycleData[j].TOT_HOURS + "</span></td>";
                            htmlBuilder_5 += "</tr>";
                        }
                        htmlBuilder_5 += "</table>";
                        htmlBuilder_5 += "</td></tr>";
                        htmlBuilder_5 += "</Table>";
                        return [2 /*return*/, htmlBuilder_5];
                    case 67:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "");
                        return [3 /*break*/, 68];
                    case 68: return [2 /*return*/];
                }
            });
        });
    };
    ProductivityReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    ProductivityReportComponent.prototype.selectedTab = function (option) {
    };
    ProductivityReportComponent.prototype.enableSelectedTab = function (option) {
        this.tabSelection = option;
        if (option != null) {
            this.activeTab = option.title;
        }
    };
    ProductivityReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    ProductivityReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ProductivityReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'deliver-productivity-report.component.html',
            providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, deliver_productivity_report_component_service_1.DeliverProductivityService]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            AtParConstants_1.AtParConstants,
            deliver_productivity_report_component_service_1.DeliverProductivityService,
            router_1.ActivatedRoute])
    ], ProductivityReportComponent);
    return ProductivityReportComponent;
}());
exports.ProductivityReportComponent = ProductivityReportComponent;
//# sourceMappingURL=deliver-productivity-report.component.js.map