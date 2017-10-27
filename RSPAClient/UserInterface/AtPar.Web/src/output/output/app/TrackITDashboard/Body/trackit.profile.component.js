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
var event_spinner_service_1 = require("../../components/spinner/event.spinner.service");
var HttpService_1 = require("../../Shared/HttpService");
var AtParEnums_1 = require("../../Shared/AtParEnums");
var AtParConstants_1 = require("../../Shared/AtParConstants");
var trackit_profile_service_1 = require("./trackit-profile.service");
var TKIT_REQUESTOR_1 = require("../../Entities/TKIT_REQUESTOR");
var CryptoJS = require("crypto-js");
var http_1 = require("@angular/http");
var TrackITProfileComponent = (function () {
    function TrackITProfileComponent(httpService, spinnerService, atParConstant, service, title, http) {
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.service = service;
        this.title = title;
        this.http = http;
        this.ddRecordsPerPage = [];
        this.growlMessage = [];
        this.tkitDeviceTokenEntry = [];
        this.lstLocations = [];
        this.selectedLocation = "";
        this.btnEnableDisable = true;
        this.password = "";
        this.newPassword = "";
        this.trackItUserSelectedFile = "";
        this.showUploadImage = false;
        try {
            this.title.setTitle('TrackIT - Requestor Profile');
        }
        catch (ex) {
            this.clientErrorMsg(ex, "constructor");
        }
    }
    TrackITProfileComponent.prototype.ngOnInit = function () {
        try {
            this.tkitDeviceTokenEntry = JSON.parse(localStorage.getItem("tkitDeviceTokenEntry"));
            this.getRecordsPerPageddData();
            this.model = new TKIT_REQUESTOR_1.TKIT_REQUESTOR();
            this.bindLocations();
            this.getUserDetails();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    };
    TrackITProfileComponent.prototype.getRecordsPerPageddData = function () {
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
    TrackITProfileComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    TrackITProfileComponent.prototype.getUserDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        return [4 /*yield*/, this.service.getUserDetails(this.tkitDeviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.model = data.Data;
                                        _this.selectedLocation = data.Data.LOCATION_ID;
                                        _this.selectedPage = data.Data.RECORDS_PER_PAGE;
                                        //this.model.PASSWORD = "";
                                        if (_this.model.FIRST_NAME == null || _this.model.FIRST_NAME == undefined || _this.model.FIRST_NAME === "") {
                                            _this.txtFirstNameStatus = null;
                                        }
                                        else {
                                            _this.txtFirstNameStatus = 0;
                                        }
                                        if (_this.model.LAST_NAME == null || _this.model.LAST_NAME == undefined || _this.model.LAST_NAME === "") {
                                            _this.txtLastNameStatus = null;
                                        }
                                        else {
                                            _this.txtLastNameStatus = 0;
                                        }
                                        if (_this.model.DEFAULT_REPORT_DURATION == null || _this.model.DEFAULT_REPORT_DURATION == undefined) {
                                            _this.txtDurationStatus = null;
                                        }
                                        else {
                                            _this.txtDurationStatus = 0;
                                        }
                                        if (_this.model.NO_OF_REQUESTS_FOR_SAME_EQ_ITM == null || _this.model.NO_OF_REQUESTS_FOR_SAME_EQ_ITM == undefined) {
                                            _this.txtRequestStatus = null;
                                        }
                                        else {
                                            _this.txtRequestStatus = 0;
                                        }
                                        if (_this.txtFirstNameStatus == 0 && _this.txtLastNameStatus == 0 && _this.txtDurationStatus == 0 && _this.txtRequestStatus == 0) {
                                            _this.btnEnableDisable = false;
                                        }
                                        else {
                                            _this.btnEnableDisable = true;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TrackITProfileComponent.prototype.bindLocations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        return [4 /*yield*/, this.service.getLocations().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstLocations.push({ label: "Select One", value: "Select One" });
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstLocations.push({ label: data.DataList[i].LOCATION_ID + ' - ' + data.DataList[i].LOCATION_NAME, value: data.DataList[i].LOCATION_ID });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TrackITProfileComponent.prototype.encryptPwd = function () {
        return __awaiter(this, void 0, void 0, function () {
            var key, iv;
            return __generator(this, function (_a) {
                key = CryptoJS.enc.Utf8.parse('8080808080808080');
                iv = CryptoJS.enc.Utf8.parse('8080808080808080');
                this.encryptedCurrentPwd = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.model.PASSWORD), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                this.encryptedNewCurrentPwd = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.model.NEWPASSWORD), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                return [2 /*return*/];
            });
        });
    };
    TrackITProfileComponent.prototype.updateUserDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (this.model.PASSWORD == null || this.model.PASSWORD == undefined || this.model.PASSWORD === "") {
                            this.model.PASSWORD = "";
                        }
                        if (this.model.NEWPASSWORD == null || this.model.NEWPASSWORD == undefined || this.model.NEWPASSWORD === "") {
                            this.model.NEWPASSWORD = "";
                        }
                        if (this.model.CNFRMPASSWORD == null || this.model.CNFRMPASSWORD == undefined || this.model.CNFRMPASSWORD === "") {
                            this.model.CNFRMPASSWORD = "";
                        }
                        return [4 /*yield*/, this.encryptPwd()];
                    case 1:
                        _a.sent();
                        if (this.model.PASSWORD != "") {
                            if (this.model.NEWPASSWORD == "" && this.model.CNFRMPASSWORD == "") {
                                document.getElementById('txtNewPwd').focus();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'please enter new password and confirm password' });
                                return [2 /*return*/];
                            }
                            else if (this.model.NEWPASSWORD == "") {
                                document.getElementById('txtNewPwd').focus();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'please enter new password' });
                                return [2 /*return*/];
                            }
                            else {
                                this.password = this.encryptedCurrentPwd;
                            }
                        }
                        if (this.model.NEWPASSWORD != "") {
                            if (this.model.PASSWORD == "") {
                                document.getElementById('txtCurrentPwd').focus();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'please enter current password' });
                                return [2 /*return*/];
                            }
                            else if (this.model.CNFRMPASSWORD == "") {
                                document.getElementById('txtCnfrmPwd').focus();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'please enter confirm password' });
                                return [2 /*return*/];
                            }
                            else if (this.model.NEWPASSWORD != this.model.CNFRMPASSWORD) {
                                document.getElementById('txtCnfrmPwd').focus();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'New Password and Confirm Password are different' });
                                return [2 /*return*/];
                            }
                            else {
                                this.newPassword = this.encryptedNewCurrentPwd;
                            }
                        }
                        //this.model.PASSWORD = "";
                        //this.model.NEWPASSWORD = "";
                        this.spinnerService.start();
                        this.model.LOCATION_ID = this.selectedLocation;
                        this.model.RECORDS_PER_PAGE = this.selectedPage;
                        this.growlMessage = [];
                        return [4 /*yield*/, this.service.saveRequestorDetails(this.model, this.password, this.newPassword).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        var msg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", 'User').replace("2%", _this.model.REQUESTOR_ID);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                                        document.getElementById('txtCurrentPwd').focus();
                                        _this.model.CNFRMPASSWORD = "";
                                        _this.model.NEWPASSWORD = "";
                                        _this.model.PASSWORD = "";
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        if (data.StatusCode == 1112444) {
                                            document.getElementById('txtCurrentPwd').focus();
                                        }
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TrackITProfileComponent.prototype.bindModelDataChange = function (event) {
        //if ("txtCurrentPwd" == event.TextBoxID.toString()) {
        //    this.txtCurrentPwdStatus = event.validationrules.filter(x => x.status == false).length;
        //}
        //if ("txtNewPwd" == event.TextBoxID.toString()) {
        //    this.txtNewPwdStatus = event.validationrules.filter(x => x.status == false).length;
        //}
        //(this.txtCurrentPwdStatus == 0 || this.txtCurrentPwdStatus == undefined) && (this.txtNewPwdStatus == 0 || this.txtNewPwdStatus == undefined) && (this.txtCnfrmPwdStatus == 0 || this.txtCnfrmPwdStatus == undefined)
        //if ("txtCnfrmPwd" == event.TextBoxID.toString()) {
        //    this.txtCnfrmPwdStatus = event.validationrules.filter(x => x.status == false).length;
        //}
        if ("txtFirstName" == event.TextBoxID.toString()) {
            this.txtFirstNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtLastName" == event.TextBoxID.toString()) {
            this.txtLastNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtMiddleName" == event.TextBoxID.toString()) {
            this.txtMiddleNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtEmailID" == event.TextBoxID.toString()) {
            this.txtEmailIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtPhone" == event.TextBoxID.toString()) {
            this.txtPhoneStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtFax" == event.TextBoxID.toString()) {
            this.txtFaxStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtPager" == event.TextBoxID.toString()) {
            this.txtPagesStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtDuration" == event.TextBoxID.toString()) {
            this.txtDurationStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtRequests" == event.TextBoxID.toString()) {
            this.txtRequestStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if (this.txtFirstNameStatus == 0 && this.txtLastNameStatus == 0 && this.txtDurationStatus == 0 && this.txtRequestStatus == 0) {
            if ((this.txtMiddleNameStatus == 0 || this.txtMiddleNameStatus == undefined) && (this.txtPhoneStatus == 0 || this.txtPhoneStatus == undefined) &&
                (this.txtFaxStatus == 0 || this.txtFaxStatus == undefined) && (this.txtEmailIDStatus == 0 || this.txtEmailIDStatus == undefined) && (this.txtPagesStatus == 0 || this.txtPagesStatus == undefined)) {
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
    TrackITProfileComponent.prototype.ngAfterViewInit = function () {
        document.getElementById('txtCurrentPwd').focus();
    };
    TrackITProfileComponent.prototype.fileUpload = function (event) {
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
            this.http.post(apiUrl, formData, options)
                .toPromise()
                .then(function (res) {
                _this.growlMessage = [];
                _this.spinnerService.stop();
                var data = res.json();
                switch (data.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        _this.files = '';
                        _this.showUploadImage = false;
                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: data.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Warn: {
                        _this.showUploadImage = true;
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Error: {
                        _this.showUploadImage = true;
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Custom: {
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
            }, function (error) { return console.log(error); });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "fileUpload");
        }
    };
    TrackITProfileComponent.prototype.ngOnDestroy = function () {
        this.ddRecordsPerPage = null;
        this.growlMessage = null;
        this.tkitDeviceTokenEntry = null;
        this.model = null;
        this.lstLocations = null;
        this.selectedLocation = null;
        this.selectedPage = null;
        this.txtCurrentPwdStatus = null;
        this.txtNewPwdStatus = null;
        this.txtCnfrmPwdStatus = null;
        this.txtFirstNameStatus = null;
        this.txtLastNameStatus = null;
        this.txtMiddleNameStatus = null;
        this.txtEmailIDStatus = null;
        this.txtPhoneStatus = null;
        this.txtFaxStatus = null;
        this.txtPagesStatus = null;
        this.txtDurationStatus = null;
        this.txtRequestStatus = null;
        this.encryptedCurrentPwd = null;
        this.encryptedNewCurrentPwd = null;
        this.password = null;
        this.newPassword = null;
    };
    TrackITProfileComponent = __decorate([
        core_1.Component({
            templateUrl: 'trackit.profile.component.html',
            providers: [
                HttpService_1.HttpService,
                AtParConstants_1.AtParConstants,
                trackit_profile_service_1.TrackITUserProfileService
            ],
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            trackit_profile_service_1.TrackITUserProfileService,
            platform_browser_1.Title,
            http_1.Http])
    ], TrackITProfileComponent);
    return TrackITProfileComponent;
}());
exports.TrackITProfileComponent = TrackITProfileComponent;
//# sourceMappingURL=trackit.profile.component.js.map