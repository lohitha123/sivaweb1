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
var stis_allocate_destination_locations_services_1 = require("../../app/StockIssue/stis-allocate-destination-locations.services");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var linq_es5_1 = require("linq-es5");
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
            if (this.lstgridfilterData != null) {
                var filterlist = linq_es5_1.asEnumerable(this.lstgridfilterData).Distinct(function (x) { return x.BUSINESS_UNIT; }).ToArray();
                if (filterlist != null && filterlist.length == 1) {
                    return;
                }
            }
            else {
                var filterlist = linq_es5_1.asEnumerable(this.lstDBData).Distinct(function (x) { return x.BUSINESS_UNIT; }).ToArray();
                if (filterlist != null && filterlist.length == 1) {
                    return;
                }
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
    AllocateDestinationLocationsComponent = __decorate([
        core_1.Component({
            templateUrl: 'stis-allocate-destination-locations.component.html',
            providers: [stis_allocate_destination_locations_services_1.AllocateDestinationLocationsService, HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [stis_allocate_destination_locations_services_1.AllocateDestinationLocationsService,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants])
    ], AllocateDestinationLocationsComponent);
    return AllocateDestinationLocationsComponent;
}());
exports.AllocateDestinationLocationsComponent = AllocateDestinationLocationsComponent;
//# sourceMappingURL=stis-allocate-destination-locations.component.js.map