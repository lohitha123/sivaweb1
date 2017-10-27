using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_DASHBOARD_HEADER
    {
        public string DASHBOARD_ID { get; set; }
        public string NAME { get; set; }
        public short LAYOUT_ROWS { get; set; }
        public short LAYOUT_COLUMNS { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
    }
}
