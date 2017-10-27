using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
   public class VM_RECV_SETUPSHIPTO_ID_ALLOCATION
    {

        public string ORG_ID { get; set; }
        public string SHIPTO_ID { get; set; }
        public string SHIPTO_NAME { get; set; }
        public string ADDRESS_1 { get; set; }
        public string CITY { get; set; }        
        public string STATE { get; set; }
        public string ZIP { get; set; }
        public string PHONE_NO { get; set; }
        public Boolean STATUS { get; set; }
        public string ATTENTION_TO { get; set; }
        public string COMMENTS { get; set; }
        public int CHK_VALUE { get; set; }
        public int CHK_ALLOCATED { get; set; }
        public int ROWINDEX { get; set; }
        public string DESCR { get; set; }
        public string CURRENTSTATUS { get; set; }
        public string ACTIVESTATUS { get; set; }
        public string EFF_STATUS { get; set; }
        public string USER_ID { get; set; }
        public string SETID { get; set; }
    }
}
