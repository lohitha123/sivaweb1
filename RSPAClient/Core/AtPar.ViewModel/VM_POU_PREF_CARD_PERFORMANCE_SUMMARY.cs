using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
  public class VM_POU_PREF_CARD_PERFORMANCE_SUMMARY
    {
        public string PERFORM_DATE { get; set; }
        public string CASE_ID { get; set; }
        public string CASE_DESC { get; set; }
        public double? QAPREPICKADD { get; set; }
        public double? PICKED { get; set; }
        public double? ADDEDDURINGPICK { get; set; }
        public double? ISSUEDAFTERPICK { get; set; }     
        public double? RETURNED { get; set; }
        public double? WASTED { get; set; }
        public double? TOTALCONSUMED { get; set; }


    }
}
