using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_LABELS_DATA
    {
        public short APP_ID { get; set; }
        public string LABEL_FILE_NAME { get; set; }
        public byte[] LABEL_DATA_PNL { get; set; }
        public string LABEL_DATA_LVX { get; set; }
        public byte[] LABEL_IMAGE { get; set; }
        public string MODEL { get; set; }
        public Nullable<double> WIDTH { get; set; }
        public Nullable<double> HEIGHT { get; set; }
        public string USER_ID { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
        public int LABEL_TYPE { get; set; }
        public Nullable<int> LINK_LABEL_TYPE { get; set; }
        public string PRINTER_CODE { get; set; }
    }
}
