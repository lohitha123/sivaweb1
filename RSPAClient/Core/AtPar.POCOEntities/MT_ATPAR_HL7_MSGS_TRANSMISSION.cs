using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_HL7_MSGS_TRANSMISSION
    {
        public long ID { get; set; }
        public long TRANSACTION_ID { get; set; }
        public short APP_ID { get; set; }
        public string KEY_1 { get; set; }
        public string KEY_2 { get; set; }
        public string KEY_3 { get; set; }
        public string KEY_4 { get; set; }
        public string KEY_5 { get; set; }
        public string HL7_MSG_TYPE { get; set; }
        public string TRANSMISSION_STATUS { get; set; }
        public string HL7_MESSAGE { get; set; }
        public string HL7_ERROR_MESSAGE { get; set; }
        public System.DateTime UPDATE_DATE { get; set; }
        public string UPDATE_USER_ID { get; set; }
    }
}
