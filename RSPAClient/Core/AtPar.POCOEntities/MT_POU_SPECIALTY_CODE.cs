using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_SPECIALTY_CODE
    {
        public string SPECIALTY_CODE { get; set; }
        public string DESCRIPTION { get; set; }
        public System.DateTime UPDATE_DATE { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public bool STATUS { get; set; }
        //Ignore Property
        public string CODE { get; set; }
        public string SERVICECODE { get; set; }
    }
}
