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
var http_1 = require("@angular/http");
var MT_PKPL_ORDER_PREFIX_1 = require("../../app/Entities/MT_PKPL_ORDER_PREFIX");
var HttpService_1 = require("../Shared/HttpService");
var api_1 = require("../components/common/api");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParEnums_2 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var OrderPrefixComponent = (function () {
    function OrderPrefixComponent(httpService, _http, spinnerService, atParConstant, commonService) {
        this.httpService = httpService;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.commonService = commonService;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.blnStatusMsg = false;
        this.statusMsg = "";
        this.dataCheckedSorting = [];
        this.blnsortbycolumn = true;
        this.custom = "custom";
    }
    OrderPrefixComponent.prototype.ngOnInit = function () {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedPrefix = new Array();
        this.dataCheckedSorting = new Array();
        this.dataUncheckedSorting = new Array();
        this.lstDBDataSave = new Array();
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.getOrderPrefixSetUp();
    };
    OrderPrefixComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstCheckedPrefix = null;
        this.lstDBData = null;
        this.lstDBDataSave = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    };
    OrderPrefixComponent.prototype.myfilterdata = function (event) {
        try {
            this.lstgridfilterData = new Array();
            this.lstgridfilterData = event;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "myfilterdata");
        }
    };
    OrderPrefixComponent.prototype.checkAll = function () {
        try {
            this.lstCheckedPrefix = [];
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                    this.lstCheckedPrefix.push(this.lstgridfilterData[i]);
                }
            }
            else {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].checkvalue = true;
                    this.lstDBData[i].CHK_VALUE = 1;
                    this.lstCheckedPrefix.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    OrderPrefixComponent.prototype.unCheckAll = function () {
        try {
            this.lstCheckedPrefix = [];
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                    this.lstCheckedPrefix.push(this.lstgridfilterData[i]);
                }
            }
            else {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].checkvalue = false;
                    this.lstDBData[i].CHK_VALUE = 0;
                    this.lstCheckedPrefix.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    OrderPrefixComponent.prototype.selectedRow = function (values, event) {
        var _this = this;
        try {
            this.spinnerService.start();
            if (event == true) {
                values.CHK_VALUE = 1;
            }
            else {
                values.CHK_VALUE = 0;
            }
            for (var i = 0; i < this.lstCheckedPrefix.length; i++) {
                if (this.lstCheckedPrefix[i].BEG_SEQ === values.BEG_SEQ) {
                    var index = this.lstCheckedPrefix.indexOf(this.lstCheckedPrefix[i], 0);
                    this.lstCheckedPrefix.splice(index, 1);
                }
            }
            this.lstCheckedPrefix.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
        finally {
            setTimeout(function () {
                _this.spinnerService.stop();
            }, 50);
        }
    };
    OrderPrefixComponent.prototype.customSort = function (event) {
        try {
            var element = event;
            this.lstDBData = [];
            this.blnsortbycolumn = !this.blnsortbycolumn;
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
            this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            if (this.blnsortbycolumn == false) {
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
            }
            else {
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
            }
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    };
    OrderPrefixComponent.prototype.getOrderPrefixSetUp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.lstgridfilterData = null;
                    this.spinnerService.start();
                    this.httpService.get({
                        "apiMethod": "/api/OrderPrefix/GetOrderPrefixSetUp",
                        params: {}
                    }).catch(this.httpService.handleError).map(function (res) { return res.json(); })
                        .subscribe(function (response) {
                        switch (response.StatType) {
                            case AtParEnums_2.StatusType.Success: {
                                _this.lstDBData = response.DataList;
                                for (var i = 0; i <= response.DataList.length - 1; i++) {
                                    if (response.DataList[i].CHK_VALUE == 1) {
                                        response.DataList[i].checkvalue = true;
                                    }
                                    else {
                                        response.DataList[i].checkvalue = false;
                                    }
                                }
                                _this.lstDBData = response.DataList;
                                _this.dataCheckedSorting = [];
                                _this.dataUncheckedSorting = [];
                                for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                    if (_this.lstDBData[i].CHK_VALUE == 1) {
                                        _this.dataCheckedSorting.push(_this.lstDBData[i]);
                                    }
                                    else {
                                        _this.dataUncheckedSorting.push(_this.lstDBData[i]);
                                    }
                                }
                                _this.spinnerService.stop();
                                break;
                            }
                            case AtParEnums_2.StatusType.Warn: {
                                _this.spinnerService.stop();
                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                break;
                            }
                            case AtParEnums_2.StatusType.Error: {
                                _this.spinnerService.stop();
                                _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                break;
                            }
                            case AtParEnums_2.StatusType.Custom: {
                                _this.spinnerService.stop();
                                _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                break;
                            }
                        }
                    });
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "getOrderPrefixSetUp");
                }
                return [2 /*return*/];
            });
        });
    };
    OrderPrefixComponent.prototype.saveOrderPrefixSetUp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var prefixObj, i;
            return __generator(this, function (_a) {
                this.spinnerService.start();
                this.lstDBDataSave = [];
                for (i = 0; i < this.lstDBData.length; i++) {
                    prefixObj = new MT_PKPL_ORDER_PREFIX_1.MT_PKPL_ORDER_PREFIX();
                    prefixObj.CHK_VALUE = this.lstDBData[i].CHK_VALUE;
                    prefixObj.ORDER_PREFIX = this.lstDBData[i].BEG_SEQ;
                    prefixObj.PREFIX_DESCR = '';
                    this.lstDBDataSave.push(prefixObj);
                }
                try {
                    this.httpService.create({
                        "apiMethod": "/api/OrderPrefix/SaveOrderPrefixSetUp",
                        formData: this.lstDBDataSave,
                        params: {}
                    }).catch(this.httpService.handleError).map(function (res) { return res.json(); }).subscribe(function (response) {
                        _this.growlMessage = [];
                        switch (response.StatType) {
                            case AtParEnums_2.StatusType.Success: {
                                _this.getOrderPrefixSetUp();
                                _this.spinnerService.stop();
                                _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                break;
                            }
                            case AtParEnums_2.StatusType.Warn: {
                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                _this.spinnerService.stop();
                                break;
                            }
                            case AtParEnums_2.StatusType.Error: {
                                _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                _this.spinnerService.stop();
                                break;
                            }
                            case AtParEnums_2.StatusType.Custom: {
                                _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                _this.spinnerService.stop();
                                break;
                            }
                        }
                    });
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "saveOrderPrefixSetUp");
                }
                return [2 /*return*/];
            });
        });
    };
    OrderPrefixComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    OrderPrefixComponent = __decorate([
        core_1.Component({
            templateUrl: 'pick-order-prefix.component.html',
            providers: [HttpService_1.HttpService, api_1.ConfirmationService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants],
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            atpar_common_service_1.AtParCommonService])
    ], OrderPrefixComponent);
    return OrderPrefixComponent;
}());
exports.OrderPrefixComponent = OrderPrefixComponent;
//# sourceMappingURL=pick-order-prefix.component.js.map