using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
   public class VM_DELV_DELIVERY_REPORT
    {

        public int TRANSACTION_ID { get; set; }
        public string CURRENT_STATUS_USER { get; set; }
        public int STATUS { get; set; }
        public string PO_ID { get; set; }
        public Nullable<int> EVENT_ID { get; set; }
        public string REPORT_DATA_1 { get; set; }
        public int LINE_NO { get; set; }
        public string REPORT_DATA_3 { get; set; }
        public string REPORT_DATA_31 { get; set; }
        public string CARRIER_ID { get; set; }
        public string DEPT_ID { get; set; }
        public Nullable<System.DateTime> HAND_OVER_DATE { get; set; }
        public string HANDOVERUSER { get; set; }
        public string DELIVERED_TO { get; set; }
        public int TRANS_ID { get; set; }
        public int DELIVER_NON_PO { get; set; }
        public int SCH_LINE_NO { get; set; }
        public int SIGNATURE_ID { get; set; }
        public string RECEIVER_NAME { get; set; }
        public string REPORT_DATA_19 { get; set; }
        public string REPORT_DATA_20 { get; set; }
        public string REPORT_DATA_8 { get; set; }
        public string REPORT_DATA_10 { get; set; }
        public string KEY_4 { get; set; }
        public Nullable<System.DateTime> UPDATE_DT_TIME { get; set; }
        public string VENDOR_NAME { get; set; }
        public Nullable<System.DateTime> RECEIPT_DATE { get; set; }
        public string LOCATION { get; set; }
        public string OLD_LOCATION { get; set; }
        public string ITEM_ID { get; set; }
        public string PALLET { get; set; }
        public Nullable<double> QTY { get; set; }
        public string DELIVERY_LOCATION { get; set; }
        public string DOWNLOAD_USER_ID { get; set; }
        public string RECEIVE_USERID { get; set; }
        public Nullable<System.DateTime> DOWNLOAD_DT_TIME { get; set; }
        public string DELIVERED_BY { get; set; }
        public string EVENT_USER_ID { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string PICKUP_USER { get; set; }
        public string COMMENTS { get; set; }
        public string HDR_COMMENTS { get; set; }
        public string REDELIVER { get; set; }
        public string ITEM_NOTES { get; set; }

    }
}
