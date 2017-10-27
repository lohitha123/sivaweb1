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
var http_1 = require("@angular/http");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParEnums_2 = require("../Shared/AtParEnums");
var router_1 = require("@angular/router");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var atpar_add_user_service_1 = require("../../app/Init/atpar-add-user.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var vm_mt_atpar_user_add_1 = require("../entities/vm_mt_atpar_user_add");
var HttpService_1 = require("../Shared/HttpService");
var AtParConstants_1 = require("../Shared/AtParConstants");
var MT_ATPAR_SECURITY_PARAMS_1 = require("../Entities/MT_ATPAR_SECURITY_PARAMS");
var routepath_1 = require("../AtPar/Menus/routepath");
var platform_browser_1 = require("@angular/platform-browser");
var AddUserComponent = (function () {
    function AddUserComponent(spinnerService, router, atParSharedDataService, route, addUserServices, atParCommonService, httpService, atParConstant, http, document) {
        this.spinnerService = spinnerService;
        this.router = router;
        this.atParSharedDataService = atParSharedDataService;
        this.route = route;
        this.addUserServices = addUserServices;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.http = http;
        this.document = document;
        this._deviceTokenEntry = [];
        this.addUserData = new vm_mt_atpar_user_add_1.VM_MT_ATPAR_USER_ADD();
        this.editUserInfo = null;
        this.searchImpData = { FIRST_NAME: '', LAST_NAME: '', USER_ID: '' };
        this.lstLdapUserData = [];
        this.lstLdapUser = [];
        this.securityParams = new MT_ATPAR_SECURITY_PARAMS_1.MT_ATPAR_SECURITY_PARAMS();
        this.orgGroups = [];
        this.profiles = [];
        this.dropdownOrgData = [];
        this.dropdownProfileData = [];
        this.growlMessage = [];
        this.arrLst = [];
        this.disableImport = false;
        this.showManageEdit = false;
        this.displayImportDialog = false;
        this.blnPwdChars = false;
        this.blnPwdNum = false;
        this.blnPwdSplChars = false;
        this.continue = true;
        this.isImportLDAPUser = false;
        this.isLdap = false;
        this.ddlOrgGroupEnable = true;
        this.ddlProfileEnable = true;
        this.chkAccDisable = true;
        this.showResetPwdDiv = true;
        this.disableButton = true;
        this.selectedValue = false;
        this.showUploadImage = false;
        this.showLdapPwdText = true;
        this.enablePasswordRequired = true;
        this.enableResetPwdRequired = true;
        this.showGoBack = false;
        this.strPwdComment = '';
        this.strProtocol = '';
        this.strServerName = '';
        this.strSearchFilter = '';
        this.stringBuilder = '';
        this.userSelectedFile = '';
        this.isNullOrEmpty = function (s) {
            if (s == null || s === "")
                return true;
            return false;
        };
        this.breadCrumbMenu = new routepath_1.Menus();
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    AddUserComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var temp, strUser, ldapUserInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pazeSize = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.readConfig()];
                    case 1:
                        _a.sent();
                        if (this.resType.StatType != AtParEnums_2.StatusType.Success) {
                            return [2 /*return*/];
                        }
                        /* PopulateUserFields*/
                        return [4 /*yield*/, this.populateUserFields()];
                    case 2:
                        /* PopulateUserFields*/
                        _a.sent();
                        if (this.resType.StatType != AtParEnums_2.StatusType.Success) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bindOrgDropdown()];
                    case 3:
                        _a.sent();
                        if (this.resType.StatType != AtParEnums_2.StatusType.Success) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bindProfileDropdown()];
                    case 4:
                        _a.sent();
                        if (this.resType.StatType != AtParEnums_2.StatusType.Success) {
                            return [2 /*return*/];
                        }
                        temp = false;
                        //var editUserInfo;
                        if (this.atParSharedDataService.storage != undefined) {
                            this.editUserInfo = this.atParSharedDataService.storage.editUserInfo;
                        }
                        strUser = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toUpperCase();
                        if (this.editUserInfo != null) {
                            this.addUserData = this.editUserInfo;
                            this.showManageEdit = true;
                            this.disableButton = false;
                            this.showGoBack = true;
                            temp = this.addUserData.PASSHASH_REQUIRED;
                            this.addUserData.PASSWORD = '';
                            this.addUserData.CPASSWORD = '';
                            this.addUserData.TIME_RESTRICTIONS = '1-12:00,23:59;2-12:00,23:59;3-12:00,23:59;4-12:00,23:59;5-12:00,23:59;6-12:00,23:59;7-12:00,23:59;';
                            this.ddlOrgGroupEnable = false;
                            if (this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] == 'All') {
                                this.ddlOrgGroupEnable = true;
                            }
                            if (this.addUserData.USER_ID.toUpperCase() == 'ADMIN' || this.addUserData.USER_ID.toUpperCase() == strUser) {
                                this.ddlOrgGroupEnable = false;
                                this.ddlProfileEnable = false;
                            }
                            if (this.addUserData.USER_ID.toUpperCase() == strUser) {
                                this.chkAccDisable = false;
                            }
                            if (this.addUserData.PASSHASH_REQUIRED) {
                                this.showResetPwdDiv = true;
                                if (this.addUserData.PASSWD_RESET_REQUIRED == 'Y') {
                                    this.addUserData.PWD_RESET_REQUIRED = true;
                                }
                                else {
                                    this.addUserData.PWD_RESET_REQUIRED = false;
                                }
                            }
                            else {
                                this.showResetPwdDiv = false;
                                this.addUserData.PWD_RESET_REQUIRED = false;
                            }
                            if (this.addUserData.LDAP_USER == 'Y') {
                                this.addUserData.LDAP_USER = 'True';
                                this.isLdap = true;
                                this.isImportLDAPUser = true;
                                this.chkAccDisable = true;
                                this.addUserData.PASSHASH_REQUIRED = true;
                            }
                            else {
                                this.addUserData.LDAP_USER = 'False';
                                this.isLdap = false;
                                this.isImportLDAPUser = false;
                            }
                            if (this.addUserData.USER_ID.toUpperCase() != strUser) {
                                if (this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID].toUpperCase() == 'ADMIN' && (strUser).toUpperCase() != 'ADMIN') {
                                    this.enablePasswordRequired = false;
                                    this.enableResetPwdRequired = false;
                                    this.chkAccDisable = false;
                                }
                            }
                        }
                        if (this.atParSharedDataService.storage != undefined) {
                            ldapUserInfo = this.atParSharedDataService.storage.ldapUserInfo;
                        }
                        if (ldapUserInfo != null) {
                            this.addUserData = ldapUserInfo;
                            this.isImportLDAPUser = true;
                            this.userIDStatus = 0;
                            this.firstNameStatus = 0;
                            this.lastNameStatus = 0;
                            this.addUserData.PASSWORD = '';
                            this.addUserData.CPASSWORD = '';
                            this.addUserData.PASSHASH_REQUIRED = true;
                            this.addUserData.PWD_RESET_REQUIRED = false;
                            this.addUserData.TIME_RESTRICTIONS = '1-12:00,23:59;2-12:00,23:59;3-12:00,23:59;4-12:00,23:59;5-12:00,23:59;6-12:00,23:59;7-12:00,23:59;';
                            this.showLdapPwdText = false;
                        }
                        if (this.editUserInfo == null) {
                            console.log(this.editUserInfo);
                            document.getElementById("txtUserID").focus();
                        }
                        if (this.editUserInfo != null) {
                            setTimeout(function () {
                                if (temp) {
                                    document.getElementById("txtPassword").focus();
                                }
                                else {
                                    document.getElementById("txtToken").focus();
                                }
                            }, 500);
                        }
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddUserComponent.prototype.readConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.addUserServices.readConfig().then(function (resType) {
                                var res = resType.json();
                                _this.growlMessage = [];
                                _this.resType = res;
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.strProtocol = res.DataDictionary["strProtocol"];
                                        _this.strSearchFilter = res.DataDictionary["strSearchFilter"];
                                        _this.strServerName = res.DataDictionary["strServerName"];
                                        _this.strFirstNameFilter = res.DataDictionary["strFirstNameFilter"];
                                        _this.strLastNameFilter = res.DataDictionary["strLastNameFilter"];
                                        _this.strUserIDFilter = res.DataDictionary["strUserIDFilter"];
                                        if (_this.isNullOrEmpty(_this.strProtocol) || _this.isNullOrEmpty(_this.strSearchFilter) || _this.isNullOrEmpty(_this.strServerName)) {
                                            _this.disableImport = true;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "readConfig");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddUserComponent.prototype.populateUserFields = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.addUserServices.populateUserFields().then(function (result) {
                                var res = result.json();
                                _this.resType = res;
                                _this.growlMessage = [];
                                if (res.StatType == AtParEnums_2.StatusType.Success) {
                                    _this.securityParams = res.Data;
                                    _this.strPwdComment = "Password should be between " +
                                        _this.securityParams.PASSWD_MIN_LENGTH + " to " +
                                        _this.securityParams.PASSWD_MAX_LENGTH + " characters. Complexity of the password is ";
                                    var intPwdComplexity = _this.securityParams.PASSWD_COMPLEXITY;
                                    switch (intPwdComplexity) {
                                        case 0:
                                            {
                                                _this.strPwdComment = _this.strPwdComment + "Any Characters.";
                                                break;
                                            }
                                        case 1:
                                            {
                                                _this.strPwdComment = _this.strPwdComment + "Alphabets. ie; Combination of A-Z, a-z ";
                                                break;
                                            }
                                        case 2:
                                            {
                                                _this.strPwdComment = _this.strPwdComment + "Alphanumerics. ie; Combination of A-Z, a-z and 0-9";
                                                break;
                                            }
                                        case 3:
                                            {
                                                _this.strPwdComment = _this.strPwdComment + "Alphanumeric and Non Alphanumeric. ie; Combination of A-Z, a-z, and 0-9 and ! @ # $… ";
                                                break;
                                            }
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
                        this.clientErrorMsg(ex_2, "populateUserFields");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddUserComponent.prototype.bindOrgDropdown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
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
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.orgGroups = res.DataList;
                                        _this.dropdownOrgData.push({ label: 'Select Org Group', value: 'Select Org Group' });
                                        for (var i = 0; i < _this.orgGroups.length; i++) {
                                            _this.dropdownOrgData.push({ label: (_this.orgGroups[i].ORG_GROUP_ID + ' - ' + _this.orgGroups[i].ORG_GROUP_NAME), value: _this.orgGroups[i].ORG_GROUP_ID });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "bindOrgDropdown");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddUserComponent.prototype.bindProfileDropdown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.addUserServices.getProfiles(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.dropdownProfileData = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
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
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "bindProfileDropdown");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddUserComponent.prototype.btnCreateSave_Click = function (mode) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 16, , 17]);
                        this.validateControls();
                        if (!this.continue) return [3 /*break*/, 15];
                        this.growlMessage = [];
                        this.addUserData.USER_ID = (this.addUserData.USER_ID.trim()).toUpperCase();
                        this.addUserData.FIRST_NAME = this.addUserData.FIRST_NAME.trim();
                        this.addUserData.LAST_NAME = this.addUserData.LAST_NAME.trim();
                        this.addUserData.PASSWORD = this.addUserData.PASSWORD.trim();
                        this.addUserData.TOKEN_EXPIRY_PERIOD = this.addUserData.TOKEN_EXPIRY_PERIOD;
                        this.addUserData.IDLE_TIME = this.addUserData.IDLE_TIME;
                        if (this.addUserData.PASSHASH_REQUIRED) {
                            if (this.addUserData.PWD_RESET_REQUIRED == true || (this.securityParams.PASSWD_RESET_REQUIRED == 'Y' && mode == 'Add')) {
                                this.addUserData.PASSWD_RESET_REQUIRED = 'Y';
                            }
                            else {
                                this.addUserData.PASSWD_RESET_REQUIRED = 'N';
                            }
                        }
                        else {
                            this.addUserData.PASSWD_RESET_REQUIRED = 'N';
                        }
                        this.addUserData.ORG_GROUP_ID = '' ? 'Select Org Group' : this.addUserData.ORG_GROUP_ID;
                        this.addUserData.PROFILE_ID = '' ? 'Vendor Profile' : this.addUserData.PROFILE_ID;
                        this.addUserData.LAST_UPDATE_USER = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        this.spinnerService.start();
                        if (!(mode == 'Add')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.checkUser()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this.resType.StatType != AtParEnums_2.StatusType.Success) {
                            return [2 /*return*/];
                        }
                        // 'Checking the Profile whether Server Assigned
                        return [4 /*yield*/, this.checkProfile(AtParEnums_1.ClientType.WEB)];
                    case 3:
                        // 'Checking the Profile whether Server Assigned
                        _a.sent();
                        if ((this.resType.StatType != AtParEnums_2.StatusType.Success) || ((this.resType.DataVariable) && (!this.addUserData.PASSHASH_REQUIRED))) {
                            return [2 /*return*/];
                        }
                        if (!(this.securityParams.PASS_REQ_HHT_USERS == 'Y')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.checkProfile(AtParEnums_1.ClientType.HHT)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if ((this.resType.StatType != AtParEnums_2.StatusType.Success) || ((this.resType.DataVariable) && (!this.addUserData.PASSHASH_REQUIRED))) {
                            return [2 /*return*/];
                        }
                        if (!(mode == 'Add')) return [3 /*break*/, 10];
                        if (!this.isImportLDAPUser) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.saveLdapUser()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.createUser()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [3 /*break*/, 14];
                    case 10:
                        if (!(sessionStorage.getItem("strAuditAllowed") == 'Y')) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.doAuditData()];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12: 
                    //if (this.addUserData.PASSHASH_REQUIRED && this.editUserInfo != undefined) {
                    //    if (this.addUserData.PASSWORD == '') {
                    //        this.addUserData.PASSWORD = this.editUserInfo.PASSWORD;
                    //    }
                    //}
                    // ==============Update User=============
                    return [4 /*yield*/, this.updateUser()];
                    case 13:
                        //if (this.addUserData.PASSHASH_REQUIRED && this.editUserInfo != undefined) {
                        //    if (this.addUserData.PASSWORD == '') {
                        //        this.addUserData.PASSWORD = this.editUserInfo.PASSWORD;
                        //    }
                        //}
                        // ==============Update User=============
                        _a.sent();
                        _a.label = 14;
                    case 14:
                        this.spinnerService.stop();
                        _a.label = 15;
                    case 15:
                        this.atParConstant.scrollToTop();
                        return [3 /*break*/, 17];
                    case 16:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "btnCreateSave_Click");
                        return [3 /*break*/, 17];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    AddUserComponent.prototype.validateControls = function () {
        try {
            this.continue = true;
            this.growlMessage = [];
            //========================Common Mandatory Validations=====================
            if (this.addUserData.USER_ID == undefined || this.addUserData.TOKEN_EXPIRY_PERIOD == undefined ||
                this.addUserData.IDLE_TIME == undefined || this.addUserData.FIRST_NAME == undefined ||
                this.addUserData.LAST_NAME == undefined || (this.addUserData.PASSHASH_REQUIRED == true
                && !this.isImportLDAPUser && this.editUserInfo == undefined
                && (this.addUserData.PASSWORD == undefined || this.addUserData.CPASSWORD == undefined))) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please fill mandatory fields' });
                this.continue = false;
            }
            else if (this.addUserData.USER_ID.trim() == "" || this.addUserData.TOKEN_EXPIRY_PERIOD.toString().trim() == "" ||
                this.addUserData.IDLE_TIME.toString().trim() == "" || this.addUserData.FIRST_NAME.trim() == "" ||
                this.addUserData.LAST_NAME.trim() == ""
                || (this.addUserData.PASSHASH_REQUIRED == true && !this.isImportLDAPUser && this.editUserInfo == undefined
                    && (this.addUserData.PASSWORD.trim() == "" || this.addUserData.CPASSWORD.trim() == ""))) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please fill mandatory fields' });
                this.continue = false;
            }
            else if (this.addUserData.PASSHASH_REQUIRED == true && !this.isImportLDAPUser && this.editUserInfo == undefined &&
                (this.addUserData.PASSWORD.trim() != this.addUserData.CPASSWORD.trim())) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Password and Confirm Password should be same' });
                this.continue = false;
            }
            if (!this.continue) {
                return;
            }
            var strChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var strNumbers = "0123456789";
            var strSplChars = "@#$%&!";
            var strSpace = " ";
            var strSymbols = "<>";
            var strCtrlText = '';
            //===============User ID================================
            strCtrlText = this.addUserData.USER_ID.trim();
            if (strCtrlText.startsWith('_')) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Underscore is not allowed as a first character in User ID' });
                this.continue = false;
            }
            else {
                this.strValid = strChars + strNumbers + "_";
                for (var i = 0; i < strCtrlText.length; i++) {
                    if (this.strValid.indexOf(strCtrlText[i]) == -1) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Only characters, numbers or underscore is allowed in User ID' });
                        this.continue = false;
                        break;
                    }
                }
            }
            if (!this.continue) {
                return;
            }
            //===============First Name=================================
            strCtrlText = this.addUserData.FIRST_NAME.trim();
            this.strValid = strSymbols;
            for (var i = 0; i < strCtrlText.length; i++) {
                if (this.strValid.indexOf(strCtrlText[i]) != -1) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Less than(<) and greater than(>) are not allowed in First Name' });
                    this.continue = false;
                    break;
                }
            }
            if (!this.continue) {
                return;
            }
            //===============Last Name=================================
            strCtrlText = this.addUserData.LAST_NAME.trim();
            this.strValid = strSymbols;
            for (var i = 0; i < strCtrlText.length; i++) {
                if (this.strValid.indexOf(strCtrlText[i]) != -1) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Less than(<) and greater than(>) are not allowed in Last Name' });
                    this.continue = false;
                    //break;
                    return;
                }
            }
            if (!this.continue) {
                return;
            }
            //===============Middle Name=================================
            strCtrlText = this.addUserData.MIDDLE_INITIAL.trim();
            this.strValid = strSymbols;
            for (var i = 0; i < strCtrlText.length; i++) {
                if (this.strValid.indexOf(strCtrlText[i]) != -1) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Less than(<) and greater than(>) are not allowed in Middle Initial' });
                    this.continue = false;
                    break;
                }
            }
            if (!this.continue) {
                return;
            }
            //===============Idle Time=================================
            strCtrlText = this.addUserData.IDLE_TIME.toString().trim();
            if (strCtrlText.length - 1 > 3) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Maximum Length of Idle Time is 4' });
                this.continue = false;
            }
            else if (strCtrlText == "0") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Idle Time must be greater than 0' });
                this.continue = false;
            }
            else {
                for (var i = 0; i < strCtrlText.length; i++) {
                    if (strNumbers.indexOf(strCtrlText[i]) == -1) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Only numbers are allowed in Idle Time' });
                        this.continue = false;
                        break;
                    }
                }
            }
            if (!this.continue) {
                return;
            }
            //===============Session Time=================================
            strCtrlText = this.addUserData.TOKEN_EXPIRY_PERIOD.toString().trim();
            if (strCtrlText.length - 1 > 3) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Maximum Length of Session Time is 4' });
                this.continue = false;
            }
            else if (strCtrlText == "0") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Session Validity Time must be greater than 0' });
                this.continue = false;
            }
            else {
                for (var i = 0; i < strCtrlText.length; i++) {
                    if (strNumbers.indexOf(strCtrlText[i]) == -1) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Only numbers are allowed in Session Time' });
                        this.continue = false;
                        break;
                    }
                }
            }
            if (!this.continue) {
                return;
            }
            //===============Password=================================
            if (this.addUserData.PASSHASH_REQUIRED == true) {
                strCtrlText = this.addUserData.PASSWORD.trim();
                this.blnPwdChars = false;
                this.blnPwdNum = false;
                this.blnPwdSplChars = false;
                if (strCtrlText != null && strCtrlText != '') {
                    if (strCtrlText.length < this.securityParams.PASSWD_MIN_LENGTH) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: ' Minimum Length of Password is ' + this.securityParams.PASSWD_MIN_LENGTH });
                        this.continue = false;
                    }
                    else {
                        //To Check Characters Space 
                        for (var i = 0; i < strCtrlText.length; i++) {
                            if (strSpace.indexOf(strCtrlText[i]) != -1) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Space is not allowed in Password' });
                                this.continue = false;
                                break;
                            }
                        }
                        //To Check Characters
                        for (var i = 0; i < strCtrlText.length; i++) {
                            if (strChars.indexOf(strCtrlText[i]) != -1) {
                                this.blnPwdChars = true;
                                break;
                            }
                        }
                        //To Check Numbers
                        for (var i = 0; i < strCtrlText.length; i++) {
                            if (strNumbers.indexOf(strCtrlText[i]) != -1) {
                                this.blnPwdNum = true;
                                break;
                            }
                        }
                        //To Check Special Characters
                        for (var i = 0; i < strCtrlText.length; i++) {
                            if (strSplChars.indexOf(strCtrlText[i]) != -1) {
                                this.blnPwdSplChars = true;
                                break;
                            }
                        }
                        switch (this.securityParams.PASSWD_COMPLEXITY) {
                            case 1:
                                {
                                    if (!this.blnPwdChars || this.blnPwdNum || this.blnPwdSplChars) {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Only characters are allowed in Password' });
                                        this.continue = false;
                                    }
                                    break;
                                }
                            case 2:
                                {
                                    if (!this.blnPwdChars || !this.blnPwdNum || this.blnPwdSplChars) {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Password must be combination of Characters and Digits' });
                                        this.continue = false;
                                    }
                                    break;
                                }
                            case 3:
                                {
                                    if (!this.blnPwdChars || !this.blnPwdNum || !this.blnPwdSplChars) {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Password must be combination of Characters, Digits and Special Characters' });
                                        this.continue = false;
                                    }
                                    break;
                                }
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "validateControls");
        }
    };
    AddUserComponent.prototype.checkUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.addUserServices.checkUser(this.addUserData.USER_ID).then(function (res) {
                                _this.growlMessage = [];
                                var resType = res.json();
                                switch (resType.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resType.StatusMessage });
                                        _this.addUserData.PASSWORD = '';
                                        _this.addUserData.CPASSWORD = '';
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resType.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resType.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "checkUser");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddUserComponent.prototype.checkProfile = function (typeclient) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.addUserServices.checkProfile(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.addUserData.PROFILE_ID, typeclient).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.resType = data;
                                if (data.StatType == AtParEnums_2.StatusType.Error) {
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    _this.spinnerService.stop();
                                }
                                if ((data.DataVariable == true) && (!_this.addUserData.PASSHASH_REQUIRED)) {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Password is Mandatory for Profile - " + _this.addUserData.PROFILE_ID });
                                    _this.spinnerService.stop();
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "checkProfile");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    AddUserComponent.prototype.createUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.addUserServices.addUser(this.addUserData).subscribe(function (res) {
                                _this.growlMessage = [];
                                _this.spinnerService.stop();
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        var statusMessage = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "User").replace("2%", _this.addUserData.USER_ID);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                        _this.addUserData = new vm_mt_atpar_user_add_1.VM_MT_ATPAR_USER_ADD();
                                        _this.disableButton = true;
                                        document.getElementById('txtUserID').focus();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                _this.atParConstant.scrollToTop();
                                _this.userSelectedFile = '';
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "createUser");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddUserComponent.prototype.updateUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.addUserServices.updateUser(this.addUserData).subscribe(function (res) {
                                _this.growlMessage = [];
                                _this.spinnerService.stop();
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success:
                                        {
                                            var statusmsg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "User").replace("2%", _this.addUserData.USER_ID);
                                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusmsg });
                                            _this.addUserData.PASSWORD = '';
                                            _this.addUserData.CPASSWORD = '';
                                            if (_this.addUserData.PASSWD_RESET_REQUIRED == 'Y') {
                                                _this.addUserData.PWD_RESET_REQUIRED = true;
                                            }
                                            else {
                                                _this.addUserData.PWD_RESET_REQUIRED = false;
                                            }
                                            if (_this.addUserData.PASSHASH_REQUIRED) {
                                                document.getElementById('txtPassword').focus();
                                            }
                                            else {
                                                document.getElementById('txtToken').focus();
                                            }
                                            break;
                                        }
                                    case AtParEnums_2.StatusType.Error:
                                        {
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_2.StatusType.Warn:
                                        {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                _this.atParConstant.scrollToTop();
                            })];
                    case 1:
                        _a.sent();
                        this.userSelectedFile = '';
                        return [3 /*break*/, 3];
                    case 2:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "updateUser");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddUserComponent.prototype.saveLdapUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.lstLdapUser.push(this.addUserData);
                        return [4 /*yield*/, this.addUserServices.saveLdapUser(this.lstLdapUser, this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.addUserData.TOKEN_EXPIRY_PERIOD, this.addUserData.IDLE_TIME, this.addUserData.ORG_GROUP_ID, this.addUserData.PROFILE_ID)
                                .subscribe(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success:
                                        {
                                            var statusMessage = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "User").replace("2%", _this.addUserData.USER_ID);
                                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                            _this.addUserData = new vm_mt_atpar_user_add_1.VM_MT_ATPAR_USER_ADD();
                                            _this.isImportLDAPUser = false;
                                            break;
                                        }
                                    case AtParEnums_2.StatusType.Error:
                                        {
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_2.StatusType.Warn:
                                        {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                }
                                _this.atParConstant.scrollToTop();
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, "saveLdapUser");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddUserComponent.prototype.doAuditData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lstAuditData, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        lstAuditData = [];
                        lstAuditData.push(this.addUserData);
                        return [4 /*yield*/, this.atParCommonService.doAuditData(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_2.EnumApps.Auth, 'mt_atpar_users.aspx', lstAuditData)
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.resType = res;
                                _this.growlMessage = [];
                                if (res.StatType != AtParEnums_2.StatusType.Success) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "doAuditData");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddUserComponent.prototype.swtPassword_Click = function () {
        this.addUserData.PASSWORD = '';
        this.addUserData.CPASSWORD = '';
        if (this.addUserData.PASSHASH_REQUIRED == true) {
            setTimeout(function () {
                var txtPasswdValue = document.getElementById("txtPassword");
                txtPasswdValue.focus();
            }, 500);
        }
    };
    AddUserComponent.prototype.btnGoBack_Click = function () {
        if (this.editUserInfo != null && this.editUserInfo != undefined) {
            this.atParSharedDataService.setStorage({ "fromPage": "AddUser" });
        }
        var navigationExtras = {
            relativeTo: this.route
        };
        var menu = localStorage.getItem('leftMenuUrl').toString();
        if (menu == 'userstatusreport') {
            this.breadCrumbMenu.MENU_NAME = 'User Status Report';
        }
        else {
            this.breadCrumbMenu.MENU_NAME = 'Manage Users';
        }
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.router.navigate(['atpar/' + localStorage.getItem('leftMenuUrl').toString() + '']);
    };
    AddUserComponent.prototype.btnGo_Click = function (searchValues) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.continue = true;
                this.growlMessage = [];
                if (searchValues.USER_ID == '' && searchValues.FIRST_NAME == '' && searchValues.LAST_NAME == '') {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter valid LDAP Search Filter(s)' });
                    this.continue = false;
                }
                else {
                    this.arrLst = [];
                    if (searchValues.USER_ID != '') {
                        this.arrLst.push(this.strUserIDFilter + "=" + searchValues.USER_ID.trim());
                    }
                    if (searchValues.FIRST_NAME != '') {
                        this.arrLst.push(this.strFirstNameFilter + '=' + searchValues.FIRST_NAME.trim());
                    }
                    if (searchValues.LAST_NAME != '') {
                        this.arrLst.push(this.strLastNameFilter + '=' + searchValues.LAST_NAME.trim());
                    }
                    switch (this.arrLst.length) {
                        case 1: {
                            this.stringBuilder = this.arrLst[0];
                            break;
                        }
                        case 2: {
                            this.stringBuilder = this.arrLst[0] + "," + this.arrLst[1];
                            break;
                        }
                        case 3: {
                            this.stringBuilder = this.arrLst[0] + "," + this.arrLst[1] + "," + this.arrLst[2];
                            break;
                        }
                    }
                    this.populateLDAPUsers(this.stringBuilder);
                }
                return [2 /*return*/];
            });
        });
    };
    AddUserComponent.prototype.populateLDAPUsers = function (strValue) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.lstLdapUserData = [];
                        this.atParSharedDataService.storage = {};
                        return [4 /*yield*/, this.addUserServices.getLdapUsers(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], strValue, '').then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.spinnerService.stop();
                                if (data.StatType == AtParEnums_2.StatusType.Success) {
                                    _this.lstLdapUserData = data.DataList;
                                    for (var i = 0; i < _this.lstLdapUserData.length; i++) {
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
                                }
                                else if (data.StatType == AtParEnums_2.StatusType.Warn) {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                }
                                else if (data.StatType == AtParEnums_2.StatusType.Error) {
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12, "populateLDAPUsers");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddUserComponent.prototype.btnImport_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ldapUserInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.atParSharedDataService.storage != null) {
                            ldapUserInfo = this.atParSharedDataService.storage.ldapUserInfo;
                        }
                        if (!(ldapUserInfo != null)) return [3 /*break*/, 2];
                        this.displayImportDialog = false;
                        return [4 /*yield*/, this.ngOnInit()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select atleast one LDAP User to Import' });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddUserComponent.prototype.goBackButton_Click = function (val) {
        this.displayImportDialog = val;
        this.searchImpData = { FIRST_NAME: '', LAST_NAME: '', USER_ID: '' };
        this.lstLdapUserData = [];
        this.addUserData = new vm_mt_atpar_user_add_1.VM_MT_ATPAR_USER_ADD();
        this.growlMessage = [];
        this.isImportLDAPUser = false;
        this.disableButton = true;
        if (val) {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Import User';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        }
        else {
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        }
    };
    AddUserComponent.prototype.rdBtnUser_Click = function (e, user) {
        if (user.VALID_USER == 'INVALID') {
            this.checkUserDetails(user);
        }
        else {
            this.atParSharedDataService.storage = { "ldapUserInfo": user, "mode": AtParEnums_1.ModeEnum.Add };
        }
    };
    AddUserComponent.prototype.checkUserDetails = function (user) {
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
    AddUserComponent.prototype.btnRefreshUserDn_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.addUserServices.refreshUserDN(this.addUserData.USER_ID, this.addUserData.FIRST_NAME, this.addUserData.LAST_NAME).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.spinnerService.stop();
                                if (data.StatType == AtParEnums_2.StatusType.Success) {
                                    if (data.DataList.length > 0) {
                                        _this.addUserData.FIRST_NAME = data.DataList[0].FIRST_NAME;
                                        _this.addUserData.LAST_NAME = data.DataList[0].LAST_NAME;
                                        _this.addUserData.MIDDLE_INITIAL = data.DataList[0].MIDDLE_INITIAL;
                                        _this.addUserData.PHONE1 = data.DataList[0].PHONE1;
                                        _this.addUserData.EMAIL_ID = data.DataList[0].EMAIL_ID;
                                        _this.addUserData.FAX = data.DataList[0].FAX;
                                    }
                                    _this.btnCreateSave_Click('Edit');
                                }
                                else if (data.StatType != AtParEnums_2.StatusType.Warn) {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    _this.addUserData.PASSWORD = '';
                                    _this.addUserData.CPASSWORD = '';
                                }
                                else {
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13, "btnRefreshUserDn_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddUserComponent.prototype.bindModelDataChange = function (event) {
        if ("txtUserID" == event.TextBoxID.toString()) {
            this.userIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtToken" == event.TextBoxID.toString()) {
            this.tokenStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtIdleTime" == event.TextBoxID.toString()) {
            this.idleTimeStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtFirstName" == event.TextBoxID.toString()) {
            this.firstNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtLastName" == event.TextBoxID.toString()) {
            this.lastNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtMName" == event.TextBoxID.toString()) {
            this.mNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtEmail" == event.TextBoxID.toString()) {
            this.mailStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtPhone1" == event.TextBoxID.toString()) {
            this.phone1Status = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtPhone2" == event.TextBoxID.toString()) {
            this.phone2Status = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtFAX" == event.TextBoxID.toString()) {
            this.faxStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtPager" == event.TextBoxID.toString()) {
            this.pagerStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        //edit
        if (this.showManageEdit == true) {
            this.userIDStatus = 0;
            if (this.tokenStatus >= 1) {
                this.tokenStatus = 1;
            }
            else {
                this.tokenStatus = 0;
            }
            if (this.idleTimeStatus >= 1) {
                this.idleTimeStatus = 1;
            }
            else {
                this.idleTimeStatus = 0;
            }
            if (this.firstNameStatus >= 1) {
                this.firstNameStatus = 1;
            }
            else {
                this.firstNameStatus = 0;
            }
            if (this.lastNameStatus >= 1) {
                this.lastNameStatus = 1;
            }
            else {
                this.lastNameStatus = 0;
            }
        }
        //Add and Edit
        if (this.userIDStatus == 0 && this.tokenStatus == 0 && this.idleTimeStatus == 0 && this.firstNameStatus == 0 && this.lastNameStatus == 0) {
            if ((this.mNameStatus == 0 || this.mNameStatus == undefined) && (this.mailStatus == 0 || this.mailStatus == undefined)
                && (this.phone1Status == 0 || this.phone1Status == undefined) && (this.phone2Status == 0 || this.phone2Status == undefined)
                && (this.faxStatus == 0 || this.faxStatus == undefined) && (this.pagerStatus == 0 || this.pagerStatus == undefined)) {
                this.disableButton = false;
            }
            else {
                this.disableButton = true;
            }
        }
        else {
            this.disableButton = true;
        }
    };
    AddUserComponent.prototype.fileUpload = function (event) {
        var _this = this;
        try {
            this.spinnerService.start();
            var fileList = event.target.files;
            this.userSelectedFile = event.target.files[0].name;
            var formData = new FormData();
            if (fileList.length > 0) {
                var file = fileList[0];
                this.files = file.name;
                var listData = [];
                var obj = { FileName: file.name, File: file };
                listData.push(obj);
                formData.append('uploadFile', file, file.name);
            }
            var headers = new http_1.Headers();
            headers.append('Authorization', 'bearer');
            headers.append('enctype', 'multipart/form-data');
            var options = new http_1.RequestOptions({ headers: headers });
            var apiUrl = this.httpService.BaseUrl + "/api/AddUser/SaveUserProfileImage";
            this.http.post(apiUrl, formData, options)
                .toPromise()
                .then(function (res) {
                _this.growlMessage = [];
                _this.spinnerService.stop();
                var data = res.json();
                switch (data.StatType) {
                    case AtParEnums_2.StatusType.Success: {
                        _this.files = '';
                        _this.showUploadImage = false;
                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: data.StatusMessage });
                        break;
                    }
                    case AtParEnums_2.StatusType.Warn: {
                        _this.showUploadImage = true;
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case AtParEnums_2.StatusType.Error: {
                        _this.showUploadImage = true;
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case AtParEnums_2.StatusType.Custom: {
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
            }, function (error) { return console.log(error); });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "fileUpload");
        }
    };
    AddUserComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    AddUserComponent.prototype.ngOnDestroy = function () {
        this.addUserData = new vm_mt_atpar_user_add_1.VM_MT_ATPAR_USER_ADD();
        this.orgGroups = null;
        this.profiles = null;
        if (this.atParSharedDataService.storage != undefined) {
            this.atParSharedDataService.storage.editUserInfo = null;
            if (this.atParSharedDataService.storage.fromPage == "ManageUser") {
                this.atParSharedDataService.storage.fromPage = null;
            }
        }
        this.dropdownProfileData = null;
        this.dropdownOrgData = null;
        this._deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
    };
    AddUserComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-add-user.component.html',
            providers: [atpar_add_user_service_1.AddUserServices, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants],
        }),
        __param(9, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            router_1.Router,
            AtParSharedDataService_1.AtParSharedDataService,
            router_1.ActivatedRoute,
            atpar_add_user_service_1.AddUserServices,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            http_1.Http, Object])
    ], AddUserComponent);
    return AddUserComponent;
}());
exports.AddUserComponent = AddUserComponent;
//# sourceMappingURL=atpar-add-user.component.js.map