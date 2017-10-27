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
var PAR_MNGT_ITEM_1 = require("../../app/Entities/PAR_MNGT_ITEM");
var atpar_setup_inventory_services_1 = require("../../app/Init/atpar-setup-inventory.services");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParEnums_1 = require("../Shared/AtParEnums");
var router_1 = require("@angular/router");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var SetupInventoryHome = (function () {
    function SetupInventoryHome(setupInventoryServices, router, route, spinnerService, atParConstant, atParSharedDataService, httpService) {
        this.setupInventoryServices = setupInventoryServices;
        this.router = router;
        this.route = route;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.atParSharedDataService = atParSharedDataService;
        this.httpService = httpService;
        this.newItem = new PAR_MNGT_ITEM_1.PAR_MNGT_ITEM();
        this._deviceTokenEntry = [];
        this.msgs = [];
        this.isVisible = false;
        this.orgGroupList = [];
        this.orgGroupData = [];
        this.orgList = [];
        this.orgData = [];
        this.replenishmentList = [];
        this.selectedItemId = "";
        this.hasMulipleOrgGoups = false;
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    SetupInventoryHome.prototype.addItem = function () {
        // console.log(this.newItem);
        if (this.newItem.ORG_GROUP_ID == undefined || this.newItem.ORG_GROUP_ID == 'Select One' || this.newItem.ORG_GROUP_ID == "-1") {
            this.msgs = [];
            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
        }
        else if (this.newItem.BUSINESS_UNIT == undefined || this.newItem.BUSINESS_UNIT == 'Select One' || this.newItem.BUSINESS_UNIT == "-1") {
            this.msgs = [];
            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org ID" });
        }
        else {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Add Inventory';
            this.breadCrumbMenu.IS_DIV = false;
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            //this.atParSharedDataService.storage = { "orgGroupId": this.newItem.ORG_GROUP_ID, "orgId": this.newItem.BUSINESS_UNIT, "mode": ModeEnum.Add };
            this.atParSharedDataService.setStorage({ "orgGroupId": this.newItem.ORG_GROUP_ID, "orgId": this.newItem.BUSINESS_UNIT, "mode": AtParEnums_1.ModeEnum.Add });
            var navigationExtras = {
                queryParams: {
                    "mode": AtParEnums_1.ModeEnum.Add,
                },
                relativeTo: this.route
            };
            this.router.navigate(['addormodifyinventory'], navigationExtras);
        }
    };
    SetupInventoryHome.prototype.handleDropdown = function (event) {
        //event.query = current value in input field
    };
    SetupInventoryHome.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    SetupInventoryHome.prototype.ngOnInit = function () {
        var _this = this;
        this.spinnerService.start();
        this.replenishmentList = [];
        this.replenishmentList.push({ label: 'Select One', value: '' });
        this.replenishmentList.push({ label: 'Stock', value: 'Stock' });
        this.replenishmentList.push({ label: 'Nonstock', value: 'Nonstock' });
        this.replenishmentList.push({ label: 'Stockless', value: 'Stockless' });
        this.replenishmentList.push({ label: 'Consignment', value: 'Consignment' });
        try {
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            //console.log(JSON.stringify(this.atParSharedDataService.storage));
            if (this.atParSharedDataService.storage != undefined && this.atParSharedDataService.storage.mode != undefined)
                this.mode = this.atParSharedDataService.storage.mode;
            this.setupInventoryServices.getUserOrgGroups(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_1.StatusType.Success:
                        _this.orgGroupList = resp.DataList;
                        _this.orgGroupData = [];
                        if (_this.orgGroupList.length > 0) {
                            if (_this.orgGroupList.length > 1) {
                                _this.hasMulipleOrgGoups = true;
                                _this.orgGroupData.push({ label: 'Select One', value: -1 });
                                for (var i = 0; i < _this.orgGroupList.length; i++) {
                                    if (_this.orgGroupList[i].ORG_GROUP_ID != "All") {
                                        _this.orgGroupData.push({ label: _this.orgGroupList[i].ORG_GROUP_ID + ' - ' + _this.orgGroupList[i].ORG_GROUP_NAME, value: _this.orgGroupList[i].ORG_GROUP_ID });
                                    }
                                }
                                _this.orgData.push({ label: 'Select One', value: -1 });
                            }
                            else {
                                _this.hasMulipleOrgGoups = false;
                                _this.newItem.ORG_GROUP_ID = _this.orgGroupList[0].ORG_GROUP_ID;
                                _this.orgGroupName = _this.orgGroupList[0].ORG_GROUP_ID + ' - ' + _this.orgGroupList[0].ORG_GROUP_NAME;
                                _this.onOrgroupChange();
                            }
                        }
                        else {
                            _this.orgGroupData.push({ label: 'Select One', value: -1 });
                        }
                        _this.spinnerService.stop();
                        break;
                    case AtParEnums_1.StatusType.Error:
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        _this.spinnerService.stop();
                        break;
                    case AtParEnums_1.StatusType.Warn:
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        _this.spinnerService.stop();
                        break;
                }
            });
            this.pazeSize = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
            if (this.atParSharedDataService.storage != undefined && this.atParSharedDataService.storage.summary != undefined) {
                this.msgs.push(this.atParSharedDataService.storage);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    };
    SetupInventoryHome.prototype.onOrgroupChange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        this.orgData = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.setupInventoryServices.getOrgBusinessUnits(this.newItem.ORG_GROUP_ID, AtParEnums_1.BusinessType.Inventory).forEach(function (resp) {
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.msgs = [];
                                        _this.orgList = resp.DataList;
                                        _this.orgData = [];
                                        if (_this.orgList.length > 0) {
                                            _this.orgData.push({ label: 'Select One', value: -1 });
                                            for (var i = 0; i < _this.orgList.length; i++) {
                                                _this.orgData.push({ label: _this.orgList[i], value: _this.orgList[i] });
                                            }
                                        }
                                        else {
                                            _this.orgData.push({ label: 'Select One', value: -1 });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.spinnerService.stop();
                                        _this.orgData.push({ label: 'Select One', value: -1 });
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.spinnerService.stop();
                                        _this.orgData.push({ label: 'Select One', value: -1 });
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        break;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "onOrgroupChange");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupInventoryHome.prototype.btnGO = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //console.log(this.newItem);
                        this.msgs = [];
                        if (!(this.newItem.ORG_GROUP_ID == undefined || this.newItem.ORG_GROUP_ID == 'Select One' || this.newItem.ORG_GROUP_ID == "-1")) return [3 /*break*/, 1];
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(this.newItem.BUSINESS_UNIT == undefined || this.newItem.BUSINESS_UNIT == 'Select One' || this.newItem.BUSINESS_UNIT == "-1")) return [3 /*break*/, 2];
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org ID" });
                        return [3 /*break*/, 4];
                    case 2:
                        if (this.isVisible) {
                            this.statusType = null;
                            this.replType = '';
                            this.dataTableComponent.reset();
                        }
                        return [4 /*yield*/, this.BindInventoryGrid()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupInventoryHome.prototype.BindInventoryGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.msgs = [];
                        this.statusList = [];
                        this.inventoryDataGrid = [];
                        this.statusList.push({ label: 'All', value: null });
                        this.statusList.push({ label: 'Active', value: false });
                        this.statusList.push({ label: 'InActive', value: true });
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.setupInventoryServices.getExistingItemDetails(this.newItem.BUSINESS_UNIT, this.newItem.ORG_GROUP_ID, this.selectedItemId.split('-')[0])
                                .forEach(function (resp) {
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        //this.msgs = [];
                                        _this.inventoryDataGrid = resp.DataList;
                                        for (var i = 0; i <= _this.inventoryDataGrid.length - 1; i++) {
                                            if (_this.inventoryDataGrid[i].STATUS == 1) {
                                                _this.inventoryDataGrid[i].STATUS_VALUE = true;
                                            }
                                            else {
                                                _this.inventoryDataGrid[i].STATUS_VALUE = false;
                                            }
                                        }
                                        _this.spinnerService.stop();
                                        _this.isVisible = true;
                                        //           console.log(JSON.stringify(resp.DataList));
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        _this.isVisible = false;
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        _this.isVisible = false;
                                        break;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "BindInventoryGrid");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupInventoryHome.prototype.UpdateOrgItemStatus = function (orgItem) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.msgs = [];
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.setupInventoryServices
                                .updateOrgItemStatus(orgItem.ORG_ID, orgItem.INV_ITEM_ID, orgItem.UOM, orgItem.STOR_LOC, orgItem.ALT_STOR_LOC1, orgItem.ALT_STOR_LOC2, orgItem.STATUS)
                                .forEach(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, StatusMessage;
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
                                        case 1:
                                            this.msgs = [];
                                            return [4 /*yield*/, this.BindInventoryGrid()];
                                        case 2:
                                            _b.sent();
                                            StatusMessage = AtParConstants_1.AtParConstants.Updated_Status_Msg.replace("1%", "Item").replace("2%", orgItem.INV_ITEM_ID);
                                            this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: StatusMessage });
                                            this.spinnerService.stop();
                                            return [3 /*break*/, 7];
                                        case 3:
                                            this.msgs = [];
                                            return [4 /*yield*/, this.BindInventoryGrid()];
                                        case 4:
                                            _b.sent();
                                            this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                            this.spinnerService.stop();
                                            return [3 /*break*/, 7];
                                        case 5:
                                            this.msgs = [];
                                            return [4 /*yield*/, this.BindInventoryGrid()];
                                        case 6:
                                            _b.sent();
                                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                            this.spinnerService.stop();
                                            return [3 /*break*/, 7];
                                        case 7: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "UpdateOrgItemStatus");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupInventoryHome.prototype.editinventoryItem = function (inventoryItem) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Inventory';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        //this.atParSharedDataService.storage = { "inventoryItem": inventoryItem, "orgGroupId": this.newItem.ORG_GROUP_ID, "orgId": this.newItem.BUSINESS_UNIT, "mode": ModeEnum.Edit };
        this.atParSharedDataService.setStorage({ "inventoryItem": inventoryItem, "orgGroupId": this.newItem.ORG_GROUP_ID, "orgId": this.newItem.BUSINESS_UNIT, "mode": AtParEnums_1.ModeEnum.Edit });
        var navigationExtras = {
            queryParams: {
                "mode": AtParEnums_1.ModeEnum.Edit,
            },
            relativeTo: this.route
        };
        this.router.navigate(['addormodifyinventory'], navigationExtras);
    };
    SetupInventoryHome.prototype.filterItems = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query_1, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        query_1 = event.query;
                        if (!(this.newItem.ORG_GROUP_ID != undefined && this.newItem.BUSINESS_UNIT != undefined && event.query != undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.setupInventoryServices.getItemDetailsForAutoComplete(this.newItem.BUSINESS_UNIT, this.newItem.ORG_GROUP_ID, event.query)
                                .forEach(function (resp) {
                                _this.msgs = [];
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.inventoryData = resp.DataList;
                                        //  console.log(JSON.stringify(resp.DataList));
                                        _this.filteredItems = _this.filterByItem(query_1, resp.DataList);
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.msgs = [];
                                        _this.filteredItems = _this.filterByItem(query_1, []);
                                        // this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
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
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "filterItems");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupInventoryHome.prototype.filterByItem = function (query, itemsList) {
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
    SetupInventoryHome.prototype.ngOnDestroy = function () {
        this.newItem = null;
        this.inventoryData = null;
        this.inventoryDataGrid = null;
        this.statusList = null;
        this._deviceTokenEntry = null;
        this.mode = null;
        this.msgs = null;
        this.isVisible = null;
        this.pazeSize = null;
        this.orgGroupList = null;
        this.orgGroupData = null;
        this.orgList = null;
        this.orgData = null;
        this.filteredItems = null;
        this.selectedItemId = null;
        this.orgGroupName = null;
        this.hasMulipleOrgGoups = null;
        this.spinnerService = null;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], SetupInventoryHome.prototype, "dataTableComponent", void 0);
    SetupInventoryHome = __decorate([
        core_1.Component({
            templateUrl: 'atpar-setup-inventory-home.component.html',
            providers: [atpar_setup_inventory_services_1.SetupInventoryServices, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [atpar_setup_inventory_services_1.SetupInventoryServices,
            router_1.Router,
            router_1.ActivatedRoute,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            AtParSharedDataService_1.AtParSharedDataService,
            HttpService_1.HttpService])
    ], SetupInventoryHome);
    return SetupInventoryHome;
}());
exports.SetupInventoryHome = SetupInventoryHome;
//# sourceMappingURL=atpar-setup-inventory-home.component.js.map