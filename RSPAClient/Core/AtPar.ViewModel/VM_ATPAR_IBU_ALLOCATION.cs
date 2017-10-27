using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_ATPAR_IBU_ALLOCATION
    {
        public string INV_LOC_BUSINESS_UNIT { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string DESCR { get; set; }
        public string USER_ID { get; set; }
        public int ROWINDEX { get; set; }
        public int CHK_VALUE { get; set; }
        public int CHK_ALLOCATED { get; set; }
        public string DEFAULT_PRINTER { get; set; }

        public string COUNT_FLAG { get; set; }
        public string CHK_ALLOCATED_CNTFLG { get; set; }
        public int ROWINDEXFORCNTFLG { get; set; }
        public string ALLOW_SIC_CONSIGN { get; set; }
        public string CHK_ALLOCATED_CONSFLG { get; set; }
        public int ROWINDEXFORCONSFLG { get; set; }
        public string BU_TYPE { get; set; }
    }
}
