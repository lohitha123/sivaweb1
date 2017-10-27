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
var deliver_shiptoid_allocation_for_delivery_of_stock_items_services_1 = require("../../app/Deliver/deliver-shiptoid-allocation-for-delivery-of-stock-items.services");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var HttpService_1 = require("../Shared/HttpService");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var api_1 = require("../components/common/api");
var datatable_1 = require("../components/datatable/datatable");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var ShipToIdAllocationForDeliveryOfStockItemsComponent = (function () {
    /**
     * Constructor
     * @param ShipToIdAllocationForDeliveryOfStockItemsServices
     * @param AtParCommonService
     * @param httpService
     * @param spinnerService
     */
    function ShipToIdAllocationForDeliveryOfStockItemsComponent(httpService, commonService, shipToIdAllocationForDeliveryOfStockItemsServices, spinnerService, atParConstant) {
        this.httpService = httpService;
        this.commonService = commonService;
        this.shipToIdAllocationForDeliveryOfStockItemsServices = shipToIdAllocationForDeliveryOfStockItemsServices;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        /*Varaible Declaration*/
        this.strOrgGrpId = "";
        this.strlblOrgGrpId = "";
        this.strAllOrgId = "";
        this.statusMesssage = "";
        this.strOrgGroupName = "";
        this.orgGrpIdData = "";
        this.selectedOrgGrpId = "";
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupsDropdown = false;
        this.isVisible = false;
        this.checked = false;
        this.blnSortByColumn = true;
        this.lstOrgGroups = [];
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.dataCheckedSorting = [];
        this.dataUnCheckedSorting = [];
        this.lstDBData = [];
        this.lstCheckedShiftToIds = [];
    }
    /**
    * Init Function for binding OrgGroupIds to the dropdown when page loading
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.strlblOrgGrpId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.lstCheckedShiftToIds = new Array();
                        this.dataCheckedSorting = new Array();
                        this.dataUnCheckedSorting = new Array();
                        return [4 /*yield*/, this.bindUserOrgGroups()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Getting data from database and bind records to data table
    * Using Ternary Operator instead of if/else condition
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.bindUserOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, 6, 7]);
                        this.spinnerService.start();
                        if (!(this.strlblOrgGrpId == "All")) return [3 /*break*/, 2];
                        this.blnShowOrgGroupLabel = false;
                        this.blnShowOrgGroupsDropdown = true;
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.strlblOrgGrpId).catch(this.httpService.handleError).then(function (response) {
                                var data = response.json();
                                _this.spinnerService.stop();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstOrgGroups = [];
                                        _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                        for (var i = 0; i <= data.DataList.length - 1; i++) {
                                            if (data.DataList[i].ORG_GROUP_ID !== "All") {
                                                _this.strAllOrgId = data.DataList[i].ORG_GROUP_ID + " - " + data.DataList[i].ORG_GROUP_NAME;
                                                _this.lstOrgGroups.push({ label: _this.strAllOrgId, value: data.DataList[i].ORG_GROUP_ID });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        this.blnShowOrgGroupsDropdown = false;
                        return [4 /*yield*/, this.commonService.getOrgGrpIDs(this.strlblOrgGrpId, this.strOrgGroupName, this.deviceTokenEntry)
                                .catch(this.httpService.handleError).then(function (response) {
                                var data = response.json();
                                _this.spinnerService.stop();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.blnShowOrgGroupLabel = true;
                                        _this.orgGrpIdData = data.DataList[0].ORG_GROUP_ID + " - " + data.DataList[0].ORG_GROUP_NAME;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "bindUserOrgGroups");
                        return [3 /*break*/, 7];
                    case 6:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when click on Go button
    * Using Ternary Operator instead of if/else & if/else(if) conditions
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.btnGoClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isVisible == true) {
                            this.dataTableComponent.reset();
                        }
                        if (this.blnShowOrgGroupsDropdown == true) {
                            if (this.selectedOrgGrpId == "Select One" || this.selectedOrgGrpId == "") {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
                                return [2 /*return*/];
                            }
                        }
                        this.strOrgGrpId = (this.blnShowOrgGroupsDropdown == false) ? this.strlblOrgGrpId : this.selectedOrgGrpId;
                        this.isVisible = false;
                        this.growlMessage = [];
                        this.lstDBData = new Array();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.shipToIdAllocationForDeliveryOfStockItemsServices.getOrgGrpShiptoIDs(this.strOrgGrpId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).catch(this.httpService.handleError).then(function (response) {
                                var data = response.json();
                                _this.statusCode = data.StatusCode;
                                status = data.StatusCode;
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstDBData = [];
                                        for (var i = 0; i <= data.DataList.length - 1; i++) {
                                            data.DataList[i].checkvalue = (data.DataList[i].CHK_ALLOCATED == 1) ? true : false;
                                        }
                                        _this.lstDBData = data.DataList;
                                        _this.BindDataGrid();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.isVisible = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.isVisible = false;
                                        if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_BUNIT_NOTALLOC) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Assigned Org Business Units " });
                                            break;
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.isVisible = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "btnGoClick");
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /*
    * Storing data for sorting in two different  lists one for allocated and another for Unallocated
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.BindDataGrid = function () {
        try {
            this.dataCheckedSorting = [];
            this.dataUnCheckedSorting = [];
            for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].CHK_ALLOCATED == 1) {
                    this.dataCheckedSorting.push(this.lstDBData[i]);
                }
                else {
                    this.dataUnCheckedSorting.push(this.lstDBData[i]);
                }
            }
            this.isVisible = true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    };
    /*
    * This method is calling when we selecting particular record in DataTable and getting selected record data
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.selectedRow = function (values, event) {
        try {
            values.CHK_VALUE = (event == true) ? 1 : 0;
            for (var i = 0; i < this.lstCheckedShiftToIds.length; i++) {
                if (this.lstCheckedShiftToIds[i].SHIPTO_ID == values.SHIPTO_ID) {
                    var index = this.lstCheckedShiftToIds.indexOf(this.lstCheckedShiftToIds[i], 0);
                    this.lstCheckedShiftToIds.splice(index, 1);
                }
            }
            this.lstCheckedShiftToIds.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    };
    /*
    * This method is for sorting the data  based on seleted column in DataTable
    * Using Ternary Operator instead of if/else condition
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.customSort = function (event) {
        try {
            var element = event;
            this.lstDBData = [];
            this.blnSortByColumn = !this.blnSortByColumn;
            this.sortedCheckedRec = [];
            this.sortedUnCheckedRec = [];
            this.sortedCheckedRec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            this.sortedUnCheckedRec = this.dataUnCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            this.lstDBData = [];
            this.lstDBData = (this.blnSortByColumn == false) ? this.sortedCheckedRec.reverse().concat(this.sortedUnCheckedRec.reverse()) : this.sortedCheckedRec.concat(this.sortedUnCheckedRec);
            this.sortedCheckedRec = [];
            this.sortedUnCheckedRec = [];
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    };
    /**
    * This method is calling when click on CheckAll Button in Datatable
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.checkAll = function () {
        try {
            this.lstCheckedShiftToIds = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.EndIndex > this.lstDBData.length) {
                this.EndIndex = this.lstDBData.length;
            }
            for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                this.lstDBData[i].checkvalue = true;
                this.lstDBData[i].CHK_VALUE = 1;
                this.lstCheckedShiftToIds.push(this.lstDBData[i]);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    /**
    * This method is calling when click on None Button in Datatable
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.unCheckAll = function () {
        try {
            this.lstCheckedShiftToIds = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.EndIndex > this.lstDBData.length) {
                this.EndIndex = this.lstDBData.length;
            }
            for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                this.lstDBData[i].checkvalue = false;
                this.lstDBData[i].CHK_VALUE = 0;
                this.lstCheckedShiftToIds.push(this.lstDBData[i]);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    /**
    * This method is calling when user selecting  OrgGrpId in dropdown
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.ddlOrgGrpIdChanged = function () {
        this.growlMessage = [];
        this.spinnerService.start();
        this.isVisible = false;
        try {
            this.strOrgGrpId = this.selectedOrgGrpId;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
        finally {
            this.spinnerService.stop();
        }
    };
    /**
    * This method is calling when user click on Submit Button
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.btn_Submit = function ($event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, i, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        if (this.blnShowOrgGroupsDropdown == false) {
                            for (i = 0; i <= this.lstDBData.length - 1; i++) {
                                this.lstDBData[i].ORG_GROUP_ID = this.strlblOrgGrpId;
                            }
                        }
                        else {
                            for (i = 0; i <= this.lstDBData.length - 1; i++) {
                                this.lstDBData[i].ORG_GROUP_ID = this.strOrgGrpId;
                            }
                        }
                        return [4 /*yield*/, this.shipToIdAllocationForDeliveryOfStockItemsServices.allocateShiptoIDs(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.lstDBData)
                                .catch(this.httpService.handleError).then(function (response) {
                                var data = response.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                        _this.isVisible = false;
                                        _this.lstDBData = [];
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "btn_Submit");
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    /**
     * This method is for clearing all the variables
     * @param event
     */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstCheckedShiftToIds = null;
        this.lstDBData = null;
        this.lstOrgGroups = null;
        this.growlMessage = null;
        this.sortedCheckedRec = [];
        this.sortedUnCheckedRec = [];
        this.strOrgGrpId = null;
        this.strAllOrgId = null;
        this.strOrgGroupName = null;
        this.strlblOrgGrpId = null;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype, "dataTableComponent", void 0);
    ShipToIdAllocationForDeliveryOfStockItemsComponent = __decorate([
        core_1.Component({
            templateUrl: 'deliver-shiptoid-allocation-for-delivery-of-stock-items.component.html',
            providers: [api_1.ConfirmationService, deliver_shiptoid_allocation_for_delivery_of_stock_items_services_1.ShipToIdAllocationForDeliveryOfStockItemsServices, atpar_common_service_1.AtParCommonService]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            atpar_common_service_1.AtParCommonService,
            deliver_shiptoid_allocation_for_delivery_of_stock_items_services_1.ShipToIdAllocationForDeliveryOfStockItemsServices,
            event_spinner_service_1.SpinnerService, AtParConstants_1.AtParConstants])
    ], ShipToIdAllocationForDeliveryOfStockItemsComponent);
    return ShipToIdAllocationForDeliveryOfStockItemsComponent;
}());
exports.ShipToIdAllocationForDeliveryOfStockItemsComponent = ShipToIdAllocationForDeliveryOfStockItemsComponent;
//# sourceMappingURL=deliver-shiptoid-allocation-for-delivery-of-stock-items.component.js.map