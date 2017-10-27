using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class PAR_MNGT_COST_CENTER
    {
        public string ORG_ID { get; set; }
        public string COST_CENTER_CODE { get; set; }
        public string DESCRIPTION { get; set; }
        public bool STATUS { get; set; }
        public System.DateTime UPDATE_DATE { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public string DEPT_ID { get; set; }
    }
}
