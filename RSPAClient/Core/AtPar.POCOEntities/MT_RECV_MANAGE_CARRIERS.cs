using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_RECV_MANAGE_CARRIERS
    {
        public string SEARCH_STRING { get; set; }
        public int START_POSITION { get; set; }
        public string CARRIER { get; set; }
        public bool STATUS { get; set; }
        public string CREATE_USERID { get; set; }
        public Nullable<System.DateTime> CREATE_DATE { get; set; }
        public string UPDATE_USERID { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
    }
}
