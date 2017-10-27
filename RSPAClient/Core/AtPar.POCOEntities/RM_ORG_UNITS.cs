using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class RM_ORG_UNITS
    {
        public string ORG_ID { get; set; }
        public string ORG_NAME { get; set; }
        public string ADDRESS_1 { get; set; }
        public string ADDRESS_2 { get; set; }
        public string CITY { get; set; }
        public string STATE { get; set; }
        public string ZIP { get; set; }
        public string PHONE_NO { get; set; }
        public Nullable<bool> STATUS { get; set; }
        public string ORG_TYPE { get; set; }
        public string MASTER_GROUP_ID { get; set; }

        //Ignore Property

        public string EVENT { get; set; }
    }
}
