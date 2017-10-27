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
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var pou_department_location_workstation_allocation_service_1 = require("./pou-department-location-workstation-allocation.service");
var MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS_1 = require("../../app/Entities/MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS");
var linq_es5_1 = require("linq-es5");
var DepartmentLocationWorkstationAllocationComponent = (function () {
    function DepartmentLocationWorkstationAllocationComponent(atParCommonService, httpService, spinnerService, PouDeptLocWrkAllocService, atParConstant) {
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.PouDeptLocWrkAllocService = PouDeptLocWrkAllocService;
        this.atParConstant = atParConstant;
        this.deviceTokenEntry = [];
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.orgGrpID = "";
        this.orgGrpIDData = "";
        this.bunitsData = [];
        this.workstationsData = [];
        this.selectedWorkSationID = "";
        this.selectedOrgGroupId = "";
        this.selectedDeptID = "";
        this.selectedLocType = "";
        this.selectedBunit = "";
        this.growlMessage = [];
        this.showgrid = false;
        this.lstSearch = [];
        this.selectedSearch = "";
        ///workstationsIDs
        this.lstFilteredWorkstationsIDs = [];
        this.dataCheckedSorting = [];
        this.blnsortbycolumn = true;
        this.preField = "";
    }
    DepartmentLocationWorkstationAllocationComponent.prototype.ngOnInit = function () {
        this.spinnerService.start();
        this.growlMessage = [];
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.pazeSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedBUnits = new Array();
        this.dataCheckedSorting = new Array();
        this.dataUncheckedSorting = new Array();
        //for org group data
        this.bindUserOrgGroups();
        this.populateLocTypeDD();
        this.populateDisplayTypeDD();
        this.lstBunit = [];
        this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });
        this.lstDept = [];
        this.lstDept.push({ label: "Select Department", value: "Select Department" });
        this.showgrid = false;
        this.selectedSearch = '0';
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.populateDisplayTypeDD = function () {
        this.lstSearch.push({ label: 'All', value: '0' }, { label: 'Allocated', value: '1' }, { label: 'Unallocated', value: '2' });
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.bindUserOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                //  this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpIDData = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGrpID = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.populateData();
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstBunit = [];
                                            _this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                                            _this.lstOrgGroups = [];
                                            _this.lstOrgGroups.push({ label: "Select OrgGrpID", value: "Select OrgGrpID" });
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
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
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
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.populateData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isDeptExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.PopulateDepts()];
                    case 1:
                        isDeptExists = _a.sent();
                        if (!(isDeptExists == true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.populateBusinessUnits()];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        _a.label = 3;
                    case 3:
                        this.populateLocTypeDD();
                        return [2 /*return*/];
                }
            });
        });
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isDeptExists, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.showgrid = false;
                        this.lstDept = [];
                        this.lstDept.push({ label: "Select Department", value: "Select Department" });
                        if (this.selectedOrgGroupId == "Select OrgGrpID") {
                            this.lstBunit = [];
                            this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                            this.lstDept = [];
                            this.lstDept.push({ label: "Select Department", value: "Select Department" });
                            this.lstLocType = [];
                            this.lstLocType.push({ label: "Select Loc Type", value: "Select Loc Type" });
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        this.selectedBunit = "";
                        this.selectedDeptID = "";
                        this.selectedLocType = "";
                        return [4 /*yield*/, this.PopulateDepts()];
                    case 2:
                        isDeptExists = _a.sent();
                        if (!(isDeptExists == true)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.populateBusinessUnits()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.lstBunit = [];
                        this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                        _a.label = 5;
                    case 5:
                        this.populateLocTypeDD();
                        this.spinnerService.stop();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_2 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.ddl_Change = function () {
        this.showgrid = false;
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.PopulateDepts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isDeptExixt, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isDeptExixt = false;
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select OrgGrpID" || this.orgGroupIDForDBUpdate == undefined) {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.PouDeptLocWrkAllocService.getUserDepartments(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstDept = [];
                                        _this.lstDept.push({ label: "Select Department", value: "Select Department" });
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstDept.push({
                                                label: data.DataList[i].DEPARTMENT_ID + "-" + data.DataList[i].DEPT_NAME,
                                                value: data.DataList[i].DEPARTMENT_ID
                                            });
                                        }
                                        isDeptExixt = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        if (data.StatusCode == 1102002) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Department(s) Allocated To User" });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        isDeptExixt = false;
                                        _this.selectedBunit = "";
                                        _this.selectedDeptID = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.selectedBunit = "";
                                        _this.selectedDeptID = "";
                                        isDeptExixt = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.selectedBunit = "";
                                        _this.selectedDeptID = "";
                                        isDeptExixt = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(isDeptExixt)];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isOrgBUnitsExist = false;
                        this.spinnerService.start();
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select OrgGrpID" || this.orgGroupIDForDBUpdate == undefined) {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        this.lstBunit = [];
                        this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParCommonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.bunitsData = data.DataList;
                                        for (var i = 0; i < _this.bunitsData.length; i++) {
                                            _this.lstBunit.push({
                                                label: _this.bunitsData[i],
                                                value: _this.bunitsData[i]
                                            });
                                        }
                                        isOrgBUnitsExist = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
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
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.populateLocTypeDD = function () {
        this.lstLocType = [];
        this.lstLocType.push({ label: "Select Loc Type", value: "Select Loc Type" });
        this.lstLocType.push({ label: "Inventory", value: "I" });
        this.lstLocType.push({ label: "Par", value: "P" });
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.btn_go_Click = function () {
        this.growlMessage = [];
        this.showgrid = false;
        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpID;
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }
        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select OrgGrpID" || this.orgGroupIDForDBUpdate == undefined) {
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
            return;
        }
        ///department ID
        if (this.selectedDeptID == null || this.selectedDeptID == "" || this.selectedDeptID == "Select Department" || this.selectedDeptID == undefined) {
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Department" });
            return;
        }
        ///Location Type
        if (this.selectedLocType == null || this.selectedLocType == "" || this.selectedLocType == "Select Loc Type" || this.selectedLocType == undefined) {
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Location Type" });
            return;
        }
        /////Bunit 
        if (this.selectedBunit == null || this.selectedBunit == "" || this.selectedBunit == "Select BUnit" || this.selectedBunit == undefined) {
            this.selectedBunit = "";
        }
        this.GetData();
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.GetData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.PouDeptLocWrkAllocService.GetDeptAllocCarts(this.selectedBunit, "", +this.selectedSearch, this.selectedLocType, 15, this.selectedDeptID, this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstDBData = [];
                                        _this.lstDBData = data.DataList;
                                        if (data.DataDictionary != null && data.DataDictionary != undefined) {
                                            if (data.DataDictionary['allocatedlist'] != null && data.DataDictionary['allocatedlist'] != '' && data.DataDictionary['allocatedlist'] != undefined) {
                                                _this.dataCheckedSorting = [];
                                                _this.dataCheckedSorting = data.DataDictionary['allocatedlist'];
                                            }
                                            if (data.DataDictionary['unallocatedlist'] != null && data.DataDictionary['unallocatedlist'] != '' && data.DataDictionary['unallocatedlist'] != undefined) {
                                                _this.dataUncheckedSorting = [];
                                                _this.dataUncheckedSorting = data.DataDictionary['unallocatedlist'];
                                            }
                                        }
                                        _this.binddata();
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.showgrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
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
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.binddata = function () {
        var _this = this;
        this.lstDBMainDetails = [];
        this.lblcountmsg = "";
        var count = this.lstDBData.length;
        this.lblcountmsg = count + " Record(s) Found";
        for (var k = 0; k < this.lstDBData.length; k++) {
            this.lstDBMainDetails.push(this.lstDBData[k]);
        }
        this.showgrid = false;
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        for (var it = 0; it < this.lstDBData.length; it++) {
            for (var item = 0; item < this.lstDBData[it].DETAILS.length; item++) {
                if (this.lstDBData[it].DETAILS[item].FLAG == "I") {
                    this.lstDBData[it].DETAILS[item].chkvalue = true;
                }
                else {
                    this.lstDBData[it].DETAILS[item].chkvalue = false;
                }
            }
        }
        if (this.selectedSearch == "1") {
            //only allocated
            this.lstDBData = this.lstDBData.filter(function (x) { return x.Allocated == 'Y'; });
            if (this.lstDBData.length == 0) {
                this.showgrid = false;
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                return;
            }
        }
        else if (this.selectedSearch === "2") {
            this.lstDBData = this.lstDBData.filter(function (x) { return x.Allocated == 'N'; });
            if (this.lstDBData.length == 0) {
                this.showgrid = false;
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                return;
            }
        }
        else {
            this.lstDBData = this.lstDBData;
        }
        if (this.selectedWorkSationID != null && this.selectedWorkSationID != undefined && this.selectedWorkSationID != "") {
            var rows = linq_es5_1.asEnumerable(this.lstDBData).Where(function (x) { return x.DEPARTMENT_ID == _this.selectedDeptID
                && x.WORKSTATION_ID == _this.selectedWorkSationID; }).ToArray();
            this.lstDBData = [];
            this.lstDBData = rows;
            if (this.lstDBData == null || this.lstDBData == undefined || this.lstDBData.length == 0) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                return;
            }
        }
        ////sorting for custom sort
        for (var it = 0; it < this.lstDBData.length; it++) {
            if (linq_es5_1.asEnumerable(this.lstDBData[it].DETAILS).Any(function (x) { return x.FLAG == "I"; })) {
                this.dataCheckedSorting.push(this.lstDBData[it]);
            }
            else {
                this.dataUncheckedSorting.push(this.lstDBData[it]);
            }
        }
        //  list.Sort((a, b) => a.Item2.CompareTo(b.Item2)); 
        this.showgrid = true;
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.GetCartHeaderDetails = function (workstationId) {
        var _this = this;
        this.lstAllocatedDatalist = [];
        try {
            if (workstationId != null && workstationId != undefined) {
                this.lstCartHeader.forEach(function (header) {
                    var rows = linq_es5_1.asEnumerable(_this.lstAllocatedCarts).Where(function (x) { return x.DEPARTMENT_ID == _this.selectedDeptID && x.BUSINESS_UNIT == header.BUSINESS_UNIT
                        && x.CART_ID == header.LOCATION && x.WORKSTATION_ID == workstationId; }).ToArray();
                    var data;
                    data = new MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS_1.MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS;
                    data.BUSINESS_UNIT = header.BUSINESS_UNIT;
                    data.CART_ID = header.LOCATION;
                    data.LOCATION_DESCR = header.LOCATION_DESCR;
                    data.LOCATION_TYPE = header.LOCATION_TYPE;
                    if (rows.length > 0) {
                        data.PRIORITY = rows[0].PRIORITY;
                        data.FLAG = rows[0].FLAG;
                    }
                    else {
                        data.PRIORITY = 3;
                        data.FLAG = "D";
                    }
                    _this.lstAllocatedDatalist.push(data);
                });
                for (var i = 0; i < this.lstAllocatedDatalist.length; i++) {
                    if (this.lstAllocatedDatalist[i].FLAG == "I") {
                        this.lstAllocatedDatalist[i].chkvalue = true;
                    }
                    else {
                        this.lstAllocatedDatalist[i].chkvalue = false;
                    }
                }
            }
        }
        catch (ex) {
            this.lstAllocatedDatalist = [];
        }
        finally {
            workstationId = null;
            return this.lstAllocatedDatalist;
        }
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.Save_Click = function () {
        this.spinnerService.start();
        this.growlMessage = [];
        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpID;
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }
        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select OrgGrpID" || this.orgGroupIDForDBUpdate == undefined) {
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
            return;
        }
        ///department ID
        if (this.selectedDeptID == null || this.selectedDeptID == "" || this.selectedDeptID == "Select Department" || this.selectedDeptID == undefined) {
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Department" });
            return;
        }
        ///Location Type
        if (this.selectedLocType == null || this.selectedLocType == "" || this.selectedLocType == "Select Loc Type" || this.selectedLocType == undefined) {
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Location Type" });
            return;
        }
        this.SaveData();
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.SaveData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.PouDeptLocWrkAllocService.SaveDeptCartAllocations(this.lstDBMainDetails, this.selectedDeptID, 15)
                                .then(function (response) {
                                var data = response.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Saved Successfully..." });
                                        _this.spinnerService.stop();
                                        _this.showgrid = false;
                                        _this.lstDept = [];
                                        _this.lstDBData = [];
                                        _this.lstOrgGroups = [];
                                        _this.lstOrgGroups.push({ label: "Select OrgGrpID", value: "Select OrgGrpID" });
                                        _this.selectedOrgGroupId = "";
                                        _this.selectedBunit = "";
                                        _this.selectedDeptID = "";
                                        _this.selectedLocType = "";
                                        _this.selectedSearch = "";
                                        _this.bindUserOrgGroups();
                                        _this.lstDept.push({ label: "Select Department", value: "Select Department" });
                                        //this.selectedOrgGroupId = "";
                                        // this.orgGroupIDForDBUpdate = "";
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
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
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.changeStatus = function (values, statusType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.spinnerService.start();
                if (values.FLAG == "I") {
                    if (statusType == '1') {
                        values.PRIORITY = 1;
                    }
                    else if (statusType == '2') {
                        values.PRIORITY = 2;
                    }
                    else {
                        values.PRIORITY = 100;
                    }
                }
                else {
                    values.PRIORITY = 3;
                    statusType = '3';
                }
                this.spinnerService.stop();
                return [2 /*return*/];
            });
        });
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.fillWorkStationIDSAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query_1, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        query_1 = event.query;
                        return [4 /*yield*/, this.PouDeptLocWrkAllocService.GetCartWorkstations(this.selectedDeptID, this.selectedBunit, this.orgGroupIDForDBUpdate, 15).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstWrkStationDetails = data.DataList;
                                        _this.maintainWorkStationIDs();
                                        _this.lstFilteredWorkstationsIDs = _this.filterFilteredWrksDetails(query_1, _this.workstationsData);
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
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
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.maintainWorkStationIDs = function () {
        this.workstationsData = [];
        for (var j = 0; j < this.lstWrkStationDetails.length; j++) {
            this.workstationsData.push(this.lstWrkStationDetails[j].WORKSTATION_ID);
        }
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.filterFilteredWrksDetails = function (query, workstations) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < workstations.length; i++) {
                var Bunitvalue = workstations[i];
                filtered.push(Bunitvalue);
            }
        }
        else {
            if (query.length >= 1) {
                for (var i = 0; i < workstations.length; i++) {
                    var Bunitvalue = workstations[i];
                    if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(Bunitvalue);
                    }
                }
            }
        }
        return filtered;
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.customSort = function (event, field) {
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
            this.clientErrorMsg(ex);
        }
        this.lstDBData = [];
        this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.selectedRow = function (values, event) {
        if (event == true) {
            values.FLAG = "I";
            values.PRIORITY = "100";
        }
        else {
            values.FLAG = "D";
            values.PRIORITY = "3";
        }
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.myfilterdata = function (event) {
        if (event != null) {
            this.lblcountmsg = "";
            var count = event.length;
            this.lblcountmsg = count + " record(s) found";
        }
        else {
            this.lblcountmsg = "";
            var count1 = this.lstDBData.length;
            this.lblcountmsg = count1 + " record(s) found";
        }
    };
    DepartmentLocationWorkstationAllocationComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstDBData = null;
        this.orgGroupData = null;
        this.growlMessage = null;
    };
    DepartmentLocationWorkstationAllocationComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-department-location-workstation-allocation.component.html',
            providers: [HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, pou_department_location_workstation_allocation_service_1.POUDeptLocWrkAllocService]
        }),
        __metadata("design:paramtypes", [atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            pou_department_location_workstation_allocation_service_1.POUDeptLocWrkAllocService,
            AtParConstants_1.AtParConstants])
    ], DepartmentLocationWorkstationAllocationComponent);
    return DepartmentLocationWorkstationAllocationComponent;
}());
exports.DepartmentLocationWorkstationAllocationComponent = DepartmentLocationWorkstationAllocationComponent;
//# sourceMappingURL=pou-department-location-workstation-allocation.component.js.map