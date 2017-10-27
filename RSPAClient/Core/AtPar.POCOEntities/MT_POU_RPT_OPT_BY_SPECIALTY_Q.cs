using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_RPT_OPT_BY_SPECIALTY_Q
    {
        public string SPECIALTY_CODE { get; set; }
        public string SPECIALTY_DESCRIPTION { get; set; }
        public Nullable<long> NO_OF_PROCEDURES { get; set; }
        public Nullable<long> NO_OF_PREF_LISTS { get; set; }
        public Nullable<double> EFFICIENCY_PERCENTAGE { get; set; }
        public Nullable<double> TOTAL_PICKED_QTY { get; set; }
        public Nullable<double> TOTAL_PICKED_VALUE { get; set; }
        public Nullable<double> TOTAL_ISSUED_EXISTING_QTY { get; set; }
        public Nullable<double> TOTAL_ISSUED_EXISTING_VALUE { get; set; }
        public Nullable<double> TOTAL_ISSUED_NEW_QTY { get; set; }
        public Nullable<double> TOTAL_ISSUED_NEW_VALUE { get; set; }
        public Nullable<double> TOTAL_RETURN_QTY { get; set; }
        public Nullable<double> TOTAL_RETURN_VALUE { get; set; }
        public Nullable<double> TOTAL_WASTED_QTY { get; set; }
        public Nullable<double> TOTAL_WASTED_VALUE { get; set; }
        public Nullable<double> TOTAL_USAGE { get; set; }
        public int PERIOD { get; set; }
        public int YEAR { get; set; }
    }
}
