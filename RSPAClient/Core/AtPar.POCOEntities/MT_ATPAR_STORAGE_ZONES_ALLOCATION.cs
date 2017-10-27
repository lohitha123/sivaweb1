using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_STORAGE_ZONES_ALLOCATION
    {
        public short APP_ID { get; set; }
        public string ORG_GROUP_ID { get; set; }
        public string STORAGE_ZONE_ID { get; set; }
        public string USER_ID { get; set; }
        public System.DateTime LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }

        //Ignore
        public string USERNAME { get; set; }

    }
}
