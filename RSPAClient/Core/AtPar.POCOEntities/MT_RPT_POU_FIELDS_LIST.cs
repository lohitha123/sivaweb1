using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_RPT_POU_FIELDS_LIST
    {
        public int APP_ID { get; set; }
        public string REPORT_TABLE_NAME { get; set; }
        public string ATPAR_APPLICATION_TABLE { get; set; }
        public string ATPAR_TABLE_COLUMN { get; set; }
        public string REPORT_FRIENDLY_COLUMN_NAME { get; set; }
        public string DATA_TYPE { get; set; }
        public string ERP_TYPE { get; set; }
    }
}
