webpackJsonp([16],{

/***/ 1620:
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
var stis_allocate_destination_locations_services_1 = __webpack_require__(1851);
var AtParEnums_1 = __webpack_require__(14);
var HttpService_1 = __webpack_require__(12);
var AtParStatusCodes_1 = __webpack_require__(50);
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var AtParConstants_1 = __webpack_require__(31);
var linq_es5_1 = __webpack_require__(115);
var AllocateDestinationLocationsComponent = (function () {
    function AllocateDestinationLocationsComponent(allocateDestinationLocationsService, spinnerService, atParCommonService, httpService, atParConstant) {
        this.allocateDestinationLocationsService = allocateDestinationLocationsService;
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.appID = 10;
        this.deviceTokenEntry = [];
        this.selectedUserIDList = "";
        this.blnSortByColumn = true;
        this.dataCheckedSorting = [];
        this.orgGrpID = "";
        this.orgGrpIDData = "";
        this.userID = "";
        this.seletedStatus = "";
        //for orgGrpDropdown
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        //for userID DropDown
        this.blnShowUserIDLabel = false;
        this.blnShowUserIDDD = false;
        this.selectedOrgGroupId = "";
        this.selectedDropDownUserId = "";
        this.selectedBunit = "";
        this.selectedLocation = "";
        this.isVisible = false;
        this.growlMessage = [];
        this.lstLocations = [];
        this.blnsortbycolumn = true;
        this.custom = "custom";
        this.preField = "";
    }
    AllocateDestinationLocationsComponent.prototype.ngOnInit = function () {
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedLocations = new Array();
        this.dataCheckedSorting = new Array();
        this.dataUncheckedSorting = new Array();
        this.lstFilteredLocation = new Array();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.displayOptions = [];
        this.displayOptions.push({ label: 'ALL', value: 'A' });
        this.displayOptions.push({ label: 'Allocated', value: 'L' });
        this.displayOptions.push({ label: 'Unallocated', value: 'U' });
        this.seletedStatus = "A";
        this.bindOrgGroups();
        this.ddllBunit = [];
        this.ddllBunit.push({ label: "Select BUnit", value: "Select BUnit" });
        this.pazeSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
    };
    AllocateDestinationLocationsComponent.prototype.bindOrgGroups = function () {
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
                                            _this.bindUsersList();
                                            _this.populateBusinessUnits();
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
    AllocateDestinationLocationsComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isVisible = false;
                        this.growlMessage = [];
                        if (this.selectedOrgGroupId == "Select One") {
                            this.selectedBunit = "Select BUnit";
                            this.selectedDropDownUserId = "Select User";
                            this.lstUsers = [];
                            this.ddllBunit = [];
                            this.ddllBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                            this.lstUsers.push({ label: "Select User", value: "Select User" });
                            return [2 /*return*/];
                        }
                        this.selectedBunit = "Select BUnit";
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
                        this.clientErrorMsg(ex_2, "ddlOrgGrpIdChanged");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AllocateDestinationLocationsComponent.prototype.ddlUserChange = function () {
        this.isVisible = false;
    };
    AllocateDestinationLocationsComponent.prototype.ddl_Change = function () {
        this.isVisible = false;
    };
    AllocateDestinationLocationsComponent.prototype.bindUsersList = function () {
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
                        return [4 /*yield*/, this.atParCommonService.getUsersList(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_1.EnumApps.StockIssue, this.orgGroupIDForDBUpdate)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.userDataList = data.DataList;
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstUsers.push({
                                                label: data.DataList[i].FULLNAME,
                                                value: data.DataList[i].USER_ID
                                            });
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
    AllocateDestinationLocationsComponent.prototype.selectedRow = function (values, event) {
        if (event == true) {
            values.CHK_VALUE = 1;
        }
        else {
            values.CHK_VALUE = 0;
        }
        for (var i = 0; i < this.lstCheckedLocations.length; i++) {
            if (this.lstCheckedLocations[i].LOCATION_ID === values.LOCATION_ID) {
                var index = this.lstCheckedLocations.indexOf(this.lstCheckedLocations[i], 0);
                this.lstCheckedLocations.splice(index, 1);
            }
        }
        this.lstCheckedLocations.push(values);
    };
    AllocateDestinationLocationsComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstBUnits = [];
                        this.ddllBunit = [];
                        this.ddllBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                        isOrgBUnitsExist = false;
                        this.spinnerService.start();
                        if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.allocateDestinationLocationsService.getAllocInvBUnits(this.appID, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate)
                                .forEach(function (res) {
                                _this.growlMessage = [];
                                if (res.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                                    _this.spinnerService.stop();
                                    return;
                                }
                                switch (res.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        _this.ddllBunit = [];
                                        _this.lstBUnits = res.DataList;
                                        _this.ddllBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                                        for (var i = 0; i < _this.lstBUnits.length; i++) {
                                            _this.ddllBunit.push({ label: _this.lstBUnits[i], value: _this.lstBUnits[i] });
                                        }
                                        isOrgBUnitsExist = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.isVisible = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.isVisible = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.isVisible = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        isOrgBUnitsExist = false;
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
    AllocateDestinationLocationsComponent.prototype.checkAll = function () {
        this.lstCheckedLocations = [];
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
            if (this.EndIndex > this.lstgridfilterData.length) {
                this.EndIndex = this.lstgridfilterData.length;
            }
            for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                this.lstgridfilterData[i].checkvalue = true;
                this.lstgridfilterData[i].CHK_VALUE = 1;
                this.lstCheckedLocations.push(this.lstgridfilterData[i]);
            }
        }
        else {
            if (this.EndIndex > this.lstDBData.length) {
                this.EndIndex = this.lstDBData.length;
            }
            for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                this.lstDBData[i].checkvalue = true;
                this.lstDBData[i].CHK_VALUE = 1;
                this.lstCheckedLocations.push(this.lstDBData[i]);
            }
        }
    };
    AllocateDestinationLocationsComponent.prototype.unCheckAll = function () {
        this.lstCheckedLocations = [];
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
            if (this.EndIndex > this.lstgridfilterData.length) {
                this.EndIndex = this.lstgridfilterData.length;
            }
            for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                this.lstgridfilterData[i].checkvalue = false;
                this.lstgridfilterData[i].CHK_VALUE = 0;
                this.lstCheckedLocations.push(this.lstgridfilterData[i]);
            }
        }
        else {
            if (this.EndIndex > this.lstDBData.length) {
                this.EndIndex = this.lstDBData.length;
            }
            for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                this.lstDBData[i].checkvalue = false;
                this.lstDBData[i].CHK_VALUE = 0;
                this.lstCheckedLocations.push(this.lstDBData[i]);
            }
        }
    };
    AllocateDestinationLocationsComponent.prototype.BindDataGrid = function () {
        try {
            var lstDBDataList;
            this.growlMessage = [];
            this.spinnerService.stop();
            if (this.seletedStatus === "L") {
                this.lstDBData = this.lstDBData.filter(function (x) { return x.checkvalue == true; });
                if (this.lstDBData.length == 0) {
                    this.isVisible = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                    return;
                }
            }
            else if (this.seletedStatus === "U") {
                this.lstDBData = this.lstDBData.filter(function (x) { return x.checkvalue == false; });
                if (this.lstDBData.length == 0) {
                    this.isVisible = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                    return;
                }
            }
            if (this.lstDBData != null && this.lstDBData.length > 0) {
                this.isVisible = true;
            }
            else {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No data found" });
            }
            this.lstCheckedLocations = new Array();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    };
    AllocateDestinationLocationsComponent.prototype.filterdata = function (event) {
        this.lstgridfilterData = [];
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    //customSort1(event) {
    //    try {
    //        var element = event;
    //        this.lstDBData = [];
    //        this.blnsortbycolumn = !this.blnsortbycolumn;
    //        this.sortedcheckedrec = [];
    //        this.sorteduncheckedrec = [];
    //        this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
    //            if (a[element.field] < b[element.field])
    //                return -1;
    //            if (a[element.field] > b[element.field])
    //                return 1;
    //            return 0;
    //        });
    //        this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
    //            if (a[element.field] < b[element.field])
    //                return -1;
    //            if (a[element.field] > b[element.field])
    //                return 1;
    //            return 0;
    //        });
    //        if (this.blnsortbycolumn == false) {
    //            this.lstDBData = [];
    //            this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
    //        }
    //        else {
    //            this.lstDBData = [];
    //            this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
    //        }
    //        this.sortedcheckedrec = [];
    //        this.sorteduncheckedrec = [];
    //        this.lstCheckedLocations = new Array<MT_STIS_DEST_LOC_ALLOCATION>();
    //    }
    //    catch (ex) {
    //        this.clientErrorMsg(ex, "customSort");
    //    }
    //}
    AllocateDestinationLocationsComponent.prototype.customSort = function (event, field) {
        this.blnSortByColumn = !this.blnSortByColumn;
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
        if (element.field == 'BUSINESS_UNIT') {
            var filterlist = linq_es5_1.asEnumerable(this.lstDBData).Distinct(function (x) { return x.BUSINESS_UNIT; }).ToArray();
            if (filterlist != null && filterlist.length == 1) {
                return;
            }
        }
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
            this.lstDBData = [];
            //if (this.blnSortByColumn == false) {
            //    this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
            //}
            //else {
            //  this.sorteduncheckedrec = asEnumerable(this.sorteduncheckedrec).OrderBy(a => (a.BUSINESS_UNIT)).ToArray();//.ThenByDescending(a => a.LOCATION_ID).ToArray();
            this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
            // }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    };
    AllocateDestinationLocationsComponent.prototype.getDesLocations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lstBUnitsArray, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isVisible = false;
                        this.lstgridfilterData = null;
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "") {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
                                return [2 /*return*/];
                            }
                        }
                        if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === undefined || this.selectedDropDownUserId == "") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User ID' });
                            this.isVisible = false;
                            return [2 /*return*/, false];
                        }
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        lstBUnitsArray = void 0;
                        if (this.lstBUnits == undefined || this.lstBUnits.length == 0) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Inventory Business Units' });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        if (this.selectedBunit == 'Select BUnit' || this.selectedBunit == '' || this.selectedBunit == undefined) {
                            if (this.lstBUnits == undefined) {
                                lstBUnitsArray = null;
                            }
                            else {
                                lstBUnitsArray = this.lstBUnits;
                            }
                        }
                        else {
                            lstBUnitsArray = [];
                            lstBUnitsArray.push(this.selectedBunit);
                        }
                        if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                            this.selectedUserIDList = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        }
                        else {
                            this.selectedUserIDList = this.selectedDropDownUserId;
                        }
                        this.lstDBData = new Array();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.allocateDestinationLocationsService.getDestinationLocations(lstBUnitsArray, this.selectedLocation, this.selectedUserIDList, this.orgGroupIDForDBUpdate, this.selectedDropDownUserId)
                                .forEach(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstDBData = [];
                                        _this.lstDBData = response.DataList;
                                        _this.lstLocations = [];
                                        for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                            _this.lstLocations.push(_this.lstDBData[i]);
                                            if (_this.lstDBData[i].CHK_ALLOCATED == 1) {
                                                _this.lstDBData[i].checkvalue = true;
                                            }
                                            else {
                                                _this.lstDBData[i].checkvalue = false;
                                            }
                                        }
                                        _this.BindDataGrid();
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
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "getDesLocations");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateDestinationLocationsComponent.prototype.allocateDestinationLocatons = function () {
        var _this = this;
        if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User ID' });
            return false;
        }
        try {
            this.spinnerService.start();
            this.allocateDestinationLocationsService.allocatedDestLocations(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedDropDownUserId, this.lstDBData, true, this.selectedBunit)
                .subscribe(function (response) {
                _this.growlMessage = [];
                switch (response.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                        _this.selectedDropDownUserId = "";
                        _this.selectedLocation = "";
                        _this.selectedBunit = "";
                        _this.lstCheckedLocations = new Array();
                        _this.isVisible = false;
                        _this.spinnerService.stop();
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
            this.clientErrorMsg(ex, "allocateDestinationLocatons");
        }
    };
    AllocateDestinationLocationsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    AllocateDestinationLocationsComponent.prototype.fillLocationsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                this.lstFilteredLocation = [];
                query = event.query;
                this.lstFilteredLocation = this.filteredLoations(query, this.lstLocations);
                return [2 /*return*/];
            });
        });
    };
    AllocateDestinationLocationsComponent.prototype.filteredLoations = function (query, deslocatiions) {
        try {
            var filtered = [];
            deslocatiions = linq_es5_1.asEnumerable(deslocatiions).Distinct(function (x) { return x.LOCATION_ID; }).ToArray();
            if (query == "%") {
                for (var i = 0; i < deslocatiions.length; i++) {
                    var desLocValue = deslocatiions[i].LOCATION_ID;
                    filtered.push(desLocValue);
                }
            }
            else {
                if (query.length >= 1) {
                    for (var i = 0; i < deslocatiions.length; i++) {
                        var desLocValue = deslocatiions[i].LOCATION_ID;
                        if (desLocValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            filtered.push(desLocValue);
                        }
                    }
                }
            }
            return filtered;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "allocateDestinationLocatons");
        }
    };
    AllocateDestinationLocationsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstUsers = null;
        this.lstOrgGroups = null;
        this.lstBUnits = null;
        this.lstFilteredLocation = null;
        this.lstCheckedLocations = null;
        this.lstDBData = null;
        this.orgGroupData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.appID = -1;
        this.ddllBunit = null;
        this.selectedLocation = null;
    };
    return AllocateDestinationLocationsComponent;
}());
AllocateDestinationLocationsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2114),
        providers: [stis_allocate_destination_locations_services_1.AllocateDestinationLocationsService, HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
    }),
    __metadata("design:paramtypes", [stis_allocate_destination_locations_services_1.AllocateDestinationLocationsService,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        HttpService_1.HttpService,
        AtParConstants_1.AtParConstants])
], AllocateDestinationLocationsComponent);
exports.AllocateDestinationLocationsComponent = AllocateDestinationLocationsComponent;


