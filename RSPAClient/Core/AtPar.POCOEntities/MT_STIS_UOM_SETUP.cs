using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_STIS_UOM_SETUP
    {
        public string UOM { get; set; }
        public string DESCRIPTION { get; set; }
        public string STATUS { get; set; }
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER_ID { get; set; }
    }
}
