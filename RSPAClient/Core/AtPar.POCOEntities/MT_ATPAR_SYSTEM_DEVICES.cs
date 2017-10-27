using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_SYSTEM_DEVICES
    {
        public string SYSTEM_ID { get; set; }
        public string DEVICE_ID { get; set; }
        public string MAC_ADDRESS { get; set; }
        public string DESCRIPTION { get; set; }
        public bool STATUS { get; set; }
    }
}
