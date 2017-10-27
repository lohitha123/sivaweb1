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
var atpar_manage_par_location_service_1 = require("./atpar-manage-par-location.service");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var api_1 = require("../components/common/api");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var ManageParLocationComponent = (function () {
    function ManageParLocationComponent(spinnerService, atParCommonService, atParManageParLocServices, httpService, confirmationService, atParConstant) {
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.atParManageParLocServices = atParManageParLocServices;
        this.httpService = httpService;
        this.confirmationService = confirmationService;
        this.atParConstant = atParConstant;
        this.growlMessage = [];
        this.lstOrgGroups = [];
        this.lstOrgIds = [];
        this.page = true;
        this.pop = false;
        this.table = false;
        this.showOrgDropdown = false;
        this.DEPT_ID = '';
        this.DEPT_NAME = '';
        this.PAR_LOC_ID = '';
        this.PAR_LOC_NAME = '';
        this.ITEM_ID = '';
        this.ITEM_DESC = '';
        this.PRICE_FROM = '';
        this.PRICE_TO = '';
        this.lstParLocations = [];
        this.lstAddParLocations = [];
        this.lstAllocLocations = [];
        this.lstInsertParItems = [];
        this.lstItems = [];
        this.filteredLstItems = [];
        this.lstSubItems = [];
        this.showTrSubItem = false;
        this.lstOrderingTypes = [];
        this.lstReplishmentTypes = [];
        this.lstFKFlags = [];
        this.lstRequisitionTypes = [];
        this.lstInvBunits = [];
        this.lstCostCenters = [];
        this.intInvBcnt = 0;
        this.intCCcnt = 0;
        this.showSaveBtn = true;
        this.disableSaveBtn = true;
        this.showValidate = true;
        this.isFOQMandatory = false;
        this.isMaxMandatory = false;
        this.lstGridFilterData = [];
        this.lstGridParFilterData = [];
        this.loading = false;
        this.breadCrumbMenu = new routepath_1.Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    ManageParLocationComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.intAppId = parseInt(this.appId);
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        return [4 /*yield*/, this.bindOrgGroupDropdown()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageParLocationComponent.prototype.bindOrgGroupDropdown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getOrgDetails(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstOrgIds = [];
                                _this.lstOrgGroups = [];
                                _this.lstOrgIds.push({ label: 'Select One', value: '' });
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        if (res.DataList.length > 1) {
                                            _this.spinnerService.stop();
                                            _this.showOrgDropdown = true;
                                            _this.lstOrgGroups.push({ label: 'Select One', value: 'Select One' });
                                            for (var i = 0; i < res.DataList.length; i++) {
                                                if (res.DataList[i].ORG_GROUP_ID != 'All') {
                                                    _this.lstOrgGroups.push({ label: (res.DataList[i].ORG_GROUP_ID + ' - ' + res.DataList[i].ORG_GROUP_NAME), value: res.DataList[i].ORG_GROUP_ID });
                                                }
                                            }
                                        }
                                        else {
                                            _this.showOrgDropdown = false;
                                            _this.ORG_GROUP_ID = res.DataList[0].ORG_GROUP_ID + ' - ' + res.DataList[0].ORG_GROUP_NAME;
                                            _this.atParCommonService.getOrgIds(_this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                                .catch().then(function (result) {
                                                _this.spinnerService.stop();
                                                var res = result.json();
                                                switch (res.StatType) {
                                                    case AtParEnums_2.StatusType.Success: {
                                                        for (var i = 0; i < res.DataList.length; i++) {
                                                            _this.lstOrgIds.push({ label: res.DataList[i].toString(), value: res.DataList[i].toString() });
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
                                            });
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
                        this.clientErrorMsg(ex_1, "bindOrgGroupDropdown");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageParLocationComponent.prototype.ddlOrgGroup_SelectedIndexChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstParLocations = [];
                        if (!(this.ORG_GROUP_ID != undefined && this.ORG_GROUP_ID != 'Select One')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.bindOrgIds()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.lstOrgIds = [];
                        this.lstOrgIds.push({ label: 'Select One', value: '' });
                        _a.label = 3;
                    case 3:
                        this.ORG_ID = 'Select One';
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageParLocationComponent.prototype.ddlBUnit_SelectedIndexChanged = function () {
        this.lstParLocations = [];
    };
    ManageParLocationComponent.prototype.bindOrgIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getOrgBusinessUnits(this.ORG_GROUP_ID, AtParEnums_1.BusinessType.Inventory.toString())
                                .catch(this.httpService.handleError).then(function (result) {
                                _this.spinnerService.stop();
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstOrgIds = [];
                                _this.lstOrgIds.push({ label: 'Select One', value: '' });
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i < res.DataList.length; i++) {
                                            _this.lstOrgIds.push({ label: res.DataList[i].toString(), value: res.DataList[i].toString() });
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
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "bindOrgIds");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageParLocationComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var orgGroupID, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.growlMessage = [];
                        this.lstAddParLocations = [];
                        this.selectedItem = '';
                        this.selectedItemID = '';
                        this.validateInput();
                        if (!(this.returnType == AtParEnums_2.StatusType.Success)) return [3 /*break*/, 2];
                        orgGroupID = '';
                        if (this.showOrgDropdown) {
                            orgGroupID = this.ORG_GROUP_ID;
                        }
                        else {
                            orgGroupID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParManageParLocServices.getMultipleLocations(this.ORG_ID, this.PAR_LOC_ID, this.PAR_LOC_NAME, orgGroupID, this.DEPT_ID, this.DEPT_NAME, this.ITEM_ID, this.ITEM_DESC, this.PRICE_FROM, this.PRICE_TO, this.intAppId)
                                .catch(this.httpService.handleError).then(function (result) {
                                _this.spinnerService.stop();
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstParLocations = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstParLocations = res.DataList;
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
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "btnGo_Click");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageParLocationComponent.prototype.filterItemID = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query_1;
            return __generator(this, function (_a) {
                try {
                    query_1 = event.query.toUpperCase();
                    this.atParCommonService.getItems('', this.ORG_ID, this.intAppId)
                        .catch(this.httpService.handleError).then(function (result) {
                        _this.spinnerService.stop();
                        var res = result.json();
                        _this.growlMessage = [];
                        _this.lstItems = [];
                        switch (res.StatType) {
                            case AtParEnums_2.StatusType.Success: {
                                _this.lstItems = res.DataList;
                                if (query_1 == '%') {
                                    _this.filteredLstItems = _this.lstItems;
                                }
                                else {
                                    _this.filteredLstItems = _this.lstItems.filter(function (x) { return (x.ITEM_ID.toUpperCase().startsWith(query_1) ||
                                        x.ITEM_ID.toUpperCase().endsWith(query_1) || x.ITEM_ID.toUpperCase() == query_1 ||
                                        x.SHORT_DESCR.toUpperCase().startsWith(query_1) || x.SHORT_DESCR.toUpperCase().endsWith(query_1) ||
                                        x.SHORT_DESCR.toUpperCase() == query_1) && x.STATUS == 0; });
                                }
                                for (var i = 0; i < _this.filteredLstItems.length; i++) {
                                    _this.filteredLstItems[i].FILTERED_STRING = _this.filteredLstItems[i].ITEM_ID + ' - ' + _this.filteredLstItems[i].SHORT_DESCR;
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
                    });
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "filterItemID");
                }
                return [2 /*return*/];
            });
        });
    };
    ManageParLocationComponent.prototype.myfirstfilterdata = function (event) {
        this.lstGridFilterData = new Array();
        this.lstGridFilterData = event;
    };
    ManageParLocationComponent.prototype.chkAll_Click = function () {
        try {
            this.spinnerService.start();
            var list = [];
            if (this.lstGridFilterData == undefined || this.lstGridFilterData == null || this.lstGridFilterData.length == 0) {
                for (var i = 0; i < this.lstParLocations.length; i++) {
                    this.lstParLocations[i].SELECTED_LOCATION = true;
                    list.push(this.lstParLocations[i]);
                }
            }
            else {
                for (var i = 0; i < this.lstGridFilterData.length; i++) {
                    this.lstGridFilterData[i].SELECTED_LOCATION = true;
                    list.push(this.lstGridFilterData[i]);
                }
            }
            this.lstAddParLocations = list;
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "chkAll_Click");
        }
    };
    ManageParLocationComponent.prototype.chkNone_Click = function () {
        try {
            this.spinnerService.start();
            if (this.lstGridFilterData == undefined || this.lstGridFilterData != null || this.lstGridFilterData.length == 0) {
                for (var i = 0; i < this.lstParLocations.length; i++) {
                    this.lstParLocations[i].SELECTED_LOCATION = false;
                }
            }
            else {
                for (var i = 0; i < this.lstGridFilterData.length; i++) {
                    this.lstGridFilterData[i].SELECTED_LOCATION = false;
                }
            }
            this.lstAddParLocations = [];
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "chkNone_Click");
        }
    };
    ManageParLocationComponent.prototype.switch_Click = function (e, objParLoc) {
        if (e) {
            objParLoc.SELECTED_LOCATION = true;
            this.lstAddParLocations.push(objParLoc);
        }
        else {
            objParLoc.SELECTED_LOCATION = false;
            for (var i = 0; i < this.lstAddParLocations.length; i++) {
                if (this.lstAddParLocations[i].PAR_LOC_ID === objParLoc.PAR_LOC_ID) {
                    var index = this.lstAddParLocations.indexOf(this.lstAddParLocations[i], 0);
                    this.lstAddParLocations.splice(index, 1);
                }
            }
        }
    };
    ManageParLocationComponent.prototype.btnAdd_Click = function (SelType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProfileParamValue()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.showItemsPopUp(SelType)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageParLocationComponent.prototype.btnUpdate_Click = function (SelType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProfileParamValue()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.showItemsPopUp(SelType)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageParLocationComponent.prototype.getProfileParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], this.intAppId, 'MAX_ALLOW_QTY')
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        if (res.DataVariable != null) {
                                            sessionStorage.setItem("strMaxAllowQty", res.DataVariable.toString());
                                        }
                                        else {
                                            sessionStorage.setItem("strMaxAllowQty", "0");
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
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "getProfileParamValue");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageParLocationComponent.prototype.showItemsPopUp = function (SelType) {
        return __awaiter(this, void 0, void 0, function () {
            var i, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        this.selectType = SelType;
                        this.subItemID = '';
                        this.selectedItemID = '';
                        if (SelType == 'U') {
                            if (this.selectedItem == undefined || this.selectedItem == null || this.selectedItem == '') {
                                this.selectedItemID = 'All';
                            }
                            else {
                                if (this.selectedItem.ITEM_ID != undefined) {
                                    this.selectedItemID = this.selectedItem.ITEM_ID;
                                }
                                else {
                                    this.selectedItemID = this.selectedItem;
                                }
                            }
                        }
                        else {
                            if (this.selectedItem != undefined) {
                                if (this.selectedItem.ITEM_ID != undefined) {
                                    this.selectedItemID = this.selectedItem.ITEM_ID;
                                }
                                else {
                                    this.selectedItemID = this.selectedItem;
                                }
                            }
                        }
                        if (!(this.selectedItemID == undefined || this.selectedItemID == '')) return [3 /*break*/, 1];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Item ID' });
                        return [2 /*return*/];
                    case 1:
                        if (!(this.lstAddParLocations.length == 0)) return [3 /*break*/, 2];
                        if (SelType == "U") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select any Par Location to Update Items' });
                        }
                        else {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select any Par Location to Add Items' });
                        }
                        return [3 /*break*/, 7];
                    case 2:
                        this.validateInput();
                        this.strParIDs = '';
                        if (!(this.returnType == AtParEnums_2.StatusType.Success)) return [3 /*break*/, 7];
                        for (i = 0; i < this.lstAddParLocations.length; i++) {
                            this.strParIDs = this.strParIDs + this.lstAddParLocations[i].PAR_LOC_ID + '^';
                        }
                        this.spinnerService.start();
                        if (!(SelType == 'U')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getItemsToAddMulParLocReqTypeU(this.selectedItemID, '', this.ORG_ID, this.strParIDs, SelType, this.intAppId)];
                    case 3:
                        _a.sent();
                        if (this.returnType == AtParEnums_2.StatusType.Success) {
                            this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Item';
                            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        }
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.getItemsToAddMultipleParLocations(this.selectedItemID, '', this.ORG_ID, this.strParIDs, SelType, this.intAppId)];
                    case 5:
                        _a.sent();
                        if (this.returnType == AtParEnums_2.StatusType.Success) {
                            this.breadCrumbMenu.SUB_MENU_NAME = 'Add Item';
                            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        }
                        _a.label = 6;
                    case 6:
                        this.spinnerService.stop();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "showItemsPopUp");
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ManageParLocationComponent.prototype.getItemsToAddMultipleParLocations = function (itemID, orgGroupID, ordID, parLocIDs, transType, appID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.returnType = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParManageParLocServices.getItemsToAddMultipleParLocations(itemID, orgGroupID, ordID, parLocIDs, transType, appID)
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.lstAllocLocations = [];
                                _this.returnType = res.StatType;
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.page = false;
                                        _this.table = true;
                                        _this.lstAllocLocations = res.DataList;
                                        for (var i = 0; i < _this.lstAllocLocations.length; i++) {
                                            _this.lstAllocLocations[i].PREV_BIN_LOC = _this.lstAllocLocations[i].BIN_LOC;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "getItemsToAddMultipleParLocations");
                        return [3 /*break*/, 4];
                    case 4:
                        if (!(this.returnType == AtParEnums_2.StatusType.Success)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.bindDataGrid()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ManageParLocationComponent.prototype.getItemsToAddMulParLocReqTypeU = function (itemID, orgGroupID, ordID, parLocIDs, transType, appID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.returnType = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParManageParLocServices.getItemsToAddMulParLocReqTypeU(itemID, orgGroupID, ordID, parLocIDs, transType, appID)
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.lstAllocLocations = [];
                                _this.returnType = res.StatType;
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.page = false;
                                        _this.table = true;
                                        _this.lstAllocLocations = res.DataList;
                                        for (var i = 0; i < _this.lstAllocLocations.length; i++) {
                                            _this.lstAllocLocations[i].PREV_BIN_LOC = _this.lstAllocLocations[i].BIN_LOC;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "getItemsToAddMulParLocReqTypeU");
                        return [3 /*break*/, 4];
                    case 4:
                        if (!(this.returnType == AtParEnums_2.StatusType.Success)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.bindDataGrid()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ManageParLocationComponent.prototype.bindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.lstAllocLocations.length > 0)) return [3 /*break*/, 8];
                        this.lstInsertParItems = [];
                        this.populateStaticDropdowns();
                        this.grid_RowDataBound();
                        return [4 /*yield*/, this.bindInvBUnitsDropdown()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.bindCostCenterDetailsDropdown()];
                    case 2:
                        _a.sent();
                        if (!(this.selectType == 'U')) return [3 /*break*/, 6];
                        if (!(this.selectedItemID != 'All')) return [3 /*break*/, 4];
                        this.showTrSubItem = true;
                        return [4 /*yield*/, this.populateItemsDropDown()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.showTrSubItem = false;
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        this.showTrSubItem = false;
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        this.showSaveBtn = false;
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ManageParLocationComponent.prototype.grid_RowDataBound = function () {
        try {
            for (var i = 0; i < this.lstAllocLocations.length; i++) {
                this.lstAllocLocations[i].COUNT_ID = 'COUNT_ID' + i;
                this.lstAllocLocations[i].COMP_ID = 'COMP_ID' + i;
                this.lstAllocLocations[i].ORDTYPE_ID = 'ORDTYPE_ID' + i;
                this.lstAllocLocations[i].OPTQTY_ID = 'OPTQTY_ID' + i;
                this.lstAllocLocations[i].FOQTY_ID = 'FOQTY_ID' + i;
                this.lstAllocLocations[i].MAXQTY_ID = 'MAXQTY_ID' + i;
                this.lstAllocLocations[i].PROC_ID = 'PROC_ID' + i;
                this.lstAllocLocations[i].UNITISSUE_ID = 'UNITISSUE_ID' + i;
                this.lstAllocLocations[i].CONVRATE_ID = 'CONVRATE_ID' + i;
                this.lstAllocLocations[i].PARUOM_ID = 'PARUOM_ID' + i;
                this.lstAllocLocations[i].CONVRATE_PARUOM_ID = 'CONVRATE_PARUOM_ID' + i;
                this.lstAllocLocations[i].CHARGE_ID = 'CHARGE_ID' + i;
                this.lstAllocLocations[i].REPL_ID = 'REPL_ID' + i;
                this.lstAllocLocations[i].FILLKILL_ID = 'FILLKILL_ID' + i;
                this.lstAllocLocations[i].COSTCENTER_ID = 'COSTCENTER_ID' + i;
                this.lstAllocLocations[i].INV_BUS_ID = 'INV_BUS_ID' + i;
                this.lstAllocLocations[i].REQ_ID = 'REQ_ID' + i;
                this.lstAllocLocations[i].STATUS_NAME = 'STATUS_NAME' + i;
                if (this.lstAllocLocations[i].COUNT_REQUIRED == 'Y') {
                    this.lstAllocLocations[i].ISCOUNT_REQUIRED = true;
                }
                else {
                    this.lstAllocLocations[i].ISCOUNT_REQUIRED = false;
                }
                if (this.lstAllocLocations[i].LOT_CONTROLLED == 'Y') {
                    this.lstAllocLocations[i].ISLOT_CONTROLLED = true;
                }
                else {
                    this.lstAllocLocations[i].ISLOT_CONTROLLED = false;
                }
                if (this.lstAllocLocations[i].SERIAL_CONTROLLED == 'Y') {
                    this.lstAllocLocations[i].ISSERIAL_CONTROLLED = true;
                }
                else {
                    this.lstAllocLocations[i].ISSERIAL_CONTROLLED = false;
                }
                if (this.selectType == 'N') {
                    this.lstAllocLocations[i].STATUS = 'Y';
                }
                if (this.lstAllocLocations[i].PAR_UOM == null || this.lstAllocLocations[i].PAR_UOM == undefined) {
                    this.lstAllocLocations[i].CONV_RATE_PAR_UOM = '';
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "grid_RowDataBound");
        }
    };
    ManageParLocationComponent.prototype.populateStaticDropdowns = function () {
        try {
            this.lstOrderingTypes = [];
            this.lstOrderingTypes.push({ label: 'Select One', value: 'Select One' });
            this.lstOrderingTypes.push({ label: 'Par', value: '01' });
            this.lstOrderingTypes.push({ label: 'Foq', value: '02' });
            this.lstOrderingTypes.push({ label: 'Min/Max', value: '03' });
            this.lstOrderingTypes.push({ label: 'Issue', value: '04' });
            this.lstReplishmentTypes = [];
            this.lstReplishmentTypes.push({ label: 'Select One', value: '0' });
            this.lstReplishmentTypes.push({ label: 'Stock', value: '1' });
            this.lstReplishmentTypes.push({ label: 'Nonstock', value: '2' });
            this.lstReplishmentTypes.push({ label: 'Stockless', value: '3' });
            this.lstReplishmentTypes.push({ label: 'Consignment', value: '4' });
            this.lstFKFlags = [];
            this.lstFKFlags.push({ label: 'Select One', value: '0' });
            this.lstFKFlags.push({ label: 'Fill', value: 'F' });
            this.lstFKFlags.push({ label: 'Kill', value: 'K' });
            this.lstRequisitionTypes = [];
            this.lstRequisitionTypes.push({ label: 'Select One', value: '0' });
            this.lstRequisitionTypes.push({ label: 'Issue', value: 'I' });
            this.lstRequisitionTypes.push({ label: 'Transfer', value: 'T' });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateStaticDropdowns");
        }
    };
    ManageParLocationComponent.prototype.bindInvBUnitsDropdown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!(this.intInvBcnt == 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.atParCommonService.getOrgIds(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.intInvBcnt = _this.intInvBcnt + 1;
                                _this.lstInvBunits = [];
                                //this.lstInvBunits.push({ label: 'Select One', value: 'Select One' });
                                // this.parItem.INV_BUSINESS_UNIT = this.ORG_ID;
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i < res.DataList.length; i++) {
                                            _this.lstInvBunits.push({ label: res.DataList[i], value: res.DataList[i] });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "bindInvBUnitsDropdown");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageParLocationComponent.prototype.bindCostCenterDetailsDropdown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!(this.intCCcnt == 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.atParCommonService.getCostCenterOrgIds(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.intCCcnt = _this.intCCcnt + 1;
                                _this.lstCostCenters = [];
                                _this.lstCostCenters.push({ label: 'Select One', value: 'Select One' });
                                // this.parItem.COST_CENTER = 'Select One';
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i < res.DataList.length; i++) {
                                            _this.lstCostCenters.push({ label: res.DataList[i], value: res.DataList[i] });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "bindCostCenterDetailsDropdown");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageParLocationComponent.prototype.populateItemsDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getItems('', this.ORG_ID, this.intAppId)
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.lstSubItems = [];
                                _this.lstSubItems.push({ label: 'Select One', value: '' });
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i < res.DataList.length; i++) {
                                            if (res.DataList[i].STATUS == 0) {
                                                if (res.DataList[i].ITEM_ID != _this.selectedItemID) {
                                                    _this.lstSubItems.push({ label: res.DataList[i].ITEM_ID + '-' + res.DataList[i].SHORT_DESCR, value: res.DataList[i].ITEM_ID });
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, "populateItemsDropDown");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageParLocationComponent.prototype.validateInput = function () {
        this.returnType = 1;
        if (this.showOrgDropdown == true) {
            if (this.ORG_GROUP_ID == 'Select One' || this.ORG_GROUP_ID == '' || this.ORG_GROUP_ID == undefined) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Org Group ID' });
                return;
            }
        }
        if (this.ORG_ID == 'Select One' || this.ORG_ID == '' || this.ORG_ID == undefined) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Org ID' });
            return;
        }
        if ((this.PRICE_FROM != '' && this.PRICE_FROM != undefined) && (this.PRICE_TO == '' || this.PRICE_TO == undefined)) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Item Price between' });
            return;
        }
        if ((this.PRICE_FROM == '' || this.PRICE_FROM == undefined) && (this.PRICE_TO != '' && this.PRICE_TO != undefined)) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Item Price between' });
            return;
        }
        if (this.PRICE_FROM != '' && this.PRICE_FROM != undefined && this.PRICE_TO != '' && this.PRICE_TO != undefined) {
            if (parseFloat(this.PRICE_FROM) > parseFloat(this.PRICE_TO)) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Item Price between' });
                return;
            }
        }
        this.returnType = 4;
    };
    ManageParLocationComponent.prototype.btnGoBack_Click = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.table = false;
        this.page = true;
        this.growlMessage = [];
        this.lstAllocLocations = [];
        this.intCCcnt = 0;
        this.intInvBcnt = 0;
        this.selectedItemID = '';
        if (this.showOrgDropdown) {
            this.ORG_GROUP_ID = 'Select One';
        }
        this.ORG_ID = '';
        this.DEPT_ID = '';
        this.DEPT_NAME = '';
        this.PAR_LOC_ID = '';
        this.PAR_LOC_NAME = '';
        this.ITEM_ID = '';
        this.ITEM_DESC = '';
        this.PRICE_FROM = '';
        this.PRICE_TO = '';
        this.lstParLocations = [];
        this.selectedItem = '';
    };
    ManageParLocationComponent.prototype.chkAllPar_Click = function () {
        this.spinnerService.start();
        var list = [];
        if (this.lstGridParFilterData == undefined || this.lstGridParFilterData == null || this.lstGridParFilterData.length == 0) {
            for (var i = 0; i < this.lstAllocLocations.length; i++) {
                this.lstAllocLocations[i].SELECTED_PARITEM = true;
                list.push(this.lstAllocLocations[i]);
            }
        }
        else {
            for (var i = 0; i < this.lstGridParFilterData.length; i++) {
                this.lstGridParFilterData[i].SELECTED_PARITEM = true;
                list.push(this.lstGridParFilterData[i]);
            }
        }
        this.lstInsertParItems = list;
        this.spinnerService.stop();
    };
    ManageParLocationComponent.prototype.chkNonePar_Click = function () {
        this.spinnerService.start();
        var list = [];
        if (this.lstGridParFilterData == undefined || this.lstGridParFilterData == null || this.lstGridParFilterData.length == 0) {
            for (var i = 0; i < this.lstAllocLocations.length; i++) {
                this.lstAllocLocations[i].SELECTED_PARITEM = false;
            }
        }
        else {
            for (var i = 0; i < this.lstGridParFilterData.length; i++) {
                this.lstGridParFilterData[i].SELECTED_PARITEM = false;
            }
        }
        this.lstInsertParItems = [];
        this.spinnerService.stop();
    };
    ManageParLocationComponent.prototype.myfilterdata = function (event) {
        this.lstGridParFilterData = new Array();
        this.lstGridParFilterData = event;
    };
    ManageParLocationComponent.prototype.switchPar_Click = function (e, parItem) {
        if (e) {
            parItem.SELECTED_PARITEM = true;
            this.lstInsertParItems.push(parItem);
        }
        else {
            parItem.SELECTED_PARITEM = false;
            for (var i = 0; i < this.lstInsertParItems.length; i++) {
                if (this.lstInsertParItems[i].PAR_LOC_ID == parItem.PAR_LOC_ID && this.lstInsertParItems[i].BIN_LOC == parItem.BIN_LOC && this.lstInsertParItems[i].ORG_ID == parItem.ORG_ID && this.lstInsertParItems[i].ITEM_ID == parItem.ITEM_ID) {
                    var index = this.lstInsertParItems.indexOf(this.lstInsertParItems[i], 0);
                    this.lstInsertParItems.splice(index, 1);
                }
            }
        }
    };
    ManageParLocationComponent.prototype.btnSave_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.validateGrid()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageParLocationComponent.prototype.saveMultipleParItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, maxQty, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        for (i = 0; i < this.lstInsertParItems.length; i++) {
                            maxQty = sessionStorage.getItem('strMaxAllowQty');
                            if (maxQty != '' && maxQty != null) {
                                if (this.lstInsertParItems[i].OPTIMAL_QTY != null) {
                                    if (this.lstInsertParItems[i].OPTIMAL_QTY > parseInt(maxQty)) {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Quantity must not be greater than max allowable quantity' });
                                        document.getElementById(this.lstInsertParItems[i].OPTQTY_ID).focus();
                                        return [2 /*return*/];
                                    }
                                }
                                if (this.lstInsertParItems[i].FOQ_QTY != null) {
                                    if (this.lstInsertParItems[i].FOQ_QTY > parseInt(maxQty)) {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Quantity must not be greater than max allowable quantity' });
                                        document.getElementById(this.lstInsertParItems[i].FOQTY_ID).focus();
                                        return [2 /*return*/];
                                    }
                                }
                                if (this.lstInsertParItems[i].MAX_QTY != null) {
                                    if (this.lstInsertParItems[i].MAX_QTY > parseInt(maxQty)) {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Quantity must not be greater than max allowable quantity' });
                                        document.getElementById(this.lstInsertParItems[i].MAXQTY_ID).focus();
                                        return [2 /*return*/];
                                    }
                                }
                            }
                            if (this.lstInsertParItems[i].ISCOUNT_REQUIRED) {
                                this.lstInsertParItems[i].COUNT_REQUIRED = 'Y';
                            }
                            else {
                                this.lstInsertParItems[i].COUNT_REQUIRED = 'N';
                            }
                            if (this.lstInsertParItems[i].ISLOT_CONTROLLED) {
                                this.lstInsertParItems[i].LOT_CONTROLLED = 'Y';
                            }
                            else {
                                this.lstInsertParItems[i].LOT_CONTROLLED = 'N';
                            }
                            if (this.lstInsertParItems[i].ISSERIAL_CONTROLLED) {
                                this.lstInsertParItems[i].SERIAL_CONTROLLED = 'Y';
                            }
                            else {
                                this.lstInsertParItems[i].SERIAL_CONTROLLED = 'N';
                            }
                            if (this.subItemID != '' && this.subItemID != undefined) {
                                this.lstInsertParItems[i].PREV_ITM_ID = this.lstInsertParItems[i].ITEM_ID;
                                this.lstInsertParItems[i].ITEM_ID = this.subItemID;
                            }
                            else {
                                this.lstInsertParItems[i].PREV_ITM_ID = '';
                            }
                            //this.lstInsertParItems[i].PREV_BIN_LOC = this.lstInsertParItems[i].BIN_LOC;
                            this.lstInsertParItems[i].PREV_OPTIMAL_QTY = this.lstInsertParItems[i].OPTIMAL_QTY.toString();
                            this.lstInsertParItems[i].RECORDTYPE = this.selectType;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParManageParLocServices.updateMultipleParItems(this.lstInsertParItems)
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        if (_this.selectType == 'U') {
                                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Item(s) Updated Sucessfully' });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Item(s) Inserted Successfully' });
                                        }
                                        _this.lstInsertParItems = [];
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        if (AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION == res.StatusCode) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Some Items With Same Values Already Exists' });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        }
                                        _this.spinnerService.stop();
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
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "saveMultipleParItems");
                        return [3 /*break*/, 4];
                    case 4: return [4 /*yield*/, this.getItemsToAddMulParLocReqTypeU(this.selectedItemID, '', this.ORG_ID, this.strParIDs, 'U', this.intAppId)];
                    case 5:
                        _a.sent();
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageParLocationComponent.prototype.validateGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var showError, i, str, strUOM;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        if (this.lstInsertParItems.length == 0) {
                            if (this.selectType == 'U') {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select any item to update' });
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select any item to insert' });
                            }
                            return [2 /*return*/];
                        }
                        showError = false;
                        for (i = 0; i < this.lstAllocLocations.length; i++) {
                            if (this.lstAllocLocations[i].SELECTED_PARITEM) {
                                if (!showError) {
                                    str = this.lstAllocLocations[i].OPTIMAL_QTY.toString();
                                    strUOM = this.lstAllocLocations[i].UNIT_OF_PROCUREMENT.toString();
                                    ///^[a-zA-Z0-9- ]*$/
                                    if (/^\d+(?:\.\d*)?$/.test(str) == false) {
                                        this.growlMessage = [];
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Correct Optimum Quantity' });
                                        document.getElementById(this.lstAllocLocations[i].OPTQTY_ID).focus();
                                        showError = true;
                                    }
                                    else if (/^[A-Z]+$/.test(strUOM) == false) {
                                        this.growlMessage = [];
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Enter only Upper Case Letters' });
                                        document.getElementById(this.lstAllocLocations[i].PROC_ID).focus();
                                        showError = true;
                                    }
                                    else if (this.lstAllocLocations[i].BIN_LOC == null || this.lstAllocLocations[i].BIN_LOC == '') {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Compartment' });
                                        document.getElementById(this.lstAllocLocations[i].COMP_ID).focus();
                                        showError = true;
                                    }
                                    else if (this.lstAllocLocations[i].ORDERING_TYPE == 'Select One' || this.lstAllocLocations[i].ORDERING_TYPE == '') {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Ordering Type' });
                                        document.getElementById(this.lstAllocLocations[i].ORDTYPE_ID).focus();
                                        showError = true;
                                    }
                                    else if (this.lstAllocLocations[i].OPTIMAL_QTY == null || this.lstAllocLocations[i].OPTIMAL_QTY.toString() == '') {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Optimum Quantity' });
                                        document.getElementById(this.lstAllocLocations[i].OPTQTY_ID).focus();
                                        showError = true;
                                    }
                                    else if ((this.lstAllocLocations[i].ORDERING_TYPE == '02' && (this.lstAllocLocations[i].FOQ_QTY == null || this.lstAllocLocations[i].FOQ_QTY.toString() == ''))) {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter FOQ Quantity' });
                                        document.getElementById(this.lstAllocLocations[i].FOQTY_ID).focus();
                                        showError = true;
                                    }
                                    else if (this.lstAllocLocations[i].ORDERING_TYPE == '03' && (this.lstAllocLocations[i].MAX_QTY == null || this.lstAllocLocations[i].MAX_QTY.toString() == '')) {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Max Quantity' });
                                        document.getElementById(this.lstAllocLocations[i].MAXQTY_ID).focus();
                                        showError = true;
                                    }
                                    else if (this.lstAllocLocations[i].UNIT_OF_PROCUREMENT == null || this.lstAllocLocations[i].UNIT_OF_PROCUREMENT == '') {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Unit of Procurement' });
                                        document.getElementById(this.lstAllocLocations[i].PROC_ID).focus();
                                        showError = true;
                                    }
                                    else if (this.lstAllocLocations[i].UNIT_OF_ISSUE == null || this.lstAllocLocations[i].UNIT_OF_ISSUE == '') {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Unit of Issue' });
                                        document.getElementById(this.lstAllocLocations[i].UNITISSUE_ID).focus();
                                        showError = true;
                                    }
                                    else if (this.lstAllocLocations[i].CONVERSION_RATE == null || this.lstAllocLocations[i].CONVERSION_RATE.toString() == '') {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter UOM Conversion Rate' });
                                        document.getElementById(this.lstAllocLocations[i].CONVRATE_ID).focus();
                                        showError = true;
                                    }
                                    else if (this.lstAllocLocations[i].REPLENISHMENT_TYPE == 0 || this.lstAllocLocations[i].REPLENISHMENT_TYPE.toString() == '') {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Replishment Type' });
                                        document.getElementById(this.lstAllocLocations[i].REPL_ID).focus();
                                        showError = true;
                                    }
                                    else if (this.lstAllocLocations[i].COST_CENTER == '' || this.lstAllocLocations[i].COST_CENTER == 'Select One') {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Cost Center' });
                                        document.getElementById(this.lstAllocLocations[i].COSTCENTER_ID).focus();
                                        showError = true;
                                    }
                                    else if (this.lstAllocLocations[i].REQUISITION_TYPE == '0' || this.lstAllocLocations[i].REQUISITION_TYPE == 'Select One' || this.lstAllocLocations[i].REQUISITION_TYPE == '') {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Requisition Type' });
                                        document.getElementById(this.lstAllocLocations[i].REQ_ID).focus();
                                        showError = true;
                                    }
                                }
                                if (showError == true || this.lstAllocLocations[i].BIN_LOC == null || this.lstAllocLocations[i].BIN_LOC == '' || this.lstAllocLocations[i].ORDERING_TYPE == 'Select One' || this.lstAllocLocations[i].ORDERING_TYPE == '' || this.lstAllocLocations[i].OPTIMAL_QTY == null || this.lstAllocLocations[i].OPTIMAL_QTY.toString() == '' || this.lstAllocLocations[i].UNIT_OF_PROCUREMENT == null || this.lstAllocLocations[i].UNIT_OF_PROCUREMENT == '' || this.lstAllocLocations[i].UNIT_OF_ISSUE == null || this.lstAllocLocations[i].UNIT_OF_ISSUE == '' || this.lstAllocLocations[i].CONVERSION_RATE == null || this.lstAllocLocations[i].CONVERSION_RATE.toString() == '' || this.lstAllocLocations[i].REPLENISHMENT_TYPE == 0 || this.lstAllocLocations[i].REPLENISHMENT_TYPE.toString() == '' || this.lstAllocLocations[i].COST_CENTER == '' || this.lstAllocLocations[i].COST_CENTER == 'Select One' || this.lstAllocLocations[i].REQUISITION_TYPE == '0' || this.lstAllocLocations[i].REQUISITION_TYPE == 'Select One' || this.lstAllocLocations[i].REQUISITION_TYPE == '' || (this.lstAllocLocations[i].ORDERING_TYPE == '02' && (this.lstAllocLocations[i].FOQ_QTY == null || this.lstAllocLocations[i].FOQ_QTY.toString() == '')) || (this.lstAllocLocations[i].ORDERING_TYPE == '03' && (this.lstAllocLocations[i].MAX_QTY == null || this.lstAllocLocations[i].MAX_QTY.toString() == ''))) {
                                    this.lstAllocLocations[i].rowClsStyle = 'ui-datatable-err';
                                }
                                else {
                                    this.lstAllocLocations[i].rowClsStyle = null;
                                }
                            }
                        }
                        if (showError) {
                            return [2 /*return*/];
                        }
                        if (!(this.subItemID != null && this.subItemID != '' && this.subItemID != undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.confirmationService.confirm({
                                message: 'Do you want to Substitute Selected Item for GridView Items  ',
                                accept: function () {
                                    _this.saveMultipleParItems();
                                },
                                reject: function () {
                                    _this.subItemID = '';
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.saveMultipleParItems()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageParLocationComponent.prototype.txtbox_KeyPress = function (e) {
        this.growlMessage = [];
        var charCode = (e.which) ? e.which : e.keyCode;
        if (charCode < 65 || charCode > 90) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Enter only Upper Case Letters' });
            return false;
        }
    };
    ManageParLocationComponent.prototype.lstOrdType_Change = function (e, orderingType) {
        if (orderingType == '02') {
            this.isFOQMandatory = true;
            this.isMaxMandatory = false;
        }
        else if (orderingType == '03') {
            this.isFOQMandatory = false;
            this.isMaxMandatory = true;
        }
        else {
            this.isFOQMandatory = false;
            this.isMaxMandatory = false;
        }
    };
    ManageParLocationComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString, funName, this.constructor.name);
    };
    ManageParLocationComponent.prototype.ngOnDestroy = function () {
        this.lstAddParLocations = [];
        this.lstAllocLocations = [];
        this.lstInsertParItems = [];
        this.lstInvBunits = [];
        this.lstCostCenters = [];
        this.lstFKFlags = [];
        this.lstItems = [];
        this.lstOrderingTypes = [];
        this.lstOrgGroups = [];
        this.lstOrgIds = [];
        this.lstParLocations = [];
        this.lstReplishmentTypes = [];
        this.lstRequisitionTypes = [];
        this.lstSubItems = [];
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ManageParLocationComponent.prototype, "appId", void 0);
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], ManageParLocationComponent.prototype, "dataTableComponent", void 0);
    ManageParLocationComponent = __decorate([
        core_1.Component({
            selector: 'manage-par-location',
            templateUrl: 'atpar-manage-par-location.component.html',
            providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, atpar_manage_par_location_service_1.ManageParLocServcies, api_1.ConfirmationService],
        }),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            atpar_manage_par_location_service_1.ManageParLocServcies,
            HttpService_1.HttpService,
            api_1.ConfirmationService,
            AtParConstants_1.AtParConstants])
    ], ManageParLocationComponent);
    return ManageParLocationComponent;
}());
exports.ManageParLocationComponent = ManageParLocationComponent;
//# sourceMappingURL=atpar-manage-par-location.component.js.map