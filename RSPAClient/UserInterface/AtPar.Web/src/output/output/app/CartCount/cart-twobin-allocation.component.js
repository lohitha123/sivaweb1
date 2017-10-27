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
var datatableservice_1 = require("./../components/datatable/datatableservice");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParEnums_3 = require("../Shared/AtParEnums");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var cart_twobin_allocation_service_1 = require("./cart-twobin-allocation.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var TwoBinAllocationComponent = (function () {
    function TwoBinAllocationComponent(httpService, spinnerService, commonService, cartTwoBinService, atParConstant) {
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.cartTwoBinService = cartTwoBinService;
        this.atParConstant = atParConstant;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.selectedOrgGroupId = "";
        this.selectedDropDownDisplay = "A";
        this.selectedBunit = "";
        this.selectedParlocation = "";
        this.orgGrpId = "";
        this.order = "";
        this.blnShowOrgGroupDD = false;
        this.showGrid = false;
        this.lstOrgGroups = [];
        this.lstFilteredBUnits = [];
        this.lstFilteredDisplay = [];
        this.blnsortbycolumn = true;
        this.custom = "custom";
        this.dataCheckedSorting = [];
        this.previousFiled = "";
    }
    TwoBinAllocationComponent.prototype.ngOnInit = function () {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.RecordsPerPage];
        this.dataCheckedSorting = new Array();
        this.dataUncheckedSorting = new Array();
        this.bindOrgGroups();
        this.bindDisplayItems();
    };
    TwoBinAllocationComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.populateBusinessUnits();
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
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
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
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
    TwoBinAllocationComponent.prototype.populateBusinessUnits = function () {
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
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_2.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.lstFilteredBUnits = [];
                                _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
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
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.showGrid = false;
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
    TwoBinAllocationComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showGrid = false;
                        this.growlMessage = [];
                        if (this.selectedOrgGroupId == "Select One") {
                            this.lstFilteredBUnits = [];
                            this.lstFilteredBUnits.push({ label: "Select BUnit", value: " " });
                            return [2 /*return*/];
                        }
                        this.selectedBunit = "";
                        this.lstDBData = new Array();
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.populateBusinessUnits()];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "ddlOrgGrpIdChanged");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TwoBinAllocationComponent.prototype.ddl_Changed = function () {
        this.showGrid = false;
    };
    TwoBinAllocationComponent.prototype.bindDisplayItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.lstFilteredDisplay.push({ label: "All", value: "A" });
                this.lstFilteredDisplay.push({ label: "Allocated", value: "L" });
                this.lstFilteredDisplay.push({ label: "Unallocated", value: "U" });
                return [2 /*return*/];
            });
        });
    };
    TwoBinAllocationComponent.prototype.getAllocateCarts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isChecked, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.showGrid = false;
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
                        if (this.selectedBunit == "" || this.selectedBunit == "Select BUnit" || this.selectedBunit == undefined) {
                            this.showGrid = false;
                            this.growlMessage = [];
                            this.growlMessage.push({
                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company"
                            });
                            this.spinnerService.stop();
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.cartTwoBinService.getCartDetails(this.selectedBunit, this.selectedParlocation).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataList.length > 0) {
                                            _this.showGrid = true;
                                            _this.lstDBData = [];
                                            _this.lstDBData = data.DataList;
                                            _this.BindDataGrid();
                                            _this.dataCheckedSorting = [];
                                            _this.dataUncheckedSorting = [];
                                            for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                                _this.lstDBData[i].Sno = i + 1;
                                                if (_this.lstDBData[i].TWO_BIN_ALLOCATION == 'TRUE') {
                                                    _this.lstDBData[i].checkvalue = true;
                                                    _this.lstDBData[i].TWO_BIN_ALLOCATION = 'Y';
                                                    _this.dataCheckedSorting.push(_this.lstDBData[i]);
                                                }
                                                else {
                                                    _this.lstDBData[i].checkvalue = false;
                                                    _this.lstDBData[i].TWO_BIN_ALLOCATION = 'N';
                                                    _this.dataUncheckedSorting.push(_this.lstDBData[i]);
                                                }
                                            }
                                        }
                                        else {
                                            _this.showGrid = false;
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
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
                        ex_4 = _a.sent();
                        this.showGrid = false;
                        this.clientErrorMsg(ex_4, "getAllocateCarts");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TwoBinAllocationComponent.prototype.selectedRow = function (ven, event) {
        try {
            if (event == true) {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].Sno == ven.Sno) {
                        this.lstDBData[i].CHK_VALUE = 1;
                        this.lstDBData[i].TWO_BIN_ALLOCATION = "Y";
                    }
                }
            }
            else {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].Sno == ven.Sno) {
                        this.lstDBData[i].CHK_VALUE = 0;
                        this.lstDBData[i].TWO_BIN_ALLOCATION = "N";
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    };
    TwoBinAllocationComponent.prototype.allocateTwoBinLocData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, i, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        if (this.selectedBunit == "" || this.selectedBunit == "Select BUnit" || this.selectedBunit == undefined) {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({
                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Business Unit/Company"
                            });
                            return [2 /*return*/];
                        }
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            if (this.lstDBData[i].TWO_BIN_ALLOCATION == 'Y') {
                                if (this.lstDBData[i].DEF_PERCENTAGE_VALUE === "" || this.lstDBData[i].DEF_PERCENTAGE_VALUE == null || this.lstDBData[i].DEF_PERCENTAGE_VALUE == undefined) {
                                    this.spinnerService.stop();
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Default percent values is mandatory when 2 Bin Location is checked." });
                                    return [2 /*return*/];
                                }
                            }
                        }
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            if (this.lstDBData[i].checkvalue) {
                                this.lstDBData[i].CHK_ALLOCATED = 1;
                                this.lstDBData[i].TWO_BIN_ALLOCATION = "Y";
                            }
                            else {
                                this.lstDBData[i].CHK_ALLOCATED = 0;
                                this.lstDBData[i].TWO_BIN_ALLOCATION = "N";
                                this.lstDBData[i].DEF_PERCENTAGE_VALUE = "";
                            }
                        }
                        return [4 /*yield*/, this.cartTwoBinService.TwoBinSaving(this.lstDBMainDetails, this.selectedBunit).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                        _this.selectedBunit = "";
                                        _this.showGrid = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "allocateTwoBinLocData");
                        this.showGrid = false;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TwoBinAllocationComponent.prototype.BindDataGrid = function () {
        var _this = this;
        var lstDBDataList;
        this.lstDBMainDetails = [];
        try {
            for (var k = 0; k < this.lstDBData.length; k++) {
                this.lstDBMainDetails.push(this.lstDBData[k]);
            }
            if (this.selectedDropDownDisplay === "L") {
                this.showGrid = true;
                this.lstDBData = this.lstDBData.filter(function (x) { return x.TWO_BIN_ALLOCATION == 'TRUE'; });
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    return;
                }
            }
            else if (this.selectedDropDownDisplay === "U") {
                this.showGrid = false;
                this.lstDBData = this.lstDBData.filter(function (x) { return x.TWO_BIN_ALLOCATION == 'FALSE'; });
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    return;
                }
            }
            else {
                this.showGrid = false;
            }
            if (this.selectedParlocation != undefined && this.selectedParlocation != null && this.selectedParlocation.trim().length != 0) {
                this.lstDBData = this.lstDBData.filter(function (x) { return x.CART_ID.indexOf(_this.selectedParlocation.toUpperCase()) !== -1; });
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    return;
                }
            }
            this.showGrid = true;
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    };
    TwoBinAllocationComponent.prototype.customSort = function (event) {
        var element = event;
        this.lstDBData = [];
        try {
            if (this.previousFiled == element.field) {
                this.blnsortbycolumn = !this.blnsortbycolumn;
            }
            else {
                this.blnsortbycolumn = false;
            }
            this.previousFiled = element.field;
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
            this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            if (element.field != "DEF_PERCENTAGE_VALUE") {
                this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                    if (a[element.field] < b[element.field])
                        return -1;
                    if (a[element.field] > b[element.field])
                        return 1;
                    return 0;
                });
                if (this.blnsortbycolumn == false) {
                    this.sorteduncheckedrec = this.sorteduncheckedrec.reverse();
                }
            }
            else {
                this.sorteduncheckedrec = this.dataUncheckedSorting;
            }
            if (this.blnsortbycolumn == false) {
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec);
            }
            else {
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
            }
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    };
    TwoBinAllocationComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    TwoBinAllocationComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstFilteredBUnits = null;
        this.lstOrgGroups = null;
        this.lstFilteredDisplay = null;
        this.lstFilteredBUnits = null;
        this.lstDBData = null;
        this.orgGroupData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        this.lstDBMainDetails = [];
        this.orgGroupData = null;
    };
    TwoBinAllocationComponent = __decorate([
        core_1.Component({
            templateUrl: 'cart-twobin-allocation.component.html',
            providers: [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, cart_twobin_allocation_service_1.CartTwoBinService, HttpService_1.HttpService]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            cart_twobin_allocation_service_1.CartTwoBinService,
            AtParConstants_1.AtParConstants])
    ], TwoBinAllocationComponent);
    return TwoBinAllocationComponent;
}());
exports.TwoBinAllocationComponent = TwoBinAllocationComponent;
//# sourceMappingURL=cart-twobin-allocation.component.js.map