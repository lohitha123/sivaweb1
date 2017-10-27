using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class MT_ATPAR_USER_PROFILE_APP_ACL_ORG
    {
        public string USER_ID { get; set; }
        public string PASSHASH { get; set; }
        public string FIRST_NAME { get; set; }
        public string LAST_NAME { get; set; }
        public string MIDDLE_INITIAL { get; set; }
        public string EMAIL_ID { get; set; }
        public string PHONE1 { get; set; }
        public string PHONE2 { get; set; }
        public string FAX { get; set; }
        public string PAGER { get; set; }
        public string HINT_QUESTION { get; set; }
        public string HINT_ANSWER { get; set; }
        public string CREATE_USER_ID { get; set; }
        public Nullable<System.DateTime> CREATE_DATE { get; set; }
        public string PROFILE_ID { get; set; }
        public string LDAP_USER { get; set; }
        public string LDAP_ROLE { get; set; }
        public string LDAP_ORG { get; set; }
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }
        public string USERDN { get; set; }
        public Nullable<int> TOKEN_EXPIRY_PERIOD { get; set; }
        public bool LOGIN_ALLOWED { get; set; }
        public bool PASSHASH_REQUIRED { get; set; }
        public string TIME_RESTRICTIONS { get; set; }
        public bool ACCOUNT_DISABLED { get; set; }
        public Nullable<int> IDLE_TIME { get; set; }
        public Nullable<int> INVALID_LOGIN_ATTEMPTS { get; set; }
        public string PASSWD_RESET_REQUIRED { get; set; }
        public Nullable<System.DateTime> PASSWD_UPDATE_DATE { get; set; }
        public Nullable<System.DateTime> PASSWD_EXPT_DATE { get; set; }
        public bool REPORT_USER { get; set; }
        public Nullable<short> RECORDS_PER_PAGE { get; set; }
        public Nullable<short> DEFAULT_REPORT_DURATION { get; set; }
        public int APP_ID { get; set; }
        public string CLIENT_USER { get; set; }
        public string SERVER_USER { get; set; }
       
        public string ORG_GROUP_ID { get; set; }
        public long SERVER_STATUS_CODE { get; set; }
       
       
    }
}
