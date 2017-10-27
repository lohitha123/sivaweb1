using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_CYCT_DEVIATION_HEADER
    {
        public string CART_ID { get; set; }
        public System.DateTime CYCT_DATE_TIME { get; set; }
        public string WORKSTATION_ID { get; set; }
        public string USER_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public Nullable<int> APP_ID { get; set; }
    }
}
