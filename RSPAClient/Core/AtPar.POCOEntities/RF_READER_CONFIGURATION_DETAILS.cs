using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class RF_READER_CONFIGURATION_DETAILS
    {

        public int CONFIG_ID { get; set; }
        //public char STATUS { get; set; }
        public string STATUS { get; set; }
        public string READER_LOCATION { get; set; }
        public string READER_MODEL { get; set; }
        public string READER_IP { get; set; }
        public int READER_PORT { get; set; }
        public string PRINTER_IP { get; set; }
        public int PRINTER_PORT { get; set; }
        public int READER_INTERVAL { get; set; }
        public string TAG_ENCODE_MODE { get; set; }
        public string ANTENNA_IDS { get; set; }
        public bool DEFAULT_CONFIG { get; set; }
        public string CONFIG_MODULE { get; set; }
        public string UPDATE_USER { get; set; }
        public System.DateTime UPDATE_DTTM { get; set; }
    }
}
