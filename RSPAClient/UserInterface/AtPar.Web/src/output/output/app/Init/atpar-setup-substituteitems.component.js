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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var atpar_setup_items_service_1 = require("../../app/Init/atpar-setup-items-service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var AtParEnums_2 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParEnums_3 = require("./../Shared/AtParEnums");
var PAR_MNGT_ITEM_1 = require("../../app/Entities/PAR_MNGT_ITEM");
var PAR_MNGT_ITEM_SUBSTITUTE_1 = require("../../app/Entities/PAR_MNGT_ITEM_SUBSTITUTE");
var AtParConstants_1 = require("../Shared/AtParConstants");
var routepath_1 = require("../AtPar/Menus/routepath");
var SetupItemsSubstituteItemsComponent = (function () {
    function SetupItemsSubstituteItemsComponent(setupItemServices, router, route, atParConstant, atParSharedDataService, spinnerService) {
        this.setupItemServices = setupItemServices;
        this.router = router;
        this.route = route;
        this.atParConstant = atParConstant;
        this.atParSharedDataService = atParSharedDataService;
        this.spinnerService = spinnerService;
        this.msgs = [];
        this.lstVendordata = [];
        this.lstSetupItemsData = [];
        this.lstSubItemData = [];
        this.lstSubstituteItemsData = [];
        this.lstParLocDetails = [];
        this._deviceTokenEntry = [];
        this.newItem = new PAR_MNGT_ITEM_1.PAR_MNGT_ITEM();
        this.subItem = new PAR_MNGT_ITEM_SUBSTITUTE_1.PAR_MNGT_ITEM_SUBSTITUTE();
        this.blnPharmItemAllocated = false;
        this.showHide = false;
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    SetupItemsSubstituteItemsComponent.prototype.ngOnInit = function () {
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPage = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.newItem = this.atParSharedDataService.storage;
        this.BindGrid();
    };
    SetupItemsSubstituteItemsComponent.prototype.BindGrid = function () {
        var _this = this;
        this.OrgGrpId = this.newItem.ORG_GROUP_ID;
        this.ItemId = this.newItem.ITEM_ID + "-" + this.newItem.SHORT_DESCR;
        this.statusList = [];
        this.statusList.push({ label: 'All', value: null });
        this.statusList.push({ label: 'Active', value: true });
        this.statusList.push({ label: 'InActive', value: false });
        try {
            this.spinnerService.start();
            this.setupItemServices.GetPharmacyItemLocations(this.newItem.ITEM_ID)
                .forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_3.StatusType.Success:
                        {
                            _this.lstParLocDetails = resp.DataList;
                            if (_this.lstParLocDetails.length > 0) {
                                _this.blnPharmItemAllocated = true;
                            }
                            _this.spinnerService.stop();
                            break;
                        }
                    case AtParEnums_3.StatusType.Error:
                        {
                            _this.spinnerService.stop();
                            break;
                        }
                    case AtParEnums_3.StatusType.Warn:
                        {
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
            this.clientErrorMsg(ex, "BindGrid");
        }
        try {
            this.spinnerService.start();
            this.setupItemServices.GetSubstituteItemDetails(this.newItem.ITEM_ID, this.newItem.ORG_GROUP_ID)
                .forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_3.StatusType.Success:
                        {
                            _this.showHide = true;
                            _this.lstSubstituteItemsData = resp.DataList;
                            for (var i = 0; i <= _this.lstSubstituteItemsData.length - 1; i++) {
                                if (_this.lstSubstituteItemsData[i].STATUS == true) {
                                    _this.lstSubstituteItemsData[i].STATUS_ACTION = true;
                                }
                                else {
                                    _this.lstSubstituteItemsData[i].STATUS_ACTION = false;
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
                            if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                _this.msgs = [];
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
            this.clientErrorMsg(ex, "BindGrid");
        }
    };
    SetupItemsSubstituteItemsComponent.prototype.lookup = function () {
        var _this = this;
        if (this.subItem.ITEM_ID == undefined) {
            this.subItem.ITEM_ID = "";
        }
        try {
            this.spinnerService.start();
            this.setupItemServices.getItemDetails(this.subItem.ITEM_ID, "", "", "", "", "", "", "", "", "", "", "", "", false, this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], true)
                .forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_3.StatusType.Success:
                        {
                            if (resp.DataList.length == 1) {
                                _this.lookupitem = false;
                                _this.subItem.ITEM_ID = resp.DataList[0].ITEM_ID;
                                _this.subItem.ITEM_DESCR = resp.DataList[0].SHORT_DESCR;
                            }
                            else {
                                _this.lookupitem = true;
                                _this.lstSubItemData = resp.DataList;
                            }
                            _this.msgs = [];
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
                            _this.spinnerService.stop();
                            break;
                        }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "lookup");
        }
    };
    SetupItemsSubstituteItemsComponent.prototype.updateSubItems = function (subItemData, event) {
        var _this = this;
        try {
            if (event == true) {
                this.statusForSubItemUpdate = 1;
            }
            else {
                this.statusForSubItemUpdate = 0;
            }
            this.setupItemServices.UpdateSubstituteItem(this.newItem.ORG_GROUP_ID, this.newItem.ITEM_ID, subItemData.SUBSTITUTE_ITEM_ID, this.statusForSubItemUpdate, true).forEach(function (resp) {
                _this.msgs = [];
                _this.spinnerService.start();
                switch (resp.StatType) {
                    case AtParEnums_3.StatusType.Success:
                        {
                            _this.statusMesssage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Item").replace("2%", subItemData.SUBSTITUTE_ITEM_ID);
                            _this.msgs = [];
                            _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                            _this.BindGrid();
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
            this.clientErrorMsg(ex, "updateSubItems");
        }
    };
    SetupItemsSubstituteItemsComponent.prototype.insertSubItems = function () {
        var _this = this;
        try {
            if (this.subItem.ITEM_ID == undefined || this.subItem.ITEM_ID == null || this.subItem.ITEM_ID == "") {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter the valid substitute item" });
                return;
            }
            if (this.subItem.ITEM_DESCR == undefined || this.subItem.ITEM_DESCR == null || this.subItem.ITEM_DESCR == "") {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter the valid substitute item" });
                return;
            }
            this.setupItemServices.InsertSubstituteItem(this.newItem.ORG_GROUP_ID, this.newItem.ITEM_ID, this.subItem.ITEM_ID, this.subItem.PRIORITY, this.subItem.ITEM_DESCR, 1, this.blnPharmItemAllocated, this.lstParLocDetails).forEach(function (resp) {
                _this.msgs = [];
                _this.spinnerService.start();
                switch (resp.StatType) {
                    case AtParEnums_3.StatusType.Success:
                        {
                            _this.statusMesssage = "Item ID  " + _this.subItem.ITEM_ID + "  Inserted Successfully";
                            _this.msgs = [];
                            _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                            _this.subItem.ITEM_ID = "";
                            _this.subItem.ITEM_DESCR = "";
                            _this.subItem.ITEM_ID = "";
                            _this.subItem.PRIORITY = null;
                            _this.BindGrid();
                            _this.lookupitem = false;
                            _this.spinnerService.stop();
                            break;
                        }
                    case AtParEnums_3.StatusType.Error:
                        {
                            _this.msgs = [];
                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            _this.subItem.ITEM_ID = "";
                            _this.subItem.ITEM_DESCR = "";
                            _this.subItem.PRIORITY = null;
                            _this.spinnerService.stop();
                            break;
                        }
                    case AtParEnums_3.StatusType.Warn:
                        {
                            _this.msgs = [];
                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            _this.subItem.ITEM_ID = "";
                            _this.subItem.ITEM_DESCR = "";
                            _this.subItem.PRIORITY = null;
                            _this.spinnerService.stop();
                            break;
                        }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "insertSubItems");
        }
    };
    SetupItemsSubstituteItemsComponent.prototype.selectedRow = function (selectedRowData) {
        this.msgs = [];
        this.subItem.ITEM_ID = selectedRowData.ITEM_ID;
        this.subItem.ITEM_DESCR = selectedRowData.SHORT_DESCR;
        this.subItem.PRIORITY = null;
    };
    SetupItemsSubstituteItemsComponent.prototype.goBack = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        var navigationExtras = {
            queryParams: { "mode": (AtParEnums_2.ModeEnum.List).toString() },
            preserveQueryParams: false,
            relativeTo: this.route
        };
        this.router.navigate(['../'], navigationExtras);
    };
    SetupItemsSubstituteItemsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    SetupItemsSubstituteItemsComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-setup-substituteitems.component.html',
            providers: [atpar_setup_items_service_1.SetupItemsServices],
        }),
        __metadata("design:paramtypes", [atpar_setup_items_service_1.SetupItemsServices,
            router_1.Router,
            router_1.ActivatedRoute,
            AtParConstants_1.AtParConstants,
            AtParSharedDataService_1.AtParSharedDataService,
            event_spinner_service_1.SpinnerService])
    ], SetupItemsSubstituteItemsComponent);
    return SetupItemsSubstituteItemsComponent;
}());
exports.SetupItemsSubstituteItemsComponent = SetupItemsSubstituteItemsComponent;
//# sourceMappingURL=atpar-setup-substituteitems.component.js.map