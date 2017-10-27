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
var router_1 = require("@angular/router");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var MT_ATPAR_SECURITY_AUDIT_1 = require("../Entities/MT_ATPAR_SECURITY_AUDIT");
var mt_atpar_user_app_parameters_1 = require("../entities/mt_atpar_user_app_parameters");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var atpar_user_parameters_service_1 = require("./atpar-user-parameters.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var customvalidation_1 = require("../common/validations/customvalidation");
var Validators_1 = require("../components/atpartext/Validators");
var UserParametersComponent = (function () {
    function UserParametersComponent(httpService, activatedRoute, validate, userService, spinnerService, commonService, atParConstant) {
        this.httpService = httpService;
        this.activatedRoute = activatedRoute;
        this.validate = validate;
        this.userService = userService;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.statusMsgs = [];
        this._deviceTokenEntry = [];
        this.statusCode = -1;
        this.statusType = -1;
        this.selectedValue = "0";
        //boolean variables  
        this.blnlblOrgGrpId = false;
        this.blnddlOrgGrpID = false;
        this.blnlblStar = false;
        this.blntblGrid = false;
        this.chkbCntrl = "";
        this.lblOrgGrpId = "";
        this.lblStatusMessage = "";
        this.strOrgGrpID = "";
        this.strAudit = "";
        this.strMenuCode = "";
        this.dsParams = "";
        this.strUserID = undefined;
        this.loginUserID = undefined;
        this.errorCode = "";
        this.strAuditStatus = "";
        this.txtCntrl = "";
        this.ddUser = "";
        this.selectedOrgGrpID = "";
        this.strWhereCondition = "";
        this.strWhere = [];
        this.selectedCbValue = "";
        this._blnShowDrpDwn = false;
    }
    UserParametersComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.intAppId = parseInt(this.appId);
                        this.blntblGrid = false;
                        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.user_Parameter_Details = new Array();
                        return [4 /*yield*/, this.Page_Load()];
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
    UserParametersComponent.prototype.BindDynamicTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        this.user_Parameter_Details = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.userService.getUserParameters(this.intAppId.toString(), this.strUserID).
                                catch(this.httpService.handleError).then(function (res) {
                                _this.userParamsData = [];
                                _this.userParamsData = res.json().DataList;
                                for (var x = 0; x <= _this.userParamsData.length - 1; x++) {
                                    if (_this.userParamsData[x].PARAMETER_TYPE == "CHECKBOX") {
                                        if (_this.userParamsData[x].PARAMETER_VALUE == "Y") {
                                            _this.userParamsData[x].PARAMETER_VALUE = 'true';
                                        }
                                        else {
                                            _this.userParamsData[x].PARAMETER_VALUE = 'false';
                                        }
                                    }
                                    if (_this.userParamsData[x].PARAMETER_TYPE == "TEXTBOX") {
                                        if (_this.userParamsData[x].PARAMETER_ID == "DEFAULT_CARRIER_ID") {
                                            if (_this.userParamsData[x].VALIDATION != null && _this.userParamsData[x].VALIDATION != "") {
                                                _this.userParamsData[x].validationRules = _this.userParamsData[x].VALIDATION + "," + "Max=10";
                                            }
                                            else {
                                                _this.userParamsData[x].validationRules = "Max=10";
                                            }
                                        }
                                        else {
                                            if (_this.userParamsData[x].VALIDATION != null && _this.userParamsData[x].VALIDATION != "") {
                                                _this.userParamsData[x].validationRules = _this.userParamsData[x].VALIDATION + "," + "Max=50";
                                            }
                                            else {
                                                _this.userParamsData[x].validationRules = "Max=50";
                                            }
                                        }
                                    }
                                    _this.user_Parameter_Details.push(_this.userParamsData[x]);
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "BindDynamicTable");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserParametersComponent.prototype.Page_Load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        this.statusMsgs = [];
                        this.spinnerService.start();
                        this.statusCode = -1;
                        this.blntblGrid = false;
                        this.strUserID = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        this.loginUserID = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        if (typeof this.appId == undefined) {
                            this.intAppId = 0;
                        }
                        else {
                            this.intAppId = parseInt(this.appId);
                        }
                        return [4 /*yield*/, this.BindOrgGroups()];
                    case 1:
                        _a.sent();
                        this.ddlUserList = [];
                        this.ddlUserList.push({ label: "Select UserID", value: "Select UserID" });
                        this.ddUser = "Select UserID";
                        if (!(this.blnlblOrgGrpId == true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.PopulateUsersDropDown()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (this.blnddlOrgGrpID == true) {
                            this.blnlblStar = true;
                            sessionStorage.removeItem("dsUserParam");
                        }
                        if (!(sessionStorage.getItem("dsUserParam") != null)) return [3 /*break*/, 5];
                        this.blntblGrid = true;
                        return [4 /*yield*/, this.BindDynamicTable()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this.spinnerService.stop();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "Page_Load");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserParametersComponent.prototype.PopulateUsersDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        this.ddUserData = [];
                        if (this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] != "All") {
                            this.strOrgGrpID = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        }
                        if (this.blnddlOrgGrpID == true) {
                            this.strOrgGrpID = this.selectedItem;
                        }
                        this.spinnerService.start();
                        //Get Applications and bind to drop down list  this.strUserID
                        return [4 /*yield*/, this.commonService.getUsersList(this.loginUserID, this.intAppId.toString(), this.strOrgGrpID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.ddUserData = data.DataList,
                                    _this.statusCode = data.StatusCode;
                                sessionStorage.removeItem("dsUserParam");
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ddlUserList = [];
                                        _this.ddlUserList.push({ label: "Select UserID", value: "Select UserID" });
                                        for (var i = 0; i < _this.ddUserData.length; i++) {
                                            _this.ddlUserList.push({ label: _this.ddUserData[i].FULLNAME, value: _this.ddUserData[i].USER_ID });
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
                                }
                            })];
                    case 1:
                        //Get Applications and bind to drop down list  this.strUserID
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "PopulateUsersDropDown");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserParametersComponent.prototype.BindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.statusMsgs = [];
                        this._pdsOrgGroup = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                _this._pdsOrgGroup = res.json().DataList;
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        if (!(sessionStorage.getItem("OrgGroupID") != null && sessionStorage.getItem("OrgGroupID") == "All")) return [3 /*break*/, 3];
                        this.blnddlOrgGrpID = true;
                        //Getting the OrgGroupIDs
                        return [4 /*yield*/, this.commonService.getOrgGroupIDS().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this._pdsOrgGroup = res.json().DataList,
                                    _this.statusCode = res.json().StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
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
                                }
                            })];
                    case 2:
                        //Getting the OrgGroupIDs
                        _a.sent();
                        if (this._pdsOrgGroup.length > 0) {
                            this.ddlOrgGrpID = [];
                            this.ddlOrgGrpID.push({ label: "Select One", value: "Select One" });
                            for (i = 0; i <= this._pdsOrgGroup.length - 1; i++) {
                                if (this._pdsOrgGroup[i].ORG_GROUP_ID.toString() != "All") {
                                    this.ddlOrgGrpID.push({ label: this._pdsOrgGroup[i].ORG_GROUP_ID.toString() + " - " + this._pdsOrgGroup[i].ORG_GROUP_NAME.toString(), value: this._pdsOrgGroup[i].ORG_GROUP_ID.toString() });
                                }
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        this.blnlblOrgGrpId = true;
                        this.lblOrgGrpId = this._pdsOrgGroup[0].ORG_GROUP_ID.toString() + " - " + this._pdsOrgGroup[0].ORG_GROUP_NAME.toString();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "BindOrgGroups");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserParametersComponent.prototype.GOClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, _loop_1, this_1, x, ex_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 14, , 15]);
                        this.statusMsgs = [];
                        this.userParamsData = [];
                        this.statType = null;
                        this.user_Parameter_Details = null;
                        //this.blntblGrid = true;
                        if ((this.selectedOrgGrpID == "" || this.selectedOrgGrpID == "Select One") && this.blnddlOrgGrpID == true) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        if (this.ddUser == "" || this.ddUser == "Select UserID") {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select User ID" });
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        this.strUserID = this.ddUser;
                        setTimeout(function () {
                            _this.user_Parameter_Details = new Array();
                            _this.user_Parameter_Details = [];
                        }, 1);
                        if (!(this.user_Parameter_Details == null)) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.userService.getUserParameters(this.intAppId.toString(), this.strUserID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.userParamsData = [];
                                _this.userParamsData = res.json().DataList;
                                _this.statType = res.json().StatType;
                                _this.statMsg = res.json().StatusMessage;
                            })];
                    case 1:
                        _b.sent();
                        this.spinnerService.stop();
                        _a = this.statType;
                        switch (_a) {
                            case AtParEnums_1.StatusType.Success: return [3 /*break*/, 2];
                            case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 9];
                            case AtParEnums_1.StatusType.Error: return [3 /*break*/, 10];
                            case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 11];
                        }
                        return [3 /*break*/, 12];
                    case 2:
                        if (!(this.userParamsData.length > 0)) return [3 /*break*/, 7];
                        this.blntblGrid = true;
                        this.userAppParamList = new Array();
                        this.userAppParamList = [];
                        this.user_Parameter_Details = [];
                        _loop_1 = function (x) {
                            var strCondetion;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (this_1.userParamsData[x].PARAMETER_TYPE == "CHECKBOX") {
                                            if (this_1.userParamsData[x].PARAMETER_VALUE == "Y") {
                                                this_1.userParamsData[x].PARAMETER_VALUE = true;
                                            }
                                            else {
                                                this_1.userParamsData[x].PARAMETER_VALUE = false;
                                            }
                                        }
                                        if (!(this_1.userParamsData[x].PARAMETER_TYPE == "COMBOBOX")) return [3 /*break*/, 2];
                                        if (!(this_1.userParamsData[x].PROMPT_TABLE != null)) return [3 /*break*/, 2];
                                        this_1.strWhereCondition = this_1.userParamsData[x].WHERE_CONDITION;
                                        this_1.strWhere = this_1.strWhereCondition.split(',');
                                        this_1._blnShowDrpDwn = false;
                                        if (this_1.strWhere.length > 1) {
                                            this_1._blnShowDrpDwn = true;
                                            strCondetion = "";
                                            if (this_1.strWhere.length = 2) {
                                                strCondetion = this_1.strWhere[0].toString() + "='" + this_1.ddUser + "'";
                                                strCondetion = strCondetion + " AND " + this_1.strWhere[1].toString() + "='" + this_1.intAppId + "'";
                                            }
                                            this_1.strWhereCondition = strCondetion;
                                        }
                                        else {
                                            this_1.strWhereCondition = this_1.strWhereCondition + "='" + this_1.ddUser + "'";
                                        }
                                        this_1.spinnerService.start();
                                        return [4 /*yield*/, this_1.userService.GetParameterValues(this_1.userParamsData[x].PARAMETER_ID, this_1.userParamsData[x].PROMPT_FIELD, this_1.userParamsData[x].PROMPT_TABLE, this_1.strWhereCondition, this_1.strUserID).
                                                catch(this_1.httpService.handleError).then(function (dresp) {
                                                var data = dresp.json();
                                                _this.tblCmbList = [];
                                                _this.tblCmbList.push({ label: "Select One", value: "Select One" });
                                                if ((data.DataList != null && data.DataList.length > 0) || _this._blnShowDrpDwn) {
                                                    if (data.DataList != null && data.DataList.length > 0) {
                                                        for (var y = 0; y < data.DataList.length; y++) {
                                                            _this.tblCmbList.push({ label: data.DataList[y].toString(), value: data.DataList[y].toString() });
                                                        }
                                                    }
                                                }
                                                else {
                                                    _this.userParamsData[x].PARAMETER_TYPE = "TEXTBOX";
                                                }
                                                _this.userParamsData[x].DDLLIST = _this.tblCmbList;
                                            })];
                                    case 1:
                                        _a.sent();
                                        this_1.spinnerService.stop();
                                        _a.label = 2;
                                    case 2:
                                        if (this_1.userParamsData[x].PARAMETER_TYPE == "TEXTBOX" ||
                                            this_1.userParamsData[x].PARAMETER_TYPE == "TEXT") {
                                            if (this_1.userParamsData[x].VALIDATION != "" && this_1.userParamsData[x].VALIDATION == "NUMBER") {
                                                this_1.userParamsData[x].TITLE = 'Allows Only Numbers';
                                            }
                                            if (this_1.userParamsData[x].VALIDATION != "" && this_1.userParamsData[x].VALIDATION == "TEXT") {
                                                this_1.userParamsData[x].TITLE = 'Allows Numbers Alphabets No Space - /';
                                            }
                                            if (this_1.userParamsData[x].VALIDATION != "" && this_1.userParamsData[x].VALIDATION == "TEXTWITHSPACE") {
                                                this_1.userParamsData[x].TITLE = 'Allows Alphabets Numbers Space';
                                            }
                                            if (this_1.userParamsData[x].VALIDATION != "" && this_1.userParamsData[x].VALIDATION == "TEXTWITHSPECIALCHARS") {
                                                this_1.userParamsData[x].TITLE = 'Allows Any Characters Alphabets Numbers Space';
                                            }
                                            if (this_1.userParamsData[x].PARAMETER_ID == "DEFAULT_CARRIER_ID") {
                                                if (this_1.userParamsData[x].VALIDATION != null && this_1.userParamsData[x].VALIDATION != "") {
                                                    this_1.userParamsData[x].validationRules = this_1.userParamsData[x].VALIDATION + "," + "Max=10";
                                                }
                                                else {
                                                    this_1.userParamsData[x].validationRules = "Max=10";
                                                }
                                            }
                                            else {
                                                if (this_1.userParamsData[x].VALIDATION != null && this_1.userParamsData[x].VALIDATION != "") {
                                                    this_1.userParamsData[x].validationRules = this_1.userParamsData[x].VALIDATION + "," + "Max=50";
                                                }
                                                else {
                                                    this_1.userParamsData[x].validationRules = "Max=50";
                                                }
                                            }
                                        }
                                        this_1.userAppParameters = new mt_atpar_user_app_parameters_1.MT_ATPAR_USER_APP_PARAMETERS();
                                        this_1.userAppParameters.PARAMETER_ID = this_1.userParamsData[x].PARAMETER_ID;
                                        this_1.userAppParameters.PARAMETER_VALUE = this_1.userParamsData[x].PARAMETER_VALUE;
                                        this_1.userAppParameters.APP_ID = this_1.intAppId;
                                        this_1.userAppParameters.USER_ID = this_1.strUserID;
                                        this_1.userAppParameters.LAST_CLIENT_ADDRESS = "";
                                        this_1.userAppParameters.LAST_UPDATE_DATE = new Date();
                                        this_1.userAppParameters.LAST_UPDATE_USER = this_1._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                                        this_1.user_Parameter_Details.push(this_1.userParamsData[x]);
                                        this_1.userAppParamList.push(this_1.userAppParameters);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        x = 0;
                        _b.label = 3;
                    case 3:
                        if (!(x <= this.userParamsData.length - 1)) return [3 /*break*/, 6];
                        return [5 /*yield**/, _loop_1(x)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        x++;
                        return [3 /*break*/, 3];
                    case 6:
                        sessionStorage.setItem("dsUserParam", this.userParamsData.toString());
                        return [3 /*break*/, 8];
                    case 7:
                        this.blntblGrid = false;
                        _b.label = 8;
                    case 8: return [3 /*break*/, 12];
                    case 9:
                        {
                            this.blntblGrid = false;
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statMsg });
                            this.spinnerService.stop();
                            return [3 /*break*/, 12];
                        }
                        _b.label = 10;
                    case 10:
                        {
                            this.blntblGrid = false;
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: this.statMsg });
                            this.spinnerService.stop();
                            return [3 /*break*/, 12];
                        }
                        _b.label = 11;
                    case 11:
                        {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: this.statMsg });
                            return [3 /*break*/, 12];
                        }
                        _b.label = 12;
                    case 12:
                        //To get Audit Status
                        this.strMenuCode = localStorage.getItem("menuCode");
                        this.strAudit = "";
                        this.spinnerService.start();
                        return [4 /*yield*/, this.userService.getAuditAllowed(this.intAppId.toString()).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK && _this.strAudit == "Y") {
                                            _this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                            _this.auditSecurity.KEY_1 = "";
                                            _this.auditSecurity.KEY_2 = "";
                                            _this.auditSecurity.KEY_3 = "";
                                            _this.auditSecurity.KEY_4 = "";
                                            _this.auditSecurity.KEY_5 = "";
                                            _this.auditSecurity.FIELD_NAME = "";
                                            _this.auditSecurity.OLD_VALUE = "";
                                            _this.auditSecurity.NEW_VALUE = "";
                                            sessionStorage.setItem("auditSecurity", _this.auditSecurity.FIELD_NAME.toString());
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
                                }
                            })];
                    case 13:
                        _b.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 15];
                    case 14:
                        ex_6 = _b.sent();
                        this.clientErrorMsg(ex_6, "GOClick");
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    UserParametersComponent.prototype.btnSave_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var x, txtValue, numaric_regex, regex, regex, paramValue, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.statusMsgs = [];
                        this.auditSecurityLst = new Array();
                        if (!(this.userAppParamList != null && this.userAppParamList.length > 0)) return [3 /*break*/, 4];
                        this.intAppId = parseInt(this.appId);
                        //strAuditStatus = lblAudistStatus.Text;
                        this.strUserID = this.ddUser;
                        //if (strAuditStatus == "Y") {
                        //    dtAudit = (DataTable)Session["Audit"];
                        //}
                        for (x = 0; x < this.userAppParamList.length; x++) {
                            if (this.userAppParamList[x].PARAMETER_ID == this.user_Parameter_Details[x].PARAMETER_ID) {
                                //For TextBox Control
                                if (this.user_Parameter_Details[x].PARAMETER_TYPE == "TEXTBOX" ||
                                    this.user_Parameter_Details[x].PARAMETER_TYPE == "TEXT") {
                                    //To get Audit Data
                                    if (this.strAuditStatus == "Y") {
                                        if (this.userAppParamList[x].PARAMETER_VALUE != this.txtCntrl.toString()) {
                                            this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                            this.auditSecurity.KEY_1 = this.strUserID.toString();
                                            this.auditSecurity.KEY_2 = this.intAppId.toString();
                                            this.auditSecurity.KEY_3 = this.user_Parameter_Details[x].PARAMETER_ID;
                                            this.auditSecurity.KEY_4 = "USER PARAMETERS";
                                            this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                            this.auditSecurity.OLD_VALUE = this.userAppParamList[x].PARAMETER_VALUE.toString();
                                            this.auditSecurity.NEW_VALUE = this.txtCntrl.toString();
                                            this.auditSecurityLst.push(this.auditSecurity);
                                        }
                                    }
                                    txtValue = this.user_Parameter_Details[x].PARAMETER_VALUE.toString();
                                    //Implement Validation Code        
                                    if (this.user_Parameter_Details[x].VALIDATION != "" && this.user_Parameter_Details[x].VALIDATION == "NUMBER") {
                                        numaric_regex = "numeric";
                                        this.user_Parameter_Details[x].TITLE = 'Allows Only Numbers';
                                        if (!Validators_1.regExpValidator(numaric_regex, txtValue)) {
                                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.user_Parameter_Details[x].SHORT_DESCR + "- Please enter Numerics" });
                                            return [2 /*return*/];
                                        }
                                    }
                                    else if (this.user_Parameter_Details[x].PARAMETER_VALUE != "" && this.user_Parameter_Details[x].VALIDATION == "TEXT") {
                                        this.user_Parameter_Details[x].TITLE = 'Allows Numbers Alphabets - / No Space';
                                        if (!Validators_1.regExpValidator("alpha_numeric_underscore_hyphen_backslash_nospace", txtValue)) {
                                            if (this.user_Parameter_Details[x].SHORT_DESCR.toUpperCase().trim() == "DEFAULTCARRIERID") {
                                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Default Carrier ID - Please enter characters or numbers or _ or -" });
                                            }
                                            else {
                                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.user_Parameter_Details[x].SHORT_DESCR + " - Please enter characters or numbers or - or _" });
                                            }
                                            return [2 /*return*/];
                                        }
                                    }
                                    else if (txtValue != "" && this.user_Parameter_Details[x].VALIDATION == "TEXTWITHSPACE") {
                                        regex = "/^[a-zA-Z0-9_\\s/-]+$/";
                                        this.user_Parameter_Details[x].TITLE = 'Allows Alphabets Numbers Space';
                                        if (!Validators_1.regExpValidator("alpha_numeric_space", txtValue)) {
                                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.user_Parameter_Details[x].SHORT_DESCR + " - Please enter characters or numbers  with Space" });
                                            return [2 /*return*/];
                                        }
                                    }
                                    else if (txtValue != "" && this.user_Parameter_Details[x].VALIDATION == "TEXTWITHSPECIALCHARS") {
                                        regex = "/^[a-zA-Z0-9_\\s*#&()-/:']+$/";
                                        this.user_Parameter_Details[x].TITLE = 'Allows Any Characters Alphabets Numbers Space';
                                        if (!Validators_1.regExpValidator("alpha_numeric_specialcharacters_WithSpace", txtValue)) {
                                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.user_Parameter_Details[x].SHORT_DESCR + " - Please enter characters or numbers or Special Charactors(_\\s*#&()-/:) with Space" });
                                            return [2 /*return*/];
                                        }
                                    }
                                    if (this.user_Parameter_Details[x].PARAMETER_ID == "DEFAULT_CARRIER_ID") {
                                        this.txtCntrl = this.txtCntrl.toUpperCase();
                                    }
                                    paramValue = this.user_Parameter_Details[x].PARAMETER_VALUE;
                                    this.userAppParamList[x].PARAMETER_VALUE = paramValue;
                                    if (this.userAppParamList[x].PARAMETER_VALUE == "Select One") {
                                        this.userAppParamList[x].PARAMETER_VALUE = "";
                                    }
                                }
                                //For CheckBox Control
                                if (this.user_Parameter_Details[x].PARAMETER_TYPE == "CHECKBOX") {
                                    //To get Audit Data
                                    if (this.strAuditStatus == "Y") {
                                        if (this.userAppParamList[x].PARAMETER_VALUE != this.chkbCntrl) {
                                            this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                            this.auditSecurity.KEY_1 = this.strUserID.toString();
                                            this.auditSecurity.KEY_2 = this.intAppId.toString();
                                            this.auditSecurity.KEY_3 = this.user_Parameter_Details[x].PARAMETER_ID;
                                            this.auditSecurity.KEY_4 = "USER PARAMETERS";
                                            this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                            this.auditSecurity.OLD_VALUE = this.userAppParamList[x].PARAMETER_VALUE.toString();
                                            this.auditSecurity.NEW_VALUE = this.chkbCntrl.toString();
                                            this.auditSecurityLst.push(this.auditSecurity);
                                        }
                                    }
                                    if (this.chkbCntrl == "Y") {
                                        this.userAppParamList[x].PARAMETER_VALUE = "Y";
                                    }
                                    else {
                                        this.userAppParamList[x].PARAMETER_VALUE = "N";
                                    }
                                }
                                //For Radio Button
                                if (this.user_Parameter_Details[x].PARAMETER_TYPE == "RADIO") {
                                    //To get Audit Data
                                    if (this.strAuditStatus == "Y") {
                                        if (this.userAppParamList[x].PARAMETER_VALUE != "") {
                                            this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                            this.auditSecurity.KEY_1 = this.strUserID.toString();
                                            this.auditSecurity.KEY_2 = this.intAppId.toString();
                                            this.auditSecurity.KEY_3 = this.user_Parameter_Details[x].PARAMETER_ID;
                                            this.auditSecurity.KEY_4 = "USER PARAMETERS";
                                            this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                            this.auditSecurity.OLD_VALUE = this.userAppParamList[x].PARAMETER_VALUE.toString();
                                            this.auditSecurity.NEW_VALUE = ""; //rbLstCntrl.SelectedValue;
                                            this.auditSecurityLst.push(this.auditSecurity);
                                        }
                                    }
                                    this.userAppParamList[x].PARAMETER_VALUE = ""; //rbLstCntrl.SelectedValue;
                                }
                                //For COMBOBOX
                                if (this.user_Parameter_Details[x].PARAMETER_TYPE == "COMBOBOX") {
                                    //To get Audit Data
                                    if (this.strAuditStatus == "Y") {
                                        if (this.userAppParamList[x].PARAMETER_VALUE != this.user_Parameter_Details[x].PARAMETER_VALUE) {
                                            this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                            this.auditSecurity.KEY_1 = this.strUserID.toString();
                                            this.auditSecurity.KEY_2 = this.intAppId.toString();
                                            this.auditSecurity.KEY_3 = this.user_Parameter_Details[x].PARAMETER_ID;
                                            this.auditSecurity.KEY_4 = "USER PARAMETERS";
                                            this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                            this.auditSecurity.OLD_VALUE = this.userAppParamList[x].PARAMETER_VALUE.toString();
                                            this.auditSecurity.NEW_VALUE = this.user_Parameter_Details[x].PARAMETER_VALUE; // this.ddCntrl.toString();
                                            this.auditSecurityLst.push(this.auditSecurity);
                                        }
                                    }
                                    if (this.user_Parameter_Details[x].PARAMETER_VALUE == null || this.user_Parameter_Details[x].PARAMETER_VALUE == "" ||
                                        this.userAppParamList[x].PARAMETER_VALUE == "Select One" || this.user_Parameter_Details[x].PARAMETER_VALUE == undefined) {
                                        this.userAppParamList[x].PARAMETER_VALUE = "";
                                    }
                                    else {
                                        this.userAppParamList[x].PARAMETER_VALUE = this.user_Parameter_Details[x].PARAMETER_VALUE; // this.ddCntrl.toString();// this.selectedCbValue.toString();
                                    }
                                }
                            }
                        }
                        this.statusCode = -1;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.userService.setUserParams(this.userAppParamList).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.statusCode = response.StatusCode;
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        // ddUser.SelectedIndex = 0; 
                                        //this.chkbCntrl = "";                                 
                                        _this.lblStatusMessage = "Parameters for User - " + _this.ddUser + " have been successfully updated. "; //strUserID  
                                        _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.lblStatusMessage });
                                        _this.blntblGrid = false;
                                        sessionStorage.removeItem("dsUserParam");
                                        _this.ddUser = "Select UserID";
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
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        if (!(this.strAuditStatus == "Y")) return [3 /*break*/, 3];
                        this.strMenuCode = localStorage.getItem("menuCode");
                        this.spinnerService.start();
                        return [4 /*yield*/, this.userService.insertAuditData(this.auditSecurityLst, "", this.strMenuCode).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.statusCode = response.StatusCode;
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: response.StatusMessage });
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
                                }
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.strUserID = this.ddUser;
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "btnSave_Click");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserParametersComponent.prototype.ngOnDestroy = function () {
        this.user_Parameter_Details = null;
        this.statusCode = -1;
        this.ddlUserList = null;
        this.userParamsData = null;
        this.ddUserData = null;
        this.validationrule = null;
        this._pdsOrgGroup = null;
        this.ddlOrgGrpID = null;
        this.auditSecurity = null;
        this.auditSecurityLst = null;
        this.userAppParameters = null;
        this.userAppParamList = null;
        this.statusMsgs = null;
        this.chkbCntrl = "";
        this.strWhere = null;
    };
    UserParametersComponent.prototype.bindModelDataChange = function (data) {
        this.selectedValue = data.label;
        this.selectedItem = data.value;
        this.blntblGrid = false;
        this.ddUser = "Select UserID";
        if (this.selectedItem == "Select One") {
            this.ddlUserList = [];
            this.ddlUserList.push({ label: "Select UserID", value: "Select UserID" });
            this.ddUser = "Select UserID";
        }
        else {
            this.PopulateUsersDropDown();
        }
    };
    UserParametersComponent.prototype.ddlUserListChange = function (data) {
        this.statusMsgs = [];
        this.blntblGrid = false;
    };
    UserParametersComponent.prototype.txtChanged = function (event) {
        this.txtCntrl = event.val;
    };
    UserParametersComponent.prototype.ChkBoxChanged = function (val) {
        if (val) {
            this.chkbCntrl = "Y";
        }
        else {
            this.chkbCntrl = "N";
        }
    };
    UserParametersComponent.prototype.tblCmbListChanged = function (parameterLst, event) {
        try {
            if (event != null && event != undefined) {
                parameterLst.PARAMETER_VALUE = event.label;
                var val = parameterLst.PARAMETER_VALUE;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "tblCmbListChanged");
        }
    };
    UserParametersComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spinnerService, strExMsg.toString());
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], UserParametersComponent.prototype, "appId", void 0);
    UserParametersComponent = __decorate([
        core_1.Component({
            selector: 'atpar-user-parameters',
            templateUrl: 'atpar-user-parameters.component.html',
            providers: [HttpService_1.HttpService, customvalidation_1.CustomValidations, atpar_user_parameters_service_1.AtParUserParameterService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            router_1.ActivatedRoute,
            customvalidation_1.CustomValidations,
            atpar_user_parameters_service_1.AtParUserParameterService,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            AtParConstants_1.AtParConstants])
    ], UserParametersComponent);
    return UserParametersComponent;
}());
exports.UserParametersComponent = UserParametersComponent;
var Values = (function () {
    function Values(id, name) {
        this.id = id;
        this.name = name;
    }
    return Values;
}());
exports.Values = Values;
//# sourceMappingURL=atpar-user-parameters.component.js.map