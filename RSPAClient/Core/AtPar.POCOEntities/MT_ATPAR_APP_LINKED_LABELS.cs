using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_APP_LINKED_LABELS
    {
        public short APP_ID { get; set; }
        public short LABEL_TYPE { get; set; }
        public short LABEL_LNK_TYPE { get; set; }
        public string LABEL_LNK_DESCRIPTION { get; set; }
    }
}
