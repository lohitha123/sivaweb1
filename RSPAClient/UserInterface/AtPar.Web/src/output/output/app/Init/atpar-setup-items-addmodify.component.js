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
var PAR_MNGT_ITEM_1 = require("../../app/Entities/PAR_MNGT_ITEM");
var AtParEnums_1 = require("../Shared/AtParEnums");
var router_1 = require("@angular/router");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var spinner_sent_event_1 = require("../components/spinner/spinner.sent.event");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParEnums_3 = require("./../Shared/AtParEnums");
var atpar_setup_items_service_1 = require("../../app/Init/atpar-setup-items-service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var routepath_1 = require("../AtPar/Menus/routepath");
var platform_browser_1 = require("@angular/platform-browser");
var SetupModifyItemsComponent = (function () {
    function SetupModifyItemsComponent(setupItemServices, route, spinnerService, atParConstant, atParSharedDataService, document, router) {
        this.setupItemServices = setupItemServices;
        this.route = route;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.atParSharedDataService = atParSharedDataService;
        this.document = document;
        this.router = router;
        this._deviceTokenEntry = [];
        this.msgs = [];
        this.blnStatusMsg = false;
        this.blnShowOrgGroupLabel = false;
        this.orgGrpId = "";
        this.blnShowOrgGroupDD = false;
        this.lstOrgGroups = [];
        this.lstVendordata = [];
        this.lstReplenishment = [];
        this.newItem = new PAR_MNGT_ITEM_1.PAR_MNGT_ITEM();
        this.blnstatus = false;
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    SetupModifyItemsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.spinnerService.start();
                        this.lstVendordata = [];
                        this.route.queryParams.subscribe(function (params) {
                            _this.mode = params["mode"];
                            _this.appId = params["appId"];
                        });
                        if (!(this.mode == AtParEnums_2.ModeEnum.Edit.toString())) return [3 /*break*/, 1];
                        this.blnShowOrgGroupLabel = true;
                        this.blnShowOrgGroupDD = false;
                        this.blnstatus = true;
                        this.submitButtonTitle = "Update";
                        this.bindSymbol = "check";
                        this.newItem = this.atParSharedDataService.storage;
                        this.lblShowItemId = true;
                        this.disableButton = false;
                        this.buttoniconstatus = false;
                        this.txtShowItemId = false;
                        this.newItem.ITEM_ID.toString();
                        this.newItem.LEAD_TIME.toString();
                        this.newItem.SHORT_DESCR;
                        this.newItem.LONG_DESCR;
                        this.newItem.VENDOR_ID = this.newItem.VENDOR_ID;
                        this.newItem.ORG_GROUP_ID = this.newItem.ORG_GROUP_ID.trim();
                        this.newItem.MANUFACTURER.toString();
                        this.newItem.MFG_ITEM_ID.toString();
                        this.newItem.VEND_ITEM_ID;
                        this.newItem.CUST_ITEM_ID.toString();
                        this.newItem.UNIT_OF_PROCUREMENT;
                        this.newItem.UNIT_OF_ISSUE.toString();
                        this.newItem.UPC_CODE;
                        this.newItem.GTIN.toString();
                        this.newItem.ITEM_PRICE.toString();
                        if (this.newItem.CONV_FACTOR != null) {
                            this.newItem.CONV_FACTOR.toString();
                        }
                        if (this.newItem.PAR_UOM != null) {
                            this.newItem.PAR_UOM.toString();
                        }
                        if (this.newItem.CONV_RATE_PAR_UOM != null) {
                            this.newItem.CONV_RATE_PAR_UOM.toString();
                        }
                        if (this.newItem.LOT_CONTROLLED.toString() == "Y") {
                            this.newItem.LOT_CONTROLLED_STATUS = true;
                        }
                        else {
                            this.newItem.LOT_CONTROLLED_STATUS = false;
                        }
                        if (this.newItem.SERIAL_CONTROLLED.toString() == "Y") {
                            this.newItem.SERIAL_CONTROLLED_STATUS = true;
                        }
                        else {
                            this.newItem.SERIAL_CONTROLLED_STATUS = false;
                        }
                        if (this.newItem.IMPLANT_FLAG.toString() == "Y") {
                            this.newItem.IMPLANT_FLAG_STATUS = true;
                        }
                        else {
                            this.newItem.IMPLANT_FLAG_STATUS = false;
                        }
                        this.newItem.CHARGE_CODE;
                        if (this.newItem.LATEX_FREE == 1) {
                            this.newItem.LATEX_FREE_STATUS = true;
                        }
                        else {
                            this.newItem.LATEX_FREE_STATUS = false;
                        }
                        this.newItem.CUST_ITEM_DESCR;
                        this.newItem.ITEM_CATEGORY;
                        this.newItem.USER_FIELD_1;
                        this.newItem.USER_FIELD_2;
                        if (this.newItem.PHARMACY_FLG == 1) {
                            this.pharma = true;
                            this.newItem.PHARMACY_FLG_STATUS = true;
                        }
                        else {
                            this.pharma = false;
                            this.newItem.PHARMACY_FLG_STATUS = false;
                        }
                        if (this.newItem.SUBSTITUTE_ITEM_FLG == 1) {
                            this.newItem.SUBSTITUTE_ITEM_FLG_STATUS = true;
                        }
                        else {
                            this.newItem.SUBSTITUTE_ITEM_FLG_STATUS = false;
                        }
                        if (this.newItem.EVERIFY_FLG == 1) {
                            this.newItem.EVERIFY_FLG_STATUS = true;
                        }
                        else {
                            this.newItem.EVERIFY_FLG_STATUS = false;
                        }
                        if (this.newItem.DOSAGE != null) {
                            this.newItem.DOSAGE = this.newItem.DOSAGE.toString();
                        }
                        if (this.newItem.STRENGTH != null) {
                            this.newItem.STRENGTH = this.newItem.STRENGTH.toString();
                        }
                        this.orgGrpId = this.newItem.ORG_GROUP_ID + " - " + this.newItem.ORG_GROUP_NAME;
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(this.mode == AtParEnums_2.ModeEnum.Add.toString())) return [3 /*break*/, 5];
                        this.blnstatus = false;
                        this.buttoniconstatus = true;
                        this.submitButtonTitle = "Save";
                        this.bindSymbol = "floppy-o";
                        this.lblShowItemId = false;
                        this.txtShowItemId = true;
                        this.disableButton = true;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.setupItemServices.getLatestItemId(this.appId)
                                .forEach(function (resp) {
                                _this.spinnerService.getEvent(spinner_sent_event_1.SpinnerSentEvent).publish(false);
                                switch (resp.StatType) {
                                    case AtParEnums_3.StatusType.Success:
                                        {
                                            _this.newItem.ITEM_ID = resp.DataVariable;
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                    case AtParEnums_3.StatusType.Error:
                                        {
                                            _this.statusMesssage = resp.StatusMessage;
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                    case AtParEnums_3.StatusType.Warn:
                                        {
                                            _this.statusMesssage = resp.StatusMessage;
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                    case AtParEnums_3.StatusType.Custom:
                                        {
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 5];
                    case 5: return [4 /*yield*/, this.BindOrgGroups()];
                    case 6:
                        _a.sent();
                        this.BindReplenishment();
                        if (this.mode == AtParEnums_2.ModeEnum.Add.toString()) {
                            if (this.blnShowOrgGroupDD == false && this.blnShowOrgGroupLabel == true) {
                                document.getElementById('txtItemId').focus();
                            }
                        }
                        else if (this.mode == AtParEnums_2.ModeEnum.Edit.toString()) {
                            if (this.blnShowOrgGroupDD == false && this.blnShowOrgGroupLabel == true && this.lblShowItemId == true) {
                                document.getElementById('txtLeadTime').focus();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SetupModifyItemsComponent.prototype.BindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.setupItemServices.getOrgGroupDetails(this._deviceTokenEntry)
                                .forEach(function (resp) {
                                _this.spinnerService.start();
                                switch (resp.StatType) {
                                    case AtParEnums_3.StatusType.Success:
                                        {
                                            _this.orgGroupData = resp.DataList;
                                            _this.blnStatusMsg = false;
                                            if (_this.orgGroupData.length == 1) {
                                                _this.blnShowOrgGroupLabel = true;
                                                _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + "   -   " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                                _this.newItem.ORG_GROUP_ID = _this.orgGrpId;
                                                _this.SetVendorsFromOrgGrpId();
                                                _this.spinnerService.stop();
                                                break;
                                            }
                                            else if (_this.orgGroupData.length > 1) {
                                                if (_this.mode == AtParEnums_2.ModeEnum.Add.toString()) {
                                                    _this.blnShowOrgGroupDD = true;
                                                }
                                                else if (_this.mode == AtParEnums_2.ModeEnum.Edit.toString()) {
                                                    _this.blnShowOrgGroupDD = false;
                                                }
                                                _this.lstOrgGroups.push({
                                                    label: "Select One",
                                                    value: ""
                                                });
                                                _this.lstVendordata = [];
                                                _this.lstVendordata.push({
                                                    label: "Select One",
                                                    value: ""
                                                });
                                                if (_this.blnstatus == true) {
                                                    _this.SetVendorsFromOrgGrpIdForEdit();
                                                }
                                                for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                    if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                        _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                    }
                                                }
                                                _this.spinnerService.stop();
                                            }
                                            break;
                                        }
                                    case AtParEnums_3.StatusType.Error:
                                        {
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                    case AtParEnums_3.StatusType.Warn:
                                        {
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                    case AtParEnums_3.StatusType.Custom:
                                        {
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
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
                        this.clientErrorMsg(ex_2, "BindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupModifyItemsComponent.prototype.BindVendors = function () {
        var _this = this;
        try {
            this.spinnerService.start();
            if (this.vendorSearch == undefined || this.vendorSearch == null || this.vendorSearch.length == 0) {
                this.vendorSearch = "";
            }
            this.setupItemServices.getVendorDetails(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], '', this.vendorSearch.trim())
                .forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_3.StatusType.Success:
                        {
                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                if (resp.DataList[i].STATUS == 0) {
                                    _this.lstVendordata.push({ label: resp.DataList[i].VENDOR_ID + "-" + resp.DataList[i].VENDOR_NAME, value: resp.DataList[i].VENDOR_ID });
                                }
                            }
                            _this.spinnerService.stop();
                            break;
                        }
                    case AtParEnums_3.StatusType.Error:
                        {
                            _this.msgs = [];
                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                    case AtParEnums_3.StatusType.Warn:
                        {
                            if (resp.DataList.length == 0) {
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found for Vendors' });
                            }
                            else {
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            }
                            _this.spinnerService.stop();
                            break;
                        }
                    case AtParEnums_3.StatusType.Custom:
                        {
                            _this.msgs = [];
                            _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindVendors");
        }
    };
    SetupModifyItemsComponent.prototype.SetVendorsFromOrgGrpId = function () {
        var _this = this;
        this.lstVendordata = [];
        this.lstVendordata.push({ label: "select one", value: "" });
        try {
            this.spinnerService.start();
            if (this.vendorSearch == undefined || this.vendorSearch == null || this.vendorSearch.length == 0) {
                this.vendorSearch = "";
            }
            this.setupItemServices.getVendorDetails(this.orgGrpId.split("-")[0], '', this.vendorSearch.trim())
                .forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_3.StatusType.Success:
                        {
                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                if (resp.DataList[i].STATUS == 0) {
                                    _this.lstVendordata.push({ label: resp.DataList[i].VENDOR_ID + "-" + resp.DataList[i].VENDOR_NAME, value: resp.DataList[i].VENDOR_ID });
                                }
                            }
                            _this.spinnerService.stop();
                            break;
                        }
                    case AtParEnums_3.StatusType.Error:
                        {
                            _this.msgs = [];
                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                    case AtParEnums_3.StatusType.Warn:
                        {
                            if (resp.DataList.length == 0) {
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found for Vendors' });
                            }
                            else {
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            }
                            _this.spinnerService.stop();
                            break;
                        }
                    case AtParEnums_3.StatusType.Custom:
                        {
                            _this.msgs = [];
                            _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "SetVendorsFromOrgGrpId");
        }
    };
    SetupModifyItemsComponent.prototype.SetVendorsFromOrgGrpIdForEdit = function () {
        var _this = this;
        this.lstVendordata = [];
        this.lstVendordata.push({ label: "select one", value: "" });
        try {
            this.spinnerService.start();
            if (this.vendorSearch == undefined || this.vendorSearch == null || this.vendorSearch.length == 0) {
                this.vendorSearch = "";
            }
            this.setupItemServices.getVendorDetails(this.newItem.ORG_GROUP_ID, '', this.vendorSearch.trim())
                .forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_3.StatusType.Success:
                        {
                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                if (resp.DataList[i].STATUS == 0) {
                                    _this.lstVendordata.push({ label: resp.DataList[i].VENDOR_ID + "-" + resp.DataList[i].VENDOR_NAME, value: resp.DataList[i].VENDOR_ID });
                                }
                            }
                            _this.spinnerService.stop();
                            break;
                        }
                    case AtParEnums_3.StatusType.Error:
                        {
                            _this.msgs = [];
                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                    case AtParEnums_3.StatusType.Warn:
                        {
                            if (resp.DataList.length == 0) {
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found for Vendors' });
                            }
                            else {
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            }
                            _this.spinnerService.stop();
                            break;
                        }
                    case AtParEnums_3.StatusType.Custom:
                        {
                            _this.msgs = [];
                            _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "SetVendorsFromOrgGrpIdForEdit");
        }
    };
    SetupModifyItemsComponent.prototype.BindReplenishment = function () {
        this.lstReplenishment.push({ label: "Select One", value: "" });
        this.lstReplenishment.push({ label: "Stock", value: "1" });
        this.lstReplenishment.push({ label: "Nonstock", value: "2" });
        this.lstReplenishment.push({ label: "Stockless", value: "3" });
        this.lstReplenishment.push({ label: "Consignment", value: "4" });
    };
    SetupModifyItemsComponent.prototype.ddlOrgGrpIdChanged = function () {
        var _this = this;
        if (this.newItem.ORG_GROUP_ID === "Select One") {
            return;
        }
        try {
            if (this.vendorSearch == undefined || this.vendorSearch == null || this.vendorSearch.length == 0) {
                this.vendorSearch = "";
            }
            this.setupItemServices.getVendorDetails(this.newItem.ORG_GROUP_ID, '', this.vendorSearch.trim())
                .forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_3.StatusType.Success:
                        {
                            _this.lstVendordata = [];
                            _this.msgs = [];
                            _this.lstVendordata.push({ label: "select one", value: "" });
                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                if (resp.DataList[i].STATUS == 0) {
                                    _this.lstVendordata.push({ label: resp.DataList[i].VENDOR_ID + "-" + resp.DataList[i].VENDOR_NAME, value: resp.DataList[i].VENDOR_ID });
                                }
                            }
                            break;
                        }
                    case AtParEnums_3.StatusType.Error:
                        {
                            _this.msgs = [];
                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            break;
                        }
                    case AtParEnums_3.StatusType.Warn:
                        {
                            _this.msgs = [];
                            _this.lstVendordata = [];
                            _this.lstVendordata.push({ label: "select one", value: "" });
                            resp.StatusMessage = "No Vendor Is Assigned For The selected Org Group ID";
                            _this.newItem.VENDOR_ID = "";
                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            break;
                        }
                    case AtParEnums_3.StatusType.Custom:
                        {
                            _this.msgs = [];
                            _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                            break;
                        }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
        if (this.newItem.ORG_GROUP_ID == "Select Org" || this.newItem.ORG_GROUP_ID == undefined || this.newItem.ORG_GROUP_ID == null || this.newItem.ORG_GROUP_ID == "") {
            this.ddlOrgGpIDStatus = 1;
        }
        else {
            this.ddlOrgGpIDStatus = 0;
        }
    };
    SetupModifyItemsComponent.prototype.ddlChange = function () {
        if (this.newItem.REPLENISHMENT_TYPE == "" || this.newItem.REPLENISHMENT_TYPE == undefined || this.newItem.REPLENISHMENT_TYPE == null) {
            this.ddlReplTypeStatus = 1;
        }
        else {
            this.ddlReplTypeStatus = 0;
        }
        if (this.newItem.ORG_GROUP_ID == "Select Org" || this.newItem.ORG_GROUP_ID == undefined || this.newItem.ORG_GROUP_ID == null || this.newItem.ORG_GROUP_ID == "") {
            this.ddlOrgGpIDStatus = 1;
        }
        else {
            this.ddlOrgGpIDStatus = 0;
        }
        if (this.newItem.VENDOR_ID == undefined || this.newItem.VENDOR_ID == null || this.newItem.VENDOR_ID == "") {
            this.ddlVenIDStatus = 1;
        }
        else {
            this.ddlVenIDStatus = 0;
        }
        if (this.submitButtonTitle == "Update") {
            this.txtItemIDStatus = 0;
            if (this.txtShortDescStatus >= 1) {
                this.txtShortDescStatus = 1;
            }
            else {
                this.txtShortDescStatus = 0;
            }
            if (this.txtCustItemIdStatus >= 1) {
                this.txtCustItemIdStatus = 1;
            }
            else {
                this.txtCustItemIdStatus = 0;
            }
            if (this.txtVendItemIdStatus >= 1) {
                this.txtVendItemIdStatus = 1;
            }
            else {
                this.txtVendItemIdStatus = 0;
            }
            if (this.txtUomProcurementStatus >= 1) {
                this.txtUomProcurementStatus = 1;
            }
            else {
                this.txtUomProcurementStatus = 0;
            }
            if (this.txtUomIssueStatus >= 1) {
                this.txtUomIssueStatus = 1;
            }
            else {
                this.txtUomIssueStatus = 0;
            }
            if (this.txtConvRateProcStatus >= 1) {
                this.txtConvRateProcStatus = 1;
            }
            else {
                this.txtConvRateProcStatus = 0;
            }
        }
        if (this.txtItemIDStatus == 0 && this.txtShortDescStatus == 0 &&
            this.txtVendItemIdStatus == 0 && this.txtUomProcurementStatus == 0 && this.txtUomIssueStatus == 0
            && this.txtConvRateProcStatus == 0 && this.ddlReplTypeStatus == 0 && this.ddlOrgGpIDStatus == 0 && this.ddlVenIDStatus == 0 && (this.newItem.ITEM_ID != "" && this.newItem.ITEM_ID != undefined && this.newItem.ITEM_ID != null) &&
            (this.newItem.SHORT_DESCR != "" && this.newItem.SHORT_DESCR != undefined && this.newItem.SHORT_DESCR != null) &&
            (this.newItem.VEND_ITEM_ID != "" && this.newItem.VEND_ITEM_ID != undefined && this.newItem.VEND_ITEM_ID != null) &&
            (this.newItem.UNIT_OF_PROCUREMENT != "" && this.newItem.UNIT_OF_PROCUREMENT != undefined && this.newItem.UNIT_OF_PROCUREMENT != null) &&
            (this.newItem.CONV_FACTOR != undefined && this.newItem.CONV_FACTOR != null) && (this.newItem.UNIT_OF_ISSUE != "" && this.newItem.UNIT_OF_ISSUE != undefined && this.newItem.UNIT_OF_ISSUE != null)) {
            if ((this.txtLeadTimeStatus == 0 || this.txtLeadTimeStatus == undefined) &&
                (this.txtLongDescStatus == 0 || this.txtLongDescStatus == undefined) && (this.txtCustItemIdStatus == 0 || this.txtCustItemIdStatus == undefined) &&
                (this.txtManufacturerStatus == 0 || this.txtManufacturerStatus == undefined) &&
                (this.txtMgfItemIdStatus == 0 || this.txtMgfItemIdStatus == undefined) &&
                (this.txtUomStatus == 0 || this.txtUomStatus == undefined) && (this.txtUpcIdstatus == 0 || this.txtUpcIdstatus == undefined)
                && (this.txtGtinStatus == 0 || this.txtGtinStatus == undefined) && (this.txtItemPriceStatus == 0 || this.txtItemPriceStatus == undefined)
                && (this.txtParUomStatus == 0 || this.txtParUomStatus == undefined) && (this.txtChargeCodeStatus == 0 || this.txtChargeCodeStatus == undefined)
                && (this.txtCustItemDescStatus == 0 || this.txtCustItemDescStatus == undefined) && (this.txtItemCtgryStatus == 0 || this.txtItemCtgryStatus == undefined)
                && (this.txtUserField1Status == 0 || this.txtUserField1Status == undefined) && (this.txtUserField2Status == 0 || this.txtUserField2Status == undefined)) {
                if (this.pharma == true) {
                    if ((this.txtStrengthStatus == 0 || this.txtStrengthStatus == undefined) && (this.txtDosageStatus == 0 || this.txtDosageStatus == undefined)
                        && (this.txtCiIndexstatus == 0 || this.txtCiIndexstatus == undefined)) {
                        this.disableButton = false;
                    }
                    else {
                        this.disableButton = true;
                    }
                }
                else {
                    this.disableButton = false;
                }
            }
            else {
                this.disableButton = true;
            }
        }
        else {
            this.disableButton = true;
        }
    };
    SetupModifyItemsComponent.prototype.addSetupItems = function () {
        var _this = this;
        if (this.mode == AtParEnums_2.ModeEnum.Add.toString()) {
            if (this.newItem.ITEM_ID == "" || this.newItem.ITEM_ID == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Valid Item ID" });
                return 0;
            }
            if (this.newItem.SHORT_DESCR == "" || this.newItem.SHORT_DESCR == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Valid Short Description" });
                return 0;
            }
            if (this.newItem.ORG_GROUP_ID == "select One" || this.newItem.ORG_GROUP_ID == "" || this.newItem.ORG_GROUP_ID == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "select Org Group ID" });
                return 0;
            }
            if (this.newItem.VENDOR_ID == "select One" || this.newItem.VENDOR_ID == "" || this.newItem.VENDOR_ID == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Select Vendor ID" });
                return 0;
            }
            if (this.newItem.VEND_ITEM_ID == "" || this.newItem.VEND_ITEM_ID == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "select Vendor Item Id" });
                return 0;
            }
            if (this.newItem.UNIT_OF_PROCUREMENT == "" || this.newItem.UNIT_OF_PROCUREMENT == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Valid UOM(Procurement)" });
                return 0;
            }
            if (this.newItem.UNIT_OF_ISSUE == "" || this.newItem.UNIT_OF_ISSUE == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Valid UOM(Issue)" });
                return 0;
            }
            if (this.newItem.REPLENISHMENT_TYPE == "select One" || this.newItem.REPLENISHMENT_TYPE == "" || this.newItem.REPLENISHMENT_TYPE == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Select Replenishment Type" });
                return 0;
            }
            if (this.blnShowOrgGroupLabel == true) {
                this.newItem.ORG_GROUP_ID = this.orgGrpId.split("-")[0];
            }
            if (this.newItem.SHORT_DESCR !== "" || this.newItem.SHORT_DESCR != undefined || this.newItem.SHORT_DESCR != null) {
                this.newItem.SHORT_DESCR.replace("'", "''");
            }
            if (this.newItem.LONG_DESCR != undefined || this.newItem.LONG_DESCR != null) {
                this.newItem.LONG_DESCR.replace("'", "''");
            }
            if (this.newItem.UNIT_OF_PROCUREMENT != undefined || this.newItem.UNIT_OF_PROCUREMENT != null) {
                this.newItem.UNIT_OF_PROCUREMENT.toUpperCase();
            }
            if (this.newItem.UNIT_OF_ISSUE != undefined || this.newItem.UNIT_OF_ISSUE != null) {
                this.newItem.UNIT_OF_ISSUE.toUpperCase();
            }
            if (this.newItem.CUST_ITEM_DESCR != undefined || this.newItem.CUST_ITEM_DESCR != null) {
                this.newItem.CUST_ITEM_DESCR.trim();
            }
            if (this.newItem.ITEM_CATEGORY != undefined || this.newItem.ITEM_CATEGORY != null) {
                this.newItem.ITEM_CATEGORY.trim();
            }
            if (this.newItem.USER_FIELD_1 != undefined || this.newItem.USER_FIELD_1 != null) {
                this.newItem.USER_FIELD_1.trim();
            }
            if (this.newItem.USER_FIELD_2 != undefined || this.newItem.USER_FIELD_2 != null) {
                this.newItem.USER_FIELD_2.trim();
            }
            this.newItem.LAST_UPDATE_USER = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString().trim();
            if (this.newItem.STRENGTH != undefined || this.newItem.STRENGTH != null) {
                this.newItem.STRENGTH.trim();
            }
            if (this.newItem.DOSAGE != undefined || this.newItem.DOSAGE != null) {
                this.newItem.DOSAGE.trim();
            }
            if (this.newItem.LOT_CONTROLLED == null || this.newItem.LOT_CONTROLLED == undefined) {
                this.newItem.LOT_CONTROLLED = "N";
            }
            if (this.newItem.SERIAL_CONTROLLED == null || this.newItem.SERIAL_CONTROLLED == undefined) {
                this.newItem.SERIAL_CONTROLLED = "N";
            }
            if (this.newItem.IMPLANT_FLAG == null || this.newItem.IMPLANT_FLAG == undefined) {
                this.newItem.IMPLANT_FLAG = "N";
            }
            this.spinnerService.start();
            this.setupItemServices.CreateSetupItem(this.newItem).forEach(function (resp) {
                _this.msgs = [];
                switch (resp.StatType) {
                    case AtParEnums_3.StatusType.Success:
                        {
                            _this.statusMesssage = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Item").replace("2%", _this.newItem.ITEM_ID);
                            _this.newItem.ITEM_ID = "";
                            _this.newItem.LEAD_TIME = null;
                            _this.newItem.SHORT_DESCR = "";
                            _this.newItem.LONG_DESCR = "";
                            _this.newItem.VENDOR_ID = "";
                            _this.newItem.CUST_ITEM_ID = "";
                            _this.newItem.MANUFACTURER = "";
                            _this.newItem.MFG_ITEM_ID = "";
                            _this.newItem.VEND_ITEM_ID = "";
                            _this.newItem.UNIT_OF_PROCUREMENT = "";
                            _this.newItem.PAR_UOM = "";
                            _this.newItem.UNIT_OF_ISSUE = "";
                            _this.newItem.UPC_CODE = "";
                            _this.newItem.GTIN = "";
                            _this.newItem.ITEM_PRICE = null;
                            _this.newItem.CONV_FACTOR = null;
                            _this.newItem.CONV_RATE_PAR_UOM = null;
                            _this.newItem.LOT_CONTROLLED_STATUS = false;
                            _this.newItem.SERIAL_CONTROLLED_STATUS = false;
                            _this.newItem.IMPLANT_FLAG_STATUS = false;
                            _this.newItem.CHARGE_CODE = "";
                            _this.newItem.REPLENISHMENT_TYPE = "";
                            _this.newItem.LATEX_FREE_STATUS = false;
                            _this.newItem.CUST_ITEM_DESCR = "";
                            _this.newItem.ITEM_CATEGORY = "";
                            _this.newItem.USER_FIELD_1 = "";
                            _this.newItem.USER_FIELD_2 = "";
                            _this.newItem.PHARMACY_FLG_STATUS = false;
                            _this.newItem.SUBSTITUTE_ITEM_FLG_STATUS = false;
                            _this.newItem.STRENGTH = "";
                            _this.newItem.DOSAGE = "";
                            _this.newItem.EVERIFY_FLG_STATUS = false;
                            _this.newItem.CINDEX = null;
                            _this.pharma = false;
                            if (_this.blnShowOrgGroupLabel == false) {
                                _this.newItem.ORG_GROUP_ID = "";
                            }
                            _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                            if (_this.blnShowOrgGroupDD) {
                                document.getElementById("txtddllstOrgGroups").focus();
                            }
                            else {
                                document.getElementById("txtItemId").focus();
                            }
                            _this.disableButton = true;
                            _this.spinnerService.stop();
                            break;
                        }
                    case AtParEnums_3.StatusType.Error:
                        {
                            _this.statusMesssage = resp.StatusMessage;
                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: _this.statusMesssage });
                            document.getElementById("txtItemId").focus();
                            _this.disableButton = true;
                            _this.spinnerService.stop();
                            break;
                        }
                    case AtParEnums_3.StatusType.Warn:
                        {
                            _this.statusMesssage = resp.StatusMessage;
                            _this.statusMesssage = _this.statusMesssage.replace("1%", _this.newItem.ITEM_ID);
                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: _this.statusMesssage });
                            document.getElementById("txtItemId").focus();
                            _this.disableButton = true;
                            _this.spinnerService.stop();
                            break;
                        }
                }
                _this.atParConstant.scrollToTop();
            });
        }
        else if (this.mode == AtParEnums_2.ModeEnum.Edit.toString()) {
            if (this.newItem.ITEM_ID == "" || this.newItem.ITEM_ID == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Valid Item ID" });
                return 0;
            }
            if (this.newItem.SHORT_DESCR == "" || this.newItem.SHORT_DESCR == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Valid Short Description" });
                return 0;
            }
            if (this.newItem.VENDOR_ID == "select one" || this.newItem.VENDOR_ID == "" || this.newItem.VENDOR_ID == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "select Vendor Id" });
                return 0;
            }
            if (this.newItem.VEND_ITEM_ID == "" || this.newItem.VEND_ITEM_ID == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "select Vendor Item Id" });
                return 0;
            }
            if (this.newItem.UNIT_OF_PROCUREMENT == "" || this.newItem.UNIT_OF_PROCUREMENT == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Valid UOM(Procurement)" });
                return 0;
            }
            if (this.newItem.UNIT_OF_ISSUE == "" || this.newItem.UNIT_OF_ISSUE == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Valid UOM(Issue)" });
                return 0;
            }
            if (this.newItem.CONV_FACTOR == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Valid Procurement Conversion Rate" });
                return 0;
            }
            if (this.newItem.REPLENISHMENT_TYPE == "select One" || this.newItem.REPLENISHMENT_TYPE == "" || this.newItem.REPLENISHMENT_TYPE == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "select Replenisment Type" });
                return 0;
            }
            this.spinnerService.start();
            this.newItem.ORG_GROUP_ID = this.newItem.ORG_GROUP_ID.split("-")[0];
            this.setupItemServices.UpdateItem(this.newItem).forEach(function (resp) {
                _this.msgs = [];
                switch (resp.StatType) {
                    case AtParEnums_3.StatusType.Success:
                        {
                            _this.statusMesssage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Item").replace("2%", _this.newItem.ITEM_ID);
                            _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                            if (_this.blnShowOrgGroupDD) {
                                document.getElementById("txtddllstOrgGroups").focus();
                            }
                            else {
                                document.getElementById("txtLeadTime").focus();
                            }
                            _this.spinnerService.stop();
                            break;
                        }
                    case AtParEnums_3.StatusType.Error:
                        {
                            _this.msgs = [];
                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                    case AtParEnums_3.StatusType.Warn:
                        {
                            _this.msgs = [];
                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                }
                _this.atParConstant.scrollToTop();
            });
        }
    };
    SetupModifyItemsComponent.prototype.bindModelDataChange = function (event) {
        try {
            if (this.newItem.ITEM_ID == null || this.newItem.ITEM_ID == "" || this.newItem.ITEM_ID == undefined) {
                this.txtItemIDStatus = 1;
            }
            else {
                if (this.txtItemIDStatus == 1) {
                    this.txtItemIDStatus = 1;
                }
                else {
                    this.txtItemIDStatus = 0;
                }
            }
            if ("txtItemId" == event.TextBoxID.toString()) {
                this.txtItemIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtLeadTime" == event.TextBoxID.toString()) {
                this.txtLeadTimeStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtShortDesc" == event.TextBoxID.toString()) {
                this.txtShortDescStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtLongDesc" == event.TextBoxID.toString()) {
                this.txtLongDescStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtCustItemId" == event.TextBoxID.toString()) {
                this.txtCustItemIdStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtManufacturer" == event.TextBoxID.toString()) {
                this.txtManufacturerStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtMgfItemId" == event.TextBoxID.toString()) {
                this.txtMgfItemIdStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtVendItemId" == event.TextBoxID.toString()) {
                this.txtVendItemIdStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtUomProcurement" == event.TextBoxID.toString()) {
                this.txtUomProcurementStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtUom" == event.TextBoxID.toString()) {
                this.txtUomStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtUpcId" == event.TextBoxID.toString()) {
                this.txtUpcIdstatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtUomIssue" == event.TextBoxID.toString()) {
                this.txtUomIssueStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtGtin" == event.TextBoxID.toString()) {
                this.txtGtinStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtItemPrice" == event.TextBoxID.toString()) {
                this.txtItemPriceStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtConvRateProc" == event.TextBoxID.toString()) {
                this.txtConvRateProcStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtParUom" == event.TextBoxID.toString()) {
                this.txtParUomStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtChargeCode" == event.TextBoxID.toString()) {
                this.txtChargeCodeStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtCustItemDesc" == event.TextBoxID.toString()) {
                this.txtCustItemDescStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtItemCtgry" == event.TextBoxID.toString()) {
                this.txtItemCtgryStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtUserField1" == event.TextBoxID.toString()) {
                this.txtUserField1Status = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtUserField2" == event.TextBoxID.toString()) {
                this.txtUserField2Status = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtStrength" == event.TextBoxID.toString()) {
                this.txtStrengthStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtDosage" == event.TextBoxID.toString()) {
                this.txtDosageStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtCiIndex" == event.TextBoxID.toString()) {
                this.txtCiIndexstatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.submitButtonTitle == "Update") {
                this.txtItemIDStatus = 0;
                if (this.txtShortDescStatus >= 1) {
                    this.txtShortDescStatus = 1;
                }
                else {
                    this.txtShortDescStatus = 0;
                }
                if (this.txtCustItemIdStatus >= 1) {
                    this.txtCustItemIdStatus = 1;
                }
                else {
                    this.txtCustItemIdStatus = 0;
                }
                if (this.txtVendItemIdStatus >= 1) {
                    this.txtVendItemIdStatus = 1;
                }
                else {
                    this.txtVendItemIdStatus = 0;
                }
                if (this.txtUomProcurementStatus >= 1) {
                    this.txtUomProcurementStatus = 1;
                }
                else {
                    this.txtUomProcurementStatus = 0;
                }
                if (this.txtUomIssueStatus >= 1) {
                    this.txtUomIssueStatus = 1;
                }
                else {
                    this.txtUomIssueStatus = 0;
                }
                if (this.txtConvRateProcStatus >= 1) {
                    this.txtConvRateProcStatus = 1;
                }
                else {
                    this.txtConvRateProcStatus = 0;
                }
            }
            this.ddlChange();
            if (this.txtItemIDStatus == 0 && this.txtShortDescStatus == 0 &&
                this.txtVendItemIdStatus == 0 && this.txtUomProcurementStatus == 0 && this.txtUomIssueStatus == 0
                && this.txtConvRateProcStatus == 0 && this.ddlReplTypeStatus == 0 && this.ddlOrgGpIDStatus == 0 && this.ddlVenIDStatus == 0) {
                if ((this.txtLeadTimeStatus == 0 || this.txtLeadTimeStatus == undefined) &&
                    (this.txtLongDescStatus == 0 || this.txtLongDescStatus == undefined) && (this.txtCustItemIdStatus == 0 || this.txtCustItemIdStatus == undefined) &&
                    (this.txtManufacturerStatus == 0 || this.txtManufacturerStatus == undefined) &&
                    (this.txtMgfItemIdStatus == 0 || this.txtMgfItemIdStatus == undefined) &&
                    (this.txtUomStatus == 0 || this.txtUomStatus == undefined) && (this.txtUpcIdstatus == 0 || this.txtUpcIdstatus == undefined)
                    && (this.txtGtinStatus == 0 || this.txtGtinStatus == undefined) && (this.txtItemPriceStatus == 0 || this.txtItemPriceStatus == undefined)
                    && (this.txtParUomStatus == 0 || this.txtParUomStatus == undefined) && (this.txtChargeCodeStatus == 0 || this.txtChargeCodeStatus == undefined)
                    && (this.txtCustItemDescStatus == 0 || this.txtCustItemDescStatus == undefined) && (this.txtItemCtgryStatus == 0 || this.txtItemCtgryStatus == undefined)
                    && (this.txtUserField1Status == 0 || this.txtUserField1Status == undefined) && (this.txtUserField2Status == 0 || this.txtUserField2Status == undefined)) {
                    if (this.pharma == true) {
                        if ((this.txtStrengthStatus == 0 || this.txtStrengthStatus == undefined) && (this.txtDosageStatus == 0 || this.txtDosageStatus == undefined)
                            && (this.txtCiIndexstatus == 0 || this.txtCiIndexstatus == undefined)) {
                            this.disableButton = false;
                        }
                        else {
                            this.disableButton = true;
                        }
                    }
                    else {
                        this.disableButton = false;
                    }
                }
                else {
                    this.disableButton = true;
                }
            }
            else {
                this.disableButton = true;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindModelDataChange");
        }
    };
    SetupModifyItemsComponent.prototype.goBack = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        var navigationExtras = {
            queryParams: { "mode": (AtParEnums_2.ModeEnum.List).toString() },
            preserveQueryParams: false,
            relativeTo: this.route
        };
        this.router.navigate(['../'], navigationExtras);
    };
    SetupModifyItemsComponent.prototype.pharmacyChecked = function (event) {
        if (event == true) {
            this.pharma = true;
            this.newItem.PHARMACY_FLG = 1;
        }
        else {
            this.pharma = false;
            this.newItem.PHARMACY_FLG = 0;
            this.newItem.SUBSTITUTE_ITEM_FLG_STATUS = false;
            this.newItem.EVERIFY_FLG_STATUS = false;
            this.newItem.SUBSTITUTE_ITEM_FLG = 0;
            this.newItem.EVERIFY_FLG = 0;
            this.newItem.DOSAGE = "";
            this.newItem.STRENGTH = "";
            this.newItem.CINDEX = null;
        }
    };
    SetupModifyItemsComponent.prototype.lotControlledChecked = function (event) {
        if (event == true) {
            this.newItem.LOT_CONTROLLED = "Y";
        }
        else {
            this.newItem.LOT_CONTROLLED = "N";
        }
    };
    SetupModifyItemsComponent.prototype.serialControlledChecked = function (event) {
        if (event == true) {
            this.newItem.SERIAL_CONTROLLED = "Y";
        }
        else {
            this.newItem.SERIAL_CONTROLLED = "N";
        }
    };
    SetupModifyItemsComponent.prototype.implantItemChecked = function (event) {
        if (event == true) {
            this.newItem.IMPLANT_FLAG = "Y";
        }
        else {
            this.newItem.IMPLANT_FLAG = "N";
        }
    };
    SetupModifyItemsComponent.prototype.latexFreeChecked = function (event) {
        if (event == true) {
            this.newItem.LATEX_FREE = 1;
        }
        else {
            this.newItem.LATEX_FREE = 0;
        }
    };
    SetupModifyItemsComponent.prototype.substisuteItemChecked = function (event) {
        if (event == true) {
            this.newItem.SUBSTITUTE_ITEM_FLG = 1;
        }
        else {
            this.newItem.SUBSTITUTE_ITEM_FLG = 0;
        }
    };
    SetupModifyItemsComponent.prototype.everifyChecked = function (event) {
        if (event == true) {
            this.newItem.EVERIFY_FLG = 1;
        }
        else {
            this.newItem.EVERIFY_FLG = 0;
        }
    };
    SetupModifyItemsComponent.prototype.navigatVendorHome = function (statusMesssage, statusType) {
        if (statusMesssage == undefined || statusMesssage == null && statusType == undefined || statusType == null) {
            var navigationExtras = {
                queryParams: { "mode": (AtParEnums_2.ModeEnum.List).toString() },
                preserveQueryParams: false,
                relativeTo: this.route
            };
            this.router.navigate(['../'], navigationExtras);
        }
        else {
            var navigationExtras = {
                queryParams: { "mode": (AtParEnums_2.ModeEnum.List).toString(), "statusMessage": this.statusMesssage.toString(), "statusType": statusType.toString() },
                preserveQueryParams: false,
                relativeTo: this.route
            };
            this.router.navigate(['../'], navigationExtras);
        }
    };
    SetupModifyItemsComponent.prototype.clientErrorMsg = function (ex, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString(), funName, this.constructor.name);
    };
    SetupModifyItemsComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-setup-items-addmodify.component.html',
            providers: [atpar_setup_items_service_1.SetupItemsServices]
        }),
        __param(5, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [atpar_setup_items_service_1.SetupItemsServices,
            router_1.ActivatedRoute,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            AtParSharedDataService_1.AtParSharedDataService, Object, router_1.Router])
    ], SetupModifyItemsComponent);
    return SetupModifyItemsComponent;
}());
exports.SetupModifyItemsComponent = SetupModifyItemsComponent;
//# sourceMappingURL=atpar-setup-items-addmodify.component.js.map