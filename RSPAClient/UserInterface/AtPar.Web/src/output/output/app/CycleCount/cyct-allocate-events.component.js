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
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var router_1 = require("@angular/router");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var cyct_allocate_events_service_1 = require("./cyct-allocate-events.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var api_1 = require("../components/common/api");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var linq_es5_1 = require("linq-es5");
var datatable_1 = require("../components/datatable/datatable");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var AllocateEventsComponent = (function () {
    //previousFiled: string = "";
    /**
     *
     * @param leftBarAnimationservice
     * @param router
     * @param cyctAllocateEventService
     * @param httpService
     * @param spinnerService
     * @param atParConstant
     * @param confirmationService
     */
    function AllocateEventsComponent(leftBarAnimationservice, router, cyctAllocateEventService, httpService, spinnerService, atParConstant, confirmationService, commonService) {
        this.leftBarAnimationservice = leftBarAnimationservice;
        this.router = router;
        this.cyctAllocateEventService = cyctAllocateEventService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.confirmationService = confirmationService;
        this.commonService = commonService;
        /*Varaiable declaration*/
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstUsers = [];
        this.lstOrgGroups = [];
        this.lstBUnits = [];
        this.lstFilteredBUnits = [];
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.orgGrpId = "";
        this.orgGrpDesc = "";
        this.ven = [];
        this.blnStatusMsg = false;
        this.selectedOrgGroupId = "";
        this.selectedDropDownUserId = "";
        this.selectedBunit = "";
        this.selectedDescription = "";
        this.orgGroupIDForDBUpdate = "";
        this.eventDescription = "";
        this.lstsearch = [];
        this.selectedSearch = "";
        this.lstNoofRecords = [];
        this.selectedRecords = "";
        this.recordsPerPageAll = "";
        this.hdnSelOrgGrpId = "";
        this.dataCheckedSorting = [];
        this.page = true;
        this.eventDesc = "";
        this.blnSortByColumn = true;
        this.custom = "custom";
        this.showGrid = false;
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.growlMessage = [];
    }
    /**
     redirecting to home when click on breadcrumbs
     */
    AllocateEventsComponent.prototype.homeurl = function () {
        this.leftBarAnimationservice.isHomeClicked = false;
        this.leftBarAnimationservice.isHide();
        this.router.navigate(['atpar']);
    };
    /**
   * Init Function for getting all org group data and UserID and BusinessUnits when page load
   */
    AllocateEventsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                    this.endIndex = +sessionStorage.getItem("RecordsEndindex");
                    this.lstCheckedBUnits = new Array();
                    this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                    this.lstsearch.push({ label: 'All', value: 'All' }, { label: 'Allocated', value: 'Allocated' }, { label: 'Unallocated', value: 'Unallocated' });
                    this.lstNoofRecords.push({ label: '10', value: '10' }, { label: '20', value: '20' }, { label: '30', value: '30' }, { label: '40', value: '40' }, { label: '50', value: '50' }, { label: '60', value: '60' }, { label: '70', value: '70' }, { label: '80', value: '80' });
                    this.bindOrgGroups();
                    this.selectedSearch = 'All';
                }
                catch (ex) {
                    this.displayCatchException(ex, "ngOnInit");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Getting Org Group Data at page Load
     */
    AllocateEventsComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        _this.orgGroupData = data.DataList;
                                        _this.blnStatusMsg = false;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + ' - ' + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGrpDesc = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.populateBusinessUnits();
                                            _this.bindUsersList();
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "Select User" });
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + ' - ' + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
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
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.displayCatchException(ex_1, "bindOrgGroups");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Getting Business Units at page Load
     */
    AllocateEventsComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isOrgBUnitsExist = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpDesc;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstFilteredBUnits = [];
                        this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                                    _this.spinnerService.stop();
                                    return;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var lstFilteredBUnitsTest = data.DataList;
                                        if (lstFilteredBUnitsTest != null) {
                                            if (lstFilteredBUnitsTest.length > 0) {
                                                for (var i = 0; i < lstFilteredBUnitsTest.length; i++) {
                                                    _this.lstFilteredBUnits.push({ label: lstFilteredBUnitsTest[i], value: lstFilteredBUnitsTest[i] });
                                                }
                                            }
                                        }
                                        _this.spinnerService.stop();
                                        isOrgBUnitsExist = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
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
                        ex_2 = _a.sent();
                        this.displayCatchException(ex_2, "populateBusinessUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Getting Users List at page Load
     */
    AllocateEventsComponent.prototype.bindUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpDesc;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstUsers = [];
                        this.lstUsers.push({ label: "Select User", value: "Select User" });
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUsersList(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_1.EnumApps.CycleCount, this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstUsers.push({
                                                label: data.DataList[i].FULLNAME,
                                                value: data.DataList[i].USER_ID
                                            });
                                        }
                                        if (_this.lstUsers.length <= 0 || _this.lstUsers == null) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No users Available' });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
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
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.displayCatchException(ex_3, "bindUsersList");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function is Change event for OrgGroup ID
     */
    AllocateEventsComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.hdnSelOrgGrpId = this.selectedOrgGroupId;
                        this.showGrid = false;
                        this.selectedDropDownUserId = '';
                        if (this.selectedOrgGroupId == "Select One") {
                            this.lstUsers = [];
                            this.selectedBunit = '';
                            this.selectedDropDownUserId = '';
                            this.lstUsers.push({ label: "Select User", value: "Select User" });
                            this.lstFilteredBUnits = [];
                            this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                            return [2 /*return*/];
                        }
                        this.lstFilteredBUnits = [];
                        this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                        this.selectedBunit = '';
                        this.selectedDropDownUserId = '';
                        this.lstEvents = new Array();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.bindUsersList()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.populateBusinessUnits()];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.displayCatchException(ex_4, "ddlOrgGrpIdChanged");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function is Change event for User ID
     */
    AllocateEventsComponent.prototype.ddlUserIdChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.eventDesc = event.label;
                this.showGrid = false;
                return [2 /*return*/];
            });
        });
    };
    /**
     * This function is Change event for Records per page
     * @param event
     */
    AllocateEventsComponent.prototype.ddlSelectChangePage = function (event) {
        this.recordsPerPageSize = parseInt(event.value);
    };
    AllocateEventsComponent.prototype.ddlBUnitChanged = function () {
        this.showGrid = false;
    };
    AllocateEventsComponent.prototype.ddlSelectChanged = function () {
        this.showGrid = false;
    };
    /**
     * This function is called when we click on go button
     */
    AllocateEventsComponent.prototype.getAllBUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstGridFilterData = null;
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.showGrid = false;
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpDesc;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select User ID' });
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.bindEventDetails()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.displayCatchException(ex_5, "getAllBUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function is called when we click on go button
     */
    AllocateEventsComponent.prototype.bindEventDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.buildHeadersInputDataset()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.displayCatchException(ex_6, "bindEventDetails");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function is called when we click on go button
     */
    AllocateEventsComponent.prototype.buildHeadersInputDataset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.dataTableComponent != null) {
                            this.dataTableComponent.reset();
                        }
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpDesc;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] = this.orgGroupIDForDBUpdate;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.cyctAllocateEventService.getAllocateEvents(this.selectedDropDownUserId, this.selectedBunit, this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                var data, i;
                                return __generator(this, function (_a) {
                                    data = res.json();
                                    this.lstEvents = data.DataList;
                                    this.lstEventsData = this.lstEvents;
                                    this.lstEventsTotal = data.DataList;
                                    if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                        this.growlMessage = [];
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No business units allocated for Org Grp Id' });
                                        this.spinnerService.stop();
                                        this.showGrid = false;
                                        return [2 /*return*/];
                                    }
                                    switch (data.StatType) {
                                        case AtParEnums_1.StatusType.Success: {
                                            if (this.lstEvents.length > 0) {
                                                this.showGrid = true;
                                                for (i = 0; i < this.lstEvents.length; i++) {
                                                    if (this.lstEvents[i].COUNT_HDR_STATUS == "1") {
                                                        this.lstEvents[i].isOrphan = true;
                                                        this.lstEvents[i].CartColor = "black";
                                                    }
                                                    else {
                                                        this.lstEvents[i].isOrphan = false;
                                                        this.lstEvents[i].CartColor = "red";
                                                    }
                                                }
                                                if (this.selectedSearch == 'All') {
                                                    if (this.eventDescription == "" || this.eventDescription == null || this.eventDescription == undefined) {
                                                        //this.lstEvents = asEnumerable(this.lstEvents).OrderBy(a => a.STATUSALLOCATED === false).ThenByDescending(a => a.BUSINESS_UNIT).ToArray();
                                                    }
                                                    else {
                                                        this.lstEvents = linq_es5_1.asEnumerable(this.lstEvents).Where(function (a) { return (a.STATUSALLOCATED === false || a.STATUSALLOCATED === true) && a.EVENT_ID.toLowerCase().startsWith(_this.eventDescription.toLowerCase()); }).OrderBy(function (a) { return a.BUSINESS_UNIT; }).ToArray();
                                                        //this.lstEvents = asEnumerable(this.lstEvents).OrderBy(a => (a.STATUSALLOCATED === false)).ThenByDescending(a => a.BUSINESS_UNIT).ToArray();
                                                    }
                                                }
                                                else if (this.selectedSearch == 'Allocated') {
                                                    if (this.eventDescription == "" || this.eventDescription == null || this.eventDescription == undefined) {
                                                        this.lstEvents = linq_es5_1.asEnumerable(this.lstEvents).Where(function (a) { return a.STATUSALLOCATED === true; }).ToArray(); //.OrderBy(a => a.BUSINESS_UNIT).ToArray();
                                                    }
                                                    else {
                                                        this.lstEvents = linq_es5_1.asEnumerable(this.lstEvents).Where(function (a) { return a.STATUSALLOCATED === true && a.EVENT_ID.toLowerCase().startsWith(_this.eventDescription.toLowerCase()); }).OrderBy(function (a) { return a.BUSINESS_UNIT; }).ToArray();
                                                        // this.lstEvents = asEnumerable(this.lstEvents).OrderBy(a => (a.STATUSALLOCATED === false)).OrderBy(a => a.BUSINESS_UNIT).ToArray();
                                                    }
                                                }
                                                else if (this.selectedSearch == 'Unallocated') {
                                                    if (this.eventDescription == "" || this.eventDescription == null || this.eventDescription == undefined) {
                                                        this.lstEvents = linq_es5_1.asEnumerable(this.lstEvents).Where(function (a) { return a.STATUSALLOCATED === false; }).ToArray(); //.OrderBy(a => a.BUSINESS_UNIT).ToArray();
                                                    }
                                                    else {
                                                        this.lstEvents = linq_es5_1.asEnumerable(this.lstEvents).Where(function (a) { return a.STATUSALLOCATED === false && a.EVENT_ID.toLowerCase().startsWith(_this.eventDescription.toLowerCase()); }).OrderBy(function (a) { return a.BUSINESS_UNIT; }).ToArray();
                                                        //  this.lstEvents = asEnumerable(this.lstEvents).OrderBy(a => (a.STATUSALLOCATED === false)).ThenByDescending(a => a.BUSINESS_UNIT).ToArray();
                                                    }
                                                }
                                                this.lstLength = "Number of Events allocated to  " + this.eventDesc + " :" + this.lstEventsTotal.filter(function (x) { return x.STATUSALLOCATED === true; }).length;
                                                if (this.lstEvents == null || this.lstEvents.length <= 0) {
                                                    this.showGrid = false;
                                                    this.growlMessage = [];
                                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Events Found" });
                                                }
                                            }
                                            else {
                                                this.growlMessage = [];
                                                this.spinnerService.stop();
                                                this.showGrid = false;
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Events Found" });
                                                break;
                                            }
                                            this.bindDataGrid();
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Warn: {
                                            this.growlMessage = [];
                                            this.spinnerService.stop();
                                            if (this.lstEvents == null || this.lstEvents.length <= 0) {
                                                this.showGrid = false;
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Events Found" });
                                            }
                                            else if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.S_CYCT_EVENTS_CNCT_UNALLOCATE) {
                                                this.showGrid = true;
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            }
                                            else {
                                                this.showGrid = false;
                                                this.growlMessage.push({
                                                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage
                                                });
                                            }
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error: {
                                            this.growlMessage = [];
                                            this.spinnerService.stop();
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Custom: {
                                            this.growlMessage = [];
                                            this.spinnerService.stop();
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    this.spinnerService.stop();
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_7 = _a.sent();
                        this.displayCatchException(ex_7, "buildHeadersInputDataset");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function is for binding data to datatable
     */
    AllocateEventsComponent.prototype.bindDataGrid = function () {
        try {
            var lstDBDataList;
            this.dataCheckedSorting = [];
            this.dataUncheckedSorting = [];
            for (var i = 0; i <= this.lstEvents.length - 1; i++) {
                if (this.lstEvents[i].STATUSALLOCATED == true) {
                    this.dataCheckedSorting.push(this.lstEvents[i]);
                }
                else {
                    this.dataUncheckedSorting.push(this.lstEvents[i]);
                }
            }
            this.spinnerService.stop();
        }
        catch (ex) {
            this.displayCatchException(ex, "bindDataGrid");
        }
    };
    /**
     * This event is called when we check or uncheck the swicth component
     * @param values
     * @param event
     */
    AllocateEventsComponent.prototype.selectedRow = function (values, event) {
        return __awaiter(this, void 0, void 0, function () {
            var i, index;
            return __generator(this, function (_a) {
                try {
                    if (event == true) {
                        values.STATUSALLOCATED = true;
                    }
                    else {
                        values.STATUSALLOCATED = false;
                    }
                    if (this.lstCheckedBUnits.length > 0 && this.lstCheckedBUnits != null) {
                        for (i = 0; i < this.lstCheckedBUnits.length; i++) {
                            if (this.lstCheckedBUnits[i].BUSINESS_UNIT === values.BUSINESS_UNIT) {
                                index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0);
                                this.lstCheckedBUnits.splice(index, 1);
                            }
                        }
                        this.lstCheckedBUnits.push(values);
                    }
                }
                catch (ex) {
                    this.displayCatchException(ex, "selectedRow");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
    * check all the switches
    */
    AllocateEventsComponent.prototype.checkAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                try {
                    this.lstCheckedBUnits = [];
                    this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                    this.endIndex = +sessionStorage.getItem("RecordsEndindex");
                    if (this.lstGridFilterData != null && this.lstGridFilterData != undefined && this.lstGridFilterData.length > 0) {
                        if (this.endIndex > this.lstGridFilterData.length) {
                            this.endIndex = this.lstGridFilterData.length;
                        }
                        for (i = this.startIndex; i <= this.endIndex - 1; i++) {
                            this.lstGridFilterData[i].STATUSALLOCATED = true;
                            this.lstCheckedBUnits.push(this.lstGridFilterData[i]);
                        }
                    }
                    else {
                        if (this.endIndex > this.lstEvents.length) {
                            this.endIndex = this.lstEvents.length;
                        }
                        for (i = this.startIndex; i <= this.endIndex - 1; i++) {
                            this.lstEvents[i].STATUSALLOCATED = true;
                            this.lstCheckedBUnits.push(this.lstEvents[i]);
                        }
                    }
                }
                catch (ex) {
                    this.displayCatchException(ex, "checkAll");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Uncheck all the switches
     */
    AllocateEventsComponent.prototype.unCheckAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                try {
                    this.lstCheckedBUnits = [];
                    this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                    this.endIndex = +sessionStorage.getItem("RecordsEndindex");
                    if (this.lstGridFilterData != null && this.lstGridFilterData != undefined && this.lstGridFilterData.length > 0) {
                        if (this.endIndex > this.lstGridFilterData.length) {
                            this.endIndex = this.lstGridFilterData.length;
                        }
                        for (i = this.endIndex - 1; i >= this.startIndex; i--) {
                            this.lstGridFilterData[i].STATUSALLOCATED = false;
                            this.lstCheckedBUnits.push(this.lstGridFilterData[i]);
                        }
                    }
                    else {
                        if (this.endIndex > this.lstEvents.length) {
                            this.endIndex = this.lstEvents.length;
                        }
                        for (i = this.endIndex - 1; i >= this.startIndex; i--) {
                            this.lstEvents[i].STATUSALLOCATED = false;
                            this.lstCheckedBUnits.push(this.lstEvents[i]);
                        }
                    }
                }
                catch (ex) {
                    this.displayCatchException(ex, "unCheckAll");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Updating Events
     */
    AllocateEventsComponent.prototype.updateEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lstdsEventDetails, i, business, eventID, noRecords, fromLoc, toLoc, userID, statusAllocation, actualStatus, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        lstdsEventDetails = [];
                        if (!(this.lstEvents.length > 0)) return [3 /*break*/, 2];
                        lstdsEventDetails = [];
                        for (i = 0; i < this.lstEvents.length; i++) {
                            if (this.lstEvents[i].STATUSALLOCATED != this.lstEvents[i].ACTUAL_STATUSALLOCATED) {
                                business = AtParEnums_1.Send_CycleCount_Event_Enum.BUSINESS_UNIT;
                                eventID = AtParEnums_1.Send_CycleCount_Event_Enum.EVENT_ID;
                                noRecords = AtParEnums_1.Send_CycleCount_Event_Enum.NO_RECORDS;
                                fromLoc = AtParEnums_1.Send_CycleCount_Event_Enum.FROM_STOR_LOC;
                                toLoc = AtParEnums_1.Send_CycleCount_Event_Enum.TO_STOR_LOC;
                                userID = AtParEnums_1.Send_CycleCount_Event_Enum.USER_ID;
                                statusAllocation = AtParEnums_1.Send_CycleCount_Event_Enum.ALLOCATION_STATUS;
                                actualStatus = AtParEnums_1.Send_CycleCount_Event_Enum.ACTUAL_ALLOCATION_STATUS;
                                lstdsEventDetails.push({
                                    BUSINESS_UNIT: this.lstEvents[i].BUSINESS_UNIT,
                                    EVENT_ID: this.lstEvents[i].EVENT_ID,
                                    NO_RECORDS: this.lstEvents[i].NO_RECORDS,
                                    FROM_STOR_LOC: this.lstEvents[i].FROM_STOR_LOC,
                                    TO_STOR_LOC: this.lstEvents[i].TO_STOR_LOC,
                                    USER_ID: this.selectedDropDownUserId,
                                    STATUSALLOCATED: this.lstEvents[i].STATUSALLOCATED,
                                    ALLOCATION_STATUS: this.lstEvents[i].STATUSALLOCATED,
                                    ACTUAL_STATUSALLOCATED: this.lstEvents[i].ACTUAL_STATUSALLOCATED
                                });
                            }
                        }
                        localStorage.setItem('EventDetails', JSON.stringify(lstdsEventDetails));
                        this.spinnerService.start();
                        return [4 /*yield*/, this.cyctAllocateEventService.updateEvents(lstdsEventDetails, this.deviceTokenEntry)
                                .subscribe(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            this.growlMessage = [];
                                            _a = response.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 2];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 4];
                                                case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 5];
                                            }
                                            return [3 /*break*/, 6];
                                        case 1:
                                            {
                                                this.lstEvents = [];
                                                this.showGrid = false;
                                                this.selectedDropDownUserId = "";
                                                this.selectedBunit = "";
                                                this.eventDescription = "";
                                                this.spinnerService.stop();
                                                this.selectedSearch = 'All';
                                                this.growlMessage = [];
                                                // this.selectedOrgGroupId = "";
                                                this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'User Events Updated Successfully' });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 2;
                                        case 2:
                                            this.showGrid = true;
                                            //this.spinnerService.start();
                                            this.growlMessage = [];
                                            return [4 /*yield*/, this.warnMessage(response.StatusCode, response.StatusMessage)];
                                        case 3:
                                            _b.sent();
                                            // setTimeout(() => {}, 100);
                                            return [3 /*break*/, 6];
                                        case 4:
                                            {
                                                this.spinnerService.stop();
                                                this.showGrid = false;
                                                this.growlMessage = [];
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 5;
                                        case 5:
                                            {
                                                this.spinnerService.stop();
                                                this.showGrid = false;
                                                this.growlMessage = [];
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 6;
                                        case 6:
                                            this.spinnerService.stop();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_8 = _a.sent();
                        this.displayCatchException(ex_8, "updateEvents");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateEventsComponent.prototype.warnMessage = function (statusCode, statusMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.growlMessage = [];
                        if (!(statusCode == AtParStatusCodes_1.AtparStatusCodes.S_CYCT_EVENTS_CNCT_UNALLOCATE)) return [3 /*break*/, 2];
                        //this.showGrid = false;
                        return [4 /*yield*/, this.bindEventDetails()];
                    case 1:
                        //this.showGrid = false;
                        _a.sent();
                        this.showGrid = true;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: statusMessage });
                        return [3 /*break*/, 3];
                    case 2:
                        this.showGrid = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: statusMessage });
                        _a.label = 3;
                    case 3:
                        this.spinnerService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_9 = _a.sent();
                        this.displayCatchException(ex_9, "warnMessage");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function is used for filtering data in datatable
     * @param event
     */
    AllocateEventsComponent.prototype.filterdata = function (event) {
        this.lstGridFilterData = [];
        this.lstGridFilterData = new Array();
        this.lstGridFilterData = event;
    };
    /**
     * This function  is used for Custom sorting in data table for all columns
     * @param event
     */
    AllocateEventsComponent.prototype.customSort = function (event) {
        try {
            var element = event;
            this.lstEvents = [];
            this.blnSortByColumn = !this.blnSortByColumn;
            this.sortedCheckedRec = [];
            this.sortedUncheckedRec = [];
            this.sortedCheckedRec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            this.sortedUncheckedRec = this.dataUncheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            if (this.blnSortByColumn == false) {
                this.lstEvents = [];
                if (this.selectedSearch == 'All') {
                    this.lstEvents = this.sortedCheckedRec.reverse().concat(this.sortedUncheckedRec.reverse());
                }
                else if (this.selectedSearch == 'Allocated') {
                    this.lstEvents = this.sortedCheckedRec.reverse();
                }
                else if (this.selectedSearch == 'Unallocated') {
                    this.lstEvents = this.sortedUncheckedRec.reverse();
                }
            }
            else {
                this.lstEvents = [];
                if (this.selectedSearch == 'All') {
                    this.lstEvents = this.sortedCheckedRec.concat(this.sortedUncheckedRec);
                }
                else if (this.selectedSearch == 'Allocated') {
                    this.lstEvents = this.sortedCheckedRec;
                }
                else if (this.selectedSearch == 'Unallocated') {
                    this.lstEvents = this.sortedUncheckedRec;
                }
            }
            this.sortedCheckedRec = [];
            this.sortedUncheckedRec = [];
        }
        catch (ex) {
            this.displayCatchException(ex, "customSort");
        }
    };
    /**
    * This method is for displaying catch block error messages
    * @param event
    */
    AllocateEventsComponent.prototype.displayCatchException = function (ex, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString(), funName, this.constructor.name);
    };
    /**
   * delete all the values from variables
   */
    AllocateEventsComponent.prototype.ngOnDestroy = function () {
        this.lstEvents = null;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstOrgGroups = [];
        this.lstUsers = [];
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.orgGrpId = "";
        this.lstGridFilterData = [];
        this.sortedCheckedRec = [];
        this.sortedUncheckedRec = [];
        this.lstLength = 0;
        this.blnSortByColumn = true;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], AllocateEventsComponent.prototype, "dataTableComponent", void 0);
    AllocateEventsComponent = __decorate([
        core_1.Component({
            templateUrl: 'cyct-allocate-events.component.html',
            providers: [AtParConstants_1.AtParConstants, api_1.ConfirmationService, cyct_allocate_events_service_1.CyctAllocateEventsService, atpar_common_service_1.AtParCommonService]
        }),
        __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService,
            router_1.Router,
            cyct_allocate_events_service_1.CyctAllocateEventsService,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            api_1.ConfirmationService,
            atpar_common_service_1.AtParCommonService])
    ], AllocateEventsComponent);
    return AllocateEventsComponent;
}());
exports.AllocateEventsComponent = AllocateEventsComponent;
//# sourceMappingURL=cyct-allocate-events.component.js.map