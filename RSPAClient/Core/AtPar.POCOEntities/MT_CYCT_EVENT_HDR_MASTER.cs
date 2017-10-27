using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_CYCT_EVENT_HDR_MASTER
    {
        public string TRANSACTION_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string EVENT_ID { get; set; }
        public string PARENT_EVENT_ID { get; set; }
        public Nullable<double> NO_OF_ITEMS { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public Nullable<int> SORT_BY_FIELD { get; set; }
        public string FROM { get; set; }
        public string TO { get; set; }

        //Ignore
        public int NO_OF_SUBEVENTS { get; set; }
        public string COUNT_HDR_STATUS { get; set; }
        public int ISSPLITTED { get; set; }
        public string USER_ID { get; set; }
    }
}
