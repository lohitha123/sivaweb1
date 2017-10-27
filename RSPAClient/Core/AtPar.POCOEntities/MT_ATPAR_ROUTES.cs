using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POCOEntities
{
    public class MT_ATPAR_ROUTES
    {
        public Int16 APP_ID { get; set; }

        public string MENU_ID { get; set; }

        public string MENU_CODE { get; set; }

        public string MENU_NAME { get; set; }

        private string _route;
        public string ROUTE { get
            {
                return  _route;
            }
                 set

            {
                _route = value.ToString().Trim();
            }
                 }
        public string MENU_SUB_GROUP { get; set; }
        public string ENTERPRISE_SYSTEM { get; set; }
        public Int16 MENU_SEQ_NO { get; set; }
        public string AUDIT { get; set; }
        public string LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }

    }
}