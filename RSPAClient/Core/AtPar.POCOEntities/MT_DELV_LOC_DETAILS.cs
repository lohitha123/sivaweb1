using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_DELV_LOC_DETAILS
    {
        public string ORG_GROUP_ID { get; set; }
        public string DROP_OFF_LOCATION_ID { get; set; }
        public string LOCATION_DESC { get; set; }
        public bool STATUS { get; set; }
        public System.DateTime LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }
    }
}
