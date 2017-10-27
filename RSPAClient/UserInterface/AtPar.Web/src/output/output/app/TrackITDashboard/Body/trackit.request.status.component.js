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
var datatableservice_1 = require("../../components/datatable/datatableservice");
var employee_1 = require("../../components/datatable/employee");
/**
*	Import Components.
*/
var AtParSharedDataService_1 = require("../../Shared/AtParSharedDataService");
var tkithttpservice_1 = require("../../Shared/tkithttpservice");
var AtParEnums_1 = require("../../Shared/AtParEnums");
var atpar_trackit_common_service_1 = require("../../Shared/atpar-trackit-common.service");
var api_1 = require("../../components/common/api");
var platform_browser_1 = require("@angular/platform-browser");
var event_spinner_service_1 = require("../../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../../Shared/AtParConstants");
var trackit_request_status_service_1 = require("./trackit.request.status.service");
var RequestStatusComponent = (function () {
    function RequestStatusComponent(dataservice, spnrService, httpService, atParConstant, commonService, title, tkitReqstStatusService, confirmationService) {
        this.dataservice = dataservice;
        this.spnrService = spnrService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.commonService = commonService;
        this.title = title;
        this.tkitReqstStatusService = tkitReqstStatusService;
        this.confirmationService = confirmationService;
        this.pop = false;
        this.table = false;
        this.page = true;
        this.form = false;
        this.editform = false;
        this.loading = true;
        this.minDateValue1 = new Date();
        //Variables
        this.deviceTokenEntry = [];
        this.statusMsgs = [];
        this.selectedStatus = "Select Status";
        this.selectedRequest = "Select RequestID";
        this.previousRequest = "";
        this.lblOrderComments = "";
        this.lblReqNumber = "";
        this.lblReqDate = "";
        this.searchStatus = "";
        this.statusCode = -1;
        this.txtFrmDate = new Date();
        this.txtToDate = new Date();
        this.currentDate = new Date();
        this.currentFromDate = new Date();
        this.btnUpdateItems = true;
        this.blnErDateTime = true;
        this.chkRemoveValue = false;
        this.imgBasePath = "";
        this.title.setTitle('TrackIT - Request Status');
        this.lstTkitOrderDetails = [];
        this.ven = new employee_1.Employee();
    }
    RequestStatusComponent.prototype.add = function () {
        this.form = true;
        this.editform = false;
        this.page = false;
        this.pop = false;
    };
    RequestStatusComponent.prototype.tbl = function () {
        this.form = false;
        this.editform = false;
        this.page = false;
        this.pop = false;
        this.table = true;
    };
    RequestStatusComponent.prototype.edit = function () {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    };
    RequestStatusComponent.prototype.save = function () {
        this.editform = false;
    };
    RequestStatusComponent.prototype.close = function () {
        this.form = false;
        this.page = true;
        this.pop = true;
        this.editform = false;
        this.table = false;
    };
    RequestStatusComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("tkitDeviceTokenEntry"));
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.currentFromDate = new Date();
                        this.ddlStatusLst = [];
                        this.ddlStatusLst.push({ label: "ALL", value: "" });
                        this.ddlStatusLst.push({ label: "OPEN", value: "OPEN" });
                        this.ddlStatusLst.push({ label: "PICK", value: "PICK" });
                        this.ddlStatusLst.push({ label: "LOAD", value: "LOAD" });
                        this.ddlStatusLst.push({ label: "UNLOAD", value: "UNLOAD" });
                        this.ddlStatusLst.push({ label: "DELIVERED", value: "DELV" });
                        this.ddlStatusLst.push({ label: "CANCELLED", value: "CANCELLED" });
                        return [4 /*yield*/, this.page_Load()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.setImgPath()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RequestStatusComponent.prototype.setImgPath = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commonService.getServerIP()
                            .catch(this.httpService.handleError)
                            .then(function (res) {
                            var data = res.json();
                            switch (data.StatType) {
                                case AtParEnums_1.StatusType.Success: {
                                    _this.ipAddress = data.DataVariable.toString();
                                    break;
                                }
                                case AtParEnums_1.StatusType.Error: {
                                    _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_1.StatusType.Warn: {
                                    _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_1.StatusType.Custom: {
                                    _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    break;
                                }
                            }
                            //if (data.StatType != StatusType.Success) {
                            //    html = '';
                            //    return html;
                            //}
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.commonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.statusMsgs = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                //if (data.StatType != StatusType.Success) {
                                //    html = '';
                                //    return html;
                                //}
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RequestStatusComponent.prototype.page_Load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var defDuration_1, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        defDuration_1 = 0;
                        this.pop = false;
                        this.table = false;
                        this.lstTkitOrderDetails = [];
                        this.ddlSelectRequest = [];
                        this.selectedRequest = "Select RequestID";
                        this.ddlSelectStatus = [];
                        this.ddlSelectStatus.push({ label: "Select Status", value: "Select Status" });
                        this.ddlSelectStatus.push({ label: "All", value: "All" });
                        this.ddlSelectStatus.push({ label: "Open", value: "Open" });
                        this.ddlSelectStatus.push({ label: "Pick", value: "Pick" });
                        this.ddlSelectStatus.push({ label: "Load", value: "Load" });
                        this.ddlSelectStatus.push({ label: "Unload", value: "Unload" });
                        this.ddlSelectStatus.push({ label: "Delivered", value: "Delivered" });
                        this.ddlSelectStatus.push({ label: "Cancelled", value: "Cancelled" });
                        return [4 /*yield*/, this.tkitReqstStatusService.getTkitMyPreferences("DEFAULT_REPORT_DURATION", this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString()).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataVariable != null && data.DataVariable != "") {
                                            defDuration_1 = parseInt(data.DataVariable.toString());
                                        }
                                        _this.statusCode = data.StatusCode;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusCode = data.StatusCode;
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusCode = data.StatusCode;
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusCode = data.StatusCode;
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.currentFromDate = new Date();
                        this.currentFromDate.setDate(this.currentFromDate.getDate() - defDuration_1);
                        this.txtFrmDate = (this.currentFromDate.getMonth() + 1) + '/' + (this.currentFromDate.getDate()) + '/' + this.currentFromDate.getFullYear();
                        this.txtToDate = (this.currentDate.getMonth() + 1) + '/' + (this.currentDate.getDate()) + '/' + this.currentDate.getFullYear();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "page_Load");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestStatusComponent.prototype.ddlStatus_selectChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.statusMsgs = [];
                        if (!(event != null)) return [3 /*break*/, 2];
                        this.selectedStatus = event.label;
                        return [4 /*yield*/, this.page_Load()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "ddlStatus_selectChanged");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RequestStatusComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toDate, fromDate, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        this.pop = false;
                        this.table = false;
                        this.lstTkitOrderDetails = [];
                        this.ddlSelectRequest = [];
                        this.selectedRequest = "Select RequestID";
                        this.currentFromDate = new Date();
                        if (this.selectedStatus == "Select Status" || this.selectedStatus == "") {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid status" });
                            return [2 /*return*/];
                        }
                        if (this.txtFrmDate == null || this.txtToDate == null) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select a valid date range" });
                            return [2 /*return*/];
                        }
                        else if (this.txtToDate != "" && this.txtFrmDate != "") {
                            toDate = new Date(this.txtToDate);
                            toDate.setHours(0, 0, 0, 0);
                            this.currentDate.setHours(0, 0, 0, 0);
                            fromDate = new Date(this.txtFrmDate);
                            fromDate.setHours(0, 0, 0, 0);
                            if (toDate > this.currentDate) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Todate must be less than or equal to current date" });
                                return [2 /*return*/];
                            }
                            if (fromDate > toDate) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "FromDate must be less than Todate" });
                                return [2 /*return*/];
                            }
                        }
                        this.txtFrmDate = (fromDate.getMonth() + 1) + '/' + fromDate.getDate() + '/' + fromDate.getFullYear();
                        this.txtToDate = (toDate.getMonth() + 1) + '/' + toDate.getDate() + '/' + toDate.getFullYear();
                        return [4 /*yield*/, this.populateOrderIDs(this.txtFrmDate, this.txtToDate, this.selectedStatus)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "btnGo_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestStatusComponent.prototype.ddlRequest_selectChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    if (event != null) {
                        this.selectedRequest = event.label;
                        if (this.selectedRequest != this.previousRequest && this.lstTkitOrderDetails != null && this.lstTkitOrderDetails.length > 0) {
                            this.table = false;
                        }
                        else if (this.selectedRequest == this.previousRequest && this.lstTkitOrderDetails != null && this.lstTkitOrderDetails.length > 0) {
                            this.table = true;
                        }
                        else if (this.lstTkitOrderDetails == null) {
                            this.table = false;
                        }
                        this.previousRequest = event.label;
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "ddlRequest_selectChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    RequestStatusComponent.prototype.btnShowDetails_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        this.lstTkitOrderDetails = [];
                        this.table = false;
                        this.btnUpdateItems = true;
                        this.blnErDateTime = true;
                        this.imgBasePath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/Web/Uploaded';
                        if (this.selectedRequest == "Select RequestID" || this.selectedRequest == "" ||
                            this.selectedRequest == undefined) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid RequestID" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.tkitReqstStatusService.getOrderDetails(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString(), this.selectedStatus, this.selectedRequest).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstTkitOrderDetails = data.DataList;
                                        if (_this.lstTkitOrderDetails != null && _this.lstTkitOrderDetails.length > 0) {
                                            _this.table = true;
                                            //Code to display Req no:
                                            _this.lblReqNumber = _this.selectedRequest;
                                            _this.lblOrderComments = _this.lstTkitOrderDetails[0].ORDER_COMMENTS;
                                            var dateStr = new Date(_this.lstTkitOrderDetails[0].ORDER_DATE).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                            _this.lblReqDate = dateStr.replace(',', '');
                                            if (_this.lstTkitOrderDetails.length == 1 &&
                                                _this.lstTkitOrderDetails[0].DELIVER_ITEM_STATUS == AtParEnums_1.enum_TKIT_OrderStatus[AtParEnums_1.enum_TKIT_OrderStatus.Cancelled].toString().toUpperCase()) {
                                                _this.btnUpdateItems = false;
                                            }
                                            //this.requestDetailsVisibility(true);
                                            for (var i = 0; i < _this.lstTkitOrderDetails.length; i++) {
                                                _this.lstTkitOrderDetails[i].blnErDateTime = true;
                                                if (_this.lstTkitOrderDetails[i].IMAGE != null && _this.lstTkitOrderDetails[i].IMAGE != "") {
                                                    _this.lstTkitOrderDetails[i].IMAGE = _this.imgBasePath + '/' + _this.lstTkitOrderDetails[i].IMAGE;
                                                    //this.lstTkitOrderDetails[i].IMAGE = this.httpService.BaseUrl + '/Uploaded/' + this.lstTkitOrderDetails[i].IMAGE;
                                                }
                                                if (_this.lstTkitOrderDetails[i].ITEM_TYPE_INDICATOR == "F") {
                                                    _this.lstTkitOrderDetails[i].blnErDateTime = false;
                                                }
                                                if (_this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS != null &&
                                                    _this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS != "") {
                                                    if (_this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS.toUpperCase() == AtParEnums_1.enum_TKIT_OrderStatus[AtParEnums_1.enum_TKIT_OrderStatus.Cancelled].toString().toUpperCase() ||
                                                        _this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS.toUpperCase() == AtParEnums_1.enum_TKIT_OrderStatus[AtParEnums_1.enum_TKIT_OrderStatus.Delivered].toString().toUpperCase() ||
                                                        _this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS.toUpperCase() == "DELV") {
                                                        _this.lstTkitOrderDetails[i].CHKDisable = true;
                                                    }
                                                    else {
                                                        _this.lstTkitOrderDetails[i].CHKDisable = false;
                                                    }
                                                    if (_this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS.toUpperCase() == AtParEnums_1.enum_TKIT_OrderStatus[AtParEnums_1.enum_TKIT_OrderStatus.Delivered].toString().toUpperCase() ||
                                                        _this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS.toUpperCase() == "DELV") {
                                                        _this.lstTkitOrderDetails[i].blnErDateTime = true;
                                                    }
                                                }
                                            }
                                            if (_this.lblOrderComments == "") {
                                                //trOrderComments.Visible = false;
                                            }
                                        }
                                        else {
                                            // this.requestDetailsVisibility(false);
                                        }
                                        _this.statusCode = data.StatusCode;
                                        _this.table = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusCode = data.StatusCode;
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusCode = data.StatusCode;
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusCode = data.StatusCode;
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "btnShowDetails_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestStatusComponent.prototype.chkChanged = function (rowData, event) {
        try {
            this.statusMsgs = [];
            if (event != null) {
                rowData.CHK_VALUE = event;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "chkChanged");
        }
    };
    RequestStatusComponent.prototype.btnUpdateItems_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.statusCode = -1;
                    this.statusMsgs = [];
                    this.confirmationService.confirm({
                        message: "Are you sure you want to update the changes?",
                        accept: function () { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            var i, dateStr, erDateTime;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        for (i = 0; i < this.lstTkitOrderDetails.length; i++) {
                                            if (this.lstTkitOrderDetails[i].CHK_VALUE == true) {
                                                this.lstTkitOrderDetails[i].CHK_VALUE = "1";
                                            }
                                            else {
                                                this.lstTkitOrderDetails[i].CHK_VALUE = "0";
                                            }
                                            dateStr = new Date(this.lstTkitOrderDetails[i].ESTIMATED_RETURN_DATE).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                            this.lstTkitOrderDetails[i].ESTIMATED_RETURN_DATE = dateStr.replace(',', '');
                                            if (this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS != null && this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS != "") {
                                                if (this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS.toUpperCase() == "DELV") {
                                                    erDateTime = new Date(this.lstTkitOrderDetails[i].ESTIMATED_RETURN_DATE);
                                                    erDateTime.setHours(0, 0, 0, 0);
                                                    this.currentDate = new Date();
                                                    this.currentDate.setHours(0, 0, 0, 0);
                                                    if (erDateTime < this.currentDate) {
                                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Change Return Date should be greater than Current Date" });
                                                        return [2 /*return*/];
                                                    }
                                                }
                                            }
                                        }
                                        return [4 /*yield*/, this.tkitReqstStatusService.updateOrder(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString(), this.selectedStatus, this.lstTkitOrderDetails).
                                                catch(this.httpService.handleError).then(function (res) {
                                                var data = res.json();
                                                _this.statusCode = data.StatusCode;
                                                switch (data.StatType) {
                                                    case AtParEnums_1.StatusType.Success: {
                                                        var msg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "").replace("2%", "");
                                                        _this.statusMsgs.push({
                                                            severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg
                                                        });
                                                        _this.table = false;
                                                        _this.spnrService.stop();
                                                        break;
                                                    }
                                                    case AtParEnums_1.StatusType.Warn: {
                                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                        _this.spnrService.stop();
                                                        break;
                                                    }
                                                    case AtParEnums_1.StatusType.Error: {
                                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                        _this.spnrService.stop();
                                                        break;
                                                    }
                                                    case AtParEnums_1.StatusType.Custom: {
                                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                        _this.spnrService.stop();
                                                        break;
                                                    }
                                                }
                                            })];
                                    case 1:
                                        _a.sent();
                                        this.spnrService.stop();
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                        reject: function () {
                            _this.spnrService.stop();
                            return;
                        }
                    });
                    this.spnrService.stop();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "btnUpdateItems_Click");
                }
                return [2 /*return*/];
            });
        });
    };
    RequestStatusComponent.prototype.populateOrderIDs = function (pFromDate, pToDate, pStatus) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tkitOrderDetails_1, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        this.statusCode = -1;
                        this.ddlSelectRequest = [];
                        this.ddlSelectRequest.push({ label: "Select RequestID", value: "Select RequestID" });
                        tkitOrderDetails_1 = [];
                        return [4 /*yield*/, this.tkitReqstStatusService.getOrderIds(pFromDate.toString(), pToDate.toString(), pStatus).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        tkitOrderDetails_1 = data.DataList;
                                        if (tkitOrderDetails_1 != null && tkitOrderDetails_1.length > 0) {
                                            for (var i = 0; i < tkitOrderDetails_1.length; i++) {
                                                _this.ddlSelectRequest.push({ label: tkitOrderDetails_1[i].ORDER_NUMBER.toString(), value: tkitOrderDetails_1[i].ORDER_NUMBER.toString() });
                                            }
                                            _this.pop = true;
                                        }
                                        _this.statusCode = data.StatusCode;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusCode = data.StatusCode;
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusCode = data.StatusCode;
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusCode = data.StatusCode;
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "populateOrderIDs");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestStatusComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.spnrService.stop();
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spnrService, strExMsg.toString, funName, this.constructor.name);
    };
    RequestStatusComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.statusMsgs = null;
        this.lstTkitOrderDetails = null;
        this.ddlSelectStatus = null;
        this.ddlSelectRequest = null;
        this.ddlStatusLst = null;
    };
    RequestStatusComponent = __decorate([
        core_1.Component({
            templateUrl: 'trackit.request.status.component.html',
            providers: [datatableservice_1.datatableservice, atpar_trackit_common_service_1.AtParTrackITCommonService, trackit_request_status_service_1.TkitRequestStatusService, tkithttpservice_1.TkitHttpService, api_1.ConfirmationService, AtParSharedDataService_1.AtParSharedDataService]
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            event_spinner_service_1.SpinnerService,
            tkithttpservice_1.TkitHttpService,
            AtParConstants_1.AtParConstants,
            atpar_trackit_common_service_1.AtParTrackITCommonService,
            platform_browser_1.Title,
            trackit_request_status_service_1.TkitRequestStatusService,
            api_1.ConfirmationService])
    ], RequestStatusComponent);
    return RequestStatusComponent;
}());
exports.RequestStatusComponent = RequestStatusComponent;
//private async requestDetailsVisibility(flag: boolean) {
//    try {
//    } catch (ex) {
//        this.clientErrorMsg(ex);
//    }
//}
//onfocusToCalendar(e) {
//    this.date2 = null;
//    if (this.date1 == null) {
//        this.minDateValue2 = new Date();
//    } else {
//        this.minDateValue2 = this.date1;
//    }
//}
//onfocusFromCalendar(e) {
//    localStorage.removeItem("FromDate");
//    this.date1 = null;
//}
//# sourceMappingURL=trackit.request.status.component.js.map