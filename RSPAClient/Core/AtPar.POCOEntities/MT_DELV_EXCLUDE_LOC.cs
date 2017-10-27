using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_DELV_EXCLUDE_LOC
    {
        public string SETID { get; set; }
        public string LOCATION { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string UPDATE_USER_ID { get; set; }

        //ignored
        public int CHK_VALUE { get; set; }
        public int CHK_ALLOCATED { get; set; }
        public int ROWINDEX { get; set; }
        public string LOCATION_DESC { get; set; }
    }
}
