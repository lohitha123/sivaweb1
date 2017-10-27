export class MT_STIS_DETAILS {
    public TRANSACTION_ID: number;
    public ITEM_ID: string;
    public LINE_NBR: number;
    public STORAGE_LOCATION: string;
    public QTY?: number;
    public UOM: string;
    public PRICE?: number;
    public ISSUE_DATE?: Date;
    public ACTUAL_ISSUED_UOM: string;
    public ACTUAL_ISSUED_QTY?: number;
    public ADJUST_TYPE: string;
    public ADJUST_QTY: string;
    public LOT_ID: string;
    public SERIAL_ID: string;
    public EXPIRY_DATE?: Date;
    public ITEM_DESC: string;
}