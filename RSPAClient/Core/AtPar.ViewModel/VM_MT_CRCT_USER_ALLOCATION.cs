using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_MT_CRCT_USER_ALLOCATION
    {
        public string CART_ID { get; set; }
        public string USER_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string DESCR { get; set; }
        public Nullable<short> CART_COUNT_ORDER { get; set; }
        public string SHADOW_FLAG { get; set; }
        public string COUNT_BEFORE { get; set; }
        public string CRTID { get; set; }

        //Ignore Values
        public string FIRST_NAME { get; set; }
        public string LAST_NAME { get; set; }
        public string MIDDLE_INITIAL { get; set; }
        public string ORPHANCART { get; set; }
        public string USERNAME { get; set; }
    }
}
