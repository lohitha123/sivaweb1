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
var trackit_create_request_service_1 = require("./trackit-create-request.service");
var AtParEnums_1 = require("../../Shared/AtParEnums");
var TkitHttpService_1 = require("../../Shared/TkitHttpService");
var AtParConstants_1 = require("../../Shared/AtParConstants");
var AtParStatusCodes_1 = require("../../Shared/AtParStatusCodes");
var event_spinner_service_1 = require("../../components/spinner/event.spinner.service");
var atpar_trackit_common_service_1 = require("../../Shared/atpar-trackit-common.service");
var TKIT_CART_MANAGER_1 = require("../../Entities/TKIT_CART_MANAGER");
var linq_es5_1 = require("linq-es5");
var platform_browser_1 = require("@angular/platform-browser");
var CreateRequestComponent = (function () {
    function CreateRequestComponent(service, spinnerService, atParCommonService, httpService, title, atParConstant) {
        this.service = service;
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.title = title;
        this.atParConstant = atParConstant;
        this.oncountbuttonclicked = new core_1.EventEmitter();
        this.countvalue = 0;
        this.tkitDeviceTokenEntry = [];
        this.lstFilteredItems = [];
        this.orgGrpID = "";
        this.orgGrpIDData = "";
        this.lstItems = [];
        this.lstLocations = [];
        this.selectedLocation = "";
        this.blnShowPatientsPopup = false;
        this.blnShowSearchForm = false;
        this.blnShowCard = false;
        this.ordernumber = null;
        this.trackItAppId = AtParEnums_1.EnumApps.TrackIT;
        this.eqpIndicator = "";
        this.blnShowPatientCharge = false;
        this.blnShowItemImage = false;
        this.blnShowQtyAvailable = false;
        this.blnShowSelectQty = false;
        this.blnShowDueDateTime = false;
        this.blnShowAvailableTo = false;
        this.blnShowReturnDateTime = false;
        this.requestorDefaultLocation = "";
        this.requestQty = 1;
        this.statusCode = -1;
        this.now = null;
        this.imgBasePath = "";
        this.title.setTitle('TrackIT - Create Request');
    }
    CreateRequestComponent.prototype.addDays = function (theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    };
    CreateRequestComponent.prototype.getLatestValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.service.getLatestValue(this.trackItAppId, "ORDER_NUMBER").
                            catch(this.httpService.handleError).then(function (res) {
                            var data = res.json();
                            _this.ordernumber = data.DataVariable;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateRequestComponent.prototype.add = function () {
    };
    CreateRequestComponent.prototype.edit = function () {
    };
    CreateRequestComponent.prototype.save = function () {
    };
    CreateRequestComponent.prototype.ddlEqTypeChanged = function () {
        this.growlMessage = [];
        this.blnShowCard = false;
        this.blnShowPatientsPopup = false;
        this.selectedDescription = '';
        //if (this.selectedEqpmtType == "Select One" || this.selectedEqpmtType == '' || this.selectedEqpmtType == undefined) {
        //    this.growlMessage = [];
        //    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Equipment Type" });
        //    return;
        //}
        //else {
        //    this.getSearchItems();
        //}
    };
    CreateRequestComponent.prototype.getSearchItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var selectedIndicator, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        selectedIndicator = linq_es5_1.asEnumerable(this.lstEqpTypesTemp).Where(function (x) { return x.ITEM_TYPE === _this.selectedEqpmtType; }).Select(function (x) { return x.ITEM_TYPE_INDICATOR; }).ToArray();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.service.getItemsForAutoSearch(this.selectedEqpmtType, selectedIndicator[0].toString()).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstFilteredItems = data.DataList;
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
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "getSearchItems");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateRequestComponent.prototype.go = function () {
        this.blnShowCard = true;
        this.blnShowSearchForm = true;
        if (this.selectedEqpmtType == null || this.selectedEqpmtType == undefined || this.selectedEqpmtType == "" || this.selectedEqpmtType == "Select One") {
            this.lstEqItemsDetails = [];
            this.blnShowCard = false;
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Equipment Type" });
            return;
        }
        if (this.selectedDescription == null || this.selectedDescription == undefined || this.selectedDescription == "") {
            this.lstEqItemsDetails = [];
            this.blnShowCard = false;
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Search the item to add to the Cart" });
            return;
        }
        this.getEqItems();
    };
    CreateRequestComponent.prototype.patientPopupClose = function () {
        this.blnShowCard = true;
        this.blnShowPatientsPopup = false;
        this.blnShowSearchForm = true;
    };
    CreateRequestComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.blnShowCard = false;
                        this.blnShowPatientsPopup = false;
                        this.blnShowSearchForm = true;
                        this.tkitDeviceTokenEntry = JSON.parse(localStorage.getItem("tkitDeviceTokenEntry"));
                        this.recordsPerPageSize = +this.tkitDeviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.lstEqpTypes = [];
                        this.lstEqpTypes.push({ label: "Select One", value: "Select One" });
                        return [4 /*yield*/, this.populateEquipmentTypes()];
                    case 1:
                        _a.sent();
                        this.lstEqItemsDetails = new Array();
                        return [4 /*yield*/, this.bindLocations()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getOrgGroupParamValue()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getRequestorDefaultLocation()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.setImgPath()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.getDefDateRange()];
                    case 6:
                        _a.sent();
                        if (localStorage.getItem('tkitViewCartItemsCount') != null && localStorage.getItem('tkitViewCartItemsCount') != undefined && localStorage.getItem('tkitViewCartItemsCount') != '') {
                            this.countvalue = parseInt(localStorage.getItem('tkitViewCartItemsCount').toString());
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateRequestComponent.prototype.setImgPath = function () {
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
    CreateRequestComponent.prototype.OnDestroy = function () {
        this.tkitDeviceTokenEntry = [];
        this.blnShowCard = false;
    };
    CreateRequestComponent.prototype.getEqItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var value, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstEqItems = [];
                        if (!(this.selectedDescription != null && this.selectedDescription != undefined && this.selectedDescription != "")) return [3 /*break*/, 5];
                        value = this.selectedDescription.split(" (")[0];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.blnShowCard = false;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.service.getEquipmentItems(this.selectedEqpmtType, value).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                ;
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.eqpIndicator = data.DataVariable.toString();
                                        _this.lstEqItems = data.DataList;
                                        if (_this.lstEqItems.length > 0) {
                                            _this.blnShowCard = true;
                                        }
                                        _this.bindDetails();
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
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "getSearchItems");
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        this.lstEqItemsDetails = [];
                        this.blnShowCard = false;
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Search the item to add to the cart" });
                        return [2 /*return*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CreateRequestComponent.prototype.bindLocations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
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
    CreateRequestComponent.prototype.getRequestorDefaultLocation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        return [4 /*yield*/, this.service.getRequestorDefaultLocation().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.requestorDefaultLocation = data.DataVariable.toString();
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
                        ex_4 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateRequestComponent.prototype.bindPatients = function (itemID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
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
                        ex_5 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateRequestComponent.prototype.bindDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var k;
            return __generator(this, function (_a) {
                this.imgBasePath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/Web/Uploaded';
                this.blnShowItemImage = true;
                this.blnShowQtyAvailable = true;
                this.blnShowSelectQty = true;
                this.blnShowDueDateTime = true;
                this.blnShowAvailableTo = true;
                this.blnShowReturnDateTime = true;
                //YesNo_Enum[YesNo_Enum.N].toString()
                if (this.eqpIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.B].toString()) {
                    this.blnShowItemImage = false;
                    this.blnShowQtyAvailable = false;
                    this.blnShowSelectQty = false;
                    //this.blnShowDueDateTime = false;               
                }
                else if (this.eqpIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.E].toString()) {
                    this.blnShowQtyAvailable = false;
                    this.blnShowSelectQty = true;
                    this.blnShowReturnDateTime = true;
                    this.blnShowDueDateTime = true;
                }
                else if (this.eqpIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.F].toString()) {
                    this.blnShowDueDateTime = false;
                    this.blnShowAvailableTo = false;
                    this.blnShowReturnDateTime = false;
                    this.blnShowDueDateTime = true;
                    this.blnShowSelectQty = true;
                }
                this.lstEqItems.forEach(function (item) {
                    if (item.IMAGE != "" && item.IMAGE != null && item.IMAGE != undefined) {
                        item.IMAGE = _this.imgBasePath + '/' + item.IMAGE;
                    }
                    else {
                        item.IMAGE = '';
                    }
                    item.DELIVER_LOC = '';
                    item.DUE_TIME = _this.getCurrentTime();
                    item.DUE_DATE = new Date();
                    if (_this.eqpIndicator !== AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.E].toString()) {
                        item.RETURN_DATE = _this.addDays(item.DUE_DATE, _this.defaultReportDuration);
                        item.RETURN_TIME = _this.getCurrentTime();
                    }
                    else {
                        item.RETURN_DATE = "";
                        item.RETURN_TIME = "";
                    }
                });
                this.lstEqItemsDetails = [];
                for (k = 0; k < this.lstEqItems.length; k++) {
                    this.lstEqItems[k].DELIVER_LOC = this.requestorDefaultLocation;
                    if (this.lstEqItems[k].ITEM_QTY != 0) {
                        this.lstEqItemsDetails.push(this.lstEqItems[k]);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    CreateRequestComponent.prototype.getCurrentTime = function () {
        var now = new Date();
        var isPM = now.getHours() >= 12;
        var isMidday = now.getHours() == 12;
        this.time = [now.getHours() - (isPM && !isMidday ? 12 : 0),
            now.getMinutes(),].join(':');
        var minutes = this.time.split(':');
        if (minutes[1].length > 1) {
            this.time = this.time;
        }
        else {
            this.time = minutes[0] + ":" + "0" + minutes[1];
        }
        if (isPM) {
            this.time = this.time + " " + "PM";
        }
        else {
            this.time = this.time + " " + "AM";
        }
        return this.time;
    };
    CreateRequestComponent.prototype.fillItemsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, selectedIndicator, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstFilteredItems = [];
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!(this.selectedEqpmtType != null && this.selectedEqpmtType != undefined && this.selectedEqpmtType != "" && this.selectedEqpmtType != "Select One")) return [3 /*break*/, 3];
                        selectedIndicator = linq_es5_1.asEnumerable(this.lstEqpTypesTemp).Where(function (x) { return x.ITEM_TYPE === _this.selectedEqpmtType; }).Select(function (x) { return x.ITEM_TYPE_INDICATOR; }).ToArray();
                        return [4 /*yield*/, this.service.getItemsForAutoSearch(this.selectedEqpmtType, selectedIndicator[0].toString()).
                                catch(this.httpService.handleError).then(function (res) {
                                _this.spinnerService.stop();
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstItems = data.DataList;
                                        _this.lstFilteredItems = _this.filterBusinessUnits(query, _this.lstItems);
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.StatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Equipment Type" });
                        return [2 /*return*/];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "fillItemsAuto");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CreateRequestComponent.prototype.filterBusinessUnits = function (query, businessunits) {
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
    CreateRequestComponent.prototype.populateEquipmentTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.getEquipmentType(this.tkitDeviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
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
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "populateEquipmentTypes");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateRequestComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    CreateRequestComponent.prototype.patientClick = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.selectedRow = item;
                this.selectedAccountNumber = item.PATIENT_ID;
                this.blnShowCard = false;
                this.blnShowSearchForm = false;
                this.blnShowPatientsPopup = true;
                this.bindPatients(item.ITEM_ID);
                return [2 /*return*/];
            });
        });
    };
    CreateRequestComponent.prototype.clearPatientSelection = function () {
        this.selectedAccountNumber = "";
        this.selectedRow.PATIENT = "";
        this.selectedRow.PATIENT_ID = "";
    };
    CreateRequestComponent.prototype.grdRdbtnChanged = function (event) {
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
    CreateRequestComponent.prototype.getOrgGroupParamValue = function () {
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
    CreateRequestComponent.prototype.addToCartClick = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var currentTime, cartManager, dateStr, datepart, time, dateStr, datepart, dateStr, datepart, time, dateStr, datepart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentTime = new Date();
                        if (this.eqpIndicator != AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.B].toString()) {
                            if (item.REQUEST_QTY == null || item.REQUEST_QTY == undefined) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Select Qty" });
                                return [2 /*return*/];
                            }
                        }
                        if (this.eqpIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.B].toString() || this.eqpIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.F].toString()) {
                            if ((item.RETURN_TIME == null || item.RETURN_TIME == "") || (item.DUE_TIME == null || item.DUE_TIME == "")) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Time(HH:MM)" });
                                return [2 /*return*/];
                            }
                        }
                        else {
                            if (item.RETURN_DATE != null && item.RETURN_DATE != "") {
                                if ((item.RETURN_TIME == null || item.RETURN_TIME == "") || (item.DUE_TIME == null || item.DUE_TIME == "")) {
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Time(HH:MM)" });
                                    return [2 /*return*/];
                                }
                            }
                        }
                        this.spinnerService.start();
                        cartManager = new TKIT_CART_MANAGER_1.TKIT_CART_MANAGER();
                        cartManager.ORG_GROUP_ID = this.tkitDeviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].toString();
                        cartManager.REQUESTOR_ID = this.tkitDeviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString();
                        cartManager.ITEM_ID = item.ITEM_ID;
                        cartManager.ITEM_DESCR = item.ITEM_DESCR;
                        cartManager.REQUEST_QTY = item.REQUEST_QTY;
                        cartManager.LOCATION_ID = item.DELIVER_LOC;
                        cartManager.PATIENT_ID = item.PATIENT_ID;
                        cartManager.PATIENT_LAST_NAME = item.PATIENT;
                        cartManager.PROCEDURE_CODE = "";
                        cartManager.REQUEST_FOR_USE_DATE = new Date();
                        cartManager.SERIAL_NO = item.SERIAL_NO.toString();
                        if (item.DUE_TIME != this.time) {
                            dateStr = new Date(item.DUE_TIME).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                            item.DUE_TIME = dateStr.replace(',', '');
                            datepart = item.DUE_TIME.split(' ');
                            if (datepart != null && datepart.length > 0) {
                                time = datepart[1].split(':');
                                item.DUE_TIME = time[0] + ':' + time[1] + ' ' + datepart[2];
                            }
                        }
                        if (item.DUE_DATE != null && item.DUE_DATE != "") {
                            dateStr = new Date(item.DUE_DATE).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                            item.DUE_DATE = dateStr.replace(',', '');
                            datepart = item.DUE_DATE.split(' ');
                            if (datepart != null && datepart.length > 0) {
                                cartManager.NEEDED_BY_DATE = datepart[0] + " " + item.DUE_TIME;
                            }
                        }
                        if (this.eqpIndicator != AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.F].toString()) {
                            if (item.RETURN_TIME != this.time) {
                                dateStr = new Date(item.RETURN_TIME).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                item.RETURN_TIME = dateStr.replace(',', '');
                                datepart = item.RETURN_TIME.split(' ');
                                if (datepart != null && datepart.length > 0) {
                                    time = datepart[1].split(':');
                                    item.RETURN_TIME = time[0] + ':' + time[1] + ' ' + datepart[2];
                                }
                            }
                            dateStr = new Date(item.RETURN_DATE).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                            item.RETURN_DATE = dateStr.replace(',', '');
                            if (item.RETURN_DATE != null && item.RETURN_DATE != "") {
                                datepart = item.RETURN_DATE.split(' ');
                                if (datepart != null && datepart.length > 0) {
                                    cartManager.ESTIMATED_RETURN_DATE = datepart[0] + " " + item.RETURN_TIME;
                                }
                            }
                        }
                        if (Date.parse(item.DUE_DATE.toString()) && Date.parse(item.RETURN_DATE.toString())) {
                            if (Date.parse(this.convertDateFormate(item.DUE_DATE)) < Date.parse(this.convertDateFormate(currentTime.toString()))) {
                                this.spinnerService.stop();
                                this.growlMessage = [];
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Neededby Date Time must be greater than or equal to current date"
                                });
                                return [2 /*return*/, false];
                            }
                        }
                        if (Date.parse(item.DUE_DATE.toString()) && Date.parse(item.RETURN_DATE.toString())) {
                            if (Date.parse(item.DUE_DATE) > Date.parse(item.RETURN_DATE)) {
                                this.spinnerService.stop();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Estimated Return Date should be greater than Needed by Date" });
                                return [2 /*return*/, false];
                            }
                        }
                        if (item.ITEM_QTY && item.REQUEST_QTY) {
                            if (item.REQUEST_QTY > item.ITEM_QTY) {
                                this.spinnerService.stop();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Requested quantity should not be greater than available quantity" });
                                return [2 /*return*/, false];
                            }
                        }
                        this.growlMessage = [];
                        return [4 /*yield*/, this.service.addToCart(this.eqpIndicator, cartManager).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        var msg_1 = "Item :" + cartManager.ITEM_ID + " Added to the Cart Successfully";
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg_1 });
                                        _this.blnShowCard = false;
                                        _this.selectedDescription = "";
                                        _this.selectedEqpmtType = "Select One";
                                        // to do need to remove the item from list
                                        //let eqItems = this.lstEqItemsDetails;
                                        //this.lstEqItemsDetails = [];
                                        //for (let i = 0; i < eqItems.length; i++){
                                        //    let checkItem = eqItems.filter(x => x.ITEM_ID == cartManager.ITEM_ID);
                                        //    if (checkItem != null && checkItem.length != 1) {
                                        //        this.lstEqItemsDetails.push(eqItems[i]);
                                        //    }
                                        //}
                                        //this.lstEqItemsDetails.slice()
                                        //count updating
                                        if (_this.eqpIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.B].toString()) {
                                            _this.countvalue = parseInt(_this.countvalue.toString()) + 1;
                                        }
                                        else {
                                            _this.countvalue = parseInt(_this.countvalue.toString()) + parseInt(cartManager.REQUEST_QTY.toString());
                                        }
                                        localStorage.setItem('tkitViewCartItemsCount', _this.countvalue.toString());
                                        _this.spinnerService.emitCountChangedValue(_this.countvalue);
                                        _this.oncountbuttonclicked.emit(_this.countvalue);
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        var msg = data.StatusMessage.replace("1%", item.ITEM_ID).replace("2%", item.DELIVER_LOC);
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
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
    CreateRequestComponent.prototype.getDefDateRange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.getTKITMyPreferences("DEFAULT_REPORT_DURATION", this.tkitDeviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.defaultReportDuration = parseInt(data.DataVariable.toString());
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
                        ex_8 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateRequestComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CreateRequestComponent.prototype, "oncountbuttonclicked", void 0);
    CreateRequestComponent = __decorate([
        core_1.Component({
            templateUrl: 'trackit.create.request.component.html',
            providers: [
                TkitHttpService_1.TkitHttpService,
                AtParConstants_1.AtParConstants,
                trackit_create_request_service_1.TrackITCreateRequestService,
                atpar_trackit_common_service_1.AtParTrackITCommonService
            ],
        }),
        __metadata("design:paramtypes", [trackit_create_request_service_1.TrackITCreateRequestService,
            event_spinner_service_1.SpinnerService,
            atpar_trackit_common_service_1.AtParTrackITCommonService,
            TkitHttpService_1.TkitHttpService,
            platform_browser_1.Title,
            AtParConstants_1.AtParConstants])
    ], CreateRequestComponent);
    return CreateRequestComponent;
}());
exports.CreateRequestComponent = CreateRequestComponent;
//# sourceMappingURL=trackit.create.request.component.js.map