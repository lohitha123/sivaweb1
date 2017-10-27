using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_MT_POU_ISSUED_DETAILS
    {
        public System.DateTime CAPTURE_DATE_TIME { get; set; }
        public string ITEM_ID { get; set; }
        public string ITEM_DESCRIPTION { get; set; }
        public string ITEM_LOTNUMBER { get; set; }
        public string ITEM_SRNUMBER { get; set; }
        public string PATIENT { get; set; }
        public double? CNT { get; set; }
    }
}
