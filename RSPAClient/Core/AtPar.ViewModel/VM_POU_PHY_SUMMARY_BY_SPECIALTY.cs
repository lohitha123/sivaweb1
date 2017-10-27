using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_POU_PHY_SUMMARY_BY_SPECIALTY
    {
        public string SPECIALTY_CODE { get; set; }
        public string SPECIALTY_DESCRIPTION { get; set; }
        public Nullable<long> NO_OF_PROCEDURES { get; set; }
        public Nullable<long> NO_OF_PHYSICIANS { get; set; }
        public Nullable<double> TOTAL_SPEND { get; set; }
        public Nullable<double> TOTAL_VARIANCE { get; set; }
    }
}
