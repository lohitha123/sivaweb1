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
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var routepath_1 = require("../AtPar/Menus/routepath");
var pou_quantity_on_hand_report_service_1 = require("./pou-quantity-on-hand-report.service");
var linq_es5_1 = require("linq-es5");
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var QuanityOnHandReportComponent = (function () {
    /**
   * Constructor
   * @param PouQuantityOnHandReportService
   * @param AtParCommonService
   * @param httpService
   * @param spinnerService
   * @param AtParConstants
   */
    function QuanityOnHandReportComponent(leftBarAnimateService, httpService, commonService, spinnerService, atParConstant, pouQuantityOnHandReportService, router, route) {
        this.leftBarAnimateService = leftBarAnimateService;
        this.httpService = httpService;
        this.commonService = commonService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.pouQuantityOnHandReportService = pouQuantityOnHandReportService;
        this.router = router;
        this.route = route;
        /*Variable declaration*/
        this.selectedBunit = '';
        this.isVisibleLblResult = false;
        this.growlMessage = [];
        this.deviceTokenEntry = [];
        this.bunitsData = [];
        this.PalocationData = [];
        this.lstBunits = [];
        this.lstParLocation = [];
        this.lstFilteredVendorIds = [];
        this.lstFilteredItemIds = [];
        this.lstDeptuserItems = [];
        this.lstQtyOnHandHeaders = [];
        this.lstQtyOnHandDetails = [];
        this.lstDetails = [];
        this.lstFilterData = [];
        this.lstvendorIds = [];
        this.noOfRecords = 0;
        this.statusCode = -1;
        this.strUserId = '';
        this.blnShowVendorlabel = false;
        this.blnShowTxtVendor = false;
        this.isVisibleNoOfRecords = false;
        this.isVisiblelinkBtn = true;
        this.isVisible = false;
        this.blnsortbycolumn = false;
        this.checkBoxValue = false;
        this.lblVendorData = '';
        this.selectedvendorId = '';
        this.selectedItemId = '';
        this.selectedSerialNo = '';
        this.selectedLotNo = '';
        this.selectedParLoc = '';
        this.lastDbData = [];
        this.lblResult = '';
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
   * Init Function for Populate Bunits to the dropdown  and get vendors,get MyPreferences when page loading.
   */
    QuanityOnHandReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.strUserId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        this.appId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.AppName] == 'PointOfUse' ? AtParEnums_1.EnumApps.PointOfUse : AtParEnums_1.EnumApps.Pharmacy;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        this.spinnerService.start();
                        this.statusCode = -1;
                        _a = this;
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 2:
                        _a.statusCode = _b.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Internal Server Error' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bindVendors()];
                    case 3:
                        _b.sent();
                        this.lstParLocation.push({ label: "Select Loc", value: '' });
                        return [4 /*yield*/, this.getUserDepartmentsItems()];
                    case 4:
                        _b.sent();
                        this.lstBunits.push({ label: 'Select BU', value: '' });
                        return [4 /*yield*/, this.populateBussinessUnits()];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        ex_1 = _b.sent();
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 8];
                    case 7:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    QuanityOnHandReportComponent.prototype.BindChargeCaptureGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _vendIntPos, strVendorId, strItemId, _blnDisplayNegQoH, _dblOnHandValue, _cartId, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _vendIntPos = '';
                        strVendorId = '';
                        strItemId = '';
                        _blnDisplayNegQoH = false;
                        _dblOnHandValue = 0;
                        this.lblResult = '';
                        _cartId = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowVendorlabel == true) {
                            _vendIntPos = this.lblVendorData.split(" - ")[0];
                            if (_vendIntPos != null && _vendIntPos != undefined && _vendIntPos != '') {
                                strVendorId = _vendIntPos;
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                                this.isVisible = false;
                                this.isVisibleNoOfRecords = false;
                                this.isVisibleLblResult = false;
                                return [2 /*return*/];
                            }
                        }
                        else {
                            _vendIntPos = this.selectedvendorId.split(" - ")[0];
                            if (_vendIntPos != null && _vendIntPos != undefined && _vendIntPos != '') {
                                strVendorId = _vendIntPos;
                            }
                        }
                        if (this.selectedItemId != null && this.selectedItemId != '') {
                            strItemId = this.selectedItemId.split(" - ")[0];
                        }
                        _blnDisplayNegQoH = this.checkBoxValue == true ? true : false;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.pouQuantityOnHandReportService.getQtyOnHandReportData(this.selectedBunit, this.selectedParLoc, strItemId, strVendorId, this.strUserId, this.selectedSerialNo, _blnDisplayNegQoH, this.selectedLotNo, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.appId).
                                catch(this.httpService.handleError).
                                then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    if (data.DataDictionary["pQtyOnHandReportDS"] != null) {
                                        _this.lstQtyOnHandHeaders = data.DataDictionary["pQtyOnHandReportDS"]["ITEMS_HEADER"];
                                        _this.lstQtyOnHandDetails = data.DataDictionary["pQtyOnHandReportDS"]["ITEMS_DETAILS"];
                                        if (_this.lstQtyOnHandHeaders.length > 0 && _this.lstQtyOnHandDetails.length > 0) {
                                            _this.isVisible = true;
                                            _this.isVisibleNoOfRecords = true;
                                            _this.isVisibleLblResult = true;
                                            _this.NoOfRecords = _this.lstQtyOnHandHeaders.length;
                                            _this.lstQtyOnHandHeaders.forEach(function (detail) {
                                                detail.ON_HAND_VALUE = parseFloat(detail.ON_HAND_VALUE).toFixed(2);
                                                detail.ITEM_PRICE = (parseFloat(detail.ITEM_PRICE).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                                detail.PAR_VALUE = parseFloat(detail.PAR_VALUE).toFixed(2);
                                                detail.ITEM_QUANTITY_PAR = (parseFloat(detail.ITEM_QUANTITY_PAR).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                                detail.ACTUAL_QUANTITY = (parseFloat(detail.ACTUAL_QUANTITY).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                            });
                                            _this.lstQtyOnHandDetails.forEach(function (detail) {
                                                detail.ACTUAL_QUANTITY = (parseFloat(detail.ACTUAL_QUANTITY).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                            });
                                            _this.lstQtyOnHandHeaders.forEach(function (header) {
                                                var details = [];
                                                details = _this.lstQtyOnHandDetails.filter(function (detail) {
                                                    return (detail.REPORT_KEY == header.REPORT_KEY && detail.BUSINESS_UNIT == header.BUSINESS_UNIT && detail.CART_ID == header.CART_ID);
                                                });
                                                details.forEach(function (y) {
                                                    y.TODAY_USAGE = parseFloat(header.TODAY_USAGE).toFixed(2);
                                                });
                                                header.DETAILS = details;
                                            });
                                            for (var i = 0; i <= _this.lstQtyOnHandHeaders.length - 1; i++) {
                                                _dblOnHandValue = _dblOnHandValue + parseFloat(_this.lstQtyOnHandHeaders[i].ON_HAND_VALUE);
                                            }
                                            _this.lblResult = _dblOnHandValue.toFixed(2);
                                            if (_this.noOfRecords == 0) {
                                                _this.rowsPerPage = _this.lstQtyOnHandHeaders.length;
                                            }
                                            else {
                                                _this.rowsPerPage = _this.noOfRecords;
                                            }
                                            if (_this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID] == "VENDOR") {
                                                _this.isVisiblelinkBtn = false;
                                            }
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                                            _this.isVisible = false;
                                            _this.isVisibleNoOfRecords = false;
                                            _this.isVisibleLblResult = false;
                                            return;
                                        }
                                    }
                                    else {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                                        _this.isVisible = false;
                                        _this.isVisibleNoOfRecords = false;
                                        _this.isVisibleLblResult = false;
                                        return;
                                    }
                                }
                                else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                                    _this.isVisible = false;
                                    _this.isVisibleNoOfRecords = false;
                                    _this.isVisibleLblResult = false;
                                    return;
                                }
                                else {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Failed to get Data" });
                                    return;
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
    QuanityOnHandReportComponent.prototype.onChargesFilterData = function (data) {
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
    QuanityOnHandReportComponent.prototype.getUserDepartmentsItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.pouQuantityOnHandReportService.getUserDepartmentsItems(this.strUserId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], false, this.appId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                _this.lstDeptuserItems = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataDictionary != null) {
                                            _this.lstDeptuserItems = data.DataDictionary["pUserDeptItemsDS"]["DEPARTMENT_CART_ITEMS"];
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
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    QuanityOnHandReportComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        return [4 /*yield*/, this.commonService.getMyPreferences('RECORDS_PER_PAGE', this.deviceTokenEntry)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.noOfRecords = parseInt(data.DataVariable.toString());
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 3: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    QuanityOnHandReportComponent.prototype.populateBussinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strBusinessUnit, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strBusinessUnit = '';
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.pouQuantityOnHandReportService.getBUnits_Carts(this.strUserId, this.appId, '', '').
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.bunitsData = data.DataList;
                                        _this.lstBunits = [];
                                        _this.lstBunits.push({ label: 'Select BU', value: '' });
                                        for (var i = 0; i <= _this.bunitsData.length - 1; i++) {
                                            if (strBusinessUnit != _this.bunitsData[i].BUSINESS_UNIT) {
                                                _this.lstBunits.push({ label: _this.bunitsData[i].BUSINESS_UNIT, value: _this.bunitsData[i].BUSINESS_UNIT });
                                            }
                                            strBusinessUnit = _this.bunitsData[i].BUSINESS_UNIT;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Department/ Carts allocated to the user" });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: "Error while getting User Departments" });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    QuanityOnHandReportComponent.prototype.bindVendors = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        return [4 /*yield*/, this.pouQuantityOnHandReportService.getVendorsInfo(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstVendorData = data.DataList;
                                        if (_this.lstVendorData.length >= 1) {
                                            if (_this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID] == 'VENDOR') {
                                                _this.blnShowVendorlabel = true;
                                                _this.blnShowTxtVendor = false;
                                                var drSearch = linq_es5_1.asEnumerable(_this.lstVendorData).Where(function (x) { return x.VEND_USER_ID == _this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]; }).ToArray();
                                                if (drSearch.length > 0) {
                                                    _this.lblVendorData = drSearch[0].VENDOR_ID + " - " + drSearch[0].VENDOR_NAME;
                                                }
                                            }
                                            else {
                                                _this.blnShowVendorlabel = false;
                                                _this.blnShowTxtVendor = true;
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
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when user enter any value in vendor AutoSearchBox
    */
    QuanityOnHandReportComponent.prototype.fillVendorIdsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                this.growlMessage = [];
                this.lstFilteredVendorIds = [];
                query = event.query;
                try {
                    this.lstFilteredVendorIds = this.filterVendorIds(query, this.lstVendorData);
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
     * This method is used for filtering vendors
     */
    QuanityOnHandReportComponent.prototype.filterVendorIds = function (query, VendorIds) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < VendorIds.length; i++) {
                var VendorIdValue = VendorIds[i].VENDOR_ID + " - " + VendorIds[i].VENDOR_NAME;
                filtered.push(VendorIdValue);
            }
        }
        else {
            if (query.length >= 1) {
                for (var i = 0; i < VendorIds.length; i++) {
                    var VendorIdValue = VendorIds[i].VENDOR_ID + " - " + VendorIds[i].VENDOR_NAME;
                    if (VendorIdValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(VendorIdValue);
                    }
                }
            }
        }
        return filtered;
    };
    /**
     * This method is used for filtering itemids
     */
    QuanityOnHandReportComponent.prototype.filterItemIds = function (query, ItemIds) {
        var filtered = [];
        if (query == "%") {
            var _loop_1 = function (i) {
                var ItemIdValue = ItemIds[i].ITEM_ID + " - " + ItemIds[i].ITEM_DESCRIPTION;
                if (filtered != null && filtered != undefined && filtered.length > 0) {
                    result = filtered.filter(function (x) { return x == ItemIdValue; });
                    if (result.length <= 0) {
                        filtered.push(ItemIdValue);
                    }
                }
                else {
                    filtered.push(ItemIdValue);
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
                    if (filtered != null && filtered != undefined && filtered.length > 0) {
                        result = filtered.filter(function (x) { return x == ItemIdValue; });
                        if (result.length <= 0) {
                            if (ItemIdValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                                filtered.push(ItemIdValue);
                            }
                        }
                    }
                    else {
                        if (ItemIdValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
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
    * This method is calling when user enter any value in itemid AutoSearchBox
    */
    QuanityOnHandReportComponent.prototype.fillItemIdsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                this.growlMessage = [];
                query = event.query;
                try {
                    this.lstFilteredItemIds = this.filterItemIds(query, this.lstDeptuserItems);
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
    * This method is calling when user change Bunit dropdown
    */
    QuanityOnHandReportComponent.prototype.ddlBUnitChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strBunit, strCartId, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        this.growlMessage = [];
                        strBunit = '';
                        strCartId = '';
                        if (this.selectedBunit == '' || this.selectedBunit == 'Select BU') {
                            this.selectedParLoc = '';
                            this.lstParLocation = [];
                            this.lstParLocation.push({ label: "Select Loc", value: '' });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.pouQuantityOnHandReportService.getBUnits_Carts(this.strUserId, this.appId, AtParEnums_1.LocationType.P, '').
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        strBunit = _this.selectedBunit;
                                        _this.PalocationData = data.DataList;
                                        _this.lstParLocation = [];
                                        _this.lstParLocation.push({ label: "Select Loc", value: '' });
                                        for (var i = 0; i <= _this.PalocationData.length - 1; i++) {
                                            if (_this.PalocationData[i].BUSINESS_UNIT == strBunit && _this.PalocationData[i].CART_ID != strCartId) {
                                                _this.lstParLocation.push({ label: _this.PalocationData[i].CART_ID, value: _this.PalocationData[i].CART_ID });
                                            }
                                            strCartId = _this.PalocationData[0].CART_ID;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Department/ Carts allocated to the user" });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: "Error while getting User Departments" });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7);
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
    * This method is calling when user click on Go button
    **/
    QuanityOnHandReportComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.BindChargeCaptureGrid()];
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
    * This method is calling when user click on itemid in the datatable and after clicking navigating to pointOfuse Item Usage Report screen
    */
    QuanityOnHandReportComponent.prototype.onItemIDClick = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var navigationExtras, menuItems, i, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        navigationExtras = {
                            queryParams: {
                                "appId": AtParEnums_1.EnumApps.PointOfUse,
                                "mode": 'Go',
                                "bunit": item.BUSINESS_UNIT,
                                "cartId": item.CART_ID,
                                "itemId": item.ITEM_ID,
                                "Screen": 'Transaction History'
                            }
                        };
                        this.breadCrumbMenu.MENU_NAME = "Item Usage Report";
                        this.breadCrumbMenu.ROUTE = 'pointofuse/itemusagereport';
                        this.breadCrumbMenu.SUB_MENU_NAME = '';
                        this.breadCrumbMenu.GROUP_NAME = 'Reports & Dashboards';
                        this.breadCrumbMenu.APP_NAME = 'Point Of Use';
                        this.breadCrumbMenu.IS_DIV = false;
                        localStorage.setItem('localBreadCrumb', JSON.stringify(this.breadCrumbMenu));
                        menuItems = JSON.parse(localStorage.getItem('MenuList'));
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < menuItems.length)) return [3 /*break*/, 4];
                        if (!(menuItems[i].ROUTE == 'pointofuse/itemusagereport')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.leftBarAnimateService.emitChangeReportaActiveMenu(menuItems[i].MENU_NAME.trim())];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.router.navigate(['atpar/pointofuse/itemusagereport'], navigationExtras)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is used for change date format to mm/dd/yyyy
    */
    QuanityOnHandReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    /**
   * This method is used for adding days
   */
    QuanityOnHandReportComponent.prototype.addDays = function (theDate, days) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)];
            });
        });
    };
    QuanityOnHandReportComponent.prototype.clientErrorMsg = function (ex) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString());
    };
    /**
   * This method is for clearing all the variables
   */
    QuanityOnHandReportComponent.prototype.OnDestroy = function () {
        this.lstBunits = null;
        this.lstDeptuserItems = null;
        this.lstFilteredItemIds = null;
        this.lblVendorData = null;
        this.lstFilteredVendorIds = null;
        this.lstParLocation = null;
        this.PalocationData = null;
        this.lstQtyOnHandHeaders = null;
        this.lstQtyOnHandDetails = null;
    };
    QuanityOnHandReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-quantity-on-hand-report.component.html',
            providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, pou_quantity_on_hand_report_service_1.PouQuantityOnHandReportService]
        }),
        __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService,
            HttpService_1.HttpService,
            atpar_common_service_1.AtParCommonService,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            pou_quantity_on_hand_report_service_1.PouQuantityOnHandReportService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], QuanityOnHandReportComponent);
    return QuanityOnHandReportComponent;
}());
exports.QuanityOnHandReportComponent = QuanityOnHandReportComponent;
//# sourceMappingURL=pou-quantity-on-hand-report.component.js.map