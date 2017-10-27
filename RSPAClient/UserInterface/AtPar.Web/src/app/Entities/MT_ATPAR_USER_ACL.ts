export class MT_ATPAR_USER_ACL {
    public USER_ID: string;
    public TOKEN_EXPIRY_PERIOD?: number;
    public LOGIN_ALLOWED: boolean;
    public PASSHASH_REQUIRED: boolean;
    public TIME_RESTRICTIONS: string;
    public ACCOUNT_DISABLED: boolean;
    public IDLE_TIME?: number;
    public INVALID_LOGIN_ATTEMPTS?: number;
    public PASSWD_RESET_REQUIRED: string;
    public PASSWD_UPDATE_DATE?: Date;
    public PASSWD_EXPT_DATE?: Date;
    public REPORT_USER: boolean;
    public RECORDS_PER_PAGE?: number;
    public DEFAULT_REPORT_DURATION?: number;
}