/***/ }),

/***/ 1621:
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
var AtParEnums_1 = __webpack_require__(14);
var stis_allocate_distribution_types_service_1 = __webpack_require__(1852);
var AtParWebApiResponse_1 = __webpack_require__(1370);
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var HttpService_1 = __webpack_require__(12);
var AtParConstants_1 = __webpack_require__(31);
var linq_es5_1 = __webpack_require__(115);
var MT_ATPAR_SECURITY_AUDIT_1 = __webpack_require__(325);
var datatable_1 = __webpack_require__(71);
var AllocateDistributionTypesComponent = (function () {
    function AllocateDistributionTypesComponent(spinnerService, commonService, httpService, distribTypesService, atParConstant) {
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.httpService = httpService;
        this.distribTypesService = distribTypesService;
        this.atParConstant = atParConstant;
        this.blnsortbycolumn = true;
        this.loading = true;
        this.dataGrid = false;
        this._deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstOrgGroups = [];
        this.ddlUserId = [];
        this.ddlDisplay = [];
        this.lstDistribData = [];
        this.lstgridfilterData = null;
        this.dataCheckedSorting = [];
        this.sortField = "";
        this.startIndex = 0;
        this.auditSatus = "";
        this.distribType = "";
        this.selectedOrgGroupID = "";
        this.preField = "";
        this.lstAuditData = [];
    }
    AllocateDistributionTypesComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.endIndex = +sessionStorage.getItem("RecordsEndindex");
                        //   this.lstCheckedDistribTypes = new Array<MT_STIS_DISTRIB_TYPE>();
                        this.dataCheckedSorting = new Array();
                        this.dataUncheckedSorting = new Array();
                        this.appID = (AtParEnums_1.EnumApps.StockIssue).toString();
                        this.menuCode = 'mt_stis_allocate_dist_types_setup.aspx';
                        this.ddlDisplay.push({ label: 'All', value: 'A' });
                        this.ddlDisplay.push({ label: 'Allocated', value: 'AL' });
                        this.ddlDisplay.push({ label: 'UnAllocated', value: 'N' });
                        this.selectedDisplay = this.ddlDisplay[0].value;
                        this.spinnerService.start();
                        this.checkAuditAllowed();
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 1:
                        _a.sent();
                        if (this.blnShowOrgGroupID) {
                            this.ddlUserId = [];
                            this.ddlUserId.push({ label: "Select User", value: "Select User" });
                        }
                        this.pageSize = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        exMsg_1 = _a.sent();
                        this.clientErrorMsg(exMsg_1, 'ngOnInit');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateDistributionTypesComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    AllocateDistributionTypesComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        if (!(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] == "All")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.commonService.getOrgGroupIDS().
                                catch(this.httpService.handleError).then(function (res) {
                                var webresp = res.json();
                                _this.spinnerService.stop();
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = webresp.DataList;
                                        // this.blnStatusMsg = false;
                                        if (_this.orgGroupData.length > 0) {
                                            _this.blnShowOrgGroupID = true;
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID != "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var orgGroups = res.json();
                                _this.spinnerService.stop();
                                switch (orgGroups.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = orgGroups.DataList;
                                        _this.blnShowOrgGroupLabel = true;
                                        _this.lblOrgGrpID = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                        if (_this.blnShowOrgGroupLabel) {
                                            _this.populateUsersDropDown();
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: orgGroups.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: orgGroups.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: orgGroups.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "bindOrgGroups");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AllocateDistributionTypesComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var webresp_1, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
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
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "checkAuditAllowed");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateDistributionTypesComponent.prototype.populateUsersDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.ddlUserId = [];
                        this.selectedUserID = "";
                        if (this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] != "All") {
                            this.orgGrpID = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        }
                        if (this.blnShowOrgGroupID) {
                            this.orgGrpID = this.selectedOrgGroupID;
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUsersList(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_1.EnumApps.StockIssue, this.orgGrpID)
                                .catch(this.httpService.handleError).then(function (res) {
                                var webresp = res.json();
                                _this.spinnerService.stop();
                                _this.ddlUserId.push({ label: "Select User", value: "Select User" });
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstUserData = webresp.DataList;
                                        for (var i = 0; i < _this.lstUserData.length; i++) {
                                            _this.ddlUserId.push({ label: _this.lstUserData[i].FULLNAME, value: _this.lstUserData[i].USER_ID });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "populateUsersDropDown");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateDistributionTypesComponent.prototype.go = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.lstgridfilterData = null;
                        this.dataGrid = false;
                        this.sortField = "CHK_VALUE";
                        this.growlMessage = [];
                        if (this.blnShowOrgGroupID) {
                            if (this.selectedOrgGroupID == 'Select One' || this.selectedOrgGroupID == undefined || this.selectedOrgGroupID == "") {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID " });
                                return [2 /*return*/];
                            }
                        }
                        if (!(this.selectedUserID == 'Select User' || this.selectedUserID == undefined || this.selectedUserID == "")) return [3 /*break*/, 1];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid UserId " });
                        return [2 /*return*/];
                    case 1:
                        this.spinnerService.start();
                        if (this.distribType != null || this.distribType != "") {
                            this.searched = true;
                        }
                        if (this.blnShowOrgGroupLabel) {
                            this.strOrgGrpID = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].toString();
                        }
                        if (this.blnShowOrgGroupID) {
                            this.strOrgGrpID = this.selectedOrgGroupID;
                        }
                        return [4 /*yield*/, this.distribTypesService.getDistributionTypes(this.distribType, this.selectedUserID, this.strOrgGrpID)
                                .catch(this.httpService.handleError).then(function (res) {
                                var distribType = res.json();
                                _this.lstDistribTypes = new Array();
                                switch (distribType.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.dataGrid = true;
                                        _this.lstDistribData = distribType.DataList;
                                        _this.dataCheckedSorting = linq_es5_1.asEnumerable(_this.lstDistribData).Where(function (a) { return a.CHK_VALUE == 1; }).Select(function (a) { return a; }).ToArray();
                                        _this.dataUncheckedSorting = linq_es5_1.asEnumerable(_this.lstDistribData).Where(function (a) { return a.CHK_VALUE != 1; }).Select(function (a) { return a; }).ToArray();
                                        if (_this.lstDistribData.length > 0) {
                                            if (_this.selectedDisplay == "AL") {
                                                //  this.lstDistribTypes = asEnumerable(this.lstDistribData).Where(a => a.CHK_VALUE == 1).Select(a => a).ToArray();
                                                _this.lstDistribTypes = _this.dataCheckedSorting.sort(function (a, b) {
                                                    if (a.DISTRIB_TYPE < b.DISTRIB_TYPE)
                                                        return -1;
                                                    if (a.DISTRIB_TYPE > b.DISTRIB_TYPE)
                                                        return 1;
                                                    return 0;
                                                });
                                            }
                                            else if (_this.selectedDisplay == "N") {
                                                // this.lstDistribTypes = asEnumerable(this.lstDistribData).Where(a => a.CHK_VALUE != 1).Select(a => a).ToArray();
                                                _this.lstDistribTypes = _this.dataUncheckedSorting.sort(function (a, b) {
                                                    if (a.DISTRIB_TYPE < b.DISTRIB_TYPE)
                                                        return -1;
                                                    if (a.DISTRIB_TYPE > b.DISTRIB_TYPE)
                                                        return 1;
                                                    return 0;
                                                });
                                            }
                                            else {
                                                _this.lstDistribTypes = _this.dataCheckedSorting.sort(function (a, b) {
                                                    if (a.DISTRIB_TYPE < b.DISTRIB_TYPE)
                                                        return -1;
                                                    if (a.DISTRIB_TYPE > b.DISTRIB_TYPE)
                                                        return 1;
                                                    return 0;
                                                }).concat(_this.dataUncheckedSorting.sort(function (a, b) {
                                                    if (a.DISTRIB_TYPE < b.DISTRIB_TYPE)
                                                        return -1;
                                                    if (a.DISTRIB_TYPE > b.DISTRIB_TYPE)
                                                        return 1;
                                                    return 0;
                                                }));
                                            }
                                        }
                                        else {
                                            _this.dataGrid = false;
                                        }
                                        _this.dataCheckedSorting = linq_es5_1.asEnumerable(_this.lstDistribData).Where(function (a) { return a.CHK_VALUE == 1; }).Select(function (a) { return a; }).ToArray();
                                        _this.dataUncheckedSorting = linq_es5_1.asEnumerable(_this.lstDistribData).Where(function (a) { return a.CHK_VALUE != 1; }).Select(function (a) { return a; }).ToArray();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: distribType.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: distribType.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: distribType.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "go");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AllocateDistributionTypesComponent.prototype.filterdata = function (event) {
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    AllocateDistributionTypesComponent.prototype.onSort1 = function (event) {
        try {
            var element = event;
            this.blnsortbycolumn = !this.blnsortbycolumn;
            this.blnsortbycolumn = !this.blnsortbycolumn;
            var checkedData = linq_es5_1.asEnumerable(this.lstDistribTypes).Where(function (a) { return a.CHK_VALUE == 1; }).ToArray();
            var unCheckedData = linq_es5_1.asEnumerable(this.lstDistribTypes).Where(function (a) { return a.CHK_VALUE == 0; }).ToArray();
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
                    this.lstDistribTypes = checkedData.reverse().concat(unCheckedData.reverse()); // sortedUnCheckedData.reverse();
                }
                else {
                    this.lstDistribTypes = checkedData.concat(unCheckedData);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onSort");
        }
    };
    AllocateDistributionTypesComponent.prototype.onSort = function (event, field) {
        try {
            var element = event;
            if (this.preField == element.field) {
                if (element.order == 1) {
                    element.order = -1;
                }
                else {
                    element.order = 1;
                }
            }
            else {
                element.order = 1;
            }
            this.preField = element.field;
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
            var result_1 = null;
            var order = void 0;
            if (this.selectedDisplay == "AL") {
                this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                    if (a[element.field] == null && b[element.field] != null)
                        result_1 = -1;
                    else if (a[element.field] != null && b[element.field] == null)
                        result_1 = 1;
                    else if (a[element.field] == null && b[element.field] == null)
                        result_1 = 0;
                    else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                        result_1 = a[element.field].localeCompare(b[element.field]);
                    else
                        result_1 = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                    return (element.order * result_1);
                });
                this.lstDistribTypes = this.sortedcheckedrec;
            }
            else if (this.selectedDisplay == "N") {
                this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                    if (a[element.field] == null && b[element.field] != null)
                        result_1 = -1;
                    else if (a[element.field] != null && b[element.field] == null)
                        result_1 = 1;
                    else if (a[element.field] == null && b[element.field] == null)
                        result_1 = 0;
                    else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                        result_1 = a[element.field].localeCompare(b[element.field]);
                    else
                        result_1 = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                    return (element.order * result_1);
                });
                this.lstDistribTypes = this.sorteduncheckedrec;
            }
            else {
                this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                    if (a[element.field] == null && b[element.field] != null)
                        result_1 = -1;
                    else if (a[element.field] != null && b[element.field] == null)
                        result_1 = 1;
                    else if (a[element.field] == null && b[element.field] == null)
                        result_1 = 0;
                    else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                        result_1 = a[element.field].localeCompare(b[element.field]);
                    else
                        result_1 = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                    return (element.order * result_1);
                });
                this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                    if (a[element.field] == null && b[element.field] != null)
                        result_1 = -1;
                    else if (a[element.field] != null && b[element.field] == null)
                        result_1 = 1;
                    else if (a[element.field] == null && b[element.field] == null)
                        result_1 = 0;
                    else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                        result_1 = a[element.field].localeCompare(b[element.field]);
                    else
                        result_1 = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                    return (element.order * result_1);
                });
                this.lstDistribTypes = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
        // this.lstDistribTypes = [];
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    };
    AllocateDistributionTypesComponent.prototype.checkAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.endIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null || this.lstgridfilterData != undefined) {
                if (this.endIndex > this.lstgridfilterData.length) {
                    this.endIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.endIndex - 1; i++) {
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                }
            }
            else {
                if (this.endIndex > this.lstDistribTypes.length) {
                    this.endIndex = this.lstDistribTypes.length;
                }
                for (var i = this.startIndex; i <= this.endIndex - 1; i++) {
                    this.lstDistribTypes[i].CHK_VALUE = 1;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    AllocateDistributionTypesComponent.prototype.unCheckAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.endIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null || this.lstgridfilterData != undefined) {
                if (this.endIndex > this.lstgridfilterData.length) {
                    this.endIndex = this.lstgridfilterData.length;
                }
                for (var i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                }
            }
            else {
                if (this.endIndex > this.lstDistribTypes.length) {
                    this.endIndex = this.lstDistribTypes.length;
                }
                for (var i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.lstDistribTypes[i].CHK_VALUE = 0;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    AllocateDistributionTypesComponent.prototype.changeStatus = function (allocate) {
        try {
            var lstAllocateDistTypes = new Array();
            for (var x = 0; x < allocate.length; x++) {
                this.lstDistribTypes.push(allocate);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "changeStatus");
        }
    };
    AllocateDistributionTypesComponent.prototype.allocateDistributionTypes = function () {
        var _this = this;
        try {
            this.growlMessage = [];
            if (this.distribType != "") {
                this.searched = true;
            }
            else {
                this.searched = false;
            }
            if (this.selectedUserID == "Select User") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid UserId" });
                return;
            }
            this.spinnerService.start();
            var selectedDistbTypes_1 = linq_es5_1.asEnumerable(this.lstDistribData).Where(function (a) { return a.CHK_VALUE == 1; }).Select(function (a) { return a; }).ToArray();
            this.distribTypesService.allocateDistributionTypes(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedUserID, selectedDistbTypes_1, this.searched)
                .catch(this.httpService.handleError).then(function (res) {
                var webresp = res.json();
                switch (webresp.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        webresp.StatusMessage = "Updated Successfully";
                        _this.distribType = "";
                        _this.dataGrid = false;
                        _this.selectedDisplay = _this.ddlDisplay[0].value;
                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: webresp.StatusMessage });
                        if (_this.auditSatus == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                            for (var i = 0; i <= selectedDistbTypes_1.length - 1; i++) {
                                var auditData = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                auditData.FIELD_NAME = "CHK_VALUE";
                                auditData.OLD_VALUE = "0";
                                auditData.NEW_VALUE = "1";
                                auditData.KEY_1 = _this.selectedUserID;
                                auditData.KEY_2 = _this.appID;
                                auditData.KEY_3 = selectedDistbTypes_1[i].DISTRIB_TYPE;
                                auditData.KEY_4 = '';
                                auditData.KEY_5 = '';
                                _this.lstAuditData.push(auditData);
                            }
                            _this.spinnerService.start();
                            _this.commonService.insertAuditData(_this.lstAuditData, _this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], _this.menuCode).
                                catch(_this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            });
                        }
                        _this.spinnerService.stop();
                        if (_this.blnShowOrgGroupID) {
                            _this.selectedUserID = "Select User";
                        }
                        if (_this.blnShowOrgGroupLabel) {
                            _this.populateUsersDropDown();
                        }
                        break;
                    }
                    case AtParEnums_1.StatusType.Warn: {
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Error: {
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Custom: {
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "allocateDistributionTypes");
        }
    };
    AllocateDistributionTypesComponent.prototype.ddlOrgGrpIdChanged = function () {
        try {
            this.growlMessage = [];
            this.dataGrid = false;
            if (this.selectedOrgGroupID == 'Select One') {
                this.dataGrid = false;
                this.ddlUserId = [];
                this.ddlUserId.push({ label: 'Select User', value: 'Select User' });
            }
            else {
                this.populateUsersDropDown();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
    };
    AllocateDistributionTypesComponent.prototype.ddlUserChange = function () {
        this.dataGrid = false;
    };
    AllocateDistributionTypesComponent.prototype.ngOnDestroy = function () {
        this._deviceTokenEntry = [];
        this.growlMessage = [];
        this.orgGroupData = [];
        this.lstUserData = [];
        this.lblOrgGrpID = "";
        this.orgGrpID = "";
        this.lstOrgGroups = [];
        this.ddlUserId = [];
        this.ddlDisplay = [];
        this.lstDistribData = [];
        this.lstDistribTypes = [];
        //  this.lstCheckedDistribTypes = [];
        this.dataCheckedSorting = null;
        this.dataUncheckedSorting = null;
        this.selectedDistTypes = [];
        this.lstAuditData = [];
        this.spinnerService.stop();
    };
    return AllocateDistributionTypesComponent;
}());
__decorate([
    core_1.ViewChild(datatable_1.DataTable),
    __metadata("design:type", datatable_1.DataTable)
], AllocateDistributionTypesComponent.prototype, "dataTableComponent", void 0);
AllocateDistributionTypesComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2115),
        providers: [atpar_common_service_1.AtParCommonService, HttpService_1.HttpService, stis_allocate_distribution_types_service_1.AllocateDistributionTypesService, AtParConstants_1.AtParConstants]
    }),
    __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        HttpService_1.HttpService,
        stis_allocate_distribution_types_service_1.AllocateDistributionTypesService,
        AtParConstants_1.AtParConstants])
], AllocateDistributionTypesComponent);
exports.AllocateDistributionTypesComponent = AllocateDistributionTypesComponent;


