using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_PKPL_ORDER_PREFIX
    {
        public string ORDER_PREFIX { get; set; }
        public string PREFIX_DESCR { get; set; }

        //Ignore column
        public int CHK_VALUE { get; set; }
    }
}
