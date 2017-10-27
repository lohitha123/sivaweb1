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
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var routepath_1 = require("../AtPar/Menus/routepath");
var pou_transaction_history_report_service_1 = require("./pou-transaction-history-report.service");
var file_saver_1 = require("file-saver");
var TransactionHistoryReportComponent = (function () {
    /**
    * Constructor
    * @param ParOptimizationReportService
    * @param AtParCommonService
    * @param httpService
    * @param spinnerService
    * @param AtParConstants
    */
    function TransactionHistoryReportComponent(httpService, commonService, spinnerService, atParConstant, pouTransactionHistoryReportService) {
        this.httpService = httpService;
        this.commonService = commonService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.pouTransactionHistoryReportService = pouTransactionHistoryReportService;
        this.isVisible = false;
        this.selectedPercentage = "";
        this.gEditParUserParamval = "";
        this.strOrgGrpId = "";
        this.orgGroupIDForDBUpdate = "";
        this.selectedOrgGroupId = "";
        this.orgGrpId = "";
        this.selectedCartId = "";
        this.selectedBunit = "";
        this.gstrProtocal = "";
        this.selectedItemId = "";
        this.string = "";
        this.orgGrpIDData = "";
        this.gstrPortNo = "";
        this.strParQty = "";
        this.strPrice = "";
        this.ipAddress = "";
        this.toMailAddr = '';
        this.selectedDeptId = "";
        this.strUserId = "";
        this.cartIdValue = "";
        this.noOfRecords = 0;
        this.recordsPerPage = 0;
        this.statusCode = -1;
        this.statusCode1 = -1;
        this.defDateRange = 0;
        this.strPrevCartID = "";
        this.page = true;
        this.isMailDialog = false;
        this.tdExports = false;
        this.blnsortbycolumn = false;
        this.showGrid = false;
        this.isVisibleChkBox = false;
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupsDropdown = false;
        this.checkBoxValue = false;
        this.bunitsData = [];
        this.lstOrgGroups = [];
        this.lstBUnits = [];
        this.lstFilteredBUnits = [];
        this.lstFilteredCartIds = [];
        this.lstCartIds = [];
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstDeptuserItems = [];
        this.lstTransHistoryHeaders = [];
        this.lstTransHistoryDetails = [];
        this.lstFilteredItemIds = [];
        this.appId = AtParEnums_1.EnumApps.PointOfUse;
        try {
            this.spinnerService.start();
            this.breadCrumbMenu = new routepath_1.Menus();
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'constructor');
        }
        this.spinnerService.stop();
    }
    /**
    * Init Function for Populate Bunits to the dropdown when page loading and getMyPreferences.
    */
    TransactionHistoryReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, ex_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.strUserId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, 7, 8]);
                        this.spinnerService.start();
                        this.statusCode = -1;
                        _a = this;
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 2:
                        _a.statusCode = _c.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Internal Server Error' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 3:
                        _c.sent();
                        this.currentDate = new Date();
                        this.toDate = new Date();
                        this.fromDate = new Date();
                        if (!(this.defDateRange.toString() != '' && this.defDateRange != null)) return [3 /*break*/, 5];
                        _b = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, -this.defDateRange)];
                    case 4:
                        _b.fromDate = _c.sent();
                        _c.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        ex_1 = _c.sent();
                        this.clientErrorMsg(ex_1, 'OnInit');
                        return [3 /*break*/, 8];
                    case 7:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    TransactionHistoryReportComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.strUserId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpIDData = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.populateBussinessUnits();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupsDropdown = true;
                                            _this.lstFilteredBUnits = [];
                                            _this.isVisible = false;
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.lstOrgGroups = [];
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            break;
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
                                    case AtParEnums_1.StatusType.Custom: {
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
                        this.clientErrorMsg(ex_2, 'bindOrgGroups');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when user selecting  Ogrgrpid in  OrgGrpid dropdown and populate bunits for selecting OrggrpId
    */
    TransactionHistoryReportComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.growlMessage = [];
                        this.spinnerService.start();
                        this.isVisible = false;
                        this.tdExports = false;
                        this.selectedBunit = "";
                        this.selectedCartId = "";
                        if (this.selectedOrgGroupId == "Select One") {
                            this.lstFilteredBUnits = [];
                            this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.populateBussinessUnits()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, 'ddlOrgGrpIdChanged');
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when user selecting  Bunit in  Bunit dropdown
    */
    TransactionHistoryReportComponent.prototype.ddlBUnitChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.selectedCartId = "";
                        this.selectedItemId = "";
                        this.isVisible = false;
                        this.tdExports = false;
                        if (this.lstFilteredBUnits.length > 1 && (this.selectedBunit == "Select BUnit" || this.selectedBunit == "")) {
                            this.lstCartIds = null;
                            this.lstDeptuserItems = null;
                            this.isVisible = false;
                            this.tdExports = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        if (this.selectedBunit == "" || this.selectedBunit == "Select BUnit") {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.GetDeptAllocCarts()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, 'ddlBUnitChanged');
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TransactionHistoryReportComponent.prototype.GetDeptAllocCarts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strBunit, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strBunit = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.pouTransactionHistoryReportService.GetDeptAllocCarts(this.selectedBunit, "", 1, AtParEnums_1.LocationType.P.toString(), this.appId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        strBunit = _this.selectedBunit;
                                        if (data.DataList.length > 0) {
                                            _this.lstCartIds = data.DataList;
                                            _this.getUserDepartmentsItems();
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.lstCartIds = null;
                                        _this.lstDeptuserItems = null;
                                        _this.isVisible = false;
                                        _this.tdExports = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Par Locations(s) are not allocated to the Department" });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: "Failed to get Business Units / Par Location" });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, 'GetDeptAllocCarts');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TransactionHistoryReportComponent.prototype.getUserDepartmentsItems = function () {
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
                        return [4 /*yield*/, this.pouTransactionHistoryReportService.getUserDepartmentsItems(this.strUserId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], false, this.appId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                _this.spinnerService.stop();
                                _this.lstDeptuserItems = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataDictionary != null) {
                                            _this.lstDeptuserItems = data.DataDictionary["pUserDeptItemsDS"]["DEPARTMENT_CART_ITEMS"];
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.isVisible = false;
                                        _this.tdExports = false;
                                        //this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, 'getUserDepartmentsItems');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when user enter any value in itemid AutoSearchBox
    */
    TransactionHistoryReportComponent.prototype.fillItemIdsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                this.growlMessage = [];
                query = event.query;
                try {
                    if (this.lstDeptuserItems != null) {
                        this.lstFilteredItemIds = this.filterItemIds(query, this.lstDeptuserItems);
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, 'fillItemIdsAuto');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * This method is used for filtering itemids
     */
    TransactionHistoryReportComponent.prototype.filterItemIds = function (query, ItemIds) {
        var filtered = [];
        var strtCartId = this.selectedCartId.split(" - ")[0];
        if (query == "%") {
            var _loop_1 = function (i) {
                var ItemIdValue = ItemIds[i].ITEM_ID + " - " + ItemIds[i].ITEM_DESCRIPTION;
                var cartID = ItemIds[i].CART_ID;
                if (filtered != null && filtered != undefined && filtered.length > 0) {
                    result = filtered.filter(function (x) { return x == ItemIdValue; });
                    if (result.length <= 0) {
                        if (cartID == strtCartId) {
                            filtered.push(ItemIdValue);
                        }
                    }
                }
                else {
                    if (cartID == strtCartId) {
                        filtered.push(ItemIdValue);
                    }
                }
            };
            var result;
            for (var i = 0; i < ItemIds.length; i++) {
                _loop_1(i);
            }
        }
        else {
            if (query.length >= 1) {
                var _loop_2 = function (i) {
                    var ItemIdValue = ItemIds[i].ITEM_ID + " - " + ItemIds[i].ITEM_DESCRIPTION;
                    var cartID = ItemIds[i].CART_ID;
                    if (filtered != null && filtered != undefined && filtered.length > 0) {
                        result = filtered.filter(function (x) { return x == ItemIdValue; });
                        if (result.length <= 0) {
                            if ((ItemIdValue.toLowerCase().indexOf(query.toLowerCase()) == 0) && cartID == strtCartId) {
                                filtered.push(ItemIdValue);
                            }
                        }
                    }
                    else {
                        if ((ItemIdValue.toLowerCase().indexOf(query.toLowerCase()) == 0) && cartID == strtCartId) {
                            filtered.push(ItemIdValue);
                        }
                    }
                };
                var result;
                for (var i = 0; i < ItemIds.length; i++) {
                    _loop_2(i);
                }
            }
        }
        return filtered;
    };
    /**
    * This method is calling when user enter any value in cartid AutoSearchBox
    */
    TransactionHistoryReportComponent.prototype.fillCartIdsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                this.growlMessage = [];
                query = event.query;
                try {
                    if (this.lstCartIds != null) {
                        this.lstFilteredCartIds = this.filterCartIds(query, this.lstCartIds);
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, 'fillItemIdsAuto');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * This method is used for filtering cartids
     */
    TransactionHistoryReportComponent.prototype.filterCartIds = function (query, CartIds) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < CartIds.length; i++) {
                var CartIdValue = CartIds[i].LOCATION + " - " + CartIds[i].LOCATION_DESCR;
                filtered.push(CartIdValue);
            }
        }
        else {
            if (query.length >= 1) {
                for (var i = 0; i < CartIds.length; i++) {
                    var CartIdValue = CartIds[i].LOCATION + " - " + CartIds[i].LOCATION_DESCR;
                    if (CartIdValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(CartIdValue);
                    }
                }
            }
        }
        return filtered;
    };
    /**
    * This method is used for validating fields
    */
    TransactionHistoryReportComponent.prototype.validateSearchFields = function () {
        try {
            this.growlMessage = [];
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormate(this.toDate)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
                if (Date.parse(this.convertDateFormate(this.fromDate)) > Date.parse(this.convertDateFormate(this.toDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date must be less than or equal to To Date" });
                    return false;
                }
                if ((this.blnShowOrgGroupsDropdown == true) && (this.selectedOrgGroupId == 'Select One' || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "")) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select valid Org Group ID" });
                    return false;
                }
                if ((this.selectedBunit == null || this.selectedBunit == undefined || this.selectedBunit == "" || this.selectedBunit == 'Select Bunit')
                    && (this.blnShowOrgGroupLabel == true)) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                    return false;
                }
                if ((this.selectedBunit == null || this.selectedBunit == undefined || this.selectedBunit == "" || this.selectedBunit == 'Select Bunit')
                    && (this.blnShowOrgGroupsDropdown == true)) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                    return false;
                }
                if ((this.selectedCartId == null || this.selectedCartId == undefined || this.selectedCartId == "") &&
                    (this.selectedItemId == null || this.selectedItemId == undefined || this.selectedItemId == "")) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Par Location or Item ID is mandatory" });
                    return false;
                }
                if ((this.selectedBunit == null || this.selectedBunit == undefined || this.selectedBunit == "")) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "BUnit is mandatory" });
                    return false;
                }
            }
            else {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'validateSearchFields');
            return false;
        }
    };
    /**
    * This method is calling when click on Go button
    */
    TransactionHistoryReportComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnValue, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.growlMessage = [];
                        returnValue = false;
                        return [4 /*yield*/, this.validateSearchFields()];
                    case 1:
                        returnValue = _a.sent();
                        if (!returnValue) return [3 /*break*/, 3];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: 'Getting data....' });
                        return [4 /*yield*/, this.bindDataGrid()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, '');
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TransactionHistoryReportComponent.prototype.bindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strBUnit, orgGrpId, strItemId, strtCartId, _blnDisplayNegQoH, cartIds, fromDate, toDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strBUnit = "";
                        orgGrpId = "";
                        strItemId = '';
                        strtCartId = "";
                        _blnDisplayNegQoH = false;
                        cartIds = [];
                        return [4 /*yield*/, this.convertDateFormate(this.fromDate)];
                    case 1:
                        fromDate = _a.sent();
                        return [4 /*yield*/, this.convertDateFormate(this.toDate)];
                    case 2:
                        toDate = _a.sent();
                        strBUnit = (this.selectedBunit == "Select BUnit" || this.selectedBunit == "") ? "All" : this.selectedBunit;
                        if (this.lstFilteredBUnits.length <= 1) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No assigned org business units" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        if (this.blnShowOrgGroupLabel == true) {
                            orgGrpId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        }
                        else {
                            orgGrpId = this.selectedOrgGroupId;
                        }
                        if (this.selectedItemId != null && this.selectedItemId != "") {
                            strItemId = this.selectedItemId.split(" - ")[0];
                        }
                        if (this.selectedCartId != null && this.selectedCartId != "") {
                            strtCartId = this.selectedCartId.split(" - ")[0];
                        }
                        _blnDisplayNegQoH = this.checkBoxValue == true ? true : false;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.pouTransactionHistoryReportService.getInventoryTrackHistoryReport(fromDate, toDate, strBUnit, strtCartId.toUpperCase(), strItemId, orgGrpId, _blnDisplayNegQoH, this.appId).catch(this.httpService.handleError).
                                then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.statusCode = data.StatusCode;
                                _this.spinnerService.stop();
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    if (data.DataDictionary["pTransDS"] != null) {
                                        _this.lstTransHistoryHeaders = data.DataDictionary["pTransDS"]["Headers"];
                                        _this.lstTransHistoryDetails = data.DataDictionary["pTransDS"]["Details"];
                                        if (_this.lstTransHistoryHeaders.length > 0 && _this.lstTransHistoryDetails.length > 0) {
                                            _this.isVisible = true;
                                            _this.tdExports = true;
                                            _this.lstTransHistoryDetails.forEach(function (x) {
                                                x.DATE = _this.convertDateFormate(x.UPDATE_DATE);
                                                x.TIME = _this.convertTimeFormat(x.UPDATE_DATE);
                                            });
                                            _this.lstTransHistoryDetails.forEach(function (detail) {
                                                if ((detail.ISSUE_UOM == null) || (detail.ISSUE_UOM == "NAN")) {
                                                    detail.ISSUE_UOM = "";
                                                }
                                                if (detail.QTY_ISSUED == null) {
                                                    detail.QTY_ISSUED = 0;
                                                    detail.QTY_ISSUED = parseFloat(detail.QTY_ISSUED).toFixed(2);
                                                }
                                                else {
                                                    detail.QTY_ISSUED = parseFloat(detail.QTY_ISSUED).toFixed(2);
                                                }
                                                if (detail.QTY_RETPUTAWAY == null) {
                                                    detail.QTY_RETPUTAWAY = 0;
                                                    detail.QTY_RETPUTAWAY = parseFloat(detail.QTY_RETPUTAWAY).toFixed(2);
                                                }
                                                else {
                                                    detail.QTY_RETPUTAWAY = parseFloat(detail.QTY_RETPUTAWAY).toFixed(2);
                                                }
                                                if (detail.QTY_ADJUSTED == null) {
                                                    detail.QTY_ADJUSTED = 0;
                                                    detail.QTY_ADJUSTED = parseFloat(detail.QTY_ADJUSTED).toFixed(2);
                                                }
                                                else {
                                                    detail.QTY_ADJUSTED = parseFloat(detail.QTY_ADJUSTED).toFixed(2);
                                                }
                                                if (detail.ON_HAND_QTY == null) {
                                                    detail.ON_HAND_QTY = 0;
                                                    detail.ON_HAND_QTY = parseFloat(detail.ON_HAND_QTY).toFixed(2);
                                                }
                                                else {
                                                    detail.ON_HAND_QTY = parseFloat(detail.ON_HAND_QTY).toFixed(2);
                                                }
                                            });
                                            _this.lstTransHistoryHeaders.forEach(function (header) {
                                                var details = [];
                                                details = _this.lstTransHistoryDetails.filter(function (detail) {
                                                    return (detail.CART_ID == header.CART_ID && detail.ITEM_ID == header.ITEM_ID && detail.COMPARTMENT == header.COMPARTMENT);
                                                });
                                                header.DETAILS = details;
                                            });
                                            var _loop_3 = function (i) {
                                                _this.lstTransHistoryHeaders[i].QOH = parseFloat(_this.lstTransHistoryHeaders[i].QOH).toFixed(2);
                                                _this.lstTransHistoryHeaders[i].ITEM_ID = _this.lstTransHistoryHeaders[i].ITEM_ID + " - " + _this.lstTransHistoryHeaders[i].ITEM_DESCR;
                                                cartIds = _this.lstCartIds.filter(function (x) { return x.LOCATION == _this.lstTransHistoryHeaders[i].CART_ID; });
                                                _this.lstTransHistoryHeaders[i].CART_ID = cartIds[0].LOCATION + " - " + cartIds[0].LOCATION_DESCR;
                                            };
                                            for (var i = 0; i <= _this.lstTransHistoryHeaders.length - 1; i++) {
                                                _loop_3(i);
                                            }
                                            if (_this.noOfRecords == 0) {
                                                _this.rowsPerPage = _this.lstTransHistoryHeaders.length;
                                            }
                                            else {
                                                _this.rowsPerPage = _this.noOfRecords;
                                            }
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                                            _this.isVisible = false;
                                            _this.tdExports = false;
                                            return;
                                        }
                                    }
                                }
                                else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                                    _this.isVisible = false;
                                    _this.tdExports = false;
                                    return;
                                }
                                else {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Internal Server Error" });
                                    _this.isVisible = false;
                                    _this.tdExports = false;
                                    return;
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is used for change date format to mm/dd/yyyy
    */
    TransactionHistoryReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    /**
    * This method is used for change time format to HH:MM(Hours:Minuts)
    */
    TransactionHistoryReportComponent.prototype.convertTimeFormat = function (strDate) {
        var date = new Date(strDate), hours = date.getHours(), minuts = date.getMinutes();
        return [hours, minuts].join(":");
    };
    TransactionHistoryReportComponent.prototype.populateBussinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstFilteredBUnits = [];
                        this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                                    _this.isVisible = false;
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
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.isVisible = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.isVisible = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.isVisible = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, 'populateBussinessUnits');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is used for adding days
    */
    TransactionHistoryReportComponent.prototype.addDays = function (theDate, days) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)];
            });
        });
    };
    TransactionHistoryReportComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_9, ex_10, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.defDateRange = parseInt(data.DataVariable.toString());
                                }
                            })];
                    case 2:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        ex_9 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.commonService.getMyPreferences('RECORDS_PER_PAGE', this.deviceTokenEntry)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.noOfRecords = parseInt(data.DataVariable.toString());
                                }
                            })];
                    case 5:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        ex_10 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        ex_11 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 9: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    /**
     * This method is calling when user click on Mail Icon
     * @param event
     */
    TransactionHistoryReportComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
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
    /**
     * This method is calling when user userclick on submit button after enter mailid
     * @param event
     */
    TransactionHistoryReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_12;
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
                        return [4 /*yield*/, this.ExportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Pou Transaction History Report', JSON.stringify(html), this.toMailAddr, AtParEnums_1.MailPriority.Normal.toString(), '')
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                            })];
                    case 2:
                        _a.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Mail has been sent' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'From Address is Missing! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Please Enter valid Email Address to Send' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_BODY) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Email Server not configured! Please contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SEND_FAILED) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                        }
                        else {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                        }
                        _a.label = 3;
                    case 3:
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12, 'onSendMailClick');
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is used for validating Email
    * @param event
    */
    TransactionHistoryReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    /**
     * This method is calling when user click on print Icon
     * @param event
     */
    TransactionHistoryReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.growlMessage = [];
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.ExportReportDetails('Print')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            mywindow = window.open('', null, 'height=600,width=600,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'PointOfUse - Transaction History Report' + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                mywindow.document.close(); // necessary for IE >= 10
                                mywindow.focus(); // necessary for IE >= 10*/
                                //mywindow.print();
                                //mywindow.close();
                                return [2 /*return*/, true];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13, 'onPrintClick');
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method is calling when user click on Excel Icon
     * @param event
     */
    TransactionHistoryReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.growlMessage = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.ExportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "pou_transaction_history_report.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_14 = _a.sent();
                        this.clientErrorMsg(ex_14, 'onExportToExcelClick');
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method is for export  datatable data in different formats
     * @param event
     */
    TransactionHistoryReportComponent.prototype.ExportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, title, ex_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        return [4 /*yield*/, this.commonService.getServerIP()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ipAddress = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.commonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.growlMessage = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 3:
                        _a.sent();
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder += "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<tr width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Point Of Use Transaction History Report between <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else if (reqType == 'Excel') {
                            htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Point Of Use Transaction History Report between <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;";
                        }
                        else {
                            htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Point Of Use Transaction History Report between <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center  nowrap><span class=c3><b>Item ID - Description</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Cart ID - Description</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Compartment</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Custom Item ID</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>UPC ID</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Vendor Item ID</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Mfg ItemID</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>UOM</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Quantity On Hand</b></span></td>"
                            + "</tr>";
                        this.lstTransHistoryHeaders.forEach(function (headers) {
                            htmlBuilder += "<tr>";
                            if (reqType == "Print" || reqType == "Mail") {
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.ITEM_ID + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.CART_ID + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.COMPARTMENT + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.CUST_ITEM_ID + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + headers.UPC_ID + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + headers.VNDR_ITEM_ID + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + headers.MFG_ITEM_ID + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + headers.PAR_UOM + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.QOH + "</span></td>";
                                htmlBuilder += "</tr>";
                            }
                            else {
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.ITEM_ID + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.CART_ID + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.COMPARTMENT + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.CUST_ITEM_ID + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + headers.UPC_ID + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + headers.VNDR_ITEM_ID + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.MFG_ITEM_ID + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + headers.PAR_UOM + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + headers.QOH + "</span></td>";
                                htmlBuilder += "</tr>";
                            }
                            if (headers.DETAILS != null) {
                                htmlBuilder += "<tr>";
                                htmlBuilder += "<td colspan=8>";
                                htmlBuilder += "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
                                htmlBuilder += "<tr bgcolor=#d3d3d3>";
                                htmlBuilder += "<td align=center nowrap colspan=3><span class=c3><b>Transaction</b></span></td>";
                                htmlBuilder += "<td align=center nowrap colspan=6><span class=c3></span></td>";
                                htmlBuilder += "</tr>";
                                htmlBuilder += "<tr bgcolor=#d3d3d3>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Date</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Time</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Type</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Issue Uom</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Qty Issued</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Qty Putaway /Returned</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Qty Adjusted</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Quantity On Hand</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>User</b></span></td>";
                                htmlBuilder += "<td align=center nowrap><span class=c3><b>Reason Code</b></span></td>";
                                htmlBuilder += "</tr>";
                                if (reqType == "Print" || reqType == "Mail") {
                                    headers.DETAILS.forEach(function (details) {
                                        htmlBuilder += "<tr>";
                                        htmlBuilder += "<td align=left nowrap><span class=c3>" + details.DATE + "</span></td>";
                                        htmlBuilder += "<td align=left nowrap><span class=c3>" + details.TIME + "</span></td>";
                                        htmlBuilder += "<td align=left nowrap><span class=c3>" + details.EVENT_TYPE_DATA + "</span></td>";
                                        htmlBuilder += "<td align=left nowrap><span class=c3>" + details.ISSUE_UOM + "</span></td>";
                                        htmlBuilder += "<td align=right nowrap><span class=c3>" + details.QTY_ISSUED + "</span></td>";
                                        htmlBuilder += "<td align=right nowrap><span class=c3>" + details.QTY_RETPUTAWAY + "</span></td>";
                                        htmlBuilder += "<td align=right nowrap><span class=c3>" + details.QTY_ADJUSTED + "</span></td>";
                                        htmlBuilder += "<td align=right nowrap><span class=c3>" + details.ON_HAND_QTY + "</span></td>";
                                        htmlBuilder += "<td align=left nowrap><span class=c3>" + details.DOWNLOAD_USERID + "</span></td>";
                                        if (details.REASON_CODE != null) {
                                            htmlBuilder += "<td align=left nowrap><span class=c3>" + details.REASON_CODE + "</span></td>";
                                        }
                                        htmlBuilder += "<td align=left nowrap><span class=c3>" + "" + "</span></td>";
                                        htmlBuilder += "</tr>";
                                    });
                                }
                                else {
                                    headers.DETAILS.forEach(function (details) {
                                        htmlBuilder += "<tr>";
                                        htmlBuilder += "<td align=left nowrap><span class=c3>" + details.DATE + "</span></td>";
                                        htmlBuilder += "<td align=left nowrap><span class=c3>" + details.TIME + "</span></td>";
                                        htmlBuilder += "<td align=left nowrap><span class=c3>" + details.EVENT_TYPE_DATA + "</span></td>";
                                        htmlBuilder += "<td align=left nowrap><span class=c3>" + details.ISSUE_UOM + "</span></td>";
                                        htmlBuilder += "<td align=right nowrap><span class=c3>" + details.QTY_ISSUED + "</span></td>";
                                        htmlBuilder += "<td align=right nowrap><span class=c3>" + details.QTY_RETPUTAWAY + "</span></td>";
                                        htmlBuilder += "<td align=right nowrap><span class=c3>" + details.QTY_ADJUSTED + "</span></td>";
                                        htmlBuilder += "<td align=right nowrap><span class=c3>" + details.ON_HAND_QTY + "</span></td>";
                                        htmlBuilder += "<td align=left nowrap><span class=c3>" + details.DOWNLOAD_USERID + "</span></td>";
                                        if (details.REASON_CODE != null) {
                                            htmlBuilder += "<td align=left nowrap><span class=c3>" + details.REASON_CODE + "</span></td>";
                                        }
                                        htmlBuilder += "<td align=left nowrap><span class=c3>" + "" + "</span></td>";
                                        htmlBuilder += "</tr>";
                                    });
                                }
                                htmlBuilder += "</table>";
                                htmlBuilder += "</td>";
                                htmlBuilder += "</tr>";
                            }
                        });
                        htmlBuilder += "</table></Table>";
                        return [2 /*return*/, htmlBuilder];
                    case 4:
                        ex_15 = _a.sent();
                        this.clientErrorMsg(ex_15, 'ExportReportDetails');
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when user close mail dailogbox
    * @param event
    */
    TransactionHistoryReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    TransactionHistoryReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    /**
     * This method is for clearing all the variables
     * @param event
     */
    TransactionHistoryReportComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstTransHistoryDetails = null;
        this.lstTransHistoryHeaders = null;
        this.lstCartIds = null;
        this.lstBUnits = null;
        this.lstDeptuserItems = null;
        this.lstFilteredCartIds = null;
        this.lstFilteredItemIds = null;
        this.lstOrgGroups = null;
    };
    TransactionHistoryReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-transaction-history-report.component.html',
            providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, pou_transaction_history_report_service_1.PouTransactionHistoryReportService]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            atpar_common_service_1.AtParCommonService,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            pou_transaction_history_report_service_1.PouTransactionHistoryReportService])
    ], TransactionHistoryReportComponent);
    return TransactionHistoryReportComponent;
}());
exports.TransactionHistoryReportComponent = TransactionHistoryReportComponent;
//# sourceMappingURL=pou-transaction-history-report.component.js.map