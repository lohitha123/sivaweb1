using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_MT_ATPAR_TRANSACTION
    {
        public int STC { get; set; }
        public Int16 STATUS { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string DOWNLOAD_USER_ID { get; set; }
        public string USER_ID { get; set; }
        public string FIRST_NAME { get; set; }        
        public string LAST_NAME { get; set; }
        public string MIDDLE_INITIAL { get; set; }
        public string TOTAL { get; set; }
        public int DOWNLOAD { get; set; }
        public int SENT { get; set; }
        public int INVALID { get; set; }
        public int ERROR { get; set; }

    }

}
