using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_H
    {
        public string SPECIALTY_CODE { get; set; }
        public string SPECIALTY_DESCRIPTION { get; set; }
        public Nullable<long> NO_OF_PROCEDURES { get; set; }
        public Nullable<long> NO_OF_PHYSICIANS { get; set; }
        public Nullable<double> TOTAL_SPEND { get; set; }
        public Nullable<double> TOTAL_VARIANCE { get; set; }
        public int DIAGNOSIS_CODE_TYPE { get; set; }
        public int PERIOD { get; set; }
        public int YEAR { get; set; }
    }
}
