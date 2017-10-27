using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_APP
    {
        public short APP_ID { get; set; }
        public string APP_NAME { get; set; }
        public string APP_IMAGE_PATH { get; set; }
        public short GROUP_ID { get; set; }
        public string CLIENT_USER { get; set; }
        public string SERVER_USER { get; set; }
    }
}