/***/ }),

/***/ 1622:
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
var MT_ATPAR_SECURITY_AUDIT_1 = __webpack_require__(325);
var HttpService_1 = __webpack_require__(12);
var api_1 = __webpack_require__(72);
var AtParEnums_1 = __webpack_require__(14);
var AtParStatusCodes_1 = __webpack_require__(50);
var AtParEnums_2 = __webpack_require__(14);
var AtParEnums_3 = __webpack_require__(14);
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var AtParConstants_1 = __webpack_require__(31);
var SIAllocateInventoryBusinessUnitsComponent = (function () {
    function SIAllocateInventoryBusinessUnitsComponent(httpService, _http, spinnerService, atParCommonService, atParConstant) {
        this.httpService = httpService;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
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
        this.preField = "";
        this.custom = "custom";
        this.isAuditRequired = "";
        this.strAudit = "";
    }
    SIAllocateInventoryBusinessUnitsComponent.prototype.ngOnInit = function () {
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedBUnits = new Array();
        this.dataCheckedSorting = new Array();
        this.dataUncheckedSorting = new Array();
        this.lstFilteredBUnits = new Array();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        // checking is Audit enabled for this page
        this.checkAuditAllowed();
        this.bindOrgGroups();
        this.pazeSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
    };
    SIAllocateInventoryBusinessUnitsComponent.prototype.bindOrgGroups = function () {
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
                                    case AtParEnums_3.StatusType.Success: {
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
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "bindOrgGroups");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SIAllocateInventoryBusinessUnitsComponent.prototype.ddlOrgGrpIdChanged = function () {
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
                        this.clientErrorMsg(ex_2, "ddlOrgGrpIdChanged");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SIAllocateInventoryBusinessUnitsComponent.prototype.ddlUserChange = function () {
        this.isVisible = false;
    };
    SIAllocateInventoryBusinessUnitsComponent.prototype.bindUsersList = function () {
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
                        return [4 /*yield*/, this.atParCommonService.getUsersList(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_1.EnumApps.StockIssue, this.orgGroupIDForDBUpdate)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.userDataList = data.DataList;
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
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.growlMessage = [];
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
                        this.clientErrorMsg(ex_3, "bindUsersList");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SIAllocateInventoryBusinessUnitsComponent.prototype.selectedRow = function (values, event) {
        if (event == true) {
            values.CHK_VALUE = 1;
        }
        else {
            values.CHK_VALUE = 0;
            values.COUNT_FLAG = 0;
            values.ALLOW_SIC_CONSIGN = "N";
            values.blnCountFlag = 0;
            values.blnAllowSicConsign = 0;
        }
        for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
            if (this.lstCheckedBUnits[i].BUSINESS_UNIT === values.BUSINESS_UNIT) {
                var index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0);
                this.lstCheckedBUnits.splice(index, 1);
            }
        }
        this.lstCheckedBUnits.push(values);
    };
    SIAllocateInventoryBusinessUnitsComponent.prototype.checkedCountFlag = function (values, event) {
        if (event == true) {
            values.CHK_VALUE = 1;
            values.COUNT_FLAG = "1";
            values.checkvalue = 1;
        }
        else {
            values.COUNT_FLAG = "0";
            values.ALLOW_SIC_CONSIGN = "N";
            values.blnAllowSicConsign = 0;
            values.blnCountFlag = 0;
        }
        for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
            if (this.lstCheckedBUnits[i].BUSINESS_UNIT === values.BUSINESS_UNIT) {
                var index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0);
                this.lstCheckedBUnits.splice(index, 1);
            }
        }
        this.lstCheckedBUnits.push(values);
    };
    SIAllocateInventoryBusinessUnitsComponent.prototype.checkedConsignFlag = function (values, event) {
        if (event == true) {
            values.CHK_VALUE = 1;
            values.COUNT_FLAG = 1;
            values.ALLOW_SIC_CONSIGN = "Y";
            values.checkvalue = 1;
            values.blnCountFlag = 1;
        }
        else {
            values.ALLOW_SIC_CONSIGN = "N";
        }
        for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
            if (this.lstCheckedBUnits[i].BUSINESS_UNIT === values.BUSINESS_UNIT) {
                var index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0);
                this.lstCheckedBUnits.splice(index, 1);
            }
        }
        this.lstCheckedBUnits.push(values);
    };
    SIAllocateInventoryBusinessUnitsComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        isOrgBUnitsExist = false;
                        this.spinnerService.start();
                        if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParCommonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_2.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        _this.lstFilteredBUnits = data.DataList;
                                        isOrgBUnitsExist = true;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.showGrid = false;
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
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "populateBusinessUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SIAllocateInventoryBusinessUnitsComponent.prototype.checkAll = function () {
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
    };
    SIAllocateInventoryBusinessUnitsComponent.prototype.unCheckAll = function () {
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
                this.lstgridfilterData[i].blnCountFlag = false;
                this.lstgridfilterData[i].COUNT_FLAG == "0";
                this.lstgridfilterData[i].blnAllowSicConsign = false;
                this.lstgridfilterData[i].ALLOW_SIC_CONSIGN == "N";
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
                this.lstDBData[i].blnCountFlag = false;
                this.lstDBData[i].COUNT_FLAG == "0";
                this.lstDBData[i].blnAllowSicConsign = false;
                this.lstDBData[i].ALLOW_SIC_CONSIGN == "N";
                this.lstCheckedBUnits.push(this.lstDBData[i]);
            }
        }
    };
    SIAllocateInventoryBusinessUnitsComponent.prototype.BindDataGrid = function () {
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
    };
    SIAllocateInventoryBusinessUnitsComponent.prototype.filterdata = function (event) {
        this.lstgridfilterData = [];
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    //customSort1(event) {
    //    try {
    //        var element = event;
    //        this.lstDBData = [];
    //        this.blnsortbycolumn = !this.blnsortbycolumn;
    //        this.sortedcheckedrec = [];
    //        this.sorteduncheckedrec = [];
    //        this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
    //            if (a[element.field] < b[element.field])
    //                return -1;
    //            if (a[element.field] > b[element.field])
    //                return 1;
    //            return 0;
    //        });
    //        this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
    //            if (a[element.field] < b[element.field])
    //                return -1;
    //            if (a[element.field] > b[element.field])
    //                return 1;
    //            return 0;
    //        });
    //        if (this.blnsortbycolumn == false) {
    //            this.lstDBData = [];
    //            this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
    //        }
    //        else {
    //            this.lstDBData = [];
    //            this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
    //        }
    //        this.sortedcheckedrec = [];
    //        this.sorteduncheckedrec = [];
    //    }
    //    catch (ex) {
    //        this.clientErrorMsg(ex, "customSort");
    //    }
    //}
    SIAllocateInventoryBusinessUnitsComponent.prototype.customSort = function (event, field) {
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
    SIAllocateInventoryBusinessUnitsComponent.prototype.fillBUnitsAuto = function (event) {
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
                        return [4 /*yield*/, this.atParCommonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_2.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                _this.spinnerService.stop();
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.lstBUnits = data.DataList;
                                        _this.lstFilteredBUnits = _this.filterBusinessUnits(query, _this.lstBUnits);
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        if (data.StatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
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
    SIAllocateInventoryBusinessUnitsComponent.prototype.filterBusinessUnits = function (query, businessunits) {
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
    SIAllocateInventoryBusinessUnitsComponent.prototype.getAllBUnits = function () {
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
                        _a.trys.push([1, 3, , 4]);
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
                        if (isBUnitsExists == true) {
                            this.spinnerService.start();
                            this.httpService.getSync({
                                "apiMethod": "/api/SIAllocBU/GetBUnits",
                                params: {
                                    "bArray": this.lstFilteredBUnits,
                                    "appId": "10",
                                    "userID": this.selectedDropDownUserId,
                                    "bUnit": this.selectedBunit,
                                    "description": this.selectedDescription,
                                    "serverUserID": this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]
                                }
                            }).catch(this.httpService.handleError)
                                .then(function (response) {
                                var data = response.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.lstDBData = [];
                                        _this.lstDBData = data.DataList;
                                        for (var i = 0; i <= data.DataList.length - 1; i++) {
                                            if (data.DataList[i].CHK_ALLOCATED == 1) {
                                                data.DataList[i].checkvalue = true;
                                            }
                                            else {
                                                data.DataList[i].checkvalue = false;
                                            }
                                            if (data.DataList[i].COUNT_FLAG == "1") {
                                                data.DataList[i].blnCountFlag = true;
                                            }
                                            else {
                                                data.DataList[i].blnCountFlag = false;
                                            }
                                            if (data.DataList[i].ALLOW_SIC_CONSIGN == "Y") {
                                                data.DataList[i].blnAllowSicConsign = true;
                                            }
                                            else {
                                                data.DataList[i].blnAllowSicConsign = false;
                                            }
                                        }
                                        _this.lstDBData = data.DataList;
                                        _this.BindDataGrid();
                                        _this.showGrid = true;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "getAllBUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SIAllocateInventoryBusinessUnitsComponent.prototype.allocateBUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.growlMessage = [];
                try {
                    if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User ID' });
                        return [2 /*return*/];
                    }
                    this.spinnerService.start();
                    this.httpService.create({
                        "apiMethod": "/api/SIAllocBU/AllocateBUnits",
                        formData: this.lstDBData,
                        params: {
                            "appId": "10",
                            "userID": this.selectedDropDownUserId,
                            "serverUserID": this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID],
                            "bArray": this.lstFilteredBUnits,
                            "searched": true,
                            "bUnit": this.selectedBunit,
                            "description": this.selectedDescription
                        }
                    }).catch(this.httpService.handleError).map(function (res) { return res.json(); }).subscribe(function (response) {
                        _this.growlMessage = [];
                        switch (response.StatType) {
                            case AtParEnums_3.StatusType.Success: {
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
                            case AtParEnums_3.StatusType.Warn: {
                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                _this.spinnerService.stop();
                                break;
                            }
                            case AtParEnums_3.StatusType.Error: {
                                _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                _this.spinnerService.stop();
                                _this.showGrid = false;
                                break;
                            }
                            case AtParEnums_3.StatusType.Custom: {
                                _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                _this.spinnerService.stop();
                                break;
                            }
                        }
                    });
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "allocateBUnits");
                }
                return [2 /*return*/];
            });
        });
    };
    SIAllocateInventoryBusinessUnitsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    SIAllocateInventoryBusinessUnitsComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getAuditAllowed(10, "mt_stis_inv_bunit_alloc.aspx").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.isAuditRequired = data.Data;
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
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
                        this.clientErrorMsg(ex_7, "checkAuditAllowed");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SIAllocateInventoryBusinessUnitsComponent.prototype.insertAuditData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var auditSecurity, auditSecurityLst, intCnount, strScreenName, ex_8;
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
                                auditSecurity.KEY_2 = "10";
                                auditSecurity.KEY_3 = this.lstCheckedBUnits[intCnount].BUSINESS_UNIT;
                                auditSecurity.KEY_4 = "";
                                auditSecurity.KEY_5 = "";
                                auditSecurityLst.push(auditSecurity);
                            }
                        }
                        strScreenName = "mt_stis_inv_bunit_alloc.aspx";
                        return [4 /*yield*/, this.atParCommonService.insertAuditData(auditSecurityLst, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], strScreenName).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                switch (response.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.lstDBData = [];
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
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
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "insertAuditData");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SIAllocateInventoryBusinessUnitsComponent.prototype.ngOnDestroy = function () {
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
    return SIAllocateInventoryBusinessUnitsComponent;
}());
SIAllocateInventoryBusinessUnitsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2116),
        providers: [HttpService_1.HttpService, api_1.ConfirmationService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        AtParConstants_1.AtParConstants])
], SIAllocateInventoryBusinessUnitsComponent);
exports.SIAllocateInventoryBusinessUnitsComponent = SIAllocateInventoryBusinessUnitsComponent;


