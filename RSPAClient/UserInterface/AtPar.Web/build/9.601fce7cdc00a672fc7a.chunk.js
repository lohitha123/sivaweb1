webpackJsonp([9],{

/***/ 1416:
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
var ActivityReportComponent = (function () {
    function ActivityReportComponent() {
        this.crctProductId = AtParEnums_1.EnumApps.CartCount;
    }
    return ActivityReportComponent;
}());
ActivityReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1931)
    })
], ActivityReportComponent);
exports.ActivityReportComponent = ActivityReportComponent;


/***/ }),

/***/ 1417:
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
var http_1 = __webpack_require__(38);
var HttpService_1 = __webpack_require__(12);
var AtParEnums_1 = __webpack_require__(14);
var AtParEnums_2 = __webpack_require__(14);
var AtParEnums_3 = __webpack_require__(14);
var atpar_common_service_1 = __webpack_require__(43);
var cart_allocate_carts_component_service_1 = __webpack_require__(1700);
var AtParConstants_1 = __webpack_require__(31);
var datatableservice_1 = __webpack_require__(131);
var datatable_1 = __webpack_require__(71);
var MT_CRCT_USER_ALLOCATION_1 = __webpack_require__(1733);
var linq_es5_1 = __webpack_require__(115);
var AllocateCartsComponent = (function () {
    function AllocateCartsComponent(httpService, _http, spinnerService, commonService, atParConstant, cartAllocationService) {
        this.httpService = httpService;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.cartAllocationService = cartAllocationService;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.selectedOrgGroupId = "";
        this.selectedDropDownUserId = "";
        this.selectedDropDownUserId1 = "";
        this.selectedBunit = "";
        this.selectedParlocation = "";
        this.orgGrpId = "";
        this.order = "";
        this.blnShowOrgGroupDD = false;
        this.lstUsers = [];
        this.lstUsersForCopyMoveDelete = [];
        this.lstOrgGroups = [];
        this.lstOrgGroupsList = [];
        this.showGrid = false;
        this.lstFilteredBUnits = [];
        this.lstFilteredDisplay = [];
        this.newItem = new MT_CRCT_USER_ALLOCATION_1.MT_CRCT_USER_ALLOCATION();
        this.selectedDisplay = "";
        this.showOnAllocateSelection = false;
        this.strMenuCode = "mt_cart_allocation.aspx";
        this.strAuditData = "";
        this.strRowFilter = "";
        this.blnsortbycolumn = true;
        this.loading = true;
    }
    AllocateCartsComponent.prototype.ngOnInit = function () {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.RecordsPerPage];
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedCartsData = new Array();
        this.lstUnCheckedCartsData = new Array();
        this.bindOrgGroups();
        this.bindDisplayItems();
    };
    AllocateCartsComponent.prototype.bindDisplayItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.lstFilteredDisplay.push({ label: "All", value: "A" });
                this.lstFilteredDisplay.push({ label: "Allocated", value: "L" });
                this.lstFilteredDisplay.push({ label: "Unallocated", value: "U" });
                return [2 /*return*/];
            });
        });
    };
    AllocateCartsComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.bindUsersList();
                                            _this.populateBusinessUnits();
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstUsers = [];
                                            _this.lstUsers.push({ label: "Select User", value: "Select User" });
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
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
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
    AllocateCartsComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        isOrgBUnitsExist = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.lstFilteredBUnits = [];
                                _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstFilteredBUnits.push({
                                                label: data.DataList[i].toString(),
                                                value: data.DataList[i].toString()
                                            });
                                        }
                                        isOrgBUnitsExist = true;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(isOrgBUnitsExist)];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "populateBusinessUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateCartsComponent.prototype.bindUsersList = function () {
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
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstUsers = [];
                        this.lstUsers.push({ label: "Select User", value: "" });
                        return [4 /*yield*/, this.commonService.getUsersList(this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID], 2, this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstUsers.push({
                                                label: data.DataList[i].FULLNAME,
                                                value: data.DataList[i].USER_ID
                                            });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage = [];
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
                        this.clientErrorMsg(ex_3, "bindUsersList");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateCartsComponent.prototype.bindUsersListForCopyMoveDelete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstUsersForCopyMoveDelete = [];
                        this.lstUsersForCopyMoveDelete.push({ label: "Select User", value: "Select User" });
                        return [4 /*yield*/, this.commonService.getUsersList(this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID], 2, this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.selectedDropDownUserId1 = "";
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            if (data.DataList[i].USER_ID != _this.selectedDropDownUserId) {
                                                _this.lstUsersForCopyMoveDelete.push({
                                                    label: data.DataList[i].FULLNAME,
                                                    value: data.DataList[i].USER_ID
                                                });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage = [];
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
                        this.clientErrorMsg(ex_4, "bindUsersListForCopyMoveDelete");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateCartsComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.growlMessage = [];
                this.showGrid = false;
                if (this.orgGroupIDForDBUpdate === this.selectedOrgGroupId) {
                    if (this.selectedDropDownUserId === "" || this.selectedDropDownUserId === "Select User") {
                        this.bindUsersList();
                        return [2 /*return*/];
                    }
                    else {
                    }
                    if (this.selectedDisplay === "L") {
                        this.showOnAllocateSelection = true;
                    }
                    else {
                        this.showOnAllocateSelection = false;
                    }
                    return [2 /*return*/];
                }
                this.showOnAllocateSelection = false;
                if (this.selectedOrgGroupId == "Select One") {
                    this.lstUsers = [];
                    this.lstUsers.push({ label: "Select User", value: "" });
                    this.lstFilteredBUnits = [];
                    this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                    return [2 /*return*/];
                }
                this.spinnerService.start();
                try {
                    this.selectedDropDownUserId = "";
                    this.selectedBunit = "";
                    this.bindUsersList();
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
    AllocateCartsComponent.prototype.getAllocateCarts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isChecked, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.order = "ASC";
                        this.showGrid = false;
                        this.showOnAllocateSelection = false;
                        this.spinnerService.start();
                        isChecked = false;
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                            if (this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined) {
                                this.showGrid = false;
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID." });
                                this.spinnerService.stop();
                                return [2 /*return*/, false];
                            }
                        }
                        if (this.selectedDropDownUserId == "" || this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId == undefined) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select User ID" });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            return [2 /*return*/, false];
                        }
                        if (this.lstFilteredBUnits.length == 1) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Assigned Org Business Units" });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.cartAllocationService.getCartDetails(this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.OrgGrpID], this.selectedDropDownUserId, this.selectedBunit, this.selectedParlocation, this.order).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.showGrid = true;
                                        var cartsData = data.DataVariable["m_Item2"];
                                        _this.lstDBData = cartsData;
                                        _this.cartsAllocatedMsg = "Number of Carts allocated to " + _this.selectedUserIdLblValue + " :  " + data.DataVariable["m_Item1"];
                                        _this.BindDataGrid();
                                        _this.lstCheckedCartsData = [];
                                        _this.lstUnCheckedCartsData = [];
                                        for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                            if (_this.lstDBData[i].IsOrphan === "Y") {
                                                _this.lstDBData[i].CartColor = "red";
                                            }
                                            else {
                                                _this.lstDBData[i].CartColor = "black";
                                            }
                                            _this.lstDBData[i].ID = "CartCounterId" + i;
                                            if (_this.lstDBData[i].CART_COUNT_ORDER == null || _this.lstDBData[i].CART_COUNT_ORDER == 0) {
                                                _this.lstDBData[i].CART_COUNT_ORDER = null;
                                            }
                                            if (_this.lstDBData[i].ALL == true) {
                                                _this.lstCheckedCartsData.push(_this.lstDBData[i]);
                                            }
                                            else {
                                                _this.lstUnCheckedCartsData.push(_this.lstDBData[i]);
                                            }
                                            var time = _this.lstDBData[i].COUNT_BEFORE;
                                            //if (time != "") {
                                            //    var hours = Number(time.match(/^(\d+)/)[1]);
                                            //    var minutes = Number(time.match(/:(\d+)/)[1]);
                                            //    var AMPM = time[5] + time[6];
                                            //    if (AMPM == "PM" && hours < 12) hours = hours + 12;
                                            //    if (AMPM == "AM" && hours == 12) hours = hours - 12;
                                            //    var sHours = hours.toString();
                                            //    var sMinutes = minutes.toString();
                                            //    if (hours < 10) sHours = "0" + sHours;
                                            //    if (minutes < 10) sMinutes = "0" + sMinutes;
                                            //    this.lstDBData[i].COUNT_BEFORE = sHours + ":" + sMinutes;
                                            //}
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
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
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "getAllocateCarts");
                        this.showGrid = false;
                        this.showOnAllocateSelection = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateCartsComponent.prototype.BindDataGrid = function () {
        var _this = this;
        try {
            this.lstgridfilterData = null;
            this.spinnerService.start();
            this.strRowFilter = "";
            if (this.lstDBData.length > 0) {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].COUNT_BEFORE == null) {
                        this.lstDBData[i].COUNT_BEFORE = "";
                    }
                    if (this.lstDBData[i].DESCR != null) {
                        this.lstDBData[i].DESCR = this.lstDBData[i].DESCR.replace(/\'/g, "''").trim();
                    }
                }
            }
            if (this.selectedParlocation !== "") {
                this.lstDBData = linq_es5_1.asEnumerable(this.lstDBData).Where(function (x) { return x.CART_ID.toUpperCase().startsWith(_this.selectedParlocation.toUpperCase()); }).ToArray();
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    return;
                }
            }
            if (this.selectedDisplay === "L") {
                this.showOnAllocateSelection = true;
                this.bindUsersListForCopyMoveDelete();
                if (this.selectedParlocation !== "") {
                    this.lstDBData = this.lstDBData.filter(function (x) { return x.ALL == true; });
                }
                else {
                    this.lstDBData = this.lstDBData.filter(function (x) { return x.CHK_ALLOCATED == true; });
                }
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.showOnAllocateSelection = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    this.spinnerService.stop();
                    return;
                }
            }
            else if (this.selectedDisplay === "U") {
                this.showOnAllocateSelection = false;
                if (this.selectedParlocation !== "") {
                    this.lstDBData = this.lstDBData.filter(function (x) { return x.ALL == false; });
                }
                else {
                    this.lstDBData = this.lstDBData.filter(function (x) { return x.CHK_ALLOCATED == false; });
                }
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.showOnAllocateSelection = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    this.spinnerService.stop();
                    return;
                }
            }
            else {
                this.showOnAllocateSelection = false;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    };
    AllocateCartsComponent.prototype.UpdateGridData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var stime, timeSplit, i, dt, timeConverMinutes, amTime, amTimeMinutes, pmTime, pmTimeMinutes, ex_6, i, index, ex_7, i, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stime = "";
                        timeSplit = [];
                        this.spinnerService.start();
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            //if (this.lstDBData[i].COUNT_BEFORE != "") {
                            //    let timeSplit = this.lstDBData[i].COUNT_BEFORE.split(":");
                            //    this.timeConversion = +(timeSplit[0]);
                            //    if (this.timeConversion < 12) {
                            //        let amTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                            //        this.lstDBData[i].COUNT_BEFORE = amTime + ':' + timeSplit[1] + 'AM';
                            //    }
                            //    else {
                            //        this.timeConversion = this.timeConversion - 12;
                            //        let pmTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                            //        this.lstDBData[i].COUNT_BEFORE = pmTime + ':' + timeSplit[1] + 'PM';
                            //    }
                            //}
                            if (this.lstDBData[i].COUNT_BEFORE != null && this.lstDBData[i].COUNT_BEFORE != '' && this.lstDBData[i].COUNT_BEFORE != undefined) {
                                dt = this.lstDBData[i].COUNT_BEFORE.toString();
                                if (dt.length > 11) {
                                    if (this.lstDBData[i].COUNT_BEFORE != '') {
                                        stime = new Date(this.lstDBData[i].COUNT_BEFORE).getHours() + ':' + new Date(this.lstDBData[i].COUNT_BEFORE).getMinutes();
                                        timeSplit = stime.split(":");
                                        this.timeConversion = +(timeSplit[0]);
                                        timeConverMinutes = void 0;
                                        timeConverMinutes = +(timeSplit[1]);
                                        if (this.timeConversion < 12) {
                                            amTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                                            amTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                                            if (amTime == "00") {
                                                amTime = "12";
                                            }
                                            this.lstDBData[i].COUNT_BEFORE = amTime + ':' + amTimeMinutes + ' AM';
                                        }
                                        else {
                                            this.timeConversion = this.timeConversion - 12;
                                            pmTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                                            pmTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                                            if (pmTime == "00") {
                                                pmTime = "12";
                                            }
                                            this.lstDBData[i].COUNT_BEFORE = pmTime + ':' + pmTimeMinutes + ' PM';
                                        }
                                    }
                                    else {
                                        this.growlMessage = [];
                                        this.spinnerService.stop();
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                                        return [2 /*return*/];
                                    }
                                }
                            }
                            //else {
                            //    this.growlMessage = [];
                            //    this.spinnerService.stop();
                            //    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                            //    return;
                            //}
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getAuditAllowed(2, this.strMenuCode).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.strAuditData = data.Data;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
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
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "UpdateGridData");
                        return [3 /*break*/, 4];
                    case 4:
                        if (!(this.strAuditData === "Y")) return [3 /*break*/, 8];
                        this.lstAuditData = this.lstDBData;
                        for (i = 0; i <= this.lstAuditData.length - 1; i++) {
                            if (this.lstAuditData[i].ALL == false && this.lstAuditData[i].CHK_ALLOCATED == false) {
                                index = this.lstAuditData.indexOf(this.lstAuditData[i], 0);
                                this.lstAuditData.splice(index, 1);
                            }
                            else {
                                if (this.lstAuditData[i].ALL == false && this.lstAuditData[i].CHK_ALLOCATED == true) {
                                    this.lstAuditData[i].RECORD_MODE = "Delete";
                                }
                                else {
                                    this.lstAuditData[i].RECORD_MODE = "";
                                }
                            }
                        }
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.doAuditData(this.selectedDropDownUserId, 2, this.strMenuCode, this.lstAuditData).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "UpdateGridData");
                        return [3 /*break*/, 8];
                    case 8:
                        _a.trys.push([8, 10, , 11]);
                        this.spinnerService.start();
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            if (this.lstDBData[i].ALL == true) {
                                if (this.lstDBData[i].CART_COUNT_ORDER != null) {
                                    this.lstDBData[i].CART_COUNT_ORDER = this.lstDBData[i].CART_COUNT_ORDER;
                                }
                                else {
                                    this.lstDBData[i].CART_COUNT_ORDER = 99;
                                }
                            }
                            else {
                                this.lstDBData[i].CART_COUNT_ORDER = null;
                            }
                            this.lstDBData[i].DESCR = this.lstDBData[i].DESCR.replace(/\'/g, "''").trim();
                        }
                        return [4 /*yield*/, this.cartAllocationService.AllocateCarts(this.lstDBData, this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID], this.selectedDropDownUserId, this.selectedBunit, this.selectedParlocation).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        var statusMessage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "User").replace("2%", _this.selectedDropDownUserId);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.showOnAllocateSelection = false;
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.showOnAllocateSelection = false;
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedParlocation = "";
                                            _this.selectedBunit = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.showOnAllocateSelection = false;
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "UpdateGridData");
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    AllocateCartsComponent.prototype.selectedRow = function (event, selectedData) {
        try {
            if (event.target.checked == true) {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].SNO == selectedData.SNO) {
                        this.lstDBData[i].ALL = true;
                        this.lstDBData[i].MON = true;
                        this.lstDBData[i].TUE = true;
                        this.lstDBData[i].WED = true;
                        this.lstDBData[i].THU = true;
                        this.lstDBData[i].FRI = true;
                        this.lstDBData[i].SAT = true;
                        this.lstDBData[i].SUN = true;
                    }
                }
            }
            else {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].SNO == selectedData.SNO) {
                        this.lstDBData[i].ALL = false;
                        this.lstDBData[i].MON = false;
                        this.lstDBData[i].TUE = false;
                        this.lstDBData[i].WED = false;
                        this.lstDBData[i].THU = false;
                        this.lstDBData[i].FRI = false;
                        this.lstDBData[i].SAT = false;
                        this.lstDBData[i].SUN = false;
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    };
    AllocateCartsComponent.prototype.DaySelected = function (event, ven, Day) {
        try {
            if (event.target.checked == true) {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (ven.SNO == this.lstDBData[i].SNO) {
                        this.lstDBData[i].ALL = true;
                    }
                }
            }
            else {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (ven.SNO == this.lstDBData[i].SNO) {
                        ven[Day] = false;
                        if (this.lstDBData[i].MON == true || this.lstDBData[i].TUE == true || this.lstDBData[i].WED == true || this.lstDBData[i].THU == true || this.lstDBData[i].FRI == true || this.lstDBData[i].SAT == true || this.lstDBData[i].SUN == true) {
                            this.lstDBData[i].ALL = true;
                        }
                        else {
                            this.lstDBData[i].ALL = false;
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "DaySelected");
        }
    };
    AllocateCartsComponent.prototype.CopyCarts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        if (this.selectedDropDownUserId1 == "" || this.selectedDropDownUserId1 == undefined) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select User ID" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            if (this.lstDBData[i].CART_COUNT_ORDER == null) {
                                this.lstDBData[i].CART_COUNT_ORDER = 99;
                            }
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.cartAllocationService.CopyCarts(this.lstDBData, this.selectedDropDownUserId, this.selectedDropDownUserId1, this.selectedBunit, this.selectedParlocation).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedParlocation = "";
                                            _this.selectedBunit = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "CopyCarts");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateCartsComponent.prototype.MoveCarts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        if (this.selectedDropDownUserId1 == "" || this.selectedDropDownUserId1 == undefined) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select User ID" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            if (this.lstDBData[i].CART_COUNT_ORDER == null) {
                                this.lstDBData[i].CART_COUNT_ORDER = 99;
                            }
                        }
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.cartAllocationService.MoveCarts(this.lstDBData, this.selectedDropDownUserId, this.selectedDropDownUserId1, this.selectedBunit, this.selectedParlocation).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, "MoveCarts");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateCartsComponent.prototype.DeleteCarts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            if (this.lstDBData[i].CART_COUNT_ORDER == null) {
                                this.lstDBData[i].CART_COUNT_ORDER = 99;
                            }
                        }
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.cartAllocationService.DeleteCarts(this.lstDBData, this.selectedDropDownUserId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Deleted Successfully' });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.showOnAllocateSelection = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        if (_this.blnShowOrgGroupLabel == true) {
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        else if (_this.blnShowOrgGroupDD == true) {
                                            _this.selectedOrgGroupId = 'Select One';
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.selectedDropDownUserId = "";
                                            _this.selectedBunit = "";
                                            _this.selectedParlocation = "";
                                        }
                                        _this.selectedDisplay = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "DeleteCarts");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateCartsComponent.prototype.checkAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                try {
                    if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                        if (this.EndIndex > this.lstgridfilterData.length) {
                            this.EndIndex = this.lstgridfilterData.length;
                        }
                        for (i = this.startIndex; i <= this.EndIndex - 1; i++) {
                            this.lstgridfilterData[i].ALL = true;
                            this.lstgridfilterData[i].MON = true;
                            this.lstgridfilterData[i].TUE = true;
                            this.lstgridfilterData[i].WED = true;
                            this.lstgridfilterData[i].THU = true;
                            this.lstgridfilterData[i].FRI = true;
                            this.lstgridfilterData[i].SAT = true;
                            this.lstgridfilterData[i].SUN = true;
                        }
                    }
                    else {
                        if (this.EndIndex > this.lstDBData.length) {
                            this.EndIndex = this.lstDBData.length;
                        }
                        for (i = this.startIndex; i <= this.EndIndex - 1; i++) {
                            this.lstDBData[i].ALL = true;
                            this.lstDBData[i].MON = true;
                            this.lstDBData[i].TUE = true;
                            this.lstDBData[i].WED = true;
                            this.lstDBData[i].THU = true;
                            this.lstDBData[i].FRI = true;
                            this.lstDBData[i].SAT = true;
                            this.lstDBData[i].SUN = true;
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "checkAll");
                }
                return [2 /*return*/];
            });
        });
    };
    AllocateCartsComponent.prototype.unCheckAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                try {
                    if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                        if (this.EndIndex > this.lstgridfilterData.length) {
                            this.EndIndex = this.lstgridfilterData.length;
                        }
                        for (i = this.EndIndex - 1; i >= this.startIndex; i--) {
                            this.lstgridfilterData[i].ALL = false;
                            this.lstgridfilterData[i].MON = false;
                            this.lstgridfilterData[i].TUE = false;
                            this.lstgridfilterData[i].WED = false;
                            this.lstgridfilterData[i].THU = false;
                            this.lstgridfilterData[i].FRI = false;
                            this.lstgridfilterData[i].SAT = false;
                            this.lstgridfilterData[i].SUN = false;
                        }
                    }
                    else {
                        if (this.EndIndex > this.lstDBData.length) {
                            this.EndIndex = this.lstDBData.length;
                        }
                        for (i = this.EndIndex - 1; i >= this.startIndex; i--) {
                            this.lstDBData[i].ALL = false;
                            this.lstDBData[i].MON = false;
                            this.lstDBData[i].TUE = false;
                            this.lstDBData[i].WED = false;
                            this.lstDBData[i].THU = false;
                            this.lstDBData[i].FRI = false;
                            this.lstDBData[i].SAT = false;
                            this.lstDBData[i].SUN = false;
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "unCheckAll");
                }
                return [2 /*return*/];
            });
        });
    };
    AllocateCartsComponent.prototype.customSort = function (event, field) {
        var element = event;
        this.blnsortbycolumn = !this.blnsortbycolumn;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        var result = null;
        try {
            this.sortedcheckedrec = this.lstCheckedCartsData.sort(function (a, b) {
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
            this.sorteduncheckedrec = this.lstUnCheckedCartsData.sort(function (a, b) {
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
    AllocateCartsComponent.prototype.ddlUsersIdChanged = function () {
        this.showGrid = false;
        this.showOnAllocateSelection = false;
        try {
            for (var i = 0; i <= this.lstUsers.length - 1; i++) {
                if (this.lstUsers[i].value == this.selectedDropDownUserId) {
                    this.selectedUserIdLblValue = this.lstUsers[i].label;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlUsersIdChanged");
        }
    };
    AllocateCartsComponent.prototype.ddlBUnitChanged = function () {
        this.showGrid = false;
        this.showOnAllocateSelection = false;
    };
    AllocateCartsComponent.prototype.ddlDisplayChanged = function () {
        this.showGrid = false;
        this.showOnAllocateSelection = false;
    };
    AllocateCartsComponent.prototype.filterdata = function (event) {
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    AllocateCartsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    AllocateCartsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstDBData = null;
        this.growlMessage = null;
    };
    return AllocateCartsComponent;
}());
__decorate([
    core_1.ViewChild(datatable_1.DataTable),
    __metadata("design:type", datatable_1.DataTable)
], AllocateCartsComponent.prototype, "dataTableComponent", void 0);
AllocateCartsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1932),
        providers: [datatableservice_1.datatableservice, cart_allocate_carts_component_service_1.CartCountAllocationServices, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        AtParConstants_1.AtParConstants,
        cart_allocate_carts_component_service_1.CartCountAllocationServices])
], AllocateCartsComponent);
exports.AllocateCartsComponent = AllocateCartsComponent;


/***/ }),

/***/ 1418:
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
var CartAveragesReportsComponent = (function () {
    function CartAveragesReportsComponent() {
    }
    return CartAveragesReportsComponent;
}());
CartAveragesReportsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1933)
    })
], CartAveragesReportsComponent);
exports.CartAveragesReportsComponent = CartAveragesReportsComponent;


/***/ }),

/***/ 1419:
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
var CartDetailReportComponent = (function () {
    function CartDetailReportComponent() {
    }
    return CartDetailReportComponent;
}());
CartDetailReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1934)
    })
], CartDetailReportComponent);
exports.CartDetailReportComponent = CartDetailReportComponent;


/***/ }),

/***/ 1420:
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
var CartPutawayReportComponent = (function () {
    function CartPutawayReportComponent() {
    }
    return CartPutawayReportComponent;
}());
CartPutawayReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1935)
    })
], CartPutawayReportComponent);
exports.CartPutawayReportComponent = CartPutawayReportComponent;


/***/ }),

