using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class TKIT_CART_MANAGER
    {
        public int ID { get; set; }
        public string ORG_GROUP_ID { get; set; }
        public string REQUESTOR_ID { get; set; }
        public string ITEM_ID { get; set; }
        public string ITEM_DESCR { get; set; }
        public Nullable<int> REQUEST_QTY { get; set; }
        public string LOCATION_ID { get; set; }
        public string PATIENT_ID { get; set; }
        public Nullable<System.DateTime> REQUEST_FOR_USE_DATE { get; set; }
        public Nullable<System.DateTime> NEEDED_BY_DATE { get; set; }
        public string PATIENT_LAST_NAME { get; set; }
        public string PROCEDURE_CODE { get; set; }
        public Nullable<System.DateTime> ESTIMATED_RETURN_DATE { get; set; }
        public string SERIAL_NO { get; set; }
    }
}
