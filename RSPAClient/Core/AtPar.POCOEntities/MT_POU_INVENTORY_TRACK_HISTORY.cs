using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_INVENTORY_TRACK_HISTORY
    {
        public long ID { get; set; }
        public short EVENT_TYPE { get; set; }
        public System.DateTime UPDATE_DATE { get; set; }
        public Nullable<double> QTY { get; set; }
        public Nullable<double> ON_HAND_QTY { get; set; }
        public int TRANSACTION_ID { get; set; }
        public Nullable<int> CHARGE_CAPTURE_TRANS_ID { get; set; }
        public Nullable<int> ADJUSTMENT_TYPE { get; set; }
    }
}
