using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_MT_POU_CASE_CART_DETAILS
    {
        public string CASE_ID { get; set; }
        public string ITEM_ID { get; set; }
        public string ITEM_DESCR { get; set; }
        public Nullable<double> PICK_QTY { get; set; }
        public Nullable<double> HOLD_QTY { get; set; }
        public string PREF_LIST_ID { get; set; }
        public string ITEM_INVENTORY { get; set; }
        public string PROCEDURE_CODE { get; set; }
        public Nullable<double> ITEM_PRICE { get; set; }
        public string ITEM_UOM { get; set; }
        public Nullable<short> STATUS { get; set; }
        public Nullable<double> ACT_OPEN_QTY { get; set; }
        public Nullable<double> ACT_HOLD_QTY { get; set; }
        public double QTY { get; set; }
        public string CUST_ITEM_NO { get; set; }
        public short ITEM_SOURCE { get; set; }
        public string ITEM_STATUS { get; set; }
        public string ITEM_DESCRIPTION { get; set; }
        public double TOTAL_QTY { get; set; }
        public int SHORTAGE_QTY { get; set; }
        public string ITEM { get; set; }
        public string BARCODE { get; set; }
        public string CART_ID { get; set; }
        public string MANF_ITEM_ID { get; set; }
        public string COMPARTMENT { get; set; }
        public string CART_DESCR { get; set; }
        public string MANF_ID { get; set; }
        public string QUANTITY_ON_HAND { get; set; }
    }
}
