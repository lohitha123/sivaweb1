using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_INVENTORY_ITEM_DETAILS
    {
        public string ORG_ID { get; set; }
        public string INV_ITEM_ID { get; set; }
        public string SHORT_DESCR { get; set; }
        public string UOM { get; set; }
        public string STOR_LOC { get; set; }
        public string ALT_STOR_LOC1 { get; set; }
        public string ALT_STOR_LOC2 { get; set; }
        public string CHARGE_CODE { get; set; }
        public string LOT_ID { get; set; }
        public string SERIAL_ID { get; set; }
        public Nullable<int> QUANTITY_ON_HAND { get; set; }
        public string REPLENISHMENT_TYPE { get; set; }
        public Nullable<bool> STATUS { get; set; }

        //ignore
        public string DEFAULT_LOC_FLAG { get; set; }
    }
}
