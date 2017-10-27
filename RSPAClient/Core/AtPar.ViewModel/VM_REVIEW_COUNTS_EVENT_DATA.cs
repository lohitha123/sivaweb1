using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_REVIEW_COUNTS_EVENT_DATA
    {
        public string INV_ITEM_ID { get; set; }
        public string ITEM_REC_NUM { get; set; }
        public string MFG_ITEM_ID { get; set; }
        public string VEND_ITEM_ID { get; set; }
        public string DESCRIPTION { get; set; }
        public string STORAGE_AREA { get; set; }
        public string STOR_LEVEL_1 { get; set; }
        public string STOR_LEVEL_2 { get; set; }
        public string STOR_LEVEL_3 { get; set; }
        public string STOR_LEVEL_4 { get; set; }
        public string UNIT_OF_MEASURE { get; set; }
        public Nullable<double> ITEM_PRICE { get; set; }
        public string CONTAINER_ID { get; set; }
        public string STAGED_DATE { get; set; }//changed from nullable<datetime> to string
        public string SERIAL_ID { get; set; }
        public string INV_LOT_ID { get; set; }
        public char COUNT_STATUS { get; set; }
        public Nullable<double> COUNT_QTY { get; set; }//changed from nullable<double> to string
        public Nullable<double> SYS_QTY { get; set; }
        public string INVENTORY_TAG_ID { get; set; }
        public string GTIN { get; set; }
        public string UPC_ID { get; set; }
        public string CUSTOM_ITEM_NO { get; set; }
        public string LOCATION { get; set; }
        public string MANUFACTURER { get; set; }
        public string PROJECT_ID { get; set; }
        public string EVENT_ID { get; set; }
        public int TRANSACTION_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string STORLOC { get; set; }
        public string COUNT_USER_ID { get; set; }
        public string USERNAME { get; set; }
        public string CUST_ITEM_NO { get; set; }
        public string ITEM_MANUFACTURER_NAME { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string RECOUNT_FLAG { get; set; }
        public Nullable<double> VALUEDIFF { get; set; }
        public Nullable<double> REALVALUEDIFF { get; set; }
        public string RECOUNT_USER_ID { get; set; }
        public string ACTUAL_RECOUNT_FLAG { get; set; }
        public Nullable<double> ACTUAL_COUNT_QTY { get; set; }
        public string RECNT_CHECK { get; set; }
        public string RECOUNT_USER_NAME { get; set; }
        public string REPORT_FIELD_1 { get; set; }
        public string REPORT_FIELD_2 { get; set; }
        public string REPORT_FIELD_3 { get; set; }
        public string REPORT_FIELD_4 { get; set; }
        public string PACKAGING_STRING { get; set; }
        public Nullable<double> COUNT_QTY1 { get; set; }
        public Nullable<double> COUNT_QTY2 { get; set; }
        public string UOM_TYPE { get; set; }
        public string STD_PACK_UOM { get; set; }
        public string L_S_CONTROLLED { get; set; }
        public string CONSIGNED_FLAG { get; set; }
        public int LATEST_SYSQTY { get; set; }
        public int EVENT_TYPE { get; set; }
        public Nullable<double> CONVERSION_RATE { get; set; }
        public string LOT_CONTROLLED { get; set; }
        public string SERIAL_CONTROLLED { get; set; }
        public string ActualRecountFlag { get; set; }
        public Nullable<double> ActualCountQty { get; set; }

        //public string CUST_ITEM_NO { get; set; } DUPLICATED IN THE PROCEDURE GetReviewCountsEventData NEED TO CHECK ONCE 






    }
}
