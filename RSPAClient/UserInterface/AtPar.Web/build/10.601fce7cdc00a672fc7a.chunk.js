webpackJsonp([10],{

/***/ 1373:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TKIT_REQUESTOR = (function () {
    function TKIT_REQUESTOR() {
    }
    return TKIT_REQUESTOR;
}());
exports.TKIT_REQUESTOR = TKIT_REQUESTOR;


/***/ }),

/***/ 1473:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS = (function () {
    function VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS() {
    }
    return VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS;
}());
exports.VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS = VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS;


/***/ }),

/***/ 1637:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var AtParEnums_1 = __webpack_require__(14);
var AllocateLocationGroupsComponent = (function () {
    function AllocateLocationGroupsComponent() {
        this.trackITAppId = AtParEnums_1.EnumApps.TrackIT;
    }
    return AllocateLocationGroupsComponent;
}());
AllocateLocationGroupsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2132)
    })
], AllocateLocationGroupsComponent);
exports.AllocateLocationGroupsComponent = AllocateLocationGroupsComponent;


/***/ }),

/***/ 1638:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ChargeReportComponent = (function () {
    function ChargeReportComponent() {
    }
    return ChargeReportComponent;
}());
ChargeReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2133)
    })
], ChargeReportComponent);
exports.ChargeReportComponent = ChargeReportComponent;


/***/ }),

/***/ 1639:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
__webpack_require__(32);
var Rx_1 = __webpack_require__(37);
var HttpService_1 = __webpack_require__(12);
var CheckInCheckOutItemsServices = (function () {
    function CheckInCheckOutItemsServices(httpservice) {
        this.httpservice = httpservice;
    }
    CheckInCheckOutItemsServices.prototype.getTypeIndicator = function (itemId) {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/GetTypeIndicator",
            params: {
                "itemId": itemId
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    CheckInCheckOutItemsServices.prototype.checkEqItemAvailability = function (itemId, requestor) {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/CheckEqItemAvailability",
            params: {
                "itemId": itemId,
                "requestor": requestor
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    CheckInCheckOutItemsServices.prototype.checkItemAvailability = function (itemId, requestor, itemTypeIndicator) {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/CheckItemAvailability",
            params: {
                "itemId": itemId,
                "requestor": requestor,
                "itemTypeIndicator": itemTypeIndicator
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    CheckInCheckOutItemsServices.prototype.checkSerialId = function (itemId, serialId) {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/CheckSerialId",
            params: {
                "itemId": itemId,
                "serialId": serialId
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    CheckInCheckOutItemsServices.prototype.getItemDetails = function (itemId, requestor, itemTypeIndicator, serialId) {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/GetItemDetails",
            params: {
                "itemId": itemId,
                "requestor": requestor,
                "itemTypeIndicator": itemTypeIndicator,
                "serialId": serialId
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    CheckInCheckOutItemsServices.prototype.getRequestors = function (inActiveCheck, deviceTokenEntry) {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/GetRequestors",
            params: {
                "inActiveCheck": inActiveCheck,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    CheckInCheckOutItemsServices.prototype.checkOutItems = function (lstCheckInOutItemDetails, requestedUserId, checkInOutMode, deviceTokenEntry) {
        return this.httpservice.update({
            apiMethod: '/api/CheckInCheckOutItems/UpdateRequestorDetails',
            formData: lstCheckInOutItemDetails,
            params: {
                "requestedUserId": requestedUserId,
                "checkInOutMode": checkInOutMode,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    CheckInCheckOutItemsServices.prototype.getOrgGroupParamValue = function (orgGpId, appId, fieldName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.httpservice.getSync({
                        apiMethod: "/api/Common/GetOrgGroupParamValue",
                        params: {
                            "orgGroupID": orgGpId,
                            "appID": appId,
                            "orgParamName": fieldName
                        }
                    })];
            });
        });
    };
    CheckInCheckOutItemsServices.prototype.getLocations = function (orgGrpId) {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/GetLocations",
            params: {
                "orgGrpId": orgGrpId
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    CheckInCheckOutItemsServices.prototype.checkInOutItems = function (lstCheckInOutItemDetails, requestedUserId, checkInOutMode) {
        return this.httpservice.update({
            apiMethod: "/api/CheckInCheckOutItems/CheckInOutItems",
            formData: lstCheckInOutItemDetails,
            params: {
                "requestedUserId": requestedUserId,
                "checkInOutMode": checkInOutMode
            }
        });
    };
    CheckInCheckOutItemsServices.prototype.getTKITDepts = function (deptID, status) {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/GetTKITDepts",
            params: {
                "deptID": deptID,
                "status": status
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    CheckInCheckOutItemsServices.prototype.getPatientList = function (deptID, status) {
        return this.httpservice.get({
            apiMethod: "/api/CreateRequest/GetPatientList",
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    CheckInCheckOutItemsServices.prototype.getUserDepts = function () {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/GetUserDepts",
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    CheckInCheckOutItemsServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return CheckInCheckOutItemsServices;
}());
CheckInCheckOutItemsServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], CheckInCheckOutItemsServices);
exports.CheckInCheckOutItemsServices = CheckInCheckOutItemsServices;


/***/ }),

/***/ 1640:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var datatableservice_1 = __webpack_require__(131);
var tkit_check_in_check_out_services_1 = __webpack_require__(1639);
var AtParConstants_1 = __webpack_require__(31);
var AtParEnums_1 = __webpack_require__(14);
var event_spinner_service_1 = __webpack_require__(24);
var AtParStatusCodes_1 = __webpack_require__(50);
var router_1 = __webpack_require__(29);
var AtParSharedDataService_1 = __webpack_require__(167);
var routepath_1 = __webpack_require__(70);
var VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS_1 = __webpack_require__(1473);
var PAR_MNGT_VENDOR_1 = __webpack_require__(633);
var CheckIn_CheckOutComponent = (function () {
    function CheckIn_CheckOutComponent(checkInCheckOutItemsServices, router, spinnerService, route, atParConstant, atParSharedDataService) {
        this.checkInCheckOutItemsServices = checkInCheckOutItemsServices;
        this.router = router;
        this.spinnerService = spinnerService;
        this.route = route;
        this.atParConstant = atParConstant;
        this.atParSharedDataService = atParSharedDataService;
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
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    CheckIn_CheckOutComponent.prototype.go = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.pop = false;
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
            return __generator(this, function (_a) {
                try {
                    this.spinnerService.start();
                    this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                    this.msgs = [];
                    this.mode = AtParEnums_1.enum_CHECKINOUT[AtParEnums_1.enum_CHECKINOUT.COUT];
                    this.getRequestors();
                    this.spinnerService.stop();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "ngOnInit");
                }
                return [2 /*return*/];
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.increaseQuantity = function () {
        try {
            if (this.itemDetails.checkinQty != 0 && this.itemDetails.checkinQty != null && this.itemDetails.checkinQty != undefined) {
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
            var msg, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.checkInCheckOutItemsServices.getTypeIndicator(this.itemIdSearch)
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
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "getTypeIndicator");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.getRequestors = function () {
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
            this.clientErrorMsg(ex, "getTypeIndicator");
        }
    };
    CheckIn_CheckOutComponent.prototype.checkSerialId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var msg_1, ex_3;
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
                                    return;
                                }
                                else if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_SERIALNOTEXISTS) {
                                    msg_1 = "Serial# " + _this.serialIdSearch + " does not exist";
                                    _this.msgs = [];
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_1 });
                                    _this.itemIdSearch = '';
                                    _this.serialIdSearch = '';
                                    _this.hasSerialId = false;
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
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "checkSerialId");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.serialIdCheck = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
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
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "serialIdCheck");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.checkEqItemAvailability = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var msg_2, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.spinnerService.start();
                        if (!(this.hasSerialId == true && this.itemIdSearch == this.itemSearchID)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.checkSerialId()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, this.checkInCheckOutItemsServices.checkEqItemAvailability(this.itemIdSearch, this.selectedRequestor)
                            .forEach(function (resp) {
                            if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_ITEMNOTALLOWED) {
                                msg_2 = "Item " + _this.itemIdSearch + " is not allowed for the selected user";
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_2 });
                                _this.itemIdSearch = '';
                                _this.hasSerialId = false;
                                return;
                            }
                            else if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.TKIT_E_ITEMNOTAVAILABLE) {
                                msg_2 = "Item " + _this.itemIdSearch + +" does not exist";
                                _this.msgs = [];
                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg_2 });
                                _this.itemIdSearch = '';
                                _this.hasSerialId = false;
                                return;
                            }
                            switch (resp.StatType) {
                                case AtParEnums_1.StatusType.Success:
                                    _this.msgs = [];
                                    var itemAvailability = resp.DataVariable;
                                    if (itemAvailability > 0) {
                                        _this.pop = false;
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
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "checkEqItemAvailability");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.checkItemAvailability = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var msg, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.checkInCheckOutItemsServices.checkItemAvailability(this.itemIdSearch, this.selectedRequestor, this.itemTypeIndicator)
                                .forEach(function (resp) {
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.msgs = [];
                                        var itemAvailability = resp.DataVariable;
                                        if (itemAvailability > 0 && _this.itemTypeIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.B].toString()) {
                                            _this.hasSerialId = false;
                                            _this.pop = false;
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
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "checkItemAvailability");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.getItemDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.checkInCheckOutItemsServices.getItemDetails(this.itemIdSearch, this.selectedRequestor, this.itemTypeIndicator, this.serialIdSearch)
                                .forEach(function (resp) {
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
                                            _this.isSerial = true;
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
                                            _this.isSerial = false;
                                            _this.isDisabled = true;
                                            _this.cursor = 'none';
                                        }
                                        else if (_this.itemTypeIndicator == AtParEnums_1.enum_TKIT_EQP_TYPE[AtParEnums_1.enum_TKIT_EQP_TYPE.F].toString()) {
                                            _this.itemDetails.itemQty = _this.item[0].ITEM_QTY;
                                            _this.itemDetails.color = "panel panel-pink no-shadow bdr-1";
                                            _this.isSerial = false;
                                            _this.isDisabled = false;
                                            _this.cursor = 'pointer';
                                        }
                                        _this.itemDetails.DELIVER_LOCATION = _this.item[0].STORAGE_LOCATION;
                                        _this.itemDetails.PROCEDURE_CODE = "";
                                        _this.itemDetails.PATIENT_ID = "";
                                        _this.itemDetails.PATIENT_LNAME = "";
                                        _this.itemDetails.ASSET_ID = _this.item[0].ASSET_ID;
                                        _this.itemSearchID = '';
                                        _this.serialIdSearch = '';
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
                        this.clientErrorMsg(ex_7, "getItemDetails");
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
            var ex_8;
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
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "checkInOutItems");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.checkOutItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.checkInCheckOutItemsServices.checkOutItems(this.checkOutItemsList, this.selectedRequestor, this.checkoutMode, this.deviceTokenEntry)
                                .forEach(function (resp) {
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.msgs = [];
                                        console.log(JSON.stringify(resp));
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
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "checkOutItems");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CheckIn_CheckOutComponent.prototype.getItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
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
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, "getItem");
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
    CheckIn_CheckOutComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    return CheckIn_CheckOutComponent;
}());
CheckIn_CheckOutComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2134),
        providers: [tkit_check_in_check_out_services_1.CheckInCheckOutItemsServices, AtParConstants_1.AtParConstants, datatableservice_1.datatableservice],
    }),
    __metadata("design:paramtypes", [tkit_check_in_check_out_services_1.CheckInCheckOutItemsServices,
        router_1.Router,
        event_spinner_service_1.SpinnerService,
        router_1.ActivatedRoute,
        AtParConstants_1.AtParConstants,
        AtParSharedDataService_1.AtParSharedDataService])
], CheckIn_CheckOutComponent);
exports.CheckIn_CheckOutComponent = CheckIn_CheckOutComponent;


/***/ }),

/***/ 1641:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var tkit_check_in_check_out_services_1 = __webpack_require__(1639);
var api_1 = __webpack_require__(72);
var AtParConstants_1 = __webpack_require__(31);
var HttpService_1 = __webpack_require__(12);
var AtParEnums_1 = __webpack_require__(14);
var event_spinner_service_1 = __webpack_require__(24);
var router_1 = __webpack_require__(29);
var AtParSharedDataService_1 = __webpack_require__(167);
var routepath_1 = __webpack_require__(70);
var VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS_1 = __webpack_require__(1473);
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
        this.itemQuantity = 0;
        this.itemIdSearch = "";
        this.hasSerialId = false;
        this.pop = false;
        this.isAdd = false;
        this.statusMesssage = "";
        this.serialIdSearch = "";
        this.itemTypeIndicator = "";
        this.selectedRequestor = "";
        this.checkoutMode = "";
        this.selectedDeliveryLoc = "";
        this.strPatientCharge = "";
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    CheckOutComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.msgs = [];
                        this.mode = AtParEnums_1.enum_CHECKINOUT[AtParEnums_1.enum_CHECKINOUT.COUT];
                        return [4 /*yield*/, this.loadOrgGroupParams()];
                    case 1:
                        _a.sent();
                        this.getRequestors();
                        this.spinnerService.stop();
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
    CheckOutComponent.prototype.increaseQuantity = function () {
        this.itemQuantity += 1;
    };
    CheckOutComponent.prototype.decreaseQuantity = function () {
        if (this.itemQuantity != 0)
            this.itemQuantity += 1;
    };
    CheckOutComponent.prototype.getTypeIndicator = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.msgs = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.checkInCheckOutItemsServices.getTypeIndicator(this.itemIdSearch)
                                .forEach(function (resp) {
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
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "getTypeIndicator");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
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
        var _this = this;
        try {
            this.spinnerService.start();
            this.checkInCheckOutItemsServices.getLocations(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].toString())
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
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getRequestors");
        }
    };
    CheckOutComponent.prototype.checkSerialId = function () {
        var _this = this;
        try {
            this.spinnerService.start();
            this.checkInCheckOutItemsServices.checkSerialId(this.itemIdSearch, this.itemIdSearch)
                .forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_1.StatusType.Success:
                        _this.msgs = [];
                        _this.hasSerialId = true;
                        _this.getTypeIndicator();
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
            this.clientErrorMsg(ex, "checkSerialId");
        }
    };
    CheckOutComponent.prototype.serialIdCheck = function () {
        this.checkSerialId();
        this.getItemDetails();
    };
    CheckOutComponent.prototype.checkEqItemAvailability = function () {
        var _this = this;
        try {
            this.spinnerService.start();
            this.checkInCheckOutItemsServices.checkEqItemAvailability(this.itemIdSearch, this.selectedRequestor)
                .forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_1.StatusType.Success:
                        _this.msgs = [];
                        var itemAvailability = resp.DataVariable;
                        if (itemAvailability > 0) {
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
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkEqItemAvailability");
        }
    };
    CheckOutComponent.prototype.checkItemAvailability = function () {
        var _this = this;
        try {
            this.spinnerService.start();
            this.checkInCheckOutItemsServices.checkItemAvailability(this.itemIdSearch, this.selectedRequestor, this.itemTypeIndicator)
                .forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_1.StatusType.Success:
                        _this.msgs = [];
                        var itemAvailability = resp.DataVariable;
                        if (itemAvailability > 0) {
                            _this.hasSerialId = false;
                            _this.serialIdSearch = "";
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
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkItemAvailability");
        }
    };
    CheckOutComponent.prototype.getItemDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.spinnerService.start();
                    this.checkInCheckOutItemsServices.getItemDetails(this.itemIdSearch, this.selectedRequestor, this.itemTypeIndicator, this.serialIdSearch)
                        .forEach(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, item;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
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
    CheckOutComponent.prototype.Add = function () {
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
    CheckOutComponent.prototype.checkOutItems = function () {
        var _this = this;
        try {
            this.spinnerService.start();
            this.checkInCheckOutItemsServices.checkOutItems(this.checkOutItemsList, this.selectedRequestor, this.checkoutMode, this.deviceTokenEntry)
                .forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_1.StatusType.Success:
                        _this.msgs = [];
                        console.log(JSON.stringify(resp));
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
            this.clientErrorMsg(ex, "checkOutItems");
        }
    };
    CheckOutComponent.prototype.getItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
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
                        this.getItemDetails();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "getItem");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CheckOutComponent.prototype.onClickPatient = function () {
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
    return CheckOutComponent;
}());
CheckOutComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2135),
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
exports.CheckOutComponent = CheckOutComponent;


/***/ }),

/***/ 1642:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var HttpService_1 = __webpack_require__(12);
var AtParEnums_1 = __webpack_require__(14);
var AtParConstants_1 = __webpack_require__(31);
var AtParStatusCodes_1 = __webpack_require__(50);
var routepath_1 = __webpack_require__(70);
var file_saver_1 = __webpack_require__(228);
var router_1 = __webpack_require__(29);
var leftbar_animation_service_1 = __webpack_require__(229);
var DailyActivityComponent = (function () {
    /**
    * Constructor
    * @param AtParCommonService
    * @param httpService
    * @param spinnerService
    * @param AtParConstants
    */
    function DailyActivityComponent(leftBarAnimateService, httpService, commonService, spinnerService, router, atParConstant, route) {
        this.leftBarAnimateService = leftBarAnimateService;
        this.httpService = httpService;
        this.commonService = commonService;
        this.spinnerService = spinnerService;
        this.router = router;
        this.atParConstant = atParConstant;
        this.route = route;
        this.lstDailyActivityDetails = [];
        this.lstFilterData = [];
        this.rowsPerPage = "";
        this.ipAddress = "";
        this.gstrProtocal = "";
        this.gstrPortNo = "";
        this.string = "";
        this.deviceTokenEntry = [];
        this.isVisible = false;
        this.isMailDialog = false;
        this.tdExports = false;
        this.growlMessage = [];
        this.toMailAddr = "";
        this.statusCode = -1;
        try {
            this.spinnerService.start();
            this.breadCrumbMenu = new routepath_1.Menus();
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'constructor');
        }
        this.spinnerService.stop();
    }
    /**
    * This finction is for  bind data to the datatable when page loading
    */
    DailyActivityComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.rowsPerPage = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        date = new Date;
                        this.SelectedDate = this.convertDateFormate(date);
                        return [4 /*yield*/, this.btnGo_Click()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, 'OnInit');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when click on Go button
    */
    DailyActivityComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lstData, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        lstData = [];
                        this.growlMessage = [];
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.httpService.getSync({
                                apiMethod: "/api/DailyActivityReport/GetTKITDailyUserActivityRep",
                                params: {
                                    "pToDate": this.convertDateFormate(this.SelectedDate)
                                }
                            }).catch(this.httpService.handleError)
                                .then(function (res) {
                                var res2 = res.json();
                                _this.spinnerService.stop();
                                _this.statusCode = res2.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.isVisible = true;
                                    _this.tdExports = true;
                                    lstData = res2.DataDictionary["pDsDailyActRep"]["Table1"];
                                    if (lstData.length > 0) {
                                        _this.lstDailyActivityDetails = lstData;
                                    }
                                }
                                else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.tdExports = false;
                                    _this.isVisible = false;
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res2.StatusMessage });
                                    return;
                                }
                                else {
                                    _this.tdExports = false;
                                    _this.isVisible = false;
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res2.StatusMessage });
                                    return;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "btnGo_Click");
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when user click on Details link in the datatable and after clicking navigating to pointOfuse Daily User Activity Report screen
    */
    DailyActivityComponent.prototype.onDetailsClick = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var appId, lastName, userArray, navigationExtras, menuItems, i, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        appId = 0;
                        appId = AtParEnums_1.EnumApps.TrackIT;
                        lastName = "";
                        userArray = [];
                        userArray = item.USERNAME.split(" ", 3);
                        lastName = userArray[2].trim().split("(", 1);
                        navigationExtras = {
                            queryParams: {
                                "p1value": appId,
                                "p2value": item.UID,
                                "p4value": this.convertDateFormate(this.SelectedDate),
                                "p5value": userArray[0],
                                "p6value": lastName,
                                "p7value": userArray[1],
                                "p3value": this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]
                            }
                        };
                        this.breadCrumbMenu.MENU_NAME = "Daily Activity";
                        this.breadCrumbMenu.ROUTE = 'trackit/dailyactivity';
                        this.breadCrumbMenu.SUB_MENU_NAME = '';
                        this.breadCrumbMenu.GROUP_NAME = 'Reports & Dashboards';
                        this.breadCrumbMenu.APP_NAME = 'TrackIT';
                        this.breadCrumbMenu.IS_DIV = false;
                        localStorage.setItem('localBreadCrumb', JSON.stringify(this.breadCrumbMenu));
                        menuItems = JSON.parse(localStorage.getItem('MenuList'));
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < menuItems.length)) return [3 /*break*/, 4];
                        if (!(menuItems[i].ROUTE == 'trackit/dailyactivity')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.leftBarAnimateService.emitChangeReportaActiveMenu(menuItems[i].MENU_NAME.trim())];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.router.navigate(['atpar/reports/customreport/166499B2-65E6-436E-A497-313C56731F71'], navigationExtras)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "onDetailsClick");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is used for change date format to mm/dd/yyyy
    */
    DailyActivityComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    DailyActivityComponent.prototype.onChargesFilterData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.lstFilterData = data;
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "onChargesFilterData");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * This method is calling when user click on Mail Icon
     * @param event
     */
    DailyActivityComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.isMailDialog = true;
                    this.toMailAddr = "";
                }
                catch (ex) {
                    this.clientErrorMsg(ex, 'onSendMailIconClick');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * This method is calling when user userclick on submit button after enter mailid
     * @param event
     */
    DailyActivityComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.growlMessage = [];
                        if (this.toMailAddr == "" || this.toMailAddr == undefined) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Email Address to Send' });
                            return [2 /*return*/];
                        }
                        val = this.validateEmail(this.toMailAddr);
                        if (!val) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Email Address to Send' });
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        this.isMailDialog = false;
                        return [4 /*yield*/, this.ExportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = "";
                        if (!(html != "" && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'TrackIT Daily Activity Report', JSON.stringify(html), this.toMailAddr, AtParEnums_1.MailPriority.Normal.toString(), "")
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                            })];
                    case 2:
                        _a.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Mail has been sent' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'From Address is Missing! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Please Enter valid Email Address to Send' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_BODY) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Email Server not configured! Please contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SEND_FAILED) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                        }
                        else {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                        }
                        _a.label = 3;
                    case 3:
                        this.toMailAddr = "";
                        return [3 /*break*/, 6];
                    case 4:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, 'onSendMailClick');
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is used for validating Email
    * @param event
    */
    DailyActivityComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    /**
     * This method is calling when user click on print Icon
     * @param event
     */
    DailyActivityComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.growlMessage = [];
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.ExportReportDetails('Print')];
                    case 1:
                        html = _a.sent();
                        if (html != "" && html != null) {
                            mywindow = window.open("", 'PRINT', 'height=600,width=600');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'TracIT - Daily Activity Report' + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                mywindow.document.close(); // necessary for IE >= 10
                                mywindow.focus(); // necessary for IE >= 10*/
                                mywindow.print();
                                mywindow.close();
                                return [2 /*return*/, true];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, 'onPrintClick');
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method is calling when user click on Excel Icon
     * @param event
     */
    DailyActivityComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.growlMessage = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.ExportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        if (html != "" && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "mt_tkit_daily_activity_rep");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, 'onExportToExcelClick');
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method is for export  datatable data in different formats
     * @param event
     */
    DailyActivityComponent.prototype.ExportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, title, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = "";
                        return [4 /*yield*/, this.commonService.getServerIP()
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
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    htmlBuilder = "";
                                    return htmlBuilder;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.commonService.getSSLConfigDetails()
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
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    htmlBuilder = "";
                                    return htmlBuilder;
                                }
                            })];
                    case 3:
                        _a.sent();
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder += "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<tr width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>TrackIT Daily Activity Report for the date :<b>" + this.convertDateFormate(this.SelectedDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<A  href=" + "" + "javascript:printWindow()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else if (reqType == 'Excel') {
                            htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>TrackIT Daily Activity Report for the date : <b>" + this.convertDateFormate(this.SelectedDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;";
                        }
                        else {
                            htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>TrackIT Daily Activity Report for the date :<b>" + this.convertDateFormate(this.SelectedDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center  nowrap><span class=c3><b>User</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>No of Locations Delivered To</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>CompartmenNo of Items Deliveredt</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Avg. time taken for an item (Secs)</b></span></td>"
                            + "</tr>";
                        this.lstDailyActivityDetails.forEach(function (headers) {
                            htmlBuilder += "<tr>";
                            htmlBuilder += "<td align=center nowrap><span class=c3>" + headers.USERNAME + "</span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3>" + headers.NO_LOCATIONS_DELIVERED + "</span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3>" + headers.NO_ITEMS_DELIVERED + "</span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3>" + headers.AVG_DELIVER_TIME + "</span></td>";
                            htmlBuilder += "</tr>";
                        });
                        htmlBuilder += "</table></Table>";
                        return [2 /*return*/, htmlBuilder];
                    case 4:
                        ex_7 = _a.sent();
                        ;
                        this.clientErrorMsg(ex_7, 'ExportReportDetails');
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when user close mail dailogbox
    * @param event
    */
    DailyActivityComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    DailyActivityComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    /**
     * This method is for clearing all the variables
     * @param event
     */
    DailyActivityComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstDailyActivityDetails = null;
        this.lstFilterData = null;
    };
    return DailyActivityComponent;
}());
DailyActivityComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2136),
        providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
    }),
    __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService,
        HttpService_1.HttpService,
        atpar_common_service_1.AtParCommonService,
        event_spinner_service_1.SpinnerService,
        router_1.Router,
        AtParConstants_1.AtParConstants,
        router_1.ActivatedRoute])
], DailyActivityComponent);
exports.DailyActivityComponent = DailyActivityComponent;


/***/ }),

/***/ 1643:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var DailyUserActivityComponent = (function () {
    function DailyUserActivityComponent() {
    }
    return DailyUserActivityComponent;
}());
DailyUserActivityComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2137)
    })
], DailyUserActivityComponent);
exports.DailyUserActivityComponent = DailyUserActivityComponent;


/***/ }),

/***/ 1644:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var datatableservice_1 = __webpack_require__(131);
var http_1 = __webpack_require__(38);
var atpar_common_service_1 = __webpack_require__(43);
var AtParEnums_1 = __webpack_require__(14);
var HttpService_1 = __webpack_require__(12);
var event_spinner_service_1 = __webpack_require__(24);
var AtParConstants_1 = __webpack_require__(31);
var file_saver_1 = __webpack_require__(228);
var tkit_delivery_report_service_1 = __webpack_require__(1866);
var AtParStatusCodes_1 = __webpack_require__(50);
var AtParEnums_2 = __webpack_require__(14);
var DeliveryReportComponent = (function () {
    function DeliveryReportComponent(httpService, _http, spinnerService, commonService, atParConstant, deliveryReportService) {
        this.httpService = httpService;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.deliveryReportService = deliveryReportService;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.order = "";
        this.showGrid = false;
        this.showexport = false;
        this.lstStatus = [];
        this.lstDeliverdBy = [];
        this.lstRequestor = [];
        this.deliverHeaders = [];
        this.deliverDetails = [];
        this.lstUsers = [];
        this.selectedUser = "";
        this.selectedOrgGroupID = "";
        this.selectedStatus = "";
        this.selectedRequestor = "";
        this.statusCode = -1;
        this.noOfRecords = 0;
        this.defDateRange = 0;
        this.deliverDetailRows = 0;
        this.tdExports = true;
        this.plus = true;
        this.pop = false;
        this.isMailDialog = false;
        this.toMailAddr = '';
        this.request = "";
        this.recipient = "";
        this.userId = "";
        this.selectedDeptID = "";
        this.itemId = "";
        this.vendorName = "";
        this.descr = "";
        this.location = "";
    }
    DeliveryReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.lstStatus.push({ label: "Select One", value: "STATUS" }, { label: "ALL", value: "ALL" }, { label: "Open", value: "0" }, { label: "Cancelled", value: "13" }, { label: "PickUp", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Deliver", value: "50" }, { label: "Take", value: "55" }, { label: "Return", value: "60" });
                        this.selectedStatus = this.lstStatus[0].value;
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.getHeirarchyUsersList()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.PopulateDepartments()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.PopulateRequestors()];
                    case 4:
                        _b.sent();
                        this.currentDate = new Date();
                        this.toDate = new Date();
                        this.fromDate = new Date();
                        if (!(this.defDateRange.toString() != '' && this.defDateRange != null)) return [3 /*break*/, 6];
                        _a = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, -this.defDateRange)];
                    case 5:
                        _a.fromDate = _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.defDateRange = parseInt(data.DataVariable.toString());
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 3: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    DeliveryReportComponent.prototype.confirm = function () {
        try {
            this.growlMessage = [];
            // var rowData: any;
            var compareDates = new Date(this.toDate);
            var currentDate = new Date();
            if (compareDates.getTime() > currentDate.getTime()) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Todate must be less than or equal to current date " });
                return;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    DeliveryReportComponent.prototype.addDays = function (theDate, days) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)];
            });
        });
    };
    DeliveryReportComponent.prototype.validateSearchFields = function () {
        this.pop = false;
        this.showGrid = false;
        this.showexport = false;
        this.growlMessage = [];
        try {
            this.growlMessage = [];
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormate(this.toDate)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
            }
            if (Date.parse(this.convertDateFormate(this.fromDate)) > Date.parse(this.convertDateFormate(this.toDate))) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
                return false;
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
            return false;
        }
    };
    DeliveryReportComponent.prototype.PopulateDepartments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.lstDeptDetails = [];
                        this.lstDeptDetails.push({ label: "All", value: "ALL" });
                        this.selectedDeptID = this.lstDeptDetails[0].value;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.deliveryReportService.getTrackITDetpartments("", "A").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.tkitDeptDetails = data.DataList;
                                _this.statusCode = data.statusCode;
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.tkitDeptDetails = [];
                                        _this.tkitDeptDetails = data.DataDictionary["pDsTkitDepts"].Table1;
                                        if (_this.tkitDeptDetails != null && _this.tkitDeptDetails != undefined) {
                                            for (var i = 0; i < _this.tkitDeptDetails.length; i++) {
                                                _this.lstDeptDetails.push({
                                                    label: _this.tkitDeptDetails[i].DESCRIPTION + " (" + _this.tkitDeptDetails[i].DEPT_ID + ")",
                                                    value: _this.tkitDeptDetails[i].DEPT_ID
                                                });
                                            }
                                        }
                                        _this.spinnerService.stop();
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.PopulateRequestors = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.deliveryReportService.getRequestors("True").
                                catch(this.httpService.handleError).then(function (res) {
                                //await this.deliveryReportService.getRequestors("True").then((result: Response) => {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.lstRequestor = [];
                                _this.lstRequestor.push({ label: "Select Requestor", value: "Select Requestor" });
                                //   this.selectedRequestor = 'Select Requestor';
                                _this.selectedRequestor = _this.lstRequestor[0].value;
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i < data.DataDictionary["pDsTkitRequestors"].Table1.length; i++) {
                                            _this.lstRequestor.push({ label: data.DataDictionary["pDsTkitRequestors"].Table1[i].FIRST_NAME + data.DataDictionary["pDsTkitRequestors"].Table1[i].LAST_NAME + " (" + data.DataDictionary["pDsTkitRequestors"].Table1[i].REQUESTOR_ID + ")", value: data.DataDictionary["pDsTkitRequestors"].Table1[i].REQUESTOR_ID });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.getDeliveryDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var Fdate, Tdate, DefDateTime, StausDateTime, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showGrid = false;
                        this.showexport = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.validateSearchFields() == false) {
                            return [2 /*return*/];
                        }
                        Fdate = this.convertDateFormate(this.fromDate.toDateString());
                        Tdate = this.convertDateFormate(this.toDate.toDateString());
                        DefDateTime = void 0;
                        StausDateTime = void 0;
                        this.deliverHeaders = [];
                        this.deliverDetails = [];
                        this.showexport = false;
                        if (this.userId == null || this.userId == undefined || this.userId == "ALL") {
                            this.userId = '';
                        }
                        if (this.selectedStatus == null || this.selectedStatus == undefined || this.selectedStatus == "STATUS") {
                            this.selectedStatus = '';
                        }
                        if (this.selectedRequestor == null || this.selectedRequestor == undefined || this.selectedRequestor == "Select Requestor") {
                            this.selectedRequestor = '';
                        }
                        return [4 /*yield*/, this.deliveryReportService.getTkITDeliverReport(Fdate, Tdate, this.request, this.recipient, this.userId, this.selectedDeptID, this.itemId, this.vendorName, this.descr, this.location, this.selectedRequestor, this.selectedStatus)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                //console.log(data);
                                //console.log(data.StatType);
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success:
                                        {
                                            _this.showGrid = true;
                                            _this.spinnerService.stop();
                                            _this.deliverHeaders = [];
                                            _this.deliverHeaders = data.DataDictionary["pDsDeliverRep"]["EVENTHEADER"];
                                            _this.deliverDetails = data.DataDictionary["pDsDeliverRep"]["EVENTDETAILS"];
                                            _this.deliverHeaders.forEach(function (header) {
                                                var details = _this.deliverDetails.filter(function (detail) { return detail.TRANSACTION_ID == header.TRANS_ID; });
                                                _this.showexport = true;
                                                header.DETAILS = details;
                                                if (header.STATUS == "0") {
                                                    header.STATUS = "Open";
                                                }
                                                else if (header.STATUS == "20") {
                                                    header.STATUS = "Pickup";
                                                }
                                                else if (header.STATUS == "30") {
                                                    header.STATUS = "Load";
                                                }
                                                else if (header.STATUS == "40") {
                                                    header.STATUS = "UnLoad";
                                                }
                                                else if (header.STATUS == "50") {
                                                    header.STATUS = "Deliver";
                                                }
                                                else if (header.STATUS == "55") {
                                                    header.STATUS = "Take";
                                                }
                                                else if (header.STATUS == "60") {
                                                    header.STATUS = "Returns";
                                                }
                                            });
                                            if (_this.recordsPerPageSize == 0) {
                                                _this.deliverDetailRows = _this.deliverHeaders.length;
                                            }
                                            else {
                                                _this.deliverDetailRows = _this.recordsPerPageSize;
                                            }
                                            break;
                                        }
                                    case AtParEnums_2.StatusType.Warn:
                                        {
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        blob = new Blob([html], {
                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                        });
                        file_saver_1.saveAs(blob, "DeliveryReport.xls");
                        return [3 /*break*/, 4];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5);
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, title, sigimgserverPath_1, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        return [4 /*yield*/, this.commonService.getServerIP()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.ipAddress = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.commonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.growlMessage = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 3:
                        _a.sent();
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        title = '""' + "AtparVersion 3.0" + '""';
                        if (false) return [3 /*break*/, 5];
                        htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                                + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=5 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:printWindow()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType == 'Mail') {
                                htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=cid:logo title=Atpar 3><img src=cid:topbg width=82% height=63></TD></TR>";
                            }
                            else {
                                htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></TR>";
                            }
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=3 align=left><span class=c2><b> Tkit Delivery Report between  " + this.convertDateFormate(this.fromDate) + " and " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Request# - Desc</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Location</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Vendor Name</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Requestor</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Status</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>DepartmentID</td>"
                            + "</tr>";
                        sigimgserverPath_1 = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/Uploaded/';
                        return [4 /*yield*/, this.deliverHeaders.forEach(function (header) {
                                htmlBuilder += "<tr bgcolor=#d3d3d3>";
                                htmlBuilder += "<td  nowrap>&nbsp;" + header.ORDER_NO + " - " + header.REPORT_DATA_8 + "&nbsp;</td>";
                                if (header.LOCATION == '' || header.LOCATION == null) {
                                    htmlBuilder += "<td  nowrap>&nbsp</td>";
                                }
                                else {
                                    htmlBuilder += "<td  nowrap>&nbsp;" + header.LOCATION + "&nbsp;</td>";
                                }
                                if (header.VENDOR_NAME == '' || header.VENDOR_NAME == null) {
                                    htmlBuilder += "<td  nowrap>&nbsp</td>";
                                }
                                else {
                                    htmlBuilder += "<td  nowrap>&nbsp;" + header.VENDOR_NAME + "&nbsp;</td>";
                                }
                                if (header.DELIVERED_TO == '' || header.DELIVERED_TO == null) {
                                    htmlBuilder += "<td  nowrap>&nbsp</td>";
                                }
                                else {
                                    htmlBuilder += "<td  nowrap>&nbsp;" + header.DELIVERED_TO + "&nbsp;</td>";
                                }
                                if (header.STATUS == '' || header.STATUS == null) {
                                    htmlBuilder += "<td  nowrap>&nbsp</td>";
                                }
                                else {
                                    htmlBuilder += "<td  nowrap>&nbsp;" + header.STATUS + "&nbsp;</td>";
                                }
                                if (header.REPORT_DATA_25 == '' || header.REPORT_DATA_25 == null) {
                                    htmlBuilder += "<td  nowrap>&nbsp</td>";
                                }
                                else {
                                    htmlBuilder += "<td  nowrap>&nbsp;" + header.REPORT_DATA_25 + "&nbsp;</td>";
                                }
                                htmlBuilder += "</tr>";
                                if (header.DETAILS.length > 0) {
                                    htmlBuilder += "<tr>"
                                        + "<td colspan=7>"
                                        + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                                        + "<tr bgcolor=#E0E0E0>"
                                        + "<td align=center nowrap width=15%><span class=c3><b>Event</b></span></td>"
                                        + "<td align=center nowrap width=8%><span class=c3><b> Event Date(mm/dd/yyyy) </b></span></td>"
                                        + "<td align=center nowrap width=10%><span class=c3><b>User</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Recepient</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Signature</b></span></td>"
                                        + "</tr>";
                                    header.DETAILS.forEach(function (detail) {
                                        htmlBuilder += "<tr>"
                                            + "<td align=left nowrap ><span class=c3>" + detail.EVENT_STATUS_MESSAGE + "</span></td>"
                                            + "<td align=left nowrap><span class=c3>" + detail.UPDATE_DATE + "</span></td>";
                                        if (detail.USERNAME == '' || detail.USERNAME == null) {
                                            htmlBuilder += "<td nowrap>&nbsp</td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.USERNAME + "</span></td>";
                                        }
                                        if (detail.RECEPIENT == '' || detail.RECEPIENT == null) {
                                            htmlBuilder += "<td nowrap>&nbsp</td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.RECEPIENT + "</span></td>";
                                        }
                                        if (detail.STATUS_MESSAGE == "Deliver") {
                                            htmlBuilder += "<td align=left nowrap ><img  src=" + sigimgserverPath_1 + header.TRANSACTION_ID + ".jpg ></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=right ><span class=c3></span></td>";
                                        }
                                        htmlBuilder += "</tr>";
                                    });
                                    htmlBuilder += "</table>";
                                }
                            })];
                    case 4:
                        _a.sent();
                        htmlBuilder += "</table></Table>";
                        _a.label = 5;
                    case 5: return [4 /*yield*/, htmlBuilder];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7:
                        ex_6 = _a.sent();
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.isMailDialog = true;
                    this.toMailAddr = '';
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    DeliveryReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var html, toAddr, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        this.growlMessage = [];
                        this.isMailDialog = false;
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Track IT Deliver Report', JSON.stringify(html), this.toMailAddr, '', 'false', AtParEnums_2.MailPriority.Normal.toString(), '')
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                            })];
                    case 2:
                        _a.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Mail has been sent' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'From Address is Missing! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Please Enter To Email Address' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_BODY) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Email Server not configured! Please contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SEND_FAILED) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                        }
                        else {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                        }
                        _a.label = 3;
                    case 3:
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Print')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            mywindow = window.open('', 'PRINT', 'height=600,width=600');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'TrackIT - Delivery Report' + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                mywindow.document.close(); // necessary for IE >= 10
                                mywindow.focus(); // necessary for IE >= 10*/
                                mywindow.print();
                                mywindow.close();
                                return [2 /*return*/, true];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8);
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.getHeirarchyUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.deliveryReportService.getHeirarchyUsersList(AtParEnums_2.EnumApps.TrackIT, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstUsers = [];
                                _this.lstUsers.push({ label: 'ALL', value: 'ALL' });
                                _this.userId = _this.lstUsers[0].value;
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i < res.DataDictionary["pDSUserList"].Table1.length; i++) {
                                            _this.lstUsers.push({ label: res.DataDictionary["pDSUserList"].Table1[i].FULLNAME, value: res.DataDictionary["pDSUserList"].Table1[i].USER_ID });
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
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.spinnerService.stop();
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    DeliveryReportComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstUsers = null;
        this.growlMessage = null;
        this.lstStatus = null;
        this.lstDeptDetails = null;
        this.tkitDeptDetails = null;
        this.lstDeliverdBy = null;
        this.lstRequestor = null;
        this.deliverHeaders = null;
        this.deliverDetails = null;
    };
    return DeliveryReportComponent;
}());
DeliveryReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2138),
        providers: [HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, tkit_delivery_report_service_1.DeliveryReportService, datatableservice_1.datatableservice]
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        AtParConstants_1.AtParConstants,
        tkit_delivery_report_service_1.DeliveryReportService])
], DeliveryReportComponent);
exports.DeliveryReportComponent = DeliveryReportComponent;


