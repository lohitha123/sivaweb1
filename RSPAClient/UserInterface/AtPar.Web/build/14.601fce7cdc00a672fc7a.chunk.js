webpackJsonp([14],{

/***/ 1531:
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
        this.pickProductId = AtParEnums_1.EnumApps.PickPlan;
    }
    return ActivityReportComponent;
}());
ActivityReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2026)
    })
], ActivityReportComponent);
exports.ActivityReportComponent = ActivityReportComponent;


/***/ }),

/***/ 1532:
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
var pick_allocate_business_units_service_1 = __webpack_require__(1798);
var AtParEnums_1 = __webpack_require__(14);
var HttpService_1 = __webpack_require__(12);
var AtParStatusCodes_1 = __webpack_require__(50);
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var AtParConstants_1 = __webpack_require__(31);
var MT_ATPAR_SECURITY_AUDIT_1 = __webpack_require__(325);
var PickAllocateInventoryBusinessUnitsComponent = (function () {
    function PickAllocateInventoryBusinessUnitsComponent(service, spinnerService, atParCommonService, httpService, atParConstant) {
        this.service = service;
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.lstBUnits = [];
        this.deviceTokenEntry = [];
        this.dataCheckedSorting = [];
        this.orgGrpID = "";
        this.orgGrpIDData = "";
        this.userID = "";
        ////for orgGrpDropdown
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        ////for userID DropDown
        this.blnShowUserIDLabel = false;
        this.blnShowUserIDDD = false;
        this.selectedOrgGroupId = "";
        this.selectedDropDownUserId = "";
        this.selectedBunit = "";
        this.selectedDescription = "";
        this.isVisible = false;
        this.growlMessage = [];
        ///bunits 
        this.lstFilteredBUnits = [];
        this.showGrid = false;
        this.blnsortbycolumn = true;
        this.custom = "custom";
        this.preField = "";
        this.isAuditRequired = "";
        this.strAudit = "";
    }
    PickAllocateInventoryBusinessUnitsComponent.prototype.ngOnInit = function () {
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedBUnits = new Array();
        this.dataCheckedSorting = new Array();
        this.dataUncheckedSorting = new Array();
        this.lstFilteredBUnits = new Array();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.pazeSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        // checking is Audit enabled for this page
        this.checkAuditAllowed();
        this.bindOrgGroups();
    };
    PickAllocateInventoryBusinessUnitsComponent.prototype.bindOrgGroups = function () {
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
                        return [4 /*yield*/, this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        _this.spinnerService.stop();
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpIDData = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGrpID = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.populateBusinessUnits();
                                            _this.bindUsersList();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstUsers = [];
                                            _this.lstUsers.push({ label: "Select User", value: "Select User" });
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
                        this.clientErrorMsg(ex_1, "bindOrgGroups");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PickAllocateInventoryBusinessUnitsComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isVisible = false;
                        this.growlMessage = [];
                        if (this.selectedOrgGroupId == "Select One") {
                            this.lstUsers = [];
                            this.lstUsers.push({ label: "Select User", value: "Select User" });
                            return [2 /*return*/];
                        }
                        this.selectedDropDownUserId = "";
                        this.lstDBData = new Array();
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.bindUsersList()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.populateBusinessUnits()];
                    case 3:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_2 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PickAllocateInventoryBusinessUnitsComponent.prototype.ddlUserChanged = function () {
        this.isVisible = false;
    };
    PickAllocateInventoryBusinessUnitsComponent.prototype.bindUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstUsers = [];
                        this.lstUsers.push({ label: "Select User", value: "Select User" });
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getUsersList(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], 5, this.orgGroupIDForDBUpdate)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.userDataList = data.DataList;
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstUsers.push({
                                                label: data.DataList[i].FULLNAME,
                                                value: data.DataList[i].USER_ID
                                            });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
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
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "bindUsersList");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PickAllocateInventoryBusinessUnitsComponent.prototype.selectedRow = function (values, event) {
        try {
            if (event == true) {
                values.CHK_VALUE = 1;
            }
            else {
                values.CHK_VALUE = 0;
            }
            for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
                if (this.lstCheckedBUnits[i].BUSINESS_UNIT === values.BUSINESS_UNIT) {
                    var index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0);
                    this.lstCheckedBUnits.splice(index, 1);
                }
            }
            this.lstCheckedBUnits.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    };
    PickAllocateInventoryBusinessUnitsComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        isOrgBUnitsExist = false;
                        if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstFilteredBUnits = data.DataList;
                                        isOrgBUnitsExist = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(isOrgBUnitsExist)];
                    case 3:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "populateBusinessUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PickAllocateInventoryBusinessUnitsComponent.prototype.checkAll = function () {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                    this.lstCheckedBUnits.push(this.lstgridfilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].checkvalue = true;
                    this.lstDBData[i].CHK_VALUE = 1;
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    PickAllocateInventoryBusinessUnitsComponent.prototype.unCheckAll = function () {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                    this.lstCheckedBUnits.push(this.lstgridfilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].checkvalue = false;
                    this.lstDBData[i].CHK_VALUE = 0;
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    PickAllocateInventoryBusinessUnitsComponent.prototype.BindDataGrid = function () {
        try {
            var lstDBDataList;
            this.dataCheckedSorting = [];
            this.dataUncheckedSorting = [];
            for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].CHK_ALLOCATED == 1) {
                    this.dataCheckedSorting.push(this.lstDBData[i]);
                }
                else {
                    this.dataUncheckedSorting.push(this.lstDBData[i]);
                }
            }
            this.showGrid = true;
            this.isVisible = true;
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    };
    PickAllocateInventoryBusinessUnitsComponent.prototype.filterdata = function (event) {
        try {
            this.lstgridfilterData = [];
            this.lstgridfilterData = new Array();
            this.lstgridfilterData = event;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "filterdata");
        }
    };
    PickAllocateInventoryBusinessUnitsComponent.prototype.customSort1 = function (event) {
        try {
            var element = event;
            this.lstDBData = [];
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
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
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
    PickAllocateInventoryBusinessUnitsComponent.prototype.customSort = function (event, field) {
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
    PickAllocateInventoryBusinessUnitsComponent.prototype.fillBUnitsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstFilteredBUnits = [];
                        query = event.query;
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        if (this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "Select One") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParCommonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstBUnits = data.DataList;
                                        _this.lstFilteredBUnits = _this.filterBusinessUnits(query, _this.lstBUnits);
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
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "fillBUnitsAuto");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PickAllocateInventoryBusinessUnitsComponent.prototype.filterBusinessUnits = function (query, businessunits) {
        try {
            var filtered = [];
            if (query == "%") {
                for (var i = 0; i < businessunits.length; i++) {
                    var Bunitvalue = businessunits[i];
                    filtered.push(Bunitvalue);
                }
            }
            else {
                if (query.length >= 1) {
                    for (var i = 0; i < businessunits.length; i++) {
                        var Bunitvalue = businessunits[i];
                        if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            filtered.push(Bunitvalue);
                        }
                    }
                }
            }
            return filtered;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "filterBusinessUnits");
        }
    };
    PickAllocateInventoryBusinessUnitsComponent.prototype.getAllBUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isBUnitsExists, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstgridfilterData = null;
                        this.isVisible = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User ID' });
                            this.showGrid = false;
                            return [2 /*return*/, false];
                        }
                        this.lstDBData = new Array();
                        return [4 /*yield*/, this.populateBusinessUnits()];
                    case 2:
                        isBUnitsExists = _a.sent();
                        if (!(isBUnitsExists == true)) return [3 /*break*/, 4];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.service.getBUnits(this.lstFilteredBUnits, this.selectedDropDownUserId, this.selectedBunit, this.selectedDescription, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .forEach(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstDBData = [];
                                        _this.lstDBData = response.DataList;
                                        for (var i = 0; i <= response.DataList.length - 1; i++) {
                                            if (response.DataList[i].CHK_ALLOCATED == 1) {
                                                response.DataList[i].checkvalue = true;
                                            }
                                            else {
                                                response.DataList[i].checkvalue = false;
                                            }
                                        }
                                        _this.lstDBData = response.DataList;
                                        _this.BindDataGrid();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.isVisible = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.isVisible = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.isVisible = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "getAllBUnits");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PickAllocateInventoryBusinessUnitsComponent.prototype.allocateBUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.service.allocateBUnits(this.selectedDropDownUserId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.lstFilteredBUnits, true, this.lstDBData)
                                .subscribe(function (response) {
                                _this.growlMessage = [];
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.selectedDropDownUserId = "";
                                        _this.selectedDescription = "";
                                        _this.selectedBunit = "";
                                        _this.isVisible = false;
                                        if (_this.isAuditRequired == "Y") {
                                            _this.insertAuditData();
                                            _this.spinnerService.stop();
                                        }
                                        else {
                                            _this.spinnerService.stop();
                                        }
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                        _this.lstDBData = [];
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
                                        _this.showGrid = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "allocateBUnits");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PickAllocateInventoryBusinessUnitsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    PickAllocateInventoryBusinessUnitsComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getAuditAllowed(5, "mt_pkpl_bunit_alloc.aspx").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.isAuditRequired = data.Data;
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
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "checkAuditAllowed");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PickAllocateInventoryBusinessUnitsComponent.prototype.insertAuditData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var auditSecurity, auditSecurityLst, intCnount, strScreenName, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        auditSecurity = void 0;
                        auditSecurityLst = void 0;
                        auditSecurityLst = new Array();
                        for (intCnount = 0; intCnount <= this.lstCheckedBUnits.length - 1; intCnount++) {
                            if (this.lstCheckedBUnits[intCnount].CHK_VALUE == 1) {
                                auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                auditSecurity.FIELD_NAME = "CHK_VALUE";
                                auditSecurity.OLD_VALUE = "0";
                                auditSecurity.NEW_VALUE = "1";
                                auditSecurity.KEY_1 = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                                auditSecurity.KEY_2 = "5";
                                auditSecurity.KEY_3 = this.lstCheckedBUnits[intCnount].BUSINESS_UNIT;
                                auditSecurity.KEY_4 = "";
                                auditSecurity.KEY_5 = "";
                                auditSecurityLst.push(auditSecurity);
                            }
                        }
                        strScreenName = "mt_pkpl_bunit_alloc.aspx";
                        return [4 /*yield*/, this.atParCommonService.insertAuditData(auditSecurityLst, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], strScreenName).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstDBData = [];
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "insertAuditData");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PickAllocateInventoryBusinessUnitsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstUsers = null;
        this.lstOrgGroups = null;
        this.lstBUnits = null;
        this.lstFilteredBUnits = null;
        this.lstCheckedBUnits = null;
        this.lstDBData = null;
        this.orgGroupData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    };
    return PickAllocateInventoryBusinessUnitsComponent;
}());
PickAllocateInventoryBusinessUnitsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2027),
        providers: [pick_allocate_business_units_service_1.PickAllocateBunitService, HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
    }),
    __metadata("design:paramtypes", [pick_allocate_business_units_service_1.PickAllocateBunitService,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        HttpService_1.HttpService,
        AtParConstants_1.AtParConstants])
], PickAllocateInventoryBusinessUnitsComponent);
exports.PickAllocateInventoryBusinessUnitsComponent = PickAllocateInventoryBusinessUnitsComponent;


