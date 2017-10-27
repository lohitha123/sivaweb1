using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class TKIT_ORDER_HEADER
    {
        public string ORG_GROUP_ID { get; set; }
        public int ORDER_NUMBER { get; set; }
        public Nullable<System.DateTime> ORDER_DATE { get; set; }
        public string REQUESTOR_ID { get; set; }
        public string ORDER_STATUS { get; set; }
        public string ORDER_COMMENTS { get; set; }
        public int ITEM_COUNT { get; set; }
    }
}
