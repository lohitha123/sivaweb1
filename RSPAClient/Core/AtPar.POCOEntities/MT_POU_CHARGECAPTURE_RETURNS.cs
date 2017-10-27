using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_CHARGECAPTURE_RETURNS
    {
        public long RETURN_ID { get; set; }
        public long TRANSACTION_ID { get; set; }
        public int LINE_NO { get; set; }
        public string REASON_CODE { get; set; }
        public string COMMENTS { get; set; }
        public Nullable<double> RETURN_QTY { get; set; }
        public Nullable<double> WASTAGE_QTY { get; set; }
        public System.DateTime UPDATE_DATE { get; set; }
        public string USER_ID { get; set; }
    }
}