/***/ }),

/***/ 1623:
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
        template: __webpack_require__(2117)
    })
], DailyActivityComponent);
exports.DailyActivityComponent = DailyActivityComponent;


/***/ }),

/***/ 1624:
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
        template: __webpack_require__(2118)
    })
], DailyUserActivityComponent);
exports.DailyUserActivityComponent = DailyUserActivityComponent;


/***/ }),

/***/ 1625:
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
var stis_issue_report_service_1 = __webpack_require__(1853);
var file_saver_1 = __webpack_require__(228);
var IssueReportComponent = (function () {
    function IssueReportComponent(spinnerService, atParCommonService, httpService, atParConstant, issueReportService) {
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.issueReportService = issueReportService;
        this.growlMessage = [];
        this.defDuration = 0;
        this.statusCode = -1;
        this.showGrid = false;
        this.isMailDialog = false;
        this.toDate = new Date();
        this.lstOrgGroupIds = [];
        this.lstStatus = [];
        this.lstBusinessUnits = [];
        this.lstUsers = [];
        this.lstIssueReport = [];
        this.breadCrumbMenu = new routepath_1.Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    IssueReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.lstStatus.push({ label: 'ALL', value: 'ALL' }, { label: 'Issued', value: '6' }, { label: 'Cancelled', value: '13' }, { label: 'Returned', value: '16' });
                        this.status = 'ALL';
                        this.lstBusinessUnits.push({ label: 'ALL', value: 'ALL' });
                        this.businessUnit = 'ALL';
                        this.lstUsers.push({ label: 'ALL', value: 'ALL' });
                        this.userID = 'ALL';
                        this.spinnerService.start();
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 2:
                        _a.sent();
                        if (!!this.showOrgDropdown) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getOrgGroupAllocInvBUnits()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getHeirarchyUsersList()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    IssueReportComponent.prototype.getMyPreferences = function () {
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
    IssueReportComponent.prototype.bindOrgGroups = function () {
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
                                            _this.selectedOrgGroupID = res.DataList[0].ORG_GROUP_ID;
                                        }
                                        else {
                                            _this.showOrgDropdown = true;
                                            _this.lstOrgGroupIds.push({ label: 'Select One', value: 'Select One' });
                                            _this.selectedOrgGroupID = 'Select One';
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
    IssueReportComponent.prototype.getOrgGroupAllocInvBUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.issueReportService.getOrgGroupAllocInvBUnits(AtParEnums_2.EnumApps.StockIssue, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedOrgGroupID).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstBusinessUnits = [];
                                _this.businessUnit = '';
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstBusinessUnits.push({ label: 'ALL', value: 'ALL' });
                                        _this.businessUnit = 'ALL';
                                        for (var i = 0; i < res.DataList.length; i++) {
                                            _this.lstBusinessUnits.push({ label: res.DataList[i], value: res.DataList[i] });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        if (!_this.showOrgDropdown) {
                                            _this.lstBusinessUnits.push({ label: 'ALL', value: 'ALL' });
                                            _this.businessUnit = 'ALL';
                                        }
                                        else {
                                            _this.lstBusinessUnits.push({ label: 'Select One', value: '' });
                                            _this.businessUnit = '';
                                            if (res.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                                            }
                                            else {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                            }
                                        }
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
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "getOrgGroupAllocInvBUnits");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    IssueReportComponent.prototype.getHeirarchyUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.issueReportService.getHeirarchyUsersList(AtParEnums_2.EnumApps.StockIssue, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedOrgGroupID).then(function (result) {
                                var res = result.json();
                                _this.lstUsers = [];
                                _this.lstUsers.push({ label: 'ALL', value: 'ALL' });
                                _this.userID = 'ALL';
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i < res.DataDictionary["pDSUserList"].Table1.length; i++) {
                                            _this.lstUsers.push({ label: res.DataDictionary["pDSUserList"].Table1[i].FULLNAME, value: res.DataDictionary["pDSUserList"].Table1[i].USER_ID });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
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
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "getHeirarchyUsersList");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    IssueReportComponent.prototype.ddlOrgGroup_SelectedIndexChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.selectedOrgGroupID = this.orgGroupId;
                        if (!(this.orgGroupId != 'Select One')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getOrgGroupAllocInvBUnits()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getHeirarchyUsersList()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.lstBusinessUnits = [];
                        this.lstBusinessUnits.push({ label: 'ALL', value: 'ALL' });
                        this.businessUnit = 'ALL';
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    IssueReportComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var todayDate, strUserID, i, strBU, i, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.growlMessage = [];
                        this.showGrid = false;
                        todayDate = new Date();
                        if (!(this.selectedOrgGroupID == 'Select One' || this.selectedOrgGroupID == undefined || this.selectedOrgGroupID == null)) return [3 /*break*/, 1];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(this.fromDate > this.toDate)) return [3 /*break*/, 2];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "FromDate must be less than Todate" });
                        return [3 /*break*/, 4];
                    case 2:
                        strUserID = '';
                        if (this.userID == 'ALL') {
                            if (this.lstUsers.length > 0) {
                                for (i = 0; i < this.lstUsers.length; i++) {
                                    if (strUserID != '') {
                                        strUserID = strUserID + ",'" + this.lstUsers[i].value + "'";
                                    }
                                    else {
                                        strUserID = "('" + this.lstUsers[i].value + "'";
                                    }
                                }
                                strUserID = strUserID + ")";
                            }
                            else {
                                strUserID = "(' " + "')";
                            }
                        }
                        else {
                            strUserID = "('" + this.userID + "')";
                        }
                        strBU = '';
                        if (this.businessUnit == 'ALL') {
                            if (this.lstBusinessUnits.length > 0) {
                                for (i = 0; i < this.lstBusinessUnits.length; i++) {
                                    if (strBU != '') {
                                        strBU = strBU + ",'" + this.lstBusinessUnits[i].value + "'";
                                    }
                                    else {
                                        strBU = "('" + this.lstBusinessUnits[i].value + "'";
                                    }
                                }
                                strBU = strBU + ")";
                            }
                            else {
                                strBU = "(' " + "')";
                            }
                        }
                        else {
                            strBU = "('" + this.businessUnit + "')";
                        }
                        this.deptID = this.deptID == undefined ? '' : this.deptID;
                        this.patientID = this.patientID == undefined ? '' : this.patientID;
                        this.issueUser = this.issueUser == undefined ? '' : this.issueUser;
                        this.itemID = this.itemID == undefined ? '' : this.itemID;
                        this.itemDesc = this.itemDesc == undefined ? '' : this.itemDesc;
                        this.issueLocation = this.issueLocation == undefined ? '' : this.issueLocation;
                        //this.strFromDate = this.fromDate.toLocaleDateString();
                        //this.strToDate = this.toDate.toLocaleDateString();
                        this.strFromDate = this.getDateString(this.fromDate);
                        this.strToDate = this.getDateString(this.toDate);
                        this.strUserID = this.userID;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.issueReportService.getIssueReport(strBU, strUserID, this.deptID, this.patientID, this.issueUser, this.itemID, this.itemDesc, '', this.strFromDate, this.strToDate, this.status, this.issueLocation, this.lstUsers).then(function (result) {
                                _this.spinnerService.stop();
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.showGrid = true;
                                        _this.lstIssueReport = res.DataDictionary["pDSUserList"].Table1;
                                        _this.replaceDS();
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
                    case 3:
                        _a.sent();
                        _a.label = 4;
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
    IssueReportComponent.prototype.replaceDS = function () {
        for (var i = 0; i < this.lstIssueReport.length; i++) {
            if (this.lstIssueReport[i].STATUS == '13') {
                this.lstIssueReport[i].STATUS = 'Cancelled';
            }
            else if (this.lstIssueReport[i].STATUS == '16') {
                this.lstIssueReport[i].STATUS = 'Returned';
            }
            else {
                this.lstIssueReport[i].STATUS = 'Issued';
            }
            if (this.lstIssueReport[i].DEPT_ID == null || this.lstIssueReport[i].DEPT_ID == undefined) {
                this.lstIssueReport[i].DEPT_ID = '';
            }
            if (this.lstIssueReport[i].PATIENT_ID == null || this.lstIssueReport[i].PATIENT_ID == undefined) {
                this.lstIssueReport[i].PATIENT_ID = '';
            }
            if (this.lstIssueReport[i].ADJUST_TYPE == null || this.lstIssueReport[i].ADJUST_TYPE == undefined) {
                this.lstIssueReport[i].ADJUST_TYPE = '';
            }
            if (this.lstIssueReport[i].ISSUE_TO_USER == null || this.lstIssueReport[i].ISSUE_TO_USER == undefined) {
                this.lstIssueReport[i].ISSUE_TO_USER = '';
            }
            if (this.lstIssueReport[i].ISSUE_TO_LOCATION == null || this.lstIssueReport[i].ISSUE_TO_LOCATION == undefined) {
                this.lstIssueReport[i].ISSUE_TO_LOCATION = '';
            }
            this.lstIssueReport[i].ISSUEDATE_USER = this.lstIssueReport[i].ISSUE_DATE + '-' + this.lstIssueReport[i].USER_NAME;
            this.lstIssueReport[i].ITEMID_DESC = this.lstIssueReport[i].ITEM_ID + '-' + this.lstIssueReport[i].ITEM_DESC;
            this.lstIssueReport[i].QTY_UOM = this.lstIssueReport[i].QTY + '-' + this.lstIssueReport[i].UOM;
        }
    };
    IssueReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        //if (html != '' && html != null) {
                        //    var ua = window.navigator.userAgent;
                        //    var msie = ua.indexOf("MSIE ");
                        //    // If Internet Explorer
                        //    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                        //        this.statusCode = -1;
                        //        let folderName: string = '';
                        //        await this.atParCommonService.exportToExcel(html, "StockIssueReport", "StockIssueReport")
                        //            .then((res: Response) => {
                        //                let data = res.json();
                        //                this.statusCode = data.StatusCode;
                        //                if (this.statusCode.toString() == AtparStatusCodes.ATPAR_OK.toString()) {
                        //                    folderName = data.DataVariable.toString();
                        //                    var filename = this.httpService.BaseUrl + '/Uploaded/' + folderName + '/StockIssueReport.xls';
                        //                    var query = '?download';
                        //                    window.open(filename + query);
                        //                }
                        //                else {
                        //                    this.growlMessage = [];
                        //                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error.' });
                        //                }
                        //            });
                        //        await this.atParCommonService.deleteExcel(folderName, "StockIssueReport")
                        //            .then((res: Response) => {
                        //            });
                        //    } else {
                        //        var a = document.createElement('a');
                        //        var data_type = 'data:application/vnd.ms-excel';
                        //        html = html.replace(/ /g, '%20');
                        //        a.href = data_type + ', ' + html;
                        //        a.download = 'StockIssueReport.xls';
                        //        a.click();
                        //    }
                        //}
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "StockIssueReport.xls");
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
    IssueReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_7;
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
                            mywindow = window.open(document.URL, null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'Stock Issue Report' + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                mywindow.document.close(); // necessary for IE >= 10
                                mywindow.focus(); // necessary for IE >= 10*/
                                return [2 /*return*/, true];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, 'onPrintClick');
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    IssueReportComponent.prototype.onSendMailIconClick = function (event) {
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
    IssueReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_8;
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
                        toAddr = '';
                        this.isMailDialog = false;
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.atParCommonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Stock Issue Report', JSON.stringify(html), this.toMailAddr, AtParEnums_2.MailPriority.Normal.toString(), '')
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
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, 'onSendMailClick');
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    IssueReportComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, sigimgserverPath, i, ex_9;
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
                        //imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';
                        htmlBuilder = "<Table align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == "Print") {
                            htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=75% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=10 align=left><span class=c2>Issue Report for <b>" + this.userID + "</b> between <b>" + this.strFromDate + "</b> and <b>" + this.strToDate + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            htmlBuilder += "<TR width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td></TR>";
                            htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=10 align=left><span class=c2>Issue Report for <b>" + this.strUserID + "</b> between <b>" + this.strFromDate + "</b> and <b>" + this.strToDate + "</b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr> ";
                        htmlBuilder += "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
                        htmlBuilder += "<tr>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Issue Date-User</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>";
                        htmlBuilder += "Issue To Location/Company</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Issue To User</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Business Unit</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Dept ID</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Item ID - Item Description</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Qty - UOM</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Patient ID</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Adjustment Type</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Status</b></span></td>";
                        htmlBuilder += "<td align=center nowrap width=170><span class=c2><b>Signature </b></span><td>";
                        htmlBuilder += "</tr>";
                        sigimgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/Uploaded/';
                        for (i = 0; i < this.lstIssueReport.length; i++) {
                            htmlBuilder += "<tr height=90>";
                            htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstIssueReport[i].ISSUE_DATE + " - "
                                + this.lstIssueReport[i].USER_NAME + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstIssueReport[i].ISSUE_TO_LOCATION + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstIssueReport[i].ISSUE_TO_USER + "</span></td>";
                            htmlBuilder += "<td align=left ><span class=c2>" + this.lstIssueReport[i].BUSINESS_UNIT + "</span></td>";
                            htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstIssueReport[i].DEPT_ID + "</span></td>";
                            htmlBuilder += "<td align=left wrap><span class=c2>" + this.lstIssueReport[i].ITEM_ID + " - " + this.lstIssueReport[i].ITEM_DESC + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstIssueReport[i].QTY + " - " + this.lstIssueReport[i].UOM + "</span></td>";
                            htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstIssueReport[i].PATIENT_ID + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstIssueReport[i].ADJUST_TYPE + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstIssueReport[i].STATUS + "</span></td>";
                            if (this.lstIssueReport[i].SIGNATURE != null) {
                                htmlBuilder += "<td border==#ffffff nowrap>&nbsp;<center><img  src=" + sigimgserverPath + this.lstIssueReport[i].TRANS_ID + ".jpg></td>";
                            }
                            else {
                                htmlBuilder += "<td border==#ffffff nowrap>&nbsp;<center></td>";
                            }
                            htmlBuilder += "</tr>";
                        }
                        htmlBuilder += "</table>";
                        htmlBuilder += "</td></td></Table>";
                        return [4 /*yield*/, htmlBuilder];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        ex_9 = _a.sent();
                        htmlBuilder = '';
                        this.clientErrorMsg(ex_9, 'exportReportDetails');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    IssueReportComponent.prototype.getDateString = function (MyDate) {
        var MyDateString = ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/' + ('0' + MyDate.getDate()).slice(-2) + '/' + MyDate.getFullYear();
        return MyDateString;
    };
    IssueReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    IssueReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    IssueReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    IssueReportComponent.prototype.ngOnDestroy = function () {
    };
    return IssueReportComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], IssueReportComponent.prototype, "appId", void 0);
__decorate([
    core_1.ViewChild(datatable_1.DataTable),
    __metadata("design:type", datatable_1.DataTable)
], IssueReportComponent.prototype, "dataTableComponent", void 0);
IssueReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2119),
        providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, stis_issue_report_service_1.IssueReportService],
    }),
    __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        HttpService_1.HttpService,
        AtParConstants_1.AtParConstants,
        stis_issue_report_service_1.IssueReportService])
], IssueReportComponent);
exports.IssueReportComponent = IssueReportComponent;


