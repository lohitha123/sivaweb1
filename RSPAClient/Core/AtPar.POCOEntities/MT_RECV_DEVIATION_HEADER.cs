using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_RECV_DEVIATION_HEADER
    {
        public int TRANSACTION_ID { get; set; }
        public int LINE_NO { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string PO_ID { get; set; }
        public Nullable<int> PO_LINE_NO { get; set; }
        public int PO_SCHED_NO { get; set; }
        public string INV_ITEM_ID { get; set; }
        public string DESCRIPTION { get; set; }
        public string UNIT_OF_MEASURE { get; set; }
        public Nullable<double> QTY_PO { get; set; }
        public Nullable<double> QTY { get; set; }
        public Nullable<double> ASN_QTY { get; set; }
        public string RECV_UOM { get; set; }
        public Nullable<double> RECV_CONVERSION_RATE { get; set; }
        public string INVENTORY_ITEM { get; set; }
        public Nullable<int> DEVIATION_TYPE { get; set; }
        public string VENDOR_ID { get; set; }
        public string CARRIER_ID { get; set; }
        public string CUSTOM_ITEM_NO { get; set; }
        public Nullable<System.DateTime> DUE_DATE { get; set; }
        public Nullable<System.DateTime> RECEIPT_DATE { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string REPORT_DATA_1 { get; set; }
        public string REPORT_DATA_2 { get; set; }
        public string REPORT_DATA_3 { get; set; }
        public string REPORT_DATA_4 { get; set; }
        public string REPORT_DATA_5 { get; set; }
        public string LOCATION { get; set; }
        public string USER_ID { get; set; }
    }
}
