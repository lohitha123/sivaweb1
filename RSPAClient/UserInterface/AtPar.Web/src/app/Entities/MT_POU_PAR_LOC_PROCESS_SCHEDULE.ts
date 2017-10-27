export class MT_POU_PAR_LOC_PROCESS_SCHEDULE {
    public ORG_ID: string;
    public ID: string;
    public SCHEDULE_ID: string;
    public REVIEW_CHARGES: string;
    public LAST_UPDATE_DATE:  Date;
    public LAST_UPDATE_USER: string;
    public LAST_CLIENT_ADDRESS: string;
    public BILLING_OPTION?: number;
    public PROCESS_TYPE: number;
    public APP_ID?: number;
    public REPLENISH_FROM: any;
    public OLDREPLENISH_FROM: any;
    //public REPLENISH_FROM?: any;

    public CHK_VALUE: boolean = false;
    public DESCRIPTION: string;   
    public ROW_INDEX?: number;
    public SOURCELOCATIONS: string;
    public OLDSOURCELOCATIONS: string;
    public DEPT_NAME: string;

    public LOW_STK_SCHEDULE_ID: string;
    public EXP_SCHEDULE_ID: string;
    public RECALL_SCHEDULE_ID: string;
    public BILLONLY_SCHEDULE_ID: string;
    public INV_INTERFACE_ENABLE: string;
    public BILLING_ENABLE: string;
    public BlnReviewChargeValue: boolean = false;
    public blnBillScheduleId: boolean = true;
    public chkBillOption: boolean = true;
    public blnSplice: boolean = true;
}