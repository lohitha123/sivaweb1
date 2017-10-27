using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_CRCT_PUTAWAY_DETAIL
    {
        public int TRANSACTION_ID { get; set; }
        public string ITEM_ID { get; set; }
        public string COMPARTMENT { get; set; }
        public string DESCR { get; set; }
        public string UOM { get; set; }
        public Nullable<double> PAR_QTY { get; set; }
        public double PUTAWAY_QTY { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string INVENTORY_ITEM { get; set; }
    }
}
