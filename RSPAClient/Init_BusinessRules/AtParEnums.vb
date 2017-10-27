Module AtparEnums

    ''' <summary>
    ''' Used to define table names when passing data between client and server
    ''' </summary>
    ''' <remarks></remarks>
    Enum DataSet_Type
        ''' <summary>
        ''' Header tables (cart_id, po_id etc)
        ''' </summary>
        ''' <remarks></remarks>
        HEADERS

        ''' <summary>
        ''' line items etc
        ''' </summary>
        ''' <remarks></remarks>
        DETAILS

        ''' <summary>
        ''' lot number, serial numbers etc
        ''' </summary>
        ''' <remarks></remarks>
        SUBDETAILS

        ''' <summary>
        ''' data gathered (parameters) in the businessrules
        ''' </summary>
        ''' <remarks></remarks>
        PREREQDATA

        ''' <summary>
        ''' data sent back by the server to the client
        ''' </summary>
        ''' <remarks></remarks>
        OUTPUT

        ''' <summary>
        ''' TODO
        ''' </summary>
        ''' <remarks></remarks>
        TRANSACTIONS

        ''' <summary>
        ''' multiple businessunits sent to the server
        ''' </summary>
        ''' <remarks></remarks>
        BUSINESSUNITS

        ''' <summary>
        ''' List View Required Fields for CartItems
        ''' </summary>
        ''' <remarks></remarks>
        PREREQLISTVIEWPARAMS

        ''' <summary>
        ''' Type of DataSet used for uploading in user upload automation
        ''' </summary>
        ''' <remarks></remarks>
        USER

        ''' <summary>
        ''' Type of DataSet used for uploading in user upload automation
        ''' </summary>
        ''' <remarks></remarks>
        PROFILE

        ''' <summary>
        ''' Type of DataSet used for uploading in user upload automation
        ''' </summary>
        ''' <remarks></remarks>
        ORG


        ''' <summary>
        ''' Receiver IDs sent back from the ERP
        ''' </summary>
        ''' <remarks></remarks>
        RECEIVERIDS

        ''' <summary>
        ''' Locations sent back from the ERP
        ''' </summary>
        ''' <remarks></remarks>
        LOCATIONS

		''' <summary>
        ''' Alternate UOMS
        ''' </summary>
        ''' <remarks></remarks>
        ALTERNATEUOMS
        ''' <summary>
        ''' Cart count Atpar Order Details
        ''' </summary>
        ''' <remarks></remarks>
        ORDER_DETAILS
        ''' <summary>
        ''' Deliver PO details
        ''' </summary>
        ''' <remarks></remarks>
        PODETAILS
        ''' <summary>
        ''' Deliver NONPO details
        ''' </summary>
        ''' <remarks></remarks>
        NONPODETAILS
		''' <summary>
        ''' PICK PLAN ORDER PREFIX
        ''' </summary>
        ''' <remarks></remarks>
        ORDER_PREFIX

        ''' <summary>
        ''' PICK PLAN LOCATION BUSINESSUNIT
        ''' </summary>
        ''' <remarks></remarks>
        LOCATION_BUSINESSUNIT

        ''' <summary>
        ''' PICK PLAN EXCLUDE ORDERS
        ''' </summary>
        ''' <remarks></remarks>
        EXCLUDE_ORDERS


        ''' <summary>
        ''' ALTERNATE LOCATIONS
        ''' </summary>
        ''' <remarks></remarks>
		ALTERNATELOCATIONS
		

        ''' <summary>
        ''' INVENTORY BUSINESS UNITS
        ''' </summary>
        ''' <remarks></remarks>
        INVENTORY_BUSINESSUNITS

        ''' <summary>
        ''' Substitute Items
        ''' </summary>
        ''' <remarks></remarks>
        SUBSTITUTEITEMS

        ''' <summary>
        ''' New Details
        ''' </summary>
        ''' <remarks></remarks>
        NEWDETAILS

        ''' <summary>
        ''' CONFIGDETAILS
        ''' </summary>
        ''' <remarks></remarks>
        CONFIGDETAILS

        ''' <summary>
        ''' RECALLITEMS
        ''' </summary>
        ''' <remarks></remarks>
        RECALLITEMS

        ''' <summary>
        ''' PICK PLAN STORAGE LOCATION
        ''' </summary>
        ''' <remarks></remarks>
        STORAGE_LOCATION
		
		 ''' <summary>
        ''' POU Inventory Location Lot/Serial Info
        ''' </summary>
        ''' <remarks></remarks>
        LOTSERIAL_INFO

        ''' <summary>
        ''' Auto putaway details
        ''' </summary>
        ''' <remarks></remarks>
        AUTOPUTAWAY_DETAILS

        ''' <summary>
        ''' Auto putaway header
        ''' </summary>
        ''' <remarks></remarks>
        AUTOPUTAWAY_HEADER

        ''' <summary>
        ''' Notes Details
        ''' </summary>
        ''' <remarks></remarks>
        NOTES_DETAILS

        ''' <summary>
        ''' Case Header
        ''' </summary>
        ''' <remarks></remarks>
        CASE_HEADER

        ''' <summary>
        ''' Case Details
        ''' </summary>
        ''' <remarks></remarks>
        CASE_DETAILS

    End Enum

    ''' <summary>
    ''' Sheet Names or DataSet Names in User DataSet
    ''' </summary>
    Public Enum Enum_UserData
        UserData
        ProfileJobRef
        UserErrorData
        SUMMARY
    End Enum
	
	Public Enum SAVETYPE
        SAVE_EXIT
        SAVE
    End Enum

    Public Enum Enum_Upload_Summary
        TOTAL_REC_CNT = 0
        SUCCESS_CNT
        FAILURE_CNT
        ADDED_CNT
        UPDATED_CNT
		WARNING_CNT
    End Enum

    Public Enum Send_Notes_Input_DETAILS_Enum
        KEY_1 = 0
        KEY_2
        KEY_3
        KEY_4
        KEY_5
        KEY_6
        KEY_7
        KEY_8
        KEY_9
        KEY_10
        KEY_11
        KEY_12
        KEY_13
        APP_ID
        SCREEN_NAME
        TRANS_ID
        CODE
        NOTES
        DATE_TIME
    End Enum

    Public Enum Enum_Case_Header
        PATIENT_MRC = 0
        CASE_ID
        CASE_DESC
        ROOM_ID
        PERFORM_DATETIME
        PROCEDURE_ID
        PROCEDURE_DESC
        PREF_LIST_ID
        PREF_LIST_DESC
        PHYSICIAN_ID
        PHYSICIAN_FN
        PHYSICIAN_LN
        PHYSICIAN_MN
        DEPT_ID
        COST_CENTER_CODE
    End Enum

    Public Enum Enum_Case_Details
        CASE_ID
        ITEM_ID
        ITEM_DESC
        ITEM_INVENTORY
        PICK_QTY
        HOLD_QTY
        PREF_LIST_ID
        PROCEDURE_ID
    End Enum

    Public Enum Enum_OrgGroupData
        OrgGroupParams
        OrgGroupBU
        OrgGroupErrorData
        SUMMARY
    End Enum

    Public Enum Enum_ProfileData
        ProfileTemplateRef
        ProfileParameters
        ProfileSetup
        ProfileMenus
        Screendisplay
        ProfileTemplateRefErrorData
        ProfileParametersErrorData
        ProfileMenusErrorData
        ProfileScreendisplayErrorData
        SUMMARY
    End Enum

    Public Enum JitData
        ISA
        U
        GS
        PO
        X
        ST
        VN
        BEG
        SA
        N1
        N3
        N4
        PO1
        PID
        F
        SE
        CTT
        GE
        IEA
        [IN]
        X12
    End Enum

    Public Enum Enum_Protocol
        HTTP
        HTTPS
    End Enum
    Public Enum CartFileType
        ItemChanges = 0
        VendorChanges = 1
        Orders = 2
        ERPMapping = 3
        ParLoc_Maintenance = 4
    End Enum

    Public Enum Enum_ErrorType
        [Error] = 0
        Warning = 1
    End Enum
	
    Public Enum Enterprise_Enum
        Meditech_Magic
        Meditech_CS
        Meditech_ASCII
        Meditech_XML
        Peoplesoft
        Lawson
        Meditech_NUI
        PMM
        Matkon
        GEAC
        Oracle
        Medseries4
        SAP
        IMMS
    End Enum

    ''' <summary>
    ''' Enum that defines the Status Code
    ''' </summary>
    Public Enum TOGGLE
        Activate = 1
        InActivate = 0
    End Enum
    ''' <summary>
    ''' Enum that defines the columns of a Header/Detail enum
    ''' </summary>
    Enum TableCols
        ''' <summary>
        ''' Friendly string representation of the table's column, used by the programmer (will match enum name)
        ''' </summary>
        FRIENDLY_NAME = 0

        ''' <summary>
        ''' the string representation of the field as sent over SOAP (will match enum value)
        ''' </summary>
        XML_TAG_ID = 1

        ''' <summary>
        ''' System.Data.DataColumn.DataType (should match the database)
        ''' </summary>
        ''' <remarks>Can be one of:
        ''' Boolean 
        ''' Byte 
        ''' Char 
        ''' DateTime 
        ''' Decimal 
        ''' Double 
        ''' Int16 
        ''' Int32 
        ''' Int64 
        ''' SByte 
        ''' Single 
        ''' String 
        ''' TimeSpan 
        ''' UInt16 
        ''' UInt32 
        ''' UInt64
        '''</remarks>
        DATA_TYPE = 2

        ''' <summary>
        ''' "Y" if Unique, "N" if not
        ''' </summary>
        UNIQUE = 3

        ''' <summary>
        ''' "Y" if nulls allowed, "N" if not
        ''' </summary>
        ALLOW_NULL = 4

        ''' <summary>
        ''' "Y" if this field is a part of the primary key, "N" if not
        ''' </summary>
        PRIMARY_KEY = 5
    End Enum

    ''' <summary>
    ''' Enum that defines properties recognised by log4net
    ''' </summary>
    Enum LOGPROPERTIES
        PRODUCTNAME
        USER
        USERNAME
		SYSTEMID
    End Enum

	Enum Enum_ResourcesFiles
		Atpar_WebResources
    End Enum

    Enum Enum_ServiceType
        REF_DB
        ALERT_DB
        FTP_INFO
    End Enum
    Enum Enum_Recall_Service_JobIds
        GET_RECALL_INFO
        FTP_MASTER_ITEMS
    End Enum
	
    Enum Enum_IssueCommand_Actions
        LOGIN = 0
        LOGGEDIN = 1
        LOGOUT = 2
		TIMEDOUTLOGIN = 3
    End Enum

    Public Enum Log_Msg_Mode
        DEBUG = 0
        INFO = 1
        WARN = 2
        FATAL = 3
    End Enum


#Region "Enums used by the family rules xml reading engine"

    ''' <summary>
    ''' Data types used in the data_types attribute
    ''' </summary>
    ''' <remarks>The xml parsing engine (in atpar) will perform some logic based on each entry in here</remarks>
    Enum DATATYPES
        ''' <summary>
        ''' Fields marked as Number will be substituted as is in the SQL
        ''' </summary>
        ''' <remarks></remarks>
        [NUMBER]

        ''' <summary>
        ''' Fields marked as String will be pre/suffixed with a ' (i.e. valid string variable in all databases)
        ''' </summary>
        ''' <remarks></remarks>
        [STRING]

        ''' <summary>
        ''' Fields marked as Datetime will be converted per REMOTE_DB_TYPE to a format acceptable by the selected db
        ''' </summary>
        ''' <remarks>SQL Server : CONVERT(DateTime, 'field value', 120); Oracle :TO_DATE('field value', 'ATPAR_ORA_DATETIME_24H')</remarks>
        [DATETIME]

        ''' <summary>
        ''' Fields marked as CURR_DB_DATETIME will be converted per REMOTE_DB_TYPE to a format acceptable by the selected db
        ''' </summary>
        ''' <remarks>SQL Server : GETDATE(); Oracle :SYSDATE</remarks>
        [CURR_DB_DATETIME]
    End Enum

	Enum VALUETYPES
        [ERP]
        [ATPAR_CONDITION]
        [ATPAR_LOCAL]
        [ATPAR_HEADER]
        [ATPAR_DETAILS]
        [ATPAR_PREREQ]
        [DEFAULT]
        [HEADER_ERP]
        [ALTERNATE_LOCATIONS]
        [GET_SEQ_NO]
    End Enum

