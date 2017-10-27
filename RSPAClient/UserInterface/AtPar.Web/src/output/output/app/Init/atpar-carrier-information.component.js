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
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var api_1 = require("../components/common/api");
var atpar_carrier_information_services_1 = require("./atpar-carrier-information.services");
var routepath_1 = require("../AtPar/Menus/routepath");
var AtParCarrierInformationComponent = (function () {
    function AtParCarrierInformationComponent(spnrService, httpService, carrierInfoService, commonService, confirmationService, atParConstant) {
        this.spnrService = spnrService;
        this.httpService = httpService;
        this.carrierInfoService = carrierInfoService;
        this.commonService = commonService;
        this.confirmationService = confirmationService;
        this.atParConstant = atParConstant;
        //Variables
        this.form = false;
        this.table = true;
        this.btnGetCarrierVisible = true;
        this.grdGetCarrier = false;
        this.buttonEnableDisable = true;
        this.deviceTokenEntry = [];
        this.statusMsgs = [];
        this.txtCarrier = "";
        this.txtDescription = "";
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    AtParCarrierInformationComponent.prototype.add = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Carrier';
        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.statusMsgs = [];
        this.txtCarrier = "";
        this.txtDescription = "";
        this.txtDescStatus = null;
        this.txtCarrierStatus = null;
        this.form = true;
        this.table = false;
        this.buttonEnableDisable = true;
    };
    AtParCarrierInformationComponent.prototype.close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.statusMsgs = [];
        this.form = false;
        this.table = true;
    };
    AtParCarrierInformationComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.intAppId = parseInt(this.appId);
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.recordsPerPageSize = parseInt(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage]);
                        return [4 /*yield*/, this.page_Load()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AtParCarrierInformationComponent.prototype.page_Load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strEnterpriseSystem_1, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.statusMsgs = [];
                        strEnterpriseSystem_1 = "";
                        this.spnrService.start();
                        return [4 /*yield*/, this.commonService.getEnterpriseSystem().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                strEnterpriseSystem_1 = data.Data;
                                _this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        //Give Application and menu id's here
                        if (typeof this.appId == 'undefined') {
                            this.intAppId = 0;
                        }
                        else {
                            this.intAppId = parseInt(this.appId);
                        }
                        if (strEnterpriseSystem_1.toString().toUpperCase() != AtParEnums_1.Enterprise_Enum[AtParEnums_1.Enterprise_Enum.Peoplesoft].toString().toUpperCase()) {
                            //"PeopleSoft"
                            this.btnGetCarrierVisible = false;
                        }
                        return [4 /*yield*/, this.bindDataGrid()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "page_Load");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AtParCarrierInformationComponent.prototype.bindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        this.spnrService.start();
                        return [4 /*yield*/, this.carrierInfoService.getCarriersData().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.carriersDataLst = res.json().DataList,
                                    _this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (_this.carriersDataLst.length > 0) {
                                            _this.grdGetCarrier = true;
                                            for (var i = 0; i < _this.carriersDataLst.length; i++) {
                                                if (_this.carriersDataLst[i].LOCAL_FLAG.toString().toUpperCase() == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y]) {
                                                    _this.carriersDataLst[i].LOCAL_FLAG = true;
                                                }
                                                else if (_this.carriersDataLst[i].LOCAL_FLAG.toString().toUpperCase() == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N]) {
                                                    _this.carriersDataLst[i].LOCAL_FLAG = false;
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "bindDataGrid");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AtParCarrierInformationComponent.prototype.btnGetCarriers_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.grdGetCarrier = false;
                    this.statusMsgs = [];
                    this.getCarriers();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "btnGetCarriers_Click");
                }
                return [2 /*return*/];
            });
        });
    };
    AtParCarrierInformationComponent.prototype.getCarriers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.statusMsgs = [];
                        this.spnrService.start();
                        return [4 /*yield*/, this.carrierInfoService.getCarriers(this.deviceTokenEntry).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.bindDataGrid()];
                    case 2:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "getCarriers");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AtParCarrierInformationComponent.prototype.saveCarriers_Info = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sCIdspace, sCDescrspace, sDescr, sCarrierId, strArr, sNoEntry;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    sCIdspace = 0;
                    sCDescrspace = 0;
                    sDescr = "";
                    sCarrierId = "";
                    strArr = [];
                    sCarrierId = this.txtCarrier;
                    sDescr = this.txtDescription;
                    strArr = sCarrierId.split(" ");
                    if (strArr.length - 1 > 0) {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Carrier Id" });
                        return [2 /*return*/];
                    }
                    else if (sCarrierId.length == 0 && sDescr.length == 0) {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Carrier id and Description are mandatory" });
                        return [2 /*return*/];
                    }
                    else if (sCarrierId.trim().length == 0 || sDescr.trim().length == 0) {
                        sNoEntry = "";
                        if (sCarrierId.trim().length == 0) {
                            sNoEntry = "Carrier Id";
                        }
                        else if (sDescr.trim().length == 0) {
                            sNoEntry = "Description";
                        }
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid " + sNoEntry + "" });
                        return [2 /*return*/];
                    }
                    else if (sCarrierId.length > 0 && sDescr.length > 0) {
                        sCIdspace = sCarrierId.length - sCarrierId.trim().length;
                        sCDescrspace = sDescr.length - sDescr.trim().length;
                        if (sCIdspace > 0 && sCDescrspace > 0) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Carrier Id and Description" });
                            return [2 /*return*/];
                        }
                        else {
                            this.addCarriers(sCarrierId.toUpperCase(), sDescr);
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "saveCarriers_Info");
                }
                return [2 /*return*/];
            });
        });
    };
    AtParCarrierInformationComponent.prototype.addCarriers = function (carrierId, description) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        this.spnrService.start();
                        return [4 /*yield*/, this.carrierInfoService.addCarrier(carrierId, description, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.bindDataGrid();
                                        //this.form = false;
                                        //this.table = true;
                                        var msg = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Carrier").replace("2%", carrierId);
                                        _this.statusMsgs.push({
                                            severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg
                                        });
                                        _this.spnrService.stop();
                                        _this.txtCarrier = "";
                                        _this.txtDescription = "";
                                        _this.txtDescStatus = null;
                                        _this.txtCarrierStatus = null;
                                        _this.buttonEnableDisable = true;
                                        document.getElementById('Carrier').focus();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        var resmsg = "";
                                        //  resmsg = response.StatusMessage.toString().replace("1%", carrierId.toString());
                                        resmsg = "Carrier " + carrierId.toString() + " Already Exists";
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resmsg });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "addCarriers");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AtParCarrierInformationComponent.prototype.deleteCarriers_Data = function (selectedRowData) {
        return __awaiter(this, void 0, void 0, function () {
            var itemName, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        itemName = selectedRowData.CARRIER_ID;
                        return [4 /*yield*/, this.deleteConfirm(itemName)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "deleteCarriers_Data");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AtParCarrierInformationComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spnrService, strExMsg.toString(), funName, this.constructor.name);
    };
    AtParCarrierInformationComponent.prototype.bindModelDataChange = function (event) {
        if ("Carrier" == event.TextBoxID.toString()) {
            this.txtCarrierStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("Description" == event.TextBoxID.toString()) {
            this.txtDescStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        //validations satisfies r not 
        if (this.txtCarrierStatus == 0 && this.txtDescStatus == 0 && this.txtDescription.trim().length != 0) {
            this.buttonEnableDisable = false;
        }
        else {
            this.buttonEnableDisable = true;
        }
    };
    AtParCarrierInformationComponent.prototype.deleteConfirm = function (carrierId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var successData;
            return __generator(this, function (_a) {
                try {
                    successData = false;
                    this.statusMsgs = [];
                    this.confirmationService.confirm({
                        message: "Are you sure you want to delete  " + carrierId + "?",
                        accept: function () {
                            _this.spnrService.start();
                            _this.delete_method(carrierId);
                        }
                    });
                    this.spnrService.stop();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "deleteConfirm");
                }
                return [2 /*return*/];
            });
        });
    };
    AtParCarrierInformationComponent.prototype.delete_method = function (carrierId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.carrierInfoService.deleteCarriers(carrierId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).
                            catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var data, _a, msg;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        data = res.json();
                                        this.statType = res.json().StatType;
                                        _a = data.StatType;
                                        switch (_a) {
                                            case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                            case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 3];
                                            case AtParEnums_1.StatusType.Error: return [3 /*break*/, 4];
                                            case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 5];
                                        }
                                        return [3 /*break*/, 6];
                                    case 1: return [4 /*yield*/, this.GetDetails()];
                                    case 2:
                                        _b.sent();
                                        msg = AtParConstants_1.AtParConstants.Deleted_Msg.replace("1%", "Carrier").replace("2%", carrierId);
                                        this.statusMsgs.push({
                                            severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg
                                        });
                                        this.spnrService.stop();
                                        return [3 /*break*/, 6];
                                    case 3:
                                        {
                                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            return [3 /*break*/, 6];
                                        }
                                        _b.label = 4;
                                    case 4:
                                        {
                                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            return [3 /*break*/, 6];
                                        }
                                        _b.label = 5;
                                    case 5:
                                        {
                                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            return [3 /*break*/, 6];
                                        }
                                        _b.label = 6;
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AtParCarrierInformationComponent.prototype.GetDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bindDataGrid()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AtParCarrierInformationComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.statusMsgs = null;
        this.carriersDataLst = null;
        this.txtCarrier = null;
        this.txtDescription = null;
        this.recordsPerPageSize = null;
        this.intAppId = null;
        this.statType = null;
        this.grdGetCarrier = null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AtParCarrierInformationComponent.prototype, "appId", void 0);
    AtParCarrierInformationComponent = __decorate([
        core_1.Component({
            selector: 'atpar-carrier-information',
            templateUrl: 'atpar-carrier-information.component.html',
            providers: [HttpService_1.HttpService, atpar_carrier_information_services_1.AtParCarrierInformationService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, api_1.ConfirmationService],
        }),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            HttpService_1.HttpService,
            atpar_carrier_information_services_1.AtParCarrierInformationService,
            atpar_common_service_1.AtParCommonService,
            api_1.ConfirmationService,
            AtParConstants_1.AtParConstants])
    ], AtParCarrierInformationComponent);
    return AtParCarrierInformationComponent;
}());
exports.AtParCarrierInformationComponent = AtParCarrierInformationComponent;
//# sourceMappingURL=atpar-carrier-information.component.js.map