/***/ }),

/***/ 1533:
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
        this.pickPlanAppId = AtParEnums_1.EnumApps.PickPlan;
    }
    return AllocateLocationGroupsComponent;
}());
AllocateLocationGroupsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2028)
    })
], AllocateLocationGroupsComponent);
exports.AllocateLocationGroupsComponent = AllocateLocationGroupsComponent;


/***/ }),

/***/ 1534:
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
var api_1 = __webpack_require__(72);
var AtParEnums_1 = __webpack_require__(14);
var AtParEnums_2 = __webpack_require__(14);
var AtParEnums_3 = __webpack_require__(14);
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var AtParConstants_1 = __webpack_require__(31);
var AllocatePickingZonesComponent = (function () {
    function AllocatePickingZonesComponent(httpService, _http, spinnerService, atParConstant, commonService) {
        this.httpService = httpService;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.commonService = commonService;
        this.deviceTokenEntry = [];
        this.lstUsers = [];
        this.lstOrgGroups = [];
        this.lstBUnits = [];
        this.lstFilteredBUnits = [];
        this.lstDisplay = [];
        this.selectedDropDownDisplay = "A";
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.orgGrpId = "";
        this.orgGrpIDData = "";
        this.selectedOrgGroupId = "";
        this.selectedDropDownUserId = "";
        this.zoneGpID = "";
        this.selectedDescription = "";
        this.blnStatusMsg = false;
        this.statusMsg = "";
        this.dataCheckedSorting = [];
        this.isAuditRequired = "";
        this.strAudit = "";
        this.blnsortbycolumn = true;
        this.custom = "custom";
        this.preField = "";
        this.showGrid = false;
        this.zonesAllocatedMsg = "";
        this.zonesAllocatedCount = 0;
        this.zonesDBCount = 0;
    }
    AllocatePickingZonesComponent.prototype.ngOnInit = function () {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedBUnits = new Array();
        this.dataCheckedSorting = new Array();
        this.dataUncheckedSorting = new Array();
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        //dropdownlist
        this.lstDisplay = [];
        this.lstDisplay.push({ label: 'All', value: 'A' });
        this.lstDisplay.push({ label: 'Allocated', value: 'L' });
        this.lstDisplay.push({ label: 'Unallocated', value: 'U' });
        this.bindOrgGroups();
    };
    AllocatePickingZonesComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstUsers = null;
        this.lstOrgGroups = null;
        this.lstBUnits = null;
        this.lstFilteredBUnits = null;
        this.lstCheckedBUnits = null;
        this.lstDBData = null;
        this.lstDBDataFullData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    };
    AllocatePickingZonesComponent.prototype.bindModelDataChange = function (event) { };
    AllocatePickingZonesComponent.prototype.bindUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstUsers = [];
                        this.lstUsers.push({ label: "Select User", value: "Select User" });
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUsersList(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], 5, this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
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
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
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
                        this.clientErrorMsg(ex_1, "bindUsersList");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocatePickingZonesComponent.prototype.populateUserStorageZones = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_2.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.lstFilteredBUnits = data.DataList;
                                        _this.spinnerService.stop();
                                        isOrgBUnitsExist = true;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
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
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "populateUserStorageZones");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocatePickingZonesComponent.prototype.bindOrgGroups = function () {
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
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        _this.orgGroupData = data.DataList;
                                        _this.blnStatusMsg = false;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpIDData = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.populateUserStorageZones();
                                            _this.bindUsersList();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstUsers = [];
                                            _this.lstUsers.push({ label: "Select User", value: "Select User" });
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
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
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
                        ex_3 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocatePickingZonesComponent.prototype.myfilterdata = function (event) {
        try {
            this.lstgridfilterData = new Array();
            this.lstgridfilterData = event;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "myfilterdata");
        }
    };
    AllocatePickingZonesComponent.prototype.checkAll = function () {
        try {
            this.lstCheckedBUnits = [];
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                    this.lstCheckedBUnits.push(this.lstgridfilterData[i]);
                }
            }
            else {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].checkvalue = true;
                    this.lstDBData[i].CHK_VALUE = 1;
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    AllocatePickingZonesComponent.prototype.unCheckAll = function () {
        try {
            this.lstCheckedBUnits = [];
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                    this.lstCheckedBUnits.push(this.lstgridfilterData[i]);
                }
            }
            else {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].checkvalue = false;
                    this.lstDBData[i].CHK_VALUE = 0;
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    AllocatePickingZonesComponent.prototype.selectedRow = function (values, event) {
        try {
            if (event == true) {
                values.CHK_VALUE = 1;
            }
            else {
                values.CHK_VALUE = 0;
            }
            for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
                if (this.lstCheckedBUnits[i].STORAGE_ZONE_ID === values.STORAGE_ZONE_ID) {
                    var index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0);
                    this.lstCheckedBUnits.splice(index, 1);
                }
            }
            this.lstCheckedBUnits.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    };
    AllocatePickingZonesComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showGrid = false;
                        if (this.selectedOrgGroupId == "Select One") {
                            this.orgGroupIDForDBUpdate = "";
                            this.lstUsers = [];
                            this.lstUsers.push({ label: "Select User", value: "Select User" });
                            return [2 /*return*/];
                        }
                        this.zoneGpID = "";
                        this.selectedDropDownUserId = "";
                        this.selectedDescription = "";
                        this.lstDBData = new Array();
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.bindUsersList()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.populateUserStorageZones()];
                    case 3:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "ddlOrgGrpIdChanged");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AllocatePickingZonesComponent.prototype.ddlUserChanged = function () {
        this.showGrid = false;
    };
    AllocatePickingZonesComponent.prototype.customSort1 = function (event) {
        try {
            var element = event;
            this.lstDBData = [];
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
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
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
    AllocatePickingZonesComponent.prototype.customSort = function (event, field) {
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
    AllocatePickingZonesComponent.prototype.getUserStorageZones = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isBUnitsExists, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstgridfilterData = null;
                        this.showGrid = false;
                        this.zonesAllocatedCount = 0;
                        this.zonesDBCount = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select User ID' });
                            this.showGrid = false;
                            return [2 /*return*/, false];
                        }
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstDBData = new Array();
                        return [4 /*yield*/, this.populateUserStorageZones()];
                    case 2:
                        isBUnitsExists = _a.sent();
                        if (isBUnitsExists == true) {
                            this.spinnerService.start();
                            this.httpService.get({
                                "apiMethod": "/api/AllocatePickingZones/GetUserStorageZones",
                                params: {
                                    "orgGroupId": this.orgGroupIDForDBUpdate,
                                    "appId": "5",
                                    "userId": this.selectedDropDownUserId,
                                    "storageZoneId": this.zoneGpID
                                }
                            }).catch(this.httpService.handleError).map(function (res) { return res.json(); })
                                .subscribe(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.lstDBData = [];
                                        _this.lstDBData = response.DataList;
                                        _this.zonesDBCount = response.DataList.length;
                                        for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                            if (_this.lstDBData[i].CHK_VALUE == 1) {
                                                _this.zonesAllocatedCount = _this.zonesAllocatedCount + 1;
                                            }
                                        }
                                        _this.BindGrid();
                                        _this.dataCheckedSorting = [];
                                        _this.dataUncheckedSorting = [];
                                        for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                            if (_this.lstDBData[i].CHK_ALLOCATED == 1) {
                                                _this.dataCheckedSorting.push(_this.lstDBData[i]);
                                            }
                                            else {
                                                _this.dataUncheckedSorting.push(_this.lstDBData[i]);
                                            }
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "getUserStorageZones");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocatePickingZonesComponent.prototype.BindGrid = function () {
        var _this = this;
        try {
            this.lstgridfilterData = null;
            this.lstDBDataFullData = this.lstDBData;
            if (this.selectedDropDownDisplay === "L") {
                this.showGrid = true;
                this.lstDBData = this.lstDBData.filter(function (x) { return x.CHK_ALLOCATED == 1; });
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    this.selectedDropDownUserId = "";
                    this.selectedDescription = "";
                    this.zoneGpID = "";
                    this.selectedDropDownDisplay = "";
                    this.showGrid = false;
                    return;
                }
            }
            else if (this.selectedDropDownDisplay === "U") {
                this.showGrid = false;
                this.lstDBData = this.lstDBData.filter(function (x) { return x.CHK_ALLOCATED != 1; });
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    this.selectedDropDownUserId = "";
                    this.selectedDescription = "";
                    this.zoneGpID = "";
                    this.selectedDropDownDisplay = "";
                    this.showGrid = false;
                    return;
                }
            }
            else {
                this.showGrid = false;
            }
            if (this.zoneGpID != undefined && this.zoneGpID != null && this.zoneGpID.trim().length != 0) {
                this.lstDBData = this.lstDBData.filter(function (x) { return x.STORAGE_ZONE_ID.toUpperCase().startsWith(_this.zoneGpID.toUpperCase()); });
            }
            for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].CHK_ALLOCATED == 1) {
                    this.lstDBData[i].checkvalue = true;
                }
                else {
                    this.lstDBData[i].checkvalue = false;
                }
            }
            if (this.lstDBData.length > 0)
                this.showGrid = true;
            else {
                this.growlMessage = [];
                this.showGrid = false;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                this.selectedDropDownUserId = "";
                this.selectedDescription = "";
                this.zoneGpID = "";
                this.selectedDropDownDisplay = "";
                this.showGrid = false;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindGrid");
        }
    };
    AllocatePickingZonesComponent.prototype.allocateZonePickingZones = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.spinnerService.start();
                try {
                    this.httpService.update({
                        "apiMethod": "/api/AllocatePickingZones/InsertUserStorageZones",
                        formData: this.lstDBDataFullData,
                        params: {
                            "orgGroupId": this.orgGroupIDForDBUpdate,
                            "storageZoneId": this.zoneGpID,
                            "assignedUserId": this.selectedDropDownUserId,
                            "userId": this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID],
                            "appId": 5,
                        }
                    }).catch(this.httpService.handleError).map(function (res) { return res.json(); }).subscribe(function (response) {
                        _this.growlMessage = [];
                        switch (response.StatType) {
                            case AtParEnums_3.StatusType.Success: {
                                _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                _this.selectedDropDownUserId = "";
                                _this.selectedDescription = "";
                                _this.zoneGpID = "";
                                _this.selectedDropDownDisplay = "";
                                _this.showGrid = false;
                                _this.spinnerService.stop();
                                _this.lstDBData = [];
                                break;
                            }
                            case AtParEnums_3.StatusType.Warn: {
                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                _this.selectedDropDownUserId = "";
                                _this.selectedDescription = "";
                                _this.zoneGpID = "";
                                _this.selectedDropDownDisplay = "";
                                _this.spinnerService.stop();
                                break;
                            }
                            case AtParEnums_3.StatusType.Error: {
                                _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                _this.selectedDropDownUserId = "";
                                _this.selectedDescription = "";
                                _this.zoneGpID = "";
                                _this.selectedDropDownDisplay = "";
                                _this.spinnerService.stop();
                                _this.showGrid = false;
                                break;
                            }
                            case AtParEnums_3.StatusType.Custom: {
                                _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                _this.selectedDropDownUserId = "";
                                _this.selectedDescription = "";
                                _this.zoneGpID = "";
                                _this.selectedDropDownDisplay = "";
                                _this.spinnerService.stop();
                                break;
                            }
                        }
                    });
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "allocateZonePickingZones");
                }
                return [2 /*return*/];
            });
        });
    };
    AllocatePickingZonesComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    return AllocatePickingZonesComponent;
}());
AllocatePickingZonesComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2029),
        providers: [HttpService_1.HttpService, api_1.ConfirmationService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http,
        event_spinner_service_1.SpinnerService,
        AtParConstants_1.AtParConstants,
        atpar_common_service_1.AtParCommonService])
], AllocatePickingZonesComponent);
exports.AllocatePickingZonesComponent = AllocatePickingZonesComponent;


