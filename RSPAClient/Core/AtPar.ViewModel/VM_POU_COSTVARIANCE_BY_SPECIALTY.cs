using System;

namespace AtPar.ViewModel
{
    public class VM_POU_COSTVARIANCE_BY_SPECIALTY
    {
        public string SPECIALTY_CODE { get; set; }
        public string SPECIALTY_DESCRIPTION { get; set; }
        public long? NO_OF_PROCEDURES { get; set; }
        public double? TOTAL_SPEND { get; set; }
        public double? TOTAL_VARIANCE { get; set; }
        public double? PERVARIANCE { get; set; }
        public int? PERIOD { get; set; }
        public int? MONTH { get; set; }
        public int? YEAR { get; set; }
    }
}
