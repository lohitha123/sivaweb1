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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
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
var core_1 = require("@angular/core");
var HttpService_1 = require("../Shared/HttpService");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var atparwebapiresponse_1 = require("../shared/atparwebapiresponse");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
//import * as CryptoJS from 'crypto-js';
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var atparenums_1 = require("../shared/atparenums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var ForgotComponent = (function () {
    function ForgotComponent(httpservice, http, spinnerService, jsonp, title) {
        var _this = this;
        this.httpservice = httpservice;
        this.http = http;
        this.spinnerService = spinnerService;
        this.jsonp = jsonp;
        this.title = title;
        this.msgs = [];
        this.model = {};
        this.visible = false;
        this.visibleH = false;
        this.visibleNewpass = false;
        this.visibleCpass = false;
        this.showHint = false;
        this.userExist = false;
        this._deviceTokenEntry = [];
        this.deviceID = "";
        this.systemID = "";
        this.errorMessage = "";
        this.selectedValue = "";
        this.statusCode = -1;
        this.values = [];
        this.trSystemId = false;
        this.hdnSystemId = "";
        this.title.setTitle(AtParConstants_1.AtParConstants.PRODUCT_NAME + ' - Forgot Password');
        try {
            this.jsonp.get('//api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK').
                subscribe(function (response) {
                return _this.ipAddress = response.json().ip;
            });
        }
        catch (ex) {
            this.errorMessage = "General Client Error";
            this.msgs.push({ severity: 'error', summary: 'error', detail: this.errorMessage });
        }
    }
    ForgotComponent.prototype.labeluserid = function () {
        if (this.model.userid == "undefined") {
            this.visible = !this.visible;
        }
        else {
            this.visible = true;
        }
        ;
        this.activelabel = this.visible ? 'input-disturbed' : 'hide-class';
    };
    ForgotComponent.prototype.labelHint = function () {
        if (this.model.hanswer == "undefined") {
            this.visibleH = !this.visibleH;
        }
        else {
            this.visibleH = true;
        }
        ;
        this.activelabelH = this.visibleH ? 'input-disturbed' : 'hide-class';
    };
    ForgotComponent.prototype.labelNewpass = function () {
        if (this.model.npassword == "undefined") {
            this.visibleNewpass = !this.visibleNewpass;
        }
        else {
            this.visibleNewpass = true;
        }
        ;
        this.activelabelN = this.visibleNewpass ? 'input-disturbed' : 'hide-class';
    };
    ForgotComponent.prototype.labelCpass = function () {
        if (this.model.cpassword == "undefined") {
            this.visibleCpass = !this.visibleCpass;
        }
        else {
            this.visibleCpass = true;
        }
        ;
        this.activelabelC = this.visibleCpass ? 'input-disturbed' : 'hide-class';
    };
    ForgotComponent.prototype.onBlurUserid = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showHint = false;
                        this.userExist = false;
                        this.model.hanswer = '';
                        this.model.npassword = '';
                        this.model.cpassword = '';
                        this.msgs = [];
                        if (!(e.target.value != '')) return [3 /*break*/, 4];
                        if (this.trSystemId == true) {
                            if (this.selectedValue == null || this.selectedValue == "" || this.selectedValue == undefined || this.selectedValue == "0") {
                                this.msgs.push({ severity: 'warn', summary: 'warn', detail: "Please select a SystemID" });
                                return [2 /*return*/];
                            }
                        }
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.setDeviceTokenEntry(e.target.value.toString());
                        return [4 /*yield*/, this.httpservice.get({
                                "apiMethod": "/api/ForgotPassword/GetForgotHashPassword",
                                params: {
                                    "deviceTokenEntry": this._deviceTokenEntry,
                                    "userID": this._userID
                                }
                            }).catch(this.httpservice.handleError)
                                .map(function (res) { return res.json(); })
                                .subscribe(function (res2) {
                                setTimeout(function () {
                                    _this.spinnerService.stop();
                                }, 500);
                                switch (res2.StatType) {
                                    case atparenums_1.StatusType.Success:
                                        if (res2.DataVariable != "" && res2.DataVariable != null) {
                                            _this.showHint = true;
                                            _this.userExist = true;
                                            _this.hintQuestion = res2.DataVariable;
                                            var txtvalue = document.getElementById("hanswer");
                                            txtvalue.disabled = false;
                                            txtvalue.focus();
                                            txtvalue.autofocus = true;
                                            break;
                                        }
                                    case atparenums_1.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: 'warn', detail: res2.StatusMessage });
                                        _this.hintQuestion = '';
                                        _this.showHint = false;
                                        _this.userExist = false;
                                        break;
                                    }
                                    case atparenums_1.StatusType.Error: {
                                        _this.msgs.push({ severity: 'error', summary: 'error', detail: res2.StatusMessage });
                                        _this.hintQuestion = '';
                                        _this.showHint = false;
                                        _this.userExist = false;
                                        break;
                                    }
                                    case atparenums_1.StatusType.Custom: {
                                        _this.msgs.push({ severity: 'info', summary: 'info', detail: res2.StatusMessage });
                                        _this.hintQuestion = '';
                                        _this.showHint = false;
                                        _this.userExist = false;
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.msgs = [];
                        this.msgs.push({ severity: 'error', summary: 'error', detail: "General�Client�Error" });
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ForgotComponent.prototype.onSubmit = function (user, form) {
        var _this = this;
        this.msgs = [];
        var newPassword = user.npassword;
        if (this.trSystemId == true) {
            if (this.selectedValue == "0") {
                this.msgs.push({ severity: 'warn', summary: 'warn', detail: "Please select a SystemID" });
                return;
            }
        }
        if (user.npassword.trim() != user.cpassword.trim()) {
            this.msgs.push({ severity: 'warn', summary: 'warn', detail: 'Password not matched' });
            return;
        }
        if (newPassword.match(" ")) {
            this.msgs.push({ severity: 'warn', summary: 'warn', detail: 'Space is not allowed in Password' });
            return;
        }
        else {
            try {
                this.deviceID = this.ipAddress;
                this.setDeviceTokenEntry(user.userID);
                // var key = CryptoJS.enc.Utf8.parse('8080808080808080');
                // var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
                //this.passHash = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(user.npassword.trim()), key,
                //   { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                this.httpservice.get({
                    "apiMethod": "/api/ForgotPassword/GetForgotHashPassword",
                    params: {
                        "deviceTokenEntry": this._deviceTokenEntry,
                        "userId": this._userID,
                        "hintQ": this.hintQuestion,
                        "hintA": user.hanswer,
                        "pPassword": this.passHash
                    }
                }).catch(this.httpservice.handleError)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res2) {
                    switch (res2.StatType) {
                        case atparenums_1.StatusType.Success: {
                            _this.msgs.push({ severity: 'success', summary: 'success', detail: 'Password Updated Successfully' });
                            _this.model = {};
                            _this.showHint = false;
                            _this.userExist = false;
                            form._submitted = false;
                            break;
                        }
                        case atparenums_1.StatusType.Warn: {
                            if (res2.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_PASSWORDMINLENGTH) {
                                _this.msgs.push({ severity: 'warn', summary: 'warn', detail: res2.StatusMessage.split("1%")[0] + " " + _this.securityParams.PASSWD_MIN_LENGTH });
                            }
                            else if (res2.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_PASSWORDMAXLENGTH) {
                                _this.msgs.push({ severity: 'warn', summary: 'warn', detail: res2.StatusMessage.split("1%")[0] + " " + _this.securityParams.PASSWD_MAX_LENGTH });
                            }
                            else {
                                _this.msgs.push({ severity: 'warn', summary: 'warn', detail: res2.StatusMessage });
                            }
                            _this.model.hanswer = '';
                            _this.model.npassword = '';
                            _this.model.cpassword = '';
                            _this.userExist = true;
                            form._submitted = false;
                            var txtvalue = document.getElementById("hanswer");
                            txtvalue.focus();
                            break;
                        }
                        case atparenums_1.StatusType.Error: {
                            _this.showHint = true;
                            _this.msgs.push({ severity: 'error', summary: 'error', detail: res2.StatusMessage });
                            _this.model.hanswer = '';
                            _this.model.npassword = '';
                            _this.model.cpassword = '';
                            _this.userExist = true;
                            form._submitted = false;
                            var txtvalue = document.getElementById("hanswer");
                            txtvalue.focus();
                            break;
                        }
                        case atparenums_1.StatusType.Custom: {
                            _this.showHint = true;
                            _this.msgs.push({ severity: 'info', summary: 'info', detail: res2.StatusMessage });
                            _this.model.hanswer = '';
                            _this.model.npassword = '';
                            _this.model.cpassword = '';
                            _this.userExist = true;
                            form._submitted = false;
                            var txtvalue = document.getElementById("hanswer");
                            txtvalue.focus();
                            break;
                        }
                    }
                });
            }
            catch (ex) {
                this.spinnerService.stop();
                this.msgs = [];
                this.errorMessage = "General Client Error";
                this.msgs.push({ severity: 'error', summary: 'error', detail: this.errorMessage });
                return;
            }
        }
    };
    ForgotComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        return [4 /*yield*/, this.BindDropDown()];
                    case 1:
                        _a.sent();
                        this.getSecurityParams();
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    ForgotComponent.prototype.ngOnDestroy = function () {
        this.statusCode = -1;
        this._deviceTokenEntry = [];
        this.activelabel = "";
        this.activelabelC = "";
        this.activelabelH = "";
        this.activelabelN = "";
        this.selectedValue = "";
        this.deviceID = "";
        this.hdnSystemId = "";
        this.ipAddress = null;
        this.model = {};
        this.systemID = null;
        this.deviceID = null;
        this.systemID = null;
        this.msgs = null;
        this.selectedItem = null;
        this.selectedValue = "";
        this.atweb = null;
        this.systemData = null;
        this.statusCode = -1;
        this.values = [];
        this.trSystemId = false;
        this.hdnSystemId = "";
        this.msgs = [];
    };
    ForgotComponent.prototype.BindDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i, ex_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, this.GetSystemIds("")];
                    case 1:
                        _a.atweb = _b.sent();
                        this.systemData = this.atweb.DataList;
                        this.statusCode = this.atweb.StatusCode;
                        this.values.push({ label: 'Select System ID', value: '0' });
                        switch (this.atweb.StatType) {
                            case atparenums_1.StatusType.Success: {
                                if (this.systemData != null) {
                                    if (this.systemData.length > 1) {
                                        for (i = 0; i < this.systemData.length; i++) {
                                            this.values.push({ label: this.systemData[i].SYSTEM_ID, value: this.systemData[i].SYSTEM_NAME });
                                        }
                                        this.trSystemId = true;
                                    }
                                    else {
                                        this.hdnSystemId = this.systemData[0].SYSTEM_ID;
                                        this.trSystemId = false;
                                    }
                                }
                                break;
                            }
                            case atparenums_1.StatusType.Warn: {
                                this.msgs.push({ severity: 'warn', summary: 'warn', detail: this.atweb.StatusMessage });
                                break;
                            }
                            case atparenums_1.StatusType.Error: {
                                this.msgs.push({ severity: 'error', summary: 'error', detail: this.atweb.StatusMessage });
                                break;
                            }
                            case atparenums_1.StatusType.Custom: {
                                this.msgs.push({ severity: 'info', summary: 'info', detail: this.atweb.StatusMessage });
                                break;
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _b.sent();
                        this.spinnerService.stop();
                        this.errorMessage = "General Client Error";
                        this.msgs.push({ severity: 'error', summary: 'error', detail: this.errorMessage });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ForgotComponent.prototype.setDeviceTokenEntry = function (user) {
        this._userID = user.toUpperCase();
        this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID] = user.toUpperCase();
        this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DeviceID] = this.deviceID;
        this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DateTime] = new Date().toLocaleString(); //format("MM/dd/yyyy HH:mm:ss");
        this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ClientType] = AtParEnums_1.ClientType.WEB.toFixed().toString();
        this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId] = (this.selectedValue == "" || this.selectedValue == undefined) ? this.hdnSystemId : this.selectedValue;
    };
    ForgotComponent.prototype.GetSystemIds = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.atweb = new atparwebapiresponse_1.AtParWebApiResponse();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.httpservice.getSync({
                                "apiMethod": "/api/Common/GetSystemIDS",
                                params: {
                                    "systemID": data
                                }
                            }).catch(this.httpservice.handleError).then(function (res) {
                                _this.atweb = res.json();
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.atweb];
                    case 3:
                        ex_3 = _a.sent();
                        this.spinnerService.stop();
                        this.errorMessage = "General Client Error";
                        this.msgs.push({ severity: 'error', summary: 'error', detail: this.errorMessage });
                        return [2 /*return*/, this.atweb];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ForgotComponent.prototype.getSecurityParams = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            "apiMethod": "/api/Common/GetSecurityParams"
                        }).catch(this.httpservice.handleError).then(function (res) {
                            var atweb = res.json();
                            _this.spinnerService.stop();
                            switch (atweb.StatType) {
                                case atparenums_1.StatusType.Success: {
                                    _this.securityParams = atweb.Data;
                                    break;
                                }
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ForgotComponent;
}());
ForgotComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'forgot-cmp',
        templateUrl: 'forgot.component.html',
        providers: [HttpService_1.HttpService]
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService,
        http_1.Http,
        event_spinner_service_1.SpinnerService,
        http_1.Jsonp,
        platform_browser_1.Title])
], ForgotComponent);
exports.ForgotComponent = ForgotComponent;
//# sourceMappingURL=forgot.component.js.map