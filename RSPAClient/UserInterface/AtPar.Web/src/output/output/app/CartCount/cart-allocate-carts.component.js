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
var http_1 = require("@angular/http");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParEnums_3 = require("../Shared/AtParEnums");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var cart_allocate_carts_component_service_1 = require("../CartCount/cart-allocate-carts.component.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var datatableservice_1 = require("./../components/datatable/datatableservice");
var datatable_1 = require("../components/datatable/datatable");
var MT_CRCT_USER_ALLOCATION_1 = require("../../app/Entities/MT_CRCT_USER_ALLOCATION");
var linq_es5_1 = require("linq-es5");
var AllocateCartsComponent = (function () {
    function AllocateCartsComponent(httpService, _http, spinnerService, commonService, atParConstant, cartAllocationService) {
        this.httpService = httpService;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.cartAllocationService = cartAllocationService;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.selectedOrgGroupId = "";
        this.selectedDropDownUserId = "";
        this.selectedDropDownUserId1 = "";
        this.selectedBunit = "";
        this.selectedParlocation = "";
        this.orgGrpId = "";
        this.order = "";
        this.blnShowOrgGroupDD = false;
        this.lstUsers = [];
        this.lstUsersForCopyMoveDelete = [];
        this.lstOrgGroups = [];
        this.lstOrgGroupsList = [];
        this.showGrid = false;
        this.lstFilteredBUnits = [];
        this.lstFilteredDisplay = [];
        this.newItem = new MT_CRCT_USER_ALLOCATION_1.MT_CRCT_USER_ALLOCATION();
        this.selectedDisplay = "";
        this.showOnAllocateSelection = false;
        this.strMenuCode = "mt_cart_allocation.aspx";
        this.strAuditData = "";
        this.strRowFilter = "";
        this.blnsortbycolumn = true;
        this.loading = true;
    }
    AllocateCartsComponent.prototype.ngOnInit = function () {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.RecordsPerPage];
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedCartsData = new Array();
        this.lstUnCheckedCartsData = new Array();
        this.bindOrgGroups();
        this.bindDisplayItems();
    };
    AllocateCartsComponent.prototype.bindDisplayItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.lstFilteredDisplay.push({ label: "All", value: "A" });
                this.lstFilteredDisplay.push({ label: "Allocated", value: "L" });
                this.lstFilteredDisplay.push({ label: "Unallocated", value: "U" });
                return [2 /*return*/];
            });
        });
    };
    AllocateCartsComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.bindUsersList();
                                            _this.populateBusinessUnits();
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstUsers = [];
                                            _this.lstUsers.push({ label: "Select User", value: "Select User" });
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            _this.lstFilteredBUnits = [];
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateCartsComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        isOrgBUnitsExist = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.lstFilteredBUnits = [];
                                _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstFilteredBUnits.push({
                                                label: data.DataList[i].toString(),
                                                value: data.DataList[i].toString()
                                            });
                                        }
                                        isOrgBUnitsExist = true;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(isOrgBUnitsExist)];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "populateBusinessUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateCartsComponent.prototype.bindUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstUsers = [];
                        this.lstUsers.push({ label: "Select User", value: "" });
                        return [4 /*yield*/, this.commonService.getUsersList(this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID], 2, this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstUsers.push({
                                                label: data.DataList[i].FULLNAME,
                                                value: data.DataList[i].USER_ID
                                            });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "bindUsersList");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateCartsComponent.prototype.bindUsersListForCopyMoveDelete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstUsersForCopyMoveDelete = [];
                        this.lstUsersForCopyMoveDelete.push({ label: "Select User", value: "Select User" });
                        return [4 /*yield*/, this.commonService.getUsersList(this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID], 2, this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.selectedDropDownUserId1 = "";
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            if (data.DataList[i].USER_ID != _this.selectedDropDownUserId) {
                                                _this.lstUsersForCopyMoveDelete.push({
                                                    label: data.DataList[i].FULLNAME,
                                                    value: data.DataList[i].USER_ID
                                                });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "bindUsersListForCopyMoveDelete");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateCartsComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.growlMessage = [];
                this.showGrid = false;
                if (this.orgGroupIDForDBUpdate === this.selectedOrgGroupId) {
                    if (this.selectedDropDownUserId === "" || this.selectedDropDownUserId === "Select User") {
                        this.bindUsersList();
                        return [2 /*return*/];
                    }
                    else {
                    }
                    if (this.selectedDisplay === "L") {
                        this.showOnAllocateSelection = true;
                    }
                    else {
                        this.showOnAllocateSelection = false;
                    }
                    return [2 /*return*/];
                }
                this.showOnAllocateSelection = false;
                if (this.selectedOrgGroupId == "Select One") {
                    this.lstUsers = [];
                    this.lstUsers.push({ label: "Select User", value: "" });
                    this.lstFilteredBUnits = [];
                    this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                    return [2 /*return*/];
                }
                this.spinnerService.start();
                try {
                    this.selectedDropDownUserId = "";
                    this.selectedBunit = "";
                    this.bindUsersList();
                    this.populateBusinessUnits();
                    this.spinnerService.stop();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    AllocateCartsComponent.prototype.getAllocateCarts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isChecked, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.order = "ASC";
                        this.showGrid = false;
                        this.showOnAllocateSelection = false;
                        this.spinnerService.start();
                        isChecked = false;
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                            if (this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined) {
                                this.showGrid = false;
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID." });
                                this.spinnerService.stop();
                                return [2 /*return*/, false];
                            }
                        }
                        if (this.selectedDropDownUserId == "" || this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId == undefined) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select User ID" });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            return [2 /*return*/, false];
                        }
                        if (this.lstFilteredBUnits.length == 1) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Assigned Org Business Units" });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.cartAllocationService.getCartDetails(this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.OrgGrpID], this.selectedDropDownUserId, this.selectedBunit, this.selectedParlocation, this.order).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.showGrid = true;
                                        var cartsData = data.DataVariable["m_Item2"];
                                        _this.lstDBData = cartsData;
                                        _this.cartsAllocatedMsg = "Number of Carts allocated to " + _this.selectedUserIdLblValue + " :  " + data.DataVariable["m_Item1"];
                                        _this.BindDataGrid();
                                        _this.lstCheckedCartsData = [];
                                        _this.lstUnCheckedCartsData = [];
                                        for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                            if (_this.lstDBData[i].IsOrphan === "Y") {
                                                _this.lstDBData[i].CartColor = "red";
                                            }
                                            else {
                                                _this.lstDBData[i].CartColor = "black";
                                            }
                                            _this.lstDBData[i].ID = "CartCounterId" + i;
                                            if (_this.lstDBData[i].CART_COUNT_ORDER == null || _this.lstDBData[i].CART_COUNT_ORDER == 0) {
                                                _this.lstDBData[i].CART_COUNT_ORDER = null;
                                            }
                                            if (_this.lstDBData[i].ALL == true) {
                                                _this.lstCheckedCartsData.push(_this.lstDBData[i]);
                                            }
                                            else {
                                                _this.lstUnCheckedCartsData.push(_this.lstDBData[i]);
                                            }
                                            var time = _this.lstDBData[i].COUNT_BEFORE;
                                            //if (time != "") {
                                            //    var hours = Number(time.match(/^(\d+)/)[1]);
                                            //    var minutes = Number(time.match(/:(\d+)/)[1]);
                                            //    var AMPM = time[5] + time[6];
                                            //    if (AMPM == "PM" && hours < 12) hours = hours + 12;
                                            //    if (AMPM == "AM" && hours == 12) hours = hours - 12;
                                            //    var sHours = hours.toString();
                                            //    var sMinutes = minutes.toString();
                                            //    if (hours < 10) sHours = "0" + sHours;
                                            //    if (minutes < 10) sMinutes = "0" + sMinutes;
                                            //    this.lstDBData[i].COUNT_BEFORE = sHours + ":" + sMinutes;
                                            //}
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "getAllocateCarts");
                        this.showGrid = false;
                        this.showOnAllocateSelection = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateCartsComponent.prototype.BindDataGrid = function () {
        var _this = this;
        try {
            this.lstgridfilterData = null;
            this.spinnerService.start();
            this.strRowFilter = "";
            if (this.lstDBData.length > 0) {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].COUNT_BEFORE == null) {
                        this.lstDBData[i].COUNT_BEFORE = "";
                    }
                    if (this.lstDBData[i].DESCR != null) {
                        this.lstDBData[i].DESCR = this.lstDBData[i].DESCR.replace(/\'/g, "''").trim();
                    }
                }
            }
            if (this.selectedParlocation !== "") {
                this.lstDBData = linq_es5_1.asEnumerable(this.lstDBData).Where(function (x) { return x.CART_ID.toUpperCase().startsWith(_this.selectedParlocation.toUpperCase()); }).ToArray();
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    return;
                }
            }
            if (this.selectedDisplay === "L") {
                this.showOnAllocateSelection = true;
                this.bindUsersListForCopyMoveDelete();
                if (this.selectedParlocation !== "") {
                    this.lstDBData = this.lstDBData.filter(function (x) { return x.ALL == true; });
                }
                else {
                    this.lstDBData = this.lstDBData.filter(function (x) { return x.CHK_ALLOCATED == true; });
                }
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.showOnAllocateSelection = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    this.spinnerService.stop();
                    return;
                }
            }
            else if (this.selectedDisplay === "U") {
                this.showOnAllocateSelection = false;
                if (this.selectedParlocation !== "") {
                    this.lstDBData = this.lstDBData.filter(function (x) { return x.ALL == false; });
                }
                else {
                    this.lstDBData = this.lstDBData.filter(function (x) { return x.CHK_ALLOCATED == false; });
                }
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.showOnAllocateSelection = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    this.spinnerService.stop();
                    return;
                }
            }
            else {
                this.showOnAllocateSelection = false;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    };
    AllocateCartsComponent.prototype.UpdateGridData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var stime, timeSplit, i, dt, timeConverMinutes, amTime, amTimeMinutes, pmTime, pmTimeMinutes, ex_6, i, index, ex_7, i, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stime = "";
                        timeSplit = [];
                        this.spinnerService.start();
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            //if (this.lstDBData[i].COUNT_BEFORE != "") {
                            //    let timeSplit = this.lstDBData[i].COUNT_BEFORE.split(":");
                            //    this.timeConversion = +(timeSplit[0]);
                            //    if (this.timeConversion < 12) {
                            //        let amTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                            //        this.lstDBData[i].COUNT_BEFORE = amTime + ':' + timeSplit[1] + 'AM';
                            //    }
                            //    else {
                            //        this.timeConversion = this.timeConversion - 12;
                            //        let pmTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                            //        this.lstDBData[i].COUNT_BEFORE = pmTime + ':' + timeSplit[1] + 'PM';
                            //    }
                            //}
                            if (this.lstDBData[i].COUNT_BEFORE != null && this.lstDBData[i].COUNT_BEFORE != '' && this.lstDBData[i].COUNT_BEFORE != undefined) {
                                dt = this.lstDBData[i].COUNT_BEFORE.toString();
                                if (dt.length > 11) {
                                    if (this.lstDBData[i].COUNT_BEFORE != '') {
                                        stime = new Date(this.lstDBData[i].COUNT_BEFORE).getHours() + ':' + new Date(this.lstDBData[i].COUNT_BEFORE).getMinutes();
                                        timeSplit = stime.split(":");
                                        this.timeConversion = +(timeSplit[0]);
                                        timeConverMinutes = void 0;
                                        timeConverMinutes = +(timeSplit[1]);
                                        if (this.timeConversion < 12) {
                                            amTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                                            amTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                                            if (amTime == "00") {
                                                amTime = "12";
                                            }
                                            this.lstDBData[i].COUNT_BEFORE = amTime + ':' + amTimeMinutes + ' AM';
                                        }
                                        else {
                                            this.timeConversion = this.timeConversion - 12;
                                            pmTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                                            pmTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                                            if (pmTime == "00") {
                                                pmTime = "12";
                                            }
                                            this.lstDBData[i].COUNT_BEFORE = pmTime + ':' + pmTimeMinutes + ' PM';
                                        }
                                    }
                                    else {
                                        this.growlMessage = [];
                                        this.spinnerService.stop();
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                                        return [2 /*return*/];
                                    }
                                }
                            }
                            //else {
                            //    this.growlMessage = [];
                            //    this.spinnerService.stop();
                            //    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                            //    return;
                            //}
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getAuditAllowed(2, this.strMenuCode).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.strAuditData = data.Data;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "UpdateGridData");
                        return [3 /*break*/, 4];
                    case 4:
                        if (!(this.strAuditData === "Y")) return [3 /*break*/, 8];
                        this.lstAuditData = this.lstDBData;
                        for (i = 0; i <= this.lstAuditData.length - 1; i++) {
                            if (this.lstAuditData[i].ALL == false && this.lstAuditData[i].CHK_ALLOCATED == false) {
                                index = this.lstAuditData.indexOf(this.lstAuditData[i], 0);
                                this.lstAuditData.splice(index, 1);
                            }
                            else {
                                if (this.lstAuditData[i].ALL == false && this.lstAuditData[i].CHK_ALLOCATED == true) {
                                    this.lstAuditData[i].RECORD_MODE = "Delete";
                                }
                                else {
                                    this.lstAuditData[i].RECORD_MODE = "";
                                }
                            }
                        }
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.doAuditData(this.selectedDropDownUserId, 2, this.strMenuCode, this.lstAuditData).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "UpdateGridData");
                        return [3 /*break*/, 8];
                    case 8:
                        _a.trys.push([8, 10, , 11]);
                        this.spinnerService.start();
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            if (this.lstDBData[i].ALL == true) {
                                if (this.lstDBData[i].CART_COUNT_ORDER != null) {
                                    this.lstDBData[i].CART_COUNT_ORDER = this.lstDBData[i].CART_COUNT_ORDER;
                                }
                                else {
                                    this.lstDBData[i].CART_COUNT_ORDER = 99;
                                }
                            }
                            else {
                                this.lstDBData[i].CART_COUNT_ORDER = null;
                            }
                            this.lstDBData[i].DESCR = this.lstDBData[i].DESCR.replace(/\'/g, "''").trim();
                        }
                        return [4 /*yield*/, this.cartAllocationService.AllocateCarts(this.lstDBData, this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID], this.selectedDropDownUserId, this.selectedBunit, this.selectedParlocation).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        var statusMessage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "User").replace("2%", _this.selectedDropDownUserId);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.showOnAllocateSelection = false;
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.showOnAllocateSelection = false;
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedParlocation = "";
                                            _this.selectedBunit = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.showOnAllocateSelection = false;
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "UpdateGridData");
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    AllocateCartsComponent.prototype.selectedRow = function (event, selectedData) {
        try {
            if (event.target.checked == true) {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].SNO == selectedData.SNO) {
                        this.lstDBData[i].ALL = true;
                        this.lstDBData[i].MON = true;
                        this.lstDBData[i].TUE = true;
                        this.lstDBData[i].WED = true;
                        this.lstDBData[i].THU = true;
                        this.lstDBData[i].FRI = true;
                        this.lstDBData[i].SAT = true;
                        this.lstDBData[i].SUN = true;
                    }
                }
            }
            else {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].SNO == selectedData.SNO) {
                        this.lstDBData[i].ALL = false;
                        this.lstDBData[i].MON = false;
                        this.lstDBData[i].TUE = false;
                        this.lstDBData[i].WED = false;
                        this.lstDBData[i].THU = false;
                        this.lstDBData[i].FRI = false;
                        this.lstDBData[i].SAT = false;
                        this.lstDBData[i].SUN = false;
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    };
    AllocateCartsComponent.prototype.DaySelected = function (event, ven, Day) {
        try {
            if (event.target.checked == true) {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (ven.SNO == this.lstDBData[i].SNO) {
                        this.lstDBData[i].ALL = true;
                    }
                }
            }
            else {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (ven.SNO == this.lstDBData[i].SNO) {
                        ven[Day] = false;
                        if (this.lstDBData[i].MON == true || this.lstDBData[i].TUE == true || this.lstDBData[i].WED == true || this.lstDBData[i].THU == true || this.lstDBData[i].FRI == true || this.lstDBData[i].SAT == true || this.lstDBData[i].SUN == true) {
                            this.lstDBData[i].ALL = true;
                        }
                        else {
                            this.lstDBData[i].ALL = false;
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "DaySelected");
        }
    };
    AllocateCartsComponent.prototype.CopyCarts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        if (this.selectedDropDownUserId1 == "" || this.selectedDropDownUserId1 == undefined) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select User ID" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            if (this.lstDBData[i].CART_COUNT_ORDER == null) {
                                this.lstDBData[i].CART_COUNT_ORDER = 99;
                            }
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.cartAllocationService.CopyCarts(this.lstDBData, this.selectedDropDownUserId, this.selectedDropDownUserId1, this.selectedBunit, this.selectedParlocation).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedParlocation = "";
                                            _this.selectedBunit = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "CopyCarts");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateCartsComponent.prototype.MoveCarts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        if (this.selectedDropDownUserId1 == "" || this.selectedDropDownUserId1 == undefined) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select User ID" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            if (this.lstDBData[i].CART_COUNT_ORDER == null) {
                                this.lstDBData[i].CART_COUNT_ORDER = 99;
                            }
                        }
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.cartAllocationService.MoveCarts(this.lstDBData, this.selectedDropDownUserId, this.selectedDropDownUserId1, this.selectedBunit, this.selectedParlocation).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, "MoveCarts");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateCartsComponent.prototype.DeleteCarts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            if (this.lstDBData[i].CART_COUNT_ORDER == null) {
                                this.lstDBData[i].CART_COUNT_ORDER = 99;
                            }
                        }
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.cartAllocationService.DeleteCarts(this.lstDBData, this.selectedDropDownUserId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Deleted Successfully' });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "DeleteCarts");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateCartsComponent.prototype.checkAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                try {
                    if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                        if (this.EndIndex > this.lstgridfilterData.length) {
                            this.EndIndex = this.lstgridfilterData.length;
                        }
                        for (i = this.startIndex; i <= this.EndIndex - 1; i++) {
                            this.lstgridfilterData[i].ALL = true;
                            this.lstgridfilterData[i].MON = true;
                            this.lstgridfilterData[i].TUE = true;
                            this.lstgridfilterData[i].WED = true;
                            this.lstgridfilterData[i].THU = true;
                            this.lstgridfilterData[i].FRI = true;
                            this.lstgridfilterData[i].SAT = true;
                            this.lstgridfilterData[i].SUN = true;
                        }
                    }
                    else {
                        if (this.EndIndex > this.lstDBData.length) {
                            this.EndIndex = this.lstDBData.length;
                        }
                        for (i = this.startIndex; i <= this.EndIndex - 1; i++) {
                            this.lstDBData[i].ALL = true;
                            this.lstDBData[i].MON = true;
                            this.lstDBData[i].TUE = true;
                            this.lstDBData[i].WED = true;
                            this.lstDBData[i].THU = true;
                            this.lstDBData[i].FRI = true;
                            this.lstDBData[i].SAT = true;
                            this.lstDBData[i].SUN = true;
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "checkAll");
                }
                return [2 /*return*/];
            });
        });
    };
    AllocateCartsComponent.prototype.unCheckAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                try {
                    if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                        if (this.EndIndex > this.lstgridfilterData.length) {
                            this.EndIndex = this.lstgridfilterData.length;
                        }
                        for (i = this.EndIndex - 1; i >= this.startIndex; i--) {
                            this.lstgridfilterData[i].ALL = false;
                            this.lstgridfilterData[i].MON = false;
                            this.lstgridfilterData[i].TUE = false;
                            this.lstgridfilterData[i].WED = false;
                            this.lstgridfilterData[i].THU = false;
                            this.lstgridfilterData[i].FRI = false;
                            this.lstgridfilterData[i].SAT = false;
                            this.lstgridfilterData[i].SUN = false;
                        }
                    }
                    else {
                        if (this.EndIndex > this.lstDBData.length) {
                            this.EndIndex = this.lstDBData.length;
                        }
                        for (i = this.EndIndex - 1; i >= this.startIndex; i--) {
                            this.lstDBData[i].ALL = false;
                            this.lstDBData[i].MON = false;
                            this.lstDBData[i].TUE = false;
                            this.lstDBData[i].WED = false;
                            this.lstDBData[i].THU = false;
                            this.lstDBData[i].FRI = false;
                            this.lstDBData[i].SAT = false;
                            this.lstDBData[i].SUN = false;
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "unCheckAll");
                }
                return [2 /*return*/];
            });
        });
    };
    AllocateCartsComponent.prototype.customSort = function (event, field) {
        var element = event;
        this.blnsortbycolumn = !this.blnsortbycolumn;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        var result = null;
        try {
            this.sortedcheckedrec = this.lstCheckedCartsData.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null)
                    result = -1;
                else if (a[element.field] != null && b[element.field] == null)
                    result = 1;
                else if (a[element.field] == null && b[element.field] == null)
                    result = 0;
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                    result = a[element.field].localeCompare(b[element.field]);
                else
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                return (element.order * result);
            });
            this.sorteduncheckedrec = this.lstUnCheckedCartsData.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null)
                    result = -1;
                else if (a[element.field] != null && b[element.field] == null)
                    result = 1;
                else if (a[element.field] == null && b[element.field] == null)
                    result = 0;
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                    result = a[element.field].localeCompare(b[element.field]);
                else
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                return (element.order * result);
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
        this.lstDBData = [];
        this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    };
    AllocateCartsComponent.prototype.ddlUsersIdChanged = function () {
        this.showGrid = false;
        this.showOnAllocateSelection = false;
        try {
            for (var i = 0; i <= this.lstUsers.length - 1; i++) {
                if (this.lstUsers[i].value == this.selectedDropDownUserId) {
                    this.selectedUserIdLblValue = this.lstUsers[i].label;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlUsersIdChanged");
        }
    };
    AllocateCartsComponent.prototype.ddlBUnitChanged = function () {
        this.showGrid = false;
        this.showOnAllocateSelection = false;
    };
    AllocateCartsComponent.prototype.ddlDisplayChanged = function () {
        this.showGrid = false;
        this.showOnAllocateSelection = false;
    };
    AllocateCartsComponent.prototype.filterdata = function (event) {
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    AllocateCartsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    AllocateCartsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstDBData = null;
        this.growlMessage = null;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], AllocateCartsComponent.prototype, "dataTableComponent", void 0);
    AllocateCartsComponent = __decorate([
        core_1.Component({
            templateUrl: 'cart-allocate-carts.component.html',
            providers: [datatableservice_1.datatableservice, cart_allocate_carts_component_service_1.CartCountAllocationServices, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            AtParConstants_1.AtParConstants,
            cart_allocate_carts_component_service_1.CartCountAllocationServices])
    ], AllocateCartsComponent);
    return AllocateCartsComponent;
}());
exports.AllocateCartsComponent = AllocateCartsComponent;
//# sourceMappingURL=cart-allocate-carts.component.js.map