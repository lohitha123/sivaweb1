using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
   public class VM_POU_PHYSICIAN_USAGE_HEADER
    {
        public string PHYSICIAN_ID { get; set; }
        public string PHYSICIAN_NAME { get; set; }
        public string EXAM_ID { get; set; }
        public string PREF_LIST_ID { get; set; }
        public string CASE_ID { get; set; }
        public string PERFORM_DATE { get; set; }
        public double? TOTALCOST { get; set; }
        public double? UNUSEDCOST { get; set; }
        public double? RETURNCOST { get; set; }
        public string PROCEDURE_CODE { get; set; }

    }
}
