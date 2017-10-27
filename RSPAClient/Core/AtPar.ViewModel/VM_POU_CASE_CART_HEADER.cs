using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_POU_CASE_CART_HEADER
    {
        public string CASE_ID { get; set; }
        public string PATIENT_ID { get; set; }
        public string DESCRIPTION { get; set; }
        public string PHYSICIAN { get; set; }
        public string PREF_LIST_ID { get; set; }
        public Nullable<short> STATUS { get; set; }
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

        //Ignore properties
        public string CASEDESCR { get; set; }
        public string PHYSICIAN_DESCR { get; set; }
        public string PROC_DESCR { get; set; }
        public string PREF_DESCR { get; set; }
    }
}
