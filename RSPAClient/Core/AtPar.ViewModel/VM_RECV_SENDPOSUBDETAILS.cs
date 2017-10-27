using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
   public class VM_RECV_SENDPOSUBDETAILS
    {
        public string LINE_NBR { get; set; }
        public string SCHED_NBR { get; set; }
        public string LOT_ID { get; set; }
        public string SERIAL_ID { get; set; }
        public string UNIT_OF_MEASURE { get; set; }
        public string CONVERSION_RATE { get; set; }
        public string EXPIRY_DATE { get; set; }
        public double QTY { get; set; }
    }
}
