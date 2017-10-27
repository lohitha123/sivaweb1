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
var cart_optimization_report_service_1 = require("./cart-optimization-report.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var routepath_1 = require("../AtPar/Menus/routepath");
var router_1 = require("@angular/router");
var file_saver_1 = require("file-saver");
var OptimizationReportComponent = (function () {
    /**
    * Constructor
    * @param OptimizationReportService
    * @param AtParCommonService
    * @param httpService
    * @param spinnerService
    * @param AtParConstants
    */
    function OptimizationReportComponent(httpService, commonService, spinnerService, optimizationReportService, atParConstant, route) {
        this.httpService = httpService;
        this.commonService = commonService;
        this.spinnerService = spinnerService;
        this.optimizationReportService = optimizationReportService;
        this.atParConstant = atParConstant;
        this.route = route;
        /*Varaible Declaration*/
        this._strOrgGrpId = "";
        this.gstrProtocal = "";
        this.string = "";
        this.gstrPortNo = "";
        this.strParQty = "";
        this.strPrice = "";
        this.strRecomPar = "";
        this.lblBunitCart = "";
        this.gEditParUserParamval = "";
        this.orgGrpIDData = "";
        this.orgGrpId = "";
        this.orgGroupIDForDBUpdate = "";
        this.selectedOrgGroupId = "";
        this.lblCurrentval = "";
        this.strUserId = "";
        this.lblRecommendedVal = "";
        this.lblNetReductionVal = "";
        this.selectedCartId = "";
        this.selectedBunit = "";
        this.toMailAddr = '';
        this.lblFromDate = "";
        this.lblToDate = "";
        this.selectedDeptId = "";
        this.ipAddress = "";
        this.cartIdValue = "";
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupsDropdown = false;
        this.isVisible = false;
        this.isLblBunitVisible = false;
        this.tdExports = false;
        this.page = true;
        this.isMailDialog = false;
        this.blnsortbycolumn = false;
        this.isVisibleChkBox = false;
        this.isVisibletdExports = false;
        this.isLblVisible = false;
        this.isVisibleEdiTxt = false;
        this.isVisibleBtnUpdate = false;
        this.isVisibleRowFooter = false;
        this.showGrid = false;
        this.statusCode = -1;
        this.defDateRange = 0;
        this.selectcountFrequency = 0;
        this.selectedCouontFrequency = 0;
        this.countFrequency = 0;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstPreReqData = [];
        this.lstOrgGroups = [];
        this.lstBUnits = [];
        this.lstFilteredBUnits = [];
        this.lstCartIds = [];
        this.lstDBData = [];
        this.lstFilterData = [];
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.lstCountFrequency = [];
        this.lstCartHeader = [];
        this.lstCartDetails = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        this.bUnit = '';
        this.orgGroupId = '';
        this.cartId = '';
        this.frmAvgRpt = false;
        this.field = [];
        this.isItemidSort = false;
        try {
            this.spinnerService.start();
            this.breadCrumbMenu = new routepath_1.Menus();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        this.spinnerService.stop();
    }
    /**
    * Init Function for Populate orgGrpIds, Bunits to the dropdown when page loading and getMyPreferences,getProfileParamValue.
    */
    OptimizationReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, _a, _b, _c, dateStr, dateEnd, ex_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.page = true;
                        this.lstFilteredCartIds = new Array();
                        this.lstCartHeader = new Array();
                        this.lstCartDetails = new Array();
                        this.lstChkItemdetails = new Array();
                        this.dataCheckedSorting = new Array();
                        this.dataUncheckedSorting = new Array();
                        this.lstFilterData = new Array();
                        for (i = 1; i <= 7;) {
                            this.lstCountFrequency.push({ label: i.toString(), value: i.toString() });
                            i++;
                        }
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 9, 10, 11]);
                        this.spinnerService.start();
                        this.statusCode = -1;
                        this.strUserId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        _a = this;
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 2:
                        _a.statusCode = _d.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Internal Server Error' });
                            return [2 /*return*/];
                        }
                        _b = this;
                        return [4 /*yield*/, this.getProfileParamValue()];
                    case 3:
                        _b.statusCode = _d.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Internal Server Error' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 4:
                        _d.sent();
                        this.currentDate = new Date();
                        this.toDate = new Date();
                        this.fromDate = new Date();
                        if (!(this.defDateRange.toString() != '' && this.defDateRange != null)) return [3 /*break*/, 6];
                        _c = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, -this.defDateRange)];
                    case 5:
                        _c.fromDate = _d.sent();
                        _d.label = 6;
                    case 6:
                        this.route.queryParams.subscribe(function (params) {
                            _this.bUnit = decodeURI(params["p2value"]).replace(/%20/g, ' ');
                            _this.cartId = decodeURI(params["p3value"]).replace(/%20/g, ' ');
                            _this.orgGroupId = decodeURI(params["p4value"]).replace(/%20/g, ' ');
                            _this.frm_Date = params["p5value"];
                            _this.to_Date = params["p6value"];
                        });
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(JSON.parse(localStorage.getItem('bcMenu'))));
                        if (!(this.bUnit != null && this.bUnit != '' && this.bUnit != "undefined" && this.orgGroupId != null && this.orgGroupId != '' && this.orgGroupId != "undefined" && this.cartId != null && this.cartId != '' && this.cartId != "undefined" && this.frm_Date != null && this.frm_Date.toString() != '' && this.to_Date != null && this.to_Date.toString() != '')) return [3 /*break*/, 8];
                        this.frmAvgRpt = true;
                        this.selectedBunit = this.bUnit;
                        this.selectedCartId = this.cartId;
                        dateStr = new Date(this.frm_Date).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        dateEnd = new Date(this.to_Date).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        this.fromDate = new Date(dateStr);
                        this.toDate = new Date(dateEnd);
                        return [4 /*yield*/, this.bindDataGrid()];
                    case 7:
                        _d.sent();
                        _d.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        ex_1 = _d.sent();
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 11];
                    case 10:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /*
    * Storing data for sorting in two different  lists one for checked and another for Unchecked
    */
    OptimizationReportComponent.prototype.SortGridData = function () {
        var lstDBDataList;
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        for (var i = 0; i <= this.lstDBData.length - 1; i++) {
            if (this.lstDBData[i].CHK_UPDATED == 1) {
                this.dataCheckedSorting.push(this.lstDBData[i]);
            }
            else {
                this.dataUncheckedSorting.push(this.lstDBData[i]);
            }
        }
        this.isVisible = true;
        this.spinnerService.stop();
    };
    /**
    * This method is used for validating fields
    */
    OptimizationReportComponent.prototype.validateSearchFields = function () {
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
                else {
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
                    if ((this.selectedBunit == null || this.selectedBunit == undefined || this.selectedBunit == "" || this.selectedBunit == 'Select Bunit') &&
                        (this.selectedCartId == null || this.selectedCartId == undefined || this.selectedCartId == "") &&
                        (this.selectedDeptId == null || this.selectedDeptId == undefined || this.selectedDeptId == "")) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "BUnit and either CartID or DeptID is mandatory" });
                        return false;
                    }
                    else if ((this.selectedCartId == null || this.selectedCartId == undefined || this.selectedCartId == "") &&
                        (this.selectedDeptId == null || this.selectedDeptId == undefined || this.selectedDeptId == "")) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Cart ID/Par Location or Dept ID is Mandatory" });
                        return false;
                    }
                    else if ((this.selectedBunit == null || this.selectedBunit == undefined || this.selectedBunit == "")) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "BUnit is mandatory" });
                        return false;
                    }
                }
            }
            else {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
            return false;
        }
    };
    /**
   * This method is used for change date format to mm/dd/yyyy
   */
    OptimizationReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    OptimizationReportComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
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
                        this.clientErrorMsg(ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OptimizationReportComponent.prototype.populateBussinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        isOrgBUnitsExist = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstFilteredBUnits = [];
                        this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                    _this.growlMessage = [];
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
                                        _this.spinnerService.stop();
                                        isOrgBUnitsExist = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.isVisible = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.isVisible = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.isVisible = false;
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
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when user selecting  Ogrgrpid in  OrgGrpid dropdown and populate bunits for selecting OrggrpId
    */
    OptimizationReportComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.growlMessage = [];
                        this.spinnerService.start();
                        this.isVisible = false;
                        this.isLblVisible = false;
                        this.selectedDeptId = "";
                        this.selectedBunit = "";
                        this.isVisible = false;
                        this.tdExports = false;
                        this.isVisibleBtnUpdate = false;
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
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4);
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
    * This method is calling when user selecting  Bunit in  Bunit dropdown and getting cartIds for selecting Bunit
    */
    OptimizationReportComponent.prototype.ddl_ChangeBunitChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.isLblVisible = false;
                        this.selectedCartId = "";
                        this.isVisibleBtnUpdate = false;
                        if (this.selectedOrgGroupId != "Select One" && this.selectedOrgGroupId != "" && this.selectedBunit == "" && this.isVisible == true) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            this.isVisible = false;
                            this.tdExports = false;
                            return [2 /*return*/];
                        }
                        if (this.selectedBunit == "" && this.isVisible == true) {
                            this.isVisible = false;
                            this.tdExports = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        if (this.selectedBunit == "Select BUnit" || this.selectedBunit == "") {
                            this.isVisible = false;
                            this.tdExports = false;
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.optimizationReportService.getCartsForBunit(this.strUserId, this.selectedBunit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstFilteredCartIds = data.DataList;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.isVisible = false;
                                        _this.tdExports = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.isVisible = false;
                                        _this.tdExports = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.isVisible = false;
                                        _this.tdExports = false;
                                        if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.CRCT_E_ERPCOMPCREATION) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP interface access failed, may be this installation is for Par Management or it was not successful, please contact your manager/administrator" });
                                            _this.selectedCartId = "";
                                            break;
                                        }
                                        if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_REMOTEDBSELECTFAIL) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            _this.selectedCartId = "";
                                            break;
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5);
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
   * This method is used for adding days
   */
    OptimizationReportComponent.prototype.addDays = function (theDate, days) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)];
            });
        });
    };
    /**
   * This method is calling when click on Go button
   */
    OptimizationReportComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnValue, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.isVisible = false;
                        this.isVisibleBtnUpdate = false;
                        this.tdExports = false;
                        this.growlMessage = [];
                        this.spinnerService.start();
                        this.netTotalrecommendedVal = 0;
                        this.netTotalCurVal = 0;
                        this.netTotalreduction = 0;
                        returnValue = false;
                        if (this.selectedBunit == "Select Bunit" || this.selectedBunit == "" || this.selectedBunit == null) {
                            this.selectedBunit = "";
                        }
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
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OptimizationReportComponent.prototype.CountFreqChanged = function () {
        this.selectcountFrequency = this.selectedCouontFrequency;
    };
    /**
    * This method is calling when "Edit_Par"  profileParameter is checked
    */
    OptimizationReportComponent.prototype.EditModeEnable = function () {
        this.isVisibleChkBox = true;
        this.isVisibleEdiTxt = true;
        this.isVisibleBtnUpdate = true;
    };
    OptimizationReportComponent.prototype.bindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var currentValue, recommendedVal, netReductionValue, fromDate, toDate, cDate, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.strParQty = "";
                        this.strPrice = "";
                        this.strRecomPar = "";
                        this.growlMessage = [];
                        this.lblRecommendedVal = "";
                        this.lblNetReductionVal = "";
                        currentValue = 0;
                        recommendedVal = 0;
                        netReductionValue = 0;
                        fromDate = "";
                        toDate = "";
                        this.lblCurrentval = "";
                        this.cartIdValue = this.selectedCartId.split(" - ")[0];
                        cDate = new Date();
                        if (this.selectedCouontFrequency == undefined || this.selectcountFrequency == 0) {
                            this.selectcountFrequency = this.lstCountFrequency[0].value;
                        }
                        if (!this.frmAvgRpt) return [3 /*break*/, 3];
                        if (this.blnShowOrgGroupLabel == true) {
                            this._strOrgGrpId = this.orgGroupId;
                        }
                        else {
                            this._strOrgGrpId = this.orgGroupId;
                        }
                        cDate.setDate(this.toDate.getDate() + 1);
                        return [4 /*yield*/, this.convertDateFormate(this.fromDate)];
                    case 1:
                        fromDate = _a.sent();
                        return [4 /*yield*/, this.convertDateFormate(this.toDate)];
                    case 2:
                        toDate = _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        cDate.setDate(this.toDate.getDate() + 1);
                        return [4 /*yield*/, this.convertDateFormate(this.fromDate)];
                    case 4:
                        fromDate = _a.sent();
                        return [4 /*yield*/, this.convertDateFormate(this.toDate)];
                    case 5:
                        toDate = _a.sent();
                        if (this.blnShowOrgGroupLabel == true) {
                            this._strOrgGrpId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        }
                        else {
                            this._strOrgGrpId = this.selectedOrgGroupId;
                        }
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, 9, 10]);
                        return [4 /*yield*/, this.optimizationReportService.getCartOptimizationRep(this.selectedBunit, this.selectedDeptId, this.cartIdValue, fromDate, toDate, this._strOrgGrpId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], this.selectcountFrequency, this.strUserId)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstDBData = [];
                                        _this.lstCartHeader = data.DataDictionary["Carts"];
                                        _this.lstCartDetails = data.DataDictionary["CartDetails"];
                                        if (data.DataDictionary["CartDetails"].length > 0) {
                                            _this.isLblVisible = true;
                                            _this.lblFromDate = fromDate;
                                            _this.isVisibletdExports = true;
                                            _this.lblToDate = toDate;
                                            _this.isLblBunitVisible = true;
                                            _this.tdExports = true;
                                            _this.lblBunitCart = _this.selectedBunit + " - " + _this.selectedCartId.replace(" - ", " ");
                                            _this.isVisible = true;
                                            _this.isVisibleRowFooter = true;
                                            if ((_this.selectedDeptId == null || _this.selectedDeptId == undefined || _this.selectedDeptId == "") && _this.gEditParUserParamval == "Y") {
                                                _this.EditModeEnable();
                                            }
                                            for (var i = 0; i <= _this.lstCartDetails.length - 1; i++) {
                                                if (_this.lstCartDetails[i].PAR_QTY == null || _this.lstCartDetails[i].PAR_QTY == "") {
                                                    _this.strParQty = "0";
                                                }
                                                else {
                                                    _this.strParQty = _this.lstCartDetails[i].PAR_QTY;
                                                }
                                                if (_this.lstCartDetails[i].PRICE == null || _this.lstCartDetails[i].PRICE == "") {
                                                    _this.strPrice = "0";
                                                }
                                                else {
                                                    _this.strPrice = _this.lstCartDetails[i].PRICE;
                                                }
                                                if (_this.lstCartDetails[i].RECOMMENDED_PAR == null || _this.lstCartDetails[i].RECOMMENDED_PAR == "") {
                                                    _this.strRecomPar = "0";
                                                }
                                                else {
                                                    _this.strRecomPar = _this.lstCartDetails[i].RECOMMENDED_PAR;
                                                }
                                                currentValue = currentValue + (parseFloat(_this.strParQty) * parseFloat(_this.strPrice));
                                                recommendedVal = recommendedVal + (parseFloat(_this.strRecomPar) * parseFloat(_this.strPrice));
                                            }
                                            _this.lblCurrentval = currentValue.toFixed(2);
                                            _this.lblRecommendedVal = recommendedVal.toFixed(2);
                                            netReductionValue = currentValue - recommendedVal;
                                            _this.lblNetReductionVal = netReductionValue.toFixed(2);
                                            _this.lstDBData = _this.lstCartDetails;
                                            for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                                _this.lstDBData[i].Sno = i + 1;
                                                _this.lstDBData[i].RECOMMENDED_PAR_QTY = _this.lstDBData[i].RECOMMENDED_PAR;
                                            }
                                            _this.SortGridData();
                                            _this.blnsortbycolumn = false;
                                            _this.field = { field: "ITEM_ID", order: -1 };
                                            _this.isItemidSort = false;
                                            _this.customSort(_this.field);
                                            _this.isItemidSort = true;
                                            _this.blnsortbycolumn = false;
                                            if ((_this.selectedDeptId != null && _this.selectedDeptId != undefined && _this.selectedDeptId == "") && _this.gEditParUserParamval == "Y") {
                                                _this.isVisible = true;
                                                _this.isVisibleRowFooter = true;
                                                _this.isVisibleChkBox = true;
                                            }
                                            else {
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Custom: {
                                        if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.CRCT_E_CARTDOESNOTEXIST || _this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                            {
                                                _this.growlMessage = [];
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                                break;
                                            }
                                        }
                                    }
                                }
                            })];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7);
                        return [3 /*break*/, 10];
                    case 9:
                        this.frmAvgRpt = false;
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
   * This method is calling when user click on Update Button
   */
    OptimizationReportComponent.prototype.btnUpdate_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _tblCartDetails, i, dicDataItems, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _tblCartDetails = [];
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            this.lstDBData[i].NEW_OPTIMAL_QUANTITY = this.lstDBData[i].RECOMMENDED_PAR_QTY;
                            this.lstDBData[i].OPTIMAL_QUANTITY = this.lstDBData[i].PAR_QTY;
                            if ((this.lstDBData[i].CHK_UPDATED == 1)) {
                                if ((this.lstDBData[i].NEW_OPTIMAL_QUANTITY != null && this.lstDBData[i].NEW_OPTIMAL_QUANTITY != '' && this.lstDBData[i].NEW_OPTIMAL_QUANTITY != undefined) || this.lstDBData[i].NEW_OPTIMAL_QUANTITY == "0") {
                                    _tblCartDetails.push(this.lstDBData[i]);
                                }
                                else {
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Valid Par Values" });
                                    return [2 /*return*/];
                                }
                            }
                        }
                        this.lstCartHeader[0].USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        dicDataItems = { "HEADER": this.lstCartHeader, "DETAILS": _tblCartDetails, "PREREQDATA": this.lstPreReqData[0] = " " };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        return [4 /*yield*/, this.optimizationReportService.updateCartParAuditRep(dicDataItems, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate)
                                .catch(this.httpService.handleError).
                                then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                _this.spinnerService.stop();
                                _this.growlMessage = [];
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.isLblVisible = false;
                                    _this.selectedCartId = "";
                                    _this.selectedDeptId = "";
                                    _this.isVisibleBtnUpdate = false;
                                    _this.tdExports = false;
                                    _this.isVisible = false;
                                    _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully..." });
                                    return;
                                }
                                else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_REMOTEDBUPDATEFAIL) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    return;
                                }
                                else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_REMOTESUCCESSLOCALFAIL) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    return;
                                }
                                else {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    return;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8);
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when click on CheckAll Button in Datatable
    */
    OptimizationReportComponent.prototype.checkAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.spinnerService.start();
                    this.lstChkItemdetails = [];
                    if (this.lstFilterData != null && this.lstFilterData != undefined && this.lstFilterData.length != 0) {
                        for (i = 0; i <= this.lstFilterData.length - 1; i++) {
                            this.lstFilterData[i].checkvalue = true;
                            this.lstFilterData[i].CHK_UPDATED = 1;
                            this.lstChkItemdetails.push(this.lstFilterData[i]);
                        }
                    }
                    else {
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            this.lstDBData[i].checkvalue = true;
                            this.lstDBData[i].CHK_UPDATED = 1;
                            this.lstChkItemdetails.push(this.lstDBData[i]);
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                finally {
                    this.spinnerService.stop();
                }
                return [2 /*return*/];
            });
        });
    };
    /**
   * This method is calling when click on UnCheckAll Button in Datatable
   */
    OptimizationReportComponent.prototype.unCheckAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.spinnerService.start();
                    this.lstChkItemdetails = [];
                    if (this.lstFilterData != null && this.lstFilterData != undefined && this.lstFilterData.length != 0) {
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            this.lstFilterData[i].checkvalue = false;
                            this.lstFilterData[i].CHK_UPDATED = 0;
                            this.lstChkItemdetails.push(this.lstFilterData[i]);
                        }
                    }
                    else {
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            this.lstDBData[i].checkvalue = false;
                            this.lstDBData[i].CHK_UPDATED = 0;
                            this.lstChkItemdetails.push(this.lstDBData[i]);
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                finally {
                    this.spinnerService.stop();
                }
                return [2 /*return*/];
            });
        });
    };
    OptimizationReportComponent.prototype.onChargesFilterData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.lstFilterData = data;
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    /*
    * This method is calling when we selecting particular record in DataTable and getting selected record data
    */
    OptimizationReportComponent.prototype.selectedRow = function (values, event) {
        try {
            this.growlMessage = [];
            if (event == true) {
                values.checkvalue = true;
                values.CHK_UPDATED = 1;
            }
            else {
                values.checkvalue = false;
                values.CHK_UPDATED = 0;
            }
            for (var i = 0; i < this.lstChkItemdetails.length; i++) {
                if (this.lstChkItemdetails[i].ITEM_ID === values.ITEM_ID) {
                    var index = this.lstChkItemdetails.indexOf(this.lstChkItemdetails[i], 0);
                    this.lstChkItemdetails.splice(index, 1);
                }
            }
            this.lstChkItemdetails.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    OptimizationReportComponent.prototype.fillCartIdsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.spinnerService.start();
                        this.lstFilteredCartIds = [];
                        if ((this.blnShowOrgGroupLabel == true) && ((this.selectedBunit == 'Select Bunit' || this.selectedBunit == undefined || this.selectedBunit == ""))) {
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        if ((this.blnShowOrgGroupsDropdown == true) && ((this.selectedBunit == 'Select Bunit' || this.selectedBunit == undefined || this.selectedBunit == "") || (this.selectedOrgGroupId == 'Select One' || this.selectedOrgGroupId == "" || this.selectedOrgGroupId == undefined))) {
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.optimizationReportService.getCartsForBunit(this.strUserId, this.selectedBunit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstCartIds = data.DataList;
                                        _this.lstFilteredCartIds = _this.filterCartIds(query, _this.lstCartIds);
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        _this.isVisible = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.CRCT_E_ERPCOMPCREATION) {
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP interface access failed, may be this installation is for Par Management or it was not successful, please contact your manager/administrator" });
                                            _this.selectedCartId = "";
                                            break;
                                        }
                                        if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_REMOTEDBSELECTFAIL) {
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            _this.selectedCartId = "";
                                            break;
                                        }
                                        else {
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9);
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OptimizationReportComponent.prototype.filterCartIds = function (query, CartIds) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < CartIds.length; i++) {
                var CartIdValue = CartIds[i].CART_ID + " - " + CartIds[i].DESCR;
                filtered.push(CartIdValue);
            }
        }
        else {
            if (query.length >= 1) {
                for (var i = 0; i < CartIds.length; i++) {
                    var CartIdValue = CartIds[i].CART_ID + " - " + CartIds[i].DESCR;
                    if (CartIdValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(CartIdValue);
                    }
                }
            }
        }
        return filtered;
    };
    /*
    * This method is for sorting the data  based on seleted column in DataTable
    */
    OptimizationReportComponent.prototype.customSort = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                element = event;
                this.lstDBData = [];
                if (event.field == "ITEM_ID" && this.isItemidSort == true) {
                    this.blnsortbycolumn = false;
                    this.isItemidSort = false;
                }
                else {
                    this.blnsortbycolumn = !this.blnsortbycolumn;
                }
                this.sortedcheckedrec = [];
                this.sorteduncheckedrec = [];
                this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                    if (a[element.field] < b[element.field])
                        return -1;
                    if (a[element.field] > b[element.field])
                        return 1;
                    return 0;
                });
                this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                    if (a[element.field] < b[element.field])
                        return -1;
                    if (a[element.field] > b[element.field])
                        return 1;
                    return 0;
                });
                if (this.blnsortbycolumn == false) {
                    this.lstDBData = [];
                    this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
                }
                else {
                    this.lstDBData = [];
                    this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
                }
                this.sortedcheckedrec = [];
                this.sorteduncheckedrec = [];
                return [2 /*return*/];
            });
        });
    };
    OptimizationReportComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.defDateRange = parseInt(data.DataVariable.toString());
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_10 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 3: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    OptimizationReportComponent.prototype.getProfileParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.getProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], AtParEnums_1.EnumApps.CartCount, 'EDIT_PAR')
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    if (data.DataVariable != null) {
                                        _this.gEditParUserParamval = data.DataVariable.toString();
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_11 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 3: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    /**
    * This method is calling when user click on Mail Icon.
    * @param event
    */
    OptimizationReportComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.isMailDialog = true;
                    this.toMailAddr = '';
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
    * This method is calling when user userclick on submit button after enter mailid.
    * @param event
    */
    OptimizationReportComponent.prototype.onSendMailClick = function (event) {
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
                        return [4 /*yield*/, this.commonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Cart Optimization Report', JSON.stringify(html), this.toMailAddr, AtParEnums_1.MailPriority.Normal.toString(), '')
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
                        this.clientErrorMsg(ex_12);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OptimizationReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    /**
    * This method is calling when user click on print Icon.
    * @param event
    */
    OptimizationReportComponent.prototype.onPrintClick = function (event) {
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
                                mywindow.document.write('<html><head><title>' + 'CartCount - Cart Optimization Report' + '</title>');
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
                        this.clientErrorMsg(ex_13);
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
     * This method is calling when user click on Excel Icon.
     * @param event
     */
    OptimizationReportComponent.prototype.onExportToExcelClick = function (event) {
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
                            file_saver_1.saveAs(blob, "cart_optimization_report.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_14 = _a.sent();
                        this.clientErrorMsg(ex_14);
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
     * This method is for export  datatable data in different formats.
     * @param event
     */
    OptimizationReportComponent.prototype.ExportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, _DS, imgserverPath, title, ex_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        _DS = [];
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
                            htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Cart Optimization Report between <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else if (reqType == 'Excel') {
                            htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Cart Optimization Report between <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;";
                        }
                        else {
                            htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Cart Optimization Report between <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2>"
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=left nowrap colspan= 13> <span class=c3> <b>" + this.lblBunitCart + "</b></span></td>"
                            + "</tr>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center  nowrap><span class=c3><b>Item ID</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Custom Item NO</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Description</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Compartment</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Price($)</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Par Qty</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>UOM</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Max Usage</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Min Usage</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Avg Usage</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Total Usage</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Order Quantity</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Reco. par / day * count freq.</b></span></td>"
                            + "</tr>";
                        return [4 /*yield*/, this.lstDBData.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_ID + "&nbsp;</td>";
                                if (header.CUST_ITEM_ID != "" && header.CUST_ITEM_ID != null) {
                                    htmlBuilder += "<td align= left nowrap> <span class=c2>" + "'" + header.CUST_ITEM_ID + "</span></td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + "" + "&nbsp;</td>";
                                }
                                htmlBuilder += "<td bgcolor=#ffffff >&nbsp;" + header.DESCR + "&nbsp;</td>";
                                if (header.COMPARTMENT.trim() != "" && header.COMPARTMENT.trim() != null) {
                                    htmlBuilder += "<td align= left nowrap> <span class=c2>" + "'" + header.COMPARTMENT + "</span></td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + "" + "&nbsp;</td>";
                                }
                                htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PRICE + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PAR_QTY + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.UOM + "&nbsp;</td>"
                                    + "<td align=right bgcolor=#ffffff nowrap>&nbsp;" + header.MAX_USAGE + "&nbsp;</td>"
                                    + "<td align=right bgcolor=#ffffff nowrap>&nbsp;" + header.MIN_USAGE + "&nbsp;</td>"
                                    + "<td align=right bgcolor=#ffffff nowrap>&nbsp;" + header.AVG_USAGE + "&nbsp;</td>"
                                    + "<td align=right bgcolor=#ffffff nowrap>&nbsp;" + header.TOTAL_USAGE + "&nbsp;</td>"
                                    + "<td align=right bgcolor=#ffffff nowrap>&nbsp;" + header.OrderQty + "&nbsp;</td>"
                                    + "<td  align=right bgcolor=#ffffff nowrap>&nbsp;" + header.RECOMMENDED_PAR + "&nbsp;</td>"
                                    + "</tr>";
                            })];
                    case 4:
                        _a.sent();
                        htmlBuilder += "<tr>"
                            + "<td align=left nowrap><span class=c3>" + "Current Value($)" + "&nbsp;</td>"
                            + "<td align=left nowrap><span class=c3>" + this.lblCurrentval + "&nbsp;</td>"
                            + "<td align=left nowrap><span class=c3></span></td>"
                            + "<td align=left nowrap><span class=c3>" + "Recommended Value($)" + "</td>"
                            + "<td align=left nowrap><span class=c3>" + this.lblRecommendedVal + "&nbsp;</td>"
                            + "<td align=left nowrap><span class=c3></span></td>"
                            + "<td align=left nowrap><span class=c3></span></td>"
                            + "<td align=left nowrap><span class=c3>" + "Net reduction($)" + "&nbsp;</td>"
                            + "<td align=left nowrap><span class=c3>" + this.lblNetReductionVal + "&nbsp;</td>"
                            + "<td align=left nowrap><span class=c3></span></td>"
                            + "<td align=left nowrap><span class=c3></span></td>"
                            + "<td align=left nowrap><span class=c3></span></td>"
                            + "<td align=left nowrap><span class=c3></span></td>"
                            + "</tr>";
                        htmlBuilder += "</table></Table>";
                        return [2 /*return*/, htmlBuilder];
                    case 5:
                        ex_15 = _a.sent();
                        this.clientErrorMsg(ex_15);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method is calling when user close mail dailogbox.
     * @param event
     */
    OptimizationReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    OptimizationReportComponent.prototype.clientErrorMsg = function (ex) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString());
    };
    /**
    * This method is for clearing all the variables
    * @param event
    */
    OptimizationReportComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstOrgGroups = null;
        this.lstBUnits = null;
        this.lstFilteredBUnits = null;
        this.lstDBData = null;
        this.orgGroupData = null;
        this.growlMessage = null;
        this.lstCartIds = null;
        this.lstFilteredCartIds = null;
        this.cartIdValue = null;
        this.lstCartDetails = null;
        this.lstCartHeader = null;
        this.lblBunitCart = null;
        this.lstChkItemdetails = null;
        this.lstCountFrequency = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        this.lstPreReqData = [];
        this.field = [];
    };
    OptimizationReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'cart-optimization-report.component.html',
            providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, cart_optimization_report_service_1.OptimizationReportService]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            atpar_common_service_1.AtParCommonService,
            event_spinner_service_1.SpinnerService,
            cart_optimization_report_service_1.OptimizationReportService,
            AtParConstants_1.AtParConstants,
            router_1.ActivatedRoute])
    ], OptimizationReportComponent);
    return OptimizationReportComponent;
}());
exports.OptimizationReportComponent = OptimizationReportComponent;
//# sourceMappingURL=cart-optimization-report.component.js.map