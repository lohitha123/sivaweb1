using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_CASE_CART_HEADER
    {
        public string CASE_ID { get; set; }
        public string PATIENT_ID { get; set; }
        public string DESCRIPTION { get; set; }
        public string PHYSICIAN { get; set; }
        public string PREF_LIST_ID { get; set; }
        public string STATUS { get; set; }
        public string UPDATE_DATE { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public string CREATE_DATE { get; set; }
        public string CREATE_USER_ID { get; set; }
        public string ROOM_NO { get; set; }
        public string PERFORM_DATE { get; set; }
        public string PROCEDURE_CODE { get; set; }
        public string EMERGENCY_CASE { get; set; }
        public string MERGED_CASE_ID { get; set; }
        public string DEPT_ID { get; set; }
        public short? PROCESSED_FILE_TYPE { get; set; }
        public string COST_CENTER_CODE { get; set; }
        public string SERVICE_CODE { get; set; }

        public string PROCEDURE_ID { get; set; }

      
       
        //Ignore properties
        public string CASEDESCR { get; set; }
        public string PHYSICIAN_DESCR { get; set; }
        public string PROC_DESCR { get; set; }
        public string PREF_DESCR { get; set; }
    }
}
