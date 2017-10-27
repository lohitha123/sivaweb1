using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class RM_STIS_DETAILS
    {
        public string BUSINESS_UNIT { get; set; }
        public string ITEM_ID { get; set; }
        public string ITEM_DESC { get; set; }
        public string CUSTOMER_ITEM_ID { get; set; }
        public string UPC_ID { get; set; }
        public string MFG_ITEM_ID { get; set; }
        public string VEND_ID { get; set; }
        public string VEND_ITEM_ID { get; set; }
        public string CONTAINER_ID { get; set; }
        public Nullable<System.DateTime> STORAGE_DATE { get; set; }
        public Nullable<System.DateTime> EXPIRY_DATE { get; set; }
        public string DEPT_ID { get; set; }
        public string UOM { get; set; }
        public string STDUOM { get; set; }
        public string LOTID { get; set; }
        public string SERIALID { get; set; }
        public string LOT_CONTROLLED { get; set; }
        public string SERIAL_CONTROLLED { get; set; }
        public double SYSTEM_QTY { get; set; }
        public string STORAGE_LOCATION { get; set; }
        public double PRICE { get; set; }
    }
}