/***/ }),

/***/ 1626:
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
        this.stisAppId = AtParEnums_1.EnumApps.StockIssue;
    }
    return UserParametersComponent;
}());
UserParametersComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2120)
    })
], UserParametersComponent);
exports.UserParametersComponent = UserParametersComponent;


/***/ }),

/***/ 1627:
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
var StockIssueComponent = (function () {
    function StockIssueComponent() {
    }
    return StockIssueComponent;
}());
StockIssueComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2121)
    })
], StockIssueComponent);
exports.StockIssueComponent = StockIssueComponent;


/***/ }),

/***/ 1851:
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
var AllocateDestinationLocationsService = (function () {
    function AllocateDestinationLocationsService(httpservice) {
        this.httpservice = httpservice;
    }
    AllocateDestinationLocationsService.prototype.allocatedDestLocations = function (userID, selectedUserID, lstLocations, searched, bUnit) {
        return this.httpservice.create({
            apiMethod: "/api/AllocateDestinationLocations/AllocatedDestLocations",
            formData: lstLocations,
            params: {
                "userID": userID,
                "selectedUserID": selectedUserID,
                "searched": searched,
                "bUnit": bUnit
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    AllocateDestinationLocationsService.prototype.getAllocInvBUnits = function (appID, userID, orgGrpId) {
        return this.httpservice.get({
            apiMethod: "/api/AllocateDestinationLocations/GetAllocInvBUnits",
            params: {
                "appID": appID,
                "userID": userID,
                "orgGrpId": orgGrpId
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    AllocateDestinationLocationsService.prototype.getDestinationLocations = function (bArray, location, userID, orgGroupID, serverUserID) {
        return this.httpservice.get({
            apiMethod: "/api/AllocateDestinationLocations/GetDestinationLocations",
            params: {
                "bArray": bArray,
                "location": location,
                "userID": userID,
                "orgGroupID": orgGroupID,
                "serverUserID": serverUserID
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    AllocateDestinationLocationsService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return AllocateDestinationLocationsService;
}());
AllocateDestinationLocationsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], AllocateDestinationLocationsService);
exports.AllocateDestinationLocationsService = AllocateDestinationLocationsService;


/***/ }),

/***/ 1852:
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
var AllocateDistributionTypesService = (function () {
    function AllocateDistributionTypesService(httpService, http) {
        this.httpService = httpService;
        this.http = http;
    }
    AllocateDistributionTypesService.prototype.getDistributionTypes = function (distributionType, userID, orgGroupID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/DistributionTypes/GetDistributionTypes",
                            params: {
                                "distributionType": distributionType,
                                "userID": userID,
                                "orgGroupID": orgGroupID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AllocateDistributionTypesService.prototype.allocateDistributionTypes = function (loginUserID, selectedUserID, lstDistAllocation, searched) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            apiMethod: "/api/DistributionTypes/AllocateDistributionTypes",
                            formData: lstDistAllocation,
                            params: {
                                "loginUserID": loginUserID,
                                "selectedUserID": selectedUserID,
                                "searched": searched
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return AllocateDistributionTypesService;
}());
AllocateDistributionTypesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http])
], AllocateDistributionTypesService);
exports.AllocateDistributionTypesService = AllocateDistributionTypesService;


/***/ }),

/***/ 1853:
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
var Rx_1 = __webpack_require__(37);
var HttpService_1 = __webpack_require__(12);
var IssueReportService = (function () {
    function IssueReportService(httpservice) {
        this.httpservice = httpservice;
    }
    IssueReportService.prototype.getOrgGroupAllocInvBUnits = function (appID, userID, orgGroupID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            "apiMethod": "/api/IssueReport/GetOrgGroupAllocInvBUnits",
                            params: {
                                appID: appID,
                                userID: userID,
                                orgGroupID: orgGroupID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IssueReportService.prototype.getHeirarchyUsersList = function (appID, userID, orgGroupID) {
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
    IssueReportService.prototype.getIssueReport = function (businessUnit, userID, deptID, patientID, issueUser, itemID, itemDesc, price, fromDate, toDate, status, issueLoc, userList) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.create({
                            "apiMethod": "/api/IssueReport/GetIssueReport",
                            formData: userList,
                            params: {
                                bUnit: businessUnit,
                                userID: userID,
                                deptID: deptID,
                                patientID: patientID,
                                issueToUser: issueUser,
                                itemID: itemID,
                                itemDesc: itemDesc,
                                price: price,
                                fromDt: fromDate,
                                toDt: toDate,
                                status: status,
                                serverUserID: userID,
                                issueToLocation: issueLoc
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IssueReportService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    ;
    return IssueReportService;
}());
IssueReportService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], IssueReportService);
exports.IssueReportService = IssueReportService;


/***/ }),

/***/ 1854:
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
var stockissue_component_1 = __webpack_require__(1627);
var stis_allocate_destination_locations_component_1 = __webpack_require__(1620);
var stis_allocate_distribution_types_component_1 = __webpack_require__(1621);
var stis_allocate_inventory_business_units_component_1 = __webpack_require__(1622);
var stis_daily_activity_component_1 = __webpack_require__(1623);
var stis_daily_user_activity_component_1 = __webpack_require__(1624);
var stis_issue_report_component_1 = __webpack_require__(1625);
var stis_user_parameters_component_1 = __webpack_require__(1626);
exports.routes = [
    {
        path: '',
        component: stockissue_component_1.StockIssueComponent,
        children: [
            { path: 'allocatedestinationlocations', component: stis_allocate_destination_locations_component_1.AllocateDestinationLocationsComponent },
            { path: 'allocatedistributiontypes', component: stis_allocate_distribution_types_component_1.AllocateDistributionTypesComponent },
            { path: 'allocateinventorybusinessunits', component: stis_allocate_inventory_business_units_component_1.SIAllocateInventoryBusinessUnitsComponent },
            { path: 'dailyactivity', component: stis_daily_activity_component_1.DailyActivityComponent },
            { path: 'dailyuseractivity', component: stis_daily_user_activity_component_1.DailyUserActivityComponent },
            { path: 'issuereport', component: stis_issue_report_component_1.IssueReportComponent },
            { path: 'userparameters', component: stis_user_parameters_component_1.UserParametersComponent },
        ]
    }
];
var StockIssueRoutingModule = (function () {
    function StockIssueRoutingModule() {
    }
    return StockIssueRoutingModule;
}());
StockIssueRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.routes)],
        exports: [router_1.RouterModule]
    })
], StockIssueRoutingModule);
exports.StockIssueRoutingModule = StockIssueRoutingModule;


/***/ }),

