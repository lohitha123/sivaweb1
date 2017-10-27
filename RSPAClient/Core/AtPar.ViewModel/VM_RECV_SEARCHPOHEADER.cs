using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
  public  class VM_RECV_SEARCHPOHEADER
    {
        public string BUSINESS_UNIT { get; set; }
        public string ITEM_ID { get; set; }
        public string VENDOR_ID { get; set; }
        public string VENDOR_NAME { get; set; }
        public string SHIP_TO_ID { get; set; }
        public string FROM_DATE { get; set; }//DateTime
        public string TO_DATE { get; set; }//DateTime
        public string SEARCH_TYPE { get; set; }
        public string INCLUDE_ASN_POS { get; set; }
    }
}
