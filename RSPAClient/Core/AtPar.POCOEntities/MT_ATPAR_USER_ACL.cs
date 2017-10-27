using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_USER_ACL
    {
        public string USER_ID { get; set; }
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
    }
}
