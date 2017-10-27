using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_MT_RECV_PARCEL_COUNTS_HEADER
    {
        public int TRANSACTION_ID { get; set; }
        public Nullable<System.DateTime> START_DT_TIME { get; set; }
        public string USER_ID { get; set; }
        public int TOTCNT { get; set; }
        public string SIGNATURE { get; set; }
    }
}
