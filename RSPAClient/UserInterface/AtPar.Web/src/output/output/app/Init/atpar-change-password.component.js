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
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var HttpService_1 = require("../Shared/HttpService");
var CryptoJS = require("crypto-js");
require("rxjs/add/operator/map");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var atpar_change_password_service_1 = require("./atpar-change-password.service");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var router_1 = require("@angular/router");
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var routepath_1 = require("../AtPar/Menus/routepath");
var ChangePasswordComponent = (function () {
    function ChangePasswordComponent(httpService, atParConstants, router, route, title, spinnerService, changePasswordService, leftBarAnimationService) {
        this.httpService = httpService;
        this.atParConstants = atParConstants;
        this.router = router;
        this.route = route;
        this.title = title;
        this.spinnerService = spinnerService;
        this.changePasswordService = changePasswordService;
        this.leftBarAnimationService = leftBarAnimationService;
        this.showStyle = false;
        this.deviceTokenEntry = [];
        this.growlMsg = [];
        this.btnSubmit = true;
        this.txtOldPwd = "";
        this.txtNewPassWd = "";
        this.txtCnfPassWd = "";
        this.txtHintQst = "";
        this.txtHintAns = "";
        this.newPassWd = "";
        this.paramuserId = '';
        this.isUserAllowed = false;
        this.statusMessage = "";
        this.message = "";
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    ChangePasswordComponent.prototype.getMargin = function () {
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
    ChangePasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle('Change Password');
        try {
            if (localStorage.getItem('AppGroups') != null && localStorage.getItem('AppGroups') != undefined && localStorage.getItem('AppGroups') != '') {
                this.isUserAllowed = true;
            }
            else {
                this.isUserAllowed = false;
            }
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            setTimeout(function () {
                var txtOldPswdValue = document.getElementById("oldPwd");
                txtOldPswdValue.focus();
            }, 500);
            if (this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.LdapUser] == "Y") {
                this.btnSubmit = false;
                this.growlMsg.push({
                    severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "The current login is a LDAP user, to change the password please refer to your organization's policy"
                });
            }
            else {
                this.route.queryParams.subscribe(function (params) {
                    _this.paramuserId = params['userId'];
                });
                this.getSecurityParams();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    };
    //=============  START GETSECURITYPARAMS EVENT=========//
    ChangePasswordComponent.prototype.getSecurityParams = function () {
        var _this = this;
        this.growlMsg = [];
        try {
            this.spinnerService.start();
            this.changePasswordService.GetSecurityParams().catch(this.httpService.handleError).
                then(function (res) {
                var atweb = res.json();
                _this.securityParams = atweb.Data;
                _this.spinnerService.stop();
                switch (atweb.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        _this.SetPassWdComplexityDescr(_this.securityParams);
                        break;
                    }
                    case AtParEnums_1.StatusType.Error: {
                        _this.growlMsg.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: atweb.StatusMessage.toString() });
                        break;
                    }
                    case AtParEnums_1.StatusType.Warn: {
                        _this.growlMsg.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: atweb.StatusMessage.toString() });
                        break;
                    }
                    case AtParEnums_1.StatusType.Custom: {
                        _this.growlMsg.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: atweb.StatusMessage.toString() });
                        break;
                    }
                }
            });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex, "getSecurityParams");
        }
    };
    //=============  END GETSECURITYPARAMS EVENT=========//
    //=============  START GET THE PASSWORD COMPLEXITY FROM SECURITY CONFIGURATION SCREEN=========//
    ChangePasswordComponent.prototype.SetPassWdComplexityDescr = function (Data) {
        this.complexityOfPwd = "Complexity of the password is ";
        switch (Data.PASSWD_COMPLEXITY) {
            case 0:
                this.complexityOfPwd = this.complexityOfPwd + "<b>Any Characters.</b>";
                break;
            case 1:
                this.complexityOfPwd = this.complexityOfPwd + "<b>Alphabets.</b> ie; Combination of A-Z, a-z";
                break;
            case 2:
                this.complexityOfPwd = this.complexityOfPwd + "<b>Alphanumerics.</b> ie; Combination of A-Z, a-z and 0-9";
                break;
            case 3:
                this.complexityOfPwd = this.complexityOfPwd + "<b>Alphanumeric and Non Alphanumeric.</b> </br> ie; Combination of A-Z, a-z, and 0-9 and ! @ # $";
                break;
        }
    };
    //=============  END GET THE PASSWORD COMPLEXITY FROM SECURITY CONFIGURATION SCREEN=========//
    //=============  START SUBMITT CLICK EVENT=========//
    ChangePasswordComponent.prototype.btnSubmitClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var userId, txtOldPasswdValue, txtNewPasswdValue, txtConfPasswdValue, txtConfPassWdValue, txthintQstvalue, txthintAnsvalue, txtConfPassWdValue, key, iv, newPwd, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMsg = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        userId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        if (this.txtOldPwd.trim() == null || this.txtOldPwd.trim() == undefined || this.txtOldPwd.trim() == '') {
                            this.growlMsg.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Old Password ' });
                            txtOldPasswdValue = document.getElementById("oldPwd");
                            this.txtOldPwd = '';
                            txtOldPasswdValue.focus();
                            return [2 /*return*/];
                        }
                        if (this.txtNewPassWd.trim() == null || this.txtNewPassWd.trim() == undefined || this.txtNewPassWd.trim() == '') {
                            this.growlMsg.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: ' Please enter valid New Password' });
                            txtNewPasswdValue = document.getElementById("newPwd");
                            this.txtNewPassWd = '';
                            txtNewPasswdValue.focus();
                            return [2 /*return*/];
                        }
                        if (this.txtCnfPassWd.trim() == null || this.txtCnfPassWd.trim() == undefined || this.txtCnfPassWd.trim() == '') {
                            this.growlMsg.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: '  Please enter valid Confirm Password' });
                            txtConfPasswdValue = document.getElementById("confPwd");
                            txtConfPasswdValue.focus();
                            return [2 /*return*/];
                        }
                        if (this.txtCnfPassWd != this.txtNewPassWd) {
                            this.growlMsg.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: ' New Password and Confirm Password doesnot matched' });
                            this.txtCnfPassWd = '';
                            txtConfPassWdValue = document.getElementById("confPwd");
                            txtConfPassWdValue.focus();
                            return [2 /*return*/];
                        }
                        if (this.txtHintQst.trim() == null || this.txtHintQst.trim() == undefined || this.txtHintQst.trim() == '') {
                            this.growlMsg.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: ' Please enter valid Hint Question' });
                            txthintQstvalue = document.getElementById("hintQst");
                            this.txtHintQst = '';
                            txthintQstvalue.focus();
                            return [2 /*return*/];
                        }
                        if (this.txtHintAns.trim() == null || this.txtHintAns.trim() == undefined || this.txtHintAns.trim() == '') {
                            this.growlMsg.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Hint Answer' });
                            txthintAnsvalue = document.getElementById("hintAns");
                            this.txtHintAns = '';
                            txthintAnsvalue.focus();
                            return [2 /*return*/];
                        }
                        if (this.txtCnfPassWd != this.txtNewPassWd) {
                            this.growlMsg.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: ' New Password and Confirm Password doesnot matched' });
                            this.txtCnfPassWd = '';
                            txtConfPassWdValue = document.getElementById("confPwd");
                            txtConfPassWdValue.focus();
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        if (this.txtOldPwd != "") {
                            this.passHash = CryptoJS.SHA256(this.txtOldPwd + userId).toString();
                        }
                        else {
                            this.passHash = "";
                        }
                        key = CryptoJS.enc.Utf8.parse('8080808080808080');
                        iv = CryptoJS.enc.Utf8.parse('8080808080808080');
                        newPwd = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.txtNewPassWd), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                        //let navigationExtras: NavigationExtras = null;
                        return [4 /*yield*/, this.changePasswordService.HashUpdatePassword(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.passHash, newPwd, this.txtHintQst, this.txtHintAns)
                                .catch(this.httpService.handleError).then(function (res) {
                                _this.growlMsg = [];
                                var atweb = res.json();
                                _this.statusType = atweb.StatType;
                                _this.spinnerService.stop();
                                switch (_this.statusType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.statusMessage = "password updated successfully";
                                        _this.growlMsg.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMessage });
                                        document.getElementById('oldPwd').focus();
                                        if (_this.paramuserId != null ||
                                            _this.paramuserId != undefined) {
                                            var navigationExtras = {
                                                queryParams: { 'statusMessage': _this.statusMessage }
                                            };
                                            _this.router.navigate(['login'], navigationExtras);
                                        }
                                        break;
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMsg.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: atweb.StatusMessage.toString() });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (atweb.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_PASSWORDNOTMATCHED) {
                                            _this.growlMsg.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "old " + atweb.StatusMessage.toString() });
                                            document.getElementById("oldPwd").focus();
                                        }
                                        else if (atweb.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_PASSWORDMINLENGTH) {
                                            _this.growlMsg.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: atweb.StatusMessage.split("1%")[0] + " " + _this.securityParams.PASSWD_MIN_LENGTH });
                                            document.getElementById("oldPwd").focus();
                                        }
                                        else if (atweb.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_PASSWORDMAXLENGTH) {
                                            _this.growlMsg.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: atweb.StatusMessage.split("1%")[0] + " " + _this.securityParams.PASSWD_MAX_LENGTH });
                                            document.getElementById("oldPwd").focus();
                                        }
                                        else {
                                            _this.growlMsg.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: atweb.StatusMessage.toString() });
                                            document.getElementById("oldPwd").focus();
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMsg.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: atweb.StatusMessage.toString() });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        //let navigationExtras: NavigationExtras = null;
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_1, "btnSubmitClick");
                        return [3 /*break*/, 4];
                    case 4:
                        this.txtOldPwd = '';
                        this.txtNewPassWd = '';
                        this.txtCnfPassWd = '';
                        this.txtHintQst = '';
                        this.txtHintAns = '';
                        return [2 /*return*/];
                }
            });
        });
    };
    ChangePasswordComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMsg = [];
        this.atParConstants.catchClientError(this.growlMsg, this.spinnerService, strExMsg.toString, funName, this.constructor.name);
    };
    //=============  END SUBMITT CLICK EVENT=========//
    //============= START CLEARING THE GLOBAL VARIBLES=========//
    ChangePasswordComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.growlMsg = [];
        this.securityParams = null;
        this.complexityOfPwd = null;
        this.passHash = null;
        this.txtOldPwd = null;
        this.txtNewPassWd = null;
        this.txtCnfPassWd = null;
        this.txtHintQst = null;
        this.txtHintAns = null;
        this.statusType = null;
        this.spinnerService.stop();
        this.spinnerService = null;
    };
    ChangePasswordComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-change-password.component.html',
            providers: [HttpService_1.HttpService, atpar_change_password_service_1.ChangePasswordService, AtParConstants_1.AtParConstants, platform_browser_1.Title]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            router_1.Router,
            router_1.ActivatedRoute,
            platform_browser_1.Title,
            event_spinner_service_1.SpinnerService,
            atpar_change_password_service_1.ChangePasswordService,
            leftbar_animation_service_1.LeftBarAnimationService])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
exports.ChangePasswordComponent = ChangePasswordComponent;
//# sourceMappingURL=atpar-change-password.component.js.map