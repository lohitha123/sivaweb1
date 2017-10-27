using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public partial  class SSL_CONFIG_DETAILS
    {
        public string  PROTOCOL { get; set; }
        public string SERVER_NAME { get; set; }
        public string PORT_NO { get; set; }
        public string pStrWPLogVal { get; set; }

        public string pStrWSLogVal { get; set; }
        public string pStrBRLogVal { get; set; }
        public string pConfXml { get; set; }
    }
}