/***/ 1855:
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
var stockissue_component_1 = __webpack_require__(1627);
var stis_allocate_destination_locations_component_1 = __webpack_require__(1620);
var stis_allocate_distribution_types_component_1 = __webpack_require__(1621);
var stis_allocate_inventory_business_units_component_1 = __webpack_require__(1622);
var stis_daily_activity_component_1 = __webpack_require__(1623);
var stis_daily_user_activity_component_1 = __webpack_require__(1624);
var stis_issue_report_component_1 = __webpack_require__(1625);
var stis_user_parameters_component_1 = __webpack_require__(1626);
var stockissue_routing_module_1 = __webpack_require__(1854);
var shared_module_1 = __webpack_require__(632);
var StockIssueModule = (function () {
    function StockIssueModule() {
    }
    return StockIssueModule;
}());
StockIssueModule = __decorate([
    core_1.NgModule({
        imports: [
            stockissue_routing_module_1.StockIssueRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            stockissue_component_1.StockIssueComponent,
            stis_allocate_destination_locations_component_1.AllocateDestinationLocationsComponent,
            stis_allocate_distribution_types_component_1.AllocateDistributionTypesComponent,
            stis_allocate_inventory_business_units_component_1.SIAllocateInventoryBusinessUnitsComponent,
            stis_daily_activity_component_1.DailyActivityComponent,
            stis_issue_report_component_1.IssueReportComponent,
            stis_user_parameters_component_1.UserParametersComponent,
            stis_daily_user_activity_component_1.DailyUserActivityComponent
        ]
    })
], StockIssueModule);
exports.StockIssueModule = StockIssueModule;


