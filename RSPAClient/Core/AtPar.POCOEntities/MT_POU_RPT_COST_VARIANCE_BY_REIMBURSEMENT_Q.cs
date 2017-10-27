using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_Q
    {
        public string SPECIALTY_CODE { get; set; }
        public string SPECIALTY_DESCRIPTION { get; set; }
        public string DIAGNOSIS_CODE { get; set; }
        public string DIAGNOSIS_DESCRIPTION { get; set; }
        public int DIAGNOSIS_CODE_TYPE { get; set; }
        public Nullable<long> NO_OF_PHYSICIANS { get; set; }
        public Nullable<long> NO_OF_PROCEDURES { get; set; }
        public Nullable<double> MAX_USAGE { get; set; }
        public Nullable<double> MIN_USAGE { get; set; }
        public Nullable<double> TOTAL_VARIANCE { get; set; }
        public Nullable<double> TOTAL_SPEND { get; set; }
        public Nullable<double> TOTAL_ANNUAL_SPEND { get; set; }
        public int PERIOD { get; set; }
        public int YEAR { get; set; }
    }
}
