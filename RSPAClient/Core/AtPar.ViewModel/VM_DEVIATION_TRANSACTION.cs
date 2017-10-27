using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_DEVIATION_TRANSACTION
    {
        public string CUST_ITEM_ID { get; set; }
        public DateTime UPDATE_DATE { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public double PAR_QTY { get; set; }
        public double COUNT_QTY { get; set; }
        public string USAGE { get; set; }
        public double PRICE { get; set; }
        public string CART_ID { get; set; }
        public string COMPARTMENT { get; set; }
        public string ITEM_ID { get; set; }
        public string UOM { get; set; }
        public string DESCR { get; set; }

    }
}