/***/ }),

/***/ 1645:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var DestructionReportComponent = (function () {
    function DestructionReportComponent() {
    }
    return DestructionReportComponent;
}());
DestructionReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2139)
    })
], DestructionReportComponent);
exports.DestructionReportComponent = DestructionReportComponent;


/***/ }),

/***/ 1646:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var EquipmentTrackingReportComponent = (function () {
    function EquipmentTrackingReportComponent() {
    }
    return EquipmentTrackingReportComponent;
}());
EquipmentTrackingReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2140)
    })
], EquipmentTrackingReportComponent);
exports.EquipmentTrackingReportComponent = EquipmentTrackingReportComponent;


/***/ }),

/***/ 1647:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var TKIT_ITEM_MASTER_1 = __webpack_require__(1745);
var tkit_inactivate_items_service_1 = __webpack_require__(1867);
var AtParEnums_1 = __webpack_require__(14);
var HttpService_1 = __webpack_require__(12);
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var AtParConstants_1 = __webpack_require__(31);
var InactivateItemsComponent = (function () {
    function InactivateItemsComponent(trackITInactiveItemsService, spinnerService, atParCommonService, httpService, atParConstant) {
        this.trackITInactiveItemsService = trackITInactiveItemsService;
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.deviceTokenEntry = [];
        this.selectedIndicator = "";
        this.dataCheckedSorting = [];
        this.isVisible = false;
        this.growlMessage = [];
        this.lstLocations = [];
        this.blnsortbycolumn = true;
        this.custom = "custom";
        this.itemMasterData = [];
    }
    InactivateItemsComponent.prototype.ngOnInit = function () {
        this.spinnerService.start();
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedItem = new Array();
        this.dataCheckedSorting = new Array();
        this.dataUncheckedSorting = new Array();
        this.lstFilteredLocation = new Array();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.indicatorType = [];
        this.indicatorType.push({ label: 'Select Indicator', value: '' });
        this.indicatorType.push({ label: 'BOX', value: 'B' });
        this.indicatorType.push({ label: 'EQUIPMENT', value: 'E' });
        this.indicatorType.push({ label: 'FURNITURE', value: 'F' });
        this.pazeSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.destructionDate = this.formatDate(new Date().toString());
        console.log(this.destructionDate);
        this.spinnerService.stop();
    };
    InactivateItemsComponent.prototype.formatDate = function (date) {
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
        return mm + '/' + dd + '/' + yyyy;
    };
    InactivateItemsComponent.prototype.selectedRow = function (values, event) {
        if (event == true) {
            values.CHK_VALUE = 1;
            values.checkvalue == true;
        }
        else {
            values.CHK_VALUE = 0;
            values.checkvalue == false;
        }
        for (var i = 0; i < this.lstCheckedItem.length; i++) {
            if (this.lstCheckedItem[i].ITEM_ID === values.ITEM_ID) {
                var index = this.lstCheckedItem.indexOf(this.lstCheckedItem[i], 0);
                this.lstCheckedItem.splice(index, 1);
            }
        }
        this.lstCheckedItem.push(values);
    };
    InactivateItemsComponent.prototype.filterdata = function (event) {
        this.lstgridfilterData = [];
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    InactivateItemsComponent.prototype.checkAll = function () {
        this.lstCheckedItem = [];
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
            if (this.EndIndex > this.lstgridfilterData.length) {
                this.EndIndex = this.lstgridfilterData.length;
            }
            for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                this.lstgridfilterData[i].checkvalue = true;
                this.lstgridfilterData[i].ITEM_INACTIVATED = true;
                this.lstgridfilterData[i].CHK_VALUE = 1;
                this.lstCheckedItem.push(this.lstgridfilterData[i]);
            }
        }
        else {
            if (this.EndIndex > this.lstDBData.length) {
                this.EndIndex = this.lstDBData.length;
            }
            for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                this.lstDBData[i].checkvalue = true;
                this.lstDBData[i].ITEM_INACTIVATED = true;
                this.lstDBData[i].CHK_VALUE = 1;
                this.lstCheckedItem.push(this.lstDBData[i]);
            }
        }
    };
    InactivateItemsComponent.prototype.unCheckAll = function () {
        this.lstCheckedItem = [];
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
            if (this.EndIndex > this.lstgridfilterData.length) {
                this.EndIndex = this.lstgridfilterData.length;
            }
            for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                this.lstgridfilterData[i].checkvalue = false;
                this.lstgridfilterData[i].ITEM_INACTIVATED = false;
                this.lstgridfilterData[i].CHK_VALUE = 0;
                this.lstCheckedItem.push(this.lstgridfilterData[i]);
            }
        }
        else {
            if (this.EndIndex > this.lstDBData.length) {
                this.EndIndex = this.lstDBData.length;
            }
            for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                this.lstDBData[i].checkvalue = false;
                this.lstDBData[i].ITEM_INACTIVATED = false;
                this.lstDBData[i].CHK_VALUE = 0;
                this.lstCheckedItem.push(this.lstDBData[i]);
            }
        }
    };
    InactivateItemsComponent.prototype.customSort = function (event, field) {
        this.preField = "";
        var element = event;
        if (this.preField == element.field) {
            if (element.order == 1) {
                element.order = -1;
            }
            else {
                element.order = 1;
            }
            // element.order = !element.order;
        }
        else {
            element.order = 1;
        }
        this.preField = element.field;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        var result = null;
        var order;
        try {
            this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null)
                    result = -1;
                else if (a[element.field] != null && b[element.field] == null)
                    result = 1;
                else if (a[element.field] == null && b[element.field] == null)
                    result = 0;
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                    result = a[element.field].localeCompare(b[element.field]);
                else
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                return (element.order * result);
            });
            this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null)
                    result = -1;
                else if (a[element.field] != null && b[element.field] == null)
                    result = 1;
                else if (a[element.field] == null && b[element.field] == null)
                    result = 0;
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                    result = a[element.field].localeCompare(b[element.field]);
                else
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                return (element.order * result);
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
        this.lstDBData = [];
        this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    };
    InactivateItemsComponent.prototype.getItemsToInActivate = function () {
        var _this = this;
        this.isVisible = false;
        var destructionDate = new Date(this.destructionDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
        this.destructionDate = destructionDate.replace(',', '');
        if (this.selectedIndicator === "Select Indicator" || this.selectedIndicator === undefined || this.selectedIndicator == "") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select the Indicator' });
            return false;
        }
        if (this.destructionDate === null || this.destructionDate === undefined || this.destructionDate == "") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select the Destruction Date' });
            return false;
        }
        try {
            this.spinnerService.start();
            this.trackITInactiveItemsService.getItemsToInActivate(this.selectedIndicator, this.destructionDate, this.deviceTokenEntry)
                .subscribe(function (response) {
                _this.growlMessage = [];
                switch (response.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        _this.lstDBData = response.DataList;
                        _this.isVisible = true;
                        _this.spinnerService.stop();
                        break;
                    }
                    case AtParEnums_1.StatusType.Warn: {
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                        _this.isVisible = false;
                        _this.spinnerService.stop();
                        break;
                    }
                    case AtParEnums_1.StatusType.Error: {
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                        _this.spinnerService.stop();
                        _this.isVisible = false;
                        break;
                    }
                    case AtParEnums_1.StatusType.Custom: {
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                        _this.isVisible = false;
                        _this.spinnerService.stop();
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "inactivate items");
        }
    };
    InactivateItemsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    InactivateItemsComponent.prototype.validateDestructionDate = function () {
        this.spinnerService.start();
        var reGoodDate = /^(?:(0[1-9]|1[012])[\/.](0[1-9]|[12][0-9]|3[01])[\/.](19|20)[0-9]{2})$/;
        var res = reGoodDate.test(this.destructionDate);
        if (!res) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Date format should be : mm/dd/yyyy." });
            this.spinnerService.stop();
        }
    };
    InactivateItemsComponent.prototype.ngOnDestroy = function () {
        this.lstDBData = [];
        this.lstgridfilterData = [];
        this.deviceTokenEntry = [];
        this.selectedIndicator = "";
        this.indicatorType = null;
        this.lstCheckedItem = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.startIndex = -1;
        this.EndIndex = -1;
        this.isVisible = false;
        this.growlMessage = [];
        this.lstLocations = [];
        this.lstFilteredLocation = [];
        this.blnsortbycolumn = false;
        this.custom = "";
        this.pazeSize = 0;
        this.destructionDate = "";
        this.preField = "";
        this.itemMasterData = [];
    };
    InactivateItemsComponent.prototype.inactivateItems = function () {
        var _this = this;
        this.growlMessage = [];
        this.spinnerService.start();
        this.itemMasterData = [];
        var checkedItems = this.lstCheckedItem.filter(function (x) { return x.CHK_VALUE == 1; });
        var itemDetail;
        for (var item = 0; item < checkedItems.length; item++) {
            itemDetail = new TKIT_ITEM_MASTER_1.TKIT_ITEM_MASTER();
            itemDetail.ITEM_ID = checkedItems[item].ITEM_ID;
            itemDetail.ITEM_DESCR = checkedItems[item].ITEM_DESCR;
            itemDetail.ITEM_TYPE = checkedItems[item].ITEM_TYPE;
            itemDetail.CHK_VALUE = checkedItems[item].CHK_VALUE;
            itemDetail.ITEM_INACTIVATED = checkedItems[item].ITEM_INACTIVATED;
            itemDetail.DESTRUCTION_DATE = checkedItems[item].DESTRUCTION_DATE;
            itemDetail.COMMENTS = checkedItems[item].COMMENTS;
            this.itemMasterData.push(itemDetail);
        }
        if (this.itemMasterData == undefined || this.itemMasterData == null || this.itemMasterData.length == 0) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Item has been selected" });
            this.spinnerService.stop();
            return;
        }
        try {
            this.spinnerService.start();
            this.trackITInactiveItemsService.inactivateItems(this.itemMasterData, this.deviceTokenEntry)
                .subscribe(function (response) {
                _this.growlMessage = [];
                switch (response.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        _this.itemMasterData = [];
                        _this.lstCheckedItem = [];
                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Items Status Updated" });
                        _this.isVisible = false;
                        _this.spinnerService.stop();
                        break;
                    }
                    case AtParEnums_1.StatusType.Warn: {
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                        _this.spinnerService.stop();
                        break;
                    }
                    case AtParEnums_1.StatusType.Error: {
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                        _this.spinnerService.stop();
                        _this.isVisible = false;
                        break;
                    }
                    case AtParEnums_1.StatusType.Custom: {
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                        _this.spinnerService.stop();
                        _this.isVisible = false;
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "inactivate items");
        }
    };
    return InactivateItemsComponent;
}());
InactivateItemsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2141),
        providers: [tkit_inactivate_items_service_1.TrackITInactiveItemsService, HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
    }),
    __metadata("design:paramtypes", [tkit_inactivate_items_service_1.TrackITInactiveItemsService,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        HttpService_1.HttpService,
        AtParConstants_1.AtParConstants])
], InactivateItemsComponent);
exports.InactivateItemsComponent = InactivateItemsComponent;


/***/ }),

/***/ 1648:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ItemMasterReportComponent = (function () {
    function ItemMasterReportComponent() {
    }
    return ItemMasterReportComponent;
}());
ItemMasterReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2142)
    })
], ItemMasterReportComponent);
exports.ItemMasterReportComponent = ItemMasterReportComponent;


/***/ }),

