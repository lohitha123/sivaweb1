using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
   public class VM_POU_GETCASEREVIEW_RPT_CASE_ITEM_LOTSERIAL_DETAILS
    {
        public string ITEM { get; set; }
        public string LOT_NUMBER { get; set; }
        public string SERIAL_NUMBER { get; set; }
        public string EXPIRY_DATE { get; set; }
        public Nullable<DateTime> UPDATE_DATE { get; set; }
        public string TRANSACTION_DATE { get; set; }
        public string TRANSACTION_TIME { get; set; }
        public string USER_ID { get; set; }
        public double? OPEN_QTY { get; set; }
        public double? HOLD_QTY { get; set; }
        public double? ADDED_PREPICK_QA { get; set; }
        public double? ADDED_DURING_PICK { get; set; }
        public double? TOTAL_PICKED { get; set; }
        public double? ISSUED_AFTER_PICK { get; set; }
        public double? RETURNED { get; set; }
        public double? WASTED { get; set; }
        public double? CONSUMED { get; set; }
    }
}
