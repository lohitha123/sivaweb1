export class MT_PKPL_DEVIATION_HEADER {
    public BUSINESS_UNIT: string;
    public ORDER_NO: string;
    public ORDER_LINE_NO: number;
    public PICK_BATCH_ID: string;
    public PICK_LIST_LINE_NO?: number;
    public QTY_REQUESTED?: number;
    public QTY_ALLOCATED?: number;
    public QTY?: number;
    public TRANSACTION_ID: number;
    public LOCATION: string;
    public INV_ITEM_ID: string;
    public DEPT_ID: string;
    public PICK_DATE?: Date;
    public UPDATE_DATE?: Date;
    public USER_ID: string;
    public ALLOC_UOM: string;
    public PICK_UOM: string;
    public CONVERSION_FACTOR?: number;
    public REPORT_DATA_1: string;
    public REPORT_DATA_2: string;
    public REPORT_DATA_3: string;
    public STD_UOM: string;
    public QTY_ORDER?: number;
    public ORDER_UOM: string;
    public LINE_NO: number;
    public SCHED_LINE_NO?: number;
    public DEMAND_LINE_NO?: number;
    public SEQ_NBR?: number;
}