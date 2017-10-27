using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_OBJECTS
    {
        public short APP_ID { get; set; }
        public string TABLE_NAME { get; set; }
        public string TABLE_TYPE { get; set; }
        public string PURGE_FLAG { get; set; }
        public string CONDITION_COLUMN { get; set; }
        public string COMMENTS { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string UPDATE_USER { get; set; }
    }
}
