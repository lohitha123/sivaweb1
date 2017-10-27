webpackJsonp([20],{

/***/ 1394:
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
var HttpService_1 = __webpack_require__(12);
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var AtParEnums_1 = __webpack_require__(14);
var AtParEnums_2 = __webpack_require__(14);
var AtParConstants_1 = __webpack_require__(31);
var asmt_access_permission_service_1 = __webpack_require__(1677);
var datatable_1 = __webpack_require__(71);
var AccessPermissionComponent = (function () {
    function AccessPermissionComponent(spinnerService, atParCommonService, atParAccessPermissionService, httpService, http, atParConstant) {
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.atParAccessPermissionService = atParAccessPermissionService;
        this.httpService = httpService;
        this.http = http;
        this.atParConstant = atParConstant;
        this.growlMessage = [];
        this.lstOrgGroups = [];
        this.lstUsers = [];
        this.gAppID = 11;
        this.lstAccessFields = [];
        this.disableSubmitButton = false;
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    AccessPermissionComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pazeSize = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.bindOrgDropdown()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AccessPermissionComponent.prototype.bindOrgDropdown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getUserOrgGroups(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstOrgGroups = [];
                                _this.lstUsers = [];
                                _this.lstOrgGroups.push({ label: 'Select One', value: 'Select One' });
                                _this.lstUsers.push({ label: 'Select User', value: 'Select User' });
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        if (res.DataList.length == 1) {
                                            _this.showOrgDropdown = false;
                                            _this.LBL_ORG_GROUP_ID = res.DataList[0].ORG_GROUP_ID + ' - ' + res.DataList[0].ORG_GROUP_NAME;
                                            _this.selectedOrgGroupId = res.DataList[0].ORG_GROUP_ID;
                                            _this.getUsersList(res.DataList[0].ORG_GROUP_ID);
                                            _this.spinnerService.stop();
                                        }
                                        else {
                                            _this.spinnerService.stop();
                                            _this.showOrgDropdown = true;
                                            for (var i = 0; i < res.DataList.length; i++) {
                                                if (res.DataList[i].ORG_GROUP_ID.toUpperCase() != 'ALL') {
                                                    _this.lstOrgGroups.push({ label: (res.DataList[i].ORG_GROUP_ID + ' - ' + res.DataList[i].ORG_GROUP_NAME), value: res.DataList[i].ORG_GROUP_ID });
                                                }
                                            }
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
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AccessPermissionComponent.prototype.ddlOrgGroup_SelectedIndexChanged = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.selectedOrgGroupId = this.ORG_GROUP_ID;
                        if (!(e.value != 'Select One')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getUsersList(e.value)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.selectedUser = 'Select User';
                        _a.label = 3;
                    case 3:
                        this.lstAccessFields = [];
                        return [2 /*return*/];
                }
            });
        });
    };
    AccessPermissionComponent.prototype.ddlUserChange = function () {
        this.lstAccessFields = [];
    };
    AccessPermissionComponent.prototype.getUsersList = function (orgGroupID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getUsersList(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.gAppID, orgGroupID)
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstUsers = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstUsers.push({ label: 'Select User', value: 'Select User' });
                                        for (var i = 0; i < res.DataList.length; i++) {
                                            _this.lstUsers.push({ label: res.DataList[i].FULLNAME, value: res.DataList[i].USER_ID });
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
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AccessPermissionComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        if (this.showOrgDropdown && (this.ORG_GROUP_ID == 'Select One' || this.ORG_GROUP_ID == '' || this.ORG_GROUP_ID == undefined)) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Org Group ID' });
                            return [2 /*return*/];
                        }
                        if (!this.showOrgDropdown && (this.LBL_ORG_GROUP_ID == '' || this.LBL_ORG_GROUP_ID == undefined)) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Org Group ID' });
                            return [2 /*return*/];
                        }
                        if (this.selectedUser == 'Select User' || this.selectedUser == '' || this.selectedUser == undefined) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select User ID' });
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        if (this.dataTableComponent != undefined) {
                            this.dataTableComponent.reset();
                        }
                        return [4 /*yield*/, this.atParAccessPermissionService.getAccessFields(this.gAppID, this.selectedOrgGroupId, this.selectedUser, 'ASSET ITEMS')
                                .catch(this.httpService.handleError).then(function (result) {
                                _this.spinnerService.stop();
                                var res = result.json();
                                _this.lstAccessFields = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstAccessFields = res.DataList;
                                        for (var i = 0; i < _this.lstAccessFields.length; i++) {
                                            _this.lstAccessFields[i].SCANORDER_ID = 'txtScanOrderId' + i;
                                            if (_this.lstAccessFields[i].DISPLAY_FLAG == 'N') {
                                                _this.lstAccessFields[i].IS_DISPLAY = false;
                                            }
                                            else {
                                                _this.lstAccessFields[i].IS_DISPLAY = true;
                                            }
                                            if (_this.lstAccessFields[i].EDIT_FLAG == 'N') {
                                                _this.lstAccessFields[i].IS_EDIT = false;
                                            }
                                            else {
                                                _this.lstAccessFields[i].IS_EDIT = true;
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
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AccessPermissionComponent.prototype.btnSubmit_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i;
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    if (this.showOrgDropdown && (this.ORG_GROUP_ID == 'Select One' || this.ORG_GROUP_ID == '' || this.ORG_GROUP_ID == undefined)) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Org Group ID' });
                        return [2 /*return*/];
                    }
                    if (this.selectedUser == 'Select User' || this.selectedUser == '' || this.selectedUser == undefined) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select User ID' });
                        return [2 /*return*/];
                    }
                    for (i = 0; i < this.lstAccessFields.length; i++) {
                        if (this.lstAccessFields[i].IS_DISPLAY == true) {
                            this.lstAccessFields[i].DISPLAY_FLAG = 'Y';
                        }
                        else {
                            this.lstAccessFields[i].DISPLAY_FLAG = 'N';
                        }
                        if (this.lstAccessFields[i].IS_EDIT == true) {
                            this.lstAccessFields[i].EDIT_FLAG = 'Y';
                        }
                        else {
                            this.lstAccessFields[i].EDIT_FLAG = 'N';
                        }
                    }
                    this.spinnerService.start();
                    this.atParAccessPermissionService.updateAccessFields(this.lstAccessFields, this.selectedOrgGroupId, this.selectedUser)
                        .catch(this.httpService.handleError).then(function (result) {
                        _this.spinnerService.stop();
                        var res = result.json();
                        switch (res.StatType) {
                            case AtParEnums_2.StatusType.Success: {
                                _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                _this.lstAccessFields = [];
                                _this.ORG_GROUP_ID = 'Select One';
                                _this.selectedUser = 'Select User';
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
                    });
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    AccessPermissionComponent.prototype.dropDownValidations = function () {
        if ((this.selectedUser == 'Select User' || this.selectedUser == undefined || this.selectedUser == "")) {
            return true;
        }
        if ((this.ORG_GROUP_ID == 'Select One' || this.ORG_GROUP_ID == undefined || this.ORG_GROUP_ID == "")) {
            return true;
        }
        return false;
    };
    AccessPermissionComponent.prototype.txtScan_Keyup = function (e, lstPermission) {
        if (e.target.value == '') {
            this.disableSubmitButton = true;
        }
        else {
            for (var i = 0; i < lstPermission.length; i++) {
                if (lstPermission[i].SCAN_ORDER == undefined || lstPermission[i].SCAN_ORDER == null || lstPermission[i].SCAN_ORDER == '') {
                    this.disableSubmitButton = true;
                    break;
                }
                else {
                    this.disableSubmitButton = false;
                }
            }
        }
    };
    AccessPermissionComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    AccessPermissionComponent.prototype.ngOnDestroy = function () {
        this._deviceTokenEntry = [];
        this.pazeSize = null;
        this.growlMessage = [];
        this.lstAccessFields = [];
        this.selectedUser = '';
        this.ORG_GROUP_ID = '';
        this.spinnerService.stop();
        this.spinnerService = null;
    };
    return AccessPermissionComponent;
}());
__decorate([
    core_1.ViewChild(datatable_1.DataTable),
    __metadata("design:type", datatable_1.DataTable)
], AccessPermissionComponent.prototype, "dataTableComponent", void 0);
AccessPermissionComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1910),
        providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, asmt_access_permission_service_1.AtParAccessPermissionService],
    }),
    __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        asmt_access_permission_service_1.AtParAccessPermissionService,
        HttpService_1.HttpService,
        http_1.Http,
        AtParConstants_1.AtParConstants])
], AccessPermissionComponent);
exports.AccessPermissionComponent = AccessPermissionComponent;


