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
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var mt_atpar_loc_groups_1 = require("../entities/mt_atpar_loc_groups");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var atpar_setup_location_groups_service_1 = require("./atpar-setup-location-groups.service");
var linq_es5_1 = require("linq-es5");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var SetupLocationGroupsComponent = (function () {
    function SetupLocationGroupsComponent(httpService, setupLocationGroupsServices, spinnerService, commonService, atParConstant) {
        this.httpService = httpService;
        this.setupLocationGroupsServices = setupLocationGroupsServices;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.growlMessage = [];
        this.deviceTokenEntry = [];
        this.startIndex = 0;
        this.ddlShowOrgGroupDD = false;
        this.blnShowOrgGroupLabel = false;
        this.lstOrgGroupData = [];
        this.showGrid = false;
        this.dataGrid = false;
        this.showDiv1 = true;
        this.showDiv2 = false;
        this.showDiv3 = false;
        this.statusType = "";
        this.disableButton = true;
        this.div1DisableButton = true;
        this.gridOrgGroupID = "";
        this.gridLocation = "";
        this.ddlBusinessData = [];
        this.businessDatangModel = "";
        this.gridLocationNgModel = "";
        this.ddlDisplay = [];
        this.locStatus = 0;
        this.lstDistribData = [];
        this.lstgridfilterData = null;
        this.blnsortbycolumn = true;
        this.locationNgModeldData = "";
        this.descriptionNgModelData = "";
        this.sortCol = "";
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    SetupLocationGroupsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.endIndex = +sessionStorage.getItem("RecordsEndindex");
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 1:
                        _a.sent();
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.spinnerService.stop();
                        this.ddlDisplay.push({ label: 'All', value: 'ALL' });
                        this.ddlDisplay.push({ label: 'Allocated', value: 'ALLOC' });
                        this.ddlDisplay.push({ label: 'UnAllocated', value: 'UA' });
                        this.mainlstGridData = new Array();
                        this.ddlStatusType = [];
                        this.ddlStatusType.push({ label: 'All', value: "" });
                        this.ddlStatusType.push({ label: 'Active', value: true });
                        this.ddlStatusType.push({ label: 'InActive', value: false });
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
    SetupLocationGroupsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    SetupLocationGroupsComponent.prototype.bindOrgGroups = function () {
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
                                        _this.orgGroupList = data.DataList;
                                        if (_this.orgGroupList.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.selectedOrgGroupId = _this.orgGroupList[0].ORG_GROUP_ID + " - " + _this.orgGroupList[0].ORG_GROUP_NAME;
                                            _this.selectedOrgGroupIdData = _this.orgGroupList[0].ORG_GROUP_ID;
                                            _this.lblOrgGroupId = _this.orgGroupList[0].ORG_GROUP_ID + " - " + _this.orgGroupList[0].ORG_GROUP_NAME;
                                            _this.OrgGroupId = _this.orgGroupList[0].ORG_GROUP_ID;
                                            //break;
                                        }
                                        else if (_this.orgGroupList.length > 1) {
                                            _this.ddlShowOrgGroupDD = true;
                                            _this.lstOrgGroupData.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupList.length; i++) {
                                                if (_this.orgGroupList[i].ORG_GROUP_ID != "All") {
                                                    _this.lstOrgGroupData.push({ label: _this.orgGroupList[i].ORG_GROUP_NAME + " - " + _this.orgGroupList[i].ORG_GROUP_ID, value: _this.orgGroupList[i].ORG_GROUP_ID });
                                                }
                                            }
                                            _this.selectedOrgGroupId = _this.lstOrgGroupData[0].value;
                                            _this.selectedOrgGroupIdData = _this.lstOrgGroupData[0].value;
                                            _this.OrgGroupId = _this.lstOrgGroupData[0].value;
                                            // break;
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
                        this.clientErrorMsg(ex_2, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupLocationGroupsComponent.prototype.ddlOrgGrpIdChanged = function () {
        this.showGrid = false;
        if (this.selectedOrgGroupId != "Select One") {
            if (this.locationNgModel != null && this.locationNgModel.trim().length > 0) {
                this.disableButton = false;
            }
            else {
                this.disableButton = true;
            }
        }
        else {
            this.disableButton = true;
        }
    };
    SetupLocationGroupsComponent.prototype.ddlOrgGrpIdChanged1 = function () {
        if (this.selectedOrgGroupId != "Select One") {
            this.div1DisableButton = true;
        }
        else {
            this.div1DisableButton = false;
        }
    };
    SetupLocationGroupsComponent.prototype.bindModelDataChange = function (event) {
        if ("location" == event.TextBoxID.toString()) {
            this.locStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if (this.selectedOrgGroupId != "Select One" && this.locStatus == 0) {
            this.disableButton = false;
        }
        else {
            this.disableButton = true;
        }
    };
    SetupLocationGroupsComponent.prototype.close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showDiv2 = false;
        this.showDiv1 = true;
        if (this.lstOrgGroupData.length > 1) {
            this.selectedOrgGroupId = "Select One";
            this.selectedOrgGroupIdData = "Select One";
            this.OrgGroupId = "Select One";
        }
        this.locationNgModel = "";
        this.descriptionNgModel = "";
        this.locationNgModeldData = "";
        this.descriptionNgModelData = "";
        this.growlMessage = [];
    };
    SetupLocationGroupsComponent.prototype.create = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Create Location Group';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showDiv1 = false;
        this.showDiv2 = true;
        this.showGrid = false;
        this.disableButton = true;
        this.growlMessage = [];
    };
    SetupLocationGroupsComponent.prototype.manage_Close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.sortCol = null;
        this.showDiv1 = true;
        this.showDiv3 = false;
        this.dataGrid = false;
        this.businessDatangModel = "";
        this.gridLocationNgModel = "";
        this.selectedDisplayNgModel = "";
        this.descriptionNgModel = "";
        this.locationNgModel = "";
        this.OrgGroupId = "Select One";
        this.selectedOrgGroupIdData = "Select One";
        this.locationNgModeldData = "";
        this.descriptionNgModelData = "";
        this.growlMessage = [];
    };
    SetupLocationGroupsComponent.prototype.btn_go = function () {
        var _this = this;
        this.mainlstGridData = [];
        this.lstGridData = [];
        this.statusType = "";
        if (!this.blnShowOrgGroupLabel) {
            if (this.OrgGroupId == 'Select One' || this.OrgGroupId == '' || this.OrgGroupId == null) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Org Group ID' });
                return;
            }
        }
        if (this.showGrid) {
            this.dataTableComponent.reset();
        }
        this.growlMessage = [];
        if (this.locationNgModeldData == undefined && this.descriptionNgModelData == undefined) {
            this.locationNgModeldData = "";
            this.descriptionNgModelData = "";
        }
        try {
            this.lstGridData = [];
            var orgGroupID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
            if (this.OrgGroupId != '' && this.OrgGroupId != undefined && this.OrgGroupId != 'Select One') {
                orgGroupID = this.OrgGroupId;
            }
            this.spinnerService.start();
            this.setupLocationGroupsServices.getLocationGroups(this.locationNgModeldData, this.descriptionNgModelData, orgGroupID)
                .catch(this.httpService.handleError).then(function (res) {
                var data = res.json();
                _this.spinnerService.stop();
                switch (data.StatType) {
                    case AtParEnums_1.StatusType.Success:
                        {
                            var lstGrid = res.json().DataList;
                            if (lstGrid.length >= 0) {
                                _this.lstGridData = lstGrid;
                                for (var x = 0; x < _this.lstGridData.length; x++) {
                                    var setupLocationDetails = new mt_atpar_loc_groups_1.MT_ATPAR_LOC_GROUPS();
                                    setupLocationDetails.ORG_GROUP_ID = _this.lstGridData[x].ORG_GROUP_ID;
                                    setupLocationDetails.LOC_GROUP_ID = _this.lstGridData[x].LOC_GROUP_ID;
                                    setupLocationDetails.LOC_DESCR = _this.lstGridData[x].LOC_DESCR;
                                    setupLocationDetails.LAST_CLIENT_ADDRESS = _this.lstGridData[x].LAST_CLIENT_ADDRESS;
                                    setupLocationDetails.STATUS = _this.lstGridData[x].STATUS;
                                    setupLocationDetails.LAST_UPDATE_DATE = _this.lstGridData[x].LAST_UPDATE_DATE;
                                    setupLocationDetails.LAST_UPDATE_USER = _this.lstGridData[x].LAST_UPDATE_USER;
                                    _this.mainlstGridData.push(setupLocationDetails);
                                }
                                _this.showGrid = true;
                            }
                            else {
                                _this.showGrid = false;
                            }
                        }
                        break;
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
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btn_go");
        }
    };
    SetupLocationGroupsComponent.prototype.btn_Click_Save = function () {
        var _this = this;
        this.growlMessage = [];
        try {
            var lblOrgGroupId = void 0;
            var sas = void 0;
            if (this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] != "All") {
                lblOrgGroupId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
            }
            else {
                lblOrgGroupId = this.selectedOrgGroupId.trim();
            }
            this.growlMessage = [];
            if (this.descriptionNgModel == undefined || this.descriptionNgModel == null) {
                this.descriptionNgModel = "";
                sas = this.descriptionNgModel;
            }
            else {
                var a = this.descriptionNgModel;
                sas = a.replace(/\'/g, "''").trim();
            }
            this.spinnerService.start();
            this.setupLocationGroupsServices.insertLocationGroups(lblOrgGroupId, this.locationNgModel, sas, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).
                catch(this.httpService.handleError).then(function (res) {
                var response = res.json();
                _this.spinnerService.stop();
                switch (response.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        var statusMessage = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Location Group").replace("2%", _this.locationNgModel);
                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                        _this.locationNgModel = "";
                        _this.descriptionNgModel = "";
                        if (!_this.blnShowOrgGroupLabel) {
                            _this.selectedOrgGroupId = "";
                        }
                        if (_this.ddlShowOrgGroupDD) {
                            document.getElementById("txtddllstOrgGroups").focus();
                        }
                        else {
                            document.getElementById("location").focus();
                        }
                        _this.disableButton = true;
                        break;
                    }
                    case AtParEnums_1.StatusType.Warn: {
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Error: {
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                        break;
                    }
                    case AtParEnums_1.StatusType.Custom: {
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                        break;
                    }
                }
            });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btn_Click_Save");
        }
    };
    SetupLocationGroupsComponent.prototype.changeStatus = function (locationData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupLocationGroupsServices.updateLocationGroups(locationData.STATUS, locationData.LOC_GROUP_ID, locationData.ORG_GROUP_ID).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var statusMessage = AtParConstants_1.AtParConstants.Updated_Status_Msg.replace("1%", "Location Group").replace("2%", locationData.LOC_GROUP_ID);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                        var filterData = [];
                                        _this.lstGridData = [];
                                        var matchedrecord = _this.mainlstGridData.filter(function (x) { return x.LOC_GROUP_ID == locationData.LOC_GROUP_ID; });
                                        matchedrecord[0].STATUS = locationData.STATUS;
                                        if (_this.statusType.toString() == "true") {
                                            filterData = _this.mainlstGridData.filter(function (x) { return x.STATUS == true; });
                                        }
                                        else if (_this.statusType.toString() == "false") {
                                            filterData = _this.mainlstGridData.filter(function (x) { return x.STATUS == false; });
                                        }
                                        else {
                                            filterData = _this.mainlstGridData;
                                        }
                                        if (filterData != null) {
                                            for (var x = 0; x < filterData.length; x++) {
                                                var setuplocDetails = new mt_atpar_loc_groups_1.MT_ATPAR_LOC_GROUPS();
                                                setuplocDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                                                setuplocDetails.LOC_DESCR = filterData[x].LOC_DESCR;
                                                setuplocDetails.LOC_GROUP_ID = filterData[x].LOC_GROUP_ID;
                                                setuplocDetails.LAST_CLIENT_ADDRESS = filterData[x].LAST_CLIENT_ADDRESS;
                                                setuplocDetails.LAST_UPDATE_USER = filterData[x].LAST_UPDATE_USER;
                                                setuplocDetails.LAST_UPDATE_DATE = filterData[x].LAST_UPDATE_DATE;
                                                setuplocDetails.STATUS = filterData[x].STATUS;
                                                _this.lstGridData.push(setuplocDetails);
                                            }
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        if (response.StatusCode == 1102210) {
                                            _this.lstGridData.filter(function (x) { return x.LOC_GROUP_ID == locationData.LOC_GROUP_ID; })[0].STATUS = !locationData.STATUS;
                                        }
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
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_3, "changeStatus");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupLocationGroupsComponent.prototype.lnkbtnParams_Click = function (ven) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var grdiOrgData, ex_4, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Assign Locations';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        grdiOrgData = ven.ORG_GROUP_ID;
                        this.gridLocation = ven.LOC_GROUP_ID;
                        this.showDiv1 = false;
                        this.showDiv2 = false;
                        this.showDiv3 = true;
                        this.showGrid = false;
                        this.orgGroupIDForDBUpdate = ven.ORG_GROUP_ID.split("-")[0];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getOrgGrpName(this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            var OrgGroupdata = data.Data;
                                            _this.gridOrgGroupID = grdiOrgData + " - " + OrgGroupdata;
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
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "lnkbtnParams_Click");
                        return [3 /*break*/, 4];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getOrgGroupBUnits(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType[AtParEnums_1.BusinessType.AllBunits].toString()).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                _this.ddlBusinessData = [];
                                _this.ddlBusinessData.push({ label: "Select Org Id ", value: "" });
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.lstBusinessData = data.DataList;
                                            if (_this.lstBusinessData.length > 0) {
                                                for (var i = 0; i < _this.lstBusinessData.length; i++) {
                                                    _this.ddlBusinessData.push({ label: _this.lstBusinessData[i].toString(), value: _this.lstBusinessData[i].toString() });
                                                }
                                            }
                                            else {
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
                    case 5:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "lnkbtnParams_Click");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SetupLocationGroupsComponent.prototype.btn_Manage_go = function () {
        this.sortCol = null;
        this.growlMessage = [];
        this.getLocationDetails();
    };
    SetupLocationGroupsComponent.prototype.getLocationDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var distribType_1, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.dataGrid) {
                            this.dataTableComponent.reset();
                        }
                        this.lstDistribTypes = [];
                        this.growlMessage = [];
                        distribType_1 = null;
                        this.dataGrid = false;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupLocationGroupsServices.getLocationDetails(this.businessDatangModel, this.gridLocationNgModel, AtParEnums_1.EnumApps.Init, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate, this.gridLocation).
                                catch(this.httpService.handleError).then(function (res) {
                                _this.spinnerService.stop();
                                distribType_1 = res.json();
                                _this.lstDistribTypes = new Array();
                                switch (distribType_1.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstDistribData = distribType_1.DataList;
                                        if (_this.lstDistribData.length > 0) {
                                            for (var i = 0; i < _this.lstDistribData.length; i++) {
                                                if (_this.lstDistribData[i].TYPE == "I") {
                                                    _this.lstDistribData[i].TYPE = "IBU";
                                                }
                                                else {
                                                    _this.lstDistribData[i].TYPE = "Location";
                                                }
                                            }
                                            _this.dataGrid = true;
                                        }
                                        else {
                                            _this.dataGrid = false;
                                            return;
                                        }
                                        if (_this.selectedDisplayNgModel == "ALLOC") {
                                            _this.lstDistribTypes = linq_es5_1.asEnumerable(_this.lstDistribData).Where(function (a) { return a.CHK_VALUE == 1; }).Select(function (a) { return a; }).ToArray();
                                            if (_this.lstDistribTypes.length > 0) {
                                                _this.dataGrid = true;
                                            }
                                            else {
                                                _this.dataGrid = false;
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: " No Data Found" });
                                                return;
                                            }
                                        }
                                        else if (_this.selectedDisplayNgModel == "UA") {
                                            _this.lstDistribTypes = linq_es5_1.asEnumerable(_this.lstDistribData).Where(function (a) { return a.CHK_VALUE != 1; }).Select(function (a) { return a; }).ToArray();
                                            if (_this.lstDistribTypes.length > 0) {
                                                _this.dataGrid = true;
                                            }
                                            else {
                                                _this.dataGrid = false;
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: " No Data Found" });
                                                return;
                                            }
                                        }
                                        else {
                                            _this.lstDistribTypes = _this.lstDistribData;
                                            if (_this.lstDistribTypes.length > 0) {
                                                _this.dataGrid = true;
                                            }
                                            else {
                                                _this.dataGrid = false;
                                                return;
                                            }
                                        }
                                        _this.orgGroupParamValue();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.dataGrid = false;
                                        if (distribType_1.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Org ID is not allocated to Org Group" });
                                            return;
                                        }
                                        else if (distribType_1.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_REMOTEERROR) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please set ERP DataBase Details in Configuration Manager Screen" });
                                            return;
                                        }
                                        else if (distribType_1.StatusCode == AtParStatusCodes_1.AtparStatusCodes.CRCT_E_ERPCOMPCREATION) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP interface access failed, may be this installation is for Par Management or it was not successful, please contact your manager/administrator" });
                                            return;
                                        }
                                        else if (distribType_1.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_RECORDCOUNTEXCEEDED) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please change the filter criteria to display the number of records. Max limit is 5000" });
                                            return;
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: distribType_1.StatusMessage });
                                            _this.gridLocationNgModel = "";
                                            _this.businessDatangModel = "";
                                            return;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.dataGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: distribType_1.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.dataGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: distribType_1.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_6, "getLocationDetails");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupLocationGroupsComponent.prototype.orgGroupParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var recvAppId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        recvAppId = AtParEnums_1.EnumApps.Deliver;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getOrgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.EXCLUDE_LOCATIONS].toString(), recvAppId, this.orgGroupIDForDBUpdate)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                if (_this.strExcludeLocs == "Y") {
                                    _this.getExcludedLocations();
                                }
                                else {
                                    return;
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    SetupLocationGroupsComponent.prototype.getExcludedLocations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupLocationGroupsServices.getExcludedLocations().
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spinnerService.stop();
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
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_7 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_7, "getExcludedLocations");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupLocationGroupsComponent.prototype.btnAssignLocs_Click = function () {
        this.upDateLocations();
    };
    SetupLocationGroupsComponent.prototype.upDateLocations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var intCnt, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        for (intCnt = 0; intCnt <= this.lstDistribData.length - 1; intCnt++) {
                            if (((this.lstDistribData[intCnt].CHK_VALUE == 1) && (this.lstDistribData[intCnt].CHK_ALLOCATED == 0))) {
                                this.lstDistribData[intCnt].PERFORM_ACTION = "1";
                            }
                            else if (((this.lstDistribData[intCnt].CHK_VALUE == 0) && (this.lstDistribData[intCnt].CHK_ALLOCATED == 1))) {
                                this.lstDistribData[intCnt].PERFORM_ACTION = "2";
                            }
                            else {
                                this.lstDistribData[intCnt].PERFORM_ACTION = "0";
                            }
                            if (this.lstDistribData[intCnt].TYPE == "IBU") {
                                this.lstDistribData[intCnt].TYPE = "I";
                            }
                            else {
                                this.lstDistribData[intCnt].TYPE = "P";
                            }
                        }
                        return [4 /*yield*/, this.setupLocationGroupsServices.insertLocationDetails(this.businessDatangModel, this.gridLocation, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.DeviceID], this.orgGroupIDForDBUpdate, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.lstDistribData).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully" });
                                        _this.gridLocationNgModel = "";
                                        _this.businessDatangModel = "";
                                        _this.selectedDisplayNgModel = "ALL";
                                        _this.dataGrid = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.dataGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.dataGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.dataGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "upDateLocations");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupLocationGroupsComponent.prototype.onSort = function (event) {
        try {
            var element = event;
            if (this.sortCol == element.field) {
                this.blnsortbycolumn = !this.blnsortbycolumn;
            }
            else {
                this.blnsortbycolumn = true;
            }
            this.sortCol = element.field;
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
                    this.lstDistribTypes = checkedData.concat(unCheckedData);
                }
                else {
                    this.lstDistribTypes = checkedData.reverse().concat(unCheckedData.reverse()); // sortedUnCheckedData.reverse();
                }
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "onSort");
        }
    };
    SetupLocationGroupsComponent.prototype.ngOnDestroy = function () {
        this.ddlDisplay = null;
        this.growlMessage = null;
        this.lstOrgGroupData = null;
        this.deviceTokenEntry = null;
        this.showDiv1 = null;
        this.showDiv2 = null;
        this.showDiv3 = null;
        this.showGrid = null;
        this.locationNgModel = null;
        this.descriptionNgModel = null;
        this.ddlShowOrgGroupDD = null;
        this.lblOrgGroupId = null;
        this.strOrgGrpId = null;
        this.disableButton = null;
        this.gridOrgGroupID = null;
        this.gridLocation = null;
        this.lstBusinessData = null;
        this.ddlBusinessData = null;
        this.businessDatangModel = null;
        this.selectedDisplayNgModel = null;
        this.spinnerService.stop();
    };
    SetupLocationGroupsComponent.prototype.checkAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.endIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null || this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
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
            this.spinnerService.stop();
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    SetupLocationGroupsComponent.prototype.unCheckAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.endIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null || this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
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
    SetupLocationGroupsComponent.prototype.filterdata = function (event) {
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    SetupLocationGroupsComponent.prototype.dataFilter = function (evtdata, filed, filterMatchMode) {
        return __awaiter(this, void 0, void 0, function () {
            var filterData, x, setupLocationDetails;
            return __generator(this, function (_a) {
                this.lstGridData.length = 0;
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
                        setupLocationDetails = new mt_atpar_loc_groups_1.MT_ATPAR_LOC_GROUPS();
                        setupLocationDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                        setupLocationDetails.LOC_GROUP_ID = filterData[x].LOC_GROUP_ID;
                        setupLocationDetails.LOC_DESCR = filterData[x].LOC_DESCR;
                        setupLocationDetails.LAST_CLIENT_ADDRESS = filterData[x].LAST_CLIENT_ADDRESS;
                        setupLocationDetails.STATUS = filterData[x].STATUS;
                        setupLocationDetails.LAST_UPDATE_DATE = filterData[x].LAST_UPDATE_DATE;
                        setupLocationDetails.LAST_UPDATE_USER = filterData[x].LAST_UPDATE_USER;
                        this.lstGridData.push(setupLocationDetails);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], SetupLocationGroupsComponent.prototype, "dataTableComponent", void 0);
    SetupLocationGroupsComponent = __decorate([
        core_1.Component({
            //moduleId: module.id,
            templateUrl: 'atpar-setup-location-groups.component.html',
            providers: [atpar_setup_location_groups_service_1.SetupLocationGroupsServices, atpar_common_service_1.AtParCommonService, HttpService_1.HttpService, AtParConstants_1.AtParConstants],
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            atpar_setup_location_groups_service_1.SetupLocationGroupsServices,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            AtParConstants_1.AtParConstants])
    ], SetupLocationGroupsComponent);
    return SetupLocationGroupsComponent;
}());
exports.SetupLocationGroupsComponent = SetupLocationGroupsComponent;
//# sourceMappingURL=atpar-setup-location-groups.component.js.map