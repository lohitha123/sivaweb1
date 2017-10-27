using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_AUDIT_SCREEN_CONTROLS
    {
        public short APP_ID { get; set; }
        public string FUNCTION_NAME { get; set; }
        public string TABLE_NAME { get; set; }
        public string FIELD_NAME { get; set; }
        public string FIELD_TYPE { get; set; }
        public string SUBFUNCTION_NAME { get; set; }
        public string KEY_FLAG { get; set; }
        public string FRIENDLY_NAME { get; set; }

        public string PARAMETER_VALUE { get; set; }
    }
}
