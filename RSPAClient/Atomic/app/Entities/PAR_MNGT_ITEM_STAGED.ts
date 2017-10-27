export class PAR_MNGT_ITEM_STAGED {
    public ORG_GROUP_ID: string;
    public ITEM_ID: string;
    public CUST_ITEM_ID: string;
    public SHORT_DESCR: string;
    public LONG_DESCR: string;
    public VENDOR_ID: string;
    public MANUFACTURER: string;
    public MFG_ITEM_ID: string;
    public VEND_ITEM_ID: string;
    public UNIT_OF_PROCUREMENT: string;
    public UNIT_OF_ISSUE: string;
    public CONV_FACTOR?: number;
    public ITEM_PRICE?: number;
    public UPC_CODE: string;
    public STATUS?: boolean;
    public SERIAL_CONTROLLED: string;
    public LOT_CONTROLLED: string;
    public CHARGE_CODE: string;
    public LATEX_FREE: boolean;
    public CUST_ITEM_DESCR: string;
    public ITEM_CATEGORY: string;
    public USER_FIELD_1: string;
    public USER_FIELD_2: string;
    public REPLENISHMENT_TYPE: string;
    public LAST_UPDATE_DATE:  Date;
    public LAST_UPDATE_USER: string;
    public LAST_CLIENT_ADDRESS: string;
    public LEAD_TIME?: number;
    public CATALOG_FLG: boolean;
    public PHARMACY_FLG: boolean;
    public SUBSTITUTE_ITEM_FLG: boolean;
    public STRENGTH: string;
    public DOSAGE: string;
    public EVERIFY_FLG: boolean;
    public CINDEX?: number;
    public GTIN: string;
    public IMPLANT_FLAG: string;
}