/***/ }),

/***/ 1395:
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
var LocationGroupsAllocationComponent = (function () {
    function LocationGroupsAllocationComponent() {
        this.assetManagementAppId = AtParEnums_1.EnumApps.AssetManagement;
    }
    return LocationGroupsAllocationComponent;
}());
LocationGroupsAllocationComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1911)
    })
], LocationGroupsAllocationComponent);
exports.LocationGroupsAllocationComponent = LocationGroupsAllocationComponent;


/***/ }),

/***/ 1396:
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
var AssetManagementComponent = (function () {
    function AssetManagementComponent() {
    }
    return AssetManagementComponent;
}());
AssetManagementComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1912)
    })
], AssetManagementComponent);
exports.AssetManagementComponent = AssetManagementComponent;


/***/ }),

/***/ 1677:
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
var HttpService_1 = __webpack_require__(12);
var Rx_1 = __webpack_require__(37);
var AtParAccessPermissionService = (function () {
    function AtParAccessPermissionService(httpService) {
        this.httpService = httpService;
    }
    AtParAccessPermissionService.prototype.getAccessFields = function (appID, orgGroupId, userId, screenName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/AccessPermissions/GetAccessFields",
                            params: {
                                "appId": appID,
                                "orgGroupId": orgGroupId,
                                "userId": userId,
                                "screenName": screenName
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParAccessPermissionService.prototype.updateAccessFields = function (newUser, orgGroupId, userId) {
        return this.httpService.update({
            "apiMethod": "/api/AccessPermissions/UpdateAccessFields",
            formData: newUser,
            params: {
                orgGroupId: orgGroupId,
                userId: userId
            }
        }).toPromise();
    };
    AtParAccessPermissionService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    ;
    return AtParAccessPermissionService;
}());
AtParAccessPermissionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], AtParAccessPermissionService);
exports.AtParAccessPermissionService = AtParAccessPermissionService;


