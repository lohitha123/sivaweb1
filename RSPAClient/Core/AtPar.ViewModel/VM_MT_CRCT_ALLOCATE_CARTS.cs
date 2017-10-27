using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_MT_CRCT_ALLOCATE_CARTS
    {
        public string IsOrphan { get; set; }
        public long SNO { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string CART_ID { get; set; }
        public string DESCR { get; set; }
        public string USERS { get; set; }
        public int CART_COUNT_ORDER { get; set; }
        public string SHADOW_FLAG { get; set; }
        public string COUNT_BEFORE { get; set; }
        public bool ALL { get; set; }
        public bool MON { get; set; }
        public bool TUE { get; set; }
        public bool WED { get; set; }
        public bool THU { get; set; }
        public bool FRI { get; set; }
        public bool SAT { get; set; }
        public bool SUN { get; set; }
        public bool CHK_ALLOCATED { get; set; }

    }
}
