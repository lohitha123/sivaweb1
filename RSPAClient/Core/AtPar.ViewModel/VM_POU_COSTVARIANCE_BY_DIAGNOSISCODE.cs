using System;

namespace AtPar.ViewModel
{
   public class VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE
    {
       public string CODE { get; set; }
       public string DESCRIPTION { get; set; }
       public Nullable<Int64> NO_OF_PHYSICIANS { get; set; }
       public Int64? NO_OF_PROCEDURES { get; set; }
       public double? MAX_USAGE { get; set; }
       public double? MIN_USAGE { get; set; }
       public double? TOTAL_VARIANCE { get; set; }
       public double? TOTAL_SPEND { get; set; }
       public double? TOTAL_ANNUAL_SPEND { get; set; }
       public double? PERVARIANCE { get; set; }
    }
}
