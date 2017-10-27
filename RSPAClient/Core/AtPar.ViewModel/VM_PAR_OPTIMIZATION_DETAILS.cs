using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
  public class VM_PAR_OPTIMIZATION_DETAILS
    {

        public string CART_ID { get; set; }
        public string UPDATE_DATE { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public double? PAR_VALUE { get; set; }
        public double? COUNT_QTY { get; set; }
        public double? USAGE { get; set; }
        public double? PRICE { get; set; }        
        public string COMPARTMENT { get; set; }
        public string ITEM_ID { get; set; }
        public string UOM { get; set; }
        public string DESCR { get; set; }
        public double? AVGUSAGE { get; set; }
        public double? MINUSAGE { get; set; }
        public double? MAXUSAGE { get; set; }
        public double? RECOMMENDED_PAR { get; set; }
        public double? PAR_VARIATION { get; set; }
        public double? TOTUSAGE { get; set; }
        public double? ORDER_QTY { get; set; }
        public string LOCATION_TYPE { get; set; }
        public double? ORDQTY { get; set; }
        public int? AVGTIME { get; set; }

    }
}
