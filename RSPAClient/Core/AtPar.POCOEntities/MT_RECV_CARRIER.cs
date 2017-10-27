using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_RECV_CARRIER
    {
        public string CARRIER_ID { get; set; }
        public string DESCR { get; set; }
        public string STATUS { get; set; }
        public System.DateTime LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USERID { get; set; }
        public string LOCAL_FLAG { get; set; }
    }
}
