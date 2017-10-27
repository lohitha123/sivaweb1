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
var file_saver_1 = require("file-saver");
var routepath_1 = require("../AtPar/Menus/routepath");
var cart_order_history_report_service_1 = require("./cart-order-history-report.service");
var OrderHistoryReportComponent = (function () {
    /**
     * Constructor
     * @param CartOrderHistoryReportService
     * @param AtParCommonService
     * @param httpService
     * @param spinnerService
     * @param AtParConstants
     */
    function OrderHistoryReportComponent(httpService, commonService, spinnerService, cartOrderHistoryReportService, atParConstant) {
        this.httpService = httpService;
        this.commonService = commonService;
        this.spinnerService = spinnerService;
        this.cartOrderHistoryReportService = cartOrderHistoryReportService;
        this.atParConstant = atParConstant;
        /*Variable Declaration*/
        this.strOrgGrpId = "";
        this.orgGroupIDForDBUpdate = "";
        this.selectedOrgGroupId = "";
        this.showGrid = false;
        this.selectedCartId = "";
        this.strUserId = "";
        this.ipAddress = "";
        this.selectedBunit = "";
        this.cartIdValue = "";
        this.gstrProtocal = "";
        this.string = "";
        this.gstrPortNo = "";
        this.toMailAddr = '';
        this.orgGrpIDData = "";
        this.isLblVisible = false;
        this.orgGrpId = "";
        this.showColumn1 = false;
        this.showColumn2 = false;
        this.showColumn3 = false;
        this.showColumn4 = false;
        this.showColumn5 = false;
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupsDropdown = false;
        this.isVisible = false;
        this.isMailDialog = false;
        this.tdExports = false;
        this.itemCount = 0;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.statusCode = -1;
        this.lstOrgGroups = [];
        this.lstBUnits = [];
        this.lstFilteredBUnits = [];
        this.lstCartIds = [];
        this.lstDBData = [];
        this.dynamicColumns = [];
        try {
            this.spinnerService.start();
            this.breadCrumbMenu = new routepath_1.Menus();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'constructor');
        }
        this.spinnerService.stop();
    }
    /**
   * Init Function for Populate Bunits to the dropdown when page loading
   */
    OrderHistoryReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstFilteredCartIds = new Array();
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, 'ngOnInit');
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderHistoryReportComponent.prototype.bindOrgGroups = function () {
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
                        this.clientErrorMsg(ex_2, 'bindOrgGroups');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when click on Go button
    */
    OrderHistoryReportComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.isVisible = false;
                        this.tdExports = false;
                        this.isLblVisible = false;
                        this.growlMessage = [];
                        this.spinnerService.start();
                        if ((this.blnShowOrgGroupsDropdown == true) && (this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One")) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID " });
                            return [2 /*return*/];
                        }
                        if (this.selectedBunit == "Select Bunit" || this.selectedBunit == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        if (this.selectedCartId == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter CartID/Par Location" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bindDataGrid()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, 'btnGo_Click');
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderHistoryReportComponent.prototype.bindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.cartIdValue = this.selectedCartId.split(" - ")[0].toUpperCase();
                        if (this.blnShowOrgGroupLabel == true) {
                            this.strOrgGrpId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        }
                        else {
                            this.strOrgGrpId = this.selectedOrgGroupId;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.cartOrderHistoryReportService.getOrderHistoryRep(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedBunit, this.cartIdValue, this.strOrgGrpId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID])
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                _this.itemCount = data.DataVariable;
                                _this.lstDBData = [];
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    switch (data.StatType) {
                                        case AtParEnums_1.StatusType.Success: {
                                            if (_this.itemCount > 0) {
                                                _this.isLblVisible = true;
                                                _this.tdExports = true;
                                                _this.isVisible = true;
                                                _this.lstDBData = data.DataDictionary["dtFillValues"];
                                                _this.dynamicColumns = data.DataList;
                                                if (_this.itemCount == 1) {
                                                    _this.showColumn1 = true;
                                                    _this.showColumn2 = false;
                                                    _this.showColumn3 = false;
                                                    _this.showColumn4 = false;
                                                    _this.showColumn5 = false;
                                                }
                                                else if (_this.itemCount == 2) {
                                                    _this.showColumn1 = true;
                                                    _this.showColumn2 = true;
                                                    _this.showColumn3 = false;
                                                    _this.showColumn4 = false;
                                                    _this.showColumn5 = false;
                                                }
                                                else if (_this.itemCount == 3) {
                                                    _this.showColumn1 = true;
                                                    _this.showColumn2 = true;
                                                    _this.showColumn3 = true;
                                                    _this.showColumn4 = false;
                                                    _this.showColumn5 = false;
                                                }
                                                else if (_this.itemCount == 4) {
                                                    _this.showColumn1 = true;
                                                    _this.showColumn2 = true;
                                                    _this.showColumn3 = true;
                                                    _this.showColumn4 = true;
                                                    _this.showColumn5 = false;
                                                }
                                                else if (_this.itemCount == 5) {
                                                    _this.showColumn1 = true;
                                                    _this.showColumn2 = true;
                                                    _this.showColumn3 = true;
                                                    _this.showColumn4 = true;
                                                    _this.showColumn5 = true;
                                                }
                                            }
                                            else {
                                                _this.showColumn1 = false;
                                                _this.showColumn2 = false;
                                                _this.showColumn3 = false;
                                                _this.showColumn4 = false;
                                                _this.showColumn5 = false;
                                                _this.growlMessage = [];
                                                _this.isVisible = false;
                                                _this.tdExports = false;
                                                _this.isLblVisible = false;
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                                return;
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
                                            if (_this.statusCode = AtParStatusCodes_1.AtparStatusCodes.CRCT_E_ERPCOMPCREATION) {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP interface access failed, may be this installation is for Par Management or it was not successful, please contact your manager/administrator" });
                                                break;
                                            }
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                }
                                else {
                                    _this.isVisible = false;
                                    _this.tdExports = false;
                                    _this.isLblVisible = false;
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                    return;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, 'bindDataGrid');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
   * This method is calling when user selecting  Ogrgrpid in  OrgGrpid dropdown and populate bunits for selecting OrggrpId
   */
    OrderHistoryReportComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.growlMessage = [];
                        this.spinnerService.start();
                        this.isVisible = false;
                        this.tdExports = false;
                        this.isLblVisible = false;
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
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, 'ddlOrgGrpIdChanged');
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
    OrderHistoryReportComponent.prototype.ddl_ChangeBunitChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.selectedCartId = "";
                        if (this.selectedOrgGroupId != "Select One" && this.selectedOrgGroupId != "" && this.selectedBunit == "" && this.isVisible == true) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            this.isVisible = false;
                            this.tdExports = false;
                            this.isLblVisible = false;
                            return [2 /*return*/];
                        }
                        if (this.isVisible == true && this.selectedBunit == "") {
                            this.isVisible = false;
                            this.tdExports = false;
                            this.isLblVisible = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        if (this.selectedBunit == "Select BUnit" || this.selectedBunit == "") {
                            this.isVisible = false;
                            this.tdExports = false;
                            this.isLblVisible = false;
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.cartOrderHistoryReportService.getCartsForBunit(this.strUserId, this.selectedBunit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstFilteredCartIds = data.DataList;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.isVisible = false;
                                        _this.tdExports = false;
                                        _this.isLblVisible = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.isVisible = false;
                                        _this.tdExports = false;
                                        _this.isLblVisible = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.isVisible = false;
                                        _this.tdExports = false;
                                        _this.isLblVisible = false;
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
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, 'ddl_ChangeBunitChanged');
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderHistoryReportComponent.prototype.fillCartIdsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.lstFilteredCartIds = [];
                        if ((this.blnShowOrgGroupLabel == true) && ((this.selectedBunit == 'Select Bunit' || this.selectedBunit == undefined || this.selectedBunit == ""))) {
                            return [2 /*return*/];
                        }
                        if ((this.blnShowOrgGroupsDropdown == true) && ((this.selectedBunit == 'Select Bunit' || this.selectedBunit == undefined || this.selectedBunit == "") || (this.selectedOrgGroupId == 'Select One' || this.selectedOrgGroupId == "" || this.selectedOrgGroupId == undefined))) {
                            return [2 /*return*/];
                        }
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.cartOrderHistoryReportService.getCartsForBunit(this.strUserId, this.selectedBunit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
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
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.isVisible = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.CRCT_E_ERPCOMPCREATION) {
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP interface access failed, may be this installation is for Par Management or it was not successful, please contact your manager/administrator" });
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
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, 'fillCartIdsAuto');
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderHistoryReportComponent.prototype.filterCartIds = function (query, CartIds) {
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
    OrderHistoryReportComponent.prototype.populateBussinessUnits = function () {
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
    * This method is calling when user click on Mail Icon.
    * @param event
    */
    OrderHistoryReportComponent.prototype.onSendMailIconClick = function ($event) {
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
    * This method is calling when user userclick on submit button after enter mailid.
    * @param event
    */
    OrderHistoryReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_9;
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
                        return [4 /*yield*/, this.commonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Cart Order History Report', JSON.stringify(html), this.toMailAddr, AtParEnums_1.MailPriority.Normal.toString(), '')
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
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, 'onSendMailClick');
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OrderHistoryReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    /**
     * This method is calling when user click on print Icon.
     * @param event
     */
    OrderHistoryReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_10;
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
                                mywindow.document.write('<html><head><title>' + 'CartCount - Order History Report' + '</title>');
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
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, 'onPrintClick');
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
    OrderHistoryReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_11;
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
                            file_saver_1.saveAs(blob, "cart_order_history_report.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, 'onExportToExcelClick');
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
    OrderHistoryReportComponent.prototype.ExportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, _DS, imgserverPath, title, i, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        this.statusCode = -1;
                        this.growlMessage = [];
                        _DS = [];
                        imgserverPath = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
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
                        htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=8 align=left><span class=c2><b> Order History Report for Business Unit/Company <b>" + this.selectedBunit + "</b>and Cart ID/Par Location <b>" + this.selectedCartId + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else if (reqType == 'Excel') {
                            htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=7 align=left><span class=c2>Order History Report for Business Unit/Company <b>" + this.selectedBunit + "</b> and Cart ID/Par Location <b>" + this.selectedCartId + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        else {
                            htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=7 align=left><span class=c2>Order History Report for Business Unit/Company <b>" + this.selectedBunit + "</b> and Cart ID/Par Location <b>" + this.selectedCartId + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center  nowrap><span class=c3><b>Item ID</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Custom Item NO</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Compartment</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Description</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Price($)</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Par Value</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>ItemType</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>UOM</b></span></td>";
                        for (i = 0; i < this.itemCount; i++) {
                            htmlBuilder += "<td align=center width=6% ><span  class=c3><b>" + this.dynamicColumns[i] + "</b></span></td>";
                        }
                        htmlBuilder += "</tr>";
                        return [4 /*yield*/, this.lstDBData.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td align= left nowrap> <span class=c2>" + "'" + header.ITEM_ID + "</span></td>";
                                if (header.CUST_ITEM_ID != "" && header.CUST_ITEM_ID != null) {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CUST_ITEM_ID + "&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + "" + "&nbsp;</td>";
                                }
                                if (header.COMPARTMENT != "" && header.COMPARTMENT != " " && header.COMPARTMENT != null) {
                                    htmlBuilder += "<td align= left nowrap> <span class=c2>" + "'" + header.COMPARTMENT + "</span></td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + "" + "&nbsp;</td>";
                                }
                                htmlBuilder += "<td bgcolor=#ffffff >&nbsp;" + header.DESCR + "&nbsp;</td>"
                                    + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.PRICE + "&nbsp;</td>"
                                    + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.PAR_QTY + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_TYPE + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.UOM + "&nbsp;</td>";
                                if (_this.itemCount > 0) {
                                    if (_this.itemCount == 1) {
                                        htmlBuilder += "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_1 + "&nbsp;</td>";
                                    }
                                    else if (_this.itemCount == 2) {
                                        htmlBuilder += "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_1 + "&nbsp;</td>"
                                            + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_2 + "&nbsp;</td>";
                                    }
                                    else if (_this.itemCount == 3) {
                                        htmlBuilder += "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_1 + "&nbsp;</td>"
                                            + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_2 + "&nbsp;</td>"
                                            + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_3 + "&nbsp;</td>";
                                    }
                                    else if (_this.itemCount == 4) {
                                        htmlBuilder += "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_1 + "&nbsp;</td>"
                                            + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_2 + "&nbsp;</td>"
                                            + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_3 + "&nbsp;</td>"
                                            + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_4 + "&nbsp;</td>";
                                    }
                                    else if (_this.itemCount == 5) {
                                        htmlBuilder += "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_1 + "&nbsp;</td>"
                                            + "<td  align= right  bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_2 + "&nbsp;</td>"
                                            + "<td  align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_3 + "&nbsp;</td>"
                                            + "<td  align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_4 + "&nbsp;</td>"
                                            + "<td  align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_5 + "&nbsp;</td>";
                                    }
                                }
                                htmlBuilder += "</tr>";
                            })];
                    case 4:
                        _a.sent();
                        htmlBuilder += "</table></Table>";
                        return [2 /*return*/, htmlBuilder];
                    case 5:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12, 'ExportReportDetails');
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
    OrderHistoryReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    OrderHistoryReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    /**
    * This method is for clearing all the variables
    */
    OrderHistoryReportComponent.prototype.ngOnDestroy = function () {
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
        this.dynamicColumns = null;
        this.orgGroupData = null;
    };
    OrderHistoryReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'cart-order-history-report.component.html',
            providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, cart_order_history_report_service_1.CartOrderHistoryReportService]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            atpar_common_service_1.AtParCommonService,
            event_spinner_service_1.SpinnerService,
            cart_order_history_report_service_1.CartOrderHistoryReportService,
            AtParConstants_1.AtParConstants])
    ], OrderHistoryReportComponent);
    return OrderHistoryReportComponent;
}());
exports.OrderHistoryReportComponent = OrderHistoryReportComponent;
//# sourceMappingURL=cart-order-history-report.component.js.map