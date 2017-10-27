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
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var employee_1 = require("../components/datatable/employee");
var pou_setup_item_attributes_service_1 = require("./pou-setup-item-attributes.service");
var linq_es5_1 = require("linq-es5");
var SetupItemAttributesComponent = (function () {
    function SetupItemAttributesComponent(dataservice, atParCommonService, httpService, spinnerService, PouSetupItemAttributeService, atParConstant) {
        this.dataservice = dataservice;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.PouSetupItemAttributeService = PouSetupItemAttributeService;
        this.atParConstant = atParConstant;
        this.page = true;
        this.form = false;
        this.pop = false;
        this.deviceTokenEntry = [];
        this.lstItemQuantityList = [];
        this.growlMessage = [];
        this.showgrid = false;
        this.messageDetials = "";
        //sort
        this.dataCheckedSorting = [];
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.orgGrpID = "";
        this.orgGrpIDData = "";
        this.bunitsData = [];
        this.selectedOrgGroupId = "";
        this.selectedDeptID = "";
        this.selectedLocType = "";
        this.selectedBunit = "";
        this.strCartID = "";
        this.strItemID = "";
        this.showIssueUomColumn = false;
        this.loading = false;
        this.blnsortbycolumn = true;
        this.ven = new employee_1.Employee();
    }
    SetupItemAttributesComponent.prototype.ngOnInit = function () {
        this.spinnerService.start();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.pazeSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.lstCheckedLotValues = new Array();
        this.lstCheckedSerialValues = new Array();
        this.dataCheckedSorting = new Array();
        this.dataUncheckedSorting = new Array();
        //for org group data
        this.bindUserOrgGroups();
        this.populateLocTypeDD();
        this.lstBunit = [];
        this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });
        this.lstDept = [];
        this.lstDept.push({ label: "Select Department", value: "Select Department" });
    };
    SetupItemAttributesComponent.prototype.btn_go_Click = function () {
        this.GetItemAttributesDetails();
        //this.dataservice.getsetupItemAttr().then(countries => { this.sales = countries; });
    };
    SetupItemAttributesComponent.prototype.bindUserOrgGroups = function () {
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
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        _this.spinnerService.stop();
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpIDData = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGrpID = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.PopulateDepts();
                                            _this.populateLocTypeDD();
                                            _this.populateBusinessUnits();
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstBunit = [];
                                            _this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                                            _this.lstOrgGroups = [];
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
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
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupItemAttributesComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isDeptExists, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showgrid = false;
                        this.growlMessage = [];
                        this.lstDept = [];
                        this.lstDept.push({ label: "Select Department", value: "Select Department" });
                        if (this.selectedOrgGroupId == "Select One") {
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
    SetupItemAttributesComponent.prototype.ddl_Changed = function () {
        this.showgrid = false;
    };
    SetupItemAttributesComponent.prototype.PopulateDepts = function () {
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
                        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One" || this.orgGroupIDForDBUpdate == undefined) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.PouSetupItemAttributeService.getUserDepartments(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate).
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
                                        isDeptExixt = false;
                                        _this.selectedBunit = "";
                                        _this.selectedDeptID = "";
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.selectedBunit = "";
                                        _this.selectedDeptID = "";
                                        isDeptExixt = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
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
    SetupItemAttributesComponent.prototype.populateBusinessUnits = function () {
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
                        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One" || this.orgGroupIDForDBUpdate == undefined) {
                            this.spinnerService.stop();
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
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spinnerService.stop();
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
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
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
    //sort
    SetupItemAttributesComponent.prototype.customSort = function (event) {
        var element = event;
        this.blnsortbycolumn = !this.blnsortbycolumn;
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
    };
    SetupItemAttributesComponent.prototype.GetItemAttributesDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.showgrid = false;
                        this.growlMessage = [];
                        ///orgGrop ID 
                        this.spinnerService.start();
                        this.lstCheckedLotValues = new Array();
                        this.lstCheckedSerialValues = new Array();
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One" || this.orgGroupIDForDBUpdate == undefined) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        ///department ID
                        if (this.selectedDeptID == null || this.selectedDeptID == "" || this.selectedDeptID == "Select Department" || this.selectedDeptID == undefined) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Department" });
                            return [2 /*return*/];
                        }
                        ///Location Type
                        if (this.selectedLocType == null || this.selectedLocType == "" || this.selectedLocType == "Select Loc Type" || this.selectedLocType == undefined) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Location Type" });
                            return [2 /*return*/];
                        }
                        ///Bunit 
                        if (this.selectedBunit == null || this.selectedBunit == "" || this.selectedBunit == "Select BUnit" || this.selectedBunit == undefined) {
                            this.selectedBunit = "";
                        }
                        this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] = this.orgGroupIDForDBUpdate;
                        return [4 /*yield*/, this.PouSetupItemAttributeService.GetItemAttributesDetails(this.selectedDeptID, this.selectedBunit, 0, this.strCartID, this.selectedLocType, 15, this.strItemID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstDBData = new Array();
                                        _this.lstDBData = data.DataList;
                                        _this.spinnerService.stop();
                                        _this.BindDataGrid();
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
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupItemAttributesComponent.prototype.Save_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.SaveDeptItemAttributes()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SetupItemAttributesComponent.prototype.SaveDeptItemAttributes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.lstCheckedValues = new Array();
                        ///orgGrop ID 
                        this.spinnerService.start();
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One" || this.orgGroupIDForDBUpdate == undefined) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        ///department ID
                        if (this.selectedDeptID == null || this.selectedDeptID == "" || this.selectedDeptID == "Select Department" || this.selectedDeptID == undefined) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Department" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.PouSetupItemAttributeService.saveDeptItemAttributes(this.lstDBData, this.selectedDeptID, this.selectedBunit, this.strCartID, this.strItemID)
                                .subscribe(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Saved Successfully..." });
                                        _this.spinnerService.stop();
                                        //clear the values
                                        _this.lstCheckedLotValues = new Array();
                                        _this.lstCheckedSerialValues = new Array();
                                        _this.lstCheckedValues = new Array();
                                        _this.selectedDeptID = "";
                                        _this.selectedBunit = "";
                                        _this.selectedDeptID = "";
                                        _this.selectedLocType = "";
                                        _this.selectedOrgGroupId = "";
                                        _this.showgrid = false;
                                        _this.lstDBData = [];
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.lstCheckedLotValues = new Array();
                                        _this.lstCheckedSerialValues = new Array();
                                        _this.lstCheckedValues = new Array();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.lstItemQuantityList = response.DataList;
                                        if (_this.lstItemQuantityList != null) {
                                            for (var i = 0; i < _this.lstItemQuantityList.length; i++) {
                                                if (_this.messageDetials != null && _this.messageDetials != undefined && _this.messageDetials != "") {
                                                    _this.messageDetials = _this.messageDetials + "," + _this.lstItemQuantityList[i];
                                                }
                                                else {
                                                    _this.messageDetials = _this.lstItemQuantityList[i];
                                                }
                                            }
                                        }
                                        _this.spinnerService.stop();
                                        _this.lstCheckedLotValues = new Array();
                                        _this.lstCheckedSerialValues = new Array();
                                        _this.lstCheckedValues = new Array();
                                        _this.lstDBData = linq_es5_1.asEnumerable(_this.lstDBData).OrderByDescending(function (x) { return x.LOT; }).OrderByDescending(function (x) { return x.SERIAL; }).ToArray();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage + " " + _this.messageDetials });
                                        _this.lstItemQuantityList = [];
                                        _this.messageDetials = "";
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.lstCheckedLotValues = new Array();
                                        _this.lstCheckedSerialValues = new Array();
                                        _this.lstCheckedValues = new Array();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //lot controlled 
    SetupItemAttributesComponent.prototype.selectedRowLotControlled = function (values, event) {
        if (event == true) {
            values.LOT_CONTROLLED = "Y";
            values.LOT = true;
        }
        else {
            values.LOT_CONTROLLED = "N";
            values.LOT = false;
        }
        for (var i = 0; i < this.lstCheckedLotValues.length; i++) {
            if (this.lstCheckedLotValues[i].ITEM_ID === values.ITEM_ID) {
                var index = this.lstCheckedLotValues.indexOf(this.lstCheckedLotValues[i], 0);
                this.lstCheckedLotValues.splice(index, 1);
            }
        }
        this.lstCheckedLotValues.push(values);
    };
    //serail controlled
    SetupItemAttributesComponent.prototype.selectedRowSerialControlled = function (values, event) {
        if (event == true) {
            values.SERIAL_CONTROLLED = "Y";
            values.SERIAL = true;
        }
        else {
            values.SERIAL_CONTROLLED = "N";
            values.SERIAL = false;
        }
        for (var i = 0; i < this.lstCheckedSerialValues.length; i++) {
            if (this.lstCheckedSerialValues[i].ITEM_ID === values.ITEM_ID) {
                var index = this.lstCheckedSerialValues.indexOf(this.lstCheckedSerialValues[i], 0);
                this.lstCheckedSerialValues.splice(index, 1);
            }
        }
        this.lstCheckedSerialValues.push(values);
    };
    SetupItemAttributesComponent.prototype.BindDataGrid = function () {
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        var count = this.lstDBData.length;
        this.lblcountmsg = count + " Record(s) Found";
        for (var i = 0; i < this.lstDBData.length; i++) {
            if (this.lstDBData[i].LOT == true || this.lstDBData[i].SERIAL == true) {
                this.dataCheckedSorting.push(this.lstDBData[i]);
            }
            else {
                this.dataUncheckedSorting.push(this.lstDBData[i]);
            }
            if (this.lstDBData[i].ASSIGN_CART == null || this.lstDBData[i].ASSIGN_CART == undefined || this.lstDBData[i].ASSIGN_CART == "") {
                this.lstDBData[i].ASSIGN_CART = "N";
            }
            this.lstDBData[i].ROWINDEX = i;
            if (this.lstDBData[i].LOT_CONTROLLED == null || this.lstDBData[i].LOT_CONTROLLED == "" || this.lstDBData[i].LOT_CONTROLLED == undefined) {
                this.lstDBData[i].LOT_CONTROLLED == "N";
            }
            if (this.lstDBData[i].SERIAL_CONTROLLED == null || this.lstDBData[i].SERIAL_CONTROLLED == "" || this.lstDBData[i].SERIAL_CONTROLLED == undefined) {
                this.lstDBData[i].SERIAL_CONTROLLED == "N";
            }
            this.lstDBData[i].ISSUE_UOM_ID = 'txtIssueuom' + i;
            this.lstDBData[i].CONVERSION_FACTOR_ID = 'txtConFact' + i;
            //To hide Issue UOM & Conversion Factor columns 
            if (this.selectedLocType == "I") {
                this.showIssueUomColumn = false;
                this.lstDBData[i].ISSUE_UOM_ID_VISIBLE = true;
                this.lstDBData[i].CONVERSION_FACTOR_ID_VISIBLE = true;
            }
            else {
                this.lstDBData[i].ISSUE_UOM_ID_VISIBLE = false;
                this.lstDBData[i].CONVERSION_FACTOR_ID_VISIBLE = true;
                this.showIssueUomColumn = true;
            }
            //for switch enabled/disabled
            if (this.lstDBData[i].LOT_SERIAL_DISABLE === "Y") {
                this.lstDBData[i].lotvalue = true;
                this.lstDBData[i].serialvalue = true;
            }
            else {
                this.lstDBData[i].lotvalue = false;
                this.lstDBData[i].serialvalue = false;
            }
        }
        this.showgrid = true;
    };
    SetupItemAttributesComponent.prototype.issueUomOnchanged = function (UomData, event) {
        for (var i = 0; i < this.lstDBData.length; i++) {
            console.log(event);
            if (UomData.ROWINDEX == this.lstDBData[i].ROWINDEX) {
                if (UomData.ISSUE_UOM == UomData.PAR_UOM) {
                    this.lstDBData[i].CONVERSION_FACTOR = "1";
                    this.lstDBData[i].CONVERSION_FACTOR_ID_VISIBLE = true;
                }
                else if (UomData.ISSUE_UOM == null || UomData.ISSUE_UOM == undefined || UomData.ISSUE_UOM == "") {
                    this.lstDBData[i].CONVERSION_FACTOR = "";
                    this.lstDBData[i].CONVERSION_FACTOR_ID_VISIBLE = true;
                }
                else {
                    this.lstDBData[i].CONVERSION_FACTOR_ID_VISIBLE = false;
                }
            }
            else {
                this.lstDBData[i].CONVERSION_FACTOR_ID_VISIBLE = true;
            }
        }
    };
    SetupItemAttributesComponent.prototype.bindModelDataChange = function (event) {
        for (var i = 0; i < this.lstDBData.length; i++) {
            if (this.lstDBData[i].ISSUE_UOM_ID == event.TextBoxID.toString()) {
                if (this.lstDBData[i].ISSUE_UOM != null && this.lstDBData[i].ISSUE_UOM != undefined && this.lstDBData[i].ISSUE_UOM != "") {
                    this.submitStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                    if (this.submitStatus == 0) {
                        if (this.lstDBData[i].CONVERSION_FACTOR == null || this.lstDBData[i].CONVERSION_FACTOR == undefined || this.lstDBData[i].CONVERSION_FACTOR == "") {
                            this.submitStatus = -1;
                            break;
                        }
                    }
                    else {
                        continue;
                    }
                }
                else {
                    if (this.lstDBData[i].CONVERSION_FACTOR != null && this.lstDBData[i].CONVERSION_FACTOR != undefined && this.lstDBData[i].CONVERSION_FACTOR != "") {
                        this.lstDBData[i].CONVERSION_FACTOR = "";
                        this.lstDBData[i].CONVERSION_FACTOR_ID_VISIBLE = true;
                        this.submitStatus = 0;
                    }
                    else {
                        this.submitStatus = 0;
                    }
                }
            }
            else if (this.lstDBData[i].CONVERSION_FACTOR_ID == event.TextBoxID.toString()) {
                if (this.lstDBData[i].CONVERSION_FACTOR != null && this.lstDBData[i].CONVERSION_FACTOR != "" && this.lstDBData[i].CONVERSION_FACTOR != undefined) {
                    this.submitStatus = 0;
                }
                else {
                    if (this.lstDBData[i].ISSUE_UOM == null || this.lstDBData[i].ISSUE_UOM == undefined || this.lstDBData[i].ISSUE_UOM == "") {
                        if (this.lstDBData[i].CONVERSION_FACTOR == null || this.lstDBData[i].CONVERSION_FACTOR == "" || this.lstDBData[i].CONVERSION_FACTOR == undefined) {
                            this.submitStatus = 0;
                        }
                        else {
                            this.submitStatus = -1;
                            break;
                        }
                    }
                    else {
                        if (this.lstDBData[i].CONVERSION_FACTOR == null || this.lstDBData[i].CONVERSION_FACTOR == undefined || this.lstDBData[i].CONVERSION_FACTOR == "") {
                            this.submitStatus = -1;
                            break;
                        }
                    }
                }
            }
            if (this.lstDBData[i].ISSUE_UOM == null || this.lstDBData[i].ISSUE_UOM == undefined || this.lstDBData[i].ISSUE_UOM == "") {
                this.lstDBData[i].CONVERSION_FACTOR = "";
                this.lstDBData[i].CONVERSION_FACTOR_ID_VISIBLE = true;
            }
        }
        if (this.submitStatus != 0) {
            this.loading = true;
        }
        else {
            this.loading = false;
        }
    };
    SetupItemAttributesComponent.prototype.populateLocTypeDD = function () {
        this.lstLocType = [];
        this.lstLocType.push({ label: "Select Loc Type", value: "Select Loc Type" });
        this.lstLocType.push({ label: "Inventory", value: "I" });
        this.lstLocType.push({ label: "Par", value: "P" });
    };
    SetupItemAttributesComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    SetupItemAttributesComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstOrgGroups = null;
        this.lstDBData = null;
        this.orgGroupData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    };
    SetupItemAttributesComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-setup-item-attributes.component.html',
            providers: [HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, datatableservice_1.datatableservice, pou_setup_item_attributes_service_1.POUSetupItemAttributeService]
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            pou_setup_item_attributes_service_1.POUSetupItemAttributeService,
            AtParConstants_1.AtParConstants])
    ], SetupItemAttributesComponent);
    return SetupItemAttributesComponent;
}());
exports.SetupItemAttributesComponent = SetupItemAttributesComponent;
//# sourceMappingURL=pou-setup-item-attributes.component.js.map