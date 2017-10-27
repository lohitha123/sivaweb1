using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_AUDIT_INFO
    {
        public short APP_ID { get; set; }
        public string FUNCTION_NAME { get; set; }
        public string SUBFUNCTION_NAME { get; set; }
        public string KEY_VALUES { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public System.DateTime UPDATE_DATE { get; set; }
        public string FIELD_NAME { get; set; }
        public string OLD_VALUE { get; set; }
        public string NEW_VALUE { get; set; }
    }
}
