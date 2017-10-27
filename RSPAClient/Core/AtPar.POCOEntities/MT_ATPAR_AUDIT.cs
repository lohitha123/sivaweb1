using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_AUDIT
    {
        public short APP_ID { get; set; }
        public int TRANSACTION_ID { get; set; }
        public string KEY_1 { get; set; }
        public string KEY_2 { get; set; }
        public string KEY_3 { get; set; }
        public string REPORT_DATA_1 { get; set; }
        public string REPORT_DATA_2 { get; set; }
        public string REPORT_DATA_3 { get; set; }
        public string REPORT_DATA_4 { get; set; }
        public string REPORT_DATA_5 { get; set; }
        public string REPORT_DATA_6 { get; set; }
        public Nullable<double> REPORT_DATA_7 { get; set; }
        public Nullable<double> REPORT_DATA_8 { get; set; }
        public Nullable<double> REPORT_DATA_9 { get; set; }
    }
}
