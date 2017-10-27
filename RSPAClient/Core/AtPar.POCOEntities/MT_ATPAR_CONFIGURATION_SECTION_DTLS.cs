using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_CONFIGURATION_SECTION_DTLS
    {
        public string TAB_ID { get; set; }
        public string TAB_NAME { get; set; }
        public string PARAMETER_ID { get; set; }
        public string FRIENDLY_NAME { get; set; }
        public string DESCRIPTION { get; set; }
        public string TYPE { get; set; }
        public string VALIDATION_RULES { get; set; }
        public string DEFAULT_VALUE { get; set; }
        public string PARAMETER_VALUE { get; set; }
        public string TOOL_TIP_INFO { get; set; }
        public string VALID_FOR_ERP { get; set; }
        public string DISPLAY_FLAG { get; set; }
        public Nullable<short> DISPLAY_ORDER { get; set; }
        public string NEW_VALIDATION_RULES { get; set; }
    }
}
