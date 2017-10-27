using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_PROFILE_MENU
    {
        public string PROFILE_ID { get; set; }
        public short APP_ID { get; set; }
        public string MENU_CODE { get; set; }
        public Nullable<short> MENU_SEQ_NO { get; set; }
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }

        //Ignored Value
        public bool CHKSTATUS { get; set; }
    }
}
