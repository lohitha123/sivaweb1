using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
   public class VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT
    {
        public string INDEX { get; set; }
        public string ITEM_ID { get; set; }
        public string ITEM_DESCRIPTION { get; set; }
        public string PAR_VALUE { get; set; }
        public string ITEM_TYPE { get; set; }
        public string ITEM_PRICE { get; set; }
        public string CRITICAL_ITEM { get; set; }
        public string LOT_CONTROLLED { get; set; }
        public string SERIAL_CONTROLLED { get; set; }
        public string UOM { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string LOCATION { get; set; }
        public string LOCATION_DESCR { get; set; }
        public string DEPT_ID { get; set; }
        public string ASSIGN_CART { get; set; }
        public string ACT_ASSIGN_CART { get; set; }
        public string LOCATION_TYPE { get; set; }
        public Boolean LOT { get; set; }
        public Boolean SERIAL { get; set; }
        public string ISSUE_UOM { get; set; }
        public string CONVERSION_FACTOR { get; set; }
        public string PAR_UOM { get; set; }
        public string CONV_RATE_PAR_TO_ISSUE_CF { get; set; }
        public string LOT_SERIAL_DISABLE { get; set; }
        public string CART_INVENTOR { get; set; }
        public string CART_INVENTORY_ITEM { get; set; }

       
    }
}
