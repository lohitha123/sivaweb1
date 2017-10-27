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
var http_1 = require("@angular/http");
var atpar_user_upload_automation_component_service_1 = require("../Init/atpar-user-upload-automation.component.service");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var AtParConstants_1 = require("../Shared/AtParConstants");
var api_1 = require("../components/common/api");
var file_saver_1 = require("file-saver");
var UserUploadAutomationComponent = (function () {
    function UserUploadAutomationComponent(userUploadAutoService, commenService, spinnerService, httpService, activatedRoute, atParConstant, http, confirmationService) {
        this.userUploadAutoService = userUploadAutoService;
        this.commenService = commenService;
        this.spinnerService = spinnerService;
        this.httpService = httpService;
        this.activatedRoute = activatedRoute;
        this.atParConstant = atParConstant;
        this.http = http;
        this.confirmationService = confirmationService;
        this._deviceTokenEntry = [];
        this.strUserPath = '';
        this.strProfilePath = '';
        this.strOrgPath = '';
        this.strERPvalue = '';
        this._strErr = '';
        this.strPrintAction = '';
        this.qryPrint = '';
        this.qryExcel = '';
        this.userSelectedFile = '';
        this.profileSelectedFile = '';
        this.orgGroupSelectedFile = '';
        this.HdnProfileUplaoded = '';
        this.strUserPathExist = false;
        this.strProfilePathExist = false;
        this.strOrgPathExist = false;
        this.chkUser = false;
        this.chkOrgGroup = false;
        this.chkProfile = false;
        this.msgs = [];
        this.lblTotalNoOfRec = 0;
        this.lblSuccessCnt = 0;
        this.lblFailureCnt = 0;
        this.lblAddedNoOfRec = 0;
        this.lblUpdatedNoOfRec = 0;
        this._blnUserDataExists = false;
        this.lblOrgTotalNoOfRec = 0;
        this.lblOrgSuccessCnt = 0;
        this.lblOrgFailureCnt = 0;
        this.lblOrgWarningCnt = 0;
        this.lblOrgAddedNoOfRec = 0;
        this.lblOrgUpdatedNoOfRec = 0;
        this._blnOrgDataExists = false;
        this.lblProfileTotalNoOfRec = 0;
        this.lblProfileSuccessCnt = 0;
        this.lblProfileFailureCnt = 0;
        this.lblProfileAddedNoOfRec = 0;
        this.lblprofileUpdatedNoOfRec = 0;
        this._blnProfileDataExists = false;
        this.tblGrd = false;
        this.tblOrgGrd = false;
        this.tblProfileGrd = false;
        this.trInputFields = false;
        this.tdOptions = false;
        this.dgridErrorDtls = false;
        this.dgridOrgErrorDtls = false;
        this.tdMenuError = false;
        this.tdScreenDisplay = false;
        this.tdParameters = false;
        this.tdEmptyRowMenu = false;
        this.tdEmptyRowScreen = false;
        this.tdEmptyRowParams = false;
        this.dgridProfileErrorDtls = false;
        this.dgridProfileMenuErrorDtls = false;
        this.dgridProfileScreenDisplayErrorDtls = false;
        this.dgridProfileParametersErrorDtls = false;
        this.lstUserErrData = [];
        this.lstOrgGroupErrData = [];
        this.lstProfileMenusErrData = [];
        this.lstprofileParametersErrData = [];
        this.lstprofileScreendisplayErrData = [];
        this.lstprofileTemplateRefErrData = [];
        this.recordsPerPage = 0;
        this.lstUserErrDataColumnHeaders = [];
        this.lstOrgGroupErrDataColumnHeaders = [];
        this.lstProfileMenusErrDataColumnHeaders = [];
        this.lstprofileParametersErrDataColumnHeaders = [];
        this.lstprofileScreendisplayErrDataColumnHeaders = [];
        this.lstprofileTemplateRefErrDataColumnHeaders = [];
        this.userErrDataHeaders = [];
        this.userErrDataFields = [];
        this.orgGrpErrDataHeaders = [];
        this.orgGrprErrDataFields = [];
        this.profileTemprefErrDataHeaders = [];
        this.profileTempRefErrDataFields = [];
        this.profileMenusErrDataHeaders = [];
        this.profileMenusErrDataFields = [];
        this.profileParamErrDataHeaders = [];
        this.profileParamErrDataFields = [];
        this.profileScrErrDataHeaders = [];
        this.profileScrErrDataFields = [];
        this.userErrDataTableWidth = '100%';
        this.orgGroupErrDataTableWidth = '100%';
        this.profileErrDataTableWidth = '100%';
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPage = parseInt(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage]);
    }
    UserUploadAutomationComponent.prototype.ngOnInit = function () {
        try {
            this.bindData();
            this.getFilePaths();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    };
    UserUploadAutomationComponent.prototype.bindData = function () {
        var _this = this;
        try {
            this.activatedRoute.queryParams.subscribe(function (params) {
                _this.qryPrint = params['print'];
                _this.qryExcel = params['excel'];
                if (_this.qryPrint == '1' || _this.qryExcel == '1') {
                    if (_this.qryPrint == '1' || _this.qryExcel == '1') {
                        if (_this.qryPrint == '1') {
                            _this.strPrintAction = 'somethisng<a> element';
                        }
                        else {
                            _this.strPrintAction = '';
                        }
                    }
                    if (sessionStorage.getItem('dsUserdata') != null && sessionStorage.getItem('binddatagrid') != '') {
                        _this.bindUserDataGrid();
                    }
                    if (sessionStorage.getItem('_dsOrgGroupdata') != null && sessionStorage.getItem('_dsOrgGroupdata') != '') {
                        _this.bindOrgDataGrid();
                    }
                    if (sessionStorage.getItem('_dsProfiledata') != null && sessionStorage.getItem('_dsProfiledata') != '') {
                        _this.bindProfileDataGrid();
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindData");
        }
    };
    UserUploadAutomationComponent.prototype.getFilePaths = function () {
        var _this = this;
        try {
            this.commenService.getEnterpriseSystem().catch(this.httpService.handleError)
                .then(function (res) {
                var data = res.json();
                _this.msgs = [];
                switch (data.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        var _strErr = '';
                        if (data.Data != null) {
                            _this.strERPvalue = data.Data.toString();
                            _this.strUserPath = '../redist/Upload_templates/User/UserData_Template_' + _this.strERPvalue + '.xls';
                            _this.strProfilePath = '../redist/Upload_templates/Profile/ProfileData_Template_' + _this.strERPvalue + '.xls';
                            _this.strOrgPath = '../redist/Upload_templates/Org/OrgGroupData_Template_' + _this.strERPvalue + '.xls';
                            if (_this.UrlExists(_this.strUserPath)) {
                                _this.strUserPathExist = true;
                            }
                            else {
                                _strErr = 'User';
                            }
                            if (_this.UrlExists(_this.strProfilePath)) {
                                _this.strProfilePathExist = true;
                            }
                            else {
                                if (_strErr != '') {
                                    _strErr = _strErr + '/Profile';
                                }
                                else {
                                    _strErr = 'Profile';
                                }
                            }
                            if (_this.UrlExists(_this.strOrgPath)) {
                                _this.strOrgPathExist = true;
                            }
                            else {
                                if (_strErr != '') {
                                    _strErr = _strErr + '/Org';
                                }
                                else {
                                    _strErr = 'Org';
                                }
                            }
                            if (_strErr != '') {
                                _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: _strErr + ' template(s) does not exist' });
                            }
                        }
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
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getFilePaths");
        }
    };
    UserUploadAutomationComponent.prototype.bindUserDataGrid = function () {
        try {
            this.dsUserdata = [];
            this.dsUserdata = JSON.parse(sessionStorage.getItem('dsUserdata'));
            if (this.dsUserdata.length == 0) {
                this.msgs = [];
                this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: 'No Data Found' });
                return;
            }
            this.tblGrd = true;
            this.dgridErrorDtls = true;
            this.trInputFields = false;
            try {
                if (this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.SUMMARY]] != null && this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.SUMMARY]] != undefined) {
                    this.lblTotalNoOfRec = this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.TOTAL_REC_CNT]];
                    this.lblSuccessCnt = this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.SUCCESS_CNT]];
                    this.lblFailureCnt = this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.FAILURE_CNT]];
                    this.lblAddedNoOfRec = this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.ADDED_CNT]];
                    this.lblUpdatedNoOfRec = this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.UPDATED_CNT]];
                }
                if (this.dsUserdata['userErrDataFields'] != null && this.dsUserdata['userErrDataHeaders'] != null) {
                    this.lstUserErrDataColumnHeaders = [];
                    var userErrDataColumnHeader = [];
                    var userErrDataHeaders = [];
                    var userErrDataFields = [];
                    userErrDataHeaders = this.dsUserdata['userErrDataHeaders'];
                    userErrDataFields = this.dsUserdata['userErrDataFields'];
                    if (userErrDataColumnHeader.length != null) {
                        for (var i = 0; i < userErrDataHeaders.length; i++) {
                            userErrDataColumnHeader = [];
                            userErrDataColumnHeader.push(userErrDataFields[i]);
                            userErrDataColumnHeader.push(userErrDataHeaders[i]);
                            this.lstUserErrDataColumnHeaders.push(userErrDataColumnHeader);
                        }
                        this.lstUserErrData = [];
                        this.lstUserErrData = this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.UserErrorData.toString()]];
                    }
                }
            }
            catch (ex) {
                this.clientErrorMsg(ex, "bindUserDataGrid");
                return;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindUserDataGrid");
            return;
        }
    };
    UserUploadAutomationComponent.prototype.bindOrgDataGrid = function () {
        try {
            this.dsOrgGroupdata = [];
            this.dsOrgGroupdata = JSON.parse(sessionStorage.getItem('dsOrgGroupdata'));
            if (this.dsOrgGroupdata.length == 0) {
                this.msgs = [];
                this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: 'No Data Found' });
                return;
            }
            this.tblOrgGrd = true;
            this.dgridOrgErrorDtls = true;
            this.trInputFields = false;
            try {
                if (this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.SUMMARY]] != null && this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.SUMMARY]] != undefined) {
                    this.lblOrgTotalNoOfRec = this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.TOTAL_REC_CNT]];
                    this.lblOrgSuccessCnt = this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.SUCCESS_CNT]];
                    this.lblOrgFailureCnt = this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.FAILURE_CNT]];
                    this.lblOrgAddedNoOfRec = this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.ADDED_CNT]];
                    this.lblOrgUpdatedNoOfRec = this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.UPDATED_CNT]];
                    this.lblOrgWarningCnt = this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.WARNING_CNT]];
                }
                if (this.dsOrgGroupdata['orgGroupErrDataFields'] != null && this.dsOrgGroupdata['orgGroupErrDataHeaders'] != null) {
                    this.lstOrgGroupErrDataColumnHeaders = [];
                    var orgGrpErrDataColumnHeader = [];
                    var orgGrpErrDataHeaders = [];
                    var orgGrprErrDataFields = [];
                    orgGrpErrDataHeaders = this.dsOrgGroupdata['orgGroupErrDataHeaders'];
                    orgGrprErrDataFields = this.dsOrgGroupdata['orgGroupErrDataFields'];
                    if (orgGrpErrDataHeaders.length != null) {
                        for (var i = 0; i < orgGrpErrDataHeaders.length; i++) {
                            orgGrpErrDataColumnHeader = [];
                            orgGrpErrDataColumnHeader.push(orgGrprErrDataFields[i]);
                            orgGrpErrDataColumnHeader.push(orgGrpErrDataHeaders[i]);
                            this.lstOrgGroupErrDataColumnHeaders.push(orgGrpErrDataColumnHeader);
                        }
                        this.lstOrgGroupErrData = [];
                        this.lstOrgGroupErrData = this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.OrgGroupErrorData.toString()]];
                    }
                }
            }
            catch (ex) {
                this.clientErrorMsg(ex, "bindOrgDataGrid");
                return;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindOrgDataGrid");
            return;
        }
    };
    UserUploadAutomationComponent.prototype.bindProfileDataGrid = function () {
        try {
            this.dsProfiledata = [];
            this.dsProfiledata = JSON.parse(sessionStorage.getItem('dsProfiledata'));
            if (this.dsProfiledata.length == 0) {
                this.msgs = [];
                this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: 'No Data Found' });
                return;
            }
            this.tblProfileGrd = true;
            this.dgridProfileErrorDtls = true;
            this.dgridProfileMenuErrorDtls = true;
            this.dgridProfileScreenDisplayErrorDtls = true;
            this.dgridProfileParametersErrorDtls = true;
            this.trInputFields = false;
            try {
                if (this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.SUMMARY]] != null && this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.SUMMARY]] != undefined) {
                    this.lblProfileTotalNoOfRec = this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.TOTAL_REC_CNT]];
                    this.lblProfileSuccessCnt = this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.SUCCESS_CNT]];
                    this.lblProfileFailureCnt = this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.FAILURE_CNT]];
                    this.lblProfileAddedNoOfRec = this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.ADDED_CNT]];
                    this.lblprofileUpdatedNoOfRec = this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.UPDATED_CNT]];
                }
                if (this.dsProfiledata['profileMenusErrDataFields'] != null && this.dsProfiledata['profileMenusErrDataHeaders'] != null) {
                    this.lstProfileMenusErrDataColumnHeaders = [];
                    var profileMenusErrDataColumnHeader = [];
                    var profileMenusErrDataHeaders = [];
                    var profileMenusErrDataFields = [];
                    profileMenusErrDataHeaders = this.dsProfiledata['profileMenusErrDataHeaders'];
                    profileMenusErrDataFields = this.dsProfiledata['profileMenusErrDataFields'];
                    if (profileMenusErrDataHeaders.length != null) {
                        for (var i = 0; i < profileMenusErrDataHeaders.length; i++) {
                            profileMenusErrDataColumnHeader = [];
                            profileMenusErrDataColumnHeader.push(profileMenusErrDataFields[i]);
                            profileMenusErrDataColumnHeader.push(profileMenusErrDataHeaders[i]);
                            this.lstProfileMenusErrDataColumnHeaders.push(profileMenusErrDataColumnHeader);
                        }
                        this.lstProfileMenusErrData = [];
                        this.lstProfileMenusErrData = this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileMenusErrorData.toString()]];
                    }
                }
                if (this.dsProfiledata['profileParametersErrDataFields'] != null && this.dsProfiledata['profileParametersErrDataHeaders'] != null) {
                    this.lstprofileParametersErrDataColumnHeaders = [];
                    var profileParamErrDataColumnHeader = [];
                    var profileParamErrDataHeaders = [];
                    var profileParamErrDataFields = [];
                    profileParamErrDataHeaders = this.dsProfiledata['profileParametersErrDataHeaders'];
                    profileParamErrDataFields = this.dsProfiledata['profileParametersErrDataFields'];
                    if (profileParamErrDataHeaders.length != null) {
                        for (var i = 0; i < profileParamErrDataHeaders.length; i++) {
                            profileParamErrDataColumnHeader = [];
                            profileParamErrDataColumnHeader.push(profileParamErrDataFields[i]);
                            profileParamErrDataColumnHeader.push(profileParamErrDataHeaders[i]);
                            this.lstprofileParametersErrDataColumnHeaders.push(profileParamErrDataColumnHeader);
                        }
                        this.lstprofileParametersErrData = [];
                        this.lstprofileParametersErrData = this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileParametersErrorData.toString()]];
                    }
                }
                if (this.dsProfiledata['profileScreendisplayErrDataFields'] != null && this.dsProfiledata['profileScreendisplayErrDataHeaders'] != null) {
                    this.lstprofileScreendisplayErrDataColumnHeaders = [];
                    var profileScrErrDataColumnHeader = [];
                    var profileScrErrDataHeaders = [];
                    var profileScrErrDataFields = [];
                    profileScrErrDataHeaders = this.dsProfiledata['profileScreendisplayErrDataHeaders'];
                    profileScrErrDataFields = this.dsProfiledata['profileScreendisplayErrDataFields'];
                    if (profileScrErrDataHeaders.length != null) {
                        for (var i = 0; i < profileScrErrDataHeaders.length; i++) {
                            profileScrErrDataColumnHeader = [];
                            profileScrErrDataColumnHeader.push(profileScrErrDataFields[i]);
                            profileScrErrDataColumnHeader.push(profileScrErrDataHeaders[i]);
                            this.lstprofileScreendisplayErrDataColumnHeaders.push(profileScrErrDataColumnHeader);
                        }
                        this.lstprofileScreendisplayErrData = [];
                        this.lstprofileScreendisplayErrData = this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileScreendisplayErrorData.toString()]];
                    }
                }
                if (this.dsProfiledata['profileTemplateRefErrDataFields'] != null && this.dsProfiledata['profileTemplateRefErrDataHeaders'] != null) {
                    this.lstprofileTemplateRefErrDataColumnHeaders = [];
                    var profileTempRefErrDataColumnHeader = [];
                    var profileTemprefErrDataHeaders = [];
                    var profileTempRefErrDataFields = [];
                    profileTemprefErrDataHeaders = this.dsProfiledata['profileTemplateRefErrDataHeaders'];
                    profileTempRefErrDataFields = this.dsProfiledata['profileTemplateRefErrDataFields'];
                    if (profileTemprefErrDataHeaders.length != null) {
                        for (var i = 0; i < profileTemprefErrDataHeaders.length; i++) {
                            profileTempRefErrDataColumnHeader = [];
                            profileTempRefErrDataColumnHeader.push(profileTempRefErrDataFields[i]);
                            profileTempRefErrDataColumnHeader.push(profileTemprefErrDataHeaders[i]);
                            this.lstprofileTemplateRefErrDataColumnHeaders.push(profileTempRefErrDataColumnHeader);
                        }
                        this.lstprofileTemplateRefErrData = [];
                        this.lstprofileTemplateRefErrData = this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileTemplateRefErrorData.toString()]];
                    }
                }
            }
            catch (ex) {
                this.clientErrorMsg(ex, "bindProfileDataGrid");
                return;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindProfileDataGrid");
            return;
        }
    };
    UserUploadAutomationComponent.prototype.UrlExists = function (url) {
        try {
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();
            return http.status != 404;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "UrlExists");
            return false;
        }
    };
    UserUploadAutomationComponent.prototype.onUserTemplateClick = function () {
        var _this = this;
        try {
            this.confirmationService.confirm({
                message: 'Do you want to open or save UserData_Template_' + this.strERPvalue + '.xls?',
                accept: function () {
                    if (_this.strUserPathExist) {
                        var query = '?download';
                        window.open(_this.strUserPath + query, "_self");
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onUserTemplateClick");
        }
    };
    UserUploadAutomationComponent.prototype.onProfileTemplateClick = function () {
        var _this = this;
        try {
            this.confirmationService.confirm({
                message: 'Do you want to open or save ProfileData_Template_' + this.strERPvalue + '.xls?',
                accept: function () {
                    if (_this.strProfilePathExist) {
                        var query = '?download';
                        window.open(_this.strProfilePath + query, "_self");
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onProfileTemplateClick");
        }
    };
    UserUploadAutomationComponent.prototype.onOrgGroupTemplateClick = function () {
        var _this = this;
        try {
            this.confirmationService.confirm({
                message: 'Do you want to open or save OrgGroupData_Template_' + this.strERPvalue + '.xls?',
                accept: function () {
                    if (_this.strOrgPathExist) {
                        var query = '?download';
                        window.open(_this.strOrgPath + query, "_self");
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onOrgGroupTemplateClick");
        }
    };
    UserUploadAutomationComponent.prototype.changeChkOrgGroup = function () {
    };
    UserUploadAutomationComponent.prototype.changeChkProfile = function () {
    };
    UserUploadAutomationComponent.prototype.changeChkUser = function () {
    };
    UserUploadAutomationComponent.prototype.onBrowseClick = function (fileType) {
        try {
            if (fileType == AtParEnums_1.DataSet_Type[AtParEnums_1.DataSet_Type.USER]) {
                this.userPostedFiles = null;
                this.userSelectedFile = '';
            }
            else if (fileType == AtParEnums_1.DataSet_Type[AtParEnums_1.DataSet_Type.PROFILE]) {
                this.profilePostedFiles = null;
                this.profileSelectedFile = '';
            }
            else if (fileType == AtParEnums_1.DataSet_Type[AtParEnums_1.DataSet_Type.ORG]) {
                this.orgGroupPostedFiles = null;
                this.orgGroupSelectedFile = '';
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onBrowseClick");
        }
    };
    UserUploadAutomationComponent.prototype.fileUserChange = function (event) {
        try {
            //event.stopPropagation();
            this.msgs = [];
            if (event.target.files.length > 0) {
                this.userPostedFiles = event.target.files;
                this.userSelectedFile = event.target.files[0].name;
            }
            else {
                this.userPostedFiles = null;
                this.userSelectedFile = '';
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "fileUserChange");
        }
    };
    UserUploadAutomationComponent.prototype.fileProfileChange = function (event) {
        try {
            this.msgs = [];
            if (event.target.files.length > 0) {
                this.profilePostedFiles = event.target.files;
                this.profileSelectedFile = event.target.files[0].name;
            }
            else {
                this.profilePostedFiles = null;
                this.profileSelectedFile = '';
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "fileProfileChange");
        }
    };
    UserUploadAutomationComponent.prototype.fileOrgGroupChange = function (event) {
        try {
            this.msgs = [];
            if (event.target.files.length > 0) {
                this.orgGroupPostedFiles = event.target.files;
                this.orgGroupSelectedFile = event.target.files[0].name;
            }
            else {
                this.orgGroupPostedFiles = null;
                this.orgGroupSelectedFile = '';
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "fileOrgGroupChange");
        }
    };
    UserUploadAutomationComponent.prototype.onLoadNowClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strUserFile, strOrgGroupFile, strProfileFile, count, strEnterpriseSystem_1, ex_1, formData, headers, options, apiUrl, ex_2, formData, headers, options, apiUrl, ex_3, formData, headers, options, apiUrl, ex_4, ex_5, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 23, 24, 25]);
                        this.spinnerService.start();
                        strUserFile = void 0;
                        strOrgGroupFile = void 0;
                        strProfileFile = void 0;
                        count = void 0;
                        strEnterpriseSystem_1 = '';
                        this.trInputFields = true;
                        return [4 /*yield*/, this.clearData()];
                    case 1:
                        _a.sent();
                        if (!(this.chkUser || this.chkProfile || this.chkOrgGroup)) return [3 /*break*/, 21];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.commenService.getEnterpriseSystem().catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this._statusCode = data.StatType.toString();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        strEnterpriseSystem_1 = data.Data.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _a.sent();
                        if (strEnterpriseSystem_1 == '' || strEnterpriseSystem_1 == null) {
                            this.trInputFields = false;
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _a.sent();
                        this.trInputFields = false;
                        this.clientErrorMsg(ex_1, "onLoadNowClick");
                        return [2 /*return*/];
                    case 5:
                        if (!this.chkUser) return [3 /*break*/, 9];
                        this.HdnProfileUplaoded = 'U';
                        if (!!this.validateFileName(this.userSelectedFile)) return [3 /*break*/, 6];
                        this.trInputFields = false;
                        this.chkUser = false;
                        this.profileSelectedFile = '';
                        this.userSelectedFile = '';
                        this.orgGroupSelectedFile = '';
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Not a Valid File Name' });
                        return [2 /*return*/];
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        formData = new FormData();
                        formData.append('uploadFile', this.userPostedFiles[0]);
                        formData.append('fileName', 'User_Upload' + this.getISODateTime());
                        headers = new http_1.Headers();
                        headers.append('Authorization', 'bearer');
                        headers.append('enctype', 'multipart/form-data');
                        options = new http_1.RequestOptions({ headers: headers });
                        apiUrl = this.httpService.BaseUrl + '/api/UserUploadAutomation/UploadPostedFile';
                        return [4 /*yield*/, this.http.post(apiUrl, formData, options)
                                .catch(this.httpService.handleError).toPromise()
                                .then(function (res) {
                                var data = res.json();
                                _this._statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this._strUserUploadPath = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    _this.trInputFields = false;
                                    return;
                                }
                            })];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        ex_2 = _a.sent();
                        this.trInputFields = false;
                        this.clientErrorMsg(ex_2, "onLoadNowClick");
                        return [2 /*return*/];
                    case 9:
                        if (!this.chkOrgGroup) return [3 /*break*/, 13];
                        this.HdnProfileUplaoded = 'O';
                        if (!!this.validateFileName(this.orgGroupSelectedFile)) return [3 /*break*/, 10];
                        this.trInputFields = false;
                        this.chkOrgGroup = false;
                        this.profileSelectedFile = '';
                        this.userSelectedFile = '';
                        this.orgGroupSelectedFile = '';
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Not a Valid File Name' });
                        return [2 /*return*/];
                    case 10:
                        _a.trys.push([10, 12, , 13]);
                        formData = new FormData();
                        formData.append('uploadFile', this.orgGroupPostedFiles[0]);
                        formData.append('fileName', 'Org_Upload' + this.getISODateTime());
                        headers = new http_1.Headers();
                        headers.append('Authorization', 'bearer');
                        headers.append('enctype', 'multipart/form-data');
                        options = new http_1.RequestOptions({ headers: headers });
                        apiUrl = this.httpService.BaseUrl + '/api/UserUploadAutomation/UploadPostedFile';
                        return [4 /*yield*/, this.http.post(apiUrl, formData, options)
                                .catch(this.httpService.handleError).toPromise()
                                .then(function (res) {
                                var data = res.json();
                                _this._statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this._strOrgGroupUploadPath = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    _this.trInputFields = false;
                                    return;
                                }
                            })];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        ex_3 = _a.sent();
                        this.trInputFields = false;
                        this.clientErrorMsg(ex_3, "onLoadNowClick");
                        return [2 /*return*/];
                    case 13:
                        if (!this.chkProfile) return [3 /*break*/, 17];
                        this.HdnProfileUplaoded = 'P';
                        if (!!this.validateFileName(this.profileSelectedFile)) return [3 /*break*/, 14];
                        this.trInputFields = false;
                        this.chkProfile = false;
                        this.profileSelectedFile = '';
                        this.userSelectedFile = '';
                        this.orgGroupSelectedFile = '';
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Not a Valid File Name' });
                        return [2 /*return*/];
                    case 14:
                        _a.trys.push([14, 16, , 17]);
                        formData = new FormData();
                        formData.append('uploadFile', this.profilePostedFiles[0]);
                        formData.append('fileName', 'Profile_Upload' + this.getISODateTime());
                        headers = new http_1.Headers();
                        headers.append('Authorization', 'bearer');
                        headers.append('enctype', 'multipart/form-data');
                        options = new http_1.RequestOptions({ headers: headers });
                        apiUrl = this.httpService.BaseUrl + '/api/UserUploadAutomation/UploadPostedFile';
                        return [4 /*yield*/, this.http.post(apiUrl, formData, options)
                                .catch(this.httpService.handleError).toPromise()
                                .then(function (res) {
                                var data = res.json();
                                _this._statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this._strProfileUploadPath = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    _this.trInputFields = false;
                                    return;
                                }
                            })];
                    case 15:
                        _a.sent();
                        return [3 /*break*/, 17];
                    case 16:
                        ex_4 = _a.sent();
                        this.trInputFields = false;
                        this.clientErrorMsg(ex_4, "onLoadNowClick");
                        return [2 /*return*/];
                    case 17:
                        _a.trys.push([17, 19, , 20]);
                        return [4 /*yield*/, this.userUploadAutoService.doUploadData(this.chkUser, this.chkProfile, this.chkOrgGroup, this._strUserUploadPath, this._strProfileUploadPath, this._strOrgGroupUploadPath, strEnterpriseSystem_1, this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.chkUser = false;
                                _this.chkProfile = false;
                                _this.chkOrgGroup = false;
                                _this.userSelectedFile = '';
                                _this.profileSelectedFile = '';
                                _this.orgGroupSelectedFile = '';
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        try {
                                            if (data.DataDictionary != null) {
                                                _this.dsUploadData = data.DataDictionary;
                                                _this.dsUserdata = data.DataDictionary[AtParEnums_1.DataSet_Type[AtParEnums_1.DataSet_Type.USER]];
                                                _this.dsProfiledata = data.DataDictionary[AtParEnums_1.DataSet_Type[AtParEnums_1.DataSet_Type.PROFILE]];
                                                _this.dsOrgGroupdata = data.DataDictionary[AtParEnums_1.DataSet_Type[AtParEnums_1.DataSet_Type.ORG]];
                                            }
                                            else {
                                                _this.trInputFields = false;
                                                return;
                                            }
                                        }
                                        catch (ex) {
                                            _this.trInputFields = false;
                                            _this.clientErrorMsg(ex, "onLoadNowClick");
                                            return;
                                        }
                                        break;
                                    }
                                }
                                if (data.StatType == AtParEnums_1.StatusType.Success) {
                                    if (_this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.SUMMARY]] != null && _this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.SUMMARY]] != undefined) {
                                        _this.lblTotalNoOfRec = _this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.TOTAL_REC_CNT]];
                                        _this.lblSuccessCnt = _this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.SUCCESS_CNT]];
                                        _this.lblFailureCnt = _this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.FAILURE_CNT]];
                                        _this.lblAddedNoOfRec = _this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.ADDED_CNT]];
                                        _this.lblUpdatedNoOfRec = _this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.UPDATED_CNT]];
                                        _this._blnUserDataExists = true;
                                    }
                                    if (_this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.SUMMARY]] != null && _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.SUMMARY]] != undefined) {
                                        _this.lblProfileTotalNoOfRec = _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.TOTAL_REC_CNT]];
                                        _this.lblProfileSuccessCnt = _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.SUCCESS_CNT]];
                                        _this.lblProfileFailureCnt = _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.FAILURE_CNT]];
                                        _this.lblProfileAddedNoOfRec = _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.ADDED_CNT]];
                                        _this.lblprofileUpdatedNoOfRec = _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.UPDATED_CNT]];
                                        _this._blnProfileDataExists = true;
                                    }
                                    if (_this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.SUMMARY]] != null && _this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.SUMMARY]] != undefined) {
                                        _this.lblOrgTotalNoOfRec = _this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.TOTAL_REC_CNT]];
                                        _this.lblOrgSuccessCnt = _this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.SUCCESS_CNT]];
                                        _this.lblOrgFailureCnt = _this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.FAILURE_CNT]];
                                        _this.lblOrgAddedNoOfRec = _this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.ADDED_CNT]];
                                        _this.lblOrgUpdatedNoOfRec = _this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.UPDATED_CNT]];
                                        _this.lblOrgWarningCnt = _this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.SUMMARY]][0][AtParEnums_1.Enum_Upload_Summary[AtParEnums_1.Enum_Upload_Summary.WARNING_CNT]];
                                        _this._blnOrgDataExists = true;
                                    }
                                    if (_this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.UserErrorDataFields.toString()]] != null && _this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.UserErrorDataHeaders.toString()]] != null) {
                                        var userErrDataColumnHeader = [];
                                        _this.userErrDataHeaders = _this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.UserErrorDataHeaders.toString()]];
                                        _this.userErrDataFields = _this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.UserErrorDataFields.toString()]];
                                        if (_this.userErrDataHeaders.length != null) {
                                            _this.userErrDataTableWidth = (180 * _this.userErrDataHeaders.length) + 5 + 'px';
                                            for (var i = 0; i < _this.userErrDataHeaders.length; i++) {
                                                userErrDataColumnHeader = [];
                                                userErrDataColumnHeader.push(_this.userErrDataFields[i]);
                                                userErrDataColumnHeader.push(_this.userErrDataHeaders[i]);
                                                _this.lstUserErrDataColumnHeaders.push(userErrDataColumnHeader);
                                            }
                                            _this.lstUserErrData = _this.dsUserdata[AtParEnums_1.Enum_UserData[AtParEnums_1.Enum_UserData.UserErrorData.toString()]];
                                        }
                                    }
                                    if (_this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.OrgGroupErrorDataFields.toString()]] != null && _this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.OrgGroupErrorDataHeaders.toString()]] != null) {
                                        var orgGrpErrDataColumnHeader = [];
                                        _this.orgGrpErrDataHeaders = _this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.OrgGroupErrorDataHeaders.toString()]];
                                        _this.orgGrprErrDataFields = _this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.OrgGroupErrorDataFields.toString()]];
                                        if (_this.orgGrpErrDataHeaders.length != null) {
                                            if (_this.orgGrpErrDataHeaders.filter(function (x) { return x == 'ERROR_TYPE'; }).length > 0) {
                                                var header = _this.orgGrpErrDataHeaders.filter(function (x) { return x == 'ERROR_TYPE'; });
                                                var index = _this.orgGrpErrDataHeaders.indexOf(_this.orgGrpErrDataHeaders.filter(function (x) { return x == 'ERROR_TYPE'; })[0]);
                                                if (index !== -1) {
                                                    _this.orgGrpErrDataHeaders.splice(index, 1);
                                                }
                                            }
                                            if (_this.orgGrprErrDataFields.filter(function (x) { return x == 'ERROR_TYPE'; }).length > 0) {
                                                var index = _this.orgGrprErrDataFields.indexOf(_this.orgGrprErrDataFields.filter(function (x) { return x == 'ERROR_TYPE'; })[0]);
                                                if (index !== -1) {
                                                    _this.orgGrprErrDataFields.splice(index, 1);
                                                }
                                            }
                                            _this.orgGroupErrDataTableWidth = (180 * _this.orgGrpErrDataHeaders.length) + 5 + 'px';
                                            for (var i = 0; i < _this.orgGrpErrDataHeaders.length; i++) {
                                                orgGrpErrDataColumnHeader = [];
                                                orgGrpErrDataColumnHeader.push(_this.orgGrprErrDataFields[i]);
                                                orgGrpErrDataColumnHeader.push(_this.orgGrpErrDataHeaders[i]);
                                                _this.lstOrgGroupErrDataColumnHeaders.push(orgGrpErrDataColumnHeader);
                                            }
                                            _this.lstOrgGroupErrData = _this.dsOrgGroupdata[AtParEnums_1.Enum_OrgGroupData[AtParEnums_1.Enum_OrgGroupData.OrgGroupErrorData.toString()]];
                                        }
                                    }
                                    if (_this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileMenusErrorDataFields.toString()]] != null && _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileMenusErrorDataHeaders.toString()]] != null) {
                                        var profileMenusErrDataColumnHeader = [];
                                        _this.profileMenusErrDataHeaders = _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileMenusErrorDataHeaders.toString()]];
                                        _this.profileMenusErrDataFields = _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileMenusErrorDataFields.toString()]];
                                        if (_this.profileMenusErrDataHeaders.length != null) {
                                            for (var i = 0; i < _this.profileMenusErrDataHeaders.length; i++) {
                                                profileMenusErrDataColumnHeader = [];
                                                profileMenusErrDataColumnHeader.push(_this.profileMenusErrDataFields[i]);
                                                profileMenusErrDataColumnHeader.push(_this.profileMenusErrDataHeaders[i]);
                                                _this.lstProfileMenusErrDataColumnHeaders.push(profileMenusErrDataColumnHeader);
                                            }
                                            _this.lstProfileMenusErrData = _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileMenusErrorData.toString()]];
                                        }
                                    }
                                    if (_this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileParametersErrorDataFields.toString()]] != null && _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileParametersErrorDataHeaders.toString()]] != null) {
                                        var profileParamErrDataColumnHeader = [];
                                        _this.profileParamErrDataHeaders = _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileParametersErrorDataHeaders.toString()]];
                                        _this.profileParamErrDataFields = _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileParametersErrorDataFields.toString()]];
                                        if (_this.profileParamErrDataHeaders.length != null) {
                                            for (var i = 0; i < _this.profileParamErrDataHeaders.length; i++) {
                                                profileParamErrDataColumnHeader = [];
                                                profileParamErrDataColumnHeader.push(_this.profileParamErrDataFields[i]);
                                                profileParamErrDataColumnHeader.push(_this.profileParamErrDataHeaders[i]);
                                                _this.lstprofileParametersErrDataColumnHeaders.push(profileParamErrDataColumnHeader);
                                            }
                                            _this.lstprofileParametersErrData = _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileParametersErrorData.toString()]];
                                        }
                                    }
                                    if (_this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileScreendisplayErrorDataFields.toString()]] != null && _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileScreendisplayErrorDataHeaders.toString()]] != null) {
                                        var profileScrErrDataColumnHeader = [];
                                        _this.profileScrErrDataHeaders = _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileScreendisplayErrorDataHeaders.toString()]];
                                        _this.profileScrErrDataFields = _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileScreendisplayErrorDataFields.toString()]];
                                        if (_this.profileScrErrDataHeaders.length != null) {
                                            for (var i = 0; i < _this.profileScrErrDataHeaders.length; i++) {
                                                profileScrErrDataColumnHeader = [];
                                                profileScrErrDataColumnHeader.push(_this.profileScrErrDataFields[i]);
                                                profileScrErrDataColumnHeader.push(_this.profileScrErrDataHeaders[i]);
                                                _this.lstprofileScreendisplayErrDataColumnHeaders.push(profileScrErrDataColumnHeader);
                                            }
                                            _this.lstprofileScreendisplayErrData = _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileScreendisplayErrorData.toString()]];
                                        }
                                    }
                                    if (_this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileTemplateRefErrorDataFields.toString()]] != null && _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileTemplateRefErrorDataHeaders.toString()]] != null) {
                                        var profileTempRefErrDataColumnHeader = [];
                                        _this.profileTemprefErrDataHeaders = _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileTemplateRefErrorDataHeaders.toString()]];
                                        _this.profileTempRefErrDataFields = _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileTemplateRefErrorDataFields.toString()]];
                                        if (_this.profileTemprefErrDataHeaders.length != null) {
                                            if (_this.profileTemprefErrDataHeaders.filter(function (x) { return x == 'STATUS_CODE'; }).length > 0) {
                                                var index = _this.profileTemprefErrDataHeaders.indexOf(_this.profileTemprefErrDataHeaders.filter(function (x) { return x == 'STATUS_CODE'; })[0]);
                                                if (index !== -1) {
                                                    _this.profileTemprefErrDataHeaders.splice(index, 1);
                                                }
                                            }
                                            if (_this.profileTempRefErrDataFields.filter(function (x) { return x == 'STATUS_CODE'; }).length > 0) {
                                                var index = _this.profileTempRefErrDataFields.indexOf(_this.profileTempRefErrDataFields.filter(function (x) { return x == 'STATUS_CODE'; })[0]);
                                                if (index !== -1) {
                                                    _this.profileTempRefErrDataFields.splice(index, 1);
                                                }
                                            }
                                            _this.profileErrDataTableWidth = (180 * _this.profileTemprefErrDataHeaders.length) + 5 + 'px';
                                            for (var i = 0; i < _this.profileTemprefErrDataHeaders.length; i++) {
                                                profileTempRefErrDataColumnHeader = [];
                                                profileTempRefErrDataColumnHeader.push(_this.profileTempRefErrDataFields[i]);
                                                profileTempRefErrDataColumnHeader.push(_this.profileTemprefErrDataHeaders[i]);
                                                _this.lstprofileTemplateRefErrDataColumnHeaders.push(profileTempRefErrDataColumnHeader);
                                            }
                                            _this.lstprofileTemplateRefErrData = _this.dsProfiledata[AtParEnums_1.Enum_ProfileData[AtParEnums_1.Enum_ProfileData.ProfileTemplateRefErrorData.toString()]];
                                        }
                                    }
                                    if (_this._blnUserDataExists && _this._blnProfileDataExists && _this._blnOrgDataExists) {
                                        if ((_this.lblFailureCnt > 0) &&
                                            ((_this.lblOrgFailureCnt > 0) || (_this.lblOrgWarningCnt > 0)) &&
                                            ((_this.lblProfileFailureCnt > 0))) {
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Error\/Warnings in Uploading User,Org Group and profile. Please check the table below for error message' });
                                            _this.tblGrd = true;
                                            _this.tblOrgGrd = true;
                                            _this.tblProfileGrd = true;
                                            _this.dgridErrorDtls = true;
                                            _this.dgridOrgErrorDtls = true;
                                            _this.dgridProfileErrorDtls = true;
                                            if (_this.lstProfileMenusErrData.length > 0) {
                                                _this.dgridProfileMenuErrorDtls = true;
                                            }
                                            if (_this.lstprofileScreendisplayErrData.length > 0) {
                                                _this.dgridProfileScreenDisplayErrorDtls = true;
                                            }
                                            if (_this.lstprofileParametersErrData.length > 0) {
                                                _this.dgridProfileParametersErrorDtls = true;
                                            }
                                            _this.tdOptions = true;
                                            sessionStorage.setItem('dsUserdata', JSON.stringify(_this.dsUserdata));
                                            sessionStorage.setItem('dsOrgGroupdata', JSON.stringify(_this.dsOrgGroupdata));
                                            sessionStorage.setItem('dsProfiledata', JSON.stringify(_this.dsProfiledata));
                                            return;
                                        }
                                    }
                                    if (_this._blnUserDataExists) {
                                        if (_this.lblFailureCnt > 0) {
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Error in Uploading User data. Please check the table below for error message' });
                                            _this.tblGrd = true;
                                            if (_this._blnOrgDataExists) {
                                                _this.tblOrgGrd = true;
                                            }
                                            _this.dgridErrorDtls = true;
                                            _this.tdOptions = true;
                                            sessionStorage.setItem('dsUserdata', JSON.stringify(_this.dsUserdata));
                                            sessionStorage.setItem('dsOrgGroupdata', JSON.stringify(_this.dsOrgGroupdata));
                                            return;
                                        }
                                    }
                                    if (_this._blnOrgDataExists) {
                                        if (_this.lblOrgFailureCnt > 0 || _this.lblOrgWarningCnt > 0) {
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Error\/Warnings in Uploading Org Group. Please check the table below for error message' });
                                            _this.tblOrgGrd = true;
                                            if (_this._blnUserDataExists) {
                                                _this.tblGrd = true;
                                            }
                                            _this.dgridOrgErrorDtls = true;
                                            _this.tdOptions = true;
                                            sessionStorage.setItem('dsUserdata', JSON.stringify(_this.dsUserdata));
                                            sessionStorage.setItem('dsOrgGroupdata', JSON.stringify(_this.dsOrgGroupdata));
                                            return;
                                        }
                                    }
                                    if (_this._blnProfileDataExists) {
                                        try {
                                            if (_this.lblProfileFailureCnt > 0) {
                                                _this.msgs = [];
                                                _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Error in Uploading Profile. Please check the table below for error message' });
                                                _this.tblProfileGrd = true;
                                                if (_this._blnOrgDataExists && _this._blnUserDataExists) {
                                                    _this.tblGrd = true;
                                                    _this.tblOrgGrd = true;
                                                }
                                                _this.dgridProfileErrorDtls = true;
                                                if (_this.lstProfileMenusErrData.length > 0) {
                                                    _this.tdMenuError = true;
                                                    _this.tdEmptyRowMenu = true;
                                                    _this.dgridProfileMenuErrorDtls = true;
                                                }
                                                if (_this.lstprofileScreendisplayErrData.length > 0) {
                                                    _this.tdScreenDisplay = true;
                                                    _this.tdEmptyRowScreen = true;
                                                    _this.dgridProfileScreenDisplayErrorDtls = true;
                                                }
                                                if (_this.lstprofileParametersErrData.length > 0) {
                                                    _this.tdParameters = true;
                                                    _this.tdEmptyRowParams = true;
                                                    _this.dgridProfileParametersErrorDtls = true;
                                                }
                                                _this.tdOptions = true;
                                                sessionStorage.setItem('dsUserdata', JSON.stringify(_this.dsUserdata));
                                                sessionStorage.setItem('dsOrgGroupdata', JSON.stringify(_this.dsOrgGroupdata));
                                                sessionStorage.setItem('dsProfiledata', JSON.stringify(_this.dsProfiledata));
                                                return;
                                            }
                                        }
                                        catch (ex) {
                                            _this.clientErrorMsg(ex, "onLoadNowClick");
                                        }
                                    }
                                    try {
                                        if (_this._blnUserDataExists && _this._blnProfileDataExists && _this._blnOrgDataExists) {
                                            if (_this.lstUserErrData.length > 0 && _this.lstOrgGroupErrData.length > 0 && _this.lstprofileTemplateRefErrData.length > 0) {
                                                _this.msgs = [];
                                                _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'User, Profile and Org Group Data Uploaded Successfully' });
                                                _this.tblGrd = true;
                                                _this.tblOrgGrd = true;
                                                _this.tblProfileGrd = true;
                                                return;
                                            }
                                        }
                                        if (_this._blnUserDataExists) {
                                            if (_this.lstUserErrData.length > 0) {
                                                _this.msgs = [];
                                                _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'User Data Uploaded Successfully' });
                                                _this.tblGrd = true;
                                                return;
                                            }
                                        }
                                        if (_this._blnOrgDataExists) {
                                            if (_this.lstOrgGroupErrData.length > 0) {
                                                _this.msgs = [];
                                                _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Org Group Data Uploaded Successfully' });
                                                _this.tblOrgGrd = true;
                                                return;
                                            }
                                        }
                                        if (_this._blnProfileDataExists) {
                                            if (_this.lstprofileTemplateRefErrData.length > 0) {
                                                _this.msgs = [];
                                                _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Profile Data Uploaded Successfully' });
                                                _this.tblProfileGrd = true;
                                                _this.dgridProfileErrorDtls = false;
                                                _this.dgridProfileMenuErrorDtls = false;
                                                _this.dgridProfileParametersErrorDtls = false;
                                                _this.dgridProfileScreenDisplayErrorDtls = false;
                                                _this.tdMenuError = false;
                                                _this.tdScreenDisplay = false;
                                                _this.tdParameters = false;
                                                _this.tdEmptyRowMenu = false;
                                                _this.tdEmptyRowScreen = false;
                                                _this.tdEmptyRowParams = false;
                                                return;
                                            }
                                        }
                                    }
                                    catch (ex) {
                                        _this.clientErrorMsg(ex, "onLoadNowClick");
                                    }
                                }
                                else {
                                    if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_INVALIDFILE) {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        return;
                                    }
                                    else if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Failed To Load Data' });
                                        return;
                                    }
                                    else {
                                        if (_this.lstUserErrData.length > 0 && _this.lstprofileTemplateRefErrData.length > 0 && _this.lstOrgGroupErrData.length > 0) {
                                            if ((_this.lstUserErrData[0]['STATUS_CODE'] == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND)
                                                && (_this.lstOrgGroupErrData[0]['STATUS_CODE'] == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND)
                                                && (_this.lstprofileTemplateRefErrData[0]['STATUS_CODE'] == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND)) {
                                                _this.msgs = [];
                                                _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: 'No Data Found to User Profile and Org Group Upload' });
                                                return;
                                            }
                                        }
                                        else {
                                            if (_this.lstUserErrData.length > 0) {
                                                if (_this.lstUserErrData[0]['STATUS_CODE'] == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                                    _this.msgs = [];
                                                    _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: 'No Data Found to User Upload' });
                                                    return;
                                                }
                                            }
                                            if (_this.lstOrgGroupErrData.length > 0) {
                                                if (_this.lstOrgGroupErrData[0]['STATUS_CODE'] == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                                    _this.msgs = [];
                                                    _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: 'No Data Found to Org Group Upload' });
                                                    return;
                                                }
                                            }
                                            if (_this.lstprofileTemplateRefErrData.length > 0) {
                                                if (_this.lstprofileTemplateRefErrData[0]['STATUS_CODE'] == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                                    _this.msgs = [];
                                                    _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: 'No Data Found to Profile Upload' });
                                                    return;
                                                }
                                            }
                                        }
                                        if (data.StatType.toString() != AtParEnums_1.StatusType.Success.toString()) {
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error' });
                                            _this.tblGrd = true;
                                            _this.tblOrgGrd = true;
                                            _this.tblProfileGrd = true;
                                            _this.dgridErrorDtls = true;
                                            _this.dgridOrgErrorDtls = true;
                                            _this.dgridProfileErrorDtls = true;
                                            if (_this.lstProfileMenusErrData.length > 0) {
                                                _this.dgridProfileMenuErrorDtls = true;
                                            }
                                            if (_this.lstprofileParametersErrData.length > 0) {
                                                _this.dgridProfileParametersErrorDtls = true;
                                            }
                                            if (_this.lstprofileScreendisplayErrData.length > 0) {
                                                _this.dgridProfileScreenDisplayErrorDtls = true;
                                            }
                                            _this.tdOptions = true;
                                            sessionStorage.setItem('dsUserdata', JSON.stringify(_this.dsUserdata));
                                            sessionStorage.setItem('dsOrgGroupdata', JSON.stringify(_this.dsOrgGroupdata));
                                            sessionStorage.setItem('dsProfiledata', JSON.stringify(_this.dsProfiledata));
                                            return;
                                        }
                                    }
                                }
                            })];
                    case 18:
                        _a.sent();
                        return [3 /*break*/, 20];
                    case 19:
                        ex_5 = _a.sent();
                        this.chkUser = false;
                        this.chkOrgGroup = false;
                        this.chkProfile = false;
                        this.trInputFields = false;
                        this.clientErrorMsg(ex_5, "onLoadNowClick");
                        return [2 /*return*/];
                    case 20: return [3 /*break*/, 22];
                    case 21:
                        this.trInputFields = false;
                        this.chkUser = false;
                        this.chkOrgGroup = false;
                        this.chkProfile = false;
                        this.userSelectedFile = '';
                        this.profileSelectedFile = '';
                        this.orgGroupSelectedFile = '';
                        this.userPostedFiles = null;
                        this.orgGroupPostedFiles = null;
                        this.profilePostedFiles = null;
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select the respective switch for the file to upload' });
                        return [2 /*return*/];
                    case 22: return [3 /*break*/, 25];
                    case 23:
                        ex_6 = _a.sent();
                        this.trInputFields = false;
                        this.chkUser = false;
                        this.chkOrgGroup = false;
                        this.chkProfile = false;
                        this.clientErrorMsg(ex_6, "onLoadNowClick");
                        return [2 /*return*/];
                    case 24:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 25: return [2 /*return*/];
                }
            });
        });
    };
    UserUploadAutomationComponent.prototype.onExportToExcelClick = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.prepareExcelSheet()];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null && html != undefined) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "UserUploadAutomationDetails.xls");
                            //var ua = window.navigator.userAgent;
                            //var msie = ua.indexOf("MSIE ");
                            ////If Internet Explorer
                            //if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                            //    this._statusCode = "-1";
                            //    let folderName: string = '';
                            //    await this.commenService.exportToExcel(html, "User_Upload_Automation_", "UserUploadAutomationDetails")
                            //        .then((res: Response) => {
                            //            let data = res.json();
                            //            this._statusCode = data.StatusCode;
                            //            if (this._statusCode == AtparStatusCodes.ATPAR_OK.toString()) {
                            //                folderName = data.DataVariable.toString();
                            //                var filename = this.httpService.BaseUrl + '/Uploaded/' + folderName + '/UserUploadAutomationDetails.xls';
                            //                var query = '?download';
                            //                window.open(filename + query, "_self");
                            //            }
                            //            else {
                            //                this.msgs = [];
                            //                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error.' });
                            //            }
                            //        });
                            //    await this.commenService.deleteExcel(folderName, "UserUploadAutomationDetails")
                            //        .then((res: Response) => {
                            //        });
                            //}
                            //else {
                            //    var a = document.createElement('a');
                            //    var data_type = 'data:application/vnd.ms-excel';
                            //    html = html.replace(/ /g, '%20');
                            //    a.href = data_type + ', ' + html;
                            //    a.download = 'UserUploadAutomationDetails.xls';
                            //    a.setAttribute('target', '_self');
                            //    a.click();
                            //    e.preventDefault();
                            //    //window.open('data:application/vnd.ms-excel;filename:excelexport,' + encodeURIComponent(html));
                            //}
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "onExportToExcelClick");
                        return [2 /*return*/];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserUploadAutomationComponent.prototype.prepareExcelSheet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var html, imgserverPath, i, i, j, i, i, j, i, i, j, i, i, j, i, i, j, i, i, j, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        html = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        imgserverPath = '';
                        return [4 /*yield*/, this.commenService.getServerIP()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ipAddress = data.DataVariable.toString();
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
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    html = '';
                                    return html;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.commenService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.msgs = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
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
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    html = '';
                                    return html;
                                }
                            })];
                    case 3:
                        _a.sent();
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        html = "<table align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>" +
                            "<tr width='100%'><td align=left  width='100%' height=63 nowrap style='background-color:#ff9834' ><img  height=63 src=" + imgserverPath + "logo.jpg title=AtPar Version 2.8><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></tr>" +
                            "<tr><td height=27  vAlign=bottom width=100% align=left ><font size=1 style='" + "" + "'COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt'" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></td>" +
                            "</tr><tr><td width=100%><table cellpadding=3 cellspacing = 1 align=left width=99% border=0><tr><td colspan=2></td></tr>" +
                            "<tr><td colspan=2 align=left><span class=c2>User Upload Automation Details </b></span></td></tr>" +
                            "<tr><td colspan=2 align=left>&nbsp;</td></tr>" +
                            "<tr><td colspan=2 align=left>&nbsp;</td></tr>";
                        if (this.HdnProfileUplaoded == 'U') {
                            html += "<tr><td align=left nowrap width='50%'><span class=c2>The number of records present in the input file </span></td><td align=left width='50%'><span class=c2>" + this.lblTotalNoOfRec + "</span></td></tr>" +
                                "<tr><td align=left  nowrap width='50%'><span class=c2>The number of records loaded successfully  </span></td><td width='50%' align=left><span class=c2>" + this.lblSuccessCnt + "</span></td></tr>" +
                                "<tr><td align=left nowrap width='50%'><span class=c2>The number of records written to error file  </span></td><td width='50%' align=left><span class=c2>" + this.lblFailureCnt + "</span></td></tr>" +
                                "<tr><td align=left  nowrap width='50%'><span class=c2>The number of Users added </span></td><td width='50%' align=left><span class=c2>" + this.lblAddedNoOfRec + "</span></td></tr>" +
                                "<tr><td align=left nowrap width='50%'><span class=c2>The number of Users updated </span></td><td width='50%' align=left><span class=c2>" + this.lblUpdatedNoOfRec + "</span></td></tr>" +
                                "<tr><td colspan=2 nowrap width='100%' align=left>&nbsp;</td></tr>" +
                                "<tr><td colspan=2 nowrap width='100%' align=left>&nbsp;</td></tr>" +
                                "</table></td></tr> " +
                                "<tr><td>" +
                                "<table cellpadding=3 cellspacing = 1 align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>" +
                                //'sbHtmlString.Append("<tr bgcolor=white><td colspan=7 align=left><b></b></td></tr>")
                                "<tr bgcolor=#d3d3d3>";
                            for (i = 0; i < this.lstUserErrDataColumnHeaders.length; i++) {
                                html += "<td align=left nowrap><span class=c3><b>" + this.lstUserErrDataColumnHeaders[i][1] + "</b></span></td>";
                            }
                            html += "</tr>";
                            for (i = 0; i < this.lstUserErrData.length; i++) {
                                html += "<tr>";
                                for (j = 0; j < this.lstUserErrDataColumnHeaders.length; j++) {
                                    html += "<td align=left ><span class=c3>" + this.lstUserErrData[i][this.lstUserErrDataColumnHeaders[j][0]] + "</span></td>";
                                }
                                html += "</tr>";
                            }
                            html += "</table>";
                        }
                        if (this.HdnProfileUplaoded == 'O') {
                            html += "<tr><td align=left nowrap><span class=c2>The number of records present in the input file </span></td><td align=left><span class=c2>" + this.lblOrgTotalNoOfRec + "</span></td></tr>" +
                                "<tr><td align=left nowrap><span class=c2>The number of records loaded successfully  </span></td><td align=left><span class=c2>" + this.lblOrgSuccessCnt + "</span></td></tr>" +
                                "<tr><td align=left nowrap><span class=c2>The number of records written to error file  </span></td><td align=left><span class=c2>" + this.lblOrgFailureCnt + "</span></td></tr>" +
                                "<tr><td align=left nowrap><span class=c2>The number of warnings written to error file  </span></td><td align=left><span class=c2>" + this.lblOrgWarningCnt + "</span></td></tr>" +
                                "<tr><td align=left nowrap><span class=c2>The number of Org Groups added  </span></td><td align=left><span class=c2>" + this.lblOrgAddedNoOfRec + "</span></td></tr>" +
                                "<tr><td align=left nowrap><span class=c2>The number of Org Groups updated </span></td><td align=left><span class=c2>" + this.lblOrgUpdatedNoOfRec + "</span></td></tr>" +
                                "<tr><td colspan=2 align=left>&nbsp;</td></tr>" +
                                "<tr><td colspan=2 align=left>&nbsp;</td></tr>" +
                                "</table></td></tr> " +
                                "<tr><td>" +
                                "<table cellpadding=3 cellspacing = 1 align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>" +
                                //'sbHtmlString.Append("<tr bgcolor=white><td colspan=7 align=left><b></b></td></tr>")
                                "<tr bgcolor=#d3d3d3>";
                            for (i = 0; i < this.lstOrgGroupErrDataColumnHeaders.length; i++) {
                                html += "<td align=left nowrap><span class=c3><b>" + this.lstOrgGroupErrDataColumnHeaders[i][1] + "</b></span></td>";
                            }
                            html += "</tr>";
                            for (i = 0; i < this.lstOrgGroupErrData.length; i++) {
                                html += "<tr>";
                                for (j = 0; j < this.lstOrgGroupErrDataColumnHeaders.length; j++) {
                                    html += "<td align=left ><span class=c3>" + this.lstOrgGroupErrData[i][this.lstOrgGroupErrDataColumnHeaders[j][1]] + "</span></td>";
                                }
                                html += "</tr>";
                            }
                            html += "</table>";
                        }
                        if (this.HdnProfileUplaoded == 'P') {
                            html += "<tr><td align=left nowrap><span class=c2>The number of records present in the input file </span></td><td align=left><span class=c2>" + this.lblProfileTotalNoOfRec + "</span></td></tr>" +
                                "<tr><td align=left nowrap><span class=c2>The number of records loaded successfully  </span></td><td align=left><span class=c2>" + this.lblProfileSuccessCnt + "</span></td></tr>" +
                                "<tr><td align=left nowrap><span class=c2>The number of records written to error file  </span></td><td align=left><span class=c2>" + this.lblProfileFailureCnt + "</span></td></tr>" +
                                "<tr><td align=left nowrap><span class=c2>The number of Profiles added </span></td><td align=left><span class=c2>" + this.lblProfileAddedNoOfRec + "</span></td></tr>" +
                                "<tr><td align=left nowrap><span class=c2>The number of Profiles updated </span></td><td align=left><span class=c2>" + this.lblprofileUpdatedNoOfRec + "</span></td></tr>" +
                                "<tr><td colspan=2 align=left>&nbsp;</td></tr>" +
                                "<tr><td colspan=2 align=left>&nbsp;</td></tr>" +
                                "</table></td></tr> " +
                                "<tr><td>";
                            if (this.lstprofileTemplateRefErrData.length > 0) {
                                html += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>" +
                                    "<tr bgcolor=#d3d3d3>";
                                for (i = 0; i < this.lstprofileTemplateRefErrDataColumnHeaders.length; i++) {
                                    html += "<td align=left nowrap><span class=c3><b>" + this.lstprofileTemplateRefErrDataColumnHeaders[i][1] + "</b></span></td>";
                                }
                                html += "</tr>";
                                for (i = 0; i < this.lstprofileTemplateRefErrData.length; i++) {
                                    html += "<tr>";
                                    for (j = 0; j < this.lstprofileTemplateRefErrDataColumnHeaders.length; j++) {
                                        html += "<td align=left ><span class=c3>" + this.lstprofileTemplateRefErrData[i][this.lstprofileTemplateRefErrDataColumnHeaders[j][0]] + "</span></td>";
                                    }
                                    html += "</tr>";
                                }
                                html += "</table>";
                            }
                            html += "&nbsp;</td></tr>" +
                                "<tr><td>";
                            if (this.lstProfileMenusErrData.length > 0) {
                                html += "&nbsp;</td></tr>" +
                                    "<tr><td  align=left>MenuTemplate Error table</td></tr>" +
                                    "<tr><td align=left>&nbsp;</td></tr>" +
                                    "<tr><td>" +
                                    "<table cellpadding=3 cellspacing = 1 align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>" +
                                    "<tr bgcolor=#d3d3d3>";
                                for (i = 0; i < this.lstProfileMenusErrDataColumnHeaders.length; i++) {
                                    html += "<td align=left nowrap><span class=c3><b>" + this.lstProfileMenusErrDataColumnHeaders[i][1] + "</b></span></td>";
                                }
                                html += "</tr>";
                                for (i = 0; i < this.lstProfileMenusErrData.length; i++) {
                                    html += "<tr>";
                                    for (j = 0; j < this.lstProfileMenusErrDataColumnHeaders.length; j++) {
                                        html += "<td align=left ><span class=c3>" + this.lstProfileMenusErrData[i][this.lstProfileMenusErrDataColumnHeaders[j][0]] + "</span></td>";
                                    }
                                    html += "</tr>";
                                }
                                html += "</table>";
                            }
                            html += "&nbsp;</td></tr>" +
                                "<tr><td>";
                            if (this.lstprofileScreendisplayErrData.length > 0) {
                                html += "&nbsp;</td></tr>" +
                                    "<tr><td  align=left>ScreenDisplayTemplate Error table</td></tr>" +
                                    "<tr><td align=left>&nbsp;</td></tr>" +
                                    "<tr><td>" +
                                    "<table cellpadding=3 cellspacing = 1 align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>" +
                                    "<tr bgcolor=#d3d3d3>";
                                for (i = 0; i < this.lstprofileScreendisplayErrDataColumnHeaders.length; i++) {
                                    html += "<td align=left nowrap><span class=c3><b>" + this.lstprofileScreendisplayErrDataColumnHeaders[i][1] + "</b></span></td>";
                                }
                                html += "</tr>";
                                for (i = 0; i < this.lstprofileScreendisplayErrData.length; i++) {
                                    html += "<tr>";
                                    for (j = 0; j < this.lstprofileScreendisplayErrDataColumnHeaders.length; j++) {
                                        html += "<td align=left ><span class=c3>" + this.lstprofileScreendisplayErrData[i][this.lstprofileScreendisplayErrDataColumnHeaders[j][0]] + "</span></td>";
                                    }
                                    html += "</tr>";
                                }
                                html += "</table>";
                            }
                            if (this.lstprofileParametersErrData.length > 0) {
                                html += "&nbsp;</td></tr>" +
                                    "<tr><td  align=left>ParameterTemplate Error table</td></tr>" +
                                    "<tr><td align=left>&nbsp;</td></tr>" +
                                    "<tr><td>" +
                                    "<table cellpadding=3 cellspacing = 1 align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>" +
                                    "<tr bgcolor=#d3d3d3>";
                                for (i = 0; i < this.lstprofileParametersErrDataColumnHeaders.length; i++) {
                                    html += "<td align=left nowrap><span class=c3><b>" + this.lstprofileParametersErrDataColumnHeaders[i][1] + "</b></span></td>";
                                }
                                html += "</tr>";
                                for (i = 0; i < this.lstprofileParametersErrData.length; i++) {
                                    html += "<tr>";
                                    for (j = 0; j < this.lstprofileParametersErrDataColumnHeaders.length; j++) {
                                        html += "<td align=left ><span class=c3>" + this.lstprofileParametersErrData[i][this.lstprofileParametersErrDataColumnHeaders[j][0]] + "</span></td>";
                                    }
                                    html += "</tr>";
                                }
                                html += "</table>";
                            }
                        }
                        html += "</td></tr></table>";
                        return [2 /*return*/, html];
                    case 4:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "prepareExcelSheet");
                        html = '';
                        return [2 /*return*/, html];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserUploadAutomationComponent.prototype.validateFileName = function (pstrFilename) {
        try {
            if (pstrFilename != '') {
                if (pstrFilename.indexOf('.') != -1) {
                    if (pstrFilename.split('.')[1].toUpperCase() == 'xls'.toUpperCase()) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "validateFileName");
            return false;
        }
    };
    UserUploadAutomationComponent.prototype.getISODateTime = function () {
        var s = function (p) {
            return ('' + p).length < 2 ? '0' + p : '' + p;
        };
        var d = new Date();
        return s(d.getMonth() + 1) + s(d.getDate()) + d.getFullYear() + '_' + s(d.getHours()) + s(d.getMinutes()) + s(d.getSeconds());
    };
    UserUploadAutomationComponent.prototype.clientErrorMsg = function (ex, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString(), funName, this.constructor.name);
    };
    UserUploadAutomationComponent.prototype.clearData = function () {
        this.dgridErrorDtls = false;
        this.dgridOrgErrorDtls = false;
        sessionStorage.removeItem('dsUserdata');
        sessionStorage.removeItem('dsOrgGroupdata');
        sessionStorage.removeItem('dsProfiledata');
        this.tblGrd = false;
        this.tblOrgGrd = false;
        this.tblProfileGrd = false;
        this.tdOptions = false;
        this.lblTotalNoOfRec = 0;
        this.lblSuccessCnt = 0;
        this.lblFailureCnt = 0;
        this.lblAddedNoOfRec = 0;
        this.lblUpdatedNoOfRec = 0;
        this.lblOrgTotalNoOfRec = 0;
        this.lblOrgSuccessCnt = 0;
        this.lblOrgFailureCnt = 0;
        this.lblOrgWarningCnt = 0;
        this.lblOrgAddedNoOfRec = 0;
        this.lblOrgUpdatedNoOfRec = 0;
        this.lblProfileTotalNoOfRec = 0;
        this.lblProfileSuccessCnt = 0;
        this.lblProfileFailureCnt = 0;
        this.lblProfileAddedNoOfRec = 0;
        this.lblprofileUpdatedNoOfRec = 0;
        this._statusCode = '';
        this.dsUserdata = [];
        this.dsOrgGroupdata = [];
        this.dsProfiledata = [];
        this.dsUploadData = [];
        this.msgs = [];
        this._blnUserDataExists = false;
        this._blnOrgDataExists = false;
        this._blnProfileDataExists = false;
        this.tdMenuError = false;
        this.tdScreenDisplay = false;
        this.tdParameters = false;
        this.tdEmptyRowMenu = false;
        this.tdEmptyRowScreen = false;
        this.tdEmptyRowParams = false;
        this.dgridProfileErrorDtls = false;
        this.dgridProfileMenuErrorDtls = false;
        this.dgridProfileScreenDisplayErrorDtls = false;
        this.dgridProfileParametersErrorDtls = false;
        this.strERPvalue = '';
        this._strUserUploadPath = '';
        this._strOrgGroupUploadPath = '';
        this._strProfileUploadPath = '';
        this.lstUserErrDataColumnHeaders = [];
        this.lstUserErrData = [];
        this.lstOrgGroupErrDataColumnHeaders = [];
        this.lstOrgGroupErrData = [];
        this.lstProfileMenusErrDataColumnHeaders = [];
        this.lstProfileMenusErrData = [];
        this.lstprofileParametersErrDataColumnHeaders = [];
        this.lstprofileParametersErrData = [];
        this.lstprofileScreendisplayErrDataColumnHeaders = [];
        this.lstprofileScreendisplayErrData = [];
        this.lstprofileTemplateRefErrDataColumnHeaders = [];
        this.lstprofileTemplateRefErrData = [];
        this.userErrDataHeaders = [];
        this.userErrDataFields = [];
        this.orgGrpErrDataHeaders = [];
        this.orgGrprErrDataFields = [];
        this.profileMenusErrDataHeaders = [];
        this.profileMenusErrDataFields = [];
        this.profileParamErrDataHeaders = [];
        this.profileParamErrDataFields = [];
        this.profileScrErrDataHeaders = [];
        this.profileScrErrDataFields = [];
        this.profileTemprefErrDataHeaders = [];
        this.profileTempRefErrDataFields = [];
        this.userErrDataTableWidth = '100%';
        this.orgGroupErrDataTableWidth = '100%';
        this.profileErrDataTableWidth = '100%';
    };
    UserUploadAutomationComponent.prototype.OnDestroy = function () {
        this.dgridErrorDtls = null;
        this.dgridOrgErrorDtls = null;
        sessionStorage.removeItem('dsUserdata');
        sessionStorage.removeItem('dsOrgGroupdata');
        sessionStorage.removeItem('dsProfiledata');
        this.tblGrd = null;
        this.tblOrgGrd = null;
        this.tblProfileGrd = null;
        this.tdOptions = null;
        this.lblTotalNoOfRec = null;
        this.lblSuccessCnt = null;
        this.lblFailureCnt = null;
        this.lblAddedNoOfRec = null;
        this.lblUpdatedNoOfRec = null;
        this.lblOrgTotalNoOfRec = null;
        this.lblOrgSuccessCnt = null;
        this.lblOrgFailureCnt = null;
        this.lblOrgWarningCnt = null;
        this.lblOrgAddedNoOfRec = null;
        this.lblOrgUpdatedNoOfRec = null;
        this.lblProfileTotalNoOfRec = null;
        this.lblProfileSuccessCnt = null;
        this.lblProfileFailureCnt = null;
        this.lblProfileAddedNoOfRec = null;
        this.lblprofileUpdatedNoOfRec = null;
        this._statusCode = '';
        this.dsUserdata = null;
        this.dsOrgGroupdata = null;
        this.dsProfiledata = null;
        this.dsUploadData = null;
        this.msgs = null;
        this._blnUserDataExists = null;
        this._blnOrgDataExists = null;
        this._blnProfileDataExists = null;
        this.tdMenuError = null;
        this.tdScreenDisplay = null;
        this.tdParameters = null;
        this.tdEmptyRowMenu = null;
        this.tdEmptyRowScreen = null;
        this.tdEmptyRowParams = null;
        this.dgridProfileErrorDtls = null;
        this.dgridProfileMenuErrorDtls = null;
        this.dgridProfileScreenDisplayErrorDtls = null;
        this.dgridProfileParametersErrorDtls = null;
        this.trInputFields = null;
        this.strERPvalue = null;
        this._strUserUploadPath = null;
        this._strOrgGroupUploadPath = null;
        this._strProfileUploadPath = null;
        this.lstUserErrDataColumnHeaders = null;
        this.lstUserErrData = null;
        this.lstOrgGroupErrDataColumnHeaders = null;
        this.lstOrgGroupErrData = null;
        this.lstProfileMenusErrDataColumnHeaders = null;
        this.lstProfileMenusErrData = null;
        this.lstprofileParametersErrDataColumnHeaders = null;
        this.lstprofileParametersErrData = null;
        this.lstprofileScreendisplayErrDataColumnHeaders = null;
        this.lstprofileScreendisplayErrData = null;
        this.lstprofileTemplateRefErrDataColumnHeaders = null;
        this.lstprofileTemplateRefErrData = null;
        this.userErrDataHeaders = null;
        this.userErrDataFields = null;
        this.orgGrpErrDataHeaders = null;
        this.orgGrprErrDataFields = null;
        this.profileMenusErrDataHeaders = null;
        this.profileMenusErrDataFields = null;
        this.profileParamErrDataHeaders = null;
        this.profileParamErrDataFields = null;
        this.profileScrErrDataHeaders = null;
        this.profileScrErrDataFields = null;
        this.profileTemprefErrDataHeaders = null;
        this.profileTempRefErrDataFields = null;
        this.userErrDataTableWidth = null;
        this.orgGroupErrDataTableWidth = null;
        this.profileErrDataTableWidth = null;
    };
    UserUploadAutomationComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-user-upload-automation.component.html',
            providers: [
                atpar_user_upload_automation_component_service_1.UserUploadAutomationService,
                atpar_common_service_1.AtParCommonService,
                AtParConstants_1.AtParConstants,
                api_1.ConfirmationService
            ]
        }),
        __metadata("design:paramtypes", [atpar_user_upload_automation_component_service_1.UserUploadAutomationService,
            atpar_common_service_1.AtParCommonService,
            event_spinner_service_1.SpinnerService,
            HttpService_1.HttpService,
            router_1.ActivatedRoute,
            AtParConstants_1.AtParConstants,
            http_1.Http,
            api_1.ConfirmationService])
    ], UserUploadAutomationComponent);
    return UserUploadAutomationComponent;
}());
exports.UserUploadAutomationComponent = UserUploadAutomationComponent;
//# sourceMappingURL=atpar-user-upload-automation.component.js.map