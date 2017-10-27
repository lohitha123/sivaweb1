using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_ORDER_DETAILS
    {
        public long ORDER_ID { get; set; }
        public string LINE_NUMBER { get; set; }
        public string ITEM_ID { get; set; }
        public Nullable<double> QUANTITY_ORDERED { get; set; }
        public Nullable<double> QUANTITY_RECEIVED { get; set; }
        public string COMPARTMENT { get; set; }
        public Nullable<double> QUANTITY_TO_RECEIVE { get; set; }
    }
}
