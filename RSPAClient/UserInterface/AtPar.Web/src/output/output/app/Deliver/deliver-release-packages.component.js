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
var datatableservice_1 = require("./../components/datatable/datatableservice");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var deliver_release_packages_service_component_1 = require("./deliver-release-packages.service.component");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var HttpService_1 = require("../Shared/HttpService");
var http_1 = require("@angular/http");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var router_1 = require("@angular/router");
var AtParEnums_3 = require("../Shared/AtParEnums");
var AtParEnums_4 = require("../Shared/AtParEnums");
var api_1 = require("../components/common/api");
var ReleasePackagesComponent = (function () {
    function ReleasePackagesComponent(httpService, _http, dataservice, commonService, releasePackagesService, spinnerService, atParConstant, router, route, atParSharedDataService, confirmationService) {
        this.httpService = httpService;
        this._http = _http;
        this.dataservice = dataservice;
        this.commonService = commonService;
        this.releasePackagesService = releasePackagesService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.router = router;
        this.route = route;
        this.atParSharedDataService = atParSharedDataService;
        this.confirmationService = confirmationService;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.selectedBunit = "";
        this.orgGrpId = "";
        this.blnShowOrgGroupDD = false;
        this.lstOrgGroups = [];
        this.lstFilteredBUnits = [];
        this.showGrid = false;
        this.selectedParLocation = "";
        this.transactionIdlist = "";
        this.UserIdlist = "";
        this.selectedFlag = false;
    }
    ReleasePackagesComponent.prototype.ngOnInit = function () {
        try {
            this.spinnerService.start();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
            this.appId = AtParEnums_3.EnumApps.Deliver;
            this.bindOrgGroups();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    };
    ReleasePackagesComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.populateBusinessUnits();
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            _this.lstFilteredBUnits = [];
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReleasePackagesComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_4.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.lstFilteredBUnits = [];
                                _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstFilteredBUnits.push({
                                                label: data.DataList[i].toString(),
                                                value: data.DataList[i].toString()
                                            });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "populateBusinessUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReleasePackagesComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.showGrid = false;
                this.growlMessage = [];
                if (this.selectedOrgGroupId == "Select One") {
                    this.lstFilteredBUnits = [];
                    this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                    return [2 /*return*/];
                }
                this.spinnerService.start();
                try {
                    this.selectedBunit = "";
                    this.populateBusinessUnits();
                    this.spinnerService.stop();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    ReleasePackagesComponent.prototype.ddlBUnitChanged = function () {
        this.growlMessage = [];
        this.showGrid = false;
    };
    ReleasePackagesComponent.prototype.go_Click = function () {
        try {
            this.showGrid = false;
            if (this.blnShowOrgGroupLabel == true) {
                this.selectedOrgGroupId = this.orgGrpId.split("-")[0].trim();
                this.BindDataGrid();
            }
            else if (this.blnShowOrgGroupDD) {
                if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
                }
                else {
                    this.BindDataGrid();
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "go_Click");
        }
    };
    ReleasePackagesComponent.prototype.BindDataGrid = function () {
        try {
            if (this.selectedBunit === "") {
                this.selectedBunit = "All";
            }
            this.GetPackageDetails("", "", "", AtParEnums_4.YesNo_Enum.N.toString());
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    };
    ReleasePackagesComponent.prototype.GetPackageDetails = function (Lflag, pTransId, pUserId, isFromUnlock) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.releasePackagesService.GetReleasePackages(this.appId, pUserId, this.selectedOrgGroupId, this.selectedBunit, this.selectedParLocation, Lflag, pTransId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.showGrid = true;
                                        _this.lstDBData = data.DataList;
                                        for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                            var changeDate = _this.lstDBData[i].DOWNLOAD_DT_TIME;
                                            var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                            var date = new Date(dateStr);
                                            _this.lstDBData[i].DOWNLOAD_DT_TIME = date.toLocaleString();
                                            _this.lstDBData[i].DOWNLOAD_DT_TIME = _this.lstDBData[i].DOWNLOAD_DT_TIME.replace(',', ' ');
                                            if (_this.lstDBData[i].CURRENT_EVENT == AtParEnums_4.AppTransactionStatus.Downloaded.toString()) {
                                                _this.lstDBData[i].CURRENT_EVENT = "DownLoad";
                                            }
                                            else if (_this.lstDBData[i].CURRENT_EVENT == AtParEnums_4.AppTransactionStatus.statLoad.toString()) {
                                                _this.lstDBData[i].CURRENT_EVENT = "Load";
                                            }
                                            else if (_this.lstDBData[i].CURRENT_EVENT == AtParEnums_4.AppTransactionStatus.statPickup.toString()) {
                                                _this.lstDBData[i].CURRENT_EVENT = "Pickup";
                                            }
                                            else if (_this.lstDBData[i].CURRENT_EVENT == AtParEnums_4.AppTransactionStatus.statUnload.toString()) {
                                                _this.lstDBData[i].CURRENT_EVENT = "Unload";
                                            }
                                        }
                                        if (isFromUnlock == AtParEnums_4.YesNo_Enum.Y.toString()) {
                                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Package(s) released Successfully.' });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.showGrid = false;
                                        if (isFromUnlock == AtParEnums_4.YesNo_Enum.N.toString()) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        else if (isFromUnlock == AtParEnums_4.YesNo_Enum.Y.toString()) {
                                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Package(s) released Successfully.' });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "GetPackageDetails");
                        this.showGrid = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReleasePackagesComponent.prototype.unlockRow = function (event, data) {
        try {
            this.growlMessage = [];
            if (event == true) {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].TRANSACTION_ID == data.TRANSACTION_ID) {
                        this.lstDBData[i].Status = true;
                        this.lstDBData[i].CHK_VALUE = "1";
                    }
                }
            }
            else {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].TRANSACTION_ID == data.TRANSACTION_ID) {
                        this.lstDBData[i].Status = false;
                        this.lstDBData[i].CHK_VALUE = "0";
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unlockRow");
        }
    };
    ReleasePackagesComponent.prototype.UnlockSelectedRecords = function () {
        var _this = this;
        try {
            this.transactionIdlist = '';
            this.UserIdlist = '';
            for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].CHK_VALUE === "1") {
                    this.transactionIdlist = this.transactionIdlist.concat(this.lstDBData[i].TRANSACTION_ID + ",");
                    this.UserIdlist = this.UserIdlist.concat(this.lstDBData[i].UID + ",");
                }
            }
            if (this.transactionIdlist != '' || this.transactionIdlist != undefined) {
                this.transactionIdlist = this.transactionIdlist.replace(/,\s*$/, ""); //this removes last unwanted comma
            }
            if (this.UserIdlist != '' || this.UserIdlist != undefined) {
                this.UserIdlist = this.UserIdlist.replace(/,\s*$/, ""); //this removes last unwanted comma
            }
            if (this.transactionIdlist === "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Order(s) to unlock" });
                return;
            }
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: "Are you sure you want to unlock the Order(s) ?",
                accept: function () {
                    _this.GetPackageDetails('Y', _this.transactionIdlist, _this.UserIdlist, AtParEnums_4.YesNo_Enum.Y.toString());
                },
                reject: function () {
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "UnlockSelectedRecords");
        }
    };
    ReleasePackagesComponent.prototype.checkAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].Status = true;
                    this.lstgridfilterData[i].CHK_VALUE = "1";
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].Status = true;
                    this.lstDBData[i].CHK_VALUE = "1";
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    ReleasePackagesComponent.prototype.uncheckAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].Status = false;
                    this.lstgridfilterData[i].CHK_VALUE = '0';
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].Status = false;
                    this.lstDBData[i].CHK_VALUE = '0';
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "uncheckAll");
        }
    };
    /**
     * removing values in string  contains comma separated values
     * @param list
     * @param value
     * @param separator
     */
    ReleasePackagesComponent.prototype.removeTransactionId = function (list, value, separator) {
        try {
            separator = separator || ",";
            var values = list.split(separator);
            for (var i = 0; i < values.length; i++) {
                if (values[i] == value) {
                    values.splice(i, 1);
                    return values.join(separator);
                }
            }
            return list;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "removeTransactionId");
        }
    };
    ReleasePackagesComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ReleasePackagesComponent = __decorate([
        core_1.Component({
            templateUrl: 'deliver-release-packages.component.html',
            providers: [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, deliver_release_packages_service_component_1.ReleasePackagesServiceComponent, AtParConstants_1.AtParConstants, AtParSharedDataService_1.AtParSharedDataService, api_1.ConfirmationService],
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http, datatableservice_1.datatableservice,
            atpar_common_service_1.AtParCommonService,
            deliver_release_packages_service_component_1.ReleasePackagesServiceComponent,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            router_1.Router,
            router_1.ActivatedRoute,
            AtParSharedDataService_1.AtParSharedDataService,
            api_1.ConfirmationService])
    ], ReleasePackagesComponent);
    return ReleasePackagesComponent;
}());
exports.ReleasePackagesComponent = ReleasePackagesComponent;
//# sourceMappingURL=deliver-release-packages.component.js.map