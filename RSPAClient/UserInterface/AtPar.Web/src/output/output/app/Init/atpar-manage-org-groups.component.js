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
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var router_1 = require("@angular/router");
var linq_es5_1 = require("linq-es5");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var mt_atpar_org_group_bunits_1 = require("../entities/mt_atpar_org_group_bunits");
var MT_ATPAR_SECURITY_AUDIT_1 = require("../Entities/MT_ATPAR_SECURITY_AUDIT");
var mt_atpar_org_group_parameters_1 = require("../entities/mt_atpar_org_group_parameters");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_manage_org_groups_service_1 = require("./atpar-manage-org-groups.service");
var Validators_1 = require("../components/atpartext/Validators");
var datatable_1 = require("../components/datatable/datatable");
var AtParConstants_1 = require("../Shared/AtParConstants");
var routepath_1 = require("../AtPar/Menus/routepath");
var ManageOrgGroupsComponent = (function () {
    function ManageOrgGroupsComponent(leftBarAnimationsewrvice, router, route, spnrService, httpService, mngOrgGroupsService, commonService, atParConstant) {
        this.leftBarAnimationsewrvice = leftBarAnimationsewrvice;
        this.router = router;
        this.route = route;
        this.spnrService = spnrService;
        this.httpService = httpService;
        this.mngOrgGroupsService = mngOrgGroupsService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.lnkbtnBUnit = false;
        this.lnkbtnParams = false;
        this.MOG = true;
        this.pop = false;
        this.menu = true;
        this.orgGroupGrd = false;
        this.deviceTokenEntry = [];
        this.statusMsgs = [];
        //string variables
        this.strUserID = undefined;
        this.pProfile = "";
        this.orgGroupId = "";
        this.orgGroupName = "";
        this.selectedorgGrpId = "";
        this.selectedorgGrpName = "";
        this.txtOrgGrpId = "";
        this.txtOrgGrpName = "";
        this.strOrgGrpID = "";
        this.strAudit = "";
        this.strAppId = "";
        this.lblOrgGrpId = "";
        this.strOldGrpName = "";
        this.pageDisplayName = ""; //Manager Org Groups
        //boolean variables  
        this.divOrgParamsData = false;
        this.buttonEnableDisable = true;
        this.blnlblOrgGrpId = false;
        this.grdMngOrgGrpBunits = false;
        this.btnMngOrgGrpButton = true;
        this.statusCode = -1;
        this.statusType = -1;
        this.defaultNoOfRecs = 0;
        this.blnsortbycolumn = true;
        this.sortCol = "";
        this.dataCheckedSorting = [];
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    ManageOrgGroupsComponent.prototype.homeurl = function () {
        this.leftBarAnimationsewrvice.isHomeClicked = false;
        this.leftBarAnimationsewrvice.isHide();
        this.router.navigate(['atpar']);
    };
    ManageOrgGroupsComponent.prototype.clicked = function (event) {
        try {
            this.statusMsgs = [];
            event.preventDefault();
            var target = event.target || event.srcElement || event.currentTarget;
            var idAttr = target.attributes.id;
            var value = idAttr.nodeValue;
            if (value == "lnkbtnBUnit") {
                this.lnkbtnBUnit = true;
                this.lnkbtnParams = false;
                this.MOG = false;
            }
            else if (value == "lnkbtnParams") {
                this.lnkbtnParams = true;
                this.lnkbtnBUnit = false;
                this.MOG = false;
            }
            else if (value == "add") {
                this.breadCrumbMenu.SUB_MENU_NAME = 'Create Org Group';
                this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                this.txtOrgGrpId = "";
                this.txtOrgGrpName = "";
                this.buttonEnableDisable = true;
                this.txtOrgGrpNameStatus = null;
                this.txtOrgGrpIdStatus = null;
                this.blnlblOrgGrpId = false;
                this.menu = false;
                this.pop = true;
                this.orgGroupGrd = false;
            }
            else if (value == "close") {
                this.breadCrumbMenu.SUB_MENU_NAME = '';
                this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                this.menu = true;
                this.pop = false;
                this.orgGroupGrd = false;
            }
            else {
                this.pageDisplayName = ""; //Manager Org Groups
                this.lnkbtnBUnit = false;
                this.lnkbtnParams = false;
                this.MOG = true;
                this.menu = true;
                this.breadCrumbMenu.SUB_MENU_NAME = '';
                this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "clicked");
        }
    };
    ManageOrgGroupsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.intAppId = parseInt(this.appId);
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.mngOrgGrpBunitsLst = new Array();
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        return [4 /*yield*/, this.page_Load()];
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
    ManageOrgGroupsComponent.prototype.page_Load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.selectedorgGrpId = "";
                        this.selectedorgGrpName = "";
                        this.strUserID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        //'Give Application and menu id's here
                        if (typeof this.appId == 'undefined') {
                            this.intAppId = 0;
                        }
                        else {
                            this.intAppId = parseInt(this.appId);
                        }
                        this.orgGroupGrd = false;
                        return [4 /*yield*/, this.checkAuditAllowed()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "page_Load");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageOrgGroupsComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var screenName, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        this.strAudit = "";
                        this.spnrService.start();
                        screenName = localStorage.getItem("menuCode");
                        if (screenName == null) {
                            screenName = "mt_atpar_manage_org_groups.aspx";
                        }
                        return [4 /*yield*/, this.commonService.getAuditAllowed(this.intAppId.toString(), screenName.toString()).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.strAudit = data.Data.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "checkAuditAllowed");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageOrgGroupsComponent.prototype.bindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (this.dataTableComponent != null) {
                            this.dataTableComponent.reset();
                        }
                        this.statusMsgs = [];
                        this.orgGroupId = this.selectedorgGrpId;
                        this.orgGroupName = this.selectedorgGrpName;
                        this.spnrService.start();
                        return [4 /*yield*/, this.commonService.getOrgGrpIDs(this.orgGroupId, this.orgGroupName, this.deviceTokenEntry).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.orgGroupLst = res.json().DataList,
                                    _this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (_this.orgGroupLst == null || _this.orgGroupLst.length == 0) {
                                            _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: "No data for the search criteria entered" });
                                        }
                                        else {
                                            for (var i = 0; i < _this.orgGroupLst.length; i++) {
                                                _this.orgGroupLst[i].ORG_GROUP_NAME = _this.orgGroupLst[i].ORG_GROUP_NAME.replace(/\%20/g, ' ');
                                            }
                                            _this.orgGroupGrd = true;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        this.spnrService.start();
                        return [4 /*yield*/, this.commonService.getMyPreferences("RECORDS_PER_PAGE", this.deviceTokenEntry).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.defaultNoOfRecs = parseInt(data.DataVariable.toString());
                                _this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (_this.defaultNoOfRecs == 0) {
                                            if (_this.orgGroupLst.length > 0) {
                                            }
                                            else {
                                            }
                                        }
                                        else {
                                        }
                                        _this.pProfile = _this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID];
                                        _this.orgGroupId = _this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                                        //To Disable BUnits Link for "All" OrgGroupID
                                        for (var i = 0; i <= _this.orgGroupLst.length - 1; i++) {
                                            var orgId = _this.orgGroupLst[i].ORG_GROUP_ID; //this.orgId
                                            if (orgId == "All") {
                                                if (_this.pProfile != undefined) {
                                                    if (_this.pProfile != "admin" || _this.orgGroupId != "All") {
                                                    }
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "bindDataGrid");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageOrgGroupsComponent.prototype.btnGo_Clicked = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // lblUpdateFlag.Text = "N";
                        this.orgGroupGrd = false;
                        return [4 /*yield*/, this.bindDataGrid()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "btnGo_Clicked");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageOrgGroupsComponent.prototype.searchAutoCompleteOrgID = function (event) {
        try {
            this.statusMsgs = [];
            var query = event.query;
            if (this.orgGroupLst != null && this.orgGroupLst.length > 0) {
                this.orgGrpIdSearchLst = this.orgGroupLst;
                this.orgGrpIdSearchLst = this.filterOrgGroupIds(query, this.orgGrpIdSearchLst);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "searchAutoCompleteOrgID");
        }
    };
    ManageOrgGroupsComponent.prototype.filterOrgGroupIds = function (query, orgGroupIds) {
        try {
            var filtered = [];
            if (query == "%") {
                if (orgGroupIds != null && orgGroupIds.length > 0) {
                    for (var i = 0; i < orgGroupIds.length; i++) {
                        var orgGrpIdsvalue = orgGroupIds[i];
                        filtered.push(orgGrpIdsvalue.ORG_GROUP_ID);
                    }
                }
            }
            else {
                if (query.length >= 1) {
                    if (orgGroupIds != null && orgGroupIds.length > 0) {
                        for (var i = 0; i < orgGroupIds.length; i++) {
                            var orgGrpIdsvalue = orgGroupIds[i];
                            if (orgGrpIdsvalue.ORG_GROUP_ID.toString().toUpperCase().indexOf(query.toString().toUpperCase()) == 0) {
                                filtered.push(orgGrpIdsvalue.ORG_GROUP_ID);
                            }
                        }
                    }
                }
            }
            return filtered;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "filterOrgGroupIds");
        }
    };
    ManageOrgGroupsComponent.prototype.searchAutoCompleteOrgName = function (event) {
        try {
            var query = event.query;
            if (this.orgGroupLst != null && this.orgGroupLst.length > 0) {
                this.orgGrpIdSearchLst = this.orgGroupLst;
                this.orgGrpIdSearchLst = this.filterOrgGroupIds(query, this.orgGrpIdSearchLst);
            }
            //this.orgGroNameSearchLst = this.orgGroupLst;
            //this.orgGroNameSearchLst = this.filterOrgGrpNames(query, this.orgGroNameSearchLst)
        }
        catch (ex) {
            this.clientErrorMsg(ex, "searchAutoCompleteOrgName");
        }
    };
    ManageOrgGroupsComponent.prototype.filterOrgGrpNames = function (query, orgGrpNames) {
        try {
            var filtered = [];
            if (query == "%") {
                for (var i = 0; i < orgGrpNames.length; i++) {
                    var orgGrpNameValue = orgGrpNames[i];
                    filtered.push(orgGrpNameValue.ORG_GROUP_NAME);
                }
            }
            else {
                if (query.length >= 1) {
                    for (var i = 0; i < orgGrpNames.length; i++) {
                        var orgGrpNameValue = orgGrpNames[i];
                        if (orgGrpNameValue.ORG_GROUP_NAME.toString().toUpperCase().indexOf(query.toString().toUpperCase()) == 0) {
                            filtered.push(orgGrpNameValue.ORG_GROUP_NAME);
                        }
                    }
                }
            }
            return filtered;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "filterOrgGrpNames");
        }
    };
    ManageOrgGroupsComponent.prototype.btn_SaveOrgGroupsInfo = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var statusType_1, statusMessags_1, _a, screenName, msg, ex_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 15, , 16]);
                        this.statusMsgs = [];
                        if (!!this.blnlblOrgGrpId) return [3 /*break*/, 4];
                        if (!(this.txtOrgGrpId != "" && this.txtOrgGrpName != "")) return [3 /*break*/, 2];
                        this.spnrService.start();
                        return [4 /*yield*/, this.mngOrgGroupsService.saveOrgGroupsInfo(this.txtOrgGrpId, this.txtOrgGrpName, "", this.strUserID).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.statusCode = response.StatusCode;
                                _this.spnrService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupGrd = false;
                                        var msg = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Org Group").replace("2%", _this.txtOrgGrpId);
                                        _this.statusMsgs.push({
                                            severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg
                                        });
                                        _this.txtOrgGrpId = "";
                                        _this.txtOrgGrpName = "";
                                        _this.buttonEnableDisable = true;
                                        _this.txtOrgGrpNameStatus = null;
                                        _this.txtOrgGrpIdStatus = null;
                                        _this.blnlblOrgGrpId = false;
                                        document.getElementById('txtOrgGrpId').focus();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        var s = response.StatusMessage.includes("(OrgID)");
                                        if (s == true) {
                                            response.StatusMessage = response.StatusMessage.replace('Org ID', 'Org');
                                            response.StatusMessage = response.StatusMessage.replace('(OrgID)', _this.txtOrgGrpId);
                                        }
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION) {
                                            response.StatusMessage = "Organization GroupID " + _this.txtOrgGrpId + " already exists ";
                                            _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        }
                                        else {
                                            _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        }
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _b.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        if (this.txtOrgGrpId == "" && this.txtOrgGrpName != "") {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter Org Group ID" });
                        }
                        else if (this.txtOrgGrpName == "" && this.txtOrgGrpId != "") {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: " Please enter Org Group Name" });
                        }
                        else {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter Org Group Id and Org Group Name" });
                        }
                        _b.label = 3;
                    case 3: return [3 /*break*/, 14];
                    case 4:
                        statusType_1 = null;
                        statusMessags_1 = null;
                        if (!(this.txtOrgGrpName != "")) return [3 /*break*/, 6];
                        this.spnrService.start();
                        return [4 /*yield*/, this.mngOrgGroupsService.updateOrgGroupsInfo(this.txtOrgGrpName, this.lblOrgGrpId, this.strUserID).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.statusCode = response.StatusCode;
                                statusType_1 = response.StatType;
                                statusMessags_1 = response.StatusMessage;
                                document.getElementById('txtOrgGrpName').focus();
                                _this.spnrService.stop();
                            })];
                    case 5:
                        _b.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 7];
                    case 6:
                        if (this.txtOrgGrpName == "") {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: " Please enter Org Group Name" });
                        }
                        _b.label = 7;
                    case 7:
                        if (!(statusType_1 != null)) return [3 /*break*/, 14];
                        _a = statusType_1;
                        switch (_a) {
                            case AtParEnums_1.StatusType.Success: return [3 /*break*/, 8];
                            case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 11];
                            case AtParEnums_1.StatusType.Error: return [3 /*break*/, 12];
                            case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 13];
                        }
                        return [3 /*break*/, 14];
                    case 8:
                        screenName = localStorage.getItem("menuCode");
                        this.auditSecurityLst = new Array();
                        if (!(this.strOldGrpName != this.txtOrgGrpName)) return [3 /*break*/, 10];
                        this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                        this.auditSecurity.OLD_VALUE = this.strOldGrpName;
                        this.auditSecurity.NEW_VALUE = this.txtOrgGrpName;
                        this.auditSecurity.FIELD_NAME = "ORG_GROUP_NAME";
                        this.auditSecurity.KEY_1 = this.lblOrgGrpId;
                        this.auditSecurity.KEY_2 = "";
                        this.auditSecurity.KEY_3 = "";
                        this.auditSecurity.KEY_4 = "";
                        this.auditSecurity.KEY_5 = "";
                        this.auditSecurityLst.push(this.auditSecurity);
                        this.spnrService.start();
                        return [4 /*yield*/, this.commonService.insertAuditData(this.auditSecurityLst, this.strUserID, screenName).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spnrService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10:
                        this.buttonEnableDisable = false;
                        msg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Org Group").replace("2%", this.lblOrgGrpId);
                        this.statusMsgs.push({
                            severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg
                        });
                        return [3 /*break*/, 14];
                    case 11:
                        {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: statusMessags_1 });
                            return [3 /*break*/, 14];
                        }
                        _b.label = 12;
                    case 12:
                        {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: statusMessags_1 });
                            return [3 /*break*/, 14];
                        }
                        _b.label = 13;
                    case 13:
                        {
                            if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION) {
                                statusMessags_1 = "Organization GroupID " + this.lblOrgGrpId + " already exists ";
                                this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: statusMessags_1 });
                            }
                            else {
                                this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: statusMessags_1 });
                            }
                            return [3 /*break*/, 14];
                        }
                        _b.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        ex_6 = _b.sent();
                        this.clientErrorMsg(ex_6, "btn_SaveOrgGroupsInfo");
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    ManageOrgGroupsComponent.prototype.lnkbtnBUnit_Click = function (event, selectedRowData) {
        return __awaiter(this, void 0, void 0, function () {
            var target, idAttr, value, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Assign Business Units';
                        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.pageDisplayName = "->Manage Org Group Business Units";
                        this.statusMsgs = [];
                        event.preventDefault();
                        target = event.target || event.srcElement || event.currentTarget;
                        idAttr = target.attributes.id;
                        value = idAttr.nodeValue;
                        if (value == "lnkbtnBUnit") {
                            this.lnkbtnBUnit = true;
                            this.lnkbtnParams = false;
                            this.MOG = false;
                        }
                        this.strOrgGrpID = selectedRowData.ORG_GROUP_ID;
                        return [4 /*yield*/, this.bindManageOrgGrpBunits()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "lnkbtnBUnit_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageOrgGroupsComponent.prototype.bindManageOrgGrpBunits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var sortedCheckedData_1, sortedUnCheckedData_1, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.dataCheckedSorting = [];
                        this.dataUncheckedSorting = [];
                        this.statusMsgs = [];
                        this.btnMngOrgGrpButton = false;
                        this.grdMngOrgGrpBunits = false;
                        this.mngOrgGrpBunitsLst = new Array();
                        this.spnrService.start();
                        return [4 /*yield*/, this.commonService.getOrgBUnits(this.strOrgGrpID, this.deviceTokenEntry).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.orgGroupBunitsLst = res.json().DataList;
                                _this.lstgridfilterData = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (_this.orgGroupBunitsLst != null && _this.orgGroupBunitsLst.length > 0) {
                                            _this.grdMngOrgGrpBunits = true;
                                            _this.btnMngOrgGrpButton = true;
                                            for (var i = 0; i < _this.orgGroupBunitsLst.length; i++) {
                                                _this.mngOrgGrpBunitEntity = new mt_atpar_org_group_bunits_1.MT_ATPAR_ORG_GROUP_BUNITS();
                                                _this.mngOrgGrpBunitEntity.BUSINESS_UNIT = _this.orgGroupBunitsLst[i].BUSINESS_UNIT.toString().trim();
                                                if (_this.orgGroupBunitsLst[i].CHK_VALUE == "1") {
                                                    _this.mngOrgGrpBunitEntity.CHK_VALUE = true;
                                                    _this.dataCheckedSorting.push(_this.orgGroupBunitsLst[i]);
                                                }
                                                else {
                                                    _this.mngOrgGrpBunitEntity.CHK_VALUE = false;
                                                    _this.dataUncheckedSorting.push(_this.orgGroupBunitsLst[i]);
                                                }
                                                if (_this.orgGroupBunitsLst[i].BU_TYPE == "I") {
                                                    _this.mngOrgGrpBunitEntity.BU_TYPE = "Inventory";
                                                }
                                                else {
                                                    _this.mngOrgGrpBunitEntity.BU_TYPE = "Purchasing";
                                                }
                                                _this.mngOrgGrpBunitEntity.LAST_UPDATE_DATE = _this.orgGroupBunitsLst[i].LAST_UPDATE_DATE;
                                                _this.mngOrgGrpBunitEntity.LAST_UPDATE_USERID = _this.orgGroupBunitsLst[i].LAST_UPDATE_USERID;
                                                _this.mngOrgGrpBunitEntity.ORG_GROUP_ID = _this.orgGroupBunitsLst[i].ORG_GROUP_ID;
                                                _this.mngOrgGrpBunitEntity.CHK_PrvStatus = _this.orgGroupBunitsLst[i].CHK_VALUE;
                                                _this.mngOrgGrpBunitEntity.Description = _this.orgGroupBunitsLst[i].Description.toString().trim();
                                                _this.mngOrgGrpBunitsLst.push(_this.mngOrgGrpBunitEntity);
                                            }
                                            sortedCheckedData_1 = [];
                                            sortedUnCheckedData_1 = [];
                                            sortedCheckedData_1 = linq_es5_1.asEnumerable(_this.mngOrgGrpBunitsLst).OrderByDescending(function (x) { return x.BUSINESS_UNIT; }).ToArray(); //.OrderBy(x => x.Description).ToArray();
                                            sortedUnCheckedData_1 = linq_es5_1.asEnumerable(sortedCheckedData_1).OrderBy(function (x) { return x.CHK_VALUE; }).ToArray();
                                            _this.mngOrgGrpBunitsLst = new Array();
                                            _this.mngOrgGrpBunitsLst = sortedUnCheckedData_1.reverse(); //.concat(sortedCheckedData.reverse());
                                        }
                                        else {
                                            _this.btnMngOrgGrpButton = true;
                                            _this.grdMngOrgGrpBunits = false;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.btnMngOrgGrpButton = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.grdMngOrgGrpBunits = false;
                                        _this.btnMngOrgGrpButton = true;
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.btnMngOrgGrpButton = true;
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        sortedCheckedData_1 = [];
                        sortedUnCheckedData_1 = [];
                        this.spnrService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "bindManageOrgGrpBunits");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageOrgGroupsComponent.prototype.orgGrpBUnitChkboxChanged = function (lstData, event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    if (event != null && event != undefined) {
                        lstData.CHK_VALUE = event;
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "orgGrpBUnitChkboxChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    ManageOrgGroupsComponent.prototype.updateMngOrgGrpBunitslst = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var boolAudit, intCnount, screenName, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.statusMsgs = [];
                        boolAudit = false;
                        this.auditSecurityLst = new Array();
                        for (intCnount = 0; intCnount <= this.mngOrgGrpBunitsLst.length - 1; intCnount++) {
                            //Check once
                            //if (this.chkbCntrlValue != null) {
                            if (this.mngOrgGrpBunitsLst[intCnount].CHK_VALUE != null) {
                                //intIndex = ((Label)_with1.FindControl("rowIndex")).Text;
                                //update only when changes are done to the datagrid  this.chkbCntrlValue == "Y"
                                if (this.mngOrgGrpBunitsLst[intCnount].CHK_VALUE.toString() == "true") {
                                    this.mngOrgGrpBunitsLst[intCnount].CHK_VALUE = "1";
                                    if (this.mngOrgGrpBunitsLst[intCnount].CHK_VALUE.toString() != this.mngOrgGrpBunitsLst[intCnount].CHK_PrvStatus.toString()) {
                                        boolAudit = true;
                                        this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                        this.auditSecurity.KEY_1 = this.orgGroupId; //Check Once   dRowAudit("KEY_1") = strOrgId;
                                        this.auditSecurity.KEY_2 = this.mngOrgGrpBunitsLst[intCnount].BUSINESS_UNIT;
                                        this.auditSecurity.KEY_3 = "";
                                        this.auditSecurity.KEY_4 = "";
                                        this.auditSecurity.KEY_5 = "";
                                        this.auditSecurity.FIELD_NAME = "BUSINESS_UNIT";
                                        this.auditSecurity.OLD_VALUE = "N";
                                        this.auditSecurity.NEW_VALUE = "Y";
                                        this.auditSecurityLst.push(this.auditSecurity);
                                    }
                                }
                                else {
                                    this.mngOrgGrpBunitsLst[intCnount].CHK_VALUE = "0";
                                    if (this.mngOrgGrpBunitsLst[intCnount].CHK_VALUE.toString() != this.mngOrgGrpBunitsLst[intCnount].CHK_PrvStatus.toString()) {
                                        boolAudit = true;
                                        this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                        this.auditSecurity.KEY_1 = this.orgGroupId; //Check Once   dRowAudit("KEY_1") = strOrgId;
                                        this.auditSecurity.KEY_2 = this.mngOrgGrpBunitsLst[intCnount].BUSINESS_UNIT;
                                        this.auditSecurity.KEY_3 = "";
                                        this.auditSecurity.KEY_4 = "";
                                        this.auditSecurity.KEY_5 = "";
                                        this.auditSecurity.FIELD_NAME = "BUSINESS_UNIT";
                                        this.auditSecurity.OLD_VALUE = "Y";
                                        this.auditSecurity.NEW_VALUE = "N";
                                        this.auditSecurityLst.push(this.auditSecurity);
                                    }
                                }
                            }
                        }
                        // Session["dsAllocBUnits"] = dsAllocBUnits;
                        this.strUserID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        if (!(boolAudit == true && this.strAudit == "Y")) return [3 /*break*/, 2];
                        screenName = localStorage.getItem("menuCode");
                        // let strScreenName = "mt_atpar_manage_org_groups.aspx";
                        //strFieldName = "ORG_GROUP_ID";
                        this.spnrService.start();
                        return [4 /*yield*/, this.commonService.insertAuditData(this.auditSecurityLst, this.strUserID, screenName).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spnrService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "updateMngOrgGrpBunitslst");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageOrgGroupsComponent.prototype.btnAssignBUints_Click = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var i, response_1, _a, ex_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        this.statusMsgs = [];
                        this.grdMngOrgGrpBunits = false;
                        this.btnMngOrgGrpButton = false;
                        for (i = 0; i < this.mngOrgGrpBunitsLst.length; i++) {
                            if (this.mngOrgGrpBunitsLst[i].BU_TYPE == "Inventory") {
                                this.mngOrgGrpBunitsLst[i].BU_TYPE = "I";
                            }
                            else {
                                this.mngOrgGrpBunitsLst[i].BU_TYPE = "P";
                            }
                        }
                        return [4 /*yield*/, this.updateMngOrgGrpBunitslst()];
                    case 1:
                        _b.sent();
                        this.spnrService.start();
                        return [4 /*yield*/, this.mngOrgGroupsService.saveOrgGroupsBUnits(this.strUserID, this.strOrgGrpID, this.mngOrgGrpBunitsLst).
                                catch(this.httpService.handleError).then(function (res) {
                                response_1 = res.json();
                            })];
                    case 2:
                        _b.sent();
                        _a = response_1.StatType;
                        switch (_a) {
                            case AtParEnums_1.StatusType.Success: return [3 /*break*/, 3];
                            case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 5];
                            case AtParEnums_1.StatusType.Error: return [3 /*break*/, 6];
                            case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 8];
                    case 3:
                        this.lstgridfilterData = [];
                        return [4 /*yield*/, this.bindManageOrgGrpBunits()];
                    case 4:
                        _b.sent();
                        this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Business Units Updated Successfully." });
                        return [3 /*break*/, 8];
                    case 5:
                        {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response_1.StatusMessage });
                            return [3 /*break*/, 8];
                        }
                        _b.label = 6;
                    case 6:
                        {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response_1.StatusMessage });
                            return [3 /*break*/, 8];
                        }
                        _b.label = 7;
                    case 7:
                        {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response_1.StatusMessage });
                            return [3 /*break*/, 8];
                        }
                        _b.label = 8;
                    case 8:
                        this.spnrService.stop();
                        return [3 /*break*/, 10];
                    case 9:
                        ex_10 = _b.sent();
                        this.clientErrorMsg(ex_10, "btnAssignBUints_Click");
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ManageOrgGroupsComponent.prototype.checkAll = function () {
        try {
            this.statusMsgs = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].CHK_VALUE = true;
                }
            }
            else {
                if (this.EndIndex > this.mngOrgGrpBunitsLst.length) {
                    this.EndIndex = this.mngOrgGrpBunitsLst.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.mngOrgGrpBunitsLst[i].CHK_VALUE = true;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    ManageOrgGroupsComponent.prototype.unCheckAll = function () {
        try {
            this.statusMsgs = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].CHK_VALUE = false;
                }
            }
            else {
                if (this.EndIndex > this.mngOrgGrpBunitsLst.length) {
                    this.EndIndex = this.mngOrgGrpBunitsLst.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.mngOrgGrpBunitsLst[i].CHK_VALUE = false;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    ManageOrgGroupsComponent.prototype.filterMngOrgGrpBunitsLst = function (event) {
        this.statusMsgs = [];
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    //second popup code starts
    ManageOrgGroupsComponent.prototype.lnkbtnParams_Click = function (event, selectedRowData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var target, idAttr, value, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Assign Parameters';
                        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.pageDisplayName = "->Manage Org Group Parameters";
                        this.statusMsgs = [];
                        event.preventDefault();
                        target = event.target || event.srcElement || event.currentTarget;
                        idAttr = target.attributes.id;
                        value = idAttr.nodeValue;
                        if (value == "lnkbtnParams") {
                            this.lnkbtnParams = true;
                            this.lnkbtnBUnit = false;
                            this.MOG = false;
                            this.divOrgParamsData = false;
                        }
                        this.selectedApp = "Select Product";
                        this.strOrgGrpID = selectedRowData.ORG_GROUP_ID;
                        this.strUserID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        this.spnrService.start();
                        return [4 /*yield*/, this.commonService.getApps(this.strUserID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.atParAppsLst = res.json().DataList,
                                    _this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ddlApps = [];
                                        _this.ddlApps.push({ label: "Select Product", value: "0" });
                                        if (_this.atParAppsLst.length > 0) {
                                            for (var i = 0; i <= _this.atParAppsLst.length - 1; i++) {
                                                if (_this.atParAppsLst[i].APP_NAME.toString().toLocaleUpperCase() != "ATPAR" && _this.atParAppsLst[i].APP_ID != AtParEnums_1.EnumApps.Reports) {
                                                    _this.ddlApps.push({ label: _this.atParAppsLst[i].APP_NAME.toString(), value: _this.atParAppsLst[i].APP_ID.toString() });
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "lnkbtnParams_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageOrgGroupsComponent.prototype.app_selectChanged = function (option, event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var selectedProduct, strAppIdName, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.statusMsgs = [];
                        this.atParOrgGrpParametersLst = null;
                        if (!(event != null && event != undefined)) return [3 /*break*/, 2];
                        this.selectedApp = event.value;
                        selectedProduct = event.label;
                        this.divOrgParamsData = false;
                        if (selectedProduct == "Select Product") {
                            return [2 /*return*/];
                        }
                        if (!(this.selectedApp != null && this.selectedApp != undefined && this.selectedApp != "0")) return [3 /*break*/, 2];
                        this.divOrgParamsData = true;
                        strAppIdName = event.label.toString();
                        this.strAppId = event.value.toString();
                        this.spnrService.start();
                        return [4 /*yield*/, this.commonService.getAppParameters(this.strUserID, this.strOrgGrpID, this.strAppId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.atParOrgGrpParametersLst = res.json().DataList;
                                _this.addValidations(_this.atParOrgGrpParametersLst);
                                _this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        for (var x = 0; x <= _this.atParOrgGrpParametersLst.length - 1; x++) {
                                            _this.atParOrgGrpParametersLst[x].OLD_PARAMETERVALUE = _this.atParOrgGrpParametersLst[x].PARAMETER_VALUE;
                                            if (_this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "CHECKBOX") {
                                                _this.atParOrgGrpParametersLst[x].BLN_DISABLE = false;
                                                if (_this.atParOrgGrpParametersLst[x].PARAMETER_VALUE == "Y") {
                                                    _this.atParOrgGrpParametersLst[x].PARAMETER_VALUE = true;
                                                }
                                                else {
                                                    _this.atParOrgGrpParametersLst[x].PARAMETER_VALUE = false;
                                                }
                                                if (_this.atParOrgGrpParametersLst[x].PARAMETER_ID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS" ||
                                                    _this.atParOrgGrpParametersLst[x].PARAMETER_ID == "SEND_LOT_SERIAL_INFO_TO_MMIS") {
                                                    // hdnParameterID.value = cbParam.ID;
                                                    //cbParam.clientID
                                                }
                                                if (_this.atParOrgGrpParametersLst[x].PARAMETER_ID == "PICK_ALLOC_STORAGE_LOC_REQ") {
                                                    // cbParam.Attributes.Add("OnClick", "return setMultiPickChkBx(this);");
                                                }
                                                if (_this.atParOrgGrpParametersLst[x].PARAMETER_ID == "VALIDATE_DEPT") {
                                                    // hdnDeptParam.value = cbParam.ID;
                                                }
                                                if (_this.atParOrgGrpParametersLst[x].PARAMETER_ID == "DEFAULT_LOC_AS_DEPT") {
                                                    //cbParam.Attributes.Add("OnClick", "return setchkDept(this);");
                                                }
                                            }
                                            if (_this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "RADIO") {
                                                if (_this.atParOrgGrpParametersLst[x].PARAMETER_ID == "LOT_SERIAL_ENABLED" ||
                                                    _this.atParOrgGrpParametersLst[x].PARAMETER_ID == "PICK_ENABLE_LOT_SRL_TRACKING") {
                                                    var paramVal = _this.atParOrgGrpParametersLst[x].PARAMETER_VALUE;
                                                    var filterItem = _this.atParOrgGrpParametersLst.filter(function (x) { return x.PARAMETER_ID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS"; });
                                                    var filterItem1 = _this.atParOrgGrpParametersLst.filter(function (x) { return x.PARAMETER_ID == "SEND_LOT_SERIAL_INFO_TO_MMIS"; });
                                                    if (paramVal == "MMIS") {
                                                        if (filterItem != null && filterItem.length > 0) {
                                                            if (filterItem[0].PARAMETER_TYPE == "CHECKBOX") {
                                                                filterItem[0].PARAMETER_VALUE = true;
                                                                filterItem[0].BLN_DISABLE = true;
                                                            }
                                                        }
                                                        if (filterItem1 != null && filterItem1.length > 0) {
                                                            if (filterItem1[0].PARAMETER_TYPE == "CHECKBOX") {
                                                                filterItem1[0].PARAMETER_VALUE = true;
                                                                filterItem1[0].BLN_DISABLE = true;
                                                            }
                                                        }
                                                    }
                                                    else if (paramVal.toUpperCase() == "NONE") {
                                                        if (filterItem != null && filterItem.length > 0) {
                                                            if (filterItem[0].PARAMETER_TYPE == "CHECKBOX") {
                                                                filterItem[0].BLN_DISABLE = false;
                                                            }
                                                        }
                                                        if (filterItem1 != null && filterItem1.length > 0) {
                                                            if (filterItem1[0].PARAMETER_TYPE == "CHECKBOX") {
                                                                filterItem1[0].PARAMETER_VALUE = false;
                                                                filterItem1[0].BLN_DISABLE = true;
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        if (filterItem != null && filterItem.length > 0) {
                                                            filterItem[0].BLN_DISABLE = false;
                                                        }
                                                        if (filterItem1 != null && filterItem1.length > 0) {
                                                            filterItem1[0].BLN_DISABLE = false;
                                                        }
                                                    }
                                                }
                                            }
                                            if (_this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "TEXT" ||
                                                _this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "TEXTBOX") {
                                                var txtParams = "";
                                                txtParams = _this.atParOrgGrpParametersLst[x].PARAMETER_ID;
                                                switch (_this.atParOrgGrpParametersLst[x].PARAMETER_ID) {
                                                    case "REASON_CODE":
                                                        {
                                                            if (_this.atParOrgGrpParametersLst[x].VALIDATION != null && _this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = _this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Max=10";
                                                            }
                                                            else {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = "Max=10";
                                                            }
                                                            break;
                                                        }
                                                    case "ADJ_REASON_CODE":
                                                        {
                                                            if (_this.atParOrgGrpParametersLst[x].VALIDATION != null && _this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = _this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Max=10";
                                                            }
                                                            else {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = "Max=10";
                                                            }
                                                            break;
                                                        }
                                                    case "PS_USER":
                                                        {
                                                            if (_this.atParOrgGrpParametersLst[x].VALIDATION != null && _this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = _this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Max=10" + "," + "Mandatory";
                                                            }
                                                            else {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = "Max=10" + "," + "Mandatory";
                                                            }
                                                            break;
                                                        }
                                                    case "MAX_NO_OF_REC_DOWNLOAD":
                                                        {
                                                            if (_this.atParOrgGrpParametersLst[x].VALIDATION != null && _this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = _this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Max=2" + "," + "Mandatory";
                                                            }
                                                            else {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = "Max=2" + "," + "Mandatory";
                                                            }
                                                            break;
                                                        }
                                                    case "FACTOR_OF_SAFETY":
                                                        {
                                                            if (_this.atParOrgGrpParametersLst[x].VALIDATION != null && _this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = _this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Max=3";
                                                            }
                                                            else {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = "Max=3";
                                                            }
                                                            break;
                                                        }
                                                    case "DEFAULT_PRIORITY":
                                                        {
                                                            if (_this.atParOrgGrpParametersLst[x].VALIDATION != null && _this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = _this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Mandatory";
                                                            }
                                                            else {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = "Mandatory";
                                                            }
                                                            break;
                                                        }
                                                    case "RECALL_NOTIFICATION_EMAIL":
                                                        {
                                                            if (_this.atParOrgGrpParametersLst[x].VALIDATION != null && _this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = _this.atParOrgGrpParametersLst[x].VALIDATION + "," + "EMAIL";
                                                            }
                                                            else {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = "EMAIL";
                                                            }
                                                            break;
                                                        }
                                                    case "LIMIT_OF_LISTS":
                                                        {
                                                            if (_this.atParOrgGrpParametersLst[x].VALIDATION != null && _this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = _this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Mandatory";
                                                            }
                                                            else {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = "Mandatory";
                                                            }
                                                            break;
                                                        }
                                                    case "DEFAULT_LEAD_TIME":
                                                        {
                                                            if (_this.atParOrgGrpParametersLst[x].VALIDATION != null && _this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = _this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Mandatory" + "," + "Max=3";
                                                            }
                                                            else {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = "Mandatory" + "," + "Max=3";
                                                            }
                                                            break;
                                                        }
                                                    case "DURATION_TRACKING_EXP":
                                                        {
                                                            if (_this.atParOrgGrpParametersLst[x].VALIDATION != null && _this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = _this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Mandatory" + "," + "Max=3";
                                                            }
                                                            else {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = "Mandatory" + "," + "Max=3";
                                                            }
                                                            break;
                                                        }
                                                    case "PERCENTAGE_OPTIMUM_QTY":
                                                        {
                                                            if (_this.atParOrgGrpParametersLst[x].VALIDATION != null && _this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = _this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Mandatory" + "," + "Max=3";
                                                            }
                                                            else {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = "Mandatory" + "," + "Max=3";
                                                            }
                                                            break;
                                                        }
                                                    case "NO_OF_REQUESTS_FOR_SAME_EQ_ITM":
                                                        {
                                                            if (_this.atParOrgGrpParametersLst[x].VALIDATION != null && _this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = _this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Mandatory" + "," + "Max=4";
                                                            }
                                                            else {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = "Mandatory" + "," + "Max=4";
                                                            }
                                                            break;
                                                        }
                                                    case "BADGE_TRACK_INFO":
                                                        {
                                                            if (_this.atParOrgGrpParametersLst[x].VALIDATION != null && _this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = _this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Mandatory";
                                                            }
                                                            else {
                                                                _this.atParOrgGrpParametersLst[x].validationRules = "Mandatory";
                                                            }
                                                            break;
                                                        }
                                                }
                                                //For Text Area
                                                if ((_this.atParOrgGrpParametersLst[x].PARAMETER_ID == "CUSTOM_SQL_DESTLOCATION")) {
                                                    _this.atParOrgGrpParametersLst[x].PARAMETER_TYPE = "TEXTAREA";
                                                }
                                                if ((_this.atParOrgGrpParametersLst[x].PARAMETER_ID == "CUSTOM_SQL_DEPT")) {
                                                    _this.atParOrgGrpParametersLst[x].PARAMETER_TYPE = "TEXTAREA";
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.divOrgParamsData = false;
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.divOrgParamsData = false;
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.divOrgParamsData = false;
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_12 = _a.sent();
                        this.divOrgParamsData = false;
                        this.clientErrorMsg(ex_12, "app_selectChanged");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageOrgGroupsComponent.prototype.assignParameterChkBoxChanged = function (parameterLst, event) {
        return __awaiter(this, void 0, void 0, function () {
            var val;
            return __generator(this, function (_a) {
                try {
                    if (event != null && event != undefined) {
                        parameterLst.PARAMETER_VALUE = event;
                        val = parameterLst.PARAMETER_VALUE;
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "assignParameterChkBoxChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    ManageOrgGroupsComponent.prototype.assignParameterDropDownChanged = function (parameterLst, event) {
        try {
            if (event != null && event != undefined) {
                parameterLst.PARAMETER_VALUE = event;
                var val = parameterLst.PARAMETER_VALUE;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "assignParameterDropDownChanged");
        }
    };
    ManageOrgGroupsComponent.prototype.assignParameterRdbtnChanged = function (parameterLst, event) {
        try {
            if (event != null && event != undefined) {
                parameterLst.PARAMETER_VALUE = event;
                if (parameterLst.PARAMETER_ID == "LOT_SERIAL_ENABLED" ||
                    parameterLst.PARAMETER_ID == "PICK_ENABLE_LOT_SRL_TRACKING") {
                    var paramVal = parameterLst.PARAMETER_VALUE;
                    var filterItem = this.atParOrgGrpParametersLst.filter(function (x) { return x.PARAMETER_ID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS"; });
                    var filterItem1 = this.atParOrgGrpParametersLst.filter(function (x) { return x.PARAMETER_ID == "SEND_LOT_SERIAL_INFO_TO_MMIS"; });
                    if (paramVal == "MMIS") {
                        if (filterItem != null && filterItem.length > 0) {
                            if (filterItem[0].PARAMETER_TYPE == "CHECKBOX") {
                                filterItem[0].PARAMETER_VALUE = true;
                                filterItem[0].BLN_DISABLE = true;
                            }
                        }
                        if (filterItem1 != null && filterItem1.length > 0) {
                            if (filterItem1[0].PARAMETER_TYPE == "CHECKBOX") {
                                filterItem1[0].PARAMETER_VALUE = true;
                                filterItem1[0].BLN_DISABLE = true;
                            }
                        }
                    }
                    else if (paramVal.toUpperCase() == "NONE") {
                        if (filterItem != null && filterItem.length > 0) {
                            if (filterItem[0].PARAMETER_TYPE == "CHECKBOX") {
                                filterItem[0].PARAMETER_VALUE = false;
                                filterItem[0].BLN_DISABLE = true;
                            }
                        }
                        if (filterItem1 != null && filterItem1.length > 0) {
                            if (filterItem1[0].PARAMETER_TYPE == "CHECKBOX") {
                                filterItem1[0].PARAMETER_VALUE = false;
                                filterItem1[0].BLN_DISABLE = true;
                            }
                        }
                    }
                    else {
                        if (filterItem != null && filterItem.length > 0) {
                            filterItem[0].BLN_DISABLE = false;
                        }
                        if (filterItem1 != null && filterItem1.length > 0) {
                            filterItem1[0].BLN_DISABLE = false;
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "assignParameterRdbtnChanged");
        }
    };
    ManageOrgGroupsComponent.prototype.btnSaveParams_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var blnCheckValueAsNone, blnCheckRadioValue, boolAudit, blnChkCustSQLDept, blnChkBillingSystem, strParamID, strNewParamValue_1, strOldParamValue, _loop_1, this_1, emailPattern, i, state_1, strScreenName, ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        this.statusMsgs = [];
                        blnCheckValueAsNone = false;
                        blnCheckRadioValue = false;
                        boolAudit = false;
                        blnChkCustSQLDept = false;
                        blnChkBillingSystem = false;
                        strParamID = "";
                        strNewParamValue_1 = "";
                        strOldParamValue = "";
                        this.assignParamLst = new Array();
                        this.auditSecurityLst = new Array();
                        ////For Disabling the checkbox
                        // ScriptManager1.RegisterClientScriptBlock(this, this.GetType, "ReturnScript", "DisableCheckBox('" + ddlApps.SelectedItem.Text + "');", true);
                        if (this.strAppId == "15") {
                            blnChkBillingSystem = this.checkBillingInformation();
                        }
                        _loop_1 = function () {
                            var strOldChkValue, numaric_regex, alphaNumaric_RegEx, char_RegEx, configData, recallParameter_1, validate, alphaNumaric_regex, alphaNumaric_regex, Regex, Regex, Regex, Regex, Regex, Regex, Regex;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this_1.assignParamEntity = new mt_atpar_org_group_parameters_1.MT_ATPAR_ORG_GROUP_PARAMETERS();
                                        if (this_1.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "RADIO") {
                                            strParamID = this_1.atParOrgGrpParametersLst[i].PARAMETER_ID.toString();
                                            this_1.assignParamEntity.PARAMETER_ID = strParamID;
                                            if (strParamID == "PICK_ENABLE_LOT_SRL_TRACKING" || strParamID == "LOT_SERIAL_ENABLED") {
                                                if (this_1.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == AtParEnums_1.Enable_Lot_Serial_Tracking.MMIS.toString()) {
                                                    blnCheckRadioValue = true;
                                                }
                                                else if (this_1.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == AtParEnums_1.Enable_Lot_Serial_Tracking.None.toString()) {
                                                    blnCheckValueAsNone = true;
                                                }
                                                else {
                                                    blnCheckRadioValue = false;
                                                    blnCheckValueAsNone = false;
                                                }
                                            }
                                        }
                                        if (this_1.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "CHECKBOX") {
                                            strOldChkValue = this_1.atParOrgGrpParametersLst[i].OLD_PARAMETERVALUE.toString();
                                            strParamID = this_1.atParOrgGrpParametersLst[i].PARAMETER_ID.toString();
                                            this_1.assignParamEntity.PARAMETER_ID = strParamID;
                                            if (this_1.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == "true") {
                                                this_1.assignParamEntity.PARAMETER_VALUE = "Y";
                                                if (strOldChkValue != "Y") {
                                                    boolAudit = true;
                                                    this_1.auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                                    this_1.auditSecurity.OLD_VALUE = "N";
                                                    this_1.auditSecurity.NEW_VALUE = "Y";
                                                    this_1.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                                    this_1.auditSecurity.KEY_1 = this_1.strOrgGrpID;
                                                    this_1.auditSecurity.KEY_2 = this_1.strAppId;
                                                    this_1.auditSecurity.KEY_3 = strParamID;
                                                    this_1.auditSecurity.KEY_4 = "";
                                                    this_1.auditSecurity.KEY_5 = "";
                                                    this_1.auditSecurityLst.push(this_1.auditSecurity);
                                                }
                                            }
                                            else {
                                                this_1.assignParamEntity.PARAMETER_VALUE = "N";
                                                if (strOldChkValue != "N") {
                                                    boolAudit = true;
                                                    this_1.auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                                    this_1.auditSecurity.OLD_VALUE = "Y";
                                                    this_1.auditSecurity.NEW_VALUE = "N";
                                                    this_1.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                                    this_1.auditSecurity.KEY_1 = this_1.strOrgGrpID;
                                                    this_1.auditSecurity.KEY_2 = this_1.strAppId;
                                                    this_1.auditSecurity.KEY_3 = strParamID;
                                                    this_1.auditSecurity.KEY_4 = "";
                                                    this_1.auditSecurity.KEY_5 = "";
                                                    this_1.auditSecurityLst.push(this_1.auditSecurity);
                                                }
                                            }
                                            if (blnCheckRadioValue) {
                                                if (strParamID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS" || strParamID == "SEND_LOT_SERIAL_INFO_TO_MMIS") {
                                                    this_1.assignParamEntity.PARAMETER_VALUE = "Y";
                                                }
                                            }
                                            else if (blnCheckValueAsNone) {
                                                if (strParamID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS" || strParamID == "SEND_LOT_SERIAL_INFO_TO_MMIS") {
                                                    this_1.assignParamEntity.PARAMETER_VALUE = "N";
                                                }
                                            }
                                            if (strParamID == "VALIDATE_DEPT") {
                                                if (this_1.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == "true") {
                                                    if (blnChkCustSQLDept) {
                                                        this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please provide Custom SQL for Syncing Valid Departments." });
                                                        return [2 /*return*/, { value: void 0 }];
                                                    }
                                                }
                                            }
                                        }
                                        if (!(this_1.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "TEXTBOX" ||
                                            this_1.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "TEXTAREA")) return [3 /*break*/, 3];
                                        strParamID = this_1.atParOrgGrpParametersLst[i].PARAMETER_ID.toString();
                                        strNewParamValue_1 = this_1.atParOrgGrpParametersLst[i].PARAMETER_VALUE;
                                        numaric_regex = "numeric";
                                        if (this_1.atParOrgGrpParametersLst[i].VALIDATION == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() &&
                                            (this_1.atParOrgGrpParametersLst[i].PARAMETER_ID == "BADGE_TRACK_INFO")) {
                                            if (this_1.atParOrgGrpParametersLst[i].PARAMETER_VALUE != "") {
                                                if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1)) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Track Numbers - Please enter a positive numeric value." });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                                if (this_1.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() > 3 ||
                                                    this_1.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() < 1) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "The valid Track Numbers used for reading info from Badge are 1,2,3" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                            }
                                            else {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Track Numbers - Please enter valid Swipe Card Track Number" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        strOldParamValue = this_1.atParOrgGrpParametersLst[i].OLD_PARAMETERVALUE.toString();
                                        this_1.assignParamEntity.PARAMETER_ID = strParamID;
                                        this_1.assignParamEntity.PARAMETER_VALUE = strNewParamValue_1;
                                        //RT 4353
                                        if (strParamID == "CUSTOM_SQL_DESTLOCATION") {
                                            this_1.assignParamEntity.PARAMETER_VALUE = strNewParamValue_1.replace("'", "''");
                                        }
                                        if (strParamID == "CUSTOM_VIEW_ERPUSER") {
                                            this_1.assignParamEntity.PARAMETER_VALUE = strNewParamValue_1.replace("'", "''");
                                        }
                                        if (strParamID == "CUSTOM_SQL_DEPT") {
                                            this_1.assignParamEntity.PARAMETER_VALUE = strNewParamValue_1.replace("'", "''");
                                        }
                                        if (strParamID == "DEFAULT_DURATION") {
                                            if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1)) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Default Duration in days - Please enter a positive numeric value." });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            else if (this_1.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString().length > 2) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Default Duration in days - Number of digits cannot be more than 2" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (strParamID == "DURATION_TRACKING_EXP") {
                                            if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1) || strNewParamValue_1 == "" || strNewParamValue_1 == null) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Duration Tracking Expiration in days - Please enter a positive numeric value." });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            else if (strNewParamValue_1.toString().length > 3) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Duration Tracking Expiration in days - Number of digits cannot be more than 3" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (strParamID == "FACTOR_OF_SAFETY") {
                                            if (strNewParamValue_1 != "") {
                                                if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1)) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Factor of safety for recommended par - Please enter a positive numeric value." });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                                else if (strNewParamValue_1.toString().length > 3) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Factor of safety for recommended par - Number of digits cannot be more than 3" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                            }
                                        }
                                        if (strParamID == "RECORDS_PER_PAGE") {
                                            if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1)) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No. Of records per page - Please enter a positive numeric value." });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            else if (strNewParamValue_1.toString().length > 4) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No. Of records per page - Number of digits cannot be more than 4" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (strParamID == "DEFAULT_DATE_RANGE") {
                                            if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1)) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Default Date Range - Please enter a positive numeric value." });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            else if (strNewParamValue_1.toString().length > 2) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Default Date Range - Number of digits cannot be more than 3" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (strParamID == "MAX_NO_OF_REC_DOWNLOAD") {
                                            if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1) || strNewParamValue_1 == "" || strNewParamValue_1 == null) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max Number of Records to download - Please enter a positive numeric value." });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            else if (strNewParamValue_1.toString().length > 2) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max Number of Records to download - Number of digits cannot be more than 2" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            //NB-0003466
                                            if (!(strNewParamValue_1.toString().length > 0)) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max Number of Records to download - Should not be less than 1." });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (strParamID == "PS_USER") {
                                            alphaNumaric_RegEx = "alpha_numeric_underscore_hyphen_notspace";
                                            if (strNewParamValue_1.toString() == "" || strNewParamValue_1 == null) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "User ID - Please enter characters or numbers or _." });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            else if (!Validators_1.regExpValidator(alphaNumaric_RegEx, strNewParamValue_1)) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "User ID - Please enter characters or numbers or _." });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            else if (strNewParamValue_1.toString().length > 10) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "User ID - Number of characters cannot be more than 10" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (strParamID == "DEFAULT_PRIORITY") {
                                            if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1) || strNewParamValue_1 == "" || strNewParamValue_1 == null) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Default Location Priority - Please enter a positive numeric value." });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            else if (strNewParamValue_1.toString().length > 2) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Default Location Priority - Number of digits cannot be more than 2" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (strParamID == "LIMIT_OF_LISTS") {
                                            if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1) || strNewParamValue_1 == "" || strNewParamValue_1 == null) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Limit number of downloaded pick plans - Please enter a positive numeric value." });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            else if (strNewParamValue_1.toString().length > 2) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Limit number of downloaded pick plans - Number of digits cannot be more than 2" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (strParamID == "DEFAULT_BUSINESS_UNIT") {
                                            char_RegEx = "alpha_underscore_hyphen";
                                            if (strNewParamValue_1.toString() == "") {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Default Business Unit - Please enter characters or numbers or _." });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            else if (!Validators_1.regExpValidator(char_RegEx, strNewParamValue_1)) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Default Business Unit - Please enter characters or numbers or _." });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            else if (strNewParamValue_1.toString().length > 10) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Default Business Unit - Number of characters cannot be more than 10" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (strParamID == "REQUESTOR_EMAIL_TABLE" && strNewParamValue_1.toString().length > 50) {
                                            this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Table/view name to read Email ID for Requester - Number of characters cannot be more than 50" });
                                            return [2 /*return*/, { value: void 0 }];
                                        }
                                        if (strParamID == "B_MAX_STOR") {
                                            if (strNewParamValue_1.toString() != "") {
                                                if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1)) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Box Items - Please enter a positive numeric value." });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                                else if (strNewParamValue_1.toString().length > 4) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Box Items - Number of digits cannot be more than 4" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                            }
                                        }
                                        if (strParamID == "E_MAX_STOR") {
                                            if (strNewParamValue_1.toString() != "") {
                                                if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1)) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Equipment Items - Please enter a positive numeric value." });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                                else if (strNewParamValue_1.toString().length > 4) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Equipment Items - Number of digits cannot be more than 4" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                            }
                                        }
                                        if (strParamID == "F_MAX_STOR") {
                                            if (strNewParamValue_1.toString() != "") {
                                                if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1)) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Furniture Items - Please enter a positive numeric value." });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                                else if (strNewParamValue_1.toString().length > 4) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Furniture Items - Number of digits cannot be more than 4" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                            }
                                        }
                                        if (strParamID == "NO_OF_REQUESTS_FOR_SAME_EQ_ITM") {
                                            if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1) || strNewParamValue_1 == "" || strNewParamValue_1 == null) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No. Of Requests for same EQ Item - Please enter a positive numeric value." });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            else if (strNewParamValue_1.toString().length > 4) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No. Of Requests for same EQ Item - Number of digits cannot be more than 4" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            else if (strNewParamValue_1.toString().length == 0) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No. Of Requests for same EQ Item - should not be less than 1" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (strParamID == "EMAILID_FOR_ALERTS") {
                                            if (strNewParamValue_1.toString().length > 50) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Email Id for alerts - Number of characters cannot be more than 50" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (strParamID == "FREQUENCY_EMAIL_ALERTS") {
                                            if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1)) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Frequency of Email Alerts - Please enter a positive numeric value." });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            else if (strNewParamValue_1.toString().length > 10) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Frequency of Email Alerts - Number of digits cannot be more than 10" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (strParamID == "PERCENTAGE_OPTIMUM_QTY") {
                                            if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1) || strNewParamValue_1 == "" || strNewParamValue_1 == null) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Percentage of Optimum quantity - Please enter a positive numeric value." });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            else if (strNewParamValue_1.toString().length > 3) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Percentage of Optimum quantity - Number of digits cannot be more than 3" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (strParamID == "REFRESH_DATA_PERIOD") {
                                            if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1)) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Time period for scheduled refresh of ERP data - Please enter a positive numeric value." });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            else if (strNewParamValue_1.toString().length > 10) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Time period for scheduled refresh of ERP data - Number of digits cannot be more than 10" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (strParamID == "SYNC_FREQUENCY") {
                                            if (strNewParamValue_1.toString() != "") {
                                                if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1)) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Frequency for Syncing - Please enter a positive numeric value." });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                                else if (strNewParamValue_1.toString().length > 2) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Frequency for Syncing - Max. allowable Frequency value is 99" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                            }
                                        }
                                        if (strParamID == "CUSTOM_SQL_DEPT") {
                                            if (strNewParamValue_1.toString() == "") {
                                                blnChkCustSQLDept = true;
                                            }
                                        }
                                        if (strParamID == "CUSTOM_VIEW_ERPUSER") {
                                            if (strNewParamValue_1.toString() == "") {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter Sql View for Employee details" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (!(strParamID == "RECALL_NOTIFICATION_EMAIL")) return [3 /*break*/, 2];
                                        configData = 0;
                                        recallParameter_1 = false;
                                        //Check Once
                                        //configData = AtparServiceObj.getCheckRecall(_deviceTokenEntry, RecallParameter);
                                        return [4 /*yield*/, this_1.commonService.getCheckRecall().
                                                catch(this_1.httpService.handleError).then(function (res) {
                                                var data = res.json();
                                                //configData = res.json().DataList,
                                                _this.spnrService.stop();
                                                switch (data.StatType) {
                                                    case AtParEnums_1.StatusType.Success: {
                                                        if (recallParameter_1) {
                                                            if (strNewParamValue_1.toString() == "") {
                                                                _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Email for Recall Notification is Mandatory when Recall Management is implemented" });
                                                                return;
                                                            }
                                                        }
                                                        break;
                                                    }
                                                    case AtParEnums_1.StatusType.Warn: {
                                                        _this.statusMsgs = [];
                                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                        break;
                                                    }
                                                    case AtParEnums_1.StatusType.Error: {
                                                        _this.statusMsgs = [];
                                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                        break;
                                                    }
                                                    case AtParEnums_1.StatusType.Custom: {
                                                        _this.statusMsgs = [];
                                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                        break;
                                                    }
                                                }
                                            })];
                                    case 1:
                                        //Check Once
                                        //configData = AtparServiceObj.getCheckRecall(_deviceTokenEntry, RecallParameter);
                                        _a.sent();
                                        if (strNewParamValue_1.toString() != "") {
                                            emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                            validate = (new RegExp(emailPattern)).test(strNewParamValue_1) ? true : false;
                                            if (!validate) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Email ID in Email for Recall Notification Text box" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        _a.label = 2;
                                    case 2:
                                        if (strParamID == "CATEGORY_CODE") {
                                            if (strNewParamValue_1.toString() != "") {
                                                alphaNumaric_regex = "alpha_numeric_underscore_hyphen_notspace";
                                                if (!Validators_1.regExpValidator(alphaNumaric_regex, strNewParamValue_1)) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Category Code - Please enter characters or numbers or _." });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                                else if (strNewParamValue_1.toString().length > 50) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Category Code - Number of characters cannot be more than 50" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                            }
                                        }
                                        if (strParamID == "EXCLUDE_CHRG_CODE_ITEMS_BILING") {
                                            alphaNumaric_regex = "alpha_numeric_specialchar";
                                            if (!Validators_1.regExpValidator(alphaNumaric_regex, strNewParamValue_1)) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Exclude Items for billing - Please enter characters or numbers" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (strParamID == "ADT_BILLING_SEND_ADDRESS") {
                                            if (blnChkBillingSystem == true) {
                                                Regex = "numeric_dot";
                                                if (strNewParamValue_1.toString() == "") {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Billing Send Address - Please enter numbers" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                                else if (!Validators_1.regExpValidator(Regex, strNewParamValue_1)) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Billing Send Address - Please enter positive numbers" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                            }
                                        }
                                        if (strParamID == "ADT_BILLING_SEND_PORT") {
                                            if (blnChkBillingSystem == true) {
                                                if (strNewParamValue_1.toString() == "") {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Billing Send Port - Please enter numbers" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                                else if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1)) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Billing Send Port - Please enter positive numbers" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                            }
                                        }
                                        if (strParamID == "ADT_RECEIVING_APPLICATION") {
                                            Regex = "alpha_numerics_nospace";
                                            if (blnChkBillingSystem == true) {
                                                if (strNewParamValue_1.toString() == "") {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Receiving Application - Please enter characters or numbers" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                                else if (!Validators_1.regExpValidator(Regex, strNewParamValue_1)) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Receiving Application - Please enter characters or numbers" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                            }
                                        }
                                        if (strParamID == "ADT_RECEIVING_FACILITY") {
                                            Regex = "alpha_numerics_nospace";
                                            if (blnChkBillingSystem == true) {
                                                if (strNewParamValue_1.toString() == "") {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Receiving Facility - Please enter characters or numbers" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                                else if (!Validators_1.regExpValidator(Regex, strNewParamValue_1)) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Receiving Facility - Please enter characters or numbers" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                            }
                                        }
                                        if (strParamID == "ADT_BILLING_THRESHOLD_VALUE") {
                                            if (blnChkBillingSystem == true) {
                                                if (strNewParamValue_1.toString() == "") {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Billing Threshold value - Please enter numbers" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                                else if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1)) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Billing Threshold value - Please enter positive numbers" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                            }
                                        }
                                        if (strParamID == "EMAILID_FOR_LOWSTOCK_ALERTS") {
                                            Regex = "email_pattern";
                                            if (strNewParamValue_1.toString() != "") {
                                                if (!Validators_1.regExpValidator(Regex, strNewParamValue_1)) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Invalid Email ID for Low Stock Alerts" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                            }
                                        }
                                        if (strParamID == "EMAILID_FOR_PRODUCT_EXP_ALERTS") {
                                            Regex = "email_pattern";
                                            if (strNewParamValue_1.toString() != "") {
                                                if (!Validators_1.regExpValidator(Regex, strNewParamValue_1)) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Invalid Email ID for Product Expiration Alerts" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                            }
                                        }
                                        if (strParamID == "DEFAULT_LEAD_TIME") {
                                            if (!Validators_1.regExpValidator(numaric_regex, strNewParamValue_1) || strNewParamValue_1 == "" || strNewParamValue_1 == null) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Default lead time in days - Please enter a positive numeric value." });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            else if (strNewParamValue_1.toString().length > 3) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Default lead time in days  - Number of digits cannot be more than 3." });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (strParamID == "COUNT_QTY_THRESHOLD") {
                                            if (strNewParamValue_1.toString() != "") {
                                                Regex = "numerics_doubleprecision";
                                                if (!Validators_1.regExpValidator(Regex, strNewParamValue_1)) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max allowable count quantity - Please enter a positive numeric value." });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                                else if (parseInt(strNewParamValue_1) > 99999999999.99) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max allowable count quantity - Max. allowable count quantity value is 99999999999.99" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                                else if (parseInt(strNewParamValue_1) <= 0) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max allowable count quantity - Can not be zero" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                            }
                                            else if (strNewParamValue_1.toString().length == 0) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max allowable count quantity - Please enter Numeric Value" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (strParamID == "COUNT_DLR_VALUE_THRESHOLD") {
                                            if (strNewParamValue_1.toString() != "") {
                                                Regex = "numerics_doubleprecision";
                                                if (!Validators_1.regExpValidator(Regex, strNewParamValue_1)) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max allowable value $ - Please enter a positive numeric value." });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                                else if (parseInt(strNewParamValue_1.toString()) > 99999999999.99) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max allowable value $ - Max. allowable $ value is 99999999999.99" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                                else if (parseInt(strNewParamValue_1.toString()) <= 0) {
                                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max allowable value $ - Can not be zero" });
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                            }
                                            else if (strNewParamValue_1.toString().length == 0) {
                                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max allowable value $ - Please enter Numeric Value" });
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                        }
                                        if (strOldParamValue != strNewParamValue_1) {
                                            boolAudit = true;
                                            this_1.auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                            this_1.auditSecurity.OLD_VALUE = strOldParamValue;
                                            this_1.auditSecurity.NEW_VALUE = strNewParamValue_1;
                                            this_1.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                            this_1.auditSecurity.KEY_1 = this_1.strOrgGrpID;
                                            this_1.auditSecurity.KEY_2 = this_1.strAppId;
                                            this_1.auditSecurity.KEY_3 = strParamID;
                                            this_1.auditSecurity.KEY_4 = "";
                                            this_1.auditSecurity.KEY_5 = "";
                                            this_1.auditSecurityLst.push(this_1.auditSecurity);
                                        }
                                        _a.label = 3;
                                    case 3:
                                        if (this_1.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "RADIO") {
                                            strNewParamValue_1 = this_1.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString();
                                            strParamID = this_1.atParOrgGrpParametersLst[i].PARAMETER_ID.toString();
                                            strOldParamValue = this_1.atParOrgGrpParametersLst[i].OLD_PARAMETERVALUE.toString();
                                            this_1.assignParamEntity.PARAMETER_ID = strParamID;
                                            this_1.assignParamEntity.PARAMETER_VALUE = strNewParamValue_1;
                                            if (strOldParamValue != strNewParamValue_1) {
                                                boolAudit = true;
                                                this_1.auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                                this_1.auditSecurity.OLD_VALUE = strOldParamValue;
                                                this_1.auditSecurity.NEW_VALUE = strNewParamValue_1;
                                                this_1.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                                this_1.auditSecurity.KEY_1 = this_1.strOrgGrpID;
                                                this_1.auditSecurity.KEY_2 = this_1.strAppId;
                                                this_1.auditSecurity.KEY_3 = strParamID;
                                                this_1.auditSecurity.KEY_4 = "";
                                                this_1.auditSecurity.KEY_5 = "";
                                                this_1.auditSecurityLst.push(this_1.auditSecurity);
                                            }
                                        }
                                        this_1.assignParamLst.push(this_1.assignParamEntity);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i <= this.atParOrgGrpParametersLst.length - 1)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1()];
                    case 2:
                        state_1 = _a.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.spnrService.start();
                        return [4 /*yield*/, this.commonService.saveAppParameters(this.assignParamLst, this.strOrgGrpID, this.strAppId, this.strUserID).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spnrService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        for (var x = 0; x < _this.assignParamLst.length; x++) {
                                            _this.atParOrgGrpParametersLst[x].OLD_PARAMETERVALUE = _this.assignParamLst[x].PARAMETER_VALUE;
                                        }
                                        _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Organization group Parameters Updated Successfully" });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 5:
                        _a.sent();
                        this.spnrService.stop();
                        if (!(boolAudit == true && this.strAudit == "Y")) return [3 /*break*/, 7];
                        strScreenName = "mt_atpar_manage_org_groups.aspx";
                        //strFieldName = "ORG_GROUP_ID";                  
                        this.spnrService.start();
                        return [4 /*yield*/, this.commonService.insertAuditData(this.auditSecurityLst, this.strUserID, strScreenName).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spnrService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 6:
                        _a.sent();
                        this.spnrService.stop();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13, "btnSaveParams_Click");
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ManageOrgGroupsComponent.prototype.checkBillingInformation = function () {
        try {
            var parmId = "";
            for (var i = 0; i <= this.atParOrgGrpParametersLst.length - 1; i++) {
                if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "TEXTBOX") {
                    parmId = this.atParOrgGrpParametersLst[i].PARAMETER_ID.toString();
                    if (parmId == "ADT_BILLING_SEND_ADDRESS") {
                        if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() != "") {
                            return true;
                        }
                    }
                    if (parmId == "ADT_RECEIVING_APPLICATION") {
                        if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() != "") {
                            return true;
                        }
                    }
                    if (parmId == "ADT_RECEIVING_FACILITY") {
                        if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() != "") {
                            return true;
                        }
                    }
                    if (parmId == "ADT_BILLING_SEND_PORT") {
                        if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() != "") {
                            return true;
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkBillingInformation");
        }
    };
    ManageOrgGroupsComponent.prototype.bindModelDataChange = function (event) {
        if ("txtOrgGrpId" == event.TextBoxID.toString()) {
            this.txtOrgGrpIdStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtOrgGrpName" == event.TextBoxID.toString()) {
            this.txtOrgGrpNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if (!this.blnlblOrgGrpId) {
            if (this.txtOrgGrpIdStatus == 0 && this.txtOrgGrpNameStatus == 0) {
                this.buttonEnableDisable = false;
            }
            else {
                this.buttonEnableDisable = true;
            }
        }
        else {
            if (this.txtOrgGrpNameStatus == 0) {
                this.buttonEnableDisable = false;
            }
            else {
                this.buttonEnableDisable = true;
            }
        }
    };
    ManageOrgGroupsComponent.prototype.editOrgGroupLst = function (editOrgGroupData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Org Group';
                    this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                    this.statusMsgs = [];
                    this.blnlblOrgGrpId = true;
                    this.lblOrgGrpId = editOrgGroupData.ORG_GROUP_ID;
                    this.txtOrgGrpName = editOrgGroupData.ORG_GROUP_NAME.replace(/\%20/g, ' ');
                    this.strOldGrpName = editOrgGroupData.ORG_GROUP_NAME.replace(/\%20/g, ' ');
                    this.menu = false;
                    this.pop = true;
                    this.orgGroupGrd = false;
                    this.buttonEnableDisable = false;
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "editOrgGroupLst");
                }
                return [2 /*return*/];
            });
        });
    };
    ManageOrgGroupsComponent.prototype.addValidations = function (atParOrgGrpParametersLst) {
        return __awaiter(this, void 0, void 0, function () {
            var x;
            return __generator(this, function (_a) {
                try {
                    if (this.atParOrgGrpParametersLst == null) {
                        return [2 /*return*/];
                    }
                    for (x = 0; x <= this.atParOrgGrpParametersLst.length - 1; x++) {
                        if (this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "TEXTBOX" ||
                            this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "TEXT" ||
                            this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "TEXTAREA") {
                            if (this.atParOrgGrpParametersLst[x].VALIDATION == "NUMBER") {
                                this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            }
                            if (this.atParOrgGrpParametersLst[x].VALIDATION == "EMAIL") {
                                this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                            }
                            switch (this.atParOrgGrpParametersLst[x].PARAMETER_ID) {
                                case "MAX_NO_OF_REC_DOWNLOAD":
                                    {
                                        this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                        break;
                                    }
                                case "FACTOR_OF_SAFETY":
                                    {
                                        this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                        break;
                                    }
                                case "RECALL_NOTIFICATION_EMAIL":
                                    {
                                        this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                                        break;
                                    }
                                case "RECORDS_PER_PAGE":
                                    {
                                        this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                        break;
                                    }
                                case "DEFAULT_DATE_RANGE": {
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "DEFAULT_LEAD_TIME": {
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "PS_USER": {
                                    this.atParOrgGrpParametersLst[x].Title = "Please enter a characters or numbers or _-";
                                    break;
                                }
                                case "DEFAULT_PRIORITY": {
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "BADGE_TRACK_INFO":
                                    {
                                        this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                        break;
                                    }
                                case "LIMIT_OF_LISTS": {
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "DEFAULT_BUSINESS_UNIT": {
                                    this.atParOrgGrpParametersLst[x].Title = "Please enter a characters or numbers or _-";
                                    break;
                                }
                                case "B_MAX_STOR": {
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "E_MAX_STOR": {
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "F_MAX_STOR": {
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "NO_OF_REQUESTS_FOR_SAME_EQ_ITM": {
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "EMAILID_FOR_ALERTS": {
                                    this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                                    break;
                                }
                                case "FREQUENCY_EMAIL_ALERTS": {
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "PERCENTAGE_OPTIMUM_QTY": {
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "REFRESH_DATA_PERIOD": {
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "SYNC_FREQUENCY": {
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                    break;
                                }
                                case "EMAILID_FOR_LOWSTOCK_ALERTS": {
                                    this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                                    break;
                                }
                                case "EMAILID_FOR_PRODUCT_EXP_ALERTS":
                                    {
                                        this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                                        break;
                                    }
                                case "REQUESTOR_EMAIL_TABLE": {
                                    this.atParOrgGrpParametersLst[x].Title = "Table/view name to read Email ID for Requestor - Number of characters cannot be more than 50";
                                    break;
                                }
                                case "ADT_BILLING_SEND_ADDRESS":
                                    {
                                        this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                        break;
                                    }
                                case "ADT_BILLING_SEND_PORT":
                                    {
                                        this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                        break;
                                    }
                                case "ADT_BILLING_THRESHOLD_VALUE":
                                    {
                                        this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                        break;
                                    }
                                case "ADT_RECEIVING_APPLICATION":
                                    {
                                        this.atParOrgGrpParametersLst[x].Title = "Allow the Alphabets and Numbers";
                                        break;
                                    }
                                case "ADT_RECEIVING_FACILITY":
                                    {
                                        this.atParOrgGrpParametersLst[x].Title = "Allow the Alphabets and Numbers";
                                        break;
                                    }
                                case "COUNT_QTY_THRESHOLD":
                                    {
                                        this.atParOrgGrpParametersLst[x].Title = "Allows numerics,a double precision value";
                                        break;
                                    }
                                case "COUNT_DLR_VALUE_THRESHOLD":
                                    {
                                        this.atParOrgGrpParametersLst[x].Title = "Allows numerics,a double precision value";
                                        break;
                                    }
                                case "CUSTOM_SQL_DESTLOCATION":
                                    {
                                        this.atParOrgGrpParametersLst[x].PARAMETER_TYPE = "TEXTAREA";
                                        break;
                                    }
                                case "CUSTOM_SQL_DEPT":
                                    {
                                        this.atParOrgGrpParametersLst[x].PARAMETER_TYPE = "TEXTAREA";
                                        break;
                                    }
                            }
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "addValidations");
                }
                return [2 /*return*/];
            });
        });
    };
    ManageOrgGroupsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spnrService, strExMsg.toString(), funName, this.constructor.name);
    };
    ManageOrgGroupsComponent.prototype.customSort = function (event, field) {
        try {
            var checkedData = void 0;
            var unCheckedData = void 0;
            var element = event;
            if (this.sortCol == element.field) {
                this.blnsortbycolumn = !this.blnsortbycolumn;
            }
            else {
                this.blnsortbycolumn = true;
            }
            this.sortCol = element.field;
            var result_1 = null;
            var order = void 0;
            checkedData = [];
            unCheckedData = [];
            checkedData = linq_es5_1.asEnumerable(this.mngOrgGrpBunitsLst).Where(function (a) { return a.CHK_VALUE == 1; }).ToArray();
            unCheckedData = linq_es5_1.asEnumerable(this.mngOrgGrpBunitsLst).Where(function (a) { return a.CHK_VALUE == 0; }).ToArray();
            try {
                this.sortedcheckedrec = checkedData.sort(function (a, b) {
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
                this.sorteduncheckedrec = unCheckedData.sort(function (a, b) {
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
            }
            catch (ex) {
                this.clientErrorMsg(ex, "customSort");
            }
            this.mngOrgGrpBunitsLst = [];
            this.mngOrgGrpBunitsLst = checkedData.concat(unCheckedData);
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "onSort");
        }
    };
    ManageOrgGroupsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.statusMsgs = null;
        this.mngOrgGrpBunitsLst = null;
        this.orgGroupLst = null;
        this.orgGrpIdSearchLst = null;
        this.orgGroNameSearchLst = null;
        this.orgGroupBunitsLst = null;
        this.atParAppsLst = null;
        this.atParOrgGrpParametersLst = null;
        this.assignParamLst = null;
        this.assignParamEntity = null;
        this.mngOrgGrpBunitsLst = null;
        this.auditSecurityLst = null;
        this.ddlApps = null;
        this.recordsPerPageSize = null;
        this.strUserID = null;
        this.pProfile = null;
        this.orgGroupId = null;
        this.selectedorgGrpId = null;
        this.selectedorgGrpName = null;
        this.strOrgGrpID = null;
        this.strAudit = null;
        this.orgGroupName = null;
        this.strAppId = null;
        this.divOrgParamsData = null;
        this.intAppId = null;
        this.statusCode = null;
        this.statusType = null;
        this.strAppId = null;
        this.txtOrgGrpIdStatus = null;
        this.txtOrgGrpNameStatus = null;
        this.grdMngOrgGrpBunits = null;
        this.btnMngOrgGrpButton = null;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], ManageOrgGroupsComponent.prototype, "dataTableComponent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ManageOrgGroupsComponent.prototype, "appId", void 0);
    ManageOrgGroupsComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-manage-org-groups.component.html',
            providers: [atpar_manage_org_groups_service_1.ManageOrgGroupsService, atpar_common_service_1.AtParCommonService],
        }),
        __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService,
            router_1.Router,
            router_1.ActivatedRoute,
            event_spinner_service_1.SpinnerService,
            HttpService_1.HttpService,
            atpar_manage_org_groups_service_1.ManageOrgGroupsService,
            atpar_common_service_1.AtParCommonService,
            AtParConstants_1.AtParConstants])
    ], ManageOrgGroupsComponent);
    return ManageOrgGroupsComponent;
}());
exports.ManageOrgGroupsComponent = ManageOrgGroupsComponent;
//# sourceMappingURL=atpar-manage-org-groups.component.js.map