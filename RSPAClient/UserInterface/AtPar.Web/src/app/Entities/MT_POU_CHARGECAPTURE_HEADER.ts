export class MT_POU_CHARGECAPTURE_HEADER {
    public TRANSACTION_ID: number;
    public PATIENT_ID: string;
    public CAPTURE_DATE_TIME:  Date;
    public USER_ID: string;
    public ACCOUNT_ID: string;
    public EXAM_ID: string;
    public COMMENTS: string;
    public REVIEWED: boolean;
    public DEPARTMENT_ID: string;
    public WORKSTATION_ID: string;
    public MM_LAST_STATUS_DATE?: Date;
    public MM_STATUS: string;
    public CHARGE_LAST_STATUS_DATE?: Date;
    public CHARGE_STATUS: string;
    public REVIEW_USER_ID: string;
    public REVIEW_DATE?: Date;
    public PHYSICIAN_ID: string;
    public REASON_CODE: string;
    public OTHER_DEPTID: string;
    public BED_NO: string;
    public TRANSACTION_TYPE?: number;
    public CASE_ID: string;
    public PREF_LIST_ID: string;
    public APP_ID?: number;
    public CRASH_CART_ID: string;
}