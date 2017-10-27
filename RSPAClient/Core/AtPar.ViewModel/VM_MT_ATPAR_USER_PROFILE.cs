using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_MT_ATPAR_USER_PROFILE
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
        public string LDAP_USER { get; set; }
        public Nullable<int> TOKEN_EXPIRY_PERIOD { get; set; }
        public bool LOGIN_ALLOWED { get; set; }
        public bool PASSHASH_REQUIRED { get; set; }
        public string TIME_RESTRICTIONS { get; set; }
        public bool ACCOUNT_DISABLED { get; set; }
        public Nullable<int> IDLE_TIME { get; set; }
        public string PASSWD_RESET_REQUIRED { get; set; }
        public bool REPORT_USER { get; set; }
        public Nullable<short> RECORDS_PER_PAGE { get; set; }
        public Nullable<short> DEFAULT_REPORT_DURATION { get; set; }
        public string IMAGE_PATH { get; set; }
        public byte[] IMAGE { get; set; }

    }
}
