using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_RELEASEPACKAGES
    {
        public int APP_ID { get; set; }
        public int TRANSACTION_ID { get; set; }
        public string KEY_1 { get; set; }
        public string PO_ID { get; set; }
        public string LOCATION { get; set; }
        public string TRACKING_NO { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public Nullable<int> STATUS { get; set; }
        public string USERNAME { get; set; }
        public string UID { get; set; }
        public string REPORT_DATA_8 { get; set; }
        public string REPORT_DATA_5 { get; set; }
        public string TRACKINGNO_POID_LOC { get; set; }
        public int? CURRENT_EVENT { get; set; }
        public DateTime? DOWNLOAD_DT_TIME { get; set; }
    }
}
