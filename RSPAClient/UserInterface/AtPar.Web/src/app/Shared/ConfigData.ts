export module ConfigData {


    //Configuration File Main Tag
    export enum MASTERCONFIG {
        MASTER_DB
    }



    // Connection information for ATPAR_MT

    export enum MASTER_DB {
        SYSTEMID,
        SERVER,
        USERID,
        DATASOURCE
    }



    export enum CONFIGFILE {
        REMOTEDBCONNECTION,
        EMAILCONFIGARATION,
        SYSTEMPARAMETERS,
        REMOTINGCONFIGARATION,
        LDAPCONFIG,
        SSO,
        HL7,
        ERP_SYS_DETAILS,
        LOG_CONFIG,
        SYSTEMDBCONNECTION,
        ERP_LOGIN_URL,
        ATPAR_SYSTEM
    }

    export  enum ERP_LOGIN_URL {
        PSCILOGINURL,
        LAWSONLOGANLOGINURL
    }


    export  enum DATABASE_TYPES {
        SQLSERVER,
        ORACLE,
        DB2,
        SAP,
        INFORMIX

    }


    //''' <summary>
    //''' Connection information for ERP databases
    //''' </summary>
    //''' <remarks></remarks>
    export enum REMOTEDBCONNECTION {
        //    ''' <summary>
        //''' Database Type e.g. ORACLE, PEOPLESOFT, DB2 etc
        //''' </summary>
        //''' <remarks></remarks>
        DATABASE,

        //''' <summary>
        //''' Schema Name e.g. sysadm
        //''' </summary>
        //''' <remarks></remarks>
        SCHEMA,

        //''' <summary>
        //''' 
        //''' </summary>
        //''' <remarks></remarks>
        DATASOURCE,

        //''' <summary>
        //''' e.g Server/TNS name
        //''' </summary>
        //''' <remarks></remarks>
        SERVER,

        //''' <summary>
        //''' Driver string e.g. {Microsoft ODBC for Oracle}
        //''' </summary>
        //''' <remarks></remarks>
        DRIVER,

        //''' <summary>
        //''' Database userid
        //''' </summary>
        //''' <remarks></remarks>
        USERID,

        //''' <summary>
        //''' AtPar Encrypted Password
        //''' </summary>
        //''' <remarks></remarks>
        PASSWORD,

        NETTRANS,
        HOST,
        SERVICE,
        PROTOCOL,
        MT_DRIVER

    }


    //''' <summary>
    //''' Connection information for ATPAR_MT
    //''' </summary>
    //''' <remarks></remarks>
    export enum LOCALDBCONNECTION {
        //''' <summary>
        //''' Database type e.g. SQLSERVER
        //''' </summary>
        //''' <remarks></remarks>
        DATABASE,

        //''' <summary>
        //''' Userid of the DB user
        //''' </summary>
        //''' <remarks></remarks>
        USERID,

        //''' <summary>
        //''' AtPar Encrypted Password
        //''' </summary>
        //''' <remarks></remarks>
        PASSWORD,

        //''' <summary>
        //''' Database name e.g. ATPAR_MT
        //''' </summary>
        //''' <remarks></remarks>
        DATASOURCE,

        //''' <summary>
        //''' Server FQDN or IP or instance name
        //''' </summary>
        //''' <remarks></remarks>
        SERVER,

        //''' <summary>
        //''' Driver String e.g. {SQL Server}
        //''' </summary>
        //''' <remarks></remarks>
        DRIVER
    }
    //End Enum
    //''' <summary>
    //''' Email information for automated mails from the system
    //''' </summary>
    //''' <remarks></remarks>
    export  enum EMAILCONFIGARATION {
        //''' <summary>
        //''' FQDN or IP address of the SMTP server
        //''' </summary>
        //''' <remarks></remarks>
        SMTP_SERVER,

        //''' <summary>
        //''' TCP Port the server is listening on
        //''' </summary>
        //''' <remarks></remarks>
        SMTP_SERVER_PORT,

        SMTP_ACCOUNT_NAME,
        SMTP_MAIL_ADDRESS,
        SMTP_AUTHENTICATE,
        SMTP_USE_SSL,
        SMTP_PASSWORD,
        SMTP_SEND_USING,
        SMTP_USER_NAME

    }

    export enum SYSTEMPARAMETERS {
        DEBUGBINTOBIN,
        DEBUGCARTCOUNT,
        DEBUGCYCLECOUNT,
        DEBUGDELIVER,
        DEBUGPICKPLAN,
        DEBUGPUTAWAY,
        DEBUGRECEIVING,
        DEBUGSTOCKISSUE,
        DEBUGUSERMANAGEMENT,
        ERRORLOGLEVEL,
        ERRORLOGPATH

    }

    export enum REMOTINGCONFIGARATION {
        MONIKER,
        HOST,
        PORT
    }

    export enum LDAPCONFIG {


        SERVERNAME,
        PROTOCOL,
        CERTIFICATE,
        BASEDN,
        OBJECTCLASS,
        USERNAME,
        PASSWORD,
        USERID,
        FIRSTNAME,
        LASTNAME,
        MIDDLEINITIAL,
        EMAILID,
        PHONE,
        FAX,
        AUTHTYPE,
        SEARCHSCOPE,
        SEARCHFILTER,
        ENTRYLIMIT,
        ACNTSTATRULE,
    }

    export enum SSO {
        SSO_ENABLED,
        SSO_VARIABLE,
        SSO_COOKIE_NAME,
        SSO_LOGOUT_PAGE,
    }





    export  enum DBCONN_STRING {
        LOCALDBCONNSTRING,
        REMOTEDBCONNSTRING,
        DECRYPTPASSWORD,
        MASTER_DB
    }



    export enum HL7 {
        SENDING_APPLICATION,
        SENDING_FACILITY,
        RECEIVING_APPLICATION,
        RECEIVING_FACILITY,
        ADT_LISTENER_PORT,
        BILLING_UPLOAD_PATH,
        ADT_VERSION,
        ADT_BILLING_SEND_ADDRESS,
        ADT_BILLING_SEND_PORT,
        ADT_BILLING_THRESHOLD_VALUE,
        PROCESS_ADT_BILLING,
        PROCESS_ADT_LISTENER,
        ADT_MESSAGE_TYPE,
        ADT_CASE_MESSAGE_TYPE,
        CASE_INFORMATION_SYSTEM,
        CASE_INFO_DATABASE,
        CASE_INFO_DB_SCHEMA,
        CASE_INFO_DB_USERID,
        CASE_INFO_DB_PASSWORD,
        CASE_INFO_DB_SERVER,
        CASE_INFO_DB_DRIVER,
        CASE_INFO_DB_DATASOURCE,
        ADT_EMAILID,
        BILLING_MSG_BY_TRANSACTION
    }


    export enum ATPAR_SYSTEM {
        RECALL_MGMT_IMPLEMENTED,
        PROTOCOL,
        SERVERNAME,
        PORTNO,
        PREPICK_QA_PROCESS_REQUIRED,

    }
    export enum ConfigurationManager_Tabs {

        ERP_SYS_DETAILS = 1,
        REMOTEDBCONNECTION = 2,
        SYSTEMDBCONNECTION = 3,
        ATPAR_SYSTEM = 4,
        EMAILCONFIGARATION = 5,
        SYSTEMPARAMETERS = 6,
        LDAPCONFIG = 7,
        SSO = 8,
        LOG_CONFIG = 9,
        REMOTINGCONFIGARATION = 10,
        HL7 = 11,
        REPORTSCONFIGDBCONNECTION = 12,
        REPORTSDBCONNECTION = 13

    }

    export enum LOG_CONFIG {
        WEBPAGES_LOGLEVEL,
        WEBSERVICES_LOGLEVEL,
        BUSINESSRULE_LOGLEVEL
    }



   export enum ERP_SYS_DETAILS {
        ENTERPRISESYSTEM,
        ERPUSERID,
        ERPPASSWORD,
        ERPSERVER,
        PRODUCTLINE,
        ERPPORTAL,
        ERPNODE,
        ERPWEBSERVERPORT,
        ERPSITE,
        ERPSICOMPINTERFACE,
        EXP_PUTAWAY_CI_NAME,
        RMA_CI_NAME,
        DOWNLOADFILEPATH,
        UPLOADFILEPATH,
        UPLOADFREQUENCY,
        RECV_DOWNLOADFREQUENCY,
        EMPLOYEE_DATALOAD_FREQ,
        STOCKLESS_FILETYPE,
        PAR_ITEMLOAD_FREQUENCY,
        FREQ_DL_PICKPLNS,
        FREQ_DL_SI,
        FREQ_VNDR_UPDATES,
        PKPL_OUTPUT_FILE_TYPE,
        RECV_NPR_REPORT_SCHTIME,
        PICK_PLAN_NPR_REPORT_SCHTIME,
        SI_NPR_SCHED_TIME,
        PARITEMSLOAD_REPORT_SCHTIME,
        PAR_VENDOR_LOAD_FREQUENCY,
        CLIENTCODE,
        SYSNR,
        ERRORLOGCYCLEFREQ,
        PENDINGFILE_CHECK_FREQ,
        SUPPORT_MAILID,
        VERSION,
        CUSTOMER_NAME,
        CONNECTIONSTRING,
        ENTERPRISEVERSION,
        DOWNLOADFROM,
        UPLOADTO,
        POU_SERVICE_FREQ,
        ERPPOGENCOMPINTERFACE,
        CUSTOMWEBLIBRARY,
        RMA_RECEIPT_CI_NAME,
        SERVERTYPE

    }




    export enum SYSTEMDBCONNECTION {
        //''' <summary>
        //''' Database type e.g. SQLSERVER
        //''' </summary>
        //''' <remarks></remarks>
        DATABASE,

        //''' <summary>
        //''' Userid of the DB user
        //''' </summary>
        //''' <remarks></remarks>
        USERID,

        //''' <summary>
        //''' AtPar Encrypted Password
        //''' </summary>
        //''' <remarks></remarks>
        PASSWORD,

        //''' <summary>
        //''' Database name e.g. ATPAR_MASTER
        //''' </summary>
        //''' <remarks></remarks>
        DATASOURCE,

        //''' <summary>
        //''' Server FQDN or IP or instance name
        //''' </summary>
        //''' <remarks></remarks>
        SERVER,

        //''' <summary>
        //''' Driver String e.g. {SQL Server}
        //''' </summary>
        //''' <remarks></remarks>
        DRIVER,

        ARCHIVE_DATABASE,
        ARCHIVE_DATASOURCE,
        ARCHIVE_USERID,
        ARCHIVE_PASSWORD,
        ARCHIVE_SERVER,
        ARCHIVE_DRIVER,
        MT_DRIVER

    }

    export enum REPORTSCONFIGDBCONNECTION {
        //''' <summary>
        //''' Database type e.g. SQLSERVER
        //''' </summary>
        //''' <remarks></remarks>
        DATABASE,

        //''' <summary>
        //''' Userid of the DB user
        //''' </summary>
        //''' <remarks></remarks>
        USERID,

        //''' <summary>
        //''' AtPar Encrypted Password
        //''' </summary>
        //''' <remarks></remarks>
        PASSWORD,

        //''' <summary>
        //''' Database name e.g. ATPAR_MASTER
        //''' </summary>
        //''' <remarks></remarks>
        DATASOURCE,

        //''' <summary>
        //''' Server FQDN or IP or instance name
        //''' </summary>
        //''' <remarks></remarks>
        SERVER,

        //''' <summary>
        //''' Driver String e.g. {SQL Server}
        //''' </summary>
        //''' <remarks></remarks>
        DRIVER,

        STARTER_API_DATABASE,
        STARTER_API_DATASOURCE,
        STARTER_API_USERID,
        STARTER_API_PASSWORD,
        STARTER_API_SERVER,
        STARTER_API_DRIVER,
        MT_DRIVER

    }

    export enum REPORTSDBCONNECTION {
        //''' <summary>
        //''' Database type e.g. SQLSERVER
        //''' </summary>
        //''' <remarks></remarks>
        DATABASE,

        //''' <summary>
        //''' Userid of the DB user
        //''' </summary>
        //''' <remarks></remarks>
        USERID,

        //''' <summary>
        //''' AtPar Encrypted Password
        //''' </summary>
        //''' <remarks></remarks>
        PASSWORD,

        //''' <summary>
        //''' Database name e.g. ATPAR_MASTER
        //''' </summary>
        //''' <remarks></remarks>
        DATASOURCE,

        //''' <summary>
        //''' Server FQDN or IP or instance name
        //''' </summary>
        //''' <remarks></remarks>
        SERVER,

        //''' <summary>
        //''' Driver String e.g. {SQL Server}
        //''' </summary>
        //''' <remarks></remarks>
        DRIVER,



    }
    export enum AuthenticationTypes {
        None = 0,
        Secure = 1,
        Encryption = 2,
        SecureSocketsLayer = 2,
        ReadonlyServer = 4,
        Anonymous = 16,
        Signing = 64,
        Sealing = 128,
        Delegation = 256,
        ServerBind = 512
    }
    export enum SearchScope
    {
        Base = 0,
        OneLevel = 1,
        Subtree=2
    }
}





