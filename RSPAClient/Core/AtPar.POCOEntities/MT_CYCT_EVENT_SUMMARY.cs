using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_CYCT_EVENT_SUMMARY
    {
        public string BUSINESS_UNIT { get; set; }
        public string EVENT_ID { get; set; }
        public Nullable<int> NO_OF_ITEMS { get; set; }
        public Nullable<int> NO_OF_ITEMS_NEGATIVE { get; set; }
        public Nullable<int> NO_OF_ITEMS_POSITIVE { get; set; }
        public Nullable<double> TOTAL_VALUE { get; set; }
        public Nullable<double> TOTAL_VALUE_DIFF { get; set; }
        public Nullable<System.DateTime> POST_DATE { get; set; }
    }
}
