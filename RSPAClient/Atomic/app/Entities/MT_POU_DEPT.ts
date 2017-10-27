export class MT_POU_DEPT {
    public ORG_GROUP_ID: string;
    public DEPT_ID: string;
    public DEPT_NAME: string;
    public ATTN_TO: string;
    public ADDRESS1: string;
    public ADDRESS2: string;
    public CITY: string;
    public STATE: string;
    public ZIP: string;
    public COUNTRY: string;
    public PHONE: string;
    public FAX: string;
    public E_MAIL: string;
    public STATUS?: boolean;
    public LAST_UPDATE_DATE?: Date;
    public LAST_UPDATE_USER: string;
    public LAST_CLIENT_ADDRESS: string;
    public EXCP_APPROVAL_REQ: string;
    public INV_COORD_EMAIL: string;
    public EXCP_APPROVER_EMAIL: string;
    public REMINDER_FREQ: number;
    public RECALL_NOTIFICATION_EMAIL: string;
    public INV_INTERFACE_ENABLE: string;
    public BILLING_ENABLE: string;
    public DEFAULT_PRINTER: string;
    public DEFAULT_DISTRIBUTION_TYPE: string;
    public DEFAULT_DESTINATION_LOCATION: string;
    public ALERT_NOTIFY_REQ: string;
    public EMAIL_NOTIFY: string;
    public CATEGORY_CODE: string;
    public BILLONLY_BUSINESS_UNIT: string;
    public BILLONLY_LOCATION: string;
    public NO_OF_CASES_DOWNLOAD: number;
    public SEND_LOWSTOCK_EMAIL_ALERTS: string;
    public EMAILID_FOR_LOWSTOCK_ALERTS: string;
    public SEND_PRODUCT_EXP_EMAIL_ALERTS: string;
    public EMAILID_FOR_PRODUCT_EXP_ALERTS: string;
    public DURATION_TRACKING_EXP?: number;
    public PERCENTAGE_OPTIMUM_QTY?: number;
    public PREPICK_QA_PROCESS_REQUIRED: boolean;
    public BUYER_ID: string;
    public AUTO_PUTAWAY_ENABLED: string;
    public ALLOW_LOC_SELECT: boolean;
    public STORAGE_AREA: string;
    public CASE_PICK_STATUS: number;
}