using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_LOC_GROUP_MEMBERS
    {
        public string ORG_GROUP_ID { get; set; }
        public string LOC_GROUP_ID { get; set; }
        public string ORG_ID { get; set; }
        public string LOCATION_ID { get; set; }
        public string LOC_DESCR { get; set; }
        public System.DateTime LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }
        public string TYPE { get; set; }
    }
}
