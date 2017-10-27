using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_SECURITY_PARAMS
    {
        public int PASSWD_MIN_LENGTH { get; set; }
        public int PASSWD_MAX_LENGTH { get; set; }
        public int PASSWD_EXP_PERIOD { get; set; }
        public string PASSWD_RESET_REQUIRED { get; set; }
        public string MAINTAIN_PASSWD_HISTORY { get; set; }
        public string CHECK_PASSWD_HISTORY { get; set; }
        public int ALLOWED_INVALID_LOGIN_ATTEMPTS { get; set; }
        public int PASSWD_COMPLEXITY { get; set; }
        public string MAINTAIN_SECURITY_AUDIT { get; set; }
        public string ALLOW_REG_DEVICES { get; set; }
        public string LOGIN_HISTORY { get; set; }
        public string PASS_REQ_HHT_USERS { get; set; }
        public int LDAP_PASS_EXP_ALTMSG { get; set; }
    }
}