/***/ }),

/***/ 2114:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\" *ngIf=\"true\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px;\">\r\n                        <form class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Org Group ID </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpIDData}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupDD\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">User ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstUsers\" [id]=\"'ddllstUsers'\" [required]=\"true\" [(ngModel)]=\"selectedDropDownUserId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddlUserChange()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Business Unit</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"ddllBunit\" [id]=\"'ddllBunit'\" [(ngModel)]=\"selectedBunit\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddl_Change()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"clear:both\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Location</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-ac-server [(ngModel)]=\"selectedLocation\" [ngModelOptions]=\"{standalone: true}\" [suggestions]=\"lstFilteredLocation\" (completeMethod)=\"fillLocationsAuto($event)\"></atpar-ac-server>\r\n                                    </div>\r\n                                </div>                            \r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Display </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"displayOptions\" [id]=\"'ddlDisplay'\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"seletedStatus\" (onChange)=\"ddl_Change()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-2 form-group\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"getDesLocations()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n\r\n\r\n                        <div class=\"col-xs-12\" *ngIf=\"isVisible\">\r\n                            <div class=\"container\">\r\n                                <atpar-datatable [value]=\"lstDBData\" #dt [style]=\"{'width':'100%'}\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"pazeSize\" (filteredData)=\"filterdata($event)\"\r\n                                                 [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [responsive]=\"true\">\r\n\r\n                                    <p-column [style]=\"{'width':'7%', 'text-align':'center'}\" header=\"Select\">\r\n                                        <template pTemplate=\"filter\" let-col>\r\n                                            <ul class=\"list-inline li-all-none\">\r\n                                                <li>\r\n\r\n                                                    <span (click)=\"checkAll()\" style=\"cursor:pointer\">All</span>\r\n                                                </li> |\r\n                                                <li>\r\n                                                    <span (click)=\"unCheckAll()\" style=\"cursor:pointer\">None</span>\r\n\r\n                                                </li>\r\n                                            </ul>\r\n                                        </template>\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <atpar-switch (change)=\"selectedRow(ven,$event)\" [(ngModel)]=\"ven.checkvalue\"></atpar-switch>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column [style]=\"{'width':'10%'}\" field=\"BUSINESS_UNIT\" header=\"Business Unit\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n                                    <p-column [style]=\"{'width':'20%'}\" field=\"LOCATION_ID\" header=\"Location\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n                                    <p-column [style]=\"{'width':'40%'}\" field=\"LOCATION_DESC\" header=\"Description\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n                                    <p-column [style]=\"{'width':'25%'}\" field=\"USER_ID\" header=\"User\" sortable=\"custom\" (sortFunction)=\"customSort($event)\"> </p-column>\r\n                                </atpar-datatable>\r\n                            </div>\r\n                            <br>\r\n                            <div class=\"col-xs-12 col-md-4 col-md-offset-5 col-sm-6 col-sm-5\">\r\n                                <button class=\"btn btn-purple sbtn\" id=\"btnsubmitForGrid\" (click)=\"allocateDestinationLocatons()\">Submit &nbsp; <i class=\"fa fa-check\"></i></button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n";

/***/ }),

/***/ 2115:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">    \r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\" *ngIf=\"true\">\r\n            <br>\r\n            <div class=\"col-xs-12 col-sm-12 col-md-12\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px;\">\r\n                        <form class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                        <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Org Group ID </label>                                    \r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{lblOrgGrpID}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\"\r\n                                                      [(ngModel)]=\"selectedOrgGroupID\" [ngModelOptions]=\"{standalone: true}\"\r\n                                                      filter=\"filter\" *ngIf=\"blnShowOrgGroupID\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                        <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">User ID</label>                                  \r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"ddlUserId\" [id]=\"'ddlUserID'\" [(ngModel)]=\"selectedUserID\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" [required]=\"true\" (onChange)=\"ddlUserChange()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                            \r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                        <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Distrib Type</label>                           \r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"distribType\" [name]=\"txtDist\" [isFocused]=\"'false'\" [id]=\"'Dist'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                        <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Display</label>                                   \r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"ddlDisplay\" [id]=\"'ddlDisplay'\" [(ngModel)]=\"selectedDisplay\" [ngModelOptions]=\"{standalone: true}\" (onChange)=\"ddlUserChange()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"go()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"col-xs-12 table-responsive\" *ngIf=\"dataGrid\">\r\n                            <div class=\"container\">\r\n                            <atpar-datatable [value]=\"lstDistribTypes\" #dt [style]=\"{'width':'100%'}\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"pageSize\" (onSort)=\"onSort($event)\" \r\n                                       (filteredData)=\"filterdata($event)\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [responsive]=\"true\">\r\n                                <p-column [style]=\"{'width':'7%', 'text-align':'center'}\" header=\"Select\" field=\"CHK_VALUE\">\r\n                                    <template pTemplate=\"filter\" let-col>\r\n                                        <ul class=\"list-inline li-all-none\">\r\n                                            <li>\r\n\r\n                                                <span (click)=\"checkAll()\" style=\"cursor:pointer\">All</span>\r\n                                            </li> |\r\n                                            <li>\r\n                                                <span (click)=\"unCheckAll()\" style=\"cursor:pointer\">None</span>\r\n\r\n                                            </li>\r\n                                        </ul>\r\n                                    </template>\r\n                                    <template let-col let-allocate=\"rowData\" pTemplate=\"body\">\r\n                                        <atpar-switch [checked]=\"allocate[col.field]==1?true:false\" [(ngModel)]=\"allocate[col.field]\" name=\"changeStatus\" (click)=\"changeStatus(allocate)\"></atpar-switch>\r\n                                    </template>\r\n                                </p-column>\r\n\r\n                               \r\n                                <p-column field=\"DISTRIB_TYPE\" header=\"Distrib Type\" sortable=\"custom\"   [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'25%'}\"> </p-column>\r\n                                <p-column field=\"DESCR\" header=\"Description\" sortable=\"custom\"   [filter]=\"true\" filterPlaceholder=\"Search\" > </p-column>\r\n                                <p-column field=\"SET_ID\" header=\"Set ID\" sortable=\"custom\"   [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'8%'}\"></p-column>\r\n                            \r\n                            </atpar-datatable>\r\n                            </div>\r\n                            <br>\r\n                            <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"allocateDistributionTypes()\">Submit &nbsp;<i class=\"fa fa-check\"></i></button>                             \r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n</div>\r\n";

/***/ }),

