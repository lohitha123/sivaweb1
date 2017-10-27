using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_MT_ATPAR_PROCESS_SCHEDULER
    {
        public string ORG_GROUP_ID { get; set; }
        public string SCHEDULE_ID { get; set; }
        public short SCHEDULE_DAY { get; set; }
        public string SCHEDULE_TIME { get; set; }
        public bool CHK_MON { get; set; }
        public bool CHK_TUE { get; set; }
        public bool CHK_WED { get; set; }
        public bool CHK_THR { get; set; }
        public bool CHK_FRI { get; set; }
        public bool CHK_SAT { get; set; }
        public bool CHK_SUN { get; set; }
    }
}
