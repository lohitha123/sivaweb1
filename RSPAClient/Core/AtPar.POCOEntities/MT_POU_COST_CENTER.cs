using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_COST_CENTER
    {
        public string COST_CENTER_CODE { get; set; }
        public string DESCRIPTION { get; set; }
        public System.DateTime UPDATE_DATE { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public bool STATUS { get; set; }
    }
}