/***/ 1649:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var datatableservice_1 = __webpack_require__(131);
var employee_1 = __webpack_require__(1372);
var TKIT_DEPT_1 = __webpack_require__(1743);
var tkit_manage_departments_service_1 = __webpack_require__(1868);
var AtParEnums_1 = __webpack_require__(14);
var HttpService_1 = __webpack_require__(12);
var AtParWebApiResponse_1 = __webpack_require__(1370);
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var AtParConstants_1 = __webpack_require__(31);
var datatable_1 = __webpack_require__(71);
var routepath_1 = __webpack_require__(70);
var leftbar_animation_service_1 = __webpack_require__(229);
var ManageDepartmentsComponent = (function () {
    function ManageDepartmentsComponent(dataservice, mngDeptService, httpService, spinnerService, commonService, atParConstant, leftBarAnimationService) {
        this.dataservice = dataservice;
        this.mngDeptService = mngDeptService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.leftBarAnimationService = leftBarAnimationService;
        this.departmentIDSearch = "";
        this.showAddButton = true;
        this.pop = false;
        this.table = true;
        this.form = false;
        this.editform = false;
        this.Title = "";
        this.bindSymbal = "";
        this.loading = true;
        this.minDateValue1 = new Date();
        this.showTextBox = false;
        this.showLable = false;
        this.departmentID = "";
        this.newItem = new TKIT_DEPT_1.TKIT_DEPT();
        this.growlMessage = [];
        this._deviceTokenEntry = [];
        this.ddlStatusType = [];
        this.auditSatus = "";
        this.checkvalue = false;
        this.lstOrgGroups = [];
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.orgGrpId = "";
        this.selectedOrgGroupId = "";
        this.breadCrumbMenu = new routepath_1.Menus();
        this.ven = new employee_1.Employee();
        this.departmentID = "dept1";
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    ManageDepartmentsComponent.prototype.adddepartment = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Department';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showTextBox = true;
        this.showLable = false;
        this.form = true;
        this.editform = false;
        this.table = false;
        this.pop = false;
        this.Title = "Save";
        this.bindSymbal = "floppy-o";
        this.showAddButton = false;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString();
        this.departmentIDStatus = null;
        this.descStatus = null;
        this.ddlOrgIDStatus = null;
        this.newItem = new TKIT_DEPT_1.TKIT_DEPT();
        this.departmentIDSearch = "";
        this.selectedOrgGroupId = "";
        this.bindOrgGroups();
        this.loading = true;
        //this.blnShowOrgGroupLabel = false;
        // this.blnShowOrgGroupDD = true;
    };
    ManageDepartmentsComponent.prototype.tbl = function () {
        this.form = false;
        this.editform = false;
        this.table = false;
        this.pop = false;
        this.table = true;
    };
    ManageDepartmentsComponent.prototype.edit = function (data) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Department';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showTextBox = false;
        this.showLable = true;
        this.form = true;
        this.table = false;
        this.showAddButton = false;
        this.Title = "Update";
        this.bindSymbal = "check";
        this.newItem = data;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString();
        this.loading = false;
        this.departmentIDSearch = "";
        this.blnShowOrgGroupLabel = true;
        this.blnShowOrgGroupDD = false;
        this.orgGrpId = data.ORG_GROUP_ID;
    };
    ManageDepartmentsComponent.prototype.save = function () {
        this.editform = false;
    };
    ManageDepartmentsComponent.prototype.close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = false;
        this.table = true;
        this.pop = true;
        this.editform = false;
        this.table = false;
        this.showAddButton = true;
        this.newItem = new TKIT_DEPT_1.TKIT_DEPT();
        this.departmentIDSearch = "";
        this.growlMessage = [];
    };
    ManageDepartmentsComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    ManageDepartmentsComponent.prototype.ngOnInit = function () {
        this.table = false;
        this.showAddButton = true;
        this.ddlStatusType.push({ label: 'All', value: "" });
        this.ddlStatusType.push({ label: 'Active', value: true });
        this.ddlStatusType.push({ label: 'Inactive', value: false });
        this.pageSize = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.menuCode = localStorage.getItem("menuCode") != null ? localStorage.getItem("menuCode") : 'mt_tkit_manage_depts.aspx';
        this.appID = (AtParEnums_1.EnumApps.TrackIT).toString();
        this.mainlstGridData = new Array();
        this.checkAuditAllowed();
        this.statusType = null;
        //this.bindOrgGroups();
    };
    ManageDepartmentsComponent.prototype.ngOnDestroy = function () {
        this.departmentIDSearch = null;
        this.mode = null;
        this.Title = null;
        this.bindSymbal = null;
        this.departmentIDStatus = null;
        this.descStatus = null;
        this.departmentID = null;
        this.newItem = null;
        this.growlMessage = null;
        this._deviceTokenEntry = null;
        this.lstDepts = null;
        this.ddlStatusType = null;
        this.pageSize = null;
        this.menuCode = null;
        this.appID = null;
        this.auditSatus = null;
        this.changeDeptStatus = null;
    };
    ManageDepartmentsComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        this.lstOrgGroups = [];
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        // this.blnStatusMsg = false;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupDD = false;
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + ' - ' + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.blnShowOrgGroupLabel = false;
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + ' - ' + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            break;
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
                        ex_1 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Add and Update button validations
    ManageDepartmentsComponent.prototype.bindModelDataChange = function (event) {
        try {
            if ("txtDeptID" == event.TextBoxID.toString()) {
                this.departmentIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtDesc" == event.TextBoxID.toString()) {
                this.descStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.Title == "Update") {
                this.departmentIDStatus = 0;
            }
            this.ddlOrgIDChanged();
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString()) {
                if (this.departmentIDStatus == 0 && this.descStatus == 0 && this.ddlOrgIDStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString()) {
                if (this.descStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    };
    ManageDepartmentsComponent.prototype.BindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //if (this.table == true) {
                        //    this.dataTableComponent.reset();
                        //    this.statusType = null;
                        //}
                        this.mainlstGridData = [];
                        this.lstDepts = [];
                        this.statusType = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.table = false;
                        if (this.mode == "Edit") {
                            this.showAddButton = true;
                        }
                        this.spinnerService.start();
                        if (this.departmentIDSearch == null || this.departmentIDSearch == undefined || this.departmentIDSearch === "") {
                            this.departmentIDSearch = "";
                        }
                        return [4 /*yield*/, this.mngDeptService.getDepartments(this.departmentIDSearch, "", this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError)
                                .then(function (resp) {
                                var webresp = resp.json();
                                _this.spinnerService.stop();
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        _this.mainlstGridData = [];
                                        _this.lstDepts = [];
                                        _this.lstDepts = webresp.DataList;
                                        for (var i = 0; i <= _this.lstDepts.length - 1; i++) {
                                            if (_this.lstDepts[i].STATUS == "A") {
                                                _this.lstDepts[i].checkvalue = true;
                                            }
                                            else {
                                                _this.lstDepts[i].checkvalue = false;
                                            }
                                            _this.mainlstGridData.push(_this.lstDepts[i]);
                                        }
                                        _this.table = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.table = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: "warn", summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.table = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: "info", summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.table = false;
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
                        exMsg_1 = _a.sent();
                        this.clientErrorMsg(exMsg_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageDepartmentsComponent.prototype.changeStatus = function (dept) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var status, webresp, exMsg_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (dept.checkvalue == true) {
                            status = "A";
                        }
                        else {
                            status = "I";
                        }
                        this.growlMessage = [];
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        webresp = new AtParWebApiResponse_1.AtParWebApiResponse();
                        return [4 /*yield*/, this.mngDeptService.saveDepartment(dept.DEPT_ID, dept.DESCRIPTION, status, AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString(), dept.ORG_GROUP_ID, this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                                var msg, filterData, matchedrecord, x, lstManagedeptDetails;
                                return __generator(this, function (_a) {
                                    webresp = resp.json();
                                    this.spinnerService.stop();
                                    switch (webresp.StatType) {
                                        case AtParEnums_1.StatusType.Success:
                                            //  await this.BindGrid();
                                            this.growlMessage = [];
                                            msg = AtParConstants_1.AtParConstants.Updated_Status_Msg.replace("1%", 'Department').replace("2%", dept.DEPT_ID);
                                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                                            filterData = [];
                                            this.lstDepts = [];
                                            matchedrecord = this.mainlstGridData.filter(function (x) { return x.DEPT_ID == dept.DEPT_ID; });
                                            matchedrecord[0].checkvalue = dept.checkvalue;
                                            matchedrecord[0].STATUS = status;
                                            if (this.statusType.toString() == "false") {
                                                filterData = this.mainlstGridData.filter(function (x) { return x.checkvalue == false; });
                                            }
                                            else if (this.statusType.toString() == "true") {
                                                filterData = this.mainlstGridData.filter(function (x) { return x.checkvalue == true; });
                                            }
                                            else {
                                                filterData = this.mainlstGridData;
                                            }
                                            if (filterData != null) {
                                                for (x = 0; x < filterData.length; x++) {
                                                    lstManagedeptDetails = new TKIT_DEPT_1.TKIT_DEPT();
                                                    lstManagedeptDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                                                    lstManagedeptDetails.DESCRIPTION = filterData[x].DESCRIPTION;
                                                    lstManagedeptDetails.DEPT_ID = filterData[x].DEPT_ID;
                                                    lstManagedeptDetails.UPDATE_DATE = filterData[x].UPDATE_DATE;
                                                    lstManagedeptDetails.UPDATE_USER_ID = filterData[x].UPDATE_USER_ID;
                                                    if (filterData[x].STATUS == "A") {
                                                        filterData[x].checkvalue = true;
                                                    }
                                                    else {
                                                        filterData[x].checkvalue = false;
                                                    }
                                                    lstManagedeptDetails.STATUS = filterData[x].STATUS;
                                                    lstManagedeptDetails.checkvalue = filterData[x].checkvalue;
                                                    this.lstDepts.push(lstManagedeptDetails);
                                                }
                                            }
                                            break;
                                        case AtParEnums_1.StatusType.Error:
                                            this.BindGrid();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                            break;
                                        case AtParEnums_1.StatusType.Warn:
                                            this.BindGrid();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                            break;
                                    }
                                    this.spinnerService.stop();
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_2 = _a.sent();
                        this.clientErrorMsg(exMsg_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageDepartmentsComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var webresp_1, exMsg_3;
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
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp_1.StatusMessage });
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
                        exMsg_3 = _a.sent();
                        this.clientErrorMsg(exMsg_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageDepartmentsComponent.prototype.saveOrUpdateDepartment = function () {
        var _this = this;
        this.showAddButton = false;
        this.table = false;
        this.growlMessage = [];
        //this.newItem.STATUS = "A";
        if (this.Title == "Save") {
            this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString();
        }
        else {
            this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString();
        }
        try {
            var webresp_2 = new AtParWebApiResponse_1.AtParWebApiResponse();
            this.spinnerService.start();
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                if (this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined) {
                    this.table = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                    this.spinnerService.stop();
                    return false;
                }
            }
            this.mngDeptService.saveDepartment(this.newItem.DEPT_ID, this.newItem.DESCRIPTION, this.newItem.STATUS, this.mode, this.orgGroupIDForDBUpdate, this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then(function (resp) {
                webresp_2 = resp.json();
                _this.spinnerService.stop();
                switch (webresp_2.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        _this.growlMessage = [];
                        if (_this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString()) {
                            var msg = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", 'Department').replace("2%", _this.newItem.DEPT_ID);
                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                            _this.loading = true;
                            _this.newItem = new TKIT_DEPT_1.TKIT_DEPT();
                            _this.departmentIDStatus = null;
                            _this.descStatus = null;
                            _this.ddlOrgIDStatus = null;
                            _this.selectedOrgGroupId = null;
                            if (_this.blnShowOrgGroupDD) {
                                document.getElementById('txtddllstOrgGroups').focus();
                            }
                            else {
                                document.getElementById('txtDeptID').focus();
                            }
                        }
                        else {
                            var msg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", 'Department').replace("2%", _this.newItem.DEPT_ID);
                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                            document.getElementById('txtDesc').focus();
                        }
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
            this.clientErrorMsg(exMsg);
        }
    };
    ManageDepartmentsComponent.prototype.ddlOrgIDChanged = function () {
        if (this.newItem.DEPT_ID == undefined || this.newItem.DEPT_ID == null) {
            this.newItem.DEPT_ID = "";
        }
        if (this.newItem.DESCRIPTION == undefined || this.newItem.DESCRIPTION == null) {
            this.newItem.DESCRIPTION = "";
        }
        if (this.blnShowOrgGroupDD) {
            if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == null || this.selectedOrgGroupId == "") {
                this.ddlOrgIDStatus = 1;
            }
            else {
                this.ddlOrgIDStatus = 0;
            }
        }
        if (this.Title == "Update" || this.blnShowOrgGroupLabel) {
            this.ddlOrgIDStatus = 0;
        }
        if (this.departmentIDStatus == 0 && this.descStatus == 0 && this.ddlOrgIDStatus == 0 && this.newItem.DEPT_ID != "" && this.newItem.DESCRIPTION != "") {
            this.loading = false;
        }
        else {
            this.loading = true;
        }
    };
    ManageDepartmentsComponent.prototype.dataFilter = function (evtdata, filed, filterMatchMode) {
        return __awaiter(this, void 0, void 0, function () {
            var filterData, x, lstManageDepartment;
            return __generator(this, function (_a) {
                this.growlMessage = [];
                this.lstDepts.length = 0;
                if (this.statusType.toString() == "true") {
                    filterData = this.mainlstGridData.filter(function (x) { return x.checkvalue == true; });
                }
                else if (this.statusType.toString() == "false") {
                    filterData = this.mainlstGridData.filter(function (x) { return x.checkvalue == false; });
                }
                else {
                    filterData = this.mainlstGridData;
                }
                if (filterData != null) {
                    for (x = 0; x < filterData.length; x++) {
                        lstManageDepartment = new TKIT_DEPT_1.TKIT_DEPT();
                        lstManageDepartment.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                        lstManageDepartment.DEPT_ID = filterData[x].DEPT_ID;
                        lstManageDepartment.DESCRIPTION = filterData[x].DESCRIPTION;
                        lstManageDepartment.UPDATE_DATE = filterData[x].UPDATE_DATE;
                        lstManageDepartment.UPDATE_USER_ID = filterData[x].UPDATE_USER_ID;
                        lstManageDepartment.STATUS = filterData[x].STATUS;
                        lstManageDepartment.checkvalue = filterData[x].checkvalue;
                        this.lstDepts.push(lstManageDepartment);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    return ManageDepartmentsComponent;
}());
__decorate([
    core_1.ViewChild(datatable_1.DataTable),
    __metadata("design:type", datatable_1.DataTable)
], ManageDepartmentsComponent.prototype, "dataTableComponent", void 0);
ManageDepartmentsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2143),
        providers: [datatableservice_1.datatableservice, tkit_manage_departments_service_1.ManageDepartmentsService, HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice,
        tkit_manage_departments_service_1.ManageDepartmentsService,
        HttpService_1.HttpService,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        AtParConstants_1.AtParConstants,
        leftbar_animation_service_1.LeftBarAnimationService])
], ManageDepartmentsComponent);
exports.ManageDepartmentsComponent = ManageDepartmentsComponent;


/***/ }),

/***/ 1650:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var datatableservice_1 = __webpack_require__(131);
var http_1 = __webpack_require__(38);
var atpar_common_service_1 = __webpack_require__(43);
var AtParEnums_1 = __webpack_require__(14);
var HttpService_1 = __webpack_require__(12);
var event_spinner_service_1 = __webpack_require__(24);
var AtParConstants_1 = __webpack_require__(31);
var VM_TKIT_ITEM_DETAILS_1 = __webpack_require__(1768);
var TKIT_ITEM_INVENTORY_1 = __webpack_require__(1744);
var tkit_manage_equipment_items_service_1 = __webpack_require__(1869);
var AtParStatusCodes_1 = __webpack_require__(50);
var AtParEnums_2 = __webpack_require__(14);
var routepath_1 = __webpack_require__(70);
var ManageEquipmentItemsComponent = (function () {
    function ManageEquipmentItemsComponent(dataservice, atParCommonService, spinnerService, atParConstant, manageEquipmentItemsService, httpService, http) {
        this.dataservice = dataservice;
        this.atParCommonService = atParCommonService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.manageEquipmentItemsService = manageEquipmentItemsService;
        this.httpService = httpService;
        this.http = http;
        this.page = true;
        this.showLotSerialFields = false;
        this.showCommentsGrid = false;
        this.minDateValue1 = new Date();
        this.showQuantityLabel = false;
        this.deviceTokenEntry = [];
        this.lstFilteredItems = [];
        this.tkitEqItmLotSerail = [];
        this.tkitItemTypeDetials = [];
        this.orgGrpID = "";
        this.orgGrpIDData = "";
        this.selectedDeptIDs = [];
        this.onitemidvaluechanged = false;
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.lstItems = [];
        this.showgrid = false;
        this.blnsortbycolumn = true;
        this.custom = "custom";
        this.dataCheckedSorting = [];
        this.showitemdetailsFields = false;
        this.showlotserialsgrid = false;
        this.newItem = new VM_TKIT_ITEM_DETAILS_1.VM_TKIT_ITEM_DETAILS();
        this.newItemLotSerial = new TKIT_ITEM_INVENTORY_1.TKIT_ITEM_INVENTORY();
        this.showImageColumn = true;
        this.showMfrColumn = true;
        this.showVendorColumn = true;
        this.showDescriptionColumn = true;
        this.showQuantityColumn = false;
        this.showDestructionColumn = true;
        this.showDepartmentsColumn = true;
        this.showAddSerailbutton = false;
        this.selectedDeptDetails = [];
        this.userSelectedFile = '';
        this.disableButton = true;
        this.disablelotserailButton = true;
        this.addnewitembutton = false;
        this.searchFlag = false;
        this.gobutton = false;
        this.editItemDetailsFlag = false;
        this.addItemDetailsFlag = false;
        this.editLotSerialFlag = false;
        this.addLotSerailFlag = false;
        this.updateLotSerialFlag = false;
        this.showImage = false;
        this.additemflag = false;
        this.edititemflag = false;
        this.addserailflag = false;
        this.editserailflag = false;
        this.imgBasePath = '';
        this.enteredDescription = '';
        this.assetfieldpart2 = false;
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    ManageEquipmentItemsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nowDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        this.growlMessage = [];
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.pazeSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.newItem = new VM_TKIT_ITEM_DETAILS_1.VM_TKIT_ITEM_DETAILS();
                        this.InitializationProperties();
                        this.dataCheckedSorting = new Array();
                        this.dataUncheckedSorting = new Array();
                        //for org group data
                        return [4 /*yield*/, this.bindUserOrgGroups()];
                    case 1:
                        //for org group data
                        _a.sent();
                        return [4 /*yield*/, this.GetSearchItems()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.PopulateTypesDropDown()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.PopulateItemsDropDown()];
                    case 4:
                        _a.sent();
                        nowDate = new Date();
                        this.date2 = new Date();
                        this.imgBasePath = window.location.protocol + "//" + window.location.hostname + '/AtPar/Web/Uploaded/';
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.InitializationProperties = function () {
        this.newItem = new VM_TKIT_ITEM_DETAILS_1.VM_TKIT_ITEM_DETAILS();
        this.newItem.ORG_GROUP_ID = '';
        this.newItem.ITEM_ID = '';
        this.newItem.DESCRIPTION = '';
        this.newItem.IMAGE = '';
        this.newItem.CHK_VALUE = +'';
        this.newItem.COMMENTS = '';
        this.newItem.CREATEUSERNAME = '';
        this.newItem.CREATE_DATE = new Date();
        this.newItem.DEPT_ID = '';
        this.newItem.OWNER = '';
        this.newItem.ITEM_INACTIVATED = false;
        this.newItem.VENDOR = '';
        this.newItem.MANUFACTURER = '';
        this.newItem.ITEM_DESCR = '';
        this.newItem.DESTRUCTION_DATE = new Date();
        this.newItem.ITEM_QTY = +'';
        this.newItem.ITEM_TYPE = '';
        this.newItem.OWNER_TYPE = '';
        this.newItem.STORAGE_LOCATION = '';
        this.newItem.UPDATEUSERNAME = '';
        this.newItem.UPDATE_DATE = new Date();
        this.newItem.Disable = false;
        this.newItemLotSerial = new TKIT_ITEM_INVENTORY_1.TKIT_ITEM_INVENTORY();
        this.newItemLotSerial.AVAILABILITY = false;
        this.newItemLotSerial.CHECKIN_DATE = new Date();
        this.newItemLotSerial.ITEM_ID = '';
        this.newItemLotSerial.ITEM_QTY = +'';
        this.newItemLotSerial.ITEM_TYPE = '';
        this.newItemLotSerial.LOT_NO = '';
        this.newItemLotSerial.ORG_GROUP_ID = '';
        this.newItemLotSerial.OWNER = '';
        this.newItemLotSerial.OWNER_TYPE = '';
        this.newItemLotSerial.ROW_INDEX = +'';
        this.newItemLotSerial.SERIAL_NO = '';
        this.newItemLotSerial.SERVICE_DT_TIME = new Date();
        this.newItemLotSerial.STATUS = false;
        this.newItemLotSerial.STORAGE_LOCATION = '';
        this.newItemLotSerial.UPDATE_DATE = new Date();
        this.newItemLotSerial.USER_FIELD_1 = '';
        this.newItemLotSerial.USER_FIELD_2 = '';
        this.newItemLotSerial.ASSET_ID = '';
        // this.newItemLotSerial.
        this.populateOwnerTypeDD();
    };
    ManageEquipmentItemsComponent.prototype.bindUserOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpIDData = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGrpID = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.selectedOrgGroupId = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.spinnerService.stop();
                                            _this.populateData();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.blnShowOrgGroupLabel = false;
                                            _this.lstOrgGroups = [];
                                            _this.lstOrgGroups.push({ label: "Select OrgGrpID", value: "Select OrgGrpID" });
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
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "Select OrgGrpID") {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid OrgGrpId" });
                    return [2 /*return*/];
                }
                else {
                    // this.populateData();
                }
                return [2 /*return*/];
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.GetSearchItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageEquipmentItemsService.GetMasterItems().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstFilteredItems = data.DataList;
                                        _this.tkitEquipmentItemDetails = [];
                                        _this.tkitEquipmentItemDetails = data.DataList;
                                        if (_this.searchFlag) {
                                            _this.DisplayItemDetailsGrid();
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        this.clientErrorMsg(ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.PopulateTypesDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var itemindicator, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageEquipmentItemsService.GetEquipmentTypes("", this.orgGrpID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.tkitItmEquipmentType = data.DataList;
                                        if (_this.tkitItmEquipmentType != null && _this.tkitItmEquipmentType != undefined) {
                                            _this.lstEquipmentTypes = [];
                                            _this.lstEquipmentTypes.push({ label: "Select Equipment", value: "Select Equipment" });
                                            for (var i = 0; i < data.DataList.length; i++) {
                                                _this.lstEquipmentTypes.push({
                                                    label: data.DataList[i].ITEM_TYPE_DESCR + " " + "(" + data.DataList[i].ITEM_TYPE + ")",
                                                    value: data.DataList[i].ITEM_TYPE
                                                });
                                            }
                                            // this.PopulateItemsDropDown();
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.PopulateItemsDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //items dropdown
                        // GetItemsForSelectedType
                        this.lstItemDetails = [];
                        this.lstItemDetails.push({ label: "Select Item", value: "Select Item" });
                        if (!(this.selectedEquipmentType != null && this.selectedEquipmentType != undefined && this.selectedEquipmentType != '' && this.selectedEquipmentType != 'Select Equipment')) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageEquipmentItemsService.GetItemsForSelectedEqType(this.selectedEquipmentType, "").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.tkitItemDetials = [];
                                        _this.tkitItemDetials = data.DataVariable.m_Item2;
                                        _this.selectedEqType = '';
                                        _this.selectedEqType = data.DataVariable.m_Item1;
                                        if (_this.tkitItemDetials != null && _this.tkitItemDetials != undefined) {
                                            for (var i = 0; i < data.DataVariable.m_Item2.length; i++) {
                                                _this.lstItemDetails.push({
                                                    label: data.DataVariable.m_Item2[i].DESCRIPTION,
                                                    value: data.DataVariable.m_Item2[i].ITEM_ID
                                                });
                                            }
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.GetEquipmentItemDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (this.selectedItemID == null || this.selectedItemID == undefined || this.selectedItemID == '' || this.selectedItemID == 'Select Item') {
                            this.selectedItemID = '';
                        }
                        return [4 /*yield*/, this.PopulateDepartments()];
                    case 2:
                        _a.sent();
                        if (!(this.selectedEqType == "E")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.GetVendorDetials()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: 
                    //  this.spinnerService.start();
                    return [4 /*yield*/, this.manageEquipmentItemsService.GetTypeItems(this.selectedEquipmentType, this.selectedItemID).then(function (res) {
                            var data = res.json();
                            _this.growlMessage = [];
                            switch (data.StatType) {
                                case AtParEnums_2.StatusType.Success: {
                                    _this.tkitEquipmentItemDetails = [];
                                    _this.tkitEqItmLotSerail = [];
                                    _this.typeIndicator = data.DataVariable.m_Item1;
                                    _this.tkitEquipmentItemDetails = data.DataVariable.m_Item2;
                                    _this.tkitEqItmLotSerail = data.DataVariable.m_Item3;
                                    if (_this.editItemDetailsFlag == true) {
                                        // this.bindtkitEquipmentItemDetails();
                                        _this.selectedEqType = data.DataVariable.m_Item1;
                                        if (data.DataVariable.m_Item1 == "E") {
                                            _this.showlotserialsgrid = true;
                                            _this.showAddSerailbutton = true;
                                        }
                                    }
                                    if (_this.addnewitembutton == false) {
                                        // this.bindtkitEquipmentItemDetails();
                                    }
                                    _this.bindtkitEquipmentItemDetails();
                                    _this.spinnerService.stop();
                                    break;
                                }
                                case AtParEnums_2.StatusType.Warn: {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_2.StatusType.Error: {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_2.StatusType.Custom: {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    break;
                                }
                            }
                        })];
                    case 5:
                        //  this.spinnerService.start();
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.ddlEquipmentTypeChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.enteredDescription = '';
                this.showLotSerialFields = false;
                this.showgrid = false;
                this.showitemdetailsFields = false;
                this.showlotserialsgrid = false;
                this.selectedItemID = "";
                this.lstItemDetails = [];
                this.showCommentsGrid = false;
                this.selectedItemAsset = '';
                this.tkitEquipmentItemDetails = [];
                //clear the items drop down
                this.tkitItemDetials = [];
                this.selectedEqType = "";
                this.PopulateItemsDropDown();
                return [2 /*return*/];
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.ddlItemIDsChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.populateData = function () {
        this.GetSearchItems();
        // this.showgrid = true;
    };
    ManageEquipmentItemsComponent.prototype.fillItemsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstFilteredItems = [];
                        query = event.query;
                        if (this.blnShowOrgGroupLabel == true) {
                            this.selectedOrgGroupId = this.orgGrpID;
                        }
                        else {
                            this.selectedOrgGroupId = this.selectedOrgGroupId;
                        }
                        if (this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "Select OrgGrpID") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.manageEquipmentItemsService.GetMasterItems().
                                catch(this.httpService.handleError).then(function (res) {
                                _this.spinnerService.stop();
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstItems = data.DataList;
                                        _this.lstFilteredItems = _this.filterBusinessUnits(query, _this.lstItems);
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        if (data.StatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.DisplayItemDetailsGrid = function () {
        //need to dispaly the data of search matched records in the grid.
        if (this.selectedItemAsset != null && this.selectedItemAsset != undefined && this.selectedItemAsset != "") {
            this.tkitEquipmentItemDetailsList = [];
            for (var k = 0; k < this.tkitEquipmentItemDetails.length; k++) {
                this.tkitEquipmentItemDetailsList.push(this.tkitEquipmentItemDetails[k]);
            }
            if (this.tkitEquipmentItemDetailsList.length > 0) {
                this.showCommentsGrid = true;
            }
            else {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                return;
            }
        }
        else {
            this.showgrid = false;
        }
    };
    ManageEquipmentItemsComponent.prototype.filterBusinessUnits = function (query, businessunits) {
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
    ManageEquipmentItemsComponent.prototype.PopulateDepartments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.lstDeptDetails = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageEquipmentItemsService.GetItemDepartments(this.selectedItemID, this.selectedOrgGroupId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.tkitDeptDetails = [];
                                        _this.tkitDeptDetails = data.DataList;
                                        if (_this.tkitDeptDetails != null && _this.tkitDeptDetails != undefined) {
                                            _this.selectedDeptIDs = [];
                                            for (var i = 0; i < data.DataList.length; i++) {
                                                _this.lstDeptDetails.push({
                                                    label: data.DataList[i].DESCRIPTION + " - " + data.DataList[i].DEPT_ID,
                                                    value: data.DataList[i].DEPT_ID
                                                });
                                            }
                                        }
                                        _this.populateOwnerDD();
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.ddlDeptIDChanged = function () {
        this.newItem.DEPT_ID = '';
        var id = '';
        if (this.selectedDeptIDs != null && this.selectedDeptIDs != undefined && this.selectedDeptIDs != []) {
            if (this.selectedDeptIDs.length > 0) {
                id = this.selectedDeptIDs.join();
            }
        }
        else {
            this.selectedDeptIDs = [];
            id = '';
        }
    };
    ManageEquipmentItemsComponent.prototype.btnGo_Click = function () {
        this.selectedDeptDetails = [];
        this.selectedDeptIDs = [];
        this.selectedItemAsset = '';
        this.enteredDescription = '';
        if (this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == '' || this.selectedOrgGroupId == "Select OrgGrpID") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select OrgGroupID" });
            return;
        }
        this.addnewitembutton = false;
        this.gobutton = true;
        this.growlMessage = [];
        if (this.selectedEqType == null || this.selectedEqType == undefined || this.selectedEqType == '') {
            this.selectedItemAsset = "";
            this.showgrid = false;
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Equipment" });
            return;
        }
        if (this.selectedItemID == null || this.selectedItemID == undefined || this.selectedItemID == '' || this.selectedItemID == 'Select Item') {
            this.selectedItemID = '';
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Item ID" });
            return;
        }
        this.GetEquipmentItemDetails();
    };
    ManageEquipmentItemsComponent.prototype.bindtkitEquipmentItemDetails = function () {
        this.selectedDeptDetails = [];
        this.selectedDeptIDs = [];
        this.InitializationProperties();
        this.tkitEquipmentItemDetailsList = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        this.tkitEqItmLotSerailList = [];
        for (var k = 0; k < this.tkitEquipmentItemDetails.length; k++) {
            this.tkitEquipmentItemDetailsList.push(this.tkitEquipmentItemDetails[k]);
        }
        if (this.tkitEqItmLotSerail != null && this.tkitEqItmLotSerail != undefined && this.tkitEqItmLotSerail.length != 0) {
            for (var j = 0; j < this.tkitEqItmLotSerail.length; j++) {
                this.tkitEqItmLotSerail[j].ORG_GROUP_ID = this.selectedOrgGroupId;
                this.newItemLotSerial.ITEM_TYPE = this.selectedEquipmentType;
                this.tkitEqItmLotSerailList.push(this.tkitEqItmLotSerail[j]);
            }
        }
        for (var i = 0; i <= this.tkitEquipmentItemDetailsList.length - 1; i++) {
            if (this.tkitEquipmentItemDetailsList[i].IMAGE != null && this.tkitEquipmentItemDetailsList[i].IMAGE != undefined && this.tkitEquipmentItemDetailsList[i].IMAGE != '') {
                this.tkitEquipmentItemDetailsList[i].showImage = true;
            }
            this.tkitEquipmentItemDetails[i].IMAGE_PATH = this.imgBasePath + this.tkitEquipmentItemDetails[i].IMAGE;
            this.userSelectedFile = this.tkitEquipmentItemDetails[i].IMAGE;
            if (this.tkitEquipmentItemDetailsList[i].CHK_VALUE == 1) {
                this.dataCheckedSorting.push(this.tkitEquipmentItemDetailsList[i]);
            }
            else {
                this.dataUncheckedSorting.push(this.tkitEquipmentItemDetailsList[i]);
            }
            if (this.selectedEqType == "B") {
                this.showImageColumn = false;
                this.showMfrColumn = false;
                this.showQuantityColumn = false;
                this.showQuantityLabel = false;
                this.showVendorColumn = false;
                this.showDepartmentsColumn = true;
                this.showDestructionColumn = true;
                this.showAddSerailbutton = false;
                this.showlotserialsgrid = false;
            }
            else if (this.selectedEqType == "E") {
                if (this.tkitEqItmLotSerailList.length > 0) {
                    this.showlotserialsgrid = true; //for item lot/serial details
                }
                this.showAddSerailbutton = true; //for displaying the add serials button
                this.showImageColumn = true;
                this.showMfrColumn = true;
                this.showQuantityLabel = true;
                this.showVendorColumn = true;
                this.showQuantityColumn = false;
                this.showDestructionColumn = false;
                this.showDepartmentsColumn = true;
            }
            else if (this.selectedEqType == "F") {
                this.showImageColumn = true;
                this.showMfrColumn = true;
                this.showQuantityLabel = false;
                this.showAddSerailbutton = false;
                this.showVendorColumn = true;
                this.showQuantityColumn = true;
                this.showDestructionColumn = true;
                this.showlotserialsgrid = false;
                this.showDepartmentsColumn = false;
            }
            // this.show
        }
        this.showitemdetailsFields = true;
        this.editItemDetailsFlag = true;
        this.newItem.DEPT_ID = '';
        this.newItem = this.tkitEquipmentItemDetailsList[0];
        this.newItem.Disable = true;
        if (this.newItem.DEPT_ID != null && this.newItem.DEPT_ID != undefined && this.newItem.DEPT_ID != '')
            var deptiddata = this.newItem.DEPT_ID.trim();
        if (this.newItem.IMAGE != null && this.newItem.IMAGE != undefined && this.newItem.IMAGE != '')
            this.userSelectedFile = this.newItem.IMAGE;
        if (this.newItem.DEPT_ID != null && this.newItem.DEPT_ID != undefined && this.newItem.DEPT_ID != '') {
            if (deptiddata.indexOf(',') > 0) {
                for (var x = 0; x < deptiddata.split(',').length; x++) {
                    this.selectedDeptDetails.push(deptiddata.split(',')[x].trim());
                }
            }
            else {
                this.selectedDeptDetails.push(this.newItem.DEPT_ID);
            }
        }
        this.selectedDeptIDs = this.selectedDeptDetails;
        this.selectedOwnerType = this.newItem.OWNER_TYPE;
        this.selectedVendor = this.newItem.VENDOR;
        this.selectedOwner = this.newItem.OWNER;
        this.disableButton = false;
        this.spinnerService.stop();
        this.validationITEM_ID = 0;
        this.validationITEM_QTY = 0;
        this.validationDESCRIPTION = 0;
        this.validationSTORAGE_LOCATION = 0;
        this.edititemflag = true;
        this.additemflag = false;
        this.page = false;
    };
    ManageEquipmentItemsComponent.prototype.selectedLotSerialAvailability = function (values, event) {
        try {
            if (event == true) {
                values.STATUS = true;
            }
            else {
                values.STATUS = false;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageEquipmentItemsComponent.prototype.ddlOwnerChanged = function () {
        this.newItem.OWNER = this.selectedOwner;
    };
    ManageEquipmentItemsComponent.prototype.checkAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                }
            }
            else {
                if (this.EndIndex > this.tkitEquipmentItemDetailsList.length) {
                    this.EndIndex = this.tkitEquipmentItemDetailsList.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.tkitEquipmentItemDetailsList[i].CHK_VALUE = 1;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageEquipmentItemsComponent.prototype.filterdata = function (event) {
        try {
            this.lstgridfilterData = [];
            this.lstgridfilterData = new Array();
            this.lstgridfilterData = event;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageEquipmentItemsComponent.prototype.unCheckAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    //  this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                }
            }
            else {
                if (this.EndIndex > this.tkitEquipmentItemDetailsList.length) {
                    this.EndIndex = this.tkitEquipmentItemDetailsList.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    //  this.tkitEquipmentItemDetailsList[i].checkvalue = false;
                    this.tkitEquipmentItemDetailsList[i].CHK_VALUE = 0;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageEquipmentItemsComponent.prototype.selectedRow = function (values, event) {
        try {
            if (event == true) {
                values.CHK_VALUE = 1;
            }
            else {
                values.CHK_VALUE = 0;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageEquipmentItemsComponent.prototype.customSort = function (event) {
        try {
            var element = event;
            this.tkitEquipmentItemDetailsList = [];
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
                this.tkitEquipmentItemDetailsList = [];
                this.tkitEquipmentItemDetailsList = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
            }
            else {
                this.tkitEquipmentItemDetailsList = [];
                this.tkitEquipmentItemDetailsList = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
            }
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageEquipmentItemsComponent.prototype.search = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.searchFlag = true;
                        this.addnewitembutton = false;
                        this.gobutton = true;
                        this.showgrid = false;
                        this.showitemdetailsFields = false;
                        this.showlotserialsgrid = false;
                        this.selectedItemID = '';
                        this.selectedEqType = '';
                        this.newItem = new VM_TKIT_ITEM_DETAILS_1.VM_TKIT_ITEM_DETAILS();
                        this.showAddSerailbutton = false;
                        this.showLotSerialFields = false;
                        this.selectedEquipmentType = '';
                        this.growlMessage = [];
                        this.tkitEquipmentItemDetails = [];
                        this.tkitEquipmentItemDetailsList = [];
                        this.showCommentsGrid = false;
                        if (!(this.selectedItemAsset == null || this.selectedItemAsset == undefined || this.selectedItemAsset == '')) return [3 /*break*/, 1];
                        this.showgrid = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter search string" });
                        return [2 /*return*/];
                    case 1: 
                    // it will call the both PopulateTypesDropDown(),PopulateItemsDropDown()
                    return [4 /*yield*/, this.PopulateTypesDropDown()];
                    case 2:
                        // it will call the both PopulateTypesDropDown(),PopulateItemsDropDown()
                        _a.sent();
                        return [4 /*yield*/, this.PopulateItemsDropDown()];
                    case 3:
                        _a.sent();
                        //   if (this.enteredDescription != null && this.enteredDescription != undefined && this.enteredDescription != '') {
                        return [4 /*yield*/, this.GetSearchItemDetails()];
                    case 4:
                        //   if (this.enteredDescription != null && this.enteredDescription != undefined && this.enteredDescription != '') {
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.GetSearchItemDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var itemidvalue, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        itemidvalue = this.selectedItemAsset.split('(')[0].trim();
                        return [4 /*yield*/, this.manageEquipmentItemsService.GetMasterItemsdetails(itemidvalue, this.enteredDescription).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstFilteredItems = data.DataList;
                                        _this.tkitEquipmentItemDetails = [];
                                        _this.tkitEquipmentItemDetails = data.DataList;
                                        if (_this.searchFlag) {
                                            _this.DisplayItemDetailsGrid();
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.showCommentsGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.showCommentsGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.showCommentsGrid = false;
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
                        this.clientErrorMsg(ex_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.addNewItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.additemflag = true;
                        this.edititemflag = false;
                        // this.validationITEM_ID = 1;
                        this.validationITEM_DESCR = 1;
                        this.validationSTORAGE_LOCATION = 1;
                        this.validationDESCRIPTION = 1;
                        if (this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == '' || this.selectedOrgGroupId == "Select OrgGrpID") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid OrgGrpId" });
                            return [2 /*return*/];
                        }
                        this.selectedItemAsset = '';
                        this.enteredDescription = '';
                        this.userSelectedFile = '';
                        this.selectedOwner = '';
                        this.selectedOwnerType = '';
                        this.selectedDeptIDs = [];
                        this.selectedDeptDetails = [];
                        this.selectedVendor = '';
                        this.InitializationProperties();
                        this.selectedDeptIDs = [];
                        this.selectedOwnerType = this.lstOwnerType[0].value;
                        this.newItem.OWNER_TYPE = this.selectedOwnerType;
                        this.showCommentsGrid = false;
                        this.showgrid = false;
                        this.editItemDetailsFlag = false;
                        this.addnewitembutton = true;
                        this.gobutton = false;
                        this.addItemDetailsFlag = true;
                        this.growlMessage = [];
                        this.tkitEquipmentItemDetails = [];
                        this.tkitEquipmentItemDetailsList = [];
                        this.growlMessage = [];
                        if (this.selectedEqType == null || this.selectedEqType == undefined || this.selectedEqType == '') {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Equipment" });
                            return [2 /*return*/];
                        }
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Equipment Item';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.selectedItemAsset = '';
                        this.showCommentsGrid = false;
                        this.page = false;
                        this.showgrid = false;
                        this.showitemdetailsFields = false;
                        this.showlotserialsgrid = false;
                        this.selectedItemID = null;
                        this.showAddSerailbutton = false;
                        this.showLotSerialFields = false;
                        return [4 /*yield*/, this.PopulateDepartments()];
                    case 1:
                        _a.sent();
                        this.showitemdetailsFields = true;
                        this.showgrid = false;
                        if (this.selectedEqType == "E") {
                            this.showAddSerailbutton = true;
                        }
                        else {
                            this.showAddSerailbutton = false;
                        }
                        this.newItem.ITEM_TYPE = this.selectedEquipmentType;
                        this.newItem.ITEM_QTY = null;
                        this.newItem.CREATEUSERNAME = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString();
                        this.showAndHideTextBoxs();
                        //need to implement the following service call
                        return [4 /*yield*/, this.GetLatestValue()];
                    case 2:
                        //need to implement the following service call
                        _a.sent();
                        this.tkitEqItmLotSerailList = [];
                        this.tkitEquipmentItemDetailsList = [];
                        this.disableButton = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.GetLatestAssetIDValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tkitAppId, orgGrpParamName, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        tkitAppId = AtParEnums_2.EnumApps.TrackIT;
                        orgGrpParamName = '';
                        return [4 /*yield*/, this.SetMaxSorageDate()];
                    case 1:
                        _a.sent();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageEquipmentItemsService.GetLatestAssetIDValue(tkitAppId, "ASSET_ID").then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.newItemLotSerial.ASSET_ID = data.DataVariable;
                                        _this.assetfieldpart2 = true;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.grddata = function (ven3) {
        var imagepath = ven3.IMAGE_PATH;
    };
    ManageEquipmentItemsComponent.prototype.editItemDetails = function (vendata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showgrid = false;
                        this.editItemDetailsFlag = true;
                        this.addItemDetailsFlag = false;
                        this.page = false;
                        this.showitemdetailsFields = true;
                        this.showgrid = false;
                        if (this.selectedEqType == "E") {
                            this.showAddSerailbutton = true;
                            this.showlotserialsgrid = true;
                        }
                        this.selectedItemID = vendata.ITEM_ID;
                        this.selectedEquipmentType = vendata.ITEM_TYPE;
                        return [4 /*yield*/, this.PopulateTypesDropDown()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.PopulateItemsDropDown()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.GetEquipmentItemDetails()];
                    case 3:
                        _a.sent();
                        this.showCommentsGrid = false;
                        this.showAndHideTextBoxs();
                        if (this.editItemDetailsFlag) {
                            //udpate details 
                            this.disableButton = false;
                            if (this.newItem.ITEM_ID == null || this.newItem.ITEM_ID == undefined || this.newItem.ITEM_DESCR == '') {
                                this.disableButton = true;
                            }
                            if (this.newItem.STORAGE_LOCATION == null || this.newItem.STORAGE_LOCATION == undefined || this.newItem.STORAGE_LOCATION == '') {
                                this.disableButton = true;
                            }
                            if (this.newItem.DESCRIPTION == null || this.newItem.DESCRIPTION == undefined || this.newItem.DESCRIPTION == '') {
                                this.disableButton = true;
                            }
                            if (this.disableButton) {
                            }
                            else {
                                this.disableButton = false;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.showAndHideTextBoxs = function () {
        if (this.selectedEqType == "B") {
            this.showImageColumn = false; //for btype items no need of image column
            this.showMfrColumn = false;
            this.showQuantityColumn = false;
            this.showVendorColumn = false;
            this.showDepartmentsColumn = true;
            this.showDestructionColumn = true;
            this.showQuantityLabel = false;
        }
        else if (this.selectedEqType == "E") {
            this.showImageColumn = true;
            this.showMfrColumn = true;
            this.showQuantityLabel = true;
            this.showVendorColumn = true;
            this.showQuantityColumn = false;
            this.showDestructionColumn = false;
            this.showDepartmentsColumn = true;
        }
        else if (this.selectedEqType == "F") {
            this.showImageColumn = true;
            this.showMfrColumn = true;
            this.showVendorColumn = true;
            this.showQuantityColumn = true;
            this.showDestructionColumn = true;
            this.showQuantityLabel = false;
            this.showDepartmentsColumn = false;
        }
    };
    ManageEquipmentItemsComponent.prototype.addNewserials = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Serial';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        //for displaying the buttons and test boxes in add serail div tag
                        this.addserailflag = true;
                        this.editLotSerialFlag = false;
                        this.addLotSerailFlag = true;
                        this.disablelotserailButton = true;
                        this.newItemLotSerial = new TKIT_ITEM_INVENTORY_1.TKIT_ITEM_INVENTORY();
                        this.showLotSerialFields = true;
                        this.showAddSerailbutton = true;
                        this.page = false;
                        this.showgrid = false;
                        this.showCommentsGrid = false;
                        this.showitemdetailsFields = false;
                        this.showlotserialsgrid = false;
                        return [4 /*yield*/, this.GetLatestAssetIDValue()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.editserial = function (vendata) {
        //edit the lot/serail values from the grid
        // this.edititemflag = true;
        this.editserailflag = true;
        this.addLotSerailFlag = false;
        this.updateLotSerialFlag = true;
        this.selectedLotSerialRow = vendata;
        vendata.Disable = true;
        this.page = false;
        this.showgrid = false;
        this.showCommentsGrid = false;
        this.showitemdetailsFields = false;
        this.showlotserialsgrid = true;
        this.newItemLotSerial = new TKIT_ITEM_INVENTORY_1.TKIT_ITEM_INVENTORY();
        var lotid = vendata.LOT_NO;
        var serialNo = vendata.SERIAL_NO;
        if (vendata.ASSET_ID.length == 13) {
            if (vendata.ASSET_ID != null && vendata.ASSET_ID != undefined && vendata.ASSET_ID != '')
                var assetid = vendata.ASSET_ID.slice(4, 13);
            if (vendata.ASSET_ID != null && vendata.ASSET_ID != undefined && vendata.ASSET_ID != '')
                var assetidpart1 = vendata.ASSET_ID.slice(0, 4);
        }
        else {
            if (vendata.ASSET_ID != null && vendata.ASSET_ID != undefined && vendata.ASSET_ID != '')
                var assetid = vendata.ASSET_ID;
        }
        var useridField1 = vendata.USER_FIELD_1;
        var checkindate = vendata.CHECKIN_DATE;
        var servicedate = vendata.SERVICE_DT_TIME;
        var newdate = new Date(vendata.SERVICE_DT_TIME);
        var isdiable = vendata.Disable;
        this.newItemLotSerial.LOT_NO = lotid;
        this.newItemLotSerial.SERIAL_NO = serialNo;
        this.newItemLotSerial.ASSET_ID = assetid;
        this.newItemLotSerial.ASSET_IDPART1 = assetidpart1;
        this.newItemLotSerial.USER_FIELD_1 = useridField1;
        this.newItemLotSerial.CHECKIN_DATE = checkindate;
        this.newItemLotSerial.SERVICE_DT_TIME = newdate;
        this.newItemLotSerial.Disable = isdiable;
        this.showLotSerialFields = true;
        this.disablelotserailButton = false;
    };
    ManageEquipmentItemsComponent.prototype.getFormattedDate = function (date) {
        var year = date.getFullYear();
        /// Add 1 because JavaScript months start at 0
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
    };
    ManageEquipmentItemsComponent.prototype.lotSerailValidations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var result, valueofassetId, valueofcheckindate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //whether the value of serial id is already present
                        if (this.tkitEqItmLotSerailList == null || this.tkitEqItmLotSerailList == undefined) {
                            this.tkitEqItmLotSerailList = new Array();
                        }
                        if (!(this.tkitEqItmLotSerailList != null && this.tkitEqItmLotSerailList != undefined)) return [3 /*break*/, 4];
                        result = this.tkitEqItmLotSerailList.filter(function (x) { return x.SERIAL_NO == _this.newItemLotSerial.SERIAL_NO; });
                        if (!(result.length > 0)) return [3 /*break*/, 1];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Serial ID already Exists" });
                        return [2 /*return*/];
                    case 1:
                        this.growlMessage = [];
                        if (this.newItemLotSerial.SERIAL_NO != null && this.newItemLotSerial.SERIAL_NO != undefined && this.newItemLotSerial.SERIAL_NO != '') {
                            valueofassetId = this.newItemLotSerial.ASSET_ID;
                            valueofcheckindate = this.newItemLotSerial.CHECKIN_DATE;
                            this.newItemLotSerial.ORG_GROUP_ID = this.selectedOrgGroupId;
                            this.newItemLotSerial.ITEM_ID = this.newItem.ITEM_ID;
                            this.newItemLotSerial.ITEM_TYPE = this.selectedEquipmentType;
                            this.newItemLotSerial.STORAGE_LOCATION = this.newItem.STORAGE_LOCATION;
                            this.newItemLotSerial.ITEM_QTY = this.newItem.ITEM_QTY;
                            if (this.newItemLotSerial.ASSET_IDPART1 == undefined || this.newItemLotSerial.ASSET_IDPART1 == null || this.newItemLotSerial.ASSET_IDPART1 == '')
                                this.newItemLotSerial.ASSET_IDPART1 = '';
                            this.newItemLotSerial.ASSET_ID = this.newItemLotSerial.ASSET_IDPART1 + this.newItemLotSerial.ASSET_ID;
                            this.tkitEqItmLotSerailList.push(this.newItemLotSerial);
                            this.showlotserialsgrid = true;
                            this.newItemLotSerial = new TKIT_ITEM_INVENTORY_1.TKIT_ITEM_INVENTORY();
                            this.newItemLotSerial.CHECKIN_DATE = valueofcheckindate;
                            this.newItemLotSerial.ASSET_ID = valueofassetId;
                        }
                        return [4 /*yield*/, this.GetLatestAssetIDValue()];
                    case 2:
                        _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Lot/serials Added Successfully" });
                        this.disablelotserailButton = true;
                        return [2 /*return*/];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        this.tkitEqItmLotSerailList = new Array();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.gobackFromAddEditSerial = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Equipment Item';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        // remove the add/edit lot/serail text fields
        this.showLotSerialFields = false;
        this.growlMessage = [];
        this.page = false;
        this.showitemdetailsFields = true;
        this.addLotSerailFlag = false;
        if (this.updateLotSerialFlag == true) {
            if (this.previousvalue != this.newItemLotSerial) {
                this.newItemLotSerial = this.previousvalue;
            }
        }
        if (this.selectedEqType == 'E' && this.tkitEqItmLotSerailList != null && this.tkitEqItmLotSerailList != undefined && this.tkitEqItmLotSerailList.length != 0) {
            this.showlotserialsgrid = true;
        }
        else {
            this.showlotserialsgrid = false;
            ;
        }
        this.addserailflag = false;
        this.editserailflag = false;
    };
    //// regrion for add functionality
    ManageEquipmentItemsComponent.prototype.GetLatestValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tkitAppId, orgGrpParamName, ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        tkitAppId = AtParEnums_2.EnumApps.TrackIT;
                        orgGrpParamName = '';
                        this.spinnerService.start();
                        return [4 /*yield*/, this.SetMaxSorageDate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.manageEquipmentItemsService.GetLatestValue(tkitAppId, "ITEM_ID").then(function (res) {
                                // let response = res.json();
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.newItem.ITEM_ID = data.DataVariable;
                                        _this.spinnerService.stop();
                                        if (_this.selectedEqType == "E") {
                                            //for displaying the vendor drop down when equipment type is E
                                            _this.GetVendorDetials();
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.GetVendorDetials = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.lstVendorDetails = [];
                        this.lstVendorDetails.push({ label: "Select Vendor", value: "Select Vendor" });
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageEquipmentItemsService.getVendorDetails(this.selectedOrgGroupId, "", "").then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.vendorData = data.DataList;
                                        for (var i = 0; i < _this.vendorData.length; i++) {
                                            _this.lstVendorDetails.push({ label: _this.vendorData[i].VENDOR_ID + " - " + _this.vendorData[i].VENDOR_NAME, value: _this.vendorData[i].VENDOR_ID });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Vendor Id not found" });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.SetMaxSorageDate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tkitAppId, orgGrpParamName, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tkitAppId = AtParEnums_2.EnumApps.TrackIT;
                        orgGrpParamName = 'B_MAX_STOR';
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getOrgGroupParamValue(orgGrpParamName, tkitAppId, this.selectedOrgGroupId)
                                .catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var response, data, _a, dataRange, formDate, _b, _c, _d;
                                return __generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            response = res.json();
                                            data = res.json();
                                            this.growlMessage = [];
                                            _a = data.StatType;
                                            switch (_a) {
                                                case AtParEnums_2.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_2.StatusType.Warn: return [3 /*break*/, 5];
                                                case AtParEnums_2.StatusType.Error: return [3 /*break*/, 6];
                                                case AtParEnums_2.StatusType.Custom: return [3 /*break*/, 7];
                                            }
                                            return [3 /*break*/, 8];
                                        case 1:
                                            dataRange = response.DataVariable.toString();
                                            formDate = new Date();
                                            _b = this.newItem;
                                            return [4 /*yield*/, this.addDays(formDate, dataRange)];
                                        case 2:
                                            _b.DESTRUCTION_DATE = _e.sent();
                                            _c = this.newItemLotSerial;
                                            return [4 /*yield*/, this.addDays(formDate, dataRange)];
                                        case 3:
                                            _c.CHECKIN_DATE = _e.sent();
                                            _d = this.newItemLotSerial;
                                            return [4 /*yield*/, this.addDays(formDate, dataRange)];
                                        case 4:
                                            _d.SERVICE_DT_TIME = _e.sent();
                                            this.spinnerService.stop();
                                            return [3 /*break*/, 8];
                                        case 5:
                                            {
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _e.label = 6;
                                        case 6:
                                            {
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _e.label = 7;
                                        case 7:
                                            {
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _e.label = 8;
                                        case 8: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.addDays = function (theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    };
    ManageEquipmentItemsComponent.prototype.convert = function (str) {
        var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    ManageEquipmentItemsComponent.prototype.SaveItemQtyDetails = function (modeofoperation) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lstItemInvDetails, lstItemDetails, deptids, todayDate, toDate, item, toDate, ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        lstItemInvDetails = [];
                        lstItemDetails = [];
                        if (modeofoperation == "ADD" || modeofoperation == "ADDNPRINT") {
                            this.newItem.ORG_GROUP_ID = this.selectedOrgGroupId;
                        }
                        this.newItem.ORG_GROUP_ID = this.selectedOrgGroupId;
                        deptids = this.selectedDeptIDs.join();
                        this.newItem.DEPT_ID = deptids.trim();
                        todayDate = new Date();
                        if (this.newItem.DESTRUCTION_DATE != null && this.newItem.DESTRUCTION_DATE != undefined) {
                            toDate = new Date(this.newItem.DESTRUCTION_DATE);
                            if (toDate < todayDate) {
                                // this.grdHide = false;
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max Storage Date must be greater than or equal to current date" });
                                this.spinnerService.stop();
                                return [2 /*return*/];
                            }
                        }
                        if (this.selectedEqType == "B") {
                            this.newItem.ITEM_QTY = 1;
                        }
                        lstItemDetails.push(this.newItem);
                        // this.newItem.DESTRUCTION_DATE = this.date2;
                        if (this.selectedEqType == "E") {
                            if (this.tkitEqItmLotSerailList == null || this.tkitEqItmLotSerailList == undefined || this.tkitEqItmLotSerailList.length == 0) {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'Warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Please enter atleast one serial number" });
                                return [2 /*return*/];
                            }
                            else {
                                for (item = 0; item < this.tkitEqItmLotSerailList.length; item++) {
                                    this.tkitEqItmLotSerailList[item].ORG_GROUP_ID = this.newItem.ORG_GROUP_ID;
                                    this.tkitEqItmLotSerailList[item].ITEM_ID = this.newItem.ITEM_ID;
                                    if (this.tkitEqItmLotSerailList[item].SERVICE_DT_TIME != null && this.tkitEqItmLotSerailList[item].SERVICE_DT_TIME != undefined) {
                                        toDate = new Date(this.tkitEqItmLotSerailList[item].SERVICE_DT_TIME);
                                        if (toDate < todayDate) {
                                            // this.grdHide = false;
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "NextService Date Time must be greater than or equal to current date" });
                                            this.spinnerService.stop();
                                            return [2 /*return*/];
                                        }
                                    }
                                }
                                lstItemInvDetails = this.tkitEqItmLotSerailList;
                            }
                        }
                        else {
                            // this.newItemLotSerial.CHECKIN_DATE = this.date2;
                            this.newItemLotSerial.ORG_GROUP_ID = this.selectedOrgGroupId;
                            this.newItemLotSerial.ITEM_ID = this.newItem.ITEM_ID;
                            this.newItemLotSerial.ITEM_TYPE = this.selectedEquipmentType;
                            this.newItemLotSerial.STORAGE_LOCATION = this.newItem.STORAGE_LOCATION;
                            this.newItemLotSerial.OWNER = this.newItem.OWNER;
                            this.newItemLotSerial.OWNER_TYPE = this.newItem.OWNER_TYPE;
                            this.newItemLotSerial.ITEM_QTY = this.newItem.ITEM_QTY;
                            //  this.newItem.STORAGE_LOCATION = this.newItem.STORAGE_LOCATION;
                            this.newItemLotSerial.UPDATE_USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString();
                            lstItemInvDetails.push(this.newItemLotSerial);
                        }
                        return [4 /*yield*/, this.manageEquipmentItemsService.SaveItemDetails(lstItemDetails, lstItemInvDetails, this.selectedEqType, modeofoperation)
                                .then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        if (modeofoperation == "ADD" || modeofoperation == "ADDNPRINT") {
                                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Item" + " ' " + _this.newItem.ITEM_ID + " ' " + "created successfully" });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Item" + " ' " + _this.newItem.ITEM_ID + " ' " + "updated  successfully" });
                                        }
                                        _this.InitializationProperties();
                                        _this.showitemdetailsFields = false;
                                        _this.showLotSerialFields = false;
                                        _this.selectedEquipmentType = '';
                                        _this.selectedItemID = '';
                                        _this.newItem.DEPT_ID = '';
                                        _this.page = true;
                                        _this.selectedItemAsset = '';
                                        _this.tkitEqItmLotSerailList = [];
                                        _this.tkitEquipmentItemDetailsList = [];
                                        _this.selectedDeptDetails = [];
                                        _this.selectedDeptIDs = [];
                                        _this.userSelectedFile = '';
                                        _this.selectedOwnerType = '';
                                        _this.selectedOwner = '';
                                        _this.additemflag = false;
                                        _this.edititemflag = false;
                                        _this.addserailflag = false;
                                        _this.editserailflag = false;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        if (data.StatusCode == 1193001) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Serial ID already Exists" });
                                            break;
                                        }
                                        if (modeofoperation == "ADD" || modeofoperation == "ADDNPRINT") {
                                            if (data.StatusCode == 1112329) {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Item '" + _this.newItem.ITEM_ID + "' created successfully and no printer address available" });
                                                _this.InitializationProperties();
                                                _this.showitemdetailsFields = false;
                                                _this.showLotSerialFields = false;
                                                _this.selectedEquipmentType = '';
                                                _this.selectedItemID = '';
                                                _this.newItem.DEPT_ID = '';
                                                _this.page = true;
                                                _this.selectedItemAsset = '';
                                                _this.tkitEqItmLotSerailList = [];
                                                _this.tkitEquipmentItemDetailsList = [];
                                                _this.selectedDeptDetails = [];
                                                _this.selectedDeptIDs = [];
                                                _this.userSelectedFile = '';
                                                _this.selectedOwnerType = '';
                                                _this.selectedOwner = '';
                                                _this.additemflag = false;
                                                _this.edititemflag = false;
                                                _this.addserailflag = false;
                                                _this.editserailflag = false;
                                                break;
                                            }
                                            if (data.StatusCode == 1302201) {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Item '" + _this.newItem.ITEM_ID + "' created successfully. Remote printer error" });
                                                break;
                                            }
                                        }
                                        else {
                                            if (data.StatusCode == 1112329) {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Item '" + _this.newItem.ITEM_ID + "' updated successfully and no printer address available" });
                                                _this.InitializationProperties();
                                                _this.showitemdetailsFields = false;
                                                _this.showLotSerialFields = false;
                                                _this.selectedEquipmentType = '';
                                                _this.selectedItemID = '';
                                                _this.newItem.DEPT_ID = '';
                                                _this.page = true;
                                                _this.selectedItemAsset = '';
                                                _this.tkitEqItmLotSerailList = [];
                                                _this.tkitEquipmentItemDetailsList = [];
                                                _this.selectedDeptDetails = [];
                                                _this.selectedDeptIDs = [];
                                                _this.userSelectedFile = '';
                                                _this.selectedOwnerType = '';
                                                _this.selectedOwner = '';
                                                _this.additemflag = false;
                                                _this.edititemflag = false;
                                                _this.addserailflag = false;
                                                _this.editserailflag = false;
                                                break;
                                            }
                                            if (data.StatusCode == 1302201) {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Item '" + _this.newItem.ITEM_ID + "' updated successfully. Remote printer error" });
                                                break;
                                            }
                                        }
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.createandprint = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.disableButton = false;
                        return [4 /*yield*/, this.datevalidation()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.SaveItemQtyDetails("ADDNPRINT")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.create = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.disableButton = false;
                        return [4 /*yield*/, this.datevalidation()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.SaveItemQtyDetails("ADD")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //// end  regrion for add functionality
    //// regrion for update functionality
    ManageEquipmentItemsComponent.prototype.updateandprint = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.datevalidation()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.SaveItemQtyDetails("UPDATENPRINT")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.datevalidation()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.SaveItemQtyDetails("EDIT")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //// end  regrion for update functionality
    ///validations
    ManageEquipmentItemsComponent.prototype.FieldsvalidationRules = function () {
        this.growlMessage = [];
        if (this.newItem.ITEM_ID == null || this.newItem.ITEM_ID == undefined || this.newItem.ITEM_ID == '') {
            this.disableButton = true;
        }
        if (this.newItem.ITEM_DESCR == null || this.newItem.ITEM_DESCR == undefined || this.newItem.ITEM_DESCR == '') {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Please enter valid Item Desc" });
            this.disableButton = true;
            return;
        }
        if (this.newItem.DESCRIPTION == null || this.newItem.DESCRIPTION == undefined || this.newItem.DESCRIPTION == '') {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Please enter valid StorgLoc " });
            this.disableButton = true;
            return;
        }
    };
    ManageEquipmentItemsComponent.prototype.fileUpload = function (event) {
        var _this = this;
        try {
            //this.spinnerService.start();
            var fileList = event.target.files;
            this.userSelectedFile = event.target.files[0].name;
            if (this.userSelectedFile != null && this.userSelectedFile != undefined && this.userSelectedFile != '') {
                var formData = new FormData();
                if (fileList.length > 0) {
                    var file = fileList[0];
                    this.files = file.name;
                    var listData = [];
                    this.newItem.showImage = false;
                    this.newItem.IMAGE = this.newItem.ITEM_TYPE + "_" + this.newItem.ITEM_ID + '.' + file.name.split('.')[1];
                    this.newItem.IMAGE_PATH = this.imgBasePath + this.newItem.IMAGE;
                    //this.newItem.showImage = true;
                    var obj = { FileName: this.newItem.ITEM_TYPE + "_" + this.newItem.ITEM_ID + '.' + file.name.split('.')[1], File: file };
                    listData.push(obj);
                    formData.append('uploadFile', file, this.newItem.IMAGE);
                }
                var headers = new http_1.Headers();
                headers.append('Authorization', 'bearer');
                headers.append('enctype', 'multipart/form-data');
                var options = new http_1.RequestOptions({ headers: headers });
                var apiUrl = this.httpService.BaseUrl + "/api/ManageEquipmentItems/SaveUploadImage";
                this.http.post(apiUrl, formData, options)
                    .toPromise()
                    .then(function (res) {
                    _this.growlMessage = [];
                    _this.spinnerService.stop();
                    var data = res.json();
                    switch (data.StatType) {
                        case AtParEnums_2.StatusType.Success: {
                            _this.files = '';
                            //this.showUploadImage = false;
                            _this.newItem.showImage = false;
                            _this.newItem.IMAGE_PATH = _this.imgBasePath + _this.newItem.IMAGE;
                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: data.StatusMessage });
                            break;
                        }
                        case AtParEnums_2.StatusType.Warn: {
                            //this.showUploadImage = true;
                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case AtParEnums_2.StatusType.Error: {
                            // this.showUploadImage = true;
                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case AtParEnums_2.StatusType.Custom: {
                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                }, function (error) { return console.log(error); });
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    };
    //// end region for image upload functionality
    //item  activ
    ManageEquipmentItemsComponent.prototype.ItemActiveInActive = function (values, event) {
        if (event == true) {
            values.ITEM_INACTIVATED = true;
        }
        else {
            values.ITEM_INACTIVATED = false;
        }
    };
    ManageEquipmentItemsComponent.prototype.bindModelDataChange = function (event) {
        try {
            if (this.newItem.ITEM_ID == null || this.newItem.ITEM_ID == "" || this.newItem.ITEM_ID == undefined) {
                this.validationITEM_ID = 1;
            }
            else {
                if (this.validationITEM_ID == 1) {
                    this.validationITEM_ID = 1;
                }
                else {
                    this.validationITEM_ID = 0;
                }
            }
            if (this.selectedEqType == "F") {
                if ("txtQuantity" == event.TextBoxID.toString()) {
                    this.validationITEM_QTY = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
            }
            if ("txtItemDvalue" == event.TextBoxID.toString()) {
                this.validationITEM_ID = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtStoragelocation" == event.TextBoxID.toString()) {
                this.validationSTORAGE_LOCATION = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtDescription" == event.TextBoxID.toString()) {
                this.validationDESCRIPTION = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.selectedEqType == "F") {
                if (this.validationITEM_QTY == 0 && this.validationITEM_ID === 0 && this.validationSTORAGE_LOCATION === 0 && this.validationDESCRIPTION === 0) {
                    this.disableButton = false;
                }
                else {
                    this.disableButton = true;
                }
            }
            else {
                if (this.validationITEM_ID === 0 && this.validationSTORAGE_LOCATION === 0 && this.validationDESCRIPTION === 0) {
                    this.disableButton = false;
                }
                else {
                    this.disableButton = true;
                }
            }
            if (this.selectedEqType == "E") {
                if (this.updateLotSerialFlag == true) {
                    this.disablelotserailButton = false;
                    if (this.newItemLotSerial.SERIAL_NO == null || this.newItemLotSerial.SERIAL_NO == undefined || this.newItemLotSerial.SERIAL_NO == '') {
                        this.disablelotserailButton = true;
                    }
                    if (this.newItemLotSerial.LOT_NO == null || this.newItemLotSerial.LOT_NO == undefined || this.newItemLotSerial.LOT_NO == '') {
                        this.disablelotserailButton = true;
                    }
                    if (this.newItemLotSerial.USER_FIELD_1 == null || this.newItemLotSerial.USER_FIELD_1 == undefined || this.newItemLotSerial.USER_FIELD_1 == '') {
                        this.disablelotserailButton = true;
                    }
                    if (this.disablelotserailButton) {
                    }
                    else {
                        this.disablelotserailButton = false;
                    }
                }
                else if (this.addLotSerailFlag == true) {
                    if (this.showLotSerialFields == true || this.addnewitembutton == true) {
                        if ("txtSD1" == event.TextBoxID.toString()) {
                            this.validationSERIAL_NO = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("txtLD1" == event.TextBoxID.toString()) {
                            this.validationLOT_NO = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("txtUserf" == event.TextBoxID.toString()) {
                            this.validationUSER_FIELD_1 = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("txtAssetId" == event.TextBoxID.toString()) {
                            this.validationUSER_FIELD_1 = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("txtAssetId1" == event.TextBoxID.toString()) {
                            this.validationUSER_FIELD_1 = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if (this.validationSERIAL_NO == 0 && this.validationLOT_NO == 0 && this.validationUSER_FIELD_1 == 0) {
                            this.disablelotserailButton = false;
                        }
                        else {
                            this.disablelotserailButton = true;
                        }
                    }
                }
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    };
    ManageEquipmentItemsComponent.prototype.populateOwnerTypeDD = function () {
        this.lstOwnerType = [];
        this.lstOwnerType.push({ label: "Owned", value: "O" });
        this.lstOwnerType.push({ label: "Leased", value: "L" });
        this.lstOwnerType.push({ label: "Rented", value: "R" });
        //
    };
    ManageEquipmentItemsComponent.prototype.ddlvendorChanged = function () {
        //var data:any[] = this.selectedDeptIDs;
        // data.
        // this.newItem.DEPT_ID = this.selectedDeptIDs;
        this.newItem.VENDOR = this.selectedVendor;
    };
    ManageEquipmentItemsComponent.prototype.ddlOwnerTypeChanged = function () {
        this.newItem.OWNER_TYPE = this.selectedOwnerType;
    };
    ManageEquipmentItemsComponent.prototype.populateOwnerDD = function () {
        this.lstOwnerDetails = [];
        this.lstOwnerDetails.push({ label: "Select One", value: "Select One" });
        for (var k = 0; k < this.tkitDeptDetails.length; k++) {
            this.lstOwnerDetails.push({
                label: this.tkitDeptDetails[k].DESCRIPTION + " " + "(" + this.tkitDeptDetails[k].DEPT_ID + ")",
                value: this.tkitDeptDetails[k].DEPT_ID
            });
        }
    };
    ManageEquipmentItemsComponent.prototype.createLotSerials = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lotSerailValidations()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.updateLotSerials = function () {
        var _this = this;
        // this.lotSerailValidations();
        this.page = true;
        this.showLotSerialFields = false;
        this.showitemdetailsFields = true;
        this.showAddSerailbutton = true;
        var selectedrow = this.tkitEqItmLotSerailList.filter(function (x) { return x.SERIAL_NO == _this.newItemLotSerial.SERIAL_NO; })[0];
        if (this.newItemLotSerial.ASSET_IDPART1 == undefined || this.newItemLotSerial.ASSET_IDPART1 == null || this.newItemLotSerial.ASSET_IDPART1 == '')
            this.newItemLotSerial.ASSET_IDPART1 = '';
        this.newItemLotSerial.ASSET_ID = this.newItemLotSerial.ASSET_IDPART1 + this.newItemLotSerial.ASSET_ID;
        selectedrow.LOT_NO = this.newItemLotSerial.LOT_NO;
        selectedrow.ASSET_ID = this.newItemLotSerial.ASSET_ID;
        selectedrow.USER_FIELD_1 = this.newItemLotSerial.USER_FIELD_1;
        selectedrow.CHECKIN_DATE = this.newItemLotSerial.CHECKIN_DATE;
        selectedrow.SERVICE_DT_TIME = this.newItemLotSerial.SERVICE_DT_TIME;
        selectedrow.UPDATE_DATE = this.date1;
        selectedrow.UPDATE_USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
        selectedrow.ORG_GROUP_ID = this.selectedOrgGroupId;
        //this.newItemLotSerial = this.newItemLotSerial;
    };
    ManageEquipmentItemsComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    ManageEquipmentItemsComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    ManageEquipmentItemsComponent.prototype.datevalidation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.gobackFromItemdetails = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.page = true;
        this.growlMessage = [];
        this.showitemdetailsFields = false;
        this.showLotSerialFields = false;
        this.additemflag = false;
        this.edititemflag = false;
        this.addserailflag = false;
        this.editserailflag = false;
    };
    ManageEquipmentItemsComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    return ManageEquipmentItemsComponent;
}());
ManageEquipmentItemsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2144),
        providers: [HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, tkit_manage_equipment_items_service_1.ManageEquipmentItemsService, datatableservice_1.datatableservice]
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice,
        atpar_common_service_1.AtParCommonService,
        event_spinner_service_1.SpinnerService,
        AtParConstants_1.AtParConstants,
        tkit_manage_equipment_items_service_1.ManageEquipmentItemsService,
        HttpService_1.HttpService,
        http_1.Http])
], ManageEquipmentItemsComponent);
exports.ManageEquipmentItemsComponent = ManageEquipmentItemsComponent;


/***/ }),

/***/ 1651:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var datatableservice_1 = __webpack_require__(131);
var employee_1 = __webpack_require__(1372);
var TKIT_ITEM_TYPE_1 = __webpack_require__(1746);
var tkit_manage_equipment_type_service_1 = __webpack_require__(1870);
var AtParEnums_1 = __webpack_require__(14);
var HttpService_1 = __webpack_require__(12);
var AtParWebApiResponse_1 = __webpack_require__(1370);
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var AtParConstants_1 = __webpack_require__(31);
var datatable_1 = __webpack_require__(71);
var routepath_1 = __webpack_require__(70);
var leftbar_animation_service_1 = __webpack_require__(229);
var linq_es5_1 = __webpack_require__(115);
var ManageEquipmentTypeComponent = (function () {
    function ManageEquipmentTypeComponent(dataservice, mngEqTypeService, httpService, spinnerService, commonService, atParConstant, leftBarAnimationService) {
        this.dataservice = dataservice;
        this.mngEqTypeService = mngEqTypeService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.leftBarAnimationService = leftBarAnimationService;
        this.equipmentIDSearch = "";
        this.showAddButton = true;
        this.pop = false;
        this.table = true;
        this.form = false;
        this.editform = false;
        this.Title = "";
        this.bindSymbal = "";
        this.loading = true;
        this.minDateValue1 = new Date();
        this.showTextBox = false;
        this.showLable = false;
        this.departmentID = "";
        this.newItem = new TKIT_ITEM_TYPE_1.TKIT_ITEM_TYPE();
        this.growlMessage = [];
        this._deviceTokenEntry = [];
        this.auditSatus = "";
        this.checkvalue = false;
        this.lstOrgGroups = [];
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.orgGrpId = "";
        this.selectedOrgGroupId = "";
        this.selectedIndicator = "";
        this.equipmentType = "";
        this.showEquipmentTypelbl = false;
        this.showIndicatorlbl = false;
        this.Indicator = "";
        this.ven = new employee_1.Employee();
        this.departmentID = "dept1";
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    ManageEquipmentTypeComponent.prototype.fillIndicatorDD = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        return [4 /*yield*/, this.mngEqTypeService.getEqIndicators().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ddlIndicatorList = [];
                                        _this.ddlIndicatorList.push({ label: "Select Indicator", value: "Select Indicator" });
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.ddlIndicatorList.push({ label: data.DataList[i].EQ_INDICATOR + ' ( ' + data.DataList[i].EQ_DESC + ' ) ', value: data.DataList[i].EQ_INDICATOR });
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
                        ex_1 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentTypeComponent.prototype.addEquipment = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Equipment Type';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showTextBox = true;
        this.showLable = false;
        this.form = true;
        this.editform = false;
        this.table = false;
        this.pop = false;
        this.Title = "Save";
        this.bindSymbal = "floppy-o";
        this.showAddButton = false;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString();
        this.equipmentStatus = null;
        this.descStatus = null;
        this.ddlOrgGpStatus = null;
        this.ddlindicatorStatus = null;
        this.loading = true;
        this.newItem = new TKIT_ITEM_TYPE_1.TKIT_ITEM_TYPE();
        this.equipmentIDSearch = "";
        this.bindOrgGroups();
        this.fillIndicatorDD();
        this.showEquipmentTypelbl = false;
        this.showIndicatorlbl = false;
        this.selectedIndicator = "";
        this.selectedOrgGroupId = "";
    };
    ManageEquipmentTypeComponent.prototype.tbl = function () {
        this.form = false;
        this.editform = false;
        this.table = false;
        this.pop = false;
        this.table = true;
    };
    ManageEquipmentTypeComponent.prototype.edit = function (data) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Equipment Type';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showTextBox = false;
        this.showLable = true;
        this.form = true;
        this.table = false;
        this.showAddButton = false;
        this.showEquipmentTypelbl = true;
        this.showIndicatorlbl = true;
        this.Title = "Update";
        this.bindSymbal = "check";
        this.newItem = data;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString();
        this.loading = false;
        this.equipmentIDSearch = "";
        this.equipmentType = data.ITEM_TYPE;
        this.Indicator = data.ITEM_TYPE_INDICATOR;
        this.orgGrpId = data.ORG_GROUP_ID;
        this.blnShowOrgGroupLabel = true;
        this.blnShowOrgGroupDD = false;
        // this.bindOrgGroups();
        this.fillIndicatorDD();
    };
    ManageEquipmentTypeComponent.prototype.save = function () {
        this.editform = false;
    };
    ManageEquipmentTypeComponent.prototype.close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = false;
        this.table = true;
        this.pop = true;
        this.editform = false;
        this.table = false;
        this.showAddButton = true;
        this.newItem = new TKIT_ITEM_TYPE_1.TKIT_ITEM_TYPE();
        this.equipmentIDSearch = "";
        this.selectedOrgGroupId = "";
        this.selectedIndicator = "";
        this.growlMessage = [];
    };
    ManageEquipmentTypeComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    ManageEquipmentTypeComponent.prototype.ngOnInit = function () {
        this.table = false;
        this.showAddButton = true;
        this.newItem = new TKIT_ITEM_TYPE_1.TKIT_ITEM_TYPE();
        this.pageSize = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.menuCode = localStorage.getItem("menuCode") != null ? localStorage.getItem("menuCode") : 'mt_tkit_manage_equipment_type.aspx';
        this.appID = (AtParEnums_1.EnumApps.TrackIT).toString();
        this.checkAuditAllowed();
        this.fillSerachIndicatorDD();
        this.statusType = null;
    };
    ManageEquipmentTypeComponent.prototype.fillSerachIndicatorDD = function () {
        this.statusList = [];
        this.statusList.push({ label: 'All', value: null });
        this.statusList.push({ label: 'B (BOX)', value: 'B (BOX)' });
        this.statusList.push({ label: 'E (EQUIPMENT)', value: 'E (EQUIPMENT)' });
        this.statusList.push({ label: 'F (FURNITURE)', value: 'F (FURNITURE)' });
    };
    ManageEquipmentTypeComponent.prototype.ngOnDestroy = function () {
        this.equipmentIDSearch = null;
        this.mode = null;
        this.Title = null;
        this.bindSymbal = null;
        this.equipmentStatus = null;
        this.descStatus = null;
        this.ddlOrgGpStatus = null;
        this.ddlindicatorStatus = null;
        this.departmentID = null;
        this.newItem = null;
        this.growlMessage = null;
        this._deviceTokenEntry = null;
        this.lstDepts = null;
        this.pageSize = null;
        this.menuCode = null;
        this.appID = null;
        this.auditSatus = null;
        this.changeDeptStatus = null;
    };
    ManageEquipmentTypeComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        // this.blnStatusMsg = false;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupDD = false;
                                            ;
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + ' - ' + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.blnShowOrgGroupLabel = false;
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + ' - ' + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            break;
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
    ManageEquipmentTypeComponent.prototype.ddlOrgGpChange = function () {
        if (this.blnShowOrgGroupDD) {
            if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == null || this.selectedOrgGroupId == "") {
                this.ddlOrgGpStatus = 1;
            }
            else {
                this.ddlOrgGpStatus = 0;
            }
        }
        else if (this.blnShowOrgGroupLabel) {
            this.ddlOrgGpStatus = 0;
        }
        if (this.showIndicatorlbl) {
            this.ddlindicatorStatus = 0;
        }
        else {
            if (this.selectedIndicator == "Select Indicator" || this.selectedIndicator == undefined || this.selectedIndicator == null || this.selectedIndicator == "") {
                this.ddlindicatorStatus = 1;
            }
            else {
                this.ddlindicatorStatus = 0;
            }
        }
        if (this.equipmentStatus == 0 && this.descStatus == 0 && this.ddlindicatorStatus == 0 && this.ddlOrgGpStatus == 0 && (this.newItem.ITEM_TYPE != "" || this.newItem.ITEM_TYPE != undefined || this.newItem.ITEM_TYPE != null) && (this.newItem.ITEM_TYPE_DESCR != "" || this.newItem.ITEM_TYPE_DESCR != undefined || this.newItem.ITEM_TYPE_DESCR != null)) {
            this.loading = false;
        }
        else {
            this.loading = true;
        }
        this.newItem.ORG_GROUP_ID = this.selectedOrgGroupId;
    };
    // Add and Update button validations
    ManageEquipmentTypeComponent.prototype.bindModelDataChange = function (event) {
        try {
            if ("txtEquipment" == event.TextBoxID.toString()) {
                this.equipmentStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtDesc" == event.TextBoxID.toString()) {
                this.descStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            this.ddlOrgGpChange();
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString()) {
                if (this.equipmentStatus == 0 && this.descStatus == 0 && this.ddlindicatorStatus == 0 && this.ddlOrgGpStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString()) {
                if (this.descStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    };
    ManageEquipmentTypeComponent.prototype.BindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.table == true) {
                            this.dataTableComponent.reset();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.statusType = null;
                        this.table = false;
                        if (this.mode == "Edit") {
                            this.showAddButton = true;
                        }
                        this.spinnerService.start();
                        if (this.equipmentIDSearch == null || this.equipmentIDSearch == undefined || this.equipmentIDSearch === "") {
                            this.equipmentIDSearch = "";
                        }
                        return [4 /*yield*/, this.mngEqTypeService.getEquipmentTypes("", this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.equipmentIDSearch)
                                .catch(this.httpService.handleError)
                                .then(function (resp) {
                                var webresp = resp.json();
                                _this.spinnerService.stop();
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        _this.lstDepts = [];
                                        _this.lstDepts = webresp.DataList;
                                        _this.templstDepts = webresp.DataList;
                                        _this.table = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.table = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: "warn", summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.table = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: "info", summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.table = false;
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
                        exMsg_1 = _a.sent();
                        this.clientErrorMsg(exMsg_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentTypeComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var webresp_1, exMsg_2;
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
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp_1.StatusMessage });
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
                        exMsg_2 = _a.sent();
                        this.clientErrorMsg(exMsg_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentTypeComponent.prototype.saveOrUpdateReasonCode = function () {
        var _this = this;
        this.showAddButton = false;
        this.table = false;
        this.growlMessage = [];
        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            if (this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined) {
                this.table = false;
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                this.spinnerService.stop();
                return false;
            }
        }
        this.newItem.ITEM_TYPE_INDICATOR = this.selectedIndicator;
        this.newItem.ORG_GROUP_ID = this.orgGroupIDForDBUpdate;
        if (this.Title == "Save") {
            try {
                var webresp_2 = new AtParWebApiResponse_1.AtParWebApiResponse();
                this.spinnerService.start();
                this.mngEqTypeService.saveEqTypeData(this.newItem)
                    .catch(this.httpService.handleError).then(function (resp) {
                    webresp_2 = resp.json();
                    _this.spinnerService.stop();
                    switch (webresp_2.StatType) {
                        case AtParEnums_1.StatusType.Success: {
                            _this.growlMessage = [];
                            var msg = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", 'Equipment Type').replace("2%", _this.newItem.ITEM_TYPE);
                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                            _this.equipmentStatus = null;
                            _this.descStatus = null;
                            _this.ddlOrgGpStatus = null;
                            _this.ddlindicatorStatus = null;
                            _this.loading = true;
                            _this.selectedOrgGroupId = "";
                            _this.newItem = new TKIT_ITEM_TYPE_1.TKIT_ITEM_TYPE();
                            if (_this.blnShowOrgGroupDD) {
                                document.getElementById('txtddllstOrgGroups').focus();
                            }
                            else {
                                document.getElementById('txtEquipment').focus();
                            }
                            _this.selectedIndicator = "Select Indicator";
                            _this.selectedOrgGroupId = "";
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
                this.clientErrorMsg(exMsg);
            }
        }
        else {
            try {
                var webresp_3 = new AtParWebApiResponse_1.AtParWebApiResponse();
                this.spinnerService.start();
                this.mngEqTypeService.updateEqTypeData(this.newItem)
                    .catch(this.httpService.handleError).then(function (resp) {
                    webresp_3 = resp.json();
                    _this.spinnerService.stop();
                    switch (webresp_3.StatType) {
                        case AtParEnums_1.StatusType.Success: {
                            _this.growlMessage = [];
                            var msg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", 'Equipment Type').replace("2%", _this.newItem.ITEM_TYPE);
                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                            _this.loading = false;
                            //this.newItem = new TKIT_ITEM_TYPE();
                            document.getElementById('txtDesc').focus();
                            break;
                        }
                        case AtParEnums_1.StatusType.Error: {
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp_3.StatusMessage });
                            break;
                        }
                        case AtParEnums_1.StatusType.Warn: {
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp_3.StatusMessage });
                            break;
                        }
                        case AtParEnums_1.StatusType.Custom: {
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp_3.StatusMessage });
                            break;
                        }
                    }
                });
            }
            catch (exMsg) {
                this.clientErrorMsg(exMsg);
            }
        }
    };
    ManageEquipmentTypeComponent.prototype.filterStatus = function (value, field, mode) {
        if (value == null) {
            this.lstDepts = this.templstDepts;
        }
        else {
            this.lstDepts = linq_es5_1.asEnumerable(this.templstDepts).Where(function (x) { return x.ITEM_TYPE_INDICATOR_DESC === value; }).Select(function (x) { return x; }).ToArray();
        }
    };
    ManageEquipmentTypeComponent.prototype.ddlIndicatorChange = function () {
        this.newItem.ITEM_TYPE_INDICATOR = this.selectedIndicator;
        this.ddlOrgGpChange();
    };
    return ManageEquipmentTypeComponent;
}());
__decorate([
    core_1.ViewChild(datatable_1.DataTable),
    __metadata("design:type", datatable_1.DataTable)
], ManageEquipmentTypeComponent.prototype, "dataTableComponent", void 0);
ManageEquipmentTypeComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2145),
        providers: [datatableservice_1.datatableservice, tkit_manage_equipment_type_service_1.ManageEqTypeService, HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice,
        tkit_manage_equipment_type_service_1.ManageEqTypeService,
        HttpService_1.HttpService,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        AtParConstants_1.AtParConstants,
        leftbar_animation_service_1.LeftBarAnimationService])
], ManageEquipmentTypeComponent);
exports.ManageEquipmentTypeComponent = ManageEquipmentTypeComponent;


/***/ }),

/***/ 1652:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var tkit_manage_requestor_services_1 = __webpack_require__(1655);
var AtParConstants_1 = __webpack_require__(31);
var AtParEnums_1 = __webpack_require__(14);
var event_spinner_service_1 = __webpack_require__(24);
var router_1 = __webpack_require__(29);
var AtParSharedDataService_1 = __webpack_require__(167);
var datatable_1 = __webpack_require__(71);
var routepath_1 = __webpack_require__(70);
var TKIT_REQUESTOR_1 = __webpack_require__(1373);
var ManageRequestorHomeComponent = (function () {
    function ManageRequestorHomeComponent(manageRequestorServices, router, spinnerService, route, atParConstant, atParSharedDataService) {
        this.manageRequestorServices = manageRequestorServices;
        this.router = router;
        this.spinnerService = spinnerService;
        this.route = route;
        this.atParConstant = atParConstant;
        this.atParSharedDataService = atParSharedDataService;
        this.newItem = new TKIT_REQUESTOR_1.TKIT_REQUESTOR();
        this.statusType = "";
        this._deviceTokenEntry = [];
        this.msgs = [];
        this.isVisible = false;
        this.isUpdate = false;
        this.statusMesssage = "";
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    ManageRequestorHomeComponent.prototype.dataFilter = function (evtdata, filed, filterMatchMode) {
        return __awaiter(this, void 0, void 0, function () {
            var filterData, x, lstRequestorDetails;
            return __generator(this, function (_a) {
                this.requestorData.length = 0;
                if (this.statusType.toString() == "A") {
                    filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == 'A'; });
                }
                else if (this.statusType.toString() == "I") {
                    filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == 'I'; });
                }
                else {
                    filterData = this.mainlstGridData;
                }
                if (filterData != null) {
                    for (x = 0; x < filterData.length; x++) {
                        lstRequestorDetails = new TKIT_REQUESTOR_1.TKIT_REQUESTOR();
                        lstRequestorDetails.REQUESTOR_ID = filterData[x].REQUESTOR_ID;
                        lstRequestorDetails.FIRST_NAME = filterData[x].FIRST_NAME;
                        lstRequestorDetails.LAST_NAME = filterData[x].LAST_NAME;
                        lstRequestorDetails.MIDDLE_INIT = filterData[x].MIDDLE_INIT;
                        lstRequestorDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                        lstRequestorDetails.STATUS = filterData[x].STATUS;
                        if (lstRequestorDetails.STATUS == 'A') {
                            lstRequestorDetails.checkStatus = true;
                        }
                        else {
                            lstRequestorDetails.checkStatus = false;
                        }
                        this.requestorData.push(lstRequestorDetails);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    ManageRequestorHomeComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusList = [];
                        this.statusList.push({ label: 'All', value: "" });
                        this.statusList.push({ label: 'Active', value: 'A' });
                        this.statusList.push({ label: 'InActive', value: 'I' });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (this.atParSharedDataService.storage)
                            this.mode = this.atParSharedDataService.storage.mode;
                        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.msgs = [];
                        this.mainlstGridData = new Array();
                        if (!(this.mode != undefined && this.mode == (AtParEnums_1.ModeEnum.List).toString())) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.BindGrid()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.pazeSize = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        if (this.atParSharedDataService.storage != undefined && this.atParSharedDataService.storage.summary != undefined) {
                            this.msgs.push(this.atParSharedDataService.storage);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ManageRequestorHomeComponent.prototype.BindGrid = function () {
        var _this = this;
        try {
            this.msgs = [];
            this.statusType = "";
            this.mainlstGridData = [];
            this.requestorData = [];
            this.isVisible = false;
            if (this.dataTableComponent != null) {
                this.dataTableComponent.reset();
            }
            this.spinnerService.start();
            if (this.requestorSearch == undefined || this.requestorSearch == null ||
                this.requestorSearch.trim().length == 0) {
                this.requestorSearch = '';
            }
            this.manageRequestorServices.getAllRequestors(this.requestorSearch, this._deviceTokenEntry)
                .forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_1.StatusType.Success:
                        if (_this.isUpdate == false) {
                            _this.msgs = [];
                        }
                        _this.msgs = [];
                        for (var x = 0; x < resp.DataList.length; x++) {
                            if (resp.DataList[x].STATUS == 'A') {
                                resp.DataList[x].checkStatus = true;
                            }
                            else {
                                resp.DataList[x].checkStatus = false;
                            }
                        }
                        _this.requestorData = resp.DataList;
                        for (var x = 0; x < _this.requestorData.length; x++) {
                            var requestorDataDetails = new TKIT_REQUESTOR_1.TKIT_REQUESTOR();
                            requestorDataDetails.REQUESTOR_ID = _this.requestorData[x].REQUESTOR_ID;
                            requestorDataDetails.FIRST_NAME = _this.requestorData[x].FIRST_NAME;
                            requestorDataDetails.LAST_NAME = _this.requestorData[x].LAST_NAME;
                            requestorDataDetails.MIDDLE_INIT = _this.requestorData[x].MIDDLE_INIT;
                            requestorDataDetails.ORG_GROUP_ID = _this.requestorData[x].ORG_GROUP_ID;
                            requestorDataDetails.STATUS = _this.requestorData[x].STATUS;
                            requestorDataDetails.checkStatus = _this.requestorData[x].checkStatus;
                            _this.mainlstGridData.push(requestorDataDetails);
                        }
                        _this.spinnerService.stop();
                        if (_this.requestorData != null && _this.requestorData.length > 0) {
                            _this.isVisible = true;
                        }
                        break;
                    case AtParEnums_1.StatusType.Error:
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        _this.spinnerService.stop();
                        _this.isVisible = false;
                        break;
                    case AtParEnums_1.StatusType.Warn:
                        _this.msgs = [];
                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        _this.spinnerService.stop();
                        _this.isVisible = false;
                        break;
                }
            });
            this.isUpdate = false;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindGrid");
        }
    };
    ManageRequestorHomeComponent.prototype.addRequestor = function () {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Add Requestor';
            this.breadCrumbMenu.IS_DIV = false;
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.atParSharedDataService.setStorage({ "mode": AtParEnums_1.ModeEnum.Add });
            var navigationExtras = {
                queryParams: {
                    "mode": AtParEnums_1.ModeEnum.Add,
                },
                relativeTo: this.route
            };
            this.router.navigate(['addormodify'], navigationExtras);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "editRequestor");
        }
    };
    ManageRequestorHomeComponent.prototype.editRequestor = function (requstorData) {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Requestor';
            this.breadCrumbMenu.IS_DIV = false;
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.atParSharedDataService.setStorage({ "requestorID": requstorData.REQUESTOR_ID, "mode": AtParEnums_1.ModeEnum.Edit });
            var navigationExtras = {
                queryParams: {
                    "mode": AtParEnums_1.ModeEnum.Add,
                },
                relativeTo: this.route
            };
            this.router.navigate(['addormodify'], navigationExtras);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "editRequestor");
        }
    };
    ManageRequestorHomeComponent.prototype.updateRequestorStatus = function (requstorData) {
        var _this = this;
        this.spinnerService.start();
        this.manageRequestorServices.updateRequestorStatus(requstorData.REQUESTOR_ID, requstorData.STATUS, this._deviceTokenEntry).forEach(function (resp) {
            _this.msgs = [];
            switch (resp.StatType) {
                case AtParEnums_1.StatusType.Success:
                    var filterData = [];
                    _this.requestorData = [];
                    var matchedrecord = _this.mainlstGridData.filter(function (x) { return x.REQUESTOR_ID == requstorData.REQUESTOR_ID; });
                    matchedrecord[0].STATUS = (requstorData.STATUS == 'A' ? "I" : "A");
                    console.log(_this.mainlstGridData);
                    if (_this.statusType.toString() == "A") {
                        filterData = _this.mainlstGridData.filter(function (x) { return x.STATUS == 'A'; });
                    }
                    else if (_this.statusType.toString() == "I") {
                        filterData = _this.mainlstGridData.filter(function (x) { return x.STATUS == 'I'; });
                    }
                    else {
                        filterData = _this.mainlstGridData;
                    }
                    if (filterData != null) {
                        for (var x = 0; x < filterData.length; x++) {
                            var lstRequestorDetails = new TKIT_REQUESTOR_1.TKIT_REQUESTOR();
                            lstRequestorDetails.REQUESTOR_ID = filterData[x].REQUESTOR_ID;
                            lstRequestorDetails.FIRST_NAME = filterData[x].FIRST_NAME;
                            lstRequestorDetails.LAST_NAME = filterData[x].LAST_NAME;
                            lstRequestorDetails.MIDDLE_INIT = filterData[x].MIDDLE_INIT;
                            lstRequestorDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                            lstRequestorDetails.STATUS = filterData[x].STATUS;
                            if (filterData[x].STATUS == 'A') {
                                lstRequestorDetails.checkStatus = true;
                            }
                            else {
                                lstRequestorDetails.checkStatus = false;
                            }
                            _this.requestorData.push(lstRequestorDetails);
                        }
                    }
                    _this.statusMesssage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Requestor").replace("2%", requstorData.REQUESTOR_ID);
                    _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                    _this.spinnerService.stop();
                    break;
                case AtParEnums_1.StatusType.Error:
                    _this.statusMesssage = resp.StatusMessage;
                    _this.msgs = [];
                    _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                    _this.spinnerService.stop();
                    break;
                case AtParEnums_1.StatusType.Warn:
                    _this.statusMesssage = resp.StatusMessage;
                    _this.msgs = [];
                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                    _this.spinnerService.stop();
                    break;
            }
        });
    };
    ManageRequestorHomeComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    /**
  * delete all the values from variables
  */
    ManageRequestorHomeComponent.prototype.ngOnDestroy = function () {
        this._deviceTokenEntry = [];
        this.msgs = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.requestorData = [];
        this.isVisible = false;
    };
    return ManageRequestorHomeComponent;
}());
__decorate([
    core_1.ViewChild(datatable_1.DataTable),
    __metadata("design:type", datatable_1.DataTable)
], ManageRequestorHomeComponent.prototype, "dataTableComponent", void 0);
ManageRequestorHomeComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2147),
        providers: [tkit_manage_requestor_services_1.ManageRequestorServices, AtParConstants_1.AtParConstants]
    }),
    __metadata("design:paramtypes", [tkit_manage_requestor_services_1.ManageRequestorServices,
        router_1.Router,
        event_spinner_service_1.SpinnerService,
        router_1.ActivatedRoute,
        AtParConstants_1.AtParConstants,
        AtParSharedDataService_1.AtParSharedDataService])
], ManageRequestorHomeComponent);
exports.ManageRequestorHomeComponent = ManageRequestorHomeComponent;


/***/ }),

/***/ 1653:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var tkit_manage_requestor_services_1 = __webpack_require__(1655);
var AtParConstants_1 = __webpack_require__(31);
var AtParEnums_1 = __webpack_require__(14);
var event_spinner_service_1 = __webpack_require__(24);
var http_1 = __webpack_require__(38);
var HttpService_1 = __webpack_require__(12);
var router_1 = __webpack_require__(29);
var AtParSharedDataService_1 = __webpack_require__(167);
var routepath_1 = __webpack_require__(70);
var TKIT_REQUESTOR_1 = __webpack_require__(1373);
var CryptoJS = __webpack_require__(328);
var ManageRequestorModifyComponent = (function () {
    function ManageRequestorModifyComponent(manageRequestorServices, router, spinnerService, route, atParConstant, atParSharedDataService, http, httpService) {
        this.manageRequestorServices = manageRequestorServices;
        this.router = router;
        this.spinnerService = spinnerService;
        this.route = route;
        this.atParConstant = atParConstant;
        this.atParSharedDataService = atParSharedDataService;
        this.http = http;
        this.httpService = httpService;
        this.newItem = new TKIT_REQUESTOR_1.TKIT_REQUESTOR();
        this.lstDepartments = [];
        this.lstLocations = [];
        this.statusType = "";
        this._deviceTokenEntry = [];
        this.msgs = [];
        this.isVisible = false;
        this.isUpdate = false;
        this.loading = true;
        this.showLable = false;
        this.showTextBox = false;
        this.orgGroupData = [];
        this.statusMesssage = "";
        this.Title = "";
        this.visiblePassword = false;
        this.trackItUserSelectedFile = "";
        this.showUploadImage = false;
        this.ddRecordsPerPage = [];
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    ManageRequestorModifyComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.getTrackITAllDepartments();
                        this.getLocations();
                        this.getOrgGroupList();
                        this.getRecordsPerPageddData();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        this.mode = this.atParSharedDataService.storage.mode;
                        if (!(this.mode == (AtParEnums_1.ModeEnum.Add).toString())) return [3 /*break*/, 2];
                        this.showLable = false;
                        this.showTextBox = true;
                        this.newItem = new TKIT_REQUESTOR_1.TKIT_REQUESTOR();
                        this.Title = "Save";
                        this.bindSymbal = "floppy-o";
                        this.newItem.checkStatus = true;
                        this.newItem.STATUS = 'A';
                        this.newItem.RECORDS_PER_PAGE = 10;
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(this.mode == (AtParEnums_1.ModeEnum.Edit).toString())) return [3 /*break*/, 4];
                        this.showLable = true;
                        this.bindSymbal = "check";
                        this.isEditMode = true;
                        this.loading = false;
                        this.showTextBox = false;
                        this.Title = "Update Requestor";
                        this.requestorID = this.atParSharedDataService.storage.requestorID;
                        if (!(this.requestorID != undefined && this.requestorID != null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getRequestorDetails()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ManageRequestorModifyComponent.prototype.getRecordsPerPageddData = function () {
        try {
            for (var i = 10; i <= 100;) {
                this.ddRecordsPerPage.push({ label: i.toString(), value: i.toString() });
                i += 10;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getRecordsPerPageddData");
        }
    };
    ManageRequestorModifyComponent.prototype.onFocusPassword = function () {
        try {
            if (this.newItem.PASSWORD == "undefined") {
                this.visiblePassword = !this.visiblePassword;
            }
            else {
                this.visiblePassword = true;
            }
            this.activeLblPassword = this.visiblePassword ? 'input-disturbed' : 'hide-class';
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onFocusPassword");
        }
    };
    ManageRequestorModifyComponent.prototype.locationChange = function () {
        if (this.newItem.LOCATION_ID != undefined && this.newItem.LOCATION_ID != null && this.newItem.LOCATION_ID != "") {
            this.deliverLocationtatus = 0;
        }
        else {
            this.deliverLocationtatus = 1;
        }
    };
    ManageRequestorModifyComponent.prototype.checkPswdValidation = function () {
        if (this.newItem.PASSWORD == "") {
            this.loading = true;
        }
        else {
            this.loading = false;
        }
    };
    ManageRequestorModifyComponent.prototype.bindModelDataChange = function (event) {
        try {
            if (this.Title == "Update Requestor") {
                this.requestorStatus = 0;
                this.firstNameStatus = 0;
                this.lastNameStatus = 0;
                this.recordsPerPageStatus = 0;
                this.defaultRptDurationStatus = 0;
            }
            if ("txtRequetorId" == event.TextBoxID.toString()) {
                this.requestorStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtFirstName" == event.TextBoxID.toString()) {
                this.firstNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtLastName" == event.TextBoxID.toString()) {
                this.lastNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtMiddleName" == event.TextBoxID.toString()) {
                this.middleNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtEmail" == event.TextBoxID.toString()) {
                this.emailStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtPhone" == event.TextBoxID.toString()) {
                this.phoneStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtFax" == event.TextBoxID.toString()) {
                this.faxStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtPager" == event.TextBoxID.toString()) {
                this.pagerStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("ddlddRecordsPerPage" == event.TextBoxID.toString()) {
                this.recordsPerPageStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtDefaultRptDuration" == event.TextBoxID.toString()) {
                this.defaultRptDurationStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.newItem.PASSWORD == "") {
                this.loading = true;
            }
            else {
                this.loading = false;
            }
            this.btnEnableDisable();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindModelDataChange");
        }
    };
    ManageRequestorModifyComponent.prototype.btnEnableDisable = function () {
        if (this.Title == "Update Requestor") {
            this.requestorStatus = 0;
            this.firstNameStatus = 0;
            this.lastNameStatus = 0;
            this.recordsPerPageStatus = 0;
            this.defaultRptDurationStatus = 0;
        }
        if (this.requestorStatus == 0 && this.newItem.REQUESTOR_ID != "" && this.newItem.REQUESTOR_ID != null && this.newItem.REQUESTOR_ID != undefined
            && this.newItem.PASSWORD != undefined && this.newItem.PASSWORD != null && this.newItem.PASSWORD != ""
            && this.firstNameStatus == 0 && this.newItem.FIRST_NAME != undefined && this.newItem.FIRST_NAME != null && this.newItem.FIRST_NAME != ""
            && this.lastNameStatus == 0 && this.newItem.LAST_NAME !== undefined && this.newItem.LAST_NAME != null && this.newItem.LAST_NAME !== ""
            && this.defaultRptDurationStatus == 0 && this.newItem.DEFAULT_REPORT_DURATION != undefined && this.newItem.DEFAULT_REPORT_DURATION != null && this.newItem.DEFAULT_REPORT_DURATION != 0
            && this.newItem.ORG_GROUP_ID != undefined && this.newItem.ORG_GROUP_ID != null && this.newItem.ORG_GROUP_ID != "Select One"
            && this.lstSelectedDepartments != undefined && this.lstSelectedDepartments != null && this.lstSelectedDepartments.length > 0) {
            if ((this.middleNameStatus == undefined || this.middleNameStatus == 0) &&
                (this.phoneStatus == undefined || this.phoneStatus == 0) &&
                (this.emailStatus == undefined || this.emailStatus == 0) &&
                (this.faxStatus == undefined || this.faxStatus == 0) &&
                (this.pagerStatus == undefined || this.pagerStatus == 0)) {
                this.loading = false;
            }
            else {
                this.loading = true;
            }
        }
        else {
            this.loading = true;
        }
    };
    ManageRequestorModifyComponent.prototype.getTrackITAllDepartments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageRequestorServices.getTKITAllDepts('', 'A', this._deviceTokenEntry)
                                .forEach(function (resp) {
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (_this.isUpdate == false) {
                                            _this.msgs = [];
                                        }
                                        _this.msgs = [];
                                        _this.departmentsData = resp.DataList;
                                        _this.lstDepartments = [];
                                        for (var i = 0; i < _this.departmentsData.length; i++) {
                                            _this.lstDepartments.push({ label: _this.departmentsData[i].DESCRIPTION + " - " + _this.departmentsData[i].DEPT_ID, value: _this.departmentsData[i].DEPT_ID });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
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
    ManageRequestorModifyComponent.prototype.getLocations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageRequestorServices.getLocations(this._deviceTokenEntry)
                                .forEach(function (resp) {
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (_this.isUpdate == false) {
                                            _this.msgs = [];
                                        }
                                        _this.msgs = [];
                                        _this.lstLocations = [];
                                        _this.locationData = resp.DataList;
                                        _this.lstLocations.push({ label: "Select Deliver Location", value: "" });
                                        for (var i = 0; i < _this.locationData.length; i++) {
                                            _this.lstLocations.push({ label: _this.locationData[i].LOCATION_NAME + " (" + _this.locationData[i].LOCATION_ID + ")", value: _this.locationData[i].LOCATION_ID });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
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
    ManageRequestorModifyComponent.prototype.getOrgGroupList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageRequestorServices.getOrgGroupList(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .forEach(function (resp) {
                                _this.msgs = [];
                                _this.orgGroupData = [];
                                _this.orgGroupData.push({ label: 'Select One', value: 'Select One' });
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupList = [];
                                        _this.orgGroupList = resp.DataList;
                                        if (_this.orgGroupList.length) {
                                            for (var i = 0; i < _this.orgGroupList.length; i++) {
                                                _this.orgGroupData.push({ label: _this.orgGroupList[i].ORG_GROUP_ID + '-' + _this.orgGroupList[i].ORG_GROUP_NAME, value: _this.orgGroupList[i].ORG_GROUP_ID });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.statusMesssage = resp.StatusMessage;
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.statusMesssage = resp.StatusMessage;
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
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
    ManageRequestorModifyComponent.prototype.getRequestorDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageRequestorServices.getRequestorDetails(this.requestorID, this._deviceTokenEntry)
                                .forEach(function (resp) {
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (_this.isUpdate == false) {
                                            _this.msgs = [];
                                        }
                                        _this.msgs = [];
                                        _this.newItem = resp.DataDictionary.Requestors[0];
                                        if (_this.newItem.STATUS == 'A') {
                                            _this.newItem.checkStatus = true;
                                        }
                                        else {
                                            _this.newItem.checkStatus = false;
                                        }
                                        setTimeout(function () {
                                            _this.lstSelectedDepartments = [];
                                            _this.lstSelectedDepartments = resp.DataDictionary.Departments;
                                        }, 300);
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
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
    ManageRequestorModifyComponent.prototype.createOrModifyRequestor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var key, iv, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (this.newItem.checkStatus == false) {
                            this.newItem.STATUS = 'I';
                        }
                        else {
                            this.newItem.STATUS = 'A';
                        }
                        key = CryptoJS.enc.Utf8.parse('8080808080808080');
                        iv = CryptoJS.enc.Utf8.parse('8080808080808080');
                        this.encryptedCurrentPwd = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.newItem.PASSWORD), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                        if (!(this.mode == (AtParEnums_1.ModeEnum.Add).toString())) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.manageRequestorServices.saveRequestorDetails(this.newItem, this.lstSelectedDepartments, this.encryptedCurrentPwd, this._deviceTokenEntry).forEach(function (resp) {
                                _this.msgs = [];
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.statusMesssage = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Requestor").replace("2%", _this.newItem.REQUESTOR_ID);
                                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                                        _this.newItem = new TKIT_REQUESTOR_1.TKIT_REQUESTOR();
                                        _this.seletedOrgGroupId = "";
                                        _this.lstSelectedDepartments = [];
                                        _this.newItem.LOCATION_ID = "";
                                        document.getElementById('txtRequetorId').focus();
                                        _this.loading = true;
                                        _this.newItem.STATUS = 'A';
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMesssage = resp.StatusMessage;
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMesssage = resp.StatusMessage;
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(this.mode == (AtParEnums_1.ModeEnum.Edit).toString())) return [3 /*break*/, 4];
                        this.spinnerService.start();
                        this.newItem.checkStatus == true ? this.newItem.STATUS = 'A' : this.newItem.STATUS = 'I';
                        return [4 /*yield*/, this.manageRequestorServices.updateRequestorDetails(this.newItem, this.lstSelectedDepartments, this.encryptedCurrentPwd, this._deviceTokenEntry).forEach(function (resp) {
                                _this.msgs = [];
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.statusMesssage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Requestor").replace("2%", _this.newItem.REQUESTOR_ID);
                                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                                        document.getElementById('txtPassword').focus();
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMesssage = resp.StatusMessage;
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMesssage = resp.StatusMessage;
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
                        this.clientErrorMsg(ex_2, "ngOnInit");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ManageRequestorModifyComponent.prototype.fileUpload = function (event) {
        var _this = this;
        try {
            this.spinnerService.start();
            var fileList = event.target.files;
            this.trackItUserSelectedFile = event.target.files[0].name;
            var formData = new FormData();
            if (fileList.length > 0) {
                var file = fileList[0];
                this.files = file.name;
                var listData = [];
                var obj = { FileName: file.name, File: file };
                listData.push(obj);
                formData.append('uploadFile', file, file.name);
            }
            var headers = new http_1.Headers();
            headers.append('Authorization', 'bearer');
            headers.append('enctype', 'multipart/form-data');
            var options = new http_1.RequestOptions({ headers: headers });
            var apiUrl = this.httpService.BaseUrl + "/api/CommonTrackIT/SaveTrackItUserProfileImage";
            this.http.post(apiUrl, formData, options).toPromise()
                .then(function (res) {
                _this.msgs = [];
                _this.spinnerService.stop();
                var data = res.json();
                switch (data.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        _this.files = '';
                        _this.showUploadImage = false;
                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: data.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Warn: {
                        _this.showUploadImage = true;
                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Error: {
                        _this.showUploadImage = true;
                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Custom: {
                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
            }, function (error) { return console.log(error); });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "fileUpload");
        }
    };
    ManageRequestorModifyComponent.prototype.navigateToRequestorterHome = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        var navigationExtras = {
            relativeTo: this.route
        };
        this.router.navigate(['../'], navigationExtras);
    };
    ManageRequestorModifyComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    /**
  * delete all the values from variables
  */
    ManageRequestorModifyComponent.prototype.ngOnDestroy = function () {
        this._deviceTokenEntry = [];
        this.msgs = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.requestorData = [];
    };
    return ManageRequestorModifyComponent;
}());
ManageRequestorModifyComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2146),
        providers: [tkit_manage_requestor_services_1.ManageRequestorServices, AtParConstants_1.AtParConstants]
    }),
    __metadata("design:paramtypes", [tkit_manage_requestor_services_1.ManageRequestorServices,
        router_1.Router,
        event_spinner_service_1.SpinnerService,
        router_1.ActivatedRoute,
        AtParConstants_1.AtParConstants,
        AtParSharedDataService_1.AtParSharedDataService,
        http_1.Http,
        HttpService_1.HttpService])
], ManageRequestorModifyComponent);
exports.ManageRequestorModifyComponent = ManageRequestorModifyComponent;


/***/ }),

/***/ 1654:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ManageRequestorComponent = (function () {
    function ManageRequestorComponent() {
    }
    return ManageRequestorComponent;
}());
ManageRequestorComponent = __decorate([
    core_1.Component({
        template: '<router-outlet></router-outlet>'
    })
], ManageRequestorComponent);
exports.ManageRequestorComponent = ManageRequestorComponent;


/***/ }),

/***/ 1655:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
__webpack_require__(32);
var Rx_1 = __webpack_require__(37);
var HttpService_1 = __webpack_require__(12);
var ManageRequestorServices = (function () {
    function ManageRequestorServices(httpservice) {
        this.httpservice = httpservice;
    }
    ManageRequestorServices.prototype.getTKITAllDepts = function (deptID, status, deviceTokenEntry) {
        return this.httpservice.get({
            apiMethod: "/api/ManageRequestor/GetTKITAllDepts",
            params: {
                "deptID": deptID,
                "status": status,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageRequestorServices.prototype.getAllRequestors = function (search, devicetokenEntry) {
        return this.httpservice.get({
            apiMethod: "/api/ManageRequestor/GetAllRequestors",
            params: {
                "search": search,
                "devicetokenEntry": devicetokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageRequestorServices.prototype.getRequestorDetails = function (requestorID, devicetokenEntry) {
        return this.httpservice.get({
            apiMethod: "/api/ManageRequestor/GetRequestorDetails",
            params: {
                "requestorID": requestorID,
                "deviceTokenEntry": devicetokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageRequestorServices.prototype.getLocations = function (devicetokenEntry) {
        return this.httpservice.get({
            apiMethod: "/api/CommonTrackIT/GetLocations",
            params: {
                "deviceTokenEntry": devicetokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageRequestorServices.prototype.getOrgGroupList = function (userId) {
        return this.httpservice.get({
            apiMethod: "/api/Common/GetOrgDetails",
            params: {
                "userId": userId
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageRequestorServices.prototype.saveRequestorDetails = function (requestor, lstRequestorDepts, Password, deviceTokenEntry) {
        var requestorDetails = { "requestor": requestor, "lstRequestorDepts": lstRequestorDepts };
        return this.httpservice.create({
            apiMethod: "/api/ManageRequestor/SaveRequestorDetails",
            formData: requestorDetails,
            params: {
                "pPassword": Password,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageRequestorServices.prototype.updateRequestorDetails = function (requestor, lstRequestorDepts, Password, deviceTokenEntry) {
        var requestorDetails = { "requestor": requestor, "lstRequestorDepts": lstRequestorDepts };
        return this.httpservice.update({
            apiMethod: '/api/ManageRequestor/UpdateRequestorDetails',
            formData: requestorDetails,
            params: {
                "pPassword": Password,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ManageRequestorServices.prototype.updateRequestorStatus = function (requestorID, status, deviceTokenEntry) {
        if (status == 'A') {
            return this.httpservice.update({
                apiMethod: '/api/ManageRequestor/UpdateRequestorStatus',
                params: {
                    "requestorID": requestorID,
                    "status": "I",
                    "deviceTokenEntry": deviceTokenEntry
                }
            }).map(function (res) { return res.json(); }).catch(this.handleError);
        }
        else {
            return this.httpservice.update({
                apiMethod: '/api/ManageRequestor/UpdateRequestorStatus',
                params: {
                    "requestorID": requestorID,
                    "status": "A",
                    "deviceTokenEntry": deviceTokenEntry
                }
            }).map(function (res) { return res.json(); }).catch(this.handleError);
        }
    };
    ManageRequestorServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return ManageRequestorServices;
}());
ManageRequestorServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], ManageRequestorServices);
exports.ManageRequestorServices = ManageRequestorServices;


/***/ }),

/***/ 1656:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var NewItemAuditReportComponent = (function () {
    function NewItemAuditReportComponent() {
    }
    return NewItemAuditReportComponent;
}());
NewItemAuditReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2148)
    })
], NewItemAuditReportComponent);
exports.NewItemAuditReportComponent = NewItemAuditReportComponent;


/***/ }),

/***/ 1657:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var datatableservice_1 = __webpack_require__(131);
var employee_1 = __webpack_require__(1372);
var TKIT_REASON_CODES_1 = __webpack_require__(1747);
var tkit_setup_reason_codes_service_1 = __webpack_require__(1871);
var AtParEnums_1 = __webpack_require__(14);
var HttpService_1 = __webpack_require__(12);
var AtParWebApiResponse_1 = __webpack_require__(1370);
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var AtParConstants_1 = __webpack_require__(31);
var datatable_1 = __webpack_require__(71);
var routepath_1 = __webpack_require__(70);
var leftbar_animation_service_1 = __webpack_require__(229);
var SetupReasonCodesComponent = (function () {
    function SetupReasonCodesComponent(dataservice, reasonCodeService, httpService, spinnerService, commonService, atParConstant, leftBarAnimationService) {
        this.dataservice = dataservice;
        this.reasonCodeService = reasonCodeService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.leftBarAnimationService = leftBarAnimationService;
        this.reasonCodeSearch = "";
        this.showAddButton = true;
        this.pop = false;
        this.table = true;
        this.form = false;
        this.editform = false;
        this.Title = "";
        this.bindSymbal = "";
        this.loading = true;
        this.showTextBox = false;
        this.showLable = false;
        this.newItem = new TKIT_REASON_CODES_1.TKIT_REASON_CODES();
        this.growlMessage = [];
        this._deviceTokenEntry = [];
        this.ddlStatusType = [];
        this.auditSatus = "";
        this.lstOrgGroups = [];
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.orgGrpId = "";
        this.selectedOrgGroupId = "";
        this.breadCrumbMenu = new routepath_1.Menus();
        this.ven = new employee_1.Employee();
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    SetupReasonCodesComponent.prototype.addReasonCode = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Reason Code';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showTextBox = true;
        this.showLable = false;
        this.form = true;
        this.editform = false;
        this.table = false;
        this.pop = false;
        this.Title = "Save";
        this.bindSymbal = "floppy-o";
        this.showAddButton = false;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString();
        this.reasonCodeStatus = null;
        this.descStatus = null;
        this.newItem = new TKIT_REASON_CODES_1.TKIT_REASON_CODES();
        this.reasonCodeSearch = "";
        //this.blnShowOrgGroupDD = true;
        //this.blnShowOrgGroupLabel = false;
        this.loading = true;
        this.bindOrgGroups();
        this.ddlOrgIDStatus = null;
    };
    SetupReasonCodesComponent.prototype.tbl = function () {
        this.form = false;
        this.editform = false;
        this.table = false;
        this.pop = false;
        this.table = true;
    };
    SetupReasonCodesComponent.prototype.edit = function (data) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Reason Code';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showTextBox = false;
        this.showLable = true;
        this.form = true;
        this.table = false;
        this.showAddButton = false;
        this.Title = "Update";
        this.bindSymbal = "check";
        this.newItem = data;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString();
        this.loading = false;
        this.reasonCodeSearch = "";
        this.orgGrpId = data.ORG_GROUP_ID;
        this.blnShowOrgGroupDD = false;
        this.blnShowOrgGroupLabel = true;
    };
    SetupReasonCodesComponent.prototype.save = function () {
        this.editform = false;
    };
    SetupReasonCodesComponent.prototype.close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = false;
        this.table = true;
        this.pop = true;
        this.editform = false;
        this.table = false;
        this.showAddButton = true;
        this.newItem = new TKIT_REASON_CODES_1.TKIT_REASON_CODES();
        this.reasonCodeSearch = "";
        this.selectedOrgGroupId = "";
        this.growlMessage = [];
    };
    SetupReasonCodesComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    SetupReasonCodesComponent.prototype.ngOnInit = function () {
        this.table = false;
        this.showAddButton = true;
        this.ddlStatusType.push({ label: 'All', value: "" });
        // Negative binding due to SQL Server db.  0 - active and 1 - inactive
        this.ddlStatusType.push({ label: 'Active', value: true });
        this.ddlStatusType.push({ label: 'Inactive', value: false });
        this.pageSize = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.menuCode = localStorage.getItem("menuCode") != null ? localStorage.getItem("menuCode") : 'mt_tkit_setup_reason_codes.aspx';
        this.appID = (AtParEnums_1.EnumApps.TrackIT).toString();
        this.mainlstGridData = new Array();
        this.checkAuditAllowed();
        this.statusType = "";
        //this.bindOrgGroups();
    };
    SetupReasonCodesComponent.prototype.ngOnDestroy = function () {
        this.reasonCodeSearch = null;
        this.mode = null;
        this.Title = null;
        this.bindSymbal = null;
        this.reasonCodeStatus = null;
        this.descStatus = null;
        this.newItem = null;
        this.growlMessage = null;
        this._deviceTokenEntry = null;
        this.lstReasonCodes = null;
        this.ddlStatusType = null;
        this.pageSize = null;
        this.menuCode = null;
        this.appID = null;
        this.auditSatus = null;
    };
    // Add and Update button validations
    SetupReasonCodesComponent.prototype.bindModelDataChange = function (event) {
        try {
            if ("txtReasonCode" == event.TextBoxID.toString()) {
                this.reasonCodeStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtDesc" == event.TextBoxID.toString()) {
                this.descStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.Title == "Update") {
                this.reasonCodeStatus = 0;
            }
            this.ddlOrgIDChanged();
            if (this.reasonCodeStatus == 0 && this.ddlOrgIDStatus == 0) {
                if (this.descStatus == null || this.descStatus == undefined || this.descStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
            else {
                this.loading = true;
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    };
    SetupReasonCodesComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        this.lstOrgGroups = [];
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        // this.blnStatusMsg = false;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.blnShowOrgGroupDD = false;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + ' - ' + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.blnShowOrgGroupLabel = false;
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + ' - ' + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            break;
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
                        ex_1 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupReasonCodesComponent.prototype.BindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.mainlstGridData = [];
                        this.lstReasonCodes = [];
                        this.statusType = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.table = false;
                        if (this.mode == "Edit") {
                            this.showAddButton = true;
                        }
                        this.spinnerService.start();
                        if (this.reasonCodeSearch == null || this.reasonCodeSearch == undefined || this.reasonCodeSearch === "") {
                            this.reasonCodeSearch = "";
                        }
                        return [4 /*yield*/, this.reasonCodeService.getReasonCodes(this.reasonCodeSearch, "")
                                .catch(this.httpService.handleError)
                                .then(function (resp) {
                                var webresp = resp.json();
                                _this.spinnerService.stop();
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        _this.lstReasonCodes = [];
                                        _this.mainlstGridData = [];
                                        _this.lstReasonCodes = webresp.DataList;
                                        for (var item = 0; item < _this.lstReasonCodes.length; item++) {
                                            if (_this.lstReasonCodes[item].STATUS == false) {
                                                _this.lstReasonCodes[item].STATUS = true;
                                            }
                                            else {
                                                _this.lstReasonCodes[item].STATUS = false;
                                            }
                                            _this.mainlstGridData.push(_this.lstReasonCodes[item]);
                                        }
                                        _this.table = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.table = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: "warn", summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.table = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: "info", summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.table = false;
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
                        exMsg_1 = _a.sent();
                        this.clientErrorMsg(exMsg_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupReasonCodesComponent.prototype.changeStatus = function (reasonCode) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var webresp, exMsg_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        webresp = new AtParWebApiResponse_1.AtParWebApiResponse();
                        //await this.reasonCodeService.deleteReasonCode(reasonCode.REASON_CODE, !reasonCode.STATUS)
                        return [4 /*yield*/, this.reasonCodeService.deleteReasonCode(reasonCode.REASON_CODE, !reasonCode.STATUS)
                                .catch(this.httpService.handleError).then(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, msg, filterData, matchedrecord, x, lstSetupcodeDetails;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            webresp = resp.json();
                                            this.spinnerService.stop();
                                            _a = webresp.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 2];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 4];
                                            }
                                            return [3 /*break*/, 6];
                                        case 1:
                                            // await this.BindGrid();
                                            this.growlMessage = [];
                                            msg = AtParConstants_1.AtParConstants.Updated_Status_Msg.replace("1%", 'Reason Code').replace("2%", reasonCode.REASON_CODE);
                                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                                            filterData = [];
                                            this.lstReasonCodes = [];
                                            matchedrecord = this.mainlstGridData.filter(function (x) { return x.REASON_CODE == reasonCode.REASON_CODE; });
                                            matchedrecord[0].STATUS = reasonCode.STATUS;
                                            if (this.statusType.toString() == "false") {
                                                filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == false; });
                                            }
                                            else if (this.statusType.toString() == "true") {
                                                filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == true; });
                                            }
                                            else {
                                                filterData = this.mainlstGridData;
                                            }
                                            if (filterData != null) {
                                                for (x = 0; x < filterData.length; x++) {
                                                    lstSetupcodeDetails = new TKIT_REASON_CODES_1.TKIT_REASON_CODES();
                                                    lstSetupcodeDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                                                    lstSetupcodeDetails.REASON_CODE = filterData[x].REASON_CODE;
                                                    lstSetupcodeDetails.REASON_DESCR = filterData[x].REASON_DESCR;
                                                    lstSetupcodeDetails.UPDATE_DATE = filterData[x].UPDATE_DATE;
                                                    lstSetupcodeDetails.UPDATE_USERID = filterData[x].UPDATE_USERID;
                                                    //if (filterData[x].STATUS == false) {
                                                    //    filterData[x].STATUS = true;
                                                    //} else {
                                                    //    filterData[x].STATUS  = false;
                                                    //}
                                                    lstSetupcodeDetails.STATUS = filterData[x].STATUS;
                                                    this.lstReasonCodes.push(lstSetupcodeDetails);
                                                }
                                            }
                                            return [3 /*break*/, 6];
                                        case 2: return [4 /*yield*/, this.BindGrid()];
                                        case 3:
                                            _b.sent();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                            return [3 /*break*/, 6];
                                        case 4: return [4 /*yield*/, this.BindGrid()];
                                        case 5:
                                            _b.sent();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                            return [3 /*break*/, 6];
                                        case 6:
                                            this.spinnerService.stop();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        //await this.reasonCodeService.deleteReasonCode(reasonCode.REASON_CODE, !reasonCode.STATUS)
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_2 = _a.sent();
                        this.clientErrorMsg(exMsg_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupReasonCodesComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var webresp_1, exMsg_3;
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
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp_1.StatusMessage });
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
                        exMsg_3 = _a.sent();
                        this.clientErrorMsg(exMsg_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupReasonCodesComponent.prototype.saveOrUpdateReasonCode = function () {
        var _this = this;
        this.showAddButton = false;
        this.table = false;
        this.growlMessage = [];
        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            if (this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined) {
                this.table = false;
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                this.spinnerService.stop();
                return false;
            }
        }
        if (this.Title == "Save") {
            try {
                var webresp_2 = new AtParWebApiResponse_1.AtParWebApiResponse();
                this.spinnerService.start();
                if (this.newItem.REASON_DESCR == undefined || this.newItem.REASON_DESCR == 'undefined') {
                    this.newItem.REASON_DESCR = '';
                }
                this.reasonCodeService.createReasonCodes(this.newItem.REASON_CODE, this.newItem.REASON_DESCR, this.orgGroupIDForDBUpdate)
                    .catch(this.httpService.handleError).then(function (resp) {
                    webresp_2 = resp.json();
                    _this.spinnerService.stop();
                    switch (webresp_2.StatType) {
                        case AtParEnums_1.StatusType.Success: {
                            _this.growlMessage = [];
                            if (_this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString()) {
                                _this.loading = true;
                                _this.reasonCodeStatus = null;
                                _this.descStatus = null;
                                _this.ddlOrgIDStatus = null;
                                if (_this.blnShowOrgGroupDD) {
                                    document.getElementById('txtddllstOrgGroups').focus();
                                }
                                else {
                                    document.getElementById('txtReasonCode').focus();
                                }
                                var msg = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", 'Reason Code').replace("2%", _this.newItem.REASON_CODE);
                                _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                                _this.newItem = new TKIT_REASON_CODES_1.TKIT_REASON_CODES();
                                _this.selectedOrgGroupId = "";
                            }
                            else {
                                var msg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", 'Reason Code').replace("2%", _this.newItem.REASON_CODE);
                                _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                                document.getElementById('txtDesc').focus();
                            }
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
                this.clientErrorMsg(exMsg);
            }
        }
        else {
            try {
                var webresp_3 = new AtParWebApiResponse_1.AtParWebApiResponse();
                this.spinnerService.start();
                this.reasonCodeService.updateReasonCodes(this.newItem.REASON_CODE, this.newItem.REASON_DESCR)
                    .catch(this.httpService.handleError).then(function (resp) {
                    webresp_3 = resp.json();
                    _this.spinnerService.stop();
                    switch (webresp_3.StatType) {
                        case AtParEnums_1.StatusType.Success: {
                            _this.growlMessage = [];
                            if (_this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString()) {
                                var msg = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", 'Reason Code').replace("2%", _this.newItem.REASON_CODE);
                                _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                                _this.loading = false;
                                _this.newItem = new TKIT_REASON_CODES_1.TKIT_REASON_CODES();
                                _this.reasonCodeStatus = null;
                                _this.descStatus = null;
                                document.getElementById('txtReasonCode').focus();
                            }
                            else {
                                var msg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", 'Reason Code').replace("2%", _this.newItem.REASON_CODE);
                                _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                                document.getElementById('txtDesc').focus();
                            }
                            break;
                        }
                        case AtParEnums_1.StatusType.Error: {
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp_3.StatusMessage });
                            break;
                        }
                        case AtParEnums_1.StatusType.Warn: {
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp_3.StatusMessage });
                            break;
                        }
                        case AtParEnums_1.StatusType.Custom: {
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp_3.StatusMessage });
                            break;
                        }
                    }
                });
            }
            catch (exMsg) {
                this.clientErrorMsg(exMsg);
            }
        }
    };
    SetupReasonCodesComponent.prototype.ddlOrgIDChanged = function () {
        if (this.newItem.REASON_CODE == null || this.newItem.REASON_CODE == undefined) {
            this.newItem.REASON_CODE = "";
        }
        if (this.blnShowOrgGroupDD) {
            if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == null || this.selectedOrgGroupId == "") {
                this.ddlOrgIDStatus = 1;
            }
            else {
                this.ddlOrgIDStatus = 0;
            }
        }
        if (this.Title == "Update" || this.blnShowOrgGroupLabel) {
            this.ddlOrgIDStatus = 0;
        }
        if (this.reasonCodeStatus == 0 && this.ddlOrgIDStatus == 0 && this.newItem.REASON_CODE != "") {
            if (this.descStatus == null || this.descStatus == undefined || this.descStatus == 0) {
                this.loading = false;
            }
            else {
                this.loading = true;
            }
        }
        else {
            this.loading = true;
        }
    };
    SetupReasonCodesComponent.prototype.dataFilter = function (evtdata, filed, filterMatchMode) {
        return __awaiter(this, void 0, void 0, function () {
            var filterData, x, lstSetupcodeDetails;
            return __generator(this, function (_a) {
                this.growlMessage = [];
                this.lstReasonCodes.length = 0;
                if (this.statusType.toString() == "true") {
                    filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == true; });
                }
                else if (this.statusType.toString() == "false") {
                    filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == false; });
                }
                else {
                    filterData = this.mainlstGridData;
                }
                if (filterData != null) {
                    for (x = 0; x < filterData.length; x++) {
                        lstSetupcodeDetails = new TKIT_REASON_CODES_1.TKIT_REASON_CODES();
                        lstSetupcodeDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                        lstSetupcodeDetails.REASON_CODE = filterData[x].REASON_CODE;
                        lstSetupcodeDetails.REASON_DESCR = filterData[x].REASON_DESCR;
                        lstSetupcodeDetails.UPDATE_DATE = filterData[x].UPDATE_DATE;
                        lstSetupcodeDetails.UPDATE_USERID = filterData[x].UPDATE_USERID;
                        lstSetupcodeDetails.STATUS = filterData[x].STATUS;
                        this.lstReasonCodes.push(lstSetupcodeDetails);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    return SetupReasonCodesComponent;
}());
__decorate([
    core_1.ViewChild(datatable_1.DataTable),
    __metadata("design:type", datatable_1.DataTable)
], SetupReasonCodesComponent.prototype, "dataTableComponent", void 0);
SetupReasonCodesComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2149),
        providers: [datatableservice_1.datatableservice, tkit_setup_reason_codes_service_1.ReasonCodeService, HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice,
        tkit_setup_reason_codes_service_1.ReasonCodeService,
        HttpService_1.HttpService,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        AtParConstants_1.AtParConstants,
        leftbar_animation_service_1.LeftBarAnimationService])
], SetupReasonCodesComponent);
exports.SetupReasonCodesComponent = SetupReasonCodesComponent;


/***/ }),

/***/ 1658:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var TransactionReportComponent = (function () {
    function TransactionReportComponent() {
    }
    return TransactionReportComponent;
}());
TransactionReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2150)
    })
], TransactionReportComponent);
exports.TransactionReportComponent = TransactionReportComponent;


/***/ }),

/***/ 1659:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var TrackITComponent = (function () {
    function TrackITComponent() {
    }
    return TrackITComponent;
}());
TrackITComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2151)
    })
], TrackITComponent);
exports.TrackITComponent = TrackITComponent;


/***/ }),

/***/ 1743:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TKIT_DEPT = (function () {
    function TKIT_DEPT() {
    }
    return TKIT_DEPT;
}());
exports.TKIT_DEPT = TKIT_DEPT;


/***/ }),

/***/ 1744:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TKIT_ITEM_INVENTORY = (function () {
    function TKIT_ITEM_INVENTORY() {
    }
    return TKIT_ITEM_INVENTORY;
}());
exports.TKIT_ITEM_INVENTORY = TKIT_ITEM_INVENTORY;


/***/ }),

/***/ 1745:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TKIT_ITEM_MASTER = (function () {
    function TKIT_ITEM_MASTER() {
    }
    return TKIT_ITEM_MASTER;
}());
exports.TKIT_ITEM_MASTER = TKIT_ITEM_MASTER;


/***/ }),

/***/ 1746:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TKIT_ITEM_TYPE = (function () {
    function TKIT_ITEM_TYPE() {
    }
    return TKIT_ITEM_TYPE;
}());
exports.TKIT_ITEM_TYPE = TKIT_ITEM_TYPE;


/***/ }),

/***/ 1747:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TKIT_REASON_CODES = (function () {
    function TKIT_REASON_CODES() {
    }
    return TKIT_REASON_CODES;
}());
exports.TKIT_REASON_CODES = TKIT_REASON_CODES;


/***/ }),

/***/ 1768:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VM_TKIT_ITEM_DETAILS = (function () {
    function VM_TKIT_ITEM_DETAILS() {
    }
    return VM_TKIT_ITEM_DETAILS;
}());
exports.VM_TKIT_ITEM_DETAILS = VM_TKIT_ITEM_DETAILS;


/***/ }),

/***/ 1866:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
__webpack_require__(32);
var Rx_1 = __webpack_require__(37);
var HttpService_1 = __webpack_require__(12);
//import { VM_TKIT_ITEM_DEPT } from '../../app/Entities/VM_TKIT_ITEM_DEPT';
var DeliveryReportService = (function () {
    function DeliveryReportService(httpservice) {
        this.httpservice = httpservice;
    }
    DeliveryReportService.prototype.getHeirarchyUsersList = function (appID, userID, orgGroupID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            "apiMethod": "/api/IssueReport/GetHeirarchyUsersList",
                            params: {
                                appID: appID,
                                userID: userID,
                                orgGrpID: orgGroupID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeliveryReportService.prototype.getTrackITDetpartments = function (deptID, status) {
        return this.httpservice.getSync({
            apiMethod: "/api/DeliveryTrackITReport/GetTKITDepts",
            params: {
                "deptID": deptID,
                "status": status,
            }
        });
    };
    DeliveryReportService.prototype.getTkITDeliverReport = function (fromDate, toDate, request, recipient, userId, departmentId, itemId, vendorName, descr, location, reqId, status) {
        return this.httpservice.getSync({
            apiMethod: "/api/DeliveryTrackITReport/GetTkITDeliverReport",
            params: {
                "fromDate": fromDate,
                "toDate": toDate,
                "request": request,
                "recipient": recipient,
                "userId": userId,
                "departmentId": departmentId,
                "itemId": itemId,
                "vendorName": vendorName,
                "descr": descr,
                "location": location,
                "reqId": reqId,
                "status": status,
            }
        });
    };
    DeliveryReportService.prototype.getRequestors = function (inactiveStatusChk) {
        return this.httpservice.getSync({
            apiMethod: "/api/DeliveryTrackITReport/GetRequestors",
            params: {
                "inactiveStatusChk": inactiveStatusChk,
            }
        });
    };
    DeliveryReportService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return DeliveryReportService;
}());
DeliveryReportService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], DeliveryReportService);
exports.DeliveryReportService = DeliveryReportService;


/***/ }),

/***/ 1867:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
__webpack_require__(32);
var Rx_1 = __webpack_require__(37);
var HttpService_1 = __webpack_require__(12);
var TrackITInactiveItemsService = (function () {
    function TrackITInactiveItemsService(httpservice) {
        this.httpservice = httpservice;
    }
    TrackITInactiveItemsService.prototype.getItemsToInActivate = function (typeIndicator, destDate, deviceTokenEntry) {
        return this.httpservice.get({
            apiMethod: "/api/InactivateItems/GetItemsToInActivate",
            params: {
                "typeIndicator": typeIndicator,
                "destDate": destDate,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    TrackITInactiveItemsService.prototype.inactivateItems = function (lstItemMaster, deviceTokenEntry) {
        return this.httpservice.create({
            apiMethod: "/api/InactivateItems/InactivateItem",
            formData: lstItemMaster,
            params: {
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    TrackITInactiveItemsService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return TrackITInactiveItemsService;
}());
TrackITInactiveItemsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], TrackITInactiveItemsService);
exports.TrackITInactiveItemsService = TrackITInactiveItemsService;


/***/ }),

/***/ 1868:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(38);
__webpack_require__(32);
var HttpService_1 = __webpack_require__(12);
var ManageDepartmentsService = (function () {
    function ManageDepartmentsService(httpService, http) {
        this.httpService = httpService;
        this.http = http;
    }
    ManageDepartmentsService.prototype.getDepartments = function (department, status, orgGroupID) {
        return this.httpService.getSync({
            apiMethod: "/api/ManageDepartments/GetTKITAllDepts",
            params: {
                "deptID": department,
                "status": status,
                "OrgGrpID": orgGroupID
            }
        });
    };
    ManageDepartmentsService.prototype.saveDepartment = function (deptID, desc, status, mode, orgGroupID, userID) {
        return this.httpService.create({
            apiMethod: "/api/ManageDepartments/SaveDeptData",
            params: {
                "deptID": deptID,
                "deptDescr": desc,
                "status": status,
                "mode": mode,
                "orgGrpID": orgGroupID,
                "userID": userID
            }
        }).toPromise();
    };
    return ManageDepartmentsService;
}());
ManageDepartmentsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http])
], ManageDepartmentsService);
exports.ManageDepartmentsService = ManageDepartmentsService;


/***/ }),

/***/ 1869:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
__webpack_require__(32);
var Rx_1 = __webpack_require__(37);
var HttpService_1 = __webpack_require__(12);
//import { VM_TKIT_ITEM_DEPT } from '../../app/Entities/VM_TKIT_ITEM_DEPT';
var ManageEquipmentItemsService = (function () {
    function ManageEquipmentItemsService(httpservice) {
        this.httpservice = httpservice;
    }
    ManageEquipmentItemsService.prototype.GetMasterItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.httpservice.getSync({
                        apiMethod: "/api/ManageEquipmentItems/GetMasterItems"
                    })];
            });
        });
    };
    ManageEquipmentItemsService.prototype.GetMasterItemsdetails = function (itemID, description) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.httpservice.getSync({
                        apiMethod: "/api/ManageEquipmentItems/GetMasterItems",
                        params: {
                            "itemID": itemID,
                            "description": description
                        }
                    })];
            });
        });
    };
    ManageEquipmentItemsService.prototype.GetEquipmentTypes = function (itemIndicator, orgGrpId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.httpservice.getSync({
                        apiMethod: "/api/ManageEquipmentItems/GetEquipmentTypes",
                        params: {
                            "itemIndicator": itemIndicator,
                            "orgGrpId": orgGrpId
                        }
                    })];
            });
        });
    };
    ManageEquipmentItemsService.prototype.GetItemsForSelectedEqType = function (equipmentType, itemId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.httpservice.getSync({
                        apiMethod: "/api/ManageEquipmentItems/GetItemsForSelectedEqType",
                        params: {
                            "equipmentType": equipmentType,
                            "itemId": itemId
                        }
                    })];
            });
        });
    };
    ManageEquipmentItemsService.prototype.GetLatestValue = function (appId, fieldName) {
        return this.httpservice.getSync({
            apiMethod: "/api/CommonTrackIT/GetLatestValue",
            params: {
                "appId": appId,
                "fieldName": fieldName
            }
        });
    };
    ManageEquipmentItemsService.prototype.GetLatestAssetIDValue = function (appId, fieldName) {
        return this.httpservice.getSync({
            apiMethod: "/api/CommonTrackIT/GetLatestValue",
            params: {
                "appId": appId,
                "fieldName": fieldName
            }
        });
    };
    ManageEquipmentItemsService.prototype.GetItemDepartments = function (itemId, orgGrpId) {
        return this.httpservice.getSync({
            apiMethod: "/api/ManageEquipmentItems/GetItemDepartments",
            params: {
                "itemId": itemId,
                "orgGrpId": orgGrpId
            }
        });
    };
    ManageEquipmentItemsService.prototype.IsItemOrdered = function (itemId) {
        return this.httpservice.getSync({
            apiMethod: "/api/ManageEquipmentItems/IsItemOrdered",
            params: {
                "itemId": itemId
            }
        });
    };
    ManageEquipmentItemsService.prototype.GetTypeItems = function (itemType, itemId) {
        return this.httpservice.getSync({
            apiMethod: "/api/ManageEquipmentItems/GetTypeItems",
            params: {
                "itemType": itemType,
                "itemId": itemId
            }
        });
    };
    ManageEquipmentItemsService.prototype.UpdateItems = function (lstItemDetails, itemTypeIndicator) {
        return this.httpservice.create({
            apiMethod: "/api/ManageEquipmentItems/UpdateItems",
            formData: lstItemDetails,
            params: {
                "lstItemDetails": lstItemDetails,
                "itemTypeIndicator": itemTypeIndicator
            }
        });
    };
    ManageEquipmentItemsService.prototype.SaveItemDetails = function (lstItemDetails, lstItemInvDetails, itemTypeIndicator, mode) {
        var dicitemdetails = { "lstItemDetails": lstItemDetails, "lstItemInvDetails": lstItemInvDetails };
        return this.httpservice.create({
            apiMethod: "/api/ManageEquipmentItems/SaveItemDetails",
            formData: dicitemdetails,
            params: {
                "itemTypeIndicator": itemTypeIndicator,
                "mode": mode
            }
        }).toPromise();
    };
    ManageEquipmentItemsService.prototype.getVendorDetails = function (orgGroupID, vendorID, search) {
        return this.httpservice.getSync({
            apiMethod: "/api/CommonTrackIT/GetVendorDetails",
            params: {
                "orgGroupID": orgGroupID,
                "vendorID": vendorID,
                "search": search,
            }
        });
    };
    ManageEquipmentItemsService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return ManageEquipmentItemsService;
}());
ManageEquipmentItemsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], ManageEquipmentItemsService);
exports.ManageEquipmentItemsService = ManageEquipmentItemsService;


/***/ }),

/***/ 1870:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(38);
__webpack_require__(32);
var HttpService_1 = __webpack_require__(12);
var ManageEqTypeService = (function () {
    function ManageEqTypeService(httpService, http) {
        this.httpService = httpService;
        this.http = http;
    }
    ManageEqTypeService.prototype.updateEqTypeData = function (itemType) {
        return this.httpService.create({
            apiMethod: "/api/ManageEquipmentType/UpdateEqTypeData",
            formData: itemType
        }).toPromise();
    };
    ManageEqTypeService.prototype.saveEqTypeData = function (itemType) {
        return this.httpService.create({
            apiMethod: "/api/ManageEquipmentType/SaveEqTypeData",
            formData: itemType
        }).toPromise();
    };
    ManageEqTypeService.prototype.getEquipmentTypes = function (itemIndicator, orgGrpId, searchEqTypeOrDesc) {
        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetEquipmentTypes",
            params: {
                "itemIndicator": itemIndicator,
                "orgGrpId": orgGrpId,
                "searchEqTypeOrDesc": searchEqTypeOrDesc
            }
        });
    };
    ManageEqTypeService.prototype.getEqIndicators = function () {
        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetEqIndicators"
        });
    };
    return ManageEqTypeService;
}());
ManageEqTypeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http])
], ManageEqTypeService);
exports.ManageEqTypeService = ManageEqTypeService;


