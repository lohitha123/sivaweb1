using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_POU_CART_ITEM_SUBSTITUTE
    {
        public string CART_ID { get; set; }
        public string ITEM_ID { get; set; }
        public Nullable<double> ITEM_QUANTITY_PAR { get; set; }
        public Nullable<double> ITEM_QUANTITY_ON_HAND { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string LOT_NUMBER { get; set; }
        public string SERIAL_NUMBER { get; set; }
        public Nullable<System.DateTime> EXPIRY_DATE { get; set; }
        public Nullable<double> ACTUAL_QUANTITY { get; set; }
        public string COMPARTMENT { get; set; }
        public long ID { get; set; }
        public double QUANTITY_ON_HAND { get; set; }
        public Nullable<double> QOH { get; set; }
        public string ORG_GROUP_ID { get; set; }
        public string SUBSTITUTE_ITEM_ID { get; set; }
        public Nullable<double> PRIORITY { get; set; }
        public string ITEM_DESCR { get; set; }
        public Nullable<bool> STATUS { get; set; }
    }
}
