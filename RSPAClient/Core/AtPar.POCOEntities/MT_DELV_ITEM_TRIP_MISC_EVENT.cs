using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_DELV_ITEM_TRIP_MISC_EVENT
    {
        public string TRANSACTION_ID { get; set; }
        public int EVENT_ID { get; set; }
        public System.DateTime UPDATE_DATE { get; set; }
        public string TO_USER_OR_LOCGRP { get; set; }
        public string USER_ID { get; set; }
    }
}
