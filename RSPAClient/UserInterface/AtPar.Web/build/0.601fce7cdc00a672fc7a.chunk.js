webpackJsonp([0],{

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

/***/ 1374:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Config = (function () {
    function Config() {
    }
    Config.getPath = function (value) {
        var apiEndPoint = window.location.protocol + "//" + window.location.hostname + "/AtPar/ReportingStarterApi/";
        // let apiEndPoint = "http://localhost/WebApi2StarterKit/";
        // let apiEndPoint = "http://Localhost/AtPar/ReportingStarterApi/"
        //debugger;
        switch (value) {
            case "register":
                return apiEndPoint + "api/Account/Register";
            case "login":
                return apiEndPoint + "Token";
            case "logout":
                return apiEndPoint + "api/Account/Logout";
            case "getizendatoken":
                return apiEndPoint + "api/User/GenerateToken";
            default:
                return "";
        }
    };
    return Config;
}());
exports.Config = Config;


/***/ }),

/***/ 1375:
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(38);
__webpack_require__(32);
var config_1 = __webpack_require__(1374);
var router_1 = __webpack_require__(29);
var AuthenticationService = (function () {
    function AuthenticationService(http, router) {
        this.http = http;
        this.router = router;
        // set token if saved in local storage
        var currentUser = localStorage.getItem('currentUser');
        this.token = localStorage.getItem('tokenKey');
    }
    AuthenticationService.prototype.login = function (tenantname, username, password) {
        var _this = this;
        var url = config_1.Config.getPath("login");
        var urlSearchParams = new http_1.URLSearchParams();
        urlSearchParams.append('grant_type', 'password');
        urlSearchParams.append('tenant', tenantname);
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);
        var body = urlSearchParams.toString();
        var headers = new http_1.Headers({ "Content-Type": "application/x-www-form-urlencoded" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .map(function (response) {
            var token = response.json() && response.json().access_token;
            console.log(token);
            if (token) {
                _this.token = token;
                localStorage.setItem('currentUser', username);
                localStorage.setItem('tokenKey', token);
                _this.getIzendaToken(token);
                return true;
            }
            else {
                return false;
            }
        });
    };
    //public async login(tenantname: string, username: string, password: string):Boolean {
    //    let url: string = Config.getPath("login");
    //    let urlSearchParams = new URLSearchParams();
    //    urlSearchParams.append('grant_type', 'password');
    //    urlSearchParams.append('tenant', tenantname);
    //    urlSearchParams.append('username', username);
    //    urlSearchParams.append('password', password);
    //    let body = urlSearchParams.toString();
    //    let headers: Headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded" });
    //    let options: RequestOptions = new RequestOptions({ headers: headers });
    //    return await this.http.post(url, body, options)
    //        .map((response: Response) => {
    //            let token = response.json() && response.json().access_token;
    //            console.log(token);
    //            if (token) {
    //                this.token = token;
    //                localStorage.setItem('currentUser', username);
    //                localStorage.setItem('tokenKey', token);
    //                this.getIzendaToken(token);
    //                return true;
    //            } else {
    //                return false;
    //            }
    //        });
    //}
    AuthenticationService.prototype.Newlogin = function (tenantname, username, password) {
        var _this = this;
        debugger;
        var url = config_1.Config.getPath("login");
        var urlSearchParams = new http_1.URLSearchParams();
        urlSearchParams.append('grant_type', 'password');
        urlSearchParams.append('tenant', tenantname);
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);
        var body = urlSearchParams.toString();
        var headers = new http_1.Headers({ "Content-Type": "application/x-www-form-urlencoded" });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(url, body, options)
            .map(function (response) {
            var token = response.json() && response.json().access_token;
            console.log(token);
            if (token) {
                _this.token = token;
                localStorage.setItem('currentUser', username);
                localStorage.setItem('tokenKey', token);
                _this.getIzendaToken(token);
                return true;
            }
            else {
                return false;
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        var url = config_1.Config.getPath("logout");
        var token = localStorage.getItem("tokenKey");
        var headers;
        if (token) {
            headers = new http_1.Headers({ "Authorization": 'Bearer ' + token });
        }
        var body = {};
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .subscribe(function (response) {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('tokenKey');
            localStorage.removeItem('izendatoken');
        }, function (err) {
            console.log(err);
        });
    };
    AuthenticationService.prototype.register = function (tenantname, username, password, confirmpassword) {
        var url = config_1.Config.getPath("register");
        var headers = new http_1.Headers({ "Content-Type": "application/json; charset=utf-8" });
        var body = JSON.stringify({ Tenant: tenantname, Email: username, Password: password, ConfirmPassword: confirmpassword });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .map(function (response) {
            if (response.status >= 200 && response.status < 300) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    AuthenticationService.prototype.getIzendaToken = function (token) {
        var url = config_1.Config.getPath("getizendatoken");
        var headers = new http_1.Headers({ "Authorization": 'Bearer ' + token });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.get(url, options)
            .subscribe(function (data) {
            console.log(data.json());
            localStorage.setItem("izendatoken", data.json());
        }, function (error) {
            console.log("Cannot get Izenda Token");
            console.log(error);
        });
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;


/***/ }),

/***/ 1529:
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
var core_1 = __webpack_require__(0);
var CryptoJS = __webpack_require__(328);
var router_1 = __webpack_require__(29);
var forms_1 = __webpack_require__(22);
__webpack_require__(32);
__webpack_require__(168);
var linqts_1 = __webpack_require__(327);
var platform_browser_1 = __webpack_require__(58);
var AtParWebApiResponse_1 = __webpack_require__(1370);
var AtParEnums_1 = __webpack_require__(14);
var AtParStatusCodes_1 = __webpack_require__(50);
var login_service_1 = __webpack_require__(1797);
//import { CustomValidators } from '../common/textbox/custom-validators';
var event_spinner_service_1 = __webpack_require__(24);
var MenusService_1 = __webpack_require__(1696);
var routepath_1 = __webpack_require__(70);
var authentication_service_1 = __webpack_require__(1375);
var AtParConstants_1 = __webpack_require__(31);
var izendaintegrate_1 = __webpack_require__(326);
var HttpService_1 = __webpack_require__(12);
var leftbar_animation_service_1 = __webpack_require__(229);
var platform_browser_2 = __webpack_require__(58);
var LoginComponent = (function () {
    function LoginComponent(fb, router, loginService, route, spinnerService, menulistService, authenticationservice, title, izItergrate, atParConstant, leftBarAnimationsewrvice, document, httpService) {
        this.fb = fb;
        this.router = router;
        this.loginService = loginService;
        this.route = route;
        this.spinnerService = spinnerService;
        this.menulistService = menulistService;
        this.authenticationservice = authenticationservice;
        this.title = title;
        this.izItergrate = izItergrate;
        this.atParConstant = atParConstant;
        this.leftBarAnimationsewrvice = leftBarAnimationsewrvice;
        this.document = document;
        this.httpService = httpService;
        this.model = {};
        this.mhsicon = "";
        this.visibleUserID = false;
        this.visiblePassword = false;
        this.trSystemId = false;
        this.isSSOEnabled = false;
        this.statusCode = -1;
        this.userId = "";
        this.password = "";
        this.deviceID = "";
        this.systemID = "";
        this.dateTime = "";
        this.accessToken = "";
        this.errorCode = "";
        this._dbConnectionString = "";
        this.strServer = "";
        this.strDatabase = "";
        this.strUserID = "";
        this.strPassword = "";
        this.strSSOVariable = "";
        this.strSSOCookie = "";
        this.strSSOLogout = "";
        this.strSystemId = "";
        this.hdnSystemId = "";
        this.strSSOUser = "";
        this.gStrSSOUser = "";
        this.selectedDB = "";
        this.statusMessage = "";
        this.dropdownData = [];
        this.msgs = [];
        this._deviceTokenEntry = [];
        this.breadCrumbName = "";
        this.savedUserID = true;
        this.savedPassword = true;
        try {
            debugger;
            this.mhsicon = "assets/images/MHSAtpar.png";
            this.httpService.clearAppSession();
            localStorage.setItem('isTrackITLogin', AtParEnums_1.YesNo_Enum.N.toString());
            this.title.setTitle('Login');
            this.visibleUserID = false;
            this.visiblePassword = false;
            this.lstAppGroups = new linqts_1.List();
            this.lstApps = new linqts_1.List();
            this.lstMenus = new linqts_1.List();
            HttpService_1.HttpService.previousTime = new Date();
            this.myForm = this.fb.group({
                userID: ['', forms_1.Validators.required],
                password: ['', forms_1.Validators.required],
            });
            this.breadCrumbMenu = new routepath_1.Menus();
            debugger;
            alert(navigator.onLine);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "constructor");
        }
    }
    LoginComponent.prototype.onFocusUserName = function () {
        try {
            if (this.model.userID == "undefined") {
                this.visibleUserID = !this.visibleUserID;
            }
            else {
                this.visibleUserID = true;
            }
            ;
            this.activeLblUserID = this.visibleUserID ? 'input-disturbed' : 'hide-class';
            this.savedUserID = false;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onFocusUserName");
        }
    };
    LoginComponent.prototype.onFocusPassword = function () {
        try {
            if (this.model.password == "undefined") {
                this.visiblePassword = !this.visiblePassword;
            }
            else {
                this.visiblePassword = true;
            }
            this.activeLblPassword = this.visiblePassword ? 'input-disturbed' : 'hide-class';
            this.savedPassword = false;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onFocusPassword");
        }
    };
    LoginComponent.prototype.formKeyPressEvent = function (event) {
        try {
            if (event.charCode == 13) {
                if (this.model.userID == null || this.model.userID == undefined || this.model.userID == '') {
                    document.getElementById("txtUserID").focus();
                }
                else if (this.model.password == null || this.model.password == undefined || this.model.password == '') {
                    document.getElementById("txtPassword").focus();
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "formKeyPressEvent");
        }
    };
    LoginComponent.prototype.onSubmit = function (userId, password) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, ex_1, ex_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        if (userId == null || userId == "" || userId == undefined) {
                            this.statusMessage = "Please enter Valid User ID";
                            document.getElementById("txtUserID").focus();
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                            return [2 /*return*/];
                        }
                        if (password == null || password == "" || password == undefined) {
                            this.statusMessage = "Please enter Valid Password";
                            document.getElementById("txtPassword").focus();
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                            return [2 /*return*/];
                        }
                        this.userId = userId.toUpperCase();
                        if ((document.getElementById("txtPassword").value == null)
                            || (document.getElementById("txtPassword").value == '')) {
                            this.model.password = null;
                            return [2 /*return*/];
                        }
                        localStorage.setItem("userId", userId);
                        if (this.trSystemId == true) {
                            if (this.selectedDB == null || this.selectedDB == "" ||
                                this.selectedDB == undefined || this.selectedDB == "Select System ID") {
                                this.statusMessage = "Please select a SystemId";
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                                return [2 /*return*/];
                            }
                        }
                        if (!(typeof this.hdnSystemId.trim() != 'undefined' && this.hdnSystemId)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.hdnSystemId];
                    case 1:
                        _a.systemID = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.systemID = this.selectedDB;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.loginService.GetIpAddress()
                                .then(function (res) {
                                var data = res.json();
                                _this.deviceID = data.DataVariable.toString();
                            })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        ex_1 = _b.sent();
                        this.clientErrorMsg(ex_1, "onSubmit");
                        console.log('GetIpAddress failed :' + ex_1.toString());
                        return [3 /*break*/, 6];
                    case 6:
                        this.DoLogin(this.userId, password, this.deviceID, this.pSSOByPass, this.systemID);
                        return [3 /*break*/, 8];
                    case 7:
                        ex_2 = _b.sent();
                        this.clientErrorMsg(ex_2, "onSubmit");
                        console.log('on submit failed :' + ex_2.toString());
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.DoLogin = function (userID, password, deviceID, pSSOByPass, SystemID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var key, iv, ex_3, orgGrpId_1, ex_4, ex_5, ex_6, dateStr, ex_7, tenant, username1, password1, iztoken, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 18, , 19]);
                        this.msgs = [];
                        HttpService_1.HttpService.previousTime = new Date();
                        key = CryptoJS.enc.Utf8.parse('8080808080808080');
                        iv = CryptoJS.enc.Utf8.parse('8080808080808080');
                        // Storing Password for Old application will remove later
                        localStorage.setItem("UserLoginPwd", password);
                        this.passHash = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.loginService.GetAppRoleIDs(userID)
                                .then(function (res) {
                                var data = res.json();
                                _this.roleIds = data.DataList;
                                if (_this.roleIds != null) {
                                    if (_this.roleIds.length > 0) {
                                        _this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.LdapUser] = _this.roleIds[0].LDAP_USER;
                                        _this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID] = _this.roleIds[0].PROFILE_ID;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "DoLogin");
                        console.log('GetAppRoleIDs failed:' + ex_3.toString());
                        return [3 /*break*/, 4];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        orgGrpId_1 = "";
                        return [4 /*yield*/, this.loginService.GetUserOrgGrpID(userID)
                                .then(function (res) {
                                var data = res.json();
                                if (data.DataVariable != null && data.DataVariable != "") {
                                    orgGrpId_1 = data.DataVariable.toString();
                                    _this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] = data.DataVariable.toString();
                                    sessionStorage.setItem("OrgGroupID", orgGrpId_1);
                                }
                            })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "DoLogin");
                        console.log('GetUserOrgGrpID failed :' + ex_4.toString());
                        return [3 /*break*/, 7];
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, this.loginService.GetRecordsPerPage(userID)
                                .then(function (res) {
                                var data1 = res.json();
                                if (data1.Data != null) {
                                    _this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage] = data1.Data.RECORDS_PER_PAGE.toString();
                                    if (data1.Data.IDLE_TIME != null) {
                                        _this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.IdleTime] = data1.Data.IDLE_TIME.toString();
                                    }
                                }
                            })];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "DoLogin");
                        console.log('GetRecordsPerPage failed:' + ex_5.toString());
                        return [3 /*break*/, 10];
                    case 10:
                        _a.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, this.UpdateIzendaHosting(window.location.protocol.toString() + "//" + window.location.hostname.toString())];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "DoLogin");
                        console.log('UpdateIzendaHosting failed:' + ex_6.toString());
                        return [3 /*break*/, 13];
                    case 13:
                        this.pSSOByPass = false;
                        this.accessToken = "";
                        this.dateTime = new Date().toLocaleString().toString();
                        dateStr = new Date().toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        this.dateTime = dateStr.replace(',', '');
                        this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID] = userID;
                        this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DeviceID] = deviceID;
                        this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DateTime] = this.dateTime;
                        this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ClientType] = AtParEnums_1.ClientType.WEB.toFixed().toString();
                        this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId] = SystemID;
                        this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.AccessToken] = "";
                        this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.AppName] = AtParEnums_1.EnumApps[AtParEnums_1.EnumApps.Init].toString();
                        localStorage.setItem("DeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));
                        _a.label = 14;
                    case 14:
                        _a.trys.push([14, 16, , 17]);
                        return [4 /*yield*/, this.loginService.GetAccessToken(userID, this.passHash, AtParEnums_1.ClientType.WEB, this.dateTime, this.deviceID, this.accessToken, this.pSSOByPass)
                                .subscribe(function (response) {
                                var data = response.json();
                                _this.accessTokenXML = data.DataVariable,
                                    _this.statusCode = data.StatusCode;
                                _this.statusType = data.StatType;
                                _this.statusMessage = data.StatusMessage;
                                switch (_this.statusType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.GetConnectionDetails(JSON.parse(localStorage.getItem("DeviceTokenEntry")));
                                        _this.GetMenuList();
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.setDeviceTokenSession();
                                        _this.spinnerService.stop();
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: _this.statusMessage });
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.spinnerService.stop();
                                        if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_PASSWORDEXPIRED ||
                                            _this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_PASSWORDRESETREQ) {
                                            var navigationExtras = {
                                                queryParams: { 'userId': _this.userId }
                                            };
                                            _this.breadCrumbMenu.APP_NAME = 'Change Password';
                                            _this.breadCrumbMenu.ROUTE = 'changepassword';
                                            _this.breadCrumbMenu.IS_DIV = false;
                                            //var�groupModules�=�this.breadCrumbMenu;
                                            localStorage.setItem('BreadCrumbMenus', JSON.stringify(_this.breadCrumbMenu));
                                            _this.router.navigate(['atpar/changepassword'], navigationExtras);
                                        }
                                        else {
                                            _this.setDeviceTokenSession();
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: _this.statusMessage });
                                            var txtvalue = document.getElementById("txtUserID");
                                            var txtpsw = document.getElementById("txtPassword");
                                            txtpsw.value = null;
                                            txtvalue.focus();
                                        }
                                        break;
                                    case AtParEnums_1.StatusType.Custom:
                                        _this.setDeviceTokenSession();
                                        _this.spinnerService.stop();
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'custom', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: _this.statusMessage });
                                        break;
                                    default:
                                        _this.setDeviceTokenSession();
                                        _this.spinnerService.stop();
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Login Failed" });
                                        break;
                                }
                            })];
                    case 15:
                        _a.sent();
                        return [3 /*break*/, 17];
                    case 16:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "DoLogin");
                        console.log('GetAccessToken failed :' + ex_7.toString());
                        return [3 /*break*/, 17];
                    case 17:
                        try {
                            this.izItergrate.DoIzendaConfig();
                            if (userID == 'ADMIN') {
                                tenant = undefined;
                                username1 = 'IzendaAdmin@system.com';
                                password1 = 'Izenda@123';
                            }
                            else {
                                tenant = 'AtParMT';
                                username1 = userID;
                                password1 = 'AtparReports@123';
                            }
                            iztoken = this.authenticationservice.login(tenant, username1, password1)
                                .subscribe(function (result) {
                                if (result === true) {
                                    console.log('reports login successful');
                                }
                                else {
                                    console.log('reports login failed');
                                }
                            }, function (error) {
                                console.log(error);
                            });
                        }
                        catch (ex) {
                            this.clientErrorMsg(ex, "DoLogin");
                            console.log('reports login failed');
                        }
                        return [3 /*break*/, 19];
                    case 18:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "DoLogin");
                        console.log('reports login failed :' + ex_8.toString());
                        return [3 /*break*/, 19];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.UpdateIzendaHosting = function (hostName) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.loginService.UpdateIzendaHosting(hostName).then(function (res) {
                                var data = res.json();
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "UpdateIzendaHosting");
                        console.log('UpdateIzendaHosting failed :' + ex_9.toString());
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.GetSystemIds = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_10, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.atweb = new AtParWebApiResponse_1.AtParWebApiResponse();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.loginService.GetSystemIDs(data)
                                .then(function (res) {
                                debugger;
                                var data = res.json();
                                _this.atweb = data;
                            }).catch(function (res) {
                                debugger;
                                alert('offline mode');
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.atweb];
                    case 3:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, "GetSystemIds");
                        console.log('GetSystemIDs failed :' + ex_10.toString());
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "GetSystemIds");
                        console.log('GetSystemIDs failed :' + ex_11.toString());
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var samplResponse, strSSOUser, redirect, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        debugger;
                        samplResponse = '';
                        strSSOUser = '';
                        return [4 /*yield*/, this.setDeviceTokenSession()];
                    case 1:
                        _a.sent();
                        this.spinnerService.start();
                        this.route.queryParams.subscribe(function (params) {
                            _this.message = params['statusMessage'];
                            if (_this.message != '' && _this.message != null) {
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.message });
                            }
                        });
                        this.route.queryParams.subscribe(function (params) {
                            redirect = params['redirected'];
                        });
                        if (HttpService_1.HttpService.redirect == "Y") {
                            this.statusMessage = "Session Expired";
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                        }
                        return [4 /*yield*/, this.getLoginTemplateStyle()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.LoadData()];
                    case 3:
                        _a.sent();
                        if (this.hdnSystemId.trim() == "" || this.hdnSystemId == "" || this.hdnSystemId == undefined) {
                            this.BindDropDown();
                        }
                        //await this.loginService.IsSSOEnabled()
                        //    .then((res: Response) => {
                        //        let data = res.json() as AtParWebApiResponse<number>;
                        //        switch (data.StatType) {
                        //            case StatusType.Success: {
                        //                this.statusCode = data.StatusCode;
                        //                this.statusType = data.StatType
                        //                this.isSSOEnabled = data.DataDictionary['isEnabled'];
                        //                this.strSSOVariable = data.DataDictionary['SSOVariable'];
                        //                this.strSSOCookie = data.DataDictionary['SSOCookie'];
                        //                this.strSSOLogout = data.DataDictionary['SSORedirect'];
                        //                break;
                        //            }
                        //            case StatusType.Error: {
                        //                this.msgs = [];
                        //                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get the SSO Check value" });
                        //                break;
                        //            }
                        //            case StatusType.Warn: {
                        //                if (data.StatusCode == AtparStatusCodes.E_ATPARSERVICESTOPPED) {
                        //                    this.msgs = [];
                        //                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "AtPar application service is stopped, this should be running to communicate with server." });
                        //                }
                        //                this.msgs = [];
                        //                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        //                break;
                        //            }
                        //            case StatusType.Custom: {
                        //                this.msgs = [];
                        //                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        //                break;
                        //            }
                        //        }
                        //        if (data.StatType != StatusType.Success) {
                        //            return;
                        //        }
                        //        if (this.isSSOEnabled == true) {
                        //            this.GetConnectionDetails(JSON.parse(localStorage.getItem("DeviceTokenEntry")));
                        //            if (this.strSSOVariable != null || this.strSSOVariable != '' || this.strSSOVariable != undefined) {
                        //                this.route.queryParams.subscribe((params: Params) => {
                        //                    samplResponse = params['SAMLResponse'];
                        //                });
                        //                this.loginService.GetSAMLResponse(this.strSSOVariable)
                        //                    .then((res: Response) => {
                        //                        let data = res.json() as AtParWebApiResponse<number>;
                        //                        let inputLength = data.DataDictionary["inputLenth"];
                        //                        if (inputLength != 0) {
                        //                            if (samplResponse != null) {
                        //                                if (samplResponse.length > 0) {
                        //                                    this.loginService.ValidateSamlResponse(this.strSSOVariable)
                        //                                        .then((res: Response) => {
                        //                                            let data = res.json() as AtParWebApiResponse<number>;
                        //                                            return;
                        //                                        });
                        //                                }
                        //                            }
                        //                        }
                        //                        strSSOUser = data.DataDictionary["strSSOUser"];
                        //                        strSSOUser = strSSOUser.toUpperCase();
                        //                        localStorage.setItem("userId", strSSOUser);
                        //                        this.gStrSSOUser = strSSOUser;
                        //                    });
                        //            }
                        //            this.SSOLogin(strSSOUser, this.isSSOEnabled);
                        //        }
                        //        else {
                        //            if (this.hdnSystemId.trim() == "" || this.hdnSystemId != "") {
                        //                this.trSystemId = false;
                        //            }
                        //            else {
                        //                this.trSystemId = true;
                        //            }
                        //            this.gStrSSOUser = '';
                        //        }
                        //    });
                        debugger;
                        return [3 /*break*/, 6];
                    case 4:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12, "ngOnInit");
                        console.log('ngOnInit failed :' + ex_12.toString());
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.getLoginTemplateStyle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wheight, loginHeight, loginWidth, wWidth, loginElement;
            return __generator(this, function (_a) {
                try {
                    wheight = void 0;
                    loginHeight = void 0;
                    loginWidth = void 0;
                    wWidth = void 0;
                    wheight = window.innerHeight;
                    wWidth = window.innerWidth;
                    loginElement = document.getElementById('divlogin');
                    loginHeight = loginElement.clientHeight;
                    loginWidth = loginElement.clientWidth;
                    loginElement.style.setProperty('margin', (((wheight / 100) * 45) - (loginHeight / 2)) + 'px ' + '0 0 ' + ((wWidth / 2) - (loginWidth / 2)) + 'px');
                }
                catch (ex) {
                    this.clientErrorMsg(ex, 'getLoginTemplateStyle');
                }
                return [2 /*return*/];
            });
        });
    };
    LoginComponent.prototype.setDeviceTokenSession = function () {
        try {
            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID] = "";
            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DeviceID] = "";
            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DateTime] = this.dateTime;
            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ClientType] = AtParEnums_1.ClientType.WEB.toFixed().toString();
            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId] = "";
            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.AccessToken] = "";
            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.IdleTime] = "1000";
            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DeptID] = "";
            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.AppName] = AtParEnums_1.EnumApps[AtParEnums_1.EnumApps.Init].toString();
            localStorage.setItem("DeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));
        }
        catch (ex) {
            this.clientErrorMsg(ex, "setDeviceTokenSession");
            console.log('setDeviceTokenSession failed :' + ex.toString());
        }
    };
    LoginComponent.prototype.LoadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var querySystemID, _a, ex_13;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        this.route.queryParams.subscribe(function (params) {
                            querySystemID = params['systemid'];
                        });
                        if (!(querySystemID != null)) return [3 /*break*/, 4];
                        if (!(querySystemID.trim() != "")) return [3 /*break*/, 2];
                        // Checks whether the systemid from the query string exists in the DB or not
                        this.strSystemId = querySystemID.toUpperCase();
                        return [4 /*yield*/, this.CheckSystemID(this.strSystemId)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.hdnSystemId = "";
                        this.trSystemId = false;
                        _b.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        _a = this;
                        return [4 /*yield*/, this.GetSystemIds("")];
                    case 5:
                        _a.atweb = _b.sent();
                        this.systemData = this.atweb.DataList;
                        sessionStorage.setItem("lstSystemIDs", JSON.stringify(this.systemData));
                        this.statusCode = this.atweb.StatusCode;
                        this.statusType = this.atweb.StatType;
                        this.statusMessage = this.atweb.StatusMessage;
                        switch (this.statusType) {
                            case AtParEnums_1.StatusType.Success: {
                                if (this.systemData.length > 1) {
                                    return [2 /*return*/];
                                }
                                else {
                                    this.hdnSystemId = this.systemData[0].SYSTEM_ID;
                                    this.trSystemId = false;
                                    this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId] = this.hdnSystemId;
                                }
                                break;
                            }
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
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        ex_13 = _b.sent();
                        this.clientErrorMsg(ex_13, "LoadData");
                        console.log('LoadData failed :' + ex_13.toString());
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.GetConnectionDetails = function (_deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.systemData = (JSON.parse(sessionStorage.getItem("lstSystemIDs"))).filter(function (x) { return x.SYSTEM_ID == _deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId]; });
                    if (this.systemData != null) {
                        if (this.systemData.length > 0) {
                            this.strServer = this.systemData[0].SERVER;
                            this.strDatabase = this.systemData[0].DATASOURCE;
                            this.strUserID = this.systemData[0].USERID;
                            this.strPassword = this.systemData[0].PASSWORD;
                        }
                    }
                    this._dbConnectionString = "data source=" + this.strServer + ";database=" + this.strDatabase + ";user id=" + this.strUserID + ";password=" + this.strPassword;
                    localStorage.setItem("LocalDbConncetionString", this._dbConnectionString);
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "GetConnectionDetails");
                    console.log('GetConnectionDetails failed :' + ex.toString());
                }
                return [2 /*return*/];
            });
        });
    };
    LoginComponent.prototype.GetMenuList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        this.lstAppGroups = new linqts_1.List();
                        this.lstApps = new linqts_1.List();
                        this.lstMenus = new linqts_1.List();
                        return [4 /*yield*/, this.menulistService.getGroupMenuList(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .then(function (res) {
                                try {
                                    var data = res.json();
                                    switch (data.StatType) {
                                        case AtParEnums_1.StatusType.Success: {
                                            _this.statusCode = data.StatusCode;
                                            _this.statusType = data.StatType;
                                            _this.lstAppGroups = data.DataDictionary['lstAppGroups'];
                                            _this.lstApps = data.DataDictionary['lstApps'];
                                            _this.lstMenus = data.DataDictionary['lstMenus'];
                                            _this.lstRepMenus = data.DataDictionary['lstReportMenus'];
                                            localStorage.setItem('MenuList', JSON.stringify(_this.lstMenus));
                                            localStorage.setItem('AppGroups', JSON.stringify(_this.lstAppGroups));
                                            localStorage.setItem('Apps', JSON.stringify(_this.lstApps));
                                            localStorage.setItem('ReportMenus', JSON.stringify(_this.lstRepMenus));
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
                                        return;
                                    }
                                }
                                catch (ex) {
                                    _this.clientErrorMsg(ex, "GetMenuList");
                                    console.log('getGroupMenuList failed :' + ex.toString());
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.breadCrumbMenu.APP_NAME = "Home";
                        this.breadCrumbMenu.MENU_NAME = "";
                        return [4 /*yield*/, this.router.navigate(['atpar'])];
                    case 2:
                        _a.sent();
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        return [3 /*break*/, 5];
                    case 3:
                        ex_14 = _a.sent();
                        this.clientErrorMsg(ex_14, "GetMenuList");
                        console.log('getGroupMenuList failed :' + ex_14.toString());
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.BindDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                try {
                    this.systemData = JSON.parse(sessionStorage.getItem("lstSystemIDs"));
                    this.dropdownData.push({ label: "Select System ID", value: "Select System ID" });
                    if (this.systemData != null) {
                        if (this.systemData.length > 1) {
                            for (i = 0; i < this.systemData.length; i++) {
                                this.dropdownData.push({
                                    label: this.systemData[i].SYSTEM_NAME + " (" + this.systemData[i].SYSTEM_ID + ")", value: this.systemData[i].SYSTEM_ID
                                });
                                this.trSystemId = true;
                            }
                        }
                        else {
                            this.hdnSystemId = this.systemData[0].SYSTEM_ID;
                            this.trSystemId = false;
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "BindDropDown");
                    console.log('BindDropDown failed :' + ex.toString());
                }
                return [2 /*return*/];
            });
        });
    };
    LoginComponent.prototype.CheckSystemID = function (pSystemID) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, strFilter, ex_15;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, this.GetSystemIds(pSystemID)];
                    case 1:
                        _a.atweb = _b.sent();
                        this.systemData = this.atweb.DataList,
                            this.statusCode = this.atweb.StatusCode;
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            strFilter = "";
                            strFilter = pSystemID;
                            if (this.systemData != null) {
                                if (this.systemData.length > 0) {
                                    this.systemRowData = this.systemData.filter(function (x) { return x.SYSTEM_ID.toUpperCase() == strFilter; });
                                }
                            }
                            if (this.systemRowData != null) {
                                this.statusType = AtParEnums_1.StatusType.Success;
                            }
                            else {
                                this.statusType = AtParEnums_1.StatusType.Warn;
                            }
                        }
                        else {
                            this.statusType = this.atweb.StatType;
                        }
                        switch (this.statusType) {
                            case AtParEnums_1.StatusType.Success:
                                this.hdnSystemId = this.strSystemId;
                                this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId] = this.strSystemId;
                                this.trSystemId = false;
                                break;
                            case AtParEnums_1.StatusType.Error:
                                this.statusMessage = this.atweb.StatusMessage;
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                                this.hdnSystemId = "";
                                this.trSystemId = false;
                                break;
                            case AtParEnums_1.StatusType.Warn:
                                this.statusMessage = this.atweb.StatusMessage;
                                if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    this.statusMessage = "Not a valid system id.";
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                                    return [2 /*return*/];
                                }
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                                this.hdnSystemId = "";
                                this.trSystemId = false;
                                break;
                            case AtParEnums_1.StatusType.Custom:
                                this.msgs = [];
                                this.msgs.push({ severity: 'custom', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: this.statusMessage });
                                break;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_15 = _b.sent();
                        this.clientErrorMsg(ex_15, "CheckSystemID");
                        console.log('CheckSystemID failed :' + ex_15.toString());
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.onChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId] = this.selectedDB;
                    localStorage.setItem("DeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "onChange");
                    console.log('onChange failed :' + ex.toString());
                }
                return [2 /*return*/];
            });
        });
    };
    LoginComponent.prototype.clientErrorMsg = function (ex, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString(), funName, this.constructor.name);
    };
    LoginComponent.prototype.SSOLogin = function (_strSSOUser, _IsSSOEnabled) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, this.loginService.IsValidUser(_strSSOUser)
                                .then(function (res) {
                                var data = res.json();
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.msgs = [];
                                    _this.msgs.push({
                                        severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Not a Valid User"
                                    });
                                    return;
                                }
                                if (data.DataVariable == true) {
                                    _this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID] = _strSSOUser;
                                    _this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DeviceID] = _this.deviceID;
                                    _this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DateTime] = _this.dateTime;
                                    ;
                                    _this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ClientType] = AtParEnums_1.ClientType.WEB.toString();
                                }
                                if (typeof _this.hdnSystemId.trim() != 'undefined' && _this.hdnSystemId) {
                                    _this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId] = _this.hdnSystemId;
                                }
                                localStorage.setItem("DeviceTokenEntry", JSON.stringify(_this._deviceTokenEntry));
                                _this.loginService.GetAccessToken(_strSSOUser, '', AtParEnums_1.ClientType.WEB, _this.dateTime, _this.deviceID, '', _this.pSSOByPass)
                                    .subscribe(function (response) {
                                    var data = response.json();
                                    _this.accessTokenXML = data.DataVariable,
                                        _this.statusCode = data.StatusCode;
                                    _this.statusType = data.StatType;
                                    _this.statusMessage = data.StatusMessage;
                                    switch (_this.statusType) {
                                        case AtParEnums_1.StatusType.Success:
                                            _this.GetMenuList();
                                            break;
                                        case AtParEnums_1.StatusType.Error:
                                            _this.setDeviceTokenSession();
                                            _this.spinnerService.stop();
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: _this.statusMessage });
                                            break;
                                        case AtParEnums_1.StatusType.Warn:
                                            _this.spinnerService.stop();
                                            if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_PASSWORDEXPIRED ||
                                                _this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_PASSWORDRESETREQ) {
                                                var navigationExtras = {
                                                    queryParams: { 'userId': _this.userId }
                                                };
                                                _this.router.navigate(['atpar/changepassword'], navigationExtras);
                                            }
                                            else {
                                                _this.setDeviceTokenSession();
                                                _this.msgs = [];
                                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: _this.statusMessage });
                                                var txtvalue = document.getElementById("txtUserID");
                                                var txtpsw = document.getElementById("txtPassword");
                                                txtpsw.value = null;
                                                txtvalue.focus();
                                            }
                                            break;
                                        case AtParEnums_1.StatusType.Custom:
                                            _this.setDeviceTokenSession();
                                            _this.spinnerService.stop();
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'custom', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: _this.statusMessage });
                                            break;
                                        default:
                                            _this.setDeviceTokenSession();
                                            _this.spinnerService.stop();
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: "Login Failed" });
                                            break;
                                    }
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        ex_16 = _a.sent();
                        return [4 /*yield*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.OnDestroy = function () {
        this.model = null;
        this.visibleUserID = null;
        this.activeLblUserID = null;
        this.activeLblPassword = null;
        this.visiblePassword = null;
        this.menus = null;
        this.lstMenus = null;
        this.userId = null;
        this.password = null;
        this.deviceID = null;
        this.systemID = null;
        this.pSSOByPass = null;
        this.dateTime = null;
        this.accessToken = null;
        this.accessTokenXML = null;
        this.systemData = null;
        this.errorCode = null;
        this.systemRowData = null;
        this.strServer = null;
        this.strDatabase = null;
        this.strUserID = null;
        this.strPassword = null;
        this.trSystemId = null;
        this.statusCode = -1;
        this.isSSOEnabled = null;
        this.isValidUser = null;
        this.strSSOVariable = null;
        this.strSSOCookie = null;
        this.strSSOLogout = null;
        this.strSystemId = null;
        this.hdnSystemId = null;
        this.strSSOUser = null;
        this.gStrSSOUser = null;
        this.ipAddress = null;
        this.passHash = null;
        this.decryptpassword = null;
        this.roleIds = null;
        this.atweb = null;
        this.userToken = null;
        this.selectedDB = null;
        this.statusMessage = null;
        this.statusType = null;
        this.msgs = null;
        this.spinnerService.stop();
        this.spinnerService = null;
        this._dbConnectionString = null;
        this.dropdownData = null;
        this._deviceTokenEntry = null;
        this.lstApps = null;
        this.lstAppGroups = null;
        this.myForm = null;
        this.ipData = null;
    };
    return LoginComponent;
}());
__decorate([
    core_1.ViewChild('userID'),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "user", void 0);
__decorate([
    core_1.ViewChild('f'),
    __metadata("design:type", Object)
], LoginComponent.prototype, "formGroup", void 0);
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login-cmp',
        template: __webpack_require__(2025),
        providers: [
            MenusService_1.MenuServices,
            login_service_1.loginService,
            authentication_service_1.AuthenticationService,
            AtParConstants_1.AtParConstants,
            HttpService_1.HttpService
        ],
    }),
    __param(11, core_1.Inject(platform_browser_2.DOCUMENT)),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        router_1.Router,
        login_service_1.loginService,
        router_1.ActivatedRoute,
        event_spinner_service_1.SpinnerService,
        MenusService_1.MenuServices,
        authentication_service_1.AuthenticationService,
        platform_browser_1.Title,
        izendaintegrate_1.IzendaIntegrate,
        AtParConstants_1.AtParConstants,
        leftbar_animation_service_1.LeftBarAnimationService, Object, HttpService_1.HttpService])
], LoginComponent);
exports.LoginComponent = LoginComponent;


/***/ }),

