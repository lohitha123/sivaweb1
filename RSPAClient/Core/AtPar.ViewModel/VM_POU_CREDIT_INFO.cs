using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_POU_CREDIT_INFO
    {
        public long TRANSACTION_ID { get; set; }
        public string PATIENT_ID { get; set; }
        public System.DateTime CAPTURE_DATE_TIME { get; set; }
        public string DEPARTMENT_ID { get; set; }
        public string PHYSICIAN_ID { get; set; }
        public string PROCEDURE_CODE { get; set; }
        public string ITEM_ID { get; set; }
        public Nullable<double> ITEM_COUNT { get; set; }
        public Nullable<double> ITEM_PRICE { get; set; }
        public Nullable<double> AMOUNT { get; set; }
        public string PATIENT_NAME { get; set; }
        public string PATIENT_SEX { get; set; }
        public string PATIENT_ACCNUMBER { get; set; }
        public string TRANSACTION_TYPE { get; set; }
        public string TRANSACTION_CODE { get; set; }
        public string PATIENT_TYPE { get; set; }
        public int LINE_NO { get; set; }
        public string CREDIT_CHANGED { get; set; }
        public string PATIENT_VISIT_NUMBER { get; set; }
        public string ITEM_DESCRIPTION { get; set; }
    }

}
