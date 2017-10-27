using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_USER_STATUS
    {
        public string USER_ID { get; set; }
        public string FIRST_NAME { get; set; }
        public string LAST_NAME { get; set; }
        public Nullable<System.DateTime> CREATE_DATE { get; set; }
        public bool ACCOUNT_DISABLED { get; set; }
        public string PROFILE_ID { get; set; }
        public string ORG_GROUP_ID { get; set; }
        public string EMAIL_ID { get; set; }
        public bool PASSHASH_REQUIRED { get; set; }
        public Int32 TOKEN_EXPIRY_PERIOD { get; set; }
        public Int32 IDLE_TIME { get; set; }
        public string MIDDLE_INITIAL { get; set; }
        public string PHONE1 { get; set; }
        public string FAX { get; set; }
        public string LDAP_USER { get; set; }
        public string USERDN { get; set; }
        public string PHONE2 { get; set; }
        public string PAGER { get; set; }
        public bool REPORT_USER { get; set; }
        public string LDAP_ROLE { get; set; }
        public string LDAP_ORG { get; set; }
        public string PASSWD_RESET_REQUIRED { get; set; }
    }
}
