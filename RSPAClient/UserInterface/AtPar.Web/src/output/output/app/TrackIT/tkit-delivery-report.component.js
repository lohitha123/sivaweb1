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
var http_1 = require("@angular/http");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var file_saver_1 = require("file-saver");
var tkit_delivery_report_service_1 = require("./tkit-delivery-report.service");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var AtParEnums_2 = require("../Shared/AtParEnums");
var DeliveryReportComponent = (function () {
    function DeliveryReportComponent(httpService, _http, spinnerService, commonService, atParConstant, deliveryReportService) {
        this.httpService = httpService;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.deliveryReportService = deliveryReportService;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.order = "";
        this.showGrid = false;
        this.showexport = false;
        this.lstStatus = [];
        this.lstDeliverdBy = [];
        this.lstRequestor = [];
        this.deliverHeaders = [];
        this.deliverDetails = [];
        this.lstUsers = [];
        this.selectedUser = "";
        this.selectedOrgGroupID = "";
        this.selectedStatus = "";
        this.selectedRequestor = "";
        this.statusCode = -1;
        this.noOfRecords = 0;
        this.defDateRange = 0;
        this.deliverDetailRows = 0;
        this.tdExports = true;
        this.plus = true;
        this.pop = false;
        this.isMailDialog = false;
        this.toMailAddr = '';
        this.request = "";
        this.recipient = "";
        this.userId = "";
        this.selectedDeptID = "";
        this.itemId = "";
        this.vendorName = "";
        this.descr = "";
        this.location = "";
    }
    DeliveryReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.lstStatus.push({ label: "Select One", value: "STATUS" }, { label: "ALL", value: "ALL" }, { label: "Open", value: "0" }, { label: "Cancelled", value: "13" }, { label: "PickUp", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Deliver", value: "50" }, { label: "Take", value: "55" }, { label: "Return", value: "60" });
                        this.selectedStatus = this.lstStatus[0].value;
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.getHeirarchyUsersList()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.PopulateDepartments()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.PopulateRequestors()];
                    case 4:
                        _b.sent();
                        this.currentDate = new Date();
                        this.toDate = new Date();
                        this.fromDate = new Date();
                        if (!(this.defDateRange.toString() != '' && this.defDateRange != null)) return [3 /*break*/, 6];
                        _a = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, -this.defDateRange)];
                    case 5:
                        _a.fromDate = _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
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
                        ex_1 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 3: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    DeliveryReportComponent.prototype.confirm = function () {
        try {
            this.growlMessage = [];
            // var rowData: any;
            var compareDates = new Date(this.toDate);
            var currentDate = new Date();
            if (compareDates.getTime() > currentDate.getTime()) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Todate must be less than or equal to current date " });
                return;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    DeliveryReportComponent.prototype.addDays = function (theDate, days) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)];
            });
        });
    };
    DeliveryReportComponent.prototype.validateSearchFields = function () {
        this.pop = false;
        this.showGrid = false;
        this.showexport = false;
        this.growlMessage = [];
        try {
            this.growlMessage = [];
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormate(this.toDate)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
            }
            if (Date.parse(this.convertDateFormate(this.fromDate)) > Date.parse(this.convertDateFormate(this.toDate))) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
                return false;
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
            return false;
        }
    };
    DeliveryReportComponent.prototype.PopulateDepartments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.lstDeptDetails = [];
                        this.lstDeptDetails.push({ label: "All", value: "ALL" });
                        this.selectedDeptID = this.lstDeptDetails[0].value;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.deliveryReportService.getTrackITDetpartments("", "A").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.tkitDeptDetails = data.DataList;
                                _this.statusCode = data.statusCode;
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.tkitDeptDetails = [];
                                        _this.tkitDeptDetails = data.DataDictionary["pDsTkitDepts"].Table1;
                                        if (_this.tkitDeptDetails != null && _this.tkitDeptDetails != undefined) {
                                            for (var i = 0; i < _this.tkitDeptDetails.length; i++) {
                                                _this.lstDeptDetails.push({
                                                    label: _this.tkitDeptDetails[i].DESCRIPTION + " (" + _this.tkitDeptDetails[i].DEPT_ID + ")",
                                                    value: _this.tkitDeptDetails[i].DEPT_ID
                                                });
                                            }
                                        }
                                        _this.spinnerService.stop();
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_2 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.PopulateRequestors = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.deliveryReportService.getRequestors("True").
                                catch(this.httpService.handleError).then(function (res) {
                                //await this.deliveryReportService.getRequestors("True").then((result: Response) => {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.lstRequestor = [];
                                _this.lstRequestor.push({ label: "Select Requestor", value: "Select Requestor" });
                                //   this.selectedRequestor = 'Select Requestor';
                                _this.selectedRequestor = _this.lstRequestor[0].value;
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i < data.DataDictionary["pDsTkitRequestors"].Table1.length; i++) {
                                            _this.lstRequestor.push({ label: data.DataDictionary["pDsTkitRequestors"].Table1[i].FIRST_NAME + data.DataDictionary["pDsTkitRequestors"].Table1[i].LAST_NAME + " (" + data.DataDictionary["pDsTkitRequestors"].Table1[i].REQUESTOR_ID + ")", value: data.DataDictionary["pDsTkitRequestors"].Table1[i].REQUESTOR_ID });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.getDeliveryDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var Fdate, Tdate, DefDateTime, StausDateTime, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showGrid = false;
                        this.showexport = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.validateSearchFields() == false) {
                            return [2 /*return*/];
                        }
                        Fdate = this.convertDateFormate(this.fromDate.toDateString());
                        Tdate = this.convertDateFormate(this.toDate.toDateString());
                        DefDateTime = void 0;
                        StausDateTime = void 0;
                        this.deliverHeaders = [];
                        this.deliverDetails = [];
                        this.showexport = false;
                        if (this.userId == null || this.userId == undefined || this.userId == "ALL") {
                            this.userId = '';
                        }
                        if (this.selectedStatus == null || this.selectedStatus == undefined || this.selectedStatus == "STATUS") {
                            this.selectedStatus = '';
                        }
                        if (this.selectedRequestor == null || this.selectedRequestor == undefined || this.selectedRequestor == "Select Requestor") {
                            this.selectedRequestor = '';
                        }
                        return [4 /*yield*/, this.deliveryReportService.getTkITDeliverReport(Fdate, Tdate, this.request, this.recipient, this.userId, this.selectedDeptID, this.itemId, this.vendorName, this.descr, this.location, this.selectedRequestor, this.selectedStatus)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                //console.log(data);
                                //console.log(data.StatType);
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success:
                                        {
                                            _this.showGrid = true;
                                            _this.spinnerService.stop();
                                            _this.deliverHeaders = [];
                                            _this.deliverHeaders = data.DataDictionary["pDsDeliverRep"]["EVENTHEADER"];
                                            _this.deliverDetails = data.DataDictionary["pDsDeliverRep"]["EVENTDETAILS"];
                                            _this.deliverHeaders.forEach(function (header) {
                                                var details = _this.deliverDetails.filter(function (detail) { return detail.TRANSACTION_ID == header.TRANS_ID; });
                                                _this.showexport = true;
                                                header.DETAILS = details;
                                                if (header.STATUS == "0") {
                                                    header.STATUS = "Open";
                                                }
                                                else if (header.STATUS == "20") {
                                                    header.STATUS = "Pickup";
                                                }
                                                else if (header.STATUS == "30") {
                                                    header.STATUS = "Load";
                                                }
                                                else if (header.STATUS == "40") {
                                                    header.STATUS = "UnLoad";
                                                }
                                                else if (header.STATUS == "50") {
                                                    header.STATUS = "Deliver";
                                                }
                                                else if (header.STATUS == "55") {
                                                    header.STATUS = "Take";
                                                }
                                                else if (header.STATUS == "60") {
                                                    header.STATUS = "Returns";
                                                }
                                            });
                                            if (_this.recordsPerPageSize == 0) {
                                                _this.deliverDetailRows = _this.deliverHeaders.length;
                                            }
                                            else {
                                                _this.deliverDetailRows = _this.recordsPerPageSize;
                                            }
                                            break;
                                        }
                                    case AtParEnums_2.StatusType.Warn:
                                        {
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_5;
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
                        file_saver_1.saveAs(blob, "DeliveryReport.xls");
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
    DeliveryReportComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, title, sigimgserverPath_1, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
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
                        title = '""' + "AtparVersion 3.0" + '""';
                        if (!(1 == 1)) return [3 /*break*/, 5];
                        htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                                + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=5 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType == 'Mail') {
                                htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=cid:logo title=Atpar 3><img src=cid:topbg width=82% height=63></TD></TR>";
                            }
                            else {
                                htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></TR>";
                            }
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=3 align=left><span class=c2><b> Tkit Delivery Report between  " + this.convertDateFormate(this.fromDate) + " and " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Request# - Desc</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Location</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Vendor Name</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Requestor</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Status</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>DepartmentID</td>"
                            + "</tr>";
                        sigimgserverPath_1 = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/Uploaded/';
                        return [4 /*yield*/, this.deliverHeaders.forEach(function (header) {
                                htmlBuilder += "<tr bgcolor=#d3d3d3>";
                                htmlBuilder += "<td  nowrap>&nbsp;" + header.ORDER_NO + " - " + header.REPORT_DATA_8 + "&nbsp;</td>";
                                if (header.LOCATION == '' || header.LOCATION == null) {
                                    htmlBuilder += "<td  nowrap>&nbsp</td>";
                                }
                                else {
                                    htmlBuilder += "<td  nowrap>&nbsp;" + header.LOCATION + "&nbsp;</td>";
                                }
                                if (header.VENDOR_NAME == '' || header.VENDOR_NAME == null) {
                                    htmlBuilder += "<td  nowrap>&nbsp</td>";
                                }
                                else {
                                    htmlBuilder += "<td  nowrap>&nbsp;" + header.VENDOR_NAME + "&nbsp;</td>";
                                }
                                if (header.DELIVERED_TO == '' || header.DELIVERED_TO == null) {
                                    htmlBuilder += "<td  nowrap>&nbsp</td>";
                                }
                                else {
                                    htmlBuilder += "<td  nowrap>&nbsp;" + header.DELIVERED_TO + "&nbsp;</td>";
                                }
                                if (header.STATUS == '' || header.STATUS == null) {
                                    htmlBuilder += "<td  nowrap>&nbsp</td>";
                                }
                                else {
                                    htmlBuilder += "<td  nowrap>&nbsp;" + header.STATUS + "&nbsp;</td>";
                                }
                                if (header.REPORT_DATA_25 == '' || header.REPORT_DATA_25 == null) {
                                    htmlBuilder += "<td  nowrap>&nbsp</td>";
                                }
                                else {
                                    htmlBuilder += "<td  nowrap>&nbsp;" + header.REPORT_DATA_25 + "&nbsp;</td>";
                                }
                                htmlBuilder += "</tr>";
                                if (header.DETAILS.length > 0) {
                                    htmlBuilder += "<tr>"
                                        + "<td colspan=7>"
                                        + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                                        + "<tr bgcolor=#E0E0E0>"
                                        + "<td align=center nowrap width=15%><span class=c3><b>Event</b></span></td>"
                                        + "<td align=center nowrap width=8%><span class=c3><b> Event Date(mm/dd/yyyy) </b></span></td>"
                                        + "<td align=center nowrap width=10%><span class=c3><b>User</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Recepient</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Signature</b></span></td>"
                                        + "</tr>";
                                    header.DETAILS.forEach(function (detail) {
                                        htmlBuilder += "<tr>"
                                            + "<td align=left nowrap ><span class=c3>" + detail.EVENT_STATUS_MESSAGE + "</span></td>"
                                            + "<td align=left nowrap><span class=c3>" + detail.UPDATE_DATE + "</span></td>";
                                        if (detail.USERNAME == '' || detail.USERNAME == null) {
                                            htmlBuilder += "<td nowrap>&nbsp</td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.USERNAME + "</span></td>";
                                        }
                                        if (detail.RECEPIENT == '' || detail.RECEPIENT == null) {
                                            htmlBuilder += "<td nowrap>&nbsp</td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.RECEPIENT + "</span></td>";
                                        }
                                        if (detail.STATUS_MESSAGE == "Deliver") {
                                            htmlBuilder += "<td align=left nowrap ><img  src=" + sigimgserverPath_1 + header.TRANSACTION_ID + ".jpg ></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=right ><span class=c3></span></td>";
                                        }
                                        htmlBuilder += "</tr>";
                                    });
                                    htmlBuilder += "</table>";
                                }
                            })];
                    case 4:
                        _a.sent();
                        htmlBuilder += "</table></Table>";
                        _a.label = 5;
                    case 5: return [4 /*yield*/, htmlBuilder];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7:
                        ex_6 = _a.sent();
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.onSendMailIconClick = function (event) {
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
    DeliveryReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var html, toAddr, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        this.growlMessage = [];
                        this.isMailDialog = false;
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Track IT Deliver Report', JSON.stringify(html), this.toMailAddr, '', 'false', AtParEnums_2.MailPriority.Normal.toString(), '')
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
    DeliveryReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_8;
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
                                mywindow.document.write('<html><head><title>' + 'TrackIT - Delivery Report' + '</title>');
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
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8);
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.getHeirarchyUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.deliveryReportService.getHeirarchyUsersList(AtParEnums_2.EnumApps.TrackIT, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstUsers = [];
                                _this.lstUsers.push({ label: 'ALL', value: 'ALL' });
                                _this.userId = _this.lstUsers[0].value;
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i < res.DataDictionary["pDSUserList"].Table1.length; i++) {
                                            _this.lstUsers.push({ label: res.DataDictionary["pDSUserList"].Table1[i].FULLNAME, value: res.DataDictionary["pDSUserList"].Table1[i].USER_ID });
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
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.spinnerService.stop();
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    DeliveryReportComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstUsers = null;
        this.growlMessage = null;
        this.lstStatus = null;
        this.lstDeptDetails = null;
        this.tkitDeptDetails = null;
        this.lstDeliverdBy = null;
        this.lstRequestor = null;
        this.deliverHeaders = null;
        this.deliverDetails = null;
    };
    DeliveryReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'tkit-delivery-report.component.html',
            providers: [HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, tkit_delivery_report_service_1.DeliveryReportService, datatableservice_1.datatableservice]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            AtParConstants_1.AtParConstants,
            tkit_delivery_report_service_1.DeliveryReportService])
    ], DeliveryReportComponent);
    return DeliveryReportComponent;
}());
exports.DeliveryReportComponent = DeliveryReportComponent;
//# sourceMappingURL=tkit-delivery-report.component.js.map