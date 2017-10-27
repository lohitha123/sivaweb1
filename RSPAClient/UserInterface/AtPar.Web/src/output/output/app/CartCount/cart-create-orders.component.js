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
var cart_create_orders_service_1 = require("./cart-create-orders.service");
var datatableservice_1 = require("./../components/datatable/datatableservice");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var VM_CART_DETAILS_1 = require("../Entities/VM_CART_DETAILS");
var VM_CART_HEADER_1 = require("../Entities/VM_CART_HEADER");
var CreateOrdersComponent = (function () {
    function CreateOrdersComponent(dataservice, httpService, spinnerService, commonService, createOrdersService, atParConstant) {
        this.dataservice = dataservice;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.createOrdersService = createOrdersService;
        this.atParConstant = atParConstant;
        this.allDateString = '';
        this.transID = '';
        this.recordsPerPage = 0;
        this.deviceTokenEntry = [];
        this.msgs = [];
        this.lstCartIDs = [];
        this.lstOrgGroups = [];
        this.lstFilterCartIDs = [];
        this.lstBUnits = [];
        this.date1Header = '';
        this.date2Header = '';
        this.date3Header = '';
        this.date4Header = '';
        this.date5Header = '';
        this.showGrid = false;
        this.preField = "";
        this.isShowOrgGroupDD = false;
        this.showDate1Column = false;
        this.showDate2Column = false;
        this.showDate3Column = false;
        this.showDate4Column = false;
        this.showDate5Column = false;
        this.parLocType = '';
        this.reqNo = '';
        this.creationdate = '';
        this.intCntOrderedItems = 0;
        this.blnSortByColumn = true;
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.recordsPerPage = parseInt(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage]);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "constructor");
        }
    }
    CreateOrdersComponent.prototype.ngOnInit = function () {
        try {
            this.getOrgGroupIds();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    };
    CreateOrdersComponent.prototype.getOrgGroupIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.spinnerService.start();
                        this.lstOrgGroups = [];
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.msgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.isShowOrgGroupDD = false;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + ' - ' + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.getBusinessUnits();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.isShowOrgGroupDD = true;
                                            _this.lstBUnits = [];
                                            _this.lstBUnits.push({ label: "Select Bunit", value: "Select Bunit" });
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "getOrgGroupIds");
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.getBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var orgGroupID, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.msgs = [];
                        this.spinnerService.start();
                        this.lstBUnits = [];
                        this.lstBUnits.push({ label: 'Select Bunit', value: 'Select Bunit' });
                        this.lstCartIDs = [];
                        this.selectedBUnit = '';
                        this.cartID = '';
                        orgGroupID = '';
                        if (this.isShowOrgGroupDD) {
                            orgGroupID = this.selectedOrgGroupId;
                        }
                        else {
                            orgGroupID = (this.orgGrpId.split('-'))[0].trim();
                        }
                        if (orgGroupID == 'Select One' || orgGroupID == '' || orgGroupID == null) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(orgGroupID, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                _this.msgs = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        data.DataList.forEach(function (data) {
                                            _this.lstBUnits.push({ label: data, value: data });
                                        });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "getBusinessUnits");
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.ddlOrgGrpIdChanged = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.lstBUnits = [];
                        this.selectedBUnit = '';
                        this.lstCartItemDetails = [];
                        this.lstCartIDs = [];
                        this.cartID = '';
                        this.showGrid = false;
                        return [4 /*yield*/, this.getBusinessUnits()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "ddlOrgGrpIdChanged");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.ddlBUnitChanged = function (e) {
        try {
            this.lstCartItemDetails = [];
            this.lstCartIDs = [];
            this.cartID = '';
            this.showGrid = false;
            this.getCartsForBunit();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlBUnitChanged");
        }
    };
    CreateOrdersComponent.prototype.getCartsForBunit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var orgGroupID, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.msgs = [];
                        orgGroupID = '';
                        if (this.isShowOrgGroupDD) {
                            orgGroupID = this.selectedOrgGroupId;
                        }
                        else {
                            orgGroupID = (this.orgGrpId.split('-'))[0].trim();
                        }
                        if (this.selectedBUnit == 'Select Bunit' || this.selectedBUnit == '' || this.selectedBUnit == null) {
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.createOrdersService.getCartsForBunit(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedBUnit, orgGroupID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.msgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataList != null) {
                                            data.DataList.forEach(function (cart) {
                                                _this.lstCartIDs.push({ value: cart.DESCR, name: cart.CART_ID + ' - ' + cart.DESCR, code: cart.CART_ID });
                                            });
                                            _this.cartID = '';
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "getCartsForBunit");
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.fillCartIDsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                try {
                    query = event.query;
                    this.lstFilterCartIDs = this.filterCartIDs(query, this.lstCartIDs);
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "fillCartIDsAuto");
                }
                return [2 /*return*/];
            });
        });
    };
    CreateOrdersComponent.prototype.filterCartIDs = function (query, lstCartIDs) {
        try {
            var filtered = [];
            if (query == "%") {
                for (var i = 0; i < lstCartIDs.length; i++) {
                    filtered.push(lstCartIDs[i]);
                }
            }
            else {
                if (query.trim().toLowerCase() != '') {
                    if (query.substring(0, 1) != ' ') {
                        for (var i = 0; i < lstCartIDs.length; i++) {
                            var cart = lstCartIDs[i];
                            if (cart.name.toLowerCase().indexOf(query.trim().toLowerCase()) == 0) {
                                filtered.push(cart);
                            }
                        }
                    }
                }
            }
            return filtered;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "filterCartIDs");
        }
    };
    CreateOrdersComponent.prototype.onGoClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.spinnerService.start();
                        this.lstCartItemDetails = [];
                        this.lstCartHdr = [];
                        this.msgs = [];
                        if (this.isShowOrgGroupDD) {
                            if (this.selectedOrgGroupId == '' || this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == 'Select One') {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select valid Org Group ID' });
                                return [2 /*return*/];
                            }
                        }
                        else {
                        }
                        if (this.selectedBUnit == '' || this.selectedBUnit == null || this.selectedBUnit == undefined || this.selectedBUnit == 'Select Bunit') {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select valid Bunit' });
                            return [2 /*return*/];
                        }
                        if (this.cartID == null || this.cartID == '' || this.cartID == undefined) {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter CartID/ Par Location' });
                            return [2 /*return*/];
                        }
                        else {
                        }
                        return [4 /*yield*/, this.getCartPrevCounts()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "onGoClick");
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.getCartPrevCounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var orgGroupID, cartID_1, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        orgGroupID = '';
                        cartID_1 = '';
                        if (this.isShowOrgGroupDD) {
                            orgGroupID = this.selectedOrgGroupId;
                        }
                        else {
                            orgGroupID = (this.orgGrpId.split('-'))[0].trim();
                        }
                        if (this.cartID.code == null || this.cartID.code == '' || this.cartID.code == undefined) {
                            cartID_1 = this.cartID;
                        }
                        else {
                            cartID_1 = this.cartID.code;
                        }
                        this.showGrid = false;
                        this.lstCartItemDetails = [];
                        this.lstCartHdr = [];
                        this.allDateString = '';
                        this.transID = '';
                        this.parLocType = '';
                        this.creationdate = '';
                        this.reqNo = '';
                        return [4 /*yield*/, this.createOrdersService.getCartPrevCounts(orgGroupID, this.selectedBUnit, cartID_1, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID]).
                                then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataDictionary != null && data.DataDictionary != undefined) {
                                            if (data.DataDictionary['allDateString'] != null && data.DataDictionary['allDateString'] != '' && data.DataDictionary['allDateString'] != undefined) {
                                                if (data.DataDictionary['lstPrevCnts'] != null && data.DataDictionary['lstPrevCnts'] != '' && data.DataDictionary['lstPrevCnts'] != undefined) {
                                                    _this.hdnCartId = cartID_1;
                                                    _this.lstCartItemDetails = data.DataDictionary['lstPrevCnts'];
                                                    _this.dsCompRep = [];
                                                    sessionStorage.setItem('dsCompRep', JSON.stringify(data.DataDictionary['lstPrevCnts']));
                                                    _this.showGrid = true;
                                                    _this.lstCartItemDetails.forEach(function (cartItem) {
                                                        if (cartItem.ChkValue == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()]) {
                                                            cartItem.validationRules = "mandatory,nc_numeric_dot";
                                                        }
                                                        else if (cartItem.ChkValue == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N.toString()]) {
                                                            cartItem.validationRules = "nc_numeric_dot";
                                                        }
                                                    });
                                                    if (data.DataDictionary['lstCartHdr'] != null) {
                                                        _this.lstCartHdr = data.DataDictionary['lstCartHdr'];
                                                    }
                                                    if (data.DataDictionary['transID'] != null && data.DataDictionary['transID'] != '') {
                                                        _this.transID = data.DataDictionary['transID'];
                                                    }
                                                    _this.parLocType = data.DataDictionary['parLocType'];
                                                    _this.creationdate = data.DataDictionary['creationdate'];
                                                    _this.reqNo = data.DataDictionary['reqNo'];
                                                    _this.allDateString = data.DataDictionary['allDateString'];
                                                    _this.showOrHideDateColumns();
                                                }
                                                else {
                                                    _this.msgs = [];
                                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'This Cart is not been Counted Previously.' });
                                                }
                                            }
                                            else {
                                                _this.msgs = [];
                                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'This Cart is not been Counted Previously.' });
                                            }
                                        }
                                        else {
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'This Cart is not been Counted Previously.' });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'This Cart is not been Counted Previously.' });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs = [];
                                        if (_this.cartID.code == null || _this.cartID.code == '' || _this.cartID.code == undefined) {
                                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'This Cart is not been Counted Previously.' });
                                        }
                                        else {
                                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "getCartPrevCounts");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.showOrHideDateColumns = function () {
        try {
            var dateStringArray = this.allDateString.split(',');
            if (dateStringArray.length > 0) {
                switch (dateStringArray.length) {
                    case 0: {
                        this.showDate1Column = false;
                        this.showDate2Column = false;
                        this.showDate3Column = false;
                        this.showDate4Column = false;
                        this.showDate5Column = false;
                        this.date1Header = '';
                        this.date2Header = '';
                        this.date3Header = '';
                        this.date4Header = '';
                        this.date5Header = '';
                        break;
                    }
                    case 1: {
                        this.showDate1Column = true;
                        this.showDate2Column = false;
                        this.showDate3Column = false;
                        this.showDate4Column = false;
                        this.showDate5Column = false;
                        this.date1Header = dateStringArray[0];
                        this.date2Header = '';
                        this.date3Header = '';
                        this.date4Header = '';
                        this.date5Header = '';
                        break;
                    }
                    case 2: {
                        this.showDate1Column = true;
                        this.showDate2Column = true;
                        this.showDate3Column = false;
                        this.showDate4Column = false;
                        this.showDate5Column = false;
                        this.date1Header = dateStringArray[0];
                        this.date2Header = dateStringArray[1];
                        this.date3Header = '';
                        this.date4Header = '';
                        this.date5Header = '';
                        break;
                    }
                    case 3: {
                        this.showDate1Column = true;
                        this.showDate2Column = true;
                        this.showDate3Column = true;
                        this.showDate4Column = false;
                        this.showDate5Column = false;
                        this.date1Header = dateStringArray[0];
                        this.date2Header = dateStringArray[1];
                        this.date3Header = dateStringArray[2];
                        this.date4Header = '';
                        this.date5Header = '';
                        break;
                    }
                    case 4: {
                        this.showDate1Column = true;
                        this.showDate2Column = true;
                        this.showDate3Column = true;
                        this.showDate4Column = true;
                        this.showDate5Column = false;
                        this.date1Header = dateStringArray[0];
                        this.date2Header = dateStringArray[1];
                        this.date3Header = dateStringArray[2];
                        this.date4Header = dateStringArray[3];
                        this.date5Header = '';
                        break;
                    }
                    case 5: {
                        this.showDate1Column = true;
                        this.showDate2Column = true;
                        this.showDate3Column = true;
                        this.showDate4Column = true;
                        this.showDate5Column = true;
                        this.date1Header = dateStringArray[0];
                        this.date2Header = dateStringArray[1];
                        this.date3Header = dateStringArray[2];
                        this.date4Header = dateStringArray[3];
                        this.date5Header = dateStringArray[4];
                        break;
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "showOrHideDateColumns");
        }
    };
    CreateOrdersComponent.prototype.onSubmitClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7, i, cartItem, _a, i, ex_8, finalOutPutDictionary, orgGroupID, ex_9, ex_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 12, 13, 14]);
                        this.spinnerService.start();
                        try {
                            if (this.cartID != "" && this.cartID != null && this.cartID != undefined) {
                                if (this.cartID.code != null && this.cartID.code != '' && this.cartID.code != undefined) {
                                    if (this.hdnCartId.toUpperCase().trim() != this.cartID.code.toUpperCase().trim()) {
                                        this.msgs = [];
                                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Cart ID/Par Location has been changed after the report is run, click on Go to create order for new data selected.' });
                                        return [2 /*return*/];
                                    }
                                }
                                else if (this.hdnCartId.toUpperCase().trim() != this.cartID.toUpperCase().trim()) {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Cart ID/Par Location has been changed after the report is run, click on Go to create order for new data selected.' });
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter  CartID/Par Location' });
                                return [2 /*return*/];
                            }
                        }
                        catch (ex) {
                            this.msgs = [];
                            this.clientErrorMsg(ex, "onSubmitClick");
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        this.msgs = [];
                        return [4 /*yield*/, this.commonService.getProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], '2', 'ALLOW_EXCESS_PAR')
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this._strAllowExcessPar = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    return;
                                }
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_7 = _b.sent();
                        this.msgs = [];
                        this.clientErrorMsg(ex_7, "onSubmitClick");
                        return [2 /*return*/];
                    case 4:
                        try {
                            this.msgs = [];
                            this.dsCompRep = [];
                            this.dsCompRep = JSON.parse(sessionStorage.getItem('dsCompRep'));
                            this.lstCartItemDetails.forEach(function (cartItem) {
                                var dataRow = _this.dsCompRep.filter(function (x) { return x.INV_ITEM_ID == cartItem.INV_ITEM_ID && x.ROWINDEX == cartItem.ROWINDEX; });
                                if (cartItem.COUNTQTY.trim() != '' && cartItem.COUNTQTY.toUpperCase().trim() != 'NC') {
                                    dataRow[0].COUNTQTY = cartItem.COUNTQTY;
                                }
                                else if ((cartItem.COUNTQTY.toString().trim().length == 0) || (cartItem.COUNTQTY.toUpperCase().toString() == 'NC') || (Number.isInteger(parseInt(cartItem.COUNTQTY.toString())))) {
                                    if (dataRow[0].ChkValue == 'Y') {
                                        dataRow[0].COUNTQTY = cartItem.COUNTQTY;
                                    }
                                    else {
                                        if (cartItem.COUNTQTY.length == 0) {
                                            dataRow[0].COUNTQTY = 'NC';
                                        }
                                    }
                                }
                                else {
                                }
                            });
                            sessionStorage.setItem('dsLatestCompRep', JSON.stringify(this.dsCompRep));
                            this.dsLatestCompRep = JSON.parse(sessionStorage.getItem('dsLatestCompRep'));
                        }
                        catch (ex) {
                            this.msgs = [];
                            this.clientErrorMsg(ex, "onSubmitClick");
                            return [2 /*return*/];
                        }
                        try {
                            this.msgs = [];
                            for (i = 0; i < this.dsLatestCompRep.length; i++) {
                                cartItem = this.dsLatestCompRep[i];
                                if (cartItem.COUNTQTY.trim() != '' && cartItem.COUNTQTY.toUpperCase().trim() != 'NC') {
                                    if (!isNaN(Number(cartItem.COUNTQTY.toString()))) {
                                        if (this._strAllowExcessPar.toString() == 'N') {
                                            if (parseFloat(cartItem.OPTIMAL_QTY) < parseFloat(cartItem.COUNTQTY)) {
                                                this.msgs = [];
                                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Count Quantity should be less than Par Value' });
                                                return [2 /*return*/];
                                            }
                                        }
                                    }
                                    else {
                                        this.msgs = [];
                                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Numeric values to Count Quantity' });
                                        return [2 /*return*/];
                                    }
                                }
                                else if ((cartItem.COUNTQTY.toString().trim().length == 0) || (cartItem.COUNTQTY.toUpperCase().toString().trim() == 'NC') || (Number.isInteger(parseInt(cartItem.COUNTQTY.toString())))) {
                                    if (cartItem.ChkValue == 'Y') {
                                        if (cartItem.COUNTQTY.toUpperCase().trim() == 'NC' || cartItem.COUNTQTY == '') {
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Mandatory Counts Required' });
                                            return [2 /*return*/];
                                        }
                                    }
                                }
                            }
                        }
                        catch (ex) {
                            this.msgs = [];
                            this.clientErrorMsg(ex, "onSubmitClick");
                            return [2 /*return*/];
                        }
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        _a = this;
                        return [4 /*yield*/, this.outputDataset(this.dsCompRep)];
                    case 6:
                        _a._strQtyOption = _b.sent();
                        if (this._strQtyOption == '') {
                            return [2 /*return*/];
                        }
                        this.lstOutPutHeader = [];
                        this.outPutHeader = new VM_CART_HEADER_1.VM_CART_HEADER();
                        this.outPutHeader.CART_ID = this.hdnCartId.toUpperCase();
                        this.outPutHeader.BUSINESS_UNIT = this.selectedBUnit;
                        this.outPutHeader.USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        this.outPutHeader.QUANTITY_OPTION = this._strQtyOption;
                        this.outPutHeader.TRANSACTION_ID = parseInt(this.transID);
                        this.outPutHeader.START_DATETIME = new Date();
                        this.outPutHeader.END_DATETIME = new Date();
                        this.outPutHeader.CMTS = '';
                        this.outPutHeader.NO_OF_SCANS = 0 + '';
                        this.outPutHeader.TOTAL_RECORDS = this.dsCompRep.length.toString();
                        this.outPutHeader.NO_OF_ORDERED_ITEMS = this.intCntOrderedItems.toString();
                        if (this.cartID.value != null && this.cartID.value != undefined && this.cartID.value != '') {
                            this.outPutHeader.DESCR = this.cartID.value;
                        }
                        this.lstOutPutHeader.push(this.outPutHeader);
                        this.lstOutPutDetails = [];
                        if (this._strQtyOption != '') {
                            this.intCntOrderedItems = 0;
                            this.dsLatestCompRep.forEach(function (cartItem) {
                                if (cartItem.COUNTQTY.trim() != '' && cartItem.COUNTQTY.toUpperCase().trim() != 'NC') {
                                    _this.outPutDetail = new VM_CART_DETAILS_1.VM_CART_DETAILS();
                                    _this.outPutDetail.ITEM_ID = cartItem.INV_ITEM_ID;
                                    var _strCompt = '';
                                    _strCompt = cartItem.COMPARTMENT.trim();
                                    if (_strCompt == ' ') {
                                        _strCompt = _strCompt.replace("'", "''");
                                    }
                                    _this.outPutDetail.COMPARTMENT = _strCompt;
                                    _this.outPutDetail.COUNT_QUANTITY = parseFloat(cartItem.COUNTQTY);
                                    _this.outPutDetail.OPTIMAL_QUANTITY = parseFloat(cartItem.OPTIMAL_QTY);
                                    _this.outPutDetail.LNCMTS = '';
                                    _this.outPutDetail.UOM = cartItem.UOM;
                                    _this.outPutDetail.PRICE = parseFloat(cartItem.ITEM_PRICE);
                                    _this.outPutDetail.COUNT_REQUIRED = 'Y';
                                    var _strItemType = '';
                                    _strItemType = cartItem.INVENTORY_ITEM;
                                    if (_strItemType == 'STOCK') {
                                        _strItemType = 'Y';
                                    }
                                    else if (_strItemType == 'NONSTOCK') {
                                        _strItemType = 'N';
                                    }
                                    else if (_strItemType == 'STOCKLESS') {
                                        _strItemType = 'STOCKLESS';
                                    }
                                    else if (_strItemType == 'CONSIGN') {
                                        _strItemType = 'CONSIGN';
                                    }
                                    else if (_strItemType == 'STOCKTRANSFER') {
                                        _strItemType = 'STOCKTRANSFER';
                                    }
                                    _this.outPutDetail.INVENTORY_ITEM = _strItemType;
                                    _this.outPutDetail.ITEM_DESCR = cartItem.ITEM_DESCR;
                                    _this.outPutDetail.CART_REPLEN_CTRL = cartItem.CART_REPLEN_CTRL;
                                    _this.outPutDetail.CART_REPLEN_OPT = cartItem.CART_REPLEN_OPT;
                                    _this.outPutDetail.MAX_QTY = parseFloat(cartItem.MAX_QTY);
                                    _this.outPutDetail.FOQ = cartItem.FOQ;
                                    _this.outPutDetail.CUST_ITEM_NO = cartItem.CUST_ITEM_ID;
                                    _this.outPutDetail.COUNT_ORDER = parseFloat(cartItem.COUNT_ORDER);
                                    _this.outPutDetail.ITEM_COUNT_ORDER = parseFloat(cartItem.COUNT_ORDER);
                                    _this.lstOutPutDetails.push(_this.outPutDetail);
                                    _this.ChkCountAndParValue(cartItem.OPTIMAL_QTY.toString(), cartItem.COUNTQTY, _this._strQtyOption);
                                }
                            });
                        }
                        for (i = 0; i < this.lstOutPutHeader.length; i++) {
                            this.lstOutPutHeader[i].NO_OF_ORDERED_ITEMS = this.intCntOrderedItems.toString();
                            this.lstOutPutHeader[i].REQ_NO = this.reqNo;
                            this.lstOutPutHeader[i].CREATION_DT = this.creationdate;
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        ex_8 = _b.sent();
                        this.clientErrorMsg(ex_8, "onSubmitClick");
                        return [2 /*return*/];
                    case 8:
                        _b.trys.push([8, 10, , 11]);
                        finalOutPutDictionary = { 'HEADER': this.lstOutPutHeader, 'DETAILS': this.lstOutPutDetails };
                        orgGroupID = '';
                        if (this.isShowOrgGroupDD) {
                            orgGroupID = this.selectedOrgGroupId;
                        }
                        else {
                            orgGroupID = (this.orgGrpId.split('-'))[0].trim();
                        }
                        return [4 /*yield*/, this.createOrdersService.sendCartCounts(finalOutPutDictionary, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedBUnit, this.cartID.code, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], orgGroupID, this.transID)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.selectedBUnit = 'Select Bunit';
                                _this.lstCartItemDetails = [];
                                _this.lstCartIDs = [];
                                _this.cartID = '';
                                _this.showGrid = false;
                                _this.lstCartItemDetails = [];
                                _this.lstCartHdr = [];
                                _this.allDateString = '';
                                _this.transID = '';
                                _this.parLocType = '';
                                _this.creationdate = '';
                                _this.reqNo = '';
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 9:
                        _b.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        ex_9 = _b.sent();
                        this.clientErrorMsg(ex_9, "onSubmitClick");
                        return [2 /*return*/];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        ex_10 = _b.sent();
                        this.clientErrorMsg(ex_10, "onSubmitClick");
                        return [2 /*return*/];
                    case 13:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.outputDataset = function (ds) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _strQtyOption, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _strQtyOption = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!(this.lstCartItemDetails.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.getProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], '2', 'QTY_OPTION')
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _strQtyOption = data.DataVariable.toString();
                                        if (_strQtyOption.toUpperCase() == 'COUNT') {
                                            _strQtyOption = '01';
                                        }
                                        else if (_strQtyOption.toUpperCase() == 'REQUEST') {
                                            _strQtyOption = '02';
                                        }
                                        else {
                                            if (_this.parLocType != null && _this.parLocType != '') {
                                                _strQtyOption = _this.parLocType;
                                            }
                                            else {
                                                _strQtyOption = '03';
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, _strQtyOption];
                    case 4:
                        ex_11 = _a.sent();
                        _strQtyOption = '';
                        this.clientErrorMsg(ex_11, "outputDataset");
                        return [2 /*return*/, _strQtyOption];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.ChkCountAndParValue = function (pParValue, pCountValue, pOption) {
        try {
            if (pParValue != '' && (parseFloat(pParValue)) && pCountValue != '' && (parseFloat(pCountValue))) {
                if (pOption != '') {
                    if (pOption == '01') {
                        if (parseFloat(pParValue) > parseFloat(pCountValue)) {
                            this.intCntOrderedItems++;
                        }
                    }
                    else if (pOption == '02') {
                        if (parseFloat(pCountValue) > 0) {
                            this.intCntOrderedItems++;
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ChkCountAndParValue");
        }
    };
    CreateOrdersComponent.prototype.customSort = function (event) {
        var element = event;
        var result = null;
        try {
            if (this.preField == element.field) {
                if (element.order == 1) {
                    element.order = 1;
                }
                else {
                    element.order = -1;
                }
            }
            else {
                if (element.field != 'INV_ITEM_ID') {
                    element.order = 1;
                }
                else {
                    if (this.preField == '') {
                        element.order = -1;
                    }
                    else {
                        element.order = 1;
                    }
                }
            }
            this.preField = element.field;
            this.lstCartItemDetails = this.lstCartItemDetails.sort(function (a, b) {
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
                    if (Number(a[element.field]) && Number(b[element.field])) {
                        result = (parseFloat(a[element.field]) == parseFloat(b[element.field])) ? 0 : (parseFloat(a[element.field]) < parseFloat(b[element.field])) ? -1 : (parseFloat(a[element.field]) > parseFloat(b[element.field])) ? 1 : 0;
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
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    };
    CreateOrdersComponent.prototype.customSort1 = function (event, elementType) {
        if (elementType === void 0) { elementType = ""; }
        var element = event;
        var result = null;
        if (this.preField == element.field) {
            this.blnSortByColumn = !this.blnSortByColumn;
            // element.order = !element.order;
        }
        else {
            this.blnSortByColumn = true;
        }
        this.preField = element.field;
        try {
            this.lstCartItemDetails = this.lstCartItemDetails.sort(function (a, b) {
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
                    if (Number(a[element.field]) && Number(b[element.field])) {
                        result = (parseFloat(a[element.field]) == parseFloat(b[element.field])) ? 0 : (parseFloat(a[element.field]) < parseFloat(b[element.field])) ? -1 : (parseFloat(a[element.field]) > parseFloat(b[element.field])) ? 1 : 0;
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
            if (this.blnSortByColumn == false) {
                element.order = -1;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort1");
        }
    };
    CreateOrdersComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    CreateOrdersComponent.prototype.OnDestroy = function () {
        sessionStorage.removeItem('dsLatestCompRep');
        sessionStorage.removeItem('dsCompRep');
        this.showGrid = null;
        this.isShowOrgGroupDD = null;
        this.orgGrpId = null;
        this.selectedOrgGroupId = null;
        this.selectedBUnit = null;
        this.allDateString = null;
        this.transID = null;
        this.recordsPerPage = null;
        this.cartID = null;
        this.deviceTokenEntry = null;
        this.msgs = null;
        this.lstCartIDs = null;
        this.lstOrgGroups = null;
        this.lstFilterCartIDs = null;
        this.lstBUnits = null;
        this.orgGroupData = null;
        this.lstCartItemDetails = null;
    };
    CreateOrdersComponent = __decorate([
        core_1.Component({
            templateUrl: 'cart-create-orders.component.html',
            providers: [
                datatableservice_1.datatableservice,
                atpar_common_service_1.AtParCommonService,
                cart_create_orders_service_1.CreateOrdersServices,
                AtParConstants_1.AtParConstants
            ]
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            cart_create_orders_service_1.CreateOrdersServices,
            AtParConstants_1.AtParConstants])
    ], CreateOrdersComponent);
    return CreateOrdersComponent;
}());
exports.CreateOrdersComponent = CreateOrdersComponent;
//# sourceMappingURL=cart-create-orders.component.js.map