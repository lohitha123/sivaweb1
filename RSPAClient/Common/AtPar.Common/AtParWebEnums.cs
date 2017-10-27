using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Common
{
    public class AtParWebEnums
    {

        public enum DataSet_Type
        {

            HEADERS,
            DETAILS,
            SUBDETAILS,
            PREREQDATA,
            OUTPUT,
            TRANSACTIONS,
            BUSINESSUNITS,
            PREREQLISTVIEWPARAMS,
            USER,
            PROFILE,
            ORG,
            RECEIVERIDS,
            LOCATIONS,
            ALTERNATEUOMS,
            ORDER_DETAILS,
            PODETAILS,
            NONPODETAILS,
            ORDER_PREFIX,
            LOCATION_BUSINESSUNIT,
            EXCLUDE_ORDERS,
            ALTERNATELOCATIONS,
            INVENTORY_BUSINESSUNITS,
            SUBSTITUTEITEMS,
            NEWDETAILS,
            CONFIGDETAILS,
            RECALLITEMS,
            STORAGE_LOCATION,
            LOTSERIAL_INFO,
            AUTOPUTAWAY_DETAILS,
            AUTOPUTAWAY_HEADER,
            NOTES_DETAILS,
            CASE_HEADER,
            CASE_DETAILS
        }
        public enum Get_Cart_Detail_Output_Header_Enum
        {
            USER_ID = 0,
            BUSINESS_UNIT,
            DESCR,
            SHADOW_FLAG,
            QTY_OPTION,
            DEPT_ID,
            TRANS_ID,
            CART_ID,
            ORG_ID,
            INV_BUSINESS_UNIT,
            YEAR,
            MONTH,
            DAY,
            REQ_NO,
            LOCATION
        }

        public enum Get_Cart_Header_Output_Carts
        {
            CART_ID,
            BUSINESS_UNIT,
            DESCR,
            SHADOW_FLAG,
            CART_COUNT_ORDER,
            TWO_BIN_ALLOCATION,
            DEF_PERCENTAGE_VALUE,
            LOCATION_TYPE
        }

        public enum Get_Recall_ParamValue_Enum
        {
            RECALL_MGMT_IMPLEMENTED = 0

        }
        public enum Get_Cart_Detail_ListView_Reqparams_Enum
        {
            CART_REPLEN_CTRL = 0,
            CART_REPLEN_OPT = 1,
            COMPARTMENT = 2,
            CONS_NON_STOCK = 3,
            COUNT_QTY = 4,
            COUNT_REQUIRED = 5,
            CUST_ITEM_NO = 6,
            DESCR = 7,
            FOQ = 8,
            GTIN = 9,
            INVENTORY_ITEM = 10,
            ITEM_COUNT_ORDER = 11,
            ITEM_ID = 12,
            MAXIMUM_QTY = 13,
            MFG_ITEM_ID = 14,
            OPTIMAL_QTY = 15,
            PRICE = 16,
            PRINT_LATER_FLAG = 17,
            UOM = 18,
            UPC_ID = 19,
            VNDR_ITEM_ID = 20,
            CONSIGNMENT_ITEM = 21,
            REPORT_FIELD_1 = 22,
            REPORT_FIELD_2 = 23,
            REPORT_FIELD_3 = 24,
            REPORT_FIELD_4 = 25,
            PACKAGING_STRING = 26
        }

        public enum REMOTEDBCONNECTION
        {
            DATABASE,
            SCHEMA,
            DATASOURCE,
            SERVER,
            DRIVER,
            USERID,
            PASSWORD,
            NETTRANS,
            HOST,
            SERVICE,
            PROTOCOL

        }
        public enum Get_Cart_Header_Enum
        {
            USER_ID = 0,
            CART_ID = 1,
            BUSINESS_UNIT = 2,
            FLD_ORDER_BY = 3,
            ORDER_BY_ORDER = 4,
            POU_CART = 5
        }
        public enum Get_Cart_Header_PreReqData_Enum
        {
            CART_ALLOCATION = 0,
            REMOTE_SCHEMA = 1,
            REMOTE_DB_TYPE = 2,
            CARTS_MNGD_ATPAR = 3
        }
        public enum Get_Cart_Header_BusinessUnits_Enum
        {
            BUSINESS_UNIT = 0
        }
        public enum Erp_Obj_Name
        {
            CartCount_Atpar,
            Atpar_FileInterface,
            Atpar_XML,
            Atpar_ASCII,
            Atpar_IMMS
        }
        public enum Get_Detail_Defns_Enum
        {
            USER_ID,
            BUSINESS_UNIT,
            CART_ID,
            TRANSACTION_ID,
            DESCR
        }

        public enum StatusType
        {
            Error = 1,
            Warn = 2,
            Custom = 3,
            Success = 4
        }

        public enum YesNo_Enum
        {
            Y = 0,
            N = 1
        }
        public enum AppTransactionStatus
        {
            Downloaded = 1,
            // Downloaded
            PutAway = 4,
            Receive = 5,
            OrderOpen = 5,
            // Order Status = Open
            Success = 2,
            // Patient Charge captured success
            Charged = 3,
            // Patient Charge captured status from Client
            Sent = 11,
            // Status = sent
            Unlock = 12,
            // Status = Unlock
            Cancel = 13,
            // Status = Cancel/Delete
            RemoteSucess = 14,
            // Status = Remote method success
            Issued = 6,
            // Status = Issued in StockIssue app
            CartPutAwayDownload = 7,

            Revised = 8,
            Error = 10,
            // Status = Error
            EventCounting = 4,
            // Status = counting
            EventCountComplete = 7,
            // Status = completed
            Returned = 16,

            //Stock Issue Transaction Status.
            statCISuccess = 17,
            statEIPSuccess = 18,

            statOrdSent = 10,
            // Order Status = Sent
            statOrdPartiallySent = 12,
            // Order Status = Partially Sent
            statOrdRecv = 15,
            // Order Status = Received
            statOrdCancel = 20,
            // Order Status = Received

            // Detail Transaction Status  
            statPickup = 20,
            // Status = Pickup  
            statLoad = 30,
            // Status = Load  
            statUnload = 40,
            // Status = Unload(DropOff)  
            statDelivery = 50,
            // Status = Delivery(DropAt)  
            statTake = 55,
            statReturn = 60,

            statDetailReceive = 0,
            // Status = received in receiving app in detail transaction  
            statDetailOpen = -5,
            // Status = open in receiving app in detail transaction  
            CycleCount = 2,
            CaseIssued = 25,
            CaseReturn = 26,
            // Actual status sent from HHT will be 16 itself but we are using enum as 26 
            ReConIssue = 27,
            //Added to display return and issue quantities separately in transaction history report
            // to differentiate from return and case return
            CasePick = 3,
            Handover = 100,

            statDetailPick = 0,

            PharmacyPreparation = 20,
            PharmacyVerification1 = 25,
            PharmacyVerification2 = 30,
            PharmacyStaged = 40,
            PharmacyDeliver = 50,
            POUPick = 28

        }
        public enum ConfigurationManager_Tabs
        {
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

        public enum BusinessType
        {
            Inventory = 1,
            Purchasing = 2,
            AllBunits = 3
        }
        public enum ClientType
        {
            WEB = 1,
            HHT = 2,
            WIN32 = 3,
            WINSERVICE = 4,
            AHHT = 5,
            IHHT = 6,
            WHHT = 7
        }

        public enum LOGPROPERTIES
        {
            PRODUCTNAME,
            USER,
            USERNAME,
            SYSTEMID
        }
        public enum EnumApps
        {

            Auth = 0,
            Init = 1,
            CartCount = 2,
            CycleCount = 3,
            Receiving = 4,
            PickPlan = 5,
            Deliver = 6,
            PutAway = 7,
            MAgent = 8,
            TrackIT = 9,
            StockIssue = 10,
            AssetManagement = 11,
            BinToBin = 12,
            Dummy1 = 13,
            //change name to a valid app if required
            Dummy2 = 14,
            //change name to a valid app if required
            PointOfUse = 15,
            MasterSetup = 50,
            Pharmacy = 20,
            Reports=100
        }

        public enum TokenEntry_Enum
        {
            UserID = 0,
            AccessToken = 1,
            DeviceID = 2,
            DateTime = 3,
            ProfileID = 4,
            OrgGrpID = 5,
            LdapUser = 6,
            ClientType = 7,
            SystemId = 8,
            DeptID = 9,
            RecordsPerPage = 10,
            IdleTime = 11,
            AppName = 12
        }

        public enum AppParameters_Enum
        {
            EXCLUDE_LOCATIONS,
            ALLOW_BIN_TO_BIN,
            ALLOW_CART_PUTAWAY_ONLY,
            ALLOW_EXCESS_PAR,
            ALLOW_EXCESS_QTY,
            ALLOW_EXCESS_RECV_QTY,
            ALLOW_GT_ALOC_QTY,
            ALLOW_GT_REQ_QTY,
            ALLOW_LESS_QTY,
            ALLOW_NEGATIVE_INVENTORY,
            ALLOW_RETURNS,
            ALLOW_USERS,
            ALT_UOM_DISPLAY_OPT,
            ASN_DOWNLOAD_BY,
            ASN_RECEIPT_STATUS,
            AUTO_ADDTOISSUE,
            BADGE_TRACK_INFO,
            CART_ALLOCATION,
            CART_DEF_CHANGE,
            COUNT_IN_DIFF_UOMS,
            CREATE_MSR_FOR_ISSUE,
            CUSTOM_SQL_DESTLOCATION,
            CART_BULK_PRINT_OPTION,
            DEFAULT_BUSINESS_UNIT,
            DEFAULT_CARRIER_ID,
            DEFAULT_DATE_RANGE,
            DEFAULT_DESTIN_BUSINESS_UNIT,
            DEFAULT_DISTRIB_TYPE,
            DEFAULT_INPUT,
            DEFAULT_MFG_ITEM_ID,
            DEFAULT_PICKUP_BUNIT,
            DEFAULT_PRIORITY,
            DEFAULT_SHIP_TO_LOC,
            DEFAULT_SHIPTO_ID,
            DEFAULT_UOM,
            DEL_ITEMS,
            DELIVER_BUSINESS_UNIT,
            DELIVER_SEND_SIGN_IN_MAIL,
            DELIVERY_LOCATION_CONFIRMATION,
            DELV_RCPT_PRINT_NT_PRINTER,
            DELV_RECEIPT_EMAIL,
            DELV_RECEIPT_PRINT,
            DEST_LOC_COMBO,
            DISP_ALT_UOM,
            DISPLAY_ALL_OPTION_ON_INQUIRY,
            DISPLAY_COMMENTS,
            DISPLAY_FOQ_MAX,
            DISPLAY_PREV_COUNT,
            DISPLAY_RECEIVE_QTY,
            DISPLAY_RECVD_QTY,
            DISPLAY_SYS_QTY,
            DISTRIB_TYPE_REQUIRED,
            DOWNLOAD_BY_PO_ID,
            EDIT_BUSINESS_UNIT,
            EDIT_COUNTS,
            EDIT_PAR,
            EDIT_SHIPTO_ID,
            EDIT_UOM,
            ENABLE_NUMBER_SIP,
            ENABLE_SIP,
            ERP_USER_ID,
            EVENT_ALLOCATION,
            FACTOR_OF_SAFETY,
            HANDING_ITEMS,
            IGNORE_PUTAWAY_QTY,
            INV_DATA_SYNC,
            SYNC_ALL_BUNITS,
            ISSUE_TO_USER_REQD,
            ITEM_COUNT_HIGH_PCT,
            ITEM_COUNT_LOW_PCT,
            ITEM_DESCR,
            ITEM_NDC_TYPE_CODE,
            ITEM_PICK_HIGH_PCT,
            ITEM_PICK_LOW_PCT,
            ITEM_PRICE,
            ITEM_PUTAWAY_HIGH_PCT,
            ITEM_PUTAWAY_LOW_PCT,
            ITEM_RECV_HIGH_PCT,
            ITEM_RECV_LOW_PCT,
            ITEM_UPN_TYPE_CODE,
            LIMIT_OF_LISTS,
            LOC_CHECK_REQD,
            LOCATION_ALLOCATION,
            MANDATORY_COUNT,
            MANDATORY_INPUT,
            MANDATORY_PICK,
            MANDATORY_PUTAWAY,
            MANDATORY_SIGNATURE,
            MAX_NO_OF_REC_DOWNLOAD,
            MULTI_IUT_DOWNLOAD,
            MULTIPLE_USER_DOWNLOAD,
            MM_COORD_EMAIL,
            NON_PO_ITEMS_RECEIVE,
            NON_STOCK_STORE,
            PATIENT_ID_REQD,
            PICK_CONFIRMATION,
            PICKUP_MULTI_LOC,
            PO_ID_OR_LOC_REQUIRED,
            PO_IUT_RECEIVING,
            PS_USER,
            PUTAWAY_CART_ITEMS,
            QTY_OPTION,
            QTY_OPTION_HH,
            REQD_SHIPTO_ID,
            REQUESTOR_EMAIL_TABLE,
            REQUIRE_DEPT,
            RESET_DATE_RANGE,
            REVIEW_COUNTS,
            SEARCH_ON_SERVER,
            SEND_DELIVER_DATA,
            SEND_LOAD_DATA,
            SEND_PICK_DATA,
            SEND_UNLOAD_DATA,
            SHIP_TO_LOC_ALLOCATION,
            SHOW_SIGN_SCREEN,
            SIGN_REQD,
            SORT_BY_COLUMN,
            STOR_LOC_REQD,
            STORE_DETAILED_COUNT_HISTORY,
            SUPER_USER,
            SYS_COUNT_PCT_DEVIATION,
            TRUNC_LEADING_ZEROS,
            UPDATE_COUNTDATE_WEB,
            REQ_ZIP_RELEASE,
            STOP_REL_NON_STOCK_REQ,
            REQUESTOR_ID,
            IGNORE_REQ_REL_ERR,
            DEFAULT_LOC_AS_DEPT,
            ONE_ITEM_IN_MSR,
            CARTS_MNGD_ATPAR,
            QTY_ROUND_TYPE,
            CALCULATE_REQ_QTY,
            SEND_RECEIVE_DATA,
            ALLOC_DEST_LOC_REQUIRED,
            STATUS_OF_REQUISITION,
            EMAILID_FOR_ALERTS,
            SEPARATE_ORDER_FOR_EACH_ISSUE,
            RESERVE_QTY,
            RMA_COMPONENT_INTERFACE,
            HL7_BILLING_MESG,
            COORDINATOR_EMAIL_PICKREQ,
            COORDINATOR_EMAIL_STOCKREQ,
            POST_STOCK_ON_ERP,
            ENABLE_PICKLIST_PRINT,
            PICKLIST_PRINTERNAME,
            COORDINATOR_EMAILSTOCKLESSREQ,
            COORDINATOR_EMAIL_NONSTOCKREQ,
            IGNORE_REQ_CREATE_ERR,
            VERIFY_NONSTOCK_ON_ERPPOST,
            VERIFY_CONSIGN_ON_ERPPOST,
            POST_STOCKLESS_ON_ERP,
            COORDINATOR_EMAIL_CONSIGNREQ,
            COORDINATOR_EMAIL_STOCKXFER,
            PRINT_PATIENT_CHARGE,
            COORDINATOR_EMAIL_STOCKISSUE,
            RECORDS_PER_PAGE_ALL,
            RESTRICT_COUNT_QTY,
            RESTRICT_COUNT_QTY_DIGITS,
            RESTRICT_ISSUE_QTY,
            RESTRICT_ISSUE_QTY_DIGITS,
            COORDINATOR_EMAIL_RECEIVEREQ,
            UPDATE_ERP_ORDERS,
            CHECK_PLANS_SENT,
            COORDINATOR_EMAIL_EMPLOYEEDATA,
            CREATE_NSTKREQ_BYPAR,
            RECV_EXCLUDE_CAPITAL_POS,
            PRINTER_ADDRESS,
            DOC_ID_GENERATION,
            IGNORE_DOC_REL_ERR,
            DISPLAY_LAST_ORDER_QTY_KILL,
            SILENT_SCAN,
            ZERO_RECEIPT_WARN,
            DISPLAY_QTY_WARN_MSG,
            CHARGE_CAPTURE,
            RECV_ORDER_NON_STOCK,
            DEFAULT_COMPANY,
            INCLUDE_ZERO_ORDERED_ITEMS,
            PICK_STOCK_STORE,
            DURATION_TRACKING_EXP,
            SYNC_MULTIPLE_LOC_INFO,
            SEARCH_FOR_ASN_POS,
            SEARCH_BY_DUE_OR_PO_DATE,
            PARCEL_COUNT,
            FTP_TO_SERVER,
            REASON_CODE,
            PICK_ENABLE_LOT_SRL_TRACKING,
            PICK_UPDATE_POU_INVENTORY,
            PICK_SEND_LOT_SRL_INFO_TO_MMIS,
            VENDOR_REVIEW_REQ,
            EXCEP_APPROVAL_REQ,
            ADJ_REASON_CODE,
            LOT_SERIAL_ENABLED,
            POU_IMPLEMENTED,
            SEND_LOT_SERIAL_INFO_TO_MMIS,
            STORE_LOT_SERIAL_INFO_IN_ATPAR,
            ALLOW_FRACTION_VALUE,
            AUTO_GET_ENABLED,
            AUTO_PICK_ENABLED,
            ENABLE_LOAD_EVENT,
            ENABLE_UNLOAD_EVENT,
            HANDING_ITEMS_TO_GROUP,
            SHIPPING_LABEL_PRINT_OPTIONS,
            WARN_COUNT_QTY,
            RECV_PRINT_POID_COMMENTS,
            SELECT_ALL,
            RECV_CONCATINATE_POID_TRKNO,
            RECALL_NOTIFICATION_EMAIL,
            PICK_ALLOC_STORAGE_LOC_REQ,
            PICK_MULT_USERS_DOWNLOAD_PLAN,
            ALLOW_NEGATIVE_QTY,
            SHOW_SIGN_IN_TRACKREPORT,
            B_MAX_STOR,
            E_MAX_STOR,
            F_MAX_STOR,
            NO_OF_REQUESTS_FOR_SAME_EQ_ITM,
            PATIENT_CHARGE,
            SHOW_LOC_UPDATE,
            UPDATE_TRACKIT_USER_PROFILE,
            FREQUENCY_EMAIL_ALERTS,
            PERCENTAGE_OPTIMUM_QTY,
            SEND_EMAIL_ALERTS,
            DEFAULT_PRINTER,
            PICK_REQUIRED,
            SEND_RETURN_DATA,
            SEND_TAKE_DATA,
            ALLOW_EDITING_ORDERS,
            ALLOW_OVER_PUTAWAY,
            DEFAULT_POU_SCREEN,
            DISPLAY_DEFAULT_QTY_TO_RECEIVE,
            DISPLAY_LOCATION,
            DISPLAY_QTY_ON_HAND,
            POU_CASECART_ACCESS,
            REQUIRE_ACCOUNT_ID,
            REQUIRE_EXAM_ID,
            REQUIRE_PATIENT_ID,
            REQUIRE_PHYSICIAN,
            WASTAGE_QTY,
            DEL_INACTIVEITEM_CART,
            GENERATE_PICK_PLAN,
            VALIDATE_DEPT,
            CUSTOM_SQL_DEPT,
            SYNC_FREQUENCY,
            SEND_NET_ITEM_USAGE_INFO,
            CASE_PICK_INTERFACE,
            CUSTOM_VIEW_ERPUSER,
            PARCEL_COUNT_DISABLE_SCAN,
            SEARCH_PO_WITHOUT_BU,
            CATEGORY_CODE,
            RECEIPT_DELIVER_PRINT_OPTIONS,
            RECEIPT_DELIVER_PRINTER_NAME,
            PRINT_RECVHEADER_EACH_PAGE,
            PACKAGING_STRING_FOR_LABELS,
            PRINT_PICKHEADER_EACH_PAGE,
            DEFAULT_LEAD_TIME,
            ENABLE_PALLET_BUTTON,
            EMAILID_FOR_PRODUCT_EXP_ALERTS,
            EMAILID_FOR_LOWSTOCK_ALERTS,
            MAX_ALLOW_QTY,
            ENABLE_CASE_CONSUMPTION_REVIEW,
            DISPLAY_ORDERING_UOM_TYPE,
            DEFAULT_UNIT_OF_MEASURE,
            EDIT_PICK_UOM,
            USE_BARCODE_BY_CARRIER,
            LABEL_PRINTERS,
            DEFAULT_LABEL_PRINTER,
            SYNC_ALL_LOCATIONS,
            CREATE_RMA_RECEIPT,
            SECOND_VERIFICATION_SIGNATURE,
            RX_PREPARE_PICK,
            SYNCH_SCAN_ENTERED_ITEM,
            RESTRICT_ZERO_QTY,
            DISPLAY_CURRENT_SYS_QTY,
            DEFAULT_LOCATION,
            DEFAULT_DEPARTMENT,
            COUNT_DLR_VALUE_THRESHOLD,
            COUNT_QTY_THRESHOLD,
            SKIP_ISSUE_ITEMS_IN_PEOPLESOFT,
            PRINT_SHIPPING_LABEL,
            ORDER_NO_REQUIRED,
            PHARMACY_MENU_ACCESS,
            PRINT_CART_HEADER_DETAILS,
            POSTPICKQA_PRINT_HHT,
            ALTERNATE_PRINTER_NAME,
            ALLOW_USERS_RETURNS,
            VIEW_CLOSED_CASES,
            ITEM_PRICE_TYPE,
            PERFORM_MANUAL_COUNTS,
            REVIEW_MANUAL_COUNTS,
            ALLOW_EDITING_CASE,
            TEMPLOCATION,
            TEMPVENDOR,
            AUTO_CASE_PICK,
            RECEIVE_ITEM
        }

        public enum CONFIGFILE
        {
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
            ATPAR_SYSTEM,
        }

        public enum ERP_SYS_DETAILS
        {
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

        public enum Status
        {
            Active = 0,
            InActive = 1
        }

        public enum Get_Cart_Detail_Enum
        {
            INV_ITEM_ID = 0,
            COMPARTMENT,
            ITEM_DESCR,
            MFG_ITEM_ID,
            VENDOR_ITEM_ID,
            UPN_ID,
            ITEM_NDC,
            ITEM_GTIN,
            ITEM_PRICE,
            COUNT_ORDER,
            OPTIMAL_QTY,
            FOQ,
            COUNT_REQD,
            CART_REPLEN_CTRL,
            CART_REPLEN_OPT,
            CONS_NON_STOCK,
            INVENTORY_ITEM,
            ORDER_QTY,
            UOM,
            MAX_QTY,
            FILLKILL,
            CUST_ITEM_ID,
            LOT_CONTROLLED,
            SERIAL_CONTROLLED,
            CONV_FACTOR,
            CHARGE_CODE,
            VENDOR_NAME,
            VENDOR_ID,
            UOM_PROC,
            QTY_OPTION,
            LAST_ORDER_DATE,
            STATUS,
            PACKAGING_STRING,
            MFG_ID,
            CONSIGNMENT_ITEM,

            REPORT_FIELD_1,

            REPORT_FIELD_2,

            REPORT_FIELD_3,
            REPORT_FIELD_4,

            ITEM_TYPE,
            SUBSTITUTE_ITEM_FLG,
            USER_FIELD_2,
            IMPLANT_FLAG,
            ITEM_MASTER_ITEM_STATUS,
            NON_CART_ITEM_STATUS,
            BILL_ITEM_STATUS,
            PAR_LOC_STATUS,

            ITEM_MASTER_STATUS,

            ITEM_BU_STATUS,

            INFO_2,
            INFO_3,
            CONV_RATE_PAR_UOM,
            PAR_UOM,
            ISSUE_UOM,
            L_S_CONTROLLED,
            CONSIGNED_FLAG,
        }

        public enum LDAPCONFIG
        {
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
            ACNTSTATRULE
        }
        public enum SYSTEMPARAMETERS
        {
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
        public enum AddEdit_Enum
        {
            ADD = 0,
            EDIT = 1,
            ADDNPRINT = 2,
            UPDATENPRINT = 3,
            PRINT = 4
        }

        public enum Get_Cart_PreReqData_Enum
        {
            CART_ALLOCATION = 0,
            ITEM_PRICE = 1,
            ITEM_DESCR = 2,
            DEFAULT_MFG_ITEM_ID = 3,
            PUTAWAY_CART_ITEMS = 4,
            REMOTE_SCHEMA = 5,
            REMOTE_DB_TYPE = 6,
            QTY_OPTION = 7,
            ITEM_UPN_TYPE_CODE = 8,
            ITEM_NDC_TYPE_CODE = 9,
            MFG_ITEM_REQD = 10,
            VENDOR_ITEM_REQD = 11,
            PRICE_REQD = 12,
            GTIN = 13,
            BUSINESS_UNIT = 14,
            CART_ID = 15,
            CARTS_MNGD_ATPAR = 16,
            PACKAGING_STRING_FOR_LABELS = 17
        }

        public enum Enum_Upload_Summary
        {
            TOTAL_REC_CNT = 0,
            SUCCESS_CNT,
            FAILURE_CNT,
            ADDED_CNT,
            UPDATED_CNT,
            WARNING_CNT
        }
        public enum Log_Msg_Mode
        {
            DEBUG = 0,
            INFO = 1,
            WARN = 2,
            FATAL = 3
        }

        public enum Send_Cart_Header_Enum
        {
            TRANSACTION_ID = 0,
            BUSINESS_UNIT = 1,
            CART_ID = 2,
            START_DATETIME = 3,
            END_DATETIME = 4,
            USER_ID = 5,
            TOTAL_RECORDS = 6,
            NO_OF_SCANS = 7,
            NO_OF_ORDERED_ITEMS = 8,
            QUANTITY_OPTION = 9,
            CARTFLAG = 10,
            CMTS = 11,
            ALLOCATED_USER = 12,
            REQ_NO = 13,
            CREATION_DT = 14,
            DESCR = 15
        }

        public enum Send_Cart_BusinessRules_Enum
        {
            CART_DEFN_CHANGE = 0,
            DEL_ITEMS = 1,
            REMOTE_SCHEMA = 2,
            CART_SEQUENCE_ID = 3,
            ITEM_COUNT_LOW_PCT = 4,
            ITEM_COUNT_HIGH_PCT = 5,
            PUTAWAY_CART_ITEMS = 6,
            REQ_ZIP_RELEASE = 7,
            STOP_REL_NON_STOCK_REQ = 8,
            QTY_OPTION = 9,
            REQUESTOR_ID = 10,
            IGNORE_REQ_REL_ERR = 11,
            REMOTE_DB_TYPE = 12,
            TRANSACTION_STATUS = 13,
            STATUS_CODE = 14,
            SUPER_USER = 15,
            CARTS_MNGD_ATPAR = 16,
            QTY_ROUND_TYPE = 17,
            CALCULATE_REQ_QTY = 18,
            POU_CART = 19,
            ORDIDS = 20,
            ERP_USER_ID = 21,
            STATUS_OF_REQUISITION = 22,
            HL7_BILLING_MESG = 23,
            ENTERPRISE_SYSTEM_NAME = 24,
            ENTERPRISE_VERSION = 25,
            CREATE_NSTKREQ_BYPAR = 26,
            INCLUDE_ZERO_ORDERED_ITEMS = 27,
            FTP_TO_SERVER = 28
        }
        public enum Send_Cart_Output_Enum
        {
            STATUS_CODE = 0,
            STATUS_DESCR = 1,
            TRANSACTION_ID = 2,
            ITEM_ID = 3,
            PREV_TRANSACTION_ID = 4,
            REQUISITION_NUMBER = 5
        }

        public enum Enterprise_Enum
        {
            Meditech_Magic,
            Meditech_CS,
            Meditech_ASCII,
            Meditech_XML,
            Peoplesoft,
            Lawson,
            Meditech_NUI,
            PMM,
            Matkon,
            GEAC,
            Oracle,
            Medseries4,
            SAP,
            IMMS

        }
        public enum Cart_File_Type
        {
            STOCK = 1,
            NONSTOCK = 2,
            STOCKLESS = 3,
            CONSIGN = 4,
            STOCKTRANSFER = 5,
            Charge_Capture = 6,
            COUNTS = 7
        }

        public enum Get_Pick_Header_Enum
        {
            LOCATION_ALLOCATION,
            DEFAULT_PRIORITY,
            DEFAULT_PICKUP_BUNIT,
            LIMIT_OF_LISTS,
            BUSINESS_UNIT,
            SET_ID,
            LOCATION,
            LOCATIONNAME,
            STATUS,
            CHECK_PLANS_SENT,
            PICK_STOCK_STORE,
            PICK_ENABLE_LOT_SRL_TRACKING,
            PICK_UPDATE_POU_INVENTORY,
            PICK_SEND_LOT_SRL_INFO_TO_MMIS,
            PICK_ALLOC_STORAGE_LOC_REQ,
            PICK_MULT_USERS_DOWNLOAD_PLAN
        }

        public enum FILL_KILL
        {
            F,
            K
        }

        public enum Send_Cart_Details_Enum
        {
            ITEM_ID = 0,
            ITEM_DESCR = 1,
            COMPARTMENT = 2,
            COUNT_QUANTITY = 3,
            OPTIMAL_QUANTITY = 4,
            COUNT_REQUIRED = 5,
            PRICE = 6,
            CRITICAL_ITEM = 7,
            INVENTORY_ITEM = 8,
            UOM = 9,
            NEW_OPTIMAL_QUANTITY = 10,
            FILL_KILL_FLAG = 11,
            LNCMTS = 12,
            CART_REPLEN_CTRL = 13,
            MAX_QTY = 14,
            FOQ = 15,
            CUST_ITEM_NO = 16,
            VENDOR_ID = 17,
            CONV_FACTOR = 18,
            CART_REPLEN_OPT = 19,
            LOC_TYPE = 20,
            ACT_QOH = 21,
            ITEM_COUNT_ORDER = 22,
            ORDER_QUANTITY = 23
        }

        public enum Get_Pick_Header_PreReqData_Enum
        {
            REMOTE_SCHEMA,
            REMOTE_DB_TYPE
        }

        public enum Perform_Action
        {
            NOCHANGE = 0,
            ADD = 1,
            DELETE = 2
        }
        public enum Mode_Enum
        {
            ADD,
            UPDATE,
            EDIT
        }
        public enum Enum_UserData
        {
            UserData,
            ProfileJobRef,
            UserErrorData,
            UserErrorDataFields,
            UserErrorDataHeaders,
            SUMMARY
        }

        public enum Enum_ProfileData
        {
            ProfileTemplateRef,
            ProfileParameters,
            ProfileSetup,
            ProfileMenus,
            Screendisplay,
            ProfileTemplateRefErrorData,
            ProfileParametersErrorData,
            ProfileMenusErrorData,
            ProfileScreendisplayErrorData,
            ProfileMenusErrorDataFields,
            ProfileMenusErrorDataHeaders,
            ProfileParametersErrorDataFields,
            ProfileParametersErrorDataHeaders,
            ProfileScreendisplayErrorDataFields,
            ProfileScreendisplayErrorDataHeaders,
            ProfileTemplateRefErrorDataFields,
            ProfileTemplateRefErrorDataHeaders,
            SUMMARY
        }
        public enum Enum_OrgGroupData
        {
            OrgGroupParams,
            OrgGroupBU,
            OrgGroupErrorData,
            OrgGroupErrorDataFields,
            OrgGroupErrorDataHeaders,
            SUMMARY
        }

        public enum Enum_ProfileTemplateRef
        {
            ProfileID = 0,
            Description = 1,
            ProfileTemplateID = 2,
            ScreenDisplayTemplateID = 3,
            MenuAccessTemplateID = 4,
            ProfileParameterTemplateID = 5,
            EnterpriseSystem = 6
        }

        public enum ScheduleType_Enum
        {
            Days = 5,
            Intervals = 10
        }
        public enum Get_Event_Header_PreReqData_Enum
        {
            REVIEW_COUNTS = 0,
            EVENT_ALLOCATION = 1,
            REMOTE_SCHEMA = 2,
            ERP_CALL = 3,
            PERFORM_MANUAL_COUNTS = 4,
            REVIEW_MANUAL_COUNTS = 5
        }
        public enum Get_Event_Header_BusinessUnits_Enum
        {
            BUSINESS_UNIT = 0
        }

        public enum Get_Event_Header_Output_Enum
        {
            BUSINESS_UNIT = 0,
            EVENT_ID = 1,
            NO_RECORDS = 2,
            FROM_STOR_LOC = 3,
            TO_STOR_LOC = 4,
            PARENT_EVENT_ID = 5,
            COUNT_HDR_STATUS = 6,
            EVENT_TYPE = 7
        }
        public enum Get_Event_Header_Enum
        {
            EVENT_ID = 0,
            FLD_ORDER_BY = 1,
            ORDER_BY_ORDER = 2,
            USER_ID = 3
        }

        public enum Send_CycleCount_Event_Enum
        {
            BUSINESS_UNIT = 0,
            EVENT_ID = 1,
            FROM_STOR_LOC = 2,
            TO_STOR_LOC = 3,
            NO_RECORDS = 4,
            USER_ID = 5,
            ALLOCATION_STATUS = 6,
            ACTUAL_ALLOCATION_STATUS = 7
        }

        public enum Toggle_Enum
        {
            Y = 0,
            N = 1,
            I = 2,
            P = 3
        }

        public enum Get_Cart_LotSerial_Info_Enum
        {
            BUSINESS_UNIT,
            CART_ID,
            STORAGE_LOCATION,
            STORAGE_AREA,
            STORAGE_LEVEL_1,
            STORAGE_LEVEL_2,
            STORAGE_LEVEL_3,
            STORAGE_LEVEL_4,
            ITEM_ID,
            LOT_NUMBER,
            SERIAL_NUMBER,
            STAGED_DATE,
            CONTAINER_ID,
            UOM,
            STDUOM,
            STD_PACK_UOM,
            SYSTEM_QTY,
            UOM_PROC
        }

        public enum LocationType
        {
            A, //Atpar
            I, //Inventory
            P  //ParLocation
        }
        public enum Enable_Lot_Serial_Tracking
        {
            None,
            MMIS,
            AtPar
        }

        public enum Enum_OrgGroupBU
        {
            OrgGroupID = 0,
            OrgGroupDescr = 1,
            BusinessUnit = 2,
            Description = 3,
            BusinessUnitType = 4,
            ParameterTemplateID = 5,
            EnterpriseSystem = 6
        }
        public enum Enum_ErrorType
        {
            Error = 0,
            Warning = 1
        }
        public enum Enum_ProfileJobRef
        {
            JobID = 0,
            FunctionalRole = 1,
            AtParProfileID = 2,
            EnterpriseSystem = 3
        }

        public enum EventType
        {
            Regular = 0,
            Manual = 1
        }

        public enum Process_Type
        {
            Replenishment = 0,
            Billing = 1,
            LowStock = 2,
            Expiration = 3,
            Recall = 4,
            BillOnly = 5,
            Alert = 6,
            Alerts = 7
        }
        public enum GetIUT_PreReqData_Enum
        {
            MULTI_IUT_DOWNLOAD = 0,
            ITEM_UPN_TYPE_CODE = 1,
            ITEM_NDC_TYPE_CODE = 2,
            SCHEMA_NAME = 3,
            REMOTE_DB_TYPE = 4,
            DEFAULT_MFG_ITEM_ID = 5,
            ITEM_DESCR = 6,
            ITEM_PRICE = 7,
            PACKAGING_STRING_FOR_LABELS = 8
        }

        public enum GetIUT_ListView_Enum
        {
            PACKAGING_STRING = 0
        }

        public enum GetIUT_ERP_Header_Enum
        {
            DESTIN_BU = 0,
            ORIG_BU = 1,
            INTERUNIT_ID = 2,
            INTERUNIT_LINE = 3,
            INV_ITEM_ID = 4,
            STORAGE_AREA = 5,
            STOR_LEVEL_1 = 6,
            STOR_LEVEL_2 = 7,
            STOR_LEVEL_3 = 8,
            STOR_LEVEL_4 = 9,
            QTY_SHIPPED = 10,
            LAST_QTY_SHIP = 11,
            DEST_SA = 12,
            DEST_SL1 = 13,
            DEST_SL2 = 14,
            DEST_SL3 = 15,
            DEST_SL4 = 16,
            UNIT_MEASURE_SHIP = 17,
            SHIP_DTTM = 18,
            TRANSACTION_ID = 19,
            DESCRIPTION = 20,
            UPC_ID = 21,
            VENDOR_ITEM_ID = 22,
            MFG_ITEM_ID = 23,
            GTIN = 24,
            SERIAL_FLAG = 25,
            LOT_FLAG = 26,
            QTY_RECEIVED = 27,
            INV_LOT_ID = 28,
            SERIAL_ID = 29,
            PRICE = 30,
            PACKAGING_STRING = 31,
        }

        public enum GetIUT_Header_Enum
        {
            CANCEL_TRANSID = 0,
            BUSINESS_UNIT = 1,
            IUT_ORDERNO = 2,
            PRODUCT = 3
        }
        public enum GetDetails_PutAway_ListView_Enum
        {
            PRICE = 0,
            VENDOR_ITEM_ID = 1,
            MFG_ITEM_ID = 2,
            PACKAGING_STRING = 3
        }

        public enum GetPO_PreReqData_Enum
        {
            NON_STOCK_STORE = 0,
            MULTIPLE_USER_DOWNLOAD = 1,
            PS_USER = 2,
            REQUESTOR_EMAIL_TABLE = 3,
            ASN_RECEIPT_STATUS = 4,
            ITEM_UPN_TYPE_CODE = 5,
            ITEM_NDC_TYPE_CODE = 6,
            EDIT_UOM = 7,
            SCHEMA_NAME = 8,
            REMOTE_DB_TYPE = 9,
            ITEM_DESCR = 10,
            LOT_SERIAL_ENABLED = 11,
            POU_IMPLEMENTED = 12,
            SEND_LOT_SERIAL_INFO_TO_MMIS = 13,
            STORE_LOT_SERIAL_INFO_IN_ATPAR = 14,
            ITEM_PRICE = 15,
            PACKAGING_STRING_FOR_LABELS = 16,
            RECV_EXCLUDE_CAPITAL_POS = 17,
            SEARCH_PO_WITHOUT_BU = 18,
            RECEIVE_ITEM
        }
        public enum GetPO_ListView_Enum
        {
            INV_ITEM_ID = 0,
            DESCR = 1,
            INVENTORY_ITEM = 2,
            DUE_DT = 3,
            UPC_ID = 4,
            UNIT_OF_MEASURE = 5,
            LINE_QTY = 6,
            RECEIVED_QTY = 7,
            LINE_NBR = 8,
            LOCATION = 9,
            LINE_PO_QTY = 10,
            ITM_ID_VNDR = 11,
            MFG_ITEM_ID = 12,
            SHIPTO_ID = 13,
            INSP_FLAG = 14,
            ADDRESS1 = 15,
            ADDRESS2 = 16,
            ADDRESS3 = 17,
            REQ_NUM = 18,
            DELIVER_TO = 19,
            PRICE = 20,
            PACKAGING_STRING = 21,
            BUILDING = 22,
            FLOOR = 23,
            SECTOR = 24
        }

        public enum GetPO_Recv_ERP_RecvIDs_Enum
        {
            STATUS_CODE = 0,
            RECEIVERID = 1,
            RECPT_DATE = 2,
            INVOICE_NO = 3,
            PACKSLIP_NO = 4
        }
        public enum GetPO_Recv_ERP_Header
        {
            PO_ID = 0,
            BUSINESS_UNIT = 1,
            RECEIVER_ID = 2,
            VENDOR_ID = 3,
            PO_DT = 4,
            ERS_TYPE = 5,
            HDR_CMTS = 6,
            VNDR_NAME = 7,
            TRANS_CODE = 8,
            BUYER_ID = 9,
            PHONE = 10,
            NO_REC = 11,
            TRANSID = 12,
            DROPSHIP_FL = 13,
            SH_NAME = 14,
            SH_ADDR1 = 15,
            SH_ADDR2 = 16,
            SH_ADDR3 = 17,
            SH_ADDR4 = 18,
            SH_CITY_ADDR5 = 19
        }
        public enum GetPO_Recv_ERP_Details
        {
            LN_NBR = 0,
            SCHED_NBR = 1,
            ITEM_ID = 2,
            DESCR = 3,
            MFG_ITM_ID = 4,
            VNDR_ITM_ID = 5,
            GTIN = 6,
            UPC_ID = 7,
            LCMNTS = 8,
            DUE_DT = 9,
            UOM = 10,
            ISSUE_UOM = 11,
            CONV_RATE = 12,
            QTY_PO = 13,
            RECV_QTY = 14,
            QTY_SH_RECVD = 15,
            TOLPCT = 16,
            INSP_FLAG = 17,
            SHIPTO_ID = 18,
            INV_ITM_FLAG = 19,
            ASSET_ITM_FLAG = 20,
            LOT_FLAG = 21,
            SRL_FLAG = 22,
            PURCHASE_REQ_NO = 23,
            CUST_ITEM_NO = 24,
            RECEIVING_ROUTING_ID = 25,
            ITEM_TYPE = 26,
            BIN_TRACK_FL = 27,
            BILL_OF_LADING = 28,
            PRICE = 29,
            PACKAGING_STRING = 30
        }
        public enum GetPO_Recv_ERP_AltUOM
        {
            LN_NBR = 0,
            UOM = 1,
            CONV_FACT = 2
        }
        public enum GetPO_Recv_ERP_LOC
        {
            LN_NBR = 0,
            SETID = 1,
            LOCATION = 2,
            DESCR = 3,
            DEPTID = 4,
            INVITM = 5,
            REQUESTOR_ID = 6,
            EMAILID = 7,
            DELV_TO_NAME = 8,
            ADDRESS1 = 9,
            SCHED_NBR = 10,
            ADDRESS2 = 11,
            ADDRESS3 = 12,
            PHONE = 13,
            STORAGE_LOCATION = 14,
            REQ_NUM = 15,
            FLOOR = 16,
            SECTOR = 17,
            BUILDING = 18,
            REQUISITION_NAME = 19,
            BUYER_NAME = 20,
            REQ_ID = 21
        }
        public enum GetPO_Receive_Header
        {
            BUSINESS_UNIT = 0,
            PO_NO = 1,
            PACKSLIP_SEL_INVOICE_NO = 2,
            TOTAL_PO = 3,
            SHIP_TO_ID = 4,
            TRANS_ID = 5,
            INCLUDE_ALL_PO_LINES = 6,
            SELECTED_PAK_SLIP_NO = 7,
            RECEIVER_ID = 8,
            SEARCH_TYPE = 9,
            INCLUDE_ASN_POS = 10
        }
        public enum ATPAR_SYSTEM
        {
            RECALL_MGMT_IMPLEMENTED,
            PROTOCOL,
            SERVERNAME,
            PORTNO,
            PREPICK_QA_PROCESS_REQUIRED
        }
        public enum SYSTEMDBCONNECTION
        {



            /// <summary>
            /// Database type e.g. SQLSERVER
            /// </summary>
            /// <remarks></remarks>
            DATABASE,

            /// <summary>
            /// Userid of the DB user
            /// </summary>
            /// <remarks></remarks>
            USERID,

            /// <summary>,
            /// AtPar Encrypted Password
            /// </summary>
            /// <remarks></remarks>
            PASSWORD,

            /// <summary>
            /// Database name e.g. ATPAR_MASTER
            /// </summary>
            /// <remarks></remarks>
            DATASOURCE,

            /// <summary>
            /// Server FQDN or IP or instance name
            /// </summary>
            /// <remarks></remarks>
            SERVER,

            /// <summary>
            /// Driver String e.g. {SQL Server}
            /// </summary>
            /// <remarks></remarks>
            DRIVER,

            ARCHIVE_DATABASE,

            ARCHIVE_DATASOURCE,
            ARCHIVE_USERID,

            ARCHIVE_PASSWORD,
            ARCHIVE_SERVER,

            ARCHIVE_DRIVER

        }
        public enum PHYSICIAN_STATUS
        {
            ACTIVE = 0,
            INACTIVE = 1,
            ALL = 2
        }
        public enum DeletePO_Recv_Header_Enum
        {
            TRANS_ID = 0
        }
        public enum SendPO_Receive_Output_Enum
        {
            STATUS_CODE = 0,
            STATUS_DESCR = 1
        }
        public enum SendPO_Receive_Header_Enum
        {
            BUSINESS_UNIT = 0,
            PO_ID = 1,
            VENDOR_ID = 2,
            BUSINESS_UNIT_PO = 3,
            TRANSACTION_CODE = 4,
            DROP_SHIP_FL = 5,
            TRANSACTION_ID = 6,
            START_DT_TIME = 7,
            END_DT_TIME = 8,
            CARRIER_ID = 9,
            BILL_OF_LADING = 10,
            INVOICE_NO = 11,
            STATUS = 12,
            USER_ID = 13,
            NON_STOCK_COUNT = 14,
            STOCK_COUNT = 15,
            RECEIVER_ID = 16,
            HDR_CMTS = 17,
            PO_DT = 18
        }

        public enum SendPO_Receive_BusinessRules_Enum
        {
            REMOTE_SCHEMA = 0,
            NON_STOCK_STORE = 1,
            PS_USER = 2,
            ASN_RECEIPT_STATUS = 3,
            ITEM_RECV_HIGH_PCT = 4,
            ITEM_RECV_LOW_PCT = 5,
            REMOTE_DB_TYPE = 6,
            ENTERPRISE_SYSTEM_NAME = 7,
            ENTERPRISE_VERSION = 8,
            LOT_SERIAL_ENABLED = 9,
            POU_IMPLEMENTED = 10,
            SEND_LOT_SERIAL_INFO_TO_MMIS = 11,
            STORE_LOT_SERIAL_INFO_IN_ATPAR = 12,
            ERP_USER_ID,
            PRINTER_ADDRESS,
            CUSTOM_VIEW_ERPUSER,
            RESTRICT_ZERO_QTY
        }
        public enum SendPO_Receive_Details_Enum
        {
            LINE_NBR,
            SCHED_NBR,
            QTY,
            UNIT_OF_MEASURE,
            CARRIER_ID,
            BILL_OF_LADING,
            SHIPTO_ID,
            NO_OF_BOXES,
            INV_ITEM_ID,
            INVENTORY_ITEM,
            QTY_PO,
            TRACKING_ID,
            EXT_TRK_NO,
            RECEIVING_ROUTING_ID,
            LOCATION,
            RECEIVED_QTY,
            RECV_UOM,
            RECV_CONVERSION_RATE,
            LOT_ID,
            SERIAL_ID,
            CONVERSION_RATE,
            ASN_QTY,
            LINE_CMTS,
            CUST_ITEM_NO,
            EXPIRY_DATE,
            DESCRIPTION,
            DUE_DT,
            STORAGE_LOCATION,

        }

        public enum SendPO_Receive_ItemSubDetails_Enum
        {
            LINE_NBR = 0,
            SCHED_NBR = 1,
            LOT_ID = 2,
            SERIAL_ID = 3,
            UNIT_OF_MEASURE = 4,
            CONVERSION_RATE = 5,
            EXPIRY_DATE = 6,
            QTY = 7
        }
        public enum Send_Notes_Input_DETAILS_Enum
        {
            KEY_1 = 0,
            KEY_2,
            KEY_3,
            KEY_4,
            KEY_5,
            KEY_6,
            KEY_7,
            KEY_8,
            KEY_9,
            KEY_10,
            KEY_11,
            KEY_12,
            KEY_13,
            APP_ID,
            SCREEN_NAME,
            TRANS_ID,
            CODE,
            NOTES,
            DATE_TIME
        }
        public enum Enum_AutoPutAway_Header
        {
            BUSINESS_UNIT = 0,
            PO_DT = 1,
            VENDOR_ID = 2,
            START_DT_TIME = 3,
            END_DT_TIME = 4
        }
        public enum Enum_AutoPutAway_Details
        {
            LOCATION = 0,
            ITEM_ID = 1,
            STORAGE_LOCATION = 2,
            LOT_ID = 3,
            SERIAL_ID = 4,
            QTY = 5,
            CONVERSION_RATE = 6,
            EXPIRY_DATE = 7
        }


        public enum Get_Event_Details_Enum
        {
            BUSINESS_UNIT = 0,
            EVENT_ID = 1,
            COUNT_AND_NEW = 2,
            RECOUNT_AND_NEW = 3,
            USER_ID = 4,
            TRANSACTION = 5,
            SEND_OLD_TRANSACTION = 6,
            EVENT_STATUS = 7,
            INSERT_FLAG = 8,
            IS_ITEM_FROM_ERP = 9,
            RECOUNT = 10,
            GET_RECOUNT_TRANSACTIONID = 11,
            GET_RECOUNT_CANCEL_TRANSID = 12,
            EVENT_TYPE = 13
        }
        public enum Get_Event_Details_PreReqData_Enum
        {
            EVENT_ALLOCATION = 0,
            REVIEW_COUNTS = 1,
            ITEM_DESCR = 2,
            DEFAULT_MFG_ITEM_ID = 3,
            ITEM_PRICE = 4,
            DISPLAY_PREV_COUNT = 5,
            COUNT_IN_DIFF_UOMS = 6,
            ITEM_NDC_TYPE_CODE = 7,
            ITEM_UPN_TYPE_CODE = 8,
            DISP_ALT_UOM = 9,
            REMOTE_SCHEMA = 10,
            REMOTE_DB_TYPE = 11,
            PACKAGING_STRING_FOR_LABELS = 12,
            DISPLAY_ORDERING_UOM_TYPE = 13,
            DEFAULT_UNIT_OF_MEASURE = 14,
            PERFORM_MANUAL_COUNTS = 15,
            REVIEW_MANUAL_COUNTS = 16
        }
        public enum Get_Event_Detail_ListView_Enum
        {
            VENDOR_ITEM_ID_REQ = 0,
            CUST_ITEM_NO_REQ = 1,
            UPC_ID_REQ = 2,
            STORAGE_AREA_REQ = 3,
            STOR_LEVEL_1_REQ = 4,
            STOR_LEVEL_2_REQ = 5,
            STOR_LEVEL_3_REQ = 6,
            STOR_LEVEL_4_REQ = 7,
            CONTAINER_ID_REQ = 8,
            STAGED_DATE_REQ = 9,
            SERIAL_ID_REQ = 10,
            INV_LOT_ID_REQ = 11,
            SYS_QTY_REQ = 12,
            INV_TAG_ID_REQ = 13,
            MFG_ITEM_ID_REQ = 14,
            GTIN_REQ = 15,
            REPORT_FIELD_1 = 16,
            REPORT_FIELD_2 = 17,
            REPORT_FIELD_3 = 18,
            REPORT_FIELD_4 = 19,
            PRICE = 20,
            PACKAGING_STRING = 21,
            STD_PACK_UOM = 22
        }
        public enum Get_Event_DetailOutput_Header_Enum
        {
            BUSINESS_UNIT = 0,
            EVENT_ID = 1,
            TRANSACTION_ID = 2,
            PARENT_EVENT_ID = 3,
            EVENT_TYPE = 4
        }
        public enum Get_Event_DetailOutput_Details_Enum
        {
            INV_ITEM_ID = 0,
            ITEM_REC_NUM = 1,
            MITMID = 2,
            VITMID = 3,
            DESCR = 4,
            STORAGE_AREA = 5,
            STOR_LEVEL_1 = 6,
            STOR_LEVEL_2 = 7,
            STOR_LEVEL_3 = 8,
            STOR_LEVEL_4 = 9,
            UNIT_OF_MEASURE = 10,
            PRICE = 11,
            CONTAINER_ID = 12,
            STAGED_DATE = 13,
            SERIAL_ID = 14,
            INV_LOT_ID = 15,
            COUNT_STATUS = 16,
            QTY_COUNT = 17,
            SYSQTY = 18,
            INVENTORY_TAG_ID = 19,
            GTIN = 20,
            UPC_ID = 21,
            CUSTOM_ITEM_NO = 22,
            LOCATION = 23,
            MANUFACTURER = 24,
            PROJECT_ID = 25,
            EVENT_ID = 26,
            TRANSACTION_ID = 27,
            BUSINESS_UNIT = 28,
            STORLOC = 29,
            COUNT_USER_ID = 30,
            USERNAME = 31,
            CUST_ITEM_NO = 32,
            ITEM_MANUFACTURER_NAME = 33,
            UPDATE_DATE = 34,
            RECOUNT_FLAG = 35,
            VALUEDIFF = 36,
            REALVALUEDIFF = 37,
            RECOUNT_USER_ID = 38,
            ACTUAL_RECOUNT_FLAG = 39,
            ACTUAL_COUNT_QTY = 40,
            RECNT_CHECK = 41,
            RECOUNT_USER_NAME = 42,
            REPORT_FIELD_1 = 43,
            REPORT_FIELD_2 = 44,
            REPORT_FIELD_3 = 45,
            REPORT_FIELD_4 = 46,
            PACKAGING_STRING = 47,
            QTY_COUNT1 = 48,
            QTY_COUNT2 = 49,
            UOM_TYPE = 50,
            STD_PACK_UOM = 51,
            L_S_CONTROLLED = 52,
            CONSIGNED_FLAG = 53,
            LATEST_SYSQTY = 54,
            EVENT_TYPE = 55,
            CONVERSION_RATE = 56,
            LOT_CONTROLLED = 57,
            SERIAL_CONTROLLED = 58
        }
        public enum Get_Event_DetailOutput_AlternateUOMs_Enum
        {
            UNIT_OF_MEASURE = 0,
            CONVERSION_RATE = 1,
            INV_ITEM_ID = 2,
            ITEM_REC_NUM = 3,
            UOM_TYPE = 4
        }

        public enum SendIUT_Header_Enum
        {
            PRODUCT_ID = 0
        }
        public enum SendIUT_PreReqData_Enum
        {
            PS_USER = 0,
            ITEM_RECV_LOW_PCT = 1,
            ITEM_RECV_HIGH_PCT = 2,
            REMOTE_SCHEMA = 3,
            REMOTE_DB_TYPE = 4,
            TRANSACTION_STATUS_REMOTESUCCESS = 5,
            ENTERPRISE_SYSTEM_NAME = 6,
            ENTERPRISE_VERSION = 7
        }
        public enum SendIUT_TRANSACTIONS_Enum
        {
            TRANSACTION_ID = 0
        }
        public enum SendIUT_DETAILS_Enum
        {
            TRANSACTION_ID = 0,
            DESTIN_BUSINESS_UNIT = 1,
            ORIG_BUSINESS_UNIT = 2,
            INTERUNIT_ID = 3,
            START_DT_TIME = 4,
            END_DT_TIME = 5,
            USER_ID = 6,
            LINE_NO = 7,
            ITEM_ID = 8,
            DESCRIPTION = 9,
            QTY = 10,
            QTY_SHIPPED = 11,
            UOM = 12,
            CARRIER_ID = 13,
            BILL_OF_LADING = 14,
            NO_OF_PKGS = 15,
            INV_LOT_ID = 16,
            SERIAL_ID = 17,
            INTERUNIT_LINE = 18
        }

        public enum Delete_IUT_Header_Enum
        {
            PRODUCT
        }
        public enum PrintLabel_Receive_HEADER
        {
            BUSINESS_UNIT = 0,
            TRACKING_NO,
            LOCATION_ID,
            LOCATION_DESCR,
            DELIVER_TO_NAME,
            PO_ID,
            SHIPTO_ID,
            INSPECTION_FLAG,
            DROP_SHIP_FLAG,
            NO_OF_BOXES,
            USER_ID,
            ADDRESS1,
            ADDRESS2,
            ADDRESS3,
            PHONE,
            COMMENTS,
            REQ_NUM,
            BUILDING,
            FLOOR,
            SECTOR,
            REQUISITION_NAME,
            BUYER_NAME
        }
        public enum QTY_ROUND_TYPE
        {
            Floor,
            Ceil
        }

        public enum Receive_Transaction_Enum
        {
            TRANSACTIONID
        }

        public enum ORDER_STATUS
        {
            OPEN = 5,
            SENT = 10,
            RECV = 15,
            CANCEL = 20,
            PARTIALLY_RECEIVED = 25,
            CLOSED = 30,
            ERROR = 35,
            PARTIALLY_PICKED = 40,
            PICKED = 45
        }
        public enum REPENISH_FROM
        {
            POU_INVENTORY,
            PAR,
            MMIS
        }
        public enum EMAILCONFIGARATION
        {

            SMTP_SERVER,
            SMTP_SERVER_PORT,
            SMTP_ACCOUNT_NAME,
            SMTP_MAIL_ADDRESS,
            SMTP_AUTHENTICATE,
            SMTP_USE_SSL,
            SMTP_PASSWORD,
            SMTP_SEND_USING,
            SMTP_USER_NAME

        }

        public enum Billing_Process_PreReq_Enum
        {
            CART_DEFN_CHANGE = 0,
            DEL_ITEMS = 1,
            REMOTE_SCHEMA = 2,
            CART_SEQUENCE_ID = 3,
            ITEM_COUNT_LOW_PCT = 4,
            ITEM_COUNT_HIGH_PCT = 5,
            PUTAWAY_CART_ITEMS = 6,
            REQ_ZIP_RELEASE = 7,
            STOP_REL_NON_STOCK_REQ = 8,
            QTY_OPTION = 9,
            REQUESTOR_ID = 10,
            IGNORE_REQ_REL_ERR = 11,
            REMOTE_DB_TYPE = 12,
            TRANSACTION_STATUS = 13,
            STATUS_CODE = 14,
            SUPER_USER = 15,
            CARTS_MNGD_ATPAR = 16,
            QTY_ROUND_TYPE = 17,
            CALCULATE_REQ_QTY = 18,
            POU_CART = 19,
            ORDIDS = 20,
            ERP_USER_ID = 21,
            STATUS_OF_REQUISITION = 22,
            HL7_BILLING_MESG = 23,
            EXCLUDE_CHRG_CODE_ITEMS_BILING = 24,
            ADT_BILLING_SEND_ADDRESS = 25,
            ADT_BILLING_SEND_PORT = 26,
            ADT_BILLING_THRESHOLD_VALUE = 27,
            ADT_RECEIVING_APPLICATION = 28,
            ADT_RECEIVING_FACILITY = 29
        }

        public enum Send_Charge_Capture_Header_Enum
        {
            TRANSACTION_ID,
            CHARGE_CAPTURE_ID,
            CART_ID,
            PATIENT_ID,
            //PATIENT_MRC
            STATUS,
            TRANSACTION_DATE,
            PATIENT_NAME,
            USER_ID,
            SERVICE_DATE,
            START_DATETIME,
            END_DATETIME,
            TOTAL_RECORDS,
            PATIENT_SEX,
            PATIENT_ACCOUNT_NUMBER,
            ORG_ID,
            PATIENT_VISIT_NUMBER
        }
        public enum Send_Charge_Capture_Details_Enum
        {
            CHARGE_CAPTURE_ID,
            ITEM_ID,
            ITEM_COUNT,
            //QUANTITY
            CAPTURE_DATE_TIME,
            //UPDATE_DATE
            STATUS_CODE,
            TRANSACTION_ID,
            AMOUNT,
            TRANSACTION_CODE,
            TRANSACTION_TYPE,
            ITEM_PRICE,
            PHYSICIAN_ID,
            PATIENT_TYPE,
            ITEM_DESCRIPTION,
            LINE_NO,
            COST_CENTER,
            DEPARTMENT_ID,
            E_MAIL
        }
        public enum Get_Cart_Header_Transactions_Enum
        {
            TRANSACTION_ID = 0
        }
        public enum Patient_Details_Enum
        {
            ORG_ID,
            PATIENT_MRC,
            PATIENT_ACCOUNT_NUMBER,
            PATIENT_NAME,
            PATIENT_BEDNUMBER,
            PATIENT_DEPARTMENT,
            PATIENT_SEX,
            PATIENT_CLASS,
            MESSAGE_DATETIME,
            PATIENT_ADMIT_DATE,
            PATIENT_DISCHARGE_DATE
        }

        public enum Get_Asmt_Header_Enum
        {
            LOCATION = 0,
            USER_ID = 1,
            BUSINESS_UNIT = 2,
            DESCR = 3,
            SETID = 4,
            FLD_ORDER_BY = 5,
            ORDER_BY_ORDER = 6
        }

        public enum Get_Asmt_Header_PreReqData_Enum
        {
            LOCATION_ALLOCATION = 0,
            REMOTE_SCHEMA = 1,
            REMOTE_DB_TYPE = 2
        }

        public enum Get_Asmt_Header_Transactions_Enum
        {
            TRANSACTION_ID = 0
        }

        public enum Get_Asmt_Header_BusinessUnits_Enum
        {
            BUSINESS_UNIT = 0
        }

        public enum Get_Asmt_Header_Output
        {
            LOCATION,
            SETID,
            BUSINESS_UNIT,
            DESCR
        }

        public enum Get_Asmt_Detail_Defns_Enum
        {
            USER_ID,
            BUSINESS_UNIT,
            LOCATION,
            SETID,
            TRANSACTION_ID,
            DESCR
        }

        public enum Get_Asmt_DetailInput_Defns_Enum
        {
            USER_ID,
            BUSINESS_UNIT,
            LOCATION,
            TRANS_ID
        }

        public enum Get_Asmt_PreReqData_Enum
        {
            LOCATION_ALLOCATION = 0,
            REMOTE_SCHEMA = 1,
            REMOTE_DB_TYPE = 2,
            BUSINESS_UNIT = 3,
            LOCATION = 4
        }

        public enum Get_Asmt_Detail_ListView_Reqparams_Enum
        {
            KEY_1 = 0,
            //PI_ID
            KEY_2 = 1,
            //PI_LINE_NUM
            KEY_3 = 2,
            //KEY 3
            KEY_4 = 3,
            //KEY 4
            REPORT_DATA_1_NEW = 4,
            //TAG_NUMBER
            REPORT_DATA_2_NEW = 5,
            //SERIAL_ID
            REPORT_DATA_3_NEW = 6,
            //LOCATION
            REPORT_DATA_4_NEW = 7,
            //CUSTODIAN
            REPORT_DATA_5 = 8,
            //ASSET ID
            REPORT_DATA_6_NEW = 9,
            //MANUFACTURER
            REPORT_DATA_7_NEW = 10,
            //DESCR
            REPORT_DATA_8_NEW = 11,
            //MODEL
            REPORT_DATA_9_NEW = 12,
            //DEPTID
            REPORT_DATA_10_NEW = 13,
            //EMPLID
            COMMENTS = 14,
            TRANSACTION_ID = 15,
            AREA_ID_NEW = 16
        }

        public enum Get_Asmt_Detail_Enum
        {
            PI_ID = 0,
            PI_LINE_NUM = 1,
            ASSET_ID = 2,
            CUSTODIAN = 3,
            DEPTID = 4,
            TAG_NUMBER = 5,
            SERIAL_ID = 6,
            LOCATION = 7,
            EMPLID = 8,
            DESCR = 9,
            MANUFACTURER = 10,
            MODEL = 11,
            TRANSACTION_ID = 12,
            COMMENTS = 13,
            AREA_ID = 14
        }

        public enum Get_Asmt_Detail_Output_Header_Enum
        {
            USER_ID = 0,
            BUSINESS_UNIT,
            LOCATION,
            SETID,
            TRANSACTION_ID
        }

        public enum Send_Asmt_Header_Enum
        {
            TRANSACTION_ID = 0,
            LOCATION = 1,
            START_DATETIME = 2,
            END_DATETIME = 3,
            USER_ID = 4,
            TOTAL_RECORDS = 5,
            NO_OF_REVISED = 6
        }

        public enum Send_Asmt_Details_Enum
        {
            KEY_1 = 0,
            KEY_2 = 1,
            REPORT_DATA_1 = 2,
            REPORT_DATA_1_NEW = 3,
            REPORT_DATA_2 = 4,
            REPORT_DATA_2_NEW = 5,
            REPORT_DATA_3 = 6,
            REPORT_DATA_3_NEW = 7,
            REPORT_DATA_4 = 8,
            REPORT_DATA_4_NEW = 9,
            REPORT_DATA_5 = 10,
            REPORT_DATA_6 = 11,
            REPORT_DATA_6_NEW = 12,
            REPORT_DATA_7 = 13,
            REPORT_DATA_7_NEW = 14,
            REPORT_DATA_8 = 15,
            REPORT_DATA_8_NEW = 16,
            REPORT_DATA_9 = 17,
            REPORT_DATA_9_NEW = 18,
            REPORT_DATA_10 = 19,
            REPORT_DATA_10_NEW = 20,
            COMMENTS = 21,
            AREA_ID = 22,
            AREA_ID_NEW = 23,
            TRANSACTION_ID_OLD = 24
        }

        public enum Send_Asmt_Output_Enum
        {
            STATUS_CODE = 0,
            STATUS_DESCR = 1
        }

        public enum Send_Asmt_BusinessRules_Enum
        {
            REMOTE_SCHEMA = 0,
            REMOTE_DB_TYPE = 1,
            TRANSACTION_STATUS = 2,
            STATUS_CODE = 3,
            ENTERPRISE_SYSTEM_NAME = 4,
            ENTERPRISE_VERSION = 5
        }

        public enum VALUETYPES
        {
            ERP,
            ATPAR_CONDITION,
            ATPAR_LOCAL,
            ATPAR_HEADER,
            ATPAR_DETAILS,
            ATPAR_PREREQ,
            DEFAULT,
            HEADER_ERP,
            ALTERNATE_LOCATIONS,
            GET_SEQ_NO
        }

        public enum DATATYPES
        {
            /// <summary>
            /// Fields marked as Number will be substituted as is in the SQL
            /// </summary>
            /// <remarks></remarks>
            NUMBER,

            /// <summary>
            /// Fields marked as String will be pre/suffixed with a ' (i.e. valid string variable in all databases)
            /// </summary>
            /// <remarks></remarks>
            STRING,

            /// <summary>
            /// Fields marked as Datetime will be converted per REMOTE_DB_TYPE to a format acceptable by the selected db
            /// </summary>
            /// <remarks>SQL Server : CONVERT(DateTime, 'field value', 120); Oracle :TO_DATE('field value', 'ATPAR_ORA_DATETIME_24H')</remarks>
            DATETIME,

            /// <summary>
            /// Fields marked as CURR_DB_DATETIME will be converted per REMOTE_DB_TYPE to a format acceptable by the selected db
            /// </summary>
            /// <remarks>SQL Server : GETDATE(); Oracle :SYSDATE</remarks>
            CURR_DB_DATETIME
        }

        public enum MSH
        {
            FIELD_SEPARATOR = 1,
            ENCODING_CHARACTERS = 2,
            SENDING_APPLICATION = 3,
            SENDING_FACILITY = 4,
            RECEIVING_APPLICATION = 5,
            RECEIVING_FACILITY = 6,
            DATE_TIME_OF_MESSAGE = 7,
            SECURITY = 8,
            MESSAGE_TYPE = 9,
            MESSAGE_CONTROL_ID = 10,
            PROCESSING_ID = 11,
            VERSION_ID = 12,
            SEQUENCE_NUMBER = 13,
            //Adding Extra field for different version messages
            CONTINUATION_POINTER = 14
            //MSH_FIELD_15 = 15
            //MSH_FIELD_16 = 16
            //MSH_FIELD_17 = 17
            //MSH_FIELD_18 = 18
            //MSH_FIELD_19 = 19
            //MSH_FIELD_20 = 20

        }

        public enum BHS
        {
            BATCH_FIELD_SEPARATOR = 1,
            BATCH_ENCODING_CHARACTERS = 2,
            BATCH_SENDING_APPLICATION = 3,
            BHS_FIELD_4 = 4,
            BHS_FIELD_5 = 5,
            BHS_FIELD_6 = 6,
            BATCH_CREATION_DATE_TIME = 7
        }

        public enum FHS
        {
            FILE_FIELD_SEPARATOR = 1,
            FILE_ENCODING_CHARACTERS = 2,
            FILE_SENDING_APPLICATION = 3,
            FILE_SENDING_FACILITY = 4,
            FILE_RECEIVING_APPLICATION = 5,
            FILE_RECEIVING_FACILITY = 6,
            FILE_CREATION_DATE_TIME = 7
        }

        public enum FT1
        {
            SET_ID_FINANCIAL_TRANSACTION = 1,
            TRANSACTION_ID = 2,
            TRANSACTION_BATCH_ID = 3,
            TRANSACTION_DATE = 4,
            TRANSACTION_POSTING_DATE = 5,
            TRANSACTION_TYPE = 6,
            TRANSACTION_CODE = 7,
            FT1_FIELD_8 = 8,
            FT1_FIELD_9 = 9,
            TRANSACTION_QUANTITY = 10,
            TRANSACTION_AMOUNT_EXT = 11,
            FT1_FIELD_12 = 12,
            DEPARTMENT_CODE = 13,
            FT1_FIELD_14 = 14,
            FT1_FIELD_15 = 15,
            FT1_FIELD_16 = 16,
            FT1_FIELD_17 = 17,
            PATIENT_TYPE = 18,
            FT1_FIELD_19 = 19,
            PERFORMING_PHYSICIAN = 20,
            ORDERING_PHYSICIAN = 21,
            //Newly Added Value
            UNIT_COST = 22,
            FILLER_ORDER_NUMBER = 23,
            ENTERED_BY_CODE = 24,
            PROCEDURE_CODE = 25,
            PICK_LIST_ID = 26
        }

        public enum HL7
        {
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

        public enum HL7_MESSAGE_SENT_STATUS
        {
            SUCESS = 0,
            FAILED = 1
        }
        public enum Billing_Files_Folder
        {
            Billing = 0
        }
        public enum Receive_Status
        {
            RECEIVE_SUCESS = 1,
            RECIEVE_FAIL = -1,
            RECEIVE_ABORT = 2,
            RECEIVE_NONE = 0
        }
        public enum SearchPO_Receive_Header
        {
            BUSINESS_UNIT = 0,
            ITEM_ID = 1,
            VENDOR_ID = 2,
            VENDOR_NAME = 3,
            SHIP_TO_ID = 4,
            FROM_DATE = 5,
            TO_DATE = 6,
            SEARCH_TYPE = 7,
            INCLUDE_ASN_POS = 8
        }

        public enum SearchPO_PreReqData_Enum
        {
            MAX_NO_OF_REC_DOWNLOAD = 0,
            DEFAULT_MFG_ITEM_ID = 1,
            SCHEMA_NAME = 2,
            REMOTE_DB_TYPE = 3,
            RECV_EXCLUDE_CAPITAL_POS = 4,
            ASN_RECEIPT_STATUS = 5,
            SEARCH_PO_WITHOUT_BU = 6
        }


        public enum Search_POU_Item_Header_Enum
        {
            ITEMID = 0,
            ITEM_DESCR = 1,
            MANUFACTURER = 2,
            SCANFLAG = 3
        }

        public enum Search_POU_Item_PreReqData_Enum
        {
            ITEM_DESCR = 0,
            ITEM_PRICE = 1,
            DEFAULT_MFG_ITEM_ID = 2,
            ITEM_NDC_TYPE_CODE = 3,
            ITEM_UPN_TYPE_CODE = 4,
            REMOTE_DATABASE = 5,
            REMOTE_SCHEMA = 6
        }

        public enum Search_POU_Item_Enum
        {
            ITEMID = 0,
            ITEM_DESCR = 1,
            MFG_ITEM_ID = 2,
            VENDOR_ITEM_ID = 3,
            MANUFACTURER = 4,
            UPCID = 5,
            ITEM_PRICE = 6,
            UOM = 7,
            LOT_CONTROLLED = 8,
            SERIAL_CONTROLLED = 9,
            VENDOR_ID = 10,
            CUST_ITEM_NO = 11,

            ITEM_TYPE = 12,
            GTIN = 13,
            IMPLANT_FLAG = 14,
            ITEM_MASTER_ITEM_STATUS = 15,
            NON_CART_ITEM_STATUS = 16,
            BILL_ITEM_STATUS = 17,
            PAR_LOC_STATUS = 18,
            LOT_NUMBER = 19,
            SERIAL_NUMBER = 20,
            BUSINESS_UNIT = 21
        }
        public enum SearchIUT_Header_Enum
        {
            BUSINESS_UNIT = 0,
            ITEM_ID = 1,
            FROM_DATE = 2,
            TO_DATE = 3,
            PRODUCT = 4
        }


        public enum SearchIUT_PreReqData_Enum
        {
            SCHEMA_NAME = 0
        }

        public enum REPORTSCONFIGDBCONNECTION
        {
            DATABASE = 0,
            USERID = 1,
            PASSWORD = 2,
            DATASOURCE = 3,
            SERVER = 4,
            DRIVER = 5,
            STARTER_API_DATABASE = 6,
            STARTER_API_DATASOURCE = 7,
            STARTER_API_USERID = 8,
            STARTER_API_PASSWORD = 9,
            STARTER_API_SERVER = 10,
            STARTER_API_DRIVER = 11,
            MT_DRIVER = 12
        }

        public enum REPORTSDBCONNECTION
        {
            DATABASE = 0,
            USERID = 1,
            PASSWORD = 2,
            DATASOURCE = 3,
            SERVER = 4,
            DRIVER = 5
        }

        public enum SSO
        {
            SSO_ENABLED,
            SSO_VARIABLE,
            SSO_COOKIE_NAME,
            SSO_LOGOUT_PAGE
        }

        public enum CASE_PICK_STATUS
        {
            OPEN = 0,
            READY = 1,
            PARTIALLYPICKED = 3,
            PICKED = 5,
            RETURNED = 7,
            REVIEWED = 9,
            CLOSED = 10,
            REPLACED = 11,
            INACTIVE = 12,
            CANCELLED = 13,
            PENDING = 15,
            PREF_REPLACED = 17,
            CASEISSUED = 25,
            REMOVE = 50
        }

        public enum Send_StockIssue_BusinessRules_Enum
        {
            CREATE_MSR_FOR_ISSUE = 0,
            PSCILOGINURL = 1,
            STOR_LOC_REQD = 2,
            DEFAULT_LOC_AS_DEPT = 3,
            ONE_ITEM_IN_MSR = 4,
            SIGNATURE_ID = 5,
            PRICE = 6,
            OPRID_MODIFIED_BY = 7,
            COMPONENT_NAME = 8,
            EXP_PUTAWAY_CI_NAME = 9,
            RMA_COMPONENT_INTERFACE = 10,
            RMA_CI_NAME = 11,
            ENTERPRISE_SYSTEM_NAME = 12,
            ENTERPRISE_VERSION = 13,
            DOC_ID_GENERATION = 14,
            DEFAULT_COMPANY = 15,
            IGNORE_DOC_REL_ERR = 16,
            REMOTE_DB_TYPE = 17,
            REMOTE_SCHEMA = 18,
            REASON_CD = 19,
            INV_DATA_SYNC = 20,
            UNIT_MEASURE_PICK = 21,
            TRANSACTION_STATUS = 22,
            CREATE_RMA_RECEIPT = 23,
            RMA_RECEIPT_CI_NAME = 24,
            SKIP_ISSUE_ITEMS_IN_PEOPLESOFT = 25,
            LOT_SERIAL_ENABLED = 26,
            ITEM_PRICE = 27,
            ITEM_DESCR = 28,
            DEFAULT_MFG_ITEM_ID = 29,
            ITEM_NDC_TYPE_CODE = 30,
            ITEM_UPN_TYPE_CODE = 31,
            ALLOW_NEGATIVE_INVENTORY = 32

        }

        public enum RESVR_QTY_OPTION
        {
            NONE,
            TOTALPICKQTY,
            HOLDQTYONLY
        }

        public enum Send_StockIssue_Details_Enum
        {
            ITEM_ID = 0,
            STORAGE_LOCATION = 1,
            STORAGE_AREA = 2,
            STOR_LEVEL_1 = 3,
            STOR_LEVEL_2 = 4,
            STOR_LEVEL_3 = 5,
            STOR_LEVEL_4 = 6,
            UOM = 7,
            QTY = 8,
            ACTUAL_ISSUED_UOM = 9,
            ACTUAL_ISSUED_QTY = 10,
            PRICE = 11,
            SERIAL_ID = 12,
            LOT_ID = 13,
            CONTAINER_ID = 14,
            ADJUST_TYPE = 15,
            PROCESS_TYPE = 16,
            ADJUST_QTY = 17,
            ACCOUNT = 18,
            DESTIN_GL_BU = 19,
            EXPIRY_DATE = 20,
            STD_UOM = 21,
            ITEM_DESC = 22,
            COMPARTMENT = 23,
            UNIT_COST = 24
        }

        public enum Send_StockIssue_Header_Enum
        {
            BUSINESS_UNIT = 0,
            ORDER_NO = 1,
            LOCATION = 2,
            STATUS = 3,
            DEPARTMENT_ID = 4,
            PATIENT_ID = 5,
            ISSUETO_USER_ID = 6,
            CURRENT_USER_ID = 7,
            SUSER_ID = 8,
            START_DATE = 9,
            END_DATE = 10,
            DISTRIB_TYPE = 11,
            SIGNATURE_ID = 12,
            SIGNATURE = 13,
            TRANSACTION_ID = 14,
            COUNT_FLAG = 15,
            COMPANY = 16
        }

        public enum Send_StockIssue_Output_Enum
        {
            STATUS_CODE,
            STATUS_DESCR,
            DOCUMENT_ID,
            TRANSACTION_ID,
            ORDER_NO
        }

        public enum Send_POU_Issue_Output_Enum
        {
            STATUS_CODE,
            DOCUMENT_ID,
            TRANSACTION_ID,
            ORDER_NO
        }
        public enum CaseItem_Source
        {
            HL7 = 0,
            ATPAR = 1,
            MODIFIED = 2
        }

        public enum enum_Requestor_Status
        {
            A,
            I
        }
        public enum SendNonPOs_Hdr
        {
            TRANSACTION_ID = 0,
            TRACKING_NBR = 1,
            LOCATION = 2,
            CARRIER_ID = 3,
            DELIVER_TO = 4,
            STATUS = 5,
            USER_ID = 6,
            DESCR = 7,
            VENDOR_NAME1 = 8,
            DEPT_ID = 9,
            PO_ID = 10,
            LINE_NBR = 11,
            SHIPTO_ID = 12,
            NON_PO_ITEM = 13,
            TYPE_OF_PACKAGE = 14,
            END_DT_TIME = 15,
            START_DT_TIME = 16,
            COMMENTS = 17,
            LOCDESCR = 18,
            PO_DT = 19,
            VENDOR_ID = 20,
            NOTES_COMMENTS = 21,
            NO_OF_PACKAGES = 22
        }

        public enum enum_TKIT_OrderStatus
        {
            All,
            Open,
            Pick,
            Load,
            Unload,
            Delivered,
            Cancelled
        }

        public enum ItemStatus_Enum
        {
            DELV,
            DELIVERED
        }

        public enum EventStatus_Enum
        {
            Pick = 20,
            Load = 30,
            UnLoad = 40,
            Deliver = 50,
            Take = 55,
            Returns = 60
        }

        public enum enum_TKIT_EQP_TYPE
        {
            B,
            E,
            F
        }

        public enum enum_CHECKINOUT
        {
            CIN,
            COUT
        }

        public enum STATUS
        {
            RECEIVE = 0,
            DOWNLOAD = 1,
            CANCELED = 13,
            PICKUP = 20,
            LOAD = 30,
            UNLOAD = 40,
            DELIVERED = 50,
            HANDOVER = 100
        }

        public enum Get_Pick_OP_Header_Details_Enum
        {
            BUSINESS_UNIT = 0,
            PICK_BATCH_ID = 1,
            ORDER_NO = 2,
            SHIP_TO_CUST_ID = 3,
            SHIP_CUST_NAME1 = 4,
            LOCATION = 5,
            DMDSRC = 6,
            SBUNIT = 7,
            PRIORITY = 8,
            USER_ID = 9,
            INV_BUSINESS_UNIT = 10,
            LOCATION_DESC = 11,
            INV_BUNIT_DESC = 12,
            ADDRESS1 = 13,
            ADDRESS2 = 14,
            ADDRESS3 = 15,
            ADDRESS4 = 16,
            CITY = 17,
            STATE = 18,
            ZIP_CODE = 19,
            ATTN_TO = 20,
            REQUEST_DATE = 21
        }
        public enum Get_Pick_IP_Header_Pre_Req_Enum
        {
            LOCATION_ALLOCATION = 0,
            DEFAULT_PRIORITY = 1,
            LIMIT_OF_LISTS = 2,
            CHCK_PLANS_SENT = 3,
            DEFAULT_BUNIT = 4,
            REMOTE_SCHEMA = 5,
            REMOTE_DATABASE = 6,
            PICK_ALLOC_STORAGE_LOC_REQ = 7,
            PICK_MULT_USERS_DOWNLOAD_PLAN = 8
        }

        public enum Get_Pick_IP_Header_Order_Prefix_Enum
        {
            ORDER_PREFIX = 0
        }
        public enum Get_Pick_IP_Header_Location_BusinessUnit_Enum
        {
            LOCATION = 0,
            BUSINESS_UNIT = 1
        }
        public enum Get_Pick_IP_Header_Inventory_BusinessUnits_Enum
        {
            INVENTORY_BUSINESSUNIT = 0
        }
        public enum Get_Pick_IP_Header_Exclude_Orders_Enum
        {
            ORDER_ID = 0
        }
        public enum INV_TRANS
        {
            CycleCount = 2,
            Issue = 6,
            Returned = 16,
            Putaway = 4,
            CaseIssued = 25,
            RecordConsumption = 26,
            CasePick = 3,
            ReConIssue = 27,
            CaseCancel = 13,
            PrefReplaced = 17,
            Pick = 28
        }
        public enum ScheduleType
        {
            COUNTEDINTIME = 0,
            COUNTEDNOTINTIME = 1,
            NOTCOUNTED = 2
        }

        public enum Reporting_System_Ids_Enum
        {
            ReportingConf = 0,
            ReportingMT = 1,
            RepStarter = 2
        }

        public enum Reporting_System_Settings_Enum
        {
            AuthValidateAccessTokenUrl = 0,
            AuthGetAccessTokenUrl = 1,
            WebUrl = 2,
            CustomFunctionFilePath = 3

        }

        public enum MT_Reports_Settings
        {
            USERS_IMPORTS = 0,
            HOST_UPDATE = 1

        }

        public enum Tkit_TransType_Enum
        {
            Create,
            CheckIn,
            Request,
            Move

        }

        public enum Tkit_OwnerType_Enum
        {
            O,
            L,
            R
        }



    }
}
