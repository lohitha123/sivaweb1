using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_TOKENS
    {
        public string ACCESS_TOKEN { get; set; }
        public string USER_ID { get; set; }
        public string DEVICE_ID { get; set; }
        public Nullable<System.DateTime> EXPIRY_TIME { get; set; }
        public Nullable<System.DateTime> REQUEST_TIME { get; set; }
        public string PROFILE_ID { get; set; }
        public Nullable<int> IDLE_TIME { get; set; }
        public string PRODUCTS_ACCESS { get; set; }
    }
}
