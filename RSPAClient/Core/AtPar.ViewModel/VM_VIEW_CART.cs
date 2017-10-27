using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_VIEW_CART
    {
        public int ID { get; set; }
        public string ITEM_ID { get; set; }
        public string ITEM_DESCR { get; set; }
        public string SERIAL_NO { get; set; }
        public Nullable<int> REQUEST_QTY { get; set; }
        public string LOCATION_ID { get; set; }
        public Nullable<System.DateTime> ESTIMATED_RETURN_DATE { get; set; }
        public Nullable<int> ITEM_QTY { get; set; }
        public string ITEM_TYPE_INDICATOR { get; set; }
        public string IMAGE { get; set; }
        public Nullable<System.DateTime> NEEDED_BY_DATE { get; set; }
        public string PATIENT_ID { get; set; }
        public string PATIENT_LAST_NAME { get; set; }
        public string PROCEDURE_CODE { get; set; }
    }
}
