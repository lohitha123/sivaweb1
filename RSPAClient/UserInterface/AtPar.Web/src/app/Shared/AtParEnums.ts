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
    RecordsPerPage = 10,
    IdleTime = 11,
    AppName = 12

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

export enum GrowlTitle {
    Error = 1,
    Warn = 2,
    Info = 3,
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
    Pharmacy = 20,
    Reports = 100
}

export enum EnumGroups {
    Administration = 1,
    Warehouse = 2,
    Distribution = 3,
    CaseCost360=4,
    ATPARX = 7,
    Reports=8
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


export enum DataSet_Type {
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

export enum Enum_UserData {
    UserData,
    ProfileJobRef,
    UserErrorData,
    UserErrorDataFields,
    UserErrorDataHeaders,
    SUMMARY
}

export enum Enum_ProfileData {
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

export enum Enum_OrgGroupData {
    OrgGroupParams,
    OrgGroupBU,
    OrgGroupErrorData,
    OrgGroupErrorDataFields,
    OrgGroupErrorDataHeaders,
    SUMMARY
}

export enum Enum_Upload_Summary {
    TOTAL_REC_CNT = 0,
    SUCCESS_CNT,
    FAILURE_CNT,
    ADDED_CNT,
    UPDATED_CNT,
    WARNING_CNT,
}


export enum AppParameters_Enum {
    EXCLUDE_LOCATIONS,
    UPDATE_COUNTDATE_WEB,
    REVIEW_COUNTS,
    PERFORM_MANUAL_COUNTS,
    REVIEW_MANUAL_COUNTS,
    EVENT_ALLOCATION
}

export enum ScheduleType_Enum {
    DAYS = 5,
    INTERVALS = 10
}

export enum DayOfWeek_Enum {
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
    SUNDAY = 7
}

export enum Process_Type {
    Replenishment = 0,
    Billing = 1,
    LowStock = 2,
    Expiration = 3,
    Recall = 4,
    BillOnly = 5,
    Alert = 6,
    Alerts = 7
}

export enum Par_Locn_Type {
    Inventory = 1,
    ParLocation = 2,
    Pharmacy = 3,
    ADC = 4,
    CrashCart = 5,
}

export enum Send_CycleCount_Event_Enum {
    BUSINESS_UNIT = 0,
    EVENT_ID = 1,
    FROM_STOR_LOC = 2,
    TO_STOR_LOC = 3,
    NO_RECORDS = 4,
    USER_ID = 5,
    ALLOCATION_STATUS = 6,
    ACTUAL_ALLOCATION_STATUS = 7
}


export enum LocationType {
    A,
    I,
    P
}
export enum SENT_FROM {
    SENT_FROM_WEB = 0,
    SENT_FROM_HHT = 1
}

export enum Perform_Action {
    NOCHANGE = 0,
    ADD = 1,
    DELETE = 2
}
export enum Case_Review_Type {
    PRE = 0,
    POST
}
export enum CASE_PICK_STATUS {
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
export enum EventType {
    Regular = 0,
    Manual = 1
}
export enum AppTransactionStatus {
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


export enum SendNonPOs_Hdr {
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
    NO_OF_PACKAGES = 22,
}

export enum Send_Recv_Output_Enum {
    TRANSACTION_ID
}

export enum MailPriority {
    Normal,
    Low,
    High
}

export enum WF_ITEM_STATUS {
    ACTIVE = 0,
    HOLD = 1,
    CANCEL = 2,
    REVIEWED = 3
}

export enum SubMenuGroup {
    Setup,
    Reports,
    UserAdministration,
    AppSetup,
    AppSecurity,
    Inventory
}
export enum ElementType {
    FLOAT,
    STRING,
    DATE,
    INT
}

export enum Item_POU_Workflow_Review_Status {
    VENDOR_REVIEW_STATUS,
    DEPT_REVIEW_STATUS,
    EXCEPTION_REVIEW_STATUS
}

export enum Physicians_Basedn {
    PROCEDURE = 0,
    PREFERENCELIST = 1
}

export enum enum_TKIT_OrderStatus {
    All,
    Open,
    Pick,
    Load,
    Unload,
    Delivered,
    Cancelled,
}

export enum enum_TKIT_EQP_TYPE {
    E=0,
    F=1,
    B=2
}
export enum enum_CHECKINOUT {
    CIN,
    COUT
}



