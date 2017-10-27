using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_RECV_SENDLINEHEADER
    {
        public int TRANSACTION_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string PO_ID { get; set; }
        public string STORAGE_LOCATION { get; set; }
        public int LINE_NBR { get; set; }
        public int SCHED_NBR { get; set; }
        public int SCHED_COUNT { get; set; }
        public string INV_ITEM_ID { get; set; }
        public string ITM_ID_VNDR { get; set; }
        public string MFG_ITEM_ID { get; set; }
        public string DESCR { get; set; }
        public string INVENTORY_ITEM { get; set; }
        public string UPC_ID { get; set; }
        public string COMMENTS { get; set; }
        public string DUE_DT { get; set; }
        public float? QTY { get; set; }
        public float? ASN_QTY { get; set; }
        public float? QTY_PO { get; set; }
        public float? LINE_QTY { get; set; }
        public float? LINE_PO_QTY { get; set; }
        public float? RECEIVED_QTY { get; set; }
        public string LOCATION { get; set; }
        public string SHIPTO_ID { get; set; }
        public string CARRIER_ID { get; set; }
        public string UNIT_OF_MEASURE { get; set; }
        public string BILL_OF_LADING { get; set; }
        public string ASN_BILL_OF_LADING { get; set; }
        public string USER_ID { get; set; }
        public string DEVICE_DT_TIME { get; set; }
        public int? NO_OF_BOXES { get; set; }
        public string INSP_FLAG { get; set; }
        public float? QTY_RECV_TOL_PCT { get; set; }
        public string DELIVER_TO { get; set; }
        public string REQ_LOC_DESC { get; set; }
        public string TRACKING_ID { get; set; }
        public string CUST_ITEM_NO { get; set; }
        public string RECEIVING_ROUTING_ID { get; set; }
        public string BIN_TRACK_FLAG { get; set; }
        public string ASSET_ITEM_FLAG { get; set; }
        public string EXT_TRK_NO { get; set; }
        public string QTY_UPDATE { get; set; }
        public string ISSUE_UOM { get; set; }
        public Int32? CONVERSION_RATE { get; set; }
        public string RECV_UOM { get; set; }
        public float? RECV_CONVERSION_RATE { get; set; }
        public string GTIN { get; set; }
        public string LOT_CONTROLLED { get; set; }
        public string SERIAL_CONTROLLED { get; set; }
        public string RECAL_FLAG { get; set; }
        public string ADDRESS1 { get; set; }
        public string ADDRESS2 { get; set; }
        public string ADDRESS3 { get; set; }
        public string PHONE { get; set; }
        public string REQ_NUM { get; set; }
        public float? PRICE { get; set; }
        public string PACKAGING_STRING { get; set; }
        public string BUILDING { get; set; }
        public string FLOOR { get; set; }
        public string SECTOR { get; set; }
        public string REQUISITION_NAME { get; set; }
        public string BUYER_NAME { get; set; }
        public string LOC_DESCR { get; set; }
        public string ITEMID_DESC { get; set; }
        public string ALT_UOM { get; set; }
        public double OPENQTY { get; set; }
        public string START_DT_TIME { get; set; }
        public string END_DT_TIME { get; set; }
        public int STATUS { get; set; }
        public string RECEIVED_FLAG { get; set; }

    }
}
