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
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParEnums_3 = require("./../Shared/AtParEnums");
//import { CustomValidators } from '../common/textbox/custom-validators';
//import { CustomTextBoxModule } from '../common/textbox/CustomTextBoxModule';
var RM_ORG_UNITS_1 = require("../../app/Entities/RM_ORG_UNITS");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var atpar_manage_orgid_services_1 = require("../../app/Init/atpar-manage-orgid.services");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var ManageOrgIdComponent = (function () {
    function ManageOrgIdComponent(manageOrgIdServices, route, atParSharedDataService, atParConstant, spinnerService, router) {
        this.manageOrgIdServices = manageOrgIdServices;
        this.route = route;
        this.atParSharedDataService = atParSharedDataService;
        this.atParConstant = atParConstant;
        this.spinnerService = spinnerService;
        this.router = router;
        this.msgs = [];
        this.orgStatus = "";
        this.orgId = "";
        this.orgName = "";
        this.details = "";
        this.deviceTokenEntry = [];
        this.userId = "";
        this.isVisible = false;
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    ManageOrgIdComponent.prototype.ngOnInit = function () {
        this.mainlstGridData = new Array();
        if (this.atParSharedDataService.storage)
            this.mode = this.atParSharedDataService.storage.mode;
        if (this.mode != undefined && this.mode == (AtParEnums_2.ModeEnum.List).toString()) {
            this.bindGrid();
        }
        if (sessionStorage.getItem("RecordsPerPage") == null && sessionStorage.getItem("RecordsPerPage") == undefined) {
            this.pazeSize = 5;
        }
        else {
            this.pazeSize = +sessionStorage.getItem("RecordsPerPage");
        }
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.database = [];
        this.database.push({ label: 'ALL', value: '' });
        this.database.push({ label: 'Active', value: true });
        this.database.push({ label: 'InActive', value: false });
        this.orgTypes = [];
        this.orgTypes.push({ label: 'ALL', value: 'ALL' });
        this.orgTypes.push({ label: 'Purchasing', value: 'Purchasing' });
        this.orgTypes.push({ label: 'Inventory', value: 'Inventory' });
        this.userId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
    };
    ManageOrgIdComponent.prototype.bindGrid = function () {
        var _this = this;
        try {
            this.mainlstGridData = [];
            this.orgsDatas = [];
            this.msgs = [];
            this.statusType = "";
            this.selectedOgType = "";
            this.isVisible = false;
            this.spinnerService.start();
            this.manageOrgIdServices.getOrgIds(this.userId, this.orgId, this.orgName, this.orgStatus).forEach(function (resp) {
                _this.spinnerService.stop();
                switch (resp.StatType) {
                    case AtParEnums_3.StatusType.Success: {
                        var gridData = resp.DataList;
                        if (gridData.length >= 1) {
                            _this.orgsDatas = gridData;
                            for (var _i = 0, _a = _this.orgsDatas; _i < _a.length; _i++) {
                                var data = _a[_i];
                                data.STATUS_VALUE = "";
                                if (data.STATUS)
                                    data.STATUS_VALUE = "Active";
                                else
                                    data.STATUS_VALUE = "InActive";
                                data.STATUS_VALUE;
                                if (data.ORG_TYPE == 'P')
                                    data.ORG_TYPE_DISPLAY = "Purchasing";
                                if (data.ORG_TYPE == 'I')
                                    data.ORG_TYPE_DISPLAY = "Inventory";
                            }
                            for (var x = 0; x < _this.orgsDatas.length; x++) {
                                var mangeOrgIDDetails = new RM_ORG_UNITS_1.RM_ORG_UNITS();
                                mangeOrgIDDetails.ORG_ID = _this.orgsDatas[x].ORG_ID;
                                mangeOrgIDDetails.ORG_NAME = _this.orgsDatas[x].ORG_NAME;
                                mangeOrgIDDetails.ORG_TYPE_DISPLAY = _this.orgsDatas[x].ORG_TYPE_DISPLAY;
                                mangeOrgIDDetails.ORG_TYPE = _this.orgsDatas[x].ORG_TYPE;
                                mangeOrgIDDetails.STATUS = _this.orgsDatas[x].STATUS;
                                mangeOrgIDDetails.STATUS_VALUE = _this.orgsDatas[x].STATUS_VALUE;
                                mangeOrgIDDetails.MASTER_GROUP_ID = _this.orgsDatas[x].MASTER_GROUP_ID;
                                _this.mainlstGridData.push(mangeOrgIDDetails);
                            }
                            _this.statusCode = resp.StatusCode;
                            _this.isVisible = true;
                        }
                        else {
                            _this.isVisible = false;
                            _this.msgs = [];
                            _this.spinnerService.stop();
                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No data Found" });
                            break;
                        }
                        break;
                    }
                    case AtParEnums_3.StatusType.Error: {
                        _this.msgs = [];
                        _this.spinnerService.stop();
                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    }
                    case AtParEnums_3.StatusType.Warn: {
                        _this.msgs = [];
                        _this.spinnerService.stop();
                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        break;
                    }
                    case AtParEnums_3.StatusType.Custom: {
                        _this.msgs = [];
                        _this.spinnerService.stop();
                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                        break;
                    }
                }
                _this.spinnerService.stop();
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindGrid");
        }
    };
    ManageOrgIdComponent.prototype.changeStatus = function (rmOrgUnits) {
        var _this = this;
        this.msgs = [];
        this.spinnerService.start();
        rmOrgUnits.STATUS = !rmOrgUnits.STATUS;
        try {
            this.manageOrgIdServices.updateOrgIDStatus(this.userId, rmOrgUnits.ORG_ID, rmOrgUnits.ORG_TYPE, rmOrgUnits.STATUS).forEach(function (resp) {
                _this.msgs = [];
                switch (resp.StatType) {
                    case AtParEnums_3.StatusType.Success:
                        {
                            var msg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Org").replace("2%", rmOrgUnits.ORG_ID + ' Status');
                            _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                            var filterData = [];
                            _this.orgsDatas = [];
                            var matchedrecord = _this.mainlstGridData.filter(function (x) { return x.ORG_ID == rmOrgUnits.ORG_ID && x.ORG_TYPE == rmOrgUnits.ORG_TYPE; });
                            matchedrecord[0].STATUS = rmOrgUnits.STATUS;
                            if (_this.statusType.toString() == "true") {
                                filterData = _this.mainlstGridData.filter(function (x) { return x.STATUS == true; });
                            }
                            else if (_this.statusType.toString() == "false") {
                                filterData = _this.mainlstGridData.filter(function (x) { return x.STATUS == false; });
                            }
                            else {
                                filterData = _this.mainlstGridData;
                            }
                            if (filterData != null) {
                                for (var x = 0; x < filterData.length; x++) {
                                    var mangeOrgIDDetails = new RM_ORG_UNITS_1.RM_ORG_UNITS();
                                    mangeOrgIDDetails.ORG_ID = filterData[x].ORG_ID;
                                    mangeOrgIDDetails.ORG_NAME = filterData[x].ORG_NAME;
                                    mangeOrgIDDetails.ORG_TYPE_DISPLAY = filterData[x].ORG_TYPE_DISPLAY;
                                    mangeOrgIDDetails.ORG_TYPE = filterData[x].ORG_TYPE;
                                    mangeOrgIDDetails.STATUS = filterData[x].STATUS;
                                    mangeOrgIDDetails.STATUS_VALUE = filterData[x].STATUS_VALUE;
                                    mangeOrgIDDetails.MASTER_GROUP_ID = filterData[x].MASTER_GROUP_ID;
                                    _this.orgsDatas.push(mangeOrgIDDetails);
                                }
                            }
                            break;
                        }
                    case AtParEnums_3.StatusType.Warn:
                        {
                            _this.statusMesssage = resp.StatusMessage;
                            rmOrgUnits.STATUS = !rmOrgUnits.STATUS;
                            var s = _this.statusMesssage.includes("(OrgID)");
                            if (s == true) {
                                _this.statusMesssage = _this.statusMesssage.replace('OrgID', 'Org');
                                _this.statusMesssage = _this.statusMesssage.replace('(OrgID)', rmOrgUnits.ORG_ID);
                            }
                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: _this.statusMesssage });
                            break;
                        }
                    case AtParEnums_3.StatusType.Error:
                        {
                            _this.statusMesssage = resp.StatusMessage;
                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            break;
                        }
                    case AtParEnums_3.StatusType.Custom:
                        {
                            _this.statusMesssage = resp.StatusMessage;
                            _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                            break;
                        }
                }
                _this.spinnerService.stop();
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "changeStatus");
        }
    };
    ManageOrgIdComponent.prototype.dataFilter = function (evtdata, filed, filterMatchMode) {
        return __awaiter(this, void 0, void 0, function () {
            var filterData, x, mangeOrgIDDetails;
            return __generator(this, function (_a) {
                try {
                    filterData = void 0;
                    this.orgsDatas = [];
                    if (this.statusType.toString() == "true") {
                        if (this.selectedOgType.toString() == "Purchasing") {
                            filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == true && x.ORG_TYPE_DISPLAY == "Purchasing"; });
                        }
                        else if (this.selectedOgType.toString() == "Inventory") {
                            filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == true && x.ORG_TYPE_DISPLAY == "Inventory"; });
                        }
                        else {
                            filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == true; });
                        }
                    }
                    else if (this.statusType.toString() == "false") {
                        if (this.selectedOgType.toString() == "Purchasing") {
                            filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == false && x.ORG_TYPE_DISPLAY == "Purchasing"; });
                        }
                        else if (this.selectedOgType.toString() == "Inventory") {
                            filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == false && x.ORG_TYPE_DISPLAY == "Inventory"; });
                        }
                        else {
                            filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == false; });
                        }
                    }
                    else {
                        if (this.selectedOgType.toString() == "Purchasing") {
                            filterData = this.mainlstGridData.filter(function (x) { return x.ORG_TYPE_DISPLAY == "Purchasing"; });
                        }
                        else if (this.selectedOgType.toString() == "Inventory") {
                            filterData = this.mainlstGridData.filter(function (x) { return x.ORG_TYPE_DISPLAY == "Inventory"; });
                        }
                        else {
                            filterData = this.mainlstGridData;
                        }
                    }
                    if (filterData != null) {
                        for (x = 0; x < filterData.length; x++) {
                            mangeOrgIDDetails = new RM_ORG_UNITS_1.RM_ORG_UNITS();
                            mangeOrgIDDetails.ORG_ID = filterData[x].ORG_ID;
                            mangeOrgIDDetails.ORG_NAME = filterData[x].ORG_NAME;
                            mangeOrgIDDetails.ORG_TYPE_DISPLAY = filterData[x].ORG_TYPE_DISPLAY;
                            mangeOrgIDDetails.ORG_TYPE = filterData[x].ORG_TYPE;
                            mangeOrgIDDetails.STATUS = filterData[x].STATUS;
                            mangeOrgIDDetails.STATUS_VALUE = filterData[x].STATUS_VALUE;
                            mangeOrgIDDetails.MASTER_GROUP_ID = filterData[x].MASTER_GROUP_ID;
                            this.orgsDatas.push(mangeOrgIDDetails);
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "dataFilter");
                }
                return [2 /*return*/];
            });
        });
    };
    ManageOrgIdComponent.prototype.orgTypeDataFilter = function (evtdata) {
        return __awaiter(this, void 0, void 0, function () {
            var filterData, x, mangeOrgIDDetails;
            return __generator(this, function (_a) {
                this.orgsDatas = [];
                if (this.selectedOgType.toString() == "Purchasing") {
                    if (this.statusType.toString() == "true") {
                        filterData = this.mainlstGridData.filter(function (x) { return x.ORG_TYPE_DISPLAY == "Purchasing" && x.STATUS == true; });
                    }
                    else if (this.statusType.toString() == "false") {
                        filterData = this.mainlstGridData.filter(function (x) { return x.ORG_TYPE_DISPLAY == "Purchasing" && x.STATUS == false; });
                    }
                    else {
                        filterData = this.mainlstGridData.filter(function (x) { return x.ORG_TYPE_DISPLAY == "Purchasing"; });
                    }
                }
                else if (this.selectedOgType.toString() == "Inventory") {
                    if (this.statusType.toString() == "true") {
                        filterData = this.mainlstGridData.filter(function (x) { return x.ORG_TYPE_DISPLAY == "Inventory" && x.STATUS == true; });
                    }
                    else if (this.statusType.toString() == "false") {
                        filterData = this.mainlstGridData.filter(function (x) { return x.ORG_TYPE_DISPLAY == "Inventory" && x.STATUS == false; });
                    }
                    else {
                        filterData = this.mainlstGridData.filter(function (x) { return x.ORG_TYPE_DISPLAY == "Inventory"; });
                    }
                }
                else if (this.selectedOgType == "ALL") {
                    if (this.statusType.toString() == "true") {
                        filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == true; });
                    }
                    else if (this.statusType.toString() == "false") {
                        filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == false; });
                    }
                    else {
                        filterData = this.mainlstGridData;
                    }
                }
                if (filterData != null) {
                    for (x = 0; x < filterData.length; x++) {
                        mangeOrgIDDetails = new RM_ORG_UNITS_1.RM_ORG_UNITS();
                        mangeOrgIDDetails.ORG_ID = filterData[x].ORG_ID;
                        mangeOrgIDDetails.ORG_NAME = filterData[x].ORG_NAME;
                        mangeOrgIDDetails.ORG_TYPE_DISPLAY = filterData[x].ORG_TYPE_DISPLAY;
                        mangeOrgIDDetails.ORG_TYPE = filterData[x].ORG_TYPE;
                        mangeOrgIDDetails.STATUS = filterData[x].STATUS;
                        mangeOrgIDDetails.STATUS_VALUE = filterData[x].STATUS_VALUE;
                        mangeOrgIDDetails.MASTER_GROUP_ID = filterData[x].MASTER_GROUP_ID;
                        this.orgsDatas.push(mangeOrgIDDetails);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    ManageOrgIdComponent.prototype.createNewOrg = function () {
        //this.atParSharedDataService.storage = { "mode": ModeEnum.Add };
        this.breadCrumbMenu.SUB_MENU_NAME = 'Setup Org ID';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.atParSharedDataService.setStorage({ "mode": AtParEnums_2.ModeEnum.Add });
        var navigationExtras = {
            queryParams: {
                "mode": AtParEnums_2.ModeEnum.Add,
            },
            relativeTo: this.route
        };
        this.router.navigate(['addOrgId'], navigationExtras);
    };
    ManageOrgIdComponent.prototype.editOrgId = function (rmOrgUnits) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Org ID';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.atParSharedDataService.setStorage({ "rmOrgUnits": rmOrgUnits, "mode": AtParEnums_2.ModeEnum.Edit });
        //this.atParSharedDataService.storage = { "rmOrgUnits": rmOrgUnits, "mode": ModeEnum.Edit };
        var navigationExtras = {
            queryParams: {
                "mode": AtParEnums_2.ModeEnum.Edit,
            },
            relativeTo: this.route
        };
        this.router.navigate(['addOrgId'], navigationExtras);
    };
    ManageOrgIdComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ManageOrgIdComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.mode = null;
        this.statusCode = null;
        this.orgId = null;
        this.orgName = null;
        this.details = null;
        this.userId = null;
        this.statusMesssage = null;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], ManageOrgIdComponent.prototype, "dataTableComponent", void 0);
    ManageOrgIdComponent = __decorate([
        core_1.Component({
            // moduleId: module.id,
            templateUrl: 'atpar-manage-orgid.component.html',
            providers: [atpar_manage_orgid_services_1.ManageOrgIdServices]
        }),
        __metadata("design:paramtypes", [atpar_manage_orgid_services_1.ManageOrgIdServices,
            router_1.ActivatedRoute,
            AtParSharedDataService_1.AtParSharedDataService,
            AtParConstants_1.AtParConstants,
            event_spinner_service_1.SpinnerService, router_1.Router])
    ], ManageOrgIdComponent);
    return ManageOrgIdComponent;
}());
exports.ManageOrgIdComponent = ManageOrgIdComponent;
//# sourceMappingURL=atpar-manage-orgid.component.js.map