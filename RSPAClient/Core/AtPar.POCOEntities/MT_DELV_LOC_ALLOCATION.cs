using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_DELV_LOC_ALLOCATION
    {
        public string SETID { get; set; }
        public string LOCATION { get; set; }
        public string USER_ID { get; set; }
        public Nullable<short> LOC_ORDER { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public string DESCRIPTION { get; set; }
    }
}
