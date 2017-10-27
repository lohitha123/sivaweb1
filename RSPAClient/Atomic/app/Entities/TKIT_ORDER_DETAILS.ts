export class TKIT_ORDER_DETAILS {
    public ORG_GROUP_ID: string;
    public ORDER_NUMBER: number;
    public ORDER_LINE_NUMBER: number;
    public PATIENT_ID: string;
    public ITEM_ID: string;
    public ITEM_DESCR: string;
    public REQUEST_QTY?: number;
    public LOCATION_ID: string;
    public REQUEST_FOR_USE_DATE?: Date;
    public SHIP_DATE?: Date;
    public DELIVER_DATE?: Date;
    public DELIVER_QTY?: number;
    public DELIVER_ITEM_STATUS: string;
    public RETURN_QTY?: number;
    public RETURN_DATE?: Date;
    public RECIPIENT: string;
    public NEEDED_BY_DATE?: Date;
    public CANCEL_DATE?: Date;
    public PATIENT_LAST_NAME: string;
    public PROCEDURE_CODE: string;
    public ESTIMATED_RETURN_DATE?: Date;
}