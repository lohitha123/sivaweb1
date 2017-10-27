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
var atpar_manage_devices_service_1 = require("./atpar-manage-devices.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var AtParWebApiResponse_1 = require("../Shared/AtParWebApiResponse");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var MT_ATPAR_DEVICE_DETAILS_1 = require("../Entities/MT_ATPAR_DEVICE_DETAILS");
var MT_ATPAR_SECURITY_AUDIT_1 = require("../Entities/MT_ATPAR_SECURITY_AUDIT");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var ManageDevicesComponent = (function () {
    function ManageDevicesComponent(dataservice, mngDevicesService, httpService, spinnerService, commonService, atParConstant, leftBarAnimationService) {
        this.dataservice = dataservice;
        this.mngDevicesService = mngDevicesService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.leftBarAnimationService = leftBarAnimationService;
        this.table = false;
        this.form = false;
        this.addDetails = false;
        this.editDetails = false;
        this.showDevStatus = false;
        this._deviceTokenEntry = [];
        this.auditSatus = "";
        this.growlMessage = [];
        this.showAddButton = true;
        this.deviceDetails = new MT_ATPAR_DEVICE_DETAILS_1.MT_ATPAR_DEVICE_DETAILS();
        this.ddlStatusType = [];
        this.oldDescription = "";
        this.disableDevStatus = false;
        this.loading = true;
        this.disabled = false;
        this.isChangeStatus = false;
        this.helptext = "Allows alphabets, numbers and special characters except (. , / \\ [ ] ' _)";
        this.breadCrumbMenu = new routepath_1.Menus();
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    ManageDevicesComponent.prototype.edit = function (device) {
        this.editDetails = true;
        this.addDetails = false;
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Device';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.deviceDetails = new MT_ATPAR_DEVICE_DETAILS_1.MT_ATPAR_DEVICE_DETAILS();
        this.table = false;
        this.form = true;
        this.showDevStatus = false;
        this.deviceDetails.DEVICE_ID = device.DEVICE_ID;
        this.deviceDetails.DESCRIPTION = device.DESCRIPTION;
        this.oldDescription = device.DESCRIPTION;
        this.deviceDetails.MAC_ADDRESS = device.MAC_ADDRESS;
        this.deviceDetails.STATUS = device.STATUS;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString();
        this.showAddButton = false;
        this.disableDevStatus = true;
        this.loading = false;
        this.disabled = true;
        this.oldMacAddress = device.MAC_ADDRESS;
        this.descStatus = 0;
        this.macAddressStatus = 0;
    };
    ManageDevicesComponent.prototype.add = function () {
        this.addDetails = true;
        this.editDetails = false;
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Device';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.deviceDetails.DEVICE_ID = "";
        this.deviceDetails = new MT_ATPAR_DEVICE_DETAILS_1.MT_ATPAR_DEVICE_DETAILS();
        this.table = false;
        this.form = true;
        this.showDevStatus = false;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString();
        this.showAddButton = false;
        this.disabled = false;
        this.loading = true;
        this.descStatus = 1;
        this.macAddressStatus = 1;
        this.deviceIDStatus = 1;
    };
    ManageDevicesComponent.prototype.close = function () {
        this.table = false;
        this.form = false;
        this.showAddButton = true;
        this.disableDevStatus = false;
        this.pDeviceSearch = "";
        this.growlMessage = [];
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
    };
    ManageDevicesComponent.prototype.ngOnInit = function () {
        try {
            this.ddlStatusType.push({ label: 'All', value: null });
            this.ddlStatusType.push({ label: 'Active', value: true });
            this.ddlStatusType.push({ label: 'Inactive', value: false });
            this.pageSize = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
            this.appID = (AtParEnums_1.EnumApps.Auth).toString();
            this.menuCode = localStorage.getItem("menuCode") != null ? localStorage.getItem("menuCode") : 'mt_atpar_manage_devices.aspx';
            this.checkAuditAllowed();
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "ngOnInit");
        }
    };
    ManageDevicesComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ManageDevicesComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var webresp_1, exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        webresp_1 = new AtParWebApiResponse_1.AtParWebApiResponse();
                        return [4 /*yield*/, this.commonService.getAuditAllowed(this.appID, this.menuCode)
                                .catch(this.httpService.handleError).then(function (res) {
                                webresp_1 = res.json();
                                _this.spinnerService.stop();
                                switch (webresp_1.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.auditSatus = webresp_1.Data;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (webresp_1.StatusCode == 1102002) {
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp_1.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp_1.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp_1.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_1 = _a.sent();
                        this.clientErrorMsg(exMsg_1, "checkAuditAllowed");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageDevicesComponent.prototype.BindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exMsg_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.table = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.mode == "Edit") {
                            this.showAddButton = true;
                        }
                        this.spinnerService.start();
                        if (this.pDeviceSearch == null || this.pDeviceSearch == undefined || this.pDeviceSearch === "") {
                            this.pDeviceSearch = "";
                        }
                        return [4 /*yield*/, this.mngDevicesService.getDevIDs(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.pDeviceSearch)
                                .catch(this.httpService.handleError)
                                .then(function (resp) {
                                var webresp = resp.json();
                                _this.spinnerService.stop();
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        _this.lstDevices = webresp.DataList;
                                        _this.table = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.table = false;
                                        _this.isChangeStatus = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: "warn", summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.table = false;
                                        _this.isChangeStatus = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: "info", summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.table = false;
                                        _this.isChangeStatus = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: "error", summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_2 = _a.sent();
                        this.clientErrorMsg(exMsg_2, "BindDataGrid");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageDevicesComponent.prototype.changeStatus = function (device) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var webresp, exMsg_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (device.STATUS == true) {
                            this.changeDevStatus = "ACTIVE";
                        }
                        else {
                            this.changeDevStatus = "INACTIVE";
                        }
                        this.growlMessage = [];
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        webresp = new AtParWebApiResponse_1.AtParWebApiResponse();
                        return [4 /*yield*/, this.mngDevicesService.updateDeviceStatus(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], device.DEVICE_ID, this.changeDevStatus)
                                .catch(this.httpService.handleError).then(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
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
                                        case 1: return [4 /*yield*/, this.BindDataGrid()];
                                        case 2:
                                            _b.sent();
                                            this.growlMessage = [];
                                            this.statusMessage = "Status Changed Successfully";
                                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: this.statusMessage });
                                            return [3 /*break*/, 5];
                                        case 3:
                                            this.BindDataGrid();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                            return [3 /*break*/, 5];
                                        case 4:
                                            this.BindDataGrid();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                            return [3 /*break*/, 5];
                                        case 5:
                                            this.spinnerService.stop();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_3 = _a.sent();
                        this.clientErrorMsg(exMsg_3, "changeStatus");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageDevicesComponent.prototype.saveDevice = function () {
        var _this = this;
        this.growlMessage = [];
        try {
            this.spinnerService.start();
            this.mngDevicesService.saveDevice(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceDetails.DEVICE_ID, this.deviceDetails.DESCRIPTION, this.deviceDetails.MAC_ADDRESS)
                .catch(this.httpService.handleError).map(function (webresp) { return webresp.json(); }).subscribe(function (webresp) {
                _this.spinnerService.stop();
                switch (webresp.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        _this.growlMessage = [];
                        _this.statusMessage = "Device " + _this.deviceDetails.DEVICE_ID + " Created Successfully";
                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMessage });
                        _this.deviceDetails = new MT_ATPAR_DEVICE_DETAILS_1.MT_ATPAR_DEVICE_DETAILS();
                        _this.deviceDetails.DEVICE_ID = "";
                        _this.deviceDetails.DESCRIPTION = "";
                        _this.deviceDetails.MAC_ADDRESS = "";
                        _this.loading = true;
                        _this.showAddButton = false;
                        _this.table = false;
                        document.getElementById('DEVICE_ID').focus();
                        _this.deviceIDStatus = 1;
                        _this.descStatus = 1;
                        _this.macAddressStatus = 1;
                        break;
                    }
                    case AtParEnums_1.StatusType.Error: {
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Warn: {
                        _this.growlMessage = [];
                        if (webresp.StatusCode === AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION)
                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "DeviceID " + _this.deviceDetails.DEVICE_ID + " already exists " });
                        else
                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Custom: {
                        _this.growlMessage = [];
                        if (webresp.StatusCode === AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION)
                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: "DeviceID " + _this.deviceDetails.DEVICE_ID + " already exists " });
                        else
                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "saveDevice");
        }
    };
    ManageDevicesComponent.prototype.updateDevice = function () {
        var _this = this;
        this.showAddButton = false;
        this.table = false;
        this.growlMessage = [];
        try {
            var webresp_2 = new AtParWebApiResponse_1.AtParWebApiResponse();
            this.spinnerService.start();
            this.mngDevicesService.updateDevice(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceDetails.DEVICE_ID, this.deviceDetails.DESCRIPTION, this.oldMacAddress, this.deviceDetails.MAC_ADDRESS)
                .catch(this.httpService.handleError).then(function (resp) {
                webresp_2 = resp.json();
                _this.spinnerService.stop();
                switch (webresp_2.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        _this.growlMessage = [];
                        _this.statusMessage = "Device Updated Successfully";
                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMessage });
                        document.getElementById('DESCRIPTION').focus();
                        _this.lstAuditData = new Array();
                        if (_this.oldDescription != _this.deviceDetails.DESCRIPTION) {
                            _this.auditData = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                            _this.auditData.FIELD_NAME = "DESCRIPTION";
                            _this.auditData.OLD_VALUE = _this.oldDescription;
                            _this.auditData.NEW_VALUE = _this.deviceDetails.DESCRIPTION;
                            _this.auditData.KEY_1 = _this.deviceDetails.DEVICE_ID;
                            _this.auditData.KEY_2 = _this.deviceDetails.DESCRIPTION;
                            _this.auditData.KEY_3 = _this.deviceDetails.MAC_ADDRESS;
                            _this.auditData.KEY_4 = '';
                            _this.auditData.KEY_5 = '';
                            _this.lstAuditData.push(_this.auditData);
                            if (_this.auditSatus == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                                _this.spinnerService.start();
                                _this.commonService.insertAuditData(_this.lstAuditData, _this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], _this.menuCode).
                                    catch(_this.httpService.handleError).then(function (res) {
                                    var response = res.json();
                                    _this.spinnerService.stop();
                                    switch (response.StatType) {
                                        case AtParEnums_1.StatusType.Success: {
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Warn: {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error: {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Custom: {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                            break;
                                        }
                                    }
                                });
                            }
                        }
                        document.getElementById('DEVICE_ID').focus();
                        break;
                    }
                    case AtParEnums_1.StatusType.Error: {
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp_2.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Warn: {
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp_2.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Custom: {
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp_2.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "updateDevice");
        }
    };
    ManageDevicesComponent.prototype.ngOnDestroy = function () {
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstDevices = null;
        this.lstAuditData = null;
        this.auditData = null;
        this.deviceDetails = null;
        this.ddlStatusType = null;
        this.oldDescription = "";
        this.disableDevStatus = false;
        this.deviceIDStatus = undefined;
        this.descStatus = undefined;
        this.macAddressStatus = undefined;
    };
    ManageDevicesComponent.prototype.bindModelDataChange = function (event) {
        try {
            if ("DEVICE_ID" == event.TextBoxID.toString()) {
                this.deviceIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("DESCRIPTION" == event.TextBoxID.toString()) {
                this.descStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("MAC_ADDRESS" == event.TextBoxID.toString()) {
                this.macAddressStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString()) {
                if (this.deviceIDStatus == 0 && this.descStatus == 0 && this.macAddressStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString()) {
                if (this.descStatus == 0 && this.macAddressStatus == 0) {
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
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], ManageDevicesComponent.prototype, "dataTableComponent", void 0);
    ManageDevicesComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-manage-devices.component.html',
            providers: [datatableservice_1.datatableservice, atpar_manage_devices_service_1.ManageDevicesService, HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            atpar_manage_devices_service_1.ManageDevicesService,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            AtParConstants_1.AtParConstants,
            leftbar_animation_service_1.LeftBarAnimationService])
    ], ManageDevicesComponent);
    return ManageDevicesComponent;
}());
exports.ManageDevicesComponent = ManageDevicesComponent;
//# sourceMappingURL=atpar-manage-devices.component.js.map