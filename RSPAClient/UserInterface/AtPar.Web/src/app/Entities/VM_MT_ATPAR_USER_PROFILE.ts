export class VM_MT_ATPAR_USER_PROFILE {
    public USER_ID: string;
    public PASSHASH: string;
    public FIRST_NAME: string;
    public LAST_NAME: string;
    public MIDDLE_INITIAL: string;
    public EMAIL_ID: string;
    public PHONE1: string;
    public PHONE2: string;
    public FAX: string;
    public PAGER: string;
    public LDAP_USER: string;
    public TOKEN_EXPIRY_PERIOD?: number;
    public LOGIN_ALLOWED: boolean;
    public PASSHASH_REQUIRED: boolean;
    public TIME_RESTRICTIONS: string;
    public ACCOUNT_DISABLED: boolean;
    public IDLE_TIME?: number;
    public PASSWD_RESET_REQUIRED: string;
    public REPORT_USER: boolean;
    public RECORDS_PER_PAGE?: number;
    public DEFAULT_REPORT_DURATION?: number;
    public IMAGE_PATH: string;
}