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
var tkit_manage_requestor_services_1 = require("../../app/TrackIT/tkit-manage-requestor.services");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var http_1 = require("@angular/http");
var HttpService_1 = require("../Shared/HttpService");
var router_1 = require("@angular/router");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var routepath_1 = require("../AtPar/Menus/routepath");
var TKIT_REQUESTOR_1 = require("../../app/Entities/TKIT_REQUESTOR");
var CryptoJS = require("crypto-js");
var ManageRequestorModifyComponent = (function () {
    function ManageRequestorModifyComponent(manageRequestorServices, router, spinnerService, route, atParConstant, atParSharedDataService, http, httpService) {
        this.manageRequestorServices = manageRequestorServices;
        this.router = router;
        this.spinnerService = spinnerService;
        this.route = route;
        this.atParConstant = atParConstant;
        this.atParSharedDataService = atParSharedDataService;
        this.http = http;
        this.httpService = httpService;
        this.newItem = new TKIT_REQUESTOR_1.TKIT_REQUESTOR();
        this.lstDepartments = [];
        this.lstLocations = [];
        this.statusType = "";
        this._deviceTokenEntry = [];
        this.msgs = [];
        this.isVisible = false;
        this.isUpdate = false;
        this.loading = true;
        this.showLable = false;
        this.showTextBox = false;
        this.orgGroupData = [];
        this.statusMesssage = "";
        this.Title = "";
        this.visiblePassword = false;
        this.trackItUserSelectedFile = "";
        this.showUploadImage = false;
        this.ddRecordsPerPage = [];
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    ManageRequestorModifyComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.getTrackITAllDepartments();
                        this.getLocations();
                        this.getOrgGroupList();
                        this.getRecordsPerPageddData();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        this.mode = this.atParSharedDataService.storage.mode;
                        if (!(this.mode == (AtParEnums_1.ModeEnum.Add).toString())) return [3 /*break*/, 2];
                        this.showLable = false;
                        this.showTextBox = true;
                        this.newItem = new TKIT_REQUESTOR_1.TKIT_REQUESTOR();
                        this.Title = "Save";
                        this.bindSymbal = "floppy-o";
                        this.newItem.checkStatus = true;
                        this.newItem.STATUS = 'A';
                        this.newItem.RECORDS_PER_PAGE = 10;
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(this.mode == (AtParEnums_1.ModeEnum.Edit).toString())) return [3 /*break*/, 4];
                        this.showLable = true;
                        this.bindSymbal = "check";
                        this.isEditMode = true;
                        this.loading = false;
                        this.showTextBox = false;
                        this.Title = "Update Requestor";
                        this.requestorID = this.atParSharedDataService.storage.requestorID;
                        if (!(this.requestorID != undefined && this.requestorID != null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getRequestorDetails()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ManageRequestorModifyComponent.prototype.getRecordsPerPageddData = function () {
        try {
            for (var i = 10; i <= 100;) {
                this.ddRecordsPerPage.push({ label: i.toString(), value: i.toString() });
                i += 10;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getRecordsPerPageddData");
        }
    };
    ManageRequestorModifyComponent.prototype.onFocusPassword = function () {
        try {
            if (this.newItem.PASSWORD == "undefined") {
                this.visiblePassword = !this.visiblePassword;
            }
            else {
                this.visiblePassword = true;
            }
            this.activeLblPassword = this.visiblePassword ? 'input-disturbed' : 'hide-class';
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onFocusPassword");
        }
    };
    ManageRequestorModifyComponent.prototype.locationChange = function () {
        if (this.newItem.LOCATION_ID != undefined && this.newItem.LOCATION_ID != null && this.newItem.LOCATION_ID != "") {
            this.deliverLocationtatus = 0;
        }
        else {
            this.deliverLocationtatus = 1;
        }
    };
    ManageRequestorModifyComponent.prototype.checkPswdValidation = function () {
        if (this.newItem.PASSWORD == "") {
            this.loading = true;
        }
        else {
            this.loading = false;
        }
    };
    ManageRequestorModifyComponent.prototype.bindModelDataChange = function (event) {
        try {
            if (this.Title == "Update Requestor") {
                this.requestorStatus = 0;
                this.firstNameStatus = 0;
                this.lastNameStatus = 0;
                this.recordsPerPageStatus = 0;
                this.defaultRptDurationStatus = 0;
            }
            if ("txtRequetorId" == event.TextBoxID.toString()) {
                this.requestorStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtFirstName" == event.TextBoxID.toString()) {
                this.firstNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtLastName" == event.TextBoxID.toString()) {
                this.lastNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtMiddleName" == event.TextBoxID.toString()) {
                this.middleNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtEmail" == event.TextBoxID.toString()) {
                this.emailStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtPhone" == event.TextBoxID.toString()) {
                this.phoneStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtFax" == event.TextBoxID.toString()) {
                this.faxStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtPager" == event.TextBoxID.toString()) {
                this.pagerStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("ddlddRecordsPerPage" == event.TextBoxID.toString()) {
                this.recordsPerPageStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtDefaultRptDuration" == event.TextBoxID.toString()) {
                this.defaultRptDurationStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.newItem.PASSWORD == "") {
                this.loading = true;
            }
            else {
                this.loading = false;
            }
            this.btnEnableDisable();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindModelDataChange");
        }
    };
    ManageRequestorModifyComponent.prototype.btnEnableDisable = function () {
        if (this.Title == "Update Requestor") {
            this.requestorStatus = 0;
            this.firstNameStatus = 0;
            this.lastNameStatus = 0;
            this.recordsPerPageStatus = 0;
            this.defaultRptDurationStatus = 0;
        }
        if (this.requestorStatus == 0 && this.newItem.REQUESTOR_ID != "" && this.newItem.REQUESTOR_ID != null && this.newItem.REQUESTOR_ID != undefined
            && this.newItem.PASSWORD != undefined && this.newItem.PASSWORD != null && this.newItem.PASSWORD != ""
            && this.firstNameStatus == 0 && this.newItem.FIRST_NAME != undefined && this.newItem.FIRST_NAME != null && this.newItem.FIRST_NAME != ""
            && this.lastNameStatus == 0 && this.newItem.LAST_NAME !== undefined && this.newItem.LAST_NAME != null && this.newItem.LAST_NAME !== ""
            && this.defaultRptDurationStatus == 0 && this.newItem.DEFAULT_REPORT_DURATION != undefined && this.newItem.DEFAULT_REPORT_DURATION != null && this.newItem.DEFAULT_REPORT_DURATION != 0
            && this.newItem.ORG_GROUP_ID != undefined && this.newItem.ORG_GROUP_ID != null && this.newItem.ORG_GROUP_ID != "Select One"
            && this.lstSelectedDepartments != undefined && this.lstSelectedDepartments != null && this.lstSelectedDepartments.length > 0) {
            if ((this.middleNameStatus == undefined || this.middleNameStatus == 0) &&
                (this.phoneStatus == undefined || this.phoneStatus == 0) &&
                (this.emailStatus == undefined || this.emailStatus == 0) &&
                (this.faxStatus == undefined || this.faxStatus == 0) &&
                (this.pagerStatus == undefined || this.pagerStatus == 0)) {
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
    ManageRequestorModifyComponent.prototype.getTrackITAllDepartments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageRequestorServices.getTKITAllDepts('', 'A', this._deviceTokenEntry)
                                .forEach(function (resp) {
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (_this.isUpdate == false) {
                                            _this.msgs = [];
                                        }
                                        _this.msgs = [];
                                        _this.departmentsData = resp.DataList;
                                        _this.lstDepartments = [];
                                        for (var i = 0; i < _this.departmentsData.length; i++) {
                                            _this.lstDepartments.push({ label: _this.departmentsData[i].DESCRIPTION + " - " + _this.departmentsData[i].DEPT_ID, value: _this.departmentsData[i].DEPT_ID });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageRequestorModifyComponent.prototype.getLocations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageRequestorServices.getLocations(this._deviceTokenEntry)
                                .forEach(function (resp) {
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (_this.isUpdate == false) {
                                            _this.msgs = [];
                                        }
                                        _this.msgs = [];
                                        _this.lstLocations = [];
                                        _this.locationData = resp.DataList;
                                        _this.lstLocations.push({ label: "Select Deliver Location", value: "" });
                                        for (var i = 0; i < _this.locationData.length; i++) {
                                            _this.lstLocations.push({ label: _this.locationData[i].LOCATION_NAME + " (" + _this.locationData[i].LOCATION_ID + ")", value: _this.locationData[i].LOCATION_ID });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageRequestorModifyComponent.prototype.getOrgGroupList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageRequestorServices.getOrgGroupList(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .forEach(function (resp) {
                                _this.msgs = [];
                                _this.orgGroupData = [];
                                _this.orgGroupData.push({ label: 'Select One', value: 'Select One' });
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupList = [];
                                        _this.orgGroupList = resp.DataList;
                                        if (_this.orgGroupList.length) {
                                            for (var i = 0; i < _this.orgGroupList.length; i++) {
                                                _this.orgGroupData.push({ label: _this.orgGroupList[i].ORG_GROUP_ID + '-' + _this.orgGroupList[i].ORG_GROUP_NAME, value: _this.orgGroupList[i].ORG_GROUP_ID });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.statusMesssage = resp.StatusMessage;
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.statusMesssage = resp.StatusMessage;
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageRequestorModifyComponent.prototype.getRequestorDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageRequestorServices.getRequestorDetails(this.requestorID, this._deviceTokenEntry)
                                .forEach(function (resp) {
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (_this.isUpdate == false) {
                                            _this.msgs = [];
                                        }
                                        _this.msgs = [];
                                        _this.newItem = resp.DataDictionary.Requestors[0];
                                        if (_this.newItem.STATUS == 'A') {
                                            _this.newItem.checkStatus = true;
                                        }
                                        else {
                                            _this.newItem.checkStatus = false;
                                        }
                                        setTimeout(function () {
                                            _this.lstSelectedDepartments = [];
                                            _this.lstSelectedDepartments = resp.DataDictionary.Departments;
                                        }, 300);
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageRequestorModifyComponent.prototype.createOrModifyRequestor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var key, iv, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (this.newItem.checkStatus == false) {
                            this.newItem.STATUS = 'I';
                        }
                        else {
                            this.newItem.STATUS = 'A';
                        }
                        key = CryptoJS.enc.Utf8.parse('8080808080808080');
                        iv = CryptoJS.enc.Utf8.parse('8080808080808080');
                        this.encryptedCurrentPwd = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.newItem.PASSWORD), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                        if (!(this.mode == (AtParEnums_1.ModeEnum.Add).toString())) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.manageRequestorServices.saveRequestorDetails(this.newItem, this.lstSelectedDepartments, this.encryptedCurrentPwd, this._deviceTokenEntry).forEach(function (resp) {
                                _this.msgs = [];
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.statusMesssage = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Requestor").replace("2%", _this.newItem.REQUESTOR_ID);
                                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                                        _this.newItem = new TKIT_REQUESTOR_1.TKIT_REQUESTOR();
                                        _this.seletedOrgGroupId = "";
                                        _this.lstSelectedDepartments = [];
                                        _this.newItem.LOCATION_ID = "";
                                        _this.newItem.RECORDS_PER_PAGE = 10;
                                        _this.loading = true;
                                        _this.newItem.STATUS = 'A';
                                        _this.newItem.checkStatus = true;
                                        document.getElementById('txtRequetorId').focus();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMesssage = resp.StatusMessage;
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMesssage = resp.StatusMessage;
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(this.mode == (AtParEnums_1.ModeEnum.Edit).toString())) return [3 /*break*/, 4];
                        this.spinnerService.start();
                        this.newItem.checkStatus == true ? this.newItem.STATUS = 'A' : this.newItem.STATUS = 'I';
                        return [4 /*yield*/, this.manageRequestorServices.updateRequestorDetails(this.newItem, this.lstSelectedDepartments, this.encryptedCurrentPwd, this._deviceTokenEntry).forEach(function (resp) {
                                _this.msgs = [];
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.statusMesssage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Requestor").replace("2%", _this.newItem.REQUESTOR_ID);
                                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                                        document.getElementById('txtPassword').focus();
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMesssage = resp.StatusMessage;
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMesssage = resp.StatusMessage;
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "ngOnInit");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ManageRequestorModifyComponent.prototype.fileUpload = function (event) {
        var _this = this;
        try {
            this.spinnerService.start();
            var fileList = event.target.files;
            this.trackItUserSelectedFile = event.target.files[0].name;
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
            var apiUrl = this.httpService.BaseUrl + "/api/CommonTrackIT/SaveTrackItUserProfileImage";
            this.http.post(apiUrl, formData, options).toPromise()
                .then(function (res) {
                _this.msgs = [];
                _this.spinnerService.stop();
                var data = res.json();
                switch (data.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        _this.files = '';
                        _this.showUploadImage = false;
                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: data.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Warn: {
                        _this.showUploadImage = true;
                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Error: {
                        _this.showUploadImage = true;
                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Custom: {
                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
            }, function (error) { return console.log(error); });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "fileUpload");
        }
    };
    ManageRequestorModifyComponent.prototype.navigateToRequestorterHome = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        var navigationExtras = {
            relativeTo: this.route
        };
        this.router.navigate(['../'], navigationExtras);
    };
    ManageRequestorModifyComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    /**
  * delete all the values from variables
  */
    ManageRequestorModifyComponent.prototype.ngOnDestroy = function () {
        this._deviceTokenEntry = [];
        this.msgs = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.requestorData = [];
    };
    ManageRequestorModifyComponent = __decorate([
        core_1.Component({
            templateUrl: 'tkit-manage-requestor-modify.component.html',
            providers: [tkit_manage_requestor_services_1.ManageRequestorServices, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [tkit_manage_requestor_services_1.ManageRequestorServices,
            router_1.Router,
            event_spinner_service_1.SpinnerService,
            router_1.ActivatedRoute,
            AtParConstants_1.AtParConstants,
            AtParSharedDataService_1.AtParSharedDataService,
            http_1.Http,
            HttpService_1.HttpService])
    ], ManageRequestorModifyComponent);
    return ManageRequestorModifyComponent;
}());
exports.ManageRequestorModifyComponent = ManageRequestorModifyComponent;
//# sourceMappingURL=tkit-manage-requestor-modify.component.js.map