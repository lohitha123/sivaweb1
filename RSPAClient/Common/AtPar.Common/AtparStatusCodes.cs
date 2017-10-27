using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace AtPar.Common
{
    public static class AtparStatusCodes
    {
        public enum RequestorType
        {

            WEB = 0,

            MOBILE = 1,
        }

        public enum DisplayType
        {

            ALL = 0,

            ALLOCATED = 1,

            UNALLOCATED = 2,
        }

        public enum DBType
        {

            SQLSERVER = 0,

            ORACLE = 1,

            DB2DB = 2,

            INFORMIX = 3,
        }
       
        public enum LoginType
        {

            WEB,

            HHT,

            Win32,
        }

        public const long ATPAR_OK = 0;

        // External
        public const long E_REMOTEERROR = 1302201;

        //  General Errors
        public const long E_INVALIDPARAMETER = 1002000;

        public const long E_CLASSINITALIZE = 1002001;

        public const long E_LOGIN_FAILED = 1002002;

        public const long E_USERDONOTEXIST = 1002003;

        public const long E_ACCOUNTDISABLED = 1002004;

        public const long E_NOTSERVERUSER = 1002005;

        public const long E_PWDDONOTEXIST = 1002006;

        public const long E_HINTQNOTEXIST = 1002007;

        public const long E_NOTANUMBER = 1002008;

        public const long E_INVALIDTIME = 1002009;

        public const long E_INVALIDINTERVAL = 1002010;

        public const long E_INVALIDSCHEDULES = 1002011;

        public const long E_INVALIDINTERVAL_FORMAT = 1002012;

        public const long E_INVALIDTIME_RANGE = 1002013;

        public const long E_INVALIDCLIENT_VERSION = 1002020;

        public const long FAILED_PASSWD_CMPX_1 = 1002021;

        public const long FAILED_PASSWD_CMPX_2 = 1002022;

        public const long FAILED_PASSWD_CMPX_3 = 1002023;

        public const long E_ITEMEXISTS = 1002024;

        public const long E_MANDATORYFLDSMISSING = 1102009;

        public const long E_INVALIDDEVICE = 1102008;

        public const long E_SERVERERROR = 1102000;

        public const long E_XMLSTRINGNOTLOADED = 1102001;

        public const long E_NORECORDFOUND = 1102002;

        public const long E_UTILOBJECTCREATEFAIL = 1102003;

        public const long E_NORECORDUPDATED = 1102004;

        public const long E_CONNECTIONOPEN = 1102006;

        public const long E_REMOTESUCCESSLOCALFAIL = 1102007;

        public const long E_ATPARSERVICESTOPPED = 1102020;

        public const long E_INVALIDFILE = 1102029;

        public const long E_INVALIDCREDENTIALS = 1002014;

        public const long E_NO_ARCHIVE_DATABASE = 1002015;

        public const long E_INVALID_ARCHIVE_DATABASE = 1002016;

        public const long E_REFINE_FILTER = 1002017;

        public const long ATPAR_E_CONFFILEOPENFALIURE = 1113000;

        public const long ATPAR_E_CONFFILEPARSEFALIURE = 1113001;

        public const long ATPAR_E_FORMMAPFILEOPENFALIURE = 1113002;

        public const long ATPAR_E_REMOTEDBCONNECTFAIL = 1113005;

        public const long ATPAR_E_REMOTEDBCMDCREATEFAIL = 1113006;

        public const long ATPAR_E_REMOTEDBTRANSACTIONOPEN = 1113007;

        public const long ATPAR_E_REMOTEDBCOMMITFAIL = 1113008;

        public const long ATPAR_E_REMOTEDBROLLBACKFAIL = 111309;

        public const long ATPAR_E_LOCALBCONNECTFAIL = 1113010;

        public const long ATPAR_E_LOCALDBCMDCREATEFAIL = 1113011;

        public const long ATPAR_E_LOCALDBTRANSACTIONOPEN = 1113012;

        public const long ATPAR_E_LOCALDBCOMMITFAIL = 1113013;

        public const long ATPAR_E_LOCALDBROLLBACKFAIL = 1113014;

        public const long ATPAR_E_LOCALDBSELECTFAIL = 1102200;

        public const long ATPAR_E_LOCALDBUPDATEFAIL = 1102201;

        public const long ATPAR_E_LOCALDBINSERTFAIL = 1102202;

        public const long ATPAR_E_PRIMARYKEYVIOLATED = 1102203;

        public const long ATPAR_E_LOCALDBDELETEFAIL = 1102204;

        public const long ATPAR_E_LOCALDBMOVEFAIL = 1102208;

        public const long ATPAR_E_LOCALDBCOPYFAIL = 1102209;

        public const long ATPAR_E_CANNOTUPDATESTATUS = 1102210;

        public const long ATPAR_E_FILECREATIONFAIL = 1102211;

        public const long ATPAR_E_REMOTEDBSELECTFAIL = 1102205;

        public const long ATPAR_E_REMOTEDBUPDATEFAIL = 1102206;

        public const long ATPAR_E_REMOTEDBINSERTFAIL = 1102207;

        public const long ATPAR_E_OPENREGISTRYKEY = 1113015;

        public const long ATPAR_E_REGISTRYREAD = 1113016;

        public const long ATPAR_E_NOORGGRP_FOR_USER = 1112340;

        public const long ATPAR_E_NOPROFILEID_FOR_USER = 1112341;

        public const long ATPAR_E_USERDEFNINCOMPLETE = 1112300;

        public const long ATPAR_E_NOSUCHUSER = 1112301;

        public const long ATPAR_E_INVALIDPASSWORD = 1112302;

        public const long ATPAR_E_TOKENEXPIRED = 1112303;

        public const long ATPAR_E_ACCOUNTDISABLED = 1112304;

        public const long ATPAR_E_LOGINNOTALLOWED = 1112305;

        public const long ATPAR_E_USERCANTLOGINATTHISTIME = 1112306;

        public const long ATPAR_E_NOTACLIENTUSER = 1112307;

        public const long ATPAR_E_USERALREADYEXISTS = 1112308;

        public const long ATPAR_E_TOKENSAVEFAIL = 1112309;

        public const long ATPAR_E_DELETEUSER = 1112310;

        public const long ATPAR_E_NOSUCHROLE = 1112311;

        public const long ATPAR_E_NOSUCHAPP = 1112312;

        public const long ATPAR_E_INVALIDTOKEN = 1112313;

        public const long ATPAR_E_ACLCHANGED = 1112314;

        public const long ATPAR_E_USERPARAMSFAIL = 1112315;

        public const long ATPAR_E_CANTDELETEADMIN = 1112316;

        public const long ATPAR_E_PASSWORDVALIDITY = 1112317;

        public const long ATPAR_E_PASSWORDEXISTS = 1112318;

        public const long ATPAR_E_PASSWORDEXPIRED = 1112319;

        public const long ATPAR_E_PASSWORDNOTMATCHED = 1112320;        

        public const long ATPAR_E_PASSWDREQUIRED = 1112321;

        public const long ATPAR_E_PASSWORDRESETREQ = 1112322;

        public const long ATPAR_E_RECORDCOUNTEXCEEDED = 1112353;

        public const long ATPAR_E_LDAPUSERPWDCANNOTEXIST = 1112354;

        public const long ATPAR_E_CARRIERIDALREADYEXISTS = 1112355;

        public const long ATPAR_E_PASSWORDMINLENGTH = 1112356;

        public const long ATPAR_E_PASSWORDMAXLENGTH = 1112357;

        public const long EMAIL_ENTER_FROM_ADDRESS = 1112324;

        public const long EMAIL_ENTER_TO_ADDRESS = 1112323;

        public const long EMAIL_ENTER_SUBJECT = 1112342;

        public const long EMAIL_ENTER_BODY = 1112343;

        public const long EMAIL_SMTP_SERVER_MISSING = 1112344;

        public const long EMAIL_SMTP_PORT_MISSING = 1112349;

        public const long EMAIL_SEND_FAILED = 1112325;

        public const long ATPAR_HINTANOTMATCHED = 1112326;

        public const long ATPAR_E_PASSWORDUPDATIONFAILED = 1112327;

        public const long ATPAR_E_ROLEALREADYASSIGNED = 1112328;

        public const long ATPAR_E_NOPRINTADDRESS = 1112329;

        public const long ATPAR_E_PRIMARYKEYVOILATION = 1112330;

        public const long ATPAR_E_PROFILEEXIST = 1112331;

        public const long ATPAR_S_IUT_BUNIT_NOTALLOC = 1112332;

        public const long ATPAR_E_CUSTOMSTR = 1111111;

        public const long ATPAR_E_NOTBLFOUND = 1112338;

        public const long ATPAR_E_NOPRODUCTS_FOR_PROFILE = 1112339;

        public const long ATPAR_E_PROFILE_NOT_EXIST = 1112341;

        public const long ATPAR_E_ORG_NOT_EXIST = 1112345;

        public const long ATPAR_E_LOCALREADYEXISTS = 1112358;

        public const long ATPAR_E_PARLOCALREADYEXISTS = 1112359;

        public const long ATPAR_E_USERCONFIG = 1112360;

        public const long ATPAR_E_OLDPASSWORDNOTMATCHED = 1112444;

        // SW-3723
        public const long ATPAR_E_IUT_LOCKEDBYOTHERUSER = 1112333;

        public const long AUTHENTICATE_AGAINST_LDAP = 1112334;

        public const long ATPAR_E_ASSIGN_ORGBUS = 1112335;

        // DK-0005469
        public const long ATPAR_BUNIT_NOTALLOC = 1112336;

        public const long ATPAR_E_TRANSNO_NOTSET = 1112337;

        public const long ATPAR_E_NO_ERP_USER_ID = 1112346;

        public const long ATPAR_E_VENDORALREADYEXISTS = 1112347;

        public const long ATPAR_E_LOCGRPIDALREADYEXISTS = 1112348;

        public const long ATPAR_E_LOCGROUPALREADYEXISTS = 1112366;

        public const long ATPAR_E_COSTCENTEREXISTS = 1112351;

        public const long ATPAR_E_NOTVALIDPRINTER = 1112352;

        // Receiving Specific Codes
        public const long RECV_E_LOCKEDBYOTHERUSER = 1142300;

        public const long RECV_S_VENDORNOTEXISTS = 1142301;

        public const long RECV_S_UNRELEASEDRECEIVER = 1142302;

        public const long RECV_S_RECEIPTNOTRECEIVED = 1142303;

        public const long RECV_S_RECEIPTNOTFOUND = 1142304;

        public const long RECV_S_RECEIPTALREADYUPDATED = 1142330;

        public const long RECV_S_MULTIPLERECEIVERSEXISTS = 1142331;

        public const long RECV_S_INVALIDPOID = 1142333;

        public const long RECV_DROP_SHIP_PO = 1142334;

        public const long RECV_DFLT_SHIPTOID_UNALLOCATED = 1142335;

        public const long RECV_CNCT_INACTIVE_SHIPTOID = 1142311;

        public const long RECV_CNCT_UPDATE_ORGID_SHIPTOID = 1142308;


        // PMM
        public const long RECV_S_PODRAFT = 1142327;

        public const long RECV_E_INVALIDERPUSERID = 1142329;

        public const long RECV_S_PONOOPENLINES = 1142310;

        public const long RECV_ERP_EMPLOYEEID = 1142411;

        //    CYCT specific codes
        public const long CYCT_S_NOEVENTALLOCATED = 1230617;

        public const long S_EVENT_COMPLETE = 1230634;

        public const long S_EVENT_PROCESSED = 1230633;

        public const long S_EVENT_SENT = 1230635;

        public const long S_EVENT_PROCESSED_INERP = 1230627;

        public const long S_CYCT_SPLIT_EVNT_CANNOT_DL_PARENT = 1230628;

        public const long S_CYCT_EVENT_CANCELED = 1230629;

        public const long S_CYCT_EVENT_DEADLOCK = 1230630;

        public const long S_CYCT_EVENT_ORPHAN = 1230640;

        public const long S_CYCT_RECOUNTS_EXIST = 1230641;

        public const long S_CYCT_RECOUNT_USER = 1230642;

        public const long S_CYCT_RECOUNTEXISTS = 1230643;

        public const long S_CYCT_EVENTS_CNCT_UNALLOCATE = 1230644;

        //  Cart count specific Codes

        public const long CRCT_S_NOACCESSTOCART = 1122300;

        public const long CRCT_E_COUNTEXISTS = 1122301;

        public const long CRCT_E_INVALIDREQUESTERID = 1122302;

        public const long CRCT_S_RELEASEFAILED = 1122303;

        public const long CRCT_S_ERRITEMEXIST = 1122304;

        public const long CRCT_S_COUNTNOTLATEST = 1122305;

        public const long CRCT_E_ITEMDONOTEXIST = 1122306;

        public const long CRCT_S_CANNOTINACTIVATE = 1122307;

        public const long ATPAR_LOC_CANNOTINACTIVATE = 1122314;

        public const long CC_S_CANNOTINACTIVATE = 1123307;

        public const long CRCT_E_ITEMINACTIVATED = 1122308;

        public const long CRCT_S_BINSEQCHANGED = 1122309;

        public const long CRCT_E_CARTDOESNOTEXIST = 1122310;

        public const long CRCT_S_CANNOTACTIVATE = 1122311;

        public const long CRCT_S_CARTNOTALLOCATED = 1122330;

        public const long CRCT_E_INVALIDCOUNT = 1122331;

        public const long CRCT_E_ERRORCOUNTEXISTS = 1220632;

        public const long CRCT_E_ERPCOMPCREATION = 1102005;

        public const long CRCT_MANDATORYCOUNTSMISSING = 1220634;

        public const long CRCT_E_ORDERNOTGENERATED = 1220635;

        public const long CRCT_S_ITEMCANNOTINACTIVATE = 1122313;

        //  Pick Plan Specific Codes
        public const long PKPL_E_LOCKEDBYOTHERUSER = 1152300;

        public const long PKPL_E_NOLOCATIONALLOCATED = 1152301;

        public const long PKPL_S_CANNOTINACTIVATE = 1152302;

        public const long S_PKPL_ALLOCATEBUNIT = 1250642;

        // Deliver Specific Codes
        public const long DELV_E_NOTALLOWEDTOALLOCATELOCATION = 1162300;

        public const long DELV_E_LOCATIONNOTALLOCATED = 1162301;

        public const long DELV_E_HANDOVERNOTALLOWED = 1162302;

        public const long DELV_E_BUNITNOTALLOCATED = 1162303;

        public const long DELV_E_ERRORATPAROK = 1162304;

        // Bug# 786 - Divya - 12/23/2005 (MM/DD/YYYY)
        public const long DELV_E_LOCPONOTFOUND = 1162305;

        public const long DELV_E_PONONPONOTFOUND = 1162306;

        public const long DELV_E_NONPONOTFOUND = 1162307;

        public const long DELV_E_NOPODATA_FROM_ERP = 1162308;

        public const long DELV_SHOWALLTRKLOCS = 1162309;

        public const long DELV_E_NOTALLOWED_TO_ERP = 1162316;

        public const long DELV_E_PONOTFOUND = 1162315;

        public const long DELV_E_LOCKEDBYOTHERUSER = 1162317;

        public const long DELV_E_MULTIREDELIVERLINES = 1162324;

        public const long RECV_S_TRACKINGALREADYEXISTS = 1142340;

        public const long RECV_S_CANCEL_TRACKINGALREADYEXISTS = 1142341;

        public const long S_ALLOCATEBUNIT = 1260645;

        public const long S_ALLOCATELOCREQUIRED = 1250637;

        //  PutAway  Specific Codes
        public const long PTWY_E_LOCKEDBYOTHERUSER = 1172300;

        //  TrackIT  Specific Codes
        public const long TKIT_E_LOCALREADYEXISTS = 1192300;

        public const long TKIT_E_EQTYPEALREADYEXISTS = 1192400;

        public const long TKIT_E_EQTYPECREATED = 1192402;


        public const long TKIT_E_DEPTALREADYEXISTS = 1192401;

        public const long TKIT_E_USERIDALREADYEXISTS = 1192500;

        public const long TKIT_E_INACTIVEREQUESTOR = 1192600;

        public const long TKIT_E_ITEMEXISTS = 1192700;

        public const long TKIT_E_ITEMNOTALLOWED = 1192800;

        public const long TKIT_E_INVALIDTRANS = 1192900;

        public const long TKIT_E_QTYEXCEEDS = 1193000;

        public const long TKIT_E_SERIALEXISTS = 1193001;

        public const long TKIT_E_REASONCODEEXISTS = 1193013;

        public const long TKIT_E_SERIALNOTEXISTS = 1193002;

        public const long TKIT_E_SERIALNOTAVAILABLE = 1193003;

        public const long TKIT_E_ITEMNOTAVAILABLE = 1193004;

        public const long TKIT_E_ERRORATPAROK = 1193005;

        public const long TKIT_E_ITEMINACTIVATED = 1193006;

        public const long TKIT_E_SERIALINACTIVATED = 1193007;

        public const long TKIT_E_SERIALREQEXCEEDSSERVICEDT = 1193008;

        public const long TKIT_E_NOSUCHSERIALNO = 1193009;

        public const long TKIT_E_SERIALITEMCOMBDONOTEXIST = 1193010;

        public const long TKIT_E_INVALIDPASSWORD = 1193011;

        public const long TKIT_E_USERDONOTEXIST = 1193012;

        public const long TKIT_E_ITEM_ADDEDTOTHECART = 1193014;


        public const long STIS_URL_NOT_FOUND = 11102300;

        public const long STIS_NO_RESPONSE = 11102301;

        public const long STIS_NOTIFICATION_ERROR = 11102302;

        public const long STIS_FAULT_ERROR = 11102303;

        public const long STIS_COMPONENT_NAME = 11102304;

        public const long STIS_INCORRECT_PWD = 11102305;

        public const long STIS_MISSING_LOGIN_INFO = 11102306;

        public const long ASMT_S_NOACCESSTOLOCATION = 11112300;

        public const long ASMT_S_NOLOCATIONFOUND = 11112301;

        public const long ATPAR_E_ITEMINVBUNIT_NOTEXIST = 1112343;

        public const long ATPAR_E_COSTCENTER_NOTEXIST = 1112342;

        // MEDITECH ERP TIMEOUT
        public const long ATPAR_E_REMOTETIMEOUT = 111310;

        public const long ATPAR_E_MEDITECHMENUNOTMATCHED = 1102016;

        public const long ATPAR_S_MEDITECHINFOMSG = 12122302;

        // PARMANAGEMENT SPECIFIC CODE
        public const long PAR_NO_ITEMEXISTS = 111700;

        public const long S_BIN_ALREADYEXISTS = 111701;

        // Inventory Items
        public const long INV_E_ITEMDONOTEXIST = 1122322;

        public const long ITEM_E_INACITVE = 1122323;

        public const long VENDOR_S_CANNOTINACTIVATE = 1122324;

        // WEBPAGE UI Messages
        public const long ATPAR_E_FAILEDTOBIND = 1102017;

        public const long ATPAR_E_UPDATE_SUCCESS = 1102018;

        public const long ATPAR_E_DELETE_SUCCESS = 1102019;

        public const long ATPAR_E_ALREADY_EXISTS = 1102036;

        public const long ATPAR_E_ADDED_SUCCESS = 1102021;

        public const long ATPAR_E_SAVE_CANCEL = 1102022;

        public const long ATPAR_E_PLEASE_ENTER_MANDATORY = 1102023;

        public const long ATPAR_E_ONLY_CHARACTERS_NUMBERS = 1102024;

        public const long ATPAR_E_ONLY_NUMBERS = 1102025;

        public const long ATPAR_E_STARTPOSITION_VALIDTION = 1102026;

        public const long ATPAR_E_OUTPUTLENGTH_VALIDATION = 1102027;

        public const long ATPAR_E_INT_DATA_VALIDATION = 1102028;

        public const long ATPAR_E_SYSTEMMISMATCH = 1112350;

        // POU
        public const long S_FOUNDIN_REFDB = 1122351;

        public const long S_FOUNDIN_ALLOCATEDCART = 1122352;

        public const long S_POGEN_FAILED = 1122353;

        public const long S_FAILEDTOCHARGE = 1122354;

        public const long S_FAILEDTOCREDITOLDPATIENT = 1122355;

        public const long S_FAILEDTOCREDITNEWPATIENT = 1122356;

        public const long ATPAR_S_CONFIGUREORGID = 1113017;

        public const long ATPAR_E_USERDOESNOTEXIST = 1002003;

        public const long ATPAR_E_NODEPT_FOR_USER = 1122358;

        public const long ATPAR_E_NOORGGRP_FOR_DEPT = 1122359;

        public const long ATPAR_E_WORKSTATION_NOT_EXIST = 1122357;

        public const long ATPAR_E_CARTNOTALLOCATED = 11223510;

        public const long ATPAR_E_WORKSTATIONNOTALLOCATEDTOCART = 11223511;

        public const long ATPAR_E_PHYSICIAN_NOTEXIST = 1122360;

        public const long S_WORKSTATION_EXIST = 1122369;

        public const long INV_NOT_MNGD_IN_ATPAR = 1122365;

        public const long BILNG_NOT_MNGD_IN_ATPAR = 1122370;

        public const long S_FOUNDIN_ATPAR_ITEMMASTER = 11156000;

        public const long S_FOUNDIN_ERP_ITEMMASTER = 11156001;

        public const long ATPAR_LDAP_PWD_NEVER_EXPIRES = 12122304;

        public const long ATPAR_LDAP_PWD_EXPIRED = 12122305;

        public const long ATPAR_LDAP_PWD_EXPIRE_WARNING_NOTSET = 12122306;

        public const long E_LDAP_EXPIRY_NOTIFICATION_FAILED = 12122307;

        public const string NO_LABEL_BARCODE_DATA_INDICATOR = "NA";

        public const long E_PRINTERROR = 1202005;

        public const long E_NOPRINTADDRESS = 1202006;

        public const long E_HOMEDEPARTMENT = 122015;

        public const long S_CANCELED = 122016;

        public const long S_PREFREPLACED = 122018;

        public const long S_REMOVED = 122019;

        public const long E_SOURCELOCATIONEXIST = 122020;

        public const long S_POU_ITEMEXIST = 1122398;

        public const long S_PREF_LIST_EXIST = 1122368;

        public const long S_DEPT_EXIST = 1122371;

        public const long S_POU_REVIEW_LATEST_DATA = 11156016;

        public const long S_POU_CASE_ALREADY_EXISTS = 1122372;

        public const long S_POU_CASE_PREF_ALREADY_EXISTS = 1122373;

        // Pharmacy
        public const long RX_E_LOCKEDBYOTHERUSER = 11156010;

        public const long S_DATAEXISTS_INTABLE = 1102014;

        public const long E_SEARCH_INVALID = 1220139;

        public const long E_LABEL_DATA_LENGTH_ERROR = 1202403;

        public const long E_LABEL_DATA_FORMAT_ERROR = 1202402;

        public const long E_MULTI_LINE_ERROR = 1202014;

        public const long CARTS_ASSIGNED = 1122366;

        public const long INVAILD_ITEM = 1122367;

        public const long E_POU_ITEMEXIST = 1122374;

        public const long UPDATEFAIL_NONCATALOGITEMS = 1122375;

        public const long S_POU_INACTIVEITEM = 1122376;
    }

}