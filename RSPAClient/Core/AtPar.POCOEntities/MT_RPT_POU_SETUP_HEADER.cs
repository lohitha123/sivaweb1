using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_RPT_POU_SETUP_HEADER
    {
        public string ORG_GROUP_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string BU_TYPE { get; set; }
        public string USER_ID { get; set; }
        public string PASSHASH { get; set; }
        public string FIRST_NAME { get; set; }
        public string LAST_NAME { get; set; }
        public string MIDDLE_INITIAL { get; set; }
        public string EMAIL_ID { get; set; }
        public string PHONE1 { get; set; }
        public string PHONE2 { get; set; }
        public string FAX { get; set; }
        public string PAGER { get; set; }
        public string HINT_QUESTION { get; set; }
        public string HINT_ANSWER { get; set; }
        public string CREATE_USER_ID { get; set; }
        public Nullable<System.DateTime> CREATE_DATE { get; set; }
        public string PROFILE_ID { get; set; }
        public string LDAP_USER { get; set; }
        public string LDAP_ROLE { get; set; }
        public string LDAP_ORG { get; set; }
        public string USERDN { get; set; }
        public string DEPT_ID { get; set; }
        public string DEPT_NAME { get; set; }
        public string ATTN_TO { get; set; }
        public string ADDRESS1 { get; set; }
        public string ADDRESS2 { get; set; }
        public string CITY { get; set; }
        public string STATE { get; set; }
        public string ZIP { get; set; }
        public string COUNTRY { get; set; }
        public string PHONE { get; set; }
        public string E_MAIL { get; set; }
        public Nullable<bool> STATUS { get; set; }
        public string EXCP_APPROVAL_REQ { get; set; }
        public string INV_COORD_EMAIL { get; set; }
        public string EXCP_APPROVER_EMAIL { get; set; }
        public short REMINDER_FREQ { get; set; }
        public string RECALL_NOTIFICATION_EMAIL { get; set; }
        public string INV_INTERFACE_ENABLE { get; set; }
        public string BILLING_ENABLE { get; set; }
        public string DEFAULT_PRINTER { get; set; }
        public string DEFAULT_DISTRIBUTION_TYPE { get; set; }
        public string DEFAULT_DESTINATION_LOCATION { get; set; }
        public string ALERT_NOTIFY_REQ { get; set; }
        public string EMAIL_NOTIFY { get; set; }
        public string CATEGORY_CODE { get; set; }
        public string BILLONLY_BUSINESS_UNIT { get; set; }
        public string BILLONLY_LOCATION { get; set; }
        public short NO_OF_CASES_DOWNLOAD { get; set; }
        public string SEND_LOWSTOCK_EMAIL_ALERTS { get; set; }
        public string EMAILID_FOR_LOWSTOCK_ALERTS { get; set; }
        public string SEND_PRODUCT_EXP_EMAIL_ALERTS { get; set; }
        public string EMAILID_FOR_PRODUCT_EXP_ALERTS { get; set; }
        public Nullable<short> DURATION_TRACKING_EXP { get; set; }
        public Nullable<short> PERCENTAGE_OPTIMUM_QTY { get; set; }
        public bool PREPICK_QA_PROCESS_REQUIRED { get; set; }
        public string BUYER_ID { get; set; }
        public string AUTO_PUTAWAY_ENABLED { get; set; }
        public bool ALLOW_LOC_SELECT { get; set; }
        public short CASE_PICK_STATUS { get; set; }
        public Nullable<bool> HOME_DEPARTMENT { get; set; }
    }
}
