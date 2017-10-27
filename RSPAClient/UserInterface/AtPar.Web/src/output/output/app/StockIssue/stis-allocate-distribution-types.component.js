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
var AtParEnums_1 = require("./../Shared/AtParEnums");
var stis_allocate_distribution_types_service_1 = require("./stis-allocate-distribution-types.service");
var AtParWebApiResponse_1 = require("../Shared/AtParWebApiResponse");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var HttpService_1 = require("../Shared/HttpService");
var AtParConstants_1 = require("../Shared/AtParConstants");
var linq_es5_1 = require("linq-es5");
var MT_ATPAR_SECURITY_AUDIT_1 = require("../Entities/MT_ATPAR_SECURITY_AUDIT");
var datatable_1 = require("../components/datatable/datatable");
var AllocateDistributionTypesComponent = (function () {
    function AllocateDistributionTypesComponent(spinnerService, commonService, httpService, distribTypesService, atParConstant) {
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.httpService = httpService;
        this.distribTypesService = distribTypesService;
        this.atParConstant = atParConstant;
        this.blnsortbycolumn = true;
        this.loading = true;
        this.dataGrid = false;
        this._deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstOrgGroups = [];
        this.ddlUserId = [];
        this.ddlDisplay = [];
        this.lstDistribData = [];
        this.lstgridfilterData = null;
        this.dataCheckedSorting = [];
        this.sortField = "";
        this.startIndex = 0;
        this.auditSatus = "";
        this.distribType = "";
        this.selectedOrgGroupID = "";
        this.preField = "";
        this.lstAuditData = [];
    }
    AllocateDistributionTypesComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.endIndex = +sessionStorage.getItem("RecordsEndindex");
                        //   this.lstCheckedDistribTypes = new Array<MT_STIS_DISTRIB_TYPE>();
                        this.dataCheckedSorting = new Array();
                        this.dataUncheckedSorting = new Array();
                        this.appID = (AtParEnums_1.EnumApps.StockIssue).toString();
                        this.menuCode = 'mt_stis_allocate_dist_types_setup.aspx';
                        this.ddlDisplay.push({ label: 'All', value: 'A' });
                        this.ddlDisplay.push({ label: 'Allocated', value: 'AL' });
                        this.ddlDisplay.push({ label: 'UnAllocated', value: 'N' });
                        this.selectedDisplay = this.ddlDisplay[0].value;
                        this.spinnerService.start();
                        this.checkAuditAllowed();
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 1:
                        _a.sent();
                        if (this.blnShowOrgGroupID) {
                            this.ddlUserId = [];
                            this.ddlUserId.push({ label: "Select User", value: "Select User" });
                        }
                        this.pageSize = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        exMsg_1 = _a.sent();
                        this.clientErrorMsg(exMsg_1, 'ngOnInit');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateDistributionTypesComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    AllocateDistributionTypesComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        if (!(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] == "All")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.commonService.getOrgGroupIDS().
                                catch(this.httpService.handleError).then(function (res) {
                                var webresp = res.json();
                                _this.spinnerService.stop();
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = webresp.DataList;
                                        // this.blnStatusMsg = false;
                                        if (_this.orgGroupData.length > 0) {
                                            _this.blnShowOrgGroupID = true;
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID != "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var orgGroups = res.json();
                                _this.spinnerService.stop();
                                switch (orgGroups.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = orgGroups.DataList;
                                        _this.blnShowOrgGroupLabel = true;
                                        _this.lblOrgGrpID = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                        if (_this.blnShowOrgGroupLabel) {
                                            _this.populateUsersDropDown();
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: orgGroups.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: orgGroups.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: orgGroups.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "bindOrgGroups");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AllocateDistributionTypesComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var webresp_1, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        webresp_1 = new AtParWebApiResponse_1.AtParWebApiResponse();
                        return [4 /*yield*/, this.commonService.getAuditAllowed(this.appID, this.menuCode)
                                .catch(this.httpService.handleError).then(function (res) {
                                webresp_1 = res.json();
                                _this.spinnerService.stop();
                                switch (webresp_1.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.auditSatus = webresp_1.Data;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp_1.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp_1.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp_1.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "checkAuditAllowed");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateDistributionTypesComponent.prototype.populateUsersDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.ddlUserId = [];
                        this.selectedUserID = "";
                        if (this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] != "All") {
                            this.orgGrpID = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        }
                        if (this.blnShowOrgGroupID) {
                            this.orgGrpID = this.selectedOrgGroupID;
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUsersList(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_1.EnumApps.StockIssue, this.orgGrpID)
                                .catch(this.httpService.handleError).then(function (res) {
                                var webresp = res.json();
                                _this.spinnerService.stop();
                                _this.ddlUserId.push({ label: "Select User", value: "Select User" });
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstUserData = webresp.DataList;
                                        for (var i = 0; i < _this.lstUserData.length; i++) {
                                            _this.ddlUserId.push({ label: _this.lstUserData[i].FULLNAME, value: _this.lstUserData[i].USER_ID });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "populateUsersDropDown");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateDistributionTypesComponent.prototype.go = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.lstgridfilterData = null;
                        this.dataGrid = false;
                        this.sortField = "CHK_VALUE";
                        this.growlMessage = [];
                        if (this.blnShowOrgGroupID) {
                            if (this.selectedOrgGroupID == 'Select One' || this.selectedOrgGroupID == undefined || this.selectedOrgGroupID == "") {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID " });
                                return [2 /*return*/];
                            }
                        }
                        if (!(this.selectedUserID == 'Select User' || this.selectedUserID == undefined || this.selectedUserID == "")) return [3 /*break*/, 1];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid UserId " });
                        return [2 /*return*/];
                    case 1:
                        this.spinnerService.start();
                        if (this.distribType != null || this.distribType != "") {
                            this.searched = true;
                        }
                        if (this.blnShowOrgGroupLabel) {
                            this.strOrgGrpID = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].toString();
                        }
                        if (this.blnShowOrgGroupID) {
                            this.strOrgGrpID = this.selectedOrgGroupID;
                        }
                        return [4 /*yield*/, this.distribTypesService.getDistributionTypes(this.distribType, this.selectedUserID, this.strOrgGrpID)
                                .catch(this.httpService.handleError).then(function (res) {
                                var distribType = res.json();
                                _this.lstDistribTypes = new Array();
                                switch (distribType.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.dataGrid = true;
                                        _this.lstDistribData = distribType.DataList;
                                        _this.dataCheckedSorting = linq_es5_1.asEnumerable(_this.lstDistribData).Where(function (a) { return a.CHK_VALUE == 1; }).Select(function (a) { return a; }).ToArray();
                                        _this.dataUncheckedSorting = linq_es5_1.asEnumerable(_this.lstDistribData).Where(function (a) { return a.CHK_VALUE != 1; }).Select(function (a) { return a; }).ToArray();
                                        if (_this.lstDistribData.length > 0) {
                                            if (_this.selectedDisplay == "AL") {
                                                //  this.lstDistribTypes = asEnumerable(this.lstDistribData).Where(a => a.CHK_VALUE == 1).Select(a => a).ToArray();
                                                _this.lstDistribTypes = _this.dataCheckedSorting.sort(function (a, b) {
                                                    if (a.DISTRIB_TYPE < b.DISTRIB_TYPE)
                                                        return -1;
                                                    if (a.DISTRIB_TYPE > b.DISTRIB_TYPE)
                                                        return 1;
                                                    return 0;
                                                });
                                            }
                                            else if (_this.selectedDisplay == "N") {
                                                // this.lstDistribTypes = asEnumerable(this.lstDistribData).Where(a => a.CHK_VALUE != 1).Select(a => a).ToArray();
                                                _this.lstDistribTypes = _this.dataUncheckedSorting.sort(function (a, b) {
                                                    if (a.DISTRIB_TYPE < b.DISTRIB_TYPE)
                                                        return -1;
                                                    if (a.DISTRIB_TYPE > b.DISTRIB_TYPE)
                                                        return 1;
                                                    return 0;
                                                });
                                            }
                                            else {
                                                _this.lstDistribTypes = _this.dataCheckedSorting.sort(function (a, b) {
                                                    if (a.DISTRIB_TYPE < b.DISTRIB_TYPE)
                                                        return -1;
                                                    if (a.DISTRIB_TYPE > b.DISTRIB_TYPE)
                                                        return 1;
                                                    return 0;
                                                }).concat(_this.dataUncheckedSorting.sort(function (a, b) {
                                                    if (a.DISTRIB_TYPE < b.DISTRIB_TYPE)
                                                        return -1;
                                                    if (a.DISTRIB_TYPE > b.DISTRIB_TYPE)
                                                        return 1;
                                                    return 0;
                                                }));
                                            }
                                        }
                                        else {
                                            _this.dataGrid = false;
                                        }
                                        _this.dataCheckedSorting = linq_es5_1.asEnumerable(_this.lstDistribData).Where(function (a) { return a.CHK_VALUE == 1; }).Select(function (a) { return a; }).ToArray();
                                        _this.dataUncheckedSorting = linq_es5_1.asEnumerable(_this.lstDistribData).Where(function (a) { return a.CHK_VALUE != 1; }).Select(function (a) { return a; }).ToArray();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: distribType.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: distribType.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: distribType.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "go");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AllocateDistributionTypesComponent.prototype.filterdata = function (event) {
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    AllocateDistributionTypesComponent.prototype.onSort1 = function (event) {
        try {
            var element = event;
            this.blnsortbycolumn = !this.blnsortbycolumn;
            this.blnsortbycolumn = !this.blnsortbycolumn;
            var checkedData = linq_es5_1.asEnumerable(this.lstDistribTypes).Where(function (a) { return a.CHK_VALUE == 1; }).ToArray();
            var unCheckedData = linq_es5_1.asEnumerable(this.lstDistribTypes).Where(function (a) { return a.CHK_VALUE == 0; }).ToArray();
            if (event.data != null && event.data.length > 0) {
                checkedData = checkedData.sort(function (a, b) {
                    if (a[element.field] < b[element.field])
                        return -1;
                    if (a[element.field] > b[element.field])
                        return 1;
                    return 0;
                });
                unCheckedData = unCheckedData.sort(function (a, b) {
                    if (a[element.field] < b[element.field])
                        return -1;
                    if (a[element.field] > b[element.field])
                        return 1;
                    return 0;
                });
                if (event.order == -1) {
                    this.lstDistribTypes = checkedData.reverse().concat(unCheckedData.reverse()); // sortedUnCheckedData.reverse();
                }
                else {
                    this.lstDistribTypes = checkedData.concat(unCheckedData);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onSort");
        }
    };
    AllocateDistributionTypesComponent.prototype.onSort = function (event, field) {
        try {
            var element = event;
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
            var result_1 = null;
            var order = void 0;
            if (this.selectedDisplay == "AL") {
                this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                    if (a[element.field] == null && b[element.field] != null)
                        result_1 = -1;
                    else if (a[element.field] != null && b[element.field] == null)
                        result_1 = 1;
                    else if (a[element.field] == null && b[element.field] == null)
                        result_1 = 0;
                    else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                        result_1 = a[element.field].localeCompare(b[element.field]);
                    else
                        result_1 = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                    return (element.order * result_1);
                });
                this.lstDistribTypes = this.sortedcheckedrec;
            }
            else if (this.selectedDisplay == "N") {
                this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                    if (a[element.field] == null && b[element.field] != null)
                        result_1 = -1;
                    else if (a[element.field] != null && b[element.field] == null)
                        result_1 = 1;
                    else if (a[element.field] == null && b[element.field] == null)
                        result_1 = 0;
                    else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                        result_1 = a[element.field].localeCompare(b[element.field]);
                    else
                        result_1 = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                    return (element.order * result_1);
                });
                this.lstDistribTypes = this.sorteduncheckedrec;
            }
            else {
                this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                    if (a[element.field] == null && b[element.field] != null)
                        result_1 = -1;
                    else if (a[element.field] != null && b[element.field] == null)
                        result_1 = 1;
                    else if (a[element.field] == null && b[element.field] == null)
                        result_1 = 0;
                    else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                        result_1 = a[element.field].localeCompare(b[element.field]);
                    else
                        result_1 = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                    return (element.order * result_1);
                });
                this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                    if (a[element.field] == null && b[element.field] != null)
                        result_1 = -1;
                    else if (a[element.field] != null && b[element.field] == null)
                        result_1 = 1;
                    else if (a[element.field] == null && b[element.field] == null)
                        result_1 = 0;
                    else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                        result_1 = a[element.field].localeCompare(b[element.field]);
                    else
                        result_1 = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                    return (element.order * result_1);
                });
                this.lstDistribTypes = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
        // this.lstDistribTypes = [];
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    };
    AllocateDistributionTypesComponent.prototype.checkAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.endIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null || this.lstgridfilterData != undefined) {
                if (this.endIndex > this.lstgridfilterData.length) {
                    this.endIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.endIndex - 1; i++) {
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                }
            }
            else {
                if (this.endIndex > this.lstDistribTypes.length) {
                    this.endIndex = this.lstDistribTypes.length;
                }
                for (var i = this.startIndex; i <= this.endIndex - 1; i++) {
                    this.lstDistribTypes[i].CHK_VALUE = 1;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    AllocateDistributionTypesComponent.prototype.unCheckAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.endIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null || this.lstgridfilterData != undefined) {
                if (this.endIndex > this.lstgridfilterData.length) {
                    this.endIndex = this.lstgridfilterData.length;
                }
                for (var i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                }
            }
            else {
                if (this.endIndex > this.lstDistribTypes.length) {
                    this.endIndex = this.lstDistribTypes.length;
                }
                for (var i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.lstDistribTypes[i].CHK_VALUE = 0;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    AllocateDistributionTypesComponent.prototype.changeStatus = function (allocate) {
        try {
            var lstAllocateDistTypes = new Array();
            for (var x = 0; x < allocate.length; x++) {
                this.lstDistribTypes.push(allocate);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "changeStatus");
        }
    };
    AllocateDistributionTypesComponent.prototype.allocateDistributionTypes = function () {
        var _this = this;
        try {
            this.growlMessage = [];
            if (this.distribType != "") {
                this.searched = true;
            }
            else {
                this.searched = false;
            }
            if (this.selectedUserID == "Select User") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid UserId" });
                return;
            }
            this.spinnerService.start();
            var selectedDistbTypes_1 = linq_es5_1.asEnumerable(this.lstDistribData).Where(function (a) { return a.CHK_VALUE == 1; }).Select(function (a) { return a; }).ToArray();
            this.distribTypesService.allocateDistributionTypes(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedUserID, selectedDistbTypes_1, this.searched)
                .catch(this.httpService.handleError).then(function (res) {
                var webresp = res.json();
                switch (webresp.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        webresp.StatusMessage = "Updated Successfully";
                        _this.distribType = "";
                        _this.dataGrid = false;
                        _this.selectedDisplay = _this.ddlDisplay[0].value;
                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: webresp.StatusMessage });
                        if (_this.auditSatus == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                            for (var i = 0; i <= selectedDistbTypes_1.length - 1; i++) {
                                var auditData = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                auditData.FIELD_NAME = "CHK_VALUE";
                                auditData.OLD_VALUE = "0";
                                auditData.NEW_VALUE = "1";
                                auditData.KEY_1 = _this.selectedUserID;
                                auditData.KEY_2 = _this.appID;
                                auditData.KEY_3 = selectedDistbTypes_1[i].DISTRIB_TYPE;
                                auditData.KEY_4 = '';
                                auditData.KEY_5 = '';
                                _this.lstAuditData.push(auditData);
                            }
                            _this.spinnerService.start();
                            _this.commonService.insertAuditData(_this.lstAuditData, _this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], _this.menuCode).
                                catch(_this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            });
                        }
                        _this.spinnerService.stop();
                        if (_this.blnShowOrgGroupID) {
                            _this.selectedUserID = "Select User";
                        }
                        if (_this.blnShowOrgGroupLabel) {
                            _this.populateUsersDropDown();
                        }
                        break;
                    }
                    case AtParEnums_1.StatusType.Warn: {
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Error: {
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Custom: {
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "allocateDistributionTypes");
        }
    };
    AllocateDistributionTypesComponent.prototype.ddlOrgGrpIdChanged = function () {
        try {
            this.growlMessage = [];
            this.dataGrid = false;
            if (this.selectedOrgGroupID == 'Select One') {
                this.dataGrid = false;
                this.ddlUserId = [];
                this.ddlUserId.push({ label: 'Select User', value: 'Select User' });
            }
            else {
                this.populateUsersDropDown();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
    };
    AllocateDistributionTypesComponent.prototype.ddlUserChange = function () {
        this.dataGrid = false;
    };
    AllocateDistributionTypesComponent.prototype.ngOnDestroy = function () {
        this._deviceTokenEntry = [];
        this.growlMessage = [];
        this.orgGroupData = [];
        this.lstUserData = [];
        this.lblOrgGrpID = "";
        this.orgGrpID = "";
        this.lstOrgGroups = [];
        this.ddlUserId = [];
        this.ddlDisplay = [];
        this.lstDistribData = [];
        this.lstDistribTypes = [];
        //  this.lstCheckedDistribTypes = [];
        this.dataCheckedSorting = null;
        this.dataUncheckedSorting = null;
        this.selectedDistTypes = [];
        this.lstAuditData = [];
        this.spinnerService.stop();
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], AllocateDistributionTypesComponent.prototype, "dataTableComponent", void 0);
    AllocateDistributionTypesComponent = __decorate([
        core_1.Component({
            templateUrl: 'stis-allocate-distribution-types.component.html',
            providers: [atpar_common_service_1.AtParCommonService, HttpService_1.HttpService, stis_allocate_distribution_types_service_1.AllocateDistributionTypesService, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            stis_allocate_distribution_types_service_1.AllocateDistributionTypesService,
            AtParConstants_1.AtParConstants])
    ], AllocateDistributionTypesComponent);
    return AllocateDistributionTypesComponent;
}());
exports.AllocateDistributionTypesComponent = AllocateDistributionTypesComponent;
//# sourceMappingURL=stis-allocate-distribution-types.component.js.map