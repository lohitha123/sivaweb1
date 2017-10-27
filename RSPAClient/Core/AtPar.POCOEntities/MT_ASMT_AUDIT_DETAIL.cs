using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ASMT_AUDIT_DETAIL
    {
        public string ORG_GROUP_ID { get; set; }
        public int TRANSACTION_ID { get; set; }
        public string KEY_1 { get; set; }
        public string KEY_2 { get; set; }
        public string KEY_3 { get; set; }
        public string KEY_4 { get; set; }
        public string FIELD_NAME { get; set; }
        public string OLD_VALUE { get; set; }
        public string NEW_VALUE { get; set; }
    }
}
