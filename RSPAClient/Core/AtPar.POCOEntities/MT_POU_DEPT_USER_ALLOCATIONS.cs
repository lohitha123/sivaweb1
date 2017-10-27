using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_DEPT_USER_ALLOCATIONS
    {
        public string DEPARTMENT_ID { get; set; }
        public string USER_ID { get; set; }
        public string ORG_GROUP_ID { get; set; }
        public bool HOME_DEPARTMENT { get; set; }
    }
}
