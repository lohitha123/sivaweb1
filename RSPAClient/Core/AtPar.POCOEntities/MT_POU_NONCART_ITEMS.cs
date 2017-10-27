using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_NONCART_ITEMS
    {
        public string ITEM_ID { get; set; }
        public string MANUFACTURE_ITEM_ID { get; set; }
        public string VENDOR_ITEM_ID { get; set; }
        public string CUST_ITEM_ID { get; set; }
        public string ITEM_DESCRIPTION { get; set; }
        public string COUNT_ORDER { get; set; }
        public Nullable<double> OPTIMUM_QTY { get; set; }
        public string CHARGE_CODE { get; set; }
        public string UOM { get; set; }
        public string LOT_CONTROLLED { get; set; }
        public string SERIALIZED { get; set; }
        public string UPC_ID { get; set; }
        public Nullable<double> ITEM_PRICE { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string CART_ID { get; set; }
        public string COMPARTMENT { get; set; }
        public string REPLENISHMENT_CTRL { get; set; }
        public string MANUFACTURER { get; set; }
        public string VENDOR { get; set; }
        public string PATIENT_CHARGEABLE { get; set; }
        public string SAMPLE { get; set; }
        public string STATUS { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string GTIN { get; set; }
        public string VENDOR_ID { get; set; }
        public double CONV_RATE_PAR_TO_ISSUE { get; set; }
        public string ISSUE_UOM { get; set; }


    }
}
