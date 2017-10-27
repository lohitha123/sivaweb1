using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_POU_PHYSICIAN_USAGE_DETAILS
    {
        public string PHYSICIAN_ID { get; set; }
        public string EXAM_ID { get; set; }
        public string PREF_LIST_ID { get; set; }
        public string CASE_ID { get; set; }
        public string ITEM_ID { get; set; }
        public string ITEM_DESCRIPTION { get; set; }
        public double? ITEM_COUNT { get; set; }
        public double? USED_QTY { get; set; }
        public double? WASTAGE_QTY { get; set; }
        public string UOM { get; set; }
        public string ISSUE_UOM { get; set; }
        public double? ISSUE_PRICE { get; set; }
        public double? SUMUSED { get; set; }
        public double? SUMRETURN { get; set; }
        public double? SUMWASTAGE { get; set; }
    }
}
