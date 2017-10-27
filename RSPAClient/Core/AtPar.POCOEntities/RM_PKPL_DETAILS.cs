using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class RM_PKPL_DETAILS
    {
        public string BUSINESS_UNIT { get; set; }
        public string INV_BUSINESS_UNIT { get; set; }
        public string LOCATION { get; set; }
        public string PICK_BATCH_ID { get; set; }
        public string ORDER_NO { get; set; }
        public int LINE_NO { get; set; }
        public int SCHED_LINE_NO { get; set; }
        public int DEMAND_LINE_NO { get; set; }
        public int SEQUENCE_NO { get; set; }
        public int PICKLIST_LINE_NO { get; set; }
        public string ITEM_ID { get; set; }
        public string ITEM_DESC { get; set; }
        public string CUSTOMER_ITEM_NO { get; set; }
        public string UPC_ID { get; set; }
        public string MFG_ITEM_ID { get; set; }
        public string VEND_ITEM_ID { get; set; }
        public Nullable<double> QTY_ORDER { get; set; }
        public double QTY_REQUESTED { get; set; }
        public double QTY_ALLOCATED { get; set; }
        public string DEPT_ID { get; set; }
        public string STD_UOM { get; set; }
        public string PICK_UOM { get; set; }
        public Nullable<double> CONVERSION_FACTOR { get; set; }
        public string UOM { get; set; }
        public string STORAGE_AREA { get; set; }
        public string STPRAGE_LVL1 { get; set; }
        public string STPRAGE_LVL2 { get; set; }
        public string STPRAGE_LVL3 { get; set; }
        public string STPRAGE_LVL4 { get; set; }
        public Nullable<bool> CONFIRMED_FLAG { get; set; }
        public Nullable<double> SYSTEM_QTY { get; set; }
        public string STORAGE_LOCATION { get; set; }
        public string PARTIAL_QTY_FLAG { get; set; }
        public string PARTIAL_ORDER_FLAG { get; set; }
        public Nullable<double> PICK_QTY { get; set; }
    }
}
