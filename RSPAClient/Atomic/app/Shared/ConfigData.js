"use strict";
var ConfigData;
(function (ConfigData) {
    //Configuration File Main Tag
    var MASTERCONFIG;
    (function (MASTERCONFIG) {
        MASTERCONFIG[MASTERCONFIG["MASTER_DB"] = 0] = "MASTER_DB";
    })(MASTERCONFIG = ConfigData.MASTERCONFIG || (ConfigData.MASTERCONFIG = {}));
    // Connection information for ATPAR_MT
    var MASTER_DB;
    (function (MASTER_DB) {
        MASTER_DB[MASTER_DB["SYSTEMID"] = 0] = "SYSTEMID";
        MASTER_DB[MASTER_DB["SERVER"] = 1] = "SERVER";
        MASTER_DB[MASTER_DB["USERID"] = 2] = "USERID";
        MASTER_DB[MASTER_DB["DATASOURCE"] = 3] = "DATASOURCE";
    })(MASTER_DB = ConfigData.MASTER_DB || (ConfigData.MASTER_DB = {}));
    var CONFIGFILE;
    (function (CONFIGFILE) {
        CONFIGFILE[CONFIGFILE["REMOTEDBCONNECTION"] = 0] = "REMOTEDBCONNECTION";
        CONFIGFILE[CONFIGFILE["EMAILCONFIGARATION"] = 1] = "EMAILCONFIGARATION";
        CONFIGFILE[CONFIGFILE["SYSTEMPARAMETERS"] = 2] = "SYSTEMPARAMETERS";
        CONFIGFILE[CONFIGFILE["REMOTINGCONFIGARATION"] = 3] = "REMOTINGCONFIGARATION";
        CONFIGFILE[CONFIGFILE["LDAPCONFIG"] = 4] = "LDAPCONFIG";
        CONFIGFILE[CONFIGFILE["SSO"] = 5] = "SSO";
        CONFIGFILE[CONFIGFILE["HL7"] = 6] = "HL7";
        CONFIGFILE[CONFIGFILE["ERP_SYS_DETAILS"] = 7] = "ERP_SYS_DETAILS";
        CONFIGFILE[CONFIGFILE["LOG_CONFIG"] = 8] = "LOG_CONFIG";
        CONFIGFILE[CONFIGFILE["SYSTEMDBCONNECTION"] = 9] = "SYSTEMDBCONNECTION";
        CONFIGFILE[CONFIGFILE["ERP_LOGIN_URL"] = 10] = "ERP_LOGIN_URL";
        CONFIGFILE[CONFIGFILE["ATPAR_SYSTEM"] = 11] = "ATPAR_SYSTEM";
    })(CONFIGFILE = ConfigData.CONFIGFILE || (ConfigData.CONFIGFILE = {}));
    var ERP_LOGIN_URL;
    (function (ERP_LOGIN_URL) {
        ERP_LOGIN_URL[ERP_LOGIN_URL["PSCILOGINURL"] = 0] = "PSCILOGINURL";
        ERP_LOGIN_URL[ERP_LOGIN_URL["LAWSONLOGANLOGINURL"] = 1] = "LAWSONLOGANLOGINURL";
    })(ERP_LOGIN_URL = ConfigData.ERP_LOGIN_URL || (ConfigData.ERP_LOGIN_URL = {}));
    var DATABASE_TYPES;
    (function (DATABASE_TYPES) {
        DATABASE_TYPES[DATABASE_TYPES["SQLSERVER"] = 0] = "SQLSERVER";
        DATABASE_TYPES[DATABASE_TYPES["ORACLE"] = 1] = "ORACLE";
        DATABASE_TYPES[DATABASE_TYPES["DB2"] = 2] = "DB2";
        DATABASE_TYPES[DATABASE_TYPES["SAP"] = 3] = "SAP";
        DATABASE_TYPES[DATABASE_TYPES["INFORMIX"] = 4] = "INFORMIX";
    })(DATABASE_TYPES = ConfigData.DATABASE_TYPES || (ConfigData.DATABASE_TYPES = {}));
    //''' <summary>
    //''' Connection information for ERP databases
    //''' </summary>
    //''' <remarks></remarks>
    var REMOTEDBCONNECTION;
    (function (REMOTEDBCONNECTION) {
        //    ''' <summary>
        //''' Database Type e.g. ORACLE, PEOPLESOFT, DB2 etc
        //''' </summary>
        //''' <remarks></remarks>
        REMOTEDBCONNECTION[REMOTEDBCONNECTION["DATABASE"] = 0] = "DATABASE";
        //''' <summary>
        //''' Schema Name e.g. sysadm
        //''' </summary>
        //''' <remarks></remarks>
        REMOTEDBCONNECTION[REMOTEDBCONNECTION["SCHEMA"] = 1] = "SCHEMA";
        //''' <summary>
        //''' 
        //''' </summary>
        //''' <remarks></remarks>
        REMOTEDBCONNECTION[REMOTEDBCONNECTION["DATASOURCE"] = 2] = "DATASOURCE";
        //''' <summary>
        //''' e.g Server/TNS name
        //''' </summary>
        //''' <remarks></remarks>
        REMOTEDBCONNECTION[REMOTEDBCONNECTION["SERVER"] = 3] = "SERVER";
        //''' <summary>
        //''' Driver string e.g. {Microsoft ODBC for Oracle}
        //''' </summary>
        //''' <remarks></remarks>
        REMOTEDBCONNECTION[REMOTEDBCONNECTION["DRIVER"] = 4] = "DRIVER";
        //''' <summary>
        //''' Database userid
        //''' </summary>
        //''' <remarks></remarks>
        REMOTEDBCONNECTION[REMOTEDBCONNECTION["USERID"] = 5] = "USERID";
        //''' <summary>
        //''' AtPar Encrypted Password
        //''' </summary>
        //''' <remarks></remarks>
        REMOTEDBCONNECTION[REMOTEDBCONNECTION["PASSWORD"] = 6] = "PASSWORD";
        REMOTEDBCONNECTION[REMOTEDBCONNECTION["NETTRANS"] = 7] = "NETTRANS";
        REMOTEDBCONNECTION[REMOTEDBCONNECTION["HOST"] = 8] = "HOST";
        REMOTEDBCONNECTION[REMOTEDBCONNECTION["SERVICE"] = 9] = "SERVICE";
        REMOTEDBCONNECTION[REMOTEDBCONNECTION["PROTOCOL"] = 10] = "PROTOCOL";
        REMOTEDBCONNECTION[REMOTEDBCONNECTION["MT_DRIVER"] = 11] = "MT_DRIVER";
    })(REMOTEDBCONNECTION = ConfigData.REMOTEDBCONNECTION || (ConfigData.REMOTEDBCONNECTION = {}));
    //''' <summary>
    //''' Connection information for ATPAR_MT
    //''' </summary>
    //''' <remarks></remarks>
    var LOCALDBCONNECTION;
    (function (LOCALDBCONNECTION) {
        //''' <summary>
        //''' Database type e.g. SQLSERVER
        //''' </summary>
        //''' <remarks></remarks>
        LOCALDBCONNECTION[LOCALDBCONNECTION["DATABASE"] = 0] = "DATABASE";
        //''' <summary>
        //''' Userid of the DB user
        //''' </summary>
        //''' <remarks></remarks>
        LOCALDBCONNECTION[LOCALDBCONNECTION["USERID"] = 1] = "USERID";
        //''' <summary>
        //''' AtPar Encrypted Password
        //''' </summary>
        //''' <remarks></remarks>
        LOCALDBCONNECTION[LOCALDBCONNECTION["PASSWORD"] = 2] = "PASSWORD";
        //''' <summary>
        //''' Database name e.g. ATPAR_MT
        //''' </summary>
        //''' <remarks></remarks>
        LOCALDBCONNECTION[LOCALDBCONNECTION["DATASOURCE"] = 3] = "DATASOURCE";
        //''' <summary>
        //''' Server FQDN or IP or instance name
        //''' </summary>
        //''' <remarks></remarks>
        LOCALDBCONNECTION[LOCALDBCONNECTION["SERVER"] = 4] = "SERVER";
        //''' <summary>
        //''' Driver String e.g. {SQL Server}
        //''' </summary>
        //''' <remarks></remarks>
        LOCALDBCONNECTION[LOCALDBCONNECTION["DRIVER"] = 5] = "DRIVER";
    })(LOCALDBCONNECTION = ConfigData.LOCALDBCONNECTION || (ConfigData.LOCALDBCONNECTION = {}));
    //End Enum
    //''' <summary>
    //''' Email information for automated mails from the system
    //''' </summary>
    //''' <remarks></remarks>
    var EMAILCONFIGARATION;
    (function (EMAILCONFIGARATION) {
        //''' <summary>
        //''' FQDN or IP address of the SMTP server
        //''' </summary>
        //''' <remarks></remarks>
        EMAILCONFIGARATION[EMAILCONFIGARATION["SMTP_SERVER"] = 0] = "SMTP_SERVER";
        //''' <summary>
        //''' TCP Port the server is listening on
        //''' </summary>
        //''' <remarks></remarks>
        EMAILCONFIGARATION[EMAILCONFIGARATION["SMTP_SERVER_PORT"] = 1] = "SMTP_SERVER_PORT";
        EMAILCONFIGARATION[EMAILCONFIGARATION["SMTP_ACCOUNT_NAME"] = 2] = "SMTP_ACCOUNT_NAME";
        EMAILCONFIGARATION[EMAILCONFIGARATION["SMTP_MAIL_ADDRESS"] = 3] = "SMTP_MAIL_ADDRESS";
        EMAILCONFIGARATION[EMAILCONFIGARATION["SMTP_AUTHENTICATE"] = 4] = "SMTP_AUTHENTICATE";
        EMAILCONFIGARATION[EMAILCONFIGARATION["SMTP_USE_SSL"] = 5] = "SMTP_USE_SSL";
        EMAILCONFIGARATION[EMAILCONFIGARATION["SMTP_PASSWORD"] = 6] = "SMTP_PASSWORD";
        EMAILCONFIGARATION[EMAILCONFIGARATION["SMTP_SEND_USING"] = 7] = "SMTP_SEND_USING";
        EMAILCONFIGARATION[EMAILCONFIGARATION["SMTP_USER_NAME"] = 8] = "SMTP_USER_NAME";
    })(EMAILCONFIGARATION = ConfigData.EMAILCONFIGARATION || (ConfigData.EMAILCONFIGARATION = {}));
    var SYSTEMPARAMETERS;
    (function (SYSTEMPARAMETERS) {
        SYSTEMPARAMETERS[SYSTEMPARAMETERS["DEBUGBINTOBIN"] = 0] = "DEBUGBINTOBIN";
        SYSTEMPARAMETERS[SYSTEMPARAMETERS["DEBUGCARTCOUNT"] = 1] = "DEBUGCARTCOUNT";
        SYSTEMPARAMETERS[SYSTEMPARAMETERS["DEBUGCYCLECOUNT"] = 2] = "DEBUGCYCLECOUNT";
        SYSTEMPARAMETERS[SYSTEMPARAMETERS["DEBUGDELIVER"] = 3] = "DEBUGDELIVER";
        SYSTEMPARAMETERS[SYSTEMPARAMETERS["DEBUGPICKPLAN"] = 4] = "DEBUGPICKPLAN";
        SYSTEMPARAMETERS[SYSTEMPARAMETERS["DEBUGPUTAWAY"] = 5] = "DEBUGPUTAWAY";
        SYSTEMPARAMETERS[SYSTEMPARAMETERS["DEBUGRECEIVING"] = 6] = "DEBUGRECEIVING";
        SYSTEMPARAMETERS[SYSTEMPARAMETERS["DEBUGSTOCKISSUE"] = 7] = "DEBUGSTOCKISSUE";
        SYSTEMPARAMETERS[SYSTEMPARAMETERS["DEBUGUSERMANAGEMENT"] = 8] = "DEBUGUSERMANAGEMENT";
        SYSTEMPARAMETERS[SYSTEMPARAMETERS["ERRORLOGLEVEL"] = 9] = "ERRORLOGLEVEL";
        SYSTEMPARAMETERS[SYSTEMPARAMETERS["ERRORLOGPATH"] = 10] = "ERRORLOGPATH";
    })(SYSTEMPARAMETERS = ConfigData.SYSTEMPARAMETERS || (ConfigData.SYSTEMPARAMETERS = {}));
    var REMOTINGCONFIGARATION;
    (function (REMOTINGCONFIGARATION) {
        REMOTINGCONFIGARATION[REMOTINGCONFIGARATION["MONIKER"] = 0] = "MONIKER";
        REMOTINGCONFIGARATION[REMOTINGCONFIGARATION["HOST"] = 1] = "HOST";
        REMOTINGCONFIGARATION[REMOTINGCONFIGARATION["PORT"] = 2] = "PORT";
    })(REMOTINGCONFIGARATION = ConfigData.REMOTINGCONFIGARATION || (ConfigData.REMOTINGCONFIGARATION = {}));
    var LDAPCONFIG;
    (function (LDAPCONFIG) {
        LDAPCONFIG[LDAPCONFIG["SERVERNAME"] = 0] = "SERVERNAME";
        LDAPCONFIG[LDAPCONFIG["PROTOCOL"] = 1] = "PROTOCOL";
        LDAPCONFIG[LDAPCONFIG["CERTIFICATE"] = 2] = "CERTIFICATE";
        LDAPCONFIG[LDAPCONFIG["BASEDN"] = 3] = "BASEDN";
        LDAPCONFIG[LDAPCONFIG["OBJECTCLASS"] = 4] = "OBJECTCLASS";
        LDAPCONFIG[LDAPCONFIG["USERNAME"] = 5] = "USERNAME";
        LDAPCONFIG[LDAPCONFIG["PASSWORD"] = 6] = "PASSWORD";
        LDAPCONFIG[LDAPCONFIG["USERID"] = 7] = "USERID";
        LDAPCONFIG[LDAPCONFIG["FIRSTNAME"] = 8] = "FIRSTNAME";
        LDAPCONFIG[LDAPCONFIG["LASTNAME"] = 9] = "LASTNAME";
        LDAPCONFIG[LDAPCONFIG["MIDDLEINITIAL"] = 10] = "MIDDLEINITIAL";
        LDAPCONFIG[LDAPCONFIG["EMAILID"] = 11] = "EMAILID";
        LDAPCONFIG[LDAPCONFIG["PHONE"] = 12] = "PHONE";
        LDAPCONFIG[LDAPCONFIG["FAX"] = 13] = "FAX";
        LDAPCONFIG[LDAPCONFIG["AUTHTYPE"] = 14] = "AUTHTYPE";
        LDAPCONFIG[LDAPCONFIG["SEARCHSCOPE"] = 15] = "SEARCHSCOPE";
        LDAPCONFIG[LDAPCONFIG["SEARCHFILTER"] = 16] = "SEARCHFILTER";
        LDAPCONFIG[LDAPCONFIG["ENTRYLIMIT"] = 17] = "ENTRYLIMIT";
        LDAPCONFIG[LDAPCONFIG["ACNTSTATRULE"] = 18] = "ACNTSTATRULE";
    })(LDAPCONFIG = ConfigData.LDAPCONFIG || (ConfigData.LDAPCONFIG = {}));
    var SSO;
    (function (SSO) {
        SSO[SSO["SSO_ENABLED"] = 0] = "SSO_ENABLED";
        SSO[SSO["SSO_VARIABLE"] = 1] = "SSO_VARIABLE";
        SSO[SSO["SSO_COOKIE_NAME"] = 2] = "SSO_COOKIE_NAME";
        SSO[SSO["SSO_LOGOUT_PAGE"] = 3] = "SSO_LOGOUT_PAGE";
    })(SSO = ConfigData.SSO || (ConfigData.SSO = {}));
    var DBCONN_STRING;
    (function (DBCONN_STRING) {
        DBCONN_STRING[DBCONN_STRING["LOCALDBCONNSTRING"] = 0] = "LOCALDBCONNSTRING";
        DBCONN_STRING[DBCONN_STRING["REMOTEDBCONNSTRING"] = 1] = "REMOTEDBCONNSTRING";
        DBCONN_STRING[DBCONN_STRING["DECRYPTPASSWORD"] = 2] = "DECRYPTPASSWORD";
        DBCONN_STRING[DBCONN_STRING["MASTER_DB"] = 3] = "MASTER_DB";
    })(DBCONN_STRING = ConfigData.DBCONN_STRING || (ConfigData.DBCONN_STRING = {}));
    var HL7;
    (function (HL7) {
        HL7[HL7["SENDING_APPLICATION"] = 0] = "SENDING_APPLICATION";
        HL7[HL7["SENDING_FACILITY"] = 1] = "SENDING_FACILITY";
        HL7[HL7["RECEIVING_APPLICATION"] = 2] = "RECEIVING_APPLICATION";
        HL7[HL7["RECEIVING_FACILITY"] = 3] = "RECEIVING_FACILITY";
        HL7[HL7["ADT_LISTENER_PORT"] = 4] = "ADT_LISTENER_PORT";
        HL7[HL7["BILLING_UPLOAD_PATH"] = 5] = "BILLING_UPLOAD_PATH";
        HL7[HL7["ADT_VERSION"] = 6] = "ADT_VERSION";
        HL7[HL7["ADT_BILLING_SEND_ADDRESS"] = 7] = "ADT_BILLING_SEND_ADDRESS";
        HL7[HL7["ADT_BILLING_SEND_PORT"] = 8] = "ADT_BILLING_SEND_PORT";
        HL7[HL7["ADT_BILLING_THRESHOLD_VALUE"] = 9] = "ADT_BILLING_THRESHOLD_VALUE";
        HL7[HL7["PROCESS_ADT_BILLING"] = 10] = "PROCESS_ADT_BILLING";
        HL7[HL7["PROCESS_ADT_LISTENER"] = 11] = "PROCESS_ADT_LISTENER";
        HL7[HL7["ADT_MESSAGE_TYPE"] = 12] = "ADT_MESSAGE_TYPE";
        HL7[HL7["ADT_CASE_MESSAGE_TYPE"] = 13] = "ADT_CASE_MESSAGE_TYPE";
        HL7[HL7["CASE_INFORMATION_SYSTEM"] = 14] = "CASE_INFORMATION_SYSTEM";
        HL7[HL7["CASE_INFO_DATABASE"] = 15] = "CASE_INFO_DATABASE";
        HL7[HL7["CASE_INFO_DB_SCHEMA"] = 16] = "CASE_INFO_DB_SCHEMA";
        HL7[HL7["CASE_INFO_DB_USERID"] = 17] = "CASE_INFO_DB_USERID";
        HL7[HL7["CASE_INFO_DB_PASSWORD"] = 18] = "CASE_INFO_DB_PASSWORD";
        HL7[HL7["CASE_INFO_DB_SERVER"] = 19] = "CASE_INFO_DB_SERVER";
        HL7[HL7["CASE_INFO_DB_DRIVER"] = 20] = "CASE_INFO_DB_DRIVER";
        HL7[HL7["CASE_INFO_DB_DATASOURCE"] = 21] = "CASE_INFO_DB_DATASOURCE";
        HL7[HL7["ADT_EMAILID"] = 22] = "ADT_EMAILID";
        HL7[HL7["BILLING_MSG_BY_TRANSACTION"] = 23] = "BILLING_MSG_BY_TRANSACTION";
    })(HL7 = ConfigData.HL7 || (ConfigData.HL7 = {}));
    var ATPAR_SYSTEM;
    (function (ATPAR_SYSTEM) {
        ATPAR_SYSTEM[ATPAR_SYSTEM["RECALL_MGMT_IMPLEMENTED"] = 0] = "RECALL_MGMT_IMPLEMENTED";
        ATPAR_SYSTEM[ATPAR_SYSTEM["PROTOCOL"] = 1] = "PROTOCOL";
        ATPAR_SYSTEM[ATPAR_SYSTEM["SERVERNAME"] = 2] = "SERVERNAME";
        ATPAR_SYSTEM[ATPAR_SYSTEM["PORTNO"] = 3] = "PORTNO";
        ATPAR_SYSTEM[ATPAR_SYSTEM["PREPICK_QA_PROCESS_REQUIRED"] = 4] = "PREPICK_QA_PROCESS_REQUIRED";
    })(ATPAR_SYSTEM = ConfigData.ATPAR_SYSTEM || (ConfigData.ATPAR_SYSTEM = {}));
    var ConfigurationManager_Tabs;
    (function (ConfigurationManager_Tabs) {
        ConfigurationManager_Tabs[ConfigurationManager_Tabs["ERP_SYS_DETAILS"] = 1] = "ERP_SYS_DETAILS";
        ConfigurationManager_Tabs[ConfigurationManager_Tabs["REMOTEDBCONNECTION"] = 2] = "REMOTEDBCONNECTION";
        ConfigurationManager_Tabs[ConfigurationManager_Tabs["SYSTEMDBCONNECTION"] = 3] = "SYSTEMDBCONNECTION";
        ConfigurationManager_Tabs[ConfigurationManager_Tabs["ATPAR_SYSTEM"] = 4] = "ATPAR_SYSTEM";
        ConfigurationManager_Tabs[ConfigurationManager_Tabs["EMAILCONFIGARATION"] = 5] = "EMAILCONFIGARATION";
        ConfigurationManager_Tabs[ConfigurationManager_Tabs["SYSTEMPARAMETERS"] = 6] = "SYSTEMPARAMETERS";
        ConfigurationManager_Tabs[ConfigurationManager_Tabs["LDAPCONFIG"] = 7] = "LDAPCONFIG";
        ConfigurationManager_Tabs[ConfigurationManager_Tabs["SSO"] = 8] = "SSO";
        ConfigurationManager_Tabs[ConfigurationManager_Tabs["LOG_CONFIG"] = 9] = "LOG_CONFIG";
        ConfigurationManager_Tabs[ConfigurationManager_Tabs["REMOTINGCONFIGARATION"] = 10] = "REMOTINGCONFIGARATION";
        ConfigurationManager_Tabs[ConfigurationManager_Tabs["HL7"] = 11] = "HL7";
    })(ConfigurationManager_Tabs = ConfigData.ConfigurationManager_Tabs || (ConfigData.ConfigurationManager_Tabs = {}));
    var LOG_CONFIG;
    (function (LOG_CONFIG) {
        LOG_CONFIG[LOG_CONFIG["WEBPAGES_LOGLEVEL"] = 0] = "WEBPAGES_LOGLEVEL";
        LOG_CONFIG[LOG_CONFIG["WEBSERVICES_LOGLEVEL"] = 1] = "WEBSERVICES_LOGLEVEL";
        LOG_CONFIG[LOG_CONFIG["BUSINESSRULE_LOGLEVEL"] = 2] = "BUSINESSRULE_LOGLEVEL";
    })(LOG_CONFIG = ConfigData.LOG_CONFIG || (ConfigData.LOG_CONFIG = {}));
    var ERP_SYS_DETAILS;
    (function (ERP_SYS_DETAILS) {
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["ENTERPRISESYSTEM"] = 0] = "ENTERPRISESYSTEM";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["ERPUSERID"] = 1] = "ERPUSERID";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["ERPPASSWORD"] = 2] = "ERPPASSWORD";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["ERPSERVER"] = 3] = "ERPSERVER";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["PRODUCTLINE"] = 4] = "PRODUCTLINE";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["ERPPORTAL"] = 5] = "ERPPORTAL";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["ERPNODE"] = 6] = "ERPNODE";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["ERPWEBSERVERPORT"] = 7] = "ERPWEBSERVERPORT";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["ERPSITE"] = 8] = "ERPSITE";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["ERPSICOMPINTERFACE"] = 9] = "ERPSICOMPINTERFACE";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["EXP_PUTAWAY_CI_NAME"] = 10] = "EXP_PUTAWAY_CI_NAME";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["RMA_CI_NAME"] = 11] = "RMA_CI_NAME";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["DOWNLOADFILEPATH"] = 12] = "DOWNLOADFILEPATH";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["UPLOADFILEPATH"] = 13] = "UPLOADFILEPATH";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["UPLOADFREQUENCY"] = 14] = "UPLOADFREQUENCY";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["RECV_DOWNLOADFREQUENCY"] = 15] = "RECV_DOWNLOADFREQUENCY";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["EMPLOYEE_DATALOAD_FREQ"] = 16] = "EMPLOYEE_DATALOAD_FREQ";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["STOCKLESS_FILETYPE"] = 17] = "STOCKLESS_FILETYPE";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["PAR_ITEMLOAD_FREQUENCY"] = 18] = "PAR_ITEMLOAD_FREQUENCY";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["FREQ_DL_PICKPLNS"] = 19] = "FREQ_DL_PICKPLNS";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["FREQ_DL_SI"] = 20] = "FREQ_DL_SI";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["FREQ_VNDR_UPDATES"] = 21] = "FREQ_VNDR_UPDATES";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["PKPL_OUTPUT_FILE_TYPE"] = 22] = "PKPL_OUTPUT_FILE_TYPE";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["RECV_NPR_REPORT_SCHTIME"] = 23] = "RECV_NPR_REPORT_SCHTIME";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["PICK_PLAN_NPR_REPORT_SCHTIME"] = 24] = "PICK_PLAN_NPR_REPORT_SCHTIME";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["SI_NPR_SCHED_TIME"] = 25] = "SI_NPR_SCHED_TIME";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["PARITEMSLOAD_REPORT_SCHTIME"] = 26] = "PARITEMSLOAD_REPORT_SCHTIME";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["PAR_VENDOR_LOAD_FREQUENCY"] = 27] = "PAR_VENDOR_LOAD_FREQUENCY";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["CLIENTCODE"] = 28] = "CLIENTCODE";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["SYSNR"] = 29] = "SYSNR";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["ERRORLOGCYCLEFREQ"] = 30] = "ERRORLOGCYCLEFREQ";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["PENDINGFILE_CHECK_FREQ"] = 31] = "PENDINGFILE_CHECK_FREQ";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["SUPPORT_MAILID"] = 32] = "SUPPORT_MAILID";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["VERSION"] = 33] = "VERSION";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["CUSTOMER_NAME"] = 34] = "CUSTOMER_NAME";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["CONNECTIONSTRING"] = 35] = "CONNECTIONSTRING";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["ENTERPRISEVERSION"] = 36] = "ENTERPRISEVERSION";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["DOWNLOADFROM"] = 37] = "DOWNLOADFROM";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["UPLOADTO"] = 38] = "UPLOADTO";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["POU_SERVICE_FREQ"] = 39] = "POU_SERVICE_FREQ";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["ERPPOGENCOMPINTERFACE"] = 40] = "ERPPOGENCOMPINTERFACE";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["CUSTOMWEBLIBRARY"] = 41] = "CUSTOMWEBLIBRARY";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["RMA_RECEIPT_CI_NAME"] = 42] = "RMA_RECEIPT_CI_NAME";
        ERP_SYS_DETAILS[ERP_SYS_DETAILS["SERVERTYPE"] = 43] = "SERVERTYPE";
    })(ERP_SYS_DETAILS = ConfigData.ERP_SYS_DETAILS || (ConfigData.ERP_SYS_DETAILS = {}));
    var SYSTEMDBCONNECTION;
    (function (SYSTEMDBCONNECTION) {
        //''' <summary>
        //''' Database type e.g. SQLSERVER
        //''' </summary>
        //''' <remarks></remarks>
        SYSTEMDBCONNECTION[SYSTEMDBCONNECTION["DATABASE"] = 0] = "DATABASE";
        //''' <summary>
        //''' Userid of the DB user
        //''' </summary>
        //''' <remarks></remarks>
        SYSTEMDBCONNECTION[SYSTEMDBCONNECTION["USERID"] = 1] = "USERID";
        //''' <summary>
        //''' AtPar Encrypted Password
        //''' </summary>
        //''' <remarks></remarks>
        SYSTEMDBCONNECTION[SYSTEMDBCONNECTION["PASSWORD"] = 2] = "PASSWORD";
        //''' <summary>
        //''' Database name e.g. ATPAR_MASTER
        //''' </summary>
        //''' <remarks></remarks>
        SYSTEMDBCONNECTION[SYSTEMDBCONNECTION["DATASOURCE"] = 3] = "DATASOURCE";
        //''' <summary>
        //''' Server FQDN or IP or instance name
        //''' </summary>
        //''' <remarks></remarks>
        SYSTEMDBCONNECTION[SYSTEMDBCONNECTION["SERVER"] = 4] = "SERVER";
        //''' <summary>
        //''' Driver String e.g. {SQL Server}
        //''' </summary>
        //''' <remarks></remarks>
        SYSTEMDBCONNECTION[SYSTEMDBCONNECTION["DRIVER"] = 5] = "DRIVER";
        SYSTEMDBCONNECTION[SYSTEMDBCONNECTION["ARCHIVE_DATABASE"] = 6] = "ARCHIVE_DATABASE";
        SYSTEMDBCONNECTION[SYSTEMDBCONNECTION["ARCHIVE_DATASOURCE"] = 7] = "ARCHIVE_DATASOURCE";
        SYSTEMDBCONNECTION[SYSTEMDBCONNECTION["ARCHIVE_USERID"] = 8] = "ARCHIVE_USERID";
        SYSTEMDBCONNECTION[SYSTEMDBCONNECTION["ARCHIVE_PASSWORD"] = 9] = "ARCHIVE_PASSWORD";
        SYSTEMDBCONNECTION[SYSTEMDBCONNECTION["ARCHIVE_SERVER"] = 10] = "ARCHIVE_SERVER";
        SYSTEMDBCONNECTION[SYSTEMDBCONNECTION["ARCHIVE_DRIVER"] = 11] = "ARCHIVE_DRIVER";
        SYSTEMDBCONNECTION[SYSTEMDBCONNECTION["MT_DRIVER"] = 12] = "MT_DRIVER";
    })(SYSTEMDBCONNECTION = ConfigData.SYSTEMDBCONNECTION || (ConfigData.SYSTEMDBCONNECTION = {}));
    var AuthenticationTypes;
    (function (AuthenticationTypes) {
        AuthenticationTypes[AuthenticationTypes["None"] = 0] = "None";
        AuthenticationTypes[AuthenticationTypes["Secure"] = 1] = "Secure";
        AuthenticationTypes[AuthenticationTypes["Encryption"] = 2] = "Encryption";
        AuthenticationTypes[AuthenticationTypes["SecureSocketsLayer"] = 2] = "SecureSocketsLayer";
        AuthenticationTypes[AuthenticationTypes["ReadonlyServer"] = 4] = "ReadonlyServer";
        AuthenticationTypes[AuthenticationTypes["Anonymous"] = 16] = "Anonymous";
        AuthenticationTypes[AuthenticationTypes["Signing"] = 64] = "Signing";
        AuthenticationTypes[AuthenticationTypes["Sealing"] = 128] = "Sealing";
        AuthenticationTypes[AuthenticationTypes["Delegation"] = 256] = "Delegation";
        AuthenticationTypes[AuthenticationTypes["ServerBind"] = 512] = "ServerBind";
    })(AuthenticationTypes = ConfigData.AuthenticationTypes || (ConfigData.AuthenticationTypes = {}));
    var SearchScope;
    (function (SearchScope) {
        SearchScope[SearchScope["Base"] = 0] = "Base";
        SearchScope[SearchScope["OneLevel"] = 1] = "OneLevel";
        SearchScope[SearchScope["Subtree"] = 2] = "Subtree";
    })(SearchScope = ConfigData.SearchScope || (ConfigData.SearchScope = {}));
})(ConfigData = exports.ConfigData || (exports.ConfigData = {}));
//# sourceMappingURL=ConfigData.js.map