/***/ 1421:
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
var cart_create_orders_service_1 = __webpack_require__(1701);
var datatableservice_1 = __webpack_require__(131);
var HttpService_1 = __webpack_require__(12);
var AtParEnums_1 = __webpack_require__(14);
var AtParConstants_1 = __webpack_require__(31);
var VM_CART_DETAILS_1 = __webpack_require__(636);
var VM_CART_HEADER_1 = __webpack_require__(637);
var CreateOrdersComponent = (function () {
    function CreateOrdersComponent(dataservice, httpService, spinnerService, commonService, createOrdersService, atParConstant) {
        this.dataservice = dataservice;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.createOrdersService = createOrdersService;
        this.atParConstant = atParConstant;
        this.allDateString = '';
        this.transID = '';
        this.recordsPerPage = 0;
        this.deviceTokenEntry = [];
        this.msgs = [];
        this.lstCartIDs = [];
        this.lstOrgGroups = [];
        this.lstFilterCartIDs = [];
        this.lstBUnits = [];
        this.date1Header = '';
        this.date2Header = '';
        this.date3Header = '';
        this.date4Header = '';
        this.date5Header = '';
        this.showGrid = false;
        this.preField = "";
        this.isShowOrgGroupDD = false;
        this.showDate1Column = false;
        this.showDate2Column = false;
        this.showDate3Column = false;
        this.showDate4Column = false;
        this.showDate5Column = false;
        this.parLocType = '';
        this.reqNo = '';
        this.creationdate = '';
        this.intCntOrderedItems = 0;
        this.blnSortByColumn = true;
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.recordsPerPage = parseInt(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage]);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "constructor");
        }
    }
    CreateOrdersComponent.prototype.ngOnInit = function () {
        try {
            this.getOrgGroupIds();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    };
    CreateOrdersComponent.prototype.getOrgGroupIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.spinnerService.start();
                        this.lstOrgGroups = [];
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.msgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.isShowOrgGroupDD = false;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + ' - ' + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.getBusinessUnits();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.isShowOrgGroupDD = true;
                                            _this.lstBUnits = [];
                                            _this.lstBUnits.push({ label: "Select Bunit", value: "Select Bunit" });
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "getOrgGroupIds");
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.getBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var orgGroupID, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.msgs = [];
                        this.spinnerService.start();
                        this.lstBUnits = [];
                        this.lstBUnits.push({ label: 'Select Bunit', value: 'Select Bunit' });
                        this.lstCartIDs = [];
                        this.selectedBUnit = '';
                        this.cartID = '';
                        orgGroupID = '';
                        if (this.isShowOrgGroupDD) {
                            orgGroupID = this.selectedOrgGroupId;
                        }
                        else {
                            orgGroupID = (this.orgGrpId.split('-'))[0].trim();
                        }
                        if (orgGroupID == 'Select One' || orgGroupID == '' || orgGroupID == null) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(orgGroupID, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                _this.msgs = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        data.DataList.forEach(function (data) {
                                            _this.lstBUnits.push({ label: data, value: data });
                                        });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "getBusinessUnits");
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.ddlOrgGrpIdChanged = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.lstBUnits = [];
                        this.selectedBUnit = '';
                        this.lstCartItemDetails = [];
                        this.lstCartIDs = [];
                        this.cartID = '';
                        this.showGrid = false;
                        return [4 /*yield*/, this.getBusinessUnits()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "ddlOrgGrpIdChanged");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.ddlBUnitChanged = function (e) {
        try {
            this.lstCartItemDetails = [];
            this.lstCartIDs = [];
            this.cartID = '';
            this.showGrid = false;
            this.getCartsForBunit();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlBUnitChanged");
        }
    };
    CreateOrdersComponent.prototype.getCartsForBunit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var orgGroupID, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.msgs = [];
                        orgGroupID = '';
                        if (this.isShowOrgGroupDD) {
                            orgGroupID = this.selectedOrgGroupId;
                        }
                        else {
                            orgGroupID = (this.orgGrpId.split('-'))[0].trim();
                        }
                        if (this.selectedBUnit == 'Select Bunit' || this.selectedBUnit == '' || this.selectedBUnit == null) {
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.createOrdersService.getCartsForBunit(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedBUnit, orgGroupID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.msgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataList != null) {
                                            data.DataList.forEach(function (cart) {
                                                _this.lstCartIDs.push({ value: cart.DESCR, name: cart.CART_ID + ' - ' + cart.DESCR, code: cart.CART_ID });
                                            });
                                            _this.cartID = '';
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "getCartsForBunit");
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.fillCartIDsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                try {
                    query = event.query;
                    this.lstFilterCartIDs = this.filterCartIDs(query, this.lstCartIDs);
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "fillCartIDsAuto");
                }
                return [2 /*return*/];
            });
        });
    };
    CreateOrdersComponent.prototype.filterCartIDs = function (query, lstCartIDs) {
        try {
            var filtered = [];
            if (query == "%") {
                for (var i = 0; i < lstCartIDs.length; i++) {
                    filtered.push(lstCartIDs[i]);
                }
            }
            else {
                if (query.trim().toLowerCase() != '') {
                    if (query.substring(0, 1) != ' ') {
                        for (var i = 0; i < lstCartIDs.length; i++) {
                            var cart = lstCartIDs[i];
                            if (cart.name.toLowerCase().indexOf(query.trim().toLowerCase()) == 0) {
                                filtered.push(cart);
                            }
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
    CreateOrdersComponent.prototype.onGoClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.spinnerService.start();
                        this.lstCartItemDetails = [];
                        this.lstCartHdr = [];
                        this.msgs = [];
                        if (this.isShowOrgGroupDD) {
                            if (this.selectedOrgGroupId == '' || this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == 'Select One') {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select valid Org Group ID' });
                                return [2 /*return*/];
                            }
                        }
                        else {
                        }
                        if (this.selectedBUnit == '' || this.selectedBUnit == null || this.selectedBUnit == undefined || this.selectedBUnit == 'Select Bunit') {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select valid Bunit' });
                            return [2 /*return*/];
                        }
                        if (this.cartID == null || this.cartID == '' || this.cartID == undefined) {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter CartID/ Par Location' });
                            return [2 /*return*/];
                        }
                        else {
                        }
                        return [4 /*yield*/, this.getCartPrevCounts()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "onGoClick");
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.getCartPrevCounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var orgGroupID, cartID_1, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        orgGroupID = '';
                        cartID_1 = '';
                        if (this.isShowOrgGroupDD) {
                            orgGroupID = this.selectedOrgGroupId;
                        }
                        else {
                            orgGroupID = (this.orgGrpId.split('-'))[0].trim();
                        }
                        if (this.cartID.code == null || this.cartID.code == '' || this.cartID.code == undefined) {
                            cartID_1 = this.cartID;
                        }
                        else {
                            cartID_1 = this.cartID.code;
                        }
                        this.showGrid = false;
                        this.lstCartItemDetails = [];
                        this.lstCartHdr = [];
                        this.allDateString = '';
                        this.transID = '';
                        this.parLocType = '';
                        this.creationdate = '';
                        this.reqNo = '';
                        return [4 /*yield*/, this.createOrdersService.getCartPrevCounts(orgGroupID, this.selectedBUnit, cartID_1, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID]).
                                then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataDictionary != null && data.DataDictionary != undefined) {
                                            if (data.DataDictionary['allDateString'] != null && data.DataDictionary['allDateString'] != '' && data.DataDictionary['allDateString'] != undefined) {
                                                if (data.DataDictionary['lstPrevCnts'] != null && data.DataDictionary['lstPrevCnts'] != '' && data.DataDictionary['lstPrevCnts'] != undefined) {
                                                    _this.hdnCartId = cartID_1;
                                                    _this.lstCartItemDetails = data.DataDictionary['lstPrevCnts'];
                                                    _this.dsCompRep = [];
                                                    sessionStorage.setItem('dsCompRep', JSON.stringify(data.DataDictionary['lstPrevCnts']));
                                                    _this.showGrid = true;
                                                    _this.lstCartItemDetails.forEach(function (cartItem) {
                                                        if (cartItem.ChkValue == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()]) {
                                                            cartItem.validationRules = "mandatory,nc_numeric_dot";
                                                        }
                                                        else if (cartItem.ChkValue == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N.toString()]) {
                                                            cartItem.validationRules = "nc_numeric_dot";
                                                        }
                                                    });
                                                    if (data.DataDictionary['lstCartHdr'] != null) {
                                                        _this.lstCartHdr = data.DataDictionary['lstCartHdr'];
                                                    }
                                                    if (data.DataDictionary['transID'] != null && data.DataDictionary['transID'] != '') {
                                                        _this.transID = data.DataDictionary['transID'];
                                                    }
                                                    _this.parLocType = data.DataDictionary['parLocType'];
                                                    _this.creationdate = data.DataDictionary['creationdate'];
                                                    _this.reqNo = data.DataDictionary['reqNo'];
                                                    _this.allDateString = data.DataDictionary['allDateString'];
                                                    _this.showOrHideDateColumns();
                                                }
                                                else {
                                                    _this.msgs = [];
                                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'This Cart is not been Counted Previously.' });
                                                }
                                            }
                                            else {
                                                _this.msgs = [];
                                                _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'This Cart is not been Counted Previously.' });
                                            }
                                        }
                                        else {
                                            _this.msgs = [];
                                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'This Cart is not been Counted Previously.' });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'This Cart is not been Counted Previously.' });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs = [];
                                        if (_this.cartID.code == null || _this.cartID.code == '' || _this.cartID.code == undefined) {
                                            _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'This Cart is not been Counted Previously.' });
                                        }
                                        else {
                                            _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "getCartPrevCounts");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.showOrHideDateColumns = function () {
        try {
            var dateStringArray = this.allDateString.split(',');
            if (dateStringArray.length > 0) {
                switch (dateStringArray.length) {
                    case 0: {
                        this.showDate1Column = false;
                        this.showDate2Column = false;
                        this.showDate3Column = false;
                        this.showDate4Column = false;
                        this.showDate5Column = false;
                        this.date1Header = '';
                        this.date2Header = '';
                        this.date3Header = '';
                        this.date4Header = '';
                        this.date5Header = '';
                        break;
                    }
                    case 1: {
                        this.showDate1Column = true;
                        this.showDate2Column = false;
                        this.showDate3Column = false;
                        this.showDate4Column = false;
                        this.showDate5Column = false;
                        this.date1Header = dateStringArray[0];
                        this.date2Header = '';
                        this.date3Header = '';
                        this.date4Header = '';
                        this.date5Header = '';
                        break;
                    }
                    case 2: {
                        this.showDate1Column = true;
                        this.showDate2Column = true;
                        this.showDate3Column = false;
                        this.showDate4Column = false;
                        this.showDate5Column = false;
                        this.date1Header = dateStringArray[0];
                        this.date2Header = dateStringArray[1];
                        this.date3Header = '';
                        this.date4Header = '';
                        this.date5Header = '';
                        break;
                    }
                    case 3: {
                        this.showDate1Column = true;
                        this.showDate2Column = true;
                        this.showDate3Column = true;
                        this.showDate4Column = false;
                        this.showDate5Column = false;
                        this.date1Header = dateStringArray[0];
                        this.date2Header = dateStringArray[1];
                        this.date3Header = dateStringArray[2];
                        this.date4Header = '';
                        this.date5Header = '';
                        break;
                    }
                    case 4: {
                        this.showDate1Column = true;
                        this.showDate2Column = true;
                        this.showDate3Column = true;
                        this.showDate4Column = true;
                        this.showDate5Column = false;
                        this.date1Header = dateStringArray[0];
                        this.date2Header = dateStringArray[1];
                        this.date3Header = dateStringArray[2];
                        this.date4Header = dateStringArray[3];
                        this.date5Header = '';
                        break;
                    }
                    case 5: {
                        this.showDate1Column = true;
                        this.showDate2Column = true;
                        this.showDate3Column = true;
                        this.showDate4Column = true;
                        this.showDate5Column = true;
                        this.date1Header = dateStringArray[0];
                        this.date2Header = dateStringArray[1];
                        this.date3Header = dateStringArray[2];
                        this.date4Header = dateStringArray[3];
                        this.date5Header = dateStringArray[4];
                        break;
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "showOrHideDateColumns");
        }
    };
    CreateOrdersComponent.prototype.onSubmitClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7, i, cartItem, _a, i, ex_8, finalOutPutDictionary, orgGroupID, ex_9, ex_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 12, 13, 14]);
                        this.spinnerService.start();
                        try {
                            if (this.cartID != "" && this.cartID != null && this.cartID != undefined) {
                                if (this.cartID.code != null && this.cartID.code != '' && this.cartID.code != undefined) {
                                    if (this.hdnCartId.toUpperCase().trim() != this.cartID.code.toUpperCase().trim()) {
                                        this.msgs = [];
                                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Cart ID/Par Location has been changed after the report is run, click on Go to create order for new data selected.' });
                                        return [2 /*return*/];
                                    }
                                }
                                else if (this.hdnCartId.toUpperCase().trim() != this.cartID.toUpperCase().trim()) {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Cart ID/Par Location has been changed after the report is run, click on Go to create order for new data selected.' });
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter  CartID/Par Location' });
                                return [2 /*return*/];
                            }
                        }
                        catch (ex) {
                            this.msgs = [];
                            this.clientErrorMsg(ex, "onSubmitClick");
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        this.msgs = [];
                        return [4 /*yield*/, this.commonService.getProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], '2', 'ALLOW_EXCESS_PAR')
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this._strAllowExcessPar = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    return;
                                }
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_7 = _b.sent();
                        this.msgs = [];
                        this.clientErrorMsg(ex_7, "onSubmitClick");
                        return [2 /*return*/];
                    case 4:
                        try {
                            this.msgs = [];
                            this.dsCompRep = [];
                            this.dsCompRep = JSON.parse(sessionStorage.getItem('dsCompRep'));
                            this.lstCartItemDetails.forEach(function (cartItem) {
                                var dataRow = _this.dsCompRep.filter(function (x) { return x.INV_ITEM_ID == cartItem.INV_ITEM_ID && x.ROWINDEX == cartItem.ROWINDEX; });
                                if (cartItem.COUNTQTY.trim() != '' && cartItem.COUNTQTY.toUpperCase().trim() != 'NC') {
                                    dataRow[0].COUNTQTY = cartItem.COUNTQTY;
                                }
                                else if ((cartItem.COUNTQTY.toString().trim().length == 0) || (cartItem.COUNTQTY.toUpperCase().toString() == 'NC') || (Number.isInteger(parseInt(cartItem.COUNTQTY.toString())))) {
                                    if (dataRow[0].ChkValue == 'Y') {
                                        dataRow[0].COUNTQTY = cartItem.COUNTQTY;
                                    }
                                    else {
                                        if (cartItem.COUNTQTY.length == 0) {
                                            dataRow[0].COUNTQTY = 'NC';
                                        }
                                    }
                                }
                                else {
                                }
                            });
                            sessionStorage.setItem('dsLatestCompRep', JSON.stringify(this.dsCompRep));
                            this.dsLatestCompRep = JSON.parse(sessionStorage.getItem('dsLatestCompRep'));
                        }
                        catch (ex) {
                            this.msgs = [];
                            this.clientErrorMsg(ex, "onSubmitClick");
                            return [2 /*return*/];
                        }
                        try {
                            this.msgs = [];
                            for (i = 0; i < this.dsLatestCompRep.length; i++) {
                                cartItem = this.dsLatestCompRep[i];
                                if (cartItem.COUNTQTY.trim() != '' && cartItem.COUNTQTY.toUpperCase().trim() != 'NC') {
                                    if (!isNaN(Number(cartItem.COUNTQTY.toString()))) {
                                        if (this._strAllowExcessPar.toString() == 'N') {
                                            if (parseFloat(cartItem.OPTIMAL_QTY) < parseFloat(cartItem.COUNTQTY)) {
                                                this.msgs = [];
                                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Count Quantity should be less than Par Value' });
                                                return [2 /*return*/];
                                            }
                                        }
                                    }
                                    else {
                                        this.msgs = [];
                                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Numeric values to Count Quantity' });
                                        return [2 /*return*/];
                                    }
                                }
                                else if ((cartItem.COUNTQTY.toString().trim().length == 0) || (cartItem.COUNTQTY.toUpperCase().toString().trim() == 'NC') || (Number.isInteger(parseInt(cartItem.COUNTQTY.toString())))) {
                                    if (cartItem.ChkValue == 'Y') {
                                        if (cartItem.COUNTQTY.toUpperCase().trim() == 'NC' || cartItem.COUNTQTY == '') {
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Mandatory Counts Required' });
                                            return [2 /*return*/];
                                        }
                                    }
                                }
                            }
                        }
                        catch (ex) {
                            this.msgs = [];
                            this.clientErrorMsg(ex, "onSubmitClick");
                            return [2 /*return*/];
                        }
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        _a = this;
                        return [4 /*yield*/, this.outputDataset(this.dsCompRep)];
                    case 6:
                        _a._strQtyOption = _b.sent();
                        if (this._strQtyOption == '') {
                            return [2 /*return*/];
                        }
                        this.lstOutPutHeader = [];
                        this.outPutHeader = new VM_CART_HEADER_1.VM_CART_HEADER();
                        this.outPutHeader.CART_ID = this.hdnCartId.toUpperCase();
                        this.outPutHeader.BUSINESS_UNIT = this.selectedBUnit;
                        this.outPutHeader.USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        this.outPutHeader.QUANTITY_OPTION = this._strQtyOption;
                        this.outPutHeader.TRANSACTION_ID = parseInt(this.transID);
                        this.outPutHeader.START_DATETIME = new Date();
                        this.outPutHeader.END_DATETIME = new Date();
                        this.outPutHeader.CMTS = '';
                        this.outPutHeader.NO_OF_SCANS = 0 + '';
                        this.outPutHeader.TOTAL_RECORDS = this.dsCompRep.length.toString();
                        this.outPutHeader.NO_OF_ORDERED_ITEMS = this.intCntOrderedItems.toString();
                        if (this.cartID.value != null && this.cartID.value != undefined && this.cartID.value != '') {
                            this.outPutHeader.DESCR = this.cartID.value;
                        }
                        this.lstOutPutHeader.push(this.outPutHeader);
                        this.lstOutPutDetails = [];
                        if (this._strQtyOption != '') {
                            this.intCntOrderedItems = 0;
                            this.dsLatestCompRep.forEach(function (cartItem) {
                                if (cartItem.COUNTQTY.trim() != '' && cartItem.COUNTQTY.toUpperCase().trim() != 'NC') {
                                    _this.outPutDetail = new VM_CART_DETAILS_1.VM_CART_DETAILS();
                                    _this.outPutDetail.ITEM_ID = cartItem.INV_ITEM_ID;
                                    var _strCompt = '';
                                    _strCompt = cartItem.COMPARTMENT.trim();
                                    if (_strCompt == ' ') {
                                        _strCompt = _strCompt.replace("'", "''");
                                    }
                                    _this.outPutDetail.COMPARTMENT = _strCompt;
                                    _this.outPutDetail.COUNT_QUANTITY = parseFloat(cartItem.COUNTQTY);
                                    _this.outPutDetail.OPTIMAL_QUANTITY = parseFloat(cartItem.OPTIMAL_QTY);
                                    _this.outPutDetail.LNCMTS = '';
                                    _this.outPutDetail.UOM = cartItem.UOM;
                                    _this.outPutDetail.PRICE = parseFloat(cartItem.ITEM_PRICE);
                                    _this.outPutDetail.COUNT_REQUIRED = 'Y';
                                    var _strItemType = '';
                                    _strItemType = cartItem.INVENTORY_ITEM;
                                    if (_strItemType == 'STOCK') {
                                        _strItemType = 'Y';
                                    }
                                    else if (_strItemType == 'NONSTOCK') {
                                        _strItemType = 'N';
                                    }
                                    else if (_strItemType == 'STOCKLESS') {
                                        _strItemType = 'STOCKLESS';
                                    }
                                    else if (_strItemType == 'CONSIGN') {
                                        _strItemType = 'CONSIGN';
                                    }
                                    else if (_strItemType == 'STOCKTRANSFER') {
                                        _strItemType = 'STOCKTRANSFER';
                                    }
                                    _this.outPutDetail.INVENTORY_ITEM = _strItemType;
                                    _this.outPutDetail.ITEM_DESCR = cartItem.ITEM_DESCR;
                                    _this.outPutDetail.CART_REPLEN_CTRL = cartItem.CART_REPLEN_CTRL;
                                    _this.outPutDetail.CART_REPLEN_OPT = cartItem.CART_REPLEN_OPT;
                                    _this.outPutDetail.MAX_QTY = parseFloat(cartItem.MAX_QTY);
                                    _this.outPutDetail.FOQ = cartItem.FOQ;
                                    _this.outPutDetail.CUST_ITEM_NO = cartItem.CUST_ITEM_ID;
                                    _this.outPutDetail.COUNT_ORDER = parseFloat(cartItem.COUNT_ORDER);
                                    _this.outPutDetail.ITEM_COUNT_ORDER = parseFloat(cartItem.COUNT_ORDER);
                                    _this.lstOutPutDetails.push(_this.outPutDetail);
                                    _this.ChkCountAndParValue(cartItem.OPTIMAL_QTY.toString(), cartItem.COUNTQTY, _this._strQtyOption);
                                }
                            });
                        }
                        for (i = 0; i < this.lstOutPutHeader.length; i++) {
                            this.lstOutPutHeader[i].NO_OF_ORDERED_ITEMS = this.intCntOrderedItems.toString();
                            this.lstOutPutHeader[i].REQ_NO = this.reqNo;
                            this.lstOutPutHeader[i].CREATION_DT = this.creationdate;
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        ex_8 = _b.sent();
                        this.clientErrorMsg(ex_8, "onSubmitClick");
                        return [2 /*return*/];
                    case 8:
                        _b.trys.push([8, 10, , 11]);
                        finalOutPutDictionary = { 'HEADER': this.lstOutPutHeader, 'DETAILS': this.lstOutPutDetails };
                        orgGroupID = '';
                        if (this.isShowOrgGroupDD) {
                            orgGroupID = this.selectedOrgGroupId;
                        }
                        else {
                            orgGroupID = (this.orgGrpId.split('-'))[0].trim();
                        }
                        return [4 /*yield*/, this.createOrdersService.sendCartCounts(finalOutPutDictionary, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedBUnit, this.cartID.code, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], orgGroupID, this.transID)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.selectedBUnit = 'Select Bunit';
                                _this.lstCartItemDetails = [];
                                _this.lstCartIDs = [];
                                _this.cartID = '';
                                _this.showGrid = false;
                                _this.lstCartItemDetails = [];
                                _this.lstCartHdr = [];
                                _this.allDateString = '';
                                _this.transID = '';
                                _this.parLocType = '';
                                _this.creationdate = '';
                                _this.reqNo = '';
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs = [];
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 9:
                        _b.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        ex_9 = _b.sent();
                        this.clientErrorMsg(ex_9, "onSubmitClick");
                        return [2 /*return*/];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        ex_10 = _b.sent();
                        this.clientErrorMsg(ex_10, "onSubmitClick");
                        return [2 /*return*/];
                    case 13:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.outputDataset = function (ds) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _strQtyOption, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _strQtyOption = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!(this.lstCartItemDetails.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.getProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], '2', 'QTY_OPTION')
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _strQtyOption = data.DataVariable.toString();
                                        if (_strQtyOption.toUpperCase() == 'COUNT') {
                                            _strQtyOption = '01';
                                        }
                                        else if (_strQtyOption.toUpperCase() == 'REQUEST') {
                                            _strQtyOption = '02';
                                        }
                                        else {
                                            if (_this.parLocType != null && _this.parLocType != '') {
                                                _strQtyOption = _this.parLocType;
                                            }
                                            else {
                                                _strQtyOption = '03';
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
                        _a.label = 3;
                    case 3: return [2 /*return*/, _strQtyOption];
                    case 4:
                        ex_11 = _a.sent();
                        _strQtyOption = '';
                        this.clientErrorMsg(ex_11, "outputDataset");
                        return [2 /*return*/, _strQtyOption];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CreateOrdersComponent.prototype.ChkCountAndParValue = function (pParValue, pCountValue, pOption) {
        try {
            if (pParValue != '' && (parseFloat(pParValue)) && pCountValue != '' && (parseFloat(pCountValue))) {
                if (pOption != '') {
                    if (pOption == '01') {
                        if (parseFloat(pParValue) > parseFloat(pCountValue)) {
                            this.intCntOrderedItems++;
                        }
                    }
                    else if (pOption == '02') {
                        if (parseFloat(pCountValue) > 0) {
                            this.intCntOrderedItems++;
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ChkCountAndParValue");
        }
    };
    CreateOrdersComponent.prototype.customSort = function (event) {
        var element = event;
        var result = null;
        try {
            if (this.preField == element.field) {
                if (element.order == 1) {
                    element.order = 1;
                }
                else {
                    element.order = -1;
                }
            }
            else {
                if (element.field != 'INV_ITEM_ID') {
                    element.order = 1;
                }
                else {
                    element.order = -1;
                }
            }
            this.preField = element.field;
            this.lstCartItemDetails = this.lstCartItemDetails.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null) {
                    result = -1;
                }
                else if (a[element.field] != null && b[element.field] == null) {
                    result = 1;
                }
                else if (a[element.field] == null && b[element.field] == null) {
                    result = 0;
                }
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string') {
                    if (Number(a[element.field]) && Number(b[element.field])) {
                        result = (parseFloat(a[element.field]) == parseFloat(b[element.field])) ? 0 : (parseFloat(a[element.field]) < parseFloat(b[element.field])) ? -1 : (parseFloat(a[element.field]) > parseFloat(b[element.field])) ? 1 : 0;
                    }
                    else {
                        result = a[element.field].localeCompare(b[element.field]);
                    }
                }
                else {
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                }
                return (element.order * result);
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    };
    CreateOrdersComponent.prototype.customSort1 = function (event, elementType) {
        if (elementType === void 0) { elementType = ""; }
        var element = event;
        var result = null;
        if (this.preField == element.field) {
            this.blnSortByColumn = !this.blnSortByColumn;
            // element.order = !element.order;
        }
        else {
            this.blnSortByColumn = true;
        }
        this.preField = element.field;
        try {
            this.lstCartItemDetails = this.lstCartItemDetails.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null) {
                    result = -1;
                }
                else if (a[element.field] != null && b[element.field] == null) {
                    result = 1;
                }
                else if (a[element.field] == null && b[element.field] == null) {
                    result = 0;
                }
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string') {
                    if (Number(a[element.field]) && Number(b[element.field])) {
                        result = (parseFloat(a[element.field]) == parseFloat(b[element.field])) ? 0 : (parseFloat(a[element.field]) < parseFloat(b[element.field])) ? -1 : (parseFloat(a[element.field]) > parseFloat(b[element.field])) ? 1 : 0;
                    }
                    else {
                        result = a[element.field].localeCompare(b[element.field]);
                    }
                }
                else {
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                }
                return (element.order * result);
            });
            if (this.blnSortByColumn == false) {
                element.order = -1;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort1");
        }
    };
    CreateOrdersComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    CreateOrdersComponent.prototype.OnDestroy = function () {
        sessionStorage.removeItem('dsLatestCompRep');
        sessionStorage.removeItem('dsCompRep');
        this.showGrid = null;
        this.isShowOrgGroupDD = null;
        this.orgGrpId = null;
        this.selectedOrgGroupId = null;
        this.selectedBUnit = null;
        this.allDateString = null;
        this.transID = null;
        this.recordsPerPage = null;
        this.cartID = null;
        this.deviceTokenEntry = null;
        this.msgs = null;
        this.lstCartIDs = null;
        this.lstOrgGroups = null;
        this.lstFilterCartIDs = null;
        this.lstBUnits = null;
        this.orgGroupData = null;
        this.lstCartItemDetails = null;
    };
    return CreateOrdersComponent;
}());
CreateOrdersComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1936),
        providers: [
            datatableservice_1.datatableservice,
            atpar_common_service_1.AtParCommonService,
            cart_create_orders_service_1.CreateOrdersServices,
            AtParConstants_1.AtParConstants
        ]
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice,
        HttpService_1.HttpService,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        cart_create_orders_service_1.CreateOrdersServices,
        AtParConstants_1.AtParConstants])
], CreateOrdersComponent);
exports.CreateOrdersComponent = CreateOrdersComponent;


/***/ }),

/***/ 1422:
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
var HttpService_1 = __webpack_require__(12);
var http_1 = __webpack_require__(38);
var AtParEnums_1 = __webpack_require__(14);
var event_spinner_service_1 = __webpack_require__(24);
var AtParEnums_2 = __webpack_require__(14);
var linq_es5_1 = __webpack_require__(115);
var AtParEnums_3 = __webpack_require__(14);
var atpar_common_service_1 = __webpack_require__(43);
var cartcount_service_1 = __webpack_require__(1711);
var datatable_1 = __webpack_require__(71);
var AtParConstants_1 = __webpack_require__(31);
var CriticalItemsComponent = (function () {
    function CriticalItemsComponent(httpservice, _http, spinnerService, commonService, CartCommonService, atParConstant) {
        this.httpservice = httpservice;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.CartCommonService = CartCommonService;
        this.atParConstant = atParConstant;
        this.table = true;
        this.form = false;
        this.dropdownData = [];
        this.bUnitdropdownData = [];
        this.selectedOrgGroupID = "";
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.errorMessage = "";
        this.selectedOrgGrpID = "";
        this.blnStatusMsg = false;
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.selectedOrgGroupId = "";
        this.selectedDropDownUserId = "";
        this.selectedBunit = "";
        this.selectedDescription = "";
        this.lstOrgGroups = [];
        this.lstBUnits = [];
        this.lstFilteredBUnits = [];
        this.lstFilteredCartIDs = [];
        this.lstUsers = [];
        this.content = false;
        this.ddlOrgGrpID = false;
        this.lblOrgGrpID = false;
        this.lstBUnitsData = [];
        this.FilterCartsId = new Array();
        this.selectedDropDownBunitID = "";
        this.selectedDropDownCartID = "";
        this.blnSortByColumn = true;
        this.custom = "custom";
        this.preField = "";
        this.dataCheckedSorting = [];
        this.grdHide = false;
        this.strBUnit = "";
        this.drpCartItems = [];
        this.buttonID = "";
    }
    CriticalItemsComponent.prototype.ngOnInit = function () {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedCarts = new Array();
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.RecordsPerPage];
        this.bindBusinessUnit();
    };
    CriticalItemsComponent.prototype.bindBusinessUnit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpservice.handleError).then(function (res) { return res.json(); }).then(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.spinnerService.stop();
                                        _this.lstOrgGroups = [];
                                        _this.orgGroupData = response.DataList;
                                        _this.blnStatusMsg = false;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.blnShowOrgGroupDD = false;
                                            _this.orgGrpId1 = response.DataList[0].ORG_GROUP_ID + " - " + response.DataList[0].ORG_GROUP_NAME;
                                            _this.orgGrpId = response.DataList[0].ORG_GROUP_ID;
                                            _this.populateBusinessunits();
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else if (response.DataList.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.blnShowOrgGroupLabel = false;
                                            _this.lstFilteredCartIDs = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstFilteredCartIDs.push({
                                                label: "Select Cart ID/Par Location",
                                                value: ""
                                            });
                                            _this.lstFilteredBUnits.push({
                                                label: "Select Company",
                                                value: ""
                                            });
                                            _this.lstOrgGroups.push({
                                                label: "Select One",
                                                value: ""
                                            });
                                            for (var i = 0; i < response.DataList.length; i++) {
                                                if (response.DataList[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: response.DataList[i].ORG_GROUP_ID + " - " + response.DataList[i].ORG_GROUP_NAME, value: response.DataList[i].ORG_GROUP_ID });
                                                }
                                            }
                                            // this.growlMessage = [];
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "bindBusinessUnit");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CriticalItemsComponent.prototype.ddlOrgGrpId_SelectChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        this.grdHide = false;
                        if (!(this.blnShowOrgGroupLabel == true)) return [3 /*break*/, 1];
                        this.orgGroupIDForDBUpdate = "";
                        this.orgGroupIDForDBUpdate = this.orgGrpId;
                        this.lstFilteredBUnits = [];
                        this.lstFilteredCartIDs = [];
                        this.lstFilteredCartIDs.push({
                            label: "Select Cart ID/Par Location",
                            value: ""
                        });
                        this.lstFilteredBUnits.push({
                            label: "Select Company",
                            value: ""
                        });
                        return [3 /*break*/, 8];
                    case 1:
                        if (!(this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "")) return [3 /*break*/, 2];
                        this.grdHide = false;
                        this.lstFilteredBUnits = [];
                        this.lstFilteredCartIDs = [];
                        this.lstFilteredCartIDs.push({
                            label: "Select Cart ID/Par Location",
                            value: ""
                        });
                        this.lstFilteredBUnits.push({
                            label: "Select Company",
                            value: ""
                        });
                        this.selectedOrgGroupId = "";
                        this.orgGroupIDForDBUpdate = "";
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        return [3 /*break*/, 8];
                    case 2:
                        this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, , 8]);
                        this.selectedBunit = "";
                        this.selectedDropDownCartID = "";
                        this.lstFilteredBUnits = [];
                        this.lstFilteredCartIDs = [];
                        this.lstFilteredCartIDs.push({
                            label: "Select Cart ID/Par Location",
                            value: ""
                        });
                        this.lstFilteredBUnits.push({
                            label: "Select Company",
                            value: ""
                        });
                        if (!(this.orgGroupIDForDBUpdate != null || this.orgGroupIDForDBUpdate != undefined || this.orgGroupIDForDBUpdate != "")) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_2.BusinessType.Inventory).
                                catch(this.httpservice.handleError).then(function (res) { return res.json(); }).then(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.lstBUnits = response.DataList;
                                        if (response.DataList.length > 0) {
                                            for (var i = 0; i < response.DataList.length; i++) {
                                                _this.lstFilteredBUnits.push({ label: response.DataList[i], value: response.DataList[i] });
                                            }
                                            break;
                                        }
                                        else {
                                            _this.grdHide = false;
                                            _this.spinnerService.stop();
                                            _this.lstFilteredBUnits = [];
                                            _this.lstFilteredBUnits.push({
                                                label: "Select Company",
                                                value: ""
                                            });
                                            _this.lstFilteredCartIDs = [];
                                            _this.lstFilteredCartIDs.push({
                                                label: "Select Cart ID/Par Location",
                                                value: ""
                                            });
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.lstFilteredBUnits = [];
                                        _this.lstFilteredBUnits.push({
                                            label: "Select Company",
                                            value: ""
                                        });
                                        _this.lstFilteredCartIDs = [];
                                        _this.lstFilteredCartIDs.push({
                                            label: "Select Cart ID/Par Location",
                                            value: ""
                                        });
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.lstFilteredBUnits = [];
                                        _this.lstFilteredBUnits.push({
                                            label: "Select Company",
                                            value: ""
                                        });
                                        _this.lstFilteredCartIDs = [];
                                        _this.lstFilteredCartIDs.push({
                                            label: "Select Cart ID/Par Location",
                                            value: ""
                                        });
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.lstFilteredBUnits = [];
                                        _this.lstFilteredBUnits.push({
                                            label: "Select Company",
                                            value: ""
                                        });
                                        _this.lstFilteredCartIDs = [];
                                        _this.lstFilteredCartIDs.push({
                                            label: "Select Cart ID/Par Location",
                                            value: ""
                                        });
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        this.lstFilteredBUnits = [];
                        this.lstFilteredCartIDs = [];
                        this.lstFilteredCartIDs.push({
                            label: "Select Cart ID/Par Location",
                            value: ""
                        });
                        this.lstFilteredBUnits.push({
                            label: "Select Company",
                            value: ""
                        });
                        this.grdHide = false;
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select valid Org GroupID' });
                        this.spinnerService.stop();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "ddlOrgGrpId_SelectChanged");
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    CriticalItemsComponent.prototype.ddlCart_SelectChanged = function () {
        this.grdHide = false;
    };
    CriticalItemsComponent.prototype.populateBusinessunits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGrpId, AtParEnums_2.BusinessType.Inventory).
                                catch(this.httpservice.handleError).then(function (res) { return res.json(); }).then(function (response) {
                                _this.lstFilteredBUnits = [];
                                _this.lstFilteredCartIDs = [];
                                _this.lstFilteredCartIDs.push({
                                    label: "Select Cart ID/Par Location",
                                    value: ""
                                });
                                _this.lstFilteredBUnits.push({
                                    label: "Select Company",
                                    value: ""
                                });
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        _this.lstFilteredBUnits = [];
                                        _this.lstFilteredCartIDs = [];
                                        _this.lstFilteredCartIDs.push({
                                            label: "Select Cart ID/Par Location",
                                            value: ""
                                        });
                                        _this.lstFilteredBUnits.push({
                                            label: "Select Company",
                                            value: ""
                                        });
                                        if (response.DataList.length > 0) {
                                            for (var b = 0; b < response.DataList.length; b++) {
                                                _this.lstFilteredBUnits.push({ label: response.DataList[b], value: response.DataList[b] });
                                            }
                                        }
                                        else {
                                            _this.grdHide = false;
                                            _this.spinnerService.stop();
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "populateBusinessunits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CriticalItemsComponent.prototype.filterBusinessUnits = function (query, businessunits) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < businessunits.length; i++) {
                var Bunitvalue = businessunits[i];
                filtered.push(Bunitvalue);
            }
        }
        else {
            if (query.length >= 3) {
                for (var i = 0; i < businessunits.length; i++) {
                    var Bunitvalue = businessunits[i];
                    if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(Bunitvalue);
                    }
                }
            }
        }
        return filtered;
    };
    CriticalItemsComponent.prototype.ddlBUnit_SelectChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.grdHide = false;
                        this.selectedDropDownCartID = "";
                        this.spinnerService.start();
                        if (!(this.selectedBunit == "")) return [3 /*break*/, 1];
                        this.lstFilteredCartIDs = [];
                        this.lstFilteredCartIDs.push({
                            label: "Select Cart ID/Par Location",
                            value: ""
                        });
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.CartCommonService.GetCartBunitsInfo(this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.OrgGrpID], this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.UserID].toString(), this.selectedBunit).
                                catch(this.httpservice.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstFilteredCartIDs = [];
                                        _this.spinnerService.stop();
                                        _this.lstFilteredCartIDs.push({
                                            label: "Select Cart ID/Par Location",
                                            value: ""
                                        });
                                        if (data.DataList.length > 0 && data.DataList.length != null) {
                                            _this.growlMessage = [];
                                            if (_this.selectedBunit != "") {
                                                var bUnits = data.DataList;
                                                var lstdata = linq_es5_1.asEnumerable(bUnits).Where(function (x) { return x.BUSINESS_UNIT == _this.selectedBunit; }).ToArray();
                                                for (var bu = 0; bu < lstdata.length; bu++) {
                                                    _this.lstFilteredCartIDs.push({
                                                        label: lstdata[bu].CART_ID + " - " + lstdata[bu].DESCR,
                                                        value: lstdata[bu].CART_ID
                                                    });
                                                }
                                            }
                                            break;
                                        }
                                        else {
                                            _this.grdHide = false;
                                            _this.spinnerService.stop();
                                            _this.lstFilteredCartIDs = [];
                                            _this.lstFilteredCartIDs.push({
                                                label: "Select Cart ID/Par Location",
                                                value: ""
                                            });
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.lstFilteredCartIDs = [];
                                        _this.lstFilteredCartIDs.push({
                                            label: "Select Cart ID/Par Location",
                                            value: ""
                                        });
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.lstFilteredCartIDs = [];
                                        _this.lstFilteredCartIDs.push({
                                            label: "Select Cart ID/Par Location",
                                            value: ""
                                        });
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.lstFilteredCartIDs = [];
                                        _this.lstFilteredCartIDs.push({
                                            label: "Select Cart ID/Par Location",
                                            value: ""
                                        });
                                        _this.growlMessage = [];
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
                        this.grdHide = false;
                        this.lstFilteredCartIDs = [];
                        this.lstFilteredCartIDs.push({
                            label: "Select Cart ID/Par Location",
                            value: ""
                        });
                        this.clientErrorMsg(ex_4, "ddlBUnit_SelectChanged");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CriticalItemsComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstCheckedCarts = [];
                        this.lstgridfilterData = [];
                        this.errorMessage = "";
                        if (this.grdHide == true) {
                            this.dataTableComponent.reset();
                        }
                        if (!(this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == undefined)) return [3 /*break*/, 1];
                        this.grdHide = false;
                        this.growlMessage = [];
                        this.errorMessage = "Please select valid orgGroup ID";
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errorMessage });
                        this.content = false;
                        return [3 /*break*/, 7];
                    case 1:
                        if (!(this.selectedBunit == "")) return [3 /*break*/, 2];
                        this.grdHide = false;
                        this.growlMessage = [];
                        this.errorMessage = "Please Select Business Unit / Company";
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errorMessage });
                        this.content = false;
                        return [3 /*break*/, 7];
                    case 2:
                        if (!(this.selectedDropDownCartID == "")) return [3 /*break*/, 3];
                        this.grdHide = false;
                        this.growlMessage = [];
                        this.errorMessage = "Please select valid Location";
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errorMessage });
                        this.content = false;
                        return [3 /*break*/, 7];
                    case 3:
                        this.growlMessage = [];
                        this.content = true;
                        this.BindGrid = [];
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        this.spinnerService.start();
                        this.grdHide = false;
                        return [4 /*yield*/, this.CartCommonService.GetCartItemInfo(this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.OrgGrpID], this.selectedBunit, this.selectedDropDownCartID, this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.UserID].toString(), this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.ProfileID].toString()).
                                catch(this.httpservice.handleError).then(function (res) { return res.json(); }).then(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.growlMessage = [];
                                            _this.spinnerService.stop();
                                            _this.BindGrid = [];
                                            _this.grdHide = true;
                                            var bindData = response.DataDictionary["listDetails"];
                                            var lstHeaders = response.DataDictionary["listHeaders"];
                                            for (var i = 0; i <= bindData.length - 1; i++) {
                                                bindData[i].OPTIMAL_QTY = +bindData[i].OPTIMAL_QTY;
                                                if (bindData[i].ChkValue == "Y") {
                                                    bindData[i].checkvalue = true;
                                                }
                                                else {
                                                    bindData[i].checkvalue = false;
                                                }
                                            }
                                            var griddata = bindData;
                                            if (lstHeaders.length > 0) {
                                                if (griddata.length > 0) {
                                                    for (var i = 0; i < griddata.length; i++) {
                                                        switch (griddata[i].CART_REPLEN_OPT.toString()) {
                                                            case "01":
                                                            case "1":
                                                                griddata[i].CART_REPLEN_OPT = "Stock";
                                                                break;
                                                            case "02":
                                                            case "2":
                                                                griddata[i].CART_REPLEN_OPT = "Non Stock";
                                                                break;
                                                            case "03":
                                                            case "3":
                                                                griddata[i].CART_REPLEN_OPT = "Stockless";
                                                                break;
                                                            case "04":
                                                            case "4":
                                                                griddata[i].CART_REPLEN_OPT = "Consignment";
                                                                break;
                                                            case "05":
                                                            case "5":
                                                                griddata[i].CART_REPLEN_OPT = "Not Replenished";
                                                                break;
                                                        }
                                                    }
                                                }
                                                _this.BindGrid = griddata;
                                                var orderBydData = linq_es5_1.asEnumerable(_this.BindGrid).OrderBy(function (x) { return x.checkvalue == false && x.INV_ITEM_ID; }).ToArray();
                                                _this.BindGrid = [];
                                                _this.BindGrid = orderBydData;
                                                _this.bindDataSortedGrid();
                                                _this.grdHide = true;
                                                break;
                                            }
                                        }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.grdHide = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_5 = _a.sent();
                        this.grdHide = false;
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_5, "btnGo_Click");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CriticalItemsComponent.prototype.bindDataSortedGrid = function () {
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        try {
            for (var i = 0; i <= this.BindGrid.length - 1; i++) {
                if (this.BindGrid[i].ChkValue == "Y") {
                    this.dataCheckedSorting.push(this.BindGrid[i]);
                }
                else {
                    this.dataUncheckedSorting.push(this.BindGrid[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindDataSortedGrid");
        }
    };
    //Sorting for Gridview
    CriticalItemsComponent.prototype.customSort1 = function (event, elementType) {
        if (elementType === void 0) { elementType = ""; }
        var element = event;
        this.BindGrid = [];
        if (this.preField == element.field) {
            this.blnSortByColumn = !this.blnSortByColumn;
            // element.order = !element.order;
        }
        else {
            this.blnSortByColumn = true;
        }
        this.preField = element.field;
        this.sortedCheckedrec = [];
        this.sortedUnCheckedrec = [];
        try {
            if (elementType == AtParEnums_3.ElementType[AtParEnums_3.ElementType.FLOAT].toString()) {
                this.sortedCheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                    if (parseFloat(a[element.field]) < parseFloat(b[element.field]))
                        return -1;
                    if (parseFloat(a[element.field]) > parseFloat(b[element.field]))
                        return 1;
                    return 0;
                });
                this.sortedUnCheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                    if (parseFloat(a[element.field]) < parseFloat(b[element.field]))
                        return -1;
                    if (parseFloat(a[element.field]) > parseFloat(b[element.field]))
                        return 1;
                    return 0;
                });
            }
            else {
                this.sortedCheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                    if (a[element.field] < b[element.field])
                        return -1;
                    if (a[element.field] > b[element.field])
                        return 1;
                    return 0;
                });
                this.sortedUnCheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                    if (a[element.field] < b[element.field])
                        return -1;
                    if (a[element.field] > b[element.field])
                        return 1;
                    return 0;
                });
            }
            if (this.blnSortByColumn == false) {
                this.BindGrid = [];
                this.BindGrid = this.sortedCheckedrec.reverse().concat(this.sortedUnCheckedrec.reverse());
            }
            else {
                this.BindGrid = [];
                this.BindGrid = this.sortedCheckedrec.concat(this.sortedUnCheckedrec);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
        this.sortedCheckedrec = [];
        this.sortedUnCheckedrec = [];
    };
    CriticalItemsComponent.prototype.customSort = function (event, field) {
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
        this.sortedCheckedrec = [];
        this.sortedUnCheckedrec = [];
        var result = null;
        var order;
        try {
            this.sortedCheckedrec = this.dataCheckedSorting.sort(function (a, b) {
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
            this.sortedUnCheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
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
        this.BindGrid = this.sortedCheckedrec.concat(this.sortedUnCheckedrec);
        this.sortedCheckedrec = [];
        this.sortedUnCheckedrec = [];
    };
    //Check All for Menu Datatable
    CriticalItemsComponent.prototype.checkAll = function () {
        this.lstCheckedCarts = [];
        try {
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length != 0) {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].ChkValue = "Y";
                    this.lstCheckedCarts.push(this.lstgridfilterData[i]);
                }
            }
            else {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.BindGrid.length) {
                    this.EndIndex = this.BindGrid.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.BindGrid[i].checkvalue = true;
                    this.BindGrid[i].ChkValue = "Y";
                    this.lstCheckedCarts.push(this.BindGrid[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    //UnCheck All for Menu Datatable
    CriticalItemsComponent.prototype.unCheckAll = function () {
        this.lstCheckedCarts = [];
        try {
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length != 0) {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].ChkValue = "N";
                    this.lstCheckedCarts.push(this.lstgridfilterData[i]);
                }
            }
            else {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.BindGrid.length) {
                    this.EndIndex = this.BindGrid.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.BindGrid[i].checkvalue = false;
                    this.BindGrid[i].ChkValue = "N";
                    this.lstCheckedCarts.push(this.BindGrid[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    //Save Click to Save data to database
    CriticalItemsComponent.prototype.btnSubmit_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lstdata, i, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lstdata = this.BindGrid;
                        if (lstdata.length > 0) {
                            for (i = 0; i < lstdata.length; i++) {
                                if (lstdata[i].checkvalue == true) {
                                    lstdata[i].ChkValue = "Y";
                                }
                                else {
                                    lstdata[i].ChkValue = "N";
                                }
                            }
                            this.lstCheckedCarts = lstdata;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.CartCommonService.AllocateCartItemInfo(this.lstCheckedCarts, this.selectedBunit, this.selectedDropDownCartID, this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.UserID].toString()).catch(this.httpservice.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.spinnerService.stop();
                                            _this.selectedDropDownCartID = "";
                                            // this.selectedBunit = "";
                                            //if (this.blnShowOrgGroupLabel == true) {
                                            //    this.selectedOrgGroupId = "";
                                            //}
                                            //else {
                                            //    this.orgGroupIDForDBUpdate = "";
                                            //    this.selectedBunit = 'Select Company';
                                            //    this.selectedOrgGroupId = "";
                                            //}
                                            _this.lstgridfilterData = [];
                                            _this.BindGrid = [];
                                            _this.grdHide = false;
                                            _this.lstCheckedCarts = [];
                                            _this.selectedDropDownCartID = "";
                                            _this.selectedBunit = "";
                                            // this.lstgridfilterData = [];
                                            //// this.lstOrgGroups = [];
                                            // this.bindBusinessUnit();
                                            // this.lstFilteredBUnits = [];
                                            // this.lstFilteredBUnits.push({
                                            //     label: "Select Company",
                                            //     value: ""
                                            // })
                                            _this.lstFilteredCartIDs = [];
                                            _this.lstFilteredCartIDs.push({
                                                label: "Select Cart ID/Par Location",
                                                value: ""
                                            });
                                            _this.growlMessage = [];
                                            data.StatusMessage = "Updated Successfully";
                                            _this.growlMessage.push({
                                                severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully"
                                            });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.grdHide = true;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.grdHide = true;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.grdHide = true;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
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
                        this.clientErrorMsg(ex_6, "btnSubmit_Click");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CriticalItemsComponent.prototype.close = function () {
        this.table = true;
        this.form = false;
    };
    CriticalItemsComponent.prototype.myfilterdata = function (event) {
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    CriticalItemsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    return CriticalItemsComponent;
}());
__decorate([
    core_1.ViewChild(datatable_1.DataTable),
    __metadata("design:type", datatable_1.DataTable)
], CriticalItemsComponent.prototype, "dataTableComponent", void 0);
CriticalItemsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1938),
        providers: [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, cartcount_service_1.CriticalCommonService]
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http, event_spinner_service_1.SpinnerService, atpar_common_service_1.AtParCommonService, cartcount_service_1.CriticalCommonService, AtParConstants_1.AtParConstants])
], CriticalItemsComponent);
exports.CriticalItemsComponent = CriticalItemsComponent;


/***/ }),

