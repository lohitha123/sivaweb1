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
var recv_manage_carriers_service_1 = require("./recv-manage-carriers.service");
var datatableservice_1 = require("./../components/datatable/datatableservice");
var MT_RECV_MANAGE_CARRIERS_1 = require("../Entities/MT_RECV_MANAGE_CARRIERS");
var HttpService_1 = require("../Shared/HttpService");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var AtParWebApiResponse_1 = require("../Shared/AtParWebApiResponse");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParEnums_1 = require("../Shared/AtParEnums");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var ManageCarriersComponent = (function () {
    function ManageCarriersComponent(dataservice, mngCarriersService, httpService, spinnerService, commonService, atParConstant) {
        this.dataservice = dataservice;
        this.mngCarriersService = mngCarriersService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.form = false;
        this.table = true;
        this.deviceTokenEntry = [];
        this.ddlStatusType = [];
        this.growlMessage = [];
        this.loading = true;
        this.lstManageCarriers = [];
        this.showAddButton = true;
        this.breadCrumbMenu = new routepath_1.Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    ManageCarriersComponent.prototype.addCarrier = function () {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Add Carrier';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.txtSearchStringStatus = undefined;
            this.txtStartpositionStatus = undefined;
            this.txtCarrierStatus = undefined;
            this.growlMessage = [];
            this.table = false;
            this.form = true;
            this.loading = true;
            this.showAddButton = false;
            this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString();
            this.disableSearchString = false;
            this.manageCarriers = new MT_RECV_MANAGE_CARRIERS_1.MT_RECV_MANAGE_CARRIERS();
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "addCarrier");
        }
    };
    ManageCarriersComponent.prototype.editCarrier = function (carriers) {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Carrier';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.txtStartpositionStatus = 0;
            this.txtCarrierStatus = 0;
            this.growlMessage = [];
            this.showAddButton = false;
            this.table = false;
            this.form = true;
            this.loading = false;
            this.manageCarriers = new MT_RECV_MANAGE_CARRIERS_1.MT_RECV_MANAGE_CARRIERS();
            this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString();
            this.disableSearchString = true;
            this.manageCarriers.SEARCH_STRING = carriers.SEARCH_STRING;
            this.manageCarriers.START_POSITION = carriers.START_POSITION;
            this.manageCarriers.CARRIER = carriers.CARRIER;
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "editCarrier");
        }
    };
    ManageCarriersComponent.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.breadCrumbMenu.SUB_MENU_NAME = '';
                    this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                    this.form = false;
                    this.growlMessage = [];
                    this.showAddButton = true;
                    this.txtCarrierSearch = "";
                }
                catch (exMsg) {
                    this.clientErrorMsg(exMsg, "close");
                }
                return [2 /*return*/];
            });
        });
    };
    ManageCarriersComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.table = false;
                    this.ddlStatusType.push({ label: 'All', value: null });
                    this.ddlStatusType.push({ label: 'Active', value: true });
                    this.ddlStatusType.push({ label: 'Inactive', value: false });
                    this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                }
                catch (exMsg) {
                    this.clientErrorMsg(exMsg, "ngOnInit");
                }
                return [2 /*return*/];
            });
        });
    };
    ManageCarriersComponent.prototype.bindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.table == true) {
                            this.dataTableComponent.reset();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        if (this.txtCarrierSearch == null || this.txtCarrierSearch == undefined || this.txtCarrierSearch === "") {
                            this.txtCarrierSearch = "";
                        }
                        return [4 /*yield*/, this.mngCarriersService.getCarriersData(this.txtCarrierSearch)
                                .catch(this.httpService.handleError)
                                .then(function (resp) {
                                var webresp = resp.json();
                                _this.spinnerService.stop();
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        _this.table = true;
                                        _this.lstManageCarriers = webresp.DataList;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: "warn", summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                        _this.table = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: "info", summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                                        _this.table = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: "error", summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                        _this.table = false;
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_1 = _a.sent();
                        this.clientErrorMsg(exMsg_1, "bindGrid");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageCarriersComponent.prototype.bindModelDataChange = function (event) {
        try {
            if ("SEARCHSTRNG" == event.TextBoxID.toString()) {
                this.txtSearchStringStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("STARTPOS" == event.TextBoxID.toString()) {
                this.txtStartpositionStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("CARRIER" == event.TextBoxID.toString()) {
                this.txtCarrierStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            //validations satisfies r not 
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString()) {
                if (this.txtSearchStringStatus == 0 && this.txtStartpositionStatus == 0 && this.txtCarrierStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString()) {
                if (this.txtStartpositionStatus == 0 && this.txtCarrierStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "bindModelDataChange");
        }
    };
    ManageCarriersComponent.prototype.saveOrUpdateCarriers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exMsg_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        this.changeCarrierStatus = 1;
                        return [4 /*yield*/, this.mngCarriersService.updateCarriers(this.mode, this.manageCarriers.SEARCH_STRING, this.manageCarriers.START_POSITION, this.manageCarriers.CARRIER, this.changeCarrierStatus)
                                .subscribe(function (resp) {
                                var webresp = resp.json();
                                _this.spinnerService.stop();
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        if (_this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add]) {
                                            var statusMessage = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Carrier").replace("2%", _this.manageCarriers.CARRIER);
                                            _this.growlMessage.push({
                                                severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage
                                            });
                                            _this.manageCarriers = new MT_RECV_MANAGE_CARRIERS_1.MT_RECV_MANAGE_CARRIERS();
                                            document.getElementById('SEARCHSTRNG').focus();
                                            _this.loading = true;
                                            _this.txtSearchStringStatus = 1;
                                            _this.txtStartpositionStatus = 1;
                                            _this.txtCarrierStatus = 1;
                                        }
                                        if (_this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit]) {
                                            var statusMessage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Carrier").replace("2%", _this.manageCarriers.CARRIER);
                                            _this.growlMessage.push({
                                                severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage
                                            });
                                            document.getElementById('STARTPOS').focus();
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        if (webresp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.S_DATAEXISTS_INTABLE) {
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Search String already exists" });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        if (webresp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.S_DATAEXISTS_INTABLE) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Search String already exists" });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                        }
                                        break;
                                    }
                                }
                                _this.spinnerService.stop();
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_2 = _a.sent();
                        this.clientErrorMsg(exMsg_2, "saveOrUpdateCarriers");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageCarriersComponent.prototype.changeStatus = function (carriers) {
        var _this = this;
        if (carriers.STATUS == true) {
            this.changeCarrierStatus = 0;
        }
        else {
            this.changeCarrierStatus = 1;
        }
        this.growlMessage = [];
        this.spinnerService.start();
        this.lblSearchString = carriers.SEARCH_STRING;
        this.txtEditStartPosition = carriers.START_POSITION;
        this.txtEditCarrier = carriers.CARRIER;
        try {
            this.mode = "Status";
            var webresp = new AtParWebApiResponse_1.AtParWebApiResponse();
            this.mngCarriersService.updateCarriers(this.mode, this.lblSearchString, this.txtEditStartPosition, this.txtEditCarrier, this.changeCarrierStatus)
                .subscribe(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                var webresp, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            webresp = resp.json();
                            this.spinnerService.stop();
                            _a = webresp.StatType;
                            switch (_a) {
                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 3];
                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 4];
                            }
                            return [3 /*break*/, 5];
                        case 1: return [4 /*yield*/, this.bindGrid()];
                        case 2:
                            _b.sent();
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Carrier " + carriers.CARRIER + " Updated Successfully" });
                            return [3 /*break*/, 5];
                        case 3:
                            {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                return [3 /*break*/, 5];
                            }
                            _b.label = 4;
                        case 4:
                            {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                return [3 /*break*/, 5];
                            }
                            _b.label = 5;
                        case 5:
                            this.spinnerService.stop();
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "changeStatus");
        }
    };
    ManageCarriersComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ManageCarriersComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.ddlStatusType = [];
        this.growlMessage = [];
        this.txtSearchStringStatus = 1;
        this.txtStartpositionStatus = 1;
        this.txtCarrierStatus = 1;
        this.changeCarrierStatus = 1;
        this.lblSearchString = '';
        this.txtEditStartPosition = '';
        this.txtEditCarrier = '';
        this.disableSearchString = false;
        this.lstManageCarriers = [];
        this.manageCarriers = null;
        this.spinnerService.stop();
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], ManageCarriersComponent.prototype, "dataTableComponent", void 0);
    ManageCarriersComponent = __decorate([
        core_1.Component({
            templateUrl: 'recv-manage-carriers.component.html',
            providers: [datatableservice_1.datatableservice, recv_manage_carriers_service_1.ManageCarriersService, HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            recv_manage_carriers_service_1.ManageCarriersService,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            AtParConstants_1.AtParConstants])
    ], ManageCarriersComponent);
    return ManageCarriersComponent;
}());
exports.ManageCarriersComponent = ManageCarriersComponent;
//# sourceMappingURL=recv-manage-carriers.component.js.map