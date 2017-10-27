using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_POU_PHY_RANK_DATA
    {
        public Nullable<long> PHYSICIAN_RANK { get; set; }        
        public string PHYSICIAN_ID { get; set; }
        public string PHYSICIAN_NAME { get; set; }
        public Nullable<long> NO_OF_PROCEDURES { get; set; }
        public Nullable<double> TOTAL_SPEND { get; set; }
        public Nullable<double> TOTAL_VARIANCE { get; set; }
        public Nullable<double> PER_VAR_TOTAL_SPEND { get; set; }        
    }
}
