export class MT_RECV_DEVIATION_HEADER {
    public TRANSACTION_ID: number;
    public LINE_NO: number;
    public BUSINESS_UNIT: string;
    public PO_ID: string;
    public PO_LINE_NO?: number;
    public PO_SCHED_NO: number;
    public INV_ITEM_ID: string;
    public DESCRIPTION: string;
    public UNIT_OF_MEASURE: string;
    public QTY_PO?: number;
    public QTY?: number;
    public ASN_QTY?: number;
    public RECV_UOM: string;
    public RECV_CONVERSION_RATE?: number;
    public INVENTORY_ITEM: string;
    public DEVIATION_TYPE?: number;
    public VENDOR_ID: string;
    public CARRIER_ID: string;
    public CUSTOM_ITEM_NO: string;
    public DUE_DATE?: Date;
    public RECEIPT_DATE?: Date;
    public UPDATE_DATE?: Date;
    public REPORT_DATA_1: string;
    public REPORT_DATA_2: string;
    public REPORT_DATA_3: string;
    public REPORT_DATA_4: string;
    public REPORT_DATA_5: string;
    public LOCATION: string;
    public USER_ID: string;
}