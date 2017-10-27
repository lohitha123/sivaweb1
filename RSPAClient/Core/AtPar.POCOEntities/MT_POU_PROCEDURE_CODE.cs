using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_PROCEDURE_CODE
    {
        public string PROCEDURE_CODE { get; set; }
        public string DESCRIPTION { get; set; }
        public System.DateTime UPDATE_DATE { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public bool STATUS { get; set; }
        public string SPECIALTY_CODE { get; set; }
        public string PROCEDURENAME { get; set; }
        //Ignore properties
        public string CODE { get; set; }
        public string SCODE { get; set; }

    }
}
