using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class TKIT_DEPT
    {
        public string ORG_GROUP_ID { get; set; }
        public string DEPT_ID { get; set; }
        public string DESCRIPTION { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public string STATUS { get; set; }
        public bool USER_DEPT_EXISTS { get; set; }
    }
}
