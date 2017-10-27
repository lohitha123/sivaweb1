using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class RM_PKPL_HEADER
    {
        public string BUSINESS_UNIT { get; set; }
        public string INV_BUSINESS_UNIT { get; set; }
        public int PICK_BATCH_ID { get; set; }
        public string ORDER_NO { get; set; }
        public string SHIP_TO_CUST_ID { get; set; }
        public string SHIP_CUST_NAME { get; set; }
        public string SHIPMENT_NBR { get; set; }
        public string LOCATION { get; set; }
        public string DEMAND_SOURCE { get; set; }
        public string SOURCE_BUNIT { get; set; }
    }
}
