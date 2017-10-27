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
var http_1 = require("@angular/http");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var AtParEnums_3 = require("../Shared/AtParEnums");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var cart_item_usage_report_component_service_1 = require("../CartCount/cart-item-usage-report.component.service");
var router_1 = require("@angular/router");
var file_saver_1 = require("file-saver");
var ItemUsageReportComponent = (function () {
    function ItemUsageReportComponent(httpService, _http, spinnerService, commonService, atParConstant, cartItemUsageService, route) {
        this.httpService = httpService;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.cartItemUsageService = cartItemUsageService;
        this.route = route;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.selectedOrgGroupId = "";
        this.selectedBunit = "";
        this.selectedBunitItems = "";
        this.selectedParlocation = "";
        this.orgGrpId = "";
        this.lstOrgGroups = [];
        this.showGrid = false;
        this.lstFilteredBUnits = [];
        this.blnShowOrgGroupDD = false;
        this.minDateValue1 = new Date();
        this.defDateRange = 0;
        this.statusCode = -1;
        this.lstItemIds = [];
        this.selectedItemId = "";
        this.lstItemIdsData = [];
        this.lstDBData = [];
        this.lstDBTableData = [];
        this.data = [];
        this.dataSetlabel = [];
        this.dataSetbgcolor = [];
        this.dataSetbordercolor = [];
        this.dataSetdata = [];
        this.lineColors = [];
        this.label = [];
        this.chartDataSet = [];
        this.isMailDialog = false;
        this.toMailAddr = '';
        this.tdExports = false;
        this.bunitFlag = false;
        this.item = '';
        this.bUnit = '';
        this.cartId = '';
        this.orgGroupId = '';
    }
    ItemUsageReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, _b, dateStr;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.RecordsPerPage];
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.bindOrgGroups();
                        _a = this;
                        return [4 /*yield*/, this.getDefDateRange()];
                    case 1:
                        _a.statusCode = _c.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
                            return [2 /*return*/];
                        }
                        this.fromDate = new Date();
                        _b = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, this.defDateRange)];
                    case 2:
                        _b.fromDate = _c.sent();
                        this.toDate = new Date();
                        this.route.queryParams.subscribe(function (params) {
                            _this.item = decodeURI(params["p2value"]).replace(/%20/g, ' ');
                            _this.orgGroupId = decodeURI(params["p3value"]).replace(/%20/g, ' ');
                            _this.updateDateTime = decodeURI(params["p4value"]).replace(/%20/g, ' ');
                            _this.cartId = decodeURI(params["p5value"]).replace(/%20/g, ' ');
                            _this.bUnit = decodeURI(params["p6value"]).replace(/%20/g, ' ');
                        });
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(JSON.parse(localStorage.getItem('bcMenu'))));
                        if (!(this.bUnit != null && this.bUnit != '' && this.bUnit != "undefined" && this.item != null && this.item != '' && this.item != "undefined" && this.cartId != null && this.cartId != '' && this.cartId != "undefined" && this.updateDateTime != null && this.updateDateTime.toString() != '' && this.orgGroupId != null && this.orgGroupId != '' && this.orgGroupId != "undefined")) return [3 /*break*/, 4];
                        this.selectedOrgGroupId = this.orgGroupId;
                        this.selectedBunit = this.bUnit;
                        this.selectedParlocation = this.cartId;
                        dateStr = new Date(this.updateDateTime).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        this.fromDate = new Date(dateStr);
                        this.selectedItemId = this.item;
                        return [4 /*yield*/, this.bindGrid()];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.populateBusinessUnits();
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            _this.lstFilteredBUnits = [];
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        isOrgBUnitsExist = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.lstFilteredBUnits = [];
                                _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstFilteredBUnits.push({
                                                label: data.DataList[i].toString(),
                                                value: data.DataList[i].toString()
                                            });
                                        }
                                        isOrgBUnitsExist = true;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(isOrgBUnitsExist)];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "populateBusinessUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.growlMessage = [];
                this.showGrid = false;
                if (this.selectedOrgGroupId == "Select One") {
                    this.lstFilteredBUnits = [];
                    this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                    return [2 /*return*/];
                }
                this.spinnerService.start();
                try {
                    this.selectedBunit = "";
                    this.populateBusinessUnits();
                    this.spinnerService.stop();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    ItemUsageReportComponent.prototype.getDefDateRange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, this.commonService.GetMyPreferences("DEFAULT_REPORT_DURATION", this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                if (data.StatType == AtParEnums_3.StatusType.Success) {
                                    _this.defDateRange = parseInt(data.DataVariable.toString());
                                }
                                _this.statusCode = data.StatusCode;
                                if (data.StatType == AtParEnums_3.StatusType.Error) {
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
                                    return;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.statusCode];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        ex_3 = _a.sent();
                        return [4 /*yield*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.addDays = function (theDate, days) {
        return new Date(theDate.getTime() - days * 24 * 60 * 60 * 1000);
    };
    ItemUsageReportComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    ItemUsageReportComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    ItemUsageReportComponent.prototype.onGoClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isValidate, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.showGrid = false;
                        return [4 /*yield*/, this.validateSearchFields()];
                    case 1:
                        //this.lstCaseInfo = [];
                        isValidate = _a.sent();
                        this.spinnerService.start();
                        if (isValidate) {
                            //await this.BindGrid();
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "onGoClick");
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.validateSearchFields = function () {
        try {
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convert(this.fromDate)) > Date.parse(this.convert(this.toDate))) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be greater than From Date" });
                    return false;
                }
            }
            else {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "validateSearchFields");
            return false;
        }
    };
    ItemUsageReportComponent.prototype.convert = function (str) {
        var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    ItemUsageReportComponent.prototype.fillItemIdsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstItemIdsData = [];
                        this.lstItemIds = [];
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.cartItemUsageService.GetCartItemInfo(this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.OrgGrpID], this.selectedBunit, this.selectedParlocation, this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID].toString(), this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.ProfileID].toString()).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.lstItemIdsData = data.DataList;
                                        _this.lstItemIds = _this.filterItemIds(query, _this.lstItemIdsData);
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                            _this.growlMessage = [];
                                        }
                                        else {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "fillItemIdsAuto");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.filterItemIds = function (query, items) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < items.length; i++) {
                var itemValue = items[i];
                if (items[i].CODE !== "") {
                    var itemValue_1 = items[i].CODE + " - " + items[i].DESCRIPTION;
                    filtered.push(itemValue_1);
                }
            }
        }
        else {
            if (query.length >= 0) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].CODE.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if (items[i].CODE !== "") {
                            var itemValue = items[i].CODE + " - " + items[i].DESCRIPTION;
                            filtered.push(itemValue);
                        }
                    }
                }
            }
        }
        return filtered;
    };
    ItemUsageReportComponent.prototype.bindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, frmDate, todate, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //this.selectedItemId = "000000000000030026";
                        if (this.blnShowOrgGroupDD == true) {
                            if (this.selectedOrgGroupId === "Select One") {
                                this.selectedOrgGroupId = "";
                            }
                            if (this.selectedOrgGroupId === "" || this.selectedOrgGroupId == undefined) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
                                return [2 /*return*/];
                            }
                        }
                        if (this.selectedItemId == undefined || this.selectedItemId === "") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Item ID" });
                            return [2 /*return*/];
                        }
                        if (this.selectedBunit === "") {
                            //  Generating comma separated BUs list to send to the SP so as to get the respective data
                            this.selectedBunitItems = "";
                            if ((this.lstFilteredBUnits.length > 1)) {
                                for (i = 1; (i
                                    <= (this.lstFilteredBUnits.length - 1)); i++) {
                                    if ((this.selectedBunitItems === "")) {
                                        this.selectedBunitItems = ("'" + this.lstFilteredBUnits[i].value);
                                    }
                                    else {
                                        this.selectedBunitItems = (this.selectedBunitItems + ("','" + this.lstFilteredBUnits[i].value));
                                    }
                                }
                                this.selectedBunitItems = (this.selectedBunitItems + "'");
                            }
                        }
                        else {
                            this.selectedBunitItems = "";
                            this.selectedBunitItems = ("'"
                                + (this.selectedBunit + "'"));
                        }
                        this.showGrid = false;
                        this.spinnerService.start();
                        frmDate = this.convert(this.fromDate);
                        todate = this.convert(this.toDate);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.cartItemUsageService.GetItemUsageDetails(this.selectedItemId, frmDate, todate, this.selectedBunitItems, this.selectedParlocation, this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID]).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.showGrid = true;
                                        _this.tdExports = true;
                                        _this.lstDBData = [];
                                        _this.lstDBData = data.DataDictionary["pdsCartDetails"]["Table1"];
                                        _this.lstDBTableData = data.DataDictionary["pdsCartDetails"]["Table2"];
                                        _this.CustItemId = _this.lstDBData[0].CUST_ITEM_NO;
                                        _this.lineColors = ["#00FF00", "#0000FF"];
                                        _this.dataSetbgcolor = [];
                                        _this.dataSetdata = [];
                                        _this.dataSetbordercolor = [];
                                        var dataParQty = [];
                                        var dataUsedQty = [];
                                        var dataForInsideTable = [];
                                        _this.label = [];
                                        console.log(data);
                                        for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                                            var dateObj = new Date(_this.lstDBData[i].COUNTDATE);
                                            var month = dateObj.getMonth() + 1; //months from 1-12
                                            var day = dateObj.getDate();
                                            var sDay = day.toString();
                                            var Hours = dateObj.getHours();
                                            var ampm = "";
                                            if (Hours <= 12) {
                                                ampm = "am";
                                            }
                                            else {
                                                ampm = "mm";
                                            }
                                            if (day < 10) {
                                                sDay = "0" + sDay;
                                            }
                                            var dayName = days[dateObj.getDay()];
                                            _this.lstDBData[i].COUNTDATE = month + "/" + sDay;
                                            _this.lstDBData[i].COUNTDATEFORINSIDETABLE = month + "/" + sDay + "(" + dayName.substring(0, 3) + " " + ampm + ")";
                                            _this.label.push(_this.lstDBData[i].COUNTDATE);
                                            dataParQty.push(_this.lstDBData[i].PAR_QTY);
                                            dataUsedQty.push(_this.lstDBData[i].ORDER_QTY);
                                        }
                                        _this.chartDataSet = [];
                                        _this.chartDataSet.push({ label: 'Par Qty', backgroundColor: '', borderColor: '#00FF00', data: dataParQty, fill: false });
                                        _this.chartDataSet.push({ label: 'Used Qty', backgroundColor: '', borderColor: '#0000FF', data: dataUsedQty, fill: false });
                                        _this.data = [];
                                        _this.data = {
                                            labels: _this.label,
                                            datasets: _this.chartDataSet
                                        };
                                        //this.selectedBunit = this.selectedBunit.replace("'", "");
                                        console.log(_this.data);
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.selectedItemId = "";
                                        _this.selectedOrgGroupId = "";
                                        _this.selectedParlocation = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.selectedItemId = "";
                                        _this.selectedOrgGroupId = "";
                                        _this.selectedParlocation = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.selectedItemId = "";
                                        _this.selectedOrgGroupId = "";
                                        _this.selectedParlocation = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "bindGrid");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.isMailDialog = true;
                    this.toMailAddr = '';
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "onSendMailIconClick");
                }
                return [2 /*return*/];
            });
        });
    };
    ItemUsageReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_7;
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
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmail(this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.SystemId], 'Cart Count Item Usage Report', JSON.stringify(html), this.toMailAddr, AtParEnums_2.MailPriority.Normal.toString(), '')
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
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "onSendMailClick");
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ItemUsageReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_8;
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
                                mywindow.document.write('<html><head><title>' + 'Car Count - Item Usage Report' + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                mywindow.document.close(); // necessary for IE >= 10
                                mywindow.focus(); // necessary for IE >= 10*/
                                mywindow.print();
                                mywindow.close();
                                return [2 /*return*/, true];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "onPrintClick");
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "CartCountItemUsageReport.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "onExportToExcelClick");
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var chartImage, image, htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, imgPhyUsagePath, phyname, strTitle, title, i, ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chartImage = document.getElementById("ChartId");
                        image = chartImage.toDataURL("image/png");
                        image = image.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(image, "ItemUsage").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        htmlBuilder = '';
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        imgPhyUsagePath = '';
                        return [4 /*yield*/, this.commonService.getServerIP()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.ipAddress = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_3.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.commonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.growlMessage = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_3.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 4:
                        _a.sent();
                        phyname = void 0;
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgPhyUsagePath = this.httpService.BaseUrl + '/Uploaded/';
                        strTitle = "\"" + "AtparVersion2.4.4" + "\"";
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder += "<table width='100%'>";
                        htmlBuilder += "<tbody><tr><td align='left'> <table width='100%'><tbody><tr><td width='100%' align='left' height='63'><table align='left' width='100%' cellpadding='0' cellspacing='0' valign='top'><tbody><TR height=63><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td></TR><tr><td height='27' valign='bottom' width='100%' align='left' colspan='2'><font size='1' style='COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt'><b>&nbsp;&nbsp;Mobile Supply Chain Execution<b></b></b></font></td></tr><tr><td colspan='2'>&nbsp;</td></tr><tr><td colspan='2'><table align='left' width='90%' border='0'><tbody><tr><td></td></tr><tr><td colspan='5' align='left'><span class='c2'><span class='c2'>Cart Count Item Usage Report of  <b>" + this.selectedBunit + "</b> From   <b>" + this.convertDateFormate(this.fromDate) + "</b> to <b>" + this.convertDateFormate(this.toDate) + " </b></span></span></td><td align='right' valign='top'>&nbsp;";
                        htmlBuilder += "</td></tr > <tr height='20' > </tr></tbody> </table></td> </tr>";
                        htmlBuilder += "<tr><td colspan='2' height= '20' > <table width='99%' > <tbody><tr><td><table align='left' width= '99%' > <tbody><tr><td align='left' colspan= '3'> <span class='c2'> Item ID &nbsp; &nbsp; " + this.lstDBTableData[0].ITEM_ID + " </span> </td> <td align='left' > <span class='c2' > Custom Item NO &nbsp; &nbsp;" + this.lstDBTableData[0].ITEM_ID + " </span> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> ";
                        htmlBuilder += "<tr> <td colspan='2' > <table align='left' width= '99%' style='BORDER-COLLAPSE:collapse' border= '1' > <tbody>";
                        htmlBuilder += "<tr width= '100%' bgcolor= '#ffffff'>";
                        htmlBuilder += "<td align=center nowrap= '' width= '100%' > <span class='c3'> <table cellspacing='0' cellpadding= '2' style= 'border-color:#D3D3D3;width:100%;border-collapse:collapse;'>";
                        htmlBuilder += "<tbody><tr style='width:100%;'>";
                        htmlBuilder += "<td class='' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'>Business Unit/Company </td><td class='' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].BUSINESS_UNIT + "</td><td class='' colspan='2' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'>Cart ID/Par Location </td><td class='' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].CART_ID + "</td>";
                        htmlBuilder += "</tr><tr style='width:100%;'>";
                        htmlBuilder += "<td class='' colspan='4' style='border-color:#BFBFBF;border-width:1px;border-style:solid;' align='center'><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgPhyUsagePath + "ItemUsage.png></div></td><td class='' valign='top' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:25%;'><table cellspacing='0' cellpadding='2' style='border-color:#D3D3D3;border-collapse:collapse;'>";
                        htmlBuilder += "<tbody><tr style='width:100%;'>";
                        htmlBuilder += "<td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:47%;white-space:nowrap;'>Date</td><td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:25%;'>Par Qty</td><td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:28%;'>Used Qty</td>";
                        htmlBuilder += "</tr>";
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            htmlBuilder += "<tr style='width:100%;'>";
                            htmlBuilder += "<td class='Remarks' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:47%;white-space:nowrap;'>" + this.lstDBData[i].COUNTDATEFORINSIDETABLE + "</td>";
                            htmlBuilder += "<td class='Remarks' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:47%;white-space:nowrap;'>" + this.lstDBData[i].PAR_QTY + "</td>";
                            htmlBuilder += "<td class='Remarks' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:47%;white-space:nowrap;'>" + this.lstDBData[i].ORDER_QTY + "</td></tr>";
                        }
                        htmlBuilder += "</tbody></table></td></tr>";
                        htmlBuilder += "<tr style='width:100%;'><td class='' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'> </td><td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'>Qty</td> <td class='' align= 'left' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;' > Item Description</td><td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'>Date</td > <td class='' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;width:25%;' ></td></tr>";
                        htmlBuilder += "<tr style='width:100%;'><td class='' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'> Min Item Usage</td><td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].MIN_USAGE + "</td > <td class='SearchLabel' align= 'left' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'> " + this.lstDBTableData[0].ITEM_DESC + "</td><td class='SearchLabel' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].UPDATE_DATE + " </td><td class='SearchLabel' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'></td ></tr>";
                        htmlBuilder += "<tr style='width:100%;'><td class='' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'> Max  Item Usage </td><td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].MAX_USAGE + "</td > <td class='SearchLabel' align= 'left' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'> " + this.lstDBTableData[0].ITEM_DESC + "</td><td class='SearchLabel' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].UPDATE_DATE + " </td><td class='SearchLabel' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'></td ></tr>";
                        htmlBuilder += "<tr style='width:100%;'><td class='' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'> Average Item Usage </td><td class='' align='left' colspan='4' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].AVG_USAGE + " Per Day" + "</td ></tr>";
                        htmlBuilder += "</tbody></table></span></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table >";
                        return [4 /*yield*/, htmlBuilder];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        ex_10 = _a.sent();
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    ItemUsageReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    ItemUsageReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ItemUsageReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'cart-item-usage-report.component.html',
            providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, cart_item_usage_report_component_service_1.CartItemUsageService]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            AtParConstants_1.AtParConstants,
            cart_item_usage_report_component_service_1.CartItemUsageService,
            router_1.ActivatedRoute])
    ], ItemUsageReportComponent);
    return ItemUsageReportComponent;
}());
exports.ItemUsageReportComponent = ItemUsageReportComponent;
//# sourceMappingURL=cart-item-usage-report.component.js.map