using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_GROUP_MENUS_LIST
    {
        public Int16 GROUP_ID { get; set; }
        public string GROUP_NAME { get; set; }
        public Int16 APP_GROUP_SEQ_NO { get; set; }
        public string APP_GROUP_IMAGE_PATH { get; set; }
        public Int16 APP_ID { get; set; }
        public string APP_NAME { get; set; }
        public Int16 SUB_MENU_GROUP_ID { get; set; }
        public string SUB_MENU_GROUP_NAME { get; set; }
        public Int16 SUB_MENU_SEQ_NO { get; set; }
        public string SUB_MENU_IMAGE_PATH { get; set; }
        public string MENU_CODE { get; set; }
        public string MENU_NAME { get; set; }
        public Int16 MENU_SEQ_NO { get; set; }
        public string ROUTE { get; set; }
        public string APP_IMAGE_PATH { get; set; }
        public string MENUS_FRIENDLYNAME { get; set; }
        public string REPORT_ID { get; set; }
    }
}
