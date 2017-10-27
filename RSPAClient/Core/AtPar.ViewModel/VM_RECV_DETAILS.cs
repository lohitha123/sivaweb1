using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
   public class VM_RECV_DETAILS
    {
        public string ITEMID_DESC { get; set; }
        public string UNIT_OF_MEASURE { get; set; }
        public string RECV_UOM { get; set; }
        public Nullable<double> QTY_PO { get; set; }
        public Nullable<double> OPENQTY { get; set; }
        public Nullable<double> QTY { get; set; }
        public string STORAGE_LOCATION { get; set; }
        public Nullable<double> RECV_CONVERSION_RATE { get; set; }
        public string MFG_ITEM_ID { get; set; }
        public string ITM_ID_VNDR { get; set; }
        public string REQ_NUM { get; set; }
    }
}
