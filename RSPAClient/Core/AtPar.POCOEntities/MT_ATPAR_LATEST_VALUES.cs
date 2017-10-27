using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_LATEST_VALUES
    {
        public short APP_ID { get; set; }
        public string FIELD_ID { get; set; }
        public Nullable<int> LATEST_VALUE { get; set; }
    }
}
