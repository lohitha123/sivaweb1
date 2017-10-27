using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_CASE_TRACK_HISTORY
    {
        public long ID { get; set; }
        public string CASE_ID { get; set; }
        public string PREF_LIST_ID { get; set; }
        public string PROCEDURE_CODE { get; set; }
        public string PATIENT_ID { get; set; }
        public string DEPARTMENT_ID { get; set; }
        public Nullable<short> CASE_STATUS { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public string WORKSTATION_MAC_ADDRESS { get; set; }
        public System.DateTime UPDATE_DT_TIME { get; set; }
        public Nullable<short> CASE_PICK_STATUS { get; set; }
        public Nullable<int> TRANSACTION_ID { get; set; }
        public Nullable<int> CHARGE_CAPTURE_TRANS_ID { get; set; }
        public Nullable<System.DateTime> PERFORM_DATE { get; set; }
        public string COMMENTS { get; set; }
    }
}
