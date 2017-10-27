using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_EVENTS
    {
        public string EVENT_TYPE { get; set; }
        public string USER_ID { get; set; }
        public Nullable<System.DateTime> EVENT_DATE_TIME { get; set; }
        public string EMAIL_ID { get; set; }
    }
}
