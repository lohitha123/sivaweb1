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
var http_1 = require("@angular/http");
var HttpService_1 = require("../Shared/HttpService");
var api_1 = require("../components/common/api");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var AtParEnums_2 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var linqts_1 = require("linqts");
var AtParEnums_3 = require("../Shared/AtParEnums");
var file_saver_1 = require("file-saver");
var core_2 = require("@angular/core");
var VM_DELV_PO_COMMENTS_1 = require("../Entities/VM_DELV_PO_COMMENTS");
var deliver_delivery_report_service_1 = require("./deliver-delivery-report.service");
var DeliveryReportComponent = (function () {
    function DeliveryReportComponent(httpService, _http, spinnerService, commonService, atParConstant, DeliveryReportSevice) {
        this.httpService = httpService;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.DeliveryReportSevice = DeliveryReportSevice;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.orgGrpId = "";
        this.order = "";
        this.blnShowOrgGroupDD = false;
        this.lstOrgGroups = [];
        this.lstOrgGroupsList = [];
        this.showGrid = false;
        this.showexport = false;
        this.selectedDisplay = "";
        this.showOnAllocateSelection = false;
        this.strMenuCode = "mt_deliver_report.aspx";
        this.strAuditData = "";
        this.strRowFilter = "";
        this.blnsortbycolumn = true;
        this.loading = true;
        //fromDate: string;
        //toDate: string;
        this.lstPackType = [];
        this.lstStatus = [];
        this.lstCurrentStatus = [];
        this.lstDeliverdBy = [];
        this.selectedPackageType = "";
        this.selectedStatus = "";
        this.selectedCurrStatus = "";
        this.selectedDeliverBy = "";
        this.selectedOrgGrpId = "";
        this.deliverHeaders = [];
        this.deliverDetails = [];
        this.deliverAttempts = [];
        this.deliverPoComments = [];
        this.deliverLineComments = [];
        this.statusCode = -1;
        this.noOfRecords = 0;
        this.defDateRange = 0;
        this.deliverDetailRows = 0;
        this.tdExports = true;
        this.plus = true;
        this.blnStatus = false;
        this.blnCurrStatus = false;
        this.pop = false;
        this.isMailDialog = false;
        this.toMailAddr = '';
        this.gSendEmailParamval = '';
        this.OrgGroupID = "";
        this.srvrUserID = "";
        this.PoId = "";
        this.DeliverTo = "";
        this.TrackingNo = "";
        this.DeliverdBy = "";
        this.DeptId = "";
        this.VendorName = "";
        this.ItmDesc = "";
        this.Loc = "";
        this.ItemId = "";
        this.Carrier = "";
        this.Requestor = "";
        this.BlnTflag = "";
        this.DeliveryLoc = "";
        this.Status = "";
        this.CurrStatus = "";
        this.LocDescr = "";
        this.PakageType = "";
        this.Pallet = "";
    }
    DeliveryReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 1:
                        _b.sent();
                        this.lstPackType = [];
                        this.lstPackType.push({ label: "ALL", value: "0" }, { label: "PO", value: "PO" }, { label: "NON PO", value: "NON PO" });
                        this.selectedPackageType = this.lstPackType[0].value;
                        this.lstStatus.push({ label: "Select One", value: "STATUS" }, { label: "ALL", value: "ALL" }, { label: "Receive", value: "0" }, { label: "Download", value: "1" }, { label: "PickUp", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Deliver", value: "50" }, { label: "HandOver", value: "100" }, { label: "Cancel", value: "13" });
                        this.selectedStatus = this.lstStatus[0].value;
                        this.lstCurrentStatus.push({ label: "Select One", value: "STATUS" }, { label: "Receive", value: "0" }, { label: "Download", value: "1" }, { label: "PickUp", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Deliver", value: "50" }, { label: "HandOver", value: "100" }, { label: "Cancel", value: "13" });
                        this.selectedCurrStatus = this.lstCurrentStatus[0].value;
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 2:
                        _b.sent();
                        this.bindDeliveredUsersList();
                        this.getOrgParamValue();
                        this.currentDate = new Date();
                        this.toDate = new Date();
                        this.fromDate = new Date();
                        if (!(this.defDateRange.toString() != '' && this.defDateRange != null)) return [3 /*break*/, 4];
                        _a = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, -this.defDateRange)];
                    case 3:
                        _a.fromDate = _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
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
                        ex_1 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 3: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.selectedOrgGroupId = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            _this.selectedOrgGrpId = _this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].toString();
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID != "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_2 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.bindDeliveredUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.blnShowOrgGroupDD == true) {
                            this.selectedOrgGroupId = this.selectedOrgGrpId;
                        }
                        this.lstDeliverdBy = [];
                        this.lstDeliverdBy.push({ label: "Select User", value: "Select User" });
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUsersList(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_3.EnumApps.Deliver, this.selectedOrgGroupId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstDeliverdBy.push({
                                                label: data.DataList[i].FULLNAME,
                                                value: data.DataList[i].USER_ID
                                            });
                                        }
                                        if (_this.lstDeliverdBy.length <= 0 || _this.lstDeliverdBy == null) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No users Available' });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        console.log(ex_3);
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.show = function () {
        this.plus = !this.plus;
    };
    DeliveryReportComponent.prototype.ddlStatusChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.selectedStatus != 'STATUS' && this.selectedStatus != '') {
                    this.blnCurrStatus = true;
                }
                else {
                    this.blnCurrStatus = false;
                }
                return [2 /*return*/];
            });
        });
    };
    DeliveryReportComponent.prototype.ddlCurrentStatusChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.selectedCurrStatus != 'STATUS' && this.selectedCurrStatus != '') {
                    this.blnStatus = true;
                }
                else {
                    this.blnStatus = false;
                }
                return [2 /*return*/];
            });
        });
    };
    DeliveryReportComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.growlMessage = [];
                if (this.selectedOrgGrpId == "Select One") {
                    this.lstDeliverdBy = [];
                    this.lstDeliverdBy.push({ label: "Select User", value: "Select User" });
                    // this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: " " });
                    return [2 /*return*/];
                }
                else {
                    this.bindDeliveredUsersList();
                }
                return [2 /*return*/];
            });
        });
    };
    DeliveryReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    DeliveryReportComponent.prototype.confirm = function () {
        try {
            this.growlMessage = [];
            // var rowData: any;
            var compareDates = new Date(this.toDate);
            var currentDate = new Date();
            if (compareDates.getTime() > currentDate.getTime()) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Todate must be less than or equal to current date " });
                return;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    DeliveryReportComponent.prototype.BindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnValue, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.strRowFilter = "";
                        returnValue = false;
                        return [4 /*yield*/, this.validateSearchFields()];
                    case 1:
                        returnValue = _a.sent();
                        if (!returnValue) return [3 /*break*/, 3];
                        this.spinnerService.start();
                        this.srvrUserID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString();
                        this.OrgGroupID = this.selectedOrgGrpId;
                        if (this.selectedStatus == "ALL" || this.selectedStatus == "STATUS") {
                            this.Status = "";
                        }
                        else {
                            this.Status = this.selectedStatus;
                        }
                        if (this.selectedCurrStatus == "ALL" || this.selectedCurrStatus == "STATUS") {
                            this.CurrStatus = "";
                        }
                        else {
                            this.CurrStatus = this.selectedCurrStatus;
                        }
                        return [4 /*yield*/, this.getDeliveryDetails()];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        ex_4 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.validateSearchFields = function () {
        this.pop = false;
        this.growlMessage = [];
        this.showGrid = false;
        try {
            this.growlMessage = [];
            if (this.blnCurrStatus == true) {
                if (this.selectedStatus == "STATUS" || this.selectedStatus == undefined || this.selectedStatus == "") {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Staus" });
                    return false;
                }
            }
            if (this.blnStatus == true) {
                if (this.selectedCurrStatus == "STATUS" || this.selectedCurrStatus == undefined || this.selectedCurrStatus == "") {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Current Status" });
                    return false;
                }
            }
            if (this.blnStatus == false && this.blnCurrStatus == false) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Status" });
                return false;
            }
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormate(this.toDate)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
            }
            if (Date.parse(this.convertDateFormate(this.fromDate)) > Date.parse(this.convertDateFormate(this.toDate))) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
                return false;
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
            return false;
        }
    };
    DeliveryReportComponent.prototype.getDeliveryDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var Fdate, Tdate, repItemlst, repItem, DefDateTime_1, StausDateTime, CycledateTime_1, PrevCycleDateTime_1, cycTime_1, TotCycTime_1, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.showGrid = false;
                        Fdate = this.convertDateFormate(this.fromDate.toDateString());
                        Tdate = this.convertDateFormate(this.toDate.toDateString());
                        StausDateTime = void 0;
                        DefDateTime_1 = new Date("1/1/0001 12:00:00 AM");
                        this.deliverHeaders = [];
                        this.deliverDetails = [];
                        this.deliverAttempts = [];
                        this.showexport = false;
                        return [4 /*yield*/, this.DeliveryReportSevice.GetDeliveryReportData(this.selectedOrgGroupId, Fdate, Tdate, this.srvrUserID, this.PoId, this.DeliverTo, this.TrackingNo, this.DeliverdBy, this.DeptId, this.VendorName, this.ItmDesc, this.Loc, this.ItemId, this.Carrier, this.Requestor, this.BlnTflag, this.DeliveryLoc, this.Status, this.CurrStatus, this.LocDescr, this.selectedPackageType, this.Pallet).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success:
                                        {
                                            _this.showGrid = true;
                                            _this.deliverHeaders = data.DataDictionary["deliverHeaders"];
                                            _this.deliverDetails = data.DataDictionary["deliverDetails"];
                                            _this.deliverAttempts = data.DataDictionary["deliverAttempts"];
                                            _this.deliverHeaders.forEach(function (header) {
                                                var details = _this.deliverDetails.filter(function (detail) { return detail.TRANSACTION_ID == header.TRANSACTION_ID; });
                                                _this.showexport = true;
                                                TotCycTime_1 = 0;
                                                PrevCycleDateTime_1 = new Date("1/1/0001 12:00:00 AM");
                                                if (details.length > 0) {
                                                    for (var intCnt = 0; intCnt <= details.length - 1; intCnt++) {
                                                        details[intCnt]["CYCLE_TIME"] = "";
                                                        CycledateTime_1 = details[intCnt]["STATUS_TIME"];
                                                        cycTime_1 = new Date(CycledateTime_1);
                                                        if (PrevCycleDateTime_1.toDateString() != DefDateTime_1.toDateString()) {
                                                            var diff = (cycTime_1.getTime() - PrevCycleDateTime_1.getTime());
                                                            if (diff > 0) {
                                                                TotCycTime_1 = TotCycTime_1 + diff;
                                                                details[intCnt]["CYCLE_TIME"] = _this.GetTimeString(diff);
                                                            }
                                                        }
                                                        //var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
                                                        PrevCycleDateTime_1 = cycTime_1;
                                                    }
                                                }
                                                var newTotRow = Object.assign({}, details[0]);
                                                newTotRow["CYCLE_TIME"] = _this.GetTimeString(TotCycTime_1);
                                                newTotRow["STATUS_MESSAGE"] = "Total Cycle Time";
                                                newTotRow["STATUS_TIME"] = "";
                                                newTotRow["STATUS_USER"] = "";
                                                newTotRow["RECEPIENT"] = "";
                                                newTotRow["DELIVERY_LOCATION"] = "";
                                                newTotRow["SIGNATURE"] = "";
                                                details.push(newTotRow);
                                                header.DETAILS = details;
                                                repItem = new VM_DELV_PO_COMMENTS_1.VM_DELV_PO_COMMENTS();
                                                repItemlst = new linqts_1.List();
                                                repItem.HEADER_COMMENTS = details[0].HDR_COMMENTS;
                                                repItem.LINE_COMMENTS = details[0].COMMENTS;
                                                if (details[0].HDR_COMMENTS == "") {
                                                    header.SHOW_PO_COMMENTS = false;
                                                }
                                                else {
                                                    header.SHOW_PO_COMMENTS = true;
                                                }
                                                if (details[0].COMMENTS == "") {
                                                    header.SHOW_LINE_COMMENTS = false;
                                                }
                                                else {
                                                    header.SHOW_LINE_COMMENTS = true;
                                                }
                                                repItemlst.Add(repItem);
                                                header.POCOMMENTS = repItemlst.ToArray();
                                                var delAttempts = _this.deliverAttempts.filter(function (attempt) { return attempt.TRANSACTION_ID == header.TRANSACTION_ID; });
                                                header.ATTEMPTS = delAttempts;
                                                if (delAttempts.length > 0) {
                                                    header.showAttempts = true;
                                                }
                                                else {
                                                    header.showAttempts = false;
                                                }
                                            });
                                            if (_this.recordsPerPageSize == 0) {
                                                _this.deliverDetailRows = _this.deliverHeaders.length;
                                            }
                                            else {
                                                _this.deliverDetailRows = _this.recordsPerPageSize;
                                            }
                                            break;
                                        }
                                    case AtParEnums_2.StatusType.Warn:
                                        {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.onDeliverFilterData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    //  this.lstChargesFilterData = data;
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    DeliveryReportComponent.prototype.addDays = function (theDate, days) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)];
            });
        });
    };
    DeliveryReportComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.spinnerService.stop();
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    DeliveryReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        blob = new Blob([html], {
                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                        });
                        file_saver_1.saveAs(blob, "DeliveryReport.xls");
                        return [3 /*break*/, 4];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6);
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.GetTimeString = function (millseconds) {
        var seconds = Math.floor(millseconds / 1000);
        var scndstr;
        var hourstr;
        var minutesstr;
        scndstr = "";
        hourstr = "";
        minutesstr = "";
        var h = 3600;
        var m = 60;
        var hours = Math.floor(seconds / h);
        var minutes = Math.floor((seconds % h) / m);
        var scnds = Math.floor((seconds % m));
        var timeString = '';
        if (scnds < 10) {
            scndstr = "0" + scnds;
        }
        else {
            scndstr = scnds.toString();
        }
        ;
        if (hours < 10) {
            hourstr = "0" + hours;
        }
        else {
            hourstr = hours.toString();
        }
        ;
        if (minutes < 10) {
            minutesstr = "0" + minutes;
        }
        else {
            minutesstr = minutes.toString();
        }
        ;
        timeString = hourstr + ":" + minutesstr + ":" + scndstr;
        return timeString;
    };
    DeliveryReportComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, title, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
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
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.ipAddress = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
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
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 3:
                        _a.sent();
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/assets/images/';
                        title = '""' + "AtparVersion 3.0" + '""';
                        if (!(1 == 1)) return [3 /*break*/, 5];
                        htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                                + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=5 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType == 'Mail') {
                                htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=cid:logo title=Atpar 3><img src=cid:topbg width=82% height=63></TD></TR>";
                            }
                            else {
                                htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></TR>";
                            }
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=3 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding='4'>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Order# - Line#</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>External Tracking#</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Internal Tracking#</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Location - Description</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Dept ID</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Qty</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Uom</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Current Owner</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Item ID</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>MfgItem ID</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Item Description</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Carrier</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Receipt Date</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>PickUp User</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Requestor</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Status</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Vendor Name</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Notes</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Pallet</td>"
                            + "</tr>";
                        return [4 /*yield*/, this.deliverHeaders.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PO_ID + " - " + header.LINE_NO + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.REPORT_DATA_31 + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.REPORT_DATA_3 + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.LOCATION + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.DEPT_ID + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.QTY + "&nbsp;</td>";
                                if (header.UOM == null || header.UOM == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.UOM + "&nbsp;</td>";
                                }
                                if (header.CURRENT_STATUS_USER == null || header.CURRENT_STATUS_USER == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CURRENT_STATUS_USER + "&nbsp;</td>";
                                }
                                if (header.ITEM_ID == null || header.ITEM_ID == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_ID + "&nbsp;</td>";
                                }
                                if (header.MFGITEMID == null || header.MFGITEMID == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.MFGITEMID + "&nbsp;</td>";
                                }
                                htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.REPORT_DATA_8 + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CARRIER_ID + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEIPT_DATE + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PICKUP_USER + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.DELIVERED_TO + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.STATUS_MESSAGE + "(" + header.STATUS_TIME + ")" + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.VENDOR_NAME + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff wrap>&nbsp;" + header.ITEM_NOTES + "&nbsp;</td>";
                                if (header.PALLET == null || header.PALLET == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;" + header.PALLET + "&nbsp;</td>";
                                }
                                htmlBuilder += "</tr>";
                                htmlBuilder += "<tr>"
                                    + "<td colspan='19'> PO Header Comments:" + header.HDR_COMMENTS + "</td></tr>";
                                if (header.DETAILS.length > 0) {
                                    var sigimgserverPath_1 = _this.gstrProtocal + '://' + _this.ipAddress + '/AtPar/AtParWebApi/Uploaded/';
                                    htmlBuilder += "<tr>"
                                        + "<td colspan=19>"
                                        + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding='4'>"
                                        + "<tr bgcolor=#E0E0E0>"
                                        + "<td align=center nowrap width=15%><span class=c3><b>Event</b></span></td>"
                                        + "<td align=center nowrap width=8%><span class=c3><b> Event Date(mm/dd/yyyy) </b></span></td>"
                                        + "<td align=center nowrap width=21%><span class=c3><b>Cycle Time</b></span></td>"
                                        + "<td align=center nowrap width=10%><span class=c3><b>User</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Recepient</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Delivery Location</b></span></td>"
                                        + "<td align=center nowrap width=10%><span class=c3><b>Drop Off </b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Signature</b></span></td>"
                                        + "</tr>";
                                    header.DETAILS.forEach(function (detail) {
                                        htmlBuilder += "<tr>"
                                            + "<td align=left nowrap ><span class=c3>" + detail.STATUS_MESSAGE + "</span></td>"
                                            + "<td align=right nowrap><span class=c3>" + detail.STATUS_TIME + "</span></td>"
                                            + "<td align=left style='mso-number-format:\@;' ><span class=c3>" + detail.CYCLE_TIME + "</span></td>";
                                        if (detail.STATUS_USER == '' || detail.STATUS_USER == null) {
                                            htmlBuilder += "<td align=right nowrap ><span class=c3>&nbsp;</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.STATUS_USER + "</span></td>";
                                        }
                                        if (detail.RECEPIENT == '' || detail.RECEPIENT == null) {
                                            htmlBuilder += "<td align=right nowrap ><span class=c3>&nbsp;</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.RECEPIENT + "</span></td>";
                                        }
                                        if (detail.DELIVERY_LOCATION == '' || detail.DELIVERY_LOCATION == null) {
                                            htmlBuilder += "<td align=right nowrap ><span class=c3>&nbsp;</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.DELIVERY_LOCATION + "</span></td>";
                                        }
                                        if (detail.HANDOVER == '' || detail.HANDOVER == null) {
                                            htmlBuilder += "<td align=right nowrap ><span class=c3>&nbsp;</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.HANDOVER + "</span></td>";
                                        }
                                        if (detail.STATUS_MESSAGE == "Delivered") {
                                            if (reqType == 'Mail') {
                                                if (_this.gSendEmailParamval == "Y") {
                                                    htmlBuilder += "<td align=right nowrap ><img  src=" + sigimgserverPath_1 + header.TRANSACTION_ID + ".jpg ></td>";
                                                }
                                                else {
                                                    htmlBuilder += "<td align=right ><span class=c3></span></td>";
                                                }
                                            }
                                            else {
                                                htmlBuilder += "<td align=right nowrap ><img  src=" + sigimgserverPath_1 + header.TRANSACTION_ID + ".jpg ></td>";
                                            }
                                        }
                                        else {
                                            htmlBuilder += "<td align=right ><span class=c3></span></td>";
                                        }
                                        htmlBuilder += "</tr>";
                                    });
                                    htmlBuilder += "</table>";
                                    htmlBuilder += "<tr>"
                                        + "<td colspan=19> PO Line Comments: " + header.COMMENTS + "</td></tr>"
                                        + "</td>"
                                        + "</tr>";
                                }
                                if (header.ATTEMPTS.length > 0) {
                                    htmlBuilder += "<tr><td colspan=19>"
                                        + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                                        + "<tr bgcolor=#E0E0E0>"
                                        + "<td align=center nowrap width=25%><span class=c3><b>Attempt Date(mm/dd/yyyyy)</b></span></td>"
                                        + "<td align=center nowrap width=75%><span class=c3><b>Comments</b></span></td>"
                                        + "</tr>";
                                    header.ATTEMPTS.forEach(function (attempts) {
                                        htmlBuilder += "<tr>"
                                            + "<td align=center nowrap width=25%><span class=c3>" + attempts.ATTEMPT_DATE + "</span></td>"
                                            + "<td align=center nowrap width=75%><span class=c3>" + attempts.COMMENT + "</td>"
                                            + "</tr>";
                                    });
                                    htmlBuilder += "</table>";
                                    htmlBuilder += "</td></tr>";
                                }
                            })];
                    case 4:
                        _a.sent();
                        htmlBuilder += "</table></Table>";
                        _a.label = 5;
                    case 5: return [4 /*yield*/, htmlBuilder];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7:
                        ex_7 = _a.sent();
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.exportsubReportDetails = function (reqType, transId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, title, deliverPrintDetails, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
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
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.ipAddress = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
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
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 3:
                        _a.sent();
                        // imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/assets/images/';
                        title = '""' + "AtparVersion 3.0" + '""';
                        if (!(1 == 1)) return [3 /*break*/, 5];
                        htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                                + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=5 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType == 'Mail') {
                                htmlBuilder += "<TR height=63><TD align=left bgcolor='#fe9836' colspan=2><IMG height=63  width=18% src=cid:logo title=Atpar 3></TD></TR>";
                            }
                            else {
                                htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></TR>";
                            }
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=3 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Order# - Line#</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>External Tracking#</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Internal Tracking#</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Location - Description</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Dept ID</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Qty</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Uom</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Current Owner</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Item ID</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>MfgItem ID</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Item Description</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Carrier</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Receipt Date</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>PickUp User</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Requestor</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Status</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Vendor Name</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Notes</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Pallet</td>"
                            + "</tr>";
                        deliverPrintDetails = this.deliverHeaders.filter(function (a) { return a.TRANSACTION_ID == transId; });
                        return [4 /*yield*/, deliverPrintDetails.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PO_ID + " - " + header.LINE_NO + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.REPORT_DATA_31 + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.REPORT_DATA_3 + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.LOCATION + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.DEPT_ID + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.QTY + "&nbsp;</td>";
                                if (header.UOM == null || header.UOM == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.UOM + "&nbsp;</td>";
                                }
                                if (header.CURRENT_STATUS_USER == null || header.CURRENT_STATUS_USER == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CURRENT_STATUS_USER + "&nbsp;</td>";
                                }
                                if (header.ITEM_ID == null || header.ITEM_ID == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_ID + "&nbsp;</td>";
                                }
                                if (header.MFGITEMID == null || header.MFGITEMID == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.MFGITEMID + "&nbsp;</td>";
                                }
                                htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.REPORT_DATA_8 + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CARRIER_ID + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEIPT_DATE + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PICKUP_USER + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.DELIVERED_TO + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.STATUS_MESSAGE + "(" + header.STATUS_TIME + ")" + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.VENDOR_NAME + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff wrap>&nbsp;" + header.ITEM_NOTES + "&nbsp;</td>";
                                if (header.PALLET == null || header.PALLET == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;" + header.PALLET + "&nbsp;</td>";
                                }
                                htmlBuilder += "</tr>";
                                htmlBuilder += "<tr>"
                                    + "<td colspan='19'> PO Header Comments:" + header.HDR_COMMENTS + "</td></tr>";
                                if (header.DETAILS.length > 0) {
                                    var sigimgserverPath_2 = _this.gstrProtocal + '://' + _this.ipAddress + '/AtPar/AtParWebApi/Uploaded/';
                                    htmlBuilder += "<tr>"
                                        + "<td colspan=19>"
                                        + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                                        + "<tr bgcolor=#E0E0E0>"
                                        + "<td align=center nowrap width=15%><span class=c3><b>Event</b></span></td>"
                                        + "<td align=center nowrap width=8%><span class=c3><b> Event Date(mm/dd/yyyy) </b></span></td>"
                                        + "<td align=center nowrap width=21%><span class=c3><b>Cycle Time</b></span></td>"
                                        + "<td align=center nowrap width=10%><span class=c3><b>User</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Recepient</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Delivery Location</b></span></td>"
                                        + "<td align=center nowrap width=10%><span class=c3><b>Drop Off </b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Signature</b></span></td>"
                                        + "</tr>";
                                    header.DETAILS.forEach(function (detail) {
                                        htmlBuilder += "<tr>"
                                            + "<td align=left nowrap ><span class=c3>" + detail.STATUS_MESSAGE + "</span></td>"
                                            + "<td align=right nowrap><span class=c3>" + detail.STATUS_TIME + "</span></td>"
                                            + "<td align=left style='mso-number-format:\@;' ><span class=c3>" + detail.CYCLE_TIME + "</span></td>";
                                        if (detail.STATUS_USER == '' || detail.STATUS_USER == null) {
                                            htmlBuilder += "<td align=right nowrap ><span class=c3>&nbsp;</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.STATUS_USER + "</span></td>";
                                        }
                                        if (detail.RECEPIENT == '' || detail.RECEPIENT == null) {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>&nbsp;</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.RECEPIENT + "</span></td>";
                                        }
                                        if (detail.DELIVERY_LOCATION == '' || detail.DELIVERY_LOCATION == null) {
                                            htmlBuilder += "<td align=right nowrap ><span class=c3>&nbsp;</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.DELIVERY_LOCATION + "</span></td>";
                                        }
                                        if (detail.HANDOVER == '' || detail.HANDOVER == null) {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>&nbsp;</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=right nowrap ><span class=c3>" + detail.HANDOVER + "</span></td>";
                                        }
                                        if (detail.STATUS_MESSAGE == "Delivered") {
                                            if (reqType == 'Mail') {
                                                if (_this.gSendEmailParamval == "Y") {
                                                    htmlBuilder += "<td align=right nowrap ><img  src=" + sigimgserverPath_2 + header.TRANSACTION_ID + ".jpg ></td>";
                                                }
                                                else {
                                                    htmlBuilder += "<td align=right ><span class=c3></span></td>";
                                                }
                                            }
                                            else {
                                                htmlBuilder += "<td align=right nowrap ><img  src=" + sigimgserverPath_2 + header.TRANSACTION_ID + ".jpg ></td>";
                                            }
                                        }
                                        else {
                                            htmlBuilder += "<td align=right ><span class=c3></span></td>";
                                        }
                                        htmlBuilder += "</tr>";
                                    });
                                    htmlBuilder += "</table>";
                                    htmlBuilder += "<tr>"
                                        + "<td colspan=19> PO Line Comments: " + header.COMMENTS + "</td></tr>"
                                        + "</td>"
                                        + "</tr>";
                                }
                                if (header.ATTEMPTS.length > 0) {
                                    htmlBuilder += "<tr><td colspan=19>"
                                        + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                                        + "<tr bgcolor=#E0E0E0>"
                                        + "<td align=center nowrap width=25%><span class=c3><b>Attempt Date(mm/dd/yyyyy)</b></span></td>"
                                        + "<td align=center nowrap width=75%><span class=c3><b>Comments</b></span></td>"
                                        + "</tr>";
                                    header.ATTEMPTS.forEach(function (attempts) {
                                        htmlBuilder += "<tr>"
                                            + "<td align=center nowrap width=25%><span class=c3>" + attempts.ATTEMPT_DATE + "</span></td>"
                                            + "<td align=center nowrap width=75%><span class=c3>" + attempts.COMMENT + "</td>"
                                            + "</tr>";
                                    });
                                    htmlBuilder += "</table>";
                                    htmlBuilder += "</td></tr>";
                                }
                            })];
                    case 4:
                        _a.sent();
                        htmlBuilder += "</table></Table>";
                        _a.label = 5;
                    case 5: return [4 /*yield*/, htmlBuilder];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7:
                        ex_8 = _a.sent();
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
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
    DeliveryReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var html, toAddr, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        this.growlMessage = [];
                        this.isMailDialog = false;
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Deliver Report', JSON.stringify(html), this.toMailAddr, '', 'false', AtParEnums_1.MailPriority.Normal.toString(), '')
                                .catch(this.httpService.handleError)
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
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Please Enter To Email Address' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_BODY) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Mail Server is Not Configured! Please Contact Administrator' });
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
                        this.clientErrorMsg(ex_9);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_10;
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
                            mywindow = window.open(document.URL, null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'Deliver - Delivery Report' + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                mywindow.document.close(); // necessary for IE >= 10
                                mywindow.focus(); // necessary for IE >= 10*/                   
                                return [2 /*return*/, true];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10);
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.onSendEventsMailClick = function (event, EventsData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var Transid, html, toAddr, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        Transid = EventsData[0].TRANSACTION_ID;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportsubReportDetails('Mail', Transid)];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        this.growlMessage = [];
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Deliver Report', JSON.stringify(html), this.txtEventsMail, '', 'false', AtParEnums_1.MailPriority.Normal.toString(), '')
                                .catch(this.httpService.handleError)
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
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Please Enter To Email Address' });
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
                        // if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.isMailDialog = false;
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.getOrgParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.getOrgGroupParamValue('DELIVER_SEND_SIGN_IN_MAIL', AtParEnums_3.EnumApps.Deliver, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.gSendEmailParamval = data.DataVariable.toString();
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_12 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 3: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.ngOnDestroy = function () {
        this.deliverHeaders = null;
        this.deliverDetails = null;
        this.deliverAttempts = null;
        this.deliverPoComments = null;
        this.deliverLineComments = null;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.showGrid = null;
        this.spinnerService.stop();
    };
    DeliveryReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'deliver-delivery-report.component.html',
            providers: [HttpService_1.HttpService, api_1.ConfirmationService, atpar_common_service_1.AtParCommonService, deliver_delivery_report_service_1.DeliveryReportServiceComponent],
        }),
        core_2.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            AtParConstants_1.AtParConstants,
            deliver_delivery_report_service_1.DeliveryReportServiceComponent])
    ], DeliveryReportComponent);
    return DeliveryReportComponent;
}());
exports.DeliveryReportComponent = DeliveryReportComponent;
//# sourceMappingURL=deliver-delivery-report.component.js.map