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
var tkit_check_in_check_out_services_1 = require("../../app/TrackIT/tkit-check-in_check-out-services");
var api_1 = require("../components/common/api");
var AtParConstants_1 = require("../Shared/AtParConstants");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var router_1 = require("@angular/router");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var routepath_1 = require("../AtPar/Menus/routepath");
var VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS_1 = require("../../app/Entities/VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS");
var CheckOutComponent = (function () {
    function CheckOutComponent(checkInCheckOutItemsServices, router, httpService, spinnerService, route, atParConstant, atParSharedDataService, confirmationService) {
        this.checkInCheckOutItemsServices = checkInCheckOutItemsServices;
        this.router = router;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.route = route;
        this.atParConstant = atParConstant;
        this.atParSharedDataService = atParSharedDataService;
        this.confirmationService = confirmationService;
        this.checkOutItemsList = [];
        this.msgs = [];
        this.deviceTokenEntry = [];
        this.requestorData = [];
        this.requestorDataList = [];
        this.lstPatients = [];
        this.itemQuantity = 0;
        this.recordsPerPageSize = 0;
        this.mainForm = true;
        this.hasSerialId = false;
        this.pop = false;
        this.isAdd = false;
        this.isDisabled = false;
        this.isPatient = false;
        this.isProc = false;
        this.itemIdSearch = "";
        this.statusMesssage = "";
        this.serialIdSearch = "";
        this.itemTypeIndicator = "";
        this.selectedRequestor = "Select Requestor";
        this.checkoutMode = "";
        this.selectedDeliveryLoc = "";
        this.strPatientCharge = "";
        this.lstFilterItemIDs = [];
        this.lstItems = [];
        this.blnShowPatientsPopup = false;
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    CheckOutComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.spinnerService.start();
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.msgs = [];
                        this.mode = AtParEnums_1.enum_CHECKINOUT[AtParEnums_1.enum_CHECKINOUT.COUT];
                        this.checkoutMode = AtParEnums_1.enum_CHECKINOUT[AtParEnums_1.enum_CHECKINOUT.COUT].toString();
                        this.recordsPerPageSize = parseInt(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage].toString());
                        return [4 /*yield*/, this.loadOrgGroupParams()];
                    case 1:
                        _a.sent();
                        this.getRequestors();
                        return [4 /*yield*/, this.getItems()];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CheckOutComponent.prototype.increaseQuantity = function () {
        try {
            if (this.itemDetails.COUT_QTY != 0 && this.itemDetails.COUT_QTY != null && this.itemDetails.COUT_QTY != undefined) {
                this.itemDetails.COUT_QTY++;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "increaseQuantity");
        }
    };
    CheckOutComponent.prototype.decreaseQuantity = function () {
        try {
            if (this.itemDetails.COUT_QTY != 0 && this.itemDetails.COUT_QTY != null && this.itemDetails.COUT_QTY != undefined)
                this.itemDetails.COUT_QTY--;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "decreaseQuantity");
        }
    };
    CheckOutComponent.prototype.getTypeIndicator = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var msg_1, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.msgs = [];
                        this.spinnerService.start();
                        if (!(this.hasSerialId == true && this.itemIdSearch.toUpperCase() == this.itemSearchID.toUpperCase())) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.checkSerialId()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, this.checkInCheckOutItemsServices.getTypeIndicator(this.itemIdSearch)
                            .forEach(function (resp) {
                            _this.itemSearchID = _this.itemIdSearch;
                            if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_SERIALINACTIVATED) {
                                msg_1 = "item " + _this.itemIdSearch + " is inactivated";
                                _this.hasSerialId = false;
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_1 });
                                _this.itemIdSearch = '';
                                _this.spinnerService.stop();
                                return;
                            }
                            else if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                msg_1 = "item " + _this.itemIdSearch + " does not exist";
                                _this.hasSerialId = false;
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_1 });
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
                                        _this.spinnerService.stop();
                                        if (_this.itemTypeIndicator != undefined && _this.itemTypeIndicator != null && _this.itemTypeIndicator != "") {
                                            if (_this.itemTypeIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.E].toString()) {
                                                _this.checkEqItemAvailability();
                                            }
                                            else {
                                                _this.hasSerialId = false;
                                                _this.checkItemAvailability();
                                            }
                                        }
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
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "getTypeIndicator");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CheckOutComponent.prototype.getRequestors = function () {
        var _this = this;
        try {
            this.spinnerService.start();
            this.checkInCheckOutItemsServices.getRequestors(false, this.deviceTokenEntry)
                .forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_1.StatusType.Success:
                        _this.msgs = [];
                        _this.requestorDataList = resp.DataList;
                        _this.requestorData = [];
                        _this.requestorData.push({ label: "Select Requestor", value: "Select Requestor" });
                        for (var i = 0; i < _this.requestorDataList.length; i++) {
                            _this.requestorData.push({ label: _this.requestorDataList[i].FIRST_NAME + " " + _this.requestorDataList[i].LAST_NAME + " (" + _this.requestorDataList[i].REQUESTOR_ID + ")", value: _this.requestorDataList[i].REQUESTOR_ID });
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
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getRequestors");
        }
    };
    CheckOutComponent.prototype.getLocations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.checkInCheckOutItemsServices.getLocations(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].toString())
                                .forEach(function (resp) {
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.msgs = [];
                                        if (resp.DataList != null && resp.DataList.length > 0) {
                                            _this.ddlDeliveryLoc = [];
                                            // this.ddlDeliveryLoc.push({ label: "Select DeliveryLoc", value: "Select DeliveryLoc" });
                                            for (var i = 0; i < _this.requestorDataList.length; i++) {
                                                _this.ddlDeliveryLoc.push({ label: resp.DataList[i].LOCATION_ID, value: resp.DataList[i].LOCATION_ID });
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
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "getRequestors");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CheckOutComponent.prototype.checkSerialId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var msg_2, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.checkInCheckOutItemsServices.checkSerialId(this.itemIdSearch, this.serialIdSearch)
                                .forEach(function (resp) {
                                if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_SERIALINACTIVATED) {
                                    msg_2 = "Serial# " + _this.serialIdSearch + " is inactivated";
                                    _this.msgs = [];
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_2 });
                                    _this.itemIdSearch = '';
                                    _this.serialIdSearch = '';
                                    _this.hasSerialId = false;
                                    _this.spinnerService.stop();
                                    return;
                                }
                                else if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_SERIALNOTEXISTS) {
                                    msg_2 = "Serial# " + _this.serialIdSearch + " does not exist";
                                    _this.msgs = [];
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_2 });
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
                                            if (itemAvailability == 0) {
                                                msg_2 = "Serial# " + _this.serialIdSearch + " is unavailable";
                                                _this.msgs = [];
                                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_2 });
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
    CheckOutComponent.prototype.serialIdCheck = function () {
        this.checkSerialId();
        this.getItemDetails();
    };
    CheckOutComponent.prototype.checkEqItemAvailability = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var msg_3;
            return __generator(this, function (_a) {
                try {
                    this.spinnerService.start();
                    this.checkInCheckOutItemsServices.checkEqItemAvailability(this.itemIdSearch, this.selectedRequestor)
                        .forEach(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                        var itemAvailability;
                        return __generator(this, function (_a) {
                            if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_ITEMNOTALLOWED) {
                                msg_3 = "Item " + this.itemIdSearch + " is not allowed for the selected user";
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_3 });
                                this.itemIdSearch = '';
                                this.hasSerialId = false;
                                this.spinnerService.stop();
                                return [2 /*return*/];
                            }
                            else if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_ITEMNOTAVAILABLE) {
                                msg_3 = "Item " + this.itemIdSearch + +" does not exist";
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_3 });
                                this.itemIdSearch = '';
                                this.hasSerialId = false;
                                this.spinnerService.stop();
                                return [2 /*return*/];
                            }
                            switch (resp.StatType) {
                                case AtParEnums_1.StatusType.Success:
                                    this.msgs = [];
                                    itemAvailability = resp.DataVariable;
                                    if (itemAvailability == null) {
                                        this.hasSerialId = false;
                                        this.pop = false;
                                        //blnGetDetailsFlag = false;
                                        msg_3 = "Item " + this.itemIdSearch + " is unavailable";
                                        this.msgs = [];
                                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_3 });
                                        this.itemIdSearch = '';
                                        this.serialIdSearch = '';
                                        this.spinnerService.stop();
                                        return [2 /*return*/];
                                    }
                                    else {
                                        this.hasSerialId = true;
                                    }
                                    this.spinnerService.stop();
                                    break;
                                case AtParEnums_1.StatusType.Error:
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                    this.spinnerService.stop();
                                    break;
                                case AtParEnums_1.StatusType.Warn:
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                    this.spinnerService.stop();
                                    break;
                            }
                            return [2 /*return*/];
                        });
                    }); });
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "checkEqItemAvailability");
                }
                return [2 /*return*/];
            });
        });
    };
    CheckOutComponent.prototype.checkItemAvailability = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var msg_4, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.checkInCheckOutItemsServices.checkItemAvailability(this.itemIdSearch, this.selectedRequestor, this.itemTypeIndicator)
                                .forEach(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, itemAvailability;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_ITEMNOTALLOWED) {
                                                msg_4 = "Item " + this.itemIdSearch + " is not allowed for the selected user";
                                                this.msgs = [];
                                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_4 });
                                                this.itemIdSearch = '';
                                                this.hasSerialId = false;
                                                this.spinnerService.stop();
                                                return [2 /*return*/];
                                            }
                                            else if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_ITEMNOTAVAILABLE) {
                                                msg_4 = "Item " + this.itemIdSearch + " is Unavailable";
                                                this.msgs = [];
                                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_4 });
                                                this.itemIdSearch = '';
                                                this.hasSerialId = false;
                                                this.spinnerService.stop();
                                                return [2 /*return*/];
                                            }
                                            _a = resp.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 5];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 6];
                                            }
                                            return [3 /*break*/, 7];
                                        case 1:
                                            this.msgs = [];
                                            itemAvailability = resp.DataVariable;
                                            if (!(itemAvailability == 0)) return [3 /*break*/, 2];
                                            this.hasSerialId = false;
                                            this.pop = false;
                                            this.itemIdSearch = '';
                                            this.serialIdSearch = '';
                                            //blnGetDetailsFlag = false;
                                            msg_4 = "Item " + this.itemIdSearch + " is unavailable";
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_4 });
                                            this.spinnerService.stop();
                                            return [2 /*return*/];
                                        case 2: return [4 /*yield*/, this.getItemDetails()];
                                        case 3:
                                            _b.sent();
                                            _b.label = 4;
                                        case 4:
                                            this.spinnerService.stop();
                                            return [3 /*break*/, 7];
                                        case 5:
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                            this.spinnerService.stop();
                                            return [3 /*break*/, 7];
                                        case 6:
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                            this.spinnerService.stop();
                                            return [3 /*break*/, 7];
                                        case 7: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "checkItemAvailability");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CheckOutComponent.prototype.getItemDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var msg;
            return __generator(this, function (_a) {
                try {
                    this.spinnerService.start();
                    this.checkInCheckOutItemsServices.getItemDetails(this.itemIdSearch, this.selectedRequestor, this.itemTypeIndicator, this.serialIdSearch)
                        .forEach(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, item;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_ITEMNOTALLOWED) {
                                        msg = "Item " + this.itemIdSearch + " is not allowed for the selected user";
                                        this.msgs = [];
                                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg });
                                        this.itemIdSearch = '';
                                        this.hasSerialId = false;
                                        this.spinnerService.stop();
                                        return [2 /*return*/];
                                    }
                                    else if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_ITEMNOTAVAILABLE) {
                                        msg = "Item " + this.itemIdSearch + +" does not exist";
                                        this.msgs = [];
                                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg });
                                        this.itemIdSearch = '';
                                        this.hasSerialId = false;
                                        this.spinnerService.stop();
                                        return [2 /*return*/];
                                    }
                                    _a = resp.StatType;
                                    switch (_a) {
                                        case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                        case AtParEnums_1.StatusType.Error: return [3 /*break*/, 4];
                                        case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 5];
                                    }
                                    return [3 /*break*/, 6];
                                case 1:
                                    this.msgs = [];
                                    item = resp.DataVariable;
                                    if (!(item != null && item.length > 0)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, this.getLocations()];
                                case 2:
                                    _b.sent();
                                    this.itemDetails = new VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS_1.VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS();
                                    this.itemDetails.ITEM_ID = item[0].ITEM_ID;
                                    this.itemDetails.SERIAL_NO = item[0].SERIAL_NO;
                                    this.itemDetails.ITEM_DESCR = item[0].ITEM_DESCR;
                                    this.itemDetails.ITEM_QTY = item[0].ITEM_QTY;
                                    this.itemDetails.VENDOR = item[0].VENDOR;
                                    this.itemDetails.MANUFACTURER = item[0].MANUFACTURER;
                                    this.itemDetails.EQP_INDICATOR = this.itemTypeIndicator;
                                    if (this.itemTypeIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.E].toString()) {
                                        if (item[0].ITEM_QTY == 0) {
                                            this.itemDetails.itemQty = "Unavailable";
                                            this.itemDetails.COUT_QTY = 1;
                                            this.isProc = true;
                                        }
                                        this.isDisabled = true;
                                        this.cursor = 'none';
                                        this.itemDetails.color = "panel panel-blue no-shadow bdr-1";
                                    }
                                    else if (this.itemTypeIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.B].toString()) {
                                        if (item[0].ITEM_QTY == 0) {
                                            this.itemDetails.itemQty = "Unavailable";
                                            this.itemDetails.COUT_QTY = 1;
                                        }
                                        this.itemDetails.color = "panel panel-green no-shadow bdr-1";
                                        this.isDisabled = true;
                                        this.cursor = 'none';
                                    }
                                    else if (this.itemTypeIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.F].toString()) {
                                        this.itemDetails.itemQty = item[0].ITEM_QTY;
                                        this.itemDetails.color = "panel panel-pink no-shadow bdr-1";
                                        this.isDisabled = false;
                                        this.cursor = 'pointer';
                                    }
                                    this.itemDetails.DELIVER_LOCATION = item[0].STORAGE_LOCATION;
                                    this.itemDetails.PROCEDURE_CODE = "";
                                    this.itemDetails.PATIENT_ID = "";
                                    this.itemDetails.PATIENT_LNAME = "";
                                    this.pop = true;
                                    _b.label = 3;
                                case 3:
                                    this.spinnerService.stop();
                                    return [3 /*break*/, 6];
                                case 4:
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                    this.spinnerService.stop();
                                    return [3 /*break*/, 6];
                                case 5:
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                    this.spinnerService.stop();
                                    return [3 /*break*/, 6];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); });
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "getItemDetails");
                }
                return [2 /*return*/];
            });
        });
    };
    CheckOutComponent.prototype.addItems = function () {
        var _this = this;
        try {
            var filterItem = this.checkOutItemsList.filter(function (item) { return item.ITEM_ID == _this.itemDetails.ITEM_ID; });
            if (filterItem.length == 0) {
                this.checkOutItemsList.push(this.itemDetails);
            }
            this.isAdd = true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "Add");
        }
    };
    CheckOutComponent.prototype.getItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var searchItem, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        searchItem = void 0;
                        searchItem = this.itemIdSearch.split('-');
                        this.itemIdSearch = searchItem[0].trim();
                        this.msgs = [];
                        if (this.mode = AtParEnums_1.enum_CHECKINOUT[AtParEnums_1.enum_CHECKINOUT.COUT]) {
                            if (this.itemIdSearch == undefined ||
                                this.itemIdSearch == null ||
                                this.itemIdSearch == "") {
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter itemId." });
                                return [2 /*return*/];
                            }
                            if (this.selectedRequestor == undefined ||
                                this.selectedRequestor == null ||
                                this.selectedRequestor == "" ||
                                this.selectedRequestor == "Select Requestor") {
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Requestor." });
                                return [2 /*return*/];
                            }
                        }
                        return [4 /*yield*/, this.getTypeIndicator()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "getItem");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CheckOutComponent.prototype.checkOutItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
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
                                        _this.itemIdSearch = "";
                                        _this.serialIdSearch = "";
                                        _this.selectedRequestor = "Select Requestor";
                                        _this.pop = false;
                                        _this.isAdd = false;
                                        _this.blnShowPatientsPopup = false;
                                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Items checked out successfully." });
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "CheckOut failed" });
                                        _this.spinnerService.stop();
                                        break;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "checkInOutItems");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CheckOutComponent.prototype.onCloseItemClick = function (item, event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.checkOutItemsList = this.checkOutItemsList.filter(function (fItem) { return fItem.ITEM_ID != item.ITEM_ID; });
                    if (this.checkOutItemsList.length == 0) {
                        this.isAdd = false;
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "onCloseItemClick");
                }
                return [2 /*return*/];
            });
        });
    };
    CheckOutComponent.prototype.patientClick = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.selectedRow = item;
                        this.mainForm = false;
                        this.pop = false;
                        this.selectedAccountNumber = item.PATIENT_ID;
                        return [4 /*yield*/, this.bindPatients(item.ITEM_ID)];
                    case 1:
                        _a.sent();
                        this.blnShowPatientsPopup = true;
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    CheckOutComponent.prototype.patientPopupClose = function () {
        this.mainForm = true;
        this.pop = true;
        this.blnShowPatientsPopup = false;
        if (this.selectedRow.PATIENT != "" && this.selectedRow.PATIENT != null && this.selectedRow.PATIENT != undefined) {
            this.isPatient = true;
        }
    };
    CheckOutComponent.prototype.clearPatientSelection = function () {
        this.selectedAccountNumber = "";
        this.selectedRow.PATIENT = "";
        this.selectedRow.PATIENT_ID = "";
    };
    CheckOutComponent.prototype.loadOrgGroupParams = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.lstOrgParms = [];
                    this.spinnerService.start();
                    this.checkInCheckOutItemsServices.getOrgGroupParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].toString(), AtParEnums_1.EnumApps.TrackIT.toString(), "PATIENT_CHARGE")
                        .catch(this.httpService.handleError).then(function (res) {
                        var data = res.json();
                        switch (data.StatType) {
                            case AtParEnums_1.StatusType.Success:
                                _this.msgs = [];
                                _this.strPatientCharge = (data.DataVariable != null) ? data.DataVariable.toString() : "";
                                _this.spinnerService.stop();
                                break;
                            case AtParEnums_1.StatusType.Error:
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                _this.spinnerService.stop();
                                break;
                            case AtParEnums_1.StatusType.Warn:
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                _this.spinnerService.stop();
                                break;
                        }
                    });
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "getRequestors");
                }
                return [2 /*return*/];
            });
        });
    };
    CheckOutComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    CheckOutComponent.prototype.bindPatients = function (itemID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.msgs = [];
                        return [4 /*yield*/, this.checkInCheckOutItemsServices.getPatients(itemID).
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
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_8 = _a.sent();
                        this.msgs = [];
                        this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CheckOutComponent.prototype.grdRdbtnChanged = function (event) {
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
                    this.selectedRow.PATIENT = selectedPatient.PATIENT_NAME;
                    this.selectedRow.PATIENT_ID = selectedPatient.PATIENT_MRC;
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "grdRdbtnChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    CheckOutComponent.prototype.getItems = function () {
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
    CheckOutComponent.prototype.fillItemIDsAuto = function (event) {
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
    CheckOutComponent.prototype.filterItemIDs = function (query, lstItemIDs) {
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
    CheckOutComponent = __decorate([
        core_1.Component({
            templateUrl: 'tkit-check-out.component.html',
            providers: [tkit_check_in_check_out_services_1.CheckInCheckOutItemsServices, AtParConstants_1.AtParConstants, api_1.ConfirmationService],
        }),
        __metadata("design:paramtypes", [tkit_check_in_check_out_services_1.CheckInCheckOutItemsServices,
            router_1.Router,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            router_1.ActivatedRoute,
            AtParConstants_1.AtParConstants,
            AtParSharedDataService_1.AtParSharedDataService,
            api_1.ConfirmationService])
    ], CheckOutComponent);
    return CheckOutComponent;
}());
exports.CheckOutComponent = CheckOutComponent;
//increaseQuantity() {
//    this.itemQuantity += 1;
//}
//decreaseQuantity() {
//    if (this.itemQuantity != 0)
//        this.itemQuantity += 1;
//}
//async checkOutItems() {
//    try {
//        this.spinnerService.start();
//        await this.checkInCheckOutItemsServices.checkOutItems(this.checkOutItemsList, this.selectedRequestor, this.checkoutMode, this.deviceTokenEntry)
//            .forEach(resp => {
//                switch (resp.StatType) {
//                    case StatusType.Success:
//                        this.msgs = [];
//                        console.log(JSON.stringify(resp));
//                        this.spinnerService.stop();
//                        break;
//                    case StatusType.Error:
//                        this.msgs = [];
//                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
//                        this.spinnerService.stop();
//                        break;
//                    case StatusType.Warn:
//                        this.msgs = [];
//                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
//                        this.spinnerService.stop();
//                        break;
//                }
//            });
//    }
//    catch (ex) {
//        this.clientErrorMsg(ex, "checkOutItems");
//    }
//}
//async searchItemIdType(event) {
//    try {
//        await this.getItemTypeIndicator();
//    } catch (ex) {
//        this.clientErrorMsg(ex, "searchItemIdType");
//    }
//}
//async getItemTypeIndicator() {
//    try {
//        this.msgs = [];
//        let msg;
//        this.spinnerService.start();
//        await this.checkInCheckOutItemsServices.getTypeIndicator(this.itemIdSearch)
//            .forEach(resp => {
//                if (resp.StatusCode == AtparStatusCodes.TKIT_E_SERIALINACTIVATED) {
//                    msg = "item " + this.itemIdSearch + " is inactivated";
//                    this.hasSerialId = false;
//                    //this.txtSerialIdDisable = true;
//                    this.msgs = [];
//                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
//                    this.itemIdSearch = '';
//                    this.spinnerService.stop();
//                    return;
//                }
//                else if (resp.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
//                    msg = "item " + this.itemIdSearch + " does not exist";
//                    this.hasSerialId = false;
//                    //this.txtSerialIdDisable = true;
//                    this.msgs = [];
//                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
//                    this.itemIdSearch = '';
//                    this.spinnerService.stop();
//                    return;
//                }
//                else {
//                    switch (resp.StatType) {
//                        case StatusType.Success:
//                            this.msgs = [];
//                            this.itemTypeIndicator = resp.DataVariable;
//                            this.itemIdSearch = resp.Data;
//                            this.spinnerService.stop();
//                            if (this.itemTypeIndicator != undefined && this.itemTypeIndicator != null && this.itemTypeIndicator != "") {
//                                if (this.itemTypeIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.E].toString()) {
//                                   // this.txtSerialIdDisable = false;
//                                } else {
//                                  //  this.txtSerialIdDisable = true;
//                                    this.hasSerialId = false;
//                                }
//                            }
//                            break;
//                        case StatusType.Error:
//                            this.msgs = [];
//                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
//                            this.spinnerService.stop();
//                            break;
//                        case StatusType.Warn:                               
//                            this.msgs = [];
//                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
//                            this.spinnerService.stop();
//                            break;
//                    }
//                }
//            });
//    } catch (ex) {
//        this.clientErrorMsg(ex, "getItemTypeIndicator");
//    }
//}
//# sourceMappingURL=tkit-check-out.component.js.map