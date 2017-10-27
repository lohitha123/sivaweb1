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
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var routepath_1 = require("../AtPar/Menus/routepath");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var pou_pref_card_optimization_report_service_1 = require("./pou-pref-card-optimization-report.service");
var file_saver_1 = require("file-saver");
var PrefCardOptimizationReportComponent = (function () {
    function PrefCardOptimizationReportComponent(spinnerService, atParCommonService, httpService, atParConstant, prefCardOptimizationReportService) {
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.prefCardOptimizationReportService = prefCardOptimizationReportService;
        this.deviceTokenEntry = [];
        this.gstrServerName = "";
        this.isMailDialog = false;
        this.gstrProtocal = "";
        this.toMailAddr = '';
        this.gstrPortNo = "";
        this.ipAddress = " ";
        this.blnsortbycolumn = true;
        this.tdExports = false;
        this.custom = "custom";
        this.growlMessage = [];
        this.defDateRange = 0;
        this.selectedProcedure = "";
        this.bindLabelData = "";
        this.showGrid = false;
        this.statusCode = -1;
        this.minDateValue1 = new Date();
        this.strCode = "";
        this.strDescr = "";
        this.lblTotalSavings = 0;
        this.selectedPhysicianValue = "";
        this.selectedProcedureValue = "";
        this.strProcedureCode = "procedures";
        this.lstFilteredPhysicians = [];
        this.lstFilteredPhysiciansList = [];
        this.lstDBData = [];
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    PrefCardOptimizationReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        _a = this;
                        return [4 /*yield*/, this.getDefDateRange()];
                    case 1:
                        _a.statusCode = _c.sent();
                        this.pazeSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
                            return [2 /*return*/];
                        }
                        this.lblTotalSavings = 0;
                        this.fromDate = new Date();
                        _b = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, this.defDateRange)];
                    case 2:
                        _b.fromDate = _c.sent();
                        this.toDate = new Date();
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    PrefCardOptimizationReportComponent.prototype.fillProceduresAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstFilteredProceduresItems = [];
                        this.lstFilteredProcedures = [];
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParCommonService.getCodes(this.strProcedureCode, this.strCode, this.strDescr).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstFilteredProceduresItems = data.DataList;
                                        _this.lstFilteredProcedures = _this.filterProcedureCodesItems(query, _this.lstFilteredProceduresItems);
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                            _this.growlMessage = [];
                                        }
                                        else {
                                            _this.growlMessage = [];
                                            _this.showGrid = false;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "fillProceduresAuto");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PrefCardOptimizationReportComponent.prototype.filterProcedureCodesItems = function (query, items) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < items.length; i++) {
                var itemValue = items[i];
                if (items[i].CODE !== "") {
                    var itemValue_1 = items[i].CODE + " - " + items[i].DESCRIPTION;
                    filtered.push(itemValue_1);
                }
            }
        }
        else {
            if (query.length >= 0) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].CODE.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if (items[i].CODE !== "") {
                            var itemValue = items[i].CODE + " - " + items[i].DESCRIPTION;
                            filtered.push(itemValue);
                        }
                    }
                }
            }
        }
        return filtered;
    };
    PrefCardOptimizationReportComponent.prototype.fillPhysiciansAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstFilteredPhysicians = [];
                        this.lstFilteredPhysiciansList = [];
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParCommonService.getPhysicians().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstPhysicians = data.DataList;
                                        _this.lstFilteredPhysiciansList = _this.filterPhysicianItems(query, _this.lstPhysicians);
                                        _this.lstFilteredPhysicians = [];
                                        for (var i = 0; i <= _this.lstFilteredPhysiciansList.length - 1; i++) {
                                            _this.lstFilteredPhysicians[i] = _this.lstFilteredPhysiciansList[i].PHYSICIAN_ID + " - " + _this.lstFilteredPhysiciansList[i].FIRST_NAME + " " + _this.lstFilteredPhysiciansList[i].MIDDLE_INITIAL + " " + _this.lstFilteredPhysiciansList[i].LAST_NAME;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                            _this.growlMessage = [];
                                        }
                                        else {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "fillPhysiciansAuto");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PrefCardOptimizationReportComponent.prototype.filterPhysicianItems = function (query, items) {
        var filtered = [];
        if (query == "%") {
            var _loop_1 = function (i) {
                var itemValue = items[i];
                if ((filtered.filter(function (x) { return x.PHYSICIAN_ID == itemValue.PHYSICIAN_ID; })).length == 0) {
                    filtered.push(itemValue);
                }
            };
            for (var i = 0; i < items.length; i++) {
                _loop_1(i);
            }
        }
        else {
            if (query.length >= 0) {
                var _loop_2 = function (i) {
                    var itemValue = items[i];
                    if (itemValue.PHYSICIAN_ID.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
                        itemValue.FIRST_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
                        itemValue.MIDDLE_INITIAL.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
                        itemValue.LAST_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if ((filtered.filter(function (x) { return x.PHYSICIAN_ID == itemValue.PHYSICIAN_ID ||
                            x.FIRST_NAME == itemValue.FIRST_NAME ||
                            x.MIDDLE_INITIAL == itemValue.MIDDLE_INITIAL ||
                            x.LAST_NAME == itemValue.LAST_NAME; })).length == 0) {
                            filtered.push(itemValue);
                        }
                    }
                };
                for (var i = 0; i < items.length; i++) {
                    _loop_2(i);
                }
            }
        }
        return filtered;
    };
    PrefCardOptimizationReportComponent.prototype.getDefDateRange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, this.atParCommonService.GetMyPreferences("DEFAULT_REPORT_DURATION", this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                if (data.StatType == AtParEnums_1.StatusType.Success) {
                                    _this.defDateRange = parseInt(data.DataVariable.toString());
                                }
                                _this.statusCode = data.StatusCode;
                                if (data.StatType == AtParEnums_1.StatusType.Error) {
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
                                    return;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.statusCode];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        ex_3 = _a.sent();
                        return [4 /*yield*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PrefCardOptimizationReportComponent.prototype.addDays = function (theDate, days) {
        return new Date(theDate.getTime() - days * 24 * 60 * 60 * 1000);
    };
    PrefCardOptimizationReportComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    PrefCardOptimizationReportComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    PrefCardOptimizationReportComponent.prototype.getPrefCardOptimizationData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnValue = false;
                        return [4 /*yield*/, this.validateSearchFields()];
                    case 1:
                        returnValue = _a.sent();
                        if (!returnValue) return [3 /*break*/, 3];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: 'Getting data....' });
                        return [4 /*yield*/, this.bindDataGrid()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PrefCardOptimizationReportComponent.prototype.bindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var frmDate, CDate, todate, templblTotalSavings, tmp, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        frmDate = this.convert(this.fromDate);
                        CDate = new Date();
                        CDate.setDate(this.toDate.getDate() + 1);
                        todate = this.convert(CDate);
                        templblTotalSavings = 0;
                        tmp = '';
                        this.selectedPhysicianValue = (this.selectedPhysician == null || this.selectedPhysician == undefined) ? "" : this.selectedPhysician.split("-")[0].trim();
                        this.selectedProcedureValue = this.selectedProcedure.split("-")[0].trim();
                        if (this.selectedProcedure == null || this.selectedProcedure == undefined || this.selectedProcedure == "") {
                            this.showGrid = false;
                            this.tdExports = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Procedure code is mandatory" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.prefCardOptimizationReportService.getPrefCardOptimizationRpt(frmDate, todate, this.selectedProcedureValue, this.selectedPhysicianValue).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataDictionary["listPrefCardOptimization"].length > 0) {
                                            _this.showGrid = true;
                                            _this.tdExports = true;
                                            _this.bindLabelData = data.DataDictionary["Count"];
                                            _this.lstDBData = data.DataDictionary["listPrefCardOptimization"];
                                            templblTotalSavings = 0;
                                            _this.lstDBData.forEach(function (x) {
                                                x.ITEMCOST = parseFloat(x.ITEMCOST).toFixed(2);
                                                x.CURRENTOPENQTY = parseFloat(x.CURRENTOPENQTY).toFixed(2);
                                                x.CURRENTHOLDQTY = parseFloat(x.CURRENTHOLDQTY).toFixed(2);
                                                x.MAXUSAGE = parseFloat(x.MAXUSAGE).toFixed(2);
                                                x.MINUSAGE = parseFloat(x.MINUSAGE).toFixed(2);
                                                x.MEANUSAGE = parseFloat(x.MEANUSAGE).toFixed(2);
                                                x.OPENQTY = parseFloat(x.OPENQTY).toFixed(2);
                                                x.HOLDQTY = parseFloat(x.HOLDQTY).toFixed(2);
                                                x.VARIANCE = parseFloat(x.VARIANCE).toFixed(2);
                                                x.VARIANCE_PERCENTAGE = parseFloat(x.VARIANCE_PERCENTAGE).toFixed(2);
                                                templblTotalSavings = templblTotalSavings + x.SAVINGS;
                                                x.SAVINGS = parseFloat(x.SAVINGS).toFixed(2);
                                            });
                                            _this.lblTotalSavings = parseFloat(templblTotalSavings).toFixed(2);
                                        }
                                        else {
                                            _this.showGrid = false;
                                            _this.tdExports = false;
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.tdExports = false;
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
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "getPrefCardOptimizationData");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PrefCardOptimizationReportComponent.prototype.convert = function (str) {
        var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    PrefCardOptimizationReportComponent.prototype.validateSearchFields = function () {
        try {
            this.growlMessage = [];
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convert(this.fromDate)) > Date.parse(this.convert(this.toDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date must be less than or equal to To Date" });
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
            this.clientErrorMsg(ex, "validateSearchFields");
            return false;
        }
    };
    PrefCardOptimizationReportComponent.prototype.onSendMailIconClick = function (event) {
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
    PrefCardOptimizationReportComponent.prototype.onSendMailClick = function (event) {
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
                        return [4 /*yield*/, this.ExportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.atParCommonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Pref Card Optimization Report', JSON.stringify(html), this.toMailAddr, AtParEnums_1.MailPriority.Normal.toString(), '')
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
    PrefCardOptimizationReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    PrefCardOptimizationReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_6;
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
                            mywindow = window.open('', null, 'height=600,width=600,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'Point Of Use - Pref Card Performance Details Report' + '</title>');
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
                        this.clientErrorMsg(ex_6, 'onPrintClick');
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PrefCardOptimizationReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_7;
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
                            file_saver_1.saveAs(blob, "PrefCardOptimizationReport.xls");
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
    PrefCardOptimizationReportComponent.prototype.ExportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, _DS, imgserverPath, title, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        _DS = [];
                        imgserverPath = '';
                        return [4 /*yield*/, this.atParCommonService.getServerIP()
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
                        return [4 /*yield*/, this.atParCommonService.getSSLConfigDetails()
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
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder += "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td  align=left  width='15%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + ">"
                                + "</td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td > </TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Pref Card Optimization Report <b>" + this.convert(this.fromDate) + "</b> and  <b>" + this.convert(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else if (reqType == 'Excel') {
                            htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Pref Card Optimization Report <b>" + this.convert(this.fromDate) + "</b> and  <b>" + this.convert(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;";
                        }
                        else {
                            htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Pref Card Optimization Report <b>" + this.convert(this.fromDate) + "</b> and  <b>" + this.convert(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center  nowrap><span class=c3><b>Item</b></span></td>"
                            + "<td align=center nowrap><span class=c2><b>Item Type</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Description</b></span></td>"
                            + "<td align=center nowrap><span class=c2><b>Item Cost($)</b></span></td></td>"
                            + "<td align=center nowrap><span class=c2><b>Current Open Qty</b></span></td>"
                            + "<td align=center nowrap><span class=c2><b>Current Hold Qty</b></span></td>"
                            + "<td align=center nowrap><span class=c2><b>Max Usage</b></span></td>"
                            + "<td align=center nowrap><span class=c2><b>Min Usage</b></span></td>"
                            + "<td align=center nowrap><span class=c2><b>Mean Usage</b></span></td>"
                            + "<td align=center nowrap><span class=c2>"
                            + "<table align=left width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr><td align=center nowrap colspan=2><span class=c2><b>Suggested Pref Qty</b></td></tr>"
                            + "<tr><td align=center nowrap><b>Open Qty</b></td><td align=center nowrap><b>Hold Qty</b></td></tr>"
                            + "</table>"
                            + "</td>"
                            + "<td align=center nowrap><span class=c2><b>Variance</b></span></td>"
                            + "<td align=center nowrap><span class=c2><b>Variance%</b></span></td>"
                            + "<td align=center nowrap><span class=c2><b>Savings($)</b></span></td>"
                            + "</tr>";
                        if (!(reqType == 'Excel')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.lstDBData.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td align=left nowrap> <span class=c2>" + "'" + header.ITEM + "</span></td>"
                                    + "<td align=left nowrap >" + header.ITEMTYPE + "</td>"
                                    + "<td align=left nowrap nowrap >" + header.DESCRIPTION + "</td>"
                                    + "<td align=left nowrap nowrap> <span class=c2>" + "'" + header.ITEMCOST + "</span></td>"
                                    + "<td align=right nowrap nowrap> <span class=c2>" + "'" + header.CURRENTOPENQTY + "</span></td>"
                                    + "<td align=right nowrap nowrap> <span class=c2>" + "'" + header.CURRENTHOLDQTY.toString() + "</span></td>"
                                    + "<td align=right nowrap nowrap> <span class=c2>" + "'" + header.MAXUSAGE + "</span></td>"
                                    + "<td align=right nowrap nowrap> <span class=c2>" + "'" + header.MINUSAGE + "</span></td>"
                                    + "<td align=right nowrap nowrap> <span class=c2>" + "'" + header.MEANUSAGE + "</span></td>"
                                    + "<td align=right nowrap><span class=c2>"
                                    + "<table align=left width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                                    + "<tr>"
                                    + "<td align= right nowrap> <span class=c2> " + "'" + header.OPENQTY + "</span></td>"
                                    + "<td align= right nowrap> <span class=c2> " + "'" + header.HOLDQTY + "</span></td>"
                                    + "</tr>"
                                    + "</table>"
                                    + "</td>"
                                    + "<td align=right nowrap><span class=c2>" + header.VARIANCE + "</span></td>"
                                    + "<td align=right nowrap><span class=c2>" + header.VARIANCE_PERCENTAGE + "</span></td>"
                                    + "<td align=right nowrap><span class=c2>" + header.SAVINGS + "</span></td>"
                                    + "</tr>";
                            })];
                    case 4:
                        _a.sent();
                        htmlBuilder += "<tr>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=right nowrap><span class=c2><b>Total Savings($)</b></span></td>"
                            + "<td align=right nowrap><span class=c2>" + "'" + this.lblTotalSavings + "</span></td>"
                            + "</tr>";
                        htmlBuilder += "</table></td></tr></Table>";
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.lstDBData.forEach(function (header) {
                            htmlBuilder += "<tr>"
                                + "<td align=left nowrap> <span class=c2>" + header.ITEM + "</span></td>"
                                + "<td align=left nowrap >" + header.ITEMTYPE + "</td>"
                                + "<td align=left nowrap nowrap >" + header.DESCRIPTION + "</td>"
                                + "<td align=left nowrap nowrap> <span class=c2>" + header.ITEMCOST + "</span></td>"
                                + "<td align=right nowrap nowrap> <span class=c2>" + header.CURRENTOPENQTY + "</span></td>"
                                + "<td align=right nowrap nowrap> <span class=c2>" + header.CURRENTHOLDQTY.toString() + "</span></td>"
                                + "<td align=right nowrap nowrap> <span class=c2>" + header.MAXUSAGE + "</span></td>"
                                + "<td align=right nowrap nowrap> <span class=c2>" + header.MINUSAGE + "</span></td>"
                                + "<td align=right nowrap nowrap> <span class=c2>" + header.MEANUSAGE + "</span></td>"
                                + "<td align=right nowrap><span class=c2>"
                                + "<table align=left width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                                + "<tr>"
                                + "<td align= right nowrap> <span class=c2> " + header.OPENQTY + "</span></td>"
                                + "<td align= right nowrap> <span class=c2> " + header.HOLDQTY + "</span></td>"
                                + "</tr>"
                                + "</table>"
                                + "</td>"
                                + "<td align=right nowrap><span class=c2>" + header.VARIANCE + "</span></td>"
                                + "<td align=right nowrap><span class=c2>" + header.VARIANCE_PERCENTAGE + "</span></td>"
                                + "<td align=right nowrap><span class=c2>" + header.SAVINGS + "</span></td>"
                                + "</tr>";
                        })];
                    case 6:
                        _a.sent();
                        htmlBuilder += "<tr>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=left nowrap><span class=c2></span></td>"
                            + "<td align=right nowrap><span class=c2><b>Total Savings($)</b></span></td>"
                            + "<td align=right nowrap><span class=c2>" + this.lblTotalSavings + "</span></td>"
                            + "</tr>";
                        htmlBuilder += "</table></td></tr></Table>";
                        _a.label = 7;
                    case 7: return [2 /*return*/, htmlBuilder];
                    case 8:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, 'ExportReportDetails');
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    PrefCardOptimizationReportComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstFilteredPhysicians = null;
        this.lstFilteredPhysiciansList = null;
        this.lstPhysicians = null;
        this.lstFilteredProcedures = null;
        this.lstDBData = null;
        this.lblTotalSavings = null;
        this.lstFilteredProceduresItems = null;
        this.growlMessage = null;
    };
    PrefCardOptimizationReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    PrefCardOptimizationReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    PrefCardOptimizationReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-pref-card-optimization-report.component.html',
            providers: [HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, pou_pref_card_optimization_report_service_1.PrefCardOptimizationReportService]
        }),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            pou_pref_card_optimization_report_service_1.PrefCardOptimizationReportService])
    ], PrefCardOptimizationReportComponent);
    return PrefCardOptimizationReportComponent;
}());
exports.PrefCardOptimizationReportComponent = PrefCardOptimizationReportComponent;
//# sourceMappingURL=pou-pref-card-optimization-report.component.js.map