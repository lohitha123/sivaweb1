using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_RPT_EXTENDED_VARIANCE_BY_SURGEON_Y
    {
        public string SPECIALTY_CODE { get; set; }        
        public string PHYSICIAN_ID { get; set; }
        public string PHYSICIAN_NAME { get; set; }
        public string DIAGNOSIS_CODE { get; set; }
        public string DIAGNOSIS_DESCRIPTION { get; set; }
        public int DIAGNOSIS_CODE_TYPE { get; set; }
        public Nullable<long> NO_OF_PROCEDURES { get; set; }
        public Nullable<double> MIN_PROC_COST { get; set; }
        public Nullable<double> MAX_PROC_COST { get; set; }
        public Nullable<double> AVG_PROC_COST { get; set; }
        public Nullable<double> TOTAL_SPEND { get; set; }
        public Nullable<double> PER_VAR_TOTAL_SPEND { get; set; }
        public Nullable<int> PHYSICIAN_RANK { get; set; }
        public Nullable<int> NO_OF_PHY_DEPT { get; set; }
        public Nullable<int> NO_OF_PROCS_DEPT { get; set; }
        public Nullable<double> LOW_COST_AVG_DEPT { get; set; }
        public Nullable<double> MIN_PROC_VARIANCE { get; set; }
        public Nullable<double> EXTENDED_VARIANCE { get; set; }
        public int YEAR { get; set; }
    }
}