/***/ 1423:
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
var DailyActivityComponent = (function () {
    function DailyActivityComponent() {
    }
    return DailyActivityComponent;
}());
DailyActivityComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1939)
    })
], DailyActivityComponent);
exports.DailyActivityComponent = DailyActivityComponent;


/***/ }),

/***/ 1424:
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
        template: __webpack_require__(1940)
    })
], DailyUserActivityComponent);
exports.DailyUserActivityComponent = DailyUserActivityComponent;


/***/ }),

/***/ 1425:
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
var ItemExceptionReportComponent = (function () {
    function ItemExceptionReportComponent() {
    }
    return ItemExceptionReportComponent;
}());
ItemExceptionReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1941)
    })
], ItemExceptionReportComponent);
exports.ItemExceptionReportComponent = ItemExceptionReportComponent;


/***/ }),

/***/ 1426:
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
var http_1 = __webpack_require__(38);
var HttpService_1 = __webpack_require__(12);
var AtParEnums_1 = __webpack_require__(14);
var AtParEnums_2 = __webpack_require__(14);
var AtParStatusCodes_1 = __webpack_require__(50);
var AtParEnums_3 = __webpack_require__(14);
var atpar_common_service_1 = __webpack_require__(43);
var AtParConstants_1 = __webpack_require__(31);
var cart_item_usage_report_component_service_1 = __webpack_require__(1703);
var router_1 = __webpack_require__(29);
var file_saver_1 = __webpack_require__(228);
var ItemUsageReportComponent = (function () {
    function ItemUsageReportComponent(httpService, _http, spinnerService, commonService, atParConstant, cartItemUsageService, route) {
        this.httpService = httpService;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.cartItemUsageService = cartItemUsageService;
        this.route = route;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.selectedOrgGroupId = "";
        this.selectedBunit = "";
        this.selectedBunitItems = "";
        this.selectedParlocation = "";
        this.orgGrpId = "";
        this.lstOrgGroups = [];
        this.showGrid = false;
        this.lstFilteredBUnits = [];
        this.blnShowOrgGroupDD = false;
        this.minDateValue1 = new Date();
        this.defDateRange = 0;
        this.statusCode = -1;
        this.lstItemIds = [];
        this.selectedItemId = "";
        this.lstItemIdsData = [];
        this.lstDBData = [];
        this.lstDBTableData = [];
        this.data = [];
        this.dataSetlabel = [];
        this.dataSetbgcolor = [];
        this.dataSetbordercolor = [];
        this.dataSetdata = [];
        this.lineColors = [];
        this.label = [];
        this.chartDataSet = [];
        this.isMailDialog = false;
        this.toMailAddr = '';
        this.tdExports = false;
        this.bunitFlag = false;
        this.item = '';
        this.bUnit = '';
        this.cartId = '';
        this.orgGroupId = '';
    }
    ItemUsageReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, _b, dateStr;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.RecordsPerPage];
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.bindOrgGroups();
                        _a = this;
                        return [4 /*yield*/, this.getDefDateRange()];
                    case 1:
                        _a.statusCode = _c.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
                            return [2 /*return*/];
                        }
                        this.fromDate = new Date();
                        _b = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, this.defDateRange)];
                    case 2:
                        _b.fromDate = _c.sent();
                        this.toDate = new Date();
                        debugger;
                        this.route.queryParams.subscribe(function (params) {
                            _this.item = decodeURI(params["p2value"]).replace(/%20/g, ' ');
                            _this.orgGroupId = decodeURI(params["p3value"]).replace(/%20/g, ' ');
                            _this.updateDateTime = decodeURI(params["p4value"]).replace(/%20/g, ' ');
                            _this.cartId = decodeURI(params["p5value"]).replace(/%20/g, ' ');
                            _this.bUnit = decodeURI(params["p6value"]).replace(/%20/g, ' ');
                        });
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(JSON.parse(localStorage.getItem('bcMenu'))));
                        if (!(this.bUnit != null && this.bUnit != '' && this.bUnit != "undefined" && this.item != null && this.item != '' && this.item != "undefined" && this.cartId != null && this.cartId != '' && this.cartId != "undefined" && this.updateDateTime != null && this.updateDateTime.toString() != '' && this.orgGroupId != null && this.orgGroupId != '' && this.orgGroupId != "undefined")) return [3 /*break*/, 4];
                        this.selectedOrgGroupId = this.orgGroupId;
                        this.selectedBunit = this.bUnit;
                        this.selectedParlocation = this.cartId;
                        dateStr = new Date(this.updateDateTime).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        this.fromDate = new Date(dateStr);
                        this.selectedItemId = this.item;
                        return [4 /*yield*/, this.bindGrid()];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
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
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
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
    ItemUsageReportComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        isOrgBUnitsExist = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.lstFilteredBUnits = [];
                                _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstFilteredBUnits.push({
                                                label: data.DataList[i].toString(),
                                                value: data.DataList[i].toString()
                                            });
                                        }
                                        isOrgBUnitsExist = true;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(isOrgBUnitsExist)];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "populateBusinessUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.growlMessage = [];
                this.showGrid = false;
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
    ItemUsageReportComponent.prototype.getDefDateRange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, this.commonService.GetMyPreferences("DEFAULT_REPORT_DURATION", this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                if (data.StatType == AtParEnums_3.StatusType.Success) {
                                    _this.defDateRange = parseInt(data.DataVariable.toString());
                                }
                                _this.statusCode = data.StatusCode;
                                if (data.StatType == AtParEnums_3.StatusType.Error) {
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
                                    return;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.statusCode];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        ex_3 = _a.sent();
                        return [4 /*yield*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.addDays = function (theDate, days) {
        return new Date(theDate.getTime() - days * 24 * 60 * 60 * 1000);
    };
    ItemUsageReportComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    ItemUsageReportComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    ItemUsageReportComponent.prototype.onGoClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isValidate, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.showGrid = false;
                        return [4 /*yield*/, this.validateSearchFields()];
                    case 1:
                        //this.lstCaseInfo = [];
                        isValidate = _a.sent();
                        this.spinnerService.start();
                        if (isValidate) {
                            //await this.BindGrid();
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "onGoClick");
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.validateSearchFields = function () {
        try {
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convert(this.fromDate)) > Date.parse(this.convert(this.toDate))) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be greater than From Date" });
                    return false;
                }
            }
            else {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "validateSearchFields");
            return false;
        }
    };
    ItemUsageReportComponent.prototype.convert = function (str) {
        var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    ItemUsageReportComponent.prototype.fillItemIdsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstItemIdsData = [];
                        this.lstItemIds = [];
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.cartItemUsageService.GetCartItemInfo(this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.OrgGrpID], this.selectedBunit, this.selectedParlocation, this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID].toString(), this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.ProfileID].toString()).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.lstItemIdsData = data.DataList;
                                        _this.lstItemIds = _this.filterItemIds(query, _this.lstItemIdsData);
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                            _this.growlMessage = [];
                                        }
                                        else {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "fillItemIdsAuto");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.filterItemIds = function (query, items) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < items.length; i++) {
                var itemValue = items[i];
                if (items[i].CODE !== "") {
                    var itemValue_1 = items[i].CODE + " - " + items[i].DESCRIPTION;
                    filtered.push(itemValue_1);
                }
            }
        }
        else {
            if (query.length >= 0) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].CODE.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if (items[i].CODE !== "") {
                            var itemValue = items[i].CODE + " - " + items[i].DESCRIPTION;
                            filtered.push(itemValue);
                        }
                    }
                }
            }
        }
        return filtered;
    };
    ItemUsageReportComponent.prototype.bindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, frmDate, todate, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //this.selectedItemId = "000000000000030026";
                        if (this.blnShowOrgGroupDD == true) {
                            if (this.selectedOrgGroupId === "Select One") {
                                this.selectedOrgGroupId = "";
                            }
                            if (this.selectedOrgGroupId === "" || this.selectedOrgGroupId == undefined) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
                                return [2 /*return*/];
                            }
                        }
                        if (this.selectedItemId == undefined || this.selectedItemId === "") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Item ID" });
                            return [2 /*return*/];
                        }
                        if (this.selectedBunit === "") {
                            //  Generating comma separated BUs list to send to the SP so as to get the respective data
                            this.selectedBunitItems = "";
                            if ((this.lstFilteredBUnits.length > 1)) {
                                for (i = 1; (i
                                    <= (this.lstFilteredBUnits.length - 1)); i++) {
                                    if ((this.selectedBunitItems === "")) {
                                        this.selectedBunitItems = ("'" + this.lstFilteredBUnits[i].value);
                                    }
                                    else {
                                        this.selectedBunitItems = (this.selectedBunitItems + ("','" + this.lstFilteredBUnits[i].value));
                                    }
                                }
                                this.selectedBunitItems = (this.selectedBunitItems + "'");
                            }
                        }
                        else {
                            this.selectedBunitItems = "";
                            this.selectedBunitItems = ("'"
                                + (this.selectedBunit + "'"));
                        }
                        this.showGrid = false;
                        this.spinnerService.start();
                        frmDate = this.convert(this.fromDate);
                        todate = this.convert(this.toDate);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.cartItemUsageService.GetItemUsageDetails(this.selectedItemId, frmDate, todate, this.selectedBunitItems, this.selectedParlocation, this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID]).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.showGrid = true;
                                        _this.tdExports = true;
                                        _this.lstDBData = [];
                                        _this.lstDBData = data.DataDictionary["pdsCartDetails"]["Table1"];
                                        _this.lstDBTableData = data.DataDictionary["pdsCartDetails"]["Table2"];
                                        _this.CustItemId = _this.lstDBData[0].CUST_ITEM_NO;
                                        _this.lineColors = ["#00FF00", "#0000FF"];
                                        _this.dataSetbgcolor = [];
                                        _this.dataSetdata = [];
                                        _this.dataSetbordercolor = [];
                                        var dataParQty = [];
                                        var dataUsedQty = [];
                                        var dataForInsideTable = [];
                                        _this.label = [];
                                        console.log(data);
                                        for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                                            var dateObj = new Date(_this.lstDBData[i].COUNTDATE);
                                            var month = dateObj.getMonth() + 1; //months from 1-12
                                            var day = dateObj.getDate();
                                            var sDay = day.toString();
                                            var Hours = dateObj.getHours();
                                            var ampm = "";
                                            if (Hours <= 12) {
                                                ampm = "am";
                                            }
                                            else {
                                                ampm = "mm";
                                            }
                                            if (day < 10) {
                                                sDay = "0" + sDay;
                                            }
                                            var dayName = days[dateObj.getDay()];
                                            _this.lstDBData[i].COUNTDATE = month + "/" + sDay;
                                            _this.lstDBData[i].COUNTDATEFORINSIDETABLE = month + "/" + sDay + "(" + dayName.substring(0, 3) + " " + ampm + ")";
                                            _this.label.push(_this.lstDBData[i].COUNTDATE);
                                            dataParQty.push(_this.lstDBData[i].PAR_QTY);
                                            dataUsedQty.push(_this.lstDBData[i].ORDER_QTY);
                                        }
                                        _this.chartDataSet = [];
                                        _this.chartDataSet.push({ label: 'Par Qty', backgroundColor: '', borderColor: '#00FF00', data: dataParQty, fill: false });
                                        _this.chartDataSet.push({ label: 'Used Qty', backgroundColor: '', borderColor: '#0000FF', data: dataUsedQty, fill: false });
                                        _this.data = [];
                                        _this.data = {
                                            labels: _this.label,
                                            datasets: _this.chartDataSet
                                        };
                                        //this.selectedBunit = this.selectedBunit.replace("'", "");
                                        console.log(_this.data);
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.selectedItemId = "";
                                        _this.selectedOrgGroupId = "";
                                        _this.selectedParlocation = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.selectedItemId = "";
                                        _this.selectedOrgGroupId = "";
                                        _this.selectedParlocation = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.selectedItemId = "";
                                        _this.selectedOrgGroupId = "";
                                        _this.selectedParlocation = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "bindGrid");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.isMailDialog = true;
                    this.toMailAddr = '';
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "onSendMailIconClick");
                }
                return [2 /*return*/];
            });
        });
    };
    ItemUsageReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.growlMessage = [];
                        if (this.toMailAddr == '' || this.toMailAddr == undefined) {
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
                        return [4 /*yield*/, this.exportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmail(this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.SystemId], 'Cart Count Item Usage Report', JSON.stringify(html), this.toMailAddr, AtParEnums_2.MailPriority.Normal.toString(), '')
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
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "onSendMailClick");
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ItemUsageReportComponent.prototype.onPrintClick = function (event) {
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
                                mywindow.document.write('<html><head><title>' + 'Car Count - Item Usage Report' + '</title>');
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
                        this.clientErrorMsg(ex_8, "onPrintClick");
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "CartCountItemUsageReport.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "onExportToExcelClick");
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var chartImage, image, htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, imgPhyUsagePath, phyname, strTitle, title, i, ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chartImage = document.getElementById("ChartId");
                        image = chartImage.toDataURL("image/png");
                        image = image.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(image, "ItemUsage").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        htmlBuilder = '';
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        imgPhyUsagePath = '';
                        return [4 /*yield*/, this.commonService.getServerIP()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.ipAddress = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_3.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.commonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.growlMessage = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_3.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 4:
                        _a.sent();
                        phyname = void 0;
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgPhyUsagePath = this.httpService.BaseUrl + '/Uploaded/';
                        strTitle = "\"" + "AtparVersion2.4.4" + "\"";
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder += "<table width='100%'>";
                        htmlBuilder += "<tbody><tr><td align='left'> <table width='100%'><tbody><tr><td width='100%' align='left' height='63'><table align='left' width='100%' cellpadding='0' cellspacing='0' valign='top'><tbody><TR height=63><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td></TR><tr><td height='27' valign='bottom' width='100%' align='left' colspan='2'><font size='1' style='COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt'><b>&nbsp;&nbsp;Mobile Supply Chain Execution<b></b></b></font></td></tr><tr><td colspan='2'>&nbsp;</td></tr><tr><td colspan='2'><table align='left' width='90%' border='0'><tbody><tr><td></td></tr><tr><td colspan='5' align='left'><span class='c2'><span class='c2'>Cart Count Item Usage Report of  <b>" + this.selectedBunit + "</b> From   <b>" + this.convertDateFormate(this.fromDate) + "</b> to <b>" + this.convertDateFormate(this.toDate) + " </b></span></span></td><td align='right' valign='top'>&nbsp;";
                        htmlBuilder += "</td></tr > <tr height='20' > </tr></tbody> </table></td> </tr>";
                        htmlBuilder += "<tr><td colspan='2' height= '20' > <table width='99%' > <tbody><tr><td><table align='left' width= '99%' > <tbody><tr><td align='left' colspan= '3'> <span class='c2'> Item ID &nbsp; &nbsp; " + this.lstDBTableData[0].ITEM_ID + " </span> </td> <td align='left' > <span class='c2' > Custom Item NO &nbsp; &nbsp;" + this.lstDBTableData[0].ITEM_ID + " </span> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> ";
                        htmlBuilder += "<tr> <td colspan='2' > <table align='left' width= '99%' style='BORDER-COLLAPSE:collapse' border= '1' > <tbody>";
                        htmlBuilder += "<tr width= '100%' bgcolor= '#ffffff'>";
                        htmlBuilder += "<td align=center nowrap= '' width= '100%' > <span class='c3'> <table cellspacing='0' cellpadding= '2' style= 'border-color:#D3D3D3;width:100%;border-collapse:collapse;'>";
                        htmlBuilder += "<tbody><tr style='width:100%;'>";
                        htmlBuilder += "<td class='' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'>Business Unit/Company </td><td class='' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].BUSINESS_UNIT + "</td><td class='' colspan='2' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'>Cart ID/Par Location </td><td class='' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].CART_ID + "</td>";
                        htmlBuilder += "</tr><tr style='width:100%;'>";
                        htmlBuilder += "<td class='' colspan='4' style='border-color:#BFBFBF;border-width:1px;border-style:solid;' align='center'><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgPhyUsagePath + "ItemUsage.png></div></td><td class='' valign='top' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:25%;'><table cellspacing='0' cellpadding='2' style='border-color:#D3D3D3;border-collapse:collapse;'>";
                        htmlBuilder += "<tbody><tr style='width:100%;'>";
                        htmlBuilder += "<td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:47%;white-space:nowrap;'>Date</td><td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:25%;'>Par Qty</td><td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:28%;'>Used Qty</td>";
                        htmlBuilder += "</tr>";
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            htmlBuilder += "<tr style='width:100%;'>";
                            htmlBuilder += "<td class='Remarks' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:47%;white-space:nowrap;'>" + this.lstDBData[i].COUNTDATEFORINSIDETABLE + "</td>";
                            htmlBuilder += "<td class='Remarks' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:47%;white-space:nowrap;'>" + this.lstDBData[i].PAR_QTY + "</td>";
                            htmlBuilder += "<td class='Remarks' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:47%;white-space:nowrap;'>" + this.lstDBData[i].ORDER_QTY + "</td></tr>";
                        }
                        htmlBuilder += "</tbody></table></td></tr>";
                        htmlBuilder += "<tr style='width:100%;'><td class='' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'> </td><td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'>Qty</td> <td class='' align= 'left' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;' > Item Description</td><td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'>Date</td > <td class='' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;width:25%;' ></td></tr>";
                        htmlBuilder += "<tr style='width:100%;'><td class='' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'> Min Item Usage</td><td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].MIN_USAGE + "</td > <td class='SearchLabel' align= 'left' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'> " + this.lstDBTableData[0].ITEM_DESC + "</td><td class='SearchLabel' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].UPDATE_DATE + " </td><td class='SearchLabel' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'></td ></tr>";
                        htmlBuilder += "<tr style='width:100%;'><td class='' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'> Max  Item Usage </td><td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].MAX_USAGE + "</td > <td class='SearchLabel' align= 'left' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'> " + this.lstDBTableData[0].ITEM_DESC + "</td><td class='SearchLabel' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].UPDATE_DATE + " </td><td class='SearchLabel' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'></td ></tr>";
                        htmlBuilder += "<tr style='width:100%;'><td class='' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'> Average Item Usage </td><td class='' align='left' colspan='4' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].AVG_USAGE + " Per Day" + "</td ></tr>";
                        htmlBuilder += "</tbody></table></span></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table >";
                        return [4 /*yield*/, htmlBuilder];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        ex_10 = _a.sent();
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ItemUsageReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    ItemUsageReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    ItemUsageReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    return ItemUsageReportComponent;
}());
ItemUsageReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1942),
        providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, cart_item_usage_report_component_service_1.CartItemUsageService]
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        AtParConstants_1.AtParConstants,
        cart_item_usage_report_component_service_1.CartItemUsageService,
        router_1.ActivatedRoute])
], ItemUsageReportComponent);
exports.ItemUsageReportComponent = ItemUsageReportComponent;


/***/ }),

/***/ 1427:
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
var ManageOrdersComponent = (function () {
    function ManageOrdersComponent() {
        this.cartCountAppId = AtParEnums_1.EnumApps.CartCount;
    }
    return ManageOrdersComponent;
}());
ManageOrdersComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1943)
    })
], ManageOrdersComponent);
exports.ManageOrdersComponent = ManageOrdersComponent;


/***/ }),

/***/ 1428:
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
var ManageParLocationComponent = (function () {
    function ManageParLocationComponent() {
        this.cartAppId = AtParEnums_1.EnumApps.CartCount;
    }
    return ManageParLocationComponent;
}());
ManageParLocationComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1944)
    })
], ManageParLocationComponent);
exports.ManageParLocationComponent = ManageParLocationComponent;


/***/ }),