/***/ }),

/***/ 1535:
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
var atpar_common_service_1 = __webpack_require__(43);
var HttpService_1 = __webpack_require__(12);
var AtParEnums_1 = __webpack_require__(14);
var event_spinner_service_1 = __webpack_require__(24);
var AtParConstants_1 = __webpack_require__(31);
var pick_allocate_priority_service_1 = __webpack_require__(1799);
var AllocatePriorityComponent = (function () {
    function AllocatePriorityComponent(dataservice, atParCommonService, httpService, spinnerService, atParConstant, pickAllocatePriorityService) {
        this.dataservice = dataservice;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.pickAllocatePriorityService = pickAllocatePriorityService;
        this.pop = false;
        this.table = false;
        this.page = true;
        this.form = false;
        this.editform = false;
        this.loading = true;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.bunitsData = [];
        this.selectedBunit = '';
        this.selectedOrgGrpId = '';
        this.location = "";
        this.assignpriority = "";
        this.disableButton = true;
        this.priorityStatus = 0;
        this.startIndex = 0;
    }
    AllocatePriorityComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.recordsperpage = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        return [4 /*yield*/, this.getUserOrgGroups()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AllocatePriorityComponent.prototype.go = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        if (this.selectedOrgGrpId == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
                            return [2 /*return*/];
                        }
                        if (this.selectedBunit == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit" });
                            return [2 /*return*/];
                        }
                        this.pop = false;
                        this.priorities = [];
                        this.filterpriorities = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.pickAllocatePriorityService.getLocationPriorities(this.selectedBunit, (this.location != '') ? this.location.toUpperCase() : this.location).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.pop = true;
                                        _this.priorities = data.DataList;
                                        if (_this.priorities != null && _this.priorities.length > 0) {
                                            for (var i = 0; i < _this.priorities.length; i++) {
                                                if (_this.priorities[i].CHK_VALUE == 0) {
                                                    _this.priorities[i].ASSIGN = false;
                                                }
                                                else {
                                                    _this.priorities[i].ASSIGN = true;
                                                }
                                            }
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
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
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "go");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocatePriorityComponent.prototype.bindModelDataChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.disableButton = false;
                    if (event != null && event.TextBoxID != null && event.validationrules != null) {
                        if ("txtPriority" == event.TextBoxID.toString()) {
                            this.priorityStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                    }
                    if (this.priorityStatus == 0) {
                        this.disableButton = false;
                    }
                    else {
                        this.disableButton = true;
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "bindModelDataChange");
                }
                return [2 /*return*/];
            });
        });
    };
    AllocatePriorityComponent.prototype.getBunits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.bunitsData = [];
                        isOrgBUnitsExist = false;
                        this.lstBunit = [];
                        this.lstBunit.push({ label: "Select BUnit", value: "" });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParCommonService.getOrgBusinessUnits(this.selectedOrgGrpId, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        _this.bunitsData = data.DataList;
                                        for (var i = 0; i < _this.bunitsData.length; i++) {
                                            _this.lstBunit.push({
                                                label: _this.bunitsData[i], value: _this.bunitsData[i]
                                            });
                                        }
                                        isOrgBUnitsExist = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
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
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "getBunits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocatePriorityComponent.prototype.getUserOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // this.blnddlOrgGrpID = false;
                        return [4 /*yield*/, this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a, i;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            data = res.json();
                                            this.orgGroupLst = res.json().DataList;
                                            _a = data.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 5];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 6];
                                                case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 7];
                                            }
                                            return [3 /*break*/, 8];
                                        case 1:
                                            this.ddOrgGroupdata = [];
                                            if (!(this.orgGroupLst != null && this.orgGroupLst.length > 0)) return [3 /*break*/, 4];
                                            if (!(this.orgGroupLst.length == 1)) return [3 /*break*/, 3];
                                            this.selectedOrgGrpName = this.orgGroupLst[0].ORG_GROUP_ID + " - " + this.orgGroupLst[0].ORG_GROUP_NAME;
                                            this.selectedOrgGrpId = this.orgGroupLst[0].ORG_GROUP_ID;
                                            this.blnddlOrgGrpID = true;
                                            return [4 /*yield*/, this.getBunits()];
                                        case 2:
                                            _b.sent();
                                            return [3 /*break*/, 4];
                                        case 3:
                                            if (this.orgGroupLst.length > 1) {
                                                this.showddlOrgGrpID = true;
                                                this.lstBunit = [];
                                                this.lstBunit.push({ label: "Select BUnit", value: "" });
                                                this.ddOrgGroupdata = [];
                                                this.ddOrgGroupdata.push({ label: "Select One", value: "" });
                                                for (i = 0; i < this.orgGroupLst.length; i++) {
                                                    if (this.orgGroupLst[i].ORG_GROUP_ID !== "All") {
                                                        this.ddOrgGroupdata.push({
                                                            label: this.orgGroupLst[i].ORG_GROUP_ID + " - " + this.orgGroupLst[i].ORG_GROUP_NAME,
                                                            value: this.orgGroupLst[i].ORG_GROUP_ID
                                                        });
                                                    }
                                                }
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 4;
                                        case 4: return [3 /*break*/, 8];
                                        case 5:
                                            {
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 6;
                                        case 6:
                                            {
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 7;
                                        case 7:
                                            {
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 8;
                                        case 8: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        // this.blnddlOrgGrpID = false;
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "getUserOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocatePriorityComponent.prototype.onChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.pop = false;
                        this.selectedBunit = "";
                        if (this.selectedOrgGrpId == "Select One" || this.selectedOrgGrpId == "") {
                            this.lstBunit = [];
                            this.lstBunit.push({ label: "Select BUnit", value: "" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getBunits()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "onChange");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocatePriorityComponent.prototype.onBunitChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.pop = false;
                        if (this.selectedBunit == "Select BUnit" || this.selectedBunit == "") {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getBunits()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "onBunitChange");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocatePriorityComponent.prototype.saveAllocatePriorites = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        if (this.assignpriority == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Please assign valid priority" });
                        }
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.growlMessage = [];
                        return [4 /*yield*/, this.pickAllocatePriorityService.saveLocationPriorities(this.assignpriority, this.priorities).
                                catch(this.httpService.handleError).then(function (res) {
                                var resp = res.json();
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.selectedBunit = "";
                                        _this.location = "";
                                        _this.assignpriority = "";
                                        _this.loading = true;
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully" });
                                        _this.page = false;
                                        _this.pop = false;
                                        _this.disableButton = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        var statusMessage = resp.StatusMessage;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                        break;
                                    }
                                }
                                _this.spinnerService.stop();
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "saveAllocatePriorites");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocatePriorityComponent.prototype.checkAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.endIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.filterpriorities != null || this.filterpriorities != undefined) {
                if (this.endIndex > this.filterpriorities.length) {
                    this.endIndex = this.filterpriorities.length;
                }
                for (var i = this.startIndex; i <= this.endIndex - 1; i++) {
                    this.filterpriorities[i].CHK_VALUE = 1;
                }
            }
            else {
                if (this.endIndex > this.priorities.length) {
                    this.endIndex = this.priorities.length;
                }
                for (var i = this.startIndex; i <= this.endIndex - 1; i++) {
                    this.priorities[i].CHK_VALUE = 1;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    AllocatePriorityComponent.prototype.unCheckAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.endIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.filterpriorities != null || this.filterpriorities != undefined) {
                if (this.endIndex > this.filterpriorities.length) {
                    this.endIndex = this.filterpriorities.length;
                }
                for (var i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.filterpriorities[i].CHK_VALUE = 0;
                }
            }
            else {
                if (this.endIndex > this.priorities.length) {
                    this.endIndex = this.priorities.length;
                }
                for (var i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.priorities[i].CHK_VALUE = 0;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "saveAllocatePriorites");
        }
    };
    AllocatePriorityComponent.prototype.changeStatus = function (obj, status) {
        try {
            if (status == true) {
                obj.CHK_VALUE = 1;
                obj.ASSIGN = true;
            }
            else {
                obj.CHK_VALUE = 0;
                obj.ASSIGN = false;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "changeStatus");
        }
    };
    AllocatePriorityComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    AllocatePriorityComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.disableButton = true;
        this.priorities = [];
    };
    AllocatePriorityComponent.prototype.myfilterdata = function (event) {
        try {
            this.filterpriorities = new Array();
            this.filterpriorities = event;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "myfilterdata");
        }
    };
    return AllocatePriorityComponent;
}());
AllocatePriorityComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2030),
        providers: [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, HttpService_1.HttpService, AtParConstants_1.AtParConstants, pick_allocate_priority_service_1.PickAllocatePriorityService]
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, HttpService_1.HttpService,
        event_spinner_service_1.SpinnerService, AtParConstants_1.AtParConstants, pick_allocate_priority_service_1.PickAllocatePriorityService])
], AllocatePriorityComponent);
exports.AllocatePriorityComponent = AllocatePriorityComponent;


