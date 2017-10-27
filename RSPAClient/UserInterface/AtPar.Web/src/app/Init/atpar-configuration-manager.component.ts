/// <reference path="../components/tabcomponent/tab.ts" />
/// <reference path="../components/atpartext/validators.ts" />
import { Component, HostListener, ElementRef, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { MT_ATPAR_CONFIGURATION_SECTION_DTLS } from '../Entities/MT_ATPAR_CONFIGURATION_SECTION_DTLS';
import { MT_ATPAR_ENTERPRISE_SYSTEM_DETAILS } from '../Entities/MT_ATPAR_ENTERPRISE_SYSTEM_DETAILS';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { SelectItem } from '../components/common/api';
import { ConfigurationManagerService } from './atpar-configuration-manager.service';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { Http, Response, Jsonp, RequestOptions, Headers, } from '@angular/http';
import { Atpardiv } from '../components/atpardiv/atpardiv';
import { ConfigData } from '../shared/configdata';
import { TokenEntry_Enum, StatusType, EnumApps, YesNo_Enum } from '../Shared/AtParEnums'
import { ATPAR_VALIDATION_RULES } from '../entities/atpar_validation_rules';
import { CustomValidations } from '../common/validations/customvalidation';
import * as CryptoJS from 'crypto-js';
import { Message } from './../components/common/api';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { Observable } from 'rxjs/Rx';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { IzendaIntegrate } from '../_helpers/izendaintegrate';
import { regExpValidator } from '../components/atpartext/Validators';
import { AuthenticationService } from '../_services/authentication.service';
import { Tab } from '../components/tabcomponent/tab'
declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-configuration-manager.component.html',
    providers: [ConfigurationManagerService, HttpService, CustomValidations, AtParCommonService, AuthenticationService]

})

export class ConfigurationManagerComponent { 
    showStyle: boolean;
    configData: MT_ATPAR_CONFIGURATION_SECTION_DTLS[];
    enterpriseSystemDetails: MT_ATPAR_ENTERPRISE_SYSTEM_DETAILS[];
    //ConfigurationManager variables
    TabName_Details: Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>;
    ERP_System_Details: Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>;
    ERP_Database: Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>;
    MainERP_Database: Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>;
    AtPar_Database: Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>;
    AtPar_System: Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>;
    Email: Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>;
    LDAP: Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>;
    SSO: Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>;
    LOG_CONFIG: Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>;
    HL7: Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>;
    MainHL7: Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>;
    sslTabData: Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>;
    recallTabData: Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>;
    reportsConfigTabData: Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>;
    reportsDBTabData: Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>;
    logxml: string = "";
    dbCheck: string;
    ldabenable: boolean = false;
    //tab variables
    isbool: boolean = false;
    tb_ERP_System: boolean = true;
    tb_ERP_Database: boolean = false;
    tb_AtPar_Database: boolean = false;
    tab_AtPar_System: boolean = false;
    tab_Email: boolean = false;
    tab_LDAP: boolean = false;
    tab_SSO: boolean = false;
    tab_LOG_CONFIG: boolean = false;
    tab_HL7: boolean = false;
    strUserId: string;
    DFlag: boolean = true;
    ddlArray: string;
    ddlListDataValues: string[];
    obj: MT_ATPAR_CONFIGURATION_SECTION_DTLS = null;
    toggle: string;
    arrValidations: string[];
    deferpSystems: string = "Select ERP System";
    deferpVersions: string = "Select One";
    deferpTypes: string = " Type";
    defdownloads: string = "Select One";
    defUplods: string = "Select One";
    parval: string;
    pattername: string;
    enterpriseSystem: string;
    selectedDevice: string = "Select ERP System";
    arrOracle: string = "NONE,{Microsoft ODBC for Oracle},{Oracle ODBC Driver}";
    arrSqlServer: string = "NONE,{SQL Server}";
    arrDb2: string = "NONE,{IBMDADB2}";
    arrInformix: string = "NONE,{Informix 3.34 32 Bit}";
    validationMessage: string;
    strDbConnectionstring: string;
    deferpsystemsvalues: any[] = [];
    deferpversionsvalues: any[] = [];
    deferpdownloadsvalues: any[] = [];
    deferpuploadsvalues: any[] = [];
    defarryOracleValues: any[] = [];
    defarrySqlServerValues: any[] = [];
    defarryDb2values: any[] = [];
    defarryInformixvalues: any[] = [];
    defarrayERPDatabases: any[] = []
    defarrayAtparDatabases: any[] = []
    defarrayAtparArchiveDatabases: any[] = []
    defarrayEmailDatabases: any[] = []
    growlmsgs: Message[] = [];
    blnFileUpload: boolean = true;

    _deviceTokenEntry: any;
    txtTestErpDatabase: string;
    txtAtparDatabase: string;
    txtAtparReportsConfigDatabase: string;
    txtStarterAPIDatabase: string;
    txtAtparReportsDatabase: string;
    txtArchAtparDatabase: string;
    txtLogConfig: string;
    txtLDAPConnection: string;
    txtHSMConnection: string;
    defaultErpsystem: string;
    activeTab: string;
    isVisible: boolean = false;
    erpSYSTab: boolean = true;
    erpDBTab: boolean = false;
    atpardbTab: boolean = false;
    atparSYSTab: boolean = false;
    emailTab: boolean = false;
    logTab: boolean = false;
    ldapTab: boolean = false;
    ssoTab: boolean = false;
    tabs: any;
    regUser: boolean = false;

    constructor(
        private configMgrService: ConfigurationManagerService,
        private el: ElementRef,
        private httpService: HttpService,
        private http: Http,
        private leftBarAnimationsewrvice: LeftBarAnimationService,
        private router: Router,
        private route: ActivatedRoute,
        private spinnerService: SpinnerService,
        private validate: CustomValidations,
        private atparCommonService: AtParCommonService,
        private izItergrate: IzendaIntegrate,
        private authenticationservice: AuthenticationService,
        public atParConstants: AtParConstants,
    ) {

    }

    async ngOnInit() {
        try {
            this.spinnerService.start();
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.TabName_Details = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            this.ERP_System_Details = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            this.ERP_Database = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            this.MainERP_Database = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            this.AtPar_Database = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            this.AtPar_System = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            this.Email = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            this.LDAP = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            this.SSO = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            this.LOG_CONFIG = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            this.HL7 = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            this.MainHL7 = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            this.sslTabData = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            this.recallTabData = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            this.reportsConfigTabData = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            this.reportsDBTabData = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            await this.bindDynamicTable();

            this.spinnerService.stop();
            setTimeout(() => {
                let drpdownErpDetails = document.getElementById('txtERP_SYS_DETAILSENTERPRISESYSTEM');
                if (drpdownErpDetails != null) {
                    drpdownErpDetails.focus();
                }
            }, 1)
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getMargin");
        }
    }

