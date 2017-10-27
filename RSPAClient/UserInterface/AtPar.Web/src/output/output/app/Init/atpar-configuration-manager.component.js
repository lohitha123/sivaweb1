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
/// <reference path="../components/tabcomponent/tab.ts" />
/// <reference path="../components/atpartext/validators.ts" />
var core_1 = require("@angular/core");
var atpar_configuration_manager_service_1 = require("./atpar-configuration-manager.service");
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var router_1 = require("@angular/router");
var HttpService_1 = require("../Shared/HttpService");
var http_1 = require("@angular/http");
var configdata_1 = require("../shared/configdata");
var AtParEnums_1 = require("../Shared/AtParEnums");
var customvalidation_1 = require("../common/validations/customvalidation");
var CryptoJS = require("crypto-js");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var spinner_sent_event_1 = require("../components/spinner/spinner.sent.event");
var Rx_1 = require("rxjs/Rx");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var izendaintegrate_1 = require("../_helpers/izendaintegrate");
var Validators_1 = require("../components/atpartext/Validators");
var authentication_service_1 = require("../_services/authentication.service");
var ConfigurationManagerComponent = (function () {
    function ConfigurationManagerComponent(configMgrService, el, httpService, http, leftBarAnimationsewrvice, router, route, spinnerService, validate, atparCommonService, izItergrate, authenticationservice, atParConstants) {
        this.configMgrService = configMgrService;
        this.el = el;
        this.httpService = httpService;
        this.http = http;
        this.leftBarAnimationsewrvice = leftBarAnimationsewrvice;
        this.router = router;
        this.route = route;
        this.spinnerService = spinnerService;
        this.validate = validate;
        this.atparCommonService = atparCommonService;
        this.izItergrate = izItergrate;
        this.authenticationservice = authenticationservice;
        this.atParConstants = atParConstants;
        this.logxml = "";
        this.ldabenable = false;
        //tab variables
        this.isbool = false;
        this.tb_ERP_System = true;
        this.tb_ERP_Database = false;
        this.tb_AtPar_Database = false;
        this.tab_AtPar_System = false;
        this.tab_Email = false;
        this.tab_LDAP = false;
        this.tab_SSO = false;
        this.tab_LOG_CONFIG = false;
        this.tab_HL7 = false;
        this.DFlag = true;
        this.obj = null;
        this.deferpSystems = "Select ERP System";
        this.deferpVersions = "Select One";
        this.deferpTypes = " Type";
        this.defdownloads = "Select One";
        this.defUplods = "Select One";
        this.selectedDevice = "Select ERP System";
        this.arrOracle = "NONE,{Microsoft ODBC for Oracle},{Oracle ODBC Driver}";
        this.arrSqlServer = "NONE,{SQL Server}";
        this.arrDb2 = "NONE,{IBMDADB2}";
        this.arrInformix = "NONE,{Informix 3.34 32 Bit}";
        this.deferpsystemsvalues = [];
        this.deferpversionsvalues = [];
        this.deferpdownloadsvalues = [];
        this.deferpuploadsvalues = [];
        this.defarryOracleValues = [];
        this.defarrySqlServerValues = [];
        this.defarryDb2values = [];
        this.defarryInformixvalues = [];
        this.defarrayERPDatabases = [];
        this.defarrayAtparDatabases = [];
        this.defarrayAtparArchiveDatabases = [];
        this.defarrayEmailDatabases = [];
        this.growlmsgs = [];
        this.blnFileUpload = true;
        this.isVisible = false;
        this.erpSYSTab = true;
        this.erpDBTab = false;
        this.atpardbTab = false;
        this.atparSYSTab = false;
        this.emailTab = false;
        this.logTab = false;
        this.ldapTab = false;
        this.ssoTab = false;
        this.regUser = false;
    }
    ConfigurationManagerComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.TabName_Details = new Array();
                        this.ERP_System_Details = new Array();
                        this.ERP_Database = new Array();
                        this.MainERP_Database = new Array();
                        this.AtPar_Database = new Array();
                        this.AtPar_System = new Array();
                        this.Email = new Array();
                        this.LDAP = new Array();
                        this.SSO = new Array();
                        this.LOG_CONFIG = new Array();
                        this.HL7 = new Array();
                        this.MainHL7 = new Array();
                        this.sslTabData = new Array();
                        this.recallTabData = new Array();
                        this.reportsConfigTabData = new Array();
                        this.reportsDBTabData = new Array();
                        return [4 /*yield*/, this.bindDynamicTable()];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        setTimeout(function () {
                            var drpdownErpDetails = document.getElementById('txtERP_SYS_DETAILSENTERPRISESYSTEM');
                            if (drpdownErpDetails != null) {
                                drpdownErpDetails.focus();
                            }
                        }, 1);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "getMargin");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.selectionChanged = function (cls) {
        var _this = this;
        try {
            if (cls.PARAMETER_ID == configdata_1.ConfigData.ERP_SYS_DETAILS[configdata_1.ConfigData.ERP_SYS_DETAILS.ENTERPRISESYSTEM].toString()) {
                this.TabName_Details = new Array();
                this.deferpVersions = "SELECT ONE";
                this.defdownloads = "SELECT ONE";
                this.defUplods = "SELECT ONE";
                this.ERP_System_Details.forEach(function (x) {
                    if (x.VALID_FOR_ERP != null) {
                        if (cls.PARAMETER_VALUE == null) {
                            cls.PARAMETER_VALUE = "";
                        }
                        var item = x.VALID_FOR_ERP.split(",");
                        var isadd = false;
                        for (var y = 0; y < item.length; y++) {
                            if (cls.PARAMETER_VALUE == 'GEAC') {
                                if (item[y].toUpperCase().trim() != "ALL") {
                                    if (!isadd) {
                                        if (item[y].toUpperCase().trim() == 'GEAC_AS400' ||
                                            item[y].toUpperCase().trim() == 'GEAC') {
                                            isadd = true;
                                            _this.TabName_Details.push(x);
                                        }
                                    }
                                }
                                else {
                                    _this.TabName_Details.push(x);
                                }
                            }
                            if ((cls.PARAMETER_VALUE != 'GEAC') &&
                                (item[y].toUpperCase().trim() == cls.PARAMETER_VALUE.toUpperCase().trim() || item[y].toUpperCase().trim() == "ALL")) {
                                _this.TabName_Details.push(x);
                            }
                        }
                    }
                });
                var ver = 0;
                this.deferpversionsvalues.length = 0;
                this.deferpdownloadsvalues.length = 0;
                this.deferpuploadsvalues.length = 0;
                this.deferpversionsvalues.push({ value: "SELECT ONE", label: "SELECT ONE" });
                this.deferpdownloadsvalues.push({ value: "SELECT ONE", label: "SELECT ONE" });
                this.deferpuploadsvalues.push({ value: "SELECT ONE", label: "SELECT ONE" });
                var erpVerSystemDetails = this.enterpriseSystemDetails.filter(function (x) { return x.ENTERPRISE_SYSTEM == cls.PARAMETER_VALUE && x.TYPE == 'Version'; });
                for (var x = 0; x < erpVerSystemDetails.length; x++) {
                    this.deferpversionsvalues.push({ value: erpVerSystemDetails[x].ENTERPRISE_VERSION, label: erpVerSystemDetails[x].ENTERPRISE_VERSION });
                }
                var erpVersionRow = this.TabName_Details.filter(function (x) { return x.PARAMETER_ID == configdata_1.ConfigData.ERP_SYS_DETAILS[configdata_1.ConfigData.ERP_SYS_DETAILS.ENTERPRISEVERSION].toString(); });
                if (erpVersionRow != null && erpVersionRow.length > 0) {
                    if (this.defaultErpsystem != cls.PARAMETER_VALUE) {
                        erpVersionRow[0].PARAMETER_VALUE = 'SELECT ONE';
                    }
                    erpVersionRow[0].DEFAULT_VALUE = this.deferpversionsvalues;
                }
                var erpduSystemDetails = this.enterpriseSystemDetails.filter(function (x) { return x.ENTERPRISE_SYSTEM == cls.PARAMETER_VALUE && x.TYPE == 'Upload_Download'; });
                var _loop_1 = function (x) {
                    var downItem_1 = erpduSystemDetails[x].DOWNLOAD_FROM;
                    var upLoadItem = erpduSystemDetails[x].UPLOAD_TO;
                    var downlistItem = this_1.deferpdownloadsvalues.filter(function (x) { return x.label == downItem_1; });
                    if (downlistItem == null || downlistItem == undefined || downlistItem.length == 0) {
                        this_1.deferpdownloadsvalues.push({
                            value: erpduSystemDetails[x].DOWNLOAD_FROM,
                            label: erpduSystemDetails[x].DOWNLOAD_FROM
                        });
                    }
                };
                var this_1 = this;
                for (var x = 0; x < erpduSystemDetails.length; x++) {
                    _loop_1(x);
                }
                var downloadFromRow = this.TabName_Details.filter(function (x) { return x.PARAMETER_ID == 'DOWNLOADFROM'; });
                if (downloadFromRow != null && downloadFromRow.length > 0) {
                    if (this.defaultErpsystem != cls.PARAMETER_VALUE) {
                        downloadFromRow[0].PARAMETER_VALUE = 'SELECT ONE';
                    }
                    downloadFromRow[0].DEFAULT_VALUE = this.deferpdownloadsvalues;
                }
                var erpSys_1 = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString()
                    && x.PARAMETER_ID == configdata_1.ConfigData.ERP_SYS_DETAILS[configdata_1.ConfigData.ERP_SYS_DETAILS.ENTERPRISESYSTEM].toString(); })[0].PARAMETER_VALUE;
                var downItem_2 = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString()
                    && x.PARAMETER_ID == configdata_1.ConfigData.ERP_SYS_DETAILS[configdata_1.ConfigData.ERP_SYS_DETAILS.DOWNLOADFROM].toString(); })[0].PARAMETER_VALUE;
                var drUploadTo = this.enterpriseSystemDetails.filter(function (x) { return x.ENTERPRISE_SYSTEM == erpSys_1 && x.TYPE == 'Upload_Download' && x.DOWNLOAD_FROM == downItem_2; });
                this.deferpuploadsvalues.length = 0;
                this.deferpuploadsvalues.push({ value: "SELECT ONE", label: "SELECT ONE" });
                var _loop_2 = function (x) {
                    var upLoadItem = drUploadTo[x].DOWNLOAD_FROM;
                    var uplistItem = this_2.deferpuploadsvalues.filter(function (x) { return x.label == upLoadItem; });
                    if (uplistItem == null || uplistItem == undefined || uplistItem.length == 0) {
                        this_2.deferpuploadsvalues.push({
                            value: drUploadTo[x].UPLOAD_TO,
                            label: drUploadTo[x].UPLOAD_TO
                        });
                    }
                };
                var this_2 = this;
                for (var x = 0; x < drUploadTo.length; x++) {
                    _loop_2(x);
                }
                var upLoadToRow = this.TabName_Details.filter(function (x) { return x.PARAMETER_ID == 'UPLOADTO'; });
                if (upLoadToRow != null && upLoadToRow.length > 0) {
                    if (this.defaultErpsystem != cls.PARAMETER_VALUE) {
                        upLoadToRow[0].PARAMETER_VALUE = 'SELECT ONE';
                    }
                    if (downloadFromRow != null && downloadFromRow.length > 0 && downloadFromRow[0].PARAMETER_VALUE != 'SELECT ONE') {
                        upLoadToRow[0].DEFAULT_VALUE = this.deferpuploadsvalues;
                    }
                    else {
                        var updropitems = new Array();
                        updropitems.push({ value: "SELECT ONE", label: "SELECT ONE" });
                        upLoadToRow[0].DEFAULT_VALUE = updropitems;
                    }
                }
                if (cls.VALIDATION_RULES != '' && cls.VALIDATION_RULES != null) {
                    return this.validationRules(cls.PARAMETER_VALUE, cls);
                }
            }
            else if (cls.PARAMETER_ID == 'DATABASE') {
                var dbparamval_1 = cls.PARAMETER_VALUE;
                this.ERP_Database = new Array();
                this.defarryOracleValues.length = 0;
                this.defarrySqlServerValues.length = 0;
                this.defarryDb2values.length = 0;
                this.defarryInformixvalues.length = 0;
                this.MainERP_Database.forEach(function (x) {
                    if (x.VALID_FOR_ERP != null) {
                        if (cls.PARAMETER_VALUE == null) {
                            cls.PARAMETER_VALUE = "";
                        }
                        var item = x.VALID_FOR_ERP.split(",");
                        for (var y = 0; y < item.length; y++) {
                            if (item[y].toUpperCase().trim() == cls.PARAMETER_VALUE.toUpperCase().trim() || item[y].toUpperCase().trim() == "ALL") {
                                _this.ERP_Database.push(x);
                            }
                        }
                    }
                });
                var driverparamval = null;
                if (dbparamval_1 != null && dbparamval_1 != undefined) {
                    driverparamval = this.ERP_Database.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()
                        && x.PARAMETER_ID == 'DRIVER' && x.PARAMETER_VALUE == dbparamval_1; });
                }
                if (dbparamval_1 != null && dbparamval_1 == "ORACLE") {
                    for (var x = 0; x < this.arrOracle.split(',').length; x++) {
                        this.defarryOracleValues.push({ value: this.arrOracle.split(',')[x].toString(), label: this.arrOracle.split(',')[x].toString() });
                    }
                    this.ERP_Database.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                        x.PARAMETER_ID == 'DRIVER'; })[0].DEFAULT_VALUE = this.defarryOracleValues;
                }
                else if (dbparamval_1 != null && dbparamval_1 == "SQLSERVER") {
                    for (var x = 0; x < this.arrSqlServer.split(',').length; x++) {
                        this.defarrySqlServerValues.push({ value: this.arrSqlServer.split(',')[x].toString(), label: this.arrSqlServer.split(',')[x].toString() });
                    }
                    this.ERP_Database.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                        x.PARAMETER_ID == 'DRIVER'; })[0].DEFAULT_VALUE = this.defarrySqlServerValues;
                }
                else if (dbparamval_1 != null && dbparamval_1 == "DB2") {
                    for (var x = 0; x < this.arrDb2.split(',').length; x++) {
                        this.defarryDb2values.push({ value: this.arrDb2.split(',')[x].toString(), label: this.arrDb2.split(',')[x].toString() });
                    }
                    this.ERP_Database.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                        x.PARAMETER_ID == 'DRIVER'; })[0].DEFAULT_VALUE = this.defarryDb2values;
                }
                else if (dbparamval_1 != null && dbparamval_1 == "INFORMIX") {
                    for (var x = 0; x < this.arrInformix.split(',').length; x++) {
                        this.defarryInformixvalues.push({ value: this.arrInformix.split(',')[x].toString(), label: this.arrInformix.split(',')[x].toString() });
                    }
                    this.ERP_Database.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                        x.PARAMETER_ID == 'DRIVER'; })[0].DEFAULT_VALUE = this.defarryInformixvalues;
                }
                else {
                    cls.PARAMETER_VALUE = "NONE";
                }
            }
            else if (cls.PARAMETER_ID == 'DOWNLOADFROM') {
                var erpSys_2 = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString()
                    && x.PARAMETER_ID == configdata_1.ConfigData.ERP_SYS_DETAILS[configdata_1.ConfigData.ERP_SYS_DETAILS.ENTERPRISESYSTEM].toString(); })[0].PARAMETER_VALUE;
                var drUploadTo = this.enterpriseSystemDetails.filter(function (x) { return x.ENTERPRISE_SYSTEM.toUpperCase() == erpSys_2.toUpperCase() && x.TYPE == 'Upload_Download' && x.DOWNLOAD_FROM == cls.PARAMETER_VALUE; });
                this.deferpuploadsvalues.length = 0;
                this.deferpuploadsvalues.push({ value: "SELECT ONE", label: "SELECT ONE" });
                for (var x = 0; x < drUploadTo.length; x++) {
                    this.deferpuploadsvalues.push({
                        value: drUploadTo[x].UPLOAD_TO,
                        label: drUploadTo[x].UPLOAD_TO
                    });
                }
                var upitems = this.TabName_Details.filter(function (x) { return x.PARAMETER_ID == "UPLOADTO"; });
                if (upitems != null && upitems.length > 0) {
                    if (this.defaultErpsystem != cls.PARAMETER_VALUE) {
                        upitems[0].PARAMETER_VALUE = 'SELECT ONE';
                    }
                    upitems[0].DEFAULT_VALUE = this.deferpuploadsvalues;
                }
            }
            else if (cls.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFORMATION_SYSTEM].toString()) {
                if (cls.PARAMETER_VALUE == 'HSM') {
                    this.ldabenable = true;
                }
                else {
                    this.ldabenable = false;
                }
                this.HL7 = new Array();
                this.MainHL7.forEach(function (x) {
                    if (x.VALID_FOR_ERP != null) {
                        if (cls.PARAMETER_VALUE == null) {
                            cls.PARAMETER_VALUE = "";
                        }
                        var item = x.VALID_FOR_ERP.split(",");
                        for (var y = 0; y < item.length; y++) {
                            if (item[y].toUpperCase().trim() == cls.PARAMETER_VALUE.toUpperCase().trim() || item[y].toUpperCase().trim() == "ALL") {
                                _this.HL7.push(x);
                            }
                        }
                    }
                });
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectionChanged");
        }
    };
    ConfigurationManagerComponent.prototype.validationRules = function (val, cls) {
        try {
            this.parval = val;
            this.arrValidations = cls.VALIDATION_RULES.split(',');
            if (this.arrValidations != null) {
                if (this.arrValidations.length > 0) {
                    for (var x = 0; x < this.arrValidations.length; x++) {
                        this.pattername = this.arrValidations[x];
                        if (this.pattername == 'NUMERIC') {
                            var NUMERIC_REGEXP = /^[0-9]*$/;
                            if (!NUMERIC_REGEXP.test(val)) {
                                cls.IsValidate = true;
                                cls.VALIDATIONMessage = "Enter Only Numerics";
                                return false;
                            }
                            else {
                                cls.IsValidate = false;
                                cls.VALIDATIONMessage = "";
                            }
                        }
                        else if (this.pattername == 'EMAIL') {
                            var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
                            if (EMAIL_REGEXP.test(this.parval)) {
                                cls.IsValidate = false;
                                cls.VALIDATIONMessage = "";
                            }
                            else {
                                cls.IsValidate = true;
                                cls.VALIDATIONMessage = "Enter Proper Email Ids";
                            }
                        }
                        else if (this.pattername == 'MIN' && this.parval.length < cls.MinLength) {
                            cls.IsValidate = true;
                            cls.VALIDATIONMessage = "Value should be greater than " + cls.MinLength + " values";
                        }
                        else if (this.pattername == 'MAX' && this.parval.length > cls.MaxLength) {
                            cls.IsValidate = true;
                            cls.VALIDATIONMessage = "Value should be less than " + cls.MaxLength + " values";
                            return false;
                        }
                        else if (this.pattername == 'MANDATORY') {
                            if (val == '' || val == 'SELECT ONE') {
                                cls.IsValidate = true;
                                cls.VALIDATIONMessage = "please enter some value";
                                return false;
                            }
                            else {
                                cls.IsValidate = false;
                                cls.VALIDATIONMessage = "";
                            }
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "validationRules");
        }
    };
    ConfigurationManagerComponent.prototype.bindDynamicTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.configMgrService.getConfigDetails(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId])
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.configData = data.DataDictionary["configSectionList"];
                                _this.enterpriseSystemDetails = data.DataDictionary["enterpriseList"];
                                _this.validationsForInputs(_this.configData);
                                var configerpSystemDetails = _this.configData.filter(function (x) { return x.TAB_ID == 'ERP_SYS_DETAILS' && x.DISPLAY_FLAG == "Y"; });
                                _this.defaultErpsystem = _this.configData.filter(function (x) { return x.TAB_ID == 'ERP_SYS_DETAILS' && x.DISPLAY_FLAG == "Y"; })[0].PARAMETER_VALUE;
                                var erpRemoteData = _this.configData.filter(function (x) { return x.TAB_ID == 'REMOTEDBCONNECTION' && x.DISPLAY_FLAG == "Y"; });
                                _this.AtPar_Database = _this.configData.filter(function (x) { return x.TAB_ID == 'SYSTEMDBCONNECTION' && x.DISPLAY_FLAG == "Y"; });
                                _this.AtPar_System = _this.configData.filter(function (x) { return x.TAB_ID == 'ATPAR_SYSTEM' && x.DISPLAY_FLAG == "Y"; });
                                _this.Email = _this.configData.filter(function (x) { return x.TAB_ID == 'EMAILCONFIGARATION' && x.DISPLAY_FLAG == "Y"; });
                                _this.LDAP = _this.configData.filter(function (x) { return x.TAB_ID == 'LDAPCONFIG' && x.DISPLAY_FLAG == "Y"; });
                                _this.SSO = _this.configData.filter(function (x) { return x.TAB_ID == 'SSO' && x.DISPLAY_FLAG == "Y"; });
                                _this.LOG_CONFIG = _this.configData.filter(function (x) { return x.TAB_ID == 'LOG_CONFIG' && x.DISPLAY_FLAG == "Y"; });
                                var hl7 = _this.configData.filter(function (x) { return x.TAB_ID == 'HL7' && x.DISPLAY_FLAG == "Y"; });
                                _this.reportsConfigTabData = _this.configData.filter(function (x) { return x.TAB_ID == 'REPORTSCONFIGDBCONNECTION' && x.DISPLAY_FLAG == "Y"; });
                                _this.reportsDBTabData = _this.configData.filter(function (x) { return x.TAB_ID == 'REPORTSDBCONNECTION' && x.DISPLAY_FLAG == "Y"; });
                                _this.recallTabData = _this.AtPar_System.filter(function (x) { return x.PARAMETER_ID == 'RECALL_MGMT_IMPLEMENTED' || x.PARAMETER_ID == 'PREPICK_QA_PROCESS_REQUIRED' || x.PARAMETER_ID == 'CUSTOMER_LOGO'; });
                                localStorage.setItem('SystemDB', JSON.stringify(_this.configData));
                                var ssldata = _this.AtPar_System.filter(function (x) { return x.PARAMETER_ID != "RECALL_MGMT_IMPLEMENTED" && x.PARAMETER_ID != "PREPICK_QA_PROCESS_REQUIRED" && x.PARAMETER_ID != 'CUSTOMER_LOGO'; });
                                _this.sslTabData = ssldata;
                                _this.getErpSystemDetails(configerpSystemDetails);
                                _this.getERPRemoteDb(erpRemoteData);
                                _this.getEmail();
                                _this.getHL7Data(hl7);
                                _this.getEntrpServiceConffile();
                                _this.getSSLConfigData();
                                _this.isVisible = true;
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "bindDynamicTable");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.bindModelDataChange = function (option) {
        try {
            this.selectionChanged(option);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindModelDataChange");
        }
    };
    ConfigurationManagerComponent.prototype.selectedTab = function (option) {
    };
    ConfigurationManagerComponent.prototype.enableSelectedTab = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var ctab;
            return __generator(this, function (_a) {
                if (option != null) {
                    if (option.tab != null) {
                        this.activeTab = option.tab.title;
                        option.tab.active = true;
                    }
                    if (option.tabs._results != null) {
                        option.tabs._results.forEach(function (tab) { return tab.active = false; });
                        ctab = option.tabs._results.filter(function (x) { return x.title == option.tab.title; });
                        if (ctab != null)
                            ctab[0].active = true;
                    }
                    if (option.tabs != null && this.tabs == null) {
                        this.tabs = option.tabs;
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    ConfigurationManagerComponent.prototype.onSubmit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _loop_3, this_3, x, state_1, _loop_4, this_4, x, state_2, _loop_5, this_5, x, state_3, _loop_6, this_6, x, state_4, erpdb, blnValidDB, validAtparDb, validReportConfigDb, validStarterApiDb, strMenuCode, strAutdit, insertConfigData, x, listpwds, x, key, iv, rpstring, passhash, ex_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 30, , 31]);
                        this.growlmsgs = [];
                        if (!(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID] != 'ADMIN')) return [3 /*break*/, 2];
                        this.authenticationservice.logout();
                        _a = setTimeout;
                        return [4 /*yield*/, this.DoIzendalogin('ADMIN')];
                    case 1:
                        _a.apply(void 0, [_b.sent(), 30000]);
                        this.regUser = true;
                        _b.label = 2;
                    case 2:
                        if (!(this.TabName_Details != null)) return [3 /*break*/, 6];
                        _loop_3 = function (x) {
                            var regxresult, txtfield_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(this_3.TabName_Details[x].PARAMETER_VALUE != "" && this_3.TabName_Details[x].PARAMETER_VALUE != null &&
                                            this_3.TabName_Details[x].VALIDATION_RULES != "" && this_3.TabName_Details[x].VALIDATION_RULES != null && this_3.TabName_Details[x].VALIDATION_RULES != 'MANDATORY')) return [3 /*break*/, 3];
                                        regxresult = Validators_1.regExpValidator(this_3.TabName_Details[x].VALIDATION_RULES, this_3.TabName_Details[x].PARAMETER_VALUE);
                                        if (!!regxresult) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this_3.showMessage(this_3.TabName_Details[x].VALIDATION_RULES)];
                                    case 1:
                                        _a.sent();
                                        txtfield_1 = document.getElementById(this_3.TabName_Details[x].TAB_ID + this_3.TabName_Details[x].PARAMETER_ID);
                                        return [4 /*yield*/, this_3.enableSelectedTab({ tab: { title: "ERP System", active: true }, tabs: this_3.tabs })];
                                    case 2:
                                        _a.sent();
                                        setTimeout(function () {
                                            if (txtfield_1 != null) {
                                                txtfield_1.focus();
                                            }
                                        }, 1);
                                        return [2 /*return*/, { value: void 0 }];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        this_3 = this;
                        x = 0;
                        _b.label = 3;
                    case 3:
                        if (!(x < this.TabName_Details.length)) return [3 /*break*/, 6];
                        return [5 /*yield**/, _loop_3(x)];
                    case 4:
                        state_1 = _b.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _b.label = 5;
                    case 5:
                        x++;
                        return [3 /*break*/, 3];
                    case 6:
                        if (!(this.Email != null)) return [3 /*break*/, 10];
                        _loop_4 = function (x) {
                            var regxresult, txtfield_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(this_4.Email[x].PARAMETER_VALUE != "" && this_4.Email[x].PARAMETER_VALUE != null &&
                                            this_4.Email[x].VALIDATION_RULES != "" && this_4.Email[x].VALIDATION_RULES != null && this_4.Email[x].VALIDATION_RULES != 'MANDATORY')) return [3 /*break*/, 3];
                                        regxresult = Validators_1.regExpValidator(this_4.Email[x].VALIDATION_RULES, this_4.Email[x].PARAMETER_VALUE);
                                        if (!!regxresult) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this_4.enableSelectedTab({ tab: { title: "Email", active: true }, tabs: this_4.tabs })];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this_4.showMessage(this_4.Email[x].VALIDATION_RULES)];
                                    case 2:
                                        _a.sent();
                                        txtfield_2 = document.getElementById(this_4.Email[x].TAB_ID + this_4.Email[x].PARAMETER_ID);
                                        setTimeout(function () {
                                            if (txtfield_2 != null) {
                                                txtfield_2.focus();
                                            }
                                        }, 1);
                                        return [2 /*return*/, { value: void 0 }];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        this_4 = this;
                        x = 0;
                        _b.label = 7;
                    case 7:
                        if (!(x < this.Email.length)) return [3 /*break*/, 10];
                        return [5 /*yield**/, _loop_4(x)];
                    case 8:
                        state_2 = _b.sent();
                        if (typeof state_2 === "object")
                            return [2 /*return*/, state_2.value];
                        _b.label = 9;
                    case 9:
                        x++;
                        return [3 /*break*/, 7];
                    case 10:
                        _loop_5 = function (x) {
                            var regxresult, txtfield_3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(this_5.HL7[x].PARAMETER_VALUE != "" && this_5.HL7[x].PARAMETER_VALUE != null &&
                                            this_5.HL7[x].VALIDATION_RULES != "" && this_5.HL7[x].VALIDATION_RULES != null && this_5.HL7[x].VALIDATION_RULES != 'MANDATORY')) return [3 /*break*/, 3];
                                        regxresult = Validators_1.regExpValidator(this_5.HL7[x].VALIDATION_RULES, this_5.HL7[x].PARAMETER_VALUE);
                                        if (!!regxresult) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this_5.enableSelectedTab({ tab: { title: "HL7", active: true }, tabs: this_5.tabs })];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this_5.showMessage(this_5.HL7[x].VALIDATION_RULES)];
                                    case 2:
                                        _a.sent();
                                        txtfield_3 = document.getElementById(this_5.HL7[x].TAB_ID + this_5.HL7[x].PARAMETER_ID);
                                        setTimeout(function () {
                                            if (txtfield_3 != null) {
                                                txtfield_3.focus();
                                            }
                                        }, 1);
                                        return [2 /*return*/, { value: void 0 }];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        this_5 = this;
                        x = 0;
                        _b.label = 11;
                    case 11:
                        if (!(x < this.HL7.length)) return [3 /*break*/, 14];
                        return [5 /*yield**/, _loop_5(x)];
                    case 12:
                        state_3 = _b.sent();
                        if (typeof state_3 === "object")
                            return [2 /*return*/, state_3.value];
                        _b.label = 13;
                    case 13:
                        x++;
                        return [3 /*break*/, 11];
                    case 14:
                        _loop_6 = function (x) {
                            var regxresult, txtfield_4;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(this_6.LDAP[x].PARAMETER_VALUE != "" && this_6.LDAP[x].PARAMETER_VALUE != null &&
                                            this_6.LDAP[x].VALIDATION_RULES != "" && this_6.LDAP[x].VALIDATION_RULES != null && this_6.LDAP[x].VALIDATION_RULES != 'MANDATORY')) return [3 /*break*/, 3];
                                        regxresult = Validators_1.regExpValidator(this_6.LDAP[x].VALIDATION_RULES, this_6.LDAP[x].PARAMETER_VALUE);
                                        if (!!regxresult) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this_6.enableSelectedTab({ tab: { title: "LDAP", active: true }, tabs: this_6.tabs })];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this_6.showMessage(this_6.LDAP[x].VALIDATION_RULES)];
                                    case 2:
                                        _a.sent();
                                        txtfield_4 = document.getElementById(this_6.LDAP[x].TAB_ID + this_6.LDAP[x].PARAMETER_ID);
                                        setTimeout(function () {
                                            if (txtfield_4 != null) {
                                                txtfield_4.focus();
                                            }
                                        }, 1);
                                        return [2 /*return*/, { value: void 0 }];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        this_6 = this;
                        x = 0;
                        _b.label = 15;
                    case 15:
                        if (!(x < this.LDAP.length)) return [3 /*break*/, 18];
                        return [5 /*yield**/, _loop_6(x)];
                    case 16:
                        state_4 = _b.sent();
                        if (typeof state_4 === "object")
                            return [2 /*return*/, state_4.value];
                        _b.label = 17;
                    case 17:
                        x++;
                        return [3 /*break*/, 15];
                    case 18:
                        this.growlmsgs = [];
                        this.spinnerService.start();
                        if (!this.check_Validations()) return [3 /*break*/, 28];
                        erpdb = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()
                            && x.PARAMETER_ID == "DATABASE"; })[0].PARAMETER_VALUE;
                        if (!(erpdb != "NONE")) return [3 /*break*/, 22];
                        if (!this.checkErpValidations()) return [3 /*break*/, 20];
                        blnValidDB = false;
                        return [4 /*yield*/, this.checkRemoteDBDetails()];
                    case 19:
                        blnValidDB = _b.sent();
                        if (!blnValidDB) {
                            this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Provide Valid ERP Database Details" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 21];
                    case 20:
                        this.spinnerService.stop();
                        return [2 /*return*/];
                    case 21: return [3 /*break*/, 22];
                    case 22:
                        this.dbCheck = configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.SERVER].toString();
                        return [4 /*yield*/, this.checkAtparDBDetails()];
                    case 23:
                        validAtparDb = _b.sent();
                        if (!validAtparDb) {
                            this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Provide Valid Atpar Database Details" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        this.dbCheck = '';
                        return [4 /*yield*/, this.checkAtparReportsConfigDBDetails()];
                    case 24:
                        validReportConfigDb = _b.sent();
                        if (!validReportConfigDb) {
                            this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Provide Valid Reports Config Database Details" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.checkStarterApiDBDetails()];
                    case 25:
                        validStarterApiDb = _b.sent();
                        if (!validStarterApiDb) {
                            this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Provide Valid Starter API Database Details" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        strMenuCode = void 0;
                        strMenuCode = localStorage.getItem("menuCode"); //'mt_atpar_configure_system_from_db.aspx';
                        strAutdit = void 0;
                        insertConfigData = new Array();
                        for (x = 0; x < this.configData.length; x++) {
                            insertConfigData.push({
                                TAB_ID: this.configData[x].TAB_ID,
                                TAB_NAME: this.configData[x].TAB_NAME,
                                PARAMETER_ID: this.configData[x].PARAMETER_ID,
                                FRIENDLY_NAME: this.configData[x].FRIENDLY_NAME,
                                DESCRIPTION: this.configData[x].DESCRIPTION,
                                TYPE: this.configData[x].TYPE,
                                VALIDATION_RULES: this.configData[x].VALIDATION_RULES,
                                DEFAULT_VALUE: this.configData[x].DEFAULT_VALUE,
                                PARAMETER_VALUE: this.configData[x].PARAMETER_VALUE,
                                TOOL_TIP_INFO: this.configData[x].TOOL_TIP_INFO,
                                VALID_FOR_ERP: this.configData[x].VALID_FOR_ERP,
                                DISPLAY_FLAG: this.configData[x].DISPLAY_FLAG,
                                DISPLAY_ORDER: this.configData[x].DISPLAY_ORDER,
                                validationRules: this.configData[x].validationRules,
                                NEW_VALIDATION_RULES: this.configData[x].NEW_VALIDATION_RULES,
                            });
                        }
                        listpwds = insertConfigData.filter(function (x) { return x.TYPE == "PASSWORD"; });
                        for (x = 0; x < listpwds.length; x++) {
                            key = CryptoJS.enc.Utf8.parse('8080808080808080');
                            iv = CryptoJS.enc.Utf8.parse('8080808080808080');
                            if (listpwds[x].PARAMETER_VALUE != null && listpwds[x].PARAMETER_VALUE != '') {
                                rpstring = listpwds[x].PARAMETER_VALUE.replace('+', ' ');
                                passhash = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(rpstring), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                                listpwds[x].PARAMETER_VALUE = passhash.toString();
                            }
                        }
                        return [4 /*yield*/, this.getAuditAllowed(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_1.EnumApps.Auth, strMenuCode, insertConfigData)];
                    case 26:
                        _b.sent();
                        return [4 /*yield*/, this.insertConfigurationDetails(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], insertConfigData)];
                    case 27:
                        _b.sent();
                        this.atParConstants.scrollToTop();
                        this.spinnerService.stop();
                        return [3 /*break*/, 29];
                    case 28:
                        this.spinnerService.stop();
                        _b.label = 29;
                    case 29: return [3 /*break*/, 31];
                    case 30:
                        ex_3 = _b.sent();
                        this.clientErrorMsg(ex_3, "onSubmit");
                        return [3 /*break*/, 31];
                    case 31: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.showMessage = function (validationType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.growlmsgs = [];
                if (validationType != null) {
                    if (validationType.toUpperCase() == 'EMAIL') {
                        this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Valid Email Address" });
                    }
                    else if (validationType.toUpperCase() == 'NUMERIC' || validationType == 'numeric_decimals') {
                        this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Numeric Values" });
                    }
                    else if (validationType.toUpperCase() == ('numeric_colon').toUpperCase() || validationType.toUpperCase() == "TIME_24HR") {
                        this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Valid TimeFormat" });
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    ConfigurationManagerComponent.prototype.getValidationRule = function (validationType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (validationType.toUpperCase() == 'EMAIL') {
                    return [2 /*return*/, "email"];
                }
                else if (validationType.toUpperCase() == 'NUMERIC') {
                    return [2 /*return*/, "numeric"];
                }
                else if (validationType.toUpperCase() == ('numeric_colon').toUpperCase() || validationType.toUpperCase() == "TIME_24HR") {
                    return [2 /*return*/, "numeric_colon"];
                }
                return [2 /*return*/];
            });
        });
    };
    ConfigurationManagerComponent.prototype.insertConfigurationDetails = function (systemId, userId, lstConfigData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var erpdb, caseInfoSystem, _a, ex_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        erpdb = lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()
                            && x.PARAMETER_ID == "DATABASE"; })[0].PARAMETER_VALUE;
                        if (erpdb == "NONE") {
                            lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.USERID].toString(); })[0].PARAMETER_VALUE = "";
                            lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.PASSWORD].toString(); })[0].PARAMETER_VALUE = "";
                            lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.SERVER].toString(); })[0].PARAMETER_VALUE = "";
                            lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.DATASOURCE].toString(); })[0].PARAMETER_VALUE = "";
                            lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.DRIVER].toString(); })[0].PARAMETER_VALUE = "";
                            lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.SCHEMA].toString(); })[0].PARAMETER_VALUE = "";
                        }
                        caseInfoSystem = void 0;
                        caseInfoSystem = lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFORMATION_SYSTEM].toString(); })[0].PARAMETER_VALUE;
                        if (caseInfoSystem != "HSM") {
                            lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                                x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DATABASE].toString(); })[0].PARAMETER_VALUE = "";
                            lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                                x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DB_USERID].toString(); })[0].PARAMETER_VALUE = "";
                            lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                                x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DB_SCHEMA].toString(); })[0].PARAMETER_VALUE = "";
                            lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                                x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DB_PASSWORD].toString(); })[0].PARAMETER_VALUE = "";
                            lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                                x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DB_SERVER].toString(); })[0].PARAMETER_VALUE = "";
                            lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                                x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DB_DATASOURCE].toString(); })[0].PARAMETER_VALUE = "";
                            lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                                x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DB_DRIVER].toString(); })[0].PARAMETER_VALUE = "";
                        }
                        return [4 /*yield*/, this.configMgrService.updateConfigDetails(systemId, userId, lstConfigData)
                                .catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var webresp, _a, checkconnection;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            webresp = res.json();
                                            this.growlmsgs = [];
                                            this.bindDynamicTable();
                                            _a = webresp.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 4];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 5];
                                            }
                                            return [3 /*break*/, 6];
                                        case 1:
                                            checkconnection = true;
                                            return [4 /*yield*/, this.BuildConnectionString(lstConfigData)];
                                        case 2:
                                            checkconnection = _b.sent();
                                            return [4 /*yield*/, this.BuildEmailSettings(lstConfigData)];
                                        case 3:
                                            _b.sent();
                                            if (this.growlmsgs.length <= 0) {
                                                this.growlmsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Configuration Details Updated Successfully" });
                                            }
                                            return [3 /*break*/, 7];
                                        case 4:
                                            {
                                                this.growlmsgs = [];
                                                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                                return [3 /*break*/, 7];
                                            }
                                            _b.label = 5;
                                        case 5:
                                            {
                                                this.growlmsgs = [];
                                                this.growlmsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                                return [3 /*break*/, 7];
                                            }
                                            _b.label = 6;
                                        case 6:
                                            {
                                                this.growlmsgs = [];
                                                this.growlmsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                            }
                                            _b.label = 7;
                                        case 7: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _b.sent();
                        if (!this.regUser) return [3 /*break*/, 3];
                        this.authenticationservice.logout();
                        _a = setTimeout;
                        return [4 /*yield*/, this.DoIzendalogin(userId)];
                    case 2:
                        _a.apply(void 0, [_b.sent(), 30000]);
                        this.regUser = false;
                        _b.label = 3;
                    case 3: return [2 /*return*/, false];
                    case 4:
                        ex_4 = _b.sent();
                        this.clientErrorMsg(ex_4, "insertConfigurationDetails");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.BuildConnectionString = function (lstConfigData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var result, dataSource, userId, server, pwd, accessToken, connstring, preDataSource, preUserId, preServer, prePwd, hostName_1, preConfigData, key, iv, rpstring, decrypt, decryptdata, body, headers, options, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        dataSource = void 0;
                        userId = void 0;
                        server = void 0;
                        pwd = void 0;
                        accessToken = void 0;
                        connstring = void 0;
                        preDataSource = void 0;
                        preUserId = void 0;
                        preServer = void 0;
                        prePwd = void 0;
                        hostName_1 = window.location.protocol.toString() + "//" + window.location.hostname.toString();
                        preConfigData = void 0;
                        preConfigData = JSON.parse(localStorage.getItem('SystemDB'));
                        key = CryptoJS.enc.Utf8.parse('8080808080808080');
                        iv = CryptoJS.enc.Utf8.parse('8080808080808080');
                        dataSource = lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.DATASOURCE].toString(); })[0].PARAMETER_VALUE;
                        userId = lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.USERID].toString(); })[0].PARAMETER_VALUE;
                        server = lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.SERVER].toString(); })[0].PARAMETER_VALUE;
                        pwd = lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LOCALDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.PASSWORD].toString(); })[0].PARAMETER_VALUE;
                        preDataSource = preConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.DATASOURCE].toString(); })[0].PARAMETER_VALUE;
                        preUserId = preConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.USERID].toString(); })[0].PARAMETER_VALUE;
                        preServer = preConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.SERVER].toString(); })[0].PARAMETER_VALUE;
                        prePwd = preConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LOCALDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.PASSWORD].toString(); })[0].PARAMETER_VALUE;
                        accessToken = localStorage.getItem("izendatoken");
                        if (pwd != '' && pwd != null) {
                            rpstring = pwd.replace('+', ' ');
                            decrypt = CryptoJS.AES.decrypt(rpstring, key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                            decryptdata = decrypt.toString(CryptoJS.enc.Utf8);
                            pwd = decryptdata;
                        }
                        if (!(accessToken != null && accessToken != '')) return [3 /*break*/, 3];
                        connstring = "server =" + server + "; database = " + dataSource + "; User Id= " + userId + "; Password = " + pwd + ";";
                        body = JSON.stringify({
                            id: "489C91AC-507D-4A2B-B9A6-FA085D3241B4", name: "ATPAR_MT", serverTypeId: "572bd576-8c92-4901-ab2a-b16e38144813", connectionString: connstring, visible: true, dBSource: {
                                querySources: [{
                                        id: "B5EE9911-FAAE-434F-ADD4-60A400F3B9A0", connectionId: "489C91AC-507D-4A2B-B9A6-FA085D3241B4", name: "ATPAR_MT", querySources: [{
                                                id: "EE7E3068-3932-4595-BD9E-04BB52D07C5D",
                                                name: "GetItemUsageAnalysis",
                                                type: "Stored Procedure",
                                                selected: true,
                                                physicalChange: 0,
                                                approval: 0,
                                                categoryId: "B5EE9911-FAAE-434F-ADD4-60A400F3B9A0"
                                            }, {
                                                id: "15E8F34A-860B-46AB-ACAF-685FC8B27C07",
                                                name: "GetCartPutAwayReport",
                                                type: "Stored Procedure",
                                                selected: true,
                                                physicalChange: 0,
                                                approval: 0,
                                                categoryId: "B5EE9911-FAAE-434F-ADD4-60A400F3B9A0"
                                            }, {
                                                id: "F89DA824-1520-4E82-A7EE-5318550394B1",
                                                name: "GetCartCountScheduleCompliancereport",
                                                type: "Stored Procedure",
                                                selected: true,
                                                physicalChange: 0,
                                                approval: 0,
                                                categoryId: "B5EE9911-FAAE-434F-ADD4-60A400F3B9A0"
                                            }, {
                                                id: "C6552B9C-6125-4EC7-99C7-82C77B02FEDB",
                                                name: "GETCartAveragesReportData",
                                                type: "Stored Procedure",
                                                selected: true,
                                                physicalChange: 0,
                                                approval: 0,
                                                categoryId: "B5EE9911-FAAE-434F-ADD4-60A400F3B9A0"
                                            }, {
                                                id: "59FA9194-CF91-4A76-8C9E-C9E5A48501A7",
                                                name: "GetChargeReportTKITData",
                                                type: "Stored Procedure",
                                                selected: true,
                                                physicalChange: 0,
                                                approval: 0,
                                                categoryId: "B5EE9911-FAAE-434F-ADD4-60A400F3B9A0"
                                            }, {
                                                id: "7FC54D8A-3323-465A-8203-3396BDBC47EB",
                                                name: "DeliverDailyActivityReport",
                                                type: "Stored Procedure",
                                                selected: true,
                                                physicalChange: 0,
                                                approval: 0,
                                                categoryId: "B5EE9911-FAAE-434F-ADD4-60A400F3B9A0"
                                            }, {
                                                id: "9E41CD13-B0CF-4045-824D-1BE429DA0882",
                                                name: "GETDeliverDailyUserActivityData",
                                                type: "Stored Procedure",
                                                selected: true,
                                                physicalChange: 0,
                                                approval: 0,
                                                categoryId: "B5EE9911-FAAE-434F-ADD4-60A400F3B9A0"
                                            }, {
                                                id: "7F51A26A-BC31-44F6-8A09-2232A0F5C023",
                                                name: "GetNonCatalogInfoReportData",
                                                type: "Stored Procedure",
                                                selected: true,
                                                physicalChange: 0,
                                                approval: 0,
                                                categoryId: "B5EE9911-FAAE-434F-ADD4-60A400F3B9A0"
                                            }, {
                                                id: "3D92819C-ED32-41F3-9A30-E48E3F975C42",
                                                name: "GetNonCatalogInfoReportData1",
                                                type: "Stored Procedure",
                                                selected: true,
                                                physicalChange: 0,
                                                approval: 0,
                                                categoryId: "B5EE9911-FAAE-434F-ADD4-60A400F3B9A0"
                                            }, {
                                                id: "40E8C918-2DD6-48A4-BA91-0D38A1466648",
                                                name: "GetPrefCardManagementSummaryInfo",
                                                type: "Stored Procedure",
                                                selected: true,
                                                physicalChange: 0,
                                                approval: 0,
                                                categoryId: "B5EE9911-FAAE-434F-ADD4-60A400F3B9A0"
                                            }, {
                                                id: "8F84287B-6188-4830-99C0-16210BB34BBE",
                                                name: "GetReceivingDailyActivityReport",
                                                type: "Stored Procedure",
                                                selected: true,
                                                physicalChange: 0,
                                                approval: 0,
                                                categoryId: "B5EE9911-FAAE-434F-ADD4-60A400F3B9A0"
                                            }, {
                                                id: "01532CB9-E2A1-4933-B746-D80DB3C593EB",
                                                name: "GetTrackITDailyUserActivityData",
                                                type: "Stored Procedure",
                                                selected: true,
                                                physicalChange: 0,
                                                approval: 0,
                                                categoryId: "B5EE9911-FAAE-434F-ADD4-60A400F3B9A0"
                                            }, {
                                                id: "4658D77E-3C6F-409B-8497-CDD0A5DE7B20",
                                                name: "GetTrackITEquipmentTrackingReport",
                                                type: "Stored Procedure",
                                                selected: true,
                                                physicalChange: 0,
                                                approval: 0,
                                                categoryId: "B5EE9911-FAAE-434F-ADD4-60A400F3B9A0"
                                            }, {
                                                id: "0ECB9F44-BFD8-4E8E-9F8B-B3E72F23FB36",
                                                name: "GETTrackITItemMasterReportData",
                                                type: "Stored Procedure",
                                                selected: true,
                                                physicalChange: 0,
                                                approval: 0,
                                                categoryId: "B5EE9911-FAAE-434F-ADD4-60A400F3B9A0"
                                            }, {
                                                id: "4B41A916-63AC-4145-B156-49CA102141B8",
                                                name: "GETAssetManagementExceptionReportData",
                                                type: "Stored Procedure",
                                                selected: true,
                                                physicalChange: 0,
                                                approval: 0,
                                                categoryId: "B5EE9911-FAAE-434F-ADD4-60A400F3B9A0"
                                            }]
                                    }]
                            }, databaseName: dataSource
                        });
                        console.log(body);
                        headers = new http_1.Headers({ "Content-Type": "application/json; charset=utf-8", 'access_token': accessToken.toString() });
                        options = new http_1.RequestOptions({ headers: headers });
                        return [4 /*yield*/, this.configMgrService.UpdateReportsConnection(body, options).catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                var webresp;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            webresp = res.json();
                                            if (!!webresp.success) return [3 /*break*/, 1];
                                            this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Report Connection Failed. " });
                                            result = false;
                                            return [3 /*break*/, 3];
                                        case 1: return [4 /*yield*/, this.configMgrService.UpdateQuerySource(hostName_1).catch(this.httpService.handleError).then(function (res) {
                                                var resp = res.json();
                                                // if (resp.StatType) {
                                                switch (resp.StatType) {
                                                    case AtParEnums_1.StatusType.Success:
                                                        {
                                                            result = true;
                                                            break;
                                                        }
                                                    case AtParEnums_1.StatusType.Warn:
                                                        {
                                                            _this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Reports Update Failed. " });
                                                            result = false;
                                                            break;
                                                        }
                                                    case AtParEnums_1.StatusType.Error:
                                                        {
                                                            _this.growlmsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Reports Update Failed. " });
                                                            result = false;
                                                            break;
                                                        }
                                                    default:
                                                        {
                                                            _this.growlmsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                                            result = false;
                                                            break;
                                                        }
                                                }
                                                // }
                                            })];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Please Check Reporting API Services." });
                        result = false;
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_5 = _a.sent();
                        console.log(ex_5);
                        this.clientErrorMsg(ex_5, "BuildConnectionString");
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/, result];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.BuildEmailSettings = function (lstConfigData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var smtpAccountName, smtpServer, smtpPort, smtpMailAddress, smtpAuthenticate, userName, pwd, sslEnable, sendUsing, server, accessToken, key, iv, userId, x, rpstring, decrypt, decryptdata, body, headers, options, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        smtpAccountName = void 0;
                        smtpServer = void 0;
                        smtpPort = void 0;
                        smtpMailAddress = void 0;
                        smtpAuthenticate = void 0;
                        userName = void 0;
                        pwd = void 0;
                        sslEnable = void 0;
                        sendUsing = void 0;
                        server = void 0;
                        accessToken = void 0;
                        key = CryptoJS.enc.Utf8.parse('8080808080808080');
                        iv = CryptoJS.enc.Utf8.parse('8080808080808080');
                        userId = void 0;
                        userId = this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        x = lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.EMAILCONFIGARATION[configdata_1.ConfigData.EMAILCONFIGARATION.SMTP_ACCOUNT_NAME].toString(); });
                        smtpAccountName = lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.EMAILCONFIGARATION[configdata_1.ConfigData.EMAILCONFIGARATION.SMTP_ACCOUNT_NAME].toString(); })[0].PARAMETER_VALUE;
                        smtpServer = lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.EMAILCONFIGARATION[configdata_1.ConfigData.EMAILCONFIGARATION.SMTP_SERVER].toString(); })[0].PARAMETER_VALUE;
                        smtpPort = lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.EMAILCONFIGARATION[configdata_1.ConfigData.EMAILCONFIGARATION.SMTP_SERVER_PORT].toString(); })[0].PARAMETER_VALUE;
                        smtpMailAddress = lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.EMAILCONFIGARATION[configdata_1.ConfigData.EMAILCONFIGARATION.SMTP_MAIL_ADDRESS].toString(); })[0].PARAMETER_VALUE;
                        smtpAuthenticate = lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.EMAILCONFIGARATION[configdata_1.ConfigData.EMAILCONFIGARATION.SMTP_AUTHENTICATE].toString(); })[0].PARAMETER_VALUE;
                        userName = lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.EMAILCONFIGARATION[configdata_1.ConfigData.EMAILCONFIGARATION.SMTP_USER_NAME].toString(); })[0].PARAMETER_VALUE;
                        pwd = lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.EMAILCONFIGARATION[configdata_1.ConfigData.EMAILCONFIGARATION.SMTP_PASSWORD].toString(); })[0].PARAMETER_VALUE;
                        sslEnable = lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.EMAILCONFIGARATION[configdata_1.ConfigData.EMAILCONFIGARATION.SMTP_USE_SSL].toString(); })[0].PARAMETER_VALUE;
                        sendUsing = lstConfigData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.EMAILCONFIGARATION[configdata_1.ConfigData.EMAILCONFIGARATION.SMTP_SEND_USING].toString(); })[0].PARAMETER_VALUE;
                        if (pwd != '' && pwd != null) {
                            rpstring = pwd.replace('+', ' ');
                            decrypt = CryptoJS.AES.decrypt(rpstring, key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                            decryptdata = decrypt.toString(CryptoJS.enc.Utf8);
                            pwd = decryptdata;
                        }
                        accessToken = localStorage.getItem("izendatoken");
                        if (!(accessToken != null && accessToken != '')) return [3 /*break*/, 3];
                        if (!(smtpServer != '' && smtpPort != '' && smtpMailAddress != '' && userName != '' && pwd != '' && pwd != null)) return [3 /*break*/, 2];
                        body = JSON.stringify({
                            isDirty: true, id: "00000000-0000-0000-0000-000000000000", tenantId: "3E4B90D8-63B9-48A6-BDD0-C3AF81AC04D5",
                            server: smtpServer, port: smtpPort, secureConnection: true, login: userName, password: pwd, displayName: "AtPar",
                            emailFromAddress: smtpMailAddress, useSystemConfiguration: false, version: "1", created: "", createdBy: "System Admin", modified: "", modifiedBy: "System Admin"
                        });
                        headers = new http_1.Headers({ "Content-Type": "application/json; charset=utf-8", 'access_token': accessToken.toString(), 'selected_tenant': '3E4B90D8-63B9-48A6-BDD0-C3AF81AC04D5' });
                        options = new http_1.RequestOptions({ headers: headers });
                        return [4 /*yield*/, this.configMgrService.UpdateEmailSettings(body, options).catch(this.httpService.handleError).then(function (res) {
                                var webresp = res.json();
                                if (!webresp.success) {
                                    _this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Email Update Failed. " });
                                    return false;
                                }
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Please Check Reporting API Services." });
                        return [2 /*return*/, false];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "BuildEmailSettings");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.DoIzendalogin = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var tenant, username1, password1, iztoken;
            return __generator(this, function (_a) {
                try {
                    this.izItergrate.DoIzendaConfig();
                    if (userId == 'ADMIN') {
                        tenant = undefined;
                        username1 = 'IzendaAdmin@system.com';
                        password1 = 'Izenda@123';
                    }
                    else {
                        tenant = 'AtParMT';
                        username1 = userId;
                        password1 = 'AtparReports@123';
                    }
                    console.log(userId);
                    iztoken = this.authenticationservice.login(tenant, username1, password1)
                        .subscribe(function (result) {
                        if (result === true) {
                            console.log('reports login successful');
                        }
                        else {
                            console.log('reports login failed');
                        }
                    }, function (error) {
                        console.log(error);
                    });
                }
                catch (ex) {
                    console.log('reports login failed');
                    this.clientErrorMsg(ex, "DoIzendalogin");
                }
                return [2 /*return*/];
            });
        });
    };
    ConfigurationManagerComponent.prototype.checkRemoteDBDetails = function (blnValidDb) {
        if (blnValidDb === void 0) { blnValidDb = false; }
        return __awaiter(this, void 0, void 0, function () {
            var database, userId, pwd, server, dbSource, driver, blnValidDb_1, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        database = void 0;
                        userId = void 0;
                        pwd = void 0;
                        server = void 0;
                        dbSource = void 0;
                        driver = void 0;
                        database = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.DATABASE].toString(); })[0].PARAMETER_VALUE;
                        userId = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.USERID].toString(); })[0].PARAMETER_VALUE;
                        pwd = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.PASSWORD].toString(); })[0].PARAMETER_VALUE;
                        server = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.SERVER].toString(); })[0].PARAMETER_VALUE;
                        dbSource = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.DATASOURCE].toString(); })[0].PARAMETER_VALUE;
                        driver = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.DRIVER].toString(); })[0].PARAMETER_VALUE;
                        blnValidDb_1 = false;
                        return [4 /*yield*/, this.checkDBConnection(database, userId, pwd, server, dbSource, configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString(), driver, blnValidDb_1)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "checkRemoteDBDetails");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.testLDAPConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strProtocol, strAuthType, nAuthType, strSearchScope, strpwd, server, searchFilter, userId, firstname, lastName, strserverName, nSearchScope, strBaseDn, strSearchFilter, struser, pwd, entrylmit, strLDAPProperty_cn, strLDAPProperty_givenName, strLDAPProperty_sn, strLDAPProperty_Initials, strLDAPProperty_mail, strLDAPProperty_telephoneNumber, strLDAPProperty_fax, resultFields, strtestOutPut_1, strLdapConnectString, basevalue, x, key, iv, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlmsgs = [];
                        strProtocol = void 0;
                        strAuthType = void 0;
                        nAuthType = void 0;
                        strSearchScope = void 0;
                        strpwd = void 0;
                        server = void 0;
                        searchFilter = void 0;
                        userId = void 0;
                        firstname = void 0;
                        lastName = void 0;
                        server = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.SERVERNAME].toString(); })[0].PARAMETER_VALUE;
                        searchFilter = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.SEARCHFILTER].toString(); })[0].PARAMETER_VALUE;
                        userId = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.USERID].toString(); })[0].PARAMETER_VALUE;
                        firstname = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.FIRSTNAME].toString(); })[0].PARAMETER_VALUE;
                        lastName = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.LASTNAME].toString(); })[0].PARAMETER_VALUE;
                        if (server == null || server == "" ||
                            searchFilter == null || searchFilter == "" ||
                            userId == null || userId == "" ||
                            firstname == null || firstname == "" ||
                            lastName == null || lastName == null) {
                            this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "LDAP Configuration : Server Name, Search Filter, First Name,Last Name fields are mandatory for test connection" });
                            return [2 /*return*/];
                        }
                        strProtocol = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.PROTOCOL].toString(); })[0].PARAMETER_VALUE;
                        strAuthType = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.AUTHTYPE].toString(); })[0].PARAMETER_VALUE;
                        if (strProtocol.toUpperCase() == "LDAP" || strProtocol.toUpperCase() == "LDAPS") {
                            strProtocol = "LDAP";
                        }
                        strserverName = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.SERVERNAME].toString(); })[0].PARAMETER_VALUE;
                        switch (strAuthType.toUpperCase()) {
                            case "NONE":
                                nAuthType = configdata_1.ConfigData.AuthenticationTypes.None;
                                break;
                            case "ANONYMOUS":
                                nAuthType = configdata_1.ConfigData.AuthenticationTypes.Anonymous;
                                break;
                            case "SECURE":
                                nAuthType = configdata_1.ConfigData.AuthenticationTypes.Secure;
                                break;
                            case "SECURESOCKETSLAYER":
                                nAuthType = configdata_1.ConfigData.AuthenticationTypes.SecureSocketsLayer;
                                break;
                            default:
                                nAuthType = configdata_1.ConfigData.AuthenticationTypes.Anonymous;
                                break;
                        }
                        nSearchScope = void 0;
                        strSearchScope = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.SEARCHSCOPE].toString(); })[0].PARAMETER_VALUE;
                        switch (strSearchScope.toUpperCase()) {
                            case "BASE":
                                nSearchScope = configdata_1.ConfigData.SearchScope.Base;
                                break;
                            case "ONELEVEL":
                                nSearchScope = configdata_1.ConfigData.SearchScope.OneLevel;
                                break;
                            case "SUBTREE":
                                nSearchScope = configdata_1.ConfigData.SearchScope.Subtree;
                                break;
                            default:
                                nSearchScope = configdata_1.ConfigData.SearchScope.Base;
                                break;
                        }
                        strBaseDn = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.BASEDN].toString(); })[0].PARAMETER_VALUE;
                        strSearchFilter = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.SEARCHFILTER].toString(); })[0].PARAMETER_VALUE;
                        struser = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.USERNAME].toString(); })[0].PARAMETER_VALUE;
                        pwd = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.PASSWORD].toString(); })[0].PARAMETER_VALUE;
                        entrylmit = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.ENTRYLIMIT].toString(); })[0].PARAMETER_VALUE;
                        strLDAPProperty_cn = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.USERID].toString(); })[0].PARAMETER_VALUE;
                        strLDAPProperty_givenName = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.FIRSTNAME].toString(); })[0].PARAMETER_VALUE;
                        strLDAPProperty_sn = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.LASTNAME].toString(); })[0].PARAMETER_VALUE;
                        strLDAPProperty_Initials = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.MIDDLEINITIAL].toString(); })[0].PARAMETER_VALUE;
                        strLDAPProperty_mail = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.EMAILID].toString(); })[0].PARAMETER_VALUE;
                        strLDAPProperty_telephoneNumber = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.PHONE].toString(); })[0].PARAMETER_VALUE;
                        strLDAPProperty_fax = this.LDAP.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LDAPCONFIG[configdata_1.ConfigData.LDAPCONFIG.FAX].toString(); })[0].PARAMETER_VALUE;
                        resultFields = [];
                        if (strLDAPProperty_cn != null && strLDAPProperty_cn != '') {
                            resultFields.push(strLDAPProperty_cn);
                        }
                        if (strLDAPProperty_givenName != null && strLDAPProperty_givenName != '') {
                            resultFields.push(strLDAPProperty_givenName);
                        }
                        if (strLDAPProperty_sn != null && strLDAPProperty_sn != '') {
                            resultFields.push(strLDAPProperty_sn);
                        }
                        if (strLDAPProperty_Initials != null && strLDAPProperty_Initials != '') {
                            resultFields.push(strLDAPProperty_Initials);
                        }
                        if (strLDAPProperty_mail != null && strLDAPProperty_mail != '') {
                            resultFields.push(strLDAPProperty_mail);
                        }
                        if (strLDAPProperty_telephoneNumber != null && strLDAPProperty_telephoneNumber != '') {
                            resultFields.push(strLDAPProperty_telephoneNumber);
                        }
                        if (strLDAPProperty_fax != null && strLDAPProperty_fax != '') {
                            resultFields.push(strLDAPProperty_fax);
                        }
                        strtestOutPut_1 = "Please remember to save your changes before exiting out of this page\n";
                        strtestOutPut_1 = strtestOutPut_1 + "Quering LDAP server...\n";
                        strLdapConnectString = void 0;
                        basevalue = void 0;
                        if (strBaseDn.length > 0) {
                            basevalue = "/";
                        }
                        else {
                            basevalue = '';
                        }
                        strLdapConnectString = strProtocol + "://" + strserverName + basevalue + strBaseDn;
                        strtestOutPut_1 = strtestOutPut_1 + strLdapConnectString + "?(" + strSearchFilter + ")\n";
                        if (struser.length > 0) {
                            strtestOutPut_1 = strtestOutPut_1 + "UserDN: " + struser + "\n";
                        }
                        strtestOutPut_1 = strtestOutPut_1 + "Authentication Type: " + strAuthType + " Search Scope: " + strSearchScope + "\n";
                        strtestOutPut_1 = strtestOutPut_1 + " Looking for properties : ";
                        for (x = 0; x < resultFields.length; x++) {
                            strtestOutPut_1 = strtestOutPut_1 + resultFields[x].toString() + " ";
                        }
                        strtestOutPut_1 = strtestOutPut_1 + "\n";
                        this.spinnerService.getEvent(spinner_sent_event_1.SpinnerSentEvent).publish(true);
                        key = CryptoJS.enc.Utf8.parse('8080808080808080');
                        iv = CryptoJS.enc.Utf8.parse('8080808080808080');
                        pwd = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(pwd), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                        // this.strDbConnectionstring = "Server=" + server + ";Database=" + dataSource + ";User ID=" + userId + ";Password=" + password + ";Trusted_Connection=False";
                        return [4 /*yield*/, this.configMgrService.TestLDAPConnection(strLdapConnectString, struser, pwd.toString(), nAuthType, entrylmit, resultFields, strSearchFilter, nSearchScope, strserverName, strProtocol).
                                catch(this.httpService.handleError).then(function (res) {
                                var webresp = res.json();
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            strtestOutPut_1 = strtestOutPut_1 + webresp.DataVariable;
                                            _this.txtLDAPConnection = strtestOutPut_1;
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            strtestOutPut_1 = strtestOutPut_1 + webresp.ExceptionMessage;
                                            _this.txtLDAPConnection = strtestOutPut_1;
                                            // this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            strtestOutPut_1 = strtestOutPut_1 + webresp.ExceptionMessage;
                                            _this.txtLDAPConnection = strtestOutPut_1;
                                            // this.growlmsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 1:
                        // this.strDbConnectionstring = "Server=" + server + ";Database=" + dataSource + ";User ID=" + userId + ";Password=" + password + ";Trusted_Connection=False";
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "testLDAPConnection");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.checkDBConnection = function (database, userId, password, server, dataSource, tabName, driver, blnvalidDatabase) {
        if (blnvalidDatabase === void 0) { blnvalidDatabase = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var key, iv, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        key = CryptoJS.enc.Utf8.parse('8080808080808080');
                        iv = CryptoJS.enc.Utf8.parse('8080808080808080');
                        password = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                        if (!(database.toUpperCase() == configdata_1.ConfigData.DATABASE_TYPES[configdata_1.ConfigData.DATABASE_TYPES.SQLSERVER].toString() || database.toUpperCase() == "SQL SERVER")) return [3 /*break*/, 2];
                        // this.strDbConnectionstring = "Server=" + server + ";Database=" + dataSource + ";User ID=" + userId + ";Password=" + password + ";Trusted_Connection=False";
                        return [4 /*yield*/, this.configMgrService.getSqlServerConnection(server, userId, password.toString(), dataSource).
                                catch(this.httpService.handleError).then(function (res) {
                                var webresp = res.json();
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            var statusMessage = "Connection Opened Successfully";
                                            blnvalidDatabase = true;
                                            if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()) {
                                                _this.txtTestErpDatabase = statusMessage;
                                            }
                                            else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString()) {
                                                if (_this.dbCheck == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.SERVER].toString()) {
                                                    _this.txtAtparDatabase = statusMessage;
                                                }
                                                else {
                                                    _this.txtArchAtparDatabase = statusMessage;
                                                }
                                                _this.dbCheck = "";
                                            }
                                            else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString()) {
                                                if (_this.dbCheck == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.SERVER].toString()) {
                                                    _this.txtAtparReportsConfigDatabase = statusMessage;
                                                }
                                                else {
                                                    _this.txtStarterAPIDatabase = statusMessage;
                                                }
                                                _this.dbCheck = "";
                                            }
                                            else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString()) {
                                                if (_this.dbCheck == configdata_1.ConfigData.REPORTSDBCONNECTION[configdata_1.ConfigData.REPORTSDBCONNECTION.SERVER].toString()) {
                                                    _this.txtAtparReportsDatabase = statusMessage;
                                                }
                                                _this.dbCheck = "";
                                            }
                                            else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString()) {
                                                _this.txtHSMConnection = statusMessage;
                                            }
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            var statusMessage = webresp.ExceptionMessage;
                                            blnvalidDatabase = false;
                                            if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()) {
                                                _this.txtTestErpDatabase = statusMessage;
                                            }
                                            else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString()) {
                                                if (_this.dbCheck == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.SERVER].toString()) {
                                                    _this.txtAtparDatabase = statusMessage;
                                                }
                                                else {
                                                    _this.txtArchAtparDatabase = statusMessage;
                                                }
                                                _this.dbCheck = "";
                                            }
                                            else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString()) {
                                                if (_this.dbCheck == configdata_1.ConfigData.REPORTSDBCONNECTION[configdata_1.ConfigData.REPORTSDBCONNECTION.SERVER].toString()) {
                                                    _this.txtAtparReportsDatabase = statusMessage;
                                                }
                                                _this.dbCheck = "";
                                            }
                                            else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString()) {
                                                if (_this.dbCheck == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.SERVER].toString()) {
                                                    _this.txtAtparReportsConfigDatabase = statusMessage;
                                                }
                                                _this.dbCheck = "";
                                            }
                                            else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString()) {
                                                _this.txtHSMConnection = statusMessage;
                                            }
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            var statusMessage = webresp.ExceptionMessage;
                                            if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()) {
                                                _this.txtTestErpDatabase = statusMessage;
                                            }
                                            else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString()) {
                                                if (_this.dbCheck == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.SERVER].toString()) {
                                                    _this.txtAtparDatabase = statusMessage;
                                                }
                                                else {
                                                    _this.txtArchAtparDatabase = statusMessage;
                                                }
                                                _this.dbCheck = "";
                                            }
                                            else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString()) {
                                                if (_this.dbCheck == configdata_1.ConfigData.REPORTSDBCONNECTION[configdata_1.ConfigData.REPORTSDBCONNECTION.SERVER].toString()) {
                                                    _this.txtAtparReportsDatabase = statusMessage;
                                                }
                                                _this.dbCheck = "";
                                            }
                                            else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString()) {
                                                if (_this.dbCheck == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.SERVER].toString()) {
                                                    _this.txtAtparReportsConfigDatabase = statusMessage;
                                                }
                                                else {
                                                    _this.txtStarterAPIDatabase = statusMessage;
                                                }
                                                _this.dbCheck = "";
                                            }
                                            else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString()) {
                                                _this.txtHSMConnection = statusMessage;
                                            }
                                            blnvalidDatabase = false;
                                            break;
                                        }
                                    default: {
                                        var statusMessage = webresp.ExceptionMessage;
                                        if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()) {
                                            _this.txtTestErpDatabase = statusMessage;
                                        }
                                        else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString()) {
                                            if (_this.dbCheck == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.SERVER].toString()) {
                                                _this.txtAtparDatabase = statusMessage;
                                            }
                                            else {
                                                _this.txtArchAtparDatabase = statusMessage;
                                            }
                                            _this.dbCheck = "";
                                        }
                                        else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString()) {
                                            if (_this.dbCheck == configdata_1.ConfigData.REPORTSDBCONNECTION[configdata_1.ConfigData.REPORTSDBCONNECTION.SERVER].toString()) {
                                                _this.txtAtparReportsDatabase = statusMessage;
                                            }
                                            _this.dbCheck = "";
                                        }
                                        else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString()) {
                                            if (_this.dbCheck == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.SERVER].toString()) {
                                                _this.txtAtparReportsConfigDatabase = statusMessage;
                                            }
                                            else {
                                                _this.txtStarterAPIDatabase = statusMessage;
                                            }
                                            _this.dbCheck = "";
                                        }
                                        else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString()) {
                                            _this.txtHSMConnection = statusMessage;
                                        }
                                        blnvalidDatabase = false;
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        // this.strDbConnectionstring = "Server=" + server + ";Database=" + dataSource + ";User ID=" + userId + ";Password=" + password + ";Trusted_Connection=False";
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(database.toUpperCase() == configdata_1.ConfigData.DATABASE_TYPES[configdata_1.ConfigData.DATABASE_TYPES.ORACLE].toString())) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.configMgrService.getOracleConnection(server, userId, password.toString()).
                                catch(this.httpService.handleError).then(function (res) {
                                var webresp = res.json();
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            var statusMessage = "Connection Opened Successfully";
                                            blnvalidDatabase = true;
                                            if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()) {
                                                _this.txtTestErpDatabase = statusMessage;
                                            }
                                            else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString()) {
                                                if (_this.dbCheck == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.SERVER].toString()) {
                                                    _this.txtAtparDatabase = statusMessage;
                                                }
                                                else {
                                                    _this.txtArchAtparDatabase = statusMessage;
                                                }
                                                _this.dbCheck = "";
                                            }
                                            else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString()) {
                                                _this.txtHSMConnection = statusMessage;
                                            }
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            var statusMessage = webresp.ExceptionMessage;
                                            if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()) {
                                                _this.txtTestErpDatabase = statusMessage;
                                            }
                                            else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString()) {
                                                if (_this.dbCheck == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.SERVER].toString()) {
                                                    _this.txtAtparDatabase = statusMessage;
                                                }
                                                else {
                                                    _this.txtArchAtparDatabase = statusMessage;
                                                }
                                                _this.dbCheck = "";
                                            }
                                            else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString()) {
                                                _this.txtHSMConnection = statusMessage;
                                            }
                                            blnvalidDatabase = false;
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            var statusMessage = webresp.ExceptionMessage;
                                            if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()) {
                                                _this.txtTestErpDatabase = statusMessage;
                                            }
                                            else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString()) {
                                                if (_this.dbCheck == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.SERVER].toString()) {
                                                    _this.txtAtparDatabase = statusMessage;
                                                }
                                                else {
                                                    _this.txtArchAtparDatabase = statusMessage;
                                                }
                                                _this.dbCheck = "";
                                            }
                                            else if (tabName == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString()) {
                                                _this.txtHSMConnection = statusMessage;
                                            }
                                            blnvalidDatabase = false;
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
                        this.clientErrorMsg(ex_9, "checkDBConnection");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, blnvalidDatabase];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.checkAtparDBDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dataSource, userId, server, pwd, mtDriver, blnValidDb, ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        dataSource = void 0;
                        userId = void 0;
                        server = void 0;
                        pwd = void 0;
                        mtDriver = void 0;
                        dataSource = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.DATASOURCE].toString(); })[0].PARAMETER_VALUE;
                        userId = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.USERID].toString(); })[0].PARAMETER_VALUE;
                        server = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.SERVER].toString(); })[0].PARAMETER_VALUE;
                        if (dataSource == null || dataSource == "" ||
                            userId == null || userId == "" ||
                            server == null || server == "") {
                            this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Atpar DataBase Details : Data Source, UserID, Server fields are mandatory" });
                            this.spinnerService.stop();
                            return [2 /*return*/, false];
                        }
                        pwd = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LOCALDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.PASSWORD].toString(); })[0].PARAMETER_VALUE;
                        mtDriver = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.DRIVER].toString(); })[0].PARAMETER_VALUE;
                        blnValidDb = false;
                        return [4 /*yield*/, this.checkDBConnection(configdata_1.ConfigData.DATABASE_TYPES[configdata_1.ConfigData.DATABASE_TYPES.SQLSERVER].toString(), userId, pwd, server, dataSource, configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString(), mtDriver, blnValidDb)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, "checkAtparDBDetails");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.checkAtparReportsDBDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dataSource, userId, server, pwd, mtDriver, blnValidDb, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        dataSource = void 0;
                        userId = void 0;
                        server = void 0;
                        pwd = void 0;
                        mtDriver = void 0;
                        dataSource = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REPORTSDBCONNECTION[configdata_1.ConfigData.REPORTSDBCONNECTION.DATASOURCE].toString(); })[0].PARAMETER_VALUE;
                        userId = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REPORTSDBCONNECTION[configdata_1.ConfigData.REPORTSDBCONNECTION.USERID].toString(); })[0].PARAMETER_VALUE;
                        server = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REPORTSDBCONNECTION[configdata_1.ConfigData.REPORTSDBCONNECTION.SERVER].toString(); })[0].PARAMETER_VALUE;
                        if (dataSource == null || dataSource == "" ||
                            userId == null || userId == "" ||
                            server == null || server == "") {
                            this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Reports DataBase Details : Data Source, UserID, Server fields are mandatory" });
                            this.spinnerService.stop();
                            return [2 /*return*/, false];
                        }
                        pwd = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REPORTSDBCONNECTION[configdata_1.ConfigData.REPORTSDBCONNECTION.PASSWORD].toString(); })[0].PARAMETER_VALUE;
                        mtDriver = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REPORTSDBCONNECTION[configdata_1.ConfigData.REPORTSDBCONNECTION.DRIVER].toString(); })[0].PARAMETER_VALUE;
                        blnValidDb = false;
                        return [4 /*yield*/, this.checkDBConnection(configdata_1.ConfigData.DATABASE_TYPES[configdata_1.ConfigData.DATABASE_TYPES.SQLSERVER].toString(), userId, pwd, server, dataSource, configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString(), mtDriver, blnValidDb)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "checkAtparReportsDBDetails");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.checkAtparReportsConfigDBDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dataSource, userId, server, pwd, mtDriver, blnValidDb, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        dataSource = void 0;
                        userId = void 0;
                        server = void 0;
                        pwd = void 0;
                        mtDriver = void 0;
                        dataSource = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.DATASOURCE].toString(); })[0].PARAMETER_VALUE;
                        userId = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.USERID].toString(); })[0].PARAMETER_VALUE;
                        server = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.SERVER].toString(); })[0].PARAMETER_VALUE;
                        if (dataSource == null || dataSource == "" ||
                            userId == null || userId == "" ||
                            server == null || server == "") {
                            this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Reports Config DataBase Details : Data Source, UserID, Server fields are mandatory" });
                            this.spinnerService.stop();
                            return [2 /*return*/, false];
                        }
                        pwd = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.PASSWORD].toString(); })[0].PARAMETER_VALUE;
                        mtDriver = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.DRIVER].toString(); })[0].PARAMETER_VALUE;
                        blnValidDb = false;
                        return [4 /*yield*/, this.checkDBConnection(configdata_1.ConfigData.DATABASE_TYPES[configdata_1.ConfigData.DATABASE_TYPES.SQLSERVER].toString(), userId, pwd, server, dataSource, configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString(), mtDriver, blnValidDb)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12, "checkAtparReportsConfigDBDetails");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.getDataBaseConnection = function (databasetype, dbConnectionString) {
        try {
            if (databasetype == configdata_1.ConfigData.DATABASE_TYPES[configdata_1.ConfigData.DATABASE_TYPES.SQLSERVER].toString()) {
            }
            return "Connection Opened Successfully";
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getDataBaseConnection");
            return ex.toString();
        }
    };
    ConfigurationManagerComponent.prototype.checkArchiveDBDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var arcDataSource, archPwd, archDriver, archUserId, archServer, blnValidDb, ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        arcDataSource = void 0;
                        archPwd = void 0;
                        archDriver = void 0;
                        arcDataSource = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.ARCHIVE_DATASOURCE].toString(); })[0].PARAMETER_VALUE;
                        archUserId = void 0;
                        archUserId = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.ARCHIVE_USERID].toString(); })[0].PARAMETER_VALUE;
                        archServer = void 0;
                        archServer = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.ARCHIVE_SERVER].toString(); })[0].PARAMETER_VALUE;
                        archPwd = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString()
                            && x.PARAMETER_ID == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.ARCHIVE_PASSWORD].toString(); })[0].PARAMETER_VALUE;
                        archDriver = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString()
                            && x.PARAMETER_ID == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.ARCHIVE_DRIVER].toString(); })[0].PARAMETER_VALUE;
                        if (arcDataSource == null || arcDataSource == "" ||
                            archUserId == null || archUserId == "" ||
                            archServer == null || archServer == "") {
                            this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Atpar Archive DataBase Details : Data Source, UserID, Server fields are mandatory" });
                            this.spinnerService.stop();
                            return [2 /*return*/, false];
                        }
                        blnValidDb = false;
                        return [4 /*yield*/, this.checkDBConnection(configdata_1.ConfigData.DATABASE_TYPES[configdata_1.ConfigData.DATABASE_TYPES.SQLSERVER].toString(), archUserId, archPwd, archServer, arcDataSource, configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString(), archDriver, blnValidDb)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13.toString(), "checkArchiveDBDetails");
                        return [2 /*return*/, ex_13.toString()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.checkStarterApiDBDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var starterDataSource, starterPwd, starterDriver, starterUserId, starterServer, blnValidDb, ex_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        starterDataSource = void 0;
                        starterPwd = void 0;
                        starterDriver = void 0;
                        starterDataSource = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_DATASOURCE].toString(); })[0].PARAMETER_VALUE;
                        starterUserId = void 0;
                        starterUserId = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_USERID].toString(); })[0].PARAMETER_VALUE;
                        starterServer = void 0;
                        starterServer = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_SERVER].toString(); })[0].PARAMETER_VALUE;
                        starterPwd = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString()
                            && x.PARAMETER_ID == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_PASSWORD].toString(); })[0].PARAMETER_VALUE;
                        starterDriver = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString()
                            && x.PARAMETER_ID == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_DRIVER].toString(); })[0].PARAMETER_VALUE;
                        if (starterDataSource == null || starterDataSource == "" ||
                            starterUserId == null || starterUserId == "" ||
                            starterServer == null || starterServer == "") {
                            this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Atpar Starter API DataBase Details : Data Source, UserID, Server fields are mandatory" });
                            this.spinnerService.stop();
                            return [2 /*return*/, false];
                        }
                        blnValidDb = false;
                        return [4 /*yield*/, this.checkDBConnection(configdata_1.ConfigData.DATABASE_TYPES[configdata_1.ConfigData.DATABASE_TYPES.SQLSERVER].toString(), starterUserId, starterPwd, starterServer, starterDataSource, configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString(), starterDriver, blnValidDb)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        ex_14 = _a.sent();
                        this.clientErrorMsg(ex_14.toString(), "checkStarterApiDBDetails");
                        return [2 /*return*/, ex_14.toString()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.checkErpValidations = function () {
        try {
            var strErpdatabase = void 0;
            var strSchema = void 0;
            var userId = void 0;
            var pwd = void 0;
            var server = void 0;
            var dataSource = void 0;
            var netTrans = void 0;
            userId = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.USERID].toString(); })[0].PARAMETER_VALUE;
            strErpdatabase = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.DATABASE].toString(); })[0].PARAMETER_VALUE;
            strSchema = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.SCHEMA].toString(); })[0].PARAMETER_VALUE;
            pwd = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.PASSWORD].toString(); })[0].PARAMETER_VALUE;
            server = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.SERVER].toString(); })[0].PARAMETER_VALUE;
            dataSource = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.DATASOURCE].toString(); })[0].PARAMETER_VALUE;
            netTrans = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.NETTRANS].toString(); })[0].PARAMETER_VALUE;
            if (strErpdatabase == null || strErpdatabase == '' || strErpdatabase == 'NONE') {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select ERP Database" });
                this.spinnerService.stop();
                return false;
            }
            else if (strErpdatabase == configdata_1.ConfigData.DATABASE_TYPES[configdata_1.ConfigData.DATABASE_TYPES.ORACLE].toString()) {
                if (strSchema == null || strSchema == '' ||
                    userId == null || userId == '' ||
                    pwd == null || pwd == '' ||
                    server == null || server == '') {
                    this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP Database Details : Schema, UserId, Password, Server & Driver are mandatory fields for Oracle database" });
                    this.spinnerService.stop();
                    return false;
                }
            }
            else if (this.configData.filter(function (x) { return x.TAB_ID == 'ERP_SYS_DETAILS' && x.PARAMETER_ID == "ENTERPRISESYSTEM"; })[0].PARAMETER_VALUE == "ORACLE") {
                if (strErpdatabase != "ORACLE") {
                    this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP Database should be ORACLE" });
                    this.spinnerService.stop();
                    return false;
                }
            }
            else if (strErpdatabase == configdata_1.ConfigData.DATABASE_TYPES[configdata_1.ConfigData.DATABASE_TYPES.DB2].toString()) {
                if (userId == null || userId == '' ||
                    pwd == null || pwd == '' ||
                    server == null || server == '' ||
                    dataSource == null || dataSource == '' ||
                    netTrans == null || netTrans == '') {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP Database Details : Schema, UserId, Password, Server, Driver, " +
                            "Datasource & Network Library are mandatory fields for DB2 database"
                    });
                    this.spinnerService.stop();
                    return false;
                }
            }
            else if (strErpdatabase == configdata_1.ConfigData.DATABASE_TYPES[configdata_1.ConfigData.DATABASE_TYPES.SQLSERVER].toString()) {
                if (strSchema == null || strSchema == '' ||
                    userId == null || userId == '' ||
                    pwd == null || pwd == '' ||
                    server == null || server == '' ||
                    dataSource == null || dataSource == '') {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP Database Details : Schema, UserId, Password, Server, Driver & Datasource are mandatory fields for Sql Server database"
                    });
                    this.spinnerService.stop();
                    return false;
                }
            }
            else if (strErpdatabase == configdata_1.ConfigData.DATABASE_TYPES[configdata_1.ConfigData.DATABASE_TYPES.INFORMIX].toString()) {
                var service = void 0;
                var host = void 0;
                var protocal = void 0;
                service = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                    x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.SERVICE].toString(); })[0].PARAMETER_VALUE;
                host = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                    x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.HOST].toString(); })[0].PARAMETER_VALUE;
                protocal = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                    x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.PROTOCOL].toString(); })[0].PARAMETER_VALUE;
                if (strSchema == null || strSchema == '' ||
                    userId == null || userId == '' ||
                    pwd == null || pwd == '' ||
                    server == null || server == '' ||
                    service == null || service == '' ||
                    host == null || host == '' ||
                    protocal == null || protocal == '') {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP Database Details : Schema, UserId, Password, Server,Driver, " +
                            "Service Name, Host Name & Protocol are mandatory fields for Informix database"
                    });
                    this.spinnerService.stop();
                    return false;
                }
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex.toString(), "checkErpValidations");
        }
    };
    ConfigurationManagerComponent.prototype.getErpSystemDetails = function (configData) {
        try {
            this.deferpsystemsvalues = [];
            var prvSystem = "";
            if (this.enterpriseSystemDetails != null && this.enterpriseSystemDetails.length > 0) {
                this.deferpsystemsvalues.push({ value: "Select ERP System", label: "Select ERP System" });
                for (var x = 0; x < this.enterpriseSystemDetails.length; x++) {
                    if (prvSystem != this.enterpriseSystemDetails[x].ENTERPRISE_SYSTEM) {
                        prvSystem = this.enterpriseSystemDetails[x].ENTERPRISE_SYSTEM;
                        this.deferpsystemsvalues.push({ value: prvSystem, label: prvSystem });
                    }
                }
                var paramIdName_1 = configdata_1.ConfigData.ERP_SYS_DETAILS[configdata_1.ConfigData.ERP_SYS_DETAILS.ENTERPRISESYSTEM].toString();
                configData.filter(function (x) { return x.PARAMETER_ID == paramIdName_1; })[0].DEFAULT_VALUE = this.deferpsystemsvalues;
                this.ERP_System_Details = configData;
                var tabId_1 = configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString();
                this.selectionChanged(configData.filter(function (x) { return x.TAB_ID == tabId_1
                    && x.PARAMETER_ID == paramIdName_1; })[0]);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getErpSystemDetails");
        }
    };
    ConfigurationManagerComponent.prototype.getERPRemoteDb = function (erpRemoteData) {
        try {
            this.MainERP_Database = erpRemoteData;
            this.selectionChanged(erpRemoteData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()
                && x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.DATABASE].toString(); })[0]);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getERPRemoteDb");
        }
    };
    ConfigurationManagerComponent.prototype.getEntrpServiceConffile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.configMgrService.GetEntrpServiceConffile(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], true).
                                catch(this.httpService.handleError).then(function (res) {
                                var webresp = res.json();
                                //(webresp) => {
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            // this.growlmsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: webresp.StatusMessage });
                                            // this.validationMessage = webresp.StatusMessage;
                                            _this.logxml = webresp.DataVariable.toString();
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                            //this.validationMessage = webresp.StatusMessage;
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.growlmsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                            //this.validationMessage = webresp.StatusMessage;
                                            break;
                                        }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_15 = _a.sent();
                        this.clientErrorMsg(ex_15, "getEntrpServiceConffile");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.getSSLConfigData = function () {
        var _this = this;
        try {
            this.configMgrService.GetSSLConfigDetails().
                catch(this.httpService.handleError).map(function (res) { return res.json(); }).subscribe(function (weresb) {
                switch (weresb.StatType) {
                    case AtParEnums_1.StatusType.Success:
                        {
                            if (weresb.Data != null) {
                                _this.sslTabData.filter(function (x) { return x.PARAMETER_ID == "PROTOCOL"; })[0].PARAMETER_VALUE = weresb.Data.PROTOCOL;
                                _this.sslTabData.filter(function (x) { return x.PARAMETER_ID == "SERVERNAME"; })[0].PARAMETER_VALUE = weresb.Data.SERVER_NAME;
                                _this.sslTabData.filter(function (x) { return x.PARAMETER_ID == "PORTNO"; })[0].PARAMETER_VALUE = weresb.Data.PORT_NO;
                            }
                            break;
                        }
                    case AtParEnums_1.StatusType.Warn:
                        {
                            _this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: weresb.StatusMessage });
                            //this.validationMessage = weresb.StatusMessage;
                            break;
                        }
                    case AtParEnums_1.StatusType.Error:
                        {
                            _this.growlmsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: weresb.StatusMessage });
                            // this.validationMessage = weresb.StatusMessage;
                            break;
                        }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getSSLConfigData");
        }
    };
    ConfigurationManagerComponent.prototype.getEmail = function () {
        try {
            var smtpDefValues = [];
            var emailauth = this.Email.filter(function (x) { return x.PARAMETER_ID == 'SMTP_AUTHENTICATE'; });
            if (emailauth != null || emailauth != undefined) {
                for (var x = 0; x < emailauth[0].DEFAULT_VALUE.split(',').length; x++) {
                    smtpDefValues.push({ value: x, label: emailauth[0].DEFAULT_VALUE.split(',')[x].toString().trim() });
                }
                emailauth[0].DEFAULT_VALUE = smtpDefValues;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getEmail");
        }
    };
    ConfigurationManagerComponent.prototype.getHL7Data = function (hl7Data) {
        try {
            //this.ERP_Database = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            this.MainHL7 = hl7Data;
            this.selectionChanged(hl7Data.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFORMATION_SYSTEM].toString(); })[0]);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getHL7Data");
        }
    };
    ConfigurationManagerComponent.prototype.check_Validations = function () {
        try {
            // ErpSystem 
            var erpSys = void 0;
            erpSys = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString()
                && x.PARAMETER_ID == configdata_1.ConfigData.ERP_SYS_DETAILS[configdata_1.ConfigData.ERP_SYS_DETAILS.ENTERPRISESYSTEM].toString(); })[0].PARAMETER_VALUE;
            if (erpSys == "" || erpSys == null || erpSys == undefined || erpSys == "Select ERP System") {
                this.growlmsgs.push({
                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select ERP System"
                });
                return false;
            }
            if (erpSys != null || erpSys != "") {
                erpSys = erpSys.toUpperCase();
            }
            else {
                erpSys = "";
            }
            //version 
            var erpVers = void 0;
            erpVers = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.ERP_SYS_DETAILS[configdata_1.ConfigData.ERP_SYS_DETAILS.ENTERPRISEVERSION].toString(); })[0].PARAMETER_VALUE;
            if (erpVers == "" || erpVers == null || erpVers == undefined || erpVers == 'SELECT ONE') {
                this.growlmsgs.push({
                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select ERP Version"
                });
                return false;
            }
            //DownLoad 
            var downFrom = void 0;
            downFrom = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.ERP_SYS_DETAILS[configdata_1.ConfigData.ERP_SYS_DETAILS.DOWNLOADFROM].toString(); })[0].PARAMETER_VALUE;
            if (downFrom == "" || downFrom == null && downFrom == undefined || downFrom == 'SELECT ONE') {
                this.growlmsgs.push({
                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Download From"
                });
                return false;
            }
            //Upload
            var upload = void 0;
            upload = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.ERP_SYS_DETAILS[configdata_1.ConfigData.ERP_SYS_DETAILS.UPLOADTO].toString(); })[0].PARAMETER_VALUE;
            if (upload == "" || upload == null && upload == undefined || upload == 'SELECT ONE') {
                this.growlmsgs.push({
                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Upload To"
                });
                return false;
            }
            var erpUserId = void 0;
            var erpPwd = void 0;
            var erpServer = void 0;
            var erpProductLine = void 0;
            var erpSYSNR = void 0;
            erpUserId = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.ERP_SYS_DETAILS[configdata_1.ConfigData.ERP_SYS_DETAILS.ERPUSERID].toString(); })[0].PARAMETER_VALUE;
            erpPwd = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.ERP_SYS_DETAILS[configdata_1.ConfigData.ERP_SYS_DETAILS.ERPPASSWORD].toString(); })[0].PARAMETER_VALUE;
            erpServer = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.ERP_SYS_DETAILS[configdata_1.ConfigData.ERP_SYS_DETAILS.ERPSERVER].toString(); })[0].PARAMETER_VALUE;
            erpProductLine = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.ERP_SYS_DETAILS[configdata_1.ConfigData.ERP_SYS_DETAILS.PRODUCTLINE].toString(); })[0].PARAMETER_VALUE;
            erpSYSNR = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.ERP_SYS_DETAILS[configdata_1.ConfigData.ERP_SYS_DETAILS.SYSNR].toString(); })[0].PARAMETER_VALUE;
            if (erpSys == "LAWSON") {
                if (erpUserId == null || erpUserId == '' ||
                    erpPwd == null || erpPwd == '' ||
                    erpServer == null || erpServer == '' ||
                    erpProductLine == null || erpProductLine == '') {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP System Details : UserId, Password, Server Address & Product Line fields are mandatory for Lawson ERP"
                    });
                    return false;
                }
            }
            if (erpSys.toUpperCase() == "MEDITECH_MAGIC" ||
                erpSys.toUpperCase() == "MEDITECH_CS" ||
                erpSys.toUpperCase() == "MEDITECH_NUI" ||
                erpSys.toUpperCase() == "MATKON" ||
                erpSys.toUpperCase() == "GEAC_AS400") {
                var downFilePath = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                    x.PARAMETER_ID == configdata_1.ConfigData.ERP_SYS_DETAILS[configdata_1.ConfigData.ERP_SYS_DETAILS.DOWNLOADFILEPATH].toString(); })[0].PARAMETER_VALUE;
                var uploadFilePath = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                    x.PARAMETER_ID == configdata_1.ConfigData.ERP_SYS_DETAILS[configdata_1.ConfigData.ERP_SYS_DETAILS.UPLOADFILEPATH].toString(); })[0].PARAMETER_VALUE;
                if (downFilePath == null || downFilePath == "" || uploadFilePath == "" || uploadFilePath == null) {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP System Details : Download File & Upload Directory fields are mandatory"
                    });
                    return false;
                }
            }
            if (erpSys == configdata_1.ConfigData.DATABASE_TYPES[configdata_1.ConfigData.DATABASE_TYPES.SAP].toString()) {
                if (erpUserId == null || erpUserId == '' ||
                    erpPwd == null || erpPwd == '' ||
                    erpSys == null || erpSys == '' ||
                    erpServer == null || erpServer == '' ||
                    erpSYSNR == null || erpSYSNR == '') {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP System Details : UserId, Password, Server Address, ClinetCode, SYSNR fields are mandatory for SAP ERP"
                    });
                    return false;
                }
            }
            var strErpdatabase = void 0;
            var strSchema = void 0;
            var userId = void 0;
            var pwd = void 0;
            var server = void 0;
            var dataSource = void 0;
            var netTrans = void 0;
            userId = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.USERID].toString(); })[0].PARAMETER_VALUE;
            strErpdatabase = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.DATABASE].toString(); })[0].PARAMETER_VALUE;
            strSchema = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.SCHEMA].toString(); })[0].PARAMETER_VALUE;
            pwd = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.PASSWORD].toString(); })[0].PARAMETER_VALUE;
            server = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.SERVER].toString(); })[0].PARAMETER_VALUE;
            dataSource = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.DATASOURCE].toString(); })[0].PARAMETER_VALUE;
            netTrans = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.NETTRANS].toString(); })[0].PARAMETER_VALUE;
            if (strErpdatabase == configdata_1.ConfigData.DATABASE_TYPES[configdata_1.ConfigData.DATABASE_TYPES.ORACLE].toString()) {
                if (strSchema == null || strSchema == '' ||
                    userId == null || userId == '' ||
                    pwd == null || pwd == '' ||
                    server == null || server == '') {
                    this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP Database Details : Schema, UserId, Password, Server & Driver are mandatory fields for Oracle database" });
                    return false;
                }
            }
            else if (erpSys == "ORACLE") {
                if (strErpdatabase != "ORACLE") {
                    this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP Database should be ORACLE" });
                    return false;
                }
            }
            else if (strErpdatabase == configdata_1.ConfigData.DATABASE_TYPES[configdata_1.ConfigData.DATABASE_TYPES.DB2].toString()) {
                if (userId == null || userId == '' ||
                    pwd == null || pwd == '' ||
                    server == null || server == '' ||
                    dataSource == null || dataSource == '' ||
                    netTrans == null || netTrans == '') {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP Database Details : Schema, UserId, Password, Server, Driver, " +
                            "Datasource & Network Library are mandatory fields for DB2 database"
                    });
                    return false;
                }
            }
            else if (strErpdatabase == configdata_1.ConfigData.DATABASE_TYPES[configdata_1.ConfigData.DATABASE_TYPES.SQLSERVER].toString()) {
                if (strSchema == null || strSchema == '' ||
                    userId == null || userId == '' ||
                    pwd == null || pwd == '' ||
                    server == null || server == '' ||
                    dataSource == null || dataSource == '') {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP Database Details : Schema, UserId, Password, Server, Driver & Datasource are mandatory fields for Sql Server database"
                    });
                    return false;
                }
            }
            else if (strErpdatabase == configdata_1.ConfigData.DATABASE_TYPES[configdata_1.ConfigData.DATABASE_TYPES.INFORMIX].toString()) {
                var service = void 0;
                var host = void 0;
                var protocal = void 0;
                service = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                    x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.SERVICE].toString(); })[0].PARAMETER_VALUE;
                host = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                    x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.HOST].toString(); })[0].PARAMETER_VALUE;
                protocal = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                    x.PARAMETER_ID == configdata_1.ConfigData.REMOTEDBCONNECTION[configdata_1.ConfigData.REMOTEDBCONNECTION.PROTOCOL].toString(); })[0].PARAMETER_VALUE;
                if (strSchema == null || strSchema == '' ||
                    userId == null || userId == '' ||
                    pwd == null || pwd == '' ||
                    server == null || server == '' ||
                    service == null || service == '' ||
                    host == null || host == '' ||
                    protocal == null || protocal == '') {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP Database Details : Schema, UserId, Password, Server,Driver, " +
                            "Service Name, Host Name & Protocol are mandatory fields for Informix database"
                    });
                    return false;
                }
            }
            var caseInfoSystem = void 0;
            var caseInfoDb = void 0;
            caseInfoSystem = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFORMATION_SYSTEM].toString(); })[0].PARAMETER_VALUE;
            caseInfoDb = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DATABASE].toString(); })[0].PARAMETER_VALUE;
            if (caseInfoSystem == "HSM") {
                if (caseInfoDb == "NONE") {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Case Information System Database"
                    });
                    return false;
                }
            }
            var caseInfoSchema = void 0;
            var caseInfoDbUserId = void 0;
            var caseInfoDbPwd = void 0;
            var caseInfoServer = void 0;
            var caseInfoDbSource = void 0;
            caseInfoDbUserId = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DB_USERID].toString(); })[0].PARAMETER_VALUE;
            caseInfoSchema = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DB_SCHEMA].toString(); })[0].PARAMETER_VALUE;
            caseInfoDbPwd = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DB_PASSWORD].toString(); })[0].PARAMETER_VALUE;
            caseInfoServer = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DB_SERVER].toString(); })[0].PARAMETER_VALUE;
            caseInfoDbSource = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DB_DATASOURCE].toString(); })[0].PARAMETER_VALUE;
            if (caseInfoSystem == "HSM") {
                if (caseInfoSchema == null || caseInfoSchema == '' ||
                    caseInfoDbUserId == null || caseInfoDbUserId == '' ||
                    caseInfoDbPwd == null || caseInfoDbPwd == '' ||
                    caseInfoServer == null || caseInfoServer == '' ||
                    caseInfoDbSource == null || caseInfoDbSource == '') {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Case Information System Database Details : Schema, UserId, Password, Server, Driver & " +
                            "Datasource are mandatory fields for Sql Server database"
                    });
                    return false;
                }
            }
            var atparDataSource = void 0;
            var atparUserId = void 0;
            var atparServer = void 0;
            var x = configdata_1.ConfigData.SYSTEMDBCONNECTION.DATASOURCE.toString();
            var xx = configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.DATASOURCE].toString();
            atparDataSource = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.DATASOURCE].toString(); })[0].PARAMETER_VALUE;
            atparUserId = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.USERID].toString(); })[0].PARAMETER_VALUE;
            atparServer = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.SERVER].toString(); })[0].PARAMETER_VALUE;
            if (atparDataSource == null || atparDataSource == '' ||
                atparUserId == null || atparUserId == '' ||
                atparServer == null || atparServer == '') {
                this.growlmsgs.push({
                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Atpar DataBase Details : Data Source, UserID, Server fields are mandatory"
                });
                return false;
            }
            var rdataSource = void 0;
            var ruserId = void 0;
            var rserver = void 0;
            var rpwd = void 0;
            var rmtDriver = void 0;
            rdataSource = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.DATASOURCE].toString(); })[0].PARAMETER_VALUE;
            ruserId = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.USERID].toString(); })[0].PARAMETER_VALUE;
            rserver = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.SERVER].toString(); })[0].PARAMETER_VALUE;
            if (rdataSource == null || rdataSource == "" ||
                ruserId == null || ruserId == "" ||
                rserver == null || rserver == "") {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Reports Config DataBase Details : Data Source, UserID, Server fields are mandatory" });
                this.spinnerService.stop();
                return false;
            }
            var starterDataSource = void 0;
            var starterPwd = void 0;
            var starterDriver = void 0;
            starterDataSource = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_DATASOURCE].toString(); })[0].PARAMETER_VALUE;
            var starterUserId = void 0;
            starterUserId = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_USERID].toString(); })[0].PARAMETER_VALUE;
            var starterServer = void 0;
            starterServer = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_SERVER].toString(); })[0].PARAMETER_VALUE;
            starterPwd = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString()
                && x.PARAMETER_ID == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_PASSWORD].toString(); })[0].PARAMETER_VALUE;
            starterDriver = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString()
                && x.PARAMETER_ID == configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_DRIVER].toString(); })[0].PARAMETER_VALUE;
            if (starterDataSource == null || starterDataSource == "" ||
                starterUserId == null || starterUserId == "" ||
                starterServer == null || starterServer == "") {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Atpar Starter API DataBase Details : Data Source, UserID, Server fields are mandatory" });
                this.spinnerService.stop();
                return false;
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "check_Validations");
        }
    };
    ConfigurationManagerComponent.prototype.getAuditAllowed = function (userId, appId, strMenuCode, lstConfigData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atparCommonService.getAuditAllowed(appId, strMenuCode).
                                catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var webresp, _a, strAuditData;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            webresp = res.json();
                                            _a = webresp.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                            }
                                            return [3 /*break*/, 4];
                                        case 1:
                                            strAuditData = webresp.Data;
                                            if (!(strAuditData == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString())) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.doAuditData(AtParEnums_1.EnumApps.Auth, strMenuCode, lstConfigData)];
                                        case 2:
                                            _b.sent();
                                            _b.label = 3;
                                        case 3: return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_16 = _a.sent();
                        this.clientErrorMsg(ex_16, "getAuditAllowed");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.doAuditData = function (appId, strMenuCode, lstConfigData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atparCommonService.doAuditData(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], appId, strMenuCode, lstConfigData).
                                catch(this.httpService.handleError).then(function (res) {
                                var webresp = res.json();
                                _this.growlmsgs = [];
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.growlmsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_17 = _a.sent();
                        this.clientErrorMsg(ex_17, "doAuditData");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.btnTestErpDatabase_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.growlmsgs = [];
                        this.spinnerService.start();
                        this.txtTestErpDatabase = "";
                        if (!this.checkErpValidations()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.checkRemoteDBDetails()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_18 = _a.sent();
                        this.clientErrorMsg(ex_18, "btnTestErpDatabase_Click");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.btnTestAtparDatabase_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlmsgs = [];
                        this.txtAtparDatabase = "";
                        this.dbCheck = configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.SERVER].toString();
                        return [4 /*yield*/, this.checkAtparDBDetails()];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_19 = _a.sent();
                        this.clientErrorMsg(ex_19, "btnTestAtparDatabase_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.btnTestAtparReportsConfigDB_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlmsgs = [];
                        this.txtAtparReportsConfigDatabase = "";
                        this.dbCheck = configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.SERVER].toString();
                        return [4 /*yield*/, this.checkAtparReportsConfigDBDetails()];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_20 = _a.sent();
                        this.clientErrorMsg(ex_20, "btnTestAtparReportsConfigDB_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.btnTestAtparReportsDB_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlmsgs = [];
                        this.txtAtparReportsConfigDatabase = "";
                        this.dbCheck = configdata_1.ConfigData.REPORTSDBCONNECTION[configdata_1.ConfigData.REPORTSDBCONNECTION.SERVER].toString();
                        return [4 /*yield*/, this.checkAtparReportsDBDetails()];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_21 = _a.sent();
                        this.clientErrorMsg(ex_21, "btnTestAtparReportsDB_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.btnTestStarterApiDatabase_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlmsgs = [];
                        this.txtStarterAPIDatabase = "";
                        this.dbCheck = configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION[configdata_1.ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_SERVER].toString();
                        return [4 /*yield*/, this.checkStarterApiDBDetails()];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_22 = _a.sent();
                        this.clientErrorMsg(ex_22, "btnTestStarterApiDatabase_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.btnTestArchiveDatabase_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlmsgs = [];
                        this.txtArchAtparDatabase = "";
                        this.dbCheck = configdata_1.ConfigData.SYSTEMDBCONNECTION[configdata_1.ConfigData.SYSTEMDBCONNECTION.ARCHIVE_SERVER].toString();
                        return [4 /*yield*/, this.checkArchiveDBDetails()];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_23 = _a.sent();
                        this.clientErrorMsg(ex_23, "btnTestArchiveDatabase_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.btnRecallSubmit_Click = function () {
        this.onSubmit();
    };
    ConfigurationManagerComponent.prototype.btnLDAPcon_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlmsgs = [];
                        return [4 /*yield*/, this.testLDAPConnection()];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_24 = _a.sent();
                        this.clientErrorMsg(ex_24, "btnLDAPcon_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.btnHSMcon_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var caseInfoDb, caseInfoSchema, caseInfoDbUserId, caseInfoDbPwd, caseInfoServer, caseInfoDbSource, caseInfoDriver, ex_25;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlmsgs = [];
                        this.txtHSMConnection = '';
                        caseInfoDb = void 0;
                        caseInfoDb = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DATABASE].toString(); })[0].PARAMETER_VALUE;
                        caseInfoSchema = void 0;
                        caseInfoDbUserId = void 0;
                        caseInfoDbPwd = void 0;
                        caseInfoServer = void 0;
                        caseInfoDbSource = void 0;
                        caseInfoDriver = void 0;
                        caseInfoDbUserId = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DB_USERID].toString(); })[0].PARAMETER_VALUE;
                        caseInfoSchema = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DB_SCHEMA].toString(); })[0].PARAMETER_VALUE;
                        caseInfoDbPwd = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DB_PASSWORD].toString(); })[0].PARAMETER_VALUE;
                        caseInfoServer = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DB_SERVER].toString(); })[0].PARAMETER_VALUE;
                        caseInfoDbSource = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DB_DATASOURCE].toString(); })[0].PARAMETER_VALUE;
                        caseInfoDriver = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.HL7[configdata_1.ConfigData.HL7.CASE_INFO_DB_DRIVER].toString(); })[0].PARAMETER_VALUE;
                        if (caseInfoDb == "NONE") {
                            this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Case Information System Database" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        if (caseInfoSchema == null || caseInfoSchema == "" || caseInfoDbUserId == null || caseInfoDbUserId == ""
                            || caseInfoDbPwd == null || caseInfoDbPwd == "" || caseInfoServer == null || caseInfoServer == ""
                            || caseInfoDbSource == null || caseInfoDbSource == "") {
                            this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Case Information System Database Details : Schema, UserId, Password, Server, Driver & Datasource are mandatory fields for Sql Server database" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.checkDBConnection(caseInfoDb, caseInfoDbUserId, caseInfoDbPwd, caseInfoServer, caseInfoDbSource, configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.HL7].toString(), caseInfoDriver)];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_25 = _a.sent();
                        this.clientErrorMsg(ex_25, "btnHSMcon_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.btnSSLSubmit_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _loop_7, this_7, x, state_5, protocol, serverName, portNo, ex_26;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!(this.sslTabData != null)) return [3 /*break*/, 4];
                        _loop_7 = function (x) {
                            var regxresult, txtfield_5;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(this_7.sslTabData[x].PARAMETER_VALUE != "" && this_7.sslTabData[x].PARAMETER_VALUE != null &&
                                            this_7.sslTabData[x].VALIDATION_RULES != "" && this_7.sslTabData[x].VALIDATION_RULES != null && this_7.sslTabData[x].VALIDATION_RULES != "MANDATORY")) return [3 /*break*/, 3];
                                        regxresult = Validators_1.regExpValidator('numeric', this_7.sslTabData[x].PARAMETER_VALUE);
                                        if (!!regxresult) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this_7.enableSelectedTab({ tab: { title: "AtPar System", active: true }, tabs: this_7.tabs })];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this_7.showMessage(this_7.sslTabData[x].VALIDATION_RULES)];
                                    case 2:
                                        _a.sent();
                                        txtfield_5 = document.getElementById(this_7.sslTabData[x].TAB_ID + this_7.sslTabData[x].PARAMETER_ID);
                                        setTimeout(function () {
                                            if (txtfield_5 != null) {
                                                txtfield_5.focus();
                                            }
                                        }, 1);
                                        return [2 /*return*/, { value: void 0 }];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        this_7 = this;
                        x = 0;
                        _a.label = 1;
                    case 1:
                        if (!(x < this.sslTabData.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_7(x)];
                    case 2:
                        state_5 = _a.sent();
                        if (typeof state_5 === "object")
                            return [2 /*return*/, state_5.value];
                        _a.label = 3;
                    case 3:
                        x++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.growlmsgs = [];
                        protocol = void 0;
                        serverName = void 0;
                        portNo = void 0;
                        this.spinnerService.start();
                        protocol = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.ATPAR_SYSTEM].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.ATPAR_SYSTEM[configdata_1.ConfigData.ATPAR_SYSTEM.PROTOCOL].toString(); })[0].PARAMETER_VALUE;
                        serverName = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.ATPAR_SYSTEM].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.ATPAR_SYSTEM[configdata_1.ConfigData.ATPAR_SYSTEM.SERVERNAME].toString(); })[0].PARAMETER_VALUE;
                        portNo = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.ATPAR_SYSTEM].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.ATPAR_SYSTEM[configdata_1.ConfigData.ATPAR_SYSTEM.PORTNO].toString(); })[0].PARAMETER_VALUE;
                        return [4 /*yield*/, this.configMgrService.SaveSSLConfigDetails(protocol, serverName, portNo).
                                catch(this.httpService.handleError).then(function (res) {
                                var webresp = res.json();
                                _this.spinnerService.stop();
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.growlmsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully" });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.growlmsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_26 = _a.sent();
                        this.clientErrorMsg(ex_26, "btnSSLSubmit_Click");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.btnLogSave_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var webPageLevel, webServiceLevel, busLogLevel, logxml, ex_27;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlmsgs = [];
                        webPageLevel = void 0;
                        webServiceLevel = void 0;
                        busLogLevel = void 0;
                        logxml = void 0;
                        this.spinnerService.start();
                        webPageLevel = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LOG_CONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LOG_CONFIG[configdata_1.ConfigData.LOG_CONFIG.WEBPAGES_LOGLEVEL].toString(); })[0].PARAMETER_VALUE;
                        webServiceLevel = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LOG_CONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LOG_CONFIG[configdata_1.ConfigData.LOG_CONFIG.WEBSERVICES_LOGLEVEL].toString(); })[0].PARAMETER_VALUE;
                        busLogLevel = this.configData.filter(function (x) { return x.TAB_ID == configdata_1.ConfigData.ConfigurationManager_Tabs[configdata_1.ConfigData.ConfigurationManager_Tabs.LOG_CONFIG].toString() &&
                            x.PARAMETER_ID == configdata_1.ConfigData.LOG_CONFIG[configdata_1.ConfigData.LOG_CONFIG.BUSINESSRULE_LOGLEVEL].toString(); })[0].PARAMETER_VALUE;
                        return [4 /*yield*/, this.configMgrService.UpdateLogConfigDetails(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], logxml).
                                catch(this.httpService.handleError).then(function (res) {
                                res.json();
                                var webresp = res.json();
                                _this.spinnerService.stop();
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.growlmsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully" });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.growlmsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_27 = _a.sent();
                        this.clientErrorMsg(ex_27, "btnLogSave_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.btnFilterSave_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_28;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlmsgs = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.configMgrService.UpdateLogConfigDetails(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.logxml).
                                catch(this.httpService.handleError).then(function (res) {
                                var webresp = res.json();
                                _this.spinnerService.stop();
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.growlmsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully" });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.growlmsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                            break;
                                        }
                                }
                                _this.spinnerService.stop();
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_28 = _a.sent();
                        this.clientErrorMsg(ex_28, "btnFilterSave_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfigurationManagerComponent.prototype.btnFilterReset_Click = function () {
        var _this = this;
        try {
            this.growlmsgs = [];
            this.spinnerService.start();
            this.configMgrService.GetEntrpServiceConffile(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], false).
                catch(this.httpService.handleError).then(function (res) {
                var webresp = res.json();
                _this.spinnerService.stop();
                switch (webresp.StatType) {
                    case AtParEnums_1.StatusType.Success:
                        {
                            _this.growlmsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Filter Reset Successful" });
                            _this.logxml = webresp.DataVariable.toString();
                            break;
                        }
                    case AtParEnums_1.StatusType.Warn:
                        {
                            _this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                            break;
                        }
                    case AtParEnums_1.StatusType.Error:
                        {
                            _this.growlmsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                            break;
                        }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnFilterReset_Click");
        }
    };
    ConfigurationManagerComponent.prototype.validationsForInputs = function (validateconfigData) {
        return __awaiter(this, void 0, void 0, function () {
            var x, key, iv, rpstring, decrypt, decryptdata;
            return __generator(this, function (_a) {
                try {
                    for (x = 0; x <= validateconfigData.length - 1; x++) {
                        if (validateconfigData[x].TYPE == "TEXTBOX") {
                            if (validateconfigData[x].NEW_VALIDATION_RULES == null) {
                                validateconfigData[x].NEW_VALIDATION_RULES = "";
                            }
                            if (validateconfigData[x].VALIDATION_RULES == null) {
                                validateconfigData[x].VALIDATION_RULES = "";
                            }
                            if (validateconfigData[x].VALIDATION_RULES == 'TIME_24HR') {
                                validateconfigData[x].VALIDATION_RULES = "numeric_colon";
                            }
                            if (validateconfigData[x].VALIDATION_RULES == 'NUMERIC') {
                                validateconfigData[x].VALIDATION_RULES = "numeric_decimals";
                            }
                            if (validateconfigData[x].VALIDATION_RULES == 'EMAIL') {
                                validateconfigData[x].VALIDATION_RULES = "email";
                            }
                            if (validateconfigData[x].PARAMETER_VALUE == null || validateconfigData[x].PARAMETER_VALUE == '') {
                                validateconfigData[x].PARAMETER_VALUE == '';
                                if (validateconfigData[x].DEFAULT_VALUE != null && validateconfigData[x].DEFAULT_VALUE != '') {
                                    validateconfigData[x].PARAMETER_VALUE = validateconfigData[x].DEFAULT_VALUE;
                                }
                            }
                            //if (validateconfigData[x].NEW_VALIDATION_RULES != null && validateconfigData[x].NEW_VALIDATION_RULES != "") {
                            //    switch (validateconfigData[x].NEW_VALIDATION_RULES) {
                            //        case "alpha_numerics_nospace": {
                            //            validateconfigData[x].TITLE = "Allow only alphabets and numbers";
                            //            break
                            //        }
                            //        case "email": {
                            //            validateconfigData[x].TITLE = "Should follow Email pattern";
                            //            break
                            //        }
                            //        case "alpha_numeric_dot_nospace": //"ALPHA_NUMERIC_DOT":
                            //            {
                            //                validateconfigData[x].TITLE = "This is only allow the alphabets and numbers and dot";
                            //                break
                            //            }
                            //        case "alpha_numeric_dot_backslash_underscore_hyphen_nospace"://" ALPHA_NUMERIC_DOT_BLASH_UNDERSCORE_HIPEN": 
                            //            {
                            //                validateconfigData[x].TITLE = "Use only letters (a-z), numbers (0-9), special characters (.,/,_,-) and not accept spaces";
                            //                break
                            //            }
                            //        case "alpha_numeric_dot_hyphen_nospace": {
                            //            validateconfigData[x].TITLE = "Use only letters (a-z), numbers (0-9), special characters (.,-) and not accept spaces";
                            //            break
                            //        }
                            //        case "alpha_numeric_dot_underscore_nospace": {
                            //            validateconfigData[x].TITLE = "Use only letters (a-z), numbers (0-9), special characters (.,_) and not accept spaces";
                            //            break
                            //        }
                            //        case "alpha_numeric_underscore_hyphen_nospace": {
                            //            validateconfigData[x].TITLE = "Use only letters (a-z), numbers (0-9), special characters (_,-) and not accept spaces";
                            //            break
                            //        }
                            //        case "alpha_numeric_dot_underscore_hyphen_nospace": {
                            //            validateconfigData[x].TITLE = "Use only letters (a-z), numbers (0-9), special characters (.,_,-) and not accept spaces";
                            //            break
                            //        }
                            //        case "numeric": {
                            //            validateconfigData[x].TITLE = "This Allows ony numbers";
                            //            break
                            //        }
                            //        case "numeric_colon": {
                            //            validateconfigData[x].TITLE = "This Allows ony numbers and colon(:)";
                            //            break
                            //        }
                            //        default: {
                            //            break
                            //        }
                            //    }
                            //} else {
                            //    validateconfigData[x].NEW_VALIDATION_RULES = "";
                            //}
                        }
                        if (validateconfigData[x].TYPE == "PASSWORD") {
                            key = CryptoJS.enc.Utf8.parse('8080808080808080');
                            iv = CryptoJS.enc.Utf8.parse('8080808080808080');
                            if (validateconfigData[x].PARAMETER_VALUE != '' && validateconfigData[x].PARAMETER_VALUE != null) {
                                rpstring = validateconfigData[x].PARAMETER_VALUE.toString();
                                decrypt = CryptoJS.AES.decrypt(rpstring, key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                                decryptdata = decrypt.toString(CryptoJS.enc.Utf8);
                                this.configData[x].PARAMETER_VALUE = decryptdata;
                                validateconfigData[x].PARAMETER_VALUE = decryptdata;
                            }
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "validationsForInputs");
                }
                return [2 /*return*/];
            });
        });
    };
    ConfigurationManagerComponent.prototype.fileChange = function (event) {
        var _this = this;
        try {
            this.spinnerService.start();
            var fileList = event.target.files;
            if (fileList.length > 0) {
                var file = fileList[0];
                var formData = new FormData();
                var listData = [];
                var obj = { FileName: file.name, File: file };
                listData.push(obj);
                formData.append('uploadFile', file, file.name);
                var headers = new http_1.Headers();
                headers.append('Authorization', 'bearer');
                headers.append('enctype', 'multipart/form-data');
                var options = new http_1.RequestOptions({ headers: headers });
                var apiUrl = this.httpService.BaseUrl + "/api/User/UploadCustomerLogo";
                this.http.post(apiUrl, formData, options)
                    .catch(function (error) { _this.spinnerService.stop(); return Rx_1.Observable.throw(error); })
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    _this.growlmsgs = [];
                    _this.spinnerService.stop();
                    if (res.Message == "Image Uploaded Successfully.") {
                        // this.blnFileUpload = false;
                        _this.growlmsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: res.Message });
                    }
                    else {
                        //this.blnFileUpload = true;
                        _this.growlmsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.Message });
                    }
                }, function (error) {
                    _this.spinnerService.stop();
                    console.log(error);
                });
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "fileChange");
        }
    };
    ConfigurationManagerComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.spinnerService.stop();
        this.growlmsgs = [];
        this.atParConstants.catchClientError(this.growlmsgs, this.spinnerService, strExMsg.toString, funName, this.constructor.name);
    };
    ConfigurationManagerComponent.prototype.ngOnDestroy = function () {
        this.configData = null;
        this.enterpriseSystemDetails = null;
        //ConfigurationManager variables
        this.TabName_Details = null;
        this.ERP_System_Details = null;
        this.ERP_Database = null;
        this.MainERP_Database = null;
        this.AtPar_Database = null;
        this.AtPar_System = null;
        this.Email = null;
        this.LDAP = null;
        this.SSO = null;
        this.LOG_CONFIG = null;
        this.HL7 = null;
        this.reportsConfigTabData = null;
        this.reportsDBTabData = null;
        this.recallTabData = null;
        this.deferpsystemsvalues = null;
        this.deferpversionsvalues = null;
        this.deferpdownloadsvalues = null;
        this.deferpuploadsvalues = null;
        this.defarryOracleValues = null;
        this.defarrySqlServerValues = null;
        this.defarryDb2values = null;
        this.defarryInformixvalues = null;
        this.defarrayERPDatabases = null;
        this.defarrayAtparDatabases = null;
        this.defarrayAtparArchiveDatabases = null;
        this.defarrayEmailDatabases = null;
        this.growlmsgs = [];
        this.spinnerService.stop();
    };
    ConfigurationManagerComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-configuration-manager.component.html',
            providers: [atpar_configuration_manager_service_1.ConfigurationManagerService, HttpService_1.HttpService, customvalidation_1.CustomValidations, atpar_common_service_1.AtParCommonService, authentication_service_1.AuthenticationService]
        }),
        __metadata("design:paramtypes", [atpar_configuration_manager_service_1.ConfigurationManagerService,
            core_1.ElementRef,
            HttpService_1.HttpService,
            http_1.Http,
            leftbar_animation_service_1.LeftBarAnimationService,
            router_1.Router,
            router_1.ActivatedRoute,
            event_spinner_service_1.SpinnerService,
            customvalidation_1.CustomValidations,
            atpar_common_service_1.AtParCommonService,
            izendaintegrate_1.IzendaIntegrate,
            authentication_service_1.AuthenticationService,
            AtParConstants_1.AtParConstants])
    ], ConfigurationManagerComponent);
    return ConfigurationManagerComponent;
}());
exports.ConfigurationManagerComponent = ConfigurationManagerComponent;
//# sourceMappingURL=atpar-configuration-manager.component.js.map