/***/ 2116:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">    \r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\" *ngIf=\"true\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px;\">\r\n                        <form class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Org Group ID </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpIDData}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupDD\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                        <!--<input type=\"text\" name=\"\" id=\"input\" class=\"form-control bdr-purple\" value=\"NOI - NOI\" pattern=\"\" title=\"\" disabled>-->\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">User ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstUsers\" [id]=\"'ddllstUsers'\" [required]=\"true\" [(ngModel)]=\"selectedDropDownUserId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddlUserChange()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Business Unit</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <!--<input type=\"text\" class=\"form-control bdr-purple\" />-->\r\n                                        <atpar-ac-server [(ngModel)]=\"selectedBunit\" [ngModelOptions]=\"{standalone: true}\" [suggestions]=\"lstFilteredBUnits\" (completeMethod)=\"fillBUnitsAuto($event)\"></atpar-ac-server>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"clear\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Description</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <!--<input type=\"text\" class=\"form-control bdr-purple\" />-->\r\n                                        <atpar-text [(ngModel)]=\"selectedDescription\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"''\" [id]=\"'txtdescription'\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"getAllBUnits()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"col-xs-12 table-responsive\" *ngIf=\"isVisible\">\r\n                            <div class=\"container\">\r\n                            <atpar-datatable [value]=\"lstDBData\" [style]=\"{'width':'100%'}\" #dt [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"pazeSize\" (filteredData)=\"filterdata($event)\"\r\n                                             [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [responsive]=\"true\">\r\n\r\n\r\n\r\n                                <p-column [style]=\"{'width':'7%', 'text-align':'center'}\" header=\"Select\">\r\n                                    <template pTemplate=\"filter\" let-col>\r\n                                        <ul class=\"list-inline li-all-none\">\r\n                                            <li>\r\n\r\n                                                <span (click)=\"checkAll()\" style=\"cursor:pointer\">All</span>\r\n                                            </li> |\r\n                                            <li>\r\n                                                <span (click)=\"unCheckAll()\" style=\"cursor:pointer\">None</span>\r\n\r\n                                            </li>\r\n                                        </ul>\r\n                                    </template>\r\n                                    <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                        <atpar-switch (change)=\"selectedRow(ven,$event)\" [(ngModel)]=\"ven.checkvalue\"></atpar-switch>\r\n                                    </template>\r\n                                </p-column>\r\n\r\n                                <p-column [style]=\"{'width':'7%', 'text-align':'center'}\" header=\"Count Flag\">\r\n                                    <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                        <atpar-switch (change)=\"checkedCountFlag(ven,$event)\" [(ngModel)]=\"ven.blnCountFlag\"></atpar-switch>\r\n                                    </template>\r\n                                </p-column>\r\n\r\n                                <p-column [style]=\"{'width':'10%', 'text-align':'center'}\" header=\"Consignment Flag\">\r\n                                    <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                        <atpar-switch (change)=\"checkedConsignFlag(ven,$event)\" [(ngModel)]=\"ven.blnAllowSicConsign\"></atpar-switch>\r\n                                    </template>\r\n                                </p-column>\r\n\r\n                                <p-column [style]=\"{'width':'10%'}\" field=\"BUSINESS_UNIT\" header=\"Business Unit\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n                                <p-column [style]=\"{'width':'40%'}\" field=\"DESCR\" header=\"Description\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n                                <p-column [style]=\"{'width':'25%'}\" field=\"USER_ID\" header=\"User\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" > </p-column>\r\n\r\n\r\n                            </atpar-datatable>\r\n                            </div>\r\n                            <br>\r\n                            <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                <button class=\"btn btn-purple sbtn\" id=\"btnsubmitForGrid\" (click)=\"allocateBUnits()\">Submit &nbsp;<i class=\"fa fa-check\"></i></button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n";

/***/ }),

/***/ 2117:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>this is stock issue daily activity screen.</span>\r\n</div>";

/***/ }),

/***/ 2118:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>this is stock issue daily user activity screen.</span>\r\n</div>";

/***/ }),

/***/ 2119:
/***/ (function(module, exports) {

module.exports = "\r\n<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\">\r\n                        <!--style=\"padding:10px 0 0 0;\"-->\r\n                        <form class=\"form-horizontal form-label-left\" novalidate>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"pull-right\" *ngIf=\"showGrid\">\r\n                                    <ul class=\"list-inline\">\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-envelope-o fa-bg-lg bg-blue\" aria-hidden=\"true\" style=\"cursor:pointer\" id=\"imgMail\" title=\"Send mail\" (click)=\"onSendMailIconClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-print fa-bg-lg bg-blue\" aria-hidden=\"true\" style=\"cursor:pointer\" id=\"imgPrint\" title=\"Print\" (click)=\"onPrintClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-file-excel-o fa-bg-lg bg-blue\" aria-hidden=\"true\" style=\"cursor:pointer\" id=\"imgExcel\" title=\"Excel Format\" (click)=\"onExportToExcelClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                    </ul>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Org Group ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label class=\"control-label lbl-left\" *ngIf=\"!showOrgDropdown\">{{orgGroupId}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroupIds\" *ngIf=\"showOrgDropdown\" [required]=\"true\" [id]=\"'ddlMasterOrgGrp'\" [(ngModel)]=\"orgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddlOrgGroup_SelectedIndexChanged($event)\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Business Unit</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstBusinessUnits\" [id]=\"'ddlBusinessUnit'\" [(ngModel)]=\"businessUnit\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">User ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstUsers\" [id]=\"'ddlUser'\" [(ngModel)]=\"userID\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Status</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstStatus\" [(ngModel)]=\"status\" [id]=\"'ddlStatus'\" [ngModelOptions]=\"{standalone: true}\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Item ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"itemID\" [name]=\"txtItemID\" [id]=\"'txtItemID'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\"> Item Description</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"itemDesc\" [name]=\"txtDesc\" [id]=\"'txtDesc'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Patient ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"patientID\" [name]=\"txtPatient\" [id]=\"'txtPatient'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Dept ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"deptID\" [name]=\"txtDepID\" [id]=\"'txtDepID'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Issue To User</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"issueUser\" [name]=\"txtUser\" [id]=\"'txtUser'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\"> Issue To Location</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"issueLocation\" [name]=\"txtLocation\" [id]=\"'txtLocation'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">From Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <p-calendar [showIcon]=\"true\" [id]=\"'FromDatePicker'\" [(ngModel)]=\"fromDate\" [placeholder]=\"'From Date'\" [dateFormat]=\"'mm/dd/yy'\" [required]=\"true\" [readonlyInput]=\"true\" [ngModelOptions]=\"{standalone: true}\" [yearNavigator]=\"true\"  yearRange=\"1950:2050\"></p-calendar>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">To Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <p-calendar [showIcon]=\"true\" [id]=\"'ToDatePicker'\" [(ngModel)]=\"toDate\" [placeholder]=\"'To Date'\" [dateFormat]=\"'mm/dd/yy'\" [required]=\"true\" [readonlyInput]=\"true\" [ngModelOptions]=\"{standalone: true}\" [yearNavigator]=\"true\"  yearRange=\"1950:2050\"></p-calendar>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"btnGo_Click()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <br />\r\n                        <div style=\"clear:both;\"></div>\r\n                        <br />\r\n                        <div class=\"col-xs-12 help_txt\" style=\"margin:14px;\" *ngIf=\"showGrid\">\r\n                            <span class=\"text-primary\" style=\"float:left\">\r\n                                Issue Report for {{strUserID}} between {{strFromDate}} and {{strToDate}}\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-xs-12\">\r\n                            <div class=\"container no-scrl\" *ngIf=\"showGrid\">\r\n\r\n                                <atpar-datatable [value]=\"lstIssueReport\" scrollable=\"true\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"pageSize\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n                                    <p-column header=\"Issue Date-User\" field=\"ISSUEDATE_USER\" [style]=\"{'width':'200px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\">\r\n                                        <!--<template let-col let-ven=\"rowData\" pTemplate type=\"body\">\r\n                                            {{ven.ISSUE_DATE}} - {{ven.USER_NAME}}\r\n                                        </template>-->\r\n                                    </p-column>\r\n                                    <p-column field=\"ISSUE_TO_LOCATION\" header=\"Issue To Location\" [style]=\"{'width':'120px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"ISSUE_TO_USER\" header=\"Issue To User\" [style]=\"{'width':'100px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"BUSINESS_UNIT\" header=\"Business Unit\" [style]=\"{'width':'100px','text-align':'center'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"DEPT_ID\" header=\"Dept ID\" [style]=\"{'width':'100px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column header=\"Item ID - Item Description\" field=\"ITEMID_DESC\" [style]=\"{'width':'200px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\">\r\n                                        <!--<template let-col let-ven=\"rowData\" pTemplate type=\"body\">\r\n                                            {{ven.ITEM_ID}} - {{ven.ITEM_DESC}}\r\n                                        </template>-->\r\n                                    </p-column>\r\n                                    <p-column header=\"Qty - UOM\" field=\"QTY_UOM\" [style]=\"{'width':'100px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\">\r\n                                        <!--<template let-col let-ven=\"rowData\" pTemplate type=\"body\">\r\n                                            {{ven.QTY}} - {{ven.UOM}}\r\n                                        </template>-->\r\n                                    </p-column>\r\n                                    <p-column field=\"PATIENT_ID\" header=\"Patient ID\" [style]=\"{'width':'100px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"ADJUST_TYPE\" header=\"Adjustment Type\" [style]=\"{'width':'115px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"STATUS\" header=\"Status\" [style]=\"{'width':'100px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'8%','text-align':'center'}\"></p-column>\r\n\r\n                                    <!--<p-column field=\"SIGNATURE\" header=\"Signature\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>-->\r\n                                    <p-column header =\"Signature\"  field=\"SIGNATURE\"  [style]=\"{'width':'120px'}\">\r\n                                        <template let-col let-ven =\"rowData\"  pTemplate=\"body\">\r\n                                            <img src =\"data:image/jpg;base64,{{ven.SIGNATURE}}\" *ngIf=\"ven.SIGNATURE!=null ?true:false\" class=\"img-responsive\" />\r\n                                            </template> \r\n                                            </p-column>\r\n\r\n                                </atpar-datatable>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n\r\n<mail-dialog header=\"Enter Recipient`s Email Address\" [width]=\"450\" (onClose)=\"closeMailPopup()\" [(visible)]=\"isMailDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\r\n    <div class=\"ui-grid ui-grid-responsive ui-fluid\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-1 col-md-1 col-sm-3 col-xs-3\" style=\"margin-top:2%;margin-right:-2%\">\r\n                <span style=\"font-weight:600\">To : </span>\r\n            </div>\r\n            <div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8\">\r\n                <atpar-text [(ngModel)]=\"toMailAddr\" [name]=\"txtToMailAddr\" [id]=\"'txtToMailAddr'\"></atpar-text>\r\n            </div>\r\n            <div class=\"col-lg-1 col-md-1 col-sm-3 col-xs-3\">\r\n                <span><button class=\"btn btn-purple sbtn\" (click)=\"onSendMailClick()\">Send &nbsp;<i class=\"fa fa-share-square-o\" aria-hidden=\"true\"></i></button> </span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</mail-dialog>\r\n\r\n\r\n";

/***/ }),

/***/ 2120:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <atpar-user-parameters [appId]=\"stisAppId\"></atpar-user-parameters>\r\n    <!--<span>this is stock issue user paremeters screen.</span>-->\r\n</div>";

/***/ }),

/***/ 2121:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <router-outlet></router-outlet>\r\n</div>";

/***/ })

});
//# sourceMappingURL=16.601fce7cdc00a672fc7a.chunk.js.map