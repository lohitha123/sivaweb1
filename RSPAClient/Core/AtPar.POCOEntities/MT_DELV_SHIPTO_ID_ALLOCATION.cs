using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_DELV_SHIPTO_ID_ALLOCATION
    {
        public string ORG_GROUP_ID { get; set; }
        public string ORG_ID { get; set; }
        public string SHIPTO_ID { get; set; }
        public int CHK_VALUE { get; set; }
        public int CHK_ALLOCATED { get; set; }
        public string DESCR { get; set; }
        public string EFF_STATUS { get; set; }
        public int SNO { get; set; }
    }
}
