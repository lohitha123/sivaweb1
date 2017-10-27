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
var HttpService_1 = require("../Shared/HttpService");
var AtParConstants_1 = require("../Shared/AtParConstants");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var mt_delv_loc_details_1 = require("../entities/mt_delv_loc_details");
var deliver_setup_dropoff_location_services_1 = require("./deliver-setup-dropoff-location-services");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var AtParEnums_1 = require("../Shared/AtParEnums");
var routepath_1 = require("../AtPar/Menus/routepath");
var datatable_1 = require("../components/datatable/datatable");
var SetupDropOffLoactionsComponent = (function () {
    function SetupDropOffLoactionsComponent(deliverySetupDropOffServices, spinnerService, commonService, httpService, atParConstant) {
        this.deliverySetupDropOffServices = deliverySetupDropOffServices;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.searchFrom = true;
        this.addEditFrom = false;
        this.orgGrpId = "";
        this.lblShowOrgGroupLabel = false;
        this.ddlShowOrgGroupId = false;
        this.orgGroupIdNgModel = "";
        this.lstOrgGroups = [];
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.searchLocationNgModel = "";
        this.searchDescriptionNgModel = "";
        this.showGrid = false;
        this.orgIdDisabled = false;
        this.saveAndUpdateButton = true;
        this.statusType = "";
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    SetupDropOffLoactionsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.ddlStatusType = [];
                        this.ddlStatusType.push({ label: 'All', value: "" });
                        this.ddlStatusType.push({ label: 'Active', value: true });
                        this.ddlStatusType.push({ label: 'InActive', value: false });
                        this.spinnerService.stop();
                        this.spinnerService.start();
                        this.deliversetuplocDetails = new mt_delv_loc_details_1.MT_DELV_LOC_DETAILS();
                        this.mainlstGridData = new Array();
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 1:
                        _a.sent();
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
    SetupDropOffLoactionsComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
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
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.lblShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGroupIdNgModel = _this.orgGroupData[0].ORG_GROUP_ID;
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.ddlShowOrgGroupId = true;
                                            _this.lstGridData = [];
                                            _this.lstOrgGroups = [];
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME });
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
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupDropOffLoactionsComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.showGrid = false;
                    if (this.orgGroupIdNgModel != "Select One") {
                        if (this.deliversetuplocDetails.DROP_OFF_LOCATION_ID != null &&
                            this.deliversetuplocDetails.DROP_OFF_LOCATION_ID != undefined
                            && this.deliversetuplocDetails.DROP_OFF_LOCATION_ID.trim().length > 0) {
                            this.saveAndUpdateButton = false;
                        }
                        else {
                            this.saveAndUpdateButton = true;
                        }
                    }
                    else {
                        this.saveAndUpdateButton = true;
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    SetupDropOffLoactionsComponent.prototype.btn_go = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        this.statusType = "";
                        this.mainlstGridData = [];
                        this.lstGridData = [];
                        this.growlMessage = [];
                        if (!this.ddlShowOrgGroupId) return [3 /*break*/, 4];
                        if (!(this.orgGroupIdNgModel == "Select One" || this.orgGroupIdNgModel == "")) return [3 /*break*/, 1];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select the Org Group Id " });
                        return [3 /*break*/, 3];
                    case 1:
                        this.showGrid = false;
                        this.growlMessage = [];
                        return [4 /*yield*/, this.getDropOffLocsLists()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        this.showGrid = false;
                        this.growlMessage = [];
                        return [4 /*yield*/, this.getDropOffLocsLists()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "btn_go");
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    SetupDropOffLoactionsComponent.prototype.getDropOffLocsLists = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.lblShowOrgGroupLabel) {
                            this.editOrggroupId = this.orgGrpId;
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0].trim();
                        }
                        else {
                            this.editOrggroupId = this.orgGroupIdNgModel;
                            this.orgGroupIDForDBUpdate = this.orgGroupIdNgModel.split("-")[0].trim();
                        }
                        if (this.searchLocationNgModel == undefined || this.searchLocationNgModel == null ||
                            this.searchDescriptionNgModel == undefined || this.searchDescriptionNgModel == null) {
                            this.searchLocationNgModel.replace(/\'/g, "''").trim();
                            this.searchDescriptionNgModel.replace(/\'/g, "''").trim();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.growlMessage = [];
                        this.lstGridData = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.deliverySetupDropOffServices.getDropOffLocs(this.searchLocationNgModel, this.searchDescriptionNgModel, this.orgGroupIDForDBUpdate, this.deviceTokenEntry)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var lstGrid = res.json().DataList;
                                        if (lstGrid.length > 0) {
                                            _this.lstGridData = lstGrid;
                                            for (var x = 0; x < _this.lstGridData.length; x++) {
                                                var dropOfflocDetails = new mt_delv_loc_details_1.MT_DELV_LOC_DETAILS();
                                                dropOfflocDetails.DROP_OFF_LOCATION_ID = _this.lstGridData[x].DROP_OFF_LOCATION_ID;
                                                dropOfflocDetails.LAST_CLIENT_ADDRESS = _this.lstGridData[x].LAST_CLIENT_ADDRESS;
                                                dropOfflocDetails.LAST_UPDATE_DATE = _this.lstGridData[x].LAST_UPDATE_DATE;
                                                dropOfflocDetails.LAST_UPDATE_USER = _this.lstGridData[x].LAST_UPDATE_USER;
                                                dropOfflocDetails.LOCATION_DESC = _this.lstGridData[x].LOCATION_DESC;
                                                dropOfflocDetails.ORG_GROUP_ID = _this.lstGridData[x].ORG_GROUP_ID;
                                                dropOfflocDetails.STATUS = _this.lstGridData[x].STATUS;
                                                _this.mainlstGridData.push(dropOfflocDetails);
                                            }
                                            _this.showGrid = true;
                                        }
                                        else {
                                            _this.showGrid = false;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.showGrid = false;
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
                        this.clientErrorMsg(ex_4, "getDropOffLocsLists");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupDropOffLoactionsComponent.prototype.editdropOffLocation = function (rowData) {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Drop Off Location';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.growlMessage = [];
            this.deliversetuplocDetails = new mt_delv_loc_details_1.MT_DELV_LOC_DETAILS();
            this.deliversetuplocDetails.DROP_OFF_LOCATION_ID = rowData.DROP_OFF_LOCATION_ID;
            this.previousLocationdata = rowData.DROP_OFF_LOCATION_ID;
            this.deliversetuplocDetails.LOCATION_DESC = rowData.LOCATION_DESC;
            this.deliversetuplocDetails.ORG_GROUP_ID = rowData.ORG_GROUP_ID;
            this.orgGrpId = rowData.ORG_GROUP_ID;
            this.orgGrpId = this.editOrggroupId;
            this.lblShowOrgGroupLabel = true;
            this.ddlShowOrgGroupId = false;
            this.addEditFrom = true;
            this.searchFrom = false;
            this.showGrid = false;
            this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString();
            this.locationValidation = 0;
            this.saveAndUpdateButton = false;
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "editdropOffLocation");
        }
    };
    SetupDropOffLoactionsComponent.prototype.bindModelDataChange = function (event) {
        try {
            if ("saveLocationsNgModel" == event.TextBoxID.toString()) {
                this.locationValidation = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.ddlShowOrgGroupId) {
                if (this.orgGroupIdNgModel != "Select One" && this.locationValidation == 0) {
                    this.saveAndUpdateButton = false;
                }
                else {
                    this.saveAndUpdateButton = true;
                }
            }
            else if (!this.ddlShowOrgGroupId) {
                if (this.locationValidation == 0) {
                    this.saveAndUpdateButton = false;
                }
                else {
                    this.saveAndUpdateButton = true;
                }
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "bindModelDataChange");
        }
    };
    SetupDropOffLoactionsComponent.prototype.add = function () {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Create Drop Off Location';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.growlMessage = [];
            this.deliversetuplocDetails = new mt_delv_loc_details_1.MT_DELV_LOC_DETAILS();
            this.deliversetuplocDetails.LOCATION_DESC = null;
            this.deliversetuplocDetails.DROP_OFF_LOCATION_ID = null;
            this.addEditFrom = true;
            this.searchFrom = false;
            this.showGrid = false;
            this.orgGroupIdNgModel = "Select One";
            this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString();
            this.mode = "Add";
            this.saveAndUpdateButton = true;
            this.orgIdDisabled = false;
            this.searchDescriptionNgModel = "";
            this.searchLocationNgModel = "";
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "add");
        }
    };
    SetupDropOffLoactionsComponent.prototype.close = function () {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.addEditFrom = false;
            this.searchFrom = true;
            this.showGrid = false;
            this.orgGroupIdNgModel = "Select One";
            this.deliversetuplocDetails = new mt_delv_loc_details_1.MT_DELV_LOC_DETAILS();
            this.growlMessage = [];
            this.deliversetuplocDetails.DROP_OFF_LOCATION_ID = null;
            this.searchLocationNgModel = "";
            if (this.mode == "Edit") {
                this.bindOrgGroups();
                this.lblShowOrgGroupLabel = false;
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "close");
        }
    };
    SetupDropOffLoactionsComponent.prototype.saveOrUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(this.mode == "Add")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.saveDropoffLocDetails()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(this.mode == "Edit")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.upDateDropoffLocDetails()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        exMsg_1 = _a.sent();
                        this.clientErrorMsg(exMsg_1, "saveOrUpdate");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SetupDropOffLoactionsComponent.prototype.saveDropoffLocDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exMsg_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.deliversetuplocDetails.LOCATION_DESC == undefined || this.deliversetuplocDetails.LOCATION_DESC == null) {
                            this.deliversetuplocDetails.LOCATION_DESC = "";
                        }
                        if (this.lblShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId.split(" - ")[0].trim();
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.orgGroupIdNgModel;
                        }
                        this.deliversetuplocDetails.ORG_GROUP_ID = this.orgGroupIDForDBUpdate.split("-")[0];
                        this.deliversetuplocDetails.DROP_OFF_LOCATION_ID.replace(/\'/g, "''").trim();
                        this.deliversetuplocDetails.LOCATION_DESC.replace(/\'/g, "''").trim();
                        this.deliversetuplocDetails.STATUS = true;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.deliverySetupDropOffServices.addDropOffLocs(this.deliversetuplocDetails, this.deviceTokenEntry)
                                .catch(this.httpService.handleError).then(function (res) {
                                var webresp = res.json();
                                _this.spinnerService.stop();
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        _this.statusMessage = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Drop Off Location").replace("2%", _this.deliversetuplocDetails.DROP_OFF_LOCATION_ID);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMessage });
                                        _this.deliversetuplocDetails = new mt_delv_loc_details_1.MT_DELV_LOC_DETAILS();
                                        _this.orgGroupIdNgModel = "Select One";
                                        _this.saveAndUpdateButton = true;
                                        _this.showGrid = false;
                                        if (_this.ddlShowOrgGroupId) {
                                            document.getElementById('txtddllstOrgGroups').focus();
                                        }
                                        else {
                                            document.getElementById('saveLocationsNgModel').focus();
                                        }
                                        _this.locationValidation = null;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        if (webresp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_LOCGRPIDALREADYEXISTS) {
                                            _this.growlMessage.push({
                                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Drop Off Location " + _this.deliversetuplocDetails.DROP_OFF_LOCATION_ID + " Already  Exists"
                                            });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_2 = _a.sent();
                        this.clientErrorMsg(exMsg_2, "saveDropoffLocDetails");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupDropOffLoactionsComponent.prototype.upDateDropoffLocDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exMsg_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.deliverySetupDropOffServices.UpdateDropOffLocs(this.deliversetuplocDetails.DROP_OFF_LOCATION_ID, this.deliversetuplocDetails.LOCATION_DESC, this.deliversetuplocDetails.ORG_GROUP_ID, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.previousLocationdata, this.deviceTokenEntry)
                                .catch(this.httpService.handleError).then(function (webresp) {
                                _this.spinnerService.stop();
                                var response = webresp.json();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        _this.statusMessage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Drop Off Location").replace("2%", _this.deliversetuplocDetails.DROP_OFF_LOCATION_ID);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMessage });
                                        document.getElementById('saveLocationsNgModel').focus();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.growlMessage = [];
                                            if (response.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_LOCGRPIDALREADYEXISTS) {
                                                _this.growlMessage.push({
                                                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Drop Off Location Id " + _this.deliversetuplocDetails.DROP_OFF_LOCATION_ID + " Already  Exists"
                                                });
                                            }
                                            else {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                            }
                                        }
                                        break;
                                    case AtParEnums_1.StatusType.Custom: {
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
                        exMsg_3 = _a.sent();
                        this.clientErrorMsg(exMsg_3, "upDateDropoffLocDetails");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupDropOffLoactionsComponent.prototype.edit = function () {
        this.growlMessage = [];
        this.addEditFrom = false;
        this.searchFrom = false;
        this.showGrid = false;
    };
    SetupDropOffLoactionsComponent.prototype.changeStatus = function (droplocationData) {
        return __awaiter(this, void 0, void 0, function () {
            var exMsg_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.deliversetuplocDetails = new mt_delv_loc_details_1.MT_DELV_LOC_DETAILS();
                        this.deliversetuplocDetails.DROP_OFF_LOCATION_ID = droplocationData.DROP_OFF_LOCATION_ID;
                        this.deliversetuplocDetails.LOCATION_DESC = droplocationData.LOCATION_DESC;
                        this.deliversetuplocDetails.ORG_GROUP_ID = droplocationData.ORG_GROUP_ID;
                        this.deliversetuplocDetails.STATUS = droplocationData.STATUS;
                        return [4 /*yield*/, this.statusUpdate()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        exMsg_4 = _a.sent();
                        this.clientErrorMsg(exMsg_4, "changeStatus");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupDropOffLoactionsComponent.prototype.statusUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var updatestatus, exMsg_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        if (this.deliversetuplocDetails.STATUS == true) {
                            updatestatus = 1;
                        }
                        else {
                            updatestatus = 0;
                        }
                        return [4 /*yield*/, this.deliverySetupDropOffServices.statusUpdateDropOffLocS(updatestatus, this.deliversetuplocDetails.ORG_GROUP_ID, this.deliversetuplocDetails.DROP_OFF_LOCATION_ID, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry)
                                .catch(this.httpService.handleError).then(function (webresp) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                var response, filterData, matchedrecord, x, dropOfflocDetails;
                                return __generator(this, function (_a) {
                                    this.spinnerService.stop();
                                    response = webresp.json();
                                    switch (response.StatType) {
                                        case AtParEnums_1.StatusType.Success: {
                                            this.lstGridData.length = 0;
                                            this.growlMessage = [];
                                            this.statusMessage = AtParConstants_1.AtParConstants.Updated_Status_Msg.replace("1%", "Drop Off Location").replace("2%", this.deliversetuplocDetails.DROP_OFF_LOCATION_ID);
                                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: this.statusMessage });
                                            filterData = [];
                                            matchedrecord = this.mainlstGridData.filter(function (x) { return x.DROP_OFF_LOCATION_ID == _this.deliversetuplocDetails.DROP_OFF_LOCATION_ID; });
                                            matchedrecord[0].STATUS = this.deliversetuplocDetails.STATUS;
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
                                                    dropOfflocDetails = new mt_delv_loc_details_1.MT_DELV_LOC_DETAILS();
                                                    dropOfflocDetails.DROP_OFF_LOCATION_ID = filterData[x].DROP_OFF_LOCATION_ID;
                                                    dropOfflocDetails.LAST_CLIENT_ADDRESS = filterData[x].LAST_CLIENT_ADDRESS;
                                                    dropOfflocDetails.LAST_UPDATE_DATE = filterData[x].LAST_UPDATE_DATE;
                                                    dropOfflocDetails.LAST_UPDATE_USER = filterData[x].LAST_UPDATE_USER;
                                                    dropOfflocDetails.LOCATION_DESC = filterData[x].LOCATION_DESC;
                                                    dropOfflocDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                                                    dropOfflocDetails.STATUS = filterData[x].STATUS;
                                                    this.lstGridData.push(dropOfflocDetails);
                                                }
                                            }
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error: {
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Warn: {
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Custom: {
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                            break;
                                        }
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_5 = _a.sent();
                        this.clientErrorMsg(exMsg_5, "statusUpdate");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupDropOffLoactionsComponent.prototype.dataFilter = function (evtdata, filed, filterMatchMode) {
        return __awaiter(this, void 0, void 0, function () {
            var filterData, x, dropOfflocDetails;
            return __generator(this, function (_a) {
                try {
                    filterData = void 0;
                    this.lstGridData = [];
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
                            dropOfflocDetails = new mt_delv_loc_details_1.MT_DELV_LOC_DETAILS();
                            dropOfflocDetails.DROP_OFF_LOCATION_ID = filterData[x].DROP_OFF_LOCATION_ID;
                            dropOfflocDetails.LAST_CLIENT_ADDRESS = filterData[x].LAST_CLIENT_ADDRESS;
                            dropOfflocDetails.LAST_UPDATE_DATE = filterData[x].LAST_UPDATE_DATE;
                            dropOfflocDetails.LAST_UPDATE_USER = filterData[x].LAST_UPDATE_USER;
                            dropOfflocDetails.LOCATION_DESC = filterData[x].LOCATION_DESC;
                            dropOfflocDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                            dropOfflocDetails.STATUS = filterData[x].STATUS;
                            this.lstGridData.push(dropOfflocDetails);
                        }
                    }
                    this.dataTableComponent.reset();
                }
                catch (exMsg) {
                    this.clientErrorMsg(exMsg, "dataFilter");
                }
                return [2 /*return*/];
            });
        });
    };
    SetupDropOffLoactionsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    SetupDropOffLoactionsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.showGrid = null;
        this.spinnerService.stop();
        this.pageSize = null;
        this.statusMessage = null;
        this.addEditFrom = null;
        this.locationValidation = null;
        this.saveAndUpdateButton = null;
        this.searchFrom = null;
        this.mode = null;
        this.lstGridData = null;
        this.lstOrgGroups = null;
        this.orgGroupIdNgModel = null;
        this.ddlShowOrgGroupId = null;
        this.orgGroupData = null;
        this.searchLocationNgModel = null;
        this.searchDescriptionNgModel = null;
        this.previousLocationdata = null;
        this.ddlStatusType = null;
        this.deliversetuplocDetails = null;
        this.orgGroupIDForDBUpdate = null;
        this.statusMessage = null;
        this.orgIdDisabled = null;
        this.mode = null;
        this.orgGrpId = null;
        this.lblShowOrgGroupLabel = null;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], SetupDropOffLoactionsComponent.prototype, "dataTableComponent", void 0);
    SetupDropOffLoactionsComponent = __decorate([
        core_1.Component({
            templateUrl: 'deliver-setup-drop-off-locations.component.html',
            providers: [atpar_common_service_1.AtParCommonService, HttpService_1.HttpService, AtParConstants_1.AtParConstants, deliver_setup_dropoff_location_services_1.DeliverySetupDropOffServices]
        }),
        __metadata("design:paramtypes", [deliver_setup_dropoff_location_services_1.DeliverySetupDropOffServices,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants])
    ], SetupDropOffLoactionsComponent);
    return SetupDropOffLoactionsComponent;
}());
exports.SetupDropOffLoactionsComponent = SetupDropOffLoactionsComponent;
//# sourceMappingURL=deliver-setup-drop-off-locations.component.js.map