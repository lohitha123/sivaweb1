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
var router_1 = require("@angular/router");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var routepath_1 = require("../AtPar/Menus/routepath");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var pou_compilance_summary_report_service_1 = require("./pou-compilance-summary-report.service");
var AtParEnums_2 = require("../Shared/AtParEnums");
var file_saver_1 = require("file-saver");
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var CompilanceSummaryReportComponent = (function () {
    function CompilanceSummaryReportComponent(leftBarAnimateService, spinnerService, atParCommonService, httpService, atParConstant, parLocationComplianceSummaryReportService, router, route) {
        this.leftBarAnimateService = leftBarAnimateService;
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.parLocationComplianceSummaryReportService = parLocationComplianceSummaryReportService;
        this.router = router;
        this.route = route;
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
        this.bindLabelData = "";
        this.showGrid = false;
        this.statusCode = -1;
        this.minDateValue1 = new Date();
        this.data1 = [];
        this.label = [];
        this.dataSetlabel = [];
        this.dataSetbgcolor = [];
        this.dataSetbordercolor = [];
        this.dataSetdata = [];
        this.lstDept = [];
        this.lstParLoc = [];
        this.strCode = "";
        this.strDescr = "";
        this.lblTotalSavings = 0;
        this.lblTotalRecordCount = 0;
        this.appId = 0;
        this.precDept = "";
        this.lstDBData = [];
        this.lstDBtempData = [];
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    CompilanceSummaryReportComponent.prototype.ngOnInit = function () {
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
                        this.appId = 15;
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
                            return [2 /*return*/];
                        }
                        this.fromDate = new Date();
                        _b = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, this.defDateRange)];
                    case 2:
                        _b.fromDate = _c.sent();
                        this.toDate = new Date();
                        return [4 /*yield*/, this.bindDropDowns()];
                    case 3:
                        _c.sent();
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    CompilanceSummaryReportComponent.prototype.getDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var cDate, frmDate, todate, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showGrid = false;
                        this.tdExports = false;
                        this.spinnerService.start();
                        cDate = new Date();
                        cDate.setDate(this.toDate.getDate() + 1);
                        frmDate = this.convert(this.fromDate);
                        todate = this.convert(cDate);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.Department = (this.Department == null || this.Department == undefined) ? '' : this.Department;
                        this.ParLoc = (this.ParLoc == null || this.ParLoc == undefined) ? '' : this.ParLoc;
                        return [4 /*yield*/, this.parLocationComplianceSummaryReportService.getComplianceSummary(frmDate, todate, this.Department, this.ParLoc, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.appId).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var bgcolor = "#3391CE";
                                        var borderColor = "#1E88E5";
                                        var label = "data";
                                        _this.label = [];
                                        _this.dataSetbgcolor = [];
                                        _this.dataSetdata = [];
                                        _this.dataSetbordercolor = [];
                                        _this.lstDBtempData = data.DataDictionary["pReturnDS"]["Table1"];
                                        _this.showGrid = _this.lstDBtempData.length == 0 ? false : true;
                                        _this.tdExports = _this.lstDBtempData.length == 0 ? false : true;
                                        if (_this.showGrid == false && _this.tdExports == false) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No records were returned for the search criteria' });
                                            _this.spinnerService.stop();
                                            return;
                                        }
                                        _this.spinnerService.stop();
                                        for (var i = 0; i <= _this.lstDBtempData.length - 1; i++) {
                                            _this.label.push(_this.lstDBtempData[i].POU_LOC);
                                            _this.dataSetdata.push(_this.lstDBtempData[i].COMPLIANCE);
                                            _this.dataSetbgcolor.push(bgcolor);
                                            _this.dataSetbordercolor.push(borderColor);
                                        }
                                        _this.option = {
                                            scales: {
                                                yAxes: [{
                                                        stacked: true,
                                                        gridLines: {
                                                            display: true,
                                                            color: "rgba(255,99,132,0.2)"
                                                        },
                                                        scaleLabel: {
                                                            display: true,
                                                            labelString: '%Compliance'
                                                        }
                                                    }],
                                                xAxes: [{
                                                        gridLines: {
                                                            display: false,
                                                            color: "rgba(255,99,132,0.2)"
                                                        },
                                                        scaleLabel: {
                                                            display: true,
                                                            labelString: 'Par Location'
                                                        }
                                                    }]
                                            },
                                            title: {
                                                display: true,
                                                text: "Par Location Compliance Summary"
                                            }
                                        };
                                        _this.data1 = {
                                            labels: _this.label,
                                            datasets: [
                                                {
                                                    label: '',
                                                    backgroundColor: _this.dataSetbgcolor,
                                                    borderColor: _this.dataSetbordercolor,
                                                    data: _this.dataSetdata,
                                                }
                                            ],
                                            options: _this.option
                                        };
                                        _this.lstDBData = _this.lstDBtempData; //.forEach(x => { x.ISSUE_QTY = parseFloat(x.ISSUE_QTY).toFixed(2) });
                                        _this.lstDBData.forEach(function (x) {
                                            x.ISSUE_QTY = parseFloat(x.ISSUE_QTY).toFixed(2),
                                                x.ISSUE_VALUE = parseFloat(x.ISSUE_VALUE).toFixed(2),
                                                x.RET_QTY = parseFloat(x.RET_QTY).toFixed(2),
                                                x.RET_VALUE = parseFloat(x.RET_VALUE).toFixed(2),
                                                x.UN_ACC_QTY = parseFloat(x.UN_ACC_QTY).toFixed(2),
                                                x.UN_ACC_VALUE = parseFloat(x.UN_ACC_VALUE).toFixed(2);
                                            x.COMPLIANCE = parseFloat(x.COMPLIANCE).toFixed(2),
                                                x.DOLLARS_CAPTURED = parseFloat(x.DOLLARS_CAPTURED).toFixed(2);
                                        });
                                        _this.noOfrecordsMsg = _this.lstDBtempData.length;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.StatusCode == 1102002) {
                                            _this.showGrid = false;
                                            _this.tdExports = false;
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No records were returned for the search criteria' });
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else {
                                            _this.showGrid = false;
                                            _this.tdExports = false;
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.tdExports = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.tdExports = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, 'getDataGrid');
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CompilanceSummaryReportComponent.prototype.ddlDept_SelectedIndexChanged = function (dept) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ParLoc = '';
                        if (this.precDept != dept) {
                            this.precDept = dept;
                            this.showGrid = false;
                            this.tdExports = false;
                        }
                        if (!(dept != '')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getDeptCartAllocations('', dept, AtParEnums_2.EnumApps.PointOfUse, AtParEnums_1.LocationType.P.toString())];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.lstParLoc = [];
                        this.lstParLoc.push({ label: 'Select Loc', value: '' });
                        this.ParLoc = '';
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CompilanceSummaryReportComponent.prototype.getDeptCartAllocations = function (bUnit, deptID, appID, locType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.parLocationComplianceSummaryReportService.getDeptCartAllocations(bUnit, deptID, appID, locType).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstParLoc = [];
                                _this.lstParLoc.push({ label: 'Select Loc', value: '' });
                                switch (res.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        for (var i = 0; i < res.DataList.length; i++) {
                                            _this.lstParLoc.push({ label: res.DataList[i].CART_ID, value: res.DataList[i].CART_ID });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.tdExports = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.tdExports = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.tdExports = false;
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
                        this.clientErrorMsg(ex_2, 'getDeptCartAllocations');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CompilanceSummaryReportComponent.prototype.getDefDateRange = function () {
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
    CompilanceSummaryReportComponent.prototype.addDays = function (theDate, days) {
        return new Date(theDate.getTime() - days * 24 * 60 * 60 * 1000);
    };
    CompilanceSummaryReportComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    CompilanceSummaryReportComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    CompilanceSummaryReportComponent.prototype.convert = function (str) {
        var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    CompilanceSummaryReportComponent.prototype.btnGo_Click = function () {
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
                        return [4 /*yield*/, this.getDataGrid()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CompilanceSummaryReportComponent.prototype.validateSearchFields = function () {
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
    CompilanceSummaryReportComponent.prototype.onSendMailIconClick = function (event) {
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
    CompilanceSummaryReportComponent.prototype.bindDropDowns = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getDepartment('', '', this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstDept = [];
                                _this.lstDept.push({ label: 'Select Dept', value: '' });
                                _this.lstParLoc.push({ label: 'Select Loc', value: '' });
                                switch (res.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        for (var i = 0; i < res.DataList.length; i++) {
                                            _this.lstDept.push({ label: res.DataList[i].DEPT_ID + " - " + res.DataList[i].DEPT_NAME, value: res.DataList[i].DEPT_ID });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
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
                        this.clientErrorMsg(ex_4, 'bindDropDowns');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CompilanceSummaryReportComponent.prototype.onSendMailClick = function (event) {
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
                        return [4 /*yield*/, this.atParCommonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Par Location Compliance Summary Report', JSON.stringify(html), this.toMailAddr, AtParEnums_2.MailPriority.Normal.toString(), '')
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
    CompilanceSummaryReportComponent.prototype.onPrintClick = function (event) {
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
                                mywindow.document.write('<html><head><title>' + 'Point Of Use - Par Location Compliance Summary Report' + '</title>');
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
    CompilanceSummaryReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    CompilanceSummaryReportComponent.prototype.onExportToExcelClick = function (event) {
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
                        blob = new Blob([html], {
                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                        });
                        file_saver_1.saveAs(blob, "ParLocationComplianceSummaryReport.xls");
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
    CompilanceSummaryReportComponent.prototype.onPouLocClick = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var cDate, fromDate, toDate, navigationExtras, menuItems, i, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        cDate = new Date();
                        cDate.setDate(this.toDate.getDate() + 1);
                        fromDate = this.convert(this.fromDate);
                        toDate = this.convert(cDate);
                        navigationExtras = {
                            //relativeTo: this.route
                            queryParams: {
                                "mode": 'Go',
                                "parLoc": item.POU_LOC,
                                "DeptID": item.DEPARTMENT_ID,
                                "fromDate": fromDate,
                                "toDate": toDate,
                                "OrgID": this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID],
                                "appId": AtParEnums_2.EnumApps.PointOfUse,
                            }
                        };
                        this.breadCrumbMenu.MENU_NAME = "Par Location Compliance Detail Report";
                        this.breadCrumbMenu.ROUTE = 'pointofuse/parlocationcompliancedetailreport';
                        this.breadCrumbMenu.SUB_MENU_NAME = '';
                        this.breadCrumbMenu.GROUP_NAME = 'Reports & Dashboards';
                        this.breadCrumbMenu.APP_NAME = 'Point Of Use';
                        this.breadCrumbMenu.IS_DIV = false;
                        localStorage.setItem('localBreadCrumb', JSON.stringify(this.breadCrumbMenu));
                        menuItems = JSON.parse(localStorage.getItem('MenuList'));
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < menuItems.length)) return [3 /*break*/, 4];
                        if (!(menuItems[i].ROUTE == 'pointofuse/parlocationcompliancedetailreport')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.leftBarAnimateService.emitChangeReportaActiveMenu(menuItems[i].MENU_NAME.trim())];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.router.navigate(['atpar/pointofuse/parlocationcompliancedetailreport'], navigationExtras)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "onPouLocClick");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CompilanceSummaryReportComponent.prototype.ExportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var chartImage, image, htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, imgParComplianceSummPath, ProductName, title, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chartImage = document.getElementById("ChartId");
                        image = chartImage.toDataURL("image/png");
                        image = image.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.atParCommonService.saveImage(image, "POUComplianceSummary").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        htmlBuilder = '';
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 10, , 11]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        imgParComplianceSummPath = '';
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
                    case 3:
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
                    case 4:
                        _a.sent();
                        // let phyname;
                        //imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/PROJ/new/RSPAClient/WebApi/AtParWebApi/Uploaded/';
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';
                        imgParComplianceSummPath = this.httpService.BaseUrl + '/Uploaded/';
                        ProductName = "Par Location Compliance Summary Report ";
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder = "<Table align=center width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td colspan=2 align=left height=63 nowrap><img width=18% height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=82% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<table width=90% align=center>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2> " + ProductName + "<b>" + this.convertDateFormate(this.fromDate) + "  to  " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                            //htmlBuilder += "<img src=" + imgserverPath + "POUComplianceSummary.png  width=1000 height=400>";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType == 'Mail') {
                                htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>";
                            }
                            else {
                                htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img width=18% height=63 src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></td></TR>";
                            }
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=3 align=left><span class=c2>" + ProductName + "<b>" + this.convertDateFormate(this.fromDate) + "  to  " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr>";
                        htmlBuilder += "<tr><td colspan=2 align=center>";
                        htmlBuilder += "<table align=center  >";
                        htmlBuilder += "<tr bgcolor=#ffffff>";
                        if (reqType == 'Mail') {
                            htmlBuilder += "<td align=center colspan=9 align=left nowrap width=700 height=250><span class=c3><img src=" + imgParComplianceSummPath + "POUComplianceSummary.png  width=700 height=250></span></td>";
                        }
                        else {
                            htmlBuilder += "<td align=center colspan=9 align=left nowrap width=700 height=250><span class=c3><img src=" + imgParComplianceSummPath + "POUComplianceSummary.png  width=700 height=250></span></td>";
                        }
                        htmlBuilder += "</tr></table><tr><td>";
                        htmlBuilder += "<table border=1 align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
                        htmlBuilder += "<tr bgcolor=#d3d3d3>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Par Location</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Issue Quantity</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Issue Value ($)</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Return Quantity</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Return Value ($)</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Unaccounted Quantity</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Unaccounted Value ($)</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>% Compliance</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>% Dollars Captured</b></span></td>";
                        htmlBuilder += "</tr>";
                        if (!(reqType == 'Print' || reqType == 'Mail')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.lstDBData.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td align=left nowrap> <span class=c2>" + header.POU_LOC + "</span></td>"
                                    + "<td align=right nowrap><span class=c2>" + header.ISSUE_QTY + "</span></td>"
                                    + "<td align=right nowrap><span class=c2>" + header.ISSUE_VALUE + "</span></td>"
                                    + "<td align=right nowrap><span class=c2>" + header.RET_QTY + "</span></td>"
                                    + "<td align=right nowrap><span class=c2>" + header.RET_VALUE + "</span></td>"
                                    + "<td align=right nowrap><span class=c2>" + header.UN_ACC_QTY + "</span></td>"
                                    + "<td align=right nowrap><span class=c2>" + header.UN_ACC_VALUE + "</span></td>"
                                    + "<td align=right nowrap><span class=c2>" + header.COMPLIANCE + "</span></td>"
                                    + "<td align=right nowrap><span class=c2>" + header.DOLLARS_CAPTURED + "</span></td>"
                                    + "</tr>";
                            })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.lstDBData.forEach(function (header) {
                            htmlBuilder += "<tr>"
                                + "<td align=left nowrap> <span class=c2>" + header.POU_LOC + "</span></td>"
                                + "<td align=right nowrap><span class=c2>" + "'" + header.ISSUE_QTY + "</span></td>"
                                + "<td align=right nowrap><span class=c2>" + "'" + header.ISSUE_VALUE + "</span></td>"
                                + "<td align=right nowrap><span class=c2>" + "'" + header.RET_QTY + "</span></td>"
                                + "<td align=right nowrap><span class=c2>" + "'" + header.RET_VALUE + "</span></td>"
                                + "<td align=right nowrap><span class=c2>" + "'" + header.UN_ACC_QTY + "</span></td>"
                                + "<td align=right nowrap><span class=c2>" + "'" + header.UN_ACC_VALUE + "</span></td>"
                                + "<td align=right nowrap><span class=c2>" + "'" + header.COMPLIANCE + "</span></td>"
                                + "<td align=right nowrap><span class=c2>" + "'" + header.DOLLARS_CAPTURED + "</span></td>"
                                + "</tr>";
                        })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        htmlBuilder += "</table></td></tr></table>";
                        return [4 /*yield*/, htmlBuilder];
                    case 9: return [2 /*return*/, _a.sent()];
                    case 10:
                        ex_9 = _a.sent();
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    CompilanceSummaryReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    CompilanceSummaryReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    CompilanceSummaryReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    CompilanceSummaryReportComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstDBData = null;
        this.lblTotalSavings = null;
        this.growlMessage = null;
        this.lstDept = null;
        this.lstParLoc = null;
        this.atParCommonService = null;
        this.startIndex = null;
        this.EndIndex = null;
        this.dataSetbgcolor = null;
        this.dataSetdata = null;
        this.dataSetlabel = null;
        this.bindLabelData = null;
        this.breadCrumbMenu = null;
        this.defDateRange = null;
        this.date2 = null;
        this.data1 = null;
    };
    CompilanceSummaryReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-compilance-summary-report.component.html',
            providers: [HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, pou_compilance_summary_report_service_1.ParLocationComplianceSummaryReportService
            ]
        }),
        __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            pou_compilance_summary_report_service_1.ParLocationComplianceSummaryReportService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], CompilanceSummaryReportComponent);
    return CompilanceSummaryReportComponent;
}());
exports.CompilanceSummaryReportComponent = CompilanceSummaryReportComponent;
//# sourceMappingURL=pou-compilance-summary-report.component.js.map