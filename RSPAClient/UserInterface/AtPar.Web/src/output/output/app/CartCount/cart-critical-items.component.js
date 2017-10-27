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
var http_1 = require("@angular/http");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParEnums_2 = require("../Shared/AtParEnums");
var linq_es5_1 = require("linq-es5");
var AtParEnums_3 = require("../Shared/AtParEnums");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var cartcount_service_1 = require("./cartcount.service");
var datatable_1 = require("../components/datatable/datatable");
var AtParConstants_1 = require("../Shared/AtParConstants");
var CriticalItemsComponent = (function () {
    function CriticalItemsComponent(httpservice, _http, spinnerService, commonService, CartCommonService, atParConstant) {
        this.httpservice = httpservice;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.CartCommonService = CartCommonService;
        this.atParConstant = atParConstant;
        this.table = true;
        this.form = false;
        this.dropdownData = [];
        this.bUnitdropdownData = [];
        this.selectedOrgGroupID = "";
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.errorMessage = "";
        this.selectedOrgGrpID = "";
        this.blnStatusMsg = false;
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.selectedOrgGroupId = "";
        this.selectedDropDownUserId = "";
        this.selectedBunit = "";
        this.selectedDescription = "";
        this.lstOrgGroups = [];
        this.lstBUnits = [];
        this.lstFilteredBUnits = [];
        this.lstFilteredCartIDs = [];
        this.lstUsers = [];
        this.content = false;
        this.ddlOrgGrpID = false;
        this.lblOrgGrpID = false;
        this.lstBUnitsData = [];
        this.FilterCartsId = new Array();
        this.selectedDropDownBunitID = "";
        this.selectedDropDownCartID = "";
        this.blnSortByColumn = true;
        this.custom = "custom";
        this.preField = "";
        this.dataCheckedSorting = [];
        this.grdHide = false;
        this.strBUnit = "";
        this.drpCartItems = [];
        this.buttonID = "";
    }
    CriticalItemsComponent.prototype.ngOnInit = function () {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedCarts = new Array();
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.RecordsPerPage];
        this.bindBusinessUnit();
    };
    CriticalItemsComponent.prototype.bindBusinessUnit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpservice.handleError).then(function (res) { return res.json(); }).then(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.spinnerService.stop();
                                        _this.lstOrgGroups = [];
                                        _this.orgGroupData = response.DataList;
                                        _this.blnStatusMsg = false;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.blnShowOrgGroupDD = false;
                                            _this.orgGrpId1 = response.DataList[0].ORG_GROUP_ID + " - " + response.DataList[0].ORG_GROUP_NAME;
                                            _this.orgGrpId = response.DataList[0].ORG_GROUP_ID;
                                            _this.populateBusinessunits();
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else if (response.DataList.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.blnShowOrgGroupLabel = false;
                                            _this.lstFilteredCartIDs = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstFilteredCartIDs.push({
                                                label: "Select Cart ID/Par Location",
                                                value: ""
                                            });
                                            _this.lstFilteredBUnits.push({
                                                label: "Select Company",
                                                value: ""
                                            });
                                            _this.lstOrgGroups.push({
                                                label: "Select One",
                                                value: ""
                                            });
                                            for (var i = 0; i < response.DataList.length; i++) {
                                                if (response.DataList[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: response.DataList[i].ORG_GROUP_ID + " - " + response.DataList[i].ORG_GROUP_NAME, value: response.DataList[i].ORG_GROUP_ID });
                                                }
                                            }
                                            // this.growlMessage = [];
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "bindBusinessUnit");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CriticalItemsComponent.prototype.ddlOrgGrpId_SelectChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        this.grdHide = false;
                        if (!(this.blnShowOrgGroupLabel == true)) return [3 /*break*/, 1];
                        this.orgGroupIDForDBUpdate = "";
                        this.orgGroupIDForDBUpdate = this.orgGrpId;
                        this.lstFilteredBUnits = [];
                        this.lstFilteredCartIDs = [];
                        this.lstFilteredCartIDs.push({
                            label: "Select Cart ID/Par Location",
                            value: ""
                        });
                        this.lstFilteredBUnits.push({
                            label: "Select Company",
                            value: ""
                        });
                        return [3 /*break*/, 8];
                    case 1:
                        if (!(this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "")) return [3 /*break*/, 2];
                        this.grdHide = false;
                        this.lstFilteredBUnits = [];
                        this.lstFilteredCartIDs = [];
                        this.lstFilteredCartIDs.push({
                            label: "Select Cart ID/Par Location",
                            value: ""
                        });
                        this.lstFilteredBUnits.push({
                            label: "Select Company",
                            value: ""
                        });
                        this.selectedOrgGroupId = "";
                        this.orgGroupIDForDBUpdate = "";
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        return [3 /*break*/, 8];
                    case 2:
                        this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, , 8]);
                        this.selectedBunit = "";
                        this.selectedDropDownCartID = "";
                        this.lstFilteredBUnits = [];
                        this.lstFilteredCartIDs = [];
                        this.lstFilteredCartIDs.push({
                            label: "Select Cart ID/Par Location",
                            value: ""
                        });
                        this.lstFilteredBUnits.push({
                            label: "Select Company",
                            value: ""
                        });
                        if (!(this.orgGroupIDForDBUpdate != null || this.orgGroupIDForDBUpdate != undefined || this.orgGroupIDForDBUpdate != "")) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_2.BusinessType.Inventory).
                                catch(this.httpservice.handleError).then(function (res) { return res.json(); }).then(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.lstBUnits = response.DataList;
                                        if (response.DataList.length > 0) {
                                            for (var i = 0; i < response.DataList.length; i++) {
                                                _this.lstFilteredBUnits.push({ label: response.DataList[i], value: response.DataList[i] });
                                            }
                                            break;
                                        }
                                        else {
                                            _this.grdHide = false;
                                            _this.spinnerService.stop();
                                            _this.lstFilteredBUnits = [];
                                            _this.lstFilteredBUnits.push({
                                                label: "Select Company",
                                                value: ""
                                            });
                                            _this.lstFilteredCartIDs = [];
                                            _this.lstFilteredCartIDs.push({
                                                label: "Select Cart ID/Par Location",
                                                value: ""
                                            });
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.lstFilteredBUnits = [];
                                        _this.lstFilteredBUnits.push({
                                            label: "Select Company",
                                            value: ""
                                        });
                                        _this.lstFilteredCartIDs = [];
                                        _this.lstFilteredCartIDs.push({
                                            label: "Select Cart ID/Par Location",
                                            value: ""
                                        });
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.lstFilteredBUnits = [];
                                        _this.lstFilteredBUnits.push({
                                            label: "Select Company",
                                            value: ""
                                        });
                                        _this.lstFilteredCartIDs = [];
                                        _this.lstFilteredCartIDs.push({
                                            label: "Select Cart ID/Par Location",
                                            value: ""
                                        });
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.lstFilteredBUnits = [];
                                        _this.lstFilteredBUnits.push({
                                            label: "Select Company",
                                            value: ""
                                        });
                                        _this.lstFilteredCartIDs = [];
                                        _this.lstFilteredCartIDs.push({
                                            label: "Select Cart ID/Par Location",
                                            value: ""
                                        });
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        this.lstFilteredBUnits = [];
                        this.lstFilteredCartIDs = [];
                        this.lstFilteredCartIDs.push({
                            label: "Select Cart ID/Par Location",
                            value: ""
                        });
                        this.lstFilteredBUnits.push({
                            label: "Select Company",
                            value: ""
                        });
                        this.grdHide = false;
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select valid Org GroupID' });
                        this.spinnerService.stop();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "ddlOrgGrpId_SelectChanged");
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    CriticalItemsComponent.prototype.ddlCart_SelectChanged = function () {
        this.grdHide = false;
    };
    CriticalItemsComponent.prototype.populateBusinessunits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGrpId, AtParEnums_2.BusinessType.Inventory).
                                catch(this.httpservice.handleError).then(function (res) { return res.json(); }).then(function (response) {
                                _this.lstFilteredBUnits = [];
                                _this.lstFilteredCartIDs = [];
                                _this.lstFilteredCartIDs.push({
                                    label: "Select Cart ID/Par Location",
                                    value: ""
                                });
                                _this.lstFilteredBUnits.push({
                                    label: "Select Company",
                                    value: ""
                                });
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        _this.lstFilteredBUnits = [];
                                        _this.lstFilteredCartIDs = [];
                                        _this.lstFilteredCartIDs.push({
                                            label: "Select Cart ID/Par Location",
                                            value: ""
                                        });
                                        _this.lstFilteredBUnits.push({
                                            label: "Select Company",
                                            value: ""
                                        });
                                        if (response.DataList.length > 0) {
                                            for (var b = 0; b < response.DataList.length; b++) {
                                                _this.lstFilteredBUnits.push({ label: response.DataList[b], value: response.DataList[b] });
                                            }
                                        }
                                        else {
                                            _this.grdHide = false;
                                            _this.spinnerService.stop();
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "populateBusinessunits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CriticalItemsComponent.prototype.filterBusinessUnits = function (query, businessunits) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < businessunits.length; i++) {
                var Bunitvalue = businessunits[i];
                filtered.push(Bunitvalue);
            }
        }
        else {
            if (query.length >= 3) {
                for (var i = 0; i < businessunits.length; i++) {
                    var Bunitvalue = businessunits[i];
                    if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(Bunitvalue);
                    }
                }
            }
        }
        return filtered;
    };
    CriticalItemsComponent.prototype.ddlBUnit_SelectChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.grdHide = false;
                        this.selectedDropDownCartID = "";
                        this.spinnerService.start();
                        if (!(this.selectedBunit == "")) return [3 /*break*/, 1];
                        this.lstFilteredCartIDs = [];
                        this.lstFilteredCartIDs.push({
                            label: "Select Cart ID/Par Location",
                            value: ""
                        });
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.CartCommonService.GetCartBunitsInfo(this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.OrgGrpID], this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.UserID].toString(), this.selectedBunit).
                                catch(this.httpservice.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstFilteredCartIDs = [];
                                        _this.spinnerService.stop();
                                        _this.lstFilteredCartIDs.push({
                                            label: "Select Cart ID/Par Location",
                                            value: ""
                                        });
                                        if (data.DataList.length > 0 && data.DataList.length != null) {
                                            _this.growlMessage = [];
                                            if (_this.selectedBunit != "") {
                                                var bUnits = data.DataList;
                                                var lstdata = linq_es5_1.asEnumerable(bUnits).Where(function (x) { return x.BUSINESS_UNIT == _this.selectedBunit; }).ToArray();
                                                for (var bu = 0; bu < lstdata.length; bu++) {
                                                    _this.lstFilteredCartIDs.push({
                                                        label: lstdata[bu].CART_ID + " - " + lstdata[bu].DESCR,
                                                        value: lstdata[bu].CART_ID
                                                    });
                                                }
                                            }
                                            break;
                                        }
                                        else {
                                            _this.grdHide = false;
                                            _this.spinnerService.stop();
                                            _this.lstFilteredCartIDs = [];
                                            _this.lstFilteredCartIDs.push({
                                                label: "Select Cart ID/Par Location",
                                                value: ""
                                            });
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.lstFilteredCartIDs = [];
                                        _this.lstFilteredCartIDs.push({
                                            label: "Select Cart ID/Par Location",
                                            value: ""
                                        });
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.lstFilteredCartIDs = [];
                                        _this.lstFilteredCartIDs.push({
                                            label: "Select Cart ID/Par Location",
                                            value: ""
                                        });
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.lstFilteredCartIDs = [];
                                        _this.lstFilteredCartIDs.push({
                                            label: "Select Cart ID/Par Location",
                                            value: ""
                                        });
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.grdHide = false;
                        this.lstFilteredCartIDs = [];
                        this.lstFilteredCartIDs.push({
                            label: "Select Cart ID/Par Location",
                            value: ""
                        });
                        this.clientErrorMsg(ex_4, "ddlBUnit_SelectChanged");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CriticalItemsComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstCheckedCarts = [];
                        this.lstgridfilterData = [];
                        this.errorMessage = "";
                        if (this.grdHide == true) {
                            this.dataTableComponent.reset();
                        }
                        if (!(this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == undefined)) return [3 /*break*/, 1];
                        this.grdHide = false;
                        this.growlMessage = [];
                        this.errorMessage = "Please select valid orgGroup ID";
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errorMessage });
                        this.content = false;
                        return [3 /*break*/, 7];
                    case 1:
                        if (!(this.selectedBunit == "")) return [3 /*break*/, 2];
                        this.grdHide = false;
                        this.growlMessage = [];
                        this.errorMessage = "Please Select Business Unit / Company";
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errorMessage });
                        this.content = false;
                        return [3 /*break*/, 7];
                    case 2:
                        if (!(this.selectedDropDownCartID == "")) return [3 /*break*/, 3];
                        this.grdHide = false;
                        this.growlMessage = [];
                        this.errorMessage = "Please select valid Location";
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errorMessage });
                        this.content = false;
                        return [3 /*break*/, 7];
                    case 3:
                        this.growlMessage = [];
                        this.content = true;
                        this.BindGrid = [];
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        this.spinnerService.start();
                        this.grdHide = false;
                        return [4 /*yield*/, this.CartCommonService.GetCartItemInfo(this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.OrgGrpID], this.selectedBunit, this.selectedDropDownCartID, this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.UserID].toString(), this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.ProfileID].toString()).
                                catch(this.httpservice.handleError).then(function (res) { return res.json(); }).then(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.growlMessage = [];
                                            _this.spinnerService.stop();
                                            _this.BindGrid = [];
                                            _this.grdHide = true;
                                            var bindData = response.DataDictionary["listDetails"];
                                            var lstHeaders = response.DataDictionary["listHeaders"];
                                            for (var i = 0; i <= bindData.length - 1; i++) {
                                                bindData[i].OPTIMAL_QTY = +bindData[i].OPTIMAL_QTY;
                                                if (bindData[i].ChkValue == "Y") {
                                                    bindData[i].checkvalue = true;
                                                }
                                                else {
                                                    bindData[i].checkvalue = false;
                                                }
                                            }
                                            var griddata = bindData;
                                            if (lstHeaders.length > 0) {
                                                if (griddata.length > 0) {
                                                    for (var i = 0; i < griddata.length; i++) {
                                                        switch (griddata[i].CART_REPLEN_OPT.toString()) {
                                                            case "01":
                                                            case "1":
                                                                griddata[i].CART_REPLEN_OPT = "Stock";
                                                                break;
                                                            case "02":
                                                            case "2":
                                                                griddata[i].CART_REPLEN_OPT = "Non Stock";
                                                                break;
                                                            case "03":
                                                            case "3":
                                                                griddata[i].CART_REPLEN_OPT = "Stockless";
                                                                break;
                                                            case "04":
                                                            case "4":
                                                                griddata[i].CART_REPLEN_OPT = "Consignment";
                                                                break;
                                                            case "05":
                                                            case "5":
                                                                griddata[i].CART_REPLEN_OPT = "Not Replenished";
                                                                break;
                                                        }
                                                    }
                                                }
                                                _this.BindGrid = griddata;
                                                var orderBydData = linq_es5_1.asEnumerable(_this.BindGrid).OrderBy(function (x) { return x.checkvalue == false && x.INV_ITEM_ID; }).ToArray();
                                                _this.BindGrid = [];
                                                _this.BindGrid = orderBydData;
                                                _this.bindDataSortedGrid();
                                                _this.grdHide = true;
                                                break;
                                            }
                                        }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_5 = _a.sent();
                        this.grdHide = false;
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_5, "btnGo_Click");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CriticalItemsComponent.prototype.bindDataSortedGrid = function () {
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        try {
            for (var i = 0; i <= this.BindGrid.length - 1; i++) {
                if (this.BindGrid[i].ChkValue == "Y") {
                    this.dataCheckedSorting.push(this.BindGrid[i]);
                }
                else {
                    this.dataUncheckedSorting.push(this.BindGrid[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindDataSortedGrid");
        }
    };
    //Sorting for Gridview
    CriticalItemsComponent.prototype.customSort1 = function (event, elementType) {
        if (elementType === void 0) { elementType = ""; }
        var element = event;
        this.BindGrid = [];
        if (this.preField == element.field) {
            this.blnSortByColumn = !this.blnSortByColumn;
            // element.order = !element.order;
        }
        else {
            this.blnSortByColumn = true;
        }
        this.preField = element.field;
        this.sortedCheckedrec = [];
        this.sortedUnCheckedrec = [];
        try {
            if (elementType == AtParEnums_3.ElementType[AtParEnums_3.ElementType.FLOAT].toString()) {
                this.sortedCheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                    if (parseFloat(a[element.field]) < parseFloat(b[element.field]))
                        return -1;
                    if (parseFloat(a[element.field]) > parseFloat(b[element.field]))
                        return 1;
                    return 0;
                });
                this.sortedUnCheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                    if (parseFloat(a[element.field]) < parseFloat(b[element.field]))
                        return -1;
                    if (parseFloat(a[element.field]) > parseFloat(b[element.field]))
                        return 1;
                    return 0;
                });
            }
            else {
                this.sortedCheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                    if (a[element.field] < b[element.field])
                        return -1;
                    if (a[element.field] > b[element.field])
                        return 1;
                    return 0;
                });
                this.sortedUnCheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                    if (a[element.field] < b[element.field])
                        return -1;
                    if (a[element.field] > b[element.field])
                        return 1;
                    return 0;
                });
            }
            if (this.blnSortByColumn == false) {
                this.BindGrid = [];
                this.BindGrid = this.sortedCheckedrec.reverse().concat(this.sortedUnCheckedrec.reverse());
            }
            else {
                this.BindGrid = [];
                this.BindGrid = this.sortedCheckedrec.concat(this.sortedUnCheckedrec);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
        this.sortedCheckedrec = [];
        this.sortedUnCheckedrec = [];
    };
    CriticalItemsComponent.prototype.customSort = function (event, field) {
        var element = event;
        if (this.preField == element.field) {
            if (element.order == 1) {
                element.order = -1;
            }
            else {
                element.order = 1;
            }
            // element.order = !element.order;
        }
        else {
            element.order = 1;
        }
        this.preField = element.field;
        this.sortedCheckedrec = [];
        this.sortedUnCheckedrec = [];
        var result = null;
        var order;
        try {
            this.sortedCheckedrec = this.dataCheckedSorting.sort(function (a, b) {
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
            this.sortedUnCheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
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
        this.BindGrid = this.sortedCheckedrec.concat(this.sortedUnCheckedrec);
        this.sortedCheckedrec = [];
        this.sortedUnCheckedrec = [];
    };
    //Check All for Menu Datatable
    CriticalItemsComponent.prototype.checkAll = function () {
        this.lstCheckedCarts = [];
        try {
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length != 0) {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].ChkValue = "Y";
                    this.lstCheckedCarts.push(this.lstgridfilterData[i]);
                }
            }
            else {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.BindGrid.length) {
                    this.EndIndex = this.BindGrid.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.BindGrid[i].checkvalue = true;
                    this.BindGrid[i].ChkValue = "Y";
                    this.lstCheckedCarts.push(this.BindGrid[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    //UnCheck All for Menu Datatable
    CriticalItemsComponent.prototype.unCheckAll = function () {
        this.lstCheckedCarts = [];
        try {
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length != 0) {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].ChkValue = "N";
                    this.lstCheckedCarts.push(this.lstgridfilterData[i]);
                }
            }
            else {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.BindGrid.length) {
                    this.EndIndex = this.BindGrid.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.BindGrid[i].checkvalue = false;
                    this.BindGrid[i].ChkValue = "N";
                    this.lstCheckedCarts.push(this.BindGrid[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    //Save Click to Save data to database
    CriticalItemsComponent.prototype.btnSubmit_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lstdata, i, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lstdata = this.BindGrid;
                        if (lstdata.length > 0) {
                            for (i = 0; i < lstdata.length; i++) {
                                if (lstdata[i].checkvalue == true) {
                                    lstdata[i].ChkValue = "Y";
                                }
                                else {
                                    lstdata[i].ChkValue = "N";
                                }
                            }
                            this.lstCheckedCarts = lstdata;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.CartCommonService.AllocateCartItemInfo(this.lstCheckedCarts, this.selectedBunit, this.selectedDropDownCartID, this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.UserID].toString()).catch(this.httpservice.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.spinnerService.stop();
                                            _this.selectedDropDownCartID = "";
                                            // this.selectedBunit = "";
                                            //if (this.blnShowOrgGroupLabel == true) {
                                            //    this.selectedOrgGroupId = "";
                                            //}
                                            //else {
                                            //    this.orgGroupIDForDBUpdate = "";
                                            //    this.selectedBunit = 'Select Company';
                                            //    this.selectedOrgGroupId = "";
                                            //}
                                            _this.lstgridfilterData = [];
                                            _this.BindGrid = [];
                                            _this.grdHide = false;
                                            _this.lstCheckedCarts = [];
                                            _this.selectedDropDownCartID = "";
                                            _this.selectedBunit = "";
                                            // this.lstgridfilterData = [];
                                            //// this.lstOrgGroups = [];
                                            // this.bindBusinessUnit();
                                            // this.lstFilteredBUnits = [];
                                            // this.lstFilteredBUnits.push({
                                            //     label: "Select Company",
                                            //     value: ""
                                            // })
                                            _this.lstFilteredCartIDs = [];
                                            _this.lstFilteredCartIDs.push({
                                                label: "Select Cart ID/Par Location",
                                                value: ""
                                            });
                                            _this.growlMessage = [];
                                            data.StatusMessage = "Updated Successfully";
                                            _this.growlMessage.push({
                                                severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully"
                                            });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.grdHide = true;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.grdHide = true;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.grdHide = true;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "btnSubmit_Click");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CriticalItemsComponent.prototype.close = function () {
        this.table = true;
        this.form = false;
    };
    CriticalItemsComponent.prototype.myfilterdata = function (event) {
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    CriticalItemsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], CriticalItemsComponent.prototype, "dataTableComponent", void 0);
    CriticalItemsComponent = __decorate([
        core_1.Component({
            templateUrl: 'cart-critical-items.component.html',
            providers: [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, cartcount_service_1.CriticalCommonService]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http, event_spinner_service_1.SpinnerService, atpar_common_service_1.AtParCommonService, cartcount_service_1.CriticalCommonService, AtParConstants_1.AtParConstants])
    ], CriticalItemsComponent);
    return CriticalItemsComponent;
}());
exports.CriticalItemsComponent = CriticalItemsComponent;
//# sourceMappingURL=cart-critical-items.component.js.map