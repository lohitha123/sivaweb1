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
var PAR_MNGT_VENDOR_1 = require("../../app/Entities/PAR_MNGT_VENDOR");
var HttpService_1 = require("../Shared/HttpService");
var http_1 = require("@angular/http");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParEnums_2 = require("../Shared/AtParEnums");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var ManageOrdersComponent = (function () {
    function ManageOrdersComponent(httpservice, _http, spinnerService, atParcommonservice, atParConstant) {
        this.httpservice = httpservice;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.atParcommonservice = atParcommonservice;
        this.atParConstant = atParConstant;
        this.pop = false;
        this.table = false;
        this.page = true;
        this.form = false;
        this.editform = false;
        this.loading = true;
        this.minDateValue1 = new Date();
        this.deviceTokenEntry = [];
        this.lstStatusOrders = [];
        this.lstStatusOrders1 = [];
        this.lstPouOrderDetails = [];
        this.Company = "";
        this.ParLocation = "";
        this.RequisitionNum = "";
        this.Department = "";
        this.Vendor = "";
        this.ItemID = "";
        this.selectedStatus = "";
        this.grdHide = false;
        this.growlMessage = [];
        this.btnShow = false;
        this.strAllowEditOrders = "";
        this.Editgrd = false;
        this.grd = false;
        this.defDateRange = "";
        this.profileParam = "MAX_ALLOW_QTY";
        this.profileParamOrder = "ALLOW_EDITING_ORDERS";
        this.drpsatatus = false;
        this.buttonEnableDisable = true;
        this.expandedItems = new Array();
        this.showedit = false;
        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
    }
    ManageOrdersComponent.prototype.ngOnInit = function () {
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.pageSize = +this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.RecordsPerPage];
            this.intAppId = parseInt(this.appId);
            if (this.intAppId == undefined) {
                this.intAppId = 15;
            }
            this.GetMyPreferences();
            this.BindStatusOrders();
            this.GetProfileParamValue();
            this.GetProfileParamValueOrder();
            var nowDate = new Date();
            this.date2 = new Date();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    };
    ManageOrdersComponent.prototype.bindModelDataChange = function (event) {
        if (event.TextBoxID === event.TextBoxID.toString()) {
            this.txtqty = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if (this.txtqty == 0) {
            this.buttonEnableDisable = false;
        }
        else {
            this.buttonEnableDisable = true;
        }
    };
    ManageOrdersComponent.prototype.GetProfileParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var profileID, exception_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        profileID = this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.ProfileID];
                        this.spinnerService.start();
                        this.grdHide = false;
                        return [4 /*yield*/, this.atParcommonservice.GetProfileParamValue(profileID, this.intAppId, "MAX_ALLOW_QTY").
                                catch(this.httpservice.handleError).then(function (res) { return res.json(); }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (response.StatType) {
                                        case AtParEnums_1.StatusType.Success:
                                            {
                                                this.growlMessage = [];
                                                this.spinnerService.stop();
                                                this.strMaxAllowQty = +response.DataVariable;
                                                break;
                                            }
                                        case AtParEnums_1.StatusType.Warn: {
                                            this.grdHide = false;
                                            this.spinnerService.stop();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error: {
                                            this.grdHide = false;
                                            this.spinnerService.stop();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Custom: {
                                            this.grdHide = false;
                                            this.spinnerService.stop();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                            break;
                                        }
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        exception_1 = _a.sent();
                        this.grdHide = false;
                        this.clientErrorMsg(exception_1, "GetProfileParamValue");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageOrdersComponent.prototype.GetProfileParamValueOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var profileID, exception_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        profileID = this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.ProfileID];
                        this.spinnerService.start();
                        this.grdHide = false;
                        return [4 /*yield*/, this.atParcommonservice.GetProfileParamValue(profileID, this.intAppId, "ALLOW_EDITING_ORDERS").
                                catch(this.httpservice.handleError).then(function (res) { return res.json(); }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (response.StatType) {
                                        case AtParEnums_1.StatusType.Success:
                                            {
                                                this.growlMessage = [];
                                                this.spinnerService.stop();
                                                this.strAllowEditOrders = response.DataVariable.toString();
                                                break;
                                            }
                                        case AtParEnums_1.StatusType.Warn: {
                                            this.grdHide = false;
                                            this.spinnerService.stop();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error: {
                                            this.grdHide = false;
                                            this.spinnerService.stop();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Custom: {
                                            this.grdHide = false;
                                            this.spinnerService.stop();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                            break;
                                        }
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        exception_2 = _a.sent();
                        this.grdHide = false;
                        this.clientErrorMsg(exception_2, "GetProfileParamValueOrder");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageOrdersComponent.prototype.GetMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var userID, exception_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userID = this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID];
                        this.spinnerService.start();
                        this.grdHide = false;
                        return [4 /*yield*/, this.atParcommonservice.GetMyPreferences("DEFAULT_REPORT_DURATION", userID).
                                catch(this.httpservice.handleError).then(function (res) { return res.json(); }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var d, nu, y;
                                return __generator(this, function (_a) {
                                    switch (response.StatType) {
                                        case AtParEnums_1.StatusType.Success:
                                            {
                                                this.growlMessage = [];
                                                this.spinnerService.stop();
                                                this.defDateRange = response.DataVariable.toString();
                                                d = new Date();
                                                nu = this.defDateRange;
                                                y = +nu;
                                                d.setDate(d.getDate() - y);
                                                this.date1 = d;
                                                break;
                                            }
                                        case AtParEnums_1.StatusType.Warn: {
                                            this.grdHide = false;
                                            this.spinnerService.stop();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error: {
                                            this.grdHide = false;
                                            this.spinnerService.stop();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Custom: {
                                            this.grdHide = false;
                                            this.spinnerService.stop();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                            break;
                                        }
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        exception_3 = _a.sent();
                        this.grdHide = false;
                        this.clientErrorMsg(exception_3, "fileUpload");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageOrdersComponent.prototype.btngo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var fromDate, toDate1, todayDate, toDate, CompID, locID, strReqNo, deptID, vendorID, strItemID, ordStatus, orgGrpID, frmDate, exception_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        if (this.date1 != null || this.date1 != undefined) {
                            fromDate = new Date(this.date1);
                        }
                        else {
                            this.grdHide = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date format should be : mm/dd/yyyy." });
                            return [2 /*return*/];
                        }
                        if (this.date2 != null || this.date2 != undefined) {
                            toDate1 = this.date2.toLocaleDateString();
                        }
                        else {
                            this.grdHide = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date format should be : mm/dd/yyyy." });
                            return [2 /*return*/];
                        }
                        todayDate = new Date();
                        toDate = new Date(this.date2);
                        if (toDate > todayDate) {
                            this.grdHide = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                            return [2 /*return*/];
                        }
                        if (fromDate > toDate) {
                            this.grdHide = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
                            return [2 /*return*/];
                        }
                        CompID = this.Company;
                        locID = this.ParLocation;
                        strReqNo = this.RequisitionNum;
                        deptID = this.Department;
                        vendorID = this.Vendor;
                        strItemID = this.ItemID;
                        ordStatus = this.selectedStatus;
                        orgGrpID = this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.OrgGrpID];
                        frmDate = this.date1.toLocaleDateString();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        this.grdHide = false;
                        return [4 /*yield*/, this.atParcommonservice.GetOrderHeaders(frmDate, toDate1, CompID, locID, deptID, vendorID, ordStatus, strReqNo, strItemID, orgGrpID, this.intAppId).
                                catch(this.httpservice.handleError).then(function (res) { return res.json(); }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var bindData;
                                return __generator(this, function (_a) {
                                    switch (response.StatType) {
                                        case AtParEnums_1.StatusType.Success:
                                            {
                                                this.growlMessage = [];
                                                this.spinnerService.stop();
                                                this.BindGrid = [];
                                                this.grdHide = true;
                                                bindData = response.DataList;
                                                this.BindGrid = response.DataList;
                                                if (ordStatus == "5" && this.strAllowEditOrders == "N") {
                                                    this.btnShow = true;
                                                }
                                                else {
                                                    this.btnShow = false;
                                                }
                                                if (this.strAllowEditOrders == "Y") {
                                                    this.Editgrd = true;
                                                    this.grd = false;
                                                    this.btnShow = true;
                                                }
                                                else {
                                                    this.grd = true;
                                                    this.Editgrd = false;
                                                    this.btnShow = false;
                                                }
                                                //for (let i = 0; i <= this.BindGrid.length - 1; i++) {
                                                //    let changeDate = this.BindGrid[i].ORDER_DATE;
                                                //    var date = changeDate;
                                                //    var dateTime = date;
                                                //    var datePart = new Date(dateTime).getDate();
                                                //    var yearPart = new Date(dateTime).getFullYear();
                                                //    var monthPart = new Date(dateTime).getMonth() + 1;
                                                //    var hoursPart = new Date(dateTime).getHours();
                                                //    var minutesPart = new Date(dateTime).getMinutes();
                                                //    var secondsPart = new Date(dateTime).getSeconds();
                                                //    if (monthPart < 10 && datePart < 10) {
                                                //        var timePart = "0" + monthPart + "/" + "0" + datePart + "/" + yearPart + " " + hoursPart + ":" + minutesPart + ":" + secondsPart;
                                                //    }
                                                //    else {
                                                //        var timePart = monthPart + 1 + "/" + datePart + "/" + yearPart + " " + hoursPart + ":" + minutesPart + ":" + secondsPart;
                                                //    }
                                                //    this.BindGrid[i].ORDER_DATE = timePart;
                                                //  //  await this.Expand(this.BindGrid[i]);
                                                //  //  this.BindGrid[i].DETAILS = this.ExpandGrid;
                                                //}
                                                if (this.BindGrid.length == 0) {
                                                    this.grdHide = false;
                                                    this.spinnerService.stop();
                                                    this.growlMessage = [];
                                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                                    break;
                                                }
                                                break;
                                            }
                                        case AtParEnums_1.StatusType.Warn: {
                                            this.grdHide = false;
                                            this.spinnerService.stop();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error: {
                                            this.grdHide = false;
                                            this.spinnerService.stop();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Custom: {
                                            this.grdHide = false;
                                            this.spinnerService.stop();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                            break;
                                        }
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exception_4 = _a.sent();
                        this.grdHide = false;
                        this.clientErrorMsg(exception_4, "btngo_Click");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageOrdersComponent.prototype.to24Hour = function (str) {
        var tokens = /([10]?\d):([0-5]\d):([0-5]\d) ([ap]m)/i.exec(str);
        if (tokens == null) {
            return null;
        }
        if (tokens[4].toLowerCase() === 'pm' && tokens[1] !== '12') {
            tokens[1] = '' + (12 + (+tokens[1]));
        }
        else if (tokens[4].toLowerCase() === 'am' && tokens[1] === '12') {
            tokens[1] = '00';
        }
        return tokens[1] + ':' + tokens[2] + ":" + tokens[3];
    };
    ManageOrdersComponent.prototype.Expand = function (col, index1) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var CompID, orderDate, orgID, parID, vendorID, deptID, ItemId, bunit, ordStatus, exception_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        CompID = col.ORDER_NO;
                        orderDate = col.ORDER_DATE;
                        orgID = this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.OrgGrpID];
                        parID = col.PAR_LOC_ID;
                        vendorID = col.VENDOR_ID;
                        deptID = col.DEPARTMENT_ID;
                        ItemId = this.ItemID;
                        bunit = col.ORG_ID;
                        ordStatus = this.selectedStatus;
                        this.drpsatatus = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        // this.spinnerService.start();
                        this.grdHide = true;
                        return [4 /*yield*/, this.atParcommonservice.GetOrderDetails_ManageOrders(CompID, ordStatus, parID, bunit, orgID, ItemId, this.intAppId).
                                catch(this.httpservice.handleError).then(function (res) { return res.json(); }).then(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.growlMessage = [];
                                            _this.expandedItems = [];
                                            //  this.spinnerService.stop();
                                            _this.ExpandGrid = [];
                                            _this.grdHide = true;
                                            var bindData = response.DataList;
                                            for (var eg = 0; eg <= bindData.length - 1; eg++) {
                                                if (_this.Editgrd == false) {
                                                    response.DataList[eg].QTY = parseFloat(response.DataList[eg].QTY).toFixed(2);
                                                    response.DataList[eg].QTY_RCVD = parseFloat(response.DataList[eg].QTY_RCVD).toFixed(2);
                                                }
                                                response.DataList[eg].PRICE = parseFloat(response.DataList[eg].PRICE).toFixed(2);
                                                bindData[eg].txtqty = "qty" + eg;
                                                bindData[eg].txtRCDqty = "RCDqty" + eg;
                                                bindData[eg].txtstatus = "Status" + eg;
                                                var chk = _this.grd;
                                                if (chk == true) {
                                                    if (bindData[eg].ORDER_STATUS == "5") {
                                                        response.DataList[eg].ORDER_STATUS = "Open";
                                                    }
                                                    if (bindData[eg].ORDER_STATUS == "10") {
                                                        response.DataList[eg].ORDER_STATUS = "Sent";
                                                    }
                                                    if (bindData[eg].ORDER_STATUS == "15") {
                                                        response.DataList[eg].ORDER_STATUS = "Received";
                                                    }
                                                    if (bindData[eg].ORDER_STATUS == "20") {
                                                        response.DataList[eg].ORDER_STATUS = "Cancelled";
                                                    }
                                                    if (bindData[eg].ORDER_STATUS == "25") {
                                                        response.DataList[eg].ORDER_STATUS = "Partially Received";
                                                    }
                                                    if (bindData[eg].ORDER_STATUS == "30") {
                                                        response.DataList[eg].ORDER_STATUS = "Closed";
                                                    }
                                                    if (bindData[eg].ORDER_STATUS == "35") {
                                                        response.DataList[eg].ORDER_STATUS = "Error";
                                                    }
                                                    if (bindData[eg].ORDER_STATUS == "40") {
                                                        response.DataList[eg].ORDER_STATUS = "Partially Picked";
                                                    }
                                                    if (bindData[eg].ORDER_STATUS == "45") {
                                                        response.DataList[eg].ORDER_STATUS = "Picked";
                                                    }
                                                }
                                            }
                                            _this.ExpandGrid = response.DataList;
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exception_5 = _a.sent();
                        this.grdHide = false;
                        this.clientErrorMsg(exception_5, "Expand");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageOrdersComponent.prototype.btnSubmit_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, lstdat, ex, txtQty, ReceviedQty, status, TransID, BinLoc, st, data1, exception_6, exception_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        this.growlMessage = [];
                        if (!(this.buttonEnableDisable == false)) return [3 /*break*/, 7];
                        for (i = 0; i <= this.BindGrid.length - 1; i++) {
                            lstdat = this.BindGrid[i].DETAILS;
                            if (lstdat != undefined) {
                                for (ex = 0; ex <= lstdat.length - 1; ex++) {
                                    txtQty = lstdat[ex].QTY;
                                    ReceviedQty = lstdat[ex].QTY_RCVD;
                                    if (txtQty == null || txtQty == undefined) {
                                        this.spinnerService.stop();
                                        this.growlMessage = [];
                                        this.growlMessage.push({
                                            severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Order Qty"
                                        });
                                        return [2 /*return*/];
                                    }
                                    if (lstdat[ex].QTY_RCVD === "" || lstdat[ex].QTY_RCVD == null || lstdat[ex].QTY_RCVD == undefined) {
                                        this.spinnerService.stop();
                                        this.growlMessage = [];
                                        this.growlMessage.push({
                                            severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Recevied Qty"
                                        });
                                        return [2 /*return*/];
                                    }
                                    status = lstdat[ex].ORDER_STATUS;
                                    TransID = lstdat[ex].TRANSACTION_ID;
                                    BinLoc = lstdat[ex].BIN_LOC;
                                    st = this.selectedStatus;
                                    ReceviedQty = +ReceviedQty;
                                    txtQty = +txtQty;
                                    if (status != "Cancel") {
                                        if (txtQty != null || txtQty != "") {
                                            if (txtQty > this.strMaxAllowQty) {
                                                this.spinnerService.stop();
                                                this.growlMessage = [];
                                                this.growlMessage.push({
                                                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity"
                                                });
                                                return [2 /*return*/];
                                            }
                                        }
                                        if (ReceviedQty != null || ReceviedQty != "") {
                                            if (ReceviedQty > this.strMaxAllowQty) {
                                                this.spinnerService.stop();
                                                this.growlMessage = [];
                                                this.growlMessage.push({
                                                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity"
                                                });
                                                return [2 /*return*/];
                                            }
                                        }
                                    }
                                    if (txtQty != 0 || ReceviedQty != 0) {
                                        data1 = lstdat[ex];
                                        data1.ORDER_QTY = txtQty;
                                        data1.RCVD_QTY = ReceviedQty;
                                        data1.STATUS = status;
                                        this.lstPouOrderDetails.push(data1);
                                    }
                                }
                            }
                        }
                        if (!(this.lstPouOrderDetails.length > 0)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        this.grdHide = true;
                        return [4 /*yield*/, this.atParcommonservice.UpdateOrderDetails(this.lstPouOrderDetails).
                                catch(this.httpservice.handleError).then(function (res) { return res.json(); }).then(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.growlMessage = [];
                                            _this.spinnerService.stop();
                                            _this.lstPouOrderDetails = [];
                                            _this.buttonEnableDisable = true;
                                            _this.grdHide = true;
                                            _this.spinnerService.stop();
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({
                                                severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Order details were updated successfully"
                                            });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.lstPouOrderDetails = [];
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.lstPouOrderDetails = [];
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.lstPouOrderDetails = [];
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exception_6 = _a.sent();
                        this.grdHide = false;
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({
                            severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "General Client Error"
                        });
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        this.grdHide = false;
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No changes found to update" });
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No changes found to update" });
                        return [2 /*return*/];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        exception_7 = _a.sent();
                        this.clientErrorMsg(exception_7, "btnSubmit_Click");
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ManageOrdersComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    ManageOrdersComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    ManageOrdersComponent.prototype.BindStatusOrders = function () {
        this.lstStatusOrders.push({ label: "All", value: "" });
        this.lstStatusOrders.push({ label: "Open", value: "5" });
        this.lstStatusOrders.push({ label: "Sent", value: "10" });
        this.lstStatusOrders.push({ label: "Received", value: "15" });
        this.lstStatusOrders.push({ label: "Cancel", value: "20" });
        this.lstStatusOrders.push({ label: "Partially Received", value: "25" });
        this.lstStatusOrders.push({ label: "Closed", value: "30" });
        this.lstStatusOrders.push({ label: "Error", value: "35" });
        this.lstStatusOrders.push({ label: "Partially Picked", value: "40" });
        this.lstStatusOrders.push({ label: "Picked", value: "45" });
        this.lstStatusOrders1.push({ label: "Open", value: "5" });
        this.lstStatusOrders1.push({ label: "Sent", value: "10" });
        this.lstStatusOrders1.push({ label: "Received", value: "15" });
        this.lstStatusOrders1.push({ label: "Cancel", value: "20" });
        this.lstStatusOrders1.push({ label: "Partially Received", value: "25" });
        this.lstStatusOrders1.push({ label: "Closed", value: "30" });
        this.lstStatusOrders1.push({ label: "Error", value: "35" });
        this.lstStatusOrders1.push({ label: "Partially Picked", value: "40" });
        this.lstStatusOrders1.push({ label: "Picked", value: "45" });
    };
    ManageOrdersComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ManageOrdersComponent.prototype.itemChanged = function () {
        this.buttonEnableDisable = false;
    };
    ManageOrdersComponent.prototype.onProcedureItemClick = function (rowData, event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var index1, exists, expandedRowIndex, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index1 = this.BindGrid.findIndex(function (x) { return x.ORDER_NO == rowData.ORDER_NO && x.ORG_ID == rowData.ORG_ID && x.DEPARTMENT_ID == rowData.DEPARTMENT_ID && x.VENDOR_ID == rowData.VENDOR_ID && x.PAR_LOC_ID == rowData.PAR_LOC_ID; });
                        exists = false;
                        expandedRowIndex = -1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!(rowData != null)) return [3 /*break*/, 4];
                        this.expandedItems.forEach(function (m) {
                            //if (m == this.dvPrefOptByProcedure[index1]) exists = true;
                            if (m.ORDER_NO == _this.BindGrid[index1].ORDER_NO && m.DEPARTMENT_ID == _this.BindGrid[index1].DEPARTMENT_ID
                                && m.ORG_ID == _this.BindGrid[index1].ORG_ID && m.PAR_LOC_ID == _this.BindGrid[index1].PAR_LOC_ID) {
                                exists = true;
                                expandedRowIndex = _this.expandedItems.indexOf(m);
                            }
                        });
                        if (!(exists && expandedRowIndex !== -1)) return [3 /*break*/, 2];
                        //this.expandedItems.pop(this.dvPrefOptByProcedure[index1]);
                        this.expandedItems.splice(expandedRowIndex, 1);
                        this.showedit = false;
                        return [3 /*break*/, 4];
                    case 2:
                        this.showedit = true;
                        //this.expandedItems=[];
                        return [4 /*yield*/, this.Expand(rowData, index1)];
                    case 3:
                        //this.expandedItems=[];
                        _a.sent();
                        this.BindGrid[index1].DETAILS = this.ExpandGrid;
                        this.expandedItems.push(this.BindGrid[index1]);
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_1 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ManageOrdersComponent.prototype, "appId", void 0);
    ManageOrdersComponent = __decorate([
        core_1.Component({
            selector: 'atpar-manageorders',
            templateUrl: 'atpar-manage-orders.component.html',
            providers: [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService],
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http, event_spinner_service_1.SpinnerService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants])
    ], ManageOrdersComponent);
    return ManageOrdersComponent;
}());
exports.ManageOrdersComponent = ManageOrdersComponent;
//# sourceMappingURL=atpar-manage-orders.component.js.map