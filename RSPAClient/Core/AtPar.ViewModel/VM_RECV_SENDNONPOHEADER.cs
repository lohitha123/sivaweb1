using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_RECV_SENDNONPOHEADER
    {
        public int TRANSACTION_ID { get; set; }
        public string TRACKING_NBR { get; set; }
        public string LOCATION { get; set; }
        public string CARRIER_ID { get; set; }
        public string DELIVER_TO { get; set; }
        public string STATUS { get; set; }
        public string USER_ID { get; set; }
        public string DESCR { get; set; }
        public string VENDOR_NAME1 { get; set; }
        public string DEPT_ID { get; set; }
        public string PO_ID { get; set; }
        public string LINE_NBR { get; set; }
        public string SHIPTO_ID { get; set; }
        public string NON_PO_ITEM { get; set; }
        public string TYPE_OF_PACKAGE { get; set; }
        public string END_DT_TIME { get; set; }
        public string START_DT_TIME { get; set; }
        public string COMMENTS { get; set; }
        public string LOCDESCR { get; set; }
        public string PO_DT { get; set; }
        public string VENDOR_ID { get; set; }
        public string NOTES_COMMENTS { get; set; }
        public string NO_OF_PACKAGES { get; set; }
    }
}

