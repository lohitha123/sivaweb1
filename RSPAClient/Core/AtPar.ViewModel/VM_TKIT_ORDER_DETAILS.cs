using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_TKIT_ORDER_DETAILS
    {
        public int CHK_VALUE { get; set; }
        public int ORDER_NUMBER { get; set; }
        public int ORDER_LINE_NUMBER { get; set; }
        public Nullable<System.DateTime> ORDER_DATE { get; set; }
        public string DELIVER_ITEM_STATUS { get; set; }
        public string ITEM_ID { get; set; }
        public Nullable<int> REQUEST_QTY { get; set; }
        public string LOCATION_ID { get; set; }
        public string ESTIMATED_RETURN_DATE { get; set; }//Nullable<System.DateTime>
        public string ITEM_DESCR { get; set; }
        public string ORDER_COMMENTS { get; set; }
        public string IMAGE { get; set; }
        public string ITEM_TYPE_INDICATOR { get; set; }

    }
}
