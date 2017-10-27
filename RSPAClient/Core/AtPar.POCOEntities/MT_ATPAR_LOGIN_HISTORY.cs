using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_LOGIN_HISTORY
    {
        public string USER_ID { get; set; }
        public string DEVICE_ID { get; set; }
        public string DEVICE_TOKEN { get; set; }
        public System.DateTime LOGIN_DATE_TIME { get; set; }
        public string REASON_CODE { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }
    }
}
