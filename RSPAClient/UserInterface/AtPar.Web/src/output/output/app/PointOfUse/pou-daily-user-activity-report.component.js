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
/// <reference path="../entities/vm_transaction.ts" />
var core_1 = require("@angular/core");
var datatableservice_1 = require("./../components/datatable/datatableservice");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var file_saver_1 = require("file-saver");
var pou_daily_user_activity_report_service_1 = require("./pou-daily-user-activity-report.service");
var DailyUserActivityReportComponent = (function () {
    function DailyUserActivityReportComponent(spinnerService, atParCommonService, httpService, atParConstant, dailyUserActivityReportService) {
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.dailyUserActivityReportService = dailyUserActivityReportService;
        this.growlMessage = [];
        this.lstTransactionType = [];
        this.lstUsers = [];
        this.UserID = '';
        this.selectedTransType = '';
        this.selectedUser = '';
        this.tdExports = false;
        this.isMailDialog = false;
        this.toMailAddr = '';
        this.statusCode = -1;
        this.lstActivityDetails = [];
        this.lstActivitySummary = [];
        this.activitysummary = [];
        this.showGrid = false;
        this.showexport = false;
        this.ClinicalGrid = false;
        this.ClinalType = false;
        this.Supply = false;
        this.CaseCart = false;
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    DailyUserActivityReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.toDate = new Date();
                        this.lstTransactionType = [];
                        this.lstTransactionType.push({ label: "Select Trans Type", value: "-1" }, { label: "Clinical", value: "0" }, { label: "Supply Chain", value: "1" }, { label: "Case Cart", value: "2" });
                        this.selectedTransType = this.lstTransactionType[0].value;
                        return [4 /*yield*/, this.bindUsersList()];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    DailyUserActivityReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    DailyUserActivityReportComponent.prototype.bindUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.lstUsers = [];
                        this.lstUsers.push({ label: "Select User", value: "Select User" });
                        this.selectedUser = this.lstUsers[0].value;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getUsersList(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_2.EnumApps.PointOfUse, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstUsers.push({
                                                label: data.DataList[i].FULLNAME,
                                                value: data.DataList[i].USER_ID
                                            });
                                        }
                                        if (_this.lstUsers.length <= 0 || _this.lstUsers == null) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No users Available' });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        console.log(ex_1);
                        this.clientErrorMsg(ex_1, 'bindUsersList');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DailyUserActivityReportComponent.prototype.ddlUser_SelectedIndexChanged = function (e) {
        this.strTempUser = e.label;
    };
    DailyUserActivityReportComponent.prototype.BindActivityDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnValue, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.growlMessage = [];
                        returnValue = false;
                        return [4 /*yield*/, this.validateSearchFields()];
                    case 1:
                        returnValue = _a.sent();
                        if (!returnValue) return [3 /*break*/, 3];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.getActivityDetails()];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        ex_2 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DailyUserActivityReportComponent.prototype.getActivityDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var Tdate, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        Tdate = this.convertDateFormate(this.toDate.toDateString());
                        this.strDate = Tdate;
                        this.strUserID = this.strTempUser;
                        this.lstActivityDetails = [];
                        this.lstActivitySummary = [];
                        this.activitysummary = [];
                        this.ClinalType = false;
                        this.Supply = false;
                        this.CaseCart = false;
                        this.showexport = false;
                        this.activityType1 = '';
                        this.activityType2 = '';
                        return [4 /*yield*/, this.dailyUserActivityReportService.getDailyUserActivityRep(this.selectedUser, this.selectedTransType, Tdate, AtParEnums_2.EnumApps.PointOfUse).then(function (res) {
                                var data = res.json();
                                console.log(data);
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success:
                                        {
                                            if (data.DataDictionary["pReturnDS"].DETAILS.length == 0) {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No records found' });
                                                break;
                                            }
                                            _this.lstActivityDetails = data.DataDictionary["pReturnDS"].DETAILS;
                                            _this.lstActivitySummary = data.DataDictionary["pReturnDS"].SUMMARY;
                                            if (_this.selectedTransType == "0") {
                                                _this.ClinalType = true;
                                                _this.activityType1 = 'Issues';
                                                _this.activityType2 = 'Returns';
                                            }
                                            else if (_this.selectedTransType == "1") {
                                                _this.Supply = true;
                                                _this.activityType1 = 'Count';
                                                _this.activityType2 = 'PutAway';
                                            }
                                            else if (_this.selectedTransType == "2") {
                                                _this.CaseCart = true;
                                                _this.activityType1 = 'Case Pick';
                                                _this.activityType2 = 'Case Return';
                                            }
                                            for (var i in _this.lstActivityDetails) {
                                                if (_this.lstActivityDetails[i].STATUS == AtParEnums_1.AppTransactionStatus.Returned || _this.lstActivityDetails[i].STATUS == AtParEnums_1.AppTransactionStatus.PutAway || _this.lstActivityDetails[i].STATUS == AtParEnums_1.CASE_PICK_STATUS.CLOSED || _this.lstActivityDetails[i].STATUS == AtParEnums_1.CASE_PICK_STATUS.REMOVE || _this.lstActivityDetails[i].STATUS == AtParEnums_1.CASE_PICK_STATUS.REVIEWED || _this.lstActivityDetails[i].STATUS == AtParEnums_1.CASE_PICK_STATUS.RETURNED) {
                                                    _this.lstActivityDetails[i].rowClsStyle = 'ui-datatable-grey';
                                                }
                                                else {
                                                    _this.lstActivityDetails[i].rowClsStyle = 'ui-datatable-lightgrey';
                                                }
                                            }
                                            _this.showexport = true;
                                            _this.ClinicalGrid = true;
                                            break;
                                        }
                                    case AtParEnums_2.StatusType.Warn:
                                        {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, 'getActivityDetails');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DailyUserActivityReportComponent.prototype.validateSearchFields = function () {
        this.growlMessage = [];
        this.ClinicalGrid = false;
        try {
            if (this.selectedUser == "Select User" || this.selectedUser == undefined || this.selectedUser == "") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select User" });
                return false;
            }
            if (this.selectedTransType == "-1" || this.selectedTransType == undefined || this.selectedTransType == "") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Transaction Type" });
                return false;
            }
            if (Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormate(this.toDate)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'validateSearchFields');
            return false;
        }
    };
    DailyUserActivityReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        blob = new Blob([html], {
                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                        });
                        file_saver_1.saveAs(blob, "DailyUserActivity.xls");
                        return [3 /*break*/, 4];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, 'onExportToExcelClick');
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DailyUserActivityReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Print')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            mywindow = window.open(document.URL, null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'POU - Daily User Activity Report' + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                mywindow.document.close(); // necessary for IE >= 10
                                mywindow.focus(); // necessary for IE >= 10*/                   
                                return [2 /*return*/, true];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, 'onPrintClick');
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DailyUserActivityReportComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.isMailDialog = true;
                    this.toMailAddr = '';
                }
                catch (ex) {
                    this.clientErrorMsg(ex, 'onSendMailIconClick');
                }
                return [2 /*return*/];
            });
        });
    };
    DailyUserActivityReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_6;
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
                        toAddr = '';
                        this.isMailDialog = false;
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.atParCommonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Stock Issue Report', JSON.stringify(html), this.toMailAddr, AtParEnums_2.MailPriority.Normal.toString(), '')
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
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, 'onSendMailClick');
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DailyUserActivityReportComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, lstActivityDetailssigimgserverPath, i, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        return [4 /*yield*/, this.atParCommonService.getServerIP()
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
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.atParCommonService.getSSLConfigDetails()
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
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 3:
                        _a.sent();
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';
                        htmlBuilder = "<Table align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == "Print") {
                            htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=75% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=10 align=left><span class=c2>Daily User Activity of User: " + this.strUserID + " for the date: " + this.strDate + "</span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            htmlBuilder += "<TR width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td></TR>";
                            htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=10 align=left><span class=c2>Daily User Activity of User: " + this.strUserID + " for the date: " + this.strDate + "</span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr> ";
                        htmlBuilder += "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                        htmlBuilder += "<tr>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Org ID</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Start Time (HH24:MI:SS)</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>End Time (HH24:MI:SS)</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Total Time (HH:MI:SS)</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Issues / Returns</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Scanned</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Workstation ID / Device ID</b></span></td>";
                        htmlBuilder += "</tr>";
                        lstActivityDetailssigimgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/Uploaded/';
                        for (i = 0; i < this.lstActivityDetails.length; i++) {
                            htmlBuilder += "<tr height=90>";
                            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivityDetails[i].BUSINESS_UNIT + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivityDetails[i].START_TIME + "</span></td>";
                            htmlBuilder += "<td align=left ><span class=c2>" + this.lstActivityDetails[i].END_TIME + "</span></td>";
                            htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstActivityDetails[i].TOTAL_TIME + "</span></td>";
                            htmlBuilder += "<td align=left wrap><span class=c2>" + this.lstActivityDetails[i].TOTAL_REC_SENT + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivityDetails[i].SCANS_COUNT + "</span></td>";
                            htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstActivityDetails[i].DEVICE_ID + "</span></td>";
                            htmlBuilder += "</tr>";
                        }
                        htmlBuilder += "</table>";
                        htmlBuilder += "</br>";
                        htmlBuilder += "</br>";
                        htmlBuilder += "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                        htmlBuilder += "<tr>";
                        htmlBuilder += "<td align=center nowrap colspan=2><span class=c2><b>" + this.activityType1 + "</b></span></td>";
                        htmlBuilder += "<td align=center nowrap colspan=2><span class=c2><b>" + this.activityType2 + "</b></span></td>";
                        htmlBuilder += "</tr>";
                        htmlBuilder += "<tr>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>Total transaction time</span></td>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].TOT_ISSUE_TIME + "</span></td>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>Total transaction time</span></td>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].TOT_RETURN_TIME + "</span></td>";
                        htmlBuilder += "</tr>";
                        htmlBuilder += "<tr>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>Average time taken for a transaction</span></td>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].AVG_ISSUE_TIME + "</span></td>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>Average time taken for a transaction</span></td>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].AVG_RETURN_TIME + "</span></td>";
                        htmlBuilder += "</tr>";
                        htmlBuilder += "<tr>";
                        if (this.ClinalType == true) {
                            htmlBuilder += "<td align=left nowrap><span class=c2>Total items Issued</span></td>";
                        }
                        else {
                            htmlBuilder += "<td align=left nowrap><span class=c2>Total items " + this.activityType1 + "</span></td>";
                        }
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].TOT_ISSUE_ITEMS + "</span></td>";
                        if (this.ClinalType == true) {
                            htmlBuilder += "<td align=left nowrap><span class=c2>Total items Returned</span></td>";
                        }
                        else {
                            htmlBuilder += "<td align=left nowrap><span class=c2>Total items " + this.activityType2 + "</span></td>";
                        }
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].TOT_RETURN_ITEMS + "</span></td>";
                        htmlBuilder += "</tr>";
                        htmlBuilder += "<tr>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>Maximum time taken for a transaction</span></td>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].MAX_ISSUE_TIME + "</span></td>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>Maximum time taken for a transaction</span></td>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].MAX_RETURN_TIME + "</span></td>";
                        htmlBuilder += "</tr>";
                        htmlBuilder += "<tr>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>Minimum time taken for a transaction</span></td>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].MIN_ISSUE_TIME + "</span></td>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>Minimum time taken for a transaction</span></td>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].MIN_RETURN_TIME + "</span></td>";
                        htmlBuilder += "</tr>";
                        htmlBuilder += "<tr>";
                        htmlBuilder += "<td align=left colspan=4><span class=c2>Total Time : " + this.lstActivitySummary[0].TOT_TIME + " </span></td>";
                        htmlBuilder += "</tr>";
                        htmlBuilder += "</table>";
                        htmlBuilder += "</td></td>";
                        htmlBuilder += "</Table>";
                        return [4 /*yield*/, htmlBuilder];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        ex_7 = _a.sent();
                        htmlBuilder = '';
                        this.clientErrorMsg(ex_7, 'exportReportDetails');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DailyUserActivityReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    DailyUserActivityReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    DailyUserActivityReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    DailyUserActivityReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-daily-user-activity-report.component.html',
            providers: [atpar_common_service_1.AtParCommonService, pou_daily_user_activity_report_service_1.DailyUserActivityReportService, AtParConstants_1.AtParConstants, datatableservice_1.datatableservice]
        }),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            pou_daily_user_activity_report_service_1.DailyUserActivityReportService])
    ], DailyUserActivityReportComponent);
    return DailyUserActivityReportComponent;
}());
exports.DailyUserActivityReportComponent = DailyUserActivityReportComponent;
//# sourceMappingURL=pou-daily-user-activity-report.component.js.map