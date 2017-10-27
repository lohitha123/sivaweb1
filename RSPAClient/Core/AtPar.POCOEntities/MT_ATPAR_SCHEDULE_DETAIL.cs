using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_SCHEDULE_DETAIL
    {
        public string ORG_GROUP_ID { get; set; }
        public string SCHEDULE_ID { get; set; }
        public short SCHEDULE_DAY { get; set; }
        public System.DateTime SCHEDULE_TIME { get; set; }
        //Ignored Values
        public bool CHK_MON { get; set; }
        public bool CHK_TUE { get; set; }
        public bool CHK_WED { get; set; }
        public bool CHK_THR { get; set; }
        public bool CHK_FRI { get; set; }
        public bool CHK_SAT { get; set; }
        public bool CHK_SUN { get; set; }

    }
}
