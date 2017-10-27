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
var employee_1 = require("../components/datatable/employee");
var TKIT_DEPT_1 = require("../Entities/TKIT_DEPT");
var tkit_manage_departments_service_1 = require("./tkit-manage-departments.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var AtParWebApiResponse_1 = require("../Shared/AtParWebApiResponse");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var ManageDepartmentsComponent = (function () {
    function ManageDepartmentsComponent(dataservice, mngDeptService, httpService, spinnerService, commonService, atParConstant, leftBarAnimationService) {
        this.dataservice = dataservice;
        this.mngDeptService = mngDeptService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.leftBarAnimationService = leftBarAnimationService;
        this.departmentIDSearch = "";
        this.showAddButton = true;
        this.pop = false;
        this.table = true;
        this.form = false;
        this.editform = false;
        this.Title = "";
        this.bindSymbal = "";
        this.loading = true;
        this.minDateValue1 = new Date();
        this.showTextBox = false;
        this.showLable = false;
        this.departmentID = "";
        this.newItem = new TKIT_DEPT_1.TKIT_DEPT();
        this.growlMessage = [];
        this._deviceTokenEntry = [];
        this.ddlStatusType = [];
        this.auditSatus = "";
        this.checkvalue = false;
        this.lstOrgGroups = [];
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.orgGrpId = "";
        this.selectedOrgGroupId = "";
        this.breadCrumbMenu = new routepath_1.Menus();
        this.ven = new employee_1.Employee();
        this.departmentID = "dept1";
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    ManageDepartmentsComponent.prototype.adddepartment = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Department';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showTextBox = true;
        this.showLable = false;
        this.form = true;
        this.editform = false;
        this.table = false;
        this.pop = false;
        this.Title = "Save";
        this.bindSymbal = "floppy-o";
        this.showAddButton = false;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString();
        this.departmentIDStatus = null;
        this.descStatus = null;
        this.ddlOrgIDStatus = null;
        this.newItem = new TKIT_DEPT_1.TKIT_DEPT();
        this.departmentIDSearch = "";
        this.selectedOrgGroupId = "";
        this.bindOrgGroups();
        this.loading = true;
        //this.blnShowOrgGroupLabel = false;
        // this.blnShowOrgGroupDD = true;
    };
    ManageDepartmentsComponent.prototype.tbl = function () {
        this.form = false;
        this.editform = false;
        this.table = false;
        this.pop = false;
        this.table = true;
    };
    ManageDepartmentsComponent.prototype.edit = function (data) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Department';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showTextBox = false;
        this.showLable = true;
        this.form = true;
        this.table = false;
        this.showAddButton = false;
        this.Title = "Update";
        this.bindSymbal = "check";
        this.newItem = data;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString();
        this.loading = false;
        this.departmentIDSearch = "";
        this.blnShowOrgGroupLabel = true;
        this.blnShowOrgGroupDD = false;
        this.orgGrpId = data.ORG_GROUP_ID;
    };
    ManageDepartmentsComponent.prototype.save = function () {
        this.editform = false;
    };
    ManageDepartmentsComponent.prototype.close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = false;
        this.table = true;
        this.pop = true;
        this.editform = false;
        this.table = false;
        this.showAddButton = true;
        this.newItem = new TKIT_DEPT_1.TKIT_DEPT();
        this.departmentIDSearch = "";
        this.growlMessage = [];
    };
    ManageDepartmentsComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    ManageDepartmentsComponent.prototype.ngOnInit = function () {
        this.table = false;
        this.showAddButton = true;
        this.ddlStatusType.push({ label: 'All', value: "" });
        this.ddlStatusType.push({ label: 'Active', value: true });
        this.ddlStatusType.push({ label: 'Inactive', value: false });
        this.pageSize = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.menuCode = localStorage.getItem("menuCode") != null ? localStorage.getItem("menuCode") : 'mt_tkit_manage_depts.aspx';
        this.appID = (AtParEnums_1.EnumApps.TrackIT).toString();
        this.mainlstGridData = new Array();
        this.checkAuditAllowed();
        this.statusType = null;
        //this.bindOrgGroups();
    };
    ManageDepartmentsComponent.prototype.ngOnDestroy = function () {
        this.departmentIDSearch = null;
        this.mode = null;
        this.Title = null;
        this.bindSymbal = null;
        this.departmentIDStatus = null;
        this.descStatus = null;
        this.departmentID = null;
        this.newItem = null;
        this.growlMessage = null;
        this._deviceTokenEntry = null;
        this.lstDepts = null;
        this.ddlStatusType = null;
        this.pageSize = null;
        this.menuCode = null;
        this.appID = null;
        this.auditSatus = null;
        this.changeDeptStatus = null;
    };
    ManageDepartmentsComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        this.lstOrgGroups = [];
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        // this.blnStatusMsg = false;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupDD = false;
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + ' - ' + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.blnShowOrgGroupLabel = false;
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
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Add and Update button validations
    ManageDepartmentsComponent.prototype.bindModelDataChange = function (event) {
        try {
            if ("txtDeptID" == event.TextBoxID.toString()) {
                this.departmentIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtDesc" == event.TextBoxID.toString()) {
                this.descStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.Title == "Update") {
                this.departmentIDStatus = 0;
            }
            this.ddlOrgIDChanged();
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString()) {
                if (this.departmentIDStatus == 0 && this.descStatus == 0 && this.ddlOrgIDStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString()) {
                if (this.descStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    };
    ManageDepartmentsComponent.prototype.BindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //if (this.table == true) {
                        //    this.dataTableComponent.reset();
                        //    this.statusType = null;
                        //}
                        this.mainlstGridData = [];
                        this.lstDepts = [];
                        this.statusType = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.table = false;
                        if (this.mode == "Edit") {
                            this.showAddButton = true;
                        }
                        this.spinnerService.start();
                        if (this.departmentIDSearch == null || this.departmentIDSearch == undefined || this.departmentIDSearch === "") {
                            this.departmentIDSearch = "";
                        }
                        return [4 /*yield*/, this.mngDeptService.getDepartments(this.departmentIDSearch, "", this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError)
                                .then(function (resp) {
                                var webresp = resp.json();
                                _this.spinnerService.stop();
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        _this.mainlstGridData = [];
                                        _this.lstDepts = [];
                                        _this.lstDepts = webresp.DataList;
                                        for (var i = 0; i <= _this.lstDepts.length - 1; i++) {
                                            if (_this.lstDepts[i].STATUS == "A") {
                                                _this.lstDepts[i].checkvalue = true;
                                            }
                                            else {
                                                _this.lstDepts[i].checkvalue = false;
                                            }
                                            _this.mainlstGridData.push(_this.lstDepts[i]);
                                        }
                                        _this.table = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.table = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: "warn", summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.table = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: "info", summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.table = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: "error", summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_1 = _a.sent();
                        this.clientErrorMsg(exMsg_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageDepartmentsComponent.prototype.changeStatus = function (dept) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var status, webresp, exMsg_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (dept.checkvalue == true) {
                            status = "A";
                        }
                        else {
                            status = "I";
                        }
                        this.growlMessage = [];
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        webresp = new AtParWebApiResponse_1.AtParWebApiResponse();
                        return [4 /*yield*/, this.mngDeptService.saveDepartment(dept.DEPT_ID, dept.DESCRIPTION, status, AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString(), dept.ORG_GROUP_ID, this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                                var msg, filterData, matchedrecord, x, lstManagedeptDetails;
                                return __generator(this, function (_a) {
                                    webresp = resp.json();
                                    this.spinnerService.stop();
                                    switch (webresp.StatType) {
                                        case AtParEnums_1.StatusType.Success:
                                            //  await this.BindGrid();
                                            this.growlMessage = [];
                                            msg = AtParConstants_1.AtParConstants.Updated_Status_Msg.replace("1%", 'Department').replace("2%", dept.DEPT_ID);
                                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                                            filterData = [];
                                            this.lstDepts = [];
                                            matchedrecord = this.mainlstGridData.filter(function (x) { return x.DEPT_ID == dept.DEPT_ID; });
                                            matchedrecord[0].checkvalue = dept.checkvalue;
                                            matchedrecord[0].STATUS = status;
                                            if (this.statusType.toString() == "false") {
                                                filterData = this.mainlstGridData.filter(function (x) { return x.checkvalue == false; });
                                            }
                                            else if (this.statusType.toString() == "true") {
                                                filterData = this.mainlstGridData.filter(function (x) { return x.checkvalue == true; });
                                            }
                                            else {
                                                filterData = this.mainlstGridData;
                                            }
                                            if (filterData != null) {
                                                for (x = 0; x < filterData.length; x++) {
                                                    lstManagedeptDetails = new TKIT_DEPT_1.TKIT_DEPT();
                                                    lstManagedeptDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                                                    lstManagedeptDetails.DESCRIPTION = filterData[x].DESCRIPTION;
                                                    lstManagedeptDetails.DEPT_ID = filterData[x].DEPT_ID;
                                                    lstManagedeptDetails.UPDATE_DATE = filterData[x].UPDATE_DATE;
                                                    lstManagedeptDetails.UPDATE_USER_ID = filterData[x].UPDATE_USER_ID;
                                                    if (filterData[x].STATUS == "A") {
                                                        filterData[x].checkvalue = true;
                                                    }
                                                    else {
                                                        filterData[x].checkvalue = false;
                                                    }
                                                    lstManagedeptDetails.STATUS = filterData[x].STATUS;
                                                    lstManagedeptDetails.checkvalue = filterData[x].checkvalue;
                                                    this.lstDepts.push(lstManagedeptDetails);
                                                }
                                            }
                                            break;
                                        case AtParEnums_1.StatusType.Error:
                                            this.BindGrid();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                            break;
                                        case AtParEnums_1.StatusType.Warn:
                                            this.BindGrid();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                            break;
                                    }
                                    this.spinnerService.stop();
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_2 = _a.sent();
                        this.clientErrorMsg(exMsg_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageDepartmentsComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var webresp_1, exMsg_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
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
                        exMsg_3 = _a.sent();
                        this.clientErrorMsg(exMsg_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageDepartmentsComponent.prototype.saveOrUpdateDepartment = function () {
        var _this = this;
        this.showAddButton = false;
        this.table = false;
        this.growlMessage = [];
        //this.newItem.STATUS = "A";
        if (this.Title == "Save") {
            this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString();
        }
        else {
            this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString();
        }
        try {
            var webresp_2 = new AtParWebApiResponse_1.AtParWebApiResponse();
            this.spinnerService.start();
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                if (this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined) {
                    this.table = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                    this.spinnerService.stop();
                    return false;
                }
            }
            this.mngDeptService.saveDepartment(this.newItem.DEPT_ID, this.newItem.DESCRIPTION, this.newItem.STATUS, this.mode, this.orgGroupIDForDBUpdate, this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then(function (resp) {
                webresp_2 = resp.json();
                _this.spinnerService.stop();
                switch (webresp_2.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        _this.growlMessage = [];
                        if (_this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString()) {
                            var msg = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", 'Department').replace("2%", _this.newItem.DEPT_ID);
                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                            _this.loading = true;
                            _this.newItem = new TKIT_DEPT_1.TKIT_DEPT();
                            _this.departmentIDStatus = null;
                            _this.descStatus = null;
                            _this.ddlOrgIDStatus = null;
                            _this.selectedOrgGroupId = null;
                            if (_this.blnShowOrgGroupDD) {
                                document.getElementById('txtddllstOrgGroups').focus();
                            }
                            else {
                                document.getElementById('txtDeptID').focus();
                            }
                        }
                        else {
                            var msg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", 'Department').replace("2%", _this.newItem.DEPT_ID);
                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                            document.getElementById('txtDesc').focus();
                        }
                        break;
                    }
                    case AtParEnums_1.StatusType.Error: {
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp_2.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Warn: {
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp_2.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Custom: {
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp_2.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    };
    ManageDepartmentsComponent.prototype.ddlOrgIDChanged = function () {
        if (this.newItem.DEPT_ID == undefined || this.newItem.DEPT_ID == null) {
            this.newItem.DEPT_ID = "";
        }
        if (this.newItem.DESCRIPTION == undefined || this.newItem.DESCRIPTION == null) {
            this.newItem.DESCRIPTION = "";
        }
        if (this.blnShowOrgGroupDD) {
            if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == null || this.selectedOrgGroupId == "") {
                this.ddlOrgIDStatus = 1;
            }
            else {
                this.ddlOrgIDStatus = 0;
            }
        }
        if (this.Title == "Update" || this.blnShowOrgGroupLabel) {
            this.ddlOrgIDStatus = 0;
        }
        if (this.departmentIDStatus == 0 && this.descStatus == 0 && this.ddlOrgIDStatus == 0 && this.newItem.DEPT_ID != "" && this.newItem.DESCRIPTION != "") {
            this.loading = false;
        }
        else {
            this.loading = true;
        }
    };
    ManageDepartmentsComponent.prototype.dataFilter = function (evtdata, filed, filterMatchMode) {
        return __awaiter(this, void 0, void 0, function () {
            var filterData, x, lstManageDepartment;
            return __generator(this, function (_a) {
                this.growlMessage = [];
                this.lstDepts.length = 0;
                if (this.statusType.toString() == "true") {
                    filterData = this.mainlstGridData.filter(function (x) { return x.checkvalue == true; });
                }
                else if (this.statusType.toString() == "false") {
                    filterData = this.mainlstGridData.filter(function (x) { return x.checkvalue == false; });
                }
                else {
                    filterData = this.mainlstGridData;
                }
                if (filterData != null) {
                    for (x = 0; x < filterData.length; x++) {
                        lstManageDepartment = new TKIT_DEPT_1.TKIT_DEPT();
                        lstManageDepartment.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                        lstManageDepartment.DEPT_ID = filterData[x].DEPT_ID;
                        lstManageDepartment.DESCRIPTION = filterData[x].DESCRIPTION;
                        lstManageDepartment.UPDATE_DATE = filterData[x].UPDATE_DATE;
                        lstManageDepartment.UPDATE_USER_ID = filterData[x].UPDATE_USER_ID;
                        lstManageDepartment.STATUS = filterData[x].STATUS;
                        lstManageDepartment.checkvalue = filterData[x].checkvalue;
                        this.lstDepts.push(lstManageDepartment);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], ManageDepartmentsComponent.prototype, "dataTableComponent", void 0);
    ManageDepartmentsComponent = __decorate([
        core_1.Component({
            templateUrl: 'tkit-manage-departments.component.html',
            providers: [datatableservice_1.datatableservice, tkit_manage_departments_service_1.ManageDepartmentsService, HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            tkit_manage_departments_service_1.ManageDepartmentsService,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            AtParConstants_1.AtParConstants,
            leftbar_animation_service_1.LeftBarAnimationService])
    ], ManageDepartmentsComponent);
    return ManageDepartmentsComponent;
}());
exports.ManageDepartmentsComponent = ManageDepartmentsComponent;
//# sourceMappingURL=tkit-manage-departments.component.js.map