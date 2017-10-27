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
var pou_low_stock_report_service_1 = require("./pou-low-stock-report.service");
var AtParEnums_2 = require("../Shared/AtParEnums");
var LowStockReportComponent = (function () {
    function LowStockReportComponent(spinnerService, atParCommonService, httpService, atParConstant, lowStockReportService, router, route) {
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.lowStockReportService = lowStockReportService;
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
        this.selectedProcedure = "";
        this.bindLabelData = "";
        this.showGrid = false;
        this.showMainGrid = false;
        this.statusCode = -1;
        this.strCode = "";
        this.strDescr = "";
        this.exCrItemsSymbol = "";
        this.exCrItemsText = "";
        this.exAllItemsBelowParSymbol = "";
        this.exAllItemsBelowParText = "";
        this.exStockOutItemsSymbol = "";
        this.exStockOutItemsText = "";
        this.lbCrItems = "";
        this.lbCrItemsBelowPar = "";
        this.lbAllItemsBelowPar = "";
        this.lbAllItems = '';
        this.lbItems = '';
        this.lbStockOutItems = '';
        this.lstDBData = [];
        this.lstCrItems = [];
        this.lstCrItemsBelowPar = [];
        this.lstAllItemsBelowPar = [];
        this.lstAllItems = [];
        this.lstItems = [];
        this.lstStockOutItems = [];
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    LowStockReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        // this.statusCode = await this.getDefDateRange();
                        this.pazeSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.appId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.AppName] == 'PointOfUse' ? AtParEnums_2.EnumApps.PointOfUse : AtParEnums_2.EnumApps.Pharmacy;
                        //if (this.statusCode == AtparStatusCodes.E_SERVERERROR) {
                        //    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
                        //    return;
                        //}
                        return [4 /*yield*/, this.getDataGrid()];
                    case 1:
                        //if (this.statusCode == AtparStatusCodes.E_SERVERERROR) {
                        //    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
                        //    return;
                        //}
                        _a.sent();
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    LowStockReportComponent.prototype.getDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.lowStockReportService.getLowStockRep(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.appId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        //this.bindLabelData = "Critical Items";
                                        _this.lstCrItems = data.DataDictionary["pReturnDS"]["CRITICAL_ITEMS"];
                                        _this.lbCrItems = data.DataDictionary["pReturnDS"]["CRITICAL_ITEMS"].length;
                                        _this.lstCrItemsBelowPar = data.DataDictionary["pReturnDS"]["ITEMS_BELOW_PAR"];
                                        _this.lbCrItemsBelowPar = data.DataDictionary["pReturnDS"]["ITEMS_BELOW_PAR"].length;
                                        _this.exCrItemsSymbol = _this.lstCrItemsBelowPar.length == 0 ? 'check' : 'exclamation';
                                        _this.exCrItemsText = _this.lstCrItemsBelowPar.length == 0 ? 'info' : 'danger';
                                        _this.lstAllItemsBelowPar = data.DataDictionary["pReturnDS"]["ALL_ITEMS_BELOW_PAR"];
                                        _this.lbAllItemsBelowPar = data.DataDictionary["pReturnDS"]["ALL_ITEMS_BELOW_PAR"].length;
                                        _this.exAllItemsBelowParSymbol = _this.lstAllItemsBelowPar.length == 0 ? 'check' : 'exclamation';
                                        _this.exAllItemsBelowParText = _this.lstAllItemsBelowPar.length == 0 ? 'info' : 'danger';
                                        _this.lstAllItems = data.DataDictionary["pReturnDS"]["ALL_ITEMS"];
                                        _this.lbAllItems = data.DataDictionary["pReturnDS"]["ALL_ITEMS"].length;
                                        _this.lstStockOutItems = data.DataDictionary["pReturnDS"]["ALL_STOCKOUT_ITEMS"];
                                        _this.lbStockOutItems = data.DataDictionary["pReturnDS"]["ALL_STOCKOUT_ITEMS"].length;
                                        _this.exStockOutItemsSymbol = _this.lstStockOutItems.length == 0 ? 'check' : 'exclamation';
                                        _this.exStockOutItemsText = _this.lstStockOutItems.length == 0 ? 'info' : 'danger';
                                        _this.lstItems = data.DataDictionary["pReturnDS"]["ALL_ITEMS"];
                                        _this.lbItems = data.DataDictionary["pReturnDS"]["ALL_ITEMS"].length;
                                        //this.showGrid = true;
                                        //this.lstDBData = null;
                                        //this.lstDBData = this.lstCrItems;
                                        _this.showMainGrid = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.StatusCode == 1102002) {
                                            _this.lbCrItems = '0';
                                            _this.lbCrItemsBelowPar = '0';
                                            _this.lbAllItemsBelowPar = '0';
                                            _this.lbAllItems = '0';
                                            _this.lbStockOutItems = '0';
                                            _this.lbItems = '0';
                                            _this.exCrItemsSymbol = 'check';
                                            _this.exCrItemsText = 'info';
                                            _this.exAllItemsBelowParSymbol = 'check';
                                            _this.exAllItemsBelowParText = 'info';
                                            _this.exStockOutItemsSymbol = 'check';
                                            _this.exStockOutItemsText = 'info';
                                            _this.growlMessage = [];
                                            _this.showMainGrid = true;
                                            //this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                        }
                                        else {
                                            _this.lbCrItems = '0';
                                            _this.lbCrItemsBelowPar = '0';
                                            _this.lbAllItemsBelowPar = '0';
                                            _this.lbAllItems = '0';
                                            _this.lbStockOutItems = '0';
                                            _this.lbItems = '0';
                                            _this.growlMessage = [];
                                            _this.showMainGrid = true;
                                            _this.exCrItemsSymbol = 'check';
                                            _this.exCrItemsText = 'info';
                                            _this.exAllItemsBelowParSymbol = 'check';
                                            _this.exAllItemsBelowParText = 'info';
                                            _this.exStockOutItemsSymbol = 'check';
                                            _this.exStockOutItemsText = 'info';
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.lbCrItems = '0';
                                        _this.lbCrItemsBelowPar = '0';
                                        _this.lbAllItemsBelowPar = '0';
                                        _this.lbAllItems = '0';
                                        _this.lbStockOutItems = '0';
                                        _this.lbItems = '0';
                                        _this.growlMessage = [];
                                        _this.exCrItemsSymbol = 'check';
                                        _this.exCrItemsText = 'info';
                                        _this.exAllItemsBelowParSymbol = 'check';
                                        _this.exAllItemsBelowParText = 'info';
                                        _this.exStockOutItemsSymbol = 'check';
                                        _this.exStockOutItemsText = 'info';
                                        _this.showMainGrid = true;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.lbCrItems = '0';
                                        _this.lbCrItemsBelowPar = '0';
                                        _this.lbAllItemsBelowPar = '0';
                                        _this.lbAllItems = '0';
                                        _this.lbStockOutItems = '0';
                                        _this.lbItems = '0';
                                        _this.growlMessage = [];
                                        _this.exCrItemsSymbol = 'check';
                                        _this.exCrItemsText = 'info';
                                        _this.exAllItemsBelowParSymbol = 'check';
                                        _this.exAllItemsBelowParText = 'info';
                                        _this.exStockOutItemsSymbol = 'check';
                                        _this.exStockOutItemsText = 'info';
                                        _this.showMainGrid = true;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "getDataGrid");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //gets the critical items
    LowStockReportComponent.prototype.onlbCrItemsclick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //this.lstCrItems = [];
                //this.lbCrItems = '';
                //;
                try {
                    this.spinnerService.start();
                    if (this.lstCrItems.length > 0) {
                        this.spinnerService.stop();
                        this.lbCrItems = this.lstCrItems.length.toString();
                        this.bindLabelData = "Critical Items";
                        this.lstDBData = null;
                        this.showGrid = true;
                        this.lstCrItems.forEach(function (x) {
                            x.ITEM_QUANTITY_ON_HAND = parseFloat(x.ITEM_QUANTITY_ON_HAND).toFixed(2);
                            x.PAR_QUANTITY = parseFloat(x.PAR_QUANTITY).toFixed(2);
                        });
                        this.lstDBData = this.lstCrItems;
                    }
                    else {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.showGrid = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data found" });
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "onlbCrItemsclick");
                }
                return [2 /*return*/];
            });
        });
    };
    //gets the critical items below par quantity
    LowStockReportComponent.prototype.onlbCrItemsBelowParclick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //this.lstCrItems = [];
                //this.lbCrItems = '';
                //;
                try {
                    this.spinnerService.start();
                    if (this.lstCrItemsBelowPar.length > 0) {
                        this.spinnerService.stop();
                        this.lbCrItemsBelowPar = this.lstCrItemsBelowPar.length.toString();
                        this.bindLabelData = "Critical Items Below Par Quantity";
                        this.lstDBData = null;
                        this.showGrid = true;
                        this.lstCrItemsBelowPar.forEach(function (x) {
                            x.ITEM_QUANTITY_ON_HAND = parseFloat(x.ITEM_QUANTITY_ON_HAND).toFixed(2);
                            x.PAR_QUANTITY = parseFloat(x.PAR_QUANTITY).toFixed(2);
                        });
                        this.lstDBData = this.lstCrItemsBelowPar;
                    }
                    else {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.showGrid = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data found" });
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "onlbCrItemsBelowParclick");
                }
                return [2 /*return*/];
            });
        });
    };
    LowStockReportComponent.prototype.onlbAllItemsBelowParclick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //this.lstAllItemsBelowPar = [];
                //this.lbAllItemsBelowPar = '';
                //;
                try {
                    this.spinnerService.start();
                    if (this.lstAllItemsBelowPar.length > 0) {
                        this.spinnerService.stop();
                        this.lbAllItemsBelowPar = this.lstAllItemsBelowPar.length.toString();
                        this.bindLabelData = "All Items Below Par Quantity";
                        this.lstDBData = null;
                        this.showGrid = true;
                        this.lstAllItemsBelowPar.forEach(function (x) {
                            x.ITEM_QUANTITY_ON_HAND = parseFloat(x.ITEM_QUANTITY_ON_HAND).toFixed(2);
                            x.PAR_QUANTITY = parseFloat(x.PAR_QUANTITY).toFixed(2);
                        });
                        this.lstDBData = this.lstAllItemsBelowPar;
                    }
                    else {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.showGrid = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data found" });
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "onlbAllItemsBelowParclick");
                }
                return [2 /*return*/];
            });
        });
    };
    LowStockReportComponent.prototype.onlbAllItemsclick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //this.lstAllItems = [];
                //this.lbAllItems = '';
                //;
                try {
                    this.spinnerService.start();
                    if (this.lstAllItems.length > 0) {
                        this.spinnerService.stop();
                        this.lbAllItems = this.lstAllItems.length.toString();
                        this.bindLabelData = "All Items";
                        this.lstDBData = null;
                        this.showGrid = true;
                        this.lstAllItems.forEach(function (x) {
                            x.ITEM_QUANTITY_ON_HAND = parseFloat(x.ITEM_QUANTITY_ON_HAND).toFixed(2);
                            x.PAR_QUANTITY = parseFloat(x.PAR_QUANTITY).toFixed(2);
                        });
                        this.lstDBData = this.lstAllItems;
                    }
                    else {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.showGrid = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data found" });
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "onlbAllItemsclick");
                }
                return [2 /*return*/];
            });
        });
    };
    LowStockReportComponent.prototype.onlbStockOutItemsclick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //this.lstStockOutItems = [];
                //this.lbStockOutItems = '';
                //;
                try {
                    this.spinnerService.start();
                    if (this.lstStockOutItems.length > 0) {
                        this.spinnerService.stop();
                        this.lbStockOutItems = this.lstStockOutItems.length.toString();
                        this.bindLabelData = "Stock Out Items";
                        this.lstDBData = null;
                        this.showGrid = true;
                        this.lstStockOutItems.forEach(function (x) {
                            x.ITEM_QUANTITY_ON_HAND = parseFloat(x.ITEM_QUANTITY_ON_HAND).toFixed(2);
                            x.PAR_QUANTITY = parseFloat(x.PAR_QUANTITY).toFixed(2);
                        });
                        this.lstDBData = this.lstStockOutItems;
                    }
                    else {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.showGrid = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data found" });
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "onlbStockOutItemsclick");
                }
                return [2 /*return*/];
            });
        });
    };
    LowStockReportComponent.prototype.onlbItemsclick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //this.lstItems = [];
                //this.lbItems = '';
                //;
                try {
                    this.spinnerService.start();
                    if (this.lstItems.length > 0) {
                        this.spinnerService.stop();
                        this.lbItems = this.lstItems.length.toString();
                        this.bindLabelData = "All Items";
                        this.lstDBData = null;
                        this.showGrid = true;
                        this.lstDBData = this.lstItems;
                    }
                    else {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.showGrid = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data found" });
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "onlbItemsclick");
                }
                return [2 /*return*/];
            });
        });
    };
    LowStockReportComponent.prototype.getDefDateRange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
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
                        ex_2 = _a.sent();
                        return [4 /*yield*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LowStockReportComponent.prototype.onItemIDClick = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var navigationExtras;
            return __generator(this, function (_a) {
                try {
                    navigationExtras = {
                        //relativeTo: this.route
                        queryParams: {
                            "appId": AtParEnums_2.EnumApps.PointOfUse,
                            "mode": 'Go',
                            "bunit": item.BUSINESS_UNIT,
                            "ItemId": item.ITEM_ID,
                            "cartID": item.CART_ID,
                            "Screen": 'Low Stock'
                        }
                    };
                    this.breadCrumbMenu.MENU_NAME = "Create Orders";
                    this.breadCrumbMenu.ROUTE = 'pointofuse/createorders';
                    this.breadCrumbMenu.SUB_MENU_NAME = '';
                    this.breadCrumbMenu.APP_NAME = 'Point Of Use';
                    this.breadCrumbMenu.IS_DIV = false;
                    localStorage.setItem('localBreadCrumb', JSON.stringify(this.breadCrumbMenu));
                    this.router.navigate(['atpar/pointofuse/createorders'], navigationExtras);
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "onItemIDClick");
                }
                return [2 /*return*/];
            });
        });
    };
    LowStockReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    LowStockReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-low-stock-report.component.html',
            providers: [HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, pou_low_stock_report_service_1.LowStockReportService
            ]
        }),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            pou_low_stock_report_service_1.LowStockReportService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], LowStockReportComponent);
    return LowStockReportComponent;
}());
exports.LowStockReportComponent = LowStockReportComponent;
//# sourceMappingURL=pou-low-stock-report.component.js.map