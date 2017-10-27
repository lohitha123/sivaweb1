using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class PAR_MNGT_ORDER_HEADER
    {
        public int ORDER_NO { get; set; }
        public string ORG_ID { get; set; }
        public string PAR_LOC_ID { get; set; }
        public Nullable<System.DateTime> ORDER_DATE { get; set; }
        public string CREATE_USER { get; set; }
        public string VENDOR_ID { get; set; }
        public string ERP_ORDER_NO { get; set; }
        public Nullable<int> APP_ID { get; set; }
        public string COMMENTS { get; set; }
        public string INVENTORYORDER_FLAG { get; set; }
        public string MRN { get; set; }
        public Nullable<System.DateTime> DUE_DATE { get; set; }
        public string MEDICINE { get; set; }
        public string DOSAGE { get; set; }
        public Nullable<double> QTY { get; set; }
        public string DELIVERY_LOCATION { get; set; }
        public string ORDERED_UOM { get; set; }

        public string VENDOR_NAME { get; set; }
    }
}
