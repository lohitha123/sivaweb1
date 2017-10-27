using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class RF_ITEM_USAGE_DETAILS
    {
        public string BUSINESS_UNIT { get; set; }
        public string CART_ID { get; set; }
        public string ITEM_ID { get; set; }
        public string COMPARTMENT { get; set; }
        public string SERIAL_NO { get; set; }
        public string LOT_NO { get; set; }
        public Nullable<System.DateTime> EXPIRY_DATE { get; set; }
        public Nullable<int> QTY { get; set; }
        public System.DateTime ENTRY_DTTM { get; set; }
        public string STATUS { get; set; }
    }
}
