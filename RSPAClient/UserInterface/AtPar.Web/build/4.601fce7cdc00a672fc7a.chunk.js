webpackJsonp([4],{

/***/ 1365:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(8);
var index_1 = __webpack_require__(1475);
var forms_1 = __webpack_require__(22);
var shared_module_1 = __webpack_require__(632);
var ForgotModule = (function () {
    function ForgotModule() {
    }
    return ForgotModule;
}());
ForgotModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            shared_module_1.SharedModule,
            index_1.ForgotRoutingModule
        ],
        declarations: [index_1.ForgotComponent],
        exports: [index_1.ForgotComponent]
    })
], ForgotModule);
exports.ForgotModule = ForgotModule;


/***/ }),

/***/ 1370:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AtParWebApiResponse = (function () {
    function AtParWebApiResponse() {
    }
    return AtParWebApiResponse;
}());
exports.AtParWebApiResponse = AtParWebApiResponse;


/***/ }),

/***/ 1475:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
*	This barrel file provides the export for the lazy loaded SignupComponent.
*/
__export(__webpack_require__(1771));
__export(__webpack_require__(1770));


/***/ }),

/***/ 1770:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(29);
var index_1 = __webpack_require__(1475);
exports.routes = [
    {
        path: '',
        component: index_1.ForgotComponent,
        data: { title: 'forgot password' }
    }
];
var ForgotRoutingModule = (function () {
    function ForgotRoutingModule() {
    }
    return ForgotRoutingModule;
}());
ForgotRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.routes)],
        exports: [router_1.RouterModule]
    })
], ForgotRoutingModule);
exports.ForgotRoutingModule = ForgotRoutingModule;


/***/ }),

