using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_PTWY_DEVIATION_DETAILS
    {
        public long ORDER_ID { get; set; }
        public System.DateTime PTWY_DATE_TIME { get; set; }
        public string ITEM_ID { get; set; }
        public string COMPARTMENT { get; set; }
        public Nullable<double> QUANTITY_ORDERED { get; set; }
        public Nullable<double> QUANTITY_RECEIVED { get; set; }
    }
}
