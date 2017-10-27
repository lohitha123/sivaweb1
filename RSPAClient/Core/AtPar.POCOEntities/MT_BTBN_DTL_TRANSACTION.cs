using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_BTBN_DTL_TRANSACTION
    {
        public int TRANSACTION_ID { get; set; }
        public string INV_BUSINESS_UNIT { get; set; }
        public string ITEM_ID { get; set; }
        public string STOR_LOC { get; set; }
        public string UOM { get; set; }
        public string LOT_ID { get; set; }
        public string SERIAL_ID { get; set; }
        public string CONTAINER { get; set; }
        public Nullable<double> QTY { get; set; }
        public string DEST_STOR_LOC { get; set; }
        public string USER_ID { get; set; }
        public Nullable<System.DateTime> TRANSFER_DATE_TIME { get; set; }
        public string DEVICE_ID { get; set; }
        public string DESTIN_UOM { get; set; }
        public string STOCK_UOM { get; set; }
        public Nullable<double> STOCK_QTY { get; set; }
    }
}
