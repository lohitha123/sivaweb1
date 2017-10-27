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
var atpar_setup_items_service_1 = require("../../app/Init/atpar-setup-items-service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var AtParEnums_2 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParEnums_3 = require("./../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var SetupItemsHomeComponent = (function () {
    function SetupItemsHomeComponent(setupItemServices, router, route, atParConstant, atParSharedDataService, spinnerService) {
        this.setupItemServices = setupItemServices;
        this.router = router;
        this.route = route;
        this.atParConstant = atParConstant;
        this.atParSharedDataService = atParSharedDataService;
        this.spinnerService = spinnerService;
        this.msgs = [];
        this.lstVendordata = [];
        this.lstSetupItemsData = [];
        this._deviceTokenEntry = [];
        this.selectedItemId = "";
        this.selectedDescription = "";
        this.selectedVendor = "";
        this.selectedManufacturer = "";
        this.selectedUpicId = "";
        this.selectedFromItemPrice = "";
        this.selectedToItemPrice = "";
        this.selectedVendorItemId = "";
        this.selectedMfgItemId = "";
        this.selectedCustItemId = "";
        this.selectedSubItems = false;
        this.gridShowHide = false;
        this.hdnSubItems = "";
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    SetupItemsHomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinnerService.start();
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPage = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.route.queryParams.subscribe(function (params) {
            var statusMessage = params["statusMessage"];
            _this.mode = params["mode"];
            var statusType = params["statusType"];
            if (statusType !== null && statusType != undefined) {
                if (statusType == "success") {
                    _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                }
            }
            if (statusType == "warn") {
                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: statusMessage });
            }
        });
        this.BindVendors();
        this.statusList = [];
        this.statusList.push({ label: 'All', value: null });
        this.statusList.push({ label: 'Active', value: true });
        this.statusList.push({ label: 'InActive', value: false });
    };
    SetupItemsHomeComponent.prototype.BindVendors = function () {
        var _this = this;
        try {
            this.spinnerService.start();
            if (this.vendorSearch == undefined || this.vendorSearch == null || this.vendorSearch.length == 0) {
                this.vendorSearch = "";
            }
            this.setupItemServices.getVendorDetails(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], '', this.vendorSearch.trim())
                .forEach(function (resp) {
                _this.spinnerService.stop();
                switch (resp.StatType) {
                    case AtParEnums_3.StatusType.Success:
                        {
                            _this.lstVendordata.push({ label: "Select One", value: "" });
                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                _this.lstVendordata.push({ label: resp.DataList[i].VENDOR_ID + " - " + resp.DataList[i].VENDOR_NAME, value: resp.DataList[i].VENDOR_ID });
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
                                _this.lstVendordata.push({ label: "Select One", value: "" });
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
                            break;
                        }
                }
            });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindVendors");
        }
    };
    SetupItemsHomeComponent.prototype.BindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.currentStatusList = [];
                    this.currentStatusList.push({ label: 'All', value: null });
                    this.currentStatusList.push({ label: 'Active', value: 'Active' });
                    this.currentStatusList.push({ label: 'InActive', value: 'InActive' });
                    this.currentStatusList.push({ label: 'Pending', value: 'Pending' });
                    if (this.gridShowHide == true) {
                        this.dataTableComponent.reset();
                    }
                    this.msgs = [];
                    this.spinnerService.start();
                    this.gridShowHide = false;
                    if (this.selectedFromItemPrice !== "" && this.selectedToItemPrice === "" || this.selectedFromItemPrice === "" && this.selectedToItemPrice !== "") {
                        this.msgs = [];
                        this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: "Please enter both Item Price From and To values." });
                        this.spinnerService.stop();
                        return [2 /*return*/, false];
                    }
                    if (this.selectedSubItems == true) {
                        this.hdnSubItems = "True";
                    }
                    else {
                        this.hdnSubItems = "False";
                    }
                    this.setupItemServices.getItemDetails(this.selectedItemId, this.selectedDescription, this.selectedVendor, this.selectedUpicId, this.selectedManufacturer, this.selectedFromItemPrice, this.selectedToItemPrice, this.selectedCustItemId, this.selectedVendorItemId, this.selectedMfgItemId, "", "", "", false, this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.selectedSubItems)
                        .forEach(function (resp) {
                        switch (resp.StatType) {
                            case AtParEnums_3.StatusType.Success:
                                {
                                    _this.gridShowHide = true;
                                    _this.lstSetupItemsData = resp.DataList;
                                    for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                        if (resp.DataList[i].STATUS == 0) {
                                            resp.DataList[i].STATUS = "Active";
                                            resp.DataList[i].STATUS_ACTIVE_INACTIVE = true;
                                        }
                                        else if (resp.DataList[i].STATUS == 1) {
                                            resp.DataList[i].STATUS = "Inactive";
                                            resp.DataList[i].isEnabled = true;
                                            resp.DataList[i].STATUS_ACTIVE_INACTIVE = false;
                                        }
                                        else {
                                            resp.DataList[i].STATUS = "Pending";
                                            resp.DataList[i].STATUS_ACTIVE_INACTIVE = false;
                                        }
                                        if (resp.DataList[i].ITEM_PRICE != 0) {
                                            resp.DataList[i].ITEM_PRICE = parseFloat(resp.DataList[i].ITEM_PRICE).toFixed(2);
                                        }
                                        else {
                                            resp.DataList[i].ITEM_PRICE = '';
                                        }
                                        if (resp.DataList[i].PAR_UOM == '' || resp.DataList[i].PAR_UOM == null || resp.DataList[i].PAR_UOM == 'null') {
                                            resp.DataList[i].CONV_RATE_PAR_UOM = '';
                                        }
                                        _this.resultConvFact = '';
                                        if (resp.DataList[i].CONV_FACTOR !== "" && resp.DataList[i].CONV_FACTOR != null && resp.DataList[i].CONV_RATE_PAR_UOM !== "" && resp.DataList[i].CONV_RATE_PAR_UOM != null) {
                                            _this.resultConvFact = resp.DataList[i].CONV_FACTOR / resp.DataList[i].CONV_RATE_PAR_UOM;
                                        }
                                        var _strFinalConvFact = '';
                                        _strFinalConvFact = _this.resultConvFact == '0' ? '' : _this.resultConvFact + '';
                                        if ((resp.DataList[i].UNIT_OF_PROCUREMENT == '' || resp.DataList[i].UNIT_OF_PROCUREMENT == null || resp.DataList[i].UNIT_OF_PROCUREMENT == 'null') && (_strFinalConvFact == ''
                                            || _strFinalConvFact == null) && (resp.DataList[i].PAR_UOM == '' || resp.DataList[i].PAR_UOM == null ||
                                            resp.DataList[i].PAR_UOM == 'null') && (resp.DataList[i].CONV_FACTOR == "" || resp.DataList[i].CONV_FACTOR == null || resp.DataList[i].CONV_FACTOR == 'null')
                                            && (resp.DataList[i].UNIT_OF_ISSUE == "" || resp.DataList[i].UNIT_OF_ISSUE == null || resp.DataList[i].UNIT_OF_ISSUE == 'null')) {
                                            _this.packagingString = '';
                                        }
                                        else {
                                            var proc_V = (resp.DataList[i].UNIT_OF_PROCUREMENT == '' || resp.DataList[i].UNIT_OF_PROCUREMENT == null || resp.DataList[i].UNIT_OF_PROCUREMENT == 'null') ? '_' : resp.DataList[i].UNIT_OF_PROCUREMENT + '';
                                            var finalConv_V = (_strFinalConvFact == '' || _strFinalConvFact == null) ? '_' : _strFinalConvFact + '';
                                            var par_UOM_V = (resp.DataList[i].PAR_UOM == '' || resp.DataList[i].PAR_UOM == null || resp.DataList[i].PAR_UOM == 'null') ? '_' : resp.DataList[i].PAR_UOM + '';
                                            var conv_V = (resp.DataList[i].CONV_FACTOR == '' || resp.DataList[i].CONV_FACTOR == null || resp.DataList[i].CONV_FACTOR == 'null') ? '_' : resp.DataList[i].CONV_FACTOR + '';
                                            var unit_V = (resp.DataList[i].UNIT_OF_ISSUE == '' || resp.DataList[i].UNIT_OF_ISSUE == null || resp.DataList[i].UNIT_OF_ISSUE == 'null') ? '_' : resp.DataList[i].UNIT_OF_ISSUE + '';
                                            _this.packagingString = proc_V + ' /' + finalConv_V + ' ' + par_UOM_V + ' /' + conv_V + ' ' + unit_V;
                                        }
                                        resp.DataList[i].PACKAGING_STRING = _this.packagingString;
                                        if (resp.DataList[i].PHARMACY_FLG == 1 && resp.DataList[i].SUBSTITUTE_ITEM_FLG == 0) {
                                            resp.DataList[i].SUB_ITEM_FLG_STATUS = true;
                                        }
                                        else {
                                            resp.DataList[i].SUB_ITEM_FLG_STATUS = false;
                                        }
                                    }
                                    _this.lstSetupItemsData = resp.DataList;
                                    _this.spinnerService.stop();
                                    break;
                                }
                            case AtParEnums_3.StatusType.Error:
                                {
                                    _this.msgs = [];
                                    _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                    _this.gridShowHide = false;
                                    _this.spinnerService.stop();
                                    break;
                                }
                            case AtParEnums_3.StatusType.Warn:
                                {
                                    _this.msgs = [];
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                    _this.gridShowHide = false;
                                    _this.spinnerService.stop();
                                    break;
                                }
                            case AtParEnums_3.StatusType.Custom:
                                {
                                    _this.msgs = [];
                                    _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                    _this.gridShowHide = false;
                                    break;
                                }
                        }
                    });
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "BindGrid");
                }
                return [2 /*return*/];
            });
        });
    };
    SetupItemsHomeComponent.prototype.addSetupItem = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Item';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        var navigationExtras = {
            queryParams: {
                "mode": AtParEnums_2.ModeEnum.Add,
                "appId": 2
            },
            relativeTo: this.route
        };
        this.router.navigate(['setupmodifyitems'], navigationExtras);
    };
    SetupItemsHomeComponent.prototype.UpdateSetupItem = function (SetupModifyItemsEditData) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Item';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        SetupModifyItemsEditData.ITEM_PRICE = +SetupModifyItemsEditData.ITEM_PRICE.toString().split("/")[0];
        this.atParSharedDataService.storage = SetupModifyItemsEditData;
        var navigationExtras = {
            queryParams: {
                "mode": AtParEnums_2.ModeEnum.Edit
            },
            relativeTo: this.route
        };
        this.router.navigate(['setupmodifyitems'], navigationExtras);
    };
    SetupItemsHomeComponent.prototype.updateItemStatus = function (ItemId, event) {
        var _this = this;
        try {
            this.setupItemServices.UpdateItemStatus(ItemId, event).forEach(function (resp) {
                _this.msgs = [];
                _this.spinnerService.start();
                switch (resp.StatType) {
                    case AtParEnums_3.StatusType.Success:
                        {
                            _this.msgs = [];
                            resp.StatusMessage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Item").replace("2%", ItemId);
                            _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: resp.StatusMessage });
                            _this.loadGridAfterStatusUpdate();
                            break;
                        }
                    case AtParEnums_3.StatusType.Warn:
                        {
                            _this.msgs = [];
                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
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
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "updateItemStatus");
        }
    };
    SetupItemsHomeComponent.prototype.loadGridAfterStatusUpdate = function () {
        var _this = this;
        try {
            this.setupItemServices.getItemDetails(this.selectedItemId, this.selectedDescription, this.selectedVendor, this.selectedUpicId, this.selectedManufacturer, this.selectedFromItemPrice, this.selectedToItemPrice, this.selectedCustItemId, this.selectedVendorItemId, this.selectedMfgItemId, "", "", "", false, this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.selectedSubItems)
                .forEach(function (resp) {
                _this.spinnerService.start();
                switch (resp.StatType) {
                    case AtParEnums_3.StatusType.Success:
                        {
                            _this.lstSetupItemsData = resp.DataList;
                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                if (resp.DataList[i].STATUS == 0) {
                                    resp.DataList[i].STATUS = "Active";
                                    resp.DataList[i].STATUS_ACTIVE_INACTIVE = true;
                                }
                                else if (resp.DataList[i].STATUS == 1) {
                                    resp.DataList[i].STATUS = "Inactive";
                                    resp.DataList[i].isEnabled = true;
                                    resp.DataList[i].STATUS_ACTIVE_INACTIVE = false;
                                }
                                else {
                                    resp.DataList[i].STATUS = "Pending";
                                    resp.DataList[i].STATUS_ACTIVE_INACTIVE = false;
                                }
                                if (resp.DataList[i].ITEM_PRICE != 0) {
                                    resp.DataList[i].ITEM_PRICE = parseFloat(resp.DataList[i].ITEM_PRICE).toFixed(2);
                                }
                                else {
                                    resp.DataList[i].ITEM_PRICE = '';
                                }
                                if (resp.DataList[i].PAR_UOM == '' || resp.DataList[i].PAR_UOM == null || resp.DataList[i].PAR_UOM == 'null') {
                                    resp.DataList[i].CONV_RATE_PAR_UOM = '';
                                }
                                _this.resultConvFact = '';
                                if (resp.DataList[i].CONV_FACTOR !== "" && resp.DataList[i].CONV_FACTOR != null && resp.DataList[i].CONV_RATE_PAR_UOM !== "" && resp.DataList[i].CONV_RATE_PAR_UOM != null) {
                                    _this.resultConvFact = resp.DataList[i].CONV_FACTOR / resp.DataList[i].CONV_RATE_PAR_UOM;
                                }
                                var _strFinalConvFact = '';
                                _strFinalConvFact = _this.resultConvFact == '0' ? '' : _this.resultConvFact + '';
                                if ((resp.DataList[i].UNIT_OF_PROCUREMENT == '' || resp.DataList[i].UNIT_OF_PROCUREMENT == null || resp.DataList[i].UNIT_OF_PROCUREMENT == 'null') && (_strFinalConvFact == ''
                                    || _strFinalConvFact == null) && (resp.DataList[i].PAR_UOM == '' || resp.DataList[i].PAR_UOM == null ||
                                    resp.DataList[i].PAR_UOM == 'null') && (resp.DataList[i].CONV_FACTOR == "" || resp.DataList[i].CONV_FACTOR == null || resp.DataList[i].CONV_FACTOR == 'null')
                                    && (resp.DataList[i].UNIT_OF_ISSUE == "" || resp.DataList[i].UNIT_OF_ISSUE == null || resp.DataList[i].UNIT_OF_ISSUE == 'null')) {
                                    _this.packagingString = '';
                                }
                                else {
                                    var proc_V = (resp.DataList[i].UNIT_OF_PROCUREMENT == '' || resp.DataList[i].UNIT_OF_PROCUREMENT == null || resp.DataList[i].UNIT_OF_PROCUREMENT == 'null') ? '_' : resp.DataList[i].UNIT_OF_PROCUREMENT + '';
                                    var finalConv_V = (_strFinalConvFact == '' || _strFinalConvFact == null) ? '_' : _strFinalConvFact + '';
                                    var par_UOM_V = (resp.DataList[i].PAR_UOM == '' || resp.DataList[i].PAR_UOM == null || resp.DataList[i].PAR_UOM == 'null') ? '_' : resp.DataList[i].PAR_UOM + '';
                                    var conv_V = (resp.DataList[i].CONV_FACTOR == '' || resp.DataList[i].CONV_FACTOR == null || resp.DataList[i].CONV_FACTOR == 'null') ? '_' : resp.DataList[i].CONV_FACTOR + '';
                                    var unit_V = (resp.DataList[i].UNIT_OF_ISSUE == '' || resp.DataList[i].UNIT_OF_ISSUE == null || resp.DataList[i].UNIT_OF_ISSUE == 'null') ? '_' : resp.DataList[i].UNIT_OF_ISSUE + '';
                                    _this.packagingString = proc_V + ' /' + finalConv_V + ' ' + par_UOM_V + ' /' + conv_V + ' ' + unit_V;
                                }
                                resp.DataList[i].PACKAGING_STRING = _this.packagingString;
                                if (resp.DataList[i].PHARMACY_FLG == 1 && resp.DataList[i].SUBSTITUTE_ITEM_FLG == 0) {
                                    resp.DataList[i].SUB_ITEM_FLG_STATUS = true;
                                }
                                else {
                                    resp.DataList[i].SUB_ITEM_FLG_STATUS = false;
                                }
                            }
                            _this.lstSetupItemsData = resp.DataList;
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
            this.clientErrorMsg(ex, "loadGridAfterStatusUpdate");
        }
    };
    SetupItemsHomeComponent.prototype.addSubstituteItem = function (SetupSubstituteItemsEditData) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Substitute Items';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.atParSharedDataService.storage = SetupSubstituteItemsEditData;
        var navigationExtras = {
            queryParams: {
                "mode": AtParEnums_2.ModeEnum.Add,
                "appId": 2
            },
            relativeTo: this.route
        };
        this.router.navigate(['setupsubstituteitems'], navigationExtras);
    };
    SetupItemsHomeComponent.prototype.clientErrorMsg = function (ex, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString(), funName, this.constructor.name);
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], SetupItemsHomeComponent.prototype, "dataTableComponent", void 0);
    SetupItemsHomeComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-setup-items-home.component.html',
            providers: [atpar_setup_items_service_1.SetupItemsServices],
        }),
        __metadata("design:paramtypes", [atpar_setup_items_service_1.SetupItemsServices,
            router_1.Router,
            router_1.ActivatedRoute,
            AtParConstants_1.AtParConstants,
            AtParSharedDataService_1.AtParSharedDataService,
            event_spinner_service_1.SpinnerService])
    ], SetupItemsHomeComponent);
    return SetupItemsHomeComponent;
}());
exports.SetupItemsHomeComponent = SetupItemsHomeComponent;
//# sourceMappingURL=atpar-setup-items-home.component.js.map