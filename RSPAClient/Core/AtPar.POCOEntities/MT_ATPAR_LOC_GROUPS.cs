using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_LOC_GROUPS
    {
        public string ORG_GROUP_ID { get; set; }
        public string LOC_GROUP_ID { get; set; }
        public string LOC_DESCR { get; set; }
        public bool STATUS { get; set; }
        public System.DateTime LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }

        //Ignore
        public int CHK_VALUE { get; set; }
        public string USER_ID { get; set; }
        public string CHK_ALLOCATED { get; set; }
        public int ROWINDEX { get; set; }
    }
}
