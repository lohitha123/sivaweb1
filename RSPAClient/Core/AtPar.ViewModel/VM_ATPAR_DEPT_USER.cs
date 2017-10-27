using System;

namespace AtPar.ViewModel
{
    public partial class VM_ATPAR_DEPT_USER
    {
        public string USER_ID { get; set; }
        public Nullable<bool> ACCOUNT_DISABLED { get; set; }
        public string USER_FULLNAME { get; set; }
        public string HOME_DEPARTMENT { get; set; }
        public string CURRENT_HOME_DEPT { get; set; }
    }
}