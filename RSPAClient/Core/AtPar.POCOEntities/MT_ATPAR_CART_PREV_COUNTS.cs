using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_CART_PREV_COUNTS
    {
        public int TRANSACTION_ID { get; set; }
        public string ITEM_ID { get; set; }
        public string COMPARTMENT { get; set; }
        public Nullable<double> COUNT_QTY { get; set; }
    }
}
