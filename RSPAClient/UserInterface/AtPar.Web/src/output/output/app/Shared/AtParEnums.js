"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenEntry_Enum;
(function (TokenEntry_Enum) {
    TokenEntry_Enum[TokenEntry_Enum["UserID"] = 0] = "UserID";
    TokenEntry_Enum[TokenEntry_Enum["AccessToken"] = 1] = "AccessToken";
    TokenEntry_Enum[TokenEntry_Enum["DeviceID"] = 2] = "DeviceID";
    TokenEntry_Enum[TokenEntry_Enum["DateTime"] = 3] = "DateTime";
    TokenEntry_Enum[TokenEntry_Enum["ProfileID"] = 4] = "ProfileID";
    TokenEntry_Enum[TokenEntry_Enum["OrgGrpID"] = 5] = "OrgGrpID";
    TokenEntry_Enum[TokenEntry_Enum["LdapUser"] = 6] = "LdapUser";
    TokenEntry_Enum[TokenEntry_Enum["ClientType"] = 7] = "ClientType";
    TokenEntry_Enum[TokenEntry_Enum["SystemId"] = 8] = "SystemId";
    TokenEntry_Enum[TokenEntry_Enum["DeptID"] = 9] = "DeptID";
    TokenEntry_Enum[TokenEntry_Enum["RecordsPerPage"] = 10] = "RecordsPerPage";
    TokenEntry_Enum[TokenEntry_Enum["IdleTime"] = 11] = "IdleTime";
    TokenEntry_Enum[TokenEntry_Enum["AppName"] = 12] = "AppName";
})(TokenEntry_Enum = exports.TokenEntry_Enum || (exports.TokenEntry_Enum = {}));
var ClientType;
(function (ClientType) {
    ClientType[ClientType["WEB"] = 1] = "WEB";
    ClientType[ClientType["HHT"] = 2] = "HHT";
    ClientType[ClientType["WIN32"] = 3] = "WIN32";
    ClientType[ClientType["WINSERVICE"] = 4] = "WINSERVICE";
    ClientType[ClientType["AHHT"] = 5] = "AHHT";
    ClientType[ClientType["IHHT"] = 6] = "IHHT";
    ClientType[ClientType["WHHT"] = 7] = "WHHT";
})(ClientType = exports.ClientType || (exports.ClientType = {}));
var Shiping_Label_PrinterType;
(function (Shiping_Label_PrinterType) {
    Shiping_Label_PrinterType[Shiping_Label_PrinterType["None"] = 1] = "None";
    Shiping_Label_PrinterType[Shiping_Label_PrinterType["HeaderLbl_MobilePrinter"] = 2] = "HeaderLbl_MobilePrinter";
    Shiping_Label_PrinterType[Shiping_Label_PrinterType["DeliveryTic_StationaryPrinter"] = 3] = "DeliveryTic_StationaryPrinter";
    Shiping_Label_PrinterType[Shiping_Label_PrinterType["Both_MobilePrinter_StationaryPrinter"] = 4] = "Both_MobilePrinter_StationaryPrinter";
    Shiping_Label_PrinterType[Shiping_Label_PrinterType["User_Option"] = 5] = "User_Option";
})(Shiping_Label_PrinterType = exports.Shiping_Label_PrinterType || (exports.Shiping_Label_PrinterType = {}));
var ModeEnum;
(function (ModeEnum) {
    ModeEnum[ModeEnum["Add"] = 0] = "Add";
    ModeEnum[ModeEnum["Edit"] = 1] = "Edit";
    ModeEnum[ModeEnum["List"] = 2] = "List";
})(ModeEnum = exports.ModeEnum || (exports.ModeEnum = {}));
var StatusType;
(function (StatusType) {
    StatusType[StatusType["Error"] = 1] = "Error";
    StatusType[StatusType["Warn"] = 2] = "Warn";
    StatusType[StatusType["Custom"] = 3] = "Custom";
    StatusType[StatusType["Success"] = 4] = "Success";
})(StatusType = exports.StatusType || (exports.StatusType = {}));
var GrowlTitle;
(function (GrowlTitle) {
    GrowlTitle[GrowlTitle["Error"] = 1] = "Error";
    GrowlTitle[GrowlTitle["Warn"] = 2] = "Warn";
    GrowlTitle[GrowlTitle["Info"] = 3] = "Info";
    GrowlTitle[GrowlTitle["Success"] = 4] = "Success";
})(GrowlTitle = exports.GrowlTitle || (exports.GrowlTitle = {}));
var POU_Menus;
(function (POU_Menus) {
    POU_Menus[POU_Menus["Issue"] = 1] = "Issue";
    POU_Menus[POU_Menus["Returns"] = 2] = "Returns";
    POU_Menus[POU_Menus["Cyclecount"] = 3] = "Cyclecount";
    POU_Menus[POU_Menus["Putaway"] = 4] = "Putaway";
    POU_Menus[POU_Menus["CaseIssue"] = 5] = "CaseIssue";
    POU_Menus[POU_Menus["CasePick"] = 6] = "CasePick";
    POU_Menus[POU_Menus["RecordConsumption"] = 7] = "RecordConsumption";
    POU_Menus[POU_Menus["RecordConSearch"] = 8] = "RecordConSearch";
    POU_Menus[POU_Menus["Pick"] = 9] = "Pick";
})(POU_Menus = exports.POU_Menus || (exports.POU_Menus = {}));
var Pharmacy_Menus;
(function (Pharmacy_Menus) {
    Pharmacy_Menus[Pharmacy_Menus["Cyclecount"] = 1] = "Cyclecount";
    Pharmacy_Menus[Pharmacy_Menus["Issue"] = 2] = "Issue";
    Pharmacy_Menus[Pharmacy_Menus["Pick"] = 3] = "Pick";
    Pharmacy_Menus[Pharmacy_Menus["Deliver"] = 4] = "Deliver";
    Pharmacy_Menus[Pharmacy_Menus["Putaway"] = 5] = "Putaway";
    Pharmacy_Menus[Pharmacy_Menus["RxPick"] = 6] = "RxPick";
})(Pharmacy_Menus = exports.Pharmacy_Menus || (exports.Pharmacy_Menus = {}));
var CASE_EDITING_OPTIONS;
(function (CASE_EDITING_OPTIONS) {
    CASE_EDITING_OPTIONS[CASE_EDITING_OPTIONS["AddCase"] = 1] = "AddCase";
    CASE_EDITING_OPTIONS[CASE_EDITING_OPTIONS["ChangeStatus"] = 2] = "ChangeStatus";
    CASE_EDITING_OPTIONS[CASE_EDITING_OPTIONS["ReplaceCase"] = 3] = "ReplaceCase";
    CASE_EDITING_OPTIONS[CASE_EDITING_OPTIONS["ReplacePref"] = 4] = "ReplacePref";
})(CASE_EDITING_OPTIONS = exports.CASE_EDITING_OPTIONS || (exports.CASE_EDITING_OPTIONS = {}));
var EnumApps;
(function (EnumApps) {
    EnumApps[EnumApps["Auth"] = 0] = "Auth";
    EnumApps[EnumApps["Init"] = 1] = "Init";
    EnumApps[EnumApps["CartCount"] = 2] = "CartCount";
    EnumApps[EnumApps["CycleCount"] = 3] = "CycleCount";
    EnumApps[EnumApps["Receiving"] = 4] = "Receiving";
    EnumApps[EnumApps["PickPlan"] = 5] = "PickPlan";
    EnumApps[EnumApps["Deliver"] = 6] = "Deliver";
    EnumApps[EnumApps["PutAway"] = 7] = "PutAway";
    EnumApps[EnumApps["MAgent"] = 8] = "MAgent";
    EnumApps[EnumApps["TrackIT"] = 9] = "TrackIT";
    EnumApps[EnumApps["StockIssue"] = 10] = "StockIssue";
    EnumApps[EnumApps["AssetManagement"] = 11] = "AssetManagement";
    EnumApps[EnumApps["BinToBin"] = 12] = "BinToBin";
    EnumApps[EnumApps["Dummy1"] = 13] = "Dummy1";
    //change name to a valid app if required
    EnumApps[EnumApps["Dummy2"] = 14] = "Dummy2";
    //change name to a valid app if required
    EnumApps[EnumApps["PointOfUse"] = 15] = "PointOfUse";
    EnumApps[EnumApps["MasterSetup"] = 50] = "MasterSetup";
    EnumApps[EnumApps["Pharmacy"] = 20] = "Pharmacy";
    EnumApps[EnumApps["Reports"] = 100] = "Reports";
})(EnumApps = exports.EnumApps || (exports.EnumApps = {}));
var EnumGroups;
(function (EnumGroups) {
    EnumGroups[EnumGroups["Administration"] = 1] = "Administration";
    EnumGroups[EnumGroups["Warehouse"] = 2] = "Warehouse";
    EnumGroups[EnumGroups["Distribution"] = 3] = "Distribution";
    EnumGroups[EnumGroups["CaseCost360"] = 4] = "CaseCost360";
    EnumGroups[EnumGroups["ATPARX"] = 7] = "ATPARX";
    EnumGroups[EnumGroups["Reports"] = 8] = "Reports";
})(EnumGroups = exports.EnumGroups || (exports.EnumGroups = {}));
var BusinessType;
(function (BusinessType) {
    BusinessType[BusinessType["Inventory"] = 1] = "Inventory";
    BusinessType[BusinessType["Purchasing"] = 2] = "Purchasing";
    BusinessType[BusinessType["AllBunits"] = 3] = "AllBunits";
})(BusinessType = exports.BusinessType || (exports.BusinessType = {}));
var YesNo_Enum;
(function (YesNo_Enum) {
    YesNo_Enum[YesNo_Enum["Y"] = 0] = "Y";
    YesNo_Enum[YesNo_Enum["N"] = 1] = "N";
})(YesNo_Enum = exports.YesNo_Enum || (exports.YesNo_Enum = {}));
var Repleshment_Type;
(function (Repleshment_Type) {
    Repleshment_Type[Repleshment_Type["Stock"] = 1] = "Stock";
    Repleshment_Type[Repleshment_Type["Nonstock"] = 2] = "Nonstock";
    Repleshment_Type[Repleshment_Type["Stockless"] = 3] = "Stockless";
    Repleshment_Type[Repleshment_Type["Consignment"] = 4] = "Consignment";
})(Repleshment_Type = exports.Repleshment_Type || (exports.Repleshment_Type = {}));
var Enable_Lot_Serial_Tracking;
(function (Enable_Lot_Serial_Tracking) {
    Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking["None"] = 0] = "None";
    Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking["MMIS"] = 1] = "MMIS";
    Enable_Lot_Serial_Tracking[Enable_Lot_Serial_Tracking["AtPar"] = 2] = "AtPar";
})(Enable_Lot_Serial_Tracking = exports.Enable_Lot_Serial_Tracking || (exports.Enable_Lot_Serial_Tracking = {}));
var Enterprise_Enum;
(function (Enterprise_Enum) {
    Enterprise_Enum[Enterprise_Enum["Meditech_Magic"] = 0] = "Meditech_Magic";
    Enterprise_Enum[Enterprise_Enum["Meditech_CS"] = 1] = "Meditech_CS";
    Enterprise_Enum[Enterprise_Enum["Meditech_ASCII"] = 2] = "Meditech_ASCII";
    Enterprise_Enum[Enterprise_Enum["Meditech_XML"] = 3] = "Meditech_XML";
    Enterprise_Enum[Enterprise_Enum["Peoplesoft"] = 4] = "Peoplesoft";
    Enterprise_Enum[Enterprise_Enum["Lawson"] = 5] = "Lawson";
    Enterprise_Enum[Enterprise_Enum["Meditech_NUI"] = 6] = "Meditech_NUI";
    Enterprise_Enum[Enterprise_Enum["PMM"] = 7] = "PMM";
    Enterprise_Enum[Enterprise_Enum["Matkon"] = 8] = "Matkon";
    Enterprise_Enum[Enterprise_Enum["GEAC"] = 9] = "GEAC";
    Enterprise_Enum[Enterprise_Enum["Oracle"] = 10] = "Oracle";
    Enterprise_Enum[Enterprise_Enum["Medseries4"] = 11] = "Medseries4";
    Enterprise_Enum[Enterprise_Enum["SAP"] = 12] = "SAP";
    Enterprise_Enum[Enterprise_Enum["IMMS"] = 13] = "IMMS";
})(Enterprise_Enum = exports.Enterprise_Enum || (exports.Enterprise_Enum = {}));
var Send_Cart_Header_Enum;
(function (Send_Cart_Header_Enum) {
    Send_Cart_Header_Enum[Send_Cart_Header_Enum["TRANSACTION_ID"] = 0] = "TRANSACTION_ID";
    Send_Cart_Header_Enum[Send_Cart_Header_Enum["BUSINESS_UNIT"] = 1] = "BUSINESS_UNIT";
    Send_Cart_Header_Enum[Send_Cart_Header_Enum["CART_ID"] = 2] = "CART_ID";
    Send_Cart_Header_Enum[Send_Cart_Header_Enum["START_DATETIME"] = 3] = "START_DATETIME";
    Send_Cart_Header_Enum[Send_Cart_Header_Enum["END_DATETIME"] = 4] = "END_DATETIME";
    Send_Cart_Header_Enum[Send_Cart_Header_Enum["USER_ID"] = 5] = "USER_ID";
    Send_Cart_Header_Enum[Send_Cart_Header_Enum["TOTAL_RECORDS"] = 6] = "TOTAL_RECORDS";
    Send_Cart_Header_Enum[Send_Cart_Header_Enum["NO_OF_SCANS"] = 7] = "NO_OF_SCANS";
    Send_Cart_Header_Enum[Send_Cart_Header_Enum["NO_OF_ORDERED_ITEMS"] = 8] = "NO_OF_ORDERED_ITEMS";
    Send_Cart_Header_Enum[Send_Cart_Header_Enum["QUANTITY_OPTION"] = 9] = "QUANTITY_OPTION";
    Send_Cart_Header_Enum[Send_Cart_Header_Enum["CARTFLAG"] = 10] = "CARTFLAG";
    Send_Cart_Header_Enum[Send_Cart_Header_Enum["CMTS"] = 11] = "CMTS";
    Send_Cart_Header_Enum[Send_Cart_Header_Enum["ALLOCATED_USER"] = 12] = "ALLOCATED_USER";
    Send_Cart_Header_Enum[Send_Cart_Header_Enum["REQ_NO"] = 13] = "REQ_NO";
    Send_Cart_Header_Enum[Send_Cart_Header_Enum["CREATION_DT"] = 14] = "CREATION_DT";
})(Send_Cart_Header_Enum = exports.Send_Cart_Header_Enum || (exports.Send_Cart_Header_Enum = {}));
var Cart_QtyOption_Enum;
(function (Cart_QtyOption_Enum) {
    Cart_QtyOption_Enum[Cart_QtyOption_Enum["COUNT"] = 0] = "COUNT";
    Cart_QtyOption_Enum[Cart_QtyOption_Enum["REQUEST"] = 1] = "REQUEST";
    Cart_QtyOption_Enum[Cart_QtyOption_Enum["COUNT_QTY"] = 2] = "COUNT_QTY";
    Cart_QtyOption_Enum[Cart_QtyOption_Enum["REQUEST_QTY"] = 3] = "REQUEST_QTY";
})(Cart_QtyOption_Enum = exports.Cart_QtyOption_Enum || (exports.Cart_QtyOption_Enum = {}));
var Cart_File_Type;
(function (Cart_File_Type) {
    Cart_File_Type[Cart_File_Type["STOCK"] = 0] = "STOCK";
    Cart_File_Type[Cart_File_Type["NONSTOCK"] = 1] = "NONSTOCK";
    Cart_File_Type[Cart_File_Type["STOCKLESS"] = 2] = "STOCKLESS";
    Cart_File_Type[Cart_File_Type["CONSIGN"] = 3] = "CONSIGN";
    Cart_File_Type[Cart_File_Type["STOCKTRANSFER"] = 4] = "STOCKTRANSFER";
    Cart_File_Type[Cart_File_Type["Charge_Capture"] = 5] = "Charge_Capture";
    Cart_File_Type[Cart_File_Type["COUNTS"] = 6] = "COUNTS";
})(Cart_File_Type = exports.Cart_File_Type || (exports.Cart_File_Type = {}));
var DataSet_Type;
(function (DataSet_Type) {
    DataSet_Type[DataSet_Type["HEADERS"] = 0] = "HEADERS";
    DataSet_Type[DataSet_Type["DETAILS"] = 1] = "DETAILS";
    DataSet_Type[DataSet_Type["SUBDETAILS"] = 2] = "SUBDETAILS";
    DataSet_Type[DataSet_Type["PREREQDATA"] = 3] = "PREREQDATA";
    DataSet_Type[DataSet_Type["OUTPUT"] = 4] = "OUTPUT";
    DataSet_Type[DataSet_Type["TRANSACTIONS"] = 5] = "TRANSACTIONS";
    DataSet_Type[DataSet_Type["BUSINESSUNITS"] = 6] = "BUSINESSUNITS";
    DataSet_Type[DataSet_Type["PREREQLISTVIEWPARAMS"] = 7] = "PREREQLISTVIEWPARAMS";
    DataSet_Type[DataSet_Type["USER"] = 8] = "USER";
    DataSet_Type[DataSet_Type["PROFILE"] = 9] = "PROFILE";
    DataSet_Type[DataSet_Type["ORG"] = 10] = "ORG";
    DataSet_Type[DataSet_Type["RECEIVERIDS"] = 11] = "RECEIVERIDS";
    DataSet_Type[DataSet_Type["LOCATIONS"] = 12] = "LOCATIONS";
    DataSet_Type[DataSet_Type["ALTERNATEUOMS"] = 13] = "ALTERNATEUOMS";
    DataSet_Type[DataSet_Type["ORDER_DETAILS"] = 14] = "ORDER_DETAILS";
    DataSet_Type[DataSet_Type["PODETAILS"] = 15] = "PODETAILS";
    DataSet_Type[DataSet_Type["NONPODETAILS"] = 16] = "NONPODETAILS";
    DataSet_Type[DataSet_Type["ORDER_PREFIX"] = 17] = "ORDER_PREFIX";
    DataSet_Type[DataSet_Type["LOCATION_BUSINESSUNIT"] = 18] = "LOCATION_BUSINESSUNIT";
    DataSet_Type[DataSet_Type["EXCLUDE_ORDERS"] = 19] = "EXCLUDE_ORDERS";
    DataSet_Type[DataSet_Type["ALTERNATELOCATIONS"] = 20] = "ALTERNATELOCATIONS";
    DataSet_Type[DataSet_Type["INVENTORY_BUSINESSUNITS"] = 21] = "INVENTORY_BUSINESSUNITS";
    DataSet_Type[DataSet_Type["SUBSTITUTEITEMS"] = 22] = "SUBSTITUTEITEMS";
    DataSet_Type[DataSet_Type["NEWDETAILS"] = 23] = "NEWDETAILS";
    DataSet_Type[DataSet_Type["CONFIGDETAILS"] = 24] = "CONFIGDETAILS";
    DataSet_Type[DataSet_Type["RECALLITEMS"] = 25] = "RECALLITEMS";
    DataSet_Type[DataSet_Type["STORAGE_LOCATION"] = 26] = "STORAGE_LOCATION";
    DataSet_Type[DataSet_Type["LOTSERIAL_INFO"] = 27] = "LOTSERIAL_INFO";
    DataSet_Type[DataSet_Type["AUTOPUTAWAY_DETAILS"] = 28] = "AUTOPUTAWAY_DETAILS";
    DataSet_Type[DataSet_Type["AUTOPUTAWAY_HEADER"] = 29] = "AUTOPUTAWAY_HEADER";
    DataSet_Type[DataSet_Type["NOTES_DETAILS"] = 30] = "NOTES_DETAILS";
    DataSet_Type[DataSet_Type["CASE_HEADER"] = 31] = "CASE_HEADER";
    DataSet_Type[DataSet_Type["CASE_DETAILS"] = 32] = "CASE_DETAILS";
})(DataSet_Type = exports.DataSet_Type || (exports.DataSet_Type = {}));
var Enum_UserData;
(function (Enum_UserData) {
    Enum_UserData[Enum_UserData["UserData"] = 0] = "UserData";
    Enum_UserData[Enum_UserData["ProfileJobRef"] = 1] = "ProfileJobRef";
    Enum_UserData[Enum_UserData["UserErrorData"] = 2] = "UserErrorData";
    Enum_UserData[Enum_UserData["UserErrorDataFields"] = 3] = "UserErrorDataFields";
    Enum_UserData[Enum_UserData["UserErrorDataHeaders"] = 4] = "UserErrorDataHeaders";
    Enum_UserData[Enum_UserData["SUMMARY"] = 5] = "SUMMARY";
})(Enum_UserData = exports.Enum_UserData || (exports.Enum_UserData = {}));
var Enum_ProfileData;
(function (Enum_ProfileData) {
    Enum_ProfileData[Enum_ProfileData["ProfileTemplateRef"] = 0] = "ProfileTemplateRef";
    Enum_ProfileData[Enum_ProfileData["ProfileParameters"] = 1] = "ProfileParameters";
    Enum_ProfileData[Enum_ProfileData["ProfileSetup"] = 2] = "ProfileSetup";
    Enum_ProfileData[Enum_ProfileData["ProfileMenus"] = 3] = "ProfileMenus";
    Enum_ProfileData[Enum_ProfileData["Screendisplay"] = 4] = "Screendisplay";
    Enum_ProfileData[Enum_ProfileData["ProfileTemplateRefErrorData"] = 5] = "ProfileTemplateRefErrorData";
    Enum_ProfileData[Enum_ProfileData["ProfileParametersErrorData"] = 6] = "ProfileParametersErrorData";
    Enum_ProfileData[Enum_ProfileData["ProfileMenusErrorData"] = 7] = "ProfileMenusErrorData";
    Enum_ProfileData[Enum_ProfileData["ProfileScreendisplayErrorData"] = 8] = "ProfileScreendisplayErrorData";
    Enum_ProfileData[Enum_ProfileData["ProfileMenusErrorDataFields"] = 9] = "ProfileMenusErrorDataFields";
    Enum_ProfileData[Enum_ProfileData["ProfileMenusErrorDataHeaders"] = 10] = "ProfileMenusErrorDataHeaders";
    Enum_ProfileData[Enum_ProfileData["ProfileParametersErrorDataFields"] = 11] = "ProfileParametersErrorDataFields";
    Enum_ProfileData[Enum_ProfileData["ProfileParametersErrorDataHeaders"] = 12] = "ProfileParametersErrorDataHeaders";
    Enum_ProfileData[Enum_ProfileData["ProfileScreendisplayErrorDataFields"] = 13] = "ProfileScreendisplayErrorDataFields";
    Enum_ProfileData[Enum_ProfileData["ProfileScreendisplayErrorDataHeaders"] = 14] = "ProfileScreendisplayErrorDataHeaders";
    Enum_ProfileData[Enum_ProfileData["ProfileTemplateRefErrorDataFields"] = 15] = "ProfileTemplateRefErrorDataFields";
    Enum_ProfileData[Enum_ProfileData["ProfileTemplateRefErrorDataHeaders"] = 16] = "ProfileTemplateRefErrorDataHeaders";
    Enum_ProfileData[Enum_ProfileData["SUMMARY"] = 17] = "SUMMARY";
})(Enum_ProfileData = exports.Enum_ProfileData || (exports.Enum_ProfileData = {}));
var Enum_OrgGroupData;
(function (Enum_OrgGroupData) {
    Enum_OrgGroupData[Enum_OrgGroupData["OrgGroupParams"] = 0] = "OrgGroupParams";
    Enum_OrgGroupData[Enum_OrgGroupData["OrgGroupBU"] = 1] = "OrgGroupBU";
    Enum_OrgGroupData[Enum_OrgGroupData["OrgGroupErrorData"] = 2] = "OrgGroupErrorData";
    Enum_OrgGroupData[Enum_OrgGroupData["OrgGroupErrorDataFields"] = 3] = "OrgGroupErrorDataFields";
    Enum_OrgGroupData[Enum_OrgGroupData["OrgGroupErrorDataHeaders"] = 4] = "OrgGroupErrorDataHeaders";
    Enum_OrgGroupData[Enum_OrgGroupData["SUMMARY"] = 5] = "SUMMARY";
})(Enum_OrgGroupData = exports.Enum_OrgGroupData || (exports.Enum_OrgGroupData = {}));
var Enum_Upload_Summary;
(function (Enum_Upload_Summary) {
    Enum_Upload_Summary[Enum_Upload_Summary["TOTAL_REC_CNT"] = 0] = "TOTAL_REC_CNT";
    Enum_Upload_Summary[Enum_Upload_Summary["SUCCESS_CNT"] = 1] = "SUCCESS_CNT";
    Enum_Upload_Summary[Enum_Upload_Summary["FAILURE_CNT"] = 2] = "FAILURE_CNT";
    Enum_Upload_Summary[Enum_Upload_Summary["ADDED_CNT"] = 3] = "ADDED_CNT";
    Enum_Upload_Summary[Enum_Upload_Summary["UPDATED_CNT"] = 4] = "UPDATED_CNT";
    Enum_Upload_Summary[Enum_Upload_Summary["WARNING_CNT"] = 5] = "WARNING_CNT";
})(Enum_Upload_Summary = exports.Enum_Upload_Summary || (exports.Enum_Upload_Summary = {}));
var AppParameters_Enum;
(function (AppParameters_Enum) {
    AppParameters_Enum[AppParameters_Enum["EXCLUDE_LOCATIONS"] = 0] = "EXCLUDE_LOCATIONS";
    AppParameters_Enum[AppParameters_Enum["UPDATE_COUNTDATE_WEB"] = 1] = "UPDATE_COUNTDATE_WEB";
    AppParameters_Enum[AppParameters_Enum["REVIEW_COUNTS"] = 2] = "REVIEW_COUNTS";
    AppParameters_Enum[AppParameters_Enum["PERFORM_MANUAL_COUNTS"] = 3] = "PERFORM_MANUAL_COUNTS";
    AppParameters_Enum[AppParameters_Enum["REVIEW_MANUAL_COUNTS"] = 4] = "REVIEW_MANUAL_COUNTS";
    AppParameters_Enum[AppParameters_Enum["EVENT_ALLOCATION"] = 5] = "EVENT_ALLOCATION";
})(AppParameters_Enum = exports.AppParameters_Enum || (exports.AppParameters_Enum = {}));
var ScheduleType_Enum;
(function (ScheduleType_Enum) {
    ScheduleType_Enum[ScheduleType_Enum["DAYS"] = 5] = "DAYS";
    ScheduleType_Enum[ScheduleType_Enum["INTERVALS"] = 10] = "INTERVALS";
})(ScheduleType_Enum = exports.ScheduleType_Enum || (exports.ScheduleType_Enum = {}));
var DayOfWeek_Enum;
(function (DayOfWeek_Enum) {
    DayOfWeek_Enum[DayOfWeek_Enum["MONDAY"] = 1] = "MONDAY";
    DayOfWeek_Enum[DayOfWeek_Enum["TUESDAY"] = 2] = "TUESDAY";
    DayOfWeek_Enum[DayOfWeek_Enum["WEDNESDAY"] = 3] = "WEDNESDAY";
    DayOfWeek_Enum[DayOfWeek_Enum["THURSDAY"] = 4] = "THURSDAY";
    DayOfWeek_Enum[DayOfWeek_Enum["FRIDAY"] = 5] = "FRIDAY";
    DayOfWeek_Enum[DayOfWeek_Enum["SATURDAY"] = 6] = "SATURDAY";
    DayOfWeek_Enum[DayOfWeek_Enum["SUNDAY"] = 7] = "SUNDAY";
})(DayOfWeek_Enum = exports.DayOfWeek_Enum || (exports.DayOfWeek_Enum = {}));
var Process_Type;
(function (Process_Type) {
    Process_Type[Process_Type["Replenishment"] = 0] = "Replenishment";
    Process_Type[Process_Type["Billing"] = 1] = "Billing";
    Process_Type[Process_Type["LowStock"] = 2] = "LowStock";
    Process_Type[Process_Type["Expiration"] = 3] = "Expiration";
    Process_Type[Process_Type["Recall"] = 4] = "Recall";
    Process_Type[Process_Type["BillOnly"] = 5] = "BillOnly";
    Process_Type[Process_Type["Alert"] = 6] = "Alert";
    Process_Type[Process_Type["Alerts"] = 7] = "Alerts";
})(Process_Type = exports.Process_Type || (exports.Process_Type = {}));
var Par_Locn_Type;
(function (Par_Locn_Type) {
    Par_Locn_Type[Par_Locn_Type["Inventory"] = 1] = "Inventory";
    Par_Locn_Type[Par_Locn_Type["ParLocation"] = 2] = "ParLocation";
    Par_Locn_Type[Par_Locn_Type["Pharmacy"] = 3] = "Pharmacy";
    Par_Locn_Type[Par_Locn_Type["ADC"] = 4] = "ADC";
    Par_Locn_Type[Par_Locn_Type["CrashCart"] = 5] = "CrashCart";
})(Par_Locn_Type = exports.Par_Locn_Type || (exports.Par_Locn_Type = {}));
var Send_CycleCount_Event_Enum;
(function (Send_CycleCount_Event_Enum) {
    Send_CycleCount_Event_Enum[Send_CycleCount_Event_Enum["BUSINESS_UNIT"] = 0] = "BUSINESS_UNIT";
    Send_CycleCount_Event_Enum[Send_CycleCount_Event_Enum["EVENT_ID"] = 1] = "EVENT_ID";
    Send_CycleCount_Event_Enum[Send_CycleCount_Event_Enum["FROM_STOR_LOC"] = 2] = "FROM_STOR_LOC";
    Send_CycleCount_Event_Enum[Send_CycleCount_Event_Enum["TO_STOR_LOC"] = 3] = "TO_STOR_LOC";
    Send_CycleCount_Event_Enum[Send_CycleCount_Event_Enum["NO_RECORDS"] = 4] = "NO_RECORDS";
    Send_CycleCount_Event_Enum[Send_CycleCount_Event_Enum["USER_ID"] = 5] = "USER_ID";
    Send_CycleCount_Event_Enum[Send_CycleCount_Event_Enum["ALLOCATION_STATUS"] = 6] = "ALLOCATION_STATUS";
    Send_CycleCount_Event_Enum[Send_CycleCount_Event_Enum["ACTUAL_ALLOCATION_STATUS"] = 7] = "ACTUAL_ALLOCATION_STATUS";
})(Send_CycleCount_Event_Enum = exports.Send_CycleCount_Event_Enum || (exports.Send_CycleCount_Event_Enum = {}));
var LocationType;
(function (LocationType) {
    LocationType[LocationType["A"] = 0] = "A";
    LocationType[LocationType["I"] = 1] = "I";
    LocationType[LocationType["P"] = 2] = "P";
})(LocationType = exports.LocationType || (exports.LocationType = {}));
var SENT_FROM;
(function (SENT_FROM) {
    SENT_FROM[SENT_FROM["SENT_FROM_WEB"] = 0] = "SENT_FROM_WEB";
    SENT_FROM[SENT_FROM["SENT_FROM_HHT"] = 1] = "SENT_FROM_HHT";
})(SENT_FROM = exports.SENT_FROM || (exports.SENT_FROM = {}));
var Perform_Action;
(function (Perform_Action) {
    Perform_Action[Perform_Action["NOCHANGE"] = 0] = "NOCHANGE";
    Perform_Action[Perform_Action["ADD"] = 1] = "ADD";
    Perform_Action[Perform_Action["DELETE"] = 2] = "DELETE";
})(Perform_Action = exports.Perform_Action || (exports.Perform_Action = {}));
var Case_Review_Type;
(function (Case_Review_Type) {
    Case_Review_Type[Case_Review_Type["PRE"] = 0] = "PRE";
    Case_Review_Type[Case_Review_Type["POST"] = 1] = "POST";
})(Case_Review_Type = exports.Case_Review_Type || (exports.Case_Review_Type = {}));
var CASE_PICK_STATUS;
(function (CASE_PICK_STATUS) {
    CASE_PICK_STATUS[CASE_PICK_STATUS["OPEN"] = 0] = "OPEN";
    CASE_PICK_STATUS[CASE_PICK_STATUS["READY"] = 1] = "READY";
    CASE_PICK_STATUS[CASE_PICK_STATUS["PARTIALLYPICKED"] = 3] = "PARTIALLYPICKED";
    CASE_PICK_STATUS[CASE_PICK_STATUS["PICKED"] = 5] = "PICKED";
    CASE_PICK_STATUS[CASE_PICK_STATUS["RETURNED"] = 7] = "RETURNED";
    CASE_PICK_STATUS[CASE_PICK_STATUS["REVIEWED"] = 9] = "REVIEWED";
    CASE_PICK_STATUS[CASE_PICK_STATUS["CLOSED"] = 10] = "CLOSED";
    CASE_PICK_STATUS[CASE_PICK_STATUS["REPLACED"] = 11] = "REPLACED";
    CASE_PICK_STATUS[CASE_PICK_STATUS["INACTIVE"] = 12] = "INACTIVE";
    CASE_PICK_STATUS[CASE_PICK_STATUS["CANCELLED"] = 13] = "CANCELLED";
    CASE_PICK_STATUS[CASE_PICK_STATUS["PENDING"] = 15] = "PENDING";
    CASE_PICK_STATUS[CASE_PICK_STATUS["PREF_REPLACED"] = 17] = "PREF_REPLACED";
    CASE_PICK_STATUS[CASE_PICK_STATUS["CASEISSUED"] = 25] = "CASEISSUED";
    CASE_PICK_STATUS[CASE_PICK_STATUS["REMOVE"] = 50] = "REMOVE";
})(CASE_PICK_STATUS = exports.CASE_PICK_STATUS || (exports.CASE_PICK_STATUS = {}));
var EventType;
(function (EventType) {
    EventType[EventType["Regular"] = 0] = "Regular";
    EventType[EventType["Manual"] = 1] = "Manual";
})(EventType = exports.EventType || (exports.EventType = {}));
var AppTransactionStatus;
(function (AppTransactionStatus) {
    AppTransactionStatus[AppTransactionStatus["Downloaded"] = 1] = "Downloaded";
    // Downloaded
    AppTransactionStatus[AppTransactionStatus["PutAway"] = 4] = "PutAway";
    AppTransactionStatus[AppTransactionStatus["Receive"] = 5] = "Receive";
    AppTransactionStatus[AppTransactionStatus["OrderOpen"] = 5] = "OrderOpen";
    // Order Status = Open
    AppTransactionStatus[AppTransactionStatus["Success"] = 2] = "Success";
    // Patient Charge captured success
    AppTransactionStatus[AppTransactionStatus["Charged"] = 3] = "Charged";
    // Patient Charge captured status from Client
    AppTransactionStatus[AppTransactionStatus["Sent"] = 11] = "Sent";
    // Status = sent
    AppTransactionStatus[AppTransactionStatus["Unlock"] = 12] = "Unlock";
    // Status = Unlock
    AppTransactionStatus[AppTransactionStatus["Cancel"] = 13] = "Cancel";
    // Status = Cancel/Delete
    AppTransactionStatus[AppTransactionStatus["RemoteSucess"] = 14] = "RemoteSucess";
    // Status = Remote method success
    AppTransactionStatus[AppTransactionStatus["Issued"] = 6] = "Issued";
    // Status = Issued in StockIssue app
    AppTransactionStatus[AppTransactionStatus["CartPutAwayDownload"] = 7] = "CartPutAwayDownload";
    AppTransactionStatus[AppTransactionStatus["Revised"] = 8] = "Revised";
    AppTransactionStatus[AppTransactionStatus["Error"] = 10] = "Error";
    // Status = Error
    AppTransactionStatus[AppTransactionStatus["EventCounting"] = 4] = "EventCounting";
    // Status = counting
    AppTransactionStatus[AppTransactionStatus["EventCountComplete"] = 7] = "EventCountComplete";
    // Status = completed
    AppTransactionStatus[AppTransactionStatus["Returned"] = 16] = "Returned";
    //Stock Issue Transaction Status.
    AppTransactionStatus[AppTransactionStatus["statCISuccess"] = 17] = "statCISuccess";
    AppTransactionStatus[AppTransactionStatus["statEIPSuccess"] = 18] = "statEIPSuccess";
    AppTransactionStatus[AppTransactionStatus["statOrdSent"] = 10] = "statOrdSent";
    // Order Status = Sent
    AppTransactionStatus[AppTransactionStatus["statOrdPartiallySent"] = 12] = "statOrdPartiallySent";
    // Order Status = Partially Sent
    AppTransactionStatus[AppTransactionStatus["statOrdRecv"] = 15] = "statOrdRecv";
    // Order Status = Received
    AppTransactionStatus[AppTransactionStatus["statOrdCancel"] = 20] = "statOrdCancel";
    // Order Status = Received
    // Detail Transaction Status  
    AppTransactionStatus[AppTransactionStatus["statPickup"] = 20] = "statPickup";
    // Status = Pickup  
    AppTransactionStatus[AppTransactionStatus["statLoad"] = 30] = "statLoad";
    // Status = Load  
    AppTransactionStatus[AppTransactionStatus["statUnload"] = 40] = "statUnload";
    // Status = Unload(DropOff)  
    AppTransactionStatus[AppTransactionStatus["statDelivery"] = 50] = "statDelivery";
    // Status = Delivery(DropAt)  
    AppTransactionStatus[AppTransactionStatus["statTake"] = 55] = "statTake";
    AppTransactionStatus[AppTransactionStatus["statReturn"] = 60] = "statReturn";
    AppTransactionStatus[AppTransactionStatus["statDetailReceive"] = 0] = "statDetailReceive";
    // Status = received in receiving app in detail transaction  
    AppTransactionStatus[AppTransactionStatus["statDetailOpen"] = -5] = "statDetailOpen";
    // Status = open in receiving app in detail transaction  
    AppTransactionStatus[AppTransactionStatus["CycleCount"] = 2] = "CycleCount";
    AppTransactionStatus[AppTransactionStatus["CaseIssued"] = 25] = "CaseIssued";
    AppTransactionStatus[AppTransactionStatus["CaseReturn"] = 26] = "CaseReturn";
    // Actual status sent from HHT will be 16 itself but we are using enum as 26 
    AppTransactionStatus[AppTransactionStatus["ReConIssue"] = 27] = "ReConIssue";
    //Added to display return and issue quantities separately in transaction history report
    // to differentiate from return and case return
    AppTransactionStatus[AppTransactionStatus["CasePick"] = 3] = "CasePick";
    AppTransactionStatus[AppTransactionStatus["Handover"] = 100] = "Handover";
    AppTransactionStatus[AppTransactionStatus["statDetailPick"] = 0] = "statDetailPick";
    AppTransactionStatus[AppTransactionStatus["PharmacyPreparation"] = 20] = "PharmacyPreparation";
    AppTransactionStatus[AppTransactionStatus["PharmacyVerification1"] = 25] = "PharmacyVerification1";
    AppTransactionStatus[AppTransactionStatus["PharmacyVerification2"] = 30] = "PharmacyVerification2";
    AppTransactionStatus[AppTransactionStatus["PharmacyStaged"] = 40] = "PharmacyStaged";
    AppTransactionStatus[AppTransactionStatus["PharmacyDeliver"] = 50] = "PharmacyDeliver";
    AppTransactionStatus[AppTransactionStatus["POUPick"] = 28] = "POUPick";
})(AppTransactionStatus = exports.AppTransactionStatus || (exports.AppTransactionStatus = {}));
var SendNonPOs_Hdr;
(function (SendNonPOs_Hdr) {
    SendNonPOs_Hdr[SendNonPOs_Hdr["TRANSACTION_ID"] = 0] = "TRANSACTION_ID";
    SendNonPOs_Hdr[SendNonPOs_Hdr["TRACKING_NBR"] = 1] = "TRACKING_NBR";
    SendNonPOs_Hdr[SendNonPOs_Hdr["LOCATION"] = 2] = "LOCATION";
    SendNonPOs_Hdr[SendNonPOs_Hdr["CARRIER_ID"] = 3] = "CARRIER_ID";
    SendNonPOs_Hdr[SendNonPOs_Hdr["DELIVER_TO"] = 4] = "DELIVER_TO";
    SendNonPOs_Hdr[SendNonPOs_Hdr["STATUS"] = 5] = "STATUS";
    SendNonPOs_Hdr[SendNonPOs_Hdr["USER_ID"] = 6] = "USER_ID";
    SendNonPOs_Hdr[SendNonPOs_Hdr["DESCR"] = 7] = "DESCR";
    SendNonPOs_Hdr[SendNonPOs_Hdr["VENDOR_NAME1"] = 8] = "VENDOR_NAME1";
    SendNonPOs_Hdr[SendNonPOs_Hdr["DEPT_ID"] = 9] = "DEPT_ID";
    SendNonPOs_Hdr[SendNonPOs_Hdr["PO_ID"] = 10] = "PO_ID";
    SendNonPOs_Hdr[SendNonPOs_Hdr["LINE_NBR"] = 11] = "LINE_NBR";
    SendNonPOs_Hdr[SendNonPOs_Hdr["SHIPTO_ID"] = 12] = "SHIPTO_ID";
    SendNonPOs_Hdr[SendNonPOs_Hdr["NON_PO_ITEM"] = 13] = "NON_PO_ITEM";
    SendNonPOs_Hdr[SendNonPOs_Hdr["TYPE_OF_PACKAGE"] = 14] = "TYPE_OF_PACKAGE";
    SendNonPOs_Hdr[SendNonPOs_Hdr["END_DT_TIME"] = 15] = "END_DT_TIME";
    SendNonPOs_Hdr[SendNonPOs_Hdr["START_DT_TIME"] = 16] = "START_DT_TIME";
    SendNonPOs_Hdr[SendNonPOs_Hdr["COMMENTS"] = 17] = "COMMENTS";
    SendNonPOs_Hdr[SendNonPOs_Hdr["LOCDESCR"] = 18] = "LOCDESCR";
    SendNonPOs_Hdr[SendNonPOs_Hdr["PO_DT"] = 19] = "PO_DT";
    SendNonPOs_Hdr[SendNonPOs_Hdr["VENDOR_ID"] = 20] = "VENDOR_ID";
    SendNonPOs_Hdr[SendNonPOs_Hdr["NOTES_COMMENTS"] = 21] = "NOTES_COMMENTS";
    SendNonPOs_Hdr[SendNonPOs_Hdr["NO_OF_PACKAGES"] = 22] = "NO_OF_PACKAGES";
})(SendNonPOs_Hdr = exports.SendNonPOs_Hdr || (exports.SendNonPOs_Hdr = {}));
var Send_Recv_Output_Enum;
(function (Send_Recv_Output_Enum) {
    Send_Recv_Output_Enum[Send_Recv_Output_Enum["TRANSACTION_ID"] = 0] = "TRANSACTION_ID";
})(Send_Recv_Output_Enum = exports.Send_Recv_Output_Enum || (exports.Send_Recv_Output_Enum = {}));
var MailPriority;
(function (MailPriority) {
    MailPriority[MailPriority["Normal"] = 0] = "Normal";
    MailPriority[MailPriority["Low"] = 1] = "Low";
    MailPriority[MailPriority["High"] = 2] = "High";
})(MailPriority = exports.MailPriority || (exports.MailPriority = {}));
var WF_ITEM_STATUS;
(function (WF_ITEM_STATUS) {
    WF_ITEM_STATUS[WF_ITEM_STATUS["ACTIVE"] = 0] = "ACTIVE";
    WF_ITEM_STATUS[WF_ITEM_STATUS["HOLD"] = 1] = "HOLD";
    WF_ITEM_STATUS[WF_ITEM_STATUS["CANCEL"] = 2] = "CANCEL";
    WF_ITEM_STATUS[WF_ITEM_STATUS["REVIEWED"] = 3] = "REVIEWED";
})(WF_ITEM_STATUS = exports.WF_ITEM_STATUS || (exports.WF_ITEM_STATUS = {}));
var SubMenuGroup;
(function (SubMenuGroup) {
    SubMenuGroup[SubMenuGroup["Setup"] = 0] = "Setup";
    SubMenuGroup[SubMenuGroup["Reports"] = 1] = "Reports";
    SubMenuGroup[SubMenuGroup["UserAdministration"] = 2] = "UserAdministration";
    SubMenuGroup[SubMenuGroup["AppSetup"] = 3] = "AppSetup";
    SubMenuGroup[SubMenuGroup["AppSecurity"] = 4] = "AppSecurity";
    SubMenuGroup[SubMenuGroup["Inventory"] = 5] = "Inventory";
})(SubMenuGroup = exports.SubMenuGroup || (exports.SubMenuGroup = {}));
var ElementType;
(function (ElementType) {
    ElementType[ElementType["FLOAT"] = 0] = "FLOAT";
    ElementType[ElementType["STRING"] = 1] = "STRING";
    ElementType[ElementType["DATE"] = 2] = "DATE";
    ElementType[ElementType["INT"] = 3] = "INT";
})(ElementType = exports.ElementType || (exports.ElementType = {}));
var Item_POU_Workflow_Review_Status;
(function (Item_POU_Workflow_Review_Status) {
    Item_POU_Workflow_Review_Status[Item_POU_Workflow_Review_Status["VENDOR_REVIEW_STATUS"] = 0] = "VENDOR_REVIEW_STATUS";
    Item_POU_Workflow_Review_Status[Item_POU_Workflow_Review_Status["DEPT_REVIEW_STATUS"] = 1] = "DEPT_REVIEW_STATUS";
    Item_POU_Workflow_Review_Status[Item_POU_Workflow_Review_Status["EXCEPTION_REVIEW_STATUS"] = 2] = "EXCEPTION_REVIEW_STATUS";
})(Item_POU_Workflow_Review_Status = exports.Item_POU_Workflow_Review_Status || (exports.Item_POU_Workflow_Review_Status = {}));
var Physicians_Basedn;
(function (Physicians_Basedn) {
    Physicians_Basedn[Physicians_Basedn["PROCEDURE"] = 0] = "PROCEDURE";
    Physicians_Basedn[Physicians_Basedn["PREFERENCELIST"] = 1] = "PREFERENCELIST";
})(Physicians_Basedn = exports.Physicians_Basedn || (exports.Physicians_Basedn = {}));
var enum_TKIT_OrderStatus;
(function (enum_TKIT_OrderStatus) {
    enum_TKIT_OrderStatus[enum_TKIT_OrderStatus["All"] = 0] = "All";
    enum_TKIT_OrderStatus[enum_TKIT_OrderStatus["Open"] = 1] = "Open";
    enum_TKIT_OrderStatus[enum_TKIT_OrderStatus["Pick"] = 2] = "Pick";
    enum_TKIT_OrderStatus[enum_TKIT_OrderStatus["Load"] = 3] = "Load";
    enum_TKIT_OrderStatus[enum_TKIT_OrderStatus["Unload"] = 4] = "Unload";
    enum_TKIT_OrderStatus[enum_TKIT_OrderStatus["Delivered"] = 5] = "Delivered";
    enum_TKIT_OrderStatus[enum_TKIT_OrderStatus["Cancelled"] = 6] = "Cancelled";
})(enum_TKIT_OrderStatus = exports.enum_TKIT_OrderStatus || (exports.enum_TKIT_OrderStatus = {}));
var enum_TKIT_EQP_TYPE;
(function (enum_TKIT_EQP_TYPE) {
    enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE["E"] = 0] = "E";
    enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE["F"] = 1] = "F";
    enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE["B"] = 2] = "B";
})(enum_TKIT_EQP_TYPE = exports.enum_TKIT_EQP_TYPE || (exports.enum_TKIT_EQP_TYPE = {}));
var enum_CHECKINOUT;
(function (enum_CHECKINOUT) {
    enum_CHECKINOUT[enum_CHECKINOUT["CIN"] = 0] = "CIN";
    enum_CHECKINOUT[enum_CHECKINOUT["COUT"] = 1] = "COUT";
})(enum_CHECKINOUT = exports.enum_CHECKINOUT || (exports.enum_CHECKINOUT = {}));
//# sourceMappingURL=AtParEnums.js.map