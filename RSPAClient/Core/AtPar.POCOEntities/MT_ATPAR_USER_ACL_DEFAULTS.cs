using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_USER_ACL_DEFAULTS
    {
        public bool LOGIN_ALLOWED { get; set; }
        public Nullable<double> TOKEN_EXPIRY_PERIOD { get; set; }
        public bool PASSHASH_REQUIRED { get; set; }
        public string TIME_RESTRICTIONS { get; set; }
        public bool ACCOUNT_DISABLED { get; set; }
    }
}
