using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_ITEM_MFG_UPN
    {
        public int ID { get; set; }
        public string ORG_GROUP_ID { get; set; }
        public string ITEM_ID { get; set; }
        public string MFG_ITEM_ID { get; set; }
        public string MANUFACTURER { get; set; }
        public string UOM { get; set; }
        public string UPN { get; set; }
    }
}
