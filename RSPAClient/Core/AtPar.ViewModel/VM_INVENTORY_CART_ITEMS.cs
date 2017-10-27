using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_INVENTORY_CART_ITEMS
    {
        public string CART_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string ITEM_ID { get; set; }
        public string ITEM_DESCRIPTION { get; set; }
        public string LOT_C0NTROLLED { get; set; }
        public string SERIAL_CONTROLLED { get; set; }
        public string COMPARTMENT { get; set; }
        public string OPT_QTY { get; set; }
        public string CONV_RT_PAR { get; set; }
    }
}