#End Region

    ''' <summary>
    ''' Enum that defines Y and N, use YesNo_Enum.Y.ToString to compare against "Y"
    ''' </summary>
    Enum YesNo_Enum
        Y = 0
        N = 1
    End Enum
    ''' <summary>
    ''' Enum that defines Y ,N and I, use YesNo_Enum.Y.ToString to compare against "Y"
    ''' </summary>
    Enum Toggle_Enum
        Y = 0
        N = 1
        I = 2
		P = 3
    End Enum

    ''' <summary>
    ''' Enum that defines AtPar Application Transaction Status
    ''' </summary>
    Public Enum AppTransactionStatus
        Downloaded = 1          ' Downloaded
        PutAway = 4
        Receive = 5
        OrderOpen = 5           ' Order Status = Open
        Success = 2             ' Patient Charge captured success
        Charged = 3             ' Patient Charge captured status from Client
        Sent = 11               ' Status = sent
        Unlock = 12             ' Status = Unlock
        Cancel = 13             ' Status = Cancel/Delete
        RemoteSucess = 14       ' Status = Remote method success
        Issued = 6              ' Status = Issued in StockIssue app
        CartPutAwayDownload = 7

        Revised = 8
        [Error] = 10            ' Status = Error
        EventCounting = 4       ' Status = counting
        EventCountComplete = 7  ' Status = completed
        Returned = 16

        'Stock Issue Transaction Status.
        statCISuccess = 17
        statEIPSuccess = 18

        statOrdSent = 10            ' Order Status = Sent
        statOrdPartiallySent = 12   ' Order Status = Partially Sent
        statOrdRecv = 15            ' Order Status = Received
        statOrdCancel = 20          ' Order Status = Received

        ' Detail Transaction Status  
        statPickup = 20            ' Status = Pickup  
        statLoad = 30              ' Status = Load  
        statUnload = 40            ' Status = Unload(DropOff)  
        statDelivery = 50          ' Status = Delivery(DropAt)  
        statTake = 55
        statReturn = 60

        statDetailReceive = 0     ' Status = received in receiving app in detail transaction  
        statDetailOpen = -5       ' Status = open in receiving app in detail transaction  
        CycleCount = 2
        CaseIssued = 25
        CaseReturn = 26           ' Actual status sent from HHT will be 16 itself but we are using enum as 26 
        ReConIssue = 27             'Added to display return and issue quantities separately in transaction history report
        ' to differentiate from return and case return
        CasePick = 3
		Handover = 100

        statDetailPick = 0

        PharmacyPreparation = 20
        PharmacyVerification1 = 25
        PharmacyVerification2 = 30
        PharmacyStaged = 40
        PharmacyDeliver = 50
		POUPick = 28
		
    End Enum

    Enum Allocation_Action
        Copy
        Move
        Delete
    End Enum

    Enum Mode_Enum
        ADD
        UPDATE
    End Enum

    Enum ScheduleType_Enum
        Days = 5
        Intervals = 10
    End Enum

    Enum DayOfWeek_Enum
        Monday = 1
        Tuesday = 2
        Wednesday = 3
        Thursday = 4
        Friday = 5
        Saturday = 6
        Sunday = 7
    End Enum

'To be Removed once this is integrated using  Detail Transaction Status
	Public Enum EventStatus_Enum
        Pick = 20
        Load = 30
        UnLoad = 40
        Deliver = 50
        Take = 55
        Returns = 60
    End Enum

#Region "Auth Services"

    ''' <summary>
    ''' Fields defined in DeviceTokenEntry
    ''' </summary>
    ''' <remarks></remarks>
    Enum TokenEntry_Enum
        UserID = 0
        AccessToken = 1
        DeviceID = 2
        DateTime = 3
        ProfileID = 4
        OrgGrpID = 5
        LdapUser = 6
        ClientType = 7
        SystemId = 8
		DeptID=9
    End Enum
	
	Enum Processed_File_Type
		S = 1 ' Supply
		I = 2 ' Implant
		B = 3 ' Both
	End Enum

#End Region

    Public Enum ORDERSTATUS
        OPEN = 5
        SENT = 10
        RECV = 15
        CANCEL = 20
        PARTIALLY_RECEIVED = 25
    End Enum

    Public Enum EnumApps
        Auth = 0
        Init = 1
        CartCount = 2
        CycleCount = 3
        Receiving = 4
        PickPlan = 5
        Deliver = 6
        PutAway = 7
        MAgent = 8
        TrackIT = 9
        StockIssue = 10
        AssetManagement = 11
        BinToBin = 12
        Dummy1 = 13 'change name to a valid app if required
        Dummy2 = 14 'change name to a valid app if required
        PointOfUse = 15
        MasterSetup = 50
		Pharmacy = 20
    End Enum
	
	Public Enum EnumPrinterFunctionality
        Header = 1
        Item = 2
    End Enum
	
	Public Enum ManageUserMode
        ADD = 0
        EDIT = 1
    End Enum

    Public Enum AddEdit_Enum
        ADD = 0
        EDIT = 1
		ADDNPRINT = 2
		UPDATENPRINT = 3
		PRINT = 4
    End Enum

	Public Enum Perform_Action
        NOCHANGE = 0
        ADD = 1
        DELETE = 2
    End Enum

    Public Enum ClientType
        WEB = 1
        HHT = 2
        WIN32 = 3
		WINSERVICE = 4 
		AHHT = 5
		IHHT = 6
		WHHT = 7
    End Enum
 
    Public Enum BusinessType
        Inventory = 1
        Purchasing = 2
        AllBunits = 3
    End Enum
    Public Enum Shiping_Label_PrinterType
        None = 1
        HeaderLbl_MobilePrinter = 2
        DeliveryTic_StationaryPrinter = 3
        Both_MobilePrinter_StationaryPrinter = 4
        User_Option = 5
    End Enum
    Public Enum Enable_Lot_Serial_Tracking
        None
        MMIS
        AtPar
    End Enum

    Public Enum Enum_SyncTimes
        PROFILE_LAST_SYNCH_DATE
        USER_LAST_SYNCH_DATE
    End Enum

    Public Enum Enum_Param_TableNames
        ORGPARAMS
        PROFILEPARAMS
        USERPARAMS
    End Enum

    Public Enum Enum_ParameterLevel
        ORG
        PROFILE
        USER
    End Enum

    Public Enum Enum_DEPENDENCIES
        LIST_VIEW = 1
        PARAMS
        USER_GROUPS
        UI_SETUP
        SHIP_TO_ID
        INV_BU
        IUT_BU
        POU
        CARRIER
        UOM
        BU
        TKIT_DATA
        MAGENT_DATA
        DISTRIB_TYPES
        NOTES
        ORGPARAMS
        PROFILEPARAMS
        USERPARAMS
        NOTESCODES
        SYMBOLOGY_TYPES
        PHYSICIAN_DATA
        REASONS_DATA
        PROCEDURE_DATA
        COSTCENTER_DATA
        PREFERENCE_DATA
		LOCATION_GROUPS 
		ALL_BU       
		CASECARTS_DATA
		TKIT_DEPT
        TKIT_ITEM
        POU_DEPTDATA
        MANAGE_CARRIERS
		LABELS_DATA
		POU_LOCATIONDATA
        RX_LOC_DATA
        INV_BU_BIN
        CYC_BU_ALLOC
    End Enum

    Public Enum Enum_Recv_Carrier_Status
        N
        O
        D
    End Enum

    Public Enum Enum_UserGroups
        APPID
        SRUSR
        CLUSR
    End Enum

    Public Enum Enum_RecName
        MASTER_ITEM_TBL
        INV_ITEMS
        ITM_VENDOR_MFG
        ITEM_MFG
        ITM_VENDOR
        PURCH_ITEM_ATTR
        ITEM_MFG_UPN_FS
        INV_ITEM_UOM
    End Enum

    Public Enum Enum_AutoPutAway_Header
        BUSINESS_UNIT = 0
        PO_DT = 1
        VENDOR_ID = 2
        START_DT_TIME = 3
        END_DT_TIME = 4
    End Enum

    Public Enum Enum_AutoPutAway_Details
        LOCATION = 0
        ITEM_ID = 1
        STORAGE_LOCATION = 2
        LOT_ID = 3
        SERIAL_ID = 4
        QTY = 5
        CONVERSION_RATE = 6
        EXPIRY_DATE = 7
    End Enum

#Region "Toggle Fields"
    ''' <summary>
    ''' To keep all the toggle fields together
    ''' </summary>
    ''' <remarks></remarks>
    Enum ToggleFields
        UPC_ID = 0
        GTIN = 1
    End Enum
#End Region

#Region "Bin To Bin"


#Region "send Details"


    Enum Send_BinToBin_Input_DETAILS_Enum
        BUSINESS_UNIT = 0
        ITEM_ID = 1
        STOR_LOC = 2
        STOR_AREA = 3
        STOR_LEVEL_1 = 4
        STOR_LEVEL_2 = 5
        STOR_LEVEL_3 = 6
        STOR_LEVEL_4 = 7
        DESTIN_STOR_LOC = 8
        DESTIN_STOR_LEVEL_1 = 9
        DESTIN_STOR_LEVEL_2 = 10
        DESTIN_STOR_LEVEL_3 = 11
        DESTIN_STOR_LEVEL_4 = 12
        UOM = 13
        LOT_ID = 14
        SERIAL_ID = 15
        CONTAINER_ID = 16
        QTY = 17
        USER_ID = 18
        UPDATE_DATE = 19
        DEVICE_ID = 20
        DESTIN_STOR_AREA = 21
        SEND_STATUS = 22
        SYSTEM_QTY = 23
        DESTIN_UOM = 24
        CONVERSION_RATE = 25
        STDUOM = 26
		DFLT_UOM_STOCK = 27
        DFLT_UOM_STOCK_QTY = 28
    End Enum

    Enum Send_BinToBin_Input_PRE_REQ_Enum
        ENTERPRISE_SYSTEM_NAME = 0
        ENTERPRISE_VERSION = 1
        REMOTE_DATABASE = 2
        REMOTE_SCHEMA = 3
        PS_USER = 4
        ERP_USER_ID = 5
        ALLOW_NEGATIVE_INVENTORY = 6
        DISPLAY_ORDERING_UOM_TYPE = 7
        DEFAULT_UNIT_OF_MEASURE = 8
    End Enum



#End Region

#End Region

#Region "Cart Count"

#Region "Get Header"
    Enum Get_Cart_Header_Enum
        USER_ID = 0
        CART_ID = 1
        BUSINESS_UNIT = 2
        FLD_ORDER_BY = 3
        ORDER_BY_ORDER = 4
        POU_CART = 5
    End Enum

    Enum Get_Cart_Header_PreReqData_Enum
        CART_ALLOCATION = 0
        REMOTE_SCHEMA = 1
        REMOTE_DB_TYPE = 2
        CARTS_MNGD_ATPAR = 3
    End Enum

    Enum Get_Cart_Header_Transactions_Enum
        TRANSACTION_ID = 0
    End Enum

    Enum Get_Cart_Header_BusinessUnits_Enum
        BUSINESS_UNIT = 0
    End Enum

    Enum Get_Cart_Header_Output_Carts
        CART_ID
        BUSINESS_UNIT
        DESCR
        SHADOW_FLAG
        CART_COUNT_ORDER
        TWO_BIN_ALLOCATION
        DEF_PERCENTAGE_VALUE
        LOCATION_TYPE
    End Enum


	Enum Patient_Details_Enum
	ORG_ID
	PATIENT_MRC
	PATIENT_ACCOUNT_NUMBER
	PATIENT_NAME
	PATIENT_BEDNUMBER
	PATIENT_DEPARTMENT
	PATIENT_SEX
	PATIENT_CLASS
	MESSAGE_DATETIME
	PATIENT_ADMIT_DATE
	PATIENT_DISCHARGE_DATE	
    End Enum


    Enum Send_Charge_Capture_Header_Enum
        TRANSACTION_ID
        CHARGE_CAPTURE_ID
        CART_ID
        PATIENT_ID 'PATIENT_MRC
        STATUS
        TRANSACTION_DATE
        PATIENT_NAME
        USER_ID
        SERVICE_DATE
        START_DATETIME
        END_DATETIME
        TOTAL_RECORDS
        PATIENT_SEX
        PATIENT_ACCOUNT_NUMBER
        ORG_ID
        PATIENT_VISIT_NUMBER
    End Enum

    Enum Send_Charge_Capture_Details_Enum
        CHARGE_CAPTURE_ID
        ITEM_ID
        ITEM_COUNT'QUANTITY
        CAPTURE_DATE_TIME'UPDATE_DATE
        STATUS_CODE
        TRANSACTION_ID
        AMOUNT
        TRANSACTION_CODE
        TRANSACTION_TYPE
        ITEM_PRICE
        PHYSICIAN_ID
        PATIENT_TYPE
        ITEM_DESCRIPTION
        LINE_NO
        COST_CENTER
        DEPARTMENT_ID
        E_MAIL
    End Enum

    Enum Get_Asmt_Header_Enum
        LOCATION = 0
        USER_ID = 1
        BUSINESS_UNIT = 2
		DESCR = 3
        SETID = 4
		FLD_ORDER_BY = 5
        ORDER_BY_ORDER = 6
    End Enum

    Enum Get_Asmt_Header_PreReqData_Enum
        LOCATION_ALLOCATION = 0
        REMOTE_SCHEMA = 1
        REMOTE_DB_TYPE = 2
    End Enum

    Enum Get_Asmt_Header_Transactions_Enum
        TRANSACTION_ID = 0
    End Enum

    Enum Get_Asmt_Header_BusinessUnits_Enum
        BUSINESS_UNIT = 0
    End Enum

    Enum Get_Asmt_Header_Output
        LOCATION
        SETID
        BUSINESS_UNIT
        DESCR
    End Enum

    Enum Get_Asmt_Detail_Defns_Enum
        USER_ID
        BUSINESS_UNIT
        LOCATION
        SETID
        TRANSACTION_ID
        DESCR
    End Enum

    Enum Get_Asmt_DetailInput_Defns_Enum
        USER_ID
        BUSINESS_UNIT
        LOCATION
        TRANS_ID
    End Enum

	Enum Get_Asmt_PreReqData_Enum
        LOCATION_ALLOCATION = 0
        REMOTE_SCHEMA = 1
        REMOTE_DB_TYPE = 2
        BUSINESS_UNIT = 3
        LOCATION = 4
    End Enum

	 Enum Get_Asmt_Detail_ListView_Reqparams_Enum
        KEY_1 = 0	'PI_ID
		KEY_2 = 1	'PI_LINE_NUM
		KEY_3 = 2	'KEY 3
		KEY_4 = 3	'KEY 4
		REPORT_DATA_1_NEW = 4	'TAG_NUMBER
		REPORT_DATA_2_NEW = 5	'SERIAL_ID
		REPORT_DATA_3_NEW = 6	'LOCATION
		REPORT_DATA_4_NEW = 7	'CUSTODIAN
		REPORT_DATA_5 = 8			'ASSET ID
		REPORT_DATA_6_NEW = 9	 'MANUFACTURER
		REPORT_DATA_7_NEW = 10	 'DESCR
		REPORT_DATA_8_NEW = 11	 'MODEL
		REPORT_DATA_9_NEW = 12	 'DEPTID
		REPORT_DATA_10_NEW = 13	'EMPLID
				COMMENTS = 14
        TRANSACTION_ID = 15
		AREA_ID_NEW = 16
    End Enum

Enum Get_Asmt_Detail_Enum
        PI_ID = 0
        PI_LINE_NUM = 1
        ASSET_ID = 2
		CUSTODIAN = 3
        DEPTID = 4
        TAG_NUMBER = 5
        SERIAL_ID = 6
        LOCATION = 7
        EMPLID = 8
        DESCR = 9
        MANUFACTURER = 10
        MODEL = 11
        TRANSACTION_ID = 12
        COMMENTS = 13
		AREA_ID = 14
    End Enum

	Enum Get_Asmt_Detail_Output_Header_Enum
        USER_ID = 0
        BUSINESS_UNIT
        LOCATION
        SETID
		TRANSACTION_ID        
    End Enum

    Enum Send_Asmt_Header_Enum
        TRANSACTION_ID = 0
        LOCATION = 1
        START_DATETIME = 2
        END_DATETIME = 3
        USER_ID = 4
        TOTAL_RECORDS = 5
        NO_OF_REVISED = 6
    End Enum

    Enum Send_Asmt_Details_Enum
        KEY_1 = 0
        KEY_2 = 1
        REPORT_DATA_1 = 2
        REPORT_DATA_1_NEW = 3
        REPORT_DATA_2 = 4
        REPORT_DATA_2_NEW = 5
        REPORT_DATA_3 = 6
        REPORT_DATA_3_NEW = 7
        REPORT_DATA_4 = 8
        REPORT_DATA_4_NEW = 9
        REPORT_DATA_5 = 10
        REPORT_DATA_6 = 11
        REPORT_DATA_6_NEW = 12
        REPORT_DATA_7 = 13
        REPORT_DATA_7_NEW = 14
        REPORT_DATA_8 = 15
        REPORT_DATA_8_NEW = 16
        REPORT_DATA_9 = 17
        REPORT_DATA_9_NEW = 18
        REPORT_DATA_10 = 19
        REPORT_DATA_10_NEW = 20
        COMMENTS = 21
		AREA_ID = 22
		AREA_ID_NEW = 23
		TRANSACTION_ID_OLD = 24
    End Enum

    Enum Send_Asmt_Output_Enum
        STATUS_CODE = 0
        STATUS_DESCR = 1
    End Enum

	Enum Send_Asmt_BusinessRules_Enum
        REMOTE_SCHEMA = 0
        REMOTE_DB_TYPE = 1
        TRANSACTION_STATUS = 2
        STATUS_CODE = 3
        ENTERPRISE_SYSTEM_NAME = 4
        ENTERPRISE_VERSION = 5        
    End Enum

#End Region

#Region "Get Details"

    Enum Get_Detail_Defns_Enum
        USER_ID
        BUSINESS_UNIT
        CART_ID
        TRANSACTION_ID
        DESCR
		LOCATION
    End Enum

    Enum Get_Cart_DetailInput_Defns_Enum
        USER_ID
        BUSINESS_UNIT
        CART_ID
        TRANS_ID
    End Enum

    Enum Get_Cart_PreReqData_Enum
        CART_ALLOCATION = 0
        ITEM_PRICE = 1
        ITEM_DESCR = 2
        DEFAULT_MFG_ITEM_ID = 3
        PUTAWAY_CART_ITEMS = 4
        REMOTE_SCHEMA = 5
        REMOTE_DB_TYPE = 6
        QTY_OPTION = 7
        ITEM_UPN_TYPE_CODE = 8
        ITEM_NDC_TYPE_CODE = 9
        MFG_ITEM_REQD = 10
        VENDOR_ITEM_REQD = 11
        PRICE_REQD = 12
        GTIN = 13
        BUSINESS_UNIT = 14
        CART_ID = 15
        CARTS_MNGD_ATPAR = 16
        PACKAGING_STRING_FOR_LABELS = 17
    End Enum

    Enum Get_Cart_Detail_Output_Header_Enum
        USER_ID = 0
        BUSINESS_UNIT
        DESCR
        SHADOW_FLAG
        QTY_OPTION
        DEPT_ID
        TRANS_ID
        CART_ID
        ORG_ID
        INV_BUSINESS_UNIT
        YEAR
		MONTH
        DAY
        REQ_NO
        LOCATION
    End Enum

    Enum Get_Cart_Detail_Enum
        INV_ITEM_ID = 0
        COMPARTMENT
        ITEM_DESCR
        MFG_ITEM_ID
        VENDOR_ITEM_ID
        UPN_ID
        ITEM_NDC
        ITEM_GTIN
        ITEM_PRICE
        COUNT_ORDER
        OPTIMAL_QTY
        FOQ
        COUNT_REQD
        CART_REPLEN_CTRL
        CART_REPLEN_OPT
        CONS_NON_STOCK
        INVENTORY_ITEM
        ORDER_QTY
        UOM
        MAX_QTY
        FILLKILL
        CUST_ITEM_ID
        LOT_CONTROLLED
        SERIAL_CONTROLLED
        CONV_FACTOR
        CHARGE_CODE
        VENDOR_NAME
        VENDOR_ID
        UOM_PROC
        QTY_OPTION
        LAST_ORDER_DATE
        STATUS
        PACKAGING_STRING
        MFG_ID
        CONSIGNMENT_ITEM
		REPORT_FIELD_1
		REPORT_FIELD_2
		REPORT_FIELD_3
        REPORT_FIELD_4
		ITEM_TYPE
        SUBSTITUTE_ITEM_FLG
        USER_FIELD_2
        IMPLANT_FLAG
        ITEM_MASTER_ITEM_STATUS
        NON_CART_ITEM_STATUS
        BILL_ITEM_STATUS
        PAR_LOC_STATUS
		ITEM_MASTER_STATUS
		ITEM_BU_STATUS
		INFO_2
        INFO_3
        CONV_RATE_PAR_UOM
        PAR_UOM
        ISSUE_UOM
    End Enum
    Enum Get_Cart_LotSerial_Info_Enum
        BUSINESS_UNIT = 0
        CART_ID
        STORAGE_LOCATION
        STORAGE_AREA
        STORAGE_LEVEL_1
        STORAGE_LEVEL_2
        STORAGE_LEVEL_3
        STORAGE_LEVEL_4
        ITEM_ID
        LOT_NUMBER
        SERIAL_NUMBER
        STAGED_DATE
        CONTAINER_ID
        UOM
        UOM_PROC
        SYSTEM_QTY
        STDUOM
        STD_PACK_UOM
        LOWEST_QOH
        ACTUAL_QUANTITY
    End Enum
	
    Enum Get_Cart_Detail_ListView_Reqparams_Enum
        CART_REPLEN_CTRL = 0
        CART_REPLEN_OPT = 1
        COMPARTMENT = 2
        CONS_NON_STOCK = 3
        COUNT_QTY = 4
        COUNT_REQUIRED = 5
        CUST_ITEM_NO = 6
        DESCR = 7
        FOQ = 8
        GTIN = 9
        INVENTORY_ITEM = 10
        ITEM_COUNT_ORDER = 11
        ITEM_ID = 12
        MAXIMUM_QTY = 13
        MFG_ITEM_ID = 14
        OPTIMAL_QTY = 15
        PRICE = 16
        PRINT_LATER_FLAG = 17
        UOM = 18
        UPC_ID = 19
        VNDR_ITEM_ID = 20
        CONSIGNMENT_ITEM = 21
		REPORT_FIELD_1 = 22
        REPORT_FIELD_2 = 23
        REPORT_FIELD_3 = 24
        REPORT_FIELD_4 = 25
        PACKAGING_STRING = 26
    End Enum

    Enum Get_Recall_Cart_Detail_Enum
        INV_ITEM_ID = 0
        MFG_ID = 1
        MFG_ITEM_ID = 2
        ITEM_DESCR = 3
    End Enum

#End Region

#Region "send Details"

    ''' <summary>
    ''' Header Fields sent in the InputParameters variable of SendCartDetails
    ''' </summary>
    ''' <remarks></remarks>
    Enum Send_Cart_Header_Enum
        TRANSACTION_ID = 0
        BUSINESS_UNIT = 1
        CART_ID = 2
        START_DATETIME = 3
        END_DATETIME = 4
        USER_ID = 5
        TOTAL_RECORDS = 6
        NO_OF_SCANS = 7
        NO_OF_ORDERED_ITEMS = 8
        QUANTITY_OPTION = 9
        CARTFLAG = 10
        CMTS = 11
        ALLOCATED_USER = 12
        REQ_NO = 13
        CREATION_DT = 14
    End Enum

    ''' <summary>
    ''' intermediate pre-requisite data required to process SendCartDetails 
    ''' in the BusinessRules and Data Layer
    ''' </summary>
    ''' <remarks></remarks>
    Enum Send_Cart_BusinessRules_Enum
        CART_DEFN_CHANGE = 0
        DEL_ITEMS = 1
        REMOTE_SCHEMA = 2
        CART_SEQUENCE_ID = 3
        ITEM_COUNT_LOW_PCT = 4
        ITEM_COUNT_HIGH_PCT = 5
        PUTAWAY_CART_ITEMS = 6
        REQ_ZIP_RELEASE = 7
        STOP_REL_NON_STOCK_REQ = 8
        QTY_OPTION = 9
        REQUESTOR_ID = 10
        IGNORE_REQ_REL_ERR = 11
        REMOTE_DB_TYPE = 12
        TRANSACTION_STATUS = 13
        STATUS_CODE = 14
        SUPER_USER = 15
        CARTS_MNGD_ATPAR = 16
        QTY_ROUND_TYPE = 17
        CALCULATE_REQ_QTY = 18
        POU_CART = 19
        ORDIDS = 20
        ERP_USER_ID = 21
        STATUS_OF_REQUISITION = 22
        HL7_BILLING_MESG = 23
        ENTERPRISE_SYSTEM_NAME = 24
        ENTERPRISE_VERSION = 25
        CREATE_NSTKREQ_BYPAR = 26
        INCLUDE_ZERO_ORDERED_ITEMS = 27
        FTP_TO_SERVER = 28
    End Enum

    ''' <summary>
    ''' Details Fields sent in the InputParameters variable of SendCartDetails
    ''' </summary>
    ''' <remarks></remarks>
    Enum Send_Cart_Details_Enum
        ITEM_ID = 0
        ITEM_DESCR = 1
        COMPARTMENT = 2
        COUNT_QUANTITY = 3
        OPTIMAL_QUANTITY = 4
        COUNT_REQUIRED = 5
        PRICE = 6
        CRITICAL_ITEM = 7
        INVENTORY_ITEM = 8
        UOM = 9
        NEW_OPTIMAL_QUANTITY = 10
        FILL_KILL_FLAG = 11
        LNCMTS = 12
        CART_REPLEN_CTRL = 13
        MAX_QTY = 14
        FOQ = 15
        CUST_ITEM_NO = 16
        VENDOR_ID = 17
        CONV_FACTOR = 18
        CART_REPLEN_OPT = 19
        LOC_TYPE = 20
        ACT_QOH = 21
        ITEM_COUNT_ORDER = 22
        ORDER_QUANTITY = 23
    End Enum

    ''' <summary>
    ''' Output data from SendDetails
    ''' </summary>
    ''' <remarks></remarks>
    Enum Send_Cart_Output_Enum
        STATUS_CODE = 0
        STATUS_DESCR = 1
        TRANSACTION_ID = 2
        ITEM_ID = 3
        PREV_TRANSACTION_ID = 4
        REQUISITION_NUMBER = 5
    End Enum

    Enum Cart_ListView_Screen_Enum
        CART_STATUS = 0
        ITEM_COUNTS = 1
    End Enum

    Enum FillKill_Enum
        FILL = 0
        KILL
    End Enum

    Enum QTY_OPTION
        COUNT
        REQUEST
    End Enum

   
    Public Enum SENT_FROM
        SENT_FROM_WEB = 0
        SENT_FROM_HHT = 1
    End Enum

    Enum Send_Order_Details_Enum
        ORDER_NO = 0
        LINE_NO = 1
        ITEM_ID = 2
        BIN_LOC = 3
        REQ_QTY = 4
        OPT_QTY = 5
        LOT_NO = 6
        SR_NO = 7
        UOM = 8
        TRANS_ID = 9
        LINE_COMMENTS = 10
        HDR_COMMENTS = 11
        CREATE_USER = 12
        VENDOR_ID = 13
        ACTUAL_ORDERQTY = 14
        ACTUAL_ISSUE_UOM = 15
        REPLENISHMENT_TYPE = 16
        COUNT_QTY = 17
    End Enum


    Enum Send_CartReq_Details
        ITEM_ID = 0
        ITEM_DESCR = 1
        COUNT_QUANTITY = 2
        UOM = 3
        UOP = 4
        UOI = 5
        CONV_FACTOR = 6
        LNCMTS = 7
        SERIAL_CONTROLLED = 8
        LOT_CONTROLLED = 9
        LINE_NO = 10
        VENDOR_ID = 11
        ITEM_TYPE = 12
        REPLENISHMENT_TYPE = 13
    End Enum

