using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_REASON_CODE
    {
        public string REASON_CODE { get; set; }
        public string DESCRIPTION { get; set; }
        public System.DateTime UPDATE_DATE { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public bool STATUS { get; set; }
        //Ignore property
        public string CODE { get; set; }
    }
}
