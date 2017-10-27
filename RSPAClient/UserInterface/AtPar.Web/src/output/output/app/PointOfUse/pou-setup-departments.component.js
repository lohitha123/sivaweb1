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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var api_1 = require("../components/common/api");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var datatable_1 = require("../components/datatable/datatable");
var AtParEnums_1 = require("../Shared/AtParEnums");
var pou_setup_departments_service_1 = require("./pou-setup-departments.service");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var MT_POU_DEPT_1 = require("../Entities/MT_POU_DEPT");
var linq_es5_1 = require("linq-es5");
var routepath_1 = require("../AtPar/Menus/routepath");
var platform_browser_1 = require("@angular/platform-browser");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var SetupDepartmentsComponent = (function () {
    function SetupDepartmentsComponent(httpService, spinnerService, confirmationService, document, atparConstant, setupDepartmentService, commonService) {
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.confirmationService = confirmationService;
        this.document = document;
        this.atparConstant = atparConstant;
        this.setupDepartmentService = setupDepartmentService;
        this.commonService = commonService;
        this.pop = false;
        this.form = true;
        this.isEditMode = false;
        this.btnSaveEnableDisable = true;
        this.btnUpdateEnableDisable = true;
        this.growlMessage = [];
        this.loading = true;
        this.deviceTokenEntry = [];
        this.newItem = new MT_POU_DEPT_1.MT_POU_DEPT();
        this.orgGrpId = "";
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.lstOrgGroups = [];
        this.newItem = new MT_POU_DEPT_1.MT_POU_DEPT();
        this.breadCrumbMenu = new routepath_1.Menus();
        //this.dataservice.getSetupDepartment().then(countries => { this.sales = countries; });
    }
    SetupDepartmentsComponent.prototype.ngOnInit = function () {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.database = [];
        this.database.push({ label: 'All', value: '' });
        this.database.push({ label: 'Active', value: true });
        this.database.push({ label: 'InActive', value: false });
        this.orgID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
        this.deptID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DeptID];
        console.log(this.deptID);
        this.bindOrgGroups();
        this.growlMessage = [];
        this.mainlstGridData = new Array();
    };
    SetupDepartmentsComponent.prototype.bindOrgGroups = function () {
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
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            //if (this.orgGroupData[0].ORG_GROUP_ID !== "ALL"
                                            //{})
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
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
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
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
    SetupDepartmentsComponent.prototype.go = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusType = "";
                        if (this.pop == true) {
                            this.dataTableComponent.reset();
                        }
                        this.mainlstGridData = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        if (this.pdeptsearch == null || this.pdeptsearch == undefined || this.pdeptsearch === "") {
                            this.pdeptsearch = "";
                        }
                        //this.deviceTokenEntry[TokenEntry_Enum.DeptID]
                        return [4 /*yield*/, this.setupDepartmentService.getDeptDetails(this.deptID, this.orgID, this.pdeptsearch).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.pop = true;
                                        _this.growlMessage = [];
                                        _this.lstDBData = data.DataList;
                                        for (var x = 0; x < _this.lstDBData.length; x++) {
                                            var setupDepartDetails = new MT_POU_DEPT_1.MT_POU_DEPT();
                                            setupDepartDetails.ORG_GROUP_ID = _this.lstDBData[x].ORG_GROUP_ID;
                                            setupDepartDetails.DEPT_ID = _this.lstDBData[x].DEPT_ID;
                                            setupDepartDetails.DEPT_NAME = _this.lstDBData[x].DEPT_NAME;
                                            setupDepartDetails.PHONE = _this.lstDBData[x].PHONE;
                                            setupDepartDetails.BILL_ONLY_CONSIGN_IMPLMENTED = _this.lstDBData[x].BILL_ONLY_CONSIGN_IMPLMENTED;
                                            setupDepartDetails.ATTN_TO = _this.lstDBData[x].ATTN_TO;
                                            setupDepartDetails.STATUS = !_this.lstDBData[x].STATUS;
                                            _this.lstDBData[x].STATUS = !_this.lstDBData[x].STATUS;
                                            _this.mainlstGridData.push(setupDepartDetails);
                                        }
                                        if (_this.lstDBData.length == 0) {
                                            _this.pop = false;
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: "No data for the search criteria entered" });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.pop = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.pop = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.pop = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        //this.deviceTokenEntry[TokenEntry_Enum.DeptID]
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupDepartmentsComponent.prototype.changeStatus = function (pou_dept) {
        var _this = this;
        this.spinnerService.start();
        var intStatus = pou_dept.STATUS == false ? 0 : 1;
        try {
            this.setupDepartmentService.updateDeptStatus(pou_dept.DEPT_ID, intStatus, pou_dept.ORG_GROUP_ID, 15).forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_2.StatusType.Success: {
                        pou_dept.STATUS = !pou_dept.STATUS;
                        _this.lstDBData = [];
                        var filterData = [];
                        var matchedrecord = _this.mainlstGridData.filter(function (x) { return x.DEPT_ID == pou_dept.DEPT_ID && x.ORG_GROUP_ID == pou_dept.ORG_GROUP_ID; });
                        matchedrecord[0].STATUS = pou_dept.STATUS;
                        if (_this.statusType.toString() == "true") {
                            filterData = _this.mainlstGridData.filter(function (x) { return x.STATUS == true; });
                        }
                        else if (_this.statusType.toString() == "false") {
                            filterData = _this.mainlstGridData.filter(function (x) { return x.STATUS == false; });
                        }
                        else {
                            filterData = _this.mainlstGridData;
                        }
                        if (filterData != null) {
                            for (var x = 0; x < filterData.length; x++) {
                                var setupDepartDetails = new MT_POU_DEPT_1.MT_POU_DEPT();
                                setupDepartDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                                setupDepartDetails.DEPT_ID = filterData[x].DEPT_ID;
                                setupDepartDetails.DEPT_NAME = filterData[x].DEPT_NAME;
                                setupDepartDetails.PHONE = filterData[x].PHONE;
                                setupDepartDetails.STATUS = filterData[x].STATUS;
                                setupDepartDetails.ATTN_TO = filterData[x].ATTN_TO;
                                _this.lstDBData.push(setupDepartDetails);
                            }
                        }
                        _this.growlMessage = [];
                        var statusmsg = AtParConstants_1.AtParConstants.Updated_Status_Msg.replace("1%", "Department").replace("2%", pou_dept.DEPT_ID);
                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusmsg });
                        break;
                    }
                    case AtParEnums_2.StatusType.Warn: {
                        if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.CRCT_S_CANNOTINACTIVATE) {
                            pou_dept.STATUS = true;
                            //this.lstDBData.filter(x => x.DEPT_ID == pou_dept.DEPT_ID)[0].STATUS = !pou_dept.STATUS;
                        }
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        break;
                    }
                    case AtParEnums_2.StatusType.Error: {
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    }
                    case AtParEnums_2.StatusType.Custom: {
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                        break;
                    }
                }
                _this.spinnerService.stop();
            });
        }
        catch (ex) {
            this.growlMessage = [];
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: ex.toString() });
        }
    };
    SetupDepartmentsComponent.prototype.dataFilter = function (evtdata, filed, filterMatchMode) {
        return __awaiter(this, void 0, void 0, function () {
            var filterData, x, setupDepartDetails;
            return __generator(this, function (_a) {
                this.lstDBData = [];
                this.growlMessage = [];
                if (this.statusType.toString() == "true") {
                    filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == true; });
                }
                else if (this.statusType.toString() == "false") {
                    filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == false; });
                }
                else {
                    filterData = this.mainlstGridData;
                }
                if (filterData != null) {
                    for (x = 0; x < filterData.length; x++) {
                        setupDepartDetails = new MT_POU_DEPT_1.MT_POU_DEPT();
                        setupDepartDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                        setupDepartDetails.DEPT_ID = filterData[x].DEPT_ID;
                        setupDepartDetails.DEPT_NAME = filterData[x].DEPT_NAME;
                        setupDepartDetails.PHONE = filterData[x].PHONE;
                        setupDepartDetails.STATUS = filterData[x].STATUS;
                        setupDepartDetails.ATTN_TO = filterData[x].ATTN_TO;
                        this.lstDBData.push(setupDepartDetails);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    SetupDepartmentsComponent.prototype.addDept = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Department';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.selectedOrgGroupId = "";
        if (this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID] == "ADMIN") {
            this.blnShowOrgGroupDD = true;
            this.blnShowOrgGroupLabel = false;
        }
        else {
            this.blnShowOrgGroupDD = false;
            this.selectedOrgGroupId = this.orgGrpId;
            this.blnShowOrgGroupLabel = true;
        }
        this.form = false;
        this.isEditMode = false;
        this.pop = false;
        this.newItem = new MT_POU_DEPT_1.MT_POU_DEPT();
        this.newItem.CASE_PICK_STATUS = "0";
        this.btnSaveEnableDisable = true;
        this.txtDepartmentIDStatus = null;
        this.txtDeptNameStatus = null;
        this.orgGPStatus = null;
        //this.newItem.ORG_GROUP_ID = this.orgID;
        this.btnMode = "Add";
    };
    SetupDepartmentsComponent.prototype.editDept = function (pou_dept) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Update Department';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.newItem = pou_dept;
        this.newItem.ALERT_NOTIFY_REQ_STATUS = this.getStatus(this.newItem.ALERT_NOTIFY_REQ);
        this.newItem.EXCP_APPROVAL_REQ_STATUS = this.getStatus(this.newItem.EXCP_APPROVAL_REQ);
        this.newItem.INV_INTERFACE_ENABLE_STATUS = this.getStatus(this.newItem.INV_INTERFACE_ENABLE);
        this.newItem.BILLING_ENABLE_STATUS = this.getStatus(this.newItem.BILLING_ENABLE);
        this.newItem.SEND_LOWSTOCK_EMAIL_ALERTS_STATUS = this.getStatus(this.newItem.SEND_LOWSTOCK_EMAIL_ALERTS);
        this.newItem.AUTO_PUTAWAY_ENABLED_STATUS = this.getStatus(this.newItem.AUTO_PUTAWAY_ENABLED);
        this.newItem.ALLOW_LOC_SELECT = this.newItem.ALLOW_LOC_SELECT == null ? false : this.newItem.ALLOW_LOC_SELECT;
        this.newItem.AUTO_CASE_PICK_STATUS = this.getStatus(this.newItem.AUTO_CASE_PICK);
        this.newItem.BILL_ONLY_CONSIGN_IMPLMENTED = this.newItem.BILL_ONLY_CONSIGN_IMPLMENTED;
        this.btnUpdateEnableDisable = false;
        this.isEditMode = true;
        this.form = false;
        this.pop = false;
        this.btnMode = "Update";
        this.blnShowOrgGroupDD = false;
        this.blnShowOrgGroupLabel = true;
        var orggroupid = linq_es5_1.asEnumerable(this.orgGroupData).Where(function (x) { return x.ORG_GROUP_ID.toUpperCase() === pou_dept.ORG_GROUP_ID.toUpperCase().trim(); }).Select(function (x) { return x; }).ToArray();
        if (orggroupid.length > 0) {
            this.orgGrpId = orggroupid[0].ORG_GROUP_ID + " - " + orggroupid[0].ORG_GROUP_NAME;
        }
    };
    SetupDepartmentsComponent.prototype.getStatus = function (input) {
        if (input == null || input == "N")
            return false;
        return true;
    };
    SetupDepartmentsComponent.prototype.getStatusFromUserFields = function (input) {
        if (input == true)
            return "Y";
        return "N";
    };
    SetupDepartmentsComponent.prototype.saveDept = function () {
        var _this = this;
        this.spinnerService.start();
        this.updateStatusDetails();
        this.newItem.STATUS = true;
        if (this.selectedOrgGroupId == null || this.selectedOrgGroupId == "" || this.selectedOrgGroupId == undefined) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select OrgGrpID." });
            this.spinnerService.stop();
            return;
        }
        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }
        this.newItem.ORG_GROUP_ID = this.orgGroupIDForDBUpdate.trim();
        if (this.newItem.ALERT_NOTIFY_REQ_STATUS == true) {
            if (this.newItem.EMAIL_NOTIFY == null || this.newItem.EMAIL_NOTIFY == undefined || this.newItem.EMAIL_NOTIFY == "") {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Email alert notification is mandatory" });
                return;
            }
        }
        if (this.newItem.SEND_LOWSTOCK_EMAIL_ALERTS_STATUS == true) {
            if (this.newItem.EMAILID_FOR_LOWSTOCK_ALERTS == null || this.newItem.EMAILID_FOR_LOWSTOCK_ALERTS == undefined || this.newItem.EMAILID_FOR_LOWSTOCK_ALERTS == "") {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Email ID for Low Stock Alerts is mandatory" });
                return;
            }
        }
        if (this.newItem.SEND_PRODUCT_EXP_EMAIL_ALERTS_STATUS == true) {
            if (this.newItem.EMAILID_FOR_PRODUCT_EXP_ALERTS == null || this.newItem.EMAILID_FOR_PRODUCT_EXP_ALERTS == undefined || this.newItem.EMAILID_FOR_PRODUCT_EXP_ALERTS == "") {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Email for Product Expiration Alerts is mandatory" });
                return;
            }
        }
        this.setupDepartmentService.createDepartment(this.newItem).forEach(function (resp) {
            switch (resp.StatType) {
                case AtParEnums_2.StatusType.Success: {
                    _this.pop = false;
                    _this.growlMessage = [];
                    var statusmsg = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Department").replace("2%", _this.newItem.DEPT_ID);
                    _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusmsg });
                    _this.newItem.ADDRESS1 = '';
                    _this.newItem.ADDRESS2 = '';
                    _this.newItem.ALERT_NOTIFY_REQ_STATUS = false;
                    _this.newItem.ALLOW_LOC_SELECT = true;
                    _this.newItem.ATTN_TO = '';
                    _this.newItem.AUTO_PUTAWAY_ENABLED_STATUS = false;
                    _this.newItem.BILL_ONLY_CONSIGN_IMPLMENTED = false;
                    _this.newItem.DEFAULT_IMPLANT_TYPE = '';
                    _this.newItem.DEPT_ID = '';
                    _this.newItem.DEPT_NAME = '';
                    _this.newItem.CITY = '';
                    _this.newItem.STATE = '';
                    _this.newItem.ZIP = '';
                    _this.newItem.COUNTRY = '';
                    _this.newItem.PHONE = '';
                    _this.newItem.FAX = '';
                    _this.newItem.E_MAIL = '';
                    _this.newItem.EMAIL_NOTIFY = '';
                    _this.newItem.EXCP_APPROVAL_REQ_STATUS = false;
                    _this.newItem.INV_COORD_EMAIL = '';
                    _this.newItem.EXCP_APPROVER_EMAIL = '';
                    _this.newItem.REMINDER_FREQ = 0;
                    _this.newItem.RECALL_NOTIFICATION_EMAIL = '';
                    _this.newItem.INV_INTERFACE_ENABLE_STATUS = false;
                    _this.newItem.BILLING_ENABLE_STATUS = false;
                    _this.newItem.DEFAULT_PRINTER = '';
                    _this.newItem.DEFAULT_DISTRIBUTION_TYPE = '';
                    _this.newItem.DEFAULT_DESTINATION_LOCATION = '';
                    _this.newItem.CATEGORY_CODE = '';
                    _this.newItem.BILLONLY_BUSINESS_UNIT = '';
                    _this.newItem.BILLONLY_LOCATION = '';
                    _this.newItem.SEND_LOWSTOCK_EMAIL_ALERTS_STATUS = false;
                    _this.newItem.EMAILID_FOR_LOWSTOCK_ALERTS = '';
                    _this.newItem.SEND_PRODUCT_EXP_EMAIL_ALERTS_STATUS = false;
                    _this.newItem.EMAILID_FOR_PRODUCT_EXP_ALERTS = '';
                    _this.newItem.NO_OF_CASES_DOWNLOAD = 1;
                    _this.newItem.DURATION_TRACKING_EXP = 0;
                    _this.newItem.PERCENTAGE_OPTIMUM_QTY = 0;
                    _this.newItem.PREPICK_QA_PROCESS_REQUIRED = false;
                    _this.newItem.BUYER_ID = '';
                    _this.newItem.CASE_PICK_STATUS = "0";
                    _this.newItem.AUTO_CASE_PICK_STATUS = false;
                    _this.newItem.STORAGE_AREA = '';
                    _this.selectedOrgGroupId = "Select One";
                    _this.btnSaveEnableDisable = true;
                    if (_this.blnShowOrgGroupDD) {
                        document.getElementById('txtddllstOrgGroups').focus();
                    }
                    else {
                        document.getElementById('DepartmentID').focus();
                    }
                    _this.txtDepartmentIDStatus = null;
                    _this.txtDeptNameStatus = null;
                    _this.orgGPStatus = null;
                    break;
                }
                case AtParEnums_2.StatusType.Warn: {
                    _this.growlMessage = [];
                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage.replace("1%", _this.newItem.DEPT_ID) });
                    break;
                }
                case AtParEnums_2.StatusType.Error: {
                    _this.growlMessage = [];
                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                    break;
                }
                case AtParEnums_2.StatusType.Custom: {
                    _this.growlMessage = [];
                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                    break;
                }
            }
            _this.atparConstant.scrollToTop();
            _this.spinnerService.stop();
        });
    };
    SetupDepartmentsComponent.prototype.updateDept = function () {
        var _this = this;
        //this.growlMessage = [];
        this.spinnerService.start();
        this.updateStatusDetails();
        // this.orgGrpId = this.newItem.ORG_GROUP_ID;
        if (this.newItem.ALERT_NOTIFY_REQ_STATUS == true) {
            if (this.newItem.EMAIL_NOTIFY == null || this.newItem.EMAIL_NOTIFY == undefined || this.newItem.EMAIL_NOTIFY == "") {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Email alert notification is mandatory" });
                return;
            }
        }
        if (this.newItem.SEND_LOWSTOCK_EMAIL_ALERTS_STATUS == true) {
            if (this.newItem.EMAILID_FOR_LOWSTOCK_ALERTS == null || this.newItem.EMAILID_FOR_LOWSTOCK_ALERTS == undefined || this.newItem.EMAILID_FOR_LOWSTOCK_ALERTS == "") {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Email ID for Low Stock Alerts is mandatory" });
                return;
            }
        }
        if (this.newItem.SEND_PRODUCT_EXP_EMAIL_ALERTS_STATUS == true) {
            if (this.newItem.EMAILID_FOR_PRODUCT_EXP_ALERTS == null || this.newItem.EMAILID_FOR_PRODUCT_EXP_ALERTS == undefined || this.newItem.EMAILID_FOR_PRODUCT_EXP_ALERTS == "") {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Email for Product Expiration Alerts is mandatory" });
                return;
            }
        }
        this.setupDepartmentService.updateDepartment(this.newItem, 15).forEach(function (resp) {
            switch (resp.StatType) {
                case AtParEnums_2.StatusType.Success: {
                    _this.growlMessage = [];
                    var statusmsg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Department").replace("2%", _this.newItem.DEPT_ID);
                    _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusmsg });
                    document.getElementById('DepartmentName').focus();
                    break;
                }
                case AtParEnums_2.StatusType.Warn: {
                    _this.growlMessage = [];
                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                    break;
                }
                case AtParEnums_2.StatusType.Error: {
                    _this.growlMessage = [];
                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                    break;
                }
                case AtParEnums_2.StatusType.Custom: {
                    _this.growlMessage = [];
                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                    break;
                }
            }
            _this.atparConstant.scrollToTop();
            _this.spinnerService.stop();
        });
    };
    SetupDepartmentsComponent.prototype.updateStatusDetails = function () {
        this.newItem.ALERT_NOTIFY_REQ = this.getStatusFromUserFields(this.newItem.ALERT_NOTIFY_REQ_STATUS);
        this.newItem.EXCP_APPROVAL_REQ = this.getStatusFromUserFields(this.newItem.EXCP_APPROVAL_REQ_STATUS);
        this.newItem.INV_INTERFACE_ENABLE = this.getStatusFromUserFields(this.newItem.INV_INTERFACE_ENABLE_STATUS);
        this.newItem.BILLING_ENABLE = this.getStatusFromUserFields(this.newItem.BILLING_ENABLE_STATUS);
        this.newItem.SEND_LOWSTOCK_EMAIL_ALERTS = this.getStatusFromUserFields(this.newItem.SEND_LOWSTOCK_EMAIL_ALERTS_STATUS);
        this.newItem.AUTO_PUTAWAY_ENABLED = this.getStatusFromUserFields(this.newItem.AUTO_PUTAWAY_ENABLED_STATUS);
        this.newItem.AUTO_CASE_PICK = this.getStatusFromUserFields(this.newItem.AUTO_CASE_PICK_STATUS);
    };
    SetupDepartmentsComponent.prototype.close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.growlMessage = [];
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = true;
        this.pop = false;
        this.isEditMode = false;
        this.pdeptsearch = null;
    };
    SetupDepartmentsComponent.prototype.ddlOrgGroupIdChange = function () {
        if (this.blnShowOrgGroupDD) {
            if (this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One") {
                this.orgGPStatus = 1;
            }
            else {
                this.orgGPStatus = 0;
            }
        }
        if (this.blnShowOrgGroupLabel) {
            this.orgGPStatus = 0;
        }
        if (this.btnMode == "Update") {
            this.txtDepartmentIDStatus = 0;
            if (this.txtDeptNameStatus >= 1) {
                this.txtDeptNameStatus = 1;
            }
            else {
                this.txtDeptNameStatus = 0;
            }
        }
        if (this.txtDepartmentIDStatus == 0 && this.txtDeptNameStatus == 0 && this.orgGPStatus == 0 && (this.newItem.DEPT_ID != null || this.newItem.DEPT_ID != undefined || this.newItem.DEPT_ID != "") && (this.newItem.DEPT_NAME != null || this.newItem.DEPT_NAME != undefined || this.newItem.DEPT_NAME != "")) {
            if ((this.txtAttentionToStatus == 0 || this.txtAttentionToStatus == undefined) && (this.txtAddress1Status == 0 || this.txtAddress1Status == undefined)
                && (this.txtAddress2Status == 0 || this.txtAddress2Status == undefined) && (this.txtCityStatus == 0 || this.txtCityStatus == undefined) &&
                (this.txtStateStatus == 0 || this.txtStateStatus == undefined) && (this.txtZipStatus == 0 || this.txtZipStatus == undefined) &&
                (this.txtCountryStatus == 0 || this.txtCountryStatus == undefined) && (this.txtPhoneStatus == 0 || this.txtPhoneStatus == undefined)
                && (this.txtFaxStatus == 0 || this.txtFaxStatus == undefined) && (this.txtEmailStatus == 0 || this.txtEmailStatus == undefined) &&
                (this.txtEmailAlertStatus == 0 || this.txtEmailAlertStatus == undefined) && (this.txtInveCordEmailStatus == 0 || this.txtInveCordEmailStatus == undefined) &&
                (this.txtExcApprEmailStatus == 0 || this.txtExcApprEmailStatus == undefined) && (this.txtFreqSendRemStatus == 0 || this.txtFreqSendRemStatus == undefined)
                && (this.txtEmailRecalNotificationStatus == 0 || this.txtEmailRecalNotificationStatus == undefined) &&
                (this.txtDefaultPrinterStatus == 0 || this.txtDefaultPrinterStatus == undefined) &&
                (this.txtDefaultDistributionTypeStatus == 0 || this.txtDefaultDistributionTypeStatus == undefined) &&
                (this.txtDefaultDestinationLocStatus == 0 || this.txtDefaultDestinationLocStatus == undefined) &&
                (this.txtCategoryCodePOGenStatus == 0 || this.txtCategoryCodePOGenStatus == undefined) &&
                (this.txtBusinessUnitBillPOStatus == 0 || this.txtBusinessUnitBillPOStatus == undefined)
                && (this.txtValidLocBillPOStatus == 0 || this.txtValidLocBillPOStatus == undefined) &&
                (this.txtEmailLowStockAlertsStatus == 0 || this.txtEmailLowStockAlertsStatus == undefined) &&
                (this.txtEmailProductExpirationAlertsStatus == 0 || this.txtEmailProductExpirationAlertsStatus == undefined) &&
                (this.txtLimitNumCaseCartPicksDownloadStatus == 0 || this.txtLimitNumCaseCartPicksDownloadStatus == undefined) &&
                (this.txtDurationTrackingExpirationStatus == 0 || this.txtDurationTrackingExpirationStatus == undefined) &&
                (this.txtPercentageOptimumQuantityStatus == 0 || this.txtPercentageOptimumQuantityStatus == undefined)
                && (this.txtBuyerPOGenerationsStatus == 0 || this.txtBuyerPOGenerationsStatus == undefined) &&
                (this.txtStorageAreaForIssuePickStatus == 0 || this.txtStorageAreaForIssuePickStatus == undefined)) {
                this.btnSaveEnableDisable = false;
                this.btnUpdateEnableDisable = false;
            }
            else {
                this.btnSaveEnableDisable = true;
                this.btnUpdateEnableDisable = true;
            }
        }
        else {
            this.btnSaveEnableDisable = true;
            this.btnUpdateEnableDisable = true;
        }
    };
    SetupDepartmentsComponent.prototype.bindModelDataChange = function (event) {
        if ("DepartmentID" == event.TextBoxID.toString()) {
            this.txtDepartmentIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("DepartmentName" == event.TextBoxID.toString()) {
            this.txtDeptNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("AttentionTo" == event.TextBoxID.toString()) {
            this.txtAttentionToStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Address1" == event.TextBoxID.toString()) {
            this.txtAddress1Status = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Address2" == event.TextBoxID.toString()) {
            this.txtAddress2Status = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("City" == event.TextBoxID.toString()) {
            this.txtCityStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("State" == event.TextBoxID.toString()) {
            this.txtStateStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Zip" == event.TextBoxID.toString()) {
            this.txtZipStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Country" == event.TextBoxID.toString()) {
            this.txtCountryStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Phone" == event.TextBoxID.toString()) {
            this.txtPhoneStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Fax" == event.TextBoxID.toString()) {
            this.txtFaxStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Email" == event.TextBoxID.toString()) {
            this.txtEmailStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("EmailAlert" == event.TextBoxID.toString()) {
            this.txtEmailAlertStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("InveCordEmail" == event.TextBoxID.toString()) {
            this.txtInveCordEmailStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("ExcApprEmail" == event.TextBoxID.toString()) {
            this.txtExcApprEmailStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("FreqSendRem" == event.TextBoxID.toString()) {
            this.txtFreqSendRemStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("EmailRecalNotification" == event.TextBoxID.toString()) {
            this.txtEmailRecalNotificationStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("DefaultPrinter" == event.TextBoxID.toString()) {
            this.txtDefaultPrinterStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("DefaultDistributionType" == event.TextBoxID.toString()) {
            this.txtDefaultDistributionTypeStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("DefaultDestinationLoc" == event.TextBoxID.toString()) {
            this.txtDefaultDestinationLocStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("CategoryCodePOGen" == event.TextBoxID.toString()) {
            this.txtCategoryCodePOGenStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("BusinessUnitBillPO" == event.TextBoxID.toString()) {
            this.txtBusinessUnitBillPOStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("ValidLocBillPO" == event.TextBoxID.toString()) {
            this.txtValidLocBillPOStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("EmailLowStockAlerts" == event.TextBoxID.toString()) {
            this.txtEmailLowStockAlertsStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("EmailProductExpirationAlerts" == event.TextBoxID.toString()) {
            this.txtEmailProductExpirationAlertsStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("LimitNumCaseCartPicksDownload" == event.TextBoxID.toString()) {
            this.txtLimitNumCaseCartPicksDownloadStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("DurationTrackingExpiration" == event.TextBoxID.toString()) {
            this.txtDurationTrackingExpirationStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("PercentageOptimumQuantity" == event.TextBoxID.toString()) {
            this.txtPercentageOptimumQuantityStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("BuyerPOGenerations" == event.TextBoxID.toString()) {
            this.txtBuyerPOGenerationsStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("StorageAreaForIssuePick" == event.TextBoxID.toString()) {
            this.txtStorageAreaForIssuePickStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if (this.btnMode == "Update") {
            this.txtDepartmentIDStatus = 0;
            if (this.txtDeptNameStatus >= 1) {
                this.txtDeptNameStatus = 1;
            }
            else {
                this.txtDeptNameStatus = 0;
            }
        }
        this.ddlOrgGroupIdChange();
        if (this.txtDepartmentIDStatus == 0 && this.txtDeptNameStatus == 0 && this.orgGPStatus == 0) {
            if ((this.txtAttentionToStatus == 0 || this.txtAttentionToStatus == undefined) && (this.txtAddress1Status == 0 || this.txtAddress1Status == undefined)
                && (this.txtAddress2Status == 0 || this.txtAddress2Status == undefined) && (this.txtCityStatus == 0 || this.txtCityStatus == undefined) &&
                (this.txtStateStatus == 0 || this.txtStateStatus == undefined) && (this.txtZipStatus == 0 || this.txtZipStatus == undefined) &&
                (this.txtCountryStatus == 0 || this.txtCountryStatus == undefined) && (this.txtPhoneStatus == 0 || this.txtPhoneStatus == undefined)
                && (this.txtFaxStatus == 0 || this.txtFaxStatus == undefined) && (this.txtEmailStatus == 0 || this.txtEmailStatus == undefined) &&
                (this.txtEmailAlertStatus == 0 || this.txtEmailAlertStatus == undefined) && (this.txtInveCordEmailStatus == 0 || this.txtInveCordEmailStatus == undefined) &&
                (this.txtExcApprEmailStatus == 0 || this.txtExcApprEmailStatus == undefined) && (this.txtFreqSendRemStatus == 0 || this.txtFreqSendRemStatus == undefined)
                && (this.txtEmailRecalNotificationStatus == 0 || this.txtEmailRecalNotificationStatus == undefined) &&
                (this.txtDefaultPrinterStatus == 0 || this.txtDefaultPrinterStatus == undefined) &&
                (this.txtDefaultDistributionTypeStatus == 0 || this.txtDefaultDistributionTypeStatus == undefined) &&
                (this.txtDefaultDestinationLocStatus == 0 || this.txtDefaultDestinationLocStatus == undefined) &&
                (this.txtCategoryCodePOGenStatus == 0 || this.txtCategoryCodePOGenStatus == undefined) &&
                (this.txtBusinessUnitBillPOStatus == 0 || this.txtBusinessUnitBillPOStatus == undefined)
                && (this.txtValidLocBillPOStatus == 0 || this.txtValidLocBillPOStatus == undefined) &&
                (this.txtEmailLowStockAlertsStatus == 0 || this.txtEmailLowStockAlertsStatus == undefined) &&
                (this.txtEmailProductExpirationAlertsStatus == 0 || this.txtEmailProductExpirationAlertsStatus == undefined) &&
                (this.txtLimitNumCaseCartPicksDownloadStatus == 0 || this.txtLimitNumCaseCartPicksDownloadStatus == undefined) &&
                (this.txtDurationTrackingExpirationStatus == 0 || this.txtDurationTrackingExpirationStatus == undefined) &&
                (this.txtPercentageOptimumQuantityStatus == 0 || this.txtPercentageOptimumQuantityStatus == undefined)
                && (this.txtBuyerPOGenerationsStatus == 0 || this.txtBuyerPOGenerationsStatus == undefined) &&
                (this.txtStorageAreaForIssuePickStatus == 0 || this.txtStorageAreaForIssuePickStatus == undefined)) {
                this.btnSaveEnableDisable = false;
                this.btnUpdateEnableDisable = false;
            }
            else {
                this.btnSaveEnableDisable = true;
                this.btnUpdateEnableDisable = true;
            }
        }
        else {
            this.btnSaveEnableDisable = true;
            this.btnUpdateEnableDisable = true;
        }
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], SetupDepartmentsComponent.prototype, "dataTableComponent", void 0);
    SetupDepartmentsComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-setup-departments.component.html',
            providers: [HttpService_1.HttpService, api_1.ConfirmationService, pou_setup_departments_service_1.SetupDepartmentService, atpar_common_service_1.AtParCommonService]
        }),
        __param(3, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            api_1.ConfirmationService, Object, AtParConstants_1.AtParConstants,
            pou_setup_departments_service_1.SetupDepartmentService,
            atpar_common_service_1.AtParCommonService])
    ], SetupDepartmentsComponent);
    return SetupDepartmentsComponent;
}());
exports.SetupDepartmentsComponent = SetupDepartmentsComponent;
//# sourceMappingURL=pou-setup-departments.component.js.map