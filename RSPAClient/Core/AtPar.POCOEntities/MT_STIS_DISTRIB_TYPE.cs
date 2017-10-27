using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_STIS_DISTRIB_TYPE
    {
        public string DISTRIB_TYPE { get; set; }
        public string USER_ID { get; set; }
        public string UPDATE_USER { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string SET_ID { get; set; }

        // Ignore
        public string USERNAME { get; set; }
        public int CHK_VALUE { get; set; }
        public int CHK_ALLOCATED { get; set; }
        public int ROWINDEX { get; set; }
        public string DESCR { get; set; }
        //CHK_VALUE
    }
}
