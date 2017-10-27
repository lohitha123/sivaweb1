using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_BILLONLY_ITEMS
    {
        public string ITEM_ID { get; set; }
        public string ORG_GROUP_ID { get; set; }
        public string DEPT_ID { get; set; }
        public string DESCRIPTION { get; set; }
        public string UPC_ID { get; set; }
        public string MFG_ITEM_ID { get; set; }
        public string VEND_ITEM_ID { get; set; }
        public string MANUFACTURER { get; set; }
        public string VENDOR_ID { get; set; }
        public string LOT_ID { get; set; }
        public string SERIAL_ID { get; set; }
        public Nullable<System.DateTime> EXPIRY_DATE { get; set; }
        public bool CATALOG_FLG { get; set; }
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public Nullable<double> ITEM_PRICE { get; set; }
        public string UOM { get; set; }
        public string GTIN { get; set; }
        //ignore properties
        public string ITEMDESCR { get; set; }
    }
}