/***/ 1429:
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
var cart_optimization_report_service_1 = __webpack_require__(1704);
var AtParEnums_1 = __webpack_require__(14);
var AtParConstants_1 = __webpack_require__(31);
var AtParStatusCodes_1 = __webpack_require__(50);
var routepath_1 = __webpack_require__(70);
var router_1 = __webpack_require__(29);
var file_saver_1 = __webpack_require__(228);
var OptimizationReportComponent = (function () {
    /**
    * Constructor
    * @param OptimizationReportService
    * @param AtParCommonService
    * @param httpService
    * @param spinnerService
    * @param AtParConstants
    */
    function OptimizationReportComponent(httpService, commonService, spinnerService, optimizationReportService, atParConstant, route) {
        this.httpService = httpService;
        this.commonService = commonService;
        this.spinnerService = spinnerService;
        this.optimizationReportService = optimizationReportService;
        this.atParConstant = atParConstant;
        this.route = route;
        /*Varaible Declaration*/
        this._strOrgGrpId = "";
        this.gstrProtocal = "";
        this.string = "";
        this.gstrPortNo = "";
        this.strParQty = "";
        this.strPrice = "";
        this.strRecomPar = "";
        this.lblBunitCart = "";
        this.gEditParUserParamval = "";
        this.orgGrpIDData = "";
        this.orgGrpId = "";
        this.orgGroupIDForDBUpdate = "";
        this.selectedOrgGroupId = "";
        this.lblCurrentval = "";
        this.strUserId = "";
        this.lblRecommendedVal = "";
        this.lblNetReductionVal = "";
        this.selectedCartId = "";
        this.selectedBunit = "";
        this.toMailAddr = '';
        this.lblFromDate = "";
        this.lblToDate = "";
        this.selectedDeptId = "";
        this.ipAddress = "";
        this.cartIdValue = "";
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupsDropdown = false;
        this.isVisible = false;
        this.isLblBunitVisible = false;
        this.tdExports = false;
        this.page = true;
        this.isMailDialog = false;
        this.blnsortbycolumn = false;
        this.isVisibleChkBox = false;
        this.isVisibletdExports = false;
        this.isLblVisible = false;
        this.isVisibleEdiTxt = false;
        this.isVisibleBtnUpdate = false;
        this.isVisibleRowFooter = false;
        this.showGrid = false;
        this.statusCode = -1;
        this.defDateRange = 0;
        this.selectcountFrequency = 0;
        this.selectedCouontFrequency = 0;
        this.countFrequency = 0;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstPreReqData = [];
        this.lstOrgGroups = [];
        this.lstBUnits = [];
        this.lstFilteredBUnits = [];
        this.lstCartIds = [];
        this.lstDBData = [];
        this.lstFilterData = [];
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.lstCountFrequency = [];
        this.lstCartHeader = [];
        this.lstCartDetails = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        this.bUnit = '';
        this.orgGroupId = '';
        this.cartId = '';
        this.frmAvgRpt = false;
        this.field = [];
        this.isItemidSort = false;
        try {
            this.spinnerService.start();
            this.breadCrumbMenu = new routepath_1.Menus();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        this.spinnerService.stop();
    }
    /**
    * Init Function for Populate orgGrpIds, Bunits to the dropdown when page loading and getMyPreferences,getProfileParamValue.
    */
    OptimizationReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, _a, _b, _c, dateStr, dateEnd, ex_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.page = true;
                        this.lstFilteredCartIds = new Array();
                        this.lstCartHeader = new Array();
                        this.lstCartDetails = new Array();
                        this.lstChkItemdetails = new Array();
                        this.dataCheckedSorting = new Array();
                        this.dataUncheckedSorting = new Array();
                        this.lstFilterData = new Array();
                        for (i = 1; i <= 7;) {
                            this.lstCountFrequency.push({ label: i.toString(), value: i.toString() });
                            i++;
                        }
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 9, 10, 11]);
                        this.spinnerService.start();
                        this.statusCode = -1;
                        this.strUserId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        _a = this;
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 2:
                        _a.statusCode = _d.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Internal Server Error' });
                            return [2 /*return*/];
                        }
                        _b = this;
                        return [4 /*yield*/, this.getProfileParamValue()];
                    case 3:
                        _b.statusCode = _d.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Internal Server Error' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 4:
                        _d.sent();
                        this.currentDate = new Date();
                        this.toDate = new Date();
                        this.fromDate = new Date();
                        if (!(this.defDateRange.toString() != '' && this.defDateRange != null)) return [3 /*break*/, 6];
                        _c = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, -this.defDateRange)];
                    case 5:
                        _c.fromDate = _d.sent();
                        _d.label = 6;
                    case 6:
                        this.route.queryParams.subscribe(function (params) {
                            _this.bUnit = decodeURI(params["p2value"]).replace(/%20/g, ' ');
                            _this.cartId = decodeURI(params["p3value"]).replace(/%20/g, ' ');
                            _this.orgGroupId = decodeURI(params["p4value"]).replace(/%20/g, ' ');
                            _this.frm_Date = params["p5value"];
                            _this.to_Date = params["p6value"];
                        });
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(JSON.parse(localStorage.getItem('bcMenu'))));
                        if (!(this.bUnit != null && this.bUnit != '' && this.bUnit != "undefined" && this.orgGroupId != null && this.orgGroupId != '' && this.orgGroupId != "undefined" && this.cartId != null && this.cartId != '' && this.cartId != "undefined" && this.frm_Date != null && this.frm_Date.toString() != '' && this.to_Date != null && this.to_Date.toString() != '')) return [3 /*break*/, 8];
                        this.frmAvgRpt = true;
                        this.selectedBunit = this.bUnit;
                        this.selectedCartId = this.cartId;
                        dateStr = new Date(this.frm_Date).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        dateEnd = new Date(this.to_Date).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        this.fromDate = new Date(dateStr);
                        this.toDate = new Date(dateEnd);
                        return [4 /*yield*/, this.bindDataGrid()];
                    case 7:
                        _d.sent();
                        _d.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        ex_1 = _d.sent();
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 11];
                    case 10:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /*
    * Storing data for sorting in two different  lists one for checked and another for Unchecked
    */
    OptimizationReportComponent.prototype.SortGridData = function () {
        var lstDBDataList;
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        for (var i = 0; i <= this.lstDBData.length - 1; i++) {
            if (this.lstDBData[i].CHK_UPDATED == 1) {
                this.dataCheckedSorting.push(this.lstDBData[i]);
            }
            else {
                this.dataUncheckedSorting.push(this.lstDBData[i]);
            }
        }
        this.isVisible = true;
        this.spinnerService.stop();
    };
    /**
    * This method is used for validating fields
    */
    OptimizationReportComponent.prototype.validateSearchFields = function () {
        try {
            this.growlMessage = [];
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormate(this.toDate)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
                if (Date.parse(this.convertDateFormate(this.fromDate)) > Date.parse(this.convertDateFormate(this.toDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date must be less than or equal to To Date" });
                    return false;
                }
                else {
                    if ((this.blnShowOrgGroupsDropdown == true) && (this.selectedOrgGroupId == 'Select One' || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "")) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select valid Org Group ID" });
                        return false;
                    }
                    if ((this.selectedBunit == null || this.selectedBunit == undefined || this.selectedBunit == "" || this.selectedBunit == 'Select Bunit')
                        && (this.blnShowOrgGroupLabel == true)) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                        return false;
                    }
                    if ((this.selectedBunit == null || this.selectedBunit == undefined || this.selectedBunit == "" || this.selectedBunit == 'Select Bunit')
                        && (this.blnShowOrgGroupsDropdown == true)) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                        return false;
                    }
                    if ((this.selectedBunit == null || this.selectedBunit == undefined || this.selectedBunit == "" || this.selectedBunit == 'Select Bunit') &&
                        (this.selectedCartId == null || this.selectedCartId == undefined || this.selectedCartId == "") &&
                        (this.selectedDeptId == null || this.selectedDeptId == undefined || this.selectedDeptId == "")) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "BUnit and either CartID or DeptID is mandatory" });
                        return false;
                    }
                    else if ((this.selectedCartId == null || this.selectedCartId == undefined || this.selectedCartId == "") &&
                        (this.selectedDeptId == null || this.selectedDeptId == undefined || this.selectedDeptId == "")) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Cart ID/Par Location or Dept ID is Mandatory" });
                        return false;
                    }
                    else if ((this.selectedBunit == null || this.selectedBunit == undefined || this.selectedBunit == "")) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "BUnit is mandatory" });
                        return false;
                    }
                }
            }
            else {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
            return false;
        }
    };
    /**
   * This method is used for change date format to mm/dd/yyyy
   */
    OptimizationReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    OptimizationReportComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpIDData = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.populateBussinessUnits();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupsDropdown = true;
                                            _this.lstFilteredBUnits = [];
                                            _this.isVisible = false;
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.lstOrgGroups = [];
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
    OptimizationReportComponent.prototype.populateBussinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        isOrgBUnitsExist = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstFilteredBUnits = [];
                        this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                                    _this.isVisible = false;
                                    return;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var lstFilteredBUnitsTest = data.DataList;
                                        if (lstFilteredBUnitsTest != null) {
                                            if (lstFilteredBUnitsTest.length > 0) {
                                                for (var i = 0; i < lstFilteredBUnitsTest.length; i++) {
                                                    _this.lstFilteredBUnits.push({ label: lstFilteredBUnitsTest[i], value: lstFilteredBUnitsTest[i] });
                                                }
                                            }
                                        }
                                        _this.spinnerService.stop();
                                        isOrgBUnitsExist = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.isVisible = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.isVisible = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.isVisible = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(isOrgBUnitsExist)];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when user selecting  Ogrgrpid in  OrgGrpid dropdown and populate bunits for selecting OrggrpId
    */
    OptimizationReportComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.growlMessage = [];
                        this.spinnerService.start();
                        this.isVisible = false;
                        this.isLblVisible = false;
                        this.selectedDeptId = "";
                        this.selectedBunit = "";
                        this.isVisible = false;
                        this.tdExports = false;
                        this.isVisibleBtnUpdate = false;
                        if (this.selectedOrgGroupId == "Select One") {
                            this.lstFilteredBUnits = [];
                            this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.populateBussinessUnits()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4);
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
    * This method is calling when user selecting  Bunit in  Bunit dropdown and getting cartIds for selecting Bunit
    */
    OptimizationReportComponent.prototype.ddl_ChangeBunitChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.isLblVisible = false;
                        this.selectedCartId = "";
                        this.isVisibleBtnUpdate = false;
                        if (this.selectedOrgGroupId != "Select One" && this.selectedOrgGroupId != "" && this.selectedBunit == "" && this.isVisible == true) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            this.isVisible = false;
                            this.tdExports = false;
                            return [2 /*return*/];
                        }
                        if (this.selectedBunit == "" && this.isVisible == true) {
                            this.isVisible = false;
                            this.tdExports = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        if (this.selectedBunit == "Select BUnit" || this.selectedBunit == "") {
                            this.isVisible = false;
                            this.tdExports = false;
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.optimizationReportService.getCartsForBunit(this.strUserId, this.selectedBunit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstFilteredCartIds = data.DataList;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.isVisible = false;
                                        _this.tdExports = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.isVisible = false;
                                        _this.tdExports = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.isVisible = false;
                                        _this.tdExports = false;
                                        if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.CRCT_E_ERPCOMPCREATION) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP interface access failed, may be this installation is for Par Management or it was not successful, please contact your manager/administrator" });
                                            _this.selectedCartId = "";
                                            break;
                                        }
                                        if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_REMOTEDBSELECTFAIL) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            _this.selectedCartId = "";
                                            break;
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5);
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
   * This method is used for adding days
   */
    OptimizationReportComponent.prototype.addDays = function (theDate, days) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)];
            });
        });
    };
    /**
   * This method is calling when click on Go button
   */
    OptimizationReportComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnValue, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.isVisible = false;
                        this.isVisibleBtnUpdate = false;
                        this.tdExports = false;
                        this.growlMessage = [];
                        this.spinnerService.start();
                        this.netTotalrecommendedVal = 0;
                        this.netTotalCurVal = 0;
                        this.netTotalreduction = 0;
                        returnValue = false;
                        if (this.selectedBunit == "Select Bunit" || this.selectedBunit == "" || this.selectedBunit == null) {
                            this.selectedBunit = "";
                        }
                        return [4 /*yield*/, this.validateSearchFields()];
                    case 1:
                        returnValue = _a.sent();
                        if (!returnValue) return [3 /*break*/, 3];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: 'Getting data....' });
                        return [4 /*yield*/, this.bindDataGrid()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OptimizationReportComponent.prototype.CountFreqChanged = function () {
        this.selectcountFrequency = this.selectedCouontFrequency;
    };
    /**
    * This method is calling when "Edit_Par"  profileParameter is checked
    */
    OptimizationReportComponent.prototype.EditModeEnable = function () {
        this.isVisibleChkBox = true;
        this.isVisibleEdiTxt = true;
        this.isVisibleBtnUpdate = true;
    };
    OptimizationReportComponent.prototype.bindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var currentValue, recommendedVal, netReductionValue, fromDate, toDate, cDate, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.strParQty = "";
                        this.strPrice = "";
                        this.strRecomPar = "";
                        this.growlMessage = [];
                        this.lblRecommendedVal = "";
                        this.lblNetReductionVal = "";
                        currentValue = 0;
                        recommendedVal = 0;
                        netReductionValue = 0;
                        fromDate = "";
                        toDate = "";
                        this.lblCurrentval = "";
                        this.cartIdValue = this.selectedCartId.split(" - ")[0];
                        cDate = new Date();
                        if (this.selectedCouontFrequency == undefined || this.selectcountFrequency == 0) {
                            this.selectcountFrequency = this.lstCountFrequency[0].value;
                        }
                        if (!this.frmAvgRpt) return [3 /*break*/, 3];
                        if (this.blnShowOrgGroupLabel == true) {
                            this._strOrgGrpId = this.orgGroupId;
                        }
                        else {
                            this._strOrgGrpId = this.orgGroupId;
                        }
                        cDate.setDate(this.toDate.getDate() + 1);
                        return [4 /*yield*/, this.convertDateFormate(this.fromDate)];
                    case 1:
                        fromDate = _a.sent();
                        return [4 /*yield*/, this.convertDateFormate(this.toDate)];
                    case 2:
                        toDate = _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        cDate.setDate(this.toDate.getDate() + 1);
                        return [4 /*yield*/, this.convertDateFormate(this.fromDate)];
                    case 4:
                        fromDate = _a.sent();
                        return [4 /*yield*/, this.convertDateFormate(this.toDate)];
                    case 5:
                        toDate = _a.sent();
                        if (this.blnShowOrgGroupLabel == true) {
                            this._strOrgGrpId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        }
                        else {
                            this._strOrgGrpId = this.selectedOrgGroupId;
                        }
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, 9, 10]);
                        return [4 /*yield*/, this.optimizationReportService.getCartOptimizationRep(this.selectedBunit, this.selectedDeptId, this.cartIdValue, fromDate, toDate, this._strOrgGrpId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], this.selectcountFrequency, this.strUserId)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstDBData = [];
                                        _this.lstCartHeader = data.DataDictionary["Carts"];
                                        _this.lstCartDetails = data.DataDictionary["CartDetails"];
                                        if (data.DataDictionary["CartDetails"].length > 0) {
                                            _this.isLblVisible = true;
                                            _this.lblFromDate = fromDate;
                                            _this.isVisibletdExports = true;
                                            _this.lblToDate = toDate;
                                            _this.isLblBunitVisible = true;
                                            _this.tdExports = true;
                                            _this.lblBunitCart = _this.selectedBunit + " - " + _this.selectedCartId.replace(" - ", " ");
                                            _this.isVisible = true;
                                            _this.isVisibleRowFooter = true;
                                            if ((_this.selectedDeptId == null || _this.selectedDeptId == undefined || _this.selectedDeptId == "") && _this.gEditParUserParamval == "Y") {
                                                _this.EditModeEnable();
                                            }
                                            for (var i = 0; i <= _this.lstCartDetails.length - 1; i++) {
                                                if (_this.lstCartDetails[i].PAR_QTY == null || _this.lstCartDetails[i].PAR_QTY == "") {
                                                    _this.strParQty = "0";
                                                }
                                                else {
                                                    _this.strParQty = _this.lstCartDetails[i].PAR_QTY;
                                                }
                                                if (_this.lstCartDetails[i].PRICE == null || _this.lstCartDetails[i].PRICE == "") {
                                                    _this.strPrice = "0";
                                                }
                                                else {
                                                    _this.strPrice = _this.lstCartDetails[i].PRICE;
                                                }
                                                if (_this.lstCartDetails[i].RECOMMENDED_PAR == null || _this.lstCartDetails[i].RECOMMENDED_PAR == "") {
                                                    _this.strRecomPar = "0";
                                                }
                                                else {
                                                    _this.strRecomPar = _this.lstCartDetails[i].RECOMMENDED_PAR;
                                                }
                                                currentValue = currentValue + (parseFloat(_this.strParQty) * parseFloat(_this.strPrice));
                                                recommendedVal = recommendedVal + (parseFloat(_this.strRecomPar) * parseFloat(_this.strPrice));
                                            }
                                            _this.lblCurrentval = currentValue.toFixed(2);
                                            _this.lblRecommendedVal = recommendedVal.toFixed(2);
                                            netReductionValue = currentValue - recommendedVal;
                                            _this.lblNetReductionVal = netReductionValue.toFixed(2);
                                            _this.lstDBData = _this.lstCartDetails;
                                            for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                                _this.lstDBData[i].Sno = i + 1;
                                                _this.lstDBData[i].RECOMMENDED_PAR_QTY = _this.lstDBData[i].RECOMMENDED_PAR;
                                            }
                                            _this.SortGridData();
                                            _this.blnsortbycolumn = false;
                                            _this.field = { field: "ITEM_ID", order: -1 };
                                            _this.isItemidSort = false;
                                            _this.customSort(_this.field);
                                            _this.isItemidSort = true;
                                            _this.blnsortbycolumn = false;
                                            if ((_this.selectedDeptId != null && _this.selectedDeptId != undefined && _this.selectedDeptId == "") && _this.gEditParUserParamval == "Y") {
                                                _this.isVisible = true;
                                                _this.isVisibleRowFooter = true;
                                                _this.isVisibleChkBox = true;
                                            }
                                            else {
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Custom: {
                                        if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.CRCT_E_CARTDOESNOTEXIST || _this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                            {
                                                _this.growlMessage = [];
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                                break;
                                            }
                                        }
                                    }
                                }
                            })];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7);
                        return [3 /*break*/, 10];
                    case 9:
                        this.frmAvgRpt = false;
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
   * This method is calling when user click on Update Button
   */
    OptimizationReportComponent.prototype.btnUpdate_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _tblCartDetails, i, dicDataItems, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _tblCartDetails = [];
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            this.lstDBData[i].NEW_OPTIMAL_QUANTITY = this.lstDBData[i].RECOMMENDED_PAR_QTY;
                            this.lstDBData[i].OPTIMAL_QUANTITY = this.lstDBData[i].PAR_QTY;
                            if ((this.lstDBData[i].CHK_UPDATED == 1)) {
                                if ((this.lstDBData[i].NEW_OPTIMAL_QUANTITY != null && this.lstDBData[i].NEW_OPTIMAL_QUANTITY != '' && this.lstDBData[i].NEW_OPTIMAL_QUANTITY != undefined) || this.lstDBData[i].NEW_OPTIMAL_QUANTITY == "0") {
                                    _tblCartDetails.push(this.lstDBData[i]);
                                }
                                else {
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Valid Par Values" });
                                    return [2 /*return*/];
                                }
                            }
                        }
                        this.lstCartHeader[0].USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        dicDataItems = { "HEADER": this.lstCartHeader, "DETAILS": _tblCartDetails, "PREREQDATA": this.lstPreReqData[0] = " " };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        return [4 /*yield*/, this.optimizationReportService.updateCartParAuditRep(dicDataItems, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate)
                                .catch(this.httpService.handleError).
                                then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                _this.spinnerService.stop();
                                _this.growlMessage = [];
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.isLblVisible = false;
                                    _this.selectedCartId = "";
                                    _this.selectedDeptId = "";
                                    _this.isVisibleBtnUpdate = false;
                                    _this.tdExports = false;
                                    _this.isVisible = false;
                                    _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully..." });
                                    return;
                                }
                                else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_REMOTEDBUPDATEFAIL) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    return;
                                }
                                else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_REMOTESUCCESSLOCALFAIL) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    return;
                                }
                                else {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    return;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8);
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
    * This method is calling when click on CheckAll Button in Datatable
    */
    OptimizationReportComponent.prototype.checkAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.spinnerService.start();
                    this.lstChkItemdetails = [];
                    if (this.lstFilterData != null && this.lstFilterData != undefined && this.lstFilterData.length != 0) {
                        for (i = 0; i <= this.lstFilterData.length - 1; i++) {
                            this.lstFilterData[i].checkvalue = true;
                            this.lstFilterData[i].CHK_UPDATED = 1;
                            this.lstChkItemdetails.push(this.lstFilterData[i]);
                        }
                    }
                    else {
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            this.lstDBData[i].checkvalue = true;
                            this.lstDBData[i].CHK_UPDATED = 1;
                            this.lstChkItemdetails.push(this.lstDBData[i]);
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                finally {
                    this.spinnerService.stop();
                }
                return [2 /*return*/];
            });
        });
    };
    /**
   * This method is calling when click on UnCheckAll Button in Datatable
   */
    OptimizationReportComponent.prototype.unCheckAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.spinnerService.start();
                    this.lstChkItemdetails = [];
                    if (this.lstFilterData != null && this.lstFilterData != undefined && this.lstFilterData.length != 0) {
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            this.lstFilterData[i].checkvalue = false;
                            this.lstFilterData[i].CHK_UPDATED = 0;
                            this.lstChkItemdetails.push(this.lstFilterData[i]);
                        }
                    }
                    else {
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            this.lstDBData[i].checkvalue = false;
                            this.lstDBData[i].CHK_UPDATED = 0;
                            this.lstChkItemdetails.push(this.lstDBData[i]);
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                finally {
                    this.spinnerService.stop();
                }
                return [2 /*return*/];
            });
        });
    };
    OptimizationReportComponent.prototype.onChargesFilterData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.lstFilterData = data;
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    /*
    * This method is calling when we selecting particular record in DataTable and getting selected record data
    */
    OptimizationReportComponent.prototype.selectedRow = function (values, event) {
        try {
            this.growlMessage = [];
            if (event == true) {
                values.checkvalue = true;
                values.CHK_UPDATED = 1;
            }
            else {
                values.checkvalue = false;
                values.CHK_UPDATED = 0;
            }
            for (var i = 0; i < this.lstChkItemdetails.length; i++) {
                if (this.lstChkItemdetails[i].ITEM_ID === values.ITEM_ID) {
                    var index = this.lstChkItemdetails.indexOf(this.lstChkItemdetails[i], 0);
                    this.lstChkItemdetails.splice(index, 1);
                }
            }
            this.lstChkItemdetails.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    OptimizationReportComponent.prototype.fillCartIdsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.spinnerService.start();
                        this.lstFilteredCartIds = [];
                        if ((this.blnShowOrgGroupLabel == true) && ((this.selectedBunit == 'Select Bunit' || this.selectedBunit == undefined || this.selectedBunit == ""))) {
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        if ((this.blnShowOrgGroupsDropdown == true) && ((this.selectedBunit == 'Select Bunit' || this.selectedBunit == undefined || this.selectedBunit == "") || (this.selectedOrgGroupId == 'Select One' || this.selectedOrgGroupId == "" || this.selectedOrgGroupId == undefined))) {
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.optimizationReportService.getCartsForBunit(this.strUserId, this.selectedBunit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstCartIds = data.DataList;
                                        _this.lstFilteredCartIds = _this.filterCartIds(query, _this.lstCartIds);
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        _this.isVisible = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.CRCT_E_ERPCOMPCREATION) {
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP interface access failed, may be this installation is for Par Management or it was not successful, please contact your manager/administrator" });
                                            _this.selectedCartId = "";
                                            break;
                                        }
                                        if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_REMOTEDBSELECTFAIL) {
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            _this.selectedCartId = "";
                                            break;
                                        }
                                        else {
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9);
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OptimizationReportComponent.prototype.filterCartIds = function (query, CartIds) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < CartIds.length; i++) {
                var CartIdValue = CartIds[i].CART_ID + " - " + CartIds[i].DESCR;
                filtered.push(CartIdValue);
            }
        }
        else {
            if (query.length >= 1) {
                for (var i = 0; i < CartIds.length; i++) {
                    var CartIdValue = CartIds[i].CART_ID + " - " + CartIds[i].DESCR;
                    if (CartIdValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(CartIdValue);
                    }
                }
            }
        }
        return filtered;
    };
    /*
    * This method is for sorting the data  based on seleted column in DataTable
    */
    OptimizationReportComponent.prototype.customSort = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                element = event;
                this.lstDBData = [];
                if (event.field == "ITEM_ID" && this.isItemidSort == true) {
                    this.blnsortbycolumn = false;
                    this.isItemidSort = false;
                }
                else {
                    this.blnsortbycolumn = !this.blnsortbycolumn;
                }
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
                    this.lstDBData = [];
                    this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
                }
                else {
                    this.lstDBData = [];
                    this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
                }
                this.sortedcheckedrec = [];
                this.sorteduncheckedrec = [];
                return [2 /*return*/];
            });
        });
    };
    OptimizationReportComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_10;
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
                        ex_10 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 3: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    OptimizationReportComponent.prototype.getProfileParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.getProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], AtParEnums_1.EnumApps.CartCount, 'EDIT_PAR')
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    if (data.DataVariable != null) {
                                        _this.gEditParUserParamval = data.DataVariable.toString();
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_11 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 3: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    /**
    * This method is calling when user click on Mail Icon.
    * @param event
    */
    OptimizationReportComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
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
    /**
    * This method is calling when user userclick on submit button after enter mailid.
    * @param event
    */
    OptimizationReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.growlMessage = [];
                        if (this.toMailAddr == '' || this.toMailAddr == undefined) {
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
                        toAddr = '';
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Cart Optimization Report', JSON.stringify(html), this.toMailAddr, AtParEnums_1.MailPriority.Normal.toString(), '')
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
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OptimizationReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    /**
    * This method is calling when user click on print Icon.
    * @param event
    */
    OptimizationReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_13;
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
                        if (html != '' && html != null) {
                            mywindow = window.open('', 'PRINT', 'height=600,width=600');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'CartCount - Cart Optimization Report' + '</title>');
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
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13);
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
     * This method is calling when user click on Excel Icon.
     * @param event
     */
    OptimizationReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_14;
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
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "cart_optimization_report.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_14 = _a.sent();
                        this.clientErrorMsg(ex_14);
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
     * This method is for export  datatable data in different formats.
     * @param event
     */
    OptimizationReportComponent.prototype.ExportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, _DS, imgserverPath, title, ex_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        _DS = [];
                        imgserverPath = '';
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
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 3:
                        _a.sent();
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder += "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Cart Optimization Report between <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<A  href=" + "" + "javascript:printWindow()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else if (reqType == 'Excel') {
                            htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Cart Optimization Report between <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;";
                        }
                        else {
                            htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Cart Optimization Report between <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2>"
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=left nowrap colspan= 13> <span class=c3> <b>" + this.lblBunitCart + "</b></span></td>"
                            + "</tr>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center  nowrap><span class=c3><b>Item ID</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Custom Item NO</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Description</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Compartment</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Price($)</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Par Qty</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>UOM</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Max Usage</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Min Usage</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Avg Usage</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Total Usage</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Order Quantity</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Reco. par / day * count freq.</b></span></td>"
                            + "</tr>";
                        return [4 /*yield*/, this.lstDBData.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_ID + "&nbsp;</td>";
                                if (header.CUST_ITEM_ID != "" && header.CUST_ITEM_ID != null) {
                                    htmlBuilder += "<td align= left nowrap> <span class=c2>" + "'" + header.CUST_ITEM_ID + "</span></td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + "" + "&nbsp;</td>";
                                }
                                htmlBuilder += "<td bgcolor=#ffffff >&nbsp;" + header.DESCR + "&nbsp;</td>";
                                if (header.COMPARTMENT.trim() != "" && header.COMPARTMENT.trim() != null) {
                                    htmlBuilder += "<td align= left nowrap> <span class=c2>" + "'" + header.COMPARTMENT + "</span></td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + "" + "&nbsp;</td>";
                                }
                                htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PRICE + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PAR_QTY + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.UOM + "&nbsp;</td>"
                                    + "<td align=right bgcolor=#ffffff nowrap>&nbsp;" + header.MAX_USAGE + "&nbsp;</td>"
                                    + "<td align=right bgcolor=#ffffff nowrap>&nbsp;" + header.MIN_USAGE + "&nbsp;</td>"
                                    + "<td align=right bgcolor=#ffffff nowrap>&nbsp;" + header.AVG_USAGE + "&nbsp;</td>"
                                    + "<td align=right bgcolor=#ffffff nowrap>&nbsp;" + header.TOTAL_USAGE + "&nbsp;</td>"
                                    + "<td align=right bgcolor=#ffffff nowrap>&nbsp;" + header.OrderQty + "&nbsp;</td>"
                                    + "<td  align=right bgcolor=#ffffff nowrap>&nbsp;" + header.RECOMMENDED_PAR + "&nbsp;</td>"
                                    + "</tr>";
                            })];
                    case 4:
                        _a.sent();
                        htmlBuilder += "<tr>"
                            + "<td align=left nowrap><span class=c3>" + "Current Value($)" + "&nbsp;</td>"
                            + "<td align=left nowrap><span class=c3>" + this.lblCurrentval + "&nbsp;</td>"
                            + "<td align=left nowrap><span class=c3></span></td>"
                            + "<td align=left nowrap><span class=c3>" + "Recommended Value($)" + "</td>"
                            + "<td align=left nowrap><span class=c3>" + this.lblRecommendedVal + "&nbsp;</td>"
                            + "<td align=left nowrap><span class=c3></span></td>"
                            + "<td align=left nowrap><span class=c3></span></td>"
                            + "<td align=left nowrap><span class=c3>" + "Net reduction($)" + "&nbsp;</td>"
                            + "<td align=left nowrap><span class=c3>" + this.lblNetReductionVal + "&nbsp;</td>"
                            + "<td align=left nowrap><span class=c3></span></td>"
                            + "<td align=left nowrap><span class=c3></span></td>"
                            + "<td align=left nowrap><span class=c3></span></td>"
                            + "<td align=left nowrap><span class=c3></span></td>"
                            + "</tr>";
                        htmlBuilder += "</table></Table>";
                        return [2 /*return*/, htmlBuilder];
                    case 5:
                        ex_15 = _a.sent();
                        this.clientErrorMsg(ex_15);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method is calling when user close mail dailogbox.
     * @param event
     */
    OptimizationReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    OptimizationReportComponent.prototype.clientErrorMsg = function (ex) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString());
    };
    /**
    * This method is for clearing all the variables
    * @param event
    */
    OptimizationReportComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstOrgGroups = null;
        this.lstBUnits = null;
        this.lstFilteredBUnits = null;
        this.lstDBData = null;
        this.orgGroupData = null;
        this.growlMessage = null;
        this.lstCartIds = null;
        this.lstFilteredCartIds = null;
        this.cartIdValue = null;
        this.lstCartDetails = null;
        this.lstCartHeader = null;
        this.lblBunitCart = null;
        this.lstChkItemdetails = null;
        this.lstCountFrequency = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        this.lstPreReqData = [];
        this.field = [];
    };
    return OptimizationReportComponent;
}());
OptimizationReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1945),
        providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, cart_optimization_report_service_1.OptimizationReportService]
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService,
        atpar_common_service_1.AtParCommonService,
        event_spinner_service_1.SpinnerService,
        cart_optimization_report_service_1.OptimizationReportService,
        AtParConstants_1.AtParConstants,
        router_1.ActivatedRoute])
], OptimizationReportComponent);
exports.OptimizationReportComponent = OptimizationReportComponent;


/***/ }),

/***/ 1430:
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
var file_saver_1 = __webpack_require__(228);
var routepath_1 = __webpack_require__(70);
var cart_order_history_report_service_1 = __webpack_require__(1705);
var OrderHistoryReportComponent = (function () {
    /**
     * Constructor
     * @param CartOrderHistoryReportService
     * @param AtParCommonService
     * @param httpService
     * @param spinnerService
     * @param AtParConstants
     */
    function OrderHistoryReportComponent(httpService, commonService, spinnerService, cartOrderHistoryReportService, atParConstant) {
        this.httpService = httpService;
        this.commonService = commonService;
        this.spinnerService = spinnerService;
        this.cartOrderHistoryReportService = cartOrderHistoryReportService;
        this.atParConstant = atParConstant;
        /*Variable Declaration*/
        this.strOrgGrpId = "";
        this.orgGroupIDForDBUpdate = "";
        this.selectedOrgGroupId = "";
        this.showGrid = false;
        this.selectedCartId = "";
        this.strUserId = "";
        this.ipAddress = "";
        this.selectedBunit = "";
        this.cartIdValue = "";
        this.gstrProtocal = "";
        this.string = "";
        this.gstrPortNo = "";
        this.toMailAddr = '';
        this.orgGrpIDData = "";
        this.isLblVisible = false;
        this.orgGrpId = "";
        this.showColumn1 = false;
        this.showColumn2 = false;
        this.showColumn3 = false;
        this.showColumn4 = false;
        this.showColumn5 = false;
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupsDropdown = false;
        this.isVisible = false;
        this.isMailDialog = false;
        this.tdExports = false;
        this.itemCount = 0;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.statusCode = -1;
        this.lstOrgGroups = [];
        this.lstBUnits = [];
        this.lstFilteredBUnits = [];
        this.lstCartIds = [];
        this.lstDBData = [];
        this.dynamicColumns = [];
        try {
            this.spinnerService.start();
            this.breadCrumbMenu = new routepath_1.Menus();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'constructor');
        }
        this.spinnerService.stop();
    }
    /**
   * Init Function for Populate Bunits to the dropdown when page loading
   */
    OrderHistoryReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstFilteredCartIds = new Array();
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, 'ngOnInit');
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderHistoryReportComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpIDData = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.populateBussinessUnits();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupsDropdown = true;
                                            _this.lstFilteredBUnits = [];
                                            _this.isVisible = false;
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.lstOrgGroups = [];
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, 'bindOrgGroups');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when click on Go button
    */
    OrderHistoryReportComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.isVisible = false;
                        this.tdExports = false;
                        this.isLblVisible = false;
                        this.growlMessage = [];
                        this.spinnerService.start();
                        if ((this.blnShowOrgGroupsDropdown == true) && (this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One")) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID " });
                            return [2 /*return*/];
                        }
                        if (this.selectedBunit == "Select Bunit" || this.selectedBunit == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        if (this.selectedCartId == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter CartID/Par Location" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bindDataGrid()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, 'btnGo_Click');
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderHistoryReportComponent.prototype.bindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.cartIdValue = this.selectedCartId.split(" - ")[0].toUpperCase();
                        if (this.blnShowOrgGroupLabel == true) {
                            this.strOrgGrpId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        }
                        else {
                            this.strOrgGrpId = this.selectedOrgGroupId;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.cartOrderHistoryReportService.getOrderHistoryRep(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedBunit, this.cartIdValue, this.strOrgGrpId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID])
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                _this.itemCount = data.DataVariable;
                                _this.lstDBData = [];
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    switch (data.StatType) {
                                        case AtParEnums_1.StatusType.Success: {
                                            if (_this.itemCount > 0) {
                                                _this.isLblVisible = true;
                                                _this.tdExports = true;
                                                _this.isVisible = true;
                                                _this.lstDBData = data.DataDictionary["dtFillValues"];
                                                _this.dynamicColumns = data.DataList;
                                                if (_this.itemCount == 1) {
                                                    _this.showColumn1 = true;
                                                    _this.showColumn2 = false;
                                                    _this.showColumn3 = false;
                                                    _this.showColumn4 = false;
                                                    _this.showColumn5 = false;
                                                }
                                                else if (_this.itemCount == 2) {
                                                    _this.showColumn1 = true;
                                                    _this.showColumn2 = true;
                                                    _this.showColumn3 = false;
                                                    _this.showColumn4 = false;
                                                    _this.showColumn5 = false;
                                                }
                                                else if (_this.itemCount == 3) {
                                                    _this.showColumn1 = true;
                                                    _this.showColumn2 = true;
                                                    _this.showColumn3 = true;
                                                    _this.showColumn4 = false;
                                                    _this.showColumn5 = false;
                                                }
                                                else if (_this.itemCount == 4) {
                                                    _this.showColumn1 = true;
                                                    _this.showColumn2 = true;
                                                    _this.showColumn3 = true;
                                                    _this.showColumn4 = true;
                                                    _this.showColumn5 = false;
                                                }
                                                else if (_this.itemCount == 5) {
                                                    _this.showColumn1 = true;
                                                    _this.showColumn2 = true;
                                                    _this.showColumn3 = true;
                                                    _this.showColumn4 = true;
                                                    _this.showColumn5 = true;
                                                }
                                            }
                                            else {
                                                _this.showColumn1 = false;
                                                _this.showColumn2 = false;
                                                _this.showColumn3 = false;
                                                _this.showColumn4 = false;
                                                _this.showColumn5 = false;
                                                _this.growlMessage = [];
                                                _this.isVisible = false;
                                                _this.tdExports = false;
                                                _this.isLblVisible = false;
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                                return;
                                            }
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Warn: {
                                            _this.isVisible = false;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error: {
                                            _this.isVisible = false;
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Custom: {
                                            _this.isVisible = false;
                                            if (_this.statusCode = AtParStatusCodes_1.AtparStatusCodes.CRCT_E_ERPCOMPCREATION) {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP interface access failed, may be this installation is for Par Management or it was not successful, please contact your manager/administrator" });
                                                break;
                                            }
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                }
                                else {
                                    _this.isVisible = false;
                                    _this.tdExports = false;
                                    _this.isLblVisible = false;
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                    return;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, 'bindDataGrid');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
   * This method is calling when user selecting  Ogrgrpid in  OrgGrpid dropdown and populate bunits for selecting OrggrpId
   */
    OrderHistoryReportComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.growlMessage = [];
                        this.spinnerService.start();
                        this.isVisible = false;
                        this.tdExports = false;
                        this.isLblVisible = false;
                        this.selectedBunit = "";
                        this.selectedCartId = "";
                        if (this.selectedOrgGroupId == "Select One") {
                            this.lstFilteredBUnits = [];
                            this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.populateBussinessUnits()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, 'ddlOrgGrpIdChanged');
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
    * This method is calling when user selecting  Bunit in  Bunit dropdown and getting cartIds for selecting Bunit
    */
    OrderHistoryReportComponent.prototype.ddl_ChangeBunitChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.selectedCartId = "";
                        if (this.selectedOrgGroupId != "Select One" && this.selectedOrgGroupId != "" && this.selectedBunit == "" && this.isVisible == true) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            this.isVisible = false;
                            this.tdExports = false;
                            this.isLblVisible = false;
                            return [2 /*return*/];
                        }
                        if (this.isVisible == true && this.selectedBunit == "") {
                            this.isVisible = false;
                            this.tdExports = false;
                            this.isLblVisible = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        if (this.selectedBunit == "Select BUnit" || this.selectedBunit == "") {
                            this.isVisible = false;
                            this.tdExports = false;
                            this.isLblVisible = false;
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.cartOrderHistoryReportService.getCartsForBunit(this.strUserId, this.selectedBunit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstFilteredCartIds = data.DataList;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.isVisible = false;
                                        _this.tdExports = false;
                                        _this.isLblVisible = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.isVisible = false;
                                        _this.tdExports = false;
                                        _this.isLblVisible = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.isVisible = false;
                                        _this.tdExports = false;
                                        _this.isLblVisible = false;
                                        if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.CRCT_E_ERPCOMPCREATION) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP interface access failed, may be this installation is for Par Management or it was not successful, please contact your manager/administrator" });
                                            _this.selectedCartId = "";
                                            break;
                                        }
                                        if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_REMOTEDBSELECTFAIL) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            _this.selectedCartId = "";
                                            break;
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, 'ddl_ChangeBunitChanged');
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderHistoryReportComponent.prototype.fillCartIdsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.lstFilteredCartIds = [];
                        if ((this.blnShowOrgGroupLabel == true) && ((this.selectedBunit == 'Select Bunit' || this.selectedBunit == undefined || this.selectedBunit == ""))) {
                            return [2 /*return*/];
                        }
                        if ((this.blnShowOrgGroupsDropdown == true) && ((this.selectedBunit == 'Select Bunit' || this.selectedBunit == undefined || this.selectedBunit == "") || (this.selectedOrgGroupId == 'Select One' || this.selectedOrgGroupId == "" || this.selectedOrgGroupId == undefined))) {
                            return [2 /*return*/];
                        }
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.cartOrderHistoryReportService.getCartsForBunit(this.strUserId, this.selectedBunit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstCartIds = data.DataList;
                                        _this.lstFilteredCartIds = _this.filterCartIds(query, _this.lstCartIds);
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.isVisible = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.CRCT_E_ERPCOMPCREATION) {
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP interface access failed, may be this installation is for Par Management or it was not successful, please contact your manager/administrator" });
                                            _this.selectedCartId = "";
                                            break;
                                        }
                                        else {
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, 'fillCartIdsAuto');
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderHistoryReportComponent.prototype.filterCartIds = function (query, CartIds) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < CartIds.length; i++) {
                var CartIdValue = CartIds[i].CART_ID + " - " + CartIds[i].DESCR;
                filtered.push(CartIdValue);
            }
        }
        else {
            if (query.length >= 1) {
                for (var i = 0; i < CartIds.length; i++) {
                    var CartIdValue = CartIds[i].CART_ID + " - " + CartIds[i].DESCR;
                    if (CartIdValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(CartIdValue);
                    }
                }
            }
        }
        return filtered;
    };
    OrderHistoryReportComponent.prototype.populateBussinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstFilteredBUnits = [];
                        this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                                    _this.isVisible = false;
                                    return;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var lstFilteredBUnitsTest = data.DataList;
                                        if (lstFilteredBUnitsTest != null) {
                                            if (lstFilteredBUnitsTest.length > 0) {
                                                for (var i = 0; i < lstFilteredBUnitsTest.length; i++) {
                                                    _this.lstFilteredBUnits.push({ label: lstFilteredBUnitsTest[i], value: lstFilteredBUnitsTest[i] });
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.isVisible = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.isVisible = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.isVisible = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, 'populateBussinessUnits');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when user click on Mail Icon.
    * @param event
    */
    OrderHistoryReportComponent.prototype.onSendMailIconClick = function ($event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.isMailDialog = true;
                    this.toMailAddr = '';
                }
                catch (ex) {
                    this.clientErrorMsg(ex, 'onSendMailIconClick');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
    * This method is calling when user userclick on submit button after enter mailid.
    * @param event
    */
    OrderHistoryReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.growlMessage = [];
                        if (this.toMailAddr == '' || this.toMailAddr == undefined) {
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
                        toAddr = '';
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Cart Order History Report', JSON.stringify(html), this.toMailAddr, AtParEnums_1.MailPriority.Normal.toString(), '')
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
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, 'onSendMailClick');
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OrderHistoryReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    /**
     * This method is calling when user click on print Icon.
     * @param event
     */
    OrderHistoryReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_10;
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
                        if (html != '' && html != null) {
                            mywindow = window.open('', 'PRINT', 'height=600,width=600');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'CartCount - Order History Report' + '</title>');
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
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, 'onPrintClick');
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
    * This method is calling when user click on Excel Icon.
    * @param event
    */
    OrderHistoryReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_11;
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
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "cart_order_history_report.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, 'onExportToExcelClick');
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
     * This method is for export  datatable data in different formats.
     * @param event
     */
    OrderHistoryReportComponent.prototype.ExportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, _DS, imgserverPath, title, i, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        this.statusCode = -1;
                        this.growlMessage = [];
                        _DS = [];
                        imgserverPath = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
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
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 3:
                        _a.sent();
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=8 align=left><span class=c2><b> Order History Report for Business Unit/Company <b>" + this.selectedBunit + "</b>and Cart ID/Par Location <b>" + this.selectedCartId + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:printWindow()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else if (reqType == 'Excel') {
                            htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=7 align=left><span class=c2>Order History Report for Business Unit/Company <b>" + this.selectedBunit + "</b> and Cart ID/Par Location <b>" + this.selectedCartId + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        else {
                            htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=7 align=left><span class=c2>Order History Report for Business Unit/Company <b>" + this.selectedBunit + "</b> and Cart ID/Par Location <b>" + this.selectedCartId + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center  nowrap><span class=c3><b>Item ID</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Custom Item NO</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Compartment</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Description</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Price($)</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>Par Value</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>ItemType</b></span></td>"
                            + "<td align=center  nowrap><span class=c3><b>UOM</b></span></td>";
                        for (i = 0; i < this.itemCount; i++) {
                            htmlBuilder += "<td align=center width=6% ><span  class=c3><b>" + this.dynamicColumns[i] + "</b></span></td>";
                        }
                        htmlBuilder += "</tr>";
                        return [4 /*yield*/, this.lstDBData.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td align= left nowrap> <span class=c2>" + "'" + header.ITEM_ID + "</span></td>";
                                if (header.CUST_ITEM_ID != "" && header.CUST_ITEM_ID != null) {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CUST_ITEM_ID + "&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + "" + "&nbsp;</td>";
                                }
                                if (header.COMPARTMENT != "" && header.COMPARTMENT != " " && header.COMPARTMENT != null) {
                                    htmlBuilder += "<td align= left nowrap> <span class=c2>" + "'" + header.COMPARTMENT + "</span></td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + "" + "&nbsp;</td>";
                                }
                                htmlBuilder += "<td bgcolor=#ffffff >&nbsp;" + header.DESCR + "&nbsp;</td>"
                                    + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.PRICE + "&nbsp;</td>"
                                    + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.PAR_QTY + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_TYPE + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.UOM + "&nbsp;</td>";
                                if (_this.itemCount > 0) {
                                    if (_this.itemCount == 1) {
                                        htmlBuilder += "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_1 + "&nbsp;</td>";
                                    }
                                    else if (_this.itemCount == 2) {
                                        htmlBuilder += "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_1 + "&nbsp;</td>"
                                            + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_2 + "&nbsp;</td>";
                                    }
                                    else if (_this.itemCount == 3) {
                                        htmlBuilder += "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_1 + "&nbsp;</td>"
                                            + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_2 + "&nbsp;</td>"
                                            + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_3 + "&nbsp;</td>";
                                    }
                                    else if (_this.itemCount == 4) {
                                        htmlBuilder += "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_1 + "&nbsp;</td>"
                                            + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_2 + "&nbsp;</td>"
                                            + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_3 + "&nbsp;</td>"
                                            + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_4 + "&nbsp;</td>";
                                    }
                                    else if (_this.itemCount == 5) {
                                        htmlBuilder += "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_1 + "&nbsp;</td>"
                                            + "<td  align= right  bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_2 + "&nbsp;</td>"
                                            + "<td  align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_3 + "&nbsp;</td>"
                                            + "<td  align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_4 + "&nbsp;</td>"
                                            + "<td  align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_5 + "&nbsp;</td>";
                                    }
                                }
                                htmlBuilder += "</tr>";
                            })];
                    case 4:
                        _a.sent();
                        htmlBuilder += "</table></Table>";
                        return [2 /*return*/, htmlBuilder];
                    case 5:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12, 'ExportReportDetails');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when user close mail dailogbox.
    * @param event
    */
    OrderHistoryReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    OrderHistoryReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    /**
    * This method is for clearing all the variables
    */
    OrderHistoryReportComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstOrgGroups = null;
        this.lstBUnits = null;
        this.lstFilteredBUnits = null;
        this.lstDBData = null;
        this.orgGroupData = null;
        this.growlMessage = null;
        this.lstCartIds = null;
        this.lstFilteredCartIds = null;
        this.cartIdValue = null;
        this.dynamicColumns = null;
        this.orgGroupData = null;
    };
    return OrderHistoryReportComponent;
}());
OrderHistoryReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1946),
        providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, cart_order_history_report_service_1.CartOrderHistoryReportService]
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService,
        atpar_common_service_1.AtParCommonService,
        event_spinner_service_1.SpinnerService,
        cart_order_history_report_service_1.CartOrderHistoryReportService,
        AtParConstants_1.AtParConstants])
], OrderHistoryReportComponent);
exports.OrderHistoryReportComponent = OrderHistoryReportComponent;


