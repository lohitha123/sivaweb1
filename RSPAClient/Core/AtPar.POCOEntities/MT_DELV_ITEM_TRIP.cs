using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_DELV_ITEM_TRIP
    {
        public int TRANSACTION_ID { get; set; }
        public int EVENT_ID { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string USER_ID { get; set; }

        public string USERNAME { get; set; }
    }
}
