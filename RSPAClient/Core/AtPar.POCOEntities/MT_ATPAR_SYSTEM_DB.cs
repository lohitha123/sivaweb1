using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_SYSTEM_DB
    {
        public string SYSTEM_ID { get; set; }
        public string SYSTEM_NAME { get; set; }
        public string DATASOURCE { get; set; }
        public string SCHEMA_NAME { get; set; }
        public string USERID { get; set; }
        public string PASSWORD { get; set; }
        public string SERVER { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
        public string VERSION_NO { get; set; }
    }
}
