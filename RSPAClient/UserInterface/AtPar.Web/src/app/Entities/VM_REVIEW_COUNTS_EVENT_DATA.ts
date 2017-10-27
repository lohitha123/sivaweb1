export class VM_REVIEW_COUNTS_EVENT_DATA {
    public INV_ITEM_ID: string
    public ITEM_REC_NUM: string
    public MFG_ITEM_ID: string
    public VEND_ITEM_ID: string
    public DESCRIPTION: string
    public STORAGE_AREA: string
    public STOR_LEVEL_1: string
    public STOR_LEVEL_2: string
    public STOR_LEVEL_3: string
    public STOR_LEVEL_4: string
    public UNIT_OF_MEASURE: string
    public ITEM_PRICE: number
    public CONTAINER_ID: string
    public STAGED_DATE: string //changed from nullable<datetime> to string
    public SERIAL_ID: string
    public INV_LOT_ID: string
    public COUNT_STATUS: string //new column
    public COUNT_QTY: number //changed from nullable<double> to string
    public SYS_QTY: number
    public INVENTORY_TAG_ID: string
    public GTIN: string //new column
    public UPC_ID: string
    public CUSTOM_ITEM_NO: string
    public LOCATION: string
    public MANUFACTURER: string;
    public PROJECT_ID: string
    public EVENT_ID: string
    public TRANSACTION_ID: number
    public BUSINESS_UNIT: string
    public STORLOC: string
    public COUNT_USER_ID: string
    public USERNAME: string
    public CUST_ITEM_NO: string
    public ITEM_MANUFACTURER_NAME: string
    public UPDATE_DATE: string
    public RECOUNT_FLAG: string
    public VALUEDIFF: number //need to check return type
    public REALVALUEDIFF: number;
    public RECOUNT_USER_ID: string;
    public ACTUAL_RECOUNT_FLAG: string;
    public ACTUAL_COUNT_QTY: number;
    public RECNT_CHECK: String//NEW COLUMN;
    public RECOUNT_USER_NAME: string;
    public REPORT_FIELD_1: string;
    public REPORT_FIELD_2: string;
    public REPORT_FIELD_3: string;
    public REPORT_FIELD_4: string;
    public PACKAGING_STRING: string;
    public COUNT_QTY1: number;
    public COUNT_QTY2: number;
    public UOM_TYPE: string;
    public STD_PACK_UOM: string
    public L_S_CONTROLLED: string;
    public CONSIGNED_FLAG: string;
    public LATEST_SYSQTY: number;
    public EVENT_TYPE: number;
    public CONVERSION_RATE: number;
    public LOT_CONTROLLED: string;
    public SERIAL_CONTROLLED: string;
    public RECOUNTCHECK_FLAG: boolean;
    public checkEnable: boolean;
    public Valdiffs: number;
    public Valdiffd: string;
    public Valdiffp: string;
    public CntDiff1: string;
    public rowClsStyle: string;
    //public string CUST_ITEM_NO  DUPLICATED IN THE PROCEDURE GetReviewCountsEventData NEED TO CHECK ONCE 




}