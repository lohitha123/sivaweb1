using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class RM_RECV_PO_HEADER
    {
        public string COMPANY { get; set; }
        public string PO_ID { get; set; }
        public string VENDOR_ID { get; set; }
        public string VENDOR_NAME { get; set; }
        public Nullable<System.DateTime> PO_DATE { get; set; }
        public string PO_COMMENTS { get; set; }
        public string ERS_TYPE { get; set; }
        public string BUYER_NAME { get; set; }
        public string BUYER_PHONE { get; set; }
    }
}
