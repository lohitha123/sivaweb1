using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POCOEntities
{
    public class MT_CRCT_TWO_BIN_ALLOCATION
    {
        public string BUSINESS_UNIT { get; set; }
        public string CART_ID { get; set; }
        public string DESCR { get; set; }
        public string TWO_BIN_ALLOCATION { get; set; }
        public string DEF_PERCENTAGE_VALUE { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public DateTime UPDATE_DATE { get; set; }

        public int CHK_VALUE { get; set; }
        public int CHK_ALLOCATED { get; set; }
        public int ROWINDEX { get; set; }
    }
}
