using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_RECV_SHIPTO_ID_ALLOCATION
    {
        public string SETID { get; set; }
        public string SHIPTO_ID { get; set; }
        public string USER_ID { get; set; }
        public string DESCR { get; set; }
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USERID { get; set; }

        public int CHK_VALUE { get; set; }
        public int CHK_ALLOCATED { get; set; }
        public string USERNAME { get; set; }
        public int ROWINDEX { get; set; }
        public string EFF_STATUS { get; set; }

    }
}
