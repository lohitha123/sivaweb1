using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS
    {
        public string CART_ID { get; set; }
        public string DEPARTMENT_ID { get; set; }
        public string WORKSTATION_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string ORG_GROUP_ID { get; set; }
        public string LOCATION_TYPE { get; set; }
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USERID { get; set; }
        public Nullable<int> APP_ID { get; set; }
        public int PRIORITY { get; set; }
        public string FLAG { get; set; }
        public string LOCATION_DESCR { get; set; }
        public string LOCATION { get; set; }




    }
}
