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
var tkit_check_in_check_out_services_1 = require("../../app/TrackIT/tkit-check-in_check-out-services");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var router_1 = require("@angular/router");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var routepath_1 = require("../AtPar/Menus/routepath");
var VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS_1 = require("../../app/Entities/VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS");
var PAR_MNGT_VENDOR_1 = require("../../app/Entities/PAR_MNGT_VENDOR");
var HttpService_1 = require("../Shared/HttpService");
var linq_es5_1 = require("linq-es5");
var api_1 = require("../components/common/api");
var CheckIn_CheckOutComponent = (function () {
    function CheckIn_CheckOutComponent(checkInCheckOutItemsServices, router, spinnerService, route, atParConstant, atParSharedDataService, httpService, confirmationService) {
        this.checkInCheckOutItemsServices = checkInCheckOutItemsServices;
        this.router = router;
        this.spinnerService = spinnerService;
        this.route = route;
        this.atParConstant = atParConstant;
        this.atParSharedDataService = atParSharedDataService;
        this.httpService = httpService;
        this.confirmationService = confirmationService;
        this.pop = false;
        this.table = false;
        this.page = true;
        this.form = false;
        this.editform = false;
        this.loading = true;
        this.minDateValue1 = new Date();
        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
        this.checkOutItemsList = [];
        this.statusMesssage = "";
        this.msgs = [];
        this.deviceTokenEntry = [];
        this.tkitDeviceTokenEntry = [];
        this.requestorData = [];
        this.requestorDataList = [];
        this.itemQuantity = 0;
        this.itemIdSearch = "";
        this.hasSerialId = false;
        this.serialIdSearch = "";
        this.itemTypeIndicator = "";
        this.selectedRequestor = "";
        this.checkoutMode = AtParEnums_1.enum_CHECKINOUT[AtParEnums_1.enum_CHECKINOUT.CIN].toString();
        this.isSerial = false;
        this.isData = true;
        this.isGo = true;
        this.isDisabled = false;
        this.lstFilterItemIDs = [];
        this.lstFilteredItems = [];
        this.lstItems = [];
        this.createForm = false;
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    CheckIn_CheckOutComponent.prototype.go = function () {
        return __awaiter(this, void 0, void 0, function () {
            var searchItem, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        searchItem = void 0;
                        searchItem = this.itemIdSearch.split('-');
                        this.itemIdSearch = searchItem[0].trim();
                        return [4 /*yield*/, this.getTypeIndicator()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "go");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.tkitDeviceTokenEntry = JSON.parse(localStorage.getItem("tkitDeviceTokenEntry"));
                        this.msgs = [];
                        this.mode = AtParEnums_1.enum_CHECKINOUT[AtParEnums_1.enum_CHECKINOUT.COUT];
                        return [4 /*yield*/, this.getItems()];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "ngOnInit");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.increaseQuantity = function () {
        try {
            if (this.itemDetails.checkinQty != null && this.itemDetails.checkinQty != undefined) {
                this.itemDetails.checkinQty++;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "increaseQuantity");
        }
    };
    CheckIn_CheckOutComponent.prototype.decreaseQuantity = function () {
        try {
            if (this.itemDetails.checkinQty != 0 && this.itemDetails.checkinQty != null && this.itemDetails.checkinQty != undefined)
                this.itemDetails.checkinQty--;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "decreaseQuantity");
        }
    };
    CheckIn_CheckOutComponent.prototype.getTypeIndicator = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var msg, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!(this.hasSerialId == true && this.itemIdSearch.toUpperCase() == this.itemSearchID.toUpperCase())) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.checkSerialId()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3: return [4 /*yield*/, this.checkInCheckOutItemsServices.getTypeIndicator(this.itemIdSearch)
                            .forEach(function (resp) {
                            _this.itemSearchID = _this.itemIdSearch;
                            if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_SERIALINACTIVATED) {
                                msg = "item " + _this.itemIdSearch + " is inactivated";
                                _this.hasSerialId = false;
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg });
                                _this.itemIdSearch = '';
                                _this.spinnerService.stop();
                                return;
                            }
                            else if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                msg = "item " + _this.itemIdSearch + " does not exist";
                                _this.hasSerialId = false;
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg });
                                _this.itemIdSearch = '';
                                _this.spinnerService.stop();
                                return;
                            }
                            else {
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.msgs = [];
                                        _this.itemTypeIndicator = resp.DataVariable;
                                        _this.itemIdSearch = resp.Data;
                                        if (_this.itemTypeIndicator != undefined && _this.itemTypeIndicator != null && _this.itemTypeIndicator != "") {
                                            if (_this.itemTypeIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.E].toString()) {
                                                _this.checkEqItemAvailability();
                                            }
                                            else {
                                                _this.hasSerialId = false;
                                                _this.checkItemAvailability();
                                            }
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                }
                            }
                        })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "getTypeIndicator");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.checkSerialId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var msg_1, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.checkInCheckOutItemsServices.checkSerialId(this.itemIdSearch, this.serialIdSearch)
                                .forEach(function (resp) {
                                if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_SERIALINACTIVATED) {
                                    msg_1 = "Serial# " + _this.serialIdSearch + " is inactivated";
                                    _this.msgs = [];
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_1 });
                                    _this.itemIdSearch = '';
                                    _this.serialIdSearch = '';
                                    _this.hasSerialId = false;
                                    _this.spinnerService.stop();
                                    return;
                                }
                                else if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_SERIALNOTEXISTS) {
                                    msg_1 = "Serial# " + _this.serialIdSearch + " does not exist";
                                    _this.msgs = [];
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_1 });
                                    _this.itemIdSearch = '';
                                    _this.serialIdSearch = '';
                                    _this.hasSerialId = false;
                                    _this.spinnerService.stop();
                                    return;
                                }
                                else {
                                    switch (resp.StatType) {
                                        case AtParEnums_1.StatusType.Success:
                                            _this.msgs = [];
                                            var itemAvailability = resp.DataVariable;
                                            if (itemAvailability > 0) {
                                                msg_1 = "Serial# " + _this.serialIdSearch + " has already been checked in";
                                                _this.msgs = [];
                                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_1 });
                                                _this.itemIdSearch = '';
                                                _this.hasSerialId = false;
                                            }
                                            else {
                                                _this.getItemDetails();
                                            }
                                            _this.spinnerService.stop();
                                            break;
                                        case AtParEnums_1.StatusType.Error:
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                            _this.spinnerService.stop();
                                            break;
                                        case AtParEnums_1.StatusType.Warn:
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                            _this.spinnerService.stop();
                                            break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "checkSerialId");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.serialIdCheck = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.checkSerialId()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getItemDetails()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "serialIdCheck");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.checkEqItemAvailability = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var msg_2, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.checkInCheckOutItemsServices.checkEqItemAvailability(this.itemIdSearch, this.selectedRequestor)
                                .forEach(function (resp) {
                                if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_ITEMNOTALLOWED) {
                                    msg_2 = "Item " + _this.itemIdSearch + " is not allowed for the selected user";
                                    _this.msgs = [];
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_2 });
                                    _this.itemIdSearch = '';
                                    _this.hasSerialId = false;
                                    _this.spinnerService.stop();
                                    return;
                                }
                                else if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_ITEMNOTAVAILABLE) {
                                    msg_2 = "Item " + _this.itemIdSearch + +" does not exist";
                                    _this.msgs = [];
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_2 });
                                    _this.itemIdSearch = '';
                                    _this.hasSerialId = false;
                                    _this.spinnerService.stop();
                                    return;
                                }
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.msgs = [];
                                        var itemAvailability = resp.DataVariable;
                                        if (itemAvailability > 0) {
                                            // this.pop = false;
                                            msg_2 = "Item " + _this.itemIdSearch + " has already been checked in";
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_2 });
                                            _this.itemIdSearch = '';
                                            _this.serialIdSearch = '';
                                            return;
                                        }
                                        else {
                                            _this.hasSerialId = true;
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "checkEqItemAvailability");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.checkItemAvailability = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var msg, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.checkInCheckOutItemsServices.checkItemAvailability(this.itemIdSearch, this.selectedRequestor, this.itemTypeIndicator)
                                .forEach(function (resp) {
                                if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_ITEMNOTALLOWED) {
                                    msg = "Item " + _this.itemIdSearch + " is not allowed for the selected user";
                                    _this.msgs = [];
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg });
                                    _this.itemIdSearch = '';
                                    _this.hasSerialId = false;
                                    _this.spinnerService.stop();
                                    return;
                                }
                                else if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_ITEMNOTAVAILABLE) {
                                    msg = "Item " + _this.itemIdSearch + " is Unavailable";
                                    _this.msgs = [];
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg });
                                    _this.itemIdSearch = '';
                                    _this.hasSerialId = false;
                                    _this.spinnerService.stop();
                                    return;
                                }
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.msgs = [];
                                        var itemAvailability = resp.DataVariable;
                                        if (itemAvailability > 0 && _this.itemTypeIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.B].toString()) {
                                            _this.hasSerialId = false;
                                            //this.pop = false;
                                            msg = "Item " + _this.itemIdSearch + " has already been checked in";
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg });
                                            _this.itemIdSearch = '';
                                            _this.serialIdSearch = '';
                                            return;
                                        }
                                        else {
                                            _this.getItemDetails();
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "checkItemAvailability");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.getItemDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var msg_3, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.checkInCheckOutItemsServices.getItemDetails(this.itemIdSearch, this.selectedRequestor, this.itemTypeIndicator, this.serialIdSearch)
                                .forEach(function (resp) {
                                if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_ITEMNOTALLOWED) {
                                    msg_3 = "Item " + _this.itemIdSearch + " is not allowed for the selected user";
                                    _this.msgs = [];
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_3 });
                                    _this.itemIdSearch = '';
                                    _this.hasSerialId = false;
                                    _this.spinnerService.stop();
                                    return;
                                }
                                else if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_ITEMNOTAVAILABLE) {
                                    msg_3 = "Item " + _this.itemIdSearch + +" does not exist";
                                    _this.msgs = [];
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_3 });
                                    _this.itemIdSearch = '';
                                    _this.hasSerialId = false;
                                    _this.spinnerService.stop();
                                    return;
                                }
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.pop = true;
                                        _this.msgs = [];
                                        _this.item = resp.DataVariable;
                                        _this.itemDetails = new VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS_1.VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS();
                                        _this.itemDetails.ITEM_ID = _this.item[0].ITEM_ID;
                                        console.log("itemid : " + _this.item[0].ITEM_ID);
                                        _this.itemDetails.SERIAL_NO = _this.item[0].SERIAL_NO;
                                        _this.itemDetails.ITEM_DESCR = _this.item[0].ITEM_DESCR;
                                        _this.itemDetails.VENDOR = _this.item[0].VENDOR;
                                        _this.itemDetails.MANUFACTURER = _this.item[0].MANUFACTURER;
                                        _this.itemDetails.EQP_INDICATOR = _this.itemTypeIndicator;
                                        if (_this.itemTypeIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.E].toString()) {
                                            if (_this.item[0].ITEM_QTY == 0) {
                                                _this.itemDetails.itemQty = "Unavailable";
                                                _this.itemDetails.checkinQty = 1;
                                            }
                                            _this.isDisabled = true;
                                            _this.cursor = 'none';
                                            _this.itemDetails.color = "panel panel-blue no-shadow bdr-1";
                                        }
                                        else if (_this.itemTypeIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.B].toString()) {
                                            if (_this.item[0].ITEM_QTY == 0) {
                                                _this.itemDetails.itemQty = "Unavailable";
                                                _this.itemDetails.checkinQty = 1;
                                            }
                                            _this.itemDetails.color = "panel panel-green no-shadow bdr-1";
                                            _this.isDisabled = true;
                                            _this.cursor = 'none';
                                        }
                                        else if (_this.itemTypeIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.F].toString()) {
                                            _this.itemDetails.itemQty = _this.item[0].ITEM_QTY;
                                            _this.itemDetails.color = "panel panel-pink no-shadow bdr-1";
                                            _this.isDisabled = false;
                                            _this.cursor = 'pointer';
                                        }
                                        _this.itemDetails.DELIVER_LOCATION = _this.item[0].STORAGE_LOCATION;
                                        _this.itemDetails.PROCEDURE_CODE = "";
                                        _this.itemDetails.PATIENT_ID = "";
                                        _this.itemDetails.PATIENT_LNAME = "";
                                        _this.itemDetails.ASSET_ID = _this.item[0].ASSET_ID;
                                        _this.itemSearchID = '';
                                        _this.itemIdSearch = '';
                                        _this.serialIdSearch = '';
                                        //this.isADD = false;
                                        _this.hasSerialId = false;
                                        // this.serialIdSearch = '';
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "getItemDetails");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.getItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.checkInCheckOutItemsServices.getItems(this.itemIdSearch)
                                .forEach(function (resp) {
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.lstItems = resp.DataList;
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "getItemDetails");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.Add = function () {
        var _this = this;
        try {
            var filterItem = this.checkOutItemsList.filter(function (item) { return item.ITEM_ID == _this.itemDetails.ITEM_ID; });
            if (filterItem.length == 0) {
                if (this.itemTypeIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.E].toString()) {
                    this.itemDetails.isSerial = true;
                }
                else if (this.itemTypeIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.B].toString() ||
                    this.itemTypeIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.F].toString()) {
                    this.itemDetails.isSerial = false;
                }
                this.itemDetails.ITEM_QTY = this.itemDetails.checkinQty;
                this.checkOutItemsList.push(this.itemDetails);
            }
            this.isADD = true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "Add");
        }
    };
    CheckIn_CheckOutComponent.prototype.checkInOutItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.checkInCheckOutItemsServices.checkInOutItems(this.checkOutItemsList, this.selectedRequestor, this.checkoutMode)
                                .subscribe(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Items checked in successfully." });
                                        _this.spinnerService.stop();
                                        // this.pop = false;
                                        _this.itemIdSearch = '';
                                        _this.hasSerialId = false;
                                        _this.checkOutItemsList = [];
                                        //this.isADD = false;
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "CheckIn failed" });
                                        _this.spinnerService.stop();
                                        break;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, "checkInOutItems");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.onCloseItemClick = function (item, event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.checkOutItemsList = this.checkOutItemsList.filter(function (fItem) { return fItem.ITEM_ID != item.ITEM_ID; });
                    if (this.checkOutItemsList.length == 0) {
                        this.isADD = false;
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "onCloseItemClick");
                }
                return [2 /*return*/];
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.fillItemIDsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query, lstItems, i;
            return __generator(this, function (_a) {
                try {
                    query = event.query;
                    lstItems = [];
                    this.lstFilterItemIDs = [];
                    lstItems = this.filterItemIDs(query, this.lstItems);
                    for (i = 0; i <= lstItems.length - 1; i++) {
                        if (lstItems[i].ASSET_ID != null && lstItems[i].ASSET_ID != "" && lstItems[i].ASSET_ID != undefined) {
                            this.lstFilterItemIDs[i] = lstItems[i].ITEM_ID + " - " + lstItems[i].ASSET_ID;
                        }
                        else {
                            this.lstFilterItemIDs[i] = lstItems[i].ITEM_ID;
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "fillCartIDsAuto");
                }
                return [2 /*return*/];
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.filterItemIDs = function (query, lstItemIDs) {
        try {
            var filtered = [];
            if (query == "%") {
                for (var i = 0; i < lstItemIDs.length; i++) {
                    filtered.push(lstItemIDs[i]);
                }
            }
            else {
                if (query.trim().toLowerCase() != '') {
                    if (query.substring(0, 1) != ' ') {
                        var _loop_1 = function (i) {
                            var item = lstItemIDs[i];
                            if (item.ASSET_ID != null) {
                                if (item.ITEM_ID.toLowerCase().indexOf(query.trim().toLowerCase()) == 0 || item.ASSET_ID.toLowerCase().indexOf(query.trim().toLowerCase()) == 0) {
                                    if ((filtered.filter(function (x) { return x.ITEM_ID == item.ITEM_ID || x.ASSET_ID == item.ASSET_ID; })).length == 0) {
                                        filtered.push(item);
                                    }
                                }
                            }
                            else {
                                if (item.ITEM_ID.toLowerCase().indexOf(query.trim().toLowerCase()) == 0) {
                                    if ((filtered.filter(function (x) { return x.ITEM_ID == item.ITEM_ID; })).length == 0) {
                                        filtered.push(item);
                                    }
                                }
                            }
                        };
                        for (var i = 0; i < lstItemIDs.length; i++) {
                            _loop_1(i);
                        }
                    }
                }
            }
            return filtered;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "filterCartIDs");
        }
    };
    CheckIn_CheckOutComponent.prototype.populateEquipmentTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.checkInCheckOutItemsServices.getEquipmentType(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.msgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        _this.lstEqpTypes = [];
                                        _this.lstEqpTypesTemp = [];
                                        _this.lstEqpTypes.push({ label: "Select One", value: "Select One" });
                                        if (data.DataList != null && data.DataList != undefined) {
                                            _this.lstEqpTypesTemp = data.DataList;
                                            for (var i = 0; i < data.DataList.length; i++) {
                                                _this.lstEqpTypes.push({ label: data.DataList[i].ITEM_TYPE_DESCR + ' ( ' + data.DataList[i].ITEM_TYPE + ' ) ', value: data.DataList[i].ITEM_TYPE });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "populateEquipmentTypes");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.fillItemsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, selectedIndicator, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstFilteredItems = [];
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!(this.selectedEqpmtType != null && this.selectedEqpmtType != undefined && this.selectedEqpmtType != "" && this.selectedEqpmtType != "Select One")) return [3 /*break*/, 3];
                        selectedIndicator = linq_es5_1.asEnumerable(this.lstEqpTypesTemp).Where(function (x) { return x.ITEM_TYPE === _this.itemIdSearch; }).Select(function (x) { return x.ITEM_TYPE_INDICATOR; }).ToArray();
                        return [4 /*yield*/, this.checkInCheckOutItemsServices.getItemsForAutoSearch(this.selectedEqpmtType, selectedIndicator[0].toString()).
                                catch(this.httpService.handleError).then(function (res) {
                                _this.spinnerService.stop();
                                var data = res.json();
                                _this.msgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstItems = data.DataList;
                                        _this.lstFilteredItems = _this.filterBusinessUnits(query, _this.lstItems);
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.StatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Equipment Type" });
                        return [2 /*return*/];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12, "fillItemsAuto");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.filterBusinessUnits = function (query, businessunits) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < businessunits.length; i++) {
                var Bunitvalue = businessunits[i];
                filtered.push(Bunitvalue.ITEM_ID + " " + "(" + Bunitvalue.ITEM_DESCR + ")");
            }
        }
        else {
            if (query.length >= 1) {
                for (var i = 0; i < businessunits.length; i++) {
                    var Bunitvalue = businessunits[i];
                    Bunitvalue = Bunitvalue.ITEM_ID + " " + "(" + Bunitvalue.ITEM_DESCR + ")";
                    if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(Bunitvalue);
                    }
                }
            }
        }
        return filtered;
    };
    CheckIn_CheckOutComponent.prototype.deleteRow = function (item, event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.msgs = [];
                        this.createForm = false;
                        this.editform = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.confirmationService.confirm({
                                message: "Are you sure you want to delete " + item.ITEM_ID + " ?",
                                accept: function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        this.checkOutItemsList = this.checkOutItemsList.filter(function (fItem) { return fItem.ITEM_ID != item.ITEM_ID; });
                                        if (this.checkOutItemsList.length == 0) {
                                            this.isADD = false;
                                        }
                                        return [2 /*return*/];
                                    });
                                }); }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13, "deleteRow");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    CheckIn_CheckOutComponent = __decorate([
        core_1.Component({
            templateUrl: 'tkit-check-in_check-out.component.html',
            providers: [tkit_check_in_check_out_services_1.CheckInCheckOutItemsServices, AtParConstants_1.AtParConstants, datatableservice_1.datatableservice, api_1.ConfirmationService],
        }),
        __metadata("design:paramtypes", [tkit_check_in_check_out_services_1.CheckInCheckOutItemsServices,
            router_1.Router,
            event_spinner_service_1.SpinnerService,
            router_1.ActivatedRoute,
            AtParConstants_1.AtParConstants,
            AtParSharedDataService_1.AtParSharedDataService,
            HttpService_1.HttpService,
            api_1.ConfirmationService])
    ], CheckIn_CheckOutComponent);
    return CheckIn_CheckOutComponent;
}());
exports.CheckIn_CheckOutComponent = CheckIn_CheckOutComponent;
//# sourceMappingURL=tkit-check-in_check-out.component.js.map