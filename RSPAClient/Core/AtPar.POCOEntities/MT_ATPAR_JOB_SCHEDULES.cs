using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_JOB_SCHEDULES
    {
        public string SERVICE_NAME { get; set; }
        public string JOB_ID { get; set; }
        public string SCHEDULE_ID { get; set; }
        public Nullable<bool> STATUS { get; set; }
        public string USER_ID { get; set; }
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
    }
}
