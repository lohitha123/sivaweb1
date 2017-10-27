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
var VM_MT_POU_CONSIGNEDBILLONLY_HEADERS_1 = require("../../app/Entities/VM_MT_POU_CONSIGNEDBILLONLY_HEADERS");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var pou_manage_cosigned_item_order_report_service_1 = require("./pou-manage-cosigned-item-order-report.service");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var linq_es5_1 = require("linq-es5");
var api_1 = require("../components/common/api");
var routepath_1 = require("../AtPar/Menus/routepath");
var ManageConsignedItemOrderReportComponent = (function () {
    function ManageConsignedItemOrderReportComponent(atParCommonService, manageConsignedItemOrderReportServices, atParConstant, httpService, spinnerService, confirmationService) {
        this.atParCommonService = atParCommonService;
        this.manageConsignedItemOrderReportServices = manageConsignedItemOrderReportServices;
        this.atParConstant = atParConstant;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.confirmationService = confirmationService;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.blnShowVendorlabel = true;
        this.vndrReviewReq = '';
        this.txtItemIDdata = '';
        this.txtDeptIDdata = '';
        this.txtCompanydata = '';
        this.txtParLocdata = '';
        this.txtPONOdata = '';
        this.selectedVendor = '';
        this.litUpdateFlag = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
        this.page = false;
        this.mainGrid = false;
        this.lookUpPopUp = false;
        this.lookUpGrid = false;
        this.itemId = '';
        this.vendorID = '';
        this.erpName = '';
        this.btnLookUpSaveVisble = false;
        this.btnLookUpSaveDisble = true;
        this.blnSuccessFlag = false;
        this.mainDiv = false;
        this.expandedItems = [];
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    ManageConsignedItemOrderReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.pazeSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        return [4 /*yield*/, this.getERPName()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 2:
                        _a.sent();
                        this.fromDate = new Date();
                        this.fromDate.setDate(this.fromDate.getDate() - this.defDateRange);
                        this.toDate = new Date();
                        return [4 /*yield*/, this.bindVendors()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getOrgParamValue()];
                    case 4:
                        _a.sent();
                        this.mainGrid = false;
                        this.mainDiv = true;
                        this.page = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageConsignedItemOrderReportComponent.prototype.btnGo_Click = function () {
        try {
            this.lstGridHdrData = [];
            this.lstGridDtlsData = [];
            this.lstGridFilterHdrData = [];
            this.growlMessage = [];
            this.litUpdateFlag = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
            this.expandedItems = [];
            var todayDate = new Date();
            if (this.toDate > todayDate) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                return;
            }
            if (this.fromDate > this.toDate) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
                return;
            }
            this.getItemData();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageConsignedItemOrderReportComponent.prototype.getERPName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageConsignedItemOrderReportServices.GetERPName().catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.erpName = data.DataVariable.toString();
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
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageConsignedItemOrderReportComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.defDateRange = parseInt(data.DataVariable.toString());
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
                        this.spinnerService.stop();
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
    ManageConsignedItemOrderReportComponent.prototype.bindVendors = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageConsignedItemOrderReportServices.GetVendorsInfo(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstVendorData = data.DataList;
                                        if (_this.lstVendorData.length >= 1) {
                                            if (_this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID] == 'VENDOR') {
                                                _this.blnShowVendorlabel = true;
                                                var drSearch = linq_es5_1.asEnumerable(_this.lstVendorData).Where(function (x) { return x.VEND_USER_ID == _this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]; }).ToArray();
                                                if (drSearch.length > 0) {
                                                    _this.lblVendorData = drSearch[0].VENDOR_ID + " - " + drSearch[0].VENDOR_NAME;
                                                }
                                            }
                                            else {
                                                _this.blnShowVendorlabel = false;
                                                _this.ddlVendorData = [];
                                                _this.ddlVendorData.push({ label: "Select Vendor", value: "Select Vendor" });
                                                for (var i = 0; i < _this.lstVendorData.length; i++) {
                                                    _this.ddlVendorData.push({ label: _this.lstVendorData[i].VENDOR_ID + " - " + _this.lstVendorData[i].VENDOR_NAME, value: _this.lstVendorData[i].VENDOR_ID });
                                                }
                                            }
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
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageConsignedItemOrderReportComponent.prototype.getOrgParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getOrgGroupParamValue("VENDOR_REVIEW_REQ", AtParEnums_1.EnumApps.PointOfUse, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (!_this.StringNullOrEmpty(data.DataVariable)) {
                                            _this.vndrReviewReq = data.DataVariable.toString();
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
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageConsignedItemOrderReportComponent.prototype.getItemData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var vendIntPos, vendorID, fromDate, toDate, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.mainGrid = false;
                        vendorID = '';
                        if (this.blnShowVendorlabel == true) {
                            if (!this.StringNullOrEmpty(this.lblVendorData)) {
                                vendIntPos = this.lblVendorData.indexOf('-');
                            }
                            if (vendIntPos > 0) {
                                vendorID = this.lblVendorData.substring(0, vendIntPos).trim();
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                                return [2 /*return*/];
                            }
                        }
                        else {
                            if (this.selectedVendor.trim() != 'Select Vendor') {
                                vendorID = this.selectedVendor.trim();
                            }
                            else {
                                vendorID = '';
                            }
                        }
                        this.spinnerService.start();
                        fromDate = this.fromDate.toLocaleDateString();
                        toDate = this.toDate.toLocaleDateString();
                        return [4 /*yield*/, this.manageConsignedItemOrderReportServices.GetConsignmentItemOrderReports(this.txtItemIDdata, vendorID, this.txtDeptIDdata, this.txtCompanydata, this.txtParLocdata, fromDate, toDate, this.txtPONOdata).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataDictionary != null || data.DataDictionary != undefined) {
                                            _this.lstGridHdrData = [];
                                            _this.lstGridDtlsData = [];
                                            _this.lstGridFilterHdrData = [];
                                            _this.lstGridHdrData = data.DataDictionary['lstheader'];
                                            _this.lstGridDtlsData = data.DataDictionary['lstdetails'];
                                            var _loop_1 = function (i) {
                                                var hdrData = new VM_MT_POU_CONSIGNEDBILLONLY_HEADERS_1.VM_MT_POU_CONSIGNEDBILLONLY_HEADERS;
                                                hdrData = linq_es5_1.asEnumerable(_this.lstGridHdrData).Where(function (x) { return x.VENDOR_ID == _this.lstGridDtlsData[i].VENDOR_ID && x.TRANSACTION_ID == _this.lstGridDtlsData[i].TRANSACTION_ID && x.DEPARTMENT_ID == _this.lstGridDtlsData[i].DEPARTMENT_ID; }).FirstOrDefault();
                                                _this.lstGridFilterHdrData.push(hdrData);
                                            };
                                            for (var i = 0; i < _this.lstGridDtlsData.length; i++) {
                                                _loop_1(i);
                                            }
                                            _this.lstGridFilterHdrData = linq_es5_1.asEnumerable(_this.lstGridFilterHdrData).Distinct().ToArray();
                                            if (_this.lstGridFilterHdrData.length <= 0) {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                                return;
                                            }
                                            var _loop_2 = function (i) {
                                                _this.lstGridFilterHdrData[i].DETAILS = linq_es5_1.asEnumerable(_this.lstGridDtlsData).Where(function (x) { return x.VENDOR_ID == _this.lstGridFilterHdrData[i].VENDOR_ID && x.TRANSACTION_ID == _this.lstGridFilterHdrData[i].TRANSACTION_ID; }).ToArray();
                                                var changeDate = _this.lstGridFilterHdrData[i].TRANSACTION_DATE;
                                                dateStr = new Date(changeDate);
                                                _this.lstGridFilterHdrData[i].TRANSACTION_DATE = _this.getDateFormat(dateStr);
                                                _this.reviewStatus(_this.lstGridFilterHdrData[i].DETAILS, i);
                                            };
                                            var dateStr;
                                            for (var i = 0; i < _this.lstGridFilterHdrData.length; i++) {
                                                _loop_2(i);
                                            }
                                            _this.mainGrid = true;
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
                        this.spinnerService.stop();
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
    ManageConsignedItemOrderReportComponent.prototype.reviewStatus = function (gridItem, parentRowIndex) {
        try {
            for (var i = 0; i < gridItem.length; i++) {
                gridItem[i].parentRIndex = parentRowIndex;
                gridItem[i].childRIndex = i;
                this.resetData(gridItem[i]);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageConsignedItemOrderReportComponent.prototype.resetData = function (gridItem) {
        try {
            gridItem.ACTUAL_ITEM_ID = gridItem.ITEM_ID;
            gridItem.OLD_ISSUE_PRICE = gridItem.ISSUE_PRICE;
            gridItem.OLD_LINE_COMMENTS = gridItem.LINE_COMMENTS;
            gridItem.OLD_UOM = gridItem.UOM;
            gridItem.blnCancel = true;
            gridItem.blnCancelDisable = false;
            gridItem.blnEdit = true;
            gridItem.blnEditDisable = false;
            gridItem.blnSave = false;
            gridItem.blnAbandon = false;
            gridItem.blnHoldUnhold = true;
            gridItem.blnHoldUnholdDiable = false;
            gridItem.blnUpdate = false;
            gridItem.isReviewStatusVisible = false;
            gridItem.isReviewStatusDisable = false;
            gridItem.isVerndorCBDisable = true;
            gridItem.isDeptCBDisable = false;
            gridItem.isExceptionCBDisable = true;
            if (!this.StringNullOrEmpty(gridItem.LINE_COMMENTS)) {
                gridItem.LINE_COMMENTS = gridItem.LINE_COMMENTS.replace("%20", " ");
            }
            if (gridItem.STATUS == AtParEnums_1.WF_ITEM_STATUS.HOLD) {
                gridItem.holdBGColor = 'success';
                gridItem.titleHoldUnhold = 'Unhold';
            }
            else {
                gridItem.holdBGColor = 'danger';
                gridItem.titleHoldUnhold = 'Hold';
            }
            //Grid buttons visibles/enables functionality
            var bDeptReview = gridItem.DEPT_REVIEW_STATUS == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() ? true : false;
            var bExceptionReview = gridItem.EXCEPTION_REVIEW_STATUS == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() ? true : false;
            var bExcpAppReq = gridItem.EXCP_APPROVAL_REQ == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() ? true : false;
            if (this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID.toString()] == "VENDOR") {
                gridItem.blnEdit = false;
                gridItem.blnCancel = false;
                gridItem.blnHoldUnhold = false;
            }
            else if (gridItem.CATALOG_FLG == 'No') {
                if (gridItem.STATUS == AtParEnums_1.WF_ITEM_STATUS.CANCEL) {
                    gridItem.blnEditDisable = true;
                    gridItem.blnCancelDisable = true;
                    gridItem.blnHoldUnholdDiable = true;
                    gridItem.blnUpdate = false;
                }
                else if (gridItem.STATUS == AtParEnums_1.WF_ITEM_STATUS.HOLD) {
                    gridItem.blnEditDisable = true;
                    gridItem.blnUpdate = false;
                }
                else if (gridItem.STATUS == AtParEnums_1.WF_ITEM_STATUS.REVIEWED) {
                    gridItem.blnEditDisable = true;
                    gridItem.blnCancelDisable = true;
                    gridItem.blnHoldUnholdDiable = true;
                    gridItem.blnUpdate = false;
                }
                else {
                    if (!bExcpAppReq && !bDeptReview) {
                        gridItem.blnEditDisable = false;
                    }
                    else if (bExcpAppReq && !bExceptionReview) {
                        gridItem.blnEditDisable = false;
                    }
                    else {
                        gridItem.blnEditDisable = true;
                        gridItem.blnCancelDisable = true;
                        gridItem.blnHoldUnholdDiable = true;
                    }
                }
            }
            else {
                if (gridItem.STATUS == AtParEnums_1.WF_ITEM_STATUS.CANCEL) {
                    gridItem.blnEditDisable = true;
                    gridItem.blnCancelDisable = true;
                    gridItem.blnHoldUnholdDiable = true;
                    gridItem.blnUpdate = false;
                }
                else if (gridItem.STATUS == AtParEnums_1.WF_ITEM_STATUS.HOLD) {
                    gridItem.blnEditDisable = true;
                    gridItem.blnUpdate = false;
                }
                else if (gridItem.STATUS == AtParEnums_1.WF_ITEM_STATUS.REVIEWED) {
                    gridItem.blnEditDisable = true;
                    gridItem.blnCancelDisable = true;
                    gridItem.blnHoldUnholdDiable = true;
                    gridItem.blnUpdate = false;
                }
                else {
                    if (!bExcpAppReq && bDeptReview) {
                        gridItem.blnCancelDisable = true;
                        gridItem.blnHoldUnholdDiable = true;
                    }
                    else if (bExcpAppReq && bExceptionReview) {
                        gridItem.blnCancelDisable = true;
                        gridItem.blnHoldUnholdDiable = true;
                    }
                    else {
                        gridItem.blnCancelDisable = false;
                        gridItem.blnHoldUnholdDiable = false;
                    }
                }
                gridItem.blnEditDisable = true;
            }
            if (!this.StringNullOrEmpty(this.erpName)) {
                if (this.erpName.toUpperCase() == AtParEnums_1.Enterprise_Enum[AtParEnums_1.Enterprise_Enum.Meditech_XML].toString().toUpperCase()) {
                    gridItem.blnEdit = false;
                    gridItem.blnCancel = false;
                    gridItem.blnHoldUnhold = false;
                }
            }
            //ReviewStatus logic
            if (this.vndrReviewReq == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                if (this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID.toString()] == 'VENDOR') {
                    if (gridItem.STATUS != AtParEnums_1.WF_ITEM_STATUS.ACTIVE) {
                        gridItem.isReviewStatusVisible = false;
                        gridItem.blnUpdate = false;
                        gridItem.isReviewStatusDisable = true;
                        gridItem.blnEditDisable = true;
                        gridItem.blnCancelDisable = true;
                        gridItem.blnHoldUnholdDiable = true;
                    }
                    else {
                        if (gridItem.DEPT_REVIEW_STATUS != AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                            if (gridItem.VENDOR_REVIEW_STATUS != AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && gridItem.VENDOR_REVIEW_STATUS != AtParEnums_1.LocationType[AtParEnums_1.LocationType.I].toString()) {
                                gridItem.isReviewStatusVisible = true;
                                gridItem.blnUpdate = true;
                            }
                        }
                    }
                }
                else {
                    if (gridItem.STATUS != AtParEnums_1.WF_ITEM_STATUS.ACTIVE) {
                        gridItem.isReviewStatusVisible = false;
                        gridItem.blnUpdate = false;
                    }
                    else if (gridItem.VENDOR_REVIEW_STATUS != AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && gridItem.VENDOR_REVIEW_STATUS != AtParEnums_1.LocationType[AtParEnums_1.LocationType.I].toString()) {
                        gridItem.isReviewStatusVisible = false;
                        gridItem.blnUpdate = false;
                    }
                    else {
                        if (gridItem.EXCP_APPROVAL_REQ != AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                            if (gridItem.DEPT_REVIEW_STATUS != AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                gridItem.isReviewStatusVisible = true;
                                gridItem.blnUpdate = true;
                            }
                        }
                        else if ((gridItem.EXCEPTION_REVIEW_STATUS != AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) && this.StringNullOrEmpty(gridItem.PO_NO)) {
                            gridItem.isReviewStatusVisible = true;
                            gridItem.blnUpdate = true;
                        }
                    }
                }
            }
            else {
                if (this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID.toString()] == 'VENDOR') {
                    if (gridItem.STATUS != AtParEnums_1.WF_ITEM_STATUS.ACTIVE) {
                        gridItem.isReviewStatusDisable = true;
                        gridItem.blnEditDisable = true;
                        gridItem.blnCancelDisable = true;
                        gridItem.blnHoldUnholdDiable = true;
                        gridItem.blnUpdate = false;
                    }
                    gridItem.isReviewStatusVisible = false;
                    gridItem.blnUpdate = false;
                }
                else {
                    if (gridItem.STATUS != AtParEnums_1.WF_ITEM_STATUS.ACTIVE) {
                        gridItem.isReviewStatusVisible = false;
                        gridItem.blnUpdate = false;
                    }
                    else if (gridItem.EXCP_APPROVAL_REQ != AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                        if (gridItem.DEPT_REVIEW_STATUS != AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                            gridItem.isReviewStatusVisible = true;
                            gridItem.blnUpdate = true;
                        }
                    }
                    else if (gridItem.EXCEPTION_REVIEW_STATUS != AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && this.StringNullOrEmpty(gridItem.PO_NO)) {
                        gridItem.isReviewStatusVisible = true;
                        gridItem.blnUpdate = true;
                    }
                }
            }
            //GetVendorApprovalStatus
            gridItem.isVerndorChecked = gridItem.VENDOR_REVIEW_STATUS == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() ? true : false;
            //GetDeptApprovalStatus
            gridItem.isDeptChecked = gridItem.DEPT_REVIEW_STATUS == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() ? true : false;
            //GetExecptionApprovalStatus
            gridItem.isExceptionChecked = gridItem.EXCEPTION_REVIEW_STATUS == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() ? true : false;
            //Common code for check box's enable/disable,
            var bHasVendorApproved = false;
            var bHasApproverApproved = gridItem.DEPT_REVIEW_STATUS == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() ? true : false;
            if (gridItem.VENDOR_REVIEW_STATUS == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || gridItem.VENDOR_REVIEW_STATUS == AtParEnums_1.LocationType[AtParEnums_1.LocationType.I].toString()) {
                bHasVendorApproved = true;
            }
            else {
                bHasVendorApproved = false;
            }
            var intItemStatus = gridItem.STATUS;
            //IsVendorApprovalCheckBoxEnabled
            if (!bHasApproverApproved) {
                if (this.vndrReviewReq == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                    if (this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID.toString()] == 'VENDOR' && (!bHasVendorApproved)) {
                        gridItem.isVerndorCBDisable = false;
                    }
                    else if (bHasVendorApproved) {
                        gridItem.isVerndorCBDisable = true;
                    }
                }
            }
            //IsDepartmentApprovalCheckBoxEnabled
            if (this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID.toString()] == 'VENDOR') {
                gridItem.isDeptCBDisable = true;
            }
            else {
                if (intItemStatus != AtParEnums_1.WF_ITEM_STATUS.ACTIVE) {
                    gridItem.isDeptCBDisable = true;
                }
                else {
                    if (this.vndrReviewReq == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                        if (!bHasVendorApproved || bHasApproverApproved) {
                            gridItem.isDeptCBDisable = true;
                        }
                    }
                    else {
                        if (bHasApproverApproved) {
                            gridItem.isDeptCBDisable = true;
                        }
                    }
                }
            }
            //IsExceptionApprovalCheckBoxEnabled
            var bHasReviewerApproved = gridItem.EXCEPTION_REVIEW_STATUS == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() ? true : false;
            var bExcpAppReq = gridItem.EXCP_APPROVAL_REQ == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() ? true : false;
            if (this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID.toString()] != "VENDOR") {
                if (intItemStatus != AtParEnums_1.WF_ITEM_STATUS.ACTIVE) {
                    gridItem.isExceptionCBDisable = true;
                }
                else {
                    if (bExcpAppReq) {
                        if (bHasApproverApproved && !bHasReviewerApproved && this.StringNullOrEmpty(gridItem.PO_NO)) {
                            gridItem.isExceptionCBDisable = false;
                        }
                    }
                }
            }
            gridItem.isOldDeptCBDisable = gridItem.isDeptCBDisable;
            gridItem.isOldExceptionCBDisable = gridItem.isExceptionCBDisable;
            gridItem.isOldVerndorCBDisable = gridItem.isVerndorCBDisable;
        }
        catch (ex) {
        }
    };
    ManageConsignedItemOrderReportComponent.prototype.cancelItem_click = function (rowData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    if (this.litUpdateFlag == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please save/cancel before continuing' });
                        return [2 /*return*/];
                    }
                    this.confirmationService.confirm({
                        message: 'Are you sure you want to cancel the item?',
                        accept: function () { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.spinnerService.start();
                                        return [4 /*yield*/, this.manageConsignedItemOrderReportServices.UpdateItemStatus(rowData.TRANSACTION_ID, rowData.ITEM_ID, AtParEnums_1.WF_ITEM_STATUS.CANCEL).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                                var data, _a;
                                                return __generator(this, function (_b) {
                                                    switch (_b.label) {
                                                        case 0:
                                                            data = res.json();
                                                            this.growlMessage = [];
                                                            this.spinnerService.stop();
                                                            _a = data.StatType;
                                                            switch (_a) {
                                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 3];
                                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 4];
                                                                case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 5];
                                                            }
                                                            return [3 /*break*/, 6];
                                                        case 1:
                                                            this.expandedItems = [];
                                                            return [4 /*yield*/, this.getItemData()];
                                                        case 2:
                                                            _b.sent();
                                                            this.expandedItem = linq_es5_1.asEnumerable(this.lstGridFilterHdrData).Where(function (x) { return x.VENDOR_ID == rowData.VENDOR_ID && x.TRANSACTION_ID == rowData.TRANSACTION_ID && x.DEPARTMENT_ID == rowData.DEPARTMENT_ID; }).FirstOrDefault();
                                                            this.expandedItems.push(this.expandedItem);
                                                            return [3 /*break*/, 6];
                                                        case 3:
                                                            {
                                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                                return [3 /*break*/, 6];
                                                            }
                                                            _b.label = 4;
                                                        case 4:
                                                            {
                                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                                return [3 /*break*/, 6];
                                                            }
                                                            _b.label = 5;
                                                        case 5:
                                                            {
                                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                                return [3 /*break*/, 6];
                                                            }
                                                            _b.label = 6;
                                                        case 6: return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
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
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    ManageConsignedItemOrderReportComponent.prototype.editItem_click = function (rowData) {
        try {
            this.growlMessage = [];
            if (this.litUpdateFlag == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please save/cancel before continuing' });
                return;
            }
            rowData.isExceptionCBDisable = true;
            rowData.isVerndorCBDisable = true;
            rowData.isDeptCBDisable = true;
            this.litUpdateFlag = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
            rowData.istxtItemIdVisible = true;
            rowData.blnCancel = false;
            rowData.blnEdit = false;
            rowData.blnHoldUnhold = false;
            rowData.blnUpdate = false;
            rowData.blnSave = true;
            rowData.blnAbandon = true;
            this.litUpdateFlag = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
            this.expandedItems = [];
            this.expandedItem = linq_es5_1.asEnumerable(this.lstGridFilterHdrData).Where(function (x) { return x.VENDOR_ID == rowData.VENDOR_ID && x.TRANSACTION_ID == rowData.TRANSACTION_ID && x.DEPARTMENT_ID == rowData.DEPARTMENT_ID; }).FirstOrDefault();
            this.expandedItems.push(this.expandedItem);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageConsignedItemOrderReportComponent.prototype.save_click = function (rowData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.growlMessage = [];
                        this.litUpdateFlag = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                        if (!(this.lookUpData != null || this.lookUpData != undefined)) return [3 /*break*/, 2];
                        this.lookUpData.ACTUAL_ITEM_ID = rowData.ACTUAL_ITEM_ID;
                        this.lookUpData.ITEM_PRICE = this.StringNullOrEmpty(rowData.ISSUE_PRICE.toString()) ? 0 : rowData.ISSUE_PRICE;
                        this.lookUpData.UOM = rowData.UOM;
                        this.lookUpData.ITEM_DESCR = rowData.SHORT_DESCR;
                        if (rowData.isExceptionCBDisable != undefined) {
                            if (rowData.isExceptionCBDisable != true) {
                                this.lookUpData.REVEIWER_TYPE = 'Exception Review';
                            }
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageConsignedItemOrderReportServices.UpdateNonCatalogItemDtls(this.lookUpData).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            data = res.json();
                                            this.growlMessage = [];
                                            this.spinnerService.stop();
                                            _a = data.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 3];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 4];
                                                case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 5];
                                            }
                                            return [3 /*break*/, 6];
                                        case 1:
                                            this.lookUpData = null;
                                            this.expandedItems = [];
                                            return [4 /*yield*/, this.getItemData()];
                                        case 2:
                                            _b.sent();
                                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Saved successfully.' });
                                            return [3 /*break*/, 6];
                                        case 3:
                                            {
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 4;
                                        case 4:
                                            {
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 5;
                                        case 5:
                                            {
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 6;
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        rowData.blnCancel = true;
                        rowData.blnEdit = true;
                        rowData.blnHoldUnhold = true;
                        rowData.blnUpdate = true;
                        rowData.blnSave = false;
                        rowData.blnAbandon = false;
                        rowData.ITEM_ID = rowData.ACTUAL_ITEM_ID;
                        rowData.ISSUE_PRICE = rowData.OLD_ISSUE_PRICE;
                        rowData.LINE_COMMENTS = rowData.OLD_LINE_COMMENTS;
                        rowData.UOM = rowData.OLD_UOM;
                        rowData.isExceptionCBDisable = rowData.isOldExceptionCBDisable;
                        rowData.isVerndorCBDisable = rowData.isOldVerndorCBDisable;
                        rowData.isDeptCBDisable = rowData.isOldDeptCBDisable;
                        rowData.istxtItemIdVisible = false;
                        this.page = true;
                        this.mainGrid = true;
                        this.lookUpPopUp = false;
                        this.lookUpGrid = false;
                        this.litUpdateFlag = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                        this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Saved successfully.' });
                        _a.label = 3;
                    case 3:
                        this.expandedItems = [];
                        this.expandedItem = linq_es5_1.asEnumerable(this.lstGridFilterHdrData).Where(function (x) { return x.VENDOR_ID == rowData.VENDOR_ID && x.TRANSACTION_ID == rowData.TRANSACTION_ID && x.DEPARTMENT_ID == rowData.DEPARTMENT_ID; }).FirstOrDefault();
                        this.expandedItems.push(this.expandedItem);
                        return [3 /*break*/, 5];
                    case 4:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ManageConsignedItemOrderReportComponent.prototype.cancel_click = function (rowData) {
        try {
            this.growlMessage = [];
            rowData.isExceptionCBDisable = rowData.isOldExceptionCBDisable;
            rowData.isVerndorCBDisable = rowData.isOldVerndorCBDisable;
            rowData.isDeptCBDisable = rowData.isOldDeptCBDisable;
            rowData.istxtItemIdVisible = false;
            rowData.ITEM_ID = rowData.ACTUAL_ITEM_ID;
            rowData.ISSUE_PRICE = rowData.OLD_ISSUE_PRICE;
            rowData.UOM = rowData.OLD_UOM;
            rowData.LINE_COMMENTS = rowData.OLD_LINE_COMMENTS;
            this.resetData(rowData);
            this.page = true;
            this.mainGrid = true;
            this.lookUpPopUp = false;
            this.lookUpGrid = false;
            this.litUpdateFlag = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
            this.expandedItems = [];
            this.expandedItem = linq_es5_1.asEnumerable(this.lstGridFilterHdrData).Where(function (x) { return x.VENDOR_ID == rowData.VENDOR_ID && x.TRANSACTION_ID == rowData.TRANSACTION_ID && x.DEPARTMENT_ID == rowData.DEPARTMENT_ID; }).FirstOrDefault();
            this.expandedItems.push(this.expandedItem);
        }
        catch (ex) {
        }
    };
    ManageConsignedItemOrderReportComponent.prototype.holdItem_click = function (rowData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var status, itemStatus, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        if (this.litUpdateFlag == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please save/cancel before continuing' });
                            return [2 /*return*/];
                        }
                        status = rowData.STATUS;
                        if (status == AtParEnums_1.WF_ITEM_STATUS.HOLD) {
                            itemStatus = AtParEnums_1.WF_ITEM_STATUS.ACTIVE;
                        }
                        else {
                            itemStatus = AtParEnums_1.WF_ITEM_STATUS.HOLD;
                        }
                        return [4 /*yield*/, this.confirmationService.confirm({
                                message: 'Are you sure you want to continue?',
                                accept: function () { return __awaiter(_this, void 0, void 0, function () {
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                this.spinnerService.start();
                                                return [4 /*yield*/, this.manageConsignedItemOrderReportServices.UpdateItemStatus(rowData.TRANSACTION_ID, rowData.ITEM_ID, itemStatus).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                                        var data, _a;
                                                        return __generator(this, function (_b) {
                                                            switch (_b.label) {
                                                                case 0:
                                                                    data = res.json();
                                                                    this.growlMessage = [];
                                                                    _a = data.StatType;
                                                                    switch (_a) {
                                                                        case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                                        case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 3];
                                                                        case AtParEnums_1.StatusType.Error: return [3 /*break*/, 4];
                                                                        case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 5];
                                                                    }
                                                                    return [3 /*break*/, 6];
                                                                case 1:
                                                                    rowData.STATUS = itemStatus;
                                                                    this.expandedItems = [];
                                                                    return [4 /*yield*/, this.getItemData()];
                                                                case 2:
                                                                    _b.sent();
                                                                    this.expandedItem = linq_es5_1.asEnumerable(this.lstGridFilterHdrData).Where(function (x) { return x.VENDOR_ID == rowData.VENDOR_ID && x.TRANSACTION_ID == rowData.TRANSACTION_ID && x.DEPARTMENT_ID == rowData.DEPARTMENT_ID; }).FirstOrDefault();
                                                                    this.expandedItems.push(this.expandedItem);
                                                                    return [3 /*break*/, 6];
                                                                case 3:
                                                                    {
                                                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                                        return [3 /*break*/, 6];
                                                                    }
                                                                    _b.label = 4;
                                                                case 4:
                                                                    {
                                                                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                                        return [3 /*break*/, 6];
                                                                    }
                                                                    _b.label = 5;
                                                                case 5:
                                                                    {
                                                                        this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                                        return [3 /*break*/, 6];
                                                                    }
                                                                    _b.label = 6;
                                                                case 6: return [2 /*return*/];
                                                            }
                                                        });
                                                    }); })];
                                            case 1:
                                                _a.sent();
                                                this.spinnerService.stop();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageConsignedItemOrderReportComponent.prototype.update_click = function (rowData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var transID, itemID, bVendorValueFromDB, bApproverValueFromDB, bReviewerValueFromDB, deptID, lotID, serialID, lineNO, itemPrice, uom, comments, vendorID, transID;
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    if (!this.StringNullOrEmpty(rowData.WORKFLOW_INSTANCE_ID)) {
                        transID = rowData.TRANSACTION_ID;
                        itemID = rowData.ITEM_ID;
                        bVendorValueFromDB = rowData.VENDOR_REVIEW_STATUS == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() ? true : false;
                        bApproverValueFromDB = rowData.DEPT_REVIEW_STATUS == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() ? true : false;
                        bReviewerValueFromDB = rowData.EXCEPTION_REVIEW_STATUS == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() ? true : false;
                        deptID = rowData.DEPARTMENT_ID;
                        lotID = '';
                        serialID = '';
                        lineNO = 0;
                        if (!this.StringNullOrEmpty(rowData.ITEM_LOTNUMBER)) {
                            lotID = rowData.ITEM_LOTNUMBER;
                        }
                        if ((!this.StringNullOrEmpty(rowData.ITEM_SRNUMBER))) {
                            serialID = rowData.ITEM_SRNUMBER;
                        }
                        if ((!this.StringNullOrEmpty(rowData.LINE_NO))) {
                            lineNO = Number(rowData.LINE_NO);
                        }
                        itemPrice = '';
                        if (rowData.ISSUE_PRICE != null && rowData.ISSUE_PRICE != undefined) {
                            itemPrice = rowData.ISSUE_PRICE.toString();
                        }
                        uom = rowData.UOM;
                        comments = rowData.LINE_COMMENTS;
                        vendorID = rowData.VENDOR_ID;
                        transID = rowData.TRANSACTION_ID;
                        if (this.StringNullOrEmpty(itemPrice.trim())) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Price should not be empty.' });
                            return [2 /*return*/];
                        }
                        else if (itemPrice == '0') {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Price should be greater than zero.' });
                            return [2 /*return*/];
                        }
                        if (itemPrice.lastIndexOf('.') != itemPrice.indexOf('.')) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Invalid Price.' });
                            return [2 /*return*/];
                        }
                        if (this.StringNullOrEmpty(uom.trim())) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'UOM should not be empty.' });
                            return [2 /*return*/];
                        }
                        if (!rowData.isVerndorCBDisable && !rowData.isVerndorChecked) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please check the review option.' });
                            return [2 /*return*/];
                        }
                        else if (!rowData.isDeptCBDisable && !rowData.isDeptChecked) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please check the review option.' });
                            return [2 /*return*/];
                        }
                        else if (!rowData.isExceptionCBDisable && !rowData.isExceptionChecked) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please check the review option.' });
                            return [2 /*return*/];
                        }
                        this.confirmationService.confirm({
                            message: 'Once saved cannot be edited, are you sure you want to continue?',
                            accept: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(bVendorValueFromDB != rowData.isVerndorChecked)) return [3 /*break*/, 2];
                                            this.spinnerService.start();
                                            return [4 /*yield*/, this.UpdateConsignmentItemOrderReports(transID, itemID, rowData.isVerndorChecked, false, false, Number(itemPrice), rowData.WORKFLOW_INSTANCE_ID, AtParEnums_1.Item_POU_Workflow_Review_Status[AtParEnums_1.Item_POU_Workflow_Review_Status.VENDOR_REVIEW_STATUS].toString(), uom, deptID, lotID, serialID, lineNO, comments, rowData)];
                                        case 1:
                                            _a.sent();
                                            this.spinnerService.stop();
                                            return [3 /*break*/, 6];
                                        case 2:
                                            if (!(bApproverValueFromDB != rowData.isDeptChecked)) return [3 /*break*/, 4];
                                            this.spinnerService.start();
                                            return [4 /*yield*/, this.UpdateConsignmentItemOrderReports(transID, itemID, rowData.isVerndorChecked, rowData.isDeptChecked, false, Number(itemPrice), rowData.WORKFLOW_INSTANCE_ID, AtParEnums_1.Item_POU_Workflow_Review_Status[AtParEnums_1.Item_POU_Workflow_Review_Status.DEPT_REVIEW_STATUS].toString(), uom, deptID, lotID, serialID, lineNO, comments, rowData)];
                                        case 3:
                                            _a.sent();
                                            this.spinnerService.stop();
                                            return [3 /*break*/, 6];
                                        case 4:
                                            if (!(bReviewerValueFromDB != rowData.isExceptionChecked)) return [3 /*break*/, 6];
                                            this.spinnerService.start();
                                            return [4 /*yield*/, this.UpdateConsignmentItemOrderReports(transID, itemID, rowData.isVerndorChecked, true, rowData.isExceptionChecked, Number(itemPrice), rowData.WORKFLOW_INSTANCE_ID, AtParEnums_1.Item_POU_Workflow_Review_Status[AtParEnums_1.Item_POU_Workflow_Review_Status.EXCEPTION_REVIEW_STATUS].toString(), uom, deptID, lotID, serialID, lineNO, comments, rowData)];
                                        case 5:
                                            _a.sent();
                                            this.spinnerService.stop();
                                            _a.label = 6;
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); }
                        });
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    ManageConsignedItemOrderReportComponent.prototype.UpdateConsignmentItemOrderReports = function (transID, itemID, vendorResponse, approverResponse, reviewerResponse, itemPrice, workflowInstanceID, responseFrom, uom, deptID, lotID, serialID, lineNO, comments, rowData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        if (this.StringNullOrEmpty(comments)) {
                            comments = "";
                        }
                        return [4 /*yield*/, this.manageConsignedItemOrderReportServices.UpdateConsignmentItemOrderReports(transID, itemID, vendorResponse, approverResponse, reviewerResponse, Number(itemPrice), workflowInstanceID, responseFrom, uom, deptID, lotID, serialID, lineNO, comments).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            data = res.json();
                                            this.growlMessage = [];
                                            this.spinnerService.stop();
                                            _a = data.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 3];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 4];
                                                case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 5];
                                            }
                                            return [3 /*break*/, 6];
                                        case 1:
                                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                            this.expandedItems = [];
                                            return [4 /*yield*/, this.getItemData()];
                                        case 2:
                                            _b.sent();
                                            this.expandedItem = linq_es5_1.asEnumerable(this.lstGridFilterHdrData).Where(function (x) { return x.VENDOR_ID == rowData.VENDOR_ID && x.TRANSACTION_ID == rowData.TRANSACTION_ID && x.DEPARTMENT_ID == rowData.DEPARTMENT_ID; }).FirstOrDefault();
                                            this.expandedItems.push(this.expandedItem);
                                            return [3 /*break*/, 6];
                                        case 3:
                                            {
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 4;
                                        case 4:
                                            {
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 5;
                                        case 5:
                                            {
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 6;
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageConsignedItemOrderReportComponent.prototype.search_click = function (rowData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.growlMessage = [];
                        this.vendorID = rowData.VENDOR_ID;
                        this.transID = rowData.TRANSACTION_ID;
                        if (!!this.StringNullOrEmpty(rowData.ITEM_ID)) return [3 /*break*/, 2];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageConsignedItemOrderReportServices.SearchInERPItemMaster(rowData.ITEM_ID).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataList != null || data.DataList != undefined) {
                                            if (data.DataList.length == 1) {
                                                _this.lookUpData = data.DataList[0];
                                                _this.lookUpData.ACTUAL_ITEM_ID = '';
                                                _this.lookUpData.TRANSACTION_ID = rowData.TRANSACTION_ID;
                                                _this.lookUpData.VENDOR_ID = rowData.VENDOR_ID;
                                                _this.lookUpData.REVEIWER_TYPE = 'Department Review';
                                                rowData.ITEM_ID = _this.lookUpData.ITEMID;
                                                rowData.ISSUE_PRICE = _this.lookUpData.ITEM_PRICE;
                                                rowData.UOM = _this.lookUpData.UOM;
                                                rowData.SHORT_DESCR = _this.lookUpData.ITEM_DESCR;
                                            }
                                            else if (data.DataList.length > 1) {
                                                _this.breadCrumbMenu.SUB_MENU_NAME = 'LookUp Items';
                                                _this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(_this.breadCrumbMenu));
                                                _this.rowData = rowData;
                                                _this.page = false;
                                                _this.mainGrid = false;
                                                _this.lookUpPopUp = true;
                                                _this.lookUpGrid = true;
                                                _this.lstLookUpData = data.DataList;
                                                _this.btnLookUpSaveVisble = true;
                                                _this.btnLookUpSaveDisble = true;
                                                _this.itemId = '';
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        setTimeout(function () {
                                            var lookUpItem = document.getElementById(rowData.TRANSACTION_ID.toString());
                                            lookUpItem.focus();
                                        }, 500);
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
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'LookUp Items';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.rowData = rowData;
                        this.lstLookUpData = [];
                        this.lookUpData = null;
                        this.lookUpPopUp = true;
                        this.lookUpGrid = false;
                        this.page = false;
                        this.mainGrid = false;
                        _a.label = 3;
                    case 3:
                        this.expandedItems = [];
                        this.expandedItem = linq_es5_1.asEnumerable(this.lstGridFilterHdrData).Where(function (x) { return x.VENDOR_ID == rowData.VENDOR_ID && x.TRANSACTION_ID == rowData.TRANSACTION_ID && x.DEPARTMENT_ID == rowData.DEPARTMENT_ID; }).FirstOrDefault();
                        this.expandedItems.push(this.expandedItem);
                        return [3 /*break*/, 5];
                    case 4:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ManageConsignedItemOrderReportComponent.prototype.btnLookUp_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.growlMessage = [];
                        this.lookUpGrid = false;
                        this.btnLookUpSaveVisble = false;
                        this.btnLookUpSaveDisble = true;
                        if (this.StringNullOrEmpty(this.itemId)) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter search text' });
                            return [2 /*return*/];
                        }
                        if (!!this.StringNullOrEmpty(this.itemId)) return [3 /*break*/, 2];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageConsignedItemOrderReportServices.SearchInERPItemMaster(this.itemId).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataList != null || data.DataList != undefined) {
                                            if (data.DataList.length > 0) {
                                                _this.lookUpGrid = true;
                                                _this.btnLookUpSaveVisble = true;
                                                _this.btnLookUpSaveDisble = true;
                                                _this.lstLookUpData = data.DataList;
                                            }
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
                        this.spinnerService.stop();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_10 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageConsignedItemOrderReportComponent.prototype.rdBtnItem_Click = function (rowData) {
        try {
            this.growlMessage = [];
            this.lookUpData = null;
            this.lookUpData = rowData;
            this.lookUpData.ACTUAL_ITEM_ID = '';
            this.lookUpData.ITEMID = this.lookUpData.ITEMID == '&nbsp;' ? '' : this.lookUpData.ITEMID;
            this.lookUpData.CUST_ITEM_ID = this.lookUpData.CUST_ITEM_ID == '&nbsp;' ? '' : this.lookUpData.CUST_ITEM_ID;
            this.lookUpData.ITEM_DESCR = this.lookUpData.ITEM_DESCR == '&nbsp;' ? '' : this.lookUpData.ITEM_DESCR;
            this.lookUpData.MFG_ITEM_ID = this.lookUpData.MFG_ITEM_ID == '&nbsp;' ? '' : this.lookUpData.MFG_ITEM_ID;
            this.lookUpData.VENDOR_ITEM_ID = this.lookUpData.VENDOR_ITEM_ID == '&nbsp;' ? '' : this.lookUpData.VENDOR_ITEM_ID;
            this.lookUpData.UPCID = this.lookUpData.UPCID == '&nbsp;' ? '' : this.lookUpData.UPCID;
            this.lookUpData.GTIN = this.lookUpData.GTIN == '&nbsp;' ? '' : this.lookUpData.GTIN;
            this.lookUpData.TRANSACTION_ID = this.transID;
            this.lookUpData.VENDOR_ID = this.vendorID;
            this.lookUpData.REVEIWER_TYPE = 'Department Review';
            this.btnLookUpSaveDisble = false;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageConsignedItemOrderReportComponent.prototype.btnLookUpSave_Click = function () {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.growlMessage = [];
            this.lookUpPopUp = false;
            this.lookUpGrid = false;
            this.page = true;
            this.mainGrid = true;
            if (this.lstGridFilterHdrData[this.rowData.parentRIndex].DETAILS[this.rowData.childRIndex].TRANSACTION_ID == this.rowData.TRANSACTION_ID) {
                this.lstGridFilterHdrData[this.rowData.parentRIndex].DETAILS[this.rowData.childRIndex].ITEM_ID = this.lookUpData.ITEMID;
                this.lstGridFilterHdrData[this.rowData.parentRIndex].DETAILS[this.rowData.childRIndex].ISSUE_PRICE = this.lookUpData.ITEM_PRICE;
                this.lstGridFilterHdrData[this.rowData.parentRIndex].DETAILS[this.rowData.childRIndex].UOM = this.lookUpData.UOM;
                this.lstGridFilterHdrData[this.rowData.parentRIndex].DETAILS[this.rowData.childRIndex].SHORT_DESCR = this.lookUpData.ITEM_DESCR;
            }
            this.btnLookUpSaveVisble = false;
            this.btnLookUpSaveDisble = true;
            this.itemId = '';
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageConsignedItemOrderReportComponent.prototype.btnLookUpCancel_Click = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.lookUpPopUp = false;
        this.lookUpGrid = false;
        this.btnLookUpSaveDisble = true;
        this.btnLookUpSaveVisble = true;
        this.page = true;
        this.mainGrid = true;
        this.lookUpData = null;
        this.itemId = '';
    };
    ManageConsignedItemOrderReportComponent.prototype.txtbox_KeyPress = function (e) {
        this.growlMessage = [];
        var charCode = (e.which) ? e.which : e.keyCode;
        if (charCode < 65 || charCode > 90) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Use only letters (A-Z) and no spaces' });
            return false;
        }
    };
    ManageConsignedItemOrderReportComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    ManageConsignedItemOrderReportComponent.prototype.StringNullOrEmpty = function (inputString) {
        if (inputString == null || inputString == '' || inputString == undefined) {
            return true;
        }
        else {
            return false;
        }
    };
    ManageConsignedItemOrderReportComponent.prototype.getDateFormat = function (date) {
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var mm = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var yyyy = date.getFullYear();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        var time = hours + ":" + minutes + ":" + seconds;
        var dateFormat = mm + "/" + dd + "/" + yyyy + ' ' + time;
        return dateFormat;
    };
    ;
    ManageConsignedItemOrderReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-manage-cosigned-item-order-report.component.html',
            providers: [HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, pou_manage_cosigned_item_order_report_service_1.ManageConsignedItemOrderReportServices, api_1.ConfirmationService],
        }),
        __metadata("design:paramtypes", [atpar_common_service_1.AtParCommonService, pou_manage_cosigned_item_order_report_service_1.ManageConsignedItemOrderReportServices, AtParConstants_1.AtParConstants,
            HttpService_1.HttpService, event_spinner_service_1.SpinnerService, api_1.ConfirmationService])
    ], ManageConsignedItemOrderReportComponent);
    return ManageConsignedItemOrderReportComponent;
}());
exports.ManageConsignedItemOrderReportComponent = ManageConsignedItemOrderReportComponent;
//# sourceMappingURL=pou-manage-cosigned-item-order-report.component.js.map