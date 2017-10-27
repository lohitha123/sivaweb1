using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_MT_ATPAR_USER_ADD
    {
        public string MODE { get; set; }
        public string USER_ID { get; set; }
        public bool PASSHASH_REQUIRED { get; set; }
        public string PASSWORD { get; set; }
        public Nullable<int> TOKEN_EXPIRY_PERIOD { get; set; }
        public Nullable<int> IDLE_TIME { get; set; }
        public string FIRST_NAME { get; set; }
        public string LAST_NAME { get; set; }
        public string MIDDLE_INITIAL { get; set; }
        public string EMAIL_ID { get; set; }
        public string PHONE1 { get; set; }
        public string PHONE2 { get; set; }
        public string FAX { get; set; }
        public string PAGER { get; set; }
        public string ORG_GROUP_ID { get; set; }
        public string PROFILE_ID { get; set; }
        public string LDAP_USER { get; set; }
        public string LDAP_ROLE { get; set; }
        public string LDAP_ORG { get; set; }
        public string TIME_RESTRICTIONS { get; set; }
        public string PASSWD_RESET_REQUIRED { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public bool ACCOUNT_DISABLED { get; set; }
        public string USERDN { get; set; }
        public string ENTERPRISE_SYSTEM { get; set; }
        public long STATUS_CODE { get; set; }
        public string CREATE_USER_ID { get; set; }
        public string SESSIONEXPIRY { get; set; }

    }
}