#End Region

#End Region

#Region "Cycle Count"

#Region "GetEvent Header"

    Enum Get_Event_Header_Enum
        EVENT_ID = 0
        FLD_ORDER_BY = 1
        ORDER_BY_ORDER = 2
        USER_ID = 3
    End Enum

    Enum Get_Event_Transactions_Enum
        TRANSACTION_ID = 0
    End Enum

    Enum Get_Event_Header_PreReqData_Enum
        REVIEW_COUNTS = 0
        EVENT_ALLOCATION = 1
        REMOTE_SCHEMA = 2
        ERP_CALL = 3
        PERFORM_MANUAL_COUNTS = 4
        REVIEW_MANUAL_COUNTS = 5
    End Enum

    Enum Get_Event_Header_BusinessUnits_Enum
        BUSINESS_UNIT = 0
    End Enum

    Enum Get_Event_Header_Output_Enum
        BUSINESS_UNIT = 0
        EVENT_ID = 1
        NO_RECORDS = 2
        FROM_STOR_LOC = 3
        TO_STOR_LOC = 4
        PARENT_EVENT_ID = 5
        COUNT_HDR_STATUS = 6
        EVENT_TYPE = 7
    End Enum

	Enum Send_Event_Output_Enum
		STATUS_CODE
		STATUS_DESCR
	End Enum

	
#End Region

#Region "GetEvent Details"

    Enum Get_Event_Details_Enum
        BUSINESS_UNIT = 0
        EVENT_ID = 1
        COUNT_AND_NEW = 2
        RECOUNT_AND_NEW = 3
        USER_ID = 4
        TRANSACTION = 5
        SEND_OLD_TRANSACTION = 6
        EVENT_STATUS = 7
        INSERT_FLAG = 8
        IS_ITEM_FROM_ERP = 9
        RECOUNT = 10
        GET_RECOUNT_TRANSACTIONID = 11
        GET_RECOUNT_CANCEL_TRANSID = 12
        EVENT_TYPE = 13
    End Enum

    Enum Get_Event_Details_PreReqData_Enum
        EVENT_ALLOCATION = 0
        REVIEW_COUNTS = 1
        ITEM_DESCR = 2
        DEFAULT_MFG_ITEM_ID = 3
        ITEM_PRICE = 4
        DISPLAY_PREV_COUNT = 5
        COUNT_IN_DIFF_UOMS = 6
        ITEM_NDC_TYPE_CODE = 7
        ITEM_UPN_TYPE_CODE = 8
        DISP_ALT_UOM = 9
        REMOTE_SCHEMA = 10
        REMOTE_DB_TYPE = 11
        PACKAGING_STRING_FOR_LABELS = 12
        DISPLAY_ORDERING_UOM_TYPE = 13
        DEFAULT_UNIT_OF_MEASURE = 14
        PERFORM_MANUAL_COUNTS = 15
        REVIEW_MANUAL_COUNTS = 16
    End Enum

    Enum Get_Event_Detail_ListView_Enum
        VENDOR_ITEM_ID_REQ = 0

        CUST_ITEM_NO_REQ = 1
        UPC_ID_REQ = 2
        STORAGE_AREA_REQ = 3
        STOR_LEVEL_1_REQ = 4
        STOR_LEVEL_2_REQ = 5
        STOR_LEVEL_3_REQ = 6
        STOR_LEVEL_4_REQ = 7
        CONTAINER_ID_REQ = 8
        STAGED_DATE_REQ = 9
        SERIAL_ID_REQ = 10
        INV_LOT_ID_REQ = 11
        SYS_QTY_REQ = 12
        INV_TAG_ID_REQ = 13
        MFG_ITEM_ID_REQ = 14
        GTIN_REQ = 15
		REPORT_FIELD_1 = 16
		REPORT_FIELD_2 = 17
		REPORT_FIELD_3 = 18
		REPORT_FIELD_4 = 19
        PRICE = 20
        PACKAGING_STRING = 21
        STD_PACK_UOM = 22
    End Enum

    Enum Get_Event_DetailOutput_Header_Enum
        BUSINESS_UNIT = 0
        EVENT_ID = 1
        TRANSACTION_ID = 2
        PARENT_EVENT_ID = 3
        EVENT_TYPE = 4
    End Enum

    Enum Get_Event_DetailOutput_Details_Enum
        INV_ITEM_ID = 0
        ITEM_REC_NUM = 1
        MITMID = 2
        VITMID = 3
        DESCR = 4
        STORAGE_AREA = 5
        STOR_LEVEL_1 = 6
        STOR_LEVEL_2 = 7
        STOR_LEVEL_3 = 8
        STOR_LEVEL_4 = 9
        UNIT_OF_MEASURE = 10
        PRICE = 11
        CONTAINER_ID = 12
        STAGED_DATE = 13
        SERIAL_ID = 14
        INV_LOT_ID = 15
        COUNT_STATUS = 16
        QTY_COUNT = 17
        SYSQTY = 18
        INVENTORY_TAG_ID = 19
        GTIN = 20
        UPC_ID = 21
        CUSTOM_ITEM_NO = 22
        LOCATION = 23
        MANUFACTURER = 24
        PROJECT_ID = 25
        EVENT_ID = 26
        TRANSACTION_ID = 27
        BUSINESS_UNIT = 28
        STORLOC = 29
        COUNT_USER_ID = 30
        USERNAME = 31
        CUST_ITEM_NO = 32
        ITEM_MANUFACTURER_NAME = 33
        UPDATE_DATE = 34
        RECOUNT_FLAG = 35
        VALUEDIFF = 36
        REALVALUEDIFF = 37
        RECOUNT_USER_ID = 38
        ACTUAL_RECOUNT_FLAG = 39
        ACTUAL_COUNT_QTY = 40
        RECNT_CHECK = 41
        RECOUNT_USER_NAME = 42
		REPORT_FIELD_1 = 43
        REPORT_FIELD_2 = 44
        REPORT_FIELD_3 = 45
        REPORT_FIELD_4 = 46
        PACKAGING_STRING = 47
        QTY_COUNT1 = 48
        QTY_COUNT2 = 49
        UOM_TYPE = 50
        STD_PACK_UOM = 51
        L_S_CONTROLLED = 52
        CONSIGNED_FLAG = 53
        LATEST_SYSQTY = 54
        EVENT_TYPE = 55
        CONVERSION_RATE = 56
		LOT_CONTROLLED=57
		SERIAL_CONTROLLED=58
    End Enum

    Enum Get_Event_DetailOutput_AlternateUOMs_Enum
        UNIT_OF_MEASURE = 0
        CONVERSION_RATE = 1
        INV_ITEM_ID = 2
        ITEM_REC_NUM = 3
        UOM_TYPE = 4
    End Enum

#End Region

#Region "Delete Header"
    Enum Delete_CycleCount_Header_Enum
        TRANSACTION_ID = 0
        BUSINESS_UNIT = 1
        EVENT_ID = 2
    End Enum
#End Region

#Region "Send Details"

    Enum Send_CycleCount_Event_Enum
        BUSINESS_UNIT = 0
        EVENT_ID = 1
        FROM_STOR_LOC = 2
        TO_STOR_LOC = 3
        NO_RECORDS = 4
        USER_ID = 5
        ALLOCATION_STATUS = 6
        ACTUAL_ALLOCATION_STATUS = 7
    End Enum

    Enum Send_CycleCount_Details_Enum
        ITEM_ID = 0
        COUNT_QTY = 1
        LINE_NBR = 2
        PAGE_NBR = 3
    End Enum

    Enum EventType
        Regular = 0
        Manual = 1
    End Enum

#End Region

#Region "LotSerial"
    Public Enum Enum_Cyct_LotOrSerial
        L 'lot 
        S 'Serial
        B 'Both lot and Serial
    End Enum
    Public Enum Enum_Cyct_FamilyRules
        REMOTE_SCHEMA = 0
        INV_ITEM_ID = 1
        STORAGE_AREA = 2
        STOR_LEVEL_1 = 3
        STOR_LEVEL_2 = 4
        STOR_LEVEL_3 = 5
        STOR_LEVEL_4 = 6
        UNIT_OF_MEASURE = 7
        CONTAINER_ID = 8
        STAGED_DATE = 9
        SERIAL_ID = 10
        INV_LOT_ID = 11
        COUNT_STATUS = 12
        QTY_COUNT = 13
        EVENT_ID = 14
        BUSINESS_UNIT = 15
        COUNTING_EVENT_ID = 16
        COUNT_DTTM = 17
        NEED_TO_RECONCILE = 18
        ITEM_ID = 19
        COUNT_QTY = 20
        UPDATE_DT_TIME = 21
        UNIT_MEASURE_COUNT = 22
        STD_PACK_UOM = 23
    End Enum

#End Region
#End Region

#Region "Pick Plan"

    Enum Get_Pick_IP_Header_Pre_Req_Enum
        LOCATION_ALLOCATION = 0
        DEFAULT_PRIORITY = 1
        LIMIT_OF_LISTS = 2
        CHCK_PLANS_SENT = 3
        DEFAULT_BUNIT = 4
        REMOTE_SCHEMA = 5
        REMOTE_DATABASE = 6
        PICK_ALLOC_STORAGE_LOC_REQ = 7
        PICK_MULT_USERS_DOWNLOAD_PLAN = 8
    End Enum
    Enum Get_Pick_IP_Header_Order_Prefix_Enum
        ORDER_PREFIX = 0
    End Enum
    Enum Get_Pick_IP_Header_Location_BusinessUnit_Enum
        LOCATION = 0
        BUSINESS_UNIT = 1
    End Enum
    Enum Get_Pick_IP_Header_Inventory_BusinessUnits_Enum
        INVENTORY_BUSINESSUNIT = 0
    End Enum
    Enum Get_Pick_IP_Header_Exclude_Orders_Enum
        ORDER_ID = 0
    End Enum
    Enum Get_Pick_OP_Header_Details_Enum
        BUSINESS_UNIT = 0
        PICK_BATCH_ID = 1
        ORDER_NO = 2
        SHIP_TO_CUST_ID = 3
        SHIP_CUST_NAME1 = 4
        LOCATION = 5
        DMDSRC = 6
        SBUNIT = 7
        PRIORITY = 8
        USER_ID = 9
        INV_BUSINESS_UNIT = 10
		LOCATION_DESC = 11
        INV_BUNIT_DESC = 12
        ADDRESS1 = 13
        ADDRESS2 = 14
        ADDRESS3 = 15
        ADDRESS4 = 16
        CITY = 17
        STATE = 18
        ZIP_CODE = 19
        ATTN_TO = 20
		REQUEST_DATE = 21
    End Enum


#Region "PickPlan GetDetails Enums"

    Enum Get_Pick_Detail_Input_Header_Enum
        BUSINESS_UNIT = 0
        ORDER_NO = 1
        LOCATION = 2
        BATCH_ID = 3
    End Enum

    Enum Get_Pick_Detail_Input_PreReq_Enum
        LOCATION_ALLOCATION = 0
        ITEM_DESCR = 1
        DEFAULT_PICKUP_BUNIT = 2
        DEFAULT_MFG_ITEM_ID = 3
        PICKUP_MULTI_LOC = 4
        ITEM_UPN_TYPE_CODE = 5
        ITEM_NDC_TYPE_CODE = 6
        REMOTE_SCHEMA = 7
        REMOTE_DATABASE = 8
		PICK_STOCK_STORE = 9
		PICK_ENABLE_LOT_SRL_TRACKING = 10
		PICK_UPDATE_POU_INVENTORY= 11
        PICK_SEND_LOT_SRL_INFO_TO_MMIS = 12
        PICK_ALLOC_STORAGE_LOC_REQ = 13
        PICK_MULT_USERS_DOWNLOAD_PLAN = 14
        ITEM_PRICE = 15
        PACKAGING_STRING_FOR_LABELS = 16
        DISPLAY_ORDERING_UOM_TYPE = 17
        DEFAULT_UNIT_OF_MEASURE = 18
        EDIT_PICK_UOM = 19
    End Enum

    Enum Get_Pick_Detail_Input_ListViewParams_Enum
        VEND_ITEM_ID = 0
        MFG_ITEM_ID = 1
        PRICE = 2
        PACKAGING_STRING = 3
    End Enum
    Enum Get_Pick_Detail_Input_StorageLocation_Enum
        STORAGE_AREA = 0
        STOR_LEVEL_1 = 1
        STOR_LEVEL_2 = 2
        STOR_LEVEL_3 = 3
        STOR_LEVEL_4 = 4
    End Enum

    Enum Get_Pick_Detail_Output_Header_Enum
        BUSINESS_UNIT = 0
        DEMAND_SOURCE = 1
        SOURCE_BUS_UNIT = 2
        ORDER_NO = 3
        LOCATION = 4
        PICK_BATCH_ID = 5
        SHIP_CUST_NAME1 = 6
        TRANSACTION_ID = 7
    End Enum

    Enum Get_Pick_Detail_Output_Details_Enum
        STDUOM = 0
        ORDER_INT_LINE_NO = 1
        SCHED_LINE_NBR = 2
        INV_ITEM_ID = 3
        DEMAND_LINE_NO = 4
        SEQ_NBR = 5
        PICK_BATCH_ID = 6
        PICKLIST_LINE_NO = 7
        SHIP_TO_CUST_ID = 8
        SHIP_CUST_NAME1 = 9
        QTY_REQUESTED = 10
        QTY_REQUESTED_BASE = 11
        QTYALT_BASE = 12
        UNIT_OF_MEASURE = 13
        STORAGE_AREA = 14
        STOR_LEVEL_1 = 15
        STOR_LEVEL_2 = 16
        STOR_LEVEL_3 = 17
        STOR_LEVEL_4 = 18
        PARTIAL_QTY_FLAG = 19
        CONFIRMED_FLAG = 20
        PARTIAL_ORDER_FLAG = 21
        DEPTID = 22
        MFG_ITEM_ID = 23
        VENDOR_ITEM_ID = 24
        DESCR = 25
        GTIN = 26
        UPCID = 27
        SQTY = 28
        PICKUOM = 29
        CONVERSION_RATE = 30
        CUST_ITEM_NO = 31
        LOT_FLAG = 32
        SRL_FLAG = 33
        QTY_PICKED_CONV = 34
        PRICE = 35
        PACKAGING_STRING = 36
        STD_PACK_UOM = 37
        STD_CONV_FACT = 38
        ASRS_ID = 39

    End Enum

    Enum Get_Pick_Detail_Output_AlternateLocations_Enum
        SERIAL_ID = 0
        INV_LOT_ID = 1
        CONTAINER_ID = 2
        STORAGE_AREA = 3
        STORAGE_LEVEL_1 = 4
        STORAGE_LEVEL_2 = 5
        STORAGE_LEVEL_3 = 6
        STORAGE_LEVEL_4 = 7
        PHY_INV_UOM = 8
        CONVERSION_RATE = 9
        QTY = 10
        INV_ITEM_ID = 11
        ORDER_INT_LINE_NO = 12
        EXPIRY_DATE = 13
        ALLOTED_LOT_FLAG = 14
		SCHED_LINE_NBR = 15
        DEMAND_LINE_NO = 16
        SEQ_NBR = 17
    End Enum

    Enum Get_Pick_Detail_Output_SubstituteItems_Enum
        SERIAL_ID = 0
        INV_LOT_ID = 1
        STORAGE_AREA = 2
        STORAGE_LEVEL_1 = 3
        STORAGE_LEVEL_2 = 4
        STORAGE_LEVEL_3 = 5
        STORAGE_LEVEL_4 = 6
        UNIT_OF_MEASURE = 7
        CONVERSION_RATE = 8
        QTY = 9
        INV_ITEM_ID = 10
        SUB_ITM_ID = 11
        CONTAINER_ID = 12
        EXPIRY_DATE = 13
		ORDER_INT_LINE_NO = 14
        SCHED_LINE_NBR = 15
        DEMAND_LINE_NO = 16
        SEQ_NBR = 17
    End Enum

    Enum Get_Pick_Detail_Output_AlternateUOMs_Enum
        ORDER_INT_LINE = 0
        INV_ITEM_ID = 1
        SCHED_LINE_NO = 2
        DEMAND_LINE_NO = 3
        SEQ_NBR = 4
        UNIT_OF_MEASURE = 5
        CONVERSION_RATE = 6
    End Enum