/***/ 1530:
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
var index_1 = __webpack_require__(1796);
exports.routes = [
    { path: '', component: index_1.LoginComponent, data: { title: 'Login' } },
    { path: '/:psystemid', component: index_1.LoginComponent }
];
var LoginRoutingModule = (function () {
    function LoginRoutingModule() {
    }
    return LoginRoutingModule;
}());
LoginRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.routes)],
        exports: [router_1.RouterModule]
    })
], LoginRoutingModule);
exports.LoginRoutingModule = LoginRoutingModule;


/***/ }),

/***/ 1696:
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
__webpack_require__(32);
var Rx_1 = __webpack_require__(37);
var HttpService_1 = __webpack_require__(12);
//import { RoutersData } from '../Entities/RouterPath';
var MenuServices = (function () {
    function MenuServices(httpservice) {
        this.httpservice = httpservice;
    }
    MenuServices.prototype.getGroupMenuList = function (profileID, userID) {
        return this.httpservice.getSync({
            "apiMethod": "/api/User/GetGroupMenusList",
            params: {
                "ProfileID": profileID,
                "UserID": userID
            }
        });
    };
    MenuServices.prototype.handleError = function (error) {
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return MenuServices;
}());
MenuServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], MenuServices);
exports.MenuServices = MenuServices;


