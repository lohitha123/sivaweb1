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
var PAR_MNGT_VENDOR_1 = require("../../app/Entities/PAR_MNGT_VENDOR");
var atpar_setup_vendors_services_1 = require("../../app/Init/atpar-setup-vendors.services");
//import { CustomValidators } from '../common/textbox/custom-validators';
//import { CustomTextBoxModule } from '../common/textbox/CustomTextBoxModule';
var AtParEnums_1 = require("../Shared/AtParEnums");
var router_1 = require("@angular/router");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParEnums_2 = require("../Shared/AtParEnums");
var customvalidation_1 = require("../common/validations/customvalidation");
var AtParEnums_3 = require("./../Shared/AtParEnums");
var sharedData_1 = require("../Shared/sharedData");
var AtParConstants_1 = require("../Shared/AtParConstants");
var routepath_1 = require("../AtPar/Menus/routepath");
var platform_browser_1 = require("@angular/platform-browser");
var SetupModifyVendorsComponent = (function () {
    function SetupModifyVendorsComponent(setupVendorServices, spinnerService, route, atParSharedDataService, router, atParConstant, document, validate, sharedData) {
        this.setupVendorServices = setupVendorServices;
        this.spinnerService = spinnerService;
        this.route = route;
        this.atParSharedDataService = atParSharedDataService;
        this.router = router;
        this.atParConstant = atParConstant;
        this.document = document;
        this.validate = validate;
        this.sharedData = sharedData;
        this.ddlorgGroupData = [];
        this.msgs = [];
        this._deviceTokenEntry = [];
        this.isEditMode = false;
        this.hasMultipleOrgGroups = false;
        this.loading = true;
        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
        this.allowvendorAccess = false;
        this.allowVendorAccessValidation = false;
        this.ddlUserIdData = [];
        this.ddlStates = [];
        this.ddlcountry = [];
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    SetupModifyVendorsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.mode = this.atParSharedDataService.storage.mode;
                        if (this.mode == (AtParEnums_2.ModeEnum.Add).toString()) {
                            this.screenTitle = "Vendor Creation";
                            this.isEditMode = false;
                            this.submitButtonTitle = "Save";
                            this.bindSymbal = "floppy-o";
                            this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
                        }
                        else if (this.mode == (AtParEnums_2.ModeEnum.Edit).toString()) {
                            this.screenTitle = "Modify Vendor";
                            this.newItem = this.atParSharedDataService.storage.SetupModifyVendorsEditData;
                            //this.selectedDropDownUserId  =  this.newItem.VEND_USER_ID;
                            if (this.newItem.ALLOW_VEND_ACCESS == "Y") {
                                this.newItem.ALLOW_VEND_ACCESS = true;
                                this.allowVendorAccessValidation = true;
                            }
                            else {
                                this.newItem.ALLOW_VEND_ACCESS = false;
                                this.allowVendorAccessValidation = false;
                            }
                            this.submitButtonTitle = "Update";
                            this.bindSymbal = "check";
                            this.loading = false;
                            this.isEditMode = true;
                        }
                        else {
                            this.screenTitle = "Vendor Creation";
                            this.submitButtonTitle = "Save";
                            this.loading = true;
                        }
                        this.BindToDisPathTypeDD();
                        this.BindToCountryDD();
                        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupVendorServices.GetOrgGroup(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).forEach(function (resp) {
                                _this.spinnerService.stop();
                                switch (resp.StatType) {
                                    case AtParEnums_3.StatusType.Success:
                                        {
                                            _this.orgGroupList = resp.DataList;
                                            if (_this.orgGroupList.length > 1) {
                                                _this.hasMultipleOrgGroups = true;
                                                _this.ddlorgGroupData.push({ label: "Select One", value: null });
                                                for (var i = 0; i < _this.orgGroupList.length; i++) {
                                                    if (_this.orgGroupList[i].ORG_GROUP_ID != "All") {
                                                        _this.ddlorgGroupData.push({ label: _this.orgGroupList[i].ORG_GROUP_ID + " - " + _this.orgGroupList[i].ORG_GROUP_NAME, value: _this.orgGroupList[i].ORG_GROUP_ID });
                                                    }
                                                }
                                            }
                                            else {
                                                _this.lblOrgGroupId = _this.orgGroupList[0].ORG_GROUP_ID + " - " + _this.orgGroupList[0].ORG_GROUP_NAME;
                                                _this.newItem.ORG_GROUP_ID = _this.orgGroupList[0].ORG_GROUP_ID;
                                            }
                                            break;
                                        }
                                    case AtParEnums_3.StatusType.Error:
                                        {
                                            _this.statusMesssage = resp.StatusMessage;
                                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_3.StatusType.Warn:
                                        {
                                            _this.statusMesssage = resp.StatusMessage;
                                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_3.StatusType.Custom:
                                        {
                                            _this.statusMesssage = resp.StatusMessage;
                                            _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.setupVendorServices.GetVendorUsers(this.newItem.VENDOR_ID, this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).forEach(function (resp) {
                                _this.spinnerService.stop();
                                _this.ddlUserIdData.push({ label: "Select User", value: "Select User" });
                                switch (resp.StatType) {
                                    case AtParEnums_3.StatusType.Success:
                                        {
                                            _this.userData = resp.DataList;
                                            for (var i = 0; i < _this.userData.length; i++) {
                                                _this.ddlUserIdData.push({ label: _this.userData[i].Value, value: _this.userData[i].ID });
                                            }
                                            break;
                                        }
                                }
                            })];
                    case 2:
                        _a.sent();
                        if (this.mode == (AtParEnums_2.ModeEnum.Add).toString()) {
                            this.newItem.LAST_UPDATE_USER = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        }
                        else if (this.mode == (AtParEnums_2.ModeEnum.Edit).toString()) {
                            //this.newItem = this.atParSharedDataService.storage;
                            this.onChangeddlCountry();
                            if (this.newItem.ALLOW_VEND_ACCESS == "Y") {
                                this.newItem.ALLOW_VEND_ACCESS = true;
                            }
                            else {
                                this.newItem.ALLOW_VEND_ACCESS = false;
                            }
                            this.newItem.LAST_UPDATE_USER = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        }
                        else {
                            this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
                        }
                        if (this.mode == (AtParEnums_2.ModeEnum.Add).toString()) {
                            if (this.hasMultipleOrgGroups == false) {
                                document.getElementById('txtVendorId').focus();
                            }
                        }
                        else if (this.mode == (AtParEnums_2.ModeEnum.Edit).toString()) {
                            if (this.hasMultipleOrgGroups == false) {
                                document.getElementById('txtVendorName').focus();
                            }
                        }
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    //Navigate to Previous Screen
    SetupModifyVendorsComponent.prototype.navigatVendorHome = function (statusMesssage, statusType) {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        if (statusMesssage == undefined || statusMesssage == null && statusType == undefined || statusType == null) {
            var navigationExtras = {
                queryParams: {},
                preserveQueryParams: false,
                relativeTo: this.route
            };
            this.router.navigate(['../'], navigationExtras);
        }
        else {
            var navigationExtras = {
                queryParams: {},
                preserveQueryParams: false,
                relativeTo: this.route
            };
            this.router.navigate(['../'], navigationExtras);
        }
    };
    SetupModifyVendorsComponent.prototype.onChangeddlCountry = function () {
        this.newItem.STATE = "";
        if (this.newItem.COUNTRY != null && this.newItem.COUNTRY != 'Select Country' && this.newItem.COUNTRY != undefined) {
            this.onChangeddlStates();
            if (this.newItem.COUNTRY == 'CANADA') {
                this.ddlStates = [];
                this.ddlStates.push({ countryid: 1, label: "Select State", value: "Select State" });
                var details = this.sharedData.getStates().filter(function (item) { return item.countryid == 1; });
                for (var i = 0; i < details.length; i++) {
                    this.ddlStates.push({ countryid: 1, label: details[i].label, value: details[i].value });
                }
            }
            else if (this.newItem.COUNTRY == 'USA') {
                this.ddlStates = [];
                this.ddlStates.push({ countryid: 2, label: "Select State", value: "Select State" });
                var detailslist = this.sharedData.getStates().filter(function (item) { return item.countryid == 2; });
                for (var j = 0; j < detailslist.length; j++) {
                    this.ddlStates.push({ countryid: 2, label: detailslist[j].label, value: detailslist[j].value });
                }
            }
        }
        else {
            this.ddlStates = this.sharedData.getStates().filter(function (item) { return item.countryid == 0; });
        }
    };
    SetupModifyVendorsComponent.prototype.onChangeddlStates = function () {
        if (this.newItem.COUNTRY == null || this.newItem.COUNTRY == 'Select Country' || this.newItem.COUNTRY == undefined) {
            this.ddlStates = [];
            this.ddlStates.push({ countryid: 0, label: "Select State", value: "Select State" });
            this.ddlStates = this.sharedData.getStates().filter(function (item) { return item.countryid == 0; });
        }
    };
    SetupModifyVendorsComponent.prototype.BindToDisPathTypeDD = function () {
        this.ddldispatchType = [];
        this.ddldispatchType.push({ label: "Select Dispatch Type", value: null });
        this.ddldispatchType.push({ label: 'FILE ', value: 'FILE' });
        this.ddldispatchType.push({ label: 'PHONE', value: 'PHONE' });
        this.ddldispatchType.push({ label: 'EMAIL', value: 'EMAIL' });
        this.ddldispatchType.push({ label: 'FAX', value: 'FAX' });
    };
    SetupModifyVendorsComponent.prototype.BindToCountryDD = function () {
        this.ddlcountry = this.sharedData.getCountries();
        this.ddlStates = this.sharedData.getStates().filter(function (item) { return item.countryid == 0; });
    };
    SetupModifyVendorsComponent.prototype.ddlOrgGrpIdChanged = function ($event) {
        this.btnEnableDisable();
    };
    SetupModifyVendorsComponent.prototype.bindModelDataChange = function (event) {
        if ("txtVendorId" == event.TextBoxID.toString()) {
            this.vendorIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtVendorName" == event.TextBoxID.toString()) {
            this.vendorNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtAddress1" == event.TextBoxID.toString()) {
            this.address1Status = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtAddress2" == event.TextBoxID.toString()) {
            this.address2Status = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtCity" == event.TextBoxID.toString()) {
            this.cityStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtZip" == event.TextBoxID.toString()) {
            this.zipStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtContactName" == event.TextBoxID.toString()) {
            this.contactNamestatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtPhone" == event.TextBoxID.toString()) {
            this.phoneStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtFax" == event.TextBoxID.toString()) {
            this.faxStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtContactEmail" == event.TextBoxID.toString()) {
            this.emailStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtBillOnlyEmail" == event.TextBoxID.toString()) {
            this.billOnlyEmailStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtRemainder" == event.TextBoxID.toString()) {
            this.frequencyReminderStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if (this.submitButtonTitle == "Update") {
            this.vendorIDStatus = 0;
            if (this.vendorNameStatus >= 1) {
                this.vendorNameStatus = 1;
            }
            else {
                this.vendorNameStatus = 0;
            }
        }
        this.btnEnableDisable();
    };
    /**
    * Enable and Disable Add/Update button
    */
    SetupModifyVendorsComponent.prototype.btnEnableDisable = function () {
        if (this.submitButtonTitle == "Update") {
            this.vendorIDStatus = 0;
            if (this.vendorNameStatus >= 1) {
                this.vendorNameStatus = 1;
            }
            else {
                this.vendorNameStatus = 0;
            }
        }
        if (this.vendorIDStatus == 0 && this.newItem.VENDOR_ID !== "" && this.newItem.VENDOR_ID !== null && this.newItem.VENDOR_ID !== undefined && this.newItem.VENDOR_NAME !== "" && this.newItem.VENDOR_ID !== undefined && this.newItem.VENDOR_NAME !== null && this.newItem.VENDOR_NAME !== undefined && this.vendorNameStatus == 0 && this.newItem.ORG_GROUP_ID !== undefined && this.newItem.ORG_GROUP_ID != null) {
            if ((this.address1Status == undefined || this.address1Status == 0) && (this.address2Status == undefined || this.address2Status == 0) &&
                (this.cityStatus == undefined || this.cityStatus == 0) &&
                (this.zipStatus == undefined || this.zipStatus == 0) &&
                (this.contactNamestatus == undefined || this.contactNamestatus == 0) && (this.phoneStatus == undefined || this.phoneStatus == 0) &&
                (this.faxStatus == undefined || this.faxStatus == 0) && (this.emailStatus == undefined || this.emailStatus == 0) &&
                (this.billOnlyEmailStatus == undefined || this.billOnlyEmailStatus == 0) && (this.frequencyReminderStatus == undefined || this.frequencyReminderStatus == 0)) {
                this.loading = false;
            }
            else {
                this.loading = true;
            }
        }
        else {
            this.loading = true;
        }
    };
    //  this is create
    SetupModifyVendorsComponent.prototype.createNewVendor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.msgs = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        if (!(this.newItem.VENDOR_ID == "" || this.newItem.VENDOR_ID == undefined || this.newItem.VENDOR_NAME == "" || this.newItem.VENDOR_NAME == undefined)) return [3 /*break*/, 2];
                        this.Validatorsmessages = "Please  enter  all mandatory fileds";
                        this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: this.Validatorsmessages });
                        return [3 /*break*/, 8];
                    case 2:
                        if (!(this.newItem.ORG_GROUP_ID == null || this.newItem.ORG_GROUP_ID == undefined)) return [3 /*break*/, 3];
                        this.Validatorsmessages = "Please select Org Group ID";
                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.Validatorsmessages });
                        return [3 /*break*/, 8];
                    case 3:
                        if (this.newItem.STATE == "Select State" || this.newItem.COUNTRY == "Select Country") {
                            this.newItem.STATE = "";
                            this.newItem.COUNTRY = "";
                        }
                        this.newItem.ALLOW_VEND_ACCESS = this.allowVendorAccessValidation;
                        if (this.newItem.ALLOW_VEND_ACCESS == true) {
                            this.newItem.ALLOW_VEND_ACCESS = "Y";
                        }
                        else {
                            this.newItem.ALLOW_VEND_ACCESS = "N";
                        }
                        if (!(this.mode == (AtParEnums_2.ModeEnum.Add).toString())) return [3 /*break*/, 5];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupVendorServices.CreateVendor(this.newItem).forEach(function (resp) {
                                _this.msgs = [];
                                _this.spinnerService.stop();
                                switch (resp.StatType) {
                                    case AtParEnums_3.StatusType.Success:
                                        {
                                            _this.statusMesssage = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Vendor").replace("2%", _this.newItem.VENDOR_ID);
                                            // this.statusMesssage = "Vendor " + this.newItem.VENDOR_ID + " Created Successfully";
                                            _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                                            var tempOrgGpID = _this.newItem.ORG_GROUP_ID;
                                            _this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
                                            _this.allowVendorAccessValidation = false;
                                            _this.onChangeddlStates();
                                            if (!_this.hasMultipleOrgGroups) {
                                                //this.newItem.ORG_GROUP_ID = lblOrgGroupId
                                                _this.newItem.ORG_GROUP_ID = tempOrgGpID;
                                            }
                                            _this.loading = true;
                                            if (_this.hasMultipleOrgGroups) {
                                                document.getElementById('txtddlorgGroupData').focus();
                                            }
                                            else {
                                                document.getElementById('txtVendorId').focus();
                                            }
                                            break;
                                        }
                                    case AtParEnums_3.StatusType.Error:
                                        {
                                            _this.statusMesssage = resp.StatusMessage;
                                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: _this.statusMesssage });
                                            break;
                                        }
                                    case AtParEnums_3.StatusType.Warn:
                                        {
                                            _this.statusMesssage = resp.StatusMessage;
                                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: _this.statusMesssage });
                                            break;
                                        }
                                    case AtParEnums_3.StatusType.Custom:
                                        {
                                            _this.statusMesssage = resp.StatusMessage;
                                            _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: _this.statusMesssage });
                                            break;
                                        }
                                }
                                _this.atParConstant.scrollToTop();
                            })];
                    case 4:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 8];
                    case 5:
                        if (!(this.mode == (AtParEnums_2.ModeEnum.Edit).toString())) return [3 /*break*/, 7];
                        //this is for update
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupVendorServices.UpdateVendor(this.newItem).forEach(function (resp) {
                                _this.msgs = [];
                                _this.spinnerService.stop();
                                switch (resp.StatType) {
                                    case AtParEnums_3.StatusType.Success:
                                        {
                                            _this.statusMesssage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Vendor").replace("2%", _this.newItem.VENDOR_ID);
                                            //this.statusMesssage = "Vendor " + this.newItem.VENDOR_ID + "  Updated Successfully";
                                            _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                                            var tempVendID = _this.newItem.VENDOR_ID;
                                            _this.newItem.VENDOR_ID = tempVendID;
                                            _this.onChangeddlStates();
                                            if (_this.hasMultipleOrgGroups) {
                                                document.getElementById('txtddlorgGroupData').focus();
                                            }
                                            else {
                                                document.getElementById('txtVendorName').focus();
                                            }
                                            break;
                                        }
                                    case AtParEnums_3.StatusType.Error:
                                        {
                                            _this.statusMesssage = resp.StatusMessage;
                                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: _this.statusMesssage });
                                            break;
                                        }
                                    case AtParEnums_3.StatusType.Warn:
                                        {
                                            _this.statusMesssage = resp.StatusMessage;
                                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: _this.statusMesssage });
                                            break;
                                        }
                                    case AtParEnums_3.StatusType.Custom:
                                        {
                                            _this.statusMesssage = resp.StatusMessage;
                                            _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: _this.statusMesssage });
                                            break;
                                        }
                                }
                                _this.spinnerService.stop();
                                _this.atParConstant.scrollToTop();
                            })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        ex_1 = _a.sent();
                        this.spinnerService.stop();
                        this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: ex_1.toString() });
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    SetupModifyVendorsComponent.prototype.clearAllFields = function () {
        this.newItem = null;
    };
    SetupModifyVendorsComponent.prototype.ngOnDestroy = function () {
        this._deviceTokenEntry = null;
        this.mode = null;
        this.orgGroupList = null;
        this.lblOrgGroupId = null;
        this.loading = null;
        this.statusMesssage = null;
        this.hasMultipleOrgGroups = null;
        this.ddldispatchType = null;
        this.ddlUserIdData = null;
        this.screenTitle = null;
        this.submitButtonTitle = null;
        this.isEditMode = null;
        this.newItem = null;
    };
    SetupModifyVendorsComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-setup-modify-vendors.component.html',
            providers: [atpar_setup_vendors_services_1.SetupVendorServices, customvalidation_1.CustomValidations, sharedData_1.SharedDataService],
        }),
        __param(6, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [atpar_setup_vendors_services_1.SetupVendorServices,
            event_spinner_service_1.SpinnerService,
            router_1.ActivatedRoute,
            AtParSharedDataService_1.AtParSharedDataService,
            router_1.Router,
            AtParConstants_1.AtParConstants, Object, customvalidation_1.CustomValidations, sharedData_1.SharedDataService])
    ], SetupModifyVendorsComponent);
    return SetupModifyVendorsComponent;
}());
exports.SetupModifyVendorsComponent = SetupModifyVendorsComponent;
//# sourceMappingURL=atpar-setup-modify-vendors.js.map