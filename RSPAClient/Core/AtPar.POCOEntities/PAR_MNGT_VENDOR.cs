using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class PAR_MNGT_VENDOR
    {
        public string ORG_GROUP_ID { get; set; }
        public string VENDOR_ID { get; set; }
        public string VENDOR_NAME { get; set; }
        public string CONTACT_NAME { get; set; }
        public string ADDRESS1 { get; set; }
        public string ADDRESS2 { get; set; }
        public string CITY { get; set; }
        public string STATE { get; set; }
        public string COUNTRY { get; set; }
        public string ZIP { get; set; }
        public string PHONE { get; set; }
        public string FAX { get; set; }
        public string CONTACT_E_MAIL { get; set; }
        public string ORDER_DESPATCH_TYPE { get; set; }
        public Nullable<bool> STATUS { get; set; }
        public System.DateTime LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }
        public string ALLOW_VEND_ACCESS { get; set; }
        public string BILL_ONLY_EMAIL { get; set; }
        public short REMINDER_FREQ { get; set; }
        public string VEND_USER_ID { get; set; }
        public string ADD_ITEMS_LFLAG { get; set; }
        //Ignore Properties
        public string ORG_GROUP_NAME { get; set; }
    }
}
