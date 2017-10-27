using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class PAR_MNGT_ORDER_DETAILS
    {
        public int ORDER_NO { get; set; }
        public string LINE_NO { get; set; }
        public string ITEM_ID { get; set; }
        public string BIN_LOC { get; set; }
        public Nullable<double> QTY { get; set; }
        public Nullable<int> ORDER_STATUS { get; set; }
        public Nullable<double> QTY_RCVD { get; set; }
        public string UOM { get; set; }
        public string SERIAL_NO { get; set; }
        public string LOT_NO { get; set; }
        public Nullable<int> TRANSACTION_ID { get; set; }
        public string REQUISITION_NO { get; set; }
        public string LINE_COMMENTS { get; set; }
        public Nullable<double> ACTUAL_ORDERQTY { get; set; }
        public string ACTUAL_ISSUE_UOM { get; set; }
        public Nullable<double> COUNT_QTY { get; set; }
        public double QTY_PICKED { get; set; }
        public string NDC_CODE { get; set; }

        public string DESCRIPTION { get; set; }
        public string PRICE { get; set; }
    }
}
