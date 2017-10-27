using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_WORKFLOW_DETAILS
    {
        public long TRANSACTION_ID { get; set; }
        public System.Guid WORKFLOW_INSTANCE_ID { get; set; }
        public string ITEM_ID { get; set; }
        public string PO_NO { get; set; }
        public string VENDOR_REVIEW_STATUS { get; set; }
        public string DEPT_REVIEW_STATUS { get; set; }
        public string EXCEPTION_REVIEW_STATUS { get; set; }
        public Nullable<byte> WORK_FLOW_STATUS { get; set; }
        public Nullable<int> LINE_NO { get; set; }
        public short STATUS { get; set; }
    }
}
