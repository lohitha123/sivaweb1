using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_TKIT_TRANSACTION_DETAILS
    {
        public string ITEM_ID { get; set; }
        public string ITEM_DESCR { get; set; }
        public int ITEM_QTY { get; set; }
        public string SERIAL_NO { get; set; }
        public string KEY_2 { get; set; }
        public int ORDER_NO { get; set; }
        public string STORAGE_LOCATION { get; set; }
        public DateTime? CHECKIN_DATE { get; set; }
        public DateTime? UPDATE_DATE { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public DateTime? DESTRUCTION_DATE { get; set; }
        public bool ITEM_INACTIVATED { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public string OWNER { get; set; }
        public int TRANSACTION_ID { get; set; }
        public string CREATE_USERID { get; set; }
        public int REQUEST_QTY { get; set; }
        public int STATUS { get; set; }
        public string DEPT_ID { get; set; }
        public string DELIVERY_LOCATION { get; set; }
        public int EVENT_ID { get; set; }
        public string USER_ID { get; set; }
        public int ORDER_NUMBER { get; set; }
        public DateTime? ORDER_DATE { get; set; }
        public DateTime? SCAN_DATETIME { get; set; }
        public string SCAN_USER { get; set; }
    }
}