#End Region

#Region "[ Old Enums ]"

#Region "Get Pick List"

    Enum Get_Pick_Header_Enum
        LOCATION_ALLOCATION
        DEFAULT_PRIORITY
        DEFAULT_PICKUP_BUNIT
        LIMIT_OF_LISTS
        BUSINESS_UNIT
        SET_ID
        LOCATION
        LOCATIONNAME
        STATUS
        CHECK_PLANS_SENT
        PICK_STOCK_STORE
		PICK_ENABLE_LOT_SRL_TRACKING
		PICK_UPDATE_POU_INVENTORY
        PICK_SEND_LOT_SRL_INFO_TO_MMIS
        PICK_ALLOC_STORAGE_LOC_REQ
        PICK_MULT_USERS_DOWNLOAD_PLAN
    End Enum

    Enum Get_Pick_List_Transactions_Enum
        TRANSACTION_ID = 0
    End Enum

#End Region

#Region "Get Pick Data"

    Enum Get_Pick_Details_Enum
        LOCATION_ALLOCATION
        DEFAULT_PICKUP_BUNIT
        ITEM_DESCR
        PICK_STOCK_STORE
        PICK_ENABLE_LOT_SRL_TRACKING
		PICK_UPDATE_POU_INVENTORY
        PICK_SEND_LOT_SRL_INFO_TO_MMIS
        PICK_ALLOC_STORAGE_LOC_REQ
        PICK_MULT_USERS_DOWNLOAD_PLAN
    End Enum

    Enum Get_Pick_SendDetails_Enum
        ITEM_PICK_LOW_PCT
        ITEM_PICK_HIGH_PCT
        PS_USER
        ERP_USER_ID
        PICK_STOCK_STORE
    End Enum
    Enum Get_Pick_GetDetails_Enum
        ITEM_UPN_TYPE_CODE
        ITEM_NDC_TYPE_CODE
        PICKUP_MULTI_LOC
        DEFAULT_MFG_ITEM_ID
        ITEM_DESCR
        BUSINESS_UNIT
        ORDER_NO
        LOCATION
        BATCH_ID
    End Enum
    Enum Get_Header_Enum
        LIMIT_OF_LISTS
    End Enum

    Enum Pick_PreReq_Enum
        LOCATION_ALLOCATION = 0
        LIMIT_OF_LISTS = 1
        DEFAULT_PRIORITY = 2
        DEFAULT_PICKUP_BUNIT = 3
        ITEM_PICK_HIGH_PCT = 4
        ITEM_PICK_LOW_PCT = 5
        ORDER_PREFIX = 6
        ERP_USER_ID = 7
        PICK_ALLOC_STORAGE_LOC_REQ = 8
        PICK_MULT_USERS_DOWNLOAD_PLAN = 9
    End Enum


#End Region

#Region "Get Header"

    Enum Get_Pick_Header_PreReqData_Enum
        REMOTE_SCHEMA
        REMOTE_DB_TYPE
    End Enum
#End Region

#End Region

#Region "Send Pick Details"
    Enum Send_Pick_Header_Enum
        BUSINESS_UNIT
        BATCH_ID
        ORDER_NO
        USER_ID
        END_DT_TIME
        SHIPMENT_NUMBER
        SOURCE_BUNIT
    End Enum

    Enum Send_Pick_Details_Enum
        ORDER_LINE_NBR
        ITEM_ID
        DT_TIME
        QTY
        ALLOCATED_QTY
        UOM
        LINE_NBR
        BUSINESS_UNIT
        ORDER_NO
    End Enum

#End Region

#Region "PickPlan SendDetails Enums"

    Enum Send_Pick_Input_HEADER_Enum
        BUSINESS_UNIT = 0
        BATCH_ID = 1
        ORDER_NO = 2
        STARTTIME = 3
        ENDTIME = 4
        TRANSACTION_ID = 5
        USER_ID = 6
        SOURCE_BUSINESS_UNIT = 7
        DEMAND_SOURCE = 8
        SHIPMENT_NBR = 9
        TRACKING_NBR = 10
        REQUEST_DATE = 11
    End Enum

    Enum Send_Pick_Input_DETAILS_Enum
        LINE_NO = 0
        ORDERLINE_NO = 1
        INV_ITEM_ID = 2
        SCHED_LINE_NO = 3
        DEMAND_LINE_NO = 4
        SEQ_NBR = 5
        STORAGE_AREA = 6
        STOR_LEVEL_1 = 7
        STOR_LEVEL_2 = 8
        STOR_LEVEL_3 = 9
        STOR_LEVEL_4 = 10
        QTY_PICKED = 11
        SUM_QTY = 12
        QTY_ORDER = 13
        STD_UOM = 14
        UNIT_OF_MEASURE = 15
        PICK_UOM = 16
        DEPTID = 17
        QTY_REQUESTED = 18
        QTY_ALLOCATED = 19
        DATE_TIME = 20
        CUST_ITEM_NO = 21
        LOCATION = 22
        TOTE_NO = 23
        HAS_SUBSTITUTE_ITEMS = 24
        CONVERSION_FACTOR = 25
    End Enum

    Enum Send_Pick_Input_ALTERNATE_LOCATIONS_Enum
        INV_ITEM_ID = 0
        ORDER_INT_LINE_NO = 1
        STORAGE_AREA = 2
        STOR_LEVEL_1 = 3
        STOR_LEVEL_2 = 4
        STOR_LEVEL_3 = 5
        STOR_LEVEL_4 = 6
        UNIT_OF_MEASURE = 7
        SYS_QTY = 8
        QTY_PICKED = 9
        PICK_UOM = 10
        CONVERSION_FACTOR = 11
        SERIAL_ID = 12
        INV_LOT_ID = 13
        CONTAINER_ID = 14
        SCHED_LINE_NO = 15
        DEMAND_LINE_NO = 16
        SEQ_NBR = 17
        SUB_ITEM_ID = 18
        EXPIRY_DATE = 19
    End Enum

    Enum Send_Pick_Input_PRE_REQ_Enum
        ITEM_PICK_HIGH_PCT = 0
        ITEM_PICK_LOW_PCT = 1
        REMOTE_SCHEMA = 2
        REMOTE_DATABASE = 3
        ENTERPRISE_SYSTEM_NAME = 4
        ENTERPRISE_VERSION = 5
        PICK_STOCK_STORE = 6
        PRINT_PATIENT_CHARGE = 7
        COORDINATOR_EMAIL_PICKREQ = 8
        PS_USER = 9
		PICK_ENABLE_LOT_SRL_TRACKING= 10
		PICK_UPDATE_POU_INVENTORY= 11
		PICK_SEND_LOT_SRL_INFO_TO_MMIS= 12
    End Enum

#End Region

#End Region

#Region "Receiving"

    Enum SendPO_Receive_Header_Enum
        BUSINESS_UNIT = 0
        PO_ID = 1
        VENDOR_ID = 2
        BUSINESS_UNIT_PO = 3
        TRANSACTION_CODE = 4
        DROP_SHIP_FL = 5
        TRANSACTION_ID = 6
        START_DT_TIME = 7
        END_DT_TIME = 8
        CARRIER_ID = 9
        BILL_OF_LADING = 10
        INVOICE_NO = 11
        STATUS = 12
        USER_ID = 13
        NON_STOCK_COUNT = 14
        STOCK_COUNT = 15
        RECEIVER_ID = 16
        HDR_CMTS = 17
        PO_DT = 18
    End Enum

    Enum SendPO_Receive_BusinessRules_Enum
        REMOTE_SCHEMA = 0
        NON_STOCK_STORE = 1
        PS_USER = 2
        ASN_RECEIPT_STATUS = 3
        ITEM_RECV_HIGH_PCT = 4
        ITEM_RECV_LOW_PCT = 5
        REMOTE_DB_TYPE = 6
        ENTERPRISE_SYSTEM_NAME = 7
        ENTERPRISE_VERSION = 8
        LOT_SERIAL_ENABLED = 9
        POU_IMPLEMENTED = 10
        SEND_LOT_SERIAL_INFO_TO_MMIS = 11
        STORE_LOT_SERIAL_INFO_IN_ATPAR = 12
        ERP_USER_ID
        PRINTER_ADDRESS
        CUSTOM_VIEW_ERPUSER
		RESTRICT_ZERO_QTY
    End Enum

    Enum SendPO_Receive_Details_Enum
        LINE_NBR
        SCHED_NBR
        QTY
        UNIT_OF_MEASURE
        CARRIER_ID
        BILL_OF_LADING
        SHIPTO_ID
        NO_OF_BOXES
        INV_ITEM_ID
        INVENTORY_ITEM
        QTY_PO
        TRACKING_ID
        EXT_TRK_NO
        RECEIVING_ROUTING_ID
        LOCATION
        RECEIVED_QTY
        RECV_UOM
        RECV_CONVERSION_RATE
        LOT_ID
        SERIAL_ID
        CONVERSION_RATE
        ASN_QTY
        LINE_CMTS
        CUST_ITEM_NO
        EXPIRY_DATE
        DESCRIPTION
        DUE_DT
        STORAGE_LOCATION
    End Enum


    Enum SendPO_Receive_ItemSubDetails_Enum
        LINE_NBR = 0
        SCHED_NBR = 1
        LOT_ID = 2
        SERIAL_ID = 3
        UNIT_OF_MEASURE = 4
        CONVERSION_RATE = 5
        EXPIRY_DATE = 6
        QTY = 7
    End Enum

    Enum SendPO_Receive_Output_Enum
        STATUS_CODE = 0
        STATUS_DESCR = 1
    End Enum

    Enum Receive_Transaction_Enum
        TRANSACTIONID
    End Enum

    'Enum GetPO_Receive_BusinessRules_Enum
    '    NON_STOCK_STORE = 0
    '    MULTIPLE_USER_DOWNLOAD = 1
    '    PS_USER = 2
    '    REALTIME_DOWNLOAD = 3
    '    MAX_NO_OF_REC_DOWNLOAD = 4
    '    DEFAULT_MFG_ITEM_ID = 5
    'End Enum

    'Enum GetPO_Receive_ERP_Enum
    '    REQUESTOR_EMAIL_TABLE = 0
    '    NON_STOCK_STORE = 1
    '    ASN_RECEIPT_STATUS = 2
    '    ITEM_UPN_TYPE_CODE = 3
    '    ITEM_NDC_TYPE_CODE = 4
    '    EDIT_UOM = 5
    'End Enum

    Enum GetInventoryItems_StockIssue_BusinessRules_Enum
        ITEM_DESCR
        DEFAULT_MFG_ITEM_ID
        CUSTOM_SQL_DESTLOCATION
        ALLOC_DEST_LOC_REQUIRED
        ITEM_UPN_TYPE_CODE
        ITEM_NDC_TYPE_CODE
        ALLOW_NEGATIVE_INVENTORY
        DEFAULT_COMPANY
        SYNC_MULTIPLE_LOC_INFO
        LOT_SERIAL_ENABLED
        SEND_LOT_SERIAL_INFO_TO_MMIS
        STORE_LOT_SERIAL_INFO_IN_ATPAR
		VALIDATE_DEPT
        CUSTOM_SQL_DEPT
        PACKAGING_STRING_FOR_LABELS
        DISPLAY_ORDERING_UOM_TYPE
        DEFAULT_UNIT_OF_MEASURE
		SYNCH_SCAN_ENTERED_ITEM
        SYNC_ALL_BUNITS
        DEFAULT_LOCATION
        DEFAULT_DEPARTMENT
    End Enum

    Enum GetInventoryItems_CycleCount_BusinessRules_Enum
        ITEM_DESCR
        DEFAULT_MFG_ITEM_ID
        CUSTOM_SQL_DESTLOCATION
        ALLOC_DEST_LOC_REQUIRED
        ITEM_UPN_TYPE_CODE
        ITEM_NDC_TYPE_CODE
        ALLOW_NEGATIVE_INVENTORY
        DEFAULT_COMPANY
        SYNC_MULTIPLE_LOC_INFO
        LOT_SERIAL_ENABLED
        SEND_LOT_SERIAL_INFO_TO_MMIS
        STORE_LOT_SERIAL_INFO_IN_ATPAR
        VALIDATE_DEPT
        CUSTOM_SQL_DEPT
        PACKAGING_STRING_FOR_LABELS
        DISPLAY_ORDERING_UOM_TYPE
        DEFAULT_UNIT_OF_MEASURE
        SYNCH_SCAN_ENTERED_ITEM
        SYNC_ALL_BUNITS
        DEFAULT_LOCATION
        DEFAULT_DEPARTMENT
        ITEM_PRICE_TYPE
    End Enum

	Enum PO_TYPE
        ASNBLANKET = 0
        ASN = 1
        BLANKET = 2
        STANDARD = 3
    End Enum
	
#Region "Search PO"
    Enum SearchPO_Receive_Header
        BUSINESS_UNIT = 0
        ITEM_ID = 1
        VENDOR_ID = 2
        VENDOR_NAME = 3
        SHIP_TO_ID = 4
        FROM_DATE = 5
        TO_DATE = 6
        SEARCH_TYPE = 7
        INCLUDE_ASN_POS = 8
    End Enum
    Enum SearchPO_PreReqData_Enum
        MAX_NO_OF_REC_DOWNLOAD = 0
        DEFAULT_MFG_ITEM_ID = 1
        SCHEMA_NAME = 2
        REMOTE_DB_TYPE = 3        
        RECV_EXCLUDE_CAPITAL_POS = 4
        ASN_RECEIPT_STATUS = 5
        SEARCH_PO_WITHOUT_BU = 6
    End Enum
#End Region

#Region "GetPO"
    Enum GetPO_Receive_Header
        BUSINESS_UNIT = 0
        PO_NO = 1
        PACKSLIP_SEL_INVOICE_NO = 2
        TOTAL_PO = 3
        SHIP_TO_ID = 4
        TRANS_ID = 5
        INCLUDE_ALL_PO_LINES = 6
        SELECTED_PAK_SLIP_NO = 7
        RECEIVER_ID = 8
        SEARCH_TYPE = 9
        INCLUDE_ASN_POS = 10
    End Enum
    Enum GetPO_PreReqData_Enum
        NON_STOCK_STORE = 0
        MULTIPLE_USER_DOWNLOAD = 1
        PS_USER = 2
        REQUESTOR_EMAIL_TABLE = 3
        ASN_RECEIPT_STATUS = 4
        ITEM_UPN_TYPE_CODE = 5
        ITEM_NDC_TYPE_CODE = 6
        EDIT_UOM = 7
        SCHEMA_NAME = 8
        REMOTE_DB_TYPE = 9
        ITEM_DESCR = 10
        LOT_SERIAL_ENABLED = 11
        POU_IMPLEMENTED = 12
        SEND_LOT_SERIAL_INFO_TO_MMIS = 13
        STORE_LOT_SERIAL_INFO_IN_ATPAR = 14        
        ITEM_PRICE = 15
        PACKAGING_STRING_FOR_LABELS = 16
		RECV_EXCLUDE_CAPITAL_POS = 17
        SEARCH_PO_WITHOUT_BU = 18
        RECEIVE_ITEM
    End Enum
    Enum GetPO_ListView_Enum
        INV_ITEM_ID = 0
        DESCR = 1
        INVENTORY_ITEM = 2
        DUE_DT = 3
        UPC_ID = 4
        UNIT_OF_MEASURE = 5
        LINE_QTY = 6
        RECEIVED_QTY = 7
        LINE_NBR = 8
        LOCATION = 9
        LINE_PO_QTY = 10
        ITM_ID_VNDR = 11
        MFG_ITEM_ID = 12
        SHIPTO_ID = 13
        INSP_FLAG = 14
        ADDRESS1 = 15
        ADDRESS2 = 16
        ADDRESS3 = 17
        REQ_NUM = 18
        DELIVER_TO = 19
        PRICE = 20
        PACKAGING_STRING = 21
		BUILDING=22
		FLOOR=23
		SECTOR=24
    End Enum
    Enum GetPO_Recv_ERP_RecvIDs_Enum
        STATUS_CODE = 0
        RECEIVERID = 1
        RECPT_DATE = 2
        INVOICE_NO = 3
        PACKSLIP_NO = 4
    End Enum
    Enum GetPO_Recv_ERP_Header
        PO_ID = 0
        BUSINESS_UNIT = 1
        RECEIVER_ID = 2
        VENDOR_ID = 3
        PO_DT = 4
        ERS_TYPE = 5
        HDR_CMTS = 6
        VNDR_NAME = 7
        TRANS_CODE = 8
        BUYER_ID = 9
        PHONE = 10
        NO_REC = 11 'Todo:  May need to be deleted, need to verify
        TRANSID = 12
		DROPSHIP_FL = 13
        SH_NAME = 14
        SH_ADDR1 = 15
        SH_ADDR2 = 16
        SH_ADDR3 = 17
        SH_ADDR4 = 18
        SH_CITY_ADDR5 = 19
    End Enum
    Enum GetPO_Recv_ERP_Details
        LN_NBR = 0
        SCHED_NBR = 1
        ITEM_ID = 2
        DESCR = 3
        MFG_ITM_ID = 4
        VNDR_ITM_ID = 5
        GTIN = 6
        UPC_ID = 7
        LCMNTS = 8
        DUE_DT = 9
        UOM = 10
        ISSUE_UOM = 11
        CONV_RATE = 12
        QTY_PO = 13
        RECV_QTY = 14
        QTY_SH_RECVD = 15
        TOLPCT = 16
        INSP_FLAG = 17
        SHIPTO_ID = 18
        INV_ITM_FLAG = 19
        ASSET_ITM_FLAG = 20
        LOT_FLAG = 21
        SRL_FLAG = 22
        PURCHASE_REQ_NO = 23
        CUST_ITEM_NO = 24        
		RECEIVING_ROUTING_ID = 25
		ITEM_TYPE = 26
		BIN_TRACK_FL = 27
        BILL_OF_LADING = 28
        PRICE = 29
        PACKAGING_STRING = 30
    End Enum
    Enum GetPO_Recv_ERP_AltUOM
        LN_NBR = 0
        UOM = 1
        CONV_FACT = 2
    End Enum
    Enum GetPO_Recv_ERP_LOC
        LN_NBR = 0
        SETID = 1
        LOCATION = 2
        DESCR = 3
        DEPTID = 4
        INVITM = 5
        REQUESTOR_ID = 6
        EMAILID = 7
        DELV_TO_NAME = 8
        ADDRESS1 = 9
        SCHED_NBR = 10
        ADDRESS2 = 11
        ADDRESS3 = 12
        PHONE = 13
		STORAGE_LOCATION = 14
		REQ_NUM = 15
		FLOOR = 16
        SECTOR = 17
        BUILDING = 18
        REQUISITION_NAME = 19
        BUYER_NAME = 20
		REQ_ID = 21
    End Enum
