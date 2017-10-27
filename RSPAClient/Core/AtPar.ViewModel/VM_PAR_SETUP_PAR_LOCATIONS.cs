using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_PAR_SETUP_PAR_LOCATIONS
    {
        public string ORG_ID { get; set; }
        public string PAR_LOC_ID { get; set; }
        public string BIN_LOC { get; set; }
        public string ITEM_ID { get; set; }
        public Nullable<int> COUNT_ORDER { get; set; }
        public Nullable<double> OPTIMAL_QTY { get; set; }
        public string COUNT_REQUIRED { get; set; }
        public string FILL_KILL_FLAG { get; set; }
        public string ORDERING_TYPE { get; set; }
        public Nullable<double> MAX_QTY { get; set; }
        public Nullable<double> FOQ_QTY { get; set; }
        public string UNIT_OF_ISSUE { get; set; }
        public string UNIT_OF_PROCUREMENT { get; set; }
        public Nullable<double> CONVERSION_RATE { get; set; }
        public string LOT_CONTROLLED { get; set; }
        public string SERIAL_CONTROLLED { get; set; }
        public string USER_FIELD_1 { get; set; }
        public Nullable<int> REPLENISHMENT_TYPE { get; set; }
        public string CHARGE_CODE { get; set; }
        public string COST_CENTER { get; set; }
        public string STATUS { get; set; }
        public string INV_BUSINESS_UNIT { get; set; }
        public string REQUISITION_TYPE { get; set; }
        public string SHORT_DESCR { get; set; }
        public string ORG_GROUP_ID { get; set; }
        public bool SUBSTITUTE_ITEM_FLG { get; set; }
        public Nullable<double> CONV_FACTOR { get; set; }
        public string LOCDTLSUOI { set; get; }
        public string ITMUOI { get; set; }
        public string LOCDTLSUOP { get; set; }
        public Nullable<double> LOCDTLSCONVRATE { get; set; }
        public string LOCDTLSSRCNTRL { get; set; }
        public string LOCDTLSLOTCNTRL { get; set; }
        public int LOCDTLSRPTYPE { get; set; }
        public string LOCDTLCCODE { get; set; }
        public string LOCDTLSPARUOM { get; set; }
        public Nullable<double> LOCDTLSPARCONVRATE { get; set; }

    }
}
