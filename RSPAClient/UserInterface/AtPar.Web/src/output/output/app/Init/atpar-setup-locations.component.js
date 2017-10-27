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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS_1 = require("../../app/Entities/VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS");
var atpar_setup_locations_service_1 = require("./atpar-setup-locations.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var HttpService_1 = require("../Shared/HttpService");
var AtParConstants_1 = require("../Shared/AtParConstants");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var platform_browser_1 = require("@angular/platform-browser");
var SetupLocationsComponent = (function () {
    function SetupLocationsComponent(dataservice, spinnerService, SetupLocationServices, commonService, atParConstant, document, httpService) {
        this.dataservice = dataservice;
        this.spinnerService = spinnerService;
        this.SetupLocationServices = SetupLocationServices;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.document = document;
        this.httpService = httpService;
        this.showGrid = false;
        this.page = true; //home
        this.form = false; //add
        this.readonly = false;
        this.loading = true;
        this.deviceTokenEntry = [];
        this.statusMsgs = [];
        this.getBunitsLst = [];
        this.statusType = "";
        this.bindSymbol = "";
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    SetupLocationsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.newItem = new VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS_1.VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS();
                    this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                    this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                    this.ddlbusunits = [];
                    this.ddlbusunits.push({ label: "Select org", value: "Select Org" });
                    this.populateBusinessUnits();
                    this.statusList = [];
                    this.statusList.push({ label: 'All', value: "" });
                    this.statusList.push({ label: 'Active', value: false });
                    this.statusList.push({ label: 'InActive', value: true });
                }
                catch (ex) {
                    this.serverErrorMsg(ex, "ngOnInit");
                }
                return [2 /*return*/];
            });
        });
    };
    SetupLocationsComponent.prototype.populateBusinessUnits = function () {
        var _this = this;
        try {
            this.spinnerService.start();
            this.commonService.getBusinessUnits(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_1.BusinessType.AllBunits.toString()).
                catch(this.httpService.handleError).then(function (res) {
                var data = res.json();
                _this.getBunitsLst = res.json().DataList,
                    _this.spinnerService.stop();
                switch (data.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        if (_this.getBunitsLst.length > 0) {
                            for (var i = 0; i <= _this.getBunitsLst.length - 1; i++) {
                                _this.ddlbusunits.push({ label: _this.getBunitsLst[i].toString(), value: _this.getBunitsLst[i].toString() });
                            }
                        }
                        break;
                    }
                    case AtParEnums_1.StatusType.Warn: {
                        _this.statusMsgs = [];
                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Error: {
                        _this.statusMsgs = [];
                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Custom: {
                        _this.statusMsgs = [];
                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
                if (_this.ddlbusunits.length <= 1) {
                    _this.statusMsgs = [];
                    _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Org IDs are not allocated for the Org Group of the logged in user " + _this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID] });
                }
            });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.serverErrorMsg(ex, "populateBusinessUnits");
        }
    };
    SetupLocationsComponent.prototype.ddlChnage = function () {
        this.showGrid = false;
    };
    SetupLocationsComponent.prototype.go = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.statusMsgs = [];
                this.statusType = "";
                if (this.showGrid == true) {
                    this.dataTableComponent.reset();
                }
                try {
                    if (this.newItem.ORG_ID == "Select Org" || this.newItem.ORG_ID == undefined || this.newItem.ORG_ID == null || this.newItem.ORG_ID == "") {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org ID" });
                        this.showGrid = false;
                    }
                    else {
                        this.spinnerService.start();
                        if (this.newItem.LOCATION_ID == undefined) {
                            this.newItem.LOCATION_ID = "";
                        }
                        if (this.newItem.LOCATION_NAME == undefined) {
                            this.newItem.LOCATION_NAME = "";
                        }
                        this.showGrid = false;
                        this.LocationsData = [];
                        this.bindGrid();
                    }
                }
                catch (ex) {
                    this.serverErrorMsg(ex, "go");
                }
                return [2 /*return*/];
            });
        });
    };
    SetupLocationsComponent.prototype.add = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Create Location';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = true;
        this.page = false;
        this.isEditMode = true;
        this.showGrid = false;
        //this.populateBusinessUnits();
        this.statusMsgs = [];
        this.readonly = false;
        this.buttonTitle = "Save";
        this.bindSymbol = "floppy-o";
        this.loading = true;
        this.newItem = new VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS_1.VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS();
        this.txtLocIDStatus = null;
        this.txtLocNameStatus = null;
        this.ddlOrgIDStatus = null;
    };
    SetupLocationsComponent.prototype.editLocationData = function (location) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Location';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.newItem = new VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS_1.VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS();
        this.form = true;
        this.page = false;
        this.showGrid = false;
        this.isEditMode = false;
        //this.populateBusinessUnits();
        this.statusMsgs = [];
        this.loading = false;
        this.readonly = true;
        this.buttonTitle = "Update";
        this.bindSymbol = "check";
        this.newItem.LOCATION_ID = location.LOCATION;
        this.newItem.ORG_ID = location.SETCNTRLVALUE;
        this.newItem.LOCATION_NAME = location.DESCR;
        this.newItem.DEPARTMENT_ID = location.DEPARTMENT_ID;
        this.newItem.ADDRESS_1 = location.ADDRESS1;
        this.newItem.ADDRESS_2 = location.ADDRESS_2;
        this.newItem.STATE = location.STATE;
        this.newItem.CITY = location.CITY;
        this.newItem.ZIP = location.ZIP;
        this.newItem.PHONE_NO = location.PHONE_NO;
        this.newItem.ATTENTION_TO = location.ATTENTION_TO;
        this.newItem.EMAIL = location.EMAIL;
        if (location.STATUS == "Active") {
            this.newItem.STATUS = true;
        }
        else {
            this.newItem.STATUS = false;
        }
        this.newItem.COMMENTS = location.COMMENTS;
        this.newItem.PREV_ORGID = location.SETCNTRLVALUE;
    };
    SetupLocationsComponent.prototype.close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = false;
        this.page = true;
        this.statusMsgs = [];
        this.newItem = new VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS_1.VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS();
    };
    SetupLocationsComponent.prototype.bindModelDataChange = function (event) {
        if ("LocationID" == event.TextBoxID.toString()) {
            this.txtLocIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("LocationName" == event.TextBoxID.toString()) {
            this.txtLocNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("DepartmentID" == event.TextBoxID.toString()) {
            this.txtDeptIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Address1" == event.TextBoxID.toString()) {
            this.txtAddress1Status = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Address2" == event.TextBoxID.toString()) {
            this.txtAddress2Status = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("City" == event.TextBoxID.toString()) {
            this.txtCityStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("ZIP" == event.TextBoxID.toString()) {
            this.txtZipStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Attention" == event.TextBoxID.toString()) {
            this.txtAttentionToStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Phone" == event.TextBoxID.toString()) {
            this.txtPhoneStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Email" == event.TextBoxID.toString()) {
            this.txtEmailStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("State" == event.TextBoxID.toString()) {
            this.txtStateStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Comments" == event.TextBoxID.toString()) {
            this.txtCommentsStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if (this.buttonTitle == "UPDATE") {
            this.txtLocIDStatus = 0;
            if (this.txtLocNameStatus >= 1) {
                this.txtLocNameStatus = 1;
            }
            else {
                this.txtLocNameStatus = 0;
            }
            this.ddlOrgIDChanged();
        }
        if (this.txtLocIDStatus == 0 && this.txtLocNameStatus == 0 && this.ddlOrgIDStatus == 0) {
            if ((this.txtDeptIDStatus == undefined || this.txtDeptIDStatus == 0) &&
                (this.txtAddress1Status == undefined || this.txtAddress1Status == 0) &&
                (this.txtAddress2Status == undefined || this.txtAddress2Status == 0) &&
                (this.txtCityStatus == undefined || this.txtCityStatus == 0) &&
                (this.txtZipStatus == undefined || this.txtZipStatus == 0) &&
                (this.txtAttentionToStatus == undefined || this.txtAttentionToStatus == 0) &&
                (this.txtPhoneStatus == undefined || this.txtPhoneStatus == 0) &&
                (this.txtEmailStatus == undefined || this.txtEmailStatus == 0) &&
                (this.txtStateStatus == undefined || this.txtStateStatus == 0) &&
                (this.txtCommentsStatus == undefined || this.txtCommentsStatus == 0)) {
                this.loading = false;
            }
            else {
                this.loading = true;
            }
        }
        else {
            this.loading = true;
        }
    };
    SetupLocationsComponent.prototype.ddlOrgIDChanged = function () {
        if (this.newItem.ORG_ID == "Select Org" || this.newItem.ORG_ID == undefined || this.newItem.ORG_ID == null || this.newItem.ORG_ID == "") {
            this.ddlOrgIDStatus = 1;
        }
        else {
            this.ddlOrgIDStatus = 0;
        }
        if (this.buttonTitle == "UPDATE") {
            this.txtLocIDStatus = 0;
            if (this.txtLocNameStatus >= 1) {
                this.txtLocNameStatus = 1;
            }
            else {
                this.txtLocNameStatus = 0;
            }
        }
        if (this.txtLocIDStatus == 0 && this.txtLocNameStatus == 0 && this.ddlOrgIDStatus == 0 &&
            (this.newItem.LOCATION_ID != "" && this.newItem.LOCATION_ID != undefined && this.newItem.LOCATION_ID != null) && (this.newItem.LOCATION_NAME != "" && this.newItem.LOCATION_NAME != undefined && this.newItem.LOCATION_NAME != null)) {
            if ((this.txtDeptIDStatus == undefined || this.txtDeptIDStatus == 0) &&
                (this.txtAddress1Status == undefined || this.txtAddress1Status == 0) &&
                (this.txtAddress2Status == undefined || this.txtAddress2Status == 0) &&
                (this.txtCityStatus == undefined || this.txtCityStatus == 0) &&
                (this.txtZipStatus == undefined || this.txtZipStatus == 0) &&
                (this.txtAttentionToStatus == undefined || this.txtAttentionToStatus == 0) &&
                (this.txtPhoneStatus == undefined || this.txtPhoneStatus == 0) &&
                (this.txtEmailStatus == undefined || this.txtEmailStatus == 0) &&
                (this.txtStateStatus == undefined || this.txtStateStatus == 0) &&
                (this.txtCommentsStatus == undefined || this.txtCommentsStatus == 0)) {
                this.loading = false;
            }
            else {
                this.loading = true;
            }
        }
        else {
            this.loading = true;
        }
    };
    SetupLocationsComponent.prototype.submitData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showGrid = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        this.spinnerService.start();
                        this.statusMsgs = [];
                        if (!(this.newItem.ORG_ID == "Select Org" || this.newItem.ORG_ID == undefined || this.newItem.ORG_ID == null || this.newItem.ORG_ID == "")) return [3 /*break*/, 2];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org ID" });
                        this.showGrid = false;
                        return [3 /*break*/, 4];
                    case 2:
                        if (this.buttonTitle == "Save") {
                            this.newItem.STATUS = true;
                            this.mode = "Add";
                        }
                        else if (this.buttonTitle == "UPDATE") {
                            this.mode = "Edit";
                        }
                        this.lstLocationdetails = new Array();
                        this.lstLocationdetails.push(this.newItem);
                        return [4 /*yield*/, this.SetupLocationServices.InsertUpdateLocIDs(this.lstLocationdetails, this.mode, this.newItem.ORG_ID).
                                catch(this.httpService.handleError).then(function (res) {
                                var resp = res.json();
                                _this.spinnerService.stop();
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        if (_this.buttonTitle == "Add") {
                                            _this.statusMsgs = [];
                                            var statusMessage = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Location").replace("2%", _this.newItem.LOCATION_ID);
                                            _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                            _this.newItem = new VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS_1.VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS();
                                            _this.loading = true;
                                            _this.txtLocIDStatus = null;
                                            _this.txtLocNameStatus = null;
                                            _this.ddlOrgIDStatus = null;
                                            document.getElementById("LocationID").focus();
                                        }
                                        else if (_this.buttonTitle == "UPDATE") {
                                            _this.statusMsgs = [];
                                            var statusMessage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Location").replace("2%", _this.newItem.LOCATION_ID);
                                            _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                            document.getElementById("txtddlOrgId").focus();
                                        }
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        if (!_this.isEditMode) {
                                            document.getElementById("txtddlOrgId").focus();
                                        }
                                        else {
                                            document.getElementById("LocationID").focus();
                                        }
                                        break;
                                }
                                _this.atParConstant.scrollToTop();
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_1 = _a.sent();
                        this.serverErrorMsg(ex_1, "submitData");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SetupLocationsComponent.prototype.serverErrorMsg = function (strExMsg, funName) {
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    SetupLocationsComponent.prototype.updateLocationStatus = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        this.statusMsgs = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.UpdateLocIDStatus(location.SETCNTRLVALUE, location.STATUS_BOOL, location.LOCATION)
                                .forEach(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = resp.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 3];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 5];
                                            }
                                            return [3 /*break*/, 7];
                                        case 1: return [4 /*yield*/, this.bindGrid()];
                                        case 2:
                                            _b.sent();
                                            this.statusMsgs = [];
                                            this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Location ID " + location.LOCATION + " status updated successfully" });
                                            this.showGrid = true;
                                            this.spinnerService.stop();
                                            return [3 /*break*/, 7];
                                        case 3: return [4 /*yield*/, this.bindGrid()];
                                        case 4:
                                            _b.sent();
                                            this.statusMsgs = [];
                                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                            this.spinnerService.stop();
                                            this.showGrid = true;
                                            return [3 /*break*/, 7];
                                        case 5: return [4 /*yield*/, this.bindGrid()];
                                        case 6:
                                            _b.sent();
                                            this.statusMsgs = [];
                                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                            this.spinnerService.stop();
                                            this.showGrid = true;
                                            return [3 /*break*/, 7];
                                        case 7: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.serverErrorMsg(ex_2, "updateLocationStatus");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupLocationsComponent.prototype.bindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getLocations(this.newItem.ORG_ID, "", this.newItem.LOCATION_ID, this.newItem.LOCATION_NAME).
                                catch(this.httpService.handleError).then(function (res) {
                                var resp = res.json();
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                            if (resp.DataList[i].STATUS == "InActive") {
                                                resp.DataList[i].STATUS_BOOL = true;
                                            }
                                            else if (resp.DataList[i].STATUS == "Active") {
                                                resp.DataList[i].STATUS_BOOL = false;
                                            }
                                        }
                                        _this.LocationsData = resp.DataList;
                                        _this.showGrid = true;
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.serverErrorMsg(ex_3, "bindGrid");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupLocationsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.statusMsgs = null;
        this.recordsPerPageSize = null;
        this.ddlbusunits = null;
        this.getBunitsLst = null;
        this.newItem = null;
        this.LocationsData = null;
        this.statusList = null;
        this.mode = null;
        this.buttonTitle = null;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], SetupLocationsComponent.prototype, "dataTableComponent", void 0);
    SetupLocationsComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-setup-locations.component.html',
            providers: [atpar_setup_locations_service_1.SetupLocationServices, datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService],
        }),
        __param(5, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            event_spinner_service_1.SpinnerService,
            atpar_setup_locations_service_1.SetupLocationServices,
            atpar_common_service_1.AtParCommonService,
            AtParConstants_1.AtParConstants, Object, HttpService_1.HttpService])
    ], SetupLocationsComponent);
    return SetupLocationsComponent;
}());
exports.SetupLocationsComponent = SetupLocationsComponent;
//# sourceMappingURL=atpar-setup-locations.component.js.map