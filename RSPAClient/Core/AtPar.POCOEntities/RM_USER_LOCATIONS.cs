using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class RM_USER_LOCATIONS
    {
        public string EMPLOYEE_ID { get; set; }
        public string USER_ID { get; set; }
        public string FIRST_NAME { get; set; }
        public string MIDDLE_NAME { get; set; }
        public string LAST_NAME { get; set; }
        public string ID { get; set; }
        public string PHONE_NO { get; set; }
        public string ADDRESS_1 { get; set; }
        public string ADDRESS_2 { get; set; }
        public string ADDRESS_3 { get; set; }
        public string ADDRESS_4 { get; set; }
        public string LOCATION { get; set; }
        public string BADGE_ID { get; set; }
        public string SSN_NO { get; set; }
        public string ORG_ID { get; set; }
        public string EMAIL_ID { get; set; }
        public string DEPT_ID { get; set; }
        public string LOC_DESCR { get; set; }

        //Ignore Property
        public string RECIEPENTNAME { get; set; }
    }
}