/***/ }),

/***/ 1431:
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
var ParAuditReportComponent = (function () {
    function ParAuditReportComponent() {
    }
    return ParAuditReportComponent;
}());
ParAuditReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1947)
    })
], ParAuditReportComponent);
exports.ParAuditReportComponent = ParAuditReportComponent;


/***/ }),

/***/ 1432:
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
var VM_CART_SCHEDULES_1 = __webpack_require__(1874);
var mt_crct_par_loc_schedule_details_1 = __webpack_require__(1879);
var MT_ATPAR_SCHEDULE_HEADER_1 = __webpack_require__(1467);
var HttpService_1 = __webpack_require__(12);
var AtParEnums_1 = __webpack_require__(14);
var cart_process_parameters_service_1 = __webpack_require__(1706);
var event_spinner_service_1 = __webpack_require__(24);
var linq_es5_1 = __webpack_require__(115);
var atpar_common_service_1 = __webpack_require__(43);
var AtParConstants_1 = __webpack_require__(31);
var datatable_1 = __webpack_require__(71);
var ProcessParametersComponent = (function () {
    function ProcessParametersComponent(httpService, cartProcessServices, spinnerService, commonService, atParConstant) {
        this.httpService = httpService;
        this.cartProcessServices = cartProcessServices;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.growlMessage = [];
        this.deviceTokenEntry = [];
        this.statusType = -1;
        this.lstGridData1 = new VM_CART_SCHEDULES_1.VM_CART_SCHEDULES();
        this.lstgridfilterData = null;
        this.ddlSchedId = [];
        this.ddlSelectedProcessData = new MT_ATPAR_SCHEDULE_HEADER_1.MT_ATPAR_SCHEDULE_HEADER();
        this.autoCompleteCartID = "";
        this.showGrid = false;
        this.ddlShowOrgGroupDD = false;
        this.blnShowOrgGroupLabel = false;
        this.selectedOrgGroupId = "";
        this.lstOrgGroupData = [];
        this.ddlBusinessData = [];
        this.businessDatangModel = "";
        this.previousSelected = '';
        this.ALL = "ALL";
        this.blnsortbycolumn = true;
    }
    ProcessParametersComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.spinnerService.start();
                    this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                    this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                    this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                    this.lstCheckedParLocation = new Array();
                    this.bindOrgGroups();
                    this.rowPageOptions = [];
                    this.rowPageOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
                    this.ddlSchedId = [];
                    this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                    this.spinnerService.start();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "ngOnInit");
                }
                return [2 /*return*/];
            });
        });
    };
    ProcessParametersComponent.prototype.bindOrgGroups = function () {
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
                                _this.spinnerService.stop();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupList = data.DataList;
                                        _this.ddlBusinessData.push({ label: "Select Org ID ", value: "" });
                                        if (_this.orgGroupList.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.lblOrgGroupId = _this.orgGroupList[0].ORG_GROUP_ID + " - " + _this.orgGroupList[0].ORG_GROUP_NAME;
                                            _this.selectedOrgGroupId = _this.orgGroupList[0].ORG_GROUP_ID;
                                            _this.populateBusinessUnits();
                                            break;
                                        }
                                        else if (_this.orgGroupList.length > 1) {
                                            _this.ddlShowOrgGroupDD = true;
                                            _this.lstOrgGroupData.push({ label: "Select One", value: "" });
                                            for (var i = 0; i < _this.orgGroupList.length; i++) {
                                                _this.lstOrgGroupData.push({ label: _this.orgGroupList[i].ORG_GROUP_ID + " - " + _this.orgGroupList[i].ORG_GROUP_NAME, value: _this.orgGroupList[i].ORG_GROUP_ID });
                                            }
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
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
    ProcessParametersComponent.prototype.ddlOrgGrpIdChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.showGrid = false;
                    this.businessDatangModel = "";
                    this.autoCompleteCartID = "";
                    this.ddlBusinessData = [];
                    this.growlMessage = [];
                    this.ddlBusinessData.push({ label: "Select Org ID ", value: "" });
                    if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == "") {
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
                    this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    ProcessParametersComponent.prototype.ddlBUnitChanged = function () {
        this.autoCompleteCartID = "";
        this.CartIdSearchLst = [];
        this.showGrid = false;
    };
    ProcessParametersComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isOrgBUnitsExist = false;
                        this.showGrid = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.lblOrgGroupId.split("-")[0].trim();
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstBusinessData = data.DataList;
                                        if (_this.lstBusinessData.length > 0) {
                                            for (var i = 0; i < _this.lstBusinessData.length; i++) {
                                                _this.ddlBusinessData.push({ label: _this.lstBusinessData[i].toString(), value: _this.lstBusinessData[i].toString() });
                                            }
                                        }
                                        isOrgBUnitsExist = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
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
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "populateBusinessUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.searchAutoCompleteCartIdName = function (event) {
        var query = event.query;
        this.CartIdSearchLst = this.lstGridData;
        this.CartIdSearchLst = this.filterCartIdNames(query, this.CartIdSearchLst);
    };
    ProcessParametersComponent.prototype.filterCartIdNames = function (query, cartIdNames) {
        if (cartIdNames != null) {
            var filtered = [];
            if (query == "%") {
                for (var i = 0; i < cartIdNames.length; i++) {
                    var cartIdNamesValue = cartIdNames[i];
                    filtered.push(cartIdNamesValue.CART_ID);
                }
            }
            else {
                if (query.length >= 1) {
                    for (var i = 0; i < cartIdNames.length; i++) {
                        var cartIdNamesValue = cartIdNames[i];
                        if (cartIdNamesValue.CART_ID.toString().toUpperCase().indexOf(query.toString().toUpperCase()) == 0) {
                            filtered.push(cartIdNamesValue.CART_ID);
                        }
                    }
                }
            }
            return filtered;
        }
    };
    ProcessParametersComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.ddlShowOrgGroupDD) {
                            if (this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "") {
                                this.showGrid = false;
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                                return [2 /*return*/];
                            }
                        }
                        if (this.businessDatangModel == "" || this.businessDatangModel == "0" || this.businessDatangModel == null) {
                            this.showGrid = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org ID" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.PopulateCarts()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "btnGo_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.PopulateCarts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var orgGroupId, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstgridfilterData = null;
                        this.showGrid = false;
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        orgGroupId = void 0;
                        if (this.blnShowOrgGroupLabel) {
                            orgGroupId = this.lblOrgGroupId.split("-")[0];
                        }
                        else {
                            orgGroupId = this.selectedOrgGroupId;
                        }
                        if (this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] != "All") {
                            orgGroupId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.cartProcessServices.GetProcessParametersCarts(orgGroupId, this.businessDatangModel, this.autoCompleteCartID, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, dataList, x, sortedUnCheckedData;
                                return __generator(this, function (_a) {
                                    data = res.json();
                                    this.spinnerService.stop();
                                    switch (data.StatType) {
                                        case AtParEnums_1.StatusType.Success: {
                                            this.lstGridData = new Array();
                                            dataList = data.DataList;
                                            for (x = 0; x < dataList.length; x++) {
                                                if (dataList[x].ASSIGN_CART == "Y") {
                                                    dataList[x].ASSIGN_CART = true;
                                                }
                                                else {
                                                    dataList[x].ASSIGN_CART = false;
                                                }
                                                this.lstGridData1 = new VM_CART_SCHEDULES_1.VM_CART_SCHEDULES();
                                                this.lstGridData1.CART_ID = dataList[x].CART_ID;
                                                this.lstGridData1.BUSINESS_UNIT = dataList[x].BUSINESS_UNIT;
                                                this.lstGridData1.ASSIGN_CART = dataList[x].ASSIGN_CART;
                                                this.lstGridData1.SCHEDULER = dataList[x].SCHEDULER;
                                                this.lstGridData.push(this.lstGridData1);
                                            }
                                            this.lstGridData = linq_es5_1.asEnumerable(this.lstGridData).OrderByDescending(function (x) { return x.ASSIGN_CART; }).ToArray();
                                            sortedUnCheckedData = linq_es5_1.asEnumerable(this.lstGridData).OrderBy(function (x) { return x.ASSIGN_CART; }).ToArray();
                                            this.lstGridData = new Array();
                                            this.lstGridData = sortedUnCheckedData.reverse();
                                            if (this.lstGridData.length >= 1) {
                                                this.growlMessage = [];
                                                this.showGrid = true;
                                                //this.ddlSchedId = [];
                                                //this.ddlSchedId.push({ label: "Select one", value: "" })
                                            }
                                            else {
                                                this.showGrid = false;
                                            }
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error:
                                            {
                                                this.growlMessage = [];
                                                this.statusMesssage = data.StatusMessage;
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                this.showGrid = false;
                                                break;
                                            }
                                        case AtParEnums_1.StatusType.Warn:
                                            {
                                                this.growlMessage = [];
                                                this.statusMesssage = data.StatusMessage;
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                this.showGrid = false;
                                                break;
                                            }
                                        case AtParEnums_1.StatusType.Custom:
                                            {
                                                this.growlMessage = [];
                                                this.statusMesssage = data.StatusMessage;
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                this.showGrid = false;
                                                break;
                                            }
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getSheduleIds()];
                    case 3:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "PopulateCarts");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.getSheduleIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var orgGroupId, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        orgGroupId = void 0;
                        //if (this.blnShowOrgGroupLabel) {
                        //    orgGroupId = this.lblOrgGroupId;
                        //} else {
                        //    orgGroupId = this.selectedOrgGroupId;
                        //}
                        //if (this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID] != "All") {
                        orgGroupId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        //}
                        this.spinnerService.start();
                        return [4 /*yield*/, this.cartProcessServices.GetSheduleIdata(orgGroupId)
                                .then(function (res) {
                                _this.spinnerService.stop();
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.ddlSchedId = [];
                                            _this.ddlSchedId.push({ label: "Select one", value: "" });
                                            _this.lstScheduleData = data.DataList;
                                            for (var i = 0; i < _this.lstScheduleData.length; i++) {
                                                _this.ddlSchedId.push({ label: _this.lstScheduleData[i].SCHEDULE_ID, value: _this.lstScheduleData[i].SCHEDULE_ID });
                                            }
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.statusMesssage = data.StatusMessage;
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.statusMesssage = data.StatusMessage;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Custom:
                                        {
                                            _this.statusMesssage = data.StatusMessage;
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
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
                        this.clientErrorMsg(ex_5, "getSheduleIds");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.changeStatus = function (cartdata) {
        try {
            var lstCartSchedules = cartdata;
            for (var x = 0; x < lstCartSchedules.length; x++) {
                if (lstCartSchedules[x].ASSIGN_CART == true) {
                    lstCartSchedules[x].ASSIGN_CART = "1";
                }
                else {
                    lstCartSchedules[x].ASSIGN_CART = false;
                }
                this.lstGridData1 = new VM_CART_SCHEDULES_1.VM_CART_SCHEDULES();
                this.lstGridData1.CART_ID = lstCartSchedules[x].CART_ID;
                this.lstGridData1.ASSIGN_CART = lstCartSchedules[x].ASSIGN_CART;
                this.lstGridData1.SCHEDULER = lstCartSchedules[x].SCHEDULER;
                this.lstGridData.push(this.lstGridData1);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "changeStatus");
        }
    };
    ProcessParametersComponent.prototype.btnSubmit_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var data, schedules, x, scheduleDetails, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.lblOrgGroupId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.spinnerService.start();
                        if (!(this.lstGridData != null)) return [3 /*break*/, 2];
                        data = this.lstGridData.filter(function (x) { return x.ASSIGN_CART == true && x.SCHEDULER == ""; });
                        if (data == null || data.length > 0) {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            return [2 /*return*/, this.growlMessage.push({ severity: "warn", summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Inventory Schedule" })];
                            ;
                        }
                        schedules = this.lstGridData;
                        this.lstScheduleDetails = Array();
                        for (x = 0; x < schedules.length; x++) {
                            scheduleDetails = new mt_crct_par_loc_schedule_details_1.MT_CRCT_PAR_LOC_SCHEDULE_DETAILS();
                            if (schedules[x].ASSIGN_CART == true) {
                                scheduleDetails.CHK_VALUE = "1";
                                scheduleDetails.PAR_LOC_ID = schedules[x].CART_ID;
                                scheduleDetails.SCHEDULE_ID = schedules[x].SCHEDULER;
                                this.lstScheduleDetails.push(scheduleDetails);
                            }
                            else {
                                scheduleDetails.CHK_VALUE = "0";
                                scheduleDetails.PAR_LOC_ID = schedules[x].CART_ID;
                                scheduleDetails.SCHEDULE_ID = schedules[x].SCHEDULER;
                                scheduleDetails.ORG_GROUP_ID = " ";
                                scheduleDetails.ORG_ID = " ";
                                this.lstScheduleDetails.push(scheduleDetails);
                            }
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.cartProcessServices.AssignScheduleToCarts(this.lstScheduleDetails, this.orgGroupIDForDBUpdate.trim(), this.businessDatangModel)
                                .catch(this.httpService.handleError).then(function (webresponse) {
                                var response = webresponse.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.growlMessage = [];
                                            _this.showGrid = false;
                                            _this.businessDatangModel = '';
                                            // this.selectedOrgGroupId = '';
                                            _this.autoCompleteCartID = '';
                                            _this.growlMessage.push({ severity: "success", summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully" });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.growlMessage = [];
                                            _this.statusMesssage = response.StatusMessage;
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.statusMesssage = response.StatusMessage;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Custom:
                                        {
                                            _this.statusMesssage = response.StatusMessage;
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "btnSubmit_Click");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.onSort1 = function (event) {
        try {
            if (event.data != null && event.data.length > 0) {
                for (var x = 0; x < event.data.length; x++) {
                    event.data[x].ASSIGN_CART = false;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onSort1");
        }
    };
    ProcessParametersComponent.prototype.onSort = function (event) {
        try {
            var element = event;
            this.blnsortbycolumn = !this.blnsortbycolumn;
            var checkedData = linq_es5_1.asEnumerable(this.lstGridData).Where(function (a) { return a.ASSIGN_CART == 1; }).ToArray();
            var unCheckedData = linq_es5_1.asEnumerable(this.lstGridData).Where(function (a) { return a.ASSIGN_CART == 0; }).ToArray();
            if (event.data != null && event.data.length > 0) {
                checkedData = checkedData.sort(function (a, b) {
                    if (a[element.field] < b[element.field])
                        return -1;
                    if (a[element.field] > b[element.field])
                        return 1;
                    return 0;
                });
                unCheckedData = unCheckedData.sort(function (a, b) {
                    if (a[element.field] < b[element.field])
                        return -1;
                    if (a[element.field] > b[element.field])
                        return 1;
                    return 0;
                });
                if (event.order == -1) {
                    this.lstGridData = checkedData.reverse().concat(unCheckedData.reverse()); // sortedUnCheckedData.reverse();
                }
                else {
                    this.lstGridData = checkedData.concat(unCheckedData);
                }
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "onSort");
        }
    };
    ProcessParametersComponent.prototype.checkAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null || this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].ASSIGN_CART = true;
                }
            }
            else {
                if (this.EndIndex > this.lstGridData.length) {
                    this.EndIndex = this.lstGridData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstGridData[i].ASSIGN_CART = true;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    ProcessParametersComponent.prototype.unCheckAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null || this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].ASSIGN_CART = false;
                }
            }
            else {
                if (this.EndIndex > this.lstGridData.length) {
                    this.EndIndex = this.lstGridData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstGridData[i].ASSIGN_CART = false;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    ProcessParametersComponent.prototype.filterdata = function (event) {
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    ProcessParametersComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ProcessParametersComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.orgGroupList = null;
        this.CartIdSearchLst = null;
        this.growlMessage = null;
        this.lstGridData = null;
        this.lstScheduleData = null;
        this.lstGridData1 = null;
        this.growlMessage = null;
        this.lstGridData1 = null;
        this.spinnerService.stop();
        this.lstOrgGroupData = null;
        this.lblOrgGroupId = null;
        this.ddlBusinessData = null;
        this.businessDatangModel = null;
        this.previousSelected = null;
        this.lstBusinessData = null;
        this.orgGroupIDForDBUpdate = null;
    };
    return ProcessParametersComponent;
}());
__decorate([
    core_1.ViewChild(datatable_1.DataTable),
    __metadata("design:type", datatable_1.DataTable)
], ProcessParametersComponent.prototype, "dataTableComponent", void 0);
ProcessParametersComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1948),
        providers: [cart_process_parameters_service_1.CartProcessServices, atpar_common_service_1.AtParCommonService, HttpService_1.HttpService, AtParConstants_1.AtParConstants],
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService,
        cart_process_parameters_service_1.CartProcessServices,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        AtParConstants_1.AtParConstants])
], ProcessParametersComponent);
exports.ProcessParametersComponent = ProcessParametersComponent;


/***/ }),

/***/ 1433:
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
var cart_schedule_compliance_report_service_1 = __webpack_require__(1707);
var AtParEnums_1 = __webpack_require__(14);
var AtParConstants_1 = __webpack_require__(31);
var AtParStatusCodes_1 = __webpack_require__(50);
var routepath_1 = __webpack_require__(70);
var file_saver_1 = __webpack_require__(228);
var ScheduleComplianceReportComponent = (function () {
    function ScheduleComplianceReportComponent(httpService, commonService, spinnerService, atParConstant, scheduleComplianceServices) {
        this.httpService = httpService;
        this.commonService = commonService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.scheduleComplianceServices = scheduleComplianceServices;
        this.growlMessage = [];
        this.devicetokenentry = [];
        this.userId = "";
        this.orgGrpId = "";
        this.blnShowOrgGroupIdDropDown = false;
        this.blnShowOrgGroupIdLabel = false;
        this.orgGrpIdData = "";
        this.statusCode = -1;
        this.lstOrgGroups = [];
        this.lstUsers = [];
        this.lstMulUsers = [];
        //orgGroupIDForUserUpdate: string = "";
        this.selectedOrgGroupId = "";
        this.orgGroupID = "";
        this.onDate = "";
        this.orgGrp = "";
        // serverUser: string = "";
        this.isLblVisible = false;
        this.showGrid = false;
        this.selectedDropDownUserId = "";
        this.usersID = "";
        this.blnTotal = false;
        this.lstOutputSchedule = [];
        this.gstrProtocal = "";
        this.string = "";
        this.gstrPortNo = "";
        this.ipAddress = "";
        this.isMailDialog = false;
        this.toMailAddr = '';
        this.tdExports = false;
        try {
            this.spinnerService.start();
            this.breadCrumbMenu = new routepath_1.Menus();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "constr");
        }
        this.spinnerService.stop();
    }
    ScheduleComplianceReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                debugger;
                this.devicetokenentry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                this.userId = this.devicetokenentry[AtParEnums_1.TokenEntry_Enum.UserID.toString()];
                this.orgGrpId = this.devicetokenentry[AtParEnums_1.TokenEntry_Enum.OrgGrpID.toString()];
                this.ondate = new Date();
                try {
                    this.bindOrgGroups();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "oninit");
                }
                return [2 /*return*/];
            });
        });
    };
    ScheduleComplianceReportComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.devicetokenentry[AtParEnums_1.TokenEntry_Enum.UserID], this.devicetokenentry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupIdLabel = true;
                                            _this.orgGrpIdData = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            //this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.bindUsersList();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupIdDropDown = true;
                                            _this.lstOrgGroups = [];
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            _this.lstUsers = [];
                                            _this.lstUsers.push({ label: "Select User", value: "" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
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
    ScheduleComplianceReportComponent.prototype.bindUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.blnShowOrgGroupIdLabel) {
                            this.orgGroupID = this.orgGrpIdData.split("-")[0];
                        }
                        else {
                            this.orgGroupID = this.selectedOrgGroupId;
                        }
                        //this.lstUsers = [];
                        //this.lstUsers.push({ label: "All", value: "All" });
                        return [4 /*yield*/, this.scheduleComplianceServices.getHeirarchyUsersList(this.orgGroupID, AtParEnums_1.EnumApps.CartCount, this.devicetokenentry[AtParEnums_1.TokenEntry_Enum.UserID]).then(function (result) {
                                var res = result.json();
                                _this.lstUsers = [];
                                _this.lstUsers.push({ label: "Select User", value: "" });
                                _this.lstUsers.push({ label: 'All', value: 'All' });
                                //this.userID = 'ALL';
                                switch (res.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        for (var i = 0; i < res.DataDictionary["pDSUserList"].Table1.length; i++) {
                                            _this.lstUsers.push({ label: res.DataDictionary["pDSUserList"].Table1[i].FULLNAME, value: res.DataDictionary["pDSUserList"].Table1[i].USER_ID });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        //this.lstUsers = [];
                        //this.lstUsers.push({ label: "All", value: "All" });
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ScheduleComplianceReportComponent.prototype.ddlOrgGroupChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    if (this.blnShowOrgGroupIdLabel) {
                        this.bindUsersList();
                    }
                    else if (this.blnShowOrgGroupIdDropDown) {
                        if (this.selectedOrgGroupId == "Select One") {
                            this.lstUsers = [];
                            this.lstUsers.push({ label: "Select User", value: "" });
                            return [2 /*return*/];
                        }
                        else {
                            this.bindUsersList();
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "ddlOrgGroupChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    ScheduleComplianceReportComponent.prototype.goClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var result, i, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.showGrid = false;
                        this.isLblVisible = false;
                        this.growlMessage = [];
                        result = false;
                        this.blnTotal = false;
                        result = this.validateSearchFields();
                        if (!result) return [3 /*break*/, 2];
                        this.usersID = "";
                        this.lstScheduleDetails = [];
                        this.lstUserDetails = [];
                        if (this.selectedDropDownUserId == "All") {
                            for (i = 0; i < this.lstUsers.length; i++) {
                                if (this.lstUsers[i].value !== "All" && this.lstUsers[i].value !== "") {
                                    this.usersID = this.usersID.concat("'", this.lstUsers[i].value, "',");
                                }
                            }
                            this.usersID = this.usersID.substring(0, this.usersID.length - 1);
                        }
                        else {
                            this.usersID = this.selectedDropDownUserId;
                        }
                        this.onDate = this.convertDateFormate(this.ondate);
                        if (this.blnShowOrgGroupIdLabel == true) {
                            this.orgGrp = this.devicetokenentry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        }
                        else {
                            this.orgGrp = this.selectedOrgGroupId;
                        }
                        return [4 /*yield*/, this.scheduleComplianceServices.getcomplianceReport(this.userId, this.usersID, this.onDate, this.orgGrp)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstOutputSchedule = [];
                                        _this.lstScheduleDetails = data.DataDictionary.dsCompRep["Records"];
                                        _this.lstUserDetails = data.DataDictionary.dsCompRep["UsersList"];
                                        _this.lstMulUsers = new Array();
                                        if (_this.lstScheduleDetails.length > 0) {
                                            for (var j in _this.lstScheduleDetails) {
                                                if (_this.lstScheduleDetails[j].STATUS == 0) {
                                                    _this.lstScheduleDetails[j].COLOR = "green";
                                                }
                                                else if (_this.lstScheduleDetails[j].STATUS == 2) {
                                                    _this.lstScheduleDetails[j].COLOR = "red";
                                                }
                                                else {
                                                    _this.lstScheduleDetails[j].COLOR = "gray";
                                                }
                                            }
                                            for (var i_1 in _this.lstUserDetails) {
                                                var mulUsers = _this.lstScheduleDetails.filter(function (a) { return a.USER_ID == _this.lstUserDetails[i_1].USER_ID; });
                                                var fulluserId = _this.lstUserDetails[i_1].FIRST_NAME + " " + _this.lstUserDetails[i_1].MIDDLE_INITIAL + " " + _this.lstUserDetails[i_1].LAST_NAME + " (" + _this.lstUserDetails[i_1].USER_ID + ")";
                                                _this.lstOutputSchedule.push({
                                                    USER_ID: fulluserId,
                                                    SCHEDULEDETAILS: mulUsers
                                                });
                                            }
                                            if (_this.lstScheduleDetails.length > 0) {
                                                _this.showGrid = true;
                                                _this.isLblVisible = true;
                                                _this.blnTotal = true;
                                                _this.tdExports = true;
                                            }
                                        }
                                        else {
                                            _this.showGrid = false;
                                            _this.isLblVisible = false;
                                            var result_1 = false;
                                            _this.blnTotal = false;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.isLblVisible = false;
                                        var result_2 = false;
                                        _this.blnTotal = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.isLblVisible = false;
                                        var result_3 = false;
                                        _this.blnTotal = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.isLblVisible = false;
                                        var result_4 = false;
                                        _this.blnTotal = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "goClick");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleComplianceReportComponent.prototype.setbackGroundColor = function (x, opt) {
        try {
            if (opt.STATUS != null) {
                if (opt.STATUS == 0) {
                    x.parentNode.parentNode.style.background = "green";
                }
                else if (opt.STATUS == 1) {
                    x.parentNode.parentNode.style.background = "grey";
                }
                else if (opt.STATUS == 2) {
                    x.parentNode.parentNode.style.background = "red";
                }
            }
        }
        catch (ex) {
        }
    };
    ScheduleComplianceReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    ScheduleComplianceReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ScheduleComplianceReportComponent.prototype.validateSearchFields = function () {
        try {
            this.growlMessage = [];
            if ((this.blnShowOrgGroupIdDropDown == true) && (this.selectedOrgGroupId == 'Select One' || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "")) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select valid Org Group ID" });
                this.showGrid = false;
                this.isLblVisible = false;
                var result = false;
                this.blnTotal = false;
                this.tdExports = false;
                return false;
            }
            else if ((this.selectedDropDownUserId == null || this.selectedDropDownUserId == undefined || this.selectedDropDownUserId == "" || this.selectedDropDownUserId == 'Select User')) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select User" });
                this.showGrid = false;
                this.isLblVisible = false;
                var result = false;
                this.blnTotal = false;
                this.tdExports = false;
                return false;
            }
            else if (this.ondate == null || this.ondate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                this.showGrid = false;
                this.isLblVisible = false;
                var result = false;
                this.blnTotal = false;
                this.tdExports = false;
                return false;
            }
            else if (Date.parse(this.ondate.toString())) {
                if (Date.parse(this.convertDateFormate(this.ondate)) > Date.parse(this.convertDateFormate(Date.now()))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Date must be less than or equal to current date' });
                    this.showGrid = false;
                    this.isLblVisible = false;
                    var result = false;
                    this.blnTotal = false;
                    this.tdExports = false;
                    return false;
                }
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "validateSearchFields");
            return false;
        }
    };
    ScheduleComplianceReportComponent.prototype.ExportReportReview = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, _DS, imgserverPath, schdate, title, i, scheduledtls, j, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        _DS = [];
                        imgserverPath = '';
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
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 3:
                        _a.sent();
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        schdate = new Date(this.ondate);
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder += "<Table align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=75% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td align=left colspan=2><span class=c2>Schedule Compliance Report for " + this.dayOfWeekAsString(schdate.getDay() - 1) + " (" + this.convertDateFormate(this.onDate) + ")" + "</b></span></td>";
                            htmlBuilder += "<td align=right><img src=" + imgserverPath + "GreenBox.bmp>&nbsp;&nbsp;&nbsp;<b>Counted in time</b></td>";
                            htmlBuilder += "<td align=right><img src=" + imgserverPath + "GrayBox.bmp>&nbsp;&nbsp;&nbsp;<b>Counted after time</b></td>";
                            htmlBuilder += "<td align=right><img src=" + imgserverPath + "RedBox.bmp>&nbsp;&nbsp;&nbsp;<b>Not Counted</b></td>";
                            htmlBuilder += "<td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else if (reqType == 'Excel') {
                            htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            htmlBuilder += "<TR  height='27px'><TD height='27px'  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td align=left colspan=3><span class=c2>Schedule Compliance Report for " + this.dayOfWeekAsString(schdate.getDay() - 1) + " (" + this.convertDateFormate(this.onDate) + ")" + "</b></span></td>";
                            htmlBuilder += "<td><img src=" + imgserverPath + "GreenBox.bmp>&nbsp;&nbsp;&nbsp;<span class=c2><b>Counted in time&nbsp;&nbsp;</b></span></td>";
                            htmlBuilder += "<td><img src=" + imgserverPath + "GrayBox.bmp>&nbsp;&nbsp;&nbsp;<span class=c2><b>Counted after time&nbsp;&nbsp;</b></span></td>";
                            htmlBuilder += "<td><img src=" + imgserverPath + "RedBox.bmp>&nbsp;&nbsp;&nbsp;<span class=c2><b>Not Counted</b></span></td>";
                            htmlBuilder += "<td align=right valign=top>&nbsp;";
                        }
                        else {
                            htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            htmlBuilder += "<TR  height='27px'><TD height='27px'  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td align=left colspan=3><span class=c2>Schedule Compliance Report for " + this.dayOfWeekAsString(schdate.getDay() - 1) + " (" + this.convertDateFormate(this.onDate) + ")" + "</b></span></td>";
                            htmlBuilder += "<td><img src=" + imgserverPath + "GreenBox.bmp>&nbsp;&nbsp;&nbsp;<span class=c2><b>Counted in time&nbsp;&nbsp;</b></span></td>";
                            htmlBuilder += "<td><img src=" + imgserverPath + "GrayBox.bmp>&nbsp;&nbsp;&nbsp;<span class=c2><b>Counted after time&nbsp;&nbsp;</b></span></td>";
                            htmlBuilder += "<td><img src=" + imgserverPath + "RedBox.bmp>&nbsp;&nbsp;&nbsp;<span class=c2><b>Not Counted</b></span></td>";
                            htmlBuilder += "<td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr> ";
                        for (i = 0; i <= this.lstOutputSchedule.length - 1; i++) {
                            scheduledtls = [];
                            scheduledtls = this.lstOutputSchedule[i].SCHEDULEDETAILS;
                            htmlBuilder += "<tr><td><table align=center width=90% style=BORDER-COLLAPSE:collapse border=1>";
                            htmlBuilder += "<tr><td align=center colspan=6><span class=c3>" + this.lstOutputSchedule[i].USER_ID + "</span></td></tr>";
                            htmlBuilder += "<tr>";
                            htmlBuilder += "<td align=center nowrap><span class=c3><b>Status</b></span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3><b>Business Unit/Company</b></span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3><b>Cart ID/Par Location</b></span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3><b>Scheduled to count before</b></span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3><b>Actual Count time</b></span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3><b>Deviation (mins)</b></span></td>";
                            htmlBuilder += "</tr>";
                            for (j = 0; j <= this.lstOutputSchedule[i].SCHEDULEDETAILS.length - 1; j++) {
                                htmlBuilder += "<tr>";
                                if (this.lstOutputSchedule[i].SCHEDULEDETAILS[j].STATUS == 0) {
                                    htmlBuilder += "<td style=background-color:Green ></td>";
                                }
                                else if (this.lstOutputSchedule[i].SCHEDULEDETAILS[j].STATUS == 1) {
                                    htmlBuilder += "<td style=background-color:Gray ></td>";
                                }
                                else if (this.lstOutputSchedule[i].SCHEDULEDETAILS[j].STATUS == 2) {
                                    htmlBuilder += "<td style=background-color:Red ></td>";
                                }
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstOutputSchedule[i].SCHEDULEDETAILS[j].BUSINESS_UNIT + "</span></td>";
                                htmlBuilder += "<td align=left style='mso-number-format:\@;' nowrap><span class=c3>" + this.lstOutputSchedule[i].SCHEDULEDETAILS[j].CART_ID + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstOutputSchedule[i].SCHEDULEDETAILS[j].COUNT_BEFORE + "</span></td>";
                                htmlBuilder += "<td align=left ><span class=c3>" + this.lstOutputSchedule[i].SCHEDULEDETAILS[j].ACTUAL_COUNT_TIME + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstOutputSchedule[i].SCHEDULEDETAILS[j].TIME_DIFFERENCE + "</span></td>";
                                htmlBuilder += "</tr>";
                            }
                            htmlBuilder += "</table></td></tr>";
                        }
                        htmlBuilder += "</Table>";
                        htmlBuilder = htmlBuilder.replace(/null/gi, '');
                        return [4 /*yield*/, htmlBuilder];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "ExportReportReview");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleComplianceReportComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.isMailDialog = true;
                    this.toMailAddr = '';
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "onSendMailIconClick");
                }
                return [2 /*return*/];
            });
        });
    };
    ScheduleComplianceReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.growlMessage = [];
                        if (this.toMailAddr == '' || this.toMailAddr == undefined) {
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
                        return [4 /*yield*/, this.ExportReportReview('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        html.replace('null', '');
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmail(this.devicetokenentry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Schedule Compliance Report', JSON.stringify(html), this.toMailAddr, AtParEnums_1.MailPriority.Normal.toString(), '')
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
                        this.toMailAddr = '';
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
    ScheduleComplianceReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.ExportReportReview('Print')];
                    case 1:
                        html = _a.sent();
                        html.replace('null', '');
                        if (html != '' && html != null) {
                            mywindow = window.open('', null, 'height=600,width=600,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<style>@page{size:landscape;"}</style><html><head><title>' + 'Cart Count - Schedule Compliance Report' + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                //mywindow.document.close(); // necessary for IE >= 10
                                mywindow.focus(); // necessary for IE >= 10*/
                                //  mywindow.print();
                                // mywindow.close();
                                return [2 /*return*/, true];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "onPrintClick");
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleComplianceReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.growlMessage = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.ExportReportReview('Excel')];
                    case 1:
                        html = _a.sent();
                        html.replace('null', '');
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "ScheduleComplianceReport.xls");
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
    ScheduleComplianceReportComponent.prototype.validateEmail = function (email) {
        var ret = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return ret.test(email);
    };
    ScheduleComplianceReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    ScheduleComplianceReportComponent.prototype.OnDestroy = function () {
        this.lstUsers = null;
        this.growlMessage = [];
        this.orgGroupData = null;
        this.lstOrgGroups = null;
        this.lstScheduleDetails = null;
        this.lstMulUsers = null;
        this.lstUserDetails = null;
        this.lstOutputSchedule = null;
    };
    ScheduleComplianceReportComponent.prototype.dayOfWeekAsString = function (dayIndex) {
        return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][dayIndex];
    };
    return ScheduleComplianceReportComponent;
}());
ScheduleComplianceReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1949),
        providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, cart_schedule_compliance_report_service_1.CartScheduleComplianceReportServices]
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService,
        atpar_common_service_1.AtParCommonService,
        event_spinner_service_1.SpinnerService,
        AtParConstants_1.AtParConstants,
        cart_schedule_compliance_report_service_1.CartScheduleComplianceReportServices])
], ScheduleComplianceReportComponent);
exports.ScheduleComplianceReportComponent = ScheduleComplianceReportComponent;


