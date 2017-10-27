using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_MT_POU_ASSIGN_LOCATIONS
    {
        public string BUSINESS_UNIT { get; set; }
        public string LOCATION { get; set; }
        public string LOCATION_DESCR { get; set; }
        public string TYPE { get; set; }
        public int CHK_ALLOCATED { get; set; }
        public int CHK_VALUE { get; set; }
        public int ROWINDEX { get; set; }
        public int PERFORM_ACTION { get; set; }      
       
    }
}
