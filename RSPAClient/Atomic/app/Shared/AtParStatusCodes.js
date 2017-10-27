"use strict";
var AtparStatusCodes = (function () {
    function AtparStatusCodes() {
    }
    return AtparStatusCodes;
}());
AtparStatusCodes.ATPAR_OK = 0;
AtparStatusCodes.E_REMOTEERROR = 1302201;
AtparStatusCodes.E_INVALIDPARAMETER = 1002000;
AtparStatusCodes.E_CLASSINITALIZE = 1002001;
AtparStatusCodes.E_LOGIN_FAILED = 1002002;
AtparStatusCodes.E_USERDONOTEXIST = 1002003;
AtparStatusCodes.E_ACCOUNTDISABLED = 1002004;
AtparStatusCodes.E_NOTSERVERUSER = 1002005;
AtparStatusCodes.E_PWDDONOTEXIST = 1002006;
AtparStatusCodes.E_HINTQNOTEXIST = 1002007;
AtparStatusCodes.E_NOTANUMBER = 1002008;
AtparStatusCodes.E_INVALIDTIME = 1002009;
AtparStatusCodes.E_INVALIDINTERVAL = 1002010;
AtparStatusCodes.E_INVALIDSCHEDULES = 1002011;
AtparStatusCodes.E_INVALIDINTERVAL_FORMAT = 1002012;
AtparStatusCodes.E_INVALIDTIME_RANGE = 1002013;
AtparStatusCodes.E_INVALIDCLIENT_VERSION = 1002020;
AtparStatusCodes.FAILED_PASSWD_CMPX_1 = 1002021;
AtparStatusCodes.FAILED_PASSWD_CMPX_2 = 1002022;
AtparStatusCodes.FAILED_PASSWD_CMPX_3 = 1002023;
AtparStatusCodes.E_ITEMEXISTS = 1002024;
AtparStatusCodes.E_MANDATORYFLDSMISSING = 1102009;
AtparStatusCodes.E_INVALIDDEVICE = 1102008;
AtparStatusCodes.E_SERVERERROR = 1102000;
AtparStatusCodes.E_XMLSTRINGNOTLOADED = 1102001;
AtparStatusCodes.E_NORECORDFOUND = 1102002;
AtparStatusCodes.E_UTILOBJECTCREATEFAIL = 1102003;
AtparStatusCodes.E_NORECORDUPDATED = 1102004;
AtparStatusCodes.E_CONNECTIONOPEN = 1102006;
AtparStatusCodes.E_REMOTESUCCESSLOCALFAIL = 1102007;
AtparStatusCodes.E_ATPARSERVICESTOPPED = 1102020;
AtparStatusCodes.E_INVALIDFILE = 1102029;
AtparStatusCodes.E_INVALIDCREDENTIALS = 1002014;
AtparStatusCodes.E_NO_ARCHIVE_DATABASE = 1002015;
AtparStatusCodes.E_INVALID_ARCHIVE_DATABASE = 1002016;
AtparStatusCodes.E_REFINE_FILTER = 1002017;
AtparStatusCodes.ATPAR_E_CONFFILEOPENFALIURE = 1113000;
AtparStatusCodes.ATPAR_E_CONFFILEPARSEFALIURE = 1113001;
AtparStatusCodes.ATPAR_E_FORMMAPFILEOPENFALIURE = 1113002;
AtparStatusCodes.ATPAR_E_REMOTEDBCONNECTFAIL = 1113005;
AtparStatusCodes.ATPAR_E_REMOTEDBCMDCREATEFAIL = 1113006;
AtparStatusCodes.ATPAR_E_REMOTEDBTRANSACTIONOPEN = 1113007;
AtparStatusCodes.ATPAR_E_REMOTEDBCOMMITFAIL = 1113008;
AtparStatusCodes.ATPAR_E_REMOTEDBROLLBACKFAIL = 111309;
AtparStatusCodes.ATPAR_E_LOCALBCONNECTFAIL = 1113010;
AtparStatusCodes.ATPAR_E_LOCALDBCMDCREATEFAIL = 1113011;
AtparStatusCodes.ATPAR_E_LOCALDBTRANSACTIONOPEN = 1113012;
AtparStatusCodes.ATPAR_E_LOCALDBCOMMITFAIL = 1113013;
AtparStatusCodes.ATPAR_E_LOCALDBROLLBACKFAIL = 1113014;
AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL = 1102200;
AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL = 1102201;
AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL = 1102202;
AtparStatusCodes.ATPAR_E_PRIMARYKEYVIOLATED = 1102203;
AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL = 1102204;
AtparStatusCodes.ATPAR_E_LOCALDBMOVEFAIL = 1102208;
AtparStatusCodes.ATPAR_E_LOCALDBCOPYFAIL = 1102209;
AtparStatusCodes.ATPAR_E_CANNOTUPDATESTATUS = 1102210;
AtparStatusCodes.ATPAR_E_FILECREATIONFAIL = 1102211;
AtparStatusCodes.ATPAR_E_REMOTEDBSELECTFAIL = 1102205;
AtparStatusCodes.ATPAR_E_REMOTEDBUPDATEFAIL = 1102206;
AtparStatusCodes.ATPAR_E_REMOTEDBINSERTFAIL = 1102207;
AtparStatusCodes.ATPAR_E_OPENREGISTRYKEY = 1113015;
AtparStatusCodes.ATPAR_E_REGISTRYREAD = 1113016;
AtparStatusCodes.ATPAR_E_NOORGGRP_FOR_USER = 1112340;
AtparStatusCodes.ATPAR_E_NOPROFILEID_FOR_USER = 1112341;
AtparStatusCodes.ATPAR_E_USERDEFNINCOMPLETE = 1112300;
AtparStatusCodes.ATPAR_E_NOSUCHUSER = 1112301;
AtparStatusCodes.ATPAR_E_INVALIDPASSWORD = 1112302;
AtparStatusCodes.ATPAR_E_TOKENEXPIRED = 1112303;
AtparStatusCodes.ATPAR_E_ACCOUNTDISABLED = 1112304;
AtparStatusCodes.ATPAR_E_LOGINNOTALLOWED = 1112305;
AtparStatusCodes.ATPAR_E_USERCANTLOGINATTHISTIME = 1112306;
AtparStatusCodes.ATPAR_E_NOTACLIENTUSER = 1112307;
AtparStatusCodes.ATPAR_E_USERALREADYEXISTS = 1112308;
AtparStatusCodes.ATPAR_E_TOKENSAVEFAIL = 1112309;
AtparStatusCodes.ATPAR_E_DELETEUSER = 1112310;
AtparStatusCodes.ATPAR_E_NOSUCHROLE = 1112311;
AtparStatusCodes.ATPAR_E_NOSUCHAPP = 1112312;
AtparStatusCodes.ATPAR_E_INVALIDTOKEN = 1112313;
AtparStatusCodes.ATPAR_E_ACLCHANGED = 1112314;
AtparStatusCodes.ATPAR_E_USERPARAMSFAIL = 1112315;
AtparStatusCodes.ATPAR_E_CANTDELETEADMIN = 1112316;
AtparStatusCodes.ATPAR_E_PASSWORDVALIDITY = 1112317;
AtparStatusCodes.ATPAR_E_PASSWORDEXISTS = 1112318;
AtparStatusCodes.ATPAR_E_PASSWORDEXPIRED = 1112319;
AtparStatusCodes.ATPAR_E_PASSWORDNOTMATCHED = 1112320;
AtparStatusCodes.ATPAR_E_PASSWDREQUIRED = 1112321;
AtparStatusCodes.ATPAR_E_PASSWORDRESETREQ = 1112322;
AtparStatusCodes.ATPAR_E_RECORDCOUNTEXCEEDED = 1112353;
AtparStatusCodes.ATPAR_E_LDAPUSERPWDCANNOTEXIST = 1112354;
AtparStatusCodes.ATPAR_E_CARRIERIDALREADYEXISTS = 1112355;
AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS = 1112324;
AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS = 1112323;
AtparStatusCodes.EMAIL_ENTER_SUBJECT = 1112342;
AtparStatusCodes.EMAIL_ENTER_BODY = 1112343;
AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING = 1112344;
AtparStatusCodes.EMAIL_SMTP_PORT_MISSING = 1112349;
AtparStatusCodes.EMAIL_SEND_FAILED = 1112325;
AtparStatusCodes.ATPAR_HINTANOTMATCHED = 1112326;
AtparStatusCodes.ATPAR_E_PASSWORDUPDATIONFAILED = 1112327;
AtparStatusCodes.ATPAR_E_ROLEALREADYASSIGNED = 1112328;
AtparStatusCodes.ATPAR_E_NOPRINTADDRESS = 1112329;
AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION = 1112330;
AtparStatusCodes.ATPAR_E_PROFILEEXIST = 1112331;
AtparStatusCodes.ATPAR_S_IUT_BUNIT_NOTALLOC = 1112332;
AtparStatusCodes.ATPAR_E_CUSTOMSTR = 1111111;
AtparStatusCodes.ATPAR_E_NOTBLFOUND = 1112338;
AtparStatusCodes.ATPAR_E_NOPRODUCTS_FOR_PROFILE = 1112339;
AtparStatusCodes.ATPAR_E_PROFILE_NOT_EXIST = 1112341;
AtparStatusCodes.ATPAR_E_ORG_NOT_EXIST = 1112345;
AtparStatusCodes.ATPAR_E_IUT_LOCKEDBYOTHERUSER = 1112333;
AtparStatusCodes.AUTHENTICATE_AGAINST_LDAP = 1112334;
AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS = 1112335;
AtparStatusCodes.ATPAR_BUNIT_NOTALLOC = 1112336;
AtparStatusCodes.ATPAR_E_TRANSNO_NOTSET = 1112337;
AtparStatusCodes.ATPAR_E_NO_ERP_USER_ID = 1112346;
AtparStatusCodes.ATPAR_E_VENDORALREADYEXISTS = 1112347;
AtparStatusCodes.ATPAR_E_LOCGRPIDALREADYEXISTS = 1112348;
AtparStatusCodes.ATPAR_E_COSTCENTEREXISTS = 1112351;
AtparStatusCodes.ATPAR_E_NOTVALIDPRINTER = 1112352;
AtparStatusCodes.RECV_E_LOCKEDBYOTHERUSER = 1142300;
AtparStatusCodes.RECV_S_VENDORNOTEXISTS = 1142301;
AtparStatusCodes.RECV_S_UNRELEASEDRECEIVER = 1142302;
AtparStatusCodes.RECV_S_RECEIPTNOTRECEIVED = 1142303;
AtparStatusCodes.RECV_S_RECEIPTNOTFOUND = 1142304;
AtparStatusCodes.RECV_S_RECEIPTALREADYUPDATED = 1142330;
AtparStatusCodes.RECV_S_MULTIPLERECEIVERSEXISTS = 1142331;
AtparStatusCodes.RECV_S_INVALIDPOID = 1142333;
AtparStatusCodes.RECV_DROP_SHIP_PO = 1142334;
AtparStatusCodes.RECV_S_PODRAFT = 1142327;
AtparStatusCodes.RECV_E_INVALIDERPUSERID = 1142329;
AtparStatusCodes.RECV_S_PONOOPENLINES = 1142310;
AtparStatusCodes.RECV_ERP_EMPLOYEEID = 1142411;
AtparStatusCodes.CYCT_S_NOEVENTALLOCATED = 1230617;
AtparStatusCodes.S_EVENT_COMPLETE = 1230634;
AtparStatusCodes.S_EVENT_PROCESSED = 1230633;
AtparStatusCodes.S_EVENT_SENT = 1230635;
AtparStatusCodes.S_EVENT_PROCESSED_INERP = 1230627;
AtparStatusCodes.S_CYCT_SPLIT_EVNT_CANNOT_DL_PARENT = 1230628;
AtparStatusCodes.S_CYCT_EVENT_CANCELED = 1230629;
AtparStatusCodes.S_CYCT_EVENT_DEADLOCK = 1230630;
AtparStatusCodes.S_CYCT_EVENT_ORPHAN = 1230640;
AtparStatusCodes.S_CYCT_RECOUNTS_EXIST = 1230641;
AtparStatusCodes.S_CYCT_RECOUNT_USER = 1230642;
AtparStatusCodes.S_CYCT_RECOUNTEXISTS = 1230643;
AtparStatusCodes.CRCT_S_NOACCESSTOCART = 1122300;
AtparStatusCodes.CRCT_E_COUNTEXISTS = 1122301;
AtparStatusCodes.CRCT_E_INVALIDREQUESTERID = 1122302;
AtparStatusCodes.CRCT_S_RELEASEFAILED = 1122303;
AtparStatusCodes.CRCT_S_ERRITEMEXIST = 1122304;
AtparStatusCodes.CRCT_S_COUNTNOTLATEST = 1122305;
AtparStatusCodes.CRCT_E_ITEMDONOTEXIST = 1122306;
AtparStatusCodes.CRCT_S_CANNOTINACTIVATE = 1122307;
AtparStatusCodes.CRCT_E_ITEMINACTIVATED = 1122308;
AtparStatusCodes.CRCT_S_BINSEQCHANGED = 1122309;
AtparStatusCodes.CRCT_E_CARTDOESNOTEXIST = 1122310;
AtparStatusCodes.CRCT_S_CANNOTACTIVATE = 1122311;
AtparStatusCodes.CRCT_S_CARTNOTALLOCATED = 1122330;
AtparStatusCodes.CRCT_E_INVALIDCOUNT = 1122331;
AtparStatusCodes.CRCT_E_ERRORCOUNTEXISTS = 1220632;
AtparStatusCodes.CRCT_E_ERPCOMPCREATION = 1102005;
AtparStatusCodes.CRCT_MANDATORYCOUNTSMISSING = 1220634;
AtparStatusCodes.CRCT_E_ORDERNOTGENERATED = 1220635;
AtparStatusCodes.PKPL_E_LOCKEDBYOTHERUSER = 1152300;
AtparStatusCodes.PKPL_E_NOLOCATIONALLOCATED = 1152301;
AtparStatusCodes.S_PKPL_ALLOCATEBUNIT = 1250642;
AtparStatusCodes.DELV_E_NOTALLOWEDTOALLOCATELOCATION = 1162300;
AtparStatusCodes.DELV_E_LOCATIONNOTALLOCATED = 1162301;
AtparStatusCodes.DELV_E_HANDOVERNOTALLOWED = 1162302;
AtparStatusCodes.DELV_E_BUNITNOTALLOCATED = 1162303;
AtparStatusCodes.DELV_E_ERRORATPAROK = 1162304;
AtparStatusCodes.DELV_E_LOCPONOTFOUND = 1162305;
AtparStatusCodes.DELV_E_PONONPONOTFOUND = 1162306;
AtparStatusCodes.DELV_E_NONPONOTFOUND = 1162307;
AtparStatusCodes.DELV_E_NOPODATA_FROM_ERP = 1162308;
AtparStatusCodes.DELV_SHOWALLTRKLOCS = 1162309;
AtparStatusCodes.DELV_E_NOTALLOWED_TO_ERP = 1162316;
AtparStatusCodes.DELV_E_PONOTFOUND = 1162315;
AtparStatusCodes.DELV_E_LOCKEDBYOTHERUSER = 1162317;
AtparStatusCodes.DELV_E_MULTIREDELIVERLINES = 1162324;
AtparStatusCodes.RECV_S_TRACKINGALREADYEXISTS = 1142340;
AtparStatusCodes.RECV_S_CANCEL_TRACKINGALREADYEXISTS = 1142341;
AtparStatusCodes.S_ALLOCATEBUNIT = 1260645;
AtparStatusCodes.S_ALLOCATELOCREQUIRED = 1250637;
AtparStatusCodes.PTWY_E_LOCKEDBYOTHERUSER = 1172300;
AtparStatusCodes.TKIT_E_LOCALREADYEXISTS = 1192300;
AtparStatusCodes.TKIT_E_EQTYPEALREADYEXISTS = 1192400;
AtparStatusCodes.TKIT_E_DEPTALREADYEXISTS = 1192401;
AtparStatusCodes.TKIT_E_USERIDALREADYEXISTS = 1192500;
AtparStatusCodes.TKIT_E_INACTIVEREQUESTOR = 1192600;
AtparStatusCodes.TKIT_E_ITEMEXISTS = 1192700;
AtparStatusCodes.TKIT_E_ITEMNOTALLOWED = 1192800;
AtparStatusCodes.TKIT_E_INVALIDTRANS = 1192900;
AtparStatusCodes.TKIT_E_QTYEXCEEDS = 1193000;
AtparStatusCodes.TKIT_E_SERIALEXISTS = 1193001;
AtparStatusCodes.TKIT_E_SERIALNOTEXISTS = 1193002;
AtparStatusCodes.TKIT_E_SERIALNOTAVAILABLE = 1193003;
AtparStatusCodes.TKIT_E_ITEMNOTAVAILABLE = 1193004;
AtparStatusCodes.TKIT_E_ERRORATPAROK = 1193005;
AtparStatusCodes.TKIT_E_ITEMINACTIVATED = 1193006;
AtparStatusCodes.TKIT_E_SERIALINACTIVATED = 1193007;
AtparStatusCodes.TKIT_E_SERIALREQEXCEEDSSERVICEDT = 1193008;
AtparStatusCodes.TKIT_E_NOSUCHSERIALNO = 1193009;
AtparStatusCodes.TKIT_E_SERIALITEMCOMBDONOTEXIST = 1193010;
AtparStatusCodes.STIS_URL_NOT_FOUND = 11102300;
AtparStatusCodes.STIS_NO_RESPONSE = 11102301;
AtparStatusCodes.STIS_NOTIFICATION_ERROR = 11102302;
AtparStatusCodes.STIS_FAULT_ERROR = 11102303;
AtparStatusCodes.STIS_COMPONENT_NAME = 11102304;
AtparStatusCodes.STIS_INCORRECT_PWD = 11102305;
AtparStatusCodes.STIS_MISSING_LOGIN_INFO = 11102306;
AtparStatusCodes.ASMT_S_NOACCESSTOLOCATION = 11112300;
AtparStatusCodes.ASMT_S_NOLOCATIONFOUND = 11112301;
AtparStatusCodes.ATPAR_E_ITEMINVBUNIT_NOTEXIST = 1112343;
AtparStatusCodes.ATPAR_E_COSTCENTER_NOTEXIST = 1112342;
AtparStatusCodes.ATPAR_E_REMOTETIMEOUT = 111310;
AtparStatusCodes.ATPAR_E_MEDITECHMENUNOTMATCHED = 1102016;
AtparStatusCodes.ATPAR_S_MEDITECHINFOMSG = 12122302;
AtparStatusCodes.PAR_NO_ITEMEXISTS = 111700;
AtparStatusCodes.S_BIN_ALREADYEXISTS = 111701;
AtparStatusCodes.INV_E_ITEMDONOTEXIST = 1122322;
AtparStatusCodes.ITEM_E_INACITVE = 1122323;
AtparStatusCodes.ATPAR_E_FAILEDTOBIND = 1102017;
AtparStatusCodes.ATPAR_E_UPDATE_SUCCESS = 1102018;
AtparStatusCodes.ATPAR_E_DELETE_SUCCESS = 1102019;
AtparStatusCodes.ATPAR_E_ALREADY_EXISTS = 1102020;
AtparStatusCodes.ATPAR_E_ADDED_SUCCESS = 1102021;
AtparStatusCodes.ATPAR_E_SAVE_CANCEL = 1102022;
AtparStatusCodes.ATPAR_E_PLEASE_ENTER_MANDATORY = 1102023;
AtparStatusCodes.ATPAR_E_ONLY_CHARACTERS_NUMBERS = 1102024;
AtparStatusCodes.ATPAR_E_ONLY_NUMBERS = 1102025;
AtparStatusCodes.ATPAR_E_STARTPOSITION_VALIDTION = 1102026;
AtparStatusCodes.ATPAR_E_OUTPUTLENGTH_VALIDATION = 1102027;
AtparStatusCodes.ATPAR_E_INT_DATA_VALIDATION = 1102028;
AtparStatusCodes.ATPAR_E_SYSTEMMISMATCH = 1112350;
AtparStatusCodes.S_FOUNDIN_REFDB = 1122351;
AtparStatusCodes.S_FOUNDIN_ALLOCATEDCART = 1122352;
AtparStatusCodes.S_POGEN_FAILED = 1122353;
AtparStatusCodes.S_FAILEDTOCHARGE = 1122354;
AtparStatusCodes.S_FAILEDTOCREDITOLDPATIENT = 1122355;
AtparStatusCodes.S_FAILEDTOCREDITNEWPATIENT = 1122356;
AtparStatusCodes.ATPAR_S_CONFIGUREORGID = 1113017;
AtparStatusCodes.ATPAR_E_USERDOESNOTEXIST = 1002003;
AtparStatusCodes.ATPAR_E_NODEPT_FOR_USER = 1122358;
AtparStatusCodes.ATPAR_E_NOORGGRP_FOR_DEPT = 1122359;
AtparStatusCodes.ATPAR_E_WORKSTATION_NOT_EXIST = 1122357;
AtparStatusCodes.ATPAR_E_CARTNOTALLOCATED = 11223510;
AtparStatusCodes.ATPAR_E_WORKSTATIONNOTALLOCATEDTOCART = 11223511;
AtparStatusCodes.ATPAR_E_PHYSICIAN_NOTEXIST = 1122360;
AtparStatusCodes.S_WORKSTATION_EXIST = 1122369;
AtparStatusCodes.S_FOUNDIN_ATPAR_ITEMMASTER = 11156000;
AtparStatusCodes.S_FOUNDIN_ERP_ITEMMASTER = 11156001;
AtparStatusCodes.ATPAR_LDAP_PWD_NEVER_EXPIRES = 12122304;
AtparStatusCodes.ATPAR_LDAP_PWD_EXPIRED = 12122305;
AtparStatusCodes.ATPAR_LDAP_PWD_EXPIRE_WARNING_NOTSET = 12122306;
AtparStatusCodes.E_LDAP_EXPIRY_NOTIFICATION_FAILED = 12122307;
AtparStatusCodes.NO_LABEL_BARCODE_DATA_INDICATOR = "NA";
AtparStatusCodes.E_PRINTERROR = 1202005;
AtparStatusCodes.E_NOPRINTADDRESS = 1202006;
AtparStatusCodes.E_HOMEDEPARTMENT = 122015;
AtparStatusCodes.S_CANCELED = 122016;
AtparStatusCodes.S_PREFREPLACED = 122018;
AtparStatusCodes.S_REMOVED = 122019;
AtparStatusCodes.E_SOURCELOCATIONEXIST = 122020;
AtparStatusCodes.RX_E_LOCKEDBYOTHERUSER = 11156010;
AtparStatusCodes.ATPAR_E_PASSWORDMINLENGTH = 1112356;
AtparStatusCodes.ATPAR_E_PASSWORDMAXLENGTH = 1112357;
exports.AtparStatusCodes = AtparStatusCodes;
(function (AtparStatusCodes) {
    var RequestorType;
    (function (RequestorType) {
        RequestorType[RequestorType["WEB"] = 0] = "WEB";
        RequestorType[RequestorType["MOBILE"] = 1] = "MOBILE";
    })(RequestorType = AtparStatusCodes.RequestorType || (AtparStatusCodes.RequestorType = {}));
})(AtparStatusCodes = exports.AtparStatusCodes || (exports.AtparStatusCodes = {}));
exports.AtparStatusCodes = AtparStatusCodes;
(function (AtparStatusCodes) {
    var DisplayType;
    (function (DisplayType) {
        DisplayType[DisplayType["ALL"] = 0] = "ALL";
        DisplayType[DisplayType["ALLOCATED"] = 1] = "ALLOCATED";
        DisplayType[DisplayType["UNALLOCATED"] = 2] = "UNALLOCATED";
    })(DisplayType = AtparStatusCodes.DisplayType || (AtparStatusCodes.DisplayType = {}));
})(AtparStatusCodes = exports.AtparStatusCodes || (exports.AtparStatusCodes = {}));
exports.AtparStatusCodes = AtparStatusCodes;
(function (AtparStatusCodes) {
    var DBType;
    (function (DBType) {
        DBType[DBType["SQLSERVER"] = 0] = "SQLSERVER";
        DBType[DBType["ORACLE"] = 1] = "ORACLE";
        DBType[DBType["DB2DB"] = 2] = "DB2DB";
        DBType[DBType["INFORMIX"] = 3] = "INFORMIX";
    })(DBType = AtparStatusCodes.DBType || (AtparStatusCodes.DBType = {}));
})(AtparStatusCodes = exports.AtparStatusCodes || (exports.AtparStatusCodes = {}));
exports.AtparStatusCodes = AtparStatusCodes;
(function (AtparStatusCodes) {
    var LoginType;
    (function (LoginType) {
        LoginType[LoginType["WEB"] = 0] = "WEB";
        LoginType[LoginType["HHT"] = 1] = "HHT";
        LoginType[LoginType["Win32"] = 2] = "Win32";
    })(LoginType = AtparStatusCodes.LoginType || (AtparStatusCodes.LoginType = {}));
})(AtparStatusCodes = exports.AtparStatusCodes || (exports.AtparStatusCodes = {}));
exports.AtparStatusCodes = AtparStatusCodes;
//# sourceMappingURL=AtParStatusCodes.js.map