export enum TokenEntry_Enum {
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
    RecordsPerPage = 10
}
export enum ClientType {
    WEB = 1,
    HHT = 2,
    WIN32 = 3,
    WINSERVICE = 4,
    AHHT = 5,
    IHHT = 6,
    WHHT = 7
}
export enum Shiping_Label_PrinterType {
    None = 1,
    HeaderLbl_MobilePrinter = 2,
    DeliveryTic_StationaryPrinter = 3,
    Both_MobilePrinter_StationaryPrinter = 4,
    User_Option = 5
}
export enum ModeEnum {

    Add = 0,
    Edit = 1,
    List = 2
}

export enum StatusType {
    Error = 1,
    Warn = 2,
    Custom = 3,
    Success = 4
}
export enum POU_Menus {
    Issue = 1,
    Returns = 2,
    Cyclecount = 3,
    Putaway = 4,
    CaseIssue = 5,
    CasePick = 6,
    RecordConsumption = 7,
    RecordConSearch = 8,
    Pick = 9
}
export enum Pharmacy_Menus {
    Cyclecount = 1,
    Issue = 2,
    Pick = 3,
    Deliver = 4,
    Putaway = 5,
    RxPick = 6
}
export enum CASE_EDITING_OPTIONS {
    AddCase = 1,
    ChangeStatus = 2,
    ReplaceCase = 3,
    ReplacePref = 4
}
export enum EnumApps {

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
    Pharmacy = 20
}
export enum BusinessType {
    Inventory = 1,
    Purchasing = 2,
    AllBunits = 3
}

export enum YesNo_Enum {
    Y = 0,
    N = 1
}

export enum Repleshment_Type {
    Stock = 1,
    Nonstock = 2,
    Stockless = 3,
    Consignment = 4

}

export enum Enable_Lot_Serial_Tracking {
    None,
    MMIS,
    AtPar
}

export enum Enterprise_Enum {
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

export enum Send_Cart_Header_Enum {
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
    CREATION_DT = 14
}

export enum Cart_QtyOption_Enum {
    COUNT,
    REQUEST,
    COUNT_QTY,
    REQUEST_QTY,
}

export enum Cart_File_Type {
    STOCK,
    NONSTOCK,
    STOCKLESS,
    CONSIGN,
    STOCKTRANSFER,
    Charge_Capture,
    COUNTS,
}
