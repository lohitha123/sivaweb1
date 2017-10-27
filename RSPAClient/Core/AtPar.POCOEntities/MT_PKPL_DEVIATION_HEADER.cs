using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_PKPL_DEVIATION_HEADER
    {
        public string BUSINESS_UNIT { get; set; }
        public string ORDER_NO { get; set; }
        public int ORDER_LINE_NO { get; set; }
        public string PICK_BATCH_ID { get; set; }
        public Nullable<int> PICK_LIST_LINE_NO { get; set; }
        public Nullable<double> QTY_REQUESTED { get; set; }
        public Nullable<double> QTY_ALLOCATED { get; set; }
        public Nullable<double> QTY { get; set; }
        public int TRANSACTION_ID { get; set; }
        public string LOCATION { get; set; }
        public string INV_ITEM_ID { get; set; }
        public string DEPT_ID { get; set; }
        public Nullable<System.DateTime> PICK_DATE { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string USER_ID { get; set; }
        public string ALLOC_UOM { get; set; }
        public string PICK_UOM { get; set; }
        public Nullable<double> CONVERSION_FACTOR { get; set; }
        public string REPORT_DATA_1 { get; set; }
        public string REPORT_DATA_2 { get; set; }
        public string REPORT_DATA_3 { get; set; }
        public string STD_UOM { get; set; }
        public Nullable<double> QTY_ORDER { get; set; }
        public string ORDER_UOM { get; set; }
        public int LINE_NO { get; set; }
        public Nullable<int> SCHED_LINE_NO { get; set; }
        public Nullable<int> DEMAND_LINE_NO { get; set; }
        public Nullable<int> SEQ_NBR { get; set; }
    }
}
