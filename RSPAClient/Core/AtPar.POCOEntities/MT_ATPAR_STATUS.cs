using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_STATUS
    {
        public int STATUS_CODE { get; set; }
        public string STATUS_MESSAGE { get; set; }
        public string STATUS_SOLUTION { get; set; }
        public bool ONLY_CLIENT { get; set; }
        public Nullable<short> LANG_ID { get; set; }
        public Nullable<short> STATUS_TYPE { get; set; }
    }
}
