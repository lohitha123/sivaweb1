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
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var pou_item_usage_report_service_1 = require("./pou-item-usage-report.service");
var vm_getitemusage_1 = require("../entities/vm_getitemusage");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var router_1 = require("@angular/router");
var linq_es5_1 = require("linq-es5");
var ItemUsageReportComponent = (function () {
    function ItemUsageReportComponent(spinnerService, atParCommonService, httpService, atParConstant, itemUsageReportService, atParSharedDataService, activatedRoute) {
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.itemUsageReportService = itemUsageReportService;
        this.atParSharedDataService = atParSharedDataService;
        this.activatedRoute = activatedRoute;
        this.growlMessage = [];
        this.toDate = new Date();
        this.lstBUnits = [];
        this.lstItemUsage = new vm_getitemusage_1.VM_GETITEMUSAGE();
        this.products = [{ name: 'product1', price: 100 }, { name: 'product2', price: 200 }, { name: 'product3', price: 300 }];
        this.defDuration = 0;
        this.showGrid = false;
        this.chartDataset = [];
        this.screenName = "";
        this.breadCrumbMenu = new routepath_1.Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    ItemUsageReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var queryMode, d;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.spinnerService.start();
                        this.activatedRoute.queryParams.subscribe(function (params) {
                            _this.screenName = params['Screen'];
                        });
                        if (!(this.screenName != "" && this.screenName == 'Transaction History')) return [3 /*break*/, 2];
                        this.defDuration = 5;
                        this.fromDate = new Date();
                        d = this.fromDate.getDate() - this.defDuration;
                        this.fromDate.setDate(d);
                        return [4 /*yield*/, this.bindDropdown()];
                    case 1:
                        _a.sent();
                        this.activatedRoute.queryParams.subscribe(function (params) {
                            queryMode = params['mode'];
                            _this.intAppId = params['appId'];
                            if (queryMode == "Go") {
                                _this.businessUnit = params['bunit'];
                                _this.itemID = params['itemId'];
                                _this.parLocation = params['cartId'];
                                _this.btnGo_Click();
                            }
                        });
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, this.getMyPreferences()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.bindDropdown()];
                    case 4:
                        _a.sent();
                        this.editItemInfo = '';
                        if (this.atParSharedDataService.storage != undefined && this.atParSharedDataService.storage != null) {
                            this.editItemInfo = this.atParSharedDataService.storage.editItemInfo;
                        }
                        if (!(this.editItemInfo != '')) return [3 /*break*/, 6];
                        this.businessUnit = this.editItemInfo.BUSINESS_UNIT;
                        this.itemID = this.editItemInfo.ITEM_ID;
                        this.parLocation = this.editItemInfo.CART_ID;
                        return [4 /*yield*/, this.btnGo_Click()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.getMyPreferences = function () {
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
    ItemUsageReportComponent.prototype.bindDropdown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getBusinessUnits(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_1.BusinessType.Inventory.toString()).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstBUnits.push({ label: 'Select BUnit', value: '' });
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i < res.DataList.length; i++) {
                                            _this.lstBUnits.push({ label: res.DataList[i], value: res.DataList[i] });
                                        }
                                        _this.businessUnit = '';
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
                        this.clientErrorMsg(ex_2, 'bindDropdown');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var todayDate, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        this.growlMessage = [];
                        this.showGrid = false;
                        todayDate = new Date();
                        if (!(this.businessUnit == '')) return [3 /*break*/, 1];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Bussiness Unit" });
                        return [3 /*break*/, 6];
                    case 1:
                        if (!(this.itemID == '' || this.itemID == undefined)) return [3 /*break*/, 2];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter Item ID " });
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(this.toDate > todayDate)) return [3 /*break*/, 3];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(this.fromDate > this.toDate)) return [3 /*break*/, 4];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than ToDate" });
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.getData(this.businessUnit, this.parLocation, this.itemID, this.fromDate, this.toDate)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, 'btnGo_Click');
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.getData = function (bUnit, parLoc, itemID, fromDate, toDate) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.showGrid = false;
                        return [4 /*yield*/, this.atParCommonService.getUserDepartments(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.deviceTokenEntry).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.getItemUsageReport(bUnit, parLoc, itemID, fromDate, toDate);
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
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, 'getData');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.getItemUsageReport = function (bUnit, parLoc, itemID, fromDate, toDate) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var fDate, tDate, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        toDate.setDate(toDate.getDate() + 1);
                        fDate = fromDate.toLocaleDateString();
                        tDate = toDate.toLocaleDateString();
                        if (parLoc == undefined) {
                            parLoc = '';
                        }
                        if (itemID == undefined) {
                            itemID = '';
                        }
                        return [4 /*yield*/, this.itemUsageReportService.getItemUsageReport(bUnit, parLoc, itemID, fDate, tDate, AtParEnums_2.EnumApps.PointOfUse).then(function (result) {
                                _this.spinnerService.stop();
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.toDate.setDate(_this.toDate.getDate() - 1);
                                _this.chartDataset = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        var data = [];
                                        var data1 = [];
                                        var labelsData = [];
                                        _this.lstItemUsage = new vm_getitemusage_1.VM_GETITEMUSAGE();
                                        data = res.DataDictionary["pItemUsageDS"]["Table1"];
                                        if (data.length == 0) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No records were returned for the search criteria' });
                                            break;
                                        }
                                        _this.showGrid = true;
                                        data1 = res.DataDictionary["pItemUsageDS"]["Table2"];
                                        //this.lstItemUsage.MIN_USAGE_QTY = parseFloat(data[0].ITEM_COUNT).toFixed(2);
                                        //this.lstItemUsage.MIN_DATE = data[0].UPDATE_DATE;
                                        //this.lstItemUsage.MAX_USAGE_QTY = parseFloat(data[data.length - 1].ITEM_COUNT).toFixed(2);
                                        //this.lstItemUsage.MAX_DATE = data[data.length - 1].UPDATE_DATE;
                                        var qty = 0;
                                        var tempParData = [];
                                        var tempUsedData = [];
                                        for (var i in data) {
                                            qty += parseFloat(data[i].ITEM_COUNT);
                                            tempUsedData.push(data[i].ITEM_COUNT);
                                            tempParData.push(data1[0].ITEM_QUANTITY_PAR);
                                            labelsData.push(data[i].UPDATE_DATE.split('/')[0] + '/' + data[i].UPDATE_DATE.split('/')[1]);
                                        }
                                        var maxValues = linq_es5_1.asEnumerable(data).OrderByDescending(function (x) { return x.ITEM_COUNT; }).First();
                                        var minValues = linq_es5_1.asEnumerable(data).OrderBy(function (x) { return x.ITEM_COUNT; }).First();
                                        _this.lstItemUsage.MIN_USAGE_QTY = parseFloat(minValues.ITEM_COUNT).toFixed(2);
                                        _this.lstItemUsage.MIN_DATE = minValues.UPDATE_DATE;
                                        _this.lstItemUsage.MAX_USAGE_QTY = parseFloat(maxValues.ITEM_COUNT).toFixed(2);
                                        _this.lstItemUsage.MAX_DATE = maxValues.UPDATE_DATE;
                                        _this.lstItemUsage.AVG_ITEM_QTY = (qty / data.length).toFixed(2);
                                        _this.lstItemUsage.ITEM_ID = data[0].ITEM_ID;
                                        _this.lstItemUsage.B_UNIT = _this.businessUnit;
                                        _this.chartDataset.push({ label: 'Par Qty', backgroundColor: '#00ff48', borderColor: '#00ff48', data: tempParData, fill: true });
                                        _this.chartDataset.push({ label: 'Used Qty', backgroundColor: '#0000f8', borderColor: '#0000f8', data: tempUsedData, fill: true });
                                        _this.chartData = {
                                            labels: labelsData,
                                            datasets: _this.chartDataset
                                        };
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
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, 'btnGo_Click');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ItemUsageReportComponent.prototype.ngOnDestroy = function () {
        this.businessUnit = null;
        this.parLocation = null;
        this.lstBUnits = [];
        this.defDuration = 0;
        this.itemID = null;
        if (this.atParSharedDataService.storage != undefined) {
            this.atParSharedDataService.storage.editItemInfo = null;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ItemUsageReportComponent.prototype, "appId", void 0);
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], ItemUsageReportComponent.prototype, "dataTableComponent", void 0);
    ItemUsageReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-item-usage-report.component.html',
            providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, pou_item_usage_report_service_1.ItemUsageReportService],
        }),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            pou_item_usage_report_service_1.ItemUsageReportService,
            AtParSharedDataService_1.AtParSharedDataService,
            router_1.ActivatedRoute])
    ], ItemUsageReportComponent);
    return ItemUsageReportComponent;
}());
exports.ItemUsageReportComponent = ItemUsageReportComponent;
//# sourceMappingURL=pou-item-usage-report.component.js.map