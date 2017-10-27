using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_MT_POU_CASE_CART_HEADER_TB
    {
        public string CASE_ID { get; set; }
        public string PATIENT_ID { get; set; }
        public string DESCRIPTION { get; set; }
        public string PHYSICIAN { get; set; }
        public string PREF_LIST_ID { get; set; }
        public string STATUS { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public Nullable<System.DateTime> CREATE_DATE { get; set; }
        public string CREATE_USER_ID { get; set; }
        public string ROOM_NO { get; set; }
        public Nullable<System.DateTime> PERFORM_DATE { get; set; }
        public string PROCEDURE_CODE { get; set; }
        public string EMERGENCY_CASE { get; set; }
        public string MERGED_CASE_ID { get; set; }
        public string DEPT_ID { get; set; }
        public Nullable<short> PROCESSED_FILE_TYPE { get; set; }
        public string COST_CENTER_CODE { get; set; }
        public string SERVICE_CODE { get; set; }

        public string CASE_DESC { get; set; }
        public string PHYSICIAN_NAME { get; set; }
        public string PROCEDURENAME { get; set; }
        public string PREFERENCENAME { get; set; }
        public string PATIENTNAME { get; set; }
        public string DEPTNAME { get; set; }
        public string SERVICENAME { get; set; }
        public string CHANGE_STATUS { get; set; }
        public string CHECKED { get; set; }
        public string REPLACE_CASE { get; set; }
        public string CURRENT_STATUS { get; set; }
        public string CHANGED_STATUS { get; set; }
        public string PATIENT_BARCODE { get; set; }
    }
}
