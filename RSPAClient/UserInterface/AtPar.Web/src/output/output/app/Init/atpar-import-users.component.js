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
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParEnums_2 = require("../Shared/AtParEnums");
var atpar_add_user_service_1 = require("../../app/Init/atpar-add-user.service");
var HttpService_1 = require("../Shared/HttpService");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var datatable_1 = require("../components/datatable/datatable");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var routepath_1 = require("../AtPar/Menus/routepath");
var ImportUsersComponent = (function () {
    function ImportUsersComponent(spinnerService, addUserServices, atParCommonService, httpService, atParConstant) {
        this.spinnerService = spinnerService;
        this.addUserServices = addUserServices;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.lstLdapUserData = [];
        this.lstLdapUser = [];
        this.growlMessage = [];
        this.searchImpUser = { FilterText: '', EntryLimit: '' };
        this.displayImportUsersDialog = false;
        this.orgGroups = [];
        this.profiles = [];
        this.dropdownOrgData = [];
        this.dropdownProfileData = [];
        this.disableButton = true;
        this.isVisible = false;
        this.showStatusMessage = false;
        this.isSave = false;
        this.breadCrumbMenu = new routepath_1.Menus();
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    ImportUsersComponent.prototype.ngOnInit = function () {
        this.pazeSize = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
    };
    //============= GO CLICK EVENT=============//
    ImportUsersComponent.prototype.btnGo_Click = function (searchImpUser) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strNumbers, i, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.isSave = false;
                        this.growlMessage = [];
                        this.lstLdapUserData = [];
                        this.isVisible = false;
                        if (searchImpUser.EntryLimit != '' && searchImpUser.EntryLimit != null) {
                            strNumbers = '0123456789';
                            for (i = 0; i < searchImpUser.EntryLimit.length; i++) {
                                if (strNumbers.indexOf(searchImpUser.EntryLimit[i]) == -1) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Only numbers are allowed in Entry Limit' });
                                    return [2 /*return*/];
                                }
                            }
                        }
                        this.spinnerService.start();
                        if (this.dataTableComponent != undefined) {
                            this.dataTableComponent.reset();
                        }
                        this.showStatusMessage = false;
                        return [4 /*yield*/, this.addUserServices.getLdapUsers(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], searchImpUser.FilterText, searchImpUser.EntryLimit).then(function (res) {
                                _this.spinnerService.stop();
                                var data = res.json();
                                if (data.StatType == AtParEnums_2.StatusType.Success) {
                                    _this.lstLdapUserData = data.DataList;
                                    for (var i = 0; i < _this.lstLdapUserData.length; i++) {
                                        if (_this.lstLdapUserData[i].FIRST_NAME == '' || _this.lstLdapUserData[i].LAST_NAME == '' || _this.lstLdapUserData[i].USER_ID == '') {
                                            _this.showStatusMessage = true;
                                            _this.statusMessage = 'Note: User cannot be imported, if the required fields information is missing from LDAP.';
                                        }
                                        _this.lstLdapUserData[i].SELECTED_USER = false;
                                        if (_this.lstLdapUserData[i].FIRST_NAME.length > 20 || _this.lstLdapUserData[i].LAST_NAME.length > 20 ||
                                            _this.lstLdapUserData[i].MIDDLE_INITIAL.length > 2 || _this.lstLdapUserData[i].EMAIL_ID.length > 50 ||
                                            _this.lstLdapUserData[i].PHONE1.length > 12 || _this.lstLdapUserData[i].FAX.length > 15) {
                                            _this.lstLdapUserData[i].VALID_USER = 'INVALID';
                                        }
                                        else {
                                            _this.lstLdapUserData[i].VALID_USER = 'VALID';
                                        }
                                    }
                                    _this.isVisible = true;
                                }
                                else if (data.StatType == AtParEnums_2.StatusType.Warn) {
                                    _this.isVisible = false;
                                    if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_USERALREADYEXISTS) {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Users all are imported' });
                                    }
                                    else {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    }
                                }
                                else if (data.StatType == AtParEnums_2.StatusType.Error) {
                                    _this.isVisible = false;
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "btnGo_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //============= GO CLICK EVENT END=========//
    //=============USER SELECT EVENT===========//
    ImportUsersComponent.prototype.swtUser_Change = function (e, user) {
        try {
            if (user.VALID_USER == 'INVALID') {
                this.checkUserDetails(user);
            }
            else {
                if (e) {
                    this.lstLdapUser.push(user);
                }
                else {
                    for (var i = 0; i < this.lstLdapUser.length; i++) {
                        if (this.lstLdapUser[i].USER_ID === user.USER_ID) {
                            var index = this.lstLdapUser.indexOf(this.lstLdapUser[i], 0);
                            this.lstLdapUser.splice(index, 1);
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "swtUser_Change");
        }
    };
    //=============USER SELECT EVENT END=======//
    //=============CHECK USER TO IMPORT========//
    ImportUsersComponent.prototype.checkUserDetails = function (user) {
        this.growlMessage = [];
        if (user.FIRST_NAME.length > 20) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: user.USER_ID + ' User Cannot be imported First Name text should be Less than or Equal to 20 Characters' });
        }
        else if (user.LAST_NAME.length > 20) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: user.USER_ID + ' User Cannot be imported Last Name text should be Less than or Equal to 20 Characters' });
        }
        else if (user.MIDDLE_INITIAL.length > 2) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: user.USER_ID + ' User Cannot be imported Middle Initial text should be Less than or Equal to 2 Characters' });
        }
        else if (user.EMAIL_ID.length > 50) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: user.USER_ID + ' User Cannot be imported Email text should be Less than or Equal to 50 Characters' });
        }
        else if (user.PHONE1.length > 12) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: user.USER_ID + ' User Cannot be imported Phone 1 text should be Less than or Equal to 12 Characters' });
        }
        else if (user.FAX.length > 15) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: user.USER_ID + ' User Cannot be imported Fax text should be Less than or Equal to 15 Characters' });
        }
    };
    //=============CHECK USER TO IMPORT END====//
    //=============CHECK ALL TO IMPORT========//
    ImportUsersComponent.prototype.chkAll_Click = function () {
        try {
            this.spinnerService.start();
            var list = [];
            this.lstLdapUser = [];
            for (var i = 0; i < this.lstLdapUserData.length; i++) {
                if (this.lstLdapUserData[i].FIRST_NAME != '' && this.lstLdapUserData[i].LAST_NAME != '' && this.lstLdapUserData[i].USER_ID != '') {
                    if ((this.lstLdapUserData[i].FIRST_NAME.length) > 20 || (this.lstLdapUserData[i].LAST_NAME.length) > 20 || (this.lstLdapUserData[i].MIDDLE_INITIAL.length) > 2
                        || (this.lstLdapUserData[i].EMAIL_ID.length) > 50 || (this.lstLdapUserData[i].PHONE1.length) > 12 || (this.lstLdapUserData[i].FAX.length) > 15) {
                        // if (this.lstLdapUserData[i].VALID_USER != 'VALID') {
                        this.lstLdapUserData[i].SELECTED_USER = false;
                    }
                    else {
                        this.lstLdapUserData[i].SELECTED_USER = true;
                        list.push(this.lstLdapUserData[i]);
                    }
                }
            }
            this.lstLdapUser = list;
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "chkAll_Click");
        }
    };
    //=============CHECK ALL TO IMPORT END====//
    //=============CHECK NONE TO IMPORT========//
    ImportUsersComponent.prototype.chkNone_Click = function () {
        try {
            for (var i = 0; i < this.lstLdapUserData.length; i++) {
                this.lstLdapUserData[i].SELECTED_USER = false;
            }
            this.lstLdapUserData = this.lstLdapUserData;
            this.lstLdapUser = [];
        }
        catch (ex) {
            this.clientErrorMsg(ex, "chkNone_Click");
        }
    };
    //=============CHECK NONE TO IMPORT END====//
    //=============IMPORT CLICK EVENT==========//
    ImportUsersComponent.prototype.btnImportUser_Click = function (val) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.displayImportUsersDialog = val;
                        if (!val) return [3 /*break*/, 3];
                        this.breadCrumbMenu.SUB_MENU_NAME = 'User(s) Properties';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.spinnerService.start();
                        this.TOKEN_EXPIRY_PERIOD = '';
                        this.IDLE_TIME = '';
                        this.ORG_GROUP_ID = 'Select Org Group';
                        this.PROFILE_ID = 'Select Profile';
                        this.disableButton = true;
                        this.tokenStatus = 1;
                        this.idleTimeStatus = 1;
                        return [4 /*yield*/, this.bindOrgDropdown()];
                    case 1:
                        _a.sent();
                        if (this.resType.StatType != AtParEnums_2.StatusType.Success) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bindProfileDropdown()];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        this.breadCrumbMenu.SUB_MENU_NAME = '';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        _a.label = 4;
                    case 4:
                        // this.lstLdapUser = this.lstLdapUser;
                        this.growlMessage = [];
                        if (this.isSave) {
                            this.growlMessage.push({
                                severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'LDAP User(s) Imported Successfully'
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //=============IMPORT CLICK EVENT END======//
    //=============BIND ORG DROPDOWN===========//
    ImportUsersComponent.prototype.bindOrgDropdown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getUserOrgGroups(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.resType = res;
                                _this.growlMessage = [];
                                _this.dropdownOrgData = [];
                                if (res.StatType == AtParEnums_2.StatusType.Success) {
                                    _this.orgGroups = res.DataList;
                                    _this.dropdownOrgData.push({ label: 'Select Org Group', value: 'Select Org Group' });
                                    for (var i = 0; i < _this.orgGroups.length; i++) {
                                        _this.dropdownOrgData.push({ label: (_this.orgGroups[i].ORG_GROUP_ID + ' - ' + _this.orgGroups[i].ORG_GROUP_NAME), value: _this.orgGroups[i].ORG_GROUP_ID });
                                    }
                                }
                                else if (res.StatType == AtParEnums_2.StatusType.Warn) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                }
                                else {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "bindOrgDropdown");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //=============BIND ORG DROPDOWN END=======//
    //=============BIND PROFILE DROPDOWN=======//
    ImportUsersComponent.prototype.bindProfileDropdown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.addUserServices.getProfiles(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).then(function (res) {
                                _this.growlMessage = [];
                                _this.dropdownProfileData = [];
                                var data = res.json();
                                if (data.StatType == AtParEnums_2.StatusType.Success) {
                                    _this.profiles = data.DataList;
                                    _this.dropdownProfileData.push({ label: 'Select Profile', value: 'Select Profile' });
                                    for (var i = 0; i < _this.profiles.length; i++) {
                                        if ((_this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID]).toUpperCase() == 'ADMIN') {
                                            _this.dropdownProfileData.push({ label: (_this.profiles[i].PROFILE_ID + ' - ' + _this.profiles[i].PROFILE_DESCRIPTION), value: _this.profiles[i].PROFILE_ID });
                                        }
                                        else if ((_this.profiles[i].PROFILE_ID).toUpperCase() != 'ADMIN') {
                                            _this.dropdownProfileData.push({ label: (_this.profiles[i].PROFILE_ID + ' - ' + _this.profiles[i].PROFILE_DESCRIPTION), value: _this.profiles[i].PROFILE_ID });
                                        }
                                    }
                                }
                                else if (data.StatType == AtParEnums_2.StatusType.Warn) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                }
                                else {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "bindProfileDropdown");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //=============BIND PROFILE DROPDOWN END===//
    //=============SAVE LDAP USER==============//
    ImportUsersComponent.prototype.btnSaveLdap_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        if (!(this.TOKEN_EXPIRY_PERIOD == undefined || this.IDLE_TIME == undefined)) return [3 /*break*/, 1];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please fill mandatory fields' });
                        return [3 /*break*/, 6];
                    case 1:
                        if (!(this.TOKEN_EXPIRY_PERIOD.toString().trim() == "" || this.IDLE_TIME.toString().trim() == "")) return [3 /*break*/, 2];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please fill mandatory fields' });
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(this.TOKEN_EXPIRY_PERIOD == 0)) return [3 /*break*/, 3];
                        this.growlMessage.push({
                            severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Minimum Session Validity Time should be greater than zero'
                        });
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(this.IDLE_TIME == 0)) return [3 /*break*/, 4];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Minimum Idle Time should be greater than zero' });
                        return [3 /*break*/, 6];
                    case 4:
                        if (this.ORG_GROUP_ID == 'Select Org Group' || this.ORG_GROUP_ID == undefined) {
                            this.ORG_GROUP_ID = '';
                        }
                        if (this.PROFILE_ID == 'Select Profile' || this.PROFILE_ID == undefined) {
                            this.PROFILE_ID = '';
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.addUserServices.saveLdapUser(this.lstLdapUser, this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.TOKEN_EXPIRY_PERIOD, this.IDLE_TIME, this.ORG_GROUP_ID, this.PROFILE_ID)
                                .subscribe(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success:
                                        {
                                            _this.isSave = true;
                                            _this.TOKEN_EXPIRY_PERIOD = '';
                                            _this.IDLE_TIME = '';
                                            _this.ORG_GROUP_ID = '';
                                            _this.PROFILE_ID = '';
                                            _this.disableButton = true;
                                            _this.lstLdapUser = [];
                                            _this.isVisible = false;
                                            _this.lstLdapUserData = [];
                                            _this.btnImportUser_Click(false);
                                            break;
                                        }
                                    case AtParEnums_2.StatusType.Error:
                                        {
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_2.StatusType.Warn:
                                        {
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "btnSaveLdap_Click");
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    //=============SAVE LDAP USER END==============//
    ImportUsersComponent.prototype.bindModelDataChange = function (event) {
        this.disableButton = true;
        if ("txtSession" == event.TextBoxID.toString()) {
            this.tokenStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtIdleTime" == event.TextBoxID.toString()) {
            this.idleTimeStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ((this.tokenStatus == 0 || this.tokenStatus == undefined)
            && (this.idleTimeStatus == 0 || this.idleTimeStatus == undefined)) {
            this.disableButton = false;
        }
        else {
            this.disableButton = true;
        }
    };
    ImportUsersComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ImportUsersComponent.prototype.ngOnDestroy = function () {
        this.searchImpUser = { FilterText: '', EntryLimit: '' };
        this.lstLdapUserData = [];
        this.lstLdapUser = [];
        this.orgGroups = null;
        this.profiles = null;
        this.dropdownProfileData = null;
        this.dropdownOrgData = null;
        this._deviceTokenEntry = [];
        this.displayImportUsersDialog = false;
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], ImportUsersComponent.prototype, "dataTableComponent", void 0);
    ImportUsersComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-import-users.component.html',
            providers: [atpar_add_user_service_1.AddUserServices, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            atpar_add_user_service_1.AddUserServices,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants])
    ], ImportUsersComponent);
    return ImportUsersComponent;
}());
exports.ImportUsersComponent = ImportUsersComponent;
//# sourceMappingURL=atpar-import-users.component.js.map