using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_POU_PREF_OPT_BY_PREFERENCE
    {
        public string ITEM_ID { get; set; }
        public string ITEM_DESCRIPTION { get; set; }
        public Nullable<double> MAX_USAGE { get; set; }
        public Nullable<double> MIN_USAGE { get; set; }
        public Nullable<double> MEAN_USAGE { get; set; }
        public Nullable<double> USAGE_PER { get; set; }
        public Nullable<int> SUGGESTED_OPEN_QTY { get; set; }
        public Nullable<int> SUGGESTED_HOLD_QTY { get; set; }
        public Nullable<double> NET_CHANGE_OPEN_QTY { get; set; }
        public Nullable<double> NET_CHANGE_HOLD_QTY { get; set; }
        public Nullable<double> NET_CHANGE_OPEN_VALUE { get; set; }
        public Nullable<double> NET_CHANGE_HOLD_VALUE { get; set; }
        public Nullable<int> ITEM_TYPE { get; set; }
        public Nullable<double> ITEM_PRICE { get; set; }
        public Nullable<double> CURRENT_OPEN_QTY { get; set; }
        public Nullable<double> CURRENT_HOLD_QTY { get; set; }   
        public Nullable<int> COLORCODE { get; set; }

    }
}