/***/ }),

/***/ 1536:
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
        template: __webpack_require__(2031)
    })
], DailyActivityComponent);
exports.DailyActivityComponent = DailyActivityComponent;


/***/ }),

/***/ 1537:
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
        template: __webpack_require__(2032)
    })
], DailyUserActivityComponent);
exports.DailyUserActivityComponent = DailyUserActivityComponent;


/***/ }),

/***/ 1538:
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
var DeviationReportComponent = (function () {
    function DeviationReportComponent() {
    }
    return DeviationReportComponent;
}());
DeviationReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2033)
    })
], DeviationReportComponent);
exports.DeviationReportComponent = DeviationReportComponent;


/***/ }),

/***/ 1539:
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
var MT_PKPL_ORDER_PREFIX_1 = __webpack_require__(1736);
var HttpService_1 = __webpack_require__(12);
var api_1 = __webpack_require__(72);
var AtParEnums_1 = __webpack_require__(14);
var AtParEnums_2 = __webpack_require__(14);
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var AtParConstants_1 = __webpack_require__(31);
var OrderPrefixComponent = (function () {
    function OrderPrefixComponent(httpService, _http, spinnerService, atParConstant, commonService) {
        this.httpService = httpService;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.commonService = commonService;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.blnStatusMsg = false;
        this.statusMsg = "";
        this.dataCheckedSorting = [];
        this.blnsortbycolumn = true;
        this.custom = "custom";
    }
    OrderPrefixComponent.prototype.ngOnInit = function () {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedPrefix = new Array();
        this.dataCheckedSorting = new Array();
        this.dataUncheckedSorting = new Array();
        this.lstDBDataSave = new Array();
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.getOrderPrefixSetUp();
    };
    OrderPrefixComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstCheckedPrefix = null;
        this.lstDBData = null;
        this.lstDBDataSave = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    };
    OrderPrefixComponent.prototype.myfilterdata = function (event) {
        try {
            this.lstgridfilterData = new Array();
            this.lstgridfilterData = event;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "myfilterdata");
        }
    };
    OrderPrefixComponent.prototype.checkAll = function () {
        try {
            this.lstCheckedPrefix = [];
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                    this.lstCheckedPrefix.push(this.lstgridfilterData[i]);
                }
            }
            else {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].checkvalue = true;
                    this.lstDBData[i].CHK_VALUE = 1;
                    this.lstCheckedPrefix.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    OrderPrefixComponent.prototype.unCheckAll = function () {
        try {
            this.lstCheckedPrefix = [];
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                    this.lstCheckedPrefix.push(this.lstgridfilterData[i]);
                }
            }
            else {
                this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].checkvalue = false;
                    this.lstDBData[i].CHK_VALUE = 0;
                    this.lstCheckedPrefix.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    OrderPrefixComponent.prototype.selectedRow = function (values, event) {
        var _this = this;
        try {
            this.spinnerService.start();
            if (event == true) {
                values.CHK_VALUE = 1;
            }
            else {
                values.CHK_VALUE = 0;
            }
            for (var i = 0; i < this.lstCheckedPrefix.length; i++) {
                if (this.lstCheckedPrefix[i].BEG_SEQ === values.BEG_SEQ) {
                    var index = this.lstCheckedPrefix.indexOf(this.lstCheckedPrefix[i], 0);
                    this.lstCheckedPrefix.splice(index, 1);
                }
            }
            this.lstCheckedPrefix.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
        finally {
            setTimeout(function () {
                _this.spinnerService.stop();
            }, 50);
        }
    };
    OrderPrefixComponent.prototype.customSort = function (event) {
        try {
            var element = event;
            this.lstDBData = [];
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
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
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
    OrderPrefixComponent.prototype.getOrderPrefixSetUp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.lstgridfilterData = null;
                    this.spinnerService.start();
                    this.httpService.get({
                        "apiMethod": "/api/OrderPrefix/GetOrderPrefixSetUp",
                        params: {}
                    }).catch(this.httpService.handleError).map(function (res) { return res.json(); })
                        .subscribe(function (response) {
                        switch (response.StatType) {
                            case AtParEnums_2.StatusType.Success: {
                                _this.lstDBData = response.DataList;
                                for (var i = 0; i <= response.DataList.length - 1; i++) {
                                    if (response.DataList[i].CHK_VALUE == 1) {
                                        response.DataList[i].checkvalue = true;
                                    }
                                    else {
                                        response.DataList[i].checkvalue = false;
                                    }
                                }
                                _this.lstDBData = response.DataList;
                                _this.dataCheckedSorting = [];
                                _this.dataUncheckedSorting = [];
                                for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                    if (_this.lstDBData[i].CHK_VALUE == 1) {
                                        _this.dataCheckedSorting.push(_this.lstDBData[i]);
                                    }
                                    else {
                                        _this.dataUncheckedSorting.push(_this.lstDBData[i]);
                                    }
                                }
                                _this.spinnerService.stop();
                                break;
                            }
                            case AtParEnums_2.StatusType.Warn: {
                                _this.spinnerService.stop();
                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                break;
                            }
                            case AtParEnums_2.StatusType.Error: {
                                _this.spinnerService.stop();
                                _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                break;
                            }
                            case AtParEnums_2.StatusType.Custom: {
                                _this.spinnerService.stop();
                                _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                break;
                            }
                        }
                    });
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "getOrderPrefixSetUp");
                }
                return [2 /*return*/];
            });
        });
    };
    OrderPrefixComponent.prototype.saveOrderPrefixSetUp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var prefixObj, i;
            return __generator(this, function (_a) {
                this.spinnerService.start();
                this.lstDBDataSave = [];
                for (i = 0; i < this.lstDBData.length; i++) {
                    prefixObj = new MT_PKPL_ORDER_PREFIX_1.MT_PKPL_ORDER_PREFIX();
                    prefixObj.CHK_VALUE = this.lstDBData[i].CHK_VALUE;
                    prefixObj.ORDER_PREFIX = this.lstDBData[i].BEG_SEQ;
                    prefixObj.PREFIX_DESCR = '';
                    this.lstDBDataSave.push(prefixObj);
                }
                try {
                    this.httpService.create({
                        "apiMethod": "/api/OrderPrefix/SaveOrderPrefixSetUp",
                        formData: this.lstDBDataSave,
                        params: {}
                    }).catch(this.httpService.handleError).map(function (res) { return res.json(); }).subscribe(function (response) {
                        _this.growlMessage = [];
                        switch (response.StatType) {
                            case AtParEnums_2.StatusType.Success: {
                                _this.getOrderPrefixSetUp();
                                _this.spinnerService.stop();
                                _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                break;
                            }
                            case AtParEnums_2.StatusType.Warn: {
                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                _this.spinnerService.stop();
                                break;
                            }
                            case AtParEnums_2.StatusType.Error: {
                                _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                _this.spinnerService.stop();
                                break;
                            }
                            case AtParEnums_2.StatusType.Custom: {
                                _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                _this.spinnerService.stop();
                                break;
                            }
                        }
                    });
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "saveOrderPrefixSetUp");
                }
                return [2 /*return*/];
            });
        });
    };
    OrderPrefixComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    return OrderPrefixComponent;
}());
OrderPrefixComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2034),
        providers: [HttpService_1.HttpService, api_1.ConfirmationService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants],
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http,
        event_spinner_service_1.SpinnerService,
        AtParConstants_1.AtParConstants,
        atpar_common_service_1.AtParCommonService])
], OrderPrefixComponent);
exports.OrderPrefixComponent = OrderPrefixComponent;


/***/ }),

