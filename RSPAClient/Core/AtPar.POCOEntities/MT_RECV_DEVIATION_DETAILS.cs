using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_RECV_DEVIATION_DETAILS
    {
        public int TRANSACTION_ID { get; set; }
        public int LINE_NO { get; set; }
        public string SERIAL_ID { get; set; }
        public string LOT_ID { get; set; }
        public string RECV_UOM { get; set; }
        public Nullable<double> RECV_CONVERSION_RATE { get; set; }
        public Nullable<double> QTY { get; set; }
        public Nullable<System.DateTime> EXPIRY_DATE { get; set; }
    }
}
