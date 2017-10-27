using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class TKIT_ITEM_MASTER
    {
        public string ORG_GROUP_ID { get; set; }
        public string ITEM_TYPE { get; set; }
        public string ITEM_ID { get; set; }
        public string ITEM_DESCR { get; set; }
        public string MANUFACTURER { get; set; }
        public string VENDOR { get; set; }
        public string IMAGE { get; set; }
        public string COMMENTS { get; set; }
        public string OWNER { get; set; }
        public string OWNER_TYPE { get; set; }
        public string ASSET_ID { get; set; }
        public Nullable<System.DateTime> DESTRUCTION_DATE { get; set; }
        public Nullable<bool> ITEM_INACTIVATED { get; set; }
        public string CREATE_USERID { get; set; }
        public Nullable<System.DateTime> CREATE_DATE { get; set; }
        public int CHK_VALUE { get; set; }
    }
}