/***/ }),

/***/ 1871:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(38);
__webpack_require__(32);
var HttpService_1 = __webpack_require__(12);
var ReasonCodeService = (function () {
    function ReasonCodeService(httpService, http) {
        this.httpService = httpService;
        this.http = http;
    }
    ReasonCodeService.prototype.getReasonCodes = function (reasonCode, desc) {
        return this.httpService.getSync({
            apiMethod: "/api/SetupReasonCodes/GetReasonCodes",
            params: {
                "reasonCode": reasonCode,
                "desc": desc
            }
        });
    };
    ReasonCodeService.prototype.updateReasonCodes = function (reasonCode, desc) {
        return this.httpService.create({
            apiMethod: "/api/SetupReasonCodes/UpdateReasonCodes",
            params: {
                "reasonCode": reasonCode,
                "desc": desc
            }
        }).toPromise();
    };
    ReasonCodeService.prototype.deleteReasonCode = function (reasonCode, status) {
        return this.httpService.create({
            apiMethod: "/api/SetupReasonCodes/DeleteReasonCode",
            params: {
                "reasonCode": reasonCode,
                "status": status
            }
        }).toPromise();
    };
    ReasonCodeService.prototype.createReasonCodes = function (reasonCode, desc, orgGroupID) {
        return this.httpService.create({
            apiMethod: "/api/SetupReasonCodes/CreateReasonCodes",
            params: {
                "reasonCode": reasonCode,
                "desc": desc,
                "orgGrpID": orgGroupID
            }
        }).toPromise();
    };
    return ReasonCodeService;
}());
ReasonCodeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http])
], ReasonCodeService);
exports.ReasonCodeService = ReasonCodeService;


