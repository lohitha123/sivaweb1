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
/// <reference path="../shared/atparstatuscodes.ts" />
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var vm_consignment_item_table_1 = require("../entities/vm_consignment_item_table");
var vm_inventory_items_table_1 = require("../entities/vm_inventory_items_table");
var pou_maintain_non_cart_items_service_1 = require("../../app/PointOfUse/pou-maintain-non-cart-items.service");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var platform_browser_1 = require("@angular/platform-browser");
var MaintainNonCartItemsComponent = (function () {
    function MaintainNonCartItemsComponent(spinnerService, atParCommonService, maintainNonCartItemService, httpService, document, http, atParConstant) {
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.maintainNonCartItemService = maintainNonCartItemService;
        this.httpService = httpService;
        this.document = document;
        this.http = http;
        this.atParConstant = atParConstant;
        this.growlMessage = [];
        this.lstDepartmentCarts = [];
        this.showFirstPage = true;
        this.showSecondPage = false;
        this.form = false;
        this.editform = false;
        this.lstConsignmentItems = [];
        this.lstAddConsignmentItems = [];
        this.conItem = new vm_consignment_item_table_1.VM_CONSIGNMENT_ITEM_TABLE();
        this.isEditMode = false;
        this.inventoryItem = new vm_inventory_items_table_1.VM_INVENTORY_ITEMS_TABLE; //MT_POU_CART_INVENTORY;
        this.blnGetDetails = false;
        this.isDuplicate = false;
        this.selectRows = [];
        this.strItemDesc = '';
        this.strLotControlled = '';
        this.strSerialized = '';
        this.strBusinessUnit = '';
        this.strCartId = '';
        this.strOptimumQty = "";
        this.strCompartment = '';
        this.strMode = '';
        this.showGrid = false;
        this.enableLotControl = false;
        this.enableSerial = false;
        this.enableQuantity = false;
        this.showtxtItemID = false;
        this.showLabelItemID = false;
        this.lstCartInventoryItems = [];
        this.lstInventoryCarts = [];
        this.lstCartInvItemList = [];
        this.statusType = '';
        this.breadCrumbMenu = new routepath_1.Menus();
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        if (this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] == 'All') {
            this.orgGroupID = 'All';
        }
        else {
            this.orgGroupID = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
        }
    }
    MaintainNonCartItemsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pazeSize = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.showGrid = false;
                        return [4 /*yield*/, this.bindDataGrid()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MaintainNonCartItemsComponent.prototype.bindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        if (this.dataTableComponent != undefined) {
                            this.dataTableComponent.reset();
                        }
                        return [4 /*yield*/, this.maintainNonCartItemService.getUserDepartments(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.orgGroupID)
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        if (res.DataList.length > 0) {
                                            _this.getUserDepartmentCarts();
                                        }
                                        else {
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Department(s) allocated to the user' });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        if (res.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                            _this.showGrid = true;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Department(s) allocated to the user' });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MaintainNonCartItemsComponent.prototype.getUserDepartmentCarts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstDepartmentCarts = [];
                        return [4 /*yield*/, this.maintainNonCartItemService.getUserdepartmentsCarts(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.orgGroupID)
                                .catch(this.httpService.handleError).then(function (result) {
                                _this.spinnerService.stop();
                                _this.growlMessage = [];
                                var res = result.json();
                                _this.showGrid = true;
                                if (res.StatType == AtParEnums_2.StatusType.Success) {
                                    _this.lstDepartmentCarts = res.DataList;
                                }
                                else if (res.StatType == AtParEnums_2.StatusType.Warn) {
                                    if (res.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Cart(s) allocated to the user' });
                                    }
                                    else {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                    }
                                }
                                else {
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MaintainNonCartItemsComponent.prototype.btnAdd_Click = function (objCart) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstConsignmentItems = [];
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Add / Edit Non Cart Items';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        if (objCart != '') {
                            sessionStorage.setItem('MainCart', JSON.stringify(objCart));
                            this.itemID = '';
                            this.itemDescription = '';
                        }
                        else {
                            objCart = JSON.parse(sessionStorage.getItem('MainCart'));
                        }
                        sessionStorage.setItem('PreviousPage', 'FirtPage');
                        this.showSecondPage = true;
                        this.showFirstPage = false;
                        if (this.itemID == undefined) {
                            this.itemID = '';
                        }
                        if (this.itemDescription == undefined) {
                            this.itemDescription = '';
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.getConsignmentItems(objCart.BUSINESS_UNIT, objCart.CART_ID, this.itemID, this.itemDescription, true)];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    MaintainNonCartItemsComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.dataTableComponent != undefined) {
                            this.dataTableComponent.reset();
                        }
                        return [4 /*yield*/, this.btnAdd_Click('')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MaintainNonCartItemsComponent.prototype.getConsignmentItems = function (businessUnit, cartID, itemID, itemDesc, showWarn) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstConsignmentItems = [];
                        return [4 /*yield*/, this.maintainNonCartItemService.getConsignmentItems(businessUnit, cartID, itemID, itemDesc)
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        if (res.DataList.length > 0) {
                                            _this.lstConsignmentItems = res.DataList;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        if (res.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                            if (showWarn) {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No items added to this cart. Click Add Item to Add' });
                                            }
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MaintainNonCartItemsComponent.prototype.btnAddItem_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var objMainCart;
            return __generator(this, function (_a) {
                this.breadCrumbMenu.SUB_MENU_NAME = 'Add Non Cart Item';
                this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                this.growlMessage = [];
                this.disableFormBtn = true;
                sessionStorage.setItem('PreviousPage', 'SecondPage');
                objMainCart = JSON.parse(sessionStorage.getItem('MainCart'));
                this.conItem = objMainCart;
                this.isEditMode = false;
                this.showFirstPage = false;
                this.showSecondPage = false;
                this.form = true;
                this.conItem.STATUSVALUE = 'Active';
                this.showLabelItemID = false;
                return [2 /*return*/];
            });
        });
    };
    MaintainNonCartItemsComponent.prototype.btnEditItem_Click = function (objItem) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Update Non Cart Item';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        sessionStorage.setItem('PreviousPage', 'SecondPage');
                        this.growlMessage = [];
                        this.disableFormBtn = false;
                        this.isEditMode = true;
                        this.showFirstPage = false;
                        this.showSecondPage = false;
                        this.form = true;
                        this.showLabelItemID = true;
                        this.conItem = objItem;
                        this.itemIdStatus = 0;
                        this.itemDescStatus = 0;
                        this.uomStatus = 0;
                        if (objItem.STATUS == 'Y') {
                            this.conItem.STATUSVALUE = 'Active';
                        }
                        else if (objItem.STATUS == 'N') {
                            this.conItem.STATUSVALUE = 'InActive';
                        }
                        else {
                            this.conItem.STATUSVALUE = 'Pending';
                        }
                        if (objItem.PATIENT_CHARGEABLE == 'Y') {
                            this.conItem.ISPATIENTCHARGEABLE = true;
                            this.itemPriceStatus = 0;
                            this.chargeCodeStatus = 0;
                        }
                        else {
                            this.conItem.ISPATIENTCHARGEABLE = false;
                        }
                        if (objItem.LOT_CONTROLLED == "Y") {
                            this.conItem.ISLOTCONTROLLED = true;
                        }
                        else {
                            this.conItem.ISLOTCONTROLLED = false;
                        }
                        if (objItem.SERIALIZED == "Y") {
                            this.conItem.ISSERIALIZED = true;
                        }
                        else {
                            this.conItem.ISSERIALIZED = false;
                        }
                        if (objItem.SAMPLE == "Y") {
                            this.conItem.ISSAMPLE = true;
                        }
                        else {
                            this.conItem.ISSAMPLE = false;
                        }
                        setTimeout(function () {
                            var txtItemDescr = document.getElementById("txtItemDescr");
                            txtItemDescr.focus();
                        }, 300);
                        this.blnGetDetails = false;
                        return [4 /*yield*/, this.getItemDetails(this.conItem.BUSINESS_UNIT, this.conItem.CART_ID, this.conItem.ITEM_ID)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MaintainNonCartItemsComponent.prototype.getItemDetails = function (businessUnit, cartID, itemID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.selectRows = this.lstConsignmentItems.filter(function (x) { return x.BUSINESS_UNIT == businessUnit && x.CART_ID == cartID && x.ITEM_ID == itemID; });
                        if (!this.blnGetDetails) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getConsignmentItems(businessUnit, cartID, itemID, "", false)];
                    case 1:
                        _a.sent();
                        this.selectRows = this.lstConsignmentItems.filter(function (x) { return x.BUSINESS_UNIT == businessUnit && x.ITEM_ID == itemID; });
                        _a.label = 2;
                    case 2:
                        if (!this.isEditMode && this.selectRows.length > 0) {
                            this.showLabelItemID = true;
                        }
                        if (this.selectRows.length > 0) {
                            this.conItem = this.selectRows[0];
                            if (this.selectRows[0].LOT_CONTROLLED == 'Y') {
                                this.conItem.ISLOTCONTROLLED = true;
                            }
                            else {
                                this.conItem.ISLOTCONTROLLED = false;
                            }
                            if (this.selectRows[0].SERIALIZED == 'Y') {
                                this.conItem.ISSERIALIZED = true;
                            }
                            else {
                                this.conItem.ISSERIALIZED = false;
                            }
                            if (this.selectRows[0].PATIENT_CHARGEABLE == 'Y') {
                                this.conItem.ISPATIENTCHARGEABLE = true;
                            }
                            else {
                                this.conItem.ISPATIENTCHARGEABLE = false;
                            }
                            if (this.selectRows[0].SAMPLE == 'Y') {
                                this.conItem.ISSAMPLE = true;
                            }
                            else {
                                this.conItem.ISSAMPLE = false;
                            }
                            if (this.selectRows[0].STATUS == 'Y') {
                                this.conItem.STATUSVALUE = 'Active';
                            }
                            else if (this.selectRows[0].STATUS == 'N') {
                                this.conItem.STATUSVALUE = 'InActive';
                            }
                            else {
                                this.conItem.STATUSVALUE = 'Pending';
                            }
                            this.disableFormBtn = false;
                            sessionStorage.setItem("Old_Cmpt", this.selectRows[0].COMPARTMENT);
                            sessionStorage.setItem("Old_Status", this.selectRows[0].STATUS);
                        }
                        else {
                            //this.conItem.ITEM_DESCRIPTION = "";
                            //this.conItem.MANUFACTURE_ITEM_ID = "";
                            //this.conItem.CUST_ITEM_ID = "";
                            //this.conItem.VENDOR_ITEM_ID = "";
                            //this.conItem.UOM = "";
                            //this.conItem.ITEM_PRICE = "";
                            //this.conItem.CHARGE_CODE = "";
                            //this.conItem.COUNT_ORDER = "";
                            //this.conItem.OPTIMUM_QTY = "";
                            //this.conItem.UPC_ID = "";
                            //this.conItem.GTIN = "";
                            //this.conItem.ISLOTCONTROLLED = false;
                            //this.conItem.ISSERIALIZED = false;
                            //this.conItem.COMPARTMENT = "";
                            //this.conItem.MANUFACTURER = "";
                            //this.conItem.VENDOR = "";
                            //this.conItem.ISPATIENTCHARGEABLE = false;
                            //this.conItem.ISSAMPLE = false;
                            document.getElementById("ItemDescr").focus();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MaintainNonCartItemsComponent.prototype.txtItemID_TextChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.conItem.ITEM_ID != undefined && this.conItem.ITEM_ID != '')) return [3 /*break*/, 2];
                        this.blnGetDetails = true;
                        this.clearFields();
                        return [4 /*yield*/, this.getItemDetails(this.conItem.BUSINESS_UNIT, this.conItem.CART_ID, this.conItem.ITEM_ID)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    MaintainNonCartItemsComponent.prototype.clearFields = function () {
        this.conItem.ITEM_DESCRIPTION = "";
        this.conItem.MANUFACTURE_ITEM_ID = "";
        this.conItem.CUST_ITEM_ID = "";
        this.conItem.VENDOR_ITEM_ID = "";
        this.conItem.UOM = "";
        this.conItem.ITEM_PRICE = "";
        this.conItem.CHARGE_CODE = "";
        this.conItem.COUNT_ORDER = "";
        this.conItem.OPTIMUM_QTY = "";
        this.conItem.UPC_ID = "";
        this.conItem.GTIN = "";
        this.conItem.ISLOTCONTROLLED = false;
        this.conItem.ISSERIALIZED = false;
        this.conItem.COMPARTMENT = "";
        this.conItem.MANUFACTURER = "";
        this.conItem.VENDOR = "";
        this.conItem.ISPATIENTCHARGEABLE = false;
        this.conItem.ISSAMPLE = false;
    };
    MaintainNonCartItemsComponent.prototype.btnAdjustQty_Click = function (mode, objInv) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var filterItem, LotCtrl, SerialCtrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Adjust Item Quantity';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.growlMessage = [];
                        this.editform = true;
                        this.form = false;
                        this.showFirstPage = false;
                        this.showSecondPage = false;
                        this.strMode = mode;
                        this.disableInvBtn = true;
                        this.inventoryItem = new vm_inventory_items_table_1.VM_INVENTORY_ITEMS_TABLE();
                        if (mode == 'addInventory') {
                            sessionStorage.setItem('PreviousPage', 'Form');
                            this.inventoryItem.BUSINESS_UNIT = this.conItem.BUSINESS_UNIT;
                            this.inventoryItem.CART_ID = this.conItem.CART_ID;
                            this.inventoryItem.ITEM_ID = this.conItem.ITEM_ID;
                            this.inventoryItem.ITEM_DESCRIPTION = this.conItem.ITEM_DESCRIPTION;
                            this.inventoryItem.COMPARTMENT = this.conItem.COMPARTMENT;
                        }
                        else {
                            sessionStorage.setItem('PreviousPage', 'SecondPage');
                            this.inventoryItem.BUSINESS_UNIT = objInv.BUSINESS_UNIT;
                            this.inventoryItem.CART_ID = objInv.CART_ID;
                            this.inventoryItem.ITEM_ID = objInv.ITEM_ID;
                            this.inventoryItem.ITEM_DESCRIPTION = objInv.ITEM_DESCRIPTION;
                            this.inventoryItem.COMPARTMENT = objInv.COMPARTMENT;
                        }
                        if (!(mode == 'direct?appId=15')) return [3 /*break*/, 1];
                        this.showtxtItemID = true;
                        return [3 /*break*/, 4];
                    case 1:
                        this.showtxtItemID = false;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getProfileParamValue(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], AtParEnums_2.EnumApps.PointOfUse, 'MAX_ALLOW_QTY')
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        sessionStorage.setItem("strMaxAllowQty", res.DataVariable.toString());
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getConsignmentItems(this.inventoryItem.BUSINESS_UNIT, this.inventoryItem.CART_ID, this.inventoryItem.ITEM_ID, '', false)];
                    case 3:
                        _a.sent();
                        if (this.lstConsignmentItems.length > 0) {
                            filterItem = this.lstConsignmentItems.filter(function (x) { return x.ITEM_ID = _this.inventoryItem.ITEM_ID; });
                            if (filterItem.length > 0) {
                                this.strItemDesc = filterItem[0].ITEM_DESCRIPTION;
                                if (filterItem[0].LOT_CONTROLLED != undefined && filterItem[0].LOT_CONTROLLED != '') {
                                    this.strLotControlled = filterItem[0].LOT_CONTROLLED;
                                }
                                if (filterItem[0].SERIALIZED != undefined && filterItem[0].SERIALIZED != '') {
                                    this.strSerialized = filterItem[0].SERIALIZED;
                                }
                            }
                        }
                        LotCtrl = document.getElementById("LotNum");
                        SerialCtrl = document.getElementById("SerialNum");
                        if (this.strLotControlled == "Y" && this.strSerialized == "Y") {
                            this.enableSerial = true;
                            this.enableLotControl = true;
                            this.inventoryItem.QUANTITY = "1";
                            this.enableQuantity = false;
                            LotCtrl.style.backgroundColor = "#FAFAD2";
                            SerialCtrl.style.backgroundColor = "#FAFAD2";
                            setTimeout(function () {
                                document.getElementById("LotNum").focus();
                            }, 100);
                        }
                        else if (this.strLotControlled == "Y") {
                            this.enableLotControl = true;
                            this.enableSerial = false;
                            this.inventoryItem.QUANTITY = "";
                            this.enableQuantity = true;
                            LotCtrl.style.backgroundColor = "#FAFAD2";
                            setTimeout(function () {
                                document.getElementById("LotNum").focus();
                            }, 100);
                        }
                        else if (this.strSerialized == "Y") {
                            this.enableLotControl = false;
                            this.enableSerial = true;
                            this.inventoryItem.QUANTITY = "1";
                            this.enableQuantity = false;
                            SerialCtrl.style.backgroundColor = "#FAFAD2";
                            setTimeout(function () {
                                document.getElementById("SerialNum").focus();
                            }, 100);
                        }
                        else {
                            this.enableQuantity = true;
                            this.enableLotControl = false;
                            this.enableSerial = false;
                            this.inventoryItem.QUANTITY = "";
                            document.getElementById("Quantity").style.backgroundColor = "white";
                            setTimeout(function () {
                                document.getElementById("Quantity").focus();
                            }, 100);
                        }
                        this.spinnerService.stop();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MaintainNonCartItemsComponent.prototype.focusControl = function () {
        if ((this.enableSerial && this.enableLotControl) || this.enableLotControl) {
            document.getElementById("LotNum").focus();
        }
        else if (this.enableSerial) {
            this.inventoryItem.QUANTITY = "1";
            document.getElementById("SerialNum").focus();
        }
        else {
            document.getElementById("Quantity").focus();
        }
    };
    MaintainNonCartItemsComponent.prototype.btnSave_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var old_Compart, old_Status;
            return __generator(this, function (_a) {
                this.growlMessage = [];
                this.lstAddConsignmentItems = [];
                try {
                    if (this.conItem.ITEM_ID.trim() == '') {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter ItemID' });
                        return [2 /*return*/];
                    }
                    if (this.conItem.ITEM_DESCRIPTION.trim() == '') {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Item Description' });
                        return [2 /*return*/];
                    }
                    if (this.conItem.UOM.trim() == '') {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter UOM' });
                        return [2 /*return*/];
                    }
                    if (this.conItem.ISPATIENTCHARGEABLE) {
                        if (this.conItem.ITEM_PRICE == undefined) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Item Price' });
                            return [2 /*return*/];
                        }
                        if (this.conItem.ITEM_PRICE.toString().trim() == '') {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Item Price' });
                            return [2 /*return*/];
                        }
                        if (this.conItem.CHARGE_CODE == undefined) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Charge Code' });
                            return [2 /*return*/];
                        }
                        if (this.conItem.CHARGE_CODE == '') {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Charge Code' });
                            return [2 /*return*/];
                        }
                        this.conItem.PAT_CHARGEABLE = 'Y';
                    }
                    else {
                        this.conItem.PAT_CHARGEABLE = 'N';
                    }
                    if (this.conItem.ISLOTCONTROLLED) {
                        this.conItem.LOT_CONTROLLED = 'Y';
                    }
                    else {
                        this.conItem.LOT_CONTROLLED = 'N';
                    }
                    if (this.conItem.ISSERIALIZED) {
                        this.conItem.SERIALIZED = 'Y';
                    }
                    else {
                        this.conItem.SERIALIZED = 'N';
                    }
                    if (this.conItem.ISSAMPLE) {
                        this.conItem.SAMPLE = 'Y';
                    }
                    else {
                        this.conItem.SAMPLE = 'N';
                    }
                    if (this.conItem.STATUSVALUE == "Active") {
                        this.conItem.STATUS = 'Y';
                    }
                    else if (this.conItem.STATUSVALUE == "InActive") {
                        this.conItem.STATUS = 'N';
                    }
                    else {
                        this.conItem.STATUS = 'P';
                    }
                    if (this.conItem.ISSUE_UOM == undefined) {
                        this.conItem.ISSUE_UOM = '';
                    }
                    if (this.conItem.UOM == undefined) {
                        this.conItem.UOM = '';
                    }
                    if (this.conItem.CONV_RATE_PAR_TO_ISSUE == undefined) {
                        this.conItem.CONV_RATE_PAR_TO_ISSUE = '';
                    }
                    if (this.conItem.ITEM_PRICE == undefined) {
                        this.conItem.ITEM_PRICE = '';
                    }
                    this.conItem.COMPARTMENT = this.conItem.COMPARTMENT.trim();
                    this.conItem.ITEM_DESCRIPTION = (this.conItem.ITEM_DESCRIPTION).trim();
                    this.conItem.ITEM_DESCRIPTION = this.conItem.ITEM_DESCRIPTION.replace(/'/g, "''");
                    this.conItem.ITEM_DESCRIPTION = this.conItem.ITEM_DESCRIPTION.trim();
                    this.conItem.MANUFACTURE_ITEM_ID = this.conItem.MANUFACTURE_ITEM_ID.trim();
                    this.conItem.CUST_ITEM_ID = this.conItem.CUST_ITEM_ID.toString().trim();
                    this.conItem.VENDOR_ITEM_ID = this.conItem.VENDOR_ITEM_ID.toString().trim();
                    this.conItem.COUNT_ORDER = this.conItem.COUNT_ORDER.toString().trim();
                    this.conItem.OPTIMUM_QTY = this.conItem.OPTIMUM_QTY.toString().trim();
                    this.conItem.UOM = this.conItem.UOM.toString().trim();
                    this.conItem.ISSUE_UOM = this.conItem.ISSUE_UOM.toString().trim();
                    this.conItem.CONV_RATE_PAR_TO_ISSUE = this.conItem.CONV_RATE_PAR_TO_ISSUE.toString().trim();
                    this.conItem.ITEM_PRICE = this.conItem.ITEM_PRICE.toString().trim();
                    this.conItem.UPC_ID = this.conItem.UPC_ID.toString().trim();
                    this.conItem.GTIN = this.conItem.GTIN.toString().trim();
                    this.conItem.CHARGE_CODE = this.conItem.CHARGE_CODE.toString().trim();
                    this.conItem.VENDOR = this.conItem.VENDOR.toString().trim();
                    old_Compart = sessionStorage.getItem("Old_Cmpt");
                    if (old_Compart == undefined || old_Compart == null) {
                        old_Compart = '';
                    }
                    this.conItem.OLD_COMPARTMENT = old_Compart;
                    old_Status = sessionStorage.getItem("Old_Status");
                    if (old_Status != '' && old_Status != null) {
                        if (old_Status == 'P' && this.conItem.STATUSVALUE == "Active") {
                            this.conItem.UPDATE_BIN_IN_INVENTORY = true;
                        }
                        else {
                            this.conItem.UPDATE_BIN_IN_INVENTORY = false;
                        }
                    }
                    else {
                        this.conItem.UPDATE_BIN_IN_INVENTORY = false;
                    }
                    this.lstAddConsignmentItems.push(this.conItem);
                    if (!this.isEditMode) {
                        this.checkForDuplicates();
                        if (this.isDuplicate) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: ' Item already exists' });
                            return [2 /*return*/];
                        }
                        else {
                            this.spinnerService.start();
                            this.maintainNonCartItemService.addConsignmentItem(this.lstAddConsignmentItems)
                                .catch(this.httpService.handleError).then(function (result) {
                                _this.spinnerService.stop();
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Added Item successfully' });
                                        _this.btnAdjustQty_Click('addInventory', null);
                                        _this.conItem = new vm_consignment_item_table_1.VM_CONSIGNMENT_ITEM_TABLE();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                                _this.atParConstant.scrollToTop();
                            });
                        }
                    }
                    else {
                        this.spinnerService.start();
                        this.maintainNonCartItemService.updateConsignmentItem(this.lstAddConsignmentItems)
                            .catch(this.httpService.handleError).then(function (result) {
                            _this.spinnerService.stop();
                            var res = result.json();
                            _this.growlMessage = [];
                            document.getElementById("txtItemDescr").focus();
                            switch (res.StatType) {
                                case AtParEnums_2.StatusType.Success: {
                                    _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Update to item successfully' });
                                    _this.showFirstPage = false;
                                    _this.showSecondPage = false;
                                    _this.form = true;
                                    _this.editform = false;
                                    break;
                                }
                                case AtParEnums_2.StatusType.Warn: {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                    break;
                                }
                                case AtParEnums_2.StatusType.Error: {
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                    break;
                                }
                                case AtParEnums_2.StatusType.Custom: {
                                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                    break;
                                }
                            }
                            _this.atParConstant.scrollToTop();
                        });
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    MaintainNonCartItemsComponent.prototype.checkForDuplicates = function () {
        var _this = this;
        var selectRows = [];
        selectRows = this.lstConsignmentItems.filter(function (x) { return x.BUSINESS_UNIT == _this.conItem.BUSINESS_UNIT && x.CART_ID == _this.conItem.CART_ID && x.ITEM_ID == _this.conItem.ITEM_ID; });
        if (selectRows.length > 0) {
            this.isDuplicate = true;
        }
    };
    MaintainNonCartItemsComponent.prototype.btnSaveItemQuantity_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var drItems, todayDate, expDate, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (this.inventoryItem.QUANTITY == '' || this.inventoryItem.QUANTITY == undefined || this.inventoryItem.QUANTITY == "0") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Quantity' });
                            return [2 /*return*/];
                        }
                        if (parseInt(this.inventoryItem.QUANTITY) > parseInt(sessionStorage.getItem("strMaxAllowQty"))) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Quantity must not be greater than max allowable quantity' });
                            document.getElementById("Quantity").focus();
                            this.atParConstant.scrollToTop();
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.getItemsAdjustQty(this.inventoryItem.BUSINESS_UNIT, this.inventoryItem.CART_ID, this.inventoryItem.ITEM_ID, this.inventoryItem.COMPARTMENT, this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId])];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        if (this.statusType != AtParEnums_2.StatusType.Success) {
                            return [2 /*return*/];
                        }
                        drItems = this.lstInventoryCarts.filter(function (x) { return x.BUSINESS_UNIT == _this.inventoryItem.BUSINESS_UNIT && x.CART_ID == _this.inventoryItem.CART_ID; });
                        if (drItems.length > 0) {
                            this.strLotControlled = drItems[0].LOT_C0NTROLLED.trim();
                            this.strSerialized = drItems[0].SERIAL_CONTROLLED.trim();
                            this.strBusinessUnit = drItems[0].BUSINESS_UNIT;
                            this.strCartId = drItems[0].CART_ID;
                            this.itemDescription = drItems[0].ITEM_DESCRIPTION;
                            this.strCompartment = drItems[0].COMPARTMENT;
                        }
                        if (this.strLotControlled == "Y" && (this.inventoryItem.LOTNUMBER == '' || this.inventoryItem.LOTNUMBER == undefined)
                            && this.strSerialized == "Y" && (this.inventoryItem.SERIALNUMBER == '' || this.inventoryItem.SERIALNUMBER == undefined)) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Lot Number/Serial Number' });
                            return [2 /*return*/];
                        }
                        if (this.strLotControlled == "Y" && (this.inventoryItem.LOTNUMBER == '' || this.inventoryItem.LOTNUMBER == undefined)) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Lot Control Number' });
                            return [2 /*return*/];
                        }
                        if (this.strSerialized == "Y" && (this.inventoryItem.SERIALNUMBER == '' || this.inventoryItem.SERIALNUMBER == undefined)) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Serial Number' });
                            return [2 /*return*/];
                        }
                        try {
                            todayDate = new Date();
                            expDate = new Date(this.inventoryItem.EXPIRYDATE);
                            if (todayDate > expDate) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Expiry Date should be greater than today's date" });
                                return [2 /*return*/];
                            }
                        }
                        catch (ex) {
                            this.clientErrorMsg(ex);
                        }
                        this.lstCartInvItemList = [];
                        this.lstCartInvItemList.push(this.inventoryItem);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.maintainNonCartItemService.updateCartInventory(this.lstCartInvItemList)
                                .catch(this.httpService.handleError).then(function (result) {
                                _this.spinnerService.stop();
                                _this.growlMessage = [];
                                var res = result.json();
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Adding Item ' + _this.inventoryItem.ITEM_ID + ' to Cart Inventory Successful' });
                                        sessionStorage.setItem('PreviousPage', 'SecondPage');
                                        _this.clearValues();
                                        _this.focusControl();
                                        _this.disableInvBtn = true;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                                _this.atParConstant.scrollToTop();
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MaintainNonCartItemsComponent.prototype.getItemsAdjustQty = function (bUnit, cartID, itemID, compartment, userID, orgGrpID, systemID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusType = '';
                        return [4 /*yield*/, this.maintainNonCartItemService.getItemsAdjustQty(bUnit, cartID, itemID, compartment, userID, orgGrpID, systemID)
                                .catch(this.httpService.handleError).then(function (result) {
                                _this.spinnerService.stop();
                                var res = result.json();
                                _this.statusType = res.StatType;
                                _this.growlMessage = [];
                                _this.lstInventoryCarts = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstInventoryCarts = res.DataList;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MaintainNonCartItemsComponent.prototype.btnGoBack_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var previousPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstConsignmentItems = [];
                        this.breadCrumbMenu.SUB_MENU_NAME = '';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.growlMessage = [];
                        previousPage = sessionStorage.getItem("PreviousPage");
                        this.showFirstPage = false;
                        this.showSecondPage = false;
                        this.editform = false;
                        this.form = false;
                        this.itemID = '';
                        this.itemDescription = '';
                        if (!(previousPage == 'FirtPage')) return [3 /*break*/, 1];
                        // await this.ngOnInit()
                        this.showFirstPage = true;
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(previousPage == 'SecondPage')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.btnAdd_Click('')];
                    case 2:
                        _a.sent();
                        this.showSecondPage = true;
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(previousPage == 'Form')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.btnAddItem_Click()];
                    case 4:
                        _a.sent();
                        this.form = true;
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MaintainNonCartItemsComponent.prototype.clearValues = function () {
        if (this.strMode == 'direct?appId=15') {
            this.inventoryItem.ITEM_ID = '';
        }
        this.inventoryItem.LOTNUMBER = '';
        this.inventoryItem.SERIALNUMBER = '';
        this.inventoryItem.QUANTITY = '';
        this.inventoryItem.EXPIRYDATE = '';
    };
    MaintainNonCartItemsComponent.prototype.swtPatient_Click = function () {
        if (this.conItem.ISPATIENTCHARGEABLE) {
            if (this.conItem.ITEM_PRICE == undefined || this.conItem.ITEM_PRICE == '' || this.conItem.CHARGE_CODE == undefined || this.conItem.CHARGE_CODE == '') {
                this.disableFormBtn = true;
            }
            else {
                this.disableFormBtn = false;
            }
        }
        else {
            if (this.itemDescStatus == 0 && this.itemDescStatus == 0 && this.uomStatus == 0) {
                if ((this.manufactStatus == 0 || this.manufactStatus == undefined) && (this.manufactItemStatus == 0 || this.manufactItemStatus == undefined) &&
                    (this.vendorStatus == 0 || this.vendorStatus == undefined) && (this.vendorItemStatus == 0 || this.vendorItemStatus == undefined) &&
                    (this.countOrdedrStatus == 0 || this.countOrdedrStatus == undefined) && (this.optimumQtyStatus == 0 || this.optimumQtyStatus == undefined) &&
                    (this.upcidStatus == 0 || this.upcidStatus == undefined) && (this.gtinStatus == 0 || this.gtinStatus == undefined) &&
                    (this.compartmentStatus == 0 || this.compartmentStatus == undefined) && (this.itemPriceStatus == 0 || this.itemPriceStatus == undefined) &&
                    (this.chargeCodeStatus == 0 || this.chargeCodeStatus == undefined)) {
                    this.disableFormBtn = false;
                }
                else {
                    this.disableFormBtn = true;
                }
            }
        }
    };
    MaintainNonCartItemsComponent.prototype.bindModelDataChange = function (event) {
        if ("txtItemID" == event.TextBoxID.toString()) {
            this.itemIdStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtItemDescr" == event.TextBoxID.toString()) {
            this.itemDescStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Manufacturer" == event.TextBoxID.toString()) {
            this.manufactStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("ManufactureItemID" == event.TextBoxID.toString()) {
            this.manufactItemStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Vendor" == event.TextBoxID.toString()) {
            this.vendorStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("CustomItemID" == event.TextBoxID.toString()) {
            this.customItemStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("VendorItemID" == event.TextBoxID.toString()) {
            this.vendorItemStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("CountOrder" == event.TextBoxID.toString()) {
            this.countOrdedrStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("OptimumQuantity" == event.TextBoxID.toString()) {
            this.optimumQtyStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("UOM" == event.TextBoxID.toString()) {
            this.uomStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtIssueUOM" == event.TextBoxID.toString()) {
            this.issueUOM = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("CRate" == event.TextBoxID.toString()) {
            this.convRate = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("UPCID" == event.TextBoxID.toString()) {
            this.upcidStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("GTIN" == event.TextBoxID.toString()) {
            this.gtinStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("ItemPrice" == event.TextBoxID.toString()) {
            this.itemPriceStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("ChargeCode" == event.TextBoxID.toString()) {
            this.chargeCodeStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Compartment" == event.TextBoxID.toString()) {
            this.compartmentStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if (this.conItem.ISPATIENTCHARGEABLE) {
            if (this.itemIdStatus == 0 && this.itemDescStatus == 0 && this.uomStatus == 0 && this.itemPriceStatus == 0 && this.chargeCodeStatus == 0) {
                if ((this.manufactStatus == 0 || this.manufactStatus == undefined) && (this.manufactItemStatus == 0 || this.manufactItemStatus == undefined) &&
                    (this.vendorStatus == 0 || this.vendorStatus == undefined) && (this.vendorItemStatus == 0 || this.vendorItemStatus == undefined) &&
                    (this.countOrdedrStatus == 0 || this.countOrdedrStatus == undefined) && (this.optimumQtyStatus == 0 || this.optimumQtyStatus == undefined) &&
                    (this.upcidStatus == 0 || this.upcidStatus == undefined) && (this.gtinStatus == 0 || this.gtinStatus == undefined) &&
                    (this.issueUOM == 0 || this.issueUOM == undefined) && (this.convRate == 0 || this.convRate == undefined) &&
                    (this.compartmentStatus == 0 || this.compartmentStatus == undefined)) {
                    this.disableFormBtn = false;
                }
                else {
                    this.disableFormBtn = true;
                }
            }
            else {
                this.disableFormBtn = true;
            }
        }
        else {
            if (this.itemIdStatus == 0 && this.itemDescStatus == 0 && this.uomStatus == 0) {
                if ((this.manufactStatus == 0 || this.manufactStatus == undefined) && (this.manufactItemStatus == 0 || this.manufactItemStatus == undefined) &&
                    (this.vendorStatus == 0 || this.vendorStatus == undefined) && (this.vendorItemStatus == 0 || this.vendorItemStatus == undefined) &&
                    (this.countOrdedrStatus == 0 || this.countOrdedrStatus == undefined) && (this.optimumQtyStatus == 0 || this.optimumQtyStatus == undefined) &&
                    (this.upcidStatus == 0 || this.upcidStatus == undefined) && (this.gtinStatus == 0 || this.gtinStatus == undefined) &&
                    (this.compartmentStatus == 0 || this.compartmentStatus == undefined) && (this.itemPriceStatus == 0 || this.itemPriceStatus == undefined) &&
                    (this.issueUOM == 0 || this.issueUOM == undefined) && (this.convRate == 0 || this.convRate == undefined) &&
                    (this.chargeCodeStatus == 0 || this.chargeCodeStatus == undefined)) {
                    this.disableFormBtn = false;
                }
                else {
                    this.disableFormBtn = true;
                }
            }
            else {
                this.disableFormBtn = true;
            }
        }
    };
    MaintainNonCartItemsComponent.prototype.bindModelDataChange1 = function (event) {
        if ("LotNum" == event.TextBoxID.toString()) {
            this.lotNumberStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("SerialNum" == event.TextBoxID.toString()) {
            this.serialNumberStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Quantity" == event.TextBoxID.toString()) {
            this.quantityStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        this.disableInvSaveButton();
    };
    MaintainNonCartItemsComponent.prototype.disableInvSaveButton = function () {
        this.disableInvBtn = true;
        if (this.enableLotControl && this.enableSerial) {
            if (this.inventoryItem.SERIALNUMBER == '' || this.inventoryItem.LOTNUMBER == '') {
                this.disableInvBtn = true;
                return;
            }
            if (this.enableQuantity) {
                if (this.lotNumberStatus == 0 && this.serialNumberStatus == 0 && this.quantityStatus == 0 && this.inventoryItem.EXPIRYDATE != '' && this.inventoryItem.EXPIRYDATE != undefined) {
                    this.disableInvBtn = false;
                }
            }
            else {
                if (this.lotNumberStatus == 0 && this.serialNumberStatus == 0 && this.inventoryItem.EXPIRYDATE != '' && this.inventoryItem.EXPIRYDATE != undefined) {
                    this.disableInvBtn = false;
                }
            }
        }
        else if (this.enableLotControl && !this.enableSerial) {
            if (this.inventoryItem.SERIALNUMBER == '') {
                this.disableInvBtn = true;
                return;
            }
            if (this.enableQuantity) {
                if (this.lotNumberStatus == 0 && this.quantityStatus == 0 && this.inventoryItem.EXPIRYDATE != '' && this.inventoryItem.EXPIRYDATE != undefined) {
                    if (this.serialNumberStatus == 0 || this.serialNumberStatus == undefined) {
                        this.disableInvBtn = false;
                    }
                }
            }
            else {
                if (this.lotNumberStatus == 0 && this.inventoryItem.EXPIRYDATE != '' && this.inventoryItem.EXPIRYDATE != undefined) {
                    if (this.serialNumberStatus == 0 || this.serialNumberStatus == undefined) {
                        this.disableInvBtn = false;
                    }
                }
            }
        }
        else if (!this.enableLotControl && this.enableSerial) {
            if (this.inventoryItem.SERIALNUMBER == '') {
                this.disableInvBtn = true;
                return;
            }
            if (this.enableQuantity) {
                if (this.serialNumberStatus == 0 && this.quantityStatus == 0 && this.inventoryItem.EXPIRYDATE != '' && this.inventoryItem.EXPIRYDATE != undefined) {
                    if (this.lotNumberStatus == 0 || this.lotNumberStatus == undefined) {
                        this.disableInvBtn = false;
                    }
                }
            }
            else {
                if (this.serialNumberStatus == 0 && this.inventoryItem.EXPIRYDATE != '' && this.inventoryItem.EXPIRYDATE != undefined) {
                    if (this.lotNumberStatus == 0 || this.lotNumberStatus == undefined) {
                        this.disableInvBtn = false;
                    }
                }
            }
        }
        else {
            if (this.enableQuantity) {
                if (this.quantityStatus == 0 && this.inventoryItem.EXPIRYDATE != '' && this.inventoryItem.EXPIRYDATE != undefined) {
                    if (this.lotNumberStatus == 0 || this.lotNumberStatus == undefined || this.serialNumberStatus == 0 || this.serialNumberStatus == undefined) {
                        this.disableInvBtn = false;
                    }
                }
            }
            else {
                if (this.inventoryItem.EXPIRYDATE != '' && this.inventoryItem.EXPIRYDATE != undefined) {
                    if (this.lotNumberStatus == 0 || this.lotNumberStatus == undefined || this.serialNumberStatus == 0 || this.serialNumberStatus == undefined) {
                        this.disableInvBtn = false;
                    }
                }
            }
        }
    };
    MaintainNonCartItemsComponent.prototype.selectDate = function (e) {
        this.disableInvSaveButton();
    };
    MaintainNonCartItemsComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    MaintainNonCartItemsComponent.prototype.ngOnDestroy = function () {
        this._deviceTokenEntry = [];
        this.lstDepartmentCarts = [];
        this.lstConsignmentItems = [];
        this.conItem = null;
        this.pazeSize = null;
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], MaintainNonCartItemsComponent.prototype, "dataTableComponent", void 0);
    MaintainNonCartItemsComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-maintain-non-cart-items.component.html',
            providers: [atpar_common_service_1.AtParCommonService, pou_maintain_non_cart_items_service_1.MaintainNonCartItemService],
        }),
        __param(4, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            pou_maintain_non_cart_items_service_1.MaintainNonCartItemService,
            HttpService_1.HttpService, Object, http_1.Http,
            AtParConstants_1.AtParConstants])
    ], MaintainNonCartItemsComponent);
    return MaintainNonCartItemsComponent;
}());
exports.MaintainNonCartItemsComponent = MaintainNonCartItemsComponent;
//# sourceMappingURL=pou-maintain-non-cart-items.component.js.map