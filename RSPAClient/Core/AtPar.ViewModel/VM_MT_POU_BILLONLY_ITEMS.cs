using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
   public class VM_MT_POU_BILLONLY_ITEMS
    {
        public string ITEM_ID { get; set; }
        public string ORG_GROUP_ID { get; set; }
        public string DEPT_ID { get; set; }
        public string DESCRIPTION { get; set; }
        public string USER_ID { get; set; }
        public string KEYVALUE { get; set; }
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
        public string UOM_ISSUE { get; set; }
        public string UOM_PROCUREMENT { get; set; }
        public float CONV_FACTOR { get; set; }
        public float PRICE { get; set; }
        public char  STATUS { get; set; }
        public string SERIAL_CONTROLLED { get; set; }
        public string LOT_CONTROLLED { get; set; }
        public string CHARGE_CODE { get; set; }
        public string REPLENISHMENT_TYPE { get; set; }
        public string PAR_LOC_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string BIN { get; set; }
        public int COUNT_ORDER { get; set; }
        public float OPTIMAL_QTY { get; set; }
        public string COUNT_REQUIRED { get; set; }
        public string FILL_KILL_FLAG { get; set; }
        public float MAX_QTY { get; set; }
        public float FOQ_QTY { get; set; }
        public string ORDERING_TYPE { get; set; }
        public string COST_CENTER { get; set; }
        public string REQUISITION_TYPE { get; set; }
        public string USER_FIELD_1 { get; set; }
        public string PAR_UOM { get; set; }
        public float CONV_RT_PAR_UOM { get; set; }     


    }
}