/***/ 1540:
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
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var AtParEnums_1 = __webpack_require__(14);
var AtParEnums_2 = __webpack_require__(14);
var AtParConstants_1 = __webpack_require__(31);
var AtParStatusCodes_1 = __webpack_require__(50);
var datatable_1 = __webpack_require__(71);
var routepath_1 = __webpack_require__(70);
var pick_pick_status_report_component_service_1 = __webpack_require__(1800);
var file_saver_1 = __webpack_require__(228);
var PickStatusReportComponent = (function () {
    function PickStatusReportComponent(spinnerService, atParCommonService, httpService, atParConstant, pickStatusReportService) {
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.pickStatusReportService = pickStatusReportService;
        this.growlMessage = [];
        this.defDateRange = 0;
        this.minDateValue1 = new Date();
        this.defDuration = 0;
        this.statusCode = -1;
        this.showGrid = false;
        this.isMailDialog = false;
        this.toDate = new Date();
        this.lstOrgGroupIds = [];
        this.lstBUnits = [];
        this.lstFilterBUnits = [];
        this.lstStatus = [];
        this.lstPickStatus = [];
        this.lstDBData = [];
        this.breadCrumbMenu = new routepath_1.Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    PickStatusReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.lstStatus.push({ label: 'All', value: 'All' }, { label: 'Open', value: 'Open' }, { label: 'Picked(Sent)', value: 'Picked(Sent)' }, { label: 'Downloaded', value: 'Downloaded' });
                        this.status = 'All';
                        this.spinnerService.start();
                        _a = this;
                        return [4 /*yield*/, this.getDefDateRange()];
                    case 1:
                        _a.statusCode = _c.sent();
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 3:
                        _c.sent();
                        if (!!this.showOrgDropdown) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.populateBUnitDropDown()];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        this.fromDate = new Date();
                        _b = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, this.defDateRange)];
                    case 6:
                        _b.fromDate = _c.sent();
                        this.toDate = new Date();
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry).then(function (result) {
                                _this.spinnerService.stop();
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.defDuration = parseInt(res.DataVariable.toString());
                                        _this.fromDate = new Date();
                                        var d = _this.fromDate.getDate() - _this.defDuration;
                                        _this.fromDate.setDate(d);
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
                        this.clientErrorMsg(ex_1, 'getMyPreferences');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstOrgGroupIds = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        if (res.DataList.length == 1) {
                                            _this.showOrgDropdown = false;
                                            _this.orgGroupId = res.DataList[0].ORG_GROUP_ID + ' - ' + res.DataList[0].ORG_GROUP_NAME;
                                        }
                                        else {
                                            _this.showOrgDropdown = true;
                                            _this.lstOrgGroupIds.push({ label: 'Select One', value: '' });
                                            for (var i = 0; i < res.DataList.length; i++) {
                                                if (res.DataList[i].ORG_GROUP_ID.toUpperCase() != 'ALL') {
                                                    _this.lstOrgGroupIds.push({ label: (res.DataList[i].ORG_GROUP_ID + ' - ' + res.DataList[i].ORG_GROUP_NAME), value: res.DataList[i].ORG_GROUP_ID });
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
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.populateBUnitDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var orggrpid, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orggrpid = this.orgGroupId.split("-")[0].trim();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParCommonService.getOrgBusinessUnits(orggrpid, AtParEnums_1.BusinessType.Inventory).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstBUnits = res.DataList;
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
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, 'populateBUnitDropDown');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.ddlOrgGroup_SelectedIndexChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.orgGroupId != '')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.populateBUnitDropDown()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.filterBUnits = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query, tempList, i;
            return __generator(this, function (_a) {
                query = event.query.toUpperCase();
                this.lstFilterBUnits = [];
                tempList = [];
                try {
                    if (this.orgGroupId != 'Select One' && this.orgGroupId != '' && this.orgGroupId != null) {
                        if (query == '%') {
                            tempList = this.lstBUnits;
                        }
                        else {
                            tempList = this.lstBUnits.filter(function (x) { return (x.startsWith(query) ||
                                x.endsWith(query) || x == query); });
                        }
                        for (i = 0; i < tempList.length; i++) {
                            this.lstFilterBUnits.push({ BUnit: tempList[i] });
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, 'filterProcedures');
                }
                return [2 /*return*/];
            });
        });
    };
    PickStatusReportComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var specialChars, i, i, i, i, todayDate, frmDate, todate, inXmlsb, ex_4, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        this.showGrid = false;
                        if (this.showOrgDropdown == true) {
                            if (this.orgGroupId == undefined) {
                                this.orgGroupId = "";
                            }
                            if (this.orgGroupId === "") {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Grp ID" });
                                this.spinnerService.stop();
                                return [2 /*return*/];
                            }
                        }
                        if (this.businessUnit == undefined || this.businessUnit == '') {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Business Unit / Company" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
                        if (this.businessUnit["BUnit"] != undefined) {
                            for (i = 0; i < specialChars.length; i++) {
                                if (this.businessUnit["BUnit"].indexOf(specialChars[i]) > -1) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Business Unit / Company" });
                                    this.spinnerService.stop();
                                    return [2 /*return*/];
                                }
                            }
                        }
                        if (this.location != undefined) {
                            for (i = 0; i < specialChars.length; i++) {
                                if (this.location.indexOf(specialChars[i]) > -1) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Valid Data" });
                                    this.spinnerService.stop();
                                    return [2 /*return*/];
                                }
                            }
                        }
                        if (this.order != undefined) {
                            for (i = 0; i < specialChars.length; i++) {
                                if (this.order.indexOf(specialChars[i]) > -1) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Valid Data" });
                                    this.spinnerService.stop();
                                    return [2 /*return*/];
                                }
                            }
                        }
                        if (this.batch != undefined) {
                            for (i = 0; i < specialChars.length; i++) {
                                if (this.batch.indexOf(specialChars[i]) > -1) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Valid Data" });
                                    this.spinnerService.stop();
                                    return [2 /*return*/];
                                }
                            }
                        }
                        if (this.businessUnit["BUnit"] == undefined) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Business Unit / Company" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        if (this.businessUnit == undefined) {
                            this.businessUnit = "";
                        }
                        todayDate = new Date();
                        if (this.toDate > todayDate) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date must be less than or equal to current date" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        else if (this.fromDate > this.toDate) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date must be less than or equal to To Date" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        else {
                        }
                        frmDate = this.convert(this.fromDate);
                        todate = this.convert(this.toDate);
                        this.fromDateforDisplay = frmDate;
                        this.toDateforDisplay = todate;
                        inXmlsb = '';
                        inXmlsb += "<ROOT>";
                        inXmlsb += "<BUSINESS_UNIT>" + this.businessUnit["BUnit"].trim().toUpperCase() + "</BUSINESS_UNIT>";
                        if (this.status == undefined) {
                            this.status = "";
                        }
                        if (this.status != null || this.status !== "") {
                            inXmlsb += "<STATUS>" + this.status.trim() + "</STATUS>";
                        }
                        if (this.batch != undefined) {
                            inXmlsb += "<BATCHID>" + this.batch.trim() + "</BATCHID>";
                        }
                        if (this.order != undefined) {
                            inXmlsb += "<ORDER>" + this.order.trim() + "</ORDER>";
                        }
                        if (this.location != undefined) {
                            inXmlsb += "<DELIVERYLOCATION>"
                                + this.location.trim() + "</DELIVERYLOCATION>";
                        }
                        if (frmDate != null || frmDate !== "") {
                            inXmlsb += "<FROMDATE>"
                                + frmDate + "</FROMDATE>";
                        }
                        if (todate != null || todate !== "") {
                            inXmlsb += "<TODATE>"
                                + todate + "</TODATE>";
                        }
                        if (this.showOrgDropdown == false) {
                            inXmlsb += "<ORGGROUPID>"
                                + this.orgGroupId.split("-")[0].trim() + "</ORGGROUPID>";
                        }
                        else {
                            inXmlsb += "<ORGGROUPID>"
                                + this.orgGroupId + "</ORGGROUPID>";
                        }
                        inXmlsb += "</ROOT>";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.pickStatusReportService.GetPickstatusReport(inXmlsb).
                                catch(this.httpService.handleError).then(function (res) {
                                _this.spinnerService.stop();
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.showGrid = true;
                                        _this.lstPickStatus = data.DataDictionary["outputParameters"]["Table1"];
                                        if (_this.status !== "All") {
                                            _this.lstPickStatus = _this.lstPickStatus.filter(function (x) { return x.Status.toUpperCase() === _this.status.toUpperCase(); });
                                        }
                                        if (_this.lstPickStatus.length == 0) {
                                            _this.showGrid = false;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Plans Found" });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        if (data.StatusCode = AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Plans Found" });
                                            break;
                                        }
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
                        ex_4 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, 'btnGo_Click');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.convert = function (str) {
        var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    PickStatusReportComponent.prototype.getDefDateRange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, this.atParCommonService.GetMyPreferences("DEFAULT_REPORT_DURATION", this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                if (data.StatType == AtParEnums_2.StatusType.Success) {
                                    _this.defDateRange = parseInt(data.DataVariable.toString());
                                }
                                _this.statusCode = data.StatusCode;
                                if (data.StatType == AtParEnums_2.StatusType.Error) {
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
                        ex_6 = _a.sent();
                        return [4 /*yield*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_7;
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
                            file_saver_1.saveAs(blob, "pick_status_report.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, 'onExportToExcelClick');
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.onPrintClick = function (event) {
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
                                mywindow.document.write('<html><head><title>' + 'Point Of Use - Pref Card Performance Summary' + '</title>');
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
                                return [2 /*return*/];
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, 'onPrintClick');
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.onSendMailIconClick = function (event) {
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
    PickStatusReportComponent.prototype.onSendMailClick = function (event) {
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
                        return [4 /*yield*/, this.exportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        this.isMailDialog = false;
                        toAddr = '';
                        this.growlMessage = [];
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.atParCommonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Pick Plan Status Report', JSON.stringify(html), this.toMailAddr, AtParEnums_2.MailPriority.Normal.toString(), '')
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
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Email Server is Not Configured! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SEND_FAILED) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                        }
                        else {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                        }
                        _a.label = 3;
                    case 3:
                        // if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.isMailDialog = false;
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
    PickStatusReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    PickStatusReportComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, ChartPath, index, ex_10;
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
                        imgserverPath = '';
                        return [4 /*yield*/, this.atParCommonService.getServerIP()
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
                        return [4 /*yield*/, this.atParCommonService.getSSLConfigDetails()
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
                        ChartPath = this.httpService.BaseUrl + '/Uploaded/';
                        // let title: string = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder = "<Table align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == "Print") {
                            htmlBuilder += "<TR width='100%'><td  align=left  width='8%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Pick Plan Status Report from " + this.fromDateforDisplay + " to " + this.toDateforDisplay + " </b></span></td><td align=right valign=top>&nbsp;";
                            //htmlBuilder += "<A  href=" + ""+"javascript:printWindow()" + ""+"><img src=" + imgserverPath + "print.jpg></A>"
                        }
                        else {
                            htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Pick Plan Status Report from " + this.fromDateforDisplay + " to " + this.toDateforDisplay + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr> ";
                        htmlBuilder += "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
                        htmlBuilder += "<tr bgcolor=#d3d3d3>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Org Group ID</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>B Unit</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Order NO</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Batch ID</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Location</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Order Date</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Picked or Downloaded Date Time</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Status</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>User</b></span></td>";
                        htmlBuilder += "</tr>";
                        for (index = 0; index < this.lstPickStatus.length; index++) {
                            if (this.lstPickStatus[index].DOWNLOADTIME == null) {
                                this.lstPickStatus[index].DOWNLOADTIME = "";
                            }
                            htmlBuilder += "<tr>";
                            htmlBuilder += "<td align=center nowrap><span class=c3>" + this.orgGroupId + "</span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3>" + this.lstPickStatus[index].BUSINESS_UNIT + "</span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3>" + this.lstPickStatus[index].ORDER_NO + "</span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3>" + this.lstPickStatus[index].PICK_BATCH_ID + "</span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3>" + this.lstPickStatus[index].LOCATION + "</span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3>" + this.convertDateFormate(this.lstPickStatus[index].REQUEST_DATE) + "</span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3>" + this.lstPickStatus[index].DOWNLOADTIME + "</span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3>" + this.lstPickStatus[index].Status + "</span></td>";
                            htmlBuilder += "<td align=center nowrap><span class=c3>" + this.lstPickStatus[index].USER_ID + "</span></td>";
                            htmlBuilder += "</tr>";
                        }
                        htmlBuilder += "</table></Table>";
                        return [4 /*yield*/, htmlBuilder];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        ex_10 = _a.sent();
                        htmlBuilder = '';
                        this.clientErrorMsg(ex_10, 'exportReportDetails');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    PickStatusReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    PickStatusReportComponent.prototype.addDays = function (theDate, days) {
        return new Date(theDate.getTime() - days * 24 * 60 * 60 * 1000);
    };
    PickStatusReportComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    PickStatusReportComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    PickStatusReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    PickStatusReportComponent.prototype.ngOnDestroy = function () {
    };
    return PickStatusReportComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PickStatusReportComponent.prototype, "appId", void 0);
__decorate([
    core_1.ViewChild(datatable_1.DataTable),
    __metadata("design:type", datatable_1.DataTable)
], PickStatusReportComponent.prototype, "dataTableComponent", void 0);
PickStatusReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2035),
        providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, pick_pick_status_report_component_service_1.PickStatusReportService],
    }),
    __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        HttpService_1.HttpService,
        AtParConstants_1.AtParConstants,
        pick_pick_status_report_component_service_1.PickStatusReportService])
], PickStatusReportComponent);
exports.PickStatusReportComponent = PickStatusReportComponent;


