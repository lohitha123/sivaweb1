using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
   public class VM_IUT_SENDDETAILS
    {
        public string TRANSACTION_ID { get; set; }
        public string DESTIN_BUSINESS_UNIT { get; set; }
        public double ORIG_BUSINESS_UNIT { get; set; }
        public string INTERUNIT_ID { get; set; }
        public string START_DT_TIME { get; set; }
        public string END_DT_TIME { get; set; }
        public string USER_ID { get; set; }
        public string LINE_NO { get; set; }
        public string ITEM_ID { get; set; }
        public string DESCRIPTION { get; set; }
        public string QTY { get; set; }
        public string QTY_SHIPPED { get; set; }
        public string UOM { get; set; }
        public string CARRIER_ID { get; set; }
        public string BILL_OF_LADING { get; set; }
        public string NO_OF_PKGS { get; set; }
        public string INV_LOT_ID { get; set; }
        public string SERIAL_ID { get; set; }
        public string INTERUNIT_LINE { get; set; }
    }
}