/***/ }),

/***/ 1796:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This barrel file provides the export for the lazy loaded AboutComponent.
 */
__export(__webpack_require__(1529));
__export(__webpack_require__(1530));


/***/ }),

/***/ 1797:
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
var http_1 = __webpack_require__(38);
var HttpService_1 = __webpack_require__(12);
__webpack_require__(32);
__webpack_require__(168);
var loginService = (function () {
    function loginService(httpservice) {
        this.httpservice = httpservice;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    loginService.prototype.GetAccessToken = function (userID, passHash, loginType, dateTime, deviceID, accessToken, SSOByPass) {
        return this.httpservice.get({
            "apiMethod": "/api/Login/GetAccessToken",
            params: {
                "userID": userID,
                "pPassword": passHash,
                "loginType": loginType,
                "dateTime": dateTime,
                "deviceID": deviceID,
                "accessToken": accessToken,
                "SSOByPass": SSOByPass
            }
        });
    };
    loginService.prototype.GetSystemIDs = function (data) {
        if (navigator.onLine) {
            return this.httpservice.getSync({
                "apiMethod": "/api/Common/GetSystemIDS",
                params: {
                    "systemID": data
                }
            });
        }
    };
    loginService.prototype.GetAppRoleIDs = function (userID) {
        return this.httpservice.getSync({
            "apiMethod": "/api/User/GetAppRoleIDs",
            params: {
                "UserId": userID
            }
        });
    };
    loginService.prototype.GetUserOrgGrpID = function (userID) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Common/GetUserOrgGrpID",
            params: {
                "userID": userID
            }
        });
    };
    loginService.prototype.GetRecordsPerPage = function (userID) {
        return this.httpservice.getSync({
            "apiMethod": "/api/User/GetUser",
            params: {
                "userId": userID
            }
        });
    };
    loginService.prototype.IsValidUser = function (userID) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Login/IsValidUser",
            params: {
                "userId": userID
            }
        });
    };
    loginService.prototype.GetIpAddress = function () {
        return this.httpservice.getSync({
            "apiMethod": "/api/Login/GetIpAddress",
        });
    };
    loginService.prototype.IsSSOEnabled = function () {
        return this.httpservice.getSync({
            "apiMethod": "/api/Login/IsSSOEnabled",
        });
    };
    loginService.prototype.ValidateSamlResponse = function (SSOUserIDVariable) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Login/ValidateSamlResponse",
            params: {
                "SSOUserIDVariable": SSOUserIDVariable
            }
        });
    };
    loginService.prototype.GetSAMLResponse = function (SSOVariable) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Login/GetSAMLResponse",
            params: {
                "SSOVariable": SSOVariable
            }
        });
    };
    loginService.prototype.UpdateIzendaHosting = function (hostName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.httpservice.update({
                        "apiMethod": "/api/Login/UpdateHosting",
                        params: {
                            "HostName": hostName
                        }
                    }).toPromise()];
            });
        });
    };
    return loginService;
}());
loginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], loginService);
exports.loginService = loginService;


