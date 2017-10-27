using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_CYCT_ITEM_UOM_MASTER
    {
        public int TRANSACTION_ID { get; set; }
        public string ITEM_REC_NUM { get; set; }
        public string INV_ITEM_ID { get; set; }
        public string UOM { get; set; }
        public Nullable<double> CONVERSION_RATE { get; set; }
        public string UOM_TYPE { get; set; }
    }
}
