using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using AtPar.POCOEntities;
using Atpar.Data.Mapping;
using System.Data.SqlClient;
using System.Configuration;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using AtParEncryptionServices;
using AtPar.Common;
using System.Web;

namespace AtPar.Data
{
    public partial class ATPAR_MT_Context : DbContext
    {
        public static string dbschema = string.Empty;
        static ATPAR_MT_Context()
        {
            Database.SetInitializer<ATPAR_MT_Context>(null);
        }

        public ATPAR_MT_Context()
            : base(BuildConnectionString)
        {

        }
        static string _buildConnectionString;
        public static string BuildConnectionString
        {
            set
            {
                _buildConnectionString = value;
            }
            get
            {

                ATPAR_MASTER_Context masterDbContext = new ATPAR_MASTER_Context();
                MT_ATPAR_SYSTEM_DB mtAtparSystemDb = null;
                Encryption atparEncriptService = new Encryption();
                var sessionsys = HttpContext.Current.Session["systemId"];
                if (sessionsys!=null&&!string.IsNullOrEmpty(sessionsys.ToString()))
                {
                    mtAtparSystemDb = masterDbContext.MT_ATPAR_SYSTEM_DB.Where(x => x.SYSTEM_ID == sessionsys.ToString()).FirstOrDefault();
                }
                else
                {
                    mtAtparSystemDb = masterDbContext.MT_ATPAR_SYSTEM_DB.FirstOrDefault();
                }


                if (mtAtparSystemDb != null)
                {
                    dbschema = mtAtparSystemDb.USERID;
                    _buildConnectionString =
                       "Data Source =" + mtAtparSystemDb.SERVER +
                       "; Initial Catalog = " + mtAtparSystemDb.DATASOURCE +
                       "; Persist Security Info = True; " +
                       " User ID = " + mtAtparSystemDb.USERID +
                       "; Password = " + atparEncriptService.Decrypt(mtAtparSystemDb.PASSWORD) +
                       "; MultipleActiveResultSets = 'True'";
                }
                else
                {
                    //need to remove don't uncomment this.
                    //_buildConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["ATPAR_MT_Context"].ToString();

                    //SqlConnectionStringBuilder con = new SqlConnectionStringBuilder(_buildConnectionString);
                    //if (con != null)
                    //{
                    //    dbschema = con.UserID;
                    //}

                }
                return _buildConnectionString;
            }
        }
        public DbSet<aspnet_Applications> aspnet_Applications { get; set; }
        public DbSet<aspnet_Paths> aspnet_Paths { get; set; }
        public DbSet<aspnet_PersonalizationAllUsers> aspnet_PersonalizationAllUsers { get; set; }
        public DbSet<aspnet_PersonalizationPerUser> aspnet_PersonalizationPerUser { get; set; }
        public DbSet<aspnet_SchemaVersions> aspnet_SchemaVersions { get; set; }
        public DbSet<aspnet_Users> aspnet_Users { get; set; }
        public DbSet<CompletedScope> CompletedScopes { get; set; }
        public DbSet<InstanceState> InstanceStates { get; set; }
        public DbSet<MT_AP_INTERFACE_TYPE> MT_AP_INTERFACE_TYPE { get; set; }
        public DbSet<MT_AP_ORDER_TBL_ID> MT_AP_ORDER_TBL_ID { get; set; }
        public DbSet<MT_AP_PARAMETER_PROCESS> MT_AP_PARAMETER_PROCESS { get; set; }
        public DbSet<MT_ASMT_AUDIT_DETAIL> MT_ASMT_AUDIT_DETAIL { get; set; }
        public DbSet<MT_ASMT_AUDIT_HEADER> MT_ASMT_AUDIT_HEADER { get; set; }
        public DbSet<MT_ATPAR_APP> MT_ATPAR_APP { get; set; }
        public DbSet<MT_ATPAR_APP_LABELS> MT_ATPAR_APP_LABELS { get; set; }
        public DbSet<MT_ATPAR_APP_LINKED_LABELS> MT_ATPAR_APP_LINKED_LABELS { get; set; }
        public DbSet<MT_ATPAR_AUDIT> MT_ATPAR_AUDIT { get; set; }
        public DbSet<MT_ATPAR_AUDIT_INFO> MT_ATPAR_AUDIT_INFO { get; set; }
        public DbSet<MT_ATPAR_AUDIT_SCREEN_CONTROLS> MT_ATPAR_AUDIT_SCREEN_CONTROLS { get; set; }
        public DbSet<MT_ATPAR_AUDIT_TEMP> MT_ATPAR_AUDIT_TEMP { get; set; }
        public DbSet<MT_ATPAR_BARCODE_SYMBOLOGY> MT_ATPAR_BARCODE_SYMBOLOGY { get; set; }
        public DbSet<MT_ATPAR_CART_PREV_COUNTS> MT_ATPAR_CART_PREV_COUNTS { get; set; }
        public DbSet<MT_ATPAR_CONFIGURATION_SECTION_DTLS> MT_ATPAR_CONFIGURATION_SECTION_DTLS { get; set; }
        public DbSet<MT_ATPAR_DASHBOARD_DETAILS> MT_ATPAR_DASHBOARD_DETAILS { get; set; }
        public DbSet<MT_ATPAR_DASHBOARD_HEADER> MT_ATPAR_DASHBOARD_HEADER { get; set; }
        public DbSet<MT_ATPAR_DETAIL_TRANSACTION> MT_ATPAR_DETAIL_TRANSACTION { get; set; }
        public DbSet<MT_ATPAR_DEVIATION> MT_ATPAR_DEVIATION { get; set; }
        public DbSet<MT_ATPAR_DEVICE_DETAILS> MT_ATPAR_DEVICE_DETAILS { get; set; }
        public DbSet<MT_ATPAR_ENTERPRISE_SYSTEM_DETAILS> MT_ATPAR_ENTERPRISE_SYSTEM_DETAILS { get; set; }
        public DbSet<MT_ATPAR_HL7_MSGS_TRANSMISSION> MT_ATPAR_HL7_MSGS_TRANSMISSION { get; set; }
        public DbSet<MT_ATPAR_IBU_ALLOCATION> MT_ATPAR_IBU_ALLOCATION { get; set; }
        public DbSet<MT_ATPAR_ITEM_MFG_UPN> MT_ATPAR_ITEM_MFG_UPN { get; set; }
        public DbSet<MT_ATPAR_JOB_SCHEDULES> MT_ATPAR_JOB_SCHEDULES { get; set; }
        public DbSet<MT_ATPAR_LABELS_DATA> MT_ATPAR_LABELS_DATA { get; set; }
        public DbSet<MT_ATPAR_LATEST_VALUES> MT_ATPAR_LATEST_VALUES { get; set; }
        public DbSet<MT_ATPAR_LBL_PRINTERS> MT_ATPAR_LBL_PRINTERS { get; set; }
        public DbSet<MT_ATPAR_LIST_VIEW> MT_ATPAR_LIST_VIEW { get; set; }
        public DbSet<MT_ATPAR_LOC_GROUP_ALLOCATION> MT_ATPAR_LOC_GROUP_ALLOCATION { get; set; }
        public DbSet<MT_ATPAR_LOC_GROUP_MEMBERS> MT_ATPAR_LOC_GROUP_MEMBERS { get; set; }
        public DbSet<MT_ATPAR_LOC_GROUPS> MT_ATPAR_LOC_GROUPS { get; set; }
        public DbSet<MT_ATPAR_LOGIN_HISTORY> MT_ATPAR_LOGIN_HISTORY { get; set; }
        public DbSet<MT_ATPAR_MENUS> MT_ATPAR_MENUS { get; set; }
        public DbSet<MT_ATPAR_MESSAGE_TBL> MT_ATPAR_MESSAGE_TBL { get; set; }
        public DbSet<MT_ATPAR_NOTES> MT_ATPAR_NOTES { get; set; }
        public DbSet<MT_ATPAR_NOTES_SETUP> MT_ATPAR_NOTES_SETUP { get; set; }
        public DbSet<MT_ATPAR_OBJECTS> MT_ATPAR_OBJECTS { get; set; }
        public DbSet<MT_ATPAR_ORG_GROUP_BUNITS> MT_ATPAR_ORG_GROUP_BUNITS { get; set; }
        public DbSet<MT_ATPAR_ORG_GROUP_PARAMETERS> MT_ATPAR_ORG_GROUP_PARAMETERS { get; set; }
        public DbSet<MT_ATPAR_ORG_GROUPS> MT_ATPAR_ORG_GROUPS { get; set; }
        public DbSet<MT_ATPAR_PARAM_MASTER> MT_ATPAR_PARAM_MASTER { get; set; }
        public DbSet<MT_ATPAR_PASSWD_HISTORY> MT_ATPAR_PASSWD_HISTORY { get; set; }
        public DbSet<MT_ATPAR_PATIENT_CACHE> MT_ATPAR_PATIENT_CACHE { get; set; }
        public DbSet<MT_ATPAR_PHYSICAL_INVENTORY> MT_ATPAR_PHYSICAL_INVENTORY { get; set; }
        public DbSet<MT_ATPAR_PRINT_FIELD_DEFAULTS> MT_ATPAR_PRINT_FIELD_DEFAULTS { get; set; }
        public DbSet<MT_ATPAR_PRINT_LABEL_DETAILS> MT_ATPAR_PRINT_LABEL_DETAILS { get; set; }
        public DbSet<MT_ATPAR_PRINT_LABEL_HEADER> MT_ATPAR_PRINT_LABEL_HEADER { get; set; }
        public DbSet<MT_ATPAR_PRINT_OBJECTS_INFO> MT_ATPAR_PRINT_OBJECTS_INFO { get; set; }
        public DbSet<MT_ATPAR_PROCESS_TRANS_HISTORY> MT_ATPAR_PROCESS_TRANS_HISTORY { get; set; }
        public DbSet<MT_ATPAR_PROFILE> MT_ATPAR_PROFILE { get; set; }
        public DbSet<MT_ATPAR_PROFILE_APP_ACL> MT_ATPAR_PROFILE_APP_ACL { get; set; }
        public DbSet<MT_ATPAR_PROFILE_LIST_VIEW> MT_ATPAR_PROFILE_LIST_VIEW { get; set; }
        public DbSet<MT_ATPAR_PROFILE_MENU> MT_ATPAR_PROFILE_MENU { get; set; }
        public DbSet<MT_ATPAR_PROFILE_PARAMETERS> MT_ATPAR_PROFILE_PARAMETERS { get; set; }
        public DbSet<MT_ATPAR_RECALL_INFO> MT_ATPAR_RECALL_INFO { get; set; }
        public DbSet<MT_ATPAR_REPORTS_SETTINGS> MT_ATPAR_REPORTS_SETTINGS { get; set; }
        public DbSet<MT_ATPAR_REPORTING_TABLES_LIST> MT_ATPAR_REPORTING_TABLES_LIST { get; set; }
        public DbSet<MT_ATPAR_SCHEDULE_DETAIL> MT_ATPAR_SCHEDULE_DETAIL { get; set; }
        public DbSet<MT_ATPAR_SCHEDULE_HEADER> MT_ATPAR_SCHEDULE_HEADER { get; set; }
        public DbSet<MT_ATPAR_SECURITY_AUDIT> MT_ATPAR_SECURITY_AUDIT { get; set; }
        public DbSet<MT_ATPAR_SECURITY_PARAMS> MT_ATPAR_SECURITY_PARAMS { get; set; }
        public DbSet<MT_ATPAR_SETUP_PRO_PRINTERES> MT_ATPAR_SETUP_PRO_PRINTERES { get; set; }
        public DbSet<MT_ATPAR_SIGNATURE> MT_ATPAR_SIGNATURE { get; set; }
        public DbSet<MT_ATPAR_STATUS> MT_ATPAR_STATUS { get; set; }
        public DbSet<MT_ATPAR_STORAGE_ZONE> MT_ATPAR_STORAGE_ZONE { get; set; }
        public DbSet<MT_ATPAR_STORAGE_ZONES_ALLOCATION> MT_ATPAR_STORAGE_ZONES_ALLOCATION { get; set; }
        public DbSet<MT_ATPAR_TOKENS> MT_ATPAR_TOKENS { get; set; }
        public DbSet<MT_ATPAR_TRANSACTION> MT_ATPAR_TRANSACTION { get; set; }
        public DbSet<MT_ATPAR_TRANSACTION_ID_TBL> MT_ATPAR_TRANSACTION_ID_TBL { get; set; }
        public DbSet<MT_ATPAR_UI_FIELDS> MT_ATPAR_UI_FIELDS { get; set; }
        public DbSet<MT_ATPAR_UI_SETUP> MT_ATPAR_UI_SETUP { get; set; }
        public DbSet<MT_ATPAR_USER> MT_ATPAR_USER { get; set; }
        public DbSet<MT_ATPAR_USER_ACL> MT_ATPAR_USER_ACL { get; set; }
        public DbSet<MT_ATPAR_USER_ACL_DEFAULTS> MT_ATPAR_USER_ACL_DEFAULTS { get; set; }
        public DbSet<MT_ATPAR_USER_APP_ACL> MT_ATPAR_USER_APP_ACL { get; set; }
        public DbSet<MT_ATPAR_USER_APP_PARAMETERS> MT_ATPAR_USER_APP_PARAMETERS { get; set; }
        public DbSet<MT_ATPAR_USER_GROUPS> MT_ATPAR_USER_GROUPS { get; set; }
        public DbSet<MT_ATPAR_USER_ORG_GROUPS> MT_ATPAR_USER_ORG_GROUPS { get; set; }
        public DbSet<MT_ATPAR_ZONE_STORAGE_LEVELS> MT_ATPAR_ZONE_STORAGE_LEVELS { get; set; }
        public DbSet<MT_BTBN_DTL_TRANSACTION> MT_BTBN_DTL_TRANSACTION { get; set; }
        public DbSet<MT_BTBN_INV_SYNC_DATA> MT_BTBN_INV_SYNC_DATA { get; set; }
        public DbSet<MT_CRCT_CRITICAL_ITEMS> MT_CRCT_CRITICAL_ITEMS { get; set; }
        public DbSet<MT_CRCT_PAR_AUDIT> MT_CRCT_PAR_AUDIT { get; set; }
        public DbSet<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS> MT_CRCT_PAR_LOC_SCHEDULE_DETAILS { get; set; }
        public DbSet<MT_CRCT_PUTAWAY_DETAIL> MT_CRCT_PUTAWAY_DETAIL { get; set; }
        public DbSet<MT_CRCT_USER_ALLOCATION> MT_CRCT_USER_ALLOCATION { get; set; }
        public DbSet<MT_CRCT_USER_SCHEDULE> MT_CRCT_USER_SCHEDULE { get; set; }
        public DbSet<MT_CYCT_EVENT_ALLOCATION> MT_CYCT_EVENT_ALLOCATION { get; set; }
        public DbSet<MT_CYCT_EVENT_DETAIL> MT_CYCT_EVENT_DETAIL { get; set; }
        public DbSet<MT_CYCT_EVENT_DETAIL_MASTER> MT_CYCT_EVENT_DETAIL_MASTER { get; set; }
        public DbSet<MT_CYCT_EVENT_HDR> MT_CYCT_EVENT_HDR { get; set; }
        public DbSet<MT_CYCT_EVENT_HDR_MASTER> MT_CYCT_EVENT_HDR_MASTER { get; set; }
        public DbSet<MT_CYCT_EVENT_SUMMARY> MT_CYCT_EVENT_SUMMARY { get; set; }
        public DbSet<MT_CYCT_ITEM_UOM> MT_CYCT_ITEM_UOM { get; set; }
        public DbSet<MT_CYCT_ITEM_UOM_MASTER> MT_CYCT_ITEM_UOM_MASTER { get; set; }
        public DbSet<MT_DELV_BU_ALLOCATION> MT_DELV_BU_ALLOCATION { get; set; }
        public DbSet<MT_DELV_COST_CENTER_AUTH_PERSON> MT_DELV_COST_CENTER_AUTH_PERSON { get; set; }
        public DbSet<MT_DELV_DELIVER_UPDATE> MT_DELV_DELIVER_UPDATE { get; set; }
        public DbSet<MT_DELV_DLVR_ATTEMPT> MT_DELV_DLVR_ATTEMPT { get; set; }
        public DbSet<MT_DELV_EXCLUDE_LOC> MT_DELV_EXCLUDE_LOC { get; set; }
        public DbSet<MT_DELV_ITEM_TRIP> MT_DELV_ITEM_TRIP { get; set; }
        public DbSet<MT_DELV_ITEM_TRIP_DELETE> MT_DELV_ITEM_TRIP_DELETE { get; set; }
        public DbSet<MT_DELV_ITEM_TRIP_MISC_EVENT> MT_DELV_ITEM_TRIP_MISC_EVENT { get; set; }
        public DbSet<MT_DELV_LOC_ALLOCATION> MT_DELV_LOC_ALLOCATION { get; set; }
        public DbSet<MT_DELV_LOC_DETAILS> MT_DELV_LOC_DETAILS { get; set; }
        public DbSet<MT_DELV_RECV_SIGNATURE> MT_DELV_RECV_SIGNATURE { get; set; }
        public DbSet<MT_DELV_SHIPTO_ID_ALLOCATION> MT_DELV_SHIPTO_ID_ALLOCATION { get; set; }
        public DbSet<MT_PKPL_ALLOCATION> MT_PKPL_ALLOCATION { get; set; }
        public DbSet<MT_PKPL_BU_ALLOCATION> MT_PKPL_BU_ALLOCATION { get; set; }
        public DbSet<MT_PKPL_DEVIATION_DETAILS> MT_PKPL_DEVIATION_DETAILS { get; set; }
        public DbSet<MT_PKPL_DEVIATION_HEADER> MT_PKPL_DEVIATION_HEADER { get; set; }
        public DbSet<MT_PKPL_ORDER_PREFIX> MT_PKPL_ORDER_PREFIX { get; set; }
        public DbSet<MT_PKPL_PRIORITY> MT_PKPL_PRIORITY { get; set; }
        public DbSet<MT_POU_BILLONLY_ITEMS> MT_POU_BILLONLY_ITEMS { get; set; }
        public DbSet<MT_POU_CART_INVENTORY> MT_POU_CART_INVENTORY { get; set; }
        public DbSet<MT_POU_CASE_CART_DETAILS> MT_POU_CASE_CART_DETAILS { get; set; }
        public DbSet<MT_POU_CASE_CART_HEADER> MT_POU_CASE_CART_HEADER { get; set; }
        public DbSet<MT_POU_CASE_TRACK_HISTORY> MT_POU_CASE_TRACK_HISTORY { get; set; }
        public DbSet<MT_POU_CHARGECAPTURE_DETAILS> MT_POU_CHARGECAPTURE_DETAILS { get; set; }
        public DbSet<MT_POU_CHARGECAPTURE_HEADER> MT_POU_CHARGECAPTURE_HEADER { get; set; }
        public DbSet<MT_POU_CHARGECAPTURE_RETURNS> MT_POU_CHARGECAPTURE_RETURNS { get; set; }
        public DbSet<MT_POU_COST_CENTER> MT_POU_COST_CENTER { get; set; }
        public DbSet<MT_POU_COST_CENTER_ALLOCATIONS> MT_POU_COST_CENTER_ALLOCATIONS { get; set; }
        public DbSet<MT_POU_CRITICAL_ITEMS> MT_POU_CRITICAL_ITEMS { get; set; }
        public DbSet<MT_POU_CYCT_DEVIATION_DETAILS> MT_POU_CYCT_DEVIATION_DETAILS { get; set; }
        public DbSet<MT_POU_CYCT_DEVIATION_HEADER> MT_POU_CYCT_DEVIATION_HEADER { get; set; }
        public DbSet<MT_POU_DEPT> MT_POU_DEPT { get; set; }
        public DbSet<MT_POU_DEPT_CART_ALLOCATIONS> MT_POU_DEPT_CART_ALLOCATIONS { get; set; }
        public DbSet<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS { get; set; }
        public DbSet<MT_POU_DEPT_USER_ALLOCATIONS> MT_POU_DEPT_USER_ALLOCATIONS { get; set; }
        public DbSet<MT_POU_DEPT_WORKSTATIONS> MT_POU_DEPT_WORKSTATIONS { get; set; }
        public DbSet<MT_POU_EVENTS> MT_POU_EVENTS { get; set; }
        public DbSet<MT_POU_INVENTORY_TRACK_HISTORY> MT_POU_INVENTORY_TRACK_HISTORY { get; set; }
        public DbSet<MT_POU_NONCART_ITEMS> MT_POU_NONCART_ITEMS { get; set; }
        public DbSet<MT_POU_ORDER_DETAILS> MT_POU_ORDER_DETAILS { get; set; }
        public DbSet<MT_POU_ORDER_HEADER> MT_POU_ORDER_HEADER { get; set; }
        public DbSet<MT_POU_PAR_LOC_PROCESS_SCHEDULE> MT_POU_PAR_LOC_PROCESS_SCHEDULE { get; set; }
        public DbSet<MT_POU_PHYSICIAN> MT_POU_PHYSICIAN { get; set; }
        public DbSet<MT_POU_PREF_LIST_ALLOC> MT_POU_PREF_LIST_ALLOC { get; set; }
        public DbSet<MT_POU_PREF_LIST_HEADER> MT_POU_PREF_LIST_HEADER { get; set; }
        public DbSet<MT_POU_PROCEDURE_CODE> MT_POU_PROCEDURE_CODE { get; set; }
        public DbSet<MT_POU_PTWY_DEVIATION_DETAILS> MT_POU_PTWY_DEVIATION_DETAILS { get; set; }
        public DbSet<MT_POU_PTWY_DEVIATION_HEADER> MT_POU_PTWY_DEVIATION_HEADER { get; set; }
        public DbSet<MT_POU_REASON_CODE> MT_POU_REASON_CODE { get; set; }
        public DbSet<MT_POU_SPECIALTY_CODE> MT_POU_SPECIALTY_CODE { get; set; }
        public DbSet<MT_POU_WORKFLOW_DETAILS> MT_POU_WORKFLOW_DETAILS { get; set; }
        public DbSet<MT_PTWY_BU_ALLOCATION> MT_PTWY_BU_ALLOCATION { get; set; }
        public DbSet<MT_RECV_CARRIER> MT_RECV_CARRIER { get; set; }
        public DbSet<MT_RECV_DEVIATION_DETAILS> MT_RECV_DEVIATION_DETAILS { get; set; }
        public DbSet<MT_RECV_DEVIATION_HEADER> MT_RECV_DEVIATION_HEADER { get; set; }
        public DbSet<MT_RECV_EDI_VENDOR> MT_RECV_EDI_VENDOR { get; set; }
        public DbSet<MT_RECV_INV_BU_ALLOCATION> MT_RECV_INV_BU_ALLOCATION { get; set; }
        public DbSet<MT_RECV_MANAGE_CARRIERS> MT_RECV_MANAGE_CARRIERS { get; set; }
        public DbSet<MT_RECV_PARCEL_COUNTS_DETAIL> MT_RECV_PARCEL_COUNTS_DETAIL { get; set; }
        public DbSet<MT_RECV_PARCEL_COUNTS_SIGNATURE> MT_RECV_PARCEL_COUNTS_SIGNATURE { get; set; }
        public DbSet<MT_RECV_PO_BOXES> MT_RECV_PO_BOXES { get; set; }
        public DbSet<MT_RECV_SHIPTO_ID_ALLOCATION> MT_RECV_SHIPTO_ID_ALLOCATION { get; set; }
        public DbSet<MT_STIS_BU_ALLOCATION> MT_STIS_BU_ALLOCATION { get; set; }
        public DbSet<MT_STIS_DEST_LOC_ALLOCATION> MT_STIS_DEST_LOC_ALLOCATION { get; set; }
        public DbSet<MT_STIS_DETAILS> MT_STIS_DETAILS { get; set; }
        public DbSet<MT_STIS_DISTRIB_TYPE> MT_STIS_DISTRIB_TYPE { get; set; }
        public DbSet<MT_STIS_SIGNATURE> MT_STIS_SIGNATURE { get; set; }
        public DbSet<MT_STIS_UOM_SETUP> MT_STIS_UOM_SETUP { get; set; }
        public DbSet<PAR_MNGT_COST_CENTER> PAR_MNGT_COST_CENTER { get; set; }
        public DbSet<PAR_MNGT_ITEM> PAR_MNGT_ITEM { get; set; }
        public DbSet<PAR_MNGT_ITEM_STAGED> PAR_MNGT_ITEM_STAGED { get; set; }
        public DbSet<PAR_MNGT_ITEM_SUBSTITUTE> PAR_MNGT_ITEM_SUBSTITUTE { get; set; }
        public DbSet<PAR_MNGT_ORDER_DETAILS> PAR_MNGT_ORDER_DETAILS { get; set; }
        public DbSet<PAR_MNGT_ORDER_HEADER> PAR_MNGT_ORDER_HEADER { get; set; }
        public DbSet<PAR_MNGT_PAR_LOC_DETAILS> PAR_MNGT_PAR_LOC_DETAILS { get; set; }
        public DbSet<PAR_MNGT_PAR_LOC_HEADER> PAR_MNGT_PAR_LOC_HEADER { get; set; }
        public DbSet<PAR_MNGT_VENDOR> PAR_MNGT_VENDOR { get; set; }
        public DbSet<RF_BIN_LOC_MONITOR> RF_BIN_LOC_MONITOR { get; set; }
        public DbSet<RF_BIN_MAPPING> RF_BIN_MAPPING { get; set; }
        public DbSet<RF_EMPTY_BIN_DETAILS> RF_EMPTY_BIN_DETAILS { get; set; }
        public DbSet<RF_ITEM_LEVEL_MONITOR> RF_ITEM_LEVEL_MONITOR { get; set; }
        public DbSet<RF_ITEM_MAPPING> RF_ITEM_MAPPING { get; set; }
        public DbSet<RF_ITEM_USAGE_DETAILS> RF_ITEM_USAGE_DETAILS { get; set; }
        public DbSet<RF_READER_CONFIGURATION_DETAILS> RF_READER_CONFIGURATION_DETAILS { get; set; }
        public DbSet<RF_TAG_LATEST_VALUES> RF_TAG_LATEST_VALUES { get; set; }
        public DbSet<RM_ORG_UNITS> RM_ORG_UNITS { get; set; }
        public DbSet<RM_PICK_ALT_LOCATIONS> RM_PICK_ALT_LOCATIONS { get; set; }
        public DbSet<RM_PKPL_DETAILS> RM_PKPL_DETAILS { get; set; }
        public DbSet<RM_PKPL_HEADER> RM_PKPL_HEADER { get; set; }
        public DbSet<RM_RECV_PO_DETAIL> RM_RECV_PO_DETAIL { get; set; }
        public DbSet<RM_RECV_PO_HEADER> RM_RECV_PO_HEADER { get; set; }
        public DbSet<RM_SHIP_TO_LOCACTION> RM_SHIP_TO_LOCACTION { get; set; }
        public DbSet<RM_SHIPTO_IDS> RM_SHIPTO_IDS { get; set; }
        public DbSet<RM_STIS_ALT_UOMS> RM_STIS_ALT_UOMS { get; set; }
        public DbSet<RM_STIS_DETAILS> RM_STIS_DETAILS { get; set; }
        public DbSet<RM_STIS_HEADER> RM_STIS_HEADER { get; set; }
        public DbSet<RM_USER_LOCATIONS> RM_USER_LOCATIONS { get; set; }
        public DbSet<TKIT_CART_MANAGER> TKIT_CART_MANAGER { get; set; }
        public DbSet<TKIT_DEPT> TKIT_DEPT { get; set; }
        public DbSet<TKIT_EQ_INDICATOR> TKIT_EQ_INDICATOR { get; set; }
        public DbSet<TKIT_EQ_LOCATION> TKIT_EQ_LOCATION { get; set; }
        public DbSet<TKIT_ITEM_DEPT> TKIT_ITEM_DEPT { get; set; }
        public DbSet<TKIT_ITEM_INVENTORY> TKIT_ITEM_INVENTORY { get; set; }
        public DbSet<TKIT_ITEM_MASTER> TKIT_ITEM_MASTER { get; set; }
        public DbSet<TKIT_ITEM_TYPE> TKIT_ITEM_TYPE { get; set; }
        public DbSet<TKIT_ORDER_DETAILS> TKIT_ORDER_DETAILS { get; set; }
        public DbSet<TKIT_ORDER_HEADER> TKIT_ORDER_HEADER { get; set; }
        public DbSet<TKIT_REASON_CODES> TKIT_REASON_CODES { get; set; }
        public DbSet<TKIT_REQUESTOR> TKIT_REQUESTOR { get; set; }
        public DbSet<TKIT_REQUESTOR_DEPT> TKIT_REQUESTOR_DEPT { get; set; }
        public DbSet<MT_ATPAR_ROUTES> MT_ATPAR_ROUTES { get; set; }
        public DbSet<MT_ATPAR_APP_GROUP> MT_ATPAR_APP_GROUP { get; set; }
        public DbSet<MT_ATPAR_ITEM_ATTRIBUTES> MT_ATPAR_ITEM_ATTRIBUTES { get; set; }
        public DbSet<MT_POU_REPLEN_SOURCE_LOCATION> MT_POU_REPLEN_SOURCE_LOCATION { get; set; }
        public DbSet<MT_CRCT_TWO_BIN_ALLOCATION> MT_CRCT_TWO_BIN_ALLOCATION { get; set; }
        public DbSet<MT_ATPAR_ERROR_LOG> MT_ATPAR_ERROR_LOG { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema(ATPAR_MT_Context.dbschema);
            modelBuilder.Configurations.Add(new aspnet_ApplicationsMap());
            modelBuilder.Configurations.Add(new aspnet_PathsMap());
            modelBuilder.Configurations.Add(new aspnet_PersonalizationAllUsersMap());
            modelBuilder.Configurations.Add(new aspnet_PersonalizationPerUserMap());
            modelBuilder.Configurations.Add(new aspnet_SchemaVersionsMap());
            modelBuilder.Configurations.Add(new aspnet_UsersMap());
            modelBuilder.Configurations.Add(new CompletedScopeMap());
            modelBuilder.Configurations.Add(new InstanceStateMap());
            modelBuilder.Configurations.Add(new MT_AP_INTERFACE_TYPEMap());
            modelBuilder.Configurations.Add(new MT_AP_ORDER_TBL_IDMap());
            modelBuilder.Configurations.Add(new MT_AP_PARAMETER_PROCESSMap());
            modelBuilder.Configurations.Add(new MT_ASMT_AUDIT_DETAILMap());
            modelBuilder.Configurations.Add(new MT_ASMT_AUDIT_HEADERMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_APPMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_APP_LABELSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_APP_LINKED_LABELSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_AUDITMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_AUDIT_INFOMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_AUDIT_SCREEN_CONTROLSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_AUDIT_TEMPMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_BARCODE_SYMBOLOGYMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_CART_PREV_COUNTSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_CONFIGURATION_SECTION_DTLSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_DASHBOARD_DETAILSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_DASHBOARD_HEADERMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_DETAIL_TRANSACTIONMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_DEVIATIONMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_DEVICE_DETAILSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_ENTERPRISE_SYSTEM_DETAILSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_HL7_MSGS_TRANSMISSIONMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_IBU_ALLOCATIONMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_ITEM_MFG_UPNMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_JOB_SCHEDULESMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_LABELS_DATAMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_LATEST_VALUESMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_LBL_PRINTERSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_LIST_VIEWMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_LOC_GROUP_ALLOCATIONMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_LOC_GROUP_MEMBERSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_LOC_GROUPSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_LOGIN_HISTORYMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_MENUSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_MESSAGE_TBLMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_NOTESMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_NOTES_SETUPMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_OBJECTSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_ORG_GROUP_BUNITSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_ORG_GROUP_PARAMETERSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_ORG_GROUPSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_PARAM_MASTERMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_PASSWD_HISTORYMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_PATIENT_CACHEMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_PHYSICAL_INVENTORYMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_PRINT_FIELD_DEFAULTSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_PRINT_LABEL_DETAILSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_PRINT_LABEL_HEADERMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_PRINT_OBJECTS_INFOMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_PROCESS_TRANS_HISTORYMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_PROFILEMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_PROFILE_APP_ACLMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_PROFILE_LIST_VIEWMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_PROFILE_MENUMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_PROFILE_PARAMETERSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_RECALL_INFOMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_REPORTING_TABLES_LISTMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_REPORTS_SETTINGSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_SCHEDULE_DETAILMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_SCHEDULE_HEADERMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_SECURITY_AUDITMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_SECURITY_PARAMSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_SETUP_PRO_PRINTERESMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_SIGNATUREMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_STATUSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_STORAGE_ZONEMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_STORAGE_ZONES_ALLOCATIONMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_TOKENSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_TRANSACTIONMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_TRANSACTION_ID_TBLMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_UI_FIELDSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_UI_SETUPMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_USERMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_USER_ACLMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_USER_ACL_DEFAULTSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_USER_APP_ACLMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_USER_APP_PARAMETERSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_USER_GROUPSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_USER_ORG_GROUPSMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_ZONE_STORAGE_LEVELSMap());
            modelBuilder.Configurations.Add(new MT_BTBN_DTL_TRANSACTIONMap());
            modelBuilder.Configurations.Add(new MT_BTBN_INV_SYNC_DATAMap());
            modelBuilder.Configurations.Add(new MT_CRCT_CRITICAL_ITEMSMap());
            modelBuilder.Configurations.Add(new MT_CRCT_PAR_AUDITMap());
            modelBuilder.Configurations.Add(new MT_CRCT_PAR_LOC_SCHEDULE_DETAILSMap());
            modelBuilder.Configurations.Add(new MT_CRCT_PUTAWAY_DETAILMap());
            modelBuilder.Configurations.Add(new MT_CRCT_USER_ALLOCATIONMap());
            modelBuilder.Configurations.Add(new MT_CRCT_USER_SCHEDULEMap());
            modelBuilder.Configurations.Add(new MT_CYCT_EVENT_ALLOCATIONMap());
            modelBuilder.Configurations.Add(new MT_CYCT_EVENT_DETAILMap());
            modelBuilder.Configurations.Add(new MT_CYCT_EVENT_DETAIL_MASTERMap());
            modelBuilder.Configurations.Add(new MT_CYCT_EVENT_HDRMap());
            modelBuilder.Configurations.Add(new MT_CYCT_EVENT_HDR_MASTERMap());
            modelBuilder.Configurations.Add(new MT_CYCT_EVENT_SUMMARYMap());
            modelBuilder.Configurations.Add(new MT_CYCT_ITEM_UOMMap());
            modelBuilder.Configurations.Add(new MT_CYCT_ITEM_UOM_MASTERMap());
            modelBuilder.Configurations.Add(new MT_DELV_BU_ALLOCATIONMap());
            modelBuilder.Configurations.Add(new MT_DELV_COST_CENTER_AUTH_PERSONMap());
            modelBuilder.Configurations.Add(new MT_DELV_DELIVER_UPDATEMap());
            modelBuilder.Configurations.Add(new MT_DELV_DLVR_ATTEMPTMap());
            modelBuilder.Configurations.Add(new MT_DELV_EXCLUDE_LOCMap());
            modelBuilder.Configurations.Add(new MT_DELV_ITEM_TRIPMap());
            modelBuilder.Configurations.Add(new MT_DELV_ITEM_TRIP_DELETEMap());
            modelBuilder.Configurations.Add(new MT_DELV_ITEM_TRIP_MISC_EVENTMap());
            modelBuilder.Configurations.Add(new MT_DELV_LOC_ALLOCATIONMap());
            modelBuilder.Configurations.Add(new MT_DELV_LOC_DETAILSMap());
            modelBuilder.Configurations.Add(new MT_DELV_RECV_SIGNATUREMap());
            modelBuilder.Configurations.Add(new MT_DELV_SHIPTO_ID_ALLOCATIONMap());
            modelBuilder.Configurations.Add(new MT_PKPL_ALLOCATIONMap());
            modelBuilder.Configurations.Add(new MT_PKPL_BU_ALLOCATIONMap());
            modelBuilder.Configurations.Add(new MT_PKPL_DEVIATION_DETAILSMap());
            modelBuilder.Configurations.Add(new MT_PKPL_DEVIATION_HEADERMap());
            modelBuilder.Configurations.Add(new MT_PKPL_ORDER_PREFIXMap());
            modelBuilder.Configurations.Add(new MT_PKPL_PRIORITYMap());
            modelBuilder.Configurations.Add(new MT_POU_BILLONLY_ITEMSMap());
            modelBuilder.Configurations.Add(new MT_POU_CART_INVENTORYMap());
            modelBuilder.Configurations.Add(new MT_POU_CASE_CART_DETAILSMap());
            modelBuilder.Configurations.Add(new MT_POU_CASE_CART_HEADERMap());
            modelBuilder.Configurations.Add(new MT_POU_CASE_TRACK_HISTORYMap());
            modelBuilder.Configurations.Add(new MT_POU_CHARGECAPTURE_DETAILSMap());
            modelBuilder.Configurations.Add(new MT_POU_CHARGECAPTURE_HEADERMap());
            modelBuilder.Configurations.Add(new MT_POU_CHARGECAPTURE_RETURNSMap());
            modelBuilder.Configurations.Add(new MT_POU_COST_CENTERMap());
            modelBuilder.Configurations.Add(new MT_POU_COST_CENTER_ALLOCATIONSMap());
            modelBuilder.Configurations.Add(new MT_POU_CRITICAL_ITEMSMap());
            modelBuilder.Configurations.Add(new MT_POU_CYCT_DEVIATION_DETAILSMap());
            modelBuilder.Configurations.Add(new MT_POU_CYCT_DEVIATION_HEADERMap());
            modelBuilder.Configurations.Add(new MT_POU_DEPTMap());
            modelBuilder.Configurations.Add(new MT_POU_DEPT_CART_ALLOCATIONSMap());
            modelBuilder.Configurations.Add(new MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONSMap());
            modelBuilder.Configurations.Add(new MT_POU_DEPT_USER_ALLOCATIONSMap());
            modelBuilder.Configurations.Add(new MT_POU_DEPT_WORKSTATIONSMap());
            modelBuilder.Configurations.Add(new MT_POU_EVENTSMap());
            modelBuilder.Configurations.Add(new MT_POU_INVENTORY_TRACK_HISTORY_Map());
            modelBuilder.Configurations.Add(new MT_POU_NONCART_ITEMSMap());
            modelBuilder.Configurations.Add(new MT_POU_ORDER_DETAILSMap());
            modelBuilder.Configurations.Add(new MT_POU_ORDER_HEADERMap());
            modelBuilder.Configurations.Add(new MT_POU_PAR_LOC_PROCESS_SCHEDULEMap());
            modelBuilder.Configurations.Add(new MT_POU_PHYSICIANMap());
            modelBuilder.Configurations.Add(new MT_POU_PREF_LIST_ALLOCMap());
            modelBuilder.Configurations.Add(new MT_POU_PREF_LIST_HEADERMap());
            modelBuilder.Configurations.Add(new MT_POU_PROCEDURE_CODEMap());
            modelBuilder.Configurations.Add(new MT_POU_PTWY_DEVIATION_DETAILSMap());
            modelBuilder.Configurations.Add(new MT_POU_PTWY_DEVIATION_HEADERMap());
            modelBuilder.Configurations.Add(new MT_POU_REASON_CODEMap());
            modelBuilder.Configurations.Add(new MT_POU_SPECIALTY_CODEMap());
            modelBuilder.Configurations.Add(new MT_POU_WORKFLOW_DETAILSMap());
            modelBuilder.Configurations.Add(new MT_PTWY_BU_ALLOCATIONMap());
            modelBuilder.Configurations.Add(new MT_RECV_CARRIERMap());
            modelBuilder.Configurations.Add(new MT_RECV_DEVIATION_DETAILSMap());
            modelBuilder.Configurations.Add(new MT_RECV_DEVIATION_HEADERMap());
            modelBuilder.Configurations.Add(new MT_RECV_EDI_VENDORMap());
            modelBuilder.Configurations.Add(new MT_RECV_INV_BU_ALLOCATIONMap());
            modelBuilder.Configurations.Add(new MT_RECV_MANAGE_CARRIERSMap());
            modelBuilder.Configurations.Add(new MT_RECV_PARCEL_COUNTS_DETAILMap());
            modelBuilder.Configurations.Add(new MT_RECV_PARCEL_COUNTS_SIGNATUREMap());
            modelBuilder.Configurations.Add(new MT_RECV_PO_BOXESMap());
            modelBuilder.Configurations.Add(new MT_RECV_SHIPTO_ID_ALLOCATIONMap());
            modelBuilder.Configurations.Add(new MT_STIS_BU_ALLOCATIONMap());
            modelBuilder.Configurations.Add(new MT_STIS_DEST_LOC_ALLOCATIONMap());
            modelBuilder.Configurations.Add(new MT_STIS_DETAILSMap());
            modelBuilder.Configurations.Add(new MT_STIS_DISTRIB_TYPEMap());
            modelBuilder.Configurations.Add(new MT_STIS_SIGNATUREMap());
            modelBuilder.Configurations.Add(new MT_STIS_UOM_SETUPMap());
            modelBuilder.Configurations.Add(new PAR_MNGT_COST_CENTERMap());
            modelBuilder.Configurations.Add(new PAR_MNGT_ITEMMap());
            modelBuilder.Configurations.Add(new PAR_MNGT_ITEM_STAGEDMap());
            modelBuilder.Configurations.Add(new PAR_MNGT_ITEM_SUBSTITUTEMap());
            modelBuilder.Configurations.Add(new PAR_MNGT_ORDER_DETAILSMap());
            modelBuilder.Configurations.Add(new PAR_MNGT_ORDER_HEADERMap());
            modelBuilder.Configurations.Add(new PAR_MNGT_PAR_LOC_DETAILSMap());
            modelBuilder.Configurations.Add(new PAR_MNGT_PAR_LOC_HEADERMap());
            modelBuilder.Configurations.Add(new PAR_MNGT_VENDORMap());
            modelBuilder.Configurations.Add(new RF_BIN_LOC_MONITORMap());
            modelBuilder.Configurations.Add(new RF_BIN_MAPPINGMap());
            modelBuilder.Configurations.Add(new RF_EMPTY_BIN_DETAILSMap());
            modelBuilder.Configurations.Add(new RF_ITEM_LEVEL_MONITORMap());
            modelBuilder.Configurations.Add(new RF_ITEM_MAPPINGMap());
            modelBuilder.Configurations.Add(new RF_ITEM_USAGE_DETAILSMap());
            modelBuilder.Configurations.Add(new RF_READER_CONFIGURATION_DETAILSMap());
            modelBuilder.Configurations.Add(new RF_TAG_LATEST_VALUESMap());
            modelBuilder.Configurations.Add(new RM_ORG_UNITSMap());
            modelBuilder.Configurations.Add(new RM_PICK_ALT_LOCATIONSMap());
            modelBuilder.Configurations.Add(new RM_PKPL_DETAILSMap());
            modelBuilder.Configurations.Add(new RM_PKPL_HEADERMap());
            modelBuilder.Configurations.Add(new RM_RECV_PO_DETAILMap());
            modelBuilder.Configurations.Add(new RM_RECV_PO_HEADERMap());
            modelBuilder.Configurations.Add(new RM_SHIP_TO_LOCACTIONMap());
            modelBuilder.Configurations.Add(new RM_SHIPTO_IDSMap());
            modelBuilder.Configurations.Add(new RM_STIS_ALT_UOMSMap());
            modelBuilder.Configurations.Add(new RM_STIS_DETAILSMap());
            modelBuilder.Configurations.Add(new RM_STIS_HEADERMap());
            modelBuilder.Configurations.Add(new RM_USER_LOCATIONSMap());
            modelBuilder.Configurations.Add(new TKIT_CART_MANAGERMap());
            modelBuilder.Configurations.Add(new TKIT_DEPTMap());
            modelBuilder.Configurations.Add(new TKIT_EQ_INDICATORMap());
            modelBuilder.Configurations.Add(new TKIT_EQ_LOCATIONMap());
            modelBuilder.Configurations.Add(new TKIT_ITEM_DEPTMap());
            modelBuilder.Configurations.Add(new TKIT_ITEM_INVENTORYMap());
            modelBuilder.Configurations.Add(new TKIT_ITEM_MASTERMap());
            modelBuilder.Configurations.Add(new TKIT_ITEM_TYPEMap());
            modelBuilder.Configurations.Add(new TKIT_ORDER_DETAILSMap());
            modelBuilder.Configurations.Add(new TKIT_ORDER_HEADERMap());
            modelBuilder.Configurations.Add(new TKIT_REASON_CODESMap());
            modelBuilder.Configurations.Add(new TKIT_REQUESTORMap());
            modelBuilder.Configurations.Add(new TKIT_REQUESTOR_DEPTMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_ROUTESMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_APP_GROUPMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_ITEM_ATTRIBUTESMap());
            modelBuilder.Configurations.Add(new MT_POU_REPLEN_SOURCE_LOCATIONMap());
            modelBuilder.Configurations.Add(new MT_CRCT_TWO_BIN_ALLOCATIONMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_ERROR_LOGMap());
        }


