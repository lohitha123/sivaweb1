using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_CYCT_EVENT_HEADER_OUTPUT
    {
        public string BUSINESS_UNIT { get; set; }
        public string EVENT_ID { get; set; }
        public int NO_RECORDS { get; set; }
        public string FROM_STOR_LOC { get; set; }
        public string TO_STOR_LOC { get; set; }
        public string PARENT_EVENT_ID { get; set; }
        public string COUNT_HDR_STATUS { get; set; }
        public int EVENT_TYPE { get; set; }
        public string USER_ID { get; set; }
        public bool ALLOCATION_STATUS { get; set; }
        public bool STATUSALLOCATED { get; set; }
        public bool CHECKALLOCATED { get; set; }
        public bool ACTUAL_STATUSALLOCATED { get; set; }
    }
}
