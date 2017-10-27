using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_CART_OPTIMIZATION_DETAILS
    {

        public string CUST_ITEM_ID { get; set; }
        public string UPDATE_DATE { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public double PAR_QTY { get; set; }
        public double COUNT_QTY { get; set; }
        public double USAGE { get; set; }
        public double PRICE { get; set; }
        public string CART_ID { get; set; }
        public string COMPARTMENT { get; set; }
        public string ITEM_ID { get; set; }
        public string UOM { get; set; }
        public string DESCR { get; set; }
        public double AVG_USAGE { get; set; }
        public double MIN_USAGE { get; set; }
        public double MAX_USAGE { get; set; }
        public int RECOMMENDED_PAR { get; set; }
        public double TOTAL_USAGE { get; set; }       
        public double OrderQty { get; set; }
        public string ORPHANITEM { get; set; }
       

    }
}