        #region StoredProcedures

        public async Task<List<MT_ATPAR_USER>> GetUsers(string appId, string orgGrpId, string UserId)
        {
            try
            {

                long statusCode = 0;
                List<MT_ATPAR_USER> lstUsers = null;
                using (ATPAR_MT_Context mt = new ATPAR_MT_Context())
                {
                    SqlParameter paramAppId = new SqlParameter("@appId", appId);
                    SqlParameter paramOrgGrpId = new SqlParameter("@orgGrpId", orgGrpId);
                    SqlParameter paramUserId = new SqlParameter("@userId", orgGrpId);
                    SqlParameter paramStatusCode = new SqlParameter("@StatusCode", statusCode);
                    paramStatusCode.Direction = System.Data.ParameterDirection.Output;

                    lstUsers = await mt.Database.SqlQuery<MT_ATPAR_USER>("exec GetClientUsersList @appId,@orgGrpId,@userId,@StatusCode OUT", paramAppId, paramOrgGrpId, paramUserId).ToListAsync();

                }
                return lstUsers;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public async Task<List<MT_ATPAR_USER>> GetUsersByQuery()
        {
            List<MT_ATPAR_USER> lstUsers = null;
            using (ATPAR_MT_Context mt = new ATPAR_MT_Context())
            {
                lstUsers = await mt.Database.SqlQuery<MT_ATPAR_USER>(" Select USER_ID From MT_ATPAR_USER").ToListAsync();
            }
            return lstUsers;
        }
        #endregion
        public class EntityFrameworkConfiguration : DbConfiguration
        {
            public EntityFrameworkConfiguration()
            {
                this.SetModelCacheKey(ctx => new EntityModelCacheKey((ctx.GetType().FullName + ctx.Database.Connection.ConnectionString).GetHashCode()));
            }
        }
        public class EntityModelCacheKey : IDbModelCacheKey
        {
            private readonly int _hashCode;

            public EntityModelCacheKey(int hashCode)
            {
                _hashCode = hashCode;
            }

            public override bool Equals(object other)
            {
                if (other == null) return false;
                return other.GetHashCode() == _hashCode;
            }

            public override int GetHashCode()
            {
                return _hashCode;
            }
        }
    }
}
