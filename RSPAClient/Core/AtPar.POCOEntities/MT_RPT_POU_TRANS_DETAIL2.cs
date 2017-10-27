using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_RPT_POU_TRANS_DETAIL2
    {
        public string CART_ID { get; set; }
        public string ITEM_ID { get; set; }
        public Nullable<double> ITEM_QUANTITY_PAR { get; set; }
        public Nullable<double> ITEM_QUANTITY_ON_HAND { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string LOT_NUMBER { get; set; }
        public string SERIAL_NUMBER { get; set; }
        public Nullable<System.DateTime> EXPIRY_DATE { get; set; }
        public Nullable<double> ACTUAL_QUANTITY { get; set; }
        public string COMPARTMENT { get; set; }
        public Nullable<long> ID { get; set; }
        public Nullable<short> EVENT_TYPE { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public Nullable<double> QTY { get; set; }
        public Nullable<double> ON_HAND_QTY { get; set; }
        public int TRANSACTION_ID { get; set; }
        public Nullable<int> ADJUSTMENT_TYPE { get; set; }
        public Nullable<int> CHARGE_CAPTURE_TRANS_ID { get; set; }
        public Nullable<System.DateTime> CYCT_DATE_TIME { get; set; }
        public Nullable<double> ORIGINAL_QUANTITY { get; set; }
        public Nullable<double> NEW_QUANTITY { get; set; }
        public Nullable<double> ITEM_PRICE { get; set; }
        public string UOM { get; set; }
        public Nullable<long> ORDER_ID { get; set; }
        public Nullable<System.DateTime> PTWY_DATE_TIME { get; set; }
        public Nullable<double> QUANTITY_ORDERED { get; set; }
        public Nullable<double> QUANTITY_RECEIVED { get; set; }
    }
}
