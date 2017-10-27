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
var router_1 = require("@angular/router");
var HttpService_1 = require("../Shared/HttpService");
var http_1 = require("@angular/http");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var AtParEnums_2 = require("../Shared/AtParEnums");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var atpar_manage_users_service_1 = require("../../app/Init/atpar-manage-users.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var ManageUsersHomeComponent = (function () {
    function ManageUsersHomeComponent(httpService, http, spinnerService, router, atParSharedDataService, route, atParCommonService, manageUsersServices, atParConstant) {
        var _this = this;
        this.httpService = httpService;
        this.http = http;
        this.spinnerService = spinnerService;
        this.router = router;
        this.atParSharedDataService = atParSharedDataService;
        this.route = route;
        this.atParCommonService = atParCommonService;
        this.manageUsersServices = manageUsersServices;
        this.atParConstant = atParConstant;
        this._deviceTokenEntry = [];
        this.lstUserData = [];
        this.lstAutoSearchUser = [];
        this.filteredUsers = [{ "FIRST_NAME": '', "LAST_NAME": '', "USER_ID": '', "SEARCH_STRING": '' }];
        this.growlMessage = [];
        this.ddlStatusType = [];
        this.disableAddUser = false;
        this.grdshow = false;
        this.breadCrumbMenu = new routepath_1.Menus();
        this.route.queryParams.subscribe(function (params) {
            _this.mode = params["mode"];
        });
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    ManageUsersHomeComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fromPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        alert(navigator.onLine);
                        if (!navigator.onLine) return [3 /*break*/, 6];
                        this.spinnerService.start();
                        this.pazeSize = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        return [4 /*yield*/, this.getAuditAllowed()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.isMenuAssigned()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getManageUsers()];
                    case 3:
                        _a.sent();
                        if (!(this.atParSharedDataService.storage != null)) return [3 /*break*/, 5];
                        fromPage = this.atParSharedDataService.storage.fromPage;
                        if (!(fromPage == "AddUser")) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.btnGo_Click()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this.ddlStatusType = [];
                        this.ddlStatusType.push({ label: 'All', value: null });
                        this.ddlStatusType.push({ label: 'Active', value: 'Active' });
                        this.ddlStatusType.push({ label: 'InActive', value: 'InActive' });
                        return [3 /*break*/, 7];
                    case 6:
                        alert('offline mode');
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ManageUsersHomeComponent.prototype.getAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getAuditAllowed(AtParEnums_1.EnumApps.Auth, 'mt_atpar_users.aspx')
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                if (res.StatType == AtParEnums_2.StatusType.Success) {
                                    _this.strAuditAllowed = res.Data;
                                    //  this.strAuditAllowed = 'Y'; // (kept for Testing)
                                    sessionStorage.setItem("strAuditAllowed", _this.strAuditAllowed);
                                }
                                else if (res.StatType == AtParEnums_2.StatusType.Warn) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                }
                                else {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "getAuditAllowed");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageUsersHomeComponent.prototype.isMenuAssigned = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strChkMenuName, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        strChkMenuName = "add user";
                        return [4 /*yield*/, this.manageUsersServices.isMenuAssigned(strChkMenuName).
                                catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.disableAddUser = false;
                                if (res.StatType == AtParEnums_2.StatusType.Success) {
                                    if (res.DataVariable == 0) {
                                        _this.disableAddUser = true;
                                    }
                                }
                                else if (res.StatType == AtParEnums_2.StatusType.Warn) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                }
                                else {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "isMenuAssigned");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageUsersHomeComponent.prototype.getManageUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.manageUsersServices.getManageUsers().
                                catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.spinnerService.stop();
                                if (res.StatType == AtParEnums_2.StatusType.Success) {
                                    _this.lstAutoSearchUser = res.DataList;
                                }
                                else if (res.StatType == AtParEnums_2.StatusType.Warn) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                }
                                else {
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "getManageUsers");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageUsersHomeComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var searchString, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.grdshow = false;
                        searchString = "";
                        if (this.searchText == undefined || this.searchText == null) {
                            searchString = "";
                            this.searchText = "";
                        }
                        if (this.searchText.USER_ID != undefined && this.searchText.USER_ID != null) {
                            searchString = this.searchText.USER_ID;
                        }
                        else {
                            searchString = this.searchText;
                        }
                        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        if (!(this._deviceTokenEntry != null)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        if (this.dataTableComponent != undefined) {
                            this.dataTableComponent.reset();
                        }
                        return [4 /*yield*/, this.manageUsersServices.getUsers(searchString).
                                catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.spinnerService.stop();
                                _this.lstUserData = [];
                                _this.growlMessage = [];
                                if (res.StatType == AtParEnums_2.StatusType.Success) {
                                    _this.grdshow = true;
                                    _this.lstUserData = res.DataList;
                                    for (var i = 0; i < _this.lstUserData.length; i++) {
                                        if (_this.lstUserData[i].ACCOUNT_DISABLED) {
                                            _this.lstUserData[i].ACCOUNT_STATUS = 'InActive';
                                        }
                                        else {
                                            _this.lstUserData[i].ACCOUNT_STATUS = 'Active';
                                        }
                                    }
                                }
                                else if (res.StatType == AtParEnums_2.StatusType.Warn) {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                }
                                else {
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "btnGo_Click");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageUsersHomeComponent.prototype.filterUser = function (event) {
        try {
            var query = event.query;
            //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
            this.filteredUsers = [];
            for (var i = 0; i < this.lstAutoSearchUser.length; i++) {
                var user = this.lstAutoSearchUser[i];
                if (user.USER_ID.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                    user.SEARCH_STRING = user.FIRST_NAME + " " + user.LAST_NAME + " (" + user.USER_ID + ")";
                    this.filteredUsers.push(user);
                }
            }
            return this.filteredUsers;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "filterUser");
        }
    };
    ManageUsersHomeComponent.prototype.btnEdit_Click = function (userRow) {
        return __awaiter(this, void 0, void 0, function () {
            var navigationExtras;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localStorage.setItem('leftMenuUrl', location.pathname.split('/')[location.pathname.split('/').length - 1]);
                        return [4 /*yield*/, this.atParSharedDataService.setStorage({ "editUserInfo": userRow, "mode": AtParEnums_1.ModeEnum.Edit })];
                    case 1:
                        _a.sent();
                        navigationExtras = {
                            relativeTo: this.route,
                            queryParams: { "mode": AtParEnums_1.ModeEnum.Edit }
                        };
                        this.breadCrumbMenu.MENU_NAME = "Manage Users";
                        this.breadCrumbMenu.ROUTE = 'manageusers';
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit User';
                        this.breadCrumbMenu.APP_NAME = 'AtPar';
                        this.breadCrumbMenu.IS_DIV = false;
                        // localStorage.setItem('localBreadCrumb', JSON.stringify(this.breadCrumbMenu));
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        return [4 /*yield*/, this.router.navigate(['adduser'], navigationExtras)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageUsersHomeComponent.prototype.btnAddNewUser_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var navigationExtras;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        navigationExtras = {
                            relativeTo: this.route,
                            queryParams: { "mode": AtParEnums_1.ModeEnum.Add },
                        };
                        this.breadCrumbMenu.MENU_NAME = "Add User";
                        this.breadCrumbMenu.ROUTE = 'adduser';
                        this.breadCrumbMenu.SUB_MENU_NAME = '';
                        this.breadCrumbMenu.APP_NAME = 'AtPar';
                        this.breadCrumbMenu.IS_DIV = false;
                        // localStorage.setItem('localBreadCrumb', JSON.stringify(this.breadCrumbMenu));
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        return [4 /*yield*/, this.router.navigate(['adduser'], navigationExtras)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageUsersHomeComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ManageUsersHomeComponent.prototype.ngOnDestroy = function () {
        this.searchText = '';
        this.lstUserData = [];
        this._deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService = null;
        if (this.atParSharedDataService.storage != null && this.atParSharedDataService.storage != null) {
            if (this.atParSharedDataService.storage.fromPage == "AddUser") {
                this.atParSharedDataService.storage.fromPage = null;
            }
        }
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], ManageUsersHomeComponent.prototype, "dataTableComponent", void 0);
    ManageUsersHomeComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-manage-users.component.html',
            providers: [HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, atpar_manage_users_service_1.ManageUsersServices, AtParConstants_1.AtParConstants],
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            http_1.Http,
            event_spinner_service_1.SpinnerService,
            router_1.Router,
            AtParSharedDataService_1.AtParSharedDataService,
            router_1.ActivatedRoute,
            atpar_common_service_1.AtParCommonService,
            atpar_manage_users_service_1.ManageUsersServices,
            AtParConstants_1.AtParConstants])
    ], ManageUsersHomeComponent);
    return ManageUsersHomeComponent;
}());
exports.ManageUsersHomeComponent = ManageUsersHomeComponent;
//# sourceMappingURL=atpar-manage-users-home.component.js.map