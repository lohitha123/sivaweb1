using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
   public class VM_RECV_HEADER
    {
        public Nullable<System.DateTime> END_DT_TIME { get; set; }
        public string PO_ID { get; set; }
        public string LOCATION { get; set; }
        public string DELIVER_TO { get; set; }
        public string INT_TRACKING_NBR { get; set; }
        public string HDR_CMTS { get; set; }

    }
}
