using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_NOTES_SETUP
    {
        public int APP_ID { get; set; }
        public string SCREEN_NAME { get; set; }
        public string NOTES_LABEL { get; set; }
        public string NOTES_LIST_DISPLAY { get; set; }
        public string NOTES_TABLE_NAME { get; set; }
        public string NOTES_FIELD_NAME { get; set; }
        public string ALLOW_EDIT_NOTES { get; set; }
        public string CAPTURE_CODE { get; set; }
        public string APPEND_SELECTED_TEXT { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public string UPDATE_USER_ID { get; set; }
    }
}
