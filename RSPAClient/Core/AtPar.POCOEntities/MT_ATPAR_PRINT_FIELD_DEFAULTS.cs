using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_PRINT_FIELD_DEFAULTS
    {
        public short APP_ID { get; set; }
        public string OBJECT_ID { get; set; }
        public int LINE_NO { get; set; }
        public string FIELD_NAME { get; set; }
        public string DISPLAY_NAME { get; set; }
        public int FIELD_SIZE { get; set; }
        public string SECTION { get; set; }
        public string FIELD_GROUP { get; set; }
        public string FIELD_TYPE { get; set; }
    }
}