/***/ }),

/***/ 1872:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(29);
var trackit_component_1 = __webpack_require__(1659);
var tkit_allocate_location_groups_component_1 = __webpack_require__(1637);
var tkit_charge_report_component_1 = __webpack_require__(1638);
var tkit_check_in_check_out_component_1 = __webpack_require__(1640);
var tkit_check_out_component_1 = __webpack_require__(1641);
var tkit_daily_activity_component_1 = __webpack_require__(1642);
var tkit_daily_user_activity_component_1 = __webpack_require__(1643);
var tkit_delivery_report_component_1 = __webpack_require__(1644);
var tkit_destruction_report_component_1 = __webpack_require__(1645);
var tkit_equipment_tracking_report_component_1 = __webpack_require__(1646);
var tkit_inactivate_items_component_1 = __webpack_require__(1647);
var tkit_item_master_report_component_1 = __webpack_require__(1648);
var tkit_manage_departments_component_1 = __webpack_require__(1649);
var tkit_manage_equipment_items_component_1 = __webpack_require__(1650);
var tkit_manage_equipment_type_component_1 = __webpack_require__(1651);
var tkit_manage_requestor_home_component_1 = __webpack_require__(1652);
var tkit_manage_requestor_modify_component_1 = __webpack_require__(1653);
var tkit_manage_requestor_component_1 = __webpack_require__(1654);
var tkit_newitem_audit_report_component_1 = __webpack_require__(1656);
var tkit_setup_reason_codes_component_1 = __webpack_require__(1657);
var tkit_transaction_report_component_1 = __webpack_require__(1658);
exports.routes = [
    {
        path: '',
        component: trackit_component_1.TrackITComponent,
        children: [
            { path: 'allocatelocationgroups', component: tkit_allocate_location_groups_component_1.AllocateLocationGroupsComponent },
            { path: 'chargereport', component: tkit_charge_report_component_1.ChargeReportComponent },
            { path: 'checkinitems', component: tkit_check_in_check_out_component_1.CheckIn_CheckOutComponent },
            { path: 'checkoutitems', component: tkit_check_out_component_1.CheckOutComponent },
            { path: 'dailyactivity', component: tkit_daily_activity_component_1.DailyActivityComponent },
            { path: 'dailyuseractivity', component: tkit_daily_user_activity_component_1.DailyUserActivityComponent },
            { path: 'deliveryreport', component: tkit_delivery_report_component_1.DeliveryReportComponent },
            { path: 'destructionreport', component: tkit_destruction_report_component_1.DestructionReportComponent },
            { path: 'equipmenttrackingreport', component: tkit_equipment_tracking_report_component_1.EquipmentTrackingReportComponent },
            { path: 'inactivateitems', component: tkit_inactivate_items_component_1.InactivateItemsComponent },
            { path: 'itemmasterreport', component: tkit_item_master_report_component_1.ItemMasterReportComponent },
            { path: 'managedepartments', component: tkit_manage_departments_component_1.ManageDepartmentsComponent },
            { path: 'manageequipmentitems', component: tkit_manage_equipment_items_component_1.ManageEquipmentItemsComponent },
            { path: 'manageequipmenttype', component: tkit_manage_equipment_type_component_1.ManageEquipmentTypeComponent },
            {
                path: 'managerequestor', component: tkit_manage_requestor_component_1.ManageRequestorComponent,
                children: [
                    { path: '', component: tkit_manage_requestor_home_component_1.ManageRequestorHomeComponent },
                    { path: 'addormodify', component: tkit_manage_requestor_modify_component_1.ManageRequestorModifyComponent }
                ]
            },
            { path: 'newitemauditreport', component: tkit_newitem_audit_report_component_1.NewItemAuditReportComponent },
            { path: 'setupreasoncodes', component: tkit_setup_reason_codes_component_1.SetupReasonCodesComponent },
            { path: 'transactionreport', component: tkit_transaction_report_component_1.TransactionReportComponent },
        ]
    }
];
var TrackITRoutingModule = (function () {
    function TrackITRoutingModule() {
    }
    return TrackITRoutingModule;
}());
TrackITRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.routes)],
        exports: [router_1.RouterModule]
    })
], TrackITRoutingModule);
exports.TrackITRoutingModule = TrackITRoutingModule;


