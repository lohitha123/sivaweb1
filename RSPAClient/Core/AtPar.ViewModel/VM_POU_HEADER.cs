using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_POU_HEADER
    {
        public long TRANSACTION_ID { get; set; }
        public string ITEM_ID { get; set; }
        public int LINE_NO { get; set; }
        public string ITEM_DESCRIPTION { get; set; }
        public string ITEM_LOTNUMBER { get; set; }
        public string ITEM_SRNUMBER { get; set; }
        public Nullable<double> BILLED_QTY { get; set; }
        public string CREDIT_QTY { get; set; }
        public Nullable<double> ITEM_COUNT { get; set; }
        public string CHARGE_CODE { get; set; }
        public Nullable<double> ITEM_PRICE { get; set; }
    }
}
