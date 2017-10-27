using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_SECURITY_AUDIT
    {
        public string UPDATE_USER_ID { get; set; }
        public System.DateTime UPDATE_DATE { get; set; }
        public string KEY_1 { get; set; }
        public string KEY_2 { get; set; }
        public string FUNCTION_NAME { get; set; }
        public string FIELD_NAME { get; set; }
        public string OLD_VALUE { get; set; }
        public string NEW_VALUE { get; set; }
        public string KEY_3 { get; set; }
        public string KEY_4 { get; set; }
        public string KEY_5 { get; set; }
    }
}
