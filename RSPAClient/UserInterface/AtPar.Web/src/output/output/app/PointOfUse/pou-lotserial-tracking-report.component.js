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
var datatableservice_1 = require("./../components/datatable/datatableservice");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var pou_lotserial_tracking_report_service_1 = require("./pou-lotserial-tracking-report.service");
var file_saver_1 = require("file-saver");
var LotSerialTrackingReportComponent = (function () {
    function LotSerialTrackingReportComponent(spinnerService, atParCommonService, httpService, atParConstant, lotSerialService) {
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.lotSerialService = lotSerialService;
        this.growlMessage = [];
        this.lstDepartments = [];
        this.txtLotNumber = '';
        this.txtSerialNumber = '';
        this.txtPatientID = '';
        this.txtAccountID = '';
        this.selectedDepartment = '';
        this.tdExports = false;
        this.lstChargeCaptureGrid = [];
        this.lstDgrdAvailable = [];
        this.firstGrid = false;
        this.secondGrid = false;
        this.chargeCaptureGridRec = 0;
        this.dgrdAvailableRec = 0;
        this.blnchargeCaptureGridRec = false;
        this.blndgrdAvailableRec = false;
        this.isMailDialog = false;
        this.toMailAddr = '';
        this.statusCode = -1;
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    LotSerialTrackingReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var defaultReport, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.spinnerService.start();
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        return [4 /*yield*/, this.defaultReportDuration()];
                    case 1:
                        defaultReport = _b.sent();
                        return [4 /*yield*/, this.bindDepartmentDropDown()];
                    case 2:
                        _b.sent();
                        this.fromDate = new Date();
                        _a = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, defaultReport)];
                    case 3:
                        _a.fromDate = _b.sent();
                        this.toDate = new Date();
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    LotSerialTrackingReportComponent.prototype.defaultReportDuration = function () {
        return __awaiter(this, void 0, void 0, function () {
            var defaultReport, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        defaultReport = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.atParCommonService.getMyPreferences("DEFAULT_REPORT_DURATION", this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .then(function (result) {
                                var res = result.json();
                                if (res.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    defaultReport = res.DataVariable;
                                    return defaultReport;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, defaultReport];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LotSerialTrackingReportComponent.prototype.bindDepartmentDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstDepartments = [];
                        this.lstDepartments.push({
                            label: "Select Department", value: ''
                        });
                        return [4 /*yield*/, this.atParCommonService.getUserDepartments(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.deviceTokenEntry).then(function (result) {
                                var res = result.json();
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        var departments = res.DataList;
                                        if (_this.lstDepartments.length > 0) {
                                            for (var index = 0; index < departments.length; index++) {
                                                _this.lstDepartments.push({
                                                    label: departments[index].DEPARTMENT_ID + "-" + departments[index].DEPT_NAME, value: departments[index].DEPARTMENT_ID
                                                });
                                            }
                                        }
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
                        return [2 /*return*/];
                }
            });
        });
    };
    LotSerialTrackingReportComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnValue, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        this.gridVisibleFalse();
                        returnValue = false;
                        returnValue = this.validateSearchFields();
                        if (!returnValue) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getData()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 5];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2);
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LotSerialTrackingReportComponent.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var cDate, fromDate, toDate, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.chargeCaptureGridRec = 0;
                        this.dgrdAvailableRec = 0;
                        this.spinnerService.start();
                        cDate = new Date();
                        cDate.setDate(this.toDate.getDate() + 1);
                        return [4 /*yield*/, this.convertDateFormate(this.fromDate)];
                    case 1:
                        fromDate = _a.sent();
                        return [4 /*yield*/, this.convertDateFormate(cDate)];
                    case 2:
                        toDate = _a.sent();
                        if (this.selectedDepartment == null || this.selectedDepartment == undefined) {
                            this.selectedDepartment = '';
                        }
                        return [4 /*yield*/, this.lotSerialService.getLotSerialTrackReport(fromDate, toDate, this.txtLotNumber, this.txtSerialNumber, this.txtPatientID, "", this.txtAccountID, "", this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.selectedDepartment, AtParEnums_2.EnumApps.PointOfUse)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.spinnerService.stop();
                                var data = res.json();
                                _this.blnchargeCaptureGridRec = true;
                                _this.blndgrdAvailableRec = true;
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstChargeCaptureGrid = data.DataDictionary["ChargeReportDS"]["Table1"];
                                        _this.lstDgrdAvailable = data.DataDictionary["ChargeReportDS"]["Table2"];
                                        if (_this.lstChargeCaptureGrid.length > 0 || _this.lstDgrdAvailable.length > 0) {
                                            if (_this.lstChargeCaptureGrid.length > 0) {
                                                _this.firstGrid = true;
                                                _this.chargeCaptureGridRec = _this.lstChargeCaptureGrid.length;
                                            }
                                            else {
                                                _this.chargeCaptureGridRec = 0;
                                                _this.firstGrid = false;
                                            }
                                            if (_this.lstDgrdAvailable.length > 0) {
                                                _this.secondGrid = true;
                                                _this.dgrdAvailableRec = _this.lstDgrdAvailable.length;
                                            }
                                            else {
                                                _this.dgrdAvailableRec = 0;
                                                _this.secondGrid = false;
                                            }
                                            _this.tdExports = true;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LotSerialTrackingReportComponent.prototype.addDays = function (theDate, days) {
        return new Date(theDate.getTime() - days * 24 * 60 * 60 * 1000);
    };
    LotSerialTrackingReportComponent.prototype.validateSearchFields = function () {
        try {
            this.growlMessage = [];
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormate(this.toDate)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
                if (Date.parse(this.convertDateFormate(this.fromDate)) > Date.parse(this.convertDateFormate(this.toDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
                    return false;
                }
            }
            else {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
            return false;
        }
    };
    LotSerialTrackingReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    LotSerialTrackingReportComponent.prototype.clientErrorMsg = function (ex) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString());
    };
    LotSerialTrackingReportComponent.prototype.gridVisibleTrue = function () {
        this.tdExports = true;
        this.firstGrid = true;
        this.secondGrid = true;
    };
    LotSerialTrackingReportComponent.prototype.gridVisibleFalse = function () {
        this.tdExports = false;
        this.firstGrid = false;
        this.secondGrid = false;
        this.blnchargeCaptureGridRec = false;
        this.blndgrdAvailableRec = false;
    };
    LotSerialTrackingReportComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.isMailDialog = true;
                    this.toMailAddr = '';
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    LotSerialTrackingReportComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, selRows, selRowsOnhand, imgserverPath, i, index, index, selRowOnhand, selRowOnhand, ex_4;
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
                        selRows = this.lstChargeCaptureGrid.filter(function (a) { return a.LotID != '' || a.SerialID != ''; });
                        selRowsOnhand = this.lstDgrdAvailable.filter(function (a) { return a.LotID != '' || a.SerialID != ''; });
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
                        if (1 == 1) {
                            htmlBuilder = "<Table align=center width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                            if (reqType == "excel") {
                                htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></tr></table>";
                                htmlBuilder += "<table width=90% align=center><tr></tr><tr></tr>";
                            }
                            else {
                                if (reqType == "Send") {
                                    htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                                }
                                else {
                                    htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></tr>";
                                }
                            }
                            htmlBuilder += "<TR><TD height=27 colspan=2 vAlign=bottom width=260 align=left><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Point Of Use<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>" +
                                "<tr><td colspan=3 align=left><span class=c3><b>Lot/Serial Tracking Report </b></span></td><td align=right valign=top>&nbsp;";
                            if (reqType == "print") {
                                htmlBuilder += "<A  href='javascript:window.print();'><img src=" + imgserverPath + "print.jpg>";
                            }
                            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr></table>";
                            if (selRows.length) {
                                htmlBuilder += "<table align=center width=90%><tr><td align=left><b>Issued</b></td></tr></table>";
                                htmlBuilder += "<table align=center width=90% style=" + "BORDER-COLLAPSE:collapse" + " border=1><tr bgcolor=#d3d3d3><td align=center nowrap><span class=c3><b>Date Time</b></span></td>" +
                                    "<td align=center nowrap><span class=c3><b>Item ID - Description</b></span></td>" +
                                    "<td align=center nowrap><span class=c3><b>Lot #</b></span></td>" +
                                    "<td align=center nowrap><span class=c3><b>Serial #</b></span></td>" +
                                    "<td align=center nowrap><span class=c3><b>Patient Name  - </BR> ID / Account #</b></span></td></tr>";
                                i = void 0;
                                if (reqType == "print" || reqType == "Send") {
                                    for (index in selRows) {
                                        htmlBuilder += "<tr><td align=left><span class=" + "c3" + ">" + selRows[index].DateTime + "</span></td>" +
                                            "<td align=left><span class=c3>" + selRows[index].ItemID_Descr + " </span></td>" +
                                            "<td align=left><span class=c3>" + selRows[index].LotID + " </span></td>" +
                                            "<td align=left><span class=c3>" + selRows[index].SerialID + " </span></td>" +
                                            "<td align=left><span class=c3>" + selRows[index].Patient + " </span></td></tr>";
                                    }
                                }
                                else if (reqType == "excel") {
                                    for (index in selRows) {
                                        htmlBuilder += "<tr><td align=left><span class=" + "c3" + ">" + "'" + selRows[index].DateTime + "</span></td>" +
                                            "<td align=left><span class=c3>" + "'" + selRows[index].ItemID_Descr + " </span></td>" +
                                            "<td align=left><span class=c3>" + selRows[index].LotID + " </span></td>" +
                                            "<td align=left><span class=c3>" + selRows[index].SerialID + " </span></td>" +
                                            "<td align=left><span class=c3>" + selRows[index].Patient + " </span></td></tr>";
                                    }
                                }
                                htmlBuilder += "</table>";
                            }
                            if (selRowsOnhand.length > 0) {
                                htmlBuilder += "<table align=center width=90%><tr><td align=left><b>On hand</b></td></tr></table>";
                                htmlBuilder += "<table align=center width=90% style=" + "BORDER-COLLAPSE:collapse" + " border=1><tr bgcolor=#d3d3d3>" +
                                    "<td align=center nowrap><span class=c3><b>Item ID - Description</b></span></td>" +
                                    "<td align=center nowrap><span class=c3><b>Lot #</b></span></td>" +
                                    "<td align=center nowrap><span class=c3><b>Serial #</b></span></td>" +
                                    "<td align=center nowrap><span class=c3><b>Location / Bin </BR> Location / Quantity</b></span></td></tr>";
                                if (reqType == "print" || reqType == "Send") {
                                    for (selRowOnhand in selRowsOnhand) {
                                        htmlBuilder += "<tr><td align=left><span class=" + "c3" + ">" + selRowsOnhand[selRowOnhand].ItemID_Descr + "</span></td>" +
                                            "<td align=left><span class=c3>" + selRowsOnhand[selRowOnhand].LotID + " </span></td>" +
                                            "<td align=left><span class=c3>" + selRowsOnhand[selRowOnhand].SerialID + " </span></td>" +
                                            "<td align=left><span class=c3>" + selRowsOnhand[selRowOnhand].Location + " </span></td></tr>";
                                    }
                                }
                                else if (reqType == "excel") {
                                    for (selRowOnhand in selRowsOnhand) {
                                        htmlBuilder += "<tr><td align=left><span class=" + "c3" + ">" + "'" + selRowsOnhand[selRowOnhand].ItemID_Descr + "</span></td>" +
                                            "<td align=left><span class=c3>" + selRowsOnhand[selRowOnhand].LotID + " </span></td>" +
                                            "<td align=left><span class=c3>" + selRowsOnhand[selRowOnhand].SerialID + " </span></td>" +
                                            "<td align=left><span class=c3>" + selRowsOnhand[selRowOnhand].Location + " </span></td></tr>";
                                    }
                                }
                                htmlBuilder += "</table>";
                            }
                        }
                        return [4 /*yield*/, htmlBuilder];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        ex_4 = _a.sent();
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LotSerialTrackingReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('excel')];
                    case 1:
                        html = _a.sent();
                        blob = new Blob([html], {
                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                        });
                        file_saver_1.saveAs(blob, "LotSerailTrackingReport.xls");
                        return [3 /*break*/, 4];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5);
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LotSerialTrackingReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('print')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'Point Of Use - LotSerial Tracking Report' + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                mywindow.document.close(); // necessary for IE >= 10
                                mywindow.focus(); // necessary for IE >= 10*/
                                //mywindow.print();
                                //mywindow.close();
                                return [2 /*return*/, true];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6);
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LotSerialTrackingReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    LotSerialTrackingReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    LotSerialTrackingReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_7;
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
                        return [4 /*yield*/, this.exportReportDetails('Send')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        this.growlMessage = [];
                        this.isMailDialog = false;
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.atParCommonService.sendEmbeddedEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'LotSerial Tracking Report', JSON.stringify(html), this.toMailAddr, '', 'false', AtParEnums_2.MailPriority.Normal.toString(), '')
                                .catch(this.httpService.handleError)
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
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Please Enter To Email Address' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_BODY) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Mail Server is Not Configured! Please Contact Administrator' });
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
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LotSerialTrackingReportComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstDepartments = [];
        this.spinnerService.stop();
        this.lstChargeCaptureGrid = [];
        this.lstDgrdAvailable = [];
        this.spinnerService.stop();
    };
    LotSerialTrackingReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-lotserial-tracking-report.component.html',
            providers: [atpar_common_service_1.AtParCommonService, pou_lotserial_tracking_report_service_1.LotSerialTrackReportService, AtParConstants_1.AtParConstants, datatableservice_1.datatableservice]
        }),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            pou_lotserial_tracking_report_service_1.LotSerialTrackReportService])
    ], LotSerialTrackingReportComponent);
    return LotSerialTrackingReportComponent;
}());
exports.LotSerialTrackingReportComponent = LotSerialTrackingReportComponent;
//# sourceMappingURL=pou-lotserial-tracking-report.component.js.map