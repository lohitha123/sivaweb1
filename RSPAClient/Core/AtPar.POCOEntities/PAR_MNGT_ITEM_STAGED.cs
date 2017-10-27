using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class PAR_MNGT_ITEM_STAGED
    {
        public string ORG_GROUP_ID { get; set; }
        public string ITEM_ID { get; set; }
        public string CUST_ITEM_ID { get; set; }
        public string SHORT_DESCR { get; set; }
        public string LONG_DESCR { get; set; }
        public string VENDOR_ID { get; set; }
        public string MANUFACTURER { get; set; }
        public string MFG_ITEM_ID { get; set; }
        public string VEND_ITEM_ID { get; set; }
        public string UNIT_OF_PROCUREMENT { get; set; }
        public string UNIT_OF_ISSUE { get; set; }
        public Nullable<double> CONV_FACTOR { get; set; }
        public Nullable<double> ITEM_PRICE { get; set; }
        public string UPC_CODE { get; set; }
        public Nullable<bool> STATUS { get; set; }
        public string SERIAL_CONTROLLED { get; set; }
        public string LOT_CONTROLLED { get; set; }
        public string CHARGE_CODE { get; set; }
        public bool LATEX_FREE { get; set; }
        public string CUST_ITEM_DESCR { get; set; }
        public string ITEM_CATEGORY { get; set; }
        public string USER_FIELD_1 { get; set; }
        public string USER_FIELD_2 { get; set; }
        public string REPLENISHMENT_TYPE { get; set; }
        public System.DateTime LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }
        public Nullable<int> LEAD_TIME { get; set; }
        public bool CATALOG_FLG { get; set; }
        public bool PHARMACY_FLG { get; set; }
        public bool SUBSTITUTE_ITEM_FLG { get; set; }
        public string STRENGTH { get; set; }
        public string DOSAGE { get; set; }
        public bool EVERIFY_FLG { get; set; }
        public Nullable<int> CINDEX { get; set; }
        public string GTIN { get; set; }
        public string IMPLANT_FLAG { get; set; }
    }
}
