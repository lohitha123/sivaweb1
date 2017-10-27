using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_RPT_POU_TRANS_HEADER2
    {
        public int ORDER_NO { get; set; }
        public string ORG_ID { get; set; }
        public string PAR_LOC_ID { get; set; }
        public System.DateTime ORDER_DATE { get; set; }
        public string CREATE_USER { get; set; }
        public string VENDOR_ID { get; set; }
        public string ERP_ORDER_NO { get; set; }
        public int APP_ID { get; set; }
        public string COMMENTS { get; set; }
        public string INVENTORYORDER_FLAG { get; set; }
        public Nullable<System.DateTime> PTWY_DATE_TIME { get; set; }
        public Nullable<System.DateTime> CYCT_DATE_TIME { get; set; }
    }
}
