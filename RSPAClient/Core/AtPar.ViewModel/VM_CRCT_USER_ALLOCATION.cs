using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public partial class VM_CRCT_USER_ALLOCATION
    {
        public string CART_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string DESCR { get; set; }
        public string SHADOW_FLAG { get; set; }        
        public int CART_COUNT_ORDER { get; set; }
        public string TWO_BIN_ALLOCATION { get; set; }
        public string DEF_PERCENTAGE_VALUE { get; set; }
        public string LOCATION_TYPE { get; set; }
    }
}
