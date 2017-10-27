using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_CART_HEADER
    {
        public int TRANSACTION_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string CART_ID { get; set; }
        public System.DateTime START_DATETIME { get; set; }
        public System.DateTime END_DATETIME { get; set; }
        public string USER_ID { get; set; }
        public string TOTAL_RECORDS { get; set; }
        public string NO_OF_SCANS { get; set; }
        public string NO_OF_ORDERED_ITEMS { get; set; }
        public string QUANTITY_OPTION { get; set; }
        public string CARTFLAG { get; set; }
        public string CMTS { get; set; }
        public string ALLOCATED_USER { get; set; }
        public string CREATION_DT { get; set; }
        public string REQ_NO { get; set; }
    }
}
