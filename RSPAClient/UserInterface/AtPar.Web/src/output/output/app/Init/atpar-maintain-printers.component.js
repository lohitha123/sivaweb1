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
var http_1 = require("@angular/http");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var mt_atpar_setup_pro_printeres_1 = require("../entities/mt_atpar_setup_pro_printeres");
var AtParEnums_2 = require("../Shared/AtParEnums");
var api_1 = require("../components/common/api");
var atpar_maintain_printers_service_1 = require("../../app/Init/atpar-maintain-printers.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var Rx_1 = require("rxjs/Rx");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var platform_browser_1 = require("@angular/platform-browser");
var linq_es5_1 = require("linq-es5");
var MaintainPrinters = (function () {
    function MaintainPrinters(spinnerService, atParCommonService, httpService, confirmationService, maintainPrinterServices, atParConstant, document, http) {
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.confirmationService = confirmationService;
        this.maintainPrinterServices = maintainPrinterServices;
        this.atParConstant = atParConstant;
        this.document = document;
        this.http = http;
        this.growlMessage = [];
        this.lstAppsData = [];
        this.lstPrinters = [];
        this.lstFilterPrinters = [];
        this.showMainPage = true;
        this.lstPrinterModels = [];
        this.lstFunctionalities = [];
        this.lstModels = [];
        this.lstPrinterTypes = [];
        this.PrinterData = new mt_atpar_setup_pro_printeres_1.MT_ATPAR_SETUP_PRO_PRINTERES();
        this.lstPrinterData = [];
        this.lstPrinterModelsData = [];
        this.lstFunctionalitiesData = [];
        this.lstModelsData = [];
        this.lstLinkedFunctionalities = [];
        this.showIPAddressRow = true;
        this.showNewModel = false;
        this.showMultipleModel = false;
        this.showExistedImage = false;
        this.lstModelImages = [];
        this.blnCheckPrinterExists = false;
        this.blnFileUpload = true;
        this.lstFiles = [];
        this.goNext = true;
        this.txtIPadd = undefined;
        this.txtPort = undefined;
        this.txtFriendlyName = undefined;
        this.txtHeight = undefined;
        this.txtWidth = undefined;
        this.buttonEnableDisable = true;
        this.oldFriendlyName = '';
        this.ddlStatusType = [];
        this.focusdropdown = true;
        this.refstatus = false;
        this.selectedFile = '';
        this.btnupdate = false;
        this.selectedsrpstatus = "";
        this.selectedStatusValue = "";
        this.grdstatus = false;
        this.breadCrumbMenu = new routepath_1.Menus();
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    MaintainPrinters.prototype.ngOnInit = function () {
        this.pazeSize = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.getApps();
        // this.GetStatusdrp();
        this.ddlStatusType = [];
        this.ddlStatusType.push({ label: 'All', value: '' });
        this.ddlStatusType.push({ label: 'Active', value: true });
        this.ddlStatusType.push({ label: 'InActive', value: false });
    };
    //============= GETTING DROPDOWN DATA=============//
    MaintainPrinters.prototype.getApps = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getApps(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.spinnerService.stop();
                                _this.lstAppsData = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstAppsData.push({ label: 'Select One', value: 'Select One' });
                                        for (var i = 0; i < res.DataList.length; i++) {
                                            if (i != 0) {
                                                if (res.DataList[i].APP_ID != AtParEnums_2.EnumApps.Reports) {
                                                    _this.lstAppsData.push({ label: (res.DataList[i].APP_NAME), value: res.DataList[i].APP_ID });
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "getApps");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //============= GETTING DROPDOWN DATA END=========//
    //GetStatusdrp() {
    //    this.ddlStatusType = [];
    //    this.ddlStatusType.push({ label: 'All', value: null });
    //    this.ddlStatusType.push({ label: 'Active', value: true });
    //    this.ddlStatusType.push({ label: 'InActive', value: false });
    //}
    MaintainPrinters.prototype.ddlAppChnage = function () {
        this.lstPrinters = [];
        this.grdstatus = false;
    };
    MaintainPrinters.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.grdstatus = false;
                        //this.ddlStatusType = [];
                        this.selectedsrpstatus = "";
                        this.selectedStatusValue = "";
                        // this.GetStatusdrp();
                        if (this.dataTableComponent != undefined) {
                            this.dataTableComponent.reset();
                        }
                        this.spinnerService.start();
                        if (this.selectedApp == undefined || this.selectedApp == 'Select One') {
                            this.selectedApp = '';
                        }
                        if (this.printerName == undefined) {
                            this.printerName = '';
                        }
                        return [4 /*yield*/, this.atParCommonService.getPrintersData(this.selectedApp, this.printerName).then(function (result) {
                                var res = result.json();
                                _this.lstPrinters = [];
                                _this.spinnerService.stop();
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.grdstatus = true;
                                        if (_this.refstatus == false) {
                                            _this.growlMessage = [];
                                        }
                                        else {
                                            _this.refstatus = false;
                                            //  this.btnupdate = false;
                                            //this.growlMessage = [];
                                        }
                                        _this.lstPrinters = res.DataList;
                                        for (var i = 0; i < _this.lstPrinters.length; i++) {
                                            _this.lstPrinters[i].ActiveStatus = _this.lstPrinters[i].STATUS == "1" ? true : false;
                                        }
                                        _this.lstFilterPrinters = _this.lstPrinters;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "btnGo_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MaintainPrinters.prototype.selectItemtoChangeStatus = function (e, item) {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (e) {
                            item.ActiveStatus = true;
                            status = 1;
                        }
                        else {
                            item.ActiveStatus = false;
                            status = 0;
                        }
                        return [4 /*yield*/, this.updatePrinterStatus(item.APP_ID, item.FRIENDLY_NAME, item.LABEL_TYPE, status)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MaintainPrinters.prototype.btnAdd_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Setup Printer';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.showMainPage = false;
                        this.Mode = 'Add';
                        this.showMultipleModel = false;
                        this.showNewModel = false;
                        this.showExistedImage = false;
                        this.PrinterData = new mt_atpar_setup_pro_printeres_1.MT_ATPAR_SETUP_PRO_PRINTERES();
                        this.lstPrinterModels.push({ label: 'Select One', value: 'Select One' });
                        this.lstFunctionalities.push({ label: 'Select One', value: 'Select One' });
                        this.lstModels.push({ label: 'Select One', value: 'Select One' });
                        this.lstPrinterTypes.push({ label: 'Select One', value: 'Select One' });
                        this.buttonEnableDisable = true;
                        this.focusdropdown = true;
                        this.grdstatus = false;
                        return [4 /*yield*/, this.getPrinterModels()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MaintainPrinters.prototype.getPrinterModels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.maintainPrinterServices.getPrinterModels().then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.spinnerService.stop();
                                _this.lstPrinterModels = [];
                                _this.lstPrinterModelsData = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstPrinterModelsData = res.DataList;
                                        _this.lstPrinterModels.push({ label: 'Select One', value: 'Select One' });
                                        for (var i = 0; i < res.DataList.length; i++) {
                                            _this.lstPrinterModels.push({ label: res.DataList[i].NAME, value: res.DataList[i].CODE });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "getPrinterModels");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MaintainPrinters.prototype.getFunctionalities = function (selectedProduct) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.maintainPrinterServices.getFunctionalities(selectedProduct).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstFunctionalitiesData = [];
                                _this.lstFunctionalities = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstFunctionalitiesData = res.DataList;
                                        _this.lstFunctionalities.push({ label: 'Select One', value: 'Select One' });
                                        for (var i = 0; i < res.DataList.length; i++) {
                                            _this.lstFunctionalities.push({ label: res.DataList[i].LABEL_DESCRIPTION, value: res.DataList[i].LABEL_TYPE });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "getFunctionalities");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MaintainPrinters.prototype.ddlProduct_SelectedIndexChanged = function (selectedProduct) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.txtIPadd = undefined;
                        this.txtPort = undefined;
                        this.txtFriendlyName = undefined;
                        if (!(selectedProduct != 'Select One')) return [3 /*break*/, 2];
                        this.lstFunctionalities = [];
                        return [4 /*yield*/, this.getFunctionalities(selectedProduct)];
                    case 1:
                        _a.sent();
                        this.PrinterData.PRINTER_CODE = '';
                        this.lstPrinterTypes = [];
                        this.PrinterData.NETWORK_TYPE = '';
                        this.lstPrinterTypes.push({ label: 'Select One', value: 'Select One' });
                        this.PrinterData.IP_ADDRESS = '';
                        this.PrinterData.PORT_NO = ''; // '';
                        this.PrinterData.FRIENDLY_NAME = '';
                        this.PrinterData.LABEL_TYPE = 0; //'';
                        this.lstLinkedFunctionalities = [];
                        this.lstModels = [];
                        this.lstModels.push({ label: 'Select One', value: 'Select One' });
                        this.PrinterData.MODEL = '';
                        this.showExistedImage = false;
                        this.showMultipleModel = false;
                        this.showNewModel = false;
                        this.labelHeight = '';
                        this.labelWidth = '';
                        return [3 /*break*/, 3];
                    case 2:
                        this.PrinterData.LABEL_TYPE = 'Select One';
                        _a.label = 3;
                    case 3:
                        this.buttonEnableDisable = this.dropDownValidations();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "ddlProduct_SelectedIndexChanged");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MaintainPrinters.prototype.ddlPrinterModel_SelectedIndexChanged = function (selectedPModel) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.txtIPadd = undefined;
                        this.txtPort = undefined;
                        this.txtFriendlyName = undefined;
                        if (!(selectedPModel != 'Select One')) return [3 /*break*/, 2];
                        this.PrinterData.NETWORK_TYPE = '';
                        this.PrinterData.IP_ADDRESS = '';
                        this.PrinterData.PORT_NO = '';
                        this.PrinterData.FRIENDLY_NAME = '';
                        this.PrinterData.LABEL_TYPE = 0; //printer Model
                        this.lstModels = [];
                        this.PrinterData.MODEL = '';
                        this.lstModels.push({ label: 'Select One', value: 'Select One' });
                        //m_dsPrinterModels = ViewState("m_dsPrinterModels")
                        this.lstPrinterTypes = [];
                        this.showExistedImage = false;
                        this.showNewModel = false;
                        this.showMultipleModel = false;
                        return [4 /*yield*/, this.bindPrinterType(selectedPModel)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.PrinterData.NETWORK_TYPE = 'Select One';
                        _a.label = 3;
                    case 3:
                        this.buttonEnableDisable = this.dropDownValidations();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "ddlPrinterModel_SelectedIndexChanged");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MaintainPrinters.prototype.ddlPrinterType_SelectedIndexChanged = function (selectedPrinterType) {
        if (selectedPrinterType != 'Select One') {
            if (selectedPrinterType == 'BlueTooth') {
                this.showIPAddressRow = false;
                this.PrinterData.IP_ADDRESS = '';
            }
            else {
                this.showIPAddressRow = true;
            }
        }
        this.buttonEnableDisable = this.dropDownValidations();
    };
    ;
    MaintainPrinters.prototype.ddlFunctionality_SelectedIndexChanged = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var selectedFunctionality;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selectedFunctionality = e.label;
                        this.PrinterData.FUNCTIONALITY = e.label;
                        this.PrinterData.MODEL = 'Select One';
                        this.showExistedImage = false;
                        this.showNewModel = false;
                        this.showMultipleModel = false;
                        if (!(selectedFunctionality != 'Select One')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.bindLinkFunctionalities(selectedFunctionality)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.buttonEnableDisable = this.dropDownValidations();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    MaintainPrinters.prototype.bindLinkFunctionalities = function (selectedFunctionality) {
        return __awaiter(this, void 0, void 0, function () {
            var i, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.lstFunctionalitiesData.length)) return [3 /*break*/, 4];
                        if (!(this.lstFunctionalitiesData[i].LABEL_DESCRIPTION == selectedFunctionality)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getLinkedFunctionalities(this.lstFunctionalitiesData[i].APP_ID, this.lstFunctionalitiesData[i].LABEL_TYPE)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "bindLinkFunctionalities");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MaintainPrinters.prototype.getLinkedFunctionalities = function (appID, labelType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var result1_1, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.maintainPrinterServices.getLinkedFunctionalities(appID, labelType).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstLinkedFunctionalities = [];
                                result1_1 = res.StatType;
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        // ViewState("dsListBox2") = _dsListBox2
                                        _this.lstLinkedFunctionalities = res.DataList;
                                        for (var i = 0; i < _this.lstLinkedFunctionalities.length; i++) {
                                            _this.lstLinkedFunctionalities[i].WIDTH_ID = 'txtWidth' + i;
                                            _this.lstLinkedFunctionalities[i].HEIGHT_ID = 'txtHeight' + i;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (!(result1_1 == AtParEnums_2.StatusType.Success)) return [3 /*break*/, 3];
                        if (this.PrinterData.PRINTER_CODE == '' || this.PrinterData.PRINTER_CODE == undefined || this.PrinterData.PRINTER_CODE == 'Select One') {
                            this.PrinterData.PRINTER_CODE = '-1';
                        }
                        return [4 /*yield*/, this.bindModels(this.PrinterData.APP_ID, this.PrinterData.LABEL_TYPE, this.PrinterData.PRINTER_CODE)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "getLinkedFunctionalities");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MaintainPrinters.prototype.ddlModel_SelectedIndexChanged = function (selectedModel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(selectedModel != 'Select One')) return [3 /*break*/, 4];
                        this.showNewModel = false;
                        this.showMultipleModel = false;
                        this.showExistedImage = false;
                        if (!(selectedModel == 'New Model')) return [3 /*break*/, 1];
                        //ViewState("ListBox1") =ddlFunctionality.SelectedValue;// this.PrinterData.LABEL_TYPE;
                        if (this.lstLinkedFunctionalities.length > 0) {
                            this.showNewModel = false;
                            this.showMultipleModel = true;
                        }
                        else {
                            this.labelHeight = '';
                            this.labelWidth = '';
                            this.showNewModel = true;
                        }
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.bindModelImage(this.PrinterData.APP_ID, this.PrinterData.MODEL, this.PrinterData.LABEL_TYPE, this.PrinterData.PRINTER_CODE)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        this.selectedFile = '';
                        if (this.lstLinkedFunctionalities != null && this.lstLinkedFunctionalities != undefined) {
                            if (this.lstLinkedFunctionalities.length > 0) {
                                this.lstLinkedFunctionalities[0].file = null;
                            }
                        }
                        this.showNewModel = false;
                        this.showMultipleModel = false;
                        this.showExistedImage = false;
                        _a.label = 5;
                    case 5:
                        this.buttonEnableDisable = this.dropDownValidations();
                        return [2 /*return*/];
                }
            });
        });
    };
    MaintainPrinters.prototype.bindModelImage = function (appID, model, labelType, printerCode) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.maintainPrinterServices.getModelImage(appID, model, labelType, printerCode).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstModelImages = [];
                                _this.showExistedImage = true;
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstModelImages = res.DataList;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "bindModelImage");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MaintainPrinters.prototype.bindModels = function (appID, labelType, printerCode) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.maintainPrinterServices.getModels(appID, labelType, printerCode).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstModels = [];
                                _this.lstModelsData = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstModelsData = res.DataList;
                                        _this.lstModels.push({ label: 'Select One', value: 'Select One' });
                                        for (var i = 0; i < res.DataList.length; i++) {
                                            _this.lstModels.push({ label: res.DataList[i], value: res.DataList[i] });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                                _this.lstModels.push({ label: 'New Model', value: 'New Model' });
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, "bindModels");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MaintainPrinters.prototype.bindPrinterType = function (selectedPModel) {
        try {
            var filterRow;
            for (var i = 0; i < this.lstPrinterModelsData.length; i++) {
                if (this.lstPrinterModelsData[i].CODE == selectedPModel) {
                    filterRow = this.lstPrinterModelsData[i];
                    break;
                }
            }
            this.lstPrinterTypes = [];
            this.lstPrinterTypes.push({ label: 'Select One', value: 'Select One' });
            if (filterRow != undefined) {
                if (filterRow.TYPE == 'Mobile') {
                    this.lstPrinterTypes.push({ label: 'Mobile', value: 'Mobile' });
                    this.lstPrinterTypes.push({ label: 'BlueTooth', value: 'BlueTooth' });
                }
                else {
                    this.lstPrinterTypes.push({ label: filterRow.TYPE, value: filterRow.TYPE });
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindPrinterType");
        }
    };
    MaintainPrinters.prototype.btnEditPrinter_Click = function (editPrinter) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Printer';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.showMainPage = false;
                        this.Mode = 'Edit';
                        this.editPrinterData = editPrinter;
                        this.oldFriendlyName = editPrinter.FRIENDLY_NAME;
                        this.PrinterData = editPrinter;
                        this.focusdropdown = false;
                        this.buttonEnableDisable = false;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.getPrinterModels()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getFunctionalities(this.PrinterData.APP_ID)];
                    case 2:
                        _a.sent();
                        //getAppName(this.PrinterData.APP_ID)        No NEED
                        return [4 /*yield*/, this.bindPrinterType(this.PrinterData.PRINTER_CODE)];
                    case 3:
                        //getAppName(this.PrinterData.APP_ID)        No NEED
                        _a.sent();
                        if (this.PrinterData.NETWORK_TYPE == 'BlueTooth') {
                            this.showIPAddressRow = false;
                        }
                        else {
                            this.showIPAddressRow = true;
                            this.txtIPadd = 0;
                        }
                        this.txtFriendlyName = 0;
                        this.txtPort = 0;
                        return [4 /*yield*/, this.bindLinkFunctionalities(editPrinter.FUNCTIONALITY)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.bindModels(editPrinter.APP_ID, editPrinter.LABEL_TYPE, editPrinter.PRINTER_CODE)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.bindModelImage(editPrinter.APP_ID, editPrinter.MODEL, editPrinter.LABEL_TYPE, editPrinter.PRINTER_CODE)];
                    case 6:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 8];
                    case 7:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "btnEditPrinter_Click");
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    MaintainPrinters.prototype.btnSave_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var result1_2, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        if (this.PrinterData.MODEL == 'New Model') {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Upload the Model' });
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        this.saveOrUpdateDetails();
                        return [4 /*yield*/, this.maintainPrinterServices.savePrinterDetails(this.lstPrinterData).then(function (result) {
                                _this.growlMessage = [];
                                _this.spinnerService.stop();
                                var res = result.json();
                                result1_2 = res.StatType;
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Printer Friendly Name - ' + _this.PrinterData.FRIENDLY_NAME + ' Created Successfully' });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                                _this.atParConstant.scrollToTop();
                            })];
                    case 1:
                        _a.sent();
                        if (result1_2 == AtParEnums_2.StatusType.Success) {
                            this.txtIPadd = null;
                            this.txtPort = null;
                            this.txtFriendlyName = null;
                            this.PrinterData.APP_ID = 'Select One';
                            this.PrinterData.PRINTER_CODE = 'Select One';
                            this.PrinterData.NETWORK_TYPE = 'Select One';
                            this.PrinterData.MODEL = 'Select One';
                            this.PrinterData.IP_ADDRESS = '';
                            this.PrinterData.PORT_NO = '';
                            this.PrinterData.FRIENDLY_NAME = '';
                            this.lstFunctionalities = [];
                            this.lstFunctionalities.push({ label: 'Select One', value: 'Select One' });
                            this.showExistedImage = false;
                            this.lstModelImages = [];
                            this.lstLinkedFunctionalities = [];
                            this.buttonEnableDisable = this.dropDownValidations();
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12, "btnSave_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MaintainPrinters.prototype.btnUpdate_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    if (this.PrinterData.MODEL == 'New Model') {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Upload the Model' });
                        return [2 /*return*/];
                    }
                    this.blnCheckPrinterExists = false;
                    if (this.PrinterData.FRIENDLY_NAME != undefined) {
                        if (this.oldFriendlyName != this.PrinterData.FRIENDLY_NAME) {
                            this.blnCheckPrinterExists = true;
                        }
                        this.saveOrUpdateDetails();
                        this.spinnerService.start();
                        this.maintainPrinterServices.updatePrinterDetails(this.oldFriendlyName, this.blnCheckPrinterExists, this.lstPrinterData).then(function (result) {
                            _this.growlMessage = [];
                            _this.spinnerService.stop();
                            var res = result.json();
                            switch (res.StatType) {
                                case AtParEnums_2.StatusType.Success: {
                                    // this.btnupdate = true;
                                    //  this.btnGo_Click();
                                    _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Printer Friendly Name - ' + _this.PrinterData.FRIENDLY_NAME + ' Updated Successfully' });
                                    break;
                                }
                                case AtParEnums_2.StatusType.Warn: {
                                    if (res.StatusCode == AtParStatusCodes_1.AtparStatusCodes.S_DATAEXISTS_INTABLE) {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage.split("1%")[0] + " " + _this.PrinterData.FRIENDLY_NAME + " " + res.StatusMessage.split("1%")[1] });
                                    }
                                    else {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                    }
                                    break;
                                }
                                case AtParEnums_2.StatusType.Error: {
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                    break;
                                }
                                case AtParEnums_2.StatusType.Custom: {
                                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                    break;
                                }
                            }
                            _this.atParConstant.scrollToTop();
                        });
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "btnUpdate_Click");
                }
                return [2 /*return*/];
            });
        });
    };
    MaintainPrinters.prototype.saveOrUpdateDetails = function () {
        try {
            this.lstPrinterData = [];
            this.PrinterData.STATUS = "1";
            this.PrinterData.UPDATE_DATE = new Date();
            this.PrinterData.USER_ID = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
            if (this.lstLinkedFunctionalities.length > 0) {
                for (var i = 0; i < this.lstLinkedFunctionalities.length; i++) {
                    this.PrinterData.LABEL_FILE_NAME = this.PrinterData.APP_ID + "_" + this.PrinterData.PRINTER_CODE + "_" + this.lstLinkedFunctionalities[i].LABEL_LNK_TYPE + "_" + this.PrinterData.MODEL;
                    this.PrinterData.LABEL_TYPE = this.lstLinkedFunctionalities[i].LABEL_TYPE;
                    this.PrinterData.LINKED_LABEL_TYPE = this.lstLinkedFunctionalities[i].LABEL_LNK_TYPE;
                    this.lstPrinterData.push(this.PrinterData);
                }
            }
            else {
                this.PrinterData.LABEL_FILE_NAME = this.PrinterData.APP_ID + "_" + this.PrinterData.PRINTER_CODE + "_" + this.PrinterData.LABEL_TYPE + "_" + this.PrinterData.MODEL;
                this.PrinterData.LABEL_TYPE = this.PrinterData.LABEL_TYPE;
                this.PrinterData.LINKED_LABEL_TYPE = 0;
                this.PrinterData.FRIENDLY_NAME = (this.PrinterData.FRIENDLY_NAME).trim();
                this.PrinterData.IP_ADDRESS = (this.PrinterData.IP_ADDRESS).trim();
                this.lstPrinterData.push(this.PrinterData);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "saveOrUpdateDetails");
        }
    };
    MaintainPrinters.prototype.updatePrinterStatus = function (appID, friendlyName, labelType, status) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.maintainPrinterServices.updatePrinterStatus(appID, friendlyName, labelType, status).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.spinnerService.stop();
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        //this.btnGo_Click();
                                        //this.refstatus = true;
                                        if (_this.selectedStatusValue.toString() == 'Active') {
                                            _this.lstPrinters = linq_es5_1.asEnumerable(_this.lstPrinters).Where(function (x) { return x.ActiveStatus == true; }).ToArray();
                                        }
                                        else if (_this.selectedStatusValue.toString() == 'InActive') {
                                            _this.lstPrinters = linq_es5_1.asEnumerable(_this.lstPrinters).Where(function (x) { return x.ActiveStatus == false; }).ToArray();
                                        }
                                        else {
                                            _this.lstPrinters = _this.lstPrinters;
                                        }
                                        if (status == 3) {
                                            for (var i = 0; i < _this.lstPrinters.length; i++) {
                                                if (_this.lstPrinters[i].APP_ID == appID && _this.lstPrinters[i].FRIENDLY_NAME == friendlyName && _this.lstPrinters[i].LABEL_TYPE == labelType) {
                                                    var index = _this.lstPrinters.indexOf(_this.lstPrinters[i], 0);
                                                    _this.lstPrinters.splice(index, 1);
                                                }
                                            }
                                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Printer Friendly Name - ' + friendlyName + " Deleted Successfully" });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Printer Friendly Name - ' + friendlyName + "  Status Updated Successfully" });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13, "updatePrinterStatus");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MaintainPrinters.prototype.btnDeletePrinter_Click = function (item) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to delete the Printer ' + item.PRINTER_NAME,
            accept: function () {
                _this.updatePrinterStatus(item.APP_ID, item.FRIENDLY_NAME, item.LABEL_TYPE, 3);
            }
        });
    };
    MaintainPrinters.prototype.btnBack_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.breadCrumbMenu.SUB_MENU_NAME = '';
                this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                this.showMainPage = true;
                this.lstPrinters = [];
                this.selectedApp = '';
                this.printerName = '';
                this.lstLinkedFunctionalities = [];
                this.lstFunctionalities = [];
                this.lstModels = [];
                this.lstPrinterModels = [];
                this.lstPrinterTypes = [];
                this.showExistedImage = false;
                this.grdstatus = false;
                // await this.btnGo_Click();
                this.growlMessage = [];
                return [2 /*return*/];
            });
        });
    };
    MaintainPrinters.prototype.selectFile = function (event) {
        var fileList = event.target.files;
        this.lstFiles = fileList;
        this.selectedFile = event.target.files[0].name;
    };
    MaintainPrinters.prototype.selectMultipleFiles = function (event, item) {
        var file = event.target.files;
        item.file = file;
        item.SELECTED_FILE = event.target.files[0].name;
    };
    MaintainPrinters.prototype.fileUpload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var formData, devicetoken, myConsystem, userID, i, headers, options, apiUrl, ex_14, file, headers, options, apiUrl, ex_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.strLvx = "B";
                        this.strPnl = "A";
                        this.getModels = 'M' + (this.lstModelsData.length + 1);
                        this.goNext = true;
                        this.growlMessage = [];
                        //if (this.Mode == 'Edit') {
                        //    //InsertNewModels;
                        //}
                        if (this.PrinterData.PRINTER_CODE == '' || this.PrinterData.PRINTER_CODE == undefined || this.PrinterData.PRINTER_CODE == 'Select One') {
                            this.PrinterData.PRINTER_CODE = '-1';
                        }
                        formData = new FormData();
                        devicetoken = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        if (devicetoken != null) {
                            myConsystem = devicetoken[AtParEnums_1.TokenEntry_Enum.SystemId].toString();
                            userID = devicetoken[AtParEnums_1.TokenEntry_Enum.UserID].toString();
                        }
                        if (!(this.lstLinkedFunctionalities.length > 0)) return [3 /*break*/, 5];
                        this.lstFiles = [];
                        for (i = 0; i < this.lstLinkedFunctionalities.length; i++) {
                            if (this.lstLinkedFunctionalities[i].file == undefined || this.lstLinkedFunctionalities[i].LABEL_Height == '' ||
                                this.lstLinkedFunctionalities[i].LABEL_WIDTH == '' || this.lstLinkedFunctionalities[i].LABEL_Height == undefined ||
                                this.lstLinkedFunctionalities[i].LABEL_WIDTH == undefined) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter the Label Size/Upload file' });
                                this.goNext = false;
                                break;
                            }
                            else {
                                formData.append('uploadFile', this.lstLinkedFunctionalities[i].file[0]);
                                formData.append('width', this.lstLinkedFunctionalities[i].LABEL_WIDTH);
                                formData.append('height', this.lstLinkedFunctionalities[i].LABEL_Height);
                                formData.append('labelLinkType', this.lstLinkedFunctionalities[i].LABEL_LNK_TYPE.toString());
                            }
                        }
                        if (!this.goNext) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        headers = new http_1.Headers();
                        headers.append('Authorization', 'bearer');
                        headers.append('enctype', 'multipart/form-data');
                        options = new http_1.RequestOptions({ headers: headers });
                        apiUrl = this.httpService.BaseUrl + "/api/MaintainPrinter/UploadMultipleFiles?_strLvx=" + this.strLvx + "&_strPnl=" + this.strPnl + "&getModels=" + this.getModels
                            + "&appID=" + this.PrinterData.APP_ID + "&printerCode=" + this.PrinterData.PRINTER_CODE + "&functionality=" + this.PrinterData.LABEL_TYPE + "&userID=" + this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]
                            + "&conSystemID=" + myConsystem + "&UserId=" + userID;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.http.post(apiUrl, formData, options)
                                .catch(function (error) { return Rx_1.Observable.throw(error); })
                                .subscribe(function (result) {
                                var res = result.json();
                                _this.spinnerService.stop();
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.resetDropdowns(res.StatType);
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                                for (var i = 0; i < _this.lstLinkedFunctionalities.length; i++) {
                                    _this.lstLinkedFunctionalities[i].SELECTED_FILE = '';
                                }
                            }, function (error) { return console.log(error); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_14 = _a.sent();
                        this.clientErrorMsg(ex_14, "fileUpload");
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 10];
                    case 5:
                        if (!(this.labelWidth == undefined || this.labelWidth == '' || this.labelHeight == '' || this.labelHeight == undefined || this.lstFiles.length == 0)) return [3 /*break*/, 6];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter the Label Size/Upload file' });
                        return [3 /*break*/, 10];
                    case 6:
                        if (!(this.lstFiles.length > 0)) return [3 /*break*/, 10];
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        file = this.lstFiles[0];
                        formData.append('uploadFile', file, file.name);
                        headers = new http_1.Headers();
                        headers.append('Authorization', 'bearer');
                        headers.append('enctype', 'multipart/form-data');
                        options = new http_1.RequestOptions({ headers: headers });
                        apiUrl = this.httpService.BaseUrl + "/api/MaintainPrinter/UploadSingleFile?_strLvx=" + this.strLvx + "&_strPnl=" + this.strPnl + "&getModels=" + this.getModels + "&labelWidth=" + this.labelWidth
                            + "&labelHeight=" + this.labelHeight + "&appID=" + this.PrinterData.APP_ID + "&printerCode=" + this.PrinterData.PRINTER_CODE + "&functionality=" + this.PrinterData.LABEL_TYPE + "&userID=" + this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]
                            + "&conSystemID=" + myConsystem + "&UserId=" + userID;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.http.post(apiUrl, formData, options)
                                .catch(function (error) { return Rx_1.Observable.throw(error); })
                                .subscribe(function (result) {
                                var res = result.json();
                                _this.spinnerService.stop();
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.resetDropdowns(res.StatType);
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                                _this.selectedFile = '';
                            }, function (error) { return console.log(error); })];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        ex_15 = _a.sent();
                        this.clientErrorMsg(ex_15, "fileUpload");
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    MaintainPrinters.prototype.resetDropdowns = function (status) {
        return __awaiter(this, void 0, void 0, function () {
            var e, ex_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        if (!(this.Mode != 'Edit')) return [3 /*break*/, 3];
                        this.PrinterData.LABEL_TYPE = this.PrinterData.LABEL_TYPE;
                        e = ({ 'label': this.PrinterData.FUNCTIONALITY });
                        return [4 /*yield*/, this.ddlFunctionality_SelectedIndexChanged(e)];
                    case 1:
                        _a.sent();
                        this.PrinterData.MODEL = this.getModels;
                        return [4 /*yield*/, this.ddlModel_SelectedIndexChanged(this.PrinterData.MODEL)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, this.getFunctionalities(this.PrinterData.APP_ID)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.bindModels(this.PrinterData.APP_ID, this.PrinterData.LABEL_TYPE, this.PrinterData.PRINTER_CODE)];
                    case 5:
                        _a.sent();
                        this.PrinterData.MODEL = this.getModels;
                        return [4 /*yield*/, this.bindModelImage(this.PrinterData.APP_ID, this.getModels, this.PrinterData.LABEL_TYPE, this.PrinterData.PRINTER_CODE)];
                    case 6:
                        _a.sent();
                        this.showMultipleModel = false;
                        this.showNewModel = false;
                        this.buttonEnableDisable = this.dropDownValidations();
                        _a.label = 7;
                    case 7:
                        if (!(status = AtParEnums_2.StatusType.Success)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'File Uploaded successfully' })];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        ex_16 = _a.sent();
                        this.clientErrorMsg(ex_16, "resetDropdowns");
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    MaintainPrinters.prototype.bindModelDataChange = function (event) {
        if ("IPadd" == event.TextBoxID.toString()) {
            this.txtIPadd = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Port" == event.TextBoxID.toString()) {
            this.txtPort = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("FriendlyName" == event.TextBoxID.toString()) {
            this.txtFriendlyName = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        this.textBoxValidation();
    };
    MaintainPrinters.prototype.textBoxValidation = function () {
        if (this.showNewModel || this.showMultipleModel) {
            this.buttonEnableDisable = true;
        }
        else {
            if (this.showIPAddressRow && this.txtIPadd == 0 && this.txtPort == 0 && this.txtFriendlyName == 0 && this.PrinterData.FRIENDLY_NAME.trim() != '' && this.PrinterData.IP_ADDRESS.trim() != '') {
                this.buttonEnableDisable = this.dropDownValidations();
            }
            else if (!this.showIPAddressRow && this.txtPort == 0 && this.txtFriendlyName == 0 && this.PrinterData.FRIENDLY_NAME.trim() != '') {
                this.buttonEnableDisable = this.dropDownValidations();
            }
            else {
                this.buttonEnableDisable = true;
            }
        }
    };
    MaintainPrinters.prototype.dropDownValidations = function () {
        if ((this.PrinterData.APP_ID == 'Select One' || this.PrinterData.APP_ID == undefined || this.PrinterData.APP_ID == "")) {
            return true;
        }
        if (this.PrinterData.PRINTER_CODE == 'Select One' || this.PrinterData.PRINTER_CODE == undefined || this.PrinterData.PRINTER_CODE == "") {
            return true;
        }
        if (this.PrinterData.NETWORK_TYPE == 'Select One' || this.PrinterData.NETWORK_TYPE == undefined || this.PrinterData.NETWORK_TYPE == "") {
            return true;
        }
        if (this.PrinterData.LABEL_TYPE == 'Select One' || this.PrinterData.LABEL_TYPE == undefined || this.PrinterData.LABEL_TYPE == 0) {
            return true;
        }
        if (this.PrinterData.MODEL == 'Select One' || this.PrinterData.MODEL == undefined || this.PrinterData.MODEL == "") {
            return true;
        }
        if (this.showNewModel || this.showMultipleModel) {
            return true;
        }
        else {
            if (this.showIPAddressRow && this.txtIPadd == 0 && this.txtPort == 0 && this.txtFriendlyName == 0 && this.PrinterData.FRIENDLY_NAME.trim() != '' && this.PrinterData.IP_ADDRESS.trim() != '') {
                return false;
            }
            else if (!this.showIPAddressRow && this.txtPort == 0 && this.txtFriendlyName == 0 && this.PrinterData.FRIENDLY_NAME.trim() != '') {
                return false;
            }
            else {
                return true;
            }
        }
    };
    MaintainPrinters.prototype.txtLabels_Keyup = function (e, lstLinkLabels) {
        try {
            if (e.target.value == '') {
                this.buttonEnableDisable = true;
            }
            else {
                for (var i = 0; i < lstLinkLabels.length; i++) {
                    if (lstLinkLabels[i].LABEL_WIDTH == undefined || lstLinkLabels[i].LABEL_WIDTH == null || lstLinkLabels[i].LABEL_WIDTH == ''
                        || lstLinkLabels[i].LABEL_Height == undefined || lstLinkLabels[i].LABEL_Height == null || lstLinkLabels[i].LABEL_Height == '') {
                        this.buttonEnableDisable = true;
                        break;
                    }
                    else {
                        this.buttonEnableDisable = false;
                        this.buttonEnableDisable = this.dropDownValidations();
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "txtLabels_Keyup");
        }
    };
    MaintainPrinters.prototype.ddlStatusOnchange = function (evtdata, filed, filterMatchMode) {
        try {
            //asEnumerable(this.lstGridHdrData).Where(x => x.VENDOR_ID == this.lstGridDtlsData[i].VENDOR_ID && x.TRANSACTION_ID == this.lstGridDtlsData[i].TRANSACTION_ID && x.DEPARTMENT_ID == this.lstGridDtlsData[i].DEPARTMENT_ID).FirstOrDefault();
            this.selectedStatusValue = evtdata;
            if (evtdata.toString() == 'Active') {
                this.lstPrinters = linq_es5_1.asEnumerable(this.lstFilterPrinters).Where(function (x) { return x.ActiveStatus == true; }).ToArray();
            }
            else if (evtdata.toString() == 'InActive') {
                this.lstPrinters = linq_es5_1.asEnumerable(this.lstFilterPrinters).Where(function (x) { return x.ActiveStatus == false; }).ToArray();
            }
            else {
                this.lstPrinters = this.lstFilterPrinters;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlStatusOnchange");
        }
    };
    MaintainPrinters.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    MaintainPrinters.prototype.ngOnDestroy = function () {
        this.PrinterData = null;
        this.lstAppsData = null;
        this.lstFunctionalities = null;
        this.lstFunctionalitiesData = null;
        this.lstLinkedFunctionalities = null;
        this.lstModelImages = null;
        this.lstModels = null;
        this.labelHeight = '';
        this.labelWidth = '';
        this.lstPrinterData = [];
        this.lstPrinterModels = [];
        this.lstPrinterModelsData = [];
        this.lstPrinters = [];
        this.lstPrinterTypes = [];
        this.printerName = '';
        this.selectedApp = '';
        this.ven = null;
        this._deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], MaintainPrinters.prototype, "dataTableComponent", void 0);
    MaintainPrinters = __decorate([
        core_1.Component({
            templateUrl: 'atpar-maintain-printers.component.html',
            providers: [atpar_common_service_1.AtParCommonService, api_1.ConfirmationService, atpar_maintain_printers_service_1.MaintainPrinterServices, AtParConstants_1.AtParConstants]
        }),
        __param(6, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            api_1.ConfirmationService,
            atpar_maintain_printers_service_1.MaintainPrinterServices,
            AtParConstants_1.AtParConstants, Object, http_1.Http])
    ], MaintainPrinters);
    return MaintainPrinters;
}());
exports.MaintainPrinters = MaintainPrinters;
//# sourceMappingURL=atpar-maintain-printers.component.js.map