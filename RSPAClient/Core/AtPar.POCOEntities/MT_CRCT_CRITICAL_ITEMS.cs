using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_CRCT_CRITICAL_ITEMS
    {
        public string BUSINESS_UNIT { get; set; }
        public string CART_ID { get; set; }
        public string ITEM_ID { get; set; }

        //Ignore property
        public string ChkValue { get; set; }
        public string ChkField { get; set; }
        public string INV_ITEM_ID { get; set; }
    }
}
