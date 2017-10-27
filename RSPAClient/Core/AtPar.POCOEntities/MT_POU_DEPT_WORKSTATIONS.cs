using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_DEPT_WORKSTATIONS
    {
        public string DEPARTMENT_ID { get; set; }
        public string WORKSTATION_ID { get; set; }
        public string WORKSTATION_DESCR { get; set; }
        public string WORKSTATION_MAC_ADDRESS { get; set; }
        public string ORG_GROUP_ID { get; set; }
        public List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> DETAILS { get; set; }
        public string Allocated { get; set; }
    }
}