/***/ }),

/***/ 1541:
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
var ReleaseOrdersComponent = (function () {
    function ReleaseOrdersComponent() {
        this.pickPlanAppId = AtParEnums_1.EnumApps.PickPlan;
    }
    return ReleaseOrdersComponent;
}());
ReleaseOrdersComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2036)
    })
], ReleaseOrdersComponent);
exports.ReleaseOrdersComponent = ReleaseOrdersComponent;


/***/ }),

/***/ 1542:
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
        this.pickplanAppId = AtParEnums_1.EnumApps.PickPlan;
    }
    return UserParametersComponent;
}());
UserParametersComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2037)
    })
], UserParametersComponent);
exports.UserParametersComponent = UserParametersComponent;


/***/ }),

/***/ 1543:
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
var PickComponent = (function () {
    function PickComponent() {
    }
    return PickComponent;
}());
PickComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2038)
    })
], PickComponent);
exports.PickComponent = PickComponent;


/***/ }),

/***/ 1736:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MT_PKPL_ORDER_PREFIX = (function () {
    function MT_PKPL_ORDER_PREFIX() {
    }
    return MT_PKPL_ORDER_PREFIX;
}());
exports.MT_PKPL_ORDER_PREFIX = MT_PKPL_ORDER_PREFIX;


/***/ }),

/***/ 1798:
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
var PickAllocateBunitService = (function () {
    function PickAllocateBunitService(httpservice) {
        this.httpservice = httpservice;
    }
    PickAllocateBunitService.prototype.getBUnits = function (bArray, userID, bUnit, description, serverUserID) {
        return this.httpservice.get({
            apiMethod: "/api/PickAllocBU/GetBUnits",
            params: {
                "bArray": bArray,
                "appId": "5",
                "userID": userID,
                "bUnit": bUnit,
                "description": description,
                "serverUserID": serverUserID
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    PickAllocateBunitService.prototype.allocateBUnits = function (userID, serverUserID, lstBUnitsAllocation, blnSearched, lstCheckedBUnits) {
        return this.httpservice.create({
            apiMethod: "/api/PickAllocBU/AllocateBUnits",
            formData: lstCheckedBUnits,
            params: {
                "appId": "5",
                "userID": userID,
                "serverUserID": serverUserID,
                "lstBUnitsAllocation": lstBUnitsAllocation,
                "searched": blnSearched
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    PickAllocateBunitService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return PickAllocateBunitService;
}());
PickAllocateBunitService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], PickAllocateBunitService);
exports.PickAllocateBunitService = PickAllocateBunitService;


/***/ }),

/***/ 1799:
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
var HttpService_1 = __webpack_require__(12);
var PickAllocatePriorityService = (function () {
    function PickAllocatePriorityService(httpservice) {
        this.httpservice = httpservice;
    }
    PickAllocatePriorityService.prototype.getLocationPriorities = function (bUnit, location) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.httpservice.getSync({
                        apiMethod: "/api/AllocatePriority/GetLocationPriorities",
                        params: {
                            "bUnit": bUnit,
                            "location": location
                        }
                    })];
            });
        });
    };
    PickAllocatePriorityService.prototype.saveLocationPriorities = function (priority, priorities) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.httpservice.create({
                        apiMethod: "/api/AllocatePriority/SaveLocationPriorities",
                        formData: priorities,
                        params: {
                            "priority": priority,
                        }
                    }).toPromise()];
            });
        });
    };
    return PickAllocatePriorityService;
}());
PickAllocatePriorityService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], PickAllocatePriorityService);
exports.PickAllocatePriorityService = PickAllocatePriorityService;


/***/ }),

/***/ 1800:
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
var PickStatusReportService = (function () {
    function PickStatusReportService(http, httpService) {
        this.http = http;
        this.httpService = httpService;
        this.http = http;
    }
    PickStatusReportService.prototype.GetPickstatusReport = function (inputxml) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/PickStatusReport/GetPickstatusReport",
                            params: {
                                "inputXml": inputxml
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return PickStatusReportService;
}());
PickStatusReportService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, HttpService_1.HttpService])
], PickStatusReportService);
exports.PickStatusReportService = PickStatusReportService;


/***/ }),

/***/ 1801:
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
var pick_component_1 = __webpack_require__(1543);
var pick_activity_report_component_1 = __webpack_require__(1531);
var pick_allocate_inventory_business_units_componet_1 = __webpack_require__(1532);
var pick_allocate_location_groups_component_1 = __webpack_require__(1533);
var pick_allocate_picking_zones_component_1 = __webpack_require__(1534);
var pick_allocate_priority_component_1 = __webpack_require__(1535);
var pick_daily_activity_component_1 = __webpack_require__(1536);
var pick_daily_user_activity_component_1 = __webpack_require__(1537);
var pick_deviation_report_component_1 = __webpack_require__(1538);
var pick_order_prefix_component_1 = __webpack_require__(1539);
var pick_pick_status_report_component_1 = __webpack_require__(1540);
var pick_release_orders_component_1 = __webpack_require__(1541);
var pick_user_parameters_component_1 = __webpack_require__(1542);
exports.routes = [
    {
        path: '',
        component: pick_component_1.PickComponent,
        children: [
            { path: 'activityreport', component: pick_activity_report_component_1.ActivityReportComponent },
            { path: 'allocateinventorybusinessunits', component: pick_allocate_inventory_business_units_componet_1.PickAllocateInventoryBusinessUnitsComponent },
            { path: 'allocatelocationgroups', component: pick_allocate_location_groups_component_1.AllocateLocationGroupsComponent },
            { path: 'allocatepickingzones', component: pick_allocate_picking_zones_component_1.AllocatePickingZonesComponent },
            { path: 'allocatepriority', component: pick_allocate_priority_component_1.AllocatePriorityComponent },
            { path: 'dailyactivity', component: pick_daily_activity_component_1.DailyActivityComponent },
            { path: 'dailyuseractivity', component: pick_daily_user_activity_component_1.DailyUserActivityComponent },
            { path: 'deviationreport', component: pick_deviation_report_component_1.DeviationReportComponent },
            { path: 'orderprefix', component: pick_order_prefix_component_1.OrderPrefixComponent },
            { path: 'pickstatusreport', component: pick_pick_status_report_component_1.PickStatusReportComponent },
            { path: 'releaseorders', component: pick_release_orders_component_1.ReleaseOrdersComponent },
            { path: 'userparameters', component: pick_user_parameters_component_1.UserParametersComponent },
        ]
    }
];
var PickRoutingModule = (function () {
    function PickRoutingModule() {
    }
    return PickRoutingModule;
}());
PickRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.routes)],
        exports: [router_1.RouterModule]
    })
], PickRoutingModule);
exports.PickRoutingModule = PickRoutingModule;


/***/ }),

/***/ 1802:
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
var pick_component_1 = __webpack_require__(1543);
var pick_activity_report_component_1 = __webpack_require__(1531);
var pick_allocate_inventory_business_units_componet_1 = __webpack_require__(1532);
var pick_allocate_location_groups_component_1 = __webpack_require__(1533);
var pick_allocate_picking_zones_component_1 = __webpack_require__(1534);
var pick_allocate_priority_component_1 = __webpack_require__(1535);
var pick_daily_activity_component_1 = __webpack_require__(1536);
var pick_daily_user_activity_component_1 = __webpack_require__(1537);
var pick_deviation_report_component_1 = __webpack_require__(1538);
var pick_order_prefix_component_1 = __webpack_require__(1539);
var pick_pick_status_report_component_1 = __webpack_require__(1540);
var pick_release_orders_component_1 = __webpack_require__(1541);
var pick_user_parameters_component_1 = __webpack_require__(1542);
var pick_routing_module_1 = __webpack_require__(1801);
var shared_module_1 = __webpack_require__(632);
var PickModule = (function () {
    function PickModule() {
    }
    return PickModule;
}());
PickModule = __decorate([
    core_1.NgModule({
        imports: [
            pick_routing_module_1.PickRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            pick_component_1.PickComponent,
            pick_activity_report_component_1.ActivityReportComponent,
            pick_allocate_inventory_business_units_componet_1.PickAllocateInventoryBusinessUnitsComponent,
            pick_allocate_location_groups_component_1.AllocateLocationGroupsComponent,
            pick_allocate_picking_zones_component_1.AllocatePickingZonesComponent,
            pick_allocate_priority_component_1.AllocatePriorityComponent,
            pick_daily_activity_component_1.DailyActivityComponent,
            pick_daily_user_activity_component_1.DailyUserActivityComponent,
            pick_deviation_report_component_1.DeviationReportComponent,
            pick_order_prefix_component_1.OrderPrefixComponent,
            pick_pick_status_report_component_1.PickStatusReportComponent,
            pick_release_orders_component_1.ReleaseOrdersComponent,
            pick_user_parameters_component_1.UserParametersComponent
        ]
    })
], PickModule);
exports.PickModule = PickModule;


