using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POCOEntities
{
   public partial class MT_ATPAR_ITEM_ATTRIBUTES
    {
        public string ITEM_ID { get; set; }
        public string BUSINESS_UNIT { get; set; }
        public string CART_ID { get; set; }
        public string ORG_GROUP_ID { get; set; }
        public string LOT_CONTROLLED { get; set; }
        public string SERIAL_CONTROLLED { get; set; }
        public string ISSUE_UOM { get; set; }
        public double? CONVERSION_FACTOR { get; set; }
        public DateTime LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USERID { get; set; }
        public string PAR_UOM { get; set; }
        public double CONV_RATE_PAR_TO_ISSUE_CF { get; set; }
    }
}
