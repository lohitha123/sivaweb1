using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_DASHBOARD_DETAILS
    {
        public string DASHBOARD_ID { get; set; }
        public short ROW_POSITION { get; set; }
        public short COLUMN_POSITION { get; set; }
        public short APP_ID { get; set; }
        public short REPORT_ID { get; set; }
        public string REPORT_TYPE { get; set; }
        public string REPORT_NAME { get; set; }
        public string REPORT_HEADER { get; set; }
        public string INPUT_STRING { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
    }
}
