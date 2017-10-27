using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
   public  class VM_ATPAR_PROFILE_LIST_VIEW
    {
        public string PROFILE_ID { get; set; }
        public short APP_ID { get; set; }
        public string SCREEN_NAME { get; set; }
        public string FIELD_NAME { get; set; }
        public string VALUE { get; set; }
        public string COLUMN_HEADER { get; set; }
        public short COLUMN_ORDER { get; set; }
        public int COLUMN_WIDTH { get; set; }        
        public string DISPLAY_FIELD { get; set; }
        public string TOGGLE_FIELD { get; set; }
        public string DEFAULT_TOGGLE_TEXT { get; set; }
        public string TOGGLE_ORDER { get; set; }
        public DateTime LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }
        public string MANDATORY_FIELD { get; set; }
        public string ORDER_BY { get; set; }
        public short COLUMN_MAX_SIZE { get; set; }
        public string ENTERPRISE_SYSTEM { get; set; }
        public string SHORT_DESCR { get; set; }
        public string LONG_DESCR { get; set; }
        public string DEFAULT_COLUMN_HEADER { get; set; }
        public short DEFAULT_COLUMN_ORDER { get; set; }
        public int DEFAULT_COLUMN_WIDTH { get; set; }
        public string DEFAULT_DISPLAY_FIELD { get; set; }
        public string MANDATORY_TOGGLE { get; set; }



    }
}
