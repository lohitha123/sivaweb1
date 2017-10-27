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
var router_1 = require("@angular/router");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var atpar_setup_inventory_services_1 = require("../../app/Init/atpar-setup-inventory.services");
var AtParEnums_1 = require("../Shared/AtParEnums");
var PAR_MNGT_INVENTORY_ITEM_DETAILS_1 = require("../../app/Entities/PAR_MNGT_INVENTORY_ITEM_DETAILS");
var PAR_MNGT_ITEM_1 = require("../../app/Entities/PAR_MNGT_ITEM");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var platform_browser_1 = require("@angular/platform-browser");
var routepath_1 = require("../AtPar/Menus/routepath");
var SetupInventoryAddModify = (function () {
    function SetupInventoryAddModify(setupInventoryServices, router, route, spinnerService, atParConstant, document, atParSharedDataService) {
        this.setupInventoryServices = setupInventoryServices;
        this.router = router;
        this.route = route;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.document = document;
        this.atParSharedDataService = atParSharedDataService;
        this.newItem = new PAR_MNGT_INVENTORY_ITEM_DETAILS_1.PAR_MNGT_INVENTORY_ITEM_DETAILS();
        this.oldItem = new PAR_MNGT_INVENTORY_ITEM_DETAILS_1.PAR_MNGT_INVENTORY_ITEM_DETAILS();
        this.item = new PAR_MNGT_ITEM_1.PAR_MNGT_ITEM();
        this.replenishmentList = [];
        this._deviceTokenEntry = [];
        this.msgs = [];
        this.selectedItemId = "";
        this.screenTitle = "";
        this.isEditMode = false;
        this.goClick = false;
        this.submitButtonTitle = "";
        this.statusMesssage = "";
        this.loading = true;
        this.blnItemIdNotSelected = false;
        this.itemDesc = "";
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    SetupInventoryAddModify.prototype.ngOnInit = function () {
        this.spinnerService.start();
        try {
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.mode = this.atParSharedDataService.storage.mode;
            this.orgGroupId = this.atParSharedDataService.storage.orgGroupId;
            this.orgId = this.atParSharedDataService.storage.orgId;
            this.replenishmentList = [];
            this.replenishmentList.push({ label: 'Select One', value: '' });
            this.replenishmentList.push({ label: 'Stock', value: 'Stock' });
            this.replenishmentList.push({ label: 'Nonstock', value: 'Nonstock' });
            this.replenishmentList.push({ label: 'Stockless', value: 'Stockless' });
            this.replenishmentList.push({ label: 'Consignment', value: 'Consignment' });
            if (this.mode == (AtParEnums_1.ModeEnum.Add).toString()) {
                this.screenTitle = "Setup Inventory";
                this.isEditMode = false;
                this.submitButtonTitle = "Save";
                this.newItem.ORG_ID = this.orgId;
            }
            else if (this.mode == (AtParEnums_1.ModeEnum.Edit).toString()) {
                this.screenTitle = "Setup Inventory";
                this.submitButtonTitle = "Update";
                this.isEditMode = true;
                this.newItem = this.atParSharedDataService.storage.inventoryItem;
                this.newItem.STATUS_VALUE = !this.newItem.STATUS_VALUE;
                var uom = this.newItem.UOM;
                var defaultStroageLoc = this.newItem.STOR_LOC;
                var altStorageLoc1 = this.newItem.ALT_STOR_LOC1;
                var altStorageLoc2 = this.newItem.ALT_STOR_LOC2;
                var replenishmentType = this.newItem.REPLENISHMENT_TYPE;
                this.replenishmentType = replenishmentType;
                this.oldItem.UOM = uom;
                this.oldItem.STOR_LOC = defaultStroageLoc;
                this.oldItem.ALT_STOR_LOC1 = altStorageLoc1;
                this.oldItem.ALT_STOR_LOC2 = altStorageLoc2;
                this.newItem.ORG_ID = this.orgId;
                this.loading = false;
            }
            this.spinnerService.stop();
        }
        catch (ex) {
            this.spinnerService.stop();
            this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: ex.toString() });
        }
    };
    SetupInventoryAddModify.prototype.clientErrorMsg = function (strExMsg) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString());
    };
    SetupInventoryAddModify.prototype.navigateToSetupInventoryHome = function () {
        var navigationExtras = {
            relativeTo: this.route
        };
        this.router.navigate(['../'], navigationExtras);
    };
    SetupInventoryAddModify.prototype.goBack = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.atParSharedDataService.storage = { 'mode': AtParEnums_1.ModeEnum.List, 'orgGroupId': this.orgGroupId, 'orgId': this.orgId };
        this.navigateToSetupInventoryHome();
    };
    SetupInventoryAddModify.prototype.filterItems = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query_1, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        query_1 = event.query;
                        this.filteredItems = [];
                        if (!(this.orgGroupId != undefined && this.orgId != undefined && event.query != undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.setupInventoryServices.getItemDetailsForAutoComplete(this.orgId, this.orgGroupId, event.query)
                                .forEach(function (resp) {
                                _this.msgs = [];
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.inventoryData = resp.DataList;
                                        _this.filteredItems = _this.filterByItem(query_1, resp.DataList);
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.msgs = [];
                                        _this.filteredItems = _this.filterByItem(query_1, []);
                                        //  this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        break;
                                }
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.spinnerService.stop();
                        this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: ex_1.toString() });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupInventoryAddModify.prototype.filterByItem = function (query, itemsList) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < itemsList.length; i++) {
                var item = itemsList[i];
                filtered.push(item.ITEM_ID + '-' + item.SHORT_DESCR);
            }
        }
        else {
            for (var i = 0; i < itemsList.length; i++) {
                var item = itemsList[i];
                if (item.ITEM_ID.toLowerCase().indexOf(query.toLowerCase()) == 0 || item.SHORT_DESCR.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                    filtered.push(item.ITEM_ID + '-' + item.SHORT_DESCR);
                }
            }
        }
        return filtered;
    };
    SetupInventoryAddModify.prototype.setRepleshmentType = function (repleshmentType) {
        if (repleshmentType == AtParEnums_1.Repleshment_Type.Stock) {
            this.newItem.REPLENISHMENT_TYPE = "Stock";
        }
        else if (repleshmentType == AtParEnums_1.Repleshment_Type.Nonstock) {
            this.newItem.REPLENISHMENT_TYPE = "Nonstock";
        }
        else if (repleshmentType == AtParEnums_1.Repleshment_Type.Stockless) {
            this.newItem.REPLENISHMENT_TYPE = "Stockless";
        }
        else if (repleshmentType == AtParEnums_1.Repleshment_Type.Consignment) {
            this.newItem.REPLENISHMENT_TYPE = "Consignment";
        }
    };
    SetupInventoryAddModify.prototype.getItemDetails = function (repleshmentType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.spinnerService.start();
                        this.newItem = new PAR_MNGT_INVENTORY_ITEM_DETAILS_1.PAR_MNGT_INVENTORY_ITEM_DETAILS();
                        this.goClick = true;
                        this.blnItemIdNotSelected = false;
                        if (this.selectedItemId == "") {
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Item ID" });
                            this.blnItemIdNotSelected = true;
                            this.isEditMode = false;
                            this.goClick = false;
                            this.spinnerService.stop();
                        }
                        if (!(this.blnItemIdNotSelected == false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.setupInventoryServices.getItemDetails(this.orgId, this.orgGroupId, this.selectedItemId.split('-')[0])
                                .forEach(function (resp) {
                                _this.msgs = [];
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.item = resp.DataList[0];
                                        _this.newItem.INV_ITEM_ID = _this.item.ITEM_ID;
                                        _this.newItem.UOM = _this.item.UNIT_OF_PROCUREMENT;
                                        _this.newItem.SHORT_DESCR = _this.item.SHORT_DESCR;
                                        _this.newItem.STATUS_VALUE = true;
                                        _this.setRepleshmentType(_this.item.REPLENISHMENT_TYPE);
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.msgs = [];
                                        _this.goClick = false;
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.msgs = [];
                                        _this.goClick = false;
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                }
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.spinnerService.stop();
                        this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: ex_2.toString() });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupInventoryAddModify.prototype.validateFormData = function () {
        this.msgs = [];
        try {
            if (this.newItem.STOR_LOC.trim().length != 0
                && this.newItem.ALT_STOR_LOC1 != undefined && this.newItem.ALT_STOR_LOC1.trim().length != 0
                && this.newItem.STOR_LOC == this.newItem.ALT_STOR_LOC1) {
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Default Storage Location and Alternate Storage Location1 cannot be same." });
                this.spinnerService.stop();
                return;
            }
            else if (this.newItem.STOR_LOC.trim().length != 0
                && this.newItem.ALT_STOR_LOC2 != undefined
                && this.newItem.ALT_STOR_LOC2.trim().length != 0
                && this.newItem.STOR_LOC == this.newItem.ALT_STOR_LOC2) {
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Default Storage Location and Alternate Storage Location2 cannot be same." });
                this.spinnerService.stop();
                return;
            }
            else if (this.newItem.ALT_STOR_LOC1 != undefined
                && this.newItem.ALT_STOR_LOC2 != undefined
                && this.newItem.ALT_STOR_LOC1.trim().length != 0
                && this.newItem.ALT_STOR_LOC2.trim().length != 0
                && this.newItem.ALT_STOR_LOC1 == this.newItem.ALT_STOR_LOC2) {
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Alternate Storage Location1 and Alternate Storage Location2  cannot be same." });
                this.spinnerService.stop();
                return;
            }
            else {
                return true;
            }
        }
        catch (ex) {
            this.spinnerService.stop();
            this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: ex.toString() });
        }
    };
    SetupInventoryAddModify.prototype.submitInventoryData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        //console.log("New Item: " + JSON.stringify(this.newItem));
                        // console.log("Old Item: " + JSON.stringify(this.oldItem));
                        this.newItem.ORG_ID = this.orgId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        if (!(this.mode == (AtParEnums_1.ModeEnum.Add).toString())) return [3 /*break*/, 4];
                        //create
                        if (this.selectedItemId === "" || this.selectedItemId == undefined) {
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Item ID" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        if (this.newItem.QUANTITY_ON_HAND == undefined) {
                            this.newItem.QUANTITY_ON_HAND = 0;
                        }
                        if (this.newItem.STOR_LOC == undefined || this.newItem.STOR_LOC == null) {
                            this.newItem.STOR_LOC = "";
                        }
                        if (this.newItem.ALT_STOR_LOC1 == undefined || this.newItem.ALT_STOR_LOC1 == null) {
                            this.newItem.ALT_STOR_LOC1 = "";
                        }
                        if (this.newItem.ALT_STOR_LOC2 == undefined || this.newItem.ALT_STOR_LOC2 == null) {
                            this.newItem.ALT_STOR_LOC2 = "";
                        }
                        if (this.newItem.CHARGE_CODE == undefined || this.newItem.CHARGE_CODE == null) {
                            this.newItem.CHARGE_CODE = "";
                        }
                        if (this.newItem.STATUS_VALUE == false) {
                            this.newItem.STATUS = 1;
                        }
                        else {
                            this.newItem.STATUS = 0;
                        }
                        if (!this.validateFormData()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.setupInventoryServices.insertInventoryItems(this.newItem, this.newItem.ALT_STOR_LOC1, this.newItem.ALT_STOR_LOC2, this.orgGroupId).forEach(function (resp) {
                                _this.msgs = [];
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.statusMesssage = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Inventory").replace("2%", _this.newItem.INV_ITEM_ID);
                                        _this.atParSharedDataService.storage = { "orgGroupId": _this.orgGroupId, "orgId": _this.newItem.ORG_ID, "mode": (AtParEnums_1.ModeEnum.List).toString(), severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage };
                                        //this.navigateToSetupInventoryHome();
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Item " + _this.newItem.INV_ITEM_ID + " Created Successfully" });
                                        _this.isEditMode = false;
                                        _this.goClick = false;
                                        _this.selectedItemId = "";
                                        document.getElementById("itemid").focus();
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.statusMesssage = resp.StatusMessage;
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.statusMesssage = resp.StatusMessage;
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                }
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        if (!(this.mode == (AtParEnums_1.ModeEnum.Edit).toString())) return [3 /*break*/, 6];
                        //update          
                        if (this.newItem.REPLENISHMENT_TYPE.trim().length == 0) {
                            this.newItem.REPLENISHMENT_TYPE = this.replenishmentType;
                        }
                        if (this.newItem.ALT_STOR_LOC1 == undefined || this.newItem.ALT_STOR_LOC1 == null) {
                            this.newItem.ALT_STOR_LOC1 = "";
                        }
                        if (this.newItem.ALT_STOR_LOC2 == undefined || this.newItem.ALT_STOR_LOC2 == null) {
                            this.newItem.ALT_STOR_LOC2 = "";
                        }
                        if (this.oldItem.ALT_STOR_LOC1 == undefined || this.oldItem.ALT_STOR_LOC1 == null) {
                            this.oldItem.ALT_STOR_LOC1 = "";
                        }
                        if (this.oldItem.ALT_STOR_LOC2 == undefined || this.oldItem.ALT_STOR_LOC2 == null) {
                            this.oldItem.ALT_STOR_LOC2 = "";
                        }
                        if (this.newItem.CHARGE_CODE == undefined || this.newItem.CHARGE_CODE == null) {
                            this.newItem.CHARGE_CODE = "";
                        }
                        if (this.newItem.STATUS_VALUE == false) {
                            this.newItem.STATUS = 1;
                        }
                        else {
                            this.newItem.STATUS = 0;
                        }
                        if (!this.validateFormData()) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.setupInventoryServices.updateInventoryItems(this.newItem, this.oldItem.UOM, this.oldItem.STOR_LOC, this.newItem.ALT_STOR_LOC1, this.oldItem.ALT_STOR_LOC1, this.newItem.ALT_STOR_LOC2, this.oldItem.ALT_STOR_LOC2, this.orgGroupId).forEach(function (resp) {
                                _this.msgs = [];
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.statusMesssage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Inventory").replace("2%", _this.newItem.INV_ITEM_ID);
                                        _this.statusMesssage = "Item " + _this.newItem.INV_ITEM_ID + " updated successfully";
                                        //this.atParSharedDataService.storage = {
                                        //    "orgGroupId": this.orgGroupId, "orgId": this.newItem.ORG_ID, "mode": (ModeEnum.List).toString(), severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage
                                        //};
                                        //this.navigateToSetupInventoryHome();
                                        //this.oldItem = new PAR_MNGT_INVENTORY_ITEM_DETAILS();
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                                        document.getElementById('uom').focus();
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.statusMesssage = resp.StatusMessage;
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.statusMesssage = resp.StatusMessage;
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                }
                                _this.atParConstant.scrollToTop();
                            })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        ex_3 = _a.sent();
                        this.spinnerService.stop();
                        this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: ex_3.toString() });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    SetupInventoryAddModify.prototype.bindModelDataChange = function (event) {
        try {
            if (this.newItem.UOM !== "" && this.uomStatus != 1) {
                this.uomStatus = 0;
            }
            else {
                this.uomStatus = 1;
            }
            if (this.newItem.INV_ITEM_ID === "") {
                this.itemIdStatus = 1;
            }
            else {
                this.itemIdStatus = 0;
            }
            if ("uom" == event.TextBoxID.toString()) {
                this.uomStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("defalultloc" == event.TextBoxID.toString()) {
                this.defaultLocationStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("altLoc1" == event.TextBoxID.toString()) {
                this.altLoc1Status = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("altLoc2" == event.TextBoxID.toString()) {
                this.altLoc2Status = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("qoh" == event.TextBoxID.toString()) {
                this.qohStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("chargecode" == event.TextBoxID.toString()) {
                this.changeCodeStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.submitButtonTitle == "Update") {
                this.itemIdStatus = 0;
                if (this.uomStatus >= 1) {
                    this.uomStatus = 1;
                }
                else {
                    this.uomStatus = 0;
                }
                if (this.defaultLocationStatus >= 1) {
                    this.defaultLocationStatus = 1;
                }
                else {
                    this.defaultLocationStatus = 0;
                }
            }
            else if (this.submitButtonTitle == "Save") {
                if (this.uomStatus >= 1) {
                    this.uomStatus = 1;
                }
                else {
                    this.uomStatus = 0;
                }
            }
            if (this.itemIdStatus == 0 && this.uomStatus == 0 && this.defaultLocationStatus == 0) {
                if ((this.altLoc1Status == undefined || this.altLoc1Status == 0) &&
                    (this.altLoc2Status == undefined || this.altLoc2Status == 0) &&
                    (this.qohStatus == undefined || this.qohStatus == 0) &&
                    (this.changeCodeStatus == undefined || this.changeCodeStatus == 0)) {
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
        catch (ex) {
            this.spinnerService.stop();
            this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: ex.toString() });
        }
    };
    SetupInventoryAddModify.prototype.ngOnDestroy = function () {
        this.newItem = null;
        this.oldItem = null;
        this.item = null;
        this.inventoryData = null;
        this.replenishmentList = null;
        this._deviceTokenEntry = null;
        this.mode = null;
        this.msgs = null;
        this.filteredItems = null;
        this.selectedItemId = null;
        this.pazeSize = null;
        this.screenTitle = null;
        this.isEditMode = null;
        this.orgGroupId = null;
        this.orgId = null;
        this.goClick = null;
        this.submitButtonTitle = null;
        this.statusMesssage = null;
        this.spinnerService = null;
        this.loading = null;
        this.uomStatus = null;
        this.defaultLocationStatus = null;
        this.altLoc1Status = null;
        this.altLoc2Status = null;
        this.qohStatus = null;
        this.changeCodeStatus = null;
        this.itemIdStatus = null;
        this.replenishmentType = null;
    };
    SetupInventoryAddModify = __decorate([
        core_1.Component({
            templateUrl: 'atpar-setup-inventory-add-modify.component.html',
            providers: [atpar_setup_inventory_services_1.SetupInventoryServices, AtParConstants_1.AtParConstants]
        }),
        __param(5, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [atpar_setup_inventory_services_1.SetupInventoryServices,
            router_1.Router,
            router_1.ActivatedRoute,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants, Object, AtParSharedDataService_1.AtParSharedDataService])
    ], SetupInventoryAddModify);
    return SetupInventoryAddModify;
}());
exports.SetupInventoryAddModify = SetupInventoryAddModify;
//# sourceMappingURL=atpar-setup-add-modify-inventory.component.js.map