/***/ }),

/***/ 1873:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var trackit_component_1 = __webpack_require__(1659);
var tkit_allocate_location_groups_component_1 = __webpack_require__(1637);
var tkit_charge_report_component_1 = __webpack_require__(1638);
var tkit_check_in_check_out_component_1 = __webpack_require__(1640);
var tkit_check_out_component_1 = __webpack_require__(1641);
var tkit_daily_activity_component_1 = __webpack_require__(1642);
var tkit_daily_user_activity_component_1 = __webpack_require__(1643);
var tkit_delivery_report_component_1 = __webpack_require__(1644);
var tkit_destruction_report_component_1 = __webpack_require__(1645);
var tkit_equipment_tracking_report_component_1 = __webpack_require__(1646);
var tkit_inactivate_items_component_1 = __webpack_require__(1647);
var tkit_item_master_report_component_1 = __webpack_require__(1648);
var tkit_manage_departments_component_1 = __webpack_require__(1649);
var tkit_manage_equipment_items_component_1 = __webpack_require__(1650);
var tkit_manage_equipment_type_component_1 = __webpack_require__(1651);
var tkit_manage_requestor_home_component_1 = __webpack_require__(1652);
var tkit_manage_requestor_modify_component_1 = __webpack_require__(1653);
var tkit_manage_requestor_component_1 = __webpack_require__(1654);
var tkit_newitem_audit_report_component_1 = __webpack_require__(1656);
var tkit_setup_reason_codes_component_1 = __webpack_require__(1657);
var tkit_transaction_report_component_1 = __webpack_require__(1658);
var trackit_routing_module_1 = __webpack_require__(1872);
var shared_module_1 = __webpack_require__(632);
var TrackITModule = (function () {
    function TrackITModule() {
    }
    return TrackITModule;
}());
TrackITModule = __decorate([
    core_1.NgModule({
        imports: [
            trackit_routing_module_1.TrackITRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            trackit_component_1.TrackITComponent,
            tkit_allocate_location_groups_component_1.AllocateLocationGroupsComponent,
            tkit_charge_report_component_1.ChargeReportComponent,
            tkit_check_in_check_out_component_1.CheckIn_CheckOutComponent,
            tkit_check_out_component_1.CheckOutComponent,
            tkit_daily_activity_component_1.DailyActivityComponent,
            tkit_daily_user_activity_component_1.DailyUserActivityComponent,
            tkit_delivery_report_component_1.DeliveryReportComponent,
            tkit_destruction_report_component_1.DestructionReportComponent,
            tkit_equipment_tracking_report_component_1.EquipmentTrackingReportComponent,
            tkit_inactivate_items_component_1.InactivateItemsComponent,
            tkit_item_master_report_component_1.ItemMasterReportComponent,
            tkit_manage_departments_component_1.ManageDepartmentsComponent,
            tkit_manage_equipment_items_component_1.ManageEquipmentItemsComponent,
            tkit_manage_equipment_type_component_1.ManageEquipmentTypeComponent,
            tkit_manage_requestor_component_1.ManageRequestorComponent,
            tkit_manage_requestor_home_component_1.ManageRequestorHomeComponent,
            tkit_manage_requestor_modify_component_1.ManageRequestorModifyComponent,
            tkit_newitem_audit_report_component_1.NewItemAuditReportComponent,
            tkit_setup_reason_codes_component_1.SetupReasonCodesComponent,
            tkit_transaction_report_component_1.TransactionReportComponent
        ]
    })
], TrackITModule);
exports.TrackITModule = TrackITModule;


/***/ }),

/***/ 2132:
/***/ (function(module, exports) {

module.exports = "\r\n<div>\r\n    <atpar-allocate-location-groups [appId]=\"trackITAppId\"></atpar-allocate-location-groups>\r\n</div>";

/***/ }),

/***/ 2133:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>This is TrackIT Charge Report Screen.</span>\r\n</div>";

/***/ }),

/***/ 2134:
/***/ (function(module, exports) {

module.exports = "<style>\r\n    .no-shadow {\r\n        box-shadow: none !important;\r\n    }\r\n\r\n    .bdr-1 {\r\n        border: 1px solid #eee !important;\r\n    }\r\n\r\n    .panel-green {\r\n        box-shadow: 0 0 6px 0 hsla(0,0%,66%,.5) !important;\r\n        border: 1px solid #e1e1e1 !important;\r\n    }\r\n\r\n        .panel-green > .panel-body {\r\n            border-left: 10px solid #7cb82f;\r\n        }\r\n\r\n    .panel-blue {\r\n        /*border-color: #79ebfd !important;*/\r\n        box-shadow: 0 0 6px 0 hsla(0,0%,66%,.5) !important;\r\n        border: 1px solid #e1e1e1 !important;\r\n    }\r\n\r\n        .panel-blue > .panel-body {\r\n            border-left: 10px solid #00aeb3;\r\n        }\r\n\r\n    .panel-pink {\r\n        /*border-color: #de60f5 !important;*/\r\n        box-shadow: 0 0 6px 0 hsla(0,0%,66%,.5) !important;\r\n        border: 1px solid #e1e1e1 !important;\r\n    }\r\n\r\n        .panel-pink > .panel-body {\r\n            border-left: 10px solid #de60f5;\r\n        }\r\n\r\n    .scrl-pnl {\r\n        height: auto;\r\n        overflow-x: hidden;\r\n        overflow-y: auto;\r\n        max-height: 411px;\r\n    }\r\n\r\n    .ui-datatable tbody tr td .form-control, table tbody tr td .form-control {\r\n        height: auto !important;\r\n        margin-top: -10px;\r\n    }\r\n\r\n    .table-inner-style, tbody tr td {\r\n        padding: 12px;\r\n    }\r\n\r\n    .col-md-6 .border-panel > .row {\r\n        border-bottom: 1px solid #e1e1e1;\r\n    }\r\n\r\n    .ten-padding {\r\n        padding: 10px;\r\n    }\r\n\r\n    .thirty-padding {\r\n        padding: 25px;\r\n    }\r\n\r\n    .margin-border {\r\n        border-bottom: 1px solid #e1e1e1;\r\n        padding: 4px;\r\n    }\r\n\r\n    .new-ht td .input-group .input-group-addon {\r\n        line-height: 0 !important;\r\n    }\r\n</style>\r\n<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\" *ngIf=\"true\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px;\">\r\n                        <form class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Item ID/ Assets ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-6\">\r\n                                        <div class=\"input-group\">\r\n                                            <atpar-text [(ngModel)]=\"itemIdSearch\" [name]=\"txtORGI1\" [id]=\"'ORGI1'\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'alpha_numeric_underscore_nospace'\" [title]=\"'Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces'\"></atpar-text>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\" *ngIf=\"hasSerialId\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Serial #</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-6\">\r\n                                        <div class=\"input-group\">\r\n                                            <atpar-text [(ngModel)]=\"serialIdSearch\" [name]=\"txtORGI1s\" [id]=\"'ORGI1s'\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'alpha_numeric_underscore_nospace'\" [title]=\"'Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces'\"></atpar-text>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"go()\" *ngIf=\"isGo\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"col-xs-12\" *ngIf=\"pop\">\r\n                            <ul class=\"list-inline\">\r\n                                <li><i class=\"fa fa-square\" style=\"color:#7cb82f;\"></i> &nbsp; Box Item</li>\r\n                                <li><i class=\"fa fa-square\" style=\"color:#00aeb3;\"></i>  &nbsp; Equipment Item</li>\r\n                                <li><i class=\"fa fa-square\" style=\"color:#de60f5;\"></i>  &nbsp; Furniture Item</li>\r\n                            </ul>\r\n                            <div class=\"panel panel-default no-shadow bdr-1\">\r\n                                <div class=\"panel-body\">\r\n                                    <div class=\"col-xs-12 col-md-5 col-sm-12\">\r\n                                        <table class=\"table table-bordered table-inner-style qty-table\">\r\n                                            <tbody>\r\n                                                <tr>\r\n                                                    <td>Item ID</td>\r\n                                                    <td>{{itemDetails.ITEM_ID}}</td>\r\n                                                </tr>\r\n                                                <tr>\r\n                                                    <td>Asset ID</td>\r\n                                                    <td>{{itemDetails.ASSET_ID}}</td>\r\n                                                </tr>\r\n                                                <tr>\r\n                                                    <td>Description</td>\r\n                                                    <td>{{itemDetails.ITEM_DESCR}}</td>\r\n                                                </tr>\r\n                                                <tr>\r\n                                                    <td>Storage Location</td>\r\n                                                    <td>{{itemDetails.DELIVER_LOCATION}}</td>\r\n                                                </tr>\r\n                                                <tr>\r\n                                                    <td>Manufacturer</td>\r\n                                                    <td>{{itemDetails.MANUFACTURER}}</td>\r\n                                                </tr>\r\n                                                <tr>\r\n                                                    <td>Vendor</td>\r\n                                                    <td>{{itemDetails.VENDOR}}</td>\r\n                                                </tr>\r\n                                                <tr>\r\n                                                    <td>System Qty</td>\r\n                                                    <td>{{itemDetails.itemQty}}</td>\r\n                                                </tr>\r\n                                                <tr class=\"new-ht\">\r\n                                                    <td>Checkin Qty</td>\r\n                                                    <td>\r\n                                                        <div class=\"input-group\" style=\"width:150px;\">\r\n                                                            <span class=\"input-group-addon\" [attr.disabled]=\"isDisabled\" [style.cursor]=\"cursor\"> <a class=\"text-default\" (click)=\"decreaseQuantity()\" [attr.disabled]=\"isDisabled\" [style.cursor]=\"cursor\"> - </a></span>\r\n                                                            <atpar-text [id]=\"'txtDf'\" [name]=\"txtDf\" [style]=\"{'height':'34px'}\" [(ngModel)]=\"itemDetails.checkinQty\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'alpha_numeric_underscore_nospace'\" [title]=\"'Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces'\" [disabled]=\"isDisabled\"></atpar-text>\r\n                                                            <span class=\"input-group-addon\" [attr.disabled]=\"isDisabled\" [style.cursor]=\"cursor\"> <a class=\"text-default\" (click)=\"increaseQuantity()\" [attr.disabled]=\"isDisabled\" [style.cursor]=\"cursor\"> + </a> </span>\r\n                                                        </div>\r\n                                                    </td>\r\n                                                </tr>\r\n                                                <tr>\r\n                                                    <td colspan=\"2\">\r\n                                                        <button class=\"btn btn-purple sbtn pull-right\" (click)=\"Add()\">Add &nbsp; <i class=\"fa fa-plus\"></i></button>\r\n                                                    </td>\r\n                                                </tr>\r\n                                            </tbody>\r\n                                        </table>\r\n                                    </div>\r\n                                    <div class=\"col-xs-12 col-md-7 col-sm-12\" *ngIf=\"isADD\">\r\n                                        <div class=\"panel panel-default no-shadow bdr-1 scrl-pnl\">\r\n                                            <div class=\"panel-body\" style=\"padding:8px;\">\r\n                                                <div class=\"col-xs-12\" style=\"padding:0px\" *ngFor=\"let itemDetails of checkOutItemsList\">\r\n                                                    <div class={{this.itemDetails.color}}>\r\n                                                        <div class=\"panel-body no-padding\">\r\n                                                            <div class=\"row\">\r\n                                                                <div class=\"col-md-3\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Item ID-Serial# : {{itemDetails.ITEM_ID}}</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-6 border-panel\">\r\n                                                                    <div class=\"row margin-border\">\r\n                                                                        <p>Item Description : {{itemDetails.ITEM_DESCR}}</p>\r\n                                                                    </div>\r\n                                                                    <div class=\"row\">\r\n                                                                        <div class=\"col-md-6 ten-padding\">\r\n                                                                            <p>Assets Id : {{itemDetails.ASSET_ID}}</p>\r\n                                                                        </div>\r\n                                                                        <div class=\"col-md-6 ten-padding\" style=\"border-left: 1px solid #e1e1e1;\">\r\n                                                                            <p>Storage Location : {{itemDetails.DELIVER_LOCATION}}</p>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-2\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Checkin qty : {{itemDetails.checkinQty}}</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-1\" style=\"margin-top: 25px;\">\r\n                                                                    <i class=\"fa fa-close fa-bg bg-red danger\" (click)=\"onCloseItemClick(itemDetails,$event)\"></i>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>\r\n                                                <!--<div class=\"col-xs-12 no-padding\">\r\n                                                    <div class=\"panel panel-blue no-shadow bdr-1\">\r\n                                                        <div class=\"panel-body no-padding\">\r\n                                                            <div class=\"row\">\r\n                                                                <div class=\"col-md-3\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Item ID-Serial#</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-6 border-panel\">\r\n                                                                    <div class=\"row margin-border\">\r\n                                                                        <p>Item Description</p>\r\n                                                                    </div>\r\n                                                                    <div class=\"row\">\r\n                                                                        <div class=\"col-md-6 ten-padding\">\r\n                                                                            <p>Assets Id</p>\r\n                                                                        </div>\r\n                                                                        <div class=\"col-md-6 ten-padding\" style=\"border-left: 1px solid #e1e1e1;\">\r\n                                                                            <p>Storage Location</p>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-2\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Checkin qty</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-1\" style=\"margin-top: 25px;\">\r\n                                                                    <i class=\"fa fa-close fa-bg bg-red danger\"></i>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>\r\n                                                <div class=\"col-xs-12 no-padding\">\r\n                                                    <div class=\"panel panel-pink no-shadow bdr-1\">\r\n                                                        <div class=\"panel-body no-padding\">\r\n                                                            <div class=\"row\">\r\n                                                                <div class=\"col-md-3\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Item ID-Serial#</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-6 border-panel\">\r\n                                                                    <div class=\"row margin-border\">\r\n                                                                        <p>Item Description</p>\r\n                                                                    </div>\r\n                                                                    <div class=\"row\">\r\n                                                                        <div class=\"col-md-6 ten-padding\">\r\n                                                                            <p>Assets Id</p>\r\n                                                                        </div>\r\n                                                                        <div class=\"col-md-6 ten-padding\" style=\"border-left: 1px solid #e1e1e1;\">\r\n                                                                            <p>Storage Location</p>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-2\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Checkin qty</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-1\" style=\"margin-top: 25px;\">\r\n                                                                    <i class=\"fa fa-close fa-bg bg-red danger\"></i>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>\r\n                                                <div class=\"col-xs-12 no-padding\">\r\n                                                    <div class=\"panel panel-green no-shadow bdr-1\">\r\n                                                        <div class=\"panel-body no-padding\">\r\n                                                            <div class=\"row\">\r\n                                                                <div class=\"col-md-3\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Item ID-Serial#</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-6 border-panel\">\r\n                                                                    <div class=\"row margin-border\">\r\n                                                                        <p>Item Description</p>\r\n                                                                    </div>\r\n                                                                    <div class=\"row\">\r\n                                                                        <div class=\"col-md-6 ten-padding\">\r\n                                                                            <p>Assets Id</p>\r\n                                                                        </div>\r\n                                                                        <div class=\"col-md-6 ten-padding\" style=\"border-left: 1px solid #e1e1e1;\">\r\n                                                                            <p>Storage Location</p>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-2\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Checkin qty</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-1\" style=\"margin-top: 25px;\">\r\n                                                                    <i class=\"fa fa-close fa-bg bg-red danger\"></i>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>-->\r\n                                                <!--<div class=\"col-xs-12 no-padding\">\r\n                                                    <div class=\"panel panel-green no-shadow bdr-1\">\r\n                                                        <div class=\"panel-body no-padding\">\r\n                                                            <div class=\"row\">\r\n                                                                <div class=\"col-md-3\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Item ID-Serial#</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-6 border-panel\">\r\n                                                                    <div class=\"row margin-border\">\r\n                                                                        <p>Item Description</p>\r\n                                                                    </div>\r\n                                                                    <div class=\"row\">\r\n                                                                        <div class=\"col-md-6 ten-padding\">\r\n                                                                            <p>Assets Id</p>\r\n                                                                        </div>\r\n                                                                        <div class=\"col-md-6 ten-padding\" style=\"border-left: 1px solid #e1e1e1;\">\r\n                                                                            <p>Storage Location</p>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-2\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Checkin qty</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-1\" style=\"margin-top: 25px;\">\r\n                                                                    <i class=\"fa fa-close fa-bg bg-red danger\"></i>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>-->\r\n                                                <div class=\"clear\"></div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-xs-12\">\r\n                                            <button class=\"btn btn-purple sbtn pull-right\" (click)=\"checkInOutItems()\">Check In &nbsp; <i class=\"fa fa-check\"></i></button>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<atpar-growl [value]=\"msgs\" sticky=\"sticky\"></atpar-growl>\r\n<style>\r\n    .disabled {\r\n        cursor:none;\r\n    }\r\n\r\n</style>";

/***/ }),

/***/ 2135:
/***/ (function(module, exports) {

module.exports = "\r\n<style>\r\n    .no-shadow {\r\n        box-shadow: none !important;\r\n    }\r\n\r\n    .bdr-1 {\r\n        border: 1px solid #eee !important;\r\n    }\r\n\r\n    .panel-green {\r\n        box-shadow: 0 0 6px 0 hsla(0,0%,66%,.5) !important;\r\n        border: 1px solid #e1e1e1 !important;\r\n    }\r\n\r\n        .panel-green > .panel-body {\r\n            border-left: 10px solid #7cb82f;\r\n        }\r\n\r\n    .panel-blue {\r\n        box-shadow: 0 0 6px 0 hsla(0,0%,66%,.5) !important;\r\n        border: 1px solid #e1e1e1 !important;\r\n    }\r\n\r\n        .panel-blue > .panel-body {\r\n            border-left: 10px solid #00aeb3;\r\n        }\r\n\r\n    .panel-pink {\r\n        box-shadow: 0 0 6px 0 hsla(0,0%,66%,.5) !important;\r\n        border: 1px solid #e1e1e1 !important;\r\n    }\r\n\r\n        .panel-pink > .panel-body {\r\n            border-left: 10px solid #de60f5;\r\n        }\r\n\r\n    .scrl-pnl {\r\n        height: auto;\r\n        overflow-x: hidden;\r\n        overflow-y: auto;\r\n        max-height: 481px;\r\n    }\r\n\r\n    .ui-datatable tbody tr td .form-control, table tbody tr td .form-control {\r\n        height: auto !important;\r\n        margin-top: -10px;\r\n    }\r\n\r\n    .table-inner-style, tbody tr td {\r\n        padding: 12px;\r\n    }\r\n\r\n    .col-md-6 .border-panel > .row {\r\n        border-bottom: 1px solid #e1e1e1;\r\n    }\r\n\r\n    .ten-padding {\r\n        padding: 10px;\r\n    }\r\n\r\n    .thirty-padding {\r\n        padding: 25px;\r\n    }\r\n\r\n    .margin-border {\r\n        border-bottom: 1px solid #e1e1e1;\r\n        padding: 4px;\r\n    }\r\n\r\n    th {\r\n        text-align: center;\r\n    }\r\n\r\n    .new-ht td .input-group .input-group-addon {\r\n        line-height: 0 !important;\r\n    }\r\n</style>\r\n<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n\r\n        <div class=\"container x_panel no-border\" *ngIf=\"true\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px;\">\r\n                        <form class=\"form-horizontal form-label-left\" novalidate>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-3 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Item ID/ Assets ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-6\">\r\n                                        <div class=\"input-group\">\r\n                                            <atpar-text [(ngModel)]=\"itemIdSearch\" [name]=\"txtItemId\" [id]=\"'txtItemId'\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'alpha_numeric_underscore_nospace'\" [title]=\"'Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces'\"></atpar-text>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-3 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Serial #</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-6\">\r\n                                        <div class=\"input-group\">\r\n                                            <atpar-text [(ngModel)]=\"serialIdSearch\" [name]=\"txtserialIdSearch\" [id]=\"'txtserialIdSearch'\" (focusout)=\"serialIdCheck()\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'alpha_numeric_underscore_nospace'\" [title]=\"'Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces'\"></atpar-text>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-2 form-group\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"getItem()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                                <div class=\"col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-3 col-sm-6\">Requestor</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-6\">\r\n                                        <atpar-select [id]=\"'ddlrequestor'\" [required]=\"true\" [options]=\"requestorData\" [ngModelOptions]=\"{standalone: true}\" [style]=\"{'width':'100%'}\" [(ngModel)]=\"selectedRequestor\">\r\n                                        </atpar-select>\r\n                                    </div>\r\n                                    <div class=\"col-xs-12 col-sm-12 col-md-3\">\r\n                                        <button class=\"btn btn-purple sbtn\">Check Out</button>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"col-xs-12\" *ngIf=\"pop\">\r\n\r\n                            <ul class=\"list-inline\">\r\n                                <li><i class=\"fa fa-square\" style=\"color:#7cb82f;\"></i> &nbsp; Box Item</li>\r\n                                <li><i class=\"fa fa-square\" style=\"color:#00aeb3;\"></i>  &nbsp; Equipment Item</li>\r\n                                <li><i class=\"fa fa-square\" style=\"color:#de60f5;\"></i>  &nbsp; Furniture Item</li>\r\n                            </ul>\r\n\r\n                            <div class=\"panel panel-default no-shadow bdr-1\">\r\n\r\n                                <div class=\"panel-body\">\r\n\r\n                                    <div class=\"col-xs-12 col-md-5 col-sm-12\">\r\n                                        <table class=\"table table-bordered qty-table\">\r\n                                            <tbody>\r\n                                                <tr>\r\n                                                    <td>Item ID</td>\r\n                                                    <td><p>{{itemDetails.ITEM_ID}}</p></td>\r\n                                                </tr>\r\n                                                <tr>\r\n                                                    <td>Asset ID</td>\r\n                                                    <td><p>{{itemDetails.ITEM_ID}}</p></td>\r\n                                                </tr>\r\n                                                <tr>\r\n                                                    <td>Description</td>\r\n                                                    <td><p>{{itemDetails.ITEM_DESCR}}</p></td>\r\n                                                </tr>\r\n                                                <tr>\r\n                                                    <td>Storage Location</td>\r\n                                                    <td><p>{{itemDetails.DELIVER_LOCATION}}</p></td>\r\n                                                </tr>\r\n                                                <tr>\r\n                                                    <td>Manufacturer</td>\r\n                                                    <td><p>{{itemDetails.MANUFACTURER}}</p></td>\r\n                                                </tr>\r\n                                                <tr>\r\n                                                    <td>Vendor</td>\r\n                                                    <td><p>{{itemDetails.VENDOR}}</p></td>\r\n                                                </tr>\r\n\r\n                                                <tr *ngIf=\"strPatientCharge=='Y'\">\r\n                                                    <td>Select Patien</td>\r\n                                                    <td>\r\n                                                        <a style=\"color:purple;\" class=\"grid-link text-primary\" (click)=\"onClickPatient()\"><u> Select </u></a>  \r\n                                                   </td>\r\n                                                </tr>\r\n\r\n                                                <tr *ngIf=\"strPatientCharge=='Y'\">\r\n                                                    <td>Procedure Code</td>\r\n                                                    <td><p>{{itemDetails.PROCEDURE_CODE}}</p></td>\r\n                                                </tr>\r\n                                                \r\n                                                <tr>\r\n                                                    <td>System Qty</td>\r\n                                                    <td><p>{{itemDetails.ITEM_QTY}}</p></td>\r\n                                                </tr>\r\n                                                <tr class=\"new-ht\">\r\n                                                    <td>Checkout Qty</td>\r\n                                                    <td>\r\n                                                        <div class=\"input-group\" style=\"width:150px;\" *ngIf=\"itemTypeIndicator == 'F'\">\r\n                                                            <span class=\"input-group-addon\" (click)=\"decreaseQuantity()\"> <a class=\"text-default\"> - </a></span>\r\n                                                            <atpar-text [id]=\"'txtQantity'\" [name]=\"txtQantity\" [style]=\"{'height':'34px'}\" [(ngModel)]=\"itemQuantity\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'alpha_numeric_underscore_nospace'\" [title]=\"'Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces'\"></atpar-text>\r\n                                                            <span class=\"input-group-addon\" (click)=\"increaseQuantity()\"> <a class=\"text-default\"> + </a> </span>\r\n                                                        </div>\r\n\r\n                                                        <p>{{itemDetails.ITEM_QTY}}</p>\r\n\r\n                                                    </td>\r\n                                                </tr>\r\n                                                <tr>\r\n                                                    <td>Delivery Location</td>\r\n                                                    <td><atpar-select [options]=\"ddlDeliveryLoc\" [id]=\"'ddlDeliveryLoc'\" [(ngModel)]=\"selectedDeliveryLoc\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select></td>\r\n                                                </tr>\r\n                                                <tr>\r\n                                                    <td colspan=\"2\">\r\n                                                        <button class=\"btn btn-purple sbtn pull-right\" (click)=\"Add()\">Add &nbsp; <i class=\"fa fa-plus\"></i></button>\r\n                                                    </td>\r\n                                                </tr>\r\n                                            </tbody>\r\n                                        </table>\r\n                                    </div>\r\n\r\n                                    <div class=\"col-xs-12 col-md-7 col-sm-12\" *ngIf=\"isAdd\">\r\n                                        <div class=\"panel panel-default no-shadow bdr-1 scrl-pnl\">\r\n                                            <div class=\"panel-body\">\r\n                                                <div class=\"col-xs-12\">\r\n                                                    <div class=\"panel panel-green no-shadow bdr-1\">\r\n                                                        <div class=\"panel-body no-padding\">\r\n                                                            <div class=\"row\">\r\n                                                                <div class=\"col-md-3\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Item ID-Serial#</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-6 border-panel\">\r\n                                                                    <div class=\"row margin-border\">\r\n                                                                        <p>Item Description</p>\r\n                                                                    </div>\r\n                                                                    <div class=\"row\">\r\n                                                                        <div class=\"col-md-6 ten-padding\">\r\n                                                                            <p>Assets Id</p>\r\n                                                                        </div>\r\n                                                                        <div class=\"col-md-6 ten-padding\" style=\"border-left: 1px solid #e1e1e1;\">\r\n                                                                            <p>Storage Location</p>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-2\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Checkin qty</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-1\" style=\"margin-top: 25px;\">\r\n                                                                    <i class=\"fa fa-close fa-bg bg-red danger\"></i>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>\r\n                                                <div class=\"col-xs-12\">\r\n                                                    <div class=\"panel panel-blue no-shadow bdr-1\">\r\n                                                        <div class=\"panel-body no-padding\">\r\n                                                            <div class=\"row\">\r\n                                                                <div class=\"col-md-3\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Item ID-Serial#</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-6 border-panel\">\r\n                                                                    <div class=\"row margin-border\">\r\n                                                                        <p>Item Description</p>\r\n                                                                    </div>\r\n                                                                    <div class=\"row\">\r\n                                                                        <div class=\"col-md-6 ten-padding\">\r\n                                                                            <p>Assets Id</p>\r\n                                                                        </div>\r\n                                                                        <div class=\"col-md-6 ten-padding\" style=\"border-left: 1px solid #e1e1e1;\">\r\n                                                                            <p>Storage Location</p>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-2\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Checkin qty</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-1\" style=\"margin-top: 25px;\">\r\n                                                                    <i class=\"fa fa-close fa-bg bg-red danger\"></i>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>\r\n                                                <div class=\"col-xs-12\">\r\n                                                    <div class=\"panel panel-pink no-shadow bdr-1\">\r\n                                                        <div class=\"panel-body no-padding\">\r\n                                                            <div class=\"row\">\r\n                                                                <div class=\"col-md-3\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Item ID-Serial#</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-6 border-panel\">\r\n                                                                    <div class=\"row margin-border\">\r\n                                                                        <p>Item Description</p>\r\n                                                                    </div>\r\n                                                                    <div class=\"row\">\r\n                                                                        <div class=\"col-md-6 ten-padding\">\r\n                                                                            <p>Assets Id</p>\r\n                                                                        </div>\r\n                                                                        <div class=\"col-md-6 ten-padding\" style=\"border-left: 1px solid #e1e1e1;\">\r\n                                                                            <p>Storage Location</p>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-2\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Checkin qty</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-1\" style=\"margin-top: 25px;\">\r\n                                                                    <i class=\"fa fa-close fa-bg bg-red danger\"></i>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>\r\n                                                <div class=\"col-xs-12\">\r\n                                                    <div class=\"panel panel-blue no-shadow bdr-1\">\r\n                                                        <div class=\"panel-body no-padding\">\r\n                                                            <div class=\"row\">\r\n                                                                <div class=\"col-md-3\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Item ID-Serial#</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-6 border-panel\">\r\n                                                                    <div class=\"row margin-border\">\r\n                                                                        <p>Item Description</p>\r\n                                                                    </div>\r\n                                                                    <div class=\"row\">\r\n                                                                        <div class=\"col-md-6 ten-padding\">\r\n                                                                            <p>Assets Id</p>\r\n                                                                        </div>\r\n                                                                        <div class=\"col-md-6 ten-padding\" style=\"border-left: 1px solid #e1e1e1;\">\r\n                                                                            <p>Storage Location</p>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-2\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Checkin qty</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-1\" style=\"margin-top: 25px;\">\r\n                                                                    <i class=\"fa fa-close fa-bg bg-red danger\"></i>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>\r\n                                                <div class=\"col-xs-12\">\r\n                                                    <div class=\"panel panel-blue no-shadow bdr-1\">\r\n                                                        <div class=\"panel-body no-padding\">\r\n                                                            <div class=\"row\">\r\n                                                                <div class=\"col-md-3\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Item ID-Serial#</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-6 border-panel\">\r\n                                                                    <div class=\"row margin-border\">\r\n                                                                        <p>Item Description</p>\r\n                                                                    </div>\r\n                                                                    <div class=\"row\">\r\n                                                                        <div class=\"col-md-6 ten-padding\">\r\n                                                                            <p>Assets Id</p>\r\n                                                                        </div>\r\n                                                                        <div class=\"col-md-6 ten-padding\" style=\"border-left: 1px solid #e1e1e1;\">\r\n                                                                            <p>Storage Location</p>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-2\">\r\n                                                                    <div class=\"row text-center thirty-padding\">\r\n                                                                        <p>Checkin qty</p>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div class=\"col-md-1\" style=\"margin-top: 25px;\">\r\n                                                                    <i class=\"fa fa-close fa-bg bg-red danger\"></i>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>\r\n                                                <div class=\"clear\"></div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n\r\n                                </div>\r\n\r\n                            </div>\r\n\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"content-section implementation\">\r\n            <atpar-confirmdialog header=\"Confirmation\" icon=\"fa fa-question-circle\" width=\"425\"></atpar-confirmdialog>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n\r\n<div>\r\n    <atpar-growl [value]=\"msgs\" sticky=\"sticky\"></atpar-growl>\r\n</div>\r\n\r\n";

/***/ }),

