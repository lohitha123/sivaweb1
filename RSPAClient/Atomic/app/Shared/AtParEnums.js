"use strict";
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
})(EnumApps = exports.EnumApps || (exports.EnumApps = {}));
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
//# sourceMappingURL=atparenums.js.map