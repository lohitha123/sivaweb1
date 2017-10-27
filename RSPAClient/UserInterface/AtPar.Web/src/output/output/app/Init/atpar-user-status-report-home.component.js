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
/// <reference path="atpar-user-status-report.component.service.ts" />
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParEnums_2 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var atpar_user_status_report_component_service_1 = require("../../app/Init/atpar-user-status-report.component.service");
var MT_ATPAR_SECURITY_AUDIT_1 = require("../../app/Entities/MT_ATPAR_SECURITY_AUDIT");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var router_1 = require("@angular/router");
var routepath_1 = require("../AtPar/Menus/routepath");
var UserStatusReportHomeComponent = (function () {
    function UserStatusReportHomeComponent(httpService, _http, spinnerService, atParConstant, commonService, userService, route, router, atParSharedDataService) {
        this.httpService = httpService;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.commonService = commonService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.atParSharedDataService = atParSharedDataService;
        this.deviceTokenEntry = [];
        this.showGrid = false;
        this.growlMessage = [];
        this.isAuditRequired = "";
        this.userID = '';
        this.firstName = '';
        this.lastName = '';
        this.status = '';
        this.isDisabled = false;
        this.isHidden = false;
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    UserStatusReportHomeComponent.prototype.ngOnInit = function () {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        // checking is Audit enabled for this page
        this.checkAuditAllowed();
        //Active or Inactive for  status column
        this.statusList = [];
        this.statusList.push({ label: 'All', value: null });
        this.statusList.push({ label: 'Active', value: true });
        this.statusList.push({ label: 'InActive', value: false });
    };
    UserStatusReportHomeComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showGrid = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.lstDBData = new Array();
                        this.status = "";
                        this.spinnerService.start();
                        this.growlMessage = [];
                        return [4 /*yield*/, this.userService.getUserStatus(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.userID, this.firstName, this.lastName, this.status, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID])
                                .forEach(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstDBData = [];
                                        _this.lstDBData = response.DataList;
                                        if (_this.lstDBData.length > 0) {
                                            for (var i = 0; i < _this.lstDBData.length; i++) {
                                                var changeDate = _this.lstDBData[i].CREATE_DATE;
                                                var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                                var date = new Date(dateStr);
                                                _this.lstDBData[i].CREATE_DATE = date.toLocaleString();
                                                _this.lstDBData[i].CREATE_DATE = _this.lstDBData[i].CREATE_DATE.replace(',', ' ');
                                                if (_this.lstDBData[i].ACCOUNT_DISABLED) {
                                                    _this.lstDBData[i].ACCOUNT_DISABLED = false;
                                                }
                                                else {
                                                    _this.lstDBData[i].ACCOUNT_DISABLED = true;
                                                }
                                                if (_this.lstDBData[i].USER_ID.toUpperCase() == _this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toUpperCase()) {
                                                    _this.lstDBData[i].isDisabled = true;
                                                }
                                                else {
                                                    _this.lstDBData[i].isDisabled = false;
                                                }
                                                if (_this.lstDBData[i].USER_ID.toUpperCase() == "ADMIN") {
                                                    _this.lstDBData[i].isHidden = true;
                                                }
                                                else {
                                                    _this.lstDBData[i].isHidden = false;
                                                }
                                            }
                                            _this.showGrid = true;
                                        }
                                        else {
                                            _this.showGrid = false;
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "btnGo_Click");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStatusReportHomeComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.growlMessage = null;
        this.lstDBData = null;
    };
    UserStatusReportHomeComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    UserStatusReportHomeComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.getAuditAllowed(0, "mt_user_status.aspx").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.isAuditRequired = data.Data;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        this.clientErrorMsg(ex_2, "checkAuditAllowed");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserStatusReportHomeComponent.prototype.insertAuditData = function (isActivate) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var auditSecurity, auditSecurityLst, strScreenName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auditSecurityLst = new Array();
                        auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                        auditSecurity.FIELD_NAME = "ACCOUNT_DISABLED";
                        auditSecurity.KEY_1 = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        auditSecurity.KEY_2 = "";
                        auditSecurity.KEY_3 = "";
                        auditSecurity.KEY_4 = "";
                        auditSecurity.KEY_5 = "";
                        if (isActivate == true) {
                            auditSecurity.OLD_VALUE = "0";
                            auditSecurity.NEW_VALUE = "1";
                        }
                        else {
                            auditSecurity.OLD_VALUE = "1";
                            auditSecurity.NEW_VALUE = "0";
                        }
                        auditSecurityLst.push(auditSecurity);
                        strScreenName = "mt_user_status.aspx";
                        return [4 /*yield*/, this.commonService.insertAuditData(auditSecurityLst, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], strScreenName).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                switch (response.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
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
    UserStatusReportHomeComponent.prototype.changeStatus = function (user) {
        var _this = this;
        if (user.isDisabled == true) {
            return;
        }
        this.growlMessage = [];
        this.spinnerService.start();
        var disablestatus = true;
        try {
            if (user.ACCOUNT_DISABLED) {
                disablestatus = false;
            }
            else {
                disablestatus = true;
            }
            this.userService.updateUserStatus(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], user.USER_ID, disablestatus)
                .forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_2.StatusType.Success:
                        _this.spinnerService.stop();
                        if (_this.isAuditRequired == "Y") {
                            _this.insertAuditData(user.ACCOUNT_DISABLED);
                            _this.spinnerService.stop();
                        }
                        else {
                            _this.spinnerService.stop();
                        }
                        _this.growlMessage = [];
                        var statusMesssage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "User").replace("2%", user.USER_ID);
                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMesssage });
                        break;
                    case AtParEnums_2.StatusType.Error:
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        _this.spinnerService.stop();
                        break;
                    case AtParEnums_2.StatusType.Warn:
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        _this.spinnerService.stop();
                        break;
                }
            });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "changeStatus");
        }
    };
    UserStatusReportHomeComponent.prototype.btnEdit_Click = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var navigationExtras;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localStorage.setItem('leftMenuUrl', location.pathname.split('/')[location.pathname.split('/').length - 1]);
                        return [4 /*yield*/, this.atParSharedDataService.setStorage({ "editUserInfo": user, "mode": AtParEnums_1.ModeEnum.Edit })];
                    case 1:
                        _a.sent();
                        navigationExtras = {
                            relativeTo: this.route,
                            queryParams: { "mode": AtParEnums_1.ModeEnum.Edit }
                        };
                        this.breadCrumbMenu.MENU_NAME = "User Status Report";
                        this.breadCrumbMenu.ROUTE = 'userstatusreport';
                        this.breadCrumbMenu.SUB_MENU_NAME = 'User Properties';
                        this.breadCrumbMenu.APP_NAME = 'AtPar';
                        this.breadCrumbMenu.IS_DIV = false;
                        user.ACCOUNT_DISABLED = !user.ACCOUNT_DISABLED;
                        //localStorage.setItem('localBreadCrumb', JSON.stringify(this.breadCrumbMenu));
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.router.navigate(['adduser'], navigationExtras);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserStatusReportHomeComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-user-status-report-home.component.html',
            providers: [HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, atpar_user_status_report_component_service_1.UserStatusReportService]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            atpar_common_service_1.AtParCommonService,
            atpar_user_status_report_component_service_1.UserStatusReportService,
            router_1.ActivatedRoute,
            router_1.Router,
            AtParSharedDataService_1.AtParSharedDataService])
    ], UserStatusReportHomeComponent);
    return UserStatusReportHomeComponent;
}());
exports.UserStatusReportHomeComponent = UserStatusReportHomeComponent;
//# sourceMappingURL=atpar-user-status-report-home.component.js.map