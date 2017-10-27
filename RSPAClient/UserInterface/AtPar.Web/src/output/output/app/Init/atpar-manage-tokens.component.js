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
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParEnums_2 = require("./../Shared/AtParEnums");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_manage_tokens_service_1 = require("../../app/Init/atpar-manage-tokens.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var api_1 = require("../components/common/api");
var ManageTokensComponent = (function () {
    function ManageTokensComponent(manageTokensService, route, atParSharedDataService, spinnerService, router, atParConstant, confirmationService) {
        this.manageTokensService = manageTokensService;
        this.route = route;
        this.atParSharedDataService = atParSharedDataService;
        this.spinnerService = spinnerService;
        this.router = router;
        this.atParConstant = atParConstant;
        this.confirmationService = confirmationService;
        //Common variables
        this.msgs = [];
        this.deviceTokenEntry = [];
        this.statusCode = 0;
        this.userId = "";
        this.expiredListStatus = false;
        this.isVisible = false;
        this.preField = "";
        this.blnSortByColumn = true;
    }
    ManageTokensComponent.prototype.ngOnInit = function () {
        var _this = this;
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
            this.route.queryParams.subscribe(function (params) {
                var statusMessage = params["statusMessage"];
                _this.mode = params["mode"];
                var statusType = params["statusType"];
                if (statusType !== null && statusType != undefined) {
                    if (statusType == "success") {
                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                    }
                }
                if (statusType == "warn") {
                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: statusMessage });
                }
            });
            this.bindGrid();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    };
    ManageTokensComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ManageTokensComponent.prototype.bindGrid = function () {
        var _this = this;
        this.isVisible = false;
        this.spinnerService.start();
        try {
            var checkValue = void 0;
            if (this.expiredListStatus == false) {
                checkValue = 0;
            }
            else {
                checkValue = 1;
            }
            this.manageTokensService.getLiveTokens(checkValue).forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_2.StatusType.Success: {
                        _this.isVisible = true;
                        _this.originalDataSet = [];
                        _this.originalDataSet = resp.DataList;
                        _this.spinnerService.stop();
                        for (var i = 0; i < _this.originalDataSet.length; i++) {
                            var changeDate = _this.originalDataSet[i].REQUEST_TIME;
                            var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                            _this.originalDataSet[i].REQUEST_TIME = dateStr.replace(',', '');
                            var changeDate1 = _this.originalDataSet[i].EXPIRY_TIME;
                            var dateStr1 = new Date(changeDate1).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                            var date1 = new Date(dateStr1);
                            var dt = date1.toDateString();
                            _this.originalDataSet[i].EXPIRY_TIME = dateStr1.replace(',', '');
                            if (_this.originalDataSet[i].PRODUCTS_ACCESS == "" || _this.originalDataSet[i].PRODUCTS_ACCESS == null || _this.originalDataSet[i].PRODUCTS_ACCESS == undefined) {
                                _this.originalDataSet[i].PRODUCTS_ACCESS = "";
                            }
                            else if (_this.originalDataSet[i].PRODUCTS_ACCESS != "" || _this.originalDataSet[i].PRODUCTS_ACCESS != null || _this.originalDataSet[i].PRODUCTS_ACCESS != undefined) {
                                _this.originalDataSet[i].PRODUCTS_ACCESS = _this.originalDataSet[i].PRODUCTS_ACCESS.replace(' ', '');
                                _this.originalDataSet[i].PRODUCTS_ACCESS = _this.originalDataSet[i].PRODUCTS_ACCESS.replace(/,/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
                            }
                            _this.originalDataSet[i].EXPIRY_TIMES = _this.originalDataSet[i].EXPIRY_TIME;
                            _this.originalDataSet[i].REQUEST_TIMES = _this.originalDataSet[i].REQUEST_TIME;
                        }
                        // this.originalDataSet = asEnumerable(this.originalDataSet).OrderBy(x => x.USER_ID).ToArray();
                        // this.filterTokensValue(this.expiredListStatus);
                        _this.statusCode = resp.StatusCode;
                        break;
                    }
                    case AtParEnums_2.StatusType.Error: {
                        _this.spinnerService.stop();
                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    }
                    case AtParEnums_2.StatusType.Warn: {
                        _this.spinnerService.stop();
                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        break;
                    }
                    case AtParEnums_2.StatusType.Custom: {
                        _this.spinnerService.stop();
                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex, "bindGrid");
        }
    };
    ManageTokensComponent.prototype.showExperiedList = function (expiredListStatus) {
        this.expiredListStatus = expiredListStatus;
        this.bindGrid();
    };
    ManageTokensComponent.prototype.confirm = function (rowData) {
        var _this = this;
        try {
            this.msgs = [];
            this.confirmationService.confirm({
                message: 'Do you want to delete the token for ' + rowData.USER_ID,
                accept: function () {
                    _this.deleteToken(rowData);
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "confirm");
        }
    };
    ManageTokensComponent.prototype.deleteToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.msgs = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageTokensService.deleteTokenEntry(token.ACCESS_TOKEN).forEach(function (resp) {
                                switch (resp.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.statusMesssage = "Deleted token successfully for " + token.USER_ID;
                                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                                        _this.bindGrid();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                        break;
                                    }
                                }
                                _this.spinnerService.stop();
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "deleteToken");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageTokensComponent.prototype.confirmAll = function (rowData) {
        var _this = this;
        try {
            this.msgs = [];
            var rowData;
            this.confirmationService.confirm({
                message: 'Do you want to delete all Expired Tokens?',
                accept: function () {
                    _this.deleteAllExpiredTokens();
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "confirmAll");
        }
    };
    ManageTokensComponent.prototype.deleteAllExpiredTokens = function () {
        var _this = this;
        try {
            this.msgs = [];
            this.manageTokensService.runTokenGC().forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_2.StatusType.Success: {
                        _this.statusMesssage = "Deleted all expired tokens successfully";
                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                        _this.bindGrid();
                        break;
                    }
                    case AtParEnums_2.StatusType.Error: {
                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    }
                    case AtParEnums_2.StatusType.Warn: {
                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        break;
                    }
                    case AtParEnums_2.StatusType.Custom: {
                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                        break;
                    }
                }
                _this.spinnerService.stop();
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "deleteAllExpiredTokens");
        }
    };
    ManageTokensComponent.prototype.customSort = function (event, elementname) {
        var element = event;
        //this.eventDetails = [];
        if (this.preField == element.field) {
            this.blnSortByColumn = !this.blnSortByColumn;
            // element.order = !element.order;
        }
        else {
            this.blnSortByColumn = true;
        }
        this.preField = element.field;
        try {
            this.originalDataSet = this.originalDataSet.sort(function (a, b) {
                var dateA = new Date(a[elementname]).getTime();
                var dateB = new Date(b[elementname]).getTime();
                return dateA > dateB ? 1 : -1;
            });
            if (this.blnSortByColumn == false) {
                this.originalDataSet = this.originalDataSet.reverse();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    };
    ManageTokensComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-manage-tokens.component.html',
            providers: [atpar_manage_tokens_service_1.ManageTokensService, AtParConstants_1.AtParConstants, api_1.ConfirmationService]
        }),
        __metadata("design:paramtypes", [atpar_manage_tokens_service_1.ManageTokensService,
            router_1.ActivatedRoute,
            AtParSharedDataService_1.AtParSharedDataService,
            event_spinner_service_1.SpinnerService,
            router_1.Router,
            AtParConstants_1.AtParConstants,
            api_1.ConfirmationService])
    ], ManageTokensComponent);
    return ManageTokensComponent;
}());
exports.ManageTokensComponent = ManageTokensComponent;
//# sourceMappingURL=atpar-manage-tokens.component.js.map