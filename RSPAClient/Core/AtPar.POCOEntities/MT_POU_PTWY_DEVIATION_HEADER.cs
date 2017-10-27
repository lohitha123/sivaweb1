using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_PTWY_DEVIATION_HEADER
    {
        public string USER_ID { get; set; }
        public System.DateTime PTWY_DATE_TIME { get; set; }
        public long ORDER_ID { get; set; }
        public string WORKSTATION_ID { get; set; }
        public string CART_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public Nullable<int> APP_ID { get; set; }
    }
}
