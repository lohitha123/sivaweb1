using System;

namespace AtPar.ViewModel
{
    public class VM_ORDER_DETAILS
    {
        public int ORDER_NO { get; set; }
        public string BIN_LOC { get; set; }
        public string LINE_NO { get; set; }
        public string REQUISITION_NO { get; set; }
        public string ORG_ID { get; set; }
        public string PAR_LOC_ID { get; set; }
        public string VENDOR_ID { get; set; }
        public string CREATE_USER { get; set; }
        public DateTime? ORDER_DATE { get; set; }
        public string ITEM_ID { get; set; }
        public string SHORT_DESCR { get; set; }
        public string UOM { get; set; }
        public double? ITEM_PRICE { get; set; }
        public double? QTY { get; set; }
        public double? QTY_RCVD { get; set; }
        public int? ORDER_STATUS { get; set; }
    }
}