/***/ }),

/***/ 1434:
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
var SetupParLocationsComponent = (function () {
    function SetupParLocationsComponent() {
        this.cartAppId = AtParEnums_1.EnumApps.CartCount;
    }
    return SetupParLocationsComponent;
}());
SetupParLocationsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1950)
    })
], SetupParLocationsComponent);
exports.SetupParLocationsComponent = SetupParLocationsComponent;


/***/ }),

/***/ 1435:
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
var HttpService_1 = __webpack_require__(12);
var AtParEnums_1 = __webpack_require__(14);
var event_spinner_service_1 = __webpack_require__(24);
var AtParEnums_2 = __webpack_require__(14);
var AtParEnums_3 = __webpack_require__(14);
var atpar_common_service_1 = __webpack_require__(43);
var cart_twobin_allocation_service_1 = __webpack_require__(1708);
var AtParConstants_1 = __webpack_require__(31);
var TwoBinAllocationComponent = (function () {
    function TwoBinAllocationComponent(httpService, spinnerService, commonService, cartTwoBinService, atParConstant) {
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.cartTwoBinService = cartTwoBinService;
        this.atParConstant = atParConstant;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.selectedOrgGroupId = "";
        this.selectedDropDownDisplay = "A";
        this.selectedBunit = "";
        this.selectedParlocation = "";
        this.orgGrpId = "";
        this.order = "";
        this.blnShowOrgGroupDD = false;
        this.showGrid = false;
        this.lstOrgGroups = [];
        this.lstFilteredBUnits = [];
        this.lstFilteredDisplay = [];
        this.blnsortbycolumn = true;
        this.custom = "custom";
        this.dataCheckedSorting = [];
        this.previousFiled = "";
    }
    TwoBinAllocationComponent.prototype.ngOnInit = function () {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.RecordsPerPage];
        this.dataCheckedSorting = new Array();
        this.dataUncheckedSorting = new Array();
        this.bindOrgGroups();
        this.bindDisplayItems();
    };
    TwoBinAllocationComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_3.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
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
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
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
    TwoBinAllocationComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        isOrgBUnitsExist = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_2.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.lstFilteredBUnits = [];
                                _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstFilteredBUnits.push({
                                                label: data.DataList[i].toString(),
                                                value: data.DataList[i].toString()
                                            });
                                        }
                                        isOrgBUnitsExist = true;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(isOrgBUnitsExist)];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "populateBusinessUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TwoBinAllocationComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showGrid = false;
                        this.growlMessage = [];
                        if (this.selectedOrgGroupId == "Select One") {
                            this.lstFilteredBUnits = [];
                            this.lstFilteredBUnits.push({ label: "Select BUnit", value: " " });
                            return [2 /*return*/];
                        }
                        this.selectedBunit = "";
                        this.lstDBData = new Array();
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.populateBusinessUnits()];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "ddlOrgGrpIdChanged");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TwoBinAllocationComponent.prototype.ddl_Changed = function () {
        this.showGrid = false;
    };
    TwoBinAllocationComponent.prototype.bindDisplayItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.lstFilteredDisplay.push({ label: "All", value: "A" });
                this.lstFilteredDisplay.push({ label: "Allocated", value: "L" });
                this.lstFilteredDisplay.push({ label: "Unallocated", value: "U" });
                return [2 /*return*/];
            });
        });
    };
    TwoBinAllocationComponent.prototype.getAllocateCarts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isChecked, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.showGrid = false;
                        this.spinnerService.start();
                        isChecked = false;
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                            if (this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined) {
                                this.showGrid = false;
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID." });
                                this.spinnerService.stop();
                                return [2 /*return*/, false];
                            }
                        }
                        if (this.selectedBunit == "" || this.selectedBunit == "Select BUnit" || this.selectedBunit == undefined) {
                            this.showGrid = false;
                            this.growlMessage = [];
                            this.growlMessage.push({
                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company"
                            });
                            this.spinnerService.stop();
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.cartTwoBinService.getCartDetails(this.selectedBunit, this.selectedParlocation).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.showGrid = true;
                                        _this.lstDBData = [];
                                        _this.lstDBData = data.DataList;
                                        _this.BindDataGrid();
                                        _this.dataCheckedSorting = [];
                                        _this.dataUncheckedSorting = [];
                                        for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                            _this.lstDBData[i].Sno = i + 1;
                                            if (_this.lstDBData[i].TWO_BIN_ALLOCATION == 'TRUE') {
                                                _this.lstDBData[i].checkvalue = true;
                                                _this.lstDBData[i].TWO_BIN_ALLOCATION = 'Y';
                                                _this.dataCheckedSorting.push(_this.lstDBData[i]);
                                            }
                                            else {
                                                _this.lstDBData[i].checkvalue = false;
                                                _this.lstDBData[i].TWO_BIN_ALLOCATION = 'N';
                                                _this.dataUncheckedSorting.push(_this.lstDBData[i]);
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
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
                        ex_4 = _a.sent();
                        this.showGrid = false;
                        this.clientErrorMsg(ex_4, "getAllocateCarts");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TwoBinAllocationComponent.prototype.selectedRow = function (ven, event) {
        try {
            if (event == true) {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].Sno == ven.Sno) {
                        this.lstDBData[i].CHK_VALUE = 1;
                        this.lstDBData[i].TWO_BIN_ALLOCATION = "Y";
                    }
                }
            }
            else {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].Sno == ven.Sno) {
                        this.lstDBData[i].CHK_VALUE = 0;
                        this.lstDBData[i].TWO_BIN_ALLOCATION = "N";
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    };
    TwoBinAllocationComponent.prototype.allocateTwoBinLocData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, i, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        if (this.selectedBunit == "" || this.selectedBunit == "Select BUnit" || this.selectedBunit == undefined) {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({
                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Business Unit/Company"
                            });
                            return [2 /*return*/];
                        }
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            if (this.lstDBData[i].TWO_BIN_ALLOCATION == 'Y') {
                                if (this.lstDBData[i].DEF_PERCENTAGE_VALUE === "" || this.lstDBData[i].DEF_PERCENTAGE_VALUE == null || this.lstDBData[i].DEF_PERCENTAGE_VALUE == undefined) {
                                    this.spinnerService.stop();
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Default percent values is mandatory when 2 Bin Location is checked." });
                                    return [2 /*return*/];
                                }
                            }
                        }
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            if (this.lstDBData[i].checkvalue) {
                                this.lstDBData[i].CHK_ALLOCATED = 1;
                                this.lstDBData[i].TWO_BIN_ALLOCATION = "Y";
                            }
                            else {
                                this.lstDBData[i].CHK_ALLOCATED = 0;
                                this.lstDBData[i].TWO_BIN_ALLOCATION = "N";
                                this.lstDBData[i].DEF_PERCENTAGE_VALUE = "";
                            }
                        }
                        return [4 /*yield*/, this.cartTwoBinService.TwoBinSaving(this.lstDBMainDetails, this.selectedBunit).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                        _this.selectedBunit = "";
                                        _this.showGrid = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "allocateTwoBinLocData");
                        this.showGrid = false;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TwoBinAllocationComponent.prototype.BindDataGrid = function () {
        var _this = this;
        var lstDBDataList;
        this.lstDBMainDetails = [];
        try {
            for (var k = 0; k < this.lstDBData.length; k++) {
                this.lstDBMainDetails.push(this.lstDBData[k]);
            }
            if (this.selectedDropDownDisplay === "L") {
                this.showGrid = true;
                this.lstDBData = this.lstDBData.filter(function (x) { return x.TWO_BIN_ALLOCATION == 'TRUE'; });
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    return;
                }
            }
            else if (this.selectedDropDownDisplay === "U") {
                this.showGrid = false;
                this.lstDBData = this.lstDBData.filter(function (x) { return x.TWO_BIN_ALLOCATION == 'FALSE'; });
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    return;
                }
            }
            else {
                this.showGrid = false;
            }
            if (this.selectedParlocation != undefined && this.selectedParlocation != null && this.selectedParlocation.trim().length != 0) {
                this.lstDBData = this.lstDBData.filter(function (x) { return x.CART_ID.indexOf(_this.selectedParlocation.toUpperCase()) !== -1; });
            }
            this.showGrid = true;
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    };
    TwoBinAllocationComponent.prototype.customSort = function (event) {
        var element = event;
        this.lstDBData = [];
        try {
            if (this.previousFiled == element.field) {
                this.blnsortbycolumn = !this.blnsortbycolumn;
            }
            else {
                this.blnsortbycolumn = false;
            }
            this.previousFiled = element.field;
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
            this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            if (element.field != "DEF_PERCENTAGE_VALUE") {
                this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                    if (a[element.field] < b[element.field])
                        return -1;
                    if (a[element.field] > b[element.field])
                        return 1;
                    return 0;
                });
                if (this.blnsortbycolumn == false) {
                    this.sorteduncheckedrec = this.sorteduncheckedrec.reverse();
                }
            }
            else {
                this.sorteduncheckedrec = this.dataUncheckedSorting;
            }
            if (this.blnsortbycolumn == false) {
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec);
            }
            else {
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
            }
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    };
    TwoBinAllocationComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    TwoBinAllocationComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstFilteredBUnits = null;
        this.lstOrgGroups = null;
        this.lstFilteredDisplay = null;
        this.lstFilteredBUnits = null;
        this.lstDBData = null;
        this.orgGroupData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        this.lstDBMainDetails = [];
        this.orgGroupData = null;
    };
    return TwoBinAllocationComponent;
}());
TwoBinAllocationComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1951),
        providers: [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, cart_twobin_allocation_service_1.CartTwoBinService, HttpService_1.HttpService]
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        cart_twobin_allocation_service_1.CartTwoBinService,
        AtParConstants_1.AtParConstants])
], TwoBinAllocationComponent);
exports.TwoBinAllocationComponent = TwoBinAllocationComponent;


/***/ }),

/***/ 1436:
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
var UserParametersComponent = (function () {
    function UserParametersComponent() {
        this.crctAppId = AtParEnums_1.EnumApps.CartCount;
    }
    return UserParametersComponent;
}());
UserParametersComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1952)
    })
], UserParametersComponent);
exports.UserParametersComponent = UserParametersComponent;


/***/ }),

/***/ 1437:
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
var UserProductivityReportComponent = (function () {
    function UserProductivityReportComponent() {
    }
    return UserProductivityReportComponent;
}());
UserProductivityReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1953)
    })
], UserProductivityReportComponent);
exports.UserProductivityReportComponent = UserProductivityReportComponent;


/***/ }),

/***/ 1438:
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
var CartCountComponent = (function () {
    function CartCountComponent() {
    }
    return CartCountComponent;
}());
CartCountComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1954)
    })
], CartCountComponent);
exports.CartCountComponent = CartCountComponent;


/***/ }),

/***/ 1700:
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
var CartCountAllocationServices = (function () {
    function CartCountAllocationServices(httpservice) {
        this.httpservice = httpservice;
    }
    CartCountAllocationServices.prototype.getCartDetails = function (orgGroupID, UserID, Bunit, parlocation, order) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            apiMethod: "/api/AllocateCarts/GetCarts",
                            params: {
                                "orgGroupID": orgGroupID,
                                "userID": UserID,
                                "bUnit": Bunit,
                                "cartID": parlocation,
                                "order": order,
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CartCountAllocationServices.prototype.AllocateCarts = function (lstDBData, userID, seletedUserID, bUnit, cartID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.create({
                            apiMethod: "/api/AllocateCarts/AllocateCarts",
                            formData: lstDBData,
                            params: {
                                "userID": userID,
                                "seletedUserID": seletedUserID,
                                "bUnit": bUnit,
                                "cartID": cartID
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CartCountAllocationServices.prototype.CopyCarts = function (lstDBData, userID, seletedUserID, bUnit, cartID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.create({
                            apiMethod: "/api/AllocateCarts/CopyCarts",
                            formData: lstDBData,
                            params: {
                                "userID": userID,
                                "seletedUserID": seletedUserID,
                                "bUnit": bUnit,
                                "cartID": cartID
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CartCountAllocationServices.prototype.MoveCarts = function (lstDBData, userID, seletedUserID, bUnit, cartID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.update({
                            apiMethod: "/api/AllocateCarts/MoveCarts",
                            formData: lstDBData,
                            params: {
                                "userID": userID,
                                "seletedUserID": seletedUserID,
                                "bUnit": bUnit,
                                "cartID": cartID
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CartCountAllocationServices.prototype.DeleteCarts = function (lstDBData, seletedUserID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.create({
                            apiMethod: "/api/AllocateCarts/DeleteCarts",
                            formData: lstDBData,
                            params: {
                                "userID": seletedUserID
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CartCountAllocationServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return CartCountAllocationServices;
}());
CartCountAllocationServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], CartCountAllocationServices);
exports.CartCountAllocationServices = CartCountAllocationServices;


/***/ }),

/***/ 1701:
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
var CreateOrdersServices = (function () {
    function CreateOrdersServices(httpservice) {
        this.httpservice = httpservice;
    }
    CreateOrdersServices.prototype.getCartsForBunit = function (serverUser, businessUnit, orgGroupID) {
        return this.httpservice.getSync({
            apiMethod: "/api/CreateOrders/GetCartsForBunit",
            params: {
                "serverUser": serverUser,
                "businessUnit": businessUnit,
                "orgGroupID": orgGroupID
            }
        }).catch(this.httpservice.handleError);
    };
    CreateOrdersServices.prototype.getCartPrevCounts = function (orgGroupID, businessUnit, ID, serverUser, profileID) {
        return this.httpservice.getSync({
            apiMethod: "/api/CreateOrders/GetCartPrevCounts",
            params: {
                "orgGroupID": orgGroupID,
                "businessUnit": businessUnit,
                "ID": ID,
                "serverUser": serverUser,
                "profileID": profileID
            }
        }).catch(this.httpservice.handleError);
    };
    CreateOrdersServices.prototype.sendCartCounts = function (dicDataItems, serverUser, businessUnit, ID, profileID, orgGroupID, transID) {
        return this.httpservice.create({
            apiMethod: "/api/CreateOrders/SendCartCounts",
            formData: dicDataItems,
            params: {
                "serverUser": serverUser,
                "businessUnit": businessUnit,
                "ID": ID,
                "profileID": profileID,
                "orgGroupID": orgGroupID,
                "transID": transID
            }
        }).toPromise();
    };
    CreateOrdersServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return CreateOrdersServices;
}());
CreateOrdersServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], CreateOrdersServices);
exports.CreateOrdersServices = CreateOrdersServices;


/***/ }),

/***/ 1702:
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
var CreateRequisitionComponent = (function () {
    function CreateRequisitionComponent() {
    }
    return CreateRequisitionComponent;
}());
CreateRequisitionComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1937)
    })
], CreateRequisitionComponent);
exports.CreateRequisitionComponent = CreateRequisitionComponent;


/***/ }),

/***/ 1703:
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
var http_1 = __webpack_require__(38);
__webpack_require__(32);
var HttpService_1 = __webpack_require__(12);
var CartItemUsageService = (function () {
    function CartItemUsageService(http, httpService) {
        this.http = http;
        this.httpService = httpService;
        this.http = http;
    }
    CartItemUsageService.prototype.GetCartItemInfo = function (orgGroupID, businessUnit, cartID, serverUser, profileID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetCartItemInfo",
                            params: {
                                "orgGroupID": orgGroupID,
                                "businessUnit": businessUnit,
                                "cartID": cartID,
                                "serverUser": serverUser,
                                "profileID": profileID //Profile ID               
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CartItemUsageService.prototype.GetItemUsageDetails = function (ItemId, fromdate, todate, bunit, cartId, serveruser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/ItemUsageReport/GetItemUsageDetails",
                            params: {
                                "itemID": ItemId,
                                "fDate": fromdate,
                                "toDate": todate,
                                "bUnit": bunit,
                                "cartId": cartId,
                                "srvrUserID": serveruser
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CartItemUsageService;
}());
CartItemUsageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, HttpService_1.HttpService])
], CartItemUsageService);
exports.CartItemUsageService = CartItemUsageService;


/***/ }),

/***/ 1704:
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
var OptimizationReportService = (function () {
    function OptimizationReportService(httpservice) {
        this.httpservice = httpservice;
    }
    OptimizationReportService.prototype.getCartOptimizationRep = function (bUnit, deptID, cartID, fDate, tDate, orgGrpID, profileID, intCntFreq, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            apiMethod: "/api/OptimizationReport/GetCartOptimizationRep",
                            params: {
                                "bUnit": bUnit,
                                "deptID": deptID,
                                "cartID": cartID,
                                "fDate": fDate,
                                "tDate": tDate,
                                "orgGrpID": orgGrpID,
                                "profileID": profileID,
                                "intCntFreq": intCntFreq,
                                "userID": userID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OptimizationReportService.prototype.updateCartParAuditRep = function (dicDataItems, userID, orgGrpID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.create({
                            apiMethod: "/api/OptimizationReport/UpdateCartParAuditRep",
                            formData: dicDataItems,
                            params: {
                                "userID": userID,
                                "orgGrpID": orgGrpID
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OptimizationReportService.prototype.getCartsForBunit = function (serverUser, businessUnit, orgGroupID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            apiMethod: "/api/CreateOrders/GetCartsForBunit",
                            params: {
                                "serverUser": serverUser,
                                "businessUnit": businessUnit,
                                "orgGroupID": orgGroupID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OptimizationReportService.prototype.handleError = function (error) {
        debugger;
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return OptimizationReportService;
}());
OptimizationReportService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], OptimizationReportService);
exports.OptimizationReportService = OptimizationReportService;


/***/ }),

/***/ 1705:
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
var CartOrderHistoryReportService = (function () {
    function CartOrderHistoryReportService(httpservice) {
        this.httpservice = httpservice;
    }
    CartOrderHistoryReportService.prototype.getOrderHistoryRep = function (pStrSvrUser, pStrBUnit, pStrParLoc, pOrgGroup, pProfileID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            apiMethod: "/api/OrderHistoryReport/GetOrderHistoryRep",
                            params: {
                                "user": pStrSvrUser,
                                "bUnit": pStrBUnit,
                                "parLoc": pStrParLoc,
                                "orgGroup": pOrgGroup,
                                "profileID": pProfileID,
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CartOrderHistoryReportService.prototype.getCartsForBunit = function (serverUser, businessUnit, orgGroupID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            apiMethod: "/api/CreateOrders/GetCartsForBunit",
                            params: {
                                "serverUser": serverUser,
                                "businessUnit": businessUnit,
                                "orgGroupID": orgGroupID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CartOrderHistoryReportService.prototype.handleError = function (error) {
        debugger;
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return CartOrderHistoryReportService;
}());
CartOrderHistoryReportService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], CartOrderHistoryReportService);
exports.CartOrderHistoryReportService = CartOrderHistoryReportService;


/***/ }),

/***/ 1706:
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
/// <reference path="../entities/mt_atpar_schedule_header.ts" />
var core_1 = __webpack_require__(0);
__webpack_require__(32);
var Rx_1 = __webpack_require__(37);
var HttpService_1 = __webpack_require__(12);
var CartProcessServices = (function () {
    function CartProcessServices(httpservice) {
        this.httpservice = httpservice;
    }
    //GetUserOrgGroups(UserID, OrgGrpID, _deviceTokenEntry) {
    //    return this.httpservice.get({
    //        apiMethod: "/api/Common/GetUserOrgGroups",
    //        params: {
    //            "user": UserID,
    //            "orgGrpId": OrgGrpID,
    //            "deviceTokenEntry": _deviceTokenEntry
    //        }
    //    }).catch(this.httpservice.handleError).map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>);
    //}
    //GetOrgBusinessUnits(OrgGrpID, businessUnitType, deviceTokenEntry) {
    //    return this.httpservice.get({
    //        apiMethod: "/api/Common/GetOrgBusinessUnits",
    //        params: {
    //            "orgGrpID": OrgGrpID,
    //            "businessUnitType": businessUnitType,
    //            "DeviceTokenEntry": deviceTokenEntry
    //        }
    //    }).catch(this.httpservice.handleError)
    //        .map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>);
    //}
    CartProcessServices.prototype.GetProcessParametersCarts = function (OrgGrpID, bUnit, cartID, userID) {
        return this.httpservice.get({
            apiMethod: "/api/ProcessParameters/GetProcessParametersCarts",
            params: {
                "orgGroupID": OrgGrpID,
                "bUnit": bUnit,
                "cartID": cartID,
                "userID": userID
            }
        }).toPromise();
    };
    //GetCartSchedules(OrgGrpID, cartID, bUnit, userID) {
    //    return this.httpservice.get({
    //        apiMethod: "/api/ProcessParameters/GetCartSchedules",
    //        params: {
    //            "orgGroupID": OrgGrpID,
    //            "cartID": cartID,
    //            "bUnit": bUnit,
    //            "userID": userID
    //        }
    //    }).catch(this.httpservice.handleError)
    //        .map((res: Response) => res.json() as AtParWebApiResponse<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS>);
    //}
    CartProcessServices.prototype.GetSheduleIdata = function (orgGroupID) {
        //MT_ATPAR_SCHEDULE_HEADER
        return this.httpservice.get({
            apiMethod: "/api/ProcessParameters/GetSheduleIDs",
            params: {
                "orgGroupID": orgGroupID
            }
        }).toPromise();
    };
    //  thit  insert
    CartProcessServices.prototype.AssignScheduleToCarts = function (lstCartSchedules, orgGroupID, bUnit) {
        return this.httpservice.update({
            apiMethod: "/api/ProcessParameters/AssignScheduleToCarts",
            formData: lstCartSchedules,
            params: {
                "orgGroupID": orgGroupID,
                "bUnit": bUnit
            }
        }).toPromise();
    };
    CartProcessServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return CartProcessServices;
}());
CartProcessServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], CartProcessServices);
exports.CartProcessServices = CartProcessServices;


/***/ }),

/***/ 1707:
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
var CartScheduleComplianceReportServices = (function () {
    function CartScheduleComplianceReportServices(httpService) {
        this.httpService = httpService;
    }
    CartScheduleComplianceReportServices.prototype.getcomplianceReport = function (srvUsr, userId, date, orgGrpId) {
        return this.httpService.getSync({
            apiMethod: "/api/ScheduleComplianceReport/GetCartSchedComplianceRep",
            params: {
                "SvrUser": srvUsr,
                "userID": userId,
                "date": date,
                "orgGrpID": orgGrpId
            }
        });
    };
    CartScheduleComplianceReportServices.prototype.getHeirarchyUsersList = function (orgGrpId, appID, userId) {
        return this.httpService.getSync({
            apiMethod: "/api/ScheduleComplianceReport/GetHeirarchyUsersList",
            params: {
                "orgGrpID": orgGrpId,
                "appID": appID,
                "userID": userId
            }
        });
    };
    CartScheduleComplianceReportServices.prototype.handleError = function (error) {
        debugger;
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return CartScheduleComplianceReportServices;
}());
CartScheduleComplianceReportServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], CartScheduleComplianceReportServices);
exports.CartScheduleComplianceReportServices = CartScheduleComplianceReportServices;


/***/ }),

/***/ 1708:
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
var CartTwoBinService = (function () {
    function CartTwoBinService(httpservice) {
        this.httpservice = httpservice;
    }
    CartTwoBinService.prototype.getCartDetails = function (bunit, cartID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            apiMethod: "/api/TwoBinAlloc/GetTwoBinCartsAllocation",
                            params: {
                                "bUnit": bunit,
                                "cartID": cartID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CartTwoBinService.prototype.TwoBinSaving = function (lstDBData, bUnit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.create({
                            apiMethod: "/api/TwoBinAlloc/TwoBinSaving",
                            formData: lstDBData,
                            params: {
                                "bUnit": bUnit
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CartTwoBinService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return CartTwoBinService;
}());
CartTwoBinService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], CartTwoBinService);
exports.CartTwoBinService = CartTwoBinService;


/***/ }),

/***/ 1709:
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
var cartcount_component_1 = __webpack_require__(1438);
var cart_activity_report_component_1 = __webpack_require__(1416);
var cart_allocate_carts_component_1 = __webpack_require__(1417);
var cart_cart_averages_report_component_1 = __webpack_require__(1418);
var cart_cart_detail_report_component_1 = __webpack_require__(1419);
var cart_cart_putaway_report_component_1 = __webpack_require__(1420);
var cart_create_orders_component_1 = __webpack_require__(1421);
var cart_critical_items_component_1 = __webpack_require__(1422);
var cart_daily_activity_component_1 = __webpack_require__(1423);
var cart_daily_user_activity_component_1 = __webpack_require__(1424);
var cart_item_exception_report_component_1 = __webpack_require__(1425);
var cart_item_usage_report_component_1 = __webpack_require__(1426);
var cart_manage_orders_component_1 = __webpack_require__(1427);
var cart_manage_par_location_component_1 = __webpack_require__(1428);
var cart_optimization_report_component_1 = __webpack_require__(1429);
var cart_order_history_report_component_1 = __webpack_require__(1430);
var cart_par_audit_report_component_1 = __webpack_require__(1431);
var cart_process_parameters_component_1 = __webpack_require__(1432);
var cart_schedule_compliance_report_component_1 = __webpack_require__(1433);
var cart_setup_par_locations_component_1 = __webpack_require__(1434);
var cart_user_parameters_component_1 = __webpack_require__(1436);
var cart_user_productivity_report_component_1 = __webpack_require__(1437);
var cart_twobin_allocation_component_1 = __webpack_require__(1435);
exports.routes = [
    {
        path: '',
        component: cartcount_component_1.CartCountComponent,
        children: [
            { path: 'activityreport', component: cart_activity_report_component_1.ActivityReportComponent },
            { path: 'allocatecarts', component: cart_allocate_carts_component_1.AllocateCartsComponent },
            { path: 'cartaveragesreport', component: cart_cart_averages_report_component_1.CartAveragesReportsComponent },
            { path: 'cartdetailreport', component: cart_cart_detail_report_component_1.CartDetailReportComponent },
            { path: 'cartputawayreport', component: cart_cart_putaway_report_component_1.CartPutawayReportComponent },
            { path: 'createorders', component: cart_create_orders_component_1.CreateOrdersComponent },
            { path: 'criticalitems', component: cart_critical_items_component_1.CriticalItemsComponent },
            { path: 'dailyactivity', component: cart_daily_activity_component_1.DailyActivityComponent },
            { path: 'dailyuseractivity', component: cart_daily_user_activity_component_1.DailyUserActivityComponent },
            { path: 'itemexceptionreport', component: cart_item_exception_report_component_1.ItemExceptionReportComponent },
            { path: 'itemusagereport', component: cart_item_usage_report_component_1.ItemUsageReportComponent },
            { path: 'manageorders', component: cart_manage_orders_component_1.ManageOrdersComponent },
            { path: 'manageparlocation', component: cart_manage_par_location_component_1.ManageParLocationComponent },
            { path: 'optimizationreport', component: cart_optimization_report_component_1.OptimizationReportComponent },
            { path: 'orderhistoryreport', component: cart_order_history_report_component_1.OrderHistoryReportComponent },
            { path: 'parauditreport', component: cart_par_audit_report_component_1.ParAuditReportComponent },
            { path: 'processparameters', component: cart_process_parameters_component_1.ProcessParametersComponent },
            { path: 'schedulecompliancereport', component: cart_schedule_compliance_report_component_1.ScheduleComplianceReportComponent },
            { path: 'setupparlocations', component: cart_setup_par_locations_component_1.SetupParLocationsComponent },
            { path: 'userparameters', component: cart_user_parameters_component_1.UserParametersComponent },
            { path: 'userproductivityreport', component: cart_user_productivity_report_component_1.UserProductivityReportComponent },
            { path: 'twobinallocation', component: cart_twobin_allocation_component_1.TwoBinAllocationComponent }
        ]
    }
];
var CartCountRoutingModule = (function () {
    function CartCountRoutingModule() {
    }
    return CartCountRoutingModule;
}());
CartCountRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.routes)],
        exports: [router_1.RouterModule]
    })
], CartCountRoutingModule);
exports.CartCountRoutingModule = CartCountRoutingModule;


/***/ }),

/***/ 1710:
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
var cartcount_component_1 = __webpack_require__(1438);
var cart_activity_report_component_1 = __webpack_require__(1416);
var cart_allocate_carts_component_1 = __webpack_require__(1417);
var cart_cart_averages_report_component_1 = __webpack_require__(1418);
var cart_cart_detail_report_component_1 = __webpack_require__(1419);
var cart_cart_putaway_report_component_1 = __webpack_require__(1420);
var cart_create_orders_component_1 = __webpack_require__(1421);
var cart_create_requisition_component_1 = __webpack_require__(1702);
var cart_critical_items_component_1 = __webpack_require__(1422);
var cart_daily_activity_component_1 = __webpack_require__(1423);
var cart_daily_user_activity_component_1 = __webpack_require__(1424);
var cart_item_exception_report_component_1 = __webpack_require__(1425);
var cart_item_usage_report_component_1 = __webpack_require__(1426);
var cart_manage_orders_component_1 = __webpack_require__(1427);
var cart_manage_par_location_component_1 = __webpack_require__(1428);
var cart_optimization_report_component_1 = __webpack_require__(1429);
var cart_order_history_report_component_1 = __webpack_require__(1430);
var cart_par_audit_report_component_1 = __webpack_require__(1431);
var cart_process_parameters_component_1 = __webpack_require__(1432);
var cart_schedule_compliance_report_component_1 = __webpack_require__(1433);
var cart_setup_par_locations_component_1 = __webpack_require__(1434);
var cart_user_parameters_component_1 = __webpack_require__(1436);
var cart_user_productivity_report_component_1 = __webpack_require__(1437);
var cart_twobin_allocation_component_1 = __webpack_require__(1435);
var cartcount_routing_module_1 = __webpack_require__(1709);
var shared_module_1 = __webpack_require__(632);
var CartCountModule = (function () {
    function CartCountModule() {
    }
    return CartCountModule;
}());
CartCountModule = __decorate([
    core_1.NgModule({
        imports: [
            cartcount_routing_module_1.CartCountRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            cartcount_component_1.CartCountComponent,
            cart_activity_report_component_1.ActivityReportComponent,
            cart_allocate_carts_component_1.AllocateCartsComponent,
            cart_cart_averages_report_component_1.CartAveragesReportsComponent,
            cart_cart_detail_report_component_1.CartDetailReportComponent,
            cart_cart_putaway_report_component_1.CartPutawayReportComponent,
            cart_create_orders_component_1.CreateOrdersComponent,
            cart_create_requisition_component_1.CreateRequisitionComponent,
            cart_critical_items_component_1.CriticalItemsComponent,
            cart_daily_activity_component_1.DailyActivityComponent,
            cart_daily_user_activity_component_1.DailyUserActivityComponent,
            cart_item_exception_report_component_1.ItemExceptionReportComponent,
            cart_item_usage_report_component_1.ItemUsageReportComponent,
            cart_manage_orders_component_1.ManageOrdersComponent,
            cart_manage_par_location_component_1.ManageParLocationComponent,
            cart_optimization_report_component_1.OptimizationReportComponent,
            cart_order_history_report_component_1.OrderHistoryReportComponent,
            cart_par_audit_report_component_1.ParAuditReportComponent,
            cart_process_parameters_component_1.ProcessParametersComponent,
            cart_schedule_compliance_report_component_1.ScheduleComplianceReportComponent,
            cart_setup_par_locations_component_1.SetupParLocationsComponent,
            cart_user_parameters_component_1.UserParametersComponent,
            cart_user_productivity_report_component_1.UserProductivityReportComponent,
            cart_twobin_allocation_component_1.TwoBinAllocationComponent
        ]
    })
], CartCountModule);
exports.CartCountModule = CartCountModule;


