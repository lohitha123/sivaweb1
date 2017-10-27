using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_MT_ATPAR_PROF_USER
    {
        public string USER_ID { get; set; }
        public string PASSHASH { get; set; }
        public string FIRST_NAME { get; set; }
        public string LAST_NAME { get; set; }
        public string MIDDLE_INITIAL { get; set; }
        public string PROFILE_ID { get; set; }       
        public string LDAP_ROLE { get; set; }     
        public string ORG_GROUP_ID { get; set; }
        public bool PASSHASH_REQUIRED { get; set; }
        public string USERNAME { get; set; }
    }
}
