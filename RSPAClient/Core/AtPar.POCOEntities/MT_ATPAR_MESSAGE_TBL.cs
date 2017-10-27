using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_MESSAGE_TBL
    {
        public int MESSAGE_ID { get; set; }
        public string FROM_USER { get; set; }
        public string TO_USER { get; set; }
        public string MESSAGE_TEXT { get; set; }
        public Nullable<System.DateTime> CREATED_DATE { get; set; }
        public Nullable<System.DateTime> SERVER_DELIVERED_DATE { get; set; }
        public Nullable<System.DateTime> FINAL_DELIVERED_DATE { get; set; }
        public Nullable<System.DateTime> READ_DATE { get; set; }
        public Nullable<System.DateTime> DELETED_DATE { get; set; }
        public string STATUS { get; set; }
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
    }
}
