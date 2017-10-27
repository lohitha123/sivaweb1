export class MT_CYCT_EVENT_HDR {
    public BUSINESS_UNIT: string;
    public EVENT_ID: string;
    public USER_ID: string;
    public UPDATE_DATE?: Date;
    public TRANSACTION_ID: number;
    public COMPLETED_DATE?: Date;
    public PARENT_EVENT_ID: string;
    public EVENT_STATUS?: number;
    public UPDATE_USER_ID: string;
    public SEND_DATE_TIME?: Date;
    public EVENT_TYPE: number;
}