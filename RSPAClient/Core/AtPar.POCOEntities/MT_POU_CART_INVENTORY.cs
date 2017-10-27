using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_CART_INVENTORY
    {
        public string CART_ID { get; set; }
        public string ITEM_ID { get; set; }
        public Nullable<double> ITEM_QUANTITY_PAR { get; set; }
        public Nullable<double> ITEM_QUANTITY_ON_HAND { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string LOT_NUMBER { get; set; }
        public string SERIAL_NUMBER { get; set; }
        public Nullable<System.DateTime> EXPIRY_DATE { get; set; }
        public Nullable<double> ACTUAL_QUANTITY { get; set; }
        public string COMPARTMENT { get; set; }
        public long ID { get; set; }
        public double QUANTITY_ON_HAND { get; set; }
       
    }
}
