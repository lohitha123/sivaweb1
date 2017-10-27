using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class TKIT_REASON_CODES
    {
        public string ORG_GROUP_ID { get; set; }
        public string REASON_CODE { get; set; }
        public string REASON_DESCR { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string UPDATE_USERID { get; set; }
        public Nullable<bool> STATUS { get; set; }
    }
}
