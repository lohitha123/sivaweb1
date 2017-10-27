using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_BACK_ORDER_REPORT
    {
        public DateTime? ORDER_DATE_TIME { get; set; }

        public string COMPARTMENT { get; set; }
        public long ORDER_ID { get; set; }
        public DateTime PTWY_DATE_TIME { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string CART_ID { get; set; }
        public string ITEM_ID { get; set; }
        public double? QUANTITY_ORDERED { get; set; }
        public double? QUANTITY_RECEIVED { get; set; }


    }
}
