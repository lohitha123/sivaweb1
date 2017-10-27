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
var AtParWebApiResponse_1 = require("../Shared/AtParWebApiResponse");
var MT_ATPAR_SECURITY_PARAMS_1 = require("../Entities/MT_ATPAR_SECURITY_PARAMS");
require("rxjs/add/operator/map");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_security_configuration_service_1 = require("./atpar-security-configuration.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var platform_browser_1 = require("@angular/platform-browser");
var SecurityConfigurationComponent = (function () {
    function SecurityConfigurationComponent(httpService, document, spinnerService, secConfigService, atParConstants) {
        this.httpService = httpService;
        this.document = document;
        this.spinnerService = spinnerService;
        this.secConfigService = secConfigService;
        this.atParConstants = atParConstants;
        this.securityParams = new MT_ATPAR_SECURITY_PARAMS_1.MT_ATPAR_SECURITY_PARAMS();
        this.chkPassWdResetReq = false;
        this.chkMaintainPassWdHistory = false;
        this.chkPassWdHistory = false;
        this.chkSecAudit = false;
        this.chkPassWdReqHHT = false;
        this.chkRegisteredDevices = false;
        this.pswComplexity = [];
        this.values = [];
        this.growlMsgs = [];
        this.minLengthStatus = 0;
        this.maxLengthStatus = 0;
        this.pswExpPeriodStatus = 0;
        this.noOfLoginAttemptsStatus = 0;
        this.ldapPswExpStatus = 0;
        this.loading = false;
    }
    SecurityConfigurationComponent.prototype.getSecurityParams = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var atweb, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        atweb = new AtParWebApiResponse_1.AtParWebApiResponse();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.secConfigService.getSecurityParams().then(function (res) {
                                atweb = res.json();
                                _this.spinnerService.stop();
                                switch (atweb.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.securityParams.PASSWD_MAX_LENGTH = atweb.Data.PASSWD_MAX_LENGTH;
                                        _this.securityParams.PASSWD_MIN_LENGTH = atweb.Data.PASSWD_MIN_LENGTH;
                                        _this.securityParams.PASSWD_EXP_PERIOD = atweb.Data.PASSWD_EXP_PERIOD;
                                        _this.securityParams.ALLOWED_INVALID_LOGIN_ATTEMPTS = atweb.Data.ALLOWED_INVALID_LOGIN_ATTEMPTS;
                                        _this.securityParams.LDAP_PASS_EXP_ALTMSG = atweb.Data.LDAP_PASS_EXP_ALTMSG;
                                        _this.securityParams.LOGIN_HISTORY = atweb.Data.LOGIN_HISTORY;
                                        _this.securityParams.PASSWD_COMPLEXITY = atweb.Data.PASSWD_COMPLEXITY;
                                        if (atweb.Data.ALLOW_REG_DEVICES.toString() === AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N])
                                            _this.chkRegisteredDevices = false;
                                        else
                                            _this.chkRegisteredDevices = true;
                                        if (atweb.Data.CHECK_PASSWD_HISTORY === AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N])
                                            _this.chkPassWdHistory = false;
                                        else
                                            _this.chkPassWdHistory = true;
                                        if (atweb.Data.MAINTAIN_PASSWD_HISTORY === AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N])
                                            _this.chkMaintainPassWdHistory = false;
                                        else
                                            _this.chkMaintainPassWdHistory = true;
                                        if (atweb.Data.MAINTAIN_SECURITY_AUDIT === AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N])
                                            _this.chkSecAudit = false;
                                        else
                                            _this.chkSecAudit = true;
                                        if (atweb.Data.PASSWD_RESET_REQUIRED === AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N])
                                            _this.chkPassWdResetReq = false;
                                        else
                                            _this.chkPassWdResetReq = true;
                                        ;
                                        if (atweb.Data.PASS_REQ_HHT_USERS === AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N])
                                            _this.chkPassWdReqHHT = false;
                                        else
                                            _this.chkPassWdReqHHT = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: atweb.StatusMessage.toString() });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: atweb.StatusMessage.toString() });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: atweb.StatusMessage.toString() });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "getSecurityParams");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SecurityConfigurationComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.values.push({ label: '1', value: '1' });
                        this.values.push({ label: '2', value: '2' });
                        this.pswComplexity.push({ label: '0', value: '0' });
                        this.pswComplexity.push({ label: '1', value: '1' });
                        this.pswComplexity.push({ label: '2', value: '2' });
                        this.pswComplexity.push({ label: '3', value: '3' });
                        return [4 /*yield*/, this.getSecurityParams()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SecurityConfigurationComponent.prototype.updateSecurityParams = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var minPaswLength, maxPaswLength, minLoginAttempts, atweb, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMsgs = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        minPaswLength = this.securityParams.PASSWD_MIN_LENGTH;
                        maxPaswLength = this.securityParams.PASSWD_MAX_LENGTH;
                        minLoginAttempts = this.securityParams.ALLOWED_INVALID_LOGIN_ATTEMPTS;
                        atweb = new AtParWebApiResponse_1.AtParWebApiResponse();
                        this.spinnerService.start();
                        if (!((minPaswLength < 1) || (maxPaswLength < 1 || maxPaswLength > 20) || (minLoginAttempts < 1) || parseInt(maxPaswLength.toString()) < parseInt(minPaswLength.toString()))) return [3 /*break*/, 2];
                        if (parseInt(maxPaswLength.toString()) < parseInt(minPaswLength.toString())) {
                            this.growlMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Maximum Password length should be greater than or equal to Minimum Password length" });
                            //this.growlMsgs.find("Maximum Password length should be greater than or equal to Minimum Password length")
                            this.spinnerService.stop();
                        }
                        if (minPaswLength < 1 || minPaswLength > 20) {
                            this.growlMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Minimum Password Length Should be between 1 and 20" });
                            this.spinnerService.stop();
                        }
                        if (maxPaswLength < 1 || maxPaswLength > 20) {
                            this.growlMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Maximum Password Length Should be between 1 and 20" });
                            this.spinnerService.stop();
                        }
                        if (minLoginAttempts < 1) {
                            this.growlMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Login Attempts Should be Number and greater than zero" });
                            this.spinnerService.stop();
                        }
                        return [2 /*return*/];
                    case 2:
                        if (this.chkRegisteredDevices == false)
                            this.securityParams.ALLOW_REG_DEVICES = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N];
                        else
                            this.securityParams.ALLOW_REG_DEVICES = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y];
                        if (this.chkPassWdHistory == false)
                            this.securityParams.CHECK_PASSWD_HISTORY = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N];
                        else
                            this.securityParams.CHECK_PASSWD_HISTORY = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y];
                        if (this.chkMaintainPassWdHistory == false)
                            this.securityParams.MAINTAIN_PASSWD_HISTORY = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N];
                        else
                            this.securityParams.MAINTAIN_PASSWD_HISTORY = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y];
                        if (this.chkSecAudit == false)
                            this.securityParams.MAINTAIN_SECURITY_AUDIT = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N];
                        else
                            this.securityParams.MAINTAIN_SECURITY_AUDIT = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y];
                        if (this.chkPassWdResetReq == false)
                            this.securityParams.PASSWD_RESET_REQUIRED = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N];
                        else
                            this.securityParams.PASSWD_RESET_REQUIRED = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y];
                        if (this.chkPassWdReqHHT == false)
                            this.securityParams.PASS_REQ_HHT_USERS = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N];
                        else
                            this.securityParams.PASS_REQ_HHT_USERS = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y];
                        return [4 /*yield*/, this.secConfigService.updateSecurityParams(this.securityParams).then(function (res) {
                                atweb = res.json();
                                _this.spinnerService.stop();
                                switch (atweb.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.getSecurityParams();
                                        _this.growlMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Security Parameters Updated Successfully" });
                                        document.getElementById('PASSWD_MIN_LENGTH').focus();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: atweb.StatusMessage.toString() });
                                        _this.getSecurityParams();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: atweb.StatusMessage.toString() });
                                        _this.getSecurityParams();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: atweb.StatusMessage.toString() });
                                        break;
                                    }
                                }
                                _this.atParConstants.scrollToTop();
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.spinnerService.stop();
                        return [3 /*break*/, 6];
                    case 5:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "updateSecurityParams");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SecurityConfigurationComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMsgs = [];
        this.atParConstants.catchClientError(this.growlMsgs, this.spinnerService, strExMsg.toString, funName, this.constructor.name);
    };
    SecurityConfigurationComponent.prototype.ngOnDestroy = function () {
        this.securityParams = null;
        this.chkPassWdResetReq = false;
        this.chkMaintainPassWdHistory = false;
        this.chkPassWdHistory = false;
        this.chkSecAudit = false;
        this.chkPassWdReqHHT = false;
        this.pswComplexity = [];
        this.chkRegisteredDevices = false;
        this.values = [];
        this.growlMsgs = [];
        this.spinnerService.stop();
        this.securityParams = null;
        this.spinnerService = null;
    };
    SecurityConfigurationComponent.prototype.bindModelDataChange = function (event) {
        if ("PASSWD_MIN_LENGTH" == event.TextBoxID.toString()) {
            this.minLengthStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("PASSWD_MAX_LENGTH" == event.TextBoxID.toString()) {
            this.maxLengthStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("PASSWD_EXP_PERIOD" == event.TextBoxID.toString()) {
            this.pswExpPeriodStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("ALLOWED_INVALID_LOGIN_ATTEMPTS" == event.TextBoxID.toString()) {
            this.noOfLoginAttemptsStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("LDAP_PASS_EXP_ALTMSG" == event.TextBoxID.toString()) {
            this.ldapPswExpStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if (this.minLengthStatus == 0 && this.maxLengthStatus == 0 && this.pswExpPeriodStatus == 0 && this.noOfLoginAttemptsStatus == 0 && this.ldapPswExpStatus == 0) {
            this.loading = false;
        }
        else {
            this.loading = true;
        }
    };
    SecurityConfigurationComponent = __decorate([
        core_1.Component({
            providers: [HttpService_1.HttpService, atpar_security_configuration_service_1.SecurityConfigurationService],
            templateUrl: 'atpar-security-configuration.component.html',
        }),
        __param(1, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [HttpService_1.HttpService, Object, event_spinner_service_1.SpinnerService, atpar_security_configuration_service_1.SecurityConfigurationService,
            AtParConstants_1.AtParConstants])
    ], SecurityConfigurationComponent);
    return SecurityConfigurationComponent;
}());
exports.SecurityConfigurationComponent = SecurityConfigurationComponent;
//# sourceMappingURL=atpar-security-configuration.component.js.map