/***/ }),

/***/ 1711:
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
var http_1 = __webpack_require__(38);
__webpack_require__(32);
var HttpService_1 = __webpack_require__(12);
var CriticalCommonService = (function () {
    function CriticalCommonService(http, httpService) {
        this.http = http;
        this.httpService = httpService;
        this.http = http;
    }
    CriticalCommonService.prototype.GetCartItemInfo = function (orgGroupID, businessUnit, cartID, serverUser, profileID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetCartItemInfo",
                            params: {
                                "orgGroupID": orgGroupID,
                                "businessUnit": businessUnit,
                                "cartID": cartID,
                                "serverUser": serverUser,
                                "profileID": profileID //Profile ID               
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CriticalCommonService.prototype.GetCartBunitsInfo = function (orgGroupID, serverUser, businessUnit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/CriticalItems/GetCartBunitsInfo",
                            params: {
                                "orgGroupID": orgGroupID,
                                "serverUser": serverUser,
                                "bUnit": businessUnit
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CriticalCommonService.prototype.AllocateCartItemInfo = function (lstCheckedCarts, businessUnit, cartID, serverUser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            "apiMethod": "/api/CriticalItems/AllocateCartItemInfo",
                            formData: lstCheckedCarts,
                            params: {
                                "bUnit": businessUnit,
                                "cartID": cartID,
                                "serverUser": serverUser
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CriticalCommonService;
}());
CriticalCommonService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, HttpService_1.HttpService])
], CriticalCommonService);
exports.CriticalCommonService = CriticalCommonService;


/***/ }),

/***/ 1733:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MT_CRCT_USER_ALLOCATION = (function () {
    function MT_CRCT_USER_ALLOCATION() {
    }
    return MT_CRCT_USER_ALLOCATION;
}());
exports.MT_CRCT_USER_ALLOCATION = MT_CRCT_USER_ALLOCATION;


/***/ }),

/***/ 1874:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VM_CART_SCHEDULES = (function () {
    function VM_CART_SCHEDULES() {
    }
    return VM_CART_SCHEDULES;
}());
exports.VM_CART_SCHEDULES = VM_CART_SCHEDULES;


/***/ }),

/***/ 1879:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MT_CRCT_PAR_LOC_SCHEDULE_DETAILS = (function () {
    function MT_CRCT_PAR_LOC_SCHEDULE_DETAILS() {
    }
    return MT_CRCT_PAR_LOC_SCHEDULE_DETAILS;
}());
exports.MT_CRCT_PAR_LOC_SCHEDULE_DETAILS = MT_CRCT_PAR_LOC_SCHEDULE_DETAILS;


/***/ }),

/***/ 1931:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <atpar-activity-report [productId]=\"crctProductId\"></atpar-activity-report>\r\n</div>";

/***/ }),

/***/ 1932:
/***/ (function(module, exports) {

module.exports = "<style>\r\n    #checkAll-val:hover {\r\n        color: #ff0000 !important;\r\n    }\r\n\r\n    #UncheckAll-val:hover {\r\n        color: #ff0000 !important;\r\n    }\r\n</style>\r\n<div id=\"main\" class=\"content-page\">   \r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px 0px 10px 0px;\">\r\n                        <form class=\"form-horizontal form-label-left\" novalidate>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Org Group ID </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpId}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupDD\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                        <!--<atpar-text [(ngModel)]=\"newItem.ORGID\" [name]=\"txtORGID\" [validations]=\"'except_less_greater_symbols'\" [id]=\"'ORGID'\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"true\"></atpar-text>-->\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">User ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstUsers\" [id]=\"'ddllstUsers'\" [required]=\"true\" [(ngModel)]=\"selectedDropDownUserId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddlUsersIdChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Business Unit / Company</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <!--<atpar-ac-server [(ngModel)]=\"selectedBunit\" [ngModelOptions]=\"{standalone: true}\" [suggestions]=\"lstFilteredBUnits\" (completeMethod)=\"fillBUnitsAuto($event)\"></atpar-ac-server>-->\r\n                                        <atpar-select [options]=\"lstFilteredBUnits\" [id]=\"'ddlOrg'\" [(ngModel)]=\"selectedBunit\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddlBUnitChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Cart ID / Par Location</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"selectedParlocation\" [id]=\"'ParlocationId'\" [name]=\"'ParlocationId'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                        <!--<atpar-select [options]=\"cities\" [id]=\"'ddlcartId'\" [(ngModel)]=\"selectedCity\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>-->\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Display</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstFilteredDisplay\" [id]=\"'ddldisplay'\" [(ngModel)]=\"selectedDisplay\" [ngModelOptions]=\"{standalone: true}\" (onChange)=\"ddlDisplayChanged()\"></atpar-select>\r\n                                        <!--<atpar-select [options]=\"cities\" [id]=\"'ddldisplay'\" [(ngModel)]=\"selectedCity\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>-->\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <button class=\"btn btn-purple sbtn\" (click)=\"getAllocateCarts()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                        <!--<atpar-select [options]=\"cities\" [id]=\"'ddldisplay'\" [(ngModel)]=\"selectedCity\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>-->\r\n                                    </div>\r\n                                </div>\r\n\r\n                            </div>\r\n                            <div class=\"text-center\">\r\n                                <span> Note: Red color cart(s) is/are Orphans</span>\r\n                            </div>\r\n                            <br>\r\n                        </form>\r\n                        <div class=\"col-xs-12 table-responsive\" *ngIf=\"showGrid\">\r\n                            <div class=\"container\">\r\n                                <div>\r\n                                    <span class=\"text-primary\">\r\n                                        {{cartsAllocatedMsg}}\r\n                                    </span>\r\n                                </div>\r\n                                <br>\r\n                                <atpar-datatable [value]=\"lstDBData\" [paginator]=\"true\" [pageLinks]=\"3\" [style]=\"{'width':'100%'}\" [rows]=\"recordsPerPageSize\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20, 30, 40, 50, 60, 70, 80, 90, 100]\" (filteredData)=\"filterdata($event)\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n\r\n                                    <p-headerColumnGroup type=\"header\">\r\n                                        <p-row>\r\n                                            <p-column rowspan=\"3\" [style]=\"{'width':'9%'}\" header=\"Select\">\r\n                                                <template pTemplate=\"filter\" let-col>\r\n                                                    <ul class=\"list-inline li-all-none\">\r\n                                                        <li>\r\n                                                            <span (click)=\"checkAll()\" style=\"cursor:pointer\">All</span>\r\n                                                        </li> |\r\n                                                        <li>\r\n                                                            <span (click)=\"unCheckAll()\" style=\"cursor:pointer\">None</span>\r\n                                                        </li>\r\n                                                    </ul>\r\n                                                </template>\r\n                                            </p-column>\r\n                                            <p-column colspan=\"7\" [style]=\"{'width':'30%', 'text-align':'center'}\" header=\"Day\">\r\n                                            </p-column>\r\n                                            <p-column [style]=\"{'width':'14%', 'text-align':'center'}\" header=\"Time\" rowspan=\"3\">\r\n\r\n                                            </p-column>\r\n                                            <p-column field=\"BUSINESS_UNIT\" header=\"Business Unit / Company\" rowspan=\"3\" sortable=\"custom\" (sortFunction)=\"customSort($event,'BUSINESS_UNIT')\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'12%'}\">\r\n\r\n                                            </p-column>\r\n                                            <p-column field=\"CART_ID\" header=\"Cart ID / Par Location\" rowspan=\"3\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'15%'}\">\r\n\r\n                                            </p-column>\r\n                                            <p-column field=\"DESCR\" header=\"Description\" rowspan=\"3\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'25%'}\">\r\n\r\n                                            </p-column>\r\n\r\n                                            <p-column field=\"USERS\" header=\"User\" rowspan=\"3\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [style]=\"{'width':'14%'}\"> </p-column>\r\n                                            <p-column field=\"CART_COUNT_ORDER\" header=\"Sort Order\" rowspan=\"3\" [style]=\"{'width':'10%'}\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"  >\r\n\r\n                                            </p-column>\r\n\r\n                                        </p-row>\r\n\r\n                                        <p-row>\r\n                                            <p-column field=\"MON\" header=\"Mon\" [style]=\"{'width':'6%', 'text-align':'center'}\">\r\n\r\n                                            </p-column>\r\n                                            <p-column field=\"TUE\" header=\"Tue\" [style]=\"{'width':'6%', 'text-align':'center'}\">\r\n\r\n                                            </p-column>\r\n                                            <p-column field=\"WED\" header=\"Wed\" [style]=\"{'width':'6%', 'text-align':'center'}\">\r\n\r\n                                            </p-column>\r\n                                            <p-column field=\"THU\" header=\"Thr\" [style]=\"{'width':'6%', 'text-align':'center'}\">\r\n\r\n                                            </p-column>\r\n                                            <p-column field=\"FRI\" header=\"Fri\" [style]=\"{'width':'6%', 'text-align':'center'}\">\r\n\r\n                                            </p-column>\r\n                                            <p-column field=\"SAT\" header=\"Sat\" [style]=\"{'width':'6%', 'text-align':'center'}\">\r\n\r\n                                            </p-column>\r\n                                            <p-column field=\"SUN\" header=\"Sun\" [style]=\"{'width':'6%', 'text-align':'center'}\">\r\n\r\n                                            </p-column>\r\n                                        </p-row>\r\n                                    </p-headerColumnGroup>\r\n                                    <p-column>\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <input type=\"checkbox\" class=\"checkbox\" [checked]=\"ven.ALL\"  (click)=\"selectedRow($event,ven)\" style=\"margin-left:40%;\"/>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"MON\">\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <input type=\"checkbox\" value=\"\" [(ngModel)]=\"ven.MON\" name=\"MON\" (click)=\"DaySelected($event,ven,'MON')\" [ngModelOptions]=\"{standalone: true}\" style=\"margin-left:20%;\" />\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"TUE\">\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <input type=\"checkbox\" value=\"\" name=\"TUE\" (click)=\"DaySelected($event,ven,'TUE')\" [(ngModel)]=\"ven.TUE\" [ngModelOptions]=\"{standalone: true}\" style=\"margin-left:20%;\" />\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"WED\">\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <input type=\"checkbox\" value=\"\" (click)=\"DaySelected($event,ven,'WED')\" [(ngModel)]=\"ven.WED\" [ngModelOptions]=\"{standalone: true}\" style=\"margin-left:20%;\" />\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"THU\">\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <input type=\"checkbox\" value=\"\" (click)=\"DaySelected($event,ven,'THU')\" [(ngModel)]=\"ven.THU\" [ngModelOptions]=\"{standalone: true}\" style=\"margin-left:20%;\" />\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"FRI\">\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <input type=\"checkbox\" value=\"\" (click)=\"DaySelected($event,ven,'FRI')\" [(ngModel)]=\"ven.FRI\" [ngModelOptions]=\"{standalone: true}\" style=\"margin-left:20%;\" />\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"SAT\">\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <input type=\"checkbox\" value=\"\" (click)=\"DaySelected($event,ven,'SAT')\" [(ngModel)]=\"ven.SAT\" [ngModelOptions]=\"{standalone: true}\" style=\"margin-left:20%;\" />\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"SUN\">\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <input type=\"checkbox\" value=\"\" (click)=\"DaySelected($event,ven,'SUN')\" [(ngModel)]=\"ven.SUN\" [ngModelOptions]=\"{standalone: true}\" style=\"margin-left:20%;\" />\r\n                                        </template>\r\n                                    </p-column>\r\n\r\n                                    <p-column field=\"\" [style]=\"{'width':'15%'}\">\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <atpar-calendar  name=\"'SCHEDULE_TIME'\"   [timeOnly]=\"true\"  [ngModelOptions]=\"{standalone: true}\"  [hourFormat]=\"'12'\" [(ngModel)]=\"ven.COUNT_BEFORE\"></atpar-calendar >\r\n                                            <!--<atpar-calendar  name=\"'SCHEDULE_TIME'\" (onSelect)=\"TimeChange($event)\" [readonlyInput]=\"true\"  [timeOnly]=\"true\"  [ngModelOptions]=\"{standalone: true}\"  hourFormat=\"12\" [(ngModel)]=\"strStartTime\"></atpar-calendar >-->\r\n                                            <!--<input type=\"time\" class=\"form-control  time-fld without\" placeholder=\"HH:mm:ss\" [(ngModel)]=\"ven.COUNT_BEFORE\" [ngModelOptions]=\"{standalone: true}\" />-->\r\n                                         \r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"BUSINESS_UNIT\">\r\n                                        <template let-col let-car=\"rowData\" pTemplate=\"body\">\r\n                                            <span [style.color]=\"car['CartColor']\">{{car.BUSINESS_UNIT}}</span>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"CART_ID\">\r\n\r\n                                        <template let-col let-car=\"rowData\" pTemplate=\"body\">\r\n                                            <span [style.color]=\"car['CartColor']\">{{car.CART_ID}}</span>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"DESCR\">\r\n                                        <template let-col let-car=\"rowData\" pTemplate=\"body\">\r\n                                            <span [style.color]=\"car['CartColor']\">{{car.DESCR}}</span>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"USERS\"> </p-column>\r\n                                    <p-column field=\"CART_COUNT_ORDER\">\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <atpar-text [(ngModel)]=\"ven.CART_COUNT_ORDER\" [id]=\"ven.ID\" [name]=\"CartCounterId\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'numeric,max=4'\"></atpar-text>\r\n                                        </template>\r\n                                    </p-column>\r\n                                </atpar-datatable>\r\n                            </div>\r\n                            <br>\r\n                            <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"UpdateGridData()\">Submit &nbsp;<i class=\"fa fa-check\"></i></button>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-xs-12\" *ngIf=\"showOnAllocateSelection\">\r\n                            <div class=\"container\">\r\n                                <ul class=\"list-inline well well-sm\">\r\n                                    <li>Copy / </li>\r\n                                    <li>Move / </li>\r\n                                    <li>Delete Carts</li>\r\n                                </ul>\r\n                            </div>\r\n                            <div class=\"form-horizontal form-label-left\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-12 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-5 col-sm-6\">Cart Allocations to UserID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-3\">\r\n                                        <atpar-select [options]=\"lstUsersForCopyMoveDelete\" [id]=\"'ddllstUsersForCopyMoveDelete'\" [required]=\"true\" [(ngModel)]=\"selectedDropDownUserId1\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-4\">\r\n                                        <i class=\"fa fa-files-o fa-2x fa-bg fa-bg-lg bg-blue\" style=\"cursor:pointer\" (click)=\"CopyCarts()\" title=\"Copy\"></i>\r\n                                        <i class=\"fa fa-arrows fa-2x fa-bg fa-bg-lg bg-green\" style=\"cursor:pointer\" (click)=\"MoveCarts()\" title=\"Move\"></i>\r\n                                        <i class=\"fa fa-trash fa-2x fa-bg fa-bg-lg bg-red\" style=\"cursor:pointer\" (click)=\"DeleteCarts()\" title=\"Delete\"></i>\r\n                                    </div>\r\n\r\n                                </div>\r\n                              <!--  <div class=\"col-xs-12 col-sm-12 col-md-3 form-group\">\r\n                                    <i class=\"fa fa-files-o fa-2x fa-bg bg-blue\" style=\"cursor:pointer\" (click)=\"CopyCarts()\" title=\"copy\"></i>\r\n                                    <i class=\"fa fa-arrows fa-2x fa-bg bg-green\" style=\"cursor:pointer\" (click)=\"MoveCarts()\" title=\"move\"></i>\r\n                                    <i class=\"fa fa-trash fa-2x fa-bg bg-red\" style=\"cursor:pointer\" (click)=\"DeleteCarts()\" title=\"delete\"></i>\r\n                                </div>-->\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ }),

/***/ 1933:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>This is CartCount Cart Averages Reports Screen</span>\r\n</div>";

/***/ }),

/***/ 1934:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>This is CartCount Cart Details Report Screen</span>\r\n</div>";

/***/ }),

/***/ 1935:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>This is CartCount Cart Putaway Report Screen</span>\r\n</div>";

/***/ }),

/***/ 1936:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\" *ngIf=\"true\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px;\">\r\n                        <div class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Org Group ID </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"!isShowOrgGroupDD\" class=\"control-label lbl-left\">{{orgGrpId}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" *ngIf=\"isShowOrgGroupDD\" [id]=\"'lstOrgGroups'\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddlOrgGrpIdChanged($event)\" [required]=\"true\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Business Unit / Company</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstBUnits\" [id]=\"'ddlOrglstBUnits'\" [(ngModel)]=\"selectedBUnit\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddlBUnitChanged($event)\" [required]=\"true\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Cart ID / Par Location</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-ac-server [(ngModel)]=\"cartID\" [mandatory]=\"'true'\" [id]=\"'cartID'\" [suggestions]=\"lstFilterCartIDs\" (completeMethod)=\"fillCartIDsAuto($event)\" field=\"name\" [size]=\"30\" [minLength]=\"1\" [ngModelOptions]=\"{standalone: true}\"></atpar-ac-server>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-md-4 col-sm-6 col-sm-offset-5 col-md-offset-5\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"onGoClick()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-xs-12\" *ngIf=\"showGrid\">\r\n                            <div class=\"container\">\r\n                                <ul class=\"list-inline\">\r\n                                    <li class=\"no-padding\">\r\n                                        <strong>Transaction ID : </strong><span class=\"text-primary\"> {{transID}}</span>\r\n                                    </li>\r\n                                    <li class=\"pull-right no-padding\">\r\n                                        <strong>Latest Counts : </strong><span class=\"text-primary\"> </span>\r\n                                    </li>\r\n                                </ul>\r\n                                <!--<div class=\"col-lg-6 col-md-6 col-sm-6 col-xs-12\">\r\n            <p style=\"float:left\"><strong>Transaction ID : </strong><span class=\"text-primary\"> {{transID}}</span></p>\r\n        </div>\r\n        <div class=\"col-lg-6 col-md-6 col-sm-6 col-xs-12\">\r\n            <p style=\"font-weight:bold;float:right\"><strong>Latest Counts : </strong><span class=\"text-primary\"> </span></p>\r\n        </div>-->\r\n\r\n                                \r\n                                    <div class=\"no-scrl\">\r\n                                        <atpar-datatable [value]=\"lstCartItemDetails\" [style]=\"{'width':'100%'}\" scrollable=\"true\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"recordsPerPage\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" resizableColumns=\"true\">\r\n                                            <p-column field=\"ROWINDEX\" header=\"SNO\" sortable=\"custom\" [filter]=\"true\" filterPlaceholder=\"Search\" *ngIf=\"false\"></p-column>\r\n                                            <p-column field=\"\" header=\"*\" *ngIf=\"false\"></p-column>\r\n                                            <p-column field=\"ChkValue\" header=\"ChkValue\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" *ngIf=\"false\" [style]=\"{'width':'30px'}\"></p-column>\r\n                                            <p-column field=\"INV_ITEM_ID\" header=\"Item ID\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'180px'}\"></p-column>\r\n                                            <p-column field=\"CUST_ITEM_ID\" header=\"Custom Item NO\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'160px'}\"> </p-column>\r\n                                            <p-column field=\"COMPARTMENT\" header=\"Compartment\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'150px'}\"> </p-column>\r\n                                            <p-column field=\"ITEM_DESCR\" header=\"Description\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'300px'}\"></p-column>\r\n                                            <p-column field=\"ITEM_PRICE\" header=\"Price ($)\" sortable=\"custom\" (sortFunction)=\"customSort1($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'120px','text-align':'center'}\"> </p-column>\r\n                                            <p-column field=\"INVENTORY_ITEM\" header=\"Item Type\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'120px'}\"> </p-column>\r\n                                            <p-column field=\"OPTIMAL_QTY\" header=\"Par Value\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'120px','text-align':'center'}\"></p-column>\r\n                                            <p-column field=\"UOM\" header=\"UOM\" sortable=\"custom\" (sortFunction)=\"customSort($event)\"  [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'100px'}\"></p-column>\r\n                                            <p-column header=\"Count Qty\" field=\"COUNTQTY\" [style]=\"{'width':'112px'}\" [sortable]=\"true\" >\r\n                                                <template let-cartcount=\"rowData\" pTemplate type=\"body\">\r\n                                                    <atpar-text-grid [(ngModel)]=\"cartcount.COUNTQTY\" [ngModelOptions]=\"{standalone: true}\" [name]=\"cartcount.INV_ITEM_ID\" [validations]=\"cartcount.validationRules\" [id]=\"cartcount.INV_ITEM_ID\"></atpar-text-grid>\r\n                                                    <!--<input type=\"text\" class=\"form-control bdr-purple\" [(ngModel)]=\"cartcount.COUNTQTY\" />-->\r\n                                                </template>\r\n                                            </p-column>\r\n                                            <p-column field=\"DATE_1\" header=\"{{date1Header}}\" *ngIf=\"showDate1Column\" [style]=\"{'width':'120px','text-align':'center'}\"></p-column>\r\n                                            <p-column field=\"DATE_2\" header=\"{{date2Header}}\" *ngIf=\"showDate2Column\" [style]=\"{'width':'120px','text-align':'center'}\"></p-column>\r\n                                            <p-column field=\"DATE_3\" header=\"{{date3Header}}\" *ngIf=\"showDate3Column\" [style]=\"{'width':'120px','text-align':'center'}\"></p-column>\r\n                                            <p-column field=\"DATE_4\" header=\"{{date4Header}}\" *ngIf=\"showDate4Column\" [style]=\"{'width':'120px','text-align':'center'}\"></p-column>\r\n                                            <p-column field=\"DATE_5\" header=\"{{date5Header}}\" *ngIf=\"showDate5Column\" [style]=\"{'width':'120px','text-align':'center'}\"></p-column>\r\n                                            <p-column field=\"ReplnCtrl\" header=\"ReplnCtrl\" *ngIf=\"false\"></p-column>\r\n                                            <p-column field=\"ReplnCtrl\" header=\"ReplnCtrl\" *ngIf=\"false\" [sortable]=\"true\"></p-column>\r\n                                        </atpar-datatable>\r\n                                    </div>\r\n                                \r\n                            </div>\r\n                            <div class=\"clear\"></div>\r\n                            <br>\r\n                            <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"onSubmitClick()\">Submit&nbsp; <i class=\"fa fa-check\"></i></button>\r\n                            </div>\r\n\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <atpar-growl [value]=\"msgs\" sticky=\"sticky\"></atpar-growl>\r\n</div>";

/***/ }),

/***/ 1937:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>This is CartCount Create Requisition Screen</span>\r\n</div>";

/***/ }),

/***/ 1938:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\" *ngIf=\"true\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0;\">\r\n                        <div class=\"col-md-12\">\r\n                            <form class=\"form-horizontal form-label-left\" novalidate>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Org Group ID </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpId1}}</label>\r\n                                        <!--<atpar-text *ngIf=\"blnShowOrgGroupLabel\" [(ngModel)]=\"orgGrpId1\" [name]=\"txtPrinter\" [validations]=\"'except_less_greater_symbols'\" [id]=\"'Printer'\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"true\"></atpar-text>-->\r\n                                        <atpar-select [options]=\"lstOrgGroups\" *ngIf=\"blnShowOrgGroupDD\" [id]=\"'ddllstOrgGroups'\" [ngModelOptions]=\"{standalone: true}\" [required]=\"true\" [filter]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" (onChange)=\"ddlOrgGrpId_SelectChanged()\">\r\n                                        </atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Business Unit/Company</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstFilteredBUnits\" [(ngModel)]=\"selectedBunit\" [required]=\"true\" [ngModelOptions]=\"{standalone: true}\" [id]=\"'ddllstBUnits'\" [filter]=\"true\" (onChange)=\"ddlBUnit_SelectChanged()\">\r\n                                        </atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Cart ID/Par Location</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstFilteredCartIDs\" [ngModelOptions]=\"{standalone: true}\" [required]=\"true\" [(ngModel)]=\"selectedDropDownCartID\" [id]=\"'ddllstCartIDs'\" [filter]=\"true\" (onChange)=\"ddlCart_SelectChanged()\">\r\n                                        </atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                    <button type=\"submit\" class=\"btn btn-purple sbtn\" (click)=\"btnGo_Click()\">Go &nbsp;<i class=\"fa fa-arrow-right\"></i></button>\r\n                                    <!--<button class=\"btn btn-purple sbtn\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>-->\r\n                                </div>\r\n                            </form>\r\n                        </div>\r\n                        <div *ngIf=\"grdHide\">\r\n                            <div class=\"col-xs-12 table-responsive\">\r\n                                <div class=\"container\">\r\n                                    <atpar-datatable [value]=\"BindGrid\" [style]=\"{'width':'100%'}\" [paginator]=\"true\" [pageLinks]=\"3\" \r\n                                                     [rows]=\"recordsPerPageSize\" [globalFilter]=\"gb\" \r\n                                                     [rowsPerPageOptions]=\"[10,20, 30, 40, 50, 60, 70, 80, 90, 100]\" \r\n                                                     [responsive]=\"true\" (filteredData)=\"myfilterdata($event)\">\r\n                                        <p-column [style]=\"{'width':'7%','text-align':'center'}\">\r\n                                            <template pTemplate type=\"header\">\r\n                                                <label style=\"color:#555555;\">Select</label>\r\n                                                <br />\r\n                                                <ul class=\"list-inline li-all-none\">\r\n                                                    <li>\r\n                                                        <span (click)=\"checkAll()\" style=\"cursor:pointer\">All</span>\r\n                                                    </li> |\r\n                                                    <li>\r\n                                                        <span (click)=\"unCheckAll()\" style=\"cursor:pointer\">None</span>\r\n                                                    </li>\r\n                                                </ul>\r\n                                                <br />\r\n\r\n                                            </template>\r\n                                            <template let-cart=\"rowData\" pTemplate type=\"body\">\r\n\r\n                                                <atpar-switch [checked]=\"cart.checkvalue\" [(ngModel)]=\"cart.checkvalue\" (click)=\"selectedRow(cart,$event)\">{{cart.checkvalue}}</atpar-switch>\r\n                                            </template>\r\n                                        </p-column>\r\n                                        <p-column field=\"INV_ITEM_ID\" header=\"Item ID\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'17%'}\"> </p-column>\r\n                                        <p-column field=\"CUST_ITEM_ID\" header=\"Custom Item No\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'14%'}\"> </p-column>\r\n                                        <p-column field=\"ITEM_DESCR\" header=\"Description\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'33%'}\"> </p-column>\r\n                                        <p-column field=\"OPTIMAL_QTY\" header=\"Par Value\" sortable=\"custom\" (sortFunction)=\"customSort1($event,FLOAT)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'7%','text-align':'right'}\"> </p-column>\r\n                                        <p-column field=\"CART_REPLEN_OPT\" header=\"Item Type\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'9%'}\"> </p-column>\r\n                                        <p-column field=\"ITEM_PRICE\" header=\"Price($)\" sortable=\"custom\" (sortFunction)=\"customSort1($event,'FLOAT')\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'6%','text-align':'right'}\"> </p-column>\r\n\r\n                                    </atpar-datatable>\r\n                                </div>\r\n                                <br>\r\n                                <div class=\"col-xs-12 col-md-4 col-md-offset-5 col-sm-6 col-sm-offset-5\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"btnSubmit_Click()\">Submit &nbsp;<i class=\"fa fa-check\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n";

/***/ }),

/***/ 1939:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>This is CartCount Daily Activity Screen</span>\r\n</div>";

/***/ }),

/***/ 1940:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>This is CartCount Daily User Activity Screen</span>\r\n</div>";

/***/ }),

/***/ 1941:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>this is cartcount item exception report screen.</span>\r\n</div>";

/***/ }),

/***/ 1942:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px 0px 10px 0px;\">\r\n                        <div class=\"col-xs-12\" *ngIf=\"tdExports\">\r\n                            <br />\r\n                            <div class=\"pull-right\" id=\"tdExports\">\r\n                                <ul class=\"list-inline\">\r\n                                    <li class=\"no-padding\">\r\n                                        <i class=\"fa fa-envelope-o fa-bg-lg bg-blue\" aria-hidden=\"true\" style=\"cursor:pointer\" id=\"imgMail\" title=\"Send mail\" (click)=\"onSendMailIconClick($event)\"></i>&nbsp;\r\n                                    </li>\r\n                                    <li class=\"no-padding\">\r\n                                        <i class=\"fa fa-print fa-bg-lg bg-blue\" aria-hidden=\"true\" style=\"cursor:pointer\" id=\"imgPrint\" title=\"Print\" (click)=\"onPrintClick($event)\"></i>&nbsp;\r\n                                    </li>\r\n                                    <li class=\"no-padding\">\r\n                                        <i class=\"fa fa-file-excel-o fa-bg-lg bg-blue\" aria-hidden=\"true\" style=\"cursor:pointer\" id=\"imgExcel\" title=\"Excel Format\" (click)=\"onExportToExcelClick($event)\"></i>&nbsp;\r\n                                    </li>\r\n                                </ul>\r\n                            </div>\r\n                        </div>                        \r\n                        <form class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Org Group ID </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpId}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupDD\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Business Unit / Company</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstFilteredBUnits\" [id]=\"'ddlOrg'\" [(ngModel)]=\"selectedBunit\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Cart ID / Par Location</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"selectedParlocation\" [id]=\"'ParlocationId'\" [name]=\"'ParlocationId'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-xs-12\">                               \r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Item ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"selectedItemId\" [id]=\"'ItemId'\" [name]=\"'ItemId'\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'mandatory,alpha_numeric_dot_underscore_nospace'\"></atpar-text>\r\n                                        <!--<atpar-ac-server [(ngModel)]=\"selectedItemId\" [ngModelOptions]=\"{standalone: true}\" [suggestions]=\"lstItemIds\" [mandatory]=\"'true'\" [id]=\"'ItemId'\" (completeMethod)=\"fillItemIdsAuto($event)\"></atpar-ac-server>-->\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">From Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <p-calendar [showIcon]=\"true\" [id]=\"'fromDate'\" [(ngModel)]=\"fromDate\" [placeholder]=\"'From Date'\" [dateFormat]=\"'mm/dd/yy'\" [required]=\"true\" [readonlyInput]=\"true\" [ngModelOptions]=\"{standalone: true}\" [monthNavigator]=\"true\"  [yearNavigator]=\"true\"  yearRange=\"1950:2050\"></p-calendar>\r\n                                        <!--<p-calendar [showIcon]=\"true\" [id]=\"'FromDatePicker'\" [(ngModel)]=\"fromDate\" [required]=\"true\" [placeholder]=\"'From Date'\" [readonlyInput]=\"true\" (onFocus)=\"onfocusFromCalendar($event)\" [ngModelOptions]=\"{standalone: true}\" [dateFormat]=\"'mm/dd/yy'\"></p-calendar>-->\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">To Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <p-calendar [showIcon]=\"true\" [id]=\"'toDate'\" [(ngModel)]=\"toDate\" [placeholder]=\"'To Date'\" [dateFormat]=\"'mm/dd/yy'\" [required]=\"true\" [readonlyInput]=\"true\" [ngModelOptions]=\"{standalone: true}\" [monthNavigator]=\"true\"  [yearNavigator]=\"true\"  yearRange=\"1950:2050\"></p-calendar>\r\n\r\n                                        <!--<p-calendar [showIcon]=\"true\" [id]=\"'ToDatePicker'\" [(ngModel)]=\"toDate\" [required]=\"true\" [placeholder]=\"'To Date'\" [readonlyInput]=\"true\" (onFocus)=\"onfocusToCalendar($event)\" [ngModelOptions]=\"{standalone: true}\" [dateFormat]=\"'mm/dd/yy'\"></p-calendar>-->\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"clear\"></div>                             \r\n                            <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">                                   \r\n                              <button class=\"btn btn-purple sbtn\" (click)=\"bindGrid()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>                               \r\n                            </div>                            \r\n                            <br/>\r\n                        </form>\r\n                        <div class=\"clear\"></div>\r\n                        <div class=\"col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-5\">\r\n                            <span style=\"text-align:center!important\">Note: Report is based on count exceptions </span>\r\n                        </div>\r\n                        <div *ngIf=\"showGrid\" class=\"col-xs-12 \">\r\n                            <div class=\"container\">\r\n                            <span class=\"text-primary\" style=\"float:left\">\r\n                                <strong>Item ID </strong>{{lstDBTableData[0].ITEM_ID}}\r\n                            </span>\r\n                            <span class=\"text-primary\" style=\"float:right\">\r\n                                <strong>Custom Item NO </strong>{{CustItemId}}\r\n                            </span>\r\n                            <br />\r\n                            <!--<div style=\"width:50%;margin-top:11%;margin-left:24%;\">\r\n                                <span style=\"margin-left: 50%;\">Physician Usage</span>\r\n                                <atpar-chart type=\"bar\" [id]=\"'ChartId'\" [data]=\"data1\" [options]=\"option\" [width]=\"40\" [height]=\"40\"></atpar-chart>\r\n                            </div>-->\r\n                            <br />\r\n                                <div class=\"clear\"></div>\r\n                            <div class=\"table-responsive\">\r\n                                <div class=\"\">\r\n                                    <atpar-datatable [value]=\"lstDBTableData\"  [style]=\"{'width':'100%'}\"  expandableRows=\"true\"  [globalFilter]=\"gb\" [responsive]=\"true\">\r\n                                        <p-column>\r\n                                            <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                                <table style=\"border:none\">\r\n                                                    <tr style=\"border:solid 1px\">\r\n                                                        <td>BusinessUnit</td>\r\n                                                        <td><b>{{ven.BUSINESS_UNIT}}</b></td>\r\n                                                        <td>CartID/Par Location</td>\r\n                                                        <td><b>{{ven.CART_ID}}</b></td>\r\n                                                    </tr>\r\n                                                    <tr style=\"border:solid 1px\">\r\n                                                       \r\n                                                        <td colspan=\"3\">\r\n                                                            <atpar-chart type=\"line\" [id]=\"'ChartId'\" [data]=\"data\"></atpar-chart>\r\n                                                        </td>\r\n                                                    \r\n                                                        <td valign=\"top\">\r\n                                                            <table>\r\n\r\n                                                                <tr>\r\n                                                                    <td>\r\n                                                                        Date\r\n                                                                    </td>\r\n                                                                    <td>\r\n                                                                        Par Qty\r\n                                                                    </td>\r\n                                                                    <td>\r\n                                                                        Used Qty\r\n                                                                    </td>\r\n                                                                </tr>\r\n                                                                <tr *ngFor=\"let item of lstDBData\">\r\n                                                                    <td *ngIf=\"ven.CART_ID==item.CART_ID\">\r\n                                                                        {{item.COUNTDATEFORINSIDETABLE}}\r\n                                                                    </td>\r\n                                                                    <td *ngIf=\"ven.CART_ID==item.CART_ID\">\r\n                                                                        {{item.PAR_QTY}}\r\n                                                                    </td>\r\n                                                                    <td *ngIf=\"ven.CART_ID==item.CART_ID\">\r\n                                                                        {{item.ORDER_QTY}}\r\n                                                                    </td>\r\n                                                                </tr>\r\n\r\n                                                            </table>\r\n                                                        </td>\r\n                                                    </tr>\r\n                                                    <tr style=\"border:solid 1px\">\r\n                                                        <td>\r\n\r\n                                                        </td>\r\n                                                        <td>\r\n                                                            Qty\r\n                                                        </td>\r\n                                                        <td>\r\n                                                            Item Description\r\n                                                        </td>\r\n                                                        <td>\r\n                                                            Date\r\n                                                        </td>\r\n                                                    </tr>\r\n                                                    <tr style=\"border:solid 1px\">\r\n                                                        <td>\r\n                                                            Min Item Usage\r\n                                                        </td>\r\n                                                        <td>\r\n                                                           <strong>\r\n                                                               {{ven.MIN_USAGE}}\r\n                                                            </strong> \r\n                                                        </td>\r\n                                                        <td>\r\n                                                           <strong>{{ven.ITEM_DESC}}</strong> \r\n                                                        </td>\r\n                                                        <td>\r\n                                                           <strong> {{ven.UPDATE_DATE}}</strong> \r\n                                                        </td>\r\n                                                    </tr>\r\n                                                    <tr style=\"border:solid 1px\">\r\n                                                        <td>\r\n                                                            Max  Item Usage\r\n                                                        </td>\r\n                                                        <td>\r\n                                                           <strong>\r\n                                                               {{ven.MAX_USAGE}}\r\n                                                            </strong> \r\n                                                        </td>\r\n                                                        <td>\r\n                                                           <strong>{{ven.ITEM_DESC}}</strong> \r\n                                                        </td>\r\n                                                        <td>\r\n                                                            <strong>{{ven.UPDATE_DATE}}</strong>  \r\n                                                        </td>\r\n                                                    </tr>\r\n                                                    <tr style=\"border:solid 1px\">\r\n                                                        <td>\r\n                                                            Average Item Usage \r\n                                                        </td>\r\n                                                        <td>\r\n                                                            <strong>{{ven.AVG_USAGE}} Per Day</strong> \r\n                                                            \r\n                                                        </td>\r\n                                                        <td>\r\n\r\n                                                        </td>\r\n                                                        <td>\r\n\r\n                                                        </td>\r\n                                                        \r\n                                                    </tr>\r\n                                                </table>\r\n                                            </template>\r\n                                        </p-column>\r\n                                    </atpar-datatable>\r\n                                </div>\r\n                                <br />\r\n                            </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<mail-dialog header=\"Enter Recipient`s Email Address\" [width]=\"450\" (onClose)=\"closeMailPopup()\" [(visible)]=\"isMailDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\r\n    <div class=\"ui-grid ui-grid-responsive ui-fluid\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                <span>To : </span>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-8 col-xs-8\">\r\n                <atpar-text [(ngModel)]=\"toMailAddr\" [name]=\"txtToMailAddr\" [id]=\"'txtToMailAddr'\"></atpar-text>\r\n            </div>\r\n            <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                <span><button class=\"btn btn-purple sbtn\" (click)=\"onSendMailClick()\">Send &nbsp;<i class=\"fa fa-share-square-o\" aria-hidden=\"true\"></i></button> </span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</mail-dialog>\r\n<style>\r\n    .modal-content {\r\n        top: 50% !important;\r\n    }\r\n\r\n    ul.right-images li img {\r\n        width: 60px !important;\r\n        cursor: pointer;\r\n    }\r\n</style>";

