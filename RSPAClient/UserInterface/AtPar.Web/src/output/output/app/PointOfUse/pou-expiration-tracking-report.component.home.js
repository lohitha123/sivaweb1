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
var router_1 = require("@angular/router");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var pou_expiration_tracking_report_service_1 = require("./pou-expiration-tracking-report.service");
var linq_es5_1 = require("linq-es5");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var ExpirationTrackingReportHomeComponent = (function () {
    function ExpirationTrackingReportHomeComponent(spinnerService, atParCommonService, httpService, atParConstant, expirationTrackingReportService, route, router, atParSharedDataService, leftBarAnimateService) {
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.expirationTrackingReportService = expirationTrackingReportService;
        this.route = route;
        this.router = router;
        this.atParSharedDataService = atParSharedDataService;
        this.leftBarAnimateService = leftBarAnimateService;
        this.growlMessage = [];
        this.toDate = new Date();
        this.fromExpDate = new Date();
        this.lstDept = [];
        this.lstParLoc = [];
        this.lstExpParLoc = [];
        this.lstDuration = [];
        this.ExpiredGroupItem = [];
        this.ExpiringGroupItem = [];
        this.lstExpiredItems = [];
        this.lstExpiringItems = [];
        this.chartExpiredDataset = [];
        this.chartExpiringDataset = [];
        this.labels = [];
        this.labelData = [];
        this.defDuration = 0;
        this.durationTrackExp = 0;
        this.expiredCnt = 0;
        this.expiringCnt = 0;
        this.showGrid = false;
        this.showExpGrid = false;
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    ExpirationTrackingReportHomeComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.spinnerService.start();
                        this.lstDuration.push({ label: 'Select Duration', value: "0" }, { label: '30', value: "30" }, { label: '45', value: "45" }, { label: '60', value: "60" }, { label: '90', value: "90" }, { label: '180', value: "180" }, { label: '365', value: "365" });
                        this.Duration = '0';
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.bindDropDowns()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getExpItemCnt()];
                    case 3:
                        _a.sent();
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExpirationTrackingReportHomeComponent.prototype.enableSelectedTab = function (option) {
        if (option != null) {
            this.activeTab = option.title;
        }
        this.growlMessage = [];
        this.showGrid = false;
        this.showExpGrid = false;
        this.Department = '';
        this.ParLoc = '';
        this.ExpDepartment = '';
        this.ExpParLoc = '';
        this.Duration = '';
    };
    ExpirationTrackingReportHomeComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry).then(function (result) {
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
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, 'getMyPreferences');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExpirationTrackingReportHomeComponent.prototype.bindDropDowns = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
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
                                _this.lstExpParLoc.push({ label: 'Select Loc', value: '' });
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i < res.DataList.length; i++) {
                                            _this.lstDept.push({ label: res.DataList[i].DEPT_ID + " - " + res.DataList[i].DEPT_NAME, value: res.DataList[i].DEPT_ID });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        if (res.StatusCode != AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
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
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, 'bindDropDowns');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExpirationTrackingReportHomeComponent.prototype.getExpItemCnt = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.expirationTrackingReportService.getExpItemCnt(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_2.EnumApps.PointOfUse).then(function (result) {
                                _this.spinnerService.stop();
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.durationTrackExp = res.DataDictionary['duration'];
                                        _this.expiredCnt = res.DataDictionary['pIntExpiredCnt'];
                                        _this.expiringCnt = res.DataDictionary['pIntExpiringCnt'];
                                        _this.toExpDate = new Date();
                                        var d = _this.toExpDate.getDate() + _this.durationTrackExp;
                                        _this.toExpDate.setDate(d);
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
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, 'getExpItemCnt');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExpirationTrackingReportHomeComponent.prototype.ddlDept_SelectedIndexChanged = function (dept) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(dept != '')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getDeptCartAllocations('', dept, AtParEnums_2.EnumApps.PointOfUse, AtParEnums_2.LocationType.P.toString(), 'Expired')];
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
    ExpirationTrackingReportHomeComponent.prototype.ddlExpDept_SelectedIndexChanged = function (dept) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(dept != '')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getDeptCartAllocations('', dept, AtParEnums_2.EnumApps.PointOfUse, AtParEnums_2.LocationType.P.toString(), 'Expiring')];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.lstExpParLoc = [];
                        this.lstExpParLoc.push({ label: 'Select Loc', value: '' });
                        this.ExpParLoc = '';
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExpirationTrackingReportHomeComponent.prototype.getDeptCartAllocations = function (bUnit, deptID, appID, locType, deptType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.expirationTrackingReportService.getDeptCartAllocations(bUnit, deptID, appID, locType).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstParLoc = [];
                                _this.lstExpParLoc = [];
                                _this.lstParLoc.push({ label: 'Select Loc', value: '' });
                                _this.lstExpParLoc.push({ label: 'Select Loc', value: '' });
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        if (deptType == 'Expired') {
                                            for (var i = 0; i < res.DataList.length; i++) {
                                                _this.lstParLoc.push({ label: res.DataList[i].CART_ID, value: res.DataList[i].CART_ID });
                                            }
                                        }
                                        else {
                                            for (var i = 0; i < res.DataList.length; i++) {
                                                _this.lstExpParLoc.push({ label: res.DataList[i].CART_ID, value: res.DataList[i].CART_ID });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        if (res.StatusCode != AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        }
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
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, 'getDeptCartAllocations');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExpirationTrackingReportHomeComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var todayDate, fromDate, toDate, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.growlMessage = [];
                        this.showGrid = false;
                        this.showExpGrid = false;
                        todayDate = new Date();
                        if (!(this.toDate > todayDate)) return [3 /*break*/, 1];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To date must be less than or equal to today's date" });
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(this.fromDate > this.toDate)) return [3 /*break*/, 2];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date must be less than or equal to To Date" });
                        return [3 /*break*/, 4];
                    case 2:
                        fromDate = this.fromDate.toLocaleDateString();
                        toDate = this.toDate.toLocaleDateString();
                        return [4 /*yield*/, this.getExpirationTrackingReport(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], 0, fromDate, toDate, this.Department, AtParEnums_2.EnumApps.PointOfUse, this.ParLoc, 'Expired')];
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
    ExpirationTrackingReportHomeComponent.prototype.btnExpGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var todayDate, fromDate, toDate, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.growlMessage = [];
                        this.showExpGrid = false;
                        this.showGrid = false;
                        todayDate = new Date();
                        if (!(this.fromExpDate.getDate() < todayDate.getDate())) return [3 /*break*/, 1];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date should be greater than or equal to Today's Date" });
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(this.fromExpDate > this.toExpDate)) return [3 /*break*/, 2];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
                        return [3 /*break*/, 4];
                    case 2:
                        fromDate = this.fromExpDate.toLocaleDateString();
                        toDate = this.toExpDate.toLocaleDateString();
                        return [4 /*yield*/, this.getExpirationTrackingReport(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], 0, fromDate, toDate, this.ExpDepartment, AtParEnums_2.EnumApps.PointOfUse, this.ExpParLoc, 'Expiring')];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, 'btnExpGo_Click');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ExpirationTrackingReportHomeComponent.prototype.getExpirationTrackingReport = function (orgGrpID, duration, fromDate, toDate, deptID, appID, cartID, type) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        if (deptID == undefined) {
                            deptID = '';
                        }
                        if (cartID == undefined) {
                            cartID = '';
                        }
                        return [4 /*yield*/, this.expirationTrackingReportService.getExpirationTrackingReport(orgGrpID, duration, fromDate, toDate, deptID, appID, cartID).then(function (result) {
                                _this.spinnerService.stop();
                                var res = result.json();
                                _this.growlMessage = [];
                                var _dtdetails = [];
                                var SelRows = [];
                                _this.labelData = [];
                                _this.labels = [];
                                _this.chartExpiredDataset = [];
                                _this.chartExpiringDataset = [];
                                _this.ExpiredGroupItem = [];
                                _this.ExpiringGroupItem = [];
                                var _dblTtlCost;
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        if (type == 'Expired') {
                                            if (res.DataDictionary['pReturnDS'].EXPIRED_ITEMS.length == 0) {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                                                return;
                                            }
                                            _this.lstExpiredItems = res.DataDictionary['pReturnDS'].EXPIRED_ITEMS;
                                            _dtdetails = linq_es5_1.asEnumerable(_this.lstExpiredItems).Distinct(function (a) { return a.CART_ID; }).Select(function (a) { return a; }).ToArray();
                                            var _loop_1 = function (index) {
                                                _dblTtlCost = 0;
                                                var strCartId1 = _dtdetails[index].CART_ID;
                                                SelRows = _this.lstExpiredItems.filter(function (x) { return x.CART_ID == strCartId1; });
                                                for (var j in SelRows) {
                                                    _dblTtlCost = parseFloat(_dblTtlCost) + parseFloat(SelRows[j].TOTAL_COST);
                                                }
                                                _dblTtlCost = _dblTtlCost.toFixed(2);
                                                _this.labels.push(strCartId1);
                                                _this.labelData.push(_dblTtlCost);
                                                _this.ExpiredGroupItem.push({ PAR_LOCATION: strCartId1, ExpiredItems: SelRows, TotalAmount: _dblTtlCost, BUNIT: _dtdetails[index].BUSINESS_UNIT });
                                            };
                                            for (var index in _dtdetails) {
                                                _loop_1(index);
                                            }
                                            _this.chartExpiredDataset.push({ label: 'Expired Items', backgroundColor: '#338aeb', borderColor: '#7CB342', data: _this.labelData, fill: false });
                                            for (var i in _this.lstExpiredItems) {
                                                _this.lstExpiredItems[i].UNIT_COST = parseFloat(_this.lstExpiredItems[i].UNIT_COST).toFixed(2);
                                                _this.lstExpiredItems[i].QUANTITY_ON_HAND = parseFloat(_this.lstExpiredItems[i].QUANTITY_ON_HAND).toFixed(2);
                                                _this.lstExpiredItems[i].TOTAL_COST = parseFloat(_this.lstExpiredItems[i].TOTAL_COST).toFixed(2);
                                            }
                                            _this.showGrid = true;
                                            _this.getChart('Expired');
                                        }
                                        else {
                                            if (res.DataDictionary['pReturnDS'].EXPIRING_ITEMS.length == 0) {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                                                return;
                                            }
                                            _this.lstExpiringItems = res.DataDictionary['pReturnDS'].EXPIRING_ITEMS;
                                            _dtdetails = linq_es5_1.asEnumerable(_this.lstExpiringItems).Distinct(function (a) { return a.CART_ID; }).Select(function (a) { return a; }).ToArray();
                                            var _loop_2 = function (index) {
                                                _dblTtlCost = 0;
                                                var strCartId1 = _dtdetails[index].CART_ID;
                                                SelRows = _this.lstExpiringItems.filter(function (x) { return x.CART_ID == strCartId1; });
                                                for (var j in SelRows) {
                                                    _dblTtlCost = parseFloat(_dblTtlCost) + parseFloat(SelRows[j].TOTAL_COST);
                                                }
                                                _dblTtlCost = _dblTtlCost.toFixed(2);
                                                _this.labels.push(strCartId1);
                                                _this.labelData.push(_dblTtlCost);
                                                _this.ExpiringGroupItem.push({ PAR_LOCATION: strCartId1, ExpiredItems: SelRows, TotalAmount: _dblTtlCost, BUNIT: _dtdetails[index].BUSINESS_UNIT });
                                            };
                                            for (var index in _dtdetails) {
                                                _loop_2(index);
                                            }
                                            _this.chartExpiringDataset.push({ label: 'Expiring Items', backgroundColor: '#338aeb', borderColor: '#7CB342', data: _this.labelData, fill: false });
                                            for (var i in _this.lstExpiringItems) {
                                                _this.lstExpiringItems[i].UNIT_COST = parseFloat(_this.lstExpiringItems[i].UNIT_COST).toFixed(2);
                                                _this.lstExpiringItems[i].QUANTITY_ON_HAND = parseFloat(_this.lstExpiringItems[i].QUANTITY_ON_HAND).toFixed(2);
                                                _this.lstExpiringItems[i].TOTAL_COST = parseFloat(_this.lstExpiringItems[i].TOTAL_COST).toFixed(2);
                                            }
                                            _this.showExpGrid = true;
                                            _this.getChart('Expiring');
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
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, 'getExpirationTrackingReport');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExpirationTrackingReportHomeComponent.prototype.getChart = function (Type) {
        this.chartData = [];
        this.options = [];
        if (Type == 'Expired') {
            this.chartData = {
                labels: this.labels,
                datasets: this.chartExpiredDataset
            };
            this.options = {
                scales: {
                    xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Par Location'
                            }
                        }],
                    yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Total Value in $'
                            }
                        }]
                },
                showTooltips: true,
                showAllTooltips: true
            };
        }
        else {
            this.chartData = {
                labels: this.labels,
                datasets: this.chartExpiringDataset
            };
            this.options = {
                scales: {
                    xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Par Location'
                            }
                        }],
                    yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Total Value in $'
                            }
                        }]
                }
            };
        }
        setTimeout(function () {
            var chartImage = document.getElementById("myChart");
            //chartImage.getSeries().getPointByArg("Second").showTooltip();
        }, 500);
    };
    ExpirationTrackingReportHomeComponent.prototype.btnUsage_Click = function (userRow) {
        return __awaiter(this, void 0, void 0, function () {
            var navigationExtras, menuItems, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        navigationExtras = {
                            relativeTo: this.route,
                            queryParams: { "mode": AtParEnums_1.ModeEnum.Add },
                        };
                        this.breadCrumbMenu.MENU_NAME = "Item Usage Report";
                        this.breadCrumbMenu.ROUTE = 'pointofuse/itemusagereport';
                        this.breadCrumbMenu.SUB_MENU_NAME = '';
                        this.breadCrumbMenu.APP_NAME = 'Point Of User';
                        this.breadCrumbMenu.IS_DIV = false;
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        localStorage.setItem('localBreadCrumb', JSON.stringify(this.breadCrumbMenu));
                        menuItems = JSON.parse(localStorage.getItem('MenuList'));
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < menuItems.length)) return [3 /*break*/, 4];
                        if (!(menuItems[i].ROUTE == 'pointofuse/itemusagereport')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.leftBarAnimateService.emitChangeReportaActiveMenu(menuItems[i].MENU_NAME.trim())];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.atParSharedDataService.setStorage({ "editItemInfo": userRow, "mode": AtParEnums_1.ModeEnum.Edit })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.router.navigate(['pointofuse/itemusagereport'], navigationExtras)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExpirationTrackingReportHomeComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ExpirationTrackingReportHomeComponent.prototype.ngOnDestroy = function () {
        this.lstExpiredItems = null;
        this.lstExpiringItems = null;
        this.lstDept = null;
        this.lstDuration = null;
        this.lstExpParLoc = null;
        this.lstParLoc = null;
        this.Department = '';
        this.expiredCnt = 0;
        this.expiringCnt = 0;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ExpirationTrackingReportHomeComponent.prototype, "appId", void 0);
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], ExpirationTrackingReportHomeComponent.prototype, "dataTableComponent", void 0);
    ExpirationTrackingReportHomeComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-expiration-tracking-report.component.home.html',
            providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, pou_expiration_tracking_report_service_1.ExpirationTrackingReportService],
        }),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            pou_expiration_tracking_report_service_1.ExpirationTrackingReportService,
            router_1.ActivatedRoute,
            router_1.Router,
            AtParSharedDataService_1.AtParSharedDataService,
            leftbar_animation_service_1.LeftBarAnimationService])
    ], ExpirationTrackingReportHomeComponent);
    return ExpirationTrackingReportHomeComponent;
}());
exports.ExpirationTrackingReportHomeComponent = ExpirationTrackingReportHomeComponent;
//# sourceMappingURL=pou-expiration-tracking-report.component.home.js.map