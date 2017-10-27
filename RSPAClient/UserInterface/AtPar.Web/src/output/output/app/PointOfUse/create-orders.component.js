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
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var pou_create_orders_service_1 = require("./pou-create-orders.service");
var datatableservice_1 = require("./../components/datatable/datatableservice");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var VM_CART_HEADER_1 = require("../Entities/VM_CART_HEADER");
var VM_CART_DETAILS_1 = require("../Entities/VM_CART_DETAILS");
var router_1 = require("@angular/router");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var CreateOrdersComponent = (function () {
    function CreateOrdersComponent(dataservice, httpService, spinnerService, commonService, createOrdersService, route, atParConstant) {
        this.dataservice = dataservice;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.createOrdersService = createOrdersService;
        this.route = route;
        this.atParConstant = atParConstant;
        this.REQUEST_QTY = "02";
        this.screenName = '';
        this.showGrid = false;
        this.recordsPerPage = 0;
        this.statusCode = -1;
        this.hdPgIndex = 0;
        this.m_intDefNoOfRec = 0;
        this.intAppID = 0;
        this.trTransId = 0;
        this.blnsortbycolumn = true;
        this.deviceTokenEntry = [];
        this.pdeviceTokenEntry = [];
        this.lstFilterItemIDs = [];
        this.lstLocation = [];
        this.msgs = [];
        this.lstBUnits = [];
        this.bunitData = [];
        this.preField = "";
        this.dsDepartmentItems = [];
        this.pDsCartHeaders = [];
        this.pDsCartDetails = [];
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.recordsPerPage = parseInt(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage]);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }
    CreateOrdersComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var queryMode, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        // this.spinnerService.start();
                        return [4 /*yield*/, this.getProfileParamValue()];
                    case 1:
                        // this.spinnerService.start();
                        _a.sent();
                        return [4 /*yield*/, this.getBusinessUnits()];
                    case 2:
                        _a.sent();
                        this.route.queryParams.subscribe(function (params) {
                            queryMode = params['mode'];
                            _this.intAppID = params['appId'];
                            if (queryMode == "Go") {
                                _this.selectedBUnit = params['bunit'];
                                _this.itemID = params['ItemId'];
                                _this.selectedLocation = params['cartID'];
                                _this.screenName = params['Screen'];
                                _this.GetData();
                            }
                        });
                        return [3 /*break*/, 5];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 5];
                    case 4: return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.getProfileParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.msgs = [];
                    this.spinnerService.start();
                    this.commonService.getProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], this.appID, 'MAX_ALLOW_QTY')
                        .catch(this.httpService.handleError)
                        .then(function (res) {
                        var data = res.json();
                        switch (data.StatType) {
                            case AtParEnums_1.StatusType.Success:
                                {
                                    _this.strMaxAllowQty = data.DataVariable;
                                    break;
                                }
                            case AtParEnums_1.StatusType.Warn:
                                {
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    break;
                                }
                            case AtParEnums_1.StatusType.Custom:
                                {
                                    _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    break;
                                }
                            case AtParEnums_1.StatusType.Error:
                                {
                                    _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    break;
                                }
                        }
                    });
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                finally {
                    this.spinnerService.stop();
                }
                return [2 /*return*/];
            });
        });
    };
    CreateOrdersComponent.prototype.getBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.lstBUnits.push({ label: "Select BUnit", value: "Select BUnit" });
                        this.lstLocation.push({ label: "Select Loc", value: "Select Loc" });
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getBusinessUnits(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_1.BusinessType.Inventory.toString())
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.msgs = [];
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                                    _this.spinnerService.stop();
                                    return;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.bunitData = data.DataList;
                                            for (var i = 0; i < _this.bunitData.length; i++) {
                                                _this.lstBUnits.push({ label: _this.bunitData[i], value: _this.bunitData[i] });
                                            }
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Custom:
                                        {
                                            _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2);
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.GetData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, ex_3, _b, ex_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.route.queryParams.subscribe(function (params) {
                                var queryMode;
                                queryMode = params['mode'];
                                if (queryMode == "Go") {
                                    _this.spinnerService.start();
                                    _this.GetBUnits_Carts();
                                    var strItemID = void 0;
                                    if (_this.screenName == 'Low Stock') {
                                        if (_this.itemID != '' && _this.itemID != null && _this.itemID != undefined) {
                                            _this.itemID = _this.itemID.toString().trim();
                                        }
                                    }
                                    else {
                                        if (_this.itemID != '' && _this.itemID != null && _this.itemID != undefined) {
                                            if (_this.itemID.trim().contains('')) {
                                                _this.arrIDAttributes = _this.itemID.trim().split('');
                                                strItemID = _this.arrIDAttributes[0];
                                            }
                                            else {
                                                strItemID = _this.itemID.toString().trim();
                                            }
                                        }
                                    }
                                }
                            })];
                    case 1:
                        _c.sent();
                        _a = this;
                        return [4 /*yield*/, this.getCartItemCounts()];
                    case 2:
                        _a.statusCode = _c.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, this.statusCode];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _c.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 4:
                        _c.trys.push([4, 6, 7, 8]);
                        _b = this;
                        return [4 /*yield*/, this.bindGrid(this.lstItemDetails)];
                    case 5:
                        _b.statusCode = _c.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, this.statusCode];
                        }
                        return [3 /*break*/, 8];
                    case 6:
                        ex_4 = _c.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 7:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.getCartItemCounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var itemID, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        this.msgs = [];
                        itemID = '';
                        //this.spinnerService.start();
                        if (this.screenName != 'Low Stock') {
                            if (this.itemID != null && this.itemID != undefined && this.itemID != '') {
                                if (this.itemID.code != null && this.itemID.code != undefined && this.itemID.code != '') {
                                    itemID = this.itemID.code;
                                }
                                else {
                                    itemID = '';
                                }
                            }
                            else {
                                itemID = '';
                            }
                        }
                        else {
                            itemID = this.itemID;
                        }
                        return [4 /*yield*/, this.createOrdersService.GetCartItemCounts(this.selectedBUnit, this.selectedLocation, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], itemID, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.appID)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.lstItemDetails = [];
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.showGrid = true;
                                            if (data.DataList != null) {
                                                //let items: VM_POU_CART_DETAILS[] = data.DataList;
                                                //for (let x = 0; x < items.length;x++)
                                                //{
                                                //    items[x].PAR_VALUE = parseFloat(parseFloat(items[x].PAR_VALUE.toString()).toFixed(2));
                                                //    items[x].QOH = parseFloat(parseFloat(items[x].QOH.toString()).toFixed(2));
                                                //    items[x].validationRules = 'numeric_dot';
                                                //    this.lstItemDetails.push(items[x]);
                                                //}
                                                data.DataList.forEach(function (item) {
                                                    item.PAR_VALUE = parseFloat(item.PAR_VALUE).toFixed(2);
                                                    item.QOH = parseFloat(item.QOH).toFixed(2);
                                                    item.validationRules = 'numeric_dot';
                                                    _this.lstItemDetails.push(item);
                                                });
                                                if (_this.lstItemDetails.length == 0) {
                                                    _this.statusCode = AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND;
                                                }
                                            }
                                            sessionStorage.setItem('dsCartItems', JSON.stringify(_this.lstItemDetails));
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Custom:
                                        {
                                            _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.statusCode];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5);
                        return [3 /*break*/, 5];
                    case 4: return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.bindGrid = function (lstItemDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var dsFilterdItems_1, intCnt_1, _drItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        try {
                            dsFilterdItems_1 = [];
                            intCnt_1 = 0;
                            if (this.appID.toString() == AtParEnums_1.EnumApps.Pharmacy.toString()) {
                                _drItems = void 0;
                                _drItems = lstItemDetails.filter(function (x) { return x.SUBSTITUTE_ITEM_FLG = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N.toString()]; });
                                if (_drItems.length > 0) {
                                    _drItems.forEach(function (item) {
                                        dsFilterdItems_1.push(item);
                                    });
                                }
                            }
                            if (dsFilterdItems_1.length > 0) {
                                dsFilterdItems_1.forEach(function (item) {
                                    item.SEQNO = intCnt_1;
                                    intCnt_1 += 1;
                                });
                                sessionStorage.setItem('dsCartItems', JSON.stringify(dsFilterdItems_1));
                                this.lstItemDetails = dsFilterdItems_1;
                            }
                            else {
                                lstItemDetails.forEach(function (item) {
                                    item.SEQNO = intCnt_1;
                                    intCnt_1 += 1;
                                });
                                sessionStorage.setItem('dsCartItems', JSON.stringify(lstItemDetails));
                                this.lstItemDetails = lstItemDetails;
                            }
                        }
                        catch (ex) {
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                        return [4 /*yield*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.ddlBUnitChanged = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.lstLocation = [];
                        this.lstLocation.push({ label: 'Select Loc', value: 'Select Loc' });
                        this.selectedLocation = '';
                        this.showGrid = false;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.GetBUnits_Carts()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6);
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.GetBUnits_Carts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strCartId_1, strBUnit_1, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        strCartId_1 = '';
                        strBUnit_1 = '';
                        this.statusCode = -1;
                        if (!(this.selectedBUnit != null && this.selectedBUnit != undefined && this.selectedBUnit != '' && this.selectedBUnit != 'Select BUnit')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.createOrdersService.GetBUnits_Carts(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.appID, AtParEnums_1.LocationType[AtParEnums_1.LocationType.P].toString(), AtParEnums_1.Par_Locn_Type[AtParEnums_1.Par_Locn_Type.CrashCart])
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.msgs = [];
                                var data = res.json();
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    strBUnit_1 = _this.selectedBUnit;
                                    data.DataList.forEach(function (data) {
                                        if (data.BUSINESS_UNIT == strBUnit_1 && data.CART_ID != strCartId_1) {
                                            _this.lstLocation.push({ label: data.CART_ID, value: data.CART_ID });
                                        }
                                        strCartId_1 = data.CART_ID;
                                    });
                                }
                                else {
                                    if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Par Locations assigned to the selected BU' });
                                        return;
                                    }
                                    else {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed to get Business Units / Par Location' });
                                        return;
                                    }
                                }
                                //switch (data.StatType) {
                                //    case StatusType.Success:
                                //        {
                                //            strBUnit = this.selectedBUnit;
                                //            data.DataList.forEach(data => {
                                //                if (data.BUSINESS_UNIT == strBUnit && data.CART_ID != strCartId) {
                                //                    this.lstLocation.push({ label: data.CART_ID, value: data.CART_ID });
                                //                }
                                //                strCartId = data.CART_ID;
                                //            });
                                //            break;
                                //        }
                                //    case StatusType.Warn:
                                //        {
                                //            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                //            break;
                                //        }
                                //    case StatusType.Custom:
                                //        {
                                //            this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                //            break;
                                //        }
                                //    case StatusType.Error:
                                //        {
                                //            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                //            break;
                                //        }
                                //}
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 5];
                    case 3:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7);
                        return [3 /*break*/, 5];
                    case 4: return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.ddlLocationChanged = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.itemID = '';
                        this.lstItems = [];
                        this.showGrid = false;
                        return [4 /*yield*/, this.GetItemsForSelectedLocation()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.GetItemsForSelectedLocation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        this.spinnerService.start();
                        sessionStorage.removeItem('dsDepartmentItems');
                        if (!(this.selectedLocation != null && this.selectedLocation != undefined && this.selectedLocation != '' && this.selectedLocation != 'Select Loc')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.createOrdersService.GetItemsForSelectedLocation(this.selectedLocation, this.selectedBUnit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.appID)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.msgs = [];
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    if (data.DataList != null) {
                                        data.DataList.forEach(function (item) {
                                            _this.lstItems.push({ value: item.ITEM_DESCR, name: item.INV_ITEM_ID + ' - ' + item.ITEM_DESCR, code: item.INV_ITEM_ID });
                                        });
                                        sessionStorage.setItem('dsDepartmentItems', JSON.stringify(_this.lstItems));
                                    }
                                }
                                //else {
                                //    if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                                //        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                                //        return;
                                //    }
                                //    else {
                                //        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No carts assigned to the department' });
                                //        return;
                                //    }
                                //}
                                //switch (data.StatType) {
                                //    case StatusType.Success: {
                                //        if (data.DataList != null) {
                                //            data.DataList.forEach(item => {
                                //                this.lstItems.push({ value: item.ITEM_DESCR, name: item.INV_ITEM_ID + ' - ' + item.ITEM_DESCR, code: item.INV_ITEM_ID });
                                //            });
                                //            sessionStorage.setItem('dsDepartmentItems', JSON.stringify(this.lstItems));
                                //        }
                                //        break;
                                //    }
                                //    case StatusType.Warn: {
                                //        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                //        break;
                                //    }
                                //    case StatusType.Error: {
                                //        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                //        break;
                                //    }
                                //    case StatusType.Custom: {
                                //        this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                //        break;
                                //    }
                                //}
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 5];
                    case 3:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9);
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.fillItemIDsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query, _a, ex_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        query = event.query;
                        if (!(this.lstItems != null && this.lstItems != undefined)) return [3 /*break*/, 2];
                        if (!(this.lstItems.length > 0)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.filterItemIDs(query, this.lstItems)];
                    case 1:
                        _a.lstFilterItemIDs = _b.sent();
                        _b.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_10 = _b.sent();
                        this.clientErrorMsg(ex_10);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.filterItemIDs = function (query, lstItems) {
        try {
            var filtered = [];
            if (query == "%") {
                for (var i = 0; i < lstItems.length; i++) {
                    filtered.push(lstItems[i]);
                }
            }
            else {
                for (var i = 0; i < lstItems.length; i++) {
                    var item = lstItems[i];
                    if (item.name.toLowerCase().indexOf(query.toLowerCase()) != -1) {
                        filtered.push(item);
                    }
                }
            }
            return filtered;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    CreateOrdersComponent.prototype.onGoClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var dsDepartmentItems, filterItems, _a, ex_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, 3, 4]);
                        this.spinnerService.start();
                        this.lstItemDetails = [];
                        this.showGrid = false;
                        if (this.selectedBUnit == '' || this.selectedBUnit == null || this.selectedBUnit == undefined || this.selectedBUnit == 'Select BUnit') {
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Business Unit / Company' });
                            return [2 /*return*/];
                        }
                        if (this.selectedLocation == '' || this.selectedLocation == null || this.selectedLocation == undefined || this.selectedLocation == 'Select Loc') {
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Par Location' });
                            return [2 /*return*/];
                        }
                        if (this.screenName != 'Low Stock') {
                            if (this.itemID != null && this.itemID != undefined && this.itemID != '') {
                                if (this.itemID.code != null && this.itemID.code != undefined && this.itemID.code != '') {
                                    dsDepartmentItems = JSON.parse(sessionStorage.getItem('dsDepartmentItems'));
                                    if (dsDepartmentItems != null) {
                                        if (dsDepartmentItems.length > 0) {
                                            filterItems = dsDepartmentItems.filter(function (x) { return x.code == _this.itemID.code; });
                                            if (filterItems.length == 0) {
                                                this.showGrid = false;
                                                this.msgs = [];
                                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Item ID' });
                                                return [2 /*return*/];
                                            }
                                        }
                                    }
                                }
                                else {
                                    this.showGrid = false;
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Item ID' });
                                    return [2 /*return*/];
                                }
                            }
                        }
                        _a = this;
                        return [4 /*yield*/, this.GetData()];
                    case 1:
                        _a.statusCode = _b.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.showGrid = false;
                            this.trTransId = 0;
                            if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                return [2 /*return*/];
                            }
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error' });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_11 = _b.sent();
                        this.clientErrorMsg(ex_11);
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.onSubmitClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var pDsCartItems, _a, ex_12, _b, ex_13, dsCartItemCounts, ex_14, ex_15;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 11, 12, 13]);
                        this.spinnerService.start();
                        this.pDsCartHeaders = [];
                        this.pDsCartDetails = [];
                        pDsCartItems = void 0;
                        pDsCartItems = JSON.parse(sessionStorage.getItem('dsCartItems'));
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, this.UpdateDataset(pDsCartItems)];
                    case 2:
                        _a.statusCode = _c.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.msgs = [];
                            if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NOTANUMBER) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Order quantity is not a valid number' });
                            }
                            //else {
                            //    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Internal Server Error' });
                            //}
                            if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.S_MAXVALUE_MORE) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Quantity must not be greater than max allowable quantity' });
                            }
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        ex_12 = _c.sent();
                        this.clientErrorMsg(ex_12);
                        return [3 /*break*/, 4];
                    case 4:
                        _c.trys.push([4, 6, , 7]);
                        _b = this;
                        return [4 /*yield*/, this.BuildInputDataset()];
                    case 5:
                        _b.statusCode = _c.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Internal Server Error' });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        ex_13 = _c.sent();
                        this.clientErrorMsg(ex_13);
                        return [3 /*break*/, 7];
                    case 7:
                        _c.trys.push([7, 9, , 10]);
                        if (this.pDsCartHeaders.length > 0) {
                            if (this.pDsCartHeaders[0].NO_OF_ORDERED_ITEMS == 0 + '') {
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No items have order quantity greater than zero' });
                                return [2 /*return*/];
                            }
                        }
                        else {
                            return [2 /*return*/];
                        }
                        dsCartItemCounts = { 'HEADER': this.pDsCartHeaders, 'DETAILS': this.pDsCartDetails };
                        return [4 /*yield*/, this.createOrdersService.CreateOrder(dsCartItemCounts, this.appID)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.msgs = [];
                                    if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.CRCT_E_COUNTEXISTS) {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    }
                                    else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_INVALIDPARAMETER) {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    }
                                    else {
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error' });
                                    }
                                }
                            })];
                    case 8:
                        _c.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 10];
                    case 9:
                        ex_14 = _c.sent();
                        this.clientErrorMsg(ex_14);
                        return [2 /*return*/];
                    case 10:
                        this.showGrid = false;
                        this.msgs = [];
                        this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Order Sent Successfully' });
                        return [3 /*break*/, 13];
                    case 11:
                        ex_15 = _c.sent();
                        this.clientErrorMsg(ex_15);
                        return [2 /*return*/];
                    case 12:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.UpdateDataset = function (pDsCartItems) {
        return __awaiter(this, void 0, void 0, function () {
            var i, item;
            return __generator(this, function (_a) {
                try {
                    for (i = 0; i < this.lstItemDetails.length; i++) {
                        item = this.lstItemDetails[i];
                        if (item.ORDER_QTY > this.strMaxAllowQty) {
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Quantity must not be greater than max allowable quantity' });
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.S_MAXVALUE_MORE];
                        }
                        pDsCartItems[i].ORDER_QTY = item.ORDER_QTY;
                    }
                    sessionStorage.setItem('dsCartItems', JSON.stringify(pDsCartItems));
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                    return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                }
                return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
            });
        });
    };
    CreateOrdersComponent.prototype.BuildInputDataset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _dsCartItems, _a, ex_16, _b, ex_17, ex_18;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 8, , 9]);
                        _dsCartItems = [];
                        _dsCartItems = JSON.parse(sessionStorage.getItem('dsCartItems'));
                        try {
                            this.pdeviceTokenEntry = [];
                            this.pdeviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID] = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                            this.pdeviceTokenEntry[AtParEnums_1.TokenEntry_Enum.AccessToken] = AtParEnums_1.SENT_FROM.SENT_FROM_WEB.toString();
                            this.pdeviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DeviceID] = '';
                            this.pdeviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID] = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID];
                            this.pdeviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                            this.pdeviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DateTime] = new Date().toString();
                            this.pdeviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ClientType] = AtParEnums_1.ClientType.WEB.toString();
                        }
                        catch (ex) {
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, this.PopulateHeadertable(_dsCartItems)];
                    case 2:
                        _a.statusCode = _c.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        ex_16 = _c.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 4:
                        _c.trys.push([4, 6, , 7]);
                        _b = this;
                        return [4 /*yield*/, this.PopulateDetailtable(_dsCartItems)];
                    case 5:
                        _b.statusCode = _c.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR;
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        ex_17 = _c.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 7: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                    case 8:
                        ex_18 = _c.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.PopulateHeadertable = function (pDsCartItems) {
        return __awaiter(this, void 0, void 0, function () {
            var cartHeader, dblNoOfItemsOrdered, filterItems, ex_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        cartHeader = new VM_CART_HEADER_1.VM_CART_HEADER();
                        dblNoOfItemsOrdered = 0;
                        filterItems = [];
                        filterItems = pDsCartItems.filter(function (x) { return x.ORDER_QTY > 0; });
                        dblNoOfItemsOrdered = filterItems.length;
                        cartHeader.CART_ID = this.selectedLocation;
                        cartHeader.BUSINESS_UNIT = this.selectedBUnit;
                        cartHeader.USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        cartHeader.START_DATETIME = new Date();
                        cartHeader.END_DATETIME = new Date();
                        cartHeader.QUANTITY_OPTION = this.REQUEST_QTY;
                        cartHeader.TRANSACTION_ID = 0;
                        cartHeader.CMTS = '';
                        cartHeader.NO_OF_SCANS = '0';
                        cartHeader.TOTAL_RECORDS = pDsCartItems.length.toString();
                        cartHeader.NO_OF_ORDERED_ITEMS = dblNoOfItemsOrdered.toString();
                        this.pDsCartHeaders.push(cartHeader);
                        return [4 /*yield*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        ex_19 = _a.sent();
                        this.clientErrorMsg(ex_19);
                        return [3 /*break*/, 3];
                    case 3: return [4 /*yield*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.PopulateDetailtable = function (pDsCartItems) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var cartItem_1, ex_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, pDsCartItems.forEach(function (item) {
                                cartItem_1 = new VM_CART_DETAILS_1.VM_CART_DETAILS();
                                cartItem_1.ITEM_ID = item.INV_ITEM_ID;
                                cartItem_1.COMPARTMENT = item.COMPARTMENT.toString().replace("'", "''");
                                cartItem_1.COUNT_QUANTITY = item.ORDER_QTY;
                                cartItem_1.OPTIMAL_QUANTITY = item.PAR_VALUE;
                                cartItem_1.LNCMTS = '';
                                cartItem_1.UOM = item.UOM;
                                cartItem_1.PRICE = item.ITEM_PRICE;
                                cartItem_1.COUNT_REQUIRED = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()];
                                cartItem_1.INVENTORY_ITEM = item.INVENTORY_ITEM;
                                cartItem_1.ITEM_DESCR = item.ITEM_DESCR;
                                cartItem_1.ACT_QOH = item.QOH.toString();
                                switch (item.ORDER_TYPE.toString()) {
                                    case "Par":
                                        cartItem_1.CART_REPLEN_CTRL = "01";
                                        break;
                                    case "FOQ":
                                        cartItem_1.CART_REPLEN_CTRL = "02";
                                        break;
                                    case "Min/Max":
                                        cartItem_1.CART_REPLEN_CTRL = "03";
                                        break;
                                    default:
                                        cartItem_1.CART_REPLEN_CTRL = item.ORDER_TYPE.toString();
                                        break;
                                }
                                switch (item.ITEM_TYPE.toString()) {
                                    case "Stock":
                                        cartItem_1.CART_REPLEN_OPT = "01";
                                        break;
                                    case "Non Stock":
                                        cartItem_1.CART_REPLEN_OPT = "02";
                                        break;
                                    case "Stockless":
                                        cartItem_1.CART_REPLEN_OPT = "03";
                                        break;
                                    case "Consignment":
                                        cartItem_1.CART_REPLEN_OPT = "04";
                                        break;
                                    case "Not Replenished":
                                        cartItem_1.CART_REPLEN_OPT = "05";
                                        break;
                                }
                                cartItem_1.MAX_QTY = item.MAX_QTY;
                                cartItem_1.FOQ = item.FOQ.toString();
                                cartItem_1.CUST_ITEM_NO = item.CUST_ITEM_NO;
                                cartItem_1.VENDOR_ID = item.VENDOR_ID;
                                _this.pDsCartDetails.push(cartItem_1);
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        ex_20 = _a.sent();
                        return [4 /*yield*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.clientErrorMsg = function (ex) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString());
    };
    CreateOrdersComponent.prototype.OnDestroy = function () {
        //sessionStorage.removeItem('dsLatestCompRep');
        //sessionStorage.removeItem('dsCompRep');
        //this.showGrid = null;
        //this.isShowOrgGroupDD = null;
        //this.orgGrpId = null;
        //this.selectedOrgGroupId = null;
        //this.selectedBUnit = null;
        //this.allDateString = null;
        //this.transID = null;
        //this.recordsPerPage = null;
        //this.cartID = null;
        //this.deviceTokenEntry = null;
        //this.msgs = null;
        //this.lstCartIDs = null;
        //this.lstOrgGroups = null;
        //this.lstFilterCartIDs = null;
        //this.lstBUnits = null;
        //this.orgGroupData = null;
        //this.lstCartItemDetails = null;
    };
    CreateOrdersComponent.prototype.parValueCustomSort = function (event, elementType) {
        if (elementType === void 0) { elementType = ""; }
        var element = event;
        var result = null;
        if (this.preField == element.field) {
            if (element.order == 1) {
                element.order = -1;
            }
            else {
                element.order = 1;
            }
        }
        else {
            element.order = 1;
        }
        this.preField = element.field;
        if (elementType == AtParEnums_1.ElementType[AtParEnums_1.ElementType.FLOAT].toString()) {
            this.lstItemDetails = this.lstItemDetails.sort(function (a, b) {
                result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                return (element.order * result);
            });
        }
        else {
            this.lstItemDetails = this.lstItemDetails.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null) {
                    result = -1;
                }
                else if (a[element.field] != null && b[element.field] == null) {
                    result = 1;
                }
                else if (a[element.field] == null && b[element.field] == null) {
                    result = 0;
                }
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string') {
                    if (parseFloat(a[element.field]) && parseFloat(b[element.field])) {
                        result = (parseFloat(a[element.field]) < parseFloat(b[element.field])) ? -1 : (parseFloat(a[element.field]) > parseFloat(b[element.field])) ? 1 : 0;
                    }
                    else {
                        result = a[element.field].localeCompare(b[element.field]);
                    }
                }
                else {
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                }
                return (element.order * result);
            });
        }
    };
    CreateOrdersComponent.prototype.qOHCustomSort = function (event) {
        var element = event;
        var result = null;
        this.lstItemDetails = this.lstItemDetails.sort(function (a, b) {
            if (a[element.field] == null && b[element.field] != null) {
                result = -1;
            }
            else if (a[element.field] != null && b[element.field] == null) {
                result = 1;
            }
            else if (a[element.field] == null && b[element.field] == null) {
                result = 0;
            }
            else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string') {
                if (parseFloat(a[element.field]) && parseFloat(b[element.field])) {
                    result = (parseFloat(a[element.field]) < parseFloat(b[element.field])) ? -1 : (parseFloat(a[element.field]) > parseFloat(b[element.field])) ? 1 : 0;
                }
                else {
                    result = a[element.field].localeCompare(b[element.field]);
                }
            }
            else {
                result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
            }
            return (element.order * result);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CreateOrdersComponent.prototype, "appID", void 0);
    CreateOrdersComponent = __decorate([
        core_1.Component({
            selector: 'atpar-create-orders',
            templateUrl: 'create-orders.component.html',
            providers: [
                datatableservice_1.datatableservice,
                atpar_common_service_1.AtParCommonService,
                pou_create_orders_service_1.CreateOrdersServices,
                AtParConstants_1.AtParConstants
            ]
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            pou_create_orders_service_1.CreateOrdersServices,
            router_1.ActivatedRoute,
            AtParConstants_1.AtParConstants])
    ], CreateOrdersComponent);
    return CreateOrdersComponent;
}());
exports.CreateOrdersComponent = CreateOrdersComponent;
//# sourceMappingURL=create-orders.component.js.map