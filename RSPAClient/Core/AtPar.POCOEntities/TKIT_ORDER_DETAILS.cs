using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class TKIT_ORDER_DETAILS
    {
        public string ORG_GROUP_ID { get; set; }
        public int ORDER_NUMBER { get; set; }
        public int ORDER_LINE_NUMBER { get; set; }
        public string PATIENT_ID { get; set; }
        public string ITEM_ID { get; set; }
        public string ITEM_DESCR { get; set; }
        public Nullable<int> REQUEST_QTY { get; set; }
        public string LOCATION_ID { get; set; }
        public Nullable<System.DateTime> REQUEST_FOR_USE_DATE { get; set; }
        public Nullable<System.DateTime> SHIP_DATE { get; set; }
        public Nullable<System.DateTime> DELIVER_DATE { get; set; }
        public Nullable<int> DELIVER_QTY { get; set; }
        public string DELIVER_ITEM_STATUS { get; set; }
        public Nullable<int> RETURN_QTY { get; set; }
        public Nullable<System.DateTime> RETURN_DATE { get; set; }
        public string RECIPIENT { get; set; }
        public Nullable<System.DateTime> NEEDED_BY_DATE { get; set; }
        public Nullable<System.DateTime> CANCEL_DATE { get; set; }
        public string PATIENT_LAST_NAME { get; set; }
        public string PROCEDURE_CODE { get; set; }
        public Nullable<System.DateTime> ESTIMATED_RETURN_DATE { get; set; }
        public string IMAGE { get; set; }         
        public string CHK_VALUE { get; set; }
        public string VENDOR { get; set; }
    }
}
