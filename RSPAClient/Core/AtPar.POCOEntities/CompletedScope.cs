using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class CompletedScope
    {
        public System.Guid uidInstanceID { get; set; }
        public System.Guid completedScopeID { get; set; }
        public byte[] state { get; set; }
        public System.DateTime modified { get; set; }
    }
}
