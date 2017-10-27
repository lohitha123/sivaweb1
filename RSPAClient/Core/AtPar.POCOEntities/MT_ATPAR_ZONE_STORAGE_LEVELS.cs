using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_ZONE_STORAGE_LEVELS
    {
        public string ORG_GROUP_ID { get; set; }
        public string STORAGE_ZONE_ID { get; set; }
        public string ORG_ID { get; set; }
        public string STORAGE_AREA { get; set; }
        public string STOR_LEVEL_1 { get; set; }
        public string STOR_LEVEL_2 { get; set; }
        public string STOR_LEVEL_3 { get; set; }
        public string STOR_LEVEL_4 { get; set; }
        public System.DateTime LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }

        //Ignore properties
        public int CHK_VALUE { get; set; }
        public int ROWINDEX { get; set; }
        public string CHK_ALLOCATED { get; set; }
        public string PERFORM_ACTION { get; set; }
        public string BUSINESS_UNIT { get; set; }
    }
}
