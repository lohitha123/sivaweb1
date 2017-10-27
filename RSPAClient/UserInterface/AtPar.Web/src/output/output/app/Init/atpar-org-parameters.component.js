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
var atpar_manage_org_groups_service_1 = require("./atpar-manage-org-groups.service");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var HttpService_1 = require("../Shared/HttpService");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var MT_ATPAR_SECURITY_AUDIT_1 = require("../Entities/MT_ATPAR_SECURITY_AUDIT");
var mt_atpar_org_group_parameters_1 = require("../entities/mt_atpar_org_group_parameters");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var OrgParametersComponent = (function () {
    function OrgParametersComponent(route, mngOrgGroupsService, spinnerService, atParCommonService, atParConstant, httpService) {
        this.route = route;
        this.mngOrgGroupsService = mngOrgGroupsService;
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.atParConstant = atParConstant;
        this.httpService = httpService;
        this.statusMsgs = [];
        this.strAppId = "-1";
        this.selectedOrgGrpId = "0";
        this.selectedOrgGrpName = "";
        this.isShow = false;
        this.loading = true;
        this.blnddlOrgGrpID = false;
        this.recallParameter = "false";
        this.boolAudit = false;
        this.blnCall = true;
        this.blnChkBillingSystem = false;
        this.disableButton = false;
        this.recallStatus = 0;
        this.puserStatus = 0;
        this.defaultBUnitStatus = 0;
        this.customViewErpUser = 0;
        this.receiveappStatus = 0;
        this.receiveFacility = 0;
        this.countQtyThreshold = 0;
        this.countDlrValueThres = 0;
        this.countSendPort = 0;
        this.countRecevApp = 0;
        this.countRecevFacility = 0;
        this.countRecevAddress = 0;
        this.sendLowStockEmailAlertsStatus = 0;
        this.sendProductExpEmailAlertsStatus = 0;
        this.defaultPriorityStatus = 0;
        this.maxnoOfRecordsStatus = 0;
        this.limiOfListsStatus = 0;
        this.badgeTrackingNo = 0;
        this.noOfRequestsforSame = 0;
        this.emailIdLowStockAlerts = 0;
        this.emailIdProductExpAlerts = 0;
        this.percentageOptimalQty = 0;
        this.emailIdForAlerts = 0;
        this.defaultLeadTimeStatus = 0;
    }
    OrgParametersComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.spinnerService.start();
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.strUserID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        this.strOrgGrpId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        this.strMenuCode = localStorage.getItem("menuCode");
                        return [4 /*yield*/, this.getUserOrgGroups()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getApps()];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.displayCatchException(ex_1, "ngOnInit");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrgParametersComponent.prototype.getUserOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.blnddlOrgGrpID = false;
                        return [4 /*yield*/, this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.orgGroupLst = res.json().DataList;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ddOrgGroupdata = [];
                                        if (_this.orgGroupLst != null && _this.orgGroupLst.length > 0) {
                                            if (_this.orgGroupLst.length == 1) {
                                                _this.selectedOrgGrpName = _this.orgGroupLst[0].ORG_GROUP_ID + " - " + _this.orgGroupLst[0].ORG_GROUP_NAME;
                                                _this.selectedOrgGrpId = _this.orgGroupLst[0].ORG_GROUP_ID;
                                                _this.blnddlOrgGrpID = true;
                                            }
                                        }
                                        _this.ddOrgGroupdata.push({ label: "Select One", value: "0" });
                                        if (_this.orgGroupLst != null && _this.orgGroupLst.length > 0) {
                                            for (var x = 0; x < _this.orgGroupLst.length; x++) {
                                                _this.ddOrgGroupdata.push({
                                                    label: _this.orgGroupLst[x].ORG_GROUP_ID + " - " + _this.orgGroupLst[x].ORG_GROUP_NAME,
                                                    value: _this.orgGroupLst[x].ORG_GROUP_ID
                                                });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.displayCatchException(ex_2, "getUserOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrgParametersComponent.prototype.getApps = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getApps(this.strUserID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.atParAppsLst = res.json().DataList;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ddlApps = [];
                                        _this.ddlApps.push({ label: "Select One", value: "-1" });
                                        if (_this.atParAppsLst.length > 0) {
                                            for (var i = 0; i <= _this.atParAppsLst.length - 1; i++) {
                                                if (_this.atParAppsLst[i].APP_ID.toString().toLocaleUpperCase() != "0" && _this.atParAppsLst[i].APP_ID != AtParEnums_1.EnumApps.Reports) {
                                                    _this.ddlApps.push({ label: _this.atParAppsLst[i].APP_NAME.toString(), value: _this.atParAppsLst[i].APP_ID.toString() });
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.displayCatchException(ex_3, "getApps");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrgParametersComponent.prototype.getAppParameters = function (strUserID, strGrpID, strAppId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.atParCommonService.getAppParameters(strUserID, strGrpID, strAppId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.atParOrgGrpParametersLst = res.json().DataList;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.isShow = true;
                                        _this.addValidations();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.isShow = false;
                                        _this.divOrgParamsData = false;
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.isShow = false;
                                        _this.divOrgParamsData = false;
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.isShow = false;
                                        _this.divOrgParamsData = false;
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.checkAuditAllowed()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.divOrgParamsData = false;
                        this.displayCatchException(ex_4, "getAppParameters");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrgParametersComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.strAudit = "";
                        return [4 /*yield*/, this.atParCommonService.getAuditAllowed(AtParEnums_1.EnumApps.Auth, this.strMenuCode).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataVariable != null) {
                                            _this.strAudit = data.DataVariable.toString();
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.displayCatchException(ex_5, "checkAuditAllowed");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrgParametersComponent.prototype.addValidations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x, paramVal, filterItem, filterItem1, emailPattern, validate, filterRecord, filterRecord, filteritem, emailPattern, validate, filteritem, emailPattern, validate;
            return __generator(this, function (_a) {
                try {
                    for (x = 0; x <= this.atParOrgGrpParametersLst.length - 1; x++) {
                        this.atParOrgGrpParametersLst[x].BLN_DISABLE = false;
                        this.atParOrgGrpParametersLst[x].OLD_PARAMETERVALUE = this.atParOrgGrpParametersLst[x].PARAMETER_VALUE;
                        if (this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "CHECKBOX") {
                            if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE == "Y") {
                                this.atParOrgGrpParametersLst[x].PARAMETER_VALUE = true;
                            }
                            else {
                                this.atParOrgGrpParametersLst[x].PARAMETER_VALUE = false;
                            }
                        }
                        if (this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "RADIO") {
                            if (this.atParOrgGrpParametersLst[x].PARAMETER_ID == "LOT_SERIAL_ENABLED" ||
                                this.atParOrgGrpParametersLst[x].PARAMETER_ID == "PICK_ENABLE_LOT_SRL_TRACKING") {
                                paramVal = this.atParOrgGrpParametersLst[x].PARAMETER_VALUE;
                                filterItem = this.atParOrgGrpParametersLst.filter(function (x) { return x.PARAMETER_ID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS"; });
                                filterItem1 = this.atParOrgGrpParametersLst.filter(function (x) { return x.PARAMETER_ID == "SEND_LOT_SERIAL_INFO_TO_MMIS"; });
                                if (paramVal == "MMIS") {
                                    if (filterItem != null && filterItem.length > 0) {
                                        if (filterItem[0].PARAMETER_TYPE == "CHECKBOX") {
                                            filterItem[0].PARAMETER_VALUE = true;
                                            filterItem[0].BLN_DISABLE = true;
                                        }
                                    }
                                    if (filterItem1 != null && filterItem1.length > 0) {
                                        if (filterItem1[0].PARAMETER_TYPE == "CHECKBOX") {
                                            filterItem1[0].PARAMETER_VALUE = true;
                                            filterItem1[0].BLN_DISABLE = true;
                                        }
                                    }
                                }
                                else if (paramVal == "None") {
                                    if (filterItem != null && filterItem.length > 0) {
                                        if (filterItem[0].PARAMETER_TYPE == "CHECKBOX") {
                                            filterItem[0].BLN_DISABLE = false;
                                        }
                                    }
                                    if (filterItem1 != null && filterItem1.length > 0) {
                                        if (filterItem1[0].PARAMETER_TYPE == "CHECKBOX") {
                                            filterItem1[0].PARAMETER_VALUE = false;
                                            filterItem1[0].BLN_DISABLE = true;
                                        }
                                    }
                                }
                                else {
                                    if (filterItem != null && filterItem.length > 0) {
                                        filterItem[0].BLN_DISABLE = false;
                                    }
                                    if (filterItem1 != null && filterItem1.length > 0) {
                                        filterItem1[0].BLN_DISABLE = false;
                                    }
                                }
                            }
                        }
                        if (this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "TEXTBOX" ||
                            this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "TEXT" ||
                            this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "TEXTAREA") {
                            if (this.atParOrgGrpParametersLst[x].VALIDATION == "NUMBER") {
                                this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            }
                            if (this.atParOrgGrpParametersLst[x].VALIDATION == "EMAIL") {
                                this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                            }
                            switch (this.atParOrgGrpParametersLst[x].PARAMETER_ID) {
                                case "REASON_CODE" || "ADJ_REASON_CODE":
                                    {
                                        this.atParOrgGrpParametersLst[x].VALIDATION =
                                            this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Max=10";
                                        break;
                                    }
                                case "MAX_NO_OF_REC_DOWNLOAD":
                                    {
                                        this.atParOrgGrpParametersLst[x].VALIDATION =
                                            this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Mandatory,Max=2";
                                        if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                            if (!this.disableButton) {
                                                this.disableButton = false;
                                            }
                                        }
                                        else {
                                            this.disableButton = true;
                                            this.maxnoOfRecordsStatus = 1;
                                        }
                                        break;
                                    }
                                case "FACTOR_OF_SAFETY":
                                    {
                                        if (this.atParOrgGrpParametersLst[x].VALIDATION == "NUMBER") {
                                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                        }
                                        this.atParOrgGrpParametersLst[x].VALIDATION =
                                            this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Max=3";
                                        break;
                                    }
                                case "RECALL_NOTIFICATION_EMAIL":
                                    {
                                        this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                                        if (this.recallParameter == "true") {
                                            this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,EMAIL";
                                        }
                                        else {
                                            this.atParOrgGrpParametersLst[x].VALIDATION = "EMAIL";
                                        }
                                        if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                            emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                            validate = (new RegExp(emailPattern)).test(this.atParOrgGrpParametersLst[x].PARAMETER_VALUE) ? true : false;
                                            if (validate) {
                                                //if already disabled , should not enable for next iteration
                                                if (!this.disableButton) {
                                                    this.disableButton = false;
                                                }
                                            }
                                            else {
                                                this.disableButton = true;
                                                this.recallStatus = 1;
                                            }
                                        }
                                        else {
                                            if (this.recallParameter == "true") {
                                                this.disableButton = true;
                                                this.recallStatus = 1;
                                            }
                                        }
                                        break;
                                    }
                                case "RECORDS_PER_PAGE":
                                    {
                                        this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER";
                                        this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                        break;
                                    }
                                case "DEFAULT_DATE_RANGE": {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=3";
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "DEFAULT_LEAD_TIME": {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,NUMBER,MAX=3";
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                        //if already disabled , should not enable for next iteration
                                        if (!this.disableButton) {
                                            this.disableButton = false;
                                        }
                                    }
                                    else {
                                        this.disableButton = true;
                                        this.defaultLeadTimeStatus = 1;
                                    }
                                    break;
                                }
                                case "PS_USER": {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,alpha_numeric_underscore_hyphen_nospace,Max=10";
                                    this.atParOrgGrpParametersLst[x].Title = "Please enter a characters or numbers or _-";
                                    if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                        //if already disabled , should not enable for next iteration
                                        if (!this.disableButton) {
                                            this.disableButton = false;
                                        }
                                    }
                                    else {
                                        this.disableButton = true;
                                        this.puserStatus = 1;
                                    }
                                    break;
                                }
                                case "DEFAULT_PRIORITY": {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,NUMBER,MAX=2";
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                        if (!this.disableButton) {
                                            this.disableButton = false;
                                        }
                                    }
                                    else {
                                        this.disableButton = true;
                                        this.defaultPriorityStatus = 1;
                                    }
                                    break;
                                }
                                case "BADGE_TRACK_INFO":
                                    {
                                        this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,NUMBER,MAX=1";
                                        this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                        if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                            if (!this.disableButton) {
                                                this.disableButton = false;
                                            }
                                        }
                                        else {
                                            this.disableButton = true;
                                            this.badgeTrackingNo = 1;
                                        }
                                        break;
                                    }
                                case "LIMIT_OF_LISTS": {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,NUMBER,MAX=2";
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                        if (!this.disableButton) {
                                            this.disableButton = false;
                                        }
                                    }
                                    else {
                                        this.disableButton = true;
                                        this.limiOfListsStatus = 1;
                                    }
                                    break;
                                }
                                case "DEFAULT_BUSINESS_UNIT": {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,alpha_numeric_underscore_hyphen_nospace,Max=10";
                                    this.atParOrgGrpParametersLst[x].Title = "Please enter a characters or numbers or _-";
                                    if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                        if (!this.disableButton) {
                                            this.disableButton = false;
                                        }
                                    }
                                    else {
                                        this.disableButton = true;
                                        this.defaultBUnitStatus = 1;
                                    }
                                    break;
                                }
                                case "B_MAX_STOR": {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=4";
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "E_MAX_STOR": {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=4";
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "F_MAX_STOR": {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=4";
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "NO_OF_REQUESTS_FOR_SAME_EQ_ITM": {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,NUMBER,MAX=4,MIN=1";
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                        if (!this.disableButton) {
                                            this.disableButton = false;
                                        }
                                    }
                                    else {
                                        this.disableButton = true;
                                        this.noOfRequestsforSame = 1;
                                    }
                                    break;
                                }
                                case "EMAILID_FOR_ALERTS": {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "EMAIL,MAX=50";
                                    this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                                    break;
                                }
                                case "FREQUENCY_EMAIL_ALERTS": {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=10";
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "PERCENTAGE_OPTIMUM_QTY": {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,NUMBER,MAX=3";
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                        if (!this.disableButton) {
                                            this.disableButton = false;
                                        }
                                    }
                                    else {
                                        this.disableButton = true;
                                        this.percentageOptimalQty = 1;
                                    }
                                    break;
                                }
                                case "REFRESH_DATA_PERIOD": {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=10";
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "SYNC_FREQUENCY": {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=2";
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "CUSTOM_VIEW_ERPUSER": {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory";
                                    if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                        if (!this.disableButton) {
                                            this.disableButton = false;
                                        }
                                    }
                                    else {
                                        this.disableButton = true;
                                        this.customViewErpUser = 1;
                                    }
                                    break;
                                }
                                case "EMAILID_FOR_LOWSTOCK_ALERTS": {
                                    filterRecord = this.atParOrgGrpParametersLst.filter(function (option) { return option.PARAMETER_ID == "SEND_LOWSTOCK_EMAIL_ALERTS"; });
                                    if (filterRecord != null && filterRecord.length > 0) {
                                        if (filterRecord[0].PARAMETER_VALUE == AtParEnums_1.YesNo_Enum.Y.toString() ||
                                            filterRecord[0].PARAMETER_VALUE == true) {
                                            this.atParOrgGrpParametersLst[x].VALIDATION = "Mandaory,EMAIL";
                                            if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                                if (!this.disableButton) {
                                                    this.disableButton = false;
                                                }
                                            }
                                            else {
                                                this.disableButton = true;
                                                this.emailIdLowStockAlerts = 1;
                                            }
                                        }
                                        else {
                                            this.atParOrgGrpParametersLst[x].VALIDATION = "EMAIL";
                                        }
                                    }
                                    this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                                    break;
                                }
                                case "EMAILID_FOR_PRODUCT_EXP_ALERTS":
                                    {
                                        filterRecord = this.atParOrgGrpParametersLst.filter(function (option) { return option.PARAMETER_ID == "SEND_PRODUCT_EXP_EMAIL_ALERTS"; });
                                        if (filterRecord != null && filterRecord.length > 0) {
                                            if (filterRecord[0].PARAMETER_VALUE == AtParEnums_1.YesNo_Enum.Y.toString() ||
                                                filterRecord[0].PARAMETER_VALUE == true) {
                                                this.atParOrgGrpParametersLst[x].VALIDATION = "Mandaory,EMAIL";
                                                if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                                    if (!this.disableButton) {
                                                        this.disableButton = false;
                                                    }
                                                }
                                                else {
                                                    this.disableButton = true;
                                                    this.emailIdProductExpAlerts = 1;
                                                }
                                            }
                                            else {
                                                this.atParOrgGrpParametersLst[x].VALIDATION = "EMAIL";
                                            }
                                        }
                                        this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                                        break;
                                    }
                                case "REQUESTOR_EMAIL_TABLE": {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "MAX=50";
                                    this.atParOrgGrpParametersLst[x].Title = "Table/view name to read Email ID for Requestor - Number of characters cannot be more than 50";
                                    break;
                                }
                                case "SEND_LOWSTOCK_EMAIL_ALERTS": {
                                    if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE == AtParEnums_1.YesNo_Enum.Y.toString() ||
                                        this.atParOrgGrpParametersLst[x].PARAMETER_VALUE == true) {
                                        filteritem = this.atParOrgGrpParametersLst.filter(function (x) { return x.PARAMETER_ID == "EMAILID_FOR_LOWSTOCK_ALERTS"; });
                                        if (filteritem != null) {
                                            filteritem[0].VALIDATION = "Mandatory,EMAIL";
                                            if (filteritem[0].PARAMETER_VALUE != "") {
                                                emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                                validate = (new RegExp(emailPattern)).test(filteritem[0].PARAMETER_VALUE) ? true : false;
                                                if (validate) {
                                                    //if already disabled , should not enable for next iteration
                                                    if (!this.disableButton) {
                                                        this.disableButton = false;
                                                    }
                                                }
                                                else {
                                                    this.disableButton = true;
                                                    this.sendLowStockEmailAlertsStatus = 1;
                                                }
                                            }
                                            else {
                                                this.disableButton = true;
                                                this.sendLowStockEmailAlertsStatus = 1;
                                            }
                                        }
                                    }
                                    break;
                                }
                                case "SEND_PRODUCT_EXP_EMAIL_ALERTS": {
                                    if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE == AtParEnums_1.YesNo_Enum.Y.toString()) {
                                        if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE == AtParEnums_1.YesNo_Enum.Y.toString() ||
                                            this.atParOrgGrpParametersLst[x].PARAMETER_VALUE == true) {
                                            filteritem = this.atParOrgGrpParametersLst.filter(function (x) { return x.PARAMETER_ID
                                                == "EMAILID_FOR_PRODUCT_EXP_ALERTS"; });
                                            if (filteritem != null) {
                                                filteritem[0].VALIDATION = "Mandatory,EMAIL";
                                                if (filteritem[0].PARAMETER_VALUE != "") {
                                                    emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                                    validate = (new RegExp(emailPattern)).test(filteritem[0].PARAMETER_VALUE) ? true : false;
                                                    if (validate) {
                                                        //if already disabled , should not enable for next iteration
                                                        if (!this.disableButton) {
                                                            this.disableButton = false;
                                                        }
                                                    }
                                                    else {
                                                        this.disableButton = true;
                                                        this.sendProductExpEmailAlertsStatus = 0;
                                                    }
                                                }
                                                else {
                                                    this.disableButton = true;
                                                    this.sendProductExpEmailAlertsStatus = 0;
                                                }
                                            }
                                        }
                                    }
                                    break;
                                }
                                case "ADT_BILLING_SEND_ADDRESS":
                                    {
                                        this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=2";
                                        this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                        break;
                                    }
                                case "ADT_BILLING_SEND_PORT":
                                    {
                                        this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=2";
                                        this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                        break;
                                    }
                                case "ADT_BILLING_THRESHOLD_VALUE":
                                    {
                                        this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=2";
                                        this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                        break;
                                    }
                                case "ADT_RECEIVING_APPLICATION":
                                    {
                                        this.atParOrgGrpParametersLst[x].VALIDATION = "alpha_numerics_nospace";
                                        this.atParOrgGrpParametersLst[x].Title = "Allow the Alphabets and Numbers";
                                        break;
                                    }
                                case "ADT_RECEIVING_FACILITY":
                                    {
                                        this.atParOrgGrpParametersLst[x].VALIDATION = "alpha_numerics_nospace";
                                        this.atParOrgGrpParametersLst[x].Title = "Allow the Alphabets and Numbers";
                                        break;
                                    }
                                case "COUNT_QTY_THRESHOLD":
                                    {
                                        this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,numerics_doubleprecision";
                                        this.atParOrgGrpParametersLst[x].Title = "Allows numerics,a double precision value";
                                        if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                            //if already disabled , should not enable for next iteration
                                            if (!this.disableButton) {
                                                this.disableButton = false;
                                            }
                                        }
                                        else {
                                            this.disableButton = true;
                                            this.countQtyThreshold = 1;
                                        }
                                        break;
                                    }
                                case "COUNT_DLR_VALUE_THRESHOLD":
                                    {
                                        this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,numerics_doubleprecision";
                                        if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                            //if already disabled , should not enable for next iteration
                                            if (!this.disableButton) {
                                                this.disableButton = false;
                                            }
                                        }
                                        else {
                                            this.disableButton = true;
                                            this.countDlrValueThres = 1;
                                        }
                                        this.atParOrgGrpParametersLst[x].Title = "Allows numerics,a double precision value";
                                        break;
                                    }
                                case "CUSTOM_SQL_DESTLOCATION":
                                    {
                                        this.atParOrgGrpParametersLst[x].PARAMETER_TYPE = "TEXTAREA";
                                        break;
                                    }
                                case "CUSTOM_SQL_DEPT":
                                    {
                                        this.atParOrgGrpParametersLst[x].PARAMETER_TYPE = "TEXTAREA";
                                        break;
                                    }
                            }
                        }
                    }
                }
                catch (ex) {
                    this.displayCatchException(ex, "addValidations");
                }
                return [2 /*return*/];
            });
        });
    };
    OrgParametersComponent.prototype.getReCallInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.recallParameter = "false";
                        return [4 /*yield*/, this.atParCommonService.getCheckRecall().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.recallParameter = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.displayCatchException(ex_6, "getReCallInfo");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrgParametersComponent.prototype.ddlChnage = function () {
        this.isShow = false;
    };
    OrgParametersComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.disableButton = false;
                        this.statusMsgs = [];
                        this.spinnerService.start();
                        if (this.selectedOrgGrpId == "" || this.selectedOrgGrpId == '0' || this.strAppId == '-1' || this.strAppId == "") {
                            if (this.selectedOrgGrpId == '0' && this.strAppId == '-1') {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Org Group and Product are Mandatory" });
                                this.atParOrgGrpParametersLst = [];
                                this.isShow = false;
                                this.spinnerService.stop();
                                return [2 /*return*/, false];
                            }
                            else if (this.selectedOrgGrpId == '0') {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Org Group Is Mandatory" });
                                this.atParOrgGrpParametersLst = [];
                                this.spinnerService.stop();
                                this.isShow = false;
                                return [2 /*return*/, false];
                            }
                            else if (this.strAppId == '-1') {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Product Is Mandatory" });
                                this.atParOrgGrpParametersLst = [];
                                this.spinnerService.stop();
                                this.isShow = false;
                                return [2 /*return*/, false];
                            }
                        }
                        if (!(parseInt(this.strAppId) > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getReCallInfo()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getAppParameters(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedOrgGrpId, this.strAppId)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.spinnerService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_7 = _a.sent();
                        this.displayCatchException(ex_7, "btnGo_Click");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrgParametersComponent.prototype.checkBillingInformation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var filterItems, x;
            return __generator(this, function (_a) {
                try {
                    if (this.atParOrgGrpParametersLst != null) {
                        filterItems = this.atParOrgGrpParametersLst.filter(function (x) {
                            return x.PARAMETER_ID == "ADT_BILLING_SEND_ADDRESS" ||
                                x.PARAMETER_ID == "ADT_RECEIVING_APPLICATION" ||
                                x.PARAMETER_ID == "ADT_RECEIVING_FACILITY" ||
                                x.PARAMETER_ID == "ADT_BILLING_SEND_PORT";
                        });
                        if (filterItems != null && filterItems.length > 0) {
                            for (x = 0; x < filterItems.length; x++) {
                                if (filterItems[x].PARAMETER_VALUE != "") {
                                    return [2 /*return*/, true];
                                }
                            }
                        }
                    }
                    return [2 /*return*/, false];
                }
                catch (ex) {
                    this.displayCatchException(ex, "checkBillingInformation");
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    OrgParametersComponent.prototype.btnSaveParams_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        this.spinnerService.start();
                        if (this.selectedOrgGrpId == "" || this.selectedOrgGrpId == '0' || this.strAppId == '-1' || this.strAppId == "") {
                            if (this.selectedOrgGrpId == '0' && this.strAppId == '-1') {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Org Group and Product are Mandatory" });
                                this.atParOrgGrpParametersLst = [];
                                this.isShow = false;
                                this.spinnerService.stop();
                                return [2 /*return*/, false];
                            }
                            else if (this.selectedOrgGrpId == '0') {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Org Group Is Mandatory" });
                                this.atParOrgGrpParametersLst = [];
                                this.isShow = false;
                                this.spinnerService.stop();
                                return [2 /*return*/, false];
                            }
                            else if (this.strAppId == '-1') {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Product Is Mandatory" });
                                this.atParOrgGrpParametersLst = [];
                                this.isShow = false;
                                this.spinnerService.stop();
                                return [2 /*return*/, false];
                            }
                        }
                        return [4 /*yield*/, this.saveOrgParameters()];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_8 = _a.sent();
                        this.displayCatchException(ex_8, "btnSaveParams_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrgParametersComponent.prototype.saveOrgParameters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, blnvalidation, ex_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        this.statusMsgs = [];
                        if (!(this.strAppId == AtParEnums_1.EnumApps.PointOfUse.toString())) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.checkBillingInformation()];
                    case 1:
                        _a.blnChkBillingSystem = _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this.changeInput()];
                    case 3:
                        blnvalidation = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_9 = _b.sent();
                        this.displayCatchException(ex_9, "saveOrgParameters");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //todo remove
    //public async validateInput(): Promise<boolean> {
    //    try {
    //        let blnCheckValueAsNone: boolean = false;
    //        let blnCheckRadioValue: boolean = false;
    //        let boolAudit: boolean = false;
    //        let blnChkCustSQLDept: boolean = false;
    //        let strParamID: string = "";
    //        let strNewParamValue: any = "";
    //        let strOldParamValue: string = "";
    //        for (var i = 0; i <= this.atParOrgGrpParametersLst.length - 1; i++) {
    //            this.assignParamEntity = new MT_ATPAR_ORG_GROUP_PARAMETERS();
    //            if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "RADIO") {
    //                strParamID = this.atParOrgGrpParametersLst[i].PARAMETER_ID;
    //                if (strParamID == "PICK_ENABLE_LOT_SRL_TRACKING" ||
    //                    strParamID == "LOT_SERIAL_ENABLED") {
    //                    if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString()
    //                        == Enable_Lot_Serial_Tracking.MMIS.toString()) {
    //                        blnCheckRadioValue = true;
    //                    }
    //                    else if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString()
    //                        == Enable_Lot_Serial_Tracking.None.toString()) {
    //                        blnCheckValueAsNone = true;
    //                    } else {
    //                        blnCheckRadioValue = false;
    //                        blnCheckValueAsNone = false;
    //                    }
    //                }
    //            }
    //            if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "CHECKBOX") {
    //                let strOldChkValue = this.atParOrgGrpParametersLst[i].OLD_PARAMETERVALUE.toString();
    //                strParamID = this.atParOrgGrpParametersLst[i].PARAMETER_ID.toString();
    //                this.assignParamEntity.PARAMETER_ID = strParamID;
    //                if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == "true" ||
    //                    this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == "Y") {
    //                    this.assignParamEntity.PARAMETER_VALUE = "Y";
    //                    if (strOldChkValue != "Y") {
    //                        boolAudit = true;
    //                        this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
    //                        this.auditSecurity.OLD_VALUE = "N";
    //                        this.auditSecurity.NEW_VALUE = "Y";
    //                        this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
    //                        this.auditSecurity.KEY_1 = this.strOrgGrpId;
    //                        this.auditSecurity.KEY_2 = this.strAppId;
    //                        this.auditSecurity.KEY_3 = strParamID;
    //                        this.auditSecurity.KEY_4 = "";
    //                        this.auditSecurity.KEY_5 = "";
    //                        this.auditSecurityLst.push(this.auditSecurity);
    //                    }
    //                } else {
    //                    this.assignParamEntity.PARAMETER_VALUE = "N";
    //                    if (strOldChkValue != "N") {
    //                        boolAudit = true;
    //                        this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
    //                        this.auditSecurity.OLD_VALUE = "Y";
    //                        this.auditSecurity.NEW_VALUE = "N";
    //                        this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
    //                        this.auditSecurity.KEY_1 = this.strOrgGrpId;
    //                        this.auditSecurity.KEY_2 = this.strAppId;
    //                        this.auditSecurity.KEY_3 = strParamID;
    //                        this.auditSecurity.KEY_4 = "";
    //                        this.auditSecurity.KEY_5 = "";
    //                        this.auditSecurityLst.push(this.auditSecurity);
    //                    }
    //                }
    //            }
    //            if (blnCheckRadioValue) {
    //                if (strParamID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS" ||
    //                    strParamID == "SEND_LOT_SERIAL_INFO_TO_MMIS") {
    //                    this.assignParamEntity.PARAMETER_VALUE = "Y";
    //                }
    //            } else if (blnCheckValueAsNone) {
    //                if (strParamID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS" ||
    //                    strParamID == "SEND_LOT_SERIAL_INFO_TO_MMIS") {
    //                    this.assignParamEntity.PARAMETER_VALUE = "N";
    //                }
    //            }
    //            if (strParamID == "VALIDATE_DEPT") {
    //                if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == "true") {
    //                    if (blnChkCustSQLDept) {
    //                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Please provide Custom SQL for Syncing Valid Departments." });
    //                        return false;
    //                    }
    //                }
    //            }
    //            if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "TEXTBOX") {
    //                strParamID = this.atParOrgGrpParametersLst[i].PARAMETER_ID.toString();
    //                strNewParamValue = this.atParOrgGrpParametersLst[i].PARAMETER_VALUE;
    //                let numaric_regex = /^[0-9]*$/;//"numeric"//
    //                if (this.atParOrgGrpParametersLst[i].VALIDATION == YesNo_Enum.Y.toString() &&
    //                    (this.atParOrgGrpParametersLst[i].PARAMETER_ID == "BADGE_TRACK_INFO")) {
    //                    if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE != "") {
    //                        if (((new RegExp(numaric_regex)).test(strNewParamValue) ? true : false)) {//!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Track Numbers - Please enter a positive numeric value." });
    //                            return false;
    //                        }
    //                        if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() > 3 ||
    //                            this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() < 1) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "The valid Track Numbers used for reading info from Badge are 1,2,3" });
    //                            return false;
    //                        }
    //                    } else {
    //                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Track Numbers - Please enter valid Swipe Card Track Number" });
    //                        return false;
    //                    }
    //                }
    //                strOldParamValue = this.atParOrgGrpParametersLst[i].OLD_PARAMETERVALUE.toString();
    //                this.assignParamEntity.PARAMETER_ID = strParamID;
    //                this.assignParamEntity.PARAMETER_VALUE = strNewParamValue;
    //                switch (strParamID) {
    //                    //RT 4353
    //                    case "CUSTOM_SQL_DESTLOCATION": {
    //                        this.assignParamEntity.PARAMETER_VALUE = strNewParamValue.replace("'", "''");
    //                        break;
    //                    }
    //                    case "CUSTOM_VIEW_ERPUSER": {
    //                        this.assignParamEntity.PARAMETER_VALUE = strNewParamValue.replace("'", "''");
    //                        break;
    //                    }
    //                    case "CUSTOM_SQL_DEPT": {
    //                        this.assignParamEntity.PARAMETER_VALUE = strNewParamValue.replace("'", "''");
    //                        break;
    //                    }
    //                    case "DEFAULT_DURATION": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Duration in days - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString().length > 2) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Duration in days - Number of digits cannot be more than 2" });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                    case "DURATION_TRACKING_EXP": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Duration Tracking Expiration in days - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 3) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Duration Tracking Expiration in days - Number of digits cannot be more than 3" });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                    case "FACTOR_OF_SAFETY": {
    //                        if (strNewParamValue != "") {
    //                            if (((new RegExp(numaric_regex)).test(strNewParamValue) ? true : false)) { //(!regExpValidator(numaric_regex, strNewParamValue)) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Factor of safety for recommended par - Please enter a positive numeric value." });
    //                                return false;
    //                            } else if (strNewParamValue.toString().length > 3) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Factor of safety for recommended par - Number of digits cannot be more than 3" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }
    //                    case "RECORDS_PER_PAGE": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No. Of records per page - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 4) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No. Of records per page - Number of digits cannot be more than 4" });
    //                            return false;
    //                        }
    //                    }
    //                    case "DEFAULT_DATE_RANGE": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Date Range - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 2) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Date Range - Number of digits cannot be more than 3" });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                    case "MAX_NO_OF_REC_DOWNLOAD": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max Number of Records to download - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 2) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max Number of Records to download - Number of digits cannot be more than 2" });
    //                            return false;
    //                        }
    //                        //NB-0003466
    //                        if (!(strNewParamValue.toString().length > 0)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max Number of Records to download - Should not be less than 1." });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                    case "PS_USER": {
    //                        let alphaNumaric_RegEx = "alpha_numeric_underscore_hyphen_nospace"; //"/^[a- zA-Z0-9_-]+$/";
    //                        if (strNewParamValue.toString() == "") {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "User ID - Please enter characters or numbers or _." });
    //                            return false;
    //                        } else if (!regExpValidator(alphaNumaric_RegEx, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "User ID - Please enter characters or numbers or _." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 10) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "User ID - Number of characters cannot be more than 10" });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                    case "DEFAULT_PRIORITY": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Location Priority - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 2) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Location Priority - Number of digits cannot be more than 2" });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                    case "LIMIT_OF_LISTS": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Limit number of downloaded pick plans - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 2) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Limit number of downloaded pick plans - Number of digits cannot be more than 2" });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                    case "DEFAULT_BUSINESS_UNIT": {
    //                        let char_RegEx = "alpha_numeric_underscore_hyphen_nospace";//"/^[a-zA-Z_-]+$/";
    //                        if (strNewParamValue.toString() == "") {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Business Unit - Please enter characters or numbers or _." });
    //                            return false;
    //                        } else if (!regExpValidator(char_RegEx, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Business Unit - Please enter characters or numbers or _." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 10) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Business Unit - Number of characters cannot be more than 10" });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                    case "REQUESTOR_EMAIL_TABLE": {
    //                        if (strNewParamValue.toString().length > 50) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Table/view name to read Email ID for Requester - Number of characters cannot be more than 50" });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                    case "B_MAX_STOR": {
    //                        if (strNewParamValue.toString() != "") {
    //                            if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Box Items - Please enter a positive numeric value." });
    //                                return false;
    //                            } else if (strNewParamValue.toString().length > 4) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Box Items - Number of digits cannot be more than 4" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }
    //                    case "E_MAX_STOR": {
    //                        if (strNewParamValue.toString() != "") {
    //                            if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Equipment Items - Please enter a positive numeric value." });
    //                                return false;
    //                            } else if (strNewParamValue.toString().length > 4) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Equipment Items - Number of digits cannot be more than 4" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }
    //                    case "F_MAX_STOR": {
    //                        if (strNewParamValue.toString() != "") {
    //                            if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Furniture Items - Please enter a positive numeric value." });
    //                                return false;
    //                            } else if (strNewParamValue.toString().length > 4) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Furniture Items - Number of digits cannot be more than 4" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }
    //                    case "NO_OF_REQUESTS_FOR_SAME_EQ_ITM": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No. Of Requests for same EQ Item - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 4) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No. Of Requests for same EQ Item - Number of digits cannot be more than 4" });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length == 0) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No. Of Requests for same EQ Item - should not be less than 1" });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                    case "EMAILID_FOR_ALERTS": {
    //                        if (strNewParamValue.toString().length > 50) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Email Id for alerts - Number of characters cannot be more than 50" });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                    case "FREQUENCY_EMAIL_ALERTS": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Frequency of Email Alerts - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 10) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Frequency of Email Alerts - Number of digits cannot be more than 10" });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                    case "PERCENTAGE_OPTIMUM_QTY": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Percentage of Optimum quantity - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 3) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Percentage of Optimum quantity - Number of digits cannot be more than 3" });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                    case "REFRESH_DATA_PERIOD": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Time period for scheduled refresh of ERP data - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 10) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Time period for scheduled refresh of ERP data - Number of digits cannot be more than 10" });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                    case "SYNC_FREQUENCY": {
    //                        if (strNewParamValue.toString() != "") {
    //                            if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Frequency for Syncing - Please enter a positive numeric value." });
    //                                return false;
    //                            } else if (strNewParamValue.toString().length > 2) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Frequency for Syncing - Max. allowable Frequency value is 99" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }
    //                    case "CUSTOM_SQL_DEPT": {
    //                        if (strNewParamValue.toString() == "") {
    //                            blnChkCustSQLDept = true;
    //                        }
    //                        break;
    //                    }
    //                    case "CUSTOM_VIEW_ERPUSER": {
    //                        if (strNewParamValue.toString() == "") {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter Sql View for Employee details" });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                    case "RECALL_NOTIFICATION_EMAIL": {
    //                        if (this.recallParameter == "true") {
    //                            if (strNewParamValue.toString() == "") {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Email for Recall Notification is Mandatory when Recall Management is implemented" });
    //                                return false;
    //                            }
    //                            if (strNewParamValue.toString() != "") {
    //                                var emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //                                //let recalItem_regex = "/^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$/";
    //                                let validate = (new RegExp(emailPattern)).test(strNewParamValue) ? true : false;
    //                                if (!validate) {
    //                                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Please enter valid Email ID in Email for Recall Notification Text box" });
    //                                    return false;
    //                                }
    //                            }
    //                        }
    //                        break;
    //                    }
    //                    case "CATEGORY_CODE": {
    //                        if (strNewParamValue.toString() != "") {
    //                            let regex = "/^[a-zA-Z0-9_-]+$/";
    //                            let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;
    //                            if (!validate) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Category Code - Please enter characters or numbers or _." });
    //                                return false;
    //                            } else if (strNewParamValue.toString().length > 50) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Category Code - Number of characters cannot be more than 50" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }
    //                    case "EXCLUDE_CHRG_CODE_ITEMS_BILING": {
    //                        let regex = "/^[a-zA-Z0-9_-]+$/";
    //                        let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;
    //                        if (!validate) {
    //                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Exclude Items for billing - Please enter characters or numbers" });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                    case "ADT_BILLING_SEND_ADDRESS": {
    //                        if (this.blnChkBillingSystem == true) {
    //                            let regex = "/^[0-9.]+$/";
    //                            let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;
    //                            if (strNewParamValue.toString() == "") {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Billing Send Address - Please enter numbers" });
    //                                return false;
    //                            } else if (!validate) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Billing Send Address - Please enter positive numbers" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }
    //                    case "ADT_BILLING_SEND_PORT": {
    //                        if (this.blnChkBillingSystem == true) {
    //                            let regex = "/^[0-9.]+$/";
    //                            let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;
    //                            if (strNewParamValue.toString() == "") {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Billing Send Port - Please enter numbers" });
    //                                return false;
    //                            } else if (!validate) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Billing Send Port - Please enter positive numbers" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }
    //                    case "ADT_RECEIVING_APPLICATION": {
    //                        let regex = "/^[a-zA-Z0-9]+$/";
    //                        let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;
    //                        if (this.blnChkBillingSystem == true) {
    //                            if (strNewParamValue.toString() == "") {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Receiving Application - Please enter characters or numbers" });
    //                                return false;
    //                            } else if (!validate) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Receiving Application - Please enter characters or numbers" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }
    //                    case "ADT_RECEIVING_FACILITY": {
    //                        if (this.blnChkBillingSystem == true) {
    //                            let regex = "/^[a-zA-Z0-9]+$/";
    //                            let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;
    //                            if (strNewParamValue.toString() == "") {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Receiving Facility - Please enter characters or numbers" });
    //                                return false;
    //                            } else if (!validate) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Receiving Facility - Please enter characters or numbers" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }
    //                    case "ADT_BILLING_THRESHOLD_VALUE": {
    //                        if (this.blnChkBillingSystem == true) {
    //                            let validate = (new RegExp(numaric_regex)).test(strNewParamValue) ? true : false;
    //                            if (strNewParamValue.toString() == "") {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Billing Threshold value - Please enter numbers" });
    //                                return false;
    //                            } else if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Billing Threshold value - Please enter positive numbers" });
    //                                return false;
    //                            }
    //                        }
    //                    }
    //                    case "EMAILID_FOR_LOWSTOCK_ALERTS": {
    //                        var emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //                        // let regex = "/^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$/";
    //                        let validate = (new RegExp(emailPattern)).test(strNewParamValue) ? true : false;
    //                        if (strNewParamValue.toString() != "") {
    //                            if (!validate) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Invalid Email ID for Low Stock Alerts" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }
    //                    case "EMAILID_FOR_PRODUCT_EXP_ALERTS": {
    //                        let regex = "/^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$/";
    //                        let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;
    //                        if (strNewParamValue.toString() != "") {
    //                            if (!validate) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Invalid Email ID for Product Expiration Alerts" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }
    //                    case "DEFAULT_LEAD_TIME": {
    //                        let validate = (new RegExp(numaric_regex)).test(strNewParamValue) ? true : false;
    //                        if (!validate) {
    //                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Default lead time in days - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 3) {
    //                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Default lead time in days  - Number of digits cannot be more than 3." });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                    case "COUNT_QTY_THRESHOLD": {
    //                        if (strNewParamValue.toString() != "") {
    //                            let regex = "/^[0-9]\\d*(\\.\\d+)?$/";
    //                            let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;
    //                            if (!validate) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Max allowable count quantity - Please enter a positive numeric value." });
    //                                return false;
    //                            } else if (parseInt(strNewParamValue) > 99999999999.99) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Max allowable count quantity - Max. allowable count quantity value is 99999999999.99" });
    //                                return false;
    //                            } else if (parseInt(strNewParamValue) <= 0) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Max allowable count quantity - Can not be zero" });
    //                                return false;
    //                            }
    //                        } else if (strNewParamValue.toString().length == 0) {
    //                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Max allowable count quantity - Please enter Numeric Value" });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                    case "COUNT_DLR_VALUE_THRESHOLD": {
    //                        if (strNewParamValue.toString() != "") {
    //                            let regex = "/^[0-9]\\d*(\\.\\d+)?$/";
    //                            let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;
    //                            if (!validate) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Max allowable value $ - Please enter a positive numeric value." });
    //                                return false;
    //                            } else if (parseInt(strNewParamValue.toString()) > 99999999999.99) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Max allowable value $ - Max. allowable $ value is 99999999999.99" });
    //                                return false;
    //                            } else if (parseInt(strNewParamValue.toString()) <= 0) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Max allowable value $ - Can not be zero" });
    //                                return false;
    //                            }
    //                        } else if (strNewParamValue.toString().length == 0) {
    //                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Max allowable value $ - Please enter Numeric Value" });
    //                            return false;
    //                        }
    //                        break;
    //                    }
    //                }
    //            }
    //            if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "RADIO") {
    //                strNewParamValue = this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString();
    //                strParamID = this.atParOrgGrpParametersLst[i].PARAMETER_ID.toString()
    //                strOldParamValue = this.atParOrgGrpParametersLst[i].OLD_PARAMETERVALUE.toString();
    //                this.assignParamEntity.PARAMETER_ID = strParamID;
    //                this.assignParamEntity.PARAMETER_VALUE = strNewParamValue;
    //                if (strOldParamValue != strNewParamValue) {
    //                    boolAudit = true;
    //                    this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
    //                    this.auditSecurity.OLD_VALUE = strOldParamValue;
    //                    this.auditSecurity.NEW_VALUE = strNewParamValue;
    //                    this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
    //                    this.auditSecurity.KEY_1 = this.strOrgGrpId;
    //                    this.auditSecurity.KEY_2 = this.strAppId;
    //                    this.auditSecurity.KEY_3 = strParamID;
    //                    this.auditSecurity.KEY_4 = "";
    //                    this.auditSecurity.KEY_5 = "";
    //                    this.auditSecurityLst.push(this.auditSecurity);
    //                }
    //            }
    //            this.assignParamLst.push(this.assignParamEntity);
    //        }
    //        return true;
    //    } catch (ex) {
    //        this.displayCatchException(ex);
    //    }
    //}
    OrgParametersComponent.prototype.changeInput = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var blnCheckValueAsNone, blnCheckRadioValue, boolAudit, blnChkCustSQLDept, strParamID, strNewParamValue, strOldParamValue, i, strOldChkValue, numaric_regex, _a, orgId, validate, orgId, orgId, validate, orgId, orgId, regex, validate, orgId, orgId, _b, regex, validate, orgId, orgId, validate, orgId, orgId, regex, validate, orgId, orgId, orgId, orgId, regex, validate, orgId, orgId, orgId, orgId, filterRecord, orgId, filterRecord, orgId, strScreenName, ex_10;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 20, , 21]);
                        blnCheckValueAsNone = false;
                        blnCheckRadioValue = false;
                        boolAudit = false;
                        blnChkCustSQLDept = false;
                        strParamID = "";
                        strNewParamValue = "";
                        strOldParamValue = "";
                        this.statusMsgs = [];
                        this.assignParamLst = new Array();
                        this.auditSecurityLst = new Array();
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i <= this.atParOrgGrpParametersLst.length - 1)) return [3 /*break*/, 16];
                        this.statusMsgs = [];
                        this.assignParamEntity = new mt_atpar_org_group_parameters_1.MT_ATPAR_ORG_GROUP_PARAMETERS();
                        strParamID = this.atParOrgGrpParametersLst[i].PARAMETER_ID.toString();
                        strNewParamValue = this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString();
                        strOldParamValue = this.atParOrgGrpParametersLst[i].OLD_PARAMETERVALUE.toString();
                        //RADIO
                        if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "RADIO") {
                            this.assignParamEntity.PARAMETER_ID = strParamID;
                            this.assignParamEntity.PARAMETER_VALUE = this.atParOrgGrpParametersLst[i].PARAMETER_VALUE;
                            if (strParamID == "PICK_ENABLE_LOT_SRL_TRACKING" ||
                                strParamID == "LOT_SERIAL_ENABLED") {
                                if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString()
                                    == AtParEnums_1.Enable_Lot_Serial_Tracking.MMIS.toString()) {
                                    blnCheckRadioValue = true;
                                }
                                else if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString()
                                    == AtParEnums_1.Enable_Lot_Serial_Tracking.None.toString()) {
                                    blnCheckValueAsNone = true;
                                }
                                else {
                                    blnCheckRadioValue = false;
                                    blnCheckValueAsNone = false;
                                }
                                if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE) {
                                    this.atParOrgGrpParametersLst[i].PARAMETER_TYPE = "Y";
                                }
                                else {
                                    this.atParOrgGrpParametersLst[i].PARAMETER_TYPE = "N";
                                }
                            }
                            strNewParamValue = this.atParOrgGrpParametersLst[i].PARAMETER_VALUE;
                            strOldParamValue = this.atParOrgGrpParametersLst[i].OLD_PARAMETERVALUE;
                            if (strNewParamValue != strOldParamValue) {
                                boolAudit = true;
                                this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                this.auditSecurity.OLD_VALUE = "N";
                                this.auditSecurity.NEW_VALUE = "Y";
                                this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                this.auditSecurity.KEY_1 = this.strOrgGrpId;
                                this.auditSecurity.KEY_2 = this.strAppId;
                                this.auditSecurity.KEY_3 = strParamID;
                                this.auditSecurity.KEY_4 = "";
                                this.auditSecurity.KEY_5 = "";
                                this.auditSecurityLst.push(this.auditSecurity);
                            }
                        }
                        if (strParamID == "CUSTOM_SQL_DEPT") {
                            if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == "" ||
                                this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == null) {
                                blnChkCustSQLDept = true;
                            }
                        }
                        //CHECKBOX
                        if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "CHECKBOX") {
                            strOldChkValue = this.atParOrgGrpParametersLst[i].OLD_PARAMETERVALUE.toString();
                            this.assignParamEntity.PARAMETER_ID = strParamID;
                            if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == "true" ||
                                this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == "Y") {
                                this.assignParamEntity.PARAMETER_VALUE = "Y";
                                if (strOldChkValue != "Y") {
                                    boolAudit = true;
                                    this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                    this.auditSecurity.OLD_VALUE = "N";
                                    this.auditSecurity.NEW_VALUE = "Y";
                                    this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                    this.auditSecurity.KEY_1 = this.strOrgGrpId;
                                    this.auditSecurity.KEY_2 = this.strAppId;
                                    this.auditSecurity.KEY_3 = strParamID;
                                    this.auditSecurity.KEY_4 = "";
                                    this.auditSecurity.KEY_5 = "";
                                    this.auditSecurityLst.push(this.auditSecurity);
                                }
                            }
                            else {
                                this.assignParamEntity.PARAMETER_VALUE = "N";
                                if (strOldChkValue != "N") {
                                    boolAudit = true;
                                    this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                    this.auditSecurity.OLD_VALUE = "Y";
                                    this.auditSecurity.NEW_VALUE = "N";
                                    this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                    this.auditSecurity.KEY_1 = this.strOrgGrpId;
                                    this.auditSecurity.KEY_2 = this.strAppId;
                                    this.auditSecurity.KEY_3 = strParamID;
                                    this.auditSecurity.KEY_4 = "";
                                    this.auditSecurity.KEY_5 = "";
                                    this.auditSecurityLst.push(this.auditSecurity);
                                }
                            }
                            if (blnCheckRadioValue) {
                                if (strParamID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS" ||
                                    strParamID == "SEND_LOT_SERIAL_INFO_TO_MMIS") {
                                    this.assignParamEntity.PARAMETER_VALUE = "Y";
                                }
                            }
                            else if (blnCheckValueAsNone) {
                                if (strParamID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS" ||
                                    strParamID == "SEND_LOT_SERIAL_INFO_TO_MMIS") {
                                    this.assignParamEntity.PARAMETER_VALUE = "N";
                                }
                            }
                            if (strParamID == "VALIDATE_DEPT") {
                                if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == "true" ||
                                    this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == true) {
                                    if (blnChkCustSQLDept) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please provide Custom SQL for Syncing Valid Departments." });
                                        return [2 /*return*/, false];
                                    }
                                }
                            }
                        }
                        if (!(this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "TEXTBOX" ||
                            this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "TEXT" ||
                            this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "TEXTAREA")) return [3 /*break*/, 14];
                        numaric_regex = /^[0-9.]+$/;
                        this.assignParamEntity.PARAMETER_ID = strParamID;
                        _a = strParamID;
                        switch (_a) {
                            case "BADGE_TRACK_INFO": return [3 /*break*/, 2];
                            case "ADT_BILLING_SEND_ADDRESS": return [3 /*break*/, 3];
                            case "ADT_BILLING_SEND_PORT": return [3 /*break*/, 4];
                            case "ADT_RECEIVING_APPLICATION": return [3 /*break*/, 5];
                            case "ADT_RECEIVING_FACILITY": return [3 /*break*/, 6];
                            case "ADT_BILLING_THRESHOLD_VALUE": return [3 /*break*/, 8];
                            case "COUNT_QTY_THRESHOLD": return [3 /*break*/, 9];
                            case "COUNT_DLR_VALUE_THRESHOLD": return [3 /*break*/, 10];
                            case "EMAILID_FOR_LOWSTOCK_ALERTS": return [3 /*break*/, 11];
                            case "EMAILID_FOR_PRODUCT_EXP_ALERTS": return [3 /*break*/, 12];
                        }
                        return [3 /*break*/, 13];
                    case 2:
                        {
                            if (strNewParamValue != "" && strNewParamValue != null) {
                                if (parseInt(strNewParamValue) > 3 || parseInt(strNewParamValue) < 1) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "The valid Track Numbers used for reading info from Badge are 1,2,3" });
                                    orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                    if (orgId != null) {
                                        orgId.focus();
                                    }
                                    return [2 /*return*/, false];
                                }
                            }
                            return [3 /*break*/, 13];
                        }
                        _c.label = 3;
                    case 3:
                        {
                            if (this.blnChkBillingSystem == true) {
                                validate = (new RegExp(numaric_regex)).test(strNewParamValue) ? true : false;
                                if (strNewParamValue.toString() == "") {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Billing Send Address - Please enter numbers" });
                                    orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                    if (orgId != null) {
                                        orgId.focus();
                                    }
                                    return [2 /*return*/, false];
                                }
                                else if (!validate) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Billing Send Address - Please enter positive numbers" });
                                    orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                    if (orgId != null) {
                                        orgId.focus();
                                    }
                                    return [2 /*return*/, false];
                                }
                            }
                            return [3 /*break*/, 13];
                        }
                        _c.label = 4;
                    case 4:
                        {
                            if (this.blnChkBillingSystem == true) {
                                validate = (new RegExp(numaric_regex)).test(strNewParamValue) ? true : false;
                                if (strNewParamValue.toString() == "") {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Billing Send Port - Please enter numbers" });
                                    orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                    if (orgId != null) {
                                        orgId.focus();
                                    }
                                    return [2 /*return*/, false];
                                }
                                else if (!validate) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Billing Send Port - Please enter positive numbers" });
                                    orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                    if (orgId != null) {
                                        orgId.focus();
                                    }
                                    return [2 /*return*/, false];
                                }
                            }
                            return [3 /*break*/, 13];
                        }
                        _c.label = 5;
                    case 5:
                        {
                            regex = /^[a-zA-Z0-9]+$/;
                            validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;
                            if (this.blnChkBillingSystem == true) {
                                if (strNewParamValue.toString() == "") {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Receiving Application - Please enter characters or numbers" });
                                    orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                    if (orgId != null) {
                                        orgId.focus();
                                    }
                                    return [2 /*return*/, false];
                                }
                                else if (!validate) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Receiving Application - Please enter characters or numbers" });
                                    orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                    if (orgId != null) {
                                        orgId.focus();
                                    }
                                    return [2 /*return*/, false];
                                }
                            }
                            return [3 /*break*/, 13];
                        }
                        _c.label = 6;
                    case 6:
                        _b = this;
                        return [4 /*yield*/, this.checkBillingInformation()];
                    case 7:
                        _b.blnChkBillingSystem = _c.sent();
                        if (this.blnChkBillingSystem == true) {
                            regex = /^[a-zA-Z0-9]+$/;
                            validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;
                            if (strNewParamValue.toString() == "") {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Receiving Facility - Please enter characters or numbers" });
                                orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                if (orgId != null) {
                                    orgId.focus();
                                }
                                return [2 /*return*/, false];
                            }
                            else if (!validate) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Receiving Facility - Please enter characters or numbers" });
                                orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                if (orgId != null) {
                                    orgId.focus();
                                }
                                return [2 /*return*/, false];
                            }
                        }
                        return [3 /*break*/, 13];
                    case 8:
                        {
                            if (this.blnChkBillingSystem == true) {
                                validate = (new RegExp(numaric_regex)).test(strNewParamValue) ? true : false;
                                if (strNewParamValue.toString() == "") {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Billing Threshold value - Please enter numbers" });
                                    orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                    if (orgId != null) {
                                        orgId.focus();
                                    }
                                    return [2 /*return*/, false];
                                }
                                else if (!validate) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Billing Threshold value - Please enter positive numbers" });
                                    orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                    if (orgId != null) {
                                        orgId.focus();
                                    }
                                    return [2 /*return*/, false];
                                }
                            }
                            return [3 /*break*/, 13];
                        }
                        _c.label = 9;
                    case 9:
                        {
                            if (strNewParamValue.toString() != "") {
                                regex = /^[0-9]\d*(\.\d+)?$/;
                                validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;
                                if (!validate) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max allowable count quantity - Please enter a positive numeric value." });
                                    orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                    if (orgId != null) {
                                        orgId.focus();
                                    }
                                    return [2 /*return*/, false];
                                }
                                else if (parseInt(strNewParamValue) > 99999999999.99) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max allowable count quantity - Max. allowable count quantity value is 99999999999.99" });
                                    orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                    if (orgId != null) {
                                        orgId.focus();
                                    }
                                    return [2 /*return*/, false];
                                }
                                else if (parseInt(strNewParamValue) <= 0) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max allowable count quantity - Can not be zero" });
                                    orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                    if (orgId != null) {
                                        orgId.focus();
                                    }
                                    return [2 /*return*/, false];
                                }
                            }
                            else if (strNewParamValue.toString().length == 0) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max allowable count quantity - Please enter Numeric Value" });
                                orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                if (orgId != null) {
                                    orgId.focus();
                                }
                                return [2 /*return*/, false];
                            }
                            return [3 /*break*/, 13];
                        }
                        _c.label = 10;
                    case 10:
                        {
                            if (strNewParamValue.toString() != "") {
                                regex = /^[0-9]\d*(\.\d+)?$/;
                                validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;
                                if (!validate) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max allowable value $ - Please enter a positive numeric value." });
                                    orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                    if (orgId != null) {
                                        orgId.focus();
                                    }
                                    return [2 /*return*/, false];
                                }
                                else if (parseInt(strNewParamValue.toString()) > 99999999999.99) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max allowable value $ - Max. allowable $ value is 99999999999.99" });
                                    orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                    if (orgId != null) {
                                        orgId.focus();
                                    }
                                    return [2 /*return*/, false];
                                }
                                else if (parseInt(strNewParamValue.toString()) <= 0) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max allowable value $ - Can not be zero" });
                                    orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                    if (orgId != null) {
                                        orgId.focus();
                                    }
                                    return [2 /*return*/, false];
                                }
                            }
                            else if (strNewParamValue.toString().length == 0) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max allowable value $ - Please enter Numeric Value" });
                                orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                if (orgId != null) {
                                    orgId.focus();
                                }
                                return [2 /*return*/, false];
                            }
                            return [3 /*break*/, 13];
                        }
                        _c.label = 11;
                    case 11:
                        {
                            filterRecord = this.atParOrgGrpParametersLst.filter(function (option) { return option.PARAMETER_ID == "SEND_LOWSTOCK_EMAIL_ALERTS"; });
                            if (filterRecord != null && filterRecord.length > 0) {
                                if (filterRecord[0].PARAMETER_VALUE.toString() == AtParEnums_1.YesNo_Enum.Y.toString() ||
                                    filterRecord[0].PARAMETER_VALUE.toString() == 'true') {
                                    if (strNewParamValue == "") {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Email ID for Low Stock Alerts is mandatory." });
                                        orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return [2 /*return*/, false];
                                    }
                                }
                            }
                            return [3 /*break*/, 13];
                        }
                        _c.label = 12;
                    case 12:
                        {
                            filterRecord = this.atParOrgGrpParametersLst.filter(function (option) { return option.PARAMETER_ID == "SEND_PRODUCT_EXP_EMAIL_ALERTS"; });
                            if (filterRecord != null && filterRecord.length > 0) {
                                if (filterRecord[0].PARAMETER_VALUE.toString() == AtParEnums_1.YesNo_Enum.Y.toString() ||
                                    filterRecord[0].PARAMETER_VALUE.toString() == 'true') {
                                    if (strNewParamValue == "") {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Email for Product Expiration Alerts is mandatory." });
                                        orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return [2 /*return*/, false];
                                    }
                                }
                            }
                            return [3 /*break*/, 13];
                        }
                        _c.label = 13;
                    case 13:
                        this.assignParamEntity.PARAMETER_VALUE = this.atParOrgGrpParametersLst[i].PARAMETER_VALUE;
                        if (strOldParamValue != strNewParamValue) {
                            boolAudit = true;
                            this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                            this.auditSecurity.OLD_VALUE = "strOldParamValue";
                            this.auditSecurity.NEW_VALUE = "strNewParamValue";
                            this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                            this.auditSecurity.KEY_1 = this.strOrgGrpId;
                            this.auditSecurity.KEY_2 = this.strAppId;
                            this.auditSecurity.KEY_3 = strParamID;
                            this.auditSecurity.KEY_4 = "";
                            this.auditSecurity.KEY_5 = "";
                            this.auditSecurityLst.push(this.auditSecurity);
                        }
                        _c.label = 14;
                    case 14:
                        this.assignParamLst.push(this.assignParamEntity);
                        _c.label = 15;
                    case 15:
                        i++;
                        return [3 /*break*/, 1];
                    case 16: return [4 /*yield*/, this.atParCommonService.saveAppParameters(this.assignParamLst, this.selectedOrgGrpId, this.strAppId, this.strUserID).
                            catch(this.httpService.handleError).then(function (res) {
                            var response = res.json();
                            _this.spinnerService.stop();
                            switch (response.StatType) {
                                case AtParEnums_1.StatusType.Success: {
                                    if (_this.selectedOrgGrpName == "" || _this.selectedOrgGrpName == null) {
                                        _this.selectedOrgGrpId = '0';
                                    }
                                    _this.strAppId = '-1';
                                    _this.atParOrgGrpParametersLst = [];
                                    _this.isShow = false;
                                    _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Organization group Parameters Updated Successfully" });
                                    break;
                                }
                                case AtParEnums_1.StatusType.Warn: {
                                    _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                    break;
                                }
                                case AtParEnums_1.StatusType.Error: {
                                    _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                    break;
                                }
                                case AtParEnums_1.StatusType.Custom: {
                                    _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                    break;
                                }
                            }
                        })];
                    case 17:
                        _c.sent();
                        if (!(this.boolAudit == true && this.strAudit == "Y")) return [3 /*break*/, 19];
                        strScreenName = this.strMenuCode;
                        return [4 /*yield*/, this.atParCommonService.insertAuditData(this.auditSecurityLst, this.strUserID, strScreenName).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 18:
                        _c.sent();
                        _c.label = 19;
                    case 19: return [3 /*break*/, 21];
                    case 20:
                        ex_10 = _c.sent();
                        this.displayCatchException(ex_10, "changeInput");
                        return [3 /*break*/, 21];
                    case 21: return [2 /*return*/];
                }
            });
        });
    };
    OrgParametersComponent.prototype.change = function (option, event) {
        try {
            if (event != null && event != undefined) {
                if (option.PARAMETER_ID == "SEND_LOWSTOCK_EMAIL_ALERTS") {
                    if (option.PARAMETER_VALUE == AtParEnums_1.YesNo_Enum.Y.toString() ||
                        option.PARAMETER_VALUE == true) {
                        var filteritem = this.atParOrgGrpParametersLst.filter(function (x) { return x.PARAMETER_ID == "EMAILID_FOR_LOWSTOCK_ALERTS"; });
                        if (filteritem != null) {
                            if (filteritem[0].PARAMETER_VALUE == "") {
                                filteritem[0].VALIDATION = "Mandatory,EMAIL";
                            }
                            else {
                                filteritem[0].VALIDATION = "EMAIL";
                            }
                        }
                    }
                }
                else if (option.PARAMETER_ID == "SEND_PRODUCT_EXP_EMAIL_ALERTS") {
                    if (option.PARAMETER_VALUE == AtParEnums_1.YesNo_Enum.Y.toString() ||
                        option.PARAMETER_VALUE == true) {
                        var filteritem = this.atParOrgGrpParametersLst.filter(function (x) { return x.PARAMETER_ID
                            == "EMAILID_FOR_PRODUCT_EXP_ALERTS"; });
                        if (filteritem != null) {
                            if (filteritem[0].PARAMETER_VALUE == "") {
                                filteritem[0].VALIDATION = "Mandatory,EMAIL";
                            }
                            else {
                                filteritem[0].VALIDATION = "EMAIL";
                            }
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "change");
        }
    };
    OrgParametersComponent.prototype.onClick = function (option, event) {
        if (event != null && event != undefined) {
            if (option.PARAMETER_ID == "LOT_SERIAL_ENABLED" ||
                option.PARAMETER_ID == "PICK_ENABLE_LOT_SRL_TRACKING") {
                var paramVal = option.PARAMETER_VALUE;
                var filterItem = this.atParOrgGrpParametersLst.filter(function (x) { return x.PARAMETER_ID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS"; });
                var filterItem1 = this.atParOrgGrpParametersLst.filter(function (x) { return x.PARAMETER_ID == "SEND_LOT_SERIAL_INFO_TO_MMIS"; });
                if (paramVal == "MMIS") {
                    if (filterItem != null && filterItem.length > 0) {
                        if (filterItem[0].PARAMETER_TYPE == "CHECKBOX") {
                            filterItem[0].PARAMETER_VALUE = true;
                            filterItem[0].BLN_DISABLE = true;
                        }
                    }
                    if (filterItem1 != null && filterItem1.length > 0) {
                        if (filterItem1[0].PARAMETER_TYPE == "CHECKBOX") {
                            filterItem1[0].PARAMETER_VALUE = true;
                            filterItem1[0].BLN_DISABLE = true;
                        }
                    }
                }
                else if (paramVal == "None") {
                    if (filterItem != null && filterItem.length > 0) {
                        if (filterItem[0].PARAMETER_TYPE == "CHECKBOX") {
                            filterItem[0].PARAMETER_VALUE = false;
                            filterItem[0].BLN_DISABLE = true;
                        }
                    }
                    if (filterItem1 != null && filterItem1.length > 0) {
                        if (filterItem1[0].PARAMETER_TYPE == "CHECKBOX") {
                            filterItem1[0].PARAMETER_VALUE = false;
                            filterItem1[0].BLN_DISABLE = true;
                        }
                    }
                }
                else {
                    if (filterItem != null && filterItem.length > 0) {
                        filterItem[0].BLN_DISABLE = false;
                    }
                    if (filterItem1 != null && filterItem1.length > 0) {
                        filterItem1[0].BLN_DISABLE = false;
                    }
                }
            }
        }
    };
    OrgParametersComponent.prototype.bindModelDataChange = function (orgParameter, event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.disableButton = false;
                    if (event != null && event.TextBoxID != null && event.validationrules != null) {
                        if ("ADT_BILLING_SEND_ADDRESS" == event.TextBoxID.toString()) {
                            this.countRecevAddress = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("ADT_RECEIVING_APPLICATION" == event.TextBoxID.toString()) {
                            this.countRecevApp = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("ADT_RECEIVING_FACILITY" == event.TextBoxID.toString()) {
                            this.countRecevFacility = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("ADT_BILLING_SEND_PORT" == event.TextBoxID.toString()) {
                            this.countSendPort = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("RECALL_NOTIFICATION_EMAIL" == event.TextBoxID.toString()) {
                            this.recallStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("PS_USER" == event.TextBoxID.toString()) {
                            this.puserStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("DEFAULT_BUSINESS_UNIT" == event.TextBoxID.toString()) {
                            this.defaultBUnitStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("CUSTOM_VIEW_ERPUSER" == event.TextBoxID.toString()) {
                            this.customViewErpUser = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("ADT_RECEIVING_APPLICATION" == event.TextBoxID.toString()) {
                            this.receiveappStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("ADT_RECEIVING_FACILITY" == event.TextBoxID.toString()) {
                            this.receiveFacility = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("COUNT_QTY_THRESHOLD" == event.TextBoxID.toString()) {
                            this.countQtyThreshold = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("COUNT_DLR_VALUE_THRESHOLD" == event.TextBoxID.toString()) {
                            this.countDlrValueThres = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("SEND_LOWSTOCK_EMAIL_ALERTS" == event.TextBoxID.toString()) {
                            this.sendLowStockEmailAlertsStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("SEND_PRODUCT_EXP_EMAIL_ALERTS" == event.TextBoxID.toString()) {
                            this.sendProductExpEmailAlertsStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("SEND_PRODUCT_EXP_EMAIL_ALERTS" == event.TextBoxID.toString()) {
                            this.sendProductExpEmailAlertsStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("DEFAULT_PRIORITY" == event.TextBoxID.toString()) {
                            this.defaultPriorityStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("MAX_NO_OF_REC_DOWNLOAD" == event.TextBoxID.toString()) {
                            this.maxnoOfRecordsStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("LIMIT_OF_LISTS" == event.TextBoxID.toString()) {
                            this.limiOfListsStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("BADGE_TRACK_INFO" == event.TextBoxID.toString()) {
                            this.badgeTrackingNo = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("NO_OF_REQUESTS_FOR_SAME_EQ_ITM" == event.TextBoxID.toString()) {
                            this.noOfRequestsforSame = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("EMAILID_FOR_LOWSTOCK_ALERTS" == event.TextBoxID.toString()) {
                            this.emailIdLowStockAlerts = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("EMAILID_FOR_PRODUCT_EXP_ALERTS" == event.TextBoxID.toString()) {
                            this.emailIdProductExpAlerts = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("PERCENTAGE_OPTIMUM_QTY" == event.TextBoxID.toString()) {
                            this.percentageOptimalQty = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("EMAILID_FOR_ALERTS" == event.TextBoxID.toString()) {
                            this.emailIdForAlerts = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("DEFAULT_LEAD_TIME" == event.TextBoxID.toString()) {
                            this.defaultLeadTimeStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if (this.countRecevAddress == 0 &&
                            this.countRecevApp == 0 &&
                            this.countRecevFacility == 0 &&
                            this.countSendPort == 0 &&
                            this.recallStatus == 0 &&
                            this.puserStatus == 0 &&
                            this.defaultBUnitStatus == 0 &&
                            this.customViewErpUser == 0 &&
                            this.receiveappStatus == 0 &&
                            this.receiveFacility == 0 &&
                            this.countQtyThreshold == 0 &&
                            this.countDlrValueThres == 0 &&
                            this.sendLowStockEmailAlertsStatus == 0 &&
                            this.sendProductExpEmailAlertsStatus == 0 &&
                            this.defaultPriorityStatus == 0 &&
                            this.maxnoOfRecordsStatus == 0 &&
                            this.limiOfListsStatus == 0 &&
                            this.badgeTrackingNo == 0 &&
                            this.noOfRequestsforSame == 0 &&
                            this.percentageOptimalQty == 0 &&
                            this.emailIdForAlerts == 0 &&
                            this.defaultLeadTimeStatus == 0 &&
                            this.emailIdLowStockAlerts == 0 &&
                            this.emailIdProductExpAlerts == 0) {
                            this.disableButton = false;
                        }
                        else {
                            this.disableButton = true;
                        }
                    }
                }
                catch (ex) {
                    this.displayCatchException(ex, "bindModelDataChange");
                }
                return [2 /*return*/];
            });
        });
    };
    OrgParametersComponent.prototype.displayCatchException = function (ex, funName) {
        if (funName === void 0) { funName = ""; }
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spinnerService, ex.toString(), funName, this.constructor.name);
    };
    OrgParametersComponent.prototype.ngOnDestroy = function () {
        this.spinnerService = null;
        this.statusMsgs = [];
        this.atParAppsLst = [];
        this.atParOrgGrpParametersLst = [];
        this.auditSecurity = null;
        this.assignParamEntity = null;
        this.assignParamLst = null;
        this.auditSecurityLst = null;
    };
    OrgParametersComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-org-parameters.component.html',
            providers: [atpar_manage_org_groups_service_1.ManageOrgGroupsService, atpar_common_service_1.AtParCommonService, HttpService_1.HttpService, AtParConstants_1.AtParConstants],
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            atpar_manage_org_groups_service_1.ManageOrgGroupsService,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            AtParConstants_1.AtParConstants,
            HttpService_1.HttpService])
    ], OrgParametersComponent);
    return OrgParametersComponent;
}());
exports.OrgParametersComponent = OrgParametersComponent;
//# sourceMappingURL=atpar-org-parameters.component.js.map