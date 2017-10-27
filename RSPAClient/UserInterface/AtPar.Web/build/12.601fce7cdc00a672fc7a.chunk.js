webpackJsonp([12],{

/***/ 1451:
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
var MT_ATPAR_SECURITY_AUDIT_1 = __webpack_require__(325);
var HttpService_1 = __webpack_require__(12);
var api_1 = __webpack_require__(72);
var AtParEnums_1 = __webpack_require__(14);
var AtParEnums_2 = __webpack_require__(14);
var AtParEnums_3 = __webpack_require__(14);
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var AtParConstants_1 = __webpack_require__(31);
var AtParEnums_4 = __webpack_require__(14);
var deliver_allocate_business_units_component_services_1 = __webpack_require__(1719);
var AllocateBusinessUnitsComponent = (function () {
    /**
   * Constructor
   * @param DeliverAllocateBunitServices
   * @param ConfirmationService
   * @param httpService
   * @param spinnerService
   * @param atParConstant
   */
    function AllocateBusinessUnitsComponent(httpService, spinnerService, commonService, confirmationService, atParConstant, deliverAllocateBunitServices) {
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.confirmationService = confirmationService;
        this.atParConstant = atParConstant;
        this.deliverAllocateBunitServices = deliverAllocateBunitServices;
        this.orgGrpId = "";
        this.orgGrpIDData = "";
        this.selectedOrgGroupId = "";
        this.selectedDropDownUserId = "";
        this.selectedBunit = "";
        this.selectedDescription = "";
        this.orgGroupIDForDBUpdate = "";
        this.custom = "custom";
        this.isAuditRequired = "";
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.blnsortbycolumn = true;
        this.preField = "";
        this.isVisible = false;
        this.showAllocGroup = false;
        this.showGrid = false;
        this.deviceTokenEntry = [];
        this.lstUsers = [];
        this.lstOrgGroups = [];
        this.dataCheckedSorting = [];
        this.growlMessage = [];
        this.lstBUnits = [];
        this.lstFilteredBUnits = [];
    }
    /**
    * Init Function  for binding OrgGroupIds to the dropdown when page loading
    */
    AllocateBusinessUnitsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.intAppId = AtParEnums_4.EnumApps.Deliver;
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.lstCheckedBUnits = new Array();
                        this.dataCheckedSorting = new Array();
                        this.dataUncheckedSorting = new Array();
                        this.lstFilteredBUnits = new Array();
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.checkAuditAllowed();
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 1:
                        _a.sent();
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
    /**
    * Getting OrgGroupIds,Bunits,users data from database when page loading
    */
    AllocateBusinessUnitsComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
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
                                        _this.orgGroupData = data.DataList;
                                        _this.spinnerService.stop();
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpIDData = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.populateBunitsDdlst();
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
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "bindOrgGroups");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Getting  Users data from database
    */
    AllocateBusinessUnitsComponent.prototype.bindUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstUsers = [];
                        this.lstUsers.push({ label: "Select User", value: "Select User" });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUsersList(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.intAppId, this.orgGroupIDForDBUpdate)
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
    /**
    * This method is calling when user selecting  OrgGrpId in dropdown and using for getting users,bunits data from database
    */
    AllocateBusinessUnitsComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
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
                        return [4 /*yield*/, this.populateBunitsDdlst()];
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
    /**
    * This method is calling when user selecting UserId in dropdown
    */
    AllocateBusinessUnitsComponent.prototype.ddlUserChanged = function () {
        this.growlMessage = [];
        this.isVisible = false;
    };
    /**
     * checking audition for this page
     */
    AllocateBusinessUnitsComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.getAuditAllowed(this.intAppId, "mt_delv_bunit_alloc.aspx").
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
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "checkAuditAllowed");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Insert AuditData for this page
     */
    AllocateBusinessUnitsComponent.prototype.insertAuditData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var auditSecurity, auditSecurityLst, intCnount, strScreenName, ex_6;
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
                                auditSecurity.KEY_2 = this.intAppId.toString();
                                auditSecurity.KEY_3 = this.lstCheckedBUnits[intCnount].BUSINESS_UNIT;
                                auditSecurity.KEY_4 = "";
                                auditSecurity.KEY_5 = "";
                                auditSecurityLst.push(auditSecurity);
                            }
                        }
                        strScreenName = "mt_delv_bunit_alloc.aspx";
                        return [4 /*yield*/, this.commonService.insertAuditData(auditSecurityLst, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], strScreenName).
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
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "insertAuditData");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Getting Bunits
     */
    AllocateBusinessUnitsComponent.prototype.fillBUnitsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstFilteredBUnits = [];
                        query = event.query;
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId;
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
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_2.BusinessType.AllBunits).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.lstBUnits = data.DataList;
                                        _this.lstFilteredBUnits = _this.filterBusinessUnits(query, _this.lstBUnits);
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "fillBUnitsAuto");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Filtering Bunits
     */
    AllocateBusinessUnitsComponent.prototype.filterBusinessUnits = function (query, businessunits) {
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
    /**
    * This method is calling when click on CheckAll Button in Datatable
    */
    /**
    * This method is calling when click on UnCheckAll Button in Datatable
    */
    AllocateBusinessUnitsComponent.prototype.checkAll = function () {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].CHK_VALUE = 1;
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
    AllocateBusinessUnitsComponent.prototype.unCheckAll = function () {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;
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
    /*
    * This method is calling when we selecting particular record in DataTable and getting selected record data
    */
    AllocateBusinessUnitsComponent.prototype.selectedRow = function (values, event) {
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
    /*
   * Storing data for sorting in two different  lists one for allocated and another for Unallocated
   */
    AllocateBusinessUnitsComponent.prototype.BindDataGrid = function () {
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
    /*
    * This method is for sorting the data  based on seleted column in DataTable
    */
    AllocateBusinessUnitsComponent.prototype.customSort1 = function (event) {
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
    AllocateBusinessUnitsComponent.prototype.customSort = function (event, field) {
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
    AllocateBusinessUnitsComponent.prototype.filterdata = function (event) {
        this.lstgridfilterData = [];
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    /*
    * Getting OrgBunits from database
    */
    AllocateBusinessUnitsComponent.prototype.populateBunitsDdlst = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isOrgBUnitsExist = false;
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
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
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_2.BusinessType.AllBunits).
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
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "populateBunitsDdlst");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when click on Go button
    */
    AllocateBusinessUnitsComponent.prototype.getAllBUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isBUnitsExists, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.isVisible = false;
                        this.lstgridfilterData = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpId;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
                            return [2 /*return*/];
                        }
                        if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User ID' });
                            this.showGrid = false;
                            return [2 /*return*/, false];
                        }
                        if ((this.selectedBunit != null && this.selectedBunit != undefined && this.selectedBunit != '') || (this.selectedDescription != null && this.selectedDescription != undefined && this.selectedDescription != '')) {
                            this.lblSearched = "0";
                        }
                        this.lstDBData = new Array();
                        return [4 /*yield*/, this.populateBunitsDdlst()];
                    case 2:
                        isBUnitsExists = _a.sent();
                        if (!(isBUnitsExists == true)) return [3 /*break*/, 4];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.deliverAllocateBunitServices.getBUnits(this.lstFilteredBUnits, this.selectedDropDownUserId, this.selectedBunit, this.selectedDescription, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .forEach(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_3.StatusType.Success: {
                                        _this.spinnerService.stop();
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
                                    case AtParEnums_3.StatusType.Warn: {
                                        _this.isVisible = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Error: {
                                        _this.isVisible = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_3.StatusType.Custom: {
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
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "getAllBUnits");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when user click on Submit Button
    */
    AllocateBusinessUnitsComponent.prototype.allocateBUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strsearched, ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.lblSearched != null && this.lblSearched != '' && this.lblSearched != undefined) {
                            strsearched = true;
                        }
                        else {
                            strsearched = false;
                        }
                        if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User ID' });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.deliverAllocateBunitServices.allocateBUnits(this.selectedDropDownUserId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.lstFilteredBUnits, strsearched, this.lstDBData)
                                .subscribe(function (response) {
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
                                        _this.showGrid = false;
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, "allocateBUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is for display error message
    */
    AllocateBusinessUnitsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    /**
    * This method is for clearing all the variables
    */
    AllocateBusinessUnitsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstUsers = null;
        this.lstOrgGroups = null;
        this.intAppId = null;
        this.lstBUnits = null;
        this.lstFilteredBUnits = null;
        this.lstCheckedBUnits = null;
        this.lstDBData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.orgGrpIDData = null;
        this.orgGrpId = null;
    };
    return AllocateBusinessUnitsComponent;
}());
AllocateBusinessUnitsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1967),
        providers: [HttpService_1.HttpService, api_1.ConfirmationService, AtParConstants_1.AtParConstants, atpar_common_service_1.AtParCommonService, deliver_allocate_business_units_component_services_1.DeliverAllocateBunitServices],
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        api_1.ConfirmationService,
        AtParConstants_1.AtParConstants,
        deliver_allocate_business_units_component_services_1.DeliverAllocateBunitServices])
], AllocateBusinessUnitsComponent);
exports.AllocateBusinessUnitsComponent = AllocateBusinessUnitsComponent;


/***/ }),

/***/ 1452:
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
        this.deliverAppId = AtParEnums_1.EnumApps.Deliver;
    }
    return AllocateLocationGroupsComponent;
}());
AllocateLocationGroupsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1968)
    })
], AllocateLocationGroupsComponent);
exports.AllocateLocationGroupsComponent = AllocateLocationGroupsComponent;


/***/ }),

/***/ 1453:
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
var api_1 = __webpack_require__(72);
var atpar_common_service_1 = __webpack_require__(43);
var event_spinner_service_1 = __webpack_require__(24);
var datatable_1 = __webpack_require__(71);
var AtParEnums_1 = __webpack_require__(14);
var deliver_assign_signatories_services_1 = __webpack_require__(1720);
var AtParEnums_2 = __webpack_require__(14);
var AtParConstants_1 = __webpack_require__(31);
var MT_DELV_COST_CENTER_AUTH_PERSON_1 = __webpack_require__(1735);
var routepath_1 = __webpack_require__(70);
var AssignSignatoriesComponent = (function () {
    function AssignSignatoriesComponent(httpService, spinnerService, confirmationService, assignSignatoriesService, commonService, atParConstant) {
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.confirmationService = confirmationService;
        this.assignSignatoriesService = assignSignatoriesService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        /*Variable Declaration*/
        this.pop = false;
        this.table = false;
        this.form = false;
        this.form2 = false;
        this.filter = true;
        this.deleteToken = false;
        this.editUser = false;
        this.loading = true;
        this.growlMessage = [];
        this.deviceTokenEntry = [];
        this.isEditMode = false;
        this.disableButton = true;
        this.disableButtonUser = true;
        this.tableData = false;
        this.strData = '';
        this.breadCrumbMenu = new routepath_1.Menus();
        this.ven = new MT_DELV_COST_CENTER_AUTH_PERSON_1.MT_DELV_COST_CENTER_AUTH_PERSON();
        this.codes = "";
    }
    AssignSignatoriesComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.newItem = new MT_DELV_COST_CENTER_AUTH_PERSON_1.MT_DELV_COST_CENTER_AUTH_PERSON();
                        return [4 /*yield*/, this.getCodes()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.displayCatchException(ex_1, "ngOnInit");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Auto Complete event for seraching Cost Center
     * @param event
     */
    AssignSignatoriesComponent.prototype.searchAutoCompleteCode = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query_1;
            return __generator(this, function (_a) {
                try {
                    query_1 = event.query;
                    this.lstDBDataSearch = [];
                    setTimeout(function () {
                        _this.lstDBDataSearch = _this.filterCostCenter(query_1, _this.lstDBDataTotal);
                    }, 50);
                }
                catch (ex) {
                    this.displayCatchException(ex, "searchAutoCompleteCode");
                }
                return [2 /*return*/];
            });
        });
    };
    AssignSignatoriesComponent.prototype.filterCostCenter = function (query, lstDBData) {
        this.growlMessage = [];
        try {
            var filtered = [];
            if (query.length >= 1) {
                for (var i = 0; i < lstDBData.length; i++) {
                    var lstDBDataValue = lstDBData[i];
                    if (lstDBDataValue.COST_CENTER_CODE.toString().toLowerCase().indexOf(query.toString().toLowerCase()) == 0) {
                        filtered.push(lstDBDataValue.COST_CENTER_CODE);
                    }
                }
            }
            return filtered;
        }
        catch (ex) {
            this.displayCatchException(ex, "filterCostCenter");
        }
    };
    AssignSignatoriesComponent.prototype.onMenuSearchKeyPress = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if ((charCode > 31 && charCode <= 47) || (charCode >= 58 && charCode <= 64) || (charCode >= 91 && charCode <= 96) || (charCode >= 123 && charCode <= 126)) {
            this.codes = "";
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Special Characters are not allowed' });
            return false;
        }
    };
    /**
     * This function is called when we click go button
     */
    AssignSignatoriesComponent.prototype.go = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pop = false;
                        this.form = false;
                        this.form2 = false;
                        this.table = false;
                        this.filter = true;
                        this.isEditMode = false;
                        this.lstDBData = [];
                        this.lstSignDBData = [];
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.getCodes()];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        if (this.lstDBData != null && this.lstDBData.length > 0 && this.lstDBData != undefined) {
                            this.pop = true;
                        }
                        if (this.lstDBData.length == 0) {
                            if (this.deleteToken == true) {
                                this.deleteToken = false;
                            }
                            else {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Codes(s) Found' });
                            }
                            this.pop = false;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.displayCatchException(ex_2, "go");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Getting Cost Center Codes
     */
    AssignSignatoriesComponent.prototype.getCodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.assignSignatoriesService.getCodes(this.codes).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstDBData = data.DataList;
                                        if (_this.codes == '' || _this.codes == undefined || _this.codes == null) {
                                            _this.lstDBDataTotal = data.DataList;
                                        }
                                    }
                                }
                                if (data.StatType != 4) {
                                    _this.commonErrorHandling(data);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.displayCatchException(ex_3, "getCodes");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function is called when we click on goback
     */
    AssignSignatoriesComponent.prototype.goBack = function () {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.form = false;
            this.form2 = false;
            this.table = false;
            this.filter = true;
            this.isEditMode = false;
            this.pop = false;
            this.growlMessage = [];
        }
        catch (ex) {
            this.displayCatchException(ex, "goBack");
        }
    };
    /**
     * This function is called when we click add button
     */
    AssignSignatoriesComponent.prototype.addCostCenterCode = function () {
        try {
            // this.filter = false;
            this.growlMessage = [];
            if (this.isEditMode == true) {
                if (this.isEditMode) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please  update or cancel before continuing!!!" });
                    return;
                }
                this.disableButton = false;
            }
            else {
                this.disableButton = true;
            }
            this.codes = '';
            this.form = true;
            this.pop = false;
            this.newItem = new MT_DELV_COST_CENTER_AUTH_PERSON_1.MT_DELV_COST_CENTER_AUTH_PERSON();
            this.newItem.COST_CENTER_CODE = "";
        }
        catch (ex) {
            this.displayCatchException(ex, "addCostCenterCode");
        }
    };
    /**
     * This method is for disable submit button untill all basic info is entered
     * @param event
     */
    AssignSignatoriesComponent.prototype.bindModelDataChange = function (event) {
        try {
            if ("Code" == event.TextBoxID.toString()) {
                this.codeStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("userID" == event.TextBoxID.toString()) {
                this.userIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("fName" == event.TextBoxID.toString()) {
                this.userNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtLastName" == event.TextBoxID.toString()) {
                this.middileNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtMiddleName" == event.TextBoxID.toString()) {
                this.lastNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.form2 != true) {
                if ((this.codeStatus == 0)) {
                    this.disableButton = false;
                }
                else {
                    this.disableButton = true;
                }
            }
            if (this.form2 == true) {
                if ((this.userIDStatus == 0) && (this.userNameStatus == 0)) {
                    if ((this.middileNameStatus == undefined || this.middileNameStatus == 0) && (this.lastNameStatus == undefined || this.lastNameStatus == 0)) {
                        this.disableButtonUser = false;
                    }
                    else {
                        this.disableButtonUser = true;
                    }
                    // this.disableButtonUser = false;
                }
                else {
                    this.disableButtonUser = true;
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "bindModelDataChange");
        }
    };
    /**
     * This function is called when click on edit button
     * @param costCenterCode
     */
    AssignSignatoriesComponent.prototype.editCostCenterCode = function (costCenterCode) {
        try {
            //this.filter = false;
            this.isEditMode = true;
            this.form = true;
            this.pop = false;
            this.disableButton = false;
            this.newItem = Object.assign({}, costCenterCode);
            this.existingCostCenterCode = costCenterCode.COST_CENTER_CODE;
        }
        catch (ex) {
            this.displayCatchException(ex, "editCostCenterCode");
        }
    };
    /**
     * This function is called when we want to update the Cost Center Code
     */
    AssignSignatoriesComponent.prototype.updateSignatoryCode = function () {
        var _this = this;
        try {
            this.assignSignatoriesService.updateAuthSign(this.newItem.COST_CENTER_CODE, this.existingCostCenterCode).forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_2.StatusType.Success: {
                        _this.growlMessage = [];
                        var msg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", 'Cost Center Code').replace("2%", _this.newItem.COST_CENTER_CODE);
                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                        _this.isEditMode = true;
                        _this.form = true;
                        break;
                    }
                }
                _this.commonErrorHandling(resp);
            });
        }
        catch (ex) {
            this.displayCatchException(ex, "updateSignatoryCode");
        }
    };
    /**
     * This function is called when we click on save button when adding cost code
     */
    AssignSignatoriesComponent.prototype.saveSignatoryCode = function () {
        try {
            this.form = false;
            if (this.isEditMode) {
                this.updateSignatoryCode();
            }
            else {
                this.assignSignatories(this.newItem);
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "saveSignatoryCode");
        }
    };
    /**
     * This function is called when we want to insert user information for particular cost code
     */
    AssignSignatoriesComponent.prototype.saveAuthSignatoryCode = function () {
        var _this = this;
        try {
            this.assignSignatoriesService.addAuthSign(this.newItem.COST_CENTER_CODE, this.newItem.AUTH_USER_ID, this.newItem.FIRST_NAME, this.newItem.LAST_NAME, this.newItem.MIDDLE_NAME).forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_2.StatusType.Success: {
                        _this.growlMessage = [];
                        var msg = '';
                        // if (this.newItem.AUTH_USER_ID != null || this.newItem.AUTH_USER_ID !== '') {
                        msg = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", 'Cost Center Code').replace("2%", _this.newItem.COST_CENTER_CODE);
                        //}
                        //else {
                        //    msg = AtParConstants.Created_Msg.replace("1%", 'User ID').replace("2%", this.newItem.AUTH_USER_ID);
                        //}
                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                        _this.newItem.AUTH_USER_ID = '';
                        _this.newItem.FIRST_NAME = '';
                        _this.newItem.LAST_NAME = '';
                        _this.newItem.MIDDLE_NAME = '';
                        _this.disableButton = true;
                        _this.disableButtonUser = true;
                        document.getElementById('userID').focus();
                        _this.userIDStatus = 1;
                        _this.userNameStatus = 1;
                        //  this.assignSignatories(this.newItem);
                        break;
                    }
                    case AtParEnums_2.StatusType.Warn: {
                        _this.spinnerService.stop();
                        _this.growlMessage = [];
                        var msg = AtParConstants_1.AtParConstants.AlreadyExist_Msg.replace("1%", 'User ID').replace("2%", _this.newItem.AUTH_USER_ID);
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg });
                        break;
                    }
                    case AtParEnums_2.StatusType.Error: {
                        _this.spinnerService.stop();
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    }
                    case AtParEnums_2.StatusType.Custom: {
                        _this.spinnerService.stop();
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.displayCatchException(ex, "saveAuthSignatoryCode");
        }
    };
    /**
     * This function is called when  getting data of cost center code
     * @param costCenterAuthPerson
     */
    AssignSignatoriesComponent.prototype.assignSignatories = function (costCenterAuthPerson) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Assign Signatories ';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.form2 = false;
                        this.form = false;
                        this.pop = false;
                        this.filter = false;
                        this.table = true;
                        this.newItem.COST_CENTER_CODE = costCenterAuthPerson.COST_CENTER_CODE;
                        this.lstSignDBData = [];
                        this.editUser = true;
                        if (this.table == true || this.tableData == true) {
                            this.strData = 'Cost Center Code : ' + costCenterAuthPerson.COST_CENTER_CODE;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        this.spinnerService.start();
                        if (!(costCenterAuthPerson == "" || costCenterAuthPerson == null || costCenterAuthPerson == undefined)) return [3 /*break*/, 2];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Enter Cost Center Code...' });
                        this.spinnerService.stop();
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, this.assignSignatoriesService.getAuthSign(costCenterAuthPerson.COST_CENTER_CODE).catch(this.httpService.handleError).then(function (res) {
                            var data = res.json();
                            _this.spinnerService.stop();
                            _this.lstSignDBData = data.DataList;
                            switch (data.StatType) {
                                case AtParEnums_2.StatusType.Success: {
                                    if (_this.lstSignDBData != null && _this.lstSignDBData.length > 0) {
                                        _this.tableData = true;
                                    }
                                    else {
                                        _this.growlMessage = [];
                                        _this.tableData = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        return;
                                    }
                                    for (var i = 0; i < _this.lstSignDBData.length; i++) {
                                        _this.lstSignDBData[i].COST_CENTER_CODE = costCenterAuthPerson.COST_CENTER_CODE;
                                    }
                                    break;
                                }
                                case AtParEnums_2.StatusType.Warn: {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    if (_this.lstSignDBData != null && _this.lstSignDBData.length > 0) {
                                        _this.tableData = true;
                                    }
                                    else {
                                        _this.growlMessage = [];
                                        _this.tableData = false;
                                    }
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_2.StatusType.Error: {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_2.StatusType.Custom: {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    break;
                                }
                            }
                        })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_4 = _a.sent();
                        this.displayCatchException(ex_4, "assignSignatories");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Common Error Handlingh Method
     * @param data
     */
    AssignSignatoriesComponent.prototype.commonErrorHandling = function (data) {
        try {
            switch (data.StatType) {
                case AtParEnums_2.StatusType.Warn: {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                    break;
                }
                case AtParEnums_2.StatusType.Error: {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                    break;
                }
                case AtParEnums_2.StatusType.Custom: {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                    break;
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "commonErrorHandling");
        }
    };
    AssignSignatoriesComponent.prototype.confirmDelete = function (costCenterAuthPerson, isCostCenterCode) {
        var _this = this;
        try {
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: 'Are you sure you want to delete this?',
                accept: function () { _this.deleteSignatories(costCenterAuthPerson, isCostCenterCode); }
            });
        }
        catch (ex) {
            this.displayCatchException(ex, "confirmDelete");
        }
    };
    /**
     * This function is called when we click delete button
     * @param costCenterAuthPerson
     * @param isCostCenterCode
     */
    AssignSignatoriesComponent.prototype.deleteSignatories = function (costCenterAuthPerson, isCostCenterCode) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isEditMode && isCostCenterCode) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please update or cancel before continuing!!!" });
                            return [2 /*return*/];
                        }
                        if (this.lstDBData.length == 1) {
                            this.deleteToken = true;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.assignSignatoriesService.deleteAuthSign(costCenterAuthPerson.COST_CENTER_CODE, costCenterAuthPerson.AUTH_USER_ID).forEach(function (resp) {
                                switch (resp.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.growlMessage = [];
                                        var msg = '';
                                        var message = "Deleted Successfully";
                                        if (!isCostCenterCode) {
                                            msg = AtParConstants_1.AtParConstants.Deleted_Msg.replace("1%", 'User ID').replace("2%", costCenterAuthPerson.AUTH_USER_ID);
                                            //message = " User ID " + costCenterAuthPerson.AUTH_USER_ID + message;
                                            _this.assignSignatories(costCenterAuthPerson);
                                        }
                                        else {
                                            msg = AtParConstants_1.AtParConstants.Deleted_Msg.replace("1%", 'Cost center code').replace("2%", costCenterAuthPerson.COST_CENTER_CODE);
                                            // message = " Cost center code " + costCenterAuthPerson.COST_CENTER_CODE + message;
                                            _this.go();
                                        }
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                                        break;
                                    }
                                }
                                _this.commonErrorHandling(resp);
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.displayCatchException(ex_5, "deleteSignatories");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function is called when we click on cancel
     */
    AssignSignatoriesComponent.prototype.goCancel = function () {
        this.form = false;
        this.form2 = false;
        this.table = false;
        this.filter = true;
        this.isEditMode = false;
        this.pop = false;
    };
    /**
     * This function is called when we click on add button to add user info
     */
    AssignSignatoriesComponent.prototype.edit = function () {
        try {
            this.disableButtonUser = true;
            this.breadCrumbMenu.SUB_MENU_NAME = 'Add Signatories ';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.form2 = true;
            this.form = false;
            this.table = false;
            this.pop = false;
            this.newItem.LAST_NAME = '';
            this.newItem.MIDDLE_NAME = '';
            this.growlMessage = [];
            this.userIDStatus = null;
            this.userNameStatus = null;
            setTimeout(function () {
                document.getElementById("userID").focus();
            }, 500);
        }
        catch (ex) {
            this.displayCatchException(ex, "edit");
        }
    };
    /**
     * This function is called when we click on goback
     */
    AssignSignatoriesComponent.prototype.back = function () {
        this.form2 = false;
        this.table = false;
        this.pop = false;
        this.filter = true;
    };
    /**
     * This function is called when we click on Close
     */
    AssignSignatoriesComponent.prototype.close = function () {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.newItem.AUTH_USER_ID = '';
            this.newItem.FIRST_NAME = '';
            this.newItem.LAST_NAME = '';
            this.newItem.MIDDLE_NAME = '';
            this.disableButton = true;
            this.growlMessage = [];
            this.saveSignatoryCode();
        }
        catch (ex) {
            this.displayCatchException(ex, "close");
        }
    };
    /**
  * This method is for displaying catch block error messages
  * @param event
  */
    AssignSignatoriesComponent.prototype.displayCatchException = function (ex, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString(), funName, this.constructor.name);
    };
    /**
   * delete all the values from variables
   */
    AssignSignatoriesComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstDBData = [];
        this.lstSignDBData = [];
        this.pop = false;
        this.disableButton = true;
        this.form = false;
        this.form2 = false;
        this.filter = true;
    };
    return AssignSignatoriesComponent;
}());
__decorate([
    core_1.ViewChild(datatable_1.DataTable),
    __metadata("design:type", datatable_1.DataTable)
], AssignSignatoriesComponent.prototype, "dataTableComponent", void 0);
AssignSignatoriesComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1969),
        providers: [HttpService_1.HttpService, api_1.ConfirmationService, deliver_assign_signatories_services_1.AssignSignatoriesService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService,
        event_spinner_service_1.SpinnerService,
        api_1.ConfirmationService,
        deliver_assign_signatories_services_1.AssignSignatoriesService,
        atpar_common_service_1.AtParCommonService,
        AtParConstants_1.AtParConstants])
], AssignSignatoriesComponent);
exports.AssignSignatoriesComponent = AssignSignatoriesComponent;


/***/ }),

/***/ 1454:
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
var CarrierInformationComponent = (function () {
    function CarrierInformationComponent() {
        this.dlvrAppId = AtParEnums_1.EnumApps.Deliver;
    }
    return CarrierInformationComponent;
}());
CarrierInformationComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1970)
    })
], CarrierInformationComponent);
exports.CarrierInformationComponent = CarrierInformationComponent;


/***/ }),

/***/ 1455:
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
        template: __webpack_require__(1971)
    })
], DailyActivityComponent);
exports.DailyActivityComponent = DailyActivityComponent;


/***/ }),

/***/ 1456:
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
        template: __webpack_require__(1972)
    })
], DailyUserActivityComponent);
exports.DailyUserActivityComponent = DailyUserActivityComponent;


/***/ }),

/***/ 1457:
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
var AtParStatusCodes_1 = __webpack_require__(50);
var AtParEnums_2 = __webpack_require__(14);
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var AtParConstants_1 = __webpack_require__(31);
var linqts_1 = __webpack_require__(327);
var AtParEnums_3 = __webpack_require__(14);
var file_saver_1 = __webpack_require__(228);
var core_2 = __webpack_require__(0);
var VM_DELV_PO_COMMENTS_1 = __webpack_require__(1749);
var deliver_delivery_report_service_1 = __webpack_require__(1721);
var DeliveryReportComponent = (function () {
    function DeliveryReportComponent(httpService, _http, spinnerService, commonService, atParConstant, DeliveryReportSevice) {
        this.httpService = httpService;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.DeliveryReportSevice = DeliveryReportSevice;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.orgGrpId = "";
        this.order = "";
        this.blnShowOrgGroupDD = false;
        this.lstOrgGroups = [];
        this.lstOrgGroupsList = [];
        this.showGrid = false;
        this.showexport = false;
        this.selectedDisplay = "";
        this.showOnAllocateSelection = false;
        this.strMenuCode = "mt_deliver_report.aspx";
        this.strAuditData = "";
        this.strRowFilter = "";
        this.blnsortbycolumn = true;
        this.loading = true;
        //fromDate: string;
        //toDate: string;
        this.lstPackType = [];
        this.lstStatus = [];
        this.lstCurrentStatus = [];
        this.lstDeliverdBy = [];
        this.selectedPackageType = "";
        this.selectedStatus = "";
        this.selectedCurrStatus = "";
        this.selectedDeliverBy = "";
        this.selectedOrgGrpId = "";
        this.deliverHeaders = [];
        this.deliverDetails = [];
        this.deliverAttempts = [];
        this.deliverPoComments = [];
        this.deliverLineComments = [];
        this.statusCode = -1;
        this.noOfRecords = 0;
        this.defDateRange = 0;
        this.deliverDetailRows = 0;
        this.tdExports = true;
        this.plus = true;
        this.blnStatus = false;
        this.blnCurrStatus = false;
        this.pop = false;
        this.isMailDialog = false;
        this.toMailAddr = '';
        this.gSendEmailParamval = '';
        this.OrgGroupID = "";
        this.srvrUserID = "";
        this.PoId = "";
        this.DeliverTo = "";
        this.TrackingNo = "";
        this.DeliverdBy = "";
        this.DeptId = "";
        this.VendorName = "";
        this.ItmDesc = "";
        this.Loc = "";
        this.ItemId = "";
        this.Carrier = "";
        this.Requestor = "";
        this.BlnTflag = "";
        this.DeliveryLoc = "";
        this.Status = "";
        this.CurrStatus = "";
        this.LocDescr = "";
        this.PakageType = "";
        this.Pallet = "";
    }
    DeliveryReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 1:
                        _b.sent();
                        this.lstPackType = [];
                        this.lstPackType.push({ label: "ALL", value: "0" }, { label: "PO", value: "PO" }, { label: "NON PO", value: "NON PO" });
                        this.selectedPackageType = this.lstPackType[0].value;
                        this.lstStatus.push({ label: "Select One", value: "STATUS" }, { label: "ALL", value: "ALL" }, { label: "Receive", value: "0" }, { label: "Download", value: "1" }, { label: "PickUp", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Deliver", value: "50" }, { label: "HandOver", value: "100" }, { label: "Cancel", value: "13" });
                        this.selectedStatus = this.lstStatus[0].value;
                        this.lstCurrentStatus.push({ label: "Select One", value: "STATUS" }, { label: "Receive", value: "0" }, { label: "Download", value: "1" }, { label: "PickUp", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Deliver", value: "50" }, { label: "HandOver", value: "100" }, { label: "Cancel", value: "13" });
                        this.selectedCurrStatus = this.lstCurrentStatus[0].value;
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 2:
                        _b.sent();
                        this.bindDeliveredUsersList();
                        this.getOrgParamValue();
                        this.currentDate = new Date();
                        this.toDate = new Date();
                        this.fromDate = new Date();
                        if (!(this.defDateRange.toString() != '' && this.defDateRange != null)) return [3 /*break*/, 4];
                        _a = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, -this.defDateRange)];
                    case 3:
                        _a.fromDate = _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
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
    DeliveryReportComponent.prototype.bindOrgGroups = function () {
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
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.selectedOrgGroupId = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            _this.selectedOrgGrpId = _this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].toString();
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID != "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
    DeliveryReportComponent.prototype.bindDeliveredUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.blnShowOrgGroupDD == true) {
                            this.selectedOrgGroupId = this.selectedOrgGrpId;
                        }
                        this.lstDeliverdBy = [];
                        this.lstDeliverdBy.push({ label: "Select User", value: "Select User" });
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUsersList(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_3.EnumApps.Deliver, this.selectedOrgGroupId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstDeliverdBy.push({
                                                label: data.DataList[i].FULLNAME,
                                                value: data.DataList[i].USER_ID
                                            });
                                        }
                                        if (_this.lstDeliverdBy.length <= 0 || _this.lstDeliverdBy == null) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No users Available' });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        console.log(ex_3);
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.show = function () {
        this.plus = !this.plus;
    };
    DeliveryReportComponent.prototype.ddlStatusChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.selectedStatus != 'STATUS' && this.selectedStatus != '') {
                    this.blnCurrStatus = true;
                }
                else {
                    this.blnCurrStatus = false;
                }
                return [2 /*return*/];
            });
        });
    };
    DeliveryReportComponent.prototype.ddlCurrentStatusChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.selectedCurrStatus != 'STATUS' && this.selectedCurrStatus != '') {
                    this.blnStatus = true;
                }
                else {
                    this.blnStatus = false;
                }
                return [2 /*return*/];
            });
        });
    };
    DeliveryReportComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.growlMessage = [];
                if (this.selectedOrgGrpId == "Select One") {
                    this.lstDeliverdBy = [];
                    this.lstDeliverdBy.push({ label: "Select User", value: "Select User" });
                    // this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: " " });
                    return [2 /*return*/];
                }
                else {
                    this.bindDeliveredUsersList();
                }
                return [2 /*return*/];
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
    DeliveryReportComponent.prototype.BindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnValue, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.strRowFilter = "";
                        returnValue = false;
                        return [4 /*yield*/, this.validateSearchFields()];
                    case 1:
                        returnValue = _a.sent();
                        if (!returnValue) return [3 /*break*/, 3];
                        this.spinnerService.start();
                        this.srvrUserID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString();
                        this.OrgGroupID = this.selectedOrgGrpId;
                        if (this.selectedStatus == "ALL" || this.selectedStatus == "STATUS") {
                            this.Status = "";
                        }
                        else {
                            this.Status = this.selectedStatus;
                        }
                        if (this.selectedCurrStatus == "ALL" || this.selectedCurrStatus == "STATUS") {
                            this.CurrStatus = "";
                        }
                        else {
                            this.CurrStatus = this.selectedCurrStatus;
                        }
                        return [4 /*yield*/, this.getDeliveryDetails()];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        ex_4 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.validateSearchFields = function () {
        this.pop = false;
        this.growlMessage = [];
        this.showGrid = false;
        try {
            this.growlMessage = [];
            if (this.blnCurrStatus == true) {
                if (this.selectedStatus == "STATUS" || this.selectedStatus == undefined || this.selectedStatus == "") {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Staus" });
                    return false;
                }
            }
            if (this.blnStatus == true) {
                if (this.selectedCurrStatus == "STATUS" || this.selectedCurrStatus == undefined || this.selectedCurrStatus == "") {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Current Status" });
                    return false;
                }
            }
            if (this.blnStatus == false && this.blnCurrStatus == false) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Status" });
                return false;
            }
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
    DeliveryReportComponent.prototype.getDeliveryDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var Fdate, Tdate, repItemlst, repItem, DefDateTime_1, StausDateTime, CycledateTime_1, PrevCycleDateTime_1, cycTime_1, TotCycTime_1, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.showGrid = false;
                        Fdate = this.convertDateFormate(this.fromDate.toDateString());
                        Tdate = this.convertDateFormate(this.toDate.toDateString());
                        StausDateTime = void 0;
                        DefDateTime_1 = new Date("1/1/0001 12:00:00 AM");
                        this.deliverHeaders = [];
                        this.deliverDetails = [];
                        this.deliverAttempts = [];
                        this.showexport = false;
                        return [4 /*yield*/, this.DeliveryReportSevice.GetDeliveryReportData(this.selectedOrgGroupId, Fdate, Tdate, this.srvrUserID, this.PoId, this.DeliverTo, this.TrackingNo, this.DeliverdBy, this.DeptId, this.VendorName, this.ItmDesc, this.Loc, this.ItemId, this.Carrier, this.Requestor, this.BlnTflag, this.DeliveryLoc, this.Status, this.CurrStatus, this.LocDescr, this.selectedPackageType, this.Pallet).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success:
                                        {
                                            _this.showGrid = true;
                                            _this.deliverHeaders = data.DataDictionary["deliverHeaders"];
                                            _this.deliverDetails = data.DataDictionary["deliverDetails"];
                                            _this.deliverAttempts = data.DataDictionary["deliverAttempts"];
                                            _this.deliverHeaders.forEach(function (header) {
                                                var details = _this.deliverDetails.filter(function (detail) { return detail.TRANSACTION_ID == header.TRANSACTION_ID; });
                                                _this.showexport = true;
                                                TotCycTime_1 = 0;
                                                PrevCycleDateTime_1 = new Date("1/1/0001 12:00:00 AM");
                                                if (details.length > 0) {
                                                    for (var intCnt = 0; intCnt <= details.length - 1; intCnt++) {
                                                        details[intCnt]["CYCLE_TIME"] = "";
                                                        CycledateTime_1 = details[intCnt]["STATUS_TIME"];
                                                        cycTime_1 = new Date(CycledateTime_1);
                                                        if (PrevCycleDateTime_1.toDateString() != DefDateTime_1.toDateString()) {
                                                            var diff = (cycTime_1.getTime() - PrevCycleDateTime_1.getTime());
                                                            if (diff > 0) {
                                                                TotCycTime_1 = TotCycTime_1 + diff;
                                                                details[intCnt]["CYCLE_TIME"] = _this.GetTimeString(diff);
                                                            }
                                                        }
                                                        //var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
                                                        PrevCycleDateTime_1 = cycTime_1;
                                                    }
                                                }
                                                var newTotRow = Object.assign({}, details[0]);
                                                newTotRow["CYCLE_TIME"] = _this.GetTimeString(TotCycTime_1);
                                                newTotRow["STATUS_MESSAGE"] = "Total Cycle Time";
                                                newTotRow["STATUS_TIME"] = "";
                                                newTotRow["STATUS_USER"] = "";
                                                newTotRow["RECEPIENT"] = "";
                                                newTotRow["DELIVERY_LOCATION"] = "";
                                                newTotRow["SIGNATURE"] = "";
                                                details.push(newTotRow);
                                                header.DETAILS = details;
                                                repItem = new VM_DELV_PO_COMMENTS_1.VM_DELV_PO_COMMENTS();
                                                repItemlst = new linqts_1.List();
                                                repItem.HEADER_COMMENTS = details[0].HDR_COMMENTS;
                                                repItem.LINE_COMMENTS = details[0].COMMENTS;
                                                if (details[0].HDR_COMMENTS == "") {
                                                    header.SHOW_PO_COMMENTS = false;
                                                }
                                                else {
                                                    header.SHOW_PO_COMMENTS = true;
                                                }
                                                if (details[0].COMMENTS == "") {
                                                    header.SHOW_LINE_COMMENTS = false;
                                                }
                                                else {
                                                    header.SHOW_LINE_COMMENTS = true;
                                                }
                                                repItemlst.Add(repItem);
                                                header.POCOMMENTS = repItemlst.ToArray();
                                                var delAttempts = _this.deliverAttempts.filter(function (attempt) { return attempt.TRANSACTION_ID == header.TRANSACTION_ID; });
                                                header.ATTEMPTS = delAttempts;
                                                if (delAttempts.length > 0) {
                                                    header.showAttempts = true;
                                                }
                                                else {
                                                    header.showAttempts = false;
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
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.onDeliverFilterData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    //  this.lstChargesFilterData = data;
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    DeliveryReportComponent.prototype.addDays = function (theDate, days) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)];
            });
        });
    };
    DeliveryReportComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.spinnerService.stop();
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    DeliveryReportComponent.prototype.onExportToExcelClick = function (event) {
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
                        blob = new Blob([html], {
                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                        });
                        file_saver_1.saveAs(blob, "DeliveryReport.xls");
                        return [3 /*break*/, 4];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6);
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.GetTimeString = function (millseconds) {
        var seconds = Math.floor(millseconds / 1000);
        var scndstr;
        var hourstr;
        var minutesstr;
        scndstr = "";
        hourstr = "";
        minutesstr = "";
        var h = 3600;
        var m = 60;
        var hours = Math.floor(seconds / h);
        var minutes = Math.floor((seconds % h) / m);
        var scnds = Math.floor((seconds % m));
        var timeString = '';
        if (scnds < 10) {
            scndstr = "0" + scnds;
        }
        else {
            scndstr = scnds.toString();
        }
        ;
        if (hours < 10) {
            hourstr = "0" + hours;
        }
        else {
            hourstr = hours.toString();
        }
        ;
        if (minutes < 10) {
            minutesstr = "0" + minutes;
        }
        else {
            minutesstr = minutes.toString();
        }
        ;
        timeString = hourstr + ":" + minutesstr + ":" + scndstr;
        return timeString;
    };
    DeliveryReportComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, title, ex_7;
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
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/assets/images/';
                        title = '""' + "AtparVersion 3.0" + '""';
                        if (false) return [3 /*break*/, 5];
                        htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                                + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=5 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
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
                                + "<tr><td colspan=3 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding='4'>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Order# - Line#</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>External Tracking#</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Internal Tracking#</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Location - Description</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Dept ID</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Qty</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Uom</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Current Owner</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Item ID</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>MfgItem ID</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Item Description</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Carrier</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Receipt Date</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>PickUp User</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Requestor</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Status</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Vendor Name</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Notes</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Pallet</td>"
                            + "</tr>";
                        return [4 /*yield*/, this.deliverHeaders.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PO_ID + " - " + header.LINE_NO + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.REPORT_DATA_31 + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.REPORT_DATA_3 + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.LOCATION + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.DEPT_ID + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.QTY + "&nbsp;</td>";
                                if (header.UOM == null || header.UOM == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.UOM + "&nbsp;</td>";
                                }
                                if (header.CURRENT_STATUS_USER == null || header.CURRENT_STATUS_USER == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CURRENT_STATUS_USER + "&nbsp;</td>";
                                }
                                if (header.ITEM_ID == null || header.ITEM_ID == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_ID + "&nbsp;</td>";
                                }
                                if (header.MFGITEMID == null || header.MFGITEMID == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.MFGITEMID + "&nbsp;</td>";
                                }
                                htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.REPORT_DATA_8 + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CARRIER_ID + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEIPT_DATE + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PICKUP_USER + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.DELIVERED_TO + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.STATUS_MESSAGE + "(" + header.STATUS_TIME + ")" + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.VENDOR_NAME + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff wrap>&nbsp;" + header.ITEM_NOTES + "&nbsp;</td>";
                                if (header.PALLET == null || header.PALLET == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;" + header.PALLET + "&nbsp;</td>";
                                }
                                htmlBuilder += "</tr>";
                                htmlBuilder += "<tr>"
                                    + "<td colspan='19'> PO Header Comments:" + header.HDR_COMMENTS + "</td></tr>";
                                if (header.DETAILS.length > 0) {
                                    var sigimgserverPath_1 = _this.gstrProtocal + '://' + _this.ipAddress + '/AtPar/AtParWebApi/Uploaded/';
                                    htmlBuilder += "<tr>"
                                        + "<td colspan=19>"
                                        + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding='4'>"
                                        + "<tr bgcolor=#E0E0E0>"
                                        + "<td align=center nowrap width=15%><span class=c3><b>Event</b></span></td>"
                                        + "<td align=center nowrap width=8%><span class=c3><b> Event Date(mm/dd/yyyy) </b></span></td>"
                                        + "<td align=center nowrap width=21%><span class=c3><b>Cycle Time</b></span></td>"
                                        + "<td align=center nowrap width=10%><span class=c3><b>User</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Recepient</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Delivery Location</b></span></td>"
                                        + "<td align=center nowrap width=10%><span class=c3><b>Drop Off </b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Signature</b></span></td>"
                                        + "</tr>";
                                    header.DETAILS.forEach(function (detail) {
                                        htmlBuilder += "<tr>"
                                            + "<td align=left nowrap ><span class=c3>" + detail.STATUS_MESSAGE + "</span></td>"
                                            + "<td align=right nowrap><span class=c3>" + detail.STATUS_TIME + "</span></td>"
                                            + "<td align=left style='mso-number-format:\@;' ><span class=c3>" + detail.CYCLE_TIME + "</span></td>";
                                        if (detail.STATUS_USER == '' || detail.STATUS_USER == null) {
                                            htmlBuilder += "<td align=right nowrap ><span class=c3>&nbsp;</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.STATUS_USER + "</span></td>";
                                        }
                                        if (detail.RECEPIENT == '' || detail.RECEPIENT == null) {
                                            htmlBuilder += "<td align=right nowrap ><span class=c3>&nbsp;</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.RECEPIENT + "</span></td>";
                                        }
                                        if (detail.DELIVERY_LOCATION == '' || detail.DELIVERY_LOCATION == null) {
                                            htmlBuilder += "<td align=right nowrap ><span class=c3>&nbsp;</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.DELIVERY_LOCATION + "</span></td>";
                                        }
                                        if (detail.HANDOVER == '' || detail.HANDOVER == null) {
                                            htmlBuilder += "<td align=right nowrap ><span class=c3>&nbsp;</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.HANDOVER + "</span></td>";
                                        }
                                        if (detail.STATUS_MESSAGE == "Delivered") {
                                            if (reqType == 'Mail') {
                                                if (_this.gSendEmailParamval == "Y") {
                                                    htmlBuilder += "<td align=right nowrap ><img  src=" + sigimgserverPath_1 + header.TRANSACTION_ID + ".jpg ></td>";
                                                }
                                                else {
                                                    htmlBuilder += "<td align=right ><span class=c3></span></td>";
                                                }
                                            }
                                            else {
                                                htmlBuilder += "<td align=right nowrap ><img  src=" + sigimgserverPath_1 + header.TRANSACTION_ID + ".jpg ></td>";
                                            }
                                        }
                                        else {
                                            htmlBuilder += "<td align=right ><span class=c3></span></td>";
                                        }
                                        htmlBuilder += "</tr>";
                                    });
                                    htmlBuilder += "</table>";
                                    htmlBuilder += "<tr>"
                                        + "<td colspan=19> PO Line Comments: " + header.COMMENTS + "</td></tr>"
                                        + "</td>"
                                        + "</tr>";
                                }
                                if (header.ATTEMPTS.length > 0) {
                                    htmlBuilder += "<tr><td colspan=19>"
                                        + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                                        + "<tr bgcolor=#E0E0E0>"
                                        + "<td align=center nowrap width=25%><span class=c3><b>Attempt Date(mm/dd/yyyyy)</b></span></td>"
                                        + "<td align=center nowrap width=75%><span class=c3><b>Comments</b></span></td>"
                                        + "</tr>";
                                    header.ATTEMPTS.forEach(function (attempts) {
                                        htmlBuilder += "<tr>"
                                            + "<td align=center nowrap width=25%><span class=c3>" + attempts.ATTEMPT_DATE + "</span></td>"
                                            + "<td align=center nowrap width=75%><span class=c3>" + attempts.COMMENT + "</td>"
                                            + "</tr>";
                                    });
                                    htmlBuilder += "</table>";
                                    htmlBuilder += "</td></tr>";
                                }
                            })];
                    case 4:
                        _a.sent();
                        htmlBuilder += "</table></Table>";
                        _a.label = 5;
                    case 5: return [4 /*yield*/, htmlBuilder];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7:
                        ex_7 = _a.sent();
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.exportsubReportDetails = function (reqType, transId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, title, deliverPrintDetails, ex_8;
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
                        // imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/assets/images/';
                        title = '""' + "AtparVersion 3.0" + '""';
                        if (false) return [3 /*break*/, 5];
                        htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                                + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=5 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType == 'Mail') {
                                htmlBuilder += "<TR height=63><TD align=left bgcolor='#fe9836' colspan=2><IMG height=63  width=18% src=cid:logo title=Atpar 3></TD></TR>";
                            }
                            else {
                                htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></TR>";
                            }
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=3 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Order# - Line#</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>External Tracking#</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Internal Tracking#</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Location - Description</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Dept ID</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Qty</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Uom</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Current Owner</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Item ID</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>MfgItem ID</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Item Description</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Carrier</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Receipt Date</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>PickUp User</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Requestor</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Status</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Vendor Name</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Notes</td>"
                            + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Pallet</td>"
                            + "</tr>";
                        deliverPrintDetails = this.deliverHeaders.filter(function (a) { return a.TRANSACTION_ID == transId; });
                        return [4 /*yield*/, deliverPrintDetails.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PO_ID + " - " + header.LINE_NO + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.REPORT_DATA_31 + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.REPORT_DATA_3 + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.LOCATION + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.DEPT_ID + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.QTY + "&nbsp;</td>";
                                if (header.UOM == null || header.UOM == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.UOM + "&nbsp;</td>";
                                }
                                if (header.CURRENT_STATUS_USER == null || header.CURRENT_STATUS_USER == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CURRENT_STATUS_USER + "&nbsp;</td>";
                                }
                                if (header.ITEM_ID == null || header.ITEM_ID == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_ID + "&nbsp;</td>";
                                }
                                if (header.MFGITEMID == null || header.MFGITEMID == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.MFGITEMID + "&nbsp;</td>";
                                }
                                htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.REPORT_DATA_8 + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CARRIER_ID + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEIPT_DATE + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PICKUP_USER + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.DELIVERED_TO + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.STATUS_MESSAGE + "(" + header.STATUS_TIME + ")" + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.VENDOR_NAME + "&nbsp;</td>"
                                    + "<td bgcolor=#ffffff wrap>&nbsp;" + header.ITEM_NOTES + "&nbsp;</td>";
                                if (header.PALLET == null || header.PALLET == '') {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                                }
                                else {
                                    htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;" + header.PALLET + "&nbsp;</td>";
                                }
                                htmlBuilder += "</tr>";
                                htmlBuilder += "<tr>"
                                    + "<td colspan='19'> PO Header Comments:" + header.HDR_COMMENTS + "</td></tr>";
                                if (header.DETAILS.length > 0) {
                                    var sigimgserverPath_2 = _this.gstrProtocal + '://' + _this.ipAddress + '/AtPar/AtParWebApi/Uploaded/';
                                    htmlBuilder += "<tr>"
                                        + "<td colspan=19>"
                                        + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                                        + "<tr bgcolor=#E0E0E0>"
                                        + "<td align=center nowrap width=15%><span class=c3><b>Event</b></span></td>"
                                        + "<td align=center nowrap width=8%><span class=c3><b> Event Date(mm/dd/yyyy) </b></span></td>"
                                        + "<td align=center nowrap width=21%><span class=c3><b>Cycle Time</b></span></td>"
                                        + "<td align=center nowrap width=10%><span class=c3><b>User</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Recepient</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Delivery Location</b></span></td>"
                                        + "<td align=center nowrap width=10%><span class=c3><b>Drop Off </b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Signature</b></span></td>"
                                        + "</tr>";
                                    header.DETAILS.forEach(function (detail) {
                                        htmlBuilder += "<tr>"
                                            + "<td align=left nowrap ><span class=c3>" + detail.STATUS_MESSAGE + "</span></td>"
                                            + "<td align=right nowrap><span class=c3>" + detail.STATUS_TIME + "</span></td>"
                                            + "<td align=left style='mso-number-format:\@;' ><span class=c3>" + detail.CYCLE_TIME + "</span></td>";
                                        if (detail.STATUS_USER == '' || detail.STATUS_USER == null) {
                                            htmlBuilder += "<td align=right nowrap ><span class=c3>&nbsp;</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.STATUS_USER + "</span></td>";
                                        }
                                        if (detail.RECEPIENT == '' || detail.RECEPIENT == null) {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>&nbsp;</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.RECEPIENT + "</span></td>";
                                        }
                                        if (detail.DELIVERY_LOCATION == '' || detail.DELIVERY_LOCATION == null) {
                                            htmlBuilder += "<td align=right nowrap ><span class=c3>&nbsp;</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.DELIVERY_LOCATION + "</span></td>";
                                        }
                                        if (detail.HANDOVER == '' || detail.HANDOVER == null) {
                                            htmlBuilder += "<td align=left nowrap ><span class=c3>&nbsp;</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=right nowrap ><span class=c3>" + detail.HANDOVER + "</span></td>";
                                        }
                                        if (detail.STATUS_MESSAGE == "Delivered") {
                                            if (reqType == 'Mail') {
                                                if (_this.gSendEmailParamval == "Y") {
                                                    htmlBuilder += "<td align=right nowrap ><img  src=" + sigimgserverPath_2 + header.TRANSACTION_ID + ".jpg ></td>";
                                                }
                                                else {
                                                    htmlBuilder += "<td align=right ><span class=c3></span></td>";
                                                }
                                            }
                                            else {
                                                htmlBuilder += "<td align=right nowrap ><img  src=" + sigimgserverPath_2 + header.TRANSACTION_ID + ".jpg ></td>";
                                            }
                                        }
                                        else {
                                            htmlBuilder += "<td align=right ><span class=c3></span></td>";
                                        }
                                        htmlBuilder += "</tr>";
                                    });
                                    htmlBuilder += "</table>";
                                    htmlBuilder += "<tr>"
                                        + "<td colspan=19> PO Line Comments: " + header.COMMENTS + "</td></tr>"
                                        + "</td>"
                                        + "</tr>";
                                }
                                if (header.ATTEMPTS.length > 0) {
                                    htmlBuilder += "<tr><td colspan=19>"
                                        + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                                        + "<tr bgcolor=#E0E0E0>"
                                        + "<td align=center nowrap width=25%><span class=c3><b>Attempt Date(mm/dd/yyyyy)</b></span></td>"
                                        + "<td align=center nowrap width=75%><span class=c3><b>Comments</b></span></td>"
                                        + "</tr>";
                                    header.ATTEMPTS.forEach(function (attempts) {
                                        htmlBuilder += "<tr>"
                                            + "<td align=center nowrap width=25%><span class=c3>" + attempts.ATTEMPT_DATE + "</span></td>"
                                            + "<td align=center nowrap width=75%><span class=c3>" + attempts.COMMENT + "</td>"
                                            + "</tr>";
                                    });
                                    htmlBuilder += "</table>";
                                    htmlBuilder += "</td></tr>";
                                }
                            })];
                    case 4:
                        _a.sent();
                        htmlBuilder += "</table></Table>";
                        _a.label = 5;
                    case 5: return [4 /*yield*/, htmlBuilder];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7:
                        ex_8 = _a.sent();
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
            var html, toAddr, ex_9;
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
                        return [4 /*yield*/, this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Deliver Report', JSON.stringify(html), this.toMailAddr, '', 'false', AtParEnums_1.MailPriority.Normal.toString(), '')
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
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Mail Server is Not Configured! Please Contact Administrator' });
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
                        this.clientErrorMsg(ex_9);
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
            var html, mywindow, ex_10;
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
                                mywindow.document.write('<html><head><title>' + 'Deliver - Delivery Report' + '</title>');
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
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10);
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.onSendEventsMailClick = function (event, EventsData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var Transid, html, toAddr, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        Transid = EventsData[0].TRANSACTION_ID;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportsubReportDetails('Mail', Transid)];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        this.growlMessage = [];
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Deliver Report', JSON.stringify(html), this.txtEventsMail, '', 'false', AtParEnums_1.MailPriority.Normal.toString(), '')
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
                        // if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.isMailDialog = false;
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DeliveryReportComponent.prototype.getOrgParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.getOrgGroupParamValue('DELIVER_SEND_SIGN_IN_MAIL', AtParEnums_3.EnumApps.Deliver, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.gSendEmailParamval = data.DataVariable.toString();
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_12 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 3: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    return DeliveryReportComponent;
}());
DeliveryReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1973),
        providers: [HttpService_1.HttpService, api_1.ConfirmationService, atpar_common_service_1.AtParCommonService, deliver_delivery_report_service_1.DeliveryReportServiceComponent],
    }),
    core_2.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        AtParConstants_1.AtParConstants,
        deliver_delivery_report_service_1.DeliveryReportServiceComponent])
], DeliveryReportComponent);
exports.DeliveryReportComponent = DeliveryReportComponent;


/***/ }),

/***/ 1458:
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
var deliver_exclude_locations_services_1 = __webpack_require__(1722);
var AtParEnums_1 = __webpack_require__(14);
var HttpService_1 = __webpack_require__(12);
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var AtParConstants_1 = __webpack_require__(31);
var api_1 = __webpack_require__(72);
var ExcludeLocationsComponent = (function () {
    function ExcludeLocationsComponent(excludeLocationsService, spinnerService, atParCommonService, httpService, atParConstant, confirmationService) {
        this.excludeLocationsService = excludeLocationsService;
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.confirmationService = confirmationService;
        this.appID = 10;
        this.deviceTokenEntry = [];
        this.selectedSetID = "";
        this.dataCheckedSorting = [];
        this.selectedLocation = "";
        this.isVisible = false;
        this.growlMessage = [];
        this.lstLocations = [];
        this.blnsortbycolumn = true;
        this.custom = "custom";
    }
    ExcludeLocationsComponent.prototype.ngOnInit = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            this.lstCheckedLocations = new Array();
            this.dataCheckedSorting = new Array();
            this.dataUncheckedSorting = new Array();
            this.lstFilteredLocation = new Array();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.pazeSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    };
    ExcludeLocationsComponent.prototype.selectedRow = function (values, event) {
        try {
            if (event == true) {
                values.CHK_VALUE = 1;
            }
            else {
                values.CHK_VALUE = 0;
            }
            for (var i = 0; i < this.lstCheckedLocations.length; i++) {
                if (this.lstCheckedLocations[i].SETID === values.SETID) {
                    var index = this.lstCheckedLocations.indexOf(this.lstCheckedLocations[i], 0);
                    this.lstCheckedLocations.splice(index, 1);
                }
            }
            this.lstCheckedLocations.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    };
    ExcludeLocationsComponent.prototype.checkAll = function () {
        try {
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
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    ExcludeLocationsComponent.prototype.unCheckAll = function () {
        try {
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
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    ExcludeLocationsComponent.prototype.BindDataGrid = function () {
        try {
            var lstDBDataList;
            this.growlMessage = [];
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
            if (this.lstDBData != null && this.lstDBData.length > 0) {
                this.isVisible = true;
            }
            else {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
            }
            this.spinnerService.stop();
            this.lstCheckedLocations = new Array();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    };
    ExcludeLocationsComponent.prototype.filterdata = function (event) {
        try {
            this.lstgridfilterData = [];
            this.lstgridfilterData = new Array();
            this.lstgridfilterData = event;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "filterdata");
        }
    };
    ExcludeLocationsComponent.prototype.customSort = function (event) {
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
            this.lstCheckedLocations = new Array();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    };
    ExcludeLocationsComponent.prototype.getAllLocations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isVisible = false;
                        this.lstgridfilterData = null;
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.lstDBData = new Array();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.excludeLocationsService.getAllLocations(this.selectedSetID, this.selectedLocation, this.deviceTokenEntry)
                                .forEach(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstDBData = [];
                                        _this.lstDBData = response.DataList;
                                        _this.lstLocations = [];
                                        for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                            _this.lstLocations.push(_this.lstDBData[i].SETID);
                                            if (_this.lstDBData[i].CHK_ALLOCATED == 1) {
                                                _this.lstDBData[i].checkvalue = true;
                                            }
                                            else {
                                                _this.lstDBData[i].checkvalue = false;
                                            }
                                        }
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
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "getAllLocations");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ExcludeLocationsComponent.prototype.excludeLocatons = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.spinnerService.start();
                    this.excludeLocationsService.excludeLocs(this.lstCheckedLocations, this.deviceTokenEntry)
                        .subscribe(function (response) {
                        _this.growlMessage = [];
                        switch (response.StatType) {
                            case AtParEnums_1.StatusType.Success: {
                                _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                _this.selectedLocation = "";
                                _this.selectedSetID = "";
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
                    this.clientErrorMsg(ex, "excludeLocatons");
                }
                return [2 /*return*/];
            });
        });
    };
    ExcludeLocationsComponent.prototype.confirm = function () {
        var _this = this;
        try {
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: 'Are you sure Do you want to Submit the Changes ?',
                accept: function () {
                    _this.excludeLocatons();
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "confirm");
        }
    };
    ExcludeLocationsComponent.prototype.fillLocationsAuto = function (event) {
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
    ExcludeLocationsComponent.prototype.filteredLoations = function (query, deslocatiions) {
        try {
            var filtered = [];
            if (query == "%") {
                for (var i = 0; i < deslocatiions.length; i++) {
                    var desLocValue = deslocatiions[i];
                    filtered.push(desLocValue);
                }
            }
            else {
                if (query.length >= 1) {
                    for (var i = 0; i < deslocatiions.length; i++) {
                        var desLocValue = deslocatiions[i];
                        if (desLocValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            filtered.push(desLocValue);
                        }
                    }
                }
            }
            return filtered;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "filteredLoations");
        }
    };
    ExcludeLocationsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ExcludeLocationsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstBUnits = null;
        this.lstFilteredLocation = null;
        this.lstCheckedLocations = null;
        this.lstDBData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.appID = -1;
        this.selectedLocation = null;
    };
    return ExcludeLocationsComponent;
}());
ExcludeLocationsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1974),
        providers: [deliver_exclude_locations_services_1.ExcludeLocationsService, HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, api_1.ConfirmationService]
    }),
    __metadata("design:paramtypes", [deliver_exclude_locations_services_1.ExcludeLocationsService,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        HttpService_1.HttpService,
        AtParConstants_1.AtParConstants,
        api_1.ConfirmationService])
], ExcludeLocationsComponent);
exports.ExcludeLocationsComponent = ExcludeLocationsComponent;


/***/ }),

/***/ 1459:
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
var AtParStatusCodes_1 = __webpack_require__(50);
var AtParEnums_2 = __webpack_require__(14);
var atpar_common_service_1 = __webpack_require__(43);
var AtParConstants_1 = __webpack_require__(31);
var deliver_productivity_report_component_service_1 = __webpack_require__(1723);
var linq_es5_1 = __webpack_require__(115);
var router_1 = __webpack_require__(29);
var VM_DELV_PROD_1 = __webpack_require__(1750);
var VM_TABLE_AVG_1 = __webpack_require__(1767);
var VM_CYCLETIME_DETAILS_1 = __webpack_require__(1748);
var VM_RESULTS_1 = __webpack_require__(1765);
var file_saver_1 = __webpack_require__(228);
var ProductivityReportComponent = (function () {
    function ProductivityReportComponent(httpService, _http, spinnerService, commonService, atParConstant, DeliverProductivityService, route) {
        this.httpService = httpService;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.DeliverProductivityService = DeliverProductivityService;
        this.route = route;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.selectedOrgGroupId = "";
        this.selectedDropDownUserId = [];
        this.UserId = [];
        this.orgGrpId = "";
        this.lstOrgGroups = [];
        this.showGrid = false;
        this.lstUsers = [];
        this.lstRepType = [];
        this.lstStartEvent = [];
        this.lstEndEvent = [];
        this.lstFromTime = [];
        this.lstToTime = [];
        this.lstInterval = [];
        this.selectedReportType = "";
        this.selectedStartEvent = "";
        this.selectedEndEvent = "";
        this.startEvent = "";
        this.endEvent = "";
        this.selectedFromTime = "";
        this.selectedToTime = "";
        this.blnStartEndEvents = false;
        this.blnFromToTimeInterval = false;
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
        this.dataAvg = [];
        this.dataForRecv1 = [];
        this.dataForRecv2 = [];
        this.dataForRecv3 = [];
        this.dataForRecv4 = [];
        this.dataForRecv5 = [];
        this.dataForSummaryRecv = [];
        this.dataForDelv1 = [];
        this.dataForDelv2 = [];
        this.dataForDelv3 = [];
        this.dataForDelv4 = [];
        this.dataForDelv5 = [];
        this.dataForSummaryDeliver = [];
        this.dataForDock1 = [];
        this.dataForDock2 = [];
        this.dataForDock3 = [];
        this.dataForDock4 = [];
        this.dataForDock5 = [];
        this.dataForSummaryDock = [];
        this.dataSetlabel = [];
        this.dataSetbgcolor = [];
        this.dataSetbordercolor = [];
        this.dataSetdata = [];
        this.barColors = [];
        this.label = [];
        this.labelForAvg = [];
        this.chartDataSet = [];
        this.chartDataSetD1 = [];
        this.chartDataSetD2 = [];
        this.chartDataSetD3 = [];
        this.chartDataSetD4 = [];
        this.chartDataSetD5 = [];
        this.isMailDialog = false;
        this.toMailAddr = '';
        this.tdExports = false;
        this.bunitFlag = false;
        this.ReceivedDataSet = [];
        this.DeliveredDataSet = [];
        this.IntHrsParts = 0;
        this.IntNoofHrs = 0;
        this.IntRecPkgCnt = 0;
        this.IntDelPkgCnt = 0;
        this.pacakageSum = 0;
        this.pZeroTimeHrs = 0;
        this.lstChartData = [];
        this.lstAvgChartData = [];
        this.chartDataSetForRecvLine = [];
        this.chartDataSetForRecvGraph1 = [];
        this.chartDataSetForRecvGraph2 = [];
        this.chartDataSetForRecvGraph3 = [];
        this.chartDataSetForRecvGraph4 = [];
        this.chartDataSetForRecvGraph5 = [];
        this.chartDataSetForDeliverGraph1 = [];
        this.chartDataSetForDeliverGraph2 = [];
        this.chartDataSetForDeliverGraph3 = [];
        this.chartDataSetForDeliverGraph4 = [];
        this.chartDataSetForDeliverGraph5 = [];
        this.chartDataSetForDockGraph1 = [];
        this.chartDataSetForDockGraph2 = [];
        this.chartDataSetForDockGraph3 = [];
        this.chartDataSetForDockGraph4 = [];
        this.chartDataSetForDockGraph5 = [];
        this.lableForReceive = [];
        this.lstDataForRecv = [];
        this.chartDataSetForDelverLine = [];
        this.lableForDeliver = [];
        this.lstDataForDeliver = [];
        this.lstDataForDock = [];
        this.chartDataSetForDock = [];
        this.labelForDock = [];
        this.lstDataForSummaryRecv = [];
        this.chartDataSetForSummaryRecv = [];
        this.labelForSummaryRecv = [];
        this.lstDataForSummaryDeliver = [];
        this.chartDataSetForSummaryDeliver = [];
        this.labelForSummaryDeliver = [];
        this.chartDataSetForSummaryDock = [];
        this.labelForSummaryDock = [];
        this.DateDisplay = "";
        this.lstDataForSummaryDock = [];
        this.lstTransactiondata = [];
        this.lstEventDetailsData = [];
        this.lstTransactionFilterdata = [];
        this.lstFinalCycleData = [];
        this.lstCycleHourDetails = [];
        this.showGridCycleTime = false;
        this.Count = "";
        this.AVG = "";
        this.StDev = "";
        this.Max = "";
        this.Min = "";
        this.Results = [];
        this.lstTable1Data = [];
        this.lstTable2Data = [];
        this.randomColors = [];
        this.dateString = [];
        this.blnGraph1 = false;
        this.blnGraph2 = false;
        this.blnGraph3 = false;
        this.blnGraph4 = false;
        this.blnGraph5 = false;
    }
    ProductivityReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.bindOrgGroups();
                        this.lstRepType = [];
                        this.lstRepType.push({ label: "Select One", value: "" }, { label: "Productivity", value: "1" }, { label: "Cycle Time", value: "2" });
                        this.lstStartEvent = [];
                        this.lstStartEvent.push({ label: "Select One", value: "" }, { label: "Parcel Count", value: "-1" }, { label: "Received", value: "-2" }, { label: "Download", value: "1" }, { label: "Picked", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Delivered", value: "50" });
                        this.lstEndEvent = [];
                        this.lstEndEvent.push({ label: "Select One", value: "" }, { label: "Parcel Count", value: "-1" }, { label: "Received", value: "-2" }, { label: "Download", value: "1" }, { label: "Picked", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Delivered", value: "50" });
                        this.lstFromTime = [];
                        this.lstFromTime.push({ label: "Select One", value: "" }, { label: "00:00", value: "00:00" }, { label: "00:30", value: "00:30" }, { label: "01:00", value: "01:00" }, { label: "01:30", value: "01:30" }, { label: "02:00", value: "02:00" }, { label: "02:30", value: "02:30" }, { label: "03:00", value: "03:00" }, { label: "03:30", value: "03:30" }, { label: "04:00", value: "04:00" }, { label: "04:30", value: "04:30" }, { label: "05:00", value: "05:00" }, { label: "05:30", value: "05:30" }, { label: "06:00", value: "06:00" }, { label: "06:30", value: "06:30" }, { label: "07:00", value: "07:00" }, { label: "07:30", value: "07:30" }, { label: "08:00", value: "08:00" }, { label: "08:30", value: "08:30" }, { label: "09:00", value: "09:00" }, { label: "09:30", value: "09:30" }, { label: "10:00", value: "10:00" }, { label: "10:30", value: "10:30" }, { label: "11:00", value: "11:00" }, { label: "11:30", value: "11:30" }, { label: "12:00", value: "12:00" }, { label: "12:30", value: "12:30" }, { label: "13:00", value: "13:00" }, { label: "13:30", value: "13:30" }, { label: "14:00", value: "14:00" }, { label: "14:30", value: "14:30" }, { label: "15:00", value: "15:00" }, { label: "15:30", value: "15:30" }, { label: "16:00", value: "16:00" }, { label: "16:30", value: "16:30" }, { label: "17:00", value: "17:00" }, { label: "17:30", value: "17:30" }, { label: "18:00", value: "18:00" }, { label: "18:30", value: "18:30" }, { label: "19:00", value: "19:00" }, { label: "19:30", value: "19:30" }, { label: "20:00", value: "20:00" }, { label: "20:30", value: "20:30" }, { label: "21:00", value: "21:00" }, { label: "21:30", value: "21:30" }, { label: "22:00", value: "22:00" }, { label: "22:30", value: "22:30" }, { label: "23:00", value: "23:00" }, { label: "23:30", value: "23:30" });
                        this.lstToTime = [];
                        this.lstToTime.push({ label: "Select One", value: "" }, { label: "00:00", value: "00:00" }, { label: "00:30", value: "00:30" }, { label: "01:00", value: "01:00" }, { label: "01:30", value: "01:30" }, { label: "02:00", value: "02:00" }, { label: "02:30", value: "02:30" }, { label: "03:00", value: "03:00" }, { label: "03:30", value: "03:30" }, { label: "04:00", value: "04:00" }, { label: "04:30", value: "04:30" }, { label: "05:00", value: "05:00" }, { label: "05:30", value: "05:30" }, { label: "06:00", value: "06:00" }, { label: "06:30", value: "06:30" }, { label: "07:00", value: "07:00" }, { label: "07:30", value: "07:30" }, { label: "08:00", value: "08:00" }, { label: "08:30", value: "08:30" }, { label: "09:00", value: "09:00" }, { label: "09:30", value: "09:30" }, { label: "10:00", value: "10:00" }, { label: "10:30", value: "10:30" }, { label: "11:00", value: "11:00" }, { label: "11:30", value: "11:30" }, { label: "12:00", value: "12:00" }, { label: "12:30", value: "12:30" }, { label: "13:00", value: "13:00" }, { label: "13:30", value: "13:30" }, { label: "14:00", value: "14:00" }, { label: "14:30", value: "14:30" }, { label: "15:00", value: "15:00" }, { label: "15:30", value: "15:30" }, { label: "16:00", value: "16:00" }, { label: "16:30", value: "16:30" }, { label: "17:00", value: "17:00" }, { label: "17:30", value: "17:30" }, { label: "18:00", value: "18:00" }, { label: "18:30", value: "18:30" }, { label: "19:00", value: "19:00" }, { label: "19:30", value: "19:30" }, { label: "20:00", value: "20:00" }, { label: "20:30", value: "20:30" }, { label: "21:00", value: "21:00" }, { label: "21:30", value: "21:30" }, { label: "22:00", value: "22:00" }, { label: "22:30", value: "22:30" }, { label: "23:00", value: "23:00" }, { label: "23:30", value: "23:30" });
                        this.lstInterval = [];
                        this.lstInterval.push({ label: "Select One", value: "0" }, { label: "15", value: "15" }, { label: "30", value: "30" }, { label: "45", value: "45" }, { label: "60", value: "60" });
                        this.defDateRange = 4;
                        this.fromDate = new Date();
                        _a = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, this.defDateRange)];
                    case 1:
                        _a.fromDate = _b.sent();
                        this.toDate = new Date();
                        debugger;
                        this.route.queryParams.subscribe(function (params) {
                            _this.item = params["p2value"];
                            _this.orgGroupId = params["p3value"];
                            _this.updateDateTime = params["p4value"];
                            _this.cartId = params["p5value"];
                            _this.bUnit = params["p6value"];
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductivityReportComponent.prototype.bindOrgGroups = function () {
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
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.bindUsersList();
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstUsers = [];
                                            _this.lstUsers.push({ label: "ALL", value: "ALL" });
                                            _this.lstOrgGroups.push({ label: "Select One", value: "" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            _this.selectedDropDownUserId = [];
                                            _this.selectedDropDownUserId.push("ALL");
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
    ProductivityReportComponent.prototype.bindUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
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
                        this.lstUsers.push({ label: "ALL", value: "ALL" });
                        return [4 /*yield*/, this.commonService.getHeirarchyUsersList(AtParEnums_2.EnumApps.Deliver, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i <= data.DataDictionary["pDSUserList"]["Table1"].length - 1; i++) {
                                            _this.lstUsers.push({
                                                label: data.DataDictionary["pDSUserList"]["Table1"][i].FULLNAME,
                                                value: data.DataDictionary["pDSUserList"]["Table1"][i].USER_ID
                                            });
                                        }
                                        _this.selectedDropDownUserId = [];
                                        _this.selectedDropDownUserId.push("ALL");
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "bindUsersList");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductivityReportComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.growlMessage = [];
                this.showGrid = false;
                if (this.selectedOrgGroupId === "") {
                    this.lstUsers = [];
                    this.orgGroupIDForDBUpdate = "";
                    this.lstUsers.push({ label: "ALL", value: "ALL" });
                    return [2 /*return*/];
                }
                try {
                    this.bindUsersList();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.ddlRepTypeChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.selectedReportType === "1") {
                    this.blnStartEndEvents = true;
                    this.blnFromToTimeInterval = false;
                }
                else if (this.selectedReportType === "2") {
                    this.blnStartEndEvents = false;
                    this.blnFromToTimeInterval = true;
                }
                else {
                    this.blnStartEndEvents = false;
                    this.blnFromToTimeInterval = false;
                }
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.addDays = function (theDate, days) {
        return new Date(theDate.getTime() - days * 24 * 60 * 60 * 1000);
    };
    ProductivityReportComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    ProductivityReportComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    ProductivityReportComponent.prototype.onGoClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isValidate, ex_3;
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
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "onGoClick");
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductivityReportComponent.prototype.validateSearchFields = function () {
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
    ProductivityReportComponent.prototype.convert = function (str) {
        var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    ProductivityReportComponent.prototype.bindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var k, startTime, endTime, startDate, endDate, difference, today, count, color, randmColor, color, randmColor, count, blnstartendevent;
            return __generator(this, function (_a) {
                this.showGridCycleTime = false;
                this.tdExports = false;
                if (this.orgGroupIDForDBUpdate === "" || this.orgGroupIDForDBUpdate == undefined) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGrp ID" });
                    return [2 /*return*/];
                }
                if (this.selectedReportType === "" || this.selectedReportType == undefined) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Report type" });
                    return [2 /*return*/];
                }
                if (this.selectedDropDownUserId == undefined || this.selectedDropDownUserId.length == 0) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select User ID" });
                    return [2 /*return*/];
                }
                if (this.selectedDropDownUserId.length != 1) {
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ALL User selection is not considerd when Multiple users Selected" });
                        return [2 /*return*/];
                    }
                }
                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    this.UserId = [];
                    for (k = 0; k <= this.lstUsers.length - 1; k++) {
                        if (this.lstUsers[k].value !== "ALL") {
                            this.UserId.push(this.lstUsers[k].value);
                        }
                    }
                }
                if (this.blnShowOrgGroupDD == true) {
                    this.orgGroupIDForDBUpdate = this.selectedOrgGroupId.split("-")[0].trim();
                }
                else {
                    this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0].trim();
                }
                if (this.selectedStartEvent === "-1" || this.selectedStartEvent === "-2") {
                    this.startEvent = "0";
                }
                else {
                    this.startEvent = this.selectedStartEvent;
                }
                if (this.selectedEndEvent === "-1" || this.selectedEndEvent === "-2") {
                    this.endEvent = "30";
                }
                else {
                    this.endEvent = this.selectedEndEvent;
                }
                if (this.selectedReportType === "1") {
                    if (this.selectedFromTime === "" || this.selectedFromTime == undefined) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select From Time" });
                        return [2 /*return*/];
                    }
                    if (this.selectedToTime === "" || this.selectedToTime == undefined) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select To Time" });
                        return [2 /*return*/];
                    }
                    startTime = this.selectedFromTime.split(":");
                    endTime = this.selectedToTime.split(":");
                    startDate = new Date(0, 0, 0, parseInt(startTime[0]), parseInt(startTime[1]), 0);
                    endDate = new Date(0, 0, 0, parseInt(endTime[0]), parseInt(endTime[1]), 0);
                    difference = startDate.getTime() - endDate.getTime();
                    if (difference >= 0) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select To Time greater than from Time" });
                        return [2 /*return*/];
                    }
                    if (this.selectedInterval == null || this.selectedInterval == undefined) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Interval" });
                        return [2 /*return*/];
                    }
                    today = new Date().getDate();
                    if (this.fromDate.getDate() > today) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select From Date less than or equal to current date" });
                        return [2 /*return*/];
                    }
                    if (this.toDate.getDate() > today) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select To Date less than or equal to current date" });
                        return [2 /*return*/];
                    }
                    if (this.fromDate.getDate() > this.toDate.getDate()) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Date Range ( mm/dd/yyyy)" });
                        return [2 /*return*/];
                    }
                    count = this.toDate.getDate() - this.fromDate.getDate();
                    if (count > 4) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Duration in days should not exceed 5 days" });
                        return [2 /*return*/];
                    }
                    this.randomColors = [];
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        for (color = 0; color <= this.UserId.length - 1; color++) {
                            randmColor = this.getRandomColor();
                            this.randomColors.push(randmColor);
                        }
                    }
                    else {
                        for (color = 0; color <= this.selectedDropDownUserId.length - 1; color++) {
                            randmColor = this.getRandomColor();
                            this.randomColors.push(randmColor);
                        }
                    }
                    this.BindDayCharts();
                }
                else {
                    if (this.selectedStartEvent === "" || this.selectedStartEvent == undefined) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Start Event" });
                        return [2 /*return*/];
                    }
                    if (this.selectedEndEvent === "" || this.selectedEndEvent == undefined) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select End Event" });
                        return [2 /*return*/];
                    }
                    if (this.fromDate.getDate() > this.toDate.getDate()) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Date Range ( mm/dd/yyyy)" });
                        return [2 /*return*/];
                    }
                    count = this.toDate.getDate() - this.fromDate.getDate();
                    if (count > 4) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Duration in days should not exceed 5 days" });
                        return [2 /*return*/];
                    }
                    blnstartendevent = false;
                    if (this.selectedStartEvent === "-1" && this.selectedEndEvent === "-2") {
                        blnstartendevent = true;
                    }
                    if (blnstartendevent == false) {
                        if (parseInt(this.selectedStartEvent) >= parseInt(this.selectedEndEvent)) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select End Event greater than Start Event" });
                            return [2 /*return*/];
                        }
                    }
                    this.showGrid = false;
                    this.BindCycleTimeReport();
                }
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.BindDayCharts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var frmDate, dt, todate, userString, a;
            return __generator(this, function (_a) {
                this.spinnerService.start();
                this.growlMessage = [];
                frmDate = this.convert(this.fromDate);
                dt = this.convert(this.fromDate);
                this.frmDate = new Date(dt);
                todate = this.convert(this.toDate);
                this.IntRecPkgCnt = 0;
                this.IntDelPkgCnt = 0;
                userString = "";
                for (a = 0; a <= this.selectedDropDownUserId.length - 1; a++) {
                    userString = userString + this.selectedDropDownUserId[a] + ",";
                }
                userString = userString.replace(/,\s*$/, "");
                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    if (this.lstUsers.length == 1) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                        this.spinnerService.stop();
                        return [2 /*return*/];
                    }
                }
                this.DeliverProductivityService.GetProductivityReport(this.orgGroupIDForDBUpdate, frmDate, todate, userString, this.selectedInterval, this.selectedFromTime, this.selectedToTime).catch(this.httpService.handleError).then(function (res) {
                    var data = res.json();
                    switch (data.StatType) {
                        case AtParEnums_2.StatusType.Success: {
                            _this.showGrid = true;
                            _this.lstChartData = [];
                            _this.lstAvgChartData = [];
                            if (data.DataDictionary["pDsProductivityRep"]["Table1"].length > 0) {
                                _this.lstTable1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                                _this.PopulateGraphsForReceive(0, data, 0, "Receiving");
                            }
                            if (data.DataDictionary["pDsProductivityRep"]["Table2"].length > 0) {
                                _this.lstTable2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                                _this.PopulateGraphsForDeliver(0, data, 0, "Deliver");
                            }
                            if (data.DataDictionary["pDsProductivityRep"]["Table1"].length > 0 || data.DataDictionary["pDsProductivityRep"]["Table2"].length > 0) {
                                _this.BindSummaryChartsRecv(data);
                                _this.BindSummaryChartsDeliver(data);
                                _this.PopulateEmpProdColumnChart(data);
                                _this.PopulateDockGraph(data, 0);
                            }
                            _this.tdExports = true;
                            _this.spinnerService.stop();
                            break;
                        }
                        case AtParEnums_2.StatusType.Warn: {
                            _this.showGrid = false;
                            _this.tdExports = true;
                            _this.showGridCycleTime = false;
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                        case AtParEnums_2.StatusType.Error: {
                            _this.showGrid = false;
                            _this.tdExports = true;
                            _this.showGridCycleTime = false;
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                        case AtParEnums_2.StatusType.Custom: {
                            _this.showGrid = false;
                            _this.tdExports = true;
                            _this.showGridCycleTime = false;
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.PopulateEmpProdColumnChart = function (data) {
        var _IntPkgCount = 0;
        var _dblZeroWHours = 0;
        var lstItem;
        var frmDate = this.frmDate;
        var Curdate = frmDate;
        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
            for (var i = 0; i <= this.UserId.length - 1; i++) {
                var dtfromdate = this.fromDate;
                var chartDate = new Date(dtfromdate);
                var dttodate = this.toDate;
                var datediff = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                var UserName = this.UserId[i];
                var AvgPack = 0;
                var AvgTime = 0;
                var daycount = 0;
                if (UserName !== "ALL") {
                    var x = 0;
                    while (x <= datediff) {
                        daycount += 1;
                        var currentDate = this.convert(chartDate);
                        this.GetProductivityReportValues(data, UserName, currentDate);
                        lstItem = new VM_DELV_PROD_1.VM_DELV_PROD();
                        lstItem.PACKAGE_COUNT = this.pacakageSum;
                        lstItem.UserId = UserName;
                        lstItem.TIME = Math.ceil(this.pZeroTimeHrs * 10) / 10;
                        lstItem.TRANS_DATE = Curdate.toString();
                        lstItem.Day = "D" + daycount.toString();
                        this.lstChartData.push(lstItem);
                        chartDate = new Date(chartDate.setDate(chartDate.getDate() + 1));
                        x = x + 1;
                    }
                }
            }
        }
        else {
            for (var i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {
                var dtfromdate = this.frmDate;
                var chartDate = new Date(dtfromdate);
                var dttodate = this.toDate;
                var datediff = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                var UserName = this.selectedDropDownUserId[i];
                var AvgPack = 0;
                var AvgTime = 0;
                var daycount = 0;
                if (UserName !== "ALL") {
                    var z = 0;
                    while (z <= datediff) {
                        daycount += 1;
                        var currentDate = this.convert(chartDate);
                        this.GetProductivityReportValues(data, UserName, currentDate);
                        lstItem = new VM_DELV_PROD_1.VM_DELV_PROD();
                        lstItem.PACKAGE_COUNT = this.pacakageSum;
                        lstItem.UserId = UserName;
                        lstItem.TIME = this.pZeroTimeHrs;
                        lstItem.TRANS_DATE = chartDate.toString();
                        lstItem.Day = "D" + daycount.toString();
                        this.lstChartData.push(lstItem);
                        chartDate = new Date(chartDate.setDate(chartDate.getDate() + 1));
                        z = z + 1;
                    }
                }
            }
        }
        console.log(this.lstChartData);
        this.barColors = ["#FFB552", "#FFB552"];
        this.dataSetbgcolor = [];
        this.dataSetdata = [];
        this.dataSetbordercolor = [];
        var dataPackageCount = [];
        var dataTimePackage = [];
        var dataForInsideTable = [];
        var dataPackageCountD1 = [];
        var dataTimePackageD1 = [];
        var dataPackageCountD2 = [];
        var dataTimePackageD2 = [];
        var dataPackageCountD3 = [];
        var dataTimePackageD3 = [];
        var dataPackageCountD4 = [];
        var dataTimePackageD4 = [];
        var dataPackageCountD5 = [];
        var dataTimePackageD5 = [];
        this.label = [];
        for (var i = 0; i <= this.lstChartData.length - 1; i++) {
            this.label.push(this.lstChartData[i].UserId);
            dataPackageCount.push(this.lstChartData[i].PACKAGE_COUNT);
            dataTimePackage.push(this.lstChartData[i].TIME);
        }
        var distinctUsersArray = [];
        distinctUsersArray = linq_es5_1.asEnumerable(this.label).Distinct().ToArray();
        var _loop_1 = function (cdata) {
            var listOfseparateUsers = [];
            var dataPackageCount_1 = [];
            listOfseparateUsers = linq_es5_1.asEnumerable(this_1.lstChartData).Where(function (x) { return x.UserId == distinctUsersArray[cdata]; }).ToArray();
            if (listOfseparateUsers.length > 0) {
                if (listOfseparateUsers[0] != undefined) {
                    dataPackageCountD1.push(listOfseparateUsers[0].PACKAGE_COUNT);
                    dataTimePackageD1.push(listOfseparateUsers[0].TIME);
                }
                if (listOfseparateUsers[1] != undefined) {
                    dataPackageCountD2.push(listOfseparateUsers[1].PACKAGE_COUNT);
                    dataTimePackageD2.push(listOfseparateUsers[1].TIME);
                }
                if (listOfseparateUsers[2] != undefined) {
                    dataPackageCountD3.push(listOfseparateUsers[2].PACKAGE_COUNT);
                    dataTimePackageD3.push(listOfseparateUsers[2].TIME);
                }
                if (listOfseparateUsers[3] != undefined) {
                    dataPackageCountD4.push(listOfseparateUsers[3].PACKAGE_COUNT);
                    dataTimePackageD4.push(listOfseparateUsers[3].TIME);
                }
                if (listOfseparateUsers[4] != undefined) {
                    dataPackageCountD5.push(listOfseparateUsers[4].PACKAGE_COUNT);
                    dataTimePackageD5.push(listOfseparateUsers[4].TIME);
                }
            }
        };
        var this_1 = this;
        for (var cdata = 0; cdata <= distinctUsersArray.length - 1; cdata++) {
            _loop_1(cdata);
        }
        this.chartDataSet = [];
        if (dataPackageCountD1.length > 0) {
            this.chartDataSet.push({ label: 'D1', backgroundColor: '#3391CE', borderColor: '', data: dataPackageCountD1, fill: true });
            this.chartDataSet.push({ label: 'D1', backgroundColor: '#48BF7D', borderColor: '', data: dataTimePackageD1, fill: true });
        }
        if (dataPackageCountD2.length > 0) {
            this.chartDataSet.push({ label: 'D2', backgroundColor: '#3391CE', borderColor: '', data: dataPackageCountD2, fill: true });
            this.chartDataSet.push({ label: 'D2', backgroundColor: '#48BF7D', borderColor: '', data: dataTimePackageD2, fill: true });
        }
        if (dataPackageCountD3.length > 0) {
            this.chartDataSet.push({ label: 'D3', backgroundColor: '#3391CE', borderColor: '', data: dataPackageCountD3, fill: true });
            this.chartDataSet.push({ label: 'D3', backgroundColor: '#48BF7D', borderColor: '', data: dataTimePackageD3, fill: true });
        }
        if (dataPackageCountD4.length > 0) {
            this.chartDataSet.push({ label: 'D4', backgroundColor: '#3391CE', borderColor: '', data: dataPackageCountD4, fill: true });
            this.chartDataSet.push({ label: 'D4', backgroundColor: '#48BF7D', borderColor: '', data: dataTimePackageD4, fill: true });
        }
        if (dataPackageCountD5.length > 0) {
            this.chartDataSet.push({ label: 'D5', backgroundColor: '#3391CE', borderColor: '', data: dataPackageCountD5, fill: true });
            this.chartDataSet.push({ label: 'D5', backgroundColor: '#48BF7D', borderColor: '', data: dataTimePackageD5, fill: true });
        }
        var tooltipData = [];
        tooltipData = this.lstChartData;
        this.option = {
            scales: {
                yAxes: [{
                        stacked: false,
                        gridLines: {
                            display: true,
                            color: "rgba(255,99,132,0.2)"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Packages'
                        }
                    }],
                xAxes: [{
                        gridLines: {
                            display: false,
                            color: "rgba(255,99,132,0.2)"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'User'
                        }
                    }]
            },
            title: {
                display: true,
                text: "Employee Productivity By Day"
            },
            legend: {
                display: false
            }
        };
        this.data = [];
        this.data = {
            labels: distinctUsersArray,
            datasets: this.chartDataSet,
            options: this.option
        };
        this.PopulateEmpProdAverageChart(this.lstChartData);
    };
    ProductivityReportComponent.prototype.GetProductivityReportValues = function (data, UserName, Curdate) {
        return __awaiter(this, void 0, void 0, function () {
            var DelRecvLength, length, j, j, recvData, delvData, totalData, recv, delv;
            return __generator(this, function (_a) {
                DelRecvLength = 0;
                length = 0;
                this.IntRecPkgCnt = 0;
                this.IntDelPkgCnt = 0;
                length = data.DataDictionary["pDsProductivityRep"]["Table1"].length;
                this.IntHrsParts = (60 / this.selectedInterval);
                this.IntNoofHrs = (parseFloat(length.toString()) / this.IntHrsParts);
                this.ReceivedDataSet = data.DataDictionary["pDsProductivityRep"]["Table1"];
                this.ReceivedDataSet = linq_es5_1.asEnumerable(this.ReceivedDataSet).Where(function (x) { return x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == Curdate; }).ToArray();
                if (this.ReceivedDataSet.length > 0) {
                    for (j = 0; j <= this.ReceivedDataSet.length - 1; j++) {
                        this.IntRecPkgCnt += this.ReceivedDataSet[j].PACKAGE_COUNT;
                    }
                }
                this.DeliveredDataSet = data.DataDictionary["pDsProductivityRep"]["Table2"];
                this.DeliveredDataSet = linq_es5_1.asEnumerable(this.DeliveredDataSet).Where(function (x) { return x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == Curdate; }).ToArray();
                if (this.DeliveredDataSet.length > 0) {
                    for (j = 0; j <= this.DeliveredDataSet.length - 1; j++) {
                        this.IntDelPkgCnt += this.DeliveredDataSet[j].PACKAGE_COUNT;
                    }
                }
                recvData = [];
                delvData = [];
                totalData = [];
                for (recv = 0; recv <= this.ReceivedDataSet.length - 1; recv++) {
                    recvData.push(this.ReceivedDataSet[recv].START_INTERVAL);
                }
                for (delv = 0; delv <= this.ReceivedDataSet.length - 1; delv++) {
                    delvData.push(this.ReceivedDataSet[delv].START_INTERVAL);
                }
                this.pacakageSum = this.IntRecPkgCnt + this.IntDelPkgCnt;
                totalData = recvData.concat(delvData);
                totalData = linq_es5_1.asEnumerable(totalData).Distinct().ToArray();
                if (totalData.length > 0) {
                    if (this.selectedInterval > 0) {
                        this.pZeroTimeHrs = Math.round(this.IntNoofHrs - (parseFloat(totalData.length.toString()) / this.IntHrsParts)) - 1;
                    }
                }
                else {
                    this.pZeroTimeHrs = (Math.trunc(((this.IntNoofHrs - 1) * 100)) / 100);
                }
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.PopulateEmpProdAverageChart = function (Delvdata) {
        return __awaiter(this, void 0, void 0, function () {
            var lstItem, Delvdata1, _loop_2, this_2, i, _loop_3, this_3, i, dataPackageCount, dataAvgTimePackage, i;
            return __generator(this, function (_a) {
                Delvdata1 = [];
                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    _loop_2 = function (i) {
                        var UserName = this_2.UserId[i];
                        var AvgPack = 0;
                        var AvgTime = 0;
                        var daycount = 0;
                        if (UserName !== "ALL") {
                            lstItem = new VM_TABLE_AVG_1.VM_TABLE_AVG();
                            Delvdata1 = linq_es5_1.asEnumerable(Delvdata).Where(function (x) { return x.UserId == UserName; }).ToArray();
                            for (var i_1 = 0; i_1 <= Delvdata1.length - 1; i_1++) {
                                AvgPack += Delvdata1[i_1].PACKAGE_COUNT;
                                AvgTime += Delvdata1[i_1].TIME;
                            }
                            AvgPack = AvgPack / Delvdata1.length;
                            AvgTime = AvgTime / Delvdata1.length;
                            lstItem.PACKAGE_COUNT = AvgPack;
                            lstItem.AVG_TIME = Math.trunc(AvgTime * 100) / 100;
                            lstItem.UserId = UserName;
                            this_2.lstAvgChartData.push(lstItem);
                        }
                    };
                    this_2 = this;
                    for (i = 0; i <= this.UserId.length - 1; i++) {
                        _loop_2(i);
                    }
                }
                else {
                    _loop_3 = function (i) {
                        var UserName = this_3.selectedDropDownUserId[i];
                        var AvgPack = 0;
                        var AvgTime = 0;
                        var daycount = 0;
                        if (UserName !== "ALL") {
                            lstItem = new VM_TABLE_AVG_1.VM_TABLE_AVG();
                            Delvdata1 = linq_es5_1.asEnumerable(Delvdata).Where(function (x) { return x.UserId == UserName; }).ToArray();
                            for (var i_2 = 0; i_2 <= Delvdata1.length - 1; i_2++) {
                                AvgPack += Delvdata1[i_2].PACKAGE_COUNT;
                                AvgTime += Delvdata1[i_2].TIME;
                            }
                            AvgPack = AvgPack / Delvdata1.length;
                            AvgTime = AvgTime / Delvdata1.length;
                            lstItem.PACKAGE_COUNT = AvgPack;
                            lstItem.AVG_TIME = Math.ceil(AvgTime * 10) / 10;
                            lstItem.UserId = UserName;
                            this_3.lstAvgChartData.push(lstItem);
                        }
                    };
                    this_3 = this;
                    for (i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {
                        _loop_3(i);
                    }
                }
                this.barColors = ["#FFB552", "#FFB552"];
                this.dataSetbgcolor = [];
                this.dataSetdata = [];
                this.dataSetbordercolor = [];
                dataPackageCount = [];
                dataAvgTimePackage = [];
                this.labelForAvg = [];
                for (i = 0; i <= this.lstAvgChartData.length - 1; i++) {
                    this.labelForAvg.push(this.lstAvgChartData[i].UserId);
                    dataPackageCount.push(this.lstAvgChartData[i].PACKAGE_COUNT);
                    dataAvgTimePackage.push(this.lstAvgChartData[i].AVG_TIME);
                }
                this.chartDataSet = [];
                this.chartDataSet.push({ label: 'Average Packages', backgroundColor: '#3391CE', borderColor: '', data: dataPackageCount, fill: true });
                this.chartDataSet.push({ label: 'Average Time', backgroundColor: '#48BF7D', borderColor: '', data: dataAvgTimePackage, fill: true });
                this.optionForAvg = {
                    scales: {
                        yAxes: [{
                                stacked: false,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                categoryPercentage: 1,
                                barPercentage: 1,
                            }, {
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'User'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Average Employee Productivity"
                    }
                };
                this.dataAvg = [];
                this.dataAvg = {
                    labels: this.labelForAvg,
                    datasets: this.chartDataSet,
                    options: this.optionForAvg
                };
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.PopulateGraphsForReceive = function (TblIndex, data, pDay, ReportName) {
        return __awaiter(this, void 0, void 0, function () {
            var dtfromdate, chartDate, intPcnt, dayWiseData, DisplayName, count, x, _loop_4, this_4, i_3, _loop_5, this_5, i_4, cnt, list, cntData, i, i, i, i, i;
            return __generator(this, function (_a) {
                try {
                    dtfromdate = this.frmDate;
                    chartDate = new Date(dtfromdate);
                    intPcnt = 0;
                    this.lstDataForRecv = [];
                    dayWiseData = [];
                    DisplayName = "";
                    this.dateString = [];
                    count = this.toDate.getDate() - this.fromDate.getDate();
                    for (x = 0; x <= count;) {
                        this.dateString.push(this.convertDateFormate(chartDate));
                        if (this.lstDataForRecv[x] == null) {
                            this.lstDataForRecv[x] = [];
                            if (this.lstDataForRecv[x].PACKAGE_COUNT == null) {
                                this.lstDataForRecv[x].PACKAGE_COUNT = [];
                            }
                            this.lstDataForRecv[x].START_INTERVAL = [];
                            this.lstDataForRecv[x].ReceiveData = [];
                            this.lstDataForRecv[x].ReceiveLables = [];
                        }
                        if (this.lstDataForRecv[x].ReceiveData == null) {
                            this.lstDataForRecv[x].ReceiveData = [];
                        }
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            _loop_4 = function (i_3) {
                                var UserName = this_4.UserId[i_3];
                                if (UserName !== "ALL") {
                                    this_4.lstDataForRecv[x].PACKAGE_COUNT[i_3] = [];
                                    this_4.lstDataForRecv[x].START_INTERVAL[i_3] = [];
                                    dayWiseData[x] = [];
                                    var table1Data = [];
                                    table1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                                    var recvDate_1 = this_4.convertDateFormate(chartDate);
                                    var filteredList = linq_es5_1.asEnumerable(table1Data).Where(function (x) { return x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == recvDate_1; }).ToArray();
                                    for (var j = 0; j <= this_4.lstTable1Data.length - 1; j++) {
                                        if (filteredList.length > 0) {
                                            dayWiseData[x].push({ START_INTERVAL: this_4.lstTable1Data[j].START_INTERVAL, PACKAGE_COUNT: this_4.lstTable1Data[j].PACKAGE_COUNT, USER_ID: UserName, TRANS_DATE: this_4.lstTable1Data[j].TRANS_DATE });
                                        }
                                        else {
                                            dayWiseData[x].push({ START_INTERVAL: this_4.lstTable1Data[j].START_INTERVAL, PACKAGE_COUNT: 0, USER_ID: UserName, TRANS_DATE: recvDate_1 });
                                        }
                                        this_4.lstDataForRecv[x].START_INTERVAL[i_3].push(dayWiseData[x][j].START_INTERVAL);
                                        this_4.lstDataForRecv[x].PACKAGE_COUNT[i_3].push(dayWiseData[x][j].PACKAGE_COUNT);
                                    }
                                }
                                this_4.lstDataForRecv[x].ReceiveData[i_3] = [];
                                this_4.lstDataForRecv[x].ReceiveLables.push(this_4.lstDataForRecv[x].START_INTERVAL[0]);
                                this_4.lstDataForRecv[x].ReceiveData[i_3].push(this_4.lstDataForRecv[x].PACKAGE_COUNT[i_3]);
                            };
                            this_4 = this;
                            for (i_3 = 0; i_3 <= this.UserId.length - 1; i_3++) {
                                _loop_4(i_3);
                            }
                        }
                        else {
                            _loop_5 = function (i_4) {
                                var UserName = this_5.selectedDropDownUserId[i_4];
                                if (UserName !== "ALL") {
                                    this_5.lstDataForRecv[x].PACKAGE_COUNT[i_4] = [];
                                    this_5.lstDataForRecv[x].START_INTERVAL[i_4] = [];
                                    dayWiseData[x] = [];
                                    var table1Data = [];
                                    table1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                                    var recvDate_2 = this_5.convertDateFormate(chartDate);
                                    var filteredList = linq_es5_1.asEnumerable(table1Data).Where(function (x) { return x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == recvDate_2; }).ToArray();
                                    for (var j = 0; j <= this_5.lstTable1Data.length - 1; j++) {
                                        if (filteredList.length > 0) {
                                            dayWiseData[x].push({ START_INTERVAL: this_5.lstTable1Data[j].START_INTERVAL, PACKAGE_COUNT: this_5.lstTable1Data[j].PACKAGE_COUNT, USER_ID: UserName, TRANS_DATE: this_5.lstTable1Data[j].TRANS_DATE });
                                        }
                                        else {
                                            dayWiseData[x].push({ START_INTERVAL: this_5.lstTable1Data[j].START_INTERVAL, PACKAGE_COUNT: 0, USER_ID: UserName, TRANS_DATE: recvDate_2 });
                                        }
                                        this_5.lstDataForRecv[x].START_INTERVAL[i_4].push(dayWiseData[x][j].START_INTERVAL);
                                        this_5.lstDataForRecv[x].PACKAGE_COUNT[i_4].push(dayWiseData[x][j].PACKAGE_COUNT);
                                    }
                                }
                                this_5.lstDataForRecv[x].ReceiveData[i_4] = [];
                                this_5.lstDataForRecv[x].ReceiveLables.push(this_5.lstDataForRecv[x].START_INTERVAL[0]);
                                this_5.lstDataForRecv[x].ReceiveData[i_4].push(this_5.lstDataForRecv[x].PACKAGE_COUNT[i_4]);
                            };
                            this_5 = this;
                            for (i_4 = 0; i_4 <= this.selectedDropDownUserId.length - 1; i_4++) {
                                _loop_5(i_4);
                            }
                        }
                        x += 1;
                        chartDate = new Date(chartDate.setDate(chartDate.getDate() + 1));
                    }
                    this.chartDataSetForRecvLine = [];
                    this.lableForReceive = [];
                    for (cnt = 0; cnt <= this.lstDataForRecv.length - 1; cnt++) {
                        list = [];
                        for (cntData = 0; cntData <= this.lstDataForRecv[cnt].ReceiveData.length - 1; cntData++) {
                            list.push(this.lstDataForRecv[cnt].ReceiveData[cntData][0]);
                        }
                        this.chartDataSetForRecvLine.push({ label: '', backgroundColor: '', borderColor: '#00FF00', data: list, fill: false });
                        this.lableForReceive.push(this.lstDataForRecv[cnt].ReceiveLables);
                    }
                    this.dataForRecv1 = [];
                    this.dataForRecv2 = [];
                    this.dataForRecv3 = [];
                    this.dataForRecv4 = [];
                    this.dataForRecv5 = [];
                    this.optionForRecv1 = {
                        scales: {
                            yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    stacked: true,
                                    gridLines: {
                                        display: true,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Packages'
                                    }
                                }],
                            xAxes: [{
                                    gridLines: {
                                        display: false,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Time'
                                    }
                                }]
                        },
                        title: {
                            display: true,
                            text: 'Dock Receiving By Employee - ' + this.dateString[0] + " Day"
                        }
                    };
                    this.optionForRecv2 = {
                        scales: {
                            yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    stacked: true,
                                    gridLines: {
                                        display: true,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Packages'
                                    }
                                }],
                            xAxes: [{
                                    gridLines: {
                                        display: false,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Time'
                                    }
                                }]
                        },
                        title: {
                            display: true,
                            text: 'Dock Receiving By Employee - ' + this.dateString[1] + " Day"
                        }
                    };
                    this.optionForRecv3 = {
                        scales: {
                            yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    stacked: true,
                                    gridLines: {
                                        display: true,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Packages'
                                    }
                                }],
                            xAxes: [{
                                    gridLines: {
                                        display: false,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Time'
                                    }
                                }]
                        },
                        title: {
                            display: true,
                            text: 'Dock Receiving By Employee - ' + this.dateString[2] + " Day"
                        }
                    };
                    this.optionForRecv4 = {
                        scales: {
                            yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    stacked: true,
                                    gridLines: {
                                        display: true,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Packages'
                                    }
                                }],
                            xAxes: [{
                                    gridLines: {
                                        display: false,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Time'
                                    }
                                }]
                        },
                        title: {
                            display: true,
                            text: 'Dock Receiving By Employee - ' + this.dateString[3] + " Day"
                        }
                    };
                    this.optionForRecv5 = {
                        scales: {
                            yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    stacked: true,
                                    gridLines: {
                                        display: true,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Packages'
                                    }
                                }],
                            xAxes: [{
                                    gridLines: {
                                        display: false,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Time'
                                    }
                                }]
                        },
                        title: {
                            display: true,
                            text: 'Dock Receiving By Employee - ' + this.dateString[4] + " Day"
                        }
                    };
                    this.chartDataSetForRecvGraph1 = [];
                    if (this.chartDataSetForRecvLine[0] != undefined) {
                        if (this.chartDataSetForRecvLine[0].data != undefined) {
                            this.blnGraph1 = true;
                            for (i in this.chartDataSetForRecvLine[0].data) {
                                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                    this.chartDataSetForRecvGraph1.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[0].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                                else {
                                    this.chartDataSetForRecvGraph1.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[0].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                            }
                        }
                    }
                    else {
                        this.blnGraph1 = false;
                    }
                    this.chartDataSetForRecvGraph2 = [];
                    if (this.chartDataSetForRecvLine[1] != undefined) {
                        if (this.chartDataSetForRecvLine[1].data != undefined) {
                            this.blnGraph2 = true;
                            for (i in this.chartDataSetForRecvLine[1].data) {
                                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                    this.chartDataSetForRecvGraph2.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[1].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                                else {
                                    this.chartDataSetForRecvGraph2.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[1].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                            }
                        }
                    }
                    else {
                        this.blnGraph2 = false;
                    }
                    this.chartDataSetForRecvGraph3 = [];
                    if (this.chartDataSetForRecvLine[2] != undefined) {
                        if (this.chartDataSetForRecvLine[2].data != undefined) {
                            this.blnGraph3 = true;
                            for (i in this.chartDataSetForRecvLine[2].data) {
                                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                    this.chartDataSetForRecvGraph3.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[2].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                                else {
                                    this.chartDataSetForRecvGraph3.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[2].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                            }
                        }
                    }
                    else {
                        this.blnGraph3 = false;
                    }
                    this.chartDataSetForRecvGraph4 = [];
                    if (this.chartDataSetForRecvLine[3] != undefined) {
                        if (this.chartDataSetForRecvLine[3].data != undefined) {
                            this.blnGraph4 = true;
                            for (i in this.chartDataSetForRecvLine[3].data) {
                                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                    this.chartDataSetForRecvGraph4.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[3].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                                else {
                                    this.chartDataSetForRecvGraph4.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[3].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                            }
                        }
                    }
                    else {
                        this.blnGraph4 = false;
                    }
                    this.chartDataSetForRecvGraph5 = [];
                    if (this.chartDataSetForRecvLine[4] != undefined) {
                        if (this.chartDataSetForRecvLine[4].data != undefined) {
                            this.blnGraph5 = true;
                            for (i in this.chartDataSetForRecvLine[4].data) {
                                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                    this.chartDataSetForRecvGraph5.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[4].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                                else {
                                    this.chartDataSetForRecvGraph5.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[4].data[i], fill: false, borderColor: this.randomColors[i] });
                                }
                            }
                        }
                    }
                    else {
                        this.blnGraph5 = false;
                    }
                    if (this.blnGraph1 == true) {
                        this.dataForRecv1 = {
                            labels: this.lableForReceive[0][0],
                            datasets: this.chartDataSetForRecvGraph1,
                            options: this.optionForRecv1
                        };
                    }
                    if (this.blnGraph2 == true) {
                        this.dataForRecv2 = {
                            labels: this.lableForReceive[1][0],
                            datasets: this.chartDataSetForRecvGraph2,
                            options: this.optionForRecv2
                        };
                    }
                    if (this.blnGraph3 == true) {
                        this.dataForRecv3 = {
                            labels: this.lableForReceive[2][0],
                            datasets: this.chartDataSetForRecvGraph3,
                            options: this.optionForRecv3
                        };
                    }
                    if (this.blnGraph4 == true) {
                        this.dataForRecv4 = {
                            labels: this.lableForReceive[3][0],
                            datasets: this.chartDataSetForRecvGraph4,
                            options: this.optionForRecv4
                        };
                    }
                    if (this.blnGraph5 == true) {
                        this.dataForRecv5 = {
                            labels: this.lableForReceive[4][0],
                            datasets: this.chartDataSetForRecvGraph5,
                            options: this.optionForRecv5
                        };
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "");
                }
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.PopulateGraphsForDeliver = function (TblIndex, data, pDay, ReportName) {
        return __awaiter(this, void 0, void 0, function () {
            var frmDate, CurdateForRecvDelv, dtfromdate, chartDate, intPcnt, dayWiseData, count, x, _loop_6, this_6, i_5, _loop_7, this_7, i_6, cnt, list, cntData, i, i, i, i, i;
            return __generator(this, function (_a) {
                frmDate = this.fromDate;
                CurdateForRecvDelv = frmDate;
                dtfromdate = this.frmDate;
                chartDate = new Date(dtfromdate);
                intPcnt = 0;
                this.lstDataForDeliver = [];
                dayWiseData = [];
                count = this.toDate.getDate() - this.fromDate.getDate();
                for (x = 0; x <= count;) {
                    if (this.lstDataForDeliver[x] == null) {
                        this.lstDataForDeliver[x] = [];
                        if (this.lstDataForDeliver[x].PACKAGE_COUNT == null) {
                            this.lstDataForDeliver[x].PACKAGE_COUNT = [];
                        }
                        this.lstDataForDeliver[x].START_INTERVAL = [];
                        this.lstDataForDeliver[x].ReceiveData = [];
                        this.lstDataForDeliver[x].ReceiveLables = [];
                    }
                    if (this.lstDataForDeliver[x].ReceiveData == null) {
                        this.lstDataForDeliver[x].ReceiveData = [];
                    }
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        _loop_6 = function (i_5) {
                            var UserName = this_6.UserId[i_5];
                            if (UserName !== "ALL") {
                                this_6.lstDataForDeliver[x].PACKAGE_COUNT[i_5] = [];
                                this_6.lstDataForDeliver[x].START_INTERVAL[i_5] = [];
                                dayWiseData[x] = [];
                                var table2Data = [];
                                table2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                                var recvDate_3 = this_6.convertDateFormate(chartDate);
                                var filteredList = linq_es5_1.asEnumerable(table2Data).Where(function (x) { return x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == recvDate_3; }).ToArray();
                                for (var j = 0; j <= this_6.lstTable1Data.length - 1; j++) {
                                    if (filteredList.length > 0) {
                                        dayWiseData[x].push({ START_INTERVAL: this_6.lstTable2Data[j].START_INTERVAL, PACKAGE_COUNT: this_6.lstTable2Data[j].PACKAGE_COUNT, USER_ID: UserName, TRANS_DATE: this_6.lstTable2Data[j].TRANS_DATE });
                                    }
                                    else {
                                        dayWiseData[x].push({ START_INTERVAL: this_6.lstTable2Data[j].START_INTERVAL, PACKAGE_COUNT: 0, USER_ID: UserName, TRANS_DATE: recvDate_3 });
                                    }
                                    this_6.lstDataForDeliver[x].START_INTERVAL[i_5].push(dayWiseData[x][j].START_INTERVAL);
                                    this_6.lstDataForDeliver[x].PACKAGE_COUNT[i_5].push(dayWiseData[x][j].PACKAGE_COUNT);
                                }
                            }
                            this_6.lstDataForDeliver[x].ReceiveData[i_5] = [];
                            this_6.lstDataForDeliver[x].ReceiveLables.push(this_6.lstDataForDeliver[x].START_INTERVAL[0]);
                            this_6.lstDataForDeliver[x].ReceiveData[i_5].push(this_6.lstDataForDeliver[x].PACKAGE_COUNT[i_5]);
                        };
                        this_6 = this;
                        for (i_5 = 0; i_5 <= this.UserId.length - 1; i_5++) {
                            _loop_6(i_5);
                        }
                    }
                    else {
                        _loop_7 = function (i_6) {
                            var UserName = this_7.selectedDropDownUserId[i_6];
                            if (UserName !== "ALL") {
                                this_7.lstDataForDeliver[x].PACKAGE_COUNT[i_6] = [];
                                this_7.lstDataForDeliver[x].START_INTERVAL[i_6] = [];
                                dayWiseData[x] = [];
                                var table2Data = [];
                                table2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                                var recvDate_4 = this_7.convertDateFormate(chartDate);
                                var filteredList = linq_es5_1.asEnumerable(table2Data).Where(function (x) { return x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == recvDate_4; }).ToArray();
                                for (var j = 0; j <= this_7.lstTable1Data.length - 1; j++) {
                                    if (filteredList.length > 0) {
                                        dayWiseData[x].push({ START_INTERVAL: this_7.lstTable2Data[j].START_INTERVAL, PACKAGE_COUNT: this_7.lstTable2Data[j].PACKAGE_COUNT, USER_ID: UserName, TRANS_DATE: this_7.lstTable2Data[j].TRANS_DATE });
                                    }
                                    else {
                                        dayWiseData[x].push({ START_INTERVAL: this_7.lstTable2Data[j].START_INTERVAL, PACKAGE_COUNT: 0, USER_ID: UserName, TRANS_DATE: recvDate_4 });
                                    }
                                    this_7.lstDataForDeliver[x].START_INTERVAL[i_6].push(dayWiseData[x][j].START_INTERVAL);
                                    this_7.lstDataForDeliver[x].PACKAGE_COUNT[i_6].push(dayWiseData[x][j].PACKAGE_COUNT);
                                }
                            }
                            this_7.lstDataForDeliver[x].ReceiveData[i_6] = [];
                            this_7.lstDataForDeliver[x].ReceiveLables.push(this_7.lstDataForDeliver[x].START_INTERVAL[0]);
                            this_7.lstDataForDeliver[x].ReceiveData[i_6].push(this_7.lstDataForDeliver[x].PACKAGE_COUNT[i_6]);
                        };
                        this_7 = this;
                        for (i_6 = 0; i_6 <= this.selectedDropDownUserId.length - 1; i_6++) {
                            _loop_7(i_6);
                        }
                    }
                    chartDate = new Date(chartDate.setDate(chartDate.getDate() + 1));
                    x += 1;
                }
                this.chartDataSetForDelverLine = [];
                this.lableForDeliver = [];
                for (cnt = 0; cnt <= this.lstDataForDeliver.length - 1; cnt++) {
                    list = [];
                    for (cntData = 0; cntData <= this.lstDataForDeliver[cnt].ReceiveData.length - 1; cntData++) {
                        list.push(this.lstDataForDeliver[cnt].ReceiveData[cntData][0]);
                    }
                    this.chartDataSetForDelverLine.push({ label: '', backgroundColor: '', borderColor: '#00FF00', data: list, fill: false });
                    this.lableForDeliver.push(this.lstDataForDeliver[cnt].ReceiveLables);
                }
                this.dataForDelv1 = [];
                this.dataForDelv2 = [];
                this.dataForDelv3 = [];
                this.dataForDelv4 = [];
                this.dataForDelv5 = [];
                this.optionForDeliver1 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Deliver By Employee - " + this.dateString[0] + " Day"
                    }
                };
                this.optionForDeliver2 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Deliver By Employee - " + this.dateString[1] + " Day"
                    }
                };
                this.optionForDeliver3 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Deliver By Employee - " + this.dateString[2] + " Day"
                    }
                };
                this.optionForDeliver4 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Deliver By Employee - " + this.dateString[3] + " Day"
                    }
                };
                this.optionForDeliver5 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Deliver By Employee - " + this.dateString[4] + " Day"
                    }
                };
                this.chartDataSetForDeliverGraph1 = [];
                if (this.chartDataSetForDelverLine[0] != undefined) {
                    if (this.chartDataSetForDelverLine[0].data != undefined) {
                        for (i in this.chartDataSetForDelverLine[0].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDeliverGraph1.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[0].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDeliverGraph1.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[0].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                this.chartDataSetForDeliverGraph2 = [];
                if (this.chartDataSetForDelverLine[1] != undefined) {
                    if (this.chartDataSetForDelverLine[1].data != undefined) {
                        for (i in this.chartDataSetForDelverLine[1].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDeliverGraph2.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[1].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDeliverGraph2.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[1].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                this.chartDataSetForDeliverGraph3 = [];
                if (this.chartDataSetForDelverLine[2] != undefined) {
                    if (this.chartDataSetForDelverLine[2].data != undefined) {
                        for (i in this.chartDataSetForDelverLine[2].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDeliverGraph3.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[2].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDeliverGraph3.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[2].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                this.chartDataSetForDeliverGraph4 = [];
                if (this.chartDataSetForDelverLine[3] != undefined) {
                    if (this.chartDataSetForDelverLine[3].data != undefined) {
                        for (i in this.chartDataSetForDelverLine[3].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDeliverGraph4.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[3].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDeliverGraph4.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[3].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                this.chartDataSetForDeliverGraph5 = [];
                if (this.chartDataSetForDelverLine[4] != undefined) {
                    if (this.chartDataSetForDelverLine[4].data != undefined) {
                        for (i in this.chartDataSetForDelverLine[4].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDeliverGraph5.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[4].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDeliverGraph5.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[4].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                if (this.blnGraph1 == true) {
                    this.dataForDelv1 = {
                        labels: this.lableForDeliver[0][0],
                        datasets: this.chartDataSetForDeliverGraph1,
                        options: this.optionForRecv1
                    };
                }
                if (this.blnGraph2 == true) {
                    this.dataForDelv2 = {
                        labels: this.lableForDeliver[1][0],
                        datasets: this.chartDataSetForDeliverGraph2,
                        options: this.optionForRecv2
                    };
                }
                if (this.blnGraph3 == true) {
                    this.dataForDelv3 = {
                        labels: this.lableForDeliver[2][0],
                        datasets: this.chartDataSetForDeliverGraph3,
                        options: this.optionForRecv3
                    };
                }
                if (this.blnGraph4 == true) {
                    this.dataForDelv4 = {
                        labels: this.lableForDeliver[3][0],
                        datasets: this.chartDataSetForDeliverGraph4,
                        options: this.optionForRecv4
                    };
                }
                if (this.blnGraph5 == true) {
                    this.dataForDelv5 = {
                        labels: this.lableForDeliver[4][0],
                        datasets: this.chartDataSetForDeliverGraph5,
                        options: this.optionForRecv5
                    };
                }
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.PopulateDockGraph = function (data, day) {
        return __awaiter(this, void 0, void 0, function () {
            var lstItem, frmDate, Curdate, dtfromdate, chartDate, dayWiseData, dataForDockSummChart, count, x, _loop_8, this_8, rows, rows1, value, value1, sum, i_7, _loop_9, this_9, rows, rows1, value, value1, sum, i_8, cnt, list, cntData, i, i, i, i, i;
            return __generator(this, function (_a) {
                frmDate = this.fromDate;
                Curdate = frmDate;
                dtfromdate = this.frmDate;
                chartDate = new Date(dtfromdate);
                this.lstDataForDock = [];
                dayWiseData = [];
                dataForDockSummChart = [];
                count = this.toDate.getDate() - this.fromDate.getDate();
                for (x = 0; x <= count;) {
                    if (this.lstDataForDock[x] == null) {
                        this.lstDataForDock[x] = [];
                        if (this.lstDataForDock[x].PACKAGE_COUNT == null) {
                            this.lstDataForDock[x].PACKAGE_COUNT = [];
                        }
                        this.lstDataForDock[x].START_INTERVAL = [];
                        this.lstDataForDock[x].DockData = [];
                        this.lstDataForDock[x].DockLables = [];
                    }
                    if (this.lstDataForDock[x].DockData == null) {
                        this.lstDataForDock[x].DockData = [];
                    }
                    if (this.lstDataForDock[x].START_INTERVAL == null) {
                        this.lstDataForDock[x].START_INTERVAL = [];
                    }
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        _loop_8 = function (i_7) {
                            var UserName = this_8.UserId[i_7];
                            var startIntervalTotalSum = 0;
                            var packageCountTotalSum = 0;
                            var PackageCountReceive = 0;
                            var PackageCountDeliver = 0;
                            var j = 0;
                            if (UserName !== "ALL") {
                                this_8.lstDataForDock[x].PACKAGE_COUNT[i_7] = [];
                                this_8.lstDataForDock[x].START_INTERVAL[i_7] = [];
                                dayWiseData[x] = [];
                                var table1Data = [];
                                table1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                                var table2Data = [];
                                table2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                                var recvDate_5 = this_8.convertDateFormate(chartDate);
                                var _loop_10 = function (j_1) {
                                    rows = linq_es5_1.asEnumerable(table1Data).Where(function (x) { return x.START_INTERVAL == data.DataDictionary["pDsProductivityRep"]["Table1"][j_1].START_INTERVAL && x.UserId == UserName && x.TRANS_DATE == recvDate_5; }).ToArray();
                                    rows1 = linq_es5_1.asEnumerable(table2Data).Where(function (x) { return x.START_INTERVAL == data.DataDictionary["pDsProductivityRep"]["Table2"][j_1].START_INTERVAL && x.UserId == UserName && x.TRANS_DATE == recvDate_5; }).ToArray();
                                    value = "";
                                    value1 = "";
                                    if (rows.length > 0) {
                                        value = rows[0].PACKAGE_COUNT;
                                    }
                                    else {
                                        value = "0";
                                    }
                                    if (rows1.length > 0) {
                                        value1 = rows1[0].PACKAGE_COUNT;
                                    }
                                    else {
                                        value1 = "0";
                                    }
                                    sum = parseInt(value) + parseInt(value1);
                                    dayWiseData[x].push({ START_INTERVAL: data.DataDictionary["pDsProductivityRep"]["Table1"][j_1].START_INTERVAL, PACKAGE_COUNT: sum, USER_ID: UserName, TRANS_DATE: data.DataDictionary["pDsProductivityRep"]["Table1"][j_1].TRANS_DATE });
                                    dataForDockSummChart.push({ START_INTERVAL: data.DataDictionary["pDsProductivityRep"]["Table1"][j_1].START_INTERVAL, PACKAGE_COUNT: sum, USER_ID: UserName, TRANS_DATE: data.DataDictionary["pDsProductivityRep"]["Table1"][j_1].TRANS_DATE });
                                    this_8.lstDataForDock[x].START_INTERVAL[i_7].push(dayWiseData[x][j_1].START_INTERVAL);
                                    this_8.lstDataForDock[x].PACKAGE_COUNT[i_7].push(dayWiseData[x][j_1].PACKAGE_COUNT);
                                };
                                for (var j_1 = 0; j_1 <= data.DataDictionary["pDsProductivityRep"]["Table1"].length - 1; j_1++) {
                                    _loop_10(j_1);
                                }
                            }
                            this_8.lstDataForDock[x].DockData[i_7] = [];
                            this_8.lstDataForDock[x].DockLables.push(this_8.lstDataForDock[x].START_INTERVAL[0]);
                            this_8.lstDataForDock[x].DockData[i_7].push(this_8.lstDataForDock[x].PACKAGE_COUNT[i_7]);
                        };
                        this_8 = this;
                        for (i_7 = 0; i_7 <= this.UserId.length - 1; i_7++) {
                            _loop_8(i_7);
                        }
                    }
                    else {
                        _loop_9 = function (i_8) {
                            var UserName = this_9.selectedDropDownUserId[i_8];
                            var startIntervalTotalSum = 0;
                            var packageCountTotalSum = 0;
                            var PackageCountReceive = 0;
                            var PackageCountDeliver = 0;
                            var j = 0;
                            if (UserName !== "ALL") {
                                this_9.lstDataForDock[x].PACKAGE_COUNT[i_8] = [];
                                this_9.lstDataForDock[x].START_INTERVAL[i_8] = [];
                                dayWiseData[x] = [];
                                var table1Data = [];
                                table1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                                var table2Data = [];
                                table2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                                var recvDate_6 = this_9.convertDateFormate(chartDate);
                                var _loop_11 = function (j_2) {
                                    rows = linq_es5_1.asEnumerable(table1Data).Where(function (x) { return x.START_INTERVAL == data.DataDictionary["pDsProductivityRep"]["Table1"][j_2].START_INTERVAL && x.UserId == UserName && x.TRANS_DATE == recvDate_6; }).ToArray();
                                    rows1 = linq_es5_1.asEnumerable(table2Data).Where(function (x) { return x.START_INTERVAL == data.DataDictionary["pDsProductivityRep"]["Table2"][j_2].START_INTERVAL && x.UserId == UserName && x.TRANS_DATE == recvDate_6; }).ToArray();
                                    value = "";
                                    value1 = "";
                                    if (rows.length > 0) {
                                        value = rows[0].PACKAGE_COUNT;
                                    }
                                    else {
                                        value = "0";
                                    }
                                    if (rows1.length > 0) {
                                        value1 = rows1[0].PACKAGE_COUNT;
                                    }
                                    else {
                                        value1 = "0";
                                    }
                                    sum = parseInt(value) + parseInt(value1);
                                    dayWiseData[x].push({ START_INTERVAL: data.DataDictionary["pDsProductivityRep"]["Table1"][j_2].START_INTERVAL, PACKAGE_COUNT: sum, USER_ID: UserName, TRANS_DATE: data.DataDictionary["pDsProductivityRep"]["Table1"][j_2].TRANS_DATE });
                                    dataForDockSummChart.push({ START_INTERVAL: data.DataDictionary["pDsProductivityRep"]["Table1"][j_2].START_INTERVAL, PACKAGE_COUNT: sum, USER_ID: UserName, TRANS_DATE: data.DataDictionary["pDsProductivityRep"]["Table1"][j_2].TRANS_DATE });
                                    this_9.lstDataForDock[x].START_INTERVAL[i_8].push(dayWiseData[x][j_2].START_INTERVAL);
                                    this_9.lstDataForDock[x].PACKAGE_COUNT[i_8].push(dayWiseData[x][j_2].PACKAGE_COUNT);
                                };
                                for (var j_2 = 0; j_2 <= data.DataDictionary["pDsProductivityRep"]["Table1"].length - 1; j_2++) {
                                    _loop_11(j_2);
                                }
                            }
                            this_9.lstDataForDock[x].DockData[i_8] = [];
                            this_9.lstDataForDock[x].DockLables.push(this_9.lstDataForDock[x].START_INTERVAL[0]);
                            this_9.lstDataForDock[x].DockData[i_8].push(this_9.lstDataForDock[x].PACKAGE_COUNT[i_8]);
                        };
                        this_9 = this;
                        for (i_8 = 0; i_8 <= this.selectedDropDownUserId.length - 1; i_8++) {
                            _loop_9(i_8);
                        }
                    }
                    chartDate = new Date(chartDate.setDate(chartDate.getDate() + 1));
                    x += 1;
                }
                console.log(dataForDockSummChart);
                this.chartDataSetForDock = [];
                this.labelForDock = [];
                for (cnt = 0; cnt <= this.lstDataForDock.length - 1; cnt++) {
                    list = [];
                    for (cntData = 0; cntData <= this.lstDataForDock[cnt].DockData.length - 1; cntData++) {
                        list.push(this.lstDataForDock[cnt].DockData[cntData][0]);
                    }
                    this.chartDataSetForDock.push({ label: '', backgroundColor: '', borderColor: '#00FF00', data: list, fill: false });
                    this.labelForDock.push(this.lstDataForDock[cnt].DockLables);
                }
                this.dataForDock1 = [];
                this.dataForDock2 = [];
                this.dataForDock3 = [];
                this.dataForDock4 = [];
                this.dataForDock5 = [];
                this.optionForDock1 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Performance By Employee - " + this.dateString[0] + " Day"
                    }
                };
                this.optionForDock2 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Performance By Employee - " + this.dateString[1] + " Day"
                    }
                };
                this.optionForDock3 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Performance By Employee - " + this.dateString[2] + " Day"
                    }
                };
                this.optionForDock4 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Performance By Employee - " + this.dateString[3] + " Day"
                    }
                };
                this.optionForDock5 = {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Performance By Employee - " + this.dateString[4] + " Day"
                    }
                };
                this.chartDataSetForDockGraph1 = [];
                if (this.chartDataSetForDock[0] != undefined) {
                    if (this.chartDataSetForDock[0].data != undefined) {
                        for (i in this.chartDataSetForDock[0].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDockGraph1.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[0].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDockGraph1.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[0].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                this.chartDataSetForDockGraph2 = [];
                if (this.chartDataSetForDock[1] != undefined) {
                    if (this.chartDataSetForDock[1].data != undefined) {
                        for (i in this.chartDataSetForDock[1].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDockGraph2.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[1].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDockGraph2.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[1].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                this.chartDataSetForDockGraph3 = [];
                if (this.chartDataSetForDock[2] != undefined) {
                    if (this.chartDataSetForDock[2].data != undefined) {
                        for (i in this.chartDataSetForDock[2].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDockGraph3.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[2].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDockGraph3.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[2].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                this.chartDataSetForDockGraph4 = [];
                if (this.chartDataSetForDock[3] != undefined) {
                    if (this.chartDataSetForDock[3].data != undefined) {
                        for (i in this.chartDataSetForDock[3].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDockGraph4.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[3].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDockGraph4.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[3].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                this.chartDataSetForDockGraph5 = [];
                if (this.chartDataSetForDock[4] != undefined) {
                    if (this.chartDataSetForDock[4].data != undefined) {
                        for (i in this.chartDataSetForDock[4].data) {
                            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                                this.chartDataSetForDockGraph5.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[4].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                            else {
                                this.chartDataSetForDockGraph5.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[4].data[i], fill: false, borderColor: this.randomColors[i] });
                            }
                        }
                    }
                }
                if (this.blnGraph1 == true) {
                    this.dataForDock1 = {
                        labels: this.labelForDock[0][0],
                        datasets: this.chartDataSetForDockGraph1,
                        options: this.optionForDock1
                    };
                }
                if (this.blnGraph2 == true) {
                    this.dataForDock2 = {
                        labels: this.labelForDock[1][0],
                        datasets: this.chartDataSetForDockGraph2,
                        options: this.optionForDock2
                    };
                }
                if (this.blnGraph3 == true) {
                    this.dataForDock3 = {
                        labels: this.labelForDock[2][0],
                        datasets: this.chartDataSetForDockGraph3,
                        options: this.optionForDock3
                    };
                }
                if (this.blnGraph4 == true) {
                    this.dataForDock4 = {
                        labels: this.labelForDock[3][0],
                        datasets: this.chartDataSetForDockGraph4,
                        options: this.optionForDock4
                    };
                }
                if (this.blnGraph5 == true) {
                    this.dataForDock5 = {
                        labels: this.labelForDock[4][0],
                        datasets: this.chartDataSetForDockGraph5,
                        options: this.optionForDock5
                    };
                }
                this.BindSummaryChartsDock(dataForDockSummChart);
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    ProductivityReportComponent.prototype.BindSummaryChartsRecv = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var lstItem, frmDate, Curdate, _loop_12, this_10, rows, value, i, _loop_13, this_11, rows, value, i, cnt;
            return __generator(this, function (_a) {
                frmDate = this.fromDate;
                Curdate = frmDate;
                this.lstDataForSummaryRecv = [];
                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    _loop_12 = function (i) {
                        if (this_10.lstDataForSummaryRecv[i] == null) {
                            this_10.lstDataForSummaryRecv[i] = [];
                            if (this_10.lstDataForSummaryRecv[i].PACKAGE_COUNT == null) {
                                this_10.lstDataForSummaryRecv[i].PACKAGE_COUNT = [];
                            }
                            this_10.lstDataForSummaryRecv[i].START_INTERVAL = [];
                            this_10.lstDataForSummaryRecv[i].DataSummaryRecv = [];
                            this_10.lstDataForSummaryRecv[i].LabelSummaryRecv = [];
                            this_10.lstDataForSummaryRecv[i].UserId = [];
                        }
                        if (this_10.lstDataForSummaryRecv[i].DataSummaryRecv == null) {
                            this_10.lstDataForSummaryRecv[i].DataSummaryRecv = [];
                        }
                        if (this_10.lstDataForSummaryRecv[i].START_INTERVAL == null) {
                            this_10.lstDataForSummaryRecv[i].START_INTERVAL = [];
                        }
                        if (this_10.lstDataForSummaryRecv[i].UserId == null) {
                            this_10.lstDataForSummaryRecv[i].UserId = [];
                        }
                        var UserName = this_10.UserId[i];
                        var startIntervalTotalSum = 0;
                        var packageCountTotalSum = 0;
                        var PackageCountReceive = 0;
                        var PackageCountDeliver = 0;
                        if (UserName !== "ALL") {
                            var _loop_14 = function (j) {
                                var table1Data = [];
                                table1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                                rows = linq_es5_1.asEnumerable(table1Data).Where(function (x) { return x.START_INTERVAL == data.DataDictionary["pDsProductivityRep"]["Table1"][j].START_INTERVAL && x.UserId == UserName; }).ToArray();
                                value = "";
                                if (rows.length > 0) {
                                    value = rows[0].PACKAGE_COUNT.toString();
                                }
                                else {
                                    value = "0";
                                }
                                this_10.lstDataForSummaryRecv[i].START_INTERVAL.push(data.DataDictionary["pDsProductivityRep"]["Table1"][j].START_INTERVAL);
                                this_10.lstDataForSummaryRecv[i].PACKAGE_COUNT.push(value);
                                this_10.lstDataForSummaryRecv[i].UserId.push(UserName);
                            };
                            for (var j = 0; j <= data.DataDictionary["pDsProductivityRep"]["Table1"].length - 1; j++) {
                                _loop_14(j);
                            }
                        }
                        this_10.lstDataForSummaryRecv[i].DataSummaryRecv.push(this_10.lstDataForSummaryRecv[i].PACKAGE_COUNT);
                        this_10.lstDataForSummaryRecv[i].LabelSummaryRecv.push(this_10.lstDataForSummaryRecv[i].START_INTERVAL);
                    };
                    this_10 = this;
                    for (i = 0; i <= this.UserId.length - 1; i++) {
                        _loop_12(i);
                    }
                }
                else {
                    _loop_13 = function (i) {
                        if (this_11.lstDataForSummaryRecv[i] == null) {
                            this_11.lstDataForSummaryRecv[i] = [];
                            if (this_11.lstDataForSummaryRecv[i].PACKAGE_COUNT == null) {
                                this_11.lstDataForSummaryRecv[i].PACKAGE_COUNT = [];
                            }
                            this_11.lstDataForSummaryRecv[i].START_INTERVAL = [];
                            this_11.lstDataForSummaryRecv[i].DataSummaryRecv = [];
                            this_11.lstDataForSummaryRecv[i].LabelSummaryRecv = [];
                            this_11.lstDataForSummaryRecv[i].UserId = [];
                        }
                        if (this_11.lstDataForSummaryRecv[i].DataSummaryRecv == null) {
                            this_11.lstDataForSummaryRecv[i].DataSummaryRecv = [];
                        }
                        if (this_11.lstDataForSummaryRecv[i].START_INTERVAL == null) {
                            this_11.lstDataForSummaryRecv[i].START_INTERVAL = [];
                        }
                        if (this_11.lstDataForSummaryRecv[i].UserId == null) {
                            this_11.lstDataForSummaryRecv[i].UserId = [];
                        }
                        var UserName = this_11.selectedDropDownUserId[i];
                        var startIntervalTotalSum = 0;
                        var packageCountTotalSum = 0;
                        var PackageCountReceive = 0;
                        var PackageCountDeliver = 0;
                        if (UserName !== "ALL") {
                            var _loop_15 = function (j) {
                                var table1Data = [];
                                table1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                                rows = linq_es5_1.asEnumerable(table1Data).Where(function (x) { return x.START_INTERVAL == data.DataDictionary["pDsProductivityRep"]["Table1"][j].START_INTERVAL && x.UserId == UserName; }).ToArray();
                                value = "";
                                if (rows.length > 0) {
                                    value = rows[0].PACKAGE_COUNT.toString();
                                }
                                else {
                                    value = "0";
                                }
                                this_11.lstDataForSummaryRecv[i].START_INTERVAL.push(data.DataDictionary["pDsProductivityRep"]["Table1"][j].START_INTERVAL);
                                this_11.lstDataForSummaryRecv[i].PACKAGE_COUNT.push(value);
                                this_11.lstDataForSummaryRecv[i].UserId.push(UserName);
                            };
                            for (var j = 0; j <= data.DataDictionary["pDsProductivityRep"]["Table1"].length - 1; j++) {
                                _loop_15(j);
                            }
                        }
                        this_11.lstDataForSummaryRecv[i].DataSummaryRecv.push(this_11.lstDataForSummaryRecv[i].PACKAGE_COUNT);
                        this_11.lstDataForSummaryRecv[i].LabelSummaryRecv.push(this_11.lstDataForSummaryRecv[i].START_INTERVAL);
                    };
                    this_11 = this;
                    for (i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {
                        _loop_13(i);
                    }
                }
                this.chartDataSetForSummaryRecv = [];
                this.labelForSummaryRecv = [];
                for (cnt = 0; cnt <= this.lstDataForSummaryRecv.length - 1; cnt++) {
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        this.chartDataSetForSummaryRecv.push({ label: this.UserId[cnt], backgroundColor: '#FFFFFF', borderColor: this.randomColors[cnt], data: this.lstDataForSummaryRecv[cnt].DataSummaryRecv[0], fill: false });
                        this.labelForSummaryRecv.push(this.lstDataForSummaryRecv[cnt].LabelSummaryRecv);
                    }
                    else {
                        this.chartDataSetForSummaryRecv.push({ label: this.selectedDropDownUserId[cnt], backgroundColor: '#FFFFFF', borderColor: this.randomColors[cnt], data: this.lstDataForSummaryRecv[cnt].DataSummaryRecv[0], fill: false });
                        this.labelForSummaryRecv.push(this.lstDataForSummaryRecv[cnt].LabelSummaryRecv);
                    }
                }
                this.optionForSummaryRecv = {
                    scales: {
                        yAxes: [{
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Receiving By Employee - Summary"
                    }
                };
                this.dataForSummaryRecv = {
                    labels: this.labelForSummaryRecv[0][0],
                    datasets: this.chartDataSetForSummaryRecv,
                    options: this.optionForSummaryRecv
                };
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.BindSummaryChartsDeliver = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var lstItem, frmDate, Curdate, _loop_16, this_12, rows, value, i, _loop_17, this_13, rows, value, i, cnt;
            return __generator(this, function (_a) {
                frmDate = this.fromDate;
                Curdate = frmDate;
                this.lstDataForSummaryDeliver = [];
                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    _loop_16 = function (i) {
                        if (this_12.lstDataForSummaryDeliver[i] == null) {
                            this_12.lstDataForSummaryDeliver[i] = [];
                            if (this_12.lstDataForSummaryDeliver[i].PACKAGE_COUNT == null) {
                                this_12.lstDataForSummaryDeliver[i].PACKAGE_COUNT = [];
                            }
                            this_12.lstDataForSummaryDeliver[i].START_INTERVAL = [];
                            this_12.lstDataForSummaryDeliver[i].DataSummaryRecv = [];
                            this_12.lstDataForSummaryDeliver[i].LabelSummaryRecv = [];
                            this_12.lstDataForSummaryDeliver[i].UserId = [];
                        }
                        if (this_12.lstDataForSummaryDeliver[i].DataSummaryRecv == null) {
                            this_12.lstDataForSummaryDeliver[i].DataSummaryRecv = [];
                        }
                        if (this_12.lstDataForSummaryDeliver[i].START_INTERVAL == null) {
                            this_12.lstDataForSummaryDeliver[i].START_INTERVAL = [];
                        }
                        if (this_12.lstDataForSummaryDeliver[i].UserId == null) {
                            this_12.lstDataForSummaryDeliver[i].UserId = [];
                        }
                        var UserName = this_12.UserId[i];
                        var startIntervalTotalSum = 0;
                        var packageCountTotalSum = 0;
                        var PackageCountReceive = 0;
                        var PackageCountDeliver = 0;
                        if (UserName !== "ALL") {
                            var _loop_18 = function (j) {
                                var table2Data = [];
                                table2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                                rows = linq_es5_1.asEnumerable(table2Data).Where(function (x) { return x.START_INTERVAL == data.DataDictionary["pDsProductivityRep"]["Table1"][j].START_INTERVAL && x.UserId == UserName; }).ToArray();
                                value = "";
                                if (rows.length > 0) {
                                    value = rows[0].PACKAGE_COUNT.toString();
                                }
                                else {
                                    value = "0";
                                }
                                this_12.lstDataForSummaryDeliver[i].START_INTERVAL.push(data.DataDictionary["pDsProductivityRep"]["Table2"][j].START_INTERVAL);
                                this_12.lstDataForSummaryDeliver[i].PACKAGE_COUNT.push(value);
                                this_12.lstDataForSummaryDeliver[i].UserId.push(UserName);
                            };
                            for (var j = 0; j <= data.DataDictionary["pDsProductivityRep"]["Table2"].length - 1; j++) {
                                _loop_18(j);
                            }
                        }
                        this_12.lstDataForSummaryDeliver[i].DataSummaryRecv.push(this_12.lstDataForSummaryDeliver[i].PACKAGE_COUNT);
                        this_12.lstDataForSummaryDeliver[i].LabelSummaryRecv.push(this_12.lstDataForSummaryDeliver[i].START_INTERVAL);
                    };
                    this_12 = this;
                    for (i = 0; i <= this.UserId.length - 1; i++) {
                        _loop_16(i);
                    }
                }
                else {
                    _loop_17 = function (i) {
                        if (this_13.lstDataForSummaryDeliver[i] == null) {
                            this_13.lstDataForSummaryDeliver[i] = [];
                            if (this_13.lstDataForSummaryDeliver[i].PACKAGE_COUNT == null) {
                                this_13.lstDataForSummaryDeliver[i].PACKAGE_COUNT = [];
                            }
                            this_13.lstDataForSummaryDeliver[i].START_INTERVAL = [];
                            this_13.lstDataForSummaryDeliver[i].DataSummaryRecv = [];
                            this_13.lstDataForSummaryDeliver[i].LabelSummaryRecv = [];
                            this_13.lstDataForSummaryDeliver[i].UserId = [];
                        }
                        if (this_13.lstDataForSummaryDeliver[i].DataSummaryRecv == null) {
                            this_13.lstDataForSummaryDeliver[i].DataSummaryRecv = [];
                        }
                        if (this_13.lstDataForSummaryDeliver[i].START_INTERVAL == null) {
                            this_13.lstDataForSummaryDeliver[i].START_INTERVAL = [];
                        }
                        if (this_13.lstDataForSummaryDeliver[i].UserId == null) {
                            this_13.lstDataForSummaryDeliver[i].UserId = [];
                        }
                        var UserName = this_13.selectedDropDownUserId[i];
                        var startIntervalTotalSum = 0;
                        var packageCountTotalSum = 0;
                        var PackageCountReceive = 0;
                        var PackageCountDeliver = 0;
                        if (UserName !== "ALL") {
                            var _loop_19 = function (j) {
                                var table2Data = [];
                                table2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                                rows = linq_es5_1.asEnumerable(table2Data).Where(function (x) { return x.START_INTERVAL == data.DataDictionary["pDsProductivityRep"]["Table1"][j].START_INTERVAL && x.UserId == UserName; }).ToArray();
                                value = "";
                                if (rows.length > 0) {
                                    value = rows[0].PACKAGE_COUNT.toString();
                                }
                                else {
                                    value = "0";
                                }
                                this_13.lstDataForSummaryDeliver[i].START_INTERVAL.push(data.DataDictionary["pDsProductivityRep"]["Table2"][j].START_INTERVAL);
                                this_13.lstDataForSummaryDeliver[i].PACKAGE_COUNT.push(value);
                                this_13.lstDataForSummaryDeliver[i].UserId.push(UserName);
                            };
                            for (var j = 0; j <= data.DataDictionary["pDsProductivityRep"]["Table2"].length - 1; j++) {
                                _loop_19(j);
                            }
                        }
                        this_13.lstDataForSummaryDeliver[i].DataSummaryRecv.push(this_13.lstDataForSummaryDeliver[i].PACKAGE_COUNT);
                        this_13.lstDataForSummaryDeliver[i].LabelSummaryRecv.push(this_13.lstDataForSummaryDeliver[i].START_INTERVAL);
                    };
                    this_13 = this;
                    for (i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {
                        _loop_17(i);
                    }
                }
                this.chartDataSetForSummaryDeliver = [];
                this.labelForSummaryDeliver = [];
                for (cnt = 0; cnt <= this.lstDataForSummaryDeliver.length - 1; cnt++) {
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        this.chartDataSetForSummaryDeliver.push({ label: this.UserId[cnt], backgroundColor: '#FFFFFF', borderColor: this.randomColors[cnt], data: this.lstDataForSummaryDeliver[cnt].DataSummaryRecv[0], fill: false });
                        this.labelForSummaryDeliver.push(this.lstDataForSummaryDeliver[cnt].LabelSummaryRecv);
                    }
                    else {
                        this.chartDataSetForSummaryDeliver.push({ label: this.selectedDropDownUserId[cnt], backgroundColor: '#FFFFFF', borderColor: this.randomColors[cnt], data: this.lstDataForSummaryDeliver[cnt].DataSummaryRecv[0], fill: false });
                        this.labelForSummaryDeliver.push(this.lstDataForSummaryDeliver[cnt].LabelSummaryRecv);
                    }
                }
                this.optionForSummaryDeliver = {
                    scales: {
                        yAxes: [{
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Deliver By Employee - Summary"
                    }
                };
                this.dataForSummaryDeliver = {
                    labels: this.labelForSummaryDeliver[0][0],
                    datasets: this.chartDataSetForSummaryDeliver,
                    options: this.optionForSummaryDeliver
                };
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.BindSummaryChartsDock = function (DockSummaryChartData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var frmDate, Curdate, _loop_20, this_14, rows, value, i, _loop_21, this_15, rows, value, i, cnt;
            return __generator(this, function (_a) {
                frmDate = this.fromDate;
                Curdate = frmDate;
                this.lstDataForSummaryDock = [];
                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    _loop_20 = function (i) {
                        if (this_14.lstDataForSummaryDock[i] == null) {
                            this_14.lstDataForSummaryDock[i] = [];
                            if (this_14.lstDataForSummaryDock[i].PACKAGE_COUNT == null) {
                                this_14.lstDataForSummaryDock[i].PACKAGE_COUNT = [];
                            }
                            this_14.lstDataForSummaryDock[i].START_INTERVAL = [];
                            this_14.lstDataForSummaryDock[i].DataSummaryDock = [];
                            this_14.lstDataForSummaryDock[i].LabelSummaryDock = [];
                            this_14.lstDataForSummaryDock[i].UserId = [];
                        }
                        if (this_14.lstDataForSummaryDock[i].DataSummaryDock == null) {
                            this_14.lstDataForSummaryDock[i].DataSummaryDock = [];
                        }
                        if (this_14.lstDataForSummaryDock[i].START_INTERVAL == null) {
                            this_14.lstDataForSummaryDock[i].START_INTERVAL = [];
                        }
                        if (this_14.lstDataForSummaryDock[i].UserId == null) {
                            this_14.lstDataForSummaryDock[i].UserId = [];
                        }
                        var UserName = this_14.UserId[i];
                        var startIntervalTotalSum = 0;
                        var packageCountTotalSum = 0;
                        var PackageCountReceive = 0;
                        var PackageCountDeliver = 0;
                        if (UserName !== "ALL") {
                            var _loop_22 = function (j) {
                                var dockDusmmarData = [];
                                dockDusmmarData = DockSummaryChartData;
                                rows = linq_es5_1.asEnumerable(DockSummaryChartData).Where(function (x) { return x.START_INTERVAL == _this.lstTable1Data[j].START_INTERVAL && x.USER_ID == UserName; }).ToArray();
                                value = 0;
                                for (var summ = 0; summ <= rows.length - 1; summ++) {
                                    value += parseInt(rows[summ].PACKAGE_COUNT);
                                }
                                this_14.lstDataForSummaryDock[i].START_INTERVAL.push(rows[0].START_INTERVAL);
                                this_14.lstDataForSummaryDock[i].PACKAGE_COUNT.push(value.toString());
                                this_14.lstDataForSummaryDock[i].UserId.push(UserName);
                            };
                            for (var j = 0; j <= this_14.lstTable1Data.length - 1; j++) {
                                _loop_22(j);
                            }
                        }
                        this_14.lstDataForSummaryDock[i].DataSummaryDock.push(this_14.lstDataForSummaryDock[i].PACKAGE_COUNT);
                        this_14.lstDataForSummaryDock[i].LabelSummaryDock.push(this_14.lstDataForSummaryDock[i].START_INTERVAL);
                    };
                    this_14 = this;
                    for (i = 0; i <= this.UserId.length - 1; i++) {
                        _loop_20(i);
                    }
                }
                else {
                    _loop_21 = function (i) {
                        if (this_15.lstDataForSummaryDock[i] == null) {
                            this_15.lstDataForSummaryDock[i] = [];
                            if (this_15.lstDataForSummaryDock[i].PACKAGE_COUNT == null) {
                                this_15.lstDataForSummaryDock[i].PACKAGE_COUNT = [];
                            }
                            this_15.lstDataForSummaryDock[i].START_INTERVAL = [];
                            this_15.lstDataForSummaryDock[i].DataSummaryDock = [];
                            this_15.lstDataForSummaryDock[i].LabelSummaryDock = [];
                            this_15.lstDataForSummaryDock[i].UserId = [];
                        }
                        if (this_15.lstDataForSummaryDock[i].DataSummaryDock == null) {
                            this_15.lstDataForSummaryDock[i].DataSummaryDock = [];
                        }
                        if (this_15.lstDataForSummaryDock[i].START_INTERVAL == null) {
                            this_15.lstDataForSummaryDock[i].START_INTERVAL = [];
                        }
                        if (this_15.lstDataForSummaryDock[i].UserId == null) {
                            this_15.lstDataForSummaryDock[i].UserId = [];
                        }
                        var UserName = this_15.selectedDropDownUserId[i];
                        var startIntervalTotalSum = 0;
                        var packageCountTotalSum = 0;
                        var PackageCountReceive = 0;
                        var PackageCountDeliver = 0;
                        if (UserName !== "ALL") {
                            var _loop_23 = function (j) {
                                var dockDusmmarData = [];
                                dockDusmmarData = DockSummaryChartData;
                                rows = linq_es5_1.asEnumerable(DockSummaryChartData).Where(function (x) { return x.START_INTERVAL == _this.lstTable1Data[j].START_INTERVAL && x.USER_ID == UserName; }).ToArray();
                                value = 0;
                                for (var summ = 0; summ <= rows.length - 1; summ++) {
                                    value += parseInt(rows[summ].PACKAGE_COUNT);
                                }
                                this_15.lstDataForSummaryDock[i].START_INTERVAL.push(rows[0].START_INTERVAL);
                                this_15.lstDataForSummaryDock[i].PACKAGE_COUNT.push(value.toString());
                                this_15.lstDataForSummaryDock[i].UserId.push(UserName);
                            };
                            for (var j = 0; j <= this_15.lstTable1Data.length - 1; j++) {
                                _loop_23(j);
                            }
                        }
                        this_15.lstDataForSummaryDock[i].DataSummaryDock.push(this_15.lstDataForSummaryDock[i].PACKAGE_COUNT);
                        this_15.lstDataForSummaryDock[i].LabelSummaryDock.push(this_15.lstDataForSummaryDock[i].START_INTERVAL);
                    };
                    this_15 = this;
                    for (i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {
                        _loop_21(i);
                    }
                }
                this.chartDataSetForSummaryDock = [];
                this.labelForSummaryDock = [];
                for (cnt = 0; cnt <= this.lstDataForSummaryDock.length - 1; cnt++) {
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        this.chartDataSetForSummaryDock.push({ label: this.UserId[cnt], backgroundColor: '#FFFFFF', borderColor: this.randomColors[cnt], data: this.lstDataForSummaryDock[cnt].DataSummaryDock[0], fill: false });
                        this.labelForSummaryDock.push(this.lstDataForSummaryDock[cnt].LabelSummaryDock);
                    }
                    else {
                        this.chartDataSetForSummaryDock.push({ label: this.selectedDropDownUserId[cnt], backgroundColor: '#FFFFFF', borderColor: this.randomColors[cnt], data: this.lstDataForSummaryDock[cnt].DataSummaryDock[0], fill: false });
                        this.labelForSummaryDock.push(this.lstDataForSummaryDock[cnt].LabelSummaryDock);
                    }
                }
                this.optionForSummaryDock = {
                    scales: {
                        yAxes: [{
                                stacked: true,
                                gridLines: {
                                    display: true,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Packages'
                                }
                            }],
                        xAxes: [{
                                gridLines: {
                                    display: false,
                                    color: "rgba(255,99,132,0.2)"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: "Dock Performance By Employee - Summary"
                    }
                };
                this.dataForSummaryDock = {
                    labels: this.labelForSummaryDock[0][0],
                    datasets: this.chartDataSetForSummaryDock,
                    options: this.optionForSummaryDock
                };
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.BindCycleTimeReport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var frmDate, dt, todate, userString, a;
            return __generator(this, function (_a) {
                this.spinnerService.start();
                this.growlMessage = [];
                this.showGridCycleTime = false;
                frmDate = this.convert(this.fromDate);
                dt = this.convert(this.fromDate);
                this.frmDate = new Date(dt);
                todate = this.convert(this.toDate);
                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    if (this.lstUsers.length == 1) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                        this.spinnerService.stop();
                        return [2 /*return*/];
                    }
                }
                userString = "";
                for (a = 0; a <= this.selectedDropDownUserId.length - 1; a++) {
                    userString = userString + this.selectedDropDownUserId[a] + ",";
                }
                userString = userString.replace(/,\s*$/, "");
                this.DeliverProductivityService.GetCycleTimeReport(this.orgGroupIDForDBUpdate, frmDate, todate, userString, this.startEvent, this.endEvent).catch(this.httpService.handleError).then(function (res) {
                    var data = res.json();
                    switch (data.StatType) {
                        case AtParEnums_2.StatusType.Success: {
                            var lstEventRows = [];
                            _this.lstTransactiondata = data.DataDictionary["pDsDelvDetailRep"]["TRANSACTIONS"];
                            _this.lstEventDetailsData = data.DataDictionary["pDsDelvDetailRep"]["EVENTDETAILS"];
                            console.log(_this.lstTransactiondata);
                            console.log(_this.lstEventDetailsData);
                            if (_this.lstTransactiondata.length > 0 && _this.lstEventDetailsData.length > 0) {
                                _this.showGridCycleTime = true;
                                var lstItem = void 0;
                                _this.lstFinalCycleData = [];
                                if (_this.lstTransactiondata.length > 0) {
                                    var _loop_24 = function (i) {
                                        if (_this.lstEventDetailsData.length > 0) {
                                            if (_this.selectedStartEvent === "-1" && _this.selectedEndEvent === "-2") {
                                                _this.lstTransactionFilterdata = linq_es5_1.asEnumerable(_this.lstEventDetailsData).Where(function (x) { return x.TRANSACTION_ID == _this.lstTransactiondata[i].TRANSACTION_ID && (x.STATUS_MESSAGE == "MMIS Receipt" || x.STATUS_MESSAGE == "Parcel Receipt"); }).OrderBy(function (x) { return x.STATUS_TIME; }).ToArray();
                                            }
                                            else if (_this.selectedStartEvent === "-2") {
                                                _this.lstTransactionFilterdata = linq_es5_1.asEnumerable(_this.lstEventDetailsData).Where(function (x) { return x.TRANSACTION_ID == _this.lstTransactiondata[i].TRANSACTION_ID && (x.STATUS_MESSAGE != "Parcel Receipt"); }).OrderBy(function (x) { return x.STATUS_TIME; }).ToArray();
                                            }
                                            else if (_this.selectedStartEvent === "1") {
                                                _this.lstTransactionFilterdata = linq_es5_1.asEnumerable(_this.lstEventDetailsData).Where(function (x) { return x.TRANSACTION_ID == _this.lstTransactiondata[i].TRANSACTION_ID && (x.STATUS_MESSAGE != "MMIS Receipt" && x.STATUS_MESSAGE != "Parcel Receipt"); }).OrderBy(function (x) { return x.STATUS_TIME; }).ToArray();
                                            }
                                            else {
                                                _this.lstTransactionFilterdata = linq_es5_1.asEnumerable(_this.lstEventDetailsData).Where(function (x) { return x.TRANSACTION_ID == _this.lstTransactiondata[i].TRANSACTION_ID; }).OrderBy(function (x) { return x.STATUS_TIME; }).ToArray();
                                            }
                                            console.log(_this.lstTransactionFilterdata);
                                            if (_this.lstTransactionFilterdata.length > 0) {
                                                lstItem = new VM_CYCLETIME_DETAILS_1.VM_CYCLETIME_DETAILS();
                                                lstItem.TRANSACTION_ID = _this.lstTransactiondata[i].TRANSACTION_ID;
                                                lstItem.TRACKING_NBR = _this.lstTransactiondata[i].EXTTRACKING;
                                                lstItem.DELIVER_FROM = _this.lstTransactiondata[i].DELIVERED_BY;
                                                var intTotVal = 0;
                                                var dtPrevCycletime = null;
                                                var dtCycletime = void 0;
                                                var defaultDateString = "1/1/0001 12:00:00 AM";
                                                dtdefaultdate = Date.parse(defaultDateString);
                                                var dtTimediff = void 0;
                                                var dtPrevCycletimeCount = 0;
                                                var dtCycletimeCount = 0;
                                                for (var j = 0; j <= _this.lstTransactionFilterdata.length - 1; j++) {
                                                    if (_this.lstTransactionFilterdata[j].STATUS_TIME != null) {
                                                        dtCycletime = _this.lstTransactionFilterdata[j].STATUS_TIME;
                                                        if (dtPrevCycletime != null) {
                                                            if (dtPrevCycletime.toString() != dtdefaultdate.toString()) {
                                                                dtPrevCycletimeCount = new Date(dtPrevCycletime).getTime();
                                                                dtCycletimeCount = new Date(dtCycletime).getTime();
                                                                if ((dtCycletimeCount - dtPrevCycletimeCount) / 1000 >= 0) {
                                                                    intTotVal = intTotVal + parseInt(((dtCycletimeCount - dtPrevCycletimeCount) / 1000).toString());
                                                                }
                                                            }
                                                        }
                                                        dtPrevCycletime = dtCycletime;
                                                    }
                                                }
                                                var intHrs = 0;
                                                var intDurationInSec = intTotVal;
                                                seconds = Math.round(intDurationInSec % 60);
                                                minutes = Math.round(intDurationInSec / 60 % 24);
                                                hours = Math.round(intDurationInSec / 3600);
                                                days = Math.round(intDurationInSec / 24 / 60 / 60);
                                                if (days > 0) {
                                                    hours = days * 24;
                                                }
                                                else {
                                                    hours = 0;
                                                }
                                                var h = void 0, m = void 0, s = "";
                                                if (hours < 10) {
                                                    h = "0" + hours;
                                                }
                                                else {
                                                    h = hours.toString();
                                                }
                                                if (minutes < 10) {
                                                    m = "0" + minutes;
                                                }
                                                else {
                                                    m = minutes.toString();
                                                }
                                                if (seconds < 10) {
                                                    s = "0" + seconds;
                                                }
                                                else {
                                                    s = seconds.toString();
                                                }
                                                var strDuration = "";
                                                var span = void 0;
                                                var Hspan = void 0;
                                                strDuration = h + ":" + m + ':' + s;
                                                Hspan = intDurationInSec / 60 % 24;
                                                lstItem.CYCLE_TIME = strDuration.toString();
                                                lstItem.HOURS = h;
                                                lstItem.MINS = m;
                                                lstItem.SECONDS = s;
                                                lstItem.TOT_HOURS = (Math.trunc((Hspan / 60) * 100) / 100).toString();
                                                _this.lstFinalCycleData.push(lstItem);
                                            }
                                        }
                                    };
                                    var dtdefaultdate, seconds, minutes, hours, days;
                                    for (var i = 0; i <= _this.lstTransactiondata.length - 1; i++) {
                                        _loop_24(i);
                                    }
                                    console.log(_this.lstFinalCycleData);
                                    _this.BindCycleTimeHoursSummary();
                                    _this.BindCycleTimeSummaryDetails();
                                    _this.tdExports = true;
                                }
                            }
                            else {
                                _this.showGrid = false;
                                _this.showGridCycleTime = false;
                                _this.tdExports = false;
                                _this.growlMessage = [];
                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                            }
                            _this.spinnerService.stop();
                            break;
                        }
                        case AtParEnums_2.StatusType.Warn: {
                            _this.showGrid = false;
                            _this.showGridCycleTime = false;
                            _this.tdExports = false;
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                        case AtParEnums_2.StatusType.Error: {
                            _this.showGrid = false;
                            _this.showGridCycleTime = false;
                            _this.tdExports = false;
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                        case AtParEnums_2.StatusType.Custom: {
                            _this.showGrid = false;
                            _this.showGridCycleTime = false;
                            _this.tdExports = false;
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            _this.spinnerService.stop();
                            break;
                        }
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.CalculateCycleTime = function (cycleFilterData, cycleSingleData) {
        return __awaiter(this, void 0, void 0, function () {
            var intTotVal, dtPrevCycletime, dtCycletime, defaultDateString, dtdefaultdate, dtTimediff, i;
            return __generator(this, function (_a) {
                intTotVal = 0;
                dtPrevCycletime = null;
                defaultDateString = "1/1/0001 12:00:00 AM";
                dtdefaultdate = Date.parse(defaultDateString);
                for (i = 0; i <= cycleFilterData.length - 1; i++) {
                    if (cycleFilterData[i].STATUS_TIME != null) {
                        dtCycletime = cycleFilterData[i].STATUS_TIME;
                        if (dtPrevCycletime.toString() != dtdefaultdate.toString()) {
                            if ((dtPrevCycletime.getTime() - dtCycletime.getTime()) >= 0) {
                                intTotVal = intTotVal + parseInt((dtPrevCycletime.getTime() - dtCycletime.getTime()).toString());
                            }
                        }
                        dtPrevCycletime = dtCycletime;
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.BindCycleTimeHoursSummary = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ArrHrsList, _IntHrsCnt, _IntTotCounts, lstitem, totalHoursList, c, _loop_25, this_16, i;
            return __generator(this, function (_a) {
                ArrHrsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 24, 48, 72, 100];
                _IntHrsCnt = 0;
                _IntTotCounts = 0;
                _IntTotCounts = this.lstFinalCycleData.length;
                this.lstCycleHourDetails = [];
                totalHoursList = [];
                for (c = 0; c <= this.lstFinalCycleData.length - 1; c++) {
                    totalHoursList.push({ TOT_HOURS: parseFloat(this.lstFinalCycleData[c].TOT_HOURS) });
                }
                _loop_25 = function (i) {
                    _IntHrsCnt = linq_es5_1.asEnumerable(totalHoursList).Where(function (x) { return x.TOT_HOURS <= parseFloat((ArrHrsList[i]).toString()); }).ToArray().length;
                    lstitem = new VM_CYCLETIME_DETAILS_1.VM_CYCLETIME_DETAILS();
                    lstitem.HOURSSUMMARY = ArrHrsList[i].toString();
                    lstitem.COUNTSUMMARY = _IntHrsCnt.toString();
                    lstitem.COUNT_PERCENTSUMMARY = ((_IntHrsCnt > 0) ? (Math.trunc(((_IntHrsCnt / _IntTotCounts) * 100)) / 100) : 0);
                    this_16.lstCycleHourDetails.push(lstitem);
                };
                this_16 = this;
                for (i = 0; i <= ArrHrsList.length - 1; i++) {
                    _loop_25(i);
                }
                console.log(this.lstFinalCycleData);
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.BindCycleTimeSummaryDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var AvgCount, TotTotalHoursArray, result, i, length, sum, SumOfSqrs, defaultValue, cnt, topSum, val;
            return __generator(this, function (_a) {
                AvgCount = 0;
                TotTotalHoursArray = new Array();
                this.Results = [];
                result = new VM_RESULTS_1.VM_RESULTS();
                result.Count = this.lstFinalCycleData.length.toString();
                for (i = 0; i <= this.lstFinalCycleData.length - 1; i++) {
                    AvgCount = AvgCount + parseFloat(this.lstFinalCycleData[i].TOT_HOURS);
                    TotTotalHoursArray.push(parseFloat(this.lstFinalCycleData[i].TOT_HOURS));
                }
                result.AVG = (Math.trunc((AvgCount / this.lstFinalCycleData.length) * 100) / 100).toString();
                result.Min = Math.min.apply(Math, TotTotalHoursArray).toString();
                result.Max = Math.max.apply(Math, TotTotalHoursArray).toString();
                length = this.lstFinalCycleData.length;
                sum = 0;
                SumOfSqrs = 0;
                defaultValue = 0;
                for (cnt = 0; cnt <= TotTotalHoursArray.length - 1; cnt++) {
                    sum += TotTotalHoursArray[cnt];
                    SumOfSqrs += Math.pow(TotTotalHoursArray[cnt], 2);
                }
                if (TotTotalHoursArray.length == 0) {
                    result.StDev = defaultValue.toString();
                }
                topSum = (TotTotalHoursArray.length * SumOfSqrs) - (Math.pow(sum, 2));
                val = TotTotalHoursArray.length;
                result.StDev = (Math.trunc((Math.sqrt(topSum / (val * (val - 1)))) * 100) / 100).toString();
                this.Results.push(result);
                console.log(this.lstFinalCycleData);
                return [2 /*return*/];
            });
        });
    };
    ProductivityReportComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
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
    ProductivityReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, mailName, ex_4;
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
                        mailName = "";
                        if (this.activeTab === "Employee Productivity") {
                            mailName = "Employee Productivity Report";
                        }
                        else if (this.activeTab === "Receive by Employee") {
                            mailName = "Productivity Receive By Employee";
                        }
                        else if (this.activeTab === "Deliver by Employee") {
                            mailName = "Productivity Deliver By Employee";
                        }
                        else if (this.activeTab === "Dock Performance") {
                            mailName = "Productivity Dock Performance By Employee";
                        }
                        else {
                            mailName = "Cycle Time Report";
                        }
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], mailName, JSON.stringify(html), this.toMailAddr, AtParEnums_1.MailPriority.Normal.toString(), '')
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
                        // if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.isMailDialog = false;
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "onSendMailClick");
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ProductivityReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ProductivityReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, printName, mywindow, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Print')];
                    case 1:
                        html = _a.sent();
                        printName = "";
                        if (this.activeTab === "Employee Productivity") {
                            printName = "Employee Productivity Report";
                        }
                        else if (this.activeTab === "Receive by Employee") {
                            printName = "Productivity Receive By Employee";
                        }
                        else if (this.activeTab === "Deliver by Employee") {
                            printName = "Productivity Deliver By Employee";
                        }
                        else if (this.activeTab === "Dock Performance") {
                            printName = "Productivity Dock Performance By Employee";
                        }
                        else {
                            printName = "Cycle Time Report";
                        }
                        if (html != '' && html != null) {
                            mywindow = window.open('', 'PRINT', 'height=600,width=600');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + printName + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                // mywindow.document.close(); // necessary for IE >= 10
                                mywindow.focus(); // necessary for IE >= 10*/
                                //mywindow.print();
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
    ProductivityReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, excelName, blob, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        excelName = "";
                        if (this.activeTab === "Employee Productivity") {
                            excelName = "Deliver_EmployeeProductivity.xls";
                        }
                        else if (this.activeTab === "Receive by Employee") {
                            excelName = "ProductivityReceiveByEmployee.xls";
                        }
                        else if (this.activeTab === "Deliver by Employee") {
                            excelName = "ProductivityDeliverByEmployee.xls";
                        }
                        else if (this.activeTab === "Dock Performance") {
                            excelName = "ProductivityDockPerformanceByEmployee.xls";
                        }
                        else {
                            excelName = "ProductivityCycleTimeReport.xls";
                        }
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, excelName);
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "onExportToExcelClick");
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductivityReportComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var chartImageEmpDay, imageEmpDay, chartImageAvgEmp, imageAvgEmp, htmlBuilder_1, sbMailText, _strFrmDt, _strToDt, imgserverPath, imgEmpDayAvgPath, phyname, Curdate, pint, strTitle, title, dtfromdate, chartDatee, dttodate, datediff, x, dtfromdate1, chartDate1, dttodate1, datediff1, xy, SelDate_1, lstEmpDayList, _loop_26, this_17, j, _loop_27, this_18, j, _loop_28, this_19, j, _loop_29, this_20, j, ex_7, chartImageRecv1, imageRecv1, chartImageRecv2, imageRecv2, chartImageRecv3, imageRecv3, chartImageRecv4, imageRecv4, chartImageRecv5, imageRecv5, chartImageRecvSumm, imageRecvSumm, htmlBuilder_2, sbMailText, _strFrmDt, _strToDt, imgserverPath, imgEmpDayForRecvPath, phyname, Curdate, strTitle, title, dtfromdate, chartDatee, dttodate, datediff, x, pint, _loop_30, this_21, summ, UserName, summ, UserName, strPckgCnt, _loop_31, this_22, summcnt, ex_8, chartImageDelv1, imageDelv1, chartImageDelv2, imageDelv2, chartImageDelv3, imageDelv3, chartImageDelv4, imageDelv4, chartImageDelv5, imageDelv5, chartImageDelvSumm, imageDelvSumm, htmlBuilder_3, sbMailText, _strFrmDt, _strToDt, imgserverPath, imgEmpDayForDelvPath, phyname, Curdate, strTitle, title, dtfromdate, chartDatee, dttodate, datediff, x, pint, _loop_32, this_23, summ, UserName, summ, UserName, strPckgCnt, _loop_33, this_24, summcnt, ex_9, chartImageDock1, imageDock1, chartImageDock2, imageDock2, chartImageDock3, imageDock3, chartImageDock4, imageDock4, chartImageDock5, imageDock5, chartImageDockSumm, imageDockSumm, htmlBuilder_4, sbMailText, _strFrmDt, _strToDt, imgserverPath, imgEmpDayForDockPath, phyname, Curdate, strTitle, title, dtfromdate, chartDatee, dttodate, datediff, x, pint, _loop_34, this_25, summ, UserName, summ, UserName, strPckgCnt, _loop_35, this_26, summcnt, _loop_36, this_27, summcnt, ex_10, htmlBuilder_5, sbMailText, _strFrmDt, _strToDt, imgserverPath, imgEmpDayForDockPath, phyname, Curdate, strTitle, title, i, j, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.activeTab === "Employee Productivity")) return [3 /*break*/, 9];
                        chartImageEmpDay = document.getElementById("ChartIdEmpDay");
                        imageEmpDay = chartImageEmpDay.toDataURL("image/png");
                        imageEmpDay = imageEmpDay.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageEmpDay, "EmpProdByDay").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 1:
                        _a.sent();
                        chartImageAvgEmp = document.getElementById("ChartIdAvgEmpProd");
                        imageAvgEmp = chartImageAvgEmp.toDataURL("image/png");
                        imageAvgEmp = imageAvgEmp.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageAvgEmp, "AvgEmpProd").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                        htmlBuilder_1 = '';
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, , 8]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        imgEmpDayAvgPath = '';
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
                                    htmlBuilder_1 = '';
                                    return htmlBuilder_1;
                                }
                            })];
                    case 4:
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
                                    htmlBuilder_1 = '';
                                    return htmlBuilder_1;
                                }
                            })];
                    case 5:
                        _a.sent();
                        phyname = void 0;
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgEmpDayAvgPath = this.httpService.BaseUrl + '/Uploaded/';
                        Curdate = this.frmDate;
                        pint = 0;
                        strTitle = "\"" + "AtparVersion2.4.4" + "\"";
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder_1 += "<Table align= left width= 100 % cellpadding=0 cellspacing = 0 vAlign= top>";
                        if (reqType === "Print") {
                            htmlBuilder_1 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder_1 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_1 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder_1 += "<tr><td colspan=5 align=left><b><span class=c2>Employee Productivity by Day From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + " </span></b></td><td align=right valign=top>&nbsp;";
                            htmlBuilder_1 += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType === "Mail") {
                                //htmlBuilder += "<TR width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td></TR>";
                                htmlBuilder_1 += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            }
                            else {
                                htmlBuilder_1 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            }
                            htmlBuilder_1 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_1 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0></tr>";
                            htmlBuilder_1 += "<tr><td colspan=5 align=left><b><span class=c2>Employee Productivity by Day From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder_1 += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> ";
                        htmlBuilder_1 += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                        htmlBuilder_1 += "<tr bgcolor=#d3d3d3>";
                        htmlBuilder_1 += "<td align=center nowrap ><b><span class=c2></span></b></td>";
                        dtfromdate = this.fromDate;
                        chartDatee = new Date(dtfromdate);
                        dttodate = this.toDate;
                        datediff = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                        x = 0;
                        while (x <= datediff) {
                            pint += 1;
                            htmlBuilder_1 += "<td align=center nowrap colspan=2><b><span class=c2>Day " + pint.toString() + " (" + this.convertDateFormate(chartDatee.toString()) + ")</span></b></td>";
                            chartDatee = new Date(chartDatee.setDate(chartDatee.getDate() + 1));
                            x += 1;
                        }
                        htmlBuilder_1 += "</tr>";
                        pint = 0;
                        htmlBuilder_1 += "<tr bgcolor=#d3d3d3>";
                        htmlBuilder_1 += "<td align=center nowrap ><b><span class=c2>Employee</span></b></td>";
                        dtfromdate1 = this.fromDate;
                        chartDate1 = new Date(dtfromdate1);
                        dttodate1 = this.toDate;
                        datediff1 = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                        xy = 0;
                        while (xy <= datediff1) {
                            pint += 1;
                            htmlBuilder_1 += "<td align=center nowrap ><b><span class=c2>Packages</span></b></td>";
                            htmlBuilder_1 += "<td align=center nowrap ><b><span class=c2>Time</span></b></td>";
                            chartDate1 = new Date(chartDate1.setDate(chartDate1.getDate() + 1));
                            xy += 1;
                        }
                        htmlBuilder_1 += "</tr>";
                        pint = 0;
                        lstEmpDayList = [];
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            _loop_26 = function (j) {
                                var UserName = this_17.UserId[j];
                                if (UserName !== "ALL") {
                                    var dtfromdate2 = this_17.fromDate;
                                    var chartDate2 = new Date(dtfromdate2);
                                    var dttodate2 = this_17.toDate;
                                    var datediff2 = new Date(this_17.toDate).getDate() - new Date(this_17.fromDate).getDate();
                                    var xy_1 = 0;
                                    pint = 0;
                                    htmlBuilder_1 += "<tr width='100%'>";
                                    htmlBuilder_1 += "<td align=left nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                    while (xy_1 <= datediff2) {
                                        SelDate_1 = chartDate2.toString();
                                        lstEmpDayList = linq_es5_1.asEnumerable(this_17.lstChartData).Where(function (i) { return i.TRANS_DATE == SelDate_1 && i.UserId === UserName; }).ToArray();
                                        xy_1 += 1;
                                        if (lstEmpDayList.length > 0) {
                                            htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + lstEmpDayList[0].PACKAGE_COUNT + "</span></td>";
                                            htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + lstEmpDayList[0].TIME + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder_1 += "<td align=right nowrap ><span class=c2>0</span></td>";
                                            htmlBuilder_1 += "<td align=right nowrap ><span class=c2>0</span></td>";
                                        }
                                        chartDate2 = new Date(chartDate2.setDate(chartDate2.getDate() + 1));
                                    }
                                }
                                htmlBuilder_1 += "</tr>";
                            };
                            this_17 = this;
                            for (j = 0; j <= this.UserId.length - 1; j++) {
                                _loop_26(j);
                            }
                        }
                        else {
                            _loop_27 = function (j) {
                                var UserName = this_18.selectedDropDownUserId[j];
                                if (UserName !== "ALL") {
                                    var dtfromdate2 = this_18.fromDate;
                                    var chartDate2 = new Date(dtfromdate2);
                                    var dttodate2 = this_18.toDate;
                                    var datediff2 = new Date(this_18.toDate).getDate() - new Date(this_18.fromDate).getDate();
                                    var xy_2 = 0;
                                    pint = 0;
                                    htmlBuilder_1 += "<tr width='100%'>";
                                    htmlBuilder_1 += "<td align=left nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                    while (xy_2 <= datediff2) {
                                        SelDate_1 = chartDate2.toString();
                                        lstEmpDayList = linq_es5_1.asEnumerable(this_18.lstChartData).Where(function (i) { return i.TRANS_DATE == SelDate_1 && i.UserId === UserName; }).ToArray();
                                        xy_2 += 1;
                                        if (lstEmpDayList.length > 0) {
                                            htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + lstEmpDayList[0].PACKAGE_COUNT + "</span></td>";
                                            htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + lstEmpDayList[0].TIME + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder_1 += "<td align=right nowrap ><span class=c2>0</span></td>";
                                            htmlBuilder_1 += "<td align=right nowrap ><span class=c2>0</span></td>";
                                        }
                                        chartDate2 = new Date(chartDate2.setDate(chartDate2.getDate() + 1));
                                    }
                                }
                                htmlBuilder_1 += "</tr>";
                            };
                            this_18 = this;
                            for (j = 0; j <= this.selectedDropDownUserId.length - 1; j++) {
                                _loop_27(j);
                            }
                        }
                        htmlBuilder_1 += "<br/>";
                        htmlBuilder_1 += "<br/>";
                        htmlBuilder_1 += "</table>";
                        htmlBuilder_1 += "<div align=center>";
                        htmlBuilder_1 += "<table>";
                        htmlBuilder_1 += "<tr nowrap>";
                        if (reqType === "Mail") {
                            htmlBuilder_1 += "<td align=left colspan=" + ((pint * 2) + 1).toString() + " ><img src=" + imgEmpDayAvgPath + "EmpProdByDay.png /></td>";
                        }
                        else {
                            htmlBuilder_1 += "<td align=left colspan=" + ((pint * 2) + 1).toString() + " ><img src=" + imgEmpDayAvgPath + "EmpProdByDay.png /></td>";
                        }
                        htmlBuilder_1 += "</tr>";
                        htmlBuilder_1 += "</table>";
                        htmlBuilder_1 += "</div>";
                        htmlBuilder_1 += "</td></tr>";
                        htmlBuilder_1 += "<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>";
                        htmlBuilder_1 += "</br><tr><td colspan=5 align=left><span class=c2><b>Average Employee Productivity by Day From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                        htmlBuilder_1 += "<tr><td colspan=2> ";
                        htmlBuilder_1 += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                        htmlBuilder_1 += "<tr>";
                        htmlBuilder_1 += "<td align=center nowrap colspan=4 ><b><span class=c2>Average Package Handled</span></b></td>";
                        htmlBuilder_1 += "</tr>";
                        htmlBuilder_1 += "<td align=center nowrap ><b><span class=c2>Employee</span></b></td>";
                        htmlBuilder_1 += "<td align=center nowrap ><b><span class=c2>Packages</span></b></td>";
                        htmlBuilder_1 += "<td align=center nowrap ><b><span class=c2>Average Time (hours)</span></b></td>";
                        htmlBuilder_1 += "<td align=center nowrap ><b><span class=c2>Max Time (Hours)</span></b></td>";
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            _loop_28 = function (j) {
                                var UserName = this_19.UserId[j];
                                if (UserName !== "ALL") {
                                    htmlBuilder_1 += "<tr>";
                                    htmlBuilder_1 += "<td align=left nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                    var AvgPackageCount = 0;
                                    var AvgTimeCount = 0;
                                    var AvgMaxCount = 0;
                                    var TotTotalHoursArray = new Array();
                                    var lstAvgList = [];
                                    lstAvgList = linq_es5_1.asEnumerable(this_19.lstChartData).Where(function (z) { return z.UserId == UserName; }).ToArray();
                                    for (var k = 0; k <= lstAvgList.length - 1; k++) {
                                        AvgPackageCount += lstAvgList[k].PACKAGE_COUNT;
                                        AvgTimeCount += lstAvgList[k].TIME;
                                        TotTotalHoursArray.push(lstAvgList[k].TIME);
                                    }
                                    AvgPackageCount = AvgPackageCount / lstAvgList.length;
                                    AvgMaxCount = Math.max.apply(Math, TotTotalHoursArray);
                                    AvgTimeCount = AvgTimeCount / lstAvgList.length;
                                    htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + AvgPackageCount + "</span></td>";
                                    htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + AvgTimeCount + "</span></td>";
                                    htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + AvgMaxCount + "</span></td>";
                                    htmlBuilder_1 += "</tr>";
                                    //htmlBuilder += "<tr>"
                                }
                            };
                            this_19 = this;
                            for (j = 0; j <= this.UserId.length - 1; j++) {
                                _loop_28(j);
                            }
                        }
                        else {
                            _loop_29 = function (j) {
                                var UserName = this_20.selectedDropDownUserId[j];
                                if (UserName !== "ALL") {
                                    htmlBuilder_1 += "<tr>";
                                    htmlBuilder_1 += "<td align=left nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                    var AvgPackageCount = 0;
                                    var AvgTimeCount = 0;
                                    var AvgMaxCount = 0;
                                    var TotTotalHoursArray = new Array();
                                    var lstAvgList = [];
                                    lstAvgList = linq_es5_1.asEnumerable(this_20.lstChartData).Where(function (z) { return z.UserId == UserName; }).ToArray();
                                    for (var k = 0; k <= lstAvgList.length - 1; k++) {
                                        AvgPackageCount += lstAvgList[k].PACKAGE_COUNT;
                                        AvgTimeCount += lstAvgList[k].TIME;
                                        TotTotalHoursArray.push(lstAvgList[k].TIME);
                                    }
                                    AvgPackageCount = AvgPackageCount / lstAvgList.length;
                                    AvgMaxCount = Math.max.apply(Math, TotTotalHoursArray);
                                    AvgTimeCount = AvgTimeCount / lstAvgList.length;
                                    htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + AvgPackageCount + "</span></td>";
                                    htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + AvgTimeCount + "</span></td>";
                                    htmlBuilder_1 += "<td align=right nowrap ><span class=c2>" + AvgMaxCount + "</span></td>";
                                    htmlBuilder_1 += "</tr>";
                                    htmlBuilder_1 += "<tr>";
                                }
                            };
                            this_20 = this;
                            for (j = 0; j <= this.selectedDropDownUserId.length - 1; j++) {
                                _loop_29(j);
                            }
                        }
                        htmlBuilder_1 += "<tr nowrap>";
                        if (reqType === "Mail") {
                            htmlBuilder_1 += "<td align=left colspan='4' ><img src=" + imgEmpDayAvgPath + "AvgEmpProd.png /></td>";
                        }
                        else {
                            htmlBuilder_1 += "<td align=left colspan='4' ><img src=" + imgEmpDayAvgPath + "AvgEmpProd.png /></td>";
                        }
                        htmlBuilder_1 += "</tr>";
                        htmlBuilder_1 += "</table>";
                        htmlBuilder_1 += "</td></tr>";
                        htmlBuilder_1 += "</Table>";
                        return [4 /*yield*/, htmlBuilder_1];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7:
                        ex_7 = _a.sent();
                        htmlBuilder_1 = '';
                        return [2 /*return*/, htmlBuilder_1];
                    case 8: return [3 /*break*/, 58];
                    case 9:
                        if (!(this.activeTab === "Receive by Employee")) return [3 /*break*/, 27];
                        if (!(this.blnGraph1 == true)) return [3 /*break*/, 11];
                        chartImageRecv1 = document.getElementById("ChartIdForRecv1");
                        imageRecv1 = chartImageRecv1.toDataURL("image/png");
                        imageRecv1 = imageRecv1.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageRecv1, "EmpProdRecv0").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        if (!(this.blnGraph2 == true)) return [3 /*break*/, 13];
                        chartImageRecv2 = document.getElementById("ChartIdForRecv2");
                        imageRecv2 = chartImageRecv2.toDataURL("image/png");
                        imageRecv2 = imageRecv2.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageRecv2, "EmpProdRecv1").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 12:
                        _a.sent();
                        _a.label = 13;
                    case 13:
                        if (!(this.blnGraph3 == true)) return [3 /*break*/, 15];
                        chartImageRecv3 = document.getElementById("ChartIdForRecv3");
                        imageRecv3 = chartImageRecv3.toDataURL("image/png");
                        imageRecv3 = imageRecv3.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageRecv3, "EmpProdRecv2").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15:
                        if (!(this.blnGraph4 == true)) return [3 /*break*/, 17];
                        chartImageRecv4 = document.getElementById("ChartIdForRecv4");
                        imageRecv4 = chartImageRecv4.toDataURL("image/png");
                        imageRecv4 = imageRecv4.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageRecv4, "EmpProdRecv3").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 16:
                        _a.sent();
                        _a.label = 17;
                    case 17:
                        if (!(this.blnGraph5 == true)) return [3 /*break*/, 19];
                        chartImageRecv5 = document.getElementById("ChartIdForRecv5");
                        imageRecv5 = chartImageRecv5.toDataURL("image/png");
                        imageRecv5 = imageRecv5.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageRecv5, "EmpProdRecv4").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 18:
                        _a.sent();
                        _a.label = 19;
                    case 19:
                        chartImageRecvSumm = document.getElementById("ChartIdForSummaryRecv");
                        imageRecvSumm = chartImageRecvSumm.toDataURL("image/png");
                        imageRecvSumm = imageRecvSumm.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageRecvSumm, "EmpProdRecvSumm").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 20:
                        _a.sent();
                        htmlBuilder_2 = '';
                        _a.label = 21;
                    case 21:
                        _a.trys.push([21, 25, , 26]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        imgEmpDayForRecvPath = '';
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
                                    htmlBuilder_2 = '';
                                    return htmlBuilder_2;
                                }
                            })];
                    case 22:
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
                                    htmlBuilder_2 = '';
                                    return htmlBuilder_2;
                                }
                            })];
                    case 23:
                        _a.sent();
                        phyname = void 0;
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgEmpDayForRecvPath = this.httpService.BaseUrl + '/Uploaded/';
                        Curdate = this.frmDate;
                        strTitle = "\"" + "AtparVersion2.4.4" + "\"";
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder_2 += "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == "Print") {
                            htmlBuilder_2 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder_2 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_2 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder_2 += "<tr><td colspan=5 align=left><span class=c2><b>Dock Performance Report From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder_2 += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType == "Mail") {
                                htmlBuilder_2 += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            }
                            else {
                                htmlBuilder_2 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            }
                            htmlBuilder_2 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_2 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder_2 += "<tr><td align=left><span class=c2><b>Dock Receive   By Employee From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder_2 += "</td></tr></table></td></tr><br/>";
                        dtfromdate = this.fromDate;
                        chartDatee = new Date(dtfromdate);
                        dttodate = this.toDate;
                        datediff = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                        x = 0;
                        pint = 0;
                        _loop_30 = function () {
                            pint += 1;
                            var SelDate = chartDatee.toString();
                            htmlBuilder_2 += "<br/><tr><td colspan=2 align=left><b><span class=c2> Receiving By Employee Day - " + this_21.convertDateFormate(SelDate) + "</span></b></td><td align=right valign=top>&nbsp;";
                            htmlBuilder_2 += "<tr><td colspan=2><table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                            htmlBuilder_2 += "<tr width='100%' bgcolor=#d3d3d3>";
                            htmlBuilder_2 += "<td align=center nowrap ><b><span class=c2></span></b></td>";
                            if (this_21.selectedDropDownUserId.indexOf("ALL") > -1) {
                                for (var i = 0; i <= this_21.UserId.length - 1; i++) {
                                    var UserName = this_21.UserId[i];
                                    htmlBuilder_2 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                }
                            }
                            else {
                                for (var i = 0; i <= this_21.selectedDropDownUserId.length - 1; i++) {
                                    var UserName = this_21.selectedDropDownUserId[i];
                                    htmlBuilder_2 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                }
                            }
                            htmlBuilder_2 += "<td align=Center nowrap width='100%'><b><span class=c2>Graph</span></b></td>";
                            htmlBuilder_2 += "</tr>";
                            var _loop_37 = function (z) {
                                htmlBuilder_2 += "<tr width='100%'>";
                                htmlBuilder_2 += "<td align=left nowrap><span class=c2>" + this_21.lstTable1Data[z].START_INTERVAL + "</span></td>";
                                if (this_21.selectedDropDownUserId.indexOf("ALL") > -1) {
                                    var _loop_38 = function (xy) {
                                        var UserName = this_21.UserId[xy];
                                        //htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                        var dr = linq_es5_1.asEnumerable(this_21.lstTable1Data).Where(function (cnt) { return cnt.UserId == UserName && cnt.START_INTERVAL == _this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == _this.convertDateFormate(SelDate); }).ToArray();
                                        if (dr.length > 0) {
                                            htmlBuilder_2 += "<td align=right nowrap><span class=c2>" + dr[0].PACKAGE_COUNT + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder_2 += "<td align=right nowrap><span class=c2>" + "0" + "</span></td>";
                                        }
                                    };
                                    for (var xy = 0; xy <= this_21.UserId.length - 1; xy++) {
                                        _loop_38(xy);
                                    }
                                }
                                else {
                                    var _loop_39 = function (xy) {
                                        var UserName = this_21.selectedDropDownUserId[xy];
                                        //htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                        console.log(this_21.lstTable1Data);
                                        var dr = linq_es5_1.asEnumerable(this_21.lstTable1Data).Where(function (cnt) { return cnt.UserId == UserName && cnt.START_INTERVAL == _this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == _this.convertDateFormate(SelDate); }).ToArray();
                                        if (dr.length > 0) {
                                            htmlBuilder_2 += "<td align=right nowrap><span class=c2>" + dr[0].PACKAGE_COUNT + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder_2 += "<td align=right nowrap><span class=c2>" + "0" + "</span></td>";
                                        }
                                    };
                                    for (var xy = 0; xy <= this_21.selectedDropDownUserId.length - 1; xy++) {
                                        _loop_39(xy);
                                    }
                                }
                                if (z == 0) {
                                    if (reqType == "Mail") {
                                        htmlBuilder_2 += "<td  width='100%' align='left' valign='middle' rowspan=" + this_21.lstTable1Data.length + "><img width='800px;' src=" + imgEmpDayForRecvPath + "EmpProdRecv" + x.toString() + ".png /></td>";
                                    }
                                    else {
                                        htmlBuilder_2 += "<td  colspan='12' align='left' valign='middle' rowspan=" + this_21.lstTable1Data.length + "> <div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForRecvPath + "EmpProdRecv" + x.toString() + ".png /></div></td>";
                                    }
                                }
                                htmlBuilder_2 += "</tr>";
                            };
                            for (var z = 0; z <= this_21.lstTable1Data.length - 1; z++) {
                                _loop_37(z);
                            }
                            htmlBuilder_2 += "</table>";
                            htmlBuilder_2 += "</td></tr>";
                            x += 1;
                            chartDatee = new Date(chartDatee.setDate(chartDatee.getDate() + 1));
                        };
                        this_21 = this;
                        while (x <= datediff) {
                            _loop_30();
                        }
                        htmlBuilder_2 += "<br/><tr><td colspan=5 align=left><b><span class=c2>Dock Receiving By Employee -Summary </span></b></td><td align=right valign=top>&nbsp;";
                        htmlBuilder_2 += "</td></tr><tr height=20></tr></table></td></tr><br/><tr><td colspan=2> ";
                        htmlBuilder_2 += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                        htmlBuilder_2 += "<tr width='100%' bgcolor=#d3d3d3>";
                        htmlBuilder_2 += "<td align=center nowrap ><b><span class=c2></span></b></td>";
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            for (summ = 0; summ <= this.UserId.length - 1; summ++) {
                                UserName = this.UserId[summ];
                                htmlBuilder_2 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                            }
                        }
                        else {
                            for (summ = 0; summ <= this.selectedDropDownUserId.length - 1; summ++) {
                                UserName = this.selectedDropDownUserId[summ];
                                htmlBuilder_2 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                            }
                        }
                        htmlBuilder_2 += "<td align=left nowrap width='100%'></td>";
                        htmlBuilder_2 += "</tr>";
                        strPckgCnt = void 0;
                        _loop_31 = function (summcnt) {
                            htmlBuilder_2 += "<tr width='100%'>";
                            htmlBuilder_2 += "<td align=left nowrap><span class=c2>" + this_22.lstTable1Data[summcnt].START_INTERVAL + "</span></td>";
                            if (this_22.selectedDropDownUserId.indexOf("ALL") > -1) {
                                var _loop_40 = function (user) {
                                    var UserName = this_22.UserId[user];
                                    var pckgcnt = 0;
                                    var List_1 = [];
                                    List_1 = linq_es5_1.asEnumerable(this_22.lstTable1Data).Where(function (pck) { return pck.UserId == UserName && pck.START_INTERVAL == _this.lstTable1Data[summcnt].START_INTERVAL; }).ToArray();
                                    for (var summPckgcnt = 0; summPckgcnt <= List_1.length - 1; summPckgcnt++) {
                                        pckgcnt = List_1[summPckgcnt].PACKAGE_COUNT;
                                    }
                                    strPckgCnt = pckgcnt.toString();
                                    if (strPckgCnt == null || strPckgCnt === "") {
                                        strPckgCnt = "0";
                                    }
                                    htmlBuilder_2 += "<td align=right nowrap><span class=c2>" + strPckgCnt + "</span></td>";
                                };
                                for (var user = 0; user <= this_22.UserId.length - 1; user++) {
                                    _loop_40(user);
                                }
                            }
                            else {
                                var _loop_41 = function (user) {
                                    var UserName = this_22.selectedDropDownUserId[user];
                                    var pckgcnt = 0;
                                    var List_2 = [];
                                    List_2 = linq_es5_1.asEnumerable(this_22.lstTable1Data).Where(function (pck) { return pck.UserId == UserName && pck.START_INTERVAL == _this.lstTable1Data[summcnt].START_INTERVAL; }).ToArray();
                                    for (var summPckgcnt = 0; summPckgcnt <= List_2.length - 1; summPckgcnt++) {
                                        pckgcnt = List_2[summPckgcnt].PACKAGE_COUNT;
                                    }
                                    strPckgCnt = pckgcnt.toString();
                                    if (strPckgCnt == null || strPckgCnt === "") {
                                        strPckgCnt = "0";
                                    }
                                    htmlBuilder_2 += "<td align=right nowrap><span class=c2>" + strPckgCnt + "</span></td>";
                                };
                                for (var user = 0; user <= this_22.selectedDropDownUserId.length - 1; user++) {
                                    _loop_41(user);
                                }
                            }
                            if (summcnt == 0) {
                                if (reqType == "Mail") {
                                    htmlBuilder_2 += "<td  width='100%' align='left' valign='middle' rowspan=" + this_22.lstTable1Data.length + " ><img width='800px;' src=" + imgEmpDayForRecvPath + "EmpProdRecvSumm.png /></td>";
                                }
                                else {
                                    htmlBuilder_2 += "<td  colspan='12' align='left' valign='middle' rowspan=" + this_22.lstTable1Data.length + " ><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForRecvPath + "EmpProdRecvSumm.png /></div></td>";
                                }
                            }
                            htmlBuilder_2 += "</tr>";
                        };
                        this_22 = this;
                        for (summcnt = 0; summcnt <= this.lstTable1Data.length - 1; summcnt++) {
                            _loop_31(summcnt);
                        }
                        htmlBuilder_2 += "</table>";
                        htmlBuilder_2 += "</td></tr>";
                        htmlBuilder_2 += "</Table>";
                        return [4 /*yield*/, htmlBuilder_2];
                    case 24: return [2 /*return*/, _a.sent()];
                    case 25:
                        ex_8 = _a.sent();
                        htmlBuilder_2 = '';
                        return [2 /*return*/, htmlBuilder_2];
                    case 26: return [3 /*break*/, 58];
                    case 27:
                        if (!(this.activeTab === "Deliver by Employee")) return [3 /*break*/, 40];
                        chartImageDelv1 = document.getElementById("ChartIdForDelv1");
                        imageDelv1 = chartImageDelv1.toDataURL("image/png");
                        imageDelv1 = imageDelv1.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDelv1, "EmpProdDelv0").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 28:
                        _a.sent();
                        chartImageDelv2 = document.getElementById("ChartIdForDelv2");
                        imageDelv2 = chartImageDelv2.toDataURL("image/png");
                        imageDelv2 = imageDelv2.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDelv2, "EmpProdDelv1").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 29:
                        _a.sent();
                        chartImageDelv3 = document.getElementById("ChartIdForDelv3");
                        imageDelv3 = chartImageDelv3.toDataURL("image/png");
                        imageDelv3 = imageDelv3.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDelv3, "EmpProdDelv2").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 30:
                        _a.sent();
                        chartImageDelv4 = document.getElementById("ChartIdForDelv4");
                        imageDelv4 = chartImageDelv4.toDataURL("image/png");
                        imageDelv4 = imageDelv4.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDelv4, "EmpProdDelv3").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 31:
                        _a.sent();
                        chartImageDelv5 = document.getElementById("ChartIdForDelv5");
                        imageDelv5 = chartImageDelv5.toDataURL("image/png");
                        imageDelv5 = imageDelv5.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDelv5, "EmpProdDelv4").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 32:
                        _a.sent();
                        chartImageDelvSumm = document.getElementById("ChartIdForSummaryDeliver");
                        imageDelvSumm = chartImageDelvSumm.toDataURL("image/png");
                        imageDelvSumm = imageDelvSumm.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDelvSumm, "EmpProdDelvSumm").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 33:
                        _a.sent();
                        htmlBuilder_3 = '';
                        _a.label = 34;
                    case 34:
                        _a.trys.push([34, 38, , 39]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        imgEmpDayForDelvPath = '';
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
                                    htmlBuilder_3 = '';
                                    return htmlBuilder_3;
                                }
                            })];
                    case 35:
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
                                    htmlBuilder_3 = '';
                                    return htmlBuilder_3;
                                }
                            })];
                    case 36:
                        _a.sent();
                        phyname = void 0;
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgEmpDayForDelvPath = this.httpService.BaseUrl + '/Uploaded/';
                        Curdate = this.frmDate;
                        strTitle = "\"" + "AtparVersion2.4.4" + "\"";
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder_3 += "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == "Print") {
                            htmlBuilder_3 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder_3 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_3 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder_3 += "<tr><td colspan=5 align=left><span class=c2><b>Dock Performance Report From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder_3 += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType == "Mail") {
                                htmlBuilder_3 += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            }
                            else {
                                htmlBuilder_3 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            }
                            htmlBuilder_3 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_3 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder_3 += "<tr><td align=left><span class=c2><b>Dock Receive   By Employee From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder_3 += "</td></tr></table></td></tr><br/>";
                        dtfromdate = this.fromDate;
                        chartDatee = new Date(dtfromdate);
                        dttodate = this.toDate;
                        datediff = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                        x = 0;
                        pint = 0;
                        _loop_32 = function () {
                            pint += 1;
                            var SelDate = chartDatee.toString();
                            htmlBuilder_3 += "<br/><tr><td colspan=2 align=left><b><span class=c2> Deliver By Employee Day - " + this_23.convertDateFormate(SelDate) + "</span></b></td><td align=right valign=top>&nbsp;";
                            htmlBuilder_3 += "<tr><td colspan=2><table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                            htmlBuilder_3 += "<tr width='100%' bgcolor=#d3d3d3>";
                            htmlBuilder_3 += "<td align=center nowrap ><b><span class=c2></span></b></td>";
                            if (this_23.selectedDropDownUserId.indexOf("ALL") > -1) {
                                for (var i = 0; i <= this_23.UserId.length - 1; i++) {
                                    var UserName = this_23.UserId[i];
                                    htmlBuilder_3 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                }
                            }
                            else {
                                for (var i = 0; i <= this_23.selectedDropDownUserId.length - 1; i++) {
                                    var UserName = this_23.selectedDropDownUserId[i];
                                    htmlBuilder_3 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                }
                            }
                            htmlBuilder_3 += "<td align=Center nowrap width='100%'><b><span class=c2>Graph</span></b></td>";
                            htmlBuilder_3 += "</tr>";
                            var _loop_42 = function (z) {
                                htmlBuilder_3 += "<tr width='100%'>";
                                htmlBuilder_3 += "<td align=left nowrap><span class=c2>" + this_23.lstTable1Data[z].START_INTERVAL + "</span></td>";
                                if (this_23.selectedDropDownUserId.indexOf("ALL") > -1) {
                                    var _loop_43 = function (xy) {
                                        var UserName = this_23.UserId[xy];
                                        //htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                        var dr = linq_es5_1.asEnumerable(this_23.lstTable2Data).Where(function (cnt) { return cnt.UserId == UserName && cnt.START_INTERVAL == _this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == _this.convertDateFormate(SelDate); }).ToArray();
                                        if (dr.length > 0) {
                                            htmlBuilder_3 += "<td align=right nowrap><span class=c2>" + dr[0].PACKAGE_COUNT + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder_3 += "<td align=right nowrap><span class=c2>" + "0" + "</span></td>";
                                        }
                                    };
                                    for (var xy = 0; xy <= this_23.UserId.length - 1; xy++) {
                                        _loop_43(xy);
                                    }
                                }
                                else {
                                    var _loop_44 = function (xy) {
                                        var UserName = this_23.selectedDropDownUserId[xy];
                                        //htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                        var dr = linq_es5_1.asEnumerable(this_23.lstTable2Data).Where(function (cnt) { return cnt.UserId == UserName && cnt.START_INTERVAL == _this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == _this.convertDateFormate(SelDate); }).ToArray();
                                        if (dr.length > 0) {
                                            htmlBuilder_3 += "<td align=right nowrap><span class=c2>" + dr[0].PACKAGE_COUNT + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder_3 += "<td align=right nowrap><span class=c2>" + "0" + "</span></td>";
                                        }
                                    };
                                    for (var xy = 0; xy <= this_23.selectedDropDownUserId.length - 1; xy++) {
                                        _loop_44(xy);
                                    }
                                }
                                if (z == 0) {
                                    if (reqType == "Mail") {
                                        htmlBuilder_3 += "<td  width='100%' align='left' valign='middle' rowspan=" + this_23.lstTable2Data.length + "><img width='800px;' src=" + imgEmpDayForDelvPath + "EmpProdDelv" + x.toString() + ".png /></td>";
                                    }
                                    else {
                                        htmlBuilder_3 += "<td  colspan='12' align='left' valign='middle' rowspan=" + this_23.lstTable2Data.length + "><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForDelvPath + "EmpProdDelv" + x.toString() + ".png /></div></td>";
                                    }
                                }
                                htmlBuilder_3 += "</tr>";
                            };
                            for (var z = 0; z <= this_23.lstTable1Data.length - 1; z++) {
                                _loop_42(z);
                            }
                            htmlBuilder_3 += "</table>";
                            htmlBuilder_3 += "</td></tr>";
                            x += 1;
                            chartDatee = new Date(chartDatee.setDate(chartDatee.getDate() + 1));
                        };
                        this_23 = this;
                        while (x <= datediff) {
                            _loop_32();
                        }
                        htmlBuilder_3 += "<br/><tr><td colspan=5 align=left><b><span class=c2>Dock Deliver By Employee -Summary </span></b></td><td align=right valign=top>&nbsp;";
                        htmlBuilder_3 += "</td></tr><tr height=20></tr></table></td></tr><br/><tr><td colspan=2> ";
                        htmlBuilder_3 += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                        htmlBuilder_3 += "<tr width='100%' bgcolor=#d3d3d3>";
                        htmlBuilder_3 += "<td align=center nowrap ><b><span class=c2></span></b></td>";
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            for (summ = 0; summ <= this.UserId.length - 1; summ++) {
                                UserName = this.UserId[summ];
                                htmlBuilder_3 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                            }
                        }
                        else {
                            for (summ = 0; summ <= this.selectedDropDownUserId.length - 1; summ++) {
                                UserName = this.selectedDropDownUserId[summ];
                                htmlBuilder_3 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                            }
                        }
                        htmlBuilder_3 += "<td align=left nowrap width='100%'></td>";
                        htmlBuilder_3 += "</tr>";
                        strPckgCnt = void 0;
                        _loop_33 = function (summcnt) {
                            htmlBuilder_3 += "<tr width='100%'>";
                            htmlBuilder_3 += "<td align=left nowrap><span class=c2>" + this_24.lstTable2Data[summcnt].START_INTERVAL + "</span></td>";
                            if (this_24.selectedDropDownUserId.indexOf("ALL") > -1) {
                                var _loop_45 = function (user) {
                                    var UserName = this_24.UserId[user];
                                    var pckgcnt = 0;
                                    var List_3 = [];
                                    List_3 = linq_es5_1.asEnumerable(this_24.lstTable2Data).Where(function (pck) { return pck.UserId == UserName && pck.START_INTERVAL == _this.lstTable2Data[summcnt].START_INTERVAL; }).ToArray();
                                    for (var summPckgcnt = 0; summPckgcnt <= List_3.length - 1; summPckgcnt++) {
                                        pckgcnt = List_3[summPckgcnt].PACKAGE_COUNT;
                                    }
                                    strPckgCnt = pckgcnt.toString();
                                    if (strPckgCnt == null || strPckgCnt === "") {
                                        strPckgCnt = "0";
                                    }
                                    htmlBuilder_3 += "<td align=right nowrap><span class=c2>" + strPckgCnt + "</span></td>";
                                };
                                for (var user = 0; user <= this_24.UserId.length - 1; user++) {
                                    _loop_45(user);
                                }
                            }
                            else {
                                var _loop_46 = function (user) {
                                    var UserName = this_24.selectedDropDownUserId[user];
                                    var pckgcnt = 0;
                                    var List_4 = [];
                                    List_4 = linq_es5_1.asEnumerable(this_24.lstTable2Data).Where(function (pck) { return pck.UserId == UserName && pck.START_INTERVAL == _this.lstTable2Data[summcnt].START_INTERVAL; });
                                    for (var summPckgcnt = 0; summPckgcnt <= List_4.length - 1; summPckgcnt++) {
                                        pckgcnt = List_4[summPckgcnt].PACKAGE_COUNT;
                                    }
                                    strPckgCnt = pckgcnt.toString();
                                    if (strPckgCnt == null || strPckgCnt === "") {
                                        strPckgCnt = "0";
                                    }
                                    htmlBuilder_3 += "<td align=right nowrap><span class=c2>" + strPckgCnt + "</span></td>";
                                };
                                for (var user = 0; user <= this_24.selectedDropDownUserId.length - 1; user++) {
                                    _loop_46(user);
                                }
                            }
                            if (summcnt == 0) {
                                if (reqType == "Mail") {
                                    htmlBuilder_3 += "<td  width='100%' align='left' valign='middle' rowspan=" + this_24.lstTable2Data.length + " ><img width='800px;' src=" + imgEmpDayForDelvPath + "EmpProdDelvSumm.png /></td>";
                                }
                                else {
                                    htmlBuilder_3 += "<td colspan='12' align='left' valign='middle' rowspan=" + this_24.lstTable2Data.length + " ><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForDelvPath + "EmpProdDelvSumm.png /></div></td>";
                                }
                            }
                            htmlBuilder_3 += "</tr>";
                        };
                        this_24 = this;
                        for (summcnt = 0; summcnt <= this.lstTable2Data.length - 1; summcnt++) {
                            _loop_33(summcnt);
                        }
                        htmlBuilder_3 += "</table>";
                        htmlBuilder_3 += "</td></tr>";
                        htmlBuilder_3 += "</Table>";
                        return [4 /*yield*/, htmlBuilder_3];
                    case 37: return [2 /*return*/, _a.sent()];
                    case 38:
                        ex_9 = _a.sent();
                        htmlBuilder_3 = '';
                        return [2 /*return*/, htmlBuilder_3];
                    case 39: return [3 /*break*/, 58];
                    case 40:
                        if (!(this.activeTab === "Dock Performance")) return [3 /*break*/, 53];
                        chartImageDock1 = document.getElementById("ChartIdForDock1");
                        imageDock1 = chartImageDock1.toDataURL("image/png");
                        imageDock1 = imageDock1.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDock1, "EmpProdDock0").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 41:
                        _a.sent();
                        chartImageDock2 = document.getElementById("ChartIdForDock2");
                        imageDock2 = chartImageDock2.toDataURL("image/png");
                        imageDock2 = imageDock2.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDock2, "EmpProdDock1").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 42:
                        _a.sent();
                        chartImageDock3 = document.getElementById("ChartIdForDock3");
                        imageDock3 = chartImageDock3.toDataURL("image/png");
                        imageDock3 = imageDock3.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDock3, "EmpProdDock2").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 43:
                        _a.sent();
                        chartImageDock4 = document.getElementById("ChartIdForDock4");
                        imageDock4 = chartImageDock4.toDataURL("image/png");
                        imageDock4 = imageDock4.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDock4, "EmpProdDock3").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 44:
                        _a.sent();
                        chartImageDock5 = document.getElementById("ChartIdForDock5");
                        imageDock5 = chartImageDock5.toDataURL("image/png");
                        imageDock5 = imageDock5.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDock5, "EmpProdDock4").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 45:
                        _a.sent();
                        chartImageDockSumm = document.getElementById("ChartIdForSummaryDock");
                        imageDockSumm = chartImageDockSumm.toDataURL("image/png");
                        imageDockSumm = imageDockSumm.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(imageDockSumm, "EmpProdDockSumm").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
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
                    case 46:
                        _a.sent();
                        htmlBuilder_4 = '';
                        _a.label = 47;
                    case 47:
                        _a.trys.push([47, 51, , 52]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        imgEmpDayForDockPath = '';
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
                                    htmlBuilder_4 = '';
                                    return htmlBuilder_4;
                                }
                            })];
                    case 48:
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
                                    htmlBuilder_4 = '';
                                    return htmlBuilder_4;
                                }
                            })];
                    case 49:
                        _a.sent();
                        phyname = void 0;
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgEmpDayForDockPath = this.httpService.BaseUrl + '/Uploaded/';
                        Curdate = this.frmDate;
                        strTitle = "\"" + "AtparVersion2.4.4" + "\"";
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder_4 += "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == "Print") {
                            htmlBuilder_4 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder_4 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_4 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder_4 += "<tr><td colspan=5 align=left><span class=c2><b>Dock Performance Report From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder_4 += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType == "Mail") {
                                htmlBuilder_4 += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            }
                            else {
                                htmlBuilder_4 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            }
                            htmlBuilder_4 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_4 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder_4 += "<tr><td align=left><span class=c2><b>Dock Performance Report From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder_4 += "</td></tr></table></td></tr><br/>";
                        dtfromdate = this.fromDate;
                        chartDatee = new Date(dtfromdate);
                        dttodate = this.toDate;
                        datediff = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                        x = 0;
                        pint = 0;
                        _loop_34 = function () {
                            pint += 1;
                            var SelDate = chartDatee.toString();
                            htmlBuilder_4 += "<br/><tr><td colspan=2 align=left><b><span class=c2> Dock Performance By Employee Day - " + this_25.convertDateFormate(SelDate) + "</span></b></td><td align=right valign=top>&nbsp;";
                            htmlBuilder_4 += "<tr><td colspan=2><table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                            htmlBuilder_4 += "<tr width='100%' bgcolor=#d3d3d3>";
                            htmlBuilder_4 += "<td align=center nowrap ><b><span class=c2></span></b></td>";
                            if (this_25.selectedDropDownUserId.indexOf("ALL") > -1) {
                                for (var i = 0; i <= this_25.UserId.length - 1; i++) {
                                    var UserName = this_25.UserId[i];
                                    htmlBuilder_4 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                }
                            }
                            else {
                                for (var i = 0; i <= this_25.selectedDropDownUserId.length - 1; i++) {
                                    var UserName = this_25.selectedDropDownUserId[i];
                                    htmlBuilder_4 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                }
                            }
                            htmlBuilder_4 += "<td align=Center nowrap width='100%'><b><span class=c2>Graph</span></b></td>";
                            htmlBuilder_4 += "</tr>";
                            var _loop_47 = function (z) {
                                htmlBuilder_4 += "<tr width='100%'>";
                                htmlBuilder_4 += "<td align=left nowrap><span class=c2>" + this_25.lstTable1Data[z].START_INTERVAL + "</span></td>";
                                if (this_25.selectedDropDownUserId.indexOf("ALL") > -1) {
                                    var _loop_48 = function (xy) {
                                        var UserName = this_25.UserId[xy];
                                        //htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                        var dr = linq_es5_1.asEnumerable(this_25.lstTable1Data).Where(function (cnt) { return cnt.UserId == UserName && cnt.START_INTERVAL == _this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == _this.convertDateFormate(SelDate); }).ToArray();
                                        var dr1 = linq_es5_1.asEnumerable(this_25.lstTable2Data).Where(function (cnt) { return cnt.UserId == UserName && cnt.START_INTERVAL == _this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == _this.convertDateFormate(SelDate); }).ToArray();
                                        var sumDock = 0;
                                        if (dr.length > 0) {
                                            sumDock += dr[0].PACKAGE_COUNT;
                                        }
                                        if (dr1.length > 0) {
                                            sumDock += dr1[0].PACKAGE_COUNT;
                                        }
                                        htmlBuilder_4 += "<td align=right nowrap><span class=c2>" + sumDock.toString() + "</span></td>";
                                    };
                                    for (var xy = 0; xy <= this_25.UserId.length - 1; xy++) {
                                        _loop_48(xy);
                                    }
                                }
                                else {
                                    var _loop_49 = function (xy) {
                                        var UserName = this_25.selectedDropDownUserId[xy];
                                        //htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                        var dr = linq_es5_1.asEnumerable(this_25.lstTable1Data).Where(function (cnt) { return cnt.UserId == UserName && cnt.START_INTERVAL == _this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == _this.convertDateFormate(SelDate); }).ToArray();
                                        var dr1 = linq_es5_1.asEnumerable(this_25.lstTable2Data).Where(function (cnt) { return cnt.UserId == UserName && cnt.START_INTERVAL == _this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == _this.convertDateFormate(SelDate); }).ToArray();
                                        var sumDock = 0;
                                        if (dr.length > 0) {
                                            sumDock += dr[0].PACKAGE_COUNT;
                                        }
                                        if (dr1.length > 0) {
                                            sumDock += dr1[0].PACKAGE_COUNT;
                                        }
                                        htmlBuilder_4 += "<td align=right nowrap><span class=c2>" + sumDock.toString() + "</span></td>";
                                    };
                                    for (var xy = 0; xy <= this_25.selectedDropDownUserId.length - 1; xy++) {
                                        _loop_49(xy);
                                    }
                                }
                                if (z == 0) {
                                    if (reqType == "Mail") {
                                        htmlBuilder_4 += "<td  width='100%'  align='left' valign='middle' rowspan=" + this_25.lstTable2Data.length + "><img width='800px;' src=" + imgEmpDayForDockPath + "EmpProdDock" + x.toString() + ".png /></td>";
                                    }
                                    else {
                                        htmlBuilder_4 += "<td colspan='12'  align='left' valign='middle' rowspan=" + this_25.lstTable2Data.length + " ><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForDockPath + "EmpProdDock" + x.toString() + ".png /></div></td>";
                                    }
                                }
                                htmlBuilder_4 += "</tr>";
                            };
                            for (var z = 0; z <= this_25.lstTable1Data.length - 1; z++) {
                                _loop_47(z);
                            }
                            htmlBuilder_4 += "</table>";
                            htmlBuilder_4 += "</td></tr>";
                            x += 1;
                            chartDatee = new Date(chartDatee.setDate(chartDatee.getDate() + 1));
                        };
                        this_25 = this;
                        while (x <= datediff) {
                            _loop_34();
                        }
                        htmlBuilder_4 += "<br/><tr><td colspan=5 align=left><b><span class=c2>Dock Performance By Employee -Summary </span></b></td><td align=right valign=top>&nbsp;";
                        htmlBuilder_4 += "</td></tr><tr height=20></tr></table></td></tr><br/><tr><td colspan=2> ";
                        htmlBuilder_4 += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                        htmlBuilder_4 += "<tr width='100%' bgcolor=#d3d3d3>";
                        htmlBuilder_4 += "<td align=center nowrap ><b><span class=c2></span></b></td>";
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            for (summ = 0; summ <= this.UserId.length - 1; summ++) {
                                UserName = this.UserId[summ];
                                htmlBuilder_4 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                            }
                        }
                        else {
                            for (summ = 0; summ <= this.selectedDropDownUserId.length - 1; summ++) {
                                UserName = this.selectedDropDownUserId[summ];
                                htmlBuilder_4 += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                            }
                        }
                        htmlBuilder_4 += "<td align=left nowrap width='100%'></td>";
                        htmlBuilder_4 += "</tr>";
                        strPckgCnt = void 0;
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            _loop_35 = function (summcnt) {
                                htmlBuilder_4 += "<tr width='100%'>";
                                htmlBuilder_4 += "<td align=left nowrap><span class=c2>" + this_26.lstTable1Data[summcnt].START_INTERVAL + "</span></td>";
                                var _loop_50 = function (user) {
                                    var UserName = this_26.UserId[user];
                                    var pckgcnt = 0;
                                    var pckgcnt1 = 0;
                                    var List_5 = [];
                                    var List1 = [];
                                    List_5 = linq_es5_1.asEnumerable(this_26.lstTable1Data).Where(function (pck) { return pck.UserId == UserName && pck.START_INTERVAL == _this.lstTable1Data[summcnt].START_INTERVAL; }).ToArray();
                                    List1 = linq_es5_1.asEnumerable(this_26.lstTable2Data).Where(function (pck) { return pck.UserId == UserName && pck.START_INTERVAL == _this.lstTable2Data[summcnt].START_INTERVAL; }).ToArray();
                                    for (var summPckgcnt = 0; summPckgcnt <= List_5.length - 1; summPckgcnt++) {
                                        pckgcnt = List_5[summPckgcnt].PACKAGE_COUNT;
                                    }
                                    for (var summPckgcnt1 = 0; summPckgcnt1 <= List1.length - 1; summPckgcnt1++) {
                                        pckgcnt1 = List1[summPckgcnt1].PACKAGE_COUNT;
                                    }
                                    if (pckgcnt.toString() == null || pckgcnt.toString() === "") {
                                        pckgcnt = 0;
                                    }
                                    if (pckgcnt1.toString() == null || pckgcnt1.toString() === "") {
                                        pckgcnt1 = 0;
                                    }
                                    var totalValue = pckgcnt + pckgcnt1;
                                    strPckgCnt = totalValue.toString();
                                    if (strPckgCnt == null || strPckgCnt === "") {
                                        strPckgCnt = "0";
                                    }
                                    htmlBuilder_4 += "<td align=right nowrap><span class=c2>" + strPckgCnt + "</span></td>";
                                };
                                for (var user = 0; user <= this_26.UserId.length - 1; user++) {
                                    _loop_50(user);
                                }
                                if (summcnt == 0) {
                                    if (reqType == "Mail") {
                                        htmlBuilder_4 += "<td  width='100%' align='left' valign='middle' rowspan=" + this_26.lstTable2Data.length + " ><img width='800px;' src=" + imgEmpDayForDockPath + "EmpProdDockSumm.png /></td>";
                                    }
                                    else {
                                        htmlBuilder_4 += "<td  colspan='12' align='left' valign='middle' rowspan=" + this_26.lstTable2Data.length + " ><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForDockPath + "EmpProdDockSumm.png /></div></td>";
                                    }
                                }
                                htmlBuilder_4 += "</tr>";
                            };
                            this_26 = this;
                            for (summcnt = 0; summcnt <= this.lstTable1Data.length - 1; summcnt++) {
                                _loop_35(summcnt);
                            }
                        }
                        else {
                            _loop_36 = function (summcnt) {
                                htmlBuilder_4 += "<tr width='100%'>";
                                htmlBuilder_4 += "<td align=left nowrap><span class=c2>" + this_27.lstTable1Data[summcnt].START_INTERVAL + "</span></td>";
                                var _loop_51 = function (user) {
                                    var UserName = this_27.selectedDropDownUserId[user];
                                    var pckgcnt = 0;
                                    var pckgcnt1 = 0;
                                    var List_6 = [];
                                    var List1 = [];
                                    List_6 = linq_es5_1.asEnumerable(this_27.lstTable1Data).Where(function (pck) { return pck.UserId == UserName && pck.START_INTERVAL == _this.lstTable1Data[summcnt].START_INTERVAL; }).ToArray();
                                    List1 = linq_es5_1.asEnumerable(this_27.lstTable2Data).Where(function (pck) { return pck.UserId == UserName && pck.START_INTERVAL == _this.lstTable2Data[summcnt].START_INTERVAL; }).ToArray();
                                    for (var summPckgcnt = 0; summPckgcnt <= List_6.length - 1; summPckgcnt++) {
                                        pckgcnt = List_6[summPckgcnt].PACKAGE_COUNT;
                                    }
                                    for (var summPckgcnt1 = 0; summPckgcnt1 <= List1.length - 1; summPckgcnt1++) {
                                        pckgcnt1 = List1[summPckgcnt1].PACKAGE_COUNT;
                                    }
                                    if (pckgcnt.toString() == null || pckgcnt.toString() === "") {
                                        pckgcnt = 0;
                                    }
                                    if (pckgcnt1.toString() == null || pckgcnt1.toString() === "") {
                                        pckgcnt1 = 0;
                                    }
                                    var totalValue = pckgcnt + pckgcnt1;
                                    strPckgCnt = totalValue.toString();
                                    if (strPckgCnt == null || strPckgCnt === "") {
                                        strPckgCnt = "0";
                                    }
                                    htmlBuilder_4 += "<td align=right nowrap><span class=c2>" + strPckgCnt + "</span></td>";
                                };
                                for (var user = 0; user <= this_27.selectedDropDownUserId.length - 1; user++) {
                                    _loop_51(user);
                                }
                                if (summcnt == 0) {
                                    if (reqType == "Mail") {
                                        htmlBuilder_4 += "<td  width='100%' align='left' valign='middle' rowspan=" + this_27.lstTable2Data.length + " ><img width='800px;' src=" + imgEmpDayForDockPath + "EmpProdDockSumm.png /></td>";
                                    }
                                    else {
                                        htmlBuilder_4 += "<td  colspan='12' align='left' valign='middle' rowspan=" + this_27.lstTable2Data.length + " ><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForDockPath + "EmpProdDockSumm.png /></div></td>";
                                    }
                                }
                                htmlBuilder_4 += "</tr>";
                            };
                            this_27 = this;
                            for (summcnt = 0; summcnt <= this.lstTable1Data.length - 1; summcnt++) {
                                _loop_36(summcnt);
                            }
                        }
                        htmlBuilder_4 += "</table>";
                        htmlBuilder_4 += "</td></tr>";
                        htmlBuilder_4 += "</Table>";
                        return [4 /*yield*/, htmlBuilder_4];
                    case 50: return [2 /*return*/, _a.sent()];
                    case 51:
                        ex_10 = _a.sent();
                        htmlBuilder_4 = '';
                        return [2 /*return*/, htmlBuilder_4];
                    case 52: return [3 /*break*/, 58];
                    case 53:
                        htmlBuilder_5 = '';
                        _a.label = 54;
                    case 54:
                        _a.trys.push([54, 57, , 58]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        imgEmpDayForDockPath = '';
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
                                    htmlBuilder_5 = '';
                                    return htmlBuilder_5;
                                }
                            })];
                    case 55:
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
                                    htmlBuilder_5 = '';
                                    return htmlBuilder_5;
                                }
                            })];
                    case 56:
                        _a.sent();
                        phyname = void 0;
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        Curdate = this.frmDate;
                        strTitle = "\"" + "AtparVersion2.4.4" + "\"";
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder_5 += "<Table align= left width= 100 % cellpadding=0 cellspacing = 0 vAlign= top>";
                        if (reqType === "Print") {
                            htmlBuilder_5 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder_5 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_5 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder_5 += "<tr><td colspan=5 align=left><b><span class=c2>Deliver cycle time report from  " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + " </span></b></td><td align=right valign=top>&nbsp;";
                            htmlBuilder_5 += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType === "Mail") {
                                htmlBuilder_5 += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            }
                            else {
                                htmlBuilder_5 += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            }
                            htmlBuilder_5 += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder_5 += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0></tr>";
                            htmlBuilder_5 += "<tr><td colspan=5 align=left><b><span class=c2>Employee Productivity by Day From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder_5 += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> ";
                        htmlBuilder_5 += "<table align=left width=40% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                        htmlBuilder_5 += "<tr bgcolor=#d3d3d3>";
                        htmlBuilder_5 += "<td align=center nowrap><b><span class=c2>Less than (hours)</span></b></td>";
                        htmlBuilder_5 += "<td align=center nowrap><b><span class=c2>Count</span></b></td>";
                        htmlBuilder_5 += "<td align=center nowrap><b><span class=c2>%</span></b></td>";
                        htmlBuilder_5 += "</tr>";
                        for (i = 0; i <= this.lstCycleHourDetails.length - 1; i++) {
                            htmlBuilder_5 += "<tr>";
                            htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.lstCycleHourDetails[i].HOURSSUMMARY + "</span></td>";
                            htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.lstCycleHourDetails[i].COUNTSUMMARY + "</span></td>";
                            htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.lstCycleHourDetails[i].COUNT_PERCENTSUMMARY + "</span></td>";
                            htmlBuilder_5 += "</tr>";
                        }
                        htmlBuilder_5 += "</table></td></tr><tr><td colspan=2>";
                        htmlBuilder_5 += "<table align=left width=40% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
                        htmlBuilder_5 += "<tr bgcolor=#d3d3d3>";
                        htmlBuilder_5 += "<td align=center nowrap colspan=2><b><span class=c2>Results</span></b></td>";
                        htmlBuilder_5 += "</tr>";
                        htmlBuilder_5 += "<tr>";
                        htmlBuilder_5 += "<td align=center nowrap><span class=c2>COUNT</span></td>";
                        htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.Results[0].Count + "</span></td>";
                        htmlBuilder_5 += "</tr>";
                        htmlBuilder_5 += "<tr>";
                        htmlBuilder_5 += "<td align=center nowrap><span class=c2>AVG</span></td>";
                        htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.Results[0].AVG + "</span></td>";
                        htmlBuilder_5 += "</tr>";
                        htmlBuilder_5 += "<tr>";
                        htmlBuilder_5 += "<td align=center nowrap><span class=c2>ST.DEV</span></td>";
                        htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.Results[0].StDev + "</span></td>";
                        htmlBuilder_5 += "</tr>";
                        htmlBuilder_5 += "<tr>";
                        htmlBuilder_5 += "<td align=center nowrap><span class=c2>MAX</span></td>";
                        htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.Results[0].Max + "</span></td>";
                        htmlBuilder_5 += "</tr>";
                        htmlBuilder_5 += "<tr>";
                        htmlBuilder_5 += "<td align=center nowrap><span class=c2>MIN</span></td>";
                        htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.Results[0].Min + "</span></td>";
                        htmlBuilder_5 += "</tr>";
                        htmlBuilder_5 += "</table></td></tr><tr><td colspan=2>";
                        htmlBuilder_5 += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
                        htmlBuilder_5 += "<tr bgcolor=#d3d3d3>";
                        htmlBuilder_5 += "<td align=center nowrap ><b><span class=c2>Tracking #</span></b></td>";
                        htmlBuilder_5 += "<td align=center nowrap ><b><span class=c2>Delivery Person</span></b></td>";
                        htmlBuilder_5 += "<td align=center nowrap ><b><span class=c2>Cycle Time</span></b></td>";
                        htmlBuilder_5 += "<td align=center nowrap ><b><span class=c2>Hours</span></b></td>";
                        htmlBuilder_5 += "<td align=center nowrap ><b><span class=c2>Minutes</span></b></td>";
                        htmlBuilder_5 += "<td align=center nowrap ><b><span class=c2>Seconds</span></b></td>";
                        htmlBuilder_5 += "<td align=center nowrap><b><span class=c2>Total Hours</span></b></td>";
                        htmlBuilder_5 += "</tr>";
                        for (j = 0; j <= this.lstFinalCycleData.length - 1; j++) {
                            htmlBuilder_5 += "<tr>";
                            if (reqType === "Print") {
                                if (this.lstFinalCycleData[j].TRACKING_NBR == null || this.lstFinalCycleData[j].TRACKING_NBR === "") {
                                    this.lstFinalCycleData[j].TRACKING_NBR = "";
                                }
                                htmlBuilder_5 += "<td align=left nowrap><span class=c2>" + this.lstFinalCycleData[j].TRACKING_NBR + "</span></td>";
                            }
                            else {
                                if (this.lstFinalCycleData[j].TRACKING_NBR == null || this.lstFinalCycleData[j].TRACKING_NBR === "") {
                                    this.lstFinalCycleData[j].TRACKING_NBR = "";
                                }
                                htmlBuilder_5 += "<td align=left nowrap><span class=c2>" + this.lstFinalCycleData[j].TRACKING_NBR + "</span></td>";
                            }
                            htmlBuilder_5 += "<td align=left nowrap><span class=c2>" + this.lstFinalCycleData[j].DELIVER_FROM + "</span></td>";
                            htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.lstFinalCycleData[j].CYCLE_TIME + "</span></td>";
                            htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.lstFinalCycleData[j].HOURS + "</span></td>";
                            htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.lstFinalCycleData[j].MINS + "</span></td>";
                            htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.lstFinalCycleData[j].SECONDS + "</span></td>";
                            htmlBuilder_5 += "<td align=right nowrap><span class=c2>" + this.lstFinalCycleData[j].TOT_HOURS + "</span></td>";
                            htmlBuilder_5 += "</tr>";
                        }
                        htmlBuilder_5 += "</table>";
                        htmlBuilder_5 += "</td></tr>";
                        htmlBuilder_5 += "</Table>";
                        return [2 /*return*/, htmlBuilder_5];
                    case 57:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "");
                        return [3 /*break*/, 58];
                    case 58: return [2 /*return*/];
                }
            });
        });
    };
    ProductivityReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    ProductivityReportComponent.prototype.selectedTab = function (option) {
        debugger;
    };
    ProductivityReportComponent.prototype.enableSelectedTab = function (option) {
        this.tabSelection = option;
        if (option != null) {
            this.activeTab = option.title;
        }
    };
    ProductivityReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    ProductivityReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    return ProductivityReportComponent;
}());
ProductivityReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1975),
        providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, deliver_productivity_report_component_service_1.DeliverProductivityService]
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        AtParConstants_1.AtParConstants,
        deliver_productivity_report_component_service_1.DeliverProductivityService,
        router_1.ActivatedRoute])
], ProductivityReportComponent);
exports.ProductivityReportComponent = ProductivityReportComponent;


/***/ }),

/***/ 1460:
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
var AtParEnums_1 = __webpack_require__(14);
var deliver_release_packages_service_component_1 = __webpack_require__(1724);
var event_spinner_service_1 = __webpack_require__(24);
var AtParConstants_1 = __webpack_require__(31);
var HttpService_1 = __webpack_require__(12);
var http_1 = __webpack_require__(38);
var AtParEnums_2 = __webpack_require__(14);
var AtParSharedDataService_1 = __webpack_require__(167);
var router_1 = __webpack_require__(29);
var AtParEnums_3 = __webpack_require__(14);
var AtParEnums_4 = __webpack_require__(14);
var api_1 = __webpack_require__(72);
var ReleasePackagesComponent = (function () {
    function ReleasePackagesComponent(httpService, _http, dataservice, commonService, releasePackagesService, spinnerService, atParConstant, router, route, atParSharedDataService, confirmationService) {
        this.httpService = httpService;
        this._http = _http;
        this.dataservice = dataservice;
        this.commonService = commonService;
        this.releasePackagesService = releasePackagesService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.router = router;
        this.route = route;
        this.atParSharedDataService = atParSharedDataService;
        this.confirmationService = confirmationService;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.selectedBunit = "";
        this.orgGrpId = "";
        this.blnShowOrgGroupDD = false;
        this.lstOrgGroups = [];
        this.lstFilteredBUnits = [];
        this.showGrid = false;
        this.selectedParLocation = "";
        this.transactionIdlist = "";
        this.UserIdlist = "";
        this.selectedFlag = false;
    }
    ReleasePackagesComponent.prototype.ngOnInit = function () {
        try {
            this.spinnerService.start();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
            this.appId = AtParEnums_3.EnumApps.Deliver;
            this.bindOrgGroups();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    };
    ReleasePackagesComponent.prototype.bindOrgGroups = function () {
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
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
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
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
    ReleasePackagesComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
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
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_4.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.lstFilteredBUnits = [];
                                _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstFilteredBUnits.push({
                                                label: data.DataList[i].toString(),
                                                value: data.DataList[i].toString()
                                            });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "populateBusinessUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReleasePackagesComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.showGrid = false;
                this.growlMessage = [];
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
    ReleasePackagesComponent.prototype.ddlBUnitChanged = function () {
        this.growlMessage = [];
        this.showGrid = false;
    };
    ReleasePackagesComponent.prototype.go_Click = function () {
        try {
            this.showGrid = false;
            if (this.blnShowOrgGroupLabel == true) {
                this.selectedOrgGroupId = this.orgGrpId.split("-")[0].trim();
                this.BindDataGrid();
            }
            else if (this.blnShowOrgGroupDD) {
                if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
                }
                else {
                    this.BindDataGrid();
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "go_Click");
        }
    };
    ReleasePackagesComponent.prototype.BindDataGrid = function () {
        try {
            if (this.selectedBunit === "") {
                this.selectedBunit = "All";
            }
            this.GetPackageDetails("", "", "");
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    };
    ReleasePackagesComponent.prototype.GetPackageDetails = function (Lflag, pTransId, pUserId) {
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
                        return [4 /*yield*/, this.releasePackagesService.GetReleasePackages(this.appId, pUserId, this.selectedOrgGroupId, this.selectedBunit, this.selectedParLocation, Lflag, pTransId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.showGrid = true;
                                        _this.lstDBData = data.DataList;
                                        for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                            var changeDate = _this.lstDBData[i].DOWNLOAD_DT_TIME;
                                            var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                            var date = new Date(dateStr);
                                            _this.lstDBData[i].DOWNLOAD_DT_TIME = date.toLocaleString();
                                            _this.lstDBData[i].DOWNLOAD_DT_TIME = _this.lstDBData[i].DOWNLOAD_DT_TIME.replace(',', ' ');
                                            if (_this.lstDBData[i].CURRENT_EVENT == AtParEnums_4.AppTransactionStatus.Downloaded.toString()) {
                                                _this.lstDBData[i].CURRENT_EVENT = "DownLoad";
                                            }
                                            else if (_this.lstDBData[i].CURRENT_EVENT == AtParEnums_4.AppTransactionStatus.statLoad.toString()) {
                                                _this.lstDBData[i].CURRENT_EVENT = "Load";
                                            }
                                            else if (_this.lstDBData[i].CURRENT_EVENT == AtParEnums_4.AppTransactionStatus.statPickup.toString()) {
                                                _this.lstDBData[i].CURRENT_EVENT = "Pickup";
                                            }
                                            else if (_this.lstDBData[i].CURRENT_EVENT == AtParEnums_4.AppTransactionStatus.statUnload.toString()) {
                                                _this.lstDBData[i].CURRENT_EVENT = "Unload";
                                            }
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "GetPackageDetails");
                        this.showGrid = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReleasePackagesComponent.prototype.unlockRow = function (event, data) {
        try {
            this.growlMessage = [];
            if (event == true) {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].TRANSACTION_ID == data.TRANSACTION_ID) {
                        this.lstDBData[i].Status = true;
                        this.lstDBData[i].CHK_VALUE = "1";
                    }
                }
            }
            else {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].TRANSACTION_ID == data.TRANSACTION_ID) {
                        this.lstDBData[i].Status = false;
                        this.lstDBData[i].CHK_VALUE = "0";
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unlockRow");
        }
    };
    ReleasePackagesComponent.prototype.UnlockSelectedRecords = function () {
        var _this = this;
        try {
            this.transactionIdlist = '';
            this.UserIdlist = '';
            for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].CHK_VALUE === "1") {
                    this.transactionIdlist = this.transactionIdlist.concat(this.lstDBData[i].TRANSACTION_ID + ",");
                    this.UserIdlist = this.UserIdlist.concat(this.lstDBData[i].UID + ",");
                }
            }
            if (this.transactionIdlist != '' || this.transactionIdlist != undefined) {
                this.transactionIdlist = this.transactionIdlist.replace(/,\s*$/, ""); //this removes last unwanted comma
            }
            if (this.UserIdlist != '' || this.UserIdlist != undefined) {
                this.UserIdlist = this.UserIdlist.replace(/,\s*$/, ""); //this removes last unwanted comma
            }
            if (this.transactionIdlist === "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Order(s) to unlock" });
                return;
            }
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: "Are you sure you want to unlock the Order(s) ?",
                accept: function () {
                    _this.GetPackageDetails('Y', _this.transactionIdlist, _this.UserIdlist);
                },
                reject: function () {
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "UnlockSelectedRecords");
        }
    };
    ReleasePackagesComponent.prototype.checkAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].Status = true;
                    this.lstgridfilterData[i].CHK_VALUE = "1";
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].Status = true;
                    this.lstDBData[i].CHK_VALUE = "1";
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    ReleasePackagesComponent.prototype.uncheckAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].Status = false;
                    this.lstgridfilterData[i].CHK_VALUE = '0';
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].Status = false;
                    this.lstDBData[i].CHK_VALUE = '0';
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "uncheckAll");
        }
    };
    /**
     * removing values in string  contains comma separated values
     * @param list
     * @param value
     * @param separator
     */
    ReleasePackagesComponent.prototype.removeTransactionId = function (list, value, separator) {
        try {
            separator = separator || ",";
            var values = list.split(separator);
            for (var i = 0; i < values.length; i++) {
                if (values[i] == value) {
                    values.splice(i, 1);
                    return values.join(separator);
                }
            }
            return list;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "removeTransactionId");
        }
    };
    ReleasePackagesComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    return ReleasePackagesComponent;
}());
ReleasePackagesComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1976),
        providers: [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, deliver_release_packages_service_component_1.ReleasePackagesServiceComponent, AtParConstants_1.AtParConstants, AtParSharedDataService_1.AtParSharedDataService, api_1.ConfirmationService],
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http, datatableservice_1.datatableservice,
        atpar_common_service_1.AtParCommonService,
        deliver_release_packages_service_component_1.ReleasePackagesServiceComponent,
        event_spinner_service_1.SpinnerService,
        AtParConstants_1.AtParConstants,
        router_1.Router,
        router_1.ActivatedRoute,
        AtParSharedDataService_1.AtParSharedDataService,
        api_1.ConfirmationService])
], ReleasePackagesComponent);
exports.ReleasePackagesComponent = ReleasePackagesComponent;


/***/ }),

/***/ 1461:
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
var AtParConstants_1 = __webpack_require__(31);
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var mt_delv_loc_details_1 = __webpack_require__(1880);
var deliver_setup_dropoff_location_services_1 = __webpack_require__(1726);
var AtParStatusCodes_1 = __webpack_require__(50);
var AtParEnums_1 = __webpack_require__(14);
var routepath_1 = __webpack_require__(70);
var datatable_1 = __webpack_require__(71);
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
    return SetupDropOffLoactionsComponent;
}());
__decorate([
    core_1.ViewChild(datatable_1.DataTable),
    __metadata("design:type", datatable_1.DataTable)
], SetupDropOffLoactionsComponent.prototype, "dataTableComponent", void 0);
SetupDropOffLoactionsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1977),
        providers: [atpar_common_service_1.AtParCommonService, HttpService_1.HttpService, AtParConstants_1.AtParConstants, deliver_setup_dropoff_location_services_1.DeliverySetupDropOffServices]
    }),
    __metadata("design:paramtypes", [deliver_setup_dropoff_location_services_1.DeliverySetupDropOffServices,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        HttpService_1.HttpService,
        AtParConstants_1.AtParConstants])
], SetupDropOffLoactionsComponent);
exports.SetupDropOffLoactionsComponent = SetupDropOffLoactionsComponent;


/***/ }),

/***/ 1462:
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
var deliver_shiptoid_allocation_for_delivery_of_stock_items_services_1 = __webpack_require__(1727);
var AtParStatusCodes_1 = __webpack_require__(50);
var HttpService_1 = __webpack_require__(12);
var AtParConstants_1 = __webpack_require__(31);
var AtParEnums_1 = __webpack_require__(14);
var event_spinner_service_1 = __webpack_require__(24);
var api_1 = __webpack_require__(72);
var datatable_1 = __webpack_require__(71);
var atpar_common_service_1 = __webpack_require__(43);
var ShipToIdAllocationForDeliveryOfStockItemsComponent = (function () {
    /**
     * Constructor
     * @param ShipToIdAllocationForDeliveryOfStockItemsServices
     * @param AtParCommonService
     * @param httpService
     * @param spinnerService
     */
    function ShipToIdAllocationForDeliveryOfStockItemsComponent(httpService, commonService, shipToIdAllocationForDeliveryOfStockItemsServices, spinnerService, atParConstant) {
        this.httpService = httpService;
        this.commonService = commonService;
        this.shipToIdAllocationForDeliveryOfStockItemsServices = shipToIdAllocationForDeliveryOfStockItemsServices;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        /*Varaible Declaration*/
        this.strOrgGrpId = "";
        this.strlblOrgGrpId = "";
        this.strAllOrgId = "";
        this.statusMesssage = "";
        this.strOrgGroupName = "";
        this.orgGrpIdData = "";
        this.selectedOrgGrpId = "";
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupsDropdown = false;
        this.isVisible = false;
        this.checked = false;
        this.blnSortByColumn = true;
        this.lstOrgGroups = [];
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.dataCheckedSorting = [];
        this.dataUnCheckedSorting = [];
        this.lstDBData = [];
        this.lstCheckedShiftToIds = [];
    }
    /**
    * Init Function for binding OrgGroupIds to the dropdown when page loading
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.strlblOrgGrpId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.lstCheckedShiftToIds = new Array();
                        this.dataCheckedSorting = new Array();
                        this.dataUnCheckedSorting = new Array();
                        return [4 /*yield*/, this.bindUserOrgGroups()];
                    case 1:
                        _a.sent();
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
    /**
    * Getting data from database and bind records to data table
    * Using Ternary Operator instead of if/else condition
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.bindUserOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, 6, 7]);
                        this.spinnerService.start();
                        if (!(this.strlblOrgGrpId == "All")) return [3 /*break*/, 2];
                        this.blnShowOrgGroupLabel = false;
                        this.blnShowOrgGroupsDropdown = true;
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.strlblOrgGrpId).catch(this.httpService.handleError).then(function (response) {
                                var data = response.json();
                                _this.spinnerService.stop();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstOrgGroups = [];
                                        _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                        for (var i = 0; i <= data.DataList.length - 1; i++) {
                                            if (data.DataList[i].ORG_GROUP_ID !== "All") {
                                                _this.strAllOrgId = data.DataList[i].ORG_GROUP_ID + " - " + data.DataList[i].ORG_GROUP_NAME;
                                                _this.lstOrgGroups.push({ label: _this.strAllOrgId, value: data.DataList[i].ORG_GROUP_ID });
                                            }
                                        }
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
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        this.blnShowOrgGroupsDropdown = false;
                        return [4 /*yield*/, this.commonService.getOrgGrpIDs(this.strlblOrgGrpId, this.strOrgGroupName, this.deviceTokenEntry)
                                .catch(this.httpService.handleError).then(function (response) {
                                var data = response.json();
                                _this.spinnerService.stop();
                                _this.statusCode = data.StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.blnShowOrgGroupLabel = true;
                                        _this.orgGrpIdData = data.DataList[0].ORG_GROUP_ID + " - " + data.DataList[0].ORG_GROUP_NAME;
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
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "bindUserOrgGroups");
                        return [3 /*break*/, 7];
                    case 6:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when click on Go button
    * Using Ternary Operator instead of if/else & if/else(if) conditions
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.btnGoClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isVisible == true) {
                            this.dataTableComponent.reset();
                        }
                        if (this.blnShowOrgGroupsDropdown == true) {
                            if (this.selectedOrgGrpId == "Select One" || this.selectedOrgGrpId == "") {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
                                return [2 /*return*/];
                            }
                        }
                        this.strOrgGrpId = (this.blnShowOrgGroupsDropdown == false) ? this.strlblOrgGrpId : this.selectedOrgGrpId;
                        this.isVisible = false;
                        this.growlMessage = [];
                        this.lstDBData = new Array();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.shipToIdAllocationForDeliveryOfStockItemsServices.getOrgGrpShiptoIDs(this.strOrgGrpId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).catch(this.httpService.handleError).then(function (response) {
                                var data = response.json();
                                _this.statusCode = data.StatusCode;
                                status = data.StatusCode;
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstDBData = [];
                                        for (var i = 0; i <= data.DataList.length - 1; i++) {
                                            data.DataList[i].checkvalue = (data.DataList[i].CHK_ALLOCATED == 1) ? true : false;
                                        }
                                        _this.lstDBData = data.DataList;
                                        _this.BindDataGrid();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.isVisible = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.isVisible = false;
                                        if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_BUNIT_NOTALLOC) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Assigned Org Business Units " });
                                            break;
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
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
                        return [3 /*break*/, 5];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "btnGoClick");
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /*
    * Storing data for sorting in two different  lists one for allocated and another for Unallocated
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.BindDataGrid = function () {
        try {
            this.dataCheckedSorting = [];
            this.dataUnCheckedSorting = [];
            for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].CHK_ALLOCATED == 1) {
                    this.dataCheckedSorting.push(this.lstDBData[i]);
                }
                else {
                    this.dataUnCheckedSorting.push(this.lstDBData[i]);
                }
            }
            this.isVisible = true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    };
    /*
    * This method is calling when we selecting particular record in DataTable and getting selected record data
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.selectedRow = function (values, event) {
        try {
            values.CHK_VALUE = (event == true) ? 1 : 0;
            for (var i = 0; i < this.lstCheckedShiftToIds.length; i++) {
                if (this.lstCheckedShiftToIds[i].SHIPTO_ID == values.SHIPTO_ID) {
                    var index = this.lstCheckedShiftToIds.indexOf(this.lstCheckedShiftToIds[i], 0);
                    this.lstCheckedShiftToIds.splice(index, 1);
                }
            }
            this.lstCheckedShiftToIds.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    };
    /*
    * This method is for sorting the data  based on seleted column in DataTable
    * Using Ternary Operator instead of if/else condition
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.customSort = function (event) {
        try {
            var element = event;
            this.lstDBData = [];
            this.blnSortByColumn = !this.blnSortByColumn;
            this.sortedCheckedRec = [];
            this.sortedUnCheckedRec = [];
            this.sortedCheckedRec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            this.sortedUnCheckedRec = this.dataUnCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            this.lstDBData = [];
            this.lstDBData = (this.blnSortByColumn == false) ? this.sortedCheckedRec.reverse().concat(this.sortedUnCheckedRec.reverse()) : this.sortedCheckedRec.concat(this.sortedUnCheckedRec);
            this.sortedCheckedRec = [];
            this.sortedUnCheckedRec = [];
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    };
    /**
    * This method is calling when click on CheckAll Button in Datatable
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.checkAll = function () {
        try {
            this.lstCheckedShiftToIds = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.EndIndex > this.lstDBData.length) {
                this.EndIndex = this.lstDBData.length;
            }
            for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                this.lstDBData[i].checkvalue = true;
                this.lstDBData[i].CHK_VALUE = 1;
                this.lstCheckedShiftToIds.push(this.lstDBData[i]);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    /**
    * This method is calling when click on None Button in Datatable
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.unCheckAll = function () {
        try {
            this.lstCheckedShiftToIds = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.EndIndex > this.lstDBData.length) {
                this.EndIndex = this.lstDBData.length;
            }
            for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                this.lstDBData[i].checkvalue = false;
                this.lstDBData[i].CHK_VALUE = 0;
                this.lstCheckedShiftToIds.push(this.lstDBData[i]);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    /**
    * This method is calling when user selecting  OrgGrpId in dropdown
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.ddlOrgGrpIdChanged = function () {
        this.growlMessage = [];
        this.spinnerService.start();
        this.isVisible = false;
        try {
            this.strOrgGrpId = this.selectedOrgGrpId;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
        finally {
            this.spinnerService.stop();
        }
    };
    /**
    * This method is calling when user click on Submit Button
    */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.btn_Submit = function ($event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, i, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        if (this.blnShowOrgGroupsDropdown == false) {
                            for (i = 0; i <= this.lstDBData.length - 1; i++) {
                                this.lstDBData[i].ORG_GROUP_ID = this.strlblOrgGrpId;
                            }
                        }
                        else {
                            for (i = 0; i <= this.lstDBData.length - 1; i++) {
                                this.lstDBData[i].ORG_GROUP_ID = this.strOrgGrpId;
                            }
                        }
                        return [4 /*yield*/, this.shipToIdAllocationForDeliveryOfStockItemsServices.allocateShiptoIDs(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.lstDBData)
                                .catch(this.httpService.handleError).then(function (response) {
                                var data = response.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                        _this.isVisible = false;
                                        _this.lstDBData = [];
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
                        return [3 /*break*/, 5];
                    case 3:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "btn_Submit");
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    /**
     * This method is for clearing all the variables
     * @param event
     */
    ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstCheckedShiftToIds = null;
        this.lstDBData = null;
        this.lstOrgGroups = null;
        this.growlMessage = null;
        this.sortedCheckedRec = [];
        this.sortedUnCheckedRec = [];
        this.strOrgGrpId = null;
        this.strAllOrgId = null;
        this.strOrgGroupName = null;
        this.strlblOrgGrpId = null;
    };
    return ShipToIdAllocationForDeliveryOfStockItemsComponent;
}());
__decorate([
    core_1.ViewChild(datatable_1.DataTable),
    __metadata("design:type", datatable_1.DataTable)
], ShipToIdAllocationForDeliveryOfStockItemsComponent.prototype, "dataTableComponent", void 0);
ShipToIdAllocationForDeliveryOfStockItemsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1978),
        providers: [api_1.ConfirmationService, deliver_shiptoid_allocation_for_delivery_of_stock_items_services_1.ShipToIdAllocationForDeliveryOfStockItemsServices, atpar_common_service_1.AtParCommonService]
    }),
    __metadata("design:paramtypes", [HttpService_1.HttpService,
        atpar_common_service_1.AtParCommonService,
        deliver_shiptoid_allocation_for_delivery_of_stock_items_services_1.ShipToIdAllocationForDeliveryOfStockItemsServices,
        event_spinner_service_1.SpinnerService, AtParConstants_1.AtParConstants])
], ShipToIdAllocationForDeliveryOfStockItemsComponent);
exports.ShipToIdAllocationForDeliveryOfStockItemsComponent = ShipToIdAllocationForDeliveryOfStockItemsComponent;


/***/ }),

/***/ 1463:
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
        this.dlvrAppId = AtParEnums_1.EnumApps.Deliver;
    }
    return UserParametersComponent;
}());
UserParametersComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1979)
    })
], UserParametersComponent);
exports.UserParametersComponent = UserParametersComponent;


/***/ }),

/***/ 1464:
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
var DeliverComponent = (function () {
    function DeliverComponent() {
    }
    return DeliverComponent;
}());
DeliverComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1980)
    })
], DeliverComponent);
exports.DeliverComponent = DeliverComponent;


/***/ }),

/***/ 1719:
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
var DeliverAllocateBunitServices = (function () {
    function DeliverAllocateBunitServices(httpservice) {
        this.httpservice = httpservice;
    }
    DeliverAllocateBunitServices.prototype.getBUnits = function (bArray, userID, bUnit, description, serverUserID) {
        return this.httpservice.get({
            apiMethod: "/api/DeliverAllocBU/GetBUnits",
            params: {
                "bArray": bArray,
                "userID": userID,
                "bUnit": bUnit,
                "description": description,
                "serverUserID": serverUserID
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    DeliverAllocateBunitServices.prototype.allocateBUnits = function (userID, serverUserID, lstBUnitsAllocation, blnSearched, lstCheckedBUnits) {
        return this.httpservice.create({
            apiMethod: "/api/DeliverAllocBU/AllocateBUnits",
            formData: lstCheckedBUnits,
            params: {
                "userID": userID,
                "serverUserID": serverUserID,
                "lstBUnitsAllocation": lstBUnitsAllocation,
                "searched": blnSearched
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    DeliverAllocateBunitServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return DeliverAllocateBunitServices;
}());
DeliverAllocateBunitServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], DeliverAllocateBunitServices);
exports.DeliverAllocateBunitServices = DeliverAllocateBunitServices;


/***/ }),

/***/ 1720:
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
var AssignSignatoriesService = (function () {
    function AssignSignatoriesService(httpservice) {
        this.httpservice = httpservice;
    }
    AssignSignatoriesService.prototype.getCodes = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            apiMethod: "/api/AssignSignatories/GetCodes",
                            params: {
                                "code": code
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AssignSignatoriesService.prototype.getAuthSign = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            apiMethod: "/api/AssignSignatories/GetAuthSign",
                            params: {
                                "code": code
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AssignSignatoriesService.prototype.deleteAuthSign = function (costCenterCode, userId) {
        var inputParams = { "costCenterCode": costCenterCode };
        if (userId == null) {
            inputParams["userId"] = " ";
        }
        return this.httpservice.update({
            apiMethod: "/api/AssignSignatories/DeleteAuthSign",
            params: {
                "costCenterCode": costCenterCode,
                "userId": userId,
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    AssignSignatoriesService.prototype.addAuthSign = function (costCenterCode, userId, firstName, lastName, middleName) {
        return this.httpservice.update({
            apiMethod: "/api/AssignSignatories/AddAuthSign",
            params: {
                "costCenterCode": costCenterCode,
                "userId": userId,
                "firstName": firstName,
                "lastName": lastName,
                "middleName": middleName
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    AssignSignatoriesService.prototype.updateAuthSign = function (newCostCenterCode, oldCostCenterCode) {
        return this.httpservice.update({
            apiMethod: "/api/AssignSignatories/UpdateAuthSign",
            params: {
                "newCostCenterCode": newCostCenterCode,
                "oldCostCenterCode": oldCostCenterCode
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    AssignSignatoriesService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return AssignSignatoriesService;
}());
AssignSignatoriesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], AssignSignatoriesService);
exports.AssignSignatoriesService = AssignSignatoriesService;


/***/ }),

/***/ 1721:
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
var DeliveryReportServiceComponent = (function () {
    function DeliveryReportServiceComponent(httpservice) {
        this.httpservice = httpservice;
    }
    DeliveryReportServiceComponent.prototype.GetDeliveryReportData = function (OrgGroupID, fromDate, ToDate, srvrUserID, PoId, DeliverTo, TrackingNo, DeliverdBy, DeptId, VendorName, ItmDesc, Loc, ItemId, Carrier, Requestor, BlnTflag, DeliveryLoc, Status, CurrStatus, LocDescr, PakageType, Pallet) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            apiMethod: "/api/DeliveryReport/GetDeliveryReportData",
                            params: {
                                "orgGroupId": OrgGroupID,
                                "fromDate": fromDate,
                                "ToDate": ToDate,
                                "srvrUserID": srvrUserID,
                                "PoId": PoId,
                                "DeliverTo": DeliverTo,
                                "TrackingNo": TrackingNo,
                                "DeliverdBy": DeliverdBy,
                                "DeptId": DeptId,
                                "VendorName": VendorName,
                                "ItmDesc": ItmDesc,
                                "Loc": Loc,
                                "ItemId": ItemId,
                                "Carrier": Carrier,
                                "Requestor": Requestor,
                                "BlnTflag": BlnTflag,
                                "DeliveryLoc": DeliveryLoc,
                                "Status": Status,
                                "CurrStatus": CurrStatus,
                                "LocDescr": LocDescr,
                                "PakageType": PakageType,
                                "Pallet": Pallet
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeliveryReportServiceComponent.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return DeliveryReportServiceComponent;
}());
DeliveryReportServiceComponent = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], DeliveryReportServiceComponent);
exports.DeliveryReportServiceComponent = DeliveryReportServiceComponent;


/***/ }),

/***/ 1722:
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
var ExcludeLocationsService = (function () {
    function ExcludeLocationsService(httpservice) {
        this.httpservice = httpservice;
    }
    ExcludeLocationsService.prototype.getAllLocations = function (setID, location, deviceTokenEntry) {
        return this.httpservice.get({
            apiMethod: "/api/ExcludeLocs/GetAllLocations",
            params: {
                "setID": setID,
                "location": location,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ExcludeLocationsService.prototype.excludeLocs = function (lstLocs, deviceTokenEntry) {
        return this.httpservice.create({
            apiMethod: "/api/ExcludeLocs/ExcludeLocs",
            formData: lstLocs,
            params: {
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ExcludeLocationsService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return ExcludeLocationsService;
}());
ExcludeLocationsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], ExcludeLocationsService);
exports.ExcludeLocationsService = ExcludeLocationsService;


/***/ }),

/***/ 1723:
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
var DeliverProductivityService = (function () {
    function DeliverProductivityService(httpservice) {
        this.httpservice = httpservice;
    }
    DeliverProductivityService.prototype.GetProductivityReport = function (orgGroupID, fromdate, todate, userid, interval, fTime, toTime) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            apiMethod: "/api/ProductivityReport/GetProductivityReport",
                            params: {
                                "orgGroupID": orgGroupID,
                                "fromDate": fromdate,
                                "toDate": todate,
                                "userID": userid,
                                "interval": interval,
                                "fTime": fTime,
                                "toTime": toTime
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeliverProductivityService.prototype.GetCycleTimeReport = function (orgGroupID, fromdate, todate, userid, startEvent, endEvent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            apiMethod: "/api/ProductivityReport/GetCycleTimeReport",
                            params: {
                                "orgGroupID": orgGroupID,
                                "fromDate": fromdate,
                                "toDate": todate,
                                "userID": userid,
                                "startEvent": startEvent,
                                "endEvent": endEvent
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeliverProductivityService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return DeliverProductivityService;
}());
DeliverProductivityService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], DeliverProductivityService);
exports.DeliverProductivityService = DeliverProductivityService;


/***/ }),

/***/ 1724:
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
var ReleasePackagesServiceComponent = (function () {
    function ReleasePackagesServiceComponent(httpservice) {
        this.httpservice = httpservice;
    }
    ReleasePackagesServiceComponent.prototype.GetReleasePackages = function (appId, userId, orgGroupId, bunit, trckNoOrPoIdOrLoc, flag, transId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            apiMethod: "/api/ReleasePackages/GetReleasePackages",
                            params: {
                                "appId": appId,
                                "userId": userId,
                                "orgGroupId": orgGroupId,
                                "bunit": bunit,
                                "trckNoOrPoIdOrLoc": trckNoOrPoIdOrLoc,
                                "flag": flag,
                                "transId": transId,
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReleasePackagesServiceComponent.prototype.GetCases = function (deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            apiMethod: "/api/ReleaseCases/GetDownloadCases",
                            params: {
                                "departmentID": deviceTokenEntry
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReleasePackagesServiceComponent.prototype.ProcessReleaseCases = function (pIsUpdate, pTransID, pDeptID, pCaseID, deviceTokenEntry, transactionIdlist) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            apiMethod: "/api/ReleaseCases/ProcessReleaseCases",
                            params: {
                                "pIsUpdate": pIsUpdate,
                                "pTransID": pTransID,
                                "pDeptID": pDeptID,
                                "pCaseID": pCaseID,
                                "deviceTokenEntry": deviceTokenEntry,
                                "tranIDs": transactionIdlist
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReleasePackagesServiceComponent.prototype.GetDepartmentUsers = function (departmentID, orgGroupID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            apiMethod: "/api/DepartmentUserAllocation/GetDepartmentUsers",
                            params: {
                                "departmentID": departmentID,
                                "orgGroupID": orgGroupID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReleasePackagesServiceComponent.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return ReleasePackagesServiceComponent;
}());
ReleasePackagesServiceComponent = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], ReleasePackagesServiceComponent);
exports.ReleasePackagesServiceComponent = ReleasePackagesServiceComponent;


/***/ }),

/***/ 1725:
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
var deliver_component_1 = __webpack_require__(1464);
var deliver_allocate_business_units_component_1 = __webpack_require__(1451);
var deliver_allocate_location_groups_component_1 = __webpack_require__(1452);
var deliver_assign_signatories_component_1 = __webpack_require__(1453);
var deliver_carrier_information_component_1 = __webpack_require__(1454);
var deliver_daily_activity_component_1 = __webpack_require__(1455);
var deliver_daily_user_activity_component_1 = __webpack_require__(1456);
var deliver_delivery_report_component_1 = __webpack_require__(1457);
var deliver_exclude_locations_component_1 = __webpack_require__(1458);
var deliver_productivity_report_component_1 = __webpack_require__(1459);
var deliver_release_packages_component_1 = __webpack_require__(1460);
var deliver_setup_drop_off_locations_component_1 = __webpack_require__(1461);
var deliver_shiptoid_allocation_for_delivery_of_stock_items_component_1 = __webpack_require__(1462);
var deliver_user_parameters_component_1 = __webpack_require__(1463);
exports.routes = [
    {
        path: '',
        component: deliver_component_1.DeliverComponent,
        children: [
            { path: 'allocatebusinessunits', component: deliver_allocate_business_units_component_1.AllocateBusinessUnitsComponent },
            { path: 'allocatelocationgroups', component: deliver_allocate_location_groups_component_1.AllocateLocationGroupsComponent },
            { path: 'assignsignatories', component: deliver_assign_signatories_component_1.AssignSignatoriesComponent },
            { path: 'carrierinformation', component: deliver_carrier_information_component_1.CarrierInformationComponent },
            { path: 'dailyactivity', component: deliver_daily_activity_component_1.DailyActivityComponent },
            { path: 'dailyuserActivity', component: deliver_daily_user_activity_component_1.DailyUserActivityComponent },
            { path: 'deliveryreport', component: deliver_delivery_report_component_1.DeliveryReportComponent },
            { path: 'excludelocations', component: deliver_exclude_locations_component_1.ExcludeLocationsComponent },
            { path: 'productivityreport', component: deliver_productivity_report_component_1.ProductivityReportComponent },
            { path: 'releasepackages', component: deliver_release_packages_component_1.ReleasePackagesComponent },
            { path: 'setupdropofflocations', component: deliver_setup_drop_off_locations_component_1.SetupDropOffLoactionsComponent },
            { path: 'shiptoidallocationfordeliveryofstockitems', component: deliver_shiptoid_allocation_for_delivery_of_stock_items_component_1.ShipToIdAllocationForDeliveryOfStockItemsComponent },
            { path: 'userparameters', component: deliver_user_parameters_component_1.UserParametersComponent },
        ]
    }
];
var DeliverRoutingModule = (function () {
    function DeliverRoutingModule() {
    }
    return DeliverRoutingModule;
}());
DeliverRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.routes)],
        exports: [router_1.RouterModule]
    })
], DeliverRoutingModule);
exports.DeliverRoutingModule = DeliverRoutingModule;


/***/ }),

/***/ 1726:
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
var HttpService_1 = __webpack_require__(12);
var Rx_1 = __webpack_require__(37);
var DeliverySetupDropOffServices = (function () {
    function DeliverySetupDropOffServices(httpservice) {
        this.httpservice = httpservice;
    }
    DeliverySetupDropOffServices.prototype.getDropOffLocs = function (locID, locDesc, orgGroupID, deviceTokenEntry) {
        return this.httpservice.getSync({
            apiMethod: "/api/DropOffLocs/GetDropOffLocs",
            params: {
                "locID": locID,
                "locDesc": locDesc,
                "orgGroupID": orgGroupID,
                "deviceTokenEntry": deviceTokenEntry
            }
        });
    };
    DeliverySetupDropOffServices.prototype.addDropOffLocs = function (lstDBData, deviceTokenEntry) {
        return this.httpservice.create({
            apiMethod: "/api/DropOffLocs/InsertDropOffLocs",
            formData: lstDBData,
            params: {
                "deviceTokenEntry": deviceTokenEntry
            }
        }).toPromise();
    };
    DeliverySetupDropOffServices.prototype.UpdateDropOffLocs = function (drpLocID, locDesc, orgGroupID, userID, prevLocID, deviceTokenEntry) {
        return this.httpservice.create({
            apiMethod: "/api/DropOffLocs/EditUpdateDropOffLocs",
            params: {
                "drpLocID": drpLocID,
                "locDesc": locDesc,
                "orgGroupID": orgGroupID,
                "userID": userID,
                "prevLocID": prevLocID,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).toPromise();
    };
    DeliverySetupDropOffServices.prototype.statusUpdateDropOffLocS = function (status, orgGroupID, locID, userID, deviceTokenEntry) {
        return this.httpservice.create({
            apiMethod: "/api/DropOffLocs/UpdateDropOffLocs",
            params: {
                "status": status,
                "orgGroupID": orgGroupID,
                "locID": locID,
                "userID": userID,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).toPromise();
    };
    DeliverySetupDropOffServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return DeliverySetupDropOffServices;
}());
DeliverySetupDropOffServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], DeliverySetupDropOffServices);
exports.DeliverySetupDropOffServices = DeliverySetupDropOffServices;


/***/ }),

/***/ 1727:
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
var ShipToIdAllocationForDeliveryOfStockItemsServices = (function () {
    function ShipToIdAllocationForDeliveryOfStockItemsServices(httpservice) {
        this.httpservice = httpservice;
    }
    ShipToIdAllocationForDeliveryOfStockItemsServices.prototype.getOrgGrpShiptoIDs = function (orgGroupID, serverUserID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            apiMethod: "/api/DeliverShiptoIDs/GetOrgGrpShiptoIDs",
                            params: {
                                "orgGroupID": orgGroupID,
                                "serverUserID": serverUserID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ShipToIdAllocationForDeliveryOfStockItemsServices.prototype.allocateShiptoIDs = function (serverUserID, lstShiptoIDs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.create({
                            apiMethod: "/api/DeliverShiptoIDs/AllocateShiptoIDs",
                            formData: lstShiptoIDs,
                            params: {
                                "serverUserID": serverUserID
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ShipToIdAllocationForDeliveryOfStockItemsServices;
}());
ShipToIdAllocationForDeliveryOfStockItemsServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], ShipToIdAllocationForDeliveryOfStockItemsServices);
exports.ShipToIdAllocationForDeliveryOfStockItemsServices = ShipToIdAllocationForDeliveryOfStockItemsServices;


/***/ }),

/***/ 1728:
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
var deliver_component_1 = __webpack_require__(1464);
var deliver_allocate_business_units_component_1 = __webpack_require__(1451);
var deliver_allocate_location_groups_component_1 = __webpack_require__(1452);
var deliver_assign_signatories_component_1 = __webpack_require__(1453);
var deliver_carrier_information_component_1 = __webpack_require__(1454);
var deliver_daily_activity_component_1 = __webpack_require__(1455);
var deliver_daily_user_activity_component_1 = __webpack_require__(1456);
var deliver_delivery_report_component_1 = __webpack_require__(1457);
var deliver_exclude_locations_component_1 = __webpack_require__(1458);
var deliver_productivity_report_component_1 = __webpack_require__(1459);
var deliver_release_packages_component_1 = __webpack_require__(1460);
var deliver_setup_drop_off_locations_component_1 = __webpack_require__(1461);
var deliver_shiptoid_allocation_for_delivery_of_stock_items_component_1 = __webpack_require__(1462);
var deliver_user_parameters_component_1 = __webpack_require__(1463);
var deliver_routing_module_1 = __webpack_require__(1725);
var shared_module_1 = __webpack_require__(632);
var DeliverModule = (function () {
    function DeliverModule() {
    }
    return DeliverModule;
}());
DeliverModule = __decorate([
    core_1.NgModule({
        imports: [
            deliver_routing_module_1.DeliverRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            deliver_component_1.DeliverComponent,
            deliver_allocate_business_units_component_1.AllocateBusinessUnitsComponent,
            deliver_allocate_location_groups_component_1.AllocateLocationGroupsComponent,
            deliver_assign_signatories_component_1.AssignSignatoriesComponent,
            deliver_carrier_information_component_1.CarrierInformationComponent,
            deliver_daily_activity_component_1.DailyActivityComponent,
            deliver_daily_user_activity_component_1.DailyUserActivityComponent,
            deliver_delivery_report_component_1.DeliveryReportComponent,
            deliver_exclude_locations_component_1.ExcludeLocationsComponent,
            deliver_productivity_report_component_1.ProductivityReportComponent,
            deliver_release_packages_component_1.ReleasePackagesComponent,
            deliver_setup_drop_off_locations_component_1.SetupDropOffLoactionsComponent,
            deliver_shiptoid_allocation_for_delivery_of_stock_items_component_1.ShipToIdAllocationForDeliveryOfStockItemsComponent,
            deliver_user_parameters_component_1.UserParametersComponent
        ]
    })
], DeliverModule);
exports.DeliverModule = DeliverModule;


/***/ }),

/***/ 1735:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MT_DELV_COST_CENTER_AUTH_PERSON = (function () {
    function MT_DELV_COST_CENTER_AUTH_PERSON() {
    }
    return MT_DELV_COST_CENTER_AUTH_PERSON;
}());
exports.MT_DELV_COST_CENTER_AUTH_PERSON = MT_DELV_COST_CENTER_AUTH_PERSON;


/***/ }),

/***/ 1748:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VM_CYCLETIME_DETAILS = (function () {
    function VM_CYCLETIME_DETAILS() {
    }
    return VM_CYCLETIME_DETAILS;
}());
exports.VM_CYCLETIME_DETAILS = VM_CYCLETIME_DETAILS;


/***/ }),

/***/ 1749:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VM_DELV_PO_COMMENTS = (function () {
    function VM_DELV_PO_COMMENTS() {
    }
    return VM_DELV_PO_COMMENTS;
}());
exports.VM_DELV_PO_COMMENTS = VM_DELV_PO_COMMENTS;


/***/ }),

/***/ 1750:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VM_DELV_PROD = (function () {
    function VM_DELV_PROD() {
    }
    return VM_DELV_PROD;
}());
exports.VM_DELV_PROD = VM_DELV_PROD;


/***/ }),

/***/ 1765:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VM_RESULTS = (function () {
    function VM_RESULTS() {
    }
    return VM_RESULTS;
}());
exports.VM_RESULTS = VM_RESULTS;


/***/ }),

/***/ 1767:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VM_TABLE_AVG = (function () {
    function VM_TABLE_AVG() {
    }
    return VM_TABLE_AVG;
}());
exports.VM_TABLE_AVG = VM_TABLE_AVG;


/***/ }),

/***/ 1880:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MT_DELV_LOC_DETAILS = (function () {
    function MT_DELV_LOC_DETAILS() {
    }
    return MT_DELV_LOC_DETAILS;
}());
exports.MT_DELV_LOC_DETAILS = MT_DELV_LOC_DETAILS;


/***/ }),

/***/ 1967:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\" *ngIf=\"true\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px;\">\r\n                        <form class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Org Group ID </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpIDData}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupDD\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">User ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstUsers\" [id]=\"'ddllstUsers'\" [required]=\"true\" [(ngModel)]=\"selectedDropDownUserId\" [ngModelOptions]=\"{standalone: true}\" (onChange)=\"ddlUserChanged()\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Business Unit</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-ac-server [(ngModel)]=\"selectedBunit\" [ngModelOptions]=\"{standalone: true}\" [suggestions]=\"lstFilteredBUnits\" (completeMethod)=\"fillBUnitsAuto($event)\"></atpar-ac-server>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Description</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"selectedDescription\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"''\" [id]=\"'txtdescription'\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"getAllBUnits()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"col-xs-12 table-responsive\" *ngIf=\"isVisible\">\r\n                            <div class=\"container\">\r\n                                <atpar-datatable [value]=\"lstDBData\" [style]=\"{'width':'100%'}\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"recordsPerPageSize\" (filteredData)=\"filterdata($event)\"\r\n                                                 [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [responsive]=\"true\">\r\n\r\n                                    <p-column [style]=\"{'width':'7%', 'text-align':'center'}\" header=\"Select\">\r\n                                        <template pTemplate=\"filter\" let-col>\r\n                                            <ul class=\"list-inline li-all-none\">\r\n                                                <li>\r\n                                                    <span (click)=\"checkAll()\" style=\"cursor:pointer\">All</span>\r\n                                                </li> |\r\n                                                <li>\r\n                                                    <span (click)=\"unCheckAll()\" style=\"cursor:pointer\">None</span>\r\n                                                </li>\r\n                                            </ul>\r\n                                        </template>\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <atpar-switch (change)=\"selectedRow(ven,$event)\" [(ngModel)]=\"ven.checkvalue\"></atpar-switch>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column [style]=\"{'width':'12%'}\" field=\"BUSINESS_UNIT\" header=\"Business Unit\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n                                    <p-column [style]=\"{'width':'40%'}\" field=\"DESCR\" header=\"Description\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n                                    <p-column [style]=\"{'width':'30%'}\" field=\"USER_ID\" header=\"User\" sortable=\"custom\" (sortFunction)=\"customSort($event)\"> </p-column>\r\n\r\n                                </atpar-datatable>\r\n                            </div>\r\n                            <br>\r\n                            <div class=\"col-xs-12 col-md-4 col-md-offset-5 col-sm-6 col-sm-offset-5\">\r\n                                <button class=\"btn btn-purple sbtn\" id=\"btnsubmitForGrid\" (click)=\"allocateBUnits()\">Submit &nbsp;<i class=\"fa fa-check\"></i></button>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n";

/***/ }),

/***/ 1968:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <atpar-allocate-location-groups [appId]=\"deliverAppId\"></atpar-allocate-location-groups>\r\n</div>";

/***/ }),

/***/ 1969:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:10px 0px 10px 0;\">\r\n                        <form class=\"form-horizontal form-label-left\" *ngIf=\"filter\">\r\n                            <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Cost Center</label>\r\n                                <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                    <atpar-ac-server [(ngModel)]=\"codes\" [id]=\"'CostCenter'\" [name]=\"txtCostCenter\" [suggestions]=\"lstDBDataSearch\" (completeMethod)=\"searchAutoCompleteCode($event)\" [ngModelOptions]=\"{standalone: true}\"></atpar-ac-server>\r\n                                    <!--<atpar-text [(ngModel)]=\"codes\" [name]=\"txtCostCenter\" [isFocused]=\"'true'\" [validations]=\"'alpha_numeric_space'\" [id]=\"'CostCenter'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>-->\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-xs-12 col-sm-2 col-md-4 form-group\">\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"go()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"addCostCenterCode()\">Add &nbsp;<i class=\"fa fa-plus\"></i> </button>\r\n                            </div>\r\n                        </form>\r\n                        <div style=\"clear:both;\"></div>\r\n                        <div class=\"col-xs-12 container\" *ngIf=\"pop\">\r\n                            <div class=\"container\">\r\n                                <div class=\"col-lg-12 col-md-12 col-xs-12\">\r\n                                    <span *ngIf=\"lstDBData.length > 0\" class=\"text-primary pull-right\">{{lstDBData.length}}  Code(s) Found</span>\r\n                                </div>\r\n                                \r\n                                <atpar-datatable [value]=\"lstDBData\" #dt [style]=\"{'width':'100%'}\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"recordsPerPageSize\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n                                    <p-column header=\"Action\" [style]=\"{'width':'8%','text-align':'center'}\">\r\n                                        <template let-rowData=\"rowData\" pTemplate=\"body\">\r\n                                            <i class=\"fa fa-pencil fa-bg bg-red\" style=\"cursor:pointer;\" title=\"Edit\" (click)=\"editCostCenterCode(rowData)\"></i>&nbsp;\r\n                                            <i class=\"fa fa-trash fa-bg bg-red\" style=\"cursor:pointer;\" title=\"Delete\" (click)=\"confirmDelete(rowData, true)\"></i>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"COST_CENTER_CODE\" header=\"Code\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column header=\"Assign Signatories\">\r\n                                        <template let-rowData=\"rowData\" pTemplate=\"body\">\r\n                                            <span (click)=\"assignSignatories(rowData)\" class=\"grid-link\">Assign Signatories</span>\r\n                                        </template>\r\n                                    </p-column>\r\n                                </atpar-datatable>\r\n                            </div>\r\n                        </div>\r\n                        <div style=\"clear:both;\"></div>\r\n\r\n                        <form class=\"form-horizontal form-label-left\" *ngIf=\"form\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"\" class=\"control-label col-xs-12 col-sm-3 col-md-3\">Code</label>\r\n                                <div class=\"col-xs-12 col-sm-3 col-md-3\">\r\n                                    <atpar-text [(ngModel)]=\"newItem.COST_CENTER_CODE\" [name]=\"txtCode\" [isFocused]=\"'true'\" (bindModelDataChange)=\"bindModelDataChange($event)\" [validations]=\"'mandatory,ALPHA_NUMERIC_EXCEPT_FST_SPACE,max=50'\" [id]=\"'Code'\" [ngModelOptions]=\"{standalone: true}\" [title]=\"'Use only A-Z,a-z,0-9,max 50 characters'\"></atpar-text>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4\">\r\n                                <button class=\"btn btn-purple sbtn\" *ngIf=\"!isEditMode\" (click)=\"saveSignatoryCode()\" [disabled]=\"disableButton\">Save &nbsp; <i class=\"fa fa-floppy-o\"></i></button>\r\n                                <button class=\"btn btn-purple sbtn\" *ngIf=\"isEditMode\" (click)=\"saveSignatoryCode()\" [disabled]=\"disableButton\">Update &nbsp;<i class=\"fa fa-check\"></i> </button>\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"goCancel()\">Cancel &nbsp;<i class=\"fa fa-close\"></i> </button>\r\n                            </div>\r\n                        </form>\r\n                        <div style=\"clear:both;\"></div>\r\n\r\n                        <div class=\"col-xs-12 table-responsive\" *ngIf=\"table\">\r\n                            <button class=\"btn btn-purple sbtn pull-right\" (click)=\"edit()\">Add &nbsp;<i class=\"fa fa-plus\"></i> </button>\r\n                            <br>\r\n                            <div class=\"container\">\r\n                                <span class=\"text-primary\">{{strData}}</span>\r\n                                <div *ngIf=\"tableData\">\r\n                                    <br />\r\n                                    <div class=\"col-lg-12 col-md-12 col-xs-12\">\r\n                                        <span *ngIf=\"lstSignDBData.length > 0\" class=\"text-primary pull-right\">{{lstSignDBData.length}}  Record(s) Found</span>\r\n                                    </div>\r\n\r\n                                    <atpar-datatable [value]=\"lstSignDBData\" [style]=\"{'width':'100%'}\" #dt [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"recordsPerPageSize\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n                                        <p-column header=\"Action\" [style]=\"{'width':'4%','text-align':'center'}\">\r\n                                            <template let-rowData=\"rowData\" pTemplate=\"body\">\r\n                                                <i class=\"fa fa-trash fa-bg bg-red\" style=\"cursor:pointer;\" (click)=\"confirmDelete(rowData, false)\" title=\"Delete\"></i>\r\n                                            </template>\r\n                                        </p-column>\r\n                                        <p-column field=\"AUTH_USER_ID\" header=\"User ID\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                        <p-column field=\"FIRST_NAME\" header=\"First Name\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                        <p-column field=\"LAST_NAME\" header=\"Last Name\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                        <p-column field=\"MIDDLE_NAME\" header=\"Middle Name\" [sortable]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'9%'}\"></p-column>\r\n                                    </atpar-datatable><br>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-md-6 col-md-offset-5 col-sm-6 col-sm-offset-5\" *ngIf=\"table\">\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"goBack()\"><i class=\"fa fa-arrow-left\"></i> &nbsp;Go Back </button>\r\n                            </div>\r\n                        </div>\r\n                        <div style=\"clear:both;\"></div>\r\n                        <form class=\"form-horizontal form-label-left\" *ngIf=\"form2\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"\" class=\"control-label col-xs-12 col-sm-3 col-md-3\">User ID</label>\r\n                                <div class=\"col-xs-12 col-sm-3 col-md-3\">\r\n                                    <atpar-text [(ngModel)]=\"newItem.AUTH_USER_ID\" [name]=\"txtAuthUserId\" [validations]=\"'mandatory,ALPHA_NUMERIC_EXCEPT_FST_SPACE,max=50'\" [title]=\"'Use only A-Z,a-z,0-9,max 50 characters'\" [id]=\"'userID'\" (bindModelDataChange)=\"bindModelDataChange($event)\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-6 col-md-6 help_txt\">\r\n                                    <!--Enter User ID Here-->\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label for=\"\" class=\"control-label col-xs-12 col-sm-3 col-md-3\">First Name</label>\r\n                                <div class=\"col-xs-12 col-sm-3 col-md-3\">\r\n                                    <atpar-text [(ngModel)]=\"newItem.FIRST_NAME\" [name]=\"txtFirstName\" [validations]=\"'mandatory,ALPHA_NUMERIC_EXCEPT_FST_SPACE,max=50'\" [title]=\"'Use only A-Z,a-z,0-9,max 50 characters'\" [id]=\"'fName'\" (bindModelDataChange)=\"bindModelDataChange($event)\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-6 col-md-6 help_txt\">\r\n                                    <!--Enter First Name Here-->\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label for=\"\" class=\"control-label col-xs-12 col-sm-3 col-md-3\">Last Name</label>\r\n                                <div class=\"col-xs-12 col-sm-3 col-md-3\">\r\n                                    <atpar-text [(ngModel)]=\"newItem.LAST_NAME\" [name]=\"txtLastName\" [validations]=\"'ALPHA_NUMERIC_EXCEPT_FST_SPACE,max=50'\" [title]=\"'Use only A-Z,a-z,0-9,max 50 characters'\" [id]=\"'txtLastName'\" (bindModelDataChange)=\"bindModelDataChange($event)\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-6 col-md-6 help_txt\">\r\n                                    <!--Enter Last Name Here-->\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label for=\"\" class=\"control-label col-xs-12 col-sm-3 col-md-3\">Middle Name</label>\r\n                                <div class=\"col-xs-12 col-sm-3 col-md-3\">\r\n                                    <atpar-text [(ngModel)]=\"newItem.MIDDLE_NAME\" [name]=\"txtMiddleName\" [validations]=\"'ALPHA_NUMERIC_EXCEPT_FST_SPACE,max=1'\" [title]=\"'Use only A-Z,a-z,0-9,max 1 character'\" (bindModelDataChange)=\"bindModelDataChange($event)\" [id]=\"'txtMiddleName'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-6 col-md-6 help_txt\">\r\n                                    <!--Enter Middle Name Here-->\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-4\">\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"saveAuthSignatoryCode()\" [disabled]=\"disableButtonUser\">Save &nbsp; <i class=\"fa fa-floppy-o\"></i></button>\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"close()\"><i class=\"fa fa-arrow-left\"></i> &nbsp;Go Back </button>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"content-section implementation\">\r\n        <atpar-confirmdialog header=\"Confirmation\" icon=\"fa fa-question-circle\" width=\"425\"></atpar-confirmdialog>\r\n    </div>\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n</div>\r\n";

/***/ }),

/***/ 1970:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <atpar-carrier-information [appId]=\"dlvrAppId\"></atpar-carrier-information>\r\n</div>";

/***/ }),

/***/ 1971:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>Deliver Daily Activity Screen</span>\r\n</div>";

/***/ }),

/***/ 1972:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>Deliver Daily User Activity</span>\r\n</div>";

/***/ }),

/***/ 1973:
/***/ (function(module, exports) {

module.exports = "\r\n\r\n\r\n<div id=\"main\" class=\"content-page\">\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:10px 0px 10px 0px;\">\r\n                        <form class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"pull-right\" id=\"tdExports\" *ngIf=\"showexport\">\r\n                                    <ul class=\"list-inline\">\r\n                                        <li class=\"no-padding\" style=\"cursor:pointer\">\r\n                                            <i class=\"fa fa-envelope-o fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgMail\" title=\"Send mail\" (click)=\"onSendMailIconClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                        <li class=\"no-padding\" style=\"cursor:pointer\">\r\n                                            <i class=\"fa fa-print fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgPrint\" title=\"Print\" (click)=\"onPrintClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                        <li class=\"no-padding\" style=\"cursor:pointer\">\r\n                                            <i class=\"fa fa-file-excel-o fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgExcel\" title=\"Excel Format\" (click)=\"onExportToExcelClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                    </ul>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Order # </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"PoId\" [id]=\"'OrderNo'\" [name]=\"'OrderNo'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Recipient</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"DeliverTo\" [id]=\"'OrderNo'\" [name]=\"'Recipient'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Tracking#</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"TrackingNo\" [id]=\"'OrderNo'\" [name]=\"'TrackingNo'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\"> Package Type</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <!--<atpar-text [(ngModel)]=\"selectedOrderNo\" [id]=\"'OrderNo'\" [name]=\"'OrderNo'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>-->\r\n                                        <atpar-select [options]=\"lstPackType\" [id]=\"'ddlPackType'\" [required]=\"true\" [(ngModel)]=\"selectedPackageType\" [ngModelOptions]=\"{standalone: true}\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Requestor</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n\r\n                                        <atpar-text [(ngModel)]=\"Requestor\" [id]=\"'OrderNo'\" [name]=\"'Requestor'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Pallet</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"Pallet\" [id]=\"'OrderNo'\" [name]=\"'Pallet'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Status</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstStatus\" [id]=\"'ddlStatus'\" [required]=\"true\" [(ngModel)]=\"selectedStatus\" [ngModelOptions]=\"{standalone: true}\" [disabled]=\"blnStatus\" (onChange)=\"ddlStatusChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Current Status</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstCurrentStatus\" [id]=\"'ddlCurrentStatus'\" [required]=\"true\" [(ngModel)]=\"selectedCurrStatus\" [disabled]=\"blnCurrStatus\" [ngModelOptions]=\"{standalone: true}\" (onChange)=\"ddlCurrentStatusChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">From Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                         <p-calendar [showIcon]=\"true\" [id]=\"'fromDate'\" [(ngModel)]=\"fromDate\" [placeholder]=\"'From Date'\" [dateFormat]=\"'mm/dd/yy'\" [required]=\"true\" [readonlyInput]=\"true\" [ngModelOptions]=\"{standalone: true}\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1950:2050\"></p-calendar>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-xs-12\">                                \r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">To Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                         <p-calendar [showIcon]=\"true\" [id]=\"'toDate'\" [(ngModel)]=\"toDate\" [placeholder]=\"'To Date'\" [dateFormat]=\"'mm/dd/yy'\" [required]=\"true\" [readonlyInput]=\"true\" [ngModelOptions]=\"{standalone: true}\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1950:2050\"></p-calendar>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"BindDataGrid()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>                                    \r\n                                </div>\r\n                            </div>\r\n                            <!--<div class=\"col-xs-12\">\r\n                                <a (click)=\"show()\"><i class=\"fa fa-plus-circle fa-2x\" *ngIf=\"plus\"></i><i class=\"fa fa-minus-circle fa-2x\" *ngIf=\"!plus\"></i></a>\r\n                            </div>-->\r\n\r\n                            <div class=\"col-md-12 \" style=\"padding-bottom: 7px;\">\r\n                                <a>\r\n                                    <i class=\"fa fa-plus fa-bg bg-red\" *ngIf=\"plus\" style=\"cursor:pointer\" (click)=\"show()\"></i>\r\n                                    <i class=\"fa fa-minus fa-bg bg-red\" *ngIf=\"!plus\" style=\"cursor:pointer\" (click)=\"show()\"></i>\r\n                                </a>\r\n                            </div>\r\n\r\n                            <br />\r\n                            <div *ngIf=\"!plus\">\r\n                                <div class=\"col-xs-12\">\r\n                                    <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                        <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Org Group ID </label>\r\n                                        <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                            <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpId}}</label>\r\n                                            <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGrpId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupDD\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                        <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\"> Delivered By </label>\r\n                                        <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                            <atpar-select [options]=\"lstDeliverdBy\" [id]=\"'ddlDeliverdBy'\" [required]=\"false\" [(ngModel)]=\"DeliverdBy\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                        <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Dept ID </label>\r\n                                        <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                            <atpar-text [(ngModel)]=\"DeptId\" [id]=\"'OrderNo'\" [name]=\"'DeptId'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12\">\r\n                                    <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                        <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">ItemID</label>\r\n                                        <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                            <atpar-text [(ngModel)]=\"ItemId\" [id]=\"'OrderNo'\" [name]=\"'ItemId'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                        <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Item Description</label>\r\n                                        <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                            <atpar-text [(ngModel)]=\"ItmDesc\" [id]=\"'OrderNo'\" [name]=\"'ItemDesc'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                        <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Carrier ID</label>\r\n                                        <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                            <atpar-text [(ngModel)]=\"Carrier\" [id]=\"'OrderNo'\" [name]=\"'CarrierId'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12\">\r\n                                    <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                        <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Vendor Name</label>\r\n                                        <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                            <atpar-text [(ngModel)]=\"VendorName\" [id]=\"'OrderNo'\" [name]=\"'VendorName'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                        <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Location</label>\r\n                                        <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                            <atpar-text [(ngModel)]=\"Loc\" [id]=\"'OrderNo'\" [name]=\"'Location'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                        <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Location Description</label>\r\n                                        <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                            <atpar-text [(ngModel)]=\"LocDescr\" [id]=\"'OrderNo'\" [name]=\"'LocationDesc'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                        </div>\r\n                                    </div>\r\n\r\n                                </div>\r\n                            </div>\r\n\r\n\r\n                        </form>\r\n                        <br />\r\n                        <div class=\"col-xs-12 table-responsive\" id=\"Exportdiv\" *ngIf=\"showGrid\">\r\n                            <div class=\"container no-scrl\">\r\n                            <atpar-datatable [value]=\"deliverHeaders\" [paginator]=\"true\" id=\"DelvTable\" [pageLinks]=\"3\" [rows]=\"deliverDetailRows\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\" (filteredData)=\"onDeliverFilterData($event)\" scrollable=\"true\" [style]=\"{'width':'100%'}\" resizableColumns=\"true\">\r\n                                <p-column header=\"Transaction ID\" field=\"TRANSACTION_ID\" *ngIf=\"false\"></p-column>\r\n                                <p-column expander=\"true\" styleClass=\"col-icon\" [style]=\"{'width':'35px'}\"></p-column>\r\n                                <p-column header=\"Order# - Line#\" field=\"PO_ID\" [style]=\"{'width':'150px'}\" [sortable]=\"true\" [filter]=\"true\">\r\n                                    <template let-heddetail=\"rowData\" pTemplate=\"body\">\r\n                                        <span style=\"float:left\">{{heddetail.PO_ID}}</span>\r\n                                        <span>-</span>\r\n                                        <span>{{heddetail.LINE_NO}}</span>\r\n                                    </template>\r\n                                </p-column>\r\n                                <p-column header=\"External Tracking#\" field=\"REPORT_DATA_3\" [style]=\"{'width':'150px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"Internal Tracking# \" field=\"REPORT_DATA_31\" [style]=\"{'width':'150px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"Location - Description\" field=\"LOCATION\" [style]=\"{'width':'150px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"Dept ID\" field=\"DEPT_ID\"  [style]=\"{'width':'120px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"Qty\" field=\"QTY\" styleClass=\"text-right\" [style]=\"{'width':'100px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"UOM\" field=\"UOM\" [style]=\"{'width':'100px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"Current Owner \" field=\"CURRENT_STATUS_USER\" [style]=\"{'width':'150px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"Status (Event Time) \" field=\"STATUS_MESSAGE\" [style]=\"{'width':'230px','font-weight':'bold'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\">\r\n                                    <template let-heddetail=\"rowData\" pTemplate=\"body\">\r\n                                        <span style=\"float:left\">{{heddetail.STATUS_MESSAGE}}</span>\r\n                                        <span>({{heddetail.STATUS_TIME}} )</span>\r\n                                    </template>\r\n                                </p-column>\r\n                                <p-column header=\"ItemID\" field=\"ITEM_ID\" [style]=\"{'width':'150px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"Mfg ItemID\" field=\"DEPARTMENT_ID\" [style]=\"{'width':'120px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"Item Description\" field=\"REPORT_DATA_8\" [style]=\"{'width':'150px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'15%'}\"></p-column>\r\n                                <p-column header=\"Carrier\" field=\"CARRIER_ID\"  [style]=\"{'width':'120px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"Receipt Date\" field=\"RECEIPT_DATE\" [style]=\"{'width':'150px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"PickUp User\" field=\"PICKUP_USER\" [style]=\"{'width':'120px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"Requestor\" field=\"DELIVERED_TO\" [style]=\"{'width':'120px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"Vendor Name\" field=\"VENDOR_NAME\" [style]=\"{'width':'120px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"Notes\" field=\"ITEM_NOTES\" [style]=\"{'width':'200px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                <p-column header=\"Pallet\" field=\"PALLET\" [style]=\"{'width':'120px'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n\r\n                                <template let-header pTemplate=\"rowexpansion\">\r\n                                    <atpar-datatable [value]=\"header.POCOMMENTS\" [responsive]=\"true\" *ngIf=\"header.SHOW_PO_COMMENTS\">\r\n                                        <p-column field=\"HEADER_COMMENTS\">\r\n                                            <template let-hedHCmts=\"rowData\" pTemplate=\"body\">\r\n                                                <span style=\"float:left\">PO Header Comments: {{hedHCmts.HEADER_COMMENTS}}</span>\r\n                                            </template>\r\n                                        </p-column>\r\n                                    </atpar-datatable>\r\n\r\n                                    <atpar-datatable [value]=\"header.DETAILS\" [paginator]=\"false\" [pageLinks]=\"3\" [rows]=\"5\" expandableRows=\"true\" [rowsPerPageOptions]=\"[5,10,20]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n                                        <p-header>\r\n                                            <i class=\"fa fa-envelope-o fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgMail\" title=\"Send mail\"  style=\"cursor:pointer;font-size:18px;float:left;margin-right:8px\" (click)=\"onSendEventsMailClick($event,header.DETAILS)\"></i>&nbsp;                                           \r\n                                            \r\n                                            <!--<i class=\"fa fa-envelope-o fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgMail\" title=\"Send mail\" (click)=\"onSendMailIconClick($event)\"></i>&nbsp;-->\r\n                                            <span>\r\n                                                <atpar-text [(ngModel)]=\"txtEventsMail\" [id]=\"'txtEventsMail'\" [style]=\"{'width':'120px'}\" [name]=\"'EventMail'\" [validations]=\"'max=50,email'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                            </span>\r\n                                        </p-header>\r\n                                        <p-column header=\"Event\" field=\"STATUS_MESSAGE\" [style]=\"{'width':'120px'}\"></p-column>\r\n                                        <p-column header=\"Event Date\" field=\"STATUS_TIME\" [style]=\"{'width':'150px'}\"></p-column>\r\n                                        <p-column header=\"Cycle Time\" field=\"CYCLE_TIME\" [style]=\"{'width':'120px'}\"></p-column>\r\n                                        <p-column header=\"User\" field=\"STATUS_USER\" [style]=\"{'width':'150px'}\"></p-column>\r\n                                        <p-column header=\"Recipient\" field=\"RECEPIENT\" [style]=\"{'width':'120px'}\"></p-column>\r\n                                        <p-column header=\"Delivery Location\" field=\"DELIVERY_LOCATION\" [style]=\"{'width':'80px'}\"></p-column>\r\n                                        <p-column header=\"Drop Off\" field=\"HANDOVER\" [style]=\"{'width':'80px'}\"></p-column>\r\n                                        <p-column header=\"Signature\" field=\"SIGNATURE\">\r\n                                            <template let-col let-ven=\"rowData\" pTemplate=\"body\">\r\n\r\n                                                <img src=\"data:image/jpg;base64,{{ven.SIGNATURE}}\" *ngIf=\"ven.STATUS_MESSAGE=='Delivered' || ven.STATUS_MESSAGE=='Re-Delivered' ?true:false\">\r\n                                            </template>\r\n\r\n                                        </p-column>\r\n\r\n\r\n                                    </atpar-datatable>\r\n                                    <atpar-datatable [value]=\"header.POCOMMENTS\" [responsive]=\"true\" *ngIf=\"header.SHOW_LINE_COMMENTS\">\r\n                                        <p-column field=\"LINE_COMMENTS\" [style]=\"{'width':'15%'}\">\r\n                                            <template let-hedLCmts=\"rowData\" pTemplate=\"body\">\r\n                                                <span style=\"float:left\">PO Line Comments: {{hedLCmts.LINE_COMMENTS}}</span>\r\n                                            </template>\r\n\r\n                                        </p-column>\r\n                                    </atpar-datatable>\r\n                                    <atpar-datatable [value]=\"header.ATTEMPTS\" [paginator]=\"false\" [pageLinks]=\"3\" [rows]=\"5\" expandableRows=\"true\" [rowsPerPageOptions]=\"[5,10,20]\" [globalFilter]=\"gb\" [responsive]=\"true\" *ngIf=\"header.showAttempts\">\r\n                                        <p-column header=\"Attempt date(dd/mm/yyyy)\" field=\"ATTEMPT_DATE\" [style]=\"{'width':'15%'}\"></p-column>\r\n                                        <p-column header=\"Comment\" field=\"COMMENT\" [style]=\"{'width':'15%'}\"></p-column>\r\n                                    </atpar-datatable>\r\n                                </template>\r\n                            </atpar-datatable>\r\n                        </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<mail-dialog header=\"Enter Recipient`s Email Address\" [width]=\"450\" (onClose)=\"closeMailPopup()\" [(visible)]=\"isMailDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\r\n    <div class=\"ui-grid ui-grid-responsive ui-fluid\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-1 col-md-1 col-sm-3 col-xs-3\" style=\"margin-top:2%;margin-right:-2%\">\r\n                <span style=\"font-weight:600\">To : </span>\r\n            </div>\r\n            <div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8\">\r\n                <atpar-text [(ngModel)]=\"toMailAddr\" [name]=\"txtToMailAddr\" [id]=\"'txtToMailAddr'\"></atpar-text>\r\n            </div>\r\n            <div class=\"col-lg-1 col-md-1 col-sm-3 col-xs-3\">\r\n                <span><button class=\"btn btn-purple sbtn\" (click)=\"onSendMailClick()\">Send &nbsp;<i class=\"fa fa-share-square-o\" aria-hidden=\"true\"></i></button> </span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</mail-dialog>\r\n\r\n<style>\r\n    .modal-content {\r\n        top: 50% !important;\r\n    }\r\n</style>\r\n\r\n";

/***/ }),

/***/ 1974:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"col-xs-12 col-sm-12 col-md-12\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:20px;\">\r\n                        <form class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Set ID / Company</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-6\">\r\n                                        <atpar-text [(ngModel)]=\"selectedSetID\" [name]=\"txtDeptId\" [validations]=\"'alpha_numeric_underscore_hyphen_backslash_nospace'\" [id]=\"'txtDeptId'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Location</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-6\">\r\n                                        <atpar-text [(ngModel)]=\"selectedLocation\" [name]=\"txtDescription\" [validations]=\"'alpha_numeric_underscore_hyphen_backslash_nospace'\" [id]=\"'txtDescription'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"getAllLocations()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 col-md-offset-5\">\r\n\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"col-xs-12 table-responsive\" *ngIf=\"isVisible\">\r\n                            <atpar-datatable [value]=\"lstDBData\" #dt [style]=\"{'width':'100%'}\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"pazeSize\" (filteredData)=\"filterdata($event)\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [responsive]=\"true\">\r\n                                <p-column [style]=\"{'width':'7%', 'text-align':'center'}\" header=\"Select\">\r\n                                    <template pTemplate=\"filter\" let-col>\r\n                                        <ul class=\"list-inline li-all-none\">\r\n                                            <li>\r\n                                                <span (click)=\"checkAll()\" style=\"cursor:pointer\">All</span>\r\n                                            </li> |\r\n                                            <li>\r\n                                                <span (click)=\"unCheckAll()\" style=\"cursor:pointer\">None</span>\r\n                                            </li>\r\n                                        </ul>\r\n                                    </template>\r\n                                    <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                        <atpar-switch (change)=\"selectedRow(ven,$event)\" [(ngModel)]=\"ven.checkvalue\"></atpar-switch>\r\n                                    </template>\r\n                                </p-column>\r\n                                <p-column field=\"SETID\" header=\"Set ID\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n                                <p-column field=\"LOCATION\" header=\"Location\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n                                <p-column field=\"LOCATION_DESC\" header=\"Description\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n\r\n                            </atpar-datatable>\r\n                            <br />\r\n                            <div class=\"col-xs-12 col-md-4 col-sm-6 col-sm-offset-5 col-md-offset-5\">\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"confirm()\">Submit &nbsp;<i class=\"fa fa-check\"></i></button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"content-section implementation\">\r\n            <atpar-confirmdialog header=\"Confirmation\" icon=\"fa fa-question-circle\" width=\"425\"></atpar-confirmdialog>\r\n        </div>\r\n    </div>\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n</div>\r\n\r\n";

/***/ }),

/***/ 1975:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px 0px 10px 0px;\">\r\n                        <div class=\"col-xs-12\" *ngIf=\"tdExports\">\r\n                            <br />\r\n                            <div class=\"pull-right\" id=\"tdExports\">\r\n                                <ul class=\"list-inline\">\r\n                                    <li class=\"no-padding\">\r\n                                        <i class=\"fa fa-envelope-o fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgMail\" title=\"Send mail\" (click)=\"onSendMailIconClick($event)\"></i>&nbsp;\r\n                                    </li>\r\n                                    <li class=\"no-padding\">\r\n                                        <i class=\"fa fa-print fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgPrint\" title=\"Print\" (click)=\"onPrintClick($event)\"></i>&nbsp;\r\n                                    </li>\r\n                                    <li class=\"no-padding\">\r\n                                        <i class=\"fa fa-file-excel-o fa-bg-lg bg-blue\" aria-hidden=\"true\" id=\"imgExcel\" title=\"Excel Format\" (click)=\"onExportToExcelClick($event)\"></i>&nbsp;\r\n                                    </li>\r\n                                </ul>\r\n                            </div>\r\n                        </div>\r\n                        <form class=\"form-horizontal form-label-left\" novalidate>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Org Group ID </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpId}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupDD\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Report Type</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstRepType\" [id]=\"'ddlRep'\" [required]=\"true\" [(ngModel)]=\"selectedReportType\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddlRepTypeChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <!--<label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">User ID</label>-->\r\n                                    <label for=\"test_step_element_id\" class=\"control-label col-md-4 col-sm-4 col-xs-12\">User ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <!--<atpar-select [options]=\"lstUsers\" [id]=\"'ddllstUsers'\" [required]=\"true\" [(ngModel)]=\"selectedDropDownUserId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddlUsersIdChanged()\"></atpar-select>-->\r\n                                        <atpar-multiSelect [options]=\"lstUsers\" [(ngModel)]=\"selectedDropDownUserId\" [ngModelOptions]=\"{standalone: true}\" [id]=\"'selectedDropDownUserId'\" [required]=\"true\"></atpar-multiSelect>\r\n                                        <!--<atpar-listbox [options]=\"lstUsers\" [(ngModel)]=\"selectedDropDownUserId\" multiple=\"multiple\" [id]=\"'ddllstUsers'\" [required]=\"true\" checkbox=\"checkbox\" filter=\"filter\"  [style]=\"{'height':'100px','width':'150px','overflow':'scroll'}\" [ngModelOptions]=\"{standalone: true}\"></atpar-listbox>-->\r\n                                    </div>\r\n                                </div>\r\n\r\n                            </div>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">From Time</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstFromTime\" [required]=\"true\" [id]=\"'ddlFromTime'\" [(ngModel)]=\"selectedFromTime\" [ngModelOptions]=\"{standalone: true}\" [disabled]=\"blnFromToTimeInterval\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">To Time</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstToTime\" [required]=\"true\" [id]=\"'ddlToTime'\" [(ngModel)]=\"selectedToTime\" [ngModelOptions]=\"{standalone: true}\" [disabled]=\"blnFromToTimeInterval\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Interval</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstInterval\" [required]=\"true\" [id]=\"'ddlInterval'\" [(ngModel)]=\"selectedInterval\" [ngModelOptions]=\"{standalone: true}\" [disabled]=\"blnFromToTimeInterval\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n\r\n                            </div>\r\n\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Start Event</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstStartEvent\" [required]=\"true\" [id]=\"'ddlStartEvent'\" [(ngModel)]=\"selectedStartEvent\" [ngModelOptions]=\"{standalone: true}\" [disabled]=\"blnStartEndEvents\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">End Event</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstEndEvent\" [required]=\"true\" [id]=\"'ddlEndEvent'\" [(ngModel)]=\"selectedEndEvent\" [ngModelOptions]=\"{standalone: true}\" [disabled]=\"blnStartEndEvents\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n\r\n                            </div>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">From Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <p-calendar [showIcon]=\"true\" [id]=\"'fromDate'\" [(ngModel)]=\"fromDate\" [placeholder]=\"'From Date'\" [dateFormat]=\"'mm/dd/yy'\" [required]=\"true\" [readonlyInput]=\"true\" [ngModelOptions]=\"{standalone: true}\" [monthNavigator]=\"true\"  [yearNavigator]=\"true\"  yearRange=\"1950:2050\"></p-calendar>\r\n                                        <!--<p-calendar [showIcon]=\"true\" [id]=\"'FromDatePicker'\" [(ngModel)]=\"fromDate\" [required]=\"true\" [placeholder]=\"'From Date'\" [readonlyInput]=\"true\" (onFocus)=\"onfocusFromCalendar($event)\" [ngModelOptions]=\"{standalone: true}\" [dateFormat]=\"'mm/dd/yy'\"></p-calendar>-->\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">To Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <!--<p-calendar [showIcon]=\"true\" [id]=\"'ToDatePicker'\" [(ngModel)]=\"toDate\" [required]=\"true\" [placeholder]=\"'To Date'\" [readonlyInput]=\"true\" (onFocus)=\"onfocusToCalendar($event)\" [ngModelOptions]=\"{standalone: true}\" [dateFormat]=\"'mm/dd/yy'\"></p-calendar>-->\r\n                                        <p-calendar [showIcon]=\"true\" [id]=\"'toDate'\" [(ngModel)]=\"toDate\" [placeholder]=\"'To Date'\" [dateFormat]=\"'mm/dd/yy'\" [required]=\"true\" [readonlyInput]=\"true\" [ngModelOptions]=\"{standalone: true}\" [monthNavigator]=\"true\"  [yearNavigator]=\"true\"  yearRange=\"1950:2050\"></p-calendar>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12  col-md-4\" style=\"margin-top: 20px;\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"bindGrid()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"clear\"></div>\r\n\r\n                            <br />\r\n                        </form>\r\n                        <div class=\"clear\"></div>\r\n                        <div class=\"col-xs-12\" *ngIf=\"showGrid\">\r\n                            <div class=\"col-md-12 tab-btn\">\r\n                                <h3 class=\"title-hero\"> </h3>\r\n                                <div class=\"example-box-wrapper\">\r\n                                    <atpar-tabs [selectedTab]=\"activeTab\" (enableSelectedTab)=\"enableSelectedTab($event)\">\r\n\r\n                                        <atpar-tab tabTitle=\"Employee Productivity\" [active]=\"EmpProdTab\" (SelectedTab)=\"SelectedTab(tab)\">\r\n\r\n                                            <div class=\"form-group form-label-left col-md-8 col-md-offset-1 col-sm-12 col-xs-12\">\r\n                                                <span style=\"margin-left: 225px;\">D-Day</span>\r\n                                                <ul class=\"list-inline pull-in\" style=\"margin-left: 220px;\">\r\n\r\n                                                    <li>Day Packages <i class=\"fa fa-square\" style=\"color:#3391CE;\"></i></li>\r\n                                                    <li>'0'Time(hours) <i class=\"fa fa-square\" style=\"color:#48BF7D;\"></i></li>\r\n                                                </ul>\r\n                                                <div class=\"clearfix\"></div>\r\n\r\n                                                <div class=\"\">\r\n                                                    <atpar-chart type=\"bar\" [id]=\"'ChartIdEmpDay'\" [data]=\"data\" [options]=\"option\"></atpar-chart>\r\n\r\n                                                </div>\r\n\r\n                                            </div>\r\n                                            <div class=\"form-group form-label-left col-md-8 col-md-offset-1 col-sm-12 col-xs-12\">\r\n                                                <div class=\"clearfix\"></div>\r\n\r\n                                                <div class=\"\">\r\n\r\n                                                    <atpar-chart type=\"bar\" [id]=\"'ChartIdAvgEmpProd'\" [data]=\"dataAvg\" [options]=\"optionForAvg\"></atpar-chart>\r\n                                                </div>\r\n\r\n                                            </div>\r\n\r\n                                        </atpar-tab>\r\n                                        <atpar-tab tabTitle=\"Receive by Employee\" [active]=\"atpardbTab\" (SelectedTab)=\"SelectedTab(tab)\">\r\n\r\n                                            <div class=\"form-group form-label-left col-md-8 col-md-offset-1 col-sm-12 col-xs-12\">\r\n                                                <div class=\"clearfix\"></div>\r\n                                                <div class=\"\">\r\n                                                    <atpar-chart type=\"line\" [id]=\"'ChartIdForRecv1'\" [data]=\"dataForRecv1\" [options]=\"optionForRecv1\" *ngIf=\"blnGraph1\"></atpar-chart>\r\n                                                    <atpar-chart type=\"line\" [id]=\"'ChartIdForRecv2'\" [data]=\"dataForRecv2\" [options]=\"optionForRecv2\" *ngIf=\"blnGraph2\"></atpar-chart>\r\n                                                    <atpar-chart type=\"line\" [id]=\"'ChartIdForRecv3'\" [data]=\"dataForRecv3\" [options]=\"optionForRecv3\" *ngIf=\"blnGraph3\"></atpar-chart>\r\n                                                    <atpar-chart type=\"line\" [id]=\"'ChartIdForRecv4'\" [data]=\"dataForRecv4\" [options]=\"optionForRecv4\" *ngIf=\"blnGraph4\"></atpar-chart>\r\n                                                    <atpar-chart type=\"line\" [id]=\"'ChartIdForRecv5'\" [data]=\"dataForRecv5\" [options]=\"optionForRecv5\" *ngIf=\"blnGraph5\"></atpar-chart>\r\n                                                    <atpar-chart type=\"line\" [id]=\"'ChartIdForSummaryRecv'\" [data]=\"dataForSummaryRecv\" [options]=\"optionForSummaryRecv\"></atpar-chart>\r\n                                                </div>\r\n                                            </div>\r\n\r\n\r\n\r\n\r\n                                        </atpar-tab>\r\n                                        <atpar-tab tabTitle=\"Deliver by Employee\" [active]=\"atpardbTab\" (SelectedTab)=\"SelectedTab(tab)\">\r\n                                            <div class=\"form-group form-label-left col-md-8 col-md-offset-1 col-sm-12 col-xs-12\">\r\n                                                <div class=\"clearfix\"></div>\r\n                                                <div class=\"\">\r\n                                                    <atpar-chart type=\"line\" [id]=\"'ChartIdForDelv1'\" [data]=\"dataForDelv1\" [options]=\"optionForDeliver1\" *ngIf=\"blnGraph1\"></atpar-chart>\r\n                                                    <atpar-chart type=\"line\" [id]=\"'ChartIdForDelv2'\" [data]=\"dataForDelv2\" [options]=\"optionForDeliver2\" *ngIf=\"blnGraph2\"></atpar-chart>\r\n                                                    <atpar-chart type=\"line\" [id]=\"'ChartIdForDelv3'\" [data]=\"dataForDelv3\" [options]=\"optionForDeliver3\" *ngIf=\"blnGraph3\"></atpar-chart>\r\n                                                    <atpar-chart type=\"line\" [id]=\"'ChartIdForDelv4'\" [data]=\"dataForDelv4\" [options]=\"optionForDeliver4\" *ngIf=\"blnGraph4\"></atpar-chart>\r\n                                                    <atpar-chart type=\"line\" [id]=\"'ChartIdForDelv5'\" [data]=\"dataForDelv5\" [options]=\"optionForDeliver5\" *ngIf=\"blnGraph5\"></atpar-chart>\r\n                                                    <atpar-chart type=\"line\" [id]=\"'ChartIdForSummaryDeliver'\" [data]=\"dataForSummaryDeliver\" [options]=\"optionForSummaryDeliver\"></atpar-chart>\r\n\r\n                                                </div>\r\n                                            </div>\r\n                                        </atpar-tab>\r\n                                        <atpar-tab tabTitle=\"Dock Performance\" [active]=\"emailTab\" (SelectedTab)=\"SelectedTab(tab)\">\r\n                                            <div class=\"form-group form-label-left col-md-8 col-md-offset-1 col-sm-12 col-xs-12\">\r\n                                                <div class=\"clearfix\"></div>\r\n                                                <div class=\"\">\r\n                                                    <atpar-chart type=\"line\" [id]=\"'ChartIdForDock1'\" [data]=\"dataForDock1\" [options]=\"optionForDock1\" *ngIf=\"blnGraph1\"></atpar-chart>\r\n                                                    <atpar-chart type=\"line\" [id]=\"'ChartIdForDock2'\" [data]=\"dataForDock2\" [options]=\"optionForDock2\" *ngIf=\"blnGraph2\"></atpar-chart>\r\n                                                    <atpar-chart type=\"line\" [id]=\"'ChartIdForDock3'\" [data]=\"dataForDock3\" [options]=\"optionForDock3\" *ngIf=\"blnGraph3\"></atpar-chart>\r\n                                                    <atpar-chart type=\"line\" [id]=\"'ChartIdForDock4'\" [data]=\"dataForDock4\" [options]=\"optionForDock4\" *ngIf=\"blnGraph4\"></atpar-chart>\r\n                                                    <atpar-chart type=\"line\" [id]=\"'ChartIdForDock5'\" [data]=\"dataForDock5\" [options]=\"optionForDock5\" *ngIf=\"blnGraph5\"></atpar-chart>\r\n                                                    <atpar-chart type=\"line\" [id]=\"'ChartIdForSummaryDock'\" [data]=\"dataForSummaryDock\" [options]=\"optionForSummaryDock\"></atpar-chart>\r\n                                                </div>\r\n                                            </div>\r\n                                        </atpar-tab>\r\n\r\n\r\n\r\n                                    </atpar-tabs>\r\n                                </div>\r\n                                <!--<br />-->\r\n                                <div *ngIf=\"isVisible\" class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                    <button *ngIf=\"activeTab!='AtPar System' && activeTab!='Log'\" id=\"btnErpSystem\" class=\"btn btn-purple sbtn\" (click)=\"onSubmit()\">Submit &nbsp; <i class=\"fa fa-check\"></i></button>\r\n                                </div>\r\n                            </div>\r\n\r\n                        </div>\r\n                        <div class=\"container table-group-section\" *ngIf=\"showGridCycleTime\" style=\"padding-left:0!important;padding-right:0!important;margin:0 10px!important;\">\r\n                            <div class=\"col-xs-12\" style=\"padding-left:0!important;padding-right:0!important;\">\r\n                                <atpar-datatable [value]=\"lstFinalCycleData\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"recordsPerPageSize\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n                                    <p-column field=\"TRACKING_NBR\" header=\"Tracking #\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\">\r\n\r\n                                    </p-column>\r\n                                    <p-column field=\"DELIVER_FROM\" header=\"Delivery Person\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\">\r\n\r\n                                    </p-column>\r\n                                    <p-column field=\"CYCLE_TIME\" header=\"Cycle Time\" [style]=\"{'text-align':'right'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\">\r\n\r\n                                    </p-column>\r\n                                    <p-column field=\"HOURS\" header=\"Hours\" [style]=\"{'text-align':'right'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\">\r\n\r\n                                    </p-column>\r\n                                    <p-column field=\"MINS\" header=\"Minutes\" [style]=\"{'text-align':'right'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\">\r\n\r\n                                    </p-column>\r\n                                    <p-column field=\"SECONDS\" header=\"Seconds\" [style]=\"{'text-align':'right'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\">\r\n\r\n                                    </p-column>\r\n                                    <p-column field=\"TOT_HOURS\" header=\"Total Hours\" [style]=\"{'text-align':'right'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\">\r\n\r\n                                    </p-column>\r\n                                </atpar-datatable>\r\n                            </div>\r\n                            <div class=\"clear\"></div>\r\n                            <div class=\"container inner-table-group-section\" style=\"padding-left:0!important;padding-right:0!important;\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-8\" style=\"padding-left:0!important;\">\r\n                                    <atpar-datatable [value]=\"lstCycleHourDetails\" [responsive]=\"true\">\r\n                                        <p-column field=\"HOURSSUMMARY\" header=\"Less than (hours)\" [style]=\"{'width':'4%','text-align':'center'}\">\r\n\r\n                                        </p-column>\r\n                                        <p-column field=\"COUNTSUMMARY\" header=\"Count\" [style]=\"{'width':'4%','text-align':'right'}\">\r\n\r\n                                        </p-column>\r\n                                        <p-column field=\"COUNT_PERCENTSUMMARY\" header=\"%\" [style]=\"{'width':'4%','text-align':'right'}\">\r\n\r\n                                        </p-column>\r\n\r\n                                    </atpar-datatable>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4\" style=\"padding-right:0!important;\">\r\n                                    <br />\r\n                                    <br />\r\n                                    <span class=\"text-primary text-center\"><strong>Results</strong></span>\r\n                                    <br />\r\n                                    <atpar-datatable [value]=\"Results\" [responsive]=\"true\">\r\n                                        <p-column field=\"Count\" header=\"Count\" [style]=\"{'width':'4%','text-align':'right'}\">\r\n\r\n                                        </p-column>\r\n                                        <p-column field=\"AVG\" header=\"AVG\" [style]=\"{'width':'4%','text-align':'right'}\">\r\n\r\n                                        </p-column>\r\n                                        <p-column field=\"Min\" header=\"MIN\" [style]=\"{'width':'4%','text-align':'right'}\">\r\n\r\n                                        </p-column>\r\n                                        <p-column field=\"Max\" header=\"MAX\" [style]=\"{'width':'4%','text-align':'right'}\">\r\n\r\n                                        </p-column>\r\n                                        <p-column field=\"StDev\" header=\"ST.DEV\" [style]=\"{'width':'4%','text-align':'right'}\">\r\n\r\n                                        </p-column>\r\n\r\n                                    </atpar-datatable>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!--<mail-dialog header=\"Enter Recipient`s Email Address\" [width]=\"450\" (onClose)=\"closeMailPopup()\" [(visible)]=\"isMailDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\r\n    <div class=\"ui-grid ui-grid-responsive ui-fluid\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                <span>To : </span>\r\n            </div>\r\n            <div class=\"col-lg-6 col-md-6 col-sm-8 col-xs-8\">\r\n                <atpar-text [(ngModel)]=\"toMailAddr\" [name]=\"txtToMailAddr\" [id]=\"'txtToMailAddr'\"></atpar-text>\r\n            </div>\r\n            <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                <span><button class=\"btn btn-purple sbtn\" (click)=\"onSendMailClick()\">Send &nbsp;<i class=\"fa fa-share-square-o\" aria-hidden=\"true\"></i></button> </span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</mail-dialog>-->\r\n\r\n<mail-dialog header=\"Enter Recipient`s Email Address\" [width]=\"450\" (onClose)=\"closeMailPopup()\" [(visible)]=\"isMailDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\r\n    <div class=\"ui-grid ui-grid-responsive ui-fluid\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-1 col-md-1 col-sm-3 col-xs-3\" style=\"margin-top:2%;margin-right:-2%\">\r\n                <span style=\"font-weight:600\">To : </span>\r\n            </div>\r\n            <div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8\">\r\n                <atpar-text [(ngModel)]=\"toMailAddr\" [name]=\"txtToMailAddr\" [id]=\"'txtToMailAddr'\"></atpar-text>\r\n            </div>\r\n            <div class=\"col-lg-1 col-md-1 col-sm-3 col-xs-3\">\r\n                <span><button class=\"btn btn-purple sbtn\" (click)=\"onSendMailClick()\">Send &nbsp;<i class=\"fa fa-share-square-o\" aria-hidden=\"true\"></i></button> </span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</mail-dialog>\r\n\r\n<style>\r\n    .modal-content {\r\n        top: 50% !important;\r\n    }\r\n\r\n    ul.right-images li img {\r\n        width: 60px !important;\r\n        cursor: pointer;\r\n    }\r\n</style>";

/***/ }),

/***/ 1976:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px;\">\r\n                        <form class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Org Group ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" style=\"margin-top:10px\">{{orgGrpId}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupDD\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                        \r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Business Unit</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                       \r\n                                        <atpar-select [options]=\"lstFilteredBUnits\" [id]=\"'ddlOrg'\" [(ngModel)]=\"selectedBunit\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Trk# / PO# / Location</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"selectedParLocation\" [name]=\"txtLocationID1\"  [validations]=\"'alpha_numeric_underscore_hyphen_backslash_nospace'\" [id]=\"'LocationID1'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-6 col-md-4 col-sm-offset-5 col-md-offset-5\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"go_Click()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                               </div>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"col-xs-12 table-responsive\" *ngIf=\"showGrid\">\r\n                            <div class=\"container\">\r\n                                <atpar-datatable [value]=\"lstDBData\" [style]=\"{'width':'100%'}\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"recordsPerPageSize\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n                                    <p-column header=\"Select\" [style]=\"{'text-align':'center','width':'7%'}\">\r\n                                        <template pTemplate=\"filter\" let-col>\r\n                                            <ul class=\"list-inline\">\r\n                                                <li>\r\n                                                    <a style=\"cursor:pointer\" (click)=\"checkAll()\">All</a>\r\n                                                </li> |\r\n                                                <li>\r\n                                                    <a style=\"cursor:pointer\" (click)=\"uncheckAll()\">None</a>\r\n                                                </li>\r\n                                            </ul>\r\n                                        </template>\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <atpar-switch (change)=\"unlockRow($event,ven)\" [(ngModel)]=\"ven.Status\"></atpar-switch>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"TRACKINGNO_POID_LOC\" header=\"Trk# / PO# / Location\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"CURRENT_EVENT\" header=\"Current Event\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'12%'}\"></p-column>\r\n                                    <p-column field=\"DOWNLOAD_DT_TIME\" header=\"Date / Time\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'14%'}\"></p-column>\r\n                                    <p-column field=\"USERNAME\" header=\"User ID\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                </atpar-datatable>\r\n                            </div>\r\n                            <br>\r\n                            <div class=\"col-xs-12 col-sm-12 col-md-6 col-sm-offset-5 col-md-offset-5\">\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"UnlockSelectedRecords()\">Unlock &nbsp;<i class=\"fa fa-unlock\"></i></button>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"content-section implementation\">\r\n                            <atpar-confirmdialog header=\"Confirmation\" icon=\"fa fa-question-circle\" width=\"425\"></atpar-confirmdialog>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ }),

/***/ 1977:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <atpar-growl [value]=\"growlMessage\" sticky=“sticky”></atpar-growl>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0 0 10px 0;\">\r\n                        <form class=\"form-horizontal form-label-left\" *ngIf=\"searchFrom\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\" *ngIf=\"lblShowOrgGroupLabel\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Org Group ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label class=\"control-label lbl-left\">{{orgGrpId}}</label>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\" *ngIf=\"ddlShowOrgGroupId\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Org Group ID </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\"\r\n                                                      [(ngModel)]=\"orgGroupIdNgModel\" [ngModelOptions]=\"{standalone: true}\"\r\n                                                      filter=\"filter\" *ngIf=\"ddlShowOrgGroupId\" (onChange)=\"ddlOrgGrpIdChanged($event)\" [name]=\"ddllstOrgGroups\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Location</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"searchLocationNgModel\" [name]=\"searchLocationNgModel\" *ngIf=\"!isEditMode\"\r\n                                                    [id]=\"'searchLocationNgModel'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n\r\n\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Description</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"searchDescriptionNgModel\" [name]=\"searchDescriptionNgModel\" *ngIf=\"!isEditMode\"\r\n                                                    [id]=\"'searchDescriptionNgModel'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"btn_go()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"add()\">Create &nbsp;<i class=\"fa fa-plus\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"col-xs-12\" *ngIf=\"showGrid\">\r\n                            <div class=\"container\">\r\n                                <atpar-datatable [value]=\"lstGridData\" [style]=\"{'width':'100%'}\" [paginator]=\"true\" #dt [pageLinks]=\"3\" [rows]=\"pageSize\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n                                    <p-column header=\"Action\" field=\"DROP_OFF_LOCATION_ID\" [style]=\"{'width':'4%','text-align':'center'}\">\r\n                                        <template let-col let-rowData=\"rowData\" pTemplate type=\"body\">\r\n\r\n                                            <i class=\"fa fa-pencil fa-bg bg-red\" title=\"Edit\" (click)=\"editdropOffLocation(rowData)\" style=\"cursor:pointer\"></i>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column header=\"Location\" field=\"DROP_OFF_LOCATION_ID\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'40%'}\">\r\n                                    </p-column>\r\n                                    <p-column field=\"LOCATION_DESC\" header=\"Description\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n                                    <p-column field=\"STATUS\" header=\"Status\" [filter]=\"true\" [style]=\"{'width': '8%','overflow':'visible','text-align':'center'}\" filterMatchMode=\"equals\">\r\n                                        <template pTemplate=\"filter\" let-col>\r\n                                            <atpar-select-grid [options]=\"ddlStatusType\" [(ngModel)]=\"statusType\" [style]=\"{'width':'100%'}\" [id]=\"'ddlddlStatusType'\" [required]=\"false\" (onChange)=\"dataFilter($event.value,col.field,col.filterMatchMode)\"></atpar-select-grid>\r\n                                        </template>\r\n                                        <template let-col let-droplocationData=\"rowData\" pTemplate=\"body\">\r\n                                            <atpar-switch [checked]=droplocationData[col.field] [(ngModel)]=\"droplocationData[col.field]\" name=\"changeStatus\" (click)=\"changeStatus(droplocationData)\"></atpar-switch>\r\n                                        </template>\r\n                                    </p-column>\r\n\r\n                                </atpar-datatable>\r\n                            </div>\r\n                        </div>\r\n                        <form class=\"form-horizontal form-label-left\" *ngIf=\"addEditFrom\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"form-group\" *ngIf=\"lblShowOrgGroupLabel\">\r\n                                    <label for=\"industry\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Org Group ID</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <label class=\"control-label lbl-left\">{{orgGrpId}}</label>\r\n                                    </div>\r\n\r\n                                </div>\r\n                                <div class=\"form-group\" *ngIf=\"ddlShowOrgGroupId\">\r\n                                    <label for=\"industry\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Org Group ID</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\"\r\n                                                      [(ngModel)]=\"orgGroupIdNgModel\" [ngModelOptions]=\"{standalone: true}\"\r\n                                                      filter=\"filter\" *ngIf=\"ddlShowOrgGroupId\" (onChange)=\"ddlOrgGrpIdChanged($event)\" [name]=\"ddllstOrgGroups\"\r\n                                                      [disabled]=\"orgIdDisabled\" [isfocus]=\"ddlShowOrgGroupId\"></atpar-select>\r\n\r\n                                    </div>\r\n\r\n                                </div>\r\n\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"industry\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Location</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-text [(ngModel)]=\"deliversetuplocDetails.DROP_OFF_LOCATION_ID\" [name]=\"saveLocationsNgModel\"\r\n                                                    [id]=\"'saveLocationsNgModel'\"\r\n                                                    [validations]=\"'mandatory,alpha_numeric_hyphen_underscore_dot_tilde_verticalBar,max=20'\" [isFocused]=\"'true'\"\r\n                                                    (bindModelDataChange)=\"bindModelDataChange($event)\"\r\n                                                    [ngModelOptions]=\"{standalone: true}\" [title]=\"'Use only A-Z,a-z,0-9.-_,|,~ max 20 characters'\" *ngIf=\"lblShowOrgGroupLabel\"></atpar-text>\r\n                                        <atpar-text [(ngModel)]=\"deliversetuplocDetails.DROP_OFF_LOCATION_ID\" [name]=\"saveLocationsNgModel\"\r\n                                                    [id]=\"'saveLocationsNgModel'\"\r\n                                                    [validations]=\"'mandatory,alpha_numeric_hyphen_underscore_dot_tilde_verticalBar,max=20'\"\r\n                                                    (bindModelDataChange)=\"bindModelDataChange($event)\"\r\n                                                    [ngModelOptions]=\"{standalone: true}\" [title]=\"'Use only A-Z,a-z,0-9.-_,|,~ max 20 characters'\" *ngIf=\"!lblShowOrgGroupLabel\"></atpar-text>\r\n\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"industry\" class=\"control-label col-md-3 col-sm-3 col-xs-12\">Description</label>\r\n                                    <div class=\"col-md-3 col-sm-3 col-xs-12\">\r\n                                        <atpar-text [(ngModel)]=\"deliversetuplocDetails.LOCATION_DESC\" [name]=\"saveDescriptionNgModel\" *ngIf=\"!isEditMode\"\r\n                                                    [id]=\"'saveDescriptionNgModel'\" \r\n                                                     [validations]=\"'max=254'\"\r\n                                                    [ngModelOptions]=\"{standalone: true}\" [title]=\"'Any character A-Z,a-z,0-9,!,#,$... max 254 characters'\"></atpar-text>\r\n\r\n\r\n\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-6 col-md-4 col-sm-offset-5 col-md-offset-5\">\r\n                                    <button class=\"btn btn-purple small\" (click)=\"saveOrUpdate()\" *ngIf=\"mode=='Add'\" [disabled]=\"saveAndUpdateButton\">Save &nbsp;<i class=\"fa fa-floppy-o\"></i></button> \r\n                                    <button class=\"btn btn-purple small\" (click)=\"saveOrUpdate()\" *ngIf=\"mode=='Edit'\" [disabled]=\"saveAndUpdateButton\">Update &nbsp;<i class=\"fa fa-check\"></i></button>\r\n                                    <button class=\"btn btn-purple small\" (click)=\"close()\"><i class=\"fa fa-arrow-left\"></i>&nbsp; Go Back</button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ }),

/***/ 1978:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\" *ngIf=\"true\">\r\n            <br>    \r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0;\">\r\n                        <form class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                        <label for=\"\" class=\"control-label lbl-left col-xs-12 col-sm-6 col-md-4\">Org Group ID </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpIdData}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" *ngIf=\"blnShowOrgGroupsDropdown\"  (onChange)=\"ddlOrgGrpIdChanged()\"\r\n                                                      [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGrpId\" \r\n                                                      [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-3 form-group\">\r\n                                        <button class=\"btn btn-purple sbtn\" (click)=\"btnGoClick()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>                              \r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n\r\n                        <div class=\"col-xs-12 table-responsive\" *ngIf=\"isVisible\" >\r\n                            <div class=\"container\">\r\n                                <atpar-datatable [value]=\"lstDBData\" #dt [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"recordsPerPageSize\"\r\n                                                 [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [responsive]=\"true\">\r\n\r\n                                    <p-column [style]=\"{'width':'7%', 'text-align':'center'}\" header=\"Select\">\r\n                                        <template pTemplate=\"filter\" let-col>\r\n                                            <ul class=\"list-inline  li-all-none\">\r\n                                                <li>\r\n                                                    <span (click)=\"checkAll()\" style=\"cursor:pointer\">All</span>\r\n                                                </li> |\r\n                                                <li>\r\n                                                    <span (click)=\"unCheckAll()\" style=\"cursor:pointer\">None</span>\r\n                                                </li>\r\n                                            </ul>\r\n                                        </template>\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <atpar-switch id=\"chkvalue\" (change)=\"selectedRow(ven,$event)\" [(ngModel)]=\"ven.checkvalue\"></atpar-switch>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column [style]=\"{'width':'20%'}\" field=\"SHIPTO_ID\" header=\"ShipTo ID\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n                                    <p-column [style]=\"{'width':'40%'}\" field=\"DESCR\" header=\"ShipTo Name\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n                                    <p-column [style]=\"{'width':'20%'}\" field=\"ORG_ID\" header=\"Business Unit\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n                                </atpar-datatable>\r\n                            </div>\r\n                            <br>\r\n                            <div class=\"col-xs-12 col-md-4 col-md-offset-5 col-sm-6 col-sm-offset-5\">\r\n                                <button class=\"btn btn-purple sbtn\" id=\"btnsubmitForGrid\" (click)=\"btn_Submit($event)\">Submit &nbsp;<i class=\"fa fa-check\"></i> </button>                             \r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n";

/***/ }),

/***/ 1979:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <atpar-user-parameters [appId]=\"dlvrAppId\"></atpar-user-parameters>    \r\n</div>";

/***/ }),

/***/ 1980:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <router-outlet></router-outlet>\r\n</div>";

/***/ })

});
//# sourceMappingURL=12.601fce7cdc00a672fc7a.chunk.js.map