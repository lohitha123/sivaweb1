using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_TKIT_EQPITEMS
    {
        public string ITEM_ID { get; set; }
        public int CHK_VALUE { get; set; }
        public string ITEM_TYPE_INDICATOR { get; set; }
        public string ITEM_DESCR { get; set; }
        public Nullable<int> ITEM_QTY { get; set; }
        public string IMAGE { get; set; }
        public string COMMENTS { get; set; }
        public int ROW_INDEX { get; set; }
        public int SERIAL_NO { get; set; }   
        public string PATIENT_ID { get; set; }
        public string PATIENT_LAST_NAME { get; set; }
    }
}