/***/ }),

/***/ 1678:
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
var asmt_component_1 = __webpack_require__(1396);
var asmt_access_permission_component_1 = __webpack_require__(1394);
var asmt_location_groups_allocation_component_1 = __webpack_require__(1395);
exports.routes = [
    {
        path: '',
        component: asmt_component_1.AssetManagementComponent,
        children: [
            { path: 'accesspermissions', component: asmt_access_permission_component_1.AccessPermissionComponent },
            { path: 'allocatelocationgroups', component: asmt_location_groups_allocation_component_1.LocationGroupsAllocationComponent },
        ]
    }
];
var AssetManagementRoutingModule = (function () {
    function AssetManagementRoutingModule() {
    }
    return AssetManagementRoutingModule;
}());
AssetManagementRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.routes)],
        exports: [router_1.RouterModule]
    })
], AssetManagementRoutingModule);
exports.AssetManagementRoutingModule = AssetManagementRoutingModule;


/***/ }),

/***/ 1679:
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
var asmt_component_1 = __webpack_require__(1396);
var asmt_access_permission_component_1 = __webpack_require__(1394);
var asmt_location_groups_allocation_component_1 = __webpack_require__(1395);
var asmt_routing_module_1 = __webpack_require__(1678);
var shared_module_1 = __webpack_require__(632);
var AssetManagementModule = (function () {
    function AssetManagementModule() {
    }
    return AssetManagementModule;
}());
AssetManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            asmt_routing_module_1.AssetManagementRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            asmt_component_1.AssetManagementComponent,
            asmt_access_permission_component_1.AccessPermissionComponent,
            asmt_location_groups_allocation_component_1.LocationGroupsAllocationComponent
        ]
    })
], AssetManagementModule);
exports.AssetManagementModule = AssetManagementModule;


