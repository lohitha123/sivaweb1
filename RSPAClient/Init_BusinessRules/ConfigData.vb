Module ConfigData

#Region "[ Config File ]"
    'Public config_file_elements() As String = {"MASTER_DB"}

    ''' <summary>
    ''' Configuration File Main Tag
    ''' </summary>
    ''' <remarks></remarks>
    Enum MASTERCONFIG
        MASTER_DB
    End Enum

    ''' <summary>
    ''' Connection information for ATPAR_MT
    ''' </summary>
    ''' <remarks></remarks>
    Enum MASTER_DB

        ''' <summary>
        ''' System Id e.g. System1, System2 ..
        ''' </summary>
        ''' <remarks></remarks>
        SYSTEMID

        ''' <summary>
        ''' Server FQDN or IP or instance name
        ''' </summary>
        ''' <remarks></remarks>
        SERVER

        ''' <summary>
        ''' Userid of the DB user
        ''' </summary>
        ''' <remarks></remarks>
        USERID

        ''' <summary>
        ''' AtPar Encrypted Password
        ''' </summary>
        ''' <remarks></remarks>
        PASSWORD

        ''' <summary>
        ''' Database name e.g. ATPAR_MT
        ''' </summary>
        ''' <remarks></remarks>
        DATASOURCE
    End Enum
#End Region

#Region "[ Common Functions ]"
    ' TODO this should be a common function used by all
    Public Function EName(Of E)(ByVal val As Integer) As String
        Return [Enum].GetName(GetType([E]), val)
    End Function
#End Region

