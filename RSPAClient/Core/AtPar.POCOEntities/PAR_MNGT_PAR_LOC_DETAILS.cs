using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class PAR_MNGT_PAR_LOC_DETAILS
    {
        public string ORG_ID { get; set; }
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

        //Ignored Value
        public string PREV_BIN_LOC { get; set; }
        public string RECORDTYPE { get; set; }
        public string PREV_OPTIMAL_QTY { get; set; }
        public string PREV_ITM_ID { get; set; }
    }
}
