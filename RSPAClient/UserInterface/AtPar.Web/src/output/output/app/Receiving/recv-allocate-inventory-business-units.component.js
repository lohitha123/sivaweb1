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
var http_1 = require("@angular/http");
var MT_ATPAR_SECURITY_AUDIT_1 = require("../../app/Entities/MT_ATPAR_SECURITY_AUDIT");
var HttpService_1 = require("../Shared/HttpService");
var api_1 = require("../components/common/api");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParEnums_3 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AllocateInventoryBusinessUnitsComponent = (function () {
    function AllocateInventoryBusinessUnitsComponent(httpService, _http, spinnerService, atParConstant, commonService) {
        this.httpService = httpService;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.commonService = commonService;
        this.deviceTokenEntry = [];
        this.lstUsers = [];
        this.lstOrgGroups = [];
        this.lstBUnits = [];
        this.lstFilteredBUnits = [];
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.orgGrpId = "";
        this.orgGrpIDData = "";
        this.selectedOrgGroupId = "";
        this.selectedDropDownUserId = "";
        this.selectedBunit = "";
        this.selectedDescription = "";
        this.blnStatusMsg = false;
        this.statusMsg = "";
        this.dataCheckedSorting = [];
        this.isAuditRequired = "";
        this.strAudit = "";
        this.blnsortbycolumn = true;
        this.preField = "";
        this.custom = "custom";
        this.showGrid = false;
    }
    AllocateInventoryBusinessUnitsComponent.prototype.ngOnInit = function () {
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            this.lstCheckedBUnits = new Array();
            this.dataCheckedSorting = new Array();
            this.dataUncheckedSorting = new Array();
            this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
            // checking is Audit enabled for this page
            this.checkAuditAllowed();
            this.bindOrgGroups();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    };
    AllocateInventoryBusinessUnitsComponent.prototype.bindModelDataChange = function (event) { };
    AllocateInventoryBusinessUnitsComponent.prototype.bindUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstUsers = [];
                        this.lstUsers.push({ label: "Select User", value: "Select User" });
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUsersList(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], 4, this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
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
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.spinnerService.stop();
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
                        this.clientErrorMsg(ex_1, "bindUsersList");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateInventoryBusinessUnitsComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.getAuditAllowed(4, "mt_recv_inv_bunit_alloc.aspx").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.isAuditRequired = data.Data;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "checkAuditAllowed");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateInventoryBusinessUnitsComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isOrgBUnitsExist = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_2.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.lstFilteredBUnits = data.DataList;
                                        _this.spinnerService.stop();
                                        isOrgBUnitsExist = true;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(isOrgBUnitsExist)];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "populateBusinessUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateInventoryBusinessUnitsComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        _this.orgGroupData = data.DataList;
                                        _this.blnStatusMsg = false;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpIDData = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.populateBusinessUnits();
                                            _this.bindUsersList();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstUsers = [];
                                            _this.lstUsers.push({ label: "Select User", value: "Select User" });
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
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.spinnerService.stop();
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
                        this.clientErrorMsg(ex_4, "bindOrgGroups");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateInventoryBusinessUnitsComponent.prototype.myfilterdata = function (event) {
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    AllocateInventoryBusinessUnitsComponent.prototype.checkAll = function () {
        try {
            this.lstCheckedBUnits = [];
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                    this.lstCheckedBUnits.push(this.lstgridfilterData[i]);
                }
            }
            else {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].checkvalue = true;
                    this.lstDBData[i].CHK_VALUE = 1;
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    AllocateInventoryBusinessUnitsComponent.prototype.unCheckAll = function () {
        try {
            this.lstCheckedBUnits = [];
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                    this.lstCheckedBUnits.push(this.lstgridfilterData[i]);
                }
            }
            else {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].checkvalue = false;
                    this.lstDBData[i].CHK_VALUE = 0;
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    AllocateInventoryBusinessUnitsComponent.prototype.selectedRow = function (values, event) {
        try {
            if (event == true) {
                values.CHK_VALUE = 1;
            }
            else {
                values.CHK_VALUE = 0;
            }
            for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
                if (this.lstCheckedBUnits[i].BUSINESS_UNIT === values.BUSINESS_UNIT) {
                    var index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0);
                    this.lstCheckedBUnits.splice(index, 1);
                }
            }
            this.lstCheckedBUnits.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    };
    AllocateInventoryBusinessUnitsComponent.prototype.fillBUnitsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstFilteredBUnits = [];
                        query = event.query;
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "") && this.blnShowOrgGroupDD) {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_2.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.lstBUnits = data.DataList;
                                        _this.lstFilteredBUnits = _this.filterBusinessUnits(query, _this.lstBUnits);
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        if (data.StatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "fillBUnitsAuto");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateInventoryBusinessUnitsComponent.prototype.filterBusinessUnits = function (query, businessunits) {
        try {
            var filtered = [];
            if (query == "%") {
                for (var i = 0; i < businessunits.length; i++) {
                    var Bunitvalue = businessunits[i];
                    filtered.push(Bunitvalue);
                }
            }
            else {
                if (query.length >= 0) {
                    for (var i = 0; i < businessunits.length; i++) {
                        var Bunitvalue = businessunits[i];
                        if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            filtered.push(Bunitvalue);
                        }
                    }
                }
            }
            return filtered;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "filterBusinessUnits");
        }
    };
    AllocateInventoryBusinessUnitsComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showGrid = false;
                        if (this.selectedOrgGroupId == "Select One") {
                            this.orgGroupIDForDBUpdate = "";
                            this.lstUsers = [];
                            this.lstUsers.push({ label: "Select User", value: "Select User" });
                            return [2 /*return*/];
                        }
                        this.selectedBunit = "";
                        this.selectedDropDownUserId = "";
                        this.selectedDescription = "";
                        this.lstDBData = new Array();
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.bindUsersList()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.populateBusinessUnits()];
                    case 3:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "ddlOrgGrpIdChanged");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AllocateInventoryBusinessUnitsComponent.prototype.ddlUserChanged = function () {
        this.showGrid = false;
    };
    AllocateInventoryBusinessUnitsComponent.prototype.BindDataGrid = function () {
        try {
            this.dataCheckedSorting = [];
            this.dataUncheckedSorting = [];
            for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].CHK_ALLOCATED == 1) {
                    this.dataCheckedSorting.push(this.lstDBData[i]);
                }
                else {
                    this.dataUncheckedSorting.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    };
    //customSort1(event) {
    //    try {
    //        var element = event;
    //        this.lstDBData = [];
    //        this.blnsortbycolumn = !this.blnsortbycolumn;
    //        this.sortedcheckedrec = [];
    //        this.sorteduncheckedrec = [];
    //        this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
    //            if (a[element.field] < b[element.field])
    //                return -1;
    //            if (a[element.field] > b[element.field])
    //                return 1;
    //            return 0;
    //        });
    //        this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
    //            if (a[element.field] < b[element.field])
    //                return -1;
    //            if (a[element.field] > b[element.field])
    //                return 1;
    //            return 0;
    //        });
    //        if (this.blnsortbycolumn == false) {
    //            this.lstDBData = [];
    //            this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
    //        }
    //        else {
    //            this.lstDBData = [];
    //            this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
    //        }
    //        this.sortedcheckedrec = [];
    //        this.sorteduncheckedrec = [];
    //    }
    //    catch (ex) {
    //        this.clientErrorMsg(ex, "customSort");
    //    }
    //}
    AllocateInventoryBusinessUnitsComponent.prototype.customSort = function (event, field) {
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
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        var result = null;
        var order;
        try {
            this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
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
            this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
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
    AllocateInventoryBusinessUnitsComponent.prototype.getAllBUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isBUnitsExists, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showGrid = false;
                        this.lstgridfilterData = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User Id' });
                            this.showGrid = false;
                            return [2 /*return*/, false];
                        }
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstDBData = new Array();
                        return [4 /*yield*/, this.populateBusinessUnits()];
                    case 2:
                        isBUnitsExists = _a.sent();
                        if (isBUnitsExists == true) {
                            this.spinnerService.start();
                            this.httpService.get({
                                "apiMethod": "/api/RcvAllocBU/GetBUnits",
                                params: {
                                    "bArray": this.lstFilteredBUnits,
                                    "appId": "4",
                                    "userID": this.selectedDropDownUserId,
                                    "bUnit": this.selectedBunit,
                                    "description": this.selectedDescription,
                                    "serverUserID": this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID],
                                }
                            }).catch(this.httpService.handleError).map(function (res) { return res.json(); })
                                .subscribe(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.lstDBData = [];
                                        _this.lstDBData = response.DataList;
                                        for (var i = 0; i <= response.DataList.length - 1; i++) {
                                            if (response.DataList[i].CHK_ALLOCATED == 1) {
                                                response.DataList[i].checkvalue = true;
                                            }
                                            else {
                                                response.DataList[i].checkvalue = false;
                                            }
                                        }
                                        _this.lstDBData = response.DataList;
                                        _this.BindDataGrid();
                                        _this.showGrid = true;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "getAllBUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateInventoryBusinessUnitsComponent.prototype.insertAuditData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var auditSecurity, auditSecurityLst, intCnount, strScreenName, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        auditSecurity = void 0;
                        auditSecurityLst = void 0;
                        auditSecurityLst = new Array();
                        for (intCnount = 0; intCnount <= this.lstFilteredBUnits.length - 1; intCnount++) {
                            if (this.lstFilteredBUnits[intCnount].CHK_VALUE.toString() == "true") {
                                auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                auditSecurity.FIELD_NAME = "CHK_VALUE";
                                auditSecurity.OLD_VALUE = "0";
                                auditSecurity.NEW_VALUE = "1";
                                auditSecurity.KEY_1 = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                                auditSecurity.KEY_2 = "4";
                                auditSecurity.KEY_3 = this.lstFilteredBUnits[intCnount].BUSINESS_UNIT;
                                auditSecurity.KEY_4 = "";
                                auditSecurity.KEY_5 = "";
                                auditSecurityLst.push(auditSecurity);
                            }
                        }
                        strScreenName = "mt_recv_inv_bunit_alloc.aspx";
                        return [4 /*yield*/, this.commonService.insertAuditData(auditSecurityLst, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], strScreenName).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                switch (response.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "insertAuditData");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateInventoryBusinessUnitsComponent.prototype.allocateBUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.growlMessage = [];
                try {
                    if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User Id' });
                        return [2 /*return*/];
                    }
                    this.spinnerService.start();
                    this.httpService.create({
                        "apiMethod": "/api/RcvAllocBU/AllocateBUnits",
                        formData: this.lstDBData,
                        params: {
                            "appId": "4",
                            "userID": this.selectedDropDownUserId,
                            "serverUserID": this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID],
                            "bArray": this.lstFilteredBUnits,
                            "searched": true,
                            "bUnit": this.selectedBunit,
                            "description": this.selectedDescription,
                        }
                    }).catch(this.httpService.handleError).map(function (res) { return res.json(); }).subscribe(function (response) {
                        _this.growlMessage = [];
                        switch (response.StatType) {
                            case AtParEnums_3.StatusType.Success: {
                                if (_this.isAuditRequired == "Y") {
                                    _this.insertAuditData();
                                    _this.spinnerService.stop();
                                }
                                else {
                                    _this.spinnerService.stop();
                                }
                                _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                _this.selectedDropDownUserId = "";
                                _this.selectedDescription = "";
                                _this.selectedBunit = "";
                                _this.showGrid = false;
                                _this.spinnerService.stop();
                                _this.lstDBData = [];
                                break;
                            }
                            case AtParEnums_3.StatusType.Warn: {
                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                _this.spinnerService.stop();
                                break;
                            }
                            case AtParEnums_3.StatusType.Error: {
                                _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                _this.spinnerService.stop();
                                _this.showGrid = false;
                                break;
                            }
                            case AtParEnums_3.StatusType.Custom: {
                                _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                _this.spinnerService.stop();
                                break;
                            }
                        }
                    });
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "allocateBUnits");
                }
                return [2 /*return*/];
            });
        });
    };
    AllocateInventoryBusinessUnitsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    AllocateInventoryBusinessUnitsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstUsers = null;
        this.lstOrgGroups = null;
        this.lstBUnits = null;
        this.lstFilteredBUnits = null;
        this.lstCheckedBUnits = null;
        this.lstDBData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    };
    AllocateInventoryBusinessUnitsComponent = __decorate([
        core_1.Component({
            templateUrl: 'recv-allocate-inventory-business-units.component.html',
            providers: [HttpService_1.HttpService, api_1.ConfirmationService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants],
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            atpar_common_service_1.AtParCommonService])
    ], AllocateInventoryBusinessUnitsComponent);
    return AllocateInventoryBusinessUnitsComponent;
}());
exports.AllocateInventoryBusinessUnitsComponent = AllocateInventoryBusinessUnitsComponent;
//# sourceMappingURL=recv-allocate-inventory-business-units.component.js.map