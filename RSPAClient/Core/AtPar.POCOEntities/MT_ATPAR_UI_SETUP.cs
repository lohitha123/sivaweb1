using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_UI_SETUP
    {
        public int APP_ID { get; set; }
        public string SCREEN_NAME { get; set; }
        public string USER_ID { get; set; }
        public string FIELD_NAME { get; set; }
        public string FIELD_DESCR { get; set; }
        public string DISPLAY_FLAG { get; set; }
        public string EDIT_FLAG { get; set; }
        public Nullable<int> SCAN_ORDER { get; set; }
        public string MANDATORY_FLAG { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string ORG_GROUP_ID { get; set; }
    }
}
