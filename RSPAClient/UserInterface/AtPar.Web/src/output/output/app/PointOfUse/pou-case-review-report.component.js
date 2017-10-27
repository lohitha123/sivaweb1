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
var pou_case_review_report_service_1 = require("./pou-case-review-report.service");
var file_saver_1 = require("file-saver");
var linq_es5_1 = require("linq-es5");
var CaseReviewReportComponent = (function () {
    function CaseReviewReportComponent(spinnerService, atParCommonService, httpService, atParConstant, caseReviewReportService) {
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.caseReviewReportService = caseReviewReportService;
        this.growlMessage = [];
        this.lstDepartments = [];
        this.lstCases = [];
        this.lstFilterdDept = [];
        this.lstFilterdCase = [];
        this.lstCasesHeaderSummary = [];
        this.lstCaseItemTotalSummary = [];
        this.lstCaseItemInfo = [];
        this.lstCaseLotSerialDetails = [];
        this.pickedTotal = 0;
        this.issuedTotal = 0;
        this.returnedTotal = 0;
        this.wastedTotal = 0;
        this.consumedTotal = 0;
        this.consumedCostTotal = 0;
        this.statusCode = -1;
        this.physician = '';
        this.procedure = '';
        this.showGrid = false;
        this.isMailDialog = false;
        this.breadCrumbMenu = new routepath_1.Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    CaseReviewReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                return [2 /*return*/];
            });
        });
    };
    CaseReviewReportComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.atParCommonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry).then(function (result) {
                            var res = result.json();
                            _this.growlMessage = [];
                            switch (res.StatType) {
                                case AtParEnums_2.StatusType.Success: {
                                    _this.defDuration = parseInt(res.DataVariable.toString());
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
    CaseReviewReportComponent.prototype.getUserDepartments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.atParCommonService.getUserDepartments(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.deviceTokenEntry).then(function (result) {
                            var res = result.json();
                            switch (res.StatType) {
                                case AtParEnums_2.StatusType.Success: {
                                    _this.lstDepartments = res.DataList;
                                    for (var index = 0; index < _this.lstDepartments.length; index++) {
                                        if (_this.lstDepartments[index].DEPT_NAME != null && _this.lstDepartments[index].DEPT_NAME != '') {
                                            _this.lstDepartments[index].FILTERED_DEPT = _this.lstDepartments[index].DEPARTMENT_ID + ' - ' + _this.lstDepartments[index].DEPT_NAME;
                                        }
                                        else {
                                            _this.lstDepartments[index].FILTERED_DEPT = _this.lstDepartments[index].DEPARTMENT_ID;
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
    CaseReviewReportComponent.prototype.selectDepartment = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.selectedCase = '';
                        return [4 /*yield*/, this.getCasesInformation()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CaseReviewReportComponent.prototype.fillLabels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var filterList, i;
            return __generator(this, function (_a) {
                try {
                    this.spinnerService.start();
                    filterList = this.lstCases.filter(function (x) { return (x.CASEDESCR == _this.selectedCase.CASEDESCR || x.CASE_ID == _this.selectedCase.CASE_ID); });
                    if (filterList.length > 0) {
                        this.caseDate = filterList[0].PERFORM_DATE;
                        this.procedure = filterList[0].PROCEDURENAME;
                        this.physician = filterList[0].PHYSICIANNAME;
                        if (filterList.length > 1) {
                            this.procedure = '';
                            this.physician = '';
                            for (i = 0; i < filterList.length; i++) {
                                this.procedure += filterList[i].PROCEDURENAME + "<br/>";
                                this.physician += filterList[i].PHYSICIANNAME + "<br/>";
                            }
                        }
                    }
                    else {
                        this.caseDate = '';
                        this.procedure = '';
                        this.physician = '';
                    }
                    this.spinnerService.stop();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, 'fillLabels');
                }
                return [2 /*return*/];
            });
        });
    };
    CaseReviewReportComponent.prototype.getCasesInformation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.caseReviewReportService.getCasesInformation(this.selectedDept.DEPARTMENT_ID).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstCases = res.DataList;
                                        for (var index = 0; index < _this.lstCases.length; index++) {
                                            if (_this.lstCases[index].CASE_DESC != null && _this.lstCases[index].CASE_DESC != '') {
                                                _this.lstCases[index].FILTERED_CASE = _this.lstCases[index].CASEDESCR;
                                            }
                                            else {
                                                _this.lstCases[index].FILTERED_CASE = _this.lstCases[index].CASE_ID;
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
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, 'getCasesInformation');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CaseReviewReportComponent.prototype.selectCase = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCasesInformation()];
                    case 1:
                        _a.sent();
                        this.fillLabels();
                        return [2 /*return*/];
                }
            });
        });
    };
    CaseReviewReportComponent.prototype.filterDepartments = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserDepartments()];
                    case 1:
                        _a.sent();
                        query = event.query.toUpperCase();
                        this.lstFilterdDept = [];
                        try {
                            if (query == '%') {
                                this.lstFilterdDept = this.lstDepartments;
                            }
                            else {
                                this.lstFilterdDept = this.lstDepartments.filter(function (x) { return (x.DEPARTMENT_ID.toUpperCase().startsWith(query) ||
                                    x.DEPARTMENT_ID.toUpperCase().endsWith(query) || x.DEPARTMENT_ID.toUpperCase() == query ||
                                    x.DEPT_NAME.toUpperCase().startsWith(query) || x.DEPT_NAME.toUpperCase().endsWith(query) ||
                                    x.DEPT_NAME.toUpperCase() == query); });
                            }
                        }
                        catch (ex) {
                            this.clientErrorMsg(ex, 'filterDepartments');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CaseReviewReportComponent.prototype.filterCases = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = event.query.toUpperCase();
                this.lstFilterdCase = [];
                try {
                    if (query == '%') {
                        this.lstFilterdCase = linq_es5_1.asEnumerable(this.lstCases).Distinct(function (x) { return x.CASE_ID; }).ToArray();
                    }
                    else {
                        this.lstFilterdCase = linq_es5_1.asEnumerable(this.lstCases.filter(function (x) { return (x.CASE_ID.toUpperCase().startsWith(query) ||
                            x.CASE_ID.toUpperCase().endsWith(query) || x.CASE_ID.toUpperCase() == query ||
                            x.CASE_DESC.toUpperCase().startsWith(query) || x.CASE_DESC.toUpperCase().endsWith(query) ||
                            x.CASE_DESC.toUpperCase() == query); })).Distinct(function (x) { return x.CASE_ID; }).ToArray();
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, 'filterCases');
                }
                return [2 /*return*/];
            });
        });
    };
    CaseReviewReportComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var filterCaseList, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        this.growlMessage = [];
                        this.showGrid = false;
                        this.pickedTotal = 0;
                        this.issuedTotal = 0;
                        this.returnedTotal = 0;
                        this.wastedTotal = 0;
                        this.consumedTotal = 0;
                        this.consumedCostTotal = 0;
                        if (this.selectedDept == undefined || this.selectedDept.DEPARTMENT_ID == '' || this.selectedDept.DEPARTMENT_ID == null) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Dept ID is mandatory' });
                            return [2 /*return*/];
                        }
                        if (this.selectedCase == undefined || this.selectedCase.CASE_ID == '' || this.selectedCase.CASE_ID == null) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Case is mandatory' });
                            return [2 /*return*/];
                        }
                        if (!(this.lstCases.length > 0)) return [3 /*break*/, 4];
                        filterCaseList = null;
                        filterCaseList = this.lstCases.filter(function (x) { return x.CASEDESCR == _this.selectedCase.CASE_ID || x.CASE_ID == _this.selectedCase.CASE_ID; });
                        if (!(filterCaseList != null)) return [3 /*break*/, 2];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.caseReviewReportService.getCaseReview(this.selectedCase.CASE_ID).then(function (result) {
                                _this.spinnerService.stop();
                                var res = result.json();
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        if (res.DataDictionary != null) {
                                            _this.lstCasesHeaderSummary = res.DataDictionary["lstGetcasereviewRptCaseHeaderSummary"];
                                            _this.lstCaseItemInfo = res.DataDictionary["lstGetcasereviewRptCaseItemInfo"];
                                            _this.lstCaseLotSerialDetails = res.DataDictionary["lstGetcasereviewRptCaseItemLotserialDetails"];
                                            _this.lstCaseItemTotalSummary = res.DataDictionary["lstGetcasereviewRptCaseItemTotalSummary"];
                                            if (_this.lstCasesHeaderSummary.length > 0) {
                                                var timeVal = _this.lstCasesHeaderSummary[0].ELAPSEDTIME.split(':');
                                                if (timeVal.length > 0) {
                                                    _this.lstCasesHeaderSummary[0].ELAPSEDTIME = parseInt(timeVal[0]).toFixed(2) + " hrs : " + parseInt(timeVal[1]).toFixed(2) + " mins";
                                                }
                                                else {
                                                    _this.lstCasesHeaderSummary[0].ELAPSEDTIME = "0.00 hrs : 0.00 mins";
                                                }
                                            }
                                            for (var i = 0; i < _this.lstCaseItemInfo.length; i++) {
                                                var list = _this.lstCaseLotSerialDetails.filter(function (x) { return x.ITEM == _this.lstCaseItemInfo[i].ITEM; });
                                                if (list.length > 0) {
                                                    var childPickedTotal = 0;
                                                    var childIssuedTotal = 0;
                                                    var childReturnedTotal = 0;
                                                    var childWastedTotal = 0;
                                                    var childConsumedTotal = 0;
                                                    for (var j = 0; j < list.length; j++) {
                                                        if (j == 0) {
                                                            list[j].ITEM_ID = list[j].ITEM;
                                                        }
                                                        else {
                                                            list[j].ITEM_ID = '';
                                                        }
                                                        list[j].OPEN_QTY = parseFloat(list[j].OPEN_QTY).toFixed(2);
                                                        list[j].HOLD_QTY = parseFloat(list[j].HOLD_QTY).toFixed(2);
                                                        list[j].ADDED_PREPICK_QA = parseFloat(list[j].ADDED_PREPICK_QA).toFixed(2);
                                                        list[j].ADDED_DURING_PICK = parseFloat(list[j].ADDED_DURING_PICK).toFixed(2);
                                                        list[j].TOTAL_PICKED = parseFloat(list[j].TOTAL_PICKED).toFixed(2);
                                                        list[j].ISSUED_AFTER_PICK = parseFloat(list[j].ISSUED_AFTER_PICK).toFixed(2);
                                                        list[j].RETURNED = parseFloat(list[j].RETURNED).toFixed(2);
                                                        list[j].WASTED = parseFloat(list[j].WASTED).toFixed(2);
                                                        list[j].CONSUMED = parseFloat(list[j].CONSUMED).toFixed(2);
                                                        childPickedTotal += parseFloat(list[j].TOTAL_PICKED);
                                                        childIssuedTotal += parseFloat(list[j].ISSUED_AFTER_PICK);
                                                        childReturnedTotal += parseFloat(list[j].RETURNED);
                                                        childWastedTotal += parseFloat(list[j].WASTED);
                                                        childConsumedTotal += parseFloat(list[j].CONSUMED);
                                                        if (list[j].EXPIRY_DATE == null) {
                                                            list[j].EXPIRY_DATE = '';
                                                        }
                                                    }
                                                    _this.lstCaseItemInfo[i].ITEMDETAILS = list;
                                                    _this.lstCaseItemInfo[i].CHILDPICKEDTOTAL = childPickedTotal.toFixed(2);
                                                    _this.lstCaseItemInfo[i].CHILDISSUEDTOTAL = childIssuedTotal.toFixed(2);
                                                    _this.lstCaseItemInfo[i].CHILDRETURNEDTOTAL = childReturnedTotal.toFixed(2);
                                                    _this.lstCaseItemInfo[i].CHILDWASTEDTOTAL = childWastedTotal.toFixed(2);
                                                    _this.lstCaseItemInfo[i].CHILDCONSUMEDTOTAL = childConsumedTotal.toFixed(2);
                                                    _this.lstCaseItemInfo[i].ITEM_COST = parseFloat(_this.lstCaseItemInfo[i].ITEM_COST).toFixed(2);
                                                    _this.lstCaseItemInfo[i].PICKED = parseFloat(_this.lstCaseItemInfo[i].PICKED).toFixed(2);
                                                    _this.lstCaseItemInfo[i].ISSUED_DURING_PROCEDURE = parseFloat(_this.lstCaseItemInfo[i].ISSUED_DURING_PROCEDURE).toFixed(2);
                                                    _this.lstCaseItemInfo[i].RETURNED = parseFloat(_this.lstCaseItemInfo[i].RETURNED).toFixed(2);
                                                    _this.lstCaseItemInfo[i].WASTED = parseFloat(_this.lstCaseItemInfo[i].WASTED).toFixed(2);
                                                    _this.lstCaseItemInfo[i].CONSUMED = parseFloat(_this.lstCaseItemInfo[i].CONSUMED).toFixed(2);
                                                    _this.lstCaseItemInfo[i].CONSUMED_COST = parseFloat(_this.lstCaseItemInfo[i].CONSUMED_COST).toFixed(2);
                                                    _this.pickedTotal = parseFloat(_this.pickedTotal) + parseFloat(_this.lstCaseItemInfo[i].PICKED);
                                                    _this.issuedTotal = parseFloat(_this.issuedTotal) + parseFloat(_this.lstCaseItemInfo[i].ISSUED_DURING_PROCEDURE);
                                                    _this.returnedTotal = parseFloat(_this.returnedTotal) + parseFloat(_this.lstCaseItemInfo[i].RETURNED);
                                                    _this.wastedTotal = parseFloat(_this.wastedTotal) + parseFloat(_this.lstCaseItemInfo[i].WASTED);
                                                    _this.consumedTotal = parseFloat(_this.consumedTotal) + parseFloat(_this.lstCaseItemInfo[i].CONSUMED);
                                                    _this.consumedCostTotal = parseFloat(_this.consumedCostTotal) + parseFloat(_this.lstCaseItemInfo[i].CONSUMED_COST);
                                                }
                                                _this.pickedTotal = _this.pickedTotal.toFixed(2);
                                                _this.issuedTotal = _this.issuedTotal.toFixed(2);
                                                _this.returnedTotal = _this.returnedTotal.toFixed(2);
                                                _this.wastedTotal = _this.wastedTotal.toFixed(2);
                                                _this.consumedTotal = _this.consumedTotal.toFixed(2);
                                                _this.consumedCostTotal = _this.consumedCostTotal.toFixed(2);
                                            }
                                            _this.showGrid = true;
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
                        return [3 /*break*/, 3];
                    case 2:
                        //tdImages.Visible = False
                        //pnlCaseReview.Visible = False
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        //tdImages.Visible = False
                        //pnlCaseReview.Visible = False
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, 'btnGo_Click');
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CaseReviewReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_3;
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
                            file_saver_1.saveAs(blob, "pou_case_review_report.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, 'onExportToExcelClick');
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CaseReviewReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_4;
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
                                mywindow.document.write('<html><head><title>' + 'Point Of Use - Case Review Report' + '</title>');
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
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, 'onPrintClick');
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CaseReviewReportComponent.prototype.onSendMailIconClick = function (event) {
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
    CaseReviewReportComponent.prototype.onSendMailClick = function (event) {
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
                        return [4 /*yield*/, this.exportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.atParCommonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Case Review Report', JSON.stringify(html), this.toMailAddr, AtParEnums_2.MailPriority.Normal.toString(), '')
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
    CaseReviewReportComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, title, i, j, ex_6;
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
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data;
                                return __generator(this, function (_a) {
                                    data = res.json();
                                    switch (data.StatType) {
                                        case AtParEnums_2.StatusType.Success: {
                                            this.ipAddress = data.DataVariable.toString();
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Error: {
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Warn: {
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Custom: {
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    if (data.StatType != AtParEnums_2.StatusType.Success) {
                                        htmlBuilder = '';
                                        return [2 /*return*/, htmlBuilder];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.atParCommonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data;
                                return __generator(this, function (_a) {
                                    this.growlMessage = [];
                                    data = res.json();
                                    switch (data.StatType) {
                                        case AtParEnums_2.StatusType.Success: {
                                            this.gstrProtocal = data.Data.PROTOCOL.toString();
                                            this.gstrServerName = data.Data.SERVER_NAME.toString();
                                            this.gstrPortNo = data.Data.PORT_NO.toString();
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Error: {
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Warn: {
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Custom: {
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    if (data.StatType != AtParEnums_2.StatusType.Success) {
                                        htmlBuilder = '';
                                        return [2 /*return*/, htmlBuilder];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 3:
                        _a.sent();
                        //imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td  align=left  width='15%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + ">"
                                + "</td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td > </TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "color:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2><b> Point Of Use Case Review Report </b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            htmlBuilder += "<TR width='100%'><td colspan=2  align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + " nowrap></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "color:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2><b> Point Of Use Case Review Report </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr> ";
                        if (reqType == 'Excel') {
                            htmlBuilder += "<table align=center border=1 width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + ">";
                            htmlBuilder += "<tr>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Case Open</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCasesHeaderSummary[0].CASE_PERFORM_DATE + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Total Qty Items Picked & Issued </span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemTotalSummary[0].TOTAL_QTY_ITEMS_PICKED_ISSUED + "</span></td>";
                            htmlBuilder += "</tr>";
                            htmlBuilder += "<tr>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Case Closed</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCasesHeaderSummary[0].CASE_CLOSED_DATE + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Total Qty Items Consumed</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemTotalSummary[0].TOTAL_QTY_ITEMS_CONSUMED + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Consumed</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemTotalSummary[0].CONSUMED_PERCENTAGE + "% </span></td>";
                            htmlBuilder += "</tr>";
                            htmlBuilder += "<tr>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Total Time Elapsed</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCasesHeaderSummary[0].ELAPSEDTIME + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Total Qty Items Returned</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemTotalSummary[0].TOTAL_QTY_ITEMS_RETURNED + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Returned</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemTotalSummary[0].RETURNED_PERCENTAGE + "% </span></td>";
                            htmlBuilder += "</tr>";
                            htmlBuilder += "<tr>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Total # Items for Case</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo.length + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Total Qty Items Wasted</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemTotalSummary[0].TOTAL_QTY_ITEMS_WASTED + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Wasted</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemTotalSummary[0].WASTED_PERCENTAGE + "% </span></td>";
                            htmlBuilder += "</tr>";
                            htmlBuilder += "</table>";
                        }
                        else {
                            htmlBuilder += "<table align=center border=1 width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + ">";
                            htmlBuilder += "<tr>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Case Open</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCasesHeaderSummary[0].CASE_PERFORM_DATE + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Total Qty Items Picked & Issued </span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemTotalSummary[0].TOTAL_QTY_ITEMS_PICKED_ISSUED + "</span></td>";
                            htmlBuilder += "</tr>";
                            htmlBuilder += "<tr>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Case Closed</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCasesHeaderSummary[0].CASE_CLOSED_DATE + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Total Qty Items Consumed</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemTotalSummary[0].TOTAL_QTY_ITEMS_CONSUMED + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Consumed</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemTotalSummary[0].CONSUMED_PERCENTAGE + "% </span></td>";
                            htmlBuilder += "</tr>";
                            htmlBuilder += "<tr>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Total Time Elapsed</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCasesHeaderSummary[0].ELAPSEDTIME + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Total Qty Items Returned</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemTotalSummary[0].TOTAL_QTY_ITEMS_RETURNED + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Returned</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemTotalSummary[0].RETURNED_PERCENTAGE + "% </span></td>";
                            htmlBuilder += "</tr>";
                            htmlBuilder += "<tr>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Total # Items for Case</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo.length + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Total Qty Items Wasted</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemTotalSummary[0].TOTAL_QTY_ITEMS_WASTED + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>Wasted</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemTotalSummary[0].WASTED_PERCENTAGE + "% </span></td>";
                            htmlBuilder += "</tr>";
                            htmlBuilder += "</table>";
                        }
                        htmlBuilder += "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
                        htmlBuilder += "<tr bgcolor=#d3d3d3>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Item</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Item Description</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Item Cost</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Picked</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Issued during Procedure</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Returned</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Wasted</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Consumed</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Consumed Cost</b></span></td>";
                        htmlBuilder += "</tr>";
                        for (i = 0; i < this.lstCaseItemInfo.length; i++) {
                            htmlBuilder += "<tr>";
                            if (reqType == 'Excel') {
                                htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEM + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEM_DESCRIPTION + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEM_COST + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].PICKED + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ISSUED_DURING_PROCEDURE + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].RETURNED + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].WASTED + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].CONSUMED + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].CONSUMED_COST + "</span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEM + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEM_DESCRIPTION + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEM_COST + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].PICKED + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ISSUED_DURING_PROCEDURE + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].RETURNED + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].WASTED + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].CONSUMED + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].CONSUMED_COST + "</span></td>";
                            }
                            htmlBuilder += "</tr>";
                            if (this.lstCaseItemInfo[i].ITEMDETAILS.length > 0) {
                                htmlBuilder += "<tr>";
                                htmlBuilder += "<td colspan=9>";
                                htmlBuilder += "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
                                htmlBuilder += "<tr bgcolor=#d3d3d3>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Item</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Transaction Date</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Transaction Time</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>User ID</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Serial No</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Lot No</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Expiration Date</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Pref Qty</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Hold Qty</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Added Prepick QA</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Added during Pick</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Total Picked</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Issued after Pick</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Returned</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Wasted</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Consumed</b></span></td>";
                                htmlBuilder += "</tr>";
                            }
                            for (j = 0; j < this.lstCaseItemInfo[i].ITEMDETAILS.length; j++) {
                                htmlBuilder += "<tr>";
                                if (reqType == 'Excel') {
                                    htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ITEM_ID + "</span></td>";
                                    htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].TRANSACTION_DATE + "</span></td>";
                                    htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].TRANSACTION_TIME + "</span></td>";
                                    htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].USER_ID + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].SERIAL_NUMBER + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].LOT_NUMBER + "</span></td>";
                                    htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].EXPIRY_DATE + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ADDED_PREPICK_QA + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].HOLD_QTY + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ADDED_PREPICK_QA + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ADDED_DURING_PICK + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].TOTAL_PICKED + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ISSUED_AFTER_PICK + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].RETURNED + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].WASTED + "</span></td>";
                                }
                                else {
                                    htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ITEM_ID + "</span></td>";
                                    htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].TRANSACTION_DATE + "</span></td>";
                                    htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].TRANSACTION_TIME + "</span></td>";
                                    htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].USER_ID + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].SERIAL_NUMBER + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].LOT_NUMBER + "</span></td>";
                                    htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].EXPIRY_DATE + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ADDED_PREPICK_QA + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].HOLD_QTY + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ADDED_PREPICK_QA + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ADDED_DURING_PICK + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].TOTAL_PICKED + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ISSUED_AFTER_PICK + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].RETURNED + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].WASTED + "</span></td>";
                                }
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + "" + "</span></td>";
                                htmlBuilder += "</tr>";
                            }
                            htmlBuilder += "<tr bgcolor=#d3d3d3>";
                            htmlBuilder += "<td align=right nowrap colspan='11'><span class=c3>" + " " + "</span></td>";
                            //If Not grdDetails.FooterRow Is Nothing Then
                            if (reqType == "Excel") {
                                htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.lstCaseItemInfo[i].CHILDPICKEDTOTAL + "</b></span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.lstCaseItemInfo[i].CHILDISSUEDTOTAL + "</b></span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.lstCaseItemInfo[i].CHILDRETURNEDTOTAL + "</b></span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.lstCaseItemInfo[i].CHILDWASTEDTOTAL + "</b></span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.lstCaseItemInfo[i].CHILDCONSUMEDTOTAL + "</b></span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.lstCaseItemInfo[i].CHILDPICKEDTOTAL + "</b></span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.lstCaseItemInfo[i].CHILDISSUEDTOTAL + "</b></span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.lstCaseItemInfo[i].CHILDRETURNEDTOTAL + "</b></span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.lstCaseItemInfo[i].CHILDWASTEDTOTAL + "</b></span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.lstCaseItemInfo[i].CHILDCONSUMEDTOTAL + "</b></span></td>";
                            }
                            htmlBuilder += "</tr>";
                            htmlBuilder += "</table>";
                            htmlBuilder += "</td>";
                            htmlBuilder += "</tr>";
                        }
                        htmlBuilder += "<tr bgcolor=#d3d3d3>";
                        htmlBuilder += "<td align=left nowrap><span class=c3><b>" + "Totals" + "</b></span></td>";
                        htmlBuilder += "<td align=right nowrap colspan='2'><span class=c3>" + " " + "</span></td>";
                        //If Not grdCaseReview.FooterRow Is Nothing Then
                        if (reqType == 'Excel') {
                            htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.pickedTotal + "</b></span></td>";
                            htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.issuedTotal + "</b></span></td>";
                            htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.returnedTotal + "</b></span></td>";
                            htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.wastedTotal + "</b></span></td>";
                            htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.consumedTotal + "</b></span></td>";
                            htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.consumedCostTotal + "</b></span></td>";
                        }
                        else {
                            htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.pickedTotal + "</b></span></td>";
                            htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.issuedTotal + "</b></span></td>";
                            htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.returnedTotal + "</b></span></td>";
                            htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.wastedTotal + "</b></span></td>";
                            htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.consumedTotal + "</b></span></td>";
                            htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.consumedCostTotal + "</b></span></td>";
                        }
                        htmlBuilder += "</tr>";
                        htmlBuilder += "</table></Table>";
                        return [4 /*yield*/, htmlBuilder];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        ex_6 = _a.sent();
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CaseReviewReportComponent.prototype.calculatePickedTotal = function (Item) {
        var Total = 0;
        for (var i = 0; i < this.lstCaseLotSerialDetails.length; i++) {
            if (this.lstCaseLotSerialDetails[i].ITEM == Item) {
                Total += parseFloat(this.lstCaseLotSerialDetails[i].TOTAL_PICKED);
            }
        }
        return Total;
    };
    CaseReviewReportComponent.prototype.calculateIssuedTotal = function (Item) {
        var Total = 0;
        for (var i = 0; i < this.lstCaseLotSerialDetails.length; i++) {
            if (this.lstCaseLotSerialDetails[i].ITEM == Item) {
                Total += parseFloat(this.lstCaseLotSerialDetails[i].ISSUED_AFTER_PICK);
            }
        }
        return Total;
    };
    CaseReviewReportComponent.prototype.calculateReturnedTotal = function (Item) {
        var Total = 0;
        for (var i = 0; i < this.lstCaseLotSerialDetails.length; i++) {
            if (this.lstCaseLotSerialDetails[i].ITEM == Item) {
                Total += parseFloat(this.lstCaseLotSerialDetails[i].RETURNED);
            }
        }
        return Total;
    };
    CaseReviewReportComponent.prototype.calculateWastedTotal = function (Item) {
        var Total = 0;
        for (var i = 0; i < this.lstCaseLotSerialDetails.length; i++) {
            if (this.lstCaseLotSerialDetails[i].ITEM == Item) {
                Total += parseFloat(this.lstCaseLotSerialDetails[i].WASTED);
            }
        }
        return Total;
    };
    CaseReviewReportComponent.prototype.calculateConsumedTotal = function (Item) {
        var Total = 0;
        for (var i = 0; i < this.lstCaseLotSerialDetails.length; i++) {
            if (this.lstCaseLotSerialDetails[i].ITEM == Item) {
                Total += parseFloat(this.lstCaseLotSerialDetails[i].CONSUMED);
            }
        }
        return Total;
    };
    CaseReviewReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    CaseReviewReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    CaseReviewReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    CaseReviewReportComponent.prototype.ngOnDestroy = function () {
        this.lstDepartments = [];
        this.lstCases = [];
        this.lstFilterdDept = [];
        this.lstFilterdCase = [];
        this.selectedCase = null;
        this.selectedDept = null;
        this.physician = '';
        this.procedure = '';
        this.caseDate = '';
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CaseReviewReportComponent.prototype, "appId", void 0);
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], CaseReviewReportComponent.prototype, "dataTableComponent", void 0);
    CaseReviewReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-case-review-report.component.html',
            providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, pou_case_review_report_service_1.CaseReviewReportService],
        }),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            pou_case_review_report_service_1.CaseReviewReportService])
    ], CaseReviewReportComponent);
    return CaseReviewReportComponent;
}());
exports.CaseReviewReportComponent = CaseReviewReportComponent;
//# sourceMappingURL=pou-case-review-report.component.js.map