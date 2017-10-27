using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_PRINTLABEL_RECEIVE_HEADER
    {

        public string BUSINESS_UNIT { get; set; }
        public string TRACKING_NO { get; set; }
        public string LOCATION_ID { get; set; }
        public string LOCATION_DESCR { get; set; }
        public string DELIVER_TO_NAME { get; set; }
        public string PO_ID { get; set; }
        public string SHIPTO_ID { get; set; }
        public string ITEM_ID { get; set; }
        public string MANF_ITEM_ID { get; set; }
        public string VENDOR_ITEM_ID { get; set; }
        public string UPC_ID { get; set; }
        public string CUST_ITEM_NO { get; set; }
        public string GTIN { get; set; }
        public string ITEM_DESCR { get; set; }
        public string INSPECTION_FLAG { get; set; }        
        public string DROP_SHIP_FLAG { get; set; }
        public string RECEIVED_QTY { get; set; }
        public string RECEIVE_UOM { get; set; }
        public string CONVERSION_RATE { get; set; }
        public int NO_OF_BOXES { get; set; }
        public string USER_ID { get; set; }
        public string ADDRESS1 { get; set; }
        public string ADDRESS2 { get; set; }
        public string ADDRESS3 { get; set; }
        public string BUSINESS_UNIT_IN { get; set; }
        public string RECEIPT_DT { get; set; }
        public string REQ_NUM { get; set; }

        public string COMMENTS { get; set; }
        public string PACKAGING_STRING { get; set; }
        public string REQUISITION_NAME { get; set; }
        public string BUYER_NAME { get; set; }
        public string BUILDING { get; set; }
        public string FLOOR { get; set; }
        public string SECTOR { get; set; }


        //public string PHONE { get; set; }       
        //public string INVENTORY_ITEM { get; set; }      
        

    }
}
