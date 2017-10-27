using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_MENUS
    {
        public short APP_ID { get; set; }
        public string MENU_ID { get; set; }
        public string MENU_CODE { get; set; }
        public string MENU_SUB_GROUP { get; set; }
        public string ENTERPRISE_SYSTEM { get; set; }
        public string MENU_NAME { get; set; }
        public Nullable<short> MENU_SEQ_NO { get; set; }
        public string AUDIT { get; set; }
        public Nullable<System.DateTime> LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }    

        private string _route;
        public string ROUTE
        {
            get
            {
                return _route;
            }
            set

            {
                _route = value.ToString().Trim();
            }
        }

        public string APP_NAME { get; set; }
        public string MENUS_FRIENDLYNAME { get; set; }
        public string UPDATE_DELETE { get; set; }
    }
}
