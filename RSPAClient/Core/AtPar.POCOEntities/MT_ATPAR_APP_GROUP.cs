using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_APP_GROUP
    {
        public short GROUP_ID { get; set; }
        public string GROUP_NAME { get; set; }
        public short SEQ_NO { get; set; }
        public string IMAGE_PATH { get; set; }
        public string DESCRIPTION { get; set; }
    }
}