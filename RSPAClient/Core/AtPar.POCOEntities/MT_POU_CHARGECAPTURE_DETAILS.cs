using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_POU_CHARGECAPTURE_DETAILS
    {
        public string ITEM_ID { get; set; }
        public int LINE_NO { get; set; }
        public string ITEM_DESCRIPTION { get; set; }
        public string ITEM_LOTNUMBER { get; set; }
        public string ITEM_SRNUMBER { get; set; }
        public Nullable<double> ITEM_COUNT { get; set; }
        public Nullable<double> WASTAGE_QTY { get; set; }
        public long TRANSACTION_ID { get; set; }
        public string CART_ID { get; set; }
        public Nullable<double> ITEM_COUNT_MM { get; set; }
        public string UPDATE_USER_ID { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public Nullable<double> ITEM_PRICE { get; set; }
        public string CHARGE_CODE { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string COMPARTMENT { get; set; }
        public string CART_NONCART_FLAG { get; set; }
        public string UOM { get; set; }
        public string BILL_STATUS { get; set; }
        public string MM_STATUS { get; set; }
        public string ORDERING_TYPE { get; set; }
        public Nullable<int> ORDER_NO { get; set; }
        public Nullable<double> BILLED_QTY { get; set; }
        public int HOLD_QTY { get; set; }
        public string ITEM_INVENTORY { get; set; }
        public string STORAGE_AREA { get; set; }
        public string STORAGE_LEVEL_1 { get; set; }
        public string STORAGE_LEVEL_2 { get; set; }
        public string STORAGE_LEVEL_3 { get; set; }
        public string STORAGE_LEVEL_4 { get; set; }
        public string MFG_ITEM_ID { get; set; }
        public string UPC_ID { get; set; }
        public string GTIN { get; set; }
        public string VEND_ITEM_ID { get; set; }
        public string CUST_ITEM_NO { get; set; }
        public Nullable<double> ISSUE_QTY { get; set; }
        public string TOTE_NO { get; set; }
        public Nullable<short> ITEM_TYPE { get; set; }
        public string LINE_COMMENTS { get; set; }
        public Nullable<System.DateTime> EXPIRY_DATE { get; set; }
        public Nullable<System.DateTime> CREATE_DATE_TIME { get; set; }
        public string MANUFACTURER { get; set; }
        public string VENDOR_ID { get; set; }
        public string PHY_ID { get; set; }
        public string PREF_ID { get; set; }
        public string PROC_ID { get; set; }
        public Nullable<int> TYPE_OF_ITEM { get; set; }
        public Nullable<double> ADJUSTED_QTY { get; set; }
        public Nullable<double> ISSUE_ADJ_QTY { get; set; }

        //Ignore properties

        public string DEPARTMENT_ID { get; set; }
        public string PROCEDURE_CODE { get; set; }
        public string PREF_LIST_ID { get; set; }
        public string CASE_ID { get; set; }
    }
}
