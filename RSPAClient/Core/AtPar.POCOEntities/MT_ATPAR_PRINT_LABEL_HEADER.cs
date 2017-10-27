using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_PRINT_LABEL_HEADER
    {
        public short APP_ID { get; set; }
        public int OBJECT_ID { get; set; }
        public string OBJECT_DESC { get; set; }
        public string PRINTER_TYPE { get; set; }
        public Nullable<decimal> HEIGHT { get; set; }
        public Nullable<decimal> WIDTH { get; set; }
        public string OBJECT_TYPE { get; set; }
        public string FILE_NAME { get; set; }
        public string FILE_LVX { get; set; }
        public string FILE_PNL { get; set; }
    }
}
