using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_PHYSICAL_INVENTORY
    {
        public string ORG_ID { get; set; }
        public string INV_ITEM_ID { get; set; }
        public string UOM { get; set; }
        public string STOR_LOC { get; set; }
        public string CHARGE_CODE { get; set; }
        public string LOT_ID { get; set; }
        public string SERIAL_ID { get; set; }
        public string DEFAULT_LOC_FLAG { get; set; }
        public Nullable<int> QUANTITY_ON_HAND { get; set; }
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
        public string REPLENISHMENT_TYPE { get; set; }
        public Nullable<bool> STATUS { get; set; }
    }
}
