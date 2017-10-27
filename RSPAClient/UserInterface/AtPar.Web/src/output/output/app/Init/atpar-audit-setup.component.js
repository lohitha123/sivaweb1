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
var datatableservice_1 = require("./../components/datatable/datatableservice");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParEnums_3 = require("./../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var atpar_audit_setup_service_1 = require("./atpar-audit-setup.service");
var MT_ATPAR_SECURITY_AUDIT_1 = require("../../app/Entities/MT_ATPAR_SECURITY_AUDIT");
var AuditSetupComponent = (function () {
    function AuditSetupComponent(atParCommonService, atParConstant, httpService, spinnerService, atParAuditSetupService) {
        this.atParCommonService = atParCommonService;
        this.atParConstant = atParConstant;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.atParAuditSetupService = atParAuditSetupService;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        ////for appsDropdown
        this.blnShowAppsLabel = false;
        this.blnShowAppsDD = false;
        this.dataCheckedSorting = [];
        this.isVisible = false;
        this.blnsortbycolumn = true;
        this.custom = "custom";
        this.preField = "";
        this.isAuditRequired = "";
        this.strAudit = "";
        this.strPrevGroup = "";
    }
    AuditSetupComponent.prototype.ngOnInit = function () {
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.pazeSize = +this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.RecordsPerPage];
        this.lstCheckedBUnits = new Array();
        this.dataCheckedSorting = new Array();
        this.dataUncheckedSorting = new Array();
        this.lstgridfilterData = new Array();
        this.getApps();
    };
    AuditSetupComponent.prototype.go = function () {
        try {
            this.getAppMenus();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "go");
        }
    };
    AuditSetupComponent.prototype.ddlChnage = function () {
        this.isVisible = false;
    };
    AuditSetupComponent.prototype.getApps = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParCommonService.getApps(this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.appsData = data.DataList;
                                        if (_this.appsData.length == 1) {
                                        }
                                        else if (_this.appsData.length > 1) {
                                            _this.blnShowAppsDD = true;
                                            _this.lstApps = [];
                                            _this.lstApps.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.appsData.length; i++) {
                                                if (_this.appsData[i].APP_ID != AtParEnums_1.EnumApps.Reports) {
                                                    _this.lstApps.push({ label: _this.appsData[i].APP_NAME, value: _this.appsData[i].APP_ID });
                                                }
                                            }
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
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
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "getApps");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuditSetupComponent.prototype.getAppMenus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isVisible = false;
                        this.growlMessage = [];
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.selectedApp == null || this.selectedApp == undefined || this.selectedApp == "Select One") {
                            this.appidvalue = -1;
                            this.selectedApp = this.appidvalue.toString();
                        }
                        return [4 /*yield*/, this.atParAuditSetupService.getAppMenus(this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID], this.selectedApp)
                                .forEach(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.lstDBData = [];
                                        _this.lstDBData = response.DataList;
                                        for (var i = 0; i <= response.DataList.length - 1; i++) {
                                            if (response.DataList[i].UPDATE_DELETE == "True") {
                                                response.DataList[i].checkvalue = true;
                                            }
                                            else {
                                                response.DataList[i].checkvalue = false;
                                            }
                                        }
                                        _this.lstDBData = response.DataList;
                                        _this.BindDataGrid();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        _this.isVisible = false;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        _this.isVisible = false;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        _this.isVisible = false;
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "getAppMenus");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuditSetupComponent.prototype.BindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                try {
                    this.dataCheckedSorting = [];
                    this.dataUncheckedSorting = [];
                    for (i = 0; i <= this.lstDBData.length - 1; i++) {
                        if (this.lstDBData[i].UPDATE_DELETE == "True") {
                            this.dataCheckedSorting.push(this.lstDBData[i]);
                            this.lstDBData[i].AUDIT = "Y";
                        }
                        else {
                            this.dataUncheckedSorting.push(this.lstDBData[i]);
                            this.lstDBData[i].AUDIT = "N";
                        }
                    }
                    this.isVisible = true;
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "BindDataGrid");
                }
                return [2 /*return*/];
            });
        });
    };
    AuditSetupComponent.prototype.filterdata = function (event) {
        this.lstgridfilterData = [];
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    AuditSetupComponent.prototype.checkAll = function () {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].AUDIT = "Y";
                    this.lstgridfilterData[i].UPDATE_DELETE = "True";
                    this.lstCheckedBUnits.push(this.lstgridfilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].checkvalue = true;
                    this.lstDBData[i].AUDIT = "Y";
                    this.lstDBData[i].UPDATE_DELETE = "True";
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    AuditSetupComponent.prototype.unCheckAll = function () {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].AUDIT = "N";
                    this.lstgridfilterData[i].UPDATE_DELETE = "False";
                    this.lstCheckedBUnits.push(this.lstgridfilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].checkvalue = false;
                    this.lstDBData[i].AUDIT = "N";
                    this.lstDBData[i].UPDATE_DELETE = "False";
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    AuditSetupComponent.prototype.selectedRow = function (values, event) {
        try {
            if (event == true) {
                values.AUDIT = "Y";
                values.UPDATE_DELETE = "True";
            }
            else {
                values.AUDIT = "N";
                values.UPDATE_DELETE = "False";
            }
            for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
                if (this.lstCheckedBUnits[i].MENU_ID === values.MENU_ID) {
                    var index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0);
                    this.lstCheckedBUnits.splice(index, 1);
                }
            }
            this.lstCheckedBUnits.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    };
    AuditSetupComponent.prototype.customSort = function (event, field) {
        var element = event;
        if (this.preField == element.field) {
            if (element.order == 1) {
                element.order = -1;
            }
            else {
                element.order = 1;
            }
            // element.order = !element.order;
        }
        else {
            element.order = 1;
        }
        this.preField = element.field;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        var result = null;
        var order;
        try {
            this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null)
                    result = -1;
                else if (a[element.field] != null && b[element.field] == null)
                    result = 1;
                else if (a[element.field] == null && b[element.field] == null)
                    result = 0;
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                    result = a[element.field].localeCompare(b[element.field]);
                else
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                return (element.order * result);
            });
            this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null)
                    result = -1;
                else if (a[element.field] != null && b[element.field] == null)
                    result = 1;
                else if (a[element.field] == null && b[element.field] == null)
                    result = 0;
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                    result = a[element.field].localeCompare(b[element.field]);
                else
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                return (element.order * result);
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
        this.lstDBData = [];
        this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    };
    //customSort1(event) {
    //    try {
    //        var element = event;
    //        this.blnsortbycolumn = !this.blnsortbycolumn;
    //        this.sortedcheckedrec = [];
    //        this.sorteduncheckedrec = [];
    //        this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
    //            if (a[element.field] < b[element.field])
    //                return -1;
    //            if (a[element.field] > b[element.field])
    //                return 1;
    //            return 0;
    //        });
    //        this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
    //            if (a[element.field] < b[element.field])
    //                return -1;
    //            if (a[element.field] > b[element.field])
    //                return 1;
    //            return 0;
    //        });
    //        if (this.blnsortbycolumn == false) {
    //            this.lstDBData = [];
    //            this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
    //        }
    //        else {
    //            this.lstDBData = [];
    //            this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
    //        }
    //        this.sortedcheckedrec = [];
    //        this.sorteduncheckedrec = [];
    //    }
    //    catch (ex) {
    //        this.clientErrorMsg(ex, "customSort");
    //    }
    //}
    AuditSetupComponent.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParAuditSetupService.saveAuditSetUpInfo(this.lstDBData, this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID])
                                .subscribe(function (response) {
                                _this.growlMessage = [];
                                switch (response.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.checkAuditAllowed();
                                        _this.blnShowAppsDD = true;
                                        _this.selectedApp = undefined;
                                        _this.isVisible = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "save");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuditSetupComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strAudit_1, appid, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        strAudit_1 = "";
                        appid = 0;
                        return [4 /*yield*/, this.atParCommonService.getAuditAllowed(appid, "mt_atpar_audit_setup.aspx").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.isAuditRequired = data.Data;
                                        strAudit_1 = _this.isAuditRequired;
                                        if (_this.isAuditRequired == "Y") {
                                            _this.insertAuditData();
                                        }
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Audit setup Updated Successfully' });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "checkAuditAllowed");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuditSetupComponent.prototype.insertAuditData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var auditSecurity, auditSecurityLst, intCnount, strFunctionName, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        auditSecurity = void 0;
                        auditSecurityLst = void 0;
                        auditSecurityLst = new Array();
                        for (intCnount = 0; intCnount <= this.lstCheckedBUnits.length - 1; intCnount++) {
                            if (this.lstCheckedBUnits[intCnount].AUDIT.toString() == "Y") {
                                auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                auditSecurity.FIELD_NAME = "UPDATE_DELETE";
                                auditSecurity.OLD_VALUE = "N";
                                auditSecurity.NEW_VALUE = "Y";
                                auditSecurity.KEY_1 = this.lstCheckedBUnits[intCnount].APP_ID.toString();
                                auditSecurity.KEY_2 = this.lstCheckedBUnits[intCnount].MENU_NAME.toString();
                                auditSecurity.KEY_3 = "";
                                auditSecurity.KEY_4 = "";
                                auditSecurity.KEY_5 = "";
                                auditSecurityLst.push(auditSecurity);
                            }
                            else {
                                auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                auditSecurity.FIELD_NAME = "UPDATE_DELETE";
                                auditSecurity.OLD_VALUE = "Y";
                                auditSecurity.NEW_VALUE = "N";
                                auditSecurity.KEY_1 = this.lstCheckedBUnits[intCnount].APP_ID.toString();
                                auditSecurity.KEY_2 = this.lstCheckedBUnits[intCnount].MENU_NAME.toString();
                                auditSecurity.KEY_3 = "";
                                auditSecurity.KEY_4 = "";
                                auditSecurity.KEY_5 = "";
                                auditSecurityLst.push(auditSecurity);
                            }
                        }
                        strFunctionName = "Audit Setup";
                        return [4 /*yield*/, this.atParCommonService.insertAuditData(auditSecurityLst, this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID], strFunctionName).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "insertAuditData");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuditSetupComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    AuditSetupComponent.prototype.ngOnDestroy = function () {
        this.lstCheckedBUnits = null;
        this.lstDBData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    };
    AuditSetupComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-audit-setup.component.html',
            providers: [datatableservice_1.datatableservice, HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, atpar_audit_setup_service_1.AtParAuditSetupService, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants,
            HttpService_1.HttpService, event_spinner_service_1.SpinnerService, atpar_audit_setup_service_1.AtParAuditSetupService])
    ], AuditSetupComponent);
    return AuditSetupComponent;
}());
exports.AuditSetupComponent = AuditSetupComponent;
//# sourceMappingURL=atpar-audit-setup.component.js.map