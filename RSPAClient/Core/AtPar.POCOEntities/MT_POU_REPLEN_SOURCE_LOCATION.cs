using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POCOEntities
{
    public class MT_POU_REPLEN_SOURCE_LOCATION
    {
        public string ORG_ID { get; set; }
        public string PAR_LOC_ID { get; set; }
        public string SOURCE_LOCATION { get; set; }
        public string SOURCE_ORG_ID { get; set; }
        public string ORG_GROUP_ID { get; set; }

        //Ignore Properties     

        public string M_BUSINESS_UNIT { get; set; }

        public string M_LOCATION { get; set; }

        public string LOCATION { get; set; }

        public string BUSINESS_UNIT { get; set; }
        public string PERFORM_ACTION { get; set; }

        public bool CHK_VALUE { get; set; }
    }
}
