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
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var stis_issue_report_service_1 = require("./stis-issue-report.service");
var file_saver_1 = require("file-saver");
var IssueReportComponent = (function () {
    function IssueReportComponent(spinnerService, atParCommonService, httpService, atParConstant, issueReportService) {
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.issueReportService = issueReportService;
        this.growlMessage = [];
        this.defDuration = 0;
        this.statusCode = -1;
        this.showGrid = false;
        this.isMailDialog = false;
        this.toDate = new Date();
        this.lstOrgGroupIds = [];
        this.lstStatus = [];
        this.lstBusinessUnits = [];
        this.lstUsers = [];
        this.lstIssueReport = [];
        this.breadCrumbMenu = new routepath_1.Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    IssueReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.lstStatus.push({ label: 'ALL', value: 'ALL' }, { label: 'Issued', value: '6' }, { label: 'Cancelled', value: '13' }, { label: 'Returned', value: '16' });
                        this.status = 'ALL';
                        this.lstBusinessUnits.push({ label: 'ALL', value: 'ALL' });
                        this.businessUnit = 'ALL';
                        this.lstUsers.push({ label: 'ALL', value: 'ALL' });
                        this.userID = 'ALL';
                        this.spinnerService.start();
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 2:
                        _a.sent();
                        if (!!this.showOrgDropdown) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getOrgGroupAllocInvBUnits()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getHeirarchyUsersList()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    IssueReportComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry).then(function (result) {
                                _this.spinnerService.stop();
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.defDuration = parseInt(res.DataVariable.toString());
                                        _this.fromDate = new Date();
                                        var d = _this.fromDate.getDate() - _this.defDuration;
                                        _this.fromDate.setDate(d);
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, 'getMyPreferences');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    IssueReportComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstOrgGroupIds = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        if (res.DataList.length == 1) {
                                            _this.showOrgDropdown = false;
                                            _this.orgGroupId = res.DataList[0].ORG_GROUP_ID + ' - ' + res.DataList[0].ORG_GROUP_NAME;
                                            _this.selectedOrgGroupID = res.DataList[0].ORG_GROUP_ID;
                                        }
                                        else {
                                            _this.showOrgDropdown = true;
                                            _this.lstOrgGroupIds.push({ label: 'Select One', value: 'Select One' });
                                            _this.selectedOrgGroupID = 'Select One';
                                            for (var i = 0; i < res.DataList.length; i++) {
                                                if (res.DataList[i].ORG_GROUP_ID.toUpperCase() != 'ALL') {
                                                    _this.lstOrgGroupIds.push({ label: (res.DataList[i].ORG_GROUP_ID + ' - ' + res.DataList[i].ORG_GROUP_NAME), value: res.DataList[i].ORG_GROUP_ID });
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    IssueReportComponent.prototype.getOrgGroupAllocInvBUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.issueReportService.getOrgGroupAllocInvBUnits(AtParEnums_2.EnumApps.StockIssue, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedOrgGroupID).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstBusinessUnits = [];
                                _this.businessUnit = '';
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstBusinessUnits.push({ label: 'ALL', value: 'ALL' });
                                        _this.businessUnit = 'ALL';
                                        for (var i = 0; i < res.DataList.length; i++) {
                                            _this.lstBusinessUnits.push({ label: res.DataList[i], value: res.DataList[i] });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        if (!_this.showOrgDropdown) {
                                            _this.lstBusinessUnits.push({ label: 'ALL', value: 'ALL' });
                                            _this.businessUnit = 'ALL';
                                        }
                                        else {
                                            _this.lstBusinessUnits.push({ label: 'Select One', value: '' });
                                            _this.businessUnit = '';
                                            if (res.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                                            }
                                            else {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "getOrgGroupAllocInvBUnits");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    IssueReportComponent.prototype.getHeirarchyUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getHeirarchyUsersList(AtParEnums_2.EnumApps.StockIssue, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedOrgGroupID).then(function (result) {
                                var res = result.json();
                                _this.lstUsers = [];
                                _this.lstUsers.push({ label: 'ALL', value: 'ALL' });
                                _this.userID = 'ALL';
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i < res.DataDictionary["pDSUserList"].Table1.length; i++) {
                                            _this.lstUsers.push({ label: res.DataDictionary["pDSUserList"].Table1[i].FULLNAME, value: res.DataDictionary["pDSUserList"].Table1[i].USER_ID });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "getHeirarchyUsersList");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    IssueReportComponent.prototype.ddlOrgGroup_SelectedIndexChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.selectedOrgGroupID = this.orgGroupId;
                        if (!(this.orgGroupId != 'Select One')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getOrgGroupAllocInvBUnits()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getHeirarchyUsersList()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.lstBusinessUnits = [];
                        this.lstBusinessUnits.push({ label: 'ALL', value: 'ALL' });
                        this.businessUnit = 'ALL';
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    IssueReportComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var todayDate, strUserID, i, strBU, i, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.growlMessage = [];
                        this.showGrid = false;
                        todayDate = new Date();
                        if (!(this.selectedOrgGroupID == 'Select One' || this.selectedOrgGroupID == undefined || this.selectedOrgGroupID == null)) return [3 /*break*/, 1];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(this.fromDate > this.toDate)) return [3 /*break*/, 2];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "FromDate must be less than Todate" });
                        return [3 /*break*/, 4];
                    case 2:
                        strUserID = '';
                        if (this.userID == 'ALL') {
                            if (this.lstUsers.length > 0) {
                                for (i = 0; i < this.lstUsers.length; i++) {
                                    if (strUserID != '') {
                                        strUserID = strUserID + ",'" + this.lstUsers[i].value + "'";
                                    }
                                    else {
                                        strUserID = "('" + this.lstUsers[i].value + "'";
                                    }
                                }
                                strUserID = strUserID + ")";
                            }
                            else {
                                strUserID = "(' " + "')";
                            }
                        }
                        else {
                            strUserID = "('" + this.userID + "')";
                        }
                        strBU = '';
                        if (this.businessUnit == 'ALL') {
                            if (this.lstBusinessUnits.length > 0) {
                                for (i = 0; i < this.lstBusinessUnits.length; i++) {
                                    if (strBU != '') {
                                        strBU = strBU + ",'" + this.lstBusinessUnits[i].value + "'";
                                    }
                                    else {
                                        strBU = "('" + this.lstBusinessUnits[i].value + "'";
                                    }
                                }
                                strBU = strBU + ")";
                            }
                            else {
                                strBU = "(' " + "')";
                            }
                        }
                        else {
                            strBU = "('" + this.businessUnit + "')";
                        }
                        this.deptID = this.deptID == undefined ? '' : this.deptID;
                        this.patientID = this.patientID == undefined ? '' : this.patientID;
                        this.issueUser = this.issueUser == undefined ? '' : this.issueUser;
                        this.itemID = this.itemID == undefined ? '' : this.itemID;
                        this.itemDesc = this.itemDesc == undefined ? '' : this.itemDesc;
                        this.issueLocation = this.issueLocation == undefined ? '' : this.issueLocation;
                        //this.strFromDate = this.fromDate.toLocaleDateString();
                        //this.strToDate = this.toDate.toLocaleDateString();
                        this.strFromDate = this.getDateString(this.fromDate);
                        this.strToDate = this.getDateString(this.toDate);
                        this.strUserID = this.userID;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.issueReportService.getIssueReport(strBU, strUserID, this.deptID, this.patientID, this.issueUser, this.itemID, this.itemDesc, '', this.strFromDate, this.strToDate, this.status, this.issueLocation, this.lstUsers).then(function (result) {
                                _this.spinnerService.stop();
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.showGrid = true;
                                        _this.lstIssueReport = res.DataDictionary["pDSUserList"].Table1;
                                        _this.replaceDS();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, 'btnGo_Click');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    IssueReportComponent.prototype.replaceDS = function () {
        for (var i = 0; i < this.lstIssueReport.length; i++) {
            if (this.lstIssueReport[i].STATUS == '13') {
                this.lstIssueReport[i].STATUS = 'Cancelled';
            }
            else if (this.lstIssueReport[i].STATUS == '16') {
                this.lstIssueReport[i].STATUS = 'Returned';
            }
            else {
                this.lstIssueReport[i].STATUS = 'Issued';
            }
            if (this.lstIssueReport[i].DEPT_ID == null || this.lstIssueReport[i].DEPT_ID == undefined) {
                this.lstIssueReport[i].DEPT_ID = '';
            }
            if (this.lstIssueReport[i].PATIENT_ID == null || this.lstIssueReport[i].PATIENT_ID == undefined) {
                this.lstIssueReport[i].PATIENT_ID = '';
            }
            if (this.lstIssueReport[i].ADJUST_TYPE == null || this.lstIssueReport[i].ADJUST_TYPE == undefined) {
                this.lstIssueReport[i].ADJUST_TYPE = '';
            }
            if (this.lstIssueReport[i].ISSUE_TO_USER == null || this.lstIssueReport[i].ISSUE_TO_USER == undefined) {
                this.lstIssueReport[i].ISSUE_TO_USER = '';
            }
            if (this.lstIssueReport[i].ISSUE_TO_LOCATION == null || this.lstIssueReport[i].ISSUE_TO_LOCATION == undefined) {
                this.lstIssueReport[i].ISSUE_TO_LOCATION = '';
            }
            this.lstIssueReport[i].ISSUEDATE_USER = this.lstIssueReport[i].ISSUE_DATE + '-' + this.lstIssueReport[i].USER_NAME;
            this.lstIssueReport[i].ITEMID_DESC = this.lstIssueReport[i].ITEM_ID + '-' + this.lstIssueReport[i].ITEM_DESC;
            this.lstIssueReport[i].QTY_UOM = this.lstIssueReport[i].QTY + '-' + this.lstIssueReport[i].UOM;
        }
    };
    IssueReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        //if (html != '' && html != null) {
                        //    var ua = window.navigator.userAgent;
                        //    var msie = ua.indexOf("MSIE ");
                        //    // If Internet Explorer
                        //    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                        //        this.statusCode = -1;
                        //        let folderName: string = '';
                        //        await this.atParCommonService.exportToExcel(html, "StockIssueReport", "StockIssueReport")
                        //            .then((res: Response) => {
                        //                let data = res.json();
                        //                this.statusCode = data.StatusCode;
                        //                if (this.statusCode.toString() == AtparStatusCodes.ATPAR_OK.toString()) {
                        //                    folderName = data.DataVariable.toString();
                        //                    var filename = this.httpService.BaseUrl + '/Uploaded/' + folderName + '/StockIssueReport.xls';
                        //                    var query = '?download';
                        //                    window.open(filename + query);
                        //                }
                        //                else {
                        //                    this.growlMessage = [];
                        //                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error.' });
                        //                }
                        //            });
                        //        await this.atParCommonService.deleteExcel(folderName, "StockIssueReport")
                        //            .then((res: Response) => {
                        //            });
                        //    } else {
                        //        var a = document.createElement('a');
                        //        var data_type = 'data:application/vnd.ms-excel';
                        //        html = html.replace(/ /g, '%20');
                        //        a.href = data_type + ', ' + html;
                        //        a.download = 'StockIssueReport.xls';
                        //        a.click();
                        //    }
                        //}
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "StockIssueReport.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, 'onExportToExcelClick');
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    IssueReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_7;
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
                            mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'Stock Issue Report' + '</title>');
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
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, 'onPrintClick');
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    IssueReportComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
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
    IssueReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_8;
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
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Email Server is Not Configured! Please Contact Administrator' });
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
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, 'onSendMailClick');
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    IssueReportComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, sigimgserverPath, i, ex_9;
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
                        //imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';
                        htmlBuilder = "<Table align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == "Print") {
                            htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=75% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=10 align=left><span class=c2>Issue Report for <b>" + this.userID + "</b> between <b>" + this.strFromDate + "</b> and <b>" + this.strToDate + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            htmlBuilder += "<TR width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td></TR>";
                            htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=10 align=left><span class=c2>Issue Report for <b>" + this.strUserID + "</b> between <b>" + this.strFromDate + "</b> and <b>" + this.strToDate + "</b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr> ";
                        htmlBuilder += "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
                        htmlBuilder += "<tr>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Issue Date-User</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>";
                        htmlBuilder += "Issue To Location/Company</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Issue To User</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Business Unit</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Dept ID</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Item ID - Item Description</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Qty - UOM</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Patient ID</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Adjustment Type</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Status</b></span></td>";
                        htmlBuilder += "<td align=center nowrap width=170><span class=c2><b>Signature </b></span><td>";
                        htmlBuilder += "</tr>";
                        sigimgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/Uploaded/';
                        for (i = 0; i < this.lstIssueReport.length; i++) {
                            htmlBuilder += "<tr height=90>";
                            htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstIssueReport[i].ISSUE_DATE + " - "
                                + this.lstIssueReport[i].USER_NAME + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstIssueReport[i].ISSUE_TO_LOCATION + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstIssueReport[i].ISSUE_TO_USER + "</span></td>";
                            htmlBuilder += "<td align=left ><span class=c2>" + this.lstIssueReport[i].BUSINESS_UNIT + "</span></td>";
                            htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstIssueReport[i].DEPT_ID + "</span></td>";
                            htmlBuilder += "<td align=left wrap><span class=c2>" + this.lstIssueReport[i].ITEM_ID + " - " + this.lstIssueReport[i].ITEM_DESC + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstIssueReport[i].QTY + " - " + this.lstIssueReport[i].UOM + "</span></td>";
                            htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstIssueReport[i].PATIENT_ID + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstIssueReport[i].ADJUST_TYPE + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstIssueReport[i].STATUS + "</span></td>";
                            if (this.lstIssueReport[i].SIGNATURE != null) {
                                htmlBuilder += "<td border==#ffffff nowrap>&nbsp;<center><img  src=" + sigimgserverPath + this.lstIssueReport[i].TRANS_ID + ".jpg></td>";
                            }
                            else {
                                htmlBuilder += "<td border==#ffffff nowrap>&nbsp;<center></td>";
                            }
                            htmlBuilder += "</tr>";
                        }
                        htmlBuilder += "</table>";
                        htmlBuilder += "</td></td></Table>";
                        return [4 /*yield*/, htmlBuilder];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        ex_9 = _a.sent();
                        htmlBuilder = '';
                        this.clientErrorMsg(ex_9, 'exportReportDetails');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    IssueReportComponent.prototype.getDateString = function (MyDate) {
        var MyDateString = ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/' + ('0' + MyDate.getDate()).slice(-2) + '/' + MyDate.getFullYear();
        return MyDateString;
    };
    IssueReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    IssueReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    IssueReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    IssueReportComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], IssueReportComponent.prototype, "appId", void 0);
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], IssueReportComponent.prototype, "dataTableComponent", void 0);
    IssueReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'stis-issue-report.component.html',
            providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, stis_issue_report_service_1.IssueReportService],
        }),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            stis_issue_report_service_1.IssueReportService])
    ], IssueReportComponent);
    return IssueReportComponent;
}());
exports.IssueReportComponent = IssueReportComponent;
//# sourceMappingURL=stis-issue-report.component.js.map