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
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var recv_parcel_count_report_service_1 = require("./recv-parcel-count-report.service");
var file_saver_1 = require("file-saver");
var ParcelCountReportComponent = (function () {
    function ParcelCountReportComponent(httpService, atparConstants, commonService, spinnerService, parcelCountReportService) {
        this.httpService = httpService;
        this.atparConstants = atparConstants;
        this.commonService = commonService;
        this.spinnerService = spinnerService;
        this.parcelCountReportService = parcelCountReportService;
        /* Variable Declaration */
        this.isMailDialog = false;
        this.toMailAddr = '';
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.tdExports = false;
        this.statusCode = -1;
        this.defDateRange = 0;
        this.pageSize = 0;
        this.ipAddress = " ";
        this.gstrProtocal = "";
        this.gstrServerName = "";
        this.gstrPortNo = "";
        this.lstCarriers = [];
        this.showGrid = false;
        this.trackingNumber = '';
        this.lstParcelCountReportHeader = [];
        this.lstParcelCountReportDetails = [];
        this.carrierID = '';
        try {
            this.spinnerService.start();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        }
        catch (ex) {
            this.clientErrorMsg(ex, '');
        }
        finally {
            this.spinnerService.stop();
        }
    }
    ParcelCountReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ex_1, _b, ex_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 9, 10, 11]);
                        this.spinnerService.start();
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        this.statusCode = -1;
                        _a = this;
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 3:
                        _a.statusCode = _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _c.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed to get Default Report Duration' });
                        return [2 /*return*/];
                    case 5:
                        this.currentDate = new Date();
                        this.toDate = new Date();
                        this.fromDate = new Date();
                        if (!(this.defDateRange.toString() != '' && this.defDateRange.toString != null)) return [3 /*break*/, 7];
                        _b = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, -this.defDateRange)];
                    case 6:
                        _b.fromDate = _c.sent();
                        _c.label = 7;
                    case 7: return [4 /*yield*/, this.populateCarriers()];
                    case 8:
                        _c.sent();
                        return [3 /*break*/, 11];
                    case 9:
                        ex_2 = _c.sent();
                        this.clientErrorMsg(ex_2, 'ngOnInit');
                        return [3 /*break*/, 11];
                    case 10:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ParcelCountReportComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.defDateRange = parseInt(data.DataVariable.toString());
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, 'getMyPreferences');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    ParcelCountReportComponent.prototype.addDays = function (theDate, days) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)];
            });
        });
    };
    ParcelCountReportComponent.prototype.populateCarriers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.commonService.getCarriersData().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.lstCarriers = res.json().DataList;
                                _this.growlMessage = [];
                                _this.lstCarriers = [];
                                _this.lstCarriers.push({ label: "Select Carrier", value: "" });
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstCarriers.push({ label: data.DataList[i].CARRIER_ID, value: data.DataList[i].CARRIER_ID });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, 'bindOrgGroups');
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ParcelCountReportComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var frmDate, toDate, retValue, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.growlMessage = [];
                        this.showGrid = false;
                        this.spinnerService.start();
                        frmDate = this.fromDate.toLocaleDateString();
                        toDate = this.toDate.toLocaleDateString();
                        retValue = false;
                        return [4 /*yield*/, this.validateSearchFields()];
                    case 1:
                        retValue = _a.sent();
                        if (!retValue) return [3 /*break*/, 3];
                        if (this.selectedDropDownCarrierId != '' && this.selectedDropDownCarrierId != undefined && this.selectedDropDownCarrierId != 'Select Carrier') {
                            this.carrierID = this.selectedDropDownCarrierId;
                        }
                        return [4 /*yield*/, this.parcelCountReportService.getParcelCountReport(frmDate, toDate, this.carrierID, this.trackingNumber)
                                .catch(this.httpService.handleError).then(function (res) {
                                _this.spinnerService.stop();
                                _this.carrierID = '';
                                var result = res.json();
                                switch (result.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (result.DataDictionary != null) {
                                            _this.lstParcelCountReportHeader = result.DataDictionary["lstGetParcelCountRepHeader"];
                                            _this.lstParcelCountReportDetails = result.DataDictionary["lstGetParcelCountRepDetails"];
                                            if (_this.lstParcelCountReportHeader.length > 0) {
                                                for (var i = 0; i < _this.lstParcelCountReportHeader.length; i++) {
                                                    var startDateTime = _this.lstParcelCountReportHeader[i].START_DT_TIME;
                                                    var convStartDateTime = new Date(startDateTime).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                                    _this.lstParcelCountReportHeader[i].START_DT_TIME = convStartDateTime.replace(',', '');
                                                    var lstDetails = _this.lstParcelCountReportDetails.filter(function (x) { return x.TRANSACTION_ID == _this.lstParcelCountReportHeader[i].TRANSACTION_ID; });
                                                    if (lstDetails.length > 0) {
                                                        _this.lstParcelCountReportHeader[i].DETAILS = lstDetails;
                                                    }
                                                }
                                                _this.showGrid = true;
                                                _this.tdExports = true;
                                            }
                                            else {
                                                _this.showGrid = false;
                                                _this.tdExports = false;
                                                _this.spinnerService.stop();
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            }
                                        }
                                        else {
                                            _this.showGrid = false;
                                            _this.tdExports = false;
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: result.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: result.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: result.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, 'btnGo_Click');
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ParcelCountReportComponent.prototype.validateSearchFields = function () {
        try {
            this.growlMessage = [];
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select a Valid Date Range" });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormat(this.fromDate)) > Date.parse(this.convertDateFormat(this.toDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
                    return false;
                }
                if (Date.parse(this.convertDateFormat(this.toDate)) > Date.parse(this.convertDateFormat(this.currentDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
                if (Date.parse(this.convertDateFormat(this.toDate)) < Date.parse(this.convertDateFormat(this.fromDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date must be greater than or equal to From Date" });
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
            this.clientErrorMsg(ex, 'validateSearchFields');
            return false;
        }
    };
    ParcelCountReportComponent.prototype.convertDateFormat = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    ParcelCountReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.ExportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "ReceiveParcelCountReport.xls");
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
    ParcelCountReportComponent.prototype.ExportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, imgserverPath, title, ChartPath, sigimgserverPath_1, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        this.growlMessage = [];
                        sbMailText = void 0;
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
                        title = '""' + "AtparVersion 3.0" + '""';
                        ChartPath = this.httpService.BaseUrl + '/Uploaded/';
                        htmlBuilder += "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td colspan=2 align=left  width='15%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=75% height=63>"
                                + "</td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>" + " Receive Parcel Count Report from <b> " + this.convertDateFormat(this.fromDate) + "</b> to <b>" + this.convertDateFormat(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType == 'Mail') {
                                htmlBuilder += "<TR width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' nowrap><img src=" + imgserverPath + "logo.jpg></td></TR>";
                            }
                            else {
                                htmlBuilder += "<TR height=55><TD align=left colspan=2><IMG height=55 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=55></TD></TR>";
                            }
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>" + " Receive Parcel Count Report from <b> " + this.convertDateFormat(this.fromDate) + "</b> to <b>" + this.convertDateFormat(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp";
                            htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr></table></td></tr>";
                        htmlBuilder += "<tr><td colspan=2>";
                        htmlBuilder += "<table align=left width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
                        htmlBuilder += "<tr bgcolor=#d3d3d3>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Date Time</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>User</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Total Count</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Signature</b></span></td>";
                        htmlBuilder += "</tr>";
                        sigimgserverPath_1 = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/Uploaded/';
                        return [4 /*yield*/, this.lstParcelCountReportHeader.forEach(function (header) {
                                htmlBuilder += "<tr height=90>";
                                htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.START_DT_TIME + "&nbsp;</td>";
                                htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.USER_ID + "&nbsp;</td>";
                                htmlBuilder += "<td bgcolor=#ffffff align=right nowrap>&nbsp;" + header.TOTCNT + "&nbsp;</td>";
                                if (header.SIGNATURE != null && header.SIGNATURE != '') {
                                    htmlBuilder += "<td align=right border==#ffffff nowrap>&nbsp;<center><img src=" + sigimgserverPath_1 + header.TRANSACTION_ID + ".jpg ></td>";
                                }
                                else {
                                    htmlBuilder += "<td border==#ffffff nowrap>&nbsp;<center></td>";
                                }
                                htmlBuilder += "</tr>";
                                if (header.DETAILS.length > 0) {
                                    htmlBuilder += "<tr>";
                                    htmlBuilder += "<td colspan =5>";
                                    htmlBuilder += "<table align=right width=60% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
                                    htmlBuilder += "<tr bgcolor=#d3d3d3>";
                                    htmlBuilder += "<td align=center nowrap width=15%><span class=c3><b>Tracking Number</b></span></td>";
                                    htmlBuilder += "<td align=center nowrap width=8%><span class=c3><b>Quantity</b></span></td>";
                                    htmlBuilder += "</tr>";
                                    header.DETAILS.forEach(function (detail) {
                                        htmlBuilder += "<tr>";
                                        htmlBuilder += "<td align=left nowrap ><span class=c3>" + "'" + detail.TRACKING_NO + "</span></td>";
                                        htmlBuilder += "<td align=right nowrap><span class=c3>" + detail.NO_OF_BOXES + "</span></td>";
                                        htmlBuilder += "</tr>";
                                    });
                                    htmlBuilder += "</table></td></tr>";
                                }
                            })];
                    case 4:
                        _a.sent();
                        htmlBuilder += "</tr>";
                        htmlBuilder += "</table></td></tr>";
                        htmlBuilder += "</Table>";
                        return [4 /*yield*/, htmlBuilder];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        ex_7 = _a.sent();
                        htmlBuilder = '';
                        this.clientErrorMsg(ex_7, 'ExportReportDetails');
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ParcelCountReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.ExportReportDetails('Print')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            mywindow = window.open(document.URL, null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'Receive - Parcel Count Report' + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                mywindow.document.close();
                                mywindow.focus();
                                return [2 /*return*/, true];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, 'onPrintClick');
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ParcelCountReportComponent.prototype.onSendMailIconClick = function (event) {
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
    ParcelCountReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_9;
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
                        return [4 /*yield*/, this.ExportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Receive Parcel Count Report', JSON.stringify(html), this.toMailAddr, '', false, AtParEnums_1.MailPriority.Normal.toString(), '')
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
                        this.isMailDialog = false;
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, 'onSendMailClick');
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ParcelCountReportComponent.prototype.validateEmail = function (email) {
        var ret = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return ret.test(email);
    };
    ParcelCountReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    ParcelCountReportComponent.prototype.clientErrorMsg = function (ex, funName) {
        this.growlMessage = [];
        this.atparConstants.catchClientError(this.growlMessage, this.spinnerService, ex.toString(), funName, this.constructor.name);
    };
    ParcelCountReportComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstParcelCountReportHeader = null;
        this.lstParcelCountReportDetails = null;
        this.lstCarriers = null;
        this.growlMessage = null;
    };
    ParcelCountReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'recv-parcel-count-report.component.html',
            providers: [HttpService_1.HttpService, AtParConstants_1.AtParConstants, atpar_common_service_1.AtParCommonService, recv_parcel_count_report_service_1.ParcelCountReportService]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            atpar_common_service_1.AtParCommonService,
            event_spinner_service_1.SpinnerService,
            recv_parcel_count_report_service_1.ParcelCountReportService])
    ], ParcelCountReportComponent);
    return ParcelCountReportComponent;
}());
exports.ParcelCountReportComponent = ParcelCountReportComponent;
//# sourceMappingURL=recv-parcel-count-report.component.js.map