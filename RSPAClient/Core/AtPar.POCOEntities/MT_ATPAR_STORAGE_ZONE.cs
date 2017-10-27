using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_STORAGE_ZONE
    {
        public string ORG_GROUP_ID { get; set; }
        public string STORAGE_ZONE_ID { get; set; }
        public string STORAGE_ZONE_DESCR { get; set; }
        public bool STATUS { get; set; }
        public System.DateTime LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }

        //Ignore
        public int CHK_VALUE { get; set; }
        public string USER_ID { get; set; }
        public int ROWINDEX { get; set; }
        public int CHK_ALLOCATED { get; set; }
    }
}
