export class PAR_MNGT_ORDER_HEADER {
    public ORDER_NO: number;
    public ORG_ID: string;
    public PAR_LOC_ID: string;
    public ORDER_DATE?: Date;
    public CREATE_USER: string;
    public VENDOR_ID: string;
    public ERP_ORDER_NO: string;
    public APP_ID?: number;
    public COMMENTS: string;
    public INVENTORYORDER_FLAG: string;
    public MRN: string;
    public DUE_DATE?: Date;
    public MEDICINE: string;
    public DOSAGE: string;
    public QTY?: number;
    public DELIVERY_LOCATION: string;
    public ORDERED_UOM: string;
}