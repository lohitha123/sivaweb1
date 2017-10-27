using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_SETUP_PRO_PRINTERES
    {
        public short APP_ID { get; set; }
        public int SEQ_NO { get; set; }
        public string PRINTER_CODE { get; set; }
        public string IP_ADDRESS { get; set; }
        public long PORT_NO { get; set; }
        public string FRIENDLY_NAME { get; set; }
        public string STATUS { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string USER_ID { get; set; }
        public string LABEL_FILE_NAME { get; set; }
        public string NETWORK_TYPE { get; set; }
        public int LABEL_TYPE { get; set; }
        public Nullable<int> LINKED_LABEL_TYPE { get; set; }
        public string MODEL { get; set; }
        public string APP_NAME { get; set; }
        public string NAME { get; set; }
        public string LABEL_DESCRIPTION { get; set; }
        public string PRINTER_NAME { get; set; }
        public string FUNCTIONALITY { get; set; }

    }
}
