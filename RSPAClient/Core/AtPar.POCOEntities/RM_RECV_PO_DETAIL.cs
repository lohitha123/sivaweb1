using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class RM_RECV_PO_DETAIL
    {
        public string COMPANY { get; set; }
        public string PO_ID { get; set; }
        public int LINE_NO { get; set; }
        public string ITEM_ID { get; set; }
        public string DESCR { get; set; }
        public string UPC_ID { get; set; }
        public string MFG_ITEM_ID { get; set; }
        public string VEND_ITEM_ID { get; set; }
        public string INV_ITEM_FLAG { get; set; }
        public string LINE_COMMENTS { get; set; }
        public string SHIPTO_ID { get; set; }
        public Nullable<System.DateTime> DUE_DATE { get; set; }
        public string DEPT_ID { get; set; }
        public string UOM { get; set; }
        public Nullable<double> PO_QTY { get; set; }
        public Nullable<double> RECVD_QTY { get; set; }
        public Nullable<int> RECEV_TOL_PC { get; set; }
        public string DELIVER_TO_LOC { get; set; }
        public string INSP_FLAG { get; set; }
        public string REQ_ID { get; set; }
        public string RECEPIENT { get; set; }
        public string PURCHASE_REQ_NO { get; set; }
        public string ALTUOM { get; set; }
        public string DESCR2 { get; set; }
        public string DEPT_NAME { get; set; }
        public string PURCHASE_REQ_LN_NO { get; set; }
        public string LOT_CONTROL { get; set; }
        public string SERIAL_CONTROL { get; set; }
    }
}
