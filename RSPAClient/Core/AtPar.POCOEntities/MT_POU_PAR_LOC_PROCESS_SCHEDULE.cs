using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_PAR_LOC_PROCESS_SCHEDULE
    {
        public string ORG_ID { get; set; }
        public string ID { get; set; }
        public string SCHEDULE_ID { get; set; }
        public string REVIEW_CHARGES { get; set; }
        public System.DateTime LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }
        public Nullable<byte> BILLING_OPTION { get; set; }
        public short PROCESS_TYPE { get; set; }
        public Nullable<int> APP_ID { get; set; }


        //Ignore Properties
        public bool CHK_VALUE { get; set; }
        public string DESCRIPTION { get; set; }
        public int ROW_INDEX { get; set; }
        public string SOURCELOCATIONS { get; set; }
        public string DEPT_NAME { get; set; }
        public string LOW_STK_SCHEDULE_ID { get; set; }
        public string EXP_SCHEDULE_ID { get; set; }
        public string RECALL_SCHEDULE_ID { get; set; }
        public string BILLONLY_SCHEDULE_ID { get; set; }
        public short? REPLENISH_FROM { get; set; }

        //public string M_BUSINESS_UNIT { get; set; }

        //public string M_LOCATION { get; set; }

        //public string LOCATION { get; set; }

        //public string BUSINESS_UNIT { get; set; }
        //public string PERFORM_ACTION { get; set; }
        public string INV_INTERFACE_ENABLE { get; set; }
        public string BILLING_ENABLE { get; set; }



    }
}