/***/ 2136:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border:1px #eee\">\r\n                    <div class=\"panel-body\" style=\"padding:0px 0 0 0\">\r\n                        <form class=\"form-horizontal form-label-left\" novalidate>\r\n                            <div class=\"col-xs-12\">\r\n                                <br />\r\n                                <div class=\"pull-right\" id=\"tdExports\" *ngIf=\"tdExports\">\r\n                                    <ul class=\"list-inline\">\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-envelope-o fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgMail\" title=\"Send mail\" style=\"cursor:pointer;\" (click)=\"onSendMailIconClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-print fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgPrint\" title=\"Print\" style=\"cursor:pointer;\" (click)=\"onPrintClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-file-excel-o fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgExcel\" style=\"cursor:pointer;\" title=\"Excel Format\" (click)=\"onExportToExcelClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                    </ul>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-4\">Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <p-calendar [showIcon]=\"true\" [id]=\"'DatePicker'\" [(ngModel)]=\"SelectedDate\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1950:2050\" [placeholder]=\"'From Date'\" [dateFormat]=\"'mm/dd/yy'\" [readonlyInput]=\"true\" [required]=\"true\" [ngModelOptions]=\"{standalone: true}\"></p-calendar>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-6  form-group\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"btnGo_Click()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>   \r\n                            </div>\r\n                        </form>\r\n                        <br />\r\n                        <div class=\"col-xs-12 table-responsive\" *ngIf=\"isVisible\">\r\n                            <div class=\"container\">\r\n                                <atpar-datatable [value]=\"lstDailyActivityDetails\"  [pageLinks]=\"3\" [rows]=\"rowsPerPage\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\" (filteredData)=\"onChargesFilterData($event)\">                                    \r\n                                    <p-column header=\"User\" field=\"USERNAME\"  [style]=\"{'width':'25px','text-align':'center'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column header=\"No Of Locations Delivered To\" field=\"NO_LOCATIONS_DELIVERED\" [style]=\"{'width':'25px','text-align':'center'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column header=\"No Of Items Delivered\" field=\"NO_ITEMS_DELIVERED\" [style]=\"{'width':'25px','text-align':'center'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column header=\"Avg. Time Taken For An Item (Secs)\" field=\"AVG_DELIVER_TIME\"  [style]=\"{'width':'50px','text-align':'center'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>                                    \r\n                                    <p-column header=\"\" [style]=\"{'width':'10px'}\">\r\n                                        <template let-details=\"rowData\" pTemplate type=\"body\">\r\n                                            <a class=\"grid-link\" id=\"lnkbtnDetails\" (click)=\"onDetailsClick(details)\" style=\"cursor:pointer;color:#6c276a;\">Details</a>\r\n                                        </template>\r\n                                    </p-column>                                    \r\n                                </atpar-datatable>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>   \r\n</div>\r\n\r\n<atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n\r\n<mail-dialog header=\"Enter Recipient`s Email Address\" [width]=\"450\" (onClose)=\"closeMailPopup()\" [(visible)]=\"isMailDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\r\n    <div class=\"ui-grid ui-grid-responsive ui-fluid\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                <span>To : </span>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-8 col-xs-8\">\r\n                <atpar-text [(ngModel)]=\"toMailAddr\" [name]=\"txtToMailAddr\" [id]=\"'txtToMailAddr'\"></atpar-text>\r\n            </div>\r\n            <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                <span><button class=\"btn btn-purple sbtn\" (click)=\"onSendMailClick()\">Send &nbsp;<i class=\"fa fa-share-square-o\" aria-hidden=\"true\"></i></button> </span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</mail-dialog>\r\n\r\n<style>\r\n    .modal-content {\r\n        top: 50% !important;\r\n    }\r\n</style>\r\n";

/***/ }),

/***/ 2137:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>this is trackit daily user activity screen.</span>\r\n</div>";

/***/ }),

/***/ 2138:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:10px 0px 10px 0px;\">\r\n                        <form class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"pull-right\" id=\"tdExports\" *ngIf=\"showexport\">\r\n                                    <ul class=\"list-inline\">\r\n                                        <li class=\"no-padding\" style=\"cursor:pointer\">\r\n                                            <i class=\"fa fa-envelope-o fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgMail\" title=\"Send mail\"  (click)=\"onSendMailIconClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                        <li class=\"no-padding\" style=\"cursor:pointer\">\r\n                                            <i class=\"fa fa-print fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgPrint\" title=\"Print\" (click)=\"onPrintClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                        <li class=\"no-padding\" style=\"cursor:pointer\">\r\n                                            <i class=\"fa fa-file-excel-o fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgExcel\" title=\"Excel Format\" (click)=\"onExportToExcelClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                    </ul>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Request#</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"PoId\" [id]=\"'Request'\" [name]=\"'request'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Recipient</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"Recipient\" [id]=\"'Recipient'\" [name]=\"'recipient'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Location</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"Location\" [id]=\"'location'\" [name]=\"'location'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Vendor Name</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"VendorName\" [id]=\"'OrderNo'\" [name]=\"'vendorName'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">User ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n\r\n                                        <atpar-select [options]=\"lstUsers\" [id]=\"'ddlUser'\" [required]=\"false\" [(ngModel)]=\"userId\" [ngModelOptions]=\"{standalone: true}\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Requestor ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstRequestor\" [id]=\"'ddlRequestor'\" [required]=\"false\" [(ngModel)]=\"selectedRequestor\" [ngModelOptions]=\"{standalone: true}\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Desc</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"ItmDesc\" [id]=\"'OrderNo'\" [name]=\"'descr'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">ItemID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"ItemId\" [id]=\"'OrderNo'\" [name]=\"'itemId'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Department ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstDeptDetails\" [id]=\"'ddlDepartment'\" [required]=\"false\" [(ngModel)]=\"selectedDeptID\" [ngModelOptions]=\"{standalone: true}\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n\r\n                            </div>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Status</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstStatus\" [id]=\"'ddlStatus'\" [required]=\"false\" [(ngModel)]=\"selectedStatus\" [ngModelOptions]=\"{standalone: true}\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">From Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <p-calendar [showIcon]=\"true\" [id]=\"'fromDate'\" [(ngModel)]=\"fromDate\" [placeholder]=\"'From Date'\" [dateFormat]=\"'mm/dd/yy'\" [required]=\"true\" [readonlyInput]=\"true\" [ngModelOptions]=\"{standalone: true}\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1950:2050\"></p-calendar>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">To Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <p-calendar [showIcon]=\"true\" [id]=\"'toDate'\" [(ngModel)]=\"toDate\" [placeholder]=\"'To Date'\" [dateFormat]=\"'mm/dd/yy'\" [required]=\"true\" [readonlyInput]=\"true\" [ngModelOptions]=\"{standalone: true}\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1950:2050\"></p-calendar>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 col-md-offset-5\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"getDeliveryDetails()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n\r\n                        </form>\r\n\r\n                        <div class=\"col-xs-12 table-responsive\" id=\"Exportdiv\" *ngIf=\"showGrid\">\r\n                            <atpar-datatable [value]=\"deliverHeaders\" [paginator]=\"true\" id=\"DelvTable\" [pageLinks]=\"3\" [rows]=\"deliverDetailRows\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\" (filteredData)=\"onDeliverFilterData($event)\" resizableColumns=\"true\">\r\n\r\n                                <p-column header=\"Transaction ID\" field=\"TRANS_ID\" *ngIf=\"false\"></p-column>\r\n                                <p-column expander=\"true\" styleClass=\"col-icon\"  [style]=\"{'width':'35px'}\"></p-column>\r\n                                <p-column header=\"Request# - Desc\" field=\"ORDER_NO\"  [style]=\"{'width':'150px'}\" [sortable]=\"true\" [filter]=\"true\">\r\n                                    <template let-heddetail=\"rowData\" pTemplate=\"body\">\r\n                                        <span style=\"float:left\">{{heddetail.ORDER_NO}}</span>\r\n                                        <span>-</span>\r\n                                        <span>{{heddetail.REPORT_DATA_8}}</span>\r\n                                    </template>\r\n                                </p-column>\r\n                                <p-column header=\"Location\" field=\"LOCATION\" [style]=\"{'width':'150px'}\"  [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"Vendor Name\" field=\"VENDOR_NAME\"  [style]=\"{'width':'150px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"Requestor\" field=\"DELIVERED_TO\"  [style]=\"{'width':'150px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"Status\" field=\"STATUS\"  [style]=\"{'width':'120px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"Department ID\" field=\"REPORT_DATA_25\"  [style]=\"{'width':'100px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                 <template let-header pTemplate=\"rowexpansion\">\r\n                                   <atpar-datatable [value]=\"header.DETAILS\" [paginator]=\"false\" [pageLinks]=\"3\" [rows]=\"5\" expandableRows=\"true\" [rowsPerPageOptions]=\"[5,10,20]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n                                        <p-column header=\"Event\" field=\"EVENT_STATUS_MESSAGE\" [style]=\"{'width':'120px'}\"></p-column>\r\n                                        <p-column header=\"Event Date\" field=\"UPDATE_DATE\" [style]=\"{'width':'150px'}\"></p-column>\r\n                                        <p-column header=\"User\" field=\"USERNAME\" [style]=\"{'width':'150px'}\"></p-column>\r\n                                        <p-column header=\"Recipient\" field=\"RECEPIENT\" [style]=\"{'width':'120px'}\"></p-column>                                      \r\n                                        <p-column header=\"Signature\" field=\"SIGNATURE_ID\">\r\n                                            <template let-col let-ven=\"rowData\" pTemplate=\"body\">\r\n\r\n                                                <img src=\"data:image/jpg;base64,{{ven.SIGNATURE_ID}}\" *ngIf=\"ven.EVENT_STATUS_MESSAGE=='Deliver'?true:false\">\r\n                                            </template>\r\n\r\n                                        </p-column>\r\n                                    </atpar-datatable>                               \r\n                                   \r\n                                </template>\r\n                            </atpar-datatable>\r\n                        </div>\r\n\r\n                        <div class=\"popUp\">\r\n                            <mail-dialog header=\"Enter Recipient`s Email Address\" [width]=\"450\" (onClose)=\"closeMailPopup()\" [(visible)]=\"isMailDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\r\n                                <div class=\"ui-grid ui-grid-responsive ui-fluid\">\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                                            <span>To : </span>\r\n                                        </div>\r\n                                        <div class=\"col-lg-6 col-md-6 col-sm-8 col-xs-8\">\r\n                                            <atpar-text [(ngModel)]=\"toMailAddr\" [name]=\"txtToMailAddr\" [id]=\"'txtToMailAddr'\"></atpar-text>\r\n                                        </div>\r\n                                        <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                                            <span><button class=\"btn btn-purple sbtn\" (click)=\"onSendMailClick()\">Send &nbsp;<i class=\"fa fa-share-square-o\" aria-hidden=\"true\"></i></button> </span>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </mail-dialog>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<style>\r\n     /* [style]=\"{'width':'50%','position':'absolute','left':'50%','top':'50%','transform':'translate(-50%, -50%)'}\"\r\n    */\r\n     img.gray-icon-img:hover {\r\n         filter: grayscale(0);\r\n         transition-property: filter;\r\n         transition-duration: 1s;\r\n         background: purple;\r\n         -webkit-filter: grayscale(0%) brightness(122%) contrast(478%);\r\n         /*-webkit-filter: sepia(100%);\r\n     background: transparent;*/\r\n     }\r\n\r\n     .popUp {\r\n         /*width:50%!important;\r\n     position: absolute !important;\r\n     left: 50% !important;\r\n     top: 0% !important;\r\n     transform: translate(-50%, -50%) !important;*/\r\n     }\r\n</style>\r\n<style>\r\n    .modal-content {\r\n        top: 50% !important;\r\n    }\r\n</style>";

/***/ }),

/***/ 2139:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>this is trackit destruction report screen.</span>\r\n</div>";

/***/ }),

/***/ 2140:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>this is trackit equipment tracking report screen.</span>\r\n</div>";

/***/ }),

/***/ 2141:
/***/ (function(module, exports) {

module.exports = "\r\n<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px 0 10px 0;\">\r\n                        <form class=\"form-horizontal form-label-left\" novalidate>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Select Indicator</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"indicatorType\" [(ngModel)]=\"selectedIndicator\" [id]=\"'ddlErpsy'\" [ngModelOptions]=\"{standalone: true}\" [required]=\"true\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Destruction Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <p-calendar [showIcon]=\"true\" [id]=\"'destructionDatePicker'\" [required]=\"true\" (onBlur)=\"validateDestructionDate()\" [(ngModel)]=\"destructionDate\" [minDate]=\"minDateValue1\" [ngModelOptions]=\"{standalone: true}\"></p-calendar>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"getItemsToInActivate()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"col-xs-12\" *ngIf=\"isVisible\">\r\n                            <div class=\"container\">\r\n                                <atpar-datatable [value]=\"lstDBData\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"pazeSize\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\" (filteredData)=\"filterdata($event)\">\r\n                                    <p-column field=\"ITEM_TYPE\" header=\"Equipment Type\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'12%'}\"></p-column>\r\n                                    <p-column field=\"ITEM_ID\" header=\"Item ID\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'12%'}\"></p-column>\r\n                                    <p-column field=\"ITEM_DESCR\" header=\"Description\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'18%'}\"></p-column>\r\n                                    <p-column field=\"STORAGE_LOCATION\" header=\"Storage Location\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'10%'}\"></p-column>\r\n                                    <p-column field=\"DESTRUCTION_DATE\" header=\"Destruction Date\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'8%'}\"></p-column>\r\n                                    <p-column field=\"COMMENTS\" header=\"Comments\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'18%'}\"></p-column>\r\n                                    <p-column [style]=\"{'width':'7%', 'text-align':'center'}\" header=\"Select\">\r\n                                        <template pTemplate=\"filter\" let-col>\r\n                                            <ul class=\"list-inline li-all-none\">\r\n                                                <li>\r\n\r\n                                                    <span (click)=\"checkAll()\" style=\"cursor:pointer\">All</span>\r\n                                                </li> |\r\n                                                <li>\r\n                                                    <span (click)=\"unCheckAll()\" style=\"cursor:pointer\">None</span>\r\n\r\n                                                </li>\r\n                                            </ul>\r\n                                        </template>\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <atpar-switch (change)=\"selectedRow(ven,$event)\" [(ngModel)]=\"ven.checkvalue\"></atpar-switch>\r\n                                        </template>\r\n                                    </p-column>\r\n                                </atpar-datatable>\r\n                                <br />\r\n                                <div class=\"col-md-4 col-md-offset-5 col-sm-6 col-sm-offset-5 col-xs-12\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"inactivateItems()\" type=\"button\">Update &nbsp;<i class=\"fa fa-check\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n\r\n\r\n";

/***/ }),

/***/ 2142:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>This is trackit item master report screen.</span>\r\n</div>";

/***/ }),

/***/ 2143:
/***/ (function(module, exports) {

module.exports = "<!--<div>\r\n    <span>This is trackit Manage departments screen.</span>\r\n</div>-->\r\n<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px 0 10px 0;\">\r\n                        <div class=\"container\">\r\n                            <form class=\"form-horizontal form-label-left\" *ngIf=\"showAddButton\">\r\n                                <div class=\"form-group\">\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-4\">\r\n                                        <atpar-text [(ngModel)]=\"departmentIDSearch\" [name]=\"txtdepartmentID\" [validations]=\"'except_less_greater_symbols'\" [id]=\"'departmentIdSearch'\" [ngModelOptions]=\"{standalone: true}\" [placeholder]=\"'Department / Description'\"></atpar-text>\r\n                                    </div>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-4\">\r\n                                        <button type=\"button\" class=\"btn btn-purple sbtn\" name=\"btnGo\" (click)=\"BindGrid()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                        <button type=\"button\" class=\"btn btn-purple sbtn\" name=\"btnAdd\" (click)=\"adddepartment()\">Add Department &nbsp;<i class=\"fa fa-plus\"></i></button>\r\n                                    </div>\r\n                                </div>\r\n                            </form>\r\n                        </div>\r\n                        <div class=\"col-xs-12\" *ngIf=\"table\">\r\n                            <div class=\"container\">\r\n                                <atpar-datatable [value]=\"lstDepts\" [paginator]=\"true\" #dt [pageLinks]=\"3\" [rows]=\"pageSize\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n\r\n                                    <p-column field=\"\" header=\"Action\" [style]=\"{'width':'4%','text-align':'center'}\">\r\n                                        <template let-dept=\"rowData\" pTemplate=\"body\">\r\n                                            <i class=\"fa fa-pencil fa-bg bg-red\" title=\"Edit\" (click)=\"edit(dept)\" style=\"cursor:pointer;\"></i>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"ORG_GROUP_ID\" header=\"Org Group ID\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width': '10%'}\"></p-column>\r\n                                    <p-column field=\"DEPT_ID\" header=\"Department ID\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width': '22%'}\"></p-column>\r\n                                    <p-column field=\"DESCRIPTION\" header=\"Description\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"checkvalue\" header=\"Status\" [filter]=\"true\" [style]=\"{'width': '8%','overflow':'visible','text-align':'center'}\" filterMatchMode=\"equals\">\r\n                                        <template pTemplate=\"filter\" let-col>\r\n                                            <atpar-select [options]=\"ddlStatusType\" [(ngModel)]=\"statusType\" [style]=\"{'width':'100%'}\" [id]=\"'ddlddlStatusType'\" [required]=\"false\" \r\n                                                          \r\n                                                                         (onChange)=\"dataFilter($event.value,col.field,col.filterMatchMode)\"\r\n                                                        ></atpar-select>\r\n                                            <!--(onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\"-->\r\n                                        </template>\r\n                                        <template let-col let-dept=\"rowData\" pTemplate=\"body\">\r\n                                            <!--<atpar-switch name=\"changeStatus\" [(ngModel)]=\"dept.checkvalue\" (change)=\"changeStatus(dept)\"></atpar-switch>-->\r\n                                            <atpar-switch name=\"changeStatus\" [(ngModel)]=\"dept.checkvalue\" [checked]=dept[col.field] (change)=\"changeStatus(dept)\"></atpar-switch>\r\n                                        </template>\r\n                                    </p-column>\r\n                                </atpar-datatable> \r\n                            </div>\r\n                            <br>\r\n\r\n                        </div>\r\n                        <div class=\"col-md-12\" *ngIf=\"form\">\r\n                            <form class=\"form-horizontal form-label-left\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Org Group ID</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpId}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [isfocus]=\"blnShowOrgGroupDD\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupDD\" (onChange)=\"ddlOrgIDChanged()\" [selectOnKeyPress]=\"true\"></atpar-select>\r\n\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Department ID</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-text [id]=\"'txtDeptID'\" [name]=\"txtDeptID\" [(ngModel)]=\"newItem.DEPT_ID\" *ngIf=\"!blnShowOrgGroupDD && !showLable\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'mandatory,max=50,alpha_numeric_underscore_nospace'\" [title]=\"'Dept ID - Allows alphabets,numbers and underscore(_)'\" (bindModelDataChange)=\"bindModelDataChange($event)\" [isFocused]=\"'true'\"></atpar-text>\r\n                                        <atpar-text [id]=\"'txtDeptID'\" [name]=\"txtDeptID\" [(ngModel)]=\"newItem.DEPT_ID\" *ngIf=\"blnShowOrgGroupDD && !showLable\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'mandatory,max=50,alpha_numeric_underscore_nospace'\" [title]=\"'Dept ID - Allows alphabets,numbers and underscore(_)'\" (bindModelDataChange)=\"bindModelDataChange($event)\" ></atpar-text>\r\n                                        <label class=\"control-label lbl-left\" *ngIf=\"showLable\">{{newItem.DEPT_ID}}</label>\r\n                                    </div>\r\n                                </div>\r\n                               \r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Description</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-text [id]=\"'txtDesc'\" [name]=\"txtDesc\" [(ngModel)]=\"newItem.DESCRIPTION\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'mandatory,max=50,everything_except_space_as_fstchar'\" [title]=\"'Dept Desc - Allows any character A-Z,a-z,0-9,!,#,$...'\" (bindModelDataChange)=\"bindModelDataChange($event)\" *ngIf=\"showTextBox\"></atpar-text>\r\n                                        <atpar-text [id]=\"'txtDesc'\" [name]=\"txtDesc\" [(ngModel)]=\"newItem.DESCRIPTION\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'mandatory,max=50,everything_except_space_as_fstchar'\" [title]=\"'Dept Desc - Allows any character A-Z,a-z,0-9,!,#,$...'\" (bindModelDataChange)=\"bindModelDataChange($event)\" *ngIf=\"!showTextBox\" [isFocused]=\"'true'\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-md-4 col-md-offset-5 col-sm-6 col-sm-offset-5 col-xs-12\">\r\n                                    <button class=\"btn btn-purple sbtn\" type=\"button\" [disabled]=\"loading\" (click)=\"saveOrUpdateDepartment()\">{{Title}} &nbsp;<i class=\"fa fa-{{bindSymbal}}\"></i></button>\r\n                                    <button class=\"btn btn-purple sbtn\" type=\"button\" (click)=\"close()\"><i class=\"fa fa-arrow-left\"></i> &nbsp;Go Back</button>\r\n                                </div>\r\n                            </form>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n</div>\r\n";

/***/ }),

