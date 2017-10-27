
export class VM_MT_ATPAR_USER_ADD {
    public MODE: string;
    public USER_ID: string = '';
    public PASSHASH_REQUIRED: boolean = false;
    public PASSWORD: string='';
    public CPASSWORD: string='';
    public TOKEN_EXPIRY_PERIOD: number;
    public IDLE_TIME: number
    public FIRST_NAME: string='';
    public LAST_NAME: string='';
    public MIDDLE_INITIAL: string='';
    public EMAIL_ID: string='';
    public PHONE1: string='';
    public PHONE2: string='';
    public FAX: string='';
    public PAGER: string='';
    public ORG_GROUP_ID: string='';
    public PROFILE_ID: string='';
    public LDAP_USER: string='';
    public LDAP_ROLE: string='';
    public LDAP_ORG: string='';
    public TIME_RESTRICTIONS: string = '1-12:00,23:59;2-12:00,23:59;3-12:00,23:59;4-12:00,23:59;5-12:00,23:59;6-12:00,23:59;7-12:00,23:59;';
    public PASSWD_RESET_REQUIRED: string = 'N';
    public PWD_RESET_REQUIRED: boolean = false;
    public LAST_UPDATE_USER: string = '';
    public ACCOUNT_DISABLED: boolean = false;
    public USERDN: string='';
    public ENTERPRISE_SYSTEM: string;
    public STATUS_CODE: number;
}
