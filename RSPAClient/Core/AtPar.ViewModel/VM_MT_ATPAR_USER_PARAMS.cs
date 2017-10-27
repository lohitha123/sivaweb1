using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
   public class VM_MT_ATPAR_USER_PARAMS
    {
        public string PARAMETER_ID { get; set; }
        public string PARAMETER_VALUE { get; set; }
        public string LONG_DESCR { get; set; }
        public string SHORT_DESCR { get; set; }
        public string PARAMETER_TYPE { get; set; }
        public string VALIDATION { get; set; }
        public string MULTIPLE_VALUES { get; set; }
        public string REQUIRED_FLAG { get; set; }
        public string PROMPT_TABLE { get; set; }
        public string PROMPT_FIELD { get; set; }
        public string WHERE_CONDITION { get; set; }
    }
}
