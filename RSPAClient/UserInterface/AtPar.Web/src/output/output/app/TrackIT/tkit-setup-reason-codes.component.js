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
var datatableservice_1 = require("./../components/datatable/datatableservice");
var employee_1 = require("../components/datatable/employee");
var TKIT_REASON_CODES_1 = require("../Entities/TKIT_REASON_CODES");
var tkit_setup_reason_codes_service_1 = require("./tkit-setup-reason-codes.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var AtParWebApiResponse_1 = require("../Shared/AtParWebApiResponse");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
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
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], SetupReasonCodesComponent.prototype, "dataTableComponent", void 0);
    SetupReasonCodesComponent = __decorate([
        core_1.Component({
            templateUrl: 'tkit-setup-reason-codes.component.html',
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
    return SetupReasonCodesComponent;
}());
exports.SetupReasonCodesComponent = SetupReasonCodesComponent;
//# sourceMappingURL=tkit-setup-reason-codes.component.js.map