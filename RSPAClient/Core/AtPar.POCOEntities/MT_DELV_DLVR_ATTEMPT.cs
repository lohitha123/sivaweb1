using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_DELV_DLVR_ATTEMPT
    {
        public int TRANSACTION_ID { get; set; }
        public System.DateTime ATTEMPT_DATE { get; set; }
        public string COMMENT { get; set; }
    }
}
