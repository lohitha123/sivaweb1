export class MT_CYCT_EVENT_HDR_MASTER {
    public TRANSACTION_ID: string;
    public BUSINESS_UNIT: string;
    public EVENT_ID: string;
    public PARENT_EVENT_ID: string;
    public NO_OF_ITEMS?: number;
    public UPDATE_USER_ID: string;
    public UPDATE_DATE?: Date;
    public SORT_BY_FIELD?: number;
    public FROM: string;
    public TO: string;
}