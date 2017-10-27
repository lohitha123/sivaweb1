using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_RPT_POU_PROCEDURE_PREF_SETUP_HEADER
    {
        public string PREF_LIST_ID { get; set; }
        public string PREF_LIST_DESCR { get; set; }
        public string DEPARTMENT_ID { get; set; }
        public Nullable<bool> STATUS { get; set; }
        public string PROCEDURE_ID { get; set; }
        public string PHYSICIAN_ID { get; set; }
        public string PROCEDURE_CODE { get; set; }
        public string DESCRIPTION { get; set; }
        public bool PC_STATUS { get; set; }
        public string SPECIALTY_CODE { get; set; }
        public string SC_DESCRIPTION { get; set; }
        public bool SC_STATUS { get; set; }
        public string FIRST_NAME { get; set; }
        public string LAST_NAME { get; set; }
        public string MIDDLE_INITIAL { get; set; }
        public Nullable<bool> P_STATUS { get; set; }
    }
}