    selectionChanged(cls: MT_ATPAR_CONFIGURATION_SECTION_DTLS) {
        try {
            if (cls.PARAMETER_ID == ConfigData.ERP_SYS_DETAILS[ConfigData.ERP_SYS_DETAILS.ENTERPRISESYSTEM].toString()) {
                this.TabName_Details = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                this.deferpVersions = "SELECT ONE";
                this.defdownloads = "SELECT ONE";
                this.defUplods = "SELECT ONE";
                this.ERP_System_Details.forEach(x => {
                    if (x.VALID_FOR_ERP != null) {
                        if (cls.PARAMETER_VALUE == null) {
                            cls.PARAMETER_VALUE = "";
                        }
                        var item = x.VALID_FOR_ERP.split(",");
                        let isadd: boolean = false;
                        for (let y = 0; y < item.length; y++) {
                            if (cls.PARAMETER_VALUE == 'GEAC') {
                                if (item[y].toUpperCase().trim() != "ALL") {
                                    if (!isadd) {
                                        if (item[y].toUpperCase().trim() == 'GEAC_AS400' ||
                                            item[y].toUpperCase().trim() == 'GEAC') {
                                            isadd = true;
                                            this.TabName_Details.push(x);
                                        }
                                    }
                                } else {
                                    this.TabName_Details.push(x);
                                }
                            }
                            if ((cls.PARAMETER_VALUE != 'GEAC') &&
                                (item[y].toUpperCase().trim() == cls.PARAMETER_VALUE.toUpperCase().trim() || item[y].toUpperCase().trim() == "ALL")) {

                                this.TabName_Details.push(x);
                            }
                        }
                    }

                });
                let ver = 0;
                this.deferpversionsvalues.length = 0;
                this.deferpdownloadsvalues.length = 0;
                this.deferpuploadsvalues.length = 0;
                this.deferpversionsvalues.push({ value: "SELECT ONE", label: "SELECT ONE" });
                this.deferpdownloadsvalues.push({ value: "SELECT ONE", label: "SELECT ONE" });
                this.deferpuploadsvalues.push({ value: "SELECT ONE", label: "SELECT ONE" });
                let erpVerSystemDetails = this.enterpriseSystemDetails.filter(x => x.ENTERPRISE_SYSTEM == cls.PARAMETER_VALUE && x.TYPE == 'Version')
                for (let x = 0; x < erpVerSystemDetails.length; x++) {
                    this.deferpversionsvalues.push({ value: erpVerSystemDetails[x].ENTERPRISE_VERSION, label: erpVerSystemDetails[x].ENTERPRISE_VERSION });
                }
                let erpVersionRow = this.TabName_Details.filter(x => x.PARAMETER_ID == ConfigData.ERP_SYS_DETAILS[ConfigData.ERP_SYS_DETAILS.ENTERPRISEVERSION].toString());
                if (erpVersionRow != null && erpVersionRow.length > 0) {
                    if (this.defaultErpsystem != cls.PARAMETER_VALUE) {
                        erpVersionRow[0].PARAMETER_VALUE = 'SELECT ONE';
                    }
                    erpVersionRow[0].DEFAULT_VALUE = this.deferpversionsvalues;
                }
                let erpduSystemDetails = this.enterpriseSystemDetails.filter(x => x.ENTERPRISE_SYSTEM == cls.PARAMETER_VALUE && x.TYPE == 'Upload_Download')
                for (let x = 0; x < erpduSystemDetails.length; x++) {
                    let downItem = erpduSystemDetails[x].DOWNLOAD_FROM;
                    let upLoadItem = erpduSystemDetails[x].UPLOAD_TO;
                    let downlistItem = this.deferpdownloadsvalues.filter(x => x.label == downItem);
                    if (downlistItem == null || downlistItem == undefined || downlistItem.length == 0) {
                        this.deferpdownloadsvalues.push({
                            value: erpduSystemDetails[x].DOWNLOAD_FROM,
                            label: erpduSystemDetails[x].DOWNLOAD_FROM
                        });
                    }
                }
                let downloadFromRow = this.TabName_Details.filter(x => x.PARAMETER_ID == 'DOWNLOADFROM');
                if (downloadFromRow != null && downloadFromRow.length > 0) {
                    if (this.defaultErpsystem != cls.PARAMETER_VALUE) {
                        downloadFromRow[0].PARAMETER_VALUE = 'SELECT ONE';
                    }
                    downloadFromRow[0].DEFAULT_VALUE = this.deferpdownloadsvalues;
                }
                let erpSys = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString()
                    && x.PARAMETER_ID == ConfigData.ERP_SYS_DETAILS[ConfigData.ERP_SYS_DETAILS.ENTERPRISESYSTEM].toString())[0].PARAMETER_VALUE;
                let downItem = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString()
                    && x.PARAMETER_ID == ConfigData.ERP_SYS_DETAILS[ConfigData.ERP_SYS_DETAILS.DOWNLOADFROM].toString())[0].PARAMETER_VALUE;
                let drUploadTo = this.enterpriseSystemDetails.filter(x => x.ENTERPRISE_SYSTEM == erpSys && x.TYPE == 'Upload_Download' && x.DOWNLOAD_FROM == downItem);
                this.deferpuploadsvalues.length = 0;
                this.deferpuploadsvalues.push({ value: "SELECT ONE", label: "SELECT ONE" });
                for (let x = 0; x < drUploadTo.length; x++) {
                    let upLoadItem = drUploadTo[x].DOWNLOAD_FROM;
                    let uplistItem = this.deferpuploadsvalues.filter(x => x.label == upLoadItem);
                    if (uplistItem == null || uplistItem == undefined || uplistItem.length == 0) {
                        this.deferpuploadsvalues.push({
                            value: drUploadTo[x].UPLOAD_TO,
                            label: drUploadTo[x].UPLOAD_TO
                        });
                    }
                }
                let upLoadToRow = this.TabName_Details.filter(x => x.PARAMETER_ID == 'UPLOADTO');
                if (upLoadToRow != null && upLoadToRow.length > 0) {
                    if (this.defaultErpsystem != cls.PARAMETER_VALUE) {
                        upLoadToRow[0].PARAMETER_VALUE = 'SELECT ONE';
                    }
                    if (downloadFromRow != null && downloadFromRow.length > 0 && downloadFromRow[0].PARAMETER_VALUE != 'SELECT ONE') {
                        upLoadToRow[0].DEFAULT_VALUE = this.deferpuploadsvalues;
                    } else {
                        let updropitems = new Array<SelectItem>();
                        updropitems.push({ value: "SELECT ONE", label: "SELECT ONE" });
                        upLoadToRow[0].DEFAULT_VALUE = updropitems;
                    }
                }
                if (cls.VALIDATION_RULES != '' && cls.VALIDATION_RULES != null) {
                    return this.validationRules(cls.PARAMETER_VALUE, cls)
                }
            }
            else if (cls.PARAMETER_ID == 'DATABASE') {
                let dbparamval = cls.PARAMETER_VALUE;
                this.ERP_Database = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                this.defarryOracleValues.length = 0;
                this.defarrySqlServerValues.length = 0;
                this.defarryDb2values.length = 0;
                this.defarryInformixvalues.length = 0;
                this.MainERP_Database.forEach(x => {
                    if (x.VALID_FOR_ERP != null) {
                        if (cls.PARAMETER_VALUE == null) {
                            cls.PARAMETER_VALUE = "";
                        }
                        var item = x.VALID_FOR_ERP.split(",");
                        for (let y = 0; y < item.length; y++) {
                            if (item[y].toUpperCase().trim() == cls.PARAMETER_VALUE.toUpperCase().trim() || item[y].toUpperCase().trim() == "ALL") {
                                this.ERP_Database.push(x);
                            }
                        }
                    }
                });
                let driverparamval = null;
                if (dbparamval != null && dbparamval != undefined) {
                    driverparamval = this.ERP_Database.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()
                        && x.PARAMETER_ID == 'DRIVER' && x.PARAMETER_VALUE == dbparamval);
                }
                if (dbparamval != null && dbparamval == "ORACLE") {
                    for (let x = 0; x < this.arrOracle.split(',').length; x++) {
                        this.defarryOracleValues.push({ value: this.arrOracle.split(',')[x].toString(), label: this.arrOracle.split(',')[x].toString() });
                    }
                    this.ERP_Database.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                        x.PARAMETER_ID == 'DRIVER')[0].DEFAULT_VALUE = this.defarryOracleValues;
                }
                else if (dbparamval != null && dbparamval == "SQLSERVER") {
                    for (let x = 0; x < this.arrSqlServer.split(',').length; x++) {
                        this.defarrySqlServerValues.push({ value: this.arrSqlServer.split(',')[x].toString(), label: this.arrSqlServer.split(',')[x].toString() });
                    }
                    this.ERP_Database.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                        x.PARAMETER_ID == 'DRIVER')[0].DEFAULT_VALUE = this.defarrySqlServerValues;
                }
                else if (dbparamval != null && dbparamval == "DB2") {
                    for (let x = 0; x < this.arrDb2.split(',').length; x++) {
                        this.defarryDb2values.push({ value: this.arrDb2.split(',')[x].toString(), label: this.arrDb2.split(',')[x].toString() });
                    }
                    this.ERP_Database.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                        x.PARAMETER_ID == 'DRIVER')[0].DEFAULT_VALUE = this.defarryDb2values;
                }
                else if (dbparamval != null && dbparamval == "INFORMIX") {
                    for (let x = 0; x < this.arrInformix.split(',').length; x++) {
                        this.defarryInformixvalues.push({ value: this.arrInformix.split(',')[x].toString(), label: this.arrInformix.split(',')[x].toString() });
                    }
                    this.ERP_Database.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                        x.PARAMETER_ID == 'DRIVER')[0].DEFAULT_VALUE = this.defarryInformixvalues;
                } else {
                    cls.PARAMETER_VALUE = "NONE";
                }

            } else if (cls.PARAMETER_ID == 'DOWNLOADFROM') {
                let erpSys = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString()
                    && x.PARAMETER_ID == ConfigData.ERP_SYS_DETAILS[ConfigData.ERP_SYS_DETAILS.ENTERPRISESYSTEM].toString())[0].PARAMETER_VALUE;
                let drUploadTo = this.enterpriseSystemDetails.filter(x => x.ENTERPRISE_SYSTEM.toUpperCase() == erpSys.toUpperCase() && x.TYPE == 'Upload_Download' && x.DOWNLOAD_FROM == cls.PARAMETER_VALUE);
                this.deferpuploadsvalues.length = 0;
                this.deferpuploadsvalues.push({ value: "SELECT ONE", label: "SELECT ONE" });
                for (let x = 0; x < drUploadTo.length; x++) {
                    this.deferpuploadsvalues.push({
                        value: drUploadTo[x].UPLOAD_TO,
                        label: drUploadTo[x].UPLOAD_TO
                    });
                }

                let upitems = this.TabName_Details.filter(x => x.PARAMETER_ID == "UPLOADTO");
                if (upitems != null && upitems.length > 0) {
                    if (this.defaultErpsystem != cls.PARAMETER_VALUE) {
                        upitems[0].PARAMETER_VALUE = 'SELECT ONE';
                    }
                    upitems[0].DEFAULT_VALUE = this.deferpuploadsvalues;
                }
            }
            else if (cls.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFORMATION_SYSTEM].toString()) {

                if (cls.PARAMETER_VALUE == 'HSM') {
                    this.ldabenable = true;
                } else {
                    this.ldabenable = false;
                }
                this.HL7 = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                this.MainHL7.forEach(x => {
                    if (x.VALID_FOR_ERP != null) {
                        if (cls.PARAMETER_VALUE == null) {
                            cls.PARAMETER_VALUE = "";
                        }
                        var item = x.VALID_FOR_ERP.split(",");
                        for (let y = 0; y < item.length; y++) {
                            if (item[y].toUpperCase().trim() == cls.PARAMETER_VALUE.toUpperCase().trim() || item[y].toUpperCase().trim() == "ALL") {
                                this.HL7.push(x);
                            }
                        }
                    }

                });
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectionChanged")
        }
    }

    validationRules(val, cls) {
        try {
            this.parval = val;
            this.arrValidations = cls.VALIDATION_RULES.split(',');
            if (this.arrValidations != null) {
                if (this.arrValidations.length > 0) {

                    for (let x = 0; x < this.arrValidations.length; x++) {
                        this.pattername = this.arrValidations[x];

                        if (this.pattername == 'NUMERIC') {
                            let NUMERIC_REGEXP = /^[0-9]*$/;
                            if (!NUMERIC_REGEXP.test(val)) {
                                cls.IsValidate = true;
                                cls.VALIDATIONMessage = "Enter Only Numerics";
                                return false;
                            }
                            else {
                                cls.IsValidate = false;
                                cls.VALIDATIONMessage = "";
                            }
                        } else if (this.pattername == 'EMAIL') {
                            let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
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
    }

    async bindDynamicTable() {
        try {

            await this.configMgrService.getConfigDetails(this._deviceTokenEntry[TokenEntry_Enum.SystemId])
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_CONFIGURATION_SECTION_DTLS>
                    this.configData = data.DataDictionary["configSectionList"];
                    this.enterpriseSystemDetails = data.DataDictionary["enterpriseList"];
                    this.validationsForInputs(this.configData);
                    var configerpSystemDetails = this.configData.filter(x => x.TAB_ID == 'ERP_SYS_DETAILS' && x.DISPLAY_FLAG == "Y");
                    this.defaultErpsystem = this.configData.filter(x => x.TAB_ID == 'ERP_SYS_DETAILS' && x.DISPLAY_FLAG == "Y")[0].PARAMETER_VALUE;
                    var erpRemoteData = this.configData.filter(x => x.TAB_ID == 'REMOTEDBCONNECTION' && x.DISPLAY_FLAG == "Y");
                    this.AtPar_Database = this.configData.filter(x => x.TAB_ID == 'SYSTEMDBCONNECTION' && x.DISPLAY_FLAG == "Y");
                    this.AtPar_System = this.configData.filter(x => x.TAB_ID == 'ATPAR_SYSTEM' && x.DISPLAY_FLAG == "Y");
                    this.Email = this.configData.filter(x => x.TAB_ID == 'EMAILCONFIGARATION' && x.DISPLAY_FLAG == "Y");
                    this.LDAP = this.configData.filter(x => x.TAB_ID == 'LDAPCONFIG' && x.DISPLAY_FLAG == "Y");
                    this.SSO = this.configData.filter(x => x.TAB_ID == 'SSO' && x.DISPLAY_FLAG == "Y");
                    this.LOG_CONFIG = this.configData.filter(x => x.TAB_ID == 'LOG_CONFIG' && x.DISPLAY_FLAG == "Y");
                    var hl7 = this.configData.filter(x => x.TAB_ID == 'HL7' && x.DISPLAY_FLAG == "Y");
                    this.reportsConfigTabData = this.configData.filter(x => x.TAB_ID == 'REPORTSCONFIGDBCONNECTION' && x.DISPLAY_FLAG == "Y");
                    this.reportsDBTabData = this.configData.filter(x => x.TAB_ID == 'REPORTSDBCONNECTION' && x.DISPLAY_FLAG == "Y");
                    this.recallTabData = this.AtPar_System.filter(x => x.PARAMETER_ID == 'RECALL_MGMT_IMPLEMENTED' || x.PARAMETER_ID == 'PREPICK_QA_PROCESS_REQUIRED' || x.PARAMETER_ID == 'CUSTOMER_LOGO');
                    localStorage.setItem('SystemDB', JSON.stringify(this.configData));

                    let ssldata = this.AtPar_System.filter(x => x.PARAMETER_ID != "RECALL_MGMT_IMPLEMENTED" && x.PARAMETER_ID != "PREPICK_QA_PROCESS_REQUIRED" && x.PARAMETER_ID != 'CUSTOMER_LOGO');

                    this.sslTabData = ssldata;
                    this.getErpSystemDetails(configerpSystemDetails);
                    this.getERPRemoteDb(erpRemoteData)
                    this.getEmail();
                    this.getHL7Data(hl7);
                    this.getEntrpServiceConffile();
                    this.getSSLConfigData();
                    this.isVisible = true;
                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindDynamicTable");
        }
    }

    bindModelDataChange(option: any) {
        try {
            this.selectionChanged(option);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindModelDataChange");
        }
    }

    selectedTab(option: any) {
      
    }

    async enableSelectedTab(option: any) {
        if (option != null) {
            if (option.tab != null) {
                this.activeTab = option.tab.title;
                option.tab.active = true;
            }
            if (option.tabs._results != null) {
                option.tabs._results.forEach(tab => tab.active = false);
                let ctab = option.tabs._results.filter(x => x.title == option.tab.title);
                if (ctab != null)
                    ctab[0].active = true;
            }
            if (option.tabs != null && this.tabs == null) {
                this.tabs = option.tabs;
            }
        }
    }

    private async onSubmit() {
        try {
            this.growlmsgs = [];
            if (this._deviceTokenEntry[TokenEntry_Enum.UserID] != 'ADMIN') {
                this.authenticationservice.logout();
                setTimeout(await this.DoIzendalogin('ADMIN'), 30000);
                this.regUser = true;
            }
            if (this.TabName_Details != null) {
                for (let x = 0; x < this.TabName_Details.length; x++) {

                    if (this.TabName_Details[x].PARAMETER_VALUE != "" && this.TabName_Details[x].PARAMETER_VALUE != null &&
                        this.TabName_Details[x].VALIDATION_RULES != "" && this.TabName_Details[x].VALIDATION_RULES != null && this.TabName_Details[x].VALIDATION_RULES!='MANDATORY') {
                       // let rule = await this.getValidationRule(this.TabName_Details[x].VALIDATION_RULES);
                        let regxresult = regExpValidator(this.TabName_Details[x].VALIDATION_RULES, this.TabName_Details[x].PARAMETER_VALUE)
                        if (!regxresult) {
                            await this.showMessage(this.TabName_Details[x].VALIDATION_RULES);                            
                            let txtfield = document.getElementById(this.TabName_Details[x].TAB_ID + this.TabName_Details[x].PARAMETER_ID);
                            await this.enableSelectedTab({ tab: { title: "ERP System", active: true }, tabs: this.tabs });
                            setTimeout(() => {
                                if (txtfield != null) {
                                    txtfield.focus();
                                  
                                }
                            }, 1)
                            return;
                        }
                    }
                }
            }
            
            if (this.Email != null) {
                for (let x = 0; x < this.Email.length; x++) {

                    if (this.Email[x].PARAMETER_VALUE != "" && this.Email[x].PARAMETER_VALUE != null &&
                        this.Email[x].VALIDATION_RULES != "" && this.Email[x].VALIDATION_RULES != null && this.Email[x].VALIDATION_RULES != 'MANDATORY') {
                       // let rule = await this.getValidationRule(this.Email[x].VALIDATION_RULES);
                        let regxresult = regExpValidator(this.Email[x].VALIDATION_RULES, this.Email[x].PARAMETER_VALUE)
                        if (!regxresult) {                         
                           await this.enableSelectedTab({ tab: { title: "Email", active: true }, tabs: this.tabs });
                           await this.showMessage(this.Email[x].VALIDATION_RULES); 
                            let txtfield = document.getElementById(this.Email[x].TAB_ID + this.Email[x].PARAMETER_ID);
                            setTimeout(() => {
                                if (txtfield != null) {
                                    txtfield.focus();
                                }
                            }, 1)
                            return;
                        }
                    }
                }
            }
            
            for (let x = 0; x < this.HL7.length; x++) {

                if (this.HL7[x].PARAMETER_VALUE != "" && this.HL7[x].PARAMETER_VALUE != null &&
                    this.HL7[x].VALIDATION_RULES != "" && this.HL7[x].VALIDATION_RULES != null && this.HL7[x].VALIDATION_RULES != 'MANDATORY') {
                    //let rule = await this.getValidationRule(this.HL7[x].VALIDATION_RULES);
                    let regxresult = regExpValidator(this.HL7[x].VALIDATION_RULES, this.HL7[x].PARAMETER_VALUE)
                    if (!regxresult) {                         
                        await this.enableSelectedTab({ tab: { title: "HL7", active: true }, tabs: this.tabs });
                        await this.showMessage(this.HL7[x].VALIDATION_RULES); 
                        let txtfield = document.getElementById(this.HL7[x].TAB_ID + this.HL7[x].PARAMETER_ID);
                        setTimeout(() => {
                            if (txtfield != null) {
                                txtfield.focus();
                               
                            }
                        }, 1)
                        return;
                    }
                }
            }
            for (let x = 0; x < this.LDAP.length; x++) {

                if (this.LDAP[x].PARAMETER_VALUE != "" && this.LDAP[x].PARAMETER_VALUE != null &&
                    this.LDAP[x].VALIDATION_RULES != "" && this.LDAP[x].VALIDATION_RULES != null && this.LDAP[x].VALIDATION_RULES != 'MANDATORY') {
                    //let rule = await this.getValidationRule(this.LDAP[x].VALIDATION_RULES);
                    let regxresult = regExpValidator(this.LDAP[x].VALIDATION_RULES, this.LDAP[x].PARAMETER_VALUE)
                    if (!regxresult) {
                        await this.enableSelectedTab({ tab: { title: "LDAP", active: true }, tabs: this.tabs });
                        await this.showMessage(this.LDAP[x].VALIDATION_RULES);
                        let txtfield = document.getElementById(this.LDAP[x].TAB_ID + this.LDAP[x].PARAMETER_ID);
                        setTimeout(() => {
                            if (txtfield != null) {
                                txtfield.focus();
                            }
                        }, 1)
                        return;
                    }
                }
            }            
            this.growlmsgs = [];
            this.spinnerService.start();
            if (this.check_Validations()) {
                let erpdb = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()
                    && x.PARAMETER_ID == "DATABASE")[0].PARAMETER_VALUE;
                if (erpdb != "NONE") {

                    if (this.checkErpValidations()) {
                        let blnValidDB = false;
                        blnValidDB = await this.checkRemoteDBDetails()
                        if (!blnValidDB) {
                            this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Provide Valid ERP Database Details" });
                            this.spinnerService.stop();
                            return;
                        }
                    } else {
                        this.spinnerService.stop();
                        return;
                    }
                } else {

                }
                this.dbCheck = ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.SERVER].toString();
                let validAtparDb = await this.checkAtparDBDetails()
                if (!validAtparDb) {
                    this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Provide Valid Atpar Database Details" });
                    this.spinnerService.stop();
                    return;
                }
                this.dbCheck = '';
                let validReportConfigDb = await this.checkAtparReportsConfigDBDetails();
                if (!validReportConfigDb) {
                    this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Provide Valid Reports Config Database Details" });
                    this.spinnerService.stop();
                    return;
                }
                let validStarterApiDb = await this.checkStarterApiDBDetails();
                if (!validStarterApiDb) {
                    this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Provide Valid Starter API Database Details" });
                    this.spinnerService.stop();
                    return;
                }

                let strMenuCode: string;
                strMenuCode = localStorage.getItem("menuCode"); //'mt_atpar_configure_system_from_db.aspx';
                let strAutdit: string;
                let insertConfigData = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                for (let x = 0; x < this.configData.length; x++) {

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
                var listpwds = insertConfigData.filter(x => x.TYPE == "PASSWORD");

                for (let x = 0; x < listpwds.length; x++) {

                    var key = CryptoJS.enc.Utf8.parse('8080808080808080');
                    var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
                    if (listpwds[x].PARAMETER_VALUE != null && listpwds[x].PARAMETER_VALUE != '') {

                        let rpstring = listpwds[x].PARAMETER_VALUE.replace('+', ' ');
                        let passhash = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(rpstring), key,
                            { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                        listpwds[x].PARAMETER_VALUE = passhash.toString();
                    }

                }

                await this.getAuditAllowed(this._deviceTokenEntry[TokenEntry_Enum.UserID], EnumApps.Auth, strMenuCode, insertConfigData);

                await this.insertConfigurationDetails(this._deviceTokenEntry[TokenEntry_Enum.SystemId], this._deviceTokenEntry[TokenEntry_Enum.UserID], insertConfigData);
                this.atParConstants.scrollToTop();
                this.spinnerService.stop();
            } else {
                this.spinnerService.stop();
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "onSubmit");
        }
    }

    private async showMessage(validationType) {
        this.growlmsgs = [];
        if (validationType != null) {
            if (validationType.toUpperCase() == 'EMAIL') {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter Valid Email Address" });
            }
            else if (validationType.toUpperCase() == 'NUMERIC' || validationType == 'numeric_decimals') {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter Numeric Values" });
            }
            else if (validationType.toUpperCase() == ('numeric_colon').toUpperCase() || validationType.toUpperCase() == "TIME_24HR") {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter Valid TimeFormat" });
            }
        }

    }
    private async getValidationRule(validationType) {
        if (validationType.toUpperCase() == 'EMAIL') {
             return "email"
        }
        else if (validationType.toUpperCase() == 'NUMERIC') {
           return "numeric"
        }
        else if (validationType.toUpperCase() == ('numeric_colon').toUpperCase() || validationType.toUpperCase() == "TIME_24HR") {
            return "numeric_colon"
        }
        
    }
    async  insertConfigurationDetails(systemId: string, userId: string, lstConfigData: MT_ATPAR_CONFIGURATION_SECTION_DTLS[]) {
        try {



            let erpdb = lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()
                && x.PARAMETER_ID == "DATABASE")[0].PARAMETER_VALUE;
            if (erpdb == "NONE") {
                lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                    x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.USERID].toString())[0].PARAMETER_VALUE = "";
                lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                    x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.PASSWORD].toString())[0].PARAMETER_VALUE = "";
                lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                    x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.SERVER].toString())[0].PARAMETER_VALUE = "";
                lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                    x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.DATASOURCE].toString())[0].PARAMETER_VALUE = "";
                lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                    x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.DRIVER].toString())[0].PARAMETER_VALUE = "";
                lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                    x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.SCHEMA].toString())[0].PARAMETER_VALUE = "";

            }

            let caseInfoSystem: string;

            caseInfoSystem = lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFORMATION_SYSTEM].toString())[0].PARAMETER_VALUE;

            if (caseInfoSystem != "HSM") {
                lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                    x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DATABASE].toString())[0].PARAMETER_VALUE = "";

                lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                    x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DB_USERID].toString())[0].PARAMETER_VALUE = "";

                lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                    x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DB_SCHEMA].toString())[0].PARAMETER_VALUE = "";

                lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                    x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DB_PASSWORD].toString())[0].PARAMETER_VALUE = "";

                lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                    x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DB_SERVER].toString())[0].PARAMETER_VALUE = "";

                lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                    x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DB_DATASOURCE].toString())[0].PARAMETER_VALUE = "";
                lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                    x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DB_DRIVER].toString())[0].PARAMETER_VALUE = "";

            }

            await this.configMgrService.updateConfigDetails(systemId, userId, lstConfigData )
                .catch(this.httpService.handleError).then(async (res: Response) => {
                    let webresp = res.json() as AtParWebApiResponse<string>
                    this.growlmsgs = [];
                    this.bindDynamicTable();
                    switch (webresp.StatType) {
                        case StatusType.Success:
                            {
                                let checkconnection: boolean = false;
                                checkconnection = await this.BuildConnectionString(lstConfigData)
                                if (checkconnection)
                                {
                                    await this.BuildEmailSettings(lstConfigData);
                                }
                                if (this.growlmsgs.length <= 0) {
                                    this.growlmsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Configuration Details Updated Successfully" });
                                }
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.growlmsgs = [];
                                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.growlmsgs = [];
                                this.growlmsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                break;
                            }
                        default:
                            {
                                this.growlmsgs = [];
                                this.growlmsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                            }
                    }


                });

            if (this.regUser) {
                this.authenticationservice.logout();
                setTimeout(await this.DoIzendalogin(userId), 30000);
                this.regUser = false;
            }

            return false;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "insertConfigurationDetails");
        }

    }

    private async BuildConnectionString(lstConfigData: MT_ATPAR_CONFIGURATION_SECTION_DTLS[]): Promise<boolean> {
        let result: boolean = false;
        try {
            let dataSource: string;
            let userId: string;
            let server: string;
            let pwd: string;
            let accessToken: string;
            let connstring: string;
            let preDataSource: string;
            let preUserId: string;
            let preServer: string;
            let prePwd: string;
            

            let preConfigData: MT_ATPAR_CONFIGURATION_SECTION_DTLS[];
            preConfigData = JSON.parse(localStorage.getItem('SystemDB'));

            var key = CryptoJS.enc.Utf8.parse('8080808080808080');
            var iv = CryptoJS.enc.Utf8.parse('8080808080808080');

            dataSource = lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.DATASOURCE].toString())[0].PARAMETER_VALUE;

            userId = lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.USERID].toString())[0].PARAMETER_VALUE;

            server = lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.SERVER].toString())[0].PARAMETER_VALUE;

            pwd = lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.LOCALDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.PASSWORD].toString())[0].PARAMETER_VALUE;


            preDataSource = preConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.DATASOURCE].toString())[0].PARAMETER_VALUE;

            preUserId = preConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.USERID].toString())[0].PARAMETER_VALUE;

            preServer = preConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.SERVER].toString())[0].PARAMETER_VALUE;

            prePwd = preConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.LOCALDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.PASSWORD].toString())[0].PARAMETER_VALUE;

            accessToken = localStorage.getItem("izendatoken");

            if (pwd != '' && pwd != null) {

                let rpstring = pwd.replace('+', ' ');
                let decrypt = CryptoJS.AES.decrypt(rpstring, key,
                    { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                let decryptdata = decrypt.toString(CryptoJS.enc.Utf8);
                pwd = decryptdata;
            }

            //if (pwd != prePwd || server != preServer || userId != preUserId || dataSource != preDataSource) {
            if (accessToken != null && accessToken != '') {
                connstring = "server =" + server + "; database = " + dataSource + "; User Id= " + userId + "; Password = " + pwd + ";";


                let body = JSON.stringify({
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
                                id: "DEDB8B12-9FE2-4C26-8FAE-D01EA38CFF82",
                                name: "GetReceivingDailyActivityReport",
                                type: "Stored Procedure",
                                selected: true,
                                physicalChange: 0,
                                approval: 0,
                                categoryId: "B5EE9911-FAAE-434F-ADD4-60A400F3B9A0"
                            }, {
                                id: "97AEA75E-9B4A-4987-9BBA-2C2496E497BB",
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
                let headers: Headers = new Headers({ "Content-Type": "application/json; charset=utf-8", 'access_token': accessToken.toString() });
                let options: RequestOptions = new RequestOptions({ headers: headers });

                await this.configMgrService.UpdateReportsConnection(body, options).catch(this.httpService.handleError).then(async (res: Response) => {
                    let webresp = res.json();

                    if (!webresp.success) {

                        this.growlmsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Report Connection Failed. " });
                        result = false;

                    }
                    else {
                        await this.configMgrService.UpdateQuerySource().catch(this.httpService.handleError).then((res: Response) => {
                            let resp = res.json() as AtParWebApiResponse<string>
                            // if (resp.StatType) {
                            switch (resp.StatType) {
                                case StatusType.Success:
                                    {
                                        result = true;
                                        break;
                                    }
                                case StatusType.Warn:
                                    {

                                        this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Reports Update Failed. " });
                                        result = false;
                                        break;
                                    }
                                case StatusType.Error:
                                    {
                                        this.growlmsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Reports Update Failed. " });
                                        result = false;
                                        break;
                                    }
                                default:
                                    {
                                        this.growlmsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                        result = false;
                                        break;
                                    }
                            }

                            // }
                        });

                    }

                });
            }
            else {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Check Reporting API Services." });
                result = false;
            }
            
        }

        //}
        catch (ex) {
            console.log(ex);
            this.clientErrorMsg(ex, "BuildConnectionString");
            return false;
        }
        return result;
    }

    private async BuildEmailSettings(lstConfigData: MT_ATPAR_CONFIGURATION_SECTION_DTLS[]) {
        try {
            let smtpAccountName: string;
            let smtpServer: string;
            let smtpPort: any;
            let smtpMailAddress: string;
            let smtpAuthenticate: string;
            let userName: string;
            let pwd: string;
            let sslEnable: string;
            let sendUsing: string;
            let server: string;
            let accessToken: string;
            var key = CryptoJS.enc.Utf8.parse('8080808080808080');
            var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
            let userId: string;
            userId = this._deviceTokenEntry[TokenEntry_Enum.UserID];
            
            let x = lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                x.PARAMETER_ID == ConfigData.EMAILCONFIGARATION[ConfigData.EMAILCONFIGARATION.SMTP_ACCOUNT_NAME].toString());
            smtpAccountName = lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                x.PARAMETER_ID == ConfigData.EMAILCONFIGARATION[ConfigData.EMAILCONFIGARATION.SMTP_ACCOUNT_NAME].toString())[0].PARAMETER_VALUE;

            smtpServer = lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                x.PARAMETER_ID == ConfigData.EMAILCONFIGARATION[ConfigData.EMAILCONFIGARATION.SMTP_SERVER].toString())[0].PARAMETER_VALUE;

            smtpPort = lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                x.PARAMETER_ID == ConfigData.EMAILCONFIGARATION[ConfigData.EMAILCONFIGARATION.SMTP_SERVER_PORT].toString())[0].PARAMETER_VALUE;

            smtpMailAddress = lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                x.PARAMETER_ID == ConfigData.EMAILCONFIGARATION[ConfigData.EMAILCONFIGARATION.SMTP_MAIL_ADDRESS].toString())[0].PARAMETER_VALUE;

            smtpAuthenticate = lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                x.PARAMETER_ID == ConfigData.EMAILCONFIGARATION[ConfigData.EMAILCONFIGARATION.SMTP_AUTHENTICATE].toString())[0].PARAMETER_VALUE;

            userName = lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                x.PARAMETER_ID == ConfigData.EMAILCONFIGARATION[ConfigData.EMAILCONFIGARATION.SMTP_USER_NAME].toString())[0].PARAMETER_VALUE;

            pwd = lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                x.PARAMETER_ID == ConfigData.EMAILCONFIGARATION[ConfigData.EMAILCONFIGARATION.SMTP_PASSWORD].toString())[0].PARAMETER_VALUE;

            sslEnable = lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                x.PARAMETER_ID == ConfigData.EMAILCONFIGARATION[ConfigData.EMAILCONFIGARATION.SMTP_USE_SSL].toString())[0].PARAMETER_VALUE;

            sendUsing = lstConfigData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.EMAILCONFIGARATION].toString() &&
                x.PARAMETER_ID == ConfigData.EMAILCONFIGARATION[ConfigData.EMAILCONFIGARATION.SMTP_SEND_USING].toString())[0].PARAMETER_VALUE;


            if (pwd != '' && pwd != null) {

                let rpstring = pwd.replace('+', ' ');
                let decrypt = CryptoJS.AES.decrypt(rpstring, key,
                    { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                let decryptdata = decrypt.toString(CryptoJS.enc.Utf8);
                pwd = decryptdata;
            }
            accessToken = localStorage.getItem("izendatoken");
            if (accessToken != null && accessToken != ''){

                if (smtpServer != '' && smtpPort != '' && smtpMailAddress != '' && userName != '' && pwd != '' && pwd != null) {

                    let body = JSON.stringify({
                        isDirty: true, id: "00000000-0000-0000-0000-000000000000", tenantId: "3E4B90D8-63B9-48A6-BDD0-C3AF81AC04D5",
                        server: smtpServer, port: smtpPort, secureConnection: true, login: userName, password: pwd, displayName: "AtPar",
                        emailFromAddress: smtpMailAddress, useSystemConfiguration: false, version: "1", created: "", createdBy: "System Admin", modified: "", modifiedBy: "System Admin"
                    });

                    //   let headers: Headers = new Headers({ "Content-Type": "application/json; charset=utf-8", 'access_token': '4sl1Fd78wsfHajxJN+9S+ewGi9L2ZnD + aLRkvMGJRURvPoeXiAppU6qv3IZ658zlz8KDR2aSCX7HppEvUbp5YA ==', 'selected_tenant': '3E4B90D8-63B9-48A6-BDD0-C3AF81AC04D5' });
                    let headers: Headers = new Headers({ "Content-Type": "application/json; charset=utf-8", 'access_token': accessToken.toString(), 'selected_tenant': '3E4B90D8-63B9-48A6-BDD0-C3AF81AC04D5' });
                    let options: RequestOptions = new RequestOptions({ headers: headers });


                    await this.configMgrService.UpdateEmailSettings(body, options).catch(this.httpService.handleError).then((res: Response) => {
                        let webresp = res.json();

                        if (!webresp.success) {

                            this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Error, detail: "Email Update Failed. " });
                            return false;
                        }

                    });

                }
            }
            else {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Check Reporting API Services." });
                return false;
            }
            
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BuildEmailSettings");
        }
        
    }

    private async DoIzendalogin(userId: string) {
        try {
            this.izItergrate.DoIzendaConfig();
            var tenant, username1, password1;
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
            var iztoken = this.authenticationservice.login(tenant, username1, password1)
                .subscribe(result => {
                    if (result === true) {
                        console.log('reports login successful');
                    } else {
                        console.log('reports login failed');
                    }
                },
                error => {
                    console.log(error);
                });

        }
        catch (ex) {
            console.log('reports login failed');
            this.clientErrorMsg(ex, "DoIzendalogin");
        }
    }

    private async checkRemoteDBDetails(blnValidDb = false): Promise<boolean> {
        try {
            let database: string;
            let userId: string;
            let pwd: string;
            let server: string;
            let dbSource: string;
            let driver: string;
            database = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.DATABASE].toString())[0].PARAMETER_VALUE;
            userId = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.USERID].toString())[0].PARAMETER_VALUE;
            pwd = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.PASSWORD].toString())[0].PARAMETER_VALUE;
            server = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.SERVER].toString())[0].PARAMETER_VALUE;
            dbSource = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.DATASOURCE].toString())[0].PARAMETER_VALUE;
            driver = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.DRIVER].toString())[0].PARAMETER_VALUE;
            let blnValidDb = false;
            return await this.checkDBConnection(database, userId, pwd, server, dbSource,
                ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString(),
                driver, blnValidDb
            );
            //  return blnValidDb;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkRemoteDBDetails");

        }
    }

    private async testLDAPConnection() {
        try {
            this.growlmsgs = [];
            let strProtocol: string;
            let strAuthType: string;
            let nAuthType: number;
            let strSearchScope: string;
            let strpwd: string;
            let server: string;
            let searchFilter: string;
            let userId: string;
            let firstname: string;
            let lastName: string;
            server = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.SERVERNAME].toString())[0].PARAMETER_VALUE;
            searchFilter = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.SEARCHFILTER].toString())[0].PARAMETER_VALUE;
            userId = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.USERID].toString())[0].PARAMETER_VALUE;
            firstname = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.FIRSTNAME].toString())[0].PARAMETER_VALUE;
            lastName = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.LASTNAME].toString())[0].PARAMETER_VALUE;

            if (server == null || server == "" ||
                searchFilter == null || searchFilter == "" ||
                userId == null || userId == "" ||
                firstname == null || firstname == "" ||
                lastName == null || lastName == null) {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "LDAP Configuration : Server Name, Search Filter, First Name,Last Name fields are mandatory for test connection" });
                return;
            }
            strProtocol = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.PROTOCOL].toString())[0].PARAMETER_VALUE;
            strAuthType = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.AUTHTYPE].toString())[0].PARAMETER_VALUE;
            if (strProtocol.toUpperCase() == "LDAP" || strProtocol.toUpperCase() == "LDAPS") {

                strProtocol = "LDAP";
            }

            let strserverName = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.SERVERNAME].toString())[0].PARAMETER_VALUE;
            switch (strAuthType.toUpperCase()) {
                case "NONE":
                    nAuthType = ConfigData.AuthenticationTypes.None;
                    break;
                case "ANONYMOUS":
                    nAuthType = ConfigData.AuthenticationTypes.Anonymous;
                    break;
                case "SECURE":
                    nAuthType = ConfigData.AuthenticationTypes.Secure;
                    break;
                case "SECURESOCKETSLAYER":
                    nAuthType = ConfigData.AuthenticationTypes.SecureSocketsLayer;
                    break;
                default:
                    nAuthType = ConfigData.AuthenticationTypes.Anonymous;
                    break;
            }
            let nSearchScope: number;
            strSearchScope = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.SEARCHSCOPE].toString())[0].PARAMETER_VALUE;
            switch (strSearchScope.toUpperCase()) {
                case "BASE":
                    nSearchScope = ConfigData.SearchScope.Base;
                    break;
                case "ONELEVEL":
                    nSearchScope = ConfigData.SearchScope.OneLevel;
                    break;
                case "SUBTREE":
                    nSearchScope = ConfigData.SearchScope.Subtree;
                    break;
                default:
                    nSearchScope = ConfigData.SearchScope.Base;
                    break;
            }
            let strBaseDn = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.BASEDN].toString())[0].PARAMETER_VALUE;

            let strSearchFilter = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.SEARCHFILTER].toString())[0].PARAMETER_VALUE;

            let struser = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.USERNAME].toString())[0].PARAMETER_VALUE;

            let pwd = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.PASSWORD].toString())[0].PARAMETER_VALUE;

            let entrylmit = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.ENTRYLIMIT].toString())[0].PARAMETER_VALUE;

            let strLDAPProperty_cn = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.USERID].toString())[0].PARAMETER_VALUE;

            let strLDAPProperty_givenName = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.FIRSTNAME].toString())[0].PARAMETER_VALUE;
            let strLDAPProperty_sn = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.LASTNAME].toString())[0].PARAMETER_VALUE;

            let strLDAPProperty_Initials = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.MIDDLEINITIAL].toString())[0].PARAMETER_VALUE;

            let strLDAPProperty_mail = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.EMAILID].toString())[0].PARAMETER_VALUE;

            let strLDAPProperty_telephoneNumber = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.PHONE].toString())[0].PARAMETER_VALUE;

            let strLDAPProperty_fax = this.LDAP.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LDAPCONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LDAPCONFIG[ConfigData.LDAPCONFIG.FAX].toString())[0].PARAMETER_VALUE;
            let resultFields: any[] = [];
            if (strLDAPProperty_cn != null && strLDAPProperty_cn != '') {
                resultFields.push(strLDAPProperty_cn)
            }
            if (strLDAPProperty_givenName != null && strLDAPProperty_givenName != '') {
                resultFields.push(strLDAPProperty_givenName)
            }
            if (strLDAPProperty_sn != null && strLDAPProperty_sn != '') {
                resultFields.push(strLDAPProperty_sn)
            }
            if (strLDAPProperty_Initials != null && strLDAPProperty_Initials != '') {
                resultFields.push(strLDAPProperty_Initials)
            }
            if (strLDAPProperty_mail != null && strLDAPProperty_mail != '') {
                resultFields.push(strLDAPProperty_mail)
            }
            if (strLDAPProperty_telephoneNumber != null && strLDAPProperty_telephoneNumber != '') {
                resultFields.push(strLDAPProperty_telephoneNumber)
            }
            if (strLDAPProperty_fax != null && strLDAPProperty_fax != '') {
                resultFields.push(strLDAPProperty_fax)
            }
            let strtestOutPut: string;
            strtestOutPut = "Please remember to save your changes before exiting out of this page\n";
            strtestOutPut = strtestOutPut + "Quering LDAP server...\n";
            let strLdapConnectString: string;
            let basevalue: string;
            if (strBaseDn.length > 0) {
                basevalue = "/"
            } else {
                basevalue = '';
            }
            strLdapConnectString = strProtocol + "://" + strserverName + basevalue + strBaseDn;
            strtestOutPut = strtestOutPut + strLdapConnectString + "?(" + strSearchFilter + ")\n";
            if (struser.length > 0) {
                strtestOutPut = strtestOutPut + "UserDN: " + struser + "\n";
            }
            strtestOutPut = strtestOutPut + "Authentication Type: " + strAuthType + " Search Scope: " + strSearchScope + "\n";
            strtestOutPut = strtestOutPut + " Looking for properties : ";
            for (let x = 0; x < resultFields.length; x++) {
                strtestOutPut = strtestOutPut + resultFields[x].toString() + " ";
            }
            strtestOutPut = strtestOutPut + "\n";
            this.spinnerService.getEvent(SpinnerSentEvent).publish(true);
            var key = CryptoJS.enc.Utf8.parse('8080808080808080');
            var iv = CryptoJS.enc.Utf8.parse('8080808080808080');

            pwd = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(pwd), key,
                { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

            // this.strDbConnectionstring = "Server=" + server + ";Database=" + dataSource + ";User ID=" + userId + ";Password=" + password + ";Trusted_Connection=False";

            await this.configMgrService.TestLDAPConnection(strLdapConnectString, struser, pwd.toString(), nAuthType, entrylmit, resultFields,
                strSearchFilter, nSearchScope, strserverName, strProtocol).
                catch(this.httpService.handleError).then((res: Response) => {
                    let webresp = res.json() as AtParWebApiResponse<string>
                    switch (webresp.StatType) {
                        case StatusType.Success:
                            {
                                strtestOutPut = strtestOutPut + webresp.DataVariable;
                                this.txtLDAPConnection = strtestOutPut;
                                break;
                            }
                        case StatusType.Warn:
                            {
                                strtestOutPut = strtestOutPut + webresp.ExceptionMessage;
                                this.txtLDAPConnection = strtestOutPut;
                                // this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                break;
                            }
                        case StatusType.Error:
                            {
                                strtestOutPut = strtestOutPut + webresp.ExceptionMessage;
                                this.txtLDAPConnection = strtestOutPut;
                                // this.growlmsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                break;
                            }
                    }
                })
        }
        catch (ex) {
            this.clientErrorMsg(ex, "testLDAPConnection");
        }

    }

    private async checkDBConnection(database: string, userId: string, password: any, server: string,
        dataSource: string, tabName: string, driver: string, blnvalidDatabase = false): Promise<boolean> {
        try {
            var key = CryptoJS.enc.Utf8.parse('8080808080808080');
            var iv = CryptoJS.enc.Utf8.parse('8080808080808080');

            password = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key,
                { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
            //password = password.toString().replace('+', ' ');
            if (database.toUpperCase() == ConfigData.DATABASE_TYPES[ConfigData.DATABASE_TYPES.SQLSERVER].toString() || database.toUpperCase() == "SQL SERVER") {
                // this.strDbConnectionstring = "Server=" + server + ";Database=" + dataSource + ";User ID=" + userId + ";Password=" + password + ";Trusted_Connection=False";

                await this.configMgrService.getSqlServerConnection(server, userId, password.toString(), dataSource).
                    catch(this.httpService.handleError).then((res: Response) => {
                        let webresp = res.json() as AtParWebApiResponse<string>
                        switch (webresp.StatType) {
                            case StatusType.Success:
                                {
                                    let statusMessage: string = "Connection Opened Successfully";
                                    blnvalidDatabase = true;
                                    if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()) {
                                        this.txtTestErpDatabase = statusMessage;
                                    }
                                    else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString()) {
                                        if (this.dbCheck == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.SERVER].toString()) {
                                            this.txtAtparDatabase = statusMessage;
                                        } else {
                                            this.txtArchAtparDatabase = statusMessage;
                                        }
                                        this.dbCheck = "";
                                    }
                                    else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString()) {
                                        if (this.dbCheck == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.SERVER].toString()) {
                                            this.txtAtparReportsConfigDatabase = statusMessage;
                                        } else {
                                            this.txtStarterAPIDatabase = statusMessage;
                                        }
                                        this.dbCheck = "";
                                    }
                                    else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString()) {
                                        if (this.dbCheck == ConfigData.REPORTSDBCONNECTION[ConfigData.REPORTSDBCONNECTION.SERVER].toString()) {
                                            this.txtAtparReportsDatabase = statusMessage;
                                        }
                                        this.dbCheck = "";

                                    }
                                    else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString()) {
                                        this.txtHSMConnection = statusMessage;
                                    }
                                    break;
                                }
                            case StatusType.Warn:
                                {
                                    let statusMessage = webresp.ExceptionMessage;
                                    blnvalidDatabase = false;
                                    if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()) {
                                        this.txtTestErpDatabase = statusMessage;
                                    } else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString()) {
                                        if (this.dbCheck == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.SERVER].toString()) {
                                            this.txtAtparDatabase = statusMessage;
                                        } else {
                                            this.txtArchAtparDatabase = statusMessage;
                                        }
                                        this.dbCheck = "";
                                    }
                                    else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString()) {
                                        if (this.dbCheck == ConfigData.REPORTSDBCONNECTION[ConfigData.REPORTSDBCONNECTION.SERVER].toString()) {
                                            this.txtAtparReportsDatabase = statusMessage;
                                        }
                                        this.dbCheck = "";
                                    }
                                    else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString()) {
                                        if (this.dbCheck == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.SERVER].toString()) {
                                            this.txtAtparReportsConfigDatabase = statusMessage;
                                        }
                                        this.dbCheck = "";
                                    }
                                    else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString()) {
                                        this.txtHSMConnection = statusMessage;
                                    }
                                    break;
                                }
                            case StatusType.Error:
                                {
                                    let statusMessage = webresp.ExceptionMessage;
                                    if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()) {
                                        this.txtTestErpDatabase = statusMessage;
                                    } else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString()) {
                                        if (this.dbCheck == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.SERVER].toString()) {
                                            this.txtAtparDatabase = statusMessage;
                                        } else {
                                            this.txtArchAtparDatabase = statusMessage;
                                        }
                                        this.dbCheck = "";

                                    }
                                    else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString()) {
                                        if (this.dbCheck == ConfigData.REPORTSDBCONNECTION[ConfigData.REPORTSDBCONNECTION.SERVER].toString()) {
                                            this.txtAtparReportsDatabase = statusMessage;
                                        }
                                        this.dbCheck = "";

                                    }
                                    else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString()) {
                                        if (this.dbCheck == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.SERVER].toString()) {
                                            this.txtAtparReportsConfigDatabase = statusMessage;
                                        } else {
                                            this.txtStarterAPIDatabase = statusMessage;
                                        }
                                        this.dbCheck = "";

                                    }
                                    else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString()) {
                                        this.txtHSMConnection = statusMessage;
                                    }
                                    blnvalidDatabase = false;
                                    break;
                                }
                            default: {
                                let statusMessage = webresp.ExceptionMessage;
                                if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()) {
                                    this.txtTestErpDatabase = statusMessage;
                                } else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString()) {
                                    if (this.dbCheck == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.SERVER].toString()) {
                                        this.txtAtparDatabase = statusMessage;
                                    } else {
                                        this.txtArchAtparDatabase = statusMessage;
                                    }
                                    this.dbCheck = "";

                                }
                                else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString()) {
                                    if (this.dbCheck == ConfigData.REPORTSDBCONNECTION[ConfigData.REPORTSDBCONNECTION.SERVER].toString()) {
                                        this.txtAtparReportsDatabase = statusMessage;
                                    }
                                    this.dbCheck = "";

                                }
                                else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString()) {
                                    if (this.dbCheck == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.SERVER].toString()) {
                                        this.txtAtparReportsConfigDatabase = statusMessage;
                                    } else {
                                        this.txtStarterAPIDatabase = statusMessage;
                                    }
                                    this.dbCheck = "";

                                }
                                else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString()) {
                                    this.txtHSMConnection = statusMessage;
                                }
                                blnvalidDatabase = false;
                                break;
                            }
                        }

                    });

            }
            else if (database.toUpperCase() == ConfigData.DATABASE_TYPES[ConfigData.DATABASE_TYPES.ORACLE].toString()) {
                await this.configMgrService.getOracleConnection(server, userId, password.toString()).
                    catch(this.httpService.handleError).then((res: Response) => {
                        let webresp = res.json() as AtParWebApiResponse<string>
                        switch (webresp.StatType) {
                            case StatusType.Success:
                                {
                                    let statusMessage: string = "Connection Opened Successfully";
                                    blnvalidDatabase = true;
                                    if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()) {
                                        this.txtTestErpDatabase = statusMessage;
                                    } else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString()) {
                                        if (this.dbCheck == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.SERVER].toString()) {
                                            this.txtAtparDatabase = statusMessage;
                                        } else {
                                            this.txtArchAtparDatabase = statusMessage;
                                        }
                                        this.dbCheck = "";

                                    } else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString()) {
                                        this.txtHSMConnection = statusMessage;
                                    }

                                    break;
                                }
                            case StatusType.Warn:
                                {
                                    let statusMessage: string = webresp.ExceptionMessage;

                                    if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()) {
                                        this.txtTestErpDatabase = statusMessage;
                                    } else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString()) {
                                        if (this.dbCheck == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.SERVER].toString()) {
                                            this.txtAtparDatabase = statusMessage;
                                        } else {
                                            this.txtArchAtparDatabase = statusMessage;
                                        }
                                        this.dbCheck = "";

                                    } else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString()) {
                                        this.txtHSMConnection = statusMessage;
                                    }
                                    blnvalidDatabase = false;
                                    break;
                                }
                            case StatusType.Error:
                                {
                                    let statusMessage: string = webresp.ExceptionMessage;

                                    if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()) {
                                        this.txtTestErpDatabase = statusMessage;
                                    } else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString()) {
                                        if (this.dbCheck == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.SERVER].toString()) {
                                            this.txtAtparDatabase = statusMessage;
                                        } else {
                                            this.txtArchAtparDatabase = statusMessage;
                                        }
                                        this.dbCheck = "";

                                    } else if (tabName == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString()) {
                                        this.txtHSMConnection = statusMessage;
                                    }
                                    blnvalidDatabase = false;
                                    break;
                                }
                        }
                    });
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkDBConnection");
        }
        return blnvalidDatabase;
    }

    private async checkAtparDBDetails() {
        try {
            let dataSource: string;
            let userId: string;
            let server: string;
            let pwd: string;
            let mtDriver: string;
            dataSource = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.DATASOURCE].toString())[0].PARAMETER_VALUE;

            userId = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.USERID].toString())[0].PARAMETER_VALUE;

            server = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.SERVER].toString())[0].PARAMETER_VALUE;

            if (dataSource == null || dataSource == "" ||
                userId == null || userId == "" ||
                server == null || server == "") {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Atpar DataBase Details : Data Source, UserID, Server fields are mandatory" });
                this.spinnerService.stop();
                return false;
            }


            pwd = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.LOCALDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.PASSWORD].toString())[0].PARAMETER_VALUE;
            mtDriver = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.DRIVER].toString())[0].PARAMETER_VALUE;
            let blnValidDb = false;
            return await this.checkDBConnection(ConfigData.DATABASE_TYPES[ConfigData.DATABASE_TYPES.SQLSERVER].toString(),
                userId,
                pwd,
                server,
                dataSource,
                ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString(), mtDriver, blnValidDb
            );
            //  return blnValidDb;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAtparDBDetails");
        }
    }

    private async checkAtparReportsDBDetails() {
        try {
            let dataSource: string;
            let userId: string;
            let server: string;
            let pwd: string;
            let mtDriver: string;
            dataSource = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSDBCONNECTION[ConfigData.REPORTSDBCONNECTION.DATASOURCE].toString())[0].PARAMETER_VALUE;

            userId = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSDBCONNECTION[ConfigData.REPORTSDBCONNECTION.USERID].toString())[0].PARAMETER_VALUE;

            server = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSDBCONNECTION[ConfigData.REPORTSDBCONNECTION.SERVER].toString())[0].PARAMETER_VALUE;

            if (dataSource == null || dataSource == "" ||
                userId == null || userId == "" ||
                server == null || server == "") {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Reports DataBase Details : Data Source, UserID, Server fields are mandatory" });
                this.spinnerService.stop();
                return false;
            }


            pwd = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSDBCONNECTION[ConfigData.REPORTSDBCONNECTION.PASSWORD].toString())[0].PARAMETER_VALUE;
            mtDriver = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSDBCONNECTION[ConfigData.REPORTSDBCONNECTION.DRIVER].toString())[0].PARAMETER_VALUE;
            let blnValidDb = false;
            return await this.checkDBConnection(ConfigData.DATABASE_TYPES[ConfigData.DATABASE_TYPES.SQLSERVER].toString(),
                userId,
                pwd,
                server,
                dataSource,
                ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSDBCONNECTION].toString(), mtDriver, blnValidDb
            );
            //  return blnValidDb;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAtparReportsDBDetails");
        }

    }

    private async checkAtparReportsConfigDBDetails() {
        try {
            let dataSource: string;
            let userId: string;
            let server: string;
            let pwd: string;
            let mtDriver: string;
            dataSource = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.DATASOURCE].toString())[0].PARAMETER_VALUE;

            userId = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.USERID].toString())[0].PARAMETER_VALUE;

            server = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.SERVER].toString())[0].PARAMETER_VALUE;

            if (dataSource == null || dataSource == "" ||
                userId == null || userId == "" ||
                server == null || server == "") {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Reports Config DataBase Details : Data Source, UserID, Server fields are mandatory" });
                this.spinnerService.stop();
                return false;
            }


            pwd = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.PASSWORD].toString())[0].PARAMETER_VALUE;
            mtDriver = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.DRIVER].toString())[0].PARAMETER_VALUE;
            let blnValidDb = false;
            return await this.checkDBConnection(ConfigData.DATABASE_TYPES[ConfigData.DATABASE_TYPES.SQLSERVER].toString(),
                userId,
                pwd,
                server,
                dataSource,
                ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString(), mtDriver, blnValidDb
            );
            //  return blnValidDb;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAtparReportsConfigDBDetails");
        }
    }

    private getDataBaseConnection(databasetype: string, dbConnectionString: string): string {
        try {

            if (databasetype == ConfigData.DATABASE_TYPES[ConfigData.DATABASE_TYPES.SQLSERVER].toString()) {

            }
            return "Connection Opened Successfully";
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getDataBaseConnection");
            return ex.toString();
        }
    }

    private async checkArchiveDBDetails(): Promise<boolean> {
        try {
            let arcDataSource: string;
            let archPwd: string;
            let archDriver: string;

            arcDataSource = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.ARCHIVE_DATASOURCE].toString())[0].PARAMETER_VALUE;
            let archUserId: string;
            archUserId = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.ARCHIVE_USERID].toString())[0].PARAMETER_VALUE
            let archServer: string;
            archServer = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.ARCHIVE_SERVER].toString())[0].PARAMETER_VALUE;
            archPwd = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString()
                && x.PARAMETER_ID == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.ARCHIVE_PASSWORD].toString())[0].PARAMETER_VALUE
            archDriver = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString()
                && x.PARAMETER_ID == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.ARCHIVE_DRIVER].toString())[0].PARAMETER_VALUE;
            if (arcDataSource == null || arcDataSource == "" ||
                archUserId == null || archUserId == "" ||
                archServer == null || archServer == "") {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Atpar Archive DataBase Details : Data Source, UserID, Server fields are mandatory" });
                this.spinnerService.stop();
                return false;

            }
            let blnValidDb = false;
            return await this.checkDBConnection(ConfigData.DATABASE_TYPES[ConfigData.DATABASE_TYPES.SQLSERVER].toString(),
                archUserId, archPwd, archServer, arcDataSource,
                ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString(), archDriver, blnValidDb
            );
            // return blnValidDb;
        }
        catch (ex) {
            this.clientErrorMsg(ex.toString(), "checkArchiveDBDetails");
            return ex.toString();
        }
    }

    private async checkStarterApiDBDetails(): Promise<boolean> {
        try {
            let starterDataSource: string;
            let starterPwd: string;
            let starterDriver: string;

            starterDataSource = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_DATASOURCE].toString())[0].PARAMETER_VALUE;
            let starterUserId: string;
            starterUserId = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_USERID].toString())[0].PARAMETER_VALUE
            let starterServer: string;
            starterServer = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_SERVER].toString())[0].PARAMETER_VALUE;
            starterPwd = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString()
                && x.PARAMETER_ID == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_PASSWORD].toString())[0].PARAMETER_VALUE
            starterDriver = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString()
                && x.PARAMETER_ID == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_DRIVER].toString())[0].PARAMETER_VALUE;
            if (starterDataSource == null || starterDataSource == "" ||
                starterUserId == null || starterUserId == "" ||
                starterServer == null || starterServer == "") {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Atpar Starter API DataBase Details : Data Source, UserID, Server fields are mandatory" });
                this.spinnerService.stop();
                return false;

            }
            let blnValidDb = false;
            return await this.checkDBConnection(ConfigData.DATABASE_TYPES[ConfigData.DATABASE_TYPES.SQLSERVER].toString(),
                starterUserId, starterPwd, starterServer, starterDataSource,
                ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString(), starterDriver, blnValidDb
            );
            // return blnValidDb;
        }
        catch (ex) {
            this.clientErrorMsg(ex.toString(), "checkStarterApiDBDetails");
            return ex.toString();
        }
    }

    private checkErpValidations(): boolean {
        try {

            let strErpdatabase: string;
            let strSchema: string;
            let userId: string;
            let pwd: string;
            let server: string;
            let dataSource: string;
            let netTrans: string;
            userId = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.USERID].toString())[0].PARAMETER_VALUE;
            strErpdatabase = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.DATABASE].toString())[0].PARAMETER_VALUE;
            strSchema = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.SCHEMA].toString())[0].PARAMETER_VALUE;

            pwd = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.PASSWORD].toString())[0].PARAMETER_VALUE;

            server = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.SERVER].toString())[0].PARAMETER_VALUE;

            dataSource = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.DATASOURCE].toString())[0].PARAMETER_VALUE;
            netTrans = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.NETTRANS].toString())[0].PARAMETER_VALUE;

            if (strErpdatabase == null || strErpdatabase == '' || strErpdatabase == 'NONE') {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select ERP Database" });
                this.spinnerService.stop();
                return false;
            }
            else if (strErpdatabase == ConfigData.DATABASE_TYPES[ConfigData.DATABASE_TYPES.ORACLE].toString()) {
                if (strSchema == null || strSchema == '' ||
                    userId == null || userId == '' ||
                    pwd == null || pwd == '' ||
                    server == null || server == '') {
                    this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP Database Details : Schema, UserId, Password, Server & Driver are mandatory fields for Oracle database" });
                    this.spinnerService.stop();
                    return false;
                }

            }
            else if (this.configData.filter(x => x.TAB_ID == 'ERP_SYS_DETAILS' && x.PARAMETER_ID == "ENTERPRISESYSTEM")[0].PARAMETER_VALUE == "ORACLE") {
                if (strErpdatabase != "ORACLE") {
                    this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP Database should be ORACLE" });
                    this.spinnerService.stop();
                    return false;
                }
            }
            else if (strErpdatabase == ConfigData.DATABASE_TYPES[ConfigData.DATABASE_TYPES.DB2].toString()) {
                if (userId == null || userId == '' ||
                    pwd == null || pwd == '' ||
                    server == null || server == '' ||
                    dataSource == null || dataSource == '' ||
                    netTrans == null || netTrans == '') {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP Database Details : Schema, UserId, Password, Server, Driver, " +
                        "Datasource & Network Library are mandatory fields for DB2 database"
                    });
                    this.spinnerService.stop();
                    return false;
                }
            }
            else if (strErpdatabase == ConfigData.DATABASE_TYPES[ConfigData.DATABASE_TYPES.SQLSERVER].toString()) {
                if (strSchema == null || strSchema == '' ||
                    userId == null || userId == '' ||
                    pwd == null || pwd == '' ||
                    server == null || server == '' ||
                    dataSource == null || dataSource == '') {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP Database Details : Schema, UserId, Password, Server, Driver & Datasource are mandatory fields for Sql Server database"
                    });
                    this.spinnerService.stop();
                    return false;
                }
            }
            else if (strErpdatabase == ConfigData.DATABASE_TYPES[ConfigData.DATABASE_TYPES.INFORMIX].toString()) {
                let service: string;
                let host: string;
                let protocal: string;
                service = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                    x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.SERVICE].toString())[0].PARAMETER_VALUE
                host = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                    x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.HOST].toString())[0].PARAMETER_VALUE
                protocal = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                    x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.PROTOCOL].toString())[0].PARAMETER_VALUE;
                if (strSchema == null || strSchema == '' ||
                    userId == null || userId == '' ||
                    pwd == null || pwd == '' ||
                    server == null || server == '' ||
                    service == null || service == '' ||
                    host == null || host == '' ||
                    protocal == null || protocal == '') {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP Database Details : Schema, UserId, Password, Server,Driver, " +
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
    }

    private getErpSystemDetails(configData) {
        try {
            this.deferpsystemsvalues = [];
            let prvSystem: string = "";
            if (this.enterpriseSystemDetails != null && this.enterpriseSystemDetails.length > 0) {
                this.deferpsystemsvalues.push({ value: "Select ERP System", label: "Select ERP System" });
                for (let x = 0; x < this.enterpriseSystemDetails.length; x++) {
                    if (prvSystem != this.enterpriseSystemDetails[x].ENTERPRISE_SYSTEM) {
                        prvSystem = this.enterpriseSystemDetails[x].ENTERPRISE_SYSTEM;
                        this.deferpsystemsvalues.push({ value: prvSystem, label: prvSystem });
                    }
                }
                let paramIdName = ConfigData.ERP_SYS_DETAILS[ConfigData.ERP_SYS_DETAILS.ENTERPRISESYSTEM].toString();
                configData.filter(x => x.PARAMETER_ID == paramIdName)[0].DEFAULT_VALUE = this.deferpsystemsvalues;

                this.ERP_System_Details = configData;

                let tabId = ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString();
                this.selectionChanged(configData.filter(x => x.TAB_ID == tabId
                    && x.PARAMETER_ID == paramIdName)[0]);

            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getErpSystemDetails");
        }
    }

    private getERPRemoteDb(erpRemoteData) {
        try {
            this.MainERP_Database = erpRemoteData;
            this.selectionChanged(erpRemoteData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString()
                && x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.DATABASE].toString())[0]);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getERPRemoteDb");
        }

    }

    private async getEntrpServiceConffile() {
        try {

            await this.configMgrService.GetEntrpServiceConffile(this._deviceTokenEntry[TokenEntry_Enum.UserID], true).
                catch(this.httpService.handleError).then((res: Response) => {
                    let webresp = res.json() as AtParWebApiResponse<string>
                    //(webresp) => {

                    switch (webresp.StatType) {
                        case StatusType.Success:
                            {
                                // this.growlmsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: webresp.StatusMessage });
                                // this.validationMessage = webresp.StatusMessage;
                                this.logxml = webresp.DataVariable.toString();
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                //this.validationMessage = webresp.StatusMessage;
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.growlmsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                //this.validationMessage = webresp.StatusMessage;
                                break;
                            }
                    }


                });

        } catch (ex) {

            this.clientErrorMsg(ex, "getEntrpServiceConffile");
        }

    }

    private getSSLConfigData() {
        try {
            this.configMgrService.GetSSLConfigDetails().
                catch(this.httpService.handleError).map((res: Response) => res.json() as AtParWebApiResponse<SSL_CONFIG_DETAILS>).subscribe(
                (weresb) => {
                    switch (weresb.StatType) {
                        case StatusType.Success:
                            {
                                if (weresb.Data != null) {
                                    this.sslTabData.filter(x => x.PARAMETER_ID == "PROTOCOL")[0].PARAMETER_VALUE = weresb.Data.PROTOCOL;
                                    this.sslTabData.filter(x => x.PARAMETER_ID == "SERVERNAME")[0].PARAMETER_VALUE = weresb.Data.SERVER_NAME;
                                    this.sslTabData.filter(x => x.PARAMETER_ID == "PORTNO")[0].PARAMETER_VALUE = weresb.Data.PORT_NO;
                                }
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: weresb.StatusMessage });
                                //this.validationMessage = weresb.StatusMessage;
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.growlmsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: weresb.StatusMessage });
                                // this.validationMessage = weresb.StatusMessage;
                                break;
                            }
                    }

                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getSSLConfigData");
        }
    }

    private getEmail() {
        try {
            let smtpDefValues: any[] = [];
            let emailauth = this.Email.filter(x => x.PARAMETER_ID == 'SMTP_AUTHENTICATE');
            if (emailauth != null || emailauth != undefined) {
                for (let x = 0; x < emailauth[0].DEFAULT_VALUE.split(',').length; x++) {
                    smtpDefValues.push({ value: x, label: emailauth[0].DEFAULT_VALUE.split(',')[x].toString().trim() });
                }
                emailauth[0].DEFAULT_VALUE = smtpDefValues;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getEmail")
        }
    }

    private getHL7Data(hl7Data) {
        try {
            //this.ERP_Database = new Array<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            this.MainHL7 = hl7Data;
            this.selectionChanged(hl7Data.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFORMATION_SYSTEM].toString())[0]);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getHL7Data");
        }
    }

    private check_Validations(): boolean {
        try {
            // ErpSystem 
            let erpSys: string;
            erpSys = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString()
                && x.PARAMETER_ID == ConfigData.ERP_SYS_DETAILS[ConfigData.ERP_SYS_DETAILS.ENTERPRISESYSTEM].toString())[0].PARAMETER_VALUE;
            if (erpSys == "" || erpSys == null || erpSys == undefined || erpSys == "Select ERP System") {
                this.growlmsgs.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select ERP System"
                });
                return false;
            }
            if (erpSys != null || erpSys != "") {
                erpSys = erpSys.toUpperCase();
            } else {
                erpSys = "";
            }
            //version 
            let erpVers: string;
            erpVers = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                x.PARAMETER_ID == ConfigData.ERP_SYS_DETAILS[ConfigData.ERP_SYS_DETAILS.ENTERPRISEVERSION].toString())[0].PARAMETER_VALUE;
            if (erpVers == "" || erpVers == null || erpVers == undefined || erpVers == 'SELECT ONE') {
                this.growlmsgs.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select ERP Version"
                });

                return false;
            }

            //DownLoad 
            let downFrom: string;
            downFrom = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                x.PARAMETER_ID == ConfigData.ERP_SYS_DETAILS[ConfigData.ERP_SYS_DETAILS.DOWNLOADFROM].toString())[0].PARAMETER_VALUE;
            if (downFrom == "" || downFrom == null && downFrom == undefined || downFrom == 'SELECT ONE') {
                this.growlmsgs.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Download From"
                });

                return false;
            }
            //Upload
            let upload: string;
            upload = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                x.PARAMETER_ID == ConfigData.ERP_SYS_DETAILS[ConfigData.ERP_SYS_DETAILS.UPLOADTO].toString())[0].PARAMETER_VALUE;
            if (upload == "" || upload == null && upload == undefined || upload == 'SELECT ONE') {
                this.growlmsgs.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Upload To"
                });

                return false;
            }

            let erpUserId: string;
            let erpPwd: string;
            let erpServer: string;
            let erpProductLine: string;
            let erpSYSNR: string;
            erpUserId = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                x.PARAMETER_ID == ConfigData.ERP_SYS_DETAILS[ConfigData.ERP_SYS_DETAILS.ERPUSERID].toString())[0].PARAMETER_VALUE;
            erpPwd = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                x.PARAMETER_ID == ConfigData.ERP_SYS_DETAILS[ConfigData.ERP_SYS_DETAILS.ERPPASSWORD].toString())[0].PARAMETER_VALUE;
            erpServer = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                x.PARAMETER_ID == ConfigData.ERP_SYS_DETAILS[ConfigData.ERP_SYS_DETAILS.ERPSERVER].toString())[0].PARAMETER_VALUE;
            erpProductLine = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                x.PARAMETER_ID == ConfigData.ERP_SYS_DETAILS[ConfigData.ERP_SYS_DETAILS.PRODUCTLINE].toString())[0].PARAMETER_VALUE;
            erpSYSNR = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                x.PARAMETER_ID == ConfigData.ERP_SYS_DETAILS[ConfigData.ERP_SYS_DETAILS.SYSNR].toString())[0].PARAMETER_VALUE;

            if (erpSys == "LAWSON") {
                if (erpUserId == null || erpUserId == '' ||
                    erpPwd == null || erpPwd == '' ||
                    erpServer == null || erpServer == '' ||
                    erpProductLine == null || erpProductLine == '') {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP System Details : UserId, Password, Server Address & Product Line fields are mandatory for Lawson ERP"
                    });
                    return false;
                }
            }
            if (erpSys.toUpperCase() == "MEDITECH_MAGIC" ||
                erpSys.toUpperCase() == "MEDITECH_CS" ||
                erpSys.toUpperCase() == "MEDITECH_NUI" ||
                erpSys.toUpperCase() == "MATKON" ||
                erpSys.toUpperCase() == "GEAC_AS400") {
                let downFilePath = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                    x.PARAMETER_ID == ConfigData.ERP_SYS_DETAILS[ConfigData.ERP_SYS_DETAILS.DOWNLOADFILEPATH].toString())[0].PARAMETER_VALUE;
                let uploadFilePath = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.ERP_SYS_DETAILS].toString() &&
                    x.PARAMETER_ID == ConfigData.ERP_SYS_DETAILS[ConfigData.ERP_SYS_DETAILS.UPLOADFILEPATH].toString())[0].PARAMETER_VALUE;
                if (downFilePath == null || downFilePath == "" || uploadFilePath == "" || uploadFilePath == null) {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP System Details : Download File & Upload Directory fields are mandatory"
                    });
                    return false;
                }
            }
            if (erpSys == ConfigData.DATABASE_TYPES[ConfigData.DATABASE_TYPES.SAP].toString()) {
                if (erpUserId == null || erpUserId == '' ||
                    erpPwd == null || erpPwd == '' ||
                    erpSys == null || erpSys == '' ||
                    erpServer == null || erpServer == '' ||
                    erpSYSNR == null || erpSYSNR == '') {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP System Details : UserId, Password, Server Address, ClinetCode, SYSNR fields are mandatory for SAP ERP"
                    });
                    return false;
                }
            }
            let strErpdatabase: string;
            let strSchema: string;
            let userId: string;
            let pwd: string;
            let server: string;
            let dataSource: string;
            let netTrans: string;
            userId = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.USERID].toString())[0].PARAMETER_VALUE;
            strErpdatabase = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.DATABASE].toString())[0].PARAMETER_VALUE;
            strSchema = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.SCHEMA].toString())[0].PARAMETER_VALUE;

            pwd = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.PASSWORD].toString())[0].PARAMETER_VALUE;

            server = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.SERVER].toString())[0].PARAMETER_VALUE;

            dataSource = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.DATASOURCE].toString())[0].PARAMETER_VALUE;
            netTrans = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.NETTRANS].toString())[0].PARAMETER_VALUE;


            if (strErpdatabase == ConfigData.DATABASE_TYPES[ConfigData.DATABASE_TYPES.ORACLE].toString()) {
                if (strSchema == null || strSchema == '' ||
                    userId == null || userId == '' ||
                    pwd == null || pwd == '' ||
                    server == null || server == '') {
                    this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP Database Details : Schema, UserId, Password, Server & Driver are mandatory fields for Oracle database" });
                    return false;
                }

            }
            else if (erpSys == "ORACLE") {
                if (strErpdatabase != "ORACLE") {
                    this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP Database should be ORACLE" });
                    return false;
                }
            }
            else if (strErpdatabase == ConfigData.DATABASE_TYPES[ConfigData.DATABASE_TYPES.DB2].toString()) {
                if (userId == null || userId == '' ||
                    pwd == null || pwd == '' ||
                    server == null || server == '' ||
                    dataSource == null || dataSource == '' ||
                    netTrans == null || netTrans == '') {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP Database Details : Schema, UserId, Password, Server, Driver, " +
                        "Datasource & Network Library are mandatory fields for DB2 database"
                    });

                    return false;
                }
            }
            else if (strErpdatabase == ConfigData.DATABASE_TYPES[ConfigData.DATABASE_TYPES.SQLSERVER].toString()) {
                if (strSchema == null || strSchema == '' ||
                    userId == null || userId == '' ||
                    pwd == null || pwd == '' ||
                    server == null || server == '' ||
                    dataSource == null || dataSource == '') {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP Database Details : Schema, UserId, Password, Server, Driver & Datasource are mandatory fields for Sql Server database"
                    });
                    return false;
                }
            }
            else if (strErpdatabase == ConfigData.DATABASE_TYPES[ConfigData.DATABASE_TYPES.INFORMIX].toString()) {
                let service: string;
                let host: string;
                let protocal: string;
                service = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                    x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.SERVICE].toString())[0].PARAMETER_VALUE
                host = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                    x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.HOST].toString())[0].PARAMETER_VALUE
                protocal = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REMOTEDBCONNECTION].toString() &&
                    x.PARAMETER_ID == ConfigData.REMOTEDBCONNECTION[ConfigData.REMOTEDBCONNECTION.PROTOCOL].toString())[0].PARAMETER_VALUE;
                if (strSchema == null || strSchema == '' ||
                    userId == null || userId == '' ||
                    pwd == null || pwd == '' ||
                    server == null || server == '' ||
                    service == null || service == '' ||
                    host == null || host == '' ||
                    protocal == null || protocal == '') {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP Database Details : Schema, UserId, Password, Server,Driver, " +
                        "Service Name, Host Name & Protocol are mandatory fields for Informix database"
                    });
                    return false;
                }
            }
            let caseInfoSystem: string;
            let caseInfoDb: string;

            caseInfoSystem = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFORMATION_SYSTEM].toString())[0].PARAMETER_VALUE;

            caseInfoDb = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DATABASE].toString())[0].PARAMETER_VALUE;

            if (caseInfoSystem == "HSM") {
                if (caseInfoDb == "NONE") {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Case Information System Database"
                    });
                    return false;
                }
            }
            let caseInfoSchema: string;
            let caseInfoDbUserId: string;
            let caseInfoDbPwd: string;
            let caseInfoServer: string;
            let caseInfoDbSource: string;
            caseInfoDbUserId = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DB_USERID].toString())[0].PARAMETER_VALUE;

            caseInfoSchema = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DB_SCHEMA].toString())[0].PARAMETER_VALUE;

            caseInfoDbPwd = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DB_PASSWORD].toString())[0].PARAMETER_VALUE;

            caseInfoServer = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DB_SERVER].toString())[0].PARAMETER_VALUE;

            caseInfoDbSource = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DB_DATASOURCE].toString())[0].PARAMETER_VALUE;

            if (caseInfoSystem == "HSM") {
                if (caseInfoSchema == null || caseInfoSchema == '' ||
                    caseInfoDbUserId == null || caseInfoDbUserId == '' ||
                    caseInfoDbPwd == null || caseInfoDbPwd == '' ||
                    caseInfoServer == null || caseInfoServer == '' ||
                    caseInfoDbSource == null || caseInfoDbSource == '') {
                    this.growlmsgs.push({
                        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Case Information System Database Details : Schema, UserId, Password, Server, Driver & " +
                        "Datasource are mandatory fields for Sql Server database"
                    });
                    return false;
                }
            }
            let atparDataSource: string;
            let atparUserId: string;
            let atparServer: string;
            let x = ConfigData.SYSTEMDBCONNECTION.DATASOURCE.toString();
            let xx = ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.DATASOURCE].toString();
            atparDataSource = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.DATASOURCE].toString())[0].PARAMETER_VALUE;
            atparUserId = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.USERID].toString())[0].PARAMETER_VALUE;
            atparServer = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.SYSTEMDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.SERVER].toString())[0].PARAMETER_VALUE;

            if (atparDataSource == null || atparDataSource == '' ||
                atparUserId == null || atparUserId == '' ||
                atparServer == null || atparServer == '') {
                this.growlmsgs.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Atpar DataBase Details : Data Source, UserID, Server fields are mandatory"
                });
                return false;
            }
            let rdataSource: string;
            let ruserId: string;
            let rserver: string;
            let rpwd: string;
            let rmtDriver: string;
            rdataSource = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.DATASOURCE].toString())[0].PARAMETER_VALUE;

            ruserId = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.USERID].toString())[0].PARAMETER_VALUE;

            rserver = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.SERVER].toString())[0].PARAMETER_VALUE;

            if (rdataSource == null || rdataSource == "" ||
                ruserId == null || ruserId == "" ||
                rserver == null || rserver == "") {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Reports Config DataBase Details : Data Source, UserID, Server fields are mandatory" });
                this.spinnerService.stop();
                return false;
            }
            let starterDataSource: string;
            let starterPwd: string;
            let starterDriver: string;

            starterDataSource = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_DATASOURCE].toString())[0].PARAMETER_VALUE;
            let starterUserId: string;
            starterUserId = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_USERID].toString())[0].PARAMETER_VALUE
            let starterServer: string;
            starterServer = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString() &&
                x.PARAMETER_ID == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_SERVER].toString())[0].PARAMETER_VALUE;
            starterPwd = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString()
                && x.PARAMETER_ID == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_PASSWORD].toString())[0].PARAMETER_VALUE
            starterDriver = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION].toString()
                && x.PARAMETER_ID == ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_DRIVER].toString())[0].PARAMETER_VALUE;
            if (starterDataSource == null || starterDataSource == "" ||
                starterUserId == null || starterUserId == "" ||
                starterServer == null || starterServer == "") {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Atpar Starter API DataBase Details : Data Source, UserID, Server fields are mandatory" });
                this.spinnerService.stop();
                return false;

            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "check_Validations");
        }
    }

    private async getAuditAllowed(userId: string, appId: number, strMenuCode: string, lstConfigData: MT_ATPAR_CONFIGURATION_SECTION_DTLS[]) {
        try {
            await this.atparCommonService.getAuditAllowed(appId, strMenuCode).
                catch(this.httpService.handleError).then(async (res: Response) => {
                    let webresp = res.json() as AtParWebApiResponse<string>;
                    switch (webresp.StatType) {
                        case StatusType.Success:
                            {
                                let strAuditData = webresp.Data;
                                if (strAuditData == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                    await this.doAuditData(EnumApps.Auth, strMenuCode, lstConfigData);
                                }
                                break;
                            }
                    }
                });

        } catch (ex) {
            this.clientErrorMsg(ex, "getAuditAllowed");
        }
    }

    private async doAuditData(appId: number, strMenuCode: string, lstConfigData: MT_ATPAR_CONFIGURATION_SECTION_DTLS[]) {
        try {
            await this.atparCommonService.doAuditData(this._deviceTokenEntry[TokenEntry_Enum.UserID], appId, strMenuCode, lstConfigData).
                catch(this.httpService.handleError).then((res: Response) => {
                    let webresp = res.json() as AtParWebApiResponse<string>;
                    this.growlmsgs = [];
                    switch (webresp.StatType) {
                        case StatusType.Success:
                            {
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.growlmsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                break;
                            }
                    }

                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "doAuditData");
        }
    }

    private async btnTestErpDatabase_Click() {
        try {
            this.growlmsgs = [];
            this.spinnerService.start();
            this.txtTestErpDatabase = "";
            if (this.checkErpValidations()) {

                await this.checkRemoteDBDetails();
            }
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnTestErpDatabase_Click");
        }
    }

    private async btnTestAtparDatabase_Click() {
        try {
            this.spinnerService.start();
            this.growlmsgs = [];
            this.txtAtparDatabase = "";
            this.dbCheck = ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.SERVER].toString();
            await this.checkAtparDBDetails();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnTestAtparDatabase_Click");
        }
    }

    private async btnTestAtparReportsConfigDB_Click() {
        try {
            this.spinnerService.start();
            this.growlmsgs = [];
            this.txtAtparReportsConfigDatabase = "";
            this.dbCheck = ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.SERVER].toString();
            await this.checkAtparReportsConfigDBDetails();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnTestAtparReportsConfigDB_Click");
        }
    }

    private async btnTestAtparReportsDB_Click() {
        try {
            this.spinnerService.start();
            this.growlmsgs = [];
            this.txtAtparReportsConfigDatabase = "";
            this.dbCheck = ConfigData.REPORTSDBCONNECTION[ConfigData.REPORTSDBCONNECTION.SERVER].toString();
            await this.checkAtparReportsDBDetails();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnTestAtparReportsDB_Click");
        }
    }

    private async btnTestStarterApiDatabase_Click() {
        try {
            this.spinnerService.start();
            this.growlmsgs = [];
            this.txtStarterAPIDatabase = "";
            this.dbCheck = ConfigData.REPORTSCONFIGDBCONNECTION[ConfigData.REPORTSCONFIGDBCONNECTION.STARTER_API_SERVER].toString();
            await this.checkStarterApiDBDetails();
            this.spinnerService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex, "btnTestStarterApiDatabase_Click");
        }
    }

    private async btnTestArchiveDatabase_Click() {
        try {
            this.spinnerService.start();
            this.growlmsgs = [];
            this.txtArchAtparDatabase = "";
            this.dbCheck = ConfigData.SYSTEMDBCONNECTION[ConfigData.SYSTEMDBCONNECTION.ARCHIVE_SERVER].toString();
            await this.checkArchiveDBDetails();
            this.spinnerService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex, "btnTestArchiveDatabase_Click");
        }
    }

    private btnRecallSubmit_Click() {
        this.onSubmit();
    }

    private async btnLDAPcon_Click() {
        try {
            this.spinnerService.start();
            this.growlmsgs = [];
            await this.testLDAPConnection();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnLDAPcon_Click");
        }
    }

    private async btnHSMcon_Click() {
        try {
            this.spinnerService.start();
            this.growlmsgs = [];
            this.txtHSMConnection = '';
            let caseInfoDb: string;
            caseInfoDb = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DATABASE].toString())[0].PARAMETER_VALUE;
            let caseInfoSchema: string;
            let caseInfoDbUserId: string;
            let caseInfoDbPwd: string;
            let caseInfoServer: string;
            let caseInfoDbSource: string;
            let caseInfoDriver: string;
            caseInfoDbUserId = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DB_USERID].toString())[0].PARAMETER_VALUE;

            caseInfoSchema = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DB_SCHEMA].toString())[0].PARAMETER_VALUE;

            caseInfoDbPwd = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DB_PASSWORD].toString())[0].PARAMETER_VALUE;

            caseInfoServer = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DB_SERVER].toString())[0].PARAMETER_VALUE;

            caseInfoDbSource = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DB_DATASOURCE].toString())[0].PARAMETER_VALUE;
            caseInfoDriver = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString() &&
                x.PARAMETER_ID == ConfigData.HL7[ConfigData.HL7.CASE_INFO_DB_DRIVER].toString())[0].PARAMETER_VALUE;

            if (caseInfoDb == "NONE") {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Case Information System Database" });
                this.spinnerService.stop();
                return;
            }
            if (caseInfoSchema == null || caseInfoSchema == "" || caseInfoDbUserId == null || caseInfoDbUserId == ""
                || caseInfoDbPwd == null || caseInfoDbPwd == "" || caseInfoServer == null || caseInfoServer == ""
                || caseInfoDbSource == null || caseInfoDbSource == "") {
                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Case Information System Database Details : Schema, UserId, Password, Server, Driver & Datasource are mandatory fields for Sql Server database" });
                this.spinnerService.stop();
                return;
            }

            await this.checkDBConnection(caseInfoDb, caseInfoDbUserId, caseInfoDbPwd, caseInfoServer, caseInfoDbSource,
                ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.HL7].toString(), caseInfoDriver);
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnHSMcon_Click");
        }
    }

    private async btnSSLSubmit_Click() {
        try {
            if (this.sslTabData != null) {
                for (let x = 0; x < this.sslTabData.length; x++) {
                    if (this.sslTabData[x].PARAMETER_VALUE != "" && this.sslTabData[x].PARAMETER_VALUE != null &&
                        this.sslTabData[x].VALIDATION_RULES != "" && this.sslTabData[x].VALIDATION_RULES != null && this.sslTabData[x].VALIDATION_RULES!="MANDATORY") {
                        let regxresult = regExpValidator('numeric', this.sslTabData[x].PARAMETER_VALUE)
                        if (!regxresult) {
                            await this.enableSelectedTab({ tab: { title: "AtPar System", active: true }, tabs: this.tabs });
                            await this.showMessage(this.sslTabData[x].VALIDATION_RULES);
                            let txtfield = document.getElementById(this.sslTabData[x].TAB_ID + this.sslTabData[x].PARAMETER_ID);
                            setTimeout(() => {
                                if (txtfield != null) {
                                    txtfield.focus();
                                }
                            }, 1)
                            return;
                        }
                    }
                }
            }
            this.growlmsgs = [];
            let protocol: string;
            let serverName: string;
            let portNo: string;
            this.spinnerService.start();
            protocol = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.ATPAR_SYSTEM].toString() &&
                x.PARAMETER_ID == ConfigData.ATPAR_SYSTEM[ConfigData.ATPAR_SYSTEM.PROTOCOL].toString())[0].PARAMETER_VALUE;

            serverName = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.ATPAR_SYSTEM].toString() &&
                x.PARAMETER_ID == ConfigData.ATPAR_SYSTEM[ConfigData.ATPAR_SYSTEM.SERVERNAME].toString())[0].PARAMETER_VALUE;
            portNo = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.ATPAR_SYSTEM].toString() &&
                x.PARAMETER_ID == ConfigData.ATPAR_SYSTEM[ConfigData.ATPAR_SYSTEM.PORTNO].toString())[0].PARAMETER_VALUE;

            await this.configMgrService.SaveSSLConfigDetails(protocol, serverName, portNo).
                catch(this.httpService.handleError).then((res: Response) => {
                    let webresp = res.json() as AtParWebApiResponse<string>

                    this.spinnerService.stop();

                    switch (webresp.StatType) {
                        case StatusType.Success:
                            {
                                this.growlmsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Updated Successfully" });

                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });

                                break;
                            }
                        case StatusType.Error:
                            {
                                this.growlmsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });

                                break;
                            }
                    }

                });

        } catch (ex) {
            this.clientErrorMsg(ex, "btnSSLSubmit_Click");
        }
    }

    private async btnLogSave_Click() {
        try {
            this.growlmsgs = [];
            let webPageLevel: string;
            let webServiceLevel: string;
            let busLogLevel: string;
            let logxml: string;
            this.spinnerService.start();

            webPageLevel = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LOG_CONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LOG_CONFIG[ConfigData.LOG_CONFIG.WEBPAGES_LOGLEVEL].toString())[0].PARAMETER_VALUE;

            webServiceLevel = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LOG_CONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LOG_CONFIG[ConfigData.LOG_CONFIG.WEBSERVICES_LOGLEVEL].toString())[0].PARAMETER_VALUE;

            busLogLevel = this.configData.filter(x => x.TAB_ID == ConfigData.ConfigurationManager_Tabs[ConfigData.ConfigurationManager_Tabs.LOG_CONFIG].toString() &&
                x.PARAMETER_ID == ConfigData.LOG_CONFIG[ConfigData.LOG_CONFIG.BUSINESSRULE_LOGLEVEL].toString())[0].PARAMETER_VALUE;

            await this.configMgrService.UpdateLogConfigDetails(this._deviceTokenEntry[TokenEntry_Enum.UserID], logxml).
                catch(this.httpService.handleError).then((res: Response) => {
                    res.json() as AtParWebApiResponse<string>
                    let webresp = res.json() as AtParWebApiResponse<string>;
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success:
                            {
                                this.growlmsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Updated Successfully" });
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.growlmsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                break;
                            }
                    }

                });

        } catch (ex) {

            this.clientErrorMsg(ex, "btnLogSave_Click");
        }
    }

    async btnFilterSave_Click() {
        try {
            this.growlmsgs = [];
            this.spinnerService.start();
            await this.configMgrService.UpdateLogConfigDetails(this._deviceTokenEntry[TokenEntry_Enum.UserID], this.logxml).
                catch(this.httpService.handleError).then((res: Response) => {
                    let webresp = res.json() as AtParWebApiResponse<string>
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success:
                            {
                                this.growlmsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Updated Successfully" });
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.growlmsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                break;
                            }
                    }
                    this.spinnerService.stop();
                });

        } catch (ex) {
            this.clientErrorMsg(ex, "btnFilterSave_Click");
        }
    }

    btnFilterReset_Click() {
        try {
            this.growlmsgs = [];
            this.spinnerService.start();
            this.configMgrService.GetEntrpServiceConffile(this._deviceTokenEntry[TokenEntry_Enum.UserID], false).
                catch(this.httpService.handleError).then((res: Response) => {
                    let webresp = res.json() as AtParWebApiResponse<string>
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success:
                            {
                                this.growlmsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Filter Reset Successful" });
                                this.logxml = webresp.DataVariable.toString();
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.growlmsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                break;
                            }
                    }

                });

        } catch (ex) {
            this.clientErrorMsg(ex, "btnFilterReset_Click");
        }

    }

    async validationsForInputs(validateconfigData) {
        try {
            for (let x = 0; x <= validateconfigData.length - 1; x++) {

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
                    var key = CryptoJS.enc.Utf8.parse('8080808080808080');
                    var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
                    if (validateconfigData[x].PARAMETER_VALUE != '' && validateconfigData[x].PARAMETER_VALUE != null) {

                        let rpstring = validateconfigData[x].PARAMETER_VALUE.toString();//.replace('+', ' ');
                        let decrypt = CryptoJS.AES.decrypt(rpstring, key,
                            { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                        let decryptdata = decrypt.toString(CryptoJS.enc.Utf8);
                        this.configData[x].PARAMETER_VALUE = decryptdata;
                        validateconfigData[x].PARAMETER_VALUE = decryptdata;
                    } 
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "validationsForInputs");
        }
    }

    fileChange(event) {
        try {
            this.spinnerService.start();
            let fileList: FileList = event.target.files;
            if (fileList.length > 0) {
                let file: File = fileList[0];
                let formData: FormData = new FormData();

                var listData = [];
                var obj = { FileName: file.name, File: file };
                listData.push(obj);

                formData.append('uploadFile', file, file.name);
                let headers = new Headers();
                headers.append('Authorization', 'bearer');
                headers.append('enctype', 'multipart/form-data');
                let options = new RequestOptions({ headers: headers });
                let apiUrl = this.httpService.BaseUrl + "/api/User/UploadCustomerLogo";

                this.http.post(apiUrl, formData, options)
                    .catch(error => { this.spinnerService.stop(); return Observable.throw(error) })
                    .map(res => res.json())
                    .subscribe(
                    (res) => {
                        this.growlmsgs = [];
                        this.spinnerService.stop();
                        if (res.Message == "Image Uploaded Successfully.") {
                            // this.blnFileUpload = false;
                            this.growlmsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: res.Message });
                        } else {
                            //this.blnFileUpload = true;
                            this.growlmsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.Message });
                        }
                    },
                    error => {
                        this.spinnerService.stop();
                        console.log(error)
                    }

                    );
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "fileChange");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.spinnerService.stop();
        this.growlmsgs = [];
        this.atParConstants.catchClientError(this.growlmsgs, this.spinnerService, strExMsg.toString, funName, this.constructor.name);
    }

    ngOnDestroy() {
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
    }


}
