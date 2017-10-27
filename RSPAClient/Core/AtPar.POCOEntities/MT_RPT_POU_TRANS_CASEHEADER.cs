using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_RPT_POU_TRANS_CASEHEADER
    {
        public Nullable<System.DateTime> CAPTURE_DATE_TIME { get; set; }
        public string ACCOUNT_ID { get; set; }
        public string EXAM_ID { get; set; }
        public string COMMENTS { get; set; }
        public Nullable<bool> REVIEWED { get; set; }
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
        public Nullable<long> HHT_TRANSACTION_ID { get; set; }
        public string CASE_ID { get; set; }
        public string PATIENT_ID { get; set; }
        public string DESCRIPTION { get; set; }
        public string PREF_LIST_ID { get; set; }
        public Nullable<short> CCH_STATUS { get; set; }
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
        public string COST_CENTER_CODE { get; set; }
        public string SERVICE_CODE { get; set; }
        public Nullable<short> PROCESSED_FILE_TYPE { get; set; }
        public Nullable<long> ENCOUNTER_ID { get; set; }
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
        public Nullable<long> CTH_ID { get; set; }
        public string CTH_PREF_LIST_ID { get; set; }
        public Nullable<short> CASE_STATUS { get; set; }
        public string CTH_UPDATE_USER_ID { get; set; }
        public string WORKSTATION_MAC_ADDRESS { get; set; }
        public Nullable<System.DateTime> CTH_UPDATE_DT_TIME { get; set; }
        public Nullable<short> CASE_PICK_STATUS { get; set; }
        public Nullable<int> CTH_TRANSACTION_ID { get; set; }
        public Nullable<int> CHARGE_CAPTURE_TRANS_ID { get; set; }
        public string CTH_COMMENTS { get; set; }
        public string REASON_DESCRIPTION { get; set; }
        public string PATIENT_ACCNUMBER { get; set; }
        public string PATIENT_NAME { get; set; }
        public string PATIENT_BEDNUMBER { get; set; }
    }
}
