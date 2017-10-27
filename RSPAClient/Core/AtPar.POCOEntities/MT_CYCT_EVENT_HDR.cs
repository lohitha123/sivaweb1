using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_CYCT_EVENT_HDR
    {
        public string BUSINESS_UNIT { get; set; }
        public string EVENT_ID { get; set; }
        public string USER_ID { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public int TRANSACTION_ID { get; set; }
        public Nullable<System.DateTime> COMPLETED_DATE { get; set; }
        public string PARENT_EVENT_ID { get; set; }
        public Nullable<int> EVENT_STATUS { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public Nullable<System.DateTime> SEND_DATE_TIME { get; set; }
        public int EVENT_TYPE { get; set; }
        public string EVENTUSERS { get; set; }
    }
}
