using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_CRCT_PAR_AUDIT
    {
        public string KEY_1 { get; set; }
        public string KEY_2 { get; set; }
        public string KEY_3 { get; set; }
        public string KEY_4 { get; set; }
        public int TRANSACTION_ID { get; set; }
        public System.DateTime UPDATE_DATE { get; set; }
        public Nullable<double> OLD_PAR_VALUE { get; set; }
        public Nullable<double> NEW_PAR_VALUE { get; set; }
        public string USER_ID { get; set; }
        public string UOM { get; set; }
        public string KEY_5 { get; set; }
    }
}