/***/ }),

/***/ 2026:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <atpar-activity-report [productId]=\"pickProductId\"></atpar-activity-report>\r\n</div>";

/***/ }),

/***/ 2027:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\" *ngIf=\"true\">\r\n            <br>\r\n            <div class=\"col-xs-12 col-sm-12 col-md-12\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px;\">\r\n                        <form class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Org Group ID </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpIDData}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupDD\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">User ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstUsers\" [id]=\"'ddllstUsers'\" [required]=\"true\" [(ngModel)]=\"selectedDropDownUserId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddlUserChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Business Unit </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-ac-server [(ngModel)]=\"selectedBunit\" [ngModelOptions]=\"{standalone: true}\" [suggestions]=\"lstFilteredBUnits\" (completeMethod)=\"fillBUnitsAuto($event)\"></atpar-ac-server>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"clear\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Description</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"selectedDescription\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"''\" [id]=\"'txtdescription'\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"getAllBUnits()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n\r\n                        <div class=\"col-xs-12\" *ngIf=\"isVisible\">\r\n                            <div class=\"container\">\r\n                                <atpar-datatable [value]=\"lstDBData\" #dt [style]=\"{'width':'100%'}\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"pazeSize\" (filteredData)=\"filterdata($event)\"\r\n                                                 [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [responsive]=\"true\">\r\n\r\n\r\n\r\n                                    <p-column [style]=\"{'width':'7%', 'text-align':'center'}\" header=\"Select\">\r\n                                        <template pTemplate=\"filter\" let-col>\r\n                                            <ul class=\"list-inline li-all-none\">\r\n                                                <li>\r\n\r\n                                                    <span (click)=\"checkAll()\" style=\"cursor:pointer\">All</span>\r\n                                                </li> |\r\n                                                <li>\r\n                                                    <span (click)=\"unCheckAll()\" style=\"cursor:pointer\">None</span>\r\n\r\n                                                </li>\r\n                                            </ul>\r\n                                        </template>\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <atpar-switch (change)=\"selectedRow(ven,$event)\" [(ngModel)]=\"ven.checkvalue\"></atpar-switch>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column [style]=\"{'width':'10%'}\" field=\"BUSINESS_UNIT\" header=\"Business Unit\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n                                    <p-column [style]=\"{'width':'40%'}\" field=\"DESCR\" header=\"Description\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n                                    <p-column header=\"Default Printer\" field=\"DEFAULT_PRINTER\" sortable=\"custom\" (sortFunction)=\"customSort($event)\">\r\n\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n\r\n                                            <atpar-text [name]=\"txtSCorder\" [id]=\"ven.DEFAULT_PRINTER_ID\" [(ngModel)]=\"ven.DEFAULT_PRINTER\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n\r\n                                        </template>\r\n\r\n\r\n                                    </p-column>\r\n                                    <p-column [style]=\"{'width':'25%'}\" field=\"USER_ID\" header=\"User\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n\r\n                                </atpar-datatable>\r\n                            </div>\r\n                            <br>\r\n\r\n                            <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                <button class=\"btn btn-purple sbtn\" id=\"btnsubmitForGrid\" (click)=\"allocateBUnits()\">Submit &nbsp;<i class=\"fa fa-check\"></i></button>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n";

/***/ }),

/***/ 2028:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <atpar-allocate-location-groups [appId]=\"pickPlanAppId\"></atpar-allocate-location-groups>\r\n\r\n</div>";

/***/ }),

/***/ 2029:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\" *ngIf=\"true\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px;\">\r\n                        <form class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Org Group ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpIDData}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupDD\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">User ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstUsers\" [id]=\"'ddllstUsers'\" [required]=\"true\" [(ngModel)]=\"selectedDropDownUserId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddlUserChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Zone</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"zoneGpID\" [name]=\"txtzoneGpID\" [validations]=\"'except_less_greater_symbols'\" [id]=\"'zoneGpID'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"clearfix\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Display</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstDisplay\" [id]=\"'ddllstDisplay'\" [required]=\"false\" [(ngModel)]=\"selectedDropDownDisplay\" [ngModelOptions]=\"{standalone: true}\" (onChange)=\"ddlUserChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-2 form-group\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"getUserStorageZones()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"col-xs-12 table-responsive\" *ngIf=\"showGrid\">\r\n                            <div class=\"container\">\r\n                                <span>\r\n                                    {{zonesAllocatedMsg}}\r\n                                </span>\r\n                                <span class=\"text-primary\">\r\n                                    <strong>{{this.zonesAllocatedCount}}</strong>&nbsp; Out Of &nbsp;<strong>{{this.zonesDBCount}} </strong> Allocated Zones For User\r\n                                </span>\r\n                                <br>\r\n                                <atpar-datatable [value]=\"lstDBData\" [style]=\"{'width':'100%'}\" [paginator]=\"true\" [pageLinks]=\"3\" (filteredData)=\"myfilterdata($event)\" [rows]=\"recordsPerPageSize\" [globalFilter]=\"gb\" [rowsPerPageOptions]=\"[10,20, 30, 40, 50, 60, 70, 80, 90, 100]\" [responsive]=\"true\">\r\n                                    <p-column header=\"Select\" [style]=\"{'width':'7%', 'text-align':'center'}\">\r\n                                        <template pTemplate=\"filter\" let-col>\r\n                                            <ul class=\"list-inline li-all-none\">\r\n                                                <li>\r\n                                                    <span (click)=\"checkAll()\" style=\"cursor:pointer\">All</span>\r\n                                                </li> |\r\n                                                <li>\r\n                                                    <span (click)=\"unCheckAll()\" style=\"cursor:pointer\">None</span>\r\n                                                </li>\r\n                                            </ul>\r\n                                        </template>\r\n                                        <template let-zone=\"rowData\" pTemplate=\"body\">\r\n                                            <atpar-switch (change)=\"selectedRow(zone,$event)\" [(ngModel)]=\"zone.checkvalue\"></atpar-switch>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"STORAGE_ZONE_ID\" header=\"Zone\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'20%'}\"> </p-column>\r\n                                    <p-column field=\"STORAGE_ZONE_DESCR\" header=\"Description\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'30%'}\"> </p-column>\r\n                                    <p-column field=\"USER_ID\" header=\"User\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [style]=\"{'width':'40%'}\"> </p-column>\r\n                                </atpar-datatable>\r\n                            </div>\r\n                            <br>\r\n                            <div class=\"col-xs-12 col-md-4 col-md-offset-5 col-sm-6 col-sm-offset-5\">\r\n                                <button class=\"btn btn-purple sbtn\" id=\"btnsubmitForGrid\" (click)=\"allocateZonePickingZones()\">Submit &nbsp;<i class=\"fa fa-check\"></i></button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>";

/***/ }),

/***/ 2030:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\" *ngIf=\"true\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px;\">\r\n                        <form class=\"form-horizontal form-label-left\" novalidate>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Org Group ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label id=\"lblOrgGrpId\" class=\"control-label lbl-left\" *ngIf=\"blnddlOrgGrpID\">{{selectedOrgGrpName}}</label>\r\n                                        <atpar-select [options]=\"ddOrgGroupdata\" [required]=\"true\"  name=\"'ddlOrgGroup'\" [id]=\"'ddlOrgGroup'\" (onChange)=\"onChange($event)\" [(ngModel)]=\"selectedOrgGrpId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"showddlOrgGrpID\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Business Unit</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstBunit\"   [id]=\"'lstBunit'\" [required]=\"true\"   [(ngModel)]=\"selectedBunit\" (onChange)=\"onBunitChange($event)\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Location</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"location\" [name]=\"'txtloc'\"   [id]=\"'txtloc'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"clearfix\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\"> Assign Priority</label>\r\n                                    <div class=\"col-xs-12 col-sm-3 col-md-3\">\r\n                                        <atpar-text [(ngModel)]=\"assignpriority\" [name]=\"'txtPriority'\" [validations]=\"'NUMBER,MAX=2,Mandatory'\" [id]=\"'txtPriority'\" [ngModelOptions]=\"{standalone: true}\" (bindModelDataChange)=\"bindModelDataChange($event)\"></atpar-text>\r\n                                    </div>\r\n                                    <div class=\"col-xs-12 col-sm-5 col-md-5\">\r\n                                        <label class=\"control-label\" for=\"\"> to Selected records</label>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-2 form-group\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"go()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"col-xs-12\" *ngIf=\"pop\">\r\n                            <div class=\"container\">\r\n                                <atpar-datatable [value]=\"priorities\" [paginator]=\"true\" [pageLinks]=\"3\" \r\n                                                 [rows]=\"recordsperpage\" expandableRows=\"true\" \r\n                                                 [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" \r\n                                                 [globalFilter]=\"gb\" [responsive]=\"true\" (filteredData)=\"myfilterdata($event)\">\r\n                                    <!--<p-column expander=\"true\" styleClass=\"col-icon\"></p-column>--> \r\n                                    <p-column field=\"CHK_VALUE\" [style]=\"{'width':'7%', 'text-align':'center'}\" header=\"Select\">\r\n                                        <template pTemplate=\"filter\" let-col>\r\n                                            <ul class=\"list-inline li-all-none\">\r\n                                                <li>\r\n                                                    <span (click)=\"checkAll()\" style=\"cursor:pointer\">All</span>\r\n                                                </li> |\r\n                                                <li>\r\n                                                    <span (click)=\"unCheckAll()\" style=\"cursor:pointer\">None</span>\r\n                                                </li>\r\n                                            </ul>\r\n                                        </template>\r\n                                        <template let-col let-allocate=\"rowData\" pTemplate=\"body\">\r\n                                            <atpar-switch [checked]=allocate[col.field] [(ngModel)]=\"allocate[col.field]\" name=\"changeStatus\" (change)=\"changeStatus(allocate,$event)\"></atpar-switch>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"BUSINESS_UNIT\" header=\"Business Unit\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'10%'}\"> </p-column>\r\n                                    <p-column field=\"LOCATION\" header=\"Location\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'16%'}\"> </p-column>\r\n                                    <p-column field=\"DESCR\" header=\"Description\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'54%'}\"> </p-column>\r\n                                    <p-column field=\"PRIORITY\" header=\"Order\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'20%'}\"> </p-column>\r\n\r\n                                    <!--<p-footer></p-footer>-->\r\n                                </atpar-datatable>\r\n                            </div>\r\n                            <br>\r\n                            <div class=\"col-xs-12 col-md-4 col-md-offset-5\">\r\n                                <button class=\"btn btn-purple sbtn\" [disabled]=\"disableButton\" (click)=\"saveAllocatePriorites()\">Submit &nbsp;<i class=\"fa fa-check\"></i></button>\r\n                                <!--  <button class=\"btn btn-purple sbtn\" (click)=\"hideDialog()\"><i class=\"fa fa-arrow-left\"></i> &nbsp;Go Back</button> -->\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl> \r\n</div>\r\n";

