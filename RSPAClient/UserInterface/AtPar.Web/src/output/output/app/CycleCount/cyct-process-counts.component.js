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
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParWebApiResponse_1 = require("../Shared/AtParWebApiResponse");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var datatable_1 = require("../components/datatable/datatable");
var cyct_process_counts_service_1 = require("./cyct-process-counts.service");
var MT_ATPAR_SECURITY_AUDIT_1 = require("../Entities/MT_ATPAR_SECURITY_AUDIT");
var VM_UPDATE_REVIEWER_DATA_1 = require("../entities/VM_UPDATE_REVIEWER_DATA");
var api_1 = require("../components/common/api");
var file_saver_1 = require("file-saver");
var ProcessCountsComponent = (function () {
    function ProcessCountsComponent(dataservice, spinnerService, atParCommonService, httpService, atParConstant, processSevice, confirmationService) {
        this.dataservice = dataservice;
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.processSevice = processSevice;
        this.confirmationService = confirmationService;
        this.growlMessage = [];
        this.pop = false;
        this.usersList = [];
        this.activateSend = false;
        this.loading = true;
        this.lstAuditData = [];
        this.performManualCounts = "";
        this.reviewManualCounts = "";
        this.reviewCounts = "";
        this.lstOrgGroups = [];
        this.lstBUnits = [];
        this.ddlOrgGroups = [];
        this.ddlBunit = [];
        this.ddlEvent = [];
        this.lblOrgGrpID = "";
        this.selectedOrgGrpID = "";
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupID = false;
        this.selectedBUnit = "";
        this.selectedEventID = "";
        this.lstEventId = [];
        this.startIndex = 0;
        this.isParentEvent = "";
        this.blnEventIsSplit = false;
        this.lstEventDetails = [];
        this.transIDCount = 0;
        this.orderHistory = "";
        this.eventDetails = [];
        this.lstColDetails = [];
        this.activeFlag = "true";
        this.ddlStatus = [];
        this.lstUpdateReviewerData = [];
        this.strUpdateCntDtWeb = '';
        this.auditSatus = '';
        this.isSend = false;
        this.showDropDowns = false;
        this.m_strEditCounts = '';
        this.isMailDialog = false;
        this.blnSortByColumn = false;
        this.preField = '';
    }
    ProcessCountsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        this.growlMessage = [];
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.strMenuCode = localStorage.getItem("menuCode");
                        this.getProfileParamValue();
                        return [4 /*yield*/, this.orgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.UPDATE_COUNTDATE_WEB].toString())];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.orgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.REVIEW_COUNTS].toString())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.orgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.PERFORM_MANUAL_COUNTS].toString())];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.orgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.REVIEW_MANUAL_COUNTS].toString())];
                    case 4:
                        _a.sent();
                        if (!(this.reviewCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N.toString()] &&
                            ((this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N.toString()] && this.reviewManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N.toString()] ||
                                (this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N.toString()]))))) return [3 /*break*/, 5];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Check Review Counts Organization Parameter" });
                        this.showDropDowns = false;
                        return [2 /*return*/];
                    case 5:
                        this.showDropDowns = true;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 6:
                        _a.sent();
                        this.spinnerService.stop();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pop = false;
                        this.growlMessage = [];
                        this.ddlEvent = [];
                        this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                        if (this.selectedOrgGrpID == "Select One") {
                            this.ddlBunit = [];
                            this.ddlBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                            return [2 /*return*/];
                        }
                        this.selectedBUnit = "Select BUnit";
                        this.selectedEventID = "Select EventId";
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.populateBUnits()];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "ddlOrgGrpIdChanged");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.ddlBUnitChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.growlMessage = [];
                        this.pop = false;
                        this.ddlEvent = [];
                        this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                        if (!((this.selectedBUnit != "Select BUnit") && (this.selectedBUnit != undefined) && (this.selectedBUnit != ''))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.populateEventIds()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "ddlBUnitChanged");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.ddlEventChanged = function () {
        this.growlMessage = [];
        this.pop = false;
    };
    ProcessCountsComponent.prototype.gridBound = function () {
        try {
            for (var item in this.eventDetails) {
                if (this.eventDetails[item].CONSIGNED_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()]) {
                    this.eventDetails[item].rowClsStyle = 'ui-datatable-green';
                }
                else {
                    if (this.eventDetails[item].L_S_CONTROLLED == 'L' || this.eventDetails[item].L_S_CONTROLLED == 'S' ||
                        this.eventDetails[item].L_S_CONTROLLED == 'B') {
                        this.eventDetails[item].rowClsStyle = 'ui-datatable-brown';
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "gridBound");
        }
    };
    ProcessCountsComponent.prototype.bindModelDataChange = function (ven) {
        this.growlMessage = [];
        try {
            if (ven.SERIAL_CONTROLLED == 'Y') {
                if (ven.activeCount > 1) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Qty cannot be greater than 1 for serial item" });
                    ven.activeCount = '';
                }
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "bindModelDataChange");
        }
    };
    ProcessCountsComponent.prototype.go = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.pop = false;
                        this.growlMessage = [];
                        if (this.selectedOrgGrpID == "Select One" || this.selectedOrgGrpID == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        if (this.selectedBUnit == "Select BUnit" || this.selectedBUnit == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        if (this.selectedEventID == "Select EventId" || this.selectedEventID == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.bindGrid()];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "go");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.getProfileParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], AtParEnums_2.EnumApps.CycleCount, 'EDIT_COUNTS')
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.m_strEditCounts = res.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "getProfileParamValue");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.orgGroupParamValue = function (orgGrpParamName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var cycleCntAppId, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        cycleCntAppId = AtParEnums_2.EnumApps.CycleCount;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getOrgGroupParamValue(orgGrpParamName, cycleCntAppId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var response;
                                return __generator(this, function (_a) {
                                    response = res.json();
                                    if (orgGrpParamName == AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.REVIEW_COUNTS].toString()) {
                                        this.reviewCounts = (response.DataVariable != null) ? response.DataVariable.toString() : "";
                                    }
                                    else if (orgGrpParamName == AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.PERFORM_MANUAL_COUNTS].toString()) {
                                        this.performManualCounts = (response.DataVariable != null) ? response.DataVariable.toString() : "";
                                    }
                                    else if (orgGrpParamName == AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.REVIEW_MANUAL_COUNTS].toString()) {
                                        this.reviewManualCounts = (response.DataVariable != null) ? response.DataVariable.toString() : "";
                                    }
                                    else if (orgGrpParamName == "STORE_DETAILED_COUNT_HISTORY") {
                                        this.orderHistory = (response.DataVariable != null) ? response.DataVariable.toString() : "";
                                    }
                                    else if (orgGrpParamName.toString() == "UPDATE_COUNTDATE_WEB") {
                                        this.strUpdateCntDtWeb = (response.DataVariable != null) ? response.DataVariable.toString() : "";
                                    }
                                    else {
                                        return [2 /*return*/];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "orgGroupParamValue");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.ddlBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                        this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                        return [4 /*yield*/, this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a, i;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            data = res.json();
                                            this.growlMessage = [];
                                            _a = data.StatType;
                                            switch (_a) {
                                                case AtParEnums_2.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_2.StatusType.Warn: return [3 /*break*/, 5];
                                                case AtParEnums_2.StatusType.Error: return [3 /*break*/, 6];
                                                case AtParEnums_2.StatusType.Custom: return [3 /*break*/, 7];
                                            }
                                            return [3 /*break*/, 8];
                                        case 1:
                                            this.lstOrgGroups = data.DataList;
                                            this.spinnerService.stop();
                                            if (!(this.lstOrgGroups.length == 1)) return [3 /*break*/, 3];
                                            this.blnShowOrgGroupLabel = true;
                                            this.lblOrgGrpID = this.lstOrgGroups[0].ORG_GROUP_ID + " - " + this.lstOrgGroups[0].ORG_GROUP_NAME;
                                            this.selectedOrgGrpID = this.lstOrgGroups[0].ORG_GROUP_ID;
                                            return [4 /*yield*/, this.populateBUnits()];
                                        case 2:
                                            _b.sent();
                                            return [3 /*break*/, 8];
                                        case 3:
                                            if (this.lstOrgGroups.length > 1) {
                                                this.blnShowOrgGroupID = true;
                                                this.ddlOrgGroups = [];
                                                this.ddlOrgGroups.push({ label: "Select One", value: "Select One" });
                                                for (i = 0; i < this.lstOrgGroups.length; i++) {
                                                    if (this.lstOrgGroups[i].ORG_GROUP_ID !== "All") {
                                                        this.ddlOrgGroups.push({ label: this.lstOrgGroups[i].ORG_GROUP_ID + " - " + this.lstOrgGroups[i].ORG_GROUP_NAME, value: this.lstOrgGroups[i].ORG_GROUP_ID });
                                                    }
                                                }
                                                this.selectedOrgGrpID = this.ddlOrgGroups[0].value;
                                            }
                                            _b.label = 4;
                                        case 4: return [3 /*break*/, 8];
                                        case 5:
                                            {
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 6;
                                        case 6:
                                            {
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 7;
                                        case 7:
                                            {
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 8;
                                        case 8: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.populateBUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isOrgBUnitsExist = false;
                        this.spinnerService.start();
                        if ((this.selectedOrgGrpID == "Select One") && this.blnShowOrgGroupID) {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.ddlBunit = [];
                        this.ddlBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                        return [4 /*yield*/, this.atParCommonService.getOrgBusinessUnits(this.selectedOrgGrpID, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        _this.lstBUnits = data.DataList;
                                        for (var item in _this.lstBUnits) {
                                            _this.ddlBunit.push({ label: _this.lstBUnits[item], value: _this.lstBUnits[item] });
                                        }
                                        _this.selectedBUnit = _this.ddlBunit[0].value;
                                        isOrgBUnitsExist = true;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.pop = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.ddlEvent = [];
                                        _this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.pop = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.pop = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(isOrgBUnitsExist)];
                    case 3:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "populateBUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.bindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.usersList = [];
                        this.ddlStatus = [];
                        this.ddlStatus.push({ label: "Downloaded", value: "1" });
                        this.ddlStatus.push({ label: "Counting", value: "4" });
                        this.ddlStatus.push({ label: "Completed", value: "7" });
                        this.ddlStatus.push({ label: "Cancelled", value: "13" });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.getProfileParamValue()];
                    case 2:
                        _a.sent();
                        if (this.selectedEventID == "Select EventId" || this.selectedEventID == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
                            return [2 /*return*/];
                        }
                        if (!(this.selectedBUnit != "Select BUnit" && this.selectedEventID != "Select EventId")) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getCount()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getEventDetails()];
                    case 4:
                        _a.sent();
                        if (this.lstEventDetails["EVENT_DETAILS"].length == 0) {
                            this.pop = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                            return [2 /*return*/];
                        }
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "bindGrid");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.userCount = function (col, col1) {
        try {
            var val = "";
            var userIndex = this.usersList.findIndex(function (a) { return a.header == col1.header; });
            var ColName = void 0;
            ColName = "COUNT" + userIndex;
            val = col[ColName];
            return val;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "userCount");
        }
    };
    ProcessCountsComponent.prototype.getCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.processSevice.CheckIfEventIsParentEvent(this.selectedBUnit, this.selectedEventID, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.isParentEvent = data.DataVariable.toString();
                                        if (_this.isParentEvent == "true") {
                                            _this.activateSend = true;
                                        }
                                        else {
                                            _this.activateSend = false;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.pop = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.pop = false;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.pop = false;
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, "getCount");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.getEventDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.processSevice.getEventDetails(this.selectedEventID, this.selectedBUnit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        _this.lstEventDetails = [];
                                        _this.eventDetails = [];
                                        _this.usersList = [];
                                        var lstData = data.DataDictionary["EVENT_SPLIT_DETAILS"];
                                        if (lstData[0].ISSPLITTED.toString() > 0) {
                                            _this.blnEventIsSplit = true;
                                        }
                                        else {
                                            _this.blnEventIsSplit = false;
                                        }
                                        _this.lstEventDetails = data.DataDictionary;
                                        if (data.DataDictionary["EVENT_DETAILS"].length > 0) {
                                            _this.eventDetails = data.DataDictionary["EVENT_DETAILS"];
                                            if (_this.lstEventDetails["EVENT_TRANSACTIONS"].length > 0) {
                                                for (var cnt in _this.lstEventDetails["EVENT_TRANSACTIONS"]) {
                                                    if (_this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].COMPLETED_DATE != null && _this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].COMPLETED_DATE != '') {
                                                        var dateStr = new Date(_this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].COMPLETED_DATE).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                                    }
                                                    _this.usersList.push({
                                                        header: _this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].EVENTUSERS,
                                                        completedDate: _this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].COMPLETED_DATE != null ? dateStr.replace(',', '') : "",
                                                        userstatus: _this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].EVENT_STATUS,
                                                        previousStatus: _this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].EVENT_STATUS,
                                                        USER_ID: _this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].USER_ID,
                                                        TRANSACTION_ID: _this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].TRANSACTION_ID,
                                                    });
                                                }
                                            }
                                            var iscalled = false;
                                            var LtCnt = 0;
                                            var checkedUser = "";
                                            for (var intCnt = 0; intCnt <= _this.eventDetails.length - 1; intCnt++) {
                                                iscalled = false;
                                                LtCnt = 0;
                                                checkedUser = "";
                                                _this.eventDetails[intCnt].DESCRIPTION = (_this.eventDetails[intCnt].DESCRIPTION != null) ? _this.eventDetails[intCnt].DESCRIPTION : '';
                                                _this.eventDetails[intCnt].INV_ITEM_ID1 = _this.eventDetails[intCnt].INV_ITEM_ID + " " + _this.eventDetails[intCnt].DESCRIPTION;
                                                _this.eventDetails[intCnt]["checkedUser"] = "";
                                                _this.eventDetails[intCnt]["previousCount"] = "";
                                                _this.eventDetails[intCnt]["rowUpdated"] = "N";
                                                _this.eventDetails[intCnt]["CountDate"] = "";
                                                _this.eventDetails[intCnt]["TransID"] = "";
                                                _this.eventDetails[intCnt]["FinalCount"] = '';
                                                _this.eventDetails[intCnt]["User_TransID"] = '';
                                                _this.eventDetails[intCnt].COUNT_DIFF = (_this.eventDetails[intCnt].COUNT_DIFF == '-9999') ? '' : _this.eventDetails[intCnt].COUNT_DIFF;
                                                _this.eventDetails[intCnt].COUNT_DIFFS = _this.eventDetails[intCnt].COUNT_DIFF;
                                                _this.eventDetails[intCnt].COUNT_DIFF_PER = (_this.eventDetails[intCnt].COUNT_DIFF_PER == '-9999') ? '' : _this.eventDetails[intCnt].COUNT_DIFF_PER;
                                                _this.eventDetails[intCnt].COUNT_DIFF_PERS = _this.eventDetails[intCnt].COUNT_DIFF_PER;
                                                _this.eventDetails[intCnt].VALUE_DIFF = (_this.eventDetails[intCnt].VALUE_DIFF == '-9999') ? '' : _this.eventDetails[intCnt].VALUE_DIFF;
                                                _this.eventDetails[intCnt].VALUE_DIFFS = _this.eventDetails[intCnt].VALUE_DIFF;
                                                _this.eventDetails[intCnt].EXT_VALUE = (_this.eventDetails[intCnt].EXT_VALUE == '-9999') ? '' : _this.eventDetails[intCnt].EXT_VALUE;
                                                _this.eventDetails[intCnt].EXT_VALUES = _this.eventDetails[intCnt].EXT_VALUE;
                                                for (var Cnt = 0; Cnt <= _this.usersList.length - 1; Cnt++) {
                                                    var ColName = "COUNT_" + Cnt;
                                                    var ColName1 = "activeFlag_" + Cnt;
                                                    var _strCount = void 0;
                                                    var arrCount = _this.eventDetails[intCnt]["COUNT" + Cnt].toString().split(",");
                                                    _this.eventDetails[intCnt][ColName] = arrCount[0];
                                                    _strCount = arrCount[0];
                                                    if (arrCount[5] == 'Y') {
                                                        iscalled = false;
                                                    }
                                                    if (_strCount == "N") {
                                                        iscalled = true;
                                                        if ((_this.eventDetails[intCnt].EVENT_TYPE != null || _this.eventDetails[intCnt].EVENT_TYPE != '')
                                                            && parseInt(_this.eventDetails[intCnt].EVENT_TYPE) == AtParEnums_2.EventType.Manual
                                                            && (_this.eventDetails[intCnt].UNIT_OF_MEASURE.toString().toUpperCase() != _this.eventDetails[intCnt].STD_PACK_UOM.toString().toUpperCase())) {
                                                            _this.eventDetails[intCnt].SYS_QTY1 = _this.eventDetails[intCnt].SYS_QTY + " " + _this.eventDetails[intCnt].STD_PACK_UOM;
                                                        }
                                                        else if (_this.eventDetails[intCnt].UNIT_OF_MEASURE.toString().toUpperCase() == _this.eventDetails[intCnt].STD_PACK_UOM.toString().toUpperCase())
                                                            _this.eventDetails[intCnt].SYS_QTY1 = _this.eventDetails[intCnt].SYS_QTY + " " + _this.eventDetails[intCnt].UNIT_OF_MEASURE;
                                                        else
                                                            _this.eventDetails[intCnt].SYS_QTY1 = _this.eventDetails[intCnt].SYS_QTY + " " + _this.eventDetails[intCnt].UNIT_OF_MEASURE + " " + _this.eventDetails[intCnt].STD_PACK_UOM;
                                                    }
                                                    else {
                                                        if (!iscalled) {
                                                            if ((_this.eventDetails[intCnt].EVENT_TYPE != null || _this.eventDetails[intCnt].EVENT_TYPE != '')
                                                                && parseInt(_this.eventDetails[intCnt].EVENT_TYPE) == AtParEnums_2.EventType.Manual
                                                                && (_this.eventDetails[intCnt].UNIT_OF_MEASURE.toString().toUpperCase() != _this.eventDetails[intCnt].STD_PACK_UOM.toString().toUpperCase())) {
                                                                if ((_strCount != null && _strCount != '') && _this.eventDetails[intCnt].CONVERSION_RATE != '' && _this.eventDetails[intCnt].CONVERSION_RATE != undefined) {
                                                                    _strCount = (parseFloat(_strCount) * parseFloat(_this.eventDetails[intCnt].CONVERSION_RATE)).toString();
                                                                    _this.eventDetails[intCnt].SYS_QTY1 = _this.eventDetails[intCnt].SYS_QTY + " " + _this.eventDetails[intCnt].STD_PACK_UOM;
                                                                }
                                                            }
                                                            else if (_this.eventDetails[intCnt].UNIT_OF_MEASURE.toString().toUpperCase() == _this.eventDetails[intCnt].STD_PACK_UOM.toString().toUpper)
                                                                _this.eventDetails[intCnt].SYS_QTY1 = _this.eventDetails[intCnt].SYS_QTY + " " + _this.eventDetails[intCnt].UNIT_OF_MEASURE;
                                                            else
                                                                _this.eventDetails[intCnt].SYS_QTY1 = _this.eventDetails[intCnt].SYS_QTY + " " + _this.eventDetails[intCnt].UNIT_OF_MEASURE;
                                                        }
                                                        if (arrCount[5] == 'Y') {
                                                            LtCnt = arrCount[0];
                                                        }
                                                        if (arrCount[5] == "Y") {
                                                            _this.eventDetails[intCnt]["FinalCount"] = arrCount[0];
                                                            _this.eventDetails[intCnt][ColName1] = true;
                                                            _this.eventDetails[intCnt]["showSelectedCount"] = true;
                                                            _this.eventDetails[intCnt]["activeFlag"] = "true";
                                                            _this.eventDetails[intCnt]["User_TransID"] = arrCount[3];
                                                            if (_strCount == null || _strCount == '' || _strCount == undefined) {
                                                                _strCount = "0";
                                                            }
                                                            if ((parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)) < 0) {
                                                                _this.eventDetails[intCnt].COUNT_DIFFS = Math.abs(parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)).toFixed(2);
                                                                _this.eventDetails[intCnt].COUNT_DIFF = "(" + parseFloat(Math.abs(parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)).toFixed(2)).toLocaleString('en') + ")";
                                                            }
                                                            else {
                                                                _this.eventDetails[intCnt].COUNT_DIFFS = parseFloat((parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)).toFixed(2));
                                                                _this.eventDetails[intCnt].COUNT_DIFF = parseFloat((parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)).toFixed(2)).toLocaleString('en');
                                                            }
                                                            _this.eventDetails[intCnt].COUNT_DIFF_PER = (((parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)) / parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)) * 100);
                                                            _this.eventDetails[intCnt].COUNT_DIFF_PERS = (((parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)) / parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)) * 100);
                                                            if (_this.eventDetails[intCnt].LATEST_SYSQTY == 0) {
                                                                _this.eventDetails[intCnt].COUNT_DIFF_PER = _this.addZeroes(_this.eventDetails[intCnt].LATEST_SYSQTY);
                                                                _this.eventDetails[intCnt].COUNT_DIFF_PERS = _this.addZeroes(_this.eventDetails[intCnt].LATEST_SYSQTY);
                                                            }
                                                            else {
                                                                if (parseFloat(_this.eventDetails[intCnt].COUNT_DIFF_PER) < 0) {
                                                                    _this.eventDetails[intCnt].COUNT_DIFF_PERS = (Math.abs(parseFloat(_this.eventDetails[intCnt].COUNT_DIFF_PER))).toFixed(2);
                                                                    _this.eventDetails[intCnt].COUNT_DIFF_PER = "(" + (Math.abs(parseFloat(_this.eventDetails[intCnt].COUNT_DIFF_PER))).toFixed(2) + ")";
                                                                }
                                                                else {
                                                                    _this.eventDetails[intCnt].COUNT_DIFF_PER = _this.addZeroes(_this.eventDetails[intCnt].COUNT_DIFF_PER);
                                                                    _this.eventDetails[intCnt].COUNT_DIFF_PERS = _this.addZeroes(_this.eventDetails[intCnt].COUNT_DIFF_PER); //sorting purpose
                                                                }
                                                            }
                                                            if ((parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)) < 0) {
                                                                _this.eventDetails[intCnt].VALUE_DIFFS = parseFloat((parseFloat((Math.abs(parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY))).toString()) * (_this.eventDetails[intCnt].ITEM_PRICE)).toFixed(2));
                                                                _this.eventDetails[intCnt].VALUE_DIFF = "(" + parseFloat((parseFloat((Math.abs(parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY))).toString()) * (_this.eventDetails[intCnt].ITEM_PRICE)).toFixed(2)).toLocaleString('en') + ")";
                                                                if (_this.eventDetails[intCnt].VALUE_DIFFS == 0) {
                                                                    _this.eventDetails[intCnt].VALUE_DIFF = "(" + parseFloat("0.0").toFixed(2) + ")";
                                                                    _this.eventDetails[intCnt].VALUE_DIFFS = parseFloat("0.0").toFixed(2);
                                                                }
                                                            }
                                                            else {
                                                                _this.eventDetails[intCnt].VALUE_DIFF = parseFloat(((parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)) * (_this.eventDetails[intCnt].ITEM_PRICE)).toFixed(2)).toLocaleString('en');
                                                                _this.eventDetails[intCnt].VALUE_DIFFS = parseFloat(((parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)) * (_this.eventDetails[intCnt].ITEM_PRICE)).toFixed(2));
                                                            }
                                                            _this.eventDetails[intCnt].EXT_VALUES = parseFloat((_strCount * (_this.eventDetails[intCnt].ITEM_PRICE)).toFixed(2));
                                                            _this.eventDetails[intCnt].EXT_VALUE = parseFloat((_strCount * (_this.eventDetails[intCnt].ITEM_PRICE)).toFixed(2)).toLocaleString('en');
                                                            _this.eventDetails[intCnt]["rowUpdated"] = "Y";
                                                            _this.eventDetails[intCnt]["CountDate"] = arrCount[4];
                                                        }
                                                        else {
                                                            _this.eventDetails[intCnt][ColName1] = false;
                                                            // this.eventDetails[intCnt]["activeFlag"] = "false";                                                
                                                        }
                                                        _this.eventDetails[intCnt]["previousCount"] = arrCount[0];
                                                        _this.eventDetails[intCnt]["checkedUser"] = arrCount[2];
                                                        _this.eventDetails[intCnt]["TransID"] = arrCount[3];
                                                        _this.eventDetails[intCnt].ITEM_REC_NUM = (_this.eventDetails[intCnt].ITEM_REC_NUM == '' || _this.eventDetails[intCnt].ITEM_REC_NUM == undefined) ? arrCount[1] : _this.eventDetails[intCnt].ITEM_REC_NUM;
                                                    }
                                                    _this.eventDetails[intCnt]["rowIndex"] = intCnt;
                                                    _this.eventDetails[intCnt]["activeCount"] = LtCnt;
                                                }
                                            }
                                            _this.gridBound();
                                            _this.pop = true;
                                        }
                                        else {
                                            _this.pop = false;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.pop = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.pop = false;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.pop = false;
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "getEventDetails");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.populateEventIds = function () {
        var _this = this;
        this.growlMessage = [];
        try {
            this.spinnerService.start();
            this.atParCommonService.getEventIds(this.selectedBUnit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then(function (res) {
                var data = res.json();
                _this.growlMessage = [];
                switch (data.StatType) {
                    case AtParEnums_2.StatusType.Success: {
                        _this.ddlEvent = [];
                        _this.spinnerService.stop();
                        _this.lstEventId = data.DataList;
                        _this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                        if (data.DataList.length > 0) {
                            if (_this.performManualCounts != "" && _this.performManualCounts != undefined) {
                                if (_this.reviewCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y] && _this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y] && _this.reviewManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y]) {
                                    for (var item in _this.lstEventId) {
                                        _this.ddlEvent.push({ label: _this.lstEventId[item].EVENT_ID, value: _this.lstEventId[item].EVENT_ID });
                                    }
                                }
                                else {
                                    var drEvents = new Array();
                                    if (_this.reviewCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() &&
                                        (_this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && _this.reviewManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString())
                                        || (_this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString())) {
                                        drEvents = _this.lstEventId.filter(function (a) { return a.EVENT_TYPE == AtParEnums_2.EventType.Regular; });
                                    }
                                    else if (_this.reviewCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString() &&
                                        (_this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && _this.reviewManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString())) {
                                        drEvents = _this.lstEventId.filter(function (a) { return a.EVENT_TYPE == AtParEnums_2.EventType.Manual; });
                                    }
                                    if (drEvents.length > 0) {
                                        for (var item in drEvents) {
                                            _this.ddlEvent.push({ label: drEvents[item].EVENT_ID, value: drEvents[item].EVENT_ID });
                                        }
                                    }
                                    else {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                        return;
                                    }
                                }
                            }
                            else {
                                for (var item in _this.lstEventId) {
                                    _this.ddlEvent.push({ label: _this.lstEventId[item].EVENT_ID, value: _this.lstEventId[item].EVENT_ID });
                                }
                            }
                        }
                        _this.selectedEventID = _this.ddlEvent[0].value;
                        _this.spinnerService.stop();
                        break;
                    }
                    case AtParEnums_2.StatusType.Warn: {
                        _this.pop = false;
                        _this.spinnerService.stop();
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        _this.ddlEvent = [];
                        _this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                        break;
                    }
                    case AtParEnums_2.StatusType.Error: {
                        _this.pop = false;
                        _this.spinnerService.stop();
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case AtParEnums_2.StatusType.Custom: {
                        _this.pop = false;
                        _this.spinnerService.stop();
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateEventIds");
        }
    };
    ProcessCountsComponent.prototype.SaveData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var saveStatusCode, lstIssueOrqQty, cnt, strCount, strItemRecNum, strCountUser, strTransID, strCountDate, strPrevCount, strItemID, strCount1, strCount2, _dblConvertRate, strIssueQty, strOrderQty, audit, updateReviewerData, blnFlag, finalUserList, finalCount, usersListStatus, intCnt, strStatus, strTransStatus, strTransId, eventStatus, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.spinnerService.start();
                        this.lstUpdateReviewerData = [];
                        this.lstAuditData = [];
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        saveStatusCode = 0;
                        if (this.selectedOrgGrpID == "Select One" || this.selectedOrgGrpID == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        if (this.selectedBUnit == "Select BUnit" || this.selectedBUnit == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        if (this.selectedEventID == "Select EventId" || this.selectedEventID == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 19, , 20]);
                        return [4 /*yield*/, this.orgGroupParamValue("STORE_DETAILED_COUNT_HISTORY")];
                    case 2:
                        _a.sent();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.eventDetails.filter(function (a) { return a.rowUpdated == 'Y'; })];
                    case 3:
                        lstIssueOrqQty = _a.sent();
                        if (lstIssueOrqQty.length > 0) {
                            for (cnt = 0; cnt <= lstIssueOrqQty.length - 1; cnt++) {
                                if (lstIssueOrqQty[cnt].activeCount != '' && lstIssueOrqQty[cnt].activeCount != null) {
                                    strCount = lstIssueOrqQty[cnt].activeCount;
                                    strItemRecNum = lstIssueOrqQty[cnt].ITEM_REC_NUM;
                                    strCountUser = lstIssueOrqQty[cnt].checkedUser;
                                    strTransID = lstIssueOrqQty[cnt].User_TransID;
                                    strCountDate = lstIssueOrqQty[cnt].CountDate;
                                    strPrevCount = lstIssueOrqQty[cnt].previousCount;
                                    strItemID = lstIssueOrqQty[cnt].INV_ITEM_ID;
                                    strCount1 = lstIssueOrqQty[cnt].COUNT_QTY1;
                                    strCount2 = lstIssueOrqQty[cnt].COUNT_QTY2;
                                    if (strCount1 == null || strCount1 == '')
                                        strCount1 = 0;
                                    if (strCount2 == null || strCount2 == '')
                                        strCount2 = 0;
                                    if (strCount.toString() != strPrevCount.toString()) {
                                        audit = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                        audit.OLD_VALUE = strPrevCount;
                                        audit.NEW_VALUE = strCount;
                                        audit.KEY_2 = this.selectedBUnit;
                                        audit.KEY_3 = this.selectedEventID;
                                        audit.KEY_4 = strCount;
                                        audit.KEY_5 = '';
                                        audit.FIELD_NAME = "REVIEWER_COUNT";
                                        this.lstAuditData.push(audit);
                                        if (strCount1 == 0 && strCount2 == 0) {
                                            strIssueQty = strCount.ToString;
                                            strOrderQty = 0;
                                        }
                                        else if (strCount1 == 0) {
                                            _dblConvertRate = (strPrevCount.ToString - strCount1) / strCount2;
                                            strIssueQty = (strCount % _dblConvertRate);
                                            strOrderQty = (strCount / _dblConvertRate);
                                        }
                                        else if (strCount2 == 0) {
                                            strIssueQty = strCount;
                                            strOrderQty = 0;
                                        }
                                        else {
                                            _dblConvertRate = (strPrevCount - strCount1) / strCount2;
                                            strIssueQty = (strCount.ToString % _dblConvertRate);
                                            strOrderQty = (strCount.ToString / _dblConvertRate);
                                        }
                                    }
                                    else {
                                        strIssueQty = strCount1;
                                        strOrderQty = strCount2;
                                    }
                                    updateReviewerData = new VM_UPDATE_REVIEWER_DATA_1.VM_UPDATE_REVIEWER_DATA();
                                    updateReviewerData.REVIEWERCNT = strCount;
                                    updateReviewerData.ISSUECNT = strIssueQty;
                                    updateReviewerData.ORDERCNT = strOrderQty;
                                    if (strCount != strCountUser)
                                        updateReviewerData.UPDATEUSER = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                                    else
                                        updateReviewerData.UPDATEUSER = strCountUser;
                                    updateReviewerData.ITEMRECNUM = strItemRecNum;
                                    updateReviewerData.TRANSID = strTransID;
                                    updateReviewerData.UPDATEDT = strCountDate;
                                    updateReviewerData.UPDATECNTDTWEB = this.strUpdateCntDtWeb;
                                    updateReviewerData.INVITEMID = strItemID;
                                    this.lstUpdateReviewerData.push(updateReviewerData);
                                    strIssueQty = '';
                                    strOrderQty = '';
                                    strCount1 = '';
                                    strCount2 = '';
                                }
                            }
                        }
                        blnFlag = false;
                        if (!(this.lstUpdateReviewerData.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.processSevice.updateReviewer(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.lstUpdateReviewerData, this.selectedEventID, this.selectedBUnit)
                                .catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data;
                                return __generator(this, function (_a) {
                                    data = res.json();
                                    this.growlMessage = [];
                                    switch (data.StatType) {
                                        case AtParEnums_2.StatusType.Success: {
                                            this.spinnerService.stop();
                                            saveStatusCode = data.StatusCode;
                                            if (saveStatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                                return [2 /*return*/, saveStatusCode];
                                            }
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Warn: {
                                            this.pop = false;
                                            saveStatusCode = data.StatusCode;
                                            this.spinnerService.stop();
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            this.ddlEvent = [];
                                            this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Error: {
                                            this.pop = false;
                                            saveStatusCode = data.StatusCode;
                                            this.spinnerService.stop();
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Custom: {
                                            this.pop = false;
                                            saveStatusCode = data.StatusCode;
                                            this.spinnerService.stop();
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this.spinnerService.start();
                        return [4 /*yield*/, this.processSevice.updateHdrDetails(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedBUnit, this.selectedEventID)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                if (data.StatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    return data.StatusCode;
                                }
                            })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.checkAuditAllowed()];
                    case 7:
                        saveStatusCode = _a.sent();
                        if (saveStatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, saveStatusCode];
                        }
                        if (!(this.auditSatus == 'Y')) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.insertAuditData(this.lstAuditData)];
                    case 8:
                        saveStatusCode = (_a.sent());
                        _a.label = 9;
                    case 9:
                        this.spinnerService.start();
                        if (saveStatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.spinnerService.stop();
                            return [2 /*return*/, saveStatusCode];
                        }
                        return [4 /*yield*/, this.usersList.length];
                    case 10:
                        if (!((_a.sent()) > 0)) return [3 /*break*/, 15];
                        finalUserList = [];
                        finalCount = this.eventDetails.filter(function (x) { return x.activeCount != '' && x.activeCount != null; });
                        usersListStatus = this.usersList.filter(function (a) { return a.previousStatus != a.userstatus; });
                        if (!(usersListStatus.length > 0)) return [3 /*break*/, 15];
                        intCnt = 0;
                        _a.label = 11;
                    case 11:
                        if (!(intCnt <= usersListStatus.length - 1)) return [3 /*break*/, 15];
                        strStatus = '';
                        strTransStatus = '';
                        strTransId = '';
                        eventStatus = '';
                        //  let transID = this.eventDetails.filter(a => a.User_TransID == usersListStatus[intCnt].TRANSACTION_ID);
                        //if (transID.length > 0) {
                        //    strTransId = transID[0].User_TransID;
                        //}
                        //let transStatus = usersListStatus.filter(a => a.TRANSACTION_ID == strTransId);
                        //updated on 09-09-2017 Begining
                        eventStatus = usersListStatus[intCnt].previousStatus;
                        strStatus = usersListStatus[intCnt].userstatus;
                        strTransId = usersListStatus[intCnt].TRANSACTION_ID;
                        if (!(eventStatus != strStatus)) return [3 /*break*/, 14];
                        if (!(((strStatus.toString() == "7" || strStatus.toString() == "4") && (finalCount.length > 0)) || strStatus == "13")) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.updateStatusForTransaction(strStatus, strTransId)];
                    case 12:
                        saveStatusCode = _a.sent();
                        if (saveStatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.revertUserStatusToPreviosState();
                            return [2 /*return*/, saveStatusCode];
                        }
                        return [3 /*break*/, 14];
                    case 13:
                        blnFlag = true;
                        _a.label = 14;
                    case 14:
                        intCnt++;
                        return [3 /*break*/, 11];
                    case 15:
                        if (!blnFlag) return [3 /*break*/, 17];
                        return [4 /*yield*/, this.getEventDetails()];
                    case 16:
                        _a.sent();
                        if (this.isSend) {
                            saveStatusCode = AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK;
                        }
                        else {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No counts selected to update" });
                            saveStatusCode = 1111;
                        }
                        return [3 /*break*/, 18];
                    case 17:
                        if (saveStatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage = [];
                            saveStatusCode = AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK;
                            if (!this.isSend) {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Saved Successfully" });
                                if (saveStatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    this.pop = false;
                                    this.ddlEvent = [];
                                    this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                                    this.selectedEventID = "Select EventId";
                                    this.selectedBUnit = "Select BUnit";
                                }
                            }
                        }
                        else {
                            this.spinnerService.stop();
                            return [2 /*return*/, saveStatusCode];
                        }
                        _a.label = 18;
                    case 18:
                        this.spinnerService.stop();
                        return [2 /*return*/, saveStatusCode];
                    case 19:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12, "SaveData");
                        return [2 /*return*/, saveStatusCode];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.revertUserStatusToPreviosState = function () {
        for (var intCnt in this.usersList) {
            this.usersList[intCnt].userstatus = this.usersList[intCnt].previousStatus;
        }
    };
    ProcessCountsComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var statusCode, webresp_1, exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        statusCode = -1;
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        webresp_1 = new AtParWebApiResponse_1.AtParWebApiResponse();
                        return [4 /*yield*/, this.atParCommonService.getAuditAllowed(AtParEnums_2.EnumApps.CycleCount, this.strMenuCode)
                                .catch(this.httpService.handleError).then(function (res) {
                                webresp_1 = res.json();
                                statusCode = webresp_1.StatusCode;
                                _this.spinnerService.stop();
                                if (statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.auditSatus = webresp_1.Data.toString();
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_1 = _a.sent();
                        this.clientErrorMsg(exMsg_1, "checkAuditAllowed");
                        return [2 /*return*/, statusCode];
                    case 4: return [2 /*return*/, statusCode];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.insertAuditData = function (lstAuditData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var statusCode, exMsg_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        statusCode = -1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParCommonService.insertAuditData(lstAuditData, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.strMenuCode).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        statusCode = response.StatusCode;
                                        _this.spinnerService.stop();
                                        //this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Saved Successfully" });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        statusCode = response.StatusCode;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        statusCode = response.StatusCode;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        statusCode = response.StatusCode;
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
                        exMsg_2 = _a.sent();
                        statusCode = AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR;
                        this.clientErrorMsg(exMsg_2, "insertAuditData");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, statusCode];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.changeStatus = function (ven, val, finalCount, selectedUser, transID) {
        try {
            var y = 123;
            ven.activeCount = val;
            ven.rowUpdated = "Y";
            ven.FinalCount = finalCount;
            if (finalCount.split(',').length > 0) {
                ven.transID = finalCount.split(',')[3];
                ven.INV_ITEM_ID = finalCount.split(',')[7];
                ven.ITEM_REC_NUM = finalCount.split(',')[1];
            }
            //ven.activeFlag = "true";        
            //ven["activeFlag_"+index] = true;
            ven.showSelectedCount = true;
            this.populateSelectedCounts(val, ven, finalCount, selectedUser, transID);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "changeStatus");
        }
    };
    ProcessCountsComponent.prototype.addZeroes = function (num) {
        try {
            // Cast as number
            var result = void 0;
            var numb = Number(num);
            // If not a number, return 0
            if (isNaN(numb)) {
                return 0;
            }
            // If there is no decimal, or the decimal is less than 2 digits, toFixed           
            if (numb.toString().split(".").length < 2 || numb.toString().split(".")[1].length <= 2) {
                result = numb.toFixed(2);
            }
            // Return the number
            return result;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "addZeroes");
        }
    };
    ProcessCountsComponent.prototype.populateSelectedCounts = function (val, ven, finalCount, selectedUser, userTransID) {
        try {
            var txtCount;
            var lblCount;
            var rdCount;
            var intcnt;
            if (ven != null) {
                var strCount;
                var lblCountDiff;
                var lblCountDiffPer;
                var lblValDiff;
                var lblExtVal;
                var lblSysQty;
                var lblPrice;
                var intCountDiff;
                var lblFinalCount;
                var lblItemID;
                var lblDispCount;
                var lblLot;
                var lblCustItemNo;
                var lblSerial;
                lblCountDiff = ven.COUNT_DIFF;
                lblCountDiffPer = ven.COUNT_DIFF_PER;
                lblValDiff = ven.VALUE_DIFF;
                lblExtVal = ven.EXT_VALUE;
                //  ContentPlaceHolder1_dgdrEvents_lblSysqty_0
                lblSysQty = ven.LATEST_SYSQTY;
                lblPrice = ven.ITEM_PRICE;
                //Label with counts beside the radio button
                lblCount = finalCount;
                //Hidden label containing the final counts(data) which needs to be updated to the database
                //Textbox with the selected count when edit counts parameter is checked
                lblItemID = ven.INV_ITEM_ID;
                //Label with the selected count when edit counts parameter is unchecked
                lblLot = ven.INV_LOT_ID;
                lblCustItemNo = ven.CUST_ITEM_NO;
                lblSerial = ven.SERIAL_ID;
                txtCount = val;
                lblDispCount = val;
                /*If edit counts parameter checked then display textbox, if not display label in
                selected counts cloumn */
                var intCountDiffPer;
                var intValDiff;
                var intExtVal;
                ven.User_TransID = userTransID;
                if (val != '') {
                    //Format the count diff, count diff percentage, val diff, ext val values to precision 2
                    ven.checkedUser = selectedUser;
                    intCountDiff = val - lblSysQty;
                    if (intCountDiff < 0) {
                        ven.COUNT_DIFF = "(" + Math.abs(intCountDiff.toFixed(2)) + ")";
                    }
                    else {
                        ven.COUNT_DIFF = intCountDiff.toFixed(2);
                    }
                    if (lblSysQty == 0) {
                        ven.COUNT_DIFF_PER = 0.00;
                    }
                    else {
                        intCountDiffPer = intCountDiff / lblSysQty * 100;
                        if (intCountDiffPer < 0) {
                            ven.COUNT_DIFF_PER = "(" + Math.abs(intCountDiffPer.toFixed(2)) + ")";
                        }
                        else {
                            ven.COUNT_DIFF_PER = intCountDiffPer.toFixed(2);
                        }
                    }
                    intValDiff = intCountDiff * lblPrice;
                    if (intValDiff < 0) {
                        ven.VALUE_DIFF = "(" + Math.abs(intValDiff.toFixed(2)) + ")";
                    }
                    else {
                        ven.VALUE_DIFF = intValDiff.toFixed(2);
                    }
                    intExtVal = val * lblPrice;
                    if (intExtVal < 0) {
                        ven.EXT_VALUE = "(" + Math.abs(intExtVal.toFixed(2)) + ")";
                    }
                    else {
                        ven.EXT_VALUE = intExtVal.toFixed(2);
                    }
                }
                else {
                    ven.COUNT_DIFF = '';
                    ven.COUNT_DIFF_PER = '';
                    ven.VALUE_DIFF = '';
                    ven.EXT_VALUE = '';
                }
                lblFinalCount = lblCount.split(',')[0];
                var arrFinalCount;
                var strFinalCount;
                var i;
                if (lblFinalCount != '' && lblFinalCount != null) {
                    ven.FinalCount = lblFinalCount;
                }
                strFinalCount = lblFinalCount;
                arrFinalCount = strFinalCount.split(',');
                /* Updates the hidden label values with the counts changed while radio button changed
                and the prev value being updated */
                for (i = 0; i <= arrFinalCount.length - 3; i++) {
                    if (i == 0) {
                        /*when we change the radio button the value in textbox also changes hence
                        using the textbox value itself*/
                        lblFinalCount = txtCount;
                    }
                    else {
                        lblFinalCount = lblFinalCount + ',' + arrFinalCount[i];
                    }
                }
                /* Appending the label value with the prev count and item id these are required
                while updating the counts */
                lblFinalCount = lblFinalCount + ',' + arrFinalCount[0] + ',' + lblItemID;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateSelectedCounts");
        }
    };
    ProcessCountsComponent.prototype.sendEvent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var statusCode, blnAllEventsDownloaded, blnAllEventsCounted, blnStatusUpdated, blnSend, ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        statusCode = -1;
                        blnAllEventsDownloaded = false;
                        blnAllEventsCounted = false;
                        blnStatusUpdated = false;
                        blnSend = false;
                        this.isSend = true;
                        if (this.selectedOrgGrpID == "Select One" || this.selectedOrgGrpID == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        if (this.selectedBUnit == "Select BUnit" || this.selectedBUnit == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        if (this.selectedEventID == "Select EventId" || this.selectedEventID == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 14, , 15]);
                        return [4 /*yield*/, this.SaveData()];
                    case 2:
                        statusCode = _a.sent();
                        this.isSend = false;
                        if (statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage = [];
                            this.isSend = false;
                            this.spinnerService.stop();
                            if (statusCode == AtParStatusCodes_1.AtparStatusCodes.S_CYCT_RECOUNTS_EXIST) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "This event has Items assigned for recount, please unassign before cancelling the event." });
                                return [2 /*return*/];
                            }
                            else if (statusCode == 1111) {
                                return [2 /*return*/];
                            }
                        }
                        this.spinnerService.start();
                        if (!this.blnEventIsSplit) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.processSevice.CheckIfAllEventsDownloaded(this.selectedEventID, this.selectedBUnit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                switch (response.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        blnAllEventsDownloaded = response.DataVariable;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.isSend = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.isSend = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.isSend = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _a.sent();
                        if (!!blnAllEventsDownloaded) return [3 /*break*/, 5];
                        //this.pop = false;
                        this.isSend = false;
                        return [4 /*yield*/, this.getEventDetails()];
                    case 4:
                        _a.sent();
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Few of the sub events are not downloaded, please download and count them to send to ERP" });
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, this.processSevice.CheckIfAllEventsCounted(this.selectedEventID, this.selectedBUnit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                            .catch(this.httpService.handleError).then(function (res) {
                            var response = res.json();
                            switch (response.StatType) {
                                case AtParEnums_2.StatusType.Success: {
                                    blnAllEventsCounted = response.DataVariable;
                                    break;
                                }
                                case AtParEnums_2.StatusType.Warn: {
                                    _this.isSend = false;
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                    _this.spinnerService.stop();
                                    break;
                                }
                                case AtParEnums_2.StatusType.Error: {
                                    _this.isSend = false;
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                    _this.spinnerService.stop();
                                    break;
                                }
                                case AtParEnums_2.StatusType.Custom: {
                                    _this.isSend = false;
                                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                    _this.spinnerService.stop();
                                    break;
                                }
                            }
                        })];
                    case 6:
                        _a.sent();
                        if (!!blnAllEventsCounted) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.getEventDetails()];
                    case 7:
                        _a.sent();
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Few of the items are not counted, Please count them to send to ERP" });
                        this.isSend = false;
                        return [2 /*return*/];
                    case 8: return [4 /*yield*/, this.processSevice.CheckIfStatusUpdatedForCountedEvent(this.selectedEventID, this.selectedBUnit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                            .catch(this.httpService.handleError).then(function (res) {
                            var response = res.json();
                            switch (response.StatType) {
                                case AtParEnums_2.StatusType.Success: {
                                    blnStatusUpdated = response.DataVariable;
                                    break;
                                }
                                case AtParEnums_2.StatusType.Warn: {
                                    _this.isSend = false;
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                    _this.spinnerService.stop();
                                    break;
                                }
                                case AtParEnums_2.StatusType.Error: {
                                    _this.isSend = false;
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                    _this.spinnerService.stop();
                                    break;
                                }
                                case AtParEnums_2.StatusType.Custom: {
                                    _this.isSend = false;
                                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                    _this.spinnerService.stop();
                                    break;
                                }
                            }
                        })];
                    case 9:
                        _a.sent();
                        if (!blnStatusUpdated) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Counting or Completed status to Submit the counts" });
                            this.isSend = false;
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.processSevice.CheckStatusOfEvents(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedBUnit, this.selectedEventID)
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                switch (response.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        blnSend = response.DataVariable;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.isSend = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.isSend = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.isSend = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 10:
                        _a.sent();
                        if (!blnSend) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.processSevice.SendEvent(this.selectedBUnit, this.selectedEventID, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], this.orderHistory)
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                switch (response.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        blnSend = response.DataVariable;
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Sent Successfully" });
                                        _this.spinnerService.stop();
                                        _this.pop = false;
                                        _this.ddlEvent = [];
                                        _this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                                        _this.selectedEventID = "Select EventId";
                                        _this.selectedBUnit = "Select BUnit";
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.isSend = false;
                                        if (response.StatusCode == AtParStatusCodes_1.AtparStatusCodes.S_EVENT_PROCESSED_INERP) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Event already processed in the ERP and cannot upload the counts" });
                                            return;
                                        }
                                        else if (response.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_NO_ERP_USER_ID) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP User Id required to upload to server" });
                                            return;
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                            _this.spinnerService.stop();
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.isSend = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.isSend = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Events with status other than Completed cannot be sent" });
                        return [2 /*return*/];
                    case 13:
                        this.isSend = false;
                        this.spinnerService.stop();
                        return [3 /*break*/, 15];
                    case 14:
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13, "sendEvent");
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.updateStatusForTransaction = function (strStatus, strTransId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var saveStatusCode, ex_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        saveStatusCode = -1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.processSevice.updateStatusForTransaction(strStatus, strTransId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a, blnNoCntsExists;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            data = res.json();
                                            this.growlMessage = [];
                                            _a = data.StatType;
                                            switch (_a) {
                                                case AtParEnums_2.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_2.StatusType.Warn: return [3 /*break*/, 5];
                                                case AtParEnums_2.StatusType.Error: return [3 /*break*/, 6];
                                                case AtParEnums_2.StatusType.Custom: return [3 /*break*/, 7];
                                            }
                                            return [3 /*break*/, 8];
                                        case 1:
                                            saveStatusCode = data.StatusCode;
                                            blnNoCntsExists = '';
                                            blnNoCntsExists = data.DataVariable.toString();
                                            if (!(blnNoCntsExists == "true" && strStatus != '13')) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.getEventDetails()];
                                        case 2:
                                            _b.sent();
                                            this.spinnerService.stop();
                                            if (!this.isSend) {
                                                saveStatusCode = AtParStatusCodes_1.AtparStatusCodes.INV_E_ITEMDONOTEXIST;
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Counts for the items.Please count them before changing the status for the event" });
                                            }
                                            this.revertUserStatusToPreviosState();
                                            return [2 /*return*/];
                                        case 3:
                                            saveStatusCode = AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK;
                                            if (!this.isSend) {
                                                // this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Saved Successfully" });
                                            }
                                            _b.label = 4;
                                        case 4: return [3 /*break*/, 8];
                                        case 5:
                                            {
                                                this.pop = false;
                                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.S_CYCT_RECOUNTS_EXIST) {
                                                    saveStatusCode = data.StatusCode;
                                                    this.spinnerService.stop();
                                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "This event has Items assigned for recount,please unassign before cancelling the event." });
                                                    //this.ddlEvent = [];
                                                    //this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                                                }
                                                else {
                                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                    saveStatusCode = data.StatusCode;
                                                }
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 6;
                                        case 6:
                                            {
                                                saveStatusCode = data.StatusCode;
                                                this.pop = false;
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 7;
                                        case 7:
                                            {
                                                saveStatusCode = data.StatusCode;
                                                this.pop = false;
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 8;
                                        case 8: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_14 = _a.sent();
                        this.clientErrorMsg(ex_14, "updateStatusForTransaction");
                        return [2 /*return*/, saveStatusCode];
                    case 4: return [2 /*return*/, saveStatusCode];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.confirm = function () {
        var _this = this;
        try {
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: 'Do you want to Send Data to ERP? ',
                accept: function () {
                    _this.sendEvent();
                },
                reject: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.spinnerService.start();
                                return [4 /*yield*/, this.bindGrid()];
                            case 1:
                                _a.sent();
                                this.spinnerService.stop();
                                return [2 /*return*/];
                        }
                    });
                }); }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "confirm");
        }
    };
    ProcessCountsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ProcessCountsComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var statusCode, html, blob, ex_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        statusCode = -1;
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        //if (html != '' && html != null) {
                        //    var ua = window.navigator.userAgent;
                        //    var msie = ua.indexOf("MSIE ");
                        //    // If Internet Explorer
                        //    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                        //        statusCode = -1;
                        //        let folderName: string = '';
                        //        await this.atParCommonService.exportToExcel(html, "cyct-process-counts_", "cyct-process-counts_report")
                        //            .then((res: Response) => {
                        //                let data = res.json();
                        //                statusCode = data.StatusCode;
                        //                if (statusCode.toString() == AtparStatusCodes.ATPAR_OK.toString()) {
                        //                    folderName = data.DataVariable.toString();
                        //                    var filename = this.httpService.BaseUrl + '/Uploaded/' + folderName + '/cyct-process-counts_report.xls';
                        //                    var query = '?download';
                        //                    window.open(filename + query);
                        //                }
                        //                else {
                        //                    this.growlMessage = [];
                        //                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error.' });
                        //                }
                        //            });
                        //        await this.atParCommonService.deleteExcel(folderName, "cyct-process-counts_report")
                        //            .then((res: Response) => {
                        //            });
                        //    } else {
                        //        var a = document.createElement('a');
                        //        var data_type = 'data:application/vnd.ms-excel';
                        //        html = html.replace(/ /g, '%20');
                        //        a.href = data_type + ', ' + html;
                        //        a.download = 'cyct-process-counts_report.xls';
                        //        a.click();
                        //    }
                        //}
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "ProcessCountReport.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_15 = _a.sent();
                        this.clientErrorMsg(ex_15, 'onExportToExcelClick');
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Print')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<style>@page{size:landscape;"}</style><html><head><title>' + 'CycleCount - Process Count' + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                mywindow.document.close(); // necessary for IE >= 10
                                mywindow.focus(); // necessary for IE >= 10*/                   
                                return [2 /*return*/, true];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_16 = _a.sent();
                        this.clientErrorMsg(ex_16, 'onPrintClick');
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.isMailDialog = true;
                    this.toMailAddr = '';
                }
                catch (ex) {
                    this.clientErrorMsg(ex, 'onSendMailIconClick');
                }
                return [2 /*return*/];
            });
        });
    };
    ProcessCountsComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, statusCode_1, ex_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.growlMessage = [];
                        if (this.toMailAddr == '' || this.toMailAddr == undefined) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Email Address to Send' });
                            return [2 /*return*/];
                        }
                        val = this.validateEmail(this.toMailAddr);
                        if (!val) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Email Address to Send' });
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        this.isMailDialog = false;
                        return [4 /*yield*/, this.exportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        this.growlMessage = [];
                        statusCode_1 = -1;
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Process Count', JSON.stringify(html), this.toMailAddr, AtParEnums_1.MailPriority.Normal.toString(), '')
                                .then(function (res) {
                                _this.spinnerService.stop();
                                var data = res.json();
                                statusCode_1 = data.StatusCode;
                            })];
                    case 2:
                        _a.sent();
                        if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Mail has been sent' });
                        }
                        else if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'From Address is Missing! Please Contact Administrator' });
                        }
                        else if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Please Enter valid Email Address to Send' });
                        }
                        else if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                        }
                        else if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_BODY) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                        }
                        else if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Email Server not configured! Please contact Administrator' });
                        }
                        else if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SEND_FAILED) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                        }
                        else {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                        }
                        _a.label = 3;
                    case 3:
                        // if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_17 = _a.sent();
                        this.clientErrorMsg(ex_17, 'onSendMailClick');
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, ipAddress, gstrProtocal, gstrServerName, gstrPortNo, statusCode, sbMailText, _strFrmDt, _strToDt, imgserverPath, drow, _strTransStatus, strStatus, dgItem, strFontColor, strConsignedflag, strLotOrSerial, intuser, StrCountQty, ex_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        ipAddress = '';
                        gstrProtocal = '';
                        gstrServerName = '';
                        gstrPortNo = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, 6, 7]);
                        statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        return [4 /*yield*/, this.atParCommonService.getServerIP()
                                .catch(this.httpService.handleError)
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data;
                                return __generator(this, function (_a) {
                                    data = res.json();
                                    switch (data.StatType) {
                                        case AtParEnums_2.StatusType.Success: {
                                            ipAddress = data.DataVariable.toString();
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Error: {
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Warn: {
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Custom: {
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    if (data.StatType != AtParEnums_2.StatusType.Success) {
                                        htmlBuilder = '';
                                        return [2 /*return*/, htmlBuilder];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.atParCommonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data;
                                return __generator(this, function (_a) {
                                    this.growlMessage = [];
                                    data = res.json();
                                    switch (data.StatType) {
                                        case AtParEnums_2.StatusType.Success: {
                                            gstrProtocal = data.Data.PROTOCOL.toString();
                                            gstrServerName = data.Data.SERVER_NAME.toString();
                                            gstrPortNo = data.Data.PORT_NO.toString();
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Error: {
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Warn: {
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Custom: {
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    if (data.StatType != AtParEnums_2.StatusType.Success) {
                                        htmlBuilder = '';
                                        return [2 /*return*/, htmlBuilder];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 3:
                        _a.sent();
                        imgserverPath = gstrProtocal + '://' + ipAddress + '/atpar/AtParWebApi/assets/images/';
                        htmlBuilder += "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == "Print") {
                            htmlBuilder += "<TR width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='63' nowrap><img height='63' src=" + imgserverPath + "logo.jpg nowrap></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=12 align=left><span class=c2>Process Counts for Business Unit <b>" + this.selectedBUnit + "</b> and EventID  <b>" + this.selectedEventID + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else if (reqType == "Excel") {
                            htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            htmlBuilder += "<TR  height='27px'><TD height='27px'  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=12 align=left><span class=c2>Process Counts For Business Unit <b>" + this.selectedBUnit + "</b> and EventID  <b>" + this.selectedEventID + "</b></span></td><td align=right valign=top>&nbsp;";
                        }
                        else if (reqType == "Mail") {
                            htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            htmlBuilder += "<TR  height='27px'><TD height='27px'  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=12 align=left><span class=c2>Process Counts For Business Unit <b>" + this.selectedBUnit + "</b> and EventID  <b>" + this.selectedEventID + "</b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> ";
                        htmlBuilder += "<table align=left width=99% style=" + "BORDER-COLLAPSE:collapse" + " border=1>";
                        htmlBuilder += "<tr >";
                        htmlBuilder += "<td align=center><span class=c2><b>Item ID (Description)</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Custom Item NO</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Lot #</b></span></td>";
                        htmlBuilder += "<td align=center><span class=c2><b>Serial #</b></span></td>";
                        htmlBuilder += "<TD align=center nowrap><span class=c2><b>Mfg ItemID </b></span></TD>";
                        htmlBuilder += "<TD align=center nowrap><span class=c2><b>Storage Location</b></span></TD>";
                        htmlBuilder += "<TD align=center nowrap><span class=c2><b>Item Price($)</b></span></TD>";
                        htmlBuilder += "<TD align=center nowrap><span class=c2><b>Sys Qty - UOM</b></span></TD>";
                        for (drow in this.usersList) {
                            _strTransStatus = this.usersList[drow].userstatus.toString();
                            strStatus = '';
                            if (_strTransStatus == "1")
                                strStatus = "Downloaded";
                            else if (_strTransStatus == "7")
                                strStatus = "Completed";
                            else if (_strTransStatus == "4")
                                strStatus = "Counting";
                            else if (_strTransStatus == "13")
                                strStatus = "Cancelled";
                            else if (_strTransStatus == "11")
                                strStatus = "Sent";
                            htmlBuilder += "<td align=center nowrap><span class=c2><b>" + this.lstEventDetails["EVENT_TRANSACTIONS"][drow].EVENTUSERS + "<br /> Status <br />" + strStatus + "<br /> Count Qty</b></span></TD>";
                        }
                        htmlBuilder += "<TD align=center nowrap><span class=c2><b>Selected Count</b></span></TD>";
                        htmlBuilder += "<TD align=center nowrap><span class=c2><b>Count Diff</b></span></TD>";
                        htmlBuilder += "<TD align=center nowrap><span class=c2><b>Count Diff (%)</b></span></TD>";
                        htmlBuilder += "<TD align=center nowrap><span class=c2><b>Value Diff($)</b></span></TD>";
                        htmlBuilder += "<TD align=center nowrap><span class=c2><b>Ext $ Value</b></span></TD>";
                        htmlBuilder += "</tr>";
                        if (this.eventDetails != null) {
                            for (dgItem in this.eventDetails) {
                                strFontColor = "None";
                                strConsignedflag = this.eventDetails[dgItem].CONSIGNED_FLAG;
                                strLotOrSerial = this.eventDetails[dgItem].L_S_CONTROLLED;
                                if (strConsignedflag == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()]) {
                                    strFontColor = "DarkGreen";
                                }
                                else {
                                    if (strLotOrSerial == "L" ||
                                        strLotOrSerial == "S" ||
                                        strLotOrSerial == "B") {
                                        strFontColor = "Brown";
                                    }
                                }
                                htmlBuilder += "<tr >";
                                htmlBuilder += "<td align=left><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].INV_ITEM_ID + " " + this.eventDetails[dgItem].DESCRIPTION + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].CUST_ITEM_NO + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].INV_LOT_ID + "</span></td>";
                                htmlBuilder += "<td align=left ><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].SERIAL_ID + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].MFG_ITEM_ID + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].STORAGE_LOCATION + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].ITEM_PRICE + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].LATEST_SYSQTY + " " + this.eventDetails[dgItem].UNIT_OF_MEASURE + "</span></td>";
                                for (intuser in this.usersList) {
                                    StrCountQty = '';
                                    if (this.eventDetails[dgItem].rowUpdated == 'Y') {
                                        if (this.eventDetails[dgItem]["activeFlag_" + intuser]) {
                                            StrCountQty = this.eventDetails[dgItem].activeCount;
                                        }
                                    }
                                    else {
                                        if (this.eventDetails[dgItem]["COUNT_" + intuser] != undefined && this.eventDetails[dgItem]["COUNT_" + intuser] != "N") {
                                            StrCountQty = this.eventDetails[dgItem]["COUNT_" + intuser];
                                        }
                                    }
                                    htmlBuilder += "<td align=right nowrap><span class=c3 style=color:" + strFontColor + ">" + StrCountQty + "</span></td>";
                                }
                                if (this.eventDetails[dgItem].showSelectedCount) {
                                    htmlBuilder += "<td align=right nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].activeCount + "</span></td>";
                                }
                                else {
                                    htmlBuilder += "<td align=right nowrap><span class=c3 style=color:" + strFontColor + ">" + "&nbsp;" + "</span></td>";
                                }
                                htmlBuilder += "<td align=right nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].COUNT_DIFF + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].COUNT_DIFF_PER + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].VALUE_DIFF + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].EXT_VALUE + "</span></td>";
                                htmlBuilder += "</tr>";
                            }
                        }
                        htmlBuilder += "</table></td></tr>";
                        htmlBuilder += "</Table>";
                        return [4 /*yield*/, htmlBuilder];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        ex_18 = _a.sent();
                        this.clientErrorMsg(ex_18, 'exportReportDetails');
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 6:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.customSort = function (event, elementname) {
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
            var emptyValues = this.eventDetails.filter(function (a) { return a[elementname] === '' || a[elementname] === null; });
            if (emptyValues.length == this.eventDetails.length) {
                return;
            }
            this.eventDetails = this.eventDetails.sort(function (a, b) {
                if (a[elementname] != '' && b[elementname] != '' && a[elementname] != undefined && b[elementname] != undefined) {
                    if (parseFloat(a[elementname]) < parseFloat(b[elementname]))
                        return -1;
                    if (parseFloat(a[elementname]) > parseFloat(b[elementname]))
                        return 1;
                    return 0;
                }
                else {
                    if (a[elementname] < b[elementname])
                        return -1;
                    if (a[elementname] > b[elementname])
                        return 1;
                    return 0;
                }
                //if (parseFloat(a[elementname]) < parseFloat(b[elementname]))
                //        return -1;
                //    if (parseFloat(a[elementname]) > parseFloat(b[elementname]))
                //        return 1;
                //    return 0;
            });
            if (this.blnSortByColumn == false) {
                this.eventDetails = this.eventDetails.reverse();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    };
    ProcessCountsComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ProcessCountsComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    ProcessCountsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.usersList = [];
        this.lstOrgGroups = [];
        this.lstAuditData = [];
        this.lstBUnits = [];
        this.ddlOrgGroups = [];
        this.ddlBunit = [];
        this.ddlEvent = [];
        this.lstEventId = [];
        this.spinnerService.stop();
        this.lstEventDetails = [];
        this.eventDetails = [];
        this.lstColDetails = [];
        this.ddlStatus = [];
        this.lstUpdateReviewerData = [];
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], ProcessCountsComponent.prototype, "dataTableComponent", void 0);
    ProcessCountsComponent = __decorate([
        core_1.Component({
            templateUrl: 'cyct-process-counts.component.html',
            providers: [datatableservice_1.datatableservice, cyct_process_counts_service_1.ProcessCountsService, atpar_common_service_1.AtParCommonService, api_1.ConfirmationService]
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            cyct_process_counts_service_1.ProcessCountsService,
            api_1.ConfirmationService])
    ], ProcessCountsComponent);
    return ProcessCountsComponent;
}());
exports.ProcessCountsComponent = ProcessCountsComponent;
//# sourceMappingURL=cyct-process-counts.component.js.map