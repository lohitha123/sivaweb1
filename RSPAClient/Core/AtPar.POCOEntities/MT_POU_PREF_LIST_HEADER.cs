using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_PREF_LIST_HEADER
    {
        public string PREF_LIST_ID { get; set; }
        public string PREF_LIST_DESCR { get; set; }
        public string DEPARTMENT_ID { get; set; }
        public Nullable<bool> STATUS { get; set; }
        public System.DateTime UPDATE_DATE { get; set; }
        public string UPDATE_USERID { get; set; }
        public string PROCEDURE_ID { get; set; }
        public string PHYSICIAN_ID { get; set; }
        public string DESCRIPTION { get; set; }
        public string PREFERENCENAME { get; set; }
        public string PREFLISTNAME { get; set; }
        public string PREF_PROCEDURES { get; set; }
    }
}
