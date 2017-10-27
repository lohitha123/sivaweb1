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
var PAR_MNGT_VENDOR_1 = require("../../app/Entities/PAR_MNGT_VENDOR");
var atpar_setup_vendors_services_1 = require("../../app/Init/atpar-setup-vendors.services");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var AtParEnums_2 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParEnums_3 = require("./../Shared/AtParEnums");
var datatable_1 = require("../components/datatable/datatable");
var AtParConstants_1 = require("../Shared/AtParConstants");
var routepath_1 = require("../AtPar/Menus/routepath");
var SetupVendorsHomeComponent = (function () {
    function SetupVendorsHomeComponent(setupVendorServices, router, route, atParConstant, atParSharedDataService, spinnerService) {
        this.setupVendorServices = setupVendorServices;
        this.router = router;
        this.route = route;
        this.atParConstant = atParConstant;
        this.atParSharedDataService = atParSharedDataService;
        this.spinnerService = spinnerService;
        this.msgs = [];
        this._deviceTokenEntry = [];
        this.statusType = "";
        this.display = false;
        this.isVisible = false;
        this.isUpdate = false;
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    SetupVendorsHomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinnerService.start();
        this.statusList = [];
        this.statusList.push({ label: 'All', value: "" });
        this.statusList.push({ label: 'Active', value: true });
        this.statusList.push({ label: 'InActive', value: false });
        this.mainlstGridData = new Array();
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
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        if (this.mode != undefined && this.mode == (AtParEnums_2.ModeEnum.List).toString()) {
            this.BindGrid();
        }
        this.pazeSize = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.spinnerService.stop();
    };
    SetupVendorsHomeComponent.prototype.BindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.mainlstGridData = [];
                        this.lstVendordata = [];
                        this.statusType = "";
                        this.isVisible = false;
                        this.msgs = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        if (this.vendorSearch == undefined || this.vendorSearch == null || this.vendorSearch.length == 0) {
                            this.vendorSearch = "";
                        }
                        return [4 /*yield*/, this.setupVendorServices.getVendorDetails(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], '', this.vendorSearch.trim())
                                .forEach(function (resp) {
                                _this.spinnerService.stop();
                                switch (resp.StatType) {
                                    case AtParEnums_3.StatusType.Success:
                                        {
                                            if (_this.isUpdate == false) {
                                                _this.msgs = [];
                                            }
                                            _this.mainlstGridData = [];
                                            _this.lstVendordata = [];
                                            _this.lstVendordata = resp.DataList;
                                            for (var item = 0; item < _this.lstVendordata.length; item++) {
                                                if (_this.lstVendordata[item].STATUS == false) {
                                                    _this.lstVendordata[item].STATUS = true;
                                                }
                                                else {
                                                    _this.lstVendordata[item].STATUS = false;
                                                }
                                                _this.mainlstGridData.push(_this.lstVendordata[item]);
                                            }
                                            _this.isVisible = true;
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                    case AtParEnums_3.StatusType.Error:
                                        {
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                            _this.isVisible = false;
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                    case AtParEnums_3.StatusType.Warn:
                                        {
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                            _this.isVisible = false;
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
                            })];
                    case 2:
                        _a.sent();
                        this.isUpdate = false;
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "BindGrid");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupVendorsHomeComponent.prototype.dataFilter = function (evtdata, filed, filterMatchMode) {
        return __awaiter(this, void 0, void 0, function () {
            var filterData, x, lstVendorDetails;
            return __generator(this, function (_a) {
                this.msgs = [];
                this.lstVendordata.length = 0;
                if (this.statusType.toString() == "true") {
                    filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == true; });
                }
                else if (this.statusType.toString() == "false") {
                    filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == false; });
                }
                else {
                    filterData = this.mainlstGridData;
                }
                if (filterData != null) {
                    for (x = 0; x < filterData.length; x++) {
                        lstVendorDetails = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
                        lstVendorDetails.VENDOR_ID = filterData[x].VENDOR_ID;
                        lstVendorDetails.VENDOR_NAME = filterData[x].VENDOR_NAME;
                        lstVendorDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                        lstVendorDetails.STATUS = filterData[x].STATUS;
                        lstVendorDetails.VEND_USER_ID = filterData[x].VEND_USER_ID;
                        lstVendorDetails.ADDRESS1 = filterData[x].ADDRESS1;
                        lstVendorDetails.ADDRESS2 = filterData[x].ADDRESS2;
                        lstVendorDetails.ADD_ITEMS_LFLAG = filterData[x].ADD_ITEMS_LFLAG;
                        lstVendorDetails.BILL_ONLY_EMAIL = filterData[x].BILL_ONLY_EMAIL;
                        lstVendorDetails.CITY = filterData[x].CITY;
                        lstVendorDetails.CONTACT_E_MAIL = filterData[x].CONTACT_E_MAIL;
                        lstVendorDetails.CONTACT_NAME = filterData[x].CONTACT_NAME;
                        lstVendorDetails.COUNTRY = filterData[x].COUNTRY;
                        lstVendorDetails.FAX = filterData[x].FAX;
                        lstVendorDetails.LAST_CLIENT_ADDRESS = filterData[x].LAST_CLIENT_ADDRESS;
                        lstVendorDetails.LAST_UPDATE_DATE = filterData[x].LAST_UPDATE_DATE;
                        lstVendorDetails.LAST_UPDATE_USER = filterData[x].LAST_UPDATE_USER;
                        lstVendorDetails.MODE = filterData[x].MODE;
                        lstVendorDetails.ORDER_DESPATCH_TYPE = filterData[x].ORDER_DESPATCH_TYPE;
                        lstVendorDetails.PHONE = filterData[x].PHONE;
                        lstVendorDetails.REMINDER_FREQ = filterData[x].REMINDER_FREQ;
                        lstVendorDetails.STATE = filterData[x].STATE;
                        lstVendorDetails.ZIP = filterData[x].ZIP;
                        this.lstVendordata.push(lstVendorDetails);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    //Create New Vendor Record
    SetupVendorsHomeComponent.prototype.createNewVendor = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Vendor';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        // Navigating to Cost Center child route
        //this.atParSharedDataService.storage = { "mode": ModeEnum.Add };
        this.atParSharedDataService.setStorage({ "mode": AtParEnums_2.ModeEnum.Add });
        var navigationExtras = {
            queryParams: {
                "mode": AtParEnums_2.ModeEnum.Add,
            },
            relativeTo: this.route
        };
        this.router.navigate(['setupmodifyitems'], navigationExtras);
        this.router.navigate(['setupmodifyvendors'], navigationExtras);
    };
    //Edit Vendor Data.
    SetupVendorsHomeComponent.prototype.editVendor = function (SetupModifyVendorsEditData) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Vendor';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        // Navigating to Cost Center child route
        //this.atParSharedDataService.storage = { "SetupModifyVendorsEditData": SetupModifyVendorsEditData, "mode": ModeEnum.Edit };
        this.atParSharedDataService.setStorage({ "SetupModifyVendorsEditData": SetupModifyVendorsEditData, "mode": AtParEnums_2.ModeEnum.Edit });
        var navigationExtras = {
            queryParams: {
                "mode": AtParEnums_2.ModeEnum.Edit,
            },
            relativeTo: this.route
        };
        this.router.navigate(['setupmodifyvendors'], navigationExtras);
    };
    SetupVendorsHomeComponent.prototype.changeStatus = function (vendor) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isUpdate = true;
                        this.msgs = [];
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.setupVendorServices.UpdateVendorStatus(vendor.STATUS, vendor.VENDOR_ID)
                                .forEach(function (resp) {
                                switch (resp.StatType) {
                                    case AtParEnums_3.StatusType.Success:
                                        _this.msgs = [];
                                        _this.statusMesssage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Vendor").replace("2%", vendor.VENDOR_ID);
                                        _this.spinnerService.stop();
                                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                                        var filterData = [];
                                        _this.lstVendordata = [];
                                        var matchedrecord = _this.mainlstGridData.filter(function (x) { return x.VENDOR_ID == vendor.VENDOR_ID; });
                                        matchedrecord[0].STATUS = vendor.STATUS;
                                        if (_this.statusType.toString() == "false") {
                                            filterData = _this.mainlstGridData.filter(function (x) { return x.STATUS == false; });
                                        }
                                        else if (_this.statusType.toString() == "true") {
                                            filterData = _this.mainlstGridData.filter(function (x) { return x.STATUS == true; });
                                        }
                                        else {
                                            filterData = _this.mainlstGridData;
                                        }
                                        if (filterData != null) {
                                            for (var x = 0; x < filterData.length; x++) {
                                                var lstVendorDetails = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
                                                lstVendorDetails.VENDOR_ID = filterData[x].VENDOR_ID;
                                                lstVendorDetails.VENDOR_NAME = filterData[x].VENDOR_NAME;
                                                lstVendorDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                                                lstVendorDetails.STATUS = filterData[x].STATUS;
                                                lstVendorDetails.VEND_USER_ID = filterData[x].VEND_USER_ID;
                                                lstVendorDetails.ADDRESS1 = filterData[x].ADDRESS1;
                                                lstVendorDetails.ADDRESS2 = filterData[x].ADDRESS2;
                                                lstVendorDetails.ADD_ITEMS_LFLAG = filterData[x].ADD_ITEMS_LFLAG;
                                                lstVendorDetails.BILL_ONLY_EMAIL = filterData[x].BILL_ONLY_EMAIL;
                                                lstVendorDetails.CITY = filterData[x].CITY;
                                                lstVendorDetails.CONTACT_E_MAIL = filterData[x].CONTACT_E_MAIL;
                                                lstVendorDetails.CONTACT_NAME = filterData[x].CONTACT_NAME;
                                                lstVendorDetails.COUNTRY = filterData[x].COUNTRY;
                                                lstVendorDetails.FAX = filterData[x].FAX;
                                                lstVendorDetails.LAST_CLIENT_ADDRESS = filterData[x].LAST_CLIENT_ADDRESS;
                                                lstVendorDetails.LAST_UPDATE_DATE = filterData[x].LAST_UPDATE_DATE;
                                                lstVendorDetails.LAST_UPDATE_USER = filterData[x].LAST_UPDATE_USER;
                                                lstVendorDetails.MODE = filterData[x].MODE;
                                                lstVendorDetails.ORDER_DESPATCH_TYPE = filterData[x].ORDER_DESPATCH_TYPE;
                                                lstVendorDetails.PHONE = filterData[x].PHONE;
                                                lstVendorDetails.REMINDER_FREQ = filterData[x].REMINDER_FREQ;
                                                lstVendorDetails.STATE = filterData[x].STATE;
                                                lstVendorDetails.ZIP = filterData[x].ZIP;
                                                _this.lstVendordata.push(lstVendorDetails);
                                            }
                                        }
                                        break;
                                    case AtParEnums_3.StatusType.Error:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_3.StatusType.Warn:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "changeStatus");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupVendorsHomeComponent.prototype.ngOnDestroy = function () {
        this.lstVendordata = null;
        this.statusCode = 0;
        this.statusMesssage = '';
        this.vendorSearch = '';
        this.mode = undefined;
    };
    SetupVendorsHomeComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], SetupVendorsHomeComponent.prototype, "dataTableComponent", void 0);
    SetupVendorsHomeComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-setup-vendorsHome.component.html',
            providers: [atpar_setup_vendors_services_1.SetupVendorServices],
        }),
        __metadata("design:paramtypes", [atpar_setup_vendors_services_1.SetupVendorServices,
            router_1.Router,
            router_1.ActivatedRoute,
            AtParConstants_1.AtParConstants,
            AtParSharedDataService_1.AtParSharedDataService,
            event_spinner_service_1.SpinnerService])
    ], SetupVendorsHomeComponent);
    return SetupVendorsHomeComponent;
}());
exports.SetupVendorsHomeComponent = SetupVendorsHomeComponent;
//# sourceMappingURL=atpar-setup-vendorsHome.component.js.map