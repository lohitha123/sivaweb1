using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_USER
    {
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
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }
        public string USERDN { get; set; }
        public string FULLNAME { get; set; }
        public string VENDORNAME { get; set; }
        public string IMAGE_PATH { get; set; }
    }
}
