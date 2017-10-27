using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_ORDER_HEADER
    {
        public long ORDER_ID { get; set; }
        public Nullable<System.DateTime> ORDER_DATE_TIME { get; set; }
        public string CART_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public Nullable<int> ORDER_STATUS { get; set; }
        public Nullable<long> ERP_ORDER_NO { get; set; }
    }
}
