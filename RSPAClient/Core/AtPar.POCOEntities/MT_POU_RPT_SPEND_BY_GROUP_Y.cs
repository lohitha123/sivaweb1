using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_RPT_SPEND_BY_GROUP_Y
    {
        public string SPECIALTY_CODE { get; set; }
        public string DIAGNOSIS_CODE { get; set; }
        public string DIAGNOSIS_DESCRIPTION { get; set; }
        public int DIAGNOSIS_CODE_TYPE { get; set; }       
        public string PHYSICIAN_ID { get; set; }
        public string PHYSICIAN_NAME { get; set; }
        public Nullable<long> NO_OF_ITEMS_BY_ITEM_GROUP { get; set; }
        public string ITEM_GROUP { get; set; }
        public string ITEM_GROUP_DESCRIPTION { get; set; }
        public Nullable<long> TOTAL_NO_OF_CASES_PHYSICIAN { get; set; }
        public Nullable<double> TOTAL_COST_ITEM_GROUP { get; set; }
        public int YEAR { get; set; }
    }
}
