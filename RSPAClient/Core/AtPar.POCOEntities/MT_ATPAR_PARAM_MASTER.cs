using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_PARAM_MASTER
    {
        public short APP_ID { get; set; }
        public string PARAMETER_ID { get; set; }
        public string ENTERPRISE_SYSTEM { get; set; }
        public string PARAMETER_LEVEL { get; set; }
        public string SHORT_DESCR { get; set; }
        public string LONG_DESCR { get; set; }
        public Nullable<short> SEQ_NO { get; set; }
        public string PARAMETER_TYPE { get; set; }
        public string DEFAULT_VALUE { get; set; }
        public string VALIDATION { get; set; }
        public string MULTIPLE_VALUES { get; set; }
        public Nullable<short> SIZE { get; set; }
        public Nullable<int> MIN_VALUE { get; set; }
        public Nullable<double> MAX_VALUE { get; set; }
        public string CLIENT_SYNC { get; set; }
        public string REQUIRED_FLAG { get; set; }
        public string PROMPT_TABLE { get; set; }
        public string PROMPT_FIELD { get; set; }
        public string WHERE_CONDITION { get; set; }
        public string PARAMETER_VALUE { get; set; }
    }
}
