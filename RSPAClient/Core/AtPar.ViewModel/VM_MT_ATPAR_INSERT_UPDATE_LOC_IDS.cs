using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
   public class VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS
    {
        public string LOCATION_ID { get; set; }
        public string ORG_ID { get; set; }
        public string LOCATION_NAME { get; set; }
        public string DEPARTMENT_ID { get; set; }
        public string ADDRESS_1 { get; set; }
        public string ADDRESS_2 { get; set; }
        public string CITY { get; set; }
        public string STATE { get; set; }
        public string ZIP { get; set; }
        public string PHONE_NO { get; set; }
        public string ATTENTION_TO { get; set; }
        public string EMAIL { get; set; }
        public bool STATUS { get; set; }
        public string COMMENTS { get; set; }
        public string PREV_ORGID { get; set; }
    }
}
