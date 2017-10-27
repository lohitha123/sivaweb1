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
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var cyct_review_counts_service_1 = require("./cyct-review-counts.service");
var file_saver_1 = require("file-saver");
var ReviewCountsComponent = (function () {
    function ReviewCountsComponent(dataservice, atParCommonService, httpService, spinnerService, atParConstant, reviewCountsService) {
        this.dataservice = dataservice;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.reviewCountsService = reviewCountsService;
        this.blnSortByColumn = false;
        this.totalItems = "";
        this.lstEventId = [];
        this.loading = true;
        this.strUpdateCntDtWeb = "";
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.bunitsData = [];
        this.eventIdDataList = [];
        this.strEventAllocation = "";
        this.blnRecntUsers = true;
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupID = false;
        this.orgGrpID = "";
        this.orgGrpIDData = "";
        this.selectedOrgGroupId = "";
        this.selectedBunit = "";
        this.selectedUser = "";
        this.selectedEvent = "";
        this.selectedRecntUser = "";
        this.performManualCounts = "";
        this.reviewManualCounts = "";
        this.reviewCounts = "";
        this.flgBtnEnable = "";
        this.Users = [];
        this.lstEventDetails = [];
        this.recCount = "";
        this.ErrMsg = "";
        this.flgParentEvent = "";
        this.strMenuCode = "";
        this.blnsortbycolumn = true;
        this.custom = "custom";
        this.showgrid = false;
        this._strUserId = "";
        this._strDateTime = "";
        this._intRecCnt = "";
        this.isSend = false;
        this.lblEventAllocUsers = "";
        this.lblEventAllocUsersToolTip = "";
        this.rctFlag = false;
        this.showDropDowns = false;
        this.changedTextBoxVal = '';
        this.isMailDialog = false;
        this.preField = '';
    }
    ReviewCountsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blnresult, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        this.spinnerService.start();
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.strMenuCode = localStorage.getItem("menuCode");
                        this.pazeSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        return [4 /*yield*/, this.orgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.UPDATE_COUNTDATE_WEB].toString())];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getProfileParamValue()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.orgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.REVIEW_COUNTS].toString())];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.orgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.PERFORM_MANUAL_COUNTS].toString())];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.orgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.REVIEW_MANUAL_COUNTS].toString())];
                    case 5:
                        _a.sent();
                        this.spinnerService.stop();
                        if (!((this.reviewCounts == "N") &&
                            ((this.performManualCounts == "Y" && this.reviewManualCounts == "N") ||
                                (this.performManualCounts == "N")))) return [3 /*break*/, 6];
                        this.spinnerService.stop();
                        this.showDropDowns = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Review counts Parameter is Unchecked. Please check to review." });
                        return [2 /*return*/];
                    case 6:
                        this.showDropDowns = true;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.ChkEventIds()];
                    case 7:
                        blnresult = _a.sent();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.bindUserOrgGroups(blnresult)];
                    case 8:
                        _a.sent();
                        this.spinnerService.stop();
                        return [4 /*yield*/, this.orgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.EVENT_ALLOCATION].toString())];
                    case 9:
                        _a.sent();
                        this.selectedRecntUser = "Select User";
                        if (this.strEventAllocation == "N") {
                            this.lstRecntUsers = [];
                            this.blnRecntUsers = false;
                            this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                        }
                        else if (this.blnShowOrgGroupLabel) {
                            this.lstRecntUsers = [];
                            //this.blnRecntUsers = true;
                            this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                            //await this.populateReCntUsers();
                        }
                        _a.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.ChkEventIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var blnisExists, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        blnisExists = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParCommonService.getEventIds("", this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.trVisibleTrue();
                                        blnisExists = true;
                                        return blnisExists;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                            _this.trVisibleFalse();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No events available to review the counts" });
                                        }
                                        else {
                                            _this.showgrid = false;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No events available to review the counts" });
                                        }
                                        _this.spinnerService.stop();
                                        blnisExists = false;
                                        return blnisExists;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.showgrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        blnisExists = false;
                                        return blnisExists;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.showgrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        blnisExists = false;
                                        return blnisExists;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, blnisExists];
                    case 3:
                        ex_2 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_2, "ChkEventIds");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.trVisibleFalse = function () {
        this.showgrid = false;
        this.selectedEvent = "Select EventId";
        this.selectedBunit = "Select BUnit";
        this.selectedUser = "Select User";
        this.selectedRecntUser = "Select User";
        if (this.blnShowOrgGroupID) {
            this.selectedOrgGroupId = "Select One";
        }
        this.isSend = false;
    };
    ReviewCountsComponent.prototype.trVisibleTrue = function () {
    };
    ReviewCountsComponent.prototype.getProfileParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], AtParEnums_1.EnumApps.CycleCount, 'EDIT_COUNTS')
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                switch (res.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.hdnProfEditTxt = res.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "getProfileParamValue");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.orgGroupParamValue = function (orgGrpParamName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var cycleCntAppId, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        cycleCntAppId = AtParEnums_1.EnumApps.CycleCount;
                        return [4 /*yield*/, this.atParCommonService.getOrgGroupParamValue(orgGrpParamName, cycleCntAppId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var response;
                                return __generator(this, function (_a) {
                                    response = res.json();
                                    response.DataVariable = (response.DataVariable != null) ? response.DataVariable : "";
                                    if (orgGrpParamName == AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.REVIEW_COUNTS].toString()) {
                                        this.reviewCounts = response.DataVariable.toString();
                                    }
                                    else if (orgGrpParamName == AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.PERFORM_MANUAL_COUNTS].toString()) {
                                        this.performManualCounts = response.DataVariable.toString();
                                    }
                                    else if (orgGrpParamName == AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.REVIEW_MANUAL_COUNTS].toString()) {
                                        this.reviewManualCounts = response.DataVariable.toString();
                                    }
                                    else if (orgGrpParamName.toString() == "UPDATE_COUNTDATE_WEB") {
                                        this.strUpdateCntDtWeb = response.DataVariable.toString();
                                    }
                                    else if (orgGrpParamName.toString() == AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.EVENT_ALLOCATION].toString()) {
                                        this.strEventAllocation = response.DataVariable.toString();
                                    }
                                    else {
                                        return [2 /*return*/];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "orgGroupParamValue");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.bindUserOrgGroups = function (blnresult) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpIDData = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGrpID = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.lstUsers = [];
                                            _this.lstEvents = [];
                                            _this.lstRecntUsers = [];
                                            _this.lstUsers.push({ label: "Select User", value: "Select User" });
                                            _this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
                                            _this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                                            _this.populateData(blnresult);
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupID = true;
                                            _this.lstBunit = [];
                                            _this.lstUsers = [];
                                            _this.lstEvents = [];
                                            _this.lstRecntUsers = [];
                                            _this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                                            _this.lstUsers.push({ label: "Select User", value: "Select User" });
                                            _this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
                                            _this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                                            _this.lstOrgGroups = [];
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + "-" + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        if (blnresult) {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        if (blnresult) {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        if (blnresult) {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "bindUserOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.populateData = function (blnresult) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.populateBusinessUnits(blnresult)];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "populateData");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.populateBusinessUnits = function (blnresult) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (blnresult != false) {
                            this.growlMessage = [];
                        }
                        this.spinnerService.start();
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One" || this.orgGroupIDForDBUpdate == undefined) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        this.lstBunit = [];
                        this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParCommonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                if (blnresult != false) {
                                    _this.growlMessage = [];
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.bunitsData = data.DataList;
                                        for (var i = 0; i < _this.bunitsData.length; i++) {
                                            _this.lstBunit.push({
                                                label: _this.bunitsData[i],
                                                value: _this.bunitsData[i]
                                            });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
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
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "populateBusinessUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.bindUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstUsers = [];
                        this.lstUsers.push({ label: "Select User", value: "Select User" });
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getUsersList(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], 3, this.orgGroupIDForDBUpdate)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.userDataList = data.DataList;
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstUsers.push({
                                                label: data.DataList[i].FULLNAME,
                                                value: data.DataList[i].USER_ID
                                            });
                                        }
                                        _this.spinnerService.stop();
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
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "bindUsersList");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.growlMessage = [];
                        this.showgrid = false;
                        this.lstBunit = [];
                        this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                        if (!(this.selectedOrgGroupId == "Select One")) return [3 /*break*/, 1];
                        this.lstUsers = [];
                        this.lstUsers.push({ label: "Select User", value: "Select User" });
                        this.lstEvents = [];
                        this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
                        this.lstRecntUsers = [];
                        this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                        return [2 /*return*/];
                    case 1:
                        this.spinnerService.start();
                        this.selectedBunit = "Select BUnit";
                        this.selectedUser = "Select User";
                        this.selectedEvent = "Select EventId";
                        return [4 /*yield*/, this.populateBusinessUnits(true)];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "ddlOrgGrpIdChanged");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.ddlBUnitChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.growlMessage = [];
                        this.lstEvents = [];
                        this.showgrid = false;
                        this.selectedUser = "Select User";
                        this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
                        if (!((this.selectedBunit != "Select BUnit") && (this.selectedBunit != undefined) && (this.selectedBunit != ''))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.populateUsersList()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, "ddlBUnitChanged");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.ddlUsersChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.lstEvents = [];
                    this.showgrid = false;
                    this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
                    if ((this.selectedUser != "Select User") && (this.selectedUser != undefined) && (this.selectedUser != '')) {
                        this.populateEventIds();
                        this.populateReCntUsers();
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "ddlUsersChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    ReviewCountsComponent.prototype.ddlEventIDChanged = function () {
        this.showgrid = false;
    };
    ReviewCountsComponent.prototype.populateUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.blnShowOrgGroupLabel) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else if (this.blnShowOrgGroupID) {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getUsersList(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_1.EnumApps.CycleCount, this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstUsers = [];
                                        _this.lstUsers.push({ label: "Select User", value: "Select User" });
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstUsers.push({ label: data.DataList[i].FULLNAME, value: data.DataList[i].USER_ID });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "populateUsersList");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.populateReCntUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstRecntUsers = [];
                        this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                        return [4 /*yield*/, this.reviewCountsService.getReCountUsersList(AtParEnums_1.EnumApps.CycleCount, this.orgGroupIDForDBUpdate)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.recntUserDataList = data.DataList;
                                        if (_this.recntUserDataList.length > 0) {
                                            for (var i = 0; i < data.DataList.length; i++) {
                                                _this.lstRecntUsers.push({
                                                    label: data.DataList[i].FULLNAME,
                                                    value: data.DataList[i].USER_ID
                                                });
                                            }
                                            _this.lstRecntUsers = _this.lstRecntUsers.filter(function (a) { return a.value != _this.selectedUser; });
                                            _this.selectedRecntUser = _this.lstRecntUsers[0].value;
                                        }
                                        _this.spinnerService.stop();
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
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12, "populateReCntUsers");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.populateEventIds = function () {
        var _this = this;
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpID;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            this.lstEvents = [];
            this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
            this.spinnerService.start();
            this.reviewCountsService.getReviewCountsEventIds(this.selectedBunit, this.selectedUser)
                .subscribe(function (res) {
                var data = res.json();
                _this.growlMessage = [];
                switch (data.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        _this.lstEventId = data.DataList;
                        if (_this.lstEventId.length > 0) {
                            if (_this.performManualCounts != "" && _this.performManualCounts != undefined) {
                                if (_this.reviewCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y] && _this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y] && _this.reviewManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y]) {
                                    for (var item in _this.lstEventId) {
                                        _this.lstEvents.push({ label: _this.lstEventId[item].EVENT_ID, value: _this.lstEventId[item].EVENT_ID });
                                    }
                                }
                                else {
                                    var drEvents = new Array();
                                    if (_this.reviewCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() &&
                                        (_this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && _this.reviewManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString())
                                        || (_this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString())) {
                                        drEvents = _this.lstEventId.filter(function (a) { return a.EVENT_TYPE == AtParEnums_1.EventType.Regular; });
                                    }
                                    else if (_this.reviewCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString() &&
                                        (_this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && _this.reviewManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString())) {
                                        drEvents = _this.lstEventId.filter(function (a) { return a.EVENT_TYPE == AtParEnums_1.EventType.Manual; });
                                    }
                                    if (drEvents.length > 0) {
                                        for (var item in drEvents) {
                                            _this.lstEvents.push({ label: drEvents[item].EVENT_ID, value: drEvents[item].EVENT_ID });
                                        }
                                    }
                                    else {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No events available to review the counts" });
                                    }
                                }
                            }
                            else {
                                for (var item in _this.lstEventId) {
                                    _this.lstEvents.push({ label: _this.lstEventId[item].EVENT_ID, value: _this.lstEventId[item].EVENT_ID });
                                }
                            }
                        }
                        _this.spinnerService.stop();
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
            });
            this.selectedEvent = "Select EventId";
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateEventIds");
        }
    };
    ReviewCountsComponent.prototype.btnSend_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var statusCode, i, ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        statusCode = -1;
                        this.isSend = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        for (i = 0; i < this.lstEventDetails.length; i++) {
                            if (this.lstEventDetails[i].COUNT_QTY == undefined || this.lstEventDetails[i].COUNT_QTY == null) {
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Few of the items are not counted, please count them to send to ERP "
                                });
                                this.isSend = false;
                                return [2 /*return*/];
                            }
                            if (this.lstEventDetails[i].COUNT_QTY.toString() == '') {
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Few of the items are not counted, please count them to send to ERP "
                                });
                                this.isSend = false;
                                return [2 /*return*/];
                            }
                        }
                        if (!((this.blnRecntUsers) && (this.selectedRecntUser != '' && this.selectedRecntUser != "Select User"))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.UpdateReviewCountEvent(this.selectedRecntUser)];
                    case 2:
                        statusCode = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.UpdateReviewCountEvent("")];
                    case 4:
                        statusCode = _a.sent();
                        _a.label = 5;
                    case 5:
                        if (statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.isSend = false;
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        this.reviewCountsService.SendRevCntEvntsToERP(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedUser, this.selectedBunit, this.selectedEvent, this.lstEventDetails, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                            .catch(this.httpService.handleError).then(function (res) {
                            var data = res.json();
                            _this.growlMessage = [];
                            switch (data.StatType) {
                                case AtParEnums_1.StatusType.Success: {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({
                                        severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Review Counts Sent Successfully "
                                    });
                                    _this.showgrid = false;
                                    _this.lstEvents = [];
                                    _this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
                                    _this.selectedEvent = "Select EventId";
                                    _this.selectedBunit = "Select BUnit";
                                    _this.selectedUser = "Select User";
                                    _this.selectedRecntUser = "Select User";
                                    if (_this.blnShowOrgGroupID) {
                                        _this.selectedOrgGroupId = "Select One";
                                    }
                                    _this.isSend = false;
                                    _this.spinnerService.stop();
                                    break;
                                }
                                case AtParEnums_1.StatusType.Warn: {
                                    _this.isSend = false;
                                    if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.S_EVENT_PROCESSED_INERP) {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Event already processed in the ERP and cannot upload the counts " });
                                    }
                                    else if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_NO_ERP_USER_ID) {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP User Id required to upload to server " });
                                    }
                                    else if (data.StatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                        if (data.DataVariable.toString() != '' && data.DataVariable.toString() != null) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.DataVariable.toString() });
                                        }
                                    }
                                    _this.spinnerService.stop();
                                    break;
                                }
                                case AtParEnums_1.StatusType.Error: {
                                    _this.isSend = false;
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
                        });
                        this.isSend = false;
                        return [3 /*break*/, 7];
                    case 6:
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13, "btnSend_Click");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.btnSubmit_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var statusCode, blnIsParentEvent, index, _dblConvertRate, dateStr, ex_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        statusCode = -1;
                        blnIsParentEvent = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        this.spinnerService.start();
                        if (!((this.blnRecntUsers) && (this.selectedRecntUser != '' && this.selectedRecntUser != "Select User"))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.CheckIfSplitEvntIsPartEvnt()];
                    case 2:
                        blnIsParentEvent = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (blnIsParentEvent) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select the split event to assign/unassign recount to another user." });
                            return [2 /*return*/];
                        }
                        for (index in this.lstEventDetails) {
                            if (this.hdnProfEditTxt == 'Y') {
                                if (this.lstEventDetails[index].ACTUAL_COUNT_QTY != this.lstEventDetails[index].COUNT_QTY) {
                                    _dblConvertRate = void 0;
                                    this.lstEventDetails[index].COUNT_USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                                    if (this.strUpdateCntDtWeb == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()]) {
                                        dateStr = new Date().toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                        this.lstEventDetails[index].UPDATE_DATE = dateStr.replace(',', '').toString();
                                    }
                                    if (this.lstEventDetails[index].COUNT_QTY1 == 0 && this.lstEventDetails[index].COUNT_QTY2 == 0) {
                                        this.lstEventDetails[index].COUNT_QTY1 = this.lstEventDetails[index].COUNT_QTY;
                                        this.lstEventDetails[index].COUNT_QTY2 = 0;
                                    }
                                    else if (this.lstEventDetails[index].COUNT_QTY1 == 0) {
                                        _dblConvertRate = (this.lstEventDetails[index].COUNT_QTY - this.lstEventDetails[index].COUNT_QTY1) / this.lstEventDetails[index].COUNT_QTY2;
                                        this.lstEventDetails[index].COUNT_QTY1 = (this.lstEventDetails[index].COUNT_QTY % _dblConvertRate);
                                        this.lstEventDetails[index].COUNT_QTY2 = (this.lstEventDetails[index].COUNT_QTY / _dblConvertRate);
                                    }
                                    else if (this.lstEventDetails[index].COUNT_QTY2 == 0) {
                                        this.lstEventDetails[index].COUNT_QTY1 = this.lstEventDetails[index].COUNT_QTY;
                                        this.lstEventDetails[index].COUNT_QTY2 = 0;
                                    }
                                    else {
                                        _dblConvertRate = (this.lstEventDetails[index].COUNT_QTY - this.lstEventDetails[index].COUNT_QTY1) / this.lstEventDetails[index].COUNT_QTY2;
                                        this.lstEventDetails[index].COUNT_QTY1 = (this.lstEventDetails[index].COUNT_QTY % _dblConvertRate);
                                        this.lstEventDetails[index].COUNT_QTY2 = (this.lstEventDetails[index].COUNT_QTY / _dblConvertRate);
                                    }
                                }
                            }
                            if (this.lstEventDetails[index].checkEnable) {
                                if (this.lstEventDetails[index].RECOUNTCHECK_FLAG == true) {
                                    if ((this.blnRecntUsers) && (this.selectedRecntUser != '' && this.selectedRecntUser != "Select User" && this.selectedRecntUser != null)) {
                                        this.lstEventDetails[index].RECOUNT_FLAG = 'Y';
                                        this.lstEventDetails[index].RECOUNT_USER_ID = this.selectedRecntUser;
                                    }
                                    else {
                                        if (this.lstEventDetails[index].RECOUNT_USER_ID == '' || this.lstEventDetails[index].RECOUNT_USER_ID == null) {
                                            this.lstEventDetails[index].RECOUNT_FLAG = 'Y';
                                            this.lstEventDetails[index].RECOUNT_USER_ID = this.selectedUser;
                                        }
                                    }
                                }
                                else if (this.lstEventDetails[index].RECOUNTCHECK_FLAG == false) {
                                    this.lstEventDetails[index].RECOUNT_FLAG = 'N';
                                    this.lstEventDetails[index].RECOUNT_USER_ID = '';
                                }
                                if (this.lstEventDetails[index].ACTUAL_RECOUNT_FLAG != this.lstEventDetails[index].RECOUNT_FLAG) {
                                    this.lstEventDetails[index].COUNT_USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                                }
                            }
                            if (this.lstEventDetails[index].COUNT_QTY != null && this.lstEventDetails[index].COUNT_QTY != undefined) {
                                this.lstEventDetails[index].REALVALUEDIFF = (this.lstEventDetails[index].COUNT_QTY.toString() != '') ? Math.abs(Math.round(this.lstEventDetails[index].COUNT_QTY - this.lstEventDetails[index].LATEST_SYSQTY) * this.lstEventDetails[index].ITEM_PRICE) : -1;
                            }
                            else {
                                this.lstEventDetails[index].REALVALUEDIFF = -1;
                            }
                        }
                        if (!((this.blnRecntUsers) && (this.selectedRecntUser != '' && this.selectedRecntUser != "Select User"))) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.UpdateReviewCountEvent(this.selectedRecntUser)];
                    case 4:
                        statusCode = _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.UpdateReviewCountEvent("")];
                    case 6:
                        statusCode = _a.sent();
                        _a.label = 7;
                    case 7:
                        this.spinnerService.stop();
                        return [3 /*break*/, 9];
                    case 8:
                        ex_14 = _a.sent();
                        this.clientErrorMsg(ex_14, "btnSubmit_Click");
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.UpdateReviewCountEvent = function (selectedRecntUser) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var StatusCode, ex_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        StatusCode = -1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.reviewCountsService.UpdateReviewCountEvent(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedBunit, this.selectedEvent, this.lstEventDetails, this.selectedUser, selectedRecntUser)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        StatusCode = AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK;
                                        _this.ErrMsg = data.DataDictionary["pErrorMsg"];
                                        if (_this.ErrMsg != "" && _this.ErrMsg != null) {
                                            _this.growlMessage.push({
                                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: _this.ErrMsg
                                            });
                                            _this.showgrid = false;
                                            _this.selectedEvent = "Select EventId";
                                            _this.selectedBunit = "Select BUnit";
                                            _this.selectedUser = "Select User";
                                            _this.selectedRecntUser = "Select User";
                                            if (_this.blnShowOrgGroupID) {
                                                _this.selectedOrgGroupId = "Select One";
                                            }
                                            return;
                                        }
                                        else {
                                            if (!_this.isSend) {
                                                _this.lstEventDetails = data.DataDictionary["pDsReviewCountDtls"]["Table1"];
                                                _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Review Counts Updated Successfully " });
                                                _this.showgrid = false;
                                                _this.selectedEvent = "Select EventId";
                                                _this.selectedBunit = "Select BUnit";
                                                _this.selectedUser = "Select User";
                                                _this.selectedRecntUser = "Select User";
                                                if (_this.blnShowOrgGroupID) {
                                                    _this.selectedOrgGroupId = "Select One";
                                                }
                                            }
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        StatusCode = data.StatusCode;
                                        if (StatusCode == AtParStatusCodes_1.AtparStatusCodes.S_CYCT_RECOUNT_USER) {
                                            _this.growlMessage.push({
                                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Highlighted records are already assigned for recount to user:" + _this.selectedRecntUser + " Please uncheck and submit."
                                            });
                                            return;
                                        }
                                        else {
                                            _this.growlMessage.push({
                                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage
                                            });
                                        }
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        StatusCode = data.StatusCode;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        StatusCode = data.StatusCode;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, StatusCode];
                    case 3:
                        ex_15 = _a.sent();
                        this.clientErrorMsg(ex_15, "UpdateReviewCountEvent");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.CheckIfSplitEvntIsPartEvnt = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var blnIsParentEvent, ex_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blnIsParentEvent = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.reviewCountsService.CheckIfSplitEvntIsPartEvnt(this.selectedBunit, this.selectedEvent)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        blnIsParentEvent = data.DataVariable;
                                        _this.spinnerService.stop();
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
                    case 2:
                        _a.sent();
                        return [2 /*return*/, blnIsParentEvent];
                    case 3:
                        ex_16 = _a.sent();
                        this.clientErrorMsg(ex_16, "CheckIfSplitEvntIsPartEvnt");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.showgrid = false;
                        this.rctFlag = false;
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One" || this.orgGroupIDForDBUpdate == undefined) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        /////Bunit 
                        if (this.selectedBunit == null || this.selectedBunit == "" || this.selectedBunit == "Select BUnit" || this.selectedBunit == undefined) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        ///UserID
                        if (this.selectedUser == null || this.selectedUser == "" || this.selectedUser == "Select User" || this.selectedUser == undefined) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select User ID" });
                            return [2 /*return*/];
                        }
                        /// event id 
                        if (this.selectedEvent == null || this.selectedEvent == "" || this.selectedEvent == "Select EventId" || this.selectedEvent == undefined) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.BindEventDetails()];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_17 = _a.sent();
                        this.clientErrorMsg(ex_17, "btnGo_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.BindEventDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var statusCode, ex_18, ex_19, ex_20, ex_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        statusCode = -1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.reviewCountsService.CheckIfEventHasMultipleTransactions(this.selectedEvent, this.selectedBunit, this.selectedUser)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        statusCode = AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK;
                                        _this.flgBtnEnable = data.DataVariable.toString();
                                        _this.spinnerService.stop();
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
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_18 = _a.sent();
                        this.clientErrorMsg(ex_18, "BindEventDetails");
                        return [3 /*break*/, 4];
                    case 4:
                        if (!(this.selectedRecntUser != null && this.selectedRecntUser != "" && this.selectedRecntUser != "Select User" && this.selectedRecntUser != undefined)) return [3 /*break*/, 9];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.reviewCountsService.getReviewCountEventDetails(this.selectedBunit, this.selectedEvent, this.selectedUser, this.selectedRecntUser)
                                .catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            data = res.json();
                                            this.growlMessage = [];
                                            _a = data.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 5];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 6];
                                                case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 7];
                                            }
                                            return [3 /*break*/, 8];
                                        case 1:
                                            statusCode = AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK;
                                            this.flgParentEvent = data.DataDictionary["pflgParentEvent"].toString();
                                            this.recCount = data.DataDictionary["precCount"].toString();
                                            this.lstEventDetails = data.DataDictionary["pDsDetails"]["DETAILS"];
                                            this.Users = data.DataDictionary["pDsDetails"]["Table2"];
                                            if (!(this.lstEventDetails.length > 0)) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.gridBound()];
                                        case 2:
                                            _b.sent();
                                            return [3 /*break*/, 4];
                                        case 3:
                                            this.selectedBunit = "Select BUnit";
                                            this.lstUsers = [];
                                            this.lstEvents = [];
                                            this.lstRecntUsers = [];
                                            this.lstUsers.push({ label: "Select User", value: "Select User" });
                                            this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
                                            this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                                            this.selectedEvent = "Select EventId";
                                            this.selectedUser = "Select User";
                                            this.selectedRecntUser = "Select User";
                                            statusCode = AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND;
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                            this.showgrid = false;
                                            return [2 /*return*/];
                                        case 4:
                                            this.spinnerService.stop();
                                            return [3 /*break*/, 8];
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
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        ex_19 = _a.sent();
                        this.clientErrorMsg(ex_19, "BindEventDetails");
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 12];
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.reviewCountsService.getReviewCountEventDetails(this.selectedBunit, this.selectedEvent, this.selectedUser, "0")
                                .catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            data = res.json();
                                            this.growlMessage = [];
                                            _a = data.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 5];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 6];
                                                case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 7];
                                            }
                                            return [3 /*break*/, 8];
                                        case 1:
                                            statusCode = AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK;
                                            this.lstEventDetails = data.DataDictionary["pDsDetails"]["DETAILS"];
                                            this.Users = data.DataDictionary["pDsDetails"]["Table2"];
                                            this.flgParentEvent = data.DataDictionary["pflgParentEvent"].toString();
                                            this.recCount = data.DataDictionary["precCount"].toString();
                                            if (!(this.lstEventDetails.length > 0)) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.gridBound()];
                                        case 2:
                                            _b.sent();
                                            return [3 /*break*/, 4];
                                        case 3:
                                            statusCode = AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND;
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                            this.showgrid = false;
                                            this.spinnerService.stop();
                                            return [2 /*return*/];
                                        case 4:
                                            this.spinnerService.stop();
                                            return [3 /*break*/, 8];
                                        case 5:
                                            {
                                                statusCode = data.StatusCode;
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 6;
                                        case 6:
                                            {
                                                statusCode = data.StatusCode;
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 7;
                                        case 7:
                                            {
                                                statusCode = data.StatusCode;
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 8;
                                        case 8: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        ex_20 = _a.sent();
                        this.clientErrorMsg(ex_20, "BindEventDetails");
                        return [3 /*break*/, 12];
                    case 12:
                        if (!(statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK)) return [3 /*break*/, 16];
                        _a.label = 13;
                    case 13:
                        _a.trys.push([13, 15, , 16]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.reviewCountsService.getUser_Date(this.selectedBunit, this.selectedEvent, this.selectedUser)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this._strUserId = data.DataDictionary["updateUserId"].toString();
                                        _this._strDateTime = data.DataDictionary["updateDtTime"].toString();
                                        if (_this._strDateTime == null || _this._strDateTime == '') {
                                            _this._strDateTime = new Date().toDateString();
                                        }
                                        if (_this.Users.length > 0) {
                                            if (_this.Users[0].Users != null) {
                                                var _strArray = _this.Users[0].Users.toString().split(",");
                                                if (_strArray.length > 2) {
                                                    _this.lblEventAllocUsers = _strArray[0] + "," + _strArray[1] + "....";
                                                    _this.lblEventAllocUsersToolTip = _this.Users[0].Users;
                                                }
                                                else {
                                                    _this.lblEventAllocUsers = _this.Users[0].Users;
                                                    _this.lblEventAllocUsersToolTip = _this.Users[0].Users;
                                                }
                                            }
                                        }
                                        _this.showgrid = true;
                                        _this.spinnerService.stop();
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
                    case 14:
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        ex_21 = _a.sent();
                        this.clientErrorMsg(ex_21, "BindEventDetails");
                        return [3 /*break*/, 16];
                    case 16:
                        if (statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            if (this.flgParentEvent == "visible") {
                                if (this.flgBtnEnable == "enable") {
                                    this.flgParentEvent = "visible";
                                }
                                else if (this.flgBtnEnable == "disable") {
                                    this.flgParentEvent = "hidden";
                                }
                            }
                            if (this.flgParentEvent == "hidden" || this.recCount == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()]) {
                                this.btnUpload = false;
                            }
                            else if (this.flgParentEvent == "visible" || this.recCount == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N.toString()]) {
                                this.btnUpload = true;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.switch_Click = function () {
        for (var index in this.lstEventDetails) {
            if (this.rctFlag) {
                if (this.lstEventDetails[index].checkEnable == false) {
                    //It doesn't check the checkbox because it's already in disable mode
                }
                else {
                    this.lstEventDetails[index].RECOUNTCHECK_FLAG = true;
                    //It Means we can change the checkbox value to true because not in disable mode
                }
            }
            else {
                if (this.lstEventDetails[index].checkEnable == false) {
                    //It doesn't uncheck the checkbox because already in disable mode
                }
                else {
                    this.lstEventDetails[index].RECOUNTCHECK_FLAG = false;
                    //It Means we can change the checkbox value to false because not in disable mode
                }
            }
        }
    };
    ReviewCountsComponent.prototype.switch_changed = function () {
        var gridLength = 0;
        var filterChecks = 0;
        gridLength = this.lstEventDetails.length;
        filterChecks = this.lstEventDetails.filter(function (a) { return a.RECOUNTCHECK_FLAG == true; }).length;
        if (gridLength == filterChecks) {
            this.rctFlag = true;
        }
        else {
            this.rctFlag = false;
        }
    };
    ReviewCountsComponent.prototype.focusEvent = function (event, ven) {
        if (event) {
            this.changedTextBoxVal = ven;
        }
        else {
            this.focusOutEvent(ven);
        }
    };
    ReviewCountsComponent.prototype.focusOutEvent = function (ven) {
        if (this.changedTextBoxVal != ven.COUNT_QTY) {
            var _dblConvertRate = void 0;
            ven.COUNT_USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
            if (ven.COUNT_QTY1 == 0 && ven.COUNT_QTY2 == 0) {
                ven.COUNT_QTY1 = ven.COUNT_QTY;
                ven.COUNT_QTY2 = 0;
            }
            else if (ven.COUNT_QTY1 == 0) {
                _dblConvertRate = (ven.COUNT_QTY - ven.COUNT_QTY1) / ven.COUNT_QTY2;
                ven.COUNT_QTY1 = (ven.COUNT_QTY % _dblConvertRate);
                ven.COUNT_QTY2 = (ven.COUNT_QTY / _dblConvertRate);
            }
            else if (ven.COUNT_QTY2 == 0) {
                ven.COUNT_QTY1 = ven.COUNT_QTY;
                ven.COUNT_QTY2 = 0;
            }
            else {
                _dblConvertRate = (ven.COUNT_QTY - ven.COUNT_QTY1) / ven.COUNT_QTY2;
                ven.COUNT_QTY1 = (ven.COUNT_QTY % _dblConvertRate);
                ven.COUNT_QTY2 = (ven.COUNT_QTY / _dblConvertRate);
            }
        }
    };
    //customSort(event) {
    //    try {
    //        this.blnSortByColumn = !this.blnSortByColumn;
    //        this.lstEventDetails = this.lstEventDetails.sort(function (a, b) {
    //            if (a["Valdiffs"] < b["Valdiffs"])
    //                return -1;
    //            if (a["Valdiffs"] > b["Valdiffs"])
    //                return 1;
    //            return 0;
    //        });
    //        if (this.blnSortByColumn == false) {
    //            this.lstEventDetails = this.lstEventDetails.reverse();
    //        }
    //    }
    //    catch (ex) {
    //        this.clientErrorMsg(ex, "customSort");
    //    }
    //}
    ReviewCountsComponent.prototype.customSort = function (event, elementname) {
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
            this.lstEventDetails = this.lstEventDetails.sort(function (a, b) {
                if (parseFloat(a[elementname]) < parseFloat(b[elementname]))
                    return -1;
                if (parseFloat(a[elementname]) > parseFloat(b[elementname]))
                    return 1;
                return 0;
            });
            if (this.blnSortByColumn == false) {
                this.lstEventDetails = this.lstEventDetails.reverse();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    };
    ReviewCountsComponent.prototype.gridBound = function () {
        var itemCount = 0;
        var intCntQty = 0;
        var ItmValueDiff = 0;
        var ItmCountDiffernce = 0;
        this.totalItems = "";
        try {
            for (var item in this.lstEventDetails) {
                itemCount++;
                if (this.lstEventDetails[item].RECOUNT_FLAG == 'Y') {
                    this.lstEventDetails[item].RECOUNTCHECK_FLAG = true;
                }
                else {
                    this.lstEventDetails[item].RECOUNTCHECK_FLAG = false;
                }
                var LblItemId_forecolor = this.lstEventDetails[item].INV_ITEM_ID;
                var LblItemNo_forecolor = this.lstEventDetails[item].CUST_ITEM_NO;
                var LblLot_forecolor = this.lstEventDetails[item].INV_LOT_ID;
                var LblSerial_forecolor = this.lstEventDetails[item].SERIAL_ID;
                var lblDiscription_forecolor = this.lstEventDetails[item].DESCRIPTION;
                var lblSTORLOC_forecolor = this.lstEventDetails[item].STORLOC;
                var lblUOM_forecolor = this.lstEventDetails[item].UNIT_OF_MEASURE;
                var lblSysQty_forecolor = this.lstEventDetails[item].LATEST_SYSQTY;
                var lblCntDiff_forecolor = this.lstEventDetails[item].COUNT_QTY - this.lstEventDetails[item].LATEST_SYSQTY;
                var lblDiffQty_forecolor = Math.round(parseFloat((((this.lstEventDetails[item].COUNT_QTY - this.lstEventDetails[item].LATEST_SYSQTY) * 100) / this.lstEventDetails[item].LATEST_SYSQTY).toFixed(2)));
                var lblItmPrice_forecolor = this.lstEventDetails[item].ITEM_PRICE;
                var lblValDifference_forecolor = this.lstEventDetails[item].VALUEDIFF;
                var lblUSERNAME_forecolor = this.lstEventDetails[item].USERNAME;
                var lblReCntUserName_forecolor = this.lstEventDetails[item].RECOUNT_USER_NAME;
                var txtCntQty_forecolor = this.lstEventDetails[item].COUNT_QTY;
                var lblmfgitmid_forecolor = this.lstEventDetails[item].MFG_ITEM_ID;
                var lblConsignedFlag = this.lstEventDetails[item].CONSIGNED_FLAG;
                var lblLotOrSerial = this.lstEventDetails[item].L_S_CONTROLLED;
                var lblEventType = this.lstEventDetails[item].EVENT_TYPE;
                var lblConvRate = this.lstEventDetails[item].CONVERSION_RATE;
                var lblUom = this.lstEventDetails[item].UNIT_OF_MEASURE;
                var lblSTDUOM = this.lstEventDetails[item].STD_PACK_UOM;
                if (this.lstEventDetails[item].CONSIGNED_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()]) {
                    this.lstEventDetails[item].rowClsStyle = 'ui-datatable-green';
                }
                else {
                    if (this.lstEventDetails[item].L_S_CONTROLLED == 'L' || this.lstEventDetails[item].L_S_CONTROLLED == 'S' ||
                        this.lstEventDetails[item].L_S_CONTROLLED == 'B') {
                        this.lstEventDetails[item].rowClsStyle = 'ui-datatable-brown';
                    }
                }
                if (lblEventType == AtParEnums_1.EventType.Manual) {
                    if (lblUom.toUpperCase() == lblSTDUOM.toUpperCase()) {
                        intCntQty = parseFloat(this.lstEventDetails[item].COUNT_QTY.toString());
                    }
                    else {
                        intCntQty = parseFloat(txtCntQty_forecolor.toString()) * parseFloat(lblConvRate.toString());
                    }
                }
                else {
                    if (this.lstEventDetails[item].COUNT_QTY != undefined) {
                        intCntQty = parseFloat(this.lstEventDetails[item].COUNT_QTY.toString());
                    }
                }
                var intSysQty = parseFloat(this.lstEventDetails[item].LATEST_SYSQTY.toString());
                var itemPrice = parseFloat(this.lstEventDetails[item].ITEM_PRICE.toString());
                var lblReCountUser = this.lstEventDetails[item].RECOUNT_USER_ID;
                if (lblReCountUser != '' && lblReCountUser != null) {
                    if (this.blnRecntUsers == true && (this.selectedRecntUser != "Select User" && this.selectedRecntUser != null && this.selectedRecntUser != '')) {
                        if (lblReCountUser == this.selectedRecntUser) {
                            this.lstEventDetails[item].checkEnable = true;
                            this.chkReCntFlag = true;
                        }
                        else {
                            this.lstEventDetails[item].checkEnable = false;
                            this.chkReCntFlag = false;
                        }
                    }
                    else if (lblReCountUser == this.selectedUser) {
                        this.lstEventDetails[item].checkEnable = true;
                        this.chkReCntFlag = true;
                    }
                    else if (lblReCountUser != this.selectedUser) {
                        this.lstEventDetails[item].checkEnable = false;
                        this.chkReCntFlag = false;
                    }
                    else {
                        this.lstEventDetails[item].checkEnable = true;
                        this.chkReCntFlag = true;
                    }
                }
                else {
                    this.lstEventDetails[item].checkEnable = true;
                    this.chkReCntFlag = true;
                }
                var ValDif = 0;
                if (intCntQty == -1) {
                    var lblValdiff = this.lstEventDetails[item].VALUEDIFF;
                    var lblValdiffp = lblDiffQty_forecolor;
                    var lblCntDiff1 = lblCntDiff_forecolor;
                }
                else if (intCntQty >= 0 && intCntQty != -1) {
                    ValDif = (intCntQty - intSysQty) * itemPrice;
                    var Valdiff = this.lstEventDetails[item].VALUEDIFF;
                    if (ValDif < 0) {
                        this.lstEventDetails[item].Valdiffd = "(" + Math.abs(ValDif).toFixed(2) + ")";
                        this.lstEventDetails[item].Valdiffs = parseFloat(Math.abs(ValDif).toFixed(2));
                    }
                    else {
                        this.lstEventDetails[item].Valdiffd = ValDif.toString();
                        this.lstEventDetails[item].Valdiffs = ValDif;
                    }
                    ItmValueDiff = ItmValueDiff + ValDif;
                    var DiffPerc = (intCntQty - intSysQty) * 100 / intSysQty;
                    if (DiffPerc == 0) {
                        this.lstEventDetails[item].Valdiffp = "0";
                        this.lstEventDetails[item].CntDiff1 = "0";
                    }
                    else if (DiffPerc < 0) {
                        ItmCountDiffernce = ItmCountDiffernce + 1;
                        this.lstEventDetails[item].Valdiffp = "(" + Math.abs(parseFloat(DiffPerc.toString())).toFixed(2) + ")";
                        if ((intCntQty - intSysQty) < 0) {
                            this.lstEventDetails[item].CntDiff1 = "(" + Math.abs(intCntQty - intSysQty) + ")";
                        }
                    }
                    else {
                        ItmCountDiffernce = ItmCountDiffernce + 1;
                        if (intSysQty == 0) {
                            this.lstEventDetails[item].Valdiffp = "0";
                        }
                        else {
                            this.lstEventDetails[item].Valdiffp = DiffPerc.toFixed(2);
                        }
                        this.lstEventDetails[item].CntDiff1 = (intCntQty - intSysQty).toFixed(2);
                    }
                }
                this.lstEventDetails[item].COUNT_QTY = this.lstEventDetails[item].COUNT_QTY == -1 ? undefined : this.lstEventDetails[item].COUNT_QTY;
            }
            this.totalItems = " <b>Total # Of Items  :</b> <span><font color='#6c276a'>" + itemCount.toString() +
                "</font></span><b> Sum Of Value Difference  :</b> &nbsp;<span><font color='#6c276a'>" + ItmValueDiff.toFixed(2)
                + "</font></span> <b># of items with difference</b>  <span><font color='#6c276a'>" + ItmCountDiffernce.toString() + "</font></span>";
            this.switch_changed();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "gridBound");
        }
    };
    ReviewCountsComponent.prototype.bindModelDataChange = function (ven) {
        this.growlMessage = [];
        try {
            if (ven.SERIAL_CONTROLLED == 'Y') {
                if (ven.COUNT_QTY > 1) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Qty cannot be greater than 1 for serial item" });
                    ven.COUNT_QTY = '';
                }
            }
            else {
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "bindModelDataChange");
        }
    };
    ReviewCountsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ReviewCountsComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var statusCode, html, blob, ex_22;
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
                        //        await this.atParCommonService.exportToExcel(html, "cyct-review-counts_", "cyct-review-counts_report")
                        //            .then((res: Response) => {
                        //                let data = res.json();
                        //                statusCode = data.StatusCode;
                        //                if (statusCode.toString() == AtparStatusCodes.ATPAR_OK.toString()) {
                        //                    folderName = data.DataVariable.toString();
                        //                    var filename = this.httpService.BaseUrl + '/Uploaded/' + folderName + '/cyct-review-counts_report.xls';
                        //                    var query = '?download';
                        //                    window.open(filename + query);
                        //                }
                        //                else {
                        //                    this.growlMessage = [];
                        //                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error.' });
                        //                }
                        //            });
                        //        await this.atParCommonService.deleteExcel(folderName, "cyct-review-counts_report")
                        //            .then((res: Response) => {
                        //            });
                        //    } else {
                        //        var a = document.createElement('a');
                        //        var data_type = 'data:application/vnd.ms-excel';
                        //        html = html.replace(/ /g, '%20');
                        //        a.href = data_type + ', ' + html;
                        //        a.download = 'cyct-review-counts_report.xls';
                        //        a.click();
                        //    }
                        //}
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "mt_cyct-review-counts_report.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_22 = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.growlMessage = [];
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Print')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'Cycle Count - Review Counts' + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                mywindow.document.close(); // necessary for IE >= 10
                                mywindow.focus(); // necessary for IE >= 10*/
                                // mywindow.print();
                                // mywindow.close();
                                return [2 /*return*/, true];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_23 = _a.sent();
                        this.clientErrorMsg(ex_23, 'onPrintClick');
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.onSendMailIconClick = function (event) {
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
    ReviewCountsComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, statusCode_1, ex_24;
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
                        return [4 /*yield*/, this.atParCommonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Review Counts', JSON.stringify(html), this.toMailAddr, AtParEnums_1.MailPriority.Normal.toString(), '')
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
                        ex_24 = _a.sent();
                        this.clientErrorMsg(ex_24, 'onSendMailClick');
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, ipAddress, gstrProtocal, gstrServerName, gstrPortNo, statusCode, sbMailText, _strFrmDt, _strToDt, imgserverPath, row, ItemId, lblSTORLOC, strfontcolor, ChkValue, TxtValue, LblSysQty, ItemNo, LotId, SerialId, TransId, ItemRecNum, lblMfgId, lblDiscription, lblUOM, lblCntDiff, lblDiffQty, lblItmPrice, lblValDifference, lblUSERNAME, lblReCntUser, lblConsignedFlag, lblLotOrSerial, ex_25;
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
                        _a.trys.push([1, 4, 5, 6]);
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
                                        case AtParEnums_1.StatusType.Success: {
                                            ipAddress = data.DataVariable.toString();
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error: {
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Warn: {
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Custom: {
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    if (data.StatType != AtParEnums_1.StatusType.Success) {
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
                                        case AtParEnums_1.StatusType.Success: {
                                            gstrProtocal = data.Data.PROTOCOL.toString();
                                            gstrServerName = data.Data.SERVER_NAME.toString();
                                            gstrPortNo = data.Data.PORT_NO.toString();
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error: {
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Warn: {
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Custom: {
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    if (data.StatType != AtParEnums_1.StatusType.Success) {
                                        htmlBuilder = '';
                                        return [2 /*return*/, htmlBuilder];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 3:
                        _a.sent();
                        imgserverPath = gstrProtocal + '://' + ipAddress + '/atpar/AtParWebApi/assets/images/';
                        htmlBuilder = "<Table id='table1' align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        htmlBuilder += "<tr><td>";
                        if (reqType == "Print") {
                            htmlBuilder += "<tr width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='63' nowrap><img height='63' src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            htmlBuilder += "<tr><td height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</tr><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>" +
                                "<tr><td colspan=5 align=left><span class=c2>Review Counts For Business Unit &nbsp;<b>" + this.selectedBunit + "</b> and EventID<b> " + this.selectedEvent + "</span></td></tr>";
                            htmlBuilder = htmlBuilder + "<tr><td colspan=5 align=left>";
                            if (this.lblEventAllocUsersToolTip != '') {
                                htmlBuilder += "<span class=c2>Users allocated to count / recount this event: " + this.lblEventAllocUsersToolTip + "</span>";
                            }
                            htmlBuilder += "</td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else if (reqType == "Excel") {
                            htmlBuilder += "<tr width='100%' ><td colspan=2  align=left  height=63 width='100%' nowrap><img height='63' src=" + imgserverPath + "logo.jpg nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</tr><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td colspan=6 ></td></tr>" +
                                "<tr><td colspan=6 align=left><span class=c2>Review Counts For Business Unit &nbsp;<b>" + this.selectedBunit + "</b> and EventID<b> " + this.selectedEvent + "</span></td></tr>";
                            htmlBuilder = htmlBuilder + "<tr><td colspan=5 align=left>";
                            if (this.lblEventAllocUsersToolTip != '') {
                                htmlBuilder += "<span class=c2>Users allocated to count / recount this event: " + this.lblEventAllocUsersToolTip + "</span>";
                            }
                            htmlBuilder += "</td><td align=right valign=top>&nbsp;";
                        }
                        else if (reqType == "Mail") {
                            htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='63' nowrap><img height='63' src=" + imgserverPath + "logo.jpg></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</tr><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td colspan=6 ></td></tr>" +
                                "<tr><td colspan=6 align=left><span class=c2>Review Counts For Business Unit &nbsp;<b>" + this.selectedBunit + "</b> and EventID<b> " + this.selectedEvent + "</span></td></tr>";
                            htmlBuilder = htmlBuilder + "<tr><td colspan=5 align=left>";
                            if (this.lblEventAllocUsersToolTip != '') {
                                htmlBuilder += "<span class=c2>Users allocated to count / recount this event: " + this.lblEventAllocUsersToolTip + "</span>";
                            }
                            htmlBuilder += "</td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr></td><td> " +
                            "<table align=center width=90% style=" + "BORDER-COLLAPSE:collapse" + " border=1>" +
                            "<tr bgcolor=white><td colspan=17 align=left><b>" + this.totalItems + " </b></td></tr>" +
                            "<tr bgcolor=#d3d3d3>" +
                            "<td align=center nowrap><span class=c3><b>Item ID</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Custom Item NO</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Lot</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Serial</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Mfg ID</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Description</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Storage Location</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>UOM</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Count Qty</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Sys Qty</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Diff Count Qty</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Diff Count Qty %</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Price/ Item</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Value Diff</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Re count</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Count User</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Recount User</b></span></td>" +
                            "</tr>";
                        for (row in this.lstEventDetails) {
                            ItemId = '';
                            lblSTORLOC = '';
                            strfontcolor = "None";
                            ChkValue = this.lstEventDetails[row].RECOUNTCHECK_FLAG;
                            TxtValue = this.lstEventDetails[row].COUNT_QTY;
                            LblSysQty = this.lstEventDetails[row].LATEST_SYSQTY;
                            if ((this.lstEventDetails[row].INV_ITEM_ID.trim() == '')) {
                                ItemId = this.lstEventDetails[row].INV_ITEM_ID;
                            }
                            else {
                                ItemId = "'" + this.lstEventDetails[row].INV_ITEM_ID;
                            }
                            ItemNo = this.lstEventDetails[row].CUST_ITEM_NO;
                            if (ItemNo == null) {
                                ItemNo = '';
                            }
                            LotId = this.lstEventDetails[row].INV_LOT_ID;
                            SerialId = this.lstEventDetails[row].SERIAL_ID;
                            TransId = this.lstEventDetails[row].TRANSACTION_ID;
                            ItemRecNum = this.lstEventDetails[row].ITEM_REC_NUM;
                            lblMfgId = this.lstEventDetails[row].MFG_ITEM_ID;
                            lblDiscription = this.lstEventDetails[row].DESCRIPTION;
                            lblUOM = this.lstEventDetails[row].UNIT_OF_MEASURE;
                            if (this.lstEventDetails[row].STORLOC == '') {
                                lblSTORLOC = this.lstEventDetails[row].STORLOC;
                            }
                            else {
                                lblSTORLOC = "'" + this.lstEventDetails[row].STORLOC;
                            }
                            lblCntDiff = this.lstEventDetails[row].CntDiff1;
                            lblDiffQty = this.lstEventDetails[row].Valdiffp;
                            lblItmPrice = this.lstEventDetails[row].ITEM_PRICE;
                            lblValDifference = this.lstEventDetails[row].Valdiffd;
                            lblUSERNAME = this.lstEventDetails[row].USERNAME;
                            lblReCntUser = this.lstEventDetails[row].RECOUNT_USER_NAME;
                            lblConsignedFlag = this.lstEventDetails[row].CONSIGNED_FLAG;
                            lblLotOrSerial = this.lstEventDetails[row].L_S_CONTROLLED;
                            ;
                            if (lblConsignedFlag == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()]) {
                                strfontcolor = "DarkGreen";
                            }
                            else {
                                if (lblLotOrSerial == "L" ||
                                    lblLotOrSerial == "S" ||
                                    lblLotOrSerial == "B") {
                                    strfontcolor = "Brown";
                                }
                            }
                            htmlBuilder += "<tr>" +
                                "<td align=left nowrap><span class=c3 style=color:" + strfontcolor + ">" + ItemId + "</span></td>" +
                                "<td align=left nowrap><span class=c3 style=color:" + strfontcolor + ">" + ItemNo + "</span></td>" +
                                "<td align=left nowrap><span class=c3 style=color:" + strfontcolor + ">" + LotId + "</span></td>" +
                                "<td align=left nowrap><span class=c3 style=color:" + strfontcolor + ">" + SerialId + "</span></td>" +
                                "<td align=left nowrap><span class=c3 style=color:" + strfontcolor + ">" + lblMfgId + "</span></td>" +
                                "<td align=left nowrap><span class=c3 style=color:" + strfontcolor + ">" + lblDiscription + "</span></td>" +
                                "<td align=left nowrap><span class=c3 style=color:" + strfontcolor + ">" + lblSTORLOC + "</span></td>" +
                                "<td align=left nowrap><span class=c3 style=color:" + strfontcolor + ">" + lblUOM + "</span></td>" +
                                "<td align=right nowrap><span class=c3 style=color:" + strfontcolor + ">" + TxtValue + "</span></td>" +
                                "<td align=right nowrap><span class=c3 style=color:" + strfontcolor + ">" + LblSysQty + "</span></td>" +
                                "<td align=right nowrap><span class=c3 style=color:" + strfontcolor + ">" + lblCntDiff + "</span></td>" +
                                "<td align=right nowrap><span class=c3 style=color:" + strfontcolor + ">" + lblDiffQty + "</span></td>" +
                                "<td align=right nowrap><span class=c3 style=color:" + strfontcolor + ">" + lblItmPrice + "</span></td>" +
                                "<td align=right nowrap><span class=c3 style=color:" + strfontcolor + ">" + lblValDifference + "</span></td>" +
                                "<td bgcolor=#ffffff align='center'><span class=c2><input type=checkbox name=CB value=on ";
                            if (ChkValue == true)
                                htmlBuilder += "checked";
                            htmlBuilder += "/></span></td><td align=left ><span class=c3 style=color:" + strfontcolor + ">" + lblUSERNAME + " </span></td>";
                            htmlBuilder += "<td align=left ><span class=c3 style=color:" + strfontcolor + ">" + lblReCntUser + " </span></td></tr>";
                        }
                        htmlBuilder += "<tr bgcolor=white><td colspan=17 align=left><b>" + this.totalItems + "</b></td></tr></table>";
                        htmlBuilder += "</td></tr></Table>";
                        return [2 /*return*/, htmlBuilder];
                    case 4:
                        ex_25 = _a.sent();
                        this.clientErrorMsg(ex_25, 'exportReportDetails');
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ReviewCountsComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    ReviewCountsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.userDataList = [];
        this.lstOrgGroups = [];
        this.eventIdDataList = [];
        this.lstBunit = [];
        this.lstEventDetails = [];
        this.lstEvents = [];
        this.lstOrgGroups = [];
        this.lstRecntUsers = [];
        this.lstUsers = [];
        this.lstEventId = [];
        this.spinnerService.stop();
        this.recntUserDataList = [];
        this.Users = [];
    };
    ReviewCountsComponent = __decorate([
        core_1.Component({
            templateUrl: 'cyct-review-counts.components.html',
            providers: [datatableservice_1.datatableservice, HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, cyct_review_counts_service_1.ReviewCountsService]
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            cyct_review_counts_service_1.ReviewCountsService])
    ], ReviewCountsComponent);
    return ReviewCountsComponent;
}());
exports.ReviewCountsComponent = ReviewCountsComponent;
//# sourceMappingURL=cyct-review-counts.components.js.map