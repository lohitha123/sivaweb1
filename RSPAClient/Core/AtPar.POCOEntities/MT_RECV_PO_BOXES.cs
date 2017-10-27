using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_RECV_PO_BOXES
    {
        public int TRANSACTION_ID { get; set; }
        public int LINE_NBR { get; set; }
        public int SCHED_NBR { get; set; }
        public string ITEM_ID { get; set; }
        public short NO_OF_BOXES { get; set; }
        public string CARRIER_ID { get; set; }
        public string CUST_ITEM_NO { get; set; }
    }
}