/***/ 1771:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var HttpService_1 = __webpack_require__(12);
var http_1 = __webpack_require__(38);
var platform_browser_1 = __webpack_require__(58);
var AtParWebApiResponse_1 = __webpack_require__(1370);
var AtParStatusCodes_1 = __webpack_require__(50);
var CryptoJS = __webpack_require__(328);
var event_spinner_service_1 = __webpack_require__(24);
var AtParEnums_1 = __webpack_require__(14);
var AtParEnums_2 = __webpack_require__(14);
var AtParConstants_1 = __webpack_require__(31);
var ForgotComponent = (function () {
    function ForgotComponent(httpservice, http, spinnerService, jsonp, title, atParConstant) {
        var _this = this;
        this.httpservice = httpservice;
        this.http = http;
        this.spinnerService = spinnerService;
        this.jsonp = jsonp;
        this.title = title;
        this.atParConstant = atParConstant;
        this.mhsatparicon = "";
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
        //this.title.setTitle(AtParConstants.PRODUCT_NAME + ' - Forgot Password');
        this.title.setTitle('Forgot Password');
        try {
            this.jsonp.get('//api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK').
                subscribe(function (response) {
                return _this.ipAddress = response.json().ip;
            });
        }
        catch (ex) {
            this.errorMessage = "General Client Error";
            this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: this.errorMessage });
        }
    }
    ForgotComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString());
    };
    ForgotComponent.prototype.setDeviceTokenSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dateTime;
            return __generator(this, function (_a) {
                try {
                    dateTime = new Date().toLocaleString().toString();
                    this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID] = "";
                    this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DeviceID] = "";
                    this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DateTime] = dateTime;
                    this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ClientType] = AtParEnums_1.ClientType.WEB.toFixed().toString();
                    this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId] = "";
                    this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.AccessToken] = "";
                    this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage] = "";
                    this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.IdleTime] = "1000";
                    this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DeptID] = "";
                    this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.AppName] = "Init";
                    this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID] = "";
                    this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] = "";
                    this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.LdapUser] = "";
                    localStorage.setItem("DeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
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
            var exMsg_1;
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
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select a SystemID" });
                                return [2 /*return*/];
                            }
                        }
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.setDeviceTokenEntry(e.target.value.toString());
                        return [4 /*yield*/, this.httpservice.getSync({
                                "apiMethod": "/api/ForgotPassword/GetForgotHashPassword",
                                params: {
                                    "userID": this._userID
                                }
                            }).catch(this.httpservice.handleError)
                                .then(function (res) {
                                var res2 = res.json();
                                setTimeout(function () {
                                    _this.spinnerService.stop();
                                }, 500);
                                switch (res2.StatType) {
                                    case AtParEnums_2.StatusType.Success:
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
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res2.StatusMessage });
                                        _this.hintQuestion = '';
                                        _this.showHint = false;
                                        _this.userExist = false;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res2.StatusMessage });
                                        _this.hintQuestion = '';
                                        _this.showHint = false;
                                        _this.userExist = false;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res2.StatusMessage });
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
                        exMsg_1 = _a.sent();
                        this.clientErrorMsg(exMsg_1);
                        return [3 /*break*/, 4];
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
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select a SystemID" });
                return;
            }
        }
        if (user.npassword.trim() != user.cpassword.trim()) {
            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Password not matched' });
            return;
        }
        if (newPassword.match(" ")) {
            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Space is not allowed in Password' });
            return;
        }
        else {
            try {
                this.deviceID = this.ipAddress;
                this.setDeviceTokenEntry(user.userID);
                var key = CryptoJS.enc.Utf8.parse('8080808080808080');
                var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
                this.passHash = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(user.npassword.trim()), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                this.httpservice.get({
                    "apiMethod": "/api/ForgotPassword/GetForgotHashPassword",
                    params: {
                        "userId": this._userID,
                        "hintQ": this.hintQuestion,
                        "hintA": user.hanswer,
                        "pPassword": this.passHash
                    }
                }).catch(this.httpservice.handleError)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res2) {
                    switch (res2.StatType) {
                        case AtParEnums_2.StatusType.Success: {
                            _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Password Updated Successfully' });
                            _this.model = {};
                            _this.showHint = false;
                            _this.userExist = false;
                            form._submitted = false;
                            break;
                        }
                        case AtParEnums_2.StatusType.Warn: {
                            if (res2.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_PASSWORDMINLENGTH) {
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res2.StatusMessage.split("1%")[0] + " " + _this.securityParams.PASSWD_MIN_LENGTH });
                            }
                            else if (res2.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_PASSWORDMAXLENGTH) {
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res2.StatusMessage.split("1%")[0] + " " + _this.securityParams.PASSWD_MAX_LENGTH });
                            }
                            else {
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res2.StatusMessage });
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
                        case AtParEnums_2.StatusType.Error: {
                            _this.showHint = true;
                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res2.StatusMessage });
                            _this.model.hanswer = '';
                            _this.model.npassword = '';
                            _this.model.cpassword = '';
                            _this.userExist = true;
                            form._submitted = false;
                            var txtvalue = document.getElementById("hanswer");
                            txtvalue.focus();
                            break;
                        }
                        case AtParEnums_2.StatusType.Custom: {
                            _this.showHint = true;
                            _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res2.StatusMessage });
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
            catch (exMsg) {
                this.clientErrorMsg(exMsg);
            }
        }
    };
    ForgotComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.mhsatparicon = "assets/images/MHSAtpar.png";
                        return [4 /*yield*/, this.setDeviceTokenSession()];
                    case 1:
                        _a.sent();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.BindDropDown()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getSecurityParams()];
                    case 3:
                        _a.sent();
                        if (this.trSystemId === false) {
                            document.getElementById('userid').focus();
                        }
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
            var _a, i, exMsg_2;
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
                            case AtParEnums_2.StatusType.Success: {
                                if (this.systemData != null) {
                                    if (this.systemData.length > 1) {
                                        for (i = 0; i < this.systemData.length; i++) {
                                            this.values.push({
                                                label: this.systemData[i].SYSTEM_NAME + " (" + this.systemData[i].SYSTEM_ID + ")", value: this.systemData[i].SYSTEM_ID
                                            });
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
                            case AtParEnums_2.StatusType.Warn: {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.atweb.StatusMessage });
                                break;
                            }
                            case AtParEnums_2.StatusType.Error: {
                                this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: this.atweb.StatusMessage });
                                break;
                            }
                            case AtParEnums_2.StatusType.Custom: {
                                this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: this.atweb.StatusMessage });
                                break;
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        exMsg_2 = _b.sent();
                        this.clientErrorMsg(exMsg_2);
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
        //this._deviceTokenEntry[TokenEntry_Enum.SystemId] = (this.selectedValue == "" || this.selectedValue == undefined) ? this.hdnSystemId : this.selectedValue;
    };
    ForgotComponent.prototype.GetSystemIds = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.atweb = new AtParWebApiResponse_1.AtParWebApiResponse();
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
                        ex_1 = _a.sent();
                        this.spinnerService.stop();
                        this.errorMessage = "General Client Error";
                        this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: this.errorMessage });
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
                                case AtParEnums_2.StatusType.Success: {
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
    ForgotComponent.prototype.onChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(event != null)) return [3 /*break*/, 2];
                        this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId] = event.value;
                        this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID] = "";
                        this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.IdleTime] = "1000";
                        localStorage.setItem("DeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));
                        return [4 /*yield*/, this.GetSystemIds(event.value)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return ForgotComponent;
}());
ForgotComponent = __decorate([
    core_1.Component({
        selector: 'forgot-cmp',
        template: __webpack_require__(1982),
        providers: [HttpService_1.HttpService, AtParConstants_1.AtParConstants]
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService,
        http_1.Http,
        event_spinner_service_1.SpinnerService,
        http_1.Jsonp,
        platform_browser_1.Title,
        AtParConstants_1.AtParConstants])
], ForgotComponent);
exports.ForgotComponent = ForgotComponent;


/***/ }),