/***/ 2144:
/***/ (function(module, exports) {

module.exports = "<!--<div>\r\n    <span>This is trackit Manage equipment items screen.</span>\r\n</div>-->\r\n<div id=\"main\" class=\"content-page\">\r\n\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:10px 0px 10px 0px;\">\r\n\r\n                        <form class=\"form-horizontal form-label-left\" *ngIf=\"page\">\r\n                           \r\n                            <div class=\"col-xs-12 col-lg-12 col-sm-12 col-md-12\">\r\n                                <div class=\"row\">\r\n\r\n\r\n                                    <div class=\"col-xs-12 col-sm-12 col-md-6 form-group\">\r\n                                        <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\"> Org Group ID</label>\r\n                                        <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                            <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpIDData}}</label>\r\n                                            <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupDD\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                        </div>\r\n                                    </div>\r\n\r\n                                    <div class=\"col-xs-12 col-sm-12 col-md-6 form-group\">\r\n\r\n\r\n                                        <div class=\"col-xs-12\">\r\n                                            <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Item ID/Asset ID</label>\r\n                                            <div class=\"col-xs-12 col-md-6 col-sm-6\">\r\n                                                <atpar-ac-server [(ngModel)]=\"selectedItemAsset\" \r\n                                                                   [ngModelOptions]=\"{standalone: true}\"\r\n                                                                  [mandatory]=\"'true'\"\r\n                                                                  [id]=\"'itemidassetid'\"  \r\n                                                                  [suggestions]=\"lstFilteredItems\" (completeMethod)=\"fillItemsAuto($event)\"></atpar-ac-server>\r\n                                            \r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"clearfix\"></div>\r\n                                        <br>\r\n\r\n                                        <div class=\"col-xs-12\">\r\n                                            <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Description/Comments</label>\r\n                                            <div class=\"col-xs-12 col-md-6 col-sm-6\">\r\n\r\n\r\n                                                <atpar-text [(ngModel)]=\"enteredDescription\" [name]=\"txtenteredDescription\" [validations]=\"'except_less_greater_symbols'\" [id]=\"'txtenteredDescription'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n\r\n                                            \r\n                                            </div>\r\n                                            <div class=\"col-xs-12 col-sm-6 col-md-2\">\r\n                                                <button class=\"btn btn-purple sbtn\" (click)=\"search()\">Search &nbsp; <i class=\"fa fa-search\"></i></button>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n\r\n\r\n                                        <div class=\"col-xs-12 col-sm-12 col-md-6 form-group\">\r\n                                            <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Equipment Type</label>\r\n                                            <div class=\"col-xs-12 col-sm-6 col-md-6\">\r\n                                                <atpar-select [options]=\"lstEquipmentTypes\" [(ngModel)]=\"selectedEquipmentType\" [id]=\"'ddlEquipmentType'\" filter=\"filter\" (onChange)=\"ddlEquipmentTypeChanged()\" [ngModelOptions]=\"{standalone: true}\"></atpar-select>\r\n                                            </div>\r\n                                            <div class=\"col-xs-12 col-sm-6 col-md-2\">\r\n                                                <button class=\"btn btn-purple sbtn\" (click)=\"addNewItem()\">Add New Item &nbsp; <i class=\"fa fa-plus\"></i></button>\r\n                                            </div>\r\n                                        </div>\r\n\r\n                                    </div>\r\n\r\n                                    <div class=\"row\">\r\n\r\n                                        <div class=\"col-xs-12 col-sm-12 col-md-6 form-group\">\r\n                                            <div class=\"col-xs-12\">\r\n                                                <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Item ID/Asset ID</label>\r\n                                                <div class=\"col-xs-12 col-md-6 col-sm-6\">\r\n\r\n\r\n                                                    <atpar-select [options]=\"lstItemDetails\" (onChange)=\"ddlItemIDsChanged()\" [(ngModel)]=\"selectedItemID\" [id]=\"'ddlItemIDs'\" filter=\"filter\" [ngModelOptions]=\"{standalone: true}\"></atpar-select>\r\n\r\n\r\n                                                </div>\r\n                                                <div class=\"col-xs-12 col-sm-6 col-md-2\">\r\n\r\n                                                    <button class=\"btn btn-purple sbtn\" (click)=\"btnGo_Click()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n\r\n                                                    <!--<button class=\"btn btn-purple sbtn\" (click)=\"btnGo_Click()\"> &nbsp;<i class=\"fa fa-arrow-right\"></i>Go</button>-->\r\n                                                </div>\r\n                                            </div>\r\n\r\n                                            <div class=\"clearfix\"></div>\r\n                                            <br>\r\n                                        </div>\r\n\r\n                                    </div>\r\n                                </div>\r\n\r\n                            </div>\r\n                        </form>\r\n\r\n\r\n                        <div class=\"col-xs-12 table-responsive \">\r\n\r\n                           \r\n\r\n                            <div class=\"col-xs-12 table-responsive \">\r\n\r\n                                <div class=\"container\" *ngIf=\"showCommentsGrid\">\r\n\r\n                                    <atpar-datatable [value]=\"tkitEquipmentItemDetailsList\" [paginator]=\"true\" [pageLinks]=\"3\" (filteredData)=\"filterdata($event)\" [rows]=\"pazeSize\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n\r\n\r\n                                        <p-column field=\"\" header=\"\" [style]=\"{'width':'6%'}\">\r\n                                            <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                                <i class=\"fa fa-pencil fa-bg bg-red\" (click)=\"editItemDetails(ven)\"></i>\r\n                                            </template>\r\n                                        </p-column>\r\n\r\n                                        <p-column field=\"ITEM_TYPE\" header=\"Equipment Type\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n\r\n                                        <p-column field=\"ITEM_ID\" header=\"ItemID\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\">\r\n                                            <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                                <a style=\"cursor:pointer\" (click)=\"add()\">{{ven.ITEM_ID}}</a>\r\n                                            </template>\r\n                                        </p-column>\r\n\r\n                                        <p-column field=\"ITEM_DESCR\" header=\"Description\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n\r\n\r\n                                        <p-column field=\"COMMENTS\" header=\"Comments\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n\r\n                                    </atpar-datatable>\r\n                                </div>\r\n\r\n                            </div>\r\n\r\n                        </div>\r\n\r\n\r\n                        <div class=\"col-md-12\" *ngIf=\"showitemdetailsFields\">\r\n                            <form class=\"form-horizontal form-label-left\">\r\n                                <div class=\"pull-left col-md-4\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-4 col-sm-4 col-xs-12\">Equipment Type</label>\r\n                                    <div class=\"col-md-4 col-sm-4 col-xs-12\">\r\n                                        <label class=\"control-label lbl-left\">Operation Table</label>\r\n                                    </div>\r\n                                </div>\r\n                                <button *ngIf=\"showAddSerailbutton\" class=\"btn btn-purple sbtn pull-right\" (click)=\"addNewserials()\" style=\"margin-right:10px;\">Add Serial &nbsp; <i class=\"fa fa-plus\"></i></button>\r\n                                <br>\r\n                                <div class=\"col-md-12 col-sm-12\">\r\n                                    <div class=\"col-lg-6 col-md-6 col-sm-12\">\r\n                                        <div class=\"form-group\">\r\n                                            <label for=\"test_step_element_id\" class=\"control-label col-md-4 col-sm-4 col-xs-12\">Item ID</label>\r\n                                            <div class=\"col-md-4 col-sm-4 col-xs-12\">\r\n                                                <atpar-text [id]=\"'txtItemDvalue'\"\r\n                                                            [name]=\"txtItemDvalue\"\r\n                                                            [disabled]=\"newItem.Disable\"\r\n                                                            [(ngModel)]=\"newItem.ITEM_ID\"\r\n                                                            \r\n                                                            [ngModelOptions]=\"{standalone: true}\"\r\n                                                            [validations]=\"'mandatory,max=16,alpha_numeric_underscore_nospace'\"\r\n                                                            [title]=\"'Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces'\"\r\n                                                            (bindModelDataChange)=\"bindModelDataChange($event)\"></atpar-text>\r\n\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"form-group\">\r\n                                            <label for=\"test_step_element_id\" class=\"control-label col-md-4 col-sm-4 col-xs-12\">Storage Location</label>\r\n                                            <div class=\"col-md-4 col-sm-4 col-xs-12\">\r\n                                                <atpar-text [id]=\"'txtStoragelocation'\"\r\n                                                            [name]=\"txtStoragelocation\"\r\n                                                            [(ngModel)]=\"newItem.STORAGE_LOCATION\"\r\n                                                            [ngModelOptions]=\"{standalone: true}\"\r\n                                                            [validations]=\"'mandatory,max=16,alpha_numeric_underscore_nospace'\"\r\n                                                            [title]=\"'Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces'\"\r\n                                                            (bindModelDataChange)=\"bindModelDataChange($event)\"></atpar-text>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"form-group\" *ngIf=\"showMfrColumn\">\r\n                                            <label for=\"test_step_element_id\" class=\"control-label col-md-4 col-sm-4 col-xs-12\">Manufacturer</label>\r\n                                            <div class=\"col-md-4 col-sm-4 col-xs-12\">\r\n                                                <atpar-text [id]=\"'txtManu'\"\r\n                                                            [name]=\"txtManu\"\r\n                                                            [(ngModel)]=\"newItem.MANUFACTURER\"\r\n                                                            [ngModelOptions]=\"{standalone: true}\"\r\n                                                            [validations]=\"'max=16,alpha_numeric_underscore_nospace'\"\r\n                                                            [title]=\"'Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces'\"></atpar-text>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"form-group\">\r\n                                            <label for=\"test_step_element_id\" class=\"control-label col-md-4 col-sm-4 col-xs-12\">Owner</label>\r\n                                            <div class=\"col-md-4 col-sm-4 col-xs-12\">\r\n\r\n                                                <atpar-select [options]=\"lstOwnerDetails\" (onChange)=\"ddlOwnerChanged()\" [(ngModel)]=\"selectedOwner\" [id]=\"'ddlOWNER'\" filter=\"filter\" [ngModelOptions]=\"{standalone: true}\"></atpar-select>\r\n\r\n\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"form-group\">\r\n                                            <label for=\"test_step_element_id\" class=\"control-label col-md-4 col-sm-4 col-xs-12\">Comments</label>\r\n                                            <div class=\"col-md-4 col-sm-4 col-xs-12\">\r\n                                                <textarea [id] =\"'txtcomments'\" name=\"txtcomments\" [(ngModel)]=\"newItem.COMMENTS\" class=\"form-control\" style=\"resize: none; z-index: 3; position: relative; line-height: 20px; font-size: 14px; transition: none; background: transparent !important;\">{{newItem.COMMENTS}}</textarea>\r\n                                            </div>\r\n                                        </div>\r\n\r\n                                        <div class=\"form-group\" *ngIf=\"showDestructionColumn\">\r\n                                            <label for=\"test_step_element_id\" class=\"control-label col-md-4 col-sm-4 col-xs-12\">Destruction / Max Storage Date</label>\r\n                                            <div class=\"col-md-4 col-sm-4 col-xs-12\">\r\n\r\n\r\n                                                <p-calendar [showIcon]=\"true\"\r\n                                                            [id]=\"'MaxStorageDater'\"\r\n                                                            [(ngModel)]=\"newItem.DESTRUCTION_DATE\"\r\n                                                            [required]=\"true\"\r\n                                                            [monthNavigator]=\"true\" \r\n                                                            [yearNavigator]=\"true\" \r\n                                                            yearRange=\"2000:2030\"\r\n                                                            [placeholder]=\"'From Date'\"\r\n                                                            [readonlyInput]=\"true\"\r\n                                                            (onFocus)=\"onfocusToCalendar($event)\"\r\n                                                            [ngModelOptions]=\"{standalone: true}\"\r\n                                                            [dateFormat]=\"'mm/dd/yy'\"></p-calendar>\r\n\r\n\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-lg-6 col-md-6 col-sm-12\">\r\n                                        <div class=\"form-group\">\r\n                                            <label for=\"test_step_element_id\" class=\"control-label col-md-4 col-sm-4 col-xs-12\">Description</label>\r\n                                            <div class=\"col-md-4 col-sm-4 col-xs-12\">\r\n                                                <atpar-text [id]=\"'txtDescription'\"\r\n                                                            [name]=\"txtDescription\"\r\n                                                            [(ngModel)]=\"newItem.ITEM_DESCR\"\r\n                                                            [ngModelOptions]=\"{standalone: true}\"\r\n                                                            [validations]=\"'mandatory,max=50,everything_except_space_as_fstchar'\"\r\n                                                            [title]=\"'Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces'\"\r\n                                                            (bindModelDataChange)=\"bindModelDataChange($event)\"></atpar-text>\r\n\r\n                                            </div>\r\n                                        </div>\r\n\r\n                                        <div class=\"form-group\" *ngIf=\"showVendorColumn\">\r\n                                            <label for=\"test_step_element_id\" class=\"control-label col-md-4 col-sm-4 col-xs-12\">Vendor</label>\r\n                                            <div class=\"col-md-4 col-sm-4 col-xs-12\">\r\n                                                <atpar-select [options]=\"lstVendorDetails\" (onChange)=\"ddlvendorChanged()\" [(ngModel)]=\"selectedVendor\" [id]=\"'ddlVENDOR'\" filter=\"filter\" [ngModelOptions]=\"{standalone: true}\"></atpar-select>\r\n                                                <!--<atpar-text [id]=\"'txtvendor'\"\r\n                                                            [name]=\"txtvendor\"\r\n                                                            [(ngModel)]=\"newItem.VENDOR\"\r\n                                                            [ngModelOptions]=\"{standalone: true}\"\r\n                                                            [validations]=\"'max=16,alpha_numeric_underscore_nospace'\"\r\n                                                            [title]=\"'Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces'\"></atpar-text>-->\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"form-group\">\r\n                                            <label for=\"test_step_element_id\" class=\"control-label col-md-4 col-sm-4 col-xs-12\">Owner Type</label>\r\n                                            <div class=\"col-md-4 col-sm-4 col-xs-12\">\r\n\r\n                                                <atpar-select [options]=\"lstOwnerType\"  (onChange)=\"ddlOwnerTypeChanged()\" [(ngModel)]=\"selectedOwnerType\" [id]=\"'ddlOWNERTYPE'\" filter=\"filter\" [ngModelOptions]=\"{standalone: true}\"></atpar-select>\r\n\r\n\r\n                                            </div>\r\n                                        </div>\r\n\r\n                                        <div class=\"form-group\" *ngIf=\"showDepartmentsColumn\">\r\n                                            <label for=\"test_step_element_id\" class=\"control-label col-md-4 col-sm-4 col-xs-12\">Requesting Department</label>\r\n\r\n\r\n                                            <atpar-listbox [options]=\"lstDeptDetails\" [(ngModel)]=\"selectedDeptIDs\" (onChange)=\"ddlDeptIDChanged()\"   multiple=\"multiple\" [id]=\"'ddldd'\"  checkbox=\"checkbox\" filter=\"filter\" [ngModelOptions]=\"{standalone: true}\"></atpar-listbox>\r\n\r\n\r\n                                            <!--<atpar-multiSelect [options]=\"lstDeptDetails\" [(ngModel)]=\"selectedDeptIDs\" (onChange)=\"ddlDeptIDChanged()\"  [id]=\"'ddldd'\"   [ngModelOptions]=\"{standalone: true}\"></atpar-multiSelect>-->\r\n\r\n                                        </div>\r\n\r\n\r\n                                        <div class=\"form-group\" *ngIf=\"showImageColumn\">\r\n                                            <label for=\"test_step_element_id\" class=\"control-label col-md-4 col-sm-4 col-xs-12\">Image</label>\r\n\r\n\r\n                                            <div class=\"col-md-4 col-sm-4 col-xs-12\">\r\n\r\n                                                <img *ngIf=\"newItem.showImage\" [src]=\"newItem.IMAGE_PATH\"  style=\"width:20px; height:20px\">\r\n\r\n                                                <div class=\"input-group image-preview \">\r\n                                                    <input class=\"form-control image-preview-filename\" disabled=\"disabled\" placeholder=\"No File Chosen\" type=\"text\" title=\"{{userSelectedFile}}\" [(ngModel)]=\"userSelectedFile\" [ngModelOptions]=\"{standalone: true}\">\r\n                                                    <span class=\"input-group-btn\">\r\n                                                        <button class=\"btn btn-default image-preview-clear\" style=\"display:none;\" type=\"button\"> <span class=\"glyphicon glyphicon-remove\"></span> Clear </button>\r\n                                                        <div class=\"btn btn-default image-preview-input\">\r\n                                                            <span class=\"glyphicon glyphicon-folder-open\"></span> <span class=\"image-preview-input-title\">Browse</span>\r\n                                                            <input type=\"file\" id=\"FileImage\" accept=\"image/*\" (change)=\"fileUpload($event)\" name=\"input-file-preview\" />\r\n                                                        </div>\r\n                                                    </span>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n\r\n\r\n                                        <div class=\"form-group\">\r\n                                            <div *ngIf=\"showQuantityColumn\">\r\n                                            <label  for=\"test_step_element_id\" class=\"control-label col-md-4 col-sm-4 col-xs-12\">Quantity</label>\r\n                                                <div class=\"col-md-4 col-sm-4 col-xs-12\">\r\n                                                    <atpar-text\r\n                                                                [id]=\"'txtQuantity'\" [name]=\"txtQuantity\"\r\n                                                                [(ngModel)]=\"newItem.ITEM_QTY\"\r\n                                                                [ngModelOptions]=\"{standalone: true}\"\r\n                                                                [validations]=\"'mandatory,max=16,numeric'\"\r\n                                                                [title]=\"'Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces'\"\r\n                                                                (bindModelDataChange)=\"bindModelDataChange($event)\">\r\n\r\n                                                    </atpar-text>\r\n                                                </div>\r\n                                            </div>\r\n\r\n\r\n                                            <div  *ngIf=\"showQuantityLabel\">\r\n\r\n                                                <label for=\"test_step_element_id\" class=\"control-label col-md-4 col-sm-4 col-xs-12\">Quantity</label>\r\n                                                <div class=\"col-md-4 col-sm-4 col-xs-12\">\r\n\r\n                                                    <label for=\"test_step_element_id\" class=\"control-label col-md-4 col-sm-4 col-xs-12\">{{newItem.ITEM_QTY}}</label>\r\n                                                   \r\n                                                </div>\r\n                                            </div>\r\n\r\n                                            <label for=\"test_step_element_id\" class=\"control-label col-md-2 col-sm-2 col-xs-12\">Inactivate Item</label>\r\n                                            <div class=\"col-md-2 col-sm-2 col-xs-12\">\r\n                                                <atpar-switch [(ngModel)]=\"newItem.ITEM_INACTIVATED\" (change)=\"ItemActiveInActive(newItem,$event)\" [ngModelOptions]=\"{standalone: true}\"></atpar-switch>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"clear\"></div>\r\n                                    <br>\r\n\r\n\r\n                                    <div class=\"container\" *ngIf=\"showlotserialsgrid\">\r\n                                        <atpar-datatable [value]=\"tkitEqItmLotSerailList\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"5\" expandableRows=\"true\" [rowsPerPageOptions]=\"[5,10,20]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n\r\n                                            <p-column field=\"\" header=\"\" [style]=\"{'width':'6%'}\">\r\n                                                <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                                    <i class=\"fa fa-pencil fa-bg bg-red\" (click)=\"editserial(ven)\"></i>\r\n                                                </template>\r\n                                            </p-column>\r\n\r\n                                            <p-column field=\"SERIAL_NO\" header=\"Serial #\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                            <p-column field=\"LOT_NO\" header=\"Lot #\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                            <p-column field=\"ASSET_ID\" header=\"Assets ID\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                            <p-column field=\"USER_FIELD_1\" header=\"User Field\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n\r\n                                            <p-column field=\"SERVICE_DT_TIME\" header=\"Next Service Date-Time(HH:MM)\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n\r\n                                            <p-column field=\"STATUS\" header=\"Active/Inactive\">\r\n                                                <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                                    <atpar-switch [(ngModel)]=\"ven.STATUS\" (change)=\"selectedLotSerialAvailability(ven,$event)\" [ngModelOptions]=\"{standalone: true}\"></atpar-switch>\r\n                                                </template>\r\n                                            </p-column>\r\n                                        </atpar-datatable>\r\n                                    </div>\r\n\r\n\r\n                                    <div class=\"col-md-4 col-md-offset-5 col-sm-6 col-sm-offset-5 col-xs-12\">\r\n                                        <button *ngIf=\"additemflag\" class=\"btn btn-purple sbtn\" type=\"button\" [disabled]=\"disableButton\" (click)=\"createandprint()\">Create and Print-label &nbsp;<i class=\"fa fa-print\"></i></button>\r\n                                        <button *ngIf=\"edititemflag\" class=\"btn btn-purple sbtn\" type=\"button\" [disabled]=\"disableButton\" (click)=\"updateandprint()\">Update and Print-label &nbsp;<i class=\"fa fa-print\"></i></button>\r\n                                        <button *ngIf=\"additemflag\" class=\"btn btn-purple sbtn\" type=\"button\" [disabled]=\"disableButton\" (click)=\"create()\">Create &nbsp;<i class=\"fa fa-plus\"></i></button>\r\n                                        <button *ngIf=\"edititemflag\" class=\"btn btn-purple sbtn\" type=\"button\" [disabled]=\"disableButton\" (click)=\"update()\">Update &nbsp;<i class=\"fa fa-check\"></i></button>\r\n                                        <button class=\"btn btn-purple sbtn\" type=\"button\" (click)=\"gobackFromItemdetails()\"><i class=\"fa fa-arrow-left\"></i>&nbsp; Go Back </button>\r\n                                    </div>\r\n                                </div>\r\n                            </form>\r\n                        </div>\r\n\r\n\r\n                        <!--adding lot serails of equipment type-->\r\n\r\n                        <form class=\"form-horizontal form-label-left\" *ngIf=\"showLotSerialFields\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Serial ID</label>\r\n                                <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                    <atpar-text [id]=\"'txtSD1'\"\r\n                                                [name]=\"txtSD1\"\r\n                                                 [(ngModel)]=\"newItemLotSerial.SERIAL_NO\"\r\n                                                [ngModelOptions]=\"{standalone: true}\"\r\n                                                [validations]=\"'mandatory,max=16,alpha_numeric_underscore_nospace'\"\r\n                                                [disabled]=\"newItemLotSerial.Disable\"\r\n                                                [title]=\"'Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces'\"\r\n                                                (bindModelDataChange)=\"bindModelDataChange($event)\">\r\n\r\n                                    </atpar-text>\r\n                                    <label class=\"control-label lbl-left\" *ngIf=\"showManageEdit\">{{addUserData.USER_ID}}</label>\r\n                                </div>\r\n                                <div class=\"col-md-6 col-sm-6 col-xs-12 help_txt\">\r\n                                    Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Lot ID</label>\r\n                                <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                    <atpar-text [id]=\"'txtLD1'\"\r\n                                                [name]=\"txtLD1\"\r\n                                                  [(ngModel)]=\"newItemLotSerial.LOT_NO\"\r\n                                                [ngModelOptions]=\"{standalone: true}\"\r\n                                                [validations]=\"'mandatory,max=16,alpha_numeric_underscore_nospace'\"\r\n                                                [title]=\"'Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces'\"\r\n                                                (bindModelDataChange)=\"bindModelDataChange($event)\">\r\n\r\n                                    </atpar-text>\r\n                                    <label class=\"control-label lbl-left\" *ngIf=\"showManageEdit\">{{addUserData.USER_ID}}</label>\r\n                                </div>\r\n                                <div class=\"col-md-6 col-sm-6 col-xs-12 help_txt\">\r\n                                    Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Assets ID</label>\r\n                                <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                    <div class=\"col-md-6\">\r\n                                        <atpar-text [id]=\"'txtAssetId1'\"\r\n                                                    [name]=\"txtAssetId1\"\r\n                                                    [(ngModel)]=\"newItemLotSerial.ASSET_IDPART1\"\r\n                                                    [ngModelOptions]=\"{standalone: true}\"\r\n                                                    [validations]=\"'max=4,alpha_numeric_underscore_nospace'\"\r\n                                                    [title]=\"'Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces'\"\r\n                                                    (bindModelDataChange)=\"bindModelDataChange($event)\">\r\n\r\n                                        </atpar-text>\r\n                                    </div>\r\n                                    <div class=\"col-md-6\">\r\n                                        <atpar-text [id]=\"'txtAssetId'\"\r\n                                                    [name]=\"txtAssetId\"\r\n                                                    [disabled]=\"true\"\r\n                                                    [(ngModel)]=\"newItemLotSerial.ASSET_ID\"\r\n                                                    [ngModelOptions]=\"{standalone: true}\"\r\n                                                    [validations]=\"'max=9,alpha_numeric_underscore_nospace'\"\r\n                                                    [title]=\"'Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces'\"\r\n                                                    (bindModelDataChange)=\"bindModelDataChange($event)\">\r\n\r\n                                        </atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-md-6 col-sm-6 col-xs-12 help_txt\">\r\n                                    Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label for=\"test_step_element_id\"\r\n                                       class=\"control-label col-md-3 col-sm-3 col-xs-12\">UserField</label>\r\n\r\n                                <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                    <atpar-text [id]=\"'txtUserf'\"\r\n                                                [name]=\"txtUserf\"\r\n                                                [(ngModel)]=\"newItemLotSerial.USER_FIELD_1\"\r\n                                                [ngModelOptions]=\"{standalone: true}\"\r\n                                                [validations]=\"'mandatory,max=16,alpha_numeric_underscore_nospace'\"\r\n                                                [title]=\"'Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces'\"\r\n                                                (bindModelDataChange)=\"bindModelDataChange($event)\">\r\n\r\n                                    </atpar-text>\r\n                                </div>\r\n\r\n                                <div class=\"col-md-6 col-sm-6 col-xs-12\">\r\n                                    Check here if user is required to use password to access the application on the PDA. This should be checked for Server User\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Next Service Date</label>\r\n                                <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-6\">\r\n                                        <p-calendar [showIcon]=\"true\"\r\n                                                    [id]=\"'nextservicedate'\"\r\n                                                              [(ngModel)]=\"newItemLotSerial.SERVICE_DT_TIME  \"\r\n                                                    [required]=\"true\"\r\n                                                    [monthNavigator]=\"true\"\r\n                                                    [yearNavigator]=\"true\"\r\n                                                    yearRange=\"2000:2030\"\r\n                                                    [placeholder]=\"'From Date'\"\r\n                                                    [readonlyInput]=\"true\"\r\n                                                    (onFocus)=\"onfocusToCalendar($event)\"\r\n                                                    [ngModelOptions]=\"{standalone: true}\"\r\n                                                    [dateFormat]=\"'mm/dd/yy'\"></p-calendar>\r\n\r\n                                                    <!--<input [ngModel]=\"item.value | useMyPipeToFormatThatValue\" \r\n      (ngModelChange)=\"item.value=$event\" name=\"inputField\" type=\"text\" />-->\r\n\r\n\r\n\r\n                                           \r\n\r\n                                   \r\n\r\n                                    </div>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-6\">\r\n                                        <atpar-calendar [(ngModel)]=\"newItemLotSerial.SERVICE_DT_TIME\"\r\n                                                        [timeOnly]=\"true\"\r\n                                                        [hourFormat]=\"12\"\r\n                                                        [ngModelOptions]=\"{standalone: true}\"></atpar-calendar>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-md-6 col-sm-6 col-xs-12\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-md-4 col-md-offset-5 col-sm-6 col-sm-offset-5 col-xs-12\">\r\n                                <button *ngIf=\"addserailflag\" class=\"btn btn-purple sbtn\" type=\"button\" [disabled]=\"disablelotserailButton\" (click)=\"createLotSerials()\">Add &nbsp;<i class=\"fa fa-plus\"></i></button>\r\n                                <button *ngIf=\"editserailflag\" class=\"btn btn-purple sbtn\" type=\"button\" [disabled]=\"disablelotserailButton\" (click)=\"updateLotSerials()\">Update &nbsp;<i class=\"fa fa-check\"></i></button>\r\n                                <button class=\"btn btn-purple sbtn\" type=\"button\" (click)=\"gobackFromAddEditSerial()\"><i class=\"fa fa-arrow-left\"></i> &nbsp;Go Back</button>\r\n                            </div>\r\n                        </form>\r\n\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ }),

/***/ 2145:
/***/ (function(module, exports) {

module.exports = "\r\n<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px 0 10px 0;\">\r\n                        <div class=\"container\">\r\n                            <form class=\"form-horizontal form-label-left\" *ngIf=\"showAddButton\">\r\n                                <div class=\"form-group\">\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-4\">\r\n                                        <atpar-text [(ngModel)]=\"equipmentIDSearch\" [name]=\"txtequipmentID\" [validations]=\"'except_less_greater_symbols'\" [id]=\"'equipmentTypeSearch'\" [ngModelOptions]=\"{standalone: true}\" [placeholder]=\"' Equipment Type / Description'\"></atpar-text>\r\n                                    </div>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-4\">\r\n                                        <button type=\"button\" class=\"btn btn-purple sbtn\" name=\"btnGo\" (click)=\"BindGrid()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                        <button type=\"button\" class=\"btn btn-purple sbtn\" name=\"btnAdd\" (click)=\"addEquipment()\">Add Equipment &nbsp;<i class=\"fa fa-plus\"></i></button>\r\n                                    </div>\r\n                                </div>\r\n                            </form>\r\n                        </div>\r\n\r\n                        <div class=\"col-xs-12\" *ngIf=\"table\">\r\n                            <div class=\"container\">\r\n                                <atpar-datatable [value]=\"lstDepts\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"pageSize\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n                                    <p-column field=\"\" header=\"Action\" [style]=\"{'width':'5%','text-align':'center'}\">\r\n                                        <template let-dept=\"rowData\" pTemplate=\"body\">\r\n                                            <i class=\"fa fa-pencil fa-bg bg-red\" (click)=\"edit(dept)\" style=\"cursor:pointer;\" [title]=\"'Edit'\"></i>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"ORG_GROUP_ID\" header=\"Org Group ID\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'10%'}\"></p-column>\r\n                                    <p-column field=\"ITEM_TYPE\" header=\"Equipment Type\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'18%'}\"></p-column>\r\n                                    <p-column field=\"ITEM_TYPE_DESCR\" header=\"Description\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"ITEM_TYPE_INDICATOR_DESC\" header=\"Indicator\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'11%'}\">\r\n                                        <template pTemplate=\"filter\" let-col>\r\n                                            <atpar-select [options]=\"statusList\" [id]=\"'ddlIndicator'\" [style]=\"{'width':'100%'}\" (onChange)=\"filterStatus($event.value,col.field,col.filterMatchMode)\" [(ngModel)]=\"statusType\"></atpar-select>\r\n                                        </template>\r\n                                    </p-column>\r\n\r\n                                </atpar-datatable>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-12\" *ngIf=\"form\">\r\n                            <form class=\"form-horizontal form-label-left\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Org Group ID</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpId}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupDD\" (onChange)=\"ddlOrgGpChange()\" [isfocus]=\"blnShowOrgGroupDD\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Equipment Type</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-text [id]=\"'txtEquipment'\" [name]=\"txtEquipment\" [(ngModel)]=\"newItem.ITEM_TYPE\" *ngIf=\"showTextBox && !blnShowOrgGroupLabel\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'mandatory,max=30,alpha_numeric_underscore_hyphen_nospace'\" [title]=\"'Equipment Type can only have letters(a-z),(A-Z),numbers(0-9),the underscore(_) and hyphen(-)'\" (bindModelDataChange)=\"bindModelDataChange($event)\"></atpar-text>\r\n                                        <atpar-text [id]=\"'txtEquipment'\" [name]=\"txtEquipment\" [(ngModel)]=\"newItem.ITEM_TYPE\" *ngIf=\"showTextBox && blnShowOrgGroupLabel\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'mandatory,max=30,alpha_numeric_underscore_hyphen_nospace'\" [title]=\"'Equipment Type can only have letters(a-z),(A-Z),numbers(0-9),the underscore(_) and hyphen(-)'\" (bindModelDataChange)=\"bindModelDataChange($event)\" [isFocused]=\"'true'\"></atpar-text>\r\n                                        <label class=\"control-label lbl-left\" *ngIf=\"showEquipmentTypelbl\">{{equipmentType}}</label>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Description</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-text [id]=\"'txtDesc'\" [name]=\"txtDesc\" [(ngModel)]=\"newItem.ITEM_TYPE_DESCR\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'mandatory,max=50,everything_except_space_as_fstchar'\" (bindModelDataChange)=\"bindModelDataChange($event)\" *ngIf=\"showTextBox\" [title]=\"'Dept Desc - Allows any character A-Z,a-z,0-9,!,#,$...'\"></atpar-text>\r\n                                        <atpar-text [id]=\"'txtDesc'\" [name]=\"txtDesc\" [(ngModel)]=\"newItem.ITEM_TYPE_DESCR\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'mandatory,max=50,everything_except_space_as_fstchar'\" (bindModelDataChange)=\"bindModelDataChange($event)\" *ngIf=\"!showTextBox\" [isFocused]=\"'true'\" [title]=\"'Dept Desc - Allows any character A-Z,a-z,0-9,!,#,$...'\"></atpar-text>\r\n\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Indicator</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <label class=\"control-label lbl-left\" *ngIf=\"showIndicatorlbl\">{{Indicator}}</label>\r\n                                        <atpar-select [id]=\"'ddlIndicator'\" *ngIf=\"!showIndicatorlbl\" [required]=\"true\" [options]=\"ddlIndicatorList\" [(ngModel)]=\"selectedIndicator\" [style]=\"{'width':'100%'}\" [ngModelOptions]=\"{standalone: true}\" (onChange)=\"ddlIndicatorChange()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-md-4 col-md-offset-5 col-sm-6 col-sm-offset-5 col-xs-12\">\r\n                                    <button class=\"btn btn-purple sbtn\" type=\"button\" (click)=\"saveOrUpdateReasonCode()\" [disabled]=\"loading\">{{Title}} &nbsp;<i class=\"fa fa-{{bindSymbal}}\"></i></button>\r\n                                    <button class=\"btn btn-purple sbtn\" type=\"button\" (click)=\"close()\"><i class=\"fa fa-arrow-left\"></i> &nbsp;Go Back</button>\r\n                                </div>\r\n                            </form>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n</div>";

/***/ }),

/***/ 2146:
/***/ (function(module, exports) {

module.exports = "\r\n<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px 0 10px 0;\">\r\n                        <div class=\"col-md-12\">\r\n                            <form class=\"form-horizontal form-label-left\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Requestor ID</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-text [id]=\"'txtRequetorId'\" [isFocused]=\"'true'\" [name]=\"txtRequetorId\" [(ngModel)]=\"newItem.REQUESTOR_ID\" *ngIf=\"showTextBox\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'mandatory,max=16,alpha_numeric_underscore_nospace'\" (bindModelDataChange)=\"bindModelDataChange($event)\" [title]=\"'Use only letters (a-z), numbers (0-9), the underscore (_), and no spaces'\"></atpar-text>\r\n                                        <label class=\"control-label lbl-left\" *ngIf=\"showLable\">{{requestorID}}</label>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Password <span class=\"text-red\">*</span></label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <input id=\"txtPassword\"  type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"newItem.PASSWORD\" maxlength=\"8\" [ngModelOptions]=\"{standalone: true}\" (click)=\"onFocusPassword()\" (focus)=\"onFocusPassword()\"  (keyup)=\"checkPswdValidation()\"  required />\r\n                                       \r\n                                    </div>\r\n                                </div>\r\n                               \r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">First Name</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-text [id]=\"'txtFirstName'\" [name]=\"txtFirstName\" [(ngModel)]=\"newItem.FIRST_NAME\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'mandatory,max=20,except_less_greater_symbols'\" (bindModelDataChange)=\"bindModelDataChange($event)\" [title]=\"'First name of the user –accepts everything except for < or>'\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Last Name</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-text [id]=\"'txtLastName'\" [name]=\"txtLastName\" [(ngModel)]=\"newItem.LAST_NAME\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'mandatory,max=20,except_less_greater_symbols'\" (bindModelDataChange)=\"bindModelDataChange($event)\" [title]=\"'Last name of the user –accepts everything except for < or>'\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Middle Initial</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-text [id]=\"'txtMiddleName'\" [name]=\"txtMiddleName\" [(ngModel)]=\"newItem.MIDDLE_INIT\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'max=2,except_less_greater_symbols'\" (bindModelDataChange)=\"bindModelDataChange($event)\" [title]=\"'Middle initial of the user –accepts everything except for < or>'\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Email ID</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-text [id]=\"'txtEmail'\" [name]=\"txtEmail\" [(ngModel)]=\"newItem.EMAIL\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'max=30,email'\" (bindModelDataChange)=\"bindModelDataChange($event)\" [title]=\"'Use the format userid@domainname.com'\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Phone #</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-text [id]=\"'txtPhone'\" [name]=\"txtPhone\" [(ngModel)]=\"newItem.PHONE\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'phone,numeric,max=10'\" (bindModelDataChange)=\"bindModelDataChange($event)\" [title]=\"'Use the format 1231231234'\"></atpar-text>\r\n                                    </div>\r\n                                    <div class=\"col-md-6 col-sm-6 col-xs-12 help_txt\">\r\n                                        <!--[ Use The Format 1231231234]-->\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Fax #</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-text [id]=\"'txtFax'\" [name]=\"txtFax\" [(ngModel)]=\"newItem.FAX\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'fax,numeric,max=10'\" (bindModelDataChange)=\"bindModelDataChange($event)\" [title]=\"'Use the format 1231231234'\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Pager #</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-text [id]=\"'txtPager'\" [name]=\"txtPager\" [(ngModel)]=\"newItem.PAGER\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'max=10,numeric'\" (bindModelDataChange)=\"bindModelDataChange($event)\" [title]=\"'Use the format 1231231234'\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Records Per Page</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-select [options]=\"ddRecordsPerPage\" [id]=\"'ddlddRecordsPerPage'\" [required]=\"true\" [(ngModel)]=\"newItem.RECORDS_PER_PAGE\" [ngModelOptions]=\"{standalone:true}\"></atpar-select>\r\n                                        <!--<atpar-text [id]=\"'ddlddRecordsPerPage'\" [name]=\"txtddlddRecordsPerPage\" [(ngModel)]=\"newItem.RECORDS_PER_PAGE\" [ngModelOptions]=\"{standalone: true}\" (bindModelDataChange)=\"bindModelDataChange($event)\" [validations]=\"'mandatory,numeric,max=2'\" [title]=\"'Use only numbers(1-9)'\"></atpar-text>-->\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Default Duration In Days</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-text [id]=\"'txtDefaultRptDuration'\" [name]=\"txtDefaultRptDuration\" [(ngModel)]=\"newItem.DEFAULT_REPORT_DURATION\" [ngModelOptions]=\"{standalone: true}\" (bindModelDataChange)=\"bindModelDataChange($event)\" [validations]=\"'mandatory,numeric,max=2'\" [title]=\"'Use only numbers(1-9)'\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Org Group ID</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-select [id]=\"'ddlOrgGroup'\" filter=\"filter\" [required]=\"true\" (onChange)=\"btnEnableDisable()\" [options]=\"orgGroupData\" [ngModelOptions]=\"{standalone: true}\" [style]=\"{'width':'100%'}\" [(ngModel)]=\"newItem.ORG_GROUP_ID\">\r\n                                        </atpar-select>\r\n\r\n                                    </div>\r\n                                    <div class=\"col-md-6 col-sm-6 col-xs-12 help_txt\">\r\n                                        <!--Select Organization Group-->\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Department</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <!--<atpar-listbox [options]=\"lstDepartments\"  (onChange)=\"btnEnableDisable()\"  [(ngModel)]=\"lstSelectedDepartments\" multiple=\"multiple\" [id]=\"'ddlDepartments'\" [required]=\"true\" checkbox=\"checkbox\" filter=\"filter\" [ngModelOptions]=\"{standalone: true}\"></atpar-listbox>-->\r\n                                        <atpar-multiSelect [options]=\"lstDepartments\"  [(ngModel)]=\"lstSelectedDepartments\" (onChange)=\"btnEnableDisable()\" [id]=\"'ddlDepartments'\" [required]=\"true\" [ngModelOptions]=\"{standalone: true}\"></atpar-multiSelect>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Default Deliver Location</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-select [options]=\"lstLocations\" filter=\"filter\" [id]=\"'ddlDeliverLocation'\" [required]=\"false\" [(ngModel)]=\"newItem.LOCATION_ID\" (onChange)=\"locationChange()\" [ngModelOptions]=\"{standalone:true}\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">User Status</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-switch [(ngModel)]=\"newItem.checkStatus\" [checked]=\"newItem.checkStatus\" [ngModelOptions]=\"{standalone:true}\" style=\"cursor:pointer;\"></atpar-switch>\r\n                                    </div>\r\n                                </div>\r\n                                \r\n                                <div class=\"col-md-4 col-md-offset-5 col-sm-6 col-sm-offset-5 col-xs-12\">\r\n                                    <button class=\"btn btn-purple sbtn\" type=\"button\" (click)=\"createOrModifyRequestor()\" [disabled]=\"loading\">{{Title}} &nbsp;<i class=\"fa fa-{{bindSymbal}}\"></i></button>\r\n                                    <button class=\"btn btn-purple sbtn\" type=\"button\" (click)=\"navigateToRequestorterHome()\"><i class=\"fa fa-arrow-left\"></i> &nbsp;Go Back</button>\r\n                                </div>\r\n                            </form>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<atpar-growl [value]=\"msgs\" sticky=\"sticky\"></atpar-growl>\r\n";

/***/ }),

/***/ 2147:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px 0 10px 0;\">\r\n                        <div class=\"container\">\r\n                            <form class=\"form-horizontal form-label-left\">\r\n                                <div class=\"form-group\">\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-4\">\r\n                                        <atpar-text [(ngModel)]=\"requestorSearch\" [name]=\"txtRequestorIdSearch\" [validations]=\"'except_less_greater_symbols'\" [id]=\"'requestorIdSearch'\" [ngModelOptions]=\"{standalone: true}\" [placeholder]=\"'Requestor ID / First Name / Last Name'\"></atpar-text>\r\n                                    </div>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-4\">\r\n                                        <button type=\"button\" class=\"btn btn-purple sbtn\" name=\"btnGo\" (click)=\"BindGrid()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                        <button type=\"button\" class=\"btn btn-purple sbtn\" name=\"btnAdd\" (click)=\"addRequestor()\">Add Requestor &nbsp;<i class=\"fa fa-plus\"></i></button>\r\n                                    </div>\r\n                                </div>\r\n                            </form>\r\n                        </div>\r\n                        <div class=\"col-xs-12\" *ngIf=\"isVisible\">\r\n                            <div class=\"container\">\r\n                                <atpar-datatable [value]=\"requestorData\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"pazeSize\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n                                    <p-column field=\"\" header=\"Action\" [style]=\"{'width':'4%','text-align':'center'}\">\r\n                                        <template let-requstorData=\"rowData\" pTemplate=\"body\">\r\n                                            <i class=\"fa fa-pencil fa-bg bg-red\" title=\"Edit\" (click)=\"editRequestor(requstorData)\" style=\"cursor:pointer;\"></i>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"ORG_GROUP_ID\" header=\"Org Group ID\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'10%'}\"></p-column>\r\n                                    <p-column field=\"REQUESTOR_ID\" header=\"Requestor ID\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"FIRST_NAME\" header=\"First Name\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"LAST_NAME\" header=\"Last Name\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"MIDDLE_INIT\" header=\"Middle Initial\"  [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'10%'}\"></p-column>\r\n                                    <p-column field=\"STATUS\" header=\"Status\" [filter]=\"true\" [style]=\"{'width': '8%','overflow':'visible','text-align':'center'}\" filterMatchMode=\"equals\">\r\n                                        <template pTemplate=\"filter\" let-col>\r\n                                               <atpar-select [options]=\"statusList\" [(ngModel)]=\"statusType\" [style]=\"{'width':'100%'}\" [id]=\"'ddlddlStatusType'\" [required]=\"false\" (onChange)=\"dataFilter()\"></atpar-select>\r\n                                        </template>\r\n                                        <template let-col let-requestor=\"rowData\" pTemplate=\"body\">\r\n                                            <atpar-switch  [checked] = \"requestor.checkStatus\"  (click)=\"updateRequestorStatus(requestor)\"  style=\"cursor:pointer;\"></atpar-switch>\r\n                                        </template>\r\n                                        \r\n                                    </p-column>\r\n                                </atpar-datatable>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<atpar-growl [value]=\"msgs\" sticky=\"sticky\"></atpar-growl>";

/***/ }),

/***/ 2148:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>this is trackit newitem audit report screen.</span>\r\n</div>";

/***/ }),

/***/ 2149:
/***/ (function(module, exports) {

module.exports = "\r\n<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px 0 10px 0;\">\r\n                        <div class=\"container\">\r\n                            <form class=\"form-horizontal form-label-left\" *ngIf=\"showAddButton\">\r\n                                <div class=\"form-group\">\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-4\">\r\n                                        <atpar-text [(ngModel)]=\"reasonCodeSearch\" [name]=\"reasonCodeSearch\" [validations]=\"'except_less_greater_symbols'\" [id]=\"'reasonCodeSearch'\" [ngModelOptions]=\"{standalone: true}\" [placeholder]=\"'Reason Code / Description'\"></atpar-text>\r\n                                    </div>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-4\">\r\n                                        <button type=\"button\" class=\"btn btn-purple sbtn\" name=\"btnGo\" (click)=\"BindGrid()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                        <button type=\"button\" class=\"btn btn-purple sbtn\" name=\"btnAdd\" (click)=\"addReasonCode()\">Add Reason Code &nbsp;<i class=\"fa fa-plus\"></i></button>\r\n                                    </div>\r\n                                </div>\r\n                            </form>\r\n                        </div>\r\n                        <br />\r\n                        <div class=\"col-xs-12\" *ngIf=\"table\">\r\n                            <div class=\"container\">\r\n\r\n                                <atpar-datatable [value]=\"lstReasonCodes\" [paginator]=\"true\" #dt [pageLinks]=\"3\" [rows]=\"pageSize\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n                                    <p-column field=\"\" header=\"Action\" [style]=\"{'width':'4%','text-align':'center'}\">\r\n                                        <template let-dept=\"rowData\" pTemplate=\"body\">\r\n                                            <i class=\"fa fa-pencil fa-bg bg-red\" title=\"Edit\" (click)=\"edit(dept)\" style=\"cursor:pointer;\"></i>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"ORG_GROUP_ID\" header=\"Org Group ID\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width': '10%'}\"></p-column>\r\n                                    <p-column field=\"REASON_CODE\" header=\"Reason Code\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'28%'}\"></p-column>\r\n                                    <p-column field=\"REASON_DESCR\" header=\"Description\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"STATUS\" header=\"Status\" [filter]=\"true\" [style]=\"{'width': '8%','overflow':'visible','text-align':'center'}\" filterMatchMode=\"equals\">\r\n                                        <template pTemplate=\"filter\" let-col>\r\n                                            <atpar-select [options]=\"ddlStatusType\" [(ngModel)]=\"statusType\" [style]=\"{'width':'100%'}\" [id]=\"'ddlddlStatusType'\" [required]=\"false\" \r\n                                                          \r\n                                                          (onChange)=\"dataFilter($event.value,col.field,col.filterMatchMode)\"\r\n                                                       \r\n                                                          ></atpar-select>\r\n                                            <!--(onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\"-->\r\n                                        </template>\r\n                                        <template let-col let-dept=\"rowData\" pTemplate=\"body\">\r\n                                            <atpar-switch name=\"changeStatus\" [(ngModel)]=\"dept.STATUS\"  [checked]=dept[col.field] (change)=\"changeStatus(dept)\"></atpar-switch>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <!--[checked]=\"dept.STATUS==false?true:false\"--> \r\n                                </atpar-datatable>\r\n                            </div>\r\n                            <div class=\"clear:both;\"></div>\r\n                            <br>\r\n\r\n                        </div>\r\n                        <div class=\"col-md-12\" *ngIf=\"form\">\r\n                            <form class=\"form-horizontal form-label-left\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Org Group ID</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpId}}</label>\r\n                                        <!--<atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupDD\"></atpar-select>-->\r\n\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [isfocus]=\"blnShowOrgGroupDD\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupDD\" (onChange)=\"ddlOrgIDChanged()\" [selectOnKeyPress]=\"true\"></atpar-select>\r\n\r\n\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Reason Code</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-text [id]=\"'txtReasonCode'\" [name]=\"txtReasonCode\" [(ngModel)]=\"newItem.REASON_CODE\" *ngIf=\"showTextBox && blnShowOrgGroupDD\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'mandatory,max=30,alpha_numeric_underscore_hyphen_nospace'\" [title]=\"'Reason Code can only have letters(a-z),(A-Z),numbers(0-9),the underscore(_),and hyphen(-)'\" (bindModelDataChange)=\"bindModelDataChange($event)\"  ></atpar-text>\r\n                                        <atpar-text [id]=\"'txtReasonCode'\" [name]=\"txtReasonCode\" [(ngModel)]=\"newItem.REASON_CODE\" *ngIf=\"showTextBox && !blnShowOrgGroupDD\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'mandatory,max=30,alpha_numeric_underscore_hyphen_nospace'\" [title]=\"'Reason Code can only have letters(a-z),(A-Z),numbers(0-9),the underscore(_),and hyphen(-)'\" (bindModelDataChange)=\"bindModelDataChange($event)\" [isFocused]=\"'true'\"></atpar-text>\r\n                                        <label class=\"control-label lbl-left\" *ngIf=\"showLable\">{{newItem.REASON_CODE}}</label>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Description</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-text [id]=\"'txtDesc'\" [name]=\"txtDesc\" [(ngModel)]=\"newItem.REASON_DESCR\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'max=50,everything'\" (bindModelDataChange)=\"bindModelDataChange($event)\" *ngIf=\"showTextBox\"></atpar-text>\r\n                                        <atpar-text [id]=\"'txtDesc'\" [name]=\"txtDesc\" [(ngModel)]=\"newItem.REASON_DESCR\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'max=50,everything'\" (bindModelDataChange)=\"bindModelDataChange($event)\" *ngIf=\"!showTextBox\" [isFocused]=\"'true'\"></atpar-text>\r\n\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-md-4 col-md-offset-5 col-sm-6 col-sm-offset-5 col-xs-12\">\r\n                                    <button class=\"btn btn-purple sbtn\" type=\"button\" [disabled]=\"loading\" (click)=\"saveOrUpdateReasonCode()\">{{Title}} &nbsp;<i class=\"fa fa-{{bindSymbal}}\"></i></button>\r\n                                    <button class=\"btn btn-purple sbtn\" type=\"button\" (click)=\"close()\"><i class=\"fa fa-arrow-left\"></i> &nbsp;Go Back</button>\r\n                                </div>\r\n                            </form>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n</div>\r\n";

/***/ }),

/***/ 2150:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>This is trackit transaction report  screen.</span>\r\n</div>";

/***/ }),

/***/ 2151:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <router-outlet></router-outlet>\r\n</div>";

/***/ })

});
//# sourceMappingURL=10.601fce7cdc00a672fc7a.chunk.js.map