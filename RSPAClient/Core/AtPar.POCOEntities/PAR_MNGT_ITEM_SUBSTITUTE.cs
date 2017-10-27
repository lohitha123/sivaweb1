using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class PAR_MNGT_ITEM_SUBSTITUTE
    {
        public string ORG_GROUP_ID { get; set; }
        public string ITEM_ID { get; set; }
        public string SUBSTITUTE_ITEM_ID { get; set; }
        public Nullable<double> PRIORITY { get; set; }
        public string ITEM_DESCR { get; set; }
        public Nullable<bool> STATUS { get; set; }
    }
}
