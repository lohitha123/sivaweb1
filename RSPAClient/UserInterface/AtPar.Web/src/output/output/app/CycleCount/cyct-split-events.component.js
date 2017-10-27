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
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var cyct_split_events_service_1 = require("./cyct-split-events.service");
var MT_CYCT_EVENT_HDR_MASTER_1 = require("../Entities/MT_CYCT_EVENT_HDR_MASTER");
var SplitEventsComponent = (function () {
    function SplitEventsComponent(dataservice, commonService, spinnerService, httpService, splitEventsServiceObj, atParConstant) {
        this.dataservice = dataservice;
        this.commonService = commonService;
        this.spinnerService = spinnerService;
        this.httpService = httpService;
        this.splitEventsServiceObj = splitEventsServiceObj;
        this.atParConstant = atParConstant;
        this.pop = false;
        this.page = false;
        this.form = false;
        this.editform = false;
        this.ddlOrgGrpID = [];
        this.ddlEvent = [];
        this.ddlSort = [];
        this.ddlBunit = [];
        this.lstEvents = [];
        this.loading = true;
        this.growlMessage = [];
        this.deviceTokenEntry = [];
        this.orgGroupsInfo = [];
        this.blnSubEventsExists = false;
        this.doSplit = false;
    }
    SplitEventsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        return [4 /*yield*/, this.orgGroupParamValue()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SplitEventsComponent.prototype.orgGroupParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var paramReviewCounts, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        paramReviewCounts = "REVIEW_COUNTS";
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getOrgGroupParamValue(paramReviewCounts, AtParEnums_1.EnumApps.CycleCount, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                _this.strReviewCount = data.DataVariable.toString();
                                if (_this.strReviewCount == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N]) {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Check Review Counts Organization Parameter" });
                                    _this.page = false;
                                    return;
                                }
                                else {
                                    _this.page = true;
                                    _this.bindOrgGroups();
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.ddlSort.push({ label: "Item ID", value: "INV_ITEM_ID" });
                        this.ddlSort.push({ label: "Storage Location", value: "STORAGE_AREA" });
                        this.ddlSort.push({ label: "Description", value: "DESCRIPTION" });
                        this.selectedSortValue = this.ddlSort[0].value;
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "orgGroupParamValue");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SplitEventsComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.ddlOrgGrpID = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var orgGroups = res.json();
                                _this.spinnerService.stop();
                                switch (orgGroups.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ddlBunit.push({ label: "Select BUnit", value: "SelectBUnit" });
                                        _this.ddlEvent.push({ label: "Select Event", value: "Select Event" });
                                        _this.orgGroupsInfo = orgGroups.DataList;
                                        if (_this.orgGroupsInfo.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.blnShowOrgGroupID = false;
                                            _this.lblOrgGroupID = _this.orgGroupsInfo[0].ORG_GROUP_ID + " - " + _this.orgGroupsInfo[0].ORG_GROUP_NAME;
                                            _this.selOrgGrpId = _this.orgGroupsInfo[0].ORG_GROUP_ID;
                                        }
                                        else if (_this.orgGroupsInfo.length > 1) {
                                            _this.blnShowOrgGroupLabel = false;
                                            _this.blnShowOrgGroupID = true;
                                            _this.ddlOrgGrpID.push({ label: "Select One", value: "Select One" });
                                            for (var rowCnt = 0; rowCnt < _this.orgGroupsInfo.length; rowCnt++) {
                                                if (_this.orgGroupsInfo[rowCnt].ORG_GROUP_ID.toString() != "All") {
                                                    _this.ddlOrgGrpID.push({
                                                        label: _this.orgGroupsInfo[rowCnt].ORG_GROUP_ID + " - "
                                                            + _this.orgGroupsInfo[rowCnt].ORG_GROUP_NAME, value: _this.orgGroupsInfo[rowCnt].ORG_GROUP_ID
                                                    });
                                                }
                                            }
                                            _this.selOrgGrpId = _this.ddlOrgGrpID[0].value;
                                        }
                                        if (_this.blnShowOrgGroupLabel) {
                                            _this.populateBunitsDdlst();
                                        }
                                        _this.selectedBUnit = _this.ddlBunit[0].value;
                                        _this.selectedEvent = _this.ddlEvent[0].value;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: orgGroups.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: orgGroups.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: orgGroups.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SplitEventsComponent.prototype.populateBunitsDdlst = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.ddlBunit = [];
                        this.ddlEvent = [];
                        this.ddlBunit.push({ label: "Select BUnit", value: "SelectBUnit" });
                        this.ddlEvent.push({ label: "Select Event", value: "Select Event" });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.selOrgGrpId, AtParEnums_1.BusinessType.Inventory)
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var lstBUnits = response.DataList;
                                        if (lstBUnits.length > 0) {
                                            for (var rowCnt = 0; rowCnt < lstBUnits.length; rowCnt++) {
                                                _this.ddlBunit.push({
                                                    label: lstBUnits[rowCnt], value: lstBUnits[rowCnt]
                                                });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "populateBunitsDdlst");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SplitEventsComponent.prototype.ddlBUnitChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        this.ddlEvent = [];
                        this.pop = false;
                        this.ddlEvent.push({ label: "Select Event", value: "Select Event" });
                        if (!(this.selectedBUnit != "SelectBUnit")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getEventsList()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "ddlBUnitChanged");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SplitEventsComponent.prototype.ddlEventChanged = function () {
        this.pop = false;
    };
    SplitEventsComponent.prototype.getEventsList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.splitEventsServiceObj.GetEventsList(this.selectedBUnit)
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstEvents = response.DataList;
                                        if (_this.lstEvents.length > 0) {
                                            for (var rowCnt = 0; rowCnt < _this.lstEvents.length; rowCnt++) {
                                                _this.ddlEvent.push({
                                                    label: _this.lstEvents[rowCnt].EVENT_ID, value: _this.lstEvents[rowCnt].EVENT_ID
                                                });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                                _this.selectedEvent = "Select Event";
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "getEventsList");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SplitEventsComponent.prototype.go = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var eventsList, exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.pop = false;
                        if (this.selOrgGrpId == 'Select One') {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        else if (this.selectedBUnit == "SelectBUnit") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        else if (this.selectedEvent == "Select Event") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        eventsList = this.lstEvents.filter(function (a) { return a.BUSINESS_UNIT == _this.selectedBUnit && a.EVENT_ID == _this.selectedEvent; });
                        this.eventsSplit = new MT_CYCT_EVENT_HDR_MASTER_1.MT_CYCT_EVENT_HDR_MASTER();
                        if (eventsList.length == 1) {
                            this.eventsSplit.EVENT_ID = eventsList[0].EVENT_ID;
                            this.eventsSplit.FROM = eventsList[0].FROM;
                            this.eventsSplit.TO = eventsList[0].TO;
                            this.eventsSplit.NO_OF_ITEMS = eventsList[0].NO_OF_ITEMS;
                            this.eventsSplit.PARENT_EVENT_ID = eventsList[0].PARENT_EVENT_ID;
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.splitEventsServiceObj.checkForSplit(this.selectedEvent, this.selectedBUnit, true, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var blnCheckSplit = response.DataVariable;
                                        if (blnCheckSplit.toString() == "true") {
                                            _this.doSplit = true;
                                        }
                                        else if (blnCheckSplit.toString() == "false") {
                                            _this.doSplit = false;
                                        }
                                        _this.pop = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
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
                        exMsg_1 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(exMsg_1, "go");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SplitEventsComponent.prototype.add = function () {
        this.form = true;
        this.editform = false;
        this.page = false;
        this.pop = false;
    };
    SplitEventsComponent.prototype.edit = function () {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    };
    SplitEventsComponent.prototype.close = function () {
        this.form = false;
        this.page = true;
        this.pop = true;
        this.editform = false;
    };
    SplitEventsComponent.prototype.ddlOrgGrpIdChanged = function () {
        this.growlMessage = [];
        this.pop = false;
        try {
            if (this.selOrgGrpId == 'Select One') {
                this.ddlBunit = [];
                this.ddlBunit.push({ label: "Select BUnit", value: "SelectBUnit" });
                this.selectedBUnit = "SelectBUnit";
                this.ddlEvent = [];
                this.ddlEvent.push({ label: "Select Event", value: "Select Event" });
                this.selectedEvent = "Select Event";
            }
            else {
                this.selectedBUnit = "SelectBUnit";
                this.selectedEvent = "Select Event";
                this.populateBunitsDdlst();
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "ddlOrgGrpIdChanged");
        }
    };
    SplitEventsComponent.prototype.splitEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var blnEventCanBeSplit, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blnEventCanBeSplit = false;
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (this.selectedBUnit == "SelectBUnit") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        if (this.selectedEvent == "Select Event") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
                            return [2 /*return*/];
                        }
                        if (this.eventsSplit.PARENT_EVENT_ID.toString() == "" || this.eventsSplit.PARENT_EVENT_ID == null) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter number of Splits required" });
                            return [2 /*return*/];
                        }
                        if (this.eventsSplit.PARENT_EVENT_ID == 0 || this.eventsSplit.PARENT_EVENT_ID == 1) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Split Into cannot have 0 or 1 value" });
                            return [2 /*return*/];
                        }
                        if (this.eventsSplit.PARENT_EVENT_ID > parseInt(this.eventsSplit.NO_OF_ITEMS.toString())) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Number splits cannot be more than number of items for an event" });
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.splitEventsServiceObj.checkForSplit(this.selectedEvent, this.selectedBUnit, true, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var blnCheckSplit = response.DataVariable;
                                        if (blnCheckSplit.toString() == "false") {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Event cannot be split as it is downloaded by HHT user" });
                                            return;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.splitEventsServiceObj.SplitEvent(this.selectedBUnit, this.selectedEvent, this.eventsSplit.PARENT_EVENT_ID, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.selectedSortValue, this.eventsSplit.FROM, this.eventsSplit.TO)
                                .catch(this.httpService.handleError).then(function (res) {
                                _this.spinnerService.stop();
                                var response = res.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Event Splitted Successfully" });
                                        _this.pop = false;
                                        _this.selectedSortValue = _this.ddlSort[0].value;
                                        if (_this.blnShowOrgGroupID) {
                                            //this.selOrgGrpId = 'Select One';                               
                                            _this.selectedBUnit = "SelectBUnit";
                                            _this.ddlEvent = [];
                                            _this.ddlEvent.push({ label: "Select Event", value: "Select Event" });
                                            _this.selectedEvent = "Select Event";
                                        }
                                        else {
                                            _this.selectedBUnit = "SelectBUnit";
                                            _this.ddlEvent = [];
                                            _this.ddlEvent.push({ label: "Select Event", value: "Select Event" });
                                            _this.selectedEvent = "Select Event";
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (response.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No items for the event to Split" });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "splitEvents");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SplitEventsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    SplitEventsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.ddlOrgGrpID = [];
        this.ddlEvent = [];
        this.ddlSort = [];
        this.ddlBunit = [];
        this.lstEvents = [];
        this.eventsSplit = null;
        this.growlMessage = [];
        this.deviceTokenEntry = [];
        this.orgGroupsInfo = [];
        this.spinnerService.stop();
    };
    SplitEventsComponent = __decorate([
        core_1.Component({
            templateUrl: 'cyct-split-events.component.html',
            providers: [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, cyct_split_events_service_1.SplitEventsService, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            atpar_common_service_1.AtParCommonService,
            event_spinner_service_1.SpinnerService,
            HttpService_1.HttpService,
            cyct_split_events_service_1.SplitEventsService,
            AtParConstants_1.AtParConstants])
    ], SplitEventsComponent);
    return SplitEventsComponent;
}());
exports.SplitEventsComponent = SplitEventsComponent;
//# sourceMappingURL=cyct-split-events.component.js.map