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
/// <reference path="../entities/vm_mt_pou_billonly_items.ts" />
/// <reference path="../entities/vm_atpar_pou_locations.ts" />
/// <reference path="../entities/par_mngt_vendor.ts" />
/// <reference path="billonlyitemmaintainservice.ts" />
/// <reference path="../entities/mt_pou_billonly_items.ts" />
var core_1 = require("@angular/core");
var datatableservice_1 = require("./../components/datatable/datatableservice");
var HttpService_1 = require("../Shared/HttpService");
var http_1 = require("@angular/http");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParEnums_2 = require("../Shared/AtParEnums");
var atpar_add_user_service_1 = require("../../app/Init/atpar-add-user.service");
var router_1 = require("@angular/router");
var AtParConstants_1 = require("../Shared/AtParConstants");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var mt_pou_billonly_items_1 = require("../entities/mt_pou_billonly_items");
var vm_mt_pou_billonly_items_1 = require("../entities/vm_mt_pou_billonly_items");
var BillOnlyItemMaintainService_1 = require("./BillOnlyItemMaintainService");
var routepath_1 = require("../AtPar/Menus/routepath");
var platform_browser_1 = require("@angular/platform-browser");
var BillOnlyItemMaintenanceComponent = (function () {
    //public newItem = new PAR_MNGT_VENDOR();
    function BillOnlyItemMaintenanceComponent(dataservice, spinnerService, router, BillOnlyItemMaintainService, 
        //private atParSharedDataService: AtParSharedDataService,
        route, addUserServices, atParCommonService, httpService, document, atParConstant, http) {
        this.dataservice = dataservice;
        this.spinnerService = spinnerService;
        this.router = router;
        this.BillOnlyItemMaintainService = BillOnlyItemMaintainService;
        this.route = route;
        this.addUserServices = addUserServices;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.document = document;
        this.atParConstant = atParConstant;
        this.http = http;
        this.pop = false;
        this.table = false;
        this.page = true;
        this.form = false;
        this.editform = false;
        this.loading = true;
        this.Hideloading = true;
        this.minDateValue1 = new Date();
        this.dropdownOrgData = [];
        this.ddlFillKillFlag = [];
        this.ddlReplenishment = [];
        this.ddlOrderingType = [];
        this.ddlRequisitionType = [];
        this.ddlCostCenter = [];
        this.ddlInvBusinessUnit = [];
        this.orgGroups = [];
        this.profiles = [];
        this._deviceTokenEntry = [];
        this.growlMessage = [];
        this.ItemID = "";
        this.Description = "";
        this.OrggroupID = "";
        this.orggrpID = "";
        this.drpstatus = false;
        this.lblstatus = false;
        this.orggrpID1 = "";
        this.grdHide = false;
        this.errorMessage = "";
        this.Address2 = "";
        this.newItem = new mt_pou_billonly_items_1.MT_POU_BILLONLY_ITEMS();
        this.GetconvertGrdItem = [];
        this.newConvertItem = new vm_mt_pou_billonly_items_1.VM_MT_POU_BILLONLY_ITEMS();
        this.updateConvertdata = [];
        this.lstFilteredVendors = [];
        this.lstVendors = [];
        this.lstFilteredVendordata = [];
        this.editID = false;
        this.selectedScreenDisplayId = "";
        this.selectedScreenId = "";
        this.selectedFlagID = "";
        this.lblstatus1 = false;
        this.lblstatus2 = false;
        this.formname = "";
        this.lstFilteredItemIds = [];
        this.lstItems = [];
        this.lstItemIDs = [];
        this.filtereditemdata = [];
        this.breadCrumbMenu = new routepath_1.Menus();
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    BillOnlyItemMaintenanceComponent.prototype.ngOnInit = function () {
        try {
            this.deviceallocation = "assets/images/icons/common/convert.png";
            // this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.pageSize = +this._deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.RecordsPerPage];
            this.bindOrgDropdown();
            this.bindItemIDS();
        }
        catch (ex) {
        }
    };
    BillOnlyItemMaintenanceComponent.prototype.Validate = function () {
        if (this.newItem.VENDOR_ID != null && this.newItem.VENDOR_ID != "" && this.newItem.VENDOR_ID != "%") {
            this.vendorIDstatus = 0;
        }
        else {
            this.vendorIDstatus = 1;
        }
        if (this.vendorItemstatus == 0 && this.uomstatus == 0 && this.vendorIDstatus == 0 && (this.newItem.VEND_ITEM_ID !== "" && this.newItem.VEND_ITEM_ID != null && this.newItem.VEND_ITEM_ID != undefined) && (this.newItem.UOM !== "" && this.newItem.UOM != null && this.newItem.UOM != undefined)) {
            if ((this.DepartmentD == 0 || this.DepartmentD == undefined) &&
                (this.Manufacturer == 0 || this.Manufacturer == undefined) && (this.ManufacturerID == 0 || this.ManufacturerID == undefined) &&
                (this.UPCID == 0 || this.UPCID == undefined) && (this.ItemPrice == 0 || this.ItemPrice == undefined) &&
                (this.LotID == 0 || this.LotID == undefined) && (this.SerialID == 0 || this.SerialID == undefined) &&
                (this.GTIN == 0 || this.GTIN == undefined) && (this.Location12 == 0 || this.Location12 == undefined)) {
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
    BillOnlyItemMaintenanceComponent.prototype.bindModelDataChange = function (event) {
        //this.loading = true;
        try {
            if (this.formname == "Edit") {
                if (this.newItem.VEND_ITEM_ID == null || this.newItem.VEND_ITEM_ID == undefined || this.newItem.VEND_ITEM_ID == "") {
                    this.vendorItemstatus = null;
                }
                else {
                    this.vendorItemstatus = 0;
                }
                if (this.newItem.UOM == null || this.newItem.UOM == undefined || this.newItem.UOM == "") {
                    this.uomstatus = null;
                }
                else {
                    this.uomstatus = 0;
                }
                if ("bUnit" == event.TextBoxID.toString()) {
                    this.vendorIDstatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("VendorItemID" == event.TextBoxID.toString()) {
                    this.vendorItemstatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("UOM" == event.TextBoxID.toString()) {
                    this.uomstatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("DepartmentD" == event.TextBoxID.toString()) {
                    this.DepartmentD = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("Manufacturer" == event.TextBoxID.toString()) {
                    this.Manufacturer = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("ManufacturerID" == event.TextBoxID.toString()) {
                    this.ManufacturerID = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("UPCID" == event.TextBoxID.toString()) {
                    this.UPCID = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("ItemPrice" == event.TextBoxID.toString()) {
                    this.ItemPrice = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("LotID" == event.TextBoxID.toString()) {
                    this.LotID = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("SerialID" == event.TextBoxID.toString()) {
                    this.SerialID = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("Location12" == event.TextBoxID.toString()) {
                    this.Location12 = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("GTIN" == event.TextBoxID.toString()) {
                    this.GTIN = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                this.Validate();
                if (this.vendorItemstatus == 0 && this.uomstatus == 0 && this.vendorIDstatus == 0) {
                    if ((this.DepartmentD == 0 || this.DepartmentD == undefined) &&
                        (this.Manufacturer == 0 || this.Manufacturer == undefined) && (this.ManufacturerID == 0 || this.ManufacturerID == undefined) &&
                        (this.UPCID == 0 || this.UPCID == undefined) && (this.ItemPrice == 0 || this.ItemPrice == undefined) &&
                        (this.LotID == 0 || this.LotID == undefined) && (this.SerialID == 0 || this.SerialID == undefined) &&
                        (this.GTIN == 0 || this.GTIN == undefined) && (this.Location12 == 0 || this.Location12 == undefined)) {
                        this.loading = false;
                    }
                    else {
                        this.loading = true;
                    }
                }
                else {
                    this.loading = true;
                }
            }
            if (this.formname == "convert") {
                if (this.newConvertItem.Compartment === "" || this.newConvertItem.Compartment == null || this.newConvertItem.Compartment == undefined) {
                    this.Compartment1 = null;
                }
                else {
                    this.Compartment1 = 0;
                }
                if (this.newConvertItem.OPTIMAL_QTY == null || this.newConvertItem.OPTIMAL_QTY == undefined) {
                    this.OptQty = null;
                }
                else {
                    this.OptQty = 0;
                }
                if (this.newConvertItem.UOM_PROCUREMENT === "" || this.newConvertItem.UOM_PROCUREMENT == null || this.newConvertItem.UOM_PROCUREMENT == undefined) {
                    this.UOM = null;
                }
                else {
                    this.UOM = 0;
                }
                if (this.newConvertItem.UOM_ISSUE === "" || this.newConvertItem.UOM_ISSUE == null || this.newConvertItem.UOM_ISSUE == undefined) {
                    this.UntiOfIssue = null;
                }
                else {
                    this.UntiOfIssue = 0;
                }
                if (this.newConvertItem.CONV_FACTOR == null || this.newConvertItem.CONV_FACTOR == undefined) {
                    this.conversionrate = null;
                }
                else {
                    this.conversionrate = 0;
                }
                if ("UntiOFPAR" == event.TextBoxID.toString()) {
                    this.Location = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("FoqQty" == event.TextBoxID.toString()) {
                    this.FoqQty = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("MaxQty" == event.TextBoxID.toString()) {
                    this.MaxQty = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("ChargeCode" == event.TextBoxID.toString()) {
                    this.ChargeCode = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("CountOrder" == event.TextBoxID.toString()) {
                    this.CountOrder = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("UserField1" == event.TextBoxID.toString()) {
                    this.UserField1 = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("Compartment1" == event.TextBoxID.toString()) {
                    this.Compartment1 = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("OptQty" == event.TextBoxID.toString()) {
                    this.OptQty = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("UOM" == event.TextBoxID.toString()) {
                    this.UOM = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("UntiOfIssue" == event.TextBoxID.toString()) {
                    this.UntiOfIssue = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("conversionrate" == event.TextBoxID.toString()) {
                    this.conversionrate = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("conversionrate1" == event.TextBoxID.toString()) {
                    this.conversionrate1 = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                this.ddlBillonlyChanged();
                if (this.Compartment1 == 0 && this.OptQty == 0 && this.UOM == 0 && this.UntiOfIssue == 0 && this.conversionrate == 0 && this.ddldrpStatus == 0) {
                    if ((this.FoqQty == 0 || this.FoqQty == undefined) && (this.MaxQty == 0 || this.MaxQty == undefined) &&
                        (this.ChargeCode == 0 || this.ChargeCode == undefined) && (this.CountOrder == 0 || this.CountOrder == undefined) &&
                        (this.UserField1 == 0 || this.UserField1 == undefined) && (this.Location == 0 || this.Location == undefined) &&
                        (this.conversionrate1 == 0 || this.conversionrate1 == undefined)) {
                        this.Hideloading = false;
                    }
                    else {
                        this.Hideloading = true;
                    }
                }
                else {
                    this.Hideloading = true;
                }
            }
        }
        catch (ex) {
            //this.clientErrorMsg(ex);
        }
    };
    BillOnlyItemMaintenanceComponent.prototype.ddlBillonlyChanged = function () {
        if (this.newConvertItem.ORDERING_TYPE != "" && this.newConvertItem.REPLENISHMENT_TYPE != "" && this.newConvertItem.COST_CENTER != null && this.newConvertItem.REQUISITION_TYPE != "") {
            this.ddldrpStatus = 0;
        }
        else {
            this.ddldrpStatus = 1;
        }
        if (this.Compartment1 == 0 && this.OptQty == 0 && this.UOM == 0 && this.UntiOfIssue == 0 && this.conversionrate == 0 && this.ddldrpStatus == 0 &&
            (this.newConvertItem.Compartment !== "" && this.newConvertItem.Compartment != null && this.newConvertItem.Compartment != undefined) &&
            (this.newConvertItem.OPTIMAL_QTY != null && this.newConvertItem.OPTIMAL_QTY != undefined) &&
            (this.newConvertItem.UOM_PROCUREMENT !== "" && this.newConvertItem.UOM_PROCUREMENT != null && this.newConvertItem.UOM_PROCUREMENT != undefined) &&
            (this.newConvertItem.UOM_ISSUE !== "" && this.newConvertItem.UOM_ISSUE != null && this.newConvertItem.UOM_ISSUE != undefined) &&
            (this.newConvertItem.CONV_FACTOR != null && this.newConvertItem.CONV_FACTOR != undefined)) {
            if ((this.FoqQty == 0 || this.FoqQty == undefined) && (this.MaxQty == 0 || this.MaxQty == undefined) &&
                (this.ChargeCode == 0 || this.ChargeCode == undefined) && (this.CountOrder == 0 || this.CountOrder == undefined) &&
                (this.UserField1 == 0 || this.UserField1 == undefined) && (this.Location == 0 || this.Location == undefined) && (this.conversionrate1 == 0 || this.conversionrate1 == undefined)) {
                this.Hideloading = false;
            }
            else {
                this.Hideloading = true;
            }
        }
        else {
            this.Hideloading = true;
        }
    };
    BillOnlyItemMaintenanceComponent.prototype.bindOrgDropdown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.dropdownOrgData = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParCommonService.getUserOrgGroups(this._deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID], this._deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.resType = res;
                                // this.growlMessage = [];
                                _this.dropdownOrgData = [];
                                _this.OrggroupID = "";
                                _this.orggrpID = "All";
                                switch (res.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroups = res.DataList;
                                        _this.dropdownOrgData.push({ label: 'Select One', value: null });
                                        if (_this.orggrpID == "All") {
                                            if (_this.orgGroups.length > 1) {
                                                _this.drpstatus = true;
                                                _this.lblstatus = false;
                                                for (var i = 0; i < _this.orgGroups.length; i++) {
                                                    if (_this.orgGroups[i].ORG_GROUP_ID != "All") {
                                                        _this.dropdownOrgData.push({ label: (_this.orgGroups[i].ORG_GROUP_ID + ' - ' + _this.orgGroups[i].ORG_GROUP_NAME.replace(/\%20/g, ' ')), value: _this.orgGroups[i].ORG_GROUP_ID });
                                                    }
                                                }
                                            }
                                            else {
                                                _this.lblstatus = true;
                                                _this.drpstatus = false;
                                                _this.orggrpID1 = _this.orgGroups[0].ORG_GROUP_ID + ' - ' + _this.orgGroups[0].ORG_GROUP_NAME.replace(/\%20/g, ' ');
                                            }
                                        }
                                        else {
                                            _this.lblstatus = true;
                                            _this.orggrpID1 = _this.orgGroups[0].ORG_GROUP_ID;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BillOnlyItemMaintenanceComponent.prototype.bindItemIDS = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstItemIDs = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.lstItemIDs = [];
                        return [4 /*yield*/, this.BillOnlyItemMaintainService.GetAllBillOnlyItems(this._deviceTokenEntry)
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.resType = res;
                                // this.growlMessage = [];                 
                                switch (res.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstItemIDs = res.DataList;
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BillOnlyItemMaintenanceComponent.prototype.bindCostCenterDrp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ddlCostCenter = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.BillOnlyItemMaintainService.GetCostCenterOrgIds(this._deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID], this._deviceTokenEntry)
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.resType = res;
                                // this.growlMessage = [];
                                _this.ddlCostCenter = [];
                                /// this.OrggroupID = "";
                                // this.orggrpID = "ALL";
                                switch (res.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var datadrp = res.DataList;
                                        _this.ddlCostCenter.push({ label: 'Select One', value: null });
                                        if (datadrp.length > 0) {
                                            // this.drpstatus = true;
                                            for (var i = 0; i < datadrp.length; i++) {
                                                //if (datadrp[i].COST_CENTER_CODE.toUpperCase() != "ALL") {
                                                _this.ddlCostCenter.push({ label: (datadrp[i]), value: datadrp[i] });
                                                //}
                                            }
                                        }
                                        else {
                                            //this.lblstatus = true;
                                            //this.orggrpID1 = this.orgGroups[0].ORG_GROUP_ID + '-' + this.orgGroups[0].ORG_GROUP_NAME;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BillOnlyItemMaintenanceComponent.prototype.bindddlInvBusinessUnit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ddlInvBusinessUnit = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.BillOnlyItemMaintainService.GetInventoryBUnits(this._deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID], this._deviceTokenEntry)
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.resType = res;
                                // this.growlMessage = [];
                                _this.ddlInvBusinessUnit = [];
                                /// this.OrggroupID = "";
                                // this.orggrpID = "ALL";
                                switch (res.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var datadrp1 = res.DataList;
                                        _this.ddlInvBusinessUnit.push({ label: 'Select One', value: null });
                                        if (datadrp1.length > 0) {
                                            //this.drpstatus = true;
                                            for (var i = 0; i < datadrp1.length; i++) {
                                                //if (datadrp[i].COST_CENTER_CODE.toUpperCase() != "ALL") {
                                                _this.ddlInvBusinessUnit.push({ label: (datadrp1[i]), value: datadrp1[i] });
                                                //}
                                            }
                                        }
                                        else {
                                            //this.lblstatus = true;
                                            //this.orggrpID1 = this.orgGroups[0].ORG_GROUP_ID + '-' + this.orgGroups[0].ORG_GROUP_NAME;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BillOnlyItemMaintenanceComponent.prototype.go_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var dataitem, itemID1, lblId1, lblId, itemID, itemDesr, exception_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.editID == false) {
                            this.growlMessage = [];
                        }
                        this.filtereddata = [];
                        dataitem = this.ItemID.split(" - ");
                        itemID1 = dataitem[0];
                        if (this.drpstatus == true) {
                            lblId = this.OrggroupID;
                        }
                        else {
                            lblId1 = this.orggrpID1.split("-");
                            lblId = lblId1[0];
                        }
                        if (lblId == null || lblId == "" || lblId == undefined) {
                            this.grdHide = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Org Group ID" });
                            return [2 /*return*/];
                        }
                        if (this.ItemID != null || this.ItemID != "" || this.ItemID != undefined) {
                            itemID = this.ItemID;
                        }
                        else {
                            this.ItemID = "";
                        }
                        if (this.Description != null || this.Description != "" || this.Description != undefined) {
                            itemDesr = this.Description;
                        }
                        else {
                            this.Description = "";
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        this.grdHide = false;
                        return [4 /*yield*/, this.BillOnlyItemMaintainService.GetBillonlyItemsDtls(itemID1, lblId, this._deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.DeptID].toUpperCase(), this.Description, this._deviceTokenEntry).
                                catch(this.httpService.handleError).then(function (response) {
                                var data = response.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            if (_this.editID == false) {
                                                _this.growlMessage = [];
                                            }
                                            _this.spinnerService.stop();
                                            _this.BindGrid = [];
                                            _this.grdHide = true;
                                            var griddata = data.DataList;
                                            _this.BindGrid = griddata;
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
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
                        exception_1 = _a.sent();
                        // this.grdHide = false;
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BillOnlyItemMaintenanceComponent.prototype.Edit_click = function (ven) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exception_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // this.EditbindModelDataChange(ven);
                        this.formname = "Edit";
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Update Bill Only Item';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.growlMessage = [];
                        this.form = true;
                        this.editform = false;
                        this.page = false;
                        this.grdHide = false;
                        this.newItem = new mt_pou_billonly_items_1.MT_POU_BILLONLY_ITEMS();
                        this.loading = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        this.grdHide = false;
                        return [4 /*yield*/, this.BillOnlyItemMaintainService.GetVendorsInfo(ven.ORG_GROUP_ID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data1 = res.json();
                                switch (data1.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.growlMessage = [];
                                            _this.spinnerService.stop();
                                            // var datagrd = this.BindGrid.filter(x => x.ITEM_ID == ven.ITEM_ID && x.ORG_GROUP_ID == ven.ORG_GROUP_ID && x.DEPT_ID == ven.DEPT_ID);
                                            var datagrd = _this.BindGrid;
                                            if (datagrd.length > 0 || datagrd.length != 0) {
                                                //this.BindGrid = [];
                                                //this.Binddata = [];
                                                //this.grdHide = true;
                                                var griddata = data1.DataList;
                                                _this.Binddata = griddata;
                                                //this.lstFilteredVendordata = [];
                                                //this.lstFilteredVendordata.push({ label: 'Select VendorID', value: null });
                                                //for (let i = 0; i < this.Binddata.length; i++) {
                                                //    let Bunitvalue = this.Binddata[i].VENDOR_ID + " - " + this.Binddata[i].VENDOR_NAME;
                                                //    this.lstFilteredVendordata.push({ label: (this.Binddata[i].VENDOR_ID + " - " + this.Binddata[i].VENDOR_NAME), value: this.Binddata[i].VENDOR_ID })
                                                //}
                                                if (griddata.length > 0 || griddata.length != 0) {
                                                    var data = griddata.filter(function (x) { return x.VENDOR_ID == ven.VENDOR_ID; });
                                                    // this.BindGrid = griddata;
                                                    _this.newItem.ORG_GROUP_ID = ven.ORG_GROUP_ID;
                                                    _this.newItem.ITEM_ID = ven.ITEM_ID;
                                                    _this.newItem.DESCRIPTION = ven.DESCRIPTION;
                                                    _this.newItem.DEPT_ID = ven.DEPT_ID;
                                                    if (data.length > 0) {
                                                        if (data.length > 0) {
                                                            if (data[0].VENDOR_ID != null || data[0].VENDOR_ID != "") {
                                                                _this.newItem.VENDOR_ID = data[0].VENDOR_ID + " - " + data[0].VENDOR_NAME;
                                                            }
                                                            else {
                                                                _this.newItem.VENDOR_ID = data[0].VENDOR_ID;
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        _this.newItem.VENDOR_ID = ven.VENDOR_ID;
                                                    }
                                                    _this.newItem.VEND_ITEM_ID = ven.VEND_ITEM_ID;
                                                    // this.newItem.VEND_ITEM_ID = ""
                                                    _this.newItem.MANUFACTURER = ven.MANUFACTURER;
                                                    _this.newItem.MFG_ITEM_ID = ven.MFG_ITEM_ID;
                                                    _this.newItem.UOM = ven.UOM;
                                                    // this.newItem.UOM ="E A"
                                                    _this.newItem.UPC_ID = ven.UPC_ID;
                                                    _this.newItem.ITEM_PRICE = ven.ITEM_PRICE;
                                                    _this.newItem.LOT_ID = ven.LOT_ID;
                                                    _this.newItem.SERIAL_ID = ven.SERIAL_ID;
                                                    _this.newItem.CATALOG_FLG = ven.CATALOG_FLG;
                                                    _this.newItem.EXPIRY_DATE = ven.EXPIRY_DATE == null ? "" : ven.EXPIRY_DATE;
                                                    if (_this.newItem.EXPIRY_DATE != "") {
                                                        var changeDate = _this.newItem.EXPIRY_DATE;
                                                        var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                                        var date = new Date(dateStr);
                                                        _this.newItem.EXPIRY_DATE = date.toLocaleString();
                                                        _this.newItem.EXPIRY_DATE = _this.newItem.EXPIRY_DATE.replace(',', ' ');
                                                    }
                                                    _this.newItem.LAST_UPDATE_USER = _this._deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID];
                                                    _this.newItem.GTIN = ven.GTIN;
                                                    //if (this.newItem.VEND_ITEM_ID.match(/\s/g)) {
                                                    //    this.loading = true;
                                                    //    break;
                                                    //}
                                                    //if (this.newItem.UOM.match(/\s/g)) {
                                                    //    this.loading = true;
                                                    //    break;
                                                    //}
                                                    if (_this.newItem.VEND_ITEM_ID === "" || _this.newItem.UOM === "") {
                                                        _this.loading = true;
                                                        break;
                                                    }
                                                    if (_this.newItem.VEND_ITEM_ID !== "" || _this.newItem.VEND_ITEM_ID != null) {
                                                        if (/\s/g.test(_this.newItem.VEND_ITEM_ID)) {
                                                            // this.lblstatus1 = true;
                                                            _this.loading = true;
                                                            break;
                                                        }
                                                    }
                                                    if (_this.newItem.UOM !== "" || _this.newItem.UOM != null) {
                                                        if (/\s/g.test(_this.newItem.UOM)) {
                                                            // this.lblstatus2 = true;
                                                            _this.loading = true;
                                                            break;
                                                        }
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data1.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data1.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data1.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exception_2 = _a.sent();
                        //  this.grdHide = false;
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BillOnlyItemMaintenanceComponent.prototype.Convert = function (ven1) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exception_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.formname = "convert";
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Convert Bill Only Item';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.growlMessage = [];
                        this.form = false;
                        this.editform = false;
                        this.grdHide = false;
                        this.page = false;
                        this.pop = false;
                        this.table = true;
                        this.Hideloading = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        // this.grdHide = false;
                        return [4 /*yield*/, this.BillOnlyItemMaintainService.GetLocations(15, ven1.ORG_GROUP_ID, this._deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID], ven1.DEPT_ID, this._deviceTokenEntry).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.growlMessage = [];
                                            _this.spinnerService.stop();
                                            // this.BindGrid = [];
                                            var data2 = _this.BindGrid.filter(function (x) { return x.ITEM_ID == ven1.ITEM_ID; });
                                            _this.grdHide = false;
                                            var griddata = response.DataList;
                                            //for (let i = 0; i < griddata.length; i++) {
                                            //    griddata[i].STATUS_NAME = "status" + i;
                                            //}
                                            _this.BindConvertGrid = griddata;
                                            _this.newConvertItem.ITEM_ID = data2[0].ITEM_ID;
                                            _this.newConvertItem.ORG_GROUP_ID = data2[0].ORG_GROUP_ID;
                                            _this.newConvertItem.DEPT_ID = data2[0].DEPT_ID;
                                            _this.newConvertItem.USER_ID = _this._deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID];
                                            _this.newConvertItem.KEYVALUE = "ORG_GROUP_ID=" + data2[0].ORG_GROUP_ID + " AND DEPT_ID= " + ven1.DEPT_ID + " AND ITEM_ID= " + ven1.ITEM_ID;
                                            _this.newConvertItem.DESCRIPTION = data2[0].DESCRIPTION;
                                            _this.newConvertItem.VENDOR_ID = data2[0].VENDOR_ID;
                                            _this.newConvertItem.MANUFACTURER = data2[0].MANUFACTURER;
                                            _this.newConvertItem.MFG_ITEM_ID = data2[0].MFG_ITEM_ID;
                                            _this.newConvertItem.VEND_ITEM_ID = data2[0].VEND_ITEM_ID;
                                            _this.newConvertItem.UOM_ISSUE = data2[0].UOM;
                                            _this.newConvertItem.UOM_PROCUREMENT = data2[0].UOM;
                                            _this.newConvertItem.CONV_FACTOR = 1;
                                            _this.newConvertItem.PRICE = data2[0].ITEM_PRICE;
                                            _this.newConvertItem.UPC_ID = data2[0].UPC_ID;
                                            _this.newConvertItem.STATUS = "";
                                            _this.newConvertItem.LOT_CONTROLLED = null;
                                            _this.newConvertItem.SERIAL_CONTROLLED = null;
                                            _this.newConvertItem.CHARGE_CODE = "";
                                            _this.newConvertItem.GTIN = data2[0].GTIN;
                                            _this.newConvertItem.REPLENISHMENT_TYPE = "";
                                            _this.newConvertItem.PAR_LOC_ID = "";
                                            _this.newConvertItem.BIN = "";
                                            _this.newConvertItem.OPTIMAL_QTY = null;
                                            _this.newConvertItem.COUNT_ORDER = null;
                                            _this.newConvertItem.FILL_KILL_FLAG = "";
                                            _this.newConvertItem.COUNT_REQUIRED = null;
                                            _this.newConvertItem.MAX_QTY = null;
                                            _this.newConvertItem.FOQ_QTY = null;
                                            _this.newConvertItem.BUSINESS_UNIT = "";
                                            _this.newConvertItem.COST_CENTER = "";
                                            _this.newConvertItem.REQUISITION_TYPE = "";
                                            _this.newConvertItem.ORDERING_TYPE = "";
                                            _this.newConvertItem.USER_FIELD_1 = "";
                                            _this.newConvertItem.PAR_UOM = "";
                                            _this.newConvertItem.CONV_RT_PAR_UOM = null;
                                            _this.newConvertItem.EXPIRY_DATE = data2[0].EXPIRY_DATE;
                                            _this.newConvertItem.UOM = data2[0].UOM;
                                            _this.newConvertItem.PAR_UOM = "";
                                            _this.newConvertItem.Compartment = "";
                                            // this.newConvertItem.CONV_FACTOR = null;
                                            // this.newConvertItem.STATUS = "Active";
                                            // if (this.newConvertItem.STATUS == "Active") {
                                            _this.newConvertItem.ACTIVEFLAG = true;
                                            _this.newConvertItem.INACTIVEFLAG = false;
                                            _this.newConvertItem.PENDINGFLAG = false;
                                            // }
                                            _this.ddlFillKillFlag = [];
                                            _this.ddlReplenishment = [];
                                            _this.ddlOrderingType = [];
                                            _this.ddlRequisitionType = [];
                                            _this.bindddlInvBusinessUnit();
                                            _this.bindCostCenterDrp();
                                            _this.BindFilKillFlags();
                                            _this.BindReplenishment();
                                            _this.BindOrderingType();
                                            _this.BindRequisitionType();
                                            if (_this.newConvertItem.Compartment === "" || _this.newConvertItem.OPTIMAL_QTY == null || _this.newConvertItem.UOM_PROCUREMENT === "" || _this.newConvertItem.UOM_ISSUE === "" || _this.newConvertItem.CONV_FACTOR == null) {
                                                _this.Hideloading = true;
                                                break;
                                            }
                                            if (_this.newConvertItem.Compartment.match(/\s/g) || _this.newConvertItem.UOM_PROCUREMENT.match(/\s/g) || _this.newConvertItem.PAR_UOM.match(/\s/g) || _this.newConvertItem.UOM_ISSUE.match(/\s/g) || _this.newConvertItem.CHARGE_CODE.match(/\s/g)) {
                                                _this.Hideloading = true;
                                                break;
                                            }
                                            //if (this.newConvertItem.UOM_PROCUREMENT.match(/\s/g)) {
                                            //    this.Hideloading = true;
                                            //    return;
                                            //}
                                            //if (this.newConvertItem.PAR_UOM.match(/\s/g)) {
                                            //    this.Hideloading = true;
                                            //    return;
                                            //}
                                            //if (this.newConvertItem.UOM_ISSUE.match(/\s/g)) {
                                            //    this.Hideloading = true;
                                            //    return;
                                            //}
                                            //if (this.newConvertItem.CHARGE_CODE.match(/\s/g)) {
                                            //    this.Hideloading = true;
                                            //    return;
                                            //}
                                            // this.grdHide = false;
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn: {
                                        var data2 = _this.BindGrid.filter(function (x) { return x.ITEM_ID == ven1.ITEM_ID; });
                                        _this.newConvertItem.ITEM_ID = data2[0].ITEM_ID;
                                        _this.newConvertItem.DESCRIPTION = data2[0].DESCRIPTION;
                                        _this.newConvertItem.UOM = data2[0].UOM;
                                        _this.newConvertItem.UOM_ISSUE = data2[0].UOM;
                                        _this.newConvertItem.MAX_QTY = null;
                                        _this.newConvertItem.FOQ_QTY = null;
                                        _this.newConvertItem.OPTIMAL_QTY = null;
                                        _this.newConvertItem.CHARGE_CODE = "";
                                        _this.newConvertItem.COUNT_ORDER = null;
                                        _this.newConvertItem.USER_FIELD_1 = "";
                                        _this.newConvertItem.CONV_RT_PAR_UOM = null;
                                        _this.newConvertItem.Compartment = "";
                                        _this.newConvertItem.FILL_KILL_FLAG = "";
                                        _this.newConvertItem.REPLENISHMENT_TYPE = "";
                                        _this.newConvertItem.COST_CENTER = "";
                                        _this.newConvertItem.BUSINESS_UNIT = "";
                                        _this.newConvertItem.REQUISITION_TYPE = "";
                                        _this.newConvertItem.ORDERING_TYPE = "";
                                        _this.newConvertItem.COUNT_REQUIRED = null;
                                        _this.newConvertItem.LOT_CONTROLLED = null;
                                        _this.newConvertItem.SERIAL_CONTROLLED = null;
                                        _this.newConvertItem.STATUSVALUE = "";
                                        _this.newConvertItem.MFG_ITEM_ID = "";
                                        _this.newConvertItem.CONV_FACTOR = 1;
                                        _this.ddlFillKillFlag = [];
                                        _this.ddlReplenishment = [];
                                        _this.ddlOrderingType = [];
                                        _this.ddlRequisitionType = [];
                                        _this.bindddlInvBusinessUnit();
                                        _this.bindCostCenterDrp();
                                        _this.BindFilKillFlags();
                                        _this.BindReplenishment();
                                        _this.BindOrderingType();
                                        _this.BindRequisitionType();
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        if (_this.newConvertItem.Compartment === "" || _this.newConvertItem.OPTIMAL_QTY == null || _this.newConvertItem.UOM_PROCUREMENT === "" || _this.newConvertItem.UOM_ISSUE === "" || _this.newConvertItem.CONV_FACTOR == null) {
                                            _this.Hideloading = true;
                                            break;
                                        }
                                        if (_this.newConvertItem.Compartment.match(/\s/g) || _this.newConvertItem.UOM_PROCUREMENT.match(/\s/g) || _this.newConvertItem.PAR_UOM.match(/\s/g) || _this.newConvertItem.UOM_ISSUE.match(/\s/g) || _this.newConvertItem.CHARGE_CODE.match(/\s/g)) {
                                            _this.Hideloading = true;
                                            break;
                                        }
                                        //if (this.newConvertItem.OPTIMAL_QTY == null) {
                                        //    this.Hideloading = true;
                                        //    break;
                                        //}
                                        //if (this.newConvertItem.UOM_PROCUREMENT === "") {
                                        //    this.Hideloading = true;
                                        //    break;
                                        //}
                                        //if (this.newConvertItem.UOM_ISSUE === "") {
                                        //    this.Hideloading = true;
                                        //    break;
                                        //}
                                        //if (this.newConvertItem.CONV_FACTOR == null) {
                                        //    this.Hideloading = true;
                                        //    break;
                                        //}
                                        //  this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        _this.Hideloading = true;
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
                        // this.grdHide = false;
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exception_3 = _a.sent();
                        //this.grdHide = false;
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BillOnlyItemMaintenanceComponent.prototype.edit = function () {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    };
    BillOnlyItemMaintenanceComponent.prototype.btn_Update = function () {
        var _this = this;
        this.growlMessage = [];
        this.updatedata = [];
        this.editform = false;
        var data;
        if (this.newItem != null) {
            if (this.newItem.VEND_ITEM_ID == null || this.newItem.VEND_ITEM_ID === "") {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Vendor Item ID"
                });
                return;
            }
            if (this.newItem.UOM == null || this.newItem.UOM === "") {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Valid UOM"
                });
                return;
            }
            if (this.newItem.VENDOR_ID == null || this.newItem.VENDOR_ID === "") {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter VendorID"
                });
                return;
            }
            //this.newItem.VEND_ITEM_ID = this.newItem.VEND_ITEM_ID.replace(/\s/g, '');
            //if (this.newItem.VEND_ITEM_ID.replace(/\s/g, ''))
            //if (this.newItem.VEND_ITEM_ID.match(/\s/g)) {
            //    this.growlMessage = [];
            //    this.growlMessage.push({
            //        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid Vendor Item ID"
            //    });
            //    return;
            //}
            //if (this.newItem.MFG_ITEM_ID.match(/\s/g)) {
            //    this.growlMessage = [];
            //    this.growlMessage.push({
            //        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid Manufacturer Item ID"
            //    });
            //    return;
            //}
            //if (this.newItem.UOM.match(/\s/g)) {
            //    this.growlMessage = [];
            //    this.growlMessage.push({
            //        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid UOM"
            //    });
            //    return;
            //}
            //if (this.newItem.UPC_ID.match(/\s/g)) {
            //    this.growlMessage = [];
            //    this.growlMessage.push({
            //        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid UPC ID"
            //    });
            //    return;
            //}
            //if (this.newItem.LOT_ID.match(/\s/g)) {
            //    this.growlMessage = [];
            //    this.growlMessage.push({
            //        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid Lot ID"
            //    });
            //    return;
            //}
            //if (this.newItem.SERIAL_ID.match(/\s/g)) {
            //    this.growlMessage = [];
            //    this.growlMessage.push({
            //        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid Serial ID"
            //    });
            //    return;
            //}
            //if (this.newItem.GTIN.match(/\s/g)) {
            //    this.growlMessage = [];
            //    this.growlMessage.push({
            //        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid GTIN"
            //    });
            //    return;
            //}
            if (/\s/g.test(this.newItem.VEND_ITEM_ID)) {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Invalid Vendor Item ID"
                });
                return;
            }
            if (/\s/g.test(this.newItem.MFG_ITEM_ID)) {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Invalid Manufacturer Item ID"
                });
                return;
            }
            if (/\s/g.test(this.newItem.UOM)) {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Invalid UOM"
                });
                return;
            }
            if (/\s/g.test(this.newItem.UPC_ID)) {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Invalid UPC ID"
                });
                return;
            }
            if (/\s/g.test(this.newItem.LOT_ID)) {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Invalid Lot ID"
                });
                return;
            }
            if (/\s/g.test(this.newItem.SERIAL_ID)) {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Invalid Serial ID"
                });
                return;
            }
            if (/\s/g.test(this.newItem.GTIN)) {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Invalid GTIN"
                });
                return;
            }
            else {
                data = this.newItem.VENDOR_ID.trim().split(" - ");
                this.newItem.VENDOR_ID = data[0];
                //this.newItem.VENDOR_ID = data[0];
                //let dd = this.newItem.VENDOR_ID.trim();
                //this.newItem.VENDOR_ID = dd;
                var data1 = this.newItem;
                this.updatedata.push(data1);
            }
        }
        try {
            this.BillOnlyItemMaintainService.UpdateBillonlyItemsDtls(this.updatedata, this._deviceTokenEntry).subscribe(function (res) { return __awaiter(_this, void 0, void 0, function () {
                var data, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            data = res.json();
                            _a = data.StatType;
                            switch (_a) {
                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 3];
                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 4];
                                case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 5];
                            }
                            return [3 /*break*/, 6];
                        case 1:
                            // this.dropdownOrgData = [];
                            this.form = true;
                            this.editform = false;
                            this.page = false;
                            this.lstFilteredVendordata = [];
                            this.lstFilteredVendordata.push({ label: 'Select VendorID', value: null });
                            this.editID = true;
                            //   this.bindOrgDropdown();
                            return [4 /*yield*/, this.go_Click()];
                        case 2:
                            //   this.bindOrgDropdown();
                            _b.sent();
                            this.grdHide = false;
                            this.growlMessage.push({
                                severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Item " + this.newItem.ITEM_ID + " Updated Successfully"
                            });
                            return [3 /*break*/, 6];
                        case 3:
                            {
                                // to do where do we show error message
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                return [3 /*break*/, 6];
                            }
                            _b.label = 4;
                        case 4:
                            {
                                // to do
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                return [3 /*break*/, 6];
                            }
                            _b.label = 5;
                        case 5:
                            {
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                return [3 /*break*/, 6];
                            }
                            _b.label = 6;
                        case 6:
                            this.atParConstant.scrollToTop();
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        catch (ex) {
        }
    };
    BillOnlyItemMaintenanceComponent.prototype.close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.form = false;
        this.page = true;
        this.pop = true;
        this.editform = false;
        this.table = false;
        this.editID = false;
        //   this.bindOrgDropdown();
        this.grdHide = false;
        //this.dataservice.getpouBillonlyitem().then(countries => { this.sales = countries; });
    };
    BillOnlyItemMaintenanceComponent.prototype.closeConvert = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.form = false;
        this.page = true;
        this.pop = true;
        this.editform = false;
        this.table = false;
        this.editID = false;
        // this.bindOrgDropdown();
        // this.bindOrgDropdown();
        this.grdHide = false;
        //this.dataservice.getpouBillonlyitem().then(countries => { this.sales = countries; });
    };
    BillOnlyItemMaintenanceComponent.prototype.grddata = function (ven3) {
        this.growlMessage = [];
        if (ven3 != null || ven3 != undefined) {
            var dd = ven3;
            this.GetconvertGrdItem.push(ven3);
            return;
        }
        else {
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please allocate at least one AtPar Par Location to continue"
            });
            return;
        }
    };
    BillOnlyItemMaintenanceComponent.prototype.ConvertSave_clcik = function () {
        var _this = this;
        this.growlMessage = [];
        var getconvertdata = this.GetconvertGrdItem;
        var adata112 = this.selectedScreenDisplayId;
        var t1 = this.selectedFlagID;
        var t2 = this.selectedScreenId;
        if (getconvertdata == null || getconvertdata == undefined || getconvertdata.length == 0) {
            // this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please allocate at least one AtPar Par Location to continue"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        var parrate;
        parrate = this.newConvertItem.CONV_FACTOR;
        this.newConvertItem.CONV_RT_PAR_UOM = parrate;
        var parUom = this.newConvertItem.PAR_UOM;
        if (parUom != null || parUom != "") {
            if (parrate == null || parrate == "") {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Par Conversion Rate"
                });
                this.atParConstant.scrollToTop();
                return;
            }
        }
        else if (parrate != null || parrate != "") {
            if (parUom == null || parUom == "") {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Par UOM"
                });
                this.atParConstant.scrollToTop();
                return;
            }
        }
        else if (parrate == null || parrate == "") {
            if (parUom == null || parUom == "") {
                this.newConvertItem.CONV_RT_PAR_UOM = 1;
                return;
            }
        }
        var data22 = this.newConvertItem;
        if (data22.Compartment == null || data22.Compartment == "") {
            //  this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Compartment ID"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.OPTIMAL_QTY == null || data22.OPTIMAL_QTY == undefined) {
            //  this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Opt QTY"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.ORDERING_TYPE == null || data22.ORDERING_TYPE == "") {
            // this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Select Ordering Type"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.UOM_PROCUREMENT == null || data22.UOM_PROCUREMENT == "") {
            //  this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Unit Of Procurement"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.UOM_ISSUE == null || data22.UOM_ISSUE == "") {
            // this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Unit Of Issue"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.CONV_RT_PAR_UOM == null || data22.CONV_RT_PAR_UOM == undefined) {
            // this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Conversion Rate"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.REPLENISHMENT_TYPE == null || data22.REPLENISHMENT_TYPE == "") {
            //this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Select Replenishment Type"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.COST_CENTER == null || data22.COST_CENTER == "") {
            // this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Select Cost Center"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.REQUISITION_TYPE == null || data22.REQUISITION_TYPE == "") {
            // this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Select Requisition Type"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.Compartment.match(/\s/g)) {
            this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Invalid Compartment"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.UOM_PROCUREMENT.match(/\s/g)) {
            this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Invalid UOM Procurement"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.PAR_UOM.match(/\s/g)) {
            this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Invalid UOM(Par)"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.UOM_ISSUE.match(/\s/g)) {
            this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Invalid UPC Issue"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.CHARGE_CODE.match(/\s/g)) {
            this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Invalid Charge Code"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        //if (data22.ACTIVEFLAG == true) {
        //    data22.STATUS = "Y";
        //}
        //else if (data22.INACTIVEFLAG == true) {
        //    data22.STATUS = "N";
        //}
        //else {
        //    data22.STATUS = "P";
        //}
        // data22.STATUS = "Y";
        if (data22.CONTROLSTATUS == true) {
            data22.SERIAL_CONTROLLED = "Y";
        }
        else {
            data22.SERIAL_CONTROLLED = "N";
        }
        if (data22.LOTSTATUS == true) {
            data22.LOT_CONTROLLED = "Y";
        }
        else {
            data22.LOT_CONTROLLED = "N";
        }
        if (data22.COUNTSTATUS == true) {
            data22.COUNT_REQUIRED = "Y";
        }
        else {
            data22.COUNT_REQUIRED = "N";
        }
        data22.BUSINESS_UNIT = getconvertdata[0].BUSINESS_UNIT;
        data22.PAR_LOC_ID = getconvertdata[0].LOCATION;
        if (data22 != null) {
            this.updateConvertdata.push(data22);
        }
        //for (let j = 0; j < this.updateConvertdata.length; j++) {
        //    this.updateConvertdata[j].Compartment=
        //}
        try {
            this.BillOnlyItemMaintainService.ConvertBillonlyItem(this.updateConvertdata, this._deviceTokenEntry).subscribe(function (res) {
                _this.growlMessage = [];
                _this.spinnerService.stop();
                var data = res.json();
                switch (data.StatType) {
                    case AtParEnums_1.StatusType.Success:
                        {
                            _this.dropdownOrgData = [];
                            _this.form = false;
                            _this.editform = false;
                            _this.page = true;
                            _this.grdHide = false;
                            _this.table = false;
                            _this.editID = true;
                            // this.bindOrgDropdown();
                            _this.go_Click();
                            _this.growlMessage.push({
                                severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Item " + _this.newConvertItem.ITEM_ID + " Converted Successfully"
                            });
                            break;
                        }
                    case AtParEnums_1.StatusType.Error:
                        {
                            // to do where do we show error message
                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                    case AtParEnums_1.StatusType.Warn:
                        {
                            // to do
                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                    case AtParEnums_1.StatusType.Custom: {
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
                _this.atParConstant.scrollToTop();
            });
        }
        catch (ex) {
        }
    };
    BillOnlyItemMaintenanceComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    BillOnlyItemMaintenanceComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    BillOnlyItemMaintenanceComponent.prototype.BindFilKillFlags = function () {
        this.ddlFillKillFlag.push({ label: 'Select One', value: "" });
        this.ddlFillKillFlag.push({ label: "Fill", value: "F" });
        this.ddlFillKillFlag.push({ label: "Kill", value: "K" });
    };
    BillOnlyItemMaintenanceComponent.prototype.changeStatus = function (statusType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.spinnerService.start();
                if (statusType == "Active") {
                    this.newConvertItem.ACTIVEFLAG = true;
                    this.newConvertItem.INACTIVEFLAG = false;
                    this.newConvertItem.PENDINGFLAG = false;
                    this.newConvertItem.STATUS = "Y";
                }
                else if (statusType == "InActive") {
                    this.newConvertItem.ACTIVEFLAG = false;
                    this.newConvertItem.INACTIVEFLAG = true;
                    this.newConvertItem.PENDINGFLAG = false;
                    this.newConvertItem.STATUS = "N";
                }
                else if (statusType == "Pending") {
                    this.newConvertItem.ACTIVEFLAG = false;
                    this.newConvertItem.INACTIVEFLAG = false;
                    this.newConvertItem.PENDINGFLAG = true;
                    this.newConvertItem.STATUS = "P";
                }
                this.spinnerService.stop();
                return [2 /*return*/];
            });
        });
    };
    BillOnlyItemMaintenanceComponent.prototype.BindReplenishment = function () {
        this.ddlReplenishment.push({ label: 'Select One', value: "" });
        this.ddlReplenishment.push({ label: "Stock", value: "1" });
        this.ddlReplenishment.push({ label: "Nonstock", value: "2" });
        this.ddlReplenishment.push({ label: "Stockless", value: "3" });
        this.ddlReplenishment.push({ label: "Consignment", value: "4" });
    };
    BillOnlyItemMaintenanceComponent.prototype.BindOrderingType = function () {
        this.ddlOrderingType.push({ label: 'Select One', value: "" });
        this.ddlOrderingType.push({ label: "Par", value: "01" });
        this.ddlOrderingType.push({ label: "Foq", value: "02" });
        this.ddlOrderingType.push({ label: "Min/Max", value: "03" });
        this.ddlOrderingType.push({ label: "Issue", value: "04" });
    };
    BillOnlyItemMaintenanceComponent.prototype.BindRequisitionType = function () {
        this.ddlRequisitionType.push({ label: 'Select One', value: "" });
        this.ddlRequisitionType.push({ label: "Issue", value: "I" });
        this.ddlRequisitionType.push({ label: "Transfer", value: "T" });
    };
    BillOnlyItemMaintenanceComponent.prototype.fillBUnitsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query, data32;
            return __generator(this, function (_a) {
                this.lstFilteredVendors = [];
                query = event.query;
                try {
                    data32 = this.Binddata;
                    this.lstVendors = data32;
                    this.lstFilteredVendors = this.filterBusinessUnits(query, this.lstVendors);
                }
                catch (ex) {
                    //  this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    BillOnlyItemMaintenanceComponent.prototype.filterBusinessUnits = function (query, businessunits) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < businessunits.length; i++) {
                var Bunitvalue = businessunits[i].VENDOR_ID + " - " + businessunits[i].VENDOR_NAME;
                filtered.push(Bunitvalue);
            }
            this.filtereddata = filtered;
        }
        else {
            if (query.length >= 0) {
                for (var i = 0; i < businessunits.length; i++) {
                    var Bunitvalue = businessunits[i].VENDOR_ID + " - " + businessunits[i].VENDOR_NAME;
                    if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(Bunitvalue);
                    }
                }
                this.filtereddata = filtered;
            }
        }
        if (this.filtereddata.length == 0) {
            this.newItem.VENDOR_ID = "";
            this.loading = true;
        }
        else {
            this.loading = false;
        }
        return filtered;
    };
    BillOnlyItemMaintenanceComponent.prototype.fillItemIDsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query, dataIDs;
            return __generator(this, function (_a) {
                this.lstFilteredItemIds = [];
                query = event.query;
                try {
                    dataIDs = this.lstItemIDs;
                    this.lstItems = dataIDs;
                    this.lstFilteredItemIds = this.filterBillonlyItems(query, this.lstItems);
                }
                catch (ex) {
                    //  this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    BillOnlyItemMaintenanceComponent.prototype.filterBillonlyItems = function (query, ItemID) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < ItemID.length; i++) {
                var Bunitvalue = ItemID[i].ITEM_ID + " - " + ItemID[i].DESCRIPTION;
                filtered.push(Bunitvalue);
            }
            this.filtereditemdata = filtered;
        }
        else {
            if (query.length >= 0) {
                for (var i = 0; i < ItemID.length; i++) {
                    var Bunitvalue = ItemID[i].ITEM_ID + " - " + ItemID[i].DESCRIPTION;
                    if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(Bunitvalue);
                    }
                }
                this.filtereditemdata = filtered;
            }
        }
        if (this.filtereditemdata.length == 0) {
            // this.ITEM_ID = "";
            this.loading = true;
        }
        else {
            this.loading = false;
        }
        return filtered;
    };
    BillOnlyItemMaintenanceComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-bill-only-item-maintenance.component.html',
            // providers: [datatableservice],
            providers: [atpar_add_user_service_1.AddUserServices, AtParConstants_1.AtParConstants, atpar_common_service_1.AtParCommonService, datatableservice_1.datatableservice, BillOnlyItemMaintainService_1.BillOnlyItemMaintainService],
        }),
        __param(8, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            event_spinner_service_1.SpinnerService,
            router_1.Router,
            BillOnlyItemMaintainService_1.BillOnlyItemMaintainService,
            router_1.ActivatedRoute,
            atpar_add_user_service_1.AddUserServices,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService, Object, AtParConstants_1.AtParConstants,
            http_1.Http])
    ], BillOnlyItemMaintenanceComponent);
    return BillOnlyItemMaintenanceComponent;
}());
exports.BillOnlyItemMaintenanceComponent = BillOnlyItemMaintenanceComponent;
//# sourceMappingURL=pou-bill-only-item-maintenance.component.js.map