using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_ORG_GROUP_BUNITS
    {
        public string ORG_GROUP_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string BU_TYPE { get; set; }
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USERID { get; set; }
        public string CHK_VALUE { get; set; }
        public string Description { get; set; }
    }
}
