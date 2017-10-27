using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_PKPL_PRIORITY
    {
        public string BUSINESS_UNIT { get; set; }
        public string LOCATION { get; set; }
        public Nullable<short> PRIORITY { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string SETID { get; set; }
        public string DESCR { get; set; }

        // Ignored Properties
        public int CHK_VALUE { get; set; }
        public int CHK_ALLOCATED { get; set; }
        public int ROWINDEX { get; set; }

    }
}
