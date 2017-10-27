using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_PROFILE_APP_ACL
    {
        public string PROFILE_ID { get; set; }
        public int APP_ID { get; set; }
        public string CLIENT_USER { get; set; }
        public string SERVER_USER { get; set; }
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }
        public string APP_NAME { get; set; }
    }
}
