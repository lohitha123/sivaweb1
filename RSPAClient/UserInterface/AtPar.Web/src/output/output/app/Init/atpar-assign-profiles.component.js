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
var AtParWebApiResponse_1 = require("../Shared/AtParWebApiResponse");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var atpar_assign_profiles_service_1 = require("./atpar-assign-profiles.service");
var MT_ATPAR_SECURITY_AUDIT_1 = require("../Entities/MT_ATPAR_SECURITY_AUDIT");
var VM_MT_ATPAR_USER_1 = require("../Entities/VM_MT_ATPAR_USER");
var datatable_1 = require("../components/datatable/datatable");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AssignProfilesComponent = (function () {
    function AssignProfilesComponent(dataservice, httpService, spinnerService, assignProfilesService, atParConstant) {
        this.dataservice = dataservice;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.assignProfilesService = assignProfilesService;
        this.atParConstant = atParConstant;
        this.content = false;
        this.orgGroupIds = [];
        this.profileIds = [];
        this.uId = '';
        this.orgGrpId = '';
        this.profileId = '';
        this.fName = '';
        this.lDap = '';
        this.organization = '';
        this.statusMessage = "";
        this.msgs = [];
        this._deviceTokenEntry = [];
        this.userId = "";
        this.statusCode = -1;
        this.allOrgGrp = 'All';
        this.adminProfile = 'admin';
        this.strMenuCode = 'mt_atpar_assign_profiles.aspx';
        this.appId = 0;
        this.lblOrgAssign = false;
        this.lblProfileAssign = false;
        this.intServerProfCnt = 0;
        this.intClientProfCnt = 0;
        this.auditData = [];
        this.saveUserProfileList = [];
        this.checkBoxEnabled = true;
        this.blnFlag = false;
        this.m_strPwdReq = "";
        this.isFiltered = false;
    }
    AssignProfilesComponent.prototype.ngOnInit = function () {
        try {
            this.spinnerService.start();
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.userId = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
            this.pageSize = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
            this.lstCheckedBUnits = new Array();
            this.BindDropDown();
            this.BindDropDownProfiles();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    };
    AssignProfilesComponent.prototype.BindDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i, orgString, i, orgString, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        _a = this;
                        return [4 /*yield*/, this.GetOrgGrpIdData()];
                    case 1:
                        _a.itemList = _b.sent();
                        this.systemData = this.itemList.DataList,
                            this.statusCode = this.itemList.StatusCode;
                        this.statusMessage = this.itemList.StatusMessage;
                        this.statusType = this.itemList.StatType;
                        this.orgGroupIds.push({ label: "Select One ", value: "" });
                        switch (this.statusType) {
                            case AtParEnums_1.StatusType.Success:
                                if (this.systemData != null) {
                                    if (this.systemData.length > 1) {
                                        if (this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].toUpperCase() == this.allOrgGrp.toUpperCase()) {
                                            for (i = 0; i < this.systemData.length; i++) {
                                                orgString = this.systemData[i].ORG_GROUP_ID + ' - ' + this.systemData[i].ORG_GROUP_NAME;
                                                this.orgGroupIds.push({ label: orgString, value: this.systemData[i].ORG_GROUP_ID });
                                            }
                                        }
                                        else {
                                            for (i = 0; i < this.systemData.length; i++) {
                                                if (this.systemData[i].ORG_GROUP_ID.toUpperCase() == this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].toUpperCase()) {
                                                    orgString = this.systemData[i].ORG_GROUP_ID + ' - ' + this.systemData[i].ORG_GROUP_NAME;
                                                    this.orgGroupIds.push({ label: orgString, value: this.systemData[i].ORG_GROUP_ID });
                                                }
                                            }
                                        }
                                    }
                                }
                                break;
                            case AtParEnums_1.StatusType.Error:
                                this.statusMessage = this.statusMessage;
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                                break;
                            case AtParEnums_1.StatusType.Warn:
                                this.statusMessage = this.statusMessage;
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                                break;
                            case AtParEnums_1.StatusType.Custom:
                                this.msgs = [];
                                this.msgs.push({ severity: 'custom', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: this.statusMessage });
                                break;
                        }
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _b.sent();
                        this.clientErrorMsg(ex_1, "BindDropDown");
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AssignProfilesComponent.prototype.BindDropDownProfiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i, profileString, ex_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        _a = this;
                        return [4 /*yield*/, this.GetProfilesData()];
                    case 1:
                        _a.profileData = _b.sent();
                        this.profileDataList = this.profileData.DataList,
                            this.statusCode = this.profileData.StatusCode;
                        this.statusType = this.profileData.StatType;
                        this.statusMessage = this.profileData.StatusMessage;
                        this.profileIds.push({ label: "Select One ", value: "" });
                        switch (this.statusType) {
                            case AtParEnums_1.StatusType.Success:
                                if (this.profileDataList != null) {
                                    if (this.profileDataList.length > 1) {
                                        for (i = 0; i < this.profileDataList.length; i++) {
                                            profileString = this.profileDataList[i].PROFILE_ID + ' - ' + this.profileDataList[i].PROFILE_DESCRIPTION;
                                            if (this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID].toUpperCase() == this.adminProfile.toUpperCase()) {
                                                this.profileIds.push({ label: profileString, value: this.profileDataList[i].PROFILE_ID });
                                            }
                                            else if (this.profileDataList[i].PROFILE_ID.toUpperCase() != this.adminProfile.toUpperCase()) {
                                                this.profileIds.push({ label: profileString, value: this.profileDataList[i].PROFILE_ID });
                                            }
                                        }
                                    }
                                }
                                break;
                            case AtParEnums_1.StatusType.Error:
                                this.statusMessage = this.statusMessage;
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                                break;
                            case AtParEnums_1.StatusType.Warn:
                                this.statusMessage = this.statusMessage;
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                                break;
                            case AtParEnums_1.StatusType.Custom:
                                this.msgs = [];
                                this.msgs.push({ severity: 'custom', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: this.statusMessage });
                                break;
                        }
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _b.sent();
                        this.clientErrorMsg(ex_2, "BindDropDownProfiles");
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AssignProfilesComponent.prototype.ddlChnage = function () {
        this.content = false;
        this.lblOrgAssign = false;
        this.lblProfileAssign = false;
        this.blnFlag = false;
    };
    AssignProfilesComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        if (!(this.orgGrpId == '' && this.profileId == '')) return [3 /*break*/, 1];
                        this.content = false;
                        this.lblOrgAssign = false;
                        this.lblProfileAssign = false;
                        this.userProfileList = [];
                        this.lblOrgAssign = false;
                        this.lblProfileAssign = false;
                        this.blnFlag = false;
                        this.statusMessage = "Select either profile ID or Org Group to the Users";
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                        return [2 /*return*/];
                    case 1:
                        if (this.content && this.dataTableComponent != undefined) {
                            this.dataTableComponent.reset();
                        }
                        return [4 /*yield*/, this.getSecurityParamValues()];
                    case 2:
                        _a.sent();
                        if (!(this.profileId != '')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getServerAccessCount()];
                    case 3:
                        _a.sent();
                        if (!(this.m_strPwdReq == 'Y')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getClientAccessCount()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.getData()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "btnGo_Click");
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AssignProfilesComponent.prototype.getSecurityParamValues = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.assignProfilesService.GetSecurityParamVal(this.userId)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.m_strPwdReq = data.DataVariable;
                                        _this.statusCode = data.StatusCode;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                _this.spinnerService.stop();
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "getSecurityParamValues");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AssignProfilesComponent.prototype.getServerAccessCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.assignProfilesService.GetServerAccessCnt(this.userId, this.profileId).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.intServerProfCnt = data.DataVariable;
                                        _this.statusCode = data.StatusCode;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                _this.spinnerService.stop();
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "getServerAccessCount");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AssignProfilesComponent.prototype.getClientAccessCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.assignProfilesService.GetClientAccessCnt(this.userId, this.profileId).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.intClientProfCnt = data.DataVariable;
                                        _this.statusCode = data.StatusCode;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                _this.spinnerService.stop();
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "getClientAccessCount");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AssignProfilesComponent.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i, listProfileId, listProfileId, listGroupId, listGroupId, profileId, profileId, orgGrpId, orgGrpId, ex_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.content = false;
                        this.msgs = [];
                        this.lblOrgAssign = false;
                        this.lblProfileAssign = false;
                        this.chkboxAssignOld = [];
                        this.userProfileList = [];
                        this.blnFlag = false;
                        if ((this.profileId != null) && (this.profileId != undefined) && (this.profileId != '')) {
                            this.lblProfileAssign = true;
                        }
                        if ((this.orgGrpId != null) && (this.orgGrpId != undefined) && (this.orgGrpId != '')) {
                            this.lblOrgAssign = true;
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        _a = this;
                        return [4 /*yield*/, this.GetUserProfileInfo()];
                    case 2:
                        _a.userProfile = _b.sent();
                        this.userProfileList = this.userProfile.DataList,
                            this.statusCode = this.userProfile.StatusCode;
                        this.statusType = this.userProfile.StatType;
                        this.statusMessage = this.userProfile.StatusMessage;
                        switch (this.statusType) {
                            case AtParEnums_1.StatusType.Success:
                                if (this.userProfileList.length > 0) {
                                    this.content = true;
                                    this.lblOrgId = this.orgGrpId.trim();
                                    this.lblProfileId = this.profileId.trim();
                                    for (i = 0; i < this.userProfileList.length; i++) {
                                        if (this.userProfileList[i].PROFILE_ID != null && this.userProfileList[i].PROFILE_ID != '') {
                                            listProfileId = this.userProfileList[i].PROFILE_ID.toUpperCase();
                                        }
                                        else {
                                            listProfileId = this.userProfileList[i].PROFILE_ID;
                                        }
                                        if (this.userProfileList[i].ORG_GROUP_ID != null && this.userProfileList[i].ORG_GROUP_ID != '') {
                                            listGroupId = this.userProfileList[i].ORG_GROUP_ID.toUpperCase();
                                        }
                                        else {
                                            listGroupId = this.userProfileList[i].PROFILE_ID;
                                        }
                                        if (this.profileId != null && this.profileId != '') {
                                            profileId = this.profileId.toUpperCase();
                                        }
                                        else {
                                            profileId = this.profileId;
                                        }
                                        if (this.orgGrpId != null && this.orgGrpId != '') {
                                            orgGrpId = this.orgGrpId.toUpperCase();
                                        }
                                        else {
                                            orgGrpId = this.orgGrpId;
                                        }
                                        if ((listProfileId == profileId) && (listGroupId == orgGrpId)) {
                                            this.userProfileList[i]["ASSIGN"] = true;
                                        }
                                        else if ((listProfileId == profileId) && (orgGrpId == '')) {
                                            this.userProfileList[i]["ASSIGN"] = true;
                                        }
                                        else if ((listGroupId == orgGrpId) && (profileId == '')) {
                                            this.userProfileList[i]["ASSIGN"] = true;
                                        }
                                        else {
                                            this.userProfileList[i]["ASSIGN"] = false;
                                        }
                                        if (this.profileId != '' && (this.intServerProfCnt > 0 || this.intClientProfCnt > 0)) {
                                            if (this.userProfileList[i].PASSHASH_REQUIRED == false) {
                                                this.blnFlag = true;
                                                this.checkBoxEnabled = false;
                                                this.userProfileList[i]["CHECKBOX_ENABLED"] = false;
                                            }
                                            else {
                                                this.userProfileList[i]["CHECKBOX_ENABLED"] = true;
                                            }
                                        }
                                        else {
                                            this.userProfileList[i]["CHECKBOX_ENABLED"] = true;
                                        }
                                        if (this.userProfileList[i].USER_ID == 'admin' || this.userProfileList[i].USER_ID == this.userId) {
                                            this.checkBoxEnabled = false;
                                            this.userProfileList[i]["CHECKBOX_ENABLED"] = false;
                                        }
                                        this.chkboxAssignOld[i] = this.userProfileList[i].ASSIGN;
                                    }
                                }
                                break;
                            case AtParEnums_1.StatusType.Error:
                                this.content = false;
                                this.lblOrgAssign = false;
                                this.lblProfileAssign = false;
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                                break;
                            case AtParEnums_1.StatusType.Warn:
                                this.content = false;
                                this.lblOrgAssign = false;
                                this.lblProfileAssign = false;
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                                break;
                            case AtParEnums_1.StatusType.Custom:
                                this.content = false;
                                this.lblOrgAssign = false;
                                this.lblProfileAssign = false;
                                this.msgs = [];
                                this.msgs.push({ severity: 'custom', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: this.statusMessage });
                                break;
                        }
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_7 = _b.sent();
                        this.clientErrorMsg(ex_7, "getData");
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AssignProfilesComponent.prototype.assignProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!(this.userProfileList.length != 0)) return [3 /*break*/, 5];
                        this.saveUserProfileList = [];
                        for (i = 0; i < this.userProfileList.length; i++) {
                            if (this.userProfileList[i].ASSIGN != this.chkboxAssignOld[i]) {
                                if (this.orgGrpId != '' && this.profileId != '') {
                                    this.audit = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                    this.audit.OLD_VALUE = this.userProfileList[i].ORG_GROUP_ID;
                                    if (this.userProfileList[i].ASSIGN == true) {
                                        this.audit.NEW_VALUE = this.orgGrpId;
                                    }
                                    else {
                                        this.audit.NEW_VALUE = '';
                                    }
                                    this.audit.FIELD_NAME = 'ORG_GROUP_ID';
                                    this.audit.KEY_1 = this.userProfileList[i].USER_ID;
                                    this.audit.KEY_2 = '';
                                    this.audit.KEY_3 = '';
                                    this.audit.KEY_4 = '';
                                    this.audit.KEY_5 = '';
                                    this.auditData.push(this.audit);
                                    this.audit = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                    this.audit.OLD_VALUE = this.userProfileList[i].PROFILE_ID;
                                    if (this.userProfileList[i].ASSIGN == true) {
                                        this.audit.NEW_VALUE = this.profileId;
                                    }
                                    else {
                                        this.audit.NEW_VALUE = '';
                                    }
                                    this.audit.FIELD_NAME = 'PROFILE_ID';
                                    this.audit.KEY_1 = this.userProfileList[i].USER_ID;
                                    this.audit.KEY_2 = '';
                                    this.audit.KEY_3 = '';
                                    this.audit.KEY_4 = '';
                                    this.audit.KEY_5 = '';
                                    this.auditData.push(this.audit);
                                }
                                else if (this.orgGrpId != '') {
                                    this.audit = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                    this.audit.OLD_VALUE = this.userProfileList[i].ORG_GROUP_ID;
                                    if (this.userProfileList[i].ASSIGN == true) {
                                        this.audit.NEW_VALUE = this.orgGrpId;
                                    }
                                    else {
                                        this.audit.NEW_VALUE = '';
                                    }
                                    this.audit.FIELD_NAME = 'ORG_GROUP_ID';
                                    this.audit.KEY_1 = this.userProfileList[i].USER_ID;
                                    this.audit.KEY_2 = '';
                                    this.audit.KEY_3 = '';
                                    this.audit.KEY_4 = '';
                                    this.audit.KEY_5 = '';
                                    this.auditData.push(this.audit);
                                }
                                else if (this.profileId != '') {
                                    this.audit = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                    this.audit.OLD_VALUE = this.userProfileList[i].PROFILE_ID;
                                    if (this.userProfileList[i].ASSIGN == true) {
                                        this.audit.NEW_VALUE = this.profileId;
                                    }
                                    else {
                                        this.audit.NEW_VALUE = '';
                                    }
                                    this.audit.FIELD_NAME = 'PROFILE_ID';
                                    this.audit.KEY_1 = this.userProfileList[i].USER_ID;
                                    this.audit.KEY_2 = '';
                                    this.audit.KEY_3 = '';
                                    this.audit.KEY_4 = '';
                                    this.audit.KEY_5 = '';
                                    this.auditData.push(this.audit);
                                }
                                this.saveUserProfile = new VM_MT_ATPAR_USER_1.VM_MT_ATPAR_USER();
                                this.saveUserProfile.FIRST_NAME = this.userProfileList[i].FIRST_NAME;
                                this.saveUserProfile.LAST_NAME = this.userProfileList[i].LAST_NAME;
                                this.saveUserProfile.FULLNAME = this.userProfileList[i].FIRST_NAME + this.userProfileList[i].MIDDLE_INITIAL + this.userProfileList[i].LAST_NAME;
                                this.saveUserProfile.MIDDLE_INITIAL = this.userProfileList[i].MIDDLE_INITIAL;
                                this.saveUserProfile.USER_ID = this.userProfileList[i].USER_ID;
                                if (this.userProfileList[i].ASSIGN == true) {
                                    this.saveUserProfile.ASSIGN = 'Y';
                                }
                                else {
                                    this.saveUserProfile.ASSIGN = 'N';
                                }
                                this.saveUserProfileList.push(this.saveUserProfile);
                            }
                        }
                        /* for (var i = 0; i < this.userProfileList.length; i++) {
                             this.saveUserProfile = new VM_MT_ATPAR_USER();
                             this.saveUserProfile.FIRST_NAME = this.userProfileList[i].FIRST_NAME;
                             this.saveUserProfile.LAST_NAME = this.userProfileList[i].LAST_NAME;
                             this.saveUserProfile.FULLNAME = this.userProfileList[i].FIRST_NAME + this.userProfileList[i].MIDDLE_INITIAL + this.userProfileList[i].LAST_NAME;
                             this.saveUserProfile.MIDDLE_INITIAL = this.userProfileList[i].MIDDLE_INITIAL;
                             this.saveUserProfile.USER_ID = this.userProfileList[i].USER_ID;
                             if (this.userProfileList[i].ASSIGN == true) {
                                 this.saveUserProfile.ASSIGN = 'Y';
                                 console.log('trueeeee');
                             }
                             else {
                                 this.saveUserProfile.ASSIGN = 'N';
                                 console.log('falseeeeeeeeeee');
                             }
                             this.saveUserProfileList.push(this.saveUserProfile);
             
                         }*/
                        return [4 /*yield*/, this.getAuditAllowed()];
                    case 1:
                        /* for (var i = 0; i < this.userProfileList.length; i++) {
                             this.saveUserProfile = new VM_MT_ATPAR_USER();
                             this.saveUserProfile.FIRST_NAME = this.userProfileList[i].FIRST_NAME;
                             this.saveUserProfile.LAST_NAME = this.userProfileList[i].LAST_NAME;
                             this.saveUserProfile.FULLNAME = this.userProfileList[i].FIRST_NAME + this.userProfileList[i].MIDDLE_INITIAL + this.userProfileList[i].LAST_NAME;
                             this.saveUserProfile.MIDDLE_INITIAL = this.userProfileList[i].MIDDLE_INITIAL;
                             this.saveUserProfile.USER_ID = this.userProfileList[i].USER_ID;
                             if (this.userProfileList[i].ASSIGN == true) {
                                 this.saveUserProfile.ASSIGN = 'Y';
                                 console.log('trueeeee');
                             }
                             else {
                                 this.saveUserProfile.ASSIGN = 'N';
                                 console.log('falseeeeeeeeeee');
                             }
                             this.saveUserProfileList.push(this.saveUserProfile);
             
                         }*/
                        _a.sent();
                        if (!(this.auditFlag == 'Y')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.insertAuditData()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.assignProfileData()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "assignProfile");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AssignProfilesComponent.prototype.GetUserProfileInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.userProfile = new AtParWebApiResponse_1.AtParWebApiResponse();
                        return [4 /*yield*/, this.assignProfilesService.GetProfileUserInfo(this.userId, this.uId, this.lDap, this.fName, this.organization, this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .then(function (res) {
                                var data = res.json();
                                _this.userProfile = data;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.userProfile];
                    case 2:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "GetUserProfileInfo");
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AssignProfilesComponent.prototype.assignProfileData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.assignProfilesService.SaveProfileUsersInfo(this.saveUserProfileList, this.profileId, this.orgGrpId, this.userId)
                                .then(function (res) {
                                var data = res.json();
                                //this.userProf = await this.SaveUserProfileInfo();
                                //if (this.userProf != null && this.userProf.DataList.length>0) { }
                                //this.userProfList = this.userProf.DataList,
                                //    this.statusCode = this.userProf.StatusCode;
                                // this.statusType = this.userProf.StatType;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.content = false;
                                        _this.userProfileList = [];
                                        _this.lblOrgAssign = false;
                                        _this.lblProfileAssign = false;
                                        _this.statusMessage = "Upated Successfully";
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMessage });
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.statusMessage = _this.userProf.StatusMessage;
                                        ;
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: _this.statusMessage });
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.statusMessage = _this.userProf.StatusMessage;
                                        ;
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: _this.statusMessage });
                                        break;
                                    case AtParEnums_1.StatusType.Custom:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'custom', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: _this.statusMessage });
                                        break;
                                }
                                _this.spinnerService.stop();
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, "assignProfileData");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AssignProfilesComponent.prototype.GetOrgGrpIdData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.itemList = new AtParWebApiResponse_1.AtParWebApiResponse();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.assignProfilesService.GetOrgGroupIds(this.userId, '', '')
                                .then(function (res) {
                                var data = res.json();
                                _this.itemList = data;
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.itemList];
                    case 3:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "GetOrgGrpIdData");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AssignProfilesComponent.prototype.GetProfilesData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.profileData = new AtParWebApiResponse_1.AtParWebApiResponse();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.assignProfilesService.GetProfileIds(this.userId)
                                .then(function (res) {
                                var data = res.json();
                                _this.profileData = data;
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.profileData];
                    case 3:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12, "GetProfilesData");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AssignProfilesComponent.prototype.SaveUserProfileInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.userProf = new AtParWebApiResponse_1.AtParWebApiResponse();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.assignProfilesService.SaveProfileUsersInfo(this.saveUserProfileList, this.profileId, this.orgGrpId, this.userId)
                                .then(function (res) {
                                var data = res.json();
                                _this.userProf = data;
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.userProf];
                    case 3:
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13, "SaveUserProfileInfo");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AssignProfilesComponent.prototype.changeStatus = function (obj, status) {
        for (var i = 0; i < this.userProfileList.length; i++) {
            if (this.userProfileList[i] == obj) {
                this.userProfileList[i].ASSIGN = status;
            }
        }
    };
    AssignProfilesComponent.prototype.checkAllCheckboxes = function () {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.endIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstGridFilterData != null && this.lstGridFilterData != undefined && this.lstGridFilterData.length > 0) {
                if (this.endIndex > this.lstGridFilterData.length) {
                    this.endIndex = this.lstGridFilterData.length;
                }
                for (var i = this.startIndex; i <= this.endIndex - 1; i++) {
                    if (this.lstGridFilterData[i].CHECKBOX_ENABLED == true) {
                        this.lstGridFilterData[i].ASSIGN = true;
                    }
                    this.lstCheckedBUnits.push(this.lstGridFilterData[i]);
                }
            }
            else {
                if (this.endIndex > this.userProfileList.length) {
                    this.endIndex = this.userProfileList.length;
                }
                for (var i = this.startIndex; i <= this.endIndex - 1; i++) {
                    if (this.userProfileList[i].CHECKBOX_ENABLED == true) {
                        this.userProfileList[i].ASSIGN = true;
                    }
                    this.lstCheckedBUnits.push(this.userProfileList[i]);
                }
            }
            //if (this.isFiltered == true) {
            //    if (this.filterList != null && this.filterList.length > 0) {
            //        for (var i = 0; i < this.filterList.length; i++) {
            //            for (var j = 0; j < this.userProfileList.length; j++) {
            //                if (this.filterList[i] == this.userProfileList[j]) {
            //                    if (this.userProfileList[j].CHECKBOX_ENABLED == true) {
            //                        this.userProfileList[j].ASSIGN = true;
            //                        break;
            //                    }
            //                    break;
            //                }
            //            }
            //        }
            //    }
            //}
            //else {
            //    for (var i = 0; i < this.userProfileList.length; i++) {
            //        if (this.userProfileList[i].CHECKBOX_ENABLED == true) {
            //            this.userProfileList[i].ASSIGN = true;
            //        }
            //    }
            //}
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAllCheckboxes");
        }
    };
    AssignProfilesComponent.prototype.onFilterList = function (filterList) {
        this.filterList = filterList;
        if (this.filterList == null) {
            this.isFiltered = false;
        }
        else {
            this.isFiltered = true;
        }
    };
    AssignProfilesComponent.prototype.uncheckAllCheckboxes = function () {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.endIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstGridFilterData != null && this.lstGridFilterData != undefined && this.lstGridFilterData.length > 0) {
                if (this.endIndex > this.lstGridFilterData.length) {
                    this.endIndex = this.lstGridFilterData.length;
                }
                for (var i = this.endIndex - 1; i >= this.startIndex; i--) {
                    if (this.lstGridFilterData[i].CHECKBOX_ENABLED == true) {
                        this.lstGridFilterData[i].ASSIGN = false;
                    }
                    this.lstCheckedBUnits.push(this.lstGridFilterData[i]);
                }
            }
            else {
                if (this.endIndex > this.userProfileList.length) {
                    this.endIndex = this.userProfileList.length;
                }
                for (var i = this.endIndex - 1; i >= this.startIndex; i--) {
                    if (this.userProfileList[i].CHECKBOX_ENABLED == true) {
                        this.userProfileList[i].ASSIGN = false;
                    }
                    this.lstCheckedBUnits.push(this.userProfileList[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "uncheckAllCheckboxes");
        }
    };
    AssignProfilesComponent.prototype.getAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var appId, ex_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        appId = 0;
                        return [4 /*yield*/, this.assignProfilesService.GetAuditAllowed(this.userId, appId, this.strMenuCode).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.auditFlag = data.Data;
                                        _this.statusCode = data.StatusCode;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                _this.spinnerService.stop();
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_14 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_14, "getAuditAllowed");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AssignProfilesComponent.prototype.insertAuditData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strScreenName, ex_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        strScreenName = "Assign Profiles";
                        return [4 /*yield*/, this.assignProfilesService.InsertAuditData(this.auditData, this.userId, strScreenName).forEach(function (resp) {
                                var data = resp.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var response = data.DataList;
                                        _this.statusCode = data.StatusCode;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                _this.spinnerService.stop();
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_15 = _a.sent();
                        this.clientErrorMsg(ex_15, "insertAuditData");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AssignProfilesComponent.prototype.ngOnDestroy = function () {
        this._deviceTokenEntry = null;
        this.statusCode = null;
        this.userId = null;
        this.uId = null;
        this.orgGrpId = null;
        this.profileId = null;
        this.fName = null;
        this.lDap = null;
        this.organization = null;
        this.statusMessage = null;
        this.errorCode = null;
        this.m_strPwdReq = null;
        this.auditFlag = null;
        this.userProfileList = null;
        this.userProf = null;
        this.userProfile = null;
        this.profileDataList = null;
        this.profileData = null;
        this.saveUserProfileList = null;
        this.saveUserProfile = null;
        this.spinnerService.stop();
        this.spinnerService = null;
    };
    AssignProfilesComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], AssignProfilesComponent.prototype, "dataTableComponent", void 0);
    AssignProfilesComponent = __decorate([
        core_1.Component({
            selector: 'assignProfile-app',
            templateUrl: 'atpar-assign-profiles.component.html',
            providers: [datatableservice_1.datatableservice, HttpService_1.HttpService, atpar_assign_profiles_service_1.AssignProfilesService, AtParConstants_1.AtParConstants],
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice, HttpService_1.HttpService, event_spinner_service_1.SpinnerService, atpar_assign_profiles_service_1.AssignProfilesService, AtParConstants_1.AtParConstants])
    ], AssignProfilesComponent);
    return AssignProfilesComponent;
}());
exports.AssignProfilesComponent = AssignProfilesComponent;
//# sourceMappingURL=atpar-assign-profiles.component.js.map