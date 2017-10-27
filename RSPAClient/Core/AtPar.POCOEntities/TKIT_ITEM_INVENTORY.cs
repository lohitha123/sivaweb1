using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class TKIT_ITEM_INVENTORY
    {
        public string ORG_GROUP_ID { get; set; }
        public string ASSET_ID { get; set; }
        public string ITEM_TYPE { get; set; }
        public string ITEM_ID { get; set; }
        public string SERIAL_NO { get; set; }
        public string LOT_NO { get; set; }
        public Nullable<int> ITEM_QTY { get; set; }
        public string STORAGE_LOCATION { get; set; }
        public Nullable<System.DateTime> SERVICE_DT_TIME { get; set; }
        public Nullable<bool> STATUS { get; set; }
        public string USER_FIELD_1 { get; set; }
        public string USER_FIELD_2 { get; set; }
        public Nullable<bool> AVAILABILITY { get; set; }
        public Nullable<System.DateTime> CHECKIN_DATE { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string UPDATE_USER_ID { get; set; }

        //Ignore
        public int ROW_INDEX { get; set; }

       // public Nullable<bool> Disable {get;set;}


    }
}
