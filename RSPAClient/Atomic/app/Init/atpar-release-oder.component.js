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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
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
var core_1 = require("@angular/core");
var atpar_release__orders_service_1 = require("./atpar-release -orders.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var mt_atpar_transaction_1 = require("../../app/Entities/mt_atpar_transaction");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var HttpService_1 = require("../Shared/HttpService");
var AtParConstants_1 = require("../Shared/AtParConstants");
var api_1 = require("../components/common/api");
var ReleaseOrdersComponent = (function () {
    function ReleaseOrdersComponent(atParReleaseOrdersServices, spinnerService, commonService, httpService, atParConstant, confirmationService) {
        this.atParReleaseOrdersServices = atParReleaseOrdersServices;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.confirmationService = confirmationService;
        this.hasSingleOrgGroups = false;
        this.blnStatusMsg = false;
        this.orgGrpId = "";
        this.blnShowOrgGroupLabel = false;
        this.ddlOrglst = [];
        this.lstOrgGroups = [];
        this.selectedOrgGroupId = "";
        this.blnShowOrgGroupDD = false;
        this.growlMessage = [];
        this.deviceTokenEntry = [];
        this.businessDatangModel = "";
        this.ddlBusinessData = [];
        this.purchaseOrder = "";
        this.showGrid = false;
        this.startIndex = 0;
        this.endIndex = 10;
        this.lstReleaseOrdersData1 = new mt_atpar_transaction_1.MT_ATPAR_TRANSACTION();
        this.previousSelected = '';
    }
    ReleaseOrdersComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.intAppId = parseInt(this.appId);
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        sessionStorage.getItem("Recordsstartindex");
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.endIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        this.ddlBusinessData.push({ label: "Select Bunit ", value: "" });
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReleaseOrdersComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.spinnerService.stop();
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    ReleaseOrdersComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.deviceTokenEntry).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        // this.ddlBusinessData.push({ label: "Select Bunit ", value: "" })
                                        _this.blnStatusMsg = false;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + "_" + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            //  + "_" + this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.populateBusinessUnits();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_NAME + "-" + _this.orgGroupData[i].ORG_GROUP_ID, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: 'warn', detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: 'error', detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: 'info', detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReleaseOrdersComponent.prototype.ddlOrgGrpIdChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.businessDatangModel = "";
                    this.ddlBusinessData = [];
                    this.growlMessage = [];
                    this.ddlBusinessData.push({ label: "Select Bunit ", value: "" });
                    if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == "") {
                        //this.ddlBusinessData = [];
                        this.ddlBusinessData = [];
                        this.ddlBusinessData.push({ label: "Select Bunit ", value: "" });
                        this.showGrid = false;
                        return [2 /*return*/];
                    }
                    if (this.previousSelected == "" || event.label != this.previousSelected) {
                        this.previousSelected = this.selectedOrgGroupId;
                        this.spinnerService.start();
                        this.populateBusinessUnits();
                        this.spinnerService.stop();
                    }
                }
                catch (ex) {
                    this.spinnerService.stop();
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    ReleaseOrdersComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isOrgBUnitsExist = false;
                        this.showGrid = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("_")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.deviceTokenEntry, this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.AllBunits).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                _this.ddlBusinessData = [];
                                _this.ddlBusinessData.push({ label: "Select Bunit ", value: "" });
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.lstBusinessData = data.DataList;
                                            if (_this.lstBusinessData.length >= 1) {
                                                for (var i = 0; i < _this.lstBusinessData.length; i++) {
                                                    _this.ddlBusinessData.push({ label: _this.lstBusinessData[i].toString(), value: _this.lstBusinessData[i].toString() });
                                                }
                                            }
                                            else {
                                                // this.growlMessage.push({ severity: 'warn', summary: 'warn', detail: "No Assigned Org Business Units" });
                                                //isOrgBUnitsExist = false;
                                                break;
                                            }
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn: {
                                        // this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: 'warn', detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        //this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: 'error', detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        // this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: 'info', detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [2 /*return*/, Promise.resolve(isOrgBUnitsExist)];
                    case 3:
                        ex_3 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReleaseOrdersComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        if (this.orgGrpId == null || this.orgGrpId === "" || this.orgGrpId == undefined) {
                            if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == "") {
                                this.ddlBusinessData = [];
                                this.ddlBusinessData.push({ label: "Select Bunit ", value: "" });
                                this.statusMesssage = " Please Select valid Org Group ID";
                                this.showGrid = false;
                                this.growlMessage.push({ severity: 'warn', summary: 'warn', detail: this.statusMesssage });
                                return [2 /*return*/];
                            }
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.getRelOrderDetails()];
                    case 1:
                        _a.sent();
                        this.spinnerService.start();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReleaseOrdersComponent.prototype.getRelOrderDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParReleaseOrdersServices.getRelOrderDetails(this.intAppId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.businessDatangModel, this.purchaseOrder, this.orgGroupIDForDBUpdate, false, this.deviceTokenEntry)
                                .then(function (resp) {
                                _this.spinnerService.stop();
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.lstReleaseOrdersData = resp.DataList;
                                            if (_this.lstReleaseOrdersData.length > 0) {
                                                for (var i = 0; i < _this.lstReleaseOrdersData.length; i++) {
                                                    _this.lstReleaseOrdersData[i].check_value = false;
                                                    var changeDate = _this.lstReleaseOrdersData[i].DOWNLOAD_DT_TIME.replace('T', ' ');
                                                    _this.lstReleaseOrdersData[i].DOWNLOAD_DT_TIME = new Date(changeDate).toLocaleString();
                                                    //let datechange = this.lstReleaseOrdersData[i].DOWNLOAD_DT_TIME.split(',');
                                                    //let newdate = this.lstReleaseOrdersData[i].DOWNLOAD_DT_TIME.split(',')[0] + " " +
                                                    //    this.lstReleaseOrdersData[i].DOWNLOAD_DT_TIME.split(',')[1]
                                                    _this.lstReleaseOrdersData[i].DOWNLOAD_DT_TIME = _this.lstReleaseOrdersData[i].DOWNLOAD_DT_TIME.replace(',', ' ');
                                                    // changeDate = changeDate.replace(",", "");
                                                    //  this.lstReleaseOrdersData[i].DOWNLOAD_DT_TIME = changeDate;
                                                    _this.upDateUserID = _this.lstReleaseOrdersData[i].UID;
                                                }
                                                _this.showGrid = true;
                                            }
                                            else {
                                                _this.showGrid = false;
                                            }
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'error', summary: 'error', detail: resp.StatusMessage });
                                            _this.showGrid = false;
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: 'warn', detail: resp.StatusMessage });
                                            _this.showGrid = false;
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Custom:
                                        {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'info', summary: 'info', detail: resp.StatusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReleaseOrdersComponent.prototype.updateRelOrderDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParReleaseOrdersServices.updateRelOrderDetails(this.intAppId, this.upDateUserID, this.businessDatangModel, this.purchaseOrder, this.orgGroupIDForDBUpdate, " ", this.strTransId, this.deviceTokenEntry)
                                .then(function (resp) {
                                _this.spinnerService.stop();
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.lstReleaseOrdersData = resp.DataList;
                                            if (_this.lstReleaseOrdersData.length > 0) {
                                                for (var i = 0; i < _this.lstReleaseOrdersData.length; i++) {
                                                    _this.lstReleaseOrdersData[i].check_value = false;
                                                }
                                                _this.showGrid = true;
                                                _this.purchaseOrder = "";
                                            }
                                            else {
                                                _this.showGrid = false;
                                                _this.purchaseOrder = "";
                                            }
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.lstReleaseOrdersData = [];
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'error', summary: 'error', detail: resp.StatusMessage });
                                            _this.showGrid = false;
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.lstReleaseOrdersData = [];
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: 'warn', detail: resp.StatusMessage });
                                            _this.showGrid = false;
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Custom:
                                        {
                                            _this.lstReleaseOrdersData = [];
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'info', summary: 'info', detail: resp.StatusMessage });
                                            _this.showGrid = false;
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
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReleaseOrdersComponent.prototype.changeStatus = function (releaseOrderData) {
        try {
            var releaseOrderDataChecked = releaseOrderData;
            for (var x = 0; x < releaseOrderDataChecked.length; x++) {
                if (releaseOrderDataChecked[x].check_value == true) {
                }
                else {
                    releaseOrderDataChecked[x].check_value = false;
                }
            }
            this.spinnerService.stop();
        }
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex);
        }
    };
    ReleaseOrdersComponent.prototype.checkAll = function () {
        try {
            this.lstCheckedRelease = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.endIndex = this.startIndex + this.pageSize;
            if (this.endIndex > this.lstReleaseOrdersData.length) {
                this.endIndex = this.lstReleaseOrdersData.length;
            }
            for (var i = this.startIndex; i <= this.endIndex - 1; i++) {
                this.lstReleaseOrdersData[i].check_value = true;
            }
        }
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex);
        }
    };
    ReleaseOrdersComponent.prototype.unCheckAll = function () {
        try {
            this.lstCheckedRelease = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.endIndex = this.startIndex + this.pageSize;
            if (this.endIndex > this.lstReleaseOrdersData.length) {
                this.endIndex = this.lstReleaseOrdersData.length;
            }
            for (var i = this.endIndex - 1; i >= this.startIndex; i--) {
                this.lstReleaseOrdersData[i].check_value = false;
            }
        }
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex);
        }
    };
    ReleaseOrdersComponent.prototype.btnUnlockBtm_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.strTransId = "";
                    for (i = 0; i < this.lstReleaseOrdersData.length; i++) {
                        if (this.lstReleaseOrdersData[i].check_value) {
                            this.strTransId += this.lstReleaseOrdersData[i].TRANSACTION_ID + ',';
                        }
                    }
                    if (this.strTransId == "" || this.strTransId == undefined || this.strTransId == null) {
                        this.growlMessage = [];
                        this.statusMesssage = "Please select Order(s) to unlock";
                        this.growlMessage.push({ severity: 'warn', summary: 'warn', detail: this.statusMesssage });
                    }
                    else {
                        this.confirm();
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    ReleaseOrdersComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstCheckedRelease = null;
        this.orgGroupData = null;
        this.lstBusinessData = null;
        this.intAppId = null;
        this.startIndex = null;
        this.endIndex = null;
        this.selectedOrgGroupId = null;
        this.orgGroupIDForDBUpdate = null;
        this.ddlOrglst = null;
        this.lstOrgGroups = null;
        this.lstReleaseOrdersData = null;
        this.orgGrpId = null;
        this.growlMessage = null;
        this.businessDatangModel = null;
        this.purchaseOrder = null;
        this.strTransId = "";
        this.spinnerService.stop();
    };
    ReleaseOrdersComponent.prototype.confirm = function () {
        var _this = this;
        this.growlMessage = [];
        this.confirmationService.confirm({
            message: 'Are you sure you want to unlock the Order(s) ?',
            accept: function () {
                _this.updateRelOrderDetails();
            }
        });
    };
    ReleaseOrdersComponent.prototype.onSort = function (event) {
        try {
            if (event.data != null && event.data.length > 0) {
                for (var x = 0; x < event.data.length; x++) {
                    event.data[x].check_value = false;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    return ReleaseOrdersComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ReleaseOrdersComponent.prototype, "appId", void 0);
ReleaseOrdersComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'atpar-release-Orders',
        templateUrl: 'atpar-release-orders.component.html',
        providers: [event_spinner_service_1.SpinnerService, atpar_release__orders_service_1.AtParReleaseOrdersServices, atpar_common_service_1.AtParCommonService, HttpService_1.HttpService, AtParConstants_1.AtParConstants, api_1.ConfirmationService]
    }),
    __metadata("design:paramtypes", [atpar_release__orders_service_1.AtParReleaseOrdersServices,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        HttpService_1.HttpService,
        AtParConstants_1.AtParConstants,
        api_1.ConfirmationService])
], ReleaseOrdersComponent);
exports.ReleaseOrdersComponent = ReleaseOrdersComponent;
//# sourceMappingURL=atpar-release-oder.component.js.map