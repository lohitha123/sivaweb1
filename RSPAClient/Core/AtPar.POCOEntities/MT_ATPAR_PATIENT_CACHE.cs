using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_PATIENT_CACHE
    {
        public string ORG_ID { get; set; }
        public string PATIENT_MRC { get; set; }
        public string PATIENT_ACCNUMBER { get; set; }
        public string PATIENT_NAME { get; set; }
        public string PATIENT_BEDNUMBER { get; set; }
        public string PATIENT_DEPARTMENT { get; set; }
        public string PATIENT_SEX { get; set; }
        public string PATIENT_CLASS { get; set; }
        public System.DateTime MESSAGE_DATETIME { get; set; }
        public Nullable<System.DateTime> PATIENT_ADMIT_DATE { get; set; }
        public Nullable<System.DateTime> PATIENT_DISCHARGE_DATE { get; set; }
        public string PATIENT_VISIT_NUMBER { get; set; }
        public string STATUS { get; set; }
        public string OLD_PATIENT_MRC { get; set; }
        public string ITEM_ID { get; set; }
    }
}
