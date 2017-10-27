export class VM_POU_PHYSICIAN_USAGE_DETAILS {
    public PHYSICIAN_ID: string;
    public PHYSICIAN_NAME: string;
    public PREF_LIST_ID: string;
    public EXAM_ID: string;
    public CASE_ID: string;
    public ITEM_ID: string;
    public ITEM_DESCRIPTION: string;
    public UOM: string;
    public ITEM_COUNT: any;
    public USED_QTY: any;
    public WASTAGE_QTY: any;
    public ISSUE_UOM: string;
    public ISSUE_PRICE: number;
    public SUMUSED: any;
    public SUMRETURN: any;
    public SUMWASTAGE: any;
    public HeaderList: any = [];
    public HeaderColumnList: any = [];
    public DataList: any = [];
    public Details: any = [];
    public DetailsTotals: any = [];
    public PROCEDURE_CODE: string;
    public RETURNQTY: string;


}