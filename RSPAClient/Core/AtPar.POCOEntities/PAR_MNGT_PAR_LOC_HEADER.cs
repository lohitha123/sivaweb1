using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class PAR_MNGT_PAR_LOC_HEADER
    {
        public string ORG_ID { get; set; }
        public string PAR_LOC_ID { get; set; }
        public string LOCATION_NAME { get; set; }
        public string CART_TYPE { get; set; }
        public string COST_CENTER_CODE { get; set; }
        public Nullable<bool> STATUS { get; set; }
        public string POU_CART { get; set; }
        public string ASSET_ACCOUNT { get; set; }
        public string SHIPTO_ID { get; set; }
        public string DELV_LOC_ID { get; set; }
        public string DELV_LOC_ADDRESS_1 { get; set; }
        public string DELV_LOC_ADDRESS_2 { get; set; }
        public string DELV_LOC_CITY { get; set; }
        public string DELV_LOC_STATE { get; set; }
        public string DELV_LOC_ZIP { get; set; }
        public string DELV_LOC_COUNTRY { get; set; }
        public System.DateTime LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }
        public Nullable<bool> PERPECTUAL_IN_MMIS { get; set; }
        public string PARLOC_TYPE { get; set; }
    }
}
