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
var platform_browser_1 = require("@angular/platform-browser");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var MT_ATPAR_USER_PROFILE_APP_ACL_ORG_1 = require("../Entities/MT_ATPAR_USER_PROFILE_APP_ACL_ORG");
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtparProfile = (function () {
    function AtparProfile(httpservice, leftBarAnimationService, spinnerService, atParConstant, title) {
        this.httpservice = httpservice;
        this.leftBarAnimationService = leftBarAnimationService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.title = title;
        this.showStyle = false;
        this.isNotAdmin = false;
        this.isLDAPUser = false;
        this.isFormInValid = true;
        this.statusCode = 0;
        this.errorMessage = '';
        this.statusMessage = "";
        this.btnEnableDisable = true;
        this._deviceTokenEntry = [];
        this.msgs = [];
        this.ddRecordsPerPage = [];
        try {
            this.title.setTitle('My Profile');
            this.model = new MT_ATPAR_USER_PROFILE_APP_ACL_ORG_1.MT_ATPAR_USER_PROFILE_APP_ACL_ORG();
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        }
        catch (ex) {
            this.clientErrorMsg(ex, "constructor");
        }
    }
    AtparProfile.prototype.getMargin = function () {
        try {
            this.showStyle = this.leftBarAnimationService.getLeftBarMargin();
            if (this.showStyle) {
                return "";
            }
            else {
                return "0px";
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getMargin");
        }
    };
    AtparProfile.prototype.ngOnInit = function () {
        try {
            this.getRecordsPerPageddData();
            this.getUserDetails();
            if (this.model.DEFAULT_REPORT_DURATION == 0) {
                this.txtDefaultDurationStatus = 1;
            }
            else {
                this.txtDefaultDurationStatus = 0;
            }
            this.btnEnableDisable = false;
            this.txtFnameStatus = 0;
            this.txtLnameStatus = 0;
            this.txtSessionValidityTimeStatus = 0;
            this.txtIdleTimeStatus = 0;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    };
    AtparProfile.prototype.getRecordsPerPageddData = function () {
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
    AtparProfile.prototype.getUserDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.httpservice.get({
                                "apiMethod": "/api/User/GetUser",
                                params: {
                                    "userId": this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]
                                }
                            }).catch(this.httpservice.handleError).map(function (res) { return res.json(); }).subscribe(function (res2) {
                                switch (res2.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (res2.Data != null) {
                                            _this.model = res2.Data;
                                            _this.model.ORG_GROUP_ID = _this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                                            _this.model.PROFILE_ID = _this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID];
                                            if (_this.model.USER_ID.toUpperCase() == 'ADMIN') {
                                                _this.isNotAdmin = false;
                                            }
                                            else {
                                                _this.isNotAdmin = true;
                                            }
                                            if (_this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID] == 'VENDOR') {
                                                _this.isNotAdmin = true;
                                            }
                                            if (_this.model.LDAP_USER == 'Y') {
                                                _this.isLDAPUser = true;
                                            }
                                            else {
                                                _this.isLDAPUser = false;
                                            }
                                            if (_this.model.USER_ID != null && _this.model.USER_ID != '') {
                                                _this.model.USER_ID = _this.model.USER_ID.toUpperCase();
                                            }
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res2.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res2.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "getUserDetails");
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AtparProfile.prototype.updateUserDetails = function (model) {
        var _this = this;
        try {
            if (model.DEFAULT_REPORT_DURATION == '0') {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Default Duration should be between 1 to 9999" });
                return;
            }
            if (model.RECORDS_PER_PAGE == null || model.RECORDS_PER_PAGE == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Select Records Per Page" });
            }
            else {
                this.spinnerService.start();
                this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage] = model.RECORDS_PER_PAGE;
                localStorage.setItem('DeviceTokenEntry', JSON.stringify(this._deviceTokenEntry));
                if (model.USER_ID != '' && model.TOKEN_EXPIRY_PERIOD && model.IDLE_TIME && model.FIRST_NAME && model.LAST_NAME && model.RECORDS_PER_PAGE && model.DEFAULT_REPORT_DURATION) {
                    this.httpservice.update({
                        "apiMethod": "/api/User/SaveUserDetails",
                        formData: model
                    }).catch(this.httpservice.handleError)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (res2) {
                        _this.statusCode = res2.StatusCode;
                        switch (res2.StatType) {
                            case AtParEnums_1.StatusType.Success: {
                                _this.statusMessage = "User " + model.USER_ID + " Profile Updated Successfully";
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMessage });
                                document.getElementById('TOKEN_EXPIRY_PERIOD').focus();
                                break;
                            }
                            case AtParEnums_1.StatusType.Warn: {
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res2.StatusMessage });
                                break;
                            }
                            case AtParEnums_1.StatusType.Error: {
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res2.StatusMessage });
                                break;
                            }
                        }
                        _this.atParConstant.scrollToTop();
                    });
                }
                else {
                    this.msgs = [];
                    this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'All * fields are mandatory' });
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "updateUserDetails");
        }
        finally {
            this.spinnerService.stop();
        }
    };
    AtparProfile.prototype.clientErrorMsg = function (ex, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString(), funName, this.constructor.name);
    };
    AtparProfile.prototype.bindModelDataChange = function (event) {
        if ("TOKEN_EXPIRY_PERIOD" == event.TextBoxID.toString()) {
            this.txtSessionValidityTimeStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("IDLE_TIME" == event.TextBoxID.toString()) {
            this.txtIdleTimeStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("FIRST_NAME" == event.TextBoxID.toString()) {
            this.txtFnameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("LAST_NAME" == event.TextBoxID.toString()) {
            this.txtLnameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("MIDDLE_INITIAL" == event.TextBoxID.toString()) {
            this.txtMiddleInitialStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("EMAIL_ID" == event.TextBoxID.toString()) {
            this.txtEmailStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("PHONE1" == event.TextBoxID.toString()) {
            this.txtPhne1Status = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("PHONE2" == event.TextBoxID.toString()) {
            this.txtPhne2Status = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("FAX" == event.TextBoxID.toString()) {
            this.txtFaxStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("PAGER" == event.TextBoxID.toString()) {
            this.txtPagerStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("DEFAULT_REPORT_DURATION" == event.TextBoxID.toString()) {
            this.txtDefaultDurationStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            if (this.model.DEFAULT_REPORT_DURATION == 0) {
                this.txtDefaultDurationStatus = 1;
            }
        }
        if (this.txtSessionValidityTimeStatus == 0 && this.txtIdleTimeStatus == 0 && this.txtFnameStatus == 0 && this.txtLnameStatus == 0 && this.txtDefaultDurationStatus == 0) {
            if ((this.txtMiddleInitialStatus == 0 || this.txtMiddleInitialStatus == undefined) && (this.txtEmailStatus == 0 || this.txtEmailStatus == undefined)
                && (this.txtPhne1Status == 0 || this.txtPhne1Status == undefined) && (this.txtPhne2Status == 0 || this.txtPhne2Status == undefined) &&
                (this.txtFaxStatus == 0 || this.txtFaxStatus == undefined) && (this.txtPagerStatus == 0 || this.txtPagerStatus == undefined)) {
                this.btnEnableDisable = false;
            }
            else {
                this.btnEnableDisable = true;
            }
        }
        else {
            this.btnEnableDisable = true;
        }
    };
    AtparProfile.prototype.OnDestroy = function () {
        this.spinnerService.stop();
        this.spinnerService = null;
        this.model = null;
        this._deviceTokenEntry = null;
        this.statusCode = null;
        this.errorMessage = null;
        this.showStyle = null;
        this.isNotAdmin = null;
        this.isLDAPUser = null;
        this.isFormInValid = null;
        this.txtFnameStatus = null;
        this.txtLnameStatus = null;
        this.txtMiddleInitialStatus = null;
        this.txtEmailStatus = null;
        this.txtPhne1Status = null;
        this.txtPhne2Status = null;
        this.txtFaxStatus = null;
        this.txtPagerStatus = null;
        this.txtDefaultDurationStatus = null;
        this.txtDefaultDurationStatus = null;
        this.txtIdleTimeStatus = null;
        localStorage.removeItem("BreadCrumbMenus");
    };
    AtparProfile = __decorate([
        core_1.Component({
            templateUrl: 'atpar-profile.component.html',
            providers: [HttpService_1.HttpService, AtParConstants_1.AtParConstants],
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            leftbar_animation_service_1.LeftBarAnimationService,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            platform_browser_1.Title])
    ], AtparProfile);
    return AtparProfile;
}());
exports.AtparProfile = AtparProfile;
//# sourceMappingURL=atpar-profile.component.js.map