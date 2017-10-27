using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_DEPT_CART_ALLOCATIONS
    {
        public string CART_ID { get; set; }
        public string DEPARTMENT_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string ORG_GROUP_ID { get; set; }
        public string LOCATION_TYPE { get; set; }
        public Nullable<int> APP_ID { get; set; }
        public string FLAG { get; set; }

        //Ignore property
        public string DEPT_NAME { get; set; }
    }
}
