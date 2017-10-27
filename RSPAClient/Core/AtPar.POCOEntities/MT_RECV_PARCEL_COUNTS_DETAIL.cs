using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_RECV_PARCEL_COUNTS_DETAIL
    {
        public int TRANSACTION_ID { get; set; }
        public string ORG_ID { get; set; }
        public string TRACKING_NO { get; set; }
        public Nullable<int> NO_OF_BOXES { get; set; }
        public Nullable<System.DateTime> SCAN_DATE { get; set; }
    }
}