/***/ 1982:
/***/ (function(module, exports) {

module.exports = "<div class=\"accountbg\"></div>\r\n<div class=\"wrapper-page\">\r\n    <div class=\"panel panel-color panel-primary panel-pages\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-12\">\r\n                    <img [src]=\"mhsatparicon\" alt=\"\" class=\"img-responsive\" style=\"width:65%;margin:inherit;\">\r\n                    <br>\r\n                    <h3 class=\"\">Forgot Password</h3>\r\n                    <form action=\"login.html\" class=\"form-horizontal forgot-password-form m-t-20\" (ngSubmit)=\"f.form.valid && onSubmit(model,f) && userExist\" #f=\"ngForm\">\r\n                       \r\n\r\n                        <div class=\"form-group\">\r\n                            <div class=\"col-xs-12\">\r\n                                <!--<div class=\"input-wrap\">-->\r\n                                <div *ngIf=\"trSystemId\">\r\n                                    <span id=\"Label1\" class=\"SearchLabel\">System ID</span>\r\n                                    <atpar-select [options]=\"values\" [(ngModel)]=\"selectedValue\" [id]=\"'ddlvalues'\" [required]=\"true\" [ngModelOptions]=\"{standalone:true}\" (onChange)=\"onChange($event)\" [isfocus]=\"trSystemId\" ></atpar-select>\r\n                                </div>\r\n                                <!--</div>-->\r\n                                <div class=\"input-wrap\">\r\n                                    <label for=\"userID\" *ngIf=\"!f.submitted || model.userID\" [ngClass]=\"activelabel\">User Name &nbsp;<span class=\"text-danger\">*</span></label>\r\n                                    <input type=\"text\" class=\"form-control\" name=\"userID\" (focus)=\"labeluserid()\" (click)=\"labeluserid()\" [(ngModel)]=\"model.userID\" #userID=\"ngModel\" required autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" (blur)=\"onBlurUserid($event)\" id=\"userid\"/>\r\n                                </div>\r\n                                <div class=\"input-wrap\" id=\"hint-question\">\r\n                                    <label *ngIf=\"showHint\">Hint Question : <span>{{hintQuestion}}</span> </label>\r\n                                </div>\r\n                                <div class=\"input-wrap\">\r\n                                    <label for=\"hanswer\" *ngIf=\"!f.submitted || model.hanswer\" [ngClass]=\"activelabelH\">Hint Answer &nbsp;<span class=\"text-danger\">*</span></label>\r\n                                    <input type=\"password\" class=\"form-control\" name=\"hanswer\" id=\"hanswer\" (focus)=\"labelHint()\" (click)=\"labelHint()\" [(ngModel)]=\"model.hanswer\" #HAnswer=\"ngModel\" required autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" [disabled]=\"!userExist\" />\r\n\r\n                                </div>\r\n                                <div class=\"input-wrap\">\r\n                                    <label for=\"npassword\" *ngIf=\"!f.submitted || model.npassword\" [ngClass]=\"activelabelN\">New Password &nbsp;<span class=\"text-danger\">*</span></label>\r\n                                    <input (click)=\"labelNewpass()\" (focus)=\"labelNewpass()\" type=\"password\" class=\"form-control\" name=\"npassword\" [(ngModel)]=\"model.npassword\" #npassword=\"ngModel\" [disabled]=\"!userExist\" required />\r\n                                </div>\r\n                                <div class=\"input-wrap\">\r\n                                    <label for=\"cpassword\" *ngIf=\"!f.submitted || model.cpassword\" [ngClass]=\"activelabelC\">Confirm New Password &nbsp;<span class=\"text-danger\">*</span></label>\r\n                                    <input (click)=\"labelCpass()\" (focus)=\"labelCpass()\" type=\"password\" class=\"form-control\" name=\"cpassword\" [(ngModel)]=\"model.cpassword\" #cpassword=\"ngModel\" [disabled]=\"!userExist\" required />\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group text-center m-t-30 m-b-0\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-md-6\">\r\n                                    <button class=\"btn btn-primary btn-block btn-lg waves-light\" type=\"submit\" [disabled]=\"!userExist\">Submit &nbsp; <i class=\"fa fa-check\"></i></button>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-md-6\">\r\n                                    <button [routerLink]=\"['']\" class=\"btn btn-primary btn-block btn-lg waves-light\">Cancel &nbsp;<i class=\"fa fa-close\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <atpar-growl [value] =\"msgs\" sticky=\"sticky\"></atpar-growl>\r\n</div>\r\n\r\n<div class=\"hide\">\r\n    <!--waves-effect-->\r\n</div>\r\n\r\n\r\n<style>\r\n    .div-Error {\r\n        background-color: rgba(208, 211, 212, 0.2);\r\n        margin-top: 1%;\r\n        width: 95%;\r\n        margin-left: 10px;\r\n        border-radius: 4px;\r\n        height: 38px;\r\n        padding-top: 10px;\r\n    }\r\n\r\n    @media (max-width: 620px) {\r\n        .form-group input {\r\n            font-size: 15px !important;\r\n        }\r\n    }\r\n</style>";

/***/ })

});
//# sourceMappingURL=4.601fce7cdc00a672fc7a.chunk.js.map