#End Region

#Region "Delete PO"

    Enum DeletePO_Recv_Header_Enum
        TRANS_ID = 0
    End Enum

#End Region

#Region "SendNonPOs"
    Enum SendNonPOs_Hdr
        TRANSACTION_ID = 0
        TRACKING_NBR = 1
        LOCATION = 2
        CARRIER_ID = 3
        DELIVER_TO = 4
        STATUS = 5
        USER_ID = 6
        DESCR = 7
        VENDOR_NAME1 = 8
        DEPT_ID = 9
        PO_ID = 10
        LINE_NBR = 11
        SHIPTO_ID = 12
        NON_PO_ITEM = 13
        TYPE_OF_PACKAGE = 14
        END_DT_TIME = 15
        START_DT_TIME = 16
        COMMENTS = 17
        LOCDESCR = 18
        PO_DT = 19
        VENDOR_ID = 20
		NOTES_COMMENTS=21
        NO_OF_PACKAGES = 22
    End Enum
	
	Enum Send_Recv_Output_Enum
        TRANSACTION_ID
    End Enum
#End Region

#Region "PO_NonPO_Receipts_Web"
    Enum Enum_Receive_Web_Prerequisites
        ALLOCATED_BUNITS = 0
        ALLOCATED_SHIPTOIDS = 1
        ORG_PARAMETERS = 2
        PROFILE_PARAMETERS = 3
        USER_PARAMETERS = 4
        SCREEN_DISPLAY = 5
        ALLOCATED_IUT_BUNITS = 6
        DELV_ALLOC_SHIPTOIDS = 7
    End Enum
#End Region

#End Region

#Region "Put Away"

#Region "Get Header"

    Enum Enum_Get_PutAway_Header
        BUSINESS_UNIT
        PO_ID
        PLAN_ID
    End Enum

    Enum Enum_Get_PutAway_Header_PreReqData
        SCHEMA_NAME
        REMOTE_DB_TYPE
    End Enum

    Enum Enum_Get_PutAway_Header_Transactions
        TRANSACTION_ID
    End Enum

    Enum Enum_Get_PutAway_Header_BusinessUnit
        BUSINESS_UNIT
    End Enum

    Enum Eum_Get_PutAway_Header_OutPut
        BUSINESS_UNIT
        PLAN_ID
        PO_ID
        STAGED_DATE
        VENDOR_ID
        PUTAWAY_STATUS
    End Enum

#End Region

#Region "Get Details"

    Enum Enum_Get_Detail_Defns
        USER_ID
    End Enum

    Public Enum GetDetails_PutAway_Header_Enum
        PLAN_ID = 0
        PO_ID = 1
    End Enum

    Public Enum GetDetails_PutAway_Transactions_Enum
        TRANSACTION_ID = 0
    End Enum

    Public Enum GetDetails_PutAway_BusinessUnits_Enum
        BUSINESS_UNIT = 0
    End Enum

    Public Enum GetDetails_PutAway_PreReqData_Enum
        MultipleUserDownload = 0
        ITEM_UPN_TYPE_CODE = 1
        ITEM_NDC_TYPE_CODE = 2
        REMOTE_SCHEMA = 3
        REMOTE_DB_TYPE = 4
        ITEM_DESCR = 5
        DEFAULT_MFG_ITEM_ID = 6
        ITEM_PRICE = 7
        PACKAGING_STRING_FOR_LABELS = 8
    End Enum

    Public Enum GetDetails_PutAway_ListView_Enum
        PRICE = 0
        VENDOR_ITEM_ID = 1
        MFG_ITEM_ID = 2
        PACKAGING_STRING = 3
    End Enum

    Public Enum GetDetails_PutAway_Output_Enum
        PTWYPLAN_LN_NBR = 0
        INV_ITEM_ID = 1
        QTY_BASE = 2
        UNIT_OF_MEASURE = 3
        STORAGE_AREA = 4
        STOR_LEVEL_1 = 5
        STOR_LEVEL_2 = 6
        STOR_LEVEL_3 = 7
        STOR_LEVEL_4 = 8
        PO_ID = 9
        VENDOR_ID = 10
        RECEIVER_ID = 11
        RECV_LN_NBR = 12
        ITEM_DESCR = 13
        VENDOR_ITEM_ID = 14
        MFG_ITEM_ID = 15
        UPDATE_QTY = 16
        GTIN = 17
        UPCID = 18
        CUSTITEMID = 19
        INV_LOT_ID = 20
        SERIAL_ID = 21
        PRICE = 22
        PACKAGING_STRING = 23
    End Enum

    Public Enum GetDetails_PutAway_Output_Header_Enum
        TRANSACTION_ID = 0
    End Enum

#End Region

#Region "Delete Header"

    Enum Enum_Delete_PutAway_Header
        BUSINESS_UNIT
        PO_ID
        PLAN_ID
        TRANSACTION_ID
    End Enum

#End Region

#Region "Send Details"

    Public Enum SendDetails_PutAway_Header_Enum
        BUSINESS_UNIT
        PTWY_PLAN_ID
        USER_ID
        TRANSACTION_ID
        PO_ID
		VENDOR_ID
        START_TIME
        END_TIME
    End Enum

    Public Enum SendDetails_PutAway_Details_Enum
        PTWYPLAN_LN_NBR
        DT_TIMESTAMP
        INV_ITEM_ID
        STORAGE_AREA
        STOR_LEVEL_1
        STOR_LEVEL_2
        STOR_LEVEL_3
        STOR_LEVEL_4
        RECV_LN_NBR
        UNIT_OF_MEASURE
        QTY
        BASE_QTY
        VENDOR_ID
        STAGED_DATE
        RECEIVER_ID
        START_TIME
        END_TIME
        CUST_ITEM_NO
        LINE_NBR
        INV_LOT_ID
        SERIAL_ID
    End Enum

    Public Enum SendDetails_PutAway_PreReq_Enum
        PS_USER
        ITEM_PUTAWAY_HIGH_PCT
        ITEM_PUTAWAY_LOW_PCT
        REMOTE_SCHEMA
        REMOTE_DB_TYPE
        TRANSACTION_STATUS_REMOTESUCCESS
        ENTERPRISE_SYSTEM_NAME
        ENTERPRISE_VERSION
    End Enum

    Public Enum SendDetails_PutAway_Output_Enum
        STATUS_CODE
    End Enum

#End Region

#End Region

#Region "IUT"

#Region "IUT Search"

    Enum SearchIUT_Header_Enum
        BUSINESS_UNIT = 0
        ITEM_ID = 1
        FROM_DATE = 2
        TO_DATE = 3
        PRODUCT = 4
    End Enum

    Enum SearchIUT_PreReqData_Enum
        SCHEMA_NAME = 0
    End Enum

#End Region

#Region "IUT Get"

    Enum GetIUT_Header_Enum
        CANCEL_TRANSID = 0
        BUSINESS_UNIT = 1
        IUT_ORDERNO = 2
        PRODUCT = 3
    End Enum
    Enum GetIUT_PreReqData_Enum
        MULTI_IUT_DOWNLOAD = 0
        ITEM_UPN_TYPE_CODE = 1
        ITEM_NDC_TYPE_CODE = 2
        SCHEMA_NAME = 3
        REMOTE_DB_TYPE = 4
        DEFAULT_MFG_ITEM_ID = 5
		ITEM_DESCR = 6 
        ITEM_PRICE = 7
        PACKAGING_STRING_FOR_LABELS = 8
    End Enum

    Enum GetIUT_ListView_Enum
        PACKAGING_STRING = 0
    End Enum

    Enum GetIUT_ERP_Header_Enum
        DESTIN_BU = 0
        ORIG_BU = 1
        INTERUNIT_ID = 2
        INTERUNIT_LINE = 3
        INV_ITEM_ID = 4
        STORAGE_AREA = 5
        STOR_LEVEL_1 = 6
        STOR_LEVEL_2 = 7
        STOR_LEVEL_3 = 8
        STOR_LEVEL_4 = 9
        QTY_SHIPPED = 10
        LAST_QTY_SHIP = 11
        DEST_SA = 12
        DEST_SL1 = 13
        DEST_SL2 = 14
        DEST_SL3 = 15
        DEST_SL4 = 16
        UNIT_MEASURE_SHIP = 17
        SHIP_DTTM = 18
        TRANSACTION_ID = 19
        DESCRIPTION = 20
        UPC_ID = 21
        VENDOR_ITEM_ID = 22
        MFG_ITEM_ID = 23
        GTIN = 24
        SERIAL_FLAG = 25
        LOT_FLAG = 26
        QTY_RECEIVED = 27
        INV_LOT_ID = 28
        SERIAL_ID = 29
        PRICE = 30
        PACKAGING_STRING = 31
    End Enum

#End Region

#Region "IUT Delete"

    Public Enum Delete_IUT_Header_Enum
        PRODUCT
    End Enum

#End Region

#Region "IUT Send"
    Enum SendIUT_Header_Enum
        PRODUCT_ID = 0
    End Enum

    Enum SendIUT_TRANSACTIONS_Enum
        TRANSACTION_ID = 0
    End Enum

    Enum SendIUT_DETAILS_Enum
        TRANSACTION_ID = 0
        DESTIN_BUSINESS_UNIT = 1
        ORIG_BUSINESS_UNIT = 2
        INTERUNIT_ID = 3
        START_DT_TIME = 4
        END_DT_TIME = 5
        USER_ID = 6
        LINE_NO = 7
        ITEM_ID = 8
        DESCRIPTION = 9
        QTY = 10
        QTY_SHIPPED = 11
        UOM = 12
        CARRIER_ID = 13
        BILL_OF_LADING = 14
        NO_OF_PKGS = 15
        INV_LOT_ID = 16
        SERIAL_ID = 17
        INTERUNIT_LINE = 18
    End Enum

    Enum SendIUT_PreReqData_Enum
        PS_USER = 0
        ITEM_RECV_LOW_PCT = 1
        ITEM_RECV_HIGH_PCT = 2
        REMOTE_SCHEMA = 3
        REMOTE_DB_TYPE = 4
        TRANSACTION_STATUS_REMOTESUCCESS = 5
        ENTERPRISE_SYSTEM_NAME = 6
        ENTERPRISE_VERSION = 7
    End Enum
#End Region

#End Region

