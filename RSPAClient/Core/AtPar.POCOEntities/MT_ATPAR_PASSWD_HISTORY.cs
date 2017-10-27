using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_PASSWD_HISTORY
    {
        public string USER_ID { get; set; }
        public string OLD_PASSHASH { get; set; }
        public System.DateTime UPDATE_DATE { get; set; }
    }
}
