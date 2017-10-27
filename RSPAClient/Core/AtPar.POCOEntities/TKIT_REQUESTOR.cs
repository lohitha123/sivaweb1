using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class TKIT_REQUESTOR
    {
        public string ORG_GROUP_ID { get; set; }
        public string REQUESTOR_ID { get; set; }
        public string PASSWORD { get; set; }
        public string NEWPASSWORD { get; set; }
        public string FIRST_NAME { get; set; }
        public string MIDDLE_INIT { get; set; }
        public string LAST_NAME { get; set; }
        public string PHONE { get; set; }
        public string EMAIL { get; set; }
        public string FAX { get; set; }
        public string PAGER { get; set; }
        public string LOCATION_ID { get; set; }
        public string STATUS { get; set; }
        public Nullable<short> RECORDS_PER_PAGE { get; set; }
        public Nullable<short> DEFAULT_REPORT_DURATION { get; set; }
        public Nullable<short> NO_OF_REQUESTS_FOR_SAME_EQ_ITM { get; set; }
        public string USERNAME { get; set; }
        public byte[] IMAGE { get; set; }
    }
}
