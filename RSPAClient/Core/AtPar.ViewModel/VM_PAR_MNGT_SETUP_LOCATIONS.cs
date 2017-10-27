using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_PAR_MNGT_SETUP_LOCATIONS
    {
        public string COST_CENTER_CODE { get; set; }
        public string PAR_LOC_ID { get; set; }
        public string LOCATION_NAME { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string CART_TYPE { get; set; }
        public string POU_CART { get; set; }
        public string PARLOC_TYPE { get; set; }
        public Nullable<bool> PERPECTUAL_IN_MMIS { get; set; }
    }
}