#Region "StockIssue"

    ''' <summary>
    ''' Header Fields sent in the InputParameters variable of SendStockIssue
    ''' </summary>
    ''' <remarks></remarks>
    Enum Send_StockIssue_Header_Enum
        BUSINESS_UNIT = 0
        ORDER_NO = 1
        LOCATION = 2
        STATUS = 3
        DEPARTMENT_ID = 4
        PATIENT_ID = 5
        ISSUETO_USER_ID = 6
        CURRENT_USER_ID = 7
        SUSER_ID = 8
        START_DATE = 9
        END_DATE = 10
        DISTRIB_TYPE = 11
        SIGNATURE_ID = 12
        SIGNATURE = 13
        TRANSACTION_ID = 14
        COUNT_FLAG = 15
        COMPANY = 16
    End Enum

    ''' <summary>
    ''' Details Fields sent in the InputParameters variable of SendStockIssue
    ''' </summary>
    ''' <remarks></remarks>
    Enum Send_StockIssue_Details_Enum
        ITEM_ID = 0
        STORAGE_LOCATION = 1
        STORAGE_AREA = 2
        STOR_LEVEL_1 = 3
        STOR_LEVEL_2 = 4
        STOR_LEVEL_3 = 5
        STOR_LEVEL_4 = 6
        UOM = 7
        QTY = 8
        ACTUAL_ISSUED_UOM = 9
        ACTUAL_ISSUED_QTY = 10
        PRICE = 11
		SERIAL_ID = 12
		LOT_ID = 13
        CONTAINER_ID = 14
        ADJUST_TYPE = 15
        PROCESS_TYPE = 16
        ADJUST_QTY = 17
        ACCOUNT = 18
        DESTIN_GL_BU = 19
        EXPIRY_DATE = 20
		STD_UOM = 21
        ITEM_DESC = 22
        COMPARTMENT = 23
        UNIT_COST = 24
    End Enum

    Enum Send_StockIssue_Sub_Details_Enum
        ITEM_ID = 0
        STORAGE_LOCATION = 1
        STORAGE_AREA = 2
        STOR_LEVEL_1 = 3
        STOR_LEVEL_2 = 4
        STOR_LEVEL_3 = 5
        STOR_LEVEL_4 = 6
        UOM = 7
        QTY = 8
        ACTUAL_ISSUED_UOM = 9
        ACTUAL_ISSUED_QTY = 10
        PRICE = 11
        SERIAL_ID = 12
        LOT_ID = 13
        CONTAINER_ID = 14
        ADJUST_TYPE = 15
        PROCESS_TYPE = 16
        ADJUST_QTY = 17
        ACCOUNT = 18
        DESTIN_GL_BU = 19
        EXPIRY_DATE = 20
        STD_UOM = 21
        ITEM_DESC = 22
    End Enum

    ''' <summary>
    ''' Output data from SendStockIssue
    ''' </summary>
    ''' <remarks></remarks>
    Enum Send_StockIssue_Output_Enum
        STATUS_CODE
		STATUS_DESCR
        DOCUMENT_ID
        TRANSACTION_ID
        ORDER_NO
	End Enum

    ''' <summary>
    ''' intermediate pre-requisite data required to process SendCartDetails 
    ''' in the BusinessRules and Data Layer
    ''' </summary>
    ''' <remarks></remarks>
    Enum Send_StockIssue_BusinessRules_Enum
        CREATE_MSR_FOR_ISSUE = 0
        PSCILOGINURL = 1
        STOR_LOC_REQD = 2
        DEFAULT_LOC_AS_DEPT = 3
        ONE_ITEM_IN_MSR = 4
        SIGNATURE_ID = 5
        PRICE = 6
        OPRID_MODIFIED_BY = 7
        COMPONENT_NAME = 8
        EXP_PUTAWAY_CI_NAME = 9
        RMA_COMPONENT_INTERFACE = 10
        RMA_CI_NAME = 11
        ENTERPRISE_SYSTEM_NAME = 12
        ENTERPRISE_VERSION = 13
        DOC_ID_GENERATION = 14
        DEFAULT_COMPANY = 15
        IGNORE_DOC_REL_ERR = 16
        REMOTE_DB_TYPE = 17
        REMOTE_SCHEMA = 18
        REASON_CD = 19
		INV_DATA_SYNC  = 20
		UNIT_MEASURE_PICK = 21
		TRANSACTION_STATUS=22
		CREATE_RMA_RECEIPT = 23
        RMA_RECEIPT_CI_NAME = 24
        SKIP_ISSUE_ITEMS_IN_PEOPLESOFT = 25
        LOT_SERIAL_ENABLED = 26
        ITEM_PRICE = 27
        ITEM_DESCR = 28
        DEFAULT_MFG_ITEM_ID = 29
        ITEM_NDC_TYPE_CODE = 30
        ITEM_UPN_TYPE_CODE = 31
        ALLOW_NEGATIVE_INVENTORY = 32

    End Enum

    Enum Get_StockIssue_Details_Enum
        BUSINESS_UNIT
        BUNIT_DESCR
        ORDER_BY
        ORDER_BY_ORDER
        BUNIT
        MFG_ITEM_REQD
        VENDOR_ITEM_REQD
        PRICE_REQD
        ITEM_DESCR
        DEFAULT_MFG_ITEM_ID
        CUSTOM_SQL_DESTLOCATION
        ITEM_UPN_TYPE_CODE
        ITEM_NDC_TYPE_CODE
        BIN_TO_BIN_ACCESS
        APP_ID
        ALLOC_DEST_LOC_REQUIRED
        ALLOW_NEGATIVE_INVENTORY
        ITEM_PRICE_TYPE
        USER_ID
    End Enum

	Enum Get_StockIssue_RMA_Receipt_Details_Enum
        RMA_ID = 0
        INV_ITEM_ID = 1
        QTY_RETURNED = 2
        RMA_LINE_NBR = 3
        RETURN_TO_IBU = 4
		UNIT_OF_MEASURE = 5
    End Enum
	
    Enum StockIssue_PreReq_Enum
        CUSTOM_SQL_DESTLOCATION = 0
    End Enum

    Enum StockIssue_Process_Types
        EIP = 0
        CI = 1
        ADJ = 2
    End Enum
	
	Enum StockIssue_LotSerial_Types
        L = 0
        S = 1
        B = 2
    End Enum

#End Region

#Region "PointOfUse"

    Enum Get_Cart_Details
        BUSINESS_UNIT
        CART_ID
		LOCATION_TYPE
    End Enum

    Enum Get_Ptwy_Orders
        ORDER_ID
		LOCATION_TYPE
    End Enum

    Enum Get_Recall_ParamValue_Enum
        RECALL_MGMT_IMPLEMENTED = 0
    End Enum

    Enum Send_POU_Issue_Header_Enum
        BUSINESS_UNIT = 0
        ORDER_NO = 1
        LOCATION = 2
        STATUS = 3
        DEPARTMENT_ID = 4
        PATIENT_ID = 5
        ISSUETO_USER_ID = 6
        CURRENT_USER_ID = 7
        SUSER_ID = 8
        START_DATE = 9
        END_DATE = 10
        DISTRIB_TYPE = 11
        SIGNATURE_ID = 12
        SIGNATURE = 13
        TRANSACTION_ID = 14
    End Enum

    Enum Send_POU_Issue_Details_Enum
        ITEM_ID = 0
        STORAGE_LOCATION = 1
        STORAGE_AREA = 2
        STOR_LEVEL_1 = 3
        STOR_LEVEL_2 = 4
        STOR_LEVEL_3 = 5
        STOR_LEVEL_4 = 6
        UOM = 7
        QTY = 8
        ACTUAL_ISSUED_UOM = 9
        ACTUAL_ISSUED_QTY = 10
        PRICE = 11
    End Enum

    Enum Send_POU_Issue_PreReq_Enum
        CREATE_MSR_FOR_ISSUE = 0
        PSCILOGINURL = 1
        STOR_LOC_REQD = 2
        DEFAULT_LOC_AS_DEPT = 3
        ONE_ITEM_IN_MSR = 4
        SIGNATURE_ID = 5
        PRICE = 6
        OPRID_MODIFIED_BY = 7
        COMPONENT_NAME = 8
        EXP_PUTAWAY_CI_NAME = 9
    End Enum

    Enum Send_POU_Issue_Output_Enum
        STATUS_CODE
        DOCUMENT_ID
        TRANSACTION_ID
        ORDER_NO
    End Enum

    Public Enum InterfaceType_Enum
        MM_INTERFACE
        BILLING_INTERFACE
    End Enum

    Public Enum ProcessParamID_Enum
        ISSUE_OR_COUNT
        ISSUE_BATCH_REALTIME_MANUAL
        COUNT_BATCH_MANUAL
        BATCH_REALTIME_MANUAL
    End Enum

    Public Enum ProcessMode_Enum
        ISSUE
        BATCH
        COUNT
    End Enum

    Public Enum BillingOption_Enum
        REAL_TIME = 1
        BATCH = 2
    End Enum

    Public Enum POU_Setup
        REASONS
        PROCEDURES
        COSTCENTER
        CASECARTS
        SPECIALTY
    End Enum
	
	Public Enum SMTP_AUTHENTICATE_VALUES
        CDOANONYMOUS = 0
        CDOBASIC = 1
        CDONTLM = 2
    End Enum

    Public Enum SMTP_SENDUSING_VALUES
        LOCAL = 1
        NETWORK = 2
    End Enum

    Public Enum Bill_Only_Item_Details_Enum
        ORG_GROUP_ID = 0
        ORG_ID = 1
        ITEM_ID = 2
        ITEM_DESC = 3
        PAR_LOC_ID = 4
        VENDOR_ID = 5
        VENDOR_ITEM_ID = 6
        MANUFACTURER = 7
        MANF_ITEM_ID = 8
        LOT_NUMBER = 9
        SERIAL_NUMBER = 10
        UPC_ID = 11
        EXPIRY_DATE = 12
        ITEM_QTY = 13
        TRANS_TYPE = 14
        IS_CATALOG_PO = 15
        DEPT_ID = 16
        ITEM_PRICE = 17
        UOM = 18
        CUST_ITEM_NO = 19
        GTIN = 20
        PRICE = 21
        IMPLANT = 22
    End Enum

    Public Enum Search_POU_Item_Header_Enum
        ITEMID = 0
        ITEM_DESCR = 1
        MANUFACTURER = 2
        SCANFLAG = 3
    End Enum

    Public Enum Search_POU_Item_PreReqData_Enum
        ITEM_DESCR = 0
        ITEM_PRICE = 1
        DEFAULT_MFG_ITEM_ID = 2
        ITEM_NDC_TYPE_CODE = 3
        ITEM_UPN_TYPE_CODE = 4
        REMOTE_DATABASE = 5
        REMOTE_SCHEMA = 6
    End Enum

    Public Enum Search_POU_Item_Enum
        ITEMID = 0
        ITEM_DESCR = 1
        MFG_ITEM_ID = 2
        VENDOR_ITEM_ID = 3
        MANUFACTURER = 4
        UPCID = 5
        ITEM_PRICE = 6
        UOM = 7
        LOT_CONTROLLED = 8
        SERIAL_CONTROLLED = 9
        VENDOR_ID = 10
        CUST_ITEM_NO = 11
		ITEM_TYPE = 12
        GTIN = 13
        IMPLANT_FLAG = 14
        ITEM_MASTER_ITEM_STATUS = 15
        NON_CART_ITEM_STATUS = 16
        BILL_ITEM_STATUS = 17
        PAR_LOC_STATUS = 18
        LOT_NUMBER = 19
        SERIAL_NUMBER = 20
        BUSINESS_UNIT = 21
		EXPIRY_DATE = 22
    End Enum

    Public Enum Item_POU_Workflow_Review_Status
        VENDOR_REVIEW_STATUS
        DEPT_REVIEW_STATUS
        EXCEPTION_REVIEW_STATUS
    End Enum
	
	Public Enum REASON_CODE
        RECALL_ITEM
        EXP_ITEM
    End Enum
	
	Public Enum Case_Status
        OPEN = 1
        PICKED = 5
        CLOSED = 10
        PENDING = 15
    End Enum
	
	Public Enum LocationType
        A 'Atpar
        I 'Inventory
        P 'ParLocation
    End Enum

    Public Enum Search_Field
        ITEM_ID
        MFG_ITEM_ID
        UPC_ID
    End Enum
	Enum POU_Menus
        Issue = 1
        Returns = 2
        Cyclecount = 3
        Putaway = 4
        CaseIssue = 5
		CasePick = 6
        RecordConsumption = 7
        RecordConSearch = 8
		Pick = 9
    End Enum
    Enum CASE_EDITING_OPTIONS
        AddCase = 1
        ChangeStatus = 2
        ReplaceCase = 3
        ReplacePref = 4
    End Enum
    Enum ITEM_TRANS_TYPE
        CONSIGNED = 1
        BILLONLY = 2
        NONE = 3
    End Enum

    Enum Return_Type
        WITHPATIENT = 1
        WITHOUTPATIENT = 2
    End Enum

    Enum Process_Type
        Replenishment = 0
        Billing = 1
        LowStock = 2
        Expiration = 3
        Recall = 4
        BillOnly = 5
		Alert = 6
    End Enum

    Enum Process_Tab_Name
        Replenishment
        Billing
        Alerts
    End Enum

    Enum RecCon_TransType
        SAVE
        CLOSE
        SAVE_WITH_RETURN
    End Enum
	
    Enum INV_TRANS
        CycleCount = 2
        Issue = 6
        Returned = 16
        Putaway = 4
        CaseIssued = 25
        RecordConsumption = 26
        CasePick = 3
        ReConIssue = 27
        CaseCancel = 13
        PrefReplaced = 17
        Pick = 28
    End Enum

    Enum Case_Review_Type
        PRE = 0
        POST
    End Enum

    Enum CASE_PICK_STATUS
        OPEN = 0
        READY = 1
        PARTIALLYPICKED = 3
        PICKED = 5
        RETURNED = 7
        REVIEWED = 9
        CLOSED = 10
        REPLACED = 11
        INACTIVE = 12
        CANCELLED = 13
        PENDING = 15
        PREF_REPLACED = 17
        CASEISSUED = 25
        REMOVE = 50
    End Enum

    Enum CaseItem_Source
        HL7 = 0
        ATPAR = 1
        MODIFIED = 2
    End Enum
	
	Enum Item_Source_Type
        NONPREF_CART = 0
        PREF_CART = 1
        IMPLANT = 2
    End Enum
	
	Enum CASE_INFO_SYSTEM
        HSM = 0
        PICIS
        EPIC
    End Enum

    Enum CASE_INFO_TABLES
        CASE_DETAILS = 0
        SPECIALITY_DETAILS
        PHYSICIAN_DETAILS
        PROCEDURE_DETAILS
        PREF_LIST_DETAILS
		DEPT_DETAILS
    End Enum
	
	Enum WF_ITEM_STATUS
        ACTIVE = 0
        HOLD = 1
        CANCEL = 2
        REVIEWED = 3
    End Enum
	
	Enum PHYSICIANS_BASEDON
        PROCEDURE = 0
        PREFERENCELIST = 1        
    End Enum

    Enum PHYSICIAN_STATUS
        ACTIVE = 0
        INACTIVE = 1
        ALL = 2
    End Enum

	Enum RESVR_QTY_OPTION
        NONE
        TOTALPICKQTY
        HOLDQTYONLY
    End Enum
    Enum HL7_MESSAGE_SENT_STATUS
        SUCESS = 0
        FAILED = 1
    End Enum
    Enum HL7_MESSAGE_TYPE
        NIU_V = 1
        NIU_W = 2
        NIU_R = 3
        BILLING = 4
        CASE_INFO = 5
    End Enum
   Enum HL7_TRANSACTION_TYPE
        V = 0 'VENDOR
        W = 1 'WASTAGE
        R = 2 'RETURN
    End Enum
    
    Enum CASE_CURRENT_STATUS
        NOT_STARTED = 0
        INPROCESS = 1
        COMPLETE = 2
    End Enum

    Enum CASE_PICKING_STAGE
        NONE = 0
        PRIMARY = 1
        FINISH = 2
    End Enum

	Enum REPENISH_FROM
	POU_INVENTORY
	PAR
	MMIS
	End Enum
#End Region

#Region "TrackIT"

    Public Enum Tkit_TransType_Enum
        Create
        CheckIn
        Request
        Move
    End Enum

    Public Enum Tkit_ItemTypeIndicator_Enum
        E
        F
        B
    End Enum

	Enum enum_TKIT_EQP_TYPE
        B   'BOX
        E   'EQUIPMENT
        F   'FURNITURE
    End Enum

	Enum enum_Requestor_Status
		A	'Active
		I	'InActive
	End Enum

	Enum enum_Requestor_Details
        REQUESTOR_ID = 0
		PASSHASH
		FIRSTNAME
        MIDDLENAME
        LASTNAME
        PHONE
        EMAIL
        FAX
        PAGER
        DEFDELVLOCATION
        ORGGROUPID
        STATUS
		RECSPERPAGE
		DEFDURATION
		NOOFREQPEREQITEM
		DEPARTMENTS
        SAVEMODE
	End Enum

	Enum enum_TKIT_OrderStatus
		All
		Open
		Pick
		Load
		Unload
		Delivered
		Cancelled
	End Enum

	Enum enum_CHECKINOUT
		CIN		'CheckIn
		COUT	'CheckOut
	End Enum
    
#End Region

#Region "AtPar Application Parameters"

    Enum AppParameters_Enum
        EXCLUDE_LOCATIONS
        ALLOW_BIN_TO_BIN
        ALLOW_CART_PUTAWAY_ONLY
        ALLOW_EXCESS_PAR
        ALLOW_EXCESS_QTY
        ALLOW_EXCESS_RECV_QTY
        ALLOW_GT_ALOC_QTY
        ALLOW_GT_REQ_QTY
        ALLOW_LESS_QTY
        ALLOW_NEGATIVE_INVENTORY
        ALLOW_RETURNS
        ALLOW_USERS
        ALT_UOM_DISPLAY_OPT
        ASN_DOWNLOAD_BY
        ASN_RECEIPT_STATUS
        AUTO_ADDTOISSUE
        BADGE_TRACK_INFO
        CART_ALLOCATION
        CART_DEF_CHANGE
        COUNT_IN_DIFF_UOMS
        CREATE_MSR_FOR_ISSUE
        CUSTOM_SQL_DESTLOCATION
        CART_BULK_PRINT_OPTION
        DEFAULT_BUSINESS_UNIT
        DEFAULT_CARRIER_ID
        DEFAULT_DATE_RANGE
        DEFAULT_DESTIN_BUSINESS_UNIT
        DEFAULT_DISTRIB_TYPE
        DEFAULT_INPUT
        DEFAULT_MFG_ITEM_ID
        DEFAULT_PICKUP_BUNIT
        DEFAULT_PRIORITY
        DEFAULT_SHIP_TO_LOC
        DEFAULT_SHIPTO_ID
        DEFAULT_UOM
        DEL_ITEMS
        DELIVER_BUSINESS_UNIT
        DELIVER_SEND_SIGN_IN_MAIL
        DELIVERY_LOCATION_CONFIRMATION
        DELV_RCPT_PRINT_NT_PRINTER
        DELV_RECEIPT_EMAIL
        DELV_RECEIPT_PRINT
        DEST_LOC_COMBO
        DISP_ALT_UOM
        DISPLAY_ALL_OPTION_ON_INQUIRY
        DISPLAY_COMMENTS
        DISPLAY_FOQ_MAX
        DISPLAY_PREV_COUNT
        DISPLAY_RECEIVE_QTY
        DISPLAY_RECVD_QTY
        DISPLAY_SYS_QTY
        DISTRIB_TYPE_REQUIRED
        DOWNLOAD_BY_PO_ID
        EDIT_BUSINESS_UNIT
        EDIT_COUNTS
        EDIT_PAR
        EDIT_SHIPTO_ID
        EDIT_UOM
        ENABLE_NUMBER_SIP
        ENABLE_SIP
        ERP_USER_ID
        EVENT_ALLOCATION
        FACTOR_OF_SAFETY
        HANDING_ITEMS
        IGNORE_PUTAWAY_QTY
        INV_DATA_SYNC
        SYNC_ALL_BUNITS
        ISSUE_TO_USER_REQD
        ITEM_COUNT_HIGH_PCT
        ITEM_COUNT_LOW_PCT
        ITEM_DESCR
        ITEM_NDC_TYPE_CODE
        ITEM_PICK_HIGH_PCT
        ITEM_PICK_LOW_PCT
        ITEM_PRICE
        ITEM_PUTAWAY_HIGH_PCT
        ITEM_PUTAWAY_LOW_PCT
        ITEM_RECV_HIGH_PCT
        ITEM_RECV_LOW_PCT
        ITEM_UPN_TYPE_CODE
        LIMIT_OF_LISTS
        LOC_CHECK_REQD
        LOCATION_ALLOCATION
        MANDATORY_COUNT
        MANDATORY_INPUT
        MANDATORY_PICK
        MANDATORY_PUTAWAY
        MANDATORY_SIGNATURE
        MAX_NO_OF_REC_DOWNLOAD
        MULTI_IUT_DOWNLOAD
        MULTIPLE_USER_DOWNLOAD
        MM_COORD_EMAIL
        NON_PO_ITEMS_RECEIVE
        NON_STOCK_STORE
        PATIENT_ID_REQD
        PICK_CONFIRMATION
        PICKUP_MULTI_LOC
        PO_ID_OR_LOC_REQUIRED
        PO_IUT_RECEIVING
        PS_USER
        PUTAWAY_CART_ITEMS
        QTY_OPTION
        QTY_OPTION_HH
        REQD_SHIPTO_ID
        REQUESTOR_EMAIL_TABLE
        REQUIRE_DEPT
        RESET_DATE_RANGE
        REVIEW_COUNTS
        SEARCH_ON_SERVER
        SEND_DELIVER_DATA
        SEND_LOAD_DATA
        SEND_PICK_DATA
        SEND_UNLOAD_DATA
        SHIP_TO_LOC_ALLOCATION
        SHOW_SIGN_SCREEN
        SIGN_REQD
        SORT_BY_COLUMN
        STOR_LOC_REQD
        STORE_DETAILED_COUNT_HISTORY
        SUPER_USER
        SYS_COUNT_PCT_DEVIATION
        TRUNC_LEADING_ZEROS
        UPDATE_COUNTDATE_WEB
        REQ_ZIP_RELEASE
        STOP_REL_NON_STOCK_REQ
        REQUESTOR_ID
        IGNORE_REQ_REL_ERR
        DEFAULT_LOC_AS_DEPT
        ONE_ITEM_IN_MSR
        CARTS_MNGD_ATPAR
        QTY_ROUND_TYPE
        CALCULATE_REQ_QTY
        SEND_RECEIVE_DATA
        ALLOC_DEST_LOC_REQUIRED
        STATUS_OF_REQUISITION
        EMAILID_FOR_ALERTS
        SEPARATE_ORDER_FOR_EACH_ISSUE
        RESERVE_QTY
        RMA_COMPONENT_INTERFACE
        HL7_BILLING_MESG
        COORDINATOR_EMAIL_PICKREQ
        COORDINATOR_EMAIL_STOCKREQ
        POST_STOCK_ON_ERP
        ENABLE_PICKLIST_PRINT
        PICKLIST_PRINTERNAME
        COORDINATOR_EMAILSTOCKLESSREQ
        COORDINATOR_EMAIL_NONSTOCKREQ
        IGNORE_REQ_CREATE_ERR
        VERIFY_NONSTOCK_ON_ERPPOST
        VERIFY_CONSIGN_ON_ERPPOST
        POST_STOCKLESS_ON_ERP
        COORDINATOR_EMAIL_CONSIGNREQ
        COORDINATOR_EMAIL_STOCKXFER
        PRINT_PATIENT_CHARGE
        COORDINATOR_EMAIL_STOCKISSUE
        RECORDS_PER_PAGE_ALL
        RESTRICT_COUNT_QTY
        RESTRICT_COUNT_QTY_DIGITS
        RESTRICT_ISSUE_QTY
        RESTRICT_ISSUE_QTY_DIGITS
		COORDINATOR_EMAIL_RECEIVEREQ
		UPDATE_ERP_ORDERS       	
        CHECK_PLANS_SENT
        COORDINATOR_EMAIL_EMPLOYEEDATA
        CREATE_NSTKREQ_BYPAR
        RECV_EXCLUDE_CAPITAL_POS
        PRINTER_ADDRESS
        DOC_ID_GENERATION
        IGNORE_DOC_REL_ERR
        DISPLAY_LAST_ORDER_QTY_KILL
        SILENT_SCAN
        ZERO_RECEIPT_WARN
        DISPLAY_QTY_WARN_MSG
        CHARGE_CAPTURE
        RECV_ORDER_NON_STOCK
        DEFAULT_COMPANY
        INCLUDE_ZERO_ORDERED_ITEMS
		PICK_STOCK_STORE
		DURATION_TRACKING_EXP
		SYNC_MULTIPLE_LOC_INFO
		SEARCH_FOR_ASN_POS
        SEARCH_BY_DUE_OR_PO_DATE
        PARCEL_COUNT
        FTP_TO_SERVER
        REASON_CODE
		PICK_ENABLE_LOT_SRL_TRACKING
		PICK_UPDATE_POU_INVENTORY
		PICK_SEND_LOT_SRL_INFO_TO_MMIS
        VENDOR_REVIEW_REQ
        EXCEP_APPROVAL_REQ
        ADJ_REASON_CODE
        LOT_SERIAL_ENABLED
        POU_IMPLEMENTED
        SEND_LOT_SERIAL_INFO_TO_MMIS
        STORE_LOT_SERIAL_INFO_IN_ATPAR
		ALLOW_FRACTION_VALUE
		AUTO_GET_ENABLED
        AUTO_PICK_ENABLED
        ENABLE_LOAD_EVENT
        ENABLE_UNLOAD_EVENT
		HANDING_ITEMS_TO_GROUP
		SHIPPING_LABEL_PRINT_OPTIONS
        WARN_COUNT_QTY
        RECV_PRINT_POID_COMMENTS
        SELECT_ALL
		RECV_CONCATINATE_POID_TRKNO
        RECALL_NOTIFICATION_EMAIL
        PICK_ALLOC_STORAGE_LOC_REQ
        PICK_MULT_USERS_DOWNLOAD_PLAN
        ALLOW_NEGATIVE_QTY
        SHOW_SIGN_IN_TRACKREPORT
        B_MAX_STOR
        E_MAX_STOR
        F_MAX_STOR
        NO_OF_REQUESTS_FOR_SAME_EQ_ITM
        PATIENT_CHARGE
        SHOW_LOC_UPDATE
        UPDATE_TRACKIT_USER_PROFILE
        FREQUENCY_EMAIL_ALERTS
        PERCENTAGE_OPTIMUM_QTY
        SEND_EMAIL_ALERTS
        DEFAULT_PRINTER
        PICK_REQUIRED
        SEND_RETURN_DATA
        SEND_TAKE_DATA
        ALLOW_EDITING_ORDERS
        ALLOW_OVER_PUTAWAY
        DEFAULT_POU_SCREEN
        DISPLAY_DEFAULT_QTY_TO_RECEIVE
        DISPLAY_LOCATION
        DISPLAY_QTY_ON_HAND
        POU_CASECART_ACCESS
        REQUIRE_ACCOUNT_ID
        REQUIRE_EXAM_ID
        REQUIRE_PATIENT_ID
        REQUIRE_PHYSICIAN
        WASTAGE_QTY
        DEL_INACTIVEITEM_CART
        GENERATE_PICK_PLAN
		VALIDATE_DEPT
        CUSTOM_SQL_DEPT
        SYNC_FREQUENCY
		SEND_NET_ITEM_USAGE_INFO
        CASE_PICK_INTERFACE
        CUSTOM_VIEW_ERPUSER
        PARCEL_COUNT_DISABLE_SCAN
        SEARCH_PO_WITHOUT_BU
        CATEGORY_CODE
        RECEIPT_DELIVER_PRINT_OPTIONS
        RECEIPT_DELIVER_PRINTER_NAME
        PRINT_RECVHEADER_EACH_PAGE
        PACKAGING_STRING_FOR_LABELS
        PRINT_PICKHEADER_EACH_PAGE
		DEFAULT_LEAD_TIME		
		ENABLE_PALLET_BUTTON
		EMAILID_FOR_PRODUCT_EXP_ALERTS
		EMAILID_FOR_LOWSTOCK_ALERTS
		MAX_ALLOW_QTY
        ENABLE_CASE_CONSUMPTION_REVIEW
        DISPLAY_ORDERING_UOM_TYPE
        DEFAULT_UNIT_OF_MEASURE
        EDIT_PICK_UOM
        USE_BARCODE_BY_CARRIER
        LABEL_PRINTERS
        DEFAULT_LABEL_PRINTER
		SYNC_ALL_LOCATIONS
        CREATE_RMA_RECEIPT
        SECOND_VERIFICATION_SIGNATURE
		RX_PREPARE_PICK
		SYNCH_SCAN_ENTERED_ITEM
        RESTRICT_ZERO_QTY
        DISPLAY_CURRENT_SYS_QTY
        DEFAULT_LOCATION
        DEFAULT_DEPARTMENT
        COUNT_DLR_VALUE_THRESHOLD
        COUNT_QTY_THRESHOLD
        SKIP_ISSUE_ITEMS_IN_PEOPLESOFT
        PRINT_SHIPPING_LABEL
        ORDER_NO_REQUIRED
        PHARMACY_MENU_ACCESS
        PRINT_CART_HEADER_DETAILS
        POSTPICKQA_PRINT_HHT
        ALTERNATE_PRINTER_NAME
        ALLOW_USERS_RETURNS
        VIEW_CLOSED_CASES
        ITEM_PRICE_TYPE
        PERFORM_MANUAL_COUNTS
        REVIEW_MANUAL_COUNTS
		ALLOW_EDITING_CASE
		TEMPLOCATION
        TEMPVENDOR
        AUTO_CASE_PICK
        RECEIVE_ITEM
    End Enum
#End Region

#Region "ERP Constants"

    Public Enum CartCountStatus_Enum
        UNPROCESSED = 1
        INPROCESS = 2
        INERROR = 3
        COMPLETE = 4
    End Enum

    Enum Cart_QtyOption_Enum
        COUNT = 0
        REQUEST
        COUNT_QTY
        REQUEST_QTY
    End Enum

    Enum Item_ManfType_Enum
        VENDOR = 0
        MANUFACTURER
    End Enum

    Enum Item_PriceType_Enum
        STANDARD_PRICE = 0
        CURR_PURCHASE_COST
        AVG_COST
        LAST_REC_COST
		ACTUAL_COST
    End Enum

    Enum Item_DescrType_Enum
        DESCRSHORT
        DESCR30
        DESCR60
        DESCR254
    End Enum

    Enum FILL_KILL
        F
        K
    End Enum

    Enum Cart_File_Type
        STOCK = 1
        NONSTOCK = 2
        STOCKLESS = 3
        CONSIGN = 4
        STOCKTRANSFER = 5
        Charge_Capture = 6
		COUNTS = 7
    End Enum

    Enum Cart_File_PreAppend
        STK
        NTK
        CON
        SL
        STKXFER
    End Enum

    Enum QTY_ROUND_TYPE
        Floor
        Ceil
    End Enum

    Enum File_Type
        [Error]
        Processed
        Charge_Capture
		Backup
    End Enum

    Enum Erp_Obj_Name
        CartCount_Atpar
		Atpar_FileInterface
		Atpar_XML
		Atpar_ASCII
		Atpar_IMMS
	End Enum

    Enum ITEM_STATUS
        Active = 0
        Inactive = 1
    End Enum
    Enum ITEM_STATUS_PS
        Active = 1
        Hold = 2
        Discontinue = 3
        Inactive = 4
        Pendind_Approval = 5
        Denied_Approval = 6
        Under_Initialization = 7
    End Enum

    Enum REQUISITION_STATUS
        Approval = 0
        Request = 1
    End Enum

    Enum Bapi_ReturnCode
        W = 0    ' Warning
        E = 1    ' Error
        I = 2    ' Indication
        S = 3    ' Success
    End Enum

    Enum SAPEnums
        ALL = 0    ' ALL Catalog
        DE = 1     ' DEPT  
        Type = 2
        Message = 3
        Mat_Req_No = 4
        X = 5      'Blocking Indicator
        CR = 6
        PF = 7
        ITEMID_MAXLENGTH = 18
        Id = 8
        Number = 9
    End Enum

    Enum UOM_TYPE
        ISSUE_UOM = 1
        ORDER_UOM = 2
    End Enum
#End Region

#Region "Billing Process"

    Enum Billing_Files_Folder
        Billing = 0
    End Enum
    Enum NetItemUsage_Files_Folder
        NetItemUsage = 0
        Processed = 1
        [Error] = 2
    End Enum
    Enum Receive_Status
        RECEIVE_SUCESS = 1
        RECIEVE_FAIL = -1
        RECEIVE_ABORT = 2
        RECEIVE_NONE = 0
    End Enum

    Enum Billing_Process_PreReq_Enum
        CART_DEFN_CHANGE = 0
        DEL_ITEMS = 1
        REMOTE_SCHEMA = 2
        CART_SEQUENCE_ID = 3
        ITEM_COUNT_LOW_PCT = 4
        ITEM_COUNT_HIGH_PCT = 5
        PUTAWAY_CART_ITEMS = 6
        REQ_ZIP_RELEASE = 7
        STOP_REL_NON_STOCK_REQ = 8
        QTY_OPTION = 9
        REQUESTOR_ID = 10
        IGNORE_REQ_REL_ERR = 11
        REMOTE_DB_TYPE = 12
        TRANSACTION_STATUS = 13
        STATUS_CODE = 14
        SUPER_USER = 15
        CARTS_MNGD_ATPAR = 16
        QTY_ROUND_TYPE = 17
        CALCULATE_REQ_QTY = 18
        POU_CART = 19
        ORDIDS = 20
        ERP_USER_ID = 21
        STATUS_OF_REQUISITION = 22
        HL7_BILLING_MESG = 23
        EXCLUDE_CHRG_CODE_ITEMS_BILING = 24
		ADT_BILLING_SEND_ADDRESS = 25
		ADT_BILLING_SEND_PORT = 26
		ADT_BILLING_THRESHOLD_VALUE = 27
		ADT_RECEIVING_APPLICATION = 28
		ADT_RECEIVING_FACILITY = 29
    End Enum

#Region "Message Segment Enum"
    '''''''''''''''''''''''''''''''''''
    ' BILLING_SEGMENT NUM ABBREVIATION 
    '''''''''''''''''''''''''''''''''
    ' FHS - FILE HEADER
    ' BHS - BATCH HEADER
    ' MSH - MESSAGE HEADER
    ' EVN - EVENT TYPE
    ' PID - PATIENT IDENTIFICATION
    ' FT1 - FINANCIAL TRANSACTION
    ' BTS - BATCH TRAILER
    ' FTS - FILE TRAILER
    ' ZFT – FINANCIAL TRANSACTION (Additional items) 
    '''''''''''''''''''''''''''''''''''
    Enum BILLING_SEGMENT
        FHS
        BHS
        MSH
        EVN
        PID
        FT1
        BTS
        FTS
        ZFT
    End Enum

    Enum FHS
        FILE_FIELD_SEPARATOR = 1
        FILE_ENCODING_CHARACTERS = 2
        FILE_SENDING_APPLICATION = 3
        FILE_SENDING_FACILITY = 4
        FILE_RECEIVING_APPLICATION = 5
        FILE_RECEIVING_FACILITY = 6
        FILE_CREATION_DATE_TIME = 7
    End Enum

    Enum BHS
        BATCH_FIELD_SEPARATOR = 1
        BATCH_ENCODING_CHARACTERS = 2
        BATCH_SENDING_APPLICATION = 3
        BHS_FIELD_4 = 4
        BHS_FIELD_5 = 5
        BHS_FIELD_6 = 6
        BATCH_CREATION_DATE_TIME = 7
    End Enum
    Enum MSH
        FIELD_SEPARATOR = 1
        ENCODING_CHARACTERS = 2
        SENDING_APPLICATION = 3
        SENDING_FACILITY = 4
        RECEIVING_APPLICATION = 5
        RECEIVING_FACILITY = 6
        DATE_TIME_OF_MESSAGE = 7
        SECURITY = 8
        MESSAGE_TYPE = 9
        MESSAGE_CONTROL_ID = 10
        PROCESSING_ID = 11
        VERSION_ID = 12
        SEQUENCE_NUMBER = 13
        'Adding Extra field for different version messages
        CONTINUATION_POINTER = 14
        'MSH_FIELD_15 = 15
        'MSH_FIELD_16 = 16
        'MSH_FIELD_17 = 17
        'MSH_FIELD_18 = 18
        'MSH_FIELD_19 = 19
        'MSH_FIELD_20 = 20

    End Enum

    Enum PID
        SET_ID_PID = 1
        PATIENT_ID = 2
        PATIENT_MEDICAL_RECORD_NUMBER = 3
        ALTERNATE_PATIENT_ID = 4
        PATIENT_NAME = 5
        MOTHERS_MAIDEN_NAME = 6
        DATE_TIME_OF_BIRTH = 7
        ADMINISTRATIVE_SEX = 8
        PATIENT_ALIAS = 9
        RACE = 10
        PATIENT_ADDRESS = 11
        COUNTRY_CODE = 12
        PHONE_NUMBER_HOME = 13
        PHONE_NUMBER_BUSINESS = 14
        PRIMARY_LANGUAGE = 15
        MARITAL_STATUS = 16
        RELIGION = 17
        PATIENT_ACCOUNT_NUMBER = 18
        'PATIENT_SSN = 19
        ''Adding Extra field for different version messages
        'PID_FIELD_20 = 20
        'PID_FIELD_21 = 21
        'PID_FIELD_22 = 22
        'PID_FIELD_23 = 23
        'PID_FIELD_24 = 24
        'PID_FIELD_25 = 25

    End Enum

    Enum EVENT_TYPE
        EVENT_TYPE_CODE = 1
        EVENT_DATE_TIME = 2
    End Enum

    Enum FT1
        SET_ID_FINANCIAL_TRANSACTION = 1
        TRANSACTION_ID = 2
        TRANSACTION_BATCH_ID = 3
        TRANSACTION_DATE = 4
        TRANSACTION_POSTING_DATE = 5
        TRANSACTION_TYPE = 6
        TRANSACTION_CODE = 7
        FT1_FIELD_8 = 8
        FT1_FIELD_9 = 9
        TRANSACTION_QUANTITY = 10
        TRANSACTION_AMOUNT_EXT = 11
        FT1_FIELD_12 = 12
        DEPARTMENT_CODE = 13
        FT1_FIELD_14 = 14
        FT1_FIELD_15 = 15
        FT1_FIELD_16 = 16
        FT1_FIELD_17 = 17
        PATIENT_TYPE = 18
        FT1_FIELD_19 = 19
        PERFORMING_PHYSICIAN = 20
        ORDERING_PHYSICIAN = 21
        'Newly Added Value
        UNIT_COST = 22
        FILLER_ORDER_NUMBER = 23
        ENTERED_BY_CODE = 24
        PROCEDURE_CODE = 25
        PICK_LIST_ID = 26
    End Enum

