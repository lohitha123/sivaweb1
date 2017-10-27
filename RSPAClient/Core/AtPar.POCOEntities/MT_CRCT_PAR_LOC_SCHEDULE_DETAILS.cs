using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_CRCT_PAR_LOC_SCHEDULE_DETAILS
    {
        public string ORG_GROUP_ID { get; set; }
        public string ORG_ID { get; set; }
        public string PAR_LOC_ID { get; set; }
        public string SCHEDULE_ID { get; set; }

        //Ignore
        public int CHK_VALUE { get; set; }
    }
}