#Region "[ System Configuration ]"
    Public config_file_elements() As String = {"MASTER_DB", "REMOTEDBCONNECTION", "LOCALDBCONNECTION", "EMAILCONFIGARATION", _
                                                "SYSTEMPARAMETERS", "REMOTINGCONFIGARATION", "LDAPCONFIG", _
                                                "SSO", "ERP_LOGIN_URL", "HL7", "ERP_SYS_DETAILS", _
                                                "LOG_CONFIG", "ATPAR_SYSTEM"}

    Enum CONFIGFILE
        REMOTEDBCONNECTION
        EMAILCONFIGARATION
        SYSTEMPARAMETERS
        REMOTINGCONFIGARATION
        LDAPCONFIG
        SSO
        HL7
        ERP_SYS_DETAILS
        LOG_CONFIG
        SYSTEMDBCONNECTION
        ERP_LOGIN_URL
        ATPAR_SYSTEM
    End Enum

    Enum ERP_LOGIN_URL
        PSCILOGINURL
        LAWSONLOGANLOGINURL
    End Enum


    Enum DATABASE_TYPES
        SQLSERVER
        ORACLE
        DB2
        SAP
		INFORMIX
    End Enum

    ''' <summary>
    ''' Connection information for ERP databases
    ''' </summary>
    ''' <remarks></remarks>
    Enum REMOTEDBCONNECTION

        ''' <summary>
        ''' Database Type e.g. ORACLE, PEOPLESOFT, DB2 etc
        ''' </summary>
        ''' <remarks></remarks>
        DATABASE

        ''' <summary>
        ''' Schema Name e.g. sysadm
        ''' </summary>
        ''' <remarks></remarks>
        SCHEMA

        ''' <summary>
        ''' 
        ''' </summary>
        ''' <remarks></remarks>
        DATASOURCE

        ''' <summary>
        ''' e.g Server/TNS name
        ''' </summary>
        ''' <remarks></remarks>
        SERVER

        ''' <summary>
        ''' Driver string e.g. {Microsoft ODBC for Oracle}
        ''' </summary>
        ''' <remarks></remarks>
        DRIVER

        ''' <summary>
        ''' Database userid
        ''' </summary>
        ''' <remarks></remarks>
        USERID

        ''' <summary>
        ''' AtPar Encrypted Password
        ''' </summary>
        ''' <remarks></remarks>
        PASSWORD

        NETTRANS
        HOST
        SERVICE
        PROTOCOL

               
    End Enum

    ''' <summary>
    ''' Connection information for ATPAR_MT
    ''' </summary>
    ''' <remarks></remarks>
    Enum LOCALDBCONNECTION
        ''' <summary>
        ''' Database type e.g. SQLSERVER
        ''' </summary>
        ''' <remarks></remarks>
        DATABASE

        ''' <summary>
        ''' Userid of the DB user
        ''' </summary>
        ''' <remarks></remarks>
        USERID

        ''' <summary>
        ''' AtPar Encrypted Password
        ''' </summary>
        ''' <remarks></remarks>
        PASSWORD

        ''' <summary>
        ''' Database name e.g. ATPAR_MT
        ''' </summary>
        ''' <remarks></remarks>
        DATASOURCE

        ''' <summary>
        ''' Server FQDN or IP or instance name
        ''' </summary>
        ''' <remarks></remarks>
        SERVER

        ''' <summary>
        ''' Driver String e.g. {SQL Server}
        ''' </summary>
        ''' <remarks></remarks>
        DRIVER
    End Enum
    ''' <summary>
    ''' Email information for automated mails from the system
    ''' </summary>
    ''' <remarks></remarks>
    Enum EMAILCONFIGARATION
        ''' <summary>
        ''' FQDN or IP address of the SMTP server
        ''' </summary>
        ''' <remarks></remarks>
        SMTP_SERVER

        ''' <summary>
        ''' TCP Port the server is listening on
        ''' </summary>
        ''' <remarks></remarks>
        SMTP_SERVER_PORT

        SMTP_ACCOUNT_NAME
        SMTP_MAIL_ADDRESS
        SMTP_AUTHENTICATE
        SMTP_USE_SSL
        SMTP_PASSWORD
        SMTP_SEND_USING
        SMTP_USER_NAME

  End Enum

    Enum SYSTEMPARAMETERS

        DEBUGBINTOBIN
        DEBUGCARTCOUNT
        DEBUGCYCLECOUNT
        DEBUGDELIVER
        DEBUGPICKPLAN
        DEBUGPUTAWAY
        DEBUGRECEIVING
        DEBUGSTOCKISSUE
        DEBUGUSERMANAGEMENT
        ERRORLOGLEVEL
        ERRORLOGPATH
       
    End Enum

    Enum REMOTINGCONFIGARATION
        MONIKER
        HOST
        PORT
    End Enum

    Enum LDAPCONFIG
        SERVERNAME
        PROTOCOL
        CERTIFICATE
        BASEDN
        OBJECTCLASS
        USERNAME
        PASSWORD
        USERID
        FIRSTNAME
        LASTNAME
        MIDDLEINITIAL
        EMAILID
        PHONE
        FAX
        AUTHTYPE
        SEARCHSCOPE
        SEARCHFILTER
        ENTRYLIMIT
        ACNTSTATRULE
    End Enum

    Enum SSO
        SSO_ENABLED
        SSO_VARIABLE
        SSO_COOKIE_NAME
        SSO_LOGOUT_PAGE
    End Enum
   


    Enum DBCONN_STRING
        LOCALDBCONNSTRING
        REMOTEDBCONNSTRING
        DECRYPTPASSWORD
        MASTER_DB
    End Enum
   
    Enum HL7
        SENDING_APPLICATION
        SENDING_FACILITY
        RECEIVING_APPLICATION
        RECEIVING_FACILITY
        ADT_LISTENER_PORT
        BILLING_UPLOAD_PATH
        ADT_VERSION
        ADT_BILLING_SEND_ADDRESS
        ADT_BILLING_SEND_PORT
        ADT_BILLING_THRESHOLD_VALUE
        PROCESS_ADT_BILLING
        PROCESS_ADT_LISTENER
		ADT_MESSAGE_TYPE
		ADT_CASE_MESSAGE_TYPE 
        CASE_INFORMATION_SYSTEM
        CASE_INFO_DATABASE
		CASE_INFO_DB_SCHEMA
		CASE_INFO_DB_USERID
		CASE_INFO_DB_PASSWORD
		CASE_INFO_DB_SERVER
		CASE_INFO_DB_DRIVER
		CASE_INFO_DB_DATASOURCE	
		ADT_EMAILID
        BILLING_MSG_BY_TRANSACTION
        DATA_REPLACEMENT_BY_PREF
    End Enum
    Enum ATPAR_SYSTEM
        RECALL_MGMT_IMPLEMENTED
		PROTOCOL
		SERVERNAME
		PORTNO
		PREPICK_QA_PROCESS_REQUIRED
    End Enum
	Public Enum ConfigurationManager_Tabs
        ERP_SYS_DETAILS = 1
        REMOTEDBCONNECTION = 2
        SYSTEMDBCONNECTION = 3
        ATPAR_SYSTEM = 4
        EMAILCONFIGARATION = 5
        SYSTEMPARAMETERS = 6
        LDAPCONFIG = 7
        SSO = 8
        LOG_CONFIG = 9
        REMOTINGCONFIGARATION = 10
        HL7 = 11
    End Enum

    Public Enum LOG_CONFIG
        WEBPAGES_LOGLEVEL
        WEBSERVICES_LOGLEVEL
        BUSINESSRULE_LOGLEVEL
    End Enum

    Enum ERP_SYS_DETAILS

        ENTERPRISESYSTEM
        ERPUSERID
        ERPPASSWORD
        ERPSERVER
        PRODUCTLINE
        ERPPORTAL
        ERPNODE
        ERPWEBSERVERPORT
        ERPSITE
        ERPSICOMPINTERFACE
        EXP_PUTAWAY_CI_NAME
        RMA_CI_NAME
        DOWNLOADFILEPATH
        UPLOADFILEPATH
        UPLOADFREQUENCY
        RECV_DOWNLOADFREQUENCY
        EMPLOYEE_DATALOAD_FREQ
        STOCKLESS_FILETYPE
        PAR_ITEMLOAD_FREQUENCY
        FREQ_DL_PICKPLNS
        FREQ_DL_SI
        FREQ_VNDR_UPDATES
        PKPL_OUTPUT_FILE_TYPE
        RECV_NPR_REPORT_SCHTIME
        PICK_PLAN_NPR_REPORT_SCHTIME
        SI_NPR_SCHED_TIME
        PARITEMSLOAD_REPORT_SCHTIME
        PAR_VENDOR_LOAD_FREQUENCY
        CLIENTCODE
        SYSNR
        ERRORLOGCYCLEFREQ
        PENDINGFILE_CHECK_FREQ
        SUPPORT_MAILID
        VERSION
        CUSTOMER_NAME
        CONNECTIONSTRING
        ENTERPRISEVERSION
        DOWNLOADFROM
        UPLOADTO
        POU_SERVICE_FREQ
        ERPPOGENCOMPINTERFACE
        CUSTOMWEBLIBRARY
		RMA_RECEIPT_CI_NAME
        SERVERTYPE
		FREQ_DL_PUTAWAYPLNS
    End Enum

    Enum SYSTEMDBCONNECTION

        ''' <summary>
        ''' Database type e.g. SQLSERVER
        ''' </summary>
        ''' <remarks></remarks>
        DATABASE

        ''' <summary>
        ''' Userid of the DB user
        ''' </summary>
        ''' <remarks></remarks>
        USERID

        ''' <summary>
        ''' AtPar Encrypted Password
        ''' </summary>
        ''' <remarks></remarks>
        PASSWORD

        ''' <summary>
        ''' Database name e.g. ATPAR_MASTER
        ''' </summary>
        ''' <remarks></remarks>
        DATASOURCE

        ''' <summary>
        ''' Server FQDN or IP or instance name
        ''' </summary>
        ''' <remarks></remarks>
        SERVER

        ''' <summary>
        ''' Driver String e.g. {SQL Server}
        ''' </summary>
        ''' <remarks></remarks>
        DRIVER
		
		ARCHIVE_DATABASE
		ARCHIVE_DATASOURCE
		ARCHIVE_USERID
		ARCHIVE_PASSWORD
		ARCHIVE_SERVER
		ARCHIVE_DRIVER

    End Enum

	
#End Region

End Module
