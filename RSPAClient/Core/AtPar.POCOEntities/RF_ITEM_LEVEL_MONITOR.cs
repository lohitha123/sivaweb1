using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class RF_ITEM_LEVEL_MONITOR
    {
        public long ID { get; set; }
        public string LOCATION_ID { get; set; }
        public string LOC_READ_POINT { get; set; }
        public string TAG_ID { get; set; }
        public string ANTENNA_ID { get; set; }
        public Nullable<int> READ_COUNT { get; set; }
        public Nullable<System.DateTime> ENTRY_TIME { get; set; }
        public string STATUS { get; set; }
    }
}
