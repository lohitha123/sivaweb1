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
/// <reference path="../../shared/tkithttpservice.ts" />
var core_1 = require("@angular/core");
var trackit_view_cart_service_1 = require("./trackit-view-cart.service");
var AtParEnums_1 = require("../../Shared/AtParEnums");
var tkithttpservice_1 = require("../../Shared/tkithttpservice");
var AtParConstants_1 = require("../../Shared/AtParConstants");
var event_spinner_service_1 = require("../../components/spinner/event.spinner.service");
var atpar_trackit_common_service_1 = require("../../Shared/atpar-trackit-common.service");
var router_1 = require("@angular/router");
var routepath_1 = require("../../AtPar/Menus/routepath");
var api_1 = require("../../components/common/api");
var platform_browser_1 = require("@angular/platform-browser");
var ViewCartComponent = (function () {
    function ViewCartComponent(service, spinnerService, atParCommonService, httpService, atParConstant, title, confirmationService, route, router) {
        this.service = service;
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.title = title;
        this.confirmationService = confirmationService;
        this.route = route;
        this.router = router;
        this.oncountbuttonclicked = new core_1.EventEmitter();
        this.tkitDeviceTokenEntry = [];
        this.selectedEqpmtType = "";
        this.lstFilteredItems = [];
        this.orgGrpID = "";
        this.orgGrpIDData = "";
        this.lstItems = [];
        this.lstLocations = [];
        this.selectedLocation = "";
        this.blnShowPatientsPopup = false;
        this.blnShowCard = false;
        this.ordernumber = null;
        this.trackItAppId = AtParEnums_1.EnumApps.TrackIT;
        this.eqpIndicator = "";
        this.orderComments = "";
        this.container = false;
        this.blnShowPatientCharge = false;
        this.blnShowItemImage = false;
        this.blnShowQtyAvailable = false;
        this.blnShowSelectQty = false;
        this.blnShowDueDateTime = false;
        this.blnShowAvailableTo = false;
        this.blnShowReturnDateTime = false;
        this.defaultReportDuration = 25;
        this.requestorDefaultLocation = "";
        this.strCurrentDate = "";
        this.imgBasePath = "";
        this.title.setTitle('TrackIT - View Cart');
    }
    ViewCartComponent.prototype.addDays = function (theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    };
    ViewCartComponent.prototype.patientPopupClose = function () {
        this.blnShowPatientsPopup = false;
        this.blnShowCard = true;
    };
    ViewCartComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.blnShowPatientsPopup = false;
                        this.blnShowCard = true;
                        this.container = false;
                        this.currentDate = new Date();
                        this.tkitDeviceTokenEntry = JSON.parse(localStorage.getItem("tkitDeviceTokenEntry"));
                        this.lstCartItemDetails = new Array();
                        return [4 /*yield*/, this.bindLocations()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getOrgGroupParamValue()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.setImgPath()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getCartItems()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewCartComponent.prototype.setImgPath = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.atParCommonService.getServerIP()
                            .catch(this.httpService.handleError)
                            .then(function (res) {
                            var data = res.json();
                            switch (data.StatType) {
                                case AtParEnums_1.StatusType.Success: {
                                    _this.ipAddress = data.DataVariable.toString();
                                    break;
                                }
                                case AtParEnums_1.StatusType.Error: {
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_1.StatusType.Warn: {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_1.StatusType.Custom: {
                                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    break;
                                }
                            }
                            //if (data.StatType != StatusType.Success) {
                            //    html = '';
                            //    return html;
                            //}
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.atParCommonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.growlMessage = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                //if (data.StatType != StatusType.Success) {
                                //    html = '';
                                //    return html;
                                //}
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewCartComponent.prototype.OnDestroy = function () {
        this.tkitDeviceTokenEntry = [];
    };
    ViewCartComponent.prototype.bindDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var k, dateStr, datepart, dateStr, datepart;
            return __generator(this, function (_a) {
                this.imgBasePath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/Web/Uploaded';
                this.lstCartItemDetails = [];
                for (k = 0; k < this.lstCartItems.length; k++) {
                    if (this.lstCartItems[k].NEEDED_BY_DATE != null && this.lstCartItems[k].NEEDED_BY_DATE != "") {
                        dateStr = new Date(this.lstCartItems[k].NEEDED_BY_DATE).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        this.lstCartItems[k].NEEDED_BY_DATE = dateStr.replace(',', '');
                        datepart = this.lstCartItems[k].NEEDED_BY_DATE.split(' ');
                        if (datepart != null && datepart.length > 0) {
                            this.lstCartItems[k].DUE_DATE = datepart[0];
                            this.lstCartItems[k].DUE_TIME = datepart[1].split(':')[0] + ":" + datepart[1].split(':')[1] + " " + datepart[2];
                        }
                    }
                    if (this.lstCartItems[k].ESTIMATED_RETURN_DATE != null && this.lstCartItems[k].ESTIMATED_RETURN_DATE != "") {
                        dateStr = new Date(this.lstCartItems[k].ESTIMATED_RETURN_DATE).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        this.lstCartItems[k].ESTIMATED_RETURN_DATE = dateStr.replace(',', '');
                        datepart = this.lstCartItems[k].ESTIMATED_RETURN_DATE.split(' ');
                        if (datepart != null && datepart.length > 0) {
                            this.lstCartItems[k].RETURN_DATE = datepart[0];
                            this.lstCartItems[k].RETURN_TIME = datepart[1].split(':')[0] + ":" + datepart[1].split(':')[1] + " " + datepart[2];
                        }
                    }
                    if (this.lstCartItems[k].ITEM_TYPE_INDICATOR == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.B].toString()) {
                        this.lstCartItems[k].blnShowItemImage = false;
                        this.lstCartItems[k].blnShowQtyAvailable = true;
                        this.lstCartItems[k].blnShowSelectQty = false;
                        this.lstCartItems[k].blnShowReturnDateTime = true;
                        this.lstCartItems[k].blnShowDueDateTime = true;
                    }
                    else if (this.lstCartItems[k].ITEM_TYPE_INDICATOR == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.E].toString()) {
                        this.lstCartItems[k].blnShowItemImage = true;
                        this.lstCartItems[k].blnShowQtyAvailable = true;
                        this.lstCartItems[k].blnShowSelectQty = false;
                        this.lstCartItems[k].blnShowReturnDateTime = true;
                        this.lstCartItems[k].blnShowDueDateTime = true;
                    }
                    else if (this.lstCartItems[k].ITEM_TYPE_INDICATOR == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.F].toString()) {
                        this.lstCartItems[k].blnShowItemImage = true;
                        this.lstCartItems[k].blnShowQtyAvailable = true;
                        this.lstCartItems[k].blnShowSelectQty = true;
                        this.lstCartItems[k].blnShowDueDateTime = true;
                        this.lstCartItems[k].blnShowReturnDateTime = false;
                    }
                    if (this.lstCartItems[k].IMAGE != "" && this.lstCartItems[k].IMAGE != null && this.lstCartItems[k].IMAGE != undefined) {
                        //this.lstCartItems[k].IMAGE = this.httpService.BaseUrl + '/Uploaded/' + this.lstCartItems[k].IMAGE;
                        this.lstCartItems[k].IMAGE = this.imgBasePath + '/' + this.lstCartItems[k].IMAGE;
                    }
                    this.lstCartItemDetails.push(this.lstCartItems[k]);
                }
                return [2 /*return*/];
            });
        });
    };
    ViewCartComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ViewCartComponent.prototype.clearPatientSelection = function () {
        this.selectedAccountNumber = "";
        this.selectedRow.PATIENT_LAST_NAME = "";
        this.selectedRow.PATIENT_ID = "";
    };
    ViewCartComponent.prototype.grdRdbtnChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var selectedPatient;
            return __generator(this, function (_a) {
                try {
                    selectedPatient = void 0;
                    if (event == undefined || event == null) {
                        if (this.lstPatients != null && this.lstPatients.length == 1) {
                            selectedPatient = this.lstPatients[0];
                        }
                        else {
                            return [2 /*return*/];
                        }
                    }
                    else {
                        selectedPatient = this.lstPatients.filter(function (x) { return x.PATIENT_MRC == event; })[0];
                    }
                    console.log(event);
                    this.selectedRow.PATIENT_LAST_NAME = selectedPatient.PATIENT_NAME;
                    this.selectedRow.PATIENT_ID = selectedPatient.PATIENT_MRC;
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "grdRdbtnChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    // Events
    ViewCartComponent.prototype.patientClick = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.selectedRow = item;
                this.selectedAccountNumber = item.PATIENT_ID;
                this.blnShowCard = false;
                this.blnShowPatientsPopup = true;
                this.bindPatients(item.ITEM_ID);
                return [2 /*return*/];
            });
        });
    };
    ViewCartComponent.prototype.deleteItemClick = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        this.growlMessage = [];
                        return [4 /*yield*/, this.service.deleteCartItem(item.ID).
                                catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a, msg;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            data = res.json();
                                            this.spinnerService.stop();
                                            _a = data.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 4];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 5];
                                                case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 6];
                                            }
                                            return [3 /*break*/, 7];
                                        case 1: return [4 /*yield*/, this.getCartItems()];
                                        case 2:
                                            _b.sent();
                                            return [4 /*yield*/, this.getRequestedItemsCount()];
                                        case 3:
                                            _b.sent();
                                            this.growlMessage = [];
                                            msg = "Item :" + item.ITEM_ID + " Deleted from the Cart Successfully";
                                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                                            return [3 /*break*/, 7];
                                        case 4:
                                            {
                                                this.growlMessage = [];
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                return [3 /*break*/, 7];
                                            }
                                            _b.label = 5;
                                        case 5:
                                            {
                                                this.growlMessage = [];
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                return [3 /*break*/, 7];
                                            }
                                            _b.label = 6;
                                        case 6:
                                            {
                                                this.growlMessage = [];
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                return [3 /*break*/, 7];
                                            }
                                            _b.label = 7;
                                        case 7: return [2 /*return*/];
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
    ViewCartComponent.prototype.clearCartClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        this.growlMessage = [];
                        return [4 /*yield*/, this.service.clearCart().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstCartItemDetails = [];
                                        _this.growlMessage = [];
                                        var msg = "All Items from the Cart Deleted Successfully";
                                        _this.container = false;
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                                        _this.resetCountValue();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.container = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.container = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.container = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewCartComponent.prototype.submitCartClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, i, i, i, i, i, strDueDate, strReturnDate, requestor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.strCurrentDate = this.formateDate(this.currentDate);
                        for (i = 0; i <= this.lstCartItemDetails.length - 1; i++) {
                            if (this.lstCartItemDetails[i].DUE_DATE == null || this.lstCartItemDetails[i].DUE_DATE == undefined || this.lstCartItemDetails[i].DUE_DATE === "") {
                                this.growlMessage = [];
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Due Date (MM/DD/YYYY)"
                                });
                                return [2 /*return*/];
                            }
                        }
                        for (i = 0; i <= this.lstCartItemDetails.length - 1; i++) {
                            if (this.lstCartItemDetails[i].DUE_TIME == null || this.lstCartItemDetails[i].DUE_TIME == undefined || this.lstCartItemDetails[i].DUE_TIME === "") {
                                this.growlMessage = [];
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Due Time (HH:MM)"
                                });
                                return [2 /*return*/];
                            }
                        }
                        for (i = 0; i <= this.lstCartItemDetails.length - 1; i++) {
                            if (this.lstCartItemDetails[i].ITEM_TYPE_INDICATOR != "F") {
                                if (this.lstCartItemDetails[i].RETURN_DATE == null || this.lstCartItemDetails[i].RETURN_DATE == undefined || this.lstCartItemDetails[i].RETURN_DATE === "") {
                                    this.growlMessage = [];
                                    this.growlMessage.push({
                                        severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Return Date (MM/DD/YYYY)"
                                    });
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                this.growlMessage = [];
                            }
                        }
                        for (i = 0; i <= this.lstCartItemDetails.length - 1; i++) {
                            if (this.lstCartItemDetails[i].ITEM_TYPE_INDICATOR != "F") {
                                if (this.lstCartItemDetails[i].RETURN_TIME == null || this.lstCartItemDetails[i].RETURN_TIME == undefined || this.lstCartItemDetails[i].RETURN_TIME === "") {
                                    this.growlMessage = [];
                                    this.growlMessage.push({
                                        severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Return Time (HH:MM)"
                                    });
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                this.growlMessage = [];
                            }
                        }
                        for (i = 0; i <= this.lstCartItemDetails.length - 1; i++) {
                            if (this.lstCartItemDetails[i].REQUEST_QTY > this.lstCartItemDetails[i].ITEM_QTY) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Requested quantity greater than available quantity" });
                                return [2 /*return*/];
                            }
                        }
                        for (i = 0; i <= this.lstCartItemDetails.length - 1; i++) {
                            strDueDate = this.formateDate(this.lstCartItemDetails[i].DUE_DATE);
                            strReturnDate = this.formateDate(this.lstCartItemDetails[i].RETURN_DATE);
                            if (this.lstCartItemDetails[i].ITEM_TYPE_INDICATOR != "F") {
                                if (strDueDate < this.strCurrentDate) {
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Due Date/Time must be greater than or equal to current date" });
                                    return [2 /*return*/];
                                }
                                else if (Date.parse(strReturnDate) < Date.parse(strDueDate)) {
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Return Date should be greater than Due Date" });
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                this.growlMessage = [];
                            }
                        }
                        this.growlMessage = [];
                        this.spinnerService.start();
                        requestor = localStorage.getItem("tkituserName");
                        return [4 /*yield*/, this.service.submitCart(this.lstCartItemDetails, this.orderComments, requestor, this.tkitDeviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.container = false;
                                        _this.growlMessage = [];
                                        var msg = "Your Order has been Placed Successfully";
                                        _this.container = false;
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                                        _this.lstCartItemDetails = [];
                                        _this.resetCountValue();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.container = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.container = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.container = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewCartComponent.prototype.continueClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu = new routepath_1.Menus();
                        this.breadCrumbMenu.MENU_NAME = "Create Request";
                        this.breadCrumbMenu.ROUTE = 'createrequest';
                        this.breadCrumbMenu.SUB_MENU_NAME = '';
                        this.breadCrumbMenu.APP_NAME = 'TrackIT';
                        return [4 /*yield*/, localStorage.setItem('localBreadCrumb', JSON.stringify(this.breadCrumbMenu))];
                    case 1:
                        _a.sent();
                        this.router.navigate(['trackitdashboard/' + this.breadCrumbMenu.ROUTE]);
                        return [2 /*return*/];
                }
            });
        });
    };
    // Data Functions
    ViewCartComponent.prototype.getCartItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstCartItems = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.service.getCartItems().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataList.length == 0) {
                                            _this.container = false;
                                        }
                                        else {
                                            _this.container = true;
                                            _this.lstCartItems = data.DataList;
                                            _this.bindDetails();
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "getSearchItems");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ViewCartComponent.prototype.bindLocations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        this.lstLocations = [];
                        return [4 /*yield*/, this.service.getLocations().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstLocations.push({ label: data.DataList[i].LOCATION_ID + ' - ' + data.DataList[i].LOCATION_NAME, value: data.DataList[i].LOCATION_ID });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ViewCartComponent.prototype.bindPatients = function (itemID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        return [4 /*yield*/, this.service.getPatients(itemID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstPatients = data.DataList;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ViewCartComponent.prototype.getOrgGroupParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.service.getOrgGroupParamValue(this.tkitDeviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.trackItAppId, "PATIENT_CHARGE").
                            catch(this.httpService.handleError).then(function (res) {
                            var data = res.json();
                            switch (data.StatType) {
                                case AtParEnums_1.StatusType.Success: {
                                    if (data.DataVariable == "Y") {
                                        _this.blnShowPatientCharge = true;
                                    }
                                    else {
                                        _this.blnShowPatientCharge = false;
                                    }
                                    break;
                                }
                                case AtParEnums_1.StatusType.Warn: {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_1.StatusType.Error: {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_1.StatusType.Custom: {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    break;
                                }
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewCartComponent.prototype.clearCartItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.confirmationService.confirm({
                    message: "Are you sure you want to clear the cart ?",
                    accept: function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.clearCartClick()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); },
                    reject: function () {
                        return;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ViewCartComponent.prototype.deleteCartItem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.confirmationService.confirm({
                    message: "Are you sure you want to Delete the Item?",
                    accept: function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.deleteItemClick(item)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); },
                    reject: function () {
                        return;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ViewCartComponent.prototype.getRequestedItemsCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.GetRequestedItemsCount()
                                .then(function (res) {
                                var data = res.json();
                                if (data.DataVariable != null) {
                                    _this.countvalue = data.DataVariable;
                                }
                                else {
                                    _this.countvalue = 0;
                                }
                                localStorage.setItem('tkitViewCartItemsCount', _this.countvalue.toString());
                                _this.spinnerService.emitCountChangedValue(_this.countvalue);
                                _this.oncountbuttonclicked.emit(_this.countvalue);
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "getRequestedItemsCount");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ViewCartComponent.prototype.resetCountValue = function () {
        this.countvalue = 0;
        this.spinnerService.emitCountChangedValue(this.countvalue);
        this.oncountbuttonclicked.emit(this.countvalue);
        localStorage.setItem('tkitViewCartItemsCount', this.countvalue.toString());
    };
    ViewCartComponent.prototype.formateDate = function (date) {
        //var customDate = new Date(date).getMonth().toString() + "/" + new Date(date).getDay().toString() + "/" + new Date(date).getFullYear();
        var today = new Date(date);
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '/' + dd + '/' + yyyy;
        return today;
        //return this.archiveDate;
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ViewCartComponent.prototype, "oncountbuttonclicked", void 0);
    ViewCartComponent = __decorate([
        core_1.Component({
            templateUrl: 'trackit.view.cart.html',
            providers: [
                tkithttpservice_1.TkitHttpService,
                AtParConstants_1.AtParConstants,
                trackit_view_cart_service_1.TrackITViewCartService,
                atpar_trackit_common_service_1.AtParTrackITCommonService,
                api_1.ConfirmationService
            ],
        }),
        __metadata("design:paramtypes", [trackit_view_cart_service_1.TrackITViewCartService,
            event_spinner_service_1.SpinnerService,
            atpar_trackit_common_service_1.AtParTrackITCommonService,
            tkithttpservice_1.TkitHttpService,
            AtParConstants_1.AtParConstants,
            platform_browser_1.Title,
            api_1.ConfirmationService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], ViewCartComponent);
    return ViewCartComponent;
}());
exports.ViewCartComponent = ViewCartComponent;
//# sourceMappingURL=trackit.view.cart.js.map