using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
   public class VM_RECV_POHEADER
    {       
        public string BUSINESS_UNIT { get; set; }
        public string PO_NO { get; set; }
        public string PACKSLIP_SEL_INVOICE_NO { get; set; }
        public string TOTAL_PO { get; set; }
        public string SHIP_TO_ID { get; set; }
        public string TRANS_ID { get; set; }
        public string INCLUDE_ALL_PO_LINES { get; set; }
        public string SELECTED_PAK_SLIP_NO { get; set; }
        public string RECEIVER_ID { get; set; }
    }
}