/***/ }),

/***/ 2025:
/***/ (function(module, exports) {

module.exports = "<form class=\"form-horizontal login-form m-t-20\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" name=\"form\" (ngSubmit)=\"onSubmit(model.userID,model.password)\" #f=\"ngForm\" novalidate (keypress)=\"formKeyPressEvent($event)\">\r\n    <div class=\"accountbg\"></div>\r\n    <div class=\"wrapper-page\" id=\"divlogin\">\r\n        <div class=\"panel panel-color panel-primary panel-pages\">\r\n            <div class=\"panel-body\">\r\n                <div class=\"\">\r\n                    \r\n                    <div class=\"col-xs-12\">\r\n                        <img [src]=\"mhsicon\" alt=\"\" class=\"img-responsive\" style=\"width:65%;margin:inherit;\">\r\n                        <h3 class=\"\">Sign In</h3>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"input-wrap\">\r\n                                    <label id=\"lblUserID\" for=\"userID\" *ngIf=\"f.submitted && userID.invalid && (model.userID=='' || model.userID==null || model.userID==undefined)\" class=\"input-disturbed\" [ngClass]=\"activeLblUserID\">User Name</label>\r\n                                    <label id=\"lblUserID\" for=\"userID\" *ngIf=\"!userID.invalid && (userID.dirty || userID.touched)\" class=\"input-disturbed\"  [ngClass]=\"activeLblUserID\">User Name</label>\r\n                                    <label id=\"lblUserID\" for=\"userID\" *ngIf=\"(!f.submitted || model.userID ) && userID.invalid\" [ngClass]=\"activeLblUserID\">User Name</label> \r\n                                    <input id=\"txtUserID\" type=\"text\" class=\"form-control\" name=\"userID\" (focus)=\"onFocusUserName()\" (click)=\"onFocusUserName()\" [(ngModel)]=\"model.userID\" #userID=\"ngModel\" required autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" />\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"input-wrap\">\r\n                                    <label id=\"lblPassword\" for=\"password\" *ngIf=\"f.submitted && password.invalid && (model.password=='' || model.password==null || model.password==undefined)\" class=\"input-disturbed\" [ngClass]=\"activeLblPassword\">Password</label>\r\n                                    <label id=\"lblPassword\" for=\"password\" *ngIf=\"!password.invalid && (password.dirty || password.touched)\" class=\"input-disturbed\"  [ngClass]=\"activeLblPassword\">Password</label>\r\n                                    <label id=\"lblPassword\" for=\"password\" *ngIf=\"(!f.submitted || model.password)&& password.invalid\" [ngClass]=\"activeLblPassword\">Password</label>\r\n                                    <input id=\"txtPassword\" (click)=\"onFocusPassword()\" (focus)=\"onFocusPassword()\" type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"model.password\" #password=\"ngModel\" required />\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"input-wrap\">\r\n                                    <div *ngIf=\"trSystemId\">\r\n                                        <atpar-select [options]=\"dropdownData\" [(ngModel)]=\"selectedDB\" [id]=\"'ddlOrgGroup'\" [required]=\"true\" [ngModelOptions]=\"{standalone:true}\" (onChange)=\"onChange($event)\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                      \r\n                        <div class=\"form-group text-center\">\r\n                            <div class=\"hidden-xs col-sm-8 col-md-8\">\r\n                                <a [routerLink]=\"['/forgot-password']\" class=\"text-muted\"><h5><i class=\"fa fa-lock\"></i> Forgot your password ?</h5></a>\r\n                            </div>\r\n                            <div class=\"col-xs-12 col-sm-4 col-md-4\">\r\n                                <button id=\"btnLogin\" class=\"btn btn-primary btn-lg waves-effect waves-light\" [disabled]=\"loading\">Login &nbsp;<i class=\"fa fa-sign-in\"></i></button>\r\n                            </div>\r\n                            <div class=\"col-xs-12 hidden-sm hidden-md hidden-lg\">\r\n                                <a [routerLink]=\"['/forgot-password']\" class=\"text-muted\"><h5><i class=\"fa fa-lock\"></i> Forgot your password ?</h5></a>\r\n                            </div>\r\n                        </div>\r\n                     \r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <atpar-growl [value]=\"msgs\" sticky=\"sticky\"></atpar-growl>\r\n    </div>\r\n</form>\r\n<style>\r\n    .waves-effect {\r\n        z-index: 0 !important;\r\n    }\r\n\r\n    .waves-light {\r\n        z-index: 0 !important;\r\n    }\r\n</style>\r\n";

/***/ }),

/***/ 331:
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
var forms_1 = __webpack_require__(22);
var login_component_1 = __webpack_require__(1529);
var login_routes_1 = __webpack_require__(1530);
var shared_module_1 = __webpack_require__(632);
var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            login_routes_1.LoginRoutingModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            login_component_1.LoginComponent,
        ],
    })
], LoginModule);
exports.LoginModule = LoginModule;


/***/ })

});
//# sourceMappingURL=0.601fce7cdc00a672fc7a.chunk.js.map