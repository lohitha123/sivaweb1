export class VM_TKIT_ORDER_DETAILS {
    public CHK_VALUE: any;
    public ORDER_NUMBER: number;
    public ORDER_LINE_NUMBER: number;
    public ORDER_DATE: string;// Date;
    public DELIVER_ITEM_STATUS: string;
    public ITEM_ID: string;
    public REQUEST_QTY?: number;
    public LOCATION_ID: string;
    public ESTIMATED_RETURN_DATE: any;//Date
    public ITEM_DESCR: string;
    public ORDER_COMMENTS: string;
    public IMAGE: string;
    public ITEM_TYPE_INDICATOR: string;
    public CHKDisable: boolean = false;
    public blnErDateTime: boolean = true;
}