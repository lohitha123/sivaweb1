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
var router_1 = require("@angular/router");
var HttpService_1 = require("../Shared/HttpService");
var api_1 = require("../components/common/api");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var AtParEnums_2 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var file_saver_1 = require("file-saver");
var core_2 = require("@angular/core");
var deliver_track_report_service_component_1 = require("./deliver-track-report.service.component");
var DeliveryTrackingComponent = (function () {
    function DeliveryTrackingComponent(httpService, _http, spinnerService, commonService, atParConstant, route, DeliveryReportSevice) {
        this.httpService = httpService;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.route = route;
        this.DeliveryReportSevice = DeliveryReportSevice;
        //  @ViewChild(DataTable) dataTableComponent: DataTable;
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
        this.mhsicon = "";
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
        this.defDateRange = 10;
        this.deliverDetailRows = 0;
        this.tdExports = true;
        this.plus = true;
        this.blnStatus = false;
        this.blnCurrStatus = false;
        this.pop = false;
        this.isMailDialog = false;
        this.toMailAddr = '';
        this.OrderNo = "";
        this.frmDateParam = "";
        this.toDateParam = "";
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
        this.blnDate = false;
        this.deliverMsg = [];
        this.mhsicon = "assets/images/MHSAtpar.png";
        localStorage.setItem('isDeliverTracking', AtParEnums_1.YesNo_Enum.Y.toString());
    }
    DeliveryTrackingComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var urlFromDate, urlToDate, _a, date, todate;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.spinnerService.start();
                        this.recordsPerPageSize = 10;
                        this.lstPackType = [];
                        this.lstPackType.push({ label: "ALL", value: "0" }, { label: "PO", value: "1" }, { label: "NON PO", value: "2" });
                        this.selectedPackageType = this.lstPackType[0].value;
                        this.lstStatus.push({ label: "Select One", value: "" }, { label: "ALL", value: "ALL" }, { label: "Receive", value: "0" }, { label: "Download", value: "1" }, { label: "PickUp", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Deliver", value: "50" }, { label: "HandOver", value: "100" }, { label: "Cancel", value: "13" });
                        this.selectedStatus = this.lstStatus[1].value;
                        this.lstCurrentStatus.push({ label: "Select One", value: "" }, { label: "ALL", value: "ALL" }, { label: "Receive", value: "0" }, { label: "Download", value: "1" }, { label: "PickUp", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Deliver", value: "50" }, { label: "HandOver", value: "100" }, { label: "Cancel", value: "13" });
                        this.selectedCurrStatus = this.lstCurrentStatus[0].value;
                        this.blnCurrStatus = true;
                        this.getMyPreferences();
                        this.route.queryParams.subscribe(function (params) {
                            _this.systemID = params['systemid'];
                            _this.OrderNo = params['Orderno'];
                            _this.fromDate = new Date();
                            _this.fromDate = params['FromDate'];
                            urlFromDate = params['FromDate'];
                            _this.toDate = new Date();
                            _this.toDate = params['ToDate'];
                            urlToDate = params['ToDate'];
                        });
                        this.growlMessage = [];
                        if (this.systemID == '' || this.systemID == null) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please provide systemid in url to access the report" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        if (!(this.fromDate == undefined || this.toDate == undefined)) return [3 /*break*/, 2];
                        this.currentDate = new Date();
                        this.toDate = new Date();
                        this.fromDate = new Date();
                        if (!(this.defDateRange.toString() != '' && this.defDateRange != null)) return [3 /*break*/, 2];
                        this.spinnerService.stop();
                        _a = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, -this.defDateRange)];
                    case 1:
                        _a.fromDate = _b.sent();
                        _b.label = 2;
                    case 2:
                        date = new Date();
                        todate = new Date(this.toDate);
                        console.log(todate);
                        console.log(date);
                        if (todate > date) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To date must be less than or equal to current date" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        if (this.systemID == null || this.systemID == undefined) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please provide systemid in url to access the report" });
                            this.selectedCurrStatus = "";
                            this.selectedStatus = "";
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        if (!(this.systemID != null)) return [3 /*break*/, 4];
                        if (!(this.systemID.trim() != "")) return [3 /*break*/, 4];
                        // Checks whether the systemid from the query string exists in the DB or not
                        this.systemID = this.systemID.toUpperCase();
                        return [4 /*yield*/, this.DeliveryReportSevice.ValidateSystemID(this.systemID).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                if (data.StatusCode == -1) {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "System Id provided doesn't match with systems installed" });
                                    _this.spinnerService.stop();
                                    return;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success:
                                        {
                                            if (_this.OrderNo == undefined) {
                                                _this.OrderNo = "";
                                            }
                                            console.log(urlFromDate);
                                            console.log(urlToDate);
                                            if (_this.OrderNo !== "" && urlFromDate != undefined && urlToDate != undefined) {
                                                _this.PoId = _this.OrderNo;
                                                _this.blnDate = true;
                                                _this.getDeliveryDetails();
                                                return;
                                            }
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                    case AtParEnums_2.StatusType.Warn:
                                        {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "System Id provided doesn't match with systems installed" });
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryTrackingComponent.prototype.getMyPreferences = function () {
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
    DeliveryTrackingComponent.prototype.show = function () {
        this.plus = !this.plus;
    };
    DeliveryTrackingComponent.prototype.ddlStatusChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.selectedStatus === "") {
                    this.blnCurrStatus = false;
                }
                else {
                    this.blnCurrStatus = true;
                }
                return [2 /*return*/];
            });
        });
    };
    DeliveryTrackingComponent.prototype.ddlCurrentStatusChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.selectedCurrStatus === "") {
                    this.blnStatus = false;
                }
                else {
                    this.blnStatus = true;
                }
                return [2 /*return*/];
            });
        });
    };
    DeliveryTrackingComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.growlMessage = [];
                if (this.orgGroupIDForDBUpdate === this.selectedOrgGroupId) {
                    return [2 /*return*/];
                }
                this.showGrid = false;
                this.showOnAllocateSelection = false;
                if (this.selectedOrgGroupId == "Select One") {
                    return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        });
    };
    DeliveryTrackingComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    DeliveryTrackingComponent.prototype.confirm = function () {
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
            this.clientErrorMsg(ex, "confirm");
        }
    };
    DeliveryTrackingComponent.prototype.BindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.blnDate = false;
                        this.spinnerService.start();
                        if (this.systemID == null || this.systemID == '') {
                            this.growlMessage.push({
                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please provide systemid in url to access the report "
                            });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        if (this.fromDate > this.toDate) {
                            this.growlMessage = [];
                            this.growlMessage.push({
                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Date Range ( mm/dd/yyyy)"
                            });
                            this.spinnerService.stop();
                            this.showGrid = false;
                            return [2 /*return*/];
                        }
                        if (this.TrackingNo == undefined) {
                            this.TrackingNo = "";
                        }
                        if (this.PoId == undefined) {
                            this.PoId = "";
                        }
                        if (this.DeptId == undefined) {
                            this.DeptId = "";
                        }
                        if (this.VendorName == undefined) {
                            this.VendorName = "";
                        }
                        if (this.ItemId == undefined) {
                            this.ItemId = "";
                        }
                        if (this.ItmDesc == undefined) {
                            this.ItmDesc = "";
                        }
                        if (this.Carrier == undefined) {
                            this.Carrier = "";
                        }
                        if (this.Loc == undefined) {
                            this.Loc = "";
                        }
                        if (this.LocDescr == undefined) {
                            this.LocDescr = "";
                        }
                        if (this.DeliverTo == undefined) {
                            this.DeliverTo = "";
                        }
                        if (this.Requestor == undefined) {
                            this.Requestor = "";
                        }
                        if (this.selectedCurrStatus === "" && this.selectedStatus === "") {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select either Status/Current Status" });
                            this.showGrid = false;
                            return [2 /*return*/];
                        }
                        if (this.TrackingNo === "" && this.PoId === "" && this.DeptId === "" && this.VendorName === "" && this.ItemId === "" && this.ItmDesc === "" && this.Carrier === "" && this.Loc === "" && this.LocDescr === "" && this.DeliverTo === "" && this.Requestor === "") {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter value for one of the key fields (Tracking No, Order No, Dept ID, Vendor Name,ItemID,Item Description,Carrier ID,Recipient,Requestor,Location,Location Description)" });
                            this.showGrid = false;
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
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
                        this.showGrid = true;
                        return [4 /*yield*/, this.getDeliveryDetails()];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "BindDataGrid");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryTrackingComponent.prototype.validateSearchFields = function () {
        this.pop = false;
        this.growlMessage = [];
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
            this.clientErrorMsg(ex, "validateSearchFields");
        }
    };
    DeliveryTrackingComponent.prototype.getDeliveryDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var Fdate, Tdate, presentDate, todate, repItemlst, repItem, DefDateTime_1, StausDateTime, CycledateTime_1, PrevCycleDateTime_1, cycTime_1, TotCycTime_1, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.blnDate == true) {
                            Fdate = this.convertDateFormate(this.fromDate);
                            Tdate = this.convertDateFormate(this.toDate);
                        }
                        else {
                            Fdate = this.convertDateFormate(this.fromDate);
                            Tdate = this.convertDateFormate(this.toDate);
                        }
                        presentDate = new Date();
                        if (this.fromDate > presentDate) {
                            this.showGrid = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date must be less than or equal to current date" });
                            return [2 /*return*/];
                        }
                        todate = new Date(this.toDate);
                        if (todate > presentDate) {
                            this.showGrid = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date must be less than or equal to current date" });
                            return [2 /*return*/];
                        }
                        StausDateTime = void 0;
                        DefDateTime_1 = new Date("1/1/0001 12:00:00 AM");
                        this.deliverHeaders = [];
                        this.deliverDetails = [];
                        this.deliverAttempts = [];
                        this.showexport = false;
                        this.showGrid = false;
                        return [4 /*yield*/, this.DeliveryReportSevice.GetDeliveryTrackingReportData(this.TrackingNo, this.PoId, this.DeptId, Fdate, Tdate, this.VendorName, this.ItmDesc, this.ItemId, this.Carrier, this.Loc, this.Requestor, this.DeliverTo, this.Status, this.CurrStatus, this.systemID, this.LocDescr)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success:
                                        {
                                            _this.showGrid = true;
                                            _this.deliverHeaders = [];
                                            _this.deliverHeaders = data.DataDictionary["pDsDetails"]["HEADERS"];
                                            _this.deliverDetails = data.DataDictionary["pDsDetails"]["DETAILS"];
                                            _this.deliverAttempts = data.DataDictionary["pDsDataArrayAttempt"]["ATTEMPTS"];
                                            console.log(_this.deliverHeaders.length);
                                            //this.deliverMsg = [];
                                            _this.deliverHeaders.forEach(function (header) {
                                                var details = _this.deliverDetails.filter(function (detail) { return detail.TRANSACTION_ID == header.TRANSACTION_ID; });
                                                _this.showexport = true;
                                                TotCycTime_1 = 0;
                                                PrevCycleDateTime_1 = new Date("1/1/0001 12:00:00 AM");
                                                if (details.length > 0) {
                                                    var delvmessage = void 0;
                                                    for (var intCnt = 0; intCnt <= details.length - 1; intCnt++) {
                                                        details[intCnt]["CYCLE_TIME"] = "";
                                                        CycledateTime_1 = details[intCnt]["EVENT_DATE"];
                                                        cycTime_1 = new Date(CycledateTime_1);
                                                        if (PrevCycleDateTime_1.toDateString() != DefDateTime_1.toDateString()) {
                                                            var diff = (cycTime_1.getTime() - PrevCycleDateTime_1.getTime());
                                                            if (diff > 0) {
                                                                TotCycTime_1 = TotCycTime_1 + diff;
                                                                details[intCnt]["CYCLE_TIME"] = _this.GetTimeString(diff);
                                                            }
                                                        }
                                                        PrevCycleDateTime_1 = cycTime_1;
                                                        if (details[intCnt]["EVENT_STATUS_MESSAGE"] == "Delivered") {
                                                            //this.deliverMsg.push(details[intCnt]["EVENT_USER"].toString() + " has Delivered goods on " + details[intCnt]["EVENT_DATE"].toString());
                                                            header.DeliverMsg = details[intCnt]["EVENT_USER"].toString() + " has Delivered goods on " + details[intCnt]["EVENT_DATE"].toString();
                                                        }
                                                        console.log(_this.deliverMsg);
                                                    }
                                                }
                                                header.DETAILS = details;
                                                console.log(header.DETAILS);
                                                var delAttempts = _this.deliverAttempts.filter(function (attempt) { return attempt.TRANSACTION_ID == header.TRANSACTION_ID; });
                                                header.ATTEMPTS = delAttempts;
                                                if (delAttempts.length > 0) {
                                                    header.showAttempts = true;
                                                }
                                                else {
                                                    header.showAttempts = false;
                                                }
                                            });
                                            //if (this.deliverMsg.length > 0) {
                                            //    for (let i = 0; i <= this.deliverMsg.length - 1; i++) {
                                            //        this.deliverHeaders[i].DeliverMsg = this.deliverMsg[i];
                                            //    }
                                            //}
                                            if (_this.recordsPerPageSize == 0) {
                                                _this.deliverDetailRows = _this.deliverHeaders.length;
                                            }
                                            else {
                                                _this.deliverDetailRows = _this.recordsPerPageSize;
                                            }
                                            console.log(_this.deliverHeaders);
                                            break;
                                        }
                                    case AtParEnums_2.StatusType.Warn:
                                        {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'custom', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "getDeliveryDetails");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryTrackingComponent.prototype.onDeliverFilterData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    //  this.lstChargesFilterData = data;
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "onDeliverFilterData");
                }
                return [2 /*return*/];
            });
        });
    };
    DeliveryTrackingComponent.prototype.addDays = function (theDate, days) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)];
            });
        });
    };
    DeliveryTrackingComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    DeliveryTrackingComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_4;
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
                            file_saver_1.saveAs(blob, "DeliveryReport.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "onExportToExcelClick");
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryTrackingComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        this.growlMessage = [];
                        return [4 /*yield*/, this.exportReportDetails('Print')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'Deliver Tracking Report' + '</title>');
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
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, 'onPrintClick');
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryTrackingComponent.prototype.GetTimeString = function (millseconds) {
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
    DeliveryTrackingComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath_1, imgSignaturePath_1, title, ex_6;
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
                        imgserverPath_1 = '';
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
                        //imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';
                        imgserverPath_1 = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgSignaturePath_1 = '';
                        imgSignaturePath_1 = this.httpService.BaseUrl + '/Uploaded/';
                        title = '""' + "AtparVersion 3.0" + '""';
                        if (!(1 == 1)) return [3 /*break*/, 5];
                        htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath_1 + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath_1 + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath_1 + "topbg.jpg width=100% height=63></td></TR>"
                                + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=5 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath_1 + "print.jpg></A>";
                        }
                        else {
                            if (reqType == 'Mail') {
                                htmlBuilder += "<TR height=63><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath_1 + "logo.jpg></td></TR>";
                            }
                            else {
                                htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath_1 + "logo.jpg title=Atpar 3><img src=" + imgserverPath_1 + "topbg.jpg width=82% height=63></TD></TR>";
                            }
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=3 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "BORDER-COLLAPSE:collapse" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Order# - Line#</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>External Tracking#</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Internal Tracking#</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Item ID - Item Description</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Location</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Qty-Uom</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>MfgItem ID</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Dept ID</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Carrier ID</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Receipt Date</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Requestor</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Status(Event Time)</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Current Owner</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>PickUp User</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Vendor Name</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Employee Name</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Notes</td>"
                            + "</tr>";
                        console.log(this.deliverHeaders);
                        return [4 /*yield*/, this.deliverHeaders.forEach(function (header) {
                                if (header.ITEM_DESC == undefined || header.ITEM_DESC === " ") {
                                    header.ITEM_DESC = "";
                                }
                                if (header.MFGITEMID == undefined) {
                                    header.MFGITEMID = "";
                                }
                                htmlBuilder += "<tr>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PO_ID + " - " + header.LINE + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.EXTTRACKING + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.INTTRACKING + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_ID + " - " + header.ITEM_DESC + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.LOCATION + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.QTY + " - " + header.UOM + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.MFGITEMID + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.DEPT_ID + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CARRIER_ID + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEIPT_DATE + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff wrap>&nbsp;" + header.RECEPIENT + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.STATUS_MESSAGE + "(" + header.UPDATE_DATE + ")" + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.USER_ID + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEIVE_USERID + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.VENDOR + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEIVER_NAME + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_NOTES + "&nbsp;</td>"
                                    + "</tr>";
                                if (header.DETAILS.length > 0) {
                                    imgserverPath_1 = "C:\\2.8_Web\\UserInterface\\AtPar.Web\\Images\\";
                                    htmlBuilder += "<tr>"
                                        + "<td colspan=7>"
                                        + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                                        + "<tr bgcolor=#E0E0E0>"
                                        + "<td align=center nowrap width=15%><span class=c3><b>Event</b></span></td>"
                                        + "<td align=center nowrap width=8%><span class=c3><b> Event Date(mm/dd/yyyy) </b></span></td>"
                                        + "<td align=center nowrap width=21%><span class=c3><b>Cycle Time</b></span></td>"
                                        + "<td align=center nowrap width=10%><span class=c3><b>User</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Delivery Location</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Signature</b></span></td>"
                                        + "</tr>";
                                    header.DETAILS.forEach(function (detail) {
                                        htmlBuilder += "<tr>"
                                            + "<td align=left nowrap ><span class=c3>" + detail.EVENT_STATUS_MESSAGE + "</span></td>"
                                            + "<td align=right nowrap><span class=c3>" + detail.EVENT_DATE + "</span></td>"
                                            + "<td align=left style='mso-number-format:\@;' ><span class=c3>" + detail.CYCLE_TIME + "</span></td>"
                                            + "<td align=right nowrap ><span class=c3>" + detail.EVENT_USER + "</span></td>";
                                        +"<td align=left nowrap><span class=c3>" + detail.DELIVERY_LOCATION + "</span></td>";
                                        if (detail.STATUS_MESSAGE == "Delivered ") {
                                            htmlBuilder += "<td align=right nowrap ><span class=c3>" + imgSignaturePath_1 + detail.SIGNATURE + ".jpg" + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=right Delivered ><span class=c3></span></td>";
                                        }
                                        htmlBuilder += "</tr>";
                                    });
                                    htmlBuilder += "</table>";
                                }
                            })];
                    case 4:
                        _a.sent();
                        htmlBuilder += "</table></Table>";
                        _a.label = 5;
                    case 5: return [4 /*yield*/, htmlBuilder];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7:
                        ex_6 = _a.sent();
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryTrackingComponent.prototype.exportsubReportDetails = function (reqType, transId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath_2, title, deliverPrintDetails, ex_7;
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
                        imgserverPath_2 = '';
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
                        imgserverPath_2 = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        title = '""' + "AtparVersion 3.0" + '""';
                        if (!(1 == 1)) return [3 /*break*/, 5];
                        htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath_2 + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath_2 + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath_2 + "topbg.jpg width=100% height=63></td></TR>"
                                + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=5 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:printWindow()" + "" + "><img src=" + imgserverPath_2 + "print.jpg></A>";
                        }
                        else {
                            if (reqType == 'Mail') {
                                htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=cid:logo title=Atpar 3><img src=cid:topbg width=82% height=63></TD></TR>";
                            }
                            else {
                                htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath_2 + "logo.jpg title=Atpar 3><img src=" + imgserverPath_2 + "topbg.jpg width=82% height=63></TD></TR>";
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
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Item ID - Item Description</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Location</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Qty - Uom</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>MfgItem ID</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Dept ID</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Carrier ID</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Receipt Date</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Requestor</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Status(Event Time)</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Current Owner</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>PickUp User</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Vendor Name</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Employee Name</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Notes</td>"
                            + "</tr>";
                        deliverPrintDetails = this.deliverHeaders.filter(function (a) { return a.TRANSACTION_ID == transId; });
                        return [4 /*yield*/, deliverPrintDetails.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PO_ID + " - " + header.LINE_NO + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.EXTTRACKING + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.INTTRACKING + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_ID + " - " + header.ITEM_DESC + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.LOCATION + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.QTY + " - " + header.UOM + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.MFG_ITEM_ID + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.DEPT_ID + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CARRIER_ID + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEIPT_DATE + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEPIENT + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.STATUS_MESSAGE + "(" + header.UPDATE_DATE + ")" + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.USER_ID + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEIVE_USERID + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.VENDOR + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEIVER_NAME + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff wrap>&nbsp;" + header.ITEM_NOTES + "&nbsp;</td>"
                                    + "</tr>";
                                //htmlBuilder += "<tr>"
                                //    + "<td colspan='19'> PO Header Comments:" + header.HDR_COMMENTS + "</td></tr>"
                                if (header.DETAILS.length > 0) {
                                    imgserverPath_2 = "C:\\2.8_Web\\UserInterface\\AtPar.Web\\Images\\";
                                    htmlBuilder += "<tr>"
                                        + "<td colspan=7>"
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
                                            + "<td align=left nowrap ><span class=c3>" + detail.EVENT_STATUS_MESSAGE + "</span></td>"
                                            + "<td align=right nowrap><span class=c3>" + detail.EVENT_DATE + "</span></td>"
                                            + "<td align=right nowrap ><span class=c3>" + detail.EVENT_USER + "</span></td>";
                                        +"<td align=left nowrap><span class=c3>" + detail.DELIVERY_LOCATION + "</span></td>";
                                        if (detail.STATUS_MESSAGE == "Delivered ") {
                                            htmlBuilder += "<td align=right nowrap ><span class=c3>" + imgserverPath_2 + header.TRANSACTION_ID + ".jpg" + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=right Delivered ><span class=c3></span></td>";
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
    DeliveryTrackingComponent.prototype.onSendMailIconClick = function (event) {
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
    DeliveryTrackingComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_8;
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
                        this.growlMessage = [];
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Deliver Track Report', JSON.stringify(html), this.toMailAddr, AtParEnums_1.MailPriority.Normal.toString(), '')
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
                        // if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.isMailDialog = false;
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "onSendMailClick");
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryTrackingComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    DeliveryTrackingComponent.prototype.onSendEventsMailClick = function (event, EventsData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var Transid, html, toAddr, ex_9;
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
                        // if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.isMailDialog = false;
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "onSendEventsMailClick");
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryTrackingComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    DeliveryTrackingComponent = __decorate([
        core_1.Component({
            //moduleId: module.id,
            templateUrl: 'deliver-track-report.component.html',
            providers: [HttpService_1.HttpService, api_1.ConfirmationService, atpar_common_service_1.AtParCommonService, deliver_track_report_service_component_1.DeliveryTrackReportServiceComponent],
        }),
        core_2.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            AtParConstants_1.AtParConstants,
            router_1.ActivatedRoute,
            deliver_track_report_service_component_1.DeliveryTrackReportServiceComponent])
    ], DeliveryTrackingComponent);
    return DeliveryTrackingComponent;
}());
exports.DeliveryTrackingComponent = DeliveryTrackingComponent;
//# sourceMappingURL=deliver-track-report.component.js.map