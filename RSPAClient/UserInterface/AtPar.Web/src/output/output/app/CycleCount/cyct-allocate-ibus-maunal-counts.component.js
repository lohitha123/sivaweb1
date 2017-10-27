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
var datatableservice_1 = require("../components/datatable/datatableservice");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var HttpService_1 = require("../Shared/HttpService");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AllocateIBUsManualCountsComponent = (function () {
    function AllocateIBUsManualCountsComponent(datatableservice, commonService, httpService, atParConstant, spinnerService) {
        this.datatableservice = datatableservice;
        this.commonService = commonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.spinnerService = spinnerService;
        this.isVisible = false;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstOrgGroups = [];
        this.ddlUserID = [];
        this.selectedOrgGroupID = "";
        this.selectedDescription = "";
        this.lstFilteredBUnits = [];
        this.lstBUnits = [];
        this.selectedBunit = "";
        this.blnsortbycolumn = false;
        this.showGrid = false;
        this.preField = "";
        this.dataCheckedSorting = [];
    }
    AllocateIBUsManualCountsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.lstCheckedBUnits = new Array();
                        this.dataCheckedSorting = new Array();
                        this.dataUncheckedSorting = new Array();
                        this.lstFilteredBUnits = new Array();
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateIBUsManualCountsComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var orgGroups = res.json();
                                _this.spinnerService.stop();
                                switch (orgGroups.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ddlUserID.push({ label: "Select User", value: "Select User" });
                                        _this.orgGroupData = orgGroups.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.lblOrgGrpID = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGrpID = _this.orgGroupData[0].ORG_GROUP_ID;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupID = true;
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID != "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                        }
                                        if (_this.blnShowOrgGroupLabel) {
                                            _this.populateUsersDropDown();
                                            _this.populateBunitsDdlst();
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
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        exMsg_1 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(exMsg_1, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateIBUsManualCountsComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isVisible = false;
                        this.growlMessage = [];
                        if (this.selectedOrgGroupID == "Select One") {
                            this.ddlUserID = [];
                            this.ddlUserID.push({ label: "Select User", value: "Select User" });
                            return [2 /*return*/];
                        }
                        this.selectedUserID = "";
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.populateUsersDropDown()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.populateBunitsDdlst()];
                    case 3:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "ddlOrgGrpIdChanged");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AllocateIBUsManualCountsComponent.prototype.populateBunitsDdlst = function () {
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
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupID;
                        }
                        this.spinnerService.start();
                        if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupID) {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.lstBUnits = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstBUnits = data.DataList;
                                        isOrgBUnitsExist = true;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
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
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "populateBunitsDdlst");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateIBUsManualCountsComponent.prototype.populateUsersDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exMsg_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.ddlUserID = [];
                        this.selectedUserID = "";
                        if (this.blnShowOrgGroupLabel) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        if (this.blnShowOrgGroupID) {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupID;
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUsersList(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_1.EnumApps.CycleCount, this.orgGroupIDForDBUpdate)
                                .catch(this.httpService.handleError).then(function (res) {
                                var webresp = res.json();
                                _this.spinnerService.stop();
                                _this.ddlUserID.push({ label: "Select User", value: "Select User" });
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstUserData = webresp.DataList;
                                        if (_this.lstUserData.length > 0) {
                                            for (var i = 0; i < _this.lstUserData.length; i++) {
                                                _this.ddlUserID.push({ label: _this.lstUserData[i].FULLNAME, value: _this.lstUserData[i].USER_ID });
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
                        return [3 /*break*/, 3];
                    case 2:
                        exMsg_2 = _a.sent();
                        this.clientErrorMsg(exMsg_2, "populateUsersDropDown");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateIBUsManualCountsComponent.prototype.fillBUnitsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstFilteredBUnits = [];
                        query = event.query;
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupID;
                        }
                        if (this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "Select One") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                _this.spinnerService.stop();
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstBUnits = data.DataList;
                                        _this.lstFilteredBUnits = _this.filterBusinessUnits(query, _this.lstBUnits);
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.StatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
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
                        this.clientErrorMsg(ex_4, "fillBUnitsAuto");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateIBUsManualCountsComponent.prototype.filterBusinessUnits = function (query, businessunits) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < businessunits.length; i++) {
                var Bunitvalue = businessunits[i];
                filtered.push(Bunitvalue);
            }
        }
        else {
            if (query.length >= 1) {
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
    AllocateIBUsManualCountsComponent.prototype.checkAll = function () {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
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
    AllocateIBUsManualCountsComponent.prototype.unCheckAll = function () {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
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
    AllocateIBUsManualCountsComponent.prototype.filterdata = function (event) {
        this.lstgridfilterData = [];
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    //customSort1(event) {
    //    try {
    //        var element = event;
    //        this.lstDBData = [];
    //        this.blnsortbycolumn = !this.blnsortbycolumn;
    //        let sortedcheckedrec = [];
    //        let sorteduncheckedrec = [];
    //        sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
    //            if (a[element.field] < b[element.field])
    //                return -1;
    //            if (a[element.field] > b[element.field])
    //                return 1;
    //            return 0;
    //        });
    //        sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
    //            if (a[element.field] < b[element.field])
    //                return -1;
    //            if (a[element.field] > b[element.field])
    //                return 1;
    //            return 0;
    //        });
    //        if (this.blnsortbycolumn == false) {
    //            this.lstDBData = [];
    //            this.lstDBData = sortedcheckedrec.reverse().concat(sorteduncheckedrec.reverse());
    //        }
    //        else {
    //            this.lstDBData = [];
    //            this.lstDBData = sortedcheckedrec.concat(sorteduncheckedrec);
    //        }
    //        sortedcheckedrec = [];
    //        sorteduncheckedrec = [];
    //    }
    //    catch (ex) {
    //        this.clientErrorMsg(ex, "customSort");
    //    }
    //}
    AllocateIBUsManualCountsComponent.prototype.customSort = function (event, field) {
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
        var dataChecked = [];
        var dataUnchecked = [];
        var result = null;
        var order;
        try {
            dataChecked = this.dataCheckedSorting.sort(function (a, b) {
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
            dataUnchecked = this.dataUncheckedSorting.sort(function (a, b) {
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
        this.lstDBData = this.dataCheckedSorting.concat(this.dataUncheckedSorting);
        dataChecked = [];
        dataUnchecked = [];
    };
    AllocateIBUsManualCountsComponent.prototype.getAllBUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isBUnitsExists, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstgridfilterData = null;
                        this.isVisible = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupID;
                        }
                        if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupID) {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        if (this.selectedUserID === "Select User" || this.selectedUserID === "undefined" || this.selectedUserID == "") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User ID' });
                            this.showGrid = false;
                            return [2 /*return*/, false];
                        }
                        this.lstDBData = new Array();
                        return [4 /*yield*/, this.populateBunitsDdlst()];
                    case 2:
                        isBUnitsExists = _a.sent();
                        if (isBUnitsExists == true) {
                            this.spinnerService.start();
                            this.commonService.getBUs(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.lstBUnits, AtParEnums_1.EnumApps.CycleCount, this.selectedUserID, this.selectedBunit, this.selectedDescription)
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
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
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.isVisible = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.isVisible = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.isVisible = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "getAllBUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateIBUsManualCountsComponent.prototype.BindDataGrid = function () {
        try {
            var lstDBDataList;
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
            this.showGrid = true;
            this.isVisible = true;
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    };
    AllocateIBUsManualCountsComponent.prototype.allocateBUnits = function () {
        var _this = this;
        try {
            if ((this.selectedBunit != null && this.selectedBunit != undefined && this.selectedBunit != "") || (this.selectedDescription != null && this.selectedDescription != undefined && this.selectedDescription != "")) {
                this.searched = true;
            }
            else {
                this.searched = false;
            }
            this.allocateDBData = new Array();
            this.spinnerService.start();
            for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].checkvalue == true) {
                    this.lstDBData[i].CHK_ALLOCATED = 1;
                    this.lstDBData[i].CHK_VALUE = 1;
                }
                else {
                    this.lstDBData[i].CHK_ALLOCATED = 0;
                    this.lstDBData[i].CHK_VALUE = 0;
                }
            }
            this.allocateDBData = this.lstDBData;
            if (!this.searched) {
                this.allocateDBData = this.lstDBData.filter(function (obj) { return obj.CHK_VALUE == 1; });
            }
            this.commonService.allocateBUnits(AtParEnums_1.EnumApps.CycleCount, this.selectedUserID, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.allocateDBData, this.searched)
                .catch(this.httpService.handleError).then(function (res) {
                var response = res.json();
                _this.growlMessage = [];
                switch (response.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                        if (_this.blnShowOrgGroupID) {
                            _this.ddlUserID = [];
                            _this.ddlUserID.push({ label: "Select User", value: "Select User" });
                        }
                        _this.selectedUserID = "";
                        _this.selectedOrgGroupID = "";
                        _this.selectedDescription = "";
                        _this.selectedBunit = "";
                        _this.isVisible = false;
                        _this.spinnerService.stop();
                        _this.lstDBData = [];
                        break;
                    }
                    case AtParEnums_1.StatusType.Warn: {
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                        _this.spinnerService.stop();
                        break;
                    }
                    case AtParEnums_1.StatusType.Error: {
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                        _this.spinnerService.stop();
                        _this.showGrid = false;
                        break;
                    }
                    case AtParEnums_1.StatusType.Custom: {
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                        _this.spinnerService.stop();
                        _this.showGrid = false;
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "allocateBUnits");
        }
    };
    AllocateIBUsManualCountsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    AllocateIBUsManualCountsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstFilteredBUnits = [];
        this.ddlUserID = [];
        this.lstBUnits = [];
        this.lstOrgGroups = [];
        this.lstCheckedBUnits = [];
        this.lstDBData = [];
        this.growlMessage = [];
        this.deviceTokenEntry = [];
        this.lstgridfilterData = [];
        this.allocateDBData = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        this.orgGroupData = [];
        this.spinnerService.stop();
    };
    AllocateIBUsManualCountsComponent = __decorate([
        core_1.Component({
            templateUrl: 'cyct-allocate-ibus-maunal-counts.component.html',
            providers: [datatableservice_1.datatableservice, HttpService_1.HttpService, AtParConstants_1.AtParConstants, atpar_common_service_1.AtParCommonService]
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            event_spinner_service_1.SpinnerService])
    ], AllocateIBUsManualCountsComponent);
    return AllocateIBUsManualCountsComponent;
}());
exports.AllocateIBUsManualCountsComponent = AllocateIBUsManualCountsComponent;
//# sourceMappingURL=cyct-allocate-ibus-maunal-counts.component.js.map