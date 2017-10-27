using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_RECALL_INFO
    {
        public string ALERT_ID { get; set; }
        public string ITEM_ID { get; set; }
        public string LOT_NO { get; set; }
        public string SERIAL_NO { get; set; }
        public string MFG_NAME { get; set; }
        public string MFG_CAT_NO { get; set; }
        public string ALERT_TYPE { get; set; }
        public string ALERT_CLASS { get; set; }
        public string ALERT_CATEGORY { get; set; }
        public string ALERT_TITLE { get; set; }
        public string ALERT_SYNOPSIS { get; set; }
        public string ALERT_URL { get; set; }
        public Nullable<System.DateTime> ALERT_DATE { get; set; }
    }
}
