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
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var par_mngt_par_loc_header_1 = require("../entities/par_mngt_par_loc_header");
var AtParEnums_1 = require("../Shared/AtParEnums");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var HttpService_1 = require("../Shared/HttpService");
var atpar_setup_par_locations_service_1 = require("./atpar-setup-par-locations.service");
var vm_item_par_locations_1 = require("../entities/vm_item_par_locations");
var vm_setup_par_audit_1 = require("../entities/vm_setup_par_audit");
var linq_es5_1 = require("linq-es5");
var datatable_1 = require("../components/datatable/datatable");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var routepath_1 = require("../AtPar/Menus/routepath");
var platform_browser_1 = require("@angular/platform-browser");
var AtparSetupParLocationsComponent = (function () {
    function AtparSetupParLocationsComponent(dataservice, spinnerService, atParConstant, commonService, httpService, document, AtparSetupParLocationServices) {
        this.dataservice = dataservice;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.commonService = commonService;
        this.httpService = httpService;
        this.document = document;
        this.AtparSetupParLocationServices = AtparSetupParLocationServices;
        this.showGrid1 = false;
        this.showGrid2 = false;
        this.page = true;
        this.page2 = false;
        this.showsearch = false;
        this.form = false;
        this.form2 = false;
        this.editform = false;
        this.fdata = false;
        this.loading = true; //for button enable disable
        this.btnitemloading = true;
        this.statusMsgs = []; //for growl  messages
        this.deviceTokenEntry = [];
        this.getOrgIdsLst = [];
        this.getLocIdsLst = [];
        this.ShowPOUParLocation = false;
        this.chkPOUCart = false;
        this.isEditMode = false;
        this.isItemEditMode = false;
        this.selectedItem = "";
        this.lstFilteredItems = [];
        this.lstFilteredItemsList = [];
        this.dsInsertParAudit = [];
        this.insertParAuditItem = new vm_setup_par_audit_1.VM_SETUP_PAR_AUDIT();
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    AtparSetupParLocationsComponent.prototype.go = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var x, temp, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.showGrid1 == true) {
                            this.dataTableComponent.reset();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.statusMsgs = [];
                        this.spinnerService.start();
                        if (this.newItem.ORG_ID == undefined || this.newItem.ORG_ID == "Select one") {
                            this.newItem.ORG_ID = "";
                        }
                        if (this.newItem.PAR_LOC_ID == undefined) {
                            this.newItem.PAR_LOC_ID = "";
                        }
                        if (this.newItem.LOCATION_NAME == undefined) {
                            this.newItem.LOCATION_NAME = "";
                        }
                        if (this.ddlSelectedLocID != "" && this.ddlSelectedLocID != "Select one" && this.ddlSelectedLocID != undefined && this.ddlSelectedLocID != null) {
                            x = void 0;
                            temp = this.ddlSelectedLocID;
                            x = temp.split(" - ");
                            this.newItem.PAR_LOC_ID = x[0];
                        }
                        return [4 /*yield*/, this.AtparSetupParLocationServices.getLocations(this.newItem.ORG_ID, this.newItem.PAR_LOC_ID, this.newItem.LOCATION_NAME, this.appId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var resp = res.json();
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                            if (resp.DataList[i].CART_TYPE == "01") {
                                                resp.DataList[i].CART_TYPE = "Count";
                                            }
                                            else if (resp.DataList[i].CART_TYPE == "02") {
                                                resp.DataList[i].CART_TYPE = "Request";
                                            }
                                        }
                                        for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                            if (resp.DataList[i].PARLOC_TYPE == "1") {
                                                resp.DataList[i].PARLOC_TYPE = AtParEnums_1.Par_Locn_Type[1].toString();
                                            }
                                            else if (resp.DataList[i].PARLOC_TYPE == "2") {
                                                resp.DataList[i].PARLOC_TYPE = AtParEnums_1.Par_Locn_Type[2].toString();
                                            }
                                            else if (resp.DataList[i].PARLOC_TYPE == "3") {
                                                resp.DataList[i].PARLOC_TYPE = AtParEnums_1.Par_Locn_Type[3].toString();
                                            }
                                            else if (resp.DataList[i].PARLOC_TYPE == "4") {
                                                resp.DataList[i].PARLOC_TYPE = AtParEnums_1.Par_Locn_Type[4].toString();
                                            }
                                            else if (resp.DataList[i].PARLOC_TYPE == "5") {
                                                resp.DataList[i].PARLOC_TYPE = AtParEnums_1.Par_Locn_Type[5].toString();
                                            }
                                        }
                                        for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                            if (_this.appId == AtParEnums_1.EnumApps.PointOfUse.toString()) {
                                                resp.DataList = resp.DataList.filter(function (x) { return x.POU_CART == 'Y'; });
                                            }
                                            else if (_this.appId == AtParEnums_1.EnumApps.Pharmacy.toString()) {
                                                resp.DataList = resp.DataList.filter(function (x) { return x.POU_CART == 'P'; });
                                            }
                                            else {
                                                resp.DataList = resp.DataList;
                                            }
                                        }
                                        if (resp.DataList.length > 0) {
                                            _this.showGrid1 = true;
                                            _this.dgrdLocs = resp.DataList;
                                        }
                                        else {
                                            _this.showGrid1 = false;
                                            _this.statusMsgs = [];
                                            _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        _this.showGrid1 = false;
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        _this.showGrid1 = false;
                                        break;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "go");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.add = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Par Location';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = true;
        this.editform = false;
        this.page = false;
        this.showGrid1 = false;
        this.buttonTitle = "Save";
        this.bindSymbal = "floppy-o";
        this.mode = "Add";
        this.btnItemTitle = "";
        this.isEditMode = false;
        this.chkPOUCart = false;
        this.newItem = new par_mngt_par_loc_header_1.PAR_MNGT_PAR_LOC_HEADER();
        this.getCodes();
        this.getShipToIds();
        this.statusMsgs = [];
        this.txtParLocIdStatus = null;
        this.ddlOrgIDStatus = null;
        this.ddlCostCenterStatus = null;
        this.ddlQuanOptStatus = null;
        this.ddlLocTypeStatus = null;
        this.loading = true;
        this.btnItemTitle = "";
    };
    AtparSetupParLocationsComponent.prototype.editParLocationData = function (parlocation) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Par Location';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.form = true;
                        this.editform = false;
                        this.page = false;
                        this.showGrid1 = false;
                        this.statusMsgs = [];
                        this.loading = false;
                        this.buttonTitle = "Update";
                        this.bindSymbal = "check";
                        this.mode = "Edit";
                        this.btnItemTitle = "";
                        this.isEditMode = true;
                        this.getCodes();
                        this.getShipToIds();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.AtparSetupParLocationServices.getLocationHeader(parlocation.PAR_LOC_ID, parlocation.BUSINESS_UNIT).
                                catch(this.httpService.handleError).then(function (res) {
                                var resp = res.json();
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        //for quantity option value binding
                                        if (resp.DataList[0].CART_TYPE == "01") {
                                            resp.DataList[0].CART_TYPE = "Count";
                                        }
                                        else if (resp.DataList[0].CART_TYPE == "02") {
                                            resp.DataList[0].CART_TYPE = "Request";
                                        }
                                        //for setting switch of POU Location
                                        if (resp.DataList[0].POU_CART == "Y") {
                                            _this.chkPOUCart = true;
                                        }
                                        else {
                                            _this.chkPOUCart = false;
                                        }
                                        _this.newItem = resp.DataList[0];
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "editParLocationData");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.add2 = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Item';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form2 = true;
        this.statusMsgs = [];
        this.showsearch = false;
        this.showGrid2 = false;
        this.page2 = false;
        this.isItemEditMode = false;
        this.btnitemloading = true;
        this.fdata = false;
        this.selectedItem = null;
        this.newParItem = new vm_item_par_locations_1.VM_ITEM_PAR_LOCATION();
        this.searchItem = null;
        this.btnItemTitle = "Save";
        this.itemMode = "Add";
        this.ddlOrderingTypeStatus = null;
        this.ddlReplTypeStatus = null;
        this.ddlCCenterStatus = null;
        this.ddlReqTypeStatus = null;
        this.txtCompartmentStatus = null;
        this.txtOptQtyStatus = null;
        this.txtUomIssueStatus = null;
        this.txtUomProcStatus = null;
        this.txtConvRateStatus = null;
    };
    AtparSetupParLocationsComponent.prototype.edit = function () {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.showGrid1 = false;
    };
    AtparSetupParLocationsComponent.prototype.med = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Add / Edit Item(s)';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.spinnerService.start();
                        this.page2 = true;
                        this.showsearch = true;
                        this.showGrid2 = true;
                        this.form = false;
                        this.editform = false;
                        this.page = false;
                        this.showGrid1 = false;
                        this.orgID = location.BUSINESS_UNIT;
                        this.locID = location.PAR_LOC_ID;
                        this.costCenterID = location.COST_CENTER_CODE;
                        return [4 /*yield*/, this.getstrMaxAllowQty()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.GetOrgIdName(location)];
                    case 2:
                        _a.sent();
                        this.bindFillKillFlag();
                        this.bindReplenishment();
                        this.bindOrderingType();
                        this.bindRequisitionType();
                        this.getOrgIds();
                        this.getCodes();
                        this.searchItem = null;
                        this.selectedItem = null;
                        this.buttonTitle = "";
                        this.statusList = [];
                        this.statusList.push({ label: 'All', value: 'All' });
                        this.statusList.push({ label: 'Active', value: 'Active' });
                        this.statusList.push({ label: 'InActive', value: 'InActive' });
                        this.statusList.push({ label: 'Pending', value: 'Pending' });
                        //scrollcontainer
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.search = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var orgid, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showsearch = false;
                        this.showGrid2 = false;
                        this.page2 = false;
                        this.fdata = false;
                        this.mode = "Add";
                        this.btnitemloading = true;
                        this.btnItemTitle = "Save";
                        this.bindSymbol = "floppy-o";
                        this.ddlOrderingTypeStatus = null;
                        this.ddlReplTypeStatus = null;
                        this.ddlCCenterStatus = null;
                        this.ddlReqTypeStatus = null;
                        this.txtCompartmentStatus = null;
                        this.txtOptQtyStatus = null;
                        this.txtUomIssueStatus = null;
                        this.txtUomProcStatus = null;
                        this.txtConvRateStatus = null;
                        this.newParItem = new vm_item_par_locations_1.VM_ITEM_PAR_LOCATION();
                        this.bindOrderingType();
                        this.bindRequisitionType();
                        this.bindReplenishment();
                        this.bindFillKillFlag();
                        if (!(this.selectedItem == "" || this.selectedItem == null)) return [3 /*break*/, 1];
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Invalid ItemID to get the Data" });
                        return [3 /*break*/, 4];
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.splitsearchItem = this.selectedItem.split("-");
                        this.splitsearchItem[0] = this.splitsearchItem[0].trim();
                        orgid = linq_es5_1.asEnumerable(this.lstItems).Where(function (x) { return x.ITEM_ID == _this.splitsearchItem[0]; }).Select(function (x) { return x.ORG_GROUP_ID; }).ToArray();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.AtparSetupParLocationServices.getItemUOM(this.splitsearchItem[0], orgid[0], this.appId).
                                catch(this.httpService.handleError).then(function (res) {
                                var resp = res.json();
                                _this.spinnerService.stop();
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.fdata = true;
                                        if (resp.DataList[0] != null) {
                                            _this.newParItem.SHORT_DESCR = resp.DataList[0].SHORT_DESCR;
                                            _this.newParItem.CHARGE_CODE = resp.DataList[0].CHARGE_CODE;
                                            _this.newParItem.USER_FIELD_1 = resp.DataList[0].USER_FIELD_1;
                                            _this.newParItem.SERIAL_CONTROLLED = resp.DataList[0].SERIAL_CONTROLLED;
                                            if (_this.newParItem.SERIAL_CONTROLLED == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                                                _this.newParItem.SERIAL_CONTROLLED_STATUS = false;
                                            }
                                            else if (_this.newParItem.SERIAL_CONTROLLED == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                                _this.newParItem.SERIAL_CONTROLLED_STATUS = true;
                                            }
                                            _this.newParItem.LOT_CONTROLLED = resp.DataList[0].LOT_CONTROLLED;
                                            if (_this.newParItem.LOT_CONTROLLED == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                                                _this.newParItem.LOT_CONTROLLED_STATUS = false;
                                            }
                                            else if (_this.newParItem.LOT_CONTROLLED == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                                _this.newParItem.LOT_CONTROLLED_STATUS = true;
                                            }
                                            _this.newParItem.UNIT_OF_ISSUE = resp.DataList[0].UNIT_OF_ISSUE;
                                            _this.newParItem.UNIT_OF_PROCUREMENT = resp.DataList[0].UNIT_OF_PROCUREMENT;
                                            _this.newParItem.CONVERSION_RATE = resp.DataList[0].CONV_FACTOR;
                                            _this.newParItem.PAR_UOM = resp.DataList[0].PAR_UOM;
                                            _this.newParItem.CONV_RATE_PAR_UOM = resp.DataList[0].CONV_RATE_PAR_UOM;
                                            if (resp.DataList[0].REPLENISHMENT_TYPE == "1") {
                                                resp.DataList[0].REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Stock].toString();
                                            }
                                            else if (resp.DataList[0].REPLENISHMENT_TYPE == "2") {
                                                resp.DataList[0].REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Nonstock].toString();
                                            }
                                            else if (resp.DataList[0].REPLENISHMENT_TYPE == "4") {
                                                resp.DataList[0].REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Consignment].toString();
                                            }
                                            else if (resp.DataList[0].REPLENISHMENT_TYPE == "3") {
                                                resp.DataList[0].REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Stockless].toString();
                                            }
                                            _this.newParItem.REPLENISHMENT_TYPE = resp.DataList[0].REPLENISHMENT_TYPE;
                                            //this.newParItem.ACTIVEFLAG = "true";
                                            _this.newParItem.STATUS = "Y";
                                            _this.newParItem.COST_CENTER = _this.costCenterID;
                                            _this.newParItem.INV_BUSINESS_UNIT = _this.orgID;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "search");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = false;
        this.page = true;
        this.showGrid1 = false;
        this.editform = false;
        this.newItem = new par_mngt_par_loc_header_1.PAR_MNGT_PAR_LOC_HEADER();
        this.ddlLocIds = [];
        this.ddlLocIds.push({ label: "Select one", value: "Select one" });
        this.statusMsgs = [];
        this.ddlSelectedLocID = "";
    };
    AtparSetupParLocationsComponent.prototype.close2 = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.statusMsgs = [];
        this.ddlLocIds = [];
        this.ddlLocIds.push({ label: "Select one", value: "Select one" });
        this.ddlSelectedLocID = "";
        this.page = true;
        this.showGrid1 = false;
        this.showGrid2 = false;
        this.form = false;
        this.showsearch = false;
        this.page2 = false;
        this.searchItem = "";
        this.newItem = new par_mngt_par_loc_header_1.PAR_MNGT_PAR_LOC_HEADER();
        this.form2 = false;
        this.selectedItem = "";
        this.newParItem = new vm_item_par_locations_1.VM_ITEM_PAR_LOCATION();
    };
    AtparSetupParLocationsComponent.prototype.close3 = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Add / Edit Item(s)';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.statusMsgs = [];
                        this.ddlSelectedLocID = "";
                        this.page = false;
                        this.showGrid1 = false;
                        this.form = false;
                        this.searchItem = "";
                        this.form2 = false;
                        this.selectedItem = "";
                        this.newParItem = new vm_item_par_locations_1.VM_ITEM_PAR_LOCATION();
                        this.showsearch = true;
                        this.showGrid2 = true;
                        this.page2 = true;
                        return [4 /*yield*/, this.GetOrgIdName(this.locationdata)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.bindModelDataChange = function (event) {
        if (this.buttonTitle == "Save" || this.buttonTitle == "UPDATE") {
            try {
                if ("ParLocId" == event.TextBoxID.toString()) {
                    this.txtParLocIdStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("ParLocName" == event.TextBoxID.toString()) {
                    this.txtParLocNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("ParAssetAcc" == event.TextBoxID.toString()) {
                    this.txtAssetAccountStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("DeliveryLocId" == event.TextBoxID.toString()) {
                    this.txtDeliveryLocIdStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
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
                if ("State" == event.TextBoxID.toString()) {
                    this.txtStateStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("Zip" == event.TextBoxID.toString()) {
                    this.txtZipStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("Country" == event.TextBoxID.toString()) {
                    this.txtCountryStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if (this.buttonTitle == "UPDATE") {
                    this.txtParLocIdStatus = 0;
                    this.ddlDropDownChanged();
                }
                //validations satisfies r not 
                if (this.txtParLocIdStatus == 0 && this.ddlLocTypeStatus == 0 && this.ddlQuanOptStatus == 0 && this.ddlOrgIDStatus == 0 && this.ddlCostCenterStatus == 0) {
                    if ((this.txtParLocNameStatus == 0 || this.txtParLocNameStatus == undefined) &&
                        (this.txtAssetAccountStatus == 0 || this.txtAssetAccountStatus == undefined) &&
                        (this.txtDeliveryLocIdStatus == 0 || this.txtDeliveryLocIdStatus == undefined) &&
                        (this.txtAddress1Status == 0 || this.txtAddress1Status == undefined) &&
                        (this.txtAddress2Status == 0 || this.txtAddress2Status == undefined) &&
                        (this.txtCityStatus == 0 || this.txtCityStatus == undefined) &&
                        (this.txtStateStatus == 0 || this.txtStateStatus == undefined) &&
                        (this.txtZipStatus == 0 || this.txtZipStatus == undefined) &&
                        (this.txtCountryStatus == 0 || this.txtCountryStatus == undefined)) {
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
                this.clientErrorMsg(ex, "bindModelDataChange");
            }
        }
        else if (this.btnItemTitle == "Save" || this.btnItemTitle == "Update") {
            try {
                if ("Compartment" == event.TextBoxID.toString()) {
                    this.txtCompartmentStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("OptimalQuant" == event.TextBoxID.toString()) {
                    this.txtOptQtyStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("FoqQty" == event.TextBoxID.toString()) {
                    this.txtFoqQtyStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("MaxQty" == event.TextBoxID.toString()) {
                    this.txtMaxQtyStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("UomProc" == event.TextBoxID.toString()) {
                    this.txtUomProcStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("UnitOfIssue" == event.TextBoxID.toString()) {
                    this.txtUomIssueStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("ParUom" == event.TextBoxID.toString()) {
                    this.txtUomParStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("ConversionRateParUom" == event.TextBoxID.toString()) {
                    this.txtParConvRateStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("ConversionRateProcure" == event.TextBoxID.toString()) {
                    this.txtConvRateStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("ChargeCode" == event.TextBoxID.toString()) {
                    this.txtChargeCode = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("Countorder" == event.TextBoxID.toString()) {
                    this.txtCountOrder = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("UserField1" == event.TextBoxID.toString()) {
                    this.txtUserField1 = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if (this.newParItem.BIN_LOC != null) {
                    if (this.txtCompartmentStatus > 0) {
                        this.txtCompartmentStatus = 1;
                    }
                    else {
                        this.txtCompartmentStatus = 0;
                    }
                }
                if (this.newParItem.OPTIMAL_QTY != null) {
                    if (this.txtOptQtyStatus > 0) {
                        this.txtOptQtyStatus = 1;
                    }
                    else {
                        this.txtOptQtyStatus = 0;
                    }
                }
                if (this.newParItem.UNIT_OF_PROCUREMENT != null) {
                    if (this.txtUomProcStatus > 0) {
                        this.txtUomProcStatus = 1;
                    }
                    else {
                        this.txtUomProcStatus = 0;
                    }
                }
                if (this.newParItem.UNIT_OF_ISSUE != null) {
                    if (this.txtUomIssueStatus > 0) {
                        this.txtUomIssueStatus = 1;
                    }
                    else {
                        this.txtUomIssueStatus = 0;
                    }
                }
                if (this.newParItem.CONVERSION_RATE != null) {
                    if (this.txtConvRateStatus > 0) {
                        this.txtConvRateStatus = 1;
                    }
                    else {
                        this.txtConvRateStatus = 0;
                    }
                }
                this.ddlDropDownAddItemChanged();
                //validations satisfies r not 
                if (this.txtCompartmentStatus == 0 && this.txtOptQtyStatus == 0 && this.txtUomProcStatus == 0 && this.txtUomIssueStatus == 0 && this.txtConvRateStatus == 0 &&
                    this.ddlOrderingTypeStatus == 0 && this.ddlReplTypeStatus == 0 && this.ddlCCenterStatus == 0 && this.ddlReqTypeStatus == 0) {
                    if ((this.txtFoqQtyStatus == 0 || this.txtFoqQtyStatus == undefined) &&
                        (this.txtMaxQtyStatus == 0 || this.txtMaxQtyStatus == undefined) &&
                        (this.txtChargeCode == 0 || this.txtChargeCode == undefined) &&
                        (this.txtCountOrder == 0 || this.txtCountOrder == undefined) &&
                        (this.txtUserField1 == 0 || this.txtUserField1 == undefined) &&
                        (this.txtParConvRateStatus == 0 || this.txtParConvRateStatus == undefined) &&
                        (this.txtUomParStatus == 0 || this.txtUomParStatus == undefined)) {
                        this.btnitemloading = false;
                    }
                    else {
                        this.btnitemloading = true;
                    }
                }
                else {
                    this.btnitemloading = true;
                }
            }
            catch (ex) {
                this.clientErrorMsg(ex, "bindModelDataChange");
            }
        }
    };
    AtparSetupParLocationsComponent.prototype.ddlDropDownChanged = function () {
        if (this.newItem.ORG_ID == "Select one" || this.newItem.ORG_ID == undefined || this.newItem.ORG_ID == null || this.newItem.ORG_ID == "") {
            this.ddlOrgIDStatus = 1;
        }
        else {
            this.ddlOrgIDStatus = 0;
        }
        if (this.newItem.COST_CENTER_CODE == "Select one" || this.newItem.COST_CENTER_CODE == undefined || this.newItem.COST_CENTER_CODE == null || this.newItem.COST_CENTER_CODE == "") {
            this.ddlCostCenterStatus = 1;
        }
        else {
            this.ddlCostCenterStatus = 0;
        }
        if (this.newItem.CART_TYPE == "Select one" || this.newItem.CART_TYPE == undefined || this.newItem.CART_TYPE == null || this.newItem.CART_TYPE == "") {
            this.ddlQuanOptStatus = 1;
        }
        else {
            this.ddlQuanOptStatus = 0;
        }
        if (this.newItem.PARLOC_TYPE == "Select one" || this.newItem.PARLOC_TYPE == undefined || this.newItem.PARLOC_TYPE == null || this.newItem.PARLOC_TYPE == "" || this.newItem.PARLOC_TYPE == "0") {
            this.ddlLocTypeStatus = 1;
        }
        else {
            this.ddlLocTypeStatus = 0;
        }
        if (this.buttonTitle == "UPDATE") {
            this.txtParLocIdStatus = 0;
        }
        if ((this.newItem.PAR_LOC_ID != "" && this.newItem.PAR_LOC_ID != undefined && this.newItem.PAR_LOC_ID != null) && this.txtParLocIdStatus == 0 && this.ddlLocTypeStatus == 0 && this.ddlQuanOptStatus == 0 && this.ddlOrgIDStatus == 0 && this.ddlCostCenterStatus == 0) {
            if ((this.txtParLocNameStatus == 0 || this.txtParLocNameStatus == undefined) &&
                (this.txtAssetAccountStatus == 0 || this.txtAssetAccountStatus == undefined) &&
                (this.txtDeliveryLocIdStatus == 0 || this.txtDeliveryLocIdStatus == undefined) &&
                (this.txtAddress1Status == 0 || this.txtAddress1Status == undefined) &&
                (this.txtAddress2Status == 0 || this.txtAddress2Status == undefined) &&
                (this.txtCityStatus == 0 || this.txtCityStatus == undefined) &&
                (this.txtStateStatus == 0 || this.txtStateStatus == undefined) &&
                (this.txtZipStatus == 0 || this.txtZipStatus == undefined) &&
                (this.txtCountryStatus == 0 || this.txtCountryStatus == undefined)) {
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
    AtparSetupParLocationsComponent.prototype.ddlLoc_Change = function () {
        this.showGrid1 = false;
    };
    AtparSetupParLocationsComponent.prototype.ddlDropDownAddItemChanged = function () {
        if (this.newParItem.ORDERING_TYPE == "Select one" || this.newParItem.ORDERING_TYPE == undefined || this.newParItem.ORDERING_TYPE == null || this.newParItem.ORDERING_TYPE == "") {
            this.ddlOrderingTypeStatus = 1;
        }
        else {
            this.ddlOrderingTypeStatus = 0;
        }
        if (this.newParItem.REPLENISHMENT_TYPE == "Select one" || this.newParItem.REPLENISHMENT_TYPE == undefined || this.newParItem.REPLENISHMENT_TYPE == null || this.newParItem.REPLENISHMENT_TYPE == "") {
            this.ddlReplTypeStatus = 1;
        }
        else {
            this.ddlReplTypeStatus = 0;
        }
        if (this.newParItem.COST_CENTER == "Select one" || this.newParItem.COST_CENTER == undefined || this.newParItem.COST_CENTER == null || this.newParItem.COST_CENTER == "") {
            this.ddlCCenterStatus = 1;
        }
        else {
            this.ddlCCenterStatus = 0;
        }
        if (this.newParItem.REQUISITION_TYPE == "Select one" || this.newParItem.REQUISITION_TYPE == undefined || this.newParItem.REQUISITION_TYPE == null || this.newParItem.REQUISITION_TYPE == "") {
            this.ddlReqTypeStatus = 1;
        }
        else {
            this.ddlReqTypeStatus = 0;
        }
        if (this.btnItemTitle == "Update") {
            if (this.txtCompartmentStatus >= 1) {
                this.txtCompartmentStatus = 1;
            }
            else {
                this.txtCompartmentStatus = 0;
            }
            if (this.txtOptQtyStatus >= 1) {
                this.txtOptQtyStatus = 1;
            }
            else {
                this.txtOptQtyStatus = 0;
            }
            if (this.txtUomProcStatus >= 1) {
                this.txtUomProcStatus = 1;
            }
            else {
                this.txtUomProcStatus = 0;
            }
            if (this.txtUomIssueStatus >= 1) {
                this.txtUomIssueStatus = 1;
            }
            else {
                this.txtUomIssueStatus = 0;
            }
            if (this.txtConvRateStatus >= 1) {
                this.txtConvRateStatus = 1;
            }
            else {
                this.txtConvRateStatus = 0;
            }
        }
        if (this.txtCompartmentStatus == 0 && this.txtOptQtyStatus == 0 && this.txtUomProcStatus == 0 && this.txtUomIssueStatus == 0 && this.txtConvRateStatus == 0 &&
            this.ddlOrderingTypeStatus == 0 && this.ddlReplTypeStatus == 0 && this.ddlCCenterStatus == 0 && this.ddlReqTypeStatus == 0
            && (this.newParItem.BIN_LOC != "" && this.newParItem.BIN_LOC != undefined && this.newParItem.BIN_LOC != null) &&
            (this.newParItem.OPTIMAL_QTY != undefined && this.newParItem.OPTIMAL_QTY != null) &&
            (this.newParItem.UNIT_OF_PROCUREMENT != "" && this.newParItem.UNIT_OF_PROCUREMENT != undefined && this.newParItem.UNIT_OF_PROCUREMENT != null) &&
            (this.newParItem.UNIT_OF_ISSUE != "" && this.newParItem.UNIT_OF_ISSUE != undefined && this.newParItem.UNIT_OF_ISSUE != null) &&
            (this.newParItem.CONVERSION_RATE != undefined && this.newParItem.CONVERSION_RATE != null)) {
            if ((this.txtFoqQtyStatus == 0 || this.txtFoqQtyStatus == undefined) &&
                (this.txtMaxQtyStatus == 0 || this.txtMaxQtyStatus == undefined) &&
                (this.txtChargeCode == 0 || this.txtChargeCode == undefined) &&
                (this.txtCountOrder == 0 || this.txtCountOrder == undefined) &&
                (this.txtUserField1 == 0 || this.txtUserField1 == undefined) &&
                (this.txtParConvRateStatus == 0 || this.txtParConvRateStatus == undefined) &&
                (this.txtUomParStatus == 0 || this.txtUomParStatus == undefined)) {
                this.btnitemloading = false;
            }
            else {
                this.btnitemloading = true;
            }
        }
        else {
            this.btnitemloading = true;
        }
    };
    AtparSetupParLocationsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    AtparSetupParLocationsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.spinnerService.start();
                        this.newItem = new par_mngt_par_loc_header_1.PAR_MNGT_PAR_LOC_HEADER();
                        this.newParItem = new vm_item_par_locations_1.VM_ITEM_PAR_LOCATION();
                        //this.dataTableComponent.reset();
                        //this.chkPOUCart = false;
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        return [4 /*yield*/, this.getOrgIds()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getLocationType()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.bindQuantityOption()];
                    case 3:
                        _a.sent();
                        this.ddlLocIds = [];
                        this.ddlLocIds.push({ label: "Select one", value: "Select one" });
                        if (this.appId == AtParEnums_1.EnumApps.PointOfUse.toString() || this.appId == AtParEnums_1.EnumApps.Pharmacy.toString()) {
                            this.ShowPOUParLocation = false;
                        }
                        else {
                            this.ShowPOUParLocation = true;
                        }
                        this.spinnerService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "ngOnInit");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.bindQuantityOption = function () {
        this.ddlCart = [];
        this.ddlCart.push({ label: "Select one", value: "Select one" });
        this.ddlCart.push({ label: "Count", value: "Count" });
        this.ddlCart.push({ label: "Request", value: "Request" });
    };
    AtparSetupParLocationsComponent.prototype.getCodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.ddlCostCenterId = [];
                        this.ddlCostCenterId.push({ label: "Select one", value: "Select one" });
                        this.spinnerService.start();
                        return [4 /*yield*/, this.AtparSetupParLocationServices.getCodes("", this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], "").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.getCostCentersLst = res.json().DataList,
                                    _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.getCostCentersLst = linq_es5_1.asEnumerable(_this.getCostCentersLst).Where(function (x) { return x.STATUS === false; }).Select(function (x) { return x; }).ToArray();
                                        if (_this.getCostCentersLst.length > 0) {
                                            for (var i = 0; i <= _this.getCostCentersLst.length - 1; i++) {
                                                _this.ddlCostCenterId.push({ label: _this.getCostCentersLst[i].COST_CENTER_CODE, value: _this.getCostCentersLst[i].COST_CENTER_CODE });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                            _this.statusMsgs = [];
                                        }
                                        else {
                                            _this.statusMsgs = [];
                                            _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
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
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "getCodes");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.getOrgIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.ddlOrgId = [];
                        this.ddlOrgId.push({ label: "Select one", value: "Select one" });
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getOrgIds(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.getOrgIdsLst = res.json().DataList,
                                    _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (_this.getOrgIdsLst.length > 0) {
                                            for (var i = 0; i <= _this.getOrgIdsLst.length - 1; i++) {
                                                _this.ddlOrgId.push({ label: _this.getOrgIdsLst[i].toString(), value: _this.getOrgIdsLst[i].toString() });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                            _this.statusMsgs = [];
                                        }
                                        else {
                                            _this.statusMsgs = [];
                                            _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
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
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "getOrgIds");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.getLocByOrgId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showGrid1 = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        this.ddlSelectedLocID = "";
                        this.getLocIdsLst = [];
                        return [4 /*yield*/, this.commonService.getLocByOrgId(this.newItem.ORG_ID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.getLocIdsLst = res.json().DataList,
                                    _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ddlLocIds = [];
                                        _this.ddlLocIds.push({ label: "Select one", value: "Select one" });
                                        if (_this.getLocIdsLst.length > 0) {
                                            if (_this.appId == AtParEnums_1.EnumApps.PointOfUse.toString()) {
                                                for (var i = 0; i <= _this.getLocIdsLst.length - 1; i++) {
                                                    if (_this.getLocIdsLst[i].POU_CART == 'Y') {
                                                        var ddlValues = _this.getLocIdsLst[i].PAR_LOC_ID + " - " + _this.getLocIdsLst[i].LOCATION_NAME;
                                                        _this.ddlLocIds.push({ label: ddlValues, value: ddlValues });
                                                    }
                                                }
                                            }
                                            else if (_this.appId == AtParEnums_1.EnumApps.Pharmacy.toString()) {
                                                for (var i = 0; i <= _this.getLocIdsLst.length - 1; i++) {
                                                    if (_this.getLocIdsLst[i].POU_CART == 'P') {
                                                        var ddlValues = _this.getLocIdsLst[i].PAR_LOC_ID + " - " + _this.getLocIdsLst[i].LOCATION_NAME;
                                                        _this.ddlLocIds.push({ label: ddlValues, value: ddlValues });
                                                    }
                                                }
                                            }
                                            else {
                                                for (var i = 0; i <= _this.getLocIdsLst.length - 1; i++) {
                                                    if (_this.getLocIdsLst[i].POU_CART == 'N') {
                                                        var ddlValues = _this.getLocIdsLst[i].PAR_LOC_ID + " - " + _this.getLocIdsLst[i].LOCATION_NAME;
                                                        _this.ddlLocIds.push({ label: ddlValues, value: ddlValues });
                                                    }
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.StatusCode == 1102002) {
                                            _this.ddlLocIds = [];
                                            _this.ddlLocIds.push({ label: "Select one", value: "Select one" });
                                            _this.newItem.PAR_LOC_ID = "";
                                            _this.ddlSelectedLocID = "Select one";
                                        }
                                        else {
                                            _this.statusMsgs = [];
                                            _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
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
                            })];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "getLocByOrgId");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.getShipToIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.ddlShipToId = [];
                        this.ddlShipToId.push({ label: "Select one", value: "0" });
                        return [4 /*yield*/, this.AtparSetupParLocationServices.getShipToIds("").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.getShipToIDsLst = res.json().DataList,
                                    // this.getShipToIDsLst = asEnumerable(this.getShipToIDsLst).Where(x => x.STATUS = true).ToArray()
                                    _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (_this.getShipToIDsLst.length > 0) {
                                            for (var i = 0; i <= _this.getShipToIDsLst.length - 1; i++) {
                                                _this.ddlShipToId.push({ label: _this.getShipToIDsLst[i].SHIPTO_ID, value: _this.getShipToIDsLst[i].SHIPTO_ID });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                            _this.statusMsgs = [];
                                        }
                                        else {
                                            _this.statusMsgs = [];
                                            _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
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
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "getShipToIds");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.getLocationType = function () {
        if (this.appId == AtParEnums_1.EnumApps.Pharmacy.toString()) {
            this.ddlLocType = [];
            this.ddlLocType.push({ label: "Select one", value: "0" });
            this.ddlLocType.push({ label: "ADC", value: "1" });
            this.ddlLocType.push({ label: "CrashCart", value: "2" });
            this.ddlLocType.push({ label: "Inventory", value: "3" });
            this.ddlLocType.push({ label: "ParLocation", value: "4" });
        }
        else {
            this.ddlLocType = [];
            this.ddlLocType.push({ label: "Select one", value: "0" });
            this.ddlLocType.push({ label: "Inventory", value: "1" });
            this.ddlLocType.push({ label: "ParLocation", value: "2" });
        }
    };
    AtparSetupParLocationsComponent.prototype.submitData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showGrid1 = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        this.statusMsgs = [];
                        if (!(this.newItem.ORG_ID == "Select one" || this.newItem.ORG_ID == undefined || this.newItem.ORG_ID == null || this.newItem.ORG_ID == "")) return [3 /*break*/, 2];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Select Org ID" });
                        this.showGrid1 = false;
                        return [3 /*break*/, 7];
                    case 2:
                        if (!(this.newItem.COST_CENTER_CODE == "Select one" || this.newItem.COST_CENTER_CODE == undefined || this.newItem.COST_CENTER_CODE == null || this.newItem.COST_CENTER_CODE == "")) return [3 /*break*/, 3];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Select COST CENTER" });
                        this.showGrid1 = false;
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(this.newItem.CART_TYPE == "Select one" || this.newItem.CART_TYPE == undefined || this.newItem.CART_TYPE == null || this.newItem.CART_TYPE == "")) return [3 /*break*/, 4];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Select Quantity Option" });
                        this.showGrid1 = false;
                        return [3 /*break*/, 7];
                    case 4:
                        if (!(this.newItem.PARLOC_TYPE == "Select one" || this.newItem.PARLOC_TYPE == undefined || this.newItem.PARLOC_TYPE == null || this.newItem.PARLOC_TYPE == "")) return [3 /*break*/, 5];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Select Location Type" });
                        this.showGrid1 = false;
                        return [3 /*break*/, 7];
                    case 5:
                        this.spinnerService.start();
                        if (this.newItem.CART_TYPE == "Count") {
                            this.newItem.CART_TYPE = "01";
                        }
                        else if (this.newItem.CART_TYPE == "Request") {
                            this.newItem.CART_TYPE = "02";
                        }
                        if (this.appId == AtParEnums_1.EnumApps.PointOfUse.toString()) {
                            this.newItem.POU_CART = "Y";
                        }
                        else {
                            if (this.chkPOUCart == true) {
                                this.newItem.POU_CART = "Y";
                            }
                            else {
                                this.newItem.POU_CART = "N";
                            }
                        }
                        if (this.appId == AtParEnums_1.EnumApps.Pharmacy.toString()) {
                            this.newItem.POU_CART = "P";
                        }
                        return [4 /*yield*/, this.AtparSetupParLocationServices.updateLoc(this.newItem, this.mode).
                                catch(this.httpService.handleError).then(function (res) {
                                var resp = res.json();
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        if (_this.buttonTitle == "Save") {
                                            _this.statusMsgs = [];
                                            var statusmsg = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Par Location").replace("2%", _this.newItem.PAR_LOC_ID);
                                            _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusmsg });
                                            _this.newItem = new par_mngt_par_loc_header_1.PAR_MNGT_PAR_LOC_HEADER();
                                            document.getElementById('txtddlOrgId').focus();
                                            _this.txtParLocIdStatus = null;
                                            _this.ddlLocTypeStatus = null;
                                            _this.ddlQuanOptStatus = null;
                                            _this.ddlOrgIDStatus = null;
                                            _this.ddlCostCenterStatus = null;
                                            _this.loading = true;
                                        }
                                        else if (_this.buttonTitle == "UPDATE") {
                                            _this.statusMsgs = [];
                                            var statusmsg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Par Location").replace("2%", _this.newItem.PAR_LOC_ID);
                                            _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusmsg });
                                            if (_this.newItem.CART_TYPE == "01") {
                                                _this.newItem.CART_TYPE = "Count";
                                            }
                                            else if (_this.newItem.CART_TYPE == "02") {
                                                _this.newItem.CART_TYPE = "Request";
                                            }
                                            if (_this.isEditMode) {
                                                document.getElementById("ParLocName").focus();
                                            }
                                            //let locationid = this.newItem.LOCATION_ID;
                                            //this.newItem = new VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS();
                                            //this.newItem.LOCATION_ID = locationid;
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        if (_this.newItem.CART_TYPE == "01") {
                                            _this.newItem.CART_TYPE = "Count";
                                        }
                                        else if (_this.newItem.CART_TYPE == "02") {
                                            _this.newItem.CART_TYPE = "Request";
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                }
                                _this.atParConstant.scrollToTop();
                            })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "submitData");
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.getstrMaxAllowQty = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], this.appId, "MAX_ALLOW_QTY").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataList != null) {
                                            _this.strMaxAllowQty = data.DataList[0];
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
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, "getstrMaxAllowQty");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.GetOrgIdName = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.spinnerService.start();
                        this.newItem = new par_mngt_par_loc_header_1.PAR_MNGT_PAR_LOC_HEADER();
                        this.locationdata = location;
                        return [4 /*yield*/, this.AtparSetupParLocationServices.getOrgIdName(location.BUSINESS_UNIT).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataVariable != null) {
                                            _this.newItem.ORG_ID = data.DataVariable.toString();
                                        }
                                        _this.newItem.PAR_LOC_ID = location.PAR_LOC_ID;
                                        _this.newItem.LOCATION_NAME = location.LOCATION_NAME;
                                        _this.newItem.CART_TYPE = location.CART_TYPE;
                                        _this.newItem.COST_CENTER_CODE = location.COST_CENTER_CODE;
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
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.BindDataGrid(location)];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "GetOrgIdName");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.BindDataGrid = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.showGrid2 == true) {
                            this.dataTableComponent.reset();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        this.dgrd2Locs = [];
                        return [4 /*yield*/, this.AtparSetupParLocationServices.getLocDetails(location.PAR_LOC_ID, location.BUSINESS_UNIT, "", "").
                                catch(this.httpService.handleError).then(function (res) {
                                var resp = res.json();
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (resp.DataList.length > 0) {
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                if (resp.DataList[i].ORDERING_TYPE == "01") {
                                                    resp.DataList[i].ORDERING_TYPE = "par";
                                                }
                                                else if (resp.DataList[i].ORDERING_TYPE == "02") {
                                                    resp.DataList[i].ORDERING_TYPE = "Foq";
                                                }
                                                else if (resp.DataList[i].ORDERING_TYPE == "03") {
                                                    resp.DataList[i].ORDERING_TYPE = "Min/Max";
                                                }
                                                else if (resp.DataList[i].ORDERING_TYPE == "04") {
                                                    resp.DataList[i].ORDERING_TYPE = "Issue";
                                                }
                                            }
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                if (resp.DataList[i].STATUS == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                                    resp.DataList[i].STATUS = "Active";
                                                }
                                                else if (resp.DataList[i].STATUS == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                                                    resp.DataList[i].STATUS = "InActive";
                                                }
                                                else {
                                                    resp.DataList[i].STATUS = "Pending";
                                                }
                                            }
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                if (resp.DataList[i].LOCDTLSRPTYPE == AtParEnums_1.Repleshment_Type.Stock) {
                                                    resp.DataList[i].REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Stock].toString();
                                                }
                                                else if (resp.DataList[i].LOCDTLSRPTYPE == AtParEnums_1.Repleshment_Type.Nonstock) {
                                                    resp.DataList[i].REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Nonstock].toString();
                                                }
                                                else if (resp.DataList[i].LOCDTLSRPTYPE == AtParEnums_1.Repleshment_Type.Consignment) {
                                                    resp.DataList[i].REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Consignment].toString();
                                                }
                                                else if (resp.DataList[i].LOCDTLSRPTYPE == AtParEnums_1.Repleshment_Type.Stockless) {
                                                    resp.DataList[i].REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Stockless].toString();
                                                }
                                            }
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                if (resp.DataList[i].FILL_KILL_FLAG == "F") {
                                                    resp.DataList[i].FILL_KILL_FLAG = "Fill";
                                                }
                                                else if (resp.DataList[i].FILL_KILL_FLAG == "K") {
                                                    resp.DataList[i].FILL_KILL_FLAG = "Kill";
                                                }
                                                else {
                                                    resp.DataList[i].FILL_KILL_FLAG = "";
                                                }
                                            }
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                if (resp.DataList[i].LOCDTLSUOI == "") {
                                                    resp.DataList[i].LOCDTLSUOI = resp.DataList[i].ITMUOI;
                                                }
                                                else {
                                                    resp.DataList[i].LOCDTLSUOI = resp.DataList[i].LOCDTLSUOI;
                                                }
                                            }
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                if (resp.DataList[i].OPTIMAL_QTY == null) {
                                                    resp.DataList[i].OPTIMAL_QTY = 0;
                                                }
                                                else {
                                                    resp.DataList[i].OPTIMAL_QTY = resp.DataList[i].OPTIMAL_QTY;
                                                }
                                                resp.DataList[i].OPTIMAL_QTY = resp.DataList[i].OPTIMAL_QTY == null ? parseFloat('0').toFixed(2) : parseFloat(resp.DataList[i].OPTIMAL_QTY).toFixed(2);
                                            }
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                if (resp.DataList[i].FOQ_QTY == null) {
                                                    resp.DataList[i].FOQ_QTY = 0;
                                                }
                                                else {
                                                    resp.DataList[i].FOQ_QTY = resp.DataList[i].FOQ_QTY;
                                                }
                                                resp.DataList[i].FOQ_QTY = resp.DataList[i].FOQ_QTY == null ? parseFloat('0').toFixed(2) : parseFloat(resp.DataList[i].FOQ_QTY).toFixed(2);
                                            }
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                if (resp.DataList[i].MAX_QTY == null) {
                                                    resp.DataList[i].MAX_QTY = 0;
                                                }
                                                else {
                                                    resp.DataList[i].MAX_QTY = resp.DataList[i].MAX_QTY;
                                                }
                                                resp.DataList[i].MAX_QTY = resp.DataList[i].MAX_QTY == null ? parseFloat('0').toFixed(2) : parseFloat(resp.DataList[i].MAX_QTY).toFixed(2);
                                            }
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                //resp.DataList[i].LOCDTLSPARCONVRATE = resp.DataList[i].LOCDTLSPARCONVRATE == null ? parseFloat('0').toFixed(2) : parseFloat(resp.DataList[i].LOCDTLSPARCONVRATE).toFixed(2);
                                                resp.DataList[i].LOCDTLSPARCONVRATE = resp.DataList[i].LOCDTLSPARCONVRATE == null ? '' : parseFloat(resp.DataList[i].LOCDTLSPARCONVRATE);
                                            }
                                            _this.dgrd2Locs = resp.DataList;
                                            _this.tempdgrd2Locs = _this.dgrd2Locs;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (resp.StatusCode == 1102002) {
                                            _this.statusMsgs = [];
                                        }
                                        else {
                                            _this.statusMsgs = [];
                                            _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12, "BindDataGrid");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.itemSearch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.itemMode = "Update";
                        this.isItemEditMode = true;
                        this.btnItemTitle = "Update";
                        this.btnitemloading = false;
                        if (!(this.searchItem == "" || this.searchItem == null)) return [3 /*break*/, 1];
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Item Value" });
                        return [3 /*break*/, 5];
                    case 1:
                        if (this.showGrid2 == true) {
                            this.dataTableComponent.reset();
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        this.spinnerService.start();
                        this.dgrd2Locs = [];
                        this.newParItem = new vm_item_par_locations_1.VM_ITEM_PAR_LOCATION();
                        this.splitsearchItem = this.searchItem.split("-");
                        return [4 /*yield*/, this.AtparSetupParLocationServices.getLocDetails(this.locID, this.orgID, this.splitsearchItem[0], "").
                                catch(this.httpService.handleError).then(function (res) {
                                var resp = res.json();
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.form2 = true;
                                        _this.fdata = true;
                                        if (resp.DataList.length > 0) {
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                if (resp.DataList[i].ORDERING_TYPE == "01") {
                                                    resp.DataList[i].ORDERING_TYPE = "Par";
                                                }
                                                else if (resp.DataList[i].ORDERING_TYPE == "02") {
                                                    resp.DataList[i].ORDERING_TYPE = "Foq";
                                                }
                                                else if (resp.DataList[i].ORDERING_TYPE == "03") {
                                                    resp.DataList[i].ORDERING_TYPE = "Min/Max";
                                                }
                                                else if (resp.DataList[i].ORDERING_TYPE == "04") {
                                                    resp.DataList[i].ORDERING_TYPE = "Issue";
                                                }
                                            }
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                if (resp.DataList[i].STATUS == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                                    resp.DataList[i].STATUS = "Active";
                                                }
                                                else if (resp.DataList[i].STATUS == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                                                    resp.DataList[i].STATUS = "InActive";
                                                }
                                                else {
                                                    resp.DataList[i].STATUS = "Pending";
                                                }
                                            }
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                if (resp.DataList[i].LOCDTLSRPTYPE == AtParEnums_1.Repleshment_Type.Stock) {
                                                    resp.DataList[i].REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Stock].toString();
                                                }
                                                else if (resp.DataList[i].LOCDTLSRPTYPE == AtParEnums_1.Repleshment_Type.Nonstock) {
                                                    resp.DataList[i].REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Nonstock].toString();
                                                }
                                                else if (resp.DataList[i].LOCDTLSRPTYPE == AtParEnums_1.Repleshment_Type.Consignment) {
                                                    resp.DataList[i].REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Consignment].toString();
                                                }
                                                else if (resp.DataList[i].LOCDTLSRPTYPE == AtParEnums_1.Repleshment_Type.Stockless) {
                                                    resp.DataList[i].REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Stockless].toString();
                                                }
                                            }
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                if (resp.DataList[i].FILL_KILL_FLAG == "F") {
                                                    resp.DataList[i].FILL_KILL_FLAG = "Fill";
                                                }
                                                else if (resp.DataList[i].FILL_KILL_FLAG == "K") {
                                                    resp.DataList[i].FILL_KILL_FLAG = "Kill";
                                                }
                                                else {
                                                    resp.DataList[i].FILL_KILL_FLAG = "";
                                                }
                                            }
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                if (resp.DataList[i].OPTIMAL_QTY == null) {
                                                    resp.DataList[i].OPTIMAL_QTY = 0;
                                                }
                                                else {
                                                    resp.DataList[i].OPTIMAL_QTY = resp.DataList[i].OPTIMAL_QTY;
                                                }
                                            }
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                if (resp.DataList[i].FOQ_QTY == null) {
                                                    resp.DataList[i].FOQ_QTY = 0;
                                                }
                                                else {
                                                    resp.DataList[i].FOQ_QTY = resp.DataList[i].FOQ_QTY;
                                                }
                                            }
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                if (resp.DataList[i].MAX_QTY == null) {
                                                    resp.DataList[i].MAX_QTY = 0;
                                                }
                                                else {
                                                    resp.DataList[i].MAX_QTY = resp.DataList[i].MAX_QTY;
                                                }
                                            }
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                if (resp.DataList[i].LOCDTLSPARUOM != null) {
                                                    resp.DataList[i].LOCDTLSPARUOM = resp.DataList[i].LOCDTLSPARUOM;
                                                }
                                                else {
                                                    resp.DataList[i].LOCDTLSPARUOM = resp.DataList[i].ITMPARUOM;
                                                }
                                            }
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                if (resp.DataList[i].LOCDTLSCONVRATE != null) {
                                                    if (resp.DataList[i].LOCDTLSCONVRATE > 0) {
                                                        resp.DataList[i].LOCDTLSCONVRATE = resp.DataList[i].LOCDTLSCONVRATE;
                                                    }
                                                }
                                            }
                                            //For Decimal
                                            for (var i = 0; i <= resp.DataList.length - 1; i++) {
                                                resp.DataList[i].OPTIMAL_QTY = resp.DataList[i].OPTIMAL_QTY == null ? parseFloat('0').toFixed(2) : parseFloat(resp.DataList[i].OPTIMAL_QTY).toFixed(2);
                                                resp.DataList[i].FOQ_QTY = resp.DataList[i].FOQ_QTY == null ? parseFloat('0').toFixed(2) : parseFloat(resp.DataList[i].FOQ_QTY).toFixed(2);
                                                resp.DataList[i].MAX_QTY = resp.DataList[i].MAX_QTY == null ? parseFloat('0').toFixed(2) : parseFloat(resp.DataList[i].MAX_QTY).toFixed(2);
                                                // resp.DataList[i].LOCDTLSPARCONVRATE = resp.DataList[i].LOCDTLSPARCONVRATE == null ? parseFloat('0').toFixed(2) : parseFloat(resp.DataList[i].LOCDTLSPARCONVRATE).toFixed(2);
                                                resp.DataList[i].LOCDTLSPARCONVRATE = resp.DataList[i].LOCDTLSPARCONVRATE == null ? '' : parseFloat(resp.DataList[i].LOCDTLSPARCONVRATE);
                                            }
                                            //For Grid Binding
                                            _this.dgrd2Locs = resp.DataList;
                                            _this.form2 = false;
                                            _this.fdata = false;
                                            _this.showGrid2 = true;
                                            _this.spinnerService.stop();
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.showGrid2 = false;
                                        _this.page2 = false;
                                        _this.form2 = false;
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.showGrid2 = false;
                                        _this.page2 = false;
                                        _this.form2 = false;
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.showGrid2 = false;
                                        _this.page2 = false;
                                        _this.form2 = false;
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13, "itemSearch");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.edititem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Item';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.btnItemTitle = "Update";
                        this.itemMode = "Update";
                        this.bindSymbol = "check";
                        this.isItemEditMode = true;
                        this.btnitemloading = false;
                        this.showsearch = false;
                        this.page2 = false;
                        this.showGrid2 = false;
                        this.statusMsgs = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.AtparSetupParLocationServices.getLocDetails(this.locID, this.orgID, item.ITEM_ID, item.BIN_LOC).
                                catch(this.httpService.handleError).then(function (res) {
                                var resp = res.json();
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.form2 = true;
                                        _this.fdata = true;
                                        if (resp.DataList[0] != null) {
                                            if (resp.DataList[0].ORDERING_TYPE == "01") {
                                                resp.DataList[0].ORDERING_TYPE = "Par";
                                            }
                                            else if (resp.DataList[0].ORDERING_TYPE == "02") {
                                                resp.DataList[0].ORDERING_TYPE = "Foq";
                                            }
                                            else if (resp.DataList[0].ORDERING_TYPE == "03") {
                                                resp.DataList[0].ORDERING_TYPE = "Min/Max";
                                            }
                                            else if (resp.DataList[0].ORDERING_TYPE == "04") {
                                                resp.DataList[0].ORDERING_TYPE = "Issue";
                                            }
                                            if (resp.DataList[0].LOCDTLSRPTYPE == AtParEnums_1.Repleshment_Type.Stock) {
                                                resp.DataList[0].REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Stock].toString();
                                            }
                                            else if (resp.DataList[0].LOCDTLSRPTYPE == AtParEnums_1.Repleshment_Type.Nonstock) {
                                                resp.DataList[0].REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Nonstock].toString();
                                            }
                                            else if (resp.DataList[0].LOCDTLSRPTYPE == AtParEnums_1.Repleshment_Type.Consignment) {
                                                resp.DataList[0].REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Consignment].toString();
                                            }
                                            else if (resp.DataList[0].LOCDTLSRPTYPE == AtParEnums_1.Repleshment_Type.Stockless) {
                                                resp.DataList[0].REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Stockless].toString();
                                            }
                                            if (resp.DataList[0].FILL_KILL_FLAG == "F") {
                                                resp.DataList[0].FILL_KILL_FLAG = "Fill";
                                            }
                                            else if (resp.DataList[0].FILL_KILL_FLAG == "K") {
                                                resp.DataList[0].FILL_KILL_FLAG = "Kill";
                                            }
                                            else {
                                                resp.DataList[0].FILL_KILL_FLAG = "";
                                            }
                                            if (resp.DataList[0].LOCDTLSUOI == "") {
                                                resp.DataList[0].LOCDTLSUOI = resp.DataList[0].ITMUOI;
                                            }
                                            else {
                                                resp.DataList[0].LOCDTLSUOI = resp.DataList[0].LOCDTLSUOI;
                                            }
                                            if (resp.DataList[0].OPTIMAL_QTY == null) {
                                                resp.DataList[0].OPTIMAL_QTY = 0;
                                            }
                                            else {
                                                resp.DataList[0].OPTIMAL_QTY = resp.DataList[0].OPTIMAL_QTY;
                                            }
                                            if (resp.DataList[0].FOQ_QTY == null) {
                                                resp.DataList[0].FOQ_QTY = 0;
                                            }
                                            else {
                                                resp.DataList[0].FOQ_QTY = resp.DataList[0].FOQ_QTY;
                                            }
                                            if (resp.DataList[0].MAX_QTY == null) {
                                                resp.DataList[0].MAX_QTY = 0;
                                            }
                                            else {
                                                resp.DataList[0].MAX_QTY = resp.DataList[0].MAX_QTY;
                                            }
                                            if (resp.DataList[0].LOCDTLSPARUOM != null) {
                                                resp.DataList[0].LOCDTLSPARUOM = resp.DataList[0].LOCDTLSPARUOM;
                                            }
                                            else {
                                                resp.DataList[0].LOCDTLSPARUOM = resp.DataList[0].ITMPARUOM;
                                            }
                                            if (resp.DataList[0].LOCDTLSCONVRATE != null) {
                                                if (resp.DataList[0].LOCDTLSCONVRATE > 0) {
                                                    resp.DataList[0].LOCDTLSCONVRATE = resp.DataList[0].LOCDTLSCONVRATE;
                                                }
                                            }
                                            _this.newParItem = new vm_item_par_locations_1.VM_ITEM_PAR_LOCATION();
                                            _this.newParItem.ITEM_ID = resp.DataList[0].ITEM_ID;
                                            _this.newParItem.SHORT_DESCR = resp.DataList[0].SHORT_DESCR;
                                            _this.newParItem.BIN_LOC = resp.DataList[0].BIN_LOC;
                                            _this.compold = resp.DataList[0].BIN_LOC;
                                            _this.newParItem.OPTIMAL_QTY = resp.DataList[0].OPTIMAL_QTY;
                                            _this.newParItem.UNIT_OF_PROCUREMENT = resp.DataList[0].LOCDTLSUOP;
                                            _this.newParItem.ORDERING_TYPE = resp.DataList[0].ORDERING_TYPE;
                                            _this.newParItem.MAX_QTY = resp.DataList[0].MAX_QTY;
                                            _this.newParItem.FOQ_QTY = resp.DataList[0].FOQ_QTY;
                                            _this.newParItem.PAR_UOM = resp.DataList[0].LOCDTLSPARUOM;
                                            if (_this.newParItem.PAR_UOM != "" && _this.newParItem.PAR_UOM != null) {
                                                if (resp.DataList[0].LOCDTLSPARCONVRATE != null) {
                                                    _this.newParItem.CONV_RATE_PAR_UOM = resp.DataList[0].LOCDTLSPARCONVRATE;
                                                }
                                            }
                                            _this.newParItem.CONVERSION_RATE = resp.DataList[0].LOCDTLSCONVRATE;
                                            _this.newParItem.COUNT_REQUIRED = resp.DataList[0].COUNT_REQUIRED;
                                            _this.newParItem.UNIT_OF_ISSUE = resp.DataList[0].LOCDTLSUOI;
                                            _this.newParItem.CHARGE_CODE = resp.DataList[0].LOCDTLCCODE;
                                            _this.newParItem.REPLENISHMENT_TYPE = resp.DataList[0].REPLENISHMENT_TYPE;
                                            _this.newParItem.FILL_KILL_FLAG = resp.DataList[0].FILL_KILL_FLAG;
                                            _this.newParItem.COUNT_ORDER = resp.DataList[0].COUNT_ORDER;
                                            _this.newParItem.COST_CENTER = resp.DataList[0].COST_CENTER;
                                            _this.newParItem.INV_BUSINESS_UNIT = resp.DataList[0].INV_BUSINESS_UNIT;
                                            _this.newParItem.USER_FIELD_1 = resp.DataList[0].USER_FIELD_1;
                                            _this.newParItem.REQUISITION_TYPE = resp.DataList[0].REQUISITION_TYPE;
                                            if (_this.newParItem.UNIT_OF_ISSUE == "") {
                                                _this.newParItem.UNIT_OF_ISSUE = resp.DataList[0].ITMUOI;
                                            }
                                            if (_this.newParItem.COUNT_REQUIRED == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                                                _this.newParItem.COUNT_REQUIRED_STATUS = false;
                                            }
                                            else if (_this.newParItem.COUNT_REQUIRED == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                                _this.newParItem.COUNT_REQUIRED_STATUS = true;
                                            }
                                            _this.newParItem.LOT_CONTROLLED = resp.DataList[0].LOCDTLSLOTCNTRL;
                                            if (_this.newParItem.LOT_CONTROLLED == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                                                _this.newParItem.LOT_CONTROLLED_STATUS = false;
                                            }
                                            else if (_this.newParItem.LOT_CONTROLLED == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                                _this.newParItem.LOT_CONTROLLED_STATUS = true;
                                            }
                                            _this.newParItem.SERIAL_CONTROLLED = resp.DataList[0].LOCDTLSSRCNTRL;
                                            if (_this.newParItem.SERIAL_CONTROLLED == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString()) {
                                                _this.newParItem.SERIAL_CONTROLLED_STATUS = false;
                                            }
                                            else if (_this.newParItem.SERIAL_CONTROLLED == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                                _this.newParItem.SERIAL_CONTROLLED_STATUS = true;
                                            }
                                            _this.newParItem.STATUS = resp.DataList[0].STATUS;
                                            //if (resp.DataList[0].STATUS)
                                            //if (resp.DataList[0].STATUS == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                            //    this.newParItem.ACTIVEFLAG = "true";
                                            //    this.newParItem.INACTIVEFLAG = "";
                                            //    this.newParItem.PENDINGFLAG = "";
                                            //}
                                            //else if (resp.DataList[0].STATUS == YesNo_Enum[YesNo_Enum.N].toString()) {
                                            //    this.newParItem.INACTIVEFLAG = "true";
                                            //    this.newParItem.ACTIVEFLAG = "";
                                            //    this.newParItem.PENDINGFLAG = "";
                                            //}
                                            //else {
                                            //    this.newParItem.PENDINGFLAG = "true";
                                            //    this.newParItem.INACTIVEFLAG = "";
                                            //    this.newParItem.ACTIVEFLAG = "";
                                            //}
                                            _this.spinnerService.stop();
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_14 = _a.sent();
                        this.clientErrorMsg(ex_14, "edititem");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.bindOrderingType = function () {
        this.ddlOrderingType = [];
        this.ddlOrderingType.push({ label: "Select One", value: "" });
        this.ddlOrderingType.push({ label: "Par", value: "Par" });
        this.ddlOrderingType.push({ label: "Foq", value: "Foq" });
        this.ddlOrderingType.push({ label: "Min/Max", value: "Min/Max" });
        this.ddlOrderingType.push({ label: "Issue", value: "Issue" });
    };
    AtparSetupParLocationsComponent.prototype.bindRequisitionType = function () {
        this.ddlRequisitionType = [];
        this.ddlRequisitionType.push({ label: "Select One", value: "" });
        this.ddlRequisitionType.push({ label: "Issue", value: "I" });
        this.ddlRequisitionType.push({ label: "Transfer", value: "T" });
    };
    AtparSetupParLocationsComponent.prototype.bindReplenishment = function () {
        this.ddlReplenishment = [];
        this.ddlReplenishment.push({ label: "Select One", value: "" });
        this.ddlReplenishment.push({ label: "Stock", value: "Stock" });
        this.ddlReplenishment.push({ label: "Nonstock", value: "Nonstock" });
        this.ddlReplenishment.push({ label: "Stockless", value: "Stockless" });
        this.ddlReplenishment.push({ label: "Consignment", value: "Consignment" });
    };
    AtparSetupParLocationsComponent.prototype.bindFillKillFlag = function () {
        this.ddlFillKillFlag = [];
        this.ddlFillKillFlag.push({ label: "Select One", value: "" });
        this.ddlFillKillFlag.push({ label: "Fill", value: "Fill" });
        this.ddlFillKillFlag.push({ label: "Kill", value: "Kill" });
    };
    AtparSetupParLocationsComponent.prototype.fillItemsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstFilteredItems = [];
                        this.lstFilteredItemsList = [];
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.AtparSetupParLocationServices.getItems("", this.orgID, this.appId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusMsgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstItems = data.DataList;
                                        _this.lstItems = linq_es5_1.asEnumerable(_this.lstItems).Where(function (x) { return x.STATUS === 0; }).Select(function (x) { return x; }).ToArray();
                                        _this.lstFilteredItemsList = _this.filterItems(query, _this.lstItems);
                                        for (var i = 0; i <= _this.lstFilteredItemsList.length - 1; i++) {
                                            _this.lstFilteredItems[i] = _this.lstFilteredItemsList[i].ITEM_ID + " - " + _this.lstFilteredItemsList[i].SHORT_DESCR;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                        }
                                        else {
                                            _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_15 = _a.sent();
                        this.clientErrorMsg(ex_15, "fillItemsAuto");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.filterItems = function (query, items) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < items.length; i++) {
                var itemValue = items[i];
                filtered.push(itemValue);
            }
        }
        else {
            if (query.length >= 0) {
                for (var i = 0; i < items.length; i++) {
                    var itemValue = items[i];
                    if (itemValue.ITEM_ID.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(itemValue);
                    }
                }
            }
        }
        return filtered;
    };
    //async changeStatus(statusType: string) {
    //    this.spinnerService.start();
    //    if (statusType == "Active") {
    //        this.newParItem.ACTIVEFLAG = "true";
    //        this.newParItem.INACTIVEFLAG = "false";
    //        this.newParItem.PENDINGFLAG = "false";
    //        this.newParItem.STATUS = "Y";
    //    }
    //    else if (statusType == "InActive") {
    //        this.newParItem.ACTIVEFLAG = "false";
    //        this.newParItem.INACTIVEFLAG = "true";
    //        this.newParItem.PENDINGFLAG = "false";
    //        this.newParItem.STATUS = "N";
    //    }
    //    else if (statusType == "Pending") {
    //        this.newParItem.ACTIVEFLAG = "false";
    //        this.newParItem.INACTIVEFLAG = "false";
    //        this.newParItem.PENDINGFLAG = "true";
    //        this.newParItem.STATUS = "";
    //    }
    //    this.spinnerService.stop();
    //}
    AtparSetupParLocationsComponent.prototype.savedata = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var splitItemId, ex_16, ex_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Add / Edit Item(s)';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        if (this.newParItem.ORDERING_TYPE == null || (this.newParItem.ORDERING_TYPE == undefined) || this.newParItem.ORDERING_TYPE === "" || this.newParItem.ORDERING_TYPE === "Select One") {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Select Ordering Type" });
                            return [2 /*return*/];
                        }
                        if (this.newParItem.ORDERING_TYPE === "Foq") {
                            if (this.newParItem.FOQ_QTY == undefined || this.newParItem.FOQ_QTY == null || this.newParItem.FOQ_QTY === "") {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Foq" });
                                return [2 /*return*/];
                            }
                            else {
                                this.newParItem.FOQ_QTY = this.newParItem.FOQ_QTY;
                            }
                        }
                        if (this.newParItem.ORDERING_TYPE === "Min/Max") {
                            if (this.newParItem.MAX_QTY == undefined || this.newParItem.MAX_QTY == null || this.newParItem.MAX_QTY === "") {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Max Qty" });
                                return [2 /*return*/];
                            }
                            else {
                                this.newParItem.MAX_QTY = this.newParItem.MAX_QTY;
                            }
                        }
                        if (this.newParItem.REPLENISHMENT_TYPE == null || this.newParItem.REPLENISHMENT_TYPE == undefined || this.newParItem.REPLENISHMENT_TYPE === "" || this.newParItem.REPLENISHMENT_TYPE === "Select One") {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Select Replenishment Type" });
                            return [2 /*return*/];
                        }
                        if (this.newParItem.REQUISITION_TYPE == null || this.newParItem.REQUISITION_TYPE == undefined || this.newParItem.REQUISITION_TYPE === "" || this.newParItem.REQUISITION_TYPE === "Select One") {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Select Requisition Type" });
                            return [2 /*return*/];
                        }
                        if (!(this.newParItem.COST_CENTER == null || this.newParItem.COST_CENTER == undefined || this.newParItem.COST_CENTER === "" || this.newParItem.COST_CENTER === "Select One")) return [3 /*break*/, 1];
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Select Cost Center" });
                        return [2 /*return*/];
                    case 1:
                        if (this.newParItem.COUNT_REQUIRED_STATUS == true) {
                            this.newParItem.COUNT_REQUIRED = "Y";
                        }
                        else {
                            this.newParItem.COUNT_REQUIRED = "N";
                        }
                        if (this.newParItem.LOT_CONTROLLED_STATUS == true) {
                            this.newParItem.LOT_CONTROLLED = "Y";
                        }
                        else {
                            this.newParItem.LOT_CONTROLLED = "N";
                        }
                        if (this.newParItem.SERIAL_CONTROLLED_STATUS == true) {
                            this.newParItem.SERIAL_CONTROLLED = "Y";
                        }
                        else {
                            this.newParItem.SERIAL_CONTROLLED = "N";
                        }
                        if (this.newParItem.FILL_KILL_FLAG == "Fill") {
                            this.newParItem.FILL_KILL_FLAG = "F";
                        }
                        else if (this.newParItem.FILL_KILL_FLAG == "Kill") {
                            this.newParItem.FILL_KILL_FLAG = "K";
                        }
                        else {
                            this.newParItem.FILL_KILL_FLAG = "";
                        }
                        if (this.newParItem.REPLENISHMENT_TYPE == AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Stock].toString()) {
                            this.newParItem.REPLENISHMENT_TYPE = "1";
                        }
                        else if (this.newParItem.REPLENISHMENT_TYPE == AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Nonstock].toString()) {
                            this.newParItem.REPLENISHMENT_TYPE = "2";
                        }
                        else if (this.newParItem.REPLENISHMENT_TYPE == AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Stockless].toString()) {
                            this.newParItem.REPLENISHMENT_TYPE = "3";
                        }
                        else if (this.newParItem.REPLENISHMENT_TYPE == AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Consignment].toString()) {
                            this.newParItem.REPLENISHMENT_TYPE = "4";
                        }
                        if (this.newParItem.OPTIMAL_QTY > 0) {
                            this.newParItem.OPTIMAL_QTY = this.newParItem.OPTIMAL_QTY;
                        }
                        else {
                            this.newParItem.OPTIMAL_QTY = 0;
                        }
                        if (this.newParItem.COUNT_ORDER > 0) {
                            this.newParItem.COUNT_ORDER = this.newParItem.COUNT_ORDER;
                        }
                        else {
                            this.newParItem.COUNT_ORDER = 0;
                        }
                        if (this.selectedItem != null && this.selectedItem != "") {
                            if (this.selectedItem.indexOf(" ") != -1) {
                                splitItemId = void 0;
                                splitItemId = this.selectedItem.trim().split(" ");
                                this.newParItem.ITEM_ID = splitItemId[0];
                            }
                            else {
                                this.newParItem.ITEM_ID = this.selectedItem.trim();
                            }
                        }
                        if (this.newParItem.MAX_QTY == undefined) {
                            this.newParItem.MAX_QTY = "";
                        }
                        if (this.newParItem.FOQ_QTY == undefined) {
                            this.newParItem.FOQ_QTY = "";
                        }
                        if (this.newParItem.CONV_RATE_PAR_UOM == undefined) {
                            this.newParItem.CONV_RATE_PAR_UOM = "";
                        }
                        if (this.newParItem.PAR_UOM == undefined) {
                            this.newParItem.PAR_UOM = "";
                        }
                        if (this.newParItem.PAR_UOM != null && this.newParItem.PAR_UOM != "") {
                            if (this.newParItem.CONV_RATE_PAR_UOM == null || this.newParItem.CONV_RATE_PAR_UOM == "") {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Par Conversion Rate" });
                                return [2 /*return*/];
                            }
                        }
                        else if (this.newParItem.CONV_RATE_PAR_UOM != null && this.newParItem.CONV_RATE_PAR_UOM != "") {
                            if (this.newParItem.PAR_UOM == null || this.newParItem.PAR_UOM == "") {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Enter Par UOM" });
                                return [2 /*return*/];
                            }
                        }
                        else if (this.newParItem.PAR_UOM == null && this.newParItem.PAR_UOM == "") {
                            if (this.newParItem.CONV_RATE_PAR_UOM == null) {
                                this.newParItem.CONV_RATE_PAR_UOM = 1;
                            }
                        }
                        //if (this.newParItem.ACTIVEFLAG == "true") {
                        //    this.newParItem.STATUS = "Y";
                        //}
                        //else if (this.newParItem.INACTIVEFLAG == "true") {
                        //    this.newParItem.STATUS = "N";
                        //}
                        //else if (this.newParItem.PENDINGFLAG == "true") {
                        //    this.newParItem.STATUS = "";
                        //}
                        if (this.newParItem.CHARGE_CODE == null) {
                            this.newParItem.CHARGE_CODE = "";
                        }
                        if (this.newParItem.USER_FIELD_1 == null) {
                            this.newParItem.USER_FIELD_1 = "";
                        }
                        if (this.newParItem.ORDERING_TYPE == "Par") {
                            this.newParItem.ORDERING_TYPE = "01";
                        }
                        else if (this.newParItem.ORDERING_TYPE == "Foq") {
                            this.newParItem.ORDERING_TYPE = "02";
                        }
                        else if (this.newParItem.ORDERING_TYPE == "Min/Max") {
                            this.newParItem.ORDERING_TYPE = "03";
                        }
                        else if (this.newParItem.ORDERING_TYPE == "Issue") {
                            this.newParItem.ORDERING_TYPE = "04";
                        }
                        return [4 /*yield*/, this.MatchAndInsertOrUpdate(this.newParItem.ITEM_ID, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.newParItem.LOT_CONTROLLED, this.newParItem.SERIAL_CONTROLLED, this.deviceTokenEntry)];
                    case 2:
                        _a.sent();
                        if (this.pUOI = 1) {
                            this.strUOI = "";
                        }
                        else {
                            this.strUOI = this.newParItem.UNIT_OF_ISSUE;
                        }
                        if (this.pUOP = 1) {
                            this.strUOP = "";
                        }
                        else {
                            this.strUOP = this.newParItem.UNIT_OF_PROCUREMENT.trim();
                        }
                        if (this.pChgCode = 1) {
                            this.strChgCode = "";
                        }
                        else {
                            this.strChgCode = this.newParItem.CHARGE_CODE;
                        }
                        if (this.pConvRate = 1) {
                            this.strConvRate = "";
                        }
                        else {
                            this.strConvRate = this.newParItem.CONVERSION_RATE.toString();
                        }
                        if (this.pUOPar = 1) {
                            this.parUom = "";
                        }
                        else {
                            this.parUom = this.newParItem.PAR_UOM;
                        }
                        if (this.pConvRTPar = 1) {
                            this.convRtPar = "0";
                        }
                        if (this.pSrCntrl = 1) {
                            this.strSrCntrl = "";
                        }
                        else {
                            this.strSrCntrl = this.newParItem.SERIAL_CONTROLLED;
                        }
                        if (this.pLotCntrl = 1) {
                            this.strLotCntrl = "";
                        }
                        else {
                            this.strLotCntrl = this.newParItem.LOT_CONTROLLED;
                        }
                        if (this.pReplType = 1) {
                            this.strReplType = "0";
                        }
                        else {
                            this.strReplType = this.newParItem.REPLENISHMENT_TYPE;
                        }
                        if (this.newParItem.COST_CENTER == "Select One") {
                            this.strCCCode = "";
                        }
                        else {
                            this.strCCCode = this.newParItem.COST_CENTER;
                        }
                        if (!(this.btnItemTitle == "Update")) return [3 /*break*/, 7];
                        if (this.strMaxAllowQty != "") {
                            if (this.newParItem.OPTIMAL_QTY > +this.strMaxAllowQty) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity" });
                                document.getElementById("MaxQty").focus();
                                return [2 /*return*/];
                            }
                        }
                        if (this.newParItem.MAX_QTY != null) {
                            if (this.newParItem.MAX_QTY > +this.strMaxAllowQty) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity" });
                                document.getElementById("MaxQty").focus();
                                return [2 /*return*/];
                            }
                        }
                        if (this.newParItem.FOQ_QTY != null) {
                            if (this.newParItem.FOQ_QTY > +this.strMaxAllowQty) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity" });
                                document.getElementById("FoqQty").focus();
                                return [2 /*return*/];
                            }
                        }
                        this.insertParAuditItem.BUNIT = this.orgID;
                        this.insertParAuditItem.CRTID = this.locID;
                        this.insertParAuditItem.ITEMID = this.newParItem.ITEM_ID;
                        this.insertParAuditItem.COMPARTMENT = this.newParItem.BIN_LOC;
                        this.insertParAuditItem.PARQTY = this.newParItem.OPTIMAL_QTY.toString();
                        this.insertParAuditItem.USERID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        this.insertParAuditItem.UOM = this.newParItem.UNIT_OF_PROCUREMENT.trim();
                        this.insertParAuditItem.NOPQTY = this.newParItem.OPTIMAL_QTY.toString();
                        this.dsInsertParAudit.push(this.insertParAuditItem);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.AtparSetupParLocationServices.updateLocationItems(this.locID, this.orgID, this.newParItem.BIN_LOC, this.compold, this.newParItem.ITEM_ID, this.newParItem.OPTIMAL_QTY, this.newParItem.COUNT_REQUIRED, this.newParItem.COUNT_ORDER, this.newParItem.REPLENISHMENT_TYPE, this.newParItem.FILL_KILL_FLAG, this.newParItem.ORDERING_TYPE, this.newParItem.FOQ_QTY, this.newParItem.MAX_QTY, this.newParItem.LOT_CONTROLLED, this.newParItem.SERIAL_CONTROLLED, this.newParItem.COST_CENTER, this.newParItem.UNIT_OF_ISSUE, this.newParItem.CONVERSION_RATE, this.newParItem.USER_FIELD_1, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.newParItem.STATUS, this.newParItem.INV_BUSINESS_UNIT, this.newParItem.REQUISITION_TYPE, this.newParItem.UNIT_OF_PROCUREMENT, this.newParItem.PAR_UOM, this.newParItem.CONV_RATE_PAR_UOM, this.dsInsertParAudit, this.newParItem.CHARGE_CODE).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.statusMsgs = [];
                                        var statusmsg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Item").replace("2%", _this.newParItem.ITEM_ID);
                                        _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusmsg });
                                        document.getElementById('Compartment').focus();
                                        //this.form2 = false;
                                        //this.fdata = false;
                                        //this.newParItem = new VM_ITEM_PAR_LOCATION();     
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        if (data.StatusCode == 111701) {
                                            data.StatusMessage = data.StatusMessage.replace("1%", _this.newParItem.ITEM_ID).replace("2%", _this.newParItem.BIN_LOC);
                                            _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        else {
                                            _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
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
                                if (_this.newParItem.ORDERING_TYPE == "01") {
                                    _this.newParItem.ORDERING_TYPE = "Par";
                                }
                                else if (_this.newParItem.ORDERING_TYPE == "02") {
                                    _this.newParItem.ORDERING_TYPE = "Foq";
                                }
                                else if (_this.newParItem.ORDERING_TYPE == "03") {
                                    _this.newParItem.ORDERING_TYPE = "Min/Max";
                                }
                                else if (_this.newParItem.ORDERING_TYPE == "04") {
                                    _this.newParItem.ORDERING_TYPE = "Issue";
                                }
                                if (_this.newParItem.REPLENISHMENT_TYPE == "1") {
                                    _this.newParItem.REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Stock].toString();
                                }
                                else if (_this.newParItem.REPLENISHMENT_TYPE == "2") {
                                    _this.newParItem.REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Nonstock].toString();
                                }
                                else if (_this.newParItem.REPLENISHMENT_TYPE == "3") {
                                    _this.newParItem.REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Stockless].toString();
                                }
                                else if (_this.newParItem.REPLENISHMENT_TYPE == "4") {
                                    _this.newParItem.REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Consignment].toString();
                                }
                                if (_this.newParItem.FILL_KILL_FLAG == "F") {
                                    _this.newParItem.FILL_KILL_FLAG = "Fill";
                                }
                                else if (_this.newParItem.FILL_KILL_FLAG == "K") {
                                    _this.newParItem.FILL_KILL_FLAG = "Kill";
                                }
                                _this.atParConstant.scrollToTop();
                            })];
                    case 4:
                        _a.sent();
                        //this.BindDataGrid(this.locationdata);
                        this.spinnerService.stop();
                        return [3 /*break*/, 6];
                    case 5:
                        ex_16 = _a.sent();
                        this.clientErrorMsg(ex_16, "savedata");
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 11];
                    case 7:
                        if (!(this.btnItemTitle == "Save")) return [3 /*break*/, 11];
                        if (this.strMaxAllowQty != "") {
                            if (this.newParItem.OPTIMAL_QTY > +this.strMaxAllowQty) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity" });
                                document.getElementById("MaxQty").focus();
                                return [2 /*return*/];
                            }
                        }
                        if (this.newParItem.MAX_QTY != null) {
                            if (this.newParItem.MAX_QTY > +this.strMaxAllowQty) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity" });
                                document.getElementById("MaxQty").focus();
                                return [2 /*return*/];
                            }
                        }
                        if (this.newParItem.FOQ_QTY != null) {
                            if (this.newParItem.FOQ_QTY > +this.strMaxAllowQty) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity" });
                                document.getElementById("FoqQty").focus();
                                return [2 /*return*/];
                            }
                        }
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 10, , 11]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.AtparSetupParLocationServices.addItems(this.locID, this.orgID, this.newParItem.BIN_LOC, this.newParItem.ITEM_ID, this.newParItem.OPTIMAL_QTY, this.newParItem.COUNT_REQUIRED, this.newParItem.COUNT_ORDER, this.newParItem.REPLENISHMENT_TYPE, this.newParItem.FILL_KILL_FLAG, this.newParItem.ORDERING_TYPE, this.newParItem.FOQ_QTY, this.newParItem.MAX_QTY, this.newParItem.LOT_CONTROLLED, this.newParItem.SERIAL_CONTROLLED, this.newParItem.COST_CENTER, this.newParItem.UNIT_OF_ISSUE, this.newParItem.CONVERSION_RATE, this.newParItem.USER_FIELD_1, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.newParItem.STATUS, this.newParItem.INV_BUSINESS_UNIT, this.newParItem.REQUISITION_TYPE, this.newParItem.UNIT_OF_PROCUREMENT, this.newParItem.PAR_UOM, this.newParItem.CONV_RATE_PAR_UOM, this.newParItem.CHARGE_CODE).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.statusMsgs = [];
                                        var statusmsg = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Item").replace("2%", _this.newParItem.ITEM_ID);
                                        _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusmsg });
                                        //this.form2 = false;
                                        _this.fdata = false;
                                        _this.selectedItem = "";
                                        document.getElementById('item').focus();
                                        _this.newParItem = new vm_item_par_locations_1.VM_ITEM_PAR_LOCATION();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION) {
                                            var statusmsg = "Item" + " " + _this.newParItem.ITEM_ID + "  already exists with Location" + " " + _this.locID;
                                            _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: statusmsg });
                                        }
                                        else {
                                            _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        if (_this.newParItem.ORDERING_TYPE == "01") {
                                            _this.newParItem.ORDERING_TYPE = "Par";
                                        }
                                        else if (_this.newParItem.ORDERING_TYPE == "02") {
                                            _this.newParItem.ORDERING_TYPE = "Foq";
                                        }
                                        else if (_this.newParItem.ORDERING_TYPE == "03") {
                                            _this.newParItem.ORDERING_TYPE = "Min/Max";
                                        }
                                        else if (_this.newParItem.ORDERING_TYPE == "04") {
                                            _this.newParItem.ORDERING_TYPE = "Issue";
                                        }
                                        if (_this.newParItem.REPLENISHMENT_TYPE == "1") {
                                            _this.newParItem.REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Stock].toString();
                                        }
                                        else if (_this.newParItem.REPLENISHMENT_TYPE == "2") {
                                            _this.newParItem.REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Nonstock].toString();
                                        }
                                        else if (_this.newParItem.REPLENISHMENT_TYPE == "3") {
                                            _this.newParItem.REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Stockless].toString();
                                        }
                                        else if (_this.newParItem.REPLENISHMENT_TYPE == "4") {
                                            _this.newParItem.REPLENISHMENT_TYPE = AtParEnums_1.Repleshment_Type[AtParEnums_1.Repleshment_Type.Consignment].toString();
                                        }
                                        if (_this.newParItem.FILL_KILL_FLAG == "F") {
                                            _this.newParItem.FILL_KILL_FLAG = "Fill";
                                        }
                                        else if (_this.newParItem.FILL_KILL_FLAG == "K") {
                                            _this.newParItem.FILL_KILL_FLAG = "Kill";
                                        }
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
                                _this.atParConstant.scrollToTop();
                            })];
                    case 9:
                        _a.sent();
                        //this.BindDataGrid(location);
                        this.spinnerService.stop();
                        return [3 /*break*/, 11];
                    case 10:
                        ex_17 = _a.sent();
                        this.clientErrorMsg(ex_17, "savedata");
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.MatchAndInsertOrUpdate = function (ITEM_ID, OrgGrpID, LOT_CONTROLLED, SERIAL_CONTROLLED, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.AtparSetupParLocationServices.getItemDataToAddOrUpdate(ITEM_ID, OrgGrpID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataList.length > 0) {
                                            for (var i = 0; i <= data.DataList.length - 1; i++) {
                                                _this.pUOI = linq_es5_1.asEnumerable(data.DataList).Where(function (x) { return x.UNIT_OF_ISSUE == _this.newParItem.UNIT_OF_ISSUE; }).ToArray().length;
                                                _this.pConvRate = linq_es5_1.asEnumerable(data.DataList).Where(function (x) { return x.CONV_FACTOR == _this.newParItem.CONVERSION_RATE; }).ToArray().length;
                                                _this.pReplType = linq_es5_1.asEnumerable(data.DataList).Where(function (x) { return x.REPLENISHMENT_TYPE == _this.newParItem.REPLENISHMENT_TYPE; }).ToArray().length;
                                                _this.pSrCntrl = linq_es5_1.asEnumerable(data.DataList).Where(function (x) { return x.SERIAL_CONTROLLED == SERIAL_CONTROLLED; }).ToArray().length;
                                                _this.pLotCntrl = linq_es5_1.asEnumerable(data.DataList).Where(function (x) { return x.LOT_CONTROLLED == LOT_CONTROLLED; }).ToArray().length;
                                                _this.pChgCode = linq_es5_1.asEnumerable(data.DataList).Where(function (x) { return x.CHARGE_CODE == _this.newParItem.CHARGE_CODE; }).ToArray().length;
                                                _this.pUOP = linq_es5_1.asEnumerable(data.DataList).Where(function (x) { return x.UNIT_OF_PROCUREMENT == _this.newParItem.UNIT_OF_PROCUREMENT; }).ToArray().length;
                                                _this.pUOPar = linq_es5_1.asEnumerable(data.DataList).Where(function (x) { return x.PAR_UOM == _this.newParItem.PAR_UOM; }).ToArray().length;
                                                if (_this.newParItem.CONV_RATE_PAR_UOM != null) {
                                                    _this.pConvRTPar = linq_es5_1.asEnumerable(data.DataList).Where(function (x) { return x.CONV_RATE_PAR_UOM == _this.newParItem.CONV_RATE_PAR_UOM; }).ToArray().length;
                                                }
                                                else {
                                                    _this.pConvRTPar = 0;
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                            _this.statusMsgs = [];
                                        }
                                        else {
                                            _this.statusMsgs = [];
                                            _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
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
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_18 = _a.sent();
                        this.clientErrorMsg(ex_18, "MatchAndInsertOrUpdate");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AtparSetupParLocationsComponent.prototype.filterStatus = function (value, field, mode) {
        if (value === "All") {
            this.dgrd2Locs = this.tempdgrd2Locs;
        }
        else {
            this.dgrd2Locs = this.tempdgrd2Locs;
            this.dgrd2Locs = linq_es5_1.asEnumerable(this.tempdgrd2Locs).Where(function (x) { return x.STATUS === value; }).Select(function (x) { return x; }).ToArray();
        }
        var elmnt = this.document.getElementById('scrollcontainer');
        elmnt.scrollLeft = 0;
    };
    AtparSetupParLocationsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.statusMsgs = null;
        this.recordsPerPageSize = null;
        this.newItem = null;
        this.ddlCart = null;
        this.ddlLocType = null;
        this.ddlShipToId = null;
        this.getOrgIdsLst = null;
        this.ddlOrgId = null;
        this.getLocIdsLst = null;
        this.ddlLocIds = null;
        this.dgrdLocs = null;
        this.dgrd2Locs = null;
        this.tempdgrd2Locs = null;
        this.mode = null;
        this.buttonTitle = null;
        this.getCostCentersLst = null;
        this.ddlCostCenterId = null;
        this.getShipToIDsLst = null;
        this.strMaxAllowQty = null;
        this.searchItem = null;
        this.ddlOrderingType = null;
        this.ddlRequisitionType = null;
        this.ddlReplenishment = null;
        this.ddlFillKillFlag = null;
        this.selectedItem = null;
        this.lstFilteredItems = null;
        this.lstItems = null;
        this.orgID = null;
        this.locID = null;
        this.lstFilteredItemsList = null;
        this.btnItemTitle = null;
        this.dgrd2Locs = null;
        this.splitsearchItem = null;
        this.newParItem = null;
        this.ddlSelectedLocID = null;
        this.compold = null;
        this.pUOI = null;
        this.pConvRate = null;
        ;
        this.pReplType = null;
        ;
        this.pSrCntrl = null;
        this.pLotCntrl = null;
        ;
        this.pChgCode = null;
        this.pUOP = null;
        this.pUOPar = null;
        this.pConvRTPar = null;
        this.strUOI = null;
        this.strUOP = null;
        this.strChgCode = null;
        this.strConvRate = null;
        this.parUom = null;
        this.convRtPar = null;
        this.strSrCntrl = null;
        this.strLotCntrl = null;
        this.strReplType = null;
        this.strCCCode = null;
        this.locationdata = null;
        this.bindSymbal = null;
        this.statusList = null;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], AtparSetupParLocationsComponent.prototype, "dataTableComponent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AtparSetupParLocationsComponent.prototype, "appId", void 0);
    AtparSetupParLocationsComponent = __decorate([
        core_1.Component({
            selector: 'atpar-setup-par-locations',
            templateUrl: 'atpar-setup-par-locations.component.html',
            providers: [datatableservice_1.datatableservice, AtParConstants_1.AtParConstants, atpar_common_service_1.AtParCommonService, atpar_setup_par_locations_service_1.AtparSetupParLocationServices],
        }),
        __param(5, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService, Object, atpar_setup_par_locations_service_1.AtparSetupParLocationServices])
    ], AtparSetupParLocationsComponent);
    return AtparSetupParLocationsComponent;
}());
exports.AtparSetupParLocationsComponent = AtparSetupParLocationsComponent;
//# sourceMappingURL=atpar-setup-par-locations.component.js.map