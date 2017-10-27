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
var CryptoJS = require("crypto-js");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var platform_browser_1 = require("@angular/platform-browser");
var AtParWebApiResponse_1 = require("../Shared/AtParWebApiResponse");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var TKIT_REQUESTOR_1 = require("../Entities/TKIT_REQUESTOR");
var trackit_login_service_1 = require("./trackit.login.service");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var authentication_service_1 = require("../_services/authentication.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var izendaintegrate_1 = require("../_helpers/izendaintegrate");
var HttpService_1 = require("../Shared/HttpService");
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var tkitHttpService_1 = require("../Shared/tkitHttpService");
var TrackitLoginComponent = (function () {
    function TrackitLoginComponent(fb, router, trackitloginService, route, spinnerService, authenticationservice, title, izItergrate, atParConstant, leftBarAnimationsewrvice, httpService) {
        this.fb = fb;
        this.router = router;
        this.trackitloginService = trackitloginService;
        this.route = route;
        this.spinnerService = spinnerService;
        this.authenticationservice = authenticationservice;
        this.title = title;
        this.izItergrate = izItergrate;
        this.atParConstant = atParConstant;
        this.leftBarAnimationsewrvice = leftBarAnimationsewrvice;
        this.httpService = httpService;
        this.oncountbuttonclicked = new core_1.EventEmitter();
        this.countvalue = 0;
        this.model = {};
        this.mhsicon = "";
        this.visibleUserID = false;
        this.visiblePassword = false;
        this.trSystemId = false;
        this.statusCode = -1;
        this.userId = "";
        this.password = "";
        this.deviceID = "";
        this.systemID = "";
        this.dateTime = "";
        this.accessToken = "";
        this.strSystemId = "";
        this.hdnSystemId = "";
        this.selectedDB = "";
        this.statusMessage = "";
        this.dropdownData = [];
        this.growlMessage = [];
        this._deviceTokenEntry = [];
        this.loginData = new TKIT_REQUESTOR_1.TKIT_REQUESTOR();
        this.loginPswd = "";
        this.savedUserID = true;
        this.savedPassword = true;
        try {
            this.mhsicon = "assets/images/MHSAtpar.png";
            this.httpService.clearAppSession();
            localStorage.setItem('isTrackITLogin', AtParEnums_1.YesNo_Enum.Y.toString());
            this.title.setTitle('TrackIT Login');
            this.visibleUserID = false;
            this.visiblePassword = false;
            tkitHttpService_1.TkitHttpService.previousTime = new Date();
            this.myForm = this.fb.group({
                userID: ['', forms_1.Validators.required],
                password: ['', forms_1.Validators.required],
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "constructor");
        }
    }
    TrackitLoginComponent.prototype.onFocusUserName = function () {
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
    TrackitLoginComponent.prototype.onFocusPassword = function () {
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
    TrackitLoginComponent.prototype.formKeyPressEvent = function (event) {
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
    TrackitLoginComponent.prototype.onSubmit = function (userId, password) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        if (userId == null || userId == "" || userId == undefined) {
                            this.statusMessage = "Please enter Valid User ID";
                            document.getElementById("txtUserID").focus();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                            return [2 /*return*/];
                        }
                        if (password == null || password == "" || password == undefined) {
                            this.statusMessage = "Please enter Valid Password";
                            document.getElementById("txtPassword").focus();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                            return [2 /*return*/];
                        }
                        this.userId = userId.toUpperCase();
                        this.loginPswd = password;
                        if ((document.getElementById("txtPassword").value == null)
                            || (document.getElementById("txtPassword").value == '')) {
                            this.model.password = null;
                            return [2 /*return*/];
                        }
                        //  localStorage.setItem("userId", userId);
                        if (this.trSystemId == true) {
                            if (this.selectedDB == null || this.selectedDB == "" ||
                                this.selectedDB == undefined || this.selectedDB == "Select System ID") {
                                this.statusMessage = "Please select a SystemId";
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
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
                        this.doLoginMethod();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _b.sent();
                        this.clientErrorMsg(ex_1, "onSubmit");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TrackitLoginComponent.prototype.doLoginMethod = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.DoLogin(this.userId, this.loginPswd, this.deviceID, this.systemID)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TrackitLoginComponent.prototype.DoLogin = function (userID, password, deviceID, SystemID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var userName, showProfile, OrgGrpId, key, iv, statusCode_1, ex_2, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, 8, 9]);
                        this.growlMessage = [];
                        HttpService_1.HttpService.previousTime = new Date();
                        userName = "";
                        showProfile = "";
                        OrgGrpId = "";
                        key = CryptoJS.enc.Utf8.parse('8080808080808080');
                        iv = CryptoJS.enc.Utf8.parse('8080808080808080');
                        //localStorage.setItem("UserLoginPwd", password);
                        this.passHash = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.trackitloginService.CheckLogin(userID, this.passHash).
                                then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            data = res.json();
                                            this.loginData = data.DataVariable;
                                            this.statusType = data.StatType;
                                            this.statusMessage = data.StatusMessage;
                                            statusCode_1 = data.StatusCode;
                                            _a = this.statusType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 5];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 6];
                                                case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 7];
                                            }
                                            return [3 /*break*/, 8];
                                        case 1:
                                            this.dateTime = new Date().toLocaleString().toString();
                                            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID] = userID;
                                            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DeviceID] = deviceID;
                                            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DateTime] = this.dateTime;
                                            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ClientType] = AtParEnums_1.ClientType.WEB.toFixed().toString();
                                            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId] = SystemID;
                                            //this._deviceTokenEntry[TokenEntry_Enum.AccessToken] = "";
                                            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] = this.loginData.ORG_GROUP_ID;
                                            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.AppName] = AtParEnums_1.EnumApps[AtParEnums_1.EnumApps.TrackIT].toString();
                                            localStorage.setItem("tkitDeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));
                                            localStorage.setItem("tkitUserID", userID);
                                            localStorage.setItem("tkituserName", this.loginData.USERNAME);
                                            return [4 /*yield*/, this.GetOrgGroupParamValue()];
                                        case 2:
                                            _b.sent();
                                            return [4 /*yield*/, this.GetTKITMyPreferences()];
                                        case 3:
                                            _b.sent();
                                            return [4 /*yield*/, this.getRequestedItemsCount()];
                                        case 4:
                                            _b.sent();
                                            return [3 /*break*/, 8];
                                        case 5:
                                            {
                                                this.spinnerService.stop();
                                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_INACTIVEREQUESTOR) {
                                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                                                }
                                                else {
                                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                                                }
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 6;
                                        case 6:
                                            {
                                                this.spinnerService.stop();
                                                this.growlMessage = [];
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 7;
                                        case 7:
                                            {
                                                this.spinnerService.stop();
                                                this.growlMessage = [];
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.statusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 8;
                                        case 8: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        if (!(statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.router.navigate(['trackitdashboard'])];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "DoLogin");
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "DoLogin");
                        return [3 /*break*/, 9];
                    case 8:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    TrackitLoginComponent.prototype.GetOrgGroupParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var trackITAppId, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        trackITAppId = AtParEnums_1.EnumApps.TrackIT;
                        return [4 /*yield*/, this.trackitloginService.GetOrgGroupParamValue("UPDATE_TRACKIT_USER_PROFILE", trackITAppId, this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                then(function (res) {
                                var response = res.json();
                                _this.spinnerService.stop();
                                _this.growlMessage = [];
                                _this.statusType = response.StatType;
                                _this.statusMessage = response.StatusMessage;
                                switch (_this.statusType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            localStorage.setItem("tkitUserName", response.DataVariable.toString());
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: _this.statusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: _this.statusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Custom:
                                        {
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: _this.statusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "GetOrgGroupParamValue");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TrackitLoginComponent.prototype.GetTKITMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.trackitloginService.GetTKITMyPreferences("RECORDS_PER_PAGE", this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).
                                then(function (res) {
                                var data2 = res.json();
                                if (data2.DataVariable != null) {
                                    _this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage] = data2.DataVariable.toString();
                                    localStorage.setItem("tkitDeviceTokenEntry", JSON.stringify(_this._deviceTokenEntry));
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "GetTKITMyPreferences");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TrackitLoginComponent.prototype.GetSystemIds = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.atweb = new AtParWebApiResponse_1.AtParWebApiResponse();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.trackitloginService.GetSystemIDs(data)
                                .then(function (res) {
                                var data = res.json();
                                _this.atweb = data;
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.atweb];
                    case 3:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "GetSystemIds");
                        return [2 /*return*/];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "GetSystemIds");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TrackitLoginComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var samplResponse, redirect, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        samplResponse = '';
                        return [4 /*yield*/, this.setDeviceTokenSession()];
                    case 1:
                        _a.sent();
                        this.spinnerService.start();
                        this.route.queryParams.subscribe(function (params) {
                            redirect = params['redirected'];
                        });
                        if (HttpService_1.HttpService.redirect == "Y") {
                            this.statusMessage = "Session Expired";
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
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
                        return [3 /*break*/, 6];
                    case 4:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "ngOnInit");
                        return [2 /*return*/];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TrackitLoginComponent.prototype.getLoginTemplateStyle = function () {
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
                    this.clientErrorMsg(ex, "getLoginTemplateStyle");
                    return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        });
    };
    TrackitLoginComponent.prototype.LoadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var querySystemID, _a, ex_9;
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
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                                break;
                            case AtParEnums_1.StatusType.Warn:
                                this.statusMessage = this.statusMessage;
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                                break;
                            case AtParEnums_1.StatusType.Custom:
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'custom', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: this.statusMessage });
                                break;
                        }
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        ex_9 = _b.sent();
                        this.clientErrorMsg(ex_9, "LoadData");
                        return [2 /*return*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    TrackitLoginComponent.prototype.CheckSystemID = function (pSystemID) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, strFilter, ex_10;
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
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                                this.hdnSystemId = "";
                                this.trSystemId = false;
                                break;
                            case AtParEnums_1.StatusType.Warn:
                                this.statusMessage = this.atweb.StatusMessage;
                                if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    this.statusMessage = "Not a valid system id.";
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                                    return [2 /*return*/];
                                }
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                                this.hdnSystemId = "";
                                this.trSystemId = false;
                                break;
                            case AtParEnums_1.StatusType.Custom:
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'custom', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: this.statusMessage });
                                break;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_10 = _b.sent();
                        this.clientErrorMsg(ex_10, "CheckSystemID");
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TrackitLoginComponent.prototype.onChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId] = this.selectedDB;
                        localStorage.setItem("tkitDeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));
                        return [4 /*yield*/, this.trackitloginService.GetSystemIDs(this.selectedDB)
                                .then(function (res) {
                                var data = res.json();
                                _this.atweb = data;
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "onChange");
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TrackitLoginComponent.prototype.BindDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i, ex_12;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, this.GetSystemIds("")];
                    case 1:
                        _a.atweb = _b.sent();
                        this.systemData = this.atweb.DataList,
                            this.statusCode = this.atweb.StatusCode;
                        this.statusType = this.atweb.StatType;
                        this.dropdownData.push({ label: "Select System ID", value: "Select System ID" });
                        switch (this.statusType) {
                            case AtParEnums_1.StatusType.Success:
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
                                break;
                            case AtParEnums_1.StatusType.Error:
                                this.statusMessage = this.statusMessage;
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                                break;
                            case AtParEnums_1.StatusType.Warn:
                                this.statusMessage = this.statusMessage;
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                                break;
                            case AtParEnums_1.StatusType.Custom:
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'custom', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: this.statusMessage });
                                break;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_12 = _b.sent();
                        this.clientErrorMsg(ex_12, "BindDropDown");
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TrackitLoginComponent.prototype.setDeviceTokenSession = function () {
        try {
            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID] = "";
            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DeviceID] = "";
            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DateTime] = this.dateTime;
            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ClientType] = AtParEnums_1.ClientType.WEB.toFixed().toString();
            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId] = "";
            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.AccessToken] = "";
            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.IdleTime] = "1000";
            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DeptID] = "";
            this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.AppName] = AtParEnums_1.EnumApps[AtParEnums_1.EnumApps.TrackIT].toString();
            localStorage.setItem("tkitDeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));
        }
        catch (ex) {
            this.clientErrorMsg(ex, "setDeviceTokenSession");
            return;
        }
    };
    TrackitLoginComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    TrackitLoginComponent.prototype.OnDestroy = function () {
        this.model = null;
        this.visibleUserID = null;
        this.activeLblUserID = null;
        this.activeLblPassword = null;
        this.visiblePassword = null;
        this.userId = null;
        this.password = null;
        this.deviceID = null;
        this.systemID = null;
        this.dateTime = null;
        this.accessToken = null;
        this.systemData = null;
        this.systemRowData = null;
        this.trSystemId = null;
        this.statusCode = -1;
        this.strSystemId = null;
        this.hdnSystemId = null;
        this.passHash = null;
        this.atweb = null;
        this.selectedDB = null;
        this.statusMessage = null;
        this.statusType = null;
        this.growlMessage = null;
        this.spinnerService.stop();
        this.spinnerService = null;
        this.dropdownData = null;
        this._deviceTokenEntry = null;
        this.myForm = null;
    };
    TrackitLoginComponent.prototype.getRequestedItemsCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.trackitloginService.GetRequestedItemsCount()
                                .then(function (res) {
                                var data = res.json();
                                if (data.DataVariable != null) {
                                    _this.countvalue = data.DataVariable;
                                }
                                else {
                                    _this.countvalue = 0;
                                }
                                localStorage.setItem('tkitViewCartItemsCount', _this.countvalue.toString());
                                _this.spinnerService.emitCountChangedValue(_this.countvalue);
                                _this.oncountbuttonclicked.emit(_this.countvalue);
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13, "getRequestedItemsCount");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TrackitLoginComponent.prototype, "oncountbuttonclicked", void 0);
    __decorate([
        core_1.ViewChild('userID'),
        __metadata("design:type", core_1.ElementRef)
    ], TrackitLoginComponent.prototype, "user", void 0);
    __decorate([
        core_1.ViewChild('f'),
        __metadata("design:type", Object)
    ], TrackitLoginComponent.prototype, "formGroup", void 0);
    TrackitLoginComponent = __decorate([
        core_1.Component({
            selector: 'my-trackit',
            templateUrl: 'trackit.login.component.html',
            providers: [
                trackit_login_service_1.TrackitloginService,
                authentication_service_1.AuthenticationService,
                AtParConstants_1.AtParConstants,
                tkitHttpService_1.TkitHttpService
            ],
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.Router,
            trackit_login_service_1.TrackitloginService,
            router_1.ActivatedRoute,
            event_spinner_service_1.SpinnerService,
            authentication_service_1.AuthenticationService,
            platform_browser_1.Title,
            izendaintegrate_1.IzendaIntegrate,
            AtParConstants_1.AtParConstants,
            leftbar_animation_service_1.LeftBarAnimationService,
            tkitHttpService_1.TkitHttpService])
    ], TrackitLoginComponent);
    return TrackitLoginComponent;
}());
exports.TrackitLoginComponent = TrackitLoginComponent;
//# sourceMappingURL=trackit.login.component.js.map