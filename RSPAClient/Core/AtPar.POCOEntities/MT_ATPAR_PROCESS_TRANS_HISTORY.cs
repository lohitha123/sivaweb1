using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_PROCESS_TRANS_HISTORY
    {
        public string ORG_ID { get; set; }
        public string ID { get; set; }
        public string SCHEDULE_ID { get; set; }
        public Nullable<short> SCHEDULE_DAY { get; set; }
        public Nullable<System.DateTime> SCHEDULE_TIME { get; set; }
        public string ERROR_DESCR { get; set; }
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }
    }
}