Enum ZPM
        FIELD_1 = 1
        FIELD_2 = 2
        STATION_NAME = 3
        FIELD_4 = 4
        FIELD_5 = 5
        FIELD_6 = 6
        FIELD_7 = 7
        FIELD_8 = 8
        FIELD_9 = 9
        FIELD_10 = 10
        FIELD_11 = 11
        FIELD_12 = 12
        FIELD_13 = 13
        FIELD_14 = 14
        FIELD_15 = 15
        FIELD_16 = 16
        FIELD_17 = 17
        FIELD_18 = 18
        FIELD_19 = 19
        FIELD_20 = 20
        FIELD_21 = 21
        FIELD_22 = 22
        EXPIRY_DATE = 23
        TISSUE = 24
        FIELD_25 = 25
        FIELD_26 = 26
        FIELD_27 = 27
        VENDOR_NAME = 28
        MANUFACTURER_NAME = 29
        IMPLANT_TYPE = 30
        IMPLANT = 31
        IMPLANT_ITEM_DESCRIPTION = 32
        IMPLANTED_BY = 33
        BODY_SIDE = 34
        BODY_SITE = 35
        TISSUE_PREPARATION_INFORMATION = 36
        FIELD_37 = 37
        SIZE_OF_IMPLANT = 38
        FIELD_39 = 39
        FIELD_40 = 40
        FIELD_41 = 41
        FIELD_42 = 42
        FIELD_43 = 43
        FIELD_44 = 44
        FIELD_45 = 45
        LOT_NUMBER = 46
        SERIAL_NUMBER = 47

    End Enum
    Enum ZFT
        CHARGE_ENTRY_CODER = 1
        RECEIVED_DATE = 2
        CODED_DATE = 3
        REVENUE_CODE = 4
        NDC_CODE = 5
        NDC_QUANTITY = 6
        NDC_ADMIN_UNIT_FOR_CHARGE = 7
        INSTITUTIONAL_CHARGE_PATIENT_NAME = 8
        INSTITUTIONAL_CHARGE_SOCIAL_SECURITY_NUMBER = 9
        INSTITUTIONAL_CHARGE_DATE_OF_BIRTH = 10
        INSTITUTIONAL_CHARGE_EMPLOYEE_NUMBER = 11
        INSTITUTIONAL_CHARGE_SEX = 12
        INSTITUTIONAL_CHARGE_COMMENT = 13
        INSTITUTIONAL_CHARGE_LINKED_PATIENT_ID = 14
        BILL_AREA = 15
        PRICING_CONTRACT = 16
        RESEARCH_STUDY = 17
        FIELD_18 = 18
        COST_CENTER_CODE = 19  'BCC_CODE OR ID 
        DENTAL_TOOTH_NUMBER = 20
        DENTAL_SURFACE = 21
        DENTAL_ARCH = 22
        DENTAL_QUADRANT = 23
        DENTAL_AREA = 24
        DENTAL_SUPERNUMERARY = 25
        DENTAL_MONTHS_TO_RECALL = 26
        DENTAL_HYGIENIST = 27
        FIELD_28 = 28
        FIELD_29 = 29
        FIELD_30 = 30
        FIELD_31 = 31
        END_OF_TREATMENT = 32
        FIELD_33 = 33
        FIELD_34 = 34
        FIELD_35 = 35
        RESULTING_DEPARTMENT = 36
    End Enum
#End Region
#End Region

#Region "Barcode_Symbologies"
    Enum Intermec_Symbology
        CODE39 = 1 'The CODE-39 symbology.  
        CODE93 = 2
        CODE49 = 3 'An Equivalent NOT Found in Symbol API
        I2OF5 = 4
        CODABAR = 5
        UPC = 6 'An Equivalent NOT Found in Symbol API
        CODE128 = 7
        CODE16K = 8 'An Equivalent NOT Found in Symbol API
        PLESSEY = 9 'An Equivalent NOT Found in Symbol API
        CODE11 = 10
        MSI = 11 'An Equivalent NOT Found in Symbol API
        PDF417 = 12
        D2OF5 = 13
        TELEPEN = 14 'An Equivalent NOT Found in Symbol API
        MATRIX2OF5 = 15 'An Equivalent NOT Found in Symbol API
        CODABLOCK = 16 'An Equivalent NOT Found in Symbol API
        ANKERCODE = 17 'An Equivalent NOT Found in Symbol API
        MAXICODE = 18
        OTHER = 19 'An Equivalent NOT Found in Symbol API
        SYSTEM_EX = 20 'An Equivalent NOT Found in Symbol API
        NONBARCODE = 21 'An Equivalent NOT Found in Symbol API
        DUPLICATE = 22 'An Equivalent NOT Found in Symbol API
        DATAMATRIX = 23
        QRCODE = 24
        RSS = 25 'An Equivalent NOT Found in Symbol API
        AZTEC = 26 'An Equivalent NOT Found in Symbol API
        UCC = 27 'An Equivalent NOT Found in Symbol API
        POSTAL = 28 'An Equivalent NOT Found in Symbol API
        UNKNOWN = 29
    End Enum
#End Region

