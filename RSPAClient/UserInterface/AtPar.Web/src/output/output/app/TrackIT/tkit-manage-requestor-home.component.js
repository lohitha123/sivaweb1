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
var tkit_manage_requestor_services_1 = require("../../app/TrackIT/tkit-manage-requestor.services");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var router_1 = require("@angular/router");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var TKIT_REQUESTOR_1 = require("../../app/Entities/TKIT_REQUESTOR");
var ManageRequestorHomeComponent = (function () {
    function ManageRequestorHomeComponent(manageRequestorServices, router, spinnerService, route, atParConstant, atParSharedDataService) {
        this.manageRequestorServices = manageRequestorServices;
        this.router = router;
        this.spinnerService = spinnerService;
        this.route = route;
        this.atParConstant = atParConstant;
        this.atParSharedDataService = atParSharedDataService;
        this.newItem = new TKIT_REQUESTOR_1.TKIT_REQUESTOR();
        this.statusType = "";
        this._deviceTokenEntry = [];
        this.msgs = [];
        this.isVisible = false;
        this.isUpdate = false;
        this.statusMesssage = "";
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    ManageRequestorHomeComponent.prototype.dataFilter = function (evtdata, filed, filterMatchMode) {
        return __awaiter(this, void 0, void 0, function () {
            var filterData, x, lstRequestorDetails;
            return __generator(this, function (_a) {
                this.requestorData.length = 0;
                if (this.statusType.toString() == "A") {
                    filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == 'A'; });
                }
                else if (this.statusType.toString() == "I") {
                    filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == 'I'; });
                }
                else {
                    filterData = this.mainlstGridData;
                }
                if (filterData != null) {
                    for (x = 0; x < filterData.length; x++) {
                        lstRequestorDetails = new TKIT_REQUESTOR_1.TKIT_REQUESTOR();
                        lstRequestorDetails.REQUESTOR_ID = filterData[x].REQUESTOR_ID;
                        lstRequestorDetails.FIRST_NAME = filterData[x].FIRST_NAME;
                        lstRequestorDetails.LAST_NAME = filterData[x].LAST_NAME;
                        lstRequestorDetails.MIDDLE_INIT = filterData[x].MIDDLE_INIT;
                        lstRequestorDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                        lstRequestorDetails.STATUS = filterData[x].STATUS;
                        if (lstRequestorDetails.STATUS == 'A') {
                            lstRequestorDetails.checkStatus = true;
                        }
                        else {
                            lstRequestorDetails.checkStatus = false;
                        }
                        this.requestorData.push(lstRequestorDetails);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    ManageRequestorHomeComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusList = [];
                        this.statusList.push({ label: 'All', value: "" });
                        this.statusList.push({ label: 'Active', value: 'A' });
                        this.statusList.push({ label: 'InActive', value: 'I' });
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
    ManageRequestorHomeComponent.prototype.BindGrid = function () {
        var _this = this;
        try {
            this.msgs = [];
            this.statusType = "";
            this.mainlstGridData = [];
            this.requestorData = [];
            this.isVisible = false;
            if (this.dataTableComponent != null) {
                this.dataTableComponent.reset();
            }
            this.spinnerService.start();
            if (this.requestorSearch == undefined || this.requestorSearch == null ||
                this.requestorSearch.trim().length == 0) {
                this.requestorSearch = '';
            }
            this.manageRequestorServices.getAllRequestors(this.requestorSearch, this._deviceTokenEntry)
                .forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_1.StatusType.Success:
                        if (_this.isUpdate == false) {
                            _this.msgs = [];
                        }
                        _this.msgs = [];
                        for (var x = 0; x < resp.DataList.length; x++) {
                            if (resp.DataList[x].STATUS == 'A') {
                                resp.DataList[x].checkStatus = true;
                            }
                            else {
                                resp.DataList[x].checkStatus = false;
                            }
                        }
                        _this.requestorData = resp.DataList;
                        for (var x = 0; x < _this.requestorData.length; x++) {
                            var requestorDataDetails = new TKIT_REQUESTOR_1.TKIT_REQUESTOR();
                            requestorDataDetails.REQUESTOR_ID = _this.requestorData[x].REQUESTOR_ID;
                            requestorDataDetails.FIRST_NAME = _this.requestorData[x].FIRST_NAME;
                            requestorDataDetails.LAST_NAME = _this.requestorData[x].LAST_NAME;
                            requestorDataDetails.MIDDLE_INIT = _this.requestorData[x].MIDDLE_INIT;
                            requestorDataDetails.ORG_GROUP_ID = _this.requestorData[x].ORG_GROUP_ID;
                            requestorDataDetails.STATUS = _this.requestorData[x].STATUS;
                            requestorDataDetails.checkStatus = _this.requestorData[x].checkStatus;
                            _this.mainlstGridData.push(requestorDataDetails);
                        }
                        _this.spinnerService.stop();
                        if (_this.requestorData != null && _this.requestorData.length > 0) {
                            _this.isVisible = true;
                        }
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
            });
            this.isUpdate = false;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindGrid");
        }
    };
    ManageRequestorHomeComponent.prototype.addRequestor = function () {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Add Requestor';
            this.breadCrumbMenu.IS_DIV = false;
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.atParSharedDataService.setStorage({ "mode": AtParEnums_1.ModeEnum.Add });
            var navigationExtras = {
                queryParams: {
                    "mode": AtParEnums_1.ModeEnum.Add,
                },
                relativeTo: this.route
            };
            this.router.navigate(['addormodify'], navigationExtras);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "editRequestor");
        }
    };
    ManageRequestorHomeComponent.prototype.editRequestor = function (requstorData) {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Requestor';
            this.breadCrumbMenu.IS_DIV = false;
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.atParSharedDataService.setStorage({ "requestorID": requstorData.REQUESTOR_ID, "mode": AtParEnums_1.ModeEnum.Edit });
            var navigationExtras = {
                queryParams: {
                    "mode": AtParEnums_1.ModeEnum.Add,
                },
                relativeTo: this.route
            };
            this.router.navigate(['addormodify'], navigationExtras);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "editRequestor");
        }
    };
    ManageRequestorHomeComponent.prototype.updateRequestorStatus = function (requstorData) {
        var _this = this;
        this.spinnerService.start();
        this.manageRequestorServices.updateRequestorStatus(requstorData.REQUESTOR_ID, requstorData.STATUS, this._deviceTokenEntry).forEach(function (resp) {
            _this.msgs = [];
            switch (resp.StatType) {
                case AtParEnums_1.StatusType.Success:
                    var filterData = [];
                    _this.requestorData = [];
                    var matchedrecord = _this.mainlstGridData.filter(function (x) { return x.REQUESTOR_ID == requstorData.REQUESTOR_ID; });
                    matchedrecord[0].STATUS = (requstorData.STATUS == 'A' ? "I" : "A");
                    console.log(_this.mainlstGridData);
                    if (_this.statusType.toString() == "A") {
                        filterData = _this.mainlstGridData.filter(function (x) { return x.STATUS == 'A'; });
                    }
                    else if (_this.statusType.toString() == "I") {
                        filterData = _this.mainlstGridData.filter(function (x) { return x.STATUS == 'I'; });
                    }
                    else {
                        filterData = _this.mainlstGridData;
                    }
                    if (filterData != null) {
                        for (var x = 0; x < filterData.length; x++) {
                            var lstRequestorDetails = new TKIT_REQUESTOR_1.TKIT_REQUESTOR();
                            lstRequestorDetails.REQUESTOR_ID = filterData[x].REQUESTOR_ID;
                            lstRequestorDetails.FIRST_NAME = filterData[x].FIRST_NAME;
                            lstRequestorDetails.LAST_NAME = filterData[x].LAST_NAME;
                            lstRequestorDetails.MIDDLE_INIT = filterData[x].MIDDLE_INIT;
                            lstRequestorDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                            lstRequestorDetails.STATUS = filterData[x].STATUS;
                            if (filterData[x].STATUS == 'A') {
                                lstRequestorDetails.checkStatus = true;
                            }
                            else {
                                lstRequestorDetails.checkStatus = false;
                            }
                            _this.requestorData.push(lstRequestorDetails);
                        }
                    }
                    _this.statusMesssage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Requestor").replace("2%", requstorData.REQUESTOR_ID);
                    _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
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
        });
    };
    ManageRequestorHomeComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    /**
  * delete all the values from variables
  */
    ManageRequestorHomeComponent.prototype.ngOnDestroy = function () {
        this._deviceTokenEntry = [];
        this.msgs = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.requestorData = [];
        this.isVisible = false;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], ManageRequestorHomeComponent.prototype, "dataTableComponent", void 0);
    ManageRequestorHomeComponent = __decorate([
        core_1.Component({
            templateUrl: 'tkit-manage-requestor.component.html',
            providers: [tkit_manage_requestor_services_1.ManageRequestorServices, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [tkit_manage_requestor_services_1.ManageRequestorServices,
            router_1.Router,
            event_spinner_service_1.SpinnerService,
            router_1.ActivatedRoute,
            AtParConstants_1.AtParConstants,
            AtParSharedDataService_1.AtParSharedDataService])
    ], ManageRequestorHomeComponent);
    return ManageRequestorHomeComponent;
}());
exports.ManageRequestorHomeComponent = ManageRequestorHomeComponent;
//# sourceMappingURL=tkit-manage-requestor-home.component.js.map