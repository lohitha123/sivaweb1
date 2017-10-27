using System;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_BARCODE_SYMBOLOGY
    {
        public string SYMBOLOGY_TYPE { get; set; }
        public int BARCODE_LENGTH { get; set; }
        public string DESCRIPTION { get; set; }
        public Nullable<int> ID_START_POSITION { get; set; }
        public Nullable<int> LENGTH { get; set; }
        public string UPDATE_USERID { get; set; }
        public Nullable<System.DateTime> UPDATE_DATE { get; set; }
    }
}
