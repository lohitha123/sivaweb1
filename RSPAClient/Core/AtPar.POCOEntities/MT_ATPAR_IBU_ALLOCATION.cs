using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_IBU_ALLOCATION
    {
        public short APP_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string USER_ID { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public string DEFAULT_PRINTER { get; set; }
        public string COUNT_FLAG { get; set; }
        public string ALLOW_SIC_CONSIGN { get; set; }

        //igonred
        public int CHK_VALUE { get; set; }
        public int CHK_ALLOCATED { get; set; }
        public string USERNAME { get; set; }           
        public int ROWINDEX { get; set; }

        public string CHK_ALLOCATED_CNTFLG { get; set; }
        public int ROWINDEXFORCNTFLG { get; set; }
        public string CHK_ALLOCATED_CONSFLG { get; set; }
        public int ROWINDEXFORCONSFLG { get; set; }


    }
}
