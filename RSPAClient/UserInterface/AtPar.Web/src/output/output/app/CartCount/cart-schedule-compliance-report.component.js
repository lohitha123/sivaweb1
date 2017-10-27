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
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var HttpService_1 = require("../Shared/HttpService");
var cart_schedule_compliance_report_service_1 = require("./cart-schedule-compliance-report.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var routepath_1 = require("../AtPar/Menus/routepath");
var file_saver_1 = require("file-saver");
var router_1 = require("@angular/router");
var ScheduleComplianceReportComponent = (function () {
    function ScheduleComplianceReportComponent(httpService, commonService, spinnerService, atParConstant, scheduleComplianceServices, route) {
        this.httpService = httpService;
        this.commonService = commonService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.scheduleComplianceServices = scheduleComplianceServices;
        this.route = route;
        this.growlMessage = [];
        this.devicetokenentry = [];
        this.userId = "";
        this.orgGrpId = "";
        this.blnShowOrgGroupIdDropDown = false;
        this.blnShowOrgGroupIdLabel = false;
        this.orgGrpIdData = "";
        this.statusCode = -1;
        this.lstOrgGroups = [];
        this.lstUsers = [];
        this.lstMulUsers = [];
        //orgGroupIDForUserUpdate: string = "";
        this.selectedOrgGroupId = "";
        this.orgGroupID = "";
        this.onDate = "";
        this.orgGrp = "";
        // serverUser: string = "";
        this.isLblVisible = false;
        this.showGrid = false;
        this.selectedDropDownUserId = "";
        this.usersID = "";
        this.blnTotal = false;
        this.lstOutputSchedule = [];
        this.gstrProtocal = "";
        this.string = "";
        this.gstrPortNo = "";
        this.ipAddress = "";
        this.isMailDialog = false;
        this.toMailAddr = '';
        this.tdExports = false;
        this.queryOrgGrpId = '';
        this.queryUserId = '';
        this.queryFirstname = '';
        this.queryLastname = '';
        this.queryMiddleInitial = '';
        this.fullUserId = '';
        try {
            this.spinnerService.start();
            this.breadCrumbMenu = new routepath_1.Menus();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "constr");
        }
        this.spinnerService.stop();
    }
    ScheduleComplianceReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var dateStr, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.devicetokenentry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.userId = this.devicetokenentry[AtParEnums_1.TokenEntry_Enum.UserID.toString()];
                        this.orgGrpId = this.devicetokenentry[AtParEnums_1.TokenEntry_Enum.OrgGrpID.toString()];
                        this.ondate = new Date();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        this.bindOrgGroups();
                        this.route.queryParams.subscribe(function (params) {
                            _this.queryUserId = decodeURI(params["p2value"]).replace(/%20/g, ' ');
                            _this.queryOrgGrpId = decodeURI(params["p3value"]).replace(/%20/g, ' ');
                            _this.queryDate = decodeURI(params["p4value"]).replace(/%20/g, ' ');
                            _this.queryFirstname = decodeURI(params["p5value"]).replace(/%20/g, ' ');
                            _this.queryLastname = decodeURI(params["p6value"]).replace(/%20/g, ' ');
                            _this.queryMiddleInitial = decodeURI(params["p7value"]).replace(/%20/g, ' ');
                        });
                        if (!(this.queryOrgGrpId != '' && this.queryOrgGrpId != 'null' && this.queryOrgGrpId != 'undefined' && this.queryUserId != '' && this.queryUserId != 'null' && this.queryUserId != 'undefined')) return [3 /*break*/, 3];
                        if (this.blnShowOrgGroupIdLabel == true) {
                            this.orgGrpIdData = this.queryOrgGrpId;
                        }
                        else {
                            this.selectedOrgGroupId = this.queryOrgGrpId;
                        }
                        this.fullUserId = this.queryFirstname + ' ' + this.queryMiddleInitial + ' ' + this.queryLastname + ' (' + this.queryUserId + ')';
                        this.selectedDropDownUserId = this.queryUserId;
                        dateStr = new Date(this.queryDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        this.ondate = new Date(dateStr);
                        return [4 /*yield*/, this.goClick()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "oninit");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleComplianceReportComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.devicetokenentry[AtParEnums_1.TokenEntry_Enum.UserID], this.devicetokenentry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupIdLabel = true;
                                            _this.orgGrpIdData = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            //this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.bindUsersList();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupIdDropDown = true;
                                            _this.lstOrgGroups = [];
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            _this.lstUsers = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
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
    ScheduleComplianceReportComponent.prototype.bindUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.blnShowOrgGroupIdLabel) {
                            this.orgGroupID = this.orgGrpIdData.split("-")[0];
                        }
                        else {
                            this.orgGroupID = this.selectedOrgGroupId;
                        }
                        //this.lstUsers = [];
                        //this.lstUsers.push({ label: "All", value: "All" });
                        return [4 /*yield*/, this.scheduleComplianceServices.getHeirarchyUsersList(this.orgGroupID, AtParEnums_1.EnumApps.CartCount, this.devicetokenentry[AtParEnums_1.TokenEntry_Enum.UserID]).then(function (result) {
                                var res = result.json();
                                _this.lstUsers = [];
                                _this.lstUsers.push({ label: "Select User", value: "" });
                                _this.lstUsers.push({ label: 'All', value: 'All' });
                                //this.userID = 'ALL';
                                switch (res.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        for (var i = 0; i < res.DataDictionary["pDSUserList"].Table1.length; i++) {
                                            _this.lstUsers.push({ label: res.DataDictionary["pDSUserList"].Table1[i].FULLNAME, value: res.DataDictionary["pDSUserList"].Table1[i].USER_ID });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        //this.lstUsers = [];
                        //this.lstUsers.push({ label: "All", value: "All" });
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ScheduleComplianceReportComponent.prototype.ddlOrgGroupChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    if (this.blnShowOrgGroupIdLabel) {
                        this.bindUsersList();
                    }
                    else if (this.blnShowOrgGroupIdDropDown) {
                        if (this.selectedOrgGroupId == "Select One") {
                            this.lstUsers = [];
                            this.lstUsers.push({ label: "Select User", value: "" });
                            return [2 /*return*/];
                        }
                        else {
                            this.bindUsersList();
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "ddlOrgGroupChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    ScheduleComplianceReportComponent.prototype.goClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var result, i, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.showGrid = false;
                        this.isLblVisible = false;
                        this.growlMessage = [];
                        result = false;
                        this.blnTotal = false;
                        result = this.validateSearchFields();
                        if (!result) return [3 /*break*/, 2];
                        this.usersID = "";
                        this.lstScheduleDetails = [];
                        this.lstUserDetails = [];
                        if (this.selectedDropDownUserId == "All") {
                            for (i = 0; i < this.lstUsers.length; i++) {
                                if (this.lstUsers[i].value !== "All" && this.lstUsers[i].value !== "") {
                                    this.usersID = this.usersID.concat("'", this.lstUsers[i].value, "',");
                                }
                            }
                            this.usersID = this.usersID.substring(0, this.usersID.length - 1);
                        }
                        else {
                            this.usersID = this.selectedDropDownUserId;
                        }
                        this.onDate = this.convertDateFormate(this.ondate);
                        if (this.blnShowOrgGroupIdLabel == true) {
                            this.orgGrp = this.devicetokenentry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        }
                        else {
                            this.orgGrp = this.selectedOrgGroupId.split("-")[0];
                        }
                        return [4 /*yield*/, this.scheduleComplianceServices.getcomplianceReport(this.userId, this.usersID, this.onDate, this.orgGrp)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstOutputSchedule = [];
                                        _this.lstScheduleDetails = data.DataDictionary.dsCompRep["Records"];
                                        _this.lstUserDetails = data.DataDictionary.dsCompRep["UsersList"];
                                        _this.lstMulUsers = new Array();
                                        if (_this.lstScheduleDetails.length > 0) {
                                            for (var j in _this.lstScheduleDetails) {
                                                if (_this.lstScheduleDetails[j].STATUS == 0) {
                                                    _this.lstScheduleDetails[j].COLOR = "green";
                                                }
                                                else if (_this.lstScheduleDetails[j].STATUS == 2) {
                                                    _this.lstScheduleDetails[j].COLOR = "red";
                                                }
                                                else {
                                                    _this.lstScheduleDetails[j].COLOR = "gray";
                                                }
                                            }
                                            for (var i_1 in _this.lstUserDetails) {
                                                var mulUsers = _this.lstScheduleDetails.filter(function (a) { return a.USER_ID == _this.lstUserDetails[i_1].USER_ID; });
                                                var fulluserId = _this.lstUserDetails[i_1].FIRST_NAME + " " + _this.lstUserDetails[i_1].MIDDLE_INITIAL + " " + _this.lstUserDetails[i_1].LAST_NAME + " (" + _this.lstUserDetails[i_1].USER_ID + ")";
                                                _this.lstOutputSchedule.push({
                                                    USER_ID: fulluserId,
                                                    SCHEDULEDETAILS: mulUsers
                                                });
                                            }
                                            if (_this.lstScheduleDetails.length > 0) {
                                                _this.showGrid = true;
                                                _this.isLblVisible = true;
                                                _this.blnTotal = true;
                                                _this.tdExports = true;
                                            }
                                        }
                                        else {
                                            _this.showGrid = false;
                                            _this.isLblVisible = false;
                                            var result_1 = false;
                                            _this.blnTotal = false;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.isLblVisible = false;
                                        var result_2 = false;
                                        _this.blnTotal = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.isLblVisible = false;
                                        var result_3 = false;
                                        _this.blnTotal = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.isLblVisible = false;
                                        var result_4 = false;
                                        _this.blnTotal = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "goClick");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleComplianceReportComponent.prototype.setbackGroundColor = function (x, opt) {
        try {
            if (opt.STATUS != null) {
                if (opt.STATUS == 0) {
                    x.parentNode.parentNode.style.background = "green";
                }
                else if (opt.STATUS == 1) {
                    x.parentNode.parentNode.style.background = "grey";
                }
                else if (opt.STATUS == 2) {
                    x.parentNode.parentNode.style.background = "red";
                }
            }
        }
        catch (ex) {
        }
    };
    ScheduleComplianceReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    ScheduleComplianceReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ScheduleComplianceReportComponent.prototype.validateSearchFields = function () {
        try {
            this.growlMessage = [];
            if ((this.blnShowOrgGroupIdDropDown == true) && (this.selectedOrgGroupId == 'Select One' || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "")) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select valid Org Group ID" });
                this.showGrid = false;
                this.isLblVisible = false;
                var result = false;
                this.blnTotal = false;
                this.tdExports = false;
                return false;
            }
            else if ((this.selectedDropDownUserId == null || this.selectedDropDownUserId == undefined || this.selectedDropDownUserId == "" || this.selectedDropDownUserId == 'Select User')) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select User" });
                this.showGrid = false;
                this.isLblVisible = false;
                var result = false;
                this.blnTotal = false;
                this.tdExports = false;
                return false;
            }
            else if (this.ondate == null || this.ondate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                this.showGrid = false;
                this.isLblVisible = false;
                var result = false;
                this.blnTotal = false;
                this.tdExports = false;
                return false;
            }
            else if (Date.parse(this.ondate.toString())) {
                if (Date.parse(this.convertDateFormate(this.ondate)) > Date.parse(this.convertDateFormate(Date.now()))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Date must be less than or equal to current date' });
                    this.showGrid = false;
                    this.isLblVisible = false;
                    var result = false;
                    this.blnTotal = false;
                    this.tdExports = false;
                    return false;
                }
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "validateSearchFields");
            return false;
        }
    };
    ScheduleComplianceReportComponent.prototype.ExportReportReview = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, _DS, imgserverPath, schdate, title, i, scheduledtls, j, ex_4;
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
                        _DS = [];
                        imgserverPath = '';
                        return [4 /*yield*/, this.commonService.getServerIP()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ipAddress = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.commonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.growlMessage = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 3:
                        _a.sent();
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';
                        schdate = new Date(this.ondate);
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder += "<Table align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=75% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td align=left colspan=2><span class=c2>Schedule Compliance Report for " + this.dayOfWeekAsString(schdate.getDay() - 1) + " (" + this.convertDateFormate(this.onDate) + ")" + "</b></span></td>";
                            htmlBuilder += "<td align=right><img src=" + imgserverPath + "GreenBox.bmp>&nbsp;&nbsp;&nbsp;<b>Counted in time</b></td>";
                            htmlBuilder += "<td align=right><img src=" + imgserverPath + "GrayBox.bmp>&nbsp;&nbsp;&nbsp;<b>Counted after time</b></td>";
                            htmlBuilder += "<td align=right><img src=" + imgserverPath + "RedBox.bmp>&nbsp;&nbsp;&nbsp;<b>Not Counted</b></td>";
                            htmlBuilder += "<td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else if (reqType == 'Excel') {
                            htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            htmlBuilder += "<TR  height='27px'><TD height='27px'  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td align=left colspan=3><span class=c2>Schedule Compliance Report for " + this.dayOfWeekAsString(schdate.getDay() - 1) + " (" + this.convertDateFormate(this.onDate) + ")" + "</b></span></td>";
                            htmlBuilder += "<td><img src=" + imgserverPath + "GreenBox.bmp>&nbsp;&nbsp;&nbsp;<span class=c2><b>Counted in time&nbsp;&nbsp;</b></span></td>";
                            htmlBuilder += "<td><img src=" + imgserverPath + "GrayBox.bmp>&nbsp;&nbsp;&nbsp;<span class=c2><b>Counted after time&nbsp;&nbsp;</b></span></td>";
                            htmlBuilder += "<td><img src=" + imgserverPath + "RedBox.bmp>&nbsp;&nbsp;&nbsp;<span class=c2><b>Not Counted</b></span></td>";
                            htmlBuilder += "<td align=right valign=top>&nbsp;";
                        }
                        else {
                            htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            htmlBuilder += "<TR  height='27px'><TD height='27px'  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td align=left colspan=3><span class=c2>Schedule Compliance Report for " + this.dayOfWeekAsString(schdate.getDay() - 1) + " (" + this.convertDateFormate(this.onDate) + ")" + "</b></span></td>";
                            htmlBuilder += "<td><img src=" + imgserverPath + "GreenBox.bmp>&nbsp;&nbsp;&nbsp;<span class=c2><b>Counted in time&nbsp;&nbsp;</b></span></td>";
                            htmlBuilder += "<td><img src=" + imgserverPath + "GrayBox.bmp>&nbsp;&nbsp;&nbsp;<span class=c2><b>Counted after time&nbsp;&nbsp;</b></span></td>";
                            htmlBuilder += "<td><img src=" + imgserverPath + "RedBox.bmp>&nbsp;&nbsp;&nbsp;<span class=c2><b>Not Counted</b></span></td>";
                            htmlBuilder += "<td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr> ";
                        for (i = 0; i <= this.lstOutputSchedule.length - 1; i++) {
                            scheduledtls = [];
                            scheduledtls = this.lstOutputSchedule[i].SCHEDULEDETAILS;
                            htmlBuilder += "<tr><td><table align=center width=90% style=BORDER-COLLAPSE:collapse border=1>";
                            htmlBuilder += "<tr><td align=center colspan=6><span class=c3>" + this.lstOutputSchedule[i].USER_ID + "</span></td></tr>";
                            htmlBuilder += "<tr>";
                            htmlBuilder += "<td align=center nowrap><span class=c3><b>Status</b></span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3><b>Business Unit/Company</b></span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3><b>Cart ID/Par Location</b></span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3><b>Scheduled to count before</b></span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3><b>Actual Count time</b></span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3><b>Deviation (mins)</b></span></td>";
                            htmlBuilder += "</tr>";
                            for (j = 0; j <= this.lstOutputSchedule[i].SCHEDULEDETAILS.length - 1; j++) {
                                htmlBuilder += "<tr>";
                                if (this.lstOutputSchedule[i].SCHEDULEDETAILS[j].STATUS == 0) {
                                    htmlBuilder += "<td style=background-color:Green ></td>";
                                }
                                else if (this.lstOutputSchedule[i].SCHEDULEDETAILS[j].STATUS == 1) {
                                    htmlBuilder += "<td style=background-color:Gray ></td>";
                                }
                                else if (this.lstOutputSchedule[i].SCHEDULEDETAILS[j].STATUS == 2) {
                                    htmlBuilder += "<td style=background-color:Red ></td>";
                                }
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstOutputSchedule[i].SCHEDULEDETAILS[j].BUSINESS_UNIT + "</span></td>";
                                htmlBuilder += "<td align=left style='mso-number-format:\@;' nowrap><span class=c3>" + this.lstOutputSchedule[i].SCHEDULEDETAILS[j].CART_ID + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstOutputSchedule[i].SCHEDULEDETAILS[j].COUNT_BEFORE + "</span></td>";
                                htmlBuilder += "<td align=left ><span class=c3>" + this.lstOutputSchedule[i].SCHEDULEDETAILS[j].ACTUAL_COUNT_TIME + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstOutputSchedule[i].SCHEDULEDETAILS[j].TIME_DIFFERENCE + "</span></td>";
                                htmlBuilder += "</tr>";
                            }
                            htmlBuilder += "</table></td></tr>";
                        }
                        htmlBuilder += "</Table>";
                        htmlBuilder = htmlBuilder.replace(/null/gi, '');
                        return [4 /*yield*/, htmlBuilder];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "ExportReportReview");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleComplianceReportComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
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
    ScheduleComplianceReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_5;
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
                        this.isMailDialog = false;
                        return [4 /*yield*/, this.ExportReportReview('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        html.replace('null', '');
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmail(this.devicetokenentry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Schedule Compliance Report', JSON.stringify(html), this.toMailAddr, AtParEnums_1.MailPriority.Normal.toString(), '')
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
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, 'onSendMailClick');
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleComplianceReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.ExportReportReview('Print')];
                    case 1:
                        html = _a.sent();
                        html.replace('null', '');
                        if (html != '' && html != null) {
                            mywindow = window.open(document.URL, null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'Cart Count - Schedule Compliance Report' + '</title>');
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
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "onPrintClick");
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleComplianceReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.growlMessage = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.ExportReportReview('Excel')];
                    case 1:
                        html = _a.sent();
                        html.replace('null', '');
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "ScheduleComplianceReport.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, 'onExportToExcelClick');
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleComplianceReportComponent.prototype.validateEmail = function (email) {
        var ret = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return ret.test(email);
    };
    ScheduleComplianceReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    ScheduleComplianceReportComponent.prototype.OnDestroy = function () {
        this.lstUsers = null;
        this.growlMessage = [];
        this.orgGroupData = null;
        this.lstOrgGroups = null;
        this.lstScheduleDetails = null;
        this.lstMulUsers = null;
        this.lstUserDetails = null;
        this.lstOutputSchedule = null;
    };
    ScheduleComplianceReportComponent.prototype.dayOfWeekAsString = function (dayIndex) {
        return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][dayIndex];
    };
    ScheduleComplianceReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'cart-schedule-compliance-report.component.html',
            providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, cart_schedule_compliance_report_service_1.CartScheduleComplianceReportServices]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            atpar_common_service_1.AtParCommonService,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            cart_schedule_compliance_report_service_1.CartScheduleComplianceReportServices,
            router_1.ActivatedRoute])
    ], ScheduleComplianceReportComponent);
    return ScheduleComplianceReportComponent;
}());
exports.ScheduleComplianceReportComponent = ScheduleComplianceReportComponent;
//# sourceMappingURL=cart-schedule-compliance-report.component.js.map