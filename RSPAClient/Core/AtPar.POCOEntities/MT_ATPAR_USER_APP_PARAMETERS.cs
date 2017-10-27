using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_USER_APP_PARAMETERS
    {
        public short APP_ID { get; set; }
        public string USER_ID { get; set; }
        public string PARAMETER_ID { get; set; }
        public string PARAMETER_VALUE { get; set; }
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }
    }
}
