using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_DELV_BU_ALLOCATION
    {
        public string BUSINESS_UNIT { get; set; }
        public string USER_ID { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string UPDATE_USER_ID { get; set; }
           
            

        //ignored
        public int CHK_VALUE { get; set; }
        public int CHK_ALLOCATED { get; set; }
        public string USERNAME { get; set; }
        public int ROWINDEX { get; set; }
        public string INV_LOC_BUSINESS_UNIT { get; set; }
        public string DESCR { get; set; }

    }
}
