using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_STIS_DETAILS
    {
        public int TRANSACTION_ID { get; set; }
        public string ITEM_ID { get; set; }
        public int LINE_NBR { get; set; }
        public string STORAGE_LOCATION { get; set; }
        public Nullable<double> QTY { get; set; }
        public string UOM { get; set; }
        public Nullable<double> PRICE { get; set; }
        public Nullable<System.DateTime> ISSUE_DATE { get; set; }
        public string ACTUAL_ISSUED_UOM { get; set; }
        public Nullable<double> ACTUAL_ISSUED_QTY { get; set; }
        public string ADJUST_TYPE { get; set; }
        public string ADJUST_QTY { get; set; }
        public string LOT_ID { get; set; }
        public string SERIAL_ID { get; set; }
        public Nullable<System.DateTime> EXPIRY_DATE { get; set; }
        public string ITEM_DESC { get; set; }
    }
}
