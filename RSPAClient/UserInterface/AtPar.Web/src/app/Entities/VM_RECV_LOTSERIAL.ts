export class VM_RECV_LOTSERIAL {
    public TRANSACTION_ID: string;
    public ITEM_ID: string;
    public LINE_NBR: string;
    public SCHED_NBR: string;
    public SERIAL_ID: string;
    public LOT_ID: string;
    public QTY: string = "";
    public EXPIRY_DATE: string = "";// Date = new Date();
    public UOM: string;
    public CONVERSION_RATE: string;
    public DELETE_FLAG: string;
    public DDLUOMS: any;
    public SELECTED_UOM: any;
    public ROWINDEX: number = 0;
    public LOTSERIALSCHDFLG: boolean = false;
}