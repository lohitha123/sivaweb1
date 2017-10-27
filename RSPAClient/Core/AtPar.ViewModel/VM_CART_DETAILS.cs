using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_CART_DETAILS
    {
        public string ITEM_ID { get; set; }
        public string COMPARTMENT { get; set; }
        public double COUNT_QUANTITY { get; set; }
        public double OPTIMAL_QUANTITY { get; set; }
        public string LNCMTS { get; set; }
        public string UOM { get; set; }
        public double PRICE { get; set; }
        public string COUNT_REQUIRED { get; set; }
        public string INVENTORY_ITEM { get; set; }
        public string ITEM_DESCR { get; set; }
        public string CART_REPLEN_CTRL { get; set; }
        public string CART_REPLEN_OPT { get; set; }
        public double MAX_QTY { get; set; }
        public string FOQ { get; set; }
        public string CUST_ITEM_NO { get; set; }
        public int ITEM_COUNT_ORDER { get; set; }
        public int COUNT_ORDER { get; set; }
           //Added for SendCartCounts
        public double ACT_QOH { get; set; }
        public string CRITICAL_ITEM { get; set; }
        public string NEW_OPTIMAL_QUANTITY { get; set; }
        public string FILL_KILL_FLAG { get; set; }
        public string VENDOR_ID { get; set; }
        public string CONV_FACTOR { get; set; }
        public string LOC_TYPE { get; set; }
        public string ORDER_QUANTITY { get; set; }
        public string ORDER_TYPE { get; set; }
    }
}
