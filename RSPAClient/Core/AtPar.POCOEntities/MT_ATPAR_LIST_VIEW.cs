using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_LIST_VIEW
    {
        public short APP_ID { get; set; }
        public string SCREEN_NAME { get; set; }
        public string ENTERPRISE_SYSTEM { get; set; }
        public string FIELD_NAME { get; set; }
        public string SHORT_DESCR { get; set; }
        public string LONG_DESCR { get; set; }
        public string COLUMN_HEADER { get; set; }
        public string DEFAULT_COLUMN_HEADER { get; set; }
        public string MANDATORY_FIELD { get; set; }
        public Nullable<short> COLUMN_ORDER { get; set; }
        public Nullable<short> DEFAULT_COLUMN_ORDER { get; set; }
        public Nullable<int> COLUMN_WIDTH { get; set; }
        public Nullable<int> DEFAULT_COLUMN_WIDTH { get; set; }
        public string DISPLAY_FIELD { get; set; }
        public string DEFAULT_DISPLAY_FIELD { get; set; }
        public string ORDER_BY { get; set; }
        public Nullable<short> COLUMN_MAX_SIZE { get; set; }
        public string TOGGLE_FIELD { get; set; }
        public string DEFAULT_TOGGLE_TEXT { get; set; }
        public string TOGGLE_ORDER { get; set; }
        public string MANDATORY_TOGGLE { get; set; }
    }
}
