using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_PROFILE_LIST_VIEW
    {
        public string PROFILE_ID { get; set; }
        public short APP_ID { get; set; }
        public string SCREEN_NAME { get; set; }
        public string FIELD_NAME { get; set; }
        public string VALUE { get; set; }
        public string COLUMN_HEADER { get; set; }
        public Nullable<short> COLUMN_ORDER { get; set; }
        public Nullable<int> COLUMN_WIDTH { get; set; }
        public string DISPLAY_FIELD { get; set; }
        public string TOGGLE_FIELD { get; set; }
        public string DEFAULT_TOGGLE_TEXT { get; set; }
        public string TOGGLE_ORDER { get; set; }
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }
    }
}
