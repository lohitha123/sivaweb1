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
var VM_PAR_OPTIMIZATION_DETAILS_1 = require("../Entities/VM_PAR_OPTIMIZATION_DETAILS");
var routepath_1 = require("../AtPar/Menus/routepath");
var pou_par_optimization_report_service_1 = require("./pou-par-optimization-report.service");
var file_saver_1 = require("file-saver");
var ParOptimizationReportComponent = (function () {
    /**
    * Constructor
    * @param ParOptimizationReportService
    * @param AtParCommonService
    * @param httpService
    * @param spinnerService
    * @param AtParConstants
    */
    function ParOptimizationReportComponent(httpService, commonService, spinnerService, atParConstant, parOptimizationReportService) {
        this.httpService = httpService;
        this.commonService = commonService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.parOptimizationReportService = parOptimizationReportService;
        this.isVisible = false;
        this.selectedPercentage = "";
        this.gEditParUserParamval = "";
        this.selectedCartId = "";
        this.selectedBunit = "";
        this.gstrProtocal = "";
        this.string = "";
        this.gstrPortNo = "";
        this.strParQty = "";
        this.strPrice = "";
        this.ipAddress = "";
        this.toMailAddr = '';
        this.selectedDeptId = "";
        this.lblCurrentval = "";
        this.lblRecommendedVal = "";
        this.lblNetReductionVal = "";
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
        this.isLblVisible = false;
        this.isVisibleEdiTxt = false;
        this.isVisibleBtnUpdate = false;
        this.isVisibleRowFooter = false;
        this.bunitsData = [];
        this.lstBunits = [];
        this.deviceTokenEntry = [];
        this.lstCartHeader = [];
        this._tblCartDetails = [];
        this.dicDataItems = [];
        this.lstPreReqData = [];
        this.growlMessage = [];
        this.lstDBData = [];
        this.lstCheckdata = [];
        this.lstFilterData = [];
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.lstCartDetails = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
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
    * Init Function for Populate Bunits to the dropdown when page loading and getMyPreferences,getProfileParamValue.
    */
    ParOptimizationReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, ex_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.strUserId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        this.page = true;
                        this.lstCartDetails = new Array();
                        this.lstChkItemdetails = new Array();
                        this.dataCheckedSorting = new Array();
                        this.dataUncheckedSorting = new Array();
                        this.lstFilterData = new Array();
                        this.lstCartHeader = new Array();
                        this.headers = new VM_PAR_OPTIMIZATION_DETAILS_1.VM_PAR_OPTIMIZATION_DETAILS();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 7, 8, 9]);
                        this.spinnerService.start();
                        this.statusCode = -1;
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
                        this.lstBunits.push({ label: "Select Bunit", value: "" });
                        return [4 /*yield*/, this.populateBussinessUnits()];
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
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        ex_1 = _d.sent();
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 9];
                    case 8:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /*
    * Storing data for sorting in two different  lists one for checked and another for Unchecked
    */
    ParOptimizationReportComponent.prototype.SortGridData = function () {
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
    * This method is calling when user selecting  Bunit in  Bunit dropdown
    */
    ParOptimizationReportComponent.prototype.ddlBUnitChanged = function () {
        this.growlMessage = [];
    };
    /**
    * This method is used for validating fields
    */
    ParOptimizationReportComponent.prototype.validateSearchFields = function () {
        try {
            this.growlMessage = [];
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (this.selectedBunit == "Select Bunit" || this.selectedBunit == "") {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                    this.isVisible = false;
                    this.tdExports = false;
                    this.isLblVisible = false;
                    return false;
                }
                if (Date.parse(this.convertDateFormate(this.toDate)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
                if (Date.parse(this.convertDateFormate(this.fromDate)) > Date.parse(this.convertDateFormate(this.toDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date must be less than or equal to To Date" });
                    return false;
                }
                else {
                    if (this.selectedCartId == "" && this.selectedDeptId == "") {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "DeptID or Par Location is mandatory" });
                        this.isVisible = false;
                        this.tdExports = false;
                        this.isLblVisible = false;
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
    ParOptimizationReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    ParOptimizationReportComponent.prototype.populateBussinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.bunit = AtParEnums_1.BusinessType.Inventory;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.getBusinessUnits(this.strUserId, this.bunit).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                                    _this.isVisible = false;
                                    return;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.bunitsData = data.DataList;
                                        _this.lstBunits = [];
                                        _this.lstBunits.push({ label: "Select Bunit", value: "" });
                                        for (var i = 0; i <= _this.bunitsData.length - 1; i++) {
                                            _this.lstBunits.push({ label: _this.bunitsData[i], value: _this.bunitsData[i] });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.isVisible = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Assigned Org Business Units" });
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
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is used for adding days
    */
    ParOptimizationReportComponent.prototype.addDays = function (theDate, days) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)];
            });
        });
    };
    /**
    * This method is calling when click on Go button
    */
    ParOptimizationReportComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentValue, recommendedVal, netReductionValue, returnValue, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.isVisible = false;
                        this.growlMessage = [];
                        this.isVisibleBtnUpdate = false;
                        this.spinnerService.start();
                        currentValue = 0;
                        recommendedVal = 0;
                        netReductionValue = 0;
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
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3);
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
    * This method is calling when "Edit_Par"  profileParameter is checked
    */
    ParOptimizationReportComponent.prototype.EditModeEnable = function () {
        this.isVisibleChkBox = true;
        this.isVisibleEdiTxt = true;
        this.isVisibleBtnUpdate = true;
    };
    ParOptimizationReportComponent.prototype.bindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var currentValue, recommendedVal, netReductionValue, deptData, cDate, fromDate, toDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.strParQty = "";
                        this.strPrice = "";
                        this.lblRecommendedVal = "";
                        this.lblNetReductionVal = "";
                        this.lblCurrentval = "";
                        currentValue = 0;
                        recommendedVal = 0;
                        netReductionValue = 0;
                        this.cartIdValue = this.selectedCartId.split(" - ")[0];
                        cDate = new Date();
                        cDate.setDate(this.toDate.getDate() + 1);
                        return [4 /*yield*/, this.convertDateFormate(this.fromDate)];
                    case 1:
                        fromDate = _a.sent();
                        return [4 /*yield*/, this.convertDateFormate(cDate)];
                    case 2:
                        toDate = _a.sent();
                        return [4 /*yield*/, this.commonService.getUserDepartments(this.strUserId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.deviceTokenEntry)
                                .catch(this.httpService.handleError).
                                then(function (res) {
                                var data = res.json();
                                deptData = data.DataList;
                                _this.statusCode1 = data.StatusCode;
                            })];
                    case 3:
                        _a.sent();
                        if (!(this.statusCode1 == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK)) return [3 /*break*/, 7];
                        if (!(deptData.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.parOptimizationReportService.getOptimizationReport(this.selectedBunit, this.selectedDeptId, this.cartIdValue, fromDate, toDate, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], AtParEnums_1.EnumApps.PointOfUse)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstDBData = [];
                                        _this.lstCartDetails = data.DataList;
                                        if (_this.lstCartDetails.length > 0) {
                                            _this.tdExports = true;
                                            _this.isVisible = true;
                                            _this.isVisibleRowFooter = true;
                                            _this.isLblVisible = true;
                                            _this.lblNoofRecords = _this.lstCartDetails.length;
                                            for (var i = 0; i <= data.DataList.length - 1; i++) {
                                                _this.lstCartDetails[i].AVGUSAGE = parseFloat(data.DataList[i].AVGUSAGE).toFixed(2);
                                                _this.lstCartDetails[i].MINUSAGE = parseFloat(data.DataList[i].MINUSAGE).toFixed(2);
                                                _this.lstCartDetails[i].TOTUSAGE = parseFloat(data.DataList[i].TOTUSAGE).toFixed(2);
                                                _this.lstCartDetails[i].PAR_VALUE = parseFloat(data.DataList[i].PAR_VALUE).toFixed(2);
                                                _this.lstCartDetails[i].MAXUSAGE = parseFloat(data.DataList[i].MAXUSAGE).toFixed(2);
                                            }
                                            if (_this.noOfRecords == 0) {
                                                _this.recordsPerPage = _this.lstCartDetails.length;
                                            }
                                            else {
                                                _this.recordsPerPage = _this.noOfRecords;
                                            }
                                            if (_this.gEditParUserParamval == "Y") {
                                                _this.EditModeEnable();
                                            }
                                            for (var i = 0; i <= _this.lstCartDetails.length - 1; i++) {
                                                if (_this.lstCartDetails[i].PRICE != null || _this.lstCartDetails[i].PRICE != "") {
                                                    currentValue = currentValue + (parseFloat(_this.lstCartDetails[i].PAR_VALUE)) * (parseFloat(_this.lstCartDetails[i].PRICE));
                                                    recommendedVal = recommendedVal + (parseFloat(_this.lstCartDetails[i].RECOMMENDED_PAR)) * (parseFloat(_this.lstCartDetails[i].PRICE));
                                                }
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
                                        }
                                        else {
                                            _this.growlMessage = [];
                                            _this.isVisible = false;
                                            _this.isVisibleBtnUpdate = false;
                                            _this.tdExports = false;
                                            _this.isLblVisible = false;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: "No Data Found" });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.growlMessage = [];
                                            _this.isVisible = false;
                                            _this.isVisibleBtnUpdate = false;
                                            _this.tdExports = false;
                                            _this.isLblVisible = false;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: "No records were returned for the search criteria" });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.isVisible = false;
                                        _this.tdExports = false;
                                        _this.isLblVisible = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.isVisible = false;
                                        _this.tdExports = false;
                                        _this.isLblVisible = false;
                                        if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL) {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                        else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.CRCT_E_CARTDOESNOTEXIST) {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: "No records were returned for the search criteria" });
                                            break;
                                        }
                                        else {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                }
                            })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        this.isVisibleBtnUpdate = false;
                        this.tdExports = false;
                        this.isLblVisible = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: 'No department allocated to the user' });
                        return [2 /*return*/];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        if (this.statusCode1 == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Departments found" });
                            return [2 /*return*/];
                        }
                        else {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Error while getting Departments" });
                            return [2 /*return*/];
                        }
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when user click on Update Button
    */
    ParOptimizationReportComponent.prototype.btnUpdate_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cartId, dicDataItems, lstChkChecked, lstChkQty, i, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.strPrevCartID = "";
                        this.lstCheckdata = [];
                        this.lstCartHeader = [];
                        this._tblCartDetails = [];
                        this.lstPreReqData = [];
                        this.headers = new VM_PAR_OPTIMIZATION_DETAILS_1.VM_PAR_OPTIMIZATION_DETAILS();
                        if (this.selectedBunit == "Select Bunit" || this.selectedBunit == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        dicDataItems = { "HEADER": this.lstCartHeader, "DETAILS": this._tblCartDetails, "PREREQDATA": this.lstPreReqData[0] = " " };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 10, 11, 12]);
                        this.spinnerService.start();
                        lstChkChecked = this.lstDBData.filter(function (data) { return (data.CHK_UPDATED == 1); });
                        if (lstChkChecked.length <= 0) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select atleast one item to update" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        lstChkQty = lstChkChecked.filter(function (data) { return data.RECOMMENDED_PAR_QTY === ""; });
                        if (lstChkQty.length > 0) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid par values" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i <= this.lstDBData.length - 1)) return [3 /*break*/, 7];
                        if (!(this.lstDBData[i].CHK_UPDATED == 1)) return [3 /*break*/, 6];
                        this.lstDBData[i].CART_ID = this.lstCartDetails[i].CART_ID;
                        this.lstDBData[i].LOCATION_TYPE = this.lstCartDetails[i].LOCATION_TYPE;
                        if (!(this.strPrevCartID != this.lstDBData[i].CART_ID)) return [3 /*break*/, 5];
                        if (!(dicDataItems.HEADER.length > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.update_ParQty(dicDataItems)];
                    case 3:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: "Internal Server Error" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        dicDataItems.HEADER = [];
                        dicDataItems.DETAILS = [];
                        _a.label = 4;
                    case 4:
                        this.headers.CART_ID = this.lstDBData[i].CART_ID;
                        this.headers.BUSINESS_UNIT = this.selectedBunit;
                        this.headers.USER_ID = this.strUserId;
                        dicDataItems.HEADER.push(this.headers);
                        _a.label = 5;
                    case 5:
                        this.lstDBData[i].NEW_OPTIMAL_QUANTITY = this.lstDBData[i].RECOMMENDED_PAR_QTY;
                        this.lstDBData[i].OPTIMAL_QUANTITY = this.lstDBData[i].PAR_VALUE;
                        this._tblCartDetails.push(this.lstDBData[i]);
                        this.strPrevCartID = this.lstDBData[i].CART_ID;
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 2];
                    case 7:
                        if (!(dicDataItems != null)) return [3 /*break*/, 9];
                        if (!(dicDataItems.DETAILS.length > 0)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.update_ParQty(dicDataItems)];
                    case 8:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: "Internal Server Error" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        _a.label = 9;
                    case 9:
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.isLblVisible = false;
                            this.isVisibleBtnUpdate = false;
                            this.tdExports = false;
                            this.isVisible = false;
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully..." });
                            return [2 /*return*/];
                        }
                        else {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: "Internal server Error" });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 12];
                    case 10:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4);
                        return [3 /*break*/, 12];
                    case 11:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    ParOptimizationReportComponent.prototype.update_ParQty = function (dicDataItems) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.parOptimizationReportService.UpdateParQty(dicDataItems, AtParEnums_1.EnumApps.PointOfUse)
                                .catch(this.httpService.handleError).
                                then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when click on CheckAll Button in Datatable
    */
    ParOptimizationReportComponent.prototype.checkAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                try {
                    this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                    this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                    this.growlMessage = [];
                    this.spinnerService.start();
                    this.lstChkItemdetails = [];
                    if (this.lstFilterData != null && this.lstFilterData != undefined && this.lstFilterData.length != 0) {
                        if (this.EndIndex > this.lstFilterData.length) {
                            this.EndIndex = this.lstFilterData.length;
                        }
                        for (i = this.startIndex; i <= this.EndIndex - 1; i++) {
                            this.lstFilterData[i].checkvalue = true;
                            this.lstFilterData[i].CHK_UPDATED = 1;
                            this.lstChkItemdetails.push(this.lstFilterData[i]);
                        }
                    }
                    else {
                        if (this.EndIndex > this.lstDBData.length) {
                            this.EndIndex = this.lstDBData.length;
                        }
                        for (i = this.startIndex; i <= this.EndIndex - 1; i++) {
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
    ParOptimizationReportComponent.prototype.unCheckAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.spinnerService.start();
                    this.lstChkItemdetails = [];
                    this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                    this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                    if (this.lstFilterData != null && this.lstFilterData != undefined && this.lstFilterData.length != 0) {
                        if (this.EndIndex > this.lstFilterData.length) {
                            this.EndIndex = this.lstFilterData.length;
                        }
                        for (i = this.EndIndex - 1; i >= this.startIndex; i--) {
                            this.lstFilterData[i].checkvalue = false;
                            this.lstFilterData[i].CHK_UPDATED = 0;
                            this.lstChkItemdetails.push(this.lstFilterData[i]);
                        }
                    }
                    else {
                        if (this.EndIndex > this.lstDBData.length) {
                            this.EndIndex = this.lstDBData.length;
                        }
                        for (i = this.EndIndex - 1; i >= this.startIndex; i--) {
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
    ParOptimizationReportComponent.prototype.onChargesFilterData = function (data) {
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
    ParOptimizationReportComponent.prototype.selectedRow = function (values, event) {
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
                if (this.lstChkItemdetails[i].ITEM_ID === values.ITEM_ID && this.lstChkItemdetails[i].CART_ID == values.CART_ID) {
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
    /*
    * This method is for sorting the data  based on seleted column in DataTable
    */
    ParOptimizationReportComponent.prototype.customSort = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                element = event;
                this.lstDBData = [];
                this.blnsortbycolumn = !this.blnsortbycolumn;
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
    ParOptimizationReportComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6, ex_7, ex_8;
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
                        ex_6 = _a.sent();
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
                        ex_7 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        ex_8 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 9: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    ParOptimizationReportComponent.prototype.getProfileParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.getProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], AtParEnums_1.EnumApps.PointOfUse, 'EDIT_PAR')
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.gEditParUserParamval = data.DataVariable.toString();
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_9 = _a.sent();
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
    ParOptimizationReportComponent.prototype.onSendMailIconClick = function (event) {
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
    ParOptimizationReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_10;
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
                        return [4 /*yield*/, this.commonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Pou Par Optimization Report', JSON.stringify(html), this.toMailAddr, AtParEnums_1.MailPriority.Normal.toString(), '')
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
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ParOptimizationReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    /**
     * This method is calling when user click on print Icon.
     * @param event
     */
    ParOptimizationReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_11;
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
                                mywindow.document.write('<html><head><title>' + 'PointOfUse - Par Optomization Report' + '</title>');
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
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11);
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
    ParOptimizationReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_12;
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
                            file_saver_1.saveAs(blob, "pou_par_optimization_report.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12);
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
    ParOptimizationReportComponent.prototype.ExportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, _DS, imgserverPath, title, ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
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
                            htmlBuilder += "<tr width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Item Par Optimization Report between <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else if (reqType == 'Excel') {
                            htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Item Par Optimization Report <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;";
                        }
                        else {
                            htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Item Par Optimization Report <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center  nowrap><span class=c3><b>Par Location</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Item ID</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Item Description</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Compartment</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Price($)</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>UOM</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Par Value</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Max Usage</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Min Usage</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Avg Usage</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Total Usage</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Total Order Quantity</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>% Change</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Recommended Par</b></span></td>"
                            + "</tr>";
                        if (!(this.lstDBData != null)) return [3 /*break*/, 7];
                        if (!(reqType == 'Excel')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.lstDBData.forEach(function (header) {
                                htmlBuilder += "<tr>";
                                if (header.CART_ID == null && header.CART_ID == "") {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + +"&nbsp;</td>";
                                }
                                htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CART_ID + "&nbsp;</td>"
                                    + "<td align= left nowrap> <span class=c2>" + "'" + header.ITEM_ID + "</span></td>"
                                    + "<td bgcolor=#ffffff align= left >&nbsp;" + header.DESCR + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff align= left nowrap>&nbsp;" + header.COMPARTMENT + "&nbsp;</td>"
                                    + "<td align= right nowrap> <span class=c2>" + "'" + header.PRICE + "</span></td>"
                                    + "<td bgcolor=#ffffff align= left nowrap>&nbsp;" + header.UOM + "&nbsp;</td>"
                                    + "<td align= right nowrap> <span class=c2>" + "'" + header.PAR_VALUE + "</span></td>"
                                    + "<td align= right nowrap> <span class=c2>" + "'" + header.MAXUSAGE + "</span></td>"
                                    + "<td align= right nowrap> <span class=c2>" + "'" + header.MINUSAGE + "</span></td>"
                                    + "<td align= right nowrap> <span class=c2>" + "'" + header.AVGUSAGE + "</span></td>"
                                    + "<td align= right nowrap> <span class=c2>" + "'" + header.TOTUSAGE + "</span></td>"
                                    + "<td bgcolor=#ffffff align= right  nowrap>&nbsp;" + header.ORDER_QTY + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff align= right nowrap>&nbsp;" + header.PAR_VARIATION + "&nbsp;</td>"
                                    + "<td align= right nowrap> <span class=c2>" + "'" + header.RECOMMENDED_PAR + "</span></td>"
                                    + "</tr>";
                            })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.lstDBData.forEach(function (header) {
                            htmlBuilder += "<tr>";
                            if (header.CART_ID == null && header.CART_ID == "") {
                                htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + +"&nbsp;</td>";
                            }
                            htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CART_ID + "&nbsp;</td>"
                                + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_ID + "&nbsp;</td>"
                                + "<td bgcolor=#ffffff >&nbsp;" + header.DESCR + "&nbsp;</td>"
                                + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.COMPARTMENT + "&nbsp;</td>"
                                + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PRICE + "&nbsp;</td>"
                                + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.UOM + "&nbsp;</td>"
                                + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PAR_VALUE + "&nbsp;</td>"
                                + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.MAXUSAGE + "&nbsp;</td>"
                                + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.MINUSAGE + "&nbsp;</td>"
                                + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.AVGUSAGE + "&nbsp;</td>"
                                + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.TOTUSAGE + "&nbsp;</td>"
                                + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ORDER_QTY + "&nbsp;</td>"
                                + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PAR_VARIATION + "&nbsp;</td>"
                                + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECOMMENDED_PAR + "&nbsp;</td>"
                                + "</tr>";
                        })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
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
                    case 8:
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method is calling when user close mail dailogbox.
     * @param event
     */
    ParOptimizationReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    ParOptimizationReportComponent.prototype.clientErrorMsg = function (ex) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString());
    };
    /**
     * This method is for clearing all the variables
     * @param event
     */
    ParOptimizationReportComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstBunits = null;
        this.lstDBData = null;
        this.bunitsData = null;
        this.growlMessage = null;
        this.cartIdValue = null;
        this.lstCartDetails = null;
        this.lstCartHeader = null;
        this.lstChkItemdetails = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        this.lstPreReqData = [];
        this.headers = null;
        this.lstCartHeader = null;
        this.lstCheckdata = null;
        this.lstFilterData = null;
    };
    ParOptimizationReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-par-optimization-report.component.html',
            providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, pou_par_optimization_report_service_1.ParOptimizationReportService]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            atpar_common_service_1.AtParCommonService,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            pou_par_optimization_report_service_1.ParOptimizationReportService])
    ], ParOptimizationReportComponent);
    return ParOptimizationReportComponent;
}());
exports.ParOptimizationReportComponent = ParOptimizationReportComponent;
//# sourceMappingURL=pou-par-optimization-report.component.js.map