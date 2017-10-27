using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
  public  class VM_MT_CYCT_EVENT_DETAIL
    {
        public string ITEM_ID { get; set; }
        public string STORAGE_AREA { get; set; }
        public string STOR_LEVEL_1 { get; set; }
        public string STOR_LEVEL_2 { get; set; }
        public string STOR_LEVEL_3 { get; set; }
        public string STOR_LEVEL_4 { get; set; }
        public string UNIT_OF_MEASURE { get; set; }
        public string CONTAINER_ID { get; set; }
        public string SERIAL_ID { get; set; }
        public string INV_LOT_ID { get; set; }
        public Nullable<double> COUNT_QTY { get; set; }
        public string COUNT_DTTM { get; set; }
        public string STAGED_DATE { get; set; }//changed from nullable<datetime> to string
        public string CUST_ITEM_NO { get; set; }
        public Nullable<double> COUNT_QTY1 { get; set; }
        public Nullable<double> COUNT_QTY2 { get; set; }
        public string STD_PACK_UOM { get; set; }
    }
}
