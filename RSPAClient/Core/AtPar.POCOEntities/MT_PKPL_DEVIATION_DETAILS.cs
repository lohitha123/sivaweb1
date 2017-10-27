using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_PKPL_DEVIATION_DETAILS
    {
        public string SERIAL_ID { get; set; }
        public string LOT_ID { get; set; }
        public string LOCATION { get; set; }
        public Nullable<double> QTY { get; set; }
        public string UOM { get; set; }
        public Nullable<double> CONVERSION_FACTOR { get; set; }
        public int TRANSACTION_ID { get; set; }
        public int LINE_NO { get; set; }
        public string CONTAINER_ID { get; set; }
        public string SUB_ITM_ID { get; set; }
        public Nullable<System.DateTime> EXPIRY_DATE { get; set; }
    }
}
