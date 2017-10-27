using System;

namespace AtPar.ViewModel
{
   public class VM_POU_COSTVARIANCE_BY_SURGEON
    {
        public string PHYSICIAN_ID { get; set; }
        public string PHYSICIAN_NAME { get; set; }
        public Int64? NO_OF_PROCEDURES { get; set; }
        public double? MIN_PROC_COST { get; set; }
        public double? MAX_PROC_COST { get; set; }
        public double? AVG_PROC_COST { get; set; }
        public double? MIN_PROC_VARIANCE { get; set; }
        public double? EXTENDED_VARIANCE { get; set; }
    }
}
