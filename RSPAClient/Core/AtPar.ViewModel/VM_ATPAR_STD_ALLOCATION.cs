using System;

namespace AtPar.ViewModel
{
    public partial class VM_ATPAR_STD_ALLOCATION_ERP
    {
        public string ORG_ID { get; set; }
        public string SHIPTO_ID { get; set; }
        public string EFF_STATUS { get; set; }
        public string DESCR { get; set; }
        public string USER_ID { get; set; }
        public int ROWINDEX { get; set; }
        public int CHK_VALUE { get; set; }
        public int CHK_ALLOCATED { get; set; }
    }

    public partial class VM_ATPAR_STD_ALLOCATION_LDB
    {
        public string SETID { get; set; }
        public string SHIPTO_ID { get; set; }
        public string DESCR { get; set; }
        public string USER_ID { get; set; }
        public string USERNAME { get; set; }        
    }
}