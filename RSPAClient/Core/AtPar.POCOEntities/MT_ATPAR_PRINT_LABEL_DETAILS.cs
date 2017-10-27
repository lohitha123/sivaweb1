using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_PRINT_LABEL_DETAILS
    {
        public short APP_ID { get; set; }
        public string OBJECT_ID { get; set; }
        public short LINE_NO { get; set; }
        public string FIELD_NAME { get; set; }
        public string TEXT_VALUE { get; set; }
        public string FIELD_GROUP { get; set; }
        public Nullable<short> ROW_POSITION { get; set; }
        public Nullable<short> COLUMN_POSITION { get; set; }
        public string DISPLAY_NAME { get; set; }
        public Nullable<bool> VISIBLE { get; set; }
        public string ALIGNMENT { get; set; }
        public string HEADERFONT { get; set; }
        public string VALUEFONT { get; set; }
        public int COLUMN_SPAN { get; set; }
        public int FIELD_SIZE { get; set; }
        public string FIELD_TYPE { get; set; }
    }
}
