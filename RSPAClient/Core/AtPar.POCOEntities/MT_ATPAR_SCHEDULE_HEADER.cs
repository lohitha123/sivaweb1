using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_SCHEDULE_HEADER
    {
        public string ORG_GROUP_ID { get; set; }
        public string SCHEDULE_ID { get; set; }
        public string DESCRIPTION { get; set; }
        public Nullable<short> STATUS { get; set; }
        public Nullable<short> SCHEDULE_TYPE { get; set; }
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }
        public string CREATED_USER { get; set; }
        public Nullable<System.DateTime> CREATED_DATE { get; set; }
        public Nullable<System.DateTime> START_TIME { get; set; }
        public Nullable<System.DateTime> END_TIME { get; set; }
        public Nullable<int> INTERVAL { get; set; }
    }
}
