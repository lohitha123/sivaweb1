using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_PICKPLAN_STATUS_TRANSACTION_DETAILS
    {
        public string ID { get; set; }
        public string ORDER_NO { get; set; }
        public string PICK_BATCH_ID { get; set; }
        public DateTime? UPDATETIME { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string USER_ID { get; set; }
        public DateTime? DOWNLOADTIME { get; set; }
        public string DESCR { get; set; }
    }
}