#Region " EDI 856"

    '// Segments of EDI-856 Program
    Enum EDI_856Segments
        ISA = 0
        PRF = 1
        LIN = 2
        SN1 = 3
    End Enum

    Enum EDI_856_Columns
        PO_NUM = 0
        LINE_NO = 1
        QTY = 2
        UOM = 3
        ITEM_ID = 4
    End Enum
#End Region

#Region "Deliver"

    Enum Get_Delv_Header_Input_Enum
        LOCATION
        POID
        TRKNO
        FROM_DATE
        TO_DATE
        ORG_GROUP_ID
        DELVUSER
        PALLETNO
		REDELIVER
		REDELIVERPOPUP
    End Enum
    Enum Get_Delv_Header_Transactions_Enum
        TRANSACTION_ID = 0
    End Enum
    Enum Get_Delv_Header_Locations_Enum
        LOCATION = 0
    End Enum
    Enum Get_Delv_Header_BusinessUnits_Enum
        BUSINESS_UNIT = 0
    End Enum

    Enum Get_Delv_Header_Output_Enum
        TRANSACTION_ID = 0 ' TRANID 
        SET_ID
        LOCATION
        DESCR
        ADDRESS1
        ADDRESS2
        ADDRESS3
        ADDRESS4
        CITY
        STATE
        COUNTRY
        COUNTY
        ZIP_CODE
        BUILDING
        FLOOR
        PHONE
        EXTENSION
        COMMENTS
        ATTN_TO
        BUSINESS_UNIT 'BUNIT
        ILOCATION
        RECEIVER_ID 'RCVRID
        RECV_LN_NBR
        RECV_SHIP_SEQ_NBR
        DISTRIB_LINE_NUM
        LINE_NBR ' REPORT_DATA_2
        DEPTID
        INV_ITEM_ID 'ITEMID
        QTY 'QTY
        IDESCR 'IDESCR
        UPC_ID 'UPCID
        VENDOR_ITEM_ID 'VITMID
        MFG_ITEM_ID 'VITMID
        RECEIVE_UOM
        PO_ID
        SHIPTO_ID 'STOID  - REPORT_DATA_3
        RECV_STATUS
        VENDOR_ID ' VNDRID  - REPORT_DATA_5
        VENDOR_NAME ' VNAME  - REPORT_DATA_6
        RECEIPT_DT ' RECVDT  - REPORT_DATA_4
        BILL_OF_LADING ' BOL  - REPORT_DATA_5
        DUE_DT ' BOL  - REPORT_DATA_6
        STMT_COMMENTS ' COMMENTS_2000
        REQUESTOR_ID ' REQID  - REPORT_DATA_7
        LINE_COMMENTS ' COMMENTS_2000
        FAX
        ZIP
        UOM
        STATUS
        TRKNBR
        AUTH_PERSONS
        AUTH_ID
        AUTH_NAME
        EMAIL
        CARRIERID
        DLVDTO
        USER_ID
        STATUS_CODE
        CANCELLED_STATUS
		TYPE_OF_PACKAGE
        PRICE
        PALLETNO
		SECTOR
		NO_OF_PACKAGES 
    End Enum


    Enum Get_Deliver_PreReqData_Enum
        DEFAULT_SHIP_TO_LOC
        SHIP_TO_LOC_ALLOCATION
        NON_STOCK_STORE
        DELV_RCPT_PRINT_NT_PRINTER
        DELIVER_BUSINESS_UNIT
        REMOTE_SCHEMA
        REMOTE_DB_TYPE
        RECV_ORDER_NON_STOCK
        ITEM_DESCR
        DEFAULT_MFG_ITEM_ID
        REQUESTOR_EMAIL_TABLE
		DELV_RECEIPT_EMAIL
		PICK_STOCK_STORE
		ITEM_PRICE
		DEFAULT_SHIPTO_ID
    End Enum
    Enum Get_Deliver_Detail_ListView_Reqparams_Enum
        REPORT_DATA_5         ' BillofLading 
        DESCR                 ' descr 
        INFO_1                ' DueDate 
        INV_ITEM_ID           ' ItemId 
        KEY_4                 ' BusinessUnit
        REPORT_DATA_1         ' ReceiverID 
        KEY_3                 ' poId 
        KEY_2                 ' location 
        MFG_ITEM_ID           ' MfgItemID 
        QTY                   ' Qty 
        REPORT_DATA_4         ' ReceiveDate 
        REPORT_DATA_3         ' ShipToId 
        STATUS                ' status 
        TRANSACTION_ID        ' transactionId 
        UOM                   ' UOM 
        UPC_ID                ' UpcID 
        VENDOR_ITEM_ID        ' VendorItemID  
        KEY_1                 ' TrackingNbr 
        REPORT_DATA_7         ' DeliverTo 
        KEY_5
        REPORT_DATA_6
		PRICE                 ' Price
    End Enum

    Enum Get_Delv_Output_Status_Enum
        STATUS_CODE
        STATUS_DESCR
        MULTIPLE_LOCATIONS
        TRANSACTION_ID
        OLD_TRANSACTION_ID
    End Enum

	 Enum Send_Delv_Details_Enum
 
		 TRANSACTION_ID
		 PRINTER_ADDRESS
		 EMAIL_FLAG
		 ATTEMPT_DATE
		 ATTEMPT_COMMENTS ' AttmptComments
		 TRACKING_NBR
		 CARRIER_ID
		 LOCATION
		 DELIVER_TO
		 DELIVERY_LOCATION
		 RECEIVER
		 VENDOR_NAME
		 DESCR
		 DEPT_ID
		 KEY_3 'PO_ID
		 LINE_NO
		 SHIPTO_ID
		 TYPE_OF_PACKAGE		 
		 COMMENTS ' Item Detail Trans Comments
		 EVENT_ID ' Event Status
		 UPDATE_DATE
		 USER_ID
		 SIGNATURE_ID
		 PICK_ITEM
		 NONPO_ITEM
         LOC_DESCR
		 NO_OF_PACKAGES
    End Enum
	 
    Enum Send_Delv_ERP_Dtls_Enum
        TRANSACTION_ID
        BUSINESS_UNIT
        RECEIVER_ID
        RECV_LN_NBR
        RECV_SHIP_SEQ_NBR
        DISTRIB_LINE_NUM
        DELIVERED_TO
    End Enum
    Enum Delv_HandOver_Dtls_Enum
        FROM_USER
        TO_USER
        HANDOVER_TO_LOC
		PO_ID
		LOCATION
		LOCATION_DESCR
		TRACKING_NO
        TRANSACTION_ID
    End Enum

    Enum MagStripe_Tracks
        Track1 = 1
        Track2 = 2
        Track3 = 3
    End Enum


#End Region

#Region "  [Par Location Details]  "

    Enum Par_Loc_Details

        ORG_GROUP_ID = 0
        ORG_ID
        PAR_LOC_ID
        ITEM_ID
        BIN_LOC
        STATUS
        COUNT_ORDER
        OPTIMAL_QTY
        COUNT_REQUIRED
        REPLENISHMENT_TYPE
        FILL_KILL_FLAG
        LOT_CONTROLLED
        SERIAL_CONTROLLED
        MAX_QTY
        FOQ_QTY
        ORDERING_TYPE
        CHARGE_CODE
        COST_CENTER
        UNIT_OF_ISSUE
        CONVERSION_RATE
        USER_FIELD_1
        LAST_UPDATE_DATE
        INV_BUSINESS_UNIT
        REQUISITION_TYPE
        UNIT_OF_PROCUREMENT
        LAST_UPDATE_USER
        PAR_UOM
        CONV_RATE_PAR_UOM
    End Enum


    Enum Mandatory_Cols_ParLoc

        ORG_GROUP_ID = 0
        ORG_ID
        PAR_LOC_ID
        BIN_LOC
        ITEM_ID
        STATUS
        OPTIMAL_QTY
        REPLENISHMENT_TYPE
        ORDERING_TYPE
        COST_CENTER
        UNIT_OF_ISSUE
        CONVERSION_RATE
        REQUISITION_TYPE
        UNIT_OF_PROCUREMENT
		' FILL_KILL_FLAG, SERIAL_CONTROLLED, LOT_CONTROLLED not mandatory
        FILL_KILL_FLAG
        SERIAL_CONTROLLED
        LOT_CONTROLLED
    End Enum

    Enum Requisition_Type
        I = 0 ' Issue
        T = 1 'Transfer
    End Enum

#End Region
#Region "  [User Upload Automation]  "
    Enum Enum_ProfileJobRef
        JobID = 0
        FunctionalRole = 1
        AtParProfileID = 2
        EnterpriseSystem = 3
    End Enum

    Enum Enum_ProfileTemplateRef
        ProfileID = 0
        Description = 1
        ProfileTemplateID = 2
        ScreenDisplayTemplateID = 3
        MenuAccessTemplateID = 4
        ProfileParameterTemplateID = 5
        EnterpriseSystem = 6
    End Enum

    Enum Enum_OrgGroupBU
        OrgGroupID = 0
        OrgGroupDescr = 1
        BusinessUnit = 2
        Description = 3
        BusinessUnitType = 4
        ParameterTemplateID = 5
        EnterpriseSystem = 6
    End Enum
  
#End Region

#Region "NiceLabel Printing Enums"
    'Enum for Receive Header label data, group by PO & Location
    Enum PrintLabel_Receive_HEADER
        BUSINESS_UNIT = 0
        TRACKING_NO
        LOCATION_ID
        LOCATION_DESCR
        DELIVER_TO_NAME  'Attention To
        PO_ID
        SHIPTO_ID
        INSPECTION_FLAG
        DROP_SHIP_FLAG
        NO_OF_BOXES
        USER_ID
        ADDRESS1
        ADDRESS2
        ADDRESS3
        PHONE
        COMMENTS
        REQ_NUM
        BUILDING
        FLOOR
        SECTOR
        REQUISITION_NAME
        BUYER_NAME
    End Enum
    'Enum for Receive Header label data, group by PO & Location
    Enum PrintLabel_Receive_HEADER_STOCK
        BUSINESS_UNIT = 0
        TRACKING_NO
        DELIVER_TO_NAME  'Attention To
        PO_ID
        SHIPTO_ID
        INSPECTION_FLAG
        DROP_SHIP_FLAG
        NO_OF_BOXES
        USER_ID
        BUSINESS_UNIT_IN
        REQ_NUM
        LOCATION_ID
        LOCATION_DESCR
    End Enum
    'Enum for Receive Non Po label data
    Enum PrintLabel_Receive_NONPO
        BUSINESS_UNIT = 1
        TRACKING_NO
        LOCATION_ID
        LOCATION_DESCR
        DELIVER_TO_NAME  'Attention To
        PO_ID
        SHIPTO_ID
        DEPT_ID
        VENDOR
        PKG_TYPE  'Overnight, 2 Day etc..
        CARRIER
        LINE_NO
        ITEM_ID
        ITEM_DESCR
        USER_ID
        NO_OF_BOXES
        PHONE_NO
        COMMENTS

    End Enum
    'Enum for Receive Details label data (Stock & Non Stock)
    Enum PrintLabel_Receive_DETAIL
        BUSINESS_UNIT = 0
        TRACKING_NO
        LOCATION_ID
        LOCATION_DESCR
        DELIVER_TO_NAME  'Attention To
        PO_ID
        SHIPTO_ID
        ITEM_ID
        MANF_ITEM_ID
        VENDOR_ITEM_ID
        UPC_ID
        CUST_ITEM_NO
        GTIN
        ITEM_DESCR
        INSPECTION_FLAG
        DROP_SHIP_FLAG
        RECEIVED_QTY
        RECEIVE_UOM
        CONVERSION_RATE
        NO_OF_BOXES
        USER_ID
        ADDRESS1
        ADDRESS2
        ADDRESS3
        BUSINESS_UNIT_IN
        RECEIPT_DT
        REQ_NUM
        COMMENTS
        PACKAGING_STRING
        REQUISITION_NAME
        BUYER_NAME
        BUILDING
        FLOOR
        SECTOR
    End Enum
#End Region
#Region "CI_Send"
    Enum Send_CI_PreReq_Enum
        ENTERPRISE_SYSTEM_NAME = 0
        ENTERPRISE_VERSION
        CATEGORY_CD
        LOCATION
        COMPONENT_NAME
        BUYER_ID
    End Enum

    Enum Send_CI_Header_Enum
        BUSINESS_UNIT = 0
        PO_REF
        VENDOR_ID
    End Enum

    Enum Send_CI_Detail_Enum
        INV_ITEM_ID = 0
        QTY_PO
        UOM
        DESCR
        PRICE
        PROCESS_TYPE
        LINE_NBR
        COMMENTS
		DEPT_ID
    End Enum

    Enum CI_TRANSTYPE
        Issue
        Returns
        PoGen
    End Enum

    Enum CI_NAME
        STOCKISSUE
        EXPPUTAWAY
        RMA
        CATALOGPO
        NONCATALOGPO
		RMARECEIPT
    End Enum
	
	Enum ERP_LOC_TYPE
        PAR_TYPE_LOCATION = 1
        INV_TYPE_LOCATION = 2
    End Enum

#End Region

#Region "Pharmacy"

    Enum Par_Locn_Type
        Inventory = 1
        ParLocation = 2
        Pharmacy = 3
        ADC = 4
        CrashCart = 5
    End Enum

    Enum Pharmacy_Menus
        Cyclecount = 1
        Issue = 2
        Pick = 3
        Deliver = 4
        Putaway = 5
		RxPick = 6
    End Enum

    Enum Get_Pharmacy_Delv_Header_Input_Enum
        ORDERNO = 0
        DELVUSER
        FROM_DATE
        TO_DATE
        ORG_GROUP_ID
        REDELIVER
        REDELIVERPOPUP
    End Enum

    Enum Get_Pharmacy_Delv_Header_Transactions_Enum
        TRANSACTION_ID = 0
    End Enum

    Enum Get_Pharmacy_Delv_Header_Locations_Enum
        LOCATION = 0
    End Enum

    Enum Get_Pharmacy_Delv_Header_BusinessUnits_Enum
        BUSINESS_UNIT = 0
    End Enum

    Enum Get_Pharmacy_Delv_Header_Output_Enum
        TRANSACTION_ID = 0 ' TRANID 
        ORDERED_UOM
        LOCATION
        DESCR
        ADDRESS1
        ADDRESS2
        ADDRESS3
        ADDRESS4
        CITY
        STATE
        COUNTRY
        COUNTY
        ZIP_CODE
        BUILDING
        FLOOR
        PHONE
        EXTENSION
        COMMENTS
        ATTN_TO
        BUSINESS_UNIT 'BUNIT
        ILOCATION
        RECEIVER_ID 'RCVRID
        RECV_LN_NBR
        RECV_SHIP_SEQ_NBR
        DISTRIB_LINE_NUM
        LINE_NBR ' REPORT_DATA_2
        DEPTID
        INV_ITEM_ID 'ITEMID
        QTY 'QTY
        IDESCR 'IDESCR
        UPC_ID 'UPCID
        VENDOR_ITEM_ID 'VITMID
        MFG_ITEM_ID 'VITMID
        RECEIVE_UOM
        ORDERNO
        SHIPTO_ID 'STOID  - REPORT_DATA_3
        RECV_STATUS
        VENDOR_ID ' VNDRID  - REPORT_DATA_5
        VENDOR_NAME ' VNAME  - REPORT_DATA_6
        RECEIPT_DT ' RECVDT  - REPORT_DATA_4
        BILL_OF_LADING ' BOL  - REPORT_DATA_5
        DUE_DT ' BOL  - REPORT_DATA_6
        STMT_COMMENTS ' COMMENTS_2000
        REQUESTOR_ID ' REQID  - REPORT_DATA_7
        LINE_COMMENTS ' COMMENTS_2000
        FAX
        ZIP
        UOM
        STATUS
        TRKNBR
        AUTH_PERSONS
        AUTH_ID
        AUTH_NAME
        EMAIL
        CARRIERID
        DLVDTO
        USER_ID
        STATUS_CODE
        CANCELLED_STATUS
        TYPE_OF_PACKAGE
        PRICE
        PALLETNO
        SECTOR
        EVERIFY_FLAG
        EXPIRY_DATE
        MEDICINE 'REPORT_DATA_24
    End Enum

    Enum Get_Pharmacy_Delv_PreReqData_Enum
        DELV_RCPT_PRINT_NT_PRINTER
        DELV_RECEIPT_EMAIL
        REMOTE_SCHEMA
        REMOTE_DB_TYPE
    End Enum

    Enum Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum
        KEY_1                 ' TrackingNbr
        KEY_2                 ' location 
        KEY_3                 ' orderno
        KEY_4                 ' line no
        KEY_5
        INV_ITEM_ID           ' ItemId 
        DESCR                 ' descr 
        INFO_1                ' DueDate 
        MFG_ITEM_ID           ' MfgItemID 
        QTY                   ' Qty 
        STATUS                ' status 
        TRANSACTION_ID        ' transactionId 
        UOM                   ' UOM 
        UPC_ID                ' UpcID 
        VENDOR_ITEM_ID        ' VendorItemID 
        REPORT_DATA_4         ' ReceiveDate 
        REPORT_DATA_6
        REPORT_DATA_7         ' DeliverTo 
        PRICE                 ' Price
    End Enum

    Enum Get_Pharmacy_Delv_Output_Status_Enum
        STATUS_CODE
        STATUS_DESCR
        MULTIPLE_LOCATIONS
        TRANSACTION_ID
        OLD_TRANSACTION_ID
    End Enum

    Enum Send_Pharmacy_Delv_Details_Enum

        TRANSACTION_ID
        PRINTER_ADDRESS
        EMAIL_FLAG
        ATTEMPT_DATE
        ATTEMPT_COMMENTS ' AttmptComments
        TRACKING_NBR
        CARRIER_ID
        LOCATION
        DELIVER_TO
        DELIVERY_LOCATION
        RECEIVER
        VENDOR_NAME
        DESCR
        DEPT_ID
        KEY_3 'Orderno
        LINE_NO 'key_4
        SHIPTO_ID
        TYPE_OF_PACKAGE
        COMMENTS ' Item Detail Trans Comments
        EVENT_ID ' Event Status
        UPDATE_DATE
        USER_ID
        SIGNATURE_ID
        PICK_ITEM
        NONPO_ITEM
        LOC_DESCR
        EXPIRY_DATE
    End Enum

    Enum Pharmacy_Delv_HandOver_Dtls_Enum
        FROM_USER
        TO_USER
        HANDOVER_TO_LOC
        ORDERNO  'key_3
        LOCATION
        LOCATION_DESCR
        TRACKING_NO
        TRANSACTION_ID
    End Enum

#End Region


End Module
