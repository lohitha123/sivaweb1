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
var atpar_allocate_location_groups_service_1 = require("./atpar-allocate-location-groups.service");
var HttpService_1 = require("../Shared/HttpService");
var api_1 = require("../components/common/api");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParEnums_3 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var datatable_1 = require("../components/datatable/datatable");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AllocateLocationGroupsComponent = (function () {
    function AllocateLocationGroupsComponent(httpService, _http, spinnerService, commonService, confirmationService, atParConstant, AllocateLocationGroupsService) {
        this.httpService = httpService;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.confirmationService = confirmationService;
        this.atParConstant = atParConstant;
        this.AllocateLocationGroupsService = AllocateLocationGroupsService;
        this.deviceTokenEntry = [];
        this.lstUsers = [];
        this.lstOrgGroups = [];
        this.lstDisplay = [];
        this.lstBUnits = [];
        this.lstFilteredBUnits = [];
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.orgGrpId = "";
        this.orgGrpIDData = "";
        this.selectedOrgGroupId = "";
        this.selectedDropDownUserId = "";
        this.selectedLocGrpId = "";
        this.selectedDropDownDisplay = "A";
        this.blnStatusMsg = false;
        this.statusMsg = "";
        this.preField = "";
        this.dataCheckedSorting = [];
        this.isAuditRequired = "";
        this.strAudit = "";
        this.blnsortbycolumn = true;
        this.custom = "custom";
        this.showGrid = false;
        this.showAllocGroup = false;
        this.allocOp = "Copy";
        this.lstUsersForCopyMoveDelete = [];
        this.clientIP = "";
        this.totalCount = 0;
        this.allocatedCount = 0;
    }
    AllocateLocationGroupsComponent.prototype.ngOnInit = function () {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.intAppId = parseInt(this.appId);
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedBUnits = new Array();
        this.dataCheckedSorting = new Array();
        this.dataUncheckedSorting = new Array();
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.lstDisplay = [];
        this.lstDisplay.push({ label: 'All', value: 'A' });
        this.lstDisplay.push({ label: 'Allocated', value: 'L' });
        this.lstDisplay.push({ label: 'Unallocated', value: 'U' });
        this.checkAuditAllowed();
        this.bindOrgGroups();
    };
    AllocateLocationGroupsComponent.prototype.confirm = function () {
        var _this = this;
        this.growlMessage = [];
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected user ?',
            accept: function () {
                _this.deleteAllocateLocationGroups();
            }
        });
    };
    AllocateLocationGroupsComponent.prototype.bindModelDataChange = function (event) { };
    AllocateLocationGroupsComponent.prototype.bindUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstUsers = [];
                        this.lstUsers.push({ label: "Select User", value: "" });
                        return [4 /*yield*/, this.commonService.getUsersList(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.intAppId, this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstUsers.push({
                                                label: data.DataList[i].FULLNAME,
                                                value: data.DataList[i].USER_ID
                                            });
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
    AllocateLocationGroupsComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getAuditAllowed(this.intAppId, "mt_recv_inv_bunit_alloc.aspx").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.isAuditRequired = data.Data;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        //this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
                        this.spinnerService.stop();
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
    AllocateLocationGroupsComponent.prototype.populateBusinessUnits = function () {
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
                        this.spinnerService.start();
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_2.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.lstFilteredBUnits = data.DataList;
                                        isOrgBUnitsExist = true;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.spinnerService.stop();
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
    AllocateLocationGroupsComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        _this.blnStatusMsg = false;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + ' - ' + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.bindUsersList();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstUsers = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + ' - ' + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
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
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateLocationGroupsComponent.prototype.checkAll = function () {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                    this.lstgridfilterData[i].STATUS = true;
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].checkvalue = true;
                    this.lstDBData[i].CHK_VALUE = 1;
                    this.lstDBData[i].STATUS = true;
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    AllocateLocationGroupsComponent.prototype.unCheckAll = function () {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                    this.lstgridfilterData[i].STATUS = false;
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].checkvalue = false;
                    this.lstDBData[i].CHK_VALUE = 0;
                    this.lstDBData[i].STATUS = false;
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    AllocateLocationGroupsComponent.prototype.selectedRow = function (values, event) {
        try {
            if (event == true) {
                values.CHK_VALUE = 1;
                values.STATUS = true;
                values.checkvalue = true;
            }
            else {
                values.CHK_VALUE = 0;
                values.STATUS = false;
                values.checkvalue = false;
            }
            for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
                var index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0);
                this.lstCheckedBUnits.splice(index, 1);
            }
            this.lstCheckedBUnits.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    };
    AllocateLocationGroupsComponent.prototype.ddlChange = function () {
        this.showGrid = false;
    };
    AllocateLocationGroupsComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.showGrid = false;
                if (this.selectedOrgGroupId == "Select One") {
                    this.lstUsers = [];
                    this.lstUsers.push({ label: "Select User", value: "" });
                    return [2 /*return*/];
                }
                this.lstDBData = new Array();
                this.spinnerService.start();
                try {
                    this.bindUsersList();
                    this.spinnerService.stop();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    AllocateLocationGroupsComponent.prototype.BindDataGrid = function () {
        try {
            this.lstgridfilterData = null;
            this.lstUsersForCopyMoveDelete = [];
            this.totalCount = this.lstDBData.length;
            this.allocatedCount = this.lstDBData.filter(function (x) { return x.CHK_ALLOCATED == 1; }).length;
            this.lstDBMainDetails = [];
            for (var k = 0; k < this.lstDBData.length; k++) {
                this.lstDBMainDetails.push(this.lstDBData[k]);
            }
            if (this.selectedDropDownDisplay === "L") {
                this.showAllocGroup = true;
                for (var i = 0; i < this.lstUsers.length; i++) {
                    if (this.lstUsers[i].value !== this.selectedDropDownUserId)
                        this.lstUsersForCopyMoveDelete.push(this.lstUsers[i]);
                }
                this.lstDBData = this.lstDBData.filter(function (x) { return x.CHK_ALLOCATED == 1; });
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.showAllocGroup = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    return;
                }
            }
            else if (this.selectedDropDownDisplay === "U") {
                this.showAllocGroup = false;
                for (var i = 0; i < this.lstUsers.length; i++) {
                    if (this.lstUsers[i].value !== this.selectedDropDownUserId)
                        this.lstUsersForCopyMoveDelete.push(this.lstUsers[i]);
                }
                this.lstDBData = this.lstDBData.filter(function (x) { return x.CHK_ALLOCATED != 1; });
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.showAllocGroup = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    return;
                }
            }
            else {
                this.lstDBData = this.lstDBData;
                this.showAllocGroup = false;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    };
    AllocateLocationGroupsComponent.prototype.customSort1 = function (event) {
        try {
            var element = event;
            this.lstDBData = [];
            // this.blnsortbycolumn = !this.blnsortbycolumn;
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
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
            this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            if (this.blnsortbycolumn == false) {
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
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
    AllocateLocationGroupsComponent.prototype.customSort = function (event, field) {
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
    AllocateLocationGroupsComponent.prototype.getAllLocationGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showGrid = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                            if (this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined) {
                                this.showGrid = false;
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                                this.spinnerService.stop();
                                return [2 /*return*/, false];
                            }
                        }
                        if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User ID' });
                            this.showGrid = false;
                            return [2 /*return*/, false];
                        }
                        this.lstDBData = new Array();
                        this.showAllocGroup = false;
                        return [4 /*yield*/, this.AllocateLocationGroupsService.getLocationGroups(this.orgGroupIDForDBUpdate, this.selectedDropDownUserId, this.selectedLocGrpId, this.selectedDropDownDisplay, this.intAppId).catch(this.httpService.handleError).
                                then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        if (data.DataList.length > 0) {
                                            _this.lstDBData = [];
                                            _this.lstDBData = data.DataList;
                                            _this.showGrid = true;
                                            _this.selectedDropDownUserIdOp = "";
                                            _this.dataCheckedSorting = [];
                                            _this.dataUncheckedSorting = [];
                                            _this.BindDataGrid();
                                            for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                                if (_this.lstDBData[i].CHK_ALLOCATED == 1) {
                                                    _this.lstDBData[i].checkvalue = true;
                                                    _this.dataCheckedSorting.push(_this.lstDBData[i]);
                                                }
                                                else {
                                                    _this.lstDBData[i].checkvalue = false;
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
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_REMOTEERROR) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please set ERP DataBase Details in Configuration Manager Screen" });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
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
                        this.clientErrorMsg(ex_5, "getAllLocationGroups");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateLocationGroupsComponent.prototype.insertAuditData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var auditSecurity, auditSecurityLst, intCnount, strScreenName, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
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
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
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
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "insertAuditData");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateLocationGroupsComponent.prototype.allocateLocationGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.spinnerService.start();
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            if (this.lstDBData[i].checkvalue) {
                                this.lstDBData[i].CHK_ALLOCATED = 1;
                            }
                            else {
                                this.lstDBData[i].CHK_ALLOCATED = 0;
                            }
                        }
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        return [4 /*yield*/, this.AllocateLocationGroupsService.allocateLocationGroups(this.lstDBMainDetails, this.orgGroupIDForDBUpdate.trim(), this.selectedLocGrpId, this.selectedDropDownUserId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.clientIP, this.intAppId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                        _this.selectedDropDownUserId = "";
                                        _this.selectedOrgGroupId = "";
                                        _this.selectedDropDownDisplay = "";
                                        _this.showGrid = false;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (this.isAuditRequired == "Y") {
                            this.insertAuditData();
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "allocateLocationGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateLocationGroupsComponent.prototype.copyAllocateLocationGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        this.growlMessage = [];
                        if (this.selectedDropDownUserIdOp == "" || this.selectedDropDownUserIdOp == undefined) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid User ID" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.AllocateLocationGroupsService.copyAllocateLocationGroups(this.lstDBData, this.selectedDropDownUserIdOp, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate.trim(), this.selectedLocGrpId, this.clientIP, this.intAppId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Copied Successfully' });
                                        _this.selectedDropDownUserId = "";
                                        _this.selectedDropDownUserIdOp = "";
                                        _this.selectedOrgGroupId = "";
                                        _this.selectedDropDownDisplay = "";
                                        _this.showGrid = false;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        if (this.isAuditRequired == "Y") {
                            this.insertAuditData();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "copyAllocateLocationGroups");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateLocationGroupsComponent.prototype.moveAllocateLocationGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        this.growlMessage = [];
                        if (this.selectedDropDownUserIdOp == "" || this.selectedDropDownUserIdOp == undefined) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid User ID" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.AllocateLocationGroupsService.moveAllocateLocationGroups(this.lstDBData, this.selectedDropDownUserId, this.selectedDropDownUserIdOp, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate.trim(), this.selectedLocGrpId, this.clientIP, this.intAppId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Moved Successfully' });
                                        _this.selectedDropDownUserId = "";
                                        _this.selectedDropDownUserIdOp = "";
                                        _this.selectedOrgGroupId = "";
                                        _this.selectedDropDownDisplay = "";
                                        _this.showGrid = false;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        if (this.isAuditRequired == "Y") {
                            this.insertAuditData();
                        }
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "moveAllocateLocationGroups");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateLocationGroupsComponent.prototype.deleteAllocateLocationGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.AllocateLocationGroupsService.deleteAllocateLocationGroups(this.lstDBData, this.orgGroupIDForDBUpdate.trim(), this.selectedLocGrpId, this.selectedDropDownUserId, this.intAppId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Deleted Successfully' });
                                        _this.selectedDropDownUserId = "";
                                        _this.selectedDropDownUserIdOp = "";
                                        _this.selectedOrgGroupId = "";
                                        _this.selectedDropDownDisplay = "";
                                        _this.showGrid = false;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.showGrid = false;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        if (this.isAuditRequired == "Y") {
                            this.insertAuditData();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, "deleteAllocateLocationGroups");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateLocationGroupsComponent.prototype.filterdata = function (event) {
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    AllocateLocationGroupsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    AllocateLocationGroupsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstUsers = null;
        this.lstOrgGroups = null;
        this.intAppId = null;
        this.lstBUnits = null;
        this.lstFilteredBUnits = null;
        this.lstCheckedBUnits = null;
        this.lstDBData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.orgGrpIDData = null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AllocateLocationGroupsComponent.prototype, "appId", void 0);
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], AllocateLocationGroupsComponent.prototype, "dataTableComponent", void 0);
    AllocateLocationGroupsComponent = __decorate([
        core_1.Component({
            selector: 'atpar-allocate-location-groups',
            templateUrl: 'atpar-allocate-location-groups.component.html',
            providers: [HttpService_1.HttpService, api_1.ConfirmationService, atpar_common_service_1.AtParCommonService, atpar_allocate_location_groups_service_1.AllocateLocationGroupsService],
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            api_1.ConfirmationService,
            AtParConstants_1.AtParConstants,
            atpar_allocate_location_groups_service_1.AllocateLocationGroupsService])
    ], AllocateLocationGroupsComponent);
    return AllocateLocationGroupsComponent;
}());
exports.AllocateLocationGroupsComponent = AllocateLocationGroupsComponent;
//# sourceMappingURL=atpar-allocate-location-groups.component.js.map