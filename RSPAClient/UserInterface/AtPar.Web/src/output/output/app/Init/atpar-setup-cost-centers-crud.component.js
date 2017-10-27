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
var router_1 = require("@angular/router");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var AtParConstants_1 = require("../Shared/AtParConstants");
var atpar_setup_cost_centers_services_1 = require("../../app/Init/atpar-setup-cost-centers.services");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var PAR_MNGT_COST_CENTER_1 = require("../../app/Entities/PAR_MNGT_COST_CENTER");
var MT_POU_DEPT_1 = require("../../app/Entities/MT_POU_DEPT");
var AtParEnums_1 = require("../Shared/AtParEnums");
var routepath_1 = require("../AtPar/Menus/routepath");
var SetupCostCentersCrud = (function () {
    function SetupCostCentersCrud(setupCostCentersServices, router, spinnerService, route, atParConstant, atParSharedDataService) {
        this.setupCostCentersServices = setupCostCentersServices;
        this.router = router;
        this.spinnerService = spinnerService;
        this.route = route;
        this.atParConstant = atParConstant;
        this.atParSharedDataService = atParSharedDataService;
        this.loading = true;
        this.newItem = new PAR_MNGT_COST_CENTER_1.PAR_MNGT_COST_CENTER();
        this._deviceTokenEntry = [];
        this.deptList = [];
        this.hasMultipleOrgGroups = false;
        this.orgGroupData = [];
        this.isEditMode = false;
        this.msgs = [];
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    SetupCostCentersCrud.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    SetupCostCentersCrud.prototype.navigateToCostCenterHome = function () {
        // Navigate to Cost Center Parent route
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        var navigationExtras = {
            relativeTo: this.route
        };
        this.router.navigate(['../'], navigationExtras);
    };
    SetupCostCentersCrud.prototype.ddlOrgGrpIdChanged = function ($event) {
        this.btnEnableDisable();
    };
    /**
    * Enable and Disable Add/Update button
    */
    SetupCostCentersCrud.prototype.btnEnableDisable = function () {
        if (this.ccstatus == 0 && this.newItem.COST_CENTER_CODE !== undefined && this.newItem.COST_CENTER_CODE !== "" && this.newItem.COST_CENTER_CODE !== null && (this.descstatus == 0 || this.descstatus == undefined) && this.newItem.ORG_ID !== -1 && ((this.newItem.ORG_ID !== "" && this.newItem.ORG_ID !== undefined) || (this.orgGroupId !== "" && this.orgGroupId !== undefined))) {
            this.loading = false;
        }
        else {
            this.loading = true;
        }
    };
    SetupCostCentersCrud.prototype.bindModelDataChange = function (event) {
        try {
            if ("costcentercode" == event.TextBoxID.toString()) {
                this.ccstatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("description" == event.TextBoxID.toString()) {
                this.descstatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.submitButtonTitle == "Update") {
                if (this.descstatus == undefined || this.descstatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
            if (this.submitButtonTitle == "Save") {
                this.btnEnableDisable();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindModelDataChange");
        }
    };
    SetupCostCentersCrud.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.newItem = new PAR_MNGT_COST_CENTER_1.PAR_MNGT_COST_CENTER();
                        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.spinnerService.start();
                        this.department = new MT_POU_DEPT_1.MT_POU_DEPT();
                        this.msgs = [];
                        return [4 /*yield*/, this.setupCostCentersServices.getDepartments().forEach(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                                var deptobj, _i, _a, dept;
                                return __generator(this, function (_b) {
                                    this.msgs = [];
                                    switch (resp.StatType) {
                                        case AtParEnums_1.StatusType.Success:
                                            deptobj = {};
                                            for (_i = 0, _a = resp.DataList; _i < _a.length; _i++) {
                                                dept = _a[_i];
                                                deptobj.DEPT_ID = dept.DEPT_ID;
                                                deptobj.DEPT_NAME = dept.DEPT_NAME;
                                                deptobj.DEPARTMENT = dept.DEPARTMENT;
                                                this.deptList.push(deptobj);
                                                deptobj = {};
                                            }
                                            break;
                                        case AtParEnums_1.StatusType.Error:
                                            this.statusMesssage = resp.StatusMessage;
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                            break;
                                        case AtParEnums_1.StatusType.Warn:
                                            this.statusMesssage = resp.StatusMessage;
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                            break;
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.setupCostCentersServices.getOrgGroupList(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).forEach(function (resp) {
                                _this.msgs = [];
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.orgGroupList = resp.DataList;
                                        _this.statusCode = resp.StatusCode;
                                        if (_this.orgGroupList.length > 1) {
                                            _this.hasMultipleOrgGroups = true;
                                            _this.orgGroupData.push({ label: 'Select One', value: -1 });
                                            for (var i = 0; i < _this.orgGroupList.length; i++) {
                                                if (_this.orgGroupList[i].ORG_GROUP_ID != "All") {
                                                    _this.orgGroupData.push({ label: _this.orgGroupList[i].ORG_GROUP_ID + ' - ' + _this.orgGroupList[i].ORG_GROUP_NAME, value: _this.orgGroupList[i].ORG_GROUP_ID });
                                                }
                                            }
                                        }
                                        else {
                                            _this.orgGroupId = _this.orgGroupList[0].ORG_GROUP_ID + ' - ' + _this.orgGroupList[0].ORG_GROUP_NAME;
                                            _this.orgGroupName = _this.orgGroupList[0].ORG_GROUP_NAME;
                                            _this.newItem.ORG_ID = _this.orgGroupId;
                                        }
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.spinnerService.stop();
                                        _this.statusMesssage = resp.StatusMessage;
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.msgs = [];
                                        _this.statusMesssage = resp.StatusMessage;
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        break;
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.mode = this.atParSharedDataService.storage.mode;
                        if (this.mode == (AtParEnums_1.ModeEnum.Add).toString()) {
                            this.screenTitle = "Setup Cost Center";
                            this.isEditMode = false;
                            this.submitButtonTitle = "Save";
                            this.bindSymbal = "floppy-o";
                            this.loading = true;
                            this.newItem.UPDATE_USER_ID = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                            this.newItem.STATUS = false;
                            this.department = new MT_POU_DEPT_1.MT_POU_DEPT();
                            this.department.DEPT_ID = '';
                        }
                        else if (this.mode == (AtParEnums_1.ModeEnum.Edit).toString()) {
                            this.screenTitle = "Setup Cost Center";
                            this.submitButtonTitle = "Update";
                            this.bindSymbal = "check";
                            this.isEditMode = true;
                            this.loading = false;
                            this.newItem = this.atParSharedDataService.storage.costCenterData;
                            if (this.orgGroupData != undefined && this.orgGroupData != null) {
                                for (i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].value != "ALL" && this.orgGroupData[i].value == this.newItem.ORG_ID) {
                                        this.orgGroupId = this.orgGroupData[1].label;
                                        break;
                                    }
                                }
                            }
                            this.newItem.UPDATE_USER_ID = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                            this.department = new MT_POU_DEPT_1.MT_POU_DEPT();
                            this.department.DEPT_ID = this.newItem.DEPT_ID;
                            this.department.DEPTNAME = this.newItem.DEPTNAME;
                        }
                        if (this.mode == (AtParEnums_1.ModeEnum.Add).toString()) {
                            if (this.hasMultipleOrgGroups == false) {
                                document.getElementById('costcentercode').focus();
                            }
                        }
                        else if (this.mode == (AtParEnums_1.ModeEnum.Edit).toString()) {
                            if (this.hasMultipleOrgGroups == false || this.isEditMode == true) {
                                document.getElementById('description').focus();
                            }
                        }
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupCostCentersCrud.prototype.filterDepartment = function (event) {
        var query = event.query;
        this.filteredDepartments = this.filterByDepartment(query, this.deptList);
    };
    SetupCostCentersCrud.prototype.filterByDepartment = function (query, deptList) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < deptList.length; i++) {
                var dept = deptList[i];
                filtered.push(dept.DEPARTMENT);
            }
        }
        else {
            for (var i = 0; i < deptList.length; i++) {
                var dept = deptList[i];
                if (dept.DEPT_ID.toLowerCase().indexOf(query.toLowerCase()) == 0 || dept.DEPT_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                    filtered.push(dept.DEPARTMENT);
                }
            }
        }
        return filtered;
    };
    SetupCostCentersCrud.prototype.isDepartmentExists = function (element, array) {
        return array.some(function (x) { return x.DEPT_ID === element; });
    };
    SetupCostCentersCrud.prototype.submitCostCenterData = function () {
        var _this = this;
        if (this.department.DEPT_ID != null && this.department.DEPT_ID != undefined && this.department.DEPT_ID != '') {
            if (!this.isDepartmentExists(this.department.DEPT_ID.split(' - ')[0], this.deptList)) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dept ID' });
                return;
            }
            else {
                this.msgs = [];
            }
        }
        try {
            if (this.mode == (AtParEnums_1.ModeEnum.Add).toString()) {
                //creat              
                if (this.department.DEPT_ID != null) {
                    this.newItem.DEPT_ID = this.department.DEPT_ID.split(" - ")[0].trim();
                }
                else {
                }
                if (this.newItem.ORG_ID != null && this.newItem.ORG_ID != undefined && this.newItem.ORG_ID != -1) {
                    var orgId_1 = this.newItem.ORG_ID;
                    if (!this.hasMultipleOrgGroups) {
                        var splitorgid = this.newItem.ORG_ID.split(" - ");
                        this.newItem.ORG_ID = splitorgid[0].trim();
                    }
                    this.setupCostCentersServices.createCostCenter(this.newItem).forEach(function (resp) {
                        _this.msgs = [];
                        switch (resp.StatType) {
                            case AtParEnums_1.StatusType.Success:
                                _this.statusMesssage = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "CostCenter").replace("2%", _this.newItem.COST_CENTER_CODE);
                                _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                                _this.newItem = new PAR_MNGT_COST_CENTER_1.PAR_MNGT_COST_CENTER();
                                _this.newItem.ORG_ID = orgId_1;
                                _this.department = new MT_POU_DEPT_1.MT_POU_DEPT();
                                _this.department.DEPT_ID = _this.newItem.DEPT_ID;
                                if (_this.hasMultipleOrgGroups && !_this.isEditMode) {
                                    document.getElementById('txtddlOrgGroup').focus();
                                }
                                else {
                                    document.getElementById('costcentercode').focus();
                                }
                                _this.loading = true;
                                break;
                            case AtParEnums_1.StatusType.Error:
                                _this.statusMesssage = resp.StatusMessage;
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                break;
                            case AtParEnums_1.StatusType.Warn:
                                _this.statusMesssage = resp.StatusMessage;
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                break;
                        }
                    });
                }
                else {
                    this.msgs = [];
                    this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "select Org Group ID" });
                }
            }
            else if (this.mode == (AtParEnums_1.ModeEnum.Edit).toString()) {
                this.newItem.DEPT_ID = this.department.DEPT_ID;
                if (this.newItem.ORG_ID != "") {
                    this.setupCostCentersServices.updateCostCenter(this.newItem).forEach(function (resp) {
                        _this.msgs = [];
                        switch (resp.StatType) {
                            case AtParEnums_1.StatusType.Success:
                                //this.statusMesssage = "Cost Center Updated Successfully";
                                _this.statusMesssage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "CostCenter").replace("2%", _this.newItem.COST_CENTER_CODE);
                                _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                                var ccCode = _this.newItem.COST_CENTER_CODE;
                                var ccDesc = _this.newItem.DESCRIPTION;
                                _this.newItem = new PAR_MNGT_COST_CENTER_1.PAR_MNGT_COST_CENTER();
                                _this.newItem.COST_CENTER_CODE = ccCode;
                                _this.newItem.DESCRIPTION = ccDesc;
                                if (_this.hasMultipleOrgGroups && !_this.isEditMode) {
                                    document.getElementById('txtddlOrgGroup').focus();
                                }
                                else {
                                    document.getElementById('description').focus();
                                }
                                break;
                            case AtParEnums_1.StatusType.Error:
                                _this.statusMesssage = resp.StatusMessage;
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                break;
                            case AtParEnums_1.StatusType.Warn:
                                _this.statusMesssage = resp.StatusMessage;
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                break;
                        }
                    });
                }
                else {
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "select Org Group ID" });
                }
            }
            else {
                this.newItem = new PAR_MNGT_COST_CENTER_1.PAR_MNGT_COST_CENTER();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "submitCostCenterData");
        }
    };
    SetupCostCentersCrud.prototype.ngOnDestroy = function () {
        this.statusCode = -1;
        this._deviceTokenEntry = null;
        this.mode = null;
        this.orgGroupList = null;
        this.deptList = null;
        this.orgGroupId = null;
        this.loading = null;
        this.statusMesssage = null;
        this.hasMultipleOrgGroups = null;
        this.orgGroupData = null;
        this.screenTitle = null;
        this.submitButtonTitle = null;
        this.filteredDepartments = null;
        this.isEditMode = null;
        this.newItem = null;
        this.msgs = [];
        // this.atParSharedDataService.storage = {};
    };
    SetupCostCentersCrud = __decorate([
        core_1.Component({
            templateUrl: 'atpar-setup-add-modify-costcenter.component.html',
            providers: [atpar_setup_cost_centers_services_1.SetupCostCentersServices, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [atpar_setup_cost_centers_services_1.SetupCostCentersServices,
            router_1.Router,
            event_spinner_service_1.SpinnerService,
            router_1.ActivatedRoute,
            AtParConstants_1.AtParConstants,
            AtParSharedDataService_1.AtParSharedDataService])
    ], SetupCostCentersCrud);
    return SetupCostCentersCrud;
}());
exports.SetupCostCentersCrud = SetupCostCentersCrud;
//# sourceMappingURL=atpar-setup-cost-centers-crud.component.js.map