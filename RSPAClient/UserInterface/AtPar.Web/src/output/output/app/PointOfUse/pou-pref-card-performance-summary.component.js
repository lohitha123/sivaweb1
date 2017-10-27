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
var pou_pref_card_performance_summary_service_1 = require("./pou-pref-card-performance-summary.service");
var file_saver_1 = require("file-saver");
var PrefCardPerformanceSummaryComponent = (function () {
    function PrefCardPerformanceSummaryComponent(spinnerService, atParCommonService, httpService, atParConstant, prefCardPerformanceSummaryReportService) {
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.prefCardPerformanceSummaryReportService = prefCardPerformanceSummaryReportService;
        this.growlMessage = [];
        this.toDate = new Date();
        this.lstProcedure = [];
        this.lstPhysicians = [];
        this.lstPrefSummary = [];
        this.lstFilterdProcedure = [];
        this.lstFilterdPhysician = [];
        this.defDuration = 0;
        this.statusCode = -1;
        this.showGrid = false;
        this.isMailDialog = false;
        this.chartClusterDataset = [];
        this.chartStackDataset = [];
        this.chartLineDataset = [];
        this.labelData = [];
        this.breadCrumbMenu = new routepath_1.Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    PrefCardPerformanceSummaryComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.spinnerService.start();
                        //await this.getPhysiciansByPrefOrProc();
                        //await this.getAllProcedureCodes();
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 1:
                        //await this.getPhysiciansByPrefOrProc();
                        //await this.getAllProcedureCodes();
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PrefCardPerformanceSummaryComponent.prototype.getPhysiciansByPrefOrProc = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getPhysiciansByPrefOrProc(AtParEnums_1.Physicians_Basedn.PROCEDURE).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstPhysicians = res.DataList;
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
                        this.clientErrorMsg(ex_1, 'getPhysiciansByPrefOrProc');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PrefCardPerformanceSummaryComponent.prototype.getAllProcedureCodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.atParCommonService.getCodes('PROCEDURES', '', '').then(function (result) {
                            var res = result.json();
                            _this.growlMessage = [];
                            switch (res.StatType) {
                                case AtParEnums_2.StatusType.Success: {
                                    _this.lstProcedure = res.DataList;
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
    PrefCardPerformanceSummaryComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
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
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, 'getMyPreferences');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PrefCardPerformanceSummaryComponent.prototype.filterProcedures = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllProcedureCodes()];
                    case 1:
                        _a.sent();
                        query = event.query.toUpperCase();
                        this.lstFilterdProcedure = [];
                        try {
                            if (query == '%') {
                                this.lstFilterdProcedure = this.lstProcedure;
                            }
                            else {
                                this.lstFilterdProcedure = this.lstProcedure.filter(function (x) { return (x.CODE.toUpperCase().startsWith(query) ||
                                    x.CODE.toUpperCase().endsWith(query) || x.CODE.toUpperCase() == query ||
                                    x.DESCRIPTION.toUpperCase().startsWith(query) || x.DESCRIPTION.toUpperCase().endsWith(query) ||
                                    x.DESCRIPTION.toUpperCase() == query); });
                            }
                        }
                        catch (ex) {
                            this.clientErrorMsg(ex, 'filterProcedures');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PrefCardPerformanceSummaryComponent.prototype.filterPhysicians = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPhysiciansByPrefOrProc()];
                    case 1:
                        _a.sent();
                        query = event.query.toUpperCase();
                        this.lstFilterdPhysician = [];
                        try {
                            if (this.selectedProcedure != null && this.selectedProcedure != undefined) {
                                if (query == '%') {
                                    this.lstFilterdPhysician = this.lstPhysicians.filter(function (x) { return x.PROCEDURE_CODE == _this.selectedProcedure.CODE; });
                                }
                                else {
                                    this.lstFilterdPhysician = this.lstPhysicians.filter(function (x) { return (x.PHYSICIAN_ID.toUpperCase().startsWith(query) ||
                                        x.PHYSICIAN_ID.toUpperCase().endsWith(query) || x.PHYSICIAN_ID.toUpperCase() == query ||
                                        x.FIRST_NAME.toUpperCase().startsWith(query) || x.FIRST_NAME.toUpperCase().endsWith(query) ||
                                        x.FIRST_NAME.toUpperCase() == query || x.LAST_NAME.toUpperCase().endsWith(query) ||
                                        x.LAST_NAME.toUpperCase() == query || x.LAST_NAME.toUpperCase().endsWith(query) ||
                                        x.MIDDLE_INITIAL.toUpperCase() == query || x.MIDDLE_INITIAL.toUpperCase().endsWith(query) ||
                                        x.MIDDLE_INITIAL.toUpperCase() == query) && (x.PROCEDURE_CODE == _this.selectedProcedure.CODE); });
                                }
                            }
                        }
                        catch (ex) {
                            this.clientErrorMsg(ex, 'filterProcedures');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PrefCardPerformanceSummaryComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var todayDate, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        this.growlMessage = [];
                        this.showGrid = false;
                        todayDate = new Date();
                        if (!(this.selectedProcedure == undefined || this.selectedProcedure == null || this.selectedProcedure == '')) return [3 /*break*/, 1];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Procedure code is mandatory" });
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(this.toDate > todayDate)) return [3 /*break*/, 2];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To date must be less than or equal to today's date" });
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(this.fromDate > this.toDate)) return [3 /*break*/, 3];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date must be less than or equal to To Date" });
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.getData()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, 'btnGo_Click');
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PrefCardPerformanceSummaryComponent.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strProcID, strPhysicianId, date;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strProcID = '';
                        strPhysicianId = '';
                        if (this.selectedProcedure == undefined || this.selectedProcedure.CODE == null || this.selectedProcedure.CODE == undefined) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Procedure code is mandatory" });
                            return [2 /*return*/];
                        }
                        if (this.selectedPhysician != undefined && this.selectedPhysician.PHYSICIAN_ID != null && this.selectedPhysician.PHYSICIAN_ID != undefined) {
                            strPhysicianId = this.selectedPhysician.PHYSICIAN_ID;
                        }
                        strProcID = this.selectedProcedure.CODE;
                        date = this.toDate;
                        date.setDate(date.getDate() + 1);
                        this.strFromDate = this.getDateString(this.fromDate);
                        this.strToDate = this.getDateString(date);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.prefCardPerformanceSummaryReportService.getPrefPerformanceRpt(this.strFromDate, this.strToDate, strProcID, strPhysicianId).then(function (result) {
                                _this.spinnerService.stop();
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.chartClusterDataset = [];
                                _this.chartLineDataset = [];
                                _this.chartStackDataset = [];
                                var dataPrePick = [];
                                var dataPicked = [];
                                var dataAddPick = [];
                                var dataReturned = [];
                                var dataWasted = [];
                                var dataIssuePick = [];
                                _this.labelData = [];
                                _this.toDate = new Date();
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstPrefSummary = res.DataList;
                                        for (var i = 0; i < _this.lstPrefSummary.length; i++) {
                                            _this.lstPrefSummary[i].QAPREPICKADD = parseFloat(_this.lstPrefSummary[i].QAPREPICKADD).toFixed(2);
                                            _this.lstPrefSummary[i].PICKED = parseFloat(_this.lstPrefSummary[i].PICKED).toFixed(2);
                                            _this.lstPrefSummary[i].ADDEDDURINGPICK = parseFloat(_this.lstPrefSummary[i].ADDEDDURINGPICK).toFixed(2);
                                            _this.lstPrefSummary[i].ISSUEDAFTERPICK = parseFloat(_this.lstPrefSummary[i].ISSUEDAFTERPICK).toFixed(2);
                                            _this.lstPrefSummary[i].RETURNED = parseFloat(_this.lstPrefSummary[i].RETURNED).toFixed(2);
                                            _this.lstPrefSummary[i].WASTED = parseFloat(_this.lstPrefSummary[i].WASTED).toFixed(2);
                                            _this.lstPrefSummary[i].TOTALCONSUMED = parseFloat(_this.lstPrefSummary[i].TOTALCONSUMED).toFixed(2);
                                            _this.chartClusterDataset.push({ label: _this.lstPrefSummary[i].CASE_ID, backgroundColor: _this.getRandomColor(), borderColor: '#7CB342', data: [_this.lstPrefSummary[i].WASTED, _this.lstPrefSummary[i].RETURNED, _this.lstPrefSummary[i].ISSUEDAFTERPICK, _this.lstPrefSummary[i].ADDEDDURINGPICK, _this.lstPrefSummary[i].PICKED, _this.lstPrefSummary[i].QAPREPICKADD], fill: true });
                                            _this.labelData.push(_this.lstPrefSummary[i].CASE_ID);
                                            var totalQty = 0;
                                            totalQty = (parseFloat(_this.lstPrefSummary[i].QAPREPICKADD) + parseFloat(_this.lstPrefSummary[i].PICKED) + parseFloat(_this.lstPrefSummary[i].ADDEDDURINGPICK) + parseFloat(_this.lstPrefSummary[i].ISSUEDAFTERPICK) + parseFloat(_this.lstPrefSummary[i].RETURNED) + parseFloat(_this.lstPrefSummary[i].WASTED));
                                            dataPrePick.push((parseFloat(_this.lstPrefSummary[i].QAPREPICKADD) * 100 / totalQty).toFixed(2));
                                            dataPicked.push((parseFloat(_this.lstPrefSummary[i].PICKED) * 100 / totalQty).toFixed(2));
                                            dataAddPick.push((parseFloat(_this.lstPrefSummary[i].ADDEDDURINGPICK) * 100 / totalQty).toFixed(2));
                                            dataIssuePick.push((parseFloat(_this.lstPrefSummary[i].ISSUEDAFTERPICK) * 100 / totalQty).toFixed(2));
                                            dataReturned.push((parseFloat(_this.lstPrefSummary[i].RETURNED) * 100 / totalQty).toFixed(2));
                                            dataWasted.push((parseFloat(_this.lstPrefSummary[i].WASTED) * 100 / totalQty).toFixed(2));
                                            //if (i == 0) {
                                            //    this.chartClusterDataset.push({ label: this.lstPrefSummary[i].CASE_ID, backgroundColor: '#338aeb', borderColor: '#7CB342', data: [this.lstPrefSummary[i].QAPREPICKADD, this.lstPrefSummary[i].PICKED, this.lstPrefSummary[i].ADDEDDURINGPICK, this.lstPrefSummary[i].ISSUEDAFTERPICK, this.lstPrefSummary[i].RETURNED, this.lstPrefSummary[i].WASTED] })
                                            //}
                                            //else {
                                            //    this.chartClusterDataset.push({ label: this.lstPrefSummary[i].CASE_ID, backgroundColor: '#ffb552', borderColor: '#7CB342', data: [this.lstPrefSummary[i].QAPREPICKADD, this.lstPrefSummary[i].PICKED, this.lstPrefSummary[i].ADDEDDURINGPICK, this.lstPrefSummary[i].ISSUEDAFTERPICK, this.lstPrefSummary[i].RETURNED, this.lstPrefSummary[i].WASTED] })
                                            //}
                                        }
                                        _this.chartLineDataset.push({ label: 'Added PrePick QA ', backgroundColor: '', borderColor: '#2c7cd5', data: dataPrePick, fill: false });
                                        _this.chartLineDataset.push({ label: 'Added during Pick ', backgroundColor: '', borderColor: '#e84018', data: dataAddPick, fill: false });
                                        _this.chartLineDataset.push({ label: 'Picked ', backgroundColor: '', borderColor: '#ffb34c', data: dataPicked, fill: false });
                                        _this.chartLineDataset.push({ label: 'Wasted ', backgroundColor: '', borderColor: '#113865', data: dataWasted, fill: false });
                                        _this.chartLineDataset.push({ label: 'Returned ', backgroundColor: '', borderColor: '#bfbfbf', data: dataReturned, fill: false });
                                        _this.chartLineDataset.push({ label: 'Issued after Pick ', backgroundColor: '', borderColor: '#00608c', data: dataIssuePick, fill: false });
                                        _this.chartStackDataset.push({ label: 'Added PrePick QA ', backgroundColor: '#2c7cd5', borderColor: '#7CB342', data: dataPrePick, fill: false });
                                        _this.chartStackDataset.push({ label: 'Added during Pick ', backgroundColor: '#e84018', borderColor: '#7CB342', data: dataAddPick, fill: false });
                                        _this.chartStackDataset.push({ label: 'Picked ', backgroundColor: '#ffb34c', borderColor: '#7CB342', data: dataPicked, fill: true });
                                        _this.chartStackDataset.push({ label: 'Wasted ', backgroundColor: '#113865', borderColor: '#7CB342', data: dataWasted, fill: true });
                                        _this.chartStackDataset.push({ label: 'Returned ', backgroundColor: '#bfbfbf', borderColor: '#7CB342', data: dataReturned, fill: true });
                                        _this.chartStackDataset.push({ label: 'Issued after Pick ', backgroundColor: '#00608c', borderColor: '#7CB342', data: dataIssuePick, fill: true });
                                        _this.showGrid = true;
                                        _this.getChart('Stack');
                                        _this.getIPSSLConfig();
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
    PrefCardPerformanceSummaryComponent.prototype.getChart = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.showCluster = false;
                this.showLine = false;
                this.show3d = false;
                this.showStack = false;
                this.chartData = [];
                this.options = [];
                if (type == 'Cluster') {
                    this.showCluster = true;
                    this.chartData = {
                        labels: ['Wasted ', 'Returned ', 'Issued after Pick ', 'Added during Pick ', 'Picked', 'Added PrePick QA'],
                        datasets: this.chartClusterDataset
                    };
                    this.options = {
                        scales: {
                            xAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Qty used in $'
                                    }
                                }]
                        }
                    };
                }
                else if (type == 'Line') {
                    this.showLine = true;
                    this.chartData = {
                        labels: this.labelData,
                        datasets: this.chartLineDataset
                    };
                    this.options = {
                        scales: {
                            xAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Case Id'
                                    }
                                }],
                            yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Qty used in $'
                                    }
                                }]
                        }
                    };
                }
                else if (type == 'Stack' || type == '3D') {
                    this.showStack = true;
                    this.chartData = {
                        labels: this.labelData,
                        datasets: this.chartStackDataset
                    };
                    this.options = {
                        scales: {
                            xAxes: [{
                                    stacked: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: '% of qty uses'
                                    },
                                    ticks: {
                                        beginAtZero: true,
                                        steps: 10,
                                        stepValue: 5,
                                        max: 100
                                    }
                                }],
                            yAxes: [{
                                    stacked: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Case Id'
                                    }
                                }]
                        }
                    };
                }
                else {
                }
                return [2 /*return*/];
            });
        });
    };
    PrefCardPerformanceSummaryComponent.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    PrefCardPerformanceSummaryComponent.prototype.getDateString = function (MyDate) {
        var MyDateString = ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/' + ('0' + MyDate.getDate()).slice(-2) + '/' + MyDate.getFullYear();
        return MyDateString;
    };
    PrefCardPerformanceSummaryComponent.prototype.onExportToExcelClick = function (event) {
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
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "pou_prefcard_perf_summary.xls");
                        }
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
    PrefCardPerformanceSummaryComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        this.growlMessage = [];
                        return [4 /*yield*/, this.exportReportDetails('Print')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'Point Of Use - Pref Card Performance Summary' + '</title>');
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
    PrefCardPerformanceSummaryComponent.prototype.onSendMailIconClick = function (event) {
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
    PrefCardPerformanceSummaryComponent.prototype.onSendMailClick = function (event) {
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
                        this.growlMessage = [];
                        this.isMailDialog = false;
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.atParCommonService.sendEmbeddedEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Pref Card Performance Summary', JSON.stringify(html), this.toMailAddr, this.chartName, false, AtParEnums_2.MailPriority.Normal.toString(), '')
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
    PrefCardPerformanceSummaryComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, chartImage, image, ChartPath, ProductName, i, ex_7;
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
                        chartImage = document.getElementById("myChart");
                        image = chartImage.toDataURL("image/png");
                        image = image.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.atParCommonService.saveImage(image, "prefcard_performance_summary").
                                then(function (res) {
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
                        this.chartName = 'prefcard_performance_summary.png';
                        return [4 /*yield*/, this.getIPSSLConfig()];
                    case 3:
                        _a.sent();
                        // imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';
                        ChartPath = this.httpService.BaseUrl + '/Uploaded/';
                        ProductName = "Pref Card Performance Summary";
                        htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=3 align=left><span class=c2>" + ProductName + " " + "<b>" + this.strFromDate + "  to  " + this.strToDate + " </b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType == 'Mail') {
                                htmlBuilder += "<TR height=63><TD align=left bgcolor='#fe9836' colspan=2><IMG height=63  width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3></TD></TR>"; //<img src=" + imgserverPath + "topbg.jpg width=82% height=63>
                            }
                            else {
                                htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></TR>";
                            }
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=3 align=left><span class=c2>" + ProductName + " " + "<b>" + this.strFromDate + "  to  " + this.strToDate + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> ";
                        htmlBuilder += "<tr><td colspan=2 align=center>";
                        htmlBuilder += "<table align=center  >";
                        htmlBuilder += "<tr bgcolor=#ffffff>";
                        if (reqType == "Mail") {
                            htmlBuilder += "<td align=center colspan=9 align=left nowrap width=700 height=250><span class=c3><img src= " + ChartPath + this.chartName + "  width=800 height=250></span></td>";
                        }
                        else {
                            htmlBuilder += "<td align=center colspan=9 align=left nowrap width=700 height=250><span class=c3><img src=" + ChartPath + this.chartName + "  width=800 height=250></span></td>";
                        }
                        htmlBuilder += "</tr></table><tr><td>";
                        htmlBuilder += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
                        htmlBuilder += "<tr bgcolor=#d3d3d3>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Case Date</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Case ID</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Case Description</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Added PrePick QA ($)</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Picked ($)</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Added during Pick ($)</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Issued after Pick ($)</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Returned ($)</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Wasted ($)</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Total Consumed ($)</b></span></td>";
                        htmlBuilder += "</tr>";
                        if (this.lstPrefSummary.length > 0) {
                            for (i = 0; i < this.lstPrefSummary.length; i++) {
                                htmlBuilder += "<tr>";
                                if (reqType == "Excel") {
                                    htmlBuilder += "<td align=left nowrap><span class=c2>" + "'" + this.lstPrefSummary[i].PERFORM_DATE + "</span></td>";
                                    htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstPrefSummary[i].CASE_ID + "</span></td>";
                                    htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstPrefSummary[i].CASE_DESC + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + "'" + this.lstPrefSummary[i].QAPREPICKADD + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + "'" + this.lstPrefSummary[i].PICKED + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + "'" + this.lstPrefSummary[i].ADDEDDURINGPICK + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + "'" + this.lstPrefSummary[i].ISSUEDAFTERPICK + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + "'" + this.lstPrefSummary[i].RETURNED + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + "'" + this.lstPrefSummary[i].WASTED + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + "'" + this.lstPrefSummary[i].TOTALCONSUMED + "</span></td>";
                                    htmlBuilder += "</tr>";
                                }
                                else {
                                    htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstPrefSummary[i].PERFORM_DATE + "</span></td>";
                                    htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstPrefSummary[i].CASE_ID + "</span></td>";
                                    htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstPrefSummary[i].CASE_DESC + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstPrefSummary[i].QAPREPICKADD + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstPrefSummary[i].PICKED + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstPrefSummary[i].ADDEDDURINGPICK + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstPrefSummary[i].ISSUEDAFTERPICK + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstPrefSummary[i].RETURNED + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstPrefSummary[i].WASTED + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstPrefSummary[i].TOTALCONSUMED + "</span></td>";
                                    htmlBuilder += "</tr>";
                                }
                            }
                        }
                        htmlBuilder += "</table></td></tr>";
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
    PrefCardPerformanceSummaryComponent.prototype.getIPSSLConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.growlMessage = [];
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
                            })];
                    case 1:
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
                                        var imgserverPath = _this.gstrProtocal + '://' + _this.ipAddress + '/atpar/web/images/';
                                        _this.stackChartImag = imgserverPath + 'StackedBar.GIF';
                                        _this.chart3dImg = imgserverPath + 'Stacked3d.GIF';
                                        _this.lineChartImg = imgserverPath + 'LineChart.GIF';
                                        _this.clusterImg = imgserverPath + 'Clusteredbar.GIF';
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
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, 'getIPSSLConfig');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PrefCardPerformanceSummaryComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    PrefCardPerformanceSummaryComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    PrefCardPerformanceSummaryComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    PrefCardPerformanceSummaryComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PrefCardPerformanceSummaryComponent.prototype, "appId", void 0);
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], PrefCardPerformanceSummaryComponent.prototype, "dataTableComponent", void 0);
    PrefCardPerformanceSummaryComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-pref-card-performance-summary.component.html',
            providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, pou_pref_card_performance_summary_service_1.PrefCardPerformanceSummaryReportService],
        }),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            pou_pref_card_performance_summary_service_1.PrefCardPerformanceSummaryReportService])
    ], PrefCardPerformanceSummaryComponent);
    return PrefCardPerformanceSummaryComponent;
}());
exports.PrefCardPerformanceSummaryComponent = PrefCardPerformanceSummaryComponent;
//# sourceMappingURL=pou-pref-card-performance-summary.component.js.map