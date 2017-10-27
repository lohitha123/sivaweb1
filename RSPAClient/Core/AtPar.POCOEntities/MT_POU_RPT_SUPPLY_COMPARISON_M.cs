using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_RPT_SUPPLY_COMPARISON_M
    {
        public string SPECIALTY_CODE { get; set; }
        public string DIAGNOSIS_CODE { get; set; }
        public string DIAGNOSIS_DESCRIPTION { get; set; }
        public int DIAGNOSIS_CODE_TYPE { get; set; }
        public string PHYSICIAN_ID { get; set; }
        public string PHYSICIAN_NAME { get; set; }
        public string ITEM_GROUP { get; set; }
        public string ITEM_GROUP_DESCRIPTION { get; set; }
        public string ITEM_ID { get; set; }
        public string ITEM_DESCRIPTION { get; set; }
        public string MFR_CATALOG_NO { get; set; }
        public Nullable<double> UNIT_COST { get; set; }
        public Nullable<long> NO_OF_TIMES_ITEM_USED_BY_PHY { get; set; }
        public int MONTH { get; set; }
        public int YEAR { get; set; }
    }
}
