using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
   public class VM_MT_POU_CONSIGNEDBILLONLY_ITEMS
    {
        public string ITEM_ID { get; set; }
        public string ORG_GROUP_ID { get; set; }
        public string DEPT_ID { get; set; }
        public string DESCRIPTION { get; set; }
        public string USER_ID { get; set; }
        public string KEYVALUE { get; set; }
        public string UPC_ID { get; set; }
        public string MFG_ITEM_ID { get; set; }
        public string VEND_ITEM_ID { get; set; }
        public string MANUFACTURER { get; set; }
        public string VENDOR_ID { get; set; }
        public string LOT_ID { get; set; }
        public string SERIAL_ID { get; set; }
        public Nullable<System.DateTime> EXPIRY_DATE { get; set; }
        public string CATALOG_FLG { get; set; }
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public Nullable<double> ITEM_PRICE { get; set; }
        public string UOM { get; set; }
        public string GTIN { get; set; }
        public string UOM_ISSUE { get; set; }
        public string UOM_PROCUREMENT { get; set; }
        public float CONV_FACTOR { get; set; }
        public float PRICE { get; set; }
        public Int16 STATUS { get; set; }
        public string SERIAL_CONTROLLED { get; set; }
        public string LOT_CONTROLLED { get; set; }
        public string CHARGE_CODE { get; set; }
        public string REPLENISHMENT_TYPE { get; set; }
        public string PAR_LOC_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string BIN { get; set; }
        public int COUNT_ORDER { get; set; }
        public float OPTIMAL_QTY { get; set; }
        public string COUNT_REQUIRED { get; set; }
        public string FILL_KILL_FLAG { get; set; }
        public float MAX_QTY { get; set; }
        public float FOQ_QTY { get; set; }
        public string ORDERING_TYPE { get; set; }
        public string COST_CENTER { get; set; }
        public string REQUISITION_TYPE { get; set; }
        public string USER_FIELD_1 { get; set; }
        public string PAR_UOM { get; set; }
        public float CONV_RT_PAR_UOM { get; set; }
        //Manage Consigned & BillOnly Items
        public string ACTUAL_ITEM_ID { get; set; }
        public string CUST_ITEM_NO { get; set; }
        public Int64  TRANSACTION_ID { get; set; }
        public string REVEIWER_TYPE { get; set; }
        //public string  VENDOR_NAME { get; set; }
        public Nullable<System.DateTime> TRANSACTION_DATE { get; set; }
        public string DEPARTMENT_ID { get; set; }
        //public string DEPT_NAME { get; set; }
        public string SHORT_DESCR { get; set; }
        public double? ISSUE_PRICE { get; set; }
        public string ITEM_LOTNUMBER { get; set; }
        public string ITEM_SRNUMBER { get; set; }
        public string PO_NO { get; set; }
        public string VENDOR_REVIEW_STATUS { get; set; }
        public string DEPT_REVIEW_STATUS { get; set; }
        public string EXCEPTION_REVIEW_STATUS { get; set; }
        public Guid  WORKFLOW_INSTANCE_ID { get; set; }
        public string EXCP_APPROVAL_REQ { get; set; }
        public string PAR_LOCATION_ID { get; set; }
        public double? QTY { get; set; }
        public int LINE_NO { get; set; }
        public string LINE_COMMENTS { get; set; }
        public Nullable<System.DateTime> CAPTURE_DATE_TIME { get; set; }

    }
}
   