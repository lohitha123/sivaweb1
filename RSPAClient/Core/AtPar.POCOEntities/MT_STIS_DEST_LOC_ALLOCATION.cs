using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_STIS_DEST_LOC_ALLOCATION
    {
        public string LOCATION_ID { get; set; }
        public string USER_ID { get; set; }
        public string UPDATE_USER { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string BUSINESS_UNIT { get; set; }

        // ignore
        public int CHK_VALUE { get; set; }
        public int CHK_ALLOCATED { get; set; }
        public string USERNAME { get; set; }
        public int ROWINDEX { get; set; }

        public string LOCATION_DESC { get; set; }

    }
}
