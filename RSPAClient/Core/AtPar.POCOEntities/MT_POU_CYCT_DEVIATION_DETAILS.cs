using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_CYCT_DEVIATION_DETAILS
    {
        public string CART_ID { get; set; }
        public System.DateTime CYCT_DATE_TIME { get; set; }
        public string ITEM_ID { get; set; }
        public Nullable<double> ORIGINAL_QUANTITY { get; set; }
        public Nullable<double> NEW_QUANTITY { get; set; }
        public string LOT_NUMBER { get; set; }
        public string SERIAL_NUMBER { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string COMPARTMENT { get; set; }
        public Nullable<double> ITEM_PRICE { get; set; }
        public string UOM { get; set; }
    }
}
