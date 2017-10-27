using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_PAR_MNGT_PAR_LOCATION
    {
        public string ORG_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string PAR_LOC_ID { get; set; }
        public string BIN_LOC { get; set; }
        public string ITEM_ID { get; set; }
        public string STATUS { get; set; }
        public Nullable<int> COUNT_ORDER { get; set; }
        public Nullable<double> OPTIMAL_QTY { get; set; }
        public string COUNT_REQUIRED { get; set; }
        public Nullable<int> REPLENISHMENT_TYPE { get; set; }
        public string FILL_KILL_FLAG { get; set; }
        public string LOT_CONTROLLED { get; set; }
        public string SERIAL_CONTROLLED { get; set; }
        public Nullable<double> MAX_QTY { get; set; }
        public Nullable<double> FOQ_QTY { get; set; }
        public string ORDERING_TYPE { get; set; }
        public string CHARGE_CODE { get; set; }
        public string COST_CENTER { get; set; }
        public string UNIT_OF_ISSUE { get; set; }
        public Nullable<double> CONVERSION_RATE { get; set; }
        public string USER_FIELD_1 { get; set; }
        public System.DateTime LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }
        public string INV_BUSINESS_UNIT { get; set; }
        public string REQUISITION_TYPE { get; set; }
        public string UNIT_OF_PROCUREMENT { get; set; }
        public string USER_FIELD_2 { get; set; }
        public string PAR_UOM { get; set; }
        public Nullable<double> CONV_RATE_PAR_UOM { get; set; }
        public string PARDESC { get; set; }
        public string ITEMDESC { get; set; }
        public Nullable<double> ITEM_PRICE { get; set; }
        public Nullable<double> CONV_FACTOR { get; set; }
        public bool SUBSTITUTE_ITEM_FLG { get; set; }
    }
}
