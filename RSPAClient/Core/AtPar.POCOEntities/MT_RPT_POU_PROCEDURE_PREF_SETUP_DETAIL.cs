using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_RPT_POU_PROCEDURE_PREF_SETUP_DETAIL
    {
        public string PREF_LIST_ID { get; set; }
        public string ITEM_ID { get; set; }
        public string ITEM_DESCR { get; set; }
        public Nullable<double> QUANTITY { get; set; }
        public Nullable<bool> STATUS { get; set; }
        public System.DateTime UPDATE_DATE { get; set; }
        public string UPDATE_USERID { get; set; }
        public double HOLD_QTY { get; set; }
        public string PROCEDURE_ID { get; set; }
        public string CUST_ITEM_NO { get; set; }
    }
}
