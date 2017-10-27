using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
   public class VM_MT_ATPAR_FORGOT_PWD
    {
        public string USER_ID { get; set; }
        public string PASSHASH { get; set; }
        public Boolean ACCOUNT_DISABLED { get; set; }
        public string HINT_QUESTION { get; set; }
        public string LDAP_USER { get; set; }
        public string HINT_ANSWER { get; set; }

    }
}
