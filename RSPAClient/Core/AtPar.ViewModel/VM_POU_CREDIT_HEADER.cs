using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_POU_CREDIT_HEADER
    {
        public long TRANSACTION_ID { get; set; }
        public string PATIENT_ID { get; set; }
        public string ACCOUNT_ID { get; set; }
        public string EXAM_ID { get; set; }
        public string COMMENTS { get; set; }
        public string DATE_OF_SERVICE { get; set; }
        public string PATIENTID_CHANGED { get; set; }
        public string DATE_TIME { get; set; }
        public string PATIENT_NAME { get; set; }
        public string CAPTURE_DATE_TIME { get; set; }
        public string USER_ID { get; set; }
        public bool REVIEWED { get; set; }
        public string DEPARTMENT_ID { get; set; }

    }
}
