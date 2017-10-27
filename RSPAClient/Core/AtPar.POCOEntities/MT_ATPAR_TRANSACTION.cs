using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_TRANSACTION
    {
        public int TRANSACTION_ID { get; set; }
        public short APP_ID { get; set; }
        public string ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string DESCR { get; set; }
        public Nullable<short> STATUS { get; set; }
        public Nullable<short> TOTAL_REC_DOWNLOADED { get; set; }
        public Nullable<short> TOTAL_REC_SENT { get; set; }
        public Nullable<int> STATUS_CODE { get; set; }
        public Nullable<System.DateTime> DOWNLOAD_DT_TIME { get; set; }
        public Nullable<System.DateTime> START_DT_TIME { get; set; }
        public Nullable<System.DateTime> END_DT_TIME { get; set; }
        public Nullable<System.DateTime> UPDATE_DT_TIME { get; set; }      
        public string USER_ID { get; set; }
        public string DOWNLOAD_USERID { get; set; }
        public string DEVICE_ID { get; set; }
        public Nullable<short> SCANS_COUNT { get; set; }
        public string REPORT_DATA_1 { get; set; }
        public string REPORT_DATA_2 { get; set; }
        public string REPORT_DATA_3 { get; set; }
        public string REPORT_DATA_4 { get; set; }
        public string REPORT_DATA_5 { get; set; }
        public Nullable<System.DateTime> REPORT_DATA_6 { get; set; }
        public Nullable<System.DateTime> REPORT_DATA_7 { get; set; }
        public string REPORT_DATA_8 { get; set; }
        public Nullable<float> REPORT_DATA_9 { get; set; }
        public Nullable<float> REPORT_DATA_10 { get; set; }
        public Nullable<float> REPORT_DATA_11 { get; set; }
        public string REPORT_DATA_12 { get; set; }
        public string REPORT_DATA_13 { get; set; }
        public string USERNAME { get; set; }
        public string UID { get; set; }

        //Ignore Properties
        public string UPDATE_DAY { get; set; }
        public string UPDATE_HOUR { get; set; }
        public string UPDATE_MINUTE { get; set; }
        public string DATESTRING { get; set; }
        public string CASE_ID { get; set; }
        public string PROCEDURE_CODE { get; set; }
        public string PREF_ID { get; set; }
        public Nullable<System.DateTime> PERFORM_DATE { get; set; }

    }
}
