using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class RM_STIS_ALT_UOMS
    {
        public string BUSINESS_UNIT { get; set; }
        public string ITEM_ID { get; set; }
        public string UOM { get; set; }
        public double CONV_FAC { get; set; }
    }
}
