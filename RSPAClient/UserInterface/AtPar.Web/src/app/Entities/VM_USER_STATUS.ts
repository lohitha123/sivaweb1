export class VM_USER_STATUS {
    public USER_ID: string;
    public FIRST_NAME: string;
    public LAST_NAME: string;
    public ACCOUNT_DISABLED: any;
    public PROFILE_ID: string;
    public ORG_GROUP_ID: string;
    public CREATE_DATE: string;
    public EMAIL_ID: string;
    public PASSHASH_REQUIRED: boolean;
    public TOKEN_EXPIRY_PERIOD: number;
    public IDLE_TIME: number;
    public MIDDLE_INITIAL: string;
    public PHONE1: string;
    public PHONE2: string;
    public FAX: string;
    public LDAP_USER: string;
    public LDAP_ROLE: string;
    public LDAP_ORG: string;
    public REPORT_USER: boolean;   
    public USERDN: string;   
    public PAGER: string; 
    public isDisabled: boolean;
    public isHidden: boolean;
}