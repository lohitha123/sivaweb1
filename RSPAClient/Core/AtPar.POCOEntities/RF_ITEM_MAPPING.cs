using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class RF_ITEM_MAPPING
    {
        public string TAG_ID { get; set; }
        public string BUNIT { get; set; }
        public string CART_ID { get; set; }
        public string BIN_ID { get; set; }
        public string ITEM_ID { get; set; }
        public string SERIAL_NO { get; set; }
        public string LOT_NO { get; set; }
        public Nullable<System.DateTime> EXPIRY_DATE { get; set; }
    }
}