/***/ }),

/***/ 1943:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <atpar-manageorders [appId]=\"cartCountAppId\"></atpar-manageorders>\r\n\r\n</div>";

/***/ }),

/***/ 1944:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <manage-par-location [appId]=\"cartAppId\"></manage-par-location>\r\n</div>";

/***/ }),

/***/ 1945:
/***/ (function(module, exports) {

module.exports = "\r\n<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px 0 10px 0;\">\r\n                        <form class=\"form-horizontal form-label-left\" *ngIf=\"page\" novalidate>\r\n                            <div class=\"col-xs-12\">\r\n                                <br />\r\n                                <div class=\"pull-right\" id=\"tdExports\" *ngIf=\"tdExports\">\r\n                                    <ul class=\"list-inline\">\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-envelope-o fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgMail\" title=\"Send mail\" style=\"cursor:pointer;\" (click)=\"onSendMailIconClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-print fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgPrint\" title=\"Print\" style=\"cursor:pointer;\" (click)=\"onPrintClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-file-excel-o fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgExcel\" style=\"cursor:pointer;\" title=\"Excel Format\" (click)=\"onExportToExcelClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                    </ul>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Org Group ID </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpIDData}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupsDropdown\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Business Unit / Company</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstFilteredBUnits\" [id]=\"'ddllstBunit'\" [required]=\"true\" [(ngModel)]=\"selectedBunit\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddl_ChangeBunitChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Dept ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"selectedDeptId\" [name]=\"txtDeptId\" [id]=\"'txtDeptId'\" [validations]=\"'mandatory'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Cart ID / Par Location</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">   \r\n                                        <atpar-ac-server [(ngModel)]=\"selectedCartId\" [id]=\"'txtSelectedCartId'\" [ngModelOptions]=\"{standalone: true}\" [mandatory]=\"'true'\" [suggestions]=\"lstFilteredCartIds\" (completeMethod)=\"fillCartIdsAuto($event)\"></atpar-ac-server>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-4\">From Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <p-calendar [showIcon]=\"true\" [id]=\"'FromDatePicker'\" [(ngModel)]=\"fromDate\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1950:2050\" [placeholder]=\"'From Date'\" [dateFormat]=\"'mm/dd/yy'\" [readonlyInput]=\"true\" [required]=\"true\" [ngModelOptions]=\"{standalone: true}\"></p-calendar>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-4\">To Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <p-calendar [showIcon]=\"true\" [id]=\"'ToDatePicker'\" [(ngModel)]=\"toDate\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1950:2050\" [placeholder]=\"'To Date'\" [readonlyInput]=\"true\" [dateFormat]=\"'mm/dd/yy'\" [ngModelOptions]=\"{standalone: true}\" [required]=\"true\"></p-calendar>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Count Frequency</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstCountFrequency\" [id]=\"'ddllstCountFrequency'\" [(ngModel)]=\"selectedCouontFrequency\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"CountFreqChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4  form-group\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"btnGo_Click()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                                <div style=\"clear:both\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4  form-group\">\r\n                                    <span class=\"text-danger mandatory\">*</span>\r\n                                    <span>Cart ID/Par Location or Dept ID is Mandatory</span>\r\n                                    <br />\r\n                                    <span class=\"text-danger mandatory\">*</span>\r\n                                    <strong><span>Note : </span></strong>\r\n                                    <span class=\"text-primary\">Search data is case sensitive</span>\r\n                                </div>                            \r\n                           </div>  \r\n                        </form>\r\n\r\n                        <br />\r\n\r\n                        <div class=\"col-xs-12 table-responsive\" *ngIf=\"isVisible\">\r\n                            <div class=\"container no-scrl\">\r\n                                <span class=\"pull-left\" *ngIf=\"isLblVisible\">Cart Optimization Report between {{lblFromDate}} and {{lblToDate}}</span>\r\n                                <br />\r\n                                <span class=\"pull-left\" *ngIf=\"isLblBunitVisible\">{{lblBunitCart}}</span>\r\n                                <br />\r\n                                <atpar-datatable [value]=\"lstDBData\"  \r\n                                                 [paginator]=\"false\"                                                 \r\n                                                  expandableRows=\"true\" \r\n                                                  [responsive]=\"true\"                                                 \r\n                                                 (filteredData)=\"onChargesFilterData($event)\"\r\n                                                 [style]=\"{'width':'100%'}\"\r\n                                                 scrollable=\"true\">                                   \r\n                                    <p-footerColumnGroup>\r\n                                        <p-row >                                         \r\n                                            <p-column footer=\"\"></p-column>\r\n                                            <p-column footer=\"Current Value($)\" styleClass=\"text-right\" colspan=\"2\"></p-column>\r\n                                            <p-column footer={{lblCurrentval}} styleClass=\"text-right\"></p-column>\r\n                                            <p-column footer=\"\"></p-column>\r\n                                            <p-column footer=\"Recommended Value($)\" styleClass=\"text-right\" colspan=\"2\"></p-column>\r\n                                            <p-column footer={{lblRecommendedVal}} styleClass=\"text-right\"></p-column>\r\n                                            <p-column footer=\"\" ></p-column>\r\n                                            <p-column footer=\"\"></p-column>\r\n                                            <p-column footer=\"Net reduction($)\" styleClass=\"text-right\" colspan=\"2\"></p-column>\r\n                                            <p-column footer={{lblNetReductionVal}} styleClass=\"text-right\"></p-column>\r\n                                            <p-column footer=\"\" ></p-column>\r\n                                            <p-column footer=\"\" ></p-column>                                                                                \r\n                                        </p-row>\r\n                                    </p-footerColumnGroup>\r\n                                    <p-column [style]=\"{'width':'80px', 'text-align':'center'}\" header=\"Select\" *ngIf=\"isVisibleChkBox\">\r\n                                        <template pTemplate=\"filter\" let-col>\r\n                                            <ul class=\"list-inline li-all-none\">\r\n                                                <li>\r\n                                                    <span (click)=\"checkAll()\" style=\"cursor:pointer\">All</span>\r\n                                                </li> |\r\n                                                <li>\r\n                                                    <span (click)=\"unCheckAll()\" style=\"cursor:pointer\">None</span>\r\n\r\n                                                </li>\r\n                                            </ul>\r\n                                        </template>\r\n                                        <template let-ven=\"rowData\" pTemplate type=\"body\">\r\n                                            <atpar-switch [(ngModel)]=\"ven.checkvalue\" (change)=\"selectedRow(ven,$event)\"></atpar-switch>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"ITEM_ID\" header=\"Item ID\" [filter]=\"true\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" filterPlaceholder=\"Search\" [style]=\"{'width':'140px'}\"></p-column>\r\n                                    <p-column field=\"CUST_ITEM_ID\" header=\"Custom Item NO\" sortable=\"custom\" [filter]=\"true\" (sortFunction)=\"customSort($event)\" filterPlaceholder=\"Search\" [style]=\"{'width':'140px'}\"></p-column>\r\n                                    <p-column field=\"DESCR\" header=\"Description\" sortable=\"custom\" [filter]=\"true\" (sortFunction)=\"customSort($event)\" filterPlaceholder=\"Search\" [style]=\"{'width':'155px'}\"></p-column>\r\n                                    <p-column field=\"COMPARTMENT\" header=\"Compartment\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'100px'}\"></p-column>\r\n                                    <p-column field=\"PRICE\" header=\"Price($)\" sortable=\"custom\" [filter]=\"true\" (sortFunction)=\"customSort($event)\" filterPlaceholder=\"Search\" styleClass=\"text-right\" [style]=\"{'width':'90px'}\"></p-column>\r\n                                    <p-column field=\"PAR_QTY\" header=\"Par Qty\" sortable=\"custom\" [filter]=\"true\" (sortFunction)=\"customSort($event)\" styleClass=\"text-right\" [style]=\"{'width':'90px'}\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"UOM\" header=\"UOM\" sortable=\"custom\" [filter]=\"true\" (sortFunction)=\"customSort($event)\" filterPlaceholder=\"Search\" [style]=\"{'width':'70px'}\"></p-column>\r\n                                    <p-column field=\"MAX_USAGE\" header=\"Max Usage\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" styleClass=\"text-right\"  [style]=\"{'width':'85px'}\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"MIN_USAGE\" header=\"Min Usage\" sortable=\"custom\" (sortFunction)=\"customSort($event)\"  styleClass=\"text-right\" [style]=\"{'width':'85px'}\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"AVG_USAGE\" header=\"Avg Usage\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" styleClass=\"text-right\" [style]=\"{'width':'85px'}\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"TOTAL_USAGE\" header=\"Total Usage\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" styleClass=\"text-right\" [style]=\"{'width':'90px'}\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"OrderQty\" header=\"OrderQty\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" styleClass=\"text-right\" [filter]=\"true\" [style]=\"{'width':'85px'}\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"RECOMMENDED_PAR\" header=\"Reco. par / day * count freq.\" (sortFunction)=\"customSort($event)\" styleClass=\"text-right\" sortable=\"custom\" [style]=\"{'width':'173px'}\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"RECOMMENDED_PAR_QTY\"  [style]=\"{'width':'90px'}\" *ngIf=\"isVisibleEdiTxt\">\r\n                                        <template let-ven=\"rowData\" pTemplate type=\"body\">\r\n                                            <atpar-text-grid [id]=\"ven.Sno\"\r\n                                                              [name]=\"txtRecommendedPar\"\r\n                                                              [(ngModel)]=\"ven.RECOMMENDED_PAR_QTY\" \r\n                                                              [validations]=\"'numeric,max=15'\"\r\n                                                              [ngModelOptions]=\"{standalone: true}\"></atpar-text-grid>\r\n\r\n                                        </template>\r\n                                    </p-column>\r\n                                </atpar-datatable>\r\n                            </div>\r\n                        </div>\r\n                        <div style=\"clear:both\"></div>\r\n                        <br />\r\n                        <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\" *ngIf=\"isVisibleBtnUpdate\">\r\n                            <button class=\"btn btn-purple sbtn\" (click)=\"btnUpdate_Click()\">Update &nbsp;<i class=\"fa fa-check\"></i></button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n<mail-dialog header=\"Enter Recipient`s Email Address\" [width]=\"450\" (onClose)=\"closeMailPopup()\" [(visible)]=\"isMailDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\r\n    <div class=\"ui-grid ui-grid-responsive ui-fluid\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                <span>To : </span>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-8 col-xs-8\">\r\n                <atpar-text [(ngModel)]=\"toMailAddr\"  [name]=\"txtToMailAddr\" [id]=\"'txtToMailAddr'\"></atpar-text>\r\n            </div>\r\n            <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                <span><button class=\"btn btn-purple sbtn\" (click)=\"onSendMailClick()\">Send &nbsp;<i class=\"fa fa-share-square-o\" aria-hidden=\"true\"></i></button> </span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</mail-dialog>\r\n<style>   \r\n    .modal-content {\r\n            top: 50% !important;\r\n        }\r\n</style>";

/***/ }),

/***/ 1946:
/***/ (function(module, exports) {

module.exports = "\r\n<div id=\"main\" class=\"content-page\">   \r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px 0 10px 0;\">\r\n                        <form class=\"form-horizontal form-label-left\" novalidate>                           \r\n                            <div class=\"col-xs-12\">\r\n                                <br />\r\n                                <div class=\"pull-right\" id=\"tdExports\" *ngIf=\"tdExports\">\r\n                                    <ul class=\"list-inline\">\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-envelope-o fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgMail\" title=\"Send mail\" style=\"cursor:pointer;\" (click)=\"onSendMailIconClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-print fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgPrint\" title=\"Print\" style=\"cursor:pointer;\" (click)=\"onPrintClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-file-excel-o fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgExcel\" title=\"Excel Format\" style=\"cursor:pointer;\" (click)=\"onExportToExcelClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                    </ul>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Org Group ID </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpIDData}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupsDropdown\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Business Unit / Company</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstFilteredBUnits\" [id]=\"'ddllstBunit'\" [required]=\"true\" [(ngModel)]=\"selectedBunit\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddl_ChangeBunitChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>                                \r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Cart ID / Par Location</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-ac-server [(ngModel)]=\"selectedCartId\" [id]=\"'txtCartId'\" [mandatory]=\"true\" [ngModelOptions]=\"{standalone: true}\"  [suggestions]=\"lstFilteredCartIds\" (completeMethod)=\"fillCartIdsAuto($event)\"></atpar-ac-server>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"btnGo_Click()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>                                  \r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n\r\n                        <br />\r\n                        <div class=\"col-xs-12\" *ngIf=\"isLblVisible\" >\r\n                            <div class=\"container\">\r\n                                <span class=\"pull-right\">Latest Counts</span>\r\n                            </div>\r\n                        </div>\r\n                        <br/>\r\n                        <div class=\"col-xs-12 table-responsive\" *ngIf=\"isVisible\">\r\n                            <div class=\"container no-scrl\">                                                              \r\n                                <atpar-datatable [value]=\"lstDBData\" [paginator]=\"false\"  expandableRows=\"true\" [globalFilter]=\"gb\"  [responsive]=\"true\" [scrollable]=\"true\">\r\n                                    <p-column field=\"ITEM_ID\" header=\"Item ID\" [filter]=\"true\" [sortable]=\"true\"  filterPlaceholder=\"Search\" [style]=\"{'width':'140px'}\"></p-column>\r\n                                    <p-column field=\"CUST_ITEM_ID\" header=\"Custom Item NO\" [sortable]=\"true\" [filter]=\"true\"  filterPlaceholder=\"Search\" [style]=\"{'width':'140px'}\"></p-column>\r\n                                    <p-column field=\"COMPARTMENT\" header=\"Compartment\" [sortable]=\"true\" [filter]=\"true\"  filterPlaceholder=\"Search\" [style]=\"{'width':'110px'}\"></p-column>\r\n                                    <p-column field=\"DESCR\" header=\"Description\" [sortable]=\"true\"  [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'155px'}\" ></p-column>\r\n                                    <p-column field=\"PRICE\" header=\"Price($)\" styleClass=\"text-right\" [sortable]=\"true\" [filter]=\"true\"  filterPlaceholder=\"Search\" [style]=\"{'width':'90px'}\"></p-column>\r\n                                    <p-column field=\"PAR_QTY\" header=\"ParValue\" styleClass=\"text-right\" [sortable]=\"true\" [filter]=\"true\"  filterPlaceholder=\"Search\" [style]=\"{'width':'90px'}\"></p-column>\r\n                                    <p-column field=\"ITEM_TYPE\" header=\"ItemType\" [sortable]=\"true\" [filter]=\"true\"  filterPlaceholder=\"Search\" [style]=\"{'width':'80px'}\"></p-column>\r\n                                    <p-column field=\"UOM\" header=\"UOM\" [sortable]=\"true\"  [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'70px'}\"></p-column>\r\n                                    <p-column field=\"DATE_1\" header={{dynamicColumns[0]}} *ngIf=\"showColumn1\" [sortable]=\"true\"  [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'text-align':'center','width':'194px'}\"></p-column>\r\n                                    <p-column field=\"DATE_2\" header={{dynamicColumns[1]}} *ngIf=\"showColumn2\" [sortable]=\"true\"  [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'text-align':'center','width':'194px'}\"></p-column>\r\n                                    <p-column field=\"DATE_3\" header={{dynamicColumns[2]}} *ngIf=\"showColumn3\" [sortable]=\"true\"  [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'text-align':'center','width':'194px'}\"></p-column>\r\n                                    <p-column field=\"DATE_4\" header={{dynamicColumns[3]}} *ngIf=\"showColumn4\" [sortable]=\"true\"  [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'text-align':'center','width':'194px'}\"></p-column>\r\n                                    <p-column field=\"DATE_5\" header={{dynamicColumns[4]}} *ngIf=\"showColumn5\" [sortable]=\"true\"  [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'text-align':'center','width':'194px'}\"></p-column>\r\n                                 </atpar-datatable>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n<mail-dialog header=\"Enter Recipient`s Email Address\" [width]=\"450\" (onClose)=\"closeMailPopup()\" [(visible)]=\"isMailDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\r\n    <div class=\"ui-grid ui-grid-responsive ui-fluid\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                <span>To : </span>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-8 col-xs-8\">\r\n                <atpar-text [(ngModel)]=\"toMailAddr\"  [name]=\"txtToMailAddr\" [id]=\"'txtToMailAddr'\"></atpar-text>\r\n            </div>\r\n            <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                <span><button class=\"btn btn-purple sbtn\" (click)=\"onSendMailClick()\">Send &nbsp;<i class=\"fa fa-share-square-o\" aria-hidden=\"true\"></i></button> </span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</mail-dialog>\r\n\r\n<style>\r\n        .modal-content {\r\n            top: 50% !important;\r\n        }\r\n</style>\r\n";

/***/ }),

/***/ 1947:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>This is CartCount Par Audit report Screen</span>\r\n</div>";

/***/ }),

/***/ 1948:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">  \r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"col-xs-12 col-sm-12 col-md-12\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px;\">\r\n                        <div class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Org Group ID </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{lblOrgGroupId}}</label>\r\n\r\n                                        <atpar-select [options]=\"lstOrgGroupData\" [id]=\"'lstOrgGroupData'\" [required]=\"true\"\r\n                                                      [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\"\r\n                                                      filter=\"filter\" *ngIf=\"ddlShowOrgGroupDD\" (onChange)=\"ddlOrgGrpIdChanged($event)\" [name]=\"ddllstOrgGroups\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Org ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"ddlBusinessData\" filter=\"filter\" [id]=\"'ddllstBusinessData'\" [(ngModel)]=\"businessDatangModel\" (onChange)=\"ddlBUnitChanged($event)\"\r\n                                                      [style]=\"{'width':'100%'}\" [name]=\"businessData\" [required]=\"true\">\r\n                                        </atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Par Location</label>\r\n\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-ac-server [(ngModel)]=\"autoCompleteCartID\"\r\n                                                         [suggestions]=\"CartIdSearchLst\" name=\"CartIdSearchLst\"\r\n                                                         (completeMethod)=\"searchAutoCompleteCartIdName($event)\"></atpar-ac-server>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"btnGo_Click()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-xs-12\" *ngIf=\"showGrid\">\r\n                            <div class=\"container\">\r\n                             <atpar-datatable [value]=\"lstGridData\" #dt [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"pageSize\" (onSort)=\"onSort($event)\" (filteredData)=\"filterdata($event)\" [rowsPerPageOptions]=\"rowPageOptions\" [responsive]=\"true\">\r\n                                <p-column header=\"Select\" field=\"ASSIGN_CART\" [style]=\"{'width':'10%','text-align':'center'}\">\r\n                                    <template pTemplate=\"filter\">\r\n                                        <ul class=\"list-inline li-all-none\">\r\n                                            <li>\r\n                                                <span (click)=\"checkAll()\" style=\"cursor:pointer\">All</span>\r\n                                            </li> |\r\n                                            <li>\r\n                                                <span (click)=\"unCheckAll()\" style=\"cursor:pointer\">None</span>\r\n                                            </li>\r\n                                        </ul>\r\n                                    </template>\r\n                                    <template let-col let-cartdata=\"rowData\" pTemplate=\"body\">\r\n\r\n                                        <atpar-switch [checked]=cartdata[col.field] [(ngModel)]=\"cartdata[col.field]\" name=\"changeStatus\" (click)=\"changeStatus(cartdata)\"></atpar-switch>\r\n\r\n                                    </template>\r\n                                </p-column>\r\n\r\n                                <p-column header=\"Par Location\" field=\"CART_ID\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\">\r\n                                </p-column>\r\n\r\n\r\n                                <p-column header=\"Inventory Schedule\" field=\"SCHEDULER\" [style]=\"{'overflow':'visible'}\">\r\n                                    <template let-col let-cartProcessData=\"rowData\" pTemplate=\"body\">\r\n                                        <atpar-select-grid [options]=\"ddlSchedId\" [id]=\"'ddlSchedId'\" name=\"ddlSchedId\"\r\n                                                      [(ngModel)]=\"cartProcessData[col.field]\"\r\n                                                      [SelectedLabel]=cartProcessData[col.field]></atpar-select-grid>\r\n                                    </template>\r\n                                </p-column>\r\n                            </atpar-datatable>\r\n                            </div>\r\n                            <br>\r\n                            <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"btnSubmit_Click()\"> Submit &nbsp;<i class=\"fa fa-check\"></i></button>\r\n\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<atpar-growl [value]=\"growlMessage\" sticky=“sticky”></atpar-growl>";

/***/ }),

/***/ 1949:
/***/ (function(module, exports) {

module.exports = "<style>\r\n    .clrRed {\r\n        color: red;\r\n        background: red;\r\n    }\r\n\r\n    .clrGreen {\r\n        color: green;\r\n        background: green;\r\n    }\r\n\r\n    .clrGray {\r\n        background: gray;\r\n        color: gray;\r\n    }\r\n\r\n    a:hover {\r\n        color: cornflowerblue !important;\r\n    }\r\n    .ui-datatable table tbody > .ui-widget-content {\r\n      border: 1px solid red !important;\r\n}\r\n</style>\r\n<div id=\"main\" class=\"content-page\">\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br />\r\n            <div class=\"col-xs-12 col-sm-12 col-md-12\">\r\n                <div class=\"panel panel-default\" style=\"border:1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px 0px 10px 0px;\">\r\n                        <form class=\"form-horizontal form-label-left\" novalidate>\r\n                            <div class=\"col-xs-12\">\r\n                                <br />\r\n                                <div class=\"pull-right\" id=\"tdExports\" *ngIf=\"tdExports\">\r\n                                    <ul class=\"list-inline\">\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-envelope-o fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgMail\" title=\"Send Mail\" style=\"cursor:pointer;\" (click)=\"onSendMailIconClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-print fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgPrint\" title=\"Print\" style=\"cursor:pointer;\" (click)=\"onPrintClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-file-excel-o fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgExcel\" title=\"Excel Format\" style=\"cursor:pointer;\" (click)=\"onExportToExcelClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                    </ul>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-xs-12\">\r\n\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Org Group ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"blnShowOrgGroupIdLabel\" class=\"control-label lbl-left\">{{orgGrpIdData}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddlLstOrgGroupId'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupIdDropDown\" (onChange)=\"ddlOrgGroupChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">User ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstUsers\" [id]=\"'ddllstUsers'\" [required]=\"true\" [(ngModel)]=\"selectedDropDownUserId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-4\">Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <p-calendar [showIcon]=\"true\" [id]=\"'DatePicker'\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2100\" [(ngModel)]=\"ondate\" [placeholder]=\"'Date'\" [dateFormat]=\"'mm/dd/yy'\" [required]=\"true\" [ngModelOptions]=\"{standalone: true}\"></p-calendar>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 col-md-offset-5\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"goClick()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n\r\n                            </div>\r\n                            <div style=\"clear:both;\"></div>\r\n                            <div class=\"col-xs-12 table-responsive\" *ngIf=\"showGrid\">\r\n                                <div class=\"container\">\r\n                                    <span class=\"pull-left\" *ngIf=\"isLblVisible\">Schedule Compliance Report for {{ondate| date:'EEEE'}} {{ondate|date: 'dd/MM/yyyy'}}</span>\r\n                                    <br>\r\n                                    <ul class=\"list-inline\">\r\n                                        <li><strong>Status Legend</strong></li>\r\n                                        <li><i class=\"fa fa-square\" style=\"color:green;\"></i> &nbsp; Counted in time</li>\r\n                                        <li><i class=\"fa fa-square\" style=\"color:gray;\"></i> &nbsp; Counted after time</li>\r\n                                        <li><i class=\"fa fa-square\" style=\"color:red;\"></i> &nbsp; Not Counted</li>\r\n                                    </ul>\r\n                                    <div class=\"container\">\r\n                                        <div *ngFor=\"let item of lstOutputSchedule\">\r\n                                            <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-4\">{{item.USER_ID}}</label>\r\n                                            <atpar-datatable [value]=\"item.SCHEDULEDETAILS\" [paginator]=\"false\" [responsive]=\"true\">\r\n                                                <p-column field=\"STATUS\" header=\"STATUS\" *ngIf=\"blnTotal\">\r\n                                                    <template let-col let-ven=\"rowData\" pTemplate type=\"body\">\r\n\r\n                                                        <span #x>  {{setbackGroundColor(x,ven)}}</span>\r\n                                                    </template>\r\n                                                </p-column>\r\n                                         \r\n                                                <p-column field=\"BUSINESS_UNIT\" header=\"Business Unit/Company\" *ngIf=\"blnTotal\"  [sortable]=\"true\"></p-column>\r\n                                                <p-column field=\"CART_ID\" header=\"Cart ID/Par Location\" *ngIf=\"blnTotal\"  [sortable]=\"true\"></p-column>\r\n                                                <p-column field=\"COUNT_BEFORE\" header=\"Schedule to Count before\" *ngIf=\"blnTotal\" align=\"left\"  [sortable]=\"true\"></p-column>\r\n                                                <p-column field=\"ACTUAL_COUNT_TIME\" header=\"Actual Count Time\" *ngIf=\"blnTotal\" align=\"left\"  [sortable]=\"true\"></p-column>\r\n                                                <p-column field=\"TIME_DIFFERENCE\" header=\"Deviation (Mins)\" *ngIf=\"blnTotal\" align=\"left\"  [sortable]=\"true\"></p-column>\r\n                                            </atpar-datatable>\r\n\r\n                                        </div>\r\n\r\n                                    </div>\r\n\r\n                                </div>\r\n                            </div>\r\n\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <mail-dialog header=\"Enter Recipient`s Email Address\" [width]=\"450\" (onClose)=\"closeMailPopup()\" [(visible)]=\"isMailDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\r\n        <div class=\"ui-grid ui-grid-responsive ui-fluid\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                    <span>To : </span>\r\n                </div>\r\n                <div class=\"col-lg-6 col-md-6 col-sm-8 col-xs-8\">\r\n                    <atpar-text [(ngModel)]=\"toMailAddr\" [name]=\"txtToMailAddr\" [id]=\"'txtToMailAddr'\"></atpar-text>\r\n                </div>\r\n                <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                    <span><button class=\"btn btn-purple sbtn\" (click)=\"onSendMailClick()\">Send &nbsp;<i class=\"fa fa-share-square-o\" aria-hidden=\"true\"></i></button> </span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </mail-dialog>\r\n\r\n</div>\r\n<style>\r\n    .clrRed {\r\n        color: red;\r\n        background: red;\r\n    }\r\n\r\n    .clrGreen {\r\n        color: green;\r\n        background: green;\r\n    }\r\n\r\n    .clrGray {\r\n        background: gray;\r\n        color: gray;\r\n    }\r\n\r\n    a:hover {\r\n        color: cornflowerblue !important;\r\n    }\r\n</style>";

/***/ }),

/***/ 1950:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <atpar-setup-par-locations [appId]=\"cartAppId\"></atpar-setup-par-locations>\r\n</div>";

/***/ }),

/***/ 1951:
/***/ (function(module, exports) {

module.exports = "\r\n<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\" *ngIf=\"true\">\r\n            <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0 0 10px 0;\">\r\n                        <form class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Org Group ID </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpId}}</label>                                        \r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupDD\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Business Unit / Company</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstFilteredBUnits\" [id]=\"'ddlOrg'\" [required]=\"true\" [(ngModel)]=\"selectedBunit\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddl_Changed()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Cart ID / Par Location</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"selectedParlocation\" [id]=\"'ParlocationId'\" [name]=\"'ParlocationId'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Display</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstFilteredDisplay\" [id]=\"'ddldisplay'\" [(ngModel)]=\"selectedDropDownDisplay\" [ngModelOptions]=\"{standalone: true}\" (onChange)=\"ddl_Changed()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-2 form-group\">\r\n                                     \r\n\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"getAllocateCarts()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"col-xs-12\" *ngIf=\"showGrid\">\r\n                            <div class=\"container\">\r\n                                <atpar-datatable [value]=\"lstDBData\" [style]=\"{'width':'100%'}\"  [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"recordsPerPageSize\" [rowsPerPageOptions]=\"[10,20, 30, 40, 50, 60, 70, 80, 90, 100]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n                                    <p-column field=\"BUSINESS_UNIT\" header=\"Business Unit / Company\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'10%'}\" ></p-column>\r\n                                    <p-column field=\"CART_ID\" header=\"Cart ID / Par Location\" sortable=\"custom\"  (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'14%'}\"></p-column>\r\n                                    <p-column field=\"DESCR\" header=\"Description\" sortable=\"custom\" [filter]=\"true\"  (sortFunction)=\"customSort($event)\" filterPlaceholder=\"Search\" [style]=\"{'width':'10%'}\"></p-column>\r\n                                    <p-column field=\"TWO_BIN_ALLOCATION\" header=\"2Bin Location\" [style]=\"{'text-align':'center','width':'8%'}\">\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <atpar-switch (change)=\"selectedRow(ven,$event)\" [(ngModel)]=\"ven.checkvalue\"></atpar-switch>\r\n                                        </template>\r\n\r\n                                    </p-column>\r\n                                    <p-column field=\"DEF_PERCENTAGE_VALUE\" header=\"Default Percent Value\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [style]=\"{'width':'12%'}\">\r\n                                        <template let-ven=\"rowData\" pTemplate type=\"body\">\r\n                                            <atpar-text-grid [id]=\"ven.Sno\" [name]=\"txtIss\" [(ngModel)]=\"ven.DEF_PERCENTAGE_VALUE\" [validations]=\"'numeric,max=2'\" \r\n                                                             [ngModelOptions]=\"{standalone: true}\" [title]=\"'Default percentage value Allows only numbers'\"  ></atpar-text-grid>\r\n\r\n                                        </template>\r\n                                    </p-column>\r\n                                </atpar-datatable>\r\n                            </div>\r\n                            <br />\r\n                            <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"allocateTwoBinLocData()\" id=\"backparam\">Submit &nbsp;<i class=\"fa fa-check\"></i></button>\r\n\r\n                            </div>\r\n                        </div>\r\n                    \r\n                        \r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ }),

/***/ 1952:
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <atpar-user-parameters [appId]=\"crctAppId\"></atpar-user-parameters>\r\n    <!--<span>this is cartcount user parametrs screen.</span>-->\r\n</div>";

/***/ }),

/***/ 1953:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>This is CartCount User Productivity Report Screen</span>\r\n</div>";

/***/ }),

/***/ 1954:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <router-outlet></router-outlet>\r\n</div>";

/***/ })

});
//# sourceMappingURL=9.601fce7cdc00a672fc7a.chunk.js.map