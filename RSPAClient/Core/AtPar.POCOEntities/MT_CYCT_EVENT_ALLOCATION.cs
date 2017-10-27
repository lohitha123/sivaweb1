using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_CYCT_EVENT_ALLOCATION
    {
        public string BUSINESS_UNIT { get; set; }
        public string EVENT_ID { get; set; }
        public string USER_ID { get; set; }
        public string UID { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public Nullable<int> NO_RECORDS { get; set; }
        public string FROM_STOR_LOC { get; set; }
        public string TO_STOR_LOC { get; set; }
        public int EVENT_TYPE { get; set; }
        public string USERNAME { get; set; }
        public bool STATUSALLOCATED { get; set; }
        public bool CHECKALLOCATED { get; set; }
        public bool ACTUAL_STATUSALLOCATED { get; set; }
    }
}
