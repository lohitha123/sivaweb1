using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_POU_PREF_OPT_BY_PROCEDURE
    {
        public string SPECIALTY_CODE { get; set; }
        public string PROCEDURE_CODE { get; set; }
        public string PROCEDURE_DESCRIPTION { get; set; }
        public Nullable<long> NO_OF_PHYSICIANS { get; set; }
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
        public List<VM_POU_PREF_OPT_BY_PHYSICIAN> PHYSICIAN_DETAILS { get; set; }        
    }
}
