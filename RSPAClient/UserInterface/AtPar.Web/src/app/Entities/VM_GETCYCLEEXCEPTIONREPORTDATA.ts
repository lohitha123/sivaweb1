export class VM_GETCYCLEEXCEPTIONREPORTDATA {
    public BUSINESS_UNIT: string
    public EVENT_ID: string
    public PARENT_EVENT_ID: string
    public ITEM_ID: string
    public LOCATION: string
    public ITEM_DESC: string
    public REPORT_DATA_15: string
    public SYS_QTY: any
    public COUNT_QTY; any
    public COUNT_DATE: Date
    public COUNT_DATE1: string
    public COUNT_PERCENT: string
    public SUB_ITEMS: VM_GETCYCLEEXCEPTIONREPORTDATA[] = [];
}