/***/ }),

/***/ 1910:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                <div class=\"panel-body\" style=\"padding:0px;\">\r\n                    <div class=\"col-xs-12 \">\r\n                        <form class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Org Group ID</label>\r\n                                <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                    <label class=\"control-label lbl-left\" *ngIf=\"!showOrgDropdown\">{{LBL_ORG_GROUP_ID}}</label>\r\n                                    <atpar-select [options]=\"lstOrgGroups\" *ngIf=\"showOrgDropdown\" [required]=\"true\" [id]=\"'ddlOrgGroupId'\" [(ngModel)]=\"ORG_GROUP_ID\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddlOrgGroup_SelectedIndexChanged($event)\"></atpar-select>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">User ID</label>\r\n                                <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                    <atpar-select [options]=\"lstUsers\" [required]=\"true\" [id]=\"'ddlUser'\" [(ngModel)]=\"selectedUser\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddlUserChange()\"></atpar-select>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-xs-12 col-sm-12 col-md-2 form-group\">\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"btnGo_Click()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                    <div class=\"col-xs-12 table-responsive\" *ngIf=\"lstAccessFields.length>0\">\r\n                        <div class=\"container\" style=\"text-align:center\">\r\n                            <atpar-datatable [value]=\"lstAccessFields\" [style]=\"{'width':'75%'}\" [paginator]=\"false\" [pageLinks]=\"3\" [rows]=\"pazeSize\" [rowsPerPageOptions]=\"[10,20, 30, 40, 50, 60, 70, 80, 90, 100]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n                                <p-column field=\"FIELD_NAME\" header=\"Field\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'30%'}\"> </p-column>\r\n                                <p-column header=\"Display\">\r\n                                    <template let-col let-ven=\"rowData\" pTemplate=\"body\">\r\n                                        <input type=\"checkbox\" class=\"checkbox\" [(ngModel)]=\"ven.IS_DISPLAY\" style=\"margin-left:121px;width:15%\" >\r\n                                    </template>\r\n                                </p-column>\r\n                                <p-column header=\"Edit\">\r\n                                    <template let-col let-ven=\"rowData\" pTemplate=\"body\">\r\n                                        <input type=\"checkbox\" class=\"checkbox\" [(ngModel)]=\"ven.IS_EDIT\" style=\"margin-left:121px;\">\r\n                                    </template>\r\n                                </p-column>\r\n                                <p-column header=\"Scan Order\">\r\n                                    <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                        <atpar-text-grid [name]=\"txtSCorder\" [id]=\"ven.SCANORDER_ID\" [(ngModel)]=\"ven.SCAN_ORDER\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"'numeric'\" (keyup)=\"txtScan_Keyup($event,lstAccessFields)\"></atpar-text-grid>\r\n                                    </template>\r\n                                </p-column>\r\n                            </atpar-datatable>\r\n                        </div>\r\n                        <br />\r\n                        <div class=\"col-xs-12 col-md-4 col-md-offset-5 col-sm-6 col-sm-offset-3\">\r\n                            <button class=\"btn btn-purple sbtn\" (click)=\"btnSubmit_Click()\" [disabled]=\"disableSubmitButton\">Submit &nbsp;<i class=\"fa fa-check\"></i></button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>";

/***/ }),

/***/ 1911:
/***/ (function(module, exports) {

module.exports = "\r\n<div>\r\n    <atpar-allocate-location-groups [appId]=\"assetManagementAppId\"></atpar-allocate-location-groups>\r\n</div>\r\n";

/***/ }),

/***/ 1912:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <router-outlet></router-outlet>\r\n</div>";

/***/ })

});
//# sourceMappingURL=20.601fce7cdc00a672fc7a.chunk.js.map