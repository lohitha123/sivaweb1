using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_CHARGECAPTURE_HEADER
    {
        public long TRANSACTION_ID { get; set; }
        public string PATIENT_ID { get; set; }
        public System.DateTime CAPTURE_DATE_TIME { get; set; }
        public string USER_ID { get; set; }
        public string ACCOUNT_ID { get; set; }
        public string EXAM_ID { get; set; }
        public string COMMENTS { get; set; }
        public bool REVIEWED { get; set; }
        public string DEPARTMENT_ID { get; set; }
        public string WORKSTATION_ID { get; set; }
        public Nullable<System.DateTime> MM_LAST_STATUS_DATE { get; set; }
        public string MM_STATUS { get; set; }
        public Nullable<System.DateTime> CHARGE_LAST_STATUS_DATE { get; set; }
        public string CHARGE_STATUS { get; set; }
        public string REVIEW_USER_ID { get; set; }
        public Nullable<System.DateTime> REVIEW_DATE { get; set; }
        public string PHYSICIAN_ID { get; set; }
        public string REASON_CODE { get; set; }
        public string OTHER_DEPTID { get; set; }
        public string BED_NO { get; set; }
        public Nullable<short> TRANSACTION_TYPE { get; set; }
        public string CASE_ID { get; set; }
        public string PREF_LIST_ID { get; set; }
        public Nullable<int> APP_ID { get; set; }
        public string CRASH_CART_ID { get; set; }
    }
}
