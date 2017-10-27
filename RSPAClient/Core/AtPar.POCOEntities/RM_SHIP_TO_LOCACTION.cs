using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class RM_SHIP_TO_LOCACTION
    {
        public string ORG_ID { get; set; }
        public string LOCATION_ID { get; set; }
        public string LOCATION_NAME { get; set; }
        public string ADDRESS_1 { get; set; }
        public string ADDRESS_2 { get; set; }
        public string CITY { get; set; }
        public string STATE { get; set; }
        public string ZIP { get; set; }
        public string PHONE_NO { get; set; }
        public string ATTENTION_TO { get; set; }
        public string EMAIL { get; set; }
        public Nullable<bool> STATUS { get; set; }
        public string COMMENTS { get; set; }
        public string DEPARTMENT_ID { get; set; }
    }
}
