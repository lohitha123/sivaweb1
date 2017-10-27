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
var PAR_MNGT_COST_CENTER_1 = require("../../app/Entities/PAR_MNGT_COST_CENTER");
var AtParConstants_1 = require("../Shared/AtParConstants");
var atpar_setup_cost_centers_services_1 = require("../../app/Init/atpar-setup-cost-centers.services");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var router_1 = require("@angular/router");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var SetupCostCentersHome = (function () {
    function SetupCostCentersHome(setupCostCentersServices, router, spinnerService, route, atParConstant, atParSharedDataService) {
        this.setupCostCentersServices = setupCostCentersServices;
        this.router = router;
        this.spinnerService = spinnerService;
        this.route = route;
        this.atParConstant = atParConstant;
        this.atParSharedDataService = atParSharedDataService;
        this.newItem = new PAR_MNGT_COST_CENTER_1.PAR_MNGT_COST_CENTER();
        this.statusType = "";
        this.preField = "";
        this._deviceTokenEntry = [];
        this.msgs = [];
        this.isVisible = false;
        this.isUpdate = false;
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    SetupCostCentersHome.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    SetupCostCentersHome.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusList = [];
                        this.statusList.push({ label: 'All', value: "" });
                        this.statusList.push({ label: 'Active', value: true });
                        this.statusList.push({ label: 'InActive', value: false });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (this.atParSharedDataService.storage)
                            this.mode = this.atParSharedDataService.storage.mode;
                        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.msgs = [];
                        this.mainlstGridData = new Array();
                        if (!(this.mode != undefined && this.mode == (AtParEnums_1.ModeEnum.List).toString())) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.BindGrid()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.pazeSize = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        if (this.atParSharedDataService.storage != undefined && this.atParSharedDataService.storage.summary != undefined) {
                            this.msgs.push(this.atParSharedDataService.storage);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SetupCostCentersHome.prototype.BindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.msgs = [];
                        this.statusType = "";
                        this.mainlstGridData = [];
                        this.costCentersData = [];
                        this.isVisible = false;
                        this.spinnerService.start();
                        if (!(this.pCostCenterSearch != undefined && this.pCostCenterSearch != null && this.pCostCenterSearch.trim().length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.setupCostCentersServices
                                .getCostCentersWithSearch(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.pCostCenterSearch)
                                .forEach(function (resp) {
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        if (_this.isUpdate == false) {
                                            _this.msgs = [];
                                        }
                                        _this.msgs = [];
                                        _this.costCentersData = resp.DataList;
                                        for (var x = 0; x < _this.costCentersData.length; x++) {
                                            var costCentersDataDetails = new PAR_MNGT_COST_CENTER_1.PAR_MNGT_COST_CENTER();
                                            costCentersDataDetails.COST_CENTER_CODE = _this.costCentersData[x].COST_CENTER_CODE;
                                            costCentersDataDetails.DEPTNAME = _this.costCentersData[x].DEPTNAME;
                                            costCentersDataDetails.DEPT_ID = _this.costCentersData[x].DEPT_ID;
                                            costCentersDataDetails.DESCRIPTION = _this.costCentersData[x].DESCRIPTION;
                                            costCentersDataDetails.ORG_ID = _this.costCentersData[x].ORG_ID;
                                            if (_this.costCentersData[x].STATUS == false) {
                                                _this.costCentersData[x].STATUS = true;
                                            }
                                            else {
                                                _this.costCentersData[x].STATUS = false;
                                            }
                                            costCentersDataDetails.STATUS = _this.costCentersData[x].STATUS;
                                            costCentersDataDetails.UPDATE_DATE = _this.costCentersData[x].UPDATE_DATE;
                                            costCentersDataDetails.USERNAME = _this.costCentersData[x].USERNAME;
                                            _this.mainlstGridData.push(costCentersDataDetails);
                                        }
                                        _this.spinnerService.stop();
                                        _this.isVisible = true;
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
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.setupCostCentersServices
                            .getCostCentersWithoutSearch(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                            .forEach(function (resp) {
                            switch (resp.StatType) {
                                case AtParEnums_1.StatusType.Success:
                                    if (_this.isUpdate == false) {
                                        _this.msgs = [];
                                    }
                                    _this.costCentersData = resp.DataList;
                                    for (var x = 0; x < _this.costCentersData.length; x++) {
                                        var costCentersDataDetails = new PAR_MNGT_COST_CENTER_1.PAR_MNGT_COST_CENTER();
                                        costCentersDataDetails.COST_CENTER_CODE = _this.costCentersData[x].COST_CENTER_CODE;
                                        costCentersDataDetails.DEPTNAME = _this.costCentersData[x].DEPTNAME;
                                        costCentersDataDetails.DEPT_ID = _this.costCentersData[x].DEPT_ID;
                                        costCentersDataDetails.DESCRIPTION = _this.costCentersData[x].DESCRIPTION;
                                        costCentersDataDetails.ORG_ID = _this.costCentersData[x].ORG_ID;
                                        if (_this.costCentersData[x].STATUS == false) {
                                            _this.costCentersData[x].STATUS = true;
                                        }
                                        else {
                                            _this.costCentersData[x].STATUS = false;
                                        }
                                        costCentersDataDetails.STATUS = _this.costCentersData[x].STATUS;
                                        costCentersDataDetails.UPDATE_DATE = _this.costCentersData[x].UPDATE_DATE;
                                        costCentersDataDetails.USERNAME = _this.costCentersData[x].USERNAME;
                                        _this.mainlstGridData.push(costCentersDataDetails);
                                    }
                                    _this.spinnerService.stop();
                                    _this.isVisible = true;
                                    break;
                                case AtParEnums_1.StatusType.Error:
                                    _this.msgs = [];
                                    _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
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
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.isUpdate = false;
                        return [3 /*break*/, 6];
                    case 5:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "BindGrid");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //customSort(event) {
    //    var element = event;
    //    this.costCentersData.sort(function (a, b) {
    //        if (a[element.field].toLowerCase() < b[element.field].toLowerCase())
    //            return -1;
    //        if (a[element.field].toLowerCase() > b[element.field].toLowerCase())
    //            return 1;
    //        return 0;
    //    })
    //}
    SetupCostCentersHome.prototype.addCostCenter = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Cost Center';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        // Navigating to Cost Center child route
        //this.atParSharedDataService.storage = { "mode": ModeEnum.Add };
        this.atParSharedDataService.setStorage({ "mode": AtParEnums_1.ModeEnum.Add });
        var navigationExtras = {
            queryParams: {
                "mode": AtParEnums_1.ModeEnum.Add,
            },
            relativeTo: this.route
        };
        this.router.navigate(['addormodify'], navigationExtras);
    };
    SetupCostCentersHome.prototype.editCostCenter = function (costCenterData) {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Cost Center';
            this.breadCrumbMenu.IS_DIV = false;
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            // Navigating to Cost Center child route
            //this.atParSharedDataService.storage = { "costCenterData": costCenterData, "mode": ModeEnum.Edit };
            this.atParSharedDataService.setStorage({ "costCenterData": costCenterData, "mode": AtParEnums_1.ModeEnum.Edit });
            var navigationExtras = {
                queryParams: {
                    "mode": AtParEnums_1.ModeEnum.Edit,
                },
                relativeTo: this.route
            };
            this.router.navigate(['addormodify'], navigationExtras);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "editCostCenter");
        }
    };
    SetupCostCentersHome.prototype.updateCostCenterStatus = function (costCenterData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.msgs = [];
                        this.isUpdate = true;
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.setupCostCentersServices.updateCostCenterStatus(costCenterData.STATUS, costCenterData.ORG_ID, costCenterData.COST_CENTER_CODE, costCenterData.DEPT_ID)
                                .forEach(function (resp) {
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        var filterData = [];
                                        _this.costCentersData = [];
                                        var matchedrecord = _this.mainlstGridData.filter(function (x) { return x.COST_CENTER_CODE == costCenterData.COST_CENTER_CODE; });
                                        matchedrecord[0].STATUS = costCenterData.STATUS;
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
                                                var lstCostCenterDetails = new PAR_MNGT_COST_CENTER_1.PAR_MNGT_COST_CENTER();
                                                lstCostCenterDetails.COST_CENTER_CODE = filterData[x].COST_CENTER_CODE;
                                                lstCostCenterDetails.DESCRIPTION = filterData[x].DESCRIPTION;
                                                lstCostCenterDetails.DEPTNAME = filterData[x].DEPTNAME;
                                                lstCostCenterDetails.DEPT_ID = filterData[x].DEPT_ID;
                                                lstCostCenterDetails.ORG_ID = filterData[x].ORG_ID;
                                                lstCostCenterDetails.UPDATE_USER_ID = filterData[x].UPDATE_USERID;
                                                lstCostCenterDetails.UPDATE_DATE = filterData[x].UPDATE_DATE;
                                                lstCostCenterDetails.STATUS = filterData[x].STATUS;
                                                _this.costCentersData.push(lstCostCenterDetails);
                                            }
                                        }
                                        var statusmesg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Cost center").replace("2%", costCenterData.COST_CENTER_CODE);
                                        _this.msgs = [];
                                        _this.spinnerService.stop();
                                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusmesg });
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        if (resp.StatusCode == 1123307) {
                                            //if (costCenterData.STATUS == true) {
                                            //    costCenterData.STATUS = false;
                                            //}
                                            //else if (costCenterData.STATUS == false) {
                                            //    costCenterData.STATUS = true
                                            //}
                                            _this.costCentersData.filter(function (x) { return x.COST_CENTER_CODE == costCenterData.COST_CENTER_CODE; })[0].STATUS = !costCenterData.STATUS;
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "updateCostCenterStatus");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupCostCentersHome.prototype.dataFilter = function (evtdata, filed, filterMatchMode) {
        return __awaiter(this, void 0, void 0, function () {
            var filterData, x, lstcostCenterDetails;
            return __generator(this, function (_a) {
                this.costCentersData.length = 0;
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
                        lstcostCenterDetails = new PAR_MNGT_COST_CENTER_1.PAR_MNGT_COST_CENTER();
                        lstcostCenterDetails.COST_CENTER_CODE = filterData[x].COST_CENTER_CODE;
                        lstcostCenterDetails.DEPTNAME = filterData[x].DEPTNAME;
                        lstcostCenterDetails.DEPT_ID = filterData[x].DEPT_ID;
                        lstcostCenterDetails.DESCRIPTION = filterData[x].DESCRIPTION;
                        lstcostCenterDetails.ORG_ID = filterData[x].ORG_ID;
                        lstcostCenterDetails.STATUS = filterData[x].STATUS;
                        lstcostCenterDetails.UPDATE_DATE = filterData[x].UPDATE_DATE;
                        lstcostCenterDetails.USERNAME = filterData[x].USERNAME;
                        this.costCentersData.push(lstcostCenterDetails);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    SetupCostCentersHome.prototype.customSort = function (event, field) {
        var element = event;
        if (this.preField == element.field) {
            if (element.order == 1) {
                element.order = -1;
            }
            else {
                element.order = 1;
            }
        }
        else {
            element.order = 1;
        }
        this.preField = element.field;
        var result = null;
        var order;
        var sortCentersData = [];
        try {
            sortCentersData = this.costCentersData.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null)
                    result = -1;
                else if (a[element.field] != null && b[element.field] == null)
                    result = 1;
                else if (a[element.field] == null && b[element.field] == null)
                    result = 0;
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                    result = a[element.field].localeCompare(b[element.field]);
                else
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                return (element.order * result);
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
        this.costCentersData = sortCentersData;
    };
    SetupCostCentersHome.prototype.ngOnDestroy = function () {
        this.newItem = null;
        this.costCentersData = null;
        this.statusList = null;
        this.msgs = [];
        this.pCostCenterSearch = '';
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], SetupCostCentersHome.prototype, "dataTableComponent", void 0);
    SetupCostCentersHome = __decorate([
        core_1.Component({
            templateUrl: 'atpar-setup-cost-centers-home.html',
            providers: [atpar_setup_cost_centers_services_1.SetupCostCentersServices, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [atpar_setup_cost_centers_services_1.SetupCostCentersServices,
            router_1.Router,
            event_spinner_service_1.SpinnerService,
            router_1.ActivatedRoute,
            AtParConstants_1.AtParConstants,
            AtParSharedDataService_1.AtParSharedDataService])
    ], SetupCostCentersHome);
    return SetupCostCentersHome;
}());
exports.SetupCostCentersHome = SetupCostCentersHome;
//# sourceMappingURL=atpar-setup-cost-centers-home.component.js.map