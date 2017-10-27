using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_RPT_OPT_BY_PREFERENCE_M
    {
        public string SPECIALTY_CODE { get; set; }
        public string PROCEDURE_CODE { get; set; }
        public string PREF_LIST_ID { get; set; }
        public string PHYSICIAN_ID { get; set; }
        public string ITEM_ID { get; set; }
        public string ITEM_DESCRIPTION { get; set; }
        public Nullable<double> ITEM_PRICE { get; set; }
        public Nullable<double> CURRENT_OPEN_QTY { get; set; }
        public Nullable<double> CURRENT_HOLD_QTY { get; set; }
        public Nullable<double> MAX_USAGE { get; set; }
        public Nullable<double> MIN_USAGE { get; set; }
        public Nullable<double> MEAN_USAGE { get; set; }
        public Nullable<double> USAGE_PER { get; set; }
        public Nullable<double> SUGGESTED_OPEN_QTY { get; set; }
        public Nullable<double> SUGGESTED_HOLD_QTY { get; set; }
        public Nullable<double> NET_CHANGE_OPEN_QTY { get; set; }
        public Nullable<double> NET_CHANGE_HOLD_QTY { get; set; }
        public Nullable<double> NET_CHANGE_OPEN_VALUE { get; set; }
        public Nullable<double> NET_CHANGE_HOLD_VALUE { get; set; }
        public Nullable<int> ITEM_TYPE { get; set; }
        public int MONTH { get; set; }
        public int YEAR { get; set; }
    }
}
