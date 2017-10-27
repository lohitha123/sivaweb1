using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_POU_GETCASEREVIEW_RPT_CASE_ITEM_INFO
    {
        public string ITEM { get; set; }
        public string ITEM_DESCRIPTION { get; set; }
        public double? ITEM_COST { get; set; }
        public double? PICKED { get; set; }
        public double? ISSUED_DURING_PROCEDURE { get; set; }
        public double? RETURNED { get; set; }
        public double? WASTED { get; set; }
        public double? CONSUMED { get; set; }
        public double? CONSUMED_COST { get; set; }

    }
}
