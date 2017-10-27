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
var VM_CART_SCHEDULES_1 = require("../entities/VM_CART_SCHEDULES");
var mt_crct_par_loc_schedule_details_1 = require("../entities/mt_crct_par_loc_schedule_details");
var MT_ATPAR_SCHEDULE_HEADER_1 = require("../Entities/MT_ATPAR_SCHEDULE_HEADER");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var cart_process_parameters_service_1 = require("./cart-process-parameters.service");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var linq_es5_1 = require("linq-es5");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var datatable_1 = require("../components/datatable/datatable");
var ProcessParametersComponent = (function () {
    function ProcessParametersComponent(httpService, cartProcessServices, spinnerService, commonService, atParConstant) {
        this.httpService = httpService;
        this.cartProcessServices = cartProcessServices;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.growlMessage = [];
        this.deviceTokenEntry = [];
        this.statusType = -1;
        this.lstGridData1 = new VM_CART_SCHEDULES_1.VM_CART_SCHEDULES();
        this.lstgridfilterData = null;
        this.ddlSchedId = [];
        this.ddlSelectedProcessData = new MT_ATPAR_SCHEDULE_HEADER_1.MT_ATPAR_SCHEDULE_HEADER();
        this.autoCompleteCartID = "";
        this.showGrid = false;
        this.ddlShowOrgGroupDD = false;
        this.blnShowOrgGroupLabel = false;
        this.selectedOrgGroupId = "";
        this.lstOrgGroupData = [];
        this.ddlBusinessData = [];
        this.businessDatangModel = "";
        this.previousSelected = '';
        this.ALL = "ALL";
        this.blnsortbycolumn = true;
    }
    ProcessParametersComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.spinnerService.start();
                    this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                    this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                    this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                    this.lstCheckedParLocation = new Array();
                    this.bindOrgGroups();
                    this.rowPageOptions = [];
                    this.rowPageOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
                    this.ddlSchedId = [];
                    this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                    this.spinnerService.start();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "ngOnInit");
                }
                return [2 /*return*/];
            });
        });
    };
    ProcessParametersComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupList = data.DataList;
                                        _this.ddlBusinessData.push({ label: "Select Org ID ", value: "" });
                                        if (_this.orgGroupList.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.lblOrgGroupId = _this.orgGroupList[0].ORG_GROUP_ID + " - " + _this.orgGroupList[0].ORG_GROUP_NAME;
                                            _this.selectedOrgGroupId = _this.orgGroupList[0].ORG_GROUP_ID;
                                            _this.populateBusinessUnits();
                                            break;
                                        }
                                        else if (_this.orgGroupList.length > 1) {
                                            _this.ddlShowOrgGroupDD = true;
                                            _this.lstOrgGroupData.push({ label: "Select One", value: "" });
                                            for (var i = 0; i < _this.orgGroupList.length; i++) {
                                                if (_this.orgGroupList[i].ORG_GROUP_ID != 'All') {
                                                    _this.lstOrgGroupData.push({ label: _this.orgGroupList[i].ORG_GROUP_ID + " - " + _this.orgGroupList[i].ORG_GROUP_NAME, value: _this.orgGroupList[i].ORG_GROUP_ID });
                                                }
                                            }
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
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
    ProcessParametersComponent.prototype.ddlOrgGrpIdChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.showGrid = false;
                    this.businessDatangModel = "";
                    this.autoCompleteCartID = "";
                    this.ddlBusinessData = [];
                    this.growlMessage = [];
                    this.ddlBusinessData.push({ label: "Select Org ID ", value: "" });
                    if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == "") {
                        return [2 /*return*/];
                    }
                    if (this.previousSelected == "" || event.label != this.previousSelected) {
                        this.previousSelected = this.selectedOrgGroupId;
                        this.spinnerService.start();
                        this.populateBusinessUnits();
                        this.spinnerService.stop();
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    ProcessParametersComponent.prototype.ddlBUnitChanged = function () {
        this.autoCompleteCartID = "";
        this.CartIdSearchLst = [];
        this.showGrid = false;
    };
    ProcessParametersComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isOrgBUnitsExist = false;
                        this.showGrid = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.lblOrgGroupId.split("-")[0].trim();
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstBusinessData = data.DataList;
                                        if (_this.lstBusinessData.length > 0) {
                                            for (var i = 0; i < _this.lstBusinessData.length; i++) {
                                                _this.ddlBusinessData.push({ label: _this.lstBusinessData[i].toString(), value: _this.lstBusinessData[i].toString() });
                                            }
                                        }
                                        isOrgBUnitsExist = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
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
    ProcessParametersComponent.prototype.searchAutoCompleteCartIdName = function (event) {
        var query = event.query;
        this.CartIdSearchLst = this.lstGridData;
        this.CartIdSearchLst = this.filterCartIdNames(query, this.CartIdSearchLst);
    };
    ProcessParametersComponent.prototype.filterCartIdNames = function (query, cartIdNames) {
        if (cartIdNames != null) {
            var filtered = [];
            if (query == "%") {
                for (var i = 0; i < cartIdNames.length; i++) {
                    var cartIdNamesValue = cartIdNames[i];
                    filtered.push(cartIdNamesValue.CART_ID);
                }
            }
            else {
                if (query.length >= 1) {
                    for (var i = 0; i < cartIdNames.length; i++) {
                        var cartIdNamesValue = cartIdNames[i];
                        if (cartIdNamesValue.CART_ID.toString().toUpperCase().indexOf(query.toString().toUpperCase()) == 0) {
                            filtered.push(cartIdNamesValue.CART_ID);
                        }
                    }
                }
            }
            return filtered;
        }
    };
    ProcessParametersComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.ddlShowOrgGroupDD) {
                            if (this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "") {
                                this.showGrid = false;
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                                return [2 /*return*/];
                            }
                        }
                        if (this.businessDatangModel == "" || this.businessDatangModel == "0" || this.businessDatangModel == null) {
                            this.showGrid = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org ID" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.PopulateCarts()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "btnGo_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.PopulateCarts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var orgGroupId, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstgridfilterData = null;
                        this.showGrid = false;
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        orgGroupId = void 0;
                        if (this.blnShowOrgGroupLabel) {
                            orgGroupId = this.lblOrgGroupId.split("-")[0];
                        }
                        else {
                            orgGroupId = this.selectedOrgGroupId;
                        }
                        if (this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] != "All") {
                            orgGroupId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.cartProcessServices.GetProcessParametersCarts(orgGroupId, this.businessDatangModel, this.autoCompleteCartID, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, dataList, x, sortedUnCheckedData;
                                return __generator(this, function (_a) {
                                    data = res.json();
                                    this.spinnerService.stop();
                                    switch (data.StatType) {
                                        case AtParEnums_1.StatusType.Success: {
                                            this.lstGridData = new Array();
                                            dataList = data.DataList;
                                            for (x = 0; x < dataList.length; x++) {
                                                if (dataList[x].ASSIGN_CART == "Y") {
                                                    dataList[x].ASSIGN_CART = true;
                                                }
                                                else {
                                                    dataList[x].ASSIGN_CART = false;
                                                }
                                                this.lstGridData1 = new VM_CART_SCHEDULES_1.VM_CART_SCHEDULES();
                                                this.lstGridData1.CART_ID = dataList[x].CART_ID;
                                                this.lstGridData1.BUSINESS_UNIT = dataList[x].BUSINESS_UNIT;
                                                this.lstGridData1.ASSIGN_CART = dataList[x].ASSIGN_CART;
                                                this.lstGridData1.SCHEDULER = dataList[x].SCHEDULER;
                                                this.lstGridData.push(this.lstGridData1);
                                            }
                                            this.lstGridData = linq_es5_1.asEnumerable(this.lstGridData).OrderByDescending(function (x) { return x.ASSIGN_CART; }).ToArray();
                                            sortedUnCheckedData = linq_es5_1.asEnumerable(this.lstGridData).OrderBy(function (x) { return x.ASSIGN_CART; }).ToArray();
                                            this.lstGridData = new Array();
                                            this.lstGridData = sortedUnCheckedData.reverse();
                                            if (this.lstGridData.length >= 1) {
                                                this.growlMessage = [];
                                                this.showGrid = true;
                                                //this.ddlSchedId = [];
                                                //this.ddlSchedId.push({ label: "Select one", value: "" })
                                            }
                                            else {
                                                this.showGrid = false;
                                            }
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error:
                                            {
                                                this.growlMessage = [];
                                                this.statusMesssage = data.StatusMessage;
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                this.showGrid = false;
                                                break;
                                            }
                                        case AtParEnums_1.StatusType.Warn:
                                            {
                                                this.growlMessage = [];
                                                this.statusMesssage = data.StatusMessage;
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                this.showGrid = false;
                                                break;
                                            }
                                        case AtParEnums_1.StatusType.Custom:
                                            {
                                                this.growlMessage = [];
                                                this.statusMesssage = data.StatusMessage;
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                this.showGrid = false;
                                                break;
                                            }
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getSheduleIds()];
                    case 3:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "PopulateCarts");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.getSheduleIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var orgGroupId, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        orgGroupId = void 0;
                        //if (this.blnShowOrgGroupLabel) {
                        //    orgGroupId = this.lblOrgGroupId;
                        //} else {
                        //    orgGroupId = this.selectedOrgGroupId;
                        //}
                        //if (this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID] != "All") {
                        orgGroupId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        //}
                        this.spinnerService.start();
                        return [4 /*yield*/, this.cartProcessServices.GetSheduleIdata(orgGroupId)
                                .then(function (res) {
                                _this.spinnerService.stop();
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.ddlSchedId = [];
                                            _this.ddlSchedId.push({ label: "Select one", value: "" });
                                            _this.lstScheduleData = data.DataList;
                                            for (var i = 0; i < _this.lstScheduleData.length; i++) {
                                                _this.ddlSchedId.push({ label: _this.lstScheduleData[i].SCHEDULE_ID, value: _this.lstScheduleData[i].SCHEDULE_ID });
                                            }
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.statusMesssage = data.StatusMessage;
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.statusMesssage = data.StatusMessage;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Custom:
                                        {
                                            _this.statusMesssage = data.StatusMessage;
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
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "getSheduleIds");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.changeStatus = function (cartdata) {
        try {
            var lstCartSchedules = cartdata;
            for (var x = 0; x < lstCartSchedules.length; x++) {
                if (lstCartSchedules[x].ASSIGN_CART == true) {
                    lstCartSchedules[x].ASSIGN_CART = "1";
                }
                else {
                    lstCartSchedules[x].ASSIGN_CART = false;
                }
                this.lstGridData1 = new VM_CART_SCHEDULES_1.VM_CART_SCHEDULES();
                this.lstGridData1.CART_ID = lstCartSchedules[x].CART_ID;
                this.lstGridData1.ASSIGN_CART = lstCartSchedules[x].ASSIGN_CART;
                this.lstGridData1.SCHEDULER = lstCartSchedules[x].SCHEDULER;
                this.lstGridData.push(this.lstGridData1);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "changeStatus");
        }
    };
    ProcessParametersComponent.prototype.btnSubmit_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var data, schedules, x, scheduleDetails, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.lblOrgGroupId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.spinnerService.start();
                        if (!(this.lstGridData != null)) return [3 /*break*/, 2];
                        data = this.lstGridData.filter(function (x) { return x.ASSIGN_CART == true && x.SCHEDULER == ""; });
                        if (data == null || data.length > 0) {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            return [2 /*return*/, this.growlMessage.push({ severity: "warn", summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Inventory Schedule" })];
                            ;
                        }
                        schedules = this.lstGridData;
                        this.lstScheduleDetails = Array();
                        for (x = 0; x < schedules.length; x++) {
                            scheduleDetails = new mt_crct_par_loc_schedule_details_1.MT_CRCT_PAR_LOC_SCHEDULE_DETAILS();
                            if (schedules[x].ASSIGN_CART == true) {
                                scheduleDetails.CHK_VALUE = "1";
                                scheduleDetails.PAR_LOC_ID = schedules[x].CART_ID;
                                scheduleDetails.SCHEDULE_ID = schedules[x].SCHEDULER;
                                this.lstScheduleDetails.push(scheduleDetails);
                            }
                            else {
                                scheduleDetails.CHK_VALUE = "0";
                                scheduleDetails.PAR_LOC_ID = schedules[x].CART_ID;
                                scheduleDetails.SCHEDULE_ID = schedules[x].SCHEDULER;
                                scheduleDetails.ORG_GROUP_ID = " ";
                                scheduleDetails.ORG_ID = " ";
                                this.lstScheduleDetails.push(scheduleDetails);
                            }
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.cartProcessServices.AssignScheduleToCarts(this.lstScheduleDetails, this.orgGroupIDForDBUpdate.trim(), this.businessDatangModel)
                                .catch(this.httpService.handleError).then(function (webresponse) {
                                var response = webresponse.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.growlMessage = [];
                                            _this.showGrid = false;
                                            _this.businessDatangModel = '';
                                            // this.selectedOrgGroupId = '';
                                            _this.autoCompleteCartID = '';
                                            _this.growlMessage.push({ severity: "success", summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully" });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.growlMessage = [];
                                            _this.statusMesssage = response.StatusMessage;
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.statusMesssage = response.StatusMessage;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Custom:
                                        {
                                            _this.statusMesssage = response.StatusMessage;
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.spinnerService.stop();
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
    ProcessParametersComponent.prototype.onSort1 = function (event) {
        try {
            if (event.data != null && event.data.length > 0) {
                for (var x = 0; x < event.data.length; x++) {
                    event.data[x].ASSIGN_CART = false;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onSort1");
        }
    };
    ProcessParametersComponent.prototype.onSort = function (event) {
        try {
            var element = event;
            this.blnsortbycolumn = !this.blnsortbycolumn;
            var checkedData = linq_es5_1.asEnumerable(this.lstGridData).Where(function (a) { return a.ASSIGN_CART == 1; }).ToArray();
            var unCheckedData = linq_es5_1.asEnumerable(this.lstGridData).Where(function (a) { return a.ASSIGN_CART == 0; }).ToArray();
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
                    this.lstGridData = checkedData.reverse().concat(unCheckedData.reverse()); // sortedUnCheckedData.reverse();
                }
                else {
                    this.lstGridData = checkedData.concat(unCheckedData);
                }
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "onSort");
        }
    };
    ProcessParametersComponent.prototype.checkAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null || this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].ASSIGN_CART = true;
                }
            }
            else {
                if (this.EndIndex > this.lstGridData.length) {
                    this.EndIndex = this.lstGridData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstGridData[i].ASSIGN_CART = true;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    ProcessParametersComponent.prototype.unCheckAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null || this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].ASSIGN_CART = false;
                }
            }
            else {
                if (this.EndIndex > this.lstGridData.length) {
                    this.EndIndex = this.lstGridData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstGridData[i].ASSIGN_CART = false;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    ProcessParametersComponent.prototype.filterdata = function (event) {
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    ProcessParametersComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ProcessParametersComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.orgGroupList = null;
        this.CartIdSearchLst = null;
        this.growlMessage = null;
        this.lstGridData = null;
        this.lstScheduleData = null;
        this.lstGridData1 = null;
        this.growlMessage = null;
        this.lstGridData1 = null;
        this.spinnerService.stop();
        this.lstOrgGroupData = null;
        this.lblOrgGroupId = null;
        this.ddlBusinessData = null;
        this.businessDatangModel = null;
        this.previousSelected = null;
        this.lstBusinessData = null;
        this.orgGroupIDForDBUpdate = null;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], ProcessParametersComponent.prototype, "dataTableComponent", void 0);
    ProcessParametersComponent = __decorate([
        core_1.Component({
            templateUrl: 'cart-process-parameters.component.html',
            providers: [cart_process_parameters_service_1.CartProcessServices, atpar_common_service_1.AtParCommonService, HttpService_1.HttpService, AtParConstants_1.AtParConstants],
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            cart_process_parameters_service_1.CartProcessServices,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            AtParConstants_1.AtParConstants])
    ], ProcessParametersComponent);
    return ProcessParametersComponent;
}());
exports.ProcessParametersComponent = ProcessParametersComponent;
//# sourceMappingURL=cart-process-parameters.component.js.map