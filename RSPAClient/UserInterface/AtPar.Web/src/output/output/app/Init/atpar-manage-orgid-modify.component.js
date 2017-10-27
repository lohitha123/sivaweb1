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
var router_1 = require("@angular/router");
var RM_ORG_UNITS_1 = require("../../app/Entities/RM_ORG_UNITS");
var atpar_manage_orgid_services_1 = require("../../app/Init/atpar-manage-orgid.services");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
//import { CustomValidators } from '../common/textbox/custom-validators';
//import { CustomTextBoxModule } from '../common/textbox/CustomTextBoxModule';
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParEnums_3 = require("./../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var platform_browser_1 = require("@angular/platform-browser");
var routepath_1 = require("../AtPar/Menus/routepath");
var platform_browser_2 = require("@angular/platform-browser");
var ModifyOrgIdComponent = (function () {
    function ModifyOrgIdComponent(manageOrgIdServices, spinnerService, route, atParSharedDataService, document, atParConstant, title, router) {
        this.manageOrgIdServices = manageOrgIdServices;
        this.spinnerService = spinnerService;
        this.route = route;
        this.atParSharedDataService = atParSharedDataService;
        this.document = document;
        this.atParConstant = atParConstant;
        this.title = title;
        this.router = router;
        this.newItem = new RM_ORG_UNITS_1.RM_ORG_UNITS();
        this.orgGroupData = [];
        this.msgs = [];
        this.trOrgGrpId = false;
        this.drpDwnGrpId = false;
        this._deviceTokenEntry = [];
        this.mode = "Add";
        this.AllOrgGrp = "All";
        this.btnEnableDisable = true;
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    ModifyOrgIdComponent.prototype.ngOnInit = function () {
        var _this = this;
        try {
            this.spinnerService.start();
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.orgTypes = [];
            this.orgTypes.push({ label: 'Select Type', value: null });
            this.orgTypes.push({ label: 'Purchasing', value: 'P' });
            this.orgTypes.push({ label: 'Inventory', value: 'I' });
            this.title.setTitle('Setup Org ID');
            this.mode = this.atParSharedDataService.storage.mode;
            if (this.mode == (AtParEnums_2.ModeEnum.Add).toString()) {
                this.screenTitle = "OrgID Creation";
                this.isEditMode = false;
                this.submitButtonTitle = "Save";
                this.bindSymbol = "floppy-o";
                this.ddlRequireddata = true;
            }
            else if (this.mode == (AtParEnums_2.ModeEnum.Edit).toString()) {
                this.screenTitle = "Modify OrgID";
                this.newItem = this.atParSharedDataService.storage.rmOrgUnits;
                if (this.newItem.ORG_TYPE === "I") {
                    this.ddlRequireddata = true;
                    this.orgType = "Inventory";
                }
                else {
                    this.ddlRequireddata = false;
                    this.orgType = "Purchasing";
                }
                this.btnEnableDisable = false;
                this.submitButtonTitle = "Update";
                this.bindSymbol = "check";
                this.isEditMode = true;
            }
            else {
                this.screenTitle = "OrgID Creation";
                this.submitButtonTitle = "Save";
                this.bindSymbol = "floppy-o";
            }
            this.manageOrgIdServices.getOrgGrpGroups(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).forEach(function (resp) {
                _this.spinnerService.stop();
                switch (resp.StatType) {
                    case AtParEnums_3.StatusType.Success: {
                        _this.drpDwnGrpId = true;
                        _this.orgGroupData.push({ label: "Select one", value: null });
                        if (_this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].toUpperCase() == _this.AllOrgGrp.toUpperCase()) {
                            for (var i = 0; i < resp.DataList.length; i++) {
                                if (resp.DataList[i].ORG_GROUP_ID != _this.AllOrgGrp) {
                                    _this.orgGroupData.push({ label: resp.DataList[i].ORG_GROUP_ID + " - " + resp.DataList[i].ORG_GROUP_NAME, value: resp.DataList[i].ORG_GROUP_ID });
                                }
                            }
                        }
                        else {
                            for (var i = 0; i < resp.DataList.length; i++) {
                                if (resp.DataList[i].ORG_GROUP_ID.toUpperCase() == _this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].toUpperCase()) {
                                    _this.orgGroupData.push({ label: resp.DataList[i].ORG_GROUP_ID + " - " + resp.DataList[i].ORG_GROUP_NAME, value: resp.DataList[i].ORG_GROUP_ID });
                                }
                            }
                        }
                        break;
                    }
                    case AtParEnums_3.StatusType.Error: {
                        _this.statusMesssage = resp.StatusMessage;
                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    }
                    case AtParEnums_3.StatusType.Warn: {
                        _this.statusMesssage = resp.StatusMessage;
                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        break;
                    }
                    case AtParEnums_3.StatusType.Custom: {
                        _this.statusMesssage = resp.StatusMessage;
                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                        break;
                    }
                }
                _this.spinnerService.stop();
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    };
    ModifyOrgIdComponent.prototype.ddlOrgIdChanged = function () {
        if (this.newItem.ORG_TYPE == "I") {
            this.ddlRequireddata = true;
        }
        else {
            this.ddlRequireddata = false;
        }
        if (this.newItem.ORG_TYPE == "Select Org" || this.newItem.ORG_TYPE == undefined || this.newItem.ORG_TYPE == null || this.newItem.ORG_TYPE == "") {
            this.ddlOrgIDStatus = 1;
        }
        else {
            this.ddlOrgIDStatus = 0;
        }
        if (this.ddlRequireddata) {
            if (this.newItem.MASTER_GROUP_ID == "Select one" || this.newItem.MASTER_GROUP_ID == undefined || this.newItem.MASTER_GROUP_ID == null || this.newItem.MASTER_GROUP_ID == "") {
                this.ddlMasterOrgIDStatus = 1;
            }
            else {
                this.ddlMasterOrgIDStatus = 0;
            }
        }
        else {
            this.ddlMasterOrgIDStatus = 0;
        }
        if (this.submitButtonTitle.toString() === "Update") {
            this.txtOrgIdStatus = 0;
            if (this.txtOrgNameStatus >= 1) {
                this.txtOrgNameStatus = 1;
            }
            else {
                this.txtOrgNameStatus = 0;
            }
        }
        if (this.ddlRequireddata) {
            if (this.txtOrgIdStatus == 0 && this.txtOrgNameStatus == 0 && this.ddlOrgIDStatus == 0 && this.ddlMasterOrgIDStatus == 0 &&
                (this.newItem.ORG_ID != null && this.newItem.ORG_ID != "" && this.newItem.ORG_ID != undefined) && (this.newItem.ORG_NAME != null && this.newItem.ORG_NAME != "" && this.newItem.ORG_NAME != undefined)) {
                if ((this.txtAddress1Status == undefined || this.txtAddress1Status == 0) && (this.txtAddress2Status == undefined || this.txtAddress2Status == 0) &&
                    (this.txtCityStatus == undefined || this.txtCityStatus == 0) && (this.txtStateStatus == undefined || this.txtStateStatus == 0) &&
                    (this.txtPhoneStatus == undefined || this.txtPhoneStatus == 0) && (this.txtZipStatus == undefined || this.txtZipStatus == 0)) {
                    this.btnEnableDisable = false;
                }
                else {
                    this.btnEnableDisable = true;
                }
            }
            else {
                this.btnEnableDisable = true;
            }
        }
        else {
            if (this.txtOrgIdStatus == 0 && this.txtOrgNameStatus == 0 && this.ddlOrgIDStatus == 0 &&
                (this.newItem.ORG_ID != null && this.newItem.ORG_ID != "" && this.newItem.ORG_ID != undefined) && (this.newItem.ORG_NAME != null && this.newItem.ORG_NAME != "" && this.newItem.ORG_NAME != undefined)) {
                if ((this.txtAddress1Status == undefined || this.txtAddress1Status == 0) && (this.txtAddress2Status == undefined || this.txtAddress2Status == 0) &&
                    (this.txtCityStatus == undefined || this.txtCityStatus == 0) && (this.txtStateStatus == undefined || this.txtStateStatus == 0) &&
                    (this.txtPhoneStatus == undefined || this.txtPhoneStatus == 0) && (this.txtZipStatus == undefined || this.txtZipStatus == 0) && (this.ddlMasterOrgIDStatus == 0 || this.ddlMasterOrgIDStatus == undefined)) {
                    this.btnEnableDisable = false;
                }
                else {
                    this.btnEnableDisable = true;
                }
            }
            else {
                this.btnEnableDisable = true;
            }
        }
    };
    ModifyOrgIdComponent.prototype.ddlMasterGroupIdChanged = function () {
        if (this.ddlRequireddata) {
            if (this.newItem.MASTER_GROUP_ID == "Select one" || this.newItem.MASTER_GROUP_ID == undefined || this.newItem.MASTER_GROUP_ID == null || this.newItem.MASTER_GROUP_ID == "") {
                this.ddlMasterOrgIDStatus = 1;
            }
            else {
                this.ddlMasterOrgIDStatus = 0;
            }
        }
        else {
            this.ddlMasterOrgIDStatus = 0;
        }
        if (this.newItem.ORG_TYPE == "Select Org" || this.newItem.ORG_TYPE == undefined || this.newItem.ORG_TYPE == null || this.newItem.ORG_TYPE == "") {
            this.ddlOrgIDStatus = 1;
        }
        else {
            this.ddlOrgIDStatus = 0;
        }
        if (this.submitButtonTitle.toString() === "Update") {
            this.txtOrgIdStatus = 0;
            if (this.txtOrgNameStatus >= 1) {
                this.txtOrgNameStatus = 1;
            }
            else {
                this.txtOrgNameStatus = 0;
            }
        }
        if (this.ddlRequireddata) {
            if (this.txtOrgIdStatus == 0 && this.txtOrgNameStatus == 0 && this.ddlOrgIDStatus == 0 && this.ddlMasterOrgIDStatus == 0 &&
                (this.newItem.ORG_ID != null && this.newItem.ORG_ID != "" && this.newItem.ORG_ID != undefined) && (this.newItem.ORG_NAME != null && this.newItem.ORG_NAME != "" && this.newItem.ORG_NAME != undefined)) {
                if ((this.txtAddress1Status == undefined || this.txtAddress1Status == 0) && (this.txtAddress2Status == undefined || this.txtAddress2Status == 0) &&
                    (this.txtCityStatus == undefined || this.txtCityStatus == 0) && (this.txtStateStatus == undefined || this.txtStateStatus == 0) &&
                    (this.txtPhoneStatus == undefined || this.txtPhoneStatus == 0) && (this.txtZipStatus == undefined || this.txtZipStatus == 0)) {
                    this.btnEnableDisable = false;
                }
                else {
                    this.btnEnableDisable = true;
                }
            }
            else {
                this.btnEnableDisable = true;
            }
        }
        else {
            if (this.txtOrgIdStatus == 0 && this.txtOrgNameStatus == 0 && this.ddlOrgIDStatus == 0 &&
                (this.newItem.ORG_ID != null && this.newItem.ORG_ID != "" && this.newItem.ORG_ID != undefined) && (this.newItem.ORG_NAME != null && this.newItem.ORG_NAME != "" && this.newItem.ORG_NAME != undefined)) {
                if ((this.txtAddress1Status == undefined || this.txtAddress1Status == 0) && (this.txtAddress2Status == undefined || this.txtAddress2Status == 0) &&
                    (this.txtCityStatus == undefined || this.txtCityStatus == 0) && (this.txtStateStatus == undefined || this.txtStateStatus == 0) &&
                    (this.txtPhoneStatus == undefined || this.txtPhoneStatus == 0) && (this.txtZipStatus == undefined || this.txtZipStatus == 0) && (this.ddlMasterOrgIDStatus == 0 || this.ddlMasterOrgIDStatus == undefined)) {
                    this.btnEnableDisable = false;
                }
                else {
                    this.btnEnableDisable = true;
                }
            }
            else {
                this.btnEnableDisable = true;
            }
        }
    };
    //navigatVendorHome
    ModifyOrgIdComponent.prototype.navigatOrgIdHome = function (statusMesssage, statusType) {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.title.setTitle('Manage Org ID');
        if (statusMesssage == undefined || statusMesssage == null && statusType == undefined || statusType == null) {
            //this.atParSharedDataService.storage = { "mode": ModeEnum.List };
            var navigationExtras = {
                preserveQueryParams: false,
                relativeTo: this.route
            };
            this.router.navigate(['../'], navigationExtras);
        }
        else {
            var navigationExtras = {
                queryParams: { "mode": (AtParEnums_2.ModeEnum.List).toString(), "statusMessage": this.statusMesssage.toString(), "statusType": statusType.toString() },
                preserveQueryParams: false,
                relativeTo: this.route
            };
            this.router.navigate(['../'], navigationExtras);
        }
    };
    ModifyOrgIdComponent.prototype.createOrgId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.msgs = [];
                        if (this.newItem.ORG_TYPE == null || this.newItem.ORG_TYPE == undefined) {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Org Type" });
                            return [2 /*return*/];
                        }
                        else if (this.ddlRequireddata) {
                            if (this.newItem.MASTER_GROUP_ID == null || this.newItem.MASTER_GROUP_ID == undefined) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Master Date Group ID" });
                                return [2 /*return*/];
                            }
                            else {
                                this.newItem.MASTER_GROUP_ID = this.newItem.MASTER_GROUP_ID;
                            }
                        }
                        //else {
                        if (this.mode == (AtParEnums_2.ModeEnum.Add).toString()) {
                            this.newItem.STATUS = true;
                            this.newItem.EVENT = null;
                        }
                        if (this.mode == "0" || this.mode == "Add") {
                            this.mode = "Add";
                        }
                        else {
                            this.mode = "Edit";
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageOrgIdServices.insertUpdateOrgUnits(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.mode, this.newItem).forEach(function (resp) {
                                _this.msgs = [];
                                //this.spinnerService.stop();
                                switch (resp.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        if (_this.mode == "Add") {
                                            var statusMessage = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Org").replace("2%", _this.newItem.ORG_ID);
                                            _this.btnEnableDisable = true;
                                            _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                            _this.newItem = new RM_ORG_UNITS_1.RM_ORG_UNITS();
                                            _this.newItem.STATUS = true;
                                            _this.newItem.EVENT = null;
                                            _this.btnEnableDisable = true;
                                            document.getElementById("txtORG_ID").focus();
                                        }
                                        else if (_this.mode == "Edit") {
                                            _this.statusMesssage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Org").replace("2%", _this.newItem.ORG_ID);
                                            _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                                            _this.btnEnableDisable = false;
                                            document.getElementById("txtORG_NAME").focus();
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.statusMesssage = resp.StatusMessage;
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: _this.statusMesssage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.statusMesssage = resp.StatusMessage;
                                        var s = _this.statusMesssage.includes("(OrgID)");
                                        if (s == true) {
                                            _this.statusMesssage = _this.statusMesssage.replace('Org ID', 'Org');
                                            _this.statusMesssage = _this.statusMesssage.replace('(OrgID)', _this.newItem.ORG_ID);
                                        }
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: _this.statusMesssage });
                                        break;
                                    }
                                }
                                _this.atParConstant.scrollToTop();
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "createOrgId");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ModifyOrgIdComponent.prototype.bindModelDataChange = function (event) {
        if ("txtORG_ID" == event.TextBoxID.toString()) {
            this.txtOrgIdStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtORG_NAME" == event.TextBoxID.toString()) {
            this.txtOrgNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtADDRESS1" == event.TextBoxID.toString()) {
            this.txtAddress1Status = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtADDRESS2" == event.TextBoxID.toString()) {
            this.txtAddress2Status = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtCITY" == event.TextBoxID.toString()) {
            this.txtCityStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtSTATE" == event.TextBoxID.toString()) {
            this.txtStateStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtPHONE_NO" == event.TextBoxID.toString()) {
            this.txtPhoneStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtZIP" == event.TextBoxID.toString()) {
            this.txtZipStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if (this.submitButtonTitle.toString() === "Update") {
            this.txtOrgIdStatus = 0;
            if (this.txtOrgNameStatus >= 1) {
                this.txtOrgNameStatus = 1;
            }
            else {
                this.txtOrgNameStatus = 0;
            }
        }
        this.ddlOrgIdChanged();
        this.ddlMasterGroupIdChanged();
        if (this.ddlRequireddata) {
            if (this.txtOrgIdStatus == 0 && this.txtOrgNameStatus == 0 && this.ddlOrgIDStatus == 0 && this.ddlMasterOrgIDStatus == 0) {
                if ((this.txtAddress1Status == undefined || this.txtAddress1Status == 0) && (this.txtAddress2Status == undefined || this.txtAddress2Status == 0) &&
                    (this.txtCityStatus == undefined || this.txtCityStatus == 0) && (this.txtStateStatus == undefined || this.txtStateStatus == 0) &&
                    (this.txtPhoneStatus == undefined || this.txtPhoneStatus == 0) && (this.txtZipStatus == undefined || this.txtZipStatus == 0)) {
                    this.btnEnableDisable = false;
                }
                else {
                    this.btnEnableDisable = true;
                }
            }
            else {
                this.btnEnableDisable = true;
            }
        }
        else {
            if (this.txtOrgIdStatus == 0 && this.txtOrgNameStatus == 0 && this.ddlOrgIDStatus == 0) {
                if ((this.txtAddress1Status == undefined || this.txtAddress1Status == 0) && (this.txtAddress2Status == undefined || this.txtAddress2Status == 0) &&
                    (this.txtCityStatus == undefined || this.txtCityStatus == 0) && (this.txtStateStatus == undefined || this.txtStateStatus == 0) &&
                    (this.txtPhoneStatus == undefined || this.txtPhoneStatus == 0) && (this.txtZipStatus == undefined || this.txtZipStatus == 0) && (this.ddlMasterOrgIDStatus == 0 || this.ddlMasterOrgIDStatus == undefined)) {
                    this.btnEnableDisable = false;
                }
                else {
                    this.btnEnableDisable = true;
                }
            }
            else {
                this.btnEnableDisable = true;
            }
        }
    };
    ModifyOrgIdComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ModifyOrgIdComponent.prototype.ngOnDestroy = function () {
        this._deviceTokenEntry = null;
        this.mode = null;
        this.statusCode = null;
        this.statusMesssage = null;
        this.screenTitle = null;
        this.submitButtonTitle = null;
        this.msgs = null;
        this.statusMesssage = null;
        this.orgGroupData = null;
    };
    ModifyOrgIdComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-manage-orgid-modify.component.html',
            providers: [atpar_manage_orgid_services_1.ManageOrgIdServices],
        }),
        __param(4, core_1.Inject(platform_browser_2.DOCUMENT)),
        __metadata("design:paramtypes", [atpar_manage_orgid_services_1.ManageOrgIdServices, event_spinner_service_1.SpinnerService, router_1.ActivatedRoute,
            AtParSharedDataService_1.AtParSharedDataService, Object, AtParConstants_1.AtParConstants,
            platform_browser_1.Title,
            router_1.Router])
    ], ModifyOrgIdComponent);
    return ModifyOrgIdComponent;
}());
exports.ModifyOrgIdComponent = ModifyOrgIdComponent;
//# sourceMappingURL=atpar-manage-orgid-modify.component.js.map