/***/ }),

/***/ 2031:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>This is Pick Daily Activity Screen</span>\r\n</div>";

/***/ }),

/***/ 2032:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>This is Pick Daily User Activity Screen</span>\r\n</div>";

/***/ }),

/***/ 2033:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>this is pick DeviationReportComponent screen</span>\r\n</div>";

/***/ }),

/***/ 2034:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\" *ngIf=\"true\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:10px 0 0 0;\">\r\n                        <div class=\"col-xs-12 table-responsive\">\r\n                            <div class=\"container\">\r\n                                <atpar-datatable [value]=\"lstDBData\" [style]=\"{'width':'75%'}\" [paginator]=\"true\" [pageLinks]=\"3\" (filteredData)=\"myfilterdata($event)\" [rows]=\"recordsPerPageSize\" [globalFilter]=\"gb\" [rowsPerPageOptions]=\"[10,20, 30, 40, 50, 60, 70, 80, 90, 100]\" [responsive]=\"true\">\r\n                                    <p-column [style]=\"{'width':'20%', 'text-align':'center'}\" header=\"Select\">\r\n                                        <template pTemplate=\"filter\" let-col>\r\n                                            <ul class=\"list-inline li-all-none\">\r\n                                                <li><span (click)=\"checkAll()\" style=\"cursor:pointer\">All</span></li> |\r\n                                                <li><span (click)=\"unCheckAll()\" style=\"cursor:pointer\">None</span></li>\r\n                                            </ul>\r\n                                        </template>\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <atpar-switch (change)=\"selectedRow(ven,$event)\" [(ngModel)]=\"ven.checkvalue\"></atpar-switch>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column [style]=\"{'width':'55%'}\" field=\"BEG_SEQ\" header=\"Prefix\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n                                   \r\n                                </atpar-datatable>\r\n                            </div> \r\n                            <br>\r\n                            <div class=\"col-xs-12 col-md-4 col-md-offset-5 col-sm-6 col-sm-offset-5\">\r\n                                <button class=\"btn btn-purple sbtn\" id=\"btnsubmitForGrid\" (click)=\"saveOrderPrefixSetUp()\">Submit &nbsp; <i class=\"fa fa-check\"></i></button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<style>\r\n    label {\r\n        padding-top: 4px;\r\n    }\r\n</style>";

/***/ }),

/***/ 2035:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:10px 0 0 0;\">\r\n                        <form class=\"form-horizontal form-label-left\" novalidate>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"pull-right\" *ngIf=\"showGrid\">\r\n                                    <ul class=\"list-inline\">\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-envelope-o fa-bg-lg bg-blue\" aria-hidden=\"true\" style=\"cursor:pointer\" id=\"imgMail\" title=\"Send mail\" (click)=\"onSendMailIconClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-print fa-bg-lg bg-blue\" aria-hidden=\"true\" style=\"cursor:pointer\" id=\"imgPrint\" title=\"Print\" (click)=\"onPrintClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-file-excel-o fa-bg-lg bg-blue\" aria-hidden=\"true\" style=\"cursor:pointer\" id=\"imgExcel\" title=\"Excel Format\" (click)=\"onExportToExcelClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                    </ul>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Org Group ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label class=\"control-label lbl-left\" *ngIf=\"!showOrgDropdown\">{{orgGroupId}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroupIds\" *ngIf=\"showOrgDropdown\" [required]=\"true\" [id]=\"'ddlMasterOrgGrp'\" [(ngModel)]=\"orgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddlOrgGroup_SelectedIndexChanged($event)\"></atpar-select>\r\n                                        \r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">B Unit</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-ac-server [(ngModel)]=\"businessUnit\" [suggestions]=\"lstFilterBUnits\" [minLength]=\"1\"  (completeMethod)=\"filterBUnits($event)\" [mandatory]=\"true\" [id]=\"'acBUnit'\" field=\"BUnit\" [ngModelOptions]=\"{standalone: true}\"></atpar-ac-server>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Location</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"location\" [name]=\"txtDepID\" [id]=\"'txtDepID'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Order #</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"order\" [name]=\"txtDepID\" [id]=\"'txtDepID'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Batch ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"batch\" [name]=\"txtDepID\" [id]=\"'txtDepID'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Status</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstStatus\" [(ngModel)]=\"status\" [id]=\"'ddlStatus'\" [ngModelOptions]=\"{standalone: true}\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">From Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <p-calendar [showIcon]=\"true\" [id]=\"'fromDate'\" [(ngModel)]=\"fromDate\" [placeholder]=\"'From Date'\" [dateFormat]=\"'mm/dd/yy'\" [required]=\"true\" [readonlyInput]=\"true\" [ngModelOptions]=\"{standalone: true}\" [monthNavigator]=\"true\"  [yearNavigator]=\"true\"  yearRange=\"1950:2050\"></p-calendar>\r\n                                        <!--<p-calendar [showIcon]=\"true\" [id]=\"'FromDatePicker'\" [(ngModel)]=\"fromDate\" [placeholder]=\"'From Date'\" [dateFormat]=\"'mm/dd/yy'\" [required]=\"true\" [readonlyInput]=\"true\" [ngModelOptions]=\"{standalone: true}\"></p-calendar>-->\r\n                                    </div>\r\n                                </div>                                \r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">To Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <p-calendar [showIcon]=\"true\" [id]=\"'toDate'\" [(ngModel)]=\"toDate\" [placeholder]=\"'To Date'\" [dateFormat]=\"'mm/dd/yy'\" [required]=\"true\" [readonlyInput]=\"true\" [ngModelOptions]=\"{standalone: true}\" [monthNavigator]=\"true\"  [yearNavigator]=\"true\"  yearRange=\"1950:2050\"></p-calendar>\r\n                                        <!--<p-calendar [showIcon]=\"true\" [id]=\"'ToDatePicker'\" [(ngModel)]=\"toDate\" [placeholder]=\"'To Date'\" [dateFormat]=\"'mm/dd/yy'\" [required]=\"true\" [readonlyInput]=\"true\" [ngModelOptions]=\"{standalone: true}\"></p-calendar>-->\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"btnGo_Click()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <br />\r\n                        \r\n                        <div style=\"clear:both;\"></div>\r\n                        <br />\r\n                        <div class=\"col-xs-12\">\r\n                            <div class=\"container\" *ngIf=\"showGrid\">\r\n                                <span class=\"text-primary\" style=\"float:left\">\r\n                                    Pick Status Report between {{this.fromDateforDisplay}} and {{this.toDateforDisplay}}\r\n                                </span>\r\n                                <atpar-datatable [value]=\"lstPickStatus\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"pageSize\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n                                    <p-column field=\"BUSINESS_UNIT\" header=\"B Unit\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"ORDER_NO\" header=\"Order NO\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"PICK_BATCH_ID\" header=\"Batch ID\" [sortable]=\"true\" [style]=\"{'text-align':'right'}\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"LOCATION\" header=\"Location\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" ></p-column>\r\n                                    <p-column field=\"UPDATETIME\" header=\"Order Date\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" ></p-column>\r\n                                    <p-column field=\"DOWNLOADTIME\" header=\"Picked or Downloaded Date Time\" [style]=\"{'width':'20%'}\" [sortable]=\"true\"  [filter]=\"true\" filterPlaceholder=\"Search\" ></p-column>\r\n                                    <p-column field=\"Status\" header=\"Status\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" ></p-column>\r\n                                    <p-column field=\"USER_ID\" header=\"User\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" ></p-column> \r\n                                </atpar-datatable>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n<mail-dialog header=\"Enter Recipient`s Email Address\" [width]=\"450\" (onClose)=\"closeMailPopup()\" [(visible)]=\"isMailDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\r\n    <div class=\"ui-grid ui-grid-responsive ui-fluid\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                <span>To : </span>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-8 col-xs-8\">\r\n                <atpar-text [(ngModel)]=\"toMailAddr\" [name]=\"txtToMailAddr\" [id]=\"'txtToMailAddr'\"></atpar-text>\r\n            </div>\r\n            <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                <span><button class=\"btn btn-purple sbtn\" (click)=\"onSendMailClick()\">Send &nbsp;<i class=\"fa fa-share-square-o\" aria-hidden=\"true\"></i></button> </span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</mail-dialog>\r\n<style>\r\n    .modal-content {\r\n        top: 50% !important;\r\n    }\r\n\r\n    ul.right-images li img {\r\n        width: 60px !important;\r\n        cursor: pointer;\r\n    }\r\n</style>\r\n\r\n";

/***/ }),

/***/ 2036:
/***/ (function(module, exports) {

module.exports = "\r\n<div>\r\n    <atpar-release-Orders [appId]=\"pickPlanAppId\"></atpar-release-Orders>\r\n    \r\n</div>\r\n";

/***/ }),

/***/ 2037:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <atpar-user-parameters [appId]=\"pickplanAppId\"></atpar-user-parameters>\r\n    <!--<span>this is pick user parameters screen.</span>-->\r\n</div>";

/***/ }),

/***/ 2038:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <router-outlet></router-outlet>\r\n</div>";

/***/ })

});
//# sourceMappingURL=14.601fce7cdc00a672fc7a.chunk.js.map