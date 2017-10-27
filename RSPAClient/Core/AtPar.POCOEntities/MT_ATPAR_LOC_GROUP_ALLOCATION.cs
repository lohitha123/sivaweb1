using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_LOC_GROUP_ALLOCATION
    {
        public short APP_ID { get; set; }
        public string ORG_GROUP_ID { get; set; }
        public string LOC_GROUP_ID { get; set; }
        public string USER_ID { get; set; }
        public System.DateTime LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }

        //Ignore
        public int CHK_VALUE { get; set; }
        public string USERNAME { get